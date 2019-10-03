const wsModule = require('../../ws');
const listModel = require('../../models/List');
const gropModel = require('../../models/Group');

module.exports = (req, res) => {
    if (!req.user) return res.send(JSON.stringify({state: 'Fail', message: 'Нет доступа!'}));

    if (!req.body.title || req.body.title == '') return res.send(JSON.stringify({state: 'Fail', message: 'Имя списка не может быть пустым!'}));

    if (req.body.groupId && req.body.groupId != 0) {
        gropModel
            .findByPk(req.body.groupId)
            .then(group => {
                if (!group) return res.send(JSON.stringify({status: 'Fail', message: 'Запрашиваемая группа не найдена!'}));

                group
                    .hasUser(req.user)
                    .then(result => {
                        if (!result) return res.send(JSON.stringify({status: 'Fail', message: 'У вас нет доступа создавать списки в этой группе!'}));

                        listModel
                            .create({
                                title: req.body.title,
                                owner: req.user.id,
                                group_link: group.id
                            })
                            .then(list => {
                                if (!list) return res.send(JSON.stringify({status: 'Fail', message: 'Не удалось созранить данные!'}));

                                wsModule.broadcast('g' + group.id, JSON.stringify({act: 'AddList', data: list}));
                                res.send(JSON.stringify({status: 'OK', message: 'Список успешно создан'}));
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
            })
            .catch(err => {
                console.log(err);
                res.send(JSON.stringify({status: 'Fail', message: 'Возникла неизвестная ошибка!'}));
            });
    } else {
        listModel
            .create({
                title: req.body.title,
                owner: req.user.id
            })
            .then(list => {
                if (!list) return res.send(JSON.stringify({status: 'Fail', message: 'Не удалось созранить данные!'}));

                wsModule.broadcast('p' + req.user.id, JSON.stringify({act: 'AddList', data: list}));
                res.send(JSON.stringify({status: 'OK', message: 'Список успешно создан'}));
            })
            .catch(err => {
                console.log(err);
                res.send(JSON.stringify({status: 'Fail', message: 'Возникла неизвестная ошибка!'}));
            });
    }
}