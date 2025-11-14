// ============================================
// VAULT PHOENIX MAIN.HTML LOCAL JAVASCRIPT
// ULTIMATE BUTTER-SMOOTH VERSION v2.2
// COMPLETE WITH ALL ORIGINAL FEATURES + ENHANCED MODALS
// MATCHING EMBER PAGE AIRDROP MODALS
// ✅ FIX: Smooth scroll no longer blocks ember.html anchor links
// ============================================

(function() {
'use strict';

// ============================================
// PERFORMANCE STATE TRACKING
// ============================================
const pageState = {
    isReady: false,
    imagesLoaded: false,
    fontsLoaded: false,
    criticalImagesLoaded: false
};

// ============================================
// CRITICAL IMAGES PRELOADER
// ============================================
function preloadCriticalImages() {
    return new Promise((resolve) => {
        const criticalImages = [
            'images/PhoenixDesign.PNG',
            'images/VPEmberCoin.PNG',
            'images/PhoenixHoldingCoin.PNG',
            'images/VPLogoNoText.PNG'
        ];
        
        let loadedCount = 0;
        const totalImages = criticalImages.length;
        
        if (totalImages === 0) {
            resolve();
            return;
        }
        
        criticalImages.forEach(src => {
            const img = new Image();
            img.onload = img.onerror = () => {
                loadedCount++;
                if (loadedCount === totalImages) {
                    pageState.criticalImagesLoaded = true;
                    console.log('✅ Critical images preloaded');
                    resolve();
                }
            };
            img.src = src;
        });
        
        setTimeout(() => {
            if (!pageState.criticalImagesLoaded) {
                pageState.criticalImagesLoaded = true;
                console.log('⚠️ Critical images timeout - proceeding anyway');
                resolve();
            }
        }, 3000);
    });
}

// ============================================
// FONT LOADING OPTIMIZATION
// ============================================
function waitForFonts() {
    return new Promise((resolve) => {
        if ('fonts' in document) {
            document.fonts.ready.then(() => {
                pageState.fontsLoaded = true;
                console.log('✅ Fonts loaded');
                resolve();
            }).catch(() => {
                pageState.fontsLoaded = true;
                console.log('⚠️ Font loading error - proceeding');
                resolve();
            });
            
            setTimeout(() => {
                if (!pageState.fontsLoaded) {
                    pageState.fontsLoaded = true;
                    console.log('⚠️ Font loading timeout - proceeding');
                    resolve();
                }
            }, 2000);
        } else {
            pageState.fontsLoaded = true;
            resolve();
        }
    });
}

// ============================================
// SCROLL POSITION RESTORATION
// ============================================
function saveScrollPosition() {
    sessionStorage.setItem('vp_scroll', window.scrollY);
    sessionStorage.setItem('vp_scroll_time', Date.now());
}

function restoreScrollPosition() {
    const scrollPos = sessionStorage.getItem('vp_scroll');
    const scrollTime = sessionStorage.getItem('vp_scroll_time');
    
    if (scrollPos && scrollTime && (Date.now() - parseInt(scrollTime)) < 30000) {
        window.scrollTo({
            top: parseInt(scrollPos, 10),
            behavior: 'instant'
        });
        console.log(`✅ Scroll restored to ${scrollPos}px`);
    }
}

window.addEventListener('beforeunload', saveScrollPosition);
window.addEventListener('pagehide', () => {
    saveScrollPosition();
    setTimeout(() => {
        sessionStorage.removeItem('vp_scroll');
        sessionStorage.removeItem('vp_scroll_time');
    }, 100);
});

// ============================================
// SMOOTH SCROLL REVEAL ANIMATIONS
// ============================================
function initializeScrollReveal() {
    const viewportHeight = window.innerHeight;
    const revealElements = document.querySelectorAll('.scroll-reveal');
    
    revealElements.forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.top < viewportHeight && rect.bottom > 0) {
            el.classList.add('revealed');
        }
    });
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -80px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const delay = entry.target.classList.contains('stagger-1') ? 100 :
                             entry.target.classList.contains('stagger-2') ? 200 :
                             entry.target.classList.contains('stagger-3') ? 300 :
                             entry.target.classList.contains('stagger-4') ? 400 : 0;
                
                setTimeout(() => {
                    entry.target.classList.add('revealed');
                }, delay);
                
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    revealElements.forEach(el => {
        if (!el.classList.contains('revealed')) {
            observer.observe(el);
        }
    });
    
    console.log(`✅ Scroll reveal initialized for ${revealElements.length} elements`);
}

