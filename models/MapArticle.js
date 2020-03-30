const { Schema, model } = require('mongoose')

const MapArticleSchema = new Schema({
	id: String,
	title: String,
	href: String,
	content: String,
	time: String
})

module.exports = model('ArticleMap', MapArticleSchema)