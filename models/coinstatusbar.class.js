/**
 * The `CoinStatusBar` class represents the visual status bar displaying the amount of coins collected in the game.
 * It inherits from `DrawableObject` and handles the drawing of the coin collection status as a progress bar.
 * @class
 * @extends DrawableObject
*/
class CoinStatusBar extends DrawableObject {
    /**
     * @type {number}The percentage of collected coins.
    */
    percentage = 0;

    /**
     * Array of image paths representing different stages of the coin status bar.
     * @type {string[]}
     */
    IMAGES_COIN = [
        'img/7_statusbars/1_statusbar/1_statusbar_coin/orange/0.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/orange/20.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/orange/40.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/orange/60.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/orange/80.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/orange/100.png',
    ];

    /**
     * Creates an instance of the CoinStatusBar class.
     * Initializes the coin status bar's position, size, and sets the initial percentage to 0.
     */
    constructor() {
        super();
        this.loadImages(this.IMAGES_COIN);
        this.x = 20;
        this.y = 40;
        this.width = 200;
        this.height = 50;
        this.setPercentage(0);
    }

    /**
     * Sets the percentage of the coin status bar and updates the displayed image.
     * 
     * @param {number} percentage The percentage to set for the coin status bar (from 0 to 100).
     */
    setPercentage(percentage) {
        this.percentage = percentage;
        console.log('Coins Percentage:', this.percentage); // Debugging-Ausgabe
        let index = this.resolveImageIndex();
        let path = this.IMAGES_COIN[index];
        this.img = this.imageCache[path];
    }
    
    
}