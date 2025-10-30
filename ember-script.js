// ============================================================================
// EMBER PAGE JAVASCRIPT - PRODUCTION FIX V2
// Handles all ember.html specific functionality
// ============================================================================

// ============================================================================
// GLOBAL STATE
// ============================================================================
let tpaAgreed = false;
let emberPageInitialized = false; // Prevent double initialization

// ============================================================================
// MODAL FUNCTIONS - TPA (Token Presale Agreement)
// ============================================================================

/**
 * Show the Token Presale Agreement modal
 */
window.showTpaModal = function() {
    const modal = document.getElementById('tpaModal');
    if (modal) {
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
        // Ensure modal is above everything
        modal.style.zIndex = '10000';
    }
};

/**
 * Close the Token Presale Agreement modal
 */
window.closeTpaModal = function() {
    const modal = document.getElementById('tpaModal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = '';
    }
};

/**
 * Handle TPA agreement - enables presale button
 */
window.agreeTpa = function() {
    tpaAgreed = true;
    
    // Check the checkbox
    const checkbox = document.getElementById('tpa-agree-checkbox');
    if (checkbox) {
        checkbox.checked = true;
    }
    
    // Enable the presale button
    updatePresaleButtonState();
    
    // Close the modal
    closeTpaModal();
    
    // Optional: Show success message
    console.log('✓ TPA Agreement accepted');
};

// ============================================================================
// MODAL FUNCTIONS - WHITEPAPER
// ============================================================================

/**
 * Show the Whitepaper modal
 */
window.showWhitepaperModal = function() {
    const modal = document.getElementById('whitepaperModal');
    if (modal) {
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
        modal.style.zIndex = '10000';
    }
};

/**
 * Close the Whitepaper modal
 */
window.closeWhitepaperModal = function() {
    const modal = document.getElementById('whitepaperModal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = '';
    }
};

// ============================================================================
// PRESALE BUTTON STATE MANAGEMENT
// ============================================================================

/**
 * Update presale button enabled/disabled state based on TPA checkbox
 */
function updatePresaleButtonState() {
    const checkbox = document.getElementById('tpa-agree-checkbox');
    const button = document.getElementById('presale-buy-button');
    
    if (checkbox && button) {
        if (checkbox.checked || tpaAgreed) {
            button.disabled = false;
            button.textContent = '🔥 Join Presale (Coming Soon)';
            button.style.cursor = 'pointer';
            button.style.background = 'linear-gradient(135deg, #d73327, #fb923c)';
            button.style.opacity = '1';
        } else {
            button.disabled = true;
            button.textContent = '🔥 Join Presale (Coming Soon)';
            button.style.cursor = 'not-allowed';
            button.style.background = 'rgba(128, 128, 128, 0.5)';
            button.style.opacity = '0.6';
        }
    }
}

// ============================================================================
// INVESTMENT CALCULATOR
// ============================================================================

/**
 * Calculate and update investment calculator results
 */
function updateInvestmentCalculator() {
    const input = document.getElementById('investment-amount');
    const emberTokensDisplay = document.getElementById('ember-tokens');
    const totalInvestmentDisplay = document.getElementById('total-investment');
    
    if (!input || !emberTokensDisplay || !totalInvestmentDisplay) return;
    
    const EMBER_PRICE = 0.003; // $0.003 per token
    const MIN_INVESTMENT = 10;
    const MAX_INVESTMENT = 50000;
    
    let investmentAmount = parseFloat(input.value) || MIN_INVESTMENT;
    
    // Validate investment amount
    if (investmentAmount < MIN_INVESTMENT) {
        investmentAmount = MIN_INVESTMENT;
        input.value = MIN_INVESTMENT;
    }
    
    if (investmentAmount > MAX_INVESTMENT) {
        investmentAmount = MAX_INVESTMENT;
        input.value = MAX_INVESTMENT;
    }
    
    // Calculate tokens
    const emberTokens = Math.floor(investmentAmount / EMBER_PRICE);
    
    // Update displays with formatting
    emberTokensDisplay.textContent = emberTokens.toLocaleString();
    totalInvestmentDisplay.textContent = '$' + investmentAmount.toLocaleString('en-US', { 
        minimumFractionDigits: 2, 
        maximumFractionDigits: 2 
    });
}

// ============================================================================
// DEVELOPMENT FUND TRACKER
// ============================================================================

/**
 * Update development fund tracker display
 * In production, this would fetch real data from an API
 */
