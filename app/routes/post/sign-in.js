const passport = require('passport');

module.exports = (req, res, next) => {
    if (req.user) return res.redirect('/');

    passport.authenticate('local', function(err, user) {
        if (err) { return next(err); }
        if (!user) { return res.redirect('?error=LoginError'); }
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