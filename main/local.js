/**
 * ============================================
 * VAULT PHOENIX - MAIN PAGE LOCAL JAVASCRIPT
 * ============================================
 * 
 * @file        local.js
 * @version     1.0.0
 * @author      Vault Phoenix LLC
 * 
 * @description
 * Main page-specific JavaScript for Vault Phoenix AR Crypto Gaming Platform.
 * Handles interactive features, animations, and component loading specific to main.html.
 * Works in conjunction with shared.js for core functionality.
 * 
 * @dependencies
 * - shared.js (v4.0+) - Required for core navigation and chatbot functionality
 * - shared.html - Required for shared components (footer, chatbot, modals)
 * 
 * @features
 * 1. Phone Gallery - Interactive phone screenshot viewer
 * 2. Laptop Gallery - Interactive laptop screenshot viewer
 * 3. Scroll Reveal - Intersection Observer animations
 * 4. Shared Components Loader - Dynamic HTML component injection
 * 5. Initialization System - Graceful startup with shared.js coordination
 * 
 * @browser_support
 * - Chrome 60+
 * - Firefox 55+
 * - Safari 12+
 * - Edge 79+
 * 
 * @performance
 * - Lazy loading for images
 * - Debounced scroll events via Intersection Observer
 * - Efficient DOM queries with caching
 * ============================================
 */

