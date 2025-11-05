/* ========================================
   VAULT PHOENIX ONBOARDING - LOCAL JS v3.0
   Production-Ready Enhanced JavaScript
   IMPROVEMENTS: Up to 10000 locations, day/week/month pricing, maintenance fees, checklist modals
   ======================================== */

'use strict';

// ========================================
// GLOBAL STATE
// ========================================
const OnboardingApp = {
    initialized: false,
    scrollObserver: null,
    mobileMenuOpen: false,
    calculatorValues: {
        locations: 10,
        setupFee: 1000,
        pricePerLocation: 200,
        pricePeriod: 'month', // day, week, or month
        duration: 3,
        maintenanceFee: 500 // New: monthly maintenance fee for agencies
    },
    checklistModals: {}
};

// ========================================
// INITIALIZATION
// ========================================
document.addEventListener('DOMContentLoaded', function() {
    console.log('🔥 Vault Phoenix Onboarding v3.0 - Initializing...');
    
    try {
        initCalculator();
        initCopyButtons();
        initScrollReveal();
        initSmoothScroll();
        initMobileMenu();
        initChecklistModals();
        
        OnboardingApp.initialized = true;
        console.log('✅ Vault Phoenix Onboarding - Fully Loaded');
    } catch (error) {
        console.error('❌ Initialization Error:', error);
    }
});

// ========================================
// ROI CALCULATOR - ENHANCED WITH NEW FEATURES
// ========================================

/**
 * Initialize the interactive ROI calculator with enhanced features
 */
function initCalculator() {
    const calculatorInputs = {
        locations: document.getElementById('locations'),
        setupFee: document.getElementById('setup-fee'),
        pricePerLocation: document.getElementById('price-per-location'),
        pricePeriod: document.getElementById('price-period'),
        duration: document.getElementById('duration'),
        maintenanceFee: document.getElementById('maintenance-fee')
    };
    
    // Check if calculator elements exist
    const hasCalculator = calculatorInputs.locations !== null;
    
    if (!hasCalculator) {
        console.log('ℹ️ Calculator elements not found - skipping initialization');
        return;
    }
    
    // Add event listeners to all inputs
    Object.keys(calculatorInputs).forEach(key => {
        const input = calculatorInputs[key];
        if (input) {
            input.addEventListener('input', calculateROI);
            input.addEventListener('change', calculateROI);
        }
    });
    
    // Initial calculation
    calculateROI();
    
    console.log('✅ Calculator initialized with enhanced features');
}

/**
 * Calculate and update ROI values in real-time with new pricing models
 */
function calculateROI() {
    try {
        // Get input values
        const locations = parseInt(document.getElementById('locations')?.value) || 0;
        const setupFee = parseFloat(document.getElementById('setup-fee')?.value) || 0;
        const pricePerLocation = parseFloat(document.getElementById('price-per-location')?.value) || 0;
        const pricePeriod = document.getElementById('price-period')?.value || 'month';
        const duration = parseInt(document.getElementById('duration')?.value) || 1;
        const maintenanceFee = parseFloat(document.getElementById('maintenance-fee')?.value) || 0;
        
        // Update the locations display value
        const locationsValue = document.getElementById('locations-value');
        if (locationsValue) {
            locationsValue.textContent = locations.toLocaleString();
        }
        
        // Calculate base revenue per location based on period
        let monthlyRevenuePerLocation = pricePerLocation;
        
        switch(pricePeriod) {
            case 'day':
                monthlyRevenuePerLocation = pricePerLocation * 30; // Approximate 30 days/month
                break;
            case 'week':
                monthlyRevenuePerLocation = pricePerLocation * 4.33; // Average weeks per month
                break;
            case 'month':
            default:
                monthlyRevenuePerLocation = pricePerLocation;
                break;
        }
        
        // Calculate revenues
        const monthlyLocationRevenue = locations * monthlyRevenuePerLocation;
        const monthlyMaintenanceRevenue = maintenanceFee;
        const monthlyRevenue = monthlyLocationRevenue + monthlyMaintenanceRevenue;
        const totalRecurringRevenue = monthlyRevenue * duration;
        const totalCampaignRevenue = setupFee + totalRecurringRevenue;
        const revenuePerLocation = locations > 0 ? totalCampaignRevenue / locations : 0;
        
        // Update display values with animation
        updateCalculatorValue('monthly-revenue', monthlyRevenue);
        updateCalculatorValue('total-revenue', totalCampaignRevenue);
        updateCalculatorValue('revenue-per-location', revenuePerLocation);
        
        // Update breakdown if element exists
        updateRevenueBreakdown(monthlyLocationRevenue, monthlyMaintenanceRevenue);
        
        // Store values in global state
        OnboardingApp.calculatorValues = {
            locations,
            setupFee,
            pricePerLocation,
            pricePeriod,
            duration,
            maintenanceFee
        };
        
    } catch (error) {
        console.error('Calculator Error:', error);
    }
}

