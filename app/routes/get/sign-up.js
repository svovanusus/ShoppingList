module.exports = (req, res) => {
    if (req.user) return res.redirect('/');

    var data = {title: "Регистрация"};
    res.render('sign-up', data);
}