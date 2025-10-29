// ============================================
// VAULT PHOENIX - INTERACTIVE JAVASCRIPT
// ============================================
// Phoenix Rising from Digital Ashes - Crypto Gaming Edition
// SENIOR JS ENGINEERING: Mobile-First, Performance-Optimized
// PRODUCTION READY: Clean, maintainable, and scalable code
// VERSION: 4.0 - Optimized (Conflicts resolved, performance enhanced)
// ============================================

'use strict';

// ============================================
// NAMESPACE - Prevent Global Scope Pollution
// ============================================

const VaultPhoenix = (function() {
    
    // ============================================
    // DEVICE DETECTION & PERFORMANCE
    // ============================================
    
    /**
     * Device information and capabilities
     * Centralized device detection for consistent behavior
     */
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
        
        /**
         * Check if device is low-end for performance optimization
         * @returns {boolean} True if device should use performance mode
         */
        isLowEndDevice() {
            const memory = navigator.deviceMemory || 4;
            const cores = navigator.hardwareConcurrency || 2;
            return memory < 4 || cores < 4 || this.isMobile;
        },
        
        /**
         * Get optimal particle count based on device capabilities
         * @returns {number} Number of particles to render
         */
        getOptimalParticleCount() {
            if (this.prefersReducedMotion) return 0;
            if (this.screenWidth < 480) return 3;
            if (this.screenWidth < 768) return 4;
            if (this.isLowEndDevice()) return 4;
            return 6;
        }
    };
    
    // ============================================
    // DOM CACHE - Performance Optimization
    // ============================================
    
    /**
     * Cached DOM elements for performance
     * Prevents repeated querySelector calls
     */
    const DOMCache = {
        hero: null,
        mainScreenshot: null,
        mainLaptopScreenshot: null,
        logoIcon: null,
        scrollProgress: null,
        floatingCoins: null,
        
        /**
         * Initialize DOM cache
         * Should be called after DOM is ready
         */
        init() {
            this.hero = safeQuery('.hero');
            this.mainScreenshot = safeQuery('#mainScreenshot');
            this.mainLaptopScreenshot = safeQuery('#mainLaptopScreenshot');
            this.logoIcon = safeQuery('.logo-icon');
            this.scrollProgress = safeQuery('.phoenix-scroll-progress');
            
            console.log('💾 DOM cache initialized');
        },
        
        /**
         * Clear cache (useful for cleanup)
         */
        clear() {
            Object.keys(this).forEach(key => {
                if (typeof this[key] !== 'function') {
                    this[key] = null;
                }
            });
        }
    };
    
    // ============================================
    // UTILITY FUNCTIONS
    // ============================================
    
    /**
     * Safely query DOM element with error handling
     * @param {string} selector - CSS selector
     * @param {Element} context - Context element (default: document)
     * @returns {Element|null} Found element or null
     */
    function safeQuery(selector, context = document) {
        try {
            return context.querySelector(selector);
        } catch (error) {
            console.warn(`Failed to query selector: ${selector}`, error);
            return null;
        }
    }
    
    /**
     * Safely query all DOM elements with error handling
     * @param {string} selector - CSS selector
     * @param {Element} context - Context element (default: document)
     * @returns {Array} Array of found elements
     */
    function safeQueryAll(selector, context = document) {
        try {
            return Array.from(context.querySelectorAll(selector));
        } catch (error) {
            console.warn(`Failed to query selector: ${selector}`, error);
            return [];
        }
    }
    
    /**
     * Request animation frame with fallback
     * @param {Function} callback - Animation callback
     * @returns {number} Animation frame ID
     */
    const requestAnimFrame = window.requestAnimationFrame || 
                             window.webkitRequestAnimationFrame || 
                             window.mozRequestAnimationFrame || 
                             function(callback) { return setTimeout(callback, 1000 / 60); };
    
    /**
     * Throttle function execution
     * @param {Function} func - Function to throttle
     * @param {number} limit - Time limit in ms
     * @returns {Function} Throttled function
     */
    function throttle(func, limit) {
        let inThrottle;
        return function(...args) {
            if (!inThrottle) {
                func.apply(this, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }
    
    /**
     * Debounce function execution
     * @param {Function} func - Function to debounce
     * @param {number} wait - Wait time in ms
     * @returns {Function} Debounced function
     */
    function debounce(func, wait) {
        let timeout;
        return function(...args) {
            clearTimeout(timeout);
            timeout = setTimeout(() => func.apply(this, args), wait);
        };
    }
    
    /**
     * Add will-change property before animation
     * @param {Element} element - Element to optimize
     * @param {string} properties - CSS properties to optimize
     * @param {number} duration - Animation duration in ms
     */
    function optimizeAnimation(element, properties, duration = 300) {
        if (!element) return;
        
        element.style.willChange = properties;
        
        setTimeout(() => {
            element.style.willChange = 'auto';
        }, duration);
    }
    
    // ============================================
    // VIEWPORT & ZOOM STABILITY
    // ============================================
    
    let lastWidth = window.innerWidth;
    let lastHeight = window.innerHeight;
    let lastZoom = window.devicePixelRatio;
    
    /**
     * Handle window resize events (throttled)
     */
    const handleResize = throttle(() => {
        const newWidth = window.innerWidth;
        const newHeight = window.innerHeight;
        
        // Check if this is a zoom event (viewport doesn't change proportionally)
        const isZoom = Math.abs(newWidth - lastWidth) < 5 && Math.abs(newHeight - lastHeight) < 5;
        
        if (!isZoom) {
            DeviceInfo.screenWidth = newWidth;
            DeviceInfo.screenHeight = newHeight;
            console.log('📐 Window resized:', DeviceInfo.screenWidth, 'x', DeviceInfo.screenHeight);
        }
        
        lastWidth = newWidth;
        lastHeight = newHeight;
    }, 250);
    
    /**
     * Detect and handle zoom events specifically
     */
    const handleZoom = throttle(() => {
        const currentZoom = window.devicePixelRatio;
        
        if (Math.abs(currentZoom - lastZoom) > 0.1) {
            console.log('🔍 Zoom detected:', currentZoom);
            
            // Stabilize layout during zoom
            document.body.style.transition = 'none';
            requestAnimFrame(() => {
                document.body.style.transition = '';
            });
        }
        
        lastZoom = currentZoom;
    }, 100);
    
    /**
     * Initialize viewport and zoom handlers
     */
    function initializeViewportHandlers() {
        window.addEventListener('resize', handleResize, { passive: true });
        
        // Monitor zoom via visualViewport if available
        if ('visualViewport' in window) {
            window.visualViewport.addEventListener('resize', handleZoom, { passive: true });
        } else {
            window.addEventListener('resize', handleZoom, { passive: true });
        }
        
        console.log('📐 Viewport handlers initialized');
    }
    
    // ============================================
    // MOBILE ALLOCATION CARDS
    // ============================================
    
    /**
     * Token allocation data structure
     */
    const tokenAllocations = [
        {
            category: 'Public Presale',
            percentage: '50%',
            tokens: '83.35M',
            price: '$0.003',
            vesting: 'No lock-up',
            note: 'Available to all investors during presale'
        },
        {
            category: 'Ecosystem Development',
            percentage: '20%',
            tokens: '33.34M',
            price: 'Reserved',
            vesting: '24 months',
            note: 'Platform growth, partnerships, integrations'
        },
        {
            category: 'Team & Advisors',
            percentage: '15%',
            tokens: '25M',
            price: 'Reserved',
            vesting: '12 months',
            note: '6-month cliff, 18-month linear vesting'
        },
        {
            category: 'Marketing & Partnerships',
            percentage: '10%',
            tokens: '16.67M',
            price: 'Reserved',
            vesting: '18 months',
            note: 'Brand awareness, strategic partnerships'
        },
        {
            category: 'Liquidity Pool',
            percentage: '5%',
            tokens: '8.34M',
            price: 'Reserved',
            vesting: '3 months',
            note: 'DEX liquidity, locked for 3 months post-presale'
        }
    ];
    
    /**
     * Initialize mobile-friendly allocation cards
     * Only activates on mobile devices
     */
    function initializeMobileAllocationCards() {
        // Only on mobile devices
        if (window.innerWidth > 768) {
            console.log('📱 Desktop detected - skipping mobile allocation cards');
            return;
        }
        
        const tableContainer = safeQuery('.allocation-table .table-container');
        if (!tableContainer) {
            console.log('📱 Table container not found - skipping mobile allocation cards');
            return;
        }
        
        // Check if cards already exist
        if (safeQuery('.allocation-cards-mobile')) {
            console.log('📱 Mobile cards already initialized');
            return;
        }
        
        // Create mobile cards container
        const mobileContainer = document.createElement('div');
        mobileContainer.className = 'allocation-cards-mobile';
        
        // Generate cards
        tokenAllocations.forEach(allocation => {
            const card = document.createElement('div');
            card.className = 'allocation-card-mobile';
            
            card.innerHTML = `
                <div class="allocation-card-header">
                    <div class="allocation-card-category">${allocation.category}</div>
                    <div class="allocation-card-percentage">${allocation.percentage}</div>
                </div>
                <div class="allocation-card-details">
                    <div class="allocation-detail-item">
                        <div class="allocation-detail-label">Tokens</div>
                        <div class="allocation-detail-value">${allocation.tokens}</div>
                    </div>
                    <div class="allocation-detail-item">
                        <div class="allocation-detail-label">Price</div>
                        <div class="allocation-detail-value">${allocation.price}</div>
                    </div>
                    <div class="allocation-detail-item">
                        <div class="allocation-detail-label">Vesting</div>
                        <div class="allocation-detail-value">${allocation.vesting}</div>
                    </div>
                </div>
                <div class="allocation-card-note">${allocation.note}</div>
            `;
            
            mobileContainer.appendChild(card);
        });
        
        // Insert after table container
        tableContainer.parentNode.insertBefore(mobileContainer, tableContainer.nextSibling);
        
        console.log('📱 Mobile allocation cards initialized successfully!');
    }
    
    // ============================================
    // GALLERY SYSTEM - Consolidated
    // ============================================
    
    /**
     * Gallery state management
     */
    const GalleryState = {
        currentPhoneIndex: 0,
        currentLaptopIndex: 0,
        phoneAutoRotateInterval: null,
        laptopAutoRotateInterval: null,
        
        phoneImages: [
            { src: 'images/ARView.jpg', title: 'AR View' },
            { src: 'images/EmberAirdrop.jpg', title: 'Ember Airdrop' },
            { src: 'images/EmberCollected.jpg', title: 'Ember Collected' },
            { src: 'images/EmberNearby.jpg', title: 'Ember Nearby' },
            { src: 'images/EmberVault.jpg', title: 'Ember Vault' },
            { src: 'images/HuntMap.jpg', title: 'Hunt Map' }
        ],
        
        laptopImages: [
            { src: 'images/CampaignControl.PNG', title: 'Campaign Control' },
            { src: 'images/DashboardOverview.PNG', title: 'Dashboard Overview' },
            { src: 'images/AdvertiserManagement.PNG', title: 'Advertiser Management' },
            { src: 'images/AirdropCenter.PNG', title: 'Airdrop Center' },
            { src: 'images/Walletandfunding.PNG', title: 'Wallet and Funding' },
            { src: 'images/AppbuilderSDK.PNG', title: 'App Builder SDK' }
        ]
    };
    
    /**
 * Change main phone gallery image
 * @param {string} imageSrc - Image source URL
 * @param {string} title - Image title/alt text
 */
function changePhoneImage(imageSrc, title) {
    const mainImg = DOMCache.mainScreenshot || safeQuery('#mainScreenshot');
    const thumbs = safeQueryAll('.simple-thumb');
    
    if (!mainImg) return;
    
    // Optimize animation
    optimizeAnimation(mainImg, 'opacity', 300);
    mainImg.style.opacity = '0.7';
    
    setTimeout(() => {
        mainImg.src = imageSrc;
        mainImg.alt = title;
        mainImg.style.opacity = '1';
    }, 150);
    
    // Update active states
    thumbs.forEach(thumb => {
        thumb.classList.remove('active');
        const thumbImg = thumb.querySelector('img');
        if (thumbImg && thumbImg.src.includes(imageSrc.split('/').pop())) {
            thumb.classList.add('active');
        }
    });
}

/**
 * Change main laptop gallery image
 * @param {string} imageSrc - Image source URL
 * @param {string} title - Image title/alt text
 */
function changeLaptopImage(imageSrc, title) {
    const mainImg = DOMCache.mainLaptopScreenshot || safeQuery('#mainLaptopScreenshot');
    const thumbs = safeQueryAll('.simple-thumb-laptop');
    
    if (!mainImg) return;
    
    // Optimize animation
    optimizeAnimation(mainImg, 'opacity', 300);
    mainImg.style.opacity = '0.7';
    
    setTimeout(() => {
        mainImg.src = imageSrc;
        mainImg.alt = title;
        mainImg.style.opacity = '1';
    }, 150);
    
    // Update active states
    thumbs.forEach(thumb => {
        thumb.classList.remove('active');
        const thumbImg = thumb.querySelector('img');
        if (thumbImg && thumbImg.src.includes(imageSrc.split('/').pop())) {
            thumb.classList.add('active');
        }
    });
}
    
    /**
     * Auto-rotate phone gallery
     */
    function autoRotatePhoneGallery() {
        const showcaseSection = safeQuery('#showcase');
        if (!showcaseSection) return;
        
        const rect = showcaseSection.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
        
        if (isVisible) {
            GalleryState.currentPhoneIndex = (GalleryState.currentPhoneIndex + 1) % GalleryState.phoneImages.length;
            const currentImage = GalleryState.phoneImages[GalleryState.currentPhoneIndex];
            changePhoneImage(currentImage.src, currentImage.title);
        }
    }
    
    /**
     * Auto-rotate laptop gallery
     */
    function autoRotateLaptopGallery() {
        const showcaseSection = safeQuery('#showcase');
        if (!showcaseSection) return;
        
        const rect = showcaseSection.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
        
        if (isVisible) {
            GalleryState.currentLaptopIndex = (GalleryState.currentLaptopIndex + 1) % GalleryState.laptopImages.length;
            const currentImage = GalleryState.laptopImages[GalleryState.currentLaptopIndex];
            changeLaptopImage(currentImage.src, currentImage.title);
        }
    }
    
    /**
     * Reset auto-rotate timer
     * @param {string} galleryType - 'phone' or 'laptop'
     */
    function resetAutoRotate(galleryType) {
        if (galleryType === 'phone') {
            if (GalleryState.phoneAutoRotateInterval) {
                clearInterval(GalleryState.phoneAutoRotateInterval);
            }
            setTimeout(() => {
                GalleryState.phoneAutoRotateInterval = setInterval(autoRotatePhoneGallery, 4500);
            }, 15000);
        } else if (galleryType === 'laptop') {
            if (GalleryState.laptopAutoRotateInterval) {
                clearInterval(GalleryState.laptopAutoRotateInterval);
            }
            setTimeout(() => {
                GalleryState.laptopAutoRotateInterval = setInterval(autoRotateLaptopGallery, 4500);
            }, 15000);
        }
    }
    
    /**
     * Initialize gallery auto-rotation
     */
    function initializeGalleryAutoRotation() {
        // Start auto-rotation after delay
        setTimeout(() => {
            GalleryState.phoneAutoRotateInterval = setInterval(autoRotatePhoneGallery, 4500);
            GalleryState.laptopAutoRotateInterval = setInterval(autoRotateLaptopGallery, 4500);
        }, 3000);
        
        // Event delegation for phone thumbnails
        document.addEventListener('click', (e) => {
            const phoneThumb = e.target.closest('.simple-thumb');
            if (phoneThumb) {
                const img = phoneThumb.querySelector('img');
                if (img) {
                    changePhoneImage(img.src, img.alt);
                    resetAutoRotate('phone');
                }
            }
            
            const laptopThumb = e.target.closest('.simple-thumb-laptop');
            if (laptopThumb) {
                const img = laptopThumb.querySelector('img');
                if (img) {
                    changeLaptopImage(img.src, img.alt);
                    resetAutoRotate('laptop');
                }
            }
        });
        
        console.log('🔄 Gallery auto-rotation initialized with event delegation');
    }
    
    // ============================================
    // SCROLL REVEAL OBSERVER - Optimized
    // ============================================
    
    /**
     * Initialize intersection observer for scroll reveals
     */
    function initializeScrollRevealObserver() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -30px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    // Optimize animation
                    optimizeAnimation(entry.target, 'opacity, transform', 600);
                    
                    // Trigger reveal
                    requestAnimFrame(() => {
                        entry.target.classList.add('revealed');
                    });
                    
                    // Unobserve after revealing (performance optimization)
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);
        
        safeQueryAll('.scroll-reveal').forEach(el => {
            observer.observe(el);
        });
        
        console.log('👁️ Scroll reveal observer initialized');
    }
    
    // ============================================
    // IMAGE OPTIMIZATION
    // ============================================
    
    /**
     * Optimize image loading to prevent blinking
     */
    function optimizeImageLoading() {
        safeQueryAll('img').forEach(img => {
            // Skip if already loaded
            if (img.complete && img.naturalHeight !== 0) {
                return;
            }
            
            // Set initial state
            img.style.opacity = '0';
            
            // Handle successful load
            const handleLoad = () => {
                requestAnimFrame(() => {
                    img.style.transition = 'opacity 0.3s ease-in-out';
                    img.style.opacity = '1';
                });
            };
            
            // Handle error
            const handleError = () => {
                console.warn('⚠️ Image failed to load:', img.src);
                img.style.opacity = '0.5';
                img.alt = img.alt || 'Image loading...';
            };
            
            img.addEventListener('load', handleLoad, { once: true });
            img.addEventListener('error', handleError, { once: true });
        });
        
        console.log('🖼️ Image loading optimized');
    }
    
    /**
     * Preload critical images
     */
    function preloadCriticalImages() {
        const criticalImages = [
            // App Screenshots
            'images/ARView.jpg',
            'images/EmberAirdrop.jpg',
            'images/EmberCollected.jpg',
            'images/EmberNearby.jpg',
            'images/EmberVault.jpg',
            'images/HuntMap.jpg',
            // Management System
            'images/CampaignControl.PNG',
            'images/DashboardOverview.PNG',
            'images/AdvertiserManagement.PNG',
            'images/AirdropCenter.PNG',
            'images/Walletandfunding.PNG',
            'images/AppbuilderSDK.PNG',
            // Core Images
            'images/VPEmberCoin.PNG',
            'images/PhoenixHoldingCoin.PNG',
            'images/VPLogoNoText.PNG'
        ];
        
        criticalImages.forEach(src => {
            const img = new Image();
            img.src = src;
        });
        
        console.log('🖼️ Image preloading initiated');
    }
    
    // ============================================
    // INTERACTIVE CARD EFFECTS
    // ============================================
    
    /**
     * Initialize hover effects for interactive cards
     * Uses event delegation for better performance
     */
    function initializeCardEffects() {
        // Skip hover effects on touch devices
        if (DeviceInfo.supportsTouch && DeviceInfo.isMobile) {
            console.log('🎴 Skipping hover effects for touch device');
            return;
        }
        
        const cardSelectors = '.feature-card, .use-case-card, .simple-thumb, .simple-thumb-laptop, .crypto-benefit, .ember-highlight-redesigned';
        
        // Event delegation for better performance
        document.addEventListener('mouseenter', (e) => {
            const card = e.target.closest(cardSelectors);
            if (!card) return;
            
            // Optimize animation
            optimizeAnimation(card, 'transform, box-shadow', 300);
            
            if (card.classList.contains('simple-thumb') || card.classList.contains('simple-thumb-laptop')) {
                card.style.transform = 'translateY(-5px) scale(1.05)';
            } else if (card.classList.contains('crypto-benefit')) {
                card.style.transform = 'translateX(15px)';
            } else if (card.classList.contains('ember-highlight-redesigned')) {
                card.style.transform = 'translateX(12px)';
            } else {
                card.style.transform = 'translateY(-10px) scale(1.02)';
            }
            
            // Add glow effect
            if (card.classList.contains('feature-card') || card.classList.contains('use-case-card')) {
                card.style.boxShadow = '0 30px 80px rgba(215, 51, 39, 0.2)';
            }
        }, true);
        
        document.addEventListener('mouseleave', (e) => {
            const card = e.target.closest(cardSelectors);
            if (!card || card.classList.contains('active')) return;
            
            card.style.transform = '';
            card.style.boxShadow = '';
        }, true);
        
        console.log('🎴 Interactive card effects initialized with event delegation');
    }
    
    // ============================================
    // STATS ANIMATION
    // ============================================
    
    /**
     * Animate stats with counting effect
     */
    function animateStats() {
        const stats = safeQueryAll('.stat-number, .revenue-number');
        
        stats.forEach(stat => {
            const finalValue = stat.textContent;
            const numericValue = parseFloat(finalValue.replace(/[^\d.]/g, ''));
            
            if (numericValue && numericValue > 0) {
                let currentValue = 0;
                const duration = 2500;
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
        });
    }
    
    /**
     * Initialize stats animation observer
     */
    function initializeStatsAnimationObserver() {
        const heroSection = DOMCache.hero;
        if (!heroSection) return;
        
        const heroObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(animateStats, 500);
                    heroObserver.disconnect();
                }
            });
        });
        
        heroObserver.observe(heroSection);
        
        console.log('📊 Stats animation observer initialized');
    }
    
    // ============================================
    // FLOATING PARTICLES - Mobile Optimized
    // ============================================
    
    /**
     * Create floating crypto particles (optimized for performance)
     */
    function createFloatingParticles() {
        const hero = DOMCache.hero;
        if (!hero) {
            console.warn('⚠️ Hero section not found');
            return;
        }
        
        // Skip particles if user prefers reduced motion
        if (DeviceInfo.prefersReducedMotion) {
            console.log('⚠️ Reduced motion enabled - skipping particles');
            return;
        }
        
        // Check if particles already exist
        if (DOMCache.floatingCoins) {
            console.log('🪙 Particles already initialized');
            return;
        }
        
        console.log('🪙 Creating floating particles...');
        
        // Create container
        const floatingCoins = document.createElement('div');
        floatingCoins.className = 'hero-floating-coins';
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
        
        // Get optimal particle count
        const particleCount = DeviceInfo.getOptimalParticleCount();
        
        // Optimized positions
        const coinPositions = [
            { top: '15%', left: '10%', delay: '0s', duration: '6s' },
            { top: '70%', left: '8%', delay: '1s', duration: '7s' },
            { top: '25%', right: '12%', delay: '2s', duration: '8s' },
            { top: '65%', right: '10%', delay: '3s', duration: '6s' },
            { top: '10%', left: '80%', delay: '4s', duration: '7s' },
            { bottom: '20%', right: '85%', delay: '5s', duration: '9s' }
        ].slice(0, particleCount);
        
        coinPositions.forEach((pos, index) => {
            const coin = document.createElement('div');
            coin.className = `hero-coin hero-coin-${index + 1}`;
            coin.setAttribute('data-coin-id', index + 1);
            
            const coinImg = document.createElement('img');
            coinImg.src = 'images/VPEmberCoin.PNG';
            coinImg.alt = 'VP Ember Coin';
            coinImg.className = 'hero-crypto-coin-icon';
            coinImg.loading = 'lazy';
            
            // Mobile-optimized sizing
            const size = DeviceInfo.isMobile ? 'clamp(20px, 4vw, 35px)' : 'clamp(35px, 5vw, 50px)';
            const opacity = DeviceInfo.isMobile ? '0.5' : '0.7';
            
            coinImg.style.cssText = `
                width: ${size};
                height: ${size};
                object-fit: contain;
                filter: drop-shadow(0 0 8px rgba(240, 165, 0, 0.6));
                opacity: ${opacity};
                border-radius: 50%;
            `;
            
            coinImg.onerror = function() {
                console.warn('⚠️ Coin image failed, using emoji fallback');
                const fallback = document.createElement('div');
                fallback.innerHTML = '🪙';
                fallback.style.cssText = `
                    font-size: ${size};
                    filter: drop-shadow(0 0 8px rgba(240, 165, 0, 0.6));
                `;
                coin.appendChild(fallback);
            };
            
            coin.appendChild(coinImg);
            
            coin.style.cssText = `
                position: absolute;
                animation: heroCoinFloat ${pos.duration} ease-in-out infinite;
                animation-delay: ${pos.delay};
                z-index: 1;
                pointer-events: none;
                will-change: transform;
                ${pos.top ? `top: ${pos.top};` : ''}
                ${pos.bottom ? `bottom: ${pos.bottom};` : ''}
                ${pos.left ? `left: ${pos.left};` : ''}
                ${pos.right ? `right: ${pos.right};` : ''}
            `;
            
            floatingCoins.appendChild(coin);
        });
        
        hero.insertBefore(floatingCoins, hero.firstChild);
        DOMCache.floatingCoins = floatingCoins;
        
        // Add animation CSS if not present
        if (!document.querySelector('#heroCoinFloatAnimation')) {
            const style = document.createElement('style');
            style.id = 'heroCoinFloatAnimation';
            style.textContent = `
                @keyframes heroCoinFloat {
                    0%, 100% { 
                        transform: translateY(0px) rotate(0deg) scale(1); 
                    }
                    25% { 
                        transform: translateY(-20px) rotate(90deg) scale(1.1); 
                    }
                    50% { 
                        transform: translateY(-10px) rotate(180deg) scale(0.9); 
                    }
                    75% { 
                        transform: translateY(-25px) rotate(270deg) scale(1.15); 
                    }
                }
                
                @media (prefers-reduced-motion: reduce) {
                    .hero-coin {
                        animation: none !important;
                    }
                }
            `;
            document.head.appendChild(style);
        }
        
        console.log(`🪙 ${particleCount} floating particles created`);
    }
    
    // ============================================
    // COIN IMAGE INTERACTIONS
    // ============================================
    
    /**
     * Initialize crypto coin image interactions
     */
    function initializeCryptoCoinImage() {
        const cryptoImage = safeQuery('.phoenix-coin-image');
        if (!cryptoImage || DeviceInfo.isMobile) return;
        
        cryptoImage.addEventListener('mouseenter', function() {
            optimizeAnimation(this, 'filter', 300);
            this.style.filter = 'drop-shadow(0 0 30px rgba(251, 146, 60, 0.8)) brightness(1.1)';
        });
        
        cryptoImage.addEventListener('mouseleave', function() {
            this.style.filter = '';
        });
        
        console.log('🪙 Crypto coin interactions initialized');
    }
    
    /**
     * Initialize ember coin image interactions
     */
    function initializeEmberCoinImage() {
        const emberCoinImage = safeQuery('.phoenix-holding-coin-redesigned');
        if (!emberCoinImage || DeviceInfo.isMobile) return;
        
        emberCoinImage.addEventListener('mouseenter', function() {
            optimizeAnimation(this, 'filter, transform', 300);
            this.style.filter = 'drop-shadow(0 0 50px rgba(240, 165, 0, 0.9)) brightness(1.2)';
            this.style.transform = 'scale(1.1) translateY(-10px)';
        });
        
        emberCoinImage.addEventListener('mouseleave', function() {
            this.style.filter = '';
            this.style.transform = '';
        });
        
        console.log('🪙 Ember coin interactions initialized');
    }
    
    // ============================================
    // CRYPTO BENEFITS & EMBER HIGHLIGHTS
    // ============================================
    
    /**
     * Initialize crypto benefits animations
     */
    function initializeCryptoBenefits() {
        const benefits = safeQueryAll('.crypto-benefit');
        if (!benefits.length) return;
        
        const benefitsObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        optimizeAnimation(entry.target, 'transform, opacity', 600);
                        entry.target.style.transform = 'translateX(0)';
                        entry.target.style.opacity = '1';
                        
                        const icon = entry.target.querySelector('.benefit-icon');
                        if (icon && !DeviceInfo.prefersReducedMotion) {
                            addCoinBounceAnimation();
                            optimizeAnimation(icon, 'transform', 600);
                            icon.style.animation = 'coinBounce 0.6s ease-out';
                        }
                    }, index * 200);
                    
                    benefitsObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });
        
        benefits.forEach(benefit => {
            benefit.style.transform = 'translateX(-50px)';
            benefit.style.opacity = '0';
            benefitsObserver.observe(benefit);
        });
        
        console.log('💰 Crypto benefits animations initialized');
    }
    
    /**
     * Initialize ember highlights animations
     */
    function initializeEmberHighlights() {
        const highlights = safeQueryAll('.ember-highlight-redesigned');
        if (!highlights.length) return;
        
        const highlightsObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        optimizeAnimation(entry.target, 'transform, opacity', 600);
                        entry.target.style.transform = 'translateX(0)';
                        entry.target.style.opacity = '1';
                        
                        const emoji = entry.target.querySelector('.highlight-emoji-redesigned');
                        if (emoji && !DeviceInfo.prefersReducedMotion) {
                            addEmberFlickerAnimation();
                            optimizeAnimation(emoji, 'transform', 1000);
                            emoji.style.animation = 'emberFlicker 1s ease-in-out';
                        }
                    }, index * 150);
                    
                    highlightsObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });
        
        highlights.forEach(highlight => {
            highlight.style.transform = 'translateX(-30px)';
            highlight.style.opacity = '0';
            highlightsObserver.observe(highlight);
        });
        
        console.log('🔥 Ember highlights animations initialized');
    }
    
    /**
     * Add coin bounce animation stylesheet
     */
    function addCoinBounceAnimation() {
        if (document.querySelector('#coinBounceAnimation')) return;
        
        const style = document.createElement('style');
        style.id = 'coinBounceAnimation';
        style.textContent = `
            @keyframes coinBounce {
                0% { transform: scale(1) rotateY(0deg); }
                50% { transform: scale(1.2) rotateY(180deg); }
                100% { transform: scale(1) rotateY(360deg); }
            }
        `;
        document.head.appendChild(style);
    }
    
    /**
     * Add ember flicker animation stylesheet
     */
    function addEmberFlickerAnimation() {
        if (document.querySelector('#emberFlickerAnimation')) return;
        
        const style = document.createElement('style');
        style.id = 'emberFlickerAnimation';
        style.textContent = `
            @keyframes emberFlicker {
                0%, 100% { transform: scale(1); }
                25% { transform: scale(1.1); }
                50% { transform: scale(0.95); }
                75% { transform: scale(1.05); }
            }
        `;
        document.head.appendChild(style);
    }
    
    // ============================================
    // CTA BUTTON INTERACTIONS
    // ============================================
    
    /**
     * Initialize CTA button feedback
     * Uses event delegation for better performance
     */
    function initializeCTAFeedback() {
        // Email and SMS CTAs with event delegation
        document.addEventListener('click', (e) => {
            const link = e.target.closest('a[href^="mailto:"], a[href^="sms:"]');
            if (!link) return;
            
            const type = link.href.startsWith('mailto:') ? '📧 Email' : '📱 SMS';
            console.log(`${type} CTA clicked:`, link.href);
            
            optimizeAnimation(link, 'transform', 150);
            link.style.transform = 'scale(0.95)';
            setTimeout(() => {
                link.style.transform = '';
            }, 150);
        });
        
        // CTA button hover effects (desktop only)
        if (!DeviceInfo.isMobile && !DeviceInfo.prefersReducedMotion) {
            const ctaSelectors = '.cta-button, .cta-primary, .cta-secondary, .demo-button, .join-presale-button-redesigned, .demo-button-enhanced';
            
            document.addEventListener('mouseenter', (e) => {
                const button = e.target.closest(ctaSelectors);
                if (!button) return;
                
                optimizeAnimation(button, 'filter', 300);
                button.style.filter = 'brightness(1.1) saturate(1.2)';
            }, true);
            
            document.addEventListener('mouseleave', (e) => {
                const button = e.target.closest(ctaSelectors);
                if (!button) return;
                
                button.style.filter = '';
            }, true);
            
            document.addEventListener('mousedown', (e) => {
                const button = e.target.closest(ctaSelectors);
                if (!button) return;
                
                optimizeAnimation(button, 'transform', 150);
                button.style.transform = 'scale(0.95)';
            });
            
            document.addEventListener('mouseup', (e) => {
                const button = e.target.closest(ctaSelectors);
                if (!button) return;
                
                button.style.transform = '';
            });
        }
        
        console.log('📲 CTA button feedback initialized');
    }
    
    // ============================================
    // SCROLL PROGRESS INDICATOR
    // ============================================
    
    /**
     * Create scroll progress indicator
     */
    function createScrollProgressIndicator() {
        // Check if indicator already exists
        if (DOMCache.scrollProgress) {
            console.log('📊 Scroll progress already initialized');
            return;
        }
        
        const indicator = document.createElement('div');
        indicator.className = 'phoenix-scroll-progress';
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
        DOMCache.scrollProgress = indicator;
        
        const updateProgress = throttle(() => {
            const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
            const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrolled = (winScroll / height) * 100;
            indicator.style.width = scrolled + '%';
        }, 50);
        
        window.addEventListener('scroll', updateProgress, { passive: true });
        
        console.log('📊 Scroll progress indicator initialized');
    }
    
    // ============================================
    // MOBILE PERFORMANCE OPTIMIZATIONS
    // ============================================
    
    /**
     * Apply mobile-specific performance optimizations
     */
    function optimizeMobilePerformance() {
        console.log('📱 Applying mobile optimizations...');
        
        // Add touch device class
        document.body.classList.add('touch-device');
        
        // Optimize scroll performance
        const scrollElements = safeQueryAll('.allocation-cards-mobile');
        scrollElements.forEach(el => {
            el.style.webkitOverflowScrolling = 'touch';
            el.style.overscrollBehavior = 'contain';
        });
        
        // Reduce animation complexity on low-end devices
        if (DeviceInfo.isLowEndDevice()) {
            document.body.classList.add('low-end-device');
            console.log('📱 Low-end device optimizations applied');
        }
        
        // Handle orientation changes
        window.addEventListener('orientationchange', debounce(() => {
            console.log('📱 Orientation changed');
            DeviceInfo.screenWidth = window.innerWidth;
            DeviceInfo.screenHeight = window.innerHeight;
        }, 300), { passive: true });
        
        console.log('📱 Mobile optimizations complete');
    }
    
    // ============================================
    // LOGO PHOENIX FLAME EFFECT
    // ============================================
    
    /**
     * Add phoenix flame effect to logo
     */
    function addLogoFlameEffect() {
        const logoIcon = DOMCache.logoIcon;
        if (logoIcon) {
            logoIcon.style.filter = 'drop-shadow(0 0 15px rgba(215, 51, 39, 0.8))';
            console.log('🔥 Logo flame effect applied');
        }
    }
    
    // ============================================
    // EASTER EGG: KONAMI CODE
    // ============================================
    
    let konamiCode = [];
    const konamiSequence = [
        'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
        'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
        'KeyB', 'KeyA'
    ];
    
    /**
     * Create coin rain animation
     */
    function createCoinRain() {
        const coinCount = DeviceInfo.isMobile ? 15 : 30;
        
        for (let i = 0; i < coinCount; i++) {
            setTimeout(() => {
                const coin = document.createElement('div');
                coin.innerHTML = '🪙';
                coin.style.cssText = `
                    position: fixed;
                    font-size: ${Math.random() * 20 + 25}px;
                    left: ${Math.random() * 100}vw;
                    top: -50px;
                    z-index: 10000;
                    pointer-events: none;
                    animation: coinFall ${Math.random() * 2 + 2}s linear forwards;
                    will-change: transform, opacity;
                `;
                
                document.body.appendChild(coin);
                setTimeout(() => coin.remove(), 4000);
            }, i * 100);
        }
        
        // Add animation if not present
        if (!document.querySelector('#coinFallAnimation')) {
            const style = document.createElement('style');
            style.id = 'coinFallAnimation';
            style.textContent = `
                @keyframes coinFall {
                    to { 
                        transform: translateY(calc(100vh + 100px)) rotate(720deg); 
                        opacity: 0; 
                    }
                }
            `;
            document.head.appendChild(style);
        }
    }
    
    /**
     * Initialize Konami code easter egg
     */
    function initializeKonamiCode() {
        document.addEventListener('keydown', (e) => {
            konamiCode.push(e.code);
            if (konamiCode.length > konamiSequence.length) {
                konamiCode.shift();
            }
            
            if (konamiCode.join(',') === konamiSequence.join(',')) {
                console.log('🔥🪙 BONUS ACTIVATED!');
                createCoinRain();
                konamiCode = [];
            }
        });
        
        console.log('🎮 Konami code easter egg initialized');
    }
    
    // ============================================
    // PAGE INITIALIZATION - Main Entry Point
    // ============================================
    
    /**
     * Initialize dark background immediately (prevent flash)
     */
    (function initializeDarkBackground() {
        document.documentElement.style.background = '#0f0f0f';
        if (document.body) {
            document.body.style.background = 'linear-gradient(135deg, #0f0f0f 0%, #1a1a1a 25%, #2d1810 50%, #451a03 75%, #7c2d12 100%)';
            document.body.style.opacity = '1';
        }
    })();
    
    /**
     * DOM Content Loaded - Initialize all features
     */
    function initializePage() {
        console.log('🔥🪙 Vault Phoenix loading (Mobile-Optimized v4.0)...');
        
        // Ensure dark background
        document.body.style.background = 'linear-gradient(135deg, #0f0f0f 0%, #1a1a1a 25%, #2d1810 50%, #451a03 75%, #7c2d12 100%)';
        document.body.style.opacity = '1';
        document.body.classList.add('loaded');
        
        // Initialize DOM cache first
        DOMCache.init();
        
        // Log device info
        console.log('📱 Device:', {
            mobile: DeviceInfo.isMobile,
            width: DeviceInfo.screenWidth,
            touch: DeviceInfo.supportsTouch,
            reducedMotion: DeviceInfo.prefersReducedMotion,
            lowEnd: DeviceInfo.isLowEndDevice()
        });
        
        // Initialize viewport handlers
        initializeViewportHandlers();
        
        // Initialize features
        initializeMobileAllocationCards();
        preloadCriticalImages();
        initializeCryptoCoinImage();
        initializeEmberCoinImage();
        initializeCryptoBenefits();
        initializeEmberHighlights();
        createScrollProgressIndicator();
        
        // Create floating particles (optimized for device)
        createFloatingParticles();
        
        // Initialize observers
        initializeScrollRevealObserver();
        initializeStatsAnimationObserver();
        
        // Initialize interactions
        initializeCardEffects();
        initializeGalleryAutoRotation();
        initializeCTAFeedback();
        
        // Initialize easter egg
        initializeKonamiCode();
        
        // Mobile-specific optimizations
        if (DeviceInfo.isMobile) {
            optimizeMobilePerformance();
        }
        
        console.log('🔥🪙 Vault Phoenix initialized successfully!');
        console.log('✅ Using shared-script.js for: smooth scrolling, countdown timer, mobile menu, navbar transitions, chatbot');
    }
    
    /**
     * Window load event - final optimizations
     */
    function onWindowLoad() {
        console.log('🔥🪙 Vault Phoenix fully loaded!');
        
        // Optimize image loading after page load
        optimizeImageLoading();
        
        // Add logo flame effect
        addLogoFlameEffect();
        
        // Performance monitoring
        setTimeout(() => {
            if (DOMCache.floatingCoins) {
                console.log('✅ Floating coins active');
            }
            
            if (DOMCache.mainScreenshot && DOMCache.mainScreenshot.src.includes('images/')) {
                console.log('✅ Gallery images loaded');
            }
        }, 500);
        
        // Performance timing
        if (performance && performance.now) {
            const loadTime = performance.now();
            console.log(`%c🔥 Page loaded in ${Math.round(loadTime)}ms`, 'color: #22c55e; font-weight: bold;');
        }
    }
    
    // ============================================
    // CLEANUP - Memory Management
    // ============================================
    
    /**
     * Cleanup function for page unload
     */
    function cleanup() {
        // Clear intervals
        if (GalleryState.phoneAutoRotateInterval) {
            clearInterval(GalleryState.phoneAutoRotateInterval);
        }
        if (GalleryState.laptopAutoRotateInterval) {
            clearInterval(GalleryState.laptopAutoRotateInterval);
        }
        
        // Clear DOM cache
        DOMCache.clear();
        
        console.log('🧹 Cleanup complete');
    }
    
    // ============================================
    // EVENT LISTENERS - Initialization
    // ============================================
    
    // Initialize on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initializePage);
    } else {
        initializePage();
    }
    
    // Final optimizations on window load
    window.addEventListener('load', onWindowLoad);
    
    // Cleanup on page unload
    window.addEventListener('beforeunload', cleanup);
    
    // ============================================
    // PUBLIC API - Expose necessary functions
    // ============================================
    
    return {
        // Gallery functions for global access
        changePhoneImage: changePhoneImage,
        changeLaptopImage: changeLaptopImage,
        
        // Utility functions
        DeviceInfo: DeviceInfo,
        safeQuery: safeQuery,
        safeQueryAll: safeQueryAll
    };
    
})();

// ============================================
// GLOBAL FUNCTION ALIASES (Backward Compatibility)
// ============================================

// Expose gallery functions globally for onclick handlers
window.changeImage = VaultPhoenix.changePhoneImage;
window.changeLaptopImage = VaultPhoenix.changeLaptopImage;

// ============================================
// CONSOLE MESSAGES
// ============================================

console.log('%c🔥🪙 VAULT PHOENIX', 'color: #d73327; font-size: 24px; font-weight: bold;');
console.log('%c🚀 AR Crypto Gaming Revolution', 'color: #fb923c; font-size: 16px; font-weight: bold;');
console.log('%c📧 contact@vaultphoenix.com', 'color: #374151; font-size: 12px;');
console.log('%c💡 Senior Engineering - Mobile-First Architecture v4.0', 'color: #22c55e; font-size: 12px; font-weight: bold;');
console.log('%c✅ Namespace protected, event delegation optimized, memory managed', 'color: #3b82f6; font-size: 12px; font-weight: bold;');
console.log('Try the Konami Code for a surprise! ⬆️⬆️⬇️⬇️⬅️➡️⬅️➡️BA');