/**
 * Update revenue breakdown display
 * @param {number} locationRevenue - Revenue from location fees
 * @param {number} maintenanceRevenue - Revenue from maintenance fees
 */
function updateRevenueBreakdown(locationRevenue, maintenanceRevenue) {
    const breakdownElement = document.getElementById('revenue-breakdown');
    if (breakdownElement) {
        breakdownElement.innerHTML = `
            <div style="font-size: 0.85rem; color: var(--text-secondary); margin-top: 0.5rem;">
                <div>Location Fees: ${formatCurrency(locationRevenue)}/month</div>
                <div>Maintenance: ${formatCurrency(maintenanceRevenue)}/month</div>
            </div>
        `;
    }
}

/**
 * Update calculator display value with animation
 * @param {string} elementId - The ID of the element to update
 * @param {number} value - The new value to display
 */
function updateCalculatorValue(elementId, value) {
    const element = document.getElementById(elementId);
    if (!element) return;
    
    const formattedValue = formatCurrency(value);
    
    // Add pulse animation
    element.style.transform = 'scale(1.05)';
    element.textContent = formattedValue;
    
    setTimeout(() => {
        element.style.transform = 'scale(1)';
    }, 200);
}

// ========================================
// CHECKLIST MODAL FUNCTIONALITY
// ========================================

/**
 * Initialize checklist modals with detailed information for each step
 */
