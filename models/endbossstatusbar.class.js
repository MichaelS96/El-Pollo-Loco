/**
 * Represents the status bar for the Endboss in the game. Displays the Endboss's health percentage and updates its appearance based on the current health.
 * 
 * @class
 * @extends DrawableObject
 */
class BossStatusBar extends DrawableObject {
    /**
     * @type {number}The percentage of the Endboss's health.
     * @type {boolean}A flag indicating whether the status bar is visible or not.
    */
    percentage = 100;
    isVisible = false;

    /**
     * The images for different stages of the Endboss's health.
     * @type {Array<string>}
     */
    IMAGES_BOSS = [
        'img/7_statusbars/2_statusbar_endboss/orange/orange0.png',
        'img/7_statusbars/2_statusbar_endboss/orange/orange20.png',
        'img/7_statusbars/2_statusbar_endboss/orange/orange40.png',
        'img/7_statusbars/2_statusbar_endboss/orange/orange60.png',
        'img/7_statusbars/2_statusbar_endboss/orange/orange80.png',
        'img/7_statusbars/2_statusbar_endboss/orange/orange100.png',
    ];

    /**
     * Creates an instance of the BossStatusBar.
     * Initializes the status bar's position, size, and starting health.
     */
    constructor() {
        super();
        this.loadImages(this.IMAGES_BOSS);
        this.x = 450;
        this.y = 30;
        this.width = 250;
        this.height = 70;
        this.setPercentage(100); 
    }

    /**
     * Sets the Endboss's health percentage and updates the displayed image.
     * @param {number} percentage - The new health percentage of the Endboss.
     */
    setPercentage(percentage) {
        this.percentage = percentage;
        let index = this.resolveImageIndex();
        let path = this.IMAGES_BOSS[index];
        this.img = this.imageCache[path];
    }

    /**
     * Resolves the image index based on the current health percentage.
     * @returns {number} - The index of the corresponding image based on the current health.
     */
    resolveImageIndex() {
        if (this.percentage == 100) {
            return 5;
        } else if (this.percentage >= 80) {
            return 4; 
        } else if (this.percentage >= 60) {
            return 3; 
        } else if (this.percentage >= 40) {
            return 2;
        } else if (this.percentage >= 20) {
            return 1; 
        } else {
            return 0; 
        }
    }

    /**
     * Renders the status bar if it is visible.
     */
    render() {
        if (this.isVisible) {
            super.render(); 
        }
    }
}
