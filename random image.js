const box = document.getElementById('box');
const output = document.getElementById('output');

let dragging = false;
let startX, startY;
let boxStartX, boxStartY;

box.ontouchstart = (e) => {
    dragging = true;
    const touch = e.touches[0];
    startX = touch.clientX;
    startY = touch.clientY;
    boxStartX = box.offsetLeft;
    boxStartY = box.offsetTop;
    box.style.backgroundColor = 'lightcoral';
}

box.ontouchmove = (e) => {
    if (!dragging) return;
    const touch = e.touches[0];
    const nowTouchX = touch.clientX - startX;
    const nowTouchY = touch.clientY - startY;
    box.style.left = boxStartX + nowTouchX + 'px';
    box.style.top = boxStartY + nowTouchY + 'px';
    const hueRange = 360;
    const newHue = Math.floor((touch.clientX / window.innerWidth) * hueRange);
    const newColor = `hsl(${newHue}, 70%, 50%)`;
    document.body.style.backgroundColor = newColor;
}

box.ontouchend = (e) => {
    dragging = false;
    box.style.background = "lightgreen";
};