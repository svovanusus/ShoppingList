const groupModel = require('../../models/Group');

module.exports = (req, res) => {
    if (!req.user) return res.send(JSON.stringify({state: 'Fail', message: 'Нет доступа!'}));

    groupModel.findByPk(req.body.groupId)
    .then(group => {
        if (!group) return res.send(JSON.stringify({status: 'Fail', message: 'Запрашиваемая группа не найдена!'}));

        group.removeUser(req.user)
        .then(() => {
            res.send(JSON.stringify({status: 'OK', redirect: '/groups', message: 'Вы успешно покинули группу!'}));
        })
        .catch(err => {
            console.log(err);
            res.send(JSON.stringify({status: 'Fail', message: 'Возникла неизвестная ошибка!'}));
        });
    })
    .catch(err => {
        console.log(err);
        res.send(JSON.stringify({status: 'Fail', message: 'Возникла неизвестная ошибка!'}));
    });
}