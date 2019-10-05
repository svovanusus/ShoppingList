var groupModel = require('../../models/Group');

module.exports = (req, res) => {
    if (!req.user) return res.redirect('/sign-in');

    req.user.getInvitations({include: ['Inviter', groupModel], attributes: ['id']}).then(invites => {
        req.user.getGroups({include: ['Users', 'Lists']}).then(groups => {
            res.render('groups', {title: 'Список групп', user: req.user, invites, groups});
        });
    });
}