const button = document.getElementById('draggable-button');
const container = document.getElementById('container');
const display = document.getElementById('percentage-display');

let isDragging = false;
let startX = 0;
let initialButtonLeft = 0;
const containerWidth = container.clientWidth - button.clientWidth; 

button.addEventListener('touchstart', (event) => {
    event.preventDefault(); 
    startX = event.touches[0].clientX;
    
    const style = window.getComputedStyle(button);
    initialButtonLeft = parseFloat(style.left); 
    
    isDragging = true;
    button.style.cursor = 'grabbing';
}, false);

button.addEventListener('touchmove', (event) => {
    if (!isDragging) return;

    event.preventDefault();
    const currentX = event.touches[0].clientX;
    const deltaX = currentX - startX;
    let newLeft = initialButtonLeft + deltaX;

    if (newLeft < 0) {
        newLeft = 0;
    } else if (newLeft > containerWidth) {
        newLeft = containerWidth;
    }

   
    button.style.left = newLeft + 'px';
    
    
    const percentage = Math.round((newLeft / containerWidth) * 100);
    

    button.textContent = `${percentage}%`;
    display.textContent = `Percentage: ${percentage}%`;
}, false);

const endDrag = () => {
    isDragging = false;
    button.style.cursor = 'grab';
};

button.addEventListener('touchend', endDrag, false);
button.addEventListener('touchcancel', endDrag, false);