// Vault Phoenix - Interactive JavaScript
// Phoenix Rising from Digital Ashes - Senior UX/UI Design
// CLEANED: Removed all floating coin references and effects

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

// FIXED: Enhanced stats animation - EXCLUDES Ember Token stats to prevent spinning numbers
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
    autoRotateInterval = setInterval(autoRotateGallery, 4500); // Slightly slower for better UX
}, 3000);

// Pause auto-rotation when user interacts with thumbnails
document.querySelectorAll('.simple-thumb').forEach(thumb => {
    thumb.addEventListener('click', () => {
        if (autoRotateInterval) {
            clearInterval(autoRotateInterval);
        }
        setTimeout(() => {
            autoRotateInterval = setInterval(autoRotateGallery, 4500);
        }, 15000); // Resume after 15 seconds
    });
});

// PHOENIX CRYPTO MOBILE MENU SYSTEM - BULLETPROOF VERSION
document.addEventListener('DOMContentLoaded', function() {
    console.log('🔥🪙 Phoenix Crypto Rising - DOM loaded, initializing mobile menu...');
    
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    console.log('Found phoenix crypto elements:', { 
        mobileMenuBtn: !!mobileMenuBtn, 
        navLinks: !!navLinks 
    });

    if (mobileMenuBtn && navLinks) {
        // Add click handler to mobile menu button
        mobileMenuBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            console.log('🔥🪙 Phoenix crypto menu button ignited!');
            console.log('Current classes:', navLinks.className);
            
            // Toggle the mobile-active class
            if (navLinks.classList.contains('mobile-active')) {
                // Close menu
                navLinks.classList.remove('mobile-active');
                mobileMenuBtn.innerHTML = '☰';
                document.body.style.overflow = '';
                console.log('Phoenix crypto menu extinguished');
            } else {
                // Open menu
                navLinks.classList.add('mobile-active');
                mobileMenuBtn.innerHTML = '✕';
                document.body.style.overflow = 'hidden';
                console.log('Phoenix crypto menu blazing!');
                console.log('New classes:', navLinks.className);
            }
        });

        // Close menu when clicking nav links
        const navLinksArray = navLinks.querySelectorAll('a');
        console.log('Found phoenix crypto nav links:', navLinksArray.length);
        
        navLinksArray.forEach((link, index) => {
            link.addEventListener('click', function() {
                console.log('Phoenix crypto nav link activated:', index);
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
                console.log('Phoenix crypto menu closed via escape');
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
                console.log('Phoenix crypto menu closed via outside click');
            }
        });

    } else {
        console.error('🔥🪙 Phoenix crypto menu elements not found!');
    }
});

// Enhanced form validation and UX with phoenix crypto theme
document.querySelectorAll('a[href^="mailto:"]').forEach(link => {
    link.addEventListener('click', (e) => {
        console.log('🔥🪙 Phoenix crypto email CTA ignited:', link.href);
        
        // Add subtle animation feedback
        link.style.transform = 'scale(0.95)';
        setTimeout(() => {
            link.style.transform = '';
        }, 150);
    });
});

document.querySelectorAll('a[href^="sms:"]').forEach(link => {
    link.addEventListener('click', (e) => {
        console.log('🔥🪙 Phoenix crypto SMS CTA ignited:', link.href);
        
        // Add subtle animation feedback
        link.style.transform = 'scale(0.95)';
        setTimeout(() => {
            link.style.transform = '';
        }, 150);
    });
});

// FIXED: Enhanced smooth loading for fade-in elements
function initializeSmoothLoading() {
    console.log('🔥🪙 Phoenix: Initializing smooth loading...');
    
    // Trigger fade-in animations for hero elements
    setTimeout(() => {
        document.querySelectorAll('.fade-in').forEach((el, index) => {
            setTimeout(() => {
                el.classList.add('visible');
                console.log('🔥🪙 Fade-in element visible:', index);
            }, index * 150); // Staggered animation
        });
    }, 800); // Wait for transition to complete
}

// Add error handling for images with phoenix crypto fallback
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
        'images/PhoenixHoldingCoin.PNG', // Ember section image
        'images/IMG_7910.PNG', // Main phoenix crypto image
        'images/9FBD9FC3-8B64-44F7-9B5A-785531847CB9.PNG', // Phoenix holding coin
        'images/IMG_4380.jpg',
        'images/IMG_4383.jpg',
        'images/IMG_4381.jpg'
    ];
    
    criticalImages.forEach(src => {
        const img = new Image();
        img.src = src;
        img.onload = () => console.log('🔥🪙 Phoenix crypto image preloaded:', src);
        img.onerror = () => console.warn('🔥🪙 Phoenix crypto image preload failed:', src);
    });
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
    
    // Add subtle side-to-side floating animation
    let time = 0;
    setInterval(() => {
        time += 0.02;
        const sideMovement = Math.sin(time) * 8; // Move 8px side to side
        const upDownMovement = Math.cos(time * 0.8) * 3; // Subtle up/down movement
        cryptoImage.style.transform = `translateX(${sideMovement}px) translateY(${upDownMovement}px)`;
    }, 50);
}

