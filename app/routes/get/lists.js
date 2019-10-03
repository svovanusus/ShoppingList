module.exports = (req, res) => {
    if (!req.user) return res.redirect('/sign-in');

    req.user
        .getListOwnership({include: ['Items'], where: {group_link: null}})
        .then(lists => {
            res.render('lists', {title: 'Списки', user: req.user, lists});
        });
}