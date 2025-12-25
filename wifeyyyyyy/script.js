<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><333</title>
    <style>
/* ===== BASIC SETUP ===== */
* {
    cursor: none;
    margin: 0;
    padding: 0;
    user-select: none;
}

body {
    background-color: black;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    overflow: hidden;
    transition: background-color 1s ease;
}

/* ===== CUSTOM CURSOR ===== */
#cursor {
    position: fixed;
    width: 40px;
    height: 40px;
    border: 4px solid white;
    border-radius: 50%;
    pointer-events: none;
    opacity: 0.7;
    z-index: 9999;
    transition: transform 0.4s ease, opacity 0.4s ease, border-color 1s ease;
}

#cursor.clicking {
    opacity: 0.2;
    transform: scale(0.8);
}

#cursor.moving-fast {
    filter: blur(3px);
}

/* ===== MESSAGE TEXT ===== */
#message {
    font-family: Arial, sans-serif;
    font-size: 28px;
    color: white;
    text-align: center;
    padding: 20px;
    max-width: 80%;
    white-space: pre-wrap;
    transition: color 1s ease;
}

/* ===== MUSIC POPUP ===== */
#music-popup {
    position: fixed;
    top: 20px;
    left: 20px;
    display: flex;
    align-items: center;
    gap: 12px;
    background: rgba(0, 0, 0, 0.7);
    backdrop-filter: blur(10px);
    padding: 12px 16px;
    border-radius: 20px;
    opacity: 0;
    transform: translateY(-20px);
    transition: all 0.5s ease;
    z-index: 1000;
}

#music-popup.active {
    opacity: 1;
    transform: translateY(0);
}

.music-icon {
    width: 40px;
    height: 40px;
    border-radius: 8px;
    object-fit: cover;
    animation: pulse 1s ease-in-out infinite;
}

@keyframes pulse {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.1); }
}

.music-info {
    display: flex;
    flex-direction: column;
    gap: 2px;
}

.music-title {
    font-family: Arial, sans-serif;
    font-size: 14px;
    font-weight: bold;
    color: white;
}

.music-artist {
    font-family: Arial, sans-serif;
    font-size: 12px;
    color: rgba(255, 255, 255, 0.7);
}

/* ===== CREDITS SYSTEM ===== */
#credits-container {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    overflow: hidden;
}

#credits-content {
    transform: translateY(120vh);
    text-align: center;
}

#credits-container.scrolling #credits-content {
    animation: scroll-up-smooth 45s ease-out forwards;
}

@keyframes scroll-up-smooth {
    0% { transform: translateY(120vh); }
    100% { transform: translateY(-100%); }
}

#credits-end-fixed {
    text-align: center;
    margin-top: 150px;
    font-family: 'Georgia', 'Garamond', serif;
    font-size: 38px;
    color: black;
    font-style: italic;
    font-weight: 300;
}

/* Floating Hearts */
.floating-heart {
    position: fixed;
    font-size: 20px;
    color: #ff1493;
    opacity: 0.6;
    pointer-events: none;
    z-index: 1;
    animation: float-up linear forwards;
}

@keyframes float-up {
    0% {
        transform: translateY(0) rotate(0deg);
        opacity: 0;
    }
    10% { opacity: 0.6; }
    90% { opacity: 0.6; }
    100% {
        transform: translateY(-100vh) rotate(360deg);
        opacity: 0;
    }
}

.heart-wrapper {
    margin-bottom: 50px;
}

.heart {
    position: relative;
    width: 60px;
    height: 60px;
    background: #ff1493;
    margin: 0 auto;
    transform: rotate(-45deg);
    animation: heartbeat 1.5s ease-in-out infinite;
    box-shadow: 0 0 25px rgba(255, 20, 147, 0.7), 0 0 50px rgba(255, 20, 147, 0.5);
}

.heart::before,
.heart::after {
    content: '';
    position: absolute;
    width: 60px;
    height: 60px;
    background: #ff1493;
    border-radius: 50%;
    box-shadow: 0 0 25px rgba(255, 20, 147, 0.7), 0 0 50px rgba(255, 20, 147, 0.5);
}

.heart::before {
    top: -30px;
    left: 0;
}

.heart::after {
    left: 30px;
    top: 0;
}

