class SmallChicken extends MovableObject {

    y = 370;
    height = 50;
    width = 45;
    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/3_w.png',
    ];
    currentImage = 0;
    offset = {
        top: 100,
        bottom: 0,
        right: 0,
        left: 0,
    }

    constructor() {
        super().loadImage('img/3_enemies_chicken/chicken_small/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING);

        this.x = 400 + Math.random() * 1500; //spawnt die chicken zwischen 400 und 1500
        this.speed = 0.15 + Math.random() * 0.75;

        this.animate();
    }

    animate() {
        setInterval(() => {
            this.moveLeft();
        }, 1000 / 60);


        setInterval(() => {
            this.playAnimation(this.IMAGES_WALKING);
        }, 175);
    }
}