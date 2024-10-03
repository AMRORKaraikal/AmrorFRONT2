import React, { useEffect, useRef } from 'react'
import img1 from './jipmer.jpg'
import img3 from './AmrorLogo.png'
import { jsPDF } from 'jspdf'
import * as bwips from 'bwip-js'
const NewPdf1 = ({ reportData, specimenData, patientData }) => {
	const canvasRef = useRef(null)
	const canvasRef2 = useRef(null)
	const canvasRef3 = useRef(null)
	const canvasRef4 = useRef(null)
	const data = specimenData.patient_id + ' ' + specimenData.specimen_id
	// //console.log(reportData, specimenData, patientData)
	const pdfDoc = new jsPDF('p', 'px', 'a4') // Setting PDF dimensions to A4 size

	useEffect(() => {
		const canvas = canvasRef.current
		const canvas2 = canvasRef2.current
		const canvas3 = canvasRef3.current
		// const canvas4 = html2canvas(qrCodeRef.current)
		// //console.log(canvas4)
		const ctx = canvas.getContext('2d')
		const ctx2 = canvas2.getContext('2d')
		const ctx3 = canvas3.getContext('2d')

		const {
			lab_id,
			patient_name,
			father_name,
			village_name,
			patient_age,
			gender,
			patient_mobile,
		} = patientData
		const {
			specimen_nature,
			specimen_source,
			collection_date,
			collection_time,
			illness_duration,
			investigation_required,
			admission_date,
			physician_name,
			location,
			clinical_ho,
			provisional_diagnosis,
			antibiotics_given,
		} = specimenData

		// Use jsPDF for creating a PDF

		// Setting canvas size to match A4 dimensions
		canvas.width = pdfDoc.internal.pageSize.getWidth() * 2
		canvas.height = pdfDoc.internal.pageSize.getHeight() * 2

		ctx.fillStyle = '#fff'
		ctx.fillRect(0, 0, canvas.width, canvas.height)
		ctx.fillStyle = '#000'
		const xStart = 50 // Adjust as needed
		const yStart = 340 // Adjust as needed
		const tableWidth = 700 // Adjust as needed
		const tableHeight = 220 // Adjust as needed
		const rowHeight = 20 // Adjust as needed
		var colWidths = [250, 250, 200] // Adjust as needed
		// Load image
		const img = new Image(100, 100)

		img.src = img1
		//console.log(img)
		img.onload = function () {
			// Draw image on canvas
			//console.log('Image loaded successfully')

			ctx.drawImage(img, 20, 10, 100, 100)
			ctx2.drawImage(img, 0, 0, 100, 100)
		}
		img.onerror = function (error) {
			console.error('Error loading image:', error)
		}
		const img2 = new Image(100, 100)

		img2.src = img3
		img2.onload = function () {
			// Draw image on canvas
			//console.log('Image loaded successfully')

			ctx.drawImage(img2, 680, 10, 100, 100)
			ctx3.drawImage(img2, 0, 0, 100, 100)
		}
		img2.onerror = function (error) {
			console.error('Error loading image:', error)
		}
		// Draw table border
		ctx.rect(xStart, yStart - tableHeight, tableWidth, tableHeight)
		ctx.stroke()

		// Draw inner horizontal borders
		for (let i = 1; i < 11; i++) {
			ctx.beginPath()
			if (i === 5 || i === 7) {
				ctx.moveTo(xStart, yStart - rowHeight * i - rowHeight)
				if (i === 7) {
					ctx.lineTo(xStart + colWidths[0], yStart - rowHeight * i - rowHeight)
					ctx.moveTo(xStart + colWidths[0], yStart - rowHeight * i)
					ctx.lineTo(xStart + tableWidth, yStart - rowHeight * i)
				} else if (i === 5) {
					ctx.lineTo(xStart + colWidths[0], yStart - rowHeight * i - rowHeight)
					ctx.moveTo(
						xStart + colWidths[0] + colWidths[1],
						yStart - rowHeight * i
					)
					ctx.lineTo(xStart + tableWidth, yStart - rowHeight * i)
				} else {
					ctx.lineTo(xStart + tableWidth, yStart - rowHeight * i - rowHeight)
				}
				i++
			} else {
				ctx.moveTo(xStart, yStart - rowHeight * i)
				if (i === 1) {
					ctx.lineTo(xStart + colWidths[0], yStart - rowHeight * i)
				} else if (i === 2) {
					ctx.lineTo(xStart + tableWidth - colWidths[2], yStart - rowHeight * i)
				} else {
					ctx.lineTo(xStart + tableWidth, yStart - rowHeight * i)
				}
			}
			ctx.stroke()
		}

		// Draw inner vertical borders
		for (let i = 1; i < colWidths.length; i++) {
			ctx.beginPath()
			ctx.moveTo(
				xStart + colWidths.slice(0, i).reduce((acc, val) => acc + val, 0),
				yStart - colWidths.length + 3
			)
			ctx.lineTo(
				xStart + colWidths.slice(0, i).reduce((acc, val) => acc + val, 0),
				yStart - tableHeight
			)
			ctx.stroke()
		}
		var x1 = 57
		var x2 = 307
		var x3 = 557
		var y1 = 135
		ctx.font = ' 16px Times New Roman ' //font

		ctx.font = 'bold 22px Times New Roman ' //font
		ctx.fillText('GOVERNMENT OF PUDUCHERRY', 235, 45)
		ctx.font = 'bold 18px Times New Roman ' //font
		ctx.fillText('GENERAL HOSPITAL, KARAIKAL', 265, 65)
		ctx.font = 'bold 20px Times New Roman ' //font
		ctx.fillText('MICROBIOLOGY REPORT FORM', 250, 85)

		// content
		ctx.font = 'bold 18px Times New Roman ' //font
		ctx.fillText('Patient Details', x1, y1)
		ctx.fillText('Specimen Details', x3, y1)
		ctx.fillText('Clinical Details', x2, y1)

		ctx.font = '14px Times New Roman'
		ctx.fillText('Lab ID:', x1, y1 + 20)
		ctx.fillText(lab_id, x1 + 93, y1 + 20) //id
		ctx.fillText('Patient Name:', x1, y1 + 40)
		ctx.fillText(patient_name, x1 + 93, y1 + 40) //var firstname
		ctx.fillText('Father/Spouse Name:', x1, y1 + 60)
		ctx.fillText(father_name, x1 + 93, y1 + 75) //Lname
		ctx.fillText('Name of village/Town:', x1, y1 + 100)
		ctx.fillText(village_name, x1 + 93, y1 + 115) //place
		ctx.fillText('Age:', x1, y1 + 140)
		ctx.fillText(patient_age, x1 + 93, y1 + 140) //age
		ctx.fillText('Gender:', x1, y1 + 160)
		ctx.fillText(gender, x1 + 93, y1 + 160) //gender
		ctx.fillText('Phone No:', x1, y1 + 180)
		ctx.fillText(patient_mobile, x1 + 93, y1 + 180) //phone
		ctx.fillText('Ward:', x1, y1 + 200)
		ctx.fillText(location, x1 + 93, y1 + 200) //loc
		//2nd col
		ctx.fillText('Clinical H/O', x2, y1 + 20)
		ctx.fillText(clinical_ho, x2 + 93, y1 + 20) //clinical h/o
		ctx.fillText('Provisional Diagnosis: ', x2, y1 + 40)
		ctx.fillText(provisional_diagnosis, x2 + 50, y1 + 55) //prov diag
		ctx.fillText('Antibiotics Given:', x2, y1 + 80)
		if (antibiotics_given) {
			if (antibiotics_given.includes(',')) {
				var antibiotics_given_list = antibiotics_given.split(',')
				ctx.fillText(antibiotics_given_list[0], x2 + 113, y1 + 80) //antibio
				for (let i = 1; i < antibiotics_given_list.length; i += 2) {
					ctx.fillText(antibiotics_given_list[i], x2 + 30, y1 + 80 + i * 15) //antibio
					if (antibiotics_given_list[i + 1])
						ctx.fillText(
							antibiotics_given_list[i + 1],
							x2 + 113,
							y1 + 80 + i * 15
						) //antibio
				}
			} else {
				ctx.fillText(antibiotics_given, x2 + 113, y1 + 60)
			}
		} //antibio}
		ctx.fillText('Duration of Illness:', x2, y1 + 140)
		ctx.fillText(illness_duration, x2 + 113, y1 + 140) //duration
		ctx.fillText('Date of Admission:', x2, y1 + 160)
		ctx.fillText(admission_date.slice(0, 10), x2 + 113, y1 + 160)
		ctx.fillText('Name of the Physician:', x2, y1 + 180)
		ctx.fillText(physician_name, x2 + 50, y1 + 195) //physician name
		//second col

		ctx.fillText('Nature of specimen:', x3, y1 + 40)
		ctx.fillText(specimen_nature, x3 + 113, y1 + 55) //nature
		ctx.fillText('Specimen Source / Body Site:', x3, y1 + 80)
		ctx.fillText(specimen_source, x3 + 113, y1 + 95) //site
		ctx.fillText('Date of Collection:', x3, y1 + 120)
		ctx.fillText(collection_date.slice(0, 10), x3 + 113, y1 + 120) //date
		ctx.fillText('time of Collection:', x3, y1 + 140)
		ctx.fillText(collection_time, x3 + 113, y1 + 140) //time
		ctx.fillText('Investigation Required:', x3, y1 + 160)
		ctx.fillText(investigation_required, x3 + 53, y1 + 175) //investigation

		const pdfDataURL = canvas.toDataURL()
		const pdfDataURL2 = canvas2.toDataURL()
		const pdfDataURL3 = canvas3.toDataURL()
		// const pdfDataURL4 = canvas4.toDataURL()
		let canvas4 = bwips.toCanvas('mycanvas', {
			bcid: 'code128', // Barcode type
			text: data, // Text to encode
			scale: 1, // 3x scaling factor
			height: 5, // Bar height, in millimeters
			includetext: true, // Show human-readable text
			textxalign: 'center', // Always good to set this
		})

		// Add the data URL to the PDF document
		pdfDoc.addImage(pdfDataURL, 'JPEG', 0, 0)
		pdfDoc.addImage(pdfDataURL2, 'JPEG', 10, 5)
		pdfDoc.addImage(pdfDataURL3, 'JPEG', 380, 5)
		pdfDoc.addImage(canvas4.toDataURL(), 'JPEG', 200, 200)

		// Save or display the PDF (change the filename as needed)
	}, [patientData, specimenData, reportData, data]) // Run this effect only once when the component mounts

	return (
		<div>
			<button
				className="mt-5 ml-5 outline rounded-md px-4 py-2 bg-blue-400 text-white text-lg"
				onClick={() => {
					pdfDoc.save(`${specimenData.patient_id}.pdf`)
				}}>
				Download
			</button>
			<canvas
				ref={canvasRef}
				width={595 * (5 / 3)}
				height={842 * (5 / 3)}></canvas>
			<canvas ref={canvasRef2} width={100} height={100}></canvas>
			<canvas ref={canvasRef3} width={100} height={100}></canvas>
			<canvas id="mycanvas" ref={canvasRef4} width={80} height={10}></canvas>
		</div>
	)
}

export default NewPdf1
