module.exports = (req, res) => {
    if (req.user) return res.redirect('/');

    res.render('sign-up', {title: 'Регистрация', user: req.user});
}