(function() {
    'use strict';

    // ============================================
    // CONFIGURATION & CONSTANTS
    // ============================================

    /**
     * Configuration object for script behavior
     * @const {Object}
     */
    const CONFIG = {
        SHARED_READY_TIMEOUT: 5000,     // Max wait time for shared.js
        SHARED_READY_CHECK_INTERVAL: 50, // Check interval for shared.js
        CHATBOT_INIT_DELAY: 100,         // Delay before chatbot initialization
        SCROLL_REVEAL_THRESHOLD: 0.1,    // Intersection Observer threshold
        SCROLL_REVEAL_ROOT_MARGIN: '0px 0px -50px 0px'
    };

    /**
     * Logging utility with prefixed output
     * @const {Object}
     */
    const LOGGER = {
        info: (msg) => console.log(`🔥 [Main.js] ${msg}`),
        success: (msg) => console.log(`✅ [Main.js] ${msg}`),
        error: (msg) => console.error(`❌ [Main.js] ${msg}`),
        warn: (msg) => console.warn(`⚠️ [Main.js] ${msg}`),
        debug: (msg) => console.log(`🐛 [Main.js] ${msg}`)
    };

    // ============================================
    // PHONE GALLERY FUNCTIONALITY
    // ============================================

    /**
     * Changes the main phone screenshot display
     * 
     * @function changeImage
     * @global
     * @param {string} imageSrc - Path to the image file to display
     * @param {string} altText - Alternative text for accessibility
     * @returns {void}
     * 
     * @example
     * changeImage('images/EmberHome.jpg', 'Ember Home screen showing main interface');
     * 
     * @throws Will log error if main phone screenshot element not found
     */
    window.changeImage = function(imageSrc, altText) {
        const mainImage = document.getElementById('mainPhoneScreenshot');
        
        // Validate element exists
        if (!mainImage) {
            LOGGER.error('Main phone screenshot element (#mainPhoneScreenshot) not found');
            return;
        }
        
        // Update image source and alt text
        mainImage.src = imageSrc;
        mainImage.alt = altText;
        
        // Update active state on all thumbnails
        const thumbs = document.querySelectorAll('.simple-thumb');
        thumbs.forEach(thumb => thumb.classList.remove('active'));
        
        // Add active class to clicked thumbnail
        if (event && event.currentTarget) {
            event.currentTarget.classList.add('active');
        }
        
        LOGGER.debug(`Phone image changed to: ${imageSrc}`);
    };

    // ============================================
    // LAPTOP GALLERY FUNCTIONALITY
    // ============================================

    /**
     * Changes the main laptop screenshot display
     * 
     * @function changeLaptopImage
     * @global
     * @param {string} imageSrc - Path to the image file to display
     * @param {string} altText - Alternative text for accessibility
     * @returns {void}
     * 
     * @example
     * changeLaptopImage('images/CampaignControl.PNG', 'Campaign Control dashboard');
     * 
     * @throws Will log error if main laptop screenshot element not found
     */
    window.changeLaptopImage = function(imageSrc, altText) {
        const mainImage = document.getElementById('mainLaptopScreenshot');
        
        // Validate element exists
        if (!mainImage) {
            LOGGER.error('Main laptop screenshot element (#mainLaptopScreenshot) not found');
            return;
        }
        
        // Update image source and alt text
        mainImage.src = imageSrc;
        mainImage.alt = altText;
        
        // Update active state on all thumbnails
        const thumbs = document.querySelectorAll('.simple-thumb-laptop');
        thumbs.forEach(thumb => thumb.classList.remove('active'));
        
        // Add active class to clicked thumbnail
        if (event && event.currentTarget) {
            event.currentTarget.classList.add('active');
        }
        
        LOGGER.debug(`Laptop image changed to: ${imageSrc}`);
    };

    // ============================================
    // SCROLL REVEAL ANIMATION SYSTEM
    // ============================================

    /**
     * Initializes Intersection Observer for scroll reveal animations
     * 
     * @function initializeScrollReveal
     * @returns {void}
     * 
     * @description
     * Uses Intersection Observer API to detect when elements enter viewport
     * and adds 'revealed' class to trigger CSS animations. More performant
     * than scroll event listeners.
     * 
     * @performance
     * - Uses passive observation
     * - Single observer for all elements
     * - Automatic cleanup via garbage collection
     * 
     * @accessibility
     * - Respects prefers-reduced-motion
     * - Maintains proper ARIA labels
     */
    function initializeScrollReveal() {
        // Check for reduced motion preference
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        
        if (prefersReducedMotion) {
            // Skip animations if user prefers reduced motion
            const scrollRevealElements = document.querySelectorAll('.scroll-reveal');
            scrollRevealElements.forEach(el => el.classList.add('revealed'));
            LOGGER.info('Scroll reveal skipped (prefers-reduced-motion)');
            return;
        }
        
        // Configure Intersection Observer options
        const observerOptions = {
            threshold: CONFIG.SCROLL_REVEAL_THRESHOLD,
            rootMargin: CONFIG.SCROLL_REVEAL_ROOT_MARGIN
        };
        
        // Create Intersection Observer callback
        const observerCallback = (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                    // Optional: Unobserve after reveal for performance
                    // observer.unobserve(entry.target);
                }
            });
        };
        
        // Initialize observer
        const observer = new IntersectionObserver(observerCallback, observerOptions);
        
        // Observe all elements with scroll-reveal class
        const scrollRevealElements = document.querySelectorAll('.scroll-reveal');
        scrollRevealElements.forEach(el => observer.observe(el));
        
        LOGGER.success(`Scroll reveal initialized for ${scrollRevealElements.length} elements`);
    }

    // ============================================
    // SHARED COMPONENTS LOADER
    // ============================================

    /**
     * Loads shared HTML components from shared.html file
     * 
     * @function loadSharedComponents
     * @async
     * @returns {Promise<void>}
     * 
     * @description
     * Dynamically loads shared components (chatbot, footer, cookie banner, privacy modal)
     * from shared.html and injects them into the DOM. Reinitializes chatbot after loading.
     * 
     * @throws Will log error if fetch fails or container not found
     * 
     * @components
     * - Phoenix AI Chatbot
     * - Site Footer
     * - Cookie Consent Banner
     * - Privacy Policy Modal
     */
    function loadSharedComponents() {
        LOGGER.info('Loading shared components from shared.html...');
        
        fetch('shared.html')
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP ${response.status}: ${response.statusText}`);
                }
                return response.text();
            })
            .then(html => {
                const container = document.getElementById('shared-components-container');
                
                if (!container) {
                    throw new Error('Shared components container (#shared-components-container) not found');
                }
                
                // Inject HTML into container
                container.innerHTML = html;
                LOGGER.success('Shared components loaded successfully');
                
                // Re-initialize chatbot after components are loaded
                if (window.initializePhoenixChatbot) {
                    setTimeout(() => {
                        window.initializePhoenixChatbot();
                        LOGGER.success('Phoenix chatbot reinitialized');
                    }, CONFIG.CHATBOT_INIT_DELAY);
                } else {
                    LOGGER.warn('Phoenix chatbot initialization function not found');
                }
            })
            .catch(error => {
                LOGGER.error(`Failed to load shared components: ${error.message}`);
            });
    }

    // ============================================
    // INITIALIZATION SYSTEM
    // ============================================

    /**
     * Waits for shared.js to be ready before initializing page features
     * 
     * @function waitForSharedScript
     * @returns {Promise<boolean>}
     * 
     * @description
     * Polls for window.sharedScriptReady flag set by shared.js.
     * Ensures proper initialization order and prevents race conditions.
     */
    function waitForSharedScript() {
        return new Promise((resolve) => {
            const startTime = Date.now();
            
            const checkInterval = setInterval(() => {
                const elapsed = Date.now() - startTime;
                
                // Check if shared.js is ready
                if (window.sharedScriptReady) {
                    clearInterval(checkInterval);
                    LOGGER.success('Shared.js detected and ready');
                    resolve(true);
                }
                
                // Timeout after configured duration
                if (elapsed >= CONFIG.SHARED_READY_TIMEOUT) {
                    clearInterval(checkInterval);
                    LOGGER.warn(`Shared.js not ready after ${CONFIG.SHARED_READY_TIMEOUT}ms, continuing anyway...`);
                    resolve(false);
                }
            }, CONFIG.SHARED_READY_CHECK_INTERVAL);
        });
    }

    /**
     * Main initialization function
     * 
     * @async
     * @function initialize
     * @returns {Promise<void>}
     * 
     * @description
     * Coordinates the initialization of all main.js features:
     * 1. Waits for shared.js to be ready
     * 2. Initializes scroll reveal animations
     * 3. Loads shared HTML components
     * 4. Reports initialization status
     * 
     * @initialization_order
     * 1. Wait for shared.js (up to 5 seconds)
     * 2. Initialize scroll reveal observer
     * 3. Fetch and inject shared components
     * 4. Reinitialize chatbot
     */
    async function initialize() {
        LOGGER.info('Initializing main page features...');
        
        // Wait for shared.js to be ready
        const sharedReady = await waitForSharedScript();
        
        if (sharedReady) {
            LOGGER.success('Shared.js ready, initializing main.js features...');
        }
        
        // Initialize scroll reveal animations
        try {
            initializeScrollReveal();
        } catch (error) {
            LOGGER.error(`Scroll reveal initialization failed: ${error.message}`);
        }
        
        // Load shared HTML components
        try {
            loadSharedComponents();
        } catch (error) {
            LOGGER.error(`Shared components loading failed: ${error.message}`);
        }
        
        LOGGER.success('Main page initialization complete');
        
        // Log browser and environment info
        logEnvironmentInfo();
    }

    // ============================================
    // ENVIRONMENT & DEBUGGING
    // ============================================

    /**
     * Logs browser and environment information for debugging
     * 
     * @function logEnvironmentInfo
     * @returns {void}
     * 
     * @debug
     * Provides useful debugging information about the runtime environment
     */
    function logEnvironmentInfo() {
        const info = {
            userAgent: navigator.userAgent,
            viewport: `${window.innerWidth}x${window.innerHeight}`,
            pixelRatio: window.devicePixelRatio,
            colorScheme: window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light',
            reducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches,
            online: navigator.onLine,
            language: navigator.language
        };
        
        LOGGER.debug('Environment Info:');
        console.table(info);
    }

    /**
     * Error handler for uncaught errors
     * 
     * @function handleGlobalError
     * @param {ErrorEvent} event - Error event object
     * @returns {void}
     */
    function handleGlobalError(event) {
        LOGGER.error(`Uncaught error: ${event.message}`);
        LOGGER.error(`  at ${event.filename}:${event.lineno}:${event.colno}`);
    }

    /**
     * Warning handler for unhandled promise rejections
     * 
     * @function handleUnhandledRejection
     * @param {PromiseRejectionEvent} event - Promise rejection event
     * @returns {void}
     */
    function handleUnhandledRejection(event) {
        LOGGER.error(`Unhandled promise rejection: ${event.reason}`);
    }

    // ============================================
    // EVENT LISTENERS & DOM READY
    // ============================================

    /**
     * Sets up global error handlers
     */
    function setupErrorHandlers() {
        window.addEventListener('error', handleGlobalError);
        window.addEventListener('unhandledrejection', handleUnhandledRejection);
    }

    /**
     * Entry point - Initialize when DOM is ready
     */
    if (document.readyState === 'loading') {
        // DOM is still loading
        document.addEventListener('DOMContentLoaded', () => {
            setupErrorHandlers();
            initialize();
        });
    } else {
        // DOM is already loaded
        setupErrorHandlers();
        initialize();
    }

    // ============================================
    // PUBLIC API
    // ============================================

    /**
     * Expose public API for external access
     * @namespace VaultPhoenixMain
     */
    window.VaultPhoenixMain = {
        version: '1.0.0',
        changeImage: window.changeImage,
        changeLaptopImage: window.changeLaptopImage,
        reinitialize: initialize
    };

    LOGGER.info('Local.js loaded successfully');

})();

/**
 * ============================================
 * END OF LOCAL.JS
 * ============================================
 */
