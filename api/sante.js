const express = require('express')

const HealthArticle = require('../models/HealthArticle')

const router = express.Router()

router.get('/', async (req, res) => {
	const page = req.query.page || 0
	const size = req.query.size || 5

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
		res.json({
			err: true,
			message: `Something went wrong, can't get data.`
		})
	}
})

module.exports = router