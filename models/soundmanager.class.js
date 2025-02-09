/**
 * Manages sound playback, muting, and queuing of sounds.
 */
class SoundManager {
    constructor() {
        /** @type {HTMLAudioElement[]} */
        this.sounds = [];
        /** @type {HTMLAudioElement[]} */
        this.soundQueue = [];
        /** @type {boolean} */
        this.isMuted = false;
        /** @type {HTMLAudioElement | null} */
        this.currentlyPlaying = null;

        const savedMuteStatus = localStorage.getItem('soundMuted');
        if (savedMuteStatus === 'true') {
            this.isMuted = true;
        }

        this.updateSoundsMuteStatus();
        this.updateSoundButton();
    }

    /**
     * Adds a sound to the sound manager.
     * @param {HTMLAudioElement} sound - The sound to add.
     */
    addSound(sound) {
        this.sounds.push(sound);
        this.updateSoundMuteStatus(sound);
    }

    /**
     * Adds a sound with a specific volume.
     * @param {HTMLAudioElement} sound - The sound to add.
     * @param {number} volume - The volume level (0 to 1).
     */
    addSoundWithVolume(sound, volume) {
        sound.originalVolume = volume;
        sound.volume = this.isMuted ? 0 : volume;
        this.sounds.push(sound);
        sound.load();
        this.updateSoundMuteStatus(sound);
    }

    /**
     * Plays a given sound if it is not muted or already queued.
     * @param {HTMLAudioElement} sound - The sound to play.
     */
    playSound(sound) {
        if (this.isMuted || this.soundQueue.includes(sound) || sound === this.currentlyPlaying) {
            return;
        }

        if (sound.readyState < 4) {
            sound.oncanplaythrough = () => this.playSound(sound);
            return;
        }

        this.soundQueue.push(sound);
        this.processQueue();
    }

    /**
     * Processes the sound queue and plays sounds sequentially.
     */
    processQueue() {
        if (this.soundQueue.length > 0 && !this.currentlyPlaying) {
            const sound = this.soundQueue.shift();
            this.currentlyPlaying = sound;

            sound.play().catch(error => {
                console.warn("Fehler beim Abspielen, versuche erneut:", error);
                setTimeout(() => {
                    sound.play().catch(err => console.error("Erneuter Fehler beim Abspielen:", err));
                }, 500);
            });

            sound.onended = () => {
                this.currentlyPlaying = null;
                this.processQueue();
            };
        }
    }

    /**
     * Updates the mute status of all sounds.
     */
    updateSoundsMuteStatus() {
        this.sounds.forEach(sound => {
            sound.volume = this.isMuted ? 0 : (sound.originalVolume || sound.volume);
        });
    }

    /**
     * Updates the mute status of a single sound.
     * @param {HTMLAudioElement} sound - The sound to update.
     */
    updateSoundMuteStatus(sound) {
        sound.volume = this.isMuted ? 0 : (sound.originalVolume || sound.volume);
    }

    /**
     * Mutes all sounds and saves the mute status in local storage.
     */
    muteAll() {
        this.isMuted = true;
        this.sounds.forEach(sound => {
            sound.volume = 0;
            sound.pause();
        });

        if (this.backgroundMusic) {
            this.backgroundMusic.pause();
        }

        this.soundQueue = [];
        this.currentlyPlaying = null;
        localStorage.setItem('soundMuted', 'true');
        this.updateSoundButton();
    }

    /**
     * Unmutes all sounds and restores their original volume.
     */
    unmuteAll() {
        this.isMuted = false;
        this.sounds.forEach(sound => {
            sound.volume = sound.originalVolume || sound.volume;
        });
        if (this.backgroundMusic) {
            this.backgroundMusic.play().catch(error => {
                console.error("Fehler beim Abspielen der Hintergrundmusik:", error);
            });
        }

        localStorage.setItem('soundMuted', 'false');
        this.updateSoundButton();
    }

    /**
     * Toggles the mute status.
     */
    toggleSound() {
        this.isMuted ? this.unmuteAll() : this.muteAll();
    }

    /**
     * Updates the sound button icon based on the mute status.
     */
    updateSoundButton() {
        const soundButton = document.getElementById("soundToggle");
        if (soundButton) {
            soundButton.src = this.isMuted ? "./img/icons/mute.png" : "./img/icons/sound.png";
        }
    }
}

/**
 * Global instance of SoundManager.
 * @type {SoundManager}
 */
const soundManager = new SoundManager();

/**
 * Toggles the sound mute status when called.
 */
window.toggleSound = () => soundManager.toggleSound();
