const listItemModel = require('../../models/ListItem');

module.exports = (req, res) => {
    if (!req.user) return res.redirect('/sign-in');

    req.user
        .getListOwnership({
            include: [{
                model: listItemModel,
                as: 'Items'
            }],
            where: {group_link: null},
            order: [
                ['id', 'ASC'],
                [{model: listItemModel, as: 'Items'}, 'id', 'ASC']
            ]
        })
        .then(lists => {
            res.render('lists', {title: 'Списки', user: req.user, lists});
        });
}