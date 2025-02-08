/**
 * The SoundManager class is responsible for managing sounds within the game, including adding sounds, adjusting volume, 
 * muting and unmuting, and updating the sound button UI. It also persists the mute state across page reloads using localStorage.
 * @class
 */
class SoundManager {
    /**
     * Creates an instance of the SoundManager.
     * Initializes the sound state based on the saved mute status from localStorage.
     */
    constructor() {
        this.sounds = [];
        this.isMuted = false;

        const savedMuteStatus = localStorage.getItem('soundMuted');
        if (savedMuteStatus === 'true') {
            this.isMuted = true;
        }

        this.updateSoundsMuteStatus();
        this.updateSoundButton();
    }

    /**
     * Adds a sound to the sound manager.
     * @param {Object} sound - The sound object to add. The object should have a volume and originalVolume property.
     */
    addSound(sound) {
        this.sounds.push(sound);
        this.updateSoundMuteStatus(sound);
    }

    /**
     * Adds a sound to the sound manager with a specified volume. 
     * Adjusts the volume according to the mute state.
     * @param {Object} sound - The sound object to add.
     * @param {number} volume - The volume of the sound.
     */
    addSoundWithVolume(sound, volume) {
        sound.originalVolume = volume;
        sound.volume = this.isMuted ? 0 : volume; 
        this.sounds.push(sound);
        sound.load();
        this.updateSoundMuteStatus(sound);
    }

    /**
     * Updates the mute status for all sounds based on the current mute state.
     */
    updateSoundsMuteStatus() {
        this.sounds.forEach(sound => {
            if (this.isMuted) {
                sound.volume = 0;
            } else {
                sound.volume = sound.originalVolume || sound.volume;
            }
        });
    }

    /**
     * Updates the mute status for a specific sound based on the current mute state.
     * @param {Object} sound - The sound object to update.
     */
    updateSoundMuteStatus(sound) {
        if (this.isMuted) {
            sound.volume = 0;
        } else {
            sound.volume = sound.originalVolume || sound.volume;
        }
    }

    /**
     * Mutes all sounds and updates the mute status in localStorage.
     */
    muteAll() {
        this.isMuted = true;
        this.sounds.forEach(sound => {
            sound.volume = 0;
            sound.pause(); 
        });
        if (this.backgroundMusic) this.backgroundMusic.pause();
        localStorage.setItem('soundMuted', 'true');

        this.updateSoundButton();
    }

    /**
     * Unmutes all sounds and updates the mute status in localStorage.
     */
    unmuteAll() {
        this.isMuted = false;
        this.sounds.forEach(sound => {
            sound.volume = sound.originalVolume || sound.volume;
            if (sound.paused) {
                sound.play(); 
            }
        });
        localStorage.setItem('soundMuted', 'false');

        this.updateSoundButton();
    }

    /**
     * Toggles the sound state between muted and unmuted.
     * Updates the mute status for all sounds and changes the sound button icon.
     */
    toggleSound() {
        if (this.isMuted) {
            this.unmuteAll();
        } else {
            this.muteAll();
        }
    }

    /**
     * Updates the sound button icon based on the mute state.
     * Changes the button icon to "mute" when muted and "sound" when unmuted.
     */
    updateSoundButton() {
        const soundButton = document.getElementById("soundToggle");
        if (soundButton) {  
            if (this.isMuted) {
                soundButton.src = "./img/icons/mute.png"; 
            } else {
                soundButton.src = "./img/icons/sound.png"; 
            }
        }
    }
}
const soundManager = new SoundManager();

window.toggleSound = () => soundManager.toggleSound();
