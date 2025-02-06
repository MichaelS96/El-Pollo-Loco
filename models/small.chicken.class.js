/**
 * The `SmallChicken` class represents a small chicken enemy that can walk, take damage, and die in the game.
 * It extends from `MovableObject` and includes properties and methods for animation, movement, and death handling.
 * @class
 * @extends MovableObject
 */
class SmallChicken extends MovableObject {
    /**
     * @type {number} The vertical position of the small chicken.
     * @type {number}The height of the small chicken.
     * @type {number} The width of the small chicken.
     * @type {number}The current energy level of the small chicken.
     * @type {boolean} The dead state of the small chicken.
     * @type {Object}The offset values for collision detection of the small chicken.
     */
    y = 340;
    height = 80;
    width = 65;
    energy = 1;
    isDead = false;
    offset = {
        top: -30,
        bottom: 0,
        right: -20,
        left: -20,
    };

    /**
     * The images for the walking animation.
     * @type {Array<string>}
     */
    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/3_w.png',
    ];

    /**
     * The images for the dead animation.
     * @type {Array<string>}
     */
    IMAGES_DEAD = [
        'img/3_enemies_chicken/chicken_small/2_dead/dead.png'
    ];

/**
 * Creates an instance of the SmallChicken class. The constructor initializes the small chicken's properties,
 * loads the walking and dead images, sets its initial position, speed, and initializes the death sound.
 */
    constructor() {
        super().loadImage('img/3_enemies_chicken/chicken_small/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_DEAD);
        this.x = 400 + Math.random() * 1500;
        this.speed = 0.15 + Math.random() * 0.75;
        this.animate();
        this.deathSound = new Audio('audio/chicken_death.mp3');
        soundManager.addSoundWithVolume(this.deathSound, 0.2);
    }

    /**
     * Animates the small chicken.
     */
    animate() {
        setInterval(() => {
            if (!this.isDead) {
                this.moveLeft();
            }
        }, 1000 / 60);

        setInterval(() => {
            if (!this.isDead) {
                this.playAnimation(this.IMAGES_WALKING);
            } else {
                this.playAnimation(this.IMAGES_DEAD);
            }
        }, 175);
    }

    /**
     * Reduces the energy of the small chicken when hit.
     */
    hit() {
        this.energy -= 1;
        if (this.energy <= 0) {
            this.energy = 0;
            this.die();
        }
    }

    /**
     * Kills the small chicken and removes it from the world.
     */
    die() {
        this.isDead = true;
        this.speed = 0;
        this.playAnimation(this.IMAGES_DEAD);
        this.deathSound.play();
        setTimeout(() => {
            this.removeFromWorld();
        }, 500);
    }

    /**
     * Removes the small chicken from the world.
     */
    removeFromWorld() {
        const index = world.level.enemies.indexOf(this);
        if (index !== -1) {
            world.level.enemies.splice(index, 1);
        }
    }
}
