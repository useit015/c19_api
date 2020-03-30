const express = require('express')
const swaggerJSDoc = require('swagger-jsdoc')

const router = express.Router()

const options = {
	swaggerDefinition: {
		openapi: '3.0.0',
		info: {
			title: 'C19 API',
			version: '1.0.0',
			description: 'API for getting official Moroccan COVID19 data'
		},
		basePath: '/'
	},
	apis: [ './api/*.js' ]
}

const swaggerSpec = swaggerJSDoc(options)

router.get('/', (req, res) => res.json(swaggerSpec))

module.exports = router
