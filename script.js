// script.js

// Smooth scrolling
function smoothScroll(target) {
    const element = document.querySelector(target);
    window.scrollTo({
        top: element.getBoundingClientRect().top + window.scrollY,
        behavior: 'smooth'
    });
}

// Reveal animations on scroll
function revealOnScroll() {
    const elements = document.querySelectorAll('.reveal');
    const windowHeight = window.innerHeight;

    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        if (elementTop < windowHeight - 100) {
            element.classList.add('active');
        }
    });
}

// Video modal handling
function openVideoModal(videoId) {
    const modal = document.getElementById(videoId);
    modal.style.display = 'block';
}

function closeVideoModal(videoId) {
    const modal = document.getElementById(videoId);
    modal.style.display = 'none';
}

// Form submission
document.querySelector('form').addEventListener('submit', function(event) {
    event.preventDefault();
    alert('Form submitted!'); // Replace with actual submission logic
});

// Navigation active states
const navLinks = document.querySelectorAll('nav a');
const sections = document.querySelectorAll('section');

function setActiveLink() {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - sectionHeight / 3) {
            current = section.getAttribute('id');
        }
    });
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', () => {
    revealOnScroll();
    setActiveLink();
});

// Mobile menu toggle
const mobileMenuButton = document.querySelector('.mobile-menu-button');
const mobileMenu = document.querySelector('.mobile-menu');

mobileMenuButton.addEventListener('click', () => {
    mobileMenu.classList.toggle('active');
});
