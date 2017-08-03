let player = document.getElementById("player");
let tempData;
let overlayHidden = false;
let apiLoc = '/API/';

// pause or unpause
function pauseUnpause() {
    if (player.paused) {
        player.play();
    } else {
        player.pause();
    }

}

// go to prev video
function goPrev() {
    id--;
    if (id < 0) {
        // get max id
        getJSON(apiLoc + 'getMaxID', function(err, data) {
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
function goNext() {
    id++;
    getJSON(apiLoc + 'getMaxID', function(err, data) {
        if (err != null) {
            console.log('Something went wrong: ' + err);
        } else {
            if (id > JSON.parse(data).maxID) id = 0;
            loadNewVideo();
        }
    });
}

// go to random video
function goRandom() {
    let sources = player.getElementsByTagName('source');
    getJSON(apiLoc + 'getMaxID', function(err, data) {
        if (err != null) {
            console.log('Something went wrong: ' + err);
        } else {
            let maxID = JSON.parse(data).maxID;
            let newID = Math.round(Math.random() * maxID);

            while (newID == id) {
                newID = Math.round(Math.random() * maxID);
            }
            id = newID;
            loadNewVideo();
        }
    });
}

// change fullscreen
function changeFullscreen() {
    let body = document.body;

    if (!(document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement || document.msFullscreenElement)) {
        // go fullscreen
        if (body.requestFullscreen) {
            body.requestFullscreen();
        } else if (body.webkitRequestFullscreen) {
            body.webkitRequestFullscreen();
        } else if (body.mozRequestFullScreen) {
            body.mozRequestFullScreen();
        } else if (body.msRequestFullscreen) {
            body.msRequestFullscreen();
        }
    } else {
        // leave fullscreen
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        }
    }
}

// hide menu
function hideMenu() {
    if (overlayHidden) return;
    overlayHidden = true;
    document.body.style.cursor = "none";
    fadeOut(document.getElementById("overlay"));
}

// showMenu
function showMenu() {
    if (!overlayHidden) return;
    document.body.style.cursor = "auto";
    overlayHidden = false;
    fadeIn(document.getElementById("overlay"));
}

// load new video
function loadNewVideo(fromHistory) {
    if (!fromHistory) history.pushState(id, `${id} - z0ner`, id);
    document.title = `${id} - z0ner`;
    let sources = player.getElementsByTagName('source');
    sources[0].src = `static/media/${id}/video.mp4`;
    sources[1].src = `static/media/${id}/video.webm`;
    player.load();
}

// progressBar vor video
setInterval(function() {
    updateProgressBar();
}, 20);

function updateProgressBar() {
    let percentage = (100 / player.duration) * player.currentTime;
    percentage = Math.min(Math.max(percentage, 0), 100);
    if (isNaN(percentage)) {
        progressBar.value = 0;
    } else {
        progressBar.value = percentage;
    }
}

// history thingy
window.addEventListener('popstate', function(e) {
    id = e.state;
    loadNewVideo(true);
});

// fadeOut an element
// stolen and modified from github: 
// https://stackoverflow.com/questions/13733912/javascript-fade-in-fade-out-without-jquery-and-css3
// by https://stackoverflow.com/users/1000849/ravi
function fadeOut(element) {
    let op = Number(element.style.opacity) || 1; // initial opacity
    clearInterval(element.fade);
    element.fade = setInterval(function() {
        if (op <= 0.05) {
            clearInterval(element.fade);
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
    let op = Number(element.style.opacity) || 0.05; // initial opacity
    clearInterval(element.fade);
    element.fade = setInterval(function() {
        if (op >= 1) {
            element.style.opacity = 1;
            element.style.filter = 'alpha(opacity=' + 100 + ")";
            clearInterval(element.fade);
        }
        element.style.opacity = op;
        element.style.filter = 'alpha(opacity=' + op * 100 + ")";
        op += op * 0.3;
    }, 50);
}

// getJson
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

// replace current history state so we get the first id
history.replaceState(id, `${id} - z0ner`, id);
fadeOut(document.getElementById("loading"));

// start timeOut so we can hide the cursor
timeout = setTimeout(function() { hideMenu() }, 2000);
document.getElementById("player").play();