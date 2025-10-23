// Ember Token Page JavaScript
// Phoenix Rising from Digital Ashes - $Ember Token Edition
// UPDATED: Presale countdown to November 1, 2025
// UPDATED: Calculator starts at $10 minimum investment
// UPDATED: Development Fund Tracker with real-time updates

// EXACT COPY FROM MAIN.HTML: Enhanced navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// ADDED: Phoenix crypto-themed scroll progress indicator (copied from main.html)
function createPhoenixCryptoScrollIndicator() {
    const indicator = document.createElement('div');
    indicator.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        height: 4px;
        background: linear-gradient(90deg, #d73327, #fb923c, #f0a500);
        z-index: 9999;
        transition: width 0.3s ease;
        width: 0%;
        box-shadow: 0 2px 10px rgba(215, 51, 39, 0.3);
    `;
    document.body.appendChild(indicator);
    
    window.addEventListener('scroll', () => {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        indicator.style.width = scrolled + '%';
    });
}

// EXACT COPY FROM MAIN.HTML: Enhanced scroll reveal animation
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

// EXACT COPY FROM MAIN.HTML: Smooth scrolling for navigation links
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

// EXACT COPY FROM MAIN.HTML: PHOENIX CRYPTO MOBILE MENU SYSTEM - BULLETPROOF VERSION
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

// UPDATED: Token sale countdown timer - November 1, 2025 Launch
function initializeCountdown() {
    // Set the target date to November 1, 2025 at 12:00 PM UTC
    const targetDate = new Date('2025-11-01T12:00:00Z');
    
    function updateCountdown() {
        const now = new Date().getTime();
        const distance = targetDate.getTime() - now;
        
        // If countdown has finished
        if (distance < 0) {
            const daysEl = document.getElementById('days');
            const hoursEl = document.getElementById('hours');
            const minutesEl = document.getElementById('minutes');
            const secondsEl = document.getElementById('seconds');
            
            if (daysEl) daysEl.textContent = '00';
            if (hoursEl) hoursEl.textContent = '00';
            if (minutesEl) minutesEl.textContent = '00';
            if (secondsEl) secondsEl.textContent = '00';
            
            // Update timer title to show presale is live
            const timerTitle = document.querySelector('.presale-timer h3');
            if (timerTitle) {
                timerTitle.textContent = '🔥 Presale is LIVE!';
                timerTitle.style.color = '#4ade80';
            }
            return;
        }
        
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
    }
    
    // Update every second
    updateCountdown();
    setInterval(updateCountdown, 1000);
    
    console.log('🔥🪙 Countdown initialized for November 1, 2025 presale launch!');
}

// UPDATED: Investment calculator for $0.003 price - STARTS AT $10
function initializeCalculator() {
    const investmentInput = document.getElementById('investment-amount');
    const emberTokensEl = document.getElementById('ember-tokens');
    const totalInvestmentEl = document.getElementById('total-investment');
    
    if (!investmentInput || !emberTokensEl || !totalInvestmentEl) return;
    
    function calculateTokens() {
        const inputValue = investmentInput.value;
        const investment = parseFloat(inputValue);
        const tokenPrice = 0.003; // $0.003 per token
        
        // If empty or invalid, use minimum for display but don't force it into the input
        if (!inputValue || isNaN(investment)) {
            emberTokensEl.textContent = '3,333';
            totalInvestmentEl.textContent = '$10';
            return;
        }
        
        // Calculate tokens based on actual input (even if out of range)
        // This allows user to type freely
        const displayInvestment = Math.max(10, Math.min(50000, investment));
        const totalTokens = Math.floor(displayInvestment / tokenPrice);
        
        // Format numbers with commas
        emberTokensEl.textContent = totalTokens.toLocaleString();
        totalInvestmentEl.textContent = `${displayInvestment}`;
    }
    
    // Calculate on input change - allows free typing
    investmentInput.addEventListener('input', calculateTokens);
    
    // Validate on blur (when user clicks away) to enforce limits
    investmentInput.addEventListener('blur', function() {
        const investment = parseFloat(investmentInput.value);
        
        if (isNaN(investment) || investment < 10) {
            investmentInput.value = 10;
        } else if (investment > 50000) {
            investmentInput.value = 50000;
        }
        
        calculateTokens();
    });
    
    // Initial calculation with $10
    calculateTokens();
    
    console.log('🔥🪙 Investment calculator initialized - $0.003 per EMBER token, starting at $10');
}

// NEW: Development Fund Tracker Functionality
function initializeDevelopmentFundTracker() {
    const devFundWithdrawn = document.getElementById('dev-fund-withdrawn');
    const devFundFill = document.getElementById('dev-fund-fill');
    const devFundTimestamp = document.getElementById('dev-fund-timestamp');
    
    if (!devFundWithdrawn || !devFundFill || !devFundTimestamp) {
        console.log('🔥 Development Fund Tracker elements not found - skipping initialization');
        return;
    }
    
    // In a production environment, this would fetch from an API
    // For now, we'll set up the structure for manual updates
    
    const TOTAL_DEV_FUND = 30000; // $30,000 total
    
    // Function to update the tracker (call this when funds are withdrawn)
    window.updateDevFundTracker = function(amountWithdrawn, timestamp) {
        const percentage = (amountWithdrawn / TOTAL_DEV_FUND) * 100;
        
        // Update withdrawn amount
        devFundWithdrawn.textContent = `$${amountWithdrawn.toLocaleString()}`;
        
        // Update progress bar
        devFundFill.style.width = `${percentage}%`;
        
        // Update timestamp
        if (timestamp) {
            const date = new Date(timestamp);
            const formattedDate = date.toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            });
            devFundTimestamp.textContent = formattedDate;
        }
        
        console.log(`🔥💰 Development Fund updated: $${amountWithdrawn} withdrawn (${percentage.toFixed(1)}%)`);
    };
    
    // Initialize with $0
    window.updateDevFundTracker(0, null);
    
    // Example usage (commented out - uncomment to test):
    // setTimeout(() => {
    //     window.updateDevFundTracker(5000, new Date()); // $5,000 withdrawn
    // }, 5000);
    
    console.log('🔥💰 Development Fund Tracker initialized - ready for updates');
    console.log('💡 Call window.updateDevFundTracker(amount, timestamp) to update the tracker');
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

// UPDATED: Form validation for token sale - enforces $10 minimum
function initializeFormValidation() {
    const investmentInput = document.getElementById('investment-amount');
    const presaleButton = document.querySelector('.presale-button');
    const tpaCheckbox = document.getElementById('tpa-agree-checkbox');
    
    if (!investmentInput || !presaleButton) return;
    
    function validateInput() {
        const value = parseFloat(investmentInput.value);
        // Allow empty or invalid during typing, but validate actual numbers
        const isValidAmount = !isNaN(value) && value >= 10 && value <= 50000;
        const hasAgreedTPA = tpaCheckbox ? tpaCheckbox.checked : true;
        const isValid = isValidAmount && hasAgreedTPA;
        
        if (isNaN(value) || investmentInput.value === '') {
            // Neutral state while typing
            investmentInput.style.borderColor = 'rgba(215, 51, 39, 0.3)';
        } else if (isValidAmount) {
            investmentInput.style.borderColor = 'rgba(64, 224, 64, 0.5)';
        } else {
            investmentInput.style.borderColor = 'rgba(255, 0, 0, 0.5)';
        }
        
        if (presaleButton) {
            presaleButton.disabled = !isValid;
            presaleButton.style.opacity = isValid ? '1' : '0.6';
        }
    }
    
    investmentInput.addEventListener('input', validateInput);
    if (tpaCheckbox) {
        tpaCheckbox.addEventListener('change', validateInput);
    }
    
    validateInput(); // Initial validation
}

// Token sale button click handler
function initializeTokenSaleHandler() {
    const presaleButton = document.querySelector('.presale-button');
    
    if (presaleButton) {
        presaleButton.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Create celebration effect
            createCelebrationEffect();
            
            // Show success message (replace with actual token sale logic)
            showTokenSaleModal();
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

// Show token sale modal (placeholder)
function showTokenSaleModal() {
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
                <h2 style="color: #f0a500; margin-bottom: 15px;">$Ember Token Presale - November 1, 2025!</h2>
                <p style="margin-bottom: 25px;">Thank you for your interest in $Ember Token. Our presale launches November 1, 2025 at 12:00 PM UTC. Join our community for updates!</p>
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
    // ADDED: Initialize scroll progress indicator first
    createPhoenixCryptoScrollIndicator();
    
    initializeCountdown();
    initializeCalculator();
    initializeDevelopmentFundTracker(); // NEW: Initialize Development Fund Tracker
    initializeButtonEffects();
    animateProgressBar();
    initializeChartAnimation();
    initializePaymentOptions();
    initializeTeamEffects();
    initializeRoadmapAnimation();
    initializeFormValidation();
    initializeTokenSaleHandler();
    
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
    
    console.log('🔥🪙 $Ember Token page loaded successfully - November 1, 2025 presale ready!');
    console.log('🔥🪙 Scroll progress indicator active!');
    console.log('🔥🪙 Calculator starts at $10 minimum investment!');
    console.log('🔥💰 Development Fund Tracker initialized!');
});

// Console welcome message
console.log('%c🔥🪙 $EMBER TOKEN - THE FUTURE OF AR CRYPTO GAMING', 'color: #f0a500; font-size: 24px; font-weight: bold; text-shadow: 2px 2px 4px rgba(0,0,0,0.3);');
console.log('%c🚀 Presale launches November 1, 2025 - Join the Revolution!', 'color: #fb923c; font-size: 14px; font-weight: bold;');

// Performance monitoring
window.addEventListener('load', () => {
    const loadTime = performance.now();
    console.log(`%c🔥🪙 $Ember Token page loaded in ${Math.round(loadTime)}ms - Ready to revolutionize!`, 'color: #22c55e; font-weight: bold;');
});

// Error handling
window.addEventListener('error', (event) => {
    console.error('🔥🪙 $Ember Token page error:', event.error);
});
