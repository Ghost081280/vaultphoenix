// ============================================
// SHARED JAVASCRIPT FOR VAULT PHOENIX
// ============================================
// This file contains shared functionality used across multiple pages
// including mobile navigation, scroll effects, animations, countdown timer, and cookie consent

(function() {
    'use strict';

    // ============================================
    // MOBILE MENU SYSTEM - FIXED FOR NEW HTML STRUCTURE
    // ============================================
    
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileMenuOverlay = document.getElementById('mobile-menu-overlay');
    const mobileMenuClose = document.getElementById('mobile-menu-close');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-links a');

    // Toggle mobile menu
    if (mobileMenuBtn && mobileMenu && mobileMenuOverlay) {
        mobileMenuBtn.addEventListener('click', function() {
            const isExpanded = this.getAttribute('aria-expanded') === 'true';
            this.setAttribute('aria-expanded', !isExpanded);
            mobileMenu.classList.toggle('active');
            mobileMenuOverlay.classList.toggle('active');
            document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
        });
    }

    // Close mobile menu when clicking close button
    if (mobileMenuClose && mobileMenu && mobileMenuOverlay) {
        mobileMenuClose.addEventListener('click', function() {
            mobileMenu.classList.remove('active');
            mobileMenuOverlay.classList.remove('active');
            if (mobileMenuBtn) {
                mobileMenuBtn.setAttribute('aria-expanded', 'false');
            }
            document.body.style.overflow = '';
        });
    }

    // Close mobile menu when clicking overlay
    if (mobileMenuOverlay && mobileMenu) {
        mobileMenuOverlay.addEventListener('click', function() {
            mobileMenu.classList.remove('active');
            mobileMenuOverlay.classList.remove('active');
            if (mobileMenuBtn) {
                mobileMenuBtn.setAttribute('aria-expanded', 'false');
            }
            document.body.style.overflow = '';
        });
    }

    // Close mobile menu when clicking mobile nav links
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (mobileMenu && mobileMenu.classList.contains('active')) {
                mobileMenu.classList.remove('active');
                if (mobileMenuOverlay) {
                    mobileMenuOverlay.classList.remove('active');
                }
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
            if (mobileMenuOverlay) {
                mobileMenuOverlay.classList.remove('active');
            }
            if (mobileMenuBtn) {
                mobileMenuBtn.setAttribute('aria-expanded', 'false');
            }
            document.body.style.overflow = '';
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
            const emberBrown = { r: 45, g: 24, b: 16, a: 0.95 };
            const emberDeep = { r: 69, g: 26, b: 3, a: 0.92 };
            const emberRust = { r: 124, g: 45, b: 18, a: 0.90 };
            const emberRed = { r: 215, g: 51, b: 39, a: 0.85 };
            
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
            
            // Interpolate border color
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
            const shadowBlur = 4 + (progress * 2);
            const shadowSpread = 20 + (progress * 10);
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
    // UNIVERSAL COUNTDOWN TIMER
    // Works for both main page and ember token page
    // ============================================
    
    function initializeUniversalCountdown() {
        console.log('🔥 COUNTDOWN: Initializing universal countdown timer...');
        
        // Target date: November 1, 2025 at midnight UTC
        const targetDate = new Date('November 1, 2025 00:00:00 UTC');
        console.log('🔥 COUNTDOWN: Target date set to:', targetDate.toString());
        
        // Find ALL possible countdown elements on the page
        const countdownElements = {
            // Main page countdown (in ember token section)
            mainDays: document.getElementById('main-days'),
            mainHours: document.getElementById('main-hours'),
            mainMinutes: document.getElementById('main-minutes'),
            mainSeconds: document.getElementById('main-seconds'),
            
            // Ember page countdown (in presale section)
            emberDays: document.getElementById('days'),
            emberHours: document.getElementById('hours'),
            emberMinutes: document.getElementById('minutes'),
            emberSeconds: document.getElementById('seconds'),
            
            // Ember page countdown (alternative naming)
            countdownDays: document.getElementById('countdown-days'),
            countdownHours: document.getElementById('countdown-hours'),
            countdownMinutes: document.getElementById('countdown-minutes'),
            countdownSeconds: document.getElementById('countdown-seconds')
        };
        
        console.log('🔥 COUNTDOWN: Found elements:', {
            mainPage: {
                days: !!countdownElements.mainDays,
                hours: !!countdownElements.mainHours,
                minutes: !!countdownElements.mainMinutes,
                seconds: !!countdownElements.mainSeconds
            },
            emberPage_days: {
                days: !!countdownElements.emberDays,
                hours: !!countdownElements.emberHours,
                minutes: !!countdownElements.emberMinutes,
                seconds: !!countdownElements.emberSeconds
            },
            emberPage_countdown: {
                days: !!countdownElements.countdownDays,
                hours: !!countdownElements.countdownHours,
                minutes: !!countdownElements.countdownMinutes,
                seconds: !!countdownElements.countdownSeconds
            }
        });
        
        // Check if ANY countdown elements exist
        const hasAnyCountdown = Object.values(countdownElements).some(el => el !== null);
        
        if (!hasAnyCountdown) {
            console.log('🔥 COUNTDOWN: No countdown elements found on this page');
            return false;
        }
        
        console.log('🔥 COUNTDOWN: Starting countdown update loop...');
        
        function updateCountdown() {
            const now = new Date().getTime();
            const distance = targetDate.getTime() - now;
            
            // Calculate time components
            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);
            
            // Format with leading zeros
            const formattedDays = days.toString().padStart(2, '0');
            const formattedHours = hours.toString().padStart(2, '0');
            const formattedMinutes = minutes.toString().padStart(2, '0');
            const formattedSeconds = seconds.toString().padStart(2, '0');
            
            // Handle countdown expiration
            if (distance < 0) {
                Object.entries(countdownElements).forEach(([key, element]) => {
                    if (element) {
                        element.textContent = '00';
                    }
                });
                console.log('🔥 COUNTDOWN: Expired! All elements set to 00');
                return;
            }
            
            // Update all countdown elements
            if (countdownElements.mainDays) countdownElements.mainDays.textContent = formattedDays;
            if (countdownElements.mainHours) countdownElements.mainHours.textContent = formattedHours;
            if (countdownElements.mainMinutes) countdownElements.mainMinutes.textContent = formattedMinutes;
            if (countdownElements.mainSeconds) countdownElements.mainSeconds.textContent = formattedSeconds;
            
            if (countdownElements.emberDays) countdownElements.emberDays.textContent = formattedDays;
            if (countdownElements.emberHours) countdownElements.emberHours.textContent = formattedHours;
            if (countdownElements.emberMinutes) countdownElements.emberMinutes.textContent = formattedMinutes;
            if (countdownElements.emberSeconds) countdownElements.emberSeconds.textContent = formattedSeconds;
            
            if (countdownElements.countdownDays) countdownElements.countdownDays.textContent = formattedDays;
            if (countdownElements.countdownHours) countdownElements.countdownHours.textContent = formattedHours;
            if (countdownElements.countdownMinutes) countdownElements.countdownMinutes.textContent = formattedMinutes;
            if (countdownElements.countdownSeconds) countdownElements.countdownSeconds.textContent = formattedSeconds;
        }
        
        // Update immediately
        updateCountdown();
        console.log('🔥 COUNTDOWN: Initial update complete');
        
        // Update every second
        const countdownInterval = setInterval(updateCountdown, 1000);
        console.log('🔥 COUNTDOWN: Update interval set (every 1 second)');
        
        // Store interval ID globally
        window.countdownInterval = countdownInterval;
        
        console.log('🔥 COUNTDOWN: ✅ Universal countdown successfully initialized!');
        return true;
    }
    
    // Expose the countdown function globally
    window.initializeUniversalCountdown = initializeUniversalCountdown;

    // ============================================
    // COOKIE CONSENT BANNER - GDPR COMPLIANT
    // ============================================
    
    function initializeCookieConsent() {
        // Check if user has already made a choice
        const cookieConsent = localStorage.getItem('vaultphoenix_cookie_consent');
        
        if (cookieConsent !== null) {
            console.log('🍪 Cookie consent already recorded:', cookieConsent);
            return; // User has already accepted or declined
        }
        
        // Create cookie consent banner
        const consentBanner = document.createElement('div');
        consentBanner.className = 'cookie-consent-banner';
        consentBanner.setAttribute('role', 'dialog');
        consentBanner.setAttribute('aria-label', 'Cookie consent banner');
        consentBanner.setAttribute('aria-live', 'polite');
        
        consentBanner.innerHTML = `
            <div class="cookie-consent-content">
                <div class="cookie-consent-icon">
                    🍪
                </div>
                <div class="cookie-consent-text">
                    <h4>We Value Your Privacy</h4>
                    <p>We use cookies to enhance your browsing experience, analyze site traffic, and personalize content. By clicking "Accept", you consent to our use of cookies.</p>
                </div>
                <div class="cookie-consent-buttons">
                    <button class="cookie-btn cookie-accept" aria-label="Accept cookies">
                        Accept
                    </button>
                    <button class="cookie-btn cookie-decline" aria-label="Decline cookies">
                        Decline
                    </button>
                    <a href="#privacy-policy" class="cookie-privacy-link" aria-label="View privacy policy">
                        Privacy Policy
                    </a>
                </div>
            </div>
        `;
        
        document.body.appendChild(consentBanner);
        
        // Show banner with animation
        setTimeout(() => {
            consentBanner.classList.add('show');
        }, 500);
        
        // Handle Accept button
        const acceptBtn = consentBanner.querySelector('.cookie-accept');
        acceptBtn.addEventListener('click', function() {
            localStorage.setItem('vaultphoenix_cookie_consent', 'accepted');
            console.log('🍪 Cookies accepted by user');
            consentBanner.classList.remove('show');
            setTimeout(() => {
                consentBanner.remove();
            }, 400);
        });
        
        // Handle Decline button
        const declineBtn = consentBanner.querySelector('.cookie-decline');
        declineBtn.addEventListener('click', function() {
            localStorage.setItem('vaultphoenix_cookie_consent', 'declined');
            console.log('🍪 Cookies declined by user');
            consentBanner.classList.remove('show');
            setTimeout(() => {
                consentBanner.remove();
            }, 400);
        });
        
        console.log('🍪 Cookie consent banner initialized');
    }

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
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
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
    // UTILITY FUNCTIONS
    // ============================================
    
    // Debounce function
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

    // Throttle function
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
            if (window.innerWidth > 1024 && mobileMenu && mobileMenu.classList.contains('active')) {
                mobileMenu.classList.remove('active');
                if (mobileMenuOverlay) {
                    mobileMenuOverlay.classList.remove('active');
                }
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
    
    function init() {
        console.log('🔥 Vault Phoenix Shared Scripts Initialized');
        
        // Initial navbar state
        handleNavbarScroll();
        
        // Initialize cookie consent banner
        initializeCookieConsent();
        
        // Initialize countdown timer with retries
        console.log('🔥 Attempting countdown initialization...');
        const success1 = initializeUniversalCountdown();
        
        if (!success1) {
            console.log('🔥 First attempt failed, retrying after 100ms...');
            setTimeout(() => {
                const success2 = initializeUniversalCountdown();
                if (!success2) {
                    console.log('🔥 Second attempt failed, retrying after 500ms...');
                    setTimeout(() => {
                        initializeUniversalCountdown();
                    }, 500);
                }
            }, 100);
        }
        
        // Add loaded class to body
        document.body.classList.add('loaded');
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();
