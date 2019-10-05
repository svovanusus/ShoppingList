module.exports = (req, res) => {
    if (!req.user) return res.redirect('/');

    res.render('profile', {title: 'Профиль', user: req.user});
}