const box = document.getElementById('box');

let activeItem = null;
let currentClientX, currentClientY; 
let initialElementX, initialElementY; 

box.ontouchstart = (e) => {
    activeItem = box;
    const touch = e.touches[0];
    
    currentClientX = touch.clientX;
    currentClientY = touch.clientY;

    initialElementX = box.offsetLeft;
    initialElementY = box.offsetTop;

    e.preventDefault();
};

box.ontouchend = () => {
    if (!activeItem) return;
    
    activeItem = null;
};


box.ontouchmove = (e) => {
    if (!activeItem) return;

    const touch = e.touches[0];
    const newClientX = touch.clientX;
    const newClientY = touch.clientY;

    const dx = newClientX - currentClientX;
    const dy = newClientY - currentClientY;
   
    createTrailDot(box.offsetLeft + box.offsetWidth / 2, box.offsetTop + box.offsetHeight / 2);

    const newLeft = initialElementX + dx;
    const newTop = initialElementY + dy;
    
    box.style.left = `${newLeft}px`;
    box.style.top = `${newTop}px`;

    e.preventDefault();
};


function createTrailDot(x, y) {
    const dot = document.createElement('div');
    dot.classList.add('trail-dot');
    
    const dotSize = 10; 
    
    dot.style.left = `${x - (dotSize / 2)}px`;
    dot.style.top = `${y - (dotSize / 2)}px`;
    
    document.body.appendChild(dot);
    
    setTimeout(() => {
        dot.classList.add('fade'); 
        
        setTimeout(() => {
            dot.remove();
        }, 1500); 
        
    }, 50); 
}

