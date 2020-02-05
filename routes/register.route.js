const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')

const checkNotAuthenticated = require('../js/checkNotAuthenticated')
const User = require('../models/user.model')

router.get('/', checkNotAuthenticated, (req, res) => {
    res.render('register.ejs')
})

router.post('/', checkNotAuthenticated, async (req, res) => {
    try {
        req.body.username = req.body.username.toLowerCase()
        req.body.password = bcrypt.hashSync(req.body.password, 10)
        var newUser = new User(req.body)
        newUser.save()
        res.redirect('/login')
    } catch {
        res.redirect('/register')
    }
})

module.exports = router