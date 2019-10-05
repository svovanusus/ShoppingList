const groupModel = require('./models/Group');
const listModel = require('./models/List');
const listItemModel = require('./models/ListItem');

module.exports.init = app => {
    var clientGroups = new Map();

    module.exports.broadcast = (id, data) => {
        var clients = clientGroups.get(id);
        if (!clients) return false;
        clients.forEach(client => {
            if (client.readyState == 1) client.send(data);
        });
    }

    module.exports.delGroup = (id) => {
        if (clientGroups.has('g' + id)) {
            var clients = clientGroups.get('g' + id);
            clients.forEach(client => {
                client.close();
            });
            clientGroups.delete('g' + id);
        }
    }

    app.ws('/lists/:groupId', (ws, req, next) => {
        if (!req.user) return false;
        
        var clients;
        var id = req.sessionID + Math.random();

        if (req.params.groupId != 0) {
        groupModel
            .findByPk(req.params.groupId)
            .then(group => {
                if (!group) return false;

                group
                    .hasUser(req.user)
                    .then(result => {
                        if (!result) return false;

                        if (!clientGroups.has('g' + group.id)) clientGroups.set('g' + group.id, new Map());

                        clients = clientGroups.get('g' + group.id);

                        var id = req.sessionID + Math.random();
                        clients.set(id, ws);
                    })
                    .catch(err => {
                        console.log(err);
                        next(err);
                    });
            })
            .catch(err => {
                console.log(err);
                next(err);
            });
        } else {
            if (!clientGroups.has('p' + req.user.id)) clientGroups.set('p' + req.user.id, new Map());

            clients = clientGroups.get('p' + req.user.id);

            clients.set(id, ws);
        }

        ws.on('message', data => {
            data = JSON.parse(data);
            if (data.act == 'AddListItem') {
                listModel
                    .findByPk(data.data.listId)
                    .then(list => {
                        if (!list) return ws.send(JSON.stringify({act: 'Notify', status: 'Fail', message: 'Запрашиваемый список не найден!'}));
                        if (!list.link_group == req.params.groupId) return ws.send(JSON.stringify({act: 'Notify', status: 'Fail', message: 'Запрашиваемый список не принадлежит текущей группе!'}));

                        listItemModel.create({title: data.data.title, listId: list.id})
                        .then(item => {
                            if (!item) return ws.send(JSON.stringify({act: 'Notify', status: 'Fail', message: 'Неудалось сохранить состояние! Попробуйте позже.'}));

                            clients.forEach(client => {
                                if (client.readyState == 1) client.send(JSON.stringify({act: 'AddListItem', data: {listId: data.data.listId, item}}));
                            });
                        })
                        .catch(err => {
                            console.log(err);
                            ws.send(JSON.stringify({act: 'Notify', status: 'Fail', message: 'Возникла неизвестная ошибка!'}));
                        });
                    })
                    .catch(err => {
                        console.log(err);
                        ws.send(JSON.stringify({act: 'Notify', status: 'Fail', message: 'Возникла неизвестная ошибка!'}));
                    });
            } else if (data.act == 'ChangeStateListItem') {
                listItemModel.findByPk(data.data.itemId)
                .then(listItem => {
                    if (!listItem) return ws.send(JSON.stringify({act: 'Notify', status: 'Fail', message: 'Запрашиваемый элемент не найден!'}));

                    listItem.isDone = data.data.isDone;
                    listItem.save()
                    .then(savedItem => {
                        if (!savedItem) return ws.send(JSON.stringify({act: 'Notify', status: 'Fail', message: 'Неудалось сохранить состояние! Попробуйте позже.'}));

                        clients.forEach(client => {
                            if (client != ws && client.readyState == 1) client.send(JSON.stringify({act: 'ChangeStateListItem', data: {itemId: savedItem.id, isDone: savedItem.isDone}}));
                        });
                    })
                    .catch(err => {
                        console.log(err);
                        ws.send(JSON.stringify({act: 'Notify', status: 'Fail', message: 'Возникла неизвестная ошибка!'}));
                    });
                })
                .catch(err => {
                    console.log(err);
                    ws.send(JSON.stringify({act: 'Notify', status: 'Fail', message: 'Возникла неизвестная ошибка!'}));
                })
            } else if (data.act == 'DeleteListItem') {
                listItemModel.findByPk(data.data.itemId)
                .then(item => {
                    if (!item) return ws.send(JSON.stringify({act: 'Notify', status: 'Fail', message: 'Запрашиваемый элемент не найден!'}));

                    item.destroy()
                    .then(() => {
                        clients.forEach(client => {
                            if (client.readyState == 1) client.send(JSON.stringify({act: 'DeleteListItem', data: {itemId: data.data.itemId}}));
                        })
                    })
                    .catch(err => {
                        console.log(err);
                        ws.send(JSON.stringify({act: 'Notify', status: 'Fail', message: 'Возникла неизвестная ошибка!'}));
                    })
                })
                .catch(err => {
                    console.log(err);
                    ws.send(JSON.stringify({act: 'Notify', status: 'Fail', message: 'Возникла неизвестная ошибка!'}));
                });
            } else if (data.act == 'DeleteList') {
                listModel.findByPk(data.data.listId)
                .then(list => {
                    if (!list) return ws.send(JSON.stringify({act: 'Notify', status: 'Fail', message: 'Запрашиваемый список не найден!'}));

                    list.destroy()
                    .then(() => {
                        clients.forEach(client => {
                            if (client.readyState == 1) client.send(JSON.stringify({act: 'DeleteList', data: {listId: data.data.listId}}));
                        });
                    })
                    .catch(err => {
                        console.log(err);
                        ws.send(JSON.stringify({act: 'Notify', status: 'Fail', message: 'Возникла неизвестная ошибка!'}));
                    })
                })
                .catch(err => {
                    console.log(err);
                    ws.send(JSON.stringify({act: 'Notify', status: 'Fail', message: 'Возникла неизвестная ошибка!'}));
                });
            } else {
                ws.send(JSON.stringify({act: 'Notify', status: 'Fail', message: 'Неизвестный запрос!'}));
            }
        });

        ws.on('close', () => {
            clients.delete(id);
        });
    });
}