const mongoose = require('mongoose')

const mongoInit = (MONGO_URI) => {
    mongoose.connect(MONGO_URI, {
        useCreateIndex: true,
        useFindAndModify: true,
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true
    }).then(() => {
        console.log('Database connected.')
    }).catch(err => {
        throw err
    })
}

module.exports = mongoInit