function initChecklistModals() {
    const checklistItems = document.querySelectorAll('.checklist-item');
    
    if (checklistItems.length === 0) {
        console.log('ℹ️ No checklist items found');
        return;
    }
    
    // Create modal overlay if it doesn't exist
    createModalOverlay();
    
    // Define content for each checklist item
    const checklistContent = {
        'platform-account': {
            title: 'Platform Account Created',
            content: `
                <h4>Why This Matters</h4>
                <p>Your platform account is your command center for managing all AR crypto campaigns. This gives you access to the full management system.</p>
                
                <h4>What You Get</h4>
                <ul>
                    <li>Access to the complete campaign management dashboard</li>
                    <li>$100 in FREE $Ember tokens to test campaigns</li>
                    <li>Ability to create and manage multiple campaigns</li>
                    <li>Real-time analytics and reporting tools</li>
                    <li>User management and permissions system</li>
                </ul>
                
                <h4>Next Steps</h4>
                <p>After creating your account, you'll receive a welcome email with login credentials and links to access the management system. Take 5 minutes to familiarize yourself with the dashboard layout.</p>
            `
        },
        'demo-tested': {
            title: 'Demo Tested',
            content: `
                <h4>Why This Matters</h4>
                <p>Testing the demo gives you firsthand experience of what your customers will see and helps you understand the player journey.</p>
                
                <h4>What to Test</h4>
                <ul>
                    <li><strong>Mobile App Demo:</strong> Open on your phone and walk to different locations to collect AR coins</li>
                    <li><strong>Management System:</strong> Place virtual coins, adjust settings, view analytics</li>
                    <li><strong>GPS Accuracy:</strong> Test outdoor coin collection with GPS</li>
                    <li><strong>Beacon Functionality:</strong> If available, test indoor beacon-based collection</li>
                    <li><strong>Wallet Integration:</strong> Experience the $Ember token redemption flow</li>
                </ul>
                
                <h4>Key Things to Notice</h4>
                <p>Pay attention to the user interface, loading times, AR visualization quality, and overall player engagement. These insights will help you sell the platform effectively.</p>
            `
        },
        'branding-finalized': {
            title: 'Branding Finalized',
            content: `
                <h4>Why This Matters</h4>
                <p>Your branding makes the campaign feel authentic and trustworthy to players. Professional branding increases engagement by 40%.</p>
                
                <h4>Branding Elements to Prepare</h4>
                <ul>
                    <li><strong>Logo:</strong> High-resolution PNG or SVG format (transparent background preferred)</li>
                    <li><strong>Color Scheme:</strong> Primary brand colors (2-3 colors maximum for consistency)</li>
                    <li><strong>Custom Coin Design:</strong> Optional custom AR coin appearance matching your brand</li>
                    <li><strong>App Name:</strong> Custom name for your white-label app</li>
                    <li><strong>Domain:</strong> Subdomain or custom domain where the app will be hosted</li>
                </ul>
                
                <h4>Professional Tips</h4>
                <p>Use consistent branding across all touchpoints. Your AR coins, redemption screens, and marketing materials should all feel cohesive. If you need design help, many successful clients use Fiverr or 99designs for quick professional assets.</p>
            `
        },
        'locations-identified': {
            title: 'Target Locations Identified',
            content: `
                <h4>Why This Matters</h4>
                <p>Location strategy determines campaign success. High-traffic, relevant locations can generate 10X more engagement than random placements.</p>
                
                <h4>How to Choose Locations</h4>
                <ul>
                    <li><strong>High Foot Traffic:</strong> Shopping districts, downtown areas, popular parks</li>
                    <li><strong>Target Demographics:</strong> Places where your audience naturally gathers</li>
                    <li><strong>Partner Venues:</strong> Businesses willing to sponsor coin placements</li>
                    <li><strong>Event Locations:</strong> Festivals, sports venues, conventions</li>
                    <li><strong>Accessibility:</strong> Easy to reach, safe, publicly accessible areas</li>
                </ul>
                
                <h4>Research Tools</h4>
                <p>Use Google Maps to identify high-traffic areas. Check foot traffic data from tools like SafeGraph or Placer.ai. Visit locations in person to validate accessibility and safety. Talk to local businesses about partnership opportunities.</p>
                
                <h4>Best Practice</h4>
                <p>Start with 5-10 proven locations rather than 50 random spots. Test, measure, then scale what works.</p>
            `
        },
        'gps-beacon-strategy': {
            title: 'GPS vs Beacon Strategy Decided',
            content: `
                <h4>Why This Matters</h4>
                <p>Choosing the right technology ensures accurate, reliable coin collection and optimal player experience.</p>
                
                <h4>GPS (Outdoor)</h4>
                <ul>
                    <li><strong>Best For:</strong> Open outdoor spaces, street locations, parks, parking lots</li>
                    <li><strong>Accuracy:</strong> 5-10 meters typically, affected by buildings and weather</li>
                    <li><strong>Setup:</strong> No hardware required, works immediately</li>
                    <li><strong>Cost:</strong> Free - no additional equipment needed</li>
                </ul>
                
                <h4>Beacons (Indoor)</h4>
                <ul>
                    <li><strong>Best For:</strong> Malls, retail aisles, restaurants, event venues</li>
                    <li><strong>Accuracy:</strong> 1-3 meters, very precise indoor positioning</li>
                    <li><strong>Setup:</strong> Requires physical beacon hardware installation</li>
                    <li><strong>Cost:</strong> $20-50 per beacon, one-time purchase</li>
                </ul>
                
                <h4>Hybrid Approach</h4>
                <p>Many successful campaigns use both: GPS for outdoor locations and beacons for indoor precision. This provides comprehensive coverage and the best player experience.</p>
            `
        },
        'launch-announced': {
            title: 'Launch Announced',
            content: `
                <h4>Why This Matters</h4>
                <p>Strategic launch announcements create FOMO (fear of missing out) and drive initial player acquisition. Your first 48 hours set the tone for the entire campaign.</p>
                
                <h4>Announcement Channels</h4>
                <ul>
                    <li><strong>Social Media:</strong> Post on Instagram, Twitter/X, Facebook, TikTok with teaser content</li>
                    <li><strong>Email List:</strong> Send targeted announcement to existing customers/subscribers</li>
                    <li><strong>Partner Networks:</strong> Have participating businesses announce to their audiences</li>
                    <li><strong>Local Press:</strong> Send press releases to local news outlets and bloggers</li>
                    <li><strong>Crypto Communities:</strong> Share in Solana and crypto gaming Discord/Telegram groups</li>
                </ul>
                
                <h4>Launch Day Best Practices</h4>
                <p>Schedule a "token airdrop" event for the first 100 players. Create shareable content showing AR coins in action. Have your team actively monitor social media to engage with early users. Respond quickly to any technical issues.</p>
                
                <h4>Launch Timing</h4>
                <p>Tuesday-Thursday between 10am-2pm local time typically sees highest engagement. Avoid Monday mornings and Friday afternoons.</p>
            `
        },
        'daily-monitoring': {
            title: 'Daily Monitoring Active',
            content: `
                <h4>Why This Matters</h4>
                <p>Daily monitoring allows you to quickly identify and fix issues, optimize underperforming locations, and scale what's working. Active campaigns with daily monitoring see 2-3X better results.</p>
                
                <h4>Key Metrics to Monitor</h4>
                <ul>
                    <li><strong>Active Players:</strong> How many unique users collected coins today</li>
                    <li><strong>Coin Collections:</strong> Total coins collected per location</li>
                    <li><strong>Player Retention:</strong> Percentage of users returning within 7 days</li>
                    <li><strong>Location Performance:</strong> Which locations generate the most engagement</li>
                    <li><strong>Token Redemptions:</strong> How many players are cashing out $Ember</li>
                    <li><strong>Error Rates:</strong> Any technical issues or failed transactions</li>
                </ul>
                
                <h4>Daily Actions (15 Minutes)</h4>
                <p>Check the analytics dashboard each morning. Identify your top 3 and bottom 3 performing locations. Read player feedback and comments. Make one small optimization daily (adjust coin rarity, move underperforming coins, add new locations).</p>
                
                <h4>Weekly Review</h4>
                <p>Every Friday, do a deeper 30-minute analysis. Calculate ROI per location. Identify trends. Plan next week's optimizations. Share insights with stakeholders.</p>
            `
        }
    };
    
    // Store content in global state
    OnboardingApp.checklistModals = checklistContent;
    
    // Add event listeners to each checklist item
    checklistItems.forEach((item, index) => {
        const checkbox = item.querySelector('input[type="checkbox"]');
        const span = item.querySelector('span');
        
        if (checkbox && span) {
            // Load saved state from localStorage
            const savedState = localStorage.getItem(`checklist-${index}`);
            if (savedState === 'true') {
                checkbox.checked = true;
            }
            
            // Save state on change
            checkbox.addEventListener('change', function(e) {
                e.stopPropagation();
                localStorage.setItem(`checklist-${index}`, this.checked);
                
                // Add completion animation
                if (this.checked) {
                    const itemEl = this.closest('.checklist-item');
                    itemEl.style.animation = 'none';
                    setTimeout(() => {
                        itemEl.style.animation = 'pulse 0.3s ease-in-out';
                    }, 10);
                }
            });
            
            // Add click event to open modal
            item.addEventListener('click', function(e) {
                // Don't open modal if clicking checkbox
                if (e.target.type !== 'checkbox') {
                    const contentKey = getContentKeyFromSpan(span.textContent);
                    if (contentKey && checklistContent[contentKey]) {
                        openChecklistModal(checklistContent[contentKey]);
                    }
                }
            });
        }
    });
    
    console.log(`✅ Initialized ${checklistItems.length} checklist items with modal details`);
}