function updateDevFundTracker() {
    const fillElement = document.getElementById('dev-fund-fill');
    const withdrawnElement = document.getElementById('dev-fund-withdrawn');
    const timestampElement = document.getElementById('dev-fund-timestamp');
    
    if (!fillElement || !withdrawnElement || !timestampElement) return;
    
    // These values would come from your API/smart contract in production
    const TOTAL_FUND = 30000; // $30,000
    const withdrawn = 0; // Start at $0
    
    const percentage = (withdrawn / TOTAL_FUND) * 100;
    
    fillElement.style.width = percentage + '%';
    withdrawnElement.textContent = '$' + withdrawn.toLocaleString();
    
    // Update timestamp
    timestampElement.textContent = 'Presale not yet started';
}

// ============================================================================
// PRESALE PROGRESS BAR
// ============================================================================

/**
 * Update presale progress bar
 * In production, this would fetch real data from your smart contract
 */
function updatePresaleProgress() {
    const progressFill = document.querySelector('.presale-progress .progress-fill');
    const progressStats = document.querySelector('.presale-progress .progress-stats');
    
    if (!progressFill || !progressStats) return;
    
    // These values would come from your smart contract in production
    const HARD_CAP = 500000; // $500,000
    const raised = 0; // Start at $0
    
    const percentage = (raised / HARD_CAP) * 100;
    
    progressFill.style.width = percentage + '%';
    progressStats.innerHTML = `
        <span>$${raised.toLocaleString()} raised</span>
        <span>Goal: $${HARD_CAP.toLocaleString()}</span>
    `;
}

// ============================================================================
// COUNTDOWN TIMER - FIXED DATE
// ============================================================================

/**
 * Initialize and manage presale countdown timer
 */
function initializeCountdownTimer() {
    // Set a realistic presale launch date
    // Change this to your actual launch date
    const PRESALE_LAUNCH_DATE = new Date('2025-02-01 00:00:00 UTC').getTime();
    
    const daysElement = document.getElementById('days');
    const hoursElement = document.getElementById('hours');
    const minutesElement = document.getElementById('minutes');
    const secondsElement = document.getElementById('seconds');
    
    if (!daysElement || !hoursElement || !minutesElement || !secondsElement) {
        console.warn('Countdown timer elements not found');
        return;
    }
    
    function updateCountdown() {
        const now = new Date().getTime();
        const distance = PRESALE_LAUNCH_DATE - now;
        
        if (distance < 0) {
            // Countdown finished
            daysElement.textContent = '00';
            hoursElement.textContent = '00';
            minutesElement.textContent = '00';
            secondsElement.textContent = '00';
            
            // Clear interval when countdown is done
            if (window.emberCountdownInterval) {
                clearInterval(window.emberCountdownInterval);
            }
            return;
        }
        
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        daysElement.textContent = String(days).padStart(2, '0');
        hoursElement.textContent = String(hours).padStart(2, '0');
        minutesElement.textContent = String(minutes).padStart(2, '0');
        secondsElement.textContent = String(seconds).padStart(2, '0');
    }
    
    // Clear any existing interval
    if (window.emberCountdownInterval) {
        clearInterval(window.emberCountdownInterval);
    }
    
    // Update immediately
    updateCountdown();
    
    // Update every second
    window.emberCountdownInterval = setInterval(updateCountdown, 1000);
}

// ============================================================================
// SCROLL ANIMATIONS
// ============================================================================

/**
 * Initialize scroll reveal animations for sections
 */
function initializeScrollAnimations() {
    const revealElements = document.querySelectorAll('.scroll-reveal');
    
    if (revealElements.length === 0) return;
    
    const revealOnScroll = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                // Optional: stop observing after reveal
                revealOnScroll.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    revealElements.forEach(element => {
        revealOnScroll.observe(element);
    });
}

// ============================================================================
// SMOOTH SCROLLING FOR ANCHOR LINKS
// ============================================================================

/**
 * Add smooth scrolling behavior to all anchor links
 */
function initializeSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            
            // Don't prevent default for just '#' or modal triggers
            if (href === '#' || href === '#presale') return;
            
            const targetId = href.substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                e.preventDefault();
                
                const navHeight = document.querySelector('.navbar')?.offsetHeight || 80;
                const targetPosition = targetElement.offsetTop - navHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                const mobileMenu = document.getElementById('mobile-menu');
                const mobileOverlay = document.getElementById('mobile-menu-overlay');
                if (mobileMenu && mobileMenu.classList.contains('active')) {
                    mobileMenu.classList.remove('active');
                    if (mobileOverlay) {
                        mobileOverlay.classList.remove('active');
                    }
                    document.body.style.overflow = '';
                }
            }
        });
    });
}

