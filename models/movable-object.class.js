class MovableObject {
    x = 120;
    y = 280;
    img;
    height = 150;
    width = 100;
    imageCache = {};
    speed = 0.25;
    otherDirection = false;
    currentImage = 0;
    speedY = 0;
    acceleration = 2.5;

    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 25);
    }

    isAboveGround() {
        return this.y < 140;
    }

    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }

draw(ctx){
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height)
}

drawFrame(ctx){
    ctx.beginPath();
    ctx.lineWidth = '5';
    ctx.strokeStyle = 'blue';
    ctx.rect(this.x, this.y, this.width, this.height);
    ctx.stroke();
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
}
