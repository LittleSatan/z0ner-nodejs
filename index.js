'use strict';

console.log("Starting server...");

const express = require('express');
const app = express();

app.use(express.static(__dirname + 'public'));

app.get('*', function(req, res) {
    res.redirect(__dirname + 'public/html/index.html');
});

app.set('port', process.env.PORT || 3000);
app.set('domain', process.env.IP);

console.log(`Running Server on ${app.get('port')} and ${app.get('domain')}`);
let server = app.listen();