const mongoose = require('mongoose')
const Schema = mongoose.Schema

const weaponSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    weaponType: {
        type: String,
        required: true
    },
    frame: {
        name: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: false
        }
    },
    shownStats: {
        impact: {
            type: Number,
            required: true
        },
        range: {
            type: Number,
            required: true
        },
        stability: {
            type: Number,
            required: true
        },
        handling: {
            type: Number,
            required: true
        },
        reloadSpeed: {
            type: Number,
            required: true
        }
    },
    hiddenStats: {
        aimAssistance: {
            type: Number,
            required: true
        },
        inventorySize: {
            type: Number,
            required: true
        },
        zoom: {
            type: Number,
            required: true
        },
        recoil: {
            type: Number,
            required: true
        },
        bounceIntensity: {
            type: Number,
            required: true
        },
        bounceDirection: {
            type: String,
            required: true
        }
    },
    curatedRoll: {
        barrelPerk: {
            type: String,
            required: false
        },
        magPerk: {
            type: String,
            required: false
        },
        perk1: {
            type: String,
            required: false
        },
        perk2: {
            type: String,
            required: false
        },
        masterwork: {
            type: String,
            required: false
        }
    },
    randomRolls: {
        barrelPerks: {
            type: [String],
            required: true
        },
        magPerks: {
            type: [String],
            required: true
        },
        perks1: {
            type: [String],
            required: true
        },
        perks2: {
            type: [String],
            required: true
        },
        masterworks: {
            type: [String],
            required: true
        }
    },
    ornaments: {
        type: [String],
        required: false
    },
    weaponImg: {
        type: String,
        required: false
    }
})

module.exports = mongoose.model('Weapon', weaponSchema)
