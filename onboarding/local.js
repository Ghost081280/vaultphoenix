/* ============================================
   VAULT PHOENIX - ONBOARDING PAGE JAVASCRIPT
   Professional Interactive Features
   ============================================ */

// ============================================
// AUDIENCE SELECTION
// ============================================

/**
 * Handles audience type selection (Agency or Developer)
 * @param {string} type - 'agency' or 'developer'
 */
function selectAudience(type) {
    // Remove active state from all audience buttons
    const buttons = document.querySelectorAll('.audience-btn');
    buttons.forEach(btn => {
        btn.classList.remove('active');
        btn.setAttribute('aria-pressed', 'false');
    });
    
    // Add active state to selected button
    const selectedButton = document.querySelector(`.audience-btn[data-audience="${type}"]`);
    if (selectedButton) {
        selectedButton.classList.add('active');
        selectedButton.setAttribute('aria-pressed', 'true');
    }
    
    // Switch to corresponding path
    switchPath(type);
    
    // Smooth scroll to getting started section
    const gettingStartedSection = document.getElementById('getting-started');
    if (gettingStartedSection) {
        setTimeout(() => {
            gettingStartedSection.scrollIntoView({ 
                behavior: 'smooth', 
                block: 'start' 
            });
        }, 100);
    }
}

// ============================================
// PATH SWITCHING (Agency vs Developer)
// ============================================

/**
 * Switches between agency and developer paths
 * @param {string} path - 'agency' or 'developer'
 */
function switchPath(path) {
    // Update path tabs
    const tabs = document.querySelectorAll('.path-tab');
    tabs.forEach(tab => {
        tab.classList.remove('active');
        tab.setAttribute('aria-selected', 'false');
    });
    
    const activeTab = document.querySelector(`.path-tab[data-path="${path}"]`);
    if (activeTab) {
        activeTab.classList.add('active');
        activeTab.setAttribute('aria-selected', 'true');
    }
    
    // Update path content
    const contents = document.querySelectorAll('.path-content');
    contents.forEach(content => {
        content.classList.remove('active');
        content.setAttribute('aria-hidden', 'true');
    });
    
    const activeContent = document.getElementById(`${path}-path`);
    if (activeContent) {
        activeContent.classList.add('active');
        activeContent.setAttribute('aria-hidden', 'false');
    }
}

// ============================================
// TOOLKIT NAVIGATION
// ============================================

/**
 * Shows selected toolkit section and hides others
 * @param {string} section - 'scripts', 'proposals', 'pricing', or 'objections'
 */
function showToolkit(section) {
    // Update navigation buttons
    const navButtons = document.querySelectorAll('.toolkit-nav-btn');
    navButtons.forEach(btn => {
        btn.classList.remove('active');
        btn.setAttribute('aria-selected', 'false');
    });
    
    const activeButton = document.querySelector(`.toolkit-nav-btn[onclick*="${section}"]`);
    if (activeButton) {
        activeButton.classList.add('active');
        activeButton.setAttribute('aria-selected', 'true');
    }
    
    // Update content sections
    const contents = document.querySelectorAll('.toolkit-content');
    contents.forEach(content => {
        content.classList.remove('active');
        content.setAttribute('aria-hidden', 'true');
    });
    
    const activeContent = document.getElementById(`${section}-content`);
    if (activeContent) {
        activeContent.classList.add('active');
        activeContent.setAttribute('aria-hidden', 'false');
    }
}

// ============================================
// COPY TO CLIPBOARD FUNCTIONS
// ============================================

/**
 * Shows temporary feedback message on button
 * @param {HTMLElement} button - Button element to show feedback on
 * @param {string} message - Message to display
 */
function showCopyFeedback(button, message = 'Copied!') {
    const originalHTML = button.innerHTML;
    button.innerHTML = `
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
            <polyline points="22 4 12 14.01 9 11.01"></polyline>
        </svg>
        ${message}
    `;
    button.style.background = '#22c55e';
    button.style.borderColor = '#22c55e';
    button.style.color = 'white';
    
    setTimeout(() => {
        button.innerHTML = originalHTML;
        button.style.background = '';
        button.style.borderColor = '';
        button.style.color = '';
    }, 2000);
}

/**
 * Copies script text to clipboard
 * @param {HTMLElement} button - Copy button element
 */
