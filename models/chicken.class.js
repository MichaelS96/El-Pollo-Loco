/**
 * Represents a chicken enemy in the game. The chicken can walk and die, and plays an animation when walking or dead.
 * It also has energy and a death sound.
 * 
 * @class
 * @extends MovableObject
 */
class Chicken extends MovableObject {
    /**
     * @type {number}The y-coordinate for the chicken's position.
     * @type { number }The height of the chicken.
     * @type { number }The width of the chicken.
     * @type { number }The energy of the chicken.If energy is 0, the chicken dies.
     * @type { boolean }The state of the chicken, true if dead, false if alive.
     * @type { Object }The offset values for collision detection of the chicken.
    */
    y = 320;
    height = 100;
    width = 90;
    energy = 1;
    isDead = false;
    offset = {
        top: -30,
        bottom: 0,
        right: -20,
        left: -20,
    };


    /** 
     * Array of image paths representing the chicken walking.
     * @type {string[]}
     */
    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png',
    ];

    /** 
     * Array of image paths representing the chicken dead.
     * @type {string[]}
     */
    IMAGES_DEAD = [
        'img/3_enemies_chicken/chicken_normal/2_dead/dead.png'
    ];

    /** @type {number} The current index of the image being used for animation. */
    currentImage = 0;

    /**
     * Creates an instance of the Chicken class.
     * Initializes the chicken's position, speed, animations, and death sound.
     */
    constructor(x, y) {
        super().loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_DEAD);
        this.x = x;
        this.y = y;
        this.speed = 0.15 + Math.random() * 0.75;
        this.animate();

        /** 
         * The sound played when the chicken dies.
         * @type {HTMLAudioElement}
         */
        this.deathSound = new Audio('audio/chicken_death.mp3');
        soundManager.addSoundWithVolume(this.deathSound, 0.2);
    }

    /**
     * Animates the chicken's movement and its walking or dead animations.
     * The chicken moves left if it is alive, otherwise it plays the dead animation.
     */
    animate() {
        // Move the chicken to the left if it is not dead
        setInterval(() => {
            if (!this.isDead) {
                this.moveLeft();
            }
        }, 1000 / 60);

        // Play the walking or dead animation depending on the chicken's state
        setInterval(() => {
            if (!this.isDead) {
                this.playAnimation(this.IMAGES_WALKING);
            } else {
                this.playAnimation(this.IMAGES_DEAD);
            }
        }, 175);
    }

    /**
     * Decreases the chicken's energy and checks if it should die.
     * If the chicken's energy is 0 or less, it dies.
     */
    hit() {
        this.energy -= 1;
        if (this.energy <= 0) {
            this.energy = 0;
            this.die();
        }
    }

    /**
     * Causes the chicken to die. Stops its movement and plays the death animation and sound.
     * Removes the chicken from the game world after a short delay.
     */
    die() {
        this.isDead = true;
        this.speed = 0; // Stops the chicken from moving
        this.playAnimation(this.IMAGES_DEAD);
        this.deathSound.play();

        // Remove the chicken from the world after a delay
        setTimeout(() => {
            this.removeFromWorld();
        }, 500);
    }

    /**
     * Removes the chicken from the level's enemies array.
     * This function is called after the chicken dies.
     */
    removeFromWorld() {
        const index = world.level.enemies.indexOf(this);
        if (index !== -1) {
            world.level.enemies.splice(index, 1);
        }
    }
}
