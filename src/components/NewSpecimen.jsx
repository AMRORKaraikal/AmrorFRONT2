import { useState, useRef, useEffect } from 'react'
import DatePicker from 'react-date-picker'
import 'react-date-picker/dist/DatePicker.css'
import 'react-calendar/dist/Calendar.css'
import ReactToPrint from 'react-to-print'
import Barcode from 'react-barcode'

const NewSpecimen = () => {
	const [collectionDate, setCollectionDate] = useState(new Date())
	const [admissionDate, setAdmissionDate] = useState(new Date())
	const [hospital_id, setHospital_Id] = useState('')
	const [patient_name, setPatient_Name] = useState('')
	const [father_name, setFather_Name] = useState('')
	const [village_name, setVillage_Name] = useState('')
	const [patient_age, setPatient_Age] = useState(0)
	const [gender, setGender] = useState('Other')
	const [patient_mobile, setPatient_Mobile] = useState(0)
	const [location, setLocation] = useState('')
	const [clinical_ho, setClinical_Ho] = useState('')
	const [provisional_diagnosis, setProvisional_Diagnosis] = useState('')
	const [antibiotics_given, setAntibiotics_Given] = useState('')
	const [sample_id, setSample_Id] = useState(0)
	const [specimen_nature, setSpecimen_Nature] = useState('')
	const [specimen_source, setSpecimen_Source] = useState('')
	const [collection_time, setCollection_Time] = useState('')
	const [illness_duration, setIllness_Duration] = useState('')
	const [investigation_required, setInvestigation_Required] = useState('')
	const [specimen_collector, setSpecimen_Collector] = useState('')
	const [physician_name, setPhysician_Name] = useState('')

	const [qrdata, setQrData] = useState('')
	const [showQr, setShowQr] = useState(false)

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
		const patient_data = {
			hospital_id: hospital_id,
			patient_name: patient_name,
			father_name: father_name,
			village_name: village_name,
			patient_age: patient_age,
			gender: gender,
			patient_mobile: patient_mobile,
			location: location,
			clinical_ho: clinical_ho,
			provisional_diagnosis: provisional_diagnosis,
			antibiotics_given: antibiotics_given,
		}

		const specimen_data = {
			specimen_id: sample_id,
			specimen_nature: specimen_nature,
			specimen_source: specimen_source,
			collection_date: collectionDate,
			collection_time: collection_time,
			illness_duration: illness_duration,
			investigation_required: investigation_required,
			specimen_collector: specimen_collector,
			admission_date: admissionDate,
			physician_name: physician_name,
		}
		try {
			if (
				!hospital_id ||
				!patient_name ||
				!father_name ||
				!village_name ||
				!patient_age ||
				!patient_mobile
			) {
				alert('Enter all the details')
				return
			}
			const response = await fetch(
				'https://amrorbackend-uvt9.onrender.com/new-specimen',
				{
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({
						patient_data: patient_data,
						specimen_data: specimen_data,
					}),
				}
			)

			const result = await response.json()

			const tem = result.patientId + ' ' + sample_id
			setQrData(tem)
			setShowQr(true)

			// //console.log(result)
		} catch (error) {
			//console.log(error)
		}
	}

	return (
		<>
			{showQr && (
				<div className="mt-3 text-2xl  border-solid border-black border-3 w-[35vw] h-[35vh] flex justify-center items-center">
					{<QRCodePrint data={qrdata} />}
				</div>
			)}

			<div className="mt-5">
				{
					<form className="justify-center flex flex-col">
						<div className="flex w-full justify-evenly">
							<div className="flex flex-col space-y-2 w-[32em]">
								{/* <!-- Hospital Id --> */}
								<div className="flex flex-col">
									<label className="text-sm text-gray-600">Hospital Id:</label>
									<input
										id="hospital-id"
										type="text"
										value={hospital_id}
										onChange={(e) => setHospital_Id(e.target.value)}
										placeholder="Hospital ID"
										className="p-2 border border-gray-300 rounded-md"
										required={true}
									/>
								</div>

								{/* <!-- Patient Name --> */}
								<div className="flex flex-col">
									<label className="text-sm text-gray-600">Patient Name:</label>
									<input
										id="patient-name"
										type="text"
										value={patient_name}
										onChange={(e) => setPatient_Name(e.target.value)}
										placeholder="Patient Name"
										className="p-2 border border-gray-300 rounded-md"
										required={true}
									/>
								</div>

								{/* <!-- Father Name --> */}
								<div className="flex flex-col">
									<label className="text-sm text-gray-600">Father Name:</label>
									<input
										id="father-name"
										type="text"
										value={father_name}
										onChange={(e) => setFather_Name(e.target.value)}
										placeholder="Father Name"
										className="p-2 border border-gray-300 rounded-md"
										required={true}
									/>
								</div>

								{/* <!-- Name of the village --> */}
								<div className="flex flex-col">
									<label className="text-sm text-gray-600">
										Name of the village:
									</label>
									<input
										id="village-name"
										type="text"
										value={village_name}
										onChange={(e) => setVillage_Name(e.target.value)}
										placeholder="Village"
										className="p-2 border border-gray-300 rounded-md"
										required={true}
									/>
								</div>

								{/* <!-- Patient Age --> */}
								<div className="flex flex-col">
									<label className="text-sm text-gray-600">Patient Age:</label>
									<input
										id="patient-age"
										type="number"
										placeholder="Age"
										value={patient_age}
										onChange={(e) => setPatient_Age(e.target.value)}
										className="p-2 border border-gray-300 rounded-md"
										required={true}
									/>
								</div>

								{/* <!-- Gender --> */}
								<div className="flex flex-col">
									<label className="text-sm text-gray-600">Gender:</label>
									<div className="flex items-center space-x-2">
										<input
											type="radio"
											name="gender"
											id="male"
											value="Male"
											checked={gender === 'Male'}
											onChange={(e) => setGender(e.target.value)}
											className="mr-1"
										/>
										<label htmlFor="male" className="text-sm">
											Male
										</label>

										<input
											type="radio"
											name="gender"
											id="female"
											value="Female"
											checked={gender === 'Female'}
											onChange={(e) => setGender(e.target.value)}
											className="mr-1"
										/>
										<label htmlFor="female" className="text-sm">
											Female
										</label>

										<input
											type="radio"
											name="gender"
											id="others"
											value="Other"
											checked={gender === 'Other'}
											onChange={(e) => setGender(e.target.value)}
											className="mr-1"
										/>
										<label htmlFor="others" className="text-sm">
											Others
										</label>
									</div>
								</div>

								{/* <!-- Mobile Number --> */}
								<div className="flex flex-col">
									<label className="text-sm text-gray-600">
										Mobile Number:
									</label>
									<input
										id="patient-mobile"
										type="number"
										value={patient_mobile}
										onChange={(e) => setPatient_Mobile(e.target.value)}
										placeholder="Mobile"
										className="p-2 border border-gray-300 rounded-md"
									/>
								</div>

								{/* <!-- Location --> */}
								<div className="flex flex-col">
									<label className="text-sm text-gray-600">Location:</label>
									<input
										id="location"
										type="text"
										value={location}
										onChange={(e) => setLocation(e.target.value)}
										placeholder="Ward"
										className="p-2 border border-gray-300 rounded-md"
										required={true}
									/>
								</div>

								{/* <!-- Clinical H/O --> */}
								<div className="flex flex-col">
									<label className="text-sm text-gray-600">Clinical H/O:</label>
									<input
										id="clinical-ho"
										type="text"
										value={clinical_ho}
										onChange={(e) => setClinical_Ho(e.target.value)}
										placeholder=""
										className="p-2 border border-gray-300 rounded-md"
									/>
								</div>

								{/* <!-- Provisional Diagnosis --> */}
								<div className="flex flex-col">
									<label className="text-sm text-gray-600">
										Provisional Diagnosis:
									</label>
									<input
										id="provisional-diagnosis"
										type="text"
										value={provisional_diagnosis}
										onChange={(e) => setProvisional_Diagnosis(e.target.value)}
										placeholder=""
										className="p-2 border border-gray-300 rounded-md"
									/>
								</div>

								{/* <!-- Antibiotics Given --> */}
								<div className="flex flex-col">
									<label className="text-sm text-gray-600">
										Antibiotics Given:
									</label>
									<input
										id="antibiotics-given"
										type="text"
										value={antibiotics_given}
										onChange={(e) => setAntibiotics_Given(e.target.value)}
										placeholder=""
										className="p-2 border border-gray-300 rounded-md"
										required={true}
									/>
								</div>
							</div>
							<div className="flex flex-col space-y-2 w-[32em]">
								{/* Sample ID */}
								<div className="flex flex-col">
									<label className="text-sm text-gray-600">Sample ID :</label>
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
									<label className="text-sm text-gray-600">
										Nature of Specimen :
									</label>
									<input
										id="specimen-nature"
										type="text"
										value={specimen_nature}
										onChange={(e) => setSpecimen_Nature(e.target.value)}
										placeholder="Specimen Nature"
										className="p-2 border border-gray-300 rounded-md"
										required={true}
									/>
								</div>

								{/* Specimen Source/Body site */}
								<div className="flex flex-col">
									<label className="text-sm text-gray-600">
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
									<label className="text-sm text-gray-600">
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
									<label className="text-sm text-gray-600">
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
									<label className="text-sm text-gray-600">
										Duration of illness : -
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
									<label className="text-sm text-gray-600">
										Investigation Required : -
									</label>
									<input
										id="investigation-required"
										type="text"
										value={investigation_required}
										onChange={(e) => setInvestigation_Required(e.target.value)}
										placeholder=""
										className="p-2 border border-gray-300 rounded-md"
										required={true}
									/>
								</div>

								{/* Specimen Collected By */}
								<div className="flex flex-col">
									<label className="text-sm text-gray-600">
										Specimen Collected By : -
									</label>
									<input
										id="specimen-collector"
										type="text"
										value={specimen_collector}
										onChange={(e) => setSpecimen_Collector(e.target.value)}
										placeholder=""
										className="p-2 border border-gray-300 rounded-md"
										required={true}
									/>
								</div>

								{/* Date of admission */}
								<div className="flex flex-col">
									<label className="text-sm text-gray-600">
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
									<label className="text-sm text-gray-600">
										Name of the Physician : -
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
				}
			</div>
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

export default NewSpecimen