// Enhanced Ember Phoenix Image interaction for compact section
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
        const floatMovement = Math.sin(emberTime) * 5; // Gentle floating
        const rotateMovement = Math.cos(emberTime * 0.7) * 2; // Subtle rotation
        if (!emberImage.matches(':hover')) {
            emberImage.style.transform = `translateY(${floatMovement}px) rotate(${rotateMovement}deg)`;
        }
    }, 60);
}

// CLEAN: Enhanced interactive feedback - SUBTLE EFFECTS ONLY
document.querySelectorAll('.cta-button, .cta-primary, .cta-secondary, .demo-button, .ember-cta-primary, .ember-cta-secondary').forEach(button => {
    button.addEventListener('mouseenter', function() {
        this.style.filter = 'brightness(1.1) saturate(1.2)';
        // VERY SUBTLE glow effect - no distraction
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

// CLEAN: Subtle glow animation
const subtleGlowStyle = document.createElement('style');
subtleGlowStyle.textContent = `
    @keyframes subtleGlow {
        0% { transform: translateY(0) scale(1); opacity: 1; }
        100% { transform: translateY(-10px) scale(0); opacity: 0; }
    }
`;
document.head.appendChild(subtleGlowStyle);

// CLEAN: Minimal scroll progress indicator
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
        
        // MINIMAL phoenix icon at end - very small and subtle
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
                    
                    // SUBTLE icon effect
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
    
    // CLEAN bounce animation
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
                    
                    // SUBTLE glow effect
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
    
    // CLEAN glow animation
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

// CLEAN: Easter egg - MINIMAL phoenix effect
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
        // MINIMAL phoenix celebration - not overwhelming
        console.log('🔥🪙 BONUS PHOENIX ACTIVATED! 🔥🪙');
        for (let i = 0; i < 8; i++) {
            setTimeout(() => {
                const phoenix = document.createElement('div');
                phoenix.innerHTML = '🔥';
                phoenix.style.cssText = `
                    position: fixed;
                    font-size: ${Math.random() * 15 + 12}px;
                    left: ${Math.random() * 100}vw;
                    top: -50px;
                    z-index: 10000;
                    pointer-events: none;
                    animation: phoenixFall ${Math.random() * 2 + 1.5}s linear forwards;
                    filter: drop-shadow(0 0 6px rgba(240, 165, 0, 0.8));
                `;
                document.body.appendChild(phoenix);
                
                setTimeout(() => phoenix.remove(), 3500);
            }, i * 150);
        }
        
        // Phoenix fall animation
        const phoenixFallStyle = document.createElement('style');
        phoenixFallStyle.textContent = `
            @keyframes phoenixFall {
                to { 
                    transform: translateY(calc(100vh + 100px)) rotate(360deg); 
                    opacity: 0; 
                }
            }
        `;
        document.head.appendChild(phoenixFallStyle);
        
        konamiCode = []; // Reset
    }
});

// FIXED: Enhanced window load event for smooth transition
window.addEventListener('load', () => {
    const loadTime = performance.now();
    console.log(`🔥🪙 Phoenix crypto arose in ${Math.round(loadTime)}ms - Ready to collect coins!`);
    
    // Initialize smooth loading after all resources loaded
    initializeSmoothLoading();
    
    // Optional: Add phoenix flame effect to logo after load
    const logoIcon = document.querySelector('.logo-icon');
    if (logoIcon) {
        logoIcon.style.filter = 'drop-shadow(0 0 15px rgba(215, 51, 39, 0.8))';
    }
});

// Initialize everything when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    console.log('🔥🪙 Phoenix Crypto Main: DOM loaded - starting initialization...');
    
    preloadPhoenixCryptoImages();
    initializeCryptoCoinImage();
    initializeEmberPhoenixImage();
    initializeCryptoBenefits();
    initializeEmberHighlights();
    createPhoenixCryptoScrollIndicator();
    
    // Phoenix crypto-specific initialization (REMOVED floating coins)
    console.log('🔥🪙 Phoenix crypto systems online - clean and focused!');
});

// Console welcome message with phoenix crypto theme
console.log('%c🔥🪙 VAULT PHOENIX - AR CRYPTO GAMING REVOLUTION', 'color: #d73327; font-size: 24px; font-weight: bold; text-shadow: 2px 2px 4px rgba(0,0,0,0.3);');
console.log('%c🚀 Built by Phoenix Crypto Developers - Premium AR Gaming Solutions', 'color: #fb923c; font-size: 14px; font-weight: bold;');
console.log('%c📧 Contact: contact@vaultphoenix.com | 📱 (949) 357-4416', 'color: #374151; font-size: 14px;');
console.log('%c🔥🪙 From ashes to crypto greatness - Phoenix Rising with Blockchain Power!', 'color: #d73327; font-size: 12px; font-style: italic;');

console.log('🔥🪙 Clean Phoenix Ready - Try the Konami Code for a surprise! ⬆️⬆️⬇️⬇️⬅️➡️⬅️➡️BA');
        '
