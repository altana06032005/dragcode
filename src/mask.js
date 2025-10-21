const cc = document.getElementById('cc'); 
const cover = document.getElementById('cover');
const box = document.getElementById('box');

let activeItem = null;
let currentX, currentY;
let initialX, initialY;

const MAX_SHUTTER_HEIGHT = 300; 

box.ontouchstart = (e) => {
    activeItem = box;
    const touch = e.touches[0];
    
    currentX = touch.clientX;
    currentY = touch.clientY;
    initialX = activeItem.offsetLeft;
    initialY = activeItem.offsetTop;

    activeItem.style.backgroundColor = '#919292ff';
    e.preventDefault();
};

box.ontouchend = (e) => {
    if (!activeItem) return;
    
    activeItem.style.backgroundColor = '#4f4f51ff';
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

    const ccRect = cc.getBoundingClientRect();
    
    let relativeY = touch.clientY - ccRect.top;
    let newHeight = ccRect.height - relativeY;
    
    newHeight = Math.max(0, Math.min(newHeight, ccRect.height));

    cover.style.height = `${newHeight}px`;
    
    e.preventDefault();
};