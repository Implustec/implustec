// TABS LOGIC
function openTab(evt, tabName) {
    const tabContents = document.getElementsByClassName("tab-content");
    for (let i = 0; i < tabContents.length; i++) tabContents[i].classList.remove("active");
    const tabBtns = document.getElementsByClassName("tab-btn");
    for (let i = 0; i < tabBtns.length; i++) tabBtns[i].classList.remove("active");
    document.getElementById(tabName).classList.add("active");
    evt.currentTarget.classList.add("active");
}

// CALCULATOR LOGIC
function calculateTotal() {
    const checkboxes = document.querySelectorAll('.calc-container input[type="checkbox"]');
    let total = 0;
    checkboxes.forEach(cb => { if (cb.checked) total += parseInt(cb.value); });
    document.getElementById('total-val').innerText = `$${total} USD`;
}

// AI DEMO SIMULATION
function runAiDemo() {
    const prompt = document.getElementById('ai-prompt').value;
    const output = document.getElementById('ai-output');
    if(!prompt) return;
    output.style.display = 'block';
    output.innerText = '> Inicializando motor Python/Flask...\n> Conectando a pipeline de Gemini/Claude...\n> Resultado procesado exitosamente para: "' + prompt + '"';
}

// FAQ TOGGLE
function toggleFaq(element) {
    const answer = element.nextElementSibling;
    const isVisible = answer.style.display === 'block';
    answer.style.display = isVisible ? 'none' : 'block';
}

// INTERACTIVE CANVAS (RED NEURONAL Y PARTÍCULAS)
const canvas = document.getElementById('bg-canvas');
const ctx = canvas.getContext('2d');
let particlesArray = [];
const numberOfParticles = 85;

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

class Particle {
    constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 2 + 1;
    this.speedX = (Math.random() - 0.5) * 1.2;
    this.speedY = (Math.random() - 0.5) * 1.2;
    }
    update() {
    this.x += this.speedX;
    this.y += this.speedY;
    if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
    if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
    }
    draw() {
    ctx.fillStyle = '#00f0ff';
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
    }
}

function initParticles() {
    particlesArray = [];
    for (let i = 0; i < numberOfParticles; i++) {
    particlesArray.push(new Particle());
    }
}
initParticles();

function connectParticles() {
    for (let a = 0; a < particlesArray.length; a++) {
    for (let b = a; b < particlesArray.length; b++) {
        let dx = particlesArray[a].x - particlesArray[b].x;
        let dy = particlesArray[a].y - particlesArray[b].y;
        let distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 130) {
        ctx.strokeStyle = `rgba(0, 240, 255, ${1 - distance / 130})`;
        ctx.lineWidth = 0.5;
        ctx.beginPath();
        ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
        ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
        ctx.stroke();
        }
    }
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < particlesArray.length; i++) {
    particlesArray[i].update();
    particlesArray[i].draw();
    }
    connectParticles();
    requestAnimationFrame(animate);
}
animate();