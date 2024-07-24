const mongoose = require('mongoose');

const connectToDatabase = async (URI) => {
    await mongoose.connect(URI).then((connection) => console.log(connection.connection._connectionString)).catch(err => console.log(err))
}

module.exports = { connectToDatabase }