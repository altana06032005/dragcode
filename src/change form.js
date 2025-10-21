const box = document.getElementById('box');
const image = document.getElementById('image');

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
    box.style.backgroundColor = 'lightblue';
}

box.ontouchmove = (e) => {
    if (!dragging) return;
    const touch =e.touches[0];
    const nowTouchX = touch.clientX - startX;
    const nowTouchY = touch.clientY - startY;
    box.style.left = boxStartX + nowTouchX + 'px';
    box.style.top = boxStartY + nowTouchY + 'px';
    const maxBlur = 20;
    const blurValue = Math.floor((1 - (e.touches[0].clientY / window.innerHeight)) * maxBlur);
const newFilter = `blur(${blurValue}px)`;

image.style.filter = newFilter;
}

box.ontouchend = (e) => {
    dragging = false;
    box.style.background = 'darkblue';
};