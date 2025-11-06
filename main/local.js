// ============================================
// VAULT PHOENIX MAIN.HTML LOCAL JAVASCRIPT
// ULTIMATE BUTTER-SMOOTH VERSION
// Optimized for perfect page loads and image timing
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
// Load hero/above-fold images first for instant display
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
        
        // Timeout fallback
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
// Ensure fonts are ready before reveal
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
            
            // Timeout fallback
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
// SCROLL POSITION RESTORATION - ENHANCED
// Instant restoration with no flash
// ============================================
function saveScrollPosition() {
    sessionStorage.setItem('vp_scroll', window.scrollY);
    sessionStorage.setItem('vp_scroll_time', Date.now());
}

function restoreScrollPosition() {
    const scrollPos = sessionStorage.getItem('vp_scroll');
    const scrollTime = sessionStorage.getItem('vp_scroll_time');
    
    // Only restore if scroll was saved in last 30 seconds (fresh page reload)
    if (scrollPos && scrollTime && (Date.now() - parseInt(scrollTime)) < 30000) {
        // Use instant behavior for no visual jump
        window.scrollTo({
            top: parseInt(scrollPos, 10),
            behavior: 'instant'
        });
        console.log(`✅ Scroll restored to ${scrollPos}px`);
    }
}

// Setup scroll position handlers
window.addEventListener('beforeunload', saveScrollPosition);
window.addEventListener('pagehide', () => {
    saveScrollPosition();
    // Clean up old scroll data after navigation
    setTimeout(() => {
        sessionStorage.removeItem('vp_scroll');
        sessionStorage.removeItem('vp_scroll_time');
    }, 100);
});

// ============================================
// SMOOTH SCROLL REVEAL ANIMATIONS - OPTIMIZED
// Staggered reveals with perfect timing
// ============================================
function initializeScrollReveal() {
    // Reveal elements immediately in viewport on load
    const viewportHeight = window.innerHeight;
    const revealElements = document.querySelectorAll('.scroll-reveal');
    
    revealElements.forEach(el => {
        const rect = el.getBoundingClientRect();
        // If element is in initial viewport, reveal immediately
        if (rect.top < viewportHeight && rect.bottom > 0) {
            el.classList.add('revealed');
        }
    });
    
    // Setup observer for remaining elements
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -80px 0px' // Trigger slightly before element enters view
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Small delay for staggered effect on grouped elements
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
    
    // Observe only elements not already revealed
    revealElements.forEach(el => {
        if (!el.classList.contains('revealed')) {
            observer.observe(el);
        }
    });
    
    console.log(`✅ Scroll reveal initialized for ${revealElements.length} elements`);
}

// ============================================
// INTELLIGENT IMAGE LOADING
// Priority-based loading with smooth fade-ins
// ============================================
function initializeImageLoading() {
    const images = document.querySelectorAll('img');
    let loadedCount = 0;
    const totalImages = images.length;
    
    // Categorize images by priority
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
    
    // Add loaded class when image loads
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
    
    // Lazy load below-fold images with Intersection Observer
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
            rootMargin: '200px' // Start loading 200px before entering viewport
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
// WAIT FOR GLOBAL.JS TO COMPLETE
// Enhanced with better timeout handling
// ============================================
function waitForGlobalReady(callback) {
    if (window.sharedScriptReady) {
        console.log('✅ Global.js ready - initializing main.js');
        callback();
        return;
    }
    
    let checkCount = 0;
    const maxChecks = 50; // Reduced from 100 for faster fallback
    
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
    }, 40); // Reduced interval for faster response
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
    
    if (!modal || !openBtn || !termsCheckbox) return;
    
    openBtn.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        modal.classList.add('active');
        document.body.classList.add('modal-open');
    });
    
    function closeModal(e) {
        if (e) e.preventDefault();
        modal.classList.remove('active');
        document.body.classList.remove('modal-open');
    }
    
    if (closeBtn) closeBtn.addEventListener('click', closeModal);
    if (cancelBtn) cancelBtn.addEventListener('click', closeModal);
    
    modal.addEventListener('click', function(e) {
        if (e.target === modal) closeModal(e);
    });
    
    if (agreeBtn) {
        agreeBtn.addEventListener('click', function(e) {
            e.preventDefault();
            termsCheckbox.disabled = false;
            termsCheckbox.checked = true;
            closeModal();
        });
    }
    
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });
    
    console.log('✅ Terms modal initialized');
}

