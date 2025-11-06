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
/* ===================================
   HERO DIAGNOSTIC OVERLAY - ADD TO ember/local.js
   Shows diagnostic info directly on the page
   =================================== */

(function() {
    'use strict';
    
    // Wait for page to load
    window.addEventListener('load', function() {
        setTimeout(showHeroDiagnostic, 1000);
    });
    
    function showHeroDiagnostic() {
        const hero = document.querySelector('.ember-hero');
        
        // Create diagnostic overlay
        const overlay = document.createElement('div');
        overlay.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: rgba(0, 0, 0, 0.95);
            color: #00ff00;
            padding: 20px;
            border: 3px solid #00ff00;
            border-radius: 10px;
            font-family: monospace;
            font-size: 14px;
            z-index: 99999;
            max-width: 400px;
            max-height: 80vh;
            overflow-y: auto;
        `;
        
        let html = '<div style="color: #00ff00; font-weight: bold; margin-bottom: 10px;">🔍 HERO DIAGNOSTIC</div>';
        
        if (!hero) {
            html += '<div style="color: #ff0000;">❌ HERO NOT FOUND!</div>';
            html += '<div>No element with class .ember-hero exists</div>';
        } else {
            const styles = window.getComputedStyle(hero);
            const rect = hero.getBoundingClientRect();
            
            html += '<div style="color: #ffff00; margin-top: 10px;">📊 COMPUTED STYLES:</div>';
            html += `<div>display: <span style="color: ${styles.display === 'none' ? '#ff0000' : '#00ff00'}">${styles.display}</span></div>`;
            html += `<div>opacity: <span style="color: ${styles.opacity === '0' ? '#ff0000' : '#00ff00'}">${styles.opacity}</span></div>`;
            html += `<div>visibility: <span style="color: ${styles.visibility === 'hidden' ? '#ff0000' : '#00ff00'}">${styles.visibility}</span></div>`;
            html += `<div>height: <span style="color: ${rect.height === 0 ? '#ff0000' : '#00ff00'}">${styles.height}</span></div>`;
            html += `<div>min-height: ${styles.minHeight}</div>`;
            html += `<div>position: ${styles.position}</div>`;
            html += `<div>z-index: ${styles.zIndex}</div>`;
            html += `<div>transform: ${styles.transform}</div>`;
            
            html += '<div style="color: #ffff00; margin-top: 10px;">📋 CLASSES:</div>';
            html += `<div>${hero.className || 'none'}</div>`;
            
            html += '<div style="color: #ffff00; margin-top: 10px;">🎨 INLINE STYLES:</div>';
            html += `<div>${hero.style.cssText || 'none'}</div>`;
            
            html += '<div style="color: #ffff00; margin-top: 10px;">📐 DIMENSIONS:</div>';
            html += `<div>top: ${rect.top}px</div>`;
            html += `<div>left: ${rect.left}px</div>`;
            html += `<div>width: ${rect.width}px</div>`;
            html += `<div>height: <span style="color: ${rect.height === 0 ? '#ff0000' : '#00ff00'}">${rect.height}px</span></div>`;
            
            html += '<div style="color: #ffff00; margin-top: 10px;">📝 CONTENT:</div>';
            html += `<div>innerHTML length: ${hero.innerHTML.length}</div>`;
            html += `<div>textContent length: ${hero.textContent.trim().length}</div>`;
            
            // Check parent
            const parent = hero.parentElement;
            if (parent) {
                const pStyles = window.getComputedStyle(parent);
                html += '<div style="color: #ffff00; margin-top: 10px;">👨 PARENT:</div>';
                html += `<div>tag: ${parent.tagName}</div>`;
                html += `<div>class: ${parent.className || 'none'}</div>`;
                html += `<div>display: <span style="color: ${pStyles.display === 'none' ? '#ff0000' : '#00ff00'}">${pStyles.display}</span></div>`;
            }
            
            html += '<div style="color: #ffff00; margin-top: 10px;">🏥 DIAGNOSIS:</div>';
            
            let problems = [];
            if (styles.display === 'none') problems.push('display: none');
            if (styles.opacity === '0') problems.push('opacity: 0');
            if (styles.visibility === 'hidden') problems.push('visibility: hidden');
            if (rect.height === 0) problems.push('height is 0');
            if (hero.innerHTML.length < 50) problems.push('little/no content');
            
            if (problems.length > 0) {
                html += `<div style="color: #ff0000;">❌ PROBLEMS FOUND:</div>`;
                problems.forEach(p => {
                    html += `<div style="color: #ff0000;">  - ${p}</div>`;
                });
            } else {
                html += `<div style="color: #00ff00;">✅ Hero SHOULD be visible!</div>`;
                html += `<div>If not visible, check:</div>`;
                html += `<div>- Navbar covering it (z-index)</div>`;
                html += `<div>- Text color (white on white)</div>`;
                html += `<div>- Scroll position</div>`;
            }
        }
        
        // Add close button
        html += `<div style="margin-top: 15px; text-align: center;">
            <button onclick="this.parentElement.parentElement.remove()" 
                    style="background: #ff0000; color: white; border: none; 
                           padding: 10px 20px; border-radius: 5px; cursor: pointer; 
                           font-weight: bold;">
                CLOSE DIAGNOSTIC
            </button>
        </div>`;
        
        overlay.innerHTML = html;
        document.body.appendChild(overlay);
        
        console.log('Hero diagnostic overlay added to page');
    }
    
})();
