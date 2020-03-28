const { Schema, model } = require('mongoose')

const articleSchema = new Schema({
	content: String,
	href: String,
	id: String,
	title: String
})

module.exports = model('Article', articleSchema)
