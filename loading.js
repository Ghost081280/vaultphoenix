// Vault Phoenix - Loading Page JavaScript
// Phoenix Rising from Digital Ashes - Senior UX/UI Design

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
    console.log('🔥🪙 Phoenix Crypto Loading System Initialized - Professional UX');
    
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
    
    // Initialize floating coins with STRICT background positioning
    initializeFloatingCoins();
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

// PROFESSIONAL: Initialize floating coins with STRICT background positioning
function initializeFloatingCoins() {
    const floatingCoins = document.querySelector('.floating-coins');
    if (!floatingCoins) return;
    
    // ENFORCE strict background positioning
    floatingCoins.style.zIndex = '-5';
    floatingCoins.style.pointerEvents = 'none';
    
    // FIXED: Update coin image sources to use VPEmberCoin.PNG
    const coinImages = floatingCoins.querySelectorAll('.crypto-coin-icon');
    coinImages.forEach((img, index) => {
        img.src = 'images/VPEmberCoin.PNG';
        img.alt = 'VP Ember Coin';
        
        // PROFESSIONAL styling - minimal visual impact
        img.style.opacity = '0.3';
        img.style.transition = 'none'; // Remove transitions to prevent interference
        img.style.visibility = 'visible';
        img.style.display = 'block';
        img.style.pointerEvents = 'none';
        img.style.zIndex = '-5';
        
        // Ensure consistent sizing
        img.style.width = 'clamp(25px, 3vw, 40px)';
        img.style.height = 'clamp(25px, 3vw, 40px)';
    });
    
    console.log('🔥🪙 Floating coins initialized with professional UX positioning');
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
    
    console.log('🔥🪙 Phoenix Crypto Loading Complete - Professional Transition!');
    
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
            
            console.log('🔥🪙 Welcome to Vault Phoenix - Professional AR Crypto Gaming!');
        }, 1000);
    }
}

// Performance monitoring
function monitorPerformance() {
    const startTime = performance.now();
    
    window.addEventListener('load', () => {
        const loadTime = performance.now() - startTime;
        console.log(`🔥🪙 Professional Phoenix Loading completed in ${Math.round(loadTime)}ms`);
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
                font-size: 8rem;
                animation: phoenixPulse 3s ease-in-out infinite;
                filter: drop-shadow(0 0 40px rgba(215, 51, 39, 0.8));
            `;
            phoenixImage.parentNode.appendChild(fallback);
        });
        
        phoenixImage.addEventListener('load', () => {
            console.log('🔥🪙 Phoenix image loaded successfully - Professional UX ready');
        });
    }
    
    // Handle coin image errors
    document.querySelectorAll('.crypto-coin-icon').forEach(coinImg => {
        coinImg.addEventListener('error', () => {
            console.warn('🔥🪙 Coin image failed to load:', coinImg.src);
            coinImg.style.display = 'none'; // Hide broken coins
        });
    });
}

// PROFESSIONAL: Device-specific optimizations
function applyDeviceOptimizations() {
    const isMobile = window.innerWidth <= 768;
    const isSmallMobile = window.innerWidth <= 480;
    
    // Reduce coin count on mobile for performance
    if (isSmallMobile) {
        document.querySelectorAll('.coin-3, .coin-4, .coin-5, .coin-6').forEach(coin => {
            coin.style.display = 'none';
        });
    } else if (isMobile) {
        document.querySelectorAll('.coin-5, .coin-6').forEach(coin => {
            coin.style.opacity = '0.2';
        });
    }
    
    // Adjust animation performance based on device
    if (navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4) {
        // Reduce animations on lower-end devices
        document.querySelectorAll('.coin').forEach(coin => {
            coin.style.animationDuration = '12s'; // Slower, less intensive
        });
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
    console.log('🔥🪙 VAULT PHOENIX PROFESSIONAL LOADING SYSTEM ACTIVATED');
    
    initializeLoading();
    monitorPerformance();
    setupErrorHandling();
    applyDeviceOptimizations();
    enhanceAccessibility();
    
    console.log('🔥🪙 Professional UX loading sequence initiated...');
});

// Professional console welcome message
console.log('%c🔥🪙 VAULT PHOENIX - PROFESSIONAL LOADING SEQUENCE', 'color: #d73327; font-size: 24px; font-weight: bold; text-shadow: 2px 2px 4px rgba(0,0,0,0.3);');
console.log('%c🚀 Senior UX/UI Design - Optimized for all devices', 'color: #fb923c; font-size: 14px; font-weight: bold;');
console.log('%c📱 Professional loading experience with accessibility support', 'color: #f0a500; font-size: 12px; font-style: italic;');
