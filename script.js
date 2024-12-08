// Dot-Connection Animation
const canvas = document.getElementById("dotCanvas");
const ctx = canvas.getContext("2d");

let particles = [];
const mouse = { x: null, y: null, radius: 120 };

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Particle Constructor
class Particle {
    constructor(x, y, size) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.baseX = x;
        this.baseY = y;
        this.dx = 0;
        this.dy = 0;
    }

    draw() {
        ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
    }

    update() {
        this.dx = mouse.x - this.x;
        this.dy = mouse.y - this.y;
        let distance = Math.sqrt(this.dx ** 2 + this.dy ** 2);

        if (distance < mouse.radius) {
            let angle = Math.atan2(this.dy, this.dx);
            this.x -= Math.cos(angle) * 3;
            this.y -= Math.sin(angle) * 3;
        } else {
            this.x += (this.baseX - this.x) * 0.05;
            this.y += (this.baseY - this.y) * 0.05;
        }
    }
}

// Initialize Particles
function initParticles() {
    particles = [];
    const density = Math.min(canvas.width, canvas.height) / 20;

    for (let i = 0; i < density; i++) {
        let size = Math.random() * 2 + 1;
        let x = Math.random() * canvas.width;
        let y = Math.random() * canvas.height;
        particles.push(new Particle(x, y, size));
    }
}

// Connect Particles
function connectParticles() {
    for (let a = 0; a < particles.length; a++) {
        for (let b = a; b < particles.length; b++) {
            let dx = particles[a].x - particles[b].x;
            let dy = particles[a].y - particles[b].y;
            let distance = Math.sqrt(dx ** 2 + dy ** 2);

            if (distance < 100) {
                ctx.strokeStyle = "rgba(255, 255, 255, 0.2)";
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(particles[a].x, particles[a].y);
                ctx.lineTo(particles[b].x, particles[b].y);
                ctx.stroke();
            }
        }
    }
}

// Animation Loop
function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach((particle) => {
        particle.update();
        particle.draw();
    });
    connectParticles();
    requestAnimationFrame(animateParticles);
}

// Mouse Interaction
window.addEventListener("mousemove", (event) => {
    mouse.x = event.x;
    mouse.y = event.y;
});

// Resize Canvas
window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    initParticles();
});

// Initialize and Start Animation
initParticles();
animateParticles();
