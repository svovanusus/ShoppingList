const userModel = require('../../models/User')

module.exports = (req, res) => {
    if (req.user) return res.redirect('/');

    var body = req.body;
    if (body.password == body.password_confirm) {
        userModel
            .findOne({
                where: {username: body.username},
                attributes: ['id']
            })
            .then(user => {
                if (user != null) {
                    res.render('sign-up', {title: "Регистрация", user: req.user, error: "Пользователь с таким именем уже существует!"});
                    return;
                }
                userModel
                    .create({
                        username: body.username,
                        password: body.password
                    })
                    .then(() => {
                        res.redirect('/sign-in?prev=reg-success');
                    })
                    .catch(err => {
                        res.render('sign-up', {title: "Регистрация", user: req.user, error: "В процессе обработки данных возникла ошибка!<br>" + err});
                    });
            })
            .catch(err => {
                res.render('sign-up', {title: "Регистрация", user: req.user, error: "Возникла неизвестная ошибка! Посторите позже.<br>" + err});
            });
    } else {
        res.render('sign-up', {title: "Регистрация", user: req.user, error: "Введённые пароли не совпадают!"});
    }
}