// ============================================================================
// MODAL CLICK OUTSIDE TO CLOSE
// ============================================================================

/**
 * Close modals when clicking outside the modal content
 */
function initializeModalCloseOnClickOutside() {
    // TPA Modal
    const tpaModal = document.getElementById('tpaModal');
    if (tpaModal) {
        tpaModal.addEventListener('click', function(e) {
            if (e.target === this || e.target.classList.contains('tpa-modal-overlay')) {
                closeTpaModal();
            }
        });
    }
    
    // Whitepaper Modal
    const whitepaperModal = document.getElementById('whitepaperModal');
    if (whitepaperModal) {
        whitepaperModal.addEventListener('click', function(e) {
            if (e.target === this || e.target.classList.contains('tpa-modal-overlay')) {
                closeWhitepaperModal();
            }
        });
    }
}

// ============================================================================
// KEYBOARD ACCESSIBILITY - ESC TO CLOSE MODALS
// ============================================================================

/**
 * Allow ESC key to close modals
 */
function initializeKeyboardAccessibility() {
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' || e.key === 'Esc') {
            // Check if any modal is open and close it
            const tpaModal = document.getElementById('tpaModal');
            const whitepaperModal = document.getElementById('whitepaperModal');
            
            if (tpaModal && tpaModal.style.display === 'flex') {
                closeTpaModal();
            }
            
            if (whitepaperModal && whitepaperModal.style.display === 'flex') {
                closeWhitepaperModal();
            }
        }
    });
}

// ============================================================================
// EVENT LISTENERS
// ============================================================================

/**
 * Initialize all event listeners after DOM is loaded
 */
function initializeEventListeners() {
    // Investment Calculator Input
    const investmentInput = document.getElementById('investment-amount');
    if (investmentInput) {
        investmentInput.addEventListener('input', updateInvestmentCalculator);
        investmentInput.addEventListener('change', updateInvestmentCalculator);
    }
    
    // TPA Checkbox
    const tpaCheckbox = document.getElementById('tpa-agree-checkbox');
    if (tpaCheckbox) {
        tpaCheckbox.addEventListener('change', function() {
            tpaAgreed = this.checked;
            updatePresaleButtonState();
        });
    }
    
    // Presale Button (currently disabled, but ready for functionality)
    const presaleButton = document.getElementById('presale-buy-button');
    if (presaleButton) {
        presaleButton.addEventListener('click', function(e) {
            if (!this.disabled) {
                e.preventDefault();
                // This is where you'd handle the presale purchase
                console.log('Presale button clicked');
                alert('Presale coming soon! This will connect to your wallet when live.');
            }
        });
    }
}

// ============================================================================
// INITIALIZATION
// ============================================================================

/**
 * Main initialization function - called when DOM is ready
 */
function initializeEmberPage() {
    // Prevent double initialization
    if (emberPageInitialized) {
        console.log('⚠ Ember page already initialized');
        return;
    }
    
    console.log('🔥 Initializing Ember Token Page...');
    
    // Initialize all components
    initializeEventListeners();
    updateInvestmentCalculator(); // Set initial values
    updatePresaleButtonState(); // Set initial button state
    updateDevFundTracker();
    updatePresaleProgress();
    initializeCountdownTimer();
    initializeScrollAnimations();
    initializeSmoothScrolling();
    initializeModalCloseOnClickOutside();
    initializeKeyboardAccessibility();
    
    emberPageInitialized = true;
    console.log('✓ Ember Token Page initialized successfully');
}

// ============================================================================
// DOM READY - START INITIALIZATION
// ============================================================================

// Clean up any existing intervals on page unload
window.addEventListener('beforeunload', function() {
    if (window.emberCountdownInterval) {
        clearInterval(window.emberCountdownInterval);
    }
});

// Wait for DOM to be fully loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeEmberPage);
} else {
    // DOM is already loaded
    initializeEmberPage();
}

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Format number with commas for display
 */
window.formatNumberWithCommas = function(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

/**
 * Validate email format
 */
window.isValidEmail = function(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

/**
 * Check if user prefers reduced motion (accessibility)
 */
window.prefersReducedMotion = function() {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

// ============================================================================
// EXPORT FUNCTIONS FOR EXTERNAL USE
// ============================================================================

// Export functions that might be needed by other scripts
window.emberPage = {
    updatePresaleProgress,
    updateDevFundTracker,
    updateInvestmentCalculator,
    updatePresaleButtonState,
    initialized: function() { return emberPageInitialized; }
};

console.log('✓ ember-script.js loaded successfully');
