class World {
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
    coinsCollected = 0;
    bottlesCollected = 0;
    lastThrowTime = 0;

    backgroundMusic;

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.setWorld();
        this.createBackgroundMusic(); 
        this.draw();
        this.run();
    }

    setWorld() {
        this.character.world = this;
    }

    createBackgroundMusic() {
        this.backgroundMusic = new Audio('audio/background_music.mp3');
        this.backgroundMusic.loop = true;
        soundManager.addSoundWithVolume(this.backgroundMusic, 0.1);
        this.backgroundMusic.play();
    }

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

    stopBackgroundMusic() {
        this.backgroundMusic.pause();
    }

    startBackgroundMusic() {
        if (!this.backgroundMusic.paused) return;
        this.backgroundMusic.play();
    }

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

    checkCollisionsWithEndBoss() {
        this.level.endboss.forEach((endboss) => {
            if (this.character.isColliding(endboss)) {
                this.character.endBossHit();
                this.statusBar.setPercentage(this.character.energy);
                console.log('Collision with EndBoss! Character energy:', this.character.energy);
            }
        });
    }

    checkCollisionJumpOnEnemy() {
        this.level.enemies.forEach(enemy => {
            if (this.character.isColliding(enemy) && this.character.isAboveGround() && !enemy.isDead) {
                this.character.hitEnemy();
                enemy.die();
                console.log('Enemy killed by jumping on it!');
            }
        });
    }

    checkCollisionWithBottleAndEnemies() {
        this.throwableObjects.forEach((bottle, bottleIndex) => {
            this.level.enemies.forEach((enemy) => {
                if (enemy.isColliding(bottle)) {
                    enemy.hit();
                    bottle.isColliding = true;

                    setTimeout(() => {
                        this.throwableObjects.splice(bottleIndex, 1);
                    }, 200);

                    console.log('Flasche trifft Feind!', enemy);

                }
            });
        });
    }

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

    addObjectsToMap(objects) {
        objects.forEach(o => this.addToMap(o));
    }

    addToMap(mo) {
        if (mo.otherDirection) this.flipImage(mo);
        mo.draw(this.ctx);
        if (mo.otherDirection) this.flipImageBack(mo);
    }

    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x *= -1;
    }

    flipImageBack(mo) {
        mo.x *= -1;
        this.ctx.restore();
    }
}
