// Vault Phoenix - Loading Page JavaScript
// Phoenix Rising from Digital Ashes - ENHANCED UX/UI Design
// MAJOR UPDATE: Enhanced layout monitoring and responsive optimizations

// Loading messages array - Phoenix crypto themed
const loadingMessages = [
    "Awakening the Phoenix..."
];

// Loading progress simulation
let currentProgress = 0;
let targetProgress = 0;
let messageIndex = 0;
let isLoading = true;

// DOM elements
const progressBar = document.querySelector('.loading-progress');
const percentageDisplay = document.querySelector('.loading-percentage');
const statusMessage = document.querySelector('.loading-status');
const spark = document.querySelector('.loading-spark');

// Initialize loading
function initializeLoading() {
    console.log('🔥🪙 Phoenix Crypto Loading System - ENHANCED: Larger layout optimized');
    
    // Start the loading simulation
    simulateLoading();
    
    // Update progress animation
    updateProgress();
    
    // Set the single loading message
    if (statusMessage) {
        statusMessage.textContent = loadingMessages[0];
    }
    
    // Add interaction feedback
    addInteractionEffects();
    
    // Initialize all 12 floating coins
    initializeAllFloatingCoins();
    
    // ENHANCED: Monitor layout for optimal sizing
    monitorLayoutOptimization();
    
    // Monitor viewport changes for responsive adjustments
    monitorViewportChanges();
}

// Simulate realistic loading progress
function simulateLoading() {
    const phases = [
        { duration: 1200, progress: 18 },   // Initial load
        { duration: 1600, progress: 38 },   // Asset loading  
        { duration: 2200, progress: 65 },   // System initialization
        { duration: 2000, progress: 88 },   // Final preparations
        { duration: 1400, progress: 100 }   // Complete
    ];
    
    let currentPhase = 0;
    
    function nextPhase() {
        if (currentPhase < phases.length) {
            const phase = phases[currentPhase];
            targetProgress = phase.progress;
            
            setTimeout(() => {
                currentPhase++;
                nextPhase();
            }, phase.duration);
        } else {
            // Loading complete - transition to main site
            setTimeout(() => {
                completeLoading();
            }, 600);
        }
    }
    
    nextPhase();
}

// Smooth progress bar animation
function updateProgress() {
    if (currentProgress < targetProgress) {
        currentProgress += Math.random() * 2.5 + 0.8; // Slightly faster for better UX
        
        if (currentProgress > targetProgress) {
            currentProgress = targetProgress;
        }
        
        // Update progress bar
        if (progressBar) {
            progressBar.style.width = currentProgress + '%';
        }
        if (percentageDisplay) {
            percentageDisplay.textContent = Math.floor(currentProgress) + '%';
        }
        
        // Show spark effect when progress is moving
        if (spark) {
            if (currentProgress < targetProgress) {
                spark.style.opacity = '1';
            } else {
                spark.style.opacity = '0';
            }
        }
    }
    
    // Continue animation if still loading
    if (isLoading) {
        requestAnimationFrame(updateProgress);
    }
}

