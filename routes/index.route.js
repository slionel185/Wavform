const express = require('express')
const router = express.Router()

const checkAuthenticated = require('../js/checkAuthenticated')

router.get('/', checkAuthenticated, (req, res) => {
    res.cookie('user', req.user.username, { maxAge: 2592000000 })
    res.render('index.ejs', { user: req.user })
})

module.exports = router