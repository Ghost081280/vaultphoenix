/**
 * ============================================
 * VAULT PHOENIX - MAIN PAGE LOCAL JAVASCRIPT
 * ============================================
 * 
 * @file        local.js
 * @version     2.1.1
 * @author      Vault Phoenix LLC
 * 
 * @description
 * Main page-specific JavaScript for Vault Phoenix AR Crypto Gaming Platform.
 * Handles interactive features, animations, and component loading specific to main.html.
 * Works in conjunction with shared.js for core functionality.
 * 
 * @dependencies
 * - shared.js (v8.0+) - Required for core navigation, chatbot, and site-wide features
 * - shared.html - Required for shared components (footer, chatbot, modals)
 * 
 * @features
 * 1. Phone Gallery - Interactive phone screenshot viewer
 * 2. Laptop Gallery - Interactive laptop screenshot viewer
 * 3. $Ember Airdrop System - Claim form and status tracking WITH SHARE BUTTONS
 * 4. Social Share Buttons - X/Twitter, Facebook, Telegram sharing (PAGE-SPECIFIC)
 * 5. Scroll Reveal - Intersection Observer animations
 * 6. Shared Components Loader - Dynamic HTML component injection
 * 7. Initialization System - Graceful startup with shared.js coordination
 * 
 * @separation_from_shared
 * This file handles ONLY main.html-specific features:
 * - Share buttons (unique to airdrop section)
 * - Airdrop form logic (page-specific)
 * - Phone/laptop gallery (page-specific)
 * 
 * shared.js handles site-wide features:
 * - Navigation (desktop & mobile)
 * - Chatbot system
 * - Cookie consent
 * - Privacy modal
 * - Footer generation
 * - Scroll effects
 * 
 * @browser_support
 * - Chrome 60+
 * - Firefox 55+
 * - Safari 12+
 * - Edge 79+
 * 
 * @performance
 * - Lazy loading for images
 * - Debounced scroll events via Intersection Observer
 * - Efficient DOM queries with caching
 * 
 * @changelog
 * v2.1.1 - Improved documentation, verified no duplication with shared.js
 * v2.1.0 - Added share button functionality to airdrop section
 * ============================================
 */

