document.addEventListener("DOMContentLoaded", () => {
    const navbarHeader = document.getElementById('global-navbar');
    if (!navbarHeader) return; // Safeguard if a page lacks a navbar hook

    navbarHeader.innerHTML = `
        <div class="nav-container">
            <!-- Left Side Logo -->
            <a href="index.html" class="nav-logo">HOLT ROBOTICS</a>

            <!-- Center Site Content Links -->
            <nav class="nav-links">
                <a href="sponsors.html">Sponsors</a>
                <a href="frc.html">RoboRams</a>
            </nav>

            <!-- Right Side Social Media Links -->
            <div class="nav-socials">
                <a href="https://www.facebook.com/holtrobotics/" target="_blank" class="nav-social-btn fb-color" title="Follow our Facebook Page">Facebook</a>
                <a href="https://www.instagram.com/holtrobotics/" target="_blank" class="nav-social-btn ig-color" title="Follow our Instagram Page">Instagram</a>
            </div>
        </div>
    `;
});
