/**
 * The `Level` class represents a single level in the game.
 * It contains various game objects like bottles, enemies, coins, and background elements that are part of the level.
 * @class
 */
class Level {
    /**
     * @type {Array}The list of bottles in the level.
     * @type {Array}The list of enemies in the level.
     * @type {Endboss}The endboss in the level.
     * @type {Array}The list of clouds in the level.
     * @type {Array}The list of background objects in the level.
     * @type {Array}The list of coins in the level.
     * @type {number}The x-coordinate at which the level ends.
     * 
    */
    bottles;
    enemies;
    endboss;
    clouds;
    backgroundObject;
    coins;
    level_end_x = 2250;

    /**
    * Creates an instance of the Level class.
    * 
    * @param {Array} bottles - The list of bottles in the level.
    * @param {Array} enemies - The list of enemies in the level.
    * @param {Endboss} endboss - The endboss of the level.
    * @param {Array} clouds - The list of clouds in the level.
    * @param {Array} coins - The list of coins in the level.
    * @param {Array} backgroundObjects - The list of background objects in the level.
    */
    constructor(bottles, enemies, endboss, clouds, coins, backgroundObjects) {
        this.bottles = bottles;
        this.enemies = enemies;
        this.endboss = endboss;
        this.clouds = clouds;
        this.coins = coins;
        this.backgroundObjects = backgroundObjects;
    }
}