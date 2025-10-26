// ============================================
// SHARED JAVASCRIPT FOR VAULT PHOENIX
// ============================================
// This file contains shared functionality used across multiple pages
// including mobile navigation, scroll effects, animations, and countdown timer

(function() {
    'use strict';

    // ============================================
    // MOBILE MENU SYSTEM
    // ============================================
    
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileMenuClose = document.getElementById('mobile-menu-close');
    const navLinks = document.querySelectorAll('.nav-links a');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-links a');

    // Toggle mobile menu
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            const isExpanded = this.getAttribute('aria-expanded') === 'true';
            this.setAttribute('aria-expanded', !isExpanded);
            mobileMenu.classList.toggle('active');
            document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
        });
    }

    // Close mobile menu when clicking close button
    if (mobileMenuClose && mobileMenu) {
        mobileMenuClose.addEventListener('click', function() {
            mobileMenu.classList.remove('active');
            if (mobileMenuBtn) {
                mobileMenuBtn.setAttribute('aria-expanded', 'false');
            }
            document.body.style.overflow = '';
        });
    }

    // Close mobile menu when clicking nav links (desktop)
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (mobileMenu && mobileMenu.classList.contains('active')) {
                mobileMenu.classList.remove('active');
                if (mobileMenuBtn) {
                    mobileMenuBtn.setAttribute('aria-expanded', 'false');
                }
                document.body.style.overflow = '';
            }
        });
    });

    // Close mobile menu when clicking mobile nav links
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (mobileMenu && mobileMenu.classList.contains('active')) {
                mobileMenu.classList.remove('active');
                if (mobileMenuBtn) {
                    mobileMenuBtn.setAttribute('aria-expanded', 'false');
                }
                document.body.style.overflow = '';
            }
        });
    });

    // Close mobile menu on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && mobileMenu && mobileMenu.classList.contains('active')) {
            mobileMenu.classList.remove('active');
            if (mobileMenuBtn) {
                mobileMenuBtn.setAttribute('aria-expanded', 'false');
            }
            document.body.style.overflow = '';
        }
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (mobileMenu && mobileMenu.classList.contains('active')) {
            if (!mobileMenu.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
                mobileMenu.classList.remove('active');
                if (mobileMenuBtn) {
                    mobileMenuBtn.setAttribute('aria-expanded', 'false');
                }
                document.body.style.overflow = '';
            }
        }
    });

    // ============================================
    // NAVBAR SMOOTH SCROLL TRANSITION
    // Gradually changes navbar from ember gradient to black
    // ============================================
    
    const navbar = document.querySelector('.navbar');
    let lastScrollTop = 0;
    let scrollTimeout;
    const transitionDistance = 400; // Pixels over which transition happens

    function handleNavbarScroll() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (navbar) {
            // Calculate progress (0 to 1) over the transition distance
            const progress = Math.min(scrollTop / transitionDistance, 1);
            
            // Interpolate between ember colors and black
            // Start: ember gradient colors
            const emberBrown = { r: 45, g: 24, b: 16, a: 0.95 };
            const emberDeep = { r: 69, g: 26, b: 3, a: 0.92 };
            const emberRust = { r: 124, g: 45, b: 18, a: 0.90 };
            const emberRed = { r: 215, g: 51, b: 39, a: 0.85 };
            
            // End: black gradient colors
            const black1 = { r: 15, g: 15, b: 15, a: 0.98 };
            const black2 = { r: 20, g: 20, b: 20, a: 0.98 };
            const black3 = { r: 23, g: 23, b: 23, a: 0.98 };
            const black4 = { r: 26, g: 26, b: 26, a: 0.98 };
            
            // Interpolate each color stop
            const c1 = {
                r: Math.round(emberBrown.r + (black1.r - emberBrown.r) * progress),
                g: Math.round(emberBrown.g + (black1.g - emberBrown.g) * progress),
                b: Math.round(emberBrown.b + (black1.b - emberBrown.b) * progress),
                a: emberBrown.a + (black1.a - emberBrown.a) * progress
            };
            const c2 = {
                r: Math.round(emberDeep.r + (black2.r - emberDeep.r) * progress),
                g: Math.round(emberDeep.g + (black2.g - emberDeep.g) * progress),
                b: Math.round(emberDeep.b + (black2.b - emberDeep.b) * progress),
                a: emberDeep.a + (black2.a - emberDeep.a) * progress
            };
            const c3 = {
                r: Math.round(emberRust.r + (black3.r - emberRust.r) * progress),
                g: Math.round(emberRust.g + (black3.g - emberRust.g) * progress),
                b: Math.round(emberRust.b + (black3.b - emberRust.b) * progress),
                a: emberRust.a + (black3.a - emberRust.a) * progress
            };
            const c4 = {
                r: Math.round(emberRed.r + (black4.r - emberRed.r) * progress),
                g: Math.round(emberRed.g + (black4.g - emberRed.g) * progress),
                b: Math.round(emberRed.b + (black4.b - emberRed.b) * progress),
                a: emberRed.a + (black4.a - emberRed.a) * progress
            };
            
            // Create smooth gradient
            const gradient = `linear-gradient(135deg, 
                rgba(${c1.r}, ${c1.g}, ${c1.b}, ${c1.a}) 0%, 
                rgba(${c2.r}, ${c2.g}, ${c2.b}, ${c2.a}) 30%, 
                rgba(${c3.r}, ${c3.g}, ${c3.b}, ${c3.a}) 60%, 
                rgba(${c4.r}, ${c4.g}, ${c4.b}, ${c4.a}) 100%)`;
            
            navbar.style.background = gradient;
            
            // Interpolate border color (golden to red)
            const borderStart = { r: 240, g: 165, b: 0, a: 0.4 };
            const borderEnd = { r: 215, g: 51, b: 39, a: 0.3 };
            const borderColor = {
                r: Math.round(borderStart.r + (borderEnd.r - borderStart.r) * progress),
                g: Math.round(borderStart.g + (borderEnd.g - borderStart.g) * progress),
                b: Math.round(borderStart.b + (borderEnd.b - borderStart.b) * progress),
                a: borderStart.a + (borderEnd.a - borderStart.a) * progress
            };
            navbar.style.borderBottom = `2px solid rgba(${borderColor.r}, ${borderColor.g}, ${borderColor.b}, ${borderColor.a})`;
            
            // Interpolate shadow
            const shadowStart = { r: 215, g: 51, b: 39, a: 0.3 };
            const shadowEnd = { r: 0, g: 0, b: 0, a: 0.6 };
            const shadowColor = {
                r: Math.round(shadowStart.r + (shadowEnd.r - shadowStart.r) * progress),
                g: Math.round(shadowStart.g + (shadowEnd.g - shadowStart.g) * progress),
                b: Math.round(shadowStart.b + (shadowEnd.b - shadowStart.b) * progress),
                a: shadowStart.a + (shadowEnd.a - shadowStart.a) * progress
            };
            const shadowBlur = 4 + (progress * 2); // 4px to 6px
            const shadowSpread = 20 + (progress * 10); // 20px to 30px
            navbar.style.boxShadow = `0 ${shadowBlur}px ${shadowSpread}px rgba(${shadowColor.r}, ${shadowColor.g}, ${shadowColor.b}, ${shadowColor.a})`;
        }
        
        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    }

    // Use requestAnimationFrame for smooth 60fps transitions
    window.addEventListener('scroll', function() {
        if (scrollTimeout) {
            window.cancelAnimationFrame(scrollTimeout);
        }
        scrollTimeout = window.requestAnimationFrame(handleNavbarScroll);
    }, { passive: true });

    // ============================================
    // SMOOTH SCROLLING FOR ANCHOR LINKS
    // ============================================
    
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Skip if it's just "#" or empty
            if (!href || href === '#') return;
            
            const targetElement = document.querySelector(href);
            
            if (targetElement) {
                e.preventDefault();
                
                // Get navbar height for offset
                const navbarHeight = navbar ? navbar.offsetHeight : 80;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });

                // Update URL without jumping
                if (history.pushState) {
                    history.pushState(null, null, href);
                }
            }
        });
    });

    // ============================================
    // SCROLL REVEAL ANIMATIONS
    // ============================================
    
    // Create intersection observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optional: Stop observing after animation
                // observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe elements with scroll-reveal class
    const revealElements = document.querySelectorAll('.scroll-reveal');
    revealElements.forEach(element => {
        observer.observe(element);
    });

    // Additional observer for fade-in-up animations
    const fadeUpElements = document.querySelectorAll('.fade-in-up');
    fadeUpElements.forEach(element => {
        observer.observe(element);
    });

    // Additional observer for slide-in animations
    const slideInElements = document.querySelectorAll('.slide-in-left, .slide-in-right');
    slideInElements.forEach(element => {
        observer.observe(element);
    });

    // ============================================
    // UNIVERSAL COUNTDOWN TIMER
    // ============================================
    
    function initializeCountdown() {
        // Set the target date to November 1, 2025
        const targetDate = new Date('November 1, 2025 00:00:00 UTC');
        
        function updateCountdown() {
            const now = new Date().getTime();
            const distance = targetDate.getTime() - now;
            
            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);
            
            // Update all possible countdown element IDs (works for both pages)
            const elementIds = [
                // Main page countdown
                { days: 'main-days', hours: 'main-hours', minutes: 'main-minutes', seconds: 'main-seconds' },
                // Ember token page countdown
                { days: 'countdown-days', hours: 'countdown-hours', minutes: 'countdown-minutes', seconds: 'countdown-seconds' }
            ];
            
            elementIds.forEach(ids => {
                const daysEl = document.getElementById(ids.days);
                const hoursEl = document.getElementById(ids.hours);
                const minutesEl = document.getElementById(ids.minutes);
                const secondsEl = document.getElementById(ids.seconds);
                
                if (distance < 0) {
                    // Countdown finished
                    if (daysEl) daysEl.textContent = '00';
                    if (hoursEl) hoursEl.textContent = '00';
                    if (minutesEl) minutesEl.textContent = '00';
                    if (secondsEl) secondsEl.textContent = '00';
                } else {
                    // Update countdown
                    if (daysEl) daysEl.textContent = days.toString().padStart(2, '0');
                    if (hoursEl) hoursEl.textContent = hours.toString().padStart(2, '0');
                    if (minutesEl) minutesEl.textContent = minutes.toString().padStart(2, '0');
                    if (secondsEl) secondsEl.textContent = seconds.toString().padStart(2, '0');
                }
            });
        }
        
        // Update immediately and then every second
        updateCountdown();
        setInterval(updateCountdown, 1000);
    }

    // ============================================
    // UTILITY FUNCTIONS
    // ============================================
    
    // Debounce function for performance optimization
    window.debounce = function(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    };

    // Throttle function for performance optimization
    window.throttle = function(func, limit) {
        let inThrottle;
        return function(...args) {
            if (!inThrottle) {
                func.apply(this, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    };

    // Check if element is in viewport
    window.isInViewport = function(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    };

    // ============================================
    // RESPONSIVE HANDLING
    // ============================================
    
    let resizeTimeout;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(function() {
            // Close mobile menu on desktop resize
            if (window.innerWidth > 768 && mobileMenu && mobileMenu.classList.contains('active')) {
                mobileMenu.classList.remove('active');
                if (mobileMenuBtn) {
                    mobileMenuBtn.setAttribute('aria-expanded', 'false');
                }
                document.body.style.overflow = '';
            }
        }, 250);
    });

    // ============================================
    // INITIALIZATION
    // ============================================
    
    // Run on DOM content loaded
    function init() {
        console.log('Vault Phoenix Shared Scripts Initialized');
        
        // Initial navbar state
        handleNavbarScroll();
        
        // Initialize universal countdown timer
        initializeCountdown();
        
        // Add loaded class to body for CSS transitions
        document.body.classList.add('loaded');
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();
