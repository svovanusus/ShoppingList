var http = require('http');

http.createServer(function(req, res) {
    res.end("Hello world!");
}).listen(3000, '127.0.0.1');