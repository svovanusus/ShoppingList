//var groupModel = require('../../models/Group');

module.exports = (req, res) => {
    if (!req.user) return res.redirect('/sign-in');

    res.render('groups', {title: 'Список групп', user: req.user});
}