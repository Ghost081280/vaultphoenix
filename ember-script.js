// Vault Phoenix - $Ember Token Page Interactive JavaScript
// Production Version - Optimized & Secured
// CLEANED VERSION - Duplicates removed (handled by shared-script.js)
// This file now contains ONLY $Ember-specific features

// ============================================
// IMMEDIATE BACKGROUND FIX
// ============================================
(function() {
    document.documentElement.style.background = '#0f0f0f';
    if (document.body) {
        document.body.style.background = 'linear-gradient(135deg, #0f0f0f 0%, #1a1a1a 25%, #2d1810 50%, #451a03 75%, #7c2d12 100%)';
        document.body.style.opacity = '1';
    }
})();

// ============================================
// DOM CONTENT LOADED - INITIALIZE EVERYTHING
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    console.log('🔥🪙 $Ember Token page loading...');
    
    // Set dark background immediately
    document.body.style.background = 'linear-gradient(135deg, #0f0f0f 0%, #1a1a1a 25%, #2d1810 50%, #451a03 75%, #7c2d12 100%)';
    document.body.style.opacity = '1';
    document.body.classList.add('loaded');
    
    // Initialize $Ember-specific features
    // NOTE: Countdown is handled by shared-script.js
    // NOTE: Chatbot is handled by shared-script.js
    initializePresaleCalculator();
    
    console.log('🔥🪙 $Ember page features initialized');
    console.log('🔥🪙 Countdown timer is managed by shared-script.js');
    console.log('🔥🪙 Chatbot is managed by shared-script.js');
});

// ============================================
// PRESALE CALCULATOR - WITH DEBOUNCED INPUT & VALIDATION
// ============================================
function initializePresaleCalculator() {
    const investmentInput = document.getElementById('investment-amount');
    const emberTokensDisplay = document.getElementById('ember-tokens');
    const totalInvestmentDisplay = document.getElementById('total-investment');
    
    if (!investmentInput) return;
    
    const TOKEN_PRICE = 0.003; // $0.003 per token
    const MIN_INVESTMENT = 10;
    const MAX_INVESTMENT = 50000;
    
    function validateAndCalculate() {
        const investment = parseFloat(investmentInput.value) || 0;
        
        // Validation with color feedback
        if (investment < MIN_INVESTMENT) {
            investmentInput.style.borderColor = '#ef4444';
            investmentInput.style.backgroundColor = 'rgba(239, 68, 68, 0.1)';
        } else if (investment > MAX_INVESTMENT) {
            investmentInput.style.borderColor = '#ef4444';
            investmentInput.style.backgroundColor = 'rgba(239, 68, 68, 0.1)';
        } else {
            investmentInput.style.borderColor = '#4ade80';
            investmentInput.style.backgroundColor = 'rgba(74, 222, 128, 0.1)';
        }
        
        // Calculate tokens
        const tokens = investment / TOKEN_PRICE;
        
        // Update displays
        if (emberTokensDisplay) {
            emberTokensDisplay.textContent = tokens.toLocaleString('en-US', {
                minimumFractionDigits: 0,
                maximumFractionDigits: 0
            });
        }
        
        if (totalInvestmentDisplay) {
            totalInvestmentDisplay.textContent = `$${investment.toLocaleString('en-US', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            })}`;
        }
    }
    
    // Add debounced input event listener (150ms delay)
    // Uses debounce function from shared-script.js
    const debouncedCalculate = window.debounce ? window.debounce(validateAndCalculate, 150) : validateAndCalculate;
    investmentInput.addEventListener('input', debouncedCalculate);
    
    // Also validate on blur (when user clicks away)
    investmentInput.addEventListener('blur', validateAndCalculate);
    
    // Initial calculation
    validateAndCalculate();
}

// ============================================
// LEGAL DOCUMENTS MODAL FUNCTIONS
// ============================================

// Token Presale Agreement (TPA) Modal Functions
window.showTpaModal = function() {
    document.getElementById('tpaModal').style.display = 'flex';
    document.body.style.overflow = 'hidden';
};

window.closeTpaModal = function() {
    document.getElementById('tpaModal').style.display = 'none';
    document.body.style.overflow = '';
};

window.agreeTpa = function() {
    const checkbox = document.getElementById('tpa-agree-checkbox');
    const presaleButton = document.getElementById('presale-buy-button');
    
    if (checkbox && presaleButton) {
        checkbox.checked = true;
        presaleButton.disabled = false;
        presaleButton.style.opacity = '1';
    }
    
    window.closeTpaModal();
    alert('✅ Thank you for reviewing and agreeing to the Token Presale Agreement and Token Disclosures.');
};

// Whitepaper Modal Functions
window.showWhitepaperModal = function() {
    document.getElementById('whitepaperModal').style.display = 'flex';
    document.body.style.overflow = 'hidden';
};

window.closeWhitepaperModal = function() {
    document.getElementById('whitepaperModal').style.display = 'none';
    document.body.style.overflow = '';
};

// Close modals on escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        window.closeTpaModal();
        window.closeWhitepaperModal();
    }
});

// ============================================
// INTERACTIVE FEEDBACK FOR CTA BUTTONS
// ============================================
document.querySelectorAll('.cta-button, .presale-cta-button, .join-waitlist-btn').forEach(button => {
    button.addEventListener('mouseenter', function() {
        this.style.filter = 'brightness(1.1) saturate(1.2)';
    });
    
    button.addEventListener('mouseleave', function() {
        this.style.filter = '';
    });
    
    button.addEventListener('mousedown', function() {
        this.style.transform = 'scale(0.95)';
    });
    
    button.addEventListener('mouseup', function() {
        this.style.transform = '';
    });
});

// ============================================
// SCROLL PROGRESS INDICATOR
// ============================================
function createScrollIndicator() {
    const indicator = document.createElement('div');
    indicator.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        height: 4px;
        background: linear-gradient(90deg, #d73327, #fb923c, #f0a500);
        z-index: 9999;
        transition: width 0.3s ease;
        width: 0%;
        box-shadow: 0 2px 10px rgba(215, 51, 39, 0.3);
    `;
    document.body.appendChild(indicator);
    
    window.addEventListener('scroll', () => {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        indicator.style.width = scrolled + '%';
    });
}

createScrollIndicator();

// ============================================
// IMAGE ERROR HANDLING
// ============================================
document.querySelectorAll('img').forEach(img => {
    img.addEventListener('error', function() {
        this.style.opacity = '0.5';
        this.alt = 'Image loading...';
    });
    
    img.addEventListener('load', function() {
        this.style.opacity = '1';
    });
});

// ============================================
// ENHANCED PAGE LOAD HANDLING
// ============================================
window.addEventListener('load', () => {
    // Add glow effect to logo
    const logoIcon = document.querySelector('.logo-icon');
    if (logoIcon) {
        logoIcon.style.filter = 'drop-shadow(0 0 15px rgba(215, 51, 39, 0.8))';
    }
    
    console.log('🔥🪙 $Ember Token page fully loaded!');
});
