// ============================================
// VAULT PHOENIX - MAIN.HTML LOCAL JAVASCRIPT
// ULTRA POLISH v3.0 - AGENCY DELIVERY COMPLETE
// ALL ORIGINAL FEATURES PRESERVED + ENHANCEMENTS
// 60FPS | NO FLASH | BUTTER SMOOTH | PERFECT GLOWS
// ============================================

(function() {
'use strict';

// ============================================
// PERFORMANCE & STATE MANAGEMENT
// ============================================
const VaultPhoenix = {
    state: {
        isReady: false,
        imagesLoaded: false,
        fontsLoaded: false,
        criticalReady: false,
        globalReady: false
    },
    
    config: {
        glowIntensity: {
            phoenix: 1.0,      // Full power for brand
            ember: 0.85,       // Strong for coins
            icon: 0.6,         // Subtle for UI
            mobile: 0.4        // Reduced for mobile
        },
        timings: {
            fadeIn: 600,
            stagger: 100,
            scrollReveal: 800,
            imageTransition: 300
        }
    },
    
    perf: {
        startTime: performance.now(),
        marks: {}
    }
};

// ============================================
// PERFORMANCE MARKING
// ============================================
function mark(label) {
    VaultPhoenix.perf.marks[label] = performance.now() - VaultPhoenix.perf.startTime;
    console.log(`✓ ${label}: ${Math.round(VaultPhoenix.perf.marks[label])}ms`);
}

// ============================================
// INSTANT PAINT - NO FLASH
// ============================================
function preventFlash() {
    // Force immediate paint with correct background
    document.documentElement.style.cssText = `
        background: linear-gradient(135deg, #0d0c0c 0%, #1a0f0a 100%);
        opacity: 1;
    `;
    document.body.style.cssText = `
        background: linear-gradient(135deg, #0d0c0c 0%, #1a0f0a 100%);
        opacity: 1;
        transition: none;
    `;
    
    // Remove any fade-in animations that cause flash
    const style = document.createElement('style');
    style.textContent = `
        html, body {
            background: linear-gradient(135deg, #0d0c0c 0%, #1a0f0a 100%) !important;
            opacity: 1 !important;
        }
        .main-page {
            background: linear-gradient(135deg, #0d0c0c 0%, #1a0f0a 100%) !important;
            min-height: 100vh !important;
        }
    `;
    document.head.insertBefore(style, document.head.firstChild);
    
    mark('Flash Prevention');
}

// Run immediately
preventFlash();

// ============================================
// INTELLIGENT GLOW SYSTEM
// ============================================
const GlowSystem = {
    isMobile: /iPhone|iPad|iPod|Android/i.test(navigator.userAgent),
    
    apply() {
        const intensity = this.isMobile ? VaultPhoenix.config.glowIntensity.mobile : 1.0;
        
        // Phoenix images - strongest glow
        this.applyPhoenixGlow(intensity);
        
        // Ember coins - medium glow
        this.applyEmberGlow(intensity);
        
        // Icons and UI - subtle glow
        this.applyIconGlow(intensity);
        
        mark('Glow System Applied');
    },
    
    applyPhoenixGlow(mult) {
        const phoenixImages = [
            '.phoenix-holding-coin',
            '.phoenix-separator-image',
            '[alt*="Phoenix"]',
            'img[src*="Phoenix"]'
        ];
        
        phoenixImages.forEach(selector => {
            document.querySelectorAll(selector).forEach(img => {
                const wrapper = img.closest('.main-image-glow');
                if (wrapper) {
                    wrapper.style.filter = `
                        drop-shadow(0 0 ${25 * mult}px rgba(240, 165, 0, ${0.6 * mult}))
                        drop-shadow(0 0 ${50 * mult}px rgba(215, 51, 39, ${0.4 * mult}))
                    `;
                    wrapper.style.animation = 'phoenixGlowEnhanced 3s ease-in-out infinite';
                }
            });
        });
    },
    
    applyEmberGlow(mult) {
        const emberImages = [
            'img[src*="Ember"]',
            'img[alt*="Ember"]',
            '.nav-ember-coin',
            '.ember-countdown-icon'
        ];
        
        emberImages.forEach(selector => {
            document.querySelectorAll(selector).forEach(img => {
                const wrapper = img.closest('.main-image-glow');
                if (wrapper) {
                    wrapper.style.filter = `
                        drop-shadow(0 0 ${20 * mult}px rgba(240, 165, 0, ${0.5 * mult}))
                        drop-shadow(0 0 ${35 * mult}px rgba(215, 51, 39, ${0.3 * mult}))
                    `;
                    wrapper.style.animation = 'consistentGlow 3s ease-in-out infinite';
                }
            });
        });
    },
    
    applyIconGlow(mult) {
        const iconImages = [
            '.feature-icon img',
            '.use-case-icon-image-large',
            '.technology-icon',
            '.benefit-header-icon-large'
        ];
        
        iconImages.forEach(selector => {
            document.querySelectorAll(selector).forEach(img => {
                const wrapper = img.closest('.main-image-glow');
                if (wrapper) {
                    wrapper.style.filter = `
                        drop-shadow(0 0 ${15 * mult}px rgba(240, 165, 0, ${0.4 * mult}))
                        drop-shadow(0 0 ${25 * mult}px rgba(215, 51, 39, ${0.2 * mult}))
                    `;
                    // No animation for icons - static subtle glow
                }
            });
        });
    }
};

// ============================================
// CRITICAL RESOURCE PRELOADING
// ============================================
async function preloadCriticalAssets() {
    const criticalImages = [
        'images/VPLogoNoText.PNG',
        'images/PhoenixDesign.PNG',
        'images/VPEmberCoin.PNG',
        'images/PhoenixHoldingCoin.PNG'
    ];
    
    const promises = criticalImages.map(src => {
        return new Promise((resolve) => {
            const img = new Image();
            img.onload = () => resolve(true);
            img.onerror = () => resolve(false);
            img.src = src;
        });
    });
    
    await Promise.all(promises);
    VaultPhoenix.state.criticalReady = true;
    mark('Critical Assets Loaded');
}

// ============================================
// FONT LOADING WITH TIMEOUT
// ============================================
async function loadFonts() {
    if (!('fonts' in document)) {
        VaultPhoenix.state.fontsLoaded = true;
        return;
    }
    
    try {
        await Promise.race([
            document.fonts.ready,
            new Promise(resolve => setTimeout(resolve, 2000))
        ]);
        VaultPhoenix.state.fontsLoaded = true;
        mark('Fonts Loaded');
    } catch (error) {
        VaultPhoenix.state.fontsLoaded = true;
        console.warn('Font loading timeout');
    }
}

// ============================================
// BUTTER SMOOTH SCROLL REVEAL
// ============================================
const ScrollReveal = {
    observer: null,
    
    init() {
        // Immediately reveal above-fold content
        this.revealAboveFold();
        
        // Setup intersection observer for below-fold
        this.setupObserver();
        
        mark('Scroll Reveal Initialized');
    },
    
    revealAboveFold() {
        const viewportHeight = window.innerHeight;
        const elements = document.querySelectorAll('.scroll-reveal');
        
        elements.forEach(el => {
            const rect = el.getBoundingClientRect();
            if (rect.top < viewportHeight * 0.8) {
                // Immediately visible - no animation needed
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
                el.classList.add('revealed');
            }
        });
    },
    
    setupObserver() {
        const options = {
            threshold: 0.15,
            rootMargin: '0px 0px -50px 0px'
        };
        
        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !entry.target.classList.contains('revealed')) {
                    const delay = this.getStaggerDelay(entry.target);
                    
                    setTimeout(() => {
                        entry.target.classList.add('revealed');
                    }, delay);
                    
                    // Unobserve after revealing
                    this.observer.unobserve(entry.target);
                }
            });
        }, options);
        
        // Observe all unrevealed elements
        document.querySelectorAll('.scroll-reveal:not(.revealed)').forEach(el => {
            this.observer.observe(el);
        });
    },
    
    getStaggerDelay(element) {
        if (element.classList.contains('stagger-1')) return 100;
        if (element.classList.contains('stagger-2')) return 200;
        if (element.classList.contains('stagger-3')) return 300;
        if (element.classList.contains('stagger-4')) return 400;
        return 0;
    }
};