// ENHANCED: Initialize all 12 floating coins with improved setup
function initializeAllFloatingCoins() {
    const floatingCoins = document.querySelector('.floating-coins');
    if (!floatingCoins) {
        console.error('🔥🪙 ERROR: floating-coins container not found!');
        return;
    }
    
    // ENFORCE strict background positioning
    floatingCoins.style.zIndex = '-5';
    floatingCoins.style.pointerEvents = 'none';
    
    // Get all 12 coin images and set them up properly
    const coinImages = floatingCoins.querySelectorAll('.crypto-coin-icon');
    console.log(`🔥🪙 Found ${coinImages.length} coin images to initialize`);
    
    coinImages.forEach((img, index) => {
        // Ensure correct image source
        img.src = 'images/VPEmberCoin.PNG';
        img.alt = 'VP Ember Coin';
        
        // ENHANCED styling with better visibility
        img.style.opacity = '0.4'; // More visible than before
        img.style.transition = 'none';
        img.style.visibility = 'visible';
        img.style.display = 'block';
        img.style.pointerEvents = 'none';
        img.style.zIndex = '-5';
        
        // Responsive sizing with better scaling
        img.style.width = 'clamp(25px, 3vw, 40px)';
        img.style.height = 'clamp(25px, 3vw, 40px)';
        
        // Enhanced glow for visual interest
        const glowIntensity = 0.5 + (index % 4) * 0.15; // Vary between 0.5-0.95
        img.style.filter = `drop-shadow(0 0 6px rgba(240, 165, 0, ${glowIntensity}))`;
        
        // Add error handling for each coin
        img.addEventListener('error', function() {
            console.warn(`🔥🪙 Coin ${index + 1} image failed to load:`, this.src);
            this.style.display = 'none';
        });
        
        img.addEventListener('load', function() {
            console.log(`🔥🪙 Coin ${index + 1} loaded successfully`);
            this.style.opacity = '0.4';
        });
    });
    
    // Ensure parent coins have proper positioning
    const coinContainers = floatingCoins.querySelectorAll('.coin');
    coinContainers.forEach((coin, index) => {
        coin.style.zIndex = '-5';
        coin.style.pointerEvents = 'none';
        console.log(`🔥🪙 Coin container ${index + 1} initialized`);
    });
    
    console.log('🔥🪙 All 12 floating coins initialized with enhanced visibility');
}

// ENHANCED: Monitor layout optimization for proper content sizing
function monitorLayoutOptimization() {
    function checkLayoutOptimization() {
        const loadingContent = document.querySelector('.loading-content');
        const phoenixImage = document.querySelector('.phoenix-image');
        const statusElement = document.querySelector('.loading-status');
        
        if (!loadingContent || !phoenixImage || !statusElement) return;
        
        const contentRect = loadingContent.getBoundingClientRect();
        const imageRect = phoenixImage.getBoundingClientRect();
        const statusRect = statusElement.getBoundingClientRect();
        
        const viewportHeight = window.innerHeight;
        const viewportWidth = window.innerWidth;
        
        console.log('🔥🪙 Layout Analysis:', {
            viewport: `${viewportWidth}x${viewportHeight}`,
            contentHeight: contentRect.height,
            imageSize: `${imageRect.width}x${imageRect.height}`,
            statusVisible: statusRect.bottom <= viewportHeight,
            contentFitsScreen: contentRect.height <= viewportHeight * 0.95
        });
        
        // Ensure everything is visible and well-sized
        if (statusRect.bottom > viewportHeight) {
            console.warn('🔥🪙 Status text below viewport - applying compact mode');
            applyCompactMode();
        }
        
        // Check if phoenix image is taking up good screen real estate
        const imageScreenPercentage = (imageRect.width * imageRect.height) / (viewportWidth * viewportHeight);
        if (imageScreenPercentage < 0.15) {
            console.log('🔥🪙 Phoenix image could be larger for better impact');
        } else if (imageScreenPercentage > 0.4) {
            console.log('🔥🪙 Phoenix image might be too large, checking mobile optimization');
        } else {
            console.log('🔥🪙 ✓ Phoenix image size is optimal for current viewport');
        }
    }
    
    // Check optimization after DOM load and on resize
    setTimeout(checkLayoutOptimization, 200);
    window.addEventListener('resize', debounce(checkLayoutOptimization, 250));
}

