
const User = require('../../models/mysql/user-model');
const bcrypt = require('bcrypt');
module.exports = {
    home: async (req, res) => {
        if(req.user){
            return res.redirect('/profile')
        }
        res.render('login/home', { title: 'Logga in eller registrera dig'});
    },
    registerUser: async (req, res) => {
        const username = req.body.username;
        const existingUser = await User.findOne({ where: { username }});
        if(existingUser){
            req.session.flash = { type: 'danger', message: 'Användarnamnet finns redan' }
            return res.redirect('/login');
        }
        if(req.body.password !== req.body.confirmPassword){
            req.session.flash = { type: 'danger', message: 'Lösenorden matchar inte' }
            return res.redirect('/login');
        }
        const passwordHash = await bcrypt.hash(req.body.password, 10);

        const user = await User.create({ username, passwordHash });

        if(user){
            req.session.flash = { type: 'success', message: 'Användare skapad' }
        }
        
        res.redirect('/login')
    
    },
    loginUser: async (req, res) => {

        req.session.flash = { type: 'success', message: 'Du är nu inloggad' }
        res.redirect('/profile')
    }
}