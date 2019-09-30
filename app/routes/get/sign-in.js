module.exports = (req, res) => {
    if (req.user) return res.redirect('/');

    var msg = (req.query.prev == 'reg-success') ? 'Вы успешно зарегистрированы! Теперь Вы можете авторизиваться.' : null;
    res.render('sign-in', {title: "Авторизация", user: req.user, message: msg});
}