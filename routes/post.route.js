const express = require('express')
const router = express.Router()

const checkAuthenticated = require('../js/checkAuthenticated')
const Post = require('../models/post.model')

router.get('/', checkAuthenticated, async (req, res) => {
    try {
        let posts = await Post.find({ author: req.user.username })
        res.render('post.ejs', { posts: posts })
    } catch(err) {
        console.log(err)
        res.redirect('/login')
    }
})

router.post('/', checkAuthenticated, async (req, res) => {
    try {
        let newPost = new Post({
            author: req.user.username,
            content: req.body.content
        })
        newPost.save()
        console.log(newPost)
        res.redirect('/post')
    } catch(err) {
        console.log(err)
        res.redirect('/index')
    }
})

module.exports = router