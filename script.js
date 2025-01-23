const canvas = document.getElementById("heroCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particlesArray = [];

// Particle class
class Particle {
    constructor(x, y, size, color, velocityX, velocityY) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.color = color;
        this.velocityX = velocityX;
        this.velocityY = velocityY;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
        ctx.fillStyle = this.color;
        ctx.fill();
    }

    update() {
        this.x += this.velocityX;
        this.y += this.velocityY;

        // Bounce off edges
        if (this.x + this.size > canvas.width || this.x - this.size < 0) {
            this.velocityX = -this.velocityX;
        }
        if (this.y + this.size > canvas.height || this.y - this.size < 0) {
            this.velocityY = -this.velocityY;
        }
    }
}

// Initialize particles
function initParticles() {
    particlesArray = [];
    for (let i = 0; i < 100; i++) {
        const size = Math.random() * 5 + 2;
        const x = Math.random() * (canvas.width - size * 2) + size;
        const y = Math.random() * (canvas.height - size * 2) + size;
        const color = `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, 0.8)`;
        const velocityX = Math.random() * 1 - 0.5;
        const velocityY = Math.random() * 1 - 0.5;
        particlesArray.push(new Particle(x, y, size, color, velocityX, velocityY));
    }
}

// Animate particles
function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particlesArray.forEach((particle) => {
        particle.update();
        particle.draw();
    });
    connectParticles();
    requestAnimationFrame(animateParticles);
}

// Connect particles with lines
function connectParticles() {
    for (let i = 0; i < particlesArray.length; i++) {
        for (let j = i; j < particlesArray.length; j++) {
            const dx = particlesArray[i].x - particlesArray[j].x;
            const dy = particlesArray[i].y - particlesArray[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 100) {
                ctx.beginPath();
                ctx.strokeStyle = "rgba(255, 255, 255, 0.1)";
                ctx.lineWidth = 1;
                ctx.moveTo(particlesArray[i].x, particlesArray[i].y);
                ctx.lineTo(particlesArray[j].x, particlesArray[j].y);
                ctx.stroke();
            }
        }
    }
}

// Resize canvas on window resize
window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    initParticles();
});

// Start animation
initParticles();
animateParticles();

// Latest updates section
const updates = [
    { text: "We are hiring volunteers, E-mail to apply: research@chirag.cloud ✉️", time: "5 hours ago" },
    { text: "We just launched our official blog-site to post public content 🌐", time: "12 hours ago" },
    { text: "The newsletter services are live now. Subscribe to our newsletter below! 🗞️", time: "34 days ago" },
];

const updatesContainer = document.getElementById('latest-updates');

updates.forEach(update => {
    const updateDiv = document.createElement('div');
    updateDiv.classList.add('update');
    updateDiv.innerHTML = `
        <p><strong>Chirag:</strong> ${update.text}</p>
        <span class="timestamp">${update.time}</span>
    `;
    updatesContainer.appendChild(updateDiv);
});
