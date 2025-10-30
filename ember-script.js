// ============================================================================
// EMBER PAGE JAVASCRIPT - PRODUCTION V4 - SHARED SCRIPT PRIORITY
// Waits for shared-script.js to initialize first, then adds ember-specific features
// ============================================================================

// ============================================================================
// GLOBAL STATE
// ============================================================================
let tpaAgreed = false;
let emberPageInitialized = false;

// ============================================================================
// WAIT FOR SHARED SCRIPT - CRITICAL CHECK
// ============================================================================
function waitForSharedScript(callback) {
    // Check if shared script is ready
    if (typeof window.sharedScriptReady !== 'undefined' && window.sharedScriptReady === true) {
        console.log('✓ Shared script detected, proceeding with ember initialization');
        callback();
    } else {
        console.log('⏳ Waiting for shared-script.js...');
        setTimeout(() => waitForSharedScript(callback), 50);
    }
}

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
// SCROLL ANIMATIONS - EMBER SPECIFIC
// ============================================================================

/**
 * Initialize scroll reveal animations for sections
 * Note: Respects shared script's smooth scrolling configuration
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
// EVENT LISTENERS - EMBER SPECIFIC
// ============================================================================

/**
 * Initialize all ember-specific event listeners after DOM is loaded
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
// EMBER PAGE INITIALIZATION
// ============================================================================

/**
 * Main initialization function - called AFTER shared script is ready
 */
function initializeEmberPage() {
    // Prevent double initialization
    if (emberPageInitialized) {
        console.log('⚠ Ember page already initialized');
        return;
    }
    
    console.log('🔥 Initializing Ember Token Page...');
    
    // Initialize ember-specific components only
    // (Countdown timer and smooth scrolling handled by shared-script.js)
    initializeEventListeners();
    updateInvestmentCalculator(); // Set initial values
    updatePresaleButtonState(); // Set initial button state
    updateDevFundTracker();
    updatePresaleProgress();
    initializeScrollAnimations(); // Ember-specific reveal animations
    initializeModalCloseOnClickOutside(); // TPA/Whitepaper modals
    initializeKeyboardAccessibility(); // ESC key for ember modals
    
    emberPageInitialized = true;
    console.log('✓ Ember Token Page initialized successfully');
    console.log('✓ Countdown timer managed by shared-script.js');
    console.log('✓ Smooth scrolling managed by shared-script.js');
    console.log('✓ Mobile menu managed by shared-script.js');
    console.log('✓ Chatbot managed by shared-script.js');
}

// ============================================================================
// START INITIALIZATION - WAIT FOR BOTH DOM AND SHARED SCRIPT
// ============================================================================

// Wait for DOM first, then wait for shared script
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
        console.log('🔥 Ember DOM loaded, waiting for shared script...');
        waitForSharedScript(initializeEmberPage);
    });
} else {
    // DOM already loaded
    console.log('🔥 Ember DOM already loaded, waiting for shared script...');
    waitForSharedScript(initializeEmberPage);
}

// ============================================================================
// CLEANUP ON PAGE UNLOAD
// ============================================================================

window.addEventListener('beforeunload', function() {
    console.log('🔥 Ember page unloading');
    // Countdown interval is managed by shared-script.js
});

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

console.log('✓ ember-script.js loaded (V4 - Shared Script Priority)');
