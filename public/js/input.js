// KEYBOARD AND MOUSE

// user clicks on video
player.onclick = function() {
    pauseUnpause();
};

// user makes doubleclick on video
player.ondblclick = function() {
    changeFullscreen();
};

// user clicks on video bar
let progressBar = document.getElementById('progressBar');
progressBar.onclick = function() {

}

// disable contextmenu
document.oncontextmenu = function(evt) {
    evt.preventDefault();
};

// listen for mouse movement
let timeout;
document.onmousemove = function() {
    showMenu();
    clearTimeout(timeout);
    timeout = setTimeout(function() { hideMenu() }, 2000);
};

// listen for the mousewheel
document.addEventListener("mousewheel", function(evt) {
    let delta = Math.max(-1, Math.min(1, (evt.wheelDelta || -evt.detail)));
    console.log(delta);
}, false);

// listen for keys
document.onkeydown = function(evt) {
    let e = evt.keyCode;
    if (e == 37) goPrev(); // left key
    if (e == 39) goNext(); // right key
    if (e == 40 || e == 82) goRandom(); // down key or R
    if (e == 32) pauseUnpause(); // spacebar
    if (e == 70) changeFullscreen(); // F
};