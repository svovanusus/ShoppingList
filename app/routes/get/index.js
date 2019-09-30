module.exports = (req, res) => {
    if (!req.user) return res.redirect('/sign-in');

    var data = {
        title: "Custom title!",
        user: req.user,
        text: "lorem Ipsim text!!!"
    };
    res.render('index', data);
}