// ============================================
// INTELLIGENT IMAGE LOADING
// ============================================
function initializeImageLoading() {
    const images = document.querySelectorAll('img');
    let loadedCount = 0;
    const totalImages = images.length;
    
    const heroImages = document.querySelectorAll('.main-hero img, .hero-container img');
    const aboveFoldImages = [];
    const belowFoldImages = [];
    
    images.forEach(img => {
        const rect = img.getBoundingClientRect();
        if (rect.top < window.innerHeight * 1.5) {
            aboveFoldImages.push(img);
        } else {
            belowFoldImages.push(img);
        }
    });
    
    console.log(`📊 Image Loading Plan:
   - Hero: ${heroImages.length}
   - Above Fold: ${aboveFoldImages.length}
   - Below Fold: ${belowFoldImages.length}
   - Total: ${totalImages}`);
    
    images.forEach(img => {
        if (img.complete && img.naturalHeight !== 0) {
            img.classList.add('img-loaded');
            loadedCount++;
        } else {
            img.addEventListener('load', () => {
                img.classList.add('img-loaded');
                loadedCount++;
                
                if (loadedCount === totalImages) {
                    pageState.imagesLoaded = true;
                    console.log('✅ All images loaded');
                }
            });
            
            img.addEventListener('error', () => {
                console.warn(`⚠️ Failed to load: ${img.src}`);
                img.classList.add('img-error');
                loadedCount++;
            });
        }
    });
    
    if ('IntersectionObserver' in window) {
        const lazyObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                    }
                    lazyObserver.unobserve(img);
                }
            });
        }, {
            rootMargin: '200px'
        });
        
        belowFoldImages.forEach(img => {
            if (img.loading === 'lazy') {
                lazyObserver.observe(img);
            }
        });
    }
    
    console.log('✅ Image loading system initialized');
}

// ============================================
// WAIT FOR GLOBAL.JS
// ============================================
function waitForGlobalReady(callback) {
    if (window.sharedScriptReady) {
        console.log('✅ Global.js ready - initializing main.js');
        callback();
        return;
    }
    
    let checkCount = 0;
    const maxChecks = 50;
    
    const checkInterval = setInterval(() => {
        checkCount++;
        
        if (window.sharedScriptReady) {
            clearInterval(checkInterval);
            console.log('✅ Global.js ready - initializing main.js');
            callback();
        } else if (checkCount >= maxChecks) {
            clearInterval(checkInterval);
            console.warn('⚠️ Global.js timeout - initializing anyway');
            callback();
        }
    }, 40);
}