// ============================================
// AIRDROP INFO MODAL
// ============================================
function initializeInfoModal() {
    const modal = document.getElementById('airdrop-info-modal');
    const openBtn = document.getElementById('airdrop-info-btn');
    const closeBtn = document.getElementById('close-info-modal');
    const okBtn = document.getElementById('ok-info-btn');
    
    if (!modal || !openBtn) return;
    
    openBtn.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
        modal.classList.add('active');
        document.body.classList.add('modal-open');
        return false;
    }, { capture: true, passive: false });
    
    function closeModal(e) {
        if (e) {
            e.preventDefault();
            e.stopPropagation();
        }
        modal.classList.remove('active');
        document.body.classList.remove('modal-open');
    }
    
    if (closeBtn) closeBtn.addEventListener('click', closeModal);
    if (okBtn) okBtn.addEventListener('click', closeModal);
    
    modal.addEventListener('click', function(e) {
        if (e.target === modal) closeModal(e);
    });
    
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });
    
    console.log('✅ Info modal initialized');
}

// ============================================
// PHONE & LAPTOP IMAGE GALLERIES - OPTIMIZED
// Preload adjacent thumbnails for instant switching
// ============================================
window.changePhoneImage = function(imagePath, altText) {
    const mainImage = document.getElementById('mainPhoneScreenshot');
    const thumbs = document.querySelectorAll('.simple-thumb');
    
    if (mainImage) {
        // Smooth fade transition
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
        // Smooth fade transition
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

// Preload gallery images for instant switching
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
// AIRDROP FORM HANDLING - ENHANCED
// Better validation and user feedback
// ============================================
function initializeAirdropForm() {
    const form = document.getElementById('ember-claim-form');
    const messageBox = document.getElementById('ember-message-box');
    const submitBtn = document.getElementById('claim-submit-btn');
    
    if (!form) return;
    
    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const wallet = document.getElementById('claim-wallet').value.trim();
        const socialUrl = document.getElementById('claim-social-url').value.trim();
        const termsChecked = document.getElementById('claim-terms').checked;
        
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
        
        // Disable submit button during processing
        if (submitBtn) {
            submitBtn.disabled = true;
            submitBtn.textContent = 'Submitting...';
        }
        
        showMessage('info', '⏳ Submitting your claim...');
        
        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            showMessage('success', '🎉 Claim submitted successfully! Check your email for confirmation.');
            form.reset();
            document.getElementById('claim-terms').disabled = true;
            
        } catch (error) {
            showMessage('error', '❌ Failed to submit claim. Please try again.');
        } finally {
            // Re-enable submit button
            if (submitBtn) {
                submitBtn.disabled = false;
                submitBtn.innerHTML = '<div class="main-image-glow"><img src="images/VPEmberCoin.PNG" alt="Ember Coin" style="width: 24px; height: 24px; object-fit: contain;" loading="lazy"></div><span>Claim $Ember</span>';
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
            }, 5000);
        }
    }
    
    console.log('✅ Airdrop form initialized');
}

