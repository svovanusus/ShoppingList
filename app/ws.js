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
                            clients.forEach(client => {
                                if (client.readyState == 1) client.send(JSON.stringify({act: 'AddListItem', data: {listId: data.data.listId, item}}));
                            })
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
            }
        });

        ws.on('close', () => {
            clients.delete(id);
        });
    });
}