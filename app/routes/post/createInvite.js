const groupModel = require('../../models/Group');
const userModel = require('../../models/User');
const inviteModel = require('../../models/Invite');

module.exports = (req, res) => {
    if (!req.user) return res.send(JSON.stringify({status: 'Fail', message: 'Нет доступа!'}));

    groupModel.findByPk(req.body.groupId)
    .then(group => {
        if (!group) return res.send(JSON.stringify({status: 'Fail', message: 'Запрашиваемая группа не найдена!'}));

        if (!group.hasUser(req.user)) return res.send(JSON.stringify({status: 'Fail', message: 'У вас нет прав приглашать участников в эту группу!'}));

        userModel.findOne({ where: {username: req.body.username}, attributes: ['id'] })
        .then(user => {
            if (!user) return res.send(JSON.stringify({status: 'Fail', message: 'Пользователь с таким именем пользователя не существует!'}));

            user.hasGroup(group)
            .then(result => {
                if (result) return res.send(JSON.stringify({status: 'Fail', message: 'Данный пользователь уже состоит в этой группе!'}));

                inviteModel.findOrCreate({ where: {inviter: req.user.id, invited: user.id, groupId: group.id} })
                .then(() => {
                    res.send(JSON.stringify({status: 'OK', message: 'Приглошение отправлено.'}));
                })
                .catch(err => {
                    console.log(err);
                    res.send(JSON.stringify({status: 'Fail', message: 'Произошла неизвестная ошибка!'}));
                });
            })
            .catch(err => {
                console.log(err);
                res.send(JSON.stringify({status: 'Fail', message: 'Произошла неизвестная ошибка!'}));
            });
        })
        .catch(err => {
            console.log(err);
            res.send(JSON.stringify({status: 'Fail', message: 'Произошла неизвестная ошибка!'}));
        });
    })
    .catch(err => {
        console.log(err);
        res.send(JSON.stringify({status: 'Fail', message: 'Произошла неизвестная ошибка!'}));
    });
}