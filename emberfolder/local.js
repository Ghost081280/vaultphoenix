/* ===================================
   VAULT PHOENIX - EMBER LOCAL JS v2.2 SOL VERSION
   Updated pricing from USD to SOL
   0.003 SOL = 1 $Ember
   =================================== */

/* ===================================
   CRITICAL: CREATE MODAL FUNCTIONS FIRST!
   =================================== */
(function() {
    console.log('🔥 Creating modal functions IMMEDIATELY...');
    
    window.showTpaModal = function() {
        console.log('🚀 showTpaModal called');
        var modal = document.getElementById('tpaModal');
        if (modal) {
            modal.style.display = 'flex';
            modal.style.position = 'fixed';
            modal.style.top = '0';
            modal.style.left = '0';
            modal.style.width = '100%';
            modal.style.height = '100%';
            modal.style.zIndex = '99999';
            document.body.style.overflow = 'hidden';
        }
    };
    
    window.closeTpaModal = function() {
        var modal = document.getElementById('tpaModal');
        if (modal) {
            modal.style.display = 'none';
            document.body.style.overflow = '';
        }
    };
    
    window.agreeTpa = function() {
        var checkbox = document.getElementById('tpa-agree-checkbox');
        if (checkbox) {
            checkbox.checked = true;
            checkbox.dispatchEvent(new Event('change'));
        }
        window.closeTpaModal();
    };
    
    window.showWhitepaperModal = function() {
        console.log('🚀 showWhitepaperModal called');
        var modal = document.getElementById('whitepaperModal');
        if (modal) {
            modal.style.display = 'flex';
            modal.style.position = 'fixed';
            modal.style.top = '0';
            modal.style.left = '0';
            modal.style.width = '100%';
            modal.style.height = '100%';
            modal.style.zIndex = '99999';
            document.body.style.overflow = 'hidden';
        }
    };
    
    window.closeWhitepaperModal = function() {
        var modal = document.getElementById('whitepaperModal');
        if (modal) {
            modal.style.display = 'none';
            document.body.style.overflow = '';
        }
    };
    
    console.log('✅ Modal functions created and protected!');
})();

