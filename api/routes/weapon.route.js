const express = require('express')
const router = express.Router()

const Weapon = require('../models/weapon.model')

router.post('/new', (req, res) => {
    
})

router.get('/:name', (req, res) => {
    const toTitleCase = phrase => {
        return phrase.toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
    }
    Weapon.find({name: toTitleCase(req.params.name)}, (err, weapon) => {
        if(err) throw err
        if(!weapon) {
            res.send(`${req.params.name} was not found. It may not be added to the Database.`)
        } else {
            res.send(weapon)
        }
    })
})

module.exports = router