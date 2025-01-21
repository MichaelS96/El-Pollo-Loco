class Cloud extends MovableObject {
    y = 25;
    height = 250;
    width = 450;

    constructor() {
        super().loadImage('img/5_background/layers/4_clouds/1.png');
        this.x = Math.random() * 500;
        this.animation();
    }

    animation() {
        setInterval(() => {
            this.x -= 0.25;
        }, 1000 / 60);
    }
}