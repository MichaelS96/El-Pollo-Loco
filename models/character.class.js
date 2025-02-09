/**
 * Represents a character in the game. The character can perform various actions like standing, 
 * walking, jumping, getting hurt, and dying. The character's animation and movement are handled
 * based on user input and in-game events.
 * 
 * @class
 * @extends MovableObject
 */
class Character extends MovableObject {
    /**
     * @type {number}The y-coordinate for the character's position.
     * @type {number}The height of the character.
     * @type {number}The width of the character.
     * @type {number}The speed at which the character moves.
     * @type {number}The time the character has been standing without moving.
     * @type {Object}The world object to interact with the game world.
     * @type {Object}The offset values for collision detection.
    */
    y = 60;
    height = 280;
    width = 150;
    speed = 5;
    standingTime = 0;
    world;
    offset = {
        top: 100,
        bottom: 100,
        right: 40,
        left: 20,
    };

    /** 
     * Array of image paths representing the character standing in idle position.
     * @type {string[]}
     */
    IMAGES_STANDING = [
        'img/2_character_pepe/1_idle/idle/I-1.png',
        'img/2_character_pepe/1_idle/idle/I-2.png',
        'img/2_character_pepe/1_idle/idle/I-3.png',
        'img/2_character_pepe/1_idle/idle/I-4.png',
        'img/2_character_pepe/1_idle/idle/I-5.png',
        'img/2_character_pepe/1_idle/idle/I-6.png',
        'img/2_character_pepe/1_idle/idle/I-7.png',
        'img/2_character_pepe/1_idle/idle/I-8.png',
        'img/2_character_pepe/1_idle/idle/I-9.png',
        'img/2_character_pepe/1_idle/idle/I-10.png',
    ];

    /** 
     * Array of image paths representing the character sleeping in idle position.
     * @type {string[]}
     */
    IMAGES_SLEEPING = [
        'img/2_character_pepe/1_idle/long_idle/I-11.png',
        'img/2_character_pepe/1_idle/long_idle/I-12.png',
        'img/2_character_pepe/1_idle/long_idle/I-13.png',
        'img/2_character_pepe/1_idle/long_idle/I-14.png',
        'img/2_character_pepe/1_idle/long_idle/I-15.png',
        'img/2_character_pepe/1_idle/long_idle/I-16.png',
        'img/2_character_pepe/1_idle/long_idle/I-17.png',
        'img/2_character_pepe/1_idle/long_idle/I-18.png',
        'img/2_character_pepe/1_idle/long_idle/I-19.png',
        'img/2_character_pepe/1_idle/long_idle/I-20.png',
    ];

    /** 
     * Array of image paths representing the character walking.
     * @type {string[]}
     */
    IMAGES_WALKING = [
        'img/2_character_pepe/2_walk/W-21.png',
        'img/2_character_pepe/2_walk/W-22.png',
        'img/2_character_pepe/2_walk/W-23.png',
        'img/2_character_pepe/2_walk/W-24.png',
        'img/2_character_pepe/2_walk/W-25.png',
        'img/2_character_pepe/2_walk/W-26.png',
    ];

    /** 
     * Array of image paths representing the character jumping.
     * @type {string[]}
     */
    IMAGES_JUMPING = [
        'img/2_character_pepe/3_jump/J-31.png',
        'img/2_character_pepe/3_jump/J-32.png',
        'img/2_character_pepe/3_jump/J-33.png',
        'img/2_character_pepe/3_jump/J-34.png',
        'img/2_character_pepe/3_jump/J-35.png',
        'img/2_character_pepe/3_jump/J-36.png',
        'img/2_character_pepe/3_jump/J-37.png',
        'img/2_character_pepe/3_jump/J-38.png',
        'img/2_character_pepe/3_jump/J-39.png',
    ];

    /** 
     * Array of image paths representing the character hurt.
     * @type {string[]}
     */
    IMAGES_HURT = [
        'img/2_character_pepe/4_hurt/H-41.png',
        'img/2_character_pepe/4_hurt/H-42.png',
        'img/2_character_pepe/4_hurt/H-43.png',
    ];

    /** 
     * Array of image paths representing the character dead.
     * @type {string[]}
     */
    IMAGES_DEAD = [
        'img/2_character_pepe/5_dead/D-51.png',
        'img/2_character_pepe/5_dead/D-52.png',
        'img/2_character_pepe/5_dead/D-53.png',
        'img/2_character_pepe/5_dead/D-54.png',
        'img/2_character_pepe/5_dead/D-55.png',
        'img/2_character_pepe/5_dead/D-56.png',
        'img/2_character_pepe/5_dead/D-57.png',
    ];

    /**
     * Creates an instance of the Character class.
     * Initializes the character with default images, sounds, and movement behaviors.
     */
    constructor() {
        super().loadImage('img/2_character_pepe/1_idle/idle/I-1.png');
        this.loadImages(this.IMAGES_STANDING);
        this.loadImages(this.IMAGES_SLEEPING);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_HURT);
        this.applyGravity();
        this.animate();
        this.animate2();

