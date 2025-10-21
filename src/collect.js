const gameArea = document.getElementById('game-area');
const cursor = document.getElementById('cursor');
const scoreDisplay = document.getElementById('score');
let targets = Array.from(document.getElementsByClassName('target'));

let isDragging = false;
let score = 0;

const CURSOR_RADIUS = 20; 
const TARGET_RADIUS = 10; 

function checkCollision(cursorX, cursorY, targetElement) {
   
    const targetX = targetElement.offsetLeft;
    const targetY = targetElement.offsetTop;

    const distance = Math.sqrt(
        Math.pow(cursorX - targetX, 2) + 
        Math.pow(cursorY - targetY, 2)
    );
    return distance < CURSOR_RADIUS + TARGET_RADIUS;
}

cursor.ontouchstart = (event) => {
    event.preventDefault(); 
    isDragging = true;
};


gameArea.ontouchmove = (event) => {
    if (!isDragging) return;

    event.preventDefault();
    const gameAreaRect = gameArea.getBoundingClientRect();
    let x = event.touches[0].clientX - gameAreaRect.left;
    let y = event.touches[0].clientY - gameAreaRect.top;

    if (x < CURSOR_RADIUS) x = CURSOR_RADIUS;
    if (x > gameAreaRect.width - CURSOR_RADIUS) x = gameAreaRect.width - CURSOR_RADIUS;
    if (y < CURSOR_RADIUS) y = CURSOR_RADIUS;
    if (y > gameAreaRect.height - CURSOR_RADIUS) y = gameAreaRect.height - CURSOR_RADIUS;

    cursor.style.left = `${x}px`;
    cursor.style.top = `${y}px`;
    targets = targets.filter(target => {
        if (!target.classList.contains('collected') && checkCollision(x, y, target)) {

            
            
            target.classList.add('collected'); 
            
            target.style.opacity = 0;
            score++;
            scoreDisplay.textContent = `Count: ${score}`;
            
            return false;
        }
        return true;
    });
};

const endDrag = () => {
    isDragging = false;
};

cursor.ontouchend = endDrag;
cursor.ontouchcancel = endDrag;