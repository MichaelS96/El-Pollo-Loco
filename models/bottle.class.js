class Bottle extends MovableObject {
    width = 80;
    height = 80;
    offset = {
        top: 40,
        bottom: 10,
        right: 40,
        left: 20,
    }

    IMAGES = [
        'img/6_salsa_bottle/1_salsa_bottle_on_ground.png',
        'img/6_salsa_bottle/2_salsa_bottle_on_ground.png',
    ];

    constructor() {
        super().loadImage('img/6_salsa_bottle/2_salsa_bottle_on_ground.png');
        this.loadImages(this.IMAGES);
        this.x = 400 + Math.random() * 1500;
        this.y = 350;
        this.animate();
        this.bottleSound = new Audio('audio/bottle_collected.mp3')
        this.bottleSound.volume = 0.1;
    }

    animate() {
        setInterval(() => {
            this.playAnimation(this.IMAGES);
        }, 550);
    }

}