/* ========================================
   VAULT PHOENIX ONBOARDING - LOCAL JS
   Production-Ready Enhanced JavaScript
   ======================================== */

'use strict';

// ========================================
// GLOBAL STATE
// ========================================
const OnboardingApp = {
    initialized: false,
    scrollObserver: null,
    mobileMenuOpen: false,
    calculatorValues: {
        locations: 10,
        setupFee: 1000,
        pricePerLocation: 200,
        duration: 3
    }
};

// ========================================
// INITIALIZATION
// ========================================
document.addEventListener('DOMContentLoaded', function() {
    console.log('🔥 Vault Phoenix Onboarding - Initializing...');
    
    try {
        initCalculator();
        initCopyButtons();
        initScrollReveal();
        initSmoothScroll();
        initMobileMenu();
        initChecklistItems();
        
        OnboardingApp.initialized = true;
        console.log('✅ Vault Phoenix Onboarding - Fully Loaded');
    } catch (error) {
        console.error('❌ Initialization Error:', error);
    }
});

// ========================================
// ROI CALCULATOR
// ========================================

/**
 * Initialize the interactive ROI calculator
 */
function initCalculator() {
    const calculatorInputs = {
        locations: document.getElementById('locations'),
        setupFee: document.getElementById('setup-fee'),
        pricePerLocation: document.getElementById('price-per-location'),
        duration: document.getElementById('duration')
    };
    
    // Check if calculator elements exist
    const hasCalculator = Object.values(calculatorInputs).every(el => el !== null);
    
    if (!hasCalculator) {
        console.log('ℹ️ Calculator elements not found - skipping initialization');
        return;
    }
    
    // Add event listeners to all inputs
    Object.keys(calculatorInputs).forEach(key => {
        const input = calculatorInputs[key];
        if (input) {
            input.addEventListener('input', calculateROI);
            input.addEventListener('change', calculateROI);
        }
    });
    
    // Initial calculation
    calculateROI();
    
    console.log('✅ Calculator initialized');
}

/**
 * Calculate and update ROI values in real-time
 */
function calculateROI() {
    try {
        // Get input values
        const locations = parseInt(document.getElementById('locations')?.value) || 0;
        const setupFee = parseFloat(document.getElementById('setup-fee')?.value) || 0;
        const pricePerLocation = parseFloat(document.getElementById('price-per-location')?.value) || 0;
        const duration = parseInt(document.getElementById('duration')?.value) || 1;
        
        // Update the locations display value
        const locationsValue = document.getElementById('locations-value');
        if (locationsValue) {
            locationsValue.textContent = locations;
        }
        
        // Calculate revenues
        const monthlyRevenue = locations * pricePerLocation;
        const totalRecurringRevenue = monthlyRevenue * duration;
        const totalCampaignRevenue = setupFee + totalRecurringRevenue;
        const revenuePerLocation = locations > 0 ? totalCampaignRevenue / locations : 0;
        
        // Update display values with animation
        updateCalculatorValue('monthly-revenue', monthlyRevenue);
        updateCalculatorValue('total-revenue', totalCampaignRevenue);
        updateCalculatorValue('revenue-per-location', revenuePerLocation);
        
        // Store values in global state
        OnboardingApp.calculatorValues = {
            locations,
            setupFee,
            pricePerLocation,
            duration
        };
        
    } catch (error) {
        console.error('Calculator Error:', error);
    }
}

/**
 * Update calculator display value with animation
 * @param {string} elementId - The ID of the element to update
 * @param {number} value - The new value to display
 */
function updateCalculatorValue(elementId, value) {
    const element = document.getElementById(elementId);
    if (!element) return;
    
    const formattedValue = `$${value.toLocaleString('en-US', { 
        minimumFractionDigits: 0, 
        maximumFractionDigits: 0 
    })}`;
    
    // Add pulse animation
    element.style.transform = 'scale(1.05)';
    element.textContent = formattedValue;
    
    setTimeout(() => {
        element.style.transform = 'scale(1)';
    }, 200);
}

// ========================================
// COPY TO CLIPBOARD FUNCTIONALITY
// ========================================

/**
 * Initialize all copy buttons on the page
 */
