class Coin extends MovableObject {

    width = 120;
    height = 120;
    IMAGES = [
        'img/8_coin/coin_1.png',
        'img/8_coin/coin_2.png'
    ];
    offset = {
        top: 20,
        bottom: 20,
        right: 40,
        left: 20,
    }

    constructor(x, y) {
        super().loadImage('img/8_coin/coin_1.png');
        this.loadImages(this.IMAGES);
        this.x = x;
        this.y = y;
        this.animate();
        // this.x = 500 + Math.random() * 1800;
        // this.y = 50 + Math.random() * 150;
    }

    animate() {
        setInterval(() => {
            this.playAnimation(this.IMAGES);
        }, 250);
    }

}