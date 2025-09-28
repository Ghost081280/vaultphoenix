// Vault Phoenix - Loading Page JavaScript
// Phoenix Rising from Digital Ashes - Crypto Gaming Edition
// UPDATED: New PhoenixEmberSafe image and improved UX

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
    console.log('🔥🪙 Phoenix Crypto Loading System Initialized');
    
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
    
    // Initialize floating coins with proper z-index
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

// Initialize floating coins with proper layering and consistent visibility
function initializeFloatingCoins() {
    const floatingCoins = document.querySelector('.floating-coins');
    if (!floatingCoins) return;
    
    // Ensure floating coins stay in background
    floatingCoins.style.zIndex = '1';
    floatingCoins.style.pointerEvents = 'none';
    
    // Replace existing coin images with ember coin
    const coinImages = floatingCoins.querySelectorAll('.crypto-coin-icon');
    coinImages.forEach((img, index) => {
        img.src = 'images/VPEmberCoin.PNG';
        img.alt = 'Ember Coin';
        
        // Ensure coins start with consistent opacity and stay visible
        img.style.opacity = '0.6';
        img.style.transition = 'none'; // Remove transition to prevent flickering
        
        // Set consistent visibility immediately - no fade delays
        img.style.visibility = 'visible';
        img.style.display = 'block';
        
        // Error handling for image loading
        img.addEventListener('error', () => {
            console.warn('🔥🪙 Ember coin image failed to load, using fallback');
            img.style.display = 'none';
        });
        
        img.addEventListener('load', () => {
            console.log(`🔥🪙 Ember coin ${index + 1} loaded successfully`);
        });
    });
}

// Add interactive effects
function addInteractionEffects() {
    // Create additional floating coins on user interaction
    document.addEventListener('click', createInteractionCoin);
    document.addEventListener('touchstart', createInteractionCoin);
    
    // Phoenix image hover effect (for desktop)
    const phoenixImage = document.querySelector('.phoenix-image');
    if (phoenixImage) {
        // Enhanced hover effects for the new PhoenixEmberSafe image
        phoenixImage.addEventListener('mouseenter', () => {
            phoenixImage.style.transform = 'scale(1.1) rotate(5deg)';
            phoenixImage.style.filter = 'drop-shadow(0 0 50px rgba(240, 165, 0, 0.9))';
        });
        
        phoenixImage.addEventListener('mouseleave', () => {
            phoenixImage.style.transform = 'scale(1) rotate(0deg)';
            phoenixImage.style.filter = 'drop-shadow(0 0 30px rgba(215, 51, 39, 0.6))';
        });
        
        // Add click effect for mobile
        phoenixImage.addEventListener('click', () => {
            phoenixImage.style.animation = 'phoenixPulse 0.5s ease-out';
            setTimeout(() => {
                phoenixImage.style.animation = 'phoenixPulse 3s ease-in-out infinite';
            }, 500);
        });
        
        // Error handling for the new phoenix image
        phoenixImage.addEventListener('error', () => {
            console.warn('🔥🪙 PhoenixEmberSafe image failed to load - using fallback');
            phoenixImage.style.display = 'none';
            
            // Show fallback emoji with enhanced styling
            const fallback = document.createElement('div');
            fallback.innerHTML = '🔥🪙';
            fallback.style.cssText = `
                font-size: clamp(120px, 20vw, 180px);
                animation: phoenixPulse 3s ease-in-out infinite;
                filter: drop-shadow(0 0 30px rgba(240, 165, 0, 0.8));
                display: flex;
                align-items: center;
                justify-content: center;
                width: clamp(180px, 25vw, 240px);
                height: clamp(180px, 25vw, 240px);
                border-radius: 15px;
                background: rgba(215, 51, 39, 0.1);
                border: 2px solid rgba(240, 165, 0, 0.3);
            `;
            phoenixImage.parentNode.appendChild(fallback);
        });
        
        phoenixImage.addEventListener('load', () => {
            console.log('🔥🪙 PhoenixEmberSafe image loaded successfully');
        });
    }
}

