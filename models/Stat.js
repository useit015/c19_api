const { Schema, model } = require('mongoose')

const statSchema = new Schema(
	{
		deaths: Number,
		infected: Number,
		recovered: Number,
		tested: Number,
		regions: [],
		updated: {
			type: Date,
			default: Date.now
		},
	},
	{
		capped: {
			size: 1024,
			max: 1
		}
	}
)

module.exports = model('Stat', statSchema)
