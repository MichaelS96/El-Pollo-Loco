/**
 * The `DrawableObject` class represents an object that can be drawn on the canvas in the game.
 * It provides methods for loading images, drawing the object, and handling collision detection.
 * @class
 */
class DrawableObject {
    /**
     * @type {number}The x-coordinate for the object's position.
     * @type {number}The y-coordinate for the object's position.
     * @type {number}The height of the object.
     * @type {number}The width of the object.
     * @type {HTMLImageElement}The image representing the object.
     * @type {Object}The cache for storing loaded images.
     * @type {number}The index of the current image being used for animation.
    */
    x = 120;
    y = 280;
    height = 150;
    width = 100;
    img;
    imageCache = {};
    currentImage = 0;

    /**
     * Loads an image from the given path.
     * @param {string} path The path to the image file.
     */
    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    /**
     * Draws the object on the canvas at its current position.
     * @param {CanvasRenderingContext2D} ctx The 2D canvas context to draw on.
     */
    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    /**
     * Loads multiple images and stores them in the image cache.
     * @param {string[]} arr An array of image file paths to load.
     */
    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }

    /**
     * Draws a blue frame around the object if it is a Character or ThrowableObject instance.
     * @param {CanvasRenderingContext2D} ctx The 2D canvas context to draw on.
     */
    drawFrame(ctx) {
        if (this instanceof Character || this instanceof ThrowableObject) {
            // Draw frame only for instances of Character or ThrowableObject
            ctx.beginPath();
            ctx.lineWidth = '4';
            ctx.strokeStyle = 'blue';
            ctx.rect(this.x, this.y, this.width, this.height);
            ctx.stroke();
        }
    }

    /**
     * Draws a red collision detection box around the object.
     * @param {CanvasRenderingContext2D} ctx The 2D canvas context to draw on.
     */
    drawOffsetBoxes(ctx) {
        if (this instanceof Character || this instanceof Chicken || this instanceof Endboss || this instanceof Bottle || this instanceof SmallChicken) {
            // Draw offset box only for certain object instances
            ctx.beginPath();
            ctx.lineWidth = '3';
            ctx.strokeStyle = 'red';
            ctx.rect(this.x + this.offset.left, this.y + this.offset.bottom, this.width - this.offset.right, this.height - this.offset.bottom);
            ctx.stroke();
        }
    }

    /**
     * Resolves the image index based on the current percentage for status bars.
     * @returns {number} The index of the image to be used based on the percentage.
     */
    resolveImageIndex() {
        if (this.percentage >= 100) return 5;
        if (this.percentage >= 80) return 4;
        if (this.percentage >= 60) return 3;
        if (this.percentage >= 40) return 2;
        if (this.percentage >= 20) return 1;
        return 0;
    }
}