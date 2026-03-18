// draw.js
const canvas = document.getElementById('drawing-canvas');
const ctx = canvas.getContext('2d');
const wrapper = document.querySelector('.canvas-wrapper');

let isDrawing = false;
let color = '#FF98B8';
let size = 8;
let lastX = 0;
let lastY = 0;

function resizeCanvas() {
    const tempImage = ctx.getImageData(0,0, canvas.width, canvas.height);
    canvas.width = wrapper.clientWidth;
    canvas.height = wrapper.clientHeight;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.putImageData(tempImage, 0, 0);
}
window.addEventListener('resize', resizeCanvas);
setTimeout(resizeCanvas, 50);

function draw(e) {
    if (!isDrawing) return;
    e.preventDefault(); 
    let currentX, currentY;
    if (e.type.includes('touch')) {
        const rect = canvas.getBoundingClientRect();
        currentX = e.touches[0].clientX - rect.left;
        currentY = e.touches[0].clientY - rect.top;
    } else {
        currentX = e.offsetX;
        currentY = e.offsetY;
    }
    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(currentX, currentY);
    ctx.strokeStyle = color;
    ctx.lineWidth = size;
    ctx.stroke();
    lastX = currentX;
    lastY = currentY;
}

canvas.addEventListener('mousedown', (e) => { isDrawing = true; lastX = e.offsetX; lastY = e.offsetY; });
canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseup', () => isDrawing = false);
canvas.addEventListener('mouseout', () => isDrawing = false);

canvas.addEventListener('touchstart', (e) => {
    isDrawing = true;
    const rect = canvas.getBoundingClientRect();
    lastX = e.touches[0].clientX - rect.left;
    lastY = e.touches[0].clientY - rect.top;
});
canvas.addEventListener('touchmove', draw, { passive: false });
canvas.addEventListener('touchend', () => isDrawing = false);
canvas.addEventListener('touchcancel', () => isDrawing = false);

document.querySelectorAll('.color-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.color-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        color = btn.getAttribute('data-color');
    });
});
document.getElementById('brush-size').addEventListener('input', (e) => { size = e.target.value; });
document.getElementById('clear-btn').addEventListener('click', () => { ctx.clearRect(0, 0, canvas.width, canvas.height); });


document.getElementById('save-btn').addEventListener('click', () => {
    const newCanvas = document.createElement("canvas");
    newCanvas.width = canvas.width;
    newCanvas.height = canvas.height;
    const newCtx = newCanvas.getContext("2d");
    
    // Fill white bg
    newCtx.fillStyle = "white";
    newCtx.fillRect(0,0,newCanvas.width, newCanvas.height);
    newCtx.drawImage(canvas, 0, 0);

    // Domhe Watermark
    const img = new Image();
    img.crossOrigin = 'Anonymous';
    img.onload = () => {
        newCtx.globalAlpha = 0.5; // faint watermark
        newCtx.drawImage(img, canvas.width - 60, canvas.height - 60, 50, 50);
        newCtx.globalAlpha = 1.0;
        
        const link = document.createElement('a');
        link.download = 'mi-dibujo-domhe.jpg';
        link.href = newCanvas.toDataURL('image/jpeg', 0.9);
        link.click();
    };
    img.onerror = () => {
        // fallback if image fails to load (offline scenario sometimes block crossOrigin)
        const link = document.createElement('a');
        link.download = 'mi-dibujo-domhe.jpg';
        link.href = newCanvas.toDataURL('image/jpeg', 0.9);
        link.click();
    };
    img.src = 'https://res.cloudinary.com/dwoau0ajc/image/upload/v1753336163/domhe_favicon_to08gb.png';
});
