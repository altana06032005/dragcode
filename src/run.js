const box = document.getElementById('drag');
const textBlock = document.getElementById('textblock'); 

let activeItem = null;
let currentX, currentY;
let initialX, initialY;


box.ontouchstart = (e) => {
    activeItem = box; 
    const touch = e.touches[0];
    
    currentX = touch.clientX;
    currentY = touch.clientY;
    initialX = activeItem.offsetLeft;
    initialY = activeItem.offsetTop;

    activeItem.style.backgroundColor = 'darkpink';
    e.preventDefault();
}

box.ontouchend = () =>{
    activeItem.style.backgroundColor = 'pink';
    activeItem = null;
}



box.ontouchmove = (e) =>{
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
    
    const minSize = 14;  
    const maxSize = 72;  
    const sizeRange = maxSize - minSize;
    
    const normalizedY = touch.clientY / window.innerHeight;
    
    
    const normalizedY_inverted = 1 - normalizedY; 
    
    const newSize = Math.floor((normalizedY_inverted * sizeRange) + minSize);
    
    textBlock.style.fontSize = `${newSize}px`; 
  

    e.preventDefault();
}


