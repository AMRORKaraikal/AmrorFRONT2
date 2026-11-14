// Helpers shared by the printed Request Form and Culture Report.

// Dates are stored in UTC. Print them as Indian dates (DD/MM/YYYY), so a
// sample collected on 28 Jan is not printed as 27 Jan.
export const formatDateIST = (value) => {
	if (!value) return ''
	const d = new Date(value)
	if (isNaN(d.getTime())) return String(value).slice(0, 10)
	return d.toLocaleDateString('en-GB', {
		timeZone: 'Asia/Kolkata',
		day: '2-digit',
		month: '2-digit',
		year: 'numeric',
	})
}

// Split text into lines no wider than maxWidth, using the canvas's current font.
export const wrapText = (ctx, text, maxWidth) => {
	const lines = []
	let line = ''
	const push = (word) => {
		const candidate = line ? line + ' ' + word : word
		if (ctx.measureText(candidate).width <= maxWidth) {
			line = candidate
			return
		}
		if (line) lines.push(line)
		line = ''
		// A single word wider than the line: break it by characters
		let piece = ''
		for (const ch of word) {
			if (piece && ctx.measureText(piece + ch).width > maxWidth) {
				lines.push(piece)
				piece = ch
			} else {
				piece += ch
			}
		}
		line = piece
	}
	String(text ?? '')
		.split(/\s+/)
		.filter(Boolean)
		.forEach(push)
	if (line || lines.length === 0) lines.push(line)
	return lines
}
