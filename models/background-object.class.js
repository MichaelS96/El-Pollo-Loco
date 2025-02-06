/**
 * Represents a background object in the game. It extends from the MovableObject class.
 * The background object is positioned at a specific location and loaded with an image.
 * @class
 * @extends MovableObject
 */
class BackgroundObject extends MovableObject {
    width = 720;
    height = 480;

    /**
     * Creates an instance of the BackgroundObject class.
     * 
     * @param {string} imagePath - The path to the image that will be loaded for the background object.
     * @param {number} x - The x-coordinate for the background object's position.
     * @param {number} y - The y-coordinate for the background object's position.
     */
    constructor(imagePath, x, y) {
        super().loadImage(imagePath);
        this.x = x;
        this.y = 480 - this.height; // Ensures the object is positioned at the bottom of the screen
    }
}
