const express = require('express')

const Stat = require('../models/Stat')

const router = express.Router()

/**
 * @swagger
 * components:
 *   schemas:
 *     Stats:
 *       type: object
 *       properties:
 *         infected:
 *           type: number
 *         tested:
 *           type: number
 *         recovered:
 *           type: number
 *         deaths:
 *           type: number
 *         updated:
 *           type: string
 *           format: date
 *         regions:
 *           type: array
 *           items:
 *             type: Object
 *             properties:
 *               region: string
 *               cases: number
 */

/**
 * @swagger
 * /stats:
 *   get:
 *     tags:
 *       - Stats
 *     description: Returns the current stats
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Object of stats
 *         schema:
 *         type: array
 *         items:
 *           $ref: '#/components/schemas/Stats'
 */
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