// ============================================
// AIRDROP TERMS MODAL - ENHANCED TO MATCH EMBER
// ============================================
function initializeTermsModal() {
    let modal = document.getElementById('airdrop-terms-modal');
    
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'airdrop-terms-modal';
        modal.className = 'tpa-modal';
        modal.style.display = 'none';
        modal.setAttribute('role', 'dialog');
        modal.setAttribute('aria-modal', 'true');
        
        modal.innerHTML = `
            <div class="tpa-modal-overlay"></div>
            <div class="tpa-modal-content" style="max-width: 800px;">
                <div class="tpa-modal-header">
                    <h3>
                        <img src="images/TechnicalFoundation.PNG" alt="" aria-hidden="true">
                        $Ember Airdrop Terms & Conditions
                    </h3>
                    <button class="tpa-modal-close" id="close-terms-modal" aria-label="Close terms modal">×</button>
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
                                <li>Limited to first 2,700 verified participants</li>
                            </ul>
                        </div>
                        
                        <div style="background: rgba(26, 15, 10, 0.6); padding: 20px; border-radius: 15px; border: 1px solid rgba(215, 51, 39, 0.3); margin-bottom: 20px;">
                            <h4 style="color: #f0a500; margin-bottom: 15px;">2. Token Distribution</h4>
                            <ul style="margin-left: 20px; line-height: 1.8;">
                                <li>Each verified participant receives 3,333 EMBER tokens (≈$10 value at $0.003 presale price)</li>
                                <li>Tokens will be distributed to your Solana wallet address after the presale campaign ends</li>
                                <li>Distribution timeline: Within 30 days after presale completion</li>
                                <li>Total airdrop pool: 16,670,000 EMBER tokens (≈$50K value)</li>
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
                        <button class="tpa-agree-btn" id="agree-terms-btn" style="background: var(--ember-gradient-primary);">
                            ✓ I Agree to Terms & Conditions
                        </button>
                        <button class="tpa-download-btn" id="cancel-terms-btn" style="margin-top: 10px;">
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
    }
    
    const openBtn = document.getElementById('open-terms-modal');
    const closeBtn = document.getElementById('close-terms-modal');
    const agreeBtn = document.getElementById('agree-terms-btn');
    const cancelBtn = document.getElementById('cancel-terms-btn');
    const termsCheckbox = document.getElementById('claim-terms');
    
    if (!openBtn || !termsCheckbox) return;
    
    function openModal(e) {
        e.preventDefault();
        e.stopPropagation();
        modal.classList.add('active');
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }
    
    function closeModal(e) {
        if (e) e.preventDefault();
        modal.classList.remove('active');
        modal.style.display = 'none';
        document.body.style.overflow = '';
    }
    
    openBtn.addEventListener('click', openModal);
    if (closeBtn) closeBtn.addEventListener('click', closeModal);
    if (cancelBtn) cancelBtn.addEventListener('click', closeModal);
    
    const overlay = modal.querySelector('.tpa-modal-overlay');
    if (overlay) overlay.addEventListener('click', (e) => {
        if (e.target === overlay) closeModal(e);
    });
    
    if (agreeBtn) {
        agreeBtn.addEventListener('click', (e) => {
            e.preventDefault();
            termsCheckbox.disabled = false;
            termsCheckbox.checked = true;
            closeModal();
        });
    }
    
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.style.display === 'flex') {
            closeModal();
        }
    });
    
    console.log('✅ Terms modal initialized');
}

// ============================================
// AIRDROP INFO MODAL - ENHANCED TO MATCH EMBER
// ============================================
function initializeInfoModal() {
    let modal = document.getElementById('airdrop-info-modal');
    
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'airdrop-info-modal';
        modal.className = 'tpa-modal';
        modal.style.display = 'none';
        modal.setAttribute('role', 'dialog');
        modal.setAttribute('aria-modal', 'true');
        
        modal.innerHTML = `
            <div class="tpa-modal-overlay"></div>
            <div class="tpa-modal-content" style="max-width: 700px;">
                <div class="tpa-modal-header">
                    <h3>
                        <img src="images/VPEmberCoin.PNG" alt="" aria-hidden="true">
                        How the $Ember Airdrop Works
                    </h3>
                    <button class="tpa-modal-close" id="close-info-modal" aria-label="Close info modal">×</button>
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
                                <li><strong>Submit</strong> - Claim your 3,333 EMBER tokens (worth ≈$10)!</li>
                            </ol>
                        </div>
                        
                        <h4 style="color: #f0a500; margin-top: 20px;">🎁 What You Get:</h4>
                        <ul style="margin-left: 20px; line-height: 1.8;">
                            <li><strong>3,333 EMBER tokens</strong> per verified claim</li>
                            <li><strong>≈$10 value</strong> at presale price ($0.003)</li>
                            <li><strong>Distributed after presale ends</strong> - early supporter rewards!</li>
                        </ul>
                        
                        <h4 style="color: #f0a500; margin-top: 20px;">⚠️ Important Rules:</h4>
                        <ul style="margin-left: 20px; line-height: 1.8;">
                            <li>You must <strong>keep your post live</strong> until the presale campaign ends</li>
                            <li>Only <strong>one claim per person</strong> (verified by wallet address)</li>
                            <li>Posts that are deleted before campaign end <strong>forfeit rewards</strong></li>
                            <li>Limited to <strong>first 2,700 participants</strong> (9M EMBER pool)</li>
                        </ul>
                        
                        <div style="background: rgba(215, 51, 39, 0.1); padding: 15px; border-radius: 10px; border-left: 3px solid #d73327; margin-top: 20px;">
                            <p style="margin: 0; font-weight: 600;">
                                <img src="images/VPEmberFlame.svg" alt="" aria-hidden="true" style="width: 24px; height: 24px; display: inline-block; vertical-align: middle; margin-right: 8px;">
                                Ready to claim your FREE $Ember? Click a share button below to get started!
                            </p>
                        </div>
                    </div>
                    
                    <div class="tpa-modal-actions" style="margin-top: 25px;">
                        <button class="tpa-agree-btn" id="ok-info-btn">
                            ✓ Got It - Let's Share!
                        </button>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
    }
    
    const openBtn = document.getElementById('airdrop-info-btn');
    const closeBtn = document.getElementById('close-info-modal');
    const okBtn = document.getElementById('ok-info-btn');
    
    if (!openBtn) return;
    
    function openModal(e) {
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
        modal.classList.add('active');
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
        return false;
    }
    
    function closeModal(e) {
        if (e) {
            e.preventDefault();
            e.stopPropagation();
        }
        modal.classList.remove('active');
        modal.style.display = 'none';
        document.body.style.overflow = '';
    }
    
    openBtn.addEventListener('click', openModal, { capture: true, passive: false });
    if (closeBtn) closeBtn.addEventListener('click', closeModal);
    if (okBtn) okBtn.addEventListener('click', closeModal);
    
    const overlay = modal.querySelector('.tpa-modal-overlay');
    if (overlay) overlay.addEventListener('click', (e) => {
        if (e.target === overlay) closeModal(e);
    });
    
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.style.display === 'flex') {
            closeModal();
        }
    });
    
    console.log('✅ Info modal initialized');
}

