const mongoose = require('mongoose');

const dbConnect = async() => {
    try {

        await mongoose.connect(process.env.DB_CNN);
        console.log('db connect');

    } catch (error) {
        console.log(error)
        throw  new Error('Database Connection failed')
    }
}

module.exports = {
    dbConnect
}
