// Ember Token Page JavaScript
// Phoenix Rising from Digital Ashes - $Ember Token Edition
// CLEANED: Removed all floating coin references and effects

// Enhanced navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Enhanced scroll reveal animation
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

// Smooth scrolling for navigation links
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

// Mobile menu functionality
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            if (navLinks.classList.contains('mobile-active')) {
                navLinks.classList.remove('mobile-active');
                mobileMenuBtn.innerHTML = '☰';
                document.body.style.overflow = '';
            } else {
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

// Pre-sale countdown timer
function initializeCountdown() {
    // Set the target date (30 days from now)
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + 30);
    
    function updateCountdown() {
        const now = new Date().getTime();
        const distance = targetDate.getTime() - now;
        
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        // Update display
        const daysEl = document.getElementById('days');
        const hoursEl = document.getElementById('hours');
        const minutesEl = document.getElementById('minutes');
        const secondsEl = document.getElementById('seconds');
        
        if (daysEl) daysEl.textContent = days.toString().padStart(2, '0');
        if (hoursEl) hoursEl.textContent = hours.toString().padStart(2, '0');
        if (minutesEl) minutesEl.textContent = minutes.toString().padStart(2, '0');
        if (secondsEl) secondsEl.textContent = seconds.toString().padStart(2, '0');
        
        // If countdown is finished
        if (distance < 0) {
            if (daysEl) daysEl.textContent = '00';
            if (hoursEl) hoursEl.textContent = '00';
            if (minutesEl) minutesEl.textContent = '00';
            if (secondsEl) secondsEl.textContent = '00';
        }
    }
    
    // Update every second
    updateCountdown();
    setInterval(updateCountdown, 1000);
}

// Investment calculator
function initializeCalculator() {
    const investmentInput = document.getElementById('investment-amount');
    const baseTokensEl = document.getElementById('base-tokens');
    const bonusTokensEl = document.getElementById('bonus-tokens');
    const totalTokensEl = document.getElementById('total-tokens');
    
    if (!investmentInput || !baseTokensEl || !bonusTokensEl || !totalTokensEl) return;
    
    function calculateTokens() {
        const investment = parseFloat(investmentInput.value) || 0;
        const tokenPrice = 0.001; // $0.001 per token
        const bonusPercentage = 0.5; // 50% bonus
        
        const baseTokens = Math.floor(investment / tokenPrice);
        const bonusTokens = Math.floor(baseTokens * bonusPercentage);
        const totalTokens = baseTokens + bonusTokens;
        
        // Format numbers with commas
        baseTokensEl.textContent = baseTokens.toLocaleString();
        bonusTokensEl.textContent = bonusTokens.toLocaleString();
        totalTokensEl.textContent = totalTokens.toLocaleString();
    }
    
    // Calculate on input change
    investmentInput.addEventListener('input', calculateTokens);
    
    // Initial calculation
    calculateTokens();
}

// Enhanced button interactions with ember effects
function initializeButtonEffects() {
    const buttons = document.querySelectorAll('.ember-cta-primary, .ember-cta-secondary, .presale-button, .download-button');
    
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.filter = 'brightness(1.1) saturate(1.2)';
            
            // Add subtle ember glow effect
            if (Math.random() > 0.85) {
                createEmberGlow(this);
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
}

// Create subtle ember glow effect
function createEmberGlow(element) {
    const glow = document.createElement('div');
    glow.innerHTML = '✨';
    glow.style.cssText = `
        position: absolute;
        pointer-events: none;
        font-size: 10px;
        animation: emberGlowFloat 1s ease-out forwards;
        top: ${Math.random() * 15 - 7}px;
        left: ${Math.random() * 15 - 7}px;
        z-index: 10000;
        filter: drop-shadow(0 0 5px rgba(240, 165, 0, 0.8));
    `;
    
    element.style.position = 'relative';
    element.appendChild(glow);
    
    setTimeout(() => glow.remove(), 1000);
}

// Add ember glow animation
const emberGlowStyle = document.createElement('style');
emberGlowStyle.textContent = `
    @keyframes emberGlowFloat {
        0% { 
            transform: translateY(0) scale(1); 
            opacity: 1; 
        }
        100% { 
            transform: translateY(-20px) scale(0); 
            opacity: 0; 
        }
    }
`;
document.head.appendChild(emberGlowStyle);

// Progress bar animation
function animateProgressBar() {
    const progressFill = document.querySelector('.progress-fill');
    if (!progressFill) return;
    
    const targetWidth = progressFill.style.width;
    progressFill.style.width = '0%';
    
    setTimeout(() => {
        progressFill.style.transition = 'width 2s ease-out';
        progressFill.style.width = targetWidth;
    }, 500);
}

// Interactive chart bars
function initializeChartAnimation() {
    const chartBars = document.querySelectorAll('.chart-bar');
    
    const chartObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                const bar = entry.target;
                const targetWidth = bar.style.width;
                bar.style.width = '0%';
                
                setTimeout(() => {
                    bar.style.transition = 'width 1.5s ease-out';
                    bar.style.width = targetWidth;
                }, index * 200);
            }
        });
    }, { threshold: 0.5 });
    
    chartBars.forEach(bar => {
        chartObserver.observe(bar);
    });
}

