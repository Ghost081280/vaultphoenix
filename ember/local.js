/* ===================================
   🔥 ABSOLUTE NUCLEAR JAVASCRIPT FIX
   ADD THIS TO THE VERY TOP OF ember/local.js
   BEFORE EVERYTHING ELSE
   =================================== */

// IMMEDIATE EXECUTION - NO WAITING
(function() {
    'use strict';
    
    console.log('🔥🔥🔥 NUCLEAR HERO FIX ACTIVATED 🔥🔥🔥');
    
    function nukeHeroIntoVisibility() {
        const hero = document.querySelector('.ember-hero') || 
                     document.querySelector('section.ember-hero') || 
                     document.getElementById('home');
        
        if (!hero) {
            console.error('❌ NO HERO FOUND - CREATING ONE');
            return;
        }
        
        console.log('🎯 HERO FOUND - NUKING ALL STYLES');
        
        // ABSOLUTE NUCLEAR INLINE STYLES - OVERRIDES EVERYTHING
        hero.setAttribute('style', `
            display: flex !important;
            flex-direction: column !important;
            align-items: center !important;
            justify-content: center !important;
            opacity: 1 !important;
            visibility: visible !important;
            min-height: 100vh !important;
            max-height: none !important;
            width: 100% !important;
            padding: 120px 20px 80px 20px !important;
            margin: 0 !important;
            background: linear-gradient(135deg, rgb(13, 12, 12) 0%, rgb(26, 15, 10) 50%, rgb(13, 12, 12) 100%) !important;
            position: relative !important;
            z-index: 1 !important;
            overflow: visible !important;
            transform: none !important;
            animation: none !important;
            transition: none !important;
        `);
        
        // NUKE ALL CHILDREN TOO
        const container = hero.querySelector('.ember-hero-container');
        if (container) {
            container.setAttribute('style', `
                display: flex !important;
                flex-direction: column !important;
                align-items: center !important;
                max-width: 1200px !important;
                width: 100% !important;
                margin: 0 auto !important;
                opacity: 1 !important;
                visibility: visible !important;
            `);
        }
        
        const content = hero.querySelector('.ember-hero-content');
        if (content) {
            content.setAttribute('style', `
                display: flex !important;
                flex-direction: column !important;
                align-items: center !important;
                gap: 2rem !important;
                text-align: center !important;
                opacity: 1 !important;
                visibility: visible !important;
                width: 100% !important;
            `);
        }
        
        // Force all text elements visible
        const title = hero.querySelector('.ember-hero-title, h1');
        if (title) {
            title.setAttribute('style', `
                display: block !important;
                opacity: 1 !important;
                visibility: visible !important;
                color: #ffffff !important;
                font-size: clamp(2.5rem, 8vw, 5rem) !important;
                font-weight: 900 !important;
                margin: 0 0 1.5rem 0 !important;
            `);
        }
        
        const subtitle = hero.querySelector('.ember-hero-subtitle, h2');
        if (subtitle) {
            subtitle.setAttribute('style', `
                display: block !important;
                opacity: 1 !important;
                visibility: visible !important;
                color: rgba(255, 255, 255, 0.95) !important;
                font-size: clamp(1.3rem, 3.5vw, 2.2rem) !important;
                font-weight: 700 !important;
                margin: 0 0 1.5rem 0 !important;
                max-width: 900px !important;
            `);
        }
        
        const description = hero.querySelector('.ember-hero-description, p');
        if (description) {
            description.setAttribute('style', `
                display: block !important;
                opacity: 1 !important;
                visibility: visible !important;
                color: rgba(255, 255, 255, 0.85) !important;
                font-size: clamp(1rem, 2vw, 1.25rem) !important;
                line-height: 1.7 !important;
                margin: 0 !important;
                max-width: 850px !important;
            `);
        }
        
        // Force images visible if any
        const images = hero.querySelectorAll('img');
        images.forEach(img => {
            img.setAttribute('style', `
                display: block !important;
                opacity: 1 !important;
                visibility: visible !important;
                max-width: 100% !important;
                height: auto !important;
            `);
        });
        
        console.log('✅ HERO NUKED INTO VISIBILITY');
        console.log('Hero display:', window.getComputedStyle(hero).display);
        console.log('Hero opacity:', window.getComputedStyle(hero).opacity);
        console.log('Hero height:', hero.offsetHeight + 'px');
    }
    
    // RUN IMMEDIATELY
    nukeHeroIntoVisibility();
    
    // RUN ON DOM READY
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', nukeHeroIntoVisibility);
    }
    
    // RUN MULTIPLE TIMES TO OVERRIDE ANY ANIMATIONS
    setTimeout(nukeHeroIntoVisibility, 50);
    setTimeout(nukeHeroIntoVisibility, 100);
    setTimeout(nukeHeroIntoVisibility, 200);
    setTimeout(nukeHeroIntoVisibility, 500);
    setTimeout(nukeHeroIntoVisibility, 1000);
    
    // WATCH FOR ANY CHANGES AND RE-NUKE
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.type === 'attributes' && mutation.attributeName === 'style') {
                const hero = mutation.target;
                if (hero.classList.contains('ember-hero') || hero.id === 'home') {
                    console.log('⚠️ Hero style changed - RE-NUKING');
                    nukeHeroIntoVisibility();
                }
            }
        });
    });
    
    const heroElement = document.querySelector('.ember-hero');
    if (heroElement) {
        observer.observe(heroElement, {
            attributes: true,
            attributeFilter: ['style', 'class']
        });
    }
    
    console.log('🔥 NUCLEAR FIX COMPLETE - HERO IS UNKILLABLE 🔥');
    
})();

/* ===================================
   END ABSOLUTE NUCLEAR FIX
   =================================== */
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
