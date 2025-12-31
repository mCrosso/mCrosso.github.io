// ========================================
// CURSOR SETUP
// ========================================
const cursor = document.getElementById('cursor');

let mouseX = 0;
let mouseY = 0;
let cursorX = 0;
let cursorY = 0;
let lastMouseX = 0;
let lastMouseY = 0;

const CURSOR_SPEED = 0.1;
const BLUR_THRESHOLD = 200;

document.addEventListener('mousemove', (e) => {
    mouseX = e.pageX - 20;
    mouseY = e.pageY - 20;
});

function animateCursor() {
    const dx = mouseX - lastMouseX;
    const dy = mouseY - lastMouseY;
    const speed = Math.sqrt(dx * dx + dy * dy);
    
    if (speed > BLUR_THRESHOLD) {
        cursor.classList.add('moving-fast');
    } else {
        cursor.classList.remove('moving-fast');
    }

    cursorX += (mouseX - cursorX) * CURSOR_SPEED;
    cursorY += (mouseY - cursorY) * CURSOR_SPEED;

    cursor.style.left = cursorX + 'px';
    cursor.style.top = cursorY + 'px';

    lastMouseX = mouseX;
    lastMouseY = mouseY;

    requestAnimationFrame(animateCursor);
}

document.addEventListener('mousedown', () => {
    cursor.classList.add('clicking');
});

document.addEventListener('mouseup', () => {
    cursor.classList.remove('clicking');
});

animateCursor();

// ========================================
// MUSIC SETUP
// ========================================
const musicPopup = document.getElementById('music-popup');
const audio = document.getElementById('background-music');

const SONG_TITLE = "This Is Home";
const ARTIST_NAME = "Cavetown";

document.querySelector('.music-title').textContent = SONG_TITLE;
document.querySelector('.music-artist').textContent = ARTIST_NAME;

const audioContext = new (window.AudioContext || window.webkitAudioContext)();
const audioSource = audioContext.createMediaElementSource(audio);
const lowPassFilter = audioContext.createBiquadFilter();

lowPassFilter.type = "lowpass";
lowPassFilter.frequency.value = 20000;
audioSource.connect(lowPassFilter);
lowPassFilter.connect(audioContext.destination);

function startMusic() {
    audioContext.resume();
    audio.play();
    musicPopup.classList.add('active');
}

// ========================================
// VOICE MESSAGE SYSTEM
// ========================================

function playVoiceMessage(filename) {
    // Create a new audio element for this voice message
    const voiceAudio = new Audio(filename);
    
    // Play the voice message
    voiceAudio.play();
    
    // Handle errors
    voiceAudio.addEventListener('error', (e) => {
        console.error('Error loading voice message:', filename, e);
    });
}

function duckMusicForVoice() {
    const currentTime = audioContext.currentTime;
    const transitionTime = 0.8;
    
    // Lower music volume and apply filter
    audio.volume = 0.3;
    
    lowPassFilter.frequency.setValueAtTime(lowPassFilter.frequency.value, currentTime);
    lowPassFilter.frequency.linearRampToValueAtTime(300, currentTime + transitionTime);
}

function restoreMusic() {
    const currentTime = audioContext.currentTime;
    const transitionTime = 0.8;
    
    // Restore music volume and remove filter
    audio.volume = 1.0;
    
    lowPassFilter.frequency.setValueAtTime(lowPassFilter.frequency.value, currentTime);
    lowPassFilter.frequency.linearRampToValueAtTime(20000, currentTime + transitionTime);
}

// ========================================
// CREDITS SYSTEM
// ========================================

const reasons = [
    "I love the way you make me laugh every single day",
    "I love how you understand me like no one else",
    "I love your beautiful smile that brightens my world",
    "I love how you support my dreams",
    "I love the way you say my name",
    "I love how you make me feel safe",
    "I love your kind heart",
    "I love how you listen to me",
    "I love your sense of humor",
    "I love how you're always there for me",
    // Add more reasons here - aim for 100!
    "I love everything about you"
];

