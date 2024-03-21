const User = require('../../models/mysql/user-model');

module.exports = {
    home: async (req, res) => {
        let users = await User.findAll();
        users = users.map(user => user.dataValues);
        res.render('community/home', { title: 'KodCampus Gemenskap', users });
    }
}