(function() {
    'use strict';

    // ============================================
    // CONFIGURATION & CONSTANTS
    // ============================================

    /**
     * Configuration object for script behavior
     * @const {Object}
     */
    const CONFIG = {
        SHARED_READY_TIMEOUT: 5000,     // Max wait time for shared.js
        SHARED_READY_CHECK_INTERVAL: 50, // Check interval for shared.js
        CHATBOT_INIT_DELAY: 100,         // Delay before chatbot initialization
        SCROLL_REVEAL_THRESHOLD: 0.1,    // Intersection Observer threshold
        SCROLL_REVEAL_ROOT_MARGIN: '0px 0px -50px 0px',
        
        // Airdrop Configuration - UPDATED
        BACKEND_READY: false,            // Set to true when backend is ready
        API_BASE: '/api',                // API endpoint base URL
        TOTAL_EMBER: 16670000,           // Total $Ember pool (UPDATED from 10M)
        TOKENS_PER_CLAIM: 3333,          // Tokens per claim (UPDATED from 1000)
        MAX_RECIPIENTS: 5000             // Maximum number of recipients (UPDATED from 10000)
    };

    /**
     * Share button configuration with OpenGraph content
     * @const {Object}
     * @note PAGE-SPECIFIC - Only used in main.html airdrop section
     */
    const SHARE_CONFIG = {
        // OpenGraph data from ember.html
        title: "$Ember Token Presale - Revolutionary AR Crypto Gaming at $0.003",
        description: "Join the $Ember Token presale NOW! 166.7M tokens at $0.003 each. Revolutionary location-based AR gaming with GPS & Beacon technology. $500K hard cap - secure your tokens before Platform Operators create demand!",
        url: "https://vaultphoenix.com/ember.html",
        image: "https://vaultphoenix.com/images/VPEmberCoin.PNG",
        hashtags: "EmberToken,CryptoPresale,ARGaming,VaultPhoenix",
        
        // Twitter-specific content
        twitterText: "🔥 Revolutionary AR crypto gaming token presale! GPS & Beacon technology meets blockchain rewards. $500K hard cap. Join early before Platform Operators drive demand!",
        
        // Telegram-specific content
        telegramText: "🔥 $Ember Token Presale LIVE! Revolutionary AR crypto gaming at $0.003. 166.7M tokens available. Join now!"
    };

    /**
     * Logging utility with prefixed output
     * @const {Object}
     */
    const LOGGER = {
        info: (msg) => console.log(`🔥 [Main.js] ${msg}`),
        success: (msg) => console.log(`✅ [Main.js] ${msg}`),
        error: (msg) => console.error(`❌ [Main.js] ${msg}`),
        warn: (msg) => console.warn(`⚠️ [Main.js] ${msg}`),
        debug: (msg) => console.log(`🐛 [Main.js] ${msg}`)
    };

    // ============================================
    // PHONE GALLERY FUNCTIONALITY (PAGE-SPECIFIC)
    // ============================================

    /**
     * Changes the main phone screenshot display
     * 
     * @function changeImage
     * @global
     * @param {string} imageSrc - Path to the image file to display
     * @param {string} altText - Alternative text for accessibility
     * @returns {void}
     * 
     * @example
     * changeImage('images/EmberHome.jpg', 'Ember Home screen showing main interface');
     * 
     * @throws Will log error if main phone screenshot element not found
     */
    window.changeImage = function(imageSrc, altText) {
        const mainImage = document.getElementById('mainPhoneScreenshot');
        
        // Validate element exists
        if (!mainImage) {
            LOGGER.error('Main phone screenshot element (#mainPhoneScreenshot) not found');
            return;
        }
        
        // Update image source and alt text
        mainImage.src = imageSrc;
        mainImage.alt = altText;
        
        // Update active state on all thumbnails
        const thumbs = document.querySelectorAll('.simple-thumb');
        thumbs.forEach(thumb => thumb.classList.remove('active'));
        
        // Add active class to clicked thumbnail
        if (event && event.currentTarget) {
            event.currentTarget.classList.add('active');
        }
        
        LOGGER.debug(`Phone image changed to: ${imageSrc}`);
    };

    // ============================================
    // LAPTOP GALLERY FUNCTIONALITY (PAGE-SPECIFIC)
    // ============================================

    /**
     * Changes the main laptop screenshot display
     * 
     * @function changeLaptopImage
     * @global
     * @param {string} imageSrc - Path to the image file to display
     * @param {string} altText - Alternative text for accessibility
     * @returns {void}
     * 
     * @example
     * changeLaptopImage('images/CampaignControl.PNG', 'Campaign Control dashboard');
     * 
     * @throws Will log error if main laptop screenshot element not found
     */
    window.changeLaptopImage = function(imageSrc, altText) {
        const mainImage = document.getElementById('mainLaptopScreenshot');
        
        // Validate element exists
        if (!mainImage) {
            LOGGER.error('Main laptop screenshot element (#mainLaptopScreenshot) not found');
            return;
        }
        
        // Update image source and alt text
        mainImage.src = imageSrc;
        mainImage.alt = altText;
        
        // Update active state on all thumbnails
        const thumbs = document.querySelectorAll('.simple-thumb-laptop');
        thumbs.forEach(thumb => thumb.classList.remove('active'));
        
        // Add active class to clicked thumbnail
        if (event && event.currentTarget) {
            event.currentTarget.classList.add('active');
        }
        
        LOGGER.debug(`Laptop image changed to: ${imageSrc}`);
    };

    // ============================================
    // SOCIAL SHARE BUTTONS - PAGE-SPECIFIC
    // ============================================

    /**
     * Initialize share button event listeners
     * @note PAGE-SPECIFIC - Only used in main.html airdrop section
     * 
     * @function initializeShareButtons
     * @returns {void}
     */
    function initializeShareButtons() {
        LOGGER.info('Initializing share buttons...');
        
        // X/Twitter Share Button
        const shareXBtn = document.getElementById('share-x-btn');
        if (shareXBtn) {
            shareXBtn.addEventListener('click', handleXShare);
        }
        
        // Facebook Share Button
        const shareFacebookBtn = document.getElementById('share-facebook-btn');
        if (shareFacebookBtn) {
            shareFacebookBtn.addEventListener('click', handleFacebookShare);
        }
        
        // Telegram Share Button
        const shareTelegramBtn = document.getElementById('share-telegram-btn');
        if (shareTelegramBtn) {
            shareTelegramBtn.addEventListener('click', handleTelegramShare);
        }
        
        LOGGER.success('Share buttons initialized');
    }

    /**
     * Handle X/Twitter share button click
     * @note PAGE-SPECIFIC - Opens X share dialog with pre-filled content
     * 
     * @function handleXShare
     * @returns {void}
     */
    function handleXShare() {
        const shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(SHARE_CONFIG.twitterText)}&url=${encodeURIComponent(SHARE_CONFIG.url)}&hashtags=${encodeURIComponent(SHARE_CONFIG.hashtags)}`;
        
        // Open in new window
        window.open(shareUrl, '_blank', 'width=600,height=400');
        
        // Log event
        LOGGER.debug('X/Twitter share clicked');
        
        // Show helpful message
        showShareConfirmation('X/Twitter');
    }

    /**
     * Handle Facebook share button click
     * @note PAGE-SPECIFIC - Opens Facebook share dialog
     * 
     * @function handleFacebookShare
     * @returns {void}
     */
    function handleFacebookShare() {
        const shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(SHARE_CONFIG.url)}`;
        
        // Open in new window
        window.open(shareUrl, '_blank', 'width=600,height=400');
        
        // Log event
        LOGGER.debug('Facebook share clicked');
        
        // Show helpful message
        showShareConfirmation('Facebook');
    }

    /**
     * Handle Telegram share button click
     * @note PAGE-SPECIFIC - Opens Telegram share dialog
     * 
     * @function handleTelegramShare
     * @returns {void}
     */
    function handleTelegramShare() {
        const shareUrl = `https://t.me/share/url?url=${encodeURIComponent(SHARE_CONFIG.url)}&text=${encodeURIComponent(SHARE_CONFIG.telegramText)}`;
        
        // Open in new window
        window.open(shareUrl, '_blank', 'width=600,height=400');
        
        // Log event
        LOGGER.debug('Telegram share clicked');
        
        // Show helpful message
        showShareConfirmation('Telegram');
    }

    /**
     * Show confirmation message after share button click
     * @note PAGE-SPECIFIC - Guides user through claim process
     * 
     * @function showShareConfirmation
     * @param {string} platform - Social platform name
     * @returns {void}
     */
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
        
        // Show message
        messageBox.innerHTML = message;
        messageBox.className = 'message-box-compact info';
        messageBox.style.display = 'block';
        
        // Scroll to form
        setTimeout(() => {
            const claimForm = document.getElementById('ember-claim-form');
            if (claimForm) {
                claimForm.scrollIntoView({ 
                    behavior: 'smooth', 
                    block: 'nearest'
                });
            }
        }, 500);
        
        // Auto-hide after 10 seconds
        setTimeout(() => {
            messageBox.style.display = 'none';
        }, 10000);
    }

    // ============================================
    // $EMBER AIRDROP SYSTEM (PAGE-SPECIFIC)
    // ============================================

    /**
     * Airdrop system elements cache
     * @type {Object}
     * @note PAGE-SPECIFIC - Only used in main.html
     */
    let airdropElements = null;

    /**
     * Initialize airdrop system and cache DOM elements
     * @note PAGE-SPECIFIC - Only used in main.html airdrop section
     * 
     * @function initializeAirdropSystem
     * @returns {void}
     */
    function initializeAirdropSystem() {
        LOGGER.info('Initializing $Ember Airdrop system...');
        
        // Cache DOM elements
        airdropElements = {
            claimForm: document.getElementById('ember-claim-form'),
            claimWallet: document.getElementById('claim-wallet'),
            claimEmail: document.getElementById('claim-email'),
            claimSocialUrl: document.getElementById('claim-social-url'),
            claimTwitter: document.getElementById('claim-twitter'),
            claimTelegram: document.getElementById('claim-telegram'),
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
        
        // Validate required elements exist
        if (!airdropElements.claimForm) {
            LOGGER.warn('Airdrop form not found - system not initialized');
            return;
        }
        
        // Initialize tracker display
        updateTrackerDisplay();
        
        // Setup event listeners
        setupAirdropEventListeners();
        
        // Initialize share buttons (PAGE-SPECIFIC)
        initializeShareButtons();
        
        // Load real-time data if backend ready
        if (CONFIG.BACKEND_READY) {
            loadRealTimeData();
            // Refresh data every 30 seconds
            setInterval(loadRealTimeData, 30000);
        }
        
        LOGGER.success('$Ember Airdrop system initialized');
    }

    /**
     * Setup event listeners for airdrop functionality
     * @note PAGE-SPECIFIC
     * 
     * @function setupAirdropEventListeners
     * @returns {void}
     */
    function setupAirdropEventListeners() {
        // Claim form submission
        if (airdropElements.claimForm) {
            airdropElements.claimForm.addEventListener('submit', handleClaimSubmit);
        }
        
        // Status check button
        if (airdropElements.checkStatusBtn) {
            airdropElements.checkStatusBtn.addEventListener('click', handleStatusCheck);
        }
        
        // Real-time validation for wallet input
        if (airdropElements.claimWallet) {
            airdropElements.claimWallet.addEventListener('blur', function() {
                validateWalletInput(this);
            });
        }
        
        // Real-time validation for email input
        if (airdropElements.claimEmail) {
            airdropElements.claimEmail.addEventListener('blur', function() {
                validateEmailInput(this);
            });
        }
        
        // Real-time validation for social URL input
        if (airdropElements.claimSocialUrl) {
            airdropElements.claimSocialUrl.addEventListener('blur', function() {
                validateSocialUrlInput(this);
            });
        }
    }

    /**
     * Handle claim form submission
     * @note PAGE-SPECIFIC - Validates and submits airdrop claim
     * 
     * @function handleClaimSubmit
     * @param {Event} e - Form submission event
     * @returns {void}
     */
    async function handleClaimSubmit(e) {
        e.preventDefault();
        
        const wallet = airdropElements.claimWallet.value.trim();
        const email = airdropElements.claimEmail.value.trim();
        const socialUrl = airdropElements.claimSocialUrl ? airdropElements.claimSocialUrl.value.trim() : '';
        const twitter = airdropElements.claimTwitter ? airdropElements.claimTwitter.value.trim() : '';
        const telegram = airdropElements.claimTelegram ? airdropElements.claimTelegram.value.trim() : '';
        
        // Validate required fields
        if (!wallet || !email) {
            showMessage('❌ Please fill in all required fields (Wallet Address and Email).', 'error');
            return;
        }
        
        // Validate social URL if present
        if (socialUrl && !validateUrl(socialUrl)) {
            showMessage('❌ Invalid social media post URL format. Please enter a valid URL.', 'error');
            airdropElements.claimSocialUrl.focus();
            return;
        }
        
        // Check if URL is from supported platforms
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
        
        // Validate wallet format
        if (!validateWallet(wallet)) {
            showMessage('❌ Invalid Solana wallet address format. Please check and try again.<br><small>Valid addresses are 32-44 characters long and use base58 encoding.</small>', 'error');
            airdropElements.claimWallet.focus();
            return;
        }
        
        // Validate email format
        if (!validateEmail(email)) {
            showMessage('❌ Invalid email address format. Please enter a valid email.', 'error');
            airdropElements.claimEmail.focus();
            return;
        }
        
        // Validate Twitter URL if provided
        if (twitter && !validateUrl(twitter)) {
            showMessage('❌ Invalid Twitter/X profile URL. Please enter a valid URL (e.g., https://x.com/username).', 'error');
            airdropElements.claimTwitter.focus();
            return;
        }
        
        // Check if backend is ready
        if (!CONFIG.BACKEND_READY) {
            showMessage('⏳ <strong>Airdrop Coming Soon!</strong><br><br>The $EMBER airdrop system is not yet active. Follow us on social media to be notified the moment it launches!<br><br>Your information has been noted for when the airdrop goes live.', 'info');
            return;
        }
        
        // Disable form during submission
        airdropElements.claimButton.disabled = true;
        const originalButtonText = airdropElements.claimButton.innerHTML;
        airdropElements.claimButton.innerHTML = '<span class="ember-button-icon">⏳</span><span>Processing...</span>';
        
        try {
            const response = await fetch(`${CONFIG.API_BASE}/claim.php`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    wallet,
                    email,
                    socialUrl: socialUrl || null,
                    twitter: twitter || null,
                    telegram: telegram || null
                })
            });
            
            if (!response.ok) {
                throw new Error(`Server responded with ${response.status}`);
            }
            
            const data = await response.json();
            
            if (data.success) {
                showMessage(`✅ <strong>Claim Successful!</strong><br><br>Congratulations! You've successfully claimed <span class="golden-highlight">${formatNumber(CONFIG.TOKENS_PER_CLAIM)} $EMBER</span> tokens.<br><br>Your tokens will be distributed to your wallet within 24-48 hours. Check your claim status anytime using the status checker below.`, 'success');
                
                // Reset form
                airdropElements.claimForm.reset();
                
                // Refresh tracker data
                if (CONFIG.BACKEND_READY) {
                    loadRealTimeData();
                }
            } else {
                showMessage(`❌ <strong>Claim Failed</strong><br><br>${data.message || 'An error occurred while processing your claim. Please try again.'}`, 'error');
            }
        } catch (error) {
            LOGGER.error('Claim submission error:', error);
            let errorMessage = '❌ <strong>Submission Failed</strong><br><br>';
            if (error.message.includes('Failed to fetch')) {
                errorMessage += 'Unable to connect to the server. Please check your internet connection and try again.';
            } else {
                errorMessage += 'An unexpected error occurred. Please try again in a moment.';
            }
            showMessage(errorMessage, 'error');
        } finally {
            airdropElements.claimButton.disabled = false;
            airdropElements.claimButton.innerHTML = originalButtonText;
        }
    }

    /**
     * Handle status check button click
     * @note PAGE-SPECIFIC
     * 
     * @function handleStatusCheck
     * @returns {void}
     */
    async function handleStatusCheck() {
        const wallet = airdropElements.statusWallet.value.trim();
        
        if (!wallet) {
            showMessage('❌ Please enter your Solana wallet address to check status.', 'error');
            airdropElements.statusWallet.focus();
            return;
        }
        
        if (!validateWallet(wallet)) {
            showMessage('❌ Invalid Solana wallet address format. Please check and try again.<br><small>Valid addresses are 32-44 characters long and use base58 encoding.</small>', 'error');
            airdropElements.statusWallet.focus();
            return;
        }
        
        if (!CONFIG.BACKEND_READY) {
            showMessage('⏳ Status checking will be available when the airdrop launches. Stay tuned!', 'info');
            return;
        }
        
        // Disable button and show loading state
        airdropElements.checkStatusBtn.disabled = true;
        const originalText = airdropElements.checkStatusBtn.textContent;
        airdropElements.checkStatusBtn.textContent = '🔄 Checking...';
        
        try {
            const response = await fetch(`${CONFIG.API_BASE}/check-status.php?wallet=${encodeURIComponent(wallet)}`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json'
                }
            });
            
            if (!response.ok) {
                throw new Error(`Server responded with ${response.status}`);
            }
            
            const data = await response.json();
            
            if (data.claimed) {
                let statusMessage = `✅ <strong>Claim Verified!</strong><br><br>`;
                statusMessage += `📍 <strong>Wallet:</strong> ${wallet.substring(0, 6)}...${wallet.substring(wallet.length - 4)}<br>`;
                statusMessage += `💎 <strong>Tokens:</strong> ${formatNumber(data.token_amount || CONFIG.TOKENS_PER_CLAIM)} $EMBER<br>`;
                statusMessage += `📊 <strong>Status:</strong> ${data.verification_status || 'Pending Verification'}<br>`;
                if (data.claimed_at) {
                    statusMessage += `📅 <strong>Claimed:</strong> ${new Date(data.claimed_at).toLocaleString()}`;
                }
                
                showMessage(statusMessage, 'success');
            } else {
                showMessage('ℹ️ <strong>No Claim Found</strong><br><br>This wallet address hasn\'t submitted a claim yet. Make sure you\'ve filled out the claim form above and used the correct wallet address.', 'info');
            }
        } catch (error) {
            LOGGER.error('Status check error:', error);
            let errorMessage = '❌ <strong>Status Check Failed</strong><br><br>';
            if (error.message.includes('Failed to fetch')) {
                errorMessage += 'Unable to connect to the server. Please check your internet connection and try again.';
            } else {
                errorMessage += 'An unexpected error occurred. Please try again in a moment.';
            }
            showMessage(errorMessage, 'error');
        } finally {
            airdropElements.checkStatusBtn.disabled = false;
            airdropElements.checkStatusBtn.textContent = originalText;
        }
    }

    /**
     * Load real-time airdrop data from backend
     * @note PAGE-SPECIFIC
     * 
     * @function loadRealTimeData
     * @returns {void}
     */
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

    /**
     * Update tracker display with stats
     * @note PAGE-SPECIFIC
     * 
     * @function updateTrackerDisplay
     * @param {Object|null} data - Stats data from backend
     * @returns {void}
     */
    function updateTrackerDisplay(data = null) {
        // Use provided data or defaults
        const stats = data || {
            total_ember: CONFIG.TOTAL_EMBER,
            ember_claimed: 0,
            ember_remaining: CONFIG.TOTAL_EMBER,
            people_claimed: 0,
            progress_percentage: 0
        };
        
        // Update DOM elements
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

    /**
     * Validate Solana wallet address format
     * @note PAGE-SPECIFIC validation utility
     * 
     * @function validateWallet
     * @param {string} wallet - Wallet address to validate
     * @returns {boolean}
     */
    function validateWallet(wallet) {
        if (!wallet) return false;
        // Solana wallet: 32-44 characters, base58 encoded
        const solanaRegex = /^[1-9A-HJ-NP-Za-km-z]{32,44}$/;
        return solanaRegex.test(wallet);
    }

    /**
     * Validate wallet input field
     * @note PAGE-SPECIFIC
     * 
     * @function validateWalletInput
     * @param {HTMLInputElement} input - Input element to validate
     * @returns {void}
     */
    function validateWalletInput(input) {
        const wallet = input.value.trim();
        if (wallet && !validateWallet(wallet)) {
            input.style.borderColor = '#ef4444';
        } else {
            input.style.borderColor = '';
        }
    }

    /**
     * Validate email address format
     * @note PAGE-SPECIFIC validation utility
     * 
     * @function validateEmail
     * @param {string} email - Email to validate
     * @returns {boolean}
     */
    function validateEmail(email) {
        if (!email) return false;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    /**
     * Validate email input field
     * @note PAGE-SPECIFIC
     * 
     * @function validateEmailInput
     * @param {HTMLInputElement} input - Input element to validate
     * @returns {void}
     */
    function validateEmailInput(input) {
        const email = input.value.trim();
        if (email && !validateEmail(email)) {
            input.style.borderColor = '#ef4444';
        } else {
            input.style.borderColor = '';
        }
    }

    /**
     * Validate URL format
     * @note PAGE-SPECIFIC validation utility
     * 
     * @function validateUrl
     * @param {string} url - URL to validate
     * @returns {boolean}
     */
    function validateUrl(url) {
        if (!url) return false;
        try {
            new URL(url);
            return true;
        } catch {
            return false;
        }
    }

    /**
     * Validate social URL input field
     * @note PAGE-SPECIFIC
     * 
     * @function validateSocialUrlInput
     * @param {HTMLInputElement} input - Input element to validate
     * @returns {void}
     */
    function validateSocialUrlInput(input) {
        const url = input.value.trim();
        if (url) {
            if (!validateUrl(url)) {
                input.style.borderColor = '#ef4444';
                return;
            }
            
            // Check if from supported platforms
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

    /**
     * Show message to user
     * @note PAGE-SPECIFIC - Shows messages in airdrop section
     * 
     * @function showMessage
     * @param {string} message - Message HTML content
     * @param {string} type - Message type (success, error, info)
     * @returns {void}
     */
    let messageTimeout = null;
    
    function showMessage(message, type) {
        if (!airdropElements.messageBox) return;
        
        // Clear any existing timeout
        if (messageTimeout) {
            clearTimeout(messageTimeout);
        }
        
        airdropElements.messageBox.innerHTML = message;
        airdropElements.messageBox.className = `message-box-compact ${type}`;
        airdropElements.messageBox.style.display = 'block';
        
        // Set ARIA attributes for accessibility
        airdropElements.messageBox.setAttribute('role', type === 'error' ? 'alert' : 'status');
        airdropElements.messageBox.setAttribute('aria-live', type === 'error' ? 'assertive' : 'polite');
        
        // Smooth scroll to message
        setTimeout(() => {
            airdropElements.messageBox.scrollIntoView({ 
                behavior: 'smooth', 
                block: 'nearest',
                inline: 'nearest'
            });
        }, 100);
        
        // Auto-hide after appropriate duration
        const baseTime = type === 'error' ? 10000 : 8000;
        const messageLength = message.replace(/<[^>]*>/g, '').length;
        const displayTime = Math.min(baseTime + (messageLength * 30), 15000);
        
        messageTimeout = setTimeout(() => {
            airdropElements.messageBox.style.display = 'none';
            airdropElements.messageBox.removeAttribute('role');
            airdropElements.messageBox.removeAttribute('aria-live');
        }, displayTime);
    }

    /**
     * Format number with commas
     * @note Utility function
     * 
     * @function formatNumber
     * @param {number} num - Number to format
     * @returns {string}
     */
    function formatNumber(num) {
        if (num === null || num === undefined) return '0';
        return Number(num).toLocaleString('en-US');
    }

    // ============================================
    // SCROLL REVEAL ANIMATION SYSTEM
    // ============================================

    /**
     * Initializes Intersection Observer for scroll reveal animations
     * @note Handles page-specific scroll animations
     * 
     * @function initializeScrollReveal
     * @returns {void}
     * 
     * @description
     * Uses Intersection Observer API to detect when elements enter viewport
     * and adds 'revealed' class to trigger CSS animations. More performant
     * than scroll event listeners.
     * 
     * @performance
     * - Uses passive observation
     * - Single observer for all elements
     * - Automatic cleanup via garbage collection
     * 
     * @accessibility
     * - Respects prefers-reduced-motion
     * - Maintains proper ARIA labels
     */
    function initializeScrollReveal() {
        // Check for reduced motion preference
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        
        if (prefersReducedMotion) {
            // Skip animations if user prefers reduced motion
            const scrollRevealElements = document.querySelectorAll('.scroll-reveal');
            scrollRevealElements.forEach(el => el.classList.add('revealed'));
            LOGGER.info('Scroll reveal skipped (prefers-reduced-motion)');
            return;
        }
        
        // Configure Intersection Observer options
        const observerOptions = {
            threshold: CONFIG.SCROLL_REVEAL_THRESHOLD,
            rootMargin: CONFIG.SCROLL_REVEAL_ROOT_MARGIN
        };
        
        // Create Intersection Observer callback
        const observerCallback = (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                    // Optional: Unobserve after reveal for performance
                    // observer.unobserve(entry.target);
                }
            });
        };
        
        // Initialize observer
        const observer = new IntersectionObserver(observerCallback, observerOptions);
        
        // Observe all elements with scroll-reveal class
        const scrollRevealElements = document.querySelectorAll('.scroll-reveal');
        scrollRevealElements.forEach(el => observer.observe(el));
        
        LOGGER.success(`Scroll reveal initialized for ${scrollRevealElements.length} elements`);
    }

    // ============================================
    // SHARED COMPONENTS LOADER
    // ============================================

    /**
     * Loads shared HTML components from shared/global.html file
     * @note This loads footer, chatbot, cookie banner, privacy modal
     * 
     * @function loadSharedComponents
     * @async
     * @returns {Promise<void>}
     * 
     * @description
     * Dynamically loads shared components (chatbot, footer, cookie banner, privacy modal)
     * from shared/global.html and injects them into the DOM. Reinitializes chatbot after loading.
     * 
     * @throws Will log error if fetch fails or container not found
     * 
     * @components
     * - Phoenix AI Chatbot
     * - Site Footer
     * - Cookie Consent Banner
     * - Privacy Policy Modal
     */
    function loadSharedComponents() {
        LOGGER.info('Loading shared components from shared/global.html...');
        
        fetch('shared/global.html')
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP ${response.status}: ${response.statusText}`);
                }
                return response.text();
            })
            .then(html => {
                const container = document.getElementById('shared-components-container');
                
                if (!container) {
                    throw new Error('Shared components container (#shared-components-container) not found');
                }
                
                // Inject HTML into container
                container.innerHTML = html;
                LOGGER.success('Shared components loaded successfully');
                
                // Re-initialize chatbot after components are loaded
                if (window.initializePhoenixChatbot) {
                    setTimeout(() => {
                        window.initializePhoenixChatbot();
                        LOGGER.success('Phoenix chatbot reinitialized');
                    }, CONFIG.CHATBOT_INIT_DELAY);
                } else {
                    LOGGER.warn('Phoenix chatbot initialization function not found');
                }
            })
            .catch(error => {
                LOGGER.error(`Failed to load shared components: ${error.message}`);
            });
    }

    // ============================================
    // INITIALIZATION SYSTEM
    // ============================================

    /**
     * Waits for shared.js to be ready before initializing page features
     * 
     * @function waitForSharedScript
     * @returns {Promise<boolean>}
     * 
     * @description
     * Polls for window.sharedScriptReady flag set by shared.js.
     * Ensures proper initialization order and prevents race conditions.
     */
    function waitForSharedScript() {
        return new Promise((resolve) => {
            const startTime = Date.now();
            
            const checkInterval = setInterval(() => {
                const elapsed = Date.now() - startTime;
                
                // Check if shared.js is ready
                if (window.sharedScriptReady) {
                    clearInterval(checkInterval);
                    LOGGER.success('Shared.js detected and ready');
                    resolve(true);
                }
                
                // Timeout after configured duration
                if (elapsed >= CONFIG.SHARED_READY_TIMEOUT) {
                    clearInterval(checkInterval);
                    LOGGER.warn(`Shared.js not ready after ${CONFIG.SHARED_READY_TIMEOUT}ms, continuing anyway...`);
                    resolve(false);
                }
            }, CONFIG.SHARED_READY_CHECK_INTERVAL);
        });
    }

    /**
     * Main initialization function
     * 
     * @async
     * @function initialize
     * @returns {Promise<void>}
     * 
     * @description
     * Coordinates the initialization of all main.js features:
     * 1. Waits for shared.js to be ready
     * 2. Initializes scroll reveal animations
     * 3. Initializes $Ember airdrop system with share buttons (PAGE-SPECIFIC)
     * 4. Loads shared HTML components
     * 5. Reports initialization status
     * 
     * @initialization_order
     * 1. Wait for shared.js (up to 5 seconds)
     * 2. Initialize scroll reveal observer
     * 3. Initialize airdrop system (includes share buttons)
     * 4. Fetch and inject shared components
     * 5. Reinitialize chatbot
     */
    async function initialize() {
        LOGGER.info('Initializing main page features...');
        
        // Wait for shared.js to be ready
        const sharedReady = await waitForSharedScript();
        
        if (sharedReady) {
            LOGGER.success('Shared.js ready, initializing main.js features...');
        }
        
        // Initialize scroll reveal animations
        try {
            initializeScrollReveal();
        } catch (error) {
            LOGGER.error(`Scroll reveal initialization failed: ${error.message}`);
        }
        
        // Initialize $Ember airdrop system (PAGE-SPECIFIC - includes share buttons)
        try {
            initializeAirdropSystem();
        } catch (error) {
            LOGGER.error(`Airdrop system initialization failed: ${error.message}`);
        }
        
        // Load shared HTML components
        try {
            loadSharedComponents();
        } catch (error) {
            LOGGER.error(`Shared components loading failed: ${error.message}`);
        }
        
        LOGGER.success('Main page initialization complete');
        
        // Log browser and environment info
        logEnvironmentInfo();
    }

    // ============================================
    // ENVIRONMENT & DEBUGGING
    // ============================================

    /**
     * Logs browser and environment information for debugging
     * 
     * @function logEnvironmentInfo
     * @returns {void}
     * 
     * @debug
     * Provides useful debugging information about the runtime environment
     */
    function logEnvironmentInfo() {
        const info = {
            userAgent: navigator.userAgent,
            viewport: `${window.innerWidth}x${window.innerHeight}`,
            pixelRatio: window.devicePixelRatio,
            colorScheme: window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light',
            reducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches,
            online: navigator.onLine,
            language: navigator.language,
            backendStatus: CONFIG.BACKEND_READY ? 'READY' : 'OFFLINE',
            tokensPerClaim: CONFIG.TOKENS_PER_CLAIM,
            totalEmber: CONFIG.TOTAL_EMBER
        };
        
        LOGGER.debug('Environment Info:');
        console.table(info);
    }

    /**
     * Error handler for uncaught errors
     * 
     * @function handleGlobalError
     * @param {ErrorEvent} event - Error event object
     * @returns {void}
     */
    function handleGlobalError(event) {
        LOGGER.error(`Uncaught error: ${event.message}`);
        LOGGER.error(`  at ${event.filename}:${event.lineno}:${event.colno}`);
    }

    /**
     * Warning handler for unhandled promise rejections
     * 
     * @function handleUnhandledRejection
     * @param {PromiseRejectionEvent} event - Promise rejection event
     * @returns {void}
     */
    function handleUnhandledRejection(event) {
        LOGGER.error(`Unhandled promise rejection: ${event.reason}`);
    }

    // ============================================
    // EVENT LISTENERS & DOM READY
    // ============================================

    /**
     * Sets up global error handlers
     */
    function setupErrorHandlers() {
        window.addEventListener('error', handleGlobalError);
        window.addEventListener('unhandledrejection', handleUnhandledRejection);
    }

    /**
     * Entry point - Initialize when DOM is ready
     */
    if (document.readyState === 'loading') {
        // DOM is still loading
        document.addEventListener('DOMContentLoaded', () => {
            setupErrorHandlers();
            initialize();
        });
    } else {
        // DOM is already loaded
        setupErrorHandlers();
        initialize();
    }

    // ============================================
    // PUBLIC API
    // ============================================

    /**
     * Expose public API for external access
     * @namespace VaultPhoenixMain
     */
    window.VaultPhoenixMain = {
        version: '2.1.1',
        changeImage: window.changeImage,
        changeLaptopImage: window.changeLaptopImage,
        reinitialize: initialize,
        airdrop: {
            refreshData: loadRealTimeData,
            validateWallet: validateWallet,
            validateEmail: validateEmail,
            validateUrl: validateUrl
        },
        share: {
            handleXShare: handleXShare,
            handleFacebookShare: handleFacebookShare,
            handleTelegramShare: handleTelegramShare,
            config: SHARE_CONFIG
        }
    };

    LOGGER.info('Local.js v2.1.1 loaded successfully - Properly separated from shared.js');

})();

/**
 * ============================================
 * END OF LOCAL.JS v2.1.1
 * ============================================
 */
