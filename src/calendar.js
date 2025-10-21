const anchor = document.getElementById('anchor');
const leaves = document.querySelectorAll('.leaf');
const output = document.getElementById('output');

const NUM_LEAVES = leaves.length;
const RADIUS = 120; 
const ANGLE_STEP = 35; 
const START_ANGLE = -90; 

let activeItem = null;
let startX, startY; 
let initialElementX, initialElementY; 

function calculateLeafPosition() {
    leaves.forEach((leaf, index) => {
        const angleDegrees = START_ANGLE + (index - Math.floor(NUM_LEAVES / 2)) * ANGLE_STEP;
        const angleRadians = angleDegrees * (Math.PI / 180);

        const x = RADIUS * Math.cos(angleRadians);
        const y = RADIUS * Math.sin(angleRadians);
        
        leaf.style.transform = `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`;
    });
}
anchor.ontouchstart = (e) => {
    activeItem = anchor;
    activeItem.classList.add('open'); 
    activeItem.style.cursor = 'grabbing';

    const touch = e.touches[0];
    
   
    startX = touch.clientX;
    startY = touch.clientY;

    initialElementX = anchor.offsetLeft;
    initialElementY = anchor.offsetTop;
    
    calculateLeafPosition(); 

    e.preventDefault();
};


window.ontouchmove = (e) => {
    if (!activeItem) return;

    const touch = e.touches[0];
    
    const dx = touch.clientX - startX;
    const dy = touch.clientY - startY;
   
    const newLeft = initialElementX + dx;
    const newTop = initialElementY + dy;
    
    anchor.style.left = `${newLeft}px`;
    anchor.style.top = `${newTop}px`;
    
    output.textContent = `Якорь смещен: X=${Math.round(newLeft)}, Y=${Math.round(newTop)}`;

    
    e.preventDefault();
};




window.ontouchend = () => {
    if (!activeItem) return;
    
    activeItem.style.cursor = 'pointer';
    
    
    activeItem = null;
};

