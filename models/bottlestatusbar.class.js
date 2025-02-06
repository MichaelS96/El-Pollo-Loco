/**
 * Represents a status bar for displaying the bottle's percentage in the game.
 * It extends from the DrawableObject class and displays different images based on the percentage.
 * 
 * @class
 * @extends DrawableObject
 */
class BottleStatusBar extends DrawableObject {
    percentage = 0;

    /**
     * Array of image paths representing the different states of the bottle status bar.
     * The images show the progress from 0% to 100%.
     * 
     * @type {string[]}
     */
    IMAGES_BOTTLE = [
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/0.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/20.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/40.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/60.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/80.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/100.png',
    ];

    /**
     * Creates an instance of the BottleStatusBar class.
     * Initializes the status bar's position, dimensions, and image loading.
     * Sets the initial percentage to 0.
     */
    constructor() {
        super();
        this.loadImages(this.IMAGES_BOTTLE);
        this.x = 20;
        this.y = 80;
        this.width = 200;
        this.height = 50;
        this.setPercentage(0); // Sets the initial percentage to 0
    }

    /**
     * Sets the percentage for the bottle status bar and updates the displayed image accordingly.
     * 
     * @param {number} percentage - The new percentage value for the status bar (between 0 and 100).
     */
    setPercentage(percentage) {
        this.percentage = percentage;
        let index = this.resolveImageIndex();
        let path = this.IMAGES_BOTTLE[index];
        this.img = this.imageCache[path];
    }

    /**
     * Resolves the appropriate image index based on the current percentage.
     * 
     * @returns {number} - The index corresponding to the current percentage.
     */
    resolveImageIndex() {
        if (this.percentage >= 100) return 5;
        if (this.percentage >= 80) return 4;
        if (this.percentage >= 60) return 3;
        if (this.percentage >= 40) return 2;
        if (this.percentage >= 20) return 1;
        return 0; // If less than 20%
    }
}
