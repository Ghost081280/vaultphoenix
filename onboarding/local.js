/* ========================================
   VAULT PHOENIX ONBOARDING - LOCAL JS v3.1
   Production-Ready Enhanced JavaScript
   FIXES: Added data-content button handlers, fixed modal titles
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
        pricePeriod: 'month',
        duration: 3,
        maintenanceFee: 500
    },
    checklistModals: {}
};

// ========================================
// INITIALIZATION
// ========================================
document.addEventListener('DOMContentLoaded', function() {
    console.log('🔥 Vault Phoenix Onboarding v3.1 - Initializing...');
    
    try {
        initConstructionBanner();
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
// UNDER CONSTRUCTION BANNER
// ========================================

/**
 * Initialize the under construction banner
 */
function initConstructionBanner() {
    const closeBtn = document.querySelector('.construction-close');
    const banner = document.querySelector('.construction-banner');
    
    if (!closeBtn || !banner) {
        console.log('ℹ️ Construction banner not found');
        return;
    }
    
    const dismissed = localStorage.getItem('construction-banner-dismissed');
    
    if (dismissed === 'true') {
        banner.classList.add('hidden');
    }
    
    closeBtn.addEventListener('click', function() {
        banner.classList.add('hidden');
        localStorage.setItem('construction-banner-dismissed', 'true');
        console.log('✅ Construction banner dismissed');
    });
    
    console.log('✅ Construction banner initialized');
}

// ========================================
// ROI CALCULATOR
// ========================================

/**
 * Initialize the interactive ROI calculator
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
    
    const hasCalculator = calculatorInputs.locations !== null;
    
    if (!hasCalculator) {
        console.log('ℹ️ Calculator elements not found - skipping initialization');
        return;
    }
    
    Object.keys(calculatorInputs).forEach(key => {
        const input = calculatorInputs[key];
        if (input) {
            input.addEventListener('input', calculateROI);
            input.addEventListener('change', calculateROI);
        }
    });
    
    calculateROI();
    
    console.log('✅ Calculator initialized');
}

/**
 * Calculate and update ROI values in real-time
 */