function initCopyButtons() {
    const copyButtons = document.querySelectorAll('[onclick*="copyToClipboard"]');
    
    copyButtons.forEach(button => {
        // Remove inline onclick
        button.removeAttribute('onclick');
        
        // Add click event listener
        button.addEventListener('click', function(e) {
            e.preventDefault();
            copyToClipboard(this);
        });
    });
    
    console.log(`✅ Initialized ${copyButtons.length} copy buttons`);
}

/**
 * Copy content to clipboard with visual feedback
 * @param {HTMLElement} button - The button element that was clicked
 */
function copyToClipboard(button) {
    try {
        // Find the closest copy-box or script-content
        const copyBox = button.closest('.copy-box') || button.closest('.script-content') || button.closest('.proposal-content');
        
        if (!copyBox) {
            console.error('Copy box not found');
            showCopyFeedback(button, false, 'Error: Content not found');
            return;
        }
        
        // Get the code element
        const codeElement = copyBox.querySelector('code') || copyBox.querySelector('pre');
        
        if (!codeElement) {
            console.error('Code element not found');
            showCopyFeedback(button, false, 'Error: Code not found');
            return;
        }
        
        const textToCopy = codeElement.textContent;
        
        // Modern Clipboard API
        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(textToCopy)
                .then(() => {
                    showCopyFeedback(button, true);
                    console.log('✅ Text copied to clipboard');
                })
                .catch(err => {
                    console.error('Clipboard API failed:', err);
                    fallbackCopyToClipboard(textToCopy, button);
                });
        } else {
            // Fallback for older browsers
            fallbackCopyToClipboard(textToCopy, button);
        }
        
    } catch (error) {
        console.error('Copy Error:', error);
        showCopyFeedback(button, false, 'Copy Failed');
    }
}

/**
 * Fallback copy method for older browsers
 * @param {string} text - Text to copy
 * @param {HTMLElement} button - Button element for feedback
 */
function fallbackCopyToClipboard(text, button) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.top = '0';
    textArea.style.left = '0';
    textArea.style.opacity = '0';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
        const successful = document.execCommand('copy');
        showCopyFeedback(button, successful);
        if (successful) {
            console.log('✅ Text copied (fallback method)');
        }
    } catch (err) {
        console.error('Fallback copy failed:', err);
        showCopyFeedback(button, false, 'Copy Failed');
    }
    
    document.body.removeChild(textArea);
}

/**
 * Show visual feedback after copy attempt
 * @param {HTMLElement} button - The button to show feedback on
 * @param {boolean} success - Whether the copy was successful
 * @param {string} customMessage - Optional custom message
 */
function showCopyFeedback(button, success, customMessage = null) {
    // Store original content
    const originalHTML = button.innerHTML;
    const originalBg = button.style.background;
    
    // Create feedback message
    const message = customMessage || (success ? 'Copied!' : 'Failed');
    const backgroundColor = success ? '#4caf50' : '#f44336';
    const icon = success ? '✓' : '✗';
    
    // Update button
    button.innerHTML = `<span style="display: inline-flex; align-items: center; gap: 0.5rem;">
        <span>${icon}</span>
        <span>${message}</span>
    </span>`;
    button.style.background = backgroundColor;
    button.style.pointerEvents = 'none';
    
    // Add pulse animation
    button.style.transform = 'scale(1.05)';
    setTimeout(() => {
        button.style.transform = 'scale(1)';
    }, 100);
    
    // Reset after 2 seconds
    setTimeout(() => {
        button.innerHTML = originalHTML;
        button.style.background = originalBg;
        button.style.pointerEvents = 'auto';
        button.style.transform = 'scale(1)';
    }, 2000);
}

// ========================================
// SCROLL REVEAL ANIMATIONS
// ========================================

/**
 * Initialize Intersection Observer for scroll animations
 */
function initScrollReveal() {
    // Options for the observer
    const observerOptions = {
        root: null, // viewport
        rootMargin: '0px 0px -100px 0px', // Trigger slightly before element enters viewport
        threshold: 0.1 // 10% of element must be visible
    };
    
    // Create the observer
    OnboardingApp.scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add revealed class with slight delay for stagger effect
                setTimeout(() => {
                    entry.target.classList.add('revealed');
                }, 50);
                
                // Stop observing this element (animation only triggers once)
                OnboardingApp.scrollObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe all elements with scroll-reveal class
    const revealElements = document.querySelectorAll('.scroll-reveal');
    revealElements.forEach(el => {
        OnboardingApp.scrollObserver.observe(el);
    });
    
    console.log(`✅ Scroll reveal initialized for ${revealElements.length} elements`);
}

