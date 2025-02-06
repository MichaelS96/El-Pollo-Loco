/**
 * Represents a Bottle object in the game. The bottle can be animated with two images 
 * and plays a sound when collected. It extends from the MovableObject class.
 * @class
 * @extends MovableObject
 */
class Bottle extends MovableObject {
    width = 80;
    height = 80;
    offset = {
        top: 40,
        bottom: 10,
        right: 40,
        left: 20,
    };
    
    IMAGES = [
        'img/6_salsa_bottle/1_salsa_bottle_on_ground.png',
        'img/6_salsa_bottle/2_salsa_bottle_on_ground.png',
    ];

    /**
     * Creates an instance of the Bottle class.
     * 
     * @param {number} x - The x-coordinate for the bottle's position.
     * @param {number} y - The y-coordinate for the bottle's position.
     */
    constructor(x, y) {
        super().loadImage('img/6_salsa_bottle/2_salsa_bottle_on_ground.png');
        this.loadImages(this.IMAGES);
        this.x = x;
        this.y = y;
        this.animate();
        
        /**
         * The sound that is played when the bottle is collected.
         */
        this.bottleSound = new Audio('audio/bottle_collected.mp3');
        soundManager.addSoundWithVolume(this.bottleSound, 0.05); 
    }

    /**
     * Starts the bottle's animation by periodically changing the image.
     * The images alternate every 550 milliseconds.
     */
    animate() {
        setInterval(() => {
            this.playAnimation(this.IMAGES);
        }, 550);
    }
}
