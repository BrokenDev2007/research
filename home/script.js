document.addEventListener("DOMContentLoaded", function() {
    // Create a terminal instance
    const terminalElement = document.getElementById('terminal');
    const terminal = new Terminal();
    terminal.open(terminalElement); // Attach terminal to the div

    // SSH connection configuration
    const ssh = new SSHX({
        username: 'YOUR_USERNAME', // Replace with your VPS username
        password: 'YOUR_PASSWORD', // Replace with your VPS password
        host: 'YOUR_VPS_IP', // Replace with your VPS IP address
        port: 22, // Default SSH port
        terminal: terminal // Pass the terminal instance
    });

    // Connect to the VPS
    ssh.connect().then(() => {
        console.log('Connected to VPS');
    }).catch(err => {
        console.error('Connection error:', err);
    });
});
