class Bottle extends MovableObject {
    width = 80;
    height = 80;
    

    constructor() {
        super().loadImage('img/6_salsa_bottle/2_salsa_bottle_on_ground.png');
        this.x = 400 + Math.random() * 1500;
        this.y = 350;
    }
}