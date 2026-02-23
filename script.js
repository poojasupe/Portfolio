/* =============================================
   SCRIPT.JS — Interactivity & Scroll Animations
   ============================================= */

// ——— Typing Effect ———
const typedTextEl = document.getElementById('typedText');
const phrases = [
    'Full-Stack Apps.',
    'Scalable APIs.',
    'Beautiful UIs.',
    'Cloud Solutions.',
    'Modern Websites.'
];

let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingDelay = 100;

function typeEffect() {
    const currentPhrase = phrases[phraseIndex];

    if (isDeleting) {
        typedTextEl.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
        typingDelay = 50;
    } else {
        typedTextEl.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
        typingDelay = 100;
    }

    if (!isDeleting && charIndex === currentPhrase.length) {
        isDeleting = true;
        typingDelay = 2000; // pause before deleting
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        typingDelay = 400;
    }

    setTimeout(typeEffect, typingDelay);
}

document.addEventListener('DOMContentLoaded', () => {
    setTimeout(typeEffect, 800);
});

// ——— Navbar Scroll Effect ———
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// ——— Active Nav Link on Scroll ———
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

function setActiveLink() {
    const scrollY = window.scrollY + 100;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');

        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === '#' + sectionId) {
                    link.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', setActiveLink);

// ——— Mobile Nav Toggle ———
const navToggle = document.getElementById('navToggle');
const navLinksEl = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('open');
    navLinksEl.classList.toggle('open');
});

// Close mobile nav on link click
navLinksEl.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navToggle.classList.remove('open');
        navLinksEl.classList.remove('open');
    });
});

// ——— Scroll Reveal ———
const revealElements = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right, .skill-category');

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('revealed');

            // Animate skill bars when skill category becomes visible
            if (entry.target.classList.contains('skill-category')) {
                entry.target.querySelectorAll('.skill-progress').forEach(bar => {
                    bar.classList.add('animate');
                });
            }
        }
    });
}, {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
});

revealElements.forEach(el => revealObserver.observe(el));

// ——— Project Filter ———
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Update active button
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.dataset.filter;

        projectCards.forEach((card, index) => {
            card.style.setProperty('--index', index);

            if (filter === 'all' || card.dataset.category === filter) {
                card.classList.remove('hidden');
                // Re-trigger animation
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    card.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
                    card.style.transitionDelay = `${index * 0.08}s`;
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, 10);
            } else {
                card.classList.add('hidden');
            }
        });
    });
});

// ——— Contact Form ———
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const btn = contactForm.querySelector('.btn');
    const originalHTML = btn.innerHTML;

    btn.innerHTML = '<span>Message Sent! ✨</span>';
    btn.style.background = 'linear-gradient(135deg, #22c55e, #16a34a)';

    setTimeout(() => {
        btn.innerHTML = originalHTML;
        btn.style.background = '';
        contactForm.reset();
    }, 3000);
});
