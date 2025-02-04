let canvas;
let world;
let keyboard = new Keyboard();
let gameRunning = true;

function startGame() {
    document.getElementById("startScreen").classList.add("d-none");
    if (!world) {
        init(); 
    }
    hideLoadScreen();
}

function init() {
    loadLevel();    
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
}

async function newGame() {
    canvas = document.getElementById("canvas");
    world = new World(canvas, keyboard); 
    loadLevel(); 
}

function hideLoadScreen() {
    document.getElementById("content").classList.remove("d-none");
}

function restartGame() {
    location.reload();
}

window.addEventListener("keydown", (e) => {
    if (e.keyCode == 39) {
        keyboard.RIGHT = true;
    }
    if (e.keyCode == 37) {
        keyboard.LEFT = true;
    }
    if (e.keyCode == 38) {
        keyboard.UP = true;
    }
    if (e.keyCode == 40) {
        keyboard.DOWN = true;
    }
    if (e.keyCode == 32) {
        keyboard.SPACE = true;
    }
});

window.addEventListener("keyup", (e) => {
    if (e.keyCode == 39) {
        keyboard.RIGHT = false;
    }
    if (e.keyCode == 37) {
        keyboard.LEFT = false;
    }
    if (e.keyCode == 38) {
        keyboard.UP = false;
    }
    if (e.keyCode == 40) {
        keyboard.DOWN = false;
    }
    if (e.keyCode == 32) {
        keyboard.SPACE = false;
    }
});