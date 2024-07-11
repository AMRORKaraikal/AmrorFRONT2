const Preview = ({ patientData, SpecimenData }) => {
	const {
		hospital_id,
		patient_name,
		father_name,
		village_name,
		patient_age,
		gender,
		patient_mobile,
	} = patientData
	const {
		specimen_id,
		specimen_nature,
		specimen_source,

		illness_duration,
		investigation_required,

		physician_name,
		location,
		clinical_ho,
		provisional_diagnosis,
		antibiotics_given,
	} = SpecimenData
	return (
		<div className="flex w-full justify-evenly">
			<div className="flex flex-col space-y-2 w-[32em]">
				{/* <!-- Hospital Id --> */}
				<div className="flex flex-col">
					<label className="text-sm text-gray-600">Hospital Id:</label>
					<input
						id="hospital-id"
						type="text"
						value={hospital_id}
						placeholder="Hospital ID"
						className="p-2 border border-gray-300 rounded-md"
						required={true}
						readOnly={true}
					/>
				</div>

				{/* <!-- Patient Name --> */}
				<div className="flex flex-col">
					<label className="text-sm text-gray-600">Patient Name:</label>
					<input
						id="patient-name"
						type="text"
						value={patient_name}
						placeholder="Patient Name"
						className="p-2 border border-gray-300 rounded-md"
						required={true}
						readOnly={true}
					/>
				</div>

				{/* <!-- Father Name --> */}
				<div className="flex flex-col">
					<label className="text-sm text-gray-600">Father Name:</label>
					<input
						id="father-name"
						type="text"
						value={father_name}
						placeholder="Father Name"
						className="p-2 border border-gray-300 rounded-md"
						required={true}
						readOnly={true}
					/>
				</div>

				{/* <!-- Name of the village --> */}
				<div className="flex flex-col">
					<label className="text-sm text-gray-600">Name of the village:</label>
					<input
						id="village-name"
						type="text"
						value={village_name}
						placeholder="Village"
						className="p-2 border border-gray-300 rounded-md"
						required={true}
						readOnly={true}
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
						className="p-2 border border-gray-300 rounded-md"
						required={true}
						readOnly={true}
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
							className="mr-1"
							readOnly={true}
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
							className="mr-1"
							readOnly={true}
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
							className="mr-1"
							readOnly={true}
						/>
						<label htmlFor="others" className="text-sm">
							Others
						</label>
					</div>
				</div>

				{/* <!-- Mobile Number --> */}
				<div className="flex flex-col">
					<label className="text-sm text-gray-600">Mobile Number:</label>
					<input
						id="patient-mobile"
						type="number"
						value={patient_mobile}
						placeholder="Mobile"
						className="p-2 border border-gray-300 rounded-md"
						readOnly={true}
					/>
				</div>

				{/* <!-- Location --> */}
				<div className="flex flex-col">
					<label className="text-sm text-gray-600">Location:</label>
					<input
						id="location"
						type="text"
						value={location}
						placeholder="Ward"
						className="p-2 border border-gray-300 rounded-md"
						required={true}
						readOnly={true}
					/>
				</div>

				{/* <!-- Clinical H/O --> */}
				<div className="flex flex-col">
					<label className="text-sm text-gray-600">Clinical H/O:</label>
					<input
						id="clinical-ho"
						type="text"
						value={clinical_ho}
						placeholder=""
						className="p-2 border border-gray-300 rounded-md"
						readOnly={true}
					/>
				</div>
			</div>
			<div className="flex flex-col space-y-2 w-[32em]">
				{/* Sample ID */}
				<div className="flex flex-col">
					<label className="text-sm text-gray-600">Sample ID : -</label>
					<input
						id="sample-id"
						type="number"
						value={specimen_id}
						placeholder="Sample ID"
						className="p-2 border border-gray-300 rounded-md"
						required={true}
						readOnly={true}
					/>
				</div>

				{/* Nature of Specimen */}
				<div className="flex flex-col">
					<label className="text-sm text-gray-600">
						Nature of Specimen : -
					</label>
					<input
						id="specimen-nature"
						type="text"
						value={specimen_nature}
						placeholder="Specimen Nature"
						className="p-2 border border-gray-300 rounded-md"
						readOnly={true}
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
						placeholder="Specimen source"
						className="p-2 border border-gray-300 rounded-md"
						readOnly={true}
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
						placeholder="Ex: 5 Days"
						className="p-2 border border-gray-300 rounded-md"
						readOnly={true}
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
						placeholder=""
						className="p-2 border border-gray-300 rounded-md"
						readOnly={true}
						required={true}
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
						placeholder=""
						readOnly={true}
						className="p-2 border border-gray-300 rounded-md"
					/>
				</div>

				{/* <!-- Antibiotics Given --> */}
				<div className="flex flex-col">
					<label className="text-sm text-gray-600">Antibiotics Given:</label>
					<input
						id="antibiotics-given"
						type="text"
						value={antibiotics_given}
						placeholder=""
						className="p-2 border border-gray-300 rounded-md"
						required={true}
						readOnly={true}
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
						placeholder=""
						className="p-2 border border-gray-300 rounded-md"
						readOnly={true}
						required={true}
					/>
				</div>
			</div>
		</div>
	)
}

export default Preview
