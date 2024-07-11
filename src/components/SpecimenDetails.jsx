import { useEffect, useState } from 'react'
import DatePicker from 'react-date-picker'
import {
	microbes_list,
	antibiotic_list,
	dropDown1,
	dropDown2,
	standard_comments,
} from './data'
import Preview from './Preview'
const SpecimenDetails = () => {
	const [directMicroscopicExamination, setDirectMicroscopicExamination] =
		useState('')
	const [details, setDetails] = useState(false)
	const [patientData, setPatientData] = useState()
	const [specimenData, setSpecimenData] = useState()
	const [cultureResult, setCultureResult] = useState('')

	// const [sample_id, setSample_Id] = useState(0)
	const [microbe, setMicrobe] = useState(microbes_list[0])
	const [directSmear, setDirectSmear] = useState(dropDown1[0])
	const [microbe2, setMicrobe2] = useState(microbes_list[0])
	const [microbe3, setMicrobe3] = useState('others')

	const [dSNote, setDSNote] = useState('')
	const [growthTime, setGrowthTime] = useState(dropDown2[0])

	const [newMicrobe, setNewMicrobe] = useState('')
	const [newMicrobe3, setNewMicrobe3] = useState('')
	const [newComment, setNewComment] = useState('')
	const [newMicrobe2, setNewMicrobe2] = useState('')
	const [antibiotic, setAntibiotic] = useState(antibiotic_list[0])
	const [newAntibiotic, setNewAntibiotic] = useState('')
	const [result, setResult] = useState('Resistant')
	const [notes, setNotes] = useState('')
	const [reportDate, setReportDate] = useState(new Date())
	const [reporterName, setReporterName] = useState('')
	const [reporterDesignation, setReporterDesignation] = useState('')
	const [table, setTable] = useState([])
	const [table2, setTable2] = useState([])
	const [table3, setTable3] = useState([])
	const [table4, setTable4] = useState([])

	const [patient_id, setPatient_id] = useState(localStorage.getItem("barcode")?.split(" ")[0]|'')
	const [specimen_id, setSpecimen_id] = useState(localStorage.getItem("barcode")?.split(" ")[1]|'')
	const [micVal, setMicVal] = useState('')
	const [micResult, setMicResult] = useState('')
	const [commentsList, setCommentsList] = useState([])
	const [comments, setComments] = useState('')
	const [comment1, setComment1] = useState('')
	
	

	const getDetails = async (e) => {
		e.preventDefault()

		//console.log(patient_id)
		//console.log(specimen_id)
		try {
			if (!patient_id || !specimen_id) {
				alert('Enter Patient ID and Speciment ID')
				return
			}
			const response = await fetch(
				'https://amrorbackend-uvt9.onrender.com/get-report-details',
				{
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({
						patient_id: patient_id,
						specimen_id: specimen_id,
					}),
				}
			)
			const result = await response.json()
			//console.log(result)
			if (result.success) {
				setSpecimenData(result.specimenData)
				setPatientData(result.patientData)
				setDetails(true)
				//console.log(result.patientData.patient_id)
				// setPatient_id(result.patientData.patient_id)
			}
		} catch (errror) {
			alert('Failed to fetch report!!!')
			//console.log(errror)
		}
	}

	const handleSubmit = async (e) => {
		// Implement your submission logic here
		// Access the form data using the state variables
		e.preventDefault()
		//console.log('table: ', table)

		setTimeout(() => {}, 5000)
		// Wait for a brief moment to activate the camera
		setTimeout(async () => {
			// Inside this block, the camera is active
			// setPatient_id(patientData.patient_id)
			//console.log(patient_id)
			// //console.log(patient_id)
			//console.log(specimen_id)
			try {
				const report_data = {
					patient_id: patientData.patient_id,
					specimen_id: specimen_id,
					direct_microscopic_examination: directMicroscopicExamination,
					culture_results: cultureResult,
					ast: table,
					comments: comments,
					note: notes,
					report_date: reportDate,
					reporter_name: reporterName,
					reporter_designation: reporterDesignation,
				}
				//console.log(patient_id, specimen_id, report_data)
				const response = await fetch(
					'https://amrorbackend-uvt9.onrender.com/new-report',
					{
						method: 'POST',
						headers: {
							'Content-Type': 'application/json',
						},
						body: JSON.stringify({
							report_data: report_data,
						}),
					}
				)

				const result = await response.json()

				if (result.success) {
					alert(result.message)
				} else {
					alert('Submit Failed, try again')
					console.error(result.message)
					return
				}
			} catch (error) {
				console.error('Error during form submission:', error)
				alert('An error occurred during submission. Please try again.')
				return
			} finally {
			}
		}, 10000)
	}

	const handleAdd = (e) => {
		e.preventDefault()
		if (microbe === '' || antibiotic === '' || result === '') {
			alert('Value missing\nSelect the dropdown menu')
		} else {
			let m1, a1, r1, snum, mic1, micres
			if (microbe === 'other') {
				m1 = newMicrobe
			} else {
				m1 = microbe
			}
			if (antibiotic === 'other') {
				a1 = newAntibiotic
			} else {
				a1 = antibiotic
			}
			r1 = result
			mic1 = micVal
			micres = micResult
			setMicVal('')
			setMicResult('')
			// setMicrobe(microbes_list[0])
			setAntibiotic(antibiotic_list[0])
			setResult('Resistant')

			let maxi = table.length

			snum = maxi + 1
			if (table.length === 0) {
				snum = 1
			}

			let data = {
				SNO: snum,
				Microbe: m1,
				Antibiotic: a1,
				Result: r1,
				Mic: mic1,
				Mic_result: micres,
			}
			setTable([...table, data])

			//console.log('added successfully')
		}
	}
	const handleAdd2 = (e) => {
		e.preventDefault()
		if (directSmear === '' || dSNote === '') {
			alert('Value missing\nSelect the dropdown menu')
		} else {
			let val1, val2, snum

			val1 = directSmear
			val2 = dSNote

			setDirectSmear(dropDown1[0])
			setDSNote('')

			let maxi = table2.length

			snum = maxi + 1
			if (table2.length === 0) {
				snum = 1
			}

			let data = { SNO: snum, val1: val1, val2: val2 }
			setTable2([...table2, data])
			//console.log('added successfully')
		}
	}
	const handleAdd5 = (e) => {
		e.preventDefault()

		let val1, val2, snum
		if (microbe3 === 'others') {
			val1 = newMicrobe3
			console.log(val1)
		} else {
			val1 = microbe3
			console.log(val1)
		}
		if (comment1 === 'others') {
			val2 = newComment
		} else {
			val2 = comment1
		}

		setMicrobe2(microbes_list[0])
		setComment1('')

		let maxi = table4.length

		snum = maxi + 1
		if (table4.length === 0) {
			snum = 1
		}

		let data = { SNO: snum, val1: val1, val2: val2 }
		setTable4([...table4, data])
		//console.log('added successfully')
	}
	useEffect(() => {
		let dma = ''
		table2.forEach((item) => {
			dma = dma + item.val1 + ' - ' + item.val2 + '.'
		})
		setDirectMicroscopicExamination(dma)
	}, [table2])
	useEffect(() => {
		let dma = ''
		table4.forEach((item) => {
			dma = dma + item.val1 + ' - ' + item.val2 + '.'
		})
		setComments(dma)
	}, [table4])
	useEffect(() => {
		let culres = ''
		if (table3[0]) {
			if (table3[0].val1 === '') {
				culres = 'No growth after ' + table3[0].val2 + ' of incubation.'
			} else {
				table3.forEach((item) => {
					culres =
						culres +
						'Growth of ' +
						item.val1 +
						' after ' +
						item.val2 +
						' of incubation.'
				})
			}
		}
		setCultureResult(culres)
	}, [table3])
	const handleAdd3 = (e) => {
		e.preventDefault()
		if (microbe2 === '' || growthTime === '') {
			alert('Value missing\nSelect the dropdown menu')
		} else {
			if (table3[0]) {
				if (table3[0].val1 === '') {
					let val1, val2, snum

					if (microbe2 === 'other') {
						val1 = newMicrobe2
					} else {
						val1 = microbe2
					}

					val2 = growthTime

					setMicrobe2(microbes_list[0])
					setGrowthTime(dropDown2[0])

					snum = 1

					let data = { SNO: snum, val1: val1, val2: val2 }
					setTable3([data])

					//console.log('added successfully')
				} else {
					let val1, val2, snum

					if (microbe2 === 'other') {
						val1 = newMicrobe2
					} else {
						val1 = microbe2
					}

					val2 = growthTime

					setMicrobe2(microbes_list[0])
					setGrowthTime(dropDown2[0])

					let maxi = table3.length

					snum = maxi + 1
					if (table3.length === 0) {
						snum = 1
					}

					let data = { SNO: snum, val1: val1, val2: val2 }
					setTable3([...table3, data])

					//console.log('added successfully')
				}
			} else {
				let val1, val2, snum

				if (microbe2 === 'other') {
					val1 = newMicrobe2
				} else {
					val1 = microbe2
				}

				val2 = growthTime

				setMicrobe2(microbes_list[0])
				setGrowthTime(dropDown2[0])

				let maxi = table3.length

				snum = maxi + 1
				if (table3.length === 0) {
					snum = 1
				}

				let data = { SNO: snum, val1: val1, val2: val2 }
				setTable3([...table3, data])

				//console.log('added successfully')
			}
		}
	}
	const handleAdd4 = (e) => {
		e.preventDefault()
		if (growthTime === '') {
			alert('Value missing\nSelect the dropdown menu')
		} else {
			let val1, val2, snum

			val1 = ''

			val2 = growthTime

			setMicrobe2(microbes_list[0])
			setGrowthTime(dropDown2[0])

			snum = 1

			let data = { SNO: snum, val1: val1, val2: val2 }
			setTable3([data])

			//console.log('added successfully')
		}
	}
	const handleClear = (e, delNo) => {
		e.preventDefault()
		if (!delNo) {
			alert('Value missing\nEnter the serial number')
		} else {
			let len = table.length

			if (len !== delNo) {
				let tempTable = [...table]

				tempTable = tempTable.filter((data) => {
					return data.SNO < delNo || data.SNO > delNo
				})
				//console.log('After Filter: ', tempTable)
				tempTable = tempTable.map((data) => {
					if (data.SNO > delNo) {
						// Decrement SNO for elements greater than specificSnoo
						return { ...data, SNO: data.SNO - 1 }
					}
					return data
				})
				//console.log('After map: ', tempTable)
				setTable([])
				setTable([...tempTable])
			} else {
				let tempTable = []

				tempTable = table.filter((data) => data.SNO !== delNo)
				//console.log('After Filter: ', tempTable)
				setTable([])
				setTable([...tempTable])
			}
			//console.log('after: ', table)
		}
	}
	const handleClear5 = (e, delNo) => {
		e.preventDefault()
		if (!delNo) {
			alert('Value missing\nEnter the serial number')
		} else {
			let len = table.length

			if (len !== delNo) {
				let tempTable = [...table]

				tempTable = tempTable.filter((data) => {
					return data.SNO < delNo || data.SNO > delNo
				})
				//console.log('After Filter: ', tempTable)
				tempTable = tempTable.map((data) => {
					if (data.SNO > delNo) {
						// Decrement SNO for elements greater than specificSnoo
						return { ...data, SNO: data.SNO - 1 }
					}
					return data
				})
				//console.log('After map: ', tempTable)
				setTable([])
				setTable([...tempTable])
			} else {
				let tempTable = []

				tempTable = table.filter((data) => data.SNO !== delNo)
				//console.log('After Filter: ', tempTable)
				setTable([])
				setTable([...tempTable])
			}
			//console.log('after: ', table)
		}
	}
	useEffect(() => {
		if (standard_comments[microbe3])
			setCommentsList(standard_comments[microbe3])
		else setCommentsList(standard_comments['default'])
	}, [microbe3])
	const handleClear2 = (e, delNo) => {
		e.preventDefault()
		if (!delNo) {
			alert('Value missing\nEnter the serial number')
		} else {
			let len = table2.length

			if (len !== delNo) {
				let tempTable = [...table2]

				tempTable = tempTable.filter((data) => {
					return data.SNO < delNo || data.SNO > delNo
				})
				//console.log('After Filter: ', tempTable)
				tempTable = tempTable.map((data) => {
					if (data.SNO > delNo) {
						// Decrement SNO for elements greater than specificSnoo
						return { ...data, SNO: data.SNO - 1 }
					}
					return data
				})
				//console.log('After map: ', tempTable)
				setTable2([])
				setTable2([...tempTable])
			} else {
				let tempTable = []

				tempTable = table2.filter((data) => data.SNO !== delNo)
				//console.log('After Filter: ', tempTable)
				setTable2([])
				setTable2([...tempTable])
			}
			//console.log('after: ', table2)
		}
	}
	const handleClear3 = (e, delNo) => {
		e.preventDefault()
		if (!delNo) {
			alert('Value missing\nEnter the serial number')
		} else {
			let len = table3.length

			if (len !== delNo) {
				let tempTable = [...table3]

				tempTable = tempTable.filter((data) => {
					return data.SNO < delNo || data.SNO > delNo
				})
				//console.log('After Filter: ', tempTable)
				tempTable = tempTable.map((data) => {
					if (data.SNO > delNo) {
						// Decrement SNO for elements greater than specificSnoo
						return { ...data, SNO: data.SNO - 1 }
					}
					return data
				})
				//console.log('After map: ', tempTable)
				setTable3([])
				setTable3([...tempTable])
			} else {
				let tempTable = []

				tempTable = table3.filter((data) => data.SNO !== delNo)
				//console.log('After Filter: ', tempTable)
				setTable3([])
				setTable3([...tempTable])
			}
			//console.log('after: ', table3)
		}
	}

	return (
		<div className="container mx-auto  mt-8">
			<>
				<form className="justify-center flex flex-col">
					<div className="flex w-full justify-evenly">
						<div className="flex flex-col space-y-2 w-[32em]">
						<div className="flex flex-col">
								<label className="text-sm text-gray-600">Scan</label>
								<input
									id="patient-id"
									type="text"
									
									onChange={(e) =>{
										 setPatient_id(e.target.value.split(" ")[0])
										 setSpecimen_id(e.target.value.split(" ")[1])
										}}
									placeholder="scan barcode"
									className="p-2 border border-gray-300 rounded-md"
									required={true}
								/>
							</div>
							<div className="flex flex-col">
								<label className="text-sm text-gray-600">Patient ID:</label>
								<input
									id="patient-id"
									type="text"
									value={patient_id}
									onChange={(e) => setPatient_id(e.target.value)}
									placeholder="Patient ID"
									className="p-2 border border-gray-300 rounded-md"
									required={true}
								/>
							</div>

							<div className="flex flex-col">
								<label className="text-sm text-gray-600">Sample ID :</label>
								<input
									id="sample-id"
									type="text"
									value={specimen_id}
									onChange={(e) => setSpecimen_id(e.target.value)}
									placeholder="Sample ID"
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
				{details && (
					<Preview patientData={patientData} SpecimenData={specimenData} />
				)}
				<form>
					<div className="items-center mx-8 ">
						<h1 className="mt-5 text-center font-bold  text-3xl">Report</h1>

						<div className="flex  gap-10 justify-between mt-7">
							<div>
								<h3 className="mb-6 font-semibold text-xl">
									Direct Smear Result:
								</h3>
								<div className="flex gap-x-4">
									<select
										className="outline rounded-md"
										value={directSmear}
										onChange={(e) => setDirectSmear(e.target.value)}>
										{dropDown1.map((elem, index) => {
											return (
												<option key={index} value={elem}>
													{elem}
												</option>
											)
										})}
									</select>

									<textarea
										placeholder=""
										className="resize-none  w-[80%] h-[8vh] sm:h-15 sm:w-[30vw] border border-black p-4 text-lg rounded"
										value={dSNote}
										onChange={(e) => setDSNote(e.target.value)}
									/>
									<button
										className=" text-white bg-green-600 px-4 py-2 rounded-md"
										onClick={handleAdd2}>
										Add
									</button>
								</div>
								<div>
									<div className="mx-auto w-3/8 sm:w-3/4 border-2 border-black mt-3">
										{table2.map((data, index) => {
											return (
												<div key={index} className="w-full">
													<div className="flex">
														<div className="border-2 border-black text-center bg-yellow-200 text-black text-lg p-4 w-1/12">
															{data.SNO}
														</div>
														<div className="border-2 border-black text-center bg-yellow-200 text-black text-lg p-4 w-3/12">
															{data.val1}
														</div>
														<div className="border-2 border-black text-center bg-yellow-200 text-black text-lg p-4 w-6/12">
															{data.val2}
														</div>

														<div className="border-2 border-black text-center bg-yellow-200 text-black text-lg p-4 w-2/12">
															<button
																className="cursor-pointer"
																onClick={(e) => handleClear2(e, data.SNO)}>
																❌
															</button>
														</div>
													</div>
												</div>
											)
										})}
									</div>
								</div>
							</div>
							<div className="w-full flex flex-col gap-6">
								<h3 className="font-semibold text-xl">Culture Results:</h3>
								<p className="flex gap-3 flex-wrap">
									Growth of{' '}
									<select
										className="outline rounded-md"
										value={microbe2}
										onChange={(e) => setMicrobe2(e.target.value)}>
										{microbes_list.map((elem, index) => {
											return (
												<option key={index} value={elem}>
													{elem}
												</option>
											)
										})}
									</select>{' '}
									<input
										type="text"
										value={newMicrobe2}
										onChange={(e) => setNewMicrobe2(e.target.value)}
										placeholder="Other"
										className="p-2 border border-gray-300 rounded-md"
									/>
									after{' '}
									<select
										className="outline rounded-md"
										value={growthTime}
										onChange={(e) => setGrowthTime(e.target.value)}>
										{dropDown2.map((elem, index) => {
											return (
												<option key={index} value={elem}>
													{elem}
												</option>
											)
										})}
									</select>{' '}
									of incubation
									<button
										className=" text-white bg-green-600 px-4 py-2 rounded-md"
										onClick={handleAdd3}>
										Add
									</button>
								</p>
								<p className="font-bold">OR</p>
								<p className="flex gap-3 flex-wrap">
									No growth after{' '}
									<select
										className="outline rounded-md"
										value={growthTime}
										onChange={(e) => setGrowthTime(e.target.value)}>
										{dropDown2.map((elem, index) => {
											return (
												<option key={index} value={elem}>
													{elem}
												</option>
											)
										})}
									</select>{' '}
									of incubation
									<button
										className=" text-white bg-green-600 px-4 py-2 rounded-md"
										onClick={handleAdd4}>
										Add
									</button>
								</p>

								<div>
									<div className="mx-auto w-3/8 sm:w-3/4 border-2 border-black mt-3">
										{table3.map((data, index) => {
											return (
												<div key={index} className="w-full">
													<div className="flex">
														<div className="border-2 border-black text-center bg-yellow-200 text-black text-lg p-4 w-1/12">
															{data.SNO}
														</div>
														<div className="border-2 border-black text-center bg-yellow-200 text-black text-lg p-4 w-6/12">
															{data.val1 === '' ? 'No Growth' : data.val1}
														</div>
														<div className="border-2 border-black text-center bg-yellow-200 text-black text-lg p-4 w-3/12">
															{data.val2}
														</div>

														<div className="border-2 border-black text-center bg-yellow-200 text-black text-lg p-4 w-2/12">
															<button
																className="cursor-pointer"
																onClick={(e) => handleClear3(e, data.SNO)}>
																❌
															</button>
														</div>
													</div>
												</div>
											)
										})}
									</div>
								</div>
							</div>
						</div>

						<h3 className="text-center font-semibold text-xl underline mt-10">
							Antimicrobial Susceptibility Testing Result:
						</h3>
						<div className="flex items-center flex-wrap justify-center gap-5 mb-8 mt-8">
							<div className="flex flex-col gap-4" id="cont1">
								<label className="font-bold">Select Microbe:</label>
								<select
									id="microbe_dropdown"
									className="w-48 outline rounded-md"
									value={microbe}
									onChange={(e) => setMicrobe(e.target.value)}>
									{microbes_list.map((micr, index) => {
										return (
											<option key={index} value={micr}>
												{micr}
											</option>
										)
									})}
								</select>

								<input
									id="new_microbe"
									type="text"
									value={newMicrobe}
									onChange={(e) => setNewMicrobe(e.target.value)}
									placeholder="Other"
									className="p-2 border border-gray-300 rounded-md"
								/>
							</div>

							<div className="flex flex-col gap-4" id="cont2">
								<label className="font-bold">Select Antibiotic:</label>
								<select
									id="antibiotic_dropdown"
									className="w-48 outline rounded-md"
									value={antibiotic}
									onChange={(e) => setAntibiotic(e.target.value)}>
									{antibiotic_list.map((anti, index) => {
										return (
											<option key={index} value={anti}>
												{anti}
											</option>
										)
									})}
								</select>

								<input
									id="new_antibiotic"
									type="text"
									value={newAntibiotic}
									onChange={(e) => setNewAntibiotic(e.target.value)}
									placeholder="Other"
									className="p-2 border border-gray-300 rounded-md"
								/>
							</div>

							<div className="flex flex-col justify-start">
								<label htmlFor="result" className="font-bold">
									Disc Diffusion (Result)
								</label>
								<select
									id="result_dropdown"
									className="w-24 mt-3 outline rounded-md"
									value={result}
									onChange={(e) => setResult(e.target.value)}>
									<option value="Resistant">Resistant</option>
									<option value="SDD">SDD</option>
									<option value="Intermediate">Intermediate</option>
									<option value="Sensitive">Senstive</option>
									{/* Add other options */}
								</select>
							</div>
							<div className="flex flex-col gap-4" id="cont2">
								<label className="font-bold">MIC Value (ug/ml)</label>

								<input
									id="new_antibiotic"
									type="text"
									value={micVal}
									onChange={(e) => setMicVal(e.target.value)}
									placeholder="Other"
									className="p-2 border border-gray-300 rounded-md"
								/>
							</div>
							<div className="flex flex-col justify-start">
								<label htmlFor="result" className="font-bold">
									MIC interpretation
								</label>
								<select
									id="result_dropdown"
									className="w-24 mt-3 outline rounded-md"
									value={micResult}
									onChange={(e) => setMicResult(e.target.value)}>
									<option value="Resistant">Resistant</option>
									<option value="SDD">SDD</option>
									<option value="Intermediate">Intermediate</option>
									<option value="Sensitive">Senstive</option>
									{/* Add other options */}
								</select>

								<button
									className="mt-4 text-white bg-green-600 px-4 py-2 rounded-md"
									onClick={handleAdd}>
									Add
								</button>
							</div>
						</div>
						<div className="cont4">
							<div className="mx-auto w-3/8 sm:w-3/4 border-2 border-black">
								<div className="flex">
									<div className="border-2 border-black text-center bg-blue-500 text-white text-lg p-4 w-1/12">
										S.No.
									</div>
									<div className="border-2 text-wrap border-black text-center bg-blue-500 text-white text-lg p-4 w-4/12">
										Microbe
									</div>
									<div className="border-2 text-wrap border-black text-center bg-blue-500 text-white text-lg p-4 w-3/12">
										Antibiotic
									</div>
									<div className="border-2 border-black text-center bg-blue-500 text-white text-lg p-4 w-3/12">
										Result
									</div>
									<div className="border-2 border-black text-center bg-blue-500 text-white text-lg p-4 w-1/12">
										Delete
									</div>
								</div>

								{table.map((data, index) => {
									return (
										<div key={index} id="data_div" className="w-full">
											<div className="flex">
												<div className="border-2 border-black text-center bg-yellow-200 text-black text-lg p-4 w-1/12">
													{data.SNO}
												</div>
												<div className="border-2 border-black text-center bg-yellow-200 text-black text-lg p-4 w-4/12">
													{data.Microbe}
												</div>
												<div className="border-2 border-black text-center bg-yellow-200 text-black text-lg p-4 w-3/12">
													{data.Antibiotic}
												</div>
												<div className="border-2 border-black text-center bg-yellow-200 text-black text-lg p-4 w-3/12">
													{data.Result}
												</div>
												<div className="border-2 border-black text-center bg-yellow-200 text-black text-lg p-4 w-1/12">
													<button
														className="cursor-pointer "
														onClick={(e) => handleClear(e, data.SNO)}>
														❌
													</button>
												</div>
											</div>
										</div>
									)
								})}
							</div>
						</div>
						<div>
							<h3 className="mb-6 font-semibold text-xl">Comments:</h3>
							<div className="flex gap-x-4">
								<select
									className="outline rounded-md"
									value={microbe3}
									onChange={(e) => setMicrobe3(e.target.value)}>
									{Object.keys(standard_comments).map((elem, index) => {
										return (
											<option key={index} value={elem}>
												{elem}
											</option>
										)
									})}
								</select>
								<input
									id="new_microbe3"
									type="text"
									value={newMicrobe3}
									onChange={(e) => setNewMicrobe3(e.target.value)}
									placeholder="Other"
									className="p-2 border border-gray-300 rounded-md"
								/>

								<select
									className="outline rounded-md w-60"
									value={comment1}
									onChange={(e) => setComment1(e.target.value)}>
									{commentsList.map((elem, index) => {
										return (
											<option key={index} value={elem}>
												{elem}
											</option>
										)
									})}
								</select>
								<input
									id="new_comment"
									type="text"
									value={newComment}
									onChange={(e) => setNewComment(e.target.value)}
									placeholder="Other"
									className="p-2 border border-gray-300 rounded-md"
								/>
								<button
									className=" text-white bg-green-600 px-4 py-2 rounded-md"
									onClick={handleAdd5}>
									Add
								</button>
							</div>
							<div>
								<div className="mx-auto w-3/8 sm:w-3/4 border-2 border-black mt-3">
									{table4.map((data, index) => {
										return (
											<div key={index} className="w-full">
												<div className="flex">
													<div className="border-2 border-black text-center bg-yellow-200 text-black text-lg p-4 w-1/12">
														{data.SNO}
													</div>
													<div className="border-2 border-black text-center bg-yellow-200 text-black text-lg p-4 w-3/12">
														{data.val1}
													</div>
													<div className="border-2 border-black text-center bg-yellow-200 text-black text-lg p-4 w-6/12">
														{data.val2}
													</div>

													<div className="border-2 border-black text-center bg-yellow-200 text-black text-lg p-4 w-2/12">
														<button
															className="cursor-pointer"
															onClick={(e) => handleClear5(e, data.SNO)}>
															❌
														</button>
													</div>
												</div>
											</div>
										)
									})}
								</div>
							</div>
						</div>
						<div className="flex gap-15vw mt-8 flex-wrap items-center justify-around m-5vh mx-7vh">
							{/* Note Section */}
							<div>
								<h3 className="text-2xl font-bold mb-4">Note:</h3>
								<textarea
									id="notes"
									placeholder="Enter Note here..."
									className="resize-none mt-3 w-[80%] h-[15vh] sm:h-24 sm:w-[30vw] border border-black p-4 text-lg rounded"
									value={notes}
									onChange={(e) => setNotes(e.target.value)}
								/>
							</div>

							{/* Input Section */}
							<div className="flex gap-2vw flex-col gap-3 items-center justify-around">
								{/* Date Picker */}
								<div className="flex items-center gap-2 justify-between gap-1vw">
									<label className="font-bold">Enter Report Date:</label>
									<DatePicker
										selected={reportDate}
										value={reportDate} // Set the default date as today
										dateFormat="dd-MM-yyyy"
										id="report-date"
										onChange={(e) => {
											setReportDate(e)
											//console.log(reportDate)
										}}
										required={true}
									/>
								</div>

								{/* Name Input */}
								<div className="flex items-center gap-2 justify-between gap-1vw">
									<label className="font-bold">Enter Name:</label>
									<input
										id="reporter-name"
										type="text"
										className="p-2 border border-gray-300 rounded-md"
										value={reporterName}
										onChange={(e) => setReporterName(e.target.value)}
										required={true}
									/>
								</div>

								{/* Designation Input */}
								<div className="flex items-center gap-2 justify-between gap-1vw">
									<label className="font-bold">Enter Designation:</label>
									<input
										id="reporter-designation"
										type="text"
										className="p-2 border border-gray-300 rounded-md"
										value={reporterDesignation}
										onChange={(e) => setReporterDesignation(e.target.value)}
										required={true}
									/>
								</div>
							</div>
						</div>
					</div>
					{/* Submit Button */}
					<div className="my-3 flex justify-end">
						<button
							id="submit-button"
							onClick={handleSubmit}
							className="outline-none rounded-lg px-5 py-3 bg-red-400 text-white text-lg">
							Submit
						</button>
					</div>
				</form>
			</>
		</div>
	)
}

export default SpecimenDetails
