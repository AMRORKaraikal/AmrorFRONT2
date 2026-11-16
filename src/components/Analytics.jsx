import { useState } from 'react'
import { BarChart, HorizontalBarGraph } from './Charts'
import { month } from './data'
import * as XLSX from 'xlsx'

const API = 'https://amrorbackend-uvt9.onrender.com'

// Reports from October 2024 onwards are stored with Lab IDs (/updated-report);
// earlier reports use the old patient_id system (/report).
const usesLabIdSystem = (selmonth, selyear) => {
	const y = Number(selyear)
	return (
		(y === 2024 && ['October', 'November', 'December'].includes(selmonth)) ||
		y > 2024
	)
}

// Columns in the downloaded Excel, in order.
// lab_id is the sample's Lab ID (new system); hospital_id / specimen_id are only
// filled for old reports. ID columns that are empty for every row are dropped.
const COLUMNS = [
	'lab_id',
	'hospital_id',
	'specimen_id',
	'patient_name',
	'father_name',
	'village_name',
	'patient_age',
	'gender',
	'patient_mobile',
	'direct_microscopic_examination',
	'culture_results',
	'comments',
	'note',
	'report_date',
	'reporter_name',
	'reporter_designation',
	'month',
	'year',
	'location',
	'clinical_ho',
	'provisional_diagnosis',
	'antibiotics_given',
	'specimen_nature',
	'specimen_source',
	'collection_date',
	'collection_time',
	'illness_duration',
	'investigation_required',
	'admission_date',
	'physician_name',
]
const OPTIONAL_ID_COLUMNS = ['lab_id', 'hospital_id', 'specimen_id']

// Dates are stored in UTC; show them as Indian dates (DD/MM/YYYY) so a sample
// collected on 28 Jan doesn't appear as "2026-01-27T18:30:00.000Z".
const DATE_COLUMNS = ['collection_date', 'admission_date']
const DATETIME_COLUMNS = ['report_date']
const formatIST = (value, withTime) => {
	const d = new Date(value)
	if (!value || isNaN(d.getTime())) return value ?? ''
	const opts = {
		timeZone: 'Asia/Kolkata',
		day: '2-digit',
		month: '2-digit',
		year: 'numeric',
		...(withTime ? { hour: '2-digit', minute: '2-digit', hour12: false } : {}),
	}
	return d.toLocaleString('en-GB', opts).replace(',', '')
}

// Turn report records into Excel rows (one row per report).
const toSheetRows = (records) => {
	const isBlank = (v) => v === undefined || v === null || v === ''
	const columns = COLUMNS.filter(
		(col) =>
			!OPTIONAL_ID_COLUMNS.includes(col) ||
			records.some((r) => !isBlank(r[col]))
	)

	return records.map((record) => {
		const row = {}
		columns.forEach((col) => {
			const v = record[col]
			if (isBlank(v)) row[col] = ''
			else if (DATE_COLUMNS.includes(col)) row[col] = formatIST(v, false)
			else if (DATETIME_COLUMNS.includes(col)) row[col] = formatIST(v, true)
			else row[col] = v
		})
		// Concatenate AST results into one cell (blank if none were recorded)
		row.ast = (Array.isArray(record.ast) ? record.ast : [])
			.map(
				(astEntry) =>
					`Microbe: ${astEntry.Microbe}, Antibiotic: ${astEntry.Antibiotic}, Result: ${astEntry.Result}, Mic: ${astEntry.Mic ?? ''}, Mic_result: ${astEntry.Mic_result ?? ''}`
			)
			.join(' | ')
		return row
	})
}

