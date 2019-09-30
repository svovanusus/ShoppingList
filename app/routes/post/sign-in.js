const passport = require('passport');

module.exports = (req, res, next) => {
    if (req.user) return res.redirect('/');

    passport.authenticate('local', function(err, user) {
        if (err) { return next(err); }
        if (!user) { return res.render('sign-in', {title: 'Авторизация', user: req.user, error: 'Неверно введены логин или пароль!'}); }
        req.logIn(user, function(err) {
            if (err) { return next(err); }
            req.session.save((err) => {
                if (err) {
                    return next(err);
                }
        
                return res.redirect('/');
            });
        });
    })(req, res, next);
}