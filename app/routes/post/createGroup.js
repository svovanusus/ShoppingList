const groupModel = require('../../models/Group');

module.exports = (req, res) => {
    if (!req.user) return res.send(JSON.stringify({status: 'Fail', message: 'Нет доступа!'}));

    if (!req.body.title || req.body.title == '') return res.send(JSON.stringify({status: 'Fail', message: 'Название группы не может быть пустым!'}));

    groupModel
        .create({title: req.body.title, owner: req.user.id})
        .then(group => {
            group.addUser(req.user).then(() => {
                res.send(JSON.stringify({status: 'OK', message: 'Группа успешно создана', redirect: '/groups/' + group.id}));
            }).catch(err => {
                console.log(err);
                res.send(JSON.stringify({status: 'Fail', message: 'Возникла неизвестная ошибка!'}));
            });
        })
        .catch(err => {
            console.log(err);
            res.send(JSON.stringify({status: 'Fail', message: 'Возникла неизвестная ошибка!'}));
        });
}