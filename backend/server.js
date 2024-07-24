const app = require('./app')
const { connectToDatabase } = require('./config/database')

const dotenv = require('dotenv')
dotenv.config({ path: 'backend/config/config.env' })

//Database
connectToDatabase(process.env.DATABASE_URI)

app.listen(process.env.PORT, () => {
    console.log(`Server Started at PORT: http://localhost:${process.env.PORT}`);
})