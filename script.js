// Optional JS to trigger animations or effects dynamically

window.addEventListener('DOMContentLoaded', (event) => {
    console.log('Page is fully loaded');
    
    // You can trigger additional animations or events
    setTimeout(() => {
        const startButton = document.querySelector('.start-button');
        startButton.classList.add('pulse');
    }, 3000);
});

// You can also use JS to add hover effects or interactive animations
document.querySelector('.start-button').addEventListener('mouseover', function() {
    this.style.transform = 'scale(1.05)';
});

document.querySelector('.start-button').addEventListener('mouseout', function() {
    this.style.transform = 'scale(1)';
});
