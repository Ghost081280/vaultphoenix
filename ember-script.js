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
        button.textContent = '🔥 Join Presale (Coming Soon)';
        window.closeTpaModal();
        console.log('✅ TPA agreement confirmed');
        
        // Scroll to presale button
        button.scrollIntoView({ behavior: 'smooth', block: 'center' });
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

// TPA Checkbox Handler
document.addEventListener('DOMContentLoaded', function() {
    const checkbox = document.getElementById('tpa-agree-checkbox');
    const button = document.getElementById('presale-buy-button');
    
    if (checkbox && button) {
        checkbox.addEventListener('change', function() {
            if (this.checked) {
                button.disabled = false;
                button.innerHTML = '<img src="images/VPEmberFlame.svg" alt="Flame" style="width: 32px; height: 32px; display: inline-block; vertical-align: middle; margin-right: 8px;"> Join Presale (Coming Soon)';
            } else {
                button.disabled = true;
                button.innerHTML = '<img src="images/VPEmberFlame.svg" alt="Flame" style="width: 32px; height: 32px; display: inline-block; vertical-align: middle; margin-right: 8px;"> Join Presale (Coming Soon)';
            }
        });
        
        console.log('✅ TPA checkbox handler initialized');
    }
    
    // Close modals when clicking outside
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
});

// ============================================
// INVESTMENT CALCULATOR
// ============================================

document.addEventListener('DOMContentLoaded', function() {
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
});

This adds all the missing modal functions that the HTML buttons are calling. Place this code block starting at line 645 in ember-script.js (right after the closing of the VaultPhoenixEmber namespace).
