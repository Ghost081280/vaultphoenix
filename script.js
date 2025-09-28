// Vault Phoenix - Interactive JavaScript
// Phoenix Rising from Digital Ashes - RESTORED: Hero floating coins

// Enhanced gallery function with correct image order
function changeImage(imageSrc, title) {
    const mainImg = document.getElementById('mainScreenshot');
    const showcaseTitle = document.getElementById('showcaseTitle');
    const thumbs = document.querySelectorAll('.simple-thumb');
    
    if (mainImg) {
        mainImg.style.opacity = '0.7';
        setTimeout(() => {
            mainImg.src = imageSrc;
            mainImg.style.opacity = '1';
        }, 150);
    }
    
    if (showcaseTitle) {
        showcaseTitle.textContent = title;
    }
    
    // Update active states with smooth transitions
    thumbs.forEach(thumb => {
        thumb.classList.remove('active');
    });
    
    // Find and activate clicked thumb
    thumbs.forEach(thumb => {
        if (thumb.getAttribute('onclick') && thumb.getAttribute('onclick').includes(imageSrc)) {
            thumb.classList.add('active');
        }
    });
}

// Enhanced navbar scroll effect with phoenix crypto theme
window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Enhanced scroll reveal animation with phoenix crypto timing
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -80px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.classList.add('revealed');
            }, index * 100);
        }
    });
}, observerOptions);

document.querySelectorAll('.scroll-reveal').forEach(el => {
    observer.observe(el);
});

// Smooth scrolling with offset for fixed navbar
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 100;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Enhanced interactive card effects with phoenix crypto animation
document.querySelectorAll('.feature-card, .use-case-card, .simple-thumb, .crypto-benefit, .ember-highlight').forEach(card => {
    card.addEventListener('mouseenter', function() {
        if (this.classList.contains('simple-thumb')) {
            this.style.transform = 'translateY(-5px) scale(1.05)';
        } else if (this.classList.contains('crypto-benefit')) {
            this.style.transform = 'translateX(15px)';
        } else if (this.classList.contains('ember-highlight')) {
            this.style.transform = 'translateX(8px)';
        } else {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        }
        
        // Add subtle phoenix glow effect
        if (this.classList.contains('feature-card') || this.classList.contains('use-case-card')) {
            this.style.boxShadow = '0 30px 80px rgba(215, 51, 39, 0.2)';
        }
    });
    
    card.addEventListener('mouseleave', function() {
        if (!this.classList.contains('active')) {
            this.style.transform = 'translateY(0) scale(1)';
            if (this.classList.contains('crypto-benefit') || this.classList.contains('ember-highlight')) {
                this.style.transform = 'translateX(0)';
            }
            this.style.boxShadow = '';
        }
    });
});

// Enhanced stats animation - EXCLUDES Ember Token stats to prevent spinning numbers
function animateStats() {
    // CRITICAL: Only target showcase and revenue stats, NEVER ember stats
    const stats = document.querySelectorAll('.showcase-stat .stat-number, .revenue-number');
    stats.forEach(stat => {
        // Extra safety check to avoid ember stats
        if (stat.closest('.ember-token-section') || stat.closest('.ember-stats-compact') || stat.closest('.stat-pair')) {
            return; // Skip ember token stats completely
        }
        
        const finalValue = stat.textContent;
        const numericValue = parseFloat(finalValue.replace(/[^\d.]/g, ''));
        
        if (numericValue && numericValue > 0) {
            let currentValue = 0;
            const duration = 2500; // Slightly longer for dramatic effect
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

// Trigger stats animation when visible
const heroObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            setTimeout(animateStats, 500);
            heroObserver.disconnect();
        }
    });
});

const heroSection = document.querySelector('.hero');
if (heroSection) {
    heroObserver.observe(heroSection);
}

// Auto-rotate gallery showcase with phoenix crypto-themed images
let currentImageIndex = 0;
const imageRotation = [
    { src: 'images/IMG_7910.PNG', title: 'Phoenix Crypto Collection System' },
    { src: 'images/IMG_4380.jpg', title: 'Legendary Coin Discovery' },
    { src: 'images/IMG_4383.jpg', title: 'Phoenix Crypto Dashboard' },
    { src: 'images/IMG_4381.jpg', title: 'AR Crypto Hunt Mode' },
    { src: 'images/IMG_4382.jpg', title: 'Crypto Territory Map' },
    { src: 'images/IMG_4378.jpg', title: 'Phoenix Navigation System' }
];

