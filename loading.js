// Vault Phoenix - Loading Page JavaScript
// Phoenix Rising from Digital Ashes - Crypto Gaming Edition

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
    statusMessage.textContent = loadingMessages[0];
    
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
        progressBar.style.width = currentProgress + '%';
        percentageDisplay.textContent = Math.floor(currentProgress) + '%';
        
        // Show spark effect when progress is moving
        if (currentProgress < targetProgress) {
            spark.style.opacity = '1';
        } else {
            spark.style.opacity = '0';
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
    
    // Replace existing coin images with golden coin
    const coinImages = floatingCoins.querySelectorAll('.crypto-coin-icon');
    coinImages.forEach((img, index) => {
        img.src = 'images/F784709F-BE0F-4902-A67E-AC5775B02F38.PNG';
        img.alt = 'Golden Crypto Coin';
        
        // Ensure coins start with consistent opacity and stay visible
        img.style.opacity = '0.6';
        img.style.transition = 'none'; // Remove transition to prevent flickering
        
        // Set consistent visibility immediately - no fade delays
        img.style.visibility = 'visible';
        img.style.display = 'block';
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
        phoenixImage.addEventListener('mouseenter', () => {
            phoenixImage.style.transform = 'scale(1.1) rotate(5deg)';
            phoenixImage.style.filter = 'drop-shadow(0 0 50px rgba(215, 51, 39, 0.9))';
        });
        
        phoenixImage.addEventListener('mouseleave', () => {
            phoenixImage.style.transform = 'scale(1) rotate(0deg)';
            phoenixImage.style.filter = 'drop-shadow(0 0 30px rgba(215, 51, 39, 0.6))';
        });
    }
}

// Create coin effect on interaction - using golden coin
function createInteractionCoin(event) {
    const coin = document.createElement('img');
    coin.src = 'images/F784709F-BE0F-4902-A67E-AC5775B02F38.PNG';
    coin.alt = 'Golden Crypto Coin';
    coin.style.cssText = `
        position: fixed;
        pointer-events: none;
        width: 30px;
        height: 30px;
        z-index: 1;
        animation: interactionCoin 1.5s ease-out forwards;
        filter: drop-shadow(0 0 8px rgba(240, 165, 0, 0.7));
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

// Complete loading and transition - NO COIN BURST
function completeLoading() {
    isLoading = false;
    
    console.log('🔥🪙 Phoenix Crypto Loading Complete - Rising to Glory!');
    
    // Keep the same message - no change
    statusMessage.textContent = "Awakening the Phoenix...";
    
    // Add simple completion effects WITHOUT coin burst
    addSimpleCompletionEffects();
    
    // Transition to main site after effects
    setTimeout(() => {
        transitionToMainSite();
    }, 1500);
}

// Add simple completion effects WITHOUT spinning coins
function addSimpleCompletionEffects() {
    // Intensify phoenix glow
    const phoenixImage = document.querySelector('.phoenix-image');
    const logoGlow = document.querySelector('.logo-glow');
    
    if (phoenixImage) {
        phoenixImage.style.filter = 'drop-shadow(0 0 60px rgba(215, 51, 39, 1))';
        phoenixImage.style.transform = 'scale(1.1)';
    }
    
    if (logoGlow) {
        logoGlow.style.background = 'radial-gradient(circle, rgba(215, 51, 39, 0.6) 0%, transparent 70%)';
        logoGlow.style.transform = 'translate(-50%, -50%) scale(1.3)';
    }
    
    // Flash effect
    const flashEffect = document.createElement('div');
    flashEffect.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background: linear-gradient(45deg, rgba(215, 51, 39, 0.3), rgba(251, 146, 60, 0.3));
        z-index: 5;
        animation: completionFlash 1s ease-out forwards;
        pointer-events: none;
    `;
    
    document.body.appendChild(flashEffect);
    
    // Remove flash effect
    setTimeout(() => {
        if (flashEffect.parentNode) {
            flashEffect.parentNode.removeChild(flashEffect);
        }
    }, 1000);
}

// Add completion flash animation
const completionFlashStyle = document.createElement('style');
completionFlashStyle.textContent = `
    @keyframes completionFlash {
        0% { opacity: 0; }
        50% { opacity: 1; }
        100% { opacity: 0; }
    }
`;
document.head.appendChild(completionFlashStyle);

// Transition to main site
function transitionToMainSite() {
    // Fade out loading screen
    const loadingContainer = document.querySelector('.loading-container');
    
    loadingContainer.style.transition = 'opacity 1s ease-out';
    loadingContainer.style.opacity = '0';
    
    setTimeout(() => {
        // Redirect to main page
        window.location.href = 'main.html';
        
        console.log('🔥🪙 Welcome to Vault Phoenix - AR Crypto Gaming Revolution!');
    }, 1000);
}

// Performance monitoring
function monitorPerformance() {
    const startTime = performance.now();
    
    window.addEventListener('load', () => {
        const loadTime = performance.now() - startTime;
        console.log(`🔥🪙 Phoenix Loading Page loaded in ${Math.round(loadTime)}ms`);
    });
}

// Error handling
function setupErrorHandling() {
    window.addEventListener('error', (event) => {
        console.error('🔥🪙 Phoenix Loading Error:', event.error);
        
        // Fallback - still proceed to main site
        setTimeout(() => {
            window.location.href = 'main.html';
        }, 3000);
    });
    
    // Handle image loading errors
    const phoenixImage = document.querySelector('.phoenix-image');
    if (phoenixImage) {
        phoenixImage.addEventListener('error', () => {
            console.warn('🔥🪙 Phoenix image failed to load - using fallback');
            phoenixImage.style.display = 'none';
            
            // Show fallback emoji
            const fallback = document.createElement('div');
            fallback.innerHTML = '🔥🪙';
            fallback.style.cssText = `
                font-size: 6rem;
                animation: phoenixPulse 3s ease-in-out infinite;
            `;
            phoenixImage.parentNode.appendChild(fallback);
        });
        
        phoenixImage.addEventListener('load', () => {
            console.log('🔥🪙 Phoenix image loaded successfully');
        });
    }
}

// Initialize everything when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    initializeLoading();
    monitorPerformance();
    setupErrorHandling();
    
    console.log('🔥🪙 VAULT PHOENIX LOADING SYSTEM ACTIVATED');
    console.log('🚀 Phoenix Rising from Digital Ashes...');
});

// Console welcome message
console.log('%c🔥🪙 VAULT PHOENIX - LOADING SEQUENCE INITIATED', 'color: #d73327; font-size: 24px; font-weight: bold; text-shadow: 2px 2px 4px rgba(0,0,0,0.3);');
console.log('%c🚀 From ashes to crypto greatness - Phoenix Loading!', 'color: #fb923c; font-size: 14px; font-weight: bold;');
