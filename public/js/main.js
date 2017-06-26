let player = document.getElementById("player");
let tempData;
let overlayHidden = false;

// pause or unpause
function pauseUnpause(){
    if (player.paused) {
        player.play(); 
    } else { 
        player.pause(); 
    }

}

// hide or unhide overlay
function hideUnHideOverlay(){
    disableHideUnHideOverlay = true;
    if (overlayHidden){
        fadeIn(document.getElementById("overlay"));
    } else {
        fadeOut(document.getElementById("overlay"));
    }
    overlayHidden = !overlayHidden;
}

// go to prev video
function goPrev(){
    id--;
    if (id < 0) {
        // get max id
        getJSON('https://z0ner-nodejs-marissachan.c9users.io/API/getMaxID', function(err, data) {
            if (err != null) {
                console.log('Something went wrong: ' + err);
            } else {
                id = JSON.parse(data).maxID;
                loadNewVideo();
            }
            });
    } else {
        loadNewVideo();
    }
}

// go to next video
function goNext(){
    id++;
    getJSON('https://z0ner-nodejs-marissachan.c9users.io/API/getMaxID', function(err, data) {
        if (err != null) {
            console.log('Something went wrong: ' + err);
        } else {
            if (id > JSON.parse(data).maxID) id = 0;
            loadNewVideo();
        }
        });
}

// go to random video
function goRandom(){
    let sources = player.getElementsByTagName('source');
    getJSON('https://z0ner-nodejs-marissachan.c9users.io/API/getMaxID', function(err, data) {
        if (err != null) {
            console.log('Something went wrong: ' + err);
        } else {
            let maxID = JSON.parse(data).maxID;
            let newID = Math.round(Math.random() * maxID);
            
            while (newID == id){
                newID = Math.round(Math.random() * maxID);
            }
            id = newID;            
            loadNewVideo();
        }
        });
}

// load new video
function loadNewVideo(fromHistory){
    if (!fromHistory) history.pushState(id, `${id} - z0ner`, id);
    document.title = `${id} - z0ner`;
    let sources = player.getElementsByTagName('source');
    sources[0].src = `static/media/${id}/video.mp4`;
    sources[1].src = `static/media/${id}/video.webm`;
    player.load();
}

window.addEventListener('popstate', function(e) {
    id = e.state;
    loadNewVideo(true);
});

// fadeOut an element
// stolen from github: 
// https://stackoverflow.com/questions/13733912/javascript-fade-in-fade-out-without-jquery-and-css3
// by https://stackoverflow.com/users/1000849/ravi
function fadeOut(element) {
    var op = element.style.opacity || 1;  // initial opacity
    var timer = setInterval(function () {
        if (op <= 0.05){
            clearInterval(timer);
            element.style.opacity = 0;
            element.style.filter = 'alpha(opacity=' + 0 + ")";
            element.style.display = 'none';
        }
        element.style.opacity = op;
        element.style.filter = 'alpha(opacity=' + op * 100 + ")";
        op -= op * 0.2;
    }, 50);
}

// fadeIn an element
function fadeIn(element) {
    element.style.display = 'initial';
    var op = element.style.opacity || 0.05;  // initial opacity
    console.log(op);
    var timer = setInterval(function () {
        if (op >= 1){
            element.style.opacity = 1;
            element.style.filter = 'alpha(opacity=' + 100 + ")";
            clearInterval(timer);
        }
        element.style.opacity = op;
        element.style.filter = 'alpha(opacity=' + op * 100 + ")";
        op += op * 0.3;
    }, 50);
}


// stolen from github:
// https://stackoverflow.com/a/35970894/4220748
// by https://stackoverflow.com/users/3859863/robin-hartmann
function getJSON(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.responseType = 'json';
    xhr.onload = function() {
      var status = xhr.status;
      if (status == 200) {
        callback(null, xhr.response);
      } else {
        callback(status);
      }
    };
    xhr.send();
}

fadeOut(document.getElementById("loading"));
document.getElementById("player").play();