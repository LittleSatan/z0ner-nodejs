console.log(`Starting server...`);

const express = require(`express`);
const app = express();
const ejs = require('ejs');

// express - static files
app.use(`/static`, express.static(__dirname + `/public/`));

// express - send favicon
app.get(`/favicon.ico`, function(req, res){
    res.send(__dirname + `/public/favicon.ico`);
});

// express - send user to id
app.get(`/:id`, function(req, res){
    
    let id = req.params.id;
    
    // check if id is valid
    if (isNaN(id) || !(id == parseInt(id, 10)) || id < 0){
        redToRandomID(req, res);
        return;
    }
    openID(req, res, req.params.id)}

);

// express - user tried to open index or something invalid. open random id
app.get(`*`, function(req, res) {
    redToRandomID(req, res);
});

let server = app.listen(process.env.PORT, process.env.IP);

function openID(req, res, id){
    app.engine('ejs', ejs.renderFile);
    res.render(__dirname + `/views/index.ejs`, {userid: id});
}

function redToRandomID(req, res){
    let id = Math.floor(Math.random() * 100);
    res.redirect(`/${id}`);
}