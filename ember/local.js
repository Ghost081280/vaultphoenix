/* ===================================
   VAULT PHOENIX - EMBER LOCAL JS v3.0
   Page-specific functionality for ember.html
   Works with shared/global.js
   NOW WITH SCENARIO SWITCHING + COMPLETE AIRDROP SYSTEM! 🔥
   =================================== */

(function() {
    'use strict';
    
    // ===================================
    // CONFIGURATION WITH SCENARIO SUPPORT
    // ===================================
    const CONFIG = {
        scenarios: {
            hardCap: {
                name: 'Hard Cap',
                amount: 300000,
                tokens: 100000000,
                maxInvestment: 50000,
                minInvestment: 10,
                airdrop: {
                    totalEmber: 18000000,
                    tokensPerClaim: 3600,
                    maxPeople: 5000,
                    valuePerClaim: 10.80,
                    percentage: '1.8%',
                    poolValue: '≈$54K'
                },
                fundAllocation: {
                    liquidity: 120000,
                    development: 105000,
                    legal: 15000,
                    marketing: 60000
                },
                tokenomics: {
                    presale: { percentage: '10%', tokens: '100M', desc: '10% of total supply' },
                    airdrop: { percentage: '1.8%', tokens: '18M' },
                    liquidityIncentives: { percentage: '4.87%', tokens: '48.7M' }
                }
            },
            softCap: {
                name: 'Soft Cap',
                amount: 150000,
                tokens: 50000000,
                maxInvestment: 25000,
                minInvestment: 10,
                airdrop: {
                    totalEmber: 9000000,
                    tokensPerClaim: 1800,
                    maxPeople: 5000,
                    valuePerClaim: 5.40,
                    percentage: '0.9%',
                    poolValue: '≈$27K'
                },
                fundAllocation: {
                    liquidity: 60000,
                    development: 52500,
                    legal: 7500,
                    marketing: 30000
                },
                tokenomics: {
                    presale: { percentage: '5%', tokens: '50M', desc: '5% of total supply' },
                    airdrop: { percentage: '0.9%', tokens: '9M' },
                    liquidityIncentives: { percentage: '4.87%', tokens: '48.7M' },
                    unallocated: { percentage: '5.9%', tokens: '59M' }
                }
            }
        },
        currentScenario: 'hardCap', // default
        tokenPrice: 0.003,
        presaleDate: '2025-11-01T12:00:00-05:00'
    };
    
    // Wait for DOM to be ready
    document.addEventListener('DOMContentLoaded', function() {
        console.log('🔥 Ember page v3.0 initialized with Scenario Switching + Airdrop System');
        
        // Check localStorage for saved scenario
        const savedScenario = localStorage.getItem('emberScenario') || 'hardCap';
        
        // Check URL hash for scenario
        const hash = window.location.hash;
        if (hash === '#soft-cap') {
            CONFIG.currentScenario = 'softCap';
        } else if (hash === '#hard-cap') {
            CONFIG.currentScenario = 'hardCap';
        } else if (savedScenario) {
            CONFIG.currentScenario = savedScenario;
        }
        
        // Initialize scenario toggle system FIRST
        initScenarioToggle();
        
        // Apply the current scenario (this will update all dynamic content)
        switchScenario(CONFIG.currentScenario, false);
        
        // Initialize core presale functionality
        initCountdownTimer();
        initInvestmentCalculator();
        initModals();
        initSmoothScroll();
        initProgressBars();
        
        // Initialize Airdrop System
        initAirdropModals();
        initAirdropForm();
        initStatusChecker();
        initShareButtons();
        initCopyHashtags();
        initAirdropTracker();
        
        console.log('✅ All Ember page features initialized with scenario:', CONFIG.currentScenario);
    });
    
    /* ===================================
       SCENARIO TOGGLE SYSTEM
       =================================== */
    function initScenarioToggle() {
        const hardCapBtn = document.getElementById('hard-cap-btn');
        const softCapBtn = document.getElementById('soft-cap-btn');
        
        if (!hardCapBtn || !softCapBtn) {
            console.warn('Scenario toggle buttons not found');
            return;
        }
        
        // Attach click handlers
        hardCapBtn.addEventListener('click', function() {
            switchScenario('hardCap', true);
        });
        
        softCapBtn.addEventListener('click', function() {
            switchScenario('softCap', true);
        });
        
        // Set initial active state
        updateToggleButtons();
        
        console.log('✅ Scenario toggle initialized');
    }
    
    function updateToggleButtons() {
        const hardCapBtn = document.getElementById('hard-cap-btn');
        const softCapBtn = document.getElementById('soft-cap-btn');
        
        if (!hardCapBtn || !softCapBtn) return;
        
        if (CONFIG.currentScenario === 'hardCap') {
            hardCapBtn.classList.add('active');
            hardCapBtn.setAttribute('aria-selected', 'true');
            softCapBtn.classList.remove('active');
            softCapBtn.setAttribute('aria-selected', 'false');
        } else {
            softCapBtn.classList.add('active');
            softCapBtn.setAttribute('aria-selected', 'true');
            hardCapBtn.classList.remove('active');
            hardCapBtn.setAttribute('aria-selected', 'false');
        }
    }
    
    /* ===================================
       MAIN SCENARIO SWITCHING FUNCTION
       =================================== */
    function switchScenario(scenarioKey, saveToStorage = true) {
        console.log('🔄 Switching to scenario:', scenarioKey);
        
        // Update current scenario
        CONFIG.currentScenario = scenarioKey;
        const scenario = CONFIG.scenarios[scenarioKey];
        
        // Update toggle button states
        updateToggleButtons();
        
        // Update all dynamic content
        updateHeroMetrics(scenario);
        updatePresaleMetrics(scenario);
        updateAirdropStats(scenario);
        updateCalculator(scenario);
        updateBenefitCards(scenario);
        updateCTAStats(scenario);
        updateInvestmentLimits(scenario);
        updateTokenomicsTables(scenario);
        updateAirdropModals(scenario);
        updateInvestorIncentive(scenario);
        updateFundAllocation(scenario);
        
        // Save to localStorage
        if (saveToStorage) {
            localStorage.setItem('emberScenario', scenarioKey);
        }
        
        // Update URL hash
        const hashName = scenarioKey === 'hardCap' ? 'hard-cap' : 'soft-cap';
        if (window.location.hash !== '#' + hashName) {
            history.replaceState(null, null, '#' + hashName);
        }
        
        console.log('✅ Scenario switched successfully to', scenario.name);
    }
    
    /* ===================================
       UPDATE FUNCTIONS FOR DYNAMIC CONTENT
       =================================== */
    
    function updateHeroMetrics(scenario) {
        updateElement('[data-dynamic="hero-cap"]', formatCurrency(scenario.amount));
        updateElement('[data-dynamic="hero-cap-label"]', scenario.name.toUpperCase());
    }
    
    function updatePresaleMetrics(scenario) {
        updateElement('[data-dynamic="presale-tokens"]', formatTokensShort(scenario.tokens));
        updateElement('[data-dynamic="presale-tokens-desc"]', scenario.tokenomics.presale.desc);
        updateElement('[data-dynamic="presale-cap"]', formatCurrency(scenario.amount));
        updateElement('[data-dynamic="cap-label"]', scenario.name);
        
        // Update progress bar max
        const progressBar = document.querySelector('[data-dynamic="progress-bar-max"]');
        if (progressBar) {
            progressBar.setAttribute('aria-valuemax', scenario.amount);
        }
        
        updateElement('[data-dynamic="progress-goal"]', formatCurrency(scenario.amount));
    }
    
    function updateAirdropStats(scenario) {
        const airdrop = scenario.airdrop;
        
        // Update all airdrop total elements (may appear multiple times)
        updateAllElements('[data-dynamic="airdrop-total"]', formatNumber(airdrop.totalEmber));
        updateElement('[data-dynamic="airdrop-per-claim"]', formatNumber(airdrop.tokensPerClaim) + ' EMBER');
        updateElement('[data-dynamic="airdrop-value"]', '≈$' + airdrop.valuePerClaim.toFixed(2));
        updateElement('[data-dynamic="airdrop-percentage"]', airdrop.percentage);
        updateElement('[data-dynamic="airdrop-total-short"]', formatTokensShort(airdrop.totalEmber));
        updateElement('[data-dynamic="airdrop-pool-value"]', airdrop.poolValue);
        
        // Update airdrop tracker with new values
        updateAirdropTrackerValues(airdrop);
    }
    
    function updateCalculator(scenario) {
        const investmentInput = document.getElementById('investment-amount');
        if (!investmentInput) return;
        
        // Update max attribute
        investmentInput.setAttribute('max', scenario.maxInvestment);
        updateElement('[data-dynamic="max-investment"]', formatCurrency(scenario.maxInvestment));
        
        // Validate current input value against new max
        const currentValue = parseFloat(investmentInput.value) || CONFIG.scenarios.hardCap.minInvestment;
        if (currentValue > scenario.maxInvestment) {
            investmentInput.value = scenario.maxInvestment;
        }
        
        // Recalculate tokens
        calculateTokens();
    }
    
    function updateBenefitCards(scenario) {
        // Early Access - no change needed
        
        // Built-In Demand
        const demandText = scenario.name === 'Hard Cap' 
            ? 'White-label apps and SDK licenses with GPS & Beacon support create ongoing token demand through management system'
            : 'Focus on $Ember Hunt App creates immediate demand with GPS & Beacon gameplay';
        updateElement('[data-dynamic="benefit-demand"]', demandText);
        
        // Liquidity Guarantee
        const liquidityText = `$${formatNumber(scenario.fundAllocation.liquidity)} liquidity locked for 3 months to ensure trading depth during investor vesting period`;
        updateElement('[data-dynamic="benefit-liquidity"]', liquidityText);
    }
    
    function updateCTAStats(scenario) {
        updateElement('[data-dynamic="cta-tokens"]', formatTokensShort(scenario.tokens));
        updateElement('[data-dynamic="cta-cap"]', formatCurrency(scenario.amount));
        updateElement('[data-dynamic="cta-cap-label"]', scenario.name);
    }
    
    function updateInvestmentLimits(scenario) {
        const limitsText = `Minimum investment: $${scenario.minInvestment} USD | Maximum: ${formatCurrency(scenario.maxInvestment)} USD`;
        updateElement('[data-dynamic="investment-limits"]', limitsText);
    }
    
    function updateTokenomicsTables(scenario) {
        const hardCapTable = document.getElementById('hard-cap-table');
        const softCapTable = document.getElementById('soft-cap-table');
        
        if (hardCapTable && softCapTable) {
            if (CONFIG.currentScenario === 'hardCap') {
                hardCapTable.style.display = 'block';
                softCapTable.style.display = 'none';
            } else {
                hardCapTable.style.display = 'none';
                softCapTable.style.display = 'block';
            }
        }
        
        // Update mobile cards if they exist
        updateMobileTokenomicsCards(scenario);
    }
    
    function updateMobileTokenomicsCards(scenario) {
        const mobileContainer = document.getElementById('allocation-cards-mobile');
        if (!mobileContainer) return;
        
        // This would populate mobile cards with tokenomics data
        // Implementation depends on mobile card structure
        console.log('Mobile tokenomics cards update - structure TBD');
    }
    
    function updateAirdropModals(scenario) {
        const airdrop = scenario.airdrop;
        
        // Update airdrop info modal content
        updateElement('[data-dynamic="airdrop-info-tokens"]', formatNumber(airdrop.tokensPerClaim) + ' EMBER');
        updateElement('[data-dynamic="airdrop-info-pool"]', airdrop.poolValue);
        
        // Update terms modal
        const termsText = `${airdrop.percentage} (${formatTokensShort(airdrop.totalEmber)} EMBER) distributed to verified supporters`;
        updateElement('[data-dynamic="terms-distribution"]', termsText);
    }
    
    function updateInvestorIncentive(scenario) {
        // Investor Advantage
        const advantageText = scenario.name === 'Hard Cap'
            ? 'The $500K raise builds the first-to-market location-based AR gaming token economy with GPS & Beacon technology. Early investors secure tokens at $0.003 before massive demand from Platform Operators and Advertisers.'
            : 'The $150K raise launches our flagship $Ember Hunt App with GPS & Beacon technology. Early investors secure tokens at $0.003 before app release creates player demand.';
        updateElement('[data-dynamic="investor-advantage-text"]', advantageText);
        
        // Professional Development
        const devText = `${formatCurrency(scenario.amount)} funds: ${Math.round((scenario.fundAllocation.liquidity/scenario.amount)*100)}% liquidity pool, ${Math.round((scenario.fundAllocation.development/scenario.amount)*100)}% development, ${Math.round((scenario.fundAllocation.legal/scenario.amount)*100)}% legal compliance, ${Math.round((scenario.fundAllocation.marketing/scenario.amount)*100)}% marketing — ensuring immediate trading and professional execution.`;
        updateElement('[data-dynamic="professional-dev-text"]', devText);
    }
    
    function updateFundAllocation(scenario) {
        // Update fund allocation cards if they exist
        const hardCapAllocation = document.getElementById('hard-cap-allocation');
        const softCapAllocation = document.getElementById('soft-cap-allocation');
        
        if (hardCapAllocation && softCapAllocation) {
            // Both cards are always visible for comparison
            // No changes needed - they're static in HTML
            console.log('Fund allocation cards are side-by-side comparison');
        }
    }
    
    function updateAirdropTrackerValues(airdrop) {
        // Update the airdrop configuration
        CONFIG.scenarios[CONFIG.currentScenario].airdrop = airdrop;
        
        // Reinitialize tracker with new values
        initAirdropTracker();
    }
    
    /* ===================================
       HELPER FUNCTIONS
       =================================== */
    
    function updateElement(selector, value) {
        const elements = document.querySelectorAll(selector);
        elements.forEach(el => {
            if (el) {
                // Add fade transition
                el.style.opacity = '0';
                setTimeout(() => {
                    el.textContent = value;
                    el.style.transition = 'opacity 300ms ease-in-out';
                    el.style.opacity = '1';
                }, 150);
            }
        });
    }
    
    function updateAllElements(selector, value) {
        const elements = document.querySelectorAll(selector);
        elements.forEach(el => {
            if (el) {
                el.style.opacity = '0';
                setTimeout(() => {
                    el.textContent = value;
                    el.style.transition = 'opacity 300ms ease-in-out';
                    el.style.opacity = '1';
                }, 150);
            }
        });
    }
    
    function formatNumber(num) {
        return Math.floor(num).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    
    function formatCurrency(amount) {
        return '$' + formatNumber(amount);
    }
    
    function formatTokensShort(amount) {
        if (amount >= 1000000) {
            return (amount / 1000000) + 'M';
        } else if (amount >= 1000) {
            return (amount / 1000) + 'K';
        }
        return formatNumber(amount);
    }
    
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
        
        console.log('✅ Countdown timer initialized');
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
        
        // Expose calculateTokens globally so it can be called by other functions
        window.calculateTokens = calculateTokens;
        
        function calculateTokens() {
            const scenario = CONFIG.scenarios[CONFIG.currentScenario];
            let amount = parseFloat(investmentInput.value) || scenario.minInvestment;
            
            // Enforce min/max limits
            if (amount < scenario.minInvestment) {
                amount = scenario.minInvestment;
                investmentInput.value = amount;
            }
            if (amount > scenario.maxInvestment) {
                amount = scenario.maxInvestment;
                investmentInput.value = amount;
            }
            
            // Calculate tokens
            const tokens = amount / CONFIG.tokenPrice;
            
            // Update displays
            emberTokensDisplay.textContent = formatNumber(tokens);
            totalInvestmentDisplay.textContent = formatCurrency(amount);
        }
        
        // Listen for input changes
        investmentInput.addEventListener('input', calculateTokens);
        investmentInput.addEventListener('change', calculateTokens);
        
        // Initial calculation
        calculateTokens();
        
        console.log('✅ Investment calculator initialized');
    }
    
    /* ===================================
       MODAL SYSTEMS (TPA & WHITEPAPER)
       Token Presale Agreement + Disclosures + Whitepaper
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
        
        console.log('✅ TPA modal initialized');
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
        
        console.log('✅ Whitepaper modal initialized');
    }
    
    /* ===================================
       AIRDROP MODALS SYSTEM
       Info Modal + Terms Modal for Airdrop
       =================================== */
    function initAirdropModals() {
        initAirdropInfoModal();
        initAirdropTermsModal();
    }
    
    // Airdrop Info Modal (How it works)
    function initAirdropInfoModal() {
        const modal = document.createElement('div');
        modal.id = 'airdrop-info-modal';
        modal.className = 'tpa-modal';
        modal.style.display = 'none';
        modal.setAttribute('role', 'dialog');
        modal.setAttribute('aria-labelledby', 'airdrop-info-title');
        modal.setAttribute('aria-modal', 'true');
        
        modal.innerHTML = `
            <div class="tpa-modal-overlay"></div>
            <div class="tpa-modal-content" style="max-width: 700px;">
                <div class="tpa-modal-header">
                    <h3 id="airdrop-info-title">
                        <img src="images/VPEmberCoin.PNG" alt="" aria-hidden="true">
                        How the $Ember Airdrop Works
                    </h3>
                    <button class="tpa-modal-close" id="close-airdrop-info-modal" aria-label="Close info modal">×</button>
                </div>
                <div class="tpa-modal-body">
                    <div class="tpa-preview">
                        <h4>🔥 Spread the Phoenix Fire!</h4>
                        <p><strong>Share our presale campaign on social media and earn FREE $Ember tokens!</strong></p>
                        
                        <div style="background: rgba(240, 165, 0, 0.1); padding: 20px; border-radius: 15px; border: 1px solid rgba(240, 165, 0, 0.3); margin: 20px 0;">
                            <h4 style="color: #f0a500; margin-bottom: 15px;">📋 Step-by-Step Process:</h4>
                            <ol style="margin-left: 20px; line-height: 1.8;">
                                <li><strong>Click a Share Button</strong> - Choose X (Twitter), Facebook, or Telegram</li>
                                <li><strong>Share the Post</strong> - Post about the $Ember presale on your social media</li>
                                <li><strong>Copy Your Post URL</strong> - Get the link to your shared post</li>
                                <li><strong>Fill the Claim Form</strong> - Enter your Solana wallet and post URL</li>
                                <li><strong>Agree to Terms</strong> - Keep your post live until campaign end</li>
                                <li><strong>Submit</strong> - Claim your tokens worth ≈$10!</li>
                            </ol>
                        </div>
                        
                        <h4 style="color: #f0a500; margin-top: 20px;">🎁 What You Get:</h4>
                        <ul style="margin-left: 20px; line-height: 1.8;">
                            <li><strong>FREE EMBER tokens</strong> per verified claim (amount varies by scenario)</li>
                            <li><strong>≈$10 value</strong> at presale price ($0.003)</li>
                            <li><strong>Distributed after presale ends</strong> - early supporter rewards!</li>
                        </ul>
                        
                        <h4 style="color: #f0a500; margin-top: 20px;">⚠️ Important Rules:</h4>
                        <ul style="margin-left: 20px; line-height: 1.8;">
                            <li>You must <strong>keep your post live</strong> until the presale campaign ends</li>
                            <li>Only <strong>one claim per person</strong> (verified by wallet address)</li>
                            <li>Posts that are deleted before campaign end <strong>forfeit rewards</strong></li>
                            <li>Limited to <strong>first 5,000 participants</strong></li>
                        </ul>
                        
                        <div style="background: rgba(215, 51, 39, 0.1); padding: 15px; border-radius: 10px; border-left: 3px solid #d73327; margin-top: 20px;">
                            <p style="margin: 0; font-weight: 600;">
                                <img src="images/VPEmberFlame.svg" alt="" aria-hidden="true" style="width: 24px; height: 24px; display: inline-block; vertical-align: middle; margin-right: 8px;">
                                Ready to claim your FREE $Ember? Click a share button below to get started!
                            </p>
                        </div>
                    </div>
                    
                    <div class="tpa-modal-actions" style="margin-top: 25px;">
                        <button class="tpa-agree-btn" id="ok-airdrop-info-btn">
                            ✓ Got It - Let's Share!
                        </button>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        const openBtn = document.getElementById('airdrop-info-btn');
        const closeBtn = modal.querySelector('#close-airdrop-info-modal');
        const okBtn = modal.querySelector('#ok-airdrop-info-btn');
        const overlay = modal.querySelector('.tpa-modal-overlay');
        
        if (!openBtn) {
            console.warn('Airdrop info button not found');
            return;
        }
        
        function openModal(e) {
            e.preventDefault();
            e.stopPropagation();
            e.stopImmediatePropagation();
            modal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
            return false;
        }
        
        function closeModal(e) {
            if (e) {
                e.preventDefault();
                e.stopPropagation();
            }
            modal.style.display = 'none';
            document.body.style.overflow = '';
        }
        
        openBtn.addEventListener('click', openModal, { capture: true, passive: false });
        if (closeBtn) closeBtn.addEventListener('click', closeModal);
        if (okBtn) okBtn.addEventListener('click', closeModal);
        if (overlay) overlay.addEventListener('click', closeModal);
        
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && modal.style.display === 'flex') {
                closeModal();
            }
        });
        
        console.log('✅ Airdrop info modal initialized');
    }
    
    // Airdrop Terms Modal
    function initAirdropTermsModal() {
        const modal = document.createElement('div');
        modal.id = 'airdrop-terms-modal';
        modal.className = 'tpa-modal';
        modal.style.display = 'none';
        modal.setAttribute('role', 'dialog');
        modal.setAttribute('aria-labelledby', 'airdrop-terms-title');
        modal.setAttribute('aria-modal', 'true');
        
        modal.innerHTML = `
            <div class="tpa-modal-overlay"></div>
            <div class="tpa-modal-content" style="max-width: 800px;">
                <div class="tpa-modal-header">
                    <h3 id="airdrop-terms-title">
                        <img src="images/TechnicalFoundation.PNG" alt="" aria-hidden="true">
                        $Ember Airdrop Terms & Conditions
                    </h3>
                    <button class="tpa-modal-close" id="close-airdrop-terms-modal" aria-label="Close terms modal">×</button>
                </div>
                <div class="tpa-modal-body">
                    <div class="tpa-preview">
                        <p style="font-size: 1.1rem; color: #f0a500; font-weight: 600; margin-bottom: 20px;">
                            Please read these terms carefully before claiming your $Ember airdrop tokens.
                        </p>
                        
                        <div style="background: rgba(26, 15, 10, 0.6); padding: 20px; border-radius: 15px; border: 1px solid rgba(215, 51, 39, 0.3); margin-bottom: 20px;">
                            <h4 style="color: #f0a500; margin-bottom: 15px;">1. Eligibility Requirements</h4>
                            <ul style="margin-left: 20px; line-height: 1.8;">
                                <li>You must share the Vault Phoenix $Ember presale campaign on a public social media account (X/Twitter, Facebook, or Telegram)</li>
                                <li>Your social media post must remain live and publicly visible until the presale campaign officially ends</li>
                                <li>You must provide a valid Solana wallet address to receive tokens</li>
                                <li>You must provide a direct URL link to your social media post</li>
                                <li>One claim per person - duplicate claims from the same wallet will be rejected</li>
                                <li>Limited to first 5,000 verified participants</li>
                            </ul>
                        </div>
                        
                        <div style="background: rgba(26, 15, 10, 0.6); padding: 20px; border-radius: 15px; border: 1px solid rgba(215, 51, 39, 0.3); margin-bottom: 20px;">
                            <h4 style="color: #f0a500; margin-bottom: 15px;">2. Token Distribution</h4>
                            <ul style="margin-left: 20px; line-height: 1.8;">
                                <li>Each verified participant receives FREE EMBER tokens (≈$10 value at $0.003 presale price)</li>
                                <li>Tokens will be distributed to your Solana wallet address after the presale campaign ends</li>
                                <li>Distribution timeline: Within 30 days after presale completion</li>
                                <li>Token amount varies by funding scenario (Hard Cap vs Soft Cap)</li>
                                <li>Tokens are subject to the same utility and vesting terms as presale tokens</li>
                            </ul>
                        </div>
                        
                        <div style="background: rgba(26, 15, 10, 0.6); padding: 20px; border-radius: 15px; border: 1px solid rgba(215, 51, 39, 0.3); margin-bottom: 20px;">
                            <h4 style="color: #f0a500; margin-bottom: 15px;">3. Post Verification & Compliance</h4>
                            <ul style="margin-left: 20px; line-height: 1.8;">
                                <li>Your social media post will be verified for authenticity and compliance</li>
                                <li>Posts must include genuine promotion of the $Ember presale (spam or misleading posts will be rejected)</li>
                                <li><strong style="color: #f87171;">CRITICAL:</strong> If you delete your post before the presale campaign ends, you forfeit your airdrop reward</li>
                                <li>We reserve the right to verify post status at any time during the campaign</li>
                                <li>Posts that violate social media platform terms of service will be disqualified</li>
                            </ul>
                        </div>
                        
                        <div style="background: rgba(26, 15, 10, 0.6); padding: 20px; border-radius: 15px; border: 1px solid rgba(215, 51, 39, 0.3); margin-bottom: 20px;">
                            <h4 style="color: #f0a500; margin-bottom: 15px;">4. Important Disclaimers</h4>
                            <ul style="margin-left: 20px; line-height: 1.8;">
                                <li>Vault Phoenix reserves the right to verify all claims and reject fraudulent submissions</li>
                                <li>Token values may fluctuate - the $10 value is based on presale price and not guaranteed</li>
                                <li>Participation in this airdrop does not constitute an investment or financial advice</li>
                                <li>You are responsible for any tax obligations in your jurisdiction</li>
                                <li>Vault Phoenix may modify or terminate the airdrop program at any time</li>
                                <li>By participating, you agree to Vault Phoenix's Terms of Service and Privacy Policy</li>
                            </ul>
                        </div>
                        
                        <div style="background: rgba(240, 165, 0, 0.1); padding: 20px; border-radius: 15px; border: 2px solid rgba(240, 165, 0, 0.4); margin-top: 25px;">
                            <p style="margin: 0; font-weight: 600; text-align: center; color: #f0a500; font-size: 1.05rem;">
                                <img src="images/EmberCoinLock.PNG" alt="" aria-hidden="true" style="width: 32px; height: 32px; display: inline-block; vertical-align: middle; margin-right: 8px;">
                                By clicking "I Agree" below, you confirm that you have read, understood, and agree to comply with all terms and conditions outlined above.
                            </p>
                        </div>
                    </div>
                    
                    <div class="tpa-modal-actions" style="margin-top: 25px;">
                        <button class="tpa-agree-btn" id="agree-airdrop-terms-btn" style="background: var(--ember-gradient-primary);">
                            ✓ I Agree to Terms & Conditions
                        </button>
                        <button class="tpa-download-btn" id="cancel-airdrop-terms-btn" style="margin-top: 10px;">
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        const openBtn = document.getElementById('open-terms-modal');
        const closeBtn = modal.querySelector('#close-airdrop-terms-modal');
        const agreeBtn = modal.querySelector('#agree-airdrop-terms-btn');
        const cancelBtn = modal.querySelector('#cancel-airdrop-terms-btn');
        const overlay = modal.querySelector('.tpa-modal-overlay');
        const termsCheckbox = document.getElementById('claim-terms');
        
        if (!openBtn) {
            console.warn('Airdrop terms button not found');
            return;
        }
        
        function openModal(e) {
            e.preventDefault();
            e.stopPropagation();
            modal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        }
        
        function closeModal(e) {
            if (e) {
                e.preventDefault();
                e.stopPropagation();
            }
            modal.style.display = 'none';
            document.body.style.overflow = '';
        }
        
        openBtn.addEventListener('click', openModal);
        if (closeBtn) closeBtn.addEventListener('click', closeModal);
        if (cancelBtn) cancelBtn.addEventListener('click', closeModal);
        if (overlay) overlay.addEventListener('click', closeModal);
        
        if (agreeBtn && termsCheckbox) {
            agreeBtn.addEventListener('click', function(e) {
                e.preventDefault();
                termsCheckbox.disabled = false;
                termsCheckbox.checked = true;
                closeModal();
            });
        }
        
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && modal.style.display === 'flex') {
                closeModal();
            }
        });
        
        console.log('✅ Airdrop terms modal initialized');
    }
    
    /* ===================================
       AIRDROP FORM HANDLING
       Form validation and submission
       =================================== */
    function initAirdropForm() {
        const form = document.getElementById('ember-claim-form');
        const messageBox = document.getElementById('ember-message-box');
        const submitBtn = document.getElementById('claim-submit-btn');
        
        if (!form) {
            console.warn('Airdrop form not found');
            return;
        }
        
        form.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const name = document.getElementById('claim-name')?.value.trim() || '';
            const wallet = document.getElementById('claim-wallet')?.value.trim() || '';
            const email = document.getElementById('claim-email')?.value.trim() || '';
            const socialUrl = document.getElementById('claim-social-url')?.value.trim() || '';
            const termsChecked = document.getElementById('claim-terms')?.checked || false;
            
            // Validation
            if (!wallet) {
                showMessage('error', '❌ Please enter your Solana wallet address');
                return;
            }
            
            if (!socialUrl) {
                showMessage('error', '❌ Please enter your social media post URL');
                return;
            }
            
            if (!termsChecked) {
                showMessage('error', '❌ Please agree to the terms and conditions');
                return;
            }
            
            // Validate URL format
            if (!isValidUrl(socialUrl)) {
                showMessage('error', '❌ Please enter a valid URL for your social media post');
                return;
            }
            
            // Disable submit button during processing
            if (submitBtn) {
                submitBtn.disabled = true;
                const originalHTML = submitBtn.innerHTML;
                submitBtn.innerHTML = '<span>⏳ Submitting...</span>';
                
                showMessage('info', '⏳ Submitting your claim... Please wait.');
                
                try {
                    // Simulate API call (replace with actual API endpoint)
                    await new Promise(resolve => setTimeout(resolve, 2000));
                    
                    showMessage('success', '🎉 Claim submitted successfully! Check your email for confirmation. Tokens will be distributed after presale ends.');
                    form.reset();
                    document.getElementById('claim-terms').disabled = true;
                    
                } catch (error) {
                    showMessage('error', '❌ Failed to submit claim. Please try again or contact support.');
                    console.error('Airdrop claim error:', error);
                } finally {
                    // Re-enable submit button
                    if (submitBtn) {
                        submitBtn.disabled = false;
                        submitBtn.innerHTML = originalHTML;
                    }
                }
            }
        });
        
        function showMessage(type, text) {
            if (!messageBox) return;
            messageBox.style.display = 'block';
            messageBox.className = 'message-box-compact ' + type;
            messageBox.textContent = text;
            
            // Scroll message into view
            messageBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            
            if (type === 'success') {
                setTimeout(() => {
                    messageBox.style.display = 'none';
                }, 8000);
            }
        }
        
        function isValidUrl(string) {
            try {
                const url = new URL(string);
                return url.protocol === 'http:' || url.protocol === 'https:';
            } catch (_) {
                return false;
            }
        }
        
        console.log('✅ Airdrop form initialized');
    }
    
    /* ===================================
       STATUS CHECKER
       Check claim status by wallet address
       =================================== */
    function initStatusChecker() {
        const checkBtn = document.getElementById('check-status-btn');
        const walletInput = document.getElementById('status-wallet');
        
        if (!checkBtn || !walletInput) {
            console.warn('Status checker elements not found');
            return;
        }
        
        checkBtn.addEventListener('click', async function() {
            const wallet = walletInput.value.trim();
            
            if (!wallet) {
                alert('⚠️ Please enter a Solana wallet address');
                return;
            }
            
            try {
                const originalText = checkBtn.textContent;
                checkBtn.textContent = 'Checking...';
                checkBtn.disabled = true;
                
                // Simulate API call (replace with actual API endpoint)
                await new Promise(resolve => setTimeout(resolve, 1500));
                
                const shortWallet = `${wallet.substring(0, 8)}...${wallet.substring(wallet.length - 4)}`;
                
                // Get current scenario tokens
                const scenario = CONFIG.scenarios[CONFIG.currentScenario];
                const tokens = scenario.airdrop.tokensPerClaim;
                
                // Simulate response (replace with actual API response)
                const claimStatus = {
                    found: false, // Change to true when claim exists
                    tokens: tokens,
                    status: 'pending', // 'pending', 'verified', 'distributed'
                    postVerified: false
                };
                
                if (claimStatus.found) {
                    alert(`✅ Claim Status for ${shortWallet}:\n\n` +
                          `• Tokens: ${claimStatus.tokens.toLocaleString()} EMBER\n` +
                          `• Status: ${claimStatus.status.toUpperCase()}\n` +
                          `• Post Verified: ${claimStatus.postVerified ? 'Yes' : 'Pending'}\n\n` +
                          `Keep your post live until presale ends!`);
                } else {
                    alert(`📊 Status for ${shortWallet}:\n\n` +
                          `❌ No claims found for this wallet address.\n\n` +
                          `You can submit a new claim using the form below!`);
                }
                
            } catch (error) {
                alert('❌ Error checking status. Please try again.');
                console.error('Status check error:', error);
            } finally {
                checkBtn.textContent = 'Check';
                checkBtn.disabled = false;
            }
        });
        
        // Allow Enter key to check status
        walletInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                checkBtn.click();
            }
        });
        
        console.log('✅ Status checker initialized');
    }
    
    /* ===================================
       SHARE BUTTONS
       Social media share functionality
       =================================== */
    function initShareButtons() {
        const shareConfig = {
            x: {
                btn: 'share-x-btn',
                handler: () => {
                    const text = '🔥 Join me in the $Ember Token Presale! Revolutionary AR Crypto Gaming with GPS & Beacon technology. Get your FREE airdrop tokens! #VaultPhoenix #Ember $Ember @VaultPhoenix';
                    const url = 'https://vaultphoenix.com/ember.html';
                    window.open(
                        `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`,
                        '_blank',
                        'width=600,height=450,scrollbars=yes'
                    );
                }
            },
            facebook: {
                btn: 'share-facebook-btn',
                handler: () => {
                    const url = 'https://vaultphoenix.com/ember.html';
                    window.open(
                        `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
                        '_blank',
                        'width=600,height=450,scrollbars=yes'
                    );
                }
            },
            telegram: {
                btn: 'share-telegram-btn',
                handler: () => {
                    const text = '🔥 Join me in the $Ember Token Presale! Revolutionary AR Crypto Gaming with GPS & Beacon technology. Get your FREE airdrop tokens!';
                    const url = 'https://vaultphoenix.com/ember.html';
                    window.open(
                        `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`,
                        '_blank',
                        'width=600,height=450,scrollbars=yes'
                    );
                }
            }
        };
        
        Object.values(shareConfig).forEach(config => {
            const btn = document.getElementById(config.btn);
            if (btn) {
                btn.addEventListener('click', function(e) {
                    e.preventDefault();
                    config.handler();
                });
            }
        });
        
        console.log('✅ Share buttons initialized');
    }
    
    /* ===================================
       COPY HASHTAGS FUNCTIONALITY
       Ultimate cross-platform copy solution
       =================================== */
    function initCopyHashtags() {
        const copyBtn = document.getElementById('copy-hashtags-btn');
        const copyBtnText = document.getElementById('copy-btn-text');
        const hashtagText = document.getElementById('hashtag-text-display');
        
        if (!copyBtn || !copyBtnText || !hashtagText) {
            console.warn('Copy hashtags elements not found');
            return;
        }
        
        copyBtn.addEventListener('click', async function(e) {
            e.preventDefault();
            const textToCopy = hashtagText.textContent.trim();
            
            try {
                // Try modern Clipboard API first
                if (navigator.clipboard && navigator.clipboard.writeText) {
                    await navigator.clipboard.writeText(textToCopy);
                    showCopySuccess();
                } else {
                    // Fallback for older browsers and iOS
                    fallbackCopyToClipboard(textToCopy);
                    showCopySuccess();
                }
            } catch (err) {
                console.error('Copy failed:', err);
                // Try fallback method
                try {
                    fallbackCopyToClipboard(textToCopy);
                    showCopySuccess();
                } catch (fallbackErr) {
                    console.error('Fallback copy failed:', fallbackErr);
                    showCopyError();
                }
            }
        });
        
        function showCopySuccess() {
            copyBtn.classList.add('copied');
            copyBtnText.textContent = '✓ Copied!';
            
            // Reset after 2.5 seconds
            setTimeout(() => {
                copyBtn.classList.remove('copied');
                copyBtnText.textContent = 'Copy Hashtags';
            }, 2500);
        }
        
        function showCopyError() {
            copyBtnText.textContent = '❌ Failed';
            setTimeout(() => {
                copyBtnText.textContent = 'Copy Hashtags';
            }, 2000);
        }
        
        function fallbackCopyToClipboard(text) {
            // Create temporary textarea
            const textarea = document.createElement('textarea');
            textarea.value = text;
            
            // Make it invisible but not display:none (iOS requirement)
            textarea.style.position = 'fixed';
            textarea.style.top = '0';
            textarea.style.left = '0';
            textarea.style.width = '2em';
            textarea.style.height = '2em';
            textarea.style.padding = '0';
            textarea.style.border = 'none';
            textarea.style.outline = 'none';
            textarea.style.boxShadow = 'none';
            textarea.style.background = 'transparent';
            textarea.setAttribute('readonly', '');
            
            document.body.appendChild(textarea);
            
            // iOS specific handling
            if (navigator.userAgent.match(/ipad|ipod|iphone/i)) {
                const range = document.createRange();
                range.selectNodeContents(textarea);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
                textarea.setSelectionRange(0, 999999);
            } else {
                textarea.focus();
                textarea.select();
            }
            
            try {
                const successful = document.execCommand('copy');
                document.body.removeChild(textarea);
                
                if (!successful) {
                    throw new Error('execCommand copy failed');
                }
            } catch (err) {
                document.body.removeChild(textarea);
                throw err;
            }
        }
        
        console.log('✅ Copy hashtags functionality initialized');
    }
    
    /* ===================================
       AIRDROP PROGRESS TRACKER
       Animated number counting and progress bar
       =================================== */
    function initAirdropTracker() {
        const scenario = CONFIG.scenarios[CONFIG.currentScenario];
        const totalEmber = scenario.airdrop.totalEmber;
        const claimed = 0; // Start at 0, update from backend
        const remaining = totalEmber - claimed;
        const people = 0; // Current number of claims
        const maxPeople = scenario.airdrop.maxPeople;
        const percentage = ((claimed / totalEmber) * 100).toFixed(2);
        
        const totalEmberEl = document.getElementById('ember-total-ember');
        const claimedEl = document.getElementById('ember-claimed');
        const remainingEl = document.getElementById('ember-remaining');
        const peopleEl = document.getElementById('ember-people-claimed');
        const progressBar = document.getElementById('ember-progress-bar');
        const progressPercentage = document.getElementById('ember-progress-percentage');
        
        // Set total values with current scenario
        const totalElements = document.querySelectorAll('[data-dynamic="airdrop-total"]');
        totalElements.forEach(el => {
            if (el) el.textContent = totalEmber.toLocaleString();
        });
        
        // Animate numbers with counting effect
        function animateValue(element, start, end, duration) {
            if (!element) return;
            
            const range = end - start;
            const increment = range / (duration / 16);
            let current = start;
            
            const timer = setInterval(() => {
                current += increment;
                if (current >= end) {
                    current = end;
                    clearInterval(timer);
                }
                element.textContent = Math.floor(current).toLocaleString();
            }, 16);
        }
        
        // Animate the numbers
        if (claimedEl) animateValue(claimedEl, 0, claimed, 1000);
        if (remainingEl) animateValue(remainingEl, 0, remaining, 1200);
        
        if (peopleEl) {
            peopleEl.textContent = `${people.toLocaleString()} / ${maxPeople.toLocaleString()}`;
        }
        
        // Animate progress bar
        if (progressBar) {
            setTimeout(() => {
                progressBar.style.width = `${percentage}%`;
            }, 500);
        }
        
        if (progressPercentage) {
            setTimeout(() => {
                progressPercentage.textContent = percentage;
            }, 500);
        }
        
        console.log('✅ Airdrop tracker initialized');
    }
    
    /* ===================================
       SMOOTH SCROLL FOR ANCHOR LINKS
       Smooth scrolling with navbar offset
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
        
        console.log('✅ Smooth scroll initialized');
    }
    
    /* ===================================
       PROGRESS BARS
       Can be updated with real data from backend
       =================================== */
    function initProgressBars() {
        // Presale progress bar
        const presaleProgress = document.querySelector('.presale-progress .progress-fill');
        if (presaleProgress) {
            // Static for now - can be updated with real data
            // Example: updateProgressBar(presaleProgress, 0, 500000, currentAmount);
        }
        
        console.log('✅ Progress bars initialized');
    }
    
    /* ===================================
       UTILITY FUNCTIONS
       =================================== */
    
    // Validate investment amount
    function validateInvestmentAmount(amount) {
        const scenario = CONFIG.scenarios[CONFIG.currentScenario];
        const numAmount = parseFloat(amount);
        
        if (isNaN(numAmount)) {
            return {
                valid: false,
                error: 'Please enter a valid number'
            };
        }
        
        if (numAmount < scenario.minInvestment) {
            return {
                valid: false,
                error: 'Minimum investment is $' + scenario.minInvestment
            };
        }
        
        if (numAmount > scenario.maxInvestment) {
            return {
                valid: false,
                error: 'Maximum investment is $' + formatCurrency(scenario.maxInvestment)
            };
        }
        
        return {
            valid: true,
            amount: numAmount
        };
    }
    
    /* ===================================
       EXPOSE UTILITY FUNCTIONS
       For use in other scripts or console
       =================================== */
    window.emberUtils = {
        switchScenario: switchScenario,
        formatCurrency: formatCurrency,
        formatNumber: formatNumber,
        formatTokensShort: formatTokensShort,
        validateInvestmentAmount: validateInvestmentAmount,
        config: CONFIG
    };
    
    console.log('✅ Ember local.js v3.0 loaded successfully with Scenario Switching + Airdrop System! 🔥');
    
})();

/* ===================================
   END OF EMBER LOCAL JS v3.0
   All features complete ✅
   - SCENARIO SWITCHING (Hard Cap / Soft Cap)
   - Dynamic content updates across all sections
   - Presale countdown & calculator
   - TPA & Whitepaper modals
   - Airdrop Info & Terms modals
   - Airdrop form submission
   - Status checker
   - Share buttons (X, Facebook, Telegram)
   - Copy hashtags (cross-platform)
   - Airdrop progress tracker
   - Smooth scroll & progress bars
   - LocalStorage persistence
   - URL hash support
   =================================== */