// ============================================
// CHECK CLAIM STATUS - ENHANCED
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
            const originalText = checkBtn.textContent;
            checkBtn.textContent = 'Checking...';
            checkBtn.disabled = true;
            
            // Simulate API call
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
// SHARE BUTTON HANDLERS - OPTIMIZED
// ============================================
function initializeShareButtons() {
    const shareConfig = {
        x: {
            btn: 'share-x-btn',
            handler: () => {
                const text = '🔥 Join me in the $Ember Airdrop! AR Crypto Gaming with GPS & Beacon technology. Get your FREE tokens now! #VaultPhoenix #Ember';
                const url = 'https://vaultphoenix.com/ember.html';
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
                const url = 'https://vaultphoenix.com/ember.html';
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
                const url = 'https://vaultphoenix.com/ember.html';
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
        if (btn) {
            btn.addEventListener('click', config.handler);
        }
    });
    
    console.log('✅ Share buttons initialized');
}

// ============================================
// COPY HASHTAGS FUNCTIONALITY - ULTIMATE VERSION
// Works on all devices including iOS
// ============================================
function initializeCopyHashtags() {
    const copyBtn = document.getElementById('copy-hashtags-btn');
    const copyBtnText = document.getElementById('copy-btn-text');
    const hashtagText = document.getElementById('hashtag-text-display');
    
    if (!copyBtn || !copyBtnText || !hashtagText) {
        console.warn('⚠️ Copy hashtags elements not found');
        return;
    }
    
    copyBtn.addEventListener('click', async function() {
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
        const originalHTML = copyBtn.innerHTML;
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

// ============================================
// AIRDROP PROGRESS TRACKER - ENHANCED
// Animated number counting
// ============================================
function initializeAirdropTracker() {
    const totalEmber = 16670000;
    const claimed = 0;
    const remaining = totalEmber - claimed;
    const people = 0;
    const maxPeople = 5000;
    const percentage = ((claimed / totalEmber) * 100).toFixed(2);
    
    const claimedEl = document.getElementById('ember-claimed');
    const remainingEl = document.getElementById('ember-remaining');
    const peopleEl = document.getElementById('ember-people-claimed');
    const progressBar = document.getElementById('ember-progress-bar');
    const progressPercentage = document.getElementById('ember-progress-percentage');
    
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

// ============================================
// EMBER TOKEN COUNTDOWN TIMER - ENHANCED
// More precise timing and better formatting
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
        
        // Smooth number updates with transition
        daysEl.textContent = String(days).padStart(2, '0');
        hoursEl.textContent = String(hours).padStart(2, '0');
        minutesEl.textContent = String(minutes).padStart(2, '0');
        secondsEl.textContent = String(seconds).padStart(2, '0');
    }
    
    // Initial update
    updateCountdown();
    
    // Update every second
    const countdownInterval = setInterval(updateCountdown, 1000);
    
    // Cleanup on page unload
    window.addEventListener('beforeunload', () => {
        clearInterval(countdownInterval);
    });
    
    console.log('✅ Countdown timer initialized');
}

// ============================================
// SMOOTH SCROLL FOR ANCHOR LINKS - ENHANCED
// Better offset calculation and smooth behavior
// ============================================
function initializeSmoothScroll() {
    // Use event delegation for better performance
    document.addEventListener('click', function(e) {
        const target = e.target.closest('a[href^="#"]');
        if (!target) return;
        
        const href = target.getAttribute('href');
        
        // Skip if href is just "#" - scroll to top
        if (href === '#') {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
            return;
        }
        
        const targetId = href.substring(1);
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
            e.preventDefault();
            
            const navbar = document.querySelector('.navbar');
            const navbarHeight = navbar ? navbar.offsetHeight : 0;
            const targetPosition = targetElement.offsetTop - navbarHeight - 20;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
            
            // Update URL without triggering scroll
            if (history.pushState) {
                history.pushState(null, null, href);
            }
        }
    });
    
    console.log('✅ Smooth scroll initialized');
}

// ============================================
// PERFORMANCE MONITORING - ENHANCED
// More detailed metrics and optimization tips
// ============================================
function monitorPerformance() {
    if (!('performance' in window)) return;
    
    window.addEventListener('load', () => {
        setTimeout(() => {
            const perfData = performance.getEntriesByType('navigation')[0];
            if (!perfData) return;
            
            const metrics = {
                dns: Math.round(perfData.domainLookupEnd - perfData.domainLookupStart),
                tcp: Math.round(perfData.connectEnd - perfData.connectStart),
                request: Math.round(perfData.responseStart - perfData.requestStart),
                response: Math.round(perfData.responseEnd - perfData.responseStart),
                domParse: Math.round(perfData.domContentLoadedEventStart - perfData.responseEnd),
                domReady: Math.round(perfData.domContentLoadedEventEnd - perfData.domContentLoadedEventStart),
                load: Math.round(perfData.loadEventEnd - perfData.loadEventStart),
                total: Math.round(perfData.loadEventEnd - perfData.fetchStart)
            };
            
            console.log('📊 Performance Metrics:');
            console.log(`   DNS Lookup: ${metrics.dns}ms`);
            console.log(`   TCP Connection: ${metrics.tcp}ms`);
            console.log(`   Request Time: ${metrics.request}ms`);
            console.log(`   Response Time: ${metrics.response}ms`);
            console.log(`   DOM Parse: ${metrics.domParse}ms`);
            console.log(`   DOM Ready: ${metrics.domReady}ms`);
            console.log(`   Page Load: ${metrics.load}ms`);
            console.log(`   ⭐ Total: ${metrics.total}ms`);
            
            // Performance recommendations
            if (metrics.total > 3000) {
                console.warn('⚠️ Slow page load detected. Consider optimizing images and reducing JavaScript.');
            } else if (metrics.total < 1000) {
                console.log('🚀 Excellent page load performance!');
            }
        }, 100);
    });
}

// ============================================
// TOUCH DEVICE DETECTION
// Add class for touch-specific styles
// ============================================
function detectTouchDevice() {
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    
    if (isTouch) {
        document.body.classList.add('touch-device');
        console.log('✅ Touch device detected');
    } else {
        document.body.classList.add('no-touch');
        console.log('✅ Non-touch device detected');
    }
    
    // Add hover support detection
    const hasHover = window.matchMedia('(hover: hover)').matches;
    if (hasHover) {
        document.body.classList.add('has-hover');
    }
}

// ============================================
// VIEWPORT HEIGHT FIX FOR MOBILE
// Fixes 100vh issues on mobile browsers
// ============================================
function fixMobileViewport() {
    function setViewportHeight() {
        const vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    }
    
    setViewportHeight();
    
    // Debounced resize handler
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(setViewportHeight, 100);
    });
    
    window.addEventListener('orientationchange', () => {
        setTimeout(setViewportHeight, 100);
    });
    
    console.log('✅ Mobile viewport height fixed');
}

