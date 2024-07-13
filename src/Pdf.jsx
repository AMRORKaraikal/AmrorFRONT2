import React, { useEffect, useRef } from 'react'
import img1 from './jipmer.jpg'
import img3 from './AmrorLogo.png'
import { jsPDF } from 'jspdf'
import * as bwips from 'bwip-js'

const pdfDoc = new jsPDF('p', 'px', 'a4') // Setting PDF dimensions to A4 size
const Pdf = ({ reportData, specimenData, patientData }) => {
	const canvasRef = useRef(null)
	const canvasRef2 = useRef(null)
	const canvasRef3 = useRef(null)
	const canvasRef4 = useRef(null)
	const data = patientData.patient_id + ' ' + specimenData.specimen_id
	// //console.log(reportData, specimenData, patientData)

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
			hospital_id,
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
		// Define your data, specimen_data, and patient_history here
		const {
			specimen_id,
			direct_microscopic_examination,
			culture_results,
			ast,
			comments,
			note,
			report_date,
			reporter_name,
			reporter_designation,
		} = reportData
		let arr1 = [],
			arr2 = []
		//console.log(ast)
		const microbeMap = ast.reduce((acc, curr) => {
			if (!acc[curr.Microbe]) {
				acc[curr.Microbe] = []
			}
			acc[curr.Microbe].push({
				Antibiotic: curr.Antibiotic,
				Result: curr.Result,
			})
			return acc
		}, {})

		//console.log(microbeMap)
		ast.forEach((element) => {
			arr1.push(element.Antibiotic)
			arr2.push(element.Result)
		})
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
			// ctx2.font = 'bold 10px Times New Roman '
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
		var x4 = 25
		var x5 = 125
		var x6 = 357
		var x7, x8
		var y1 = 135
		ctx.font = 'bold 10px Times New Roman '
		ctx.fillText('JIPMER KARAIKAL', 25, 105 + 12)
		ctx.font = ' 16px Times New Roman ' //font
		var y2 = 470
		Object.keys(microbeMap).forEach((microbe) => {
			const results = microbeMap[microbe]

			ctx.font = 'bold 16px Times New Roman ' //font
			// Write microbe name
			ctx.fillText(`Isolate: ${microbe}`, x4, y2)
			y2 += 3
			ctx.rect(xStart, y2, tableWidth, rowHeight * (results.length + 1))
			ctx.stroke()
			//console.log(Object.keys(results[0]).length, Object.keys(results[0]))
			if (Object.keys(results[0]).length === 2) {
				colWidths = [tableWidth / 2, tableWidth / 2]
				x6 = colWidths[0] + x1
				ctx.fillText('Antibiotic', x1, y2 + 17)
				ctx.fillText('Disc Diffusion Result', x6, y2 + 17)
			} else if (Object.keys(results[0]).length === 4) {
				colWidths = [
					tableWidth / 4,
					tableWidth / 4,
					tableHeight / 4,
					tableHeight / 4,
				]
				x6 = colWidths[0] + x1
				x7 = colWidths[1] + x6
				x8 = colWidths[2] + x7
				ctx.fillText('Antibiotic', x1, y2 + 17)
				ctx.fillText('Disc Diffusion Result', x6, y2 + 17)
				ctx.fillText('MIC Value (ug/ml)', x7, y2 + 17)
				ctx.fillText('MIC interpretation', x8, y2 + 17)
			}
			for (let i = 1; i < colWidths.length; i++) {
				ctx.beginPath()
				ctx.moveTo(
					xStart + colWidths.slice(0, i).reduce((acc, val) => acc + val, 0),
					y2
				)
				ctx.lineTo(
					xStart + colWidths.slice(0, i).reduce((acc, val) => acc + val, 0),
					y2 + rowHeight * (results.length + 1)
				)
				ctx.stroke()
			}
			y2 += 20 // Move to the next line
			for (let i = 0; i < results.length; i++) {
				ctx.beginPath()
				ctx.moveTo(xStart, y2 + rowHeight * i)
				ctx.lineTo(xStart + tableWidth, y2 + rowHeight * i)

				ctx.stroke()
			}
			y2 -= 3

			y2 += 18 // Move to the next line
			// Write antibiotic results
			ctx.font = '16px Times New Roman ' //font
			results.forEach((result) => {
				if (Object.keys(result).length === 2) {
					ctx.fillText(`${result.Antibiotic}`, x1, y2)
					ctx.fillText(`${result.Result}`, x6, y2)
				} else if (Object.keys(result).length === 4) {
					ctx.fillText(`${result.Antibiotic}`, x1, y2)
					ctx.fillText(`${result.Result}`, x6, y2)
					ctx.fillText(`${result.Mic}`, x7, y2)
					ctx.fillText(`${result.Mic_result}`, x8, y2)
				}
				y2 += 20 // Move to the next line
			})

			y2 += 10 // Add some space between different microbes
		})
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
		ctx.fillText('Direct Microscopic Examination:', x4, y1 + 220)
		ctx.fillText('Culture Results:', x4, y1 + 255)
		ctx.fillText('Antimicrobial Susceptibility Test:', x4, y1 + 310)
		ctx.fillText('Comments:', x4, y2)

		ctx.font = '14px Times New Roman'
		ctx.fillText('Hospital ID:', x1, y1 + 20)
		ctx.fillText(hospital_id, x1 + 93, y1 + 20) //id
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
		ctx.fillText('Specimen No:', x3, y1 + 20)
		ctx.fillText(specimen_id, x3 + 113, y1 + 20) //specino
		ctx.fillText('Nature of specimen:', x3, y1 + 40)
		ctx.fillText(specimen_nature, x3 + 113, y1 + 55) //nature
		ctx.fillText('Specimen Source / Body Site:', x3, y1 + 80)
		ctx.fillText(specimen_source, x3 + 3, y1 + 95) //site
		ctx.fillText('Date of Collection:', x3, y1 + 120)
		ctx.fillText(collection_date.slice(0, 10), x3 + 113, y1 + 120) //date
		ctx.fillText('Time of Collection:', x3, y1 + 140)
		ctx.fillText(collection_time, x3 + 113, y1 + 140) //time
		ctx.fillText('Investigation Required:', x3, y1 + 160)
		ctx.fillText(investigation_required, x3 + 53, y1 + 175) //investigation

		//two major comp
		ctx.fillText(direct_microscopic_examination, 60, y1 + 233) //direct
		if (culture_results) {
			if (culture_results.includes('.')) {
				var culture_results_list = culture_results.split('.')
				for (let i = 0; i < culture_results_list.length; i++) {
					ctx.fillText(culture_results_list[i], 60, y1 + 268 + i * 15) //culture
				}
			} else {
				ctx.fillText(culture_results, 60, y1 + 328) //culture
			}
		}

		let result = []
		let result2 = []
		try {
			// Define the maximum pixel width for each line
			const maxWidth = 650; // Set this to your desired width
		
			// Split the comments into words
			let words = comments.split(' ');
		
			// Initialize an empty array to store the result
			let result = [];
			let line = '';
		
			// Iterate over the words array and group them into lines that fit within the maxWidth
			for (let i = 0; i < words.length; i++) {
				let testLine = line + words[i] + ' ';
				let metrics = ctx.measureText(testLine);
				let testWidth = metrics.width;
		
				if (testWidth > maxWidth && i > 0) {
					result.push(line.trim());
					line = words[i] + ' ';
				} else {
					line = testLine;
				}
			}
			// Push the last line
			result.push(line.trim());
		
			// Draw the text on the canvas
			for (let i = 0; i < result.length; i++) {
				let wordsInLine = result[i].split(' ');
				if (wordsInLine.length > 1) {
					// Justify the text
					let lineLength = ctx.measureText(result[i]).width;
					let spaceWidth = (maxWidth - lineLength) / (wordsInLine.length - 1);
					let xOffset = x5;
		
					for (let j = 0; j < wordsInLine.length; j++) {
						ctx.fillText(wordsInLine[j], xOffset, y2);
						xOffset += ctx.measureText(wordsInLine[j]).width + spaceWidth;
					}
				} else {
					// If only one word, just draw it
					ctx.fillText(result[i], x5, y2);
				}
				y2 += 15; // Move to the next line
			}
		} catch (error) {
			console.log(error);
		}
		
		y2 += 10
		ctx.font = 'bold 18px Times New Roman ' //font
		ctx.fillText('Note:', x4, y2)
		ctx.font = '14px Times New Roman ' //font

		try {
			let words2 = note.split(' ')

			// Initialize an empty array to store the result

			// Iterate over the words array and group them into strings containing 20 words each
			for (let i = 0; i < words2.length; i += 10) {
				let chunk = words2.slice(i, i + 10)
				result2.push(chunk.join(' '))
			}

			// console.log(result2)
		} catch (error) {
			console.log(error)
		}
		for (let i = 0; i < result2.length; i++) {
			ctx.fillText(result2[i], x5, y2)
			y2 += 15
		} //note}
		// ctx.fillText(note, x5, y2) //note
		y2 -= 40
		ctx.font = 'bold 18px Times New Roman ' //font
		ctx.fillText('Report Date:', x4, y2 + 60)
		ctx.fillText('Name:', x4, y2 + 80)
		ctx.fillText('Designation:', x4, y2 + 100)
		ctx.fillText('Signature:', x4, y2 + 120)
		ctx.font = ' 14px Times New Roman ' //font
		ctx.fillText(report_date.slice(0, 10), x5 + 10, y2 + 60) // report date
		ctx.fillText(reporter_name, x5 + 10, y2 + 80) //name
		ctx.fillText(reporter_designation, x5 + 10, y2 + 100) //designation
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
		ctx.drawImage(canvas4, 600, 350)

		// Add the data URL to the PDF document
		pdfDoc.addImage(pdfDataURL, 'JPEG', 0, 0)
		pdfDoc.addImage(pdfDataURL2, 'JPEG', 10, 5)
		pdfDoc.addImage(pdfDataURL3, 'JPEG', 380, 5)
		pdfDoc.addImage(canvas4.toDataURL(), 'JPEG', 350, 192)

		// Save or display the PDF (change the filename as needed)
	}, [patientData, specimenData, reportData, data,img1,img3]) // Run this effect only once when the component mounts

	return (
		<div>

			<button className='mt-5 ml-5 outline rounded-md px-4 py-2 bg-blue-400 text-white text-lg' onClick={() => { pdfDoc.save(`${specimenData.patient_id}.pdf`) }}>Download</button>
			<canvas
				ref={canvasRef}
				width={595 * (5 / 3)}
				height={842 * (5 / 3)}></canvas>
			<canvas ref={canvasRef2} width={100} height={100}></canvas>
			<canvas ref={canvasRef3} width={100} height={100}></canvas>
			<canvas id="mycanvas" ref={canvasRef4}></canvas>
		</div>
	)
}

export default Pdf
