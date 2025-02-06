/**
 * Represents the health status bar for the player in the game. Displays the player's health percentage and updates its appearance based on the current health.
 * 
 * @class
 * @extends DrawableObject
 */
class HealthStatusBar extends DrawableObject {
    /**
     * The percentage of the player's health.
     * @type {number}
     */
    percentage = 100;

    /**
     * The images for different stages of the player's health.
     * @type {Array<string>}
     */
    IMAGES_HEALTH = [
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/0.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/20.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/40.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/60.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/80.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/100.png',
    ];

    /**
     * Creates an instance of the HealthStatusBar.
     * Initializes the status bar's position, size, and starting health.
     */
    constructor() {
        super();
        this.loadImages(this.IMAGES_HEALTH);
        this.x = 20;
        this.y = 0;
        this.width = 200;
        this.height = 50;
        this.setPercentage(100);
    }

    /**
     * Sets the player's health percentage and updates the displayed image.
     * @param {number} percentage - The new health percentage of the player.
     */
    setPercentage(percentage) {
        this.percentage = percentage;
        let index = this.resolveImageIndex();
        let path = this.IMAGES_HEALTH[index];
        this.img = this.imageCache[path];
    }
}