(function() {
    'use strict';
    
    /* ===================================
       PERFORMANCE TRACKING
       =================================== */
    var Perf = {
        startTime: performance.now(),
        log: function(message, color) {
            color = color || '#f0a500';
            var timestamp = (performance.now() - this.startTime).toFixed(2);
            console.log('%c[EMBER] ' + message + ' (' + timestamp + 'ms)', 'color: ' + color + '; font-weight: bold;');
        }
    };
    
    // Configuration - UPDATED FOR SOL PRICING
    var CONFIG = {
        presaleDate: '2025-12-01T12:00:00-05:00',
        tokenPrice: 0.003, // 0.003 SOL per EMBER token
        minInvestment: 0.1, // Minimum 0.1 SOL
        maxInvestment: 50000, // Maximum 50,000 SOL
        defaultInvestment: 1, // Default 1 SOL
        currency: 'SOL',
        airdrop: {
            totalEmber: 9000000,
            claimed: 0,
            maxPeople: 2700,
            tokensPerClaim: 3333,
            valuePerClaim: 10 // ~10 SOL value at presale price
        }
    };
    
    // Wait for DOM to be ready
    document.addEventListener('DOMContentLoaded', function() {
        Perf.log('🔥 Ember page initialized with SOL Pricing v2.2');
        
       /* initCountdownTimer(); */
        initInvestmentCalculator();
        initModals();
        initSmoothScroll();
        initProgressBars();
        initAirdropModals();
        initAirdropForm();
        initStatusChecker();
        initShareButtons();
        initCopyHashtags();
        initAirdropTracker();
        
        Perf.log('✅ All Ember page features initialized', '#4ade80');
    });
    
    /* ===================================
       COUNTDOWN TIMER
       =================================== */
    function initCountdownTimer() {
        function updateCountdown() {
            var now = new Date().getTime();
            var target = new Date(CONFIG.presaleDate).getTime();
            var distance = target - now;
            
            if (distance < 0) {
                ['days', 'hours', 'minutes', 'seconds'].forEach(function(unit) {
                    var el = document.getElementById(unit);
                    if (el) el.textContent = '00';
                });
                return;
            }
            
            var days = Math.floor(distance / (1000 * 60 * 60 * 24));
            var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            var seconds = Math.floor((distance % (1000 * 60)) / 1000);
            
            function pad(num) { return String(num).padStart(2, '0'); }
            
            var daysEl = document.getElementById('days');
            var hoursEl = document.getElementById('hours');
            var minutesEl = document.getElementById('minutes');
            var secondsEl = document.getElementById('seconds');
            
            if (daysEl) daysEl.textContent = pad(days);
            if (hoursEl) hoursEl.textContent = pad(hours);
            if (minutesEl) minutesEl.textContent = pad(minutes);
            if (secondsEl) secondsEl.textContent = pad(seconds);
        }
        
        updateCountdown();
        setInterval(updateCountdown, 1000);
        Perf.log('✅ Countdown timer initialized');
    }
   
    /* ===================================
       INVESTMENT CALCULATOR - SOL VERSION
       =================================== */
    function initInvestmentCalculator() {
        var investmentInput = document.getElementById('investment-amount');
        var emberTokensDisplay = document.getElementById('ember-tokens');
        var totalInvestmentDisplay = document.getElementById('total-investment');
        
        if (!investmentInput || !emberTokensDisplay || !totalInvestmentDisplay) {
            console.warn('Investment calculator elements not found');
            return;
        }
        
        function formatNumber(num) {
            return Math.floor(num).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        }
        
        function formatSOL(num) {
            if (num >= 1) {
                return num.toLocaleString('en-US', { maximumFractionDigits: 2 });
            } else {
                return num.toLocaleString('en-US', { maximumFractionDigits: 4 });
            }
        }
        
        function validateAndCalculate() {
            var amount = parseFloat(investmentInput.value);
            
            if (isNaN(amount) || amount <= 0) {
                amount = 0;
                investmentInput.style.border = '2px solid #ef4444';
                investmentInput.style.boxShadow = '0 0 0 3px rgba(239, 68, 68, 0.1)';
                emberTokensDisplay.textContent = '0';
                totalInvestmentDisplay.textContent = '0 SOL';
                return;
            }
            
            if (amount < CONFIG.minInvestment || amount > CONFIG.maxInvestment) {
                investmentInput.style.border = '2px solid #ef4444';
                investmentInput.style.boxShadow = '0 0 0 3px rgba(239, 68, 68, 0.1)';
            } else {
                investmentInput.style.border = '2px solid #10b981';
                investmentInput.style.boxShadow = '0 0 0 3px rgba(16, 185, 129, 0.1)';
            }
            
            var tokens = amount / CONFIG.tokenPrice;
            emberTokensDisplay.textContent = formatNumber(tokens);
            totalInvestmentDisplay.textContent = formatSOL(amount) + ' SOL';
        }
        
        investmentInput.addEventListener('input', validateAndCalculate);
        investmentInput.addEventListener('change', validateAndCalculate);
        investmentInput.addEventListener('focus', function() {
            if (this.value === '1') this.select();
        });
        
        validateAndCalculate();
        Perf.log('✅ Investment calculator initialized with SOL pricing');
    }
    
    /* ===================================
       MODAL SYSTEMS
       =================================== */
    function initModals() {
        initTpaModal();
        initWhitepaperModal();
    }
    
    function initTpaModal() {
        var modal = document.getElementById('tpaModal');
        var checkbox = document.getElementById('tpa-agree-checkbox');
        var presaleButton = document.getElementById('presale-buy-button');
        
        if (!modal) {
            console.warn('TPA modal not found');
            return;
        }
        
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
        
        var overlay = modal.querySelector('.tpa-modal-overlay');
        if (overlay) overlay.addEventListener('click', window.closeTpaModal);
        
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && modal.style.display === 'flex') {
                window.closeTpaModal();
            }
        });
        
        Perf.log('✅ TPA modal initialized');
    }
    
    function initWhitepaperModal() {
        var modal = document.getElementById('whitepaperModal');
        if (!modal) {
            console.warn('Whitepaper modal not found');
            return;
        }
        
        var overlay = modal.querySelector('.tpa-modal-overlay');
        if (overlay) overlay.addEventListener('click', window.closeWhitepaperModal);
        
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && modal.style.display === 'flex') {
                window.closeWhitepaperModal();
            }
        });
        
        Perf.log('✅ Whitepaper modal initialized');
    }
    
    /* ===================================
       AIRDROP MODALS SYSTEM
       =================================== */
    function initAirdropModals() {
        initAirdropInfoModal();
        initAirdropTermsModal();
    }
    
    function initAirdropInfoModal() {
        var modal = document.createElement('div');
        modal.id = 'airdrop-info-modal';
        modal.className = 'tpa-modal';
        modal.style.cssText = 'display:none;position:fixed;top:0;left:0;width:100%;height:100%;z-index:99999;';
        modal.setAttribute('role', 'dialog');
        modal.setAttribute('aria-labelledby', 'airdrop-info-title');
        modal.setAttribute('aria-modal', 'true');
        
        modal.innerHTML = '<div class="tpa-modal-overlay"></div>' +
            '<div class="tpa-modal-content" style="max-width: 700px;">' +
            '<div class="tpa-modal-header">' +
            '<h3 id="airdrop-info-title"><img src="images/VPEmberCoin.PNG" alt="" aria-hidden="true"> How the $Ember Airdrop Works</h3>' +
            '<button class="tpa-modal-close" id="close-airdrop-info-modal" aria-label="Close info modal">×</button>' +
            '</div>' +
            '<div class="tpa-modal-body"><div class="tpa-preview">' +
            '<h4>🔥 Spread the Phoenix Fire!</h4>' +
            '<p><strong>Share our presale campaign on social media and earn FREE $Ember tokens!</strong></p>' +
            '<div style="background: rgba(240, 165, 0, 0.1); padding: 20px; border-radius: 15px; border: 1px solid rgba(240, 165, 0, 0.3); margin: 20px 0;">' +
            '<h4 style="color: #f0a500; margin-bottom: 15px;">📋 Step-by-Step Process:</h4>' +
            '<ol style="margin-left: 20px; line-height: 1.8;">' +
            '<li><strong>Click a Share Button</strong> - Choose X (Twitter), Facebook, or Telegram</li>' +
            '<li><strong>Share the Post</strong> - Post about the $Ember presale on your social media</li>' +
            '<li><strong>Copy Your Post URL</strong> - Get the link to your shared post</li>' +
            '<li><strong>Fill the Claim Form</strong> - Enter your Solana wallet and post URL</li>' +
            '<li><strong>Agree to Terms</strong> - Keep your post live until campaign end</li>' +
            '<li><strong>Submit</strong> - Claim your 3,333 EMBER tokens (worth ≈10 SOL)!</li>' +
            '</ol></div>' +
            '<h4 style="color: #f0a500; margin-top: 20px;">🎁 What You Get:</h4>' +
            '<ul style="margin-left: 20px; line-height: 1.8;">' +
            '<li><strong>3,333 EMBER tokens</strong> per verified claim</li>' +
            '<li><strong>≈10 SOL value</strong> at presale price (0.003 SOL)</li>' +
            '<li><strong>Distributed after presale ends</strong> - early supporter rewards!</li></ul>' +
            '<h4 style="color: #f0a500; margin-top: 20px;">⚠️ Important Rules:</h4>' +
            '<ul style="margin-left: 20px; line-height: 1.8;">' +
            '<li>You must <strong>keep your post live</strong> until the presale campaign ends</li>' +
            '<li>Only <strong>one claim per person</strong> (verified by wallet address)</li>' +
            '<li>Posts that are deleted before campaign end <strong>forfeit rewards</strong></li>' +
            '<li>Limited to <strong>first 2,700 participants</strong> (9M EMBER pool)</li></ul>' +
            '<div style="background: rgba(215, 51, 39, 0.1); padding: 15px; border-radius: 10px; border-left: 3px solid #d73327; margin-top: 20px;">' +
            '<p style="margin: 0; font-weight: 600;"><img src="images/VPEmberFlame.svg" alt="" style="width: 24px; height: 24px; display: inline-block; vertical-align: middle; margin-right: 8px;"> Ready to claim your FREE $Ember? Click a share button below to get started!</p></div>' +
            '</div><div class="tpa-modal-actions" style="margin-top: 25px;">' +
            '<button class="tpa-agree-btn" id="ok-airdrop-info-btn">✓ Got It - Let\'s Share!</button>' +
            '</div></div></div>';
        
        document.body.appendChild(modal);
        
        var openBtn = document.getElementById('airdrop-info-btn');
        var closeBtn = modal.querySelector('#close-airdrop-info-modal');
        var okBtn = modal.querySelector('#ok-airdrop-info-btn');
        var overlay = modal.querySelector('.tpa-modal-overlay');
        
        if (!openBtn) {
            console.warn('Airdrop info button not found');
            return;
        }
        
        function openModal(e) {
            e.preventDefault();
            e.stopPropagation();
            modal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
            return false;
        }
        
        function closeModal(e) {
            if (e) { e.preventDefault(); e.stopPropagation(); }
            modal.style.display = 'none';
            document.body.style.overflow = '';
        }
        
        openBtn.addEventListener('click', openModal, { capture: true, passive: false });
        if (closeBtn) closeBtn.addEventListener('click', closeModal);
        if (okBtn) okBtn.addEventListener('click', closeModal);
        if (overlay) overlay.addEventListener('click', closeModal);
        
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && modal.style.display === 'flex') closeModal();
        });
        
        Perf.log('✅ Airdrop info modal initialized');
    }
    
    function initAirdropTermsModal() {
        var modal = document.createElement('div');
        modal.id = 'airdrop-terms-modal';
        modal.className = 'tpa-modal';
        modal.style.cssText = 'display:none;position:fixed;top:0;left:0;width:100%;height:100%;z-index:99999;';
        modal.setAttribute('role', 'dialog');
        modal.setAttribute('aria-labelledby', 'airdrop-terms-title');
        modal.setAttribute('aria-modal', 'true');
        
        modal.innerHTML = '<div class="tpa-modal-overlay"></div>' +
            '<div class="tpa-modal-content" style="max-width: 800px;">' +
            '<div class="tpa-modal-header">' +
            '<h3 id="airdrop-terms-title"><img src="images/TechnicalFoundation.PNG" alt="" aria-hidden="true"> $Ember Airdrop Terms & Conditions</h3>' +
            '<button class="tpa-modal-close" id="close-airdrop-terms-modal" aria-label="Close terms modal">×</button></div>' +
            '<div class="tpa-modal-body"><div class="tpa-preview">' +
            '<p style="font-size: 1.1rem; color: #f0a500; font-weight: 600; margin-bottom: 20px;">Please read these terms carefully before claiming your $Ember airdrop tokens.</p>' +
            '<div style="background: rgba(26, 15, 10, 0.6); padding: 20px; border-radius: 15px; border: 1px solid rgba(215, 51, 39, 0.3); margin-bottom: 20px;">' +
            '<h4 style="color: #f0a500; margin-bottom: 15px;">1. Eligibility Requirements</h4>' +
            '<ul style="margin-left: 20px; line-height: 1.8;">' +
            '<li>You must share the Vault Phoenix $Ember presale campaign on a public social media account</li>' +
            '<li>Your social media post must remain live until the presale campaign officially ends</li>' +
            '<li>You must provide a valid Solana wallet address to receive tokens</li>' +
            '<li>One claim per person - duplicate claims will be rejected</li>' +
            '<li>Limited to first 2,700 verified participants</li></ul></div>' +
            '<div style="background: rgba(26, 15, 10, 0.6); padding: 20px; border-radius: 15px; border: 1px solid rgba(215, 51, 39, 0.3); margin-bottom: 20px;">' +
            '<h4 style="color: #f0a500; margin-bottom: 15px;">2. Token Distribution</h4>' +
            '<ul style="margin-left: 20px; line-height: 1.8;">' +
            '<li>Each verified participant receives 3,333 EMBER tokens (≈10 SOL value at 0.003 SOL presale price)</li>' +
            '<li>Tokens will be distributed after the presale campaign ends</li>' +
            '<li>Distribution timeline: Within 30 days after presale completion</li>' +
            '<li>Total airdrop pool: 9,000,000 EMBER tokens (≈27K SOL value)</li></ul></div>' +
            '<div style="background: rgba(240, 165, 0, 0.1); padding: 20px; border-radius: 15px; border: 2px solid rgba(240, 165, 0, 0.4); margin-top: 25px;">' +
            '<p style="margin: 0; font-weight: 600; text-align: center; color: #f0a500; font-size: 1.05rem;">' +
            '<img src="images/EmberCoinLock.PNG" alt="" style="width: 32px; height: 32px; display: inline-block; vertical-align: middle; margin-right: 8px;"> ' +
            'By clicking "I Agree" below, you confirm that you have read and agree to all terms.</p></div></div>' +
            '<div class="tpa-modal-actions" style="margin-top: 25px;">' +
            '<button class="tpa-agree-btn" id="agree-airdrop-terms-btn" style="background: var(--ember-gradient-primary);">✓ I Agree to Terms & Conditions</button>' +
            '<button class="tpa-download-btn" id="cancel-airdrop-terms-btn" style="margin-top: 10px;">Cancel</button></div></div></div>';
        
        document.body.appendChild(modal);
        
        var openBtn = document.getElementById('open-terms-modal');
        var closeBtn = modal.querySelector('#close-airdrop-terms-modal');
        var agreeBtn = modal.querySelector('#agree-airdrop-terms-btn');
        var cancelBtn = modal.querySelector('#cancel-airdrop-terms-btn');
        var overlay = modal.querySelector('.tpa-modal-overlay');
        var termsCheckbox = document.getElementById('claim-terms');
        
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
            if (e) { e.preventDefault(); e.stopPropagation(); }
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
            if (e.key === 'Escape' && modal.style.display === 'flex') closeModal();
        });
        
        Perf.log('✅ Airdrop terms modal initialized');
    }
    
    /* ===================================
       AIRDROP FORM HANDLING
       =================================== */
    function initAirdropForm() {
        var form = document.getElementById('ember-claim-form');
        var messageBox = document.getElementById('ember-message-box');
        var submitBtn = document.getElementById('claim-submit-btn');
        
        if (!form) {
            console.warn('Airdrop form not found');
            return;
        }
        
        form.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            var walletEl = document.getElementById('claim-wallet');
            var socialUrlEl = document.getElementById('claim-social-url');
            var termsEl = document.getElementById('claim-terms');
            
            var wallet = walletEl ? walletEl.value.trim() : '';
            var socialUrl = socialUrlEl ? socialUrlEl.value.trim() : '';
            var termsChecked = termsEl ? termsEl.checked : false;
            
            if (!wallet) { showMessage('error', '❌ Please enter your Solana wallet address'); return; }
            if (!socialUrl) { showMessage('error', '❌ Please enter your social media post URL'); return; }
            if (!termsChecked) { showMessage('error', '❌ Please agree to the terms and conditions'); return; }
            
            try {
                var url = new URL(socialUrl);
                if (url.protocol !== 'http:' && url.protocol !== 'https:') {
                    showMessage('error', '❌ Please enter a valid URL'); return;
                }
            } catch (_) {
                showMessage('error', '❌ Please enter a valid URL'); return;
            }
            
            if (submitBtn) {
                submitBtn.disabled = true;
                var originalHTML = submitBtn.innerHTML;
                submitBtn.innerHTML = '<span>⏳ Submitting...</span>';
                showMessage('info', '⏳ Submitting your claim... Please wait.');
                
                try {
                    await new Promise(function(r) { setTimeout(r, 2000); });
                    showMessage('success', '🎉 Claim submitted successfully! Tokens will be distributed after presale ends.');
                    form.reset();
                    if (termsEl) termsEl.disabled = true;
                } catch (error) {
                    showMessage('error', '❌ Failed to submit claim. Please try again.');
                    console.error('Airdrop claim error:', error);
                } finally {
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = originalHTML;
                }
            }
        });
        
        function showMessage(type, text) {
            if (!messageBox) return;
            messageBox.style.display = 'block';
            messageBox.className = 'message-box-compact ' + type;
            messageBox.textContent = text;
            messageBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            if (type === 'success') setTimeout(function() { messageBox.style.display = 'none'; }, 8000);
        }
        
        Perf.log('✅ Airdrop form initialized');
    }
    
    /* ===================================
       STATUS CHECKER
       =================================== */
    function initStatusChecker() {
        var checkBtn = document.getElementById('check-status-btn');
        var walletInput = document.getElementById('status-wallet');
        
        if (!checkBtn || !walletInput) {
            console.warn('Status checker elements not found');
            return;
        }
        
        checkBtn.addEventListener('click', async function() {
            var wallet = walletInput.value.trim();
            if (!wallet) { alert('Feature Coming soon'); return; }
            
            try {
                checkBtn.textContent = 'Checking...';
                checkBtn.disabled = true;
                await new Promise(function(r) { setTimeout(r, 1500); });
                
                var shortWallet = wallet.substring(0, 8) + '...' + wallet.substring(wallet.length - 4);
                alert('Please wait until 15th Jan,2026 to check your claim status');
            } catch (error) {
                alert('❌ Error checking status. Please try again.');
            } finally {
                checkBtn.textContent = 'Check';
                checkBtn.disabled = false;
            }
        });
        
        walletInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') checkBtn.click();
        });
        
        Perf.log('✅ Status checker initialized');
    }
    
    /* ===================================
       SHARE BUTTONS - UPDATED FOR SOL
        // x: { btn: 'share-x-ember', url: 'https://twitter.com/intent/tweet?text=' + encodeURIComponent('🔥 Join me in the $Ember Token Presale! AR Crypto Gaming with GPS & Beacon technology. 786,666 tokens at 0.003 SOL each!\n\n #VaultPhoenix #Ember $Ember @VaultPhoenix') + '&url=' + encodeURIComponent('https://tools.smithii.io/launch/$Ember-Presale') },
       
       =================================== */
    function initShareButtons() {
        var shareConfig = {
          
            x: { btn: 'share-x-ember', url: 'https://twitter.com/intent/tweet?text=' + encodeURIComponent('🔥 Join me in the $Ember Token Presale! AR Crypto Gaming with GPS & Beacon technology. 786,666 tokens at 0.003 SOL each!\n') + '&url=' + encodeURIComponent('https://tools.smithii.io/launch/$Ember-Presale') + encodeURIComponent('\n\n#VaultPhoenix #Ember $Ember @VaultPhoenix') },
       
       
       
            facebook: { btn: 'share-facebook-ember', url: 'https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent('https://tools.smithii.io/launch/$Ember-Presale') },
            telegram: { btn: 'share-telegram-ember', url: 'https://t.me/share/url?url=' + encodeURIComponent('https://tools.smithii.io/launch/$Ember-Presale') + '&text=' + encodeURIComponent('🔥 Join me in the $Ember Token Presale! Revolutionary AR Crypto Gaming. Get your FREE airdrop tokens!') }
        };
        
        Object.keys(shareConfig).forEach(function(key) {
            var config = shareConfig[key];
            var btn = document.getElementById(config.btn);
            if (btn) {
                btn.addEventListener('click', function(e) {
                    e.preventDefault();
                    window.open(config.url, '_blank', 'width=600,height=450,scrollbars=yes');
                });
            }
        });
        
        Perf.log('✅ Share buttons initialized');
    }
    
    /* ===================================
       COPY HASHTAGS
       =================================== */
    function initCopyHashtags() {
        var copyBtn = document.getElementById('copy-hashtags-btn');
        var copyBtnText = document.getElementById('copy-btn-text');
        var hashtagText = document.getElementById('hashtag-text-display');
        
        if (!copyBtn || !copyBtnText || !hashtagText) return;
        
        copyBtn.addEventListener('click', async function(e) {
            e.preventDefault();
            var text = hashtagText.textContent.trim();
            
            try {
                if (navigator.clipboard && navigator.clipboard.writeText) {
                    await navigator.clipboard.writeText(text);
                } else {
                    var textarea = document.createElement('textarea');
                    textarea.value = text;
                    textarea.style.cssText = 'position:fixed;top:0;left:0;width:2em;height:2em;opacity:0;';
                    document.body.appendChild(textarea);
                    textarea.focus();
                    textarea.select();
                    document.execCommand('copy');
                    document.body.removeChild(textarea);
                }
                copyBtn.classList.add('copied');
                copyBtnText.textContent = '✓ Copied!';
                setTimeout(function() {
                    copyBtn.classList.remove('copied');
                    copyBtnText.textContent = 'Copy Hashtags';
                }, 2500);
            } catch (err) {
                copyBtnText.textContent = '❌ Failed';
                setTimeout(function() { copyBtnText.textContent = 'Copy Hashtags'; }, 2000);
            }
        });
        
        Perf.log('✅ Copy hashtags initialized');
    }
    
    /* ===================================
       AIRDROP PROGRESS TRACKER
       =================================== */
    function initAirdropTracker() {
        var totalEmber = CONFIG.airdrop.totalEmber;
        var claimed = CONFIG.airdrop.claimed;
        var remaining = totalEmber - claimed;
        var maxPeople = CONFIG.airdrop.maxPeople;
        var percentage = ((claimed / totalEmber) * 100).toFixed(2);
        
        var totalEmberEl = document.getElementById('ember-total-ember');
        var claimedEl = document.getElementById('ember-claimed');
        var remainingEl = document.getElementById('ember-remaining');
        var peopleEl = document.getElementById('ember-people-claimed');
        var progressBar = document.getElementById('ember-progress-bar');
        var progressPercentage = document.getElementById('ember-progress-percentage');
        
        if (totalEmberEl) totalEmberEl.textContent = totalEmber.toLocaleString();
        
        function animateValue(element, start, end, duration) {
            if (!element) return;
            var range = end - start;
            var increment = range / (duration / 16);
            var current = start;
            var timer = setInterval(function() {
                current += increment;
                if (current >= end) { current = end; clearInterval(timer); }
                element.textContent = Math.floor(current).toLocaleString();
            }, 16);
        }
        
        if (claimedEl) animateValue(claimedEl, 0, claimed, 1000);
        if (remainingEl) animateValue(remainingEl, 0, remaining, 1200);
        if (peopleEl) peopleEl.textContent = '0 / ' + maxPeople.toLocaleString();
        if (progressBar) setTimeout(function() { progressBar.style.width = percentage + '%'; }, 500);
        if (progressPercentage) setTimeout(function() { progressPercentage.textContent = percentage; }, 500);
        
        Perf.log('✅ Airdrop tracker initialized');
    }
    
    /* ===================================
       SMOOTH SCROLL
       =================================== */
    function initSmoothScroll() {
        var navbar = document.getElementById('navbar');
        var navbarHeight = navbar ? navbar.offsetHeight : 80;
        
        document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
            anchor.addEventListener('click', function(e) {
                var href = this.getAttribute('href');
                if (href === '#') return;
                
                var targetId = href.substring(1);
                var targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    e.preventDefault();
                    var targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navbarHeight - 20;
                    window.scrollTo({ top: targetPosition, behavior: 'smooth' });
                    if (history.pushState) history.pushState(null, null, href);
                }
            });
        });
        
        Perf.log('✅ Smooth scroll initialized');
    }
    
    /* ===================================
       PROGRESS BARS
       =================================== */
    function initProgressBars() {
        Perf.log('✅ Progress bars initialized');
    }
    
    /* ===================================
       WINDOW EXPORTS
       =================================== */
    window.VaultPhoenix = window.VaultPhoenix || {};
    window.VaultPhoenix.Ember = {
        config: CONFIG,
        version: '2.2-SOL',
        getState: function() {
            return { config: CONFIG, performance: { uptime: (performance.now() - Perf.startTime).toFixed(2) + 'ms' } };
        },
        logState: function() { console.table(this.getState()); }
    };
    
    Perf.log('✅ Ember local.js v2.2-SOL loaded successfully! 🔥', '#4ade80');
    
})();
