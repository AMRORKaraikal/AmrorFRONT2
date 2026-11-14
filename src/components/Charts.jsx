import { Bar } from 'react-chartjs-2'
import { Tooltip, Legend, Chart as chartJs } from 'chart.js'
import { CategoryScale, LinearScale, BarElement } from 'chart.js'
const BarChart = ({ data }) => {
	chartJs.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend)

	const antibiotics = Object.keys(data.Antibiotics)
	// Every result the Culture Report Form can record gets its own colour.
	// ('Semi-Resistant' is an older name for Intermediate.)
	const groups = [
		{ label: 'Resistant', match: ['Resistant'], color: 'rgba(255, 99, 132, 0.6)' },
		{
			label: 'Intermediate',
			match: ['Intermediate', 'Semi-Resistant'],
			color: 'rgba(255, 206, 86, 0.6)',
		},
		{ label: 'SDD', match: ['SDD'], color: 'rgba(153, 102, 255, 0.6)' },
		{ label: 'Sensitive', match: ['Sensitive'], color: 'rgba(54, 162, 235, 0.6)' },
	]

	// Stacked bar chart data
	const chartData = {
		labels: antibiotics,
		datasets: groups.map((group) => ({
			label: group.label,
			data: antibiotics.map(
				(antibiotic) =>
					data.Antibiotics[antibiotic].filter((r) => group.match.includes(r))
						.length
			),
			backgroundColor: group.color,
		})),
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
