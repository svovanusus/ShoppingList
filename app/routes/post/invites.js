var inviteModel = require('../../models/Invite');

module.exports = (req, res) => {
    if (!req.user) res.send(JSON.stringify({status: 'Fail', message: 'Нет доступа!'}));

    inviteModel.findByPk(req.body.id)
    .then(invite => {
        if (invite) {
            if (req.user.id != invite.invited) return res.send(JSON.stringify({status: 'Fail', message: 'Нет доступа!'}));

            if (req.body.action == 'apply') {
                invite.getGroup()
                .then(group => {
                    group.addUser(req.user)
                    .then(() => {
                        invite.destroy()
                        .then(() => {
                            res.send(JSON.stringify({status: 'OK', message: 'Приглашение успешно принято.'}));
                        })
                        .catch(err => {
                            console.log(err);
                            res.send(JSON.stringify({status: 'Fail', message: 'В процессе обработки произошла неизвестная ошибка.'}));
                        });
                    })
                    .catch(err => {
                        console.log(err);
                        res.send(JSON.stringify({status: 'Fail', message: 'В процессе обработки произошла неизвестная ошибка.'}));
                    });
                })
                .catch(err => {
                    console.log(err);
                    res.send(JSON.stringify({status: 'Fail', message: 'В процессе обработки произошла неизвестная ошибка.'}));
                });
                //res.send(JSON.stringify({status: 'OK', message: 'Test'}));
            } else if (req.body.action == 'cancel') {
                invite.destroy()
                .then(() => {
                    res.send(JSON.stringify({status: 'OK', message: 'Приглашение успешно отклонено.'}));
                })
                .catch(err => {
                    console.log(err);
                    res.send(JSON.stringify({status: 'Fail', message: 'В процессе обработки произошла неизвестная ошибка.'}));
                });
            } else {
                res.send(JSON.stringify({status: 'Fail', message: 'Запрошено несуществующее действие!'}));
            }
        } else {
            res.send(JSON.stringify({status: 'Fail', message: 'Запрашиваемое приглашение не найдено! ' + req.body.id + '\n' + JSON.stringify(invite)}));
        }
    })
    .catch(err => {
        console.log(err);
        res.send(JSON.stringify({status: 'Fail', message: 'Возникла неизвестная ошибка!'}));
    });
}