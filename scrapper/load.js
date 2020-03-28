const axios = require('axios')
const cheerio = require('cheerio')

async function load (url) {
	const opt = {
		headers: {
			'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_2) AppleWebKit/601.3.9 (KHTML, like Gecko) Version/9.0.2 Safari/601.3.9'
		}
	}

	const html = await axios.get(url, opt)

	const $ = cheerio.load(html.data)

	const getFormatedText = (parent, child) =>
		$(parent)
			.find(child)
			.text()
			.replace(/\s+/g, ' ')
			.replace('\\n', '')
			.trim()

	const getText = el =>
		el.text()
			.trim()
			.replace(/[^\x00-\x7F]/g, "")

	const getTextFrom = (parent, child) =>
		$(parent)
			.first()
			.find(child)
			.text()
			.replace(/\n\s*\n/g, '\n')

	return {
		$,
		getText,
		getTextFrom,
		getFormatedText
	}
}

module.exports = {
	load
}