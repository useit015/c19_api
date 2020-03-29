const express = require('express')

const Stat = require('../models/Stat')

const router = express.Router()

router.get('/', async (req, res) => {
	const fields = {
		__v: false,
		_id: false
	}

	try {
		res.json(
			await Stat.findOne({}, fields)
		)
	} catch (err) {
		res.json({
			err: true,
			message: `Something went wrong, can't get data.`
		})
	}
})

module.exports = router