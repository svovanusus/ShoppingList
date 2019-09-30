const LocalStrategy = require('passport-local');
const userModel = require('./models/User');

module.exports = (passport) => {
    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser((userId, done) => {
        userModel.findOne({
            where: {id: userId}
        }).then(user => done(null, user))
        .catch(done);
    });

    passport.use('local', new LocalStrategy({
        usernameField: 'username',
        passwordField: 'password'
    },
    (username, password, done) => {
        userModel.findOne({ where: {username} })
        .then(user => {
            if (user && user.password == password) return done(null, user);
            else return done(null, null, {message: 'Неверный логин или пароль!'});
        })
        .catch(done);
    }));
}