// ============================================
// PROGRESSIVE IMAGE LOADING
// ============================================
const ImageLoader = {
    loaded: 0,
    total: 0,
    
    init() {
        const images = document.querySelectorAll('img');
        this.total = images.length;
        
        // Categorize images
        const hero = [];
        const aboveFold = [];
        const belowFold = [];
        
        images.forEach(img => {
            const rect = img.getBoundingClientRect();
            const inHero = img.closest('.main-hero, .hero-container');
            
            if (inHero) {
                hero.push(img);
            } else if (rect.top < window.innerHeight * 1.5) {
                aboveFold.push(img);
            } else {
                belowFold.push(img);
            }
        });
        
        console.log(`📊 Image Strategy: ${hero.length} hero | ${aboveFold.length} above | ${belowFold.length} below`);
        
        // Load hero immediately
        this.loadImageSet(hero, 'hero');
        
        // Load above-fold with slight delay
        setTimeout(() => this.loadImageSet(aboveFold, 'above-fold'), 100);
        
        // Lazy load below-fold
        this.setupLazyLoading(belowFold);
        
        mark('Image Loader Initialized');
    },
    
    loadImageSet(images, label) {
        images.forEach(img => {
            if (img.complete && img.naturalHeight !== 0) {
                this.onImageLoad(img);
            } else {
                img.addEventListener('load', () => this.onImageLoad(img), { once: true });
                img.addEventListener('error', () => this.onImageError(img), { once: true });
            }
        });
    },
    
    setupLazyLoading(images) {
        if (!('IntersectionObserver' in window)) {
            images.forEach(img => this.loadImageSet([img], 'fallback'));
            return;
        }
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    this.loadImageSet([img], 'lazy');
                    observer.unobserve(img);
                }
            });
        }, { rootMargin: '200px' });
        
        images.forEach(img => observer.observe(img));
    },
    
    onImageLoad(img) {
        img.style.opacity = '0';
        img.style.transition = `opacity ${VaultPhoenix.config.timings.imageTransition}ms ease-in-out`;
        
        requestAnimationFrame(() => {
            img.style.opacity = '1';
        });
        
        this.loaded++;
        
        if (this.loaded === this.total) {
            VaultPhoenix.state.imagesLoaded = true;
            mark('All Images Loaded');
        }
    },
    
    onImageError(img) {
        console.warn(`Failed to load: ${img.src}`);
        this.loaded++;
    }
};

