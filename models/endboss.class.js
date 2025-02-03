class Endboss extends MovableObject {
    height = 400;
    width = 250;
    y = 50;
    hasFirstContact = false;
    currentAnimationFrame = 0;
    energy = 100;
    damageSound = new Audio('audio/endboss_dmg.mp3');
    offset = {
        top: 0,
        left: 0,
        right: 0,
        bottom: 50
    }

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

    constructor() {
        super().loadImage('img/4_enemie_boss_chicken/2_alert/G5.png');
        this.loadImages(this.IMAGES_ALERT);
        this.loadImages(this.IMAGES_WALK);
        this.loadImages(this.IMAGES_ATTACK);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
        this.x = 2275;
        this.animate();
        this.damageSound.volume = 0.1;
    }

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

    playBossAnimation() {
        if (this.isDead()) {
            this.playDeadAnimation();
        } else if (this.itHurt()) {
            this.playHurtAnimation();
        } else if (this.currentAnimationFrame < 15) {
            this.playAlertAnimation();
        } else if (this.currentAnimationFrame < 30) {
            this.playAttackAnimation();
        } else {
            this.playWalkAnimation();
        }
        this.checkFirstContact();
        this.currentAnimationFrame++;
    }

    playHurtAnimation() {
        this.playAnimation(this.IMAGES_HURT);
    }

    playAlertAnimation() {
        this.playAnimation(this.IMAGES_ALERT);
    }

    playAttackAnimation() {
        this.playAnimation(this.IMAGES_ATTACK);
    }

    playWalkAnimation() {
        this.playAnimation(this.IMAGES_WALK);
    }

    playDeadAnimation() {
        this.playAnimation(this.IMAGES_DEAD);
    }

    playDamageSound() {
        if (this.damageSound) {
            this.damageSound.play();
        }
    }

    checkFirstContact() {
        if (world.character.x > 1700 && !this.hasFirstContact) {
            console.log("First Contact with Endboss");
            this.currentAnimationFrame = 0;
            this.hasFirstContact = true;
            world.bossStatusBar.isVisible = true;
        }
    }

    moveLeft() {
        this.x -= 1.5;
    }

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
}