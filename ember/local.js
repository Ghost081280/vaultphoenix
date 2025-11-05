// ============================================
// EMBER TOKEN PAGE - LOCAL JAVASCRIPT (ember/local.js)
// ============================================
// Page-specific functionality for ember.html
// Shared functionality (nav, chatbot, scroll, etc) in shared/global.js
// VERSION: 4.0 - New Architecture Integration
// ============================================

'use strict';

// ============================================
// DEVICE DETECTION & PERFORMANCE
// ============================================

/**
 * Detect device capabilities and set performance flags
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
     */
    isLowEndDevice() {
        const memory = navigator.deviceMemory || 4;
        const cores = navigator.hardwareConcurrency || 2;
        return memory < 4 || cores < 4 || this.isMobile;
    },
    
    /**
     * Get optimal particle count based on device
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
// UTILITY FUNCTIONS
// ============================================

/**
 * Safely query DOM element with error handling
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
 */
const requestAnimFrame = window.requestAnimationFrame || 
                         window.webkitRequestAnimationFrame || 
                         window.mozRequestAnimationFrame || 
                         function(callback) { setTimeout(callback, 1000 / 60); };

// ============================================
// VIEWPORT & ZOOM STABILITY
// ============================================

/**
 * Prevent page reload on zoom - throttle resize events
 */
let lastWidth = window.innerWidth;
let lastHeight = window.innerHeight;