// ========================================
// SMOOTH SCROLLING
// ========================================

/**
 * Initialize smooth scrolling for anchor links
 */
function initSmoothScroll() {
    // Get all anchor links that point to sections on the page
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Skip if it's just # or empty
            if (!href || href === '#') return;
            
            const targetId = href.substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                e.preventDefault();
                
                // Close mobile menu if open
                if (OnboardingApp.mobileMenuOpen) {
                    closeMobileMenu();
                }
                
                // Smooth scroll to target
                smoothScrollTo(targetElement);
            }
        });
    });
    
    console.log(`✅ Smooth scroll initialized for ${anchorLinks.length} anchor links`);
}

/**
 * Smooth scroll to a target element
 * @param {HTMLElement} target - The element to scroll to
 * @param {number} offset - Optional offset from top (default: 80px for navbar)
 */
function smoothScrollTo(target, offset = 80) {
    const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;
    
    window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
    });
}

/**
 * Scroll to a section by ID
 * @param {string} sectionId - The ID of the section to scroll to
 */
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        smoothScrollTo(section);
    } else {
        console.warn(`Section with ID "${sectionId}" not found`);
    }
}

// ========================================
// MOBILE MENU
// ========================================

/**
 * Initialize mobile menu functionality
 */
function initMobileMenu() {
    const menuBtn = document.getElementById('mobile-menu-btn');
    const closeBtn = document.getElementById('mobile-menu-close');
    const overlay = document.getElementById('mobile-menu-overlay');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-nav-links a');
    
    if (!menuBtn || !closeBtn || !overlay || !mobileMenu) {
        console.log('ℹ️ Mobile menu elements not found - may be using global navigation');
        return;
    }
    
    // Open mobile menu
    menuBtn.addEventListener('click', openMobileMenu);
    
    // Close mobile menu
    closeBtn.addEventListener('click', closeMobileMenu);
    overlay.addEventListener('click', closeMobileMenu);
    
    // Close menu when clicking a link
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            setTimeout(closeMobileMenu, 300); // Delay to allow smooth scroll to start
        });
    });
    
    // Close menu on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && OnboardingApp.mobileMenuOpen) {
            closeMobileMenu();
        }
    });
    
    console.log('✅ Mobile menu initialized');
}

/**
 * Open the mobile menu
 */
function openMobileMenu() {
    const overlay = document.getElementById('mobile-menu-overlay');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (overlay && mobileMenu) {
        overlay.classList.add('active');
        mobileMenu.classList.add('active');
        document.body.style.overflow = 'hidden';
        OnboardingApp.mobileMenuOpen = true;
    }
}

/**
 * Close the mobile menu
 */
function closeMobileMenu() {
    const overlay = document.getElementById('mobile-menu-overlay');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (overlay && mobileMenu) {
        overlay.classList.remove('active');
        mobileMenu.classList.remove('active');
        document.body.style.overflow = '';
        OnboardingApp.mobileMenuOpen = false;
    }
}

// ========================================
// CHECKLIST FUNCTIONALITY
// ========================================

/**
 * Initialize checklist items with localStorage persistence
 */
function initChecklistItems() {
    const checkboxes = document.querySelectorAll('.checklist-item input[type="checkbox"]');
    
    if (checkboxes.length === 0) {
        console.log('ℹ️ No checklist items found');
        return;
    }
    
    // Load saved state from localStorage
    checkboxes.forEach((checkbox, index) => {
        const savedState = localStorage.getItem(`checklist-${index}`);
        if (savedState === 'true') {
            checkbox.checked = true;
        }
        
        // Save state on change
        checkbox.addEventListener('change', function() {
            localStorage.setItem(`checklist-${index}`, this.checked);
            
            // Optional: Add completion animation
            if (this.checked) {
                const item = this.closest('.checklist-item');
                item.style.animation = 'none';
                setTimeout(() => {
                    item.style.animation = 'pulse 0.3s ease-in-out';
                }, 10);
            }
        });
    });
    
    console.log(`✅ Initialized ${checkboxes.length} checklist items with persistence`);
}

