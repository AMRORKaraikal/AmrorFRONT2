import NewSpecimen from './components/NewSpecimen'
import { useState } from 'react'
import SpecimenDetails from './components/SpecimenDetails'
// import Preview from './components/Preview'
import PatientHistory from './components/PatientHistory'
import ExistingPatient from './components/ExistingPatient'
import MonthlyAnalytics from './components/Analytics'
import img1 from './AmrorLogo.png'
function App() {
	// const [newSpecimen, setNewSpecimen] = useState(false)
	// const [specimenDetails, setSpecimenDetails] = useState(false)

	const [comp, setComp] = useState(0)
	return (
		<div className="bg-gradient-to-r from-blue-300 to-violet-400">
			<div className="text-2xl sm:text-5xl font-bold mb-5 text-center text-white bg-violet-600 py-2 flex items-center justify-center gap-5">
				<div className="bg-white w-[10vw] rounded-full ">
					<img src={img1} className="w-[10vw]  rounded-xl" alt="logo" />
				</div>
				<div>AMROR Dashboard</div>
			</div>

			<div>
				<div className="mt-8">
					<div className="flex  flex-wrap gap-5 sm:gap-10 items-center justify-center">
						<button
							className="bg-red-400 text-white font-semibold sm:text-xl px-4 py-2 rounded-md outline"
							onClick={() => {
								// setSpecimenDetails(true)
								// setNewSpecimen(false)
								setComp(3)
							}}>
							Request Form
						</button>
						<button
							className="bg-green-500 text-white font-semibold sm:text-xl px-4 py-2 rounded-md outline"
							onClick={() => {
								// setSpecimenDetails(true)
								// setNewSpecimen(false)
								setComp(4)
							}}>
							Culture Report Form
						</button>
						<button
							className="bg-blue-500 text-white text-md font-semibold sm:text-xl px-4 py-2 rounded-md outline"
							onClick={() => {
								setComp(1)
							}}>
							Print Report/Request Form
						</button>
						<button
							className="bg-orange-500 text-white font-semibold sm:text-xl px-4 py-2 rounded-md outline"
							onClick={(e) => {
								// setSpecimenDetails(true)
								// setNewSpecimen(false)
								e.preventDefault()
								setComp(5)
							}}>
							Monthly Analytics
						</button>
					</div>
					{comp === 1 && <PatientHistory />}
					{comp === 2 && <NewSpecimen />}
					{comp === 3 && <ExistingPatient />}
					{comp === 4 && <SpecimenDetails />}
					{comp === 5 && <MonthlyAnalytics />}
				</div>
			</div>

			<div className="h-[90vh]"></div>
		</div>
	)
}

export default App
