class Character extends MovableObject {

    height = 280;
    width = 150;
    y = 60;
    speed = 5;
    standingTime = 0;
    world;
    walkingSound = new Audio('audio/sand_walking.mp3');
    jumpSound = new Audio('audio/jump.mp3');
    hurtSound = new Audio('audio/hurt.mp3');  // Hurt-Sound erstellen

    offset = {
        top: 100,
        bottom: 100,
        right: 40,
        left: 20,
    }

    IMAGES_STANDING = [
        'img/2_character_pepe/1_idle/idle/I-1.png',
        'img/2_character_pepe/1_idle/idle/I-2.png',
        'img/2_character_pepe/1_idle/idle/I-3.png',
        'img/2_character_pepe/1_idle/idle/I-4.png',
        'img/2_character_pepe/1_idle/idle/I-5.png',
        'img/2_character_pepe/1_idle/idle/I-6.png',
        'img/2_character_pepe/1_idle/idle/I-7.png',
        'img/2_character_pepe/1_idle/idle/I-8.png',
        'img/2_character_pepe/1_idle/idle/I-9.png',
        'img/2_character_pepe/1_idle/idle/I-10.png',
    ];

    IMAGES_SLEEPING = [
        'img/2_character_pepe/1_idle/long_idle/I-11.png',
        'img/2_character_pepe/1_idle/long_idle/I-12.png',
        'img/2_character_pepe/1_idle/long_idle/I-13.png',
        'img/2_character_pepe/1_idle/long_idle/I-14.png',
        'img/2_character_pepe/1_idle/long_idle/I-15.png',
        'img/2_character_pepe/1_idle/long_idle/I-16.png',
        'img/2_character_pepe/1_idle/long_idle/I-17.png',
        'img/2_character_pepe/1_idle/long_idle/I-18.png',
        'img/2_character_pepe/1_idle/long_idle/I-19.png',
        'img/2_character_pepe/1_idle/long_idle/I-20.png',
    ];

    IMAGES_WALKING = [
        'img/2_character_pepe/2_walk/W-21.png',
        'img/2_character_pepe/2_walk/W-22.png',
        'img/2_character_pepe/2_walk/W-23.png',
        'img/2_character_pepe/2_walk/W-24.png',
        'img/2_character_pepe/2_walk/W-25.png',
        'img/2_character_pepe/2_walk/W-26.png',
    ];

    IMAGES_JUMPING = [
        'img/2_character_pepe/3_jump/J-31.png',
        'img/2_character_pepe/3_jump/J-32.png',
        'img/2_character_pepe/3_jump/J-33.png',
        'img/2_character_pepe/3_jump/J-34.png',
        'img/2_character_pepe/3_jump/J-35.png',
        'img/2_character_pepe/3_jump/J-36.png',
        'img/2_character_pepe/3_jump/J-37.png',
        'img/2_character_pepe/3_jump/J-38.png',
        'img/2_character_pepe/3_jump/J-39.png',
    ];

    IMAGES_HURT = [
        'img/2_character_pepe/4_hurt/H-41.png',
        'img/2_character_pepe/4_hurt/H-42.png',
        'img/2_character_pepe/4_hurt/H-43.png',
    ];

    IMAGES_DEAD = [
        'img/2_character_pepe/5_dead/D-51.png',
        'img/2_character_pepe/5_dead/D-52.png',
        'img/2_character_pepe/5_dead/D-53.png',
        'img/2_character_pepe/5_dead/D-54.png',
        'img/2_character_pepe/5_dead/D-55.png',
        'img/2_character_pepe/5_dead/D-56.png',
        'img/2_character_pepe/5_dead/D-57.png',
    ];

    constructor() {
        super().loadImage('img/2_character_pepe/1_idle/idle/I-1.png');
        this.loadImages(this.IMAGES_STANDING);
        this.loadImages(this.IMAGES_SLEEPING);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_HURT);
        this.applyGravity();
        this.animate();
        this.jumpSound.volume = 0.2;
        this.hurtSound.volume = 0.1;
        this.energy = 100;  // Initialisiere die Lebensenergie beim Erstellen des Charakters
    }

    animate() {
        setInterval(() => {
            if (gameRunning) {
                this.characterMoving();
            }
        }, 1000 / 60);

        setInterval(() => {
            if (gameRunning) {
                this.characterAnimation();
            }
        }, 100);
    }

    characterMoving() {
        if (!gameRunning) return;

        this.walkingSound.pause();
        this.walkingSound.volume = 0.05;

        if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
            this.moveRight();
            this.otherDirection = false;
            this.walkingSound.play();
            this.standingTime = 0;
        }
        if (this.world.keyboard.LEFT && this.x > 0) {
            this.moveLeft();
            this.otherDirection = true;
            this.walkingSound.play();
            this.standingTime = 0;
        }
        if (this.world.keyboard.UP && !this.isAboveGround()) {
            this.jump();
            this.standingTime = 0;
            this.jumpSound.play();
        }

        this.world.camera_x = -this.x + 120;
    }

    characterAnimation() {
        if (this.isDead()) {
            this.playAnimation(this.IMAGES_DEAD);
            this.showGameOverScreen();
        } else if (this.itHurt()) {
            this.playAnimation(this.IMAGES_HURT);
            this.standingTime = 0;
            if (this.hurtSound) {
                this.hurtSound.play();
            }
        } else if (this.isAboveGround()) {
            this.playAnimation(this.IMAGES_JUMPING);
            this.standingTime = 0;
        } else {
            if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
                this.playAnimation(this.IMAGES_WALKING);
                this.standingTime = 0;
            } else {
                this.playAnimation(this.IMAGES_STANDING);
                this.standingTime += 300;

                if (this.standingTime >= 15000) {
                    this.playAnimation(this.IMAGES_SLEEPING);
                }
            }
        }
    }

    isDead() {
        return this.energy <= 0;
    }

    jump() {
        this.speedY = 30;
    }

    hitEnemy() {
        this.speedY = 20;
    }

    isAboveGround() {
        return this.y < 140;
    }

    showGameOverScreen() {
        setTimeout(() => {
            let gameOverScreen = document.getElementById("gameOverScreen");
            gameOverScreen.classList.remove("d-none");
            gameOverScreen.style.position = "absolute";
            gameRunning = false;
        }, 1000);
    }

}