class SoundManager {
    constructor() {
        this.sounds = [];
        this.isMuted = false;
    }

    addSound(sound) {
        this.sounds.push(sound);
    }

    addSoundWithVolume(sound, volume) {
        sound.originalVolume = volume;
        sound.volume = volume;
        this.sounds.push(sound);
        sound.load();
    }

    muteAll() {
        this.isMuted = true;
        this.sounds.forEach(sound => {
            sound.volume = 0;
        });
        this.updateSoundButton();
        console.log("Alle Sounds wurden stummgeschaltet");
    }

    unmuteAll() {
        this.isMuted = false;
        this.sounds.forEach(sound => {
            sound.volume = sound.originalVolume;
        });
        this.updateSoundButton();
        console.log("Alle Sounds wurden wieder aktiviert");
    }

    toggleSound() {
        this.isMuted ? this.unmuteAll() : this.muteAll();
    }

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
