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

app.use('/stats', require('./api/stats'))
app.use('/sante', require('./api/sante'))
app.use('/mapdata', require('./api/mapdata'))


app.listen(
	PORT,
	() => console.log('The server is up and running !!')
)
