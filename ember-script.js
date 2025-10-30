// ============================================
// VAULT PHOENIX EMBER - INTERACTIVE JAVASCRIPT
// ============================================
// $EMBER Token Presale - Production Ready
// SENIOR JS ENGINEERING: Mobile-First, Performance-Optimized
// VERSION: 3.0 - Complete Namespace Pattern with Floating Coins
// ============================================

'use strict';

// ============================================
// VAULTPHOENIXEMBER NAMESPACE
// ============================================

const VaultPhoenixEmber = (function() {
    
    // ============================================
    // DEVICE DETECTION & PERFORMANCE
    // ============================================
    
    const DeviceInfo = {
        isMobile: /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),
        isIOS: /iPhone|iPad|iPod/i.test(navigator.userAgent),
        isAndroid: /Android/i.test(navigator.userAgent),
        isSafari: /^((?!chrome|android).)*safari/i.test(navigator.userAgent),
        supportsTouch: 'ontouchstart' in window || navigator.maxTouchPoints > 0,
        screenWidth: window.innerWidth,
        screenHeight: window.innerHeight,
        pixelRatio: window.devicePixelRatio || 1,
        prefersReducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches,
        
        isLowEndDevice() {
            const memory = navigator.deviceMemory || 4;
            const cores = navigator.hardwareConcurrency || 2;
            return memory < 4 || cores < 4 || this.isMobile;
        },
        
        getOptimalParticleCount() {
            if (this.prefersReducedMotion) return 0;
            if (this.screenWidth < 480) return 3;
            if (this.screenWidth < 768) return 4;
            if (this.isLowEndDevice()) return 4;
            return 6;
        }
    };
    
    // ============================================
    // DOM CACHING SYSTEM
    // ============================================
    
    const DOMCache = {
        cache: new Map(),
        
        get(selector, context = document) {
            const key = `${selector}:${context === document ? 'document' : 'context'}`;
            if (!this.cache.has(key)) {
                const element = safeQuery(selector, context);
                if (element) this.cache.set(key, element);
            }
            return this.cache.get(key) || null;
        },
        
        getAll(selector, context = document) {
            const key = `all:${selector}:${context === document ? 'document' : 'context'}`;
            if (!this.cache.has(key)) {
                const elements = safeQueryAll(selector, context);
                if (elements.length) this.cache.set(key, elements);
            }
            return this.cache.get(key) || [];
        },
        
        clear() {
            this.cache.clear();
        },
        
        remove(selector) {
            const keys = Array.from(this.cache.keys()).filter(k => k.includes(selector));
            keys.forEach(k => this.cache.delete(k));
        }
    };
    
    // ============================================
    // UTILITY FUNCTIONS
    // ============================================
    
    function safeQuery(selector, context = document) {
        try {
            return context.querySelector(selector);
        } catch (error) {
            console.warn(`Failed to query selector: ${selector}`, error);
            return null;
        }
    }
    
    function safeQueryAll(selector, context = document) {
        try {
            return Array.from(context.querySelectorAll(selector));
        } catch (error) {
            console.warn(`Failed to query selector: ${selector}`, error);
            return [];
        }
    }
    
    const requestAnimFrame = window.requestAnimationFrame || 
                             window.webkitRequestAnimationFrame || 
                             window.mozRequestAnimationFrame || 
                             function(callback) { setTimeout(callback, 1000 / 60); };
    
    // ============================================
    // FLOATING EMBER COINS SYSTEM
    // ============================================
    
    function createFloatingEmberCoins() {
        const sections = safeQueryAll('.ember-section, section');
        
        if (!sections.length) {
            console.warn('⚠️ No sections found for floating coins');
            return;
        }
        
        // Skip particles if user prefers reduced motion
        if (DeviceInfo.prefersReducedMotion) {
            console.log('⚠️ Reduced motion enabled - skipping floating coins');
            return;
        }
        
        console.log('🪙 Creating floating ember coins...');
        
        const particleCount = DeviceInfo.getOptimalParticleCount();
        
        // Different positions for each section type
        const positionSets = [
            // Set 1: Hero/Top sections
            [
                { top: '10%', left: '8%', delay: '0s', duration: '7s' },
                { top: '65%', left: '5%', delay: '1.5s', duration: '8s' },
                { top: '20%', right: '10%', delay: '2s', duration: '6s' },
                { top: '70%', right: '8%', delay: '3.5s', duration: '9s' }
            ],
            // Set 2: Middle sections
            [
                { top: '15%', left: '12%', delay: '0.5s', duration: '8s' },
                { top: '75%', left: '7%', delay: '2s', duration: '7s' },
                { top: '25%', right: '15%', delay: '1s', duration: '9s' },
                { top: '60%', right: '12%', delay: '3s', duration: '6s' }
            ],
            // Set 3: Lower sections
            [
                { top: '12%', left: '10%', delay: '1s', duration: '6s' },
                { top: '68%', left: '6%', delay: '2.5s', duration: '8s' },
                { top: '18%', right: '13%', delay: '0s', duration: '7s' },
                { top: '72%', right: '9%', delay: '4s', duration: '9s' }
            ]
        ];
        
        sections.forEach((section, sectionIndex) => {
            // Skip if section already has coins
            if (section.querySelector('.ember-floating-coins')) {
                return;
            }
            
            const floatingCoins = document.createElement('div');
            floatingCoins.className = 'ember-floating-coins';
            floatingCoins.style.cssText = `
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                pointer-events: none;
                z-index: 1;
                overflow: hidden;
            `;
            
            // Make section position relative if it's not already positioned
            const sectionPosition = window.getComputedStyle(section).position;
            if (sectionPosition === 'static') {
                section.style.position = 'relative';
            }
            
            // Select position set based on section index
            const positionSet = positionSets[sectionIndex % positionSets.length];
            const positions = positionSet.slice(0, particleCount);
            
            positions.forEach((pos, index) => {
                const coin = document.createElement('div');
                coin.className = `ember-coin ember-coin-${index + 1}`;
                
                const coinImg = document.createElement('img');
                coinImg.src = 'images/VPEmberCoin.PNG';
                coinImg.alt = '$Ember Coin';
                coinImg.className = 'ember-crypto-coin-icon';
                coinImg.loading = 'lazy';
                
                // Mobile-optimized sizing
                const size = DeviceInfo.isMobile ? 'clamp(18px, 4vw, 32px)' : 'clamp(32px, 4.5vw, 45px)';
                const opacity = DeviceInfo.isMobile ? '0.45' : '0.65';
                
                coinImg.style.cssText = `
                    width: ${size};
                    height: ${size};
                    object-fit: contain;
                    filter: drop-shadow(0 0 10px rgba(240, 165, 0, 0.7));
                    opacity: ${opacity};
                    border-radius: 50%;
                    will-change: transform;
                `;
                
                coinImg.onerror = function() {
                    console.warn('⚠️ Ember coin image failed, using emoji fallback');
                    const fallback = document.createElement('div');
                    fallback.innerHTML = '🪙';
                    fallback.style.cssText = `
                        font-size: ${size};
                        filter: drop-shadow(0 0 10px rgba(240, 165, 0, 0.7));
                    `;
                    coin.appendChild(fallback);
                };
                
                coin.appendChild(coinImg);
                
                coin.style.cssText = `
                    position: absolute;
                    animation: emberCoinFloat ${pos.duration} ease-in-out infinite;
                    animation-delay: ${pos.delay};
                    z-index: 1;
                    pointer-events: none;
                    ${pos.top ? `top: ${pos.top};` : ''}
                    ${pos.bottom ? `bottom: ${pos.bottom};` : ''}
                    ${pos.left ? `left: ${pos.left};` : ''}
                    ${pos.right ? `right: ${pos.right};` : ''}
                `;
                
                floatingCoins.appendChild(coin);
            });
            
            section.insertBefore(floatingCoins, section.firstChild);
        });
        
        // Add animation CSS if not present
        if (!document.querySelector('#emberCoinFloatAnimation')) {
            const style = document.createElement('style');
            style.id = 'emberCoinFloatAnimation';
            style.textContent = `
                @keyframes emberCoinFloat {
                    0%, 100% { 
                        transform: translateY(0px) rotate(0deg) scale(1); 
                    }
                    25% { 
                        transform: translateY(-22px) rotate(90deg) scale(1.12); 
                    }
                    50% { 
                        transform: translateY(-12px) rotate(180deg) scale(0.92); 
                    }
                    75% { 
                        transform: translateY(-28px) rotate(270deg) scale(1.18); 
                    }
                }
                
                @media (prefers-reduced-motion: reduce) {
                    .ember-coin {
                        animation: none !important;
                    }
                }
                
                @media (max-width: 768px) {
                    @keyframes emberCoinFloat {
                        0%, 100% { 
                            transform: translateY(0px) rotate(0deg) scale(1); 
                        }
                        25% { 
                            transform: translateY(-15px) rotate(90deg) scale(1.08); 
                        }
                        50% { 
                            transform: translateY(-8px) rotate(180deg) scale(0.95); 
                        }
                        75% { 
                            transform: translateY(-18px) rotate(270deg) scale(1.1); 
                        }
                    }
                }
            `;
            document.head.appendChild(style);
        }
        
        console.log(`🪙 Floating ember coins created in ${sections.length} sections with ${particleCount} coins each`);
    }
    
    // ============================================
    // SCROLL REVEAL OBSERVER
    // ============================================
    
    function initializeScrollReveal() {
        const revealElements = safeQueryAll('.scroll-reveal, .main-fade-in, .module-card, .allocation-module');
        
        if (!revealElements.length) {
            console.log('📜 No scroll reveal elements found');
            return;
        }
        
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.style.willChange = 'transform, opacity';
                        entry.target.classList.add('revealed');
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                        
                        // Remove will-change after animation
                        setTimeout(() => {
                            entry.target.style.willChange = 'auto';
                        }, 600);
                    }, index * 100);
                    
                    revealObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.15,
            rootMargin: '0px 0px -50px 0px'
        });
        
        revealElements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            revealObserver.observe(el);
        });
        
        console.log(`📜 Scroll reveal initialized for ${revealElements.length} elements`);
    }
    
    // ============================================
    // IMAGE OPTIMIZATION
    // ============================================
    
    function optimizeImageLoading() {
        const images = safeQueryAll('img');
        
        images.forEach(img => {
            // Add will-change for images that will animate
            if (img.closest('.scroll-reveal') || img.closest('.main-image-glow')) {
                img.style.willChange = 'opacity';
            }
            
            // Handle image loading
            if (!img.complete) {
                img.style.opacity = '0';
                
                img.addEventListener('load', function() {
                    requestAnimFrame(() => {
                        this.style.transition = 'opacity 0.3s ease-in-out';
                        this.style.opacity = '1';
                        
                        // Remove will-change after load
                        setTimeout(() => {
                            this.style.willChange = 'auto';
                        }, 300);
                    });
                }, { once: true });
            }
            
            // Handle errors
            img.addEventListener('error', function() {
                console.warn('⚠️ Image failed to load:', this.src);
                this.style.opacity = '0.5';
                this.alt = 'Image loading...';
            }, { once: true });
        });
        
        console.log(`🖼️ Image loading optimized for ${images.length} images`);
    }
    
    // ============================================
    // CARD INTERACTION EFFECTS
    // ============================================
    
    function initializeCardEffects() {
        // Skip hover effects on touch devices
        if (DeviceInfo.supportsTouch && DeviceInfo.isMobile) {
            console.log('🎴 Skipping hover effects for touch device');
            return;
        }
        
        const cards = safeQueryAll('.module-card, .allocation-module, .presale-module, .ember-highlight, .crypto-benefit');
        
        cards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.willChange = 'transform, box-shadow';
                this.style.transform = 'translateY(-8px) scale(1.02)';
                this.style.boxShadow = '0 25px 60px rgba(215, 51, 39, 0.3)';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = '';
                this.style.boxShadow = '';
                
                // Remove will-change after animation
                setTimeout(() => {
                    this.style.willChange = 'auto';
                }, 300);
            });
        });
        
        console.log(`🎴 Card effects initialized for ${cards.length} cards`);
    }
    
    // ============================================
    // GLOW IMAGE INTERACTIONS
    // ============================================
    
    function initializeGlowImages() {
        // Skip hover effects on mobile
        if (DeviceInfo.isMobile) return;
        
        const glowImages = safeQueryAll('.main-image-glow');
        
        glowImages.forEach(glowWrapper => {
            glowWrapper.addEventListener('mouseenter', function() {
                const img = this.querySelector('img');
                if (img) {
                    img.style.willChange = 'filter, transform';
                    img.style.filter = 'brightness(1.15) saturate(1.1)';
                    img.style.transform = 'scale(1.05)';
                }
            });
            
            glowWrapper.addEventListener('mouseleave', function() {
                const img = this.querySelector('img');
                if (img) {
                    img.style.filter = '';
                    img.style.transform = '';
                    
                    setTimeout(() => {
                        img.style.willChange = 'auto';
                    }, 300);
                }
            });
        });
        
        console.log(`✨ Glow image interactions initialized for ${glowImages.length} images`);
    }
    
    // ============================================
    // SCROLL PROGRESS INDICATOR
    // ============================================
    
    function createScrollProgressIndicator() {
        const indicator = document.createElement('div');
        indicator.className = 'ember-scroll-progress';
        indicator.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            height: 3px;
            background: linear-gradient(90deg, #d73327, #fb923c, #f0a500);
            z-index: 9999;
            width: 0%;
            transition: width 0.1s ease;
            box-shadow: 0 2px 5px rgba(215, 51, 39, 0.3);
            will-change: width;
        `;
        document.body.appendChild(indicator);
        
        const updateProgress = window.throttle ? window.throttle(() => {
            const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
            const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrolled = (winScroll / height) * 100;
            indicator.style.width = scrolled + '%';
        }, 50) : function() {
            const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
            const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrolled = (winScroll / height) * 100;
            indicator.style.width = scrolled + '%';
        };
        
        window.addEventListener('scroll', updateProgress, { passive: true });
        
        console.log('📊 Scroll progress indicator created');
    }
    
    // ============================================
    // CTA BUTTON ENHANCEMENTS
    // ============================================
    
    function enhanceCTAButtons() {
        const ctaButtons = safeQueryAll('.cta-button, .join-presale-button, .ember-cta-primary, .ember-cta-secondary');
        
        ctaButtons.forEach(button => {
            // Skip effects on mobile or reduced motion
            if (DeviceInfo.isMobile || DeviceInfo.prefersReducedMotion) return;
            
            button.addEventListener('mouseenter', function() {
                this.style.willChange = 'filter, transform';
                this.style.filter = 'brightness(1.15) saturate(1.2)';
            });
            
            button.addEventListener('mouseleave', function() {
                this.style.filter = '';
                setTimeout(() => {
                    this.style.willChange = 'auto';
                }, 300);
            });
            
            button.addEventListener('mousedown', function() {
                this.style.transform = 'scale(0.96)';
            });
            
            button.addEventListener('mouseup', function() {
                this.style.transform = '';
            });
        });
        
        console.log(`✨ CTA enhancements applied to ${ctaButtons.length} buttons`);
    }
    
    // ============================================
    // MOBILE OPTIMIZATIONS
    // ============================================
    
    function optimizeMobilePerformance() {
        if (!DeviceInfo.isMobile) return;
        
        console.log('📱 Applying mobile optimizations...');
        
        // Disable hover effects on touch devices
        document.body.classList.add('touch-device');
        
        // Optimize scroll performance
        const scrollElements = safeQueryAll('.allocation-cards-mobile, .module-grid');
        scrollElements.forEach(el => {
            el.style.webkitOverflowScrolling = 'touch';
            el.style.overscrollBehavior = 'contain';
        });
        
        // Reduce animation complexity for low-end devices
        if (DeviceInfo.isLowEndDevice()) {
            document.body.classList.add('low-end-device');
            console.log('📱 Low-end device optimizations applied');
        }
        
        // Handle orientation changes
        window.addEventListener('orientationchange', window.debounce ? window.debounce(() => {
            console.log('📱 Orientation changed');
            DeviceInfo.screenWidth = window.innerWidth;
            DeviceInfo.screenHeight = window.innerHeight;
            
            // Recreate floating coins with updated positions
            const existingCoins = safeQueryAll('.ember-floating-coins');
            existingCoins.forEach(el => el.remove());
            createFloatingEmberCoins();
        }, 300) : function() {
            console.log('📱 Orientation changed');
            DeviceInfo.screenWidth = window.innerWidth;
            DeviceInfo.screenHeight = window.innerHeight;
        });
        
        console.log('📱 Mobile optimizations complete');
    }
    
    // ============================================
    // VIEWPORT & ZOOM STABILITY
    // ============================================
    
    let lastWidth = window.innerWidth;
    let lastHeight = window.innerHeight;
    
    function handleResize() {
        const newWidth = window.innerWidth;
        const newHeight = window.innerHeight;
        
        // Check if this is a zoom event
        const isZoom = Math.abs(newWidth - lastWidth) < 5 && Math.abs(newHeight - lastHeight) < 5;
        
        if (!isZoom) {
            DeviceInfo.screenWidth = newWidth;
            DeviceInfo.screenHeight = newHeight;
            console.log('📐 Window resized:', DeviceInfo.screenWidth, 'x', DeviceInfo.screenHeight);
        }
        
        lastWidth = newWidth;
        lastHeight = newHeight;
    }
    
    const throttledResize = window.throttle ? window.throttle(handleResize, 250) : handleResize;
    window.addEventListener('resize', throttledResize);
    
    // ============================================
    // STATS ANIMATION
    // ============================================
    
    function initializeStatsAnimation() {
        const stats = safeQueryAll('.stat-number, .token-stat-value, .presale-stat-number');
        
        if (!stats.length) return;
        
        const statsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateStatValue(entry.target);
                    statsObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        stats.forEach(stat => statsObserver.observe(stat));
        
        console.log(`📊 Stats animation initialized for ${stats.length} stats`);
    }
    
    function animateStatValue(stat) {
        const finalValue = stat.textContent;
        const numericValue = parseFloat(finalValue.replace(/[^\d.]/g, ''));
        
        if (numericValue && numericValue > 0) {
            let currentValue = 0;
            const duration = 2000;
            const increment = numericValue / (duration / 50);
            
            const timer = setInterval(() => {
                currentValue += increment;
                if (currentValue >= numericValue) {
                    stat.textContent = finalValue;
                    clearInterval(timer);
                } else {
                    const displayValue = Math.floor(currentValue * 10) / 10;
                    const suffix = finalValue.replace(/[\d.,]/g, '');
                    if (finalValue.includes('.')) {
                        stat.textContent = displayValue.toFixed(1) + suffix;
                    } else {
                        stat.textContent = Math.floor(displayValue).toLocaleString() + suffix;
                    }
                }
            }, 50);
        }
    }
    
    // ============================================
    // PAGE INITIALIZATION
    // ============================================
    
    function initializePage() {
        console.log('🔥🪙 Vault Phoenix Ember initializing (v3.0 - Namespace Pattern)...');
        
        // Ensure dark background
        document.body.style.background = 'linear-gradient(135deg, #0f0f0f 0%, #1a1a1a 25%, #2d1810 50%, #451a03 75%, #7c2d12 100%)';
        document.body.style.backgroundAttachment = 'fixed';
        document.body.style.opacity = '1';
        document.body.classList.add('loaded');
        
        // Log device info
        console.log('📱 Device:', {
            mobile: DeviceInfo.isMobile,
            width: DeviceInfo.screenWidth,
            touch: DeviceInfo.supportsTouch,
            reducedMotion: DeviceInfo.prefersReducedMotion
        });
        
        // Initialize all features
        createFloatingEmberCoins();
        initializeScrollReveal();
        initializeCardEffects();
        initializeGlowImages();
        createScrollProgressIndicator();
        enhanceCTAButtons();
        initializeStatsAnimation();
        
        // Mobile-specific optimizations
        if (DeviceInfo.isMobile) {
            optimizeMobilePerformance();
        }
        
        console.log('🔥🪙 Vault Phoenix Ember initialized successfully!');
        console.log('✅ Using shared-script.js for: smooth scrolling, countdown timer, mobile menu, navbar transitions, chatbot');
    }
    
    function onWindowLoad() {
        console.log('🔥🪙 Vault Phoenix Ember fully loaded!');
        
        // Optimize image loading after page load
        optimizeImageLoading();
        
        // Add ember glow effect to logo
        const logoIcon = DOMCache.get('.logo-icon');
        if (logoIcon) {
            logoIcon.style.filter = 'drop-shadow(0 0 15px rgba(240, 165, 0, 0.8))';
        }
        
        // Performance monitoring
        setTimeout(() => {
            const floatingCoins = DOMCache.get('.ember-floating-coins');
            if (floatingCoins) {
                console.log('✅ Floating ember coins active');
            }
            
            const moduleCards = DOMCache.getAll('.module-card');
            console.log(`✅ ${moduleCards.length} module cards loaded`);
        }, 500);
        
        // Performance timing
        const loadTime = performance.now();
        console.log(`%c🔥 Ember page loaded in ${Math.round(loadTime)}ms`, 'color: #22c55e; font-weight: bold;');
    }
    
    function cleanup() {
        DOMCache.clear();
        console.log('🧹 Ember cleanup complete');
    }
    
    // ============================================
    // EVENT LISTENERS
    // ============================================
    
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initializePage);
    } else {
        initializePage();
    }
    
    window.addEventListener('load', onWindowLoad);
    window.addEventListener('beforeunload', cleanup);
    
    // ============================================
    // PUBLIC API
    // ============================================
    
    return {
        DeviceInfo: DeviceInfo,
        safeQuery: safeQuery,
        safeQueryAll: safeQueryAll,
        DOMCache: DOMCache
    };
    
})();

// ============================================
// CONSOLE MESSAGES
// ============================================

console.log('%c🔥 VAULT PHOENIX EMBER', 'color: #d73327; font-size: 24px; font-weight: bold;');
console.log('%c$EMBER Token - Presale Edition', 'color: #fb923c; font-size: 16px; font-weight: bold;');
console.log('%c📧 contact@vaultphoenix.com', 'color: #374151; font-size: 12px;');
console.log('%c💡 Senior Engineering - Mobile-First Architecture v3.0', 'color: #22c55e; font-size: 12px; font-weight: bold;');
console.log('%c✅ Namespace Pattern with Complete Feature Set', 'color: #3b82f6; font-size: 12px; font-weight: bold;');
