var groupModel = require('../../models/Group');

module.exports = (req, res) => {
    if (!req.user) return res.redirect('/sign-in');

    req.user.getInvitations({include: ['Inviter', groupModel], attributes: ['id']}).then(invites => {
        res.render('index', {title: 'Главная', user: req.user, invites});
    });
}