/**
 * Get content key from checklist item text
 * @param {string} text - The text content of the checklist item
 * @returns {string} - The corresponding content key
 */
function getContentKeyFromSpan(text) {
    const keyMap = {
        'Platform account created': 'platform-account',
        'Demo tested': 'demo-tested',
        'Branding finalized': 'branding-finalized',
        'Target locations identified': 'locations-identified',
        'GPS vs Beacon strategy decided': 'gps-beacon-strategy',
        'Launch announced': 'launch-announced',
        'Daily monitoring active': 'daily-monitoring'
    };
    
    return keyMap[text] || null;
}

/**
 * Create modal overlay element
 */
function createModalOverlay() {
    // Check if overlay already exists
    if (document.getElementById('checklist-modal-overlay')) {
        return;
    }
    
    const overlay = document.createElement('div');
    overlay.id = 'checklist-modal-overlay';
    overlay.className = 'checklist-modal-overlay';
    
    overlay.innerHTML = `
        <div class="checklist-modal">
            <div class="checklist-modal-header">
                <h3 id="modal-title">Step Details</h3>
                <button class="checklist-modal-close" aria-label="Close modal">&times;</button>
            </div>
            <div class="checklist-modal-body" id="modal-body">
                <!-- Content will be inserted here -->
            </div>
        </div>
    `;
    
    document.body.appendChild(overlay);
    
    // Add event listeners
    const closeBtn = overlay.querySelector('.checklist-modal-close');
    closeBtn.addEventListener('click', closeChecklistModal);
    
    overlay.addEventListener('click', function(e) {
        if (e.target === overlay) {
            closeChecklistModal();
        }
    });
    
    // Close on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeChecklistModal();
        }
    });
}