// ============================================
// REDUCE MOTION FOR ACCESSIBILITY
// Respect user's motion preferences
// ============================================
function respectReducedMotion() {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (prefersReducedMotion) {
        document.body.classList.add('reduce-motion');
        console.log('✅ Reduced motion enabled for accessibility');
    }
}

// ============================================
// CONNECTION QUALITY DETECTION
// Adjust loading strategy based on connection
// ============================================
function detectConnectionQuality() {
    if ('connection' in navigator) {
        const connection = navigator.connection;
        const effectiveType = connection.effectiveType;
        
        console.log(`📡 Connection: ${effectiveType}`);
        
        if (effectiveType === 'slow-2g' || effectiveType === '2g') {
            document.body.classList.add('slow-connection');
            console.log('⚠️ Slow connection detected - optimizing loading');
        } else if (effectiveType === '4g') {
            document.body.classList.add('fast-connection');
            console.log('🚀 Fast connection detected');
        }
        
        // Listen for connection changes
        connection.addEventListener('change', () => {
            console.log(`📡 Connection changed to: ${connection.effectiveType}`);
        });
    }
}

// ============================================
// MASTER INITIALIZATION SEQUENCE
// Coordinated startup for butter-smooth experience
// ============================================
async function initializeMainPage() {
    console.log('🔥 Vault Phoenix - Main Page Initialization Starting...');
    console.log('⏱️  Start Time:', new Date().toISOString());
    
    // Phase 1: Immediate Setup (0ms)
    detectTouchDevice();
    fixMobileViewport();
    respectReducedMotion();
    detectConnectionQuality();
    restoreScrollPosition(); // Instant scroll restoration
    
    console.log('✅ Phase 1: Immediate setup complete');
    
    // Phase 2: Critical Resources (parallel loading)
    const startTime = performance.now();
    
    await Promise.all([
        preloadCriticalImages(),
        waitForFonts()
    ]);
    
    const resourcesTime = performance.now() - startTime;
    console.log(`✅ Phase 2: Critical resources loaded in ${Math.round(resourcesTime)}ms`);
    
    // Phase 3: Core Functionality
    initializeSmoothScroll();
    initializeScrollReveal();
    initializeImageLoading();
    
    console.log('✅ Phase 3: Core functionality initialized');
    
    // Phase 4: Feature Initialization (can be slightly delayed)
    requestAnimationFrame(() => {
        // Modals
        initializeTermsModal();
        initializeInfoModal();
        
        // Airdrop features
        initializeAirdropForm();
        initializeStatusChecker();
        initializeShareButtons();
        initializeCopyHashtags();
        initializeAirdropTracker();
        
        // Countdown timer
        initializeCountdownTimer();
        
        // Gallery preloading
        preloadGalleryImages();
        
        // Performance monitoring
        monitorPerformance();
        
        pageState.isReady = true;
        
        const totalTime = performance.now() - startTime;
        console.log(`✅ Phase 4: All features initialized in ${Math.round(totalTime)}ms`);
        console.log('🎉 Vault Phoenix Main Page - FULLY LOADED AND READY');
        console.log('⏱️  End Time:', new Date().toISOString());
        
        // Dispatch custom ready event
        window.dispatchEvent(new CustomEvent('vpMainPageReady', {
            detail: { loadTime: totalTime }
        }));
    });
}

// ============================================
// START EVERYTHING - OPTIMIZED ENTRY POINT
// ============================================
if (document.readyState === 'loading') {
    // DOM still loading
    document.addEventListener('DOMContentLoaded', function() {
        waitForGlobalReady(initializeMainPage);
    });
} else {
    // DOM already loaded
    waitForGlobalReady(initializeMainPage);
}

// Export for debugging
window.vaultPhoenixMainPage = {
    state: pageState,
    version: '2.0.0-butter-smooth'
};

})();
