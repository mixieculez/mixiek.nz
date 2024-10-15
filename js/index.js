/*
 * index.js
 * This file contains JavaScript code that is run on the MIXIE KINZ website.
 * Authored by mixieculez and GitHub Copilot.
 * Last updated: 15/10/2024
 */

// Wait for the DOM to be fully loaded before executing the script
document.addEventListener("DOMContentLoaded", function() {
    // Select the footer element
    const footer = document.querySelector(".footer");
    // Select the contact link element
    const contactLink = document.getElementById("contact-link");
    // Array of audio file paths for hover sound functionality
    const audioFiles = [
        'assets/sounds/1.mp3', 'assets/sounds/2.mp3', 'assets/sounds/3.mp3',
        'assets/sounds/4.mp3', 'assets/sounds/5.mp3', 'assets/sounds/6.mp3',
        'assets/sounds/7.mp3', 'assets/sounds/8.mp3', 'assets/sounds/9.mp3',
        'assets/sounds/10.mp3', 'assets/sounds/11.mp3', 'assets/sounds/12.mp3',
        'assets/sounds/13.mp3', 'assets/sounds/14.mp3', 'assets/sounds/15.mp3',
        'assets/sounds/16.mp3'
    ];
    // Variable to keep track of the currently playing audio
    let currentAudio = null;

    // Function to check if the footer is visible in the viewport
    function checkFooterVisibility() {
        const rect = footer.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom >= 0) {
            footer.classList.add("visible");
        }
    }

    // Function to play a random sound from the audioFiles array
    function playRandomSound() {
        if (currentAudio) {
            currentAudio.pause();
            currentAudio.currentTime = 0;
        }
        const randomIndex = Math.floor(Math.random() * audioFiles.length);
        currentAudio = new Audio(audioFiles[randomIndex]);
        currentAudio.play().catch(error => console.error('Audio playback failed:', error));
    }

    // Function to toggle the dropdown menu visibility
    function toggleMenu() {
        const dropdown = document.getElementById('dropdown');
        const backdrop = document.getElementById('backdrop');
        const navLinks = document.querySelectorAll('.dropdown a');

        // Handle the end of the fade-out animation
        function handleAnimationEnd() {
            if (dropdown.classList.contains('fade-out')) {
                dropdown.style.display = 'none';
                backdrop.style.display = 'none';
                dropdown.classList.remove('fade-out');
                navLinks.forEach(link => link.classList.remove('fade-out'));
            }
            dropdown.removeEventListener('animationend', handleAnimationEnd);
        }

        if (dropdown.style.display === 'flex') {
            navLinks.forEach(link => link.classList.add('fade-out'));
            dropdown.classList.add('fade-out');
            backdrop.style.animation = 'fadeOutOpacity 0.6s cubic-bezier(0.68, -0.55, 0.27, 1.55) forwards';
            dropdown.addEventListener('animationend', handleAnimationEnd);
        } else {
            navLinks.forEach(link => link.classList.remove('fade-out'));
            dropdown.style.display = 'flex';
            backdrop.style.display = 'block';
            backdrop.style.animation = 'fadeInOpacity 0.6s cubic-bezier(0.68, -0.55, 0.27, 1.55) forwards';
            navLinks.forEach((link, index) => {
                link.style.animationDelay = `${0.1 * (index + 1)}s`;
            });
        }
    }

    // Function to update the title text and font size based on window width
    function updateTitle() {
        const titleElement = document.querySelector('.title');
        if (window.innerWidth < 768) {
            titleElement.textContent = 'a';
            titleElement.style.fontSize = '5rem';
        } else {
            titleElement.textContent = 'mixie kinz';
            titleElement.style.fontSize = '2.5rem';
        }
    }

    // Function to hide the dropdown menu and backdrop on page load
    function closeDropdownOnLoad() {
        const dropdown = document.getElementById('dropdown');
        const backdrop = document.getElementById('backdrop');
        dropdown.style.display = 'none';
        backdrop.style.display = 'none';
    }

    // Add scroll event listener to check footer visibility
    window.addEventListener("scroll", checkFooterVisibility);
    // Add resize event listener to update the title
    window.addEventListener('resize', updateTitle);
    // Add load event listener to update the title and close the dropdown on load
    window.addEventListener('load', () => {
        updateTitle();
        closeDropdownOnLoad();
    });
    // Add resize event listener to hide the dropdown and backdrop if window width is greater than 768px
    window.addEventListener('resize', function () {
        if (window.innerWidth > 768) {
            const dropdown = document.getElementById('dropdown');
            const backdrop = document.getElementById('backdrop');
            dropdown.style.display = 'none';
            backdrop.style.display = 'none';
        }
    });

    // Add click event listener to the contact link to open mail client
    if (contactLink) {
        contactLink.addEventListener("click", function (event) {
            event.preventDefault();
            window.location.href = "mailto:contact@mixiek.nz";
        });
    }

    // Add mouseenter event listener to elements for hover sound functionality
    document.querySelectorAll('.nav-link, .button, .title, .subscribe-button').forEach(element => {
        element.addEventListener('mouseenter', playRandomSound);
    });

    // Initial check in case the footer is already in view
    checkFooterVisibility();
    window.toggleMenu = toggleMenu;
});
