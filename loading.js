// Vault Phoenix - Loading Page JavaScript
// Phoenix Rising from Digital Ashes - Senior UX/UI Design
// FINAL FIX: All 12 coins working + "Awakening the Phoenix" visible on desktop

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
    console.log('🔥🪙 Phoenix Crypto Loading System - FINAL FIX: All content visible');
    
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
    
    // Monitor layout to ensure "Awakening the Phoenix" is visible
    monitorLayoutVisibility();
}

// Simulate realistic loading progress
function simulateLoading() {
    const phases = [
        { duration: 1000, progress: 15 },   // Initial load
        { duration: 1500, progress: 35 },   // Asset loading
        { duration: 2000, progress: 60 },   // System initialization
        { duration: 1800, progress: 85 },   // Final preparations
        { duration: 1200, progress: 100 }   // Complete
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
            }, 500);
        }
    }
    
    nextPhase();
}

// Smooth progress bar animation
function updateProgress() {
    if (currentProgress < targetProgress) {
        currentProgress += Math.random() * 2 + 0.5; // Variable speed for realism
        
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

// FINAL FIX: Initialize all 12 floating coins with proper setup
function initializeAllFloatingCoins() {
    const floatingCoins = document.querySelector('.floating-coins');
    if (!floatingCoins) {
        console.error('🔥🪙 ERROR: floating-coins container not found!');
        return;
    }
    
    // ENFORCE strict background positioning
    floatingCoins.style.zIndex = '-5';
    floatingCoins.style.pointerEvents = 'none';
    
    // CRITICAL: Get all 12 coin images and set them up properly
    const coinImages = floatingCoins.querySelectorAll('.crypto-coin-icon');
    console.log(`🔥🪙 Found ${coinImages.length} coin images to initialize`);
    
    coinImages.forEach((img, index) => {
        // Ensure correct image source
        img.src = 'images/VPEmberCoin.PNG';
        img.alt = 'VP Ember Coin';
        
        // PROFESSIONAL styling with enhanced visibility
        img.style.opacity = '0.3'; // More visible
        img.style.transition = 'none'; // Remove transitions to prevent interference
        img.style.visibility = 'visible';
        img.style.display = 'block';
        img.style.pointerEvents = 'none';
        img.style.zIndex = '-5';
        
        // Ensure consistent sizing with responsive scaling
        img.style.width = 'clamp(20px, 2.5vw, 32px)';
        img.style.height = 'clamp(20px, 2.5vw, 32px)';
        
        // Add variation in glow for visual interest
        const glowIntensity = 0.4 + (index % 4) * 0.1; // Vary between 0.4-0.7
        img.style.filter = `drop-shadow(0 0 5px rgba(240, 165, 0, ${glowIntensity}))`;
        
        // Add error handling for each coin
        img.addEventListener('error', function() {
            console.warn(`🔥🪙 Coin ${index + 1} image failed to load:`, this.src);
            this.style.display = 'none';
        });
        
        img.addEventListener('load', function() {
            console.log(`🔥🪙 Coin ${index + 1} loaded successfully`);
            this.style.opacity = '0.3';
        });
    });
    
    // ENSURE parent coins have proper positioning
    const coinContainers = floatingCoins.querySelectorAll('.coin');
    coinContainers.forEach((coin, index) => {
        coin.style.zIndex = '-5';
        coin.style.pointerEvents = 'none';
        console.log(`🔥🪙 Coin container ${index + 1} initialized`);
    });
    
    console.log('🔥🪙 All 12 floating coins initialized successfully');
}

// NEW: Monitor layout to ensure bottom text is visible
function monitorLayoutVisibility() {
    function checkVisibility() {
        const statusElement = document.querySelector('.loading-status');
        if (statusElement) {
            const rect = statusElement.getBoundingClientRect();
            const isVisible = rect.bottom <= window.innerHeight;
            
            if (!isVisible) {
                console.warn('🔥🪙 WARNING: "Awakening the Phoenix" text is below viewport!');
                console.log('🔥🪙 Element bottom:', rect.bottom, 'Window height:', window.innerHeight);
                
                // Emergency fix: reduce content size
                const loadingContent = document.querySelector('.loading-content');
                if (loadingContent) {
                    loadingContent.style.transform = 'scale(0.9)';
                    loadingContent.style.marginTop = '10px';
                    console.log('🔥🪙 Applied emergency scaling to fit content');
                }
            } else {
                console.log('🔥🪙 ✓ "Awakening the Phoenix" text is visible on screen');
            }
        }
    }
    
    // Check visibility after DOM load and on resize
    setTimeout(checkVisibility, 100);
    window.addEventListener('resize', checkVisibility);
}

// Add interactive effects
function addInteractionEffects() {
    // MINIMAL interaction coins on user action
    document.addEventListener('click', createInteractionCoin);
    document.addEventListener('touchstart', createInteractionCoin);
    
    // Phoenix image hover effect (desktop only)
    const phoenixImage = document.querySelector('.phoenix-image');
    if (phoenixImage) {
        phoenixImage.addEventListener('mouseenter', () => {
            phoenixImage.style.transform = 'scale(1.08) rotate(3deg)';
            phoenixImage.style.filter = 'drop-shadow(0 0 60px rgba(215, 51, 39, 1))';
        });
        
        phoenixImage.addEventListener('mouseleave', () => {
            phoenixImage.style.transform = 'scale(1) rotate(0deg)';
            phoenixImage.style.filter = 'drop-shadow(0 0 40px rgba(215, 51, 39, 0.8))';
        });
    }
}

// PROFESSIONAL: Create minimal interaction coin effect
function createInteractionCoin(event) {
    const coin = document.createElement('img');
    coin.src = 'images/VPEmberCoin.PNG';
    coin.alt = 'VP Ember Coin';
    coin.style.cssText = `
        position: fixed;
        pointer-events: none;
        width: 25px;
        height: 25px;
        z-index: 1000;
        animation: interactionCoin 1.2s ease-out forwards;
        filter: drop-shadow(0 0 6px rgba(240, 165, 0, 0.7));
    `;
    
    // Position at click/touch location
    const x = event.clientX || (event.touches && event.touches[0].clientX) || window.innerWidth / 2;
    const y = event.clientY || (event.touches && event.touches[0].clientY) || window.innerHeight / 2;
    
    coin.style.left = (x - 12) + 'px'; // Center the coin
    coin.style.top = (y - 12) + 'px';
    
    document.body.appendChild(coin);
    
    // Remove after animation
    setTimeout(() => {
        if (coin.parentNode) {
            coin.parentNode.removeChild(coin);
        }
    }, 1200);
}

// Professional interaction coin animation
const interactionCoinStyle = document.createElement('style');
interactionCoinStyle.textContent = `
    @keyframes interactionCoin {
        0% { 
            transform: translate(0, 0) scale(1) rotate(0deg); 
            opacity: 1; 
        }
        100% { 
            transform: translate(0, -80px) scale(0) rotate(270deg); 
            opacity: 0; 
        }
    }
`;
document.head.appendChild(interactionCoinStyle);

// Complete loading and transition
function completeLoading() {
    isLoading = false;
    
    console.log('🔥🪙 Phoenix Crypto Loading Complete - All content visible!');
    
    // Keep the same message
    if (statusMessage) {
        statusMessage.textContent = "Awakening the Phoenix...";
    }
    
    // Add professional completion effects
    addProfessionalCompletionEffects();
    
    // Transition to main site after effects
    setTimeout(() => {
        transitionToMainSite();
    }, 1500);
}

// PROFESSIONAL completion effects
function addProfessionalCompletionEffects() {
    // Enhanced phoenix glow
    const phoenixImage = document.querySelector('.phoenix-image');
    const logoGlow = document.querySelector('.logo-glow');
    
    if (phoenixImage) {
        phoenixImage.style.filter = 'drop-shadow(0 0 80px rgba(215, 51, 39, 1))';
        phoenixImage.style.transform = 'scale(1.1)';
    }
    
    if (logoGlow) {
        logoGlow.style.background = 'radial-gradient(circle, rgba(215, 51, 39, 0.7) 0%, transparent 70%)';
        logoGlow.style.transform = 'translate(-50%, -50%) scale(1.4)';
    }
    
    // ENHANCED: Create completion coin burst effect with all coins
    createEnhancedCompletionCoinBurst();
    
    // Professional flash effect
    const flashEffect = document.createElement('div');
    flashEffect.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background: linear-gradient(45deg, rgba(215, 51, 39, 0.3), rgba(251, 146, 60, 0.3));
        z-index: 5;
        animation: professionalFlash 1.2s ease-out forwards;
        pointer-events: none;
    `;
    
    document.body.appendChild(flashEffect);
    
    // Remove flash effect
    setTimeout(() => {
        if (flashEffect.parentNode) {
            flashEffect.parentNode.removeChild(flashEffect);
        }
    }, 1200);
}

// ENHANCED: Create more dramatic completion coin burst effect
function createEnhancedCompletionCoinBurst() {
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    
    // Create 12 coins that burst outward from center (matching our 12 floating coins)
    for (let i = 0; i < 12; i++) {
        const coin = document.createElement('img');
        coin.src = 'images/VPEmberCoin.PNG';
        coin.alt = 'VP Ember Completion Coin';
        
        const angle = (i / 12) * Math.PI * 2;
        const distance = 150;
        const endX = centerX + Math.cos(angle) * distance;
        const endY = centerY + Math.sin(angle) * distance;
        
        coin.style.cssText = `
            position: fixed;
            width: 32px;
            height: 32px;
            left: ${centerX - 16}px;
            top: ${centerY - 16}px;
            z-index: 1000;
            pointer-events: none;
            filter: drop-shadow(0 0 12px rgba(240, 165, 0, 0.9));
            animation: coinBurst${i} 1.8s ease-out forwards;
        `;
        
        // Create unique animation for each coin
        const coinBurstStyle = document.createElement('style');
        coinBurstStyle.textContent = `
            @keyframes coinBurst${i} {
                0% { 
                    transform: translate(0, 0) scale(1) rotate(0deg); 
                    opacity: 1; 
                }
                100% { 
                    transform: translate(${endX - centerX}px, ${endY - centerY}px) scale(0) rotate(720deg); 
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
        }, 1800);
    }
}

// Professional flash animation
const professionalFlashStyle = document.createElement('style');
professionalFlashStyle.textContent = `
    @keyframes professionalFlash {
        0% { opacity: 0; }
        30% { opacity: 0.8; }
        100% { opacity: 0; }
    }
`;
document.head.appendChild(professionalFlashStyle);

// Smooth transition to main site
function transitionToMainSite() {
    const loadingContainer = document.querySelector('.loading-container');
    
    if (loadingContainer) {
        loadingContainer.style.transition = 'opacity 1s ease-out';
        loadingContainer.style.opacity = '0';
        
        setTimeout(() => {
            // Redirect to main page
            window.location.href = 'main.html';
            
            console.log('🔥🪙 Welcome to Vault Phoenix - All content optimized!');
        }, 1000);
    }
}

// Performance monitoring
function monitorPerformance() {
    const startTime = performance.now();
    
    window.addEventListener('load', () => {
        const loadTime = performance.now() - startTime;
        console.log(`🔥🪙 Final optimized Phoenix Loading completed in ${Math.round(loadTime)}ms`);
        
        // Double-check coin visibility after load
        const coinImages = document.querySelectorAll('.crypto-coin-icon');
        console.log(`🔥🪙 Final check: ${coinImages.length} coins found after load`);
        
        coinImages.forEach((coin, index) => {
            if (coin.style.display !== 'none') {
                console.log(`🔥🪙 Coin ${index + 1}: ✓ Visible`);
            } else {
                console.warn(`🔥🪙 Coin ${index + 1}: ✗ Hidden`);
            }
        });
    });
}

// Professional error handling
function setupErrorHandling() {
    window.addEventListener('error', (event) => {
        console.error('🔥🪙 Phoenix Loading Error:', event.error);
        
        // Professional fallback - still proceed to main site
        setTimeout(() => {
            window.location.href = 'main.html';
        }, 3000);
    });
    
    // Handle image loading errors
    const phoenixImage = document.querySelector('.phoenix-image');
    if (phoenixImage) {
        phoenixImage.addEventListener('error', () => {
            console.warn('🔥🪙 Phoenix image failed to load - using professional fallback');
            phoenixImage.style.display = 'none';
            
            // Show professional fallback
            const fallback = document.createElement('div');
            fallback.innerHTML = '🔥🪙';
            fallback.style.cssText = `
                font-size: 4rem;
                animation: phoenixPulse 3s ease-in-out infinite;
                filter: drop-shadow(0 0 40px rgba(215, 51, 39, 0.8));
            `;
            phoenixImage.parentNode.appendChild(fallback);
        });
        
        phoenixImage.addEventListener('load', () => {
            console.log('🔥🪙 Phoenix image loaded successfully - Final layout ready');
        });
    }
}

// ENHANCED: Device-specific optimizations for all 12 coins
function applyDeviceOptimizations() {
    const isMobile = window.innerWidth <= 768;
    const isSmallMobile = window.innerWidth <= 480;
    const isShortScreen = window.innerHeight <= 700;
    
    // Additional check for short screens regardless of width
    if (isShortScreen) {
        console.log('🔥🪙 Short screen detected - applying compact optimizations');
        const loadingContent = document.querySelector('.loading-content');
        if (loadingContent) {
            loadingContent.style.transform = 'scale(0.85)';
            loadingContent.style.marginTop = '5px';
        }
    }
    
    // Reduce coin count on mobile for performance
    if (isSmallMobile) {
        // Hide most coins on small mobile
        document.querySelectorAll('.coin-3, .coin-4, .coin-5, .coin-6, .coin-7, .coin-8, .coin-9, .coin-10, .coin-11, .coin-12').forEach(coin => {
            coin.style.display = 'none';
        });
        console.log('🔥🪙 Small mobile optimization: Reduced to 2 coins');
    } else if (isMobile) {
        // Hide some coins on regular mobile
        document.querySelectorAll('.coin-7, .coin-8, .coin-11, .coin-12').forEach(coin => {
            coin.style.display = 'none';
        });
        console.log('🔥🪙 Mobile optimization: Reduced to 8 coins');
    } else {
        console.log('🔥🪙 Desktop optimization: All 12 coins active');
    }
    
    // Adjust animation performance based on device
    if (navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4) {
        // Reduce animations on lower-end devices
        document.querySelectorAll('.coin').forEach(coin => {
            coin.style.animationDuration = '12s'; // Slower, less intensive
        });
        console.log('🔥🪙 Performance optimization: Slower animations for low-end device');
    }
}

// PROFESSIONAL: Accessibility enhancements
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
}

// Initialize everything when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    console.log('🔥🪙 VAULT PHOENIX FINAL OPTIMIZED LOADING SYSTEM ACTIVATED');
    
    initializeLoading();
    monitorPerformance();
    setupErrorHandling();
    applyDeviceOptimizations();
    enhanceAccessibility();
    
    console.log('🔥🪙 Final loading sequence with all 12 coins and full content visibility initiated...');
});

// Professional console welcome message
console.log('%c🔥🪙 VAULT PHOENIX - FINAL OPTIMIZED LOADING', 'color: #d73327; font-size: 24px; font-weight: bold; text-shadow: 2px 2px 4px rgba(0,0,0,0.3);');
console.log('%c🚀 FINAL FIX: "Awakening the Phoenix" always visible on desktop', 'color: #fb923c; font-size: 14px; font-weight: bold;');
console.log('%c🪙 All 12 strategic coins active with responsive optimization', 'color: #f0a500; font-size: 12px; font-style: italic;');
