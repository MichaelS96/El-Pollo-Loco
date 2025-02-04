class SmallChicken extends MovableObject {
    y = 340;
    height = 80;
    width = 65;
    energy = 1;
    isDead = false;
    offset = {
        top: -30,
        bottom: 0,
        right: -20,
        left: -20,
    };

    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/3_w.png',
    ];
    IMAGES_DEAD = [
        'img/3_enemies_chicken/chicken_small/2_dead/dead.png'
    ];

    constructor() {
        super().loadImage('img/3_enemies_chicken/chicken_small/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_DEAD);
        this.x = 400 + Math.random() * 1500;
        this.speed = 0.15 + Math.random() * 0.75;
        this.animate();
        this.deathSound = new Audio('audio/chicken_death.mp3');
        this.deathSound.volume = 0.2;
    }

    animate() {
        setInterval(() => {
            if (!this.isDead) {
                this.moveLeft();
            }
        }, 1000 / 60);

        setInterval(() => {
            if (!this.isDead) {
                this.playAnimation(this.IMAGES_WALKING);
            } else {
                this.playAnimation(this.IMAGES_DEAD);
            }
        }, 175);
    }

    hit() {
        this.energy -= 1;
        if (this.energy <= 0) {
            this.energy = 0;
            this.die();
        }
    }

    die() {
        this.isDead = true;
        this.speed = 0;
        this.playAnimation(this.IMAGES_DEAD);
        this.deathSound.play();
        setTimeout(() => {
            this.removeFromWorld();
        }, 500);
    }

    removeFromWorld() {
        const index = world.level.enemies.indexOf(this);
        if (index !== -1) {
            world.level.enemies.splice(index, 1);
        }
    }
}