/**
 * Open checklist modal with content
 * @param {Object} content - Object containing title and content
 */
function openChecklistModal(content) {
    const overlay = document.getElementById('checklist-modal-overlay');
    const titleEl = document.getElementById('modal-title');
    const bodyEl = document.getElementById('modal-body');
    
    if (overlay && titleEl && bodyEl) {
        titleEl.textContent = content.title;
        bodyEl.innerHTML = content.content;
        
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

/**
 * Close checklist modal
 */
function closeChecklistModal() {
    const overlay = document.getElementById('checklist-modal-overlay');
    
    if (overlay) {
        overlay.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// ========================================
// COPY TO CLIPBOARD FUNCTIONALITY
// ========================================

/**
 * Initialize all copy buttons on the page
 */
function initCopyButtons() {
    const copyButtons = document.querySelectorAll('.copy-button-enhanced');
    
    copyButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            copyToClipboard(this);
        });
    });
    
    console.log(`✅ Initialized ${copyButtons.length} copy buttons`);
}

/**
 * Copy content to clipboard with visual feedback
 * @param {HTMLElement} button - The button element that was clicked
 */
function copyToClipboard(button) {
    try {
        // Find the closest content container
        const copyBox = button.closest('.script-content') || button.closest('.proposal-content');
        
        if (!copyBox) {
            console.error('Copy box not found');
            showCopyFeedback(button, false, 'Error: Content not found');
            return;
        }
        
        // Get the code element
        const codeElement = copyBox.querySelector('code') || copyBox.querySelector('pre');
        
        if (!codeElement) {
            console.error('Code element not found');
            showCopyFeedback(button, false, 'Error: Code not found');
            return;
        }
        
        const textToCopy = codeElement.textContent;
        
        // Modern Clipboard API
        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(textToCopy)
                .then(() => {
                    showCopyFeedback(button, true);
                    console.log('✅ Text copied to clipboard');
                })
                .catch(err => {
                    console.error('Clipboard API failed:', err);
                    fallbackCopyToClipboard(textToCopy, button);
                });
        } else {
            // Fallback for older browsers
            fallbackCopyToClipboard(textToCopy, button);
        }
        
    } catch (error) {
        console.error('Copy Error:', error);
        showCopyFeedback(button, false, 'Copy Failed');
    }
}

