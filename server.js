if(process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const express = require('express')
const app = express()
const passport = require('passport')
const flash = require('express-flash')
const session = require('express-session')
const methodOverride = require('method-override')
const path = require('path')

const mongoInit = require('./js/mongoose-config')
mongoInit()

const initializePassport = require('./js/passport-config')
initializePassport(passport)

const indexRoute = require('./routes/index.route')
const loginRoute = require('./routes/login.route')
const registerRoute = require('./routes/register.route')
const logoutRoute = require('./routes/lougout.route')
const confirmationRoute = require('./routes/register.route')

app.set('view-engine', 'ejs')
app.use(express.static(path.join(__dirname, '/public')))
app.use(express.urlencoded({ extended: false }))
app.use(flash())
app.use(session({
    secret: 'SuperSecretSTawduoiabwvdaiwduv1298t125kjawd9821qwdlakwWA',
    resave: false,
    saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(methodOverride('_method'))

app.use('/', indexRoute)
app.use('/login', loginRoute)
app.use('/register', registerRoute)
app.use('/logout', logoutRoute)

app.listen(process.env.PORT, () => { console.log(`Server listening on port: ${process.env.PORT}.`) })