function copyScript(button) {
    try {
        const scriptCard = button.closest('.script-card-clean');
        const scriptText = scriptCard.querySelector('.script-text');
        
        if (!scriptText) {
            console.error('Script text not found');
            return;
        }
        
        // Get text content, preserving structure
        const text = scriptText.innerText || scriptText.textContent;
        
        // Copy to clipboard
        navigator.clipboard.writeText(text).then(() => {
            showCopyFeedback(button);
        }).catch(err => {
            console.error('Failed to copy:', err);
            // Fallback for older browsers
            fallbackCopy(text, button);
        });
    } catch (error) {
        console.error('Error copying script:', error);
    }
}

/**
 * Copies proposal text to clipboard
 * @param {HTMLElement} button - Copy button element
 */
function copyProposal(button) {
    try {
        const proposalCard = button.closest('.proposal-card-clean');
        const proposalText = proposalCard.querySelector('.proposal-text pre');
        
        if (!proposalText) {
            console.error('Proposal text not found');
            return;
        }
        
        const text = proposalText.innerText || proposalText.textContent;
        
        navigator.clipboard.writeText(text).then(() => {
            showCopyFeedback(button);
        }).catch(err => {
            console.error('Failed to copy:', err);
            fallbackCopy(text, button);
        });
    } catch (error) {
        console.error('Error copying proposal:', error);
    }
}

/**
 * Copies code snippet to clipboard
 * @param {HTMLElement} button - Copy button element
 */
function copyCode(button) {
    try {
        const codeBlock = button.closest('.code-block');
        const codeElement = codeBlock.querySelector('pre code') || codeBlock.querySelector('pre');
        
        if (!codeElement) {
            console.error('Code element not found');
            return;
        }
        
        const text = codeElement.innerText || codeElement.textContent;
        
        navigator.clipboard.writeText(text).then(() => {
            showCopyFeedback(button);
        }).catch(err => {
            console.error('Failed to copy:', err);
            fallbackCopy(text, button);
        });
    } catch (error) {
        console.error('Error copying code:', error);
    }
}

/**
 * Fallback copy method for browsers without clipboard API
 * @param {string} text - Text to copy
 * @param {HTMLElement} button - Button to show feedback on
 */
function fallbackCopy(text, button) {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();
    
    try {
        document.execCommand('copy');
        showCopyFeedback(button);
    } catch (err) {
        console.error('Fallback copy failed:', err);
        showCopyFeedback(button, 'Copy failed');
    }
    
    document.body.removeChild(textarea);
}

// ============================================
// ROI CALCULATOR
// ============================================

/**
 * Formats number as currency
 * @param {number} amount - Amount to format
 * @returns {string} Formatted currency string
 */
function formatCurrency(amount) {
    return '$' + Math.round(amount).toLocaleString('en-US');
}

/**
 * Formats number as percentage
 * @param {number} value - Value to format
 * @returns {string} Formatted percentage string
 */
function formatPercentage(value) {
    return Math.round(value) + '%';
}

/**
 * Calculates and updates ROI based on user inputs
 */
function calculateROI() {
    try {
        // Get input values
        const locations = parseInt(document.getElementById('calc-locations')?.value || 10);
        const pricePerLocation = parseFloat(document.getElementById('calc-price-per-location')?.value || 200);
        const setupFee = parseFloat(document.getElementById('calc-setup-fee')?.value || 1000);
        const duration = parseInt(document.getElementById('calc-duration')?.value || 3);
        const platformCost = parseFloat(document.getElementById('calc-platform-cost')?.value || 149);
        
        // Update display input
        const locationsDisplay = document.getElementById('locations-display');
        if (locationsDisplay) {
            locationsDisplay.textContent = locations;
        }
        
        // Calculate values
        const monthlyRevenue = locations * pricePerLocation;
        const totalRevenue = (monthlyRevenue * duration) + setupFee;
        const totalPlatformCost = platformCost * duration;
        const grossProfit = totalRevenue - totalPlatformCost;
        const profitMargin = totalRevenue > 0 ? (grossProfit / totalRevenue) * 100 : 0;
        
        // Update total revenue
        const totalRevenueElement = document.getElementById('total-revenue');
        if (totalRevenueElement) {
            totalRevenueElement.textContent = formatCurrency(totalRevenue);
        }
        
        const revenueBreakdownElement = document.getElementById('revenue-breakdown');
        if (revenueBreakdownElement) {
            revenueBreakdownElement.textContent = 
                `${formatCurrency(monthlyRevenue)}/mo × ${duration} month${duration !== 1 ? 's' : ''} + ${formatCurrency(setupFee)} setup`;
        }
        
        // Update monthly revenue
        const monthlyRevenueElement = document.getElementById('monthly-revenue');
        if (monthlyRevenueElement) {
            monthlyRevenueElement.textContent = formatCurrency(monthlyRevenue);
        }
        
        // Update platform cost
        const platformCostElement = document.getElementById('platform-cost');
        if (platformCostElement) {
            platformCostElement.textContent = formatCurrency(totalPlatformCost);
        }
        
        const costBreakdownElement = document.getElementById('cost-breakdown');
        if (costBreakdownElement) {
            costBreakdownElement.textContent = 
                `${formatCurrency(platformCost)}/mo × ${duration} month${duration !== 1 ? 's' : ''}`;
        }
        
        // Update gross profit
        const grossProfitElement = document.getElementById('gross-profit');
        if (grossProfitElement) {
            grossProfitElement.textContent = formatCurrency(grossProfit);
        }
        
        // Update profit margin
        const profitMarginElement = document.getElementById('profit-margin');
        if (profitMarginElement) {
            profitMarginElement.textContent = formatPercentage(profitMargin);
        }
        
    } catch (error) {
        console.error('Error calculating ROI:', error);
    }
}