// Create coin effect on interaction - using ember coin
function createInteractionCoin(event) {
    const coin = document.createElement('img');
    coin.src = 'images/VPEmberCoin.PNG';
    coin.alt = 'Ember Coin';
    coin.style.cssText = `
        position: fixed;
        pointer-events: none;
        width: clamp(25px, 5vw, 35px);
        height: clamp(25px, 5vw, 35px);
        z-index: 1000;
        animation: interactionCoin 1.5s ease-out forwards;
        filter: drop-shadow(0 0 8px rgba(240, 165, 0, 0.7));
        border-radius: 50%;
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
    }, 1500);
}

// Add interaction coin animation
const interactionCoinStyle = document.createElement('style');
interactionCoinStyle.textContent = `
    @keyframes interactionCoin {
        0% { 
            transform: translate(0, 0) scale(1) rotate(0deg); 
            opacity: 1; 
        }
        100% { 
            transform: translate(0, -100px) scale(0) rotate(360deg); 
            opacity: 0; 
        }
    }
`;
document.head.appendChild(interactionCoinStyle);

// Complete loading and transition - Enhanced with new image
function completeLoading() {
    isLoading = false;
    
    console.log('🔥🪙 Phoenix Crypto Loading Complete - Rising to Glory!');
    
    // Keep the same message - no change
    if (statusMessage) {
        statusMessage.textContent = "Awakening the Phoenix...";
    }
    
    // Add enhanced completion effects for new image
    addEnhancedCompletionEffects();
    
    // Transition to main site after effects
    setTimeout(() => {
        transitionToMainSite();
    }, 1500);
}

// Add enhanced completion effects for the new PhoenixEmberSafe image
function addEnhancedCompletionEffects() {
    // Intensify phoenix glow with new image considerations
    const phoenixImage = document.querySelector('.phoenix-image');
    const logoGlow = document.querySelector('.logo-glow');
    
    if (phoenixImage) {
        phoenixImage.style.filter = 'drop-shadow(0 0 60px rgba(240, 165, 0, 1)) brightness(1.1)';
        phoenixImage.style.transform = 'scale(1.1) rotate(3deg)';
        phoenixImage.classList.add('loading-complete');
    }
    
    if (logoGlow) {
        logoGlow.style.background = 'radial-gradient(circle, rgba(240, 165, 0, 0.6) 0%, rgba(215, 51, 39, 0.4) 40%, transparent 70%)';
        logoGlow.style.transform = 'translate(-50%, -50%) scale(1.3)';
        logoGlow.style.opacity = '0.8';
    }
    
    // Enhanced flash effect
    const flashEffect = document.createElement('div');
    flashEffect.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background: linear-gradient(45deg, 
            rgba(240, 165, 0, 0.3), 
            rgba(215, 51, 39, 0.3), 
            rgba(251, 146, 60, 0.3)
        );
        z-index: 5;
        animation: completionFlash 1.2s ease-out forwards;
        pointer-events: none;
    `;
    
    document.body.appendChild(flashEffect);
    
    // Trigger ember coin celebration
    const coinImages = document.querySelectorAll('.crypto-coin-icon');
    coinImages.forEach((coin, index) => {
        setTimeout(() => {
            coin.classList.add('loading-complete');
        }, index * 100);
    });
    
    // Remove flash effect
    setTimeout(() => {
        if (flashEffect.parentNode) {
            flashEffect.parentNode.removeChild(flashEffect);
        }
    }, 1200);
}

// Add completion flash animation
const completionFlashStyle = document.createElement('style');
completionFlashStyle.textContent = `
    @keyframes completionFlash {
        0% { opacity: 0; }
        30% { opacity: 0.8; }
        70% { opacity: 0.6; }
        100% { opacity: 0; }
    }
`;
document.head.appendChild(completionFlashStyle);

// Transition to main site with enhanced feedback
function transitionToMainSite() {
    // Fade out loading screen
    const loadingContainer = document.querySelector('.loading-container');
    
    if (loadingContainer) {
        loadingContainer.style.transition = 'opacity 1s ease-out, transform 1s ease-out';
        loadingContainer.style.opacity = '0';
        loadingContainer.style.transform = 'scale(0.95)';
        
        setTimeout(() => {
            // Redirect to main page
            window.location.href = 'main.html';
            
            console.log('🔥🪙 Welcome to Vault Phoenix - AR Crypto Gaming Revolution!');
        }, 1000);
    } else {
        // Fallback if container not found
        window.location.href = 'main.html';
    }
}

