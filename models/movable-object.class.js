class MovableObject extends DrawableObject {
    speed = 0.25;
    otherDirection = false;
    speedY = 0;
    acceleration = 2.5;
    energy = 100;
    lastHit = 0;
    offset = {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
    }


    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 25);
    }

    isAboveGround() {
        if (this instanceof ThrowableObject) {
            return this.y <= 325;
        }
        else {
            return this.y <= 140;
        }

    }

    //charakter.isColliding(chicken);
    isColliding(mo) {
        if (this instanceof Character) {
            return this.x + 60 + this.width - 105 > mo.x &&
                this.y + this.height > mo.y &&
                this.x + 60 < mo.x + mo.width &&
                this.y + 130 < mo.y + mo.height;
        }
        else {
            return this.x + this.width > mo.x &&
                this.y + this.height > mo.y &&
                this.x < mo.x + mo.width &&
                this.y < mo.y + mo.height;
        }
    }

    hit() {
        this.energy -= 5;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    itHurt() {
        let timepassed = new Date().getTime() - this.lastHit; //diference in ms 
        timepassed = timepassed / 1000;
        return timepassed < 0.75;
    }

    isDead() {
        return this.energy == 0;
    }

    playAnimation(images) {
        let index = this.currentImage % images.length;
        let path = images[index];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    moveRight() {
        this.x += this.speed;
    }

    moveLeft() {
        this.x -= this.speed;
    }

    jump() {
        this.speedY = 25;
    }

    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }
}
