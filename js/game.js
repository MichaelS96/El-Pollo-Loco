let canvas;
let world;
let keyboard = new Keyboard();
let gameRunning = true;

window.addEventListener("keydown", (e) => {
    if (e.keyCode == 39) keyboard.RIGHT = true;
    if (e.keyCode == 37) keyboard.LEFT = true;
    if (e.keyCode == 38) keyboard.UP = true;
    if (e.keyCode == 40) keyboard.DOWN = true;
    if (e.keyCode == 32) keyboard.SPACE = true;
});

window.addEventListener("keyup", (e) => {
    if (e.keyCode == 39) keyboard.RIGHT = false;
    if (e.keyCode == 37) keyboard.LEFT = false;
    if (e.keyCode == 38) keyboard.UP = false;
    if (e.keyCode == 40) keyboard.DOWN = false;
    if (e.keyCode == 32) keyboard.SPACE = false;
});

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

function newGame() {
    clearAllIntervals();  // Stoppe alle laufenden Intervalle
    removeAllEnemies();   // Entferne alle Gegner
    loadLevel();          // Lade das Level neu
    canvas = document.getElementById("canvas");
    world = new World(canvas, keyboard);
    resetCharacter();     // Setze den Charakter zurück
}

function restartGame() {
    document.getElementById("gameOverScreen").classList.add("d-none");
    document.getElementById("gameWinScreen").classList.add("d-none");
    gameRunning = true;
    clearAllIntervals();
    resetCharacter();
    removeAllEnemies();
    newGame();
}

function resetCharacter() {
    world.character.energy = 100;
    world.character.x = 0;
    world.character.y = 140;
    world.character.standingTime = 0;
    gameRunning = true;
    console.log("Character Health nach Neustart: ", world.character.energy);
}

function removeAllEnemies() {
    world.level.enemies = [];
    world.level.bottles = [];
    world.level.coins = [];
    world.level.clouds = [];
    world.level.backgroundObjects = [];

    if (Array.isArray(world.level.endboss)) {
        world.level.endboss = [];
    } else {
        world.level.endboss = [new Endboss()];
    }
}

function clearAllIntervals() {
    for (let i = 1; i < 9999; i++) window.clearInterval(i);
}

function hideLoadScreen() {
    document.getElementById("content").classList.remove("d-none");
}

function enterFullscreen(element) {
    if (element.requestFullscreen) {
        element.requestFullscreen();
    } else if (element.msRequestFullscreen) {      // for IE11 (remove June 15, 2022)
        element.msRequestFullscreen();
    } else if (element.webkitRequestFullscreen) {  // iOS Safari
        element.webkitRequestFullscreen();
    }
}

function exitFullscreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
    }
}
function openFullscreen(element) {
    let fullscreen = document.getElementById('fullscreen');
    enterFullscreen(element);
}