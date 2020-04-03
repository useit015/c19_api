const cors = require('cors')
const env = require('dotenv')
const express = require('express')

const db = require('./config/db')
const sync = require('./config/sync')

const app = express()

const PORT = process.env.PORT || 4000

env.config()

app.use(cors())

db.connect().then(sync.init)

app.use((err, req, res, next) => {
	if (err) {
		return res
			.status(400)
			.json('Bad request')
	}
	next()
})

app.use(express.static(__dirname + '/public'))

app.use('/api-docs.json', require('./config/doc'))

app.use('/stats', require('./api/stats'))
app.use('/sante', require('./api/sante'))
app.use('/map', require('./api/mapdata'))

app.get(/.*/, (req, res) => res.redirect('/api-docs'))

app.listen(
	PORT,
	() => console.log('The server is up and running !!')
)