function autoRotateGallery() {
    const showcaseSection = document.getElementById('showcase');
    if (!showcaseSection) return;
    
    const rect = showcaseSection.getBoundingClientRect();
    const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
    
    if (isVisible) {
        currentImageIndex = (currentImageIndex + 1) % imageRotation.length;
        const currentImage = imageRotation[currentImageIndex];
        changeImage(currentImage.src, currentImage.title);
    }
}

// Start auto-rotation after page load
let autoRotateInterval;
setTimeout(() => {
    autoRotateInterval = setInterval(autoRotateGallery, 4500);
}, 3000);

// Pause auto-rotation when user interacts with thumbnails
document.querySelectorAll('.simple-thumb').forEach(thumb => {
    thumb.addEventListener('click', () => {
        if (autoRotateInterval) {
            clearInterval(autoRotateInterval);
        }
        setTimeout(() => {
            autoRotateInterval = setInterval(autoRotateGallery, 4500);
        }, 15000);
    });
});

// MOBILE MENU SYSTEM
document.addEventListener('DOMContentLoaded', function() {
    console.log('🔥🪙 Phoenix Crypto Rising - DOM loaded, initializing mobile menu...');
    
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenuBtn && navLinks) {
        // Add click handler to mobile menu button
        mobileMenuBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            // Toggle the mobile-active class
            if (navLinks.classList.contains('mobile-active')) {
                // Close menu
                navLinks.classList.remove('mobile-active');
                mobileMenuBtn.innerHTML = '☰';
                document.body.style.overflow = '';
            } else {
                // Open menu
                navLinks.classList.add('mobile-active');
                mobileMenuBtn.innerHTML = '✕';
                document.body.style.overflow = 'hidden';
            }
        });

        // Close menu when clicking nav links
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', function() {
                navLinks.classList.remove('mobile-active');
                mobileMenuBtn.innerHTML = '☰';
                document.body.style.overflow = '';
            });
        });

        // Close on escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && navLinks.classList.contains('mobile-active')) {
                navLinks.classList.remove('mobile-active');
                mobileMenuBtn.innerHTML = '☰';
                document.body.style.overflow = '';
            }
        });

        // Close when clicking outside
        document.addEventListener('click', function(e) {
            if (navLinks.classList.contains('mobile-active') && 
                !navLinks.contains(e.target) && 
                !mobileMenuBtn.contains(e.target)) {
                navLinks.classList.remove('mobile-active');
                mobileMenuBtn.innerHTML = '☰';
                document.body.style.overflow = '';
            }
        });
    }
});

// Enhanced form validation and UX with phoenix crypto theme
document.querySelectorAll('a[href^="mailto:"]').forEach(link => {
    link.addEventListener('click', (e) => {
        // Add subtle animation feedback
        link.style.transform = 'scale(0.95)';
        setTimeout(() => {
            link.style.transform = '';
        }, 150);
    });
});

// Enhanced smooth loading for fade-in elements
function initializeSmoothLoading() {
    console.log('🔥🪙 Phoenix: Initializing smooth loading...');
    
    // Trigger fade-in animations for hero elements
    setTimeout(() => {
        document.querySelectorAll('.fade-in').forEach((el, index) => {
            setTimeout(() => {
                el.classList.add('visible');
            }, index * 150);
        });
    }, 800);
}

// Add error handling for images
document.querySelectorAll('img').forEach(img => {
    img.addEventListener('error', function() {
        console.warn('🔥🪙 Phoenix crypto image failed to load:', this.src);
        this.style.opacity = '0.5';
        this.alt = 'Phoenix crypto image rising...';
    });
    
    img.addEventListener('load', function() {
        this.style.opacity = '1';
    });
});

// Preload critical phoenix crypto images for better performance
function preloadPhoenixCryptoImages() {
    const criticalImages = [
        'images/PhoenixHoldingCoin.PNG',
        'images/IMG_7910.PNG',
        'images/9FBD9FC3-8B64-44F7-9B5A-785531847CB9.PNG',
        'images/VPEmberCoin.PNG',
        'images/IMG_4380.jpg',
        'images/IMG_4383.jpg',
        'images/IMG_4381.jpg'
    ];
    
    criticalImages.forEach(src => {
        const img = new Image();
        img.src = src;
    });
}