// ========================================
// UTILITY FUNCTIONS
// ========================================

/**
 * Debounce function to limit how often a function can fire
 * @param {Function} func - The function to debounce
 * @param {number} wait - The time to wait in milliseconds
 * @returns {Function} - Debounced function
 */
function debounce(func, wait = 250) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

/**
 * Throttle function to limit how often a function can fire
 * @param {Function} func - The function to throttle
 * @param {number} limit - The time limit in milliseconds
 * @returns {Function} - Throttled function
 */
function throttle(func, limit = 250) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

/**
 * Format currency value
 * @param {number} value - The value to format
 * @param {string} currency - Currency symbol (default: $)
 * @returns {string} - Formatted currency string
 */
function formatCurrency(value, currency = '$') {
    return `${currency}${value.toLocaleString('en-US', {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    })}`;
}

/**
 * Validate email format
 * @param {string} email - Email to validate
 * @returns {boolean} - True if valid
 */
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

/**
 * Get query parameter from URL
 * @param {string} param - Parameter name
 * @returns {string|null} - Parameter value or null
 */
function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

// ========================================
// PERFORMANCE MONITORING
// ========================================

/**
 * Log page load performance metrics
 */
window.addEventListener('load', function() {
    if (window.performance && window.performance.timing) {
        const perfData = window.performance.timing;
        const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
        const domReadyTime = perfData.domContentLoadedEventEnd - perfData.navigationStart;
        
        console.log(`📊 Performance Metrics:
            - DOM Ready: ${domReadyTime}ms
            - Page Load: ${pageLoadTime}ms
        `);
    }
});

// ========================================
// ERROR HANDLING
// ========================================

/**
 * Global error handler
 */
window.addEventListener('error', function(event) {
    console.error('Global Error:', {
        message: event.message,
        filename: event.filename,
        lineno: event.lineno,
        colno: event.colno,
        error: event.error
    });
});

/**
 * Unhandled promise rejection handler
 */
window.addEventListener('unhandledrejection', function(event) {
    console.error('Unhandled Promise Rejection:', event.reason);
});

// ========================================
// VISIBILITY CHANGE HANDLING
// ========================================

/**
 * Handle page visibility changes
 */
document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
        console.log('⏸️ Page hidden');
    } else {
        console.log('▶️ Page visible');
    }
});

// ========================================
// KEYBOARD SHORTCUTS (Optional)
// ========================================

/**
 * Add keyboard shortcuts for power users
 */
document.addEventListener('keydown', function(e) {
    // Ctrl/Cmd + K to focus calculator
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        const calculator = document.getElementById('interactive-calculator');
        if (calculator) {
            smoothScrollTo(calculator);
        }
    }
    
    // Ctrl/Cmd + / to show shortcuts help (could be expanded)
    if ((e.ctrlKey || e.metaKey) && e.key === '/') {
        e.preventDefault();
        console.log(`
🔥 Vault Phoenix Keyboard Shortcuts:
- Ctrl/Cmd + K: Jump to calculator
- Ctrl/Cmd + /: Show this help
- Escape: Close mobile menu
        `);
    }
});

// ========================================
// EXPORT FUNCTIONS (for global access if needed)
// ========================================

// Make certain functions available globally
window.VaultPhoenix = {
    calculateROI,
    copyToClipboard,
    scrollToSection,
    openMobileMenu,
    closeMobileMenu,
    formatCurrency,
    validateEmail,
    getQueryParam
};

// ========================================
// DEVELOPMENT HELPERS
// ========================================

if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    console.log(`
🔥 VAULT PHOENIX ONBOARDING - DEV MODE
========================================
Available global functions:
- VaultPhoenix.calculateROI()
- VaultPhoenix.copyToClipboard(button)
- VaultPhoenix.scrollToSection(id)
- VaultPhoenix.formatCurrency(value)
========================================
    `);
}

console.log('🔥 Vault Phoenix Onboarding - Ready!');