@keyframes heartbeat {
    0%, 100% { transform: rotate(-45deg) scale(1); }
    25% { transform: rotate(-45deg) scale(1.15); }
    50% { transform: rotate(-45deg) scale(1); }
}

.credits-title {
    font-family: 'Georgia', 'Garamond', serif;
    font-size: 52px;
    font-weight: 400;
    color: #2c2c2c;
    margin-bottom: 100px;
    letter-spacing: 1px;
}

.credit-reason {
    font-family: 'Georgia', 'Garamond', serif;
    font-size: 26px;
    color: #2c2c2c;
    margin: 40px 0;
    line-height: 1.8;
    font-style: italic;
    font-weight: 400;
}

/* ===== TIMER ===== */
#timer-display {
    position: fixed;
    top: 50%;
    right: 40px;
    transform: translateY(-50%) translateX(200px);
    background: transparent;
    z-index: 10000;
    opacity: 0;
    transition: transform 1s ease, opacity 1s ease;
    writing-mode: vertical-rl;
    text-orientation: mixed;
}

#timer-display.show {
    transform: translateY(-50%) translateX(0);
    opacity: 1;
}

#timer-display > div:first-child {
    font-family: 'Courier New', monospace;
    font-size: 11px;
    font-weight: 600;
    color: #ff1493;
    letter-spacing: 3px;
    margin-bottom: 20px;
    text-transform: uppercase;
    border-left: 3px solid #ff1493;
    padding-left: 10px;
}

#days-count {
    display: block;
    font-family: 'Impact', 'Arial Black', sans-serif;
    font-weight: 900;
    font-size: 20px;
    color: #1a1a1a;
    letter-spacing: 2px;
    line-height: 1.4;
    border: 3px solid #1a1a1a;
    padding: 15px 10px;
    background: white;
}
    </style>
</head>
<body>
    <div id="cursor"></div>
    <div id="message"></div>
    
    <div id="music-popup">
        <img src="image.png" alt="Song Cover" class="music-icon">
        <div class="music-info">
            <div class="music-title">Song Title</div>
            <div class="music-artist">Artist Name</div>
        </div>
    </div>

    <audio id="background-music" loop>
        <source src="This Is Home.mp3" type="audio/mpeg">
    </audio>

    <script>
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
    const voiceAudio = new Audio(filename);
    voiceAudio.play();
    voiceAudio.addEventListener('error', (e) => {
        console.error('Error loading voice message:', filename, e);
    });
}

function duckMusicForVoice() {
    const currentTime = audioContext.currentTime;
    const transitionTime = 0.8;
    audio.volume = 0.3;
    lowPassFilter.frequency.setValueAtTime(lowPassFilter.frequency.value, currentTime);
    lowPassFilter.frequency.linearRampToValueAtTime(300, currentTime + transitionTime);
}

function restoreMusic() {
    const currentTime = audioContext.currentTime;
    const transitionTime = 0.8;
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
    "I love everything about you"
];

