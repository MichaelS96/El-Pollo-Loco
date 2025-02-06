/**
 * Represents the Endboss in the game. The Endboss has different animations, health, and behaviors depending on the state.
 * 
 * @class
 * @extends MovableObject
 */
class Endboss extends MovableObject {
    /**
     * @type {number} The height of the Endboss.
     * @type {number} The width of the Endboss.
     * @type {number} The y-coordinate for the Endboss's position.
     * @type {boolean} A flag indicating if the Endboss has had its first contact with the player.
     * @type {number} The current animation frame of the Endboss.
     * @type {number}The current energy of the Endboss.
     * @type {Object}The offset values for collision detection of the Endboss.
    */
    height = 400;
    width = 250;
    y = 50;
    hasFirstContact = false;
    currentAnimationFrame = 0;
    energy = 100;
    offset = {
        top: 0,
        left: 0,
        right: 0,
        bottom: 50
    };

    /**
     * The images for different Endboss animations (alert, walk, attack, hurt, dead).
     * @type {Array<string>}
     */
    IMAGES_ALERT = [
        'img/4_enemie_boss_chicken/2_alert/G5.png',
        'img/4_enemie_boss_chicken/2_alert/G6.png',
        'img/4_enemie_boss_chicken/2_alert/G7.png',
        'img/4_enemie_boss_chicken/2_alert/G8.png',
        'img/4_enemie_boss_chicken/2_alert/G9.png',
        'img/4_enemie_boss_chicken/2_alert/G10.png',
        'img/4_enemie_boss_chicken/2_alert/G11.png',
        'img/4_enemie_boss_chicken/2_alert/G12.png',
    ];

    IMAGES_WALK = [
        'img/4_enemie_boss_chicken/1_walk/G1.png',
        'img/4_enemie_boss_chicken/1_walk/G2.png',
        'img/4_enemie_boss_chicken/1_walk/G3.png',
        'img/4_enemie_boss_chicken/1_walk/G4.png',
    ];

    IMAGES_ATTACK = [
        'img/4_enemie_boss_chicken/3_attack/G13.png',
        'img/4_enemie_boss_chicken/3_attack/G14.png',
        'img/4_enemie_boss_chicken/3_attack/G15.png',
        'img/4_enemie_boss_chicken/3_attack/G16.png',
        'img/4_enemie_boss_chicken/3_attack/G17.png',
        'img/4_enemie_boss_chicken/3_attack/G18.png',
        'img/4_enemie_boss_chicken/3_attack/G19.png',
        'img/4_enemie_boss_chicken/3_attack/G20.png',
    ];

    IMAGES_HURT = [
        'img/4_enemie_boss_chicken/4_hurt/G21.png',
        'img/4_enemie_boss_chicken/4_hurt/G22.png',
        'img/4_enemie_boss_chicken/4_hurt/G23.png',
    ];

    IMAGES_DEAD = [
        'img/4_enemie_boss_chicken/5_dead/G24.png',
        'img/4_enemie_boss_chicken/5_dead/G25.png',
        'img/4_enemie_boss_chicken/5_dead/G26.png',
    ];

    /**
     * Creates an instance of the Endboss.
     * Initializes the Endboss's position, animations, and sound effects.
     */
    constructor() {
        super().loadImage('img/4_enemie_boss_chicken/2_alert/G5.png');
        this.loadImages(this.IMAGES_ALERT);
        this.loadImages(this.IMAGES_WALK);
        this.loadImages(this.IMAGES_ATTACK);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
        this.x = 2275;
        this.animate();
        this.damageSound = new Audio('audio/endboss_dmg.mp3');
        soundManager.addSoundWithVolume(this.damageSound, 0.1);
    }

    /**
     * Starts the animations and behavior of the Endboss.
     * Loops through the animations based on the Endboss's current state.
     */
    animate() {
        setInterval(() => {
            this.playBossAnimation();
        }, 200);
        setInterval(() => {
            if (this.hasFirstContact && this.currentAnimationFrame > 30 && !this.isDead() && !this.itHurt()) {
                this.moveLeft();
            }
        }, 1000 / 120);
        setInterval(() => {
            if (this.itHurt()) {
                this.playDamageSound();
            }
        }, 100);
    }

    /**
     * Plays the appropriate animation for the Endboss depending on its state.
     */
    playBossAnimation() {
        if (this.isDead()) {
            this.playDeadAnimation();
            this.showGameWinScreen(); // Display the game win screen
        } else if (this.itHurt()) {
            this.playHurtAnimation();
        } else if (this.currentAnimationFrame < 15) {
            this.playAlertAnimation();
            this.currentAnimationFrame += 4;
        } else if (this.currentAnimationFrame < 30) {
            this.playAttackAnimation();
        } else {
            this.playWalkAnimation();
        }
        this.checkFirstContact();
        this.currentAnimationFrame++;
    }

    /**
     * Plays the hurt animation of the Endboss.
     */
    playHurtAnimation() {
        this.playAnimation(this.IMAGES_HURT);
    }

    /**
     * Plays the alert animation of the Endboss.
     */
    playAlertAnimation() {
        this.playAnimation(this.IMAGES_ALERT);
    }

    /**
     * Plays the attack animation of the Endboss.
     */
    playAttackAnimation() {
        this.playAnimation(this.IMAGES_ATTACK);
    }

    /**
     * Plays the walk animation of the Endboss.
     */
    playWalkAnimation() {
        this.playAnimation(this.IMAGES_WALK);
    }

    /**
     * Plays the dead animation of the Endboss.
     */
    playDeadAnimation() {
        this.playAnimation(this.IMAGES_DEAD);
    }

    /**
     * Plays the damage sound when the Endboss is hurt.
     */
    playDamageSound() {
        if (this.damageSound) {
            this.damageSound.play();
        }
    }

    /**
     * Checks if the Endboss has first contact with the player.
     */
    checkFirstContact() {
        if (world.character.x > 1700 && !this.hasFirstContact) {
            console.log("First Contact with Endboss");
            this.currentAnimationFrame = 0;
            this.hasFirstContact = true;
            world.bossStatusBar.isVisible = true;
        }
    }

    /**
     * Moves the Endboss to the left.
     */
    moveLeft() {
        this.x -= 1.5;
    }

    /**
     * Handles the Endboss being hit and reduces its energy.
     */
    hit() {
        this.energy -= 20;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
        world.bossStatusBar.setPercentage(this.energy);
        this.playDamageSound();
    }

    /**
     * Displays the game win screen once the Endboss is dead.
     */
    showGameWinScreen() {
        setTimeout(() => {
            let gameWinScreen = document.getElementById("gameWinScreen");
            gameWinScreen.classList.remove("d-none");
            gameWinScreen.style.position = "absolute";
            gameRunning = false;
        }, 1000);
    }
}
