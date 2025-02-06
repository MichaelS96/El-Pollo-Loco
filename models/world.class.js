/**
 * The `World` class represents the game world and manages all objects and interactions in the world.
 * It handles collision detection, drawing objects, managing status bars, and background music.
 * @class
 */
class World {
    /**
     * @type {Character}Represents the character in the world.
     * @type {Level}Represents the current game level.
     * @type {HTMLCanvasElement}The canvas element on which the game world will be rendered.
     * @type {CanvasRenderingContext2D}The 2D rendering context for the canvas.
     * @type {Keyboard}The keyboard object to track user inputs.
     * @type {number}The horizontal offset for the camera.
     * @type {SoundManager}Manages all the sounds in the game.
     * @type {HealthStatusBar}The health status bar of the character.
     * @type {CoinStatusBar} The coin status bar.
     * @type {BottleStatusBar} The bottle status bar.
     * @type {BossStatusBar}The boss status bar.
     * @type {ThrowableObject[]}An array of throwable objects (bottles).
     * @type {number}The number of coins collected by the player.
     * @type {number} The number of bottles collected by the player.
     * @type {number} The timestamp of the last thrown object.
     * @type {HTMLAudioElement}The background music for the game.
    */
    character = new Character();
    level = level1;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    soundManager = new SoundManager();
    statusBar = new HealthStatusBar();
    coinStatusBar = new CoinStatusBar();
    bottleStatusBar = new BottleStatusBar();
    bossStatusBar = new BossStatusBar();
    throwableObjects = [];
    bottlesCollected = 0;
    lastThrowTime = 0;
    backgroundMusic;

