const list = document.getElementById('list');
const basket = document.getElementById('basket');
const draggables = document.querySelectorAll('.draggable');

let activeItem = null;      
let currentX, currentY;     
let initialX, initialY;     



function checkDropZone(x, y) {
    const basketRect = basket.getBoundingClientRect();
    
    const isOverBasket = (
        x > basketRect.left && x < basketRect.right &&
        y > basketRect.top && y < basketRect.bottom
    );

    if (isOverBasket) {
        basket.classList.add('drag-over');
    } else {
        basket.classList.remove('drag-over');
    }
    return isOverBasket;
}

function markItemAsChecked(dataItem) {
    const listItem = list.querySelector(`[data-item="${dataItem}"]`);
    if (listItem) {
        listItem.classList.add('checked');
    }
}

draggables.forEach(item => {
    item.ontouchstart = (e) => {
        activeItem = item;
        const touch = e.touches[0];
        
        currentX = touch.clientX;
        currentY = touch.clientY;
        initialX = activeItem.offsetLeft;
        initialY = activeItem.offsetTop;

        activeItem.style.zIndex = 1000; 
        activeItem.style.cursor = 'grabbing';
        
        e.preventDefault(); 
    };
});



window.ontouchmove = (e) => {
    if (!activeItem) return;

    const touch = e.touches[0];
    const dx = touch.clientX - currentX;
    const dy = touch.clientY - currentY;
    
 
    activeItem.style.left = initialX + dx + 'px';
    activeItem.style.top = initialY + dy + 'px';

   
    currentX = touch.clientX;
    currentY = touch.clientY;
    
   
    checkDropZone(touch.clientX, touch.clientY);

    e.preventDefault();
};



window.ontouchend = (e) => {
    if (!activeItem) return;

    
    const isDroppedInBasket = checkDropZone(currentX, currentY);

    if (isDroppedInBasket) {
        markItemAsChecked(activeItem.getAttribute('data-item'));
        activeItem.remove(); 

    } else {
        activeItem.style.left = initialX + 'px';
        activeItem.style.top = initialY + 'px'; 
    }
    
    
    activeItem.style.zIndex = '';
    activeItem.style.cursor = 'grab';
    basket.classList.remove('drag-over');
    activeItem = null;
};