// NEW: Monitor viewport changes for responsive adjustments
function monitorViewportChanges() {
    let currentViewport = {
        width: window.innerWidth,
        height: window.innerHeight,
        orientation: window.innerWidth > window.innerHeight ? 'landscape' : 'portrait'
    };
    
    function handleViewportChange() {
        const newViewport = {
            width: window.innerWidth,
            height: window.innerHeight,
            orientation: window.innerWidth > window.innerHeight ? 'landscape' : 'portrait'
        };
        
        // Detect significant changes
        const widthChange = Math.abs(newViewport.width - currentViewport.width);
        const heightChange = Math.abs(newViewport.height - currentViewport.height);
        const orientationChange = newViewport.orientation !== currentViewport.orientation;
        
        if (widthChange > 50 || heightChange > 50 || orientationChange) {
            console.log('🔥🪙 Significant viewport change detected:', {
                from: currentViewport,
                to: newViewport
            });
            
            // Apply responsive optimizations
            applyResponsiveOptimizations(newViewport);
            
            // Update layout monitoring
            setTimeout(() => monitorLayoutOptimization(), 100);
        }
        
        currentViewport = newViewport;
    }
    
    window.addEventListener('resize', debounce(handleViewportChange, 150));
    window.addEventListener('orientationchange', () => {
        setTimeout(handleViewportChange, 300); // Delay for orientation change
    });
}

// NEW: Apply responsive optimizations based on viewport
function applyResponsiveOptimizations(viewport) {
    const loadingContent = document.querySelector('.loading-content');
    const phoenixImage = document.querySelector('.phoenix-image');
    
    if (!loadingContent || !phoenixImage) return;
    
    // Reset any previous optimizations
    loadingContent.style.transform = '';
    loadingContent.style.gap = '';
    
    // Apply optimizations based on viewport characteristics
    if (viewport.height < 600) {
        console.log('🔥🪙 Applying short screen optimizations');
        loadingContent.style.gap = 'clamp(6px, 0.8vh, 10px)';
        
        if (viewport.orientation === 'landscape') {
            console.log('🔥🪙 Landscape mode detected - optimizing layout');
            // CSS handles landscape mode automatically
        }
    }
    
    if (viewport.width < 480) {
        console.log('🔥🪙 Applying very small screen optimizations');
        // Additional optimizations for very small screens if needed
    }
    
    // Large screen optimizations
    if (viewport.width > 1600 && viewport.height > 900) {
        console.log('🔥🪙 Large screen detected - enhancing visual impact');
        loadingContent.style.gap = 'clamp(20px, 4vh, 30px)';
    }
}

// NEW: Apply compact mode if content doesn't fit
function applyCompactMode() {
    const loadingContent = document.querySelector('.loading-content');
    if (loadingContent) {
        loadingContent.style.transform = 'scale(0.85)';
        loadingContent.style.gap = 'clamp(8px, 1vh, 12px)';
        console.log('🔥🪙 Compact mode applied for better fit');
    }
}

// Utility function for debouncing
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Add interactive effects
function addInteractionEffects() {
    // Minimal interaction coins on user action
    document.addEventListener('click', createInteractionCoin);
    document.addEventListener('touchstart', createInteractionCoin);
    
    // ENHANCED Phoenix image hover effect (desktop only)
    const phoenixImage = document.querySelector('.phoenix-image');
    if (phoenixImage) {
        phoenixImage.addEventListener('mouseenter', () => {
            phoenixImage.style.transform = 'scale(1.08) rotate(3deg)';
            phoenixImage.style.filter = 'drop-shadow(0 0 70px rgba(215, 51, 39, 1))';
        });
        
        phoenixImage.addEventListener('mouseleave', () => {
            phoenixImage.style.transform = 'scale(1) rotate(0deg)';
            phoenixImage.style.filter = 'drop-shadow(0 0 50px rgba(215, 51, 39, 0.9))';
        });
    }
}