/**
 * Opens email client with calculator results
 */
function emailCalculation() {
    try {
        // Get current values
        const locations = document.getElementById('calc-locations')?.value || 10;
        const pricePerLocation = document.getElementById('calc-price-per-location')?.value || 200;
        const setupFee = document.getElementById('calc-setup-fee')?.value || 1000;
        const duration = document.getElementById('calc-duration')?.value || 3;
        const totalRevenue = document.getElementById('total-revenue')?.textContent || '$0';
        const monthlyRevenue = document.getElementById('monthly-revenue')?.textContent || '$0';
        const grossProfit = document.getElementById('gross-profit')?.textContent || '$0';
        const profitMargin = document.getElementById('profit-margin')?.textContent || '0%';
        
        // Build email body
        const subject = encodeURIComponent('Vault Phoenix ROI Calculation');
        const body = encodeURIComponent(`Vault Phoenix AR Campaign ROI Calculation

Campaign Parameters:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• Locations: ${locations}
• Price per Location: $${pricePerLocation}/month
• Setup Fee: $${setupFee}
• Campaign Duration: ${duration} month(s)

Projected Results:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• Total Revenue: ${totalRevenue}
• Monthly Recurring: ${monthlyRevenue}
• Gross Profit: ${grossProfit}
• Profit Margin: ${profitMargin}

Ready to launch your campaign?
Contact us: contact@vaultphoenix.com

Generated from: https://vaultphoenix.com/onboarding.html`);
        
        // Open email client
        window.location.href = `mailto:?subject=${subject}&body=${body}`;
        
    } catch (error) {
        console.error('Error emailing calculation:', error);
    }
}

// ============================================
// CODE TAB SWITCHING
// ============================================

/**
 * Switches between code language examples
 * @param {string} language - 'react-native', 'swift', or 'kotlin'
 */
function showCodeTab(language) {
    // Update tab buttons
    const tabs = document.querySelectorAll('.code-tab');
    tabs.forEach(tab => {
        tab.classList.remove('active');
        tab.setAttribute('aria-selected', 'false');
    });
    
    const activeTab = document.querySelector(`.code-tab[onclick*="${language}"]`);
    if (activeTab) {
        activeTab.classList.add('active');
        activeTab.setAttribute('aria-selected', 'true');
    }
    
    // Update content
    const contents = document.querySelectorAll('.code-tab-content');
    contents.forEach(content => {
        content.classList.remove('active');
        content.setAttribute('aria-hidden', 'true');
    });
    
    const activeContent = document.getElementById(`${language}-code`);
    if (activeContent) {
        activeContent.classList.add('active');
        activeContent.setAttribute('aria-hidden', 'false');
    }
}

// ============================================
// SCROLL REVEAL ANIMATIONS
// ============================================

/**
 * Initializes scroll reveal animations
 */
function initScrollReveal() {
    const revealElements = document.querySelectorAll('.scroll-reveal');
    
    if (revealElements.length === 0) return;
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Add stagger delay
                setTimeout(() => {
                    entry.target.classList.add('revealed');
                }, index * 100);
                
                // Stop observing once revealed
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    revealElements.forEach(element => {
        revealObserver.observe(element);
    });
}