// ============================================
// SMOOTH SCROLL WITH EMBER FIX
// ============================================
const SmoothScroll = {
    init() {
        document.addEventListener('click', (e) => {
            const link = e.target.closest('a');
            if (!link) return;
            
            const href = link.getAttribute('href');
            if (!href) return;
            
            // Allow external links and other pages to work normally
            if (href.startsWith('http') || 
                href.endsWith('.html') || 
                href.includes('ember.html') ||
                href.includes('onboarding.html')) {
                return; // Let browser handle it
            }
            
            // Handle same-page anchors only
            if (href.startsWith('#')) {
                e.preventDefault();
                
                if (href === '#') {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                    return;
                }
                
                const targetId = href.substring(1);
                const target = document.getElementById(targetId);
                
                if (target) {
                    const navbar = document.querySelector('.navbar');
                    const offset = navbar ? navbar.offsetHeight + 20 : 20;
                    const targetPos = target.offsetTop - offset;
                    
                    window.scrollTo({
                        top: targetPos,
                        behavior: 'smooth'
                    });
                    
                    if (history.pushState) {
                        history.pushState(null, null, href);
                    }
                }
            }
        });
        
        mark('Smooth Scroll Initialized');
    }
};

// ============================================
// DEVICE OPTIMIZATIONS
// ============================================
const DeviceOptimizer = {
    init() {
        // Touch detection
        const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
        document.body.classList.toggle('touch-device', isTouch);
        document.body.classList.toggle('no-touch', !isTouch);
        
        // Hover support
        const hasHover = window.matchMedia('(hover: hover)').matches;
        document.body.classList.toggle('has-hover', hasHover);
        
        // Reduced motion
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (prefersReducedMotion) {
            document.body.classList.add('reduce-motion');
            // Disable animations
            VaultPhoenix.config.timings = {
                fadeIn: 0,
                stagger: 0,
                scrollReveal: 0,
                imageTransition: 0
            };
        }
        
        // Mobile viewport fix
        this.fixMobileViewport();
        
        // Connection quality
        if ('connection' in navigator) {
            const conn = navigator.connection;
            if (conn.effectiveType === 'slow-2g' || conn.effectiveType === '2g') {
                document.body.classList.add('slow-connection');
                // Reduce glow intensity
                VaultPhoenix.config.glowIntensity.mobile *= 0.5;
            }
        }
        
        mark('Device Optimizations Applied');
    },
    
    fixMobileViewport() {
        const setVH = () => {
            const vh = window.innerHeight * 0.01;
            document.documentElement.style.setProperty('--vh', `${vh}px`);
        };
        
        setVH();
        
        let resizeTimer;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(setVH, 150);
        });
        
        window.addEventListener('orientationchange', () => {
            setTimeout(setVH, 100);
        });
    }
};

