const box = document.getElementById('box');
const light = document.getElementById('light');

let activeItem = null;
let currentX, currentY;
let initialX, initialY;

const maxGlow = 80; 
const glowColor = '#FFFF66'; 

box.ontouchstart = (e) => {
    activeItem = box;
    const touch = e.touches[0];
    
    currentX = touch.clientX;
    currentY = touch.clientY;
    initialX = activeItem.offsetLeft;
    initialY = activeItem.offsetTop;

    activeItem.style.zIndex = 1000; 
    activeItem.style.backgroundColor = '#303132ff'; 
    
    e.preventDefault();
};

box.ontouchend = (e) => {
    if (!activeItem) return;
    
    // Сброс z-index и цвета
    activeItem.style.zIndex = '';
    activeItem.style.backgroundColor = '#797979ff';
    activeItem = null;
};




box.ontouchmove = (e) => {
    if (!activeItem) return;

    const touch = e.touches[0];
    const dx = touch.clientX - currentX;
    const dy = touch.clientY - currentY;
    
    activeItem.style.left = initialX + dx + 'px';
    activeItem.style.top = initialY + dy + 'px';
    currentX = touch.clientX;
    currentY = touch.clientY;
    initialX = activeItem.offsetLeft;
    initialY = activeItem.offsetTop;

    const normalizedY = 1 - (touch.clientY / window.innerHeight);
    const glowBlur = Math.floor(Math.max(0, Math.min(normalizedY * maxGlow, maxGlow)));
    
    const newShadow = `0 0 ${glowBlur}px 50px ${glowColor}`; 
    
    activeItem.style.boxShadow = newShadow;
    

    e.preventDefault();
};