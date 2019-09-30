module.exports = (req, res) => {
    if (req.user) return res.redirect('/');

    var err = req.query.error ? req.query.error : null;
    var data = {title: "Авторизация", err: err};
    res.render('sign-in', data);
}