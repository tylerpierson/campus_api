const express = require('express')
const morgan = require('morgan')
const app = express()
const userRouter = require('./routes/userRouter')

app.use(express.json())
app.use(morgan('combined'))
app.use('/campus', userRouter)

module.exports = app