/**
 * Represents a cloud in the game that moves left as part of the background.
 * The cloud has a defined position and animation for movement.
 * 
 * @class
 * @extends MovableObject
 */
class Cloud extends MovableObject {
    /**
     * @type {number}The y-coordinate for the cloud's position.
     * @type {number}The height of the cloud.
     * @type {number}The width of the cloud.
    */
    y = 25;
    height = 250;
    width = 450;

    /**
     * Creates an instance of the Cloud class.
     * Initializes the cloud's position and starts the cloud's animation.
     */
    constructor() {
        super().loadImage('img/5_background/layers/4_clouds/1.png');
        this.x = Math.random() * 1500; // Random initial position for the cloud
        this.animate(); // Starts the animation
    }

    /**
     * Animates the cloud's movement, causing it to move left across the screen.
     */
    animate() {
        setInterval(() => {
            this.moveLeft(); // Moves the cloud to the left
        }, 1000 / 60); // Executes at 60 frames per second
    }
}