document.addEventListener("DOMContentLoaded", () => {
    const hamburger = document.getElementById("hamburger");
    const navMenu = document.getElementById("nav-menu");
    const closeBtn = document.getElementById("close-btn");

    // Toggle Menu when clicking the hamburger button
    hamburger.addEventListener("click", () => {
        navMenu.classList.toggle("active");
    });

    // Close Menu when clicking the close button
    closeBtn.addEventListener("click", () => {
        navMenu.classList.remove("active");
    });

    // Close menu when clicking outside of it
    document.addEventListener("click", (event) => {
        if (!navMenu.contains(event.target) && !hamburger.contains(event.target)) {
            navMenu.classList.remove("active");
        }
    });
});