// RESTORED: Phoenix crypto coin floating effect for hero section
function createPhoenixCryptoParticles() {
    const hero = document.querySelector('.hero');
    if (!hero) return;
    
    // Create floating coins container that stays strictly in background
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
    
    // Coin positions to avoid content areas - kept away from center
    const coinPositions = [
        { top: '15%', left: '8%', delay: '0s', duration: '6s' },
        { top: '75%', left: '12%', delay: '1s', duration: '7s' },
        { top: '25%', right: '8%', delay: '2s', duration: '8s' },
        { top: '65%', right: '12%', delay: '3s', duration: '6s' },
        { top: '10%', left: '85%', delay: '4s', duration: '7s' },
        { bottom: '15%', right: '88%', delay: '5s', duration: '9s' },
        { top: '35%', left: '5%', delay: '6s', duration: '8s' },
        { top: '55%', right: '6%', delay: '7s', duration: '7s' }
    ];
    
    coinPositions.forEach((pos, index) => {
        const coin = document.createElement('div');
        coin.className = `hero-coin hero-coin-${index + 1}`;
        
        const coinImg = document.createElement('img');
        coinImg.src = 'images/VPEmberCoin.PNG';
        coinImg.alt = 'VP Ember Coin';
        coinImg.className = 'hero-crypto-coin-icon';
        coinImg.style.cssText = `
            width: clamp(25px, 3vw, 40px);
            height: clamp(25px, 3vw, 40px);
            object-fit: contain;
            filter: drop-shadow(0 0 8px rgba(240, 165, 0, 0.6));
            transition: all 0.3s ease;
            opacity: 0.4;
            visibility: visible;
            display: block;
        `;
        
        coin.appendChild(coinImg);
        
        // Apply positioning with strict background z-index
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
    
    // Insert at the very beginning of hero section to ensure background positioning
    hero.insertBefore(floatingCoins, hero.firstChild);
    
    // Add coin animation CSS
    const style = document.createElement('style');
    style.textContent = `
        @keyframes heroCoinFloat {
            0%, 100% { 
                transform: translateY(0px) rotate(0deg) scale(1); 
                opacity: 0.3; 
            }
            25% { 
                transform: translateY(-15px) rotate(90deg) scale(1.05); 
                opacity: 0.5; 
            }
            50% { 
                transform: translateY(-8px) rotate(180deg) scale(0.95); 
                opacity: 0.4; 
            }
            75% { 
                transform: translateY(-18px) rotate(270deg) scale(1.1); 
                opacity: 0.45; 
            }
        }
        
        /* Ensure coins stay in background on all screen sizes */
        .hero-floating-coins,
        .hero-coin,
        .hero-crypto-coin-icon {
            z-index: 1 !important;
            pointer-events: none !important;
        }
        
        /* Mobile responsive sizing */
        @media (max-width: 768px) {
            .hero-crypto-coin-icon {
                width: clamp(20px, 3vw, 30px) !important;
                height: clamp(20px, 3vw, 30px) !important;
                opacity: 0.3 !important;
            }
        }
        
        @media (max-width: 480px) {
            .hero-crypto-coin-icon {
                width: clamp(15px, 2.5vw, 25px) !important;
                height: clamp(15px, 2.5vw, 25px) !important;
                opacity: 0.25 !important;
            }
            
            /* Hide some coins on very small screens */
            .hero-coin:nth-child(n+5) {
                display: none;
            }
        }
        
        /* Hover effects */
        .hero-coin:hover .hero-crypto-coin-icon {
            transform: scale(1.2);
            filter: drop-shadow(0 0 15px rgba(240, 165, 0, 1)) brightness(1.2);
        }
    `;
    document.head.appendChild(style);
}

// Enhanced crypto coin image interaction
function initializeCryptoCoinImage() {
    const cryptoImage = document.querySelector('.phoenix-coin-image');
    if (!cryptoImage) return;
    
    // Add special crypto coin glow effect on hover
    cryptoImage.addEventListener('mouseenter', function() {
        this.style.filter = 'drop-shadow(0 0 30px rgba(251, 146, 60, 0.8)) brightness(1.1)';
    });
    
    cryptoImage.addEventListener('mouseleave', function() {
        this.style.filter = '';
    });
    
    // Add subtle floating animation
    let time = 0;
    setInterval(() => {
        time += 0.02;
        const sideMovement = Math.sin(time) * 8;
        const upDownMovement = Math.cos(time * 0.8) * 3;
        cryptoImage.style.transform = `translateX(${sideMovement}px) translateY(${upDownMovement}px)`;
    }, 50);
}

// Enhanced Ember Phoenix Image interaction
function initializeEmberPhoenixImage() {
    const emberImage = document.querySelector('.ember-phoenix-image');
    if (!emberImage) return;
    
    // Add special ember glow effect on hover
    emberImage.addEventListener('mouseenter', function() {
        this.style.filter = 'drop-shadow(0 0 40px rgba(240, 165, 0, 0.9)) brightness(1.15)';
        this.style.transform = 'translateY(-8px) scale(1.05)';
    });
    
    emberImage.addEventListener('mouseleave', function() {
        this.style.filter = '';
        this.style.transform = '';
    });
    
    // Add subtle floating animation
    let emberTime = 0;
    setInterval(() => {
        emberTime += 0.015;
        const floatMovement = Math.sin(emberTime) * 5;
        const rotateMovement = Math.cos(emberTime * 0.7) * 2;
        if (!emberImage.matches(':hover')) {
            emberImage.style.transform = `translateY(${floatMovement}px) rotate(${rotateMovement}deg)`;
        }
    }, 60);
}

// Enhanced interactive feedback for buttons
document.querySelectorAll('.cta-button, .cta-primary, .cta-secondary, .demo-button, .ember-cta-primary, .ember-cta-secondary').forEach(button => {
    button.addEventListener('mouseenter', function() {
        this.style.filter = 'brightness(1.1) saturate(1.2)';
        
        // Very subtle glow effect
        if (Math.random() > 0.9) {
            const glow = document.createElement('div');
            glow.style.cssText = `
                position: absolute;
                width: 6px;
                height: 6px;
                background: radial-gradient(circle, rgba(240, 165, 0, 0.8) 0%, transparent 70%);
                border-radius: 50%;
                animation: subtleGlow 0.5s ease-out forwards;
                pointer-events: none;
                top: ${Math.random() * 10 - 5}px;
                left: ${Math.random() * 10 - 5}px;
                z-index: 1000;
            `;
            this.style.position = 'relative';
            this.appendChild(glow);
            
            setTimeout(() => glow.remove(), 500);
        }
    });
    
    button.addEventListener('mouseleave', function() {
        this.style.filter = '';
    });
    
    button.addEventListener('mousedown', function() {
        this.style.transform = 'scale(0.95)';
    });
    
    button.addEventListener('mouseup', function() {
        this.style.transform = '';
    });
});

// Subtle glow animation
const subtleGlowStyle = document.createElement('style');
subtleGlowStyle.textContent = `
    @keyframes subtleGlow {
        0% { transform: translateY(0) scale(1); opacity: 1; }
        100% { transform: translateY(-10px) scale(0); opacity: 0; }
    }
`;
document.head.appendChild(subtleGlowStyle);

// Minimal scroll progress indicator
function createPhoenixCryptoScrollIndicator() {
    const indicator = document.createElement('div');
    indicator.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        height: 3px;
        background: linear-gradient(90deg, #d73327, #fb923c, #f0a500);
        z-index: 9999;
        transition: width 0.3s ease;
        width: 0%;
        box-shadow: 0 1px 8px rgba(215, 51, 39, 0.3);
    `;
    document.body.appendChild(indicator);
    
    window.addEventListener('scroll', () => {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        indicator.style.width = scrolled + '%';
        
        // Minimal phoenix icon at end
        if (scrolled > 98 && !indicator.querySelector('.scroll-phoenix')) {
            const phoenix = document.createElement('div');
            phoenix.innerHTML = '🔥';
            phoenix.className = 'scroll-phoenix';
            phoenix.style.cssText = `
                position: absolute;
                right: -8px;
                top: -6px;
                font-size: 12px;
                filter: drop-shadow(0 0 3px rgba(240, 165, 0, 0.6));
                z-index: 10000;
            `;
            indicator.appendChild(phoenix);
        }
    });
}

// Crypto benefits animation on scroll
function initializeCryptoBenefits() {
    const benefits = document.querySelectorAll('.crypto-benefit');
    if (!benefits.length) return;
    
    const benefitsObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.transform = 'translateX(0)';
                    entry.target.style.opacity = '1';
                    
                    // Subtle icon effect
                    const icon = entry.target.querySelector('.benefit-icon');
                    if (icon) {
                        icon.style.animation = 'iconBounce 0.4s ease-out';
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
    
    // Clean bounce animation
    const iconBounceStyle = document.createElement('style');
    iconBounceStyle.textContent = `
        @keyframes iconBounce {
            0% { transform: scale(1); }
            50% { transform: scale(1.1); }
            100% { transform: scale(1); }
        }
    `;
    document.head.appendChild(iconBounceStyle);
}

// Initialize Ember highlights animation on scroll
function initializeEmberHighlights() {
    const highlights = document.querySelectorAll('.ember-highlight');
    if (!highlights.length) return;
    
    const highlightsObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.transform = 'translateX(0)';
                    entry.target.style.opacity = '1';
                    
                    // Subtle glow effect
                    const icon = entry.target.querySelector('.highlight-icon');
                    if (icon) {
                        icon.style.animation = 'emberGlow 0.6s ease-out';
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
    
    // Clean glow animation
    const emberGlowStyle = document.createElement('style');
    emberGlowStyle.textContent = `
        @keyframes emberGlow {
            0% { filter: brightness(1); }
            50% { filter: brightness(1.2); }
            100% { filter: brightness(1); }
        }
    `;
    document.head.appendChild(emberGlowStyle);
}

// RESTORED: Easter egg - Konami code for bonus phoenix effect
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
        // RESTORED: Coin rain effect
        console.log('🔥🪙 BONUS PHOENIX ACTIVATED! 🔥🪙');
        for (let i = 0; i < 12; i++) {
            setTimeout(() => {
                const coin = document.createElement('img');
                coin.src = 'images/VPEmberCoin.PNG';
                coin.alt = 'Bonus VP Ember Coin';
                coin.style.cssText = `
                    position: fixed;
                    width: ${Math.random() * 25 + 20}px;
                    height: ${Math.random() * 25 + 20}px;
                    left: ${Math.random() * 100}vw;
                    top: -50px;
                    z-index: 10000;
                    pointer-events: none;
                    animation: coinFall ${Math.random() * 2 + 1.5}s linear forwards;
                    filter: drop-shadow(0 0 8px rgba(240, 165, 0, 0.8));
                `;
                document.body.appendChild(coin);
                
                setTimeout(() => coin.remove(), 3500);
            }, i * 150);
        }
        
        // Coin fall animation
        const coinFallStyle = document.createElement('style');
        coinFallStyle.textContent = `
            @keyframes coinFall {
                to { 
                    transform: translateY(calc(100vh + 100px)) rotate(720deg); 
                    opacity: 0; 
                }
            }
        `;
        document.head.appendChild(coinFallStyle);
        
        konamiCode = []; // Reset
    }
});

// Enhanced window load event for smooth transition
window.addEventListener('load', () => {
    const loadTime = performance.now();
    console.log(`🔥🪙 Phoenix crypto arose in ${Math.round(loadTime)}ms - Ready to collect coins!`);
    
    // Initialize smooth loading after all resources loaded
    initializeSmoothLoading();
});

// Initialize everything when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    console.log('🔥🪙 Phoenix Crypto Main: DOM loaded - starting initialization...');
    
    preloadPhoenixCryptoImages();
    createPhoenixCryptoParticles(); // RESTORED: Hero floating coins
    initializeCryptoCoinImage();
    initializeEmberPhoenixImage();
    initializeCryptoBenefits();
    initializeEmberHighlights();
    createPhoenixCryptoScrollIndicator();
    
    console.log('🔥🪙 Phoenix crypto systems online with restored floating coins!');
});

// Console welcome message
console.log('%c🔥🪙 VAULT PHOENIX - AR CRYPTO GAMING REVOLUTION', 'color: #d73327; font-size: 24px; font-weight: bold; text-shadow: 2px 2px 4px rgba(0,0,0,0.3);');
console.log('%c🚀 Built by Phoenix Crypto Developers - Premium AR Gaming Solutions', 'color: #fb923c; font-size: 14px; font-weight: bold;');
console.log('%c🔥🪙 RESTORED: Floating coins and full crypto gaming experience!', 'color: #d73327; font-size: 12px; font-style: italic;');

console.log('🔥🪙 Crypto Phoenix Ready - Try the Konami Code for a surprise! ⬆️⬆️⬇️⬇️⬅️➡️⬅️➡️BA');
        '