        /** 
         * The sound played when the character jumps.
         * @type {HTMLAudioElement}
         */
        this.jumpSound = new Audio('audio/jump.mp3');
        soundManager.addSoundWithVolume(this.jumpSound, 0.2);

        /** 
         * The sound played when the character gets hurt.
         * @type {HTMLAudioElement}
         */
        this.hurtSound = new Audio('audio/hurt.mp3');
        soundManager.addSoundWithVolume(this.hurtSound, 0.05);

        /** 
         * The sound played when the character is walking.
         * @type {HTMLAudioElement}
         */
        this.walkingSound = new Audio('audio/sand_walking.mp3');
        soundManager.addSoundWithVolume(this.walkingSound, 0.05);
    }

    /**
     * Animates the character based on user input and in-game actions.
     * Handles character movement and switching between different animations.
     */
    animate() {
        setInterval(() => {
            if (gameRunning) {
                this.characterMoving();
            }
        }, 1000 / 60);
    }

    animate2() {
        setInterval(() => {
            if (gameRunning) {
                this.characterAnimation();
            }
        }, 100);
    }

    /**
     * Moves the character based on keyboard input and the current game state.
     */
    characterMoving() {
        if (!gameRunning) return;
        this.walkingSound.pause();
        if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
            this.moveRight();
            this.otherDirection = false;
        } else if (this.world.keyboard.LEFT && this.x > 0) {
            this.moveLeft();
            this.otherDirection = true;
        }
        if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
            this.walkingSound.play();
            this.standingTime = 0;
        }
        if (this.world.keyboard.UP && !this.isAboveGround()) {
            this.jump();
            this.standingTime = 0;
            this.jumpSound.play();
        }
        this.world.camera_x = -this.x + 120;
    }

    /**
     * Handles the character's animation based on the current state (dead, hurt, jumping, walking, standing).
     */
    characterAnimation() {
        if (this.isDeadAnimation()) return;
        if (this.isHurtAnimation()) return;
        if (this.isJumpingAnimation()) return;
        if (this.isWalkingAnimation()) return;
        this.handleIdleAnimation();
    }

    /**
     * Plays the death animation and triggers the game over screen.
     * @returns {boolean} - Returns true if the character is dead.
     */
    isDeadAnimation() {
        if (this.isDead()) {
            this.playAnimation(this.IMAGES_DEAD);
            this.showGameOverScreen();
            return true;
        }
        return false;
    }

    /**
     * Plays the hurt animation when the character takes damage.
     * @returns {boolean} - Returns true if the character is hurt.
     */
    isHurtAnimation() {
        if (this.itHurt()) {
            this.playAnimation(this.IMAGES_HURT);
            this.hurtSound.play();
            return true;
        }
        return false;
    }

    /**
     * Plays the jumping animation if the character is above the ground.
     * @returns {boolean} - Returns true if the character is in the air.
     */
    isJumpingAnimation() {
        if (this.isAboveGround()) {
            this.playAnimation(this.IMAGES_JUMPING);
            this.standingTime = 0;
            return true;
        }
        return false;
    }

    /**
     * Plays the walking animation if the character is moving left or right.
     * @returns {boolean} - Returns true if the character is walking.
     */
    isWalkingAnimation() {
        if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
            this.playAnimation(this.IMAGES_WALKING);
            this.standingTime = 0;
            return true;
        }
        return false;
    }

    /**
     * Handles the character's idle animation when standing still for a long time.
     */
    handleIdleAnimation() {
        this.standingTime += 300;

        if (this.standingTime >= 15000) {
            this.playAnimation(this.IMAGES_SLEEPING);
        } else {
            this.playAnimation(this.IMAGES_STANDING);
        }
    }

    /**
     * Checks if the character is dead.
     * @returns {boolean} - Returns true if the character's energy is less than or equal to 0.
     */
    isDead() {
        return this.energy <= 0;
    }

    /**
     * Makes the character jump by setting an initial speed for the Y-axis.
     */
    jump() {
        this.speedY = 33;
    }

    /**
     * Makes the character react when it hits an enemy by setting a bounce effect.
     */
    hitEnemy() {
        this.speedY = 20;
    }

    /**
     * Checks if the character is above the ground.
     * @returns {boolean} - Returns true if the character's y-coordinate is less than 140.
     */
    isAboveGround() {
        return this.y < 140;
    }

    /**
     * Displays the game over screen after the character dies.
     */
    showGameOverScreen() {
        setTimeout(() => {
            let gameOverScreen = document.getElementById("gameOverScreen");
            gameOverScreen.classList.remove("d-none");
            gameOverScreen.style.position = "absolute";
            gameRunning = false;
        }, 1000);
    }
}
