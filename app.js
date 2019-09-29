const express = require('express');
const bodyParser = require('body-parser');

const userModel = require('./app/models/User');

const app = express();
app.set('view engine', 'ejs');
app.set('views', './app/views/');
app.set('models', './app/models/');
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    var data = {
        title: "Custom title!",
        text: "lorem Ipsim text!!!"
    };
    res.render('index', data);
});

app.get('/sign-up', (req, res) => {
    var data = {title: "Регистрация"};
    res.render('sign-up', data);
});
app.post('/sign-up', (req, res) => {
    var body = req.body;
    if (body.password == body.password_confirm) {
        userModel
            .findOne({
                where: {username: body.username},
                attributes: ['id']
            })
            .then(user => {
                if (user != null) {
                    res.render('index', {title: "Регистрация", text: "Пользователь с таким именем уже существует!"});
                    return;
                }
                userModel
                    .create({
                        username: body.username,
                        password: body.password
                    })
                    .then(() => {
                        res.render('index', {title: "Регистрация", text: "Вы успешно зарегистрированы!"});
                    })
                    .catch(err => {
                        res.render('index', {title: "Регистрация", text: "В процессе обработки данных возникла ошибка!<br>" + err});
                    });
            })
            .catch(err => {
                res.render('index', {title: "Регистрация", text: "Возникла неизвестная ошибка! Посторите позже.<br>" + err});
            });
    } else {
        res.render('index', {title: "Регистрация", text: "Пароли не совпадают!"});
    }
});

app.get('/sign-in', (req, res) => {
    var data = {title: "Авторизация"};
    res.render('sign-in', data);
});
app.post('/sign-in', (req, res) => {
    var body = req.body;
    userModel
        .findOne({
            where: {username: body.username}
        })
        .then(user => {
            res.render('index', {title: "Авторизация", text: "OK => " + JSON.stringify(user)});
        })
        .catch(err => {
            res.render('index', {title: "Авторизация", text: "Fail => " + err});
        });
});

app.listen(3000, () => console.log("Server listening on port 3000."));