    /**
     * Creates a new instance of the World class.
     * 
     * @param {HTMLCanvasElement} canvas - The HTML canvas element on which the game will be drawn.
     * @param {Keyboard} keyboard - The keyboard object that manages keypresses.
     */
    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.setWorld();
        this.createBackgroundMusic();
        this.draw();
        this.run();
    }

    /**
     * Sets the world for the character.
     */
    setWorld() {
        this.character.world = this;
    }

    /**
     * Creates and starts the background music.
     */
    createBackgroundMusic() {
        this.backgroundMusic = new Audio('audio/background_music.mp3');
        this.backgroundMusic.loop = true;
        soundManager.addSoundWithVolume(this.backgroundMusic, 0.02);
        this.backgroundMusic.play();
    }

    /**
     * Starts continuous checking of collisions and other game mechanics.
     * Runs every 200ms.
     */
    run() {
        setInterval(() => {
            if (!gameRunning) return;

            this.checkCollisionsWithEnemies();
            this.checkCollisionsWithEndBoss();
            this.checkCollisionsWithCoins();
            this.checkCollisionsWithBottle();
            this.checkThrowObjects();
            this.checkCollisionJumpOnEnemy();
            this.checkCollisionBottleFinalboss();
            this.checkCollisionWithBottleAndEnemies();
        }, 200);
    }

    /**
     * Pauses the background music.
     */
    stopBackgroundMusic() {
        this.backgroundMusic.pause();
    }

    /**
     * Starts the background music if it's not already playing.
     */
    startBackgroundMusic() {
        if (!this.backgroundMusic.paused) return;
        this.backgroundMusic.play();
    }

    /**
     * Checks if the character interacts with a throwable object (bottle) and throws a bottle if conditions are met.
     */
    checkThrowObjects() {
        let currentTime = Date.now();
        if (this.keyboard.SPACE && this.bottlesCollected > 0 && (currentTime - this.lastThrowTime >= 2000)) {
            let bottle = new ThrowableObject(this.character.x + 100, this.character.y + 100);
            this.throwableObjects.push(bottle);
            this.bottlesCollected--;
            let percentage = Math.max(this.bottlesCollected * 10, 0);
            this.bottleStatusBar.setPercentage(percentage);
            this.lastThrowTime = currentTime;
            console.log(`Bottle thrown! Remaining: ${this.bottlesCollected}, Status: ${percentage}%`);
        }
    }

    /**
     * Checks if the character collides with a bottle and collects it if a collision occurs.
     */
    checkCollisionsWithBottle() {
        this.level.bottles.forEach((bottle, index) => {
            if (this.character.isColliding(bottle)) {
                this.level.bottles.splice(index, 1);
                this.bottlesCollected = Math.min(this.bottlesCollected + 1, 10);
                this.bottleStatusBar.setPercentage(this.bottlesCollected * 10);
                console.log('Bottle collected!', this.bottlesCollected);
                bottle.bottleSound.play();
            }
        });
    }

    /**
     * Checks if the character collides with a coin and collects it if a collision occurs.
     */
    checkCollisionsWithCoins() {
        this.level.coins.forEach((coin, index) => {
            if (this.character.isColliding(coin)) {
                this.level.coins.splice(index, 1);
                this.coinsCollected = Math.min(this.coinsCollected + 1, 10);
                this.coinStatusBar.setPercentage(this.coinsCollected * 10);
                console.log('Coin collected!', this.coinsCollected);
                coin.coinSound.play();
            }
        });
    }

    /**
     * Checks if the character collides with an enemy and reduces the character's energy if a collision occurs.
     */
    checkCollisionsWithEnemies() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy)) {
                if (this.character.y + this.character.height - 80 < enemy.y) {
                    console.log('Character jumped on enemy!');
                } else {
                    this.character.hit();
                    this.statusBar.setPercentage(this.character.energy);
                    console.log('Collision with enemy! Character energy:', this.character.energy);
                }
            }
        });
    }

    /**
     * Checks if the character collides with the endboss.
     */
    checkCollisionsWithEndBoss() {
        this.level.endboss.forEach((endboss) => {
            if (this.character.isColliding(endboss)) {
                this.character.endBossHit();
                this.statusBar.setPercentage(this.character.energy);
                console.log('Collision with EndBoss! Character energy:', this.character.energy);
            }
        });
    }

    /**
     * Checks if the character is jumping on an enemy to kill it.
     */
    checkCollisionJumpOnEnemy() {
        this.level.enemies.forEach(enemy => {
            if (this.character.isColliding(enemy) && this.character.isAboveGround() && !enemy.isDead) {
                this.character.hitEnemy();
                enemy.die();
                console.log('Enemy killed by jumping on it!');
            }
        });
    }

    /**
     * Checks if throwable objects (bottles) collide with enemies and causes damage if a collision occurs.
     */
    checkCollisionWithBottleAndEnemies() {
        this.throwableObjects.forEach((bottle, bottleIndex) => {
            this.level.enemies.forEach((enemy) => {
                if (enemy.isColliding(bottle)) {
                    enemy.hit();
                    bottle.isColliding = true;

                    setTimeout(() => {
                        this.throwableObjects.splice(bottleIndex, 1);
                    }, 200);

                    console.log('Bottle hits enemy!', enemy);
                }
            });
        });
    }

    /**
     * Checks if throwable objects (bottles) collide with the endboss and causes damage if a collision occurs.
     */
    checkCollisionBottleFinalboss() {
        this.throwableObjects.forEach((bottle, index) => {
            this.level.endboss.forEach((endboss) => {
                if (endboss.isColliding(bottle)) {
                    endboss.hit();
                    bottle.isColliding = true;

                    setTimeout(() => {
                        this.throwableObjects.splice(index, 1);
                    }, 200);

                    if (!this.bossStatusBar.isVisible) {
                        this.bossStatusBar.isVisible = true;
                    }
                }
            });
        });
    }

    /**
     * Draws all objects to the canvas and ensures they are displayed correctly.
     */
    draw() {
        if (!gameRunning) return;
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap([...this.level.backgroundObjects, ...this.level.clouds]);
        this.ctx.translate(-this.camera_x, 0);

        this.addToMap(this.statusBar);
        this.addToMap(this.coinStatusBar);
        this.addToMap(this.bottleStatusBar);
        if (this.bossStatusBar.isVisible) this.addToMap(this.bossStatusBar);

        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap([...this.level.coins, ...this.level.enemies, ...this.level.endboss]);
        this.addToMap(this.character);
        this.addObjectsToMap([...this.level.bottles, ...this.throwableObjects]);
        this.ctx.translate(-this.camera_x, 0);

        requestAnimationFrame(() => this.draw());
    }

    /**
     * Adds a list of objects to the game world canvas.
     * 
     * @param {Array} objects - A list of objects to be added to the world.
     */
    addObjectsToMap(objects) {
        objects.forEach(o => this.addToMap(o));
    }

    /**
     * Adds a single object to the game world canvas and draws it.
     * 
     * @param {Object} mo - The object to be drawn.
     */
    addToMap(mo) {
        if (mo.otherDirection) this.flipImage(mo);
        mo.draw(this.ctx);
        if (mo.otherDirection) this.flipImageBack(mo);
    }

    /**
     * Flips the image of an object horizontally.
     * 
     * @param {Object} mo - The object whose image should be flipped.
     */
    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x *= -1;
    }

    /**
     * Restores the flipped image of an object.
     * 
     * @param {Object} mo - The object whose image should be restored.
     */
    flipImageBack(mo) {
        mo.x *= -1;
        this.ctx.restore();
    }
}
