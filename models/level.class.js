class Level {
    enemies;
    clouds;
    backgroundObject;
    coins;
    level_end_x = 2250;

    constructor(enemies, clouds, coins, backgroundObject) {
        this.enemies = enemies;
        this.clouds = clouds;
        this.coins = coins;
        this.backgroundObject = backgroundObject;
    }
}