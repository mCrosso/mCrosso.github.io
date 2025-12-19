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
    "HAPPY TWO YEAR ANNIVERSARY BABYYYYYYYYYYYYYYYYYYYYYYYYYYYY",
    "Now suck my dick bitch you won't see the rest LmMFAO BHAHAAHHAHAHAHAHAHAHHAHAHA DOG LFMAOAOAOAO"
];

// Tracking variables
let currentMessage = 0;     // Which message we're on
let currentChar = 0;        // Which character we're typing
let clickCount = 0;         // How many times user has clicked

const TYPING_SPEED = 50;    // Milliseconds between each character

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

    // Change colors on 3rd click
    if (clickCount === 3) {
        document.body.style.backgroundColor = 'white';
        messageDiv.style.color = 'black';
        cursor.style.borderColor = 'black';
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
        typeMessage();
    }
}, { once: true });