// ENHANCED: Create interaction coin effect with better sizing
function createInteractionCoin(event) {
    const coin = document.createElement('img');
    coin.src = 'images/VPEmberCoin.PNG';
    coin.alt = 'VP Ember Coin';
    coin.style.cssText = `
        position: fixed;
        pointer-events: none;
        width: 30px;
        height: 30px;
        z-index: 1000;
        animation: interactionCoin 1.3s ease-out forwards;
        filter: drop-shadow(0 0 8px rgba(240, 165, 0, 0.8));
    `;
    
    // Position at click/touch location
    const x = event.clientX || (event.touches && event.touches[0].clientX) || window.innerWidth / 2;
    const y = event.clientY || (event.touches && event.touches[0].clientY) || window.innerHeight / 2;
    
    coin.style.left = (x - 15) + 'px'; // Center the coin
    coin.style.top = (y - 15) + 'px';
    
    document.body.appendChild(coin);
    
    // Remove after animation
    setTimeout(() => {
        if (coin.parentNode) {
            coin.parentNode.removeChild(coin);
        }
    }, 1300);
}

// Enhanced interaction coin animation
const interactionCoinStyle = document.createElement('style');
interactionCoinStyle.textContent = `
    @keyframes interactionCoin {
        0% { 
            transform: translate(0, 0) scale(1) rotate(0deg); 
            opacity: 1; 
        }
        100% { 
            transform: translate(0, -90px) scale(0) rotate(360deg); 
            opacity: 0; 
        }
    }
`;
document.head.appendChild(interactionCoinStyle);

// Complete loading and transition
function completeLoading() {
    isLoading = false;
    
    console.log('🔥🪙 Phoenix Crypto Loading Complete - Enhanced layout successful!');
    
    // Keep the message
    if (statusMessage) {
        statusMessage.textContent = "Awakening the Phoenix...";
    }
    
    // Add enhanced completion effects
    addEnhancedCompletionEffects();
    
    // Transition to main site after effects
    setTimeout(() => {
        transitionToMainSite();
    }, 1600);
}