// Stats counter animation
function animateStats() {
    const statNumbers = document.querySelectorAll('.stat-number, .metric-value, .time-value');
    
    statNumbers.forEach(stat => {
        const finalValue = stat.textContent;
        const numericValue = parseFloat(finalValue.replace(/[^\d.]/g, ''));
        
        if (numericValue && numericValue > 0) {
            let currentValue = 0;
            const duration = 2000;
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
                        stat.textContent = displayValue.toFixed(3) + suffix;
                    } else {
                        stat.textContent = Math.floor(displayValue).toLocaleString() + suffix;
                    }
                }
            }, 50);
        }
    });
}

// Payment option selection
function initializePaymentOptions() {
    const paymentOptions = document.querySelectorAll('.payment-option');
    
    paymentOptions.forEach(option => {
        option.addEventListener('click', function() {
            // Remove active class from all options
            paymentOptions.forEach(opt => opt.classList.remove('active'));
            
            // Add active class to clicked option
            this.classList.add('active');
            
            // Add visual feedback
            this.style.background = 'rgba(240, 165, 0, 0.2)';
            this.style.borderColor = '#f0a500';
            
            setTimeout(() => {
                if (!this.classList.contains('active')) {
                    this.style.background = '';
                    this.style.borderColor = '';
                }
            }, 3000);
        });
    });
}

// Enhanced team member hover effects
function initializeTeamEffects() {
    const teamMembers = document.querySelectorAll('.team-member');
    
    teamMembers.forEach(member => {
        member.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
            this.style.boxShadow = '0 30px 60px rgba(215, 51, 39, 0.3)';
            
            const avatar = this.querySelector('.member-avatar');
            if (avatar) {
                avatar.style.transform = 'scale(1.2) rotate(10deg)';
                avatar.style.filter = 'drop-shadow(0 0 25px rgba(240, 165, 0, 0.8))';
            }
        });
        
        member.addEventListener('mouseleave', function() {
            this.style.transform = '';
            this.style.boxShadow = '';
            
            const avatar = this.querySelector('.member-avatar');
            if (avatar) {
                avatar.style.transform = '';
                avatar.style.filter = '';
            }
        });
    });
}

// Roadmap item progression animation
function initializeRoadmapAnimation() {
    const roadmapItems = document.querySelectorAll('.roadmap-item');
    
    const roadmapObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    
                    // Add completion animation for active items
                    if (entry.target.classList.contains('active')) {
                        entry.target.style.boxShadow = '0 0 50px rgba(240, 165, 0, 0.4)';
                    }
                }, index * 300);
            }
        });
    }, { threshold: 0.3 });
    
    roadmapItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(50px)';
        item.style.transition = 'all 0.8s ease';
        roadmapObserver.observe(item);
    });
}

// Form validation for pre-sale
function initializeFormValidation() {
    const investmentInput = document.getElementById('investment-amount');
    const presaleButton = document.querySelector('.presale-button');
    
    if (!investmentInput || !presaleButton) return;
    
    function validateInput() {
        const value = parseFloat(investmentInput.value);
        const isValid = value >= 10 && value <= 10000;
        
        if (isValid) {
            investmentInput.style.borderColor = 'rgba(64, 224, 64, 0.5)';
            presaleButton.disabled = false;
            presaleButton.style.opacity = '1';
        } else {
            investmentInput.style.borderColor = 'rgba(255, 0, 0, 0.5)';
            presaleButton.disabled = true;
            presaleButton.style.opacity = '0.5';
        }
    }
    
    investmentInput.addEventListener('input', validateInput);
    validateInput(); // Initial validation
}

