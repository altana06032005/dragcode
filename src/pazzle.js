const button = document.getElementById('draggable-button');
const container = document.getElementById('container');
const display = document.getElementById('percentage-display');

let isDragging = false;
let startX = 0;
let initialButtonLeft = 0;
const containerWidth = container.clientWidth - button.clientWidth; // Максимальное расстояние для перетаскивания

// 1. touchstart: Начинаем перетаскивание
button.addEventListener('touchstart', (event) => {
    // Предотвращаем стандартные действия браузера (например, скроллинг)
    event.preventDefault(); 
    
    // Получаем текущие координаты касания
    startX = event.touches[0].clientX;
    
    // Запоминаем текущее положение кнопки (смещение `left`)
    // getComputedStyle возвращает текущие вычисленные стили
    const style = window.getComputedStyle(button);
    initialButtonLeft = parseFloat(style.left); 
    
    isDragging = true;
    button.style.cursor = 'grabbing';
}, false);

// 2. touchmove: Движение перетаскивания
button.addEventListener('touchmove', (event) => {
    if (!isDragging) return;

    // Предотвращаем стандартные действия
    event.preventDefault();

    // Получаем текущие координаты касания
    const currentX = event.touches[0].clientX;
    
    // Вычисляем смещение по X
    const deltaX = currentX - startX;
    
    // Вычисляем новое положение кнопки
    let newLeft = initialButtonLeft + deltaX;

    // Ограничиваем движение: не выходит за границы контейнера (от 0 до containerWidth)
    if (newLeft < 0) {
        newLeft = 0;
    } else if (newLeft > containerWidth) {
        newLeft = containerWidth;
    }

    // Применяем новое положение
    button.style.left = newLeft + 'px';
    
    // Рассчитываем процент
    // newLeft / containerWidth даст значение от 0 до 1
    const percentage = Math.round((newLeft / containerWidth) * 100);
    
    // Обновляем отображение
    button.textContent = `${percentage}%`;
    display.textContent = `Процент: ${percentage}%`;
}, false);

// 3. touchend/touchcancel: Завершение перетаскивания
const endDrag = () => {
    isDragging = false;
    button.style.cursor = 'grab';
};

button.addEventListener('touchend', endDrag, false);
button.addEventListener('touchcancel', endDrag, false);