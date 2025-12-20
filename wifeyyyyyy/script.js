// ========================================
// CURSOR SETUP
// ========================================
const cursor = document.getElementById('cursor');

// Cursor positions
let mouseX = 0;          // Where the mouse actually is
let mouseY = 0;
let cursorX = 0;         // Where the cursor circle is
let cursorY = 0;
let lastMouseX = 0;      // Previous mouse position (for speed calculation)
let lastMouseY = 0;

// Settings
const CURSOR_SPEED = 0.1;      // Lower = more lag (0.1 = smooth lag)
const BLUR_THRESHOLD = 200;       // How fast mouse needs to move for blur

// Track mouse movement
document.addEventListener('mousemove', (e) => {
    mouseX = e.pageX - 20;  // Subtract half the cursor size to center it
    mouseY = e.pageY - 20;
});

// Animate cursor to follow mouse smoothly
function animateCursor() {
    // Calculate how fast the cursor is moving
    const dx = mouseX - lastMouseX;
    const dy = mouseY - lastMouseY;
    const speed = Math.sqrt(dx * dx + dy * dy);
    
    // Add blur effect if moving fast
    if (speed > BLUR_THRESHOLD) {
        cursor.classList.add('moving-fast');
    } else {
        cursor.classList.remove('moving-fast');
    }

    // Smoothly move cursor toward mouse (creates lag effect)
    cursorX += (mouseX - cursorX) * CURSOR_SPEED;
    cursorY += (mouseY - cursorY) * CURSOR_SPEED;

    // Update cursor position
    cursor.style.left = cursorX + 'px';
    cursor.style.top = cursorY + 'px';

    // Remember current position for next frame
    lastMouseX = mouseX;
    lastMouseY = mouseY;

    // Keep animation running
    requestAnimationFrame(animateCursor);
}

// Cursor click effects
document.addEventListener('mousedown', () => {
    cursor.classList.add('clicking');
});

document.addEventListener('mouseup', () => {
    cursor.classList.remove('clicking');
});

// Start cursor animation
animateCursor();

// ========================================
// MESSAGE TYPING ANIMATION
// ========================================
const messageDiv = document.getElementById('message');

// Your messages
const messages = [
    "OKAY SO THIS IS THE MOST CREATIVE I COULD EVER BE, PLEASE BEAR WITH ME :SOB:.",
    "First of all my baby I adore you more than anything else.",
    "Right now, I'm the happiest and the proudest person alive to have met you and to call myself your husband.",
    "HAPPY ONE YEAR ANNIVERSARY BABYYYYYYYYYYYYYYYYYYYYYYYYYYYY",
    "Now suck my dick bitch you won't see the rest LmMFAO BHAHAAHHAHAHAHAHAHAHHAHAHA DOG LFMAOAOAOAO"
];

// Tracking variables
let currentMessage = 0;     // Which message we're on
let currentChar = 0;        // Which character we're typing
let clickCount = 0;         // How many times user has clicked

const TYPING_SPEED = 50;    // Milliseconds between each character

// ========================================
// MUSIC SETUP
// ========================================
const musicPopup = document.getElementById('music-popup');
const audio = document.getElementById('background-music');
const voiceAudio = document.getElementById('voice-recording');

// Music info - CHANGE THESE to your song details
const SONG_TITLE = "This Is Home";
const ARTIST_NAME = "Cavetown";

// Update the popup text
document.querySelector('.music-title').textContent = SONG_TITLE;
document.querySelector('.music-artist').textContent = ARTIST_NAME;

// Create Web Audio API context for audio effects
const audioContext = new (window.AudioContext || window.webkitAudioContext)();
const audioSource = audioContext.createMediaElementSource(audio);
const lowPassFilter = audioContext.createBiquadFilter();

// Set up the audio routing: audio -> filter -> speakers
lowPassFilter.type = "lowpass";
lowPassFilter.frequency.value = 20000; // Start with no filter (normal sound)
audioSource.connect(lowPassFilter);
lowPassFilter.connect(audioContext.destination);

// Function to start music and show popup
function startMusic() {
    audioContext.resume(); // Resume audio context (needed for browsers)
    audio.play();
    musicPopup.classList.add('active');
}

// Function to start voice recording with ducking effect
function startVoice() {
    const currentTime = audioContext.currentTime;
    const transitionTime = 0.8; // 0.8 seconds for smooth transition
    
    // Smoothly duck the background music (lower volume AND muffle it)
    // Volume transition
    audio.volume = 0.3;  // This transitions smoothly due to browser implementation
    
    // Frequency filter transition (smooth ramp down)
    lowPassFilter.frequency.setValueAtTime(lowPassFilter.frequency.value, currentTime);
    lowPassFilter.frequency.linearRampToValueAtTime(300, currentTime + transitionTime);
    
    voiceAudio.play();
    
    // When voice ends, bring music back to normal smoothly
    voiceAudio.addEventListener('ended', () => {
        const endTime = audioContext.currentTime;
        
        // Smooth volume return
        audio.volume = 1.0;
        
        // Smooth frequency filter return (ramp back up)
        lowPassFilter.frequency.setValueAtTime(lowPassFilter.frequency.value, endTime);
        lowPassFilter.frequency.linearRampToValueAtTime(20000, endTime + transitionTime);
    }, { once: true });
}

// Type out one character at a time
function typeMessage() {
    const fullText = messages[currentMessage];
    
    // Show characters up to current position
    messageDiv.textContent = fullText.slice(0, currentChar);
    currentChar++;

    // If more characters to type, continue
    if (currentChar <= fullText.length) {
        setTimeout(typeMessage, TYPING_SPEED);
    } else {
        // Message complete - wait for next click
        document.addEventListener('click', nextMessage, { once: true });
    }
}

// Move to next message
function nextMessage() {
    currentMessage++;
    clickCount++;

    // Change colors on 3rd click AND start voice
    if (clickCount === 3) {
        document.body.style.backgroundColor = 'white';
        messageDiv.style.color = 'black';
        cursor.style.borderColor = 'black';
        startVoice();  // Play your voice recording!
    }

    // If more messages, type the next one
    if (currentMessage < messages.length) {
        currentChar = 0;
        typeMessage();
    }
}

// Start on first click
document.addEventListener('click', () => {
    if (currentMessage === 0 && currentChar === 0) {
        startMusic();    // Start the music and show popup
        typeMessage();   // Start typing messages
    }
}, { once: true });