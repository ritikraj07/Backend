// var http = require('http');
// const { parse } = require('path');
// const url = require('url')
// http.createServer(function (req, res) {
//     res.writeHead(200, { 'Content-Type': 'text/html' });
//     let a = url.parse(req.url, true).query
//     let text = a.year
//     res.end(text);
// }).listen(8080);




var fs = require('fs');



fs.appendFile('mynewfile1.txt', ' This is my text.', function (err) {
    if (err) throw err;
    console.log('Updated!');
});