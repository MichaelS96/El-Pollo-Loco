/**
 * The `SoundManager` class is responsible for managing sounds within the game, including adding sounds, adjusting volume, 
 * muting and unmuting, and updating the sound button UI.
 * @class
 */
class SoundManager {
    constructor() {
        this.sounds = [];
        this.isMuted = false;
    }

    /**
     * Adds a sound to the sound manager.
     * @param {Object} sound - The sound to add.
     */
    addSound(sound) {
        this.sounds.push(sound);
    }

    /**
     * Adds a sound to the sound manager with a specified volume.
     * @param {Object} sound - The sound to add.
     * @param {number} volume - The volume of the sound.
     */
    addSoundWithVolume(sound, volume) {
        sound.originalVolume = volume;
        sound.volume = volume;
        this.sounds.push(sound);
        sound.load();
    }

    /**
     * Mutes all sounds.
     */
    muteAll() {
        this.isMuted = true;
        this.sounds.forEach(sound => {
            sound.volume = 0;
        });
        if (this.backgroundMusic) this.backgroundMusic.pause();
        this.updateSoundButton();
    }

    /**
     * Unmutes all sounds.
     */
    unmuteAll() {
        this.isMuted = false;
        this.sounds.forEach(sound => {
            sound.volume = sound.originalVolume;
        });
        this.updateSoundButton();
    }

    /**
     * Toggles the sound state between muted and unmuted.
     */
    toggleSound() {
        this.isMuted ? this.unmuteAll() : this.muteAll();
    }

    /**
     * Updates the sound button icon based on the mute state.
     */
    updateSoundButton() {
        const soundButton = document.getElementById("soundToggle");
        if (this.isMuted) {
            soundButton.src = "./img/icons/mute.png";
        } else {
            soundButton.src = "./img/icons/sound.png";
        }
    }
}

const soundManager = new SoundManager();

window.toggleSound = () => soundManager.toggleSound();
