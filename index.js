'use strict';

console.log("Starting server...");

const express = require('express');
const app = express();

app.use(express.static(__dirname + '/public'));

app.get('*', function(req, res) {
    res.redirect('/');
});

let server = app.listen(process.env.PORT, process.env.IP);