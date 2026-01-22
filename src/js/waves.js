// Wave effects implementation
const canvas = document.getElementById('waveCanvas');
const ctx = canvas.getContext('2d');

let width, height;

function resizeCanvas() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

// Wave parameters
const waves = [
    { amplitude: 50, frequency: 0.02, speed: 0.05, offset: 0, color: 'rgba(0, 255, 0, 0.3)' },
    { amplitude: 40, frequency: 0.03, speed: 0.07, offset: 50, color: 'rgba(0, 200, 0, 0.3)' },
    { amplitude: 60, frequency: 0.015, speed: 0.04, offset: 100, color: 'rgba(0, 150, 0, 0.3)' }
];

// Ripples from mouse clicks
const ripples = [];

class Ripple {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.radius = 0;
        this.maxRadius = 300;
        this.speed = 3;
        this.alpha = 1;
    }
    
    update() {
        this.radius += this.speed;
        this.alpha = 1 - (this.radius / this.maxRadius);
        return this.radius < this.maxRadius;
    }
    
    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(0, 255, 0, ${this.alpha * 0.8})`;
        ctx.lineWidth = 2;
        ctx.stroke();
        
        // Inner ripple
        if (this.radius > 20) {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius - 20, 0, Math.PI * 2);
            ctx.strokeStyle = `rgba(0, 255, 0, ${this.alpha * 0.5})`;
            ctx.lineWidth = 1;
            ctx.stroke();
        }
    }
}

// Mouse click handler
canvas.addEventListener('click', (e) => {
    ripples.push(new Ripple(e.clientX, e.clientY));
});

// Draw sine wave
function drawWave(wave, time) {
    ctx.beginPath();
    ctx.moveTo(0, height / 2);
    
    for (let x = 0; x < width; x++) {
        const y = height / 2 + 
                  wave.offset + 
                  Math.sin(x * wave.frequency + time * wave.speed) * wave.amplitude;
        ctx.lineTo(x, y);
    }
    
    ctx.lineTo(width, height);
    ctx.lineTo(0, height);
    ctx.closePath();
    
    ctx.fillStyle = wave.color;
    ctx.fill();
    
    // Draw wave outline
    ctx.beginPath();
    ctx.moveTo(0, height / 2);
    for (let x = 0; x < width; x++) {
        const y = height / 2 + 
                  wave.offset + 
                  Math.sin(x * wave.frequency + time * wave.speed) * wave.amplitude;
        ctx.lineTo(x, y);
    }
    ctx.strokeStyle = wave.color.replace('0.3', '0.8');
    ctx.lineWidth = 2;
    ctx.stroke();
}

// Grid background
function drawGrid() {
    ctx.strokeStyle = 'rgba(0, 255, 0, 0.05)';
    ctx.lineWidth = 1;
    
    // Vertical lines
    for (let x = 0; x < width; x += 50) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
    }
    
    // Horizontal lines
    for (let y = 0; y < height; y += 50) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
    }
}

// Animation loop
let time = 0;

function animate() {
    ctx.clearRect(0, 0, width, height);
    
    // Draw background grid
    drawGrid();
    
    // Draw waves
    waves.forEach(wave => {
        drawWave(wave, time);
    });
    
    // Update and draw ripples
    for (let i = ripples.length - 1; i >= 0; i--) {
        const ripple = ripples[i];
        const alive = ripple.update();
        if (alive) {
            ripple.draw();
        } else {
            ripples.splice(i, 1);
        }
    }
    
    time += 0.01;
    requestAnimationFrame(animate);
}

animate();
