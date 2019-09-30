module.exports = (req, res) => {
    req.logOut();
    req.session.destroy();
    res.redirect('/sign-in');
}