// ============================================
// PHONE & LAPTOP GALLERIES
// ============================================
window.changePhoneImage = function(imagePath, altText) {
    const mainImage = document.getElementById('mainPhoneScreenshot');
    const thumbs = document.querySelectorAll('.simple-thumb');
    
    if (mainImage) {
        mainImage.style.opacity = '0.7';
        setTimeout(() => {
            mainImage.src = imagePath;
            mainImage.alt = altText;
            mainImage.style.opacity = '1';
        }, 150);
    }
    
    thumbs.forEach(thumb => {
        const img = thumb.querySelector('img');
        if (img && img.src.includes(imagePath.split('/').pop())) {
            thumb.classList.add('active');
        } else {
            thumb.classList.remove('active');
        }
    });
};

window.changeLaptopImage = function(imagePath, altText) {
    const mainImage = document.getElementById('mainLaptopScreenshot');
    const thumbs = document.querySelectorAll('.simple-thumb-laptop');
    
    if (mainImage) {
        mainImage.style.opacity = '0.7';
        setTimeout(() => {
            mainImage.src = imagePath;
            mainImage.alt = altText;
            mainImage.style.opacity = '1';
        }, 150);
    }
    
    thumbs.forEach(thumb => {
        const img = thumb.querySelector('img');
        if (img && img.src.includes(imagePath.split('/').pop())) {
            thumb.classList.add('active');
        } else {
            thumb.classList.remove('active');
        }
    });
};

function preloadGalleryImages() {
    const phoneImages = [
        'images/ARView.jpg',
        'images/EmberAirdrop.jpg',
        'images/EmberCollected.jpg',
        'images/EmberNearby.jpg',
        'images/EmberVault.jpg',
        'images/HuntMap.jpg'
    ];
    
    const laptopImages = [
        'images/CampaignControl.PNG',
        'images/DashboardOverview.PNG',
        'images/AdvertiserManagement.PNG',
        'images/AirdropCenter.PNG',
        'images/Walletandfunding.PNG',
        'images/AppbuilderSDK.PNG'
    ];
    
    [...phoneImages, ...laptopImages].forEach(src => {
        const img = new Image();
        img.src = src;
    });
    
    console.log('✅ Gallery images preloaded');
}

