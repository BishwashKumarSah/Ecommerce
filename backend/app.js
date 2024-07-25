const bodyParser = require('body-parser');
const express = require('express');
const handleError = require('./middlewares/error');
const app = express()

app.use(express.json())
app.use(bodyParser.urlencoded({ extended: false }))

//Routes Imports
const productRoute = require('./routes/product');


app.use('/api/v1', productRoute)

app.use(handleError)

module.exports = app;