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
                    res.render('index', {title: "Регистрация", name: null, text: "Пользователь с таким именем уже существует!"});
                    return;
                }
                userModel
                    .create({
                        username: body.username,
                        password: body.password
                    })
                    .then(() => {
                        res.render('index', {title: "Регистрация", name: null, text: "Вы успешно зарегистрированы!"});
                    })
                    .catch(err => {
                        res.render('index', {title: "Регистрация", name: null, text: "В процессе обработки данных возникла ошибка!<br>" + err});
                    });
            })
            .catch(err => {
                res.render('index', {title: "Регистрация", name: null, text: "Возникла неизвестная ошибка! Посторите позже.<br>" + err});
            });
    } else {
        res.render('index', {title: "Регистрация", name: null, text: "Пароли не совпадают!"});
    }
}