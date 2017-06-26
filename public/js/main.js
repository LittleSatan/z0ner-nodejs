document.getElementById("player").onclick = function () {
    
    let player = document.getElementById("player");
    if (player.paused) {
        player.play(); 
    } else { 
        player.pause(); 
    } 

};

document.getElementById("loading").style.display = "none";
document.getElementById("player").play();