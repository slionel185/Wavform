const mongoose = require('mongoose')

const mongoInit = () => {
    mongoose.connect('mongodb+srv://Seth:BuckyBalls11@g-cluster0-oge6a.mongodb.net/wavform?retryWrites=true&w=majority', {
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