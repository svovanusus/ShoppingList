module.exports = (req, res) => {
    if (!req.user) return res.send(JSON.stringify({state: 'Fail', message: 'Нет доступа!'}));

    res.send(JSON.stringify({status: 'OK', message: 'Список успешно создан!'}));
}