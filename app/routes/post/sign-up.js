const userModel = require('../../models/User')

module.exports = (req, res) => {
    if (req.user) return res.send(JSON.stringify({redirect: '/'}));

    var body = req.body;
    if (body.password == body.password_confirm) {
        userModel
            .findOne({
                where: {username: body.username},
                attributes: ['id']
            })
            .then(user => {
                if (user != null) return res.send(JSON.stringify({status: 'Fail', message: 'Пользователь с таким именем уже существует!'}));
                userModel
                    .create({
                        username: body.username,
                        password: body.password
                    })
                    .then(() => {
                        res.send(JSON.stringify({status: 'OK', message: 'Вы успешно зарегистрированы! Теперь вы мобете авторищоваться.', redirect: '/sign-in?prev=reg-success'}));
                    })
                    .catch(err => {
                        console.log(err);
                        res.send(JSON.stringify({status: 'Fail', message: 'В процессе обработки данных возникла ошибка!'}));
                    });
            })
            .catch(err => {
                console.log(err);
                res.send(JSON.stringify({status: 'Fail', message: 'Возникла неизвестная ошибка!'}));
            });
    } else {
        res.send(JSON.stringify({status: 'Fail', message: 'Введённые пароли не совпадают!'}));
    }
}