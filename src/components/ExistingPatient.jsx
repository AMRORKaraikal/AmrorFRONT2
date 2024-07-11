import { useState, useRef, useEffect } from 'react'
import DatePicker from 'react-date-picker'
import 'react-date-picker/dist/DatePicker.css'
import 'react-calendar/dist/Calendar.css'
import ReactToPrint from 'react-to-print'
import Barcode from 'react-barcode'
import { antibiotic_list, dropDown3, specimen_nature_drop } from './data'
import CreatableSelect from 'react-select/creatable'

const ExistingPatient = () => {
	const [patient_id, setPatient_Id] = useState('')
	const [collectionDate, setCollectionDate] = useState(new Date())
	const [admissionDate, setAdmissionDate] = useState(new Date())
	const [location, setLocation] = useState('')
	const [locationdet, setLocationDet] = useState('')
	const [specimen_naturedet, setspecimen_natureDet] = useState('')
	const [investigation_requireddet, setInvestigation_RequiredDet] = useState('')
	const [clinical_ho, setClinical_Ho] = useState('')
	const [provisional_diagnosis, setProvisional_Diagnosis] = useState('')

	const [sample_id, setSample_Id] = useState(0)
	const [specimen_nature, setSpecimen_Nature] = useState('')
	const [specimen_source, setSpecimen_Source] = useState('')
	const [collection_time, setCollection_Time] = useState('')
	const [illness_duration, setIllness_Duration] = useState('')
	const [investigation_required, setInvestigation_Required] = useState('')
	const [physician_name, setPhysician_Name] = useState('')
	const [isPrevData, setIsPrevData] = useState(false)

	const [qrdata, setQrData] = useState('')
	const [showQr, setShowQr] = useState(false)

	let [list, setList] = useState([])

	let options = []

	antibiotic_list.map((anti, ind) => {
		return options.push({ value: anti, label: anti })
	})

	const [patientData, setPatientData] = useState({})
	const locationList = ['ICU', 'Ward', 'OPD', 'Casuality']
	useEffect(() => {
		async function getCount() {
			const response = await fetch(
				'https://amrorbackend-uvt9.onrender.com/specimen-id',
				{
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
				}
			)
			const result = await response.json()
			// //console.log(result)
			setSample_Id(result.count)
		}
		getCount()
	}, [])

	const submitNewSpecimen = async (e) => {
		e.preventDefault()
		let antibiotics_given = ''
		list.forEach((item) => {
			antibiotics_given = antibiotics_given + item.value + ', '
		})
		const specimen_data = {
			location: location + ' - ' + locationdet,
			clinical_ho: clinical_ho,
			provisional_diagnosis: provisional_diagnosis,
			antibiotics_given: antibiotics_given,
			specimen_id: sample_id,
			specimen_nature: specimen_nature + '-' + specimen_naturedet,
			specimen_source: specimen_source,
			collection_date: collectionDate,
			collection_time: collection_time,
			illness_duration: illness_duration,
			investigation_required:
				investigation_required + '-' + investigation_requireddet,
			admission_date: admissionDate,
			physician_name: physician_name,
		}
		try {
			// if (!hospital_id || !patient_name || !father_name || !village_name || !patient_age || !patient_mobile) {
			//     alert("Enter all the details")
			//     return;
			// }
			if (isPrevData) {
				setPatient_Id(patientData.patient_id)
				await fetch(
					// 'https://amrorbackend-uvt9.onrender.com/existing-specimen-register',
					'http://localhost:5000/existing-specimen-register',
					{
						method: 'POST',
						headers: {
							'Content-Type': 'application/json',
						},
						body: JSON.stringify({
							patient_id: patientData.patient_id,
							specimen_data: specimen_data,
						}),
					}
				)
			} else {
				//console.log({ patientData })

				const response = await fetch(
					'http://localhost:5000/new-specimen',
					// 'https://amrorbackend-uvt9.onrender.com/new-specimen',
					{
						method: 'POST',
						headers: {
							'Content-Type': 'application/json',
						},
						body: JSON.stringify({
							patient_data: patientData,
							specimen_data: specimen_data,
						}),
					}
				)
				const result = await response.json()
				setPatient_Id(result.patientId)
			}

			// const result = await response.json()

			// //console.log(result)
		} catch (error) {
			//console.log(error)
		}
	}
	useEffect(() => {
		const tem = patient_id + ' ' + sample_id
		setQrData(tem)
		localStorage.setItem("barcode",tem)
		setShowQr(true)
	}, [patient_id, sample_id])
	const getDetails = async (e) => {
		e.preventDefault()

		//console.log(patient_mobile)
		//console.log(patient_name)
		try {
			if (!patientData.patient_mobile || !patientData.patient_name) {
				alert('Enter Patient Name and Mobile Number')
				return
			}
			const response = await fetch(
				'http://localhost:5000/patient-details',
				// 'https://amrorbackend-uvt9.onrender.com/patient-details',
				{
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({
						patient_mobile: patientData.patient_mobile,
						patient_name: patientData.patient_name,
					}),
				}
			)
			const result = await response.json()
			if (result.success) {
				setPatientData(result.patientData)
				setPatient_Id(patientData.patient_id)
				//console.log('patientData: ', patientData)
				setIsPrevData(true)
			} else {
				setIsPrevData(false)
				alert('Patient details not found, please fill it.')
				setPatientData({
					...patientData,
					hospital_id: '',
					father_name: '',
					village_name: '',
					patient_age: '',
					gender: '',
					location: '',
				})
			}
		} catch (errror) {
			alert('Failed to fetch patient!!!')
			//console.log(errror)
		}
	}

	return (
		<>
			<div className="mt-5">
				{
					<>
						<form className="justify-center flex flex-col">
							<div className="flex w-full justify-evenly">
								<div className="flex flex-col space-y-2 w-[32em]">
									<div className="flex flex-col">
										<label className="text-sm text-gray-800">
											Enter Phone Number:
										</label>
										<input
											id="patient-mobile"
											type="text"
											value={patientData.patient_mobile}
											onChange={(e) =>
												setPatientData({
													...patientData,
													patient_mobile: e.target.value,
												})
											}
											placeholder="Patient Mobile Number"
											className="p-2 border border-gray-300 rounded-md"
											required={true}
										/>
									</div>

									<div className="flex flex-col">
										<label className="text-sm text-gray-800">
											Patient Name:{' '}
										</label>
										<input
											id="patient-name"
											type="text"
											value={patientData.patient_name}
											onChange={(e) =>
												setPatientData({
													...patientData,
													patient_name: e.target.value,
												})
											}
											placeholder="Patient Name"
											className="p-2 border border-gray-300 rounded-md"
											required={true}
										/>
									</div>
									<div className="my-3 flex justify-end">
										<button
											id="submit-button"
											onClick={getDetails}
											className="outline-none  rounded-lg px-5 py-3 bg-red-400 text-white text-lg">
											Check
										</button>
									</div>
								</div>
							</div>
						</form>
						<form className="justify-center flex flex-col">
							<div className="flex w-full justify-evenly">
								<div className="flex flex-col space-y-2 w-[32em]">
									{/* <!-- Hospital Id --> */}
									<div className="flex flex-col">
										<label className="text-sm text-gray-800">
											Hospital Id:
										</label>
										<input
											id="hospital-id"
											type="text"
											value={patientData.hospital_id}
											onChange={(e) =>
												setPatientData({
													...patientData,
													hospital_id: e.target.value,
												})
											}
											placeholder="Hospital ID"
											className="p-2 border border-gray-300 rounded-md"
											disabled={isPrevData}
											required={true}
										/>
									</div>

									{/* <!-- Patient Name --> */}
									<div className="flex flex-col">
										<label className="text-sm text-gray-800">
											Patient Name:
										</label>
										<input
											id="patient-name"
											type="text"
											value={patientData.patient_name}
											onChange={(e) =>
												setPatientData({
													...patientData,
													patient_name: e.target.value,
												})
											}
											disabled={isPrevData}
											placeholder="Patient Name"
											className="p-2 border border-gray-300 rounded-md"
											required={true}
										/>
									</div>

									{/* <!-- Father Name --> */}
									<div className="flex flex-col">
										<label className="text-sm text-gray-800">
											Father/Spouse Name:
										</label>
										<input
											id="father-name"
											type="text"
											value={patientData.father_name}
											onChange={(e) =>
												setPatientData({
													...patientData,
													father_name: e.target.value,
												})
											}
											disabled={isPrevData}
											placeholder="Father/Spouse Name"
											className="p-2 border border-gray-300 rounded-md"
											required={true}
										/>
									</div>

									{/* <!-- Name of the village --> */}
									<div className="flex flex-col">
										<label className="text-sm text-gray-800">
											Name of the Village/Town:
										</label>
										<input
											id="village-name"
											type="text"
											value={patientData.village_name}
											onChange={(e) =>
												setPatientData({
													...patientData,
													village_name: e.target.value,
												})
											}
											disabled={isPrevData}
											placeholder="Village/Town"
											className="p-2 border border-gray-300 rounded-md"
											required={true}
										/>
									</div>

									{/* <!-- Patient Age --> */}
									<div className="flex flex-col">
										<label className="text-sm text-gray-800">
											Patient Age:
										</label>
										<input
											id="patient-age"
											type="number"
											placeholder="Age"
											value={patientData.patient_age}
											onChange={(e) =>
												setPatientData({
													...patientData,
													patient_age: e.target.value,
												})
											}
											className="p-2 border border-gray-300 rounded-md"
											required={true}
										/>
									</div>

									{/* <!-- Gender --> */}
									<div className="flex flex-col">
										<label className="text-sm text-gray-800">Gender:</label>
										<div className="flex items-center space-x-2">
											<input
												type="radio"
												name="gender"
												id="male"
												value="Male"
												checked={patientData.gender === 'Male'}
												onChange={(e) =>
													setPatientData({
														...patientData,
														gender: e.target.value,
													})
												}
												disabled={isPrevData}
												className="mr-1"
											/>
											<label htmlFor="male" className="text-lg">
												Male
											</label>

											<input
												type="radio"
												name="gender"
												id="female"
												value="Female"
												checked={patientData.gender === 'Female'}
												onChange={(e) =>
													setPatientData({
														...patientData,
														gender: e.target.value,
													})
												}
												disabled={isPrevData}
												className="mr-1"
											/>
											<label htmlFor="female" className="text-lg">
												Female
											</label>

											<input
												type="radio"
												name="gender"
												id="others"
												value="Other"
												checked={patientData.gender === 'Other'}
												onChange={(e) =>
													setPatientData({
														...patientData,
														gender: e.target.value,
													})
												}
												disabled={isPrevData}
												className="mr-1"
											/>
											<label htmlFor="others" className="text-lg">
												Others
											</label>
										</div>
									</div>

									{/* <!-- Mobile Number --> */}
									<div className="flex flex-col">
										<label className="text-sm text-gray-800">
											Mobile Number:
										</label>
										<input
											id="patient-mobile"
											type="number"
											value={patientData.patient_mobile}
											onChange={(e) => {
												setPatientData({
													...patientData,
													patient_mobile: e.target.value,
												})
											}}
											placeholder="Mobile"
											disabled={true}
											className="p-2 border border-gray-300 rounded-md"
										/>
									</div>

									{/* <!-- Location --> */}
									<div className="flex flex-col gap-y-1">
										<label className="text-sm text-gray-800">Location:</label>
										<div className="flex gap-x-5">
											<select
												id="microbe_dropdown"
												className="w-48 outline rounded-md"
												value={location}
												onChange={(e) => setLocation(e.target.value)}>
												<option value="">Select</option>
												{locationList.map((loc, index) => {
													return (
														<option key={index} value={loc}>
															{loc}
														</option>
													)
												})}
											</select>

											<input
												id="location"
												type="text"
												value={locationdet}
												onChange={(e) => setLocationDet(e.target.value)}
												// disabled={isPrevData}
												placeholder="Enter the dept."
												className="p-2 border border-gray-300 rounded-md"
											/>
										</div>
									</div>

									{/* <!-- Clinical H/O --> */}
									<div className="flex flex-col">
										<label className="text-sm text-gray-800">
											Clinical H/O:
										</label>

										<textarea
											id="clinical-ho"
											value={clinical_ho}
											onChange={(e) => setClinical_Ho(e.target.value)}
											placeholder="Enter Clinical History..."
											className="resize-none mt-3 w-[80%] h-[15vh] sm:h-24 sm:w-[30vw] border border-black p-4 text-lg rounded"
											required={true}
										/>
									</div>

									{/* <!-- Provisional Diagnosis --> */}
									<div className="flex flex-col">
										<label className="text-sm text-gray-800">
											Provisional Diagnosis:
										</label>
										<textarea
											id="provisional-diagnosis"
											type="text"
											value={provisional_diagnosis}
											onChange={(e) => setProvisional_Diagnosis(e.target.value)}
											placeholder="Enter Provisional Diagnosis"
											className="resize-none mt-3 w-[80%] h-[15vh] sm:h-24 sm:w-[30vw] border border-black p-4 text-lg rounded"
										/>
									</div>

									{/* <!-- Antibiotics Given --> */}
									<div className="flex flex-col">
										<label className="text-sm text-gray-800">
											Antibiotics Given:
										</label>

										<CreatableSelect
											options={options}
											onChange={(val) => {
												setList(val)
												//console.log('skills', list)
											}}
											isMulti={true}
											value={list}
										/>
									</div>
								</div>
								<div className="flex flex-col space-y-2 w-[32em]">
									{/* Sample ID */}
									<div className="flex flex-col">
										<label className="text-sm text-gray-800">Sample ID :</label>
										<input
											id="sample-id"
											type="number"
											value={sample_id}
											placeholder="Sample ID"
											className="p-2 border border-gray-300 rounded-md"
											required={true}
											disabled
										/>
									</div>

									{/* Nature of Specimen */}
									<div className="flex flex-col">
										<label className="text-sm text-gray-800">
											Nature of Specimen :
										</label>
										<div className="flex gap-x-5">
											<select
												id="microbe_dropdown"
												className="w-48 p-2 outline rounded-md"
												value={specimen_nature}
												onChange={(e) => setSpecimen_Nature(e.target.value)}>
												<option value="">Select</option>
												{specimen_nature_drop.map((loc, index) => {
													return (
														<option key={index} value={loc}>
															{loc}
														</option>
													)
												})}
											</select>
											<input
												id="location"
												type="text"
												value={specimen_naturedet}
												onChange={(e) => setspecimen_natureDet(e.target.value)}
												// disabled={isPrevData}
												placeholder="Enter ..."
												className="p-2 border border-gray-300 rounded-md"
											/>
										</div>
									</div>

									{/* Specimen Source/Body site */}
									<div className="flex flex-col">
										<label className="text-sm text-gray-800">
											Specimen Source/Body site :{' '}
										</label>
										<input
											id="specimen-source"
											type="text"
											value={specimen_source}
											onChange={(e) => setSpecimen_Source(e.target.value)}
											placeholder="Specimen source"
											className="p-2 border border-gray-300 rounded-md"
											required={true}
										/>
									</div>

									{/* Date of collection */}
									<div className="flex flex-col">
										<label className="text-sm text-gray-800">
											Date of collection :{' '}
										</label>
										<DatePicker
											value={collectionDate}
											dateFormat="dd-MM-yyyy"
											className="p-2 border border-gray-300 rounded-md"
											id="collection-date"
											onChange={(e) => {
												setCollectionDate(e)
											}}
											required={true}
										/>
									</div>

									{/* Time of collection */}
									<div className="flex flex-col">
										<label className="text-sm text-gray-800">
											Time of collection : -
										</label>
										<input
											id="collection-time"
											type="time"
											value={collection_time}
											onChange={(e) => setCollection_Time(e.target.value)}
											className="p-2 border border-gray-300 rounded-md"
											required={true}
										/>
									</div>

									{/* Duration of illness */}
									<div className="flex flex-col">
										<label className="text-sm text-gray-800">
											Duration of illness (in days): -
										</label>
										<input
											id="illness-duration"
											type="text"
											value={illness_duration}
											onChange={(e) => setIllness_Duration(e.target.value)}
											placeholder="Ex: 5 Days"
											className="p-2 border border-gray-300 rounded-md"
											required={true}
										/>
									</div>

									{/* Investigation Required */}
									<div className="flex flex-col">
										<label className="text-sm text-gray-800">
											Investigation Required : -
										</label>
										<div className="flex gap-x-5">
											<select
												id="investigation-required"
												className="w-48 p-2 outline rounded-md"
												value={investigation_required}
												onChange={(e) =>
													setInvestigation_Required(e.target.value)
												}>
												<option value="">Select</option>
												{dropDown3.map((loc, index) => {
													return (
														<option key={index} value={loc}>
															{loc}
														</option>
													)
												})}
											</select>
											<input
												id="location"
												type="text"
												value={investigation_requireddet}
												onChange={(e) =>
													setInvestigation_RequiredDet(e.target.value)
												}
												// disabled={isPrevData}
												placeholder="Enter ..."
												className="p-2 border border-gray-300 rounded-md"
											/>
										</div>
									</div>

									{/* Date of admission */}
									<div className="flex flex-col">
										<label className="text-sm text-gray-800">
											Date of admission : -
										</label>
										<DatePicker
											value={admissionDate}
											dateFormat="dd-MM-yyyy"
											className="p-2 border border-gray-300 rounded-md"
											onChange={(e) => {
												setAdmissionDate(e)
											}}
											id="admission-date"
											required={true}
										/>
									</div>

									{/* Name of the Physician */}
									<div className="flex flex-col">
										<label className="text-sm text-gray-800">
											Name of the Physician/Nurse : -
										</label>
										<input
											id="physician-name"
											type="text"
											value={physician_name}
											onChange={(e) => setPhysician_Name(e.target.value)}
											placeholder=""
											className="p-2 border border-gray-300 rounded-md"
											required={true}
										/>
									</div>
								</div>
							</div>
							<div className="my-3 flex justify-end">
								<button
									className="bg-red-500 w-[20%]  text-white py-2 px-4 rounded"
									type="submit"
									onClick={submitNewSpecimen}>
									Submit
								</button>
							</div>
						</form>
					</>
				}
			</div>
			{showQr && (
				<div className="mt-3 text-2xl  border-solid border-black border-3 w-[35vw] h-[35vh] flex justify-center items-center">
					{<QRCodePrint data={qrdata} />}
				</div>
			)}
		</>
	)
}

const QRCodePrint = ({ data }) => {
	const qrCodeRef = useRef()

	return (
		<div>
			<ReactToPrint
				bodyClass="print-agreement"
				content={() => qrCodeRef.current}
				trigger={() => <button type="primary">Print</button>}
			/>
			<Barcode value={data} ref={qrCodeRef} />
		</div>
	)
}

export default ExistingPatient
