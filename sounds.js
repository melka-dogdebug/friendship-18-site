/* ===== SOUND GENERATION ===== */

// Audio Context
const audioContext = new (window.AudioContext || window.webkitAudioContext)();

// Master volume
const masterVolume = audioContext.createGain();
masterVolume.connect(audioContext.destination);
masterVolume.gain.value = 0.3;

// Create different sounds
const sounds = {
    // Page turn/blättern sound (high pitched whoosh)
    pageflip: () => {
        const osc = audioContext.createOscillator();
        const gain = audioContext.createGain();
        
        osc.connect(gain);
        gain.connect(masterVolume);
        
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(2000, audioContext.currentTime);
        osc.frequency.exponentialRampToValueAtTime(500, audioContext.currentTime + 0.3);
        
        gain.gain.setValueAtTime(0.1, audioContext.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
        
        osc.start();
        osc.stop(audioContext.currentTime + 0.3);
    },

    // Clicking sound (satisfying click)
    click: () => {
        const osc = audioContext.createOscillator();
        const gain = audioContext.createGain();
        
        osc.connect(gain);
        gain.connect(masterVolume);
        
        osc.type = 'sine';
        osc.frequency.value = 600;
        
        gain.gain.setValueAtTime(0.15, audioContext.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
        
        osc.start();
        osc.stop(audioContext.currentTime + 0.1);
    },

    // Mailbox quietsch (squeaky)
    mailboxSqueak: () => {
        const osc = audioContext.createOscillator();
        const gain = audioContext.createGain();
        
        osc.connect(gain);
        gain.connect(masterVolume);
        
        osc.type = 'sine';
        osc.frequency.setValueAtTime(1200, audioContext.currentTime);
        osc.frequency.setValueAtTime(1500, audioContext.currentTime + 0.05);
        osc.frequency.setValueAtTime(1100, audioContext.currentTime + 0.15);
        
        gain.gain.setValueAtTime(0.15, audioContext.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.02, audioContext.currentTime + 0.2);
        
        osc.start();
        osc.stop(audioContext.currentTime + 0.2);
    },

    // Whoosh sound for star spinning (rising tone)
    whoosh: () => {
        const osc = audioContext.createOscillator();
        const gain = audioContext.createGain();
        
        osc.connect(gain);
        gain.connect(masterVolume);
        
        osc.type = 'square';
        osc.frequency.setValueAtTime(800, audioContext.currentTime);
        osc.frequency.exponentialRampToValueAtTime(1500, audioContext.currentTime + 0.4);
        
        gain.gain.setValueAtTime(0.08, audioContext.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.4);
        
        osc.start();
        osc.stop(audioContext.currentTime + 0.4);
    },

    // Flush sound (toilet)
    flush: () => {
        const noise = audioContext.createBufferSource();
        const noiseBuffer = audioContext.createBuffer(1, audioContext.sampleRate * 0.5, audioContext.sampleRate);
        const data = noiseBuffer.getChannelData(0);
        
        for (let i = 0; i < audioContext.sampleRate * 0.5; i++) {
            data[i] = Math.random() * 2 - 1;
        }
        
        const gain = audioContext.createGain();
        const filter = audioContext.createBiquadFilter();
        
        noise.buffer = noiseBuffer;
        noise.connect(filter);
        filter.connect(gain);
        gain.connect(masterVolume);
        
        filter.type = 'lowpass';
        filter.frequency.value = 5000;
        
        gain.gain.setValueAtTime(0.2, audioContext.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.05, audioContext.currentTime + 0.5);
        
        noise.start();
        noise.stop(audioContext.currentTime + 0.5);
    },

    // Motor sound (car)
    motorStart: () => {
        const osc = audioContext.createOscillator();
        const gain = audioContext.createGain();
        const lfo = audioContext.createOscillator();
        const lfoGain = audioContext.createGain();
        
        osc.connect(gain);
        gain.connect(masterVolume);
        lfo.connect(lfoGain);
        lfoGain.connect(osc.frequency);
        
        osc.type = 'triangle';
        osc.frequency.value = 200;
        lfo.frequency.value = 5;
        lfoGain.gain.value = 50;
        
        gain.gain.setValueAtTime(0.1, audioContext.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.05, audioContext.currentTime + 0.6);
        
        osc.start();
        lfo.start();
        osc.stop(audioContext.currentTime + 0.6);
        lfo.stop(audioContext.currentTime + 0.6);
    },

    // Calendar flip (flap-flap)
    calendarFlip: () => {
        const osc1 = audioContext.createOscillator();
        const osc2 = audioContext.createOscillator();
        const gain1 = audioContext.createGain();
        const gain2 = audioContext.createGain();
        
        osc1.connect(gain1);
        osc2.connect(gain2);
        gain1.connect(masterVolume);
        gain2.connect(masterVolume);
        
        osc1.type = 'sine';
        osc2.type = 'sine';
        osc1.frequency.value = 800;
        osc2.frequency.value = 600;
        
        gain1.gain.setValueAtTime(0.1, audioContext.currentTime);
        gain1.gain.exponentialRampToValueAtTime(0, audioContext.currentTime + 0.1);
        
        gain2.gain.setValueAtTime(0, audioContext.currentTime + 0.1);
        gain2.gain.setValueAtTime(0.1, audioContext.currentTime + 0.1);
        gain2.gain.exponentialRampToValueAtTime(0, audioContext.currentTime + 0.2);
        
        osc1.start();
        osc1.stop(audioContext.currentTime + 0.1);
        osc2.start(audioContext.currentTime + 0.1);
        osc2.stop(audioContext.currentTime + 0.2);
    },

    // Paper tear sound (postit)
    paperTear: () => {
        const noise = audioContext.createBufferSource();
        const noiseBuffer = audioContext.createBuffer(1, audioContext.sampleRate * 0.3, audioContext.sampleRate);
        const data = noiseBuffer.getChannelData(0);
        
        for (let i = 0; i < audioContext.sampleRate * 0.3; i++) {
            data[i] = Math.random() * 2 - 1;
        }
        
        const gain = audioContext.createGain();
        const filter = audioContext.createBiquadFilter();
        
        noise.buffer = noiseBuffer;
        noise.connect(filter);
        filter.connect(gain);
        gain.connect(masterVolume);
        
        filter.type = 'highpass';
        filter.frequency.value = 3000;
        
        gain.gain.setValueAtTime(0.12, audioContext.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.02, audioContext.currentTime + 0.3);
        
        noise.start();
        noise.stop(audioContext.currentTime + 0.3);
    },

    // Confetti/Tada sound
    tada: () => {
        const notes = [800, 1000, 1200, 1000];
        let time = audioContext.currentTime;
        
        notes.forEach((freq, index) => {
            const osc = audioContext.createOscillator();
            const gain = audioContext.createGain();
            
            osc.connect(gain);
            gain.connect(masterVolume);
            
            osc.type = 'sine';
            osc.frequency.value = freq;
            
            gain.gain.setValueAtTime(0.1, time);
            gain.gain.exponentialRampToValueAtTime(0.02, time + 0.1);
            
            osc.start(time);
            osc.stop(time + 0.1);
            
            time += 0.1;
        });
    },

    // Bubble sound (toilet exit)
    bubble: () => {
        const osc = audioContext.createOscillator();
        const gain = audioContext.createGain();
        
        osc.connect(gain);
        gain.connect(masterVolume);
        
        osc.type = 'sine';
        osc.frequency.setValueAtTime(600, audioContext.currentTime);
        osc.frequency.exponentialRampToValueAtTime(300, audioContext.currentTime + 0.3);
        
        gain.gain.setValueAtTime(0.08, audioContext.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
        
        osc.start();
        osc.stop(audioContext.currentTime + 0.3);
    },

    // Fanfare sound
    fanfare: () => {
        const notes = [1047, 1319, 1568, 1047]; // C, E, G, C
        let time = audioContext.currentTime;
        
        notes.forEach((freq, index) => {
            const osc = audioContext.createOscillator();
            const gain = audioContext.createGain();
            
            osc.connect(gain);
            gain.connect(masterVolume);
            
            osc.type = 'sine';
            osc.frequency.value = freq;
            
            const duration = 0.15;
            gain.gain.setValueAtTime(0.15, time);
            gain.gain.exponentialRampToValueAtTime(0.02, time + duration);
            
            osc.start(time);
            osc.stop(time + duration);
            
            time += duration;
        });
    }
};

// Export for use in app.js
window.playSound = (soundName) => {
    if (sounds[soundName]) {
        sounds[soundName]();
    }
};