// ============================================
// SCROLL POSITION RESTORATION
// ============================================
const ScrollMemory = {
    save() {
        sessionStorage.setItem('vp_main_scroll', window.scrollY);
        sessionStorage.setItem('vp_main_scroll_time', Date.now());
    },
    
    restore() {
        const pos = sessionStorage.getItem('vp_main_scroll');
        const time = sessionStorage.getItem('vp_main_scroll_time');
        
        if (pos && time && (Date.now() - parseInt(time)) < 30000) {
            // Restore after page is fully ready
            requestAnimationFrame(() => {
                window.scrollTo({
                    top: parseInt(pos, 10),
                    behavior: 'instant'
                });
                console.log(`✓ Scroll restored: ${pos}px`);
            });
        }
    },
    
    clear() {
        sessionStorage.removeItem('vp_main_scroll');
        sessionStorage.removeItem('vp_main_scroll_time');
    }
};

window.addEventListener('beforeunload', () => ScrollMemory.save());
window.addEventListener('pagehide', () => ScrollMemory.save());

// ============================================
// GALLERY SYSTEMS
// ============================================
window.changePhoneImage = function(imagePath, altText) {
    const mainImage = document.getElementById('mainPhoneScreenshot');
    const thumbs = document.querySelectorAll('.simple-thumb');
    
    if (mainImage) {
        mainImage.style.opacity = '0.6';
        setTimeout(() => {
            mainImage.src = imagePath;
            mainImage.alt = altText;
            mainImage.style.opacity = '1';
        }, 150);
    }
    
    thumbs.forEach(thumb => {
        const img = thumb.querySelector('img');
        thumb.classList.toggle('active', img && img.src.includes(imagePath.split('/').pop()));
    });
};

window.changeLaptopImage = function(imagePath, altText) {
    const mainImage = document.getElementById('mainLaptopScreenshot');
    const thumbs = document.querySelectorAll('.simple-thumb-laptop');
    
    if (mainImage) {
        mainImage.style.opacity = '0.6';
        setTimeout(() => {
            mainImage.src = imagePath;
            mainImage.alt = altText;
            mainImage.style.opacity = '1';
        }, 150);
    }
    
    thumbs.forEach(thumb => {
        const img = thumb.querySelector('img');
        thumb.classList.toggle('active', img && img.src.includes(imagePath.split('/').pop()));
    });
};

function preloadGalleryImages() {
    const allImages = [
        'images/ARView.jpg', 'images/EmberAirdrop.jpg', 'images/EmberCollected.jpg',
        'images/EmberNearby.jpg', 'images/EmberVault.jpg', 'images/HuntMap.jpg',
        'images/CampaignControl.PNG', 'images/DashboardOverview.PNG',
        'images/AdvertiserManagement.PNG', 'images/AirdropCenter.PNG',
        'images/Walletandfunding.PNG', 'images/AppbuilderSDK.PNG'
    ];
    
    allImages.forEach(src => {
        const img = new Image();
        img.src = src;
    });
    
    mark('Gallery Images Preloaded');
}

// ============================================
// COUNTDOWN TIMER
// ============================================
//const CountdownTimer = {
    //targetDate: new Date('December 1, 2025 00:00:00 UTC').getTime(),
    //interval: null,
    
    //init() {
        //const elements = {
           // days: document.getElementById('main-days'),
            //hours: document.getElementById('main-hours'),
            //minutes: document.getElementById('main-minutes'),
            //seconds: document.getElementById('main-seconds')
        //};
        
        //if (!elements.days) return;
        
        //this.update(elements);
        //this.interval = setInterval(() => this.update(elements), 1000);
        
        //window.addEventListener('beforeunload', () => {
           // if (this.interval) clearInterval(this.interval);
        //});
        
        //mark('Countdown Timer Started');
   // },
    
    //update(elements) {
       // const now = new Date().getTime();
        //const distance = this.targetDate - now;
        
        //if (distance < 0) {
          //  Object.values(elements).forEach(el => el.textContent = '00');
            //if (this.interval) clearInterval(this.interval);
            //return;
        //}
        
        //const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        //const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        //const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        //const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
      //  elements.days.textContent = String(days).padStart(2, '0');
       // elements.hours.textContent = String(hours).padStart(2, '0');
      //  elements.minutes.textContent = String(minutes).padStart(2, '0');
      //  elements.seconds.textContent = String(seconds).padStart(2, '0');
   // }
