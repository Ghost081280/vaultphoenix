/* ===================================
   VAULT PHOENIX - EMBER LOCAL JS v1.0
   Page-specific functionality for ember.html
   Works with shared/global.js
   =================================== */

(function() {
    'use strict';
    
    // Configuration
    const CONFIG = {
        presaleDate: '2025-11-01T12:00:00-05:00', // November 1, 2025, 12:00 PM EST
        tokenPrice: 0.003, // $0.003 per EMBER token
        minInvestment: 10,
        maxInvestment: 50000,
        defaultInvestment: 10
    };
    
    // Wait for DOM to be ready
    document.addEventListener('DOMContentLoaded', function() {
        console.log('Ember page initialized');
        
        // Initialize all functionality
        initCountdownTimer();
        initInvestmentCalculator();
        initModals();
        initSmoothScroll();
        initProgressBars();
        
    });
    
    /* ===================================
       COUNTDOWN TIMER
       Updates every second until presale launch
       =================================== */
    function initCountdownTimer() {
        const timerElements = {
            days: document.getElementById('days'),
            hours: document.getElementById('hours'),
            minutes: document.getElementById('minutes'),
            seconds: document.getElementById('seconds')
        };
        
        // Check if all elements exist
        const allElementsExist = Object.values(timerElements).every(el => el !== null);
        if (!allElementsExist) {
            console.warn('Countdown timer elements not found');
            return;
        }
        
        function updateCountdown() {
            const targetDate = new Date(CONFIG.presaleDate);
            const now = new Date();
            const diff = targetDate - now;
            
            if (diff <= 0) {
                // Presale has started
                timerElements.days.textContent = '00';
                timerElements.hours.textContent = '00';
                timerElements.minutes.textContent = '00';
                timerElements.seconds.textContent = '00';
                
                // Optional: Update button text
                const presaleButton = document.getElementById('presale-buy-button');
                if (presaleButton) {
                    presaleButton.innerHTML = '<img src="images/VPEmberFlame.svg" alt="" aria-hidden="true" style="width: 32px; height: 32px;"> Join Presale Now!';
                }
                
                return;
            }
            
            // Calculate time units
            const days = Math.floor(diff / (1000 * 60 * 60 * 24));
            const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((diff % (1000 * 60)) / 1000);
            
            // Update DOM with padded values
            timerElements.days.textContent = days.toString().padStart(2, '0');
            timerElements.hours.textContent = hours.toString().padStart(2, '0');
            timerElements.minutes.textContent = minutes.toString().padStart(2, '0');
            timerElements.seconds.textContent = seconds.toString().padStart(2, '0');
        }
        
        // Initial update
        updateCountdown();
        
        // Update every second
        setInterval(updateCountdown, 1000);
        
        console.log('Countdown timer initialized');
    }
    
    /* ===================================
       INVESTMENT CALCULATOR
       Real-time calculation of EMBER tokens
       =================================== */
    function initInvestmentCalculator() {
        const investmentInput = document.getElementById('investment-amount');
        const emberTokensDisplay = document.getElementById('ember-tokens');
        const totalInvestmentDisplay = document.getElementById('total-investment');
        
        if (!investmentInput || !emberTokensDisplay || !totalInvestmentDisplay) {
            console.warn('Investment calculator elements not found');
            return;
        }
        
        function formatNumber(num) {
            return Math.floor(num).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        }
        
        function calculateTokens() {
            let amount = parseFloat(investmentInput.value) || CONFIG.defaultInvestment;
            
            // Enforce min/max limits
            if (amount < CONFIG.minInvestment) {
                amount = CONFIG.minInvestment;
                investmentInput.value = amount;
            }
            if (amount > CONFIG.maxInvestment) {
                amount = CONFIG.maxInvestment;
                investmentInput.value = amount;
            }
            
            // Calculate tokens
            const tokens = amount / CONFIG.tokenPrice;
            
            // Update displays
            emberTokensDisplay.textContent = formatNumber(tokens);
            totalInvestmentDisplay.textContent = '$' + formatNumber(amount);
        }
        
        // Listen for input changes
        investmentInput.addEventListener('input', calculateTokens);
        investmentInput.addEventListener('change', calculateTokens);
        
        // Initial calculation
        calculateTokens();
        
        console.log('Investment calculator initialized');
    }
    
    /* ===================================
       MODAL SYSTEMS
       TPA Modal and Whitepaper Modal
       =================================== */
    function initModals() {
        initTpaModal();
        initWhitepaperModal();
    }
    
    // TPA Modal (Token Presale Agreement + Disclosures)
    function initTpaModal() {
        const modal = document.getElementById('tpaModal');
        const checkbox = document.getElementById('tpa-agree-checkbox');
        const presaleButton = document.getElementById('presale-buy-button');
        
        if (!modal) {
            console.warn('TPA modal not found');
            return;
        }
        
        // Show TPA modal
        window.showTpaModal = function() {
            modal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        };
        
        // Close TPA modal
        window.closeTpaModal = function() {
            modal.style.display = 'none';
            document.body.style.overflow = '';
        };
        
        // Agree to TPA
        window.agreeTpa = function() {
            if (checkbox) {
                checkbox.checked = true;
                
                // Trigger change event to enable button
                checkbox.dispatchEvent(new Event('change'));
            }
            window.closeTpaModal();
        };
        
        // Enable presale button when checkbox is checked
        if (checkbox && presaleButton) {
            checkbox.addEventListener('change', function() {
                if (this.checked) {
                    presaleButton.disabled = false;
                    presaleButton.style.opacity = '1';
                    presaleButton.style.cursor = 'pointer';
                } else {
                    presaleButton.disabled = true;
                    presaleButton.style.opacity = '0.6';
                    presaleButton.style.cursor = 'not-allowed';
                }
            });
        }
        
        // Close modal when clicking overlay
        const overlay = modal.querySelector('.tpa-modal-overlay');
        if (overlay) {
            overlay.addEventListener('click', window.closeTpaModal);
        }
        
        // Close with Escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && modal.style.display === 'flex') {
                window.closeTpaModal();
            }
        });
        
        console.log('TPA modal initialized');
    }
    
    // Whitepaper Modal
    function initWhitepaperModal() {
        const modal = document.getElementById('whitepaperModal');
        
        if (!modal) {
            console.warn('Whitepaper modal not found');
            return;
        }
        
        // Show whitepaper modal
        window.showWhitepaperModal = function() {
            modal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        };
        
        // Close whitepaper modal
        window.closeWhitepaperModal = function() {
            modal.style.display = 'none';
            document.body.style.overflow = '';
        };
        
        // Close modal when clicking overlay
        const overlay = modal.querySelector('.tpa-modal-overlay');
        if (overlay) {
            overlay.addEventListener('click', window.closeWhitepaperModal);
        }
        
        // Close with Escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && modal.style.display === 'flex') {
                window.closeWhitepaperModal();
            }
        });
        
        console.log('Whitepaper modal initialized');
    }
    
    /* ===================================
       SMOOTH SCROLL
       Smooth scrolling for anchor links
       =================================== */
    function initSmoothScroll() {
        // Get navbar height for offset
        const navbar = document.getElementById('navbar');
        const navbarHeight = navbar ? navbar.offsetHeight : 80;
        
        // Handle all anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                
                // Skip if it's just "#" (empty anchor)
                if (href === '#') {
                    return;
                }
                
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    e.preventDefault();
                    
                    // Calculate position with navbar offset
                    const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navbarHeight - 20;
                    
                    // Smooth scroll
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
        
        console.log('Smooth scroll initialized');
    }
    
    /* ===================================
       PROGRESS BARS (Optional)
       Can be updated with real data from backend
       =================================== */
    function initProgressBars() {
        // Presale progress bar
        const presaleProgress = document.querySelector('.presale-progress .progress-fill');
        if (presaleProgress) {
            // Static for now - can be updated with real data
            // Example: updateProgressBar(presaleProgress, 0, 500000, currentAmount);
        }
        
        // Development fund tracker
        const devFundFill = document.getElementById('dev-fund-fill');
        const devFundWithdrawn = document.getElementById('dev-fund-withdrawn');
        const devFundTimestamp = document.getElementById('dev-fund-timestamp');
        
        if (devFundFill && devFundWithdrawn && devFundTimestamp) {
            // Static for now - can be updated with real data from backend
            // Example values (update these with real data):
            const totalDevFund = 30000;
            const withdrawn = 0; // Update this with actual withdrawn amount
            
            updateDevFundTracker(withdrawn, totalDevFund);
        }
        
        console.log('Progress bars initialized');
    }
    
    // Helper function to update dev fund tracker
    function updateDevFundTracker(withdrawn, total) {
        const devFundFill = document.getElementById('dev-fund-fill');
        const devFundWithdrawn = document.getElementById('dev-fund-withdrawn');
        const devFundTimestamp = document.getElementById('dev-fund-timestamp');
        
        if (!devFundFill || !devFundWithdrawn || !devFundTimestamp) return;
        
        const percentage = (withdrawn / total) * 100;
        
        devFundFill.style.width = percentage + '%';
        devFundWithdrawn.textContent = '$' + withdrawn.toLocaleString();
        
        if (withdrawn > 0) {
            const now = new Date();
            devFundTimestamp.textContent = now.toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            });
        } else {
            devFundTimestamp.textContent = 'Presale not yet started';
        }
    }
    
    /* ===================================
       UTILITY FUNCTIONS
       =================================== */
    
    // Format currency
    function formatCurrency(amount) {
        return '$' + amount.toLocaleString('en-US', {
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        });
    }
    
    // Format token amount
    function formatTokens(amount) {
        return amount.toLocaleString('en-US', {
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        });
    }
    
    // Validate investment amount
    function validateInvestmentAmount(amount) {
        const numAmount = parseFloat(amount);
        
        if (isNaN(numAmount)) {
            return {
                valid: false,
                error: 'Please enter a valid number'
            };
        }
        
        if (numAmount < CONFIG.minInvestment) {
            return {
                valid: false,
                error: 'Minimum investment is $' + CONFIG.minInvestment
            };
        }
        
        if (numAmount > CONFIG.maxInvestment) {
            return {
                valid: false,
                error: 'Maximum investment is $' + formatCurrency(CONFIG.maxInvestment)
            };
        }
        
        return {
            valid: true,
            amount: numAmount
        };
    }
    
    /* ===================================
       EXPOSE UTILITY FUNCTIONS (Optional)
       For use in other scripts or console
       =================================== */
    window.emberUtils = {
        updateDevFundTracker: updateDevFundTracker,
        formatCurrency: formatCurrency,
        formatTokens: formatTokens,
        validateInvestmentAmount: validateInvestmentAmount
    };
    
    console.log('Ember local.js loaded successfully');
    
})();

/* ===================================
   END OF EMBER LOCAL JS v1.0
   All page-specific functionality complete ✅
   =================================== */
