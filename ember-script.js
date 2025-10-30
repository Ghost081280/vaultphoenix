// ============================================================================
// EMBER PAGE JAVASCRIPT - BODY CONTENT ONLY
// Shared script handles: nav, footer, chatbot, smooth scroll
// This script handles: modals, calculator, countdown, presale logic
// ============================================================================

(function() {
    'use strict';

    // ============================================================================
    // STATE
    // ============================================================================
    let tpaAgreed = false;
    let emberInitialized = false;
    let countdownInterval = null;

    // ============================================================================
    // COUNTDOWN TIMER - EMBER BODY ONLY
    // ============================================================================
    function initializeCountdown() {
        const targetDate = new Date('2025-12-31T23:59:59').getTime();
        
        function updateCountdown() {
            const now = new Date().getTime();
            const distance = targetDate - now;
            
            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);
            
            const daysEl = document.getElementById('days');
            const hoursEl = document.getElementById('hours');
            const minutesEl = document.getElementById('minutes');
            const secondsEl = document.getElementById('seconds');
            
            if (daysEl) daysEl.textContent = days.toString().padStart(2, '0');
            if (hoursEl) hoursEl.textContent = hours.toString().padStart(2, '0');
            if (minutesEl) minutesEl.textContent = minutes.toString().padStart(2, '0');
            if (secondsEl) secondsEl.textContent = seconds.toString().padStart(2, '0');
            
            if (distance < 0) {
                clearInterval(countdownInterval);
                if (daysEl) daysEl.textContent = '00';
                if (hoursEl) hoursEl.textContent = '00';
                if (minutesEl) minutesEl.textContent = '00';
                if (secondsEl) secondsEl.textContent = '00';
            }
        }
        
        updateCountdown();
        countdownInterval = setInterval(updateCountdown, 1000);
    }

    // ============================================================================
    // TPA MODAL
    // ============================================================================
    window.showTpaModal = function() {
        const modal = document.getElementById('tpaModal');
        if (modal) {
            modal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        }
    };

    window.closeTpaModal = function() {
        const modal = document.getElementById('tpaModal');
        if (modal) {
            modal.style.display = 'none';
            document.body.style.overflow = '';
        }
    };

    window.agreeTpa = function() {
        tpaAgreed = true;
        const checkbox = document.getElementById('tpa-agree-checkbox');
        if (checkbox) checkbox.checked = true;
        updatePresaleButton();
        closeTpaModal();
    };

    // ============================================================================
    // WHITEPAPER MODAL
    // ============================================================================
    window.showWhitepaperModal = function() {
        const modal = document.getElementById('whitepaperModal');
        if (modal) {
            modal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        }
    };

    window.closeWhitepaperModal = function() {
        const modal = document.getElementById('whitepaperModal');
        if (modal) {
            modal.style.display = 'none';
            document.body.style.overflow = '';
        }
    };

    // ============================================================================
    // PRESALE BUTTON
    // ============================================================================
    function updatePresaleButton() {
        const checkbox = document.getElementById('tpa-agree-checkbox');
        const button = document.getElementById('presale-buy-button');
        
        if (checkbox && button) {
            if (checkbox.checked || tpaAgreed) {
                button.disabled = false;
                button.style.cursor = 'pointer';
                button.style.background = 'linear-gradient(135deg, #d73327, #fb923c)';
                button.style.opacity = '1';
            } else {
                button.disabled = true;
                button.style.cursor = 'not-allowed';
                button.style.background = 'rgba(128, 128, 128, 0.5)';
                button.style.opacity = '0.6';
            }
        }
    }

    // ============================================================================
    // CALCULATOR
    // ============================================================================
    function updateCalculator() {
        const input = document.getElementById('investment-amount');
        const tokensDisplay = document.getElementById('ember-tokens');
        const totalDisplay = document.getElementById('total-investment');
        
        if (!input || !tokensDisplay || !totalDisplay) return;
        
        const PRICE = 0.003;
        const MIN = 10;
        const MAX = 50000;
        
        let amount = parseFloat(input.value) || MIN;
        if (amount < MIN) amount = MIN;
        if (amount > MAX) amount = MAX;
        input.value = amount;
        
        const tokens = Math.floor(amount / PRICE);
        tokensDisplay.textContent = tokens.toLocaleString();
        totalDisplay.textContent = '$' + amount.toLocaleString('en-US', { 
            minimumFractionDigits: 2, 
            maximumFractionDigits: 2 
        });
    }

    // ============================================================================
    // DEV FUND
    // ============================================================================
    function updateDevFund() {
        const fill = document.getElementById('dev-fund-fill');
        const withdrawn = document.getElementById('dev-fund-withdrawn');
        const timestamp = document.getElementById('dev-fund-timestamp');
        
        if (fill) fill.style.width = '0%';
        if (withdrawn) withdrawn.textContent = '$0';
        if (timestamp) timestamp.textContent = 'Presale not yet started';
    }

    // ============================================================================
    // PROGRESS
    // ============================================================================
    function updateProgress() {
        const fill = document.querySelector('.presale-progress .progress-fill');
        const stats = document.querySelector('.presale-progress .progress-stats');
        
        if (fill) fill.style.width = '0%';
        if (stats) {
            stats.innerHTML = `
                <span>$0 raised</span>
                <span>Goal: $500,000</span>
            `;
        }
    }

    // ============================================================================
    // SCROLL ANIMATIONS - EMBER SECTIONS ONLY
    // ============================================================================
    function initScrollAnimations() {
        const elements = document.querySelectorAll('.scroll-reveal');
        if (elements.length === 0) return;
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });
        
        elements.forEach(el => observer.observe(el));
    }

    // ============================================================================
    // MODAL CLICKS
    // ============================================================================
    function initModalClicks() {
        const tpaModal = document.getElementById('tpaModal');
        if (tpaModal) {
            tpaModal.addEventListener('click', function(e) {
                if (e.target === this || e.target.classList.contains('tpa-modal-overlay')) {
                    closeTpaModal();
                }
            });
        }
        
        const wpModal = document.getElementById('whitepaperModal');
        if (wpModal) {
            wpModal.addEventListener('click', function(e) {
                if (e.target === this || e.target.classList.contains('tpa-modal-overlay')) {
                    closeWhitepaperModal();
                }
            });
        }
    }

    // ============================================================================
    // ESC KEY
    // ============================================================================
    function initEscKey() {
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' || e.key === 'Esc') {
                const tpaModal = document.getElementById('tpaModal');
                const wpModal = document.getElementById('whitepaperModal');
                
                if (tpaModal && tpaModal.style.display === 'flex') closeTpaModal();
                if (wpModal && wpModal.style.display === 'flex') closeWhitepaperModal();
            }
        });
    }

    // ============================================================================
    // EVENT LISTENERS
    // ============================================================================
    function initEvents() {
        // Calculator
        const input = document.getElementById('investment-amount');
        if (input) {
            input.addEventListener('input', updateCalculator);
            input.addEventListener('change', updateCalculator);
        }
        
        // TPA Checkbox
        const checkbox = document.getElementById('tpa-agree-checkbox');
        if (checkbox) {
            checkbox.addEventListener('change', function() {
                tpaAgreed = this.checked;
                updatePresaleButton();
            });
        }
        
        // Presale Button
        const button = document.getElementById('presale-buy-button');
        if (button) {
            button.addEventListener('click', function(e) {
                if (!this.disabled) {
                    e.preventDefault();
                    alert('Presale coming soon! This will connect to your wallet when live.');
                }
            });
        }
    }

    // ============================================================================
    // INIT
    // ============================================================================
    function init() {
        if (emberInitialized) return;
        
        console.log('🔥 Initializing Ember body content...');
        
        initializeCountdown();
        initEvents();
        updateCalculator();
        updatePresaleButton();
        updateDevFund();
        updateProgress();
        initScrollAnimations();
        initModalClicks();
        initEscKey();
        
        emberInitialized = true;
        console.log('✓ Ember body initialized');
    }

    // ============================================================================
    // START
    // ============================================================================
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    // Cleanup
    window.addEventListener('beforeunload', function() {
        if (countdownInterval) clearInterval(countdownInterval);
    });

    // Export
    window.emberPage = {
        initialized: function() { return emberInitialized; }
    };

})();
