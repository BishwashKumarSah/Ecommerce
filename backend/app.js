const bodyParser = require('body-parser');
const express = require('express');
const handleError = require('./middlewares/error');
const cookieParser = require('cookie-parser')
const app = express()

app.use(express.json())
app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: false }))

//Routes Imports
const productRoute = require('./routes/product');
const userRouter = require('./routes/user')


app.use('/api/v1', productRoute)

app.use('/api/v1', userRouter)

app.use(handleError)

module.exports = app;