class Level {
    bottles;
    enemies;
    endboss;
    clouds;
    backgroundObject;
    coins;
    level_end_x = 2250;

    constructor(bottles, enemies, endboss, clouds, coins, backgroundObject) {
        this.bottles = bottles;
        this.enemies = enemies;
        this.endboss = endboss;
        this.clouds = clouds;
        this.coins = coins;
        this.backgroundObject = backgroundObject;
    }
}