function startCredits() {
    // Hide the message div
    messageDiv.style.display = 'none';
    
    // Create credits container
    const creditsContainer = document.createElement('div');
    creditsContainer.id = 'credits-container';
    creditsContainer.innerHTML = `
        <div id="credits-content">
            <div class="heart-wrapper">
                <div class="heart"></div>
            </div>
            <h1 class="credits-title">100 Reasons Why I Love You</h1>
            ${reasons.map((reason, index) => `
                <p class="credit-reason">${index + 1}. ${reason}</p>
            `).join('')}
            <p class="credits-end">— Forever Yours —</p>
        </div>
        <div id="timer-display">
            <div>Days since you made me the happiest person alive</div>
            <span id="days-count">0</span>
        </div>
    `;
    
    document.body.appendChild(creditsContainer);
    
    // Force a reflow to ensure initial position is set
    creditsContainer.offsetHeight;
    
    // Calculate animation duration based on content height
    // Speed: pixels per second (adjust this value to change speed)
    const scrollSpeed = 15; // Lower = slower, Higher = faster
    const creditsContent = document.getElementById('credits-content');
    const contentHeight = creditsContent.scrollHeight;
    const duration = contentHeight / scrollSpeed;
    
    // Set the animation duration dynamically
    creditsContent.style.animationDuration = duration + 's';
    
    // Start the scroll animation after ensuring position is set
    setTimeout(() => {
        creditsContainer.classList.add('scrolling');
    }, 100);
    
    // Animate timer in from top after a brief delay
    setTimeout(() => {
        document.getElementById('timer-display').classList.add('show');
    }, 500);
    
    // Start the timer
    startCountUpTimer();
    
    // Start floating hearts
    startFloatingHearts();
}

function startFloatingHearts() {
    setInterval(() => {
        const heart = document.createElement('div');
        heart.className = 'floating-heart';
        heart.textContent = '♥';
        
        // Random horizontal position
        heart.style.left = Math.random() * 100 + '%';
        
        // Start from bottom
        heart.style.bottom = '-50px';
        
        // Random animation duration (8-15 seconds)
        const duration = 8 + Math.random() * 7;
        heart.style.animationDuration = duration + 's';
        
        // Random size
        const size = 15 + Math.random() * 15;
        heart.style.fontSize = size + 'px';
        
        document.body.appendChild(heart);
        
        // Remove after animation
        setTimeout(() => {
            heart.remove();
        }, duration * 1000);
    }, 800); // Create a new heart every 800ms
}

function startCountUpTimer() {
    // Set your relationship start date here
    const startDate = new Date('2023-01-01'); // CHANGE THIS DATE!
    
    function updateTimer() {
        const now = new Date();
        const diff = now - startDate;
        
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        
        document.getElementById('days-count').textContent = 
            `${days} days, ${hours} hours, ${minutes} minutes, ${seconds} seconds`;
    }
    
    updateTimer();
    setInterval(updateTimer, 1000); // Update every second
}

// ========================================
// STAGE SYSTEM
// ========================================
const messageDiv = document.getElementById('message');
const TYPING_SPEED = 50;

let currentStageIndex = 0;
let currentChar = 0;
let isTyping = false;

// ===== DEBUG MODE =====
const DEBUG_MODE = true;  // Set to false to disable debugging
const DEBUG_STAGE = "credits";  // Stage name to jump to for testing

