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

app.get(`/getRandomID`, function(req, res){
    let id = getRandomID();
    console.log(id);
    res.send(`{id: ${id}}`);
});

app.get(`/getMaxID`, function(req, res){
    let id = getMaxID();
    res.send(`{id: ${id}}`);
});

// express - send user to id
app.get(`/:id`, function(req, res){
    
    let id = req.params.id;
    
    // check if id is valid
    if (isNaN(id) || !(id == parseInt(id, 10)) || id < 0){
            res.redirect(`/${getRandomID()}`);
        return;
    }
    openID(req, res, req.params.id)}

);

// express - user tried to open index or something invalid. open random id
app.get(`*`, function(req, res) {
    res.redirect(`/${getRandomID()}`);
});

let server = app.listen(process.env.PORT, process.env.IP);

// Send prerendered website
function openID(req, res, id){
    app.engine('ejs', ejs.renderFile);
    res.render(__dirname + `/views/index.ejs`, {userid: id});
}

// API - get random ID
function getRandomID(){
    return Math.round(Math.random() * getMaxID());
}

// API - get Max ID
function getMaxID(){
    return 1;
}