function startCredits() {
    messageDiv.style.display = 'none';
    
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
            <div id="credits-end-fixed">— Forever Yours —</div>
        </div>
        <div id="timer-display">
            <div>Days since you made me the happiest person alive</div>
            <span id="days-count">0</span>
        </div>
    `;
    
    document.body.appendChild(creditsContainer);
    
    creditsContainer.offsetHeight;
    
    const scrollSpeed = 15;
    const creditsContent = document.getElementById('credits-content');
    const contentHeight = creditsContent.scrollHeight;
    const duration = contentHeight / scrollSpeed;
    
    creditsContent.style.animationDuration = duration + 's';
    
    setTimeout(() => {
        creditsContainer.classList.add('scrolling');
        watchForeverYours();
    }, 100);
    
    setTimeout(() => {
        document.getElementById('timer-display').classList.add('show');
    }, 500);
    
    startCountUpTimer();
    startFloatingHearts();
}

function watchForeverYours() {
    const foreverYours = document.getElementById('credits-end-fixed');
    const creditsContent = document.getElementById('credits-content');
    let hasFixed = false;
    
    function check() {
        if (hasFixed) return;
        
        const rect = foreverYours.getBoundingClientRect();
        const middleOfScreen = window.innerHeight / 2;
        const elementMiddle = rect.top + (rect.height / 2);
        
        if (elementMiddle <= middleOfScreen && elementMiddle >= middleOfScreen - 50) {
            hasFixed = true;
            
            const clone = document.createElement('div');
            clone.textContent = foreverYours.textContent;
            clone.style.position = 'fixed';
            clone.style.top = '50%';
            clone.style.left = '50%';
            clone.style.transform = 'translate(-50%, -50%)';
            clone.style.fontFamily = 'Georgia, Garamond, serif';
            clone.style.fontSize = '38px';
            clone.style.color = 'black';
            clone.style.fontStyle = 'italic';
            clone.style.fontWeight = '300';
            clone.style.textAlign = 'center';
            clone.style.zIndex = '10000';
            clone.style.margin = '0';
            clone.style.padding = '0';
            clone.style.whiteSpace = 'nowrap';
            
            document.body.appendChild(clone);
            foreverYours.style.visibility = 'hidden';
            
            return;
        }
        
        requestAnimationFrame(check);
    }
    
    requestAnimationFrame(check);
}

function startFloatingHearts() {
    function createHeart() {
        const heart = document.createElement('div');
        heart.className = 'floating-heart';
        heart.textContent = '♥';
        heart.style.left = Math.random() * 100 + '%';
        heart.style.bottom = '-50px';
        const duration = 8 + Math.random() * 7;
        heart.style.animationDuration = duration + 's';
        const size = 15 + Math.random() * 15;
        heart.style.fontSize = size + 'px';
        document.body.appendChild(heart);
        setTimeout(() => heart.remove(), duration * 1000);
    }
    
    setInterval(createHeart, 800);
}

function startCountUpTimer() {
    const startDate = new Date('2023-10-19');
    
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
    setInterval(updateTimer, 1000);
}

// ========================================
// STAGE SYSTEM
// ========================================
const messageDiv = document.getElementById('message');
const TYPING_SPEED = 50;

let currentStageIndex = 0;
let currentChar = 0;
let isTyping = false;

const DEBUG_MODE = true;
const DEBUG_STAGE = "credits";

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
            duckMusicForVoice();
            playVoiceMessage('voice3.mp3');
        }
    },
    {
        name: "final_message",
        message: "Now suck my dick bitch you won't see the rest LmMFAO BHAHAAHHAHAHAHAHAHAHHAHAHA DOG LFMAOAOAOAO"
    },
    {
        name: "credits",
        message: "",
        onEnter: () => {
            startMusic();
            startCredits();
            duckMusicForVoice();
        }
    }
];

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
        document.addEventListener('click', nextStage, { once: true });
    }
}

function nextStage() {
    currentStageIndex++;
    
    if (currentStageIndex < stages.length) {
        startStage(currentStageIndex);
    } else {
        console.log("All stages complete!");
    }
}

function startStage(stageIndex) {
    const stage = stages[stageIndex];
    
    if (stage.onEnter) {
        stage.onEnter();
    }
    
    if (stage.message && stage.message.length > 0) {
        currentChar = 0;
        isTyping = true;
        typeMessage();
    } else {
        isTyping = false;
    }
}

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
    debugBadge.textContent = `🛠 DEBUG: ${DEBUG_STAGE}`;
    document.body.appendChild(debugBadge);
    
    if (DEBUG_STAGE === "credits" || DEBUG_STAGE === "color_change" || DEBUG_STAGE === "final_message") {
        document.body.style.backgroundColor = 'white';
        document.getElementById('message').style.color = 'black';
        cursor.style.borderColor = 'black';
    }
}

document.addEventListener('click', () => {
    if (currentStageIndex === 0 && currentChar === 0) {
        if (DEBUG_MODE) {
            const debugIndex = stages.findIndex(stage => stage.name === DEBUG_STAGE);
            if (debugIndex !== -1) {
                console.log(`🛠 DEBUG MODE: Jumping to stage "${DEBUG_STAGE}" (index ${debugIndex})`);
                currentStageIndex = debugIndex;
                startStage(debugIndex);
            } else {
                console.error(`🛠 DEBUG MODE: Stage "${DEBUG_STAGE}" not found!`);
                startStage(0);
            }
        } else {
            startStage(0);
        }
    }
}, { once: true });
    </script>
</body>
</html>