// ============================================
// SMOOTH SCROLLING
// ============================================

/**
 * Initializes smooth scrolling for anchor links
 */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            
            // Skip if href is just "#" or empty
            if (!href || href === '#') return;
            
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Update URL without jumping
                if (history.pushState) {
                    history.pushState(null, null, href);
                }
            }
        });
    });
}

// ============================================
// FORM INPUT ENHANCEMENTS
// ============================================

/**
 * Prevents invalid input in number fields
 */
function initNumberInputs() {
    const numberInputs = document.querySelectorAll('input[type="number"]');
    
    numberInputs.forEach(input => {
        // Prevent scrolling from changing values
        input.addEventListener('wheel', (e) => {
            e.preventDefault();
        });
        
        // Validate on input
        input.addEventListener('input', (e) => {
            const min = parseFloat(input.getAttribute('min'));
            const max = parseFloat(input.getAttribute('max'));
            let value = parseFloat(input.value);
            
            if (isNaN(value)) return;
            
            if (!isNaN(min) && value < min) {
                input.value = min;
            }
            if (!isNaN(max) && value > max) {
                input.value = max;
            }
        });
    });
}

// ============================================
// KEYBOARD ACCESSIBILITY
// ============================================

/**
 * Initializes keyboard navigation enhancements
 */
function initKeyboardNav() {
    // Handle escape key to close any open overlays
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            // Could be used for modal/overlay closing if needed
            console.log('Escape pressed');
        }
    });
    
    // Add focus visible class for keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Tab') {
            document.body.classList.add('using-keyboard');
        }
    });
    
    document.addEventListener('mousedown', () => {
        document.body.classList.remove('using-keyboard');
    });
}

// ============================================
// INITIALIZATION
// ============================================

/**
 * Initializes all interactive features when DOM is ready
 */
function init() {
    console.log('Onboarding page initialized');
    
    // Initialize ROI calculator with default values
    calculateROI();
    
    // Initialize scroll reveal animations
    initScrollReveal();
    
    // Initialize smooth scrolling
    initSmoothScroll();
    
    // Initialize number input enhancements
    initNumberInputs();
    
    // Initialize keyboard navigation
    initKeyboardNav();
    
    // Set default active states
    const firstToolkitBtn = document.querySelector('.toolkit-nav-btn');
    if (firstToolkitBtn) {
        showToolkit('scripts');
    }
    
    const firstCodeTab = document.querySelector('.code-tab');
    if (firstCodeTab) {
        showCodeTab('react-native');
    }
    
    // Check for URL hash and scroll to section
    if (window.location.hash) {
        setTimeout(() => {
            const target = document.querySelector(window.location.hash);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        }, 100);
    }
}

// ============================================
// EVENT LISTENERS
// ============================================

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

// Handle window resize for responsive adjustments
let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        // Could add responsive logic here if needed
        console.log('Window resized');
    }, 250);
});

// Handle visibility change to pause/resume animations if needed
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        console.log('Page hidden');
    } else {
        console.log('Page visible');
    }
});

// ============================================
// EXPORT FUNCTIONS (for inline onclick handlers)
// ============================================

// Make functions available globally for inline onclick handlers
window.selectAudience = selectAudience;
window.switchPath = switchPath;
window.showToolkit = showToolkit;
window.copyScript = copyScript;
window.copyProposal = copyProposal;
window.copyCode = copyCode;
window.calculateROI = calculateROI;
window.emailCalculation = emailCalculation;
window.showCodeTab = showCodeTab;

// ============================================
// CONSOLE INFO
// ============================================

console.log('%c🔥 Vault Phoenix Onboarding Page', 'color: #f0a500; font-size: 20px; font-weight: bold;');
console.log('%cInteractive features loaded successfully', 'color: #22c55e; font-size: 14px;');
console.log('%c━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', 'color: #d73327;');
console.log('Available functions:', {
    selectAudience: 'Select agency or developer audience',
    switchPath: 'Switch between paths',
    showToolkit: 'Show toolkit sections',
    calculateROI: 'Calculate campaign ROI',
    emailCalculation: 'Email calculator results',
    copyScript: 'Copy sales scripts',
    copyProposal: 'Copy proposals',
    copyCode: 'Copy code snippets',
    showCodeTab: 'Switch code examples'
});