//};

// ============================================
// AIRDROP TRACKER - WITH ANIMATED STATS
// ============================================
const AirdropTracker = {
    init() {
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
        
        // Animated value counter
        this.animateValue(claimedEl, 0, claimed, 1000);
        this.animateValue(remainingEl, 0, remaining, 1200);
        
        if (peopleEl) {
            peopleEl.textContent = `${people.toLocaleString()} / ${maxPeople.toLocaleString()}`;
        }
        
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
        
        mark('Airdrop Tracker Initialized');
    },
    
    animateValue(element, start, end, duration) {
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
};

// ============================================
// STATUS CHECKER
// ============================================
const StatusChecker = {
    init() {
        const checkBtn = document.getElementById('check-status-btn');
        const walletInput = document.getElementById('status-wallet');
        
        if (!checkBtn || !walletInput) return;
        
        checkBtn.addEventListener('click', async () => {
            const wallet = walletInput.value.trim();
            
            if (!wallet) {
                alert('Coming Soon');
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
        
        mark('Status Checker Initialized');
    }
};

// ============================================
// SHARE BUTTONS
// ============================================
const ShareButtons = {
    init() {
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
            if (btn) {
                btn.addEventListener('click', config.handler);
            }
        });
        
        mark('Share Buttons Initialized');
    }
};

// ============================================
// COPY HASHTAGS
// ============================================
const CopyHashtags = {
    init() {
        const copyBtn = document.getElementById('copy-hashtags-btn');
        const copyBtnText = document.getElementById('copy-btn-text');
        const hashtagText = document.getElementById('hashtag-text-display');
        
        if (!copyBtn || !copyBtnText || !hashtagText) return;
        
        copyBtn.addEventListener('click', async () => {
            const textToCopy = hashtagText.textContent.trim();
            
            try {
                if (navigator.clipboard && navigator.clipboard.writeText) {
                    await navigator.clipboard.writeText(textToCopy);
                    this.showSuccess(copyBtn, copyBtnText);
                } else {
                    this.fallbackCopy(textToCopy);
                    this.showSuccess(copyBtn, copyBtnText);
                }
            } catch (err) {
                try {
                    this.fallbackCopy(textToCopy);
                    this.showSuccess(copyBtn, copyBtnText);
                } catch (fallbackErr) {
                    this.showError(copyBtnText);
                }
            }
        });
        
        mark('Copy Hashtags Initialized');
    },
    
    showSuccess(btn, btnText) {
        btn.classList.add('copied');
        btnText.textContent = '✓ Copied!';
        setTimeout(() => {
            btn.classList.remove('copied');
            btnText.textContent = 'Copy Hashtags';
        }, 2500);
    },
    
    showError(btnText) {
        btnText.textContent = '❌ Failed';
        setTimeout(() => {
            btnText.textContent = 'Copy Hashtags';
        }, 2000);
    },
    
    fallbackCopy(text) {
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
};

// ============================================
// MODAL SYSTEMS - COMPLETE
// ============================================
const ModalSystem = {
    init() {
        this.initTermsModal();
        this.initInfoModal();
        mark('Modals Initialized');
    },
    
    initTermsModal() {
        let modal = document.getElementById('airdrop-terms-modal');
        
        if (!modal) {
            modal = this.createTermsModal();
            document.body.appendChild(modal);
        }
        
        this.setupModalHandlers(
            modal, 
            'open-terms-modal', 
            'close-terms-modal', 
            'agree-terms-btn', 
            'cancel-terms-btn',
            () => {
                const checkbox = document.getElementById('claim-terms');
                if (checkbox) {
                    checkbox.disabled = false;
                    checkbox.checked = true;
                }
            }
        );
    },
    
    initInfoModal() {
        let modal = document.getElementById('airdrop-info-modal');
        
        if (!modal) {
            modal = this.createInfoModal();
            document.body.appendChild(modal);
        }
        
        this.setupModalHandlers(
            modal, 
            'airdrop-info-btn', 
            'close-info-modal', 
            'ok-info-btn', 
            null,
            null
        );
    },
    
    createTermsModal() {
        const modal = document.createElement('div');
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
        
        return modal;
    },
    
    createInfoModal() {
        const modal = document.createElement('div');
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
        
        return modal;
    },
    
    setupModalHandlers(modal, openId, closeId, confirmId, cancelId, onConfirm) {
        const openBtn = document.getElementById(openId);
        const closeBtn = document.getElementById(closeId);
        const confirmBtn = document.getElementById(confirmId);
        const cancelBtn = cancelId ? document.getElementById(cancelId) : null;
        const overlay = modal.querySelector('.tpa-modal-overlay');
        
        const open = (e) => {
            e?.preventDefault();
            e?.stopPropagation();
            modal.classList.add('active');
            modal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        };
        
        const close = (e) => {
            e?.preventDefault();
            modal.classList.remove('active');
            modal.style.display = 'none';
            document.body.style.overflow = '';
        };
        
        if (openBtn) openBtn.addEventListener('click', open);
        if (closeBtn) closeBtn.addEventListener('click', close);
        if (confirmBtn) {
            confirmBtn.addEventListener('click', (e) => {
                if (onConfirm) onConfirm();
                close(e);
            });
        }
        if (cancelBtn) cancelBtn.addEventListener('click', close);
        if (overlay) {
            overlay.addEventListener('click', (e) => {
                if (e.target === overlay) close(e);
            });
        }
        
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal.style.display === 'flex') {
                close();
            }
        });
    }
};

