const express = require('express')

const HealthArticle = require('../models/HealthArticle')

const router = express.Router()

/**
 * @swagger
 * definitions:
 *   HealthArticle:
 *     type: object
 *     properties:
 *       id:
 *         type: string
 *       title:
 *         type: string
 *       href:
 *         type: string
 *       content:
 *         type: string
 */

/**
 * @swagger
 * /sante:
 *   get:
 *     tags:
 *       - Articles
 *     description: Returns the Ministry of Health's articles
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: page
 *         description: Page number.
 *         in: query
 *         required: false
 *         type: number
 *         default: 0
 *       - name: size
 *         description: Number of per page.
 *         in: query
 *         required: false
 *         type: number
 *         default: 5
 *     responses:
 *       200:
 *         description: An array of articles
 *         schema:
 *           type: array
 *           items:
 *             $ref: '#/definitions/HealthArticle'
 *       500:
 *         description: Error message
 *         schema:
 *           type: string
 */
router.get('/', async (req, res) => {
	const page = +req.query.page || 0
	const size = +req.query.size || 5

	const opts = {
		limit: size,
		skip: page * size
	}

	const fields = {
		__v: false,
		_id: false
	}

	try {
		res.json(
			await HealthArticle.find({}, fields, opts)
		)
	} catch (err) {
		res
			.status(500)
			.json(`Something went wrong, can't get data.`)
	}
})

module.exports = router