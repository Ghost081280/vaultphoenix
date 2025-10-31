// ============================================
// MAIN.JS - PAGE-SPECIFIC JAVASCRIPT FOR VAULT PHOENIX MAIN PAGE
// ============================================
// This file contains JavaScript specific to main.html
// Works in conjunction with shared.js for core functionality
// ============================================

(function() {
    'use strict';

    // ============================================
    // PHONE GALLERY FUNCTIONALITY
    // ============================================
    
    /**
     * Changes the main phone screenshot display
     * @param {string} imageSrc - Path to the image to display
     * @param {string} altText - Alternative text for accessibility
     */
    window.changeImage = function(imageSrc, altText) {
        const mainImage = document.getElementById('mainPhoneScreenshot');
        
        if (!mainImage) {
            console.error('Main phone screenshot element not found');
            return;
        }
        
        mainImage.src = imageSrc;
        mainImage.alt = altText;
        
        // Update active state on thumbnails
        const thumbs = document.querySelectorAll('.simple-thumb');
        thumbs.forEach(thumb => thumb.classList.remove('active'));
        
        // Add active class to clicked thumbnail
        if (event && event.currentTarget) {
            event.currentTarget.classList.add('active');
        }
    };

    // ============================================
    // LAPTOP GALLERY FUNCTIONALITY
    // ============================================
    
    /**
     * Changes the main laptop screenshot display
     * @param {string} imageSrc - Path to the image to display
     * @param {string} altText - Alternative text for accessibility
     */
    window.changeLaptopImage = function(imageSrc, altText) {
        const mainImage = document.getElementById('mainLaptopScreenshot');
        
        if (!mainImage) {
            console.error('Main laptop screenshot element not found');
            return;
        }
        
        mainImage.src = imageSrc;
        mainImage.alt = altText;
        
        // Update active state on thumbnails
        const thumbs = document.querySelectorAll('.simple-thumb-laptop');
        thumbs.forEach(thumb => thumb.classList.remove('active'));
        
        // Add active class to clicked thumbnail
        if (event && event.currentTarget) {
            event.currentTarget.classList.add('active');
        }
    };

    // ============================================
    // SCROLL REVEAL ANIMATION SYSTEM
    // ============================================
    
    /**
     * Initializes intersection observer for scroll reveal animations
     */
    function initializeScrollReveal() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                }
            });
        }, observerOptions);
        
        // Observe all elements with scroll-reveal class
        const scrollRevealElements = document.querySelectorAll('.scroll-reveal');
        scrollRevealElements.forEach(el => observer.observe(el));
        
        console.log(`✅ Scroll reveal initialized for ${scrollRevealElements.length} elements`);
    }

    // ============================================
    // SHARED COMPONENTS LOADER
    // ============================================
    
    /**
     * Loads shared HTML components (chatbot, footer, cookie banner, etc.)
     * from shared.html file
     */
    function loadSharedComponents() {
        console.log('📦 Loading shared components from shared.html...');
        
        fetch('shared.html')
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Failed to load shared.html: ${response.status}`);
                }
                return response.text();
            })
            .then(html => {
                const container = document.getElementById('shared-components-container');
                if (container) {
                    container.innerHTML = html;
                    console.log('✅ Shared components loaded successfully');
                    
                    // Re-initialize chatbot after shared components are loaded
                    if (window.initializePhoenixChatbot) {
                        setTimeout(() => {
                            window.initializePhoenixChatbot();
                        }, 100);
                    }
                } else {
                    console.error('❌ Shared components container not found');
                }
            })
            .catch(error => {
                console.error('❌ Error loading shared components:', error);
            });
    }

    // ============================================
    // INITIALIZATION
    // ============================================
    
    /**
     * Main initialization function
     * Waits for shared.js to be ready before initializing page-specific features
     */
    function init() {
        console.log('🔥 Main.js initializing...');
        
        // Wait for shared.js to be ready
        const checkSharedReady = setInterval(() => {
            if (window.sharedScriptReady) {
                clearInterval(checkSharedReady);
                console.log('✅ Shared.js is ready, initializing main.js features...');
                
                // Initialize scroll reveal animations
                initializeScrollReveal();
                
                // Load shared HTML components
                loadSharedComponents();
                
                console.log('✅ Main.js initialization complete');
            }
        }, 50);
        
        // Timeout after 5 seconds if shared.js doesn't load
        setTimeout(() => {
            if (!window.sharedScriptReady) {
                clearInterval(checkSharedReady);
                console.warn('⚠️ Shared.js not ready after 5 seconds, initializing anyway...');
                
                // Initialize scroll reveal animations
                initializeScrollReveal();
                
                // Load shared HTML components
                loadSharedComponents();
            }
        }, 5000);
    }

    // ============================================
    // DOM READY EVENT
    // ============================================
    
    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();
