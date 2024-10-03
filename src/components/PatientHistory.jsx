import React, { useState } from 'react'
// import BarcodeReader from 'react-barcode-reader';
import Pdf1 from '../Pdf1'
import Pdf from '../Pdf'
import NewPdf from '../NewPdf.jsx'
import NewPdf1 from '../NewPdf1'
function PatientHistory() {
	const [patient_id, setPatientId] = useState('')
	const [lab_id, setLabId] = useState(localStorage.getItem('barcode') | '')
	const [sample_id, setSample_Id] = useState('')

	const [patientData, setPatientData] = useState()
	const [specimenData, setSpecimenData] = useState()
	const [report, setReport] = useState()
	const [details, setDetails] = useState(0)

	const getHalfReport = async (e) => {
		e.preventDefault()

		try {
			const response = await fetch(
				'https://amrorbackend-uvt9.onrender.com/get-report',
				{
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({
						patient_id: patient_id,
						specimen_id: sample_id,
					}),
				}
			)
			const result = await response.json()
			if (result.success && result.report !== null) {
				setSpecimenData(result.specimenData)
				setPatientData(result.patientData)
				setReport(result.report)

				//console.log(result.patientData)
				//console.log(result.specimenData)
				//console.log(result.report)

				setDetails(1)
				// setPatient_id(result.patientData.patient_id)
			} else {
				console.log('Error')
				alert('Report Does not exist')
			}
		} catch (errror) {
			alert('Failed to fetch report!!!')
			//console.log(errror)
		}
	}
	const getNewHalfReport = async (e) => {
		e.preventDefault()

		try {
			const response = await fetch(
				'https://amrorbackend-uvt9.onrender.com/get-new-report',
				{
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({
						lab_id: lab_id,
					}),
				}
			)
			const result = await response.json()
			if (result.success && result.report !== null) {
				setSpecimenData(result.specimenData)
				setPatientData(result.patientData)
				setReport(result.report)

				//console.log(result.patientData)
				//console.log(result.specimenData)
				//console.log(result.report)

				setDetails(3)
				// setPatient_id(result.patientData.patient_id)
			} else {
				console.log('Error')
				alert('Report Does not exist')
			}
		} catch (errror) {
			alert('Failed to fetch report!!!')
			//console.log(errror)
		}
	}
	const getFullReport = async (e) => {
		e.preventDefault()

		try {
			const response = await fetch(
				'https://amrorbackend-uvt9.onrender.com/get-report',
				{
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({
						patient_id: patient_id,
						specimen_id: sample_id,
					}),
				}
			)
			const result = await response.json()
			console.log(result)
			if (result.success && result.report !== null) {
				setSpecimenData(result.specimenData)
				setPatientData(result.patientData)
				setReport(result.report)
				//console.log(result.patientData)
				//console.log(result.specimenData)
				//console.log(result.report)
				setDetails(2)
				// setPatient_id(result.patientData.patient_id)
			} else {
				console.log('Error')
				alert('Report Does not exist')
			}
		} catch (errror) {
			console.log('Error')
			alert('Failed to fetch report!!!')

			//console.log(errror)
		}
	}
	const getNewFullReport = async (e) => {
		e.preventDefault()

		try {
			const response = await fetch(
				'https://amrorbackend-uvt9.onrender.com/get-new-report',
				{
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({
						lab_id: lab_id,
					}),
				}
			)
			const result = await response.json()
			console.log(result)
			if (result.success && result.report !== null) {
				setSpecimenData(result.specimenData)
				setPatientData(result.patientData)
				setReport(result.report)
				//console.log(result.patientData)
				//console.log(result.specimenData)
				//console.log(result.report)
				setDetails(4)
				// setPatient_id(result.patientData.patient_id)
			} else {
				console.log('Error')
				alert('Report Does not exist')
			}
		} catch (errror) {
			console.log('Error')
			alert('Failed to fetch report!!!')

			//console.log(errror)
		}
	}
	return (
		<>
			<form className="mt-10 justify-center flex flex-row">
				<div className="flex w-full justify-evenly">
					<div className="flex flex-col space-y-2 w-[32em]">
						<div className="flex flex-col">
							<label className="text-sm text-gray-600">Scan</label>
							<input
								id="patient-id"
								type="text"
								onChange={(e) => {
									setPatientId(e.target.value.split(' ')[0])
									setSample_Id(e.target.value.split(' ')[1])
								}}
								placeholder="scan barcode"
								className="p-2 border border-gray-300 rounded-md"
								required={true}
							/>
						</div>
						<div className="flex flex-col mx-2 sm:mx-0">
							<label className="text-sm text-gray-800">Patient ID:</label>
							<input
								id="patient-id"
								type="text"
								value={patient_id}
								onChange={(e) => setPatientId(e.target.value)}
								placeholder="Enter Patient ID"
								className="p-2 border border-gray-300 rounded-md"
								required={true}
							/>
						</div>

						<div className="flex flex-col mx-2 sm:mx-0">
							<label className="text-sm text-gray-800">Sample ID : -</label>
							<input
								id="sample-id"
								type="text"
								value={sample_id}
								onChange={(e) => setSample_Id(e.target.value)}
								placeholder="Enter Sample ID"
								className="p-2 border border-gray-300 rounded-md"
								required={true}
							/>
						</div>
						<div className="flex justify-around">
							<button
								id="submit-button"
								type="submit"
								onClick={getHalfReport}
								className="mt-5 outline rounded-md px-4 py-2 bg-blue-900  text-cyan-200 text-lg">
								Get History
							</button>

							<button
								id="submit-button"
								type="submit"
								onClick={getFullReport}
								className="mt-5 outline rounded-md px-4 py-2 bg-pink-400 text-white text-lg">
								Get Report
							</button>
						</div>
					</div>
				</div>
				<div className="flex w-full justify-evenly">
					<div className="flex flex-col space-y-2 w-[32em]">
						<div className="flex flex-col">
							<label className="text-sm text-gray-600">Scan</label>
							<input
								// id="lab-id"
								type="text"
								// onChange={(e) => {
								// 	setPatientId(e.target.value.split(' ')[0])
								// 	setSample_Id(e.target.value.split(' ')[1])
								// }}
								placeholder="scan barcode"
								className="p-2 border border-gray-300 rounded-md"
								required={true}
							/>
						</div>
						<div className="flex flex-col mx-2 sm:mx-0">
							<label className="text-sm text-gray-800">Lab ID:</label>
							<input
								id="lab-id"
								type="text"
								value={lab_id}
								onChange={(e) => setLabId(e.target.value)}
								placeholder="Enter Patient ID"
								className="p-2 border border-gray-300 rounded-md"
								required={true}
							/>
						</div>

						<div className="flex justify-around">
							<button
								id="submit-button"
								type="submit"
								onClick={getNewHalfReport}
								className="mt-5 outline rounded-md px-4 py-2 bg-blue-900  text-cyan-200 text-lg">
								Get History
							</button>

							<button
								id="submit-button"
								type="submit"
								onClick={getNewFullReport}
								className="mt-5 outline rounded-md px-4 py-2 bg-pink-400 text-white text-lg">
								Get Report
							</button>
						</div>
					</div>
				</div>
			</form>

			{details === 1 ? (
				<>
					<button
						id="submit-button"
						type="submit"
						onClick={getHalfReport}
						className="mt-5 ml-5 outline rounded-md px-4 py-2 bg-blue-900  text-cyan-200 text-lg">
						Generate Logo
					</button>
					<Pdf1
						reportData={report}
						patientData={patientData}
						specimenData={specimenData}
					/>
				</>
			) : details === 2 ? (
				<>
					<button
						id="submit-button"
						type="submit"
						onClick={getFullReport}
						className="mt-5 ml-5 outline rounded-md px-4 py-2 bg-pink-400 text-white text-lg">
						Generate Logo
					</button>
					<Pdf
						reportData={report}
						patientData={patientData}
						specimenData={specimenData}
					/>
				</>
			) : details === 3 ? (
				<>
					<button
						id="submit-button"
						type="submit"
						onClick={getNewHalfReport}
						className="mt-5 ml-5 outline rounded-md px-4 py-2 bg-blue-900  text-cyan-200 text-lg">
						Generate Logo
					</button>
					<NewPdf1
						reportData={report}
						patientData={patientData}
						specimenData={specimenData}
					/>
				</>
			) : (
				details === 4 && (
					<>
						<button
							id="submit-button"
							type="submit"
							onClick={getNewFullReport}
							className="mt-5 ml-5 outline rounded-md px-4 py-2 bg-pink-400 text-white text-lg">
							Generate Logo
						</button>
						<NewPdf
							reportData={report}
							patientData={patientData}
							specimenData={specimenData}
						/>
					</>
				)
			)}
		</>
	)
}

export default PatientHistory
