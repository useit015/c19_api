const { Schema, model } = require('mongoose')

const healthArticleSchema = new Schema({
	content: String,
	href: String,
	id: String,
	title: String
})

module.exports = model('HealthArticle', healthArticleSchema)
