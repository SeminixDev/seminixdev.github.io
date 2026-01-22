// Matrix rain effect
const canvas = document.getElementById('matrixCanvas');
const ctx = canvas.getContext('2d');

let width, height;
let columns;
let fontSize = 16;
let drops = [];

function resizeCanvas() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
    
    // Calculate number of columns
    columns = Math.floor(width / fontSize);
    
    // Reset drops array
    drops = [];
    for (let i = 0; i < columns; i++) {
        drops[i] = Math.random() * height / fontSize;
    }
}

resizeCanvas();
window.addEventListener('resize', resizeCanvas);

// Characters to use - Mix of ASCII and Japanese-like characters
const chars = 'ｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝ0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';

function draw() {
    // Semi-transparent black background for trail effect
    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
    ctx.fillRect(0, 0, width, height);
    
    ctx.font = fontSize + 'px monospace';
    
    for (let i = 0; i < drops.length; i++) {
        // Random character
        const char = chars[Math.floor(Math.random() * chars.length)];
        
        // Calculate position
        const x = i * fontSize;
        const y = drops[i] * fontSize;
        
        // Brightest character at the head
        ctx.fillStyle = '#0F0';
        ctx.shadowBlur = 10;
        ctx.shadowColor = '#0F0';
        ctx.fillText(char, x, y);
        
        // Draw a few trailing characters with decreasing opacity
        for (let j = 1; j <= 5; j++) {
            if (drops[i] - j > 0) {
                const trailY = (drops[i] - j) * fontSize;
                const opacity = 1 - (j * 0.15);
                ctx.fillStyle = `rgba(0, 255, 0, ${opacity})`;
                ctx.shadowBlur = 5;
                const trailChar = chars[Math.floor(Math.random() * chars.length)];
                ctx.fillText(trailChar, x, trailY);
            }
        }
        
        // Reset drop to top randomly
        if (y > height && Math.random() > 0.975) {
            drops[i] = 0;
        }
        
        // Increment Y coordinate
        drops[i]++;
    }
}

// Animation loop
let animationId;
let lastTime = 0;
const fps = 30;
const frameDelay = 1000 / fps;

function animate(currentTime) {
    animationId = requestAnimationFrame(animate);
    
    const deltaTime = currentTime - lastTime;
    
    if (deltaTime >= frameDelay) {
        draw();
        lastTime = currentTime - (deltaTime % frameDelay);
    }
}

animate(0);
