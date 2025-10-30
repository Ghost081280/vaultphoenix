Add the following modal management functions to ember-script.js. Place them AFTER the VaultPhoenixEmber namespace (after line 644) but BEFORE the console messages at the end:

// ============================================
// MODAL MANAGEMENT FUNCTIONS
// ============================================

// TPA Modal Functions
window.showTpaModal = function() {
    const modal = document.getElementById('tpaModal');
    if (modal) {
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
        console.log('✅ TPA Modal opened');
    }
};

window.closeTpaModal = function() {
    const modal = document.getElementById('tpaModal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = '';
        console.log('✅ TPA Modal closed');
    }
};

window.agreeTpa = function() {
    const checkbox = document.getElementById('tpa-agree-checkbox');
    const button = document.getElementById('presale-buy-button');
    
    if (checkbox && button) {
        checkbox.checked = true;
        button.disabled = false;
        
        // Update button text with flame icon
        const flameIcon = '<img src="images/VPEmberFlame.svg" alt="Flame" style="width: 32px; height: 32px; display: inline-block; vertical-align: middle; margin-right: 8px;" loading="lazy">';
        button.innerHTML = flameIcon + ' Join Presale (Coming Soon)';
        
        window.closeTpaModal();
        console.log('✅ TPA agreement confirmed');
        
        // Scroll to presale button
        setTimeout(() => {
            button.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 300);
    }
};

// Whitepaper Modal Functions
window.showWhitepaperModal = function() {
    const modal = document.getElementById('whitepaperModal');
    if (modal) {
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
        console.log('✅ Whitepaper Modal opened');
    }
};

window.closeWhitepaperModal = function() {
    const modal = document.getElementById('whitepaperModal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = '';
        console.log('✅ Whitepaper Modal closed');
    }
};

// ============================================
// INVESTMENT CALCULATOR
// ============================================

function initializeInvestmentCalculator() {
    const investmentInput = document.getElementById('investment-amount');
    const emberTokensDisplay = document.getElementById('ember-tokens');
    const totalInvestmentDisplay = document.getElementById('total-investment');
    
    if (investmentInput && emberTokensDisplay && totalInvestmentDisplay) {
        function updateCalculation() {
            const investment = parseFloat(investmentInput.value) || 0;
            const tokenPrice = 0.003;
            const tokens = Math.floor(investment / tokenPrice);
            
            emberTokensDisplay.textContent = tokens.toLocaleString();
            totalInvestmentDisplay.textContent = '$' + investment.toFixed(2);
        }
        
        investmentInput.addEventListener('input', updateCalculation);
        updateCalculation(); // Initial calculation
        
        console.log('✅ Investment calculator initialized');
    }
}

// ============================================
// TPA CHECKBOX & MODAL HANDLERS
// ============================================

function initializeTpaHandlers() {
    const checkbox = document.getElementById('tpa-agree-checkbox');
    const button = document.getElementById('presale-buy-button');
    
    if (checkbox && button) {
        checkbox.addEventListener('change', function() {
            const flameIcon = '<img src="images/VPEmberFlame.svg" alt="Flame" style="width: 32px; height: 32px; display: inline-block; vertical-align: middle; margin-right: 8px;" loading="lazy">';
            
            if (this.checked) {
                button.disabled = false;
                button.innerHTML = flameIcon + ' Join Presale (Coming Soon)';
            } else {
                button.disabled = true;
                button.innerHTML = flameIcon + ' Join Presale (Coming Soon)';
            }
        });
        
        console.log('✅ TPA checkbox handler initialized');
    }
    
    // Close modals when clicking overlay
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('tpa-modal-overlay')) {
            const tpaModal = document.getElementById('tpaModal');
            const wpModal = document.getElementById('whitepaperModal');
            
            if (tpaModal && tpaModal.style.display === 'flex') {
                window.closeTpaModal();
            }
            if (wpModal && wpModal.style.display === 'flex') {
                window.closeWhitepaperModal();
            }
        }
    });
    
    // Close modals with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            const tpaModal = document.getElementById('tpaModal');
            const wpModal = document.getElementById('whitepaperModal');
            
            if (tpaModal && tpaModal.style.display === 'flex') {
                window.closeTpaModal();
            }
            if (wpModal && wpModal.style.display === 'flex') {
                window.closeWhitepaperModal();
            }
        }
    });
}

