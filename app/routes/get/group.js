const groupModel = require('../../models/Group');
const listItemModel = require('../../models/ListItem');

module.exports = (req, res, next) => {
    if (!req.user) return res.redirect('/sign-in');

    groupModel.findByPk(req.params.groupId, {include: ['Owner', 'Users']})
    .then(group => {
        if (!group) return res.status('404').render('404');

        group.getLists({
            include: [{
                model: listItemModel,
                as: 'Items'
            }],
            order: [
                ['id', 'ASC'],
                [{model: listItemModel, as: 'Items'}, 'id', 'ASC']
            ]
        })
        .then(lists => {
            res.render('single-group', {title: group.title, user: req.user, group, lists});
        })
        .catch(err => {
            console.log(err);
            next(err);    
        });
    })
    .catch(err => {
        console.log(err);
        next(err);
    });
}