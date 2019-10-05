module.exports = (req, res) => {
    if (!req.user) return res.send(JSON.stringify({status: 'Fail', message: 'Нет доступа!'}));

    if (req.body.newPassword != req.body.newPasswordConfirm) return res.send(JSON.stringify({status: 'Fail', message: 'Введённые пароли не совпадают!'}));

    if (req.body.oldPassword != req.user.password) return res.send(JSON.stringify({status: 'Fail', message: 'Неверно введён старый пароль!'}));

    req.user.password = req.body.newPassword;
    req.user.save()
    .then(user => {
        if (user != req.user) return res.send(JSON.stringify({status: 'Fail', message: 'Возникла ошибка в процессе сохранения данных!'}));

        res.send(JSON.stringify({status: 'OK', message: 'Пароль успешно обновлён!'}));
    })
    .catch(err => {
        console.log(err);
        res.send(JSON.stringify({status: 'Fail', message: 'Возникла неизвестная ошибка!'}));
    });
}