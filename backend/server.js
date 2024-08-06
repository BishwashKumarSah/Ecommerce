const app = require('./app')
const cloudinary = require('cloudinary')
const { connectToDatabase } = require('./config/database')

const dotenv = require('dotenv')
dotenv.config({ path: 'backend/config/config.env' })

//Database
connectToDatabase(process.env.DATABASE_URI)

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET
});

app.listen(process.env.PORT, () => {
    console.log(`Server Started at PORT: http://localhost:${process.env.PORT}`);
})