class SoundManager {
    constructor() {
        this.sounds = [];
        this.soundQueue = [];
        this.isMuted = false;

        const savedMuteStatus = localStorage.getItem('soundMuted');
        if (savedMuteStatus === 'true') {
            this.isMuted = true;
        }

        this.updateSoundsMuteStatus();
        this.updateSoundButton();
    }

    addSound(sound) {
        this.sounds.push(sound);
        this.updateSoundMuteStatus(sound);
    }

    addSoundWithVolume(sound, volume) {
        sound.originalVolume = volume;
        sound.volume = this.isMuted ? 0 : volume;
        this.sounds.push(sound);
        sound.load();
        this.updateSoundMuteStatus(sound);
    }

    playSound(sound) {
        if (!this.isMuted) {
            this.soundQueue.push(sound);
            this.processQueue();
        }
    }

    processQueue() {
        if (this.soundQueue.length > 0 && !this.currentlyPlaying) {
            const sound = this.soundQueue.shift();
            this.currentlyPlaying = sound;
            sound.play();
            sound.onended = () => {
                this.currentlyPlaying = null;
                this.processQueue();
            };
        }
    }

    updateSoundsMuteStatus() {
        this.sounds.forEach(sound => {
            if (this.isMuted) {
                sound.volume = 0;
            } else {
                sound.volume = sound.originalVolume || sound.volume;
            }
        });
    }

    updateSoundMuteStatus(sound) {
        if (this.isMuted) {
            sound.volume = 0;
        } else {
            sound.volume = sound.originalVolume || sound.volume;
        }
    }

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

    unmuteAll() {
        this.isMuted = false;
        this.sounds.forEach(sound => {
            sound.volume = sound.originalVolume || sound.volume;
        });
        localStorage.setItem('soundMuted', 'false');

        this.updateSoundButton();
    }

    toggleSound() {
        if (this.isMuted) {
            this.unmuteAll();
        } else {
            this.muteAll();
        }
    }

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