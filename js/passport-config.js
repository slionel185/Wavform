const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcryptjs')

const User = require('../models/user.model')

function initialize(passport) {
    const authenticateUser = async (username, password, done) => {
        let user = await User.findOne({ username: username }, (err, user) => {
            if(err) {
                return null
            } else if(user) {
                return user
            } else {
                return null
            }
        })
        if(user === null) {
            return done(null, false, { message: 'No user with that username.' })
        }
        try {
            if(bcrypt.compareSync(password, user.password)) {
                return done(null, user)
            } else {
                return done(null, false, { message: 'Incorrect password.' })
            }
        } catch(err) {
            return done(err)
        }
    }

    passport.use(new LocalStrategy({ usernameField: 'username' }, authenticateUser))
    passport.serializeUser((user, done) => { done(null, user._id) })
    passport.deserializeUser( async (_id, done) => {
        let user = await User.findById({_id}, (err, user) => {
            if(err) {
                return null
            } else if(user) {
                return user
            } else {
                return null
            }
        })
        done(null, user)
    })
}

module.exports = initialize