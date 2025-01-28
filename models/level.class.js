class Level {
    bottles;
    enemies;
    clouds;
    backgroundObject;
    coins;
    level_end_x = 2250;

    constructor(bottles, enemies, clouds, coins, backgroundObject) {
        this.enemies = enemies;
        this.clouds = clouds;
        this.coins = coins;
        this.bottles = bottles;
        this.backgroundObject = backgroundObject;
    }
}