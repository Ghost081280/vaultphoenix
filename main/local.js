// ============================================
// VAULT PHOENIX - MAIN.HTML LOCAL JAVASCRIPT
// v5.0 - PRODUCTION READY
// - Countdown handled by global.js (removed duplicate)
// - All optimizations in place
// - Professional & maintainable
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
            phoenix: 1.0,
            ember: 0.85,
            icon: 0.6,
            mobile: 0.4
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
    document.documentElement.style.cssText = `
        background: linear-gradient(135deg, #0d0c0c 0%, #1a0f0a 100%);
        opacity: 1;
    `;
    document.body.style.cssText = `
        background: linear-gradient(135deg, #0d0c0c 0%, #1a0f0a 100%);
        opacity: 1;
        transition: none;
    `;
    
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

preventFlash();

// ============================================
// BACK NAVIGATION DETECTION
// ============================================
const isBackNavigation = (performance.navigation && performance.navigation.type === 2) || 
                         (performance.getEntriesByType('navigation')[0]?.type === 'back_forward');

if (isBackNavigation) {
    console.log('⚠️ Back button detected - optimizing for cached content');
    document.body.classList.add('back-navigation');
}

// ============================================
// INTELLIGENT GLOW SYSTEM
// ============================================
const GlowSystem = {
    isMobile: /iPhone|iPad|iPod|Android/i.test(navigator.userAgent),
    applied: false,
    
    apply() {
        // CRITICAL: Skip if already applied (prevents blink on back button)
        if (this.applied || document.body.classList.contains('glow-applied')) {
            console.log('✓ Glow already applied - skipping to prevent blink');
            return;
        }
        
        const intensity = this.isMobile ? VaultPhoenix.config.glowIntensity.mobile : 1.0;
        
        this.applyPhoenixGlow(intensity);
        this.applyEmberGlow(intensity);
        this.applyIconGlow(intensity);
        
        this.applied = true;
        document.body.classList.add('glow-applied');
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
                if (wrapper && !wrapper.hasAttribute('data-glow-applied')) {
                    wrapper.style.filter = `
                        drop-shadow(0 0 ${25 * mult}px rgba(240, 165, 0, ${0.6 * mult}))
                        drop-shadow(0 0 ${50 * mult}px rgba(215, 51, 39, ${0.4 * mult}))
                    `;
                    wrapper.style.animation = 'phoenixGlowEnhanced 3s ease-in-out infinite';
                    wrapper.setAttribute('data-glow-applied', 'true');
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
                
                // CRITICAL: Skip button icons - they're handled by CSS
                const isButtonIcon = img.closest('.ember-highlight-link, .join-presale-button');
                
                if (wrapper && !isButtonIcon && !wrapper.hasAttribute('data-glow-applied')) {
                    wrapper.style.filter = `
                        drop-shadow(0 0 ${20 * mult}px rgba(240, 165, 0, ${0.5 * mult}))
                        drop-shadow(0 0 ${35 * mult}px rgba(215, 51, 39, ${0.3 * mult}))
                    `;
                    wrapper.style.animation = 'consistentGlow 3s ease-in-out infinite';
                    wrapper.setAttribute('data-glow-applied', 'true');
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
                if (wrapper && !wrapper.hasAttribute('data-glow-applied')) {
                    wrapper.style.filter = `
                        drop-shadow(0 0 ${15 * mult}px rgba(240, 165, 0, ${0.4 * mult}))
                        drop-shadow(0 0 ${25 * mult}px rgba(215, 51, 39, ${0.2 * mult}))
                    `;
                    wrapper.setAttribute('data-glow-applied', 'true');
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
        'images/PhoenixHoldingCoin.PNG',
        // Button icons
        'images/PhoenixWhitepaper.PNG',
        'images/EmberRoadmap.PNG',
        'images/PhoenixGoldTrophy.PNG',
        'images/VPEmberFlame.svg'
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
        this.revealAboveFold();
        this.setupObserver();
        mark('Scroll Reveal Initialized');
    },
    
    revealAboveFold() {
        const viewportHeight = window.innerHeight;
        const elements = document.querySelectorAll('.scroll-reveal');
        
        elements.forEach(el => {
            const rect = el.getBoundingClientRect();
            if (rect.top < viewportHeight * 0.8) {
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
                    
                    this.observer.unobserve(entry.target);
                }
            });
        }, options);
        
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
        
        this.loadImageSet(hero, 'hero');
        setTimeout(() => this.loadImageSet(aboveFold, 'above-fold'), 100);
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
// UNIFIED SMART TOUCH FOR ALL 5 BUTTONS
// ============================================
const SmartButtonTouch = {
    touchStartY: 0,
    touchStartTime: 0,
    
    init() {
        setTimeout(() => this.attachToButtons(), 500);
        setTimeout(() => this.attachToButtons(), 2000);
        mark('Smart Button Touch Initialized');
    },
    
    attachToButtons() {
        const emberButtons = document.querySelectorAll(
            '.ember-highlight-link, ' +
            '.join-presale-button, ' +
            '.join-presale-button-redesigned, ' +
            '.compliance-button, ' +
            'a[href*="ember.html#presale"], ' +
            'a[href*="ember.html#legal"], ' +
            'a[href*="ember.html#whitepaper"], ' +
            'a[href*="ember.html#roadmap"], ' +
            'a[href*="ember.html#team"]'
        );
        
        console.log(`📱 Attaching smart touch to ${emberButtons.length} buttons`);
        
        emberButtons.forEach((button, index) => {
            const href = button.getAttribute('href');
            console.log(`   Button ${index + 1}: ${href}`);
            
            if (button.hasAttribute('data-touch-attached')) return;
            
            const newButton = button.cloneNode(true);
            button.parentNode.replaceChild(newButton, button);
            
            newButton.addEventListener('touchstart', (e) => {
                this.touchStartY = e.touches[0].clientY;
                this.touchStartTime = Date.now();
            }, { passive: true });
            
            newButton.addEventListener('touchend', (e) => {
                const touchEndY = e.changedTouches[0].clientY;
                const touchDuration = Date.now() - this.touchStartTime;
                const touchDistance = Math.abs(touchEndY - this.touchStartY);
                
                if (touchDuration < 250 && touchDistance < 20) {
                    const targetHref = newButton.getAttribute('href');
                    if (targetHref) {
                        console.log(`✓ Valid tap - navigating to: ${targetHref}`);
                        window.location.href = targetHref;
                    }
                } else {
                    e.preventDefault();
                    e.stopPropagation();
                    console.log(`✗ Scroll detected (${touchDuration}ms, ${touchDistance}px)`);
                }
            }, { passive: false });
            
            newButton.addEventListener('click', (e) => {
                if (!('ontouchstart' in window)) return;
                e.preventDefault();
            });
            
            newButton.setAttribute('data-touch-attached', 'true');
        });
    }
};

// ============================================
// DEVICE OPTIMIZATIONS
// ============================================
const DeviceOptimizer = {
    init() {
        const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
        document.body.classList.toggle('touch-device', isTouch);
        document.body.classList.toggle('no-touch', !isTouch);
        
        const hasHover = window.matchMedia('(hover: hover)').matches;
        document.body.classList.toggle('has-hover', hasHover);
        
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (prefersReducedMotion) {
            document.body.classList.add('reduce-motion');
            VaultPhoenix.config.timings = {
                fadeIn: 0,
                stagger: 0,
                scrollReveal: 0,
                imageTransition: 0
            };
        }
        
        this.fixMobileViewport();
        
        if ('connection' in navigator) {
            const conn = navigator.connection;
            if (conn.effectiveType === 'slow-2g' || conn.effectiveType === '2g') {
                document.body.classList.add('slow-connection');
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
    console.log('🔥 VAULT PHOENIX v5.0 - PRODUCTION READY');
    console.log('━'.repeat(60));
    
    DeviceOptimizer.init();
    ScrollMemory.restore();
    
    await Promise.all([
        preloadCriticalAssets(),
        loadFonts()
    ]);
    
    requestAnimationFrame(() => {
        GlowSystem.apply();
        ScrollReveal.init();
        ImageLoader.init();
        SmartButtonTouch.init();
    });
    
    requestAnimationFrame(() => {
        preloadGalleryImages();
        monitorPerformance();
    });
    
    VaultPhoenix.state.isReady = true;
    
    const totalTime = performance.now() - VaultPhoenix.perf.startTime;
    console.log('━'.repeat(60));
    console.log(`🎉 FULLY LOADED in ${Math.round(totalTime)}ms`);
    console.log(`📊 Performance Rating: ${
        totalTime < 1000 ? '🚀 EXCELLENT' : 
        totalTime < 2000 ? '✅ GOOD' : 
        '⚠️ NEEDS OPTIMIZATION'
    }`);
    
    console.log('\n📈 Detailed Timings:');
    Object.entries(VaultPhoenix.perf.marks).forEach(([label, time]) => {
        console.log(`   ${label}: ${Math.round(time)}ms`);
    });
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
// EXPORT FOR DEBUGGING
// ============================================
window.VaultPhoenix = VaultPhoenix;
window.VaultPhoenix.version = '5.0.0-production';
window.VaultPhoenix.systems = {
    GlowSystem,
    ScrollReveal,
    ImageLoader,
    SmartButtonTouch
};

console.log('✓ Main.js v5.0 PRODUCTION READY - Countdown handled by global.js');

})();
