/**
 * Represents a throwable object in the game, such as a salsa bottle.
 * Extends the MovableObject class.
 */
class ThrowableObject extends MovableObject {
    /** @type {boolean} Indicates whether the object is colliding. */
    isColliding = false;

    /** @type {Object} Defines the collision offset values. */
    offset = {
        top: 10,
        bottom: 10,
        right: 10,
        left: 10
    };

    /** @type {string[]} Images for the bottle rotation animation. */
    IMAGES_ROTATION = [
        'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png',
    ];

    /** @type {string[]} Images for the bottle splash animation. */
    IMAGES_SPLASH = [
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png',
    ];

    /**
     * Creates an instance of ThrowableObject.
     * @param {number} x - The initial x-position of the object.
     * @param {number} y - The initial y-position of the object.
     */
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

    /**
     * Initiates the throwing movement and animations.
     */
    throw() {
        if (!this.throwStarted) {
            this.throwStarted = true;
            this.applyGravity();
            this.mainInterval = setInterval(() => {
                this.x += 20;
                this.animate();
            }, 60); 
        }
    }

    /**
     * Animates the object, switching between rotation and splash animations.
     */
    animate() {
        if (this.isAboveGround() && !this.isColliding) {
            this.playAnimation(this.IMAGES_ROTATION);
        } else {
            clearInterval(this.mainInterval); 
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

    /**
     * Applies gravity to the object, making it fall.
     */
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
