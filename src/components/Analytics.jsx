import { useState, useEffect } from 'react'
import { BarChart, HorizontalBarGraph } from './Charts'
import { month } from './data'
import * as XLSX from 'xlsx'

const MonthlyAnalytics = () => {
	// Sample data structure
	const [monthlyData, setMonthlyData] = useState([])
	const [data, setData] = useState({})
	const [report, setReport] = useState({})
	const [selmonth, setMonth] = useState('')
	const y = new Date()
	const [selyear, setYear] = useState(y.getFullYear())
	const [ready, setReady] = useState(false)

	const getReport = async () => {
		// Example data object
		// Flattening AST and concatenating the results into a single row
		const flattenedData = report.map((record) => {
			const baseRecord = {
				hospital_id: record.hospital_id,
				patient_name: record.patient_name,
				father_name: record.father_name,
				village_name: record.village_name,
				patient_age: record.patient_age,
				gender: record.gender,
				patient_mobile: record.patient_mobile,
				direct_microscopic_examination: record.direct_microscopic_examination,
				culture_results: record.culture_results,
				comments: record.comments,
				note: record.note,
				report_date: record.report_date,
				reporter_name: record.reporter_name,
				reporter_designation: record.reporter_designation,
				month: record.month,
				year: record.year,
				location: record.location,
				clinical_ho: record.clinical_ho,
				provisional_diagnosis: record.provisional_diagnosis,
				antibiotics_given: record.antibiotics_given,
				specimen_nature: record.specimen_nature,
				specimen_source: record.specimen_source,
				collection_date: record.collection_date,
				collection_time: record.collection_time,
				illness_duration: record.illness_duration,
				investigation_required: record.investigation_required,
				admission_date: record.admission_date,
				physician_name: record.physician_name,
			}

			// Concatenate AST data for each record
			const astConcatenated = record.ast
				.map((astEntry) => {
					return `Microbe: ${astEntry.Microbe}, Antibiotic: ${astEntry.Antibiotic}, Result: ${astEntry.Result}, Mic: ${astEntry.Mic}, Mic_result: ${astEntry.Mic_result}`
				})
				.join(' | ')

			return { ...baseRecord, ast: astConcatenated }
		})

		const worksheet = XLSX.utils.json_to_sheet(flattenedData)
		const workbook = XLSX.utils.book_new()
		XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1')
		//let buffer = XLSX.write(workbook, { bookType: "xlsx", type: "buffer" });
		//XLSX.write(workbook, { bookType: "xlsx", type: "binary" });
		let file = 'report' + selmonth + selyear.toString() + '.xlsx'
		XLSX.writeFile(workbook, file)
	}
	// Simulated API call to fetch monthly data
	const fetchMonthlyData = async () => {
		//console.log(selmonth, selyear)
		if (
			(selyear > 2024 &&
				(selmonth === 'October' ||
					selmonth === 'November' ||
					selmonth === 'December')) ||
			selyear > 2025
		) {
			const data = await fetch(
				// 'https://amrorbackend-uvt9.onrender.com/report',
				'https://amrorbackend-uvt9.onrender.com/updated-report',
				{
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({
						month: selmonth,
						year: selyear,
					}),
				}
			)
			const jsonData = await data.json()
			//console.log(jsonData.data)
			if (jsonData.report === undefined) {
				alert('No Data Found')
				return
			} else {
				setReport(jsonData.report)
				setMonthlyData(jsonData.data)
				setData(jsonData.micro)
			}
		} else {
			const data = await fetch(
				// 'https://amrorbackend-uvt9.onrender.com/report',
				'https://amrorbackend-uvt9.onrender.com/report',
				{
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({
						month: selmonth,
						year: selyear,
					}),
				}
			)
			const jsonData = await data.json()
			console.log(jsonData.report)
			if (jsonData.report === undefined) {
				alert('Data Not Found')
				return
			} else {
				setReport(jsonData.report)
				setMonthlyData(jsonData.data)
				setData(jsonData.micro)
			}
		}
	}
	useEffect(() => {
		if (monthlyData?.length > 0 && Object.keys(data)?.length > 0) {
			//console.log(monthlyData)
			setReady(true)
		}
	}, [monthlyData, data])

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
					className="outline-none  rounded-lg px-5 py-3 bg-red-400 text-white text-lg">
					Check
				</button>
			</div>

			<h2>Monthly Report: Microorganism Analysis</h2>
			{ready && (
				<>
					<div>
						<button
							id="button"
							onClick={getReport}
							className="outline-none  rounded-lg px-5 py-3 bg-red-400 text-white text-lg">
							Download Report
						</button>
					</div>
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
