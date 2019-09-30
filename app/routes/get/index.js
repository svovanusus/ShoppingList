module.exports = (req, res) => {
    if (!req.user) return res.redirect('/sign-in');

    var username = req.user.username;
    var data = {
        title: "Custom title!",
        name: username,
        text: "lorem Ipsim text!!!"
    };
    res.render('index', data);
}