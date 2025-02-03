class Chicken extends MovableObject {
    y = 330;
    height = 100;
    width = 90;
    energy = 1;
    isDead = false; // Neue Variable, um den Zustand des Chickens zu speichern

    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png',
    ];
    IMAGES_DEAD = [
        'img/3_enemies_chicken/chicken_normal/2_dead/dead.png'
    ];

    currentImage = 0;
    offset = {
        top: -30,
        bottom: 0,
        right: 0,
        left: 0,
    };

    constructor() {
        super().loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_DEAD);

        this.x = 400 + Math.random() * 1500;
        this.speed = 0.15 + Math.random() * 0.75;

        this.animate();
    }

    animate() {
        setInterval(() => {
            if (!this.isDead) { // Nur bewegen, wenn das Chicken noch lebt
                this.moveLeft();
            }
        }, 1000 / 60);

        setInterval(() => {
            if (!this.isDead) { // Animation nur abspielen, wenn es lebt
                this.playAnimation(this.IMAGES_WALKING);
            } else {
                this.playAnimation(this.IMAGES_DEAD); // Totes Chicken anzeigen
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
        this.isDead = true; // Setzt das Chicken auf tot
        this.speed = 0; // Stoppt die Bewegung
        this.playAnimation(this.IMAGES_DEAD);
        
        setTimeout(() => {
            this.removeFromWorld(); // Entfernt das Chicken nach 500 ms
        }, 500);
    }

    removeFromWorld() {
        const index = world.level.enemies.indexOf(this);
        if (index !== -1) { // Sicherstellen, dass das Chicken existiert
            world.level.enemies.splice(index, 1);
        }
    }
}