// Pre-sale button click handler
function initializePresaleHandler() {
    const presaleButton = document.querySelector('.presale-button');
    
    if (presaleButton) {
        presaleButton.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Create celebration effect
            createCelebrationEffect();
            
            // Show success message (replace with actual pre-sale logic)
            showPresaleModal();
        });
    }
}

// Create celebration effect
function createCelebrationEffect() {
    for (let i = 0; i < 12; i++) {
        setTimeout(() => {
            const ember = document.createElement('div');
            ember.innerHTML = '🔥';
            ember.style.cssText = `
                position: fixed;
                pointer-events: none;
                font-size: ${Math.random() * 15 + 12}px;
                left: ${Math.random() * 100}vw;
                top: -50px;
                z-index: 10000;
                animation: celebrationFall ${Math.random() * 2 + 1.5}s linear forwards;
                filter: drop-shadow(0 0 8px rgba(240, 165, 0, 0.8));
            `;
            document.body.appendChild(ember);
            
            setTimeout(() => ember.remove(), 4000);
        }, i * 100);
    }
}

// Add celebration animation
const celebrationStyle = document.createElement('style');
celebrationStyle.textContent = `
    @keyframes celebrationFall {
        to { 
            transform: translateY(calc(100vh + 100px)) rotate(720deg); 
            opacity: 0; 
        }
    }
`;
document.head.appendChild(celebrationStyle);

// Show pre-sale modal (placeholder)
function showPresaleModal() {
    const modal = document.createElement('div');
    modal.innerHTML = `
        <div style="
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            background: rgba(0, 0, 0, 0.8);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
        ">
            <div style="
                background: linear-gradient(135deg, #0f0f0f, #2d1810);
                padding: 40px;
                border-radius: 20px;
                text-align: center;
                color: white;
                border: 2px solid #f0a500;
                max-width: 500px;
                margin: 20px;
            ">
                <div style="font-size: 4rem; margin-bottom: 20px;">🔥</div>
                <h2 style="color: #f0a500; margin-bottom: 15px;">Pre-Sale Coming Soon!</h2>
                <p style="margin-bottom: 25px;">Thank you for your interest in $Ember Token. Our pre-sale will be launching soon. Stay tuned for updates!</p>
                <button onclick="this.parentElement.parentElement.remove()" style="
                    background: linear-gradient(135deg, #d73327, #fb923c);
                    color: white;
                    padding: 12px 30px;
                    border: none;
                    border-radius: 15px;
                    font-weight: 700;
                    cursor: pointer;
                ">Close</button>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
}

// Initialize everything when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    initializeCountdown();
    initializeCalculator();
    initializeButtonEffects();
    animateProgressBar();
    initializeChartAnimation();
    initializePaymentOptions();
    initializeTeamEffects();
    initializeRoadmapAnimation();
    initializeFormValidation();
    initializePresaleHandler();
    
    // Trigger stats animation when visible
    const heroObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setTimeout(animateStats, 500);
                heroObserver.disconnect();
            }
        });
    });
    
    const heroSection = document.querySelector('.ember-hero');
    if (heroSection) {
        heroObserver.observe(heroSection);
    }
    
    console.log('🔥🪙 $Ember Token page loaded successfully - clean and focused!');
});

// Console welcome message
console.log('%c🔥🪙 $EMBER TOKEN - THE FUTURE OF AR CRYPTO GAMING', 'color: #f0a500; font-size: 24px; font-weight: bold; text-shadow: 2px 2px 4px rgba(0,0,0,0.3);');
console.log('%c🚀 Join the Pre-Sale and Rise from Digital Ashes!', 'color: #fb923c; font-size: 14px; font-weight: bold;');

// Performance monitoring
window.addEventListener('load', () => {
    const loadTime = performance.now();
    console.log(`%c🔥🪙 $Ember Token page loaded in ${Math.round(loadTime)}ms - Ready to ignite!`, 'color: #22c55e; font-weight: bold;');
});

// Error handling
window.addEventListener('error', (event) => {
    console.error('🔥🪙 $Ember Token page error:', event.error);
});

// REMOVED: All floating ember particle functions and background coin effects
