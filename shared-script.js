// ============================================
// SHARED JAVASCRIPT FOR VAULT PHOENIX - V2 WITH READY SIGNAL
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
    // SCROLL PROGRESS INDICATOR - HORIZONTAL TOP BAR
    // ============================================

    function initializeScrollProgress() {
        console.log('📊 Initializing scroll progress indicator...');
        
        // Create progress bar elements
        const progressContainer = document.createElement('div');
        progressContainer.className = 'scroll-progress-container';
        
        const progressBar = document.createElement('div');
        progressBar.className = 'scroll-progress-bar';
        
        progressContainer.appendChild(progressBar);
        document.body.appendChild(progressContainer);
        
        console.log('📊 Progress bar elements created and appended to body');
        
        // Update progress on scroll
        function updateScrollProgress() {
            const windowHeight = window.innerHeight;
            const documentHeight = document.documentElement.scrollHeight;
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            // Calculate scroll percentage
            const scrollPercentage = (scrollTop / (documentHeight - windowHeight)) * 100;
            
            // Update progress bar width
            progressBar.style.width = scrollPercentage + '%';
        }
        
        // Throttled scroll listener for performance
        let scrollProgressTimeout;
        window.addEventListener('scroll', function() {
            if (scrollProgressTimeout) {
                window.cancelAnimationFrame(scrollProgressTimeout);
            }
            scrollProgressTimeout = window.requestAnimationFrame(updateScrollProgress);
        }, { passive: true });
        
        // Initial update
        updateScrollProgress();
        
        console.log('✅ Scroll progress indicator initialized successfully');
    }

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
                    <a href="#" class="cookie-privacy-link" id="cookie-privacy-link" aria-label="View privacy policy">
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
    // PRIVACY POLICY MODAL SYSTEM
    // ============================================
    
    function initializePrivacyPolicyModal() {
        console.log('🔒 Initializing Privacy Policy Modal...');
        
        // Create modal overlay and content
        const modalHTML = `
            <div class="privacy-modal-overlay" id="privacy-modal-overlay" role="dialog" aria-labelledby="privacy-modal-title" aria-modal="true">
                <div class="privacy-modal">
                    <div class="privacy-modal-header">
                        <h2 id="privacy-modal-title">
                            <span class="privacy-modal-icon">🔒</span>
                            Privacy Policy
                        </h2>
                        <button class="privacy-modal-close" id="privacy-modal-close" aria-label="Close privacy policy">
                            ×
                        </button>
                    </div>
                    
                    <div class="privacy-modal-body">
                        <div class="privacy-modal-date">
                            Effective Date: October 27, 2025 | Last Updated: October 27, 2025
                        </div>
                        
                        <div class="privacy-modal-intro">
                            Welcome to Vault Phoenix LLC. We value your privacy and are committed to protecting your personal information. This policy explains how we collect, use, and protect data when you use our AR-based campaigns, token programs, and services.
                        </div>
                        
                        <div class="privacy-key-points">
                            <h3>Key Privacy Highlights</h3>
                            <div class="privacy-points-grid">
                                <div class="privacy-point">
                                    <div class="privacy-point-header">
                                        <span class="privacy-point-icon">📧</span>
                                        <h4>Information We Collect</h4>
                                    </div>
                                    <p>We collect email addresses, wallet addresses, device information, and geolocation data (only with your consent for AR campaigns). All data collection is transparent and purposeful.</p>
                                </div>
                                
                                <div class="privacy-point">
                                    <div class="privacy-point-header">
                                        <span class="privacy-point-icon">🎯</span>
                                        <h4>How We Use Your Data</h4>
                                    </div>
                                    <p>Your information helps us operate and improve our services, enable AR campaigns, process token transactions, and communicate important updates. We ensure compliance with all legal and regulatory requirements.</p>
                                </div>
                                
                                <div class="privacy-point">
                                    <div class="privacy-point-header">
                                        <span class="privacy-point-icon">🤝</span>
                                        <h4>Information Sharing</h4>
                                    </div>
                                    <p>We only share limited data with service providers, compliance partners for KYC/AML verification, and legal authorities when required. We never sell or rent your personal information to third parties.</p>
                                </div>
                                
                                <div class="privacy-point">
                                    <div class="privacy-point-header">
                                        <span class="privacy-point-icon">🍪</span>
                                        <h4>Cookies & Tracking</h4>
                                    </div>
                                    <p>We use cookies and local storage to enhance your experience, measure engagement, and manage AR campaign performance. You can manage cookie preferences in your browser settings.</p>
                                </div>
                                
                                <div class="privacy-point">
                                    <div class="privacy-point-header">
                                        <span class="privacy-point-icon">🔐</span>
                                        <h4>Data Security</h4>
                                    </div>
                                    <p>We employ industry-standard encryption, secure hosting, and strict access controls to protect your personal data. While no system is 100% secure, we continuously monitor and improve our security measures.</p>
                                </div>
                                
                                <div class="privacy-point">
                                    <div class="privacy-point-header">
                                        <span class="privacy-point-icon">⚖️</span>
                                        <h4>Your Rights</h4>
                                    </div>
                                    <p>You have the right to access, correct, or delete your personal information, request limits on processing, and withdraw consent for geolocation or marketing communications at any time.</p>
                                </div>
                                
                                <div class="privacy-point">
                                    <div class="privacy-point-header">
                                        <span class="privacy-point-icon">👶</span>
                                        <h4>Children's Privacy</h4>
                                    </div>
                                    <p>Our platform is not intended for children under 13 (or under 16 in certain jurisdictions). We do not knowingly collect personal information from minors.</p>
                                </div>
                                
                                <div class="privacy-point">
                                    <div class="privacy-point-header">
                                        <span class="privacy-point-icon">🌍</span>
                                        <h4>International Transfers</h4>
                                    </div>
                                    <p>If you're outside the United States, your data may be transferred and processed in the U.S. or other locations where Vault Phoenix operates, in compliance with international data protection standards.</p>
                                </div>
                            </div>
                        </div>
                        
                        <div class="privacy-contact-section">
                            <h4>Contact Us About Privacy</h4>
                            <div class="privacy-contact-info">
                                <div class="privacy-contact-item">
                                    <span>📧</span>
                                    <span>Email: <a href="mailto:contact@vaultphoenix.com">contact@vaultphoenix.com</a></span>
                                </div>
                                <div class="privacy-contact-item">
                                    <span>🌐</span>
                                    <span>Website: <a href="https://www.vaultphoenix.com" target="_blank" rel="noopener">www.vaultphoenix.com</a></span>
                                </div>
                                <div class="privacy-contact-item">
                                    <span>🏢</span>
                                    <span>Vault Phoenix LLC</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="privacy-modal-footer">
                        <a href="docs/PRIVACY_POLICY.pdf" download class="privacy-download-btn">
                            <span class="privacy-download-icon">📥</span>
                            Download Full Policy (PDF)
                        </a>
                        <button class="privacy-close-btn" id="privacy-modal-close-btn">
                            Close
                        </button>
                    </div>
                </div>
            </div>
        `;
        
        // Add modal to body
        document.body.insertAdjacentHTML('beforeend', modalHTML);
        
        // Get modal elements
        const modalOverlay = document.getElementById('privacy-modal-overlay');
        const modalClose = document.getElementById('privacy-modal-close');
        const modalCloseBtn = document.getElementById('privacy-modal-close-btn');
        
        // Function to open modal
        function openPrivacyModal(e) {
            if (e) e.preventDefault();
            modalOverlay.classList.add('active');
            document.body.style.overflow = 'hidden';
            console.log('🔒 Privacy Policy Modal opened');
        }
        
        // Function to close modal
        function closePrivacyModal() {
            modalOverlay.classList.remove('active');
            document.body.style.overflow = '';
            console.log('🔒 Privacy Policy Modal closed');
        }
        
        // Event listeners for privacy policy links
        const privacyLinks = document.querySelectorAll('[href="#privacy-policy"], #cookie-privacy-link, .cookie-privacy-link');
        privacyLinks.forEach(link => {
            link.addEventListener('click', openPrivacyModal);
        });
        
        // Close modal handlers
        if (modalClose) {
            modalClose.addEventListener('click', closePrivacyModal);
        }
        
        if (modalCloseBtn) {
            modalCloseBtn.addEventListener('click', closePrivacyModal);
        }
        
        // Close on overlay click
        if (modalOverlay) {
            modalOverlay.addEventListener('click', function(e) {
                if (e.target === modalOverlay) {
                    closePrivacyModal();
                }
            });
        }
        
        // Close on escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
                closePrivacyModal();
            }
        });
        
        // Expose function globally for external use
        window.openPrivacyPolicyModal = openPrivacyModal;
        
        console.log('🔒 Privacy Policy Modal initialized successfully');
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
    // PHOENIX AI CHATBOT SYSTEM
    // ============================================
    
    // Chatbot configuration
    const CLAUDE_API_KEY = 'YOUR_CLAUDE_API_KEY_HERE'; // Replace with actual API key
    const CLAUDE_API_URL = 'https://api.anthropic.com/v1/messages';
    const CLAUDE_MODEL = 'claude-sonnet-4-20250514';
    
    let conversationHistory = [];
    let isTyping = false;
    
    // System prompt for Vault Phoenix context
    const SYSTEM_PROMPT = `You are an AI assistant for Vault Phoenix's $Ember Token presale, a revolutionary crypto token that powers AR gaming rewards and location-based marketing campaigns.

Key Information about $Ember Token:
- Token Symbol: $EMBER
- Presale Launch: November 1, 2025
- Presale Price: $0.003 per token
- Total Supply: 166.7M tokens available in presale
- Hard Cap: $500K
- Platform: Polygon blockchain (ERC-20)
- Use Cases: Platform currency for GPS & Beacon campaigns, SDK integration, local redemption network

Token Allocation:
- Campaign Token Pool: 35% - Sold to Platform Operators through management system
- Platform Operator & SDK Incentives: 30% - Customer onboarding bonuses
- Presale: 16.67% - Early investors at $0.003
- Team & Development: 10% - 1-year cliff, 3-year vesting
- Treasury/Growth: 5% - Community governed
- Reserve/Burn: 3.33% - Deflationary mechanisms

Key Benefits:
- First-mover advantage at $0.003 presale price
- Built-in demand from Platform Operators and Advertisers
- GPS & Beacon technology for complete location coverage
- Dual redemption: local businesses OR Coinbase cash-out
- $200K liquidity guarantee (40% of presale)
- Professional legal and financial oversight

Vault Phoenix Platform:
- White-label AR crypto gaming with GPS (Outdoors) & Beacon (Indoors)
- Management system for campaign deployment
- SDK for developers
- Three-stakeholder ecosystem: Platform Operators, Players, Advertisers

Your role:
- Answer questions about $Ember token, presale, and ecosystem
- Explain investment opportunities professionally
- Guide users toward participating in presale
- Be enthusiastic yet professional about crypto
- Keep responses concise but informative

If asked about financial advice, remind users to do their own research and consult professionals.`;

    // Initialize chatbot
    function initializeChatbot() {
        console.log('🤖 CHATBOT: Starting initialization...');
        
        const chatbotButton = document.querySelector('.chatbot-button-container');
        const chatbotWindow = document.querySelector('.chatbot-window');
        const chatbotClose = document.querySelector('.chatbot-close');
        const chatbotInput = document.querySelector('.chatbot-input');
        const chatbotSend = document.querySelector('.chatbot-send');
        const chatbotBody = document.querySelector('.chatbot-body');
        
        console.log('🤖 CHATBOT: Element check:', {
            button: !!chatbotButton,
            window: !!chatbotWindow,
            close: !!chatbotClose,
            input: !!chatbotInput,
            send: !!chatbotSend,
            body: !!chatbotBody
        });
        
        if (!chatbotButton || !chatbotWindow) {
            console.error('❌ CHATBOT: Required elements not found!');
            return false;
        }
        
        // Remove any existing event listeners (prevents duplicates)
        const newChatbotButton = chatbotButton.cloneNode(true);
        chatbotButton.parentNode.replaceChild(newChatbotButton, chatbotButton);
        
        // Toggle chatbot window
        newChatbotButton.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            console.log('🤖 CHATBOT: Button clicked!');
            chatbotWindow.classList.toggle('active');
            if (chatbotWindow.classList.contains('active')) {
                console.log('🤖 CHATBOT: Window opened');
                if (chatbotBody && chatbotBody.children.length === 0) {
                    addWelcomeMessage();
                }
            } else {
                console.log('🤖 CHATBOT: Window closed');
            }
        });
        
        console.log('🤖 CHATBOT: Button click listener attached');
        
        // Close chatbot
        if (chatbotClose) {
            chatbotClose.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                console.log('🤖 CHATBOT: Close button clicked');
                chatbotWindow.classList.remove('active');
            });
        }
        
        // Send message on button click
        if (chatbotSend) {
            chatbotSend.addEventListener('click', function(e) {
                e.preventDefault();
                sendMessage();
            });
        }
        
        // Send message on Enter key
        if (chatbotInput) {
            chatbotInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    sendMessage();
                }
            });
        }
        
        console.log('✅ CHATBOT: Initialization complete!');
        return true;
    }
    
    // Welcome message
    function addWelcomeMessage() {
        const welcomeMsg = `
            <div class="chat-message assistant-message">
                <div class="message-content">
                    <div class="message-avatar">
                        <img src="images/VPLogoNoText.PNG" alt="Vault Phoenix">
                    </div>
                    <div class="message-text">
                        <strong>Welcome to Vault Phoenix!</strong><br><br>
                        I'm your AI assistant for $Ember Token and our AR crypto gaming platform. Ask me about:
                        <ul style="margin: 10px 0; padding-left: 20px;">
                            <li>$Ember token presale details & pricing</li>
                            <li>GPS & Beacon technology integration</li>
                            <li>White-label app deployment</li>
                            <li>Platform Operator opportunities</li>
                            <li>How to participate in presale</li>
                        </ul>
                        What would you like to know?
                    </div>
                </div>
            </div>
        `;
        
        const chatbotBody = document.querySelector('.chatbot-body');
        if (chatbotBody) {
            chatbotBody.innerHTML = welcomeMsg;
        }
    }
    
    // Send message to Claude API
    async function sendMessage() {
        const chatbotInput = document.querySelector('.chatbot-input');
        const chatbotBody = document.querySelector('.chatbot-body');
        const chatbotSend = document.querySelector('.chatbot-send');
        
        if (!chatbotInput || !chatbotBody || !chatbotSend) return;
        
        const message = chatbotInput.value.trim();
        
        if (!message || isTyping) return;
        
        // Check API key
        if (CLAUDE_API_KEY === 'YOUR_CLAUDE_API_KEY_HERE') {
            addChatMessage('user', message);
            addChatMessage('assistant', '⚠️ API key not configured. Please add your Claude API key to enable chat functionality. Get your key at: https://console.anthropic.com/');
            chatbotInput.value = '';
            return;
        }
        
        // Add user message
        addChatMessage('user', message);
        chatbotInput.value = '';
        chatbotInput.disabled = true;
        chatbotSend.disabled = true;
        isTyping = true;
        
        // Show typing indicator
        showTypingIndicator();
        
        try {
            const messages = [
                ...conversationHistory,
                { role: 'user', content: message }
            ];
            
            const response = await fetch(CLAUDE_API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-api-key': CLAUDE_API_KEY,
                    'anthropic-version': '2023-06-01'
                },
                body: JSON.stringify({
                    model: CLAUDE_MODEL,
                    max_tokens: 1024,
                    system: SYSTEM_PROMPT,
                    messages: messages
                })
            });
            
            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.error?.message || `API Error: ${response.status}`);
            }
            
            const data = await response.json();
            removeTypingIndicator();
            
            const assistantMessage = data.content[0].text;
            
            conversationHistory.push(
                { role: 'user', content: message },
                { role: 'assistant', content: assistantMessage }
            );
            
            addChatMessage('assistant', assistantMessage);
            
        } catch (error) {
            removeTypingIndicator();
            
            let errorMessage = '❌ Sorry, I encountered an error. ';
            
            if (error.message.includes('401')) {
                errorMessage += 'Invalid API key. Please check your configuration.';
            } else if (error.message.includes('429')) {
                errorMessage += 'Rate limit exceeded. Please try again in a moment.';
            } else if (error.message.includes('500') || error.message.includes('529')) {
                errorMessage += 'Claude API is temporarily unavailable. Please try again.';
            } else {
                errorMessage += 'Please try again or contact us at contact@vaultphoenix.com';
            }
            
            addChatMessage('assistant', errorMessage);
        } finally {
            chatbotInput.disabled = false;
            chatbotSend.disabled = false;
            isTyping = false;
        }
    }
    
    // Add message to chat
    function addChatMessage(role, content) {
        const chatbotBody = document.querySelector('.chatbot-body');
        if (!chatbotBody) return;
        
        const messageDiv = document.createElement('div');
        messageDiv.className = `chat-message ${role}-message`;
        
        if (role === 'user') {
            messageDiv.innerHTML = `
                <div class="message-content">
                    <div class="message-text">${escapeHtml(content)}</div>
                </div>
            `;
        } else {
            messageDiv.innerHTML = `
                <div class="message-content">
                    <div class="message-avatar">
                        <img src="images/VPLogoNoText.PNG" alt="Vault Phoenix">
                    </div>
                    <div class="message-text">${formatChatMessage(content)}</div>
                </div>
            `;
        }
        
        chatbotBody.appendChild(messageDiv);
        chatbotBody.scrollTop = chatbotBody.scrollHeight;
    }
    
    // Typing indicator
    function showTypingIndicator() {
        const chatbotBody = document.querySelector('.chatbot-body');
        if (!chatbotBody) return;
        
        const typingDiv = document.createElement('div');
        typingDiv.className = 'chat-message assistant-message typing-indicator';
        typingDiv.innerHTML = `
            <div class="message-content">
                <div class="message-avatar">
                    <img src="images/VPLogoNoText.PNG" alt="Vault Phoenix">
                </div>
                <div class="typing-dots">
                    <span></span><span></span><span></span>
                </div>
            </div>
        `;
        
        chatbotBody.appendChild(typingDiv);
        chatbotBody.scrollTop = chatbotBody.scrollHeight;
    }
    
    function removeTypingIndicator() {
        const typingIndicator = document.querySelector('.typing-indicator');
        if (typingIndicator) {
            typingIndicator.remove();
        }
    }
    
    // Message formatting
    function escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
    
    function formatChatMessage(text) {
        let formatted = escapeHtml(text);
        formatted = formatted.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
        formatted = formatted.replace(/^- (.+)$/gm, '<li>$1</li>');
        formatted = formatted.replace(/(<li>.*<\/li>)/s, '<ul>$1</ul>');
        formatted = formatted.replace(/\n/g, '<br>');
        return formatted;
    }
    
    // Expose chatbot initialization globally
    window.initializePhoenixChatbot = initializeChatbot;

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
        console.log('🔥 Vault Phoenix Shared Scripts Initializing...');
        
        // Initial navbar state
        handleNavbarScroll();
        
        // Initialize cookie consent banner
        initializeCookieConsent();
        
        // Initialize privacy policy modal
        initializePrivacyPolicyModal();
        
        // Initialize scroll progress indicator
        initializeScrollProgress();
        
        // Initialize Phoenix AI Chatbot with retry logic
        console.log('🤖 Attempting chatbot initialization...');
        let chatbotInitialized = initializeChatbot();
        
        if (!chatbotInitialized) {
            console.log('🤖 First attempt failed, retrying after 100ms...');
            setTimeout(() => {
                chatbotInitialized = initializeChatbot();
                if (!chatbotInitialized) {
                    console.log('🤖 Second attempt failed, retrying after 500ms...');
                    setTimeout(() => {
                        chatbotInitialized = initializeChatbot();
                        if (!chatbotInitialized) {
                            console.error('❌ CHATBOT: Failed to initialize after 3 attempts');
                        }
                    }, 500);
                }
            }, 100);
        }
        
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
        
        console.log('✅ Vault Phoenix Shared Scripts Initialization Complete');
        
        // Signal that shared script is fully initialized and ready
        window.sharedScriptReady = true;
        console.log('✅ shared-script.js fully initialized and ready - signaling to dependent scripts');
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();
