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
    removeAllEnemies();  // Entferne alle Gegner vor der Neuinitialisierung des Spiels
    canvas = document.getElementById("canvas");
    world = new World(canvas, keyboard);
    loadLevel();  // Die Spielfigur und andere Objekte werden neu geladen
    resetCharacter();  // Gesundheitszustand des Charakters zurücksetzen
}

function resetCharacter() {
    world.character.energy = 100;  // Setze die Lebensenergie auf 100
    world.character.x = 0;  // Setze die Position des Charakters zurück
    world.character.y = 140;  // Setze die Position des Charakters zurück (oder eine andere geeignete Y-Position)
    world.character.standingTime = 0;  // Setze die Standzeit zurück
    gameRunning = true;  // Stelle sicher, dass das Spiel läuft
    console.log("Character Health nach Neustart: ", world.character.energy);  // Füge dieses console.log hinzu
}

function removeAllEnemies() {
    // Leere die Listen der Gegner, sodass sie nicht mehr im Spiel vorhanden sind
    world.level.enemies = [];
    world.level.bottles = [];
    world.level.coins = [];
    world.level.clouds = [];
    world.level.backgroundObjects = [];
    if (world.level.endboss && Array.isArray(world.level.endboss)) {
        world.level.endboss = [];
    } else {
        world.level.endboss = [new Endboss()];  // Oder entferne ihn, wenn er kein Array ist
    }
}

function hideLoadScreen() {
    document.getElementById("content").classList.remove("d-none");
}

function restartGame() {
    document.getElementById("gameOverScreen").classList.add("d-none");
    document.getElementById("gameWinScreen").classList.add("d-none");
    gameRunning = true;  // Setze den Status des Spiels
    resetCharacter();  // Setze den Zustand des Charakters zurück
    removeAllEnemies();  // Entferne alle Gegner vor der Neuinitialisierung des Spiels
    newGame();  // Neuer Spielzustand initialisieren
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