/**
 * Fallback copy method for older browsers
 * @param {string} text - Text to copy
 * @param {HTMLElement} button - Button element for feedback
 */
function fallbackCopyToClipboard(text, button) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.top = '0';
    textArea.style.left = '0';
    textArea.style.opacity = '0';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
        const successful = document.execCommand('copy');
        showCopyFeedback(button, successful);
        if (successful) {
            console.log('✅ Text copied (fallback method)');
        }
    } catch (err) {
        console.error('Fallback copy failed:', err);
        showCopyFeedback(button, false, 'Copy Failed');
    }
    
    document.body.removeChild(textArea);
}

/**
 * Show visual feedback after copy attempt
 * @param {HTMLElement} button - The button to show feedback on
 * @param {boolean} success - Whether the copy was successful
 * @param {string} customMessage - Optional custom message
 */
function showCopyFeedback(button, success, customMessage = null) {
    // Store original content
    const originalHTML = button.innerHTML;
    const originalBg = button.style.background;
    
    // Create feedback message
    const message = customMessage || (success ? 'Copied!' : 'Failed');
    const backgroundColor = success ? '#4caf50' : '#f44336';
    const icon = success ? '✓' : '✗';
    
    // Update button
    button.innerHTML = `<span style="display: inline-flex; align-items: center; gap: 0.5rem;">
        <span>${icon}</span>
        <span>${message}</span>
    </span>`;
    button.style.background = backgroundColor;
    button.style.pointerEvents = 'none';
    
    // Add pulse animation
    button.style.transform = 'scale(1.05)';
    setTimeout(() => {
        button.style.transform = 'scale(1)';
    }, 100);
    
    // Reset after 2 seconds
    setTimeout(() => {
        button.innerHTML = originalHTML;
        button.style.background = originalBg;
        button.style.pointerEvents = 'auto';
        button.style.transform = 'scale(1)';
    }, 2000);
}

// ========================================
// SCROLL REVEAL ANIMATIONS
// ========================================

/**
 * Initialize Intersection Observer for scroll animations
 */
function initScrollReveal() {
    // Options for the observer
    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -100px 0px',
        threshold: 0.1
    };
    
    // Create the observer
    OnboardingApp.scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('revealed');
                }, 50);
                
                OnboardingApp.scrollObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe all elements with scroll-reveal class
    const revealElements = document.querySelectorAll('.scroll-reveal');
    revealElements.forEach(el => {
        OnboardingApp.scrollObserver.observe(el);
    });
    
    console.log(`✅ Scroll reveal initialized for ${revealElements.length} elements`);
}

// ========================================
// SMOOTH SCROLLING
// ========================================

/**
 * Initialize smooth scrolling for anchor links
 */
function initSmoothScroll() {
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (!href || href === '#') return;
            
            const targetId = href.substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                e.preventDefault();
                
                if (OnboardingApp.mobileMenuOpen) {
                    closeMobileMenu();
                }
                
                smoothScrollTo(targetElement);
            }
        });
    });
    
    console.log(`✅ Smooth scroll initialized for ${anchorLinks.length} anchor links`);
}

/**
 * Smooth scroll to a target element
 * @param {HTMLElement} target - The element to scroll to
 * @param {number} offset - Optional offset from top (default: 80px for navbar)
 */
function smoothScrollTo(target, offset = 80) {
    const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;
    
    window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
    });
}

/**
 * Scroll to a section by ID
 * @param {string} sectionId - The ID of the section to scroll to
 */
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        smoothScrollTo(section);
    } else {
        console.warn(`Section with ID "${sectionId}" not found`);
    }
}

// ========================================
// MOBILE MENU
// ========================================

