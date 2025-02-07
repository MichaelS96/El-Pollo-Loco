/**
 * @type {HTMLCanvasElement}
 */
let canvas;
let world;
let keyboard = new Keyboard();
let gameRunning = true;

/**
 * Event listener for keydown events. Updates the keyboard state for player input.
 */
window.addEventListener("keydown", (e) => {
    if (e.keyCode == 39) keyboard.RIGHT = true;
    if (e.keyCode == 37) keyboard.LEFT = true;
    if (e.keyCode == 38) keyboard.UP = true;
    if (e.keyCode == 40) keyboard.DOWN = true;
    if (e.keyCode == 32) keyboard.SPACE = true;
});

/**
 * Event listener for keyup events. Updates the keyboard state for player input.
 */
window.addEventListener("keyup", (e) => {
    if (e.keyCode == 39) keyboard.RIGHT = false;
    if (e.keyCode == 37) keyboard.LEFT = false;
    if (e.keyCode == 38) keyboard.UP = false;
    if (e.keyCode == 40) keyboard.DOWN = false;
    if (e.keyCode == 32) keyboard.SPACE = false;
});

/**
 * Binds touch event listeners to mobile control buttons for movement and actions.
 * Prevents default touch behavior to ensure smooth gameplay on mobile devices.
 */
function bindBtsPressEvents() {
    document.getElementById('mobileBtnLeft').addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.LEFT = true;
    });
    document.getElementById('mobileBtnLeft').addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.LEFT = false;
    });

    document.getElementById('mobileBtnRight').addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.RIGHT = true;
    });
    document.getElementById('mobileBtnRight').addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.RIGHT = false;
    });

    document.getElementById('mobileBtnJump').addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.UP = true;
    });
    document.getElementById('mobileBtnJump').addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.UP = false;
    });

    document.getElementById('mobileBtnBottle').addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.SPACE = true;
    });
    document.getElementById('mobileBtnBottle').addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.SPACE = false;
    });
}

/**
 * Starts the game by hiding the start screen and initializing the world.
 * If the world is not already created, it initializes a new one.
 */
function startGame() {
    document.getElementById("startScreen").classList.add("d-none");
    if (!world) {
        init();
    }
    hideLoadScreen();
}

/**
 * Initializes the game world by loading the level and setting up the canvas.
 */
function init() {
    loadLevel();
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
    world.startBackgroundMusic();
    bindBtsPressEvents();
}

/**
 * Starts a new game by resetting all intervals, removing enemies, and loading a new level.
 */
function newGame() {
    clearAllIntervals();
    removeAllEnemies();
    loadLevel();
    canvas = document.getElementById("canvas");
    world = new World(canvas, keyboard);
    world.startBackgroundMusic();
}

/**
 * Restarts the game by clearing the game over or win screens, stopping the background music,
 * and resetting the character and level state.
 */
function restartGame() {
    document.getElementById("gameOverScreen").classList.add("d-none");
    document.getElementById("gameWinScreen").classList.add("d-none");
    gameRunning = true;
    clearAllIntervals();
    world.stopBackgroundMusic();

    removeAllEnemies();
    newGame();
}

/**
 * Removes all enemies, bottles, coins, clouds, and background objects from the current level.
 * Resets the endboss to a new instance if it exists.
 */
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

/**
 * Clears all intervals currently set in the window. This is used to stop the game logic when restarting.
 */
function clearAllIntervals() {
    for (let i = 1; i < 9999; i++) window.clearInterval(i);
}

/**
 * Hides the loading screen by removing the "d-none" class from the content element.
 */
function hideLoadScreen() {
    document.getElementById("content").classList.remove("d-none");
}

/**
 * Enters fullscreen mode for the given element. Supports various browser implementations for fullscreen.
 * 
 * @param {HTMLElement} element - The DOM element to make fullscreen.
 */
function enterFullscreen(element) {
    if (element.requestFullscreen) {
        element.requestFullscreen();
    } else if (element.msRequestFullscreen) {      // for IE11 (remove June 15, 2022)
        element.msRequestFullscreen();
    } else if (element.webkitRequestFullscreen) {  // iOS Safari
        element.webkitRequestFullscreen();
    }
}

/**
 * Exits fullscreen mode.
 */
function exitFullscreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
    }
}

/**
 * Toggles fullscreen mode by calling the `enterFullscreen` function for the given element.
 * 
 * @param {HTMLElement} element - The DOM element to toggle fullscreen.
 */
function openFullscreen(element) {
    let fullscreen = document.getElementById('fullscreen');
    enterFullscreen(element);
}

/**
 * Öffnet den Impressum-Dialog, indem die CSS-Klasse "d-none" entfernt wird.
 */
function openImpressum() {
    let dialog = document.getElementById('impressumDialog');
    dialog.classList.remove('d-none');
}

/**
 * Schließt den Impressum-Dialog, indem die CSS-Klasse "d-none" hinzugefügt wird.
 */
function closeImpressum() {
    let dialog = document.getElementById('impressumDialog');
    dialog.classList.add('d-none');
}

/**
 * Navigates to the home screen, resetting the game by reloading the page.
 */
function goToHomeScreen() {
    clearAllIntervals();
    if (world) {
        world.stopBackgroundMusic();
    }
    removeAllEnemies();
    document.getElementById("startScreen").classList.remove("d-none");
    document.getElementById("content").classList.remove("d-none"); 
    world = null; 
    gameRunning = false;
    location.reload();  
}