const handleResize = window.throttle(() => {
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

window.addEventListener('resize', handleResize);

/**
 * Detect and handle zoom events specifically
 */
let lastZoom = window.devicePixelRatio;

const handleZoom = window.throttle(() => {
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

// Monitor zoom via visualViewport if available
if ('visualViewport' in window) {
    window.visualViewport.addEventListener('resize', handleZoom);
} else {
    window.addEventListener('resize', handleZoom);
}

// ============================================
// MOBILE ALLOCATION CARDS
// ============================================

/**
 * Initialize mobile-friendly allocation cards
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
    
    // Token allocation data
    const allocations = [
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
    
    // Create mobile cards container
    const mobileContainer = document.createElement('div');
    mobileContainer.className = 'allocation-cards-mobile';
    
    // Generate cards
    allocations.forEach(allocation => {
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
// PAGE INITIALIZATION
// ============================================

// Immediately prevent flash by setting dark background
(function() {
    document.documentElement.style.background = '#0f0f0f';
    if (document.body) {
        document.body.style.background = 'linear-gradient(135deg, #0f0f0f 0%, #1a1a1a 25%, #2d1810 50%, #451a03 75%, #7c2d12 100%)';
        document.body.style.opacity = '1';
    }
})();

/**
 * DOM Content Loaded - Initialize all features
 */
document.addEventListener('DOMContentLoaded', function() {
    console.log('🔥🪙 Vault Phoenix loading (Mobile-Optimized v3.1 - Duplicates Removed)...');
    
    // Ensure dark background
    document.body.style.background = 'linear-gradient(135deg, #0f0f0f 0%, #1a1a1a 25%, #2d1810 50%, #451a03 75%, #7c2d12 100%)';
    document.body.style.opacity = '1';
    document.body.classList.add('loaded');
    
    // Log device info
    console.log('📱 Device:', {
        mobile: DeviceInfo.isMobile,
        width: DeviceInfo.screenWidth,
        touch: DeviceInfo.supportsTouch,
        reducedMotion: DeviceInfo.prefersReducedMotion
    });
    
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
    
    // Initialize stats animation observer (scroll reveal is now in shared-script.js)
    initializeStatsAnimationObserver();
    
    // Initialize interactions
    initializeCardEffects();
    initializeGalleryAutoRotation();
    initializeCTAFeedback();
    
    // Mobile-specific optimizations
    if (DeviceInfo.isMobile) {
        optimizeMobilePerformance();
    }
    
    console.log('🔥🪙 Vault Phoenix initialized successfully!');
    console.log('✅ Using shared-script.js for: smooth scrolling, countdown timer, mobile menu, navbar transitions, chatbot, scroll reveal');
});

// ============================================
// GALLERY FUNCTIONS (PAGE-SPECIFIC)
// ============================================

/**
 * Change main phone gallery image
 */
function changeImage(imageSrc, title) {
    const mainImg = safeQuery('#mainScreenshot');
    const thumbs = safeQueryAll('.simple-thumb');
    
    if (!mainImg) return;
    
    // Add will-change before transition
    mainImg.style.willChange = 'opacity';
    mainImg.style.opacity = '0.7';
    
    setTimeout(() => {
        mainImg.src = imageSrc;
        mainImg.alt = title;
        mainImg.style.opacity = '1';
        
        // Remove will-change after transition
        setTimeout(() => {
            mainImg.style.willChange = 'auto';
        }, 300);
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
 */
function changeLaptopImage(imageSrc, title) {
    const mainImg = safeQuery('#mainLaptopScreenshot');
    const thumbs = safeQueryAll('.simple-thumb-laptop');
    
    if (!mainImg) return;
    
    // Add will-change before transition
    mainImg.style.willChange = 'opacity';
    mainImg.style.opacity = '0.7';
    
    setTimeout(() => {
        mainImg.src = imageSrc;
        mainImg.alt = title;
        mainImg.style.opacity = '1';
        
        // Remove will-change after transition
        setTimeout(() => {
            mainImg.style.willChange = 'auto';
        }, 300);
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

// ============================================
// IMAGE FADE-IN OPTIMIZATION
// ============================================

/**
 * Optimize image loading to prevent blinking
 */
function optimizeImageLoading() {
    safeQueryAll('img').forEach(img => {
        // Add will-change for images that will animate
        if (img.closest('.scroll-reveal') || img.closest('.image-with-glow')) {
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
    
    console.log('🖼️ Image loading optimized with fade-in prevention');
}

// ============================================
// INTERACTIVE CARD EFFECTS
// ============================================

/**
 * Initialize hover effects for interactive cards
 */
function initializeCardEffects() {
    // Skip hover effects on touch devices
    if (DeviceInfo.supportsTouch && DeviceInfo.isMobile) {
        console.log('🎴 Skipping hover effects for touch device');
        return;
    }
    
    const cards = safeQueryAll('.feature-card, .use-case-card, .simple-thumb, .simple-thumb-laptop, .crypto-benefit, .ember-highlight-redesigned');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            // Add will-change before transform
            this.style.willChange = 'transform, box-shadow';
            
            if (this.classList.contains('simple-thumb') || this.classList.contains('simple-thumb-laptop')) {
                this.style.transform = 'translateY(-5px) scale(1.05)';
            } else if (this.classList.contains('crypto-benefit')) {
                this.style.transform = 'translateX(15px)';
            } else if (this.classList.contains('ember-highlight-redesigned')) {
                this.style.transform = 'translateX(12px)';
            } else {
                this.style.transform = 'translateY(-10px) scale(1.02)';
            }
            
            // Add glow effect
            if (this.classList.contains('feature-card') || this.classList.contains('use-case-card')) {
                this.style.boxShadow = '0 30px 80px rgba(215, 51, 39, 0.2)';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            if (!this.classList.contains('active')) {
                this.style.transform = 'translateY(0) scale(1)';
                if (this.classList.contains('crypto-benefit') || this.classList.contains('ember-highlight-redesigned')) {
                    this.style.transform = 'translateX(0)';
                }
                this.style.boxShadow = '';
            }
            
            // Remove will-change after animation
            setTimeout(() => {
                this.style.willChange = 'auto';
            }, 300);
        });
    });
    
    console.log('🎴 Interactive card effects initialized with will-change optimization');
}

// ============================================
// STATS ANIMATION
// ============================================

/**
 * Initialize stats animation observer
 */
function initializeStatsAnimationObserver() {
    const heroSection = safeQuery('.hero');
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

// ============================================
// AUTO-ROTATE GALLERY
// ============================================

let currentImageIndex = 0;
const imageRotation = [
    { src: 'images/ARView.jpg', title: 'AR View' },
    { src: 'images/EmberAirdrop.jpg', title: 'Ember Airdrop' },
    { src: 'images/EmberCollected.jpg', title: 'Ember Collected' },
    { src: 'images/EmberNearby.jpg', title: 'Ember Nearby' },
    { src: 'images/EmberVault.jpg', title: 'Ember Vault' },
    { src: 'images/HuntMap.jpg', title: 'Hunt Map' }
];

let currentLaptopImageIndex = 0;
const laptopImageRotation = [
    { src: 'images/CampaignControl.PNG', title: 'Campaign Control' },
    { src: 'images/DashboardOverview.PNG', title: 'Dashboard Overview' },
    { src: 'images/AdvertiserManagement.PNG', title: 'Advertiser Management' },
    { src: 'images/AirdropCenter.PNG', title: 'Airdrop Center' },
    { src: 'images/Walletandfunding.PNG', title: 'Wallet and Funding' },
    { src: 'images/AppbuilderSDK.PNG', title: 'App Builder SDK' }
];

/**
 * Initialize gallery auto-rotation
 */
function initializeGalleryAutoRotation() {
    let autoRotateInterval;
    let autoRotateLaptopInterval;
    
    function autoRotateGallery() {
        const showcaseSection = safeQuery('#showcase');
        if (!showcaseSection) return;
        
        const rect = showcaseSection.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
        
        if (isVisible) {
            currentImageIndex = (currentImageIndex + 1) % imageRotation.length;
            const currentImage = imageRotation[currentImageIndex];
            changeImage(currentImage.src, currentImage.title);
        }
    }
    
    function autoRotateLaptopGallery() {
        const showcaseSection = safeQuery('#showcase');
        if (!showcaseSection) return;
        
        const rect = showcaseSection.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
        
        if (isVisible) {
            currentLaptopImageIndex = (currentLaptopImageIndex + 1) % laptopImageRotation.length;
            const currentImage = laptopImageRotation[currentLaptopImageIndex];
            changeLaptopImage(currentImage.src, currentImage.title);
        }
    }
    
    // Start auto-rotation after delay
    setTimeout(() => {
        autoRotateInterval = setInterval(autoRotateGallery, 4500);
        autoRotateLaptopInterval = setInterval(autoRotateLaptopGallery, 4500);
    }, 3000);
    
    // Pause auto-rotation when user interacts
    safeQueryAll('.simple-thumb').forEach(thumb => {
        thumb.addEventListener('click', () => {
            if (autoRotateInterval) {
                clearInterval(autoRotateInterval);
            }
            setTimeout(() => {
                autoRotateInterval = setInterval(autoRotateGallery, 4500);
            }, 15000);
        });
    });
    
    safeQueryAll('.simple-thumb-laptop').forEach(thumb => {
        thumb.addEventListener('click', () => {
            if (autoRotateLaptopInterval) {
                clearInterval(autoRotateLaptopInterval);
            }
            setTimeout(() => {
                autoRotateLaptopInterval = setInterval(autoRotateLaptopGallery, 4500);
            }, 15000);
        });
    });
    
    console.log('🔄 Gallery auto-rotation initialized');
}

// ============================================
// CTA BUTTON FEEDBACK
// ============================================

/**
 * Initialize CTA button feedback
 */
function initializeCTAFeedback() {
    // Email CTAs
    safeQueryAll('a[href^="mailto:"]').forEach(link => {
        link.addEventListener('click', (e) => {
            console.log('📧 Email CTA clicked:', link.href);
            link.style.willChange = 'transform';
            link.style.transform = 'scale(0.95)';
            setTimeout(() => {
                link.style.transform = '';
                link.style.willChange = 'auto';
            }, 150);
        });
    });
    
    // SMS CTAs
    safeQueryAll('a[href^="sms:"]').forEach(link => {
        link.addEventListener('click', (e) => {
            console.log('📱 SMS CTA clicked:', link.href);
            link.style.willChange = 'transform';
            link.style.transform = 'scale(0.95)';
            setTimeout(() => {
                link.style.transform = '';
                link.style.willChange = 'auto';
            }, 150);
        });
    });
    
    console.log('📲 CTA button feedback initialized with will-change');
}

// ============================================
// PAGE LOAD HANDLING
// ============================================

/**
 * Window load event - final optimizations
 */
window.addEventListener('load', () => {
    console.log('🔥🪙 Vault Phoenix fully loaded!');
    
    // Optimize image loading after page load
    optimizeImageLoading();
    
    // Add phoenix flame effect to logo
    const logoIcon = safeQuery('.logo-icon');
    if (logoIcon) {
        logoIcon.style.filter = 'drop-shadow(0 0 15px rgba(215, 51, 39, 0.8))';
    }
    
    // Performance monitoring
    setTimeout(() => {
        const floatingCoins = safeQuery('.hero-floating-coins');
        if (floatingCoins) {
            console.log('✅ Floating coins active');
        }
        
        const mainScreenshot = safeQuery('#mainScreenshot');
        if (mainScreenshot && mainScreenshot.src.includes('images/')) {
            console.log('✅ Gallery images loaded');
        }
    }, 500);
    
    // Performance timing
    const loadTime = performance.now();
    console.log(`%c🔥 Page loaded in ${Math.round(loadTime)}ms`, 'color: #22c55e; font-weight: bold;');
});

// ============================================
// IMAGE PRELOADING
// ============================================

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
// FLOATING PARTICLES - MOBILE OPTIMIZED
// ============================================

/**
 * Create floating crypto particles (optimized for performance)
 */
function createFloatingParticles() {
    const hero = safeQuery('.hero');
    if (!hero) {
        console.warn('⚠️ Hero section not found');
        return;
    }
    
    // Skip particles if user prefers reduced motion
    if (DeviceInfo.prefersReducedMotion) {
        console.log('⚠️ Reduced motion enabled - skipping particles');
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
            will-change: transform;
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
            ${pos.top ? `top: ${pos.top};` : ''}
            ${pos.bottom ? `bottom: ${pos.bottom};` : ''}
            ${pos.left ? `left: ${pos.left};` : ''}
            ${pos.right ? `right: ${pos.right};` : ''}
        `;
        
        floatingCoins.appendChild(coin);
    });
    
    hero.insertBefore(floatingCoins, hero.firstChild);
    
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
    
    console.log(`🪙 ${particleCount} floating particles created with will-change optimization`);
}

// ============================================
// COIN IMAGE INTERACTIONS
// ============================================

/**
 * Initialize crypto coin image interactions
 */
function initializeCryptoCoinImage() {
    const cryptoImage = safeQuery('.phoenix-coin-image');
    if (!cryptoImage) return;
    
    // Skip hover effects on mobile
    if (DeviceInfo.isMobile) return;
    
    cryptoImage.addEventListener('mouseenter', function() {
        this.style.willChange = 'filter';
        this.style.filter = 'drop-shadow(0 0 30px rgba(251, 146, 60, 0.8)) brightness(1.1)';
    });
    
    cryptoImage.addEventListener('mouseleave', function() {
        this.style.filter = '';
        setTimeout(() => {
            this.style.willChange = 'auto';
        }, 300);
    });
    
    console.log('🪙 Crypto coin interactions initialized with will-change');
}

/**
 * Initialize ember coin image interactions
 */
function initializeEmberCoinImage() {
    const emberCoinImage = safeQuery('.phoenix-holding-coin-redesigned');
    if (!emberCoinImage) return;
    
    // Skip hover effects on mobile
    if (DeviceInfo.isMobile) return;
    
    emberCoinImage.addEventListener('mouseenter', function() {
        this.style.willChange = 'filter, transform';
        this.style.filter = 'drop-shadow(0 0 50px rgba(240, 165, 0, 0.9)) brightness(1.2)';
        this.style.transform = 'scale(1.1) translateY(-10px)';
    });
    
    emberCoinImage.addEventListener('mouseleave', function() {
        this.style.filter = '';
        this.style.transform = '';
        setTimeout(() => {
            this.style.willChange = 'auto';
        }, 300);
    });
    
    console.log('🪙 Ember coin interactions initialized with will-change');
}

// ============================================
// CRYPTO BENEFITS ANIMATIONS
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
                    entry.target.style.willChange = 'transform, opacity';
                    entry.target.style.transform = 'translateX(0)';
                    entry.target.style.opacity = '1';
                    
                    // Remove will-change after animation
                    setTimeout(() => {
                        entry.target.style.willChange = 'auto';
                    }, 600);
                    
                    const icon = entry.target.querySelector('.benefit-icon');
                    if (icon && !DeviceInfo.prefersReducedMotion) {
                        if (!document.querySelector('#coinBounceAnimation')) {
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
                        icon.style.willChange = 'transform';
                        icon.style.animation = 'coinBounce 0.6s ease-out';
                        setTimeout(() => {
                            icon.style.willChange = 'auto';
                        }, 600);
                    }
                }, index * 200);
            }
        });
    }, { threshold: 0.3 });
    
    benefits.forEach(benefit => {
        benefit.style.transform = 'translateX(-50px)';
        benefit.style.opacity = '0';
        benefitsObserver.observe(benefit);
    });
    
    console.log('💰 Crypto benefits animations initialized with will-change');
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
                    entry.target.style.willChange = 'transform, opacity';
                    entry.target.style.transform = 'translateX(0)';
                    entry.target.style.opacity = '1';
                    
                    // Remove will-change after animation
                    setTimeout(() => {
                        entry.target.style.willChange = 'auto';
                    }, 600);
                    
                    const emoji = entry.target.querySelector('.highlight-emoji-redesigned');
                    if (emoji && !DeviceInfo.prefersReducedMotion) {
                        if (!document.querySelector('#emberFlickerAnimation')) {
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
                        emoji.style.willChange = 'transform';
                        emoji.style.animation = 'emberFlicker 1s ease-in-out';
                        setTimeout(() => {
                            emoji.style.willChange = 'auto';
                        }, 1000);
                    }
                }, index * 150);
            }
        });
    }, { threshold: 0.3 });
    
    highlights.forEach(highlight => {
        highlight.style.transform = 'translateX(-30px)';
        highlight.style.opacity = '0';
        highlightsObserver.observe(highlight);
    });
    
    console.log('🔥 Ember highlights animations initialized with will-change');
}

// ============================================
// CTA BUTTON ENHANCEMENTS
// ============================================

/**
 * Enhance CTA buttons with effects
 */
safeQueryAll('.cta-button, .cta-primary, .cta-secondary, .demo-button, .join-presale-button-redesigned, .demo-button-enhanced').forEach(button => {
    // Skip effects on mobile or reduced motion
    if (DeviceInfo.isMobile || DeviceInfo.prefersReducedMotion) return;
    
    button.addEventListener('mouseenter', function() {
        this.style.willChange = 'filter';
        this.style.filter = 'brightness(1.1) saturate(1.2)';
    });
    
    button.addEventListener('mouseleave', function() {
        this.style.filter = '';
        setTimeout(() => {
            this.style.willChange = 'auto';
        }, 300);
    });
    
    button.addEventListener('mousedown', function() {
        this.style.willChange = 'transform';
        this.style.transform = 'scale(0.95)';
    });
    
    button.addEventListener('mouseup', function() {
        this.style.transform = '';
        setTimeout(() => {
            this.style.willChange = 'auto';
        }, 150);
    });
});

console.log('✨ CTA enhancements initialized with will-change');

// ============================================
// SCROLL PROGRESS INDICATOR
// ============================================

/**
 * Create scroll progress indicator
 */
function createScrollProgressIndicator() {
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
    
    const updateProgress = window.throttle(() => {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        indicator.style.width = scrolled + '%';
    }, 50);
    
    window.addEventListener('scroll', updateProgress, { passive: true });
    
    console.log('📊 Scroll progress indicator initialized with will-change');
}

// ============================================
// MOBILE PERFORMANCE OPTIMIZATIONS
// ============================================

/**
 * Apply mobile-specific performance optimizations
 */
function optimizeMobilePerformance() {
    console.log('📱 Applying mobile optimizations...');
    
    // Disable hover effects on touch devices
    document.body.classList.add('touch-device');
    
    // Optimize scroll performance
    const scrollElements = safeQueryAll('.allocation-cards-mobile');
    scrollElements.forEach(el => {
        el.style.webkitOverflowScrolling = 'touch';
        el.style.overscrollBehavior = 'contain';
    });
    
    // Reduce animation complexity
    if (DeviceInfo.isLowEndDevice()) {
        document.body.classList.add('low-end-device');
        console.log('📱 Low-end device optimizations applied');
    }
    
    // Handle orientation changes
    window.addEventListener('orientationchange', window.debounce(() => {
        console.log('📱 Orientation changed');
        DeviceInfo.screenWidth = window.innerWidth;
        DeviceInfo.screenHeight = window.innerHeight;
    }, 300));
    
    console.log('📱 Mobile optimizations complete');
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

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.code);
    if (konamiCode.length > konamiSequence.length) {
        konamiCode.shift();
    }
    
    if (konamiCode.join(',') === konamiSequence.join(',')) {
        console.log('🔥🪙 BONUS ACTIVATED!');
        
        // Create coin rain (reduced on mobile)
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
        
        konamiCode = [];
    }
});

// ============================================
// CONSOLE MESSAGES
// ============================================

console.log('%c🔥🪙 VAULT PHOENIX', 'color: #d73327; font-size: 24px; font-weight: bold;');
console.log('%c🚀 AR Crypto Gaming Revolution', 'color: #fb923c; font-size: 16px; font-weight: bold;');
console.log('%c📧 contact@vaultphoenix.com', 'color: #374151; font-size: 12px;');
console.log('%c💡 Senior Engineering - Mobile-First Architecture v3.1', 'color: #22c55e; font-size: 12px; font-weight: bold;');
console.log('%c✅ Integrated with shared-script.js (smooth scroll, countdown, mobile menu, navbar, chatbot, scroll reveal)', 'color: #3b82f6; font-size: 12px; font-weight: bold;');
console.log('Try the Konami Code for a surprise! ⬆️⬆️⬇️⬇️⬅️➡️⬅️➡️BA');
