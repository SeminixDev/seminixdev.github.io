// WebGL Shader Implementation
const canvas = document.getElementById('shaderCanvas');
const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');

if (!gl) {
    alert('WebGL not supported');
}

// Resize canvas to fill window
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    gl.viewport(0, 0, canvas.width, canvas.height);
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

// Vertex shader
const vertexShaderSource = `
    attribute vec2 position;
    void main() {
        gl_Position = vec4(position, 0.0, 1.0);
    }
`;

// Fragment shader with plasma effect
const fragmentShaderSource = `
    precision mediump float;
    uniform vec2 resolution;
    uniform float time;
    uniform float intensity;
    uniform float speed;
    uniform float complexity;
    
    void main() {
        vec2 uv = gl_FragCoord.xy / resolution.xy;
        vec2 p = uv * 2.0 - 1.0;
        p.x *= resolution.x / resolution.y;
        
        float t = time * speed;
        
        // Plasma effect
        float v1 = sin(p.x * complexity + t);
        float v2 = sin(complexity * (p.x * sin(t * 0.5) + p.y * cos(t * 0.3)) + t);
        float v3 = sin(sqrt(p.x * p.x + p.y * p.y) * complexity + t);
        float v = (v1 + v2 + v3) / 3.0;
        
        // Color based on plasma value
        vec3 color = vec3(
            0.5 + 0.5 * sin(v * 3.14159 + t),
            0.5 + 0.5 * sin(v * 3.14159 + t + 2.094),
            0.5 + 0.5 * sin(v * 3.14159 + t + 4.189)
        );
        
        // Apply green tint
        color = mix(color, vec3(0.0, 1.0, 0.2), 0.6);
        color *= intensity;
        
        gl_FragColor = vec4(color, 1.0);
    }
`;

// Compile shader
function compileShader(source, type) {
    const shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error('Shader compile error:', gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
    }
    
    return shader;
}

// Create program
const vertexShader = compileShader(vertexShaderSource, gl.VERTEX_SHADER);
const fragmentShader = compileShader(fragmentShaderSource, gl.FRAGMENT_SHADER);
const program = gl.createProgram();
gl.attachShader(program, vertexShader);
gl.attachShader(program, fragmentShader);
gl.linkProgram(program);

if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    console.error('Program link error:', gl.getProgramInfoLog(program));
}

gl.useProgram(program);

// Create vertex buffer
const vertices = new Float32Array([
    -1, -1,
     1, -1,
    -1,  1,
     1,  1
]);

const vertexBuffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

const positionLocation = gl.getAttribLocation(program, 'position');
gl.enableVertexAttribArray(positionLocation);
gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

// Get uniform locations
const resolutionLocation = gl.getUniformLocation(program, 'resolution');
const timeLocation = gl.getUniformLocation(program, 'time');
const intensityLocation = gl.getUniformLocation(program, 'intensity');
const speedLocation = gl.getUniformLocation(program, 'speed');
const complexityLocation = gl.getUniformLocation(program, 'complexity');

// Control values
let intensity = 1.0;
let speed = 1.0;
let complexity = 3.0;

// Setup controls
document.getElementById('intensity').addEventListener('input', (e) => {
    intensity = parseFloat(e.target.value);
    document.getElementById('intensityValue').textContent = intensity.toFixed(1);
});

document.getElementById('speed').addEventListener('input', (e) => {
    speed = parseFloat(e.target.value);
    document.getElementById('speedValue').textContent = speed.toFixed(1);
});

document.getElementById('complexity').addEventListener('input', (e) => {
    complexity = parseFloat(e.target.value);
    document.getElementById('complexityValue').textContent = complexity.toFixed(1);
});

// Animation loop
let startTime = Date.now();

function render() {
    const time = (Date.now() - startTime) * 0.001;
    
    gl.uniform2f(resolutionLocation, canvas.width, canvas.height);
    gl.uniform1f(timeLocation, time);
    gl.uniform1f(intensityLocation, intensity);
    gl.uniform1f(speedLocation, speed);
    gl.uniform1f(complexityLocation, complexity);
    
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    
    requestAnimationFrame(render);
}

render();
