const wsModule = require('../../ws');
const groupModel = require('../../models/Group');

module.exports = (req, res) => {
    if (!req.user) return res.send(JSON.stringify({state: 'Fail', message: 'Нет доступа!'}));

    groupModel.findByPk(req.body.groupId)
    .then(group => {
        if (!group) return res.send(JSON.stringify({status: 'Fail', message: 'Запрашиваемая группа не найдена!'}));

        if (group.owner != req.user.id) return res.send(JSON.stringify({status: 'Fail', message: 'У Вас нет права удалить данную группу!'}));

        group.destroy()
        .then(() => {
            wsModule.delGroup(req.body.groupId);
            res.send(JSON.stringify({status: 'OK', redirect: '/groups', message: 'Группа успешно удалена!'}));
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