// Enhanced performance monitoring
function monitorPerformance() {
    const startTime = performance.now();
    
    // Track image loading performance
    const phoenixImage = document.querySelector('.phoenix-image');
    const coinImages = document.querySelectorAll('.crypto-coin-icon');
    
    let imagesLoaded = 0;
    const totalImages = 1 + coinImages.length; // Phoenix + coins
    
    function trackImageLoad() {
        imagesLoaded++;
        if (imagesLoaded === totalImages) {
            const imageLoadTime = performance.now() - startTime;
            console.log(`🔥🪙 All images loaded in ${Math.round(imageLoadTime)}ms`);
        }
    }
    
    if (phoenixImage) {
        phoenixImage.addEventListener('load', trackImageLoad);
        phoenixImage.addEventListener('error', trackImageLoad);
    }
    
    coinImages.forEach(coin => {
        coin.addEventListener('load', trackImageLoad);
        coin.addEventListener('error', trackImageLoad);
    });
    
    window.addEventListener('load', () => {
        const loadTime = performance.now() - startTime;
        console.log(`🔥🪙 Phoenix Loading Page loaded in ${Math.round(loadTime)}ms`);
    });
}

// Enhanced error handling
function setupErrorHandling() {
    window.addEventListener('error', (event) => {
        console.error('🔥🪙 Phoenix Loading Error:', event.error);
        
        // Enhanced fallback - still proceed to main site with user feedback
        const statusMessage = document.querySelector('.loading-status');
        if (statusMessage) {
            statusMessage.textContent = 'Phoenix experiencing turbulence... Redirecting...';
            statusMessage.style.color = '#fb923c';
        }
        
        setTimeout(() => {
            window.location.href = 'main.html';
        }, 3000);
    });
    
    // Enhanced image error handling for the new images
    const phoenixImage = document.querySelector('.phoenix-image');
    if (phoenixImage) {
        phoenixImage.addEventListener('error', () => {
            console.warn('🔥🪙 PhoenixEmberSafe image failed to load - implementing fallback');
        });
    }
    
    // Handle coin image errors
    const coinImages = document.querySelectorAll('.crypto-coin-icon');
    coinImages.forEach((coin, index) => {
        coin.addEventListener('error', () => {
            console.warn(`🔥🪙 Ember coin ${index + 1} failed to load`);
            coin.style.display = 'none'; // Hide broken coin
        });
    });
}

// Enhanced responsive handling
function handleResponsiveChanges() {
    let currentOrientation = window.orientation || 0;
    
    window.addEventListener('orientationchange', () => {
        setTimeout(() => {
            const newOrientation = window.orientation || 0;
            if (newOrientation !== currentOrientation) {
                currentOrientation = newOrientation;
                console.log('🔥🪙 Orientation changed - adjusting layout');
                
                // Trigger layout recalculation
                const phoenixImage = document.querySelector('.phoenix-image');
                if (phoenixImage) {
                    phoenixImage.style.transform = 'scale(1.01)';
                    setTimeout(() => {
                        phoenixImage.style.transform = '';
                    }, 100);
                }
            }
        }, 100);
    });
    
    // Handle resize events
    window.addEventListener('resize', debounce(() => {
        console.log('🔥🪙 Window resized - optimizing display');
    }, 250));
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

// Initialize everything when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    initializeLoading();
    monitorPerformance();
    setupErrorHandling();
    handleResponsiveChanges();
    
    console.log('🔥🪙 VAULT PHOENIX LOADING SYSTEM ACTIVATED');
    console.log('🚀 Phoenix Rising from Digital Ashes with new PhoenixEmberSafe image...');
});

// Console welcome message
console.log('%c🔥🪙 VAULT PHOENIX - LOADING SEQUENCE INITIATED', 'color: #d73327; font-size: 24px; font-weight: bold; text-shadow: 2px 2px 4px rgba(0,0,0,0.3);');
console.log('%c🚀 From ashes to crypto greatness - Phoenix Loading with Enhanced UX!', 'color: #fb923c; font-size: 14px; font-weight: bold;');
console.log('%c🔥 PhoenixEmberSafe image loaded - New visual identity activated!', 'color: #f0a500; font-size: 12px; font-weight: bold;');