// ===== STAGE DEFINITIONS =====
// Each stage is an object with actions and content
const stages = [
    {
        name: "intro",
        message: "OKAY SO THIS IS THE MOST CREATIVE I COULD EVER BE, PLEASE BEAR WITH ME :SOB:.",
        onEnter: () => {
            startMusic();
        }
    },
    {
        name: "message_1",
        message: "First of all my baby I adore you more than anything else.",
        onEnter: () => {
            playVoiceMessage('voice1.mp3');
        }
    },
    {
        name: "message_2",
        message: "Right now, I'm the happiest and the proudest person alive to have met you and to call myself your husband.",
        onEnter: () => {
            playVoiceMessage('voice2.mp3');
        }
    },
    {
        name: "color_change",
        message: "HAPPY ONE YEAR ANNIVERSARY BABYYYYYYYYYYYYYYYYYYYYYYYYYYYY",
        onEnter: () => {
            document.body.style.backgroundColor = 'white';
            messageDiv.style.color = 'black';
            cursor.style.borderColor = 'black';
            duckMusicForVoice();  // Duck the music
            playVoiceMessage('voice3.mp3');
            // restoreMusic();  // USE THIS to restore music volume and remove filter
        }
    },
    {
        name: "final_message",
        message: "Now suck my dick bitch you won't see the rest LmMFAO BHAHAAHHAHAHAHAHAHAHHAHAHA DOG LFMAOAOAOAO"
    },
    {
        name: "credits",
        message: "",  // No typing for credits
        onEnter: () => {
            startMusic();
            startCredits();
            duckMusicForVoice();
        }
    }
];

// ===== STAGE FUNCTIONS =====

function typeMessage() {
    if (!isTyping) return;
    
    const currentStage = stages[currentStageIndex];
    const fullText = currentStage.message;
    
    messageDiv.textContent = fullText.slice(0, currentChar);
    currentChar++;

    if (currentChar <= fullText.length) {
        setTimeout(typeMessage, TYPING_SPEED);
    } else {
        isTyping = false;
        // Wait for click to go to next stage
        document.addEventListener('click', nextStage, { once: true });
    }
}

function nextStage() {
    currentStageIndex++;
    
    // Check if there are more stages
    if (currentStageIndex < stages.length) {
        startStage(currentStageIndex);
    } else {
        // All stages complete
        console.log("All stages complete!");
    }
}

function startStage(stageIndex) {
    const stage = stages[stageIndex];
    
    // Run onEnter function if it exists
    if (stage.onEnter) {
        stage.onEnter();
    }
    
    // Only type if there's a message
    if (stage.message && stage.message.length > 0) {
        currentChar = 0;
        isTyping = true;
        typeMessage();
    } else {
        // No message to type (like credits), just wait for completion
        isTyping = false;
    }
}

// ===== START THE EXPERIENCE =====

// Show debug indicator if debug mode is on
if (DEBUG_MODE) {
    const debugBadge = document.createElement('div');
    debugBadge.style.cssText = `
        position: fixed;
        top: 10px;
        right: 10px;
        background: red;
        color: white;
        padding: 8px 12px;
        border-radius: 5px;
        font-family: monospace;
        font-size: 12px;
        z-index: 99999;
        pointer-events: none;
    `;
    debugBadge.textContent = `🐛 DEBUG: ${DEBUG_STAGE}`;
    document.body.appendChild(debugBadge);
    
    // Pre-setup for credits debugging (white background)
    if (DEBUG_STAGE === "credits" || DEBUG_STAGE === "color_change" || DEBUG_STAGE === "final_message") {
        document.body.style.backgroundColor = 'white';
        document.getElementById('message').style.color = 'black';
        cursor.style.borderColor = 'black';
    }
}

document.addEventListener('click', () => {
    if (currentStageIndex === 0 && currentChar === 0) {
        if (DEBUG_MODE) {
            // Find the debug stage index
            const debugIndex = stages.findIndex(stage => stage.name === DEBUG_STAGE);
            if (debugIndex !== -1) {
                console.log(`🐛 DEBUG MODE: Jumping to stage "${DEBUG_STAGE}" (index ${debugIndex})`);
                currentStageIndex = debugIndex;
                startStage(debugIndex);
            } else {
                console.error(`🐛 DEBUG MODE: Stage "${DEBUG_STAGE}" not found!`);
                startStage(0);
            }
        } else {
            startStage(0);
        }
    }
}, { once: true });