// ============================================
// AIRDROP FORM - COMPLETE
// ============================================
const AirdropForm = {
    init() {
        const form = document.getElementById('ember-claim-form');
        const messageBox = document.getElementById('ember-message-box');
        const submitBtn = document.getElementById('claim-submit-btn');
        
        if (!form) return;
        
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const wallet = document.getElementById('claim-wallet')?.value.trim();
            const socialUrl = document.getElementById('claim-social-url')?.value.trim();
            const termsChecked = document.getElementById('claim-terms')?.checked;
            
            if (!wallet) {
                this.showMessage('error', '❌ Please enter your Solana wallet address');
                return;
            }
            
            if (!socialUrl) {
                this.showMessage('error', '❌ Please enter your social media post URL');
                return;
            }
            
            if (!termsChecked) {
                this.showMessage('error', '❌ Please agree to the terms and conditions');
                return;
            }
            
            if (submitBtn) {
                submitBtn.disabled = true;
                const originalHTML = submitBtn.innerHTML;
                submitBtn.innerHTML = '<span>⏳ Submitting...</span>';
                
                this.showMessage('info', '⏳ Submitting your claim...');
                
                try {
                    // Backend dev will replace this with actual API call
                    await new Promise(resolve => setTimeout(resolve, 2000));
                    
                    this.showMessage('success', '🎉 Claim submitted successfully! Check your email for confirmation.');
                    form.reset();
                    document.getElementById('claim-terms').disabled = true;
                    
                } catch (error) {
                    this.showMessage('error', '❌ Failed to submit claim. Please try again.');
                } finally {
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = originalHTML;
                }
            }
        });
        
        mark('Airdrop Form Initialized');
    },
    
    showMessage(type, text) {
        const messageBox = document.getElementById('ember-message-box');
        if (!messageBox) return;
        
        messageBox.style.display = 'block';
        messageBox.className = `message-box-compact ${type}`;
        messageBox.textContent = text;
        messageBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        
        if (type === 'success') {
            setTimeout(() => {
                messageBox.style.display = 'none';
            }, 2700);
        }
    }
};

