const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/mysql/user-model');

passport.use(new LocalStrategy( 
    async(username, password, done) => {
        const user = await User.findOne({ where: { username }});

        if(!user){
            return done(null, false, {message:'Incorrect username or password'} )
        }
        const passwordMatch = await user.validatePassword(password)
        if(!passwordMatch){
            return done(null, false, {message: 'Incorrect username or password'})
        }
        return done(null, user)
    }
))

passport.serializeUser((user, done) => {
    done(null, user.user_id)
})
passport.deserializeUser(async (user_id, done) => {
    const user = await User.findOne({where: {user_id}})
    done(null, user)
})

const requireAuth = (req, res, next) => {
    if(req.isAuthenticated()){
        return next()
    }
    req.session.flash = { type: 'danger', message: 'Du behöver logga in för att se denna sida'}
    res.redirect('/login')
}

const setUser = (req, res, next) => {
    if(req.isAuthenticated()){
        res.locals.user = req.user.dataValues;
    }
    next()
}

module.exports = {
    passport,
    requireAuth,
    setUser
}