/**
 * Represents a coin in the game that animates and plays a sound when collected.
 * The coin has a position, size, and a simple animation for its visual representation.
 * 
 * @class
 * @extends MovableObject
 */
class Coin extends MovableObject {
    /**
     * @type {number}The width of the coin.
     * @type {number}The height of the coin.
     * @type {Object}The offset values for collision detection of the coin.
    */
    width = 120;
    height = 120;
    offset = {
        top: 20,
        bottom: 20,
        right: 40,
        left: 20,
    };

    /**
     * Array of image paths representing the coin's animation.
     * @type {string[]}
     */
    IMAGES = [
        'img/8_coin/coin_1.png',
        'img/8_coin/coin_2.png'
    ];

    /**
     * Creates an instance of the Coin class.
     * Initializes the coin's position, animation, and sound.
     * 
     * @param {number} x The x-coordinate of the coin.
     * @param {number} y The y-coordinate of the coin.
     */
    constructor(x, y) {
        super().loadImage('img/8_coin/coin_1.png');
        this.loadImages(this.IMAGES);
        this.x = x;
        this.y = y;
        this.animate();
        this.coinSound = new Audio('audio/coin_collected.mp3');
        soundManager.addSoundWithVolume(this.coinSound, 0.2);
    }

    /**
     * Animates the coin by cycling through its images.
     */
    animate() {
        setInterval(() => {
            this.playAnimation(this.IMAGES);
        }, 250);
    }
}