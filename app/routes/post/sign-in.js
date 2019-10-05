const passport = require('passport');

module.exports = (req, res, next) => {
    if (req.user) return res.send(JSON.stringify({redirect: '/'}));

    passport.authenticate('local', function(err, user) {
        if (err) {
            res.send(JSON.stringify({status: 'Fail', message: 'Возникла неизвестная ошибка!'}));
            return next(err);
        }
        if (!user) { return res.send(JSON.stringify({status: 'Fail', message: 'Неверно введены логин или пароль!'})); }
        req.logIn(user, function(err) {
            if (err) { return next(err); }
            req.session.save((err) => {
                if (err) {
                    res.send(JSON.stringify({status: 'Fail', message: 'Возникла неизвестная ошибка!'}));
                    return next(err);
                }
        
                return res.send(JSON.stringify({status: 'OK', message: 'Вы успешно авторизованы!', redirect: '/'}));
            });
        });
    })(req, res, next);
}