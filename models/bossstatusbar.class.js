class BossStatusBar extends DrawableObject {
    IMAGES_BOSS = [
        'img/7_statusbars/2_statusbar_endboss/orange/orange0.png',
        'img/7_statusbars/2_statusbar_endboss/orange/orange20.png',
        'img/7_statusbars/2_statusbar_endboss/orange/orange40.png',
        'img/7_statusbars/2_statusbar_endboss/orange/orange60.png',
        'img/7_statusbars/2_statusbar_endboss/orange/orange80.png',
        'img/7_statusbars/2_statusbar_endboss/orange/orange100.png',
    ];

    percentage = 100

    constructor() {
        super();
        this.loadImages(this.IMAGES_BOSS);
        this.x = 450;
        this.y = 5;
        this.width = 250;
        this.height = 70;
        this.setPercentage(100);
    }

    setPercentage(percentage) {
        this.percentage = percentage;
        let index = this.resolveImageIndex();
        let path = this.IMAGES_BOSS[index];
        this.img = this.imageCache[path];
    }

}