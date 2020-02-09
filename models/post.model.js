const mongoose = require('mongoose')
const Schema = mongoose.Schema

const postSchema = new Schema({
    author: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true,
    },
    comments: [{
        type: Schema.Types.ObjectId,
        ref: 'Post'
    }]
}, {
    timestamps: true
})

const Post = mongoose.model('Post', postSchema)
module.exports = Post