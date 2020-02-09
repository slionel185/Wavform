const express = require('express')
const router = express.Router()

router.delete('/', (req, res) => {
    res.clearCookie('user')
    req.logOut()
    res.redirect('/login')
})

module.exports = router