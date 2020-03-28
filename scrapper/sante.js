const { load } = require('./load')

function getTotals (table, getText) {
	const bottomSection = table
		.find('tr')
		.last()

	const bottomLeftSection = bottomSection
		.find('p')
		.first()


	const infected = +getText(
		bottomSection.find('td:nth-child(2)')
	)

	const tested = +getText(
		bottomSection.find('td:nth-child(3)')
	)

	const recovered = +getText(
		bottomLeftSection
			.find('font')
			.first()
	)

	const deaths = +getText(
		bottomLeftSection.find('span')
	)

	return {
		infected,
		tested,
		recovered,
		deaths
	}
}

function getRegions (table, getFormatedText) {
	const stats = []

	const toNum = str => +str.replace(/[^\x00-\x7F]/g, "")

	table
		.find('tr')
		.each((i, el) => {
			stats[ i ] = {
				region: getFormatedText(el, 'th'),
				cases: toNum(
					getFormatedText(el, 'td')
				)
			}
		})

	return stats
		.slice(1)
		.filter(stat => stat.region.length)
		.sort((a, b) => b.cases - a.cases)
}

async function getStats () {

	const { $, getText, getFormatedText } = await load('http://www.covidmaroc.ma')

	const tables = $('table')

	const total = getTotals(tables.first(), getText)

	const regions = getRegions(tables.last(), getFormatedText)

	return {
		...total,
		regions
	}
}

async function getArticles () {
	const data = []

	const getId = url => url && url.split('ID=')[ 1 ]

	const { $ } = await load('http://www.covidmaroc.ma/Pages/Communiques.aspx')

	$('td').each((i, el) => {
		const link = $(el).find('a')
		const title = link.text().trim()
		const href = link.attr('href')
		const id = getId(href)
		data[ i ] = {
			id,
			title,
			href: !href.includes('://')
				? 'https://www.sante.gov.ma' + href
				: href
		}
	})

	return data
}

async function fillContent (articles) {
	process.env[ 'NODE_TLS_REJECT_UNAUTHORIZED' ] = 0

	const handles = await Promise.all(
		articles.map(article =>
			load(article.href)
		)
	)

	handles.forEach(({ getTextFrom }, i) => {
		articles[ i ].content = getTextFrom('.desc', 'div')
	})

	return articles
}

module.exports = {
	getStats,
	getArticles,
	fillContent
}
