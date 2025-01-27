class Coin extends MovableObject {
    y = 320;
    width = 120;
    height = 120;
    IMAGES = [
        'img/8_coin/coin_1.png',
        'img/8_coin/coin_2.png'
    ];

    constructor() {
        super().loadImage('img/8_coin/coin_1.png');
        this.loadImages(this.IMAGES);
        this.x = 400 + Math.random() * 1800;
        this.y = 100 + Math.random() * 150;
    }

    animate() {
        setInterval(() => {
            this.coinCollected();
        }, 100);
        setInterval(() => {
            this.coinAnnimation();
        }, 500);
    }

}