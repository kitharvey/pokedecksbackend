'use strict';
require('dotenv').config()
const cors = require('cors')
const express = require('express')
const app = express()
const mongoose = require('mongoose')
mongoose.connect(process.env.MONGODB_URI, {useNewUrlParser: true, useUnifiedTopology: true,  useCreateIndex: true})
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Connected to Database'))
app.use(cors())
app.use(express.json())

const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log('Server Started'))

app.get('/', (req, res) => {
    res.send(`Hello, welcome to pokedecksbackendapi!`)
  })

const pokedecksRouter = require('./api/routes/pokedecksBackendRoutes')
app.use('/api', pokedecksRouter)

