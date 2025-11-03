/**
 * ============================================
 * VAULT PHOENIX - MAIN PAGE LOCAL JAVASCRIPT
 * CLEANED & OPTIMIZED
 * ============================================
 */

(function() {
    'use strict';

    // ============================================
    // CONFIGURATION
    // ============================================

    const CONFIG = {
        SHARED_READY_TIMEOUT: 5000,
        SHARED_READY_CHECK_INTERVAL: 50,
        CHATBOT_INIT_DELAY: 100,
        SCROLL_REVEAL_THRESHOLD: 0.1,
        SCROLL_REVEAL_ROOT_MARGIN: '0px 0px -50px 0px',
        
        // Airdrop Configuration
        BACKEND_READY: false,
        API_BASE: '/api',
        TOTAL_EMBER: 16670000,
        TOKENS_PER_CLAIM: 3333,
        MAX_RECIPIENTS: 5000
    };

    const SHARE_CONFIG = {
        title: "$Ember Token Presale - Revolutionary AR Crypto Gaming at $0.003",
        description: "Join the $Ember Token presale NOW! 166.7M tokens at $0.003 each. Revolutionary location-based AR gaming with GPS & Beacon technology. $500K hard cap!",
        url: "https://vaultphoenix.com/ember.html",
        image: "https://vaultphoenix.com/images/VPEmberCoin.PNG",
        hashtags: "EmberToken,CryptoPresale,ARGaming,VaultPhoenix",
        twitterText: "🔥 Revolutionary AR crypto gaming token presale! GPS & Beacon technology meets blockchain rewards. $500K hard cap. Join early!",
        telegramText: "🔥 $Ember Token Presale LIVE! Revolutionary AR crypto gaming at $0.003. 166.7M tokens available. Join now!"
    };

    const LOGGER = {
        info: (msg) => console.log(`🔥 [Main.js] ${msg}`),
        success: (msg) => console.log(`✅ [Main.js] ${msg}`),
        error: (msg) => console.error(`❌ [Main.js] ${msg}`),
        warn: (msg) => console.warn(`⚠️ [Main.js] ${msg}`)
    };

    // ============================================
    // PHONE GALLERY FUNCTIONALITY
    // ============================================

    window.changePhoneImage = function(imageSrc, altText) {
        const mainImage = document.getElementById('mainPhoneScreenshot');
        
        if (!mainImage) {
            LOGGER.error('Main phone screenshot element not found');
            return;
        }
        
        mainImage.src = imageSrc;
        mainImage.alt = altText;
        
        const thumbs = document.querySelectorAll('.simple-thumb');
        thumbs.forEach(thumb => thumb.classList.remove('active'));
        
        if (event && event.currentTarget) {
            event.currentTarget.classList.add('active');
        }
        
        LOGGER.info(`Phone image changed to: ${imageSrc}`);
    };

    // ============================================
    // LAPTOP GALLERY FUNCTIONALITY
    // ============================================

    window.changeLaptopImage = function(imageSrc, altText) {
        const mainImage = document.getElementById('mainLaptopScreenshot');
        
        if (!mainImage) {
            LOGGER.error('Main laptop screenshot element not found');
            return;
        }
        
        mainImage.src = imageSrc;
        mainImage.alt = altText;
        
        const thumbs = document.querySelectorAll('.simple-thumb-laptop');
        thumbs.forEach(thumb => thumb.classList.remove('active'));
        
        if (event && event.currentTarget) {
            event.currentTarget.classList.add('active');
        }
        
        LOGGER.info(`Laptop image changed to: ${imageSrc}`);
    };

    // ============================================
    // SOCIAL SHARE BUTTONS
    // ============================================

    function initializeShareButtons() {
        LOGGER.info('Initializing share buttons...');
        
        const shareXBtn = document.getElementById('share-x-btn');
        if (shareXBtn) {
            shareXBtn.addEventListener('click', handleXShare);
        }
        
        const shareFacebookBtn = document.getElementById('share-facebook-btn');
        if (shareFacebookBtn) {
            shareFacebookBtn.addEventListener('click', handleFacebookShare);
        }
        
        const shareTelegramBtn = document.getElementById('share-telegram-btn');
        if (shareTelegramBtn) {
            shareTelegramBtn.addEventListener('click', handleTelegramShare);
        }
        
        LOGGER.success('Share buttons initialized');
    }

    function handleXShare() {
        const shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(SHARE_CONFIG.twitterText)}&url=${encodeURIComponent(SHARE_CONFIG.url)}&hashtags=${encodeURIComponent(SHARE_CONFIG.hashtags)}`;
        window.open(shareUrl, '_blank', 'width=600,height=400');
        LOGGER.info('X/Twitter share clicked');
        showShareConfirmation('X/Twitter');
    }

    function handleFacebookShare() {
        const shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(SHARE_CONFIG.url)}`;
        window.open(shareUrl, '_blank', 'width=600,height=400');
        LOGGER.info('Facebook share clicked');
        showShareConfirmation('Facebook');
    }

    function handleTelegramShare() {
        const shareUrl = `https://t.me/share/url?url=${encodeURIComponent(SHARE_CONFIG.url)}&text=${encodeURIComponent(SHARE_CONFIG.telegramText)}`;
        window.open(shareUrl, '_blank', 'width=600,height=400');
        LOGGER.info('Telegram share clicked');
        showShareConfirmation('Telegram');
    }

    function showShareConfirmation(platform) {
        const messageBox = document.getElementById('ember-message-box');
        
        if (!messageBox) return;
        
        const message = `
            ✅ <strong>${platform} Share Opened!</strong><br><br>
            <strong>Next Steps:</strong><br>
            1. Complete your ${platform} post<br>
            2. Copy the link to your post<br>
            3. Paste it in the "Social Media Post URL" field below<br>
            4. Complete the form and claim your $Ember tokens!
        `;
        
        messageBox.innerHTML = message;
        messageBox.className = 'message-box-compact info';
        messageBox.style.display = 'block';
        
        setTimeout(() => {
            const claimForm = document.getElementById('ember-claim-form');
            if (claimForm) {
                claimForm.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }
        }, 500);
        
        setTimeout(() => {
            messageBox.style.display = 'none';
        }, 10000);
    }

    // ============================================
    // $EMBER AIRDROP SYSTEM
    // ============================================

    let airdropElements = null;

    function initializeAirdropSystem() {
        LOGGER.info('Initializing $Ember Airdrop system...');
        
        airdropElements = {
            claimForm: document.getElementById('ember-claim-form'),
            claimWallet: document.getElementById('claim-wallet'),
            claimEmail: document.getElementById('claim-email'),
            claimSocialUrl: document.getElementById('claim-social-url'),
            claimTerms: document.getElementById('claim-terms'),
            claimButton: document.getElementById('claim-submit-btn'),
            messageBox: document.getElementById('ember-message-box'),
            statusWallet: document.getElementById('status-wallet'),
            checkStatusBtn: document.getElementById('check-status-btn'),
            totalEmber: document.getElementById('ember-total-ember'),
            emberClaimed: document.getElementById('ember-claimed'),
            emberRemaining: document.getElementById('ember-remaining'),
            peopleClaimed: document.getElementById('ember-people-claimed'),
            progressPercentage: document.getElementById('ember-progress-percentage'),
            progressBar: document.getElementById('ember-progress-bar')
        };
        
        if (!airdropElements.claimForm) {
            LOGGER.warn('Airdrop form not found');
            return;
        }
        
        updateTrackerDisplay();
        setupAirdropEventListeners();
        initializeShareButtons();
        
        if (CONFIG.BACKEND_READY) {
            loadRealTimeData();
            setInterval(loadRealTimeData, 30000);
        }
        
        LOGGER.success('$Ember Airdrop system initialized');
    }

    function setupAirdropEventListeners() {
        if (airdropElements.claimForm) {
            airdropElements.claimForm.addEventListener('submit', handleClaimSubmit);
        }
        
        if (airdropElements.checkStatusBtn) {
            airdropElements.checkStatusBtn.addEventListener('click', handleStatusCheck);
        }
        
        if (airdropElements.claimWallet) {
            airdropElements.claimWallet.addEventListener('blur', function() {
                validateWalletInput(this);
            });
        }
        
        if (airdropElements.claimEmail) {
            airdropElements.claimEmail.addEventListener('blur', function() {
                validateEmailInput(this);
            });
        }
        
        if (airdropElements.claimSocialUrl) {
            airdropElements.claimSocialUrl.addEventListener('blur', function() {
                validateSocialUrlInput(this);
            });
        }
    }

    async function handleClaimSubmit(e) {
        e.preventDefault();
        
        const wallet = airdropElements.claimWallet.value.trim();
        const email = airdropElements.claimEmail.value.trim();
        const socialUrl = airdropElements.claimSocialUrl ? airdropElements.claimSocialUrl.value.trim() : '';
        const termsAccepted = airdropElements.claimTerms ? airdropElements.claimTerms.checked : false;
        
        if (!wallet || !email) {
            showMessage('❌ Please fill in all required fields (Wallet Address and Email).', 'error');
            return;
        }

        if (!termsAccepted) {
            showMessage('❌ You must agree to the airdrop terms to continue.', 'error');
            return;
        }
        
        if (socialUrl && !validateUrl(socialUrl)) {
            showMessage('❌ Invalid social media post URL format. Please enter a valid URL.', 'error');
            airdropElements.claimSocialUrl.focus();
            return;
        }
        
        if (socialUrl) {
            const supportedPlatforms = ['twitter.com', 'x.com', 'facebook.com', 'fb.com', 't.me', 'telegram.org'];
            const urlHost = new URL(socialUrl).hostname.toLowerCase();
            const isSupported = supportedPlatforms.some(platform => urlHost.includes(platform));
            
            if (!isSupported) {
                showMessage('❌ Social media post URL must be from X/Twitter, Facebook, or Telegram.', 'error');
                airdropElements.claimSocialUrl.focus();
                return;
            }
        }
        
        if (!validateWallet(wallet)) {
            showMessage('❌ Invalid Solana wallet address format.', 'error');
            airdropElements.claimWallet.focus();
            return;
        }
        
        if (!validateEmail(email)) {
            showMessage('❌ Invalid email address format.', 'error');
            airdropElements.claimEmail.focus();
            return;
        }
        
        if (!CONFIG.BACKEND_READY) {
            showMessage('⏳ <strong>Airdrop Coming Soon!</strong><br><br>The $EMBER airdrop system is not yet active. Follow us on social media to be notified the moment it launches!', 'info');
            return;
        }
        
        airdropElements.claimButton.disabled = true;
        const originalButtonText = airdropElements.claimButton.innerHTML;
        airdropElements.claimButton.innerHTML = '<span>⏳</span><span>Processing...</span>';
        
        try {
            const response = await fetch(`${CONFIG.API_BASE}/claim.php`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ wallet, email, socialUrl: socialUrl || null })
            });
            
            if (!response.ok) {
                throw new Error(`Server responded with ${response.status}`);
            }
            
            const data = await response.json();
            
            if (data.success) {
                showMessage(`✅ <strong>Claim Successful!</strong><br><br>Congratulations! You've successfully claimed <span class="golden-highlight">${formatNumber(CONFIG.TOKENS_PER_CLAIM)} $EMBER</span> tokens.<br><br>Your tokens will be distributed to your wallet within 24-48 hours.`, 'success');
                airdropElements.claimForm.reset();
                
                if (CONFIG.BACKEND_READY) {
                    loadRealTimeData();
                }
            } else {
                showMessage(`❌ <strong>Claim Failed</strong><br><br>${data.message || 'An error occurred. Please try again.'}`, 'error');
            }
        } catch (error) {
            LOGGER.error('Claim submission error:', error);
            showMessage('❌ <strong>Submission Failed</strong><br><br>Unable to connect to the server. Please check your internet connection and try again.', 'error');
        } finally {
            airdropElements.claimButton.disabled = false;
            airdropElements.claimButton.innerHTML = originalButtonText;
        }
    }

    async function handleStatusCheck() {
        const wallet = airdropElements.statusWallet.value.trim();
        
        if (!wallet) {
            showMessage('❌ Please enter your Solana wallet address to check status.', 'error');
            airdropElements.statusWallet.focus();
            return;
        }
        
        if (!validateWallet(wallet)) {
            showMessage('❌ Invalid Solana wallet address format.', 'error');
            airdropElements.statusWallet.focus();
            return;
        }
        
        if (!CONFIG.BACKEND_READY) {
            showMessage('⏳ Status checking will be available when the airdrop launches.', 'info');
            return;
        }
        
        airdropElements.checkStatusBtn.disabled = true;
        const originalText = airdropElements.checkStatusBtn.textContent;
        airdropElements.checkStatusBtn.textContent = '🔄 Checking...';
        
        try {
            const response = await fetch(`${CONFIG.API_BASE}/check-status.php?wallet=${encodeURIComponent(wallet)}`);
            const data = await response.json();
            
            if (data.claimed) {
                let statusMessage = `✅ <strong>Claim Verified!</strong><br><br>`;
                statusMessage += `📍 <strong>Wallet:</strong> ${wallet.substring(0, 6)}...${wallet.substring(wallet.length - 4)}<br>`;
                statusMessage += `💎 <strong>Tokens:</strong> ${formatNumber(data.token_amount || CONFIG.TOKENS_PER_CLAIM)} $EMBER<br>`;
                statusMessage += `📊 <strong>Status:</strong> ${data.verification_status || 'Pending Verification'}`;
                showMessage(statusMessage, 'success');
            } else {
                showMessage('ℹ️ <strong>No Claim Found</strong><br><br>This wallet hasn\'t submitted a claim yet.', 'info');
            }
        } catch (error) {
            LOGGER.error('Status check error:', error);
            showMessage('❌ <strong>Status Check Failed</strong><br><br>Unable to check status. Please try again.', 'error');
        } finally {
            airdropElements.checkStatusBtn.disabled = false;
            airdropElements.checkStatusBtn.textContent = originalText;
        }
    }

    async function loadRealTimeData() {
        try {
            const response = await fetch(`${CONFIG.API_BASE}/stats.php`);
            const data = await response.json();
            
            if (response.ok) {
                updateTrackerDisplay(data);
            }
        } catch (error) {
            LOGGER.error('Data loading error:', error);
        }
    }

    function updateTrackerDisplay(data = null) {
        const stats = data || {
            total_ember: CONFIG.TOTAL_EMBER,
            ember_claimed: 0,
            ember_remaining: CONFIG.TOTAL_EMBER,
            people_claimed: 0,
            progress_percentage: 0
        };
        
        if (airdropElements.totalEmber) {
            airdropElements.totalEmber.textContent = formatNumber(stats.total_ember);
        }
        if (airdropElements.emberClaimed) {
            airdropElements.emberClaimed.textContent = formatNumber(stats.ember_claimed);
        }
        if (airdropElements.emberRemaining) {
            airdropElements.emberRemaining.textContent = formatNumber(stats.ember_remaining);
        }
        if (airdropElements.peopleClaimed) {
            airdropElements.peopleClaimed.textContent = 
                `${formatNumber(stats.people_claimed)} / ${formatNumber(CONFIG.MAX_RECIPIENTS)}`;
        }
        if (airdropElements.progressPercentage) {
            airdropElements.progressPercentage.textContent = stats.progress_percentage;
        }
        if (airdropElements.progressBar) {
            airdropElements.progressBar.style.width = `${stats.progress_percentage}%`;
        }
    }

    function validateWallet(wallet) {
        if (!wallet) return false;
        const solanaRegex = /^[1-9A-HJ-NP-Za-km-z]{32,44}$/;
        return solanaRegex.test(wallet);
    }

    function validateWalletInput(input) {
        const wallet = input.value.trim();
        if (wallet && !validateWallet(wallet)) {
            input.style.borderColor = '#ef4444';
        } else {
            input.style.borderColor = '';
        }
    }

    function validateEmail(email) {
        if (!email) return false;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    function validateEmailInput(input) {
        const email = input.value.trim();
        if (email && !validateEmail(email)) {
            input.style.borderColor = '#ef4444';
        } else {
            input.style.borderColor = '';
        }
    }

    function validateUrl(url) {
        if (!url) return false;
        try {
            new URL(url);
            return true;
        } catch {
            return false;
        }
    }

    function validateSocialUrlInput(input) {
        const url = input.value.trim();
        if (url) {
            if (!validateUrl(url)) {
                input.style.borderColor = '#ef4444';
                return;
            }
            
            try {
                const supportedPlatforms = ['twitter.com', 'x.com', 'facebook.com', 'fb.com', 't.me', 'telegram.org'];
                const urlHost = new URL(url).hostname.toLowerCase();
                const isSupported = supportedPlatforms.some(platform => urlHost.includes(platform));
                
                if (!isSupported) {
                    input.style.borderColor = '#ef4444';
                } else {
                    input.style.borderColor = '';
                }
            } catch {
                input.style.borderColor = '#ef4444';
            }
        } else {
            input.style.borderColor = '';
        }
    }

    let messageTimeout = null;
    
    function showMessage(message, type) {
        if (!airdropElements.messageBox) return;
        
        if (messageTimeout) {
            clearTimeout(messageTimeout);
        }
        
        airdropElements.messageBox.innerHTML = message;
        airdropElements.messageBox.className = `message-box-compact ${type}`;
        airdropElements.messageBox.style.display = 'block';
        
        setTimeout(() => {
            airdropElements.messageBox.scrollIntoView({ 
                behavior: 'smooth', 
                block: 'nearest'
            });
        }, 100);
        
        const baseTime = type === 'error' ? 10000 : 8000;
        const messageLength = message.replace(/<[^>]*>/g, '').length;
        const displayTime = Math.min(baseTime + (messageLength * 30), 15000);
        
        messageTimeout = setTimeout(() => {
            airdropElements.messageBox.style.display = 'none';
        }, displayTime);
    }

    function formatNumber(num) {
        if (num === null || num === undefined) return '0';
        return Number(num).toLocaleString('en-US');
    }

    // ============================================
    // SCROLL REVEAL ANIMATION SYSTEM
    // ============================================

    function initializeScrollReveal() {
        LOGGER.info('Initializing scroll-reveal...');
        
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        
        if (prefersReducedMotion) {
            const scrollRevealElements = document.querySelectorAll('.scroll-reveal');
            scrollRevealElements.forEach(el => el.classList.add('visible'));
            LOGGER.info('Scroll reveal skipped (prefers-reduced-motion)');
            return;
        }
        
        const observerOptions = {
            threshold: CONFIG.SCROLL_REVEAL_THRESHOLD,
            rootMargin: CONFIG.SCROLL_REVEAL_ROOT_MARGIN
        };
        
        const observerCallback = (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        };
        
        const observer = new IntersectionObserver(observerCallback, observerOptions);
        
        const scrollRevealElements = document.querySelectorAll('.scroll-reveal:not(.main-hero):not(.main-hero *)');
        
        scrollRevealElements.forEach(el => {
            const isHeroOrChild = el.closest('.main-hero, [class*="-hero"]');
            if (!isHeroOrChild) {
                observer.observe(el);
            }
        });
        
        LOGGER.success(`Scroll reveal initialized for ${scrollRevealElements.length} elements`);
    }

    // ============================================
    // SHARED COMPONENTS LOADER
    // ============================================

    function loadSharedComponents() {
        LOGGER.info('Loading shared components...');
        
        fetch('shared/global.html')
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP ${response.status}`);
                }
                return response.text();
            })
            .then(html => {
                const container = document.getElementById('shared-components-container');
                
                if (!container) {
                    throw new Error('Shared components container not found');
                }
                
                container.innerHTML = html;
                LOGGER.success('Shared components loaded');
                
                if (window.initializePhoenixChatbot) {
                    setTimeout(() => {
                        window.initializePhoenixChatbot();
                        LOGGER.success('Phoenix chatbot initialized');
                    }, CONFIG.CHATBOT_INIT_DELAY);
                }
            })
            .catch(error => {
                LOGGER.error(`Failed to load shared components: ${error.message}`);
            });
    }

    // ============================================
    // INITIALIZATION
    // ============================================

    function waitForSharedScript() {
        return new Promise((resolve) => {
            const startTime = Date.now();
            
            const checkInterval = setInterval(() => {
                const elapsed = Date.now() - startTime;
                
                if (window.sharedScriptReady) {
                    clearInterval(checkInterval);
                    LOGGER.success('Shared.js ready');
                    resolve(true);
                }
                
                if (elapsed >= CONFIG.SHARED_READY_TIMEOUT) {
                    clearInterval(checkInterval);
                    LOGGER.warn('Shared.js timeout, continuing...');
                    resolve(false);
                }
            }, CONFIG.SHARED_READY_CHECK_INTERVAL);
        });
    }

    async function initialize() {
        LOGGER.info('Initializing main page...');
        
        await waitForSharedScript();
        
        try {
            initializeScrollReveal();
        } catch (error) {
            LOGGER.error(`Scroll reveal failed: ${error.message}`);
        }
        
        try {
            initializeAirdropSystem();
        } catch (error) {
            LOGGER.error(`Airdrop system failed: ${error.message}`);
        }
        
        try {
            loadSharedComponents();
        } catch (error) {
            LOGGER.error(`Shared components failed: ${error.message}`);
        }
        
        LOGGER.success('Main page initialization complete');
    }

    // ============================================
    // ENTRY POINT
    // ============================================

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initialize);
    } else {
        initialize();
    }

    // ============================================
    // PUBLIC API
    // ============================================

    window.VaultPhoenixMain = {
        version: '3.0.0',
        changePhoneImage: window.changePhoneImage,
        changeLaptopImage: window.changeLaptopImage,
        reinitialize: initialize
    };

    LOGGER.info('Local.js v3.0 loaded - Clean & Optimized');

})();