const MonthlyAnalytics = () => {
	const [monthlyData, setMonthlyData] = useState([])
	const [data, setData] = useState({})
	const [report, setReport] = useState([])
	const [selmonth, setMonth] = useState('')
	const y = new Date()
	const [selyear, setYear] = useState(y.getFullYear())
	const [loading, setLoading] = useState(false)
	const [message, setMessage] = useState('')
	const [downloadingAll, setDownloadingAll] = useState(false)
	const [allMessage, setAllMessage] = useState('')

	const ready = monthlyData?.length > 0 && Object.keys(data || {}).length > 0

	const getReport = () => {
		if (!report.length) {
			alert('There is nothing to download for this month.')
			return
		}
		try {
			const flattenedData = toSheetRows(report)

			const worksheet = XLSX.utils.json_to_sheet(flattenedData)
			const workbook = XLSX.utils.book_new()
			XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1')
			XLSX.writeFile(workbook, 'report' + selmonth + String(selyear) + '.xlsx')
		} catch (error) {
			console.error('Excel export failed:', error)
			alert('Sorry, the Excel file could not be created. Please try again.')
		}
	}

	// One Excel file with every report from the earliest one to today:
	// a sheet for the Lab ID system and a sheet for the older system.
	const downloadAllReports = async () => {
		setDownloadingAll(true)
		setAllMessage(
			'Preparing the complete report… This can take a minute or two.'
		)
		const controller = new AbortController()
		const timer = setTimeout(() => controller.abort(), 180000)
		try {
			const response = await fetch(`${API}/all-reports`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({}),
				signal: controller.signal,
			})
			if (!response.ok) throw new Error(`Server returned ${response.status}`)
			const json = await response.json()
			const labIdReports = Array.isArray(json.labIdReports) ? json.labIdReports : []
			const olderReports = Array.isArray(json.olderReports) ? json.olderReports : []
			if (labIdReports.length + olderReports.length === 0) {
				setAllMessage('No culture reports found.')
				return
			}

			const workbook = XLSX.utils.book_new()
			if (labIdReports.length > 0) {
				XLSX.utils.book_append_sheet(
					workbook,
					XLSX.utils.json_to_sheet(toSheetRows(labIdReports)),
					'Lab ID reports'
				)
			}
			if (olderReports.length > 0) {
				XLSX.utils.book_append_sheet(
					workbook,
					XLSX.utils.json_to_sheet(toSheetRows(olderReports)),
					'Older reports'
				)
			}
			const today = formatIST(new Date(), false).replace(/\//g, '-')
			XLSX.writeFile(workbook, `reportAll_upto_${today}.xlsx`)
			setAllMessage(
				`Downloaded ${labIdReports.length + olderReports.length} culture reports: ${labIdReports.length} in the "Lab ID reports" sheet and ${olderReports.length} in the "Older reports" sheet.`
			)
		} catch (error) {
			console.error('Complete report failed:', error)
			setAllMessage(
				error.name === 'AbortError'
					? 'The server took too long to respond. Please click Download all reports again.'
					: 'Could not prepare the complete report (the server may still be waking up). Please wait a few seconds and try again.'
			)
		} finally {
			clearTimeout(timer)
			setDownloadingAll(false)
		}
	}

	const postMonth = async (route) => {
		const controller = new AbortController()
		// Allow for Render waking the server up (can take about a minute)
		const timer = setTimeout(() => controller.abort(), 90000)
		try {
			const response = await fetch(`${API}/${route}`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ month: selmonth, year: selyear }),
				signal: controller.signal,
			})
			if (!response.ok) throw new Error(`Server returned ${response.status}`)
			return await response.json()
		} finally {
			clearTimeout(timer)
		}
	}

	const fetchMonthlyData = async () => {
		if (!selmonth) {
			setMessage('Please select a month first.')
			return
		}

		setLoading(true)
		setMessage(
			'Loading… If the dashboard has not been used for a while, this can take up to a minute while the server wakes up.'
		)
		setReport([])
		setMonthlyData([])
		setData({})

		try {
			const primary = usesLabIdSystem(selmonth, selyear) ? 'updated-report' : 'report'
			const secondary = primary === 'updated-report' ? 'report' : 'updated-report'

			let jsonData = await postMonth(primary)
			// Around the changeover month, check the other system before giving up
			if (!Array.isArray(jsonData.report) || jsonData.report.length === 0) {
				jsonData = await postMonth(secondary)
			}

			const rows = Array.isArray(jsonData.report) ? jsonData.report : []
			if (rows.length === 0) {
				setMessage(`No culture reports found for ${selmonth} ${selyear}.`)
				return
			}

			setReport(rows)
			setMonthlyData(Array.isArray(jsonData.data) ? jsonData.data : [])
			setData(jsonData.micro || {})
			setMessage(
				`${rows.length} culture report${rows.length === 1 ? '' : 's'} found for ${selmonth} ${selyear}.`
			)
		} catch (error) {
			console.error('Monthly report failed:', error)
			setMessage(
				error.name === 'AbortError'
					? 'The server took too long to respond. Please click Check again.'
					: 'Could not load the report (the server may still be waking up). Please wait a few seconds and click Check again.'
			)
		} finally {
			setLoading(false)
		}
	}

	return (
		<div className="mt-10 mx-5 bg-white p-5 rounded-sm">
			<div className="flex gap-x-5">
				<label className="text-xl text-gray-800">Month:</label>
				<select
					id="microbe_dropdown"
					className="w-48 outline rounded-md"
					value={selmonth}
					onChange={(e) => setMonth(e.target.value)}>
					<option value="">Select</option>
					{month.map((loc, index) => {
						return (
							<option key={index} value={loc}>
								{loc}
							</option>
						)
					})}
				</select>

				<label className="text-xl text-gray-800">YEAR:</label>
				<input
					id="year"
					type="number"
					placeholder="2024"
					value={selyear}
					onChange={(e) => setYear(e.target.value)}
					className="p-2 border border-gray-300 rounded-md"
					required={true}
				/>
				<button
					id="submit-button"
					onClick={fetchMonthlyData}
					disabled={loading}
					className="outline-none  rounded-lg px-5 py-3 bg-red-400 text-white text-lg disabled:opacity-60">
					{loading ? 'Loading…' : 'Check'}
				</button>
			</div>

			<div className="mt-4 flex items-center gap-x-5">
				<button
					id="download-all-button"
					onClick={downloadAllReports}
					disabled={downloadingAll}
					className="outline-none  rounded-lg px-5 py-3 bg-red-400 text-white text-lg disabled:opacity-60">
					{downloadingAll ? 'Preparing…' : 'Download all reports'}
				</button>
				<span className="text-gray-700">
					{allMessage ||
						'One Excel file with every report, from the earliest to today.'}
				</span>
			</div>

			<h2 className="mt-4">Monthly Report: Microorganism Analysis</h2>
			{message && <p className="mt-3 text-gray-700">{message}</p>}
			{report.length > 0 && (
				<div>
					<button
						id="button"
						onClick={getReport}
						className="outline-none  rounded-lg px-5 py-3 bg-red-400 text-white text-lg">
						Download Report
					</button>
				</div>
			)}
			{ready && (
				<>
					<HorizontalBarGraph data={data} />
					{monthlyData.map((microbe, index) => {
						return <BarChart data={microbe} key={index} />
					})}
				</>
			)}
		</div>
	)
}

export default MonthlyAnalytics
