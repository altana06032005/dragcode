const box = document.getElementById('box');
const shape = document.getElementById('cover'); 

let activeItem = null;
let currentX, currentY;
let initialX, initialY;

const minSize = 50;  
const maxSize = 400; 
const sizeRange = maxSize - minSize;

box.ontouchstart = (e) => {
    activeItem = box;
    const touch = e.touches[0];
    
    currentX = touch.clientX;
    currentY = touch.clientY;
    initialX = activeItem.offsetLeft;
    initialY = activeItem.offsetTop;

    activeItem.style.backgroundColor = 'lightyellow';
    e.preventDefault();
};

box.ontouchend = (e) => {
    if (!activeItem) return;
    activeItem.style.backgroundColor = 'orange';
    activeItem = null;
};

window.ontouchmove = (e) => {
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
   
    const normalizedX = touch.clientX / window.innerWidth; 
    const newWidth = Math.floor((normalizedX * sizeRange) + minSize);
    
    const normalizedY_inverted = 1 - (touch.clientY / window.innerHeight);
    const newHeight = Math.floor((normalizedY_inverted * sizeRange) + minSize);
    
    cover.style.width = `${newWidth}px`; 
    cover.style.height = `${newHeight}px`; 

    e.preventDefault();
};