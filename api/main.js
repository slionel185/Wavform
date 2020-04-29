require('dotenv').config()

const mongoose = require('mongoose')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')

const PORT = process.env.PORT
const MONGO = process.env.MONGO

const weaponRoute = require('./routes/weapon.route.js')

mongoose.connect(MONGO, {
    useCreateIndex: true,
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: true
}).then(console.log('Database Connected.')).catch(err => {
    console.log(err)
})

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use('/v1', weaponRoute)

app.listen(process.env.PORT, console.log('Im alive.'))