// ============================================
// PAGE INITIALIZATION - UPDATED
// ============================================

function initializePage() {
    console.log('🔥🪙 Vault Phoenix Ember initializing (v3.0 - Namespace Pattern)...');
    
    // Ensure dark background
    document.body.style.background = 'linear-gradient(135deg, #0f0f0f 0%, #1a1a1a 25%, #2d1810 50%, #451a03 75%, #7c2d12 100%)';
    document.body.style.backgroundAttachment = 'fixed';
    document.body.style.opacity = '1';
    document.body.classList.add('loaded');
    
    // Log device info
    console.log('📱 Device:', {
        mobile: DeviceInfo.isMobile,
        width: DeviceInfo.screenWidth,
        touch: DeviceInfo.supportsTouch,
        reducedMotion: DeviceInfo.prefersReducedMotion
    });
    
    // Initialize all features
    createFloatingEmberCoins();
    initializeScrollReveal();
    initializeCardEffects();
    initializeGlowImages();
    createScrollProgressIndicator();
    enhanceCTAButtons();
    initializeStatsAnimation();
    
    // Initialize new features
    initializeInvestmentCalculator();
    initializeTpaHandlers();
    
    // Mobile-specific optimizations
    if (DeviceInfo.isMobile) {
        optimizeMobilePerformance();
    }
    
    console.log('🔥🪙 Vault Phoenix Ember initialized successfully!');
    console.log('✅ Using shared-script.js for: smooth scrolling, countdown timer, mobile menu, navbar transitions, chatbot');
}

function onWindowLoad() {
    console.log('🔥🪙 Vault Phoenix Ember fully loaded!');
    
    // Optimize image loading after page load
    optimizeImageLoading();
    
    // Add ember glow effect to logo
    const logoIcon = DOMCache.get('.logo-icon');
    if (logoIcon) {
        logoIcon.style.filter = 'drop-shadow(0 0 15px rgba(240, 165, 0, 0.8))';
    }
    
    // Performance monitoring
    setTimeout(() => {
        const floatingCoins = DOMCache.get('.ember-floating-coins');
        if (floatingCoins) {
            console.log('✅ Floating ember coins active');
        }
        
        const moduleCards = DOMCache.getAll('.module-card');
        console.log(`✅ ${moduleCards.length} module cards loaded`);
    }, 500);
    
    // Performance timing
    const loadTime = performance.now();
    console.log(`%c🔥 Ember page loaded in ${Math.round(loadTime)}ms`, 'color: #22c55e; font-weight: bold;');
}

function cleanup() {
    DOMCache.clear();
    console.log('🧹 Ember cleanup complete');
}

// ============================================
// EVENT LISTENERS - CONSOLIDATED
// ============================================

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializePage);
} else {
    initializePage();
}

window.addEventListener('load', onWindowLoad);
window.addEventListener('beforeunload', cleanup);

// ============================================
// PUBLIC API
// ============================================

return {
    DeviceInfo: DeviceInfo,
    safeQuery: safeQuery,
    safeQueryAll: safeQueryAll,
    DOMCache: DOMCache
};

})();

// ============================================
// CONSOLE MESSAGES
// ============================================

console.log('%c🔥 VAULT PHOENIX EMBER', 'color: #d73327; font-size: 24px; font-weight: bold;');
console.log('%c$EMBER Token - Presale Edition', 'color: #fb923c; font-size: 16px; font-weight: bold;');
console.log('%c📧 contact@vaultphoenix.com', 'color: #374151; font-size: 12px;');
console.log('%c💡 Senior Engineering - Mobile-First Architecture v3.0', 'color: #22c55e; font-size: 12px; font-weight: bold;');
console.log('%c✅ Namespace Pattern with Complete Feature Set', 'color: #3b82f6; font-size: 12px; font-weight: bold;');
