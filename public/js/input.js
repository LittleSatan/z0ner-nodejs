// KEYBOARD AND MOUSE

player.onclick = function () {
    pauseUnpause();
};

let mouse = { x: 0, y: 0, leftButton: 0, rightButton: 0, mousewheel: 0 };

(function() {

    document.oncontextmenu = function(evt) {
        evt.preventDefault();
    };

    document.addEventListener('mousemove', function(evt) {
        mouse.x = evt.clientX;
        mouse.y = evt.clientY;
    }, false);

    document.addEventListener("mousewheel", function(evt) {
        mouse.wheel += Math.max(-1, Math.min(1, (evt.wheelDelta || -evt.detail)));
    }, false);

    document.onkeydown = function(evt) {
        let e = evt.keyCode;
        if (e == 37) goPrev();  // left key
        if (e == 39) goNext();  // right key
        if (e == 40 || e == 82) goRandom();  // down key or R
        if (e == 32) pauseUnpause(); // spacebar
        if (e == 72) hideUnHideOverlay(); // H
    };

    document.onkeyup = function(evt) {
        let e = evt.keyCode;
    };
}());