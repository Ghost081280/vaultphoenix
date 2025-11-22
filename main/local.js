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
            
            // ✅ SKIP ember-highlight-link - they have their own handler
            if (link.classList.contains('ember-highlight-link')) {
                return;
            }
            
            // ✅ EXPLICITLY ALLOW these to pass through naturally
            if (href.startsWith('http') || 
                href.endsWith('.html') || 
                href.includes('ember.html') ||
                href.includes('onboarding.html') ||
                href.startsWith('mailto:') ||
                href.startsWith('tel:')) {
                // Let browser handle it - don't prevent default
                return;
            }
            
            // ✅ ONLY handle same-page anchors
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
// ENTERPRISE TOKEN LINKS FIX
// Ensures ember.html links work properly
// ============================================
const EnterpriseTokenLinks = {
    init() {
        // Wait a bit for global.js to finish its setup
        setTimeout(() => {
            const emberLinks = document.querySelectorAll('.ember-highlight-link');
            
            console.log(`🔧 Fixing ${emberLinks.length} enterprise token links`);
            
            emberLinks.forEach((link, index) => {
                // Remove any existing handlers by cloning
                const newLink = link.cloneNode(true);
                link.parentNode.replaceChild(newLink, link);
                
                // Add clean click handler with highest priority (capture phase)
                newLink.addEventListener('click', function(e) {
                    e.stopImmediatePropagation(); // Stop ALL other handlers
                    
                    const href = this.getAttribute('href');
                    console.log(`✅ Enterprise link clicked: ${href}`);
                    
                    // Direct navigation
                    window.location.href = href;
                    
                    // Safety: prevent any bubbling
                    e.preventDefault();
                    return false;
                }, true); // TRUE = capture phase (fires first)
                
                console.log(`✅ Fixed link ${index + 1}: ${newLink.getAttribute('href')}`);
            });
            
            mark('Enterprise Token Links Fixed');
        }, 500); // Wait 500ms for global.js to settle
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
    
    // Phase 4: Interactive (300-600ms) - Gallery features + Enterprise links fix
    requestAnimationFrame(() => {
        EnterpriseTokenLinks.init(); // FIX EMBER LINKS
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
    EnterpriseTokenLinks
};

console.log('✓ Main.js v3.0 COMPLETE loaded - waiting for DOM...');

})();
