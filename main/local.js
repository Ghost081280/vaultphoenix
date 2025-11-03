/**
 * ============================================
 * VAULT PHOENIX - MAIN PAGE LOCAL JAVASCRIPT
 * v3.0.0 - MERGED & OPTIMIZED
 * ============================================
 * 
 * MERGED:
 * - Original features (airdrop, share, gallery, scroll reveal)
 * - New modal functionality (terms, info, form)
 * - Airdrop tracker
 * 
 * FIXES:
 * - Scroll reveal optional (sections visible by default)
 * - JS-loaded class on body
 * - Error handling for shared components
 * 
 * @dependencies
 * - shared.js (v8.0+) - Required for core functionality
 * - shared.html - Required for shared components
 * ============================================
 */

 (function() {
    'use strict';

    // ============================================
    // CONFIGURATION & CONSTANTS
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
        description: "Join the $Ember Token presale NOW! 166.7M tokens at $0.003 each. Revolutionary location-based AR gaming with GPS & Beacon technology. $500K hard cap - secure your tokens before Platform Operators create demand!",
        url: "https://vaultphoenix.com/ember.html",
        image: "https://vaultphoenix.com/images/VPEmberCoin.PNG",
        hashtags: "EmberToken,CryptoPresale,ARGaming,VaultPhoenix",
        twitterText: "🔥 Revolutionary AR crypto gaming token presale! GPS & Beacon technology meets blockchain rewards. $500K hard cap. Join early before Platform Operators drive demand!",
        telegramText: "🔥 $Ember Token Presale LIVE! Revolutionary AR crypto gaming at $0.003. 166.7M tokens available. Join now!"
    };

    const LOGGER = {
        info: (msg) => console.log(`🔥 [Main.js] ${msg}`),
        success: (msg) => console.log(`✅ [Main.js] ${msg}`),
        error: (msg) => console.error(`❌ [Main.js] ${msg}`),
        warn: (msg) => console.warn(`⚠️ [Main.js] ${msg}`),
        debug: (msg) => console.log(`🐛 [Main.js] ${msg}`)
    };

    // ============================================
    // PHONE GALLERY FUNCTIONALITY
    // ============================================

    window.changeImage = function(imageSrc, altText) {
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
        
        LOGGER.info(`Changed phone image to ${altText}`);
    };

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
        
        LOGGER.info(`Changed laptop image to ${altText}`);
    };

    // ============================================
    // SCROLL REVEAL INITIALIZATION
    // ============================================

    function initializeScrollReveal() {
        document.body.classList.add('js-loaded');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: CONFIG.SCROLL_REVEAL_THRESHOLD,
            rootMargin: CONFIG.SCROLL_REVEAL_ROOT_MARGIN
        });
        
        document.querySelectorAll('.scroll-reveal').forEach(el => {
            observer.observe(el);
        });
        
        LOGGER.success('Scroll reveal initialized');
    }

    // ============================================
    // AIRDROP TERMS MODAL
    // ============================================
    function initializeTermsModal() {
        const modal = document.getElementById('airdrop-terms-modal');
        const openBtn = document.getElementById('open-terms-modal');
        const closeBtn = document.getElementById('close-terms-modal');
        const agreeBtn = document.getElementById('agree-terms-btn');
        const cancelBtn = document.getElementById('cancel-terms-btn');
        const termsCheckbox = document.getElementById('claim-terms');
        
        if (!modal || !openBtn || !termsCheckbox) {
            LOGGER.warn('Terms modal elements not found');
            return;
        }
        
        // Open modal
        openBtn.addEventListener('click', function(e) {
            e.preventDefault();
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
        
        // Close modal
        function closeModal() {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }
        
        if (closeBtn) {
            closeBtn.addEventListener('click', closeModal);
        }
        
        if (cancelBtn) {
            cancelBtn.addEventListener('click', closeModal);
        }
        
        // Click outside
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeModal();
            }
        });
        
        // Agree
        if (agreeBtn) {
            agreeBtn.addEventListener('click', function() {
                termsCheckbox.disabled = false;
                termsCheckbox.checked = true;
                closeModal();
            });
        }
        
        // ESC key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && modal.classList.contains('active')) {
                closeModal();
            }
        });
        
        LOGGER.success('Terms modal initialized');
    }

    // ============================================
    // AIRDROP INFO MODAL
    // ============================================
    function initializeInfoModal() {
        const modal = document.getElementById('airdrop-info-modal');
        const openBtn = document.getElementById('airdrop-info-btn');
        const closeBtn = document.getElementById('close-info-modal');
        const okBtn = document.getElementById('ok-info-btn');
        
        if (!modal || !openBtn) {
            LOGGER.warn('Info modal elements not found');
            return;
        }
        
        // Open modal
        openBtn.addEventListener('click', function(e) {
            e.preventDefault();
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
        
        // Close modal
        function closeModal() {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }
        
        if (closeBtn) {
            closeBtn.addEventListener('click', closeModal);
        }
        
        if (okBtn) {
            okBtn.addEventListener('click', closeModal);
        }
        
        // Click outside
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeModal();
            }
        });
        
        // ESC key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && modal.classList.contains('active')) {
                closeModal();
            }
        });
        
        LOGGER.success('Info modal initialized');
    }

    // ============================================
    // AIRDROP FORM HANDLING
    // ============================================
    function initializeAirdropForm() {
        const form = document.getElementById('airdrop-form');
        const walletInput = document.getElementById('airdrop-wallet');
        const emailInput = document.getElementById('airdrop-email');
        const urlInput = document.getElementById('airdrop-url');
        const submitBtn = document.getElementById('claim-submit');
        const termsCheckbox = document.getElementById('claim-terms');
        
        if (!form) {
            LOGGER.warn('Airdrop form not found');
            return;
        }
        
        // Validate on input
        form.addEventListener('input', validateForm);
        
        function validateForm() {
            const walletValid = validateWallet(walletInput.value);
            const emailValid = validateEmail(emailInput.value);
            const urlValid = validateUrl(urlInput.value);
            const termsChecked = termsCheckbox.checked;
            
            submitBtn.disabled = !(walletValid && emailValid && urlValid && termsChecked);
            submitBtn.style.opacity = submitBtn.disabled ? 0.5 : 1;
        }
        
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            // Handle submit logic
            console.log('Airdrop claim submitted');
        });
        
        LOGGER.success('Airdrop form initialized');
    }

    // ============================================
    // AIRDROP STATUS CHECKER
    // ============================================
    function initializeStatusChecker() {
        const input = document.getElementById('status-wallet');
        const btn = document.getElementById('check-status-btn');
        const result = document.getElementById('status-result');
        
        if (!btn) return;
        
        btn.addEventListener('click', async function() {
            const wallet = input.value.trim();
            if (!validateWallet(wallet)) {
                result.textContent = 'Invalid wallet address';
                return;
            }
            
            // TODO: API call
            result.textContent = 'Checking...';
            // Simulate API
            setTimeout(() => {
                result.textContent = 'No airdrop claimed yet';
            }, 1000);
        });
        
        LOGGER.success('Status checker initialized');
    }

    // ============================================
    // SHARE BUTTONS
    // ============================================
    function initializeShareButtons() {
        const xBtn = document.getElementById('share-x');
        const fbBtn = document.getElementById('share-facebook');
        const tgBtn = document.getElementById('share-telegram');
        
        if (xBtn) {
            xBtn.addEventListener('click', function(e) {
                e.preventDefault();
                const text = SHARE_CONFIG.twitterText;
                const url = 'https://vaultphoenix.com/ember.html';
                const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}&hashtags=${SHARE_CONFIG.hashtags}`;
                window.open(twitterUrl, '_blank', 'width=600,height=400');
            });
        }
        
        if (fbBtn) {
            fbBtn.addEventListener('click', function(e) {
                e.preventDefault();
                const url = 'https://vaultphoenix.com/ember.html';
                const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
                window.open(facebookUrl, '_blank', 'width=600,height=400');
            });
        }
        
        if (tgBtn) {
            tgBtn.addEventListener('click', function(e) {
                e.preventDefault();
                const text = SHARE_CONFIG.telegramText;
                const url = 'https://vaultphoenix.com/ember.html';
                const telegramUrl = `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`;
                window.open(telegramUrl, '_blank', 'width=600,height=400');
            });
        }
        
        LOGGER.success('Share buttons initialized');
    }

    // ============================================
    // AIRDROP PROGRESS TRACKER
    // ============================================
    function initializeAirdropTracker() {
        const totalEmber = CONFIG.TOTAL_EMBER;
        const claimed = 0; // TODO: Replace with actual data from API
        const remaining = totalEmber - claimed;
        const people = 0;
        const maxPeople = CONFIG.MAX_RECIPIENTS;
        const percentage = ((claimed / totalEmber) * 100).toFixed(2);
        
        // Update UI
        const claimedEl = document.getElementById('ember-claimed');
        const remainingEl = document.getElementById('ember-remaining');
        const peopleEl = document.getElementById('ember-people-claimed');
        const progressBar = document.getElementById('ember-progress-bar');
        const progressPercentage = document.getElementById('ember-progress-percentage');
        
        if (claimedEl) claimedEl.textContent = claimed.toLocaleString();
        if (remainingEl) remainingEl.textContent = remaining.toLocaleString();
        if (peopleEl) peopleEl.textContent = `${people.toLocaleString()} / ${maxPeople.toLocaleString()}`;
        if (progressBar) progressBar.style.width = `${percentage}%`;
        if (progressPercentage) progressPercentage.textContent = percentage;
        
        LOGGER.success('Airdrop tracker initialized');
    }

    // ============================================
    // SHARED COMPONENTS LOADER
    // ============================================
    function loadSharedComponents() {
        fetch('shared/global.html')
            .then(response => response.text())
            .then(html => {
                const container = document.getElementById('shared-components-container');
                if (container) {
                    container.innerHTML = html;
                    LOGGER.success('Shared components loaded');
                } else {
                    LOGGER.error('Shared components container not found');
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
            initializeTermsModal();
            initializeInfoModal();
            initializeAirdropForm();
            initializeStatusChecker();
            initializeShareButtons();
            initializeAirdropTracker();
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
        changeImage: window.changeImage,
        changeLaptopImage: window.changeLaptopImage,
        reinitialize: initialize
    };

    LOGGER.info('Local.js v3.0 loaded - Merged & Optimized');

})();
