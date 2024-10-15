//
// scripts.js
// This file contains JavaScript code that is run on the MIXIE KINZ website.
// Authored by mixieculez and GitHub Copilot.
// Last updated: 12/10/2024
//

document.addEventListener("DOMContentLoaded", function() {
    const footer = document.querySelector(".footer");

    function checkFooterVisibility() {
        const rect = footer.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom >= 0) {
            footer.classList.add("visible");
        }
    }

    window.addEventListener("scroll", checkFooterVisibility);
    checkFooterVisibility(); // Initial check in case the footer is already in view

    const contactLink = document.getElementById("contact-link");
    if (contactLink) {
        contactLink.addEventListener("click", function(event) {
            event.preventDefault();
            window.location.href = "mailto:contact@mixiek.nz";
        });
    }

    // Hover sound functionality
    const audioFiles = [
        'assets/sounds/1.mp3',
        'assets/sounds/2.mp3',
        'assets/sounds/3.mp3',
        'assets/sounds/4.mp3',
        'assets/sounds/5.mp3',
        'assets/sounds/6.mp3',
        'assets/sounds/7.mp3',
        'assets/sounds/8.mp3',
        'assets/sounds/9.mp3',
        'assets/sounds/10.mp3',
        'assets/sounds/11.mp3',
        'assets/sounds/12.mp3',
        'assets/sounds/13.mp3',
        'assets/sounds/14.mp3',
        'assets/sounds/15.mp3',
        'assets/sounds/16.mp3'
    ];

    let currentAudio = null;

    function playRandomSound() {
        if (currentAudio) {
            currentAudio.pause();
            currentAudio.currentTime = 0;
        }
        const randomIndex = Math.floor(Math.random() * audioFiles.length);
        currentAudio = new Audio(audioFiles[randomIndex]);
        currentAudio.play().catch(error => console.error('Audio playback failed:', error));
    }

    const elements = document.querySelectorAll('.nav-link, .button, .title, .subscribe-button');
    elements.forEach(element => {
        element.addEventListener('mouseenter', playRandomSound);
    });
});
