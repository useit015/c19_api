const cron = require('node-cron')

const Stat = require('../models/Stat')
const Article = require('../models/Article')
const { getStats, getArticles, fillContent } = require('../scrapper/sante')

async function syncStats () {
	const stats = await getStats()
	await new Stat(stats).save()
}

function filterExistingArticles (existing, articles) {
	return articles.filter(article =>
		!existing.find(existingArticle =>
			existingArticle.id === article.id
		)
	)
}

async function syncArticles () {
	const articles = filterExistingArticles(
		await Article.find(),
		await getArticles()
	)

	if (articles.length) {
		await Article.insertMany(
			await fillContent(articles)
		)
	}
}

async function sync () {
	try {
		await Promise.all([
			syncStats(),
			syncArticles()
		])

		console.log('Sync done successfuly')
	} catch (err) {
		console.log('Could not sync data because of -> ', err.message)
	}
}

module.exports = {
	init () {
		// Schedule to run every hour at the tenth minute
		cron.schedule('10 * * * *', sync)
	}
}
