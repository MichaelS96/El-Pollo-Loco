/**
 * The `ThrowableObject` class represents an object that can be thrown, such as a bottle, which includes
 * animations for rotation, splash effects, and collision handling.
 * It extends the `MovableObject` class, inheriting properties and methods for movement and collision detection.
 * 
 * @class
 * @extends MovableObject
 */
class ThrowableObject extends MovableObject {
    /**
     * The collision state of the throwable object.
     * @type {boolean}
    */
    isColliding = false;

    /**
     * The images for the rotation animation.
     * @type {Array<string>}
     */
    IMAGES_ROATATION = [
        'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png',
    ];

    /**
     * The images for the splash animation.
     * @type {Array<string>}
     */
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
     * @param {number} x - The initial horizontal position of the object.
     * @param {number} y - The initial vertical position of the object.
     */
    constructor(x, y) {
        super().loadImage('img/6_salsa_bottle/salsa_bottle.png');
        this.loadImages(this.IMAGES_ROATATION);
        this.loadImages(this.IMAGES_SPLASH);
        this.x = x;
        this.y = y;
        this.height = 100;
        this.width = 80;
        this.throw();
        this.animate();
        this.splashSound = new Audio('audio/broken_bottle.mp3');
        soundManager.addSoundWithVolume(this.splashSound, 0.2); 
    }

    /**
     * Throws the object by applying vertical speed and gravity.
     */
    throw() {
        this.speedY = 30;
        if (!this.isColliding) {
            this.applyGravity();
            setInterval(() => {
                this.x += 10;
            }, 25);   
        }       
        setInterval(() => {
            this.animate();
        }, 75);
    }

    /**
     * Animates the throwable object.
     */
    animate() {
        if (this.isAboveGround() && !this.isColliding) {
            this.playAnimation(this.IMAGES_ROATATION);  
        } else {
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
     * Throws the object by applying vertical speed and gravity.
     */
    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 25);
    }

}