function calculateROI() {
    try {
        const locations = parseInt(document.getElementById('locations')?.value) || 0;
        const setupFee = parseFloat(document.getElementById('setup-fee')?.value) || 0;
        const pricePerLocation = parseFloat(document.getElementById('price-per-location')?.value) || 0;
        const pricePeriod = document.getElementById('price-period')?.value || 'month';
        const duration = parseInt(document.getElementById('duration')?.value) || 1;
        const maintenanceFee = parseFloat(document.getElementById('maintenance-fee')?.value) || 0;
        
        const locationsValue = document.getElementById('locations-value');
        if (locationsValue) {
            locationsValue.textContent = locations.toLocaleString();
        }
        
        let monthlyRevenuePerLocation = pricePerLocation;
        
        switch(pricePeriod) {
            case 'day':
                monthlyRevenuePerLocation = pricePerLocation * 30;
                break;
            case 'week':
                monthlyRevenuePerLocation = pricePerLocation * 4.33;
                break;
            case 'month':
            default:
                monthlyRevenuePerLocation = pricePerLocation;
                break;
        }
        
        const monthlyLocationRevenue = locations * monthlyRevenuePerLocation;
        const monthlyMaintenanceRevenue = maintenanceFee;
        const monthlyRevenue = monthlyLocationRevenue + monthlyMaintenanceRevenue;
        const totalRecurringRevenue = monthlyRevenue * duration;
        const totalCampaignRevenue = setupFee + totalRecurringRevenue;
        const revenuePerLocation = locations > 0 ? totalCampaignRevenue / locations : 0;
        
        updateCalculatorValue('monthly-revenue', monthlyRevenue);
        updateCalculatorValue('total-revenue', totalCampaignRevenue);
        updateCalculatorValue('revenue-per-location', revenuePerLocation);
        
        updateRevenueBreakdown(monthlyLocationRevenue, monthlyMaintenanceRevenue);
        
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
 */
function updateCalculatorValue(elementId, value) {
    const element = document.getElementById(elementId);
    if (!element) return;
    
    const formattedValue = formatCurrency(value);
    
    element.style.transform = 'scale(1.05)';
    element.textContent = formattedValue;
    
    setTimeout(() => {
        element.style.transform = 'scale(1)';
    }, 200);
}

// ========================================
// CHECKLIST MODAL FUNCTIONALITY - FIXED
// ========================================

/**
 * Initialize checklist modals with proper button handlers
 */
function initChecklistModals() {
    const checklistItems = document.querySelectorAll('.checklist-item');
    
    if (checklistItems.length === 0) {
        console.log('ℹ️ No checklist items found');
        return;
    }
    
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
            title: 'Demo Tested on Mobile & Desktop',
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
            title: 'Branding Finalized (Logo, Colors)',
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
        'target-audience': {
            title: 'Target Audience Identified',
            content: `
                <h4>Why This Matters</h4>
                <p>Understanding your target audience ensures you place coins in the right locations and craft messaging that resonates with players.</p>
                
                <h4>Key Demographics to Define</h4>
                <ul>
                    <li><strong>Age Range:</strong> Gen Z (18-25), Millennials (26-40), or broader</li>
                    <li><strong>Interests:</strong> Gaming, crypto, shopping, dining, events</li>
                    <li><strong>Behaviors:</strong> Early adopters, social sharers, deal seekers</li>
                    <li><strong>Location Patterns:</strong> Where does your audience spend time?</li>
                    <li><strong>Tech Savviness:</strong> Comfortable with AR and crypto or need guidance</li>
                </ul>
                
                <h4>Research Methods</h4>
                <p>Use social media analytics to understand your existing audience. Survey current customers about their interests. Check competitor campaigns to see who engages. Use Google Analytics and foot traffic data to validate assumptions.</p>
                
                <h4>Best Practice</h4>
                <p>Start narrow and expand. Better to perfectly serve 1,000 ideal users than loosely target 10,000 random people.</p>
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
        'coin-rewards': {
            title: 'Coin Rarity & Rewards Configured',
            content: `
                <h4>Why This Matters</h4>
                <p>Reward structure drives player motivation. Proper balance between common and rare coins keeps players engaged without depleting your token budget.</p>
                
                <h4>Recommended Rarity Tiers</h4>
                <ul>
                    <li><strong>Common (70%):</strong> 10-50 $Ember tokens - Easy to find, keeps players hunting</li>
                    <li><strong>Rare (25%):</strong> 100-250 $Ember tokens - Exciting finds that generate social shares</li>
                    <li><strong>Legendary (5%):</strong> 500-1000 $Ember tokens - Viral moments, creates FOMO</li>
                </ul>
                
                <h4>Dynamic Rewards Strategy</h4>
                <p>Start with higher rewards during launch week to drive initial engagement. Gradually adjust based on player feedback and budget. Use legendary coins for special events and partner promotions.</p>
                
                <h4>Budget Management</h4>
                <p>Calculate your total token budget upfront. Monitor redemption rates daily. Adjust rarity distribution if players are collecting too quickly or too slowly. Aim for 60-70% of tokens distributed within campaign duration.</p>
            `
        },
        'airdrop-schedule': {
            title: 'Airdrop Schedule Planned',
            content: `
                <h4>Why This Matters</h4>
                <p>Scheduled airdrops create viral moments and drive player acquisition. Strategic timing can 10X your social media engagement.</p>
                
                <h4>Airdrop Strategy</h4>
                <ul>
                    <li><strong>Launch Airdrop:</strong> Day 1 - First 100 players get bonus tokens</li>
                    <li><strong>Weekly Airdrops:</strong> Every Friday at 5pm - "Happy Hour" token drops</li>
                    <li><strong>Milestone Airdrops:</strong> When you hit 500, 1000, 5000 players</li>
                    <li><strong>Partner Airdrops:</strong> Coordinate with sponsors for co-branded drops</li>
                    <li><strong>Event Airdrops:</strong> During festivals, sports games, or local events</li>
                </ul>
                
                <h4>Announcement Best Practices</h4>
                <p>Announce airdrops 24-48 hours in advance to build anticipation. Create countdown posts on social media. Share photos/videos of past airdrops. Make sharing a requirement for entry to amplify reach.</p>
                
                <h4>Timing Tips</h4>
                <p>Schedule airdrops during peak engagement hours (lunch 12-1pm, evening 5-7pm). Coordinate with partner businesses for maximum foot traffic. Track which time slots perform best and optimize future airdrops.</p>
            `
        },
        'marketing-materials': {
            title: 'Marketing Materials Ready',
            content: `
                <h4>Why This Matters</h4>
                <p>Professional marketing materials establish credibility and drive player acquisition. Good content = more downloads = more engagement.</p>
                
                <h4>Essential Marketing Assets</h4>
                <ul>
                    <li><strong>App Screenshots:</strong> 3-5 images showing AR gameplay, coin collection, rewards</li>
                    <li><strong>Teaser Video:</strong> 15-30 second demo showing the app in action</li>
                    <li><strong>Social Media Graphics:</strong> Branded posts for Instagram, Facebook, Twitter</li>
                    <li><strong>Press Kit:</strong> Logo, screenshots, campaign description, contact info</li>
                    <li><strong>QR Codes:</strong> For physical locations directing to app download</li>
                    <li><strong>Partner Materials:</strong> Posters, table tents for participating businesses</li>
                </ul>
                
                <h4>Content Calendar</h4>
                <p>Plan 2 weeks of social posts in advance. Mix educational content (how to play), user-generated content (player success stories), and promotional content (airdrops, new locations). Post daily during launch week, then 3-4 times per week.</p>
                
                <h4>Quick Creation Tips</h4>
                <p>Use Canva for quick graphics. Record screen capture videos on your phone. Repurpose player testimonials and location photos. Keep messaging simple and action-focused.</p>
            `
        },
        'launch-announced': {
            title: 'Launch Announced on Social Media',
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
        },
        'user-feedback': {
            title: 'User Feedback System in Place',
            content: `
                <h4>Why This Matters</h4>
                <p>Player feedback is your secret weapon for continuous improvement. Users will tell you exactly what's working and what needs fixing.</p>
                
                <h4>Feedback Collection Methods</h4>
                <ul>
                    <li><strong>In-App Surveys:</strong> Quick 1-2 question polls after coin collection</li>
                    <li><strong>Social Listening:</strong> Monitor mentions, comments, DMs on social platforms</li>
                    <li><strong>Direct Emails:</strong> Set up support@yourdomain.com for player questions</li>
                    <li><strong>Discord/Telegram:</strong> Create community channels for player discussions</li>
                    <li><strong>App Store Reviews:</strong> Respond to both positive and negative reviews</li>
                </ul>
                
                <h4>What to Ask</h4>
                <p>Keep surveys short: "How easy was it to find coins? (1-5)" or "Would you recommend this to friends? (Yes/No/Maybe)". Ask open-ended questions like "What would make this more fun?" at the end of campaigns.</p>
                
                <h4>Acting on Feedback</h4>
                <p>Categorize feedback into: Bugs (fix immediately), Features (evaluate for future), Complaints (address quickly), Praise (share with team). Implement at least one user suggestion per week to show you're listening. Thank users publicly when you implement their ideas.</p>
            `
        }
    };
    
    // Store content in global state
    OnboardingApp.checklistModals = checklistContent;
    
    // CRITICAL FIX: Add event listeners to "Learn More" buttons with data-content attributes
    const learnMoreButtons = document.querySelectorAll('.checklist-learn-btn[data-content]');
    
    learnMoreButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const contentKey = this.getAttribute('data-content');
            console.log('Learn More clicked:', contentKey);
            
            if (contentKey && checklistContent[contentKey]) {
                openChecklistModal(checklistContent[contentKey]);
            } else {
                console.error('No content found for key:', contentKey);
            }
        });
    });
    
    // Also handle checkbox state persistence
    checklistItems.forEach((item, index) => {
        const checkbox = item.querySelector('input[type="checkbox"]');
        
        if (checkbox) {
            const savedState = localStorage.getItem(`checklist-${index}`);
            if (savedState === 'true') {
                checkbox.checked = true;
            }
            
            checkbox.addEventListener('change', function(e) {
                e.stopPropagation();
                localStorage.setItem(`checklist-${index}`, this.checked);
                
                if (this.checked) {
                    const itemEl = this.closest('.checklist-item');
                    itemEl.style.animation = 'none';
                    setTimeout(() => {
                        itemEl.style.animation = 'pulse 0.3s ease-in-out';
                    }, 10);
                }
            });
        }
    });
    
    console.log(`✅ Initialized ${checklistItems.length} checklist items with ${learnMoreButtons.length} Learn More buttons`);
}

/**
 * Create modal overlay element
 */
function createModalOverlay() {
    if (document.getElementById('checklist-modal-overlay')) {
        return;
    }
    
    const overlay = document.createElement('div');
    overlay.id = 'checklist-modal-overlay';
    overlay.className = 'checklist-modal-overlay';
    
    overlay.innerHTML = `
        <div class="checklist-modal">
            <div class="checklist-modal-header">
                <h3 id="modal-title">Loading...</h3>
                <button class="checklist-modal-close" aria-label="Close modal">&times;</button>
            </div>
            <div class="checklist-modal-body" id="modal-body">
                <!-- Content will be inserted here -->
            </div>
        </div>
    `;
    
    document.body.appendChild(overlay);
    
    const closeBtn = overlay.querySelector('.checklist-modal-close');
    closeBtn.addEventListener('click', closeChecklistModal);
    
    overlay.addEventListener('click', function(e) {
        if (e.target === overlay) {
            closeChecklistModal();
        }
    });
    
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeChecklistModal();
        }
    });
}

/**
 * Open checklist modal with content
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
        
        console.log('Modal opened:', content.title);
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
    
    if (copyButtons.length > 0) {
        console.log(`✅ Initialized ${copyButtons.length} copy buttons`);
    }
}

/**
 * Copy text to clipboard
 */
function copyToClipboard(button) {
    const targetId = button.getAttribute('data-target');
    const targetElement = document.getElementById(targetId);
    
    if (!targetElement) {
        console.error('Target element not found:', targetId);
        return;
    }
    
    const textToCopy = targetElement.textContent || targetElement.value;
    
    navigator.clipboard.writeText(textToCopy).then(() => {
        const originalText = button.textContent;
        button.textContent = '✓ Copied!';
        button.classList.add('copied');
        
        setTimeout(() => {
            button.textContent = originalText;
            button.classList.remove('copied');
        }, 2000);
    }).catch(err => {
        console.error('Failed to copy:', err);
        alert('Failed to copy to clipboard');
    });
}

// ========================================
// SCROLL REVEAL ANIMATION
// ========================================

/**
 * Initialize scroll reveal animations
 */
function initScrollReveal() {
    const revealElements = document.querySelectorAll('.scroll-reveal');
    
    if (revealElements.length === 0) {
        console.log('ℹ️ No scroll reveal elements found');
        return;
    }
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    OnboardingApp.scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                OnboardingApp.scrollObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    revealElements.forEach(el => {
        OnboardingApp.scrollObserver.observe(el);
    });
    
    console.log(`✅ Scroll reveal initialized for ${revealElements.length} elements`);
}

// ========================================
// SMOOTH SCROLL
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
 */
function formatCurrency(value, currency = '$') {
    return `${currency}${value.toLocaleString('en-US', {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    })}`;
}

/**
 * Debounce function
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
 * Throttle function
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
 */
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

/**
 * Get query parameter from URL
 */
function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

// ========================================
// EXPORT FUNCTIONS
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

console.log('🔥 Vault Phoenix Onboarding v3.1 - Ready!');
