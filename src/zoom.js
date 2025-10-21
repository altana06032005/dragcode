const imageContainer = document.getElementById('image-container');
const mainImage = document.getElementById('main-image');
const magnifier = document.getElementById('magnifier');

const ZOOM_FACTOR = 2; 
let imgWidth = 0;
let imgHeight = 0;
let magnifierWidth = 0;
let magnifierHeight = 0;

mainImage.onload = () => {
    imgWidth = mainImage.offsetWidth;
    imgHeight = mainImage.offsetHeight;
    magnifierWidth = magnifier.offsetWidth;
    magnifierHeight = magnifier.offsetHeight;

    magnifier.style.backgroundImage = `url('${mainImage.src}')`;
  
    magnifier.style.backgroundSize = 
        `${imgWidth * ZOOM_FACTOR}px ${imgHeight * ZOOM_FACTOR}px`;
};

if (mainImage.complete) {
    mainImage.onload();
}

imageContainer.ontouchstart = (event) => {
    event.preventDefault(); 
    
    magnifier.style.opacity = 1;
    updateMagnifier(event.touches[0].clientX, event.touches[0].clientY);
};

imageContainer.ontouchmove = (event) => {
    event.preventDefault();
    updateMagnifier(event.touches[0].clientX, event.touches[0].clientY);
};

const hideMagnifier = () => {
    magnifier.style.opacity = 0;
};

imageContainer.ontouchend = hideMagnifier;
imageContainer.ontouchcancel = hideMagnifier;

function updateMagnifier(touchX, touchY) {
    const containerRect = imageContainer.getBoundingClientRect();
    let x = touchX - containerRect.left;
    let y = touchY - containerRect.top;
    if (x < 0) x = 0;
    if (x > imgWidth) x = imgWidth;
    if (y < 0) y = 0;
    if (y > imgHeight) y = imgHeight;
    magnifier.style.left = `${x}px`;
    magnifier.style.top = `${y}px`;

    const bgPosX = -(x * ZOOM_FACTOR - magnifierWidth / 2);
    const bgPosY = -(y * ZOOM_FACTOR - magnifierHeight / 2);

    magnifier.style.backgroundPosition = `${bgPosX}px ${bgPosY}px`;
}