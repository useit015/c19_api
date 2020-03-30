const cron = require('node-cron')

const Stat = require('../models/Stat')
const HealthArticle = require('../models/HealthArticle')
const ArticleMap = require('../models/ArticleMap')
const { getStats, getArticles, fillContent } = require('../scrapper/sante')
const { getAllNews } = require('../scrapper/map')


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
		await HealthArticle.find(),
		await getArticles()
	)

	if (articles.length) {
		await HealthArticle.insertMany(
			await fillContent(articles)
		)
	}
}

async function syncArticlesMap () {
	const articles = filterExistingArticles(
		await ArticleMap.find(),
		await getAllNews()
	)

	if (articles.length) {
		await ArticleMap.insertMany(articles)
	}
}

async function sync () {
	try {
		await Promise.all([
			syncStats(),
			syncArticles(),
			syncArticlesMap()
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
