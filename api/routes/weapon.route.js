const express = require('express')
const router = express.Router()

const Weapon = require('../models/weapon.model')

router.post('/new', (req, res) => {
    let newWeapon = new Weapon({
        name: req.body.name,
        weaponType: req.body.weaponType,
        frame: {
            name: req.body.frame
        },
        shownStats: {
            impact: req.body.impact,
            range: req.body.range,
            stability: req.body.stability,
            handling: req.body.handling,
            reloadSpeed: req.body.reloadSpeed
        },
        hiddenStats: {
            aimAssistance: req.body.aimAssistance,
            inventorySize: req.body.inventorySize,
            zoom: req.body.zoom,
            recoil: req.body.recoil,
            bounceIntensity: req.body.bounceIntensity,
            bounceDirection: req.body.bounceDirection
        },
        curatedRoll: {
            barrelPerk: req.body.curatedRollBarrelPerk,
            magPerk: req.body.curatedRollMagPerk,
            perk1: req.body.curatedRollPerk1,
            perk2: req.body.curatedRollPerk2,
            masterwork: req.body.curatedRollMasterwork
        },
        randomRolls: {
            barrelPerks: req.body.randomRollsBarrelPerks.split('\r\n'),
            magPerks: req.body.randomRollsMagPerks.split('\r\n'),
            perks1: req.body.randomRollsPerks1.split('\r\n'),
            perks2: req.body.randomRollsPerks2.split('\r\n'),
            masterworks:req.body.randomRollsMasterworks.split('\r\n') 
        },
        weaponImg: req.body.weaponImg
    }).save((err, weapon) => {
        if(err) throw err
        res.send(`${weapon.name} was created successfully. Please reopen the program to add a new gun.`)
    })
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
