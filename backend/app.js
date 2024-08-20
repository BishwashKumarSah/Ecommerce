const bodyParser = require('body-parser');
const express = require('express');
const handleError = require('./middlewares/error');
const cookieParser = require('cookie-parser')
const cors = require('cors')
const fileUpload = require('express-fileupload')
const path = require('path')


if (process.env.NODE_ENV !== "PRODUCTION") {
    require('dotenv').config({ path: 'backend/config/config.env' })
}

const app = express()
const corsOptions = {
    origin: 'http://localhost:3000', // replace with your frontend's URL
    credentials: true, // Allow cookies to be sent
};

app.use(fileUpload())
app.use(cors(corsOptions))
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())


//Routes Imports
const productRoute = require('./routes/product');
const userRouter = require('./routes/user')
const orderRoute = require('./routes/order')
const paymentRoute = require('./routes/payment')

app.use('/api/v1', productRoute)

app.use('/api/v1', userRouter)

app.use('/api/v1', orderRoute)

app.use('/api/v1', paymentRoute)

app.use(express.static(path.join(__dirname, '../frontend/build')))

app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, '../frontend/build/index.html')))

app.use(handleError)

module.exports = app;