// Vault Phoenix - Interactive JavaScript
// Phoenix Rising from Digital Ashes

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

// Enhanced navbar scroll effect with phoenix theme
window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Enhanced scroll reveal animation with phoenix timing
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

// Enhanced interactive card effects with phoenix animation
document.querySelectorAll('.feature-card, .use-case-card, .simple-thumb').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = this.classList.contains('simple-thumb') 
            ? 'translateY(-5px) scale(1.05)' 
            : 'translateY(-10px) scale(1.02)';
        
        // Add subtle phoenix glow effect
        if (this.classList.contains('feature-card') || this.classList.contains('use-case-card')) {
            this.style.boxShadow = '0 30px 80px rgba(215, 51, 39, 0.2)';
        }
    });
    
    card.addEventListener('mouseleave', function() {
        if (!this.classList.contains('active')) {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '';
        }
    });
});

// Enhanced stats animation with realistic counting and phoenix theme
function animateStats() {
    const stats = document.querySelectorAll('.stat-number, .revenue-number');
    stats.forEach(stat => {
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

// Auto-rotate gallery showcase with phoenix-themed images
let currentImageIndex = 0;
const imageRotation = [
    { src: 'images/IMG_7910.PNG', title: 'Phoenix Collection System' },
    { src: 'images/IMG_4380.jpg', title: 'Legendary Item Discovery' },
    { src: 'images/IMG_4383.jpg', title: 'Phoenix Dashboard Command' },
    { src: 'images/IMG_4381.jpg', title: 'AR Phoenix Hunt Mode' },
    { src: 'images/IMG_4382.jpg', title: 'Territory Map Conquest' },
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

// PHOENIX MOBILE MENU SYSTEM - BULLETPROOF VERSION
document.addEventListener('DOMContentLoaded', function() {
    console.log('🔥 Phoenix Rising - DOM loaded, initializing mobile menu...');
    
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    console.log('Found phoenix elements:', { 
        mobileMenuBtn: !!mobileMenuBtn, 
        navLinks: !!navLinks 
    });

    if (mobileMenuBtn && navLinks) {
        // Add click handler to mobile menu button
        mobileMenuBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            console.log('🔥 Phoenix menu button ignited!');
            console.log('Current classes:', navLinks.className);
            
            // Toggle the mobile-active class
            if (navLinks.classList.contains('mobile-active')) {
                // Close menu
                navLinks.classList.remove('mobile-active');
                mobileMenuBtn.innerHTML = '☰';
                document.body.style.overflow = '';
                console.log('Phoenix menu extinguished');
            } else {
                // Open menu
                navLinks.classList.add('mobile-active');
                mobileMenuBtn.innerHTML = '✕';
                document.body.style.overflow = 'hidden';
                console.log('Phoenix menu blazing!');
                console.log('New classes:', navLinks.className);
            }
        });

        // Close menu when clicking nav links
        const navLinksArray = navLinks.querySelectorAll('a');
        console.log('Found phoenix nav links:', navLinksArray.length);
        
        navLinksArray.forEach((link, index) => {
            link.addEventListener('click', function() {
                console.log('Phoenix nav link activated:', index);
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
                console.log('Phoenix menu closed via escape');
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
                console.log('Phoenix menu closed via outside click');
            }
        });

    } else {
        console.error('🔥 Phoenix menu elements not found!');
    }
});

// Enhanced form validation and UX with phoenix theme
document.querySelectorAll('a[href^="mailto:"]').forEach(link => {
    link.addEventListener('click', (e) => {
        console.log('🔥 Phoenix email CTA ignited:', link.href);
        
        // Add subtle animation feedback
        link.style.transform = 'scale(0.95)';
        setTimeout(() => {
            link.style.transform = '';
        }, 150);
    });
});

document.querySelectorAll('a[href^="sms:"]').forEach(link => {
    link.addEventListener('click', (e) => {
        console.log('🔥 Phoenix SMS CTA ignited:', link.href);
        
        // Add subtle animation feedback
        link.style.transform = 'scale(0.95)';
        setTimeout(() => {
            link.style.transform = '';
        }, 150);
    });
});

// Add loading states for better UX with phoenix theme
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    
    // Trigger initial animations with phoenix timing
    setTimeout(() => {
        document.querySelectorAll('.fade-in').forEach((el, index) => {
            setTimeout(() => {
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            }, index * 150); // Slightly more dramatic spacing
        });
    }, 500);
});

// Add error handling for images with phoenix fallback
document.querySelectorAll('img').forEach(img => {
    img.addEventListener('error', function() {
        console.warn('🔥 Phoenix image failed to load:', this.src);
        this.style.opacity = '0.5';
        this.alt = 'Phoenix image rising...';
    });
    
    img.addEventListener('load', function() {
        this.style.opacity = '1';
    });
});

// Preload critical phoenix images for better performance
function preloadPhoenixImages() {
    const criticalImages = [
        'images/IMG_7910.PNG', // Main phoenix image
        'images/IMG_4380.jpg',
        'images/IMG_4383.jpg',
        'images/IMG_4381.jpg'
    ];
    
    criticalImages.forEach(src => {
        const img = new Image();
        img.src = src;
        img.onload = () => console.log('🔥 Phoenix image preloaded:', src);
        img.onerror = () => console.warn('🔥 Phoenix image preload failed:', src);
    });
}

// Phoenix particle effect for hero section (optional enhancement)
function createPhoenixParticles() {
    const hero = document.querySelector('.hero');
    if (!hero) return;
    
    // Create subtle floating particles
    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: absolute;
            width: 4px;
            height: 4px;
            background: rgba(215, 51, 39, 0.6);
            border-radius: 50%;
            pointer-events: none;
            animation: phoenixFloat ${3 + Math.random() * 4}s ease-in-out infinite;
            animation-delay: ${Math.random() * 2}s;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            z-index: 1;
        `;
        hero.appendChild(particle);
    }
}

// Initialize everything when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    preloadPhoenixImages();
    createPhoenixParticles();
    
    // Add smooth entrance animations
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
    
    // Phoenix-specific initialization
    console.log('🔥 Phoenix systems online and ready for action!');
});

// Console welcome message with phoenix theme
console.log('%c🔥 VAULT PHOENIX - AR Marketing Revolution', 'color: #d73327; font-size: 24px; font-weight: bold; text-shadow: 2px 2px 4px rgba(0,0,0,0.3);');
console.log('%c🚀 Built by Phoenix Developers - Premium AR Marketing Solutions', 'color: #fb923c; font-size: 14px; font-weight: bold;');
console.log('%c📧 Contact: contact@vaultphoenix.com | 📱 (949) 357-4416', 'color: #374151; font-size: 14px;');
console.log('%c🔥 From ashes to greatness - Phoenix Rising!', 'color: #d73327; font-size: 12px; font-style: italic;');

// Performance monitoring with phoenix theme
window.addEventListener('load', () => {
    const loadTime = performance.now();
    console.log(`%c🔥 Phoenix arose in ${Math.round(loadTime)}ms - Ready to ignite!`, 'color: #22c55e; font-weight: bold;');
    
    // Optional: Add phoenix flame effect to logo after load
    const logoIcon = document.querySelector('.logo-icon');
    if (logoIcon) {
        logoIcon.style.filter = 'drop-shadow(0 0 10px rgba(215, 51, 39, 0.8))';
    }
});

// Enhanced interactive feedback for all CTA buttons
document.querySelectorAll('.cta-button, .cta-primary, .cta-secondary, .demo-button').forEach(button => {
    button.addEventListener('mouseenter', function() {
        this.style.filter = 'brightness(1.1) saturate(1.2)';
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

// Phoenix-themed scroll progress indicator (optional)
function createPhoenixScrollIndicator() {
    const indicator = document.createElement('div');
    indicator.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        height: 4px;
        background: linear-gradient(90deg, #d73327, #fb923c);
        z-index: 9999;
        transition: width 0.3s ease;
        width: 0%;
    `;
    document.body.appendChild(indicator);
    
    window.addEventListener('scroll', () => {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        indicator.style.width = scrolled + '%';
    });
}

// Initialize phoenix scroll indicator
createPhoenixScrollIndicator();
