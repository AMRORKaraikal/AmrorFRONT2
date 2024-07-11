import { useState, useEffect } from 'react'
import { BarChart, HorizontalBarGraph } from './Charts'
import { month } from './data'

const MonthlyAnalytics = () => {
	// Sample data structure
	const [monthlyData, setMonthlyData] = useState([])
	const [data, setData] = useState({})
	const [report,setReport] = useState({})
	const [selmonth, setMonth] = useState('')
	const y = new Date()
	const [selyear, setYear] = useState(y.getFullYear())
	const [ready, setReady] = useState(false)


	const download = (data) => {
		// Create a Blob with the CSV data and type
		const blob = new Blob([data], { type: 'text/csv' });
		
		// Create a URL for the Blob
		const url = URL.createObjectURL(blob);
		
		// Create an anchor tag for downloading
		const a = document.createElement('a');
		
		// Set the URL and download attribute of the anchor tag
		a.href = url;
		a.download = 'report.csv';
		
		// Trigger the download by clicking the anchor tag
		a.click();
	}
	
	// Function to create a CSV string from an object
	const csvmaker = (data) => {
		// Get the keys (headers) of the object
		let csvRows = [];

		// Headers is basically a keys of an object which 
		// is id, name, and profession
		const headers = Object.keys(data[0]);
	
		// As for making csv format, headers must be
		// separated by comma and pushing it into array
		csvRows.push(headers.join(','));
	
		// Pushing Object values into the array with
		// comma separation
	
		// Looping through the data values and make
		// sure to align values with respect to headers
		for (const row of data) {
			const values = headers.map(e => {
				return row[e]
			})
			csvRows.push(values.join(','))
		}
	
		// const values = Object.values(data).join(',');
		// csvRows.push(values)
	
		// returning the array joining with new line 
		return csvRows.join('\n')
	
	}
	const getReport = async () => {
		// Example data object
		
		
		// Create the CSV string from the data
		const csvdata = csvmaker(report);
		
		// Download the CSV file
		download(csvdata);
	}
	// Simulated API call to fetch monthly data
	const fetchMonthlyData = async () => {
		//console.log(selmonth, selyear)
		const data = await fetch(
			// 'http://localhost:5000/report', 
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
		})
		const jsonData = await data.json()
		//console.log(jsonData.data)
		setReport(jsonData.report)
		setMonthlyData(jsonData.data)
		setData(jsonData.micro)
	}
	useEffect(() => {
		if (monthlyData.length > 0 && Object.keys(data).length > 0) {
			//console.log(monthlyData)
			setReady(true)
		}
	}, [monthlyData, data])

	return (
		<div className="mt-10 ml-10 bg-white">
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