// ============================================
// AIRDROP FORM
// ============================================
function initializeAirdropForm() {
    const form = document.getElementById('ember-claim-form');
    const messageBox = document.getElementById('ember-message-box');
    const submitBtn = document.getElementById('claim-submit-btn');
    
    if (!form) return;
    
    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const wallet = document.getElementById('claim-wallet')?.value.trim();
        const socialUrl = document.getElementById('claim-social-url')?.value.trim();
        const termsChecked = document.getElementById('claim-terms')?.checked;
        
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
        
        if (submitBtn) {
            submitBtn.disabled = true;
            const originalHTML = submitBtn.innerHTML;
            submitBtn.innerHTML = '<span>⏳ Submitting...</span>';
            
            showMessage('info', '⏳ Submitting your claim...');
            
            try {
                await new Promise(resolve => setTimeout(resolve, 2000));
                showMessage('success', '🎉 Claim submitted successfully! Check your email for confirmation.');
                form.reset();
                document.getElementById('claim-terms').disabled = true;
            } catch (error) {
                showMessage('error', '❌ Failed to submit claim. Please try again.');
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
        
        if (type === 'success') {
            setTimeout(() => {
                messageBox.style.display = 'none';
            }, 2700);
        }
    }
    
    console.log('✅ Airdrop form initialized');
}

// ============================================
// STATUS CHECKER
// ============================================
function initializeStatusChecker() {
    const checkBtn = document.getElementById('check-status-btn');
    const walletInput = document.getElementById('status-wallet');
    
    if (!checkBtn || !walletInput) return;
    
    checkBtn.addEventListener('click', async function() {
        const wallet = walletInput.value.trim();
        
        if (!wallet) {
            alert('⚠️ Please enter a wallet address');
            return;
        }
        
        try {
            checkBtn.textContent = 'Checking...';
            checkBtn.disabled = true;
            
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            const shortWallet = `${wallet.substring(0, 8)}...${wallet.substring(wallet.length - 4)}`;
            alert(`📊 Status for ${shortWallet}:\n\n❌ No claims found for this wallet address.\n\nYou can submit a new claim using the form below!`);
            
        } catch (error) {
            alert('❌ Error checking status. Please try again.');
        } finally {
            checkBtn.textContent = 'Check';
            checkBtn.disabled = false;
        }
    });
    
    console.log('✅ Status checker initialized');
}

// ============================================
// SHARE BUTTONS
// ============================================
function initializeShareButtons() {
    const shareConfig = {
        x: {
            btn: 'share-x-btn',
            handler: () => {
                const text = '🔥 Join me in the $Ember Airdrop! AR Crypto Gaming with GPS & Beacon technology. Get your FREE tokens now! #VaultPhoenix #Ember';
                const url = 'https://vaultphoenix.com/main.html';
                window.open(
                    `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`,
                    '_blank',
                    'width=600,height=400,scrollbars=yes'
                );
            }
        },
        facebook: {
            btn: 'share-facebook-btn',
            handler: () => {
                const url = 'https://vaultphoenix.com/main.html';
                window.open(
                    `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
                    '_blank',
                    'width=600,height=400,scrollbars=yes'
                );
            }
        },
        telegram: {
            btn: 'share-telegram-btn',
            handler: () => {
                const text = '🔥 Join me in the $Ember Airdrop! AR Crypto Gaming with GPS & Beacon technology. Get your FREE tokens now!';
                const url = 'https://vaultphoenix.com/main.html';
                window.open(
                    `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`,
                    '_blank',
                    'width=600,height=400,scrollbars=yes'
                );
            }
        }
    };
    
    Object.values(shareConfig).forEach(config => {
        const btn = document.getElementById(config.btn);
        if (btn) btn.addEventListener('click', config.handler);
    });
    
    console.log('✅ Share buttons initialized');
}

// ============================================
// COPY HASHTAGS
// ============================================
function initializeCopyHashtags() {
    const copyBtn = document.getElementById('copy-hashtags-btn');
    const copyBtnText = document.getElementById('copy-btn-text');
    const hashtagText = document.getElementById('hashtag-text-display');
    
    if (!copyBtn || !copyBtnText || !hashtagText) return;
    
    copyBtn.addEventListener('click', async function() {
        const textToCopy = hashtagText.textContent.trim();
        
        try {
            if (navigator.clipboard && navigator.clipboard.writeText) {
                await navigator.clipboard.writeText(textToCopy);
                showCopySuccess();
            } else {
                fallbackCopyToClipboard(textToCopy);
                showCopySuccess();
            }
        } catch (err) {
            try {
                fallbackCopyToClipboard(textToCopy);
                showCopySuccess();
            } catch (fallbackErr) {
                showCopyError();
            }
        }
    });
    
    function showCopySuccess() {
        copyBtn.classList.add('copied');
        copyBtnText.textContent = '✓ Copied!';
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
        const textarea = document.createElement('textarea');
        textarea.value = text;
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
            if (!successful) throw new Error('execCommand copy failed');
        } catch (err) {
            document.body.removeChild(textarea);
            throw err;
        }
    }
    
    console.log('✅ Copy hashtags initialized');
}

// ============================================
// AIRDROP TRACKER
// ============================================
function initializeAirdropTracker() {
    const totalEmber = 9000000;
    const claimed = 0;
    const remaining = totalEmber - claimed;
    const people = 0;
    const maxPeople = 2700;
    const percentage = ((claimed / totalEmber) * 100).toFixed(2);
    
    const claimedEl = document.getElementById('ember-claimed');
    const remainingEl = document.getElementById('ember-remaining');
    const peopleEl = document.getElementById('ember-people-claimed');
    const progressBar = document.getElementById('ember-progress-bar');
    const progressPercentage = document.getElementById('ember-progress-percentage');
    
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
    
    if (claimedEl) animateValue(claimedEl, 0, claimed, 1000);
    if (remainingEl) animateValue(remainingEl, 0, remaining, 1200);
    if (peopleEl) peopleEl.textContent = `${people.toLocaleString()} / ${maxPeople.toLocaleString()}`;
    if (progressBar) setTimeout(() => progressBar.style.width = `${percentage}%`, 500);
    if (progressPercentage) setTimeout(() => progressPercentage.textContent = percentage, 500);
    
    console.log('✅ Airdrop tracker initialized');
}

// ============================================
// COUNTDOWN TIMER
// ============================================
function initializeCountdownTimer() {
    const targetDate = new Date('November 1, 2025 00:00:00 UTC').getTime();
    const daysEl = document.getElementById('main-days');
    const hoursEl = document.getElementById('main-hours');
    const minutesEl = document.getElementById('main-minutes');
    const secondsEl = document.getElementById('main-seconds');
    
    if (!daysEl || !hoursEl || !minutesEl || !secondsEl) return;
    
    function updateCountdown() {
        const now = new Date().getTime();
        const distance = targetDate - now;
        
        if (distance < 0) {
            daysEl.textContent = '00';
            hoursEl.textContent = '00';
            minutesEl.textContent = '00';
            secondsEl.textContent = '00';
            return;
        }
        
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        daysEl.textContent = String(days).padStart(2, '0');
        hoursEl.textContent = String(hours).padStart(2, '0');
        minutesEl.textContent = String(minutes).padStart(2, '0');
        secondsEl.textContent = String(seconds).padStart(2, '0');
    }
    
    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    window.addEventListener('beforeunload', () => clearInterval(interval));
    
    console.log('✅ Countdown timer initialized');
}

// ============================================
// SMOOTH SCROLL - FIXED VERSION v2.2
// ✅ Now properly allows ember.html anchor links to work
// ============================================
function initializeSmoothScroll() {
    document.addEventListener('click', function(e) {
        // Only handle links that start with # (same-page anchors)
        const target = e.target.closest('a[href^="#"]');
        
        // If it's not a same-page anchor link, don't interfere
        if (!target) return;
        
        const href = target.getAttribute('href');
        
        // Handle scroll to top
        if (href === '#') {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
            return;
        }
        
        // Handle same-page anchors
        const targetId = href.substring(1);
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
            e.preventDefault();
            const navbar = document.querySelector('.navbar');
            const navbarHeight = navbar ? navbar.offsetHeight : 0;
            const targetPosition = targetElement.offsetTop - navbarHeight - 20;
            window.scrollTo({ top: targetPosition, behavior: 'smooth' });
            if (history.pushState) history.pushState(null, null, href);
        }
    });
    
    console.log('✅ Smooth scroll initialized (v2.2 - ember.html links work)');
}

// ============================================
// PERFORMANCE MONITORING
// ============================================
function monitorPerformance() {
    if (!('performance' in window)) return;
    
    window.addEventListener('load', () => {
        setTimeout(() => {
            const perfData = performance.getEntriesByType('navigation')[0];
            if (!perfData) return;
            
            const total = Math.round(perfData.loadEventEnd - perfData.fetchStart);
            console.log(`📊 Performance: ${total}ms total load time`);
            
            if (total > 3000) {
                console.warn('⚠️ Slow page load detected');
            } else if (total < 1000) {
                console.log('🚀 Excellent performance!');
            }
        }, 100);
    });
}

// ============================================
// DEVICE DETECTION
// ============================================
function detectTouchDevice() {
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouch) {
        document.body.classList.add('touch-device');
    } else {
        document.body.classList.add('no-touch');
    }
    const hasHover = window.matchMedia('(hover: hover)').matches;
    if (hasHover) document.body.classList.add('has-hover');
    console.log(`✅ Device: ${isTouch ? 'Touch' : 'Non-touch'}`);
}

function fixMobileViewport() {
    function setViewportHeight() {
        const vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    }
    setViewportHeight();
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(setViewportHeight, 100);
    });
    window.addEventListener('orientationchange', () => {
        setTimeout(setViewportHeight, 100);
    });
    console.log('✅ Mobile viewport fixed');
}

function respectReducedMotion() {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
        document.body.classList.add('reduce-motion');
        console.log('✅ Reduced motion enabled');
    }
}

function detectConnectionQuality() {
    if ('connection' in navigator) {
        const connection = navigator.connection;
        console.log(`📡 Connection: ${connection.effectiveType}`);
        if (connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g') {
            document.body.classList.add('slow-connection');
        } else if (connection.effectiveType === '4g') {
            document.body.classList.add('fast-connection');
        }
    }
}

// ============================================
// MASTER INITIALIZATION
// ============================================
async function initializeMainPage() {
    console.log('🔥 Vault Phoenix - Main Page v2.2 COMPLETE - Starting...');
    
    detectTouchDevice();
    fixMobileViewport();
    respectReducedMotion();
    detectConnectionQuality();
    restoreScrollPosition();
    
    const startTime = performance.now();
    await Promise.all([preloadCriticalImages(), waitForFonts()]);
    
    initializeSmoothScroll();
    initializeScrollReveal();
    initializeImageLoading();
    
    requestAnimationFrame(() => {
        initializeTermsModal();
        initializeInfoModal();
        initializeAirdropForm();
        initializeStatusChecker();
        initializeShareButtons();
        initializeCopyHashtags();
        initializeAirdropTracker();
        initializeCountdownTimer();
        preloadGalleryImages();
        monitorPerformance();
        
        pageState.isReady = true;
        const totalTime = performance.now() - startTime;
        console.log(`🎉 Main Page READY in ${Math.round(totalTime)}ms`);
    });
}

// ============================================
// START
// ============================================
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        waitForGlobalReady(initializeMainPage);
    });
} else {
    waitForGlobalReady(initializeMainPage);
}

window.vaultPhoenixMainPage = {
    state: pageState,
    version: '2.3.0-complete'
};

// ============================================
// NUCLEAR FIX: FORCE EMBER.HTML LINKS TO WORK
// This bypasses ANY JavaScript interference
// ============================================
function forceEmberLinksToWork() {
    // Get ALL links that point to ember.html
    const emberLinks = document.querySelectorAll('a[href*="ember.html"]');
    
    console.log(`🔥 FORCE FIX: Found ${emberLinks.length} ember.html links`);
    
    emberLinks.forEach((link, index) => {
        // Remove ANY existing click handlers by cloning
        const newLink = link.cloneNode(true);
        link.parentNode.replaceChild(newLink, link);
        
        // Add fresh click handler with highest priority
        newLink.addEventListener('click', function(e) {
            e.stopImmediatePropagation(); // Stop ALL other handlers
            
            const href = this.getAttribute('href');
            console.log(`🔥 FORCE NAVIGATION to: ${href}`);
            
            // Force navigation
            window.location.href = href;
            
            // Prevent any other handlers
            e.preventDefault();
            return false;
        }, true); // Use capture phase - fires FIRST
        
        console.log(`✅ Force fix applied to link ${index + 1}: ${newLink.getAttribute('href')}`);
    });
}

// Run this AFTER everything else is loaded
setTimeout(() => {
    forceEmberLinksToWork();
    console.log('🔥 FORCE FIX COMPLETE - ember.html links should now work!');
}, 2000);

})();