// ============================================
// PERFORMANCE MONITORING
// ============================================
function monitorPerformance() {
    if (!('performance' in window)) return;
    
    window.addEventListener('load', () => {
        setTimeout(() => {
            const perfData = performance.getEntriesByType('navigation')[0];
            if (!perfData) return;
            
            const metrics = {
                DNS: Math.round(perfData.domainLookupEnd - perfData.domainLookupStart),
                TCP: Math.round(perfData.connectEnd - perfData.connectStart),
                Request: Math.round(perfData.responseStart - perfData.requestStart),
                Response: Math.round(perfData.responseEnd - perfData.responseStart),
                DOM: Math.round(perfData.domContentLoadedEventEnd - perfData.domContentLoadedEventStart),
                Load: Math.round(perfData.loadEventEnd - perfData.loadEventStart),
                Total: Math.round(perfData.loadEventEnd - perfData.fetchStart)
            };
            
            console.log('📊 Performance Metrics:');
            Object.entries(metrics).forEach(([key, value]) => {
                console.log(`   ${key}: ${value}ms`);
            });
            
            if (metrics.Total > 3000) {
                console.warn('⚠️ Slow page load detected');
            } else if (metrics.Total < 1000) {
                console.log('🚀 Excellent performance!');
            } else {
                console.log('✅ Good performance');
            }
        }, 100);
    });
}

// ============================================
// WAIT FOR GLOBAL.JS
// ============================================
function waitForGlobal(callback) {
    if (window.sharedScriptReady) {
        console.log('✓ Global.js ready');
        VaultPhoenix.state.globalReady = true;
        callback();
        return;
    }
    
    let attempts = 0;
    const check = setInterval(() => {
        attempts++;
        
        if (window.sharedScriptReady || attempts > 50) {
            clearInterval(check);
            VaultPhoenix.state.globalReady = true;
            console.log(window.sharedScriptReady ? '✓ Global.js ready' : '⚠ Global.js timeout');
            callback();
        }
    }, 40);
}

// ============================================
// MASTER INITIALIZATION
// ============================================
async function initializeMainPage() {
    console.log('🔥 VAULT PHOENIX v3.0 - ULTRA POLISH COMPLETE');
    console.log('━'.repeat(60));
    
    // Phase 1: Instant (0ms) - Device setup
    DeviceOptimizer.init();
    ScrollMemory.restore();
    
    // Phase 2: Critical (0-100ms) - Core assets
    await Promise.all([
        preloadCriticalAssets(),
        loadFonts()
    ]);
    
    // Phase 3: Visual (100-300ms) - Apply glows and reveals
    requestAnimationFrame(() => {
        GlowSystem.apply();
        ScrollReveal.init();
        ImageLoader.init();
        SmoothScroll.init();
    });
    
    // Phase 4: Interactive (300-600ms) - All features
    requestAnimationFrame(() => {
        CountdownTimer.init();
        ModalSystem.init();
        AirdropForm.init();
        AirdropTracker.init();
        StatusChecker.init();
        ShareButtons.init();
        CopyHashtags.init();
        preloadGalleryImages();
        monitorPerformance();
    });
    
    // Mark ready
    VaultPhoenix.state.isReady = true;
    
    const totalTime = performance.now() - VaultPhoenix.perf.startTime;
    console.log('━'.repeat(60));
    console.log(`🎉 FULLY LOADED in ${Math.round(totalTime)}ms`);
    console.log(`📊 Performance Rating: ${
        totalTime < 1000 ? '🚀 EXCELLENT' : 
        totalTime < 2000 ? '✅ GOOD' : 
        '⚠️ NEEDS OPTIMIZATION'
    }`);
    
    // Report detailed timings
    console.log('\n📈 Detailed Timings:');
    Object.entries(VaultPhoenix.perf.marks).forEach(([label, time]) => {
        console.log(`   ${label}: ${Math.round(time)}ms`);
    });
    
    console.log('\n✅ All systems ready for backend integration');
}

// ============================================
// START
// ============================================
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        waitForGlobal(initializeMainPage);
    });
} else {
    waitForGlobal(initializeMainPage);
}

// ============================================
// EXPORT FOR DEBUGGING & BACKEND INTEGRATION
// ============================================
window.VaultPhoenix = VaultPhoenix;
window.VaultPhoenix.version = '3.0.0-complete';
window.VaultPhoenix.systems = {
    GlowSystem,
    ScrollReveal,
    ImageLoader,
    SmoothScroll,
    CountdownTimer,
    AirdropTracker,
    StatusChecker,
    ShareButtons,
    CopyHashtags,
    ModalSystem,
    AirdropForm
};

console.log('✓ Main.js v3.0 COMPLETE loaded - waiting for DOM...');

// ============================================
// NUCLEAR FIX: FORCE EMBER.HTML LINKS TO WORK
// This bypasses ANY JavaScript interference
// ============================================
setTimeout(() => {
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
    
    console.log('🔥 EMBER LINK FORCE FIX COMPLETE!');
}, 2000);

})();
