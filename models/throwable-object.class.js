class ThrowableObject extends MovableObject {
    isColliding = false;
    offset = {
        top: 10,
        bottom: 10,
        right: 10,
        left: 10
    };

    IMAGES_ROTATION = [
        'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png',
    ];

    IMAGES_SPLASH = [
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png',
    ];

    constructor(x, y) {
        super().loadImage('img/6_salsa_bottle/salsa_bottle.png');
        this.loadImages(this.IMAGES_ROTATION);
        this.loadImages(this.IMAGES_SPLASH);
        this.x = x;
        this.y = y;
        this.height = 100;
        this.width = 80;
        this.speedY = 30;
        this.splashSound = new Audio('audio/broken_bottle.mp3');
        soundManager.addSoundWithVolume(this.splashSound, 0.2);

        this.throw();
    }

    throw() {
        if (!this.throwStarted) {
            this.throwStarted = true;
            this.applyGravity();

            this.moveInterval = setInterval(() => {
                this.x += 10;
            }, 25);

            this.animationInterval = setInterval(() => {
                this.animate();
            }, 75);
        }
    }

    animate() {
        if (this.isAboveGround() && !this.isColliding) {
            this.playAnimation(this.IMAGES_ROTATION);
        } else {
            clearInterval(this.animationInterval);
            this.playAnimation(this.IMAGES_SPLASH);
            if (!this.splashTimerStarted) {
                this.splashTimerStarted = true;
                this.splashSound.play();
                setTimeout(() => {
                    this.y = 1000;
                }, 100);
            }
        }
    }

    applyGravity() {
        this.gravityInterval = setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            } else {
                clearInterval(this.gravityInterval);
            }
        }, 1000 / 25);
    }
}
