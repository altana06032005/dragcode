const spinner = document.getElementById('spinner');

let activeItem = null;
let startX = 0; 
let initialRotation = 0; 

spinner.ontouchstart = (e) => {
    activeItem = spinner;
    
    const touch = e.touches[0];
    
    // 1. Запоминаем начальную координату X пальца
    startX = touch.clientX;
    
    // 2. Извлекаем текущий угол поворота из CSS (самый сложный, но важный шаг)
    const transform = getComputedStyle(spinner).transform;
    if (transform !== 'none') {
        // Мы используем DOMMatrix для извлечения угла из матрицы трансформации
        const matrix = new DOMMatrix(transform);
        // atan2(sin_theta, cos_theta) дает угол в радианах.
        initialRotation = Math.atan2(matrix.b, matrix.a) * (180 / Math.PI); 
    } else {
        initialRotation = 0;
    }

    e.preventDefault();
};


// --- ONTOUCHMOVE: ПРИМЕНЕНИЕ ВРАЩЕНИЯ ---

window.ontouchmove = (e) => {
    if (!activeItem) return;

    const touch = e.touches[0];
    
    // 1. Смещение пальца по X от начальной точки
    const dx = touch.clientX - startX;
    
    // 2. Расчет нового угла
    // Коэффициент 0.5: смещение на 1px = поворот на 0.5 градуса (можно изменить)
    const rotationDelta = dx * 0.5;
    const newRotation = initialRotation + rotationDelta; 
    
    // 3. Применение поворота
    activeItem.style.transform = `rotate(${newRotation}deg)`;
    
    output.textContent = `Угол: ${Math.round(newRotation)}°`;

    e.preventDefault();
};


// --- ONTOUCHEND: КОНЕЦ ВРАЩЕНИЯ ---

window.ontouchend = () => {
    if (!activeItem) return;
    
    activeItem.classList.remove('grabbing');
    activeItem = null;
    
    // Обнуляем startX, чтобы при следующем касании он не использовал старое значение
    startX = 0; 
};