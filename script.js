// Vault Phoenix Main Website Script
console.log('🌟 Vault Phoenix Main Website Loading...');

// Global state
let isScrolled = false;

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Main website initialized');
    
    // Initialize all website features
    initializeScrollEffects();
    initializeNavigation();
    initializeImageGallery();
    initializeCountdown();
    initializeAnimations();
    initializeMobileMenu();
    
    console.log('✅ All main website features loaded');
});

// Scroll Effects
function initializeScrollEffects() {
    const navbar = document.getElementById('navbar');
    const scrollElements = document.querySelectorAll('.scroll-reveal');

    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 50 && !isScrolled) {
            navbar.classList.add('scrolled');
            isScrolled = true;
        } else if (scrollTop <= 50 && isScrolled) {
            navbar.classList.remove('scrolled');
            isScrolled = false;
        }
    });

    // Intersection Observer for scroll reveals
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    scrollElements.forEach(el => {
        revealObserver.observe(el);
    });
}

// Navigation
function initializeNavigation() {
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Mobile Menu
function initializeMobileMenu() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            mobileMenuBtn.classList.toggle('active');
        });

        // Close menu when clicking on a link
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                mobileMenuBtn.classList.remove('active');
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!navLinks.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
                navLinks.classList.remove('active');
                mobileMenuBtn.classList.remove('active');
            }
        });
    }
}

// Image Gallery for App Showcase
function initializeImageGallery() {
    console.log('🖼️ Initializing image gallery...');
    
    // Phone gallery functionality
    const thumbnails = document.querySelectorAll('.simple-thumb');
    thumbnails.forEach(thumb => {
        thumb.addEventListener('click', () => {
            thumbnails.forEach(t => t.classList.remove('active'));
            thumb.classList.add('active');
        });
    });
}

// Global function for changing images (called from HTML)
function changeImage(imageSrc, altText) {
    console.log('🔄 Changing image to:', imageSrc);
    const mainScreenshot = document.getElementById('mainScreenshot');
    if (mainScreenshot) {
        mainScreenshot.src = imageSrc;
        mainScreenshot.alt = altText;
        
        // Update active thumbnail
        document.querySelectorAll('.simple-thumb').forEach(thumb => {
            thumb.classList.remove('active');
            const img = thumb.querySelector('img');
            if (img && img.src.includes(imageSrc.split('/').pop())) {
                thumb.classList.add('active');
            }
        });
    }
}

// Countdown Timer for Ember Token
function initializeCountdown() {
    console.log('⏰ Initializing countdown timer...');
    
    // Set target date (30 days from now)
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + 30);
    targetDate.setHours(23, 59, 59, 999);

    function updateCountdown() {
        const now = new Date().getTime();
        const distance = targetDate.getTime() - now;

        if (distance > 0) {
            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            // Update countdown elements
            const daysEl = document.getElementById('ember-days');
            const hoursEl = document.getElementById('ember-hours');
            const minutesEl = document.getElementById('ember-minutes');
            const secondsEl = document.getElementById('ember-seconds');

            if (daysEl) daysEl.textContent = days.toString().padStart(2, '0');
            if (hoursEl) hoursEl.textContent = hours.toString().padStart(2, '0');
            if (minutesEl) minutesEl.textContent = minutes.toString().padStart(2, '0');
            if (secondsEl) secondsEl.textContent = seconds.toString().padStart(2, '0');
        } else {
            // Countdown finished
            const countdownElements = ['ember-days', 'ember-hours', 'ember-minutes', 'ember-seconds'];
            countdownElements.forEach(id => {
                const el = document.getElementById(id);
                if (el) el.textContent = '00';
            });
        }
    }

    // Update countdown immediately and then every second
    updateCountdown();
    setInterval(updateCountdown, 1000);
}

// Animations
function initializeAnimations() {
    console.log('✨ Initializing animations...');
    
    // Staggered animations for elements with stagger classes
    const staggerElements = document.querySelectorAll('[class*="stagger-"]');
    staggerElements.forEach((el, index) => {
        const staggerClass = Array.from(el.classList).find(cls => cls.startsWith('stagger-'));
        const staggerNumber = staggerClass ? parseInt(staggerClass.split('-')[1]) : 0;
        
        // Add delay based on stagger number
        el.style.animationDelay = `${staggerNumber * 0.2}s`;
    });

    // Fade in animations
    const fadeElements = document.querySelectorAll('.fade-in');
    const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1
    });

    fadeElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        fadeObserver.observe(el);
    });

    // Floating animation for hero elements
    const floatingElements = document.querySelectorAll('.floating-elements .floating-coin');
    floatingElements.forEach((coin, index) => {
        coin.style.animationDelay = `${index * 0.5}s`;
    });
}

// Utility Functions
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

function debounce(func, wait, immediate) {
    let timeout;
    return function() {
        const context = this;
        const args = arguments;
        const later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

// Performance monitoring
function logPerformance() {
    if (window.performance) {
        const perfData = window.performance.timing;
        const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
        console.log(`📊 Page load time: ${pageLoadTime}ms`);
    }
}

// Log performance when page is fully loaded
window.addEventListener('load', logPerformance);

// Export functions for global access
window.changeImage = changeImage;

console.log('✅ Main website script loaded successfully');
