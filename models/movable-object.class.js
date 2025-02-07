/**
 * The `MovableObject` class represents an object in the game that can move and interact with its environment.
 * It extends the `DrawableObject` class and includes properties and methods for movement, gravity, collision detection, and health.
 * @class
 * @extends DrawableObject
 */
class MovableObject extends DrawableObject {
    /**
     * @type {number}The speed of the movable object.
     * @type {boolean} The direction the object is facing (false means facing left).
     * @type {number}The vertical speed of the object (used for jumping and gravity).
     * @type {number}The acceleration applied to the object (used for gravity).
     * @type {number}The current energy level of the object.
     * @type {number}The timestamp of the last hit received by the object.
     * @type {Object} The offset values for collision detection of the object.
    */
    speed = 0.25;
    otherDirection = false;
    speedY = 0;
    acceleration = 2.5;
    energy = 100;
    lastHit = 0;
    offset = {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
    };

    /**
     * Applies gravity to the object by decreasing its vertical position over time.
     */
    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
            if (!this.isAboveGround() && this.y !== 150) {
                this.y = 150;
                this.speedY = 0;
            }
        }, 1000 / 25);
    }

    /**
     * Checks if the object is above the ground.
     * 
     * @returns {boolean} - True if the object is above the ground, false otherwise.
     */
    isAboveGround() {
        if (this instanceof ThrowableObject) {
            return this.y <= 325;
        } else {
            return this.y <= 140;
        }
    }

    /**
     * Checks if this object is colliding with another movable object.
     * 
     * @param {MovableObject} mo - The other movable object to check for collision.
     * @returns {boolean} - True if the objects are colliding, false otherwise.
     */
    isColliding(mo) {
        if (this instanceof Character) {
            return (
                this.x + 60 + this.width - 80 > mo.x &&
                this.y + this.height + 20 > mo.y &&
                this.x + 60 < mo.x + mo.width &&
                this.y + 130 < mo.y + mo.height
            );
        } else {
            return (
                this.x + this.width > mo.x &&
                this.y + this.height > mo.y &&
                this.x < mo.x + mo.width &&
                this.y < mo.y + mo.height
            );
        }
    }

    /**
     * Reduces the energy of the object when hit by a smaller amount.
     */
    hit() {
        this.energy -= 5;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    /**
     * Reduces the energy of the object by a large amount when hit by the endboss.
     */
    endBossHit() {
        this.energy -= 100;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    /**
     * Checks if the object has been recently hurt (within 0.75 seconds).
     * 
     * @returns {boolean} - True if the object was recently hurt, false otherwise.
     */
    itHurt() {
        let timepassed = new Date().getTime() - this.lastHit; // Difference in ms
        timepassed = timepassed / 1000;
        return timepassed < 0.75;
    }

    /**
     * Checks if the object is dead (energy is 0).
     * 
     * @returns {boolean} - True if the object is dead, false otherwise.
     */
    isDead() {
        return this.energy == 0;
    }

    /**
     * Plays an animation by cycling through the provided images.
     * 
     * @param {Array} images - An array of image paths for the animation.
     */
    playAnimation(images) {
        let index = this.currentImage % images.length;
        let path = images[index];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    /**
     * Moves the object to the right.
     */
    moveRight() {
        this.x += this.speed;
    }

    /**
     * Moves the object to the left.
     */
    moveLeft() {
        this.x -= this.speed;
    }

    /**
     * Makes the object jump by applying vertical speed.
     */
    jump() {
        this.speedY = 25;
    }
}