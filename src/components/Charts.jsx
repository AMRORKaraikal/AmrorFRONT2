import { Bar } from 'react-chartjs-2'
import { Tooltip, Chart as chartJs } from 'chart.js'
import { CategoryScale, LinearScale, BarElement } from 'chart.js'
const BarChart = ({ data }) => {
	chartJs.register(CategoryScale, LinearScale, BarElement, Tooltip)

	const antibiotics = Object.keys(data.Antibiotics)
	const resistantCounts = []
	const sensitiveCounts = []
	const semiResistantCounts = []

	antibiotics.forEach((antibiotic) => {
		const resistantCount = data.Antibiotics[antibiotic].filter(
			(resistance) => resistance === 'Resistant'
		).length
		const sensitiveCount = data.Antibiotics[antibiotic].filter(
			(resistance) => resistance === 'Sensitive'
		).length
		const semiResistantCount = data.Antibiotics[antibiotic].filter(
			(resistance) => resistance === 'Semi-Resistant'
		).length

		resistantCounts.push(resistantCount)
		sensitiveCounts.push(sensitiveCount)
		semiResistantCounts.push(semiResistantCount)
	})

	// Stacked bar chart data
	const chartData = {
		labels: antibiotics,
		datasets: [
			{
				label: 'Resistant',
				data: resistantCounts,
				backgroundColor: 'rgba(255, 99, 132, 0.6)',
			},
			{
				label: 'Sensitive',
				data: sensitiveCounts,
				backgroundColor: 'rgba(54, 162, 235, 0.6)',
			},
			{
				label: 'Semi-Resistant',
				data: semiResistantCounts,
				backgroundColor: 'rgba(255, 206, 86, 0.6)',
			},
		],
	}

	// Chart options
	const chartOptions = {
		scales: {
			x: {
				stacked: true,
			},
			y: {
				stacked: true,
			},
		},
		plugins: {
			tooltip: {
				callbacks: {
					label: function (context) {
						return [context.formattedValue, context.dataset.label]
					},
				},
			},
		},
	}

	return (
		<div>
			<h1>{data.Microbe}</h1>

			<Bar data={chartData} options={chartOptions} />
		</div>
	)
}

const HorizontalBarGraph = ({ data }) => {
	const microorganisms = Object.keys(data)
	const counts = Object.values(data)

	// Bar chart data
	const chartData = {
		labels: microorganisms,
		datasets: [
			{
				label: 'Count',
				backgroundColor: 'rgba(75,192,192,0.6)',
				borderColor: 'rgba(75,192,192,1)',
				borderWidth: 1,
				hoverBackgroundColor: 'rgba(75,192,192,0.8)',
				hoverBorderColor: 'rgba(220,220,220,1)',
				data: counts,
			},
		],
	}

	// Chart options
	const chartOptions = {
		indexAxis: 'y',
		responsive: true,
		scales: {
			x: {
				beginAtZero: true,
			},
		},
	}

	return (
		<div>
			<h2>Horizontal Bar Graph: Microorganism Count</h2>
			<Bar data={chartData} options={chartOptions} />
		</div>
	)
}

export { BarChart, HorizontalBarGraph }
