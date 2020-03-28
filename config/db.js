const mongoose = require('mongoose')

module.exports = {
	async connect () {
		try {
			await mongoose.connect(
				process.env.MONGO_URI,
				{
					useCreateIndex: true,
					useNewUrlParser: true,
					useUnifiedTopology: true
				}
			)
			console.log('MongoDB Connected')
		} catch (err) {
			console.log('Error connecting to MongoDB: ', err.message)
		}
	}
}