/**
 * Initialize mobile menu functionality
 */
function initMobileMenu() {
    const menuBtn = document.getElementById('mobile-menu-btn');
    const closeBtn = document.getElementById('mobile-menu-close');
    const overlay = document.getElementById('mobile-menu-overlay');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-nav-links a');
    
    if (!menuBtn || !closeBtn || !overlay || !mobileMenu) {
        console.log('ℹ️ Mobile menu elements not found - may be using global navigation');
        return;
    }
    
    menuBtn.addEventListener('click', openMobileMenu);
    closeBtn.addEventListener('click', closeMobileMenu);
    overlay.addEventListener('click', closeMobileMenu);
    
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            setTimeout(closeMobileMenu, 300);
        });
    });
    
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && OnboardingApp.mobileMenuOpen) {
            closeMobileMenu();
        }
    });
    
    console.log('✅ Mobile menu initialized');
}

/**
 * Open the mobile menu
 */
function openMobileMenu() {
    const overlay = document.getElementById('mobile-menu-overlay');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (overlay && mobileMenu) {
        overlay.classList.add('active');
        mobileMenu.classList.add('active');
        document.body.style.overflow = 'hidden';
        OnboardingApp.mobileMenuOpen = true;
    }
}

/**
 * Close the mobile menu
 */
function closeMobileMenu() {
    const overlay = document.getElementById('mobile-menu-overlay');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (overlay && mobileMenu) {
        overlay.classList.remove('active');
        mobileMenu.classList.remove('active');
        document.body.style.overflow = '';
        OnboardingApp.mobileMenuOpen = false;
    }
}

// ========================================
// UTILITY FUNCTIONS
// ========================================

/**
 * Format currency value
 * @param {number} value - The value to format
 * @param {string} currency - Currency symbol (default: $)
 * @returns {string} - Formatted currency string
 */
function formatCurrency(value, currency = '$') {
    return `${currency}${value.toLocaleString('en-US', {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    })}`;
}

/**
 * Debounce function to limit how often a function can fire
 * @param {Function} func - The function to debounce
 * @param {number} wait - The time to wait in milliseconds
 * @returns {Function} - Debounced function
 */
function debounce(func, wait = 250) {
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

/**
 * Throttle function to limit how often a function can fire
 * @param {Function} func - The function to throttle
 * @param {number} limit - The time limit in milliseconds
 * @returns {Function} - Throttled function
 */
function throttle(func, limit = 250) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

/**
 * Validate email format
 * @param {string} email - Email to validate
 * @returns {boolean} - True if valid
 */
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

/**
 * Get query parameter from URL
 * @param {string} param - Parameter name
 * @returns {string|null} - Parameter value or null
 */
function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

// ========================================
// EXPORT FUNCTIONS (for global access if needed)
// ========================================

window.VaultPhoenix = {
    calculateROI,
    copyToClipboard,
    scrollToSection,
    openMobileMenu,
    closeMobileMenu,
    formatCurrency,
    validateEmail,
    getQueryParam,
    openChecklistModal,
    closeChecklistModal
};

// ========================================
// ERROR HANDLING
// ========================================

window.addEventListener('error', function(event) {
    console.error('Global Error:', {
        message: event.message,
        filename: event.filename,
        lineno: event.lineno,
        colno: event.colno,
        error: event.error
    });
});

window.addEventListener('unhandledrejection', function(event) {
    console.error('Unhandled Promise Rejection:', event.reason);
});

// ========================================
// PERFORMANCE MONITORING
// ========================================

window.addEventListener('load', function() {
    if (window.performance && window.performance.timing) {
        const perfData = window.performance.timing;
        const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
        const domReadyTime = perfData.domContentLoadedEventEnd - perfData.navigationStart;
        
        console.log(`📊 Performance Metrics:
            - DOM Ready: ${domReadyTime}ms
            - Page Load: ${pageLoadTime}ms
        `);
    }
});

console.log('🔥 Vault Phoenix Onboarding v3.0 - Ready!');