// ENHANCED: More dramatic completion effects
function addEnhancedCompletionEffects() {
    // Enhanced phoenix glow
    const phoenixImage = document.querySelector('.phoenix-image');
    const logoGlow = document.querySelector('.logo-glow');
    
    if (phoenixImage) {
        phoenixImage.style.filter = 'drop-shadow(0 0 100px rgba(215, 51, 39, 1))';
        phoenixImage.style.transform = 'scale(1.15)';
    }
    
    if (logoGlow) {
        logoGlow.style.background = 'radial-gradient(circle, rgba(215, 51, 39, 0.8) 0%, transparent 70%)';
        logoGlow.style.transform = 'translate(-50%, -50%) scale(1.5)';
    }
    
    // ENHANCED: Create dramatic completion coin burst
    createDramaticCompletionCoinBurst();
    
    // Enhanced flash effect
    const flashEffect = document.createElement('div');
    flashEffect.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background: linear-gradient(45deg, rgba(215, 51, 39, 0.4), rgba(251, 146, 60, 0.4));
        z-index: 5;
        animation: enhancedFlash 1.4s ease-out forwards;
        pointer-events: none;
    `;
    
    document.body.appendChild(flashEffect);
    
    // Remove flash effect
    setTimeout(() => {
        if (flashEffect.parentNode) {
            flashEffect.parentNode.removeChild(flashEffect);
        }
    }, 1400);
}

// ENHANCED: Create more dramatic completion coin burst
function createDramaticCompletionCoinBurst() {
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    
    // Create 15 coins for more dramatic effect
    for (let i = 0; i < 15; i++) {
        const coin = document.createElement('img');
        coin.src = 'images/VPEmberCoin.PNG';
        coin.alt = 'VP Ember Completion Coin';
        
        const angle = (i / 15) * Math.PI * 2;
        const distance = Math.random() * 100 + 150; // Varied distance
        const endX = centerX + Math.cos(angle) * distance;
        const endY = centerY + Math.sin(angle) * distance;
        
        coin.style.cssText = `
            position: fixed;
            width: ${Math.random() * 15 + 35}px;
            height: ${Math.random() * 15 + 35}px;
            left: ${centerX - 20}px;
            top: ${centerY - 20}px;
            z-index: 1000;
            pointer-events: none;
            filter: drop-shadow(0 0 15px rgba(240, 165, 0, 0.9));
            animation: enhancedCoinBurst${i} 2s ease-out forwards;
        `;
        
        // Create unique animation for each coin
        const coinBurstStyle = document.createElement('style');
        coinBurstStyle.textContent = `
            @keyframes enhancedCoinBurst${i} {
                0% { 
                    transform: translate(0, 0) scale(1) rotate(0deg); 
                    opacity: 1; 
                }
                100% { 
                    transform: translate(${endX - centerX}px, ${endY - centerY}px) scale(0) rotate(${720 + Math.random() * 360}deg); 
                    opacity: 0; 
                }
            }
        `;
        document.head.appendChild(coinBurstStyle);
        
        document.body.appendChild(coin);
        
        // Remove after animation
        setTimeout(() => {
            if (coin.parentNode) {
                coin.parentNode.removeChild(coin);
            }
        }, 2000);
    }
}

// Enhanced flash animation
const enhancedFlashStyle = document.createElement('style');
enhancedFlashStyle.textContent = `
    @keyframes enhancedFlash {
        0% { opacity: 0; }
        30% { opacity: 0.9; }
        100% { opacity: 0; }
    }
`;
document.head.appendChild(enhancedFlashStyle);

// Smooth transition to main site
function transitionToMainSite() {
    const loadingContainer = document.querySelector('.loading-container');
    
    if (loadingContainer) {
        loadingContainer.style.transition = 'opacity 1.2s ease-out';
        loadingContainer.style.opacity = '0';
        
        setTimeout(() => {
            // Redirect to main page
            window.location.href = 'main.html';
            
            console.log('🔥🪙 Welcome to Vault Phoenix - Enhanced layout complete!');
        }, 1200);
    }
}

// Enhanced performance monitoring
function monitorPerformance() {
    const startTime = performance.now();
    
    window.addEventListener('load', () => {
        const loadTime = performance.now() - startTime;
        console.log(`🔥🪙 Enhanced Phoenix Loading completed in ${Math.round(loadTime)}ms`);
        
        // Enhanced coin visibility check
        const coinImages = document.querySelectorAll('.crypto-coin-icon');
        console.log(`🔥🪙 Final check: ${coinImages.length} coins found after load`);
        
        let visibleCoins = 0;
        coinImages.forEach((coin, index) => {
            if (coin.style.display !== 'none' && coin.offsetParent !== null) {
                visibleCoins++;
                console.log(`🔥🪙 Coin ${index + 1}: ✓ Visible`);
            } else {
                console.warn(`🔥🪙 Coin ${index + 1}: ✗ Hidden`);
            }
        });
        
        console.log(`🔥🪙 Total visible coins: ${visibleCoins}/${coinImages.length}`);
    });
}

// Enhanced error handling
function setupErrorHandling() {
    window.addEventListener('error', (event) => {
        console.error('🔥🪙 Phoenix Loading Error:', event.error);
        
        // Professional fallback - still proceed to main site
        setTimeout(() => {
            window.location.href = 'main.html';
        }, 3000);
    });
    
    // Handle image loading errors with enhanced fallback
    const phoenixImage = document.querySelector('.phoenix-image');
    if (phoenixImage) {
        phoenixImage.addEventListener('error', () => {
            console.warn('🔥🪙 Phoenix image failed to load - using enhanced fallback');
            phoenixImage.style.display = 'none';
            
            // Show enhanced fallback
            const fallback = document.createElement('div');
            fallback.innerHTML = '🔥🪙';
            fallback.style.cssText = `
                font-size: clamp(4rem, 15vw, 8rem);
                animation: phoenixPulse 3s ease-in-out infinite;
                filter: drop-shadow(0 0 50px rgba(215, 51, 39, 0.9));
                text-align: center;
            `;
            phoenixImage.parentNode.appendChild(fallback);
        });
        
        phoenixImage.addEventListener('load', () => {
            console.log('🔥🪙 Phoenix image loaded successfully - Enhanced layout ready');
        });
    }
}

// ENHANCED: Device-specific optimizations
function applyDeviceOptimizations() {
    const isMobile = window.innerWidth <= 768;
    const isSmallMobile = window.innerWidth <= 480;
    const isShortScreen = window.innerHeight <= 700;
    const isLandscape = window.innerWidth > window.innerHeight;
    
    console.log('🔥🪙 Device characteristics:', {
        isMobile,
        isSmallMobile, 
        isShortScreen,
        isLandscape,
        viewport: `${window.innerWidth}x${window.innerHeight}`
    });
    
    // Enhanced short screen handling
    if (isShortScreen) {
        console.log('🔥🪙 Short screen detected - applying enhanced compact optimizations');
        const loadingContent = document.querySelector('.loading-content');
        if (loadingContent && !isLandscape) {
            loadingContent.style.gap = 'clamp(6px, 0.8vh, 10px)';
        }
    }
    
    // Enhanced mobile coin management
    if (isSmallMobile) {
        document.querySelectorAll('.coin-3, .coin-4, .coin-5, .coin-6, .coin-7, .coin-8, .coin-9, .coin-10, .coin-11, .coin-12').forEach(coin => {
            coin.style.display = 'none';
        });
        console.log('🔥🪙 Small mobile optimization: Reduced to 2 coins');
    } else if (isMobile) {
        document.querySelectorAll('.coin-7, .coin-8, .coin-11, .coin-12').forEach(coin => {
            coin.style.display = 'none';
        });
        console.log('🔥🪙 Mobile optimization: Reduced to 8 coins');
    } else {
        console.log('🔥🪙 Desktop optimization: All 12 coins active');
    }
    
    // Enhanced performance optimization
    if (navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4) {
        document.querySelectorAll('.coin').forEach(coin => {
            coin.style.animationDuration = '14s'; // Even slower for low-end devices
        });
        console.log('🔥🪙 Performance optimization: Slower animations for low-end device');
    }
}

// Enhanced accessibility
function enhanceAccessibility() {
    // Respect user's motion preferences
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        document.querySelectorAll('.coin, .crypto-coin-icon').forEach(element => {
            element.style.animation = 'none';
            element.style.opacity = '0.1';
        });
        
        const phoenixImage = document.querySelector('.phoenix-image');
        if (phoenixImage) {
            phoenixImage.style.animation = 'none';
        }
        
        console.log('🔥🪙 Reduced motion mode activated for accessibility');
    }
    
    // High contrast mode support
    if (window.matchMedia && window.matchMedia('(prefers-contrast: high)').matches) {
        document.querySelectorAll('.crypto-coin-icon').forEach(coin => {
            coin.style.opacity = '0.1';
        });
        
        console.log('🔥🪙 High contrast mode activated');
    }
    
    // Enhanced focus management
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Tab') {
            // Prevent tab navigation on loading screen
            e.preventDefault();
        }
    });
}

// Initialize everything when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    console.log('🔥🪙 VAULT PHOENIX ENHANCED LOADING SYSTEM ACTIVATED');
    
    initializeLoading();
    monitorPerformance();
    setupErrorHandling();
    applyDeviceOptimizations();
    enhanceAccessibility();
    
    console.log('🔥🪙 Enhanced loading sequence with larger layout and optimized sizing initiated...');
});

// Enhanced console welcome message
console.log('%c🔥🪙 VAULT PHOENIX - ENHANCED LOADING SYSTEM', 'color: #d73327; font-size: 24px; font-weight: bold; text-shadow: 2px 2px 4px rgba(0,0,0,0.3);');
console.log('%c🚀 ENHANCED: Larger phoenix image and optimized content layout', 'color: #fb923c; font-size: 14px; font-weight: bold;');
console.log('%c🪙 Responsive optimization with enhanced mobile/desktop support', 'color: #f0a500; font-size: 12px; font-style: italic;');
