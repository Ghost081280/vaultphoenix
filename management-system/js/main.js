/* ============================================
   VAULT PHOENIX MANAGEMENT SYSTEM
   Main JavaScript - Core App Logic - FIXED
   ============================================ */

// ============================================
// GLOBAL STATE MANAGEMENT
// ============================================

const AppState = {
    currentRole: null,
    currentSection: 'overview',
    userData: {
        name: 'Demo User',
        email: 'demo@phoenix.com',
        avatar: 'VP',
        notifications: 3
    },
    tokenBalance: {
        amount: 28450,
        price: 0.0035
    },
    sidebarOpen: false,
    walletConnected: false,
    walletAddress: null,
    currentCampaignId: null,
    scannerAppDownloaded: false,
    onboardingComplete: false,
    currentOnboardingStep: 0
};

// ============================================
// ONBOARDING CONTENT
// ============================================

const OnboardingContent = {
    'campaign-manager': [
        {
            title: '🔥 Welcome to Vault Phoenix',
            content: `
                <div style="text-align: center; max-width: 700px; margin: 0 auto;">
                    <div style="font-size: 5rem; margin-bottom: 20px;">🚀</div>
                    <h2 style="font-size: 2.5rem; margin-bottom: 20px;">The $Ember Advertisement Ecosystem</h2>
                    <p style="font-size: 1.2rem; line-height: 1.8; margin-bottom: 30px;">
                        Create location-based AR gaming campaigns where advertisers fund token stops with their advertisements. 
                        Players collect tokens, see ads, and can redeem offers at advertiser locations.
                    </p>
                    <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; margin-top: 40px;">
                        <div style="padding: 20px; background: rgba(0,0,0,0.3); border-radius: 12px;">
                            <div style="font-size: 2rem; margin-bottom: 10px;">1️⃣</div>
                            <h4 style="margin-bottom: 8px;">Build Campaign</h4>
                            <p style="font-size: 0.9rem; color: rgba(255,255,255,0.7);">Create white-label apps or integrate via SDK</p>
                        </div>
                        <div style="padding: 20px; background: rgba(0,0,0,0.3); border-radius: 12px;">
                            <div style="font-size: 2rem; margin-bottom: 10px;">2️⃣</div>
                            <h4 style="margin-bottom: 8px;">Advertisers Join</h4>
                            <p style="font-size: 0.9rem; color: rgba(255,255,255,0.7);">They fund token stops with ads</p>
                        </div>
                        <div style="padding: 20px; background: rgba(0,0,0,0.3); border-radius: 12px;">
                            <div style="font-size: 2rem; margin-bottom: 10px;">3️⃣</div>
                            <h4 style="margin-bottom: 8px;">Earn Revenue</h4>
                            <p style="font-size: 0.9rem; color: rgba(255,255,255,0.7);">Monthly location fees + token sales</p>
                        </div>
                    </div>
                </div>
            `
        },
        {
            title: '💰 Your Revenue Model',
            content: `
                <div style="max-width: 700px; margin: 0 auto;">
                    <h2 style="font-size: 2rem; margin-bottom: 30px; text-align: center;">How You Earn Money</h2>
                    <div style="display: grid; gap: 20px;">
                        <div style="padding: 25px; background: rgba(240,165,0,0.1); border: 2px solid rgba(240,165,0,0.4); border-radius: 12px;">
                            <div style="display: flex; align-items: start; gap: 15px;">
                                <div style="font-size: 2.5rem;">📍</div>
                                <div>
                                    <h3 style="color: var(--color-primary-gold); margin-bottom: 10px;">Location Placement Fees</h3>
                                    <p style="line-height: 1.7; margin-bottom: 10px;">
                                        Advertisers pay monthly fees per token stop in your campaign. You set the price per location.
                                    </p>
                                    <div style="color: #22c55e; font-weight: 700;">Recurring Monthly Revenue</div>
                                </div>
                            </div>
                        </div>
                        
                        <div style="padding: 25px; background: rgba(240,165,0,0.1); border: 2px solid rgba(240,165,0,0.4); border-radius: 12px;">
                            <div style="display: flex; align-items: start; gap: 15px;">
                                <div style="font-size: 2.5rem;">💎</div>
                                <div>
                                    <h3 style="color: var(--color-primary-gold); margin-bottom: 10px;">$Ember Token Sales</h3>
                                    <p style="line-height: 1.7; margin-bottom: 10px;">
                                        Advertisers purchase $Ember tokens from you to fund their token stops with advertisements.
                                    </p>
                                    <div style="color: #22c55e; font-weight: 700;">One-Time Purchase Revenue</div>
                                </div>
                            </div>
                        </div>
                        
                        <div style="padding: 20px; background: rgba(34,197,94,0.1); border: 2px solid rgba(34,197,94,0.4); border-radius: 12px; text-align: center;">
                            <p style="font-size: 1.1rem; margin: 0;">
                                <strong style="color: #22c55e;">Plus:</strong> You get $100 starter bonus in $Ember tokens to fund your own campaign token stops!
                            </p>
                        </div>
                    </div>
                </div>
            `
        },
        {
            title: '🎮 The Complete Flow',
            content: `
                <div style="max-width: 800px; margin: 0 auto;">
                    <h2 style="font-size: 2rem; margin-bottom: 30px; text-align: center;">How The Circular Economy Works</h2>
                    <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px;">
                        <div style="padding: 20px; background: rgba(0,0,0,0.3); border-radius: 12px;">
                            <div style="font-size: 2rem; margin-bottom: 10px;">1️⃣</div>
                            <h4 style="margin-bottom: 10px;">Advertiser Joins</h4>
                            <p style="font-size: 0.9rem; line-height: 1.6; color: rgba(255,255,255,0.8);">
                                Pays monthly location fee + purchases $Ember tokens to fund token stops with their advertisement
                            </p>
                        </div>
                        <div style="padding: 20px; background: rgba(0,0,0,0.3); border-radius: 12px;">
                            <div style="font-size: 2rem; margin-bottom: 10px;">2️⃣</div>
                            <h4 style="margin-bottom: 10px;">Players Collect</h4>
                            <p style="font-size: 0.9rem; line-height: 1.6; color: rgba(255,255,255,0.8);">
                                Visit locations in AR game, collect $Ember tokens, and immediately see the advertiser's advertisement
                            </p>
                        </div>
                        <div style="padding: 20px; background: rgba(0,0,0,0.3); border-radius: 12px;">
                            <div style="font-size: 2rem; margin-bottom: 10px;">3️⃣</div>
                            <h4 style="margin-bottom: 10px;">Cash Out or Redeem</h4>
                            <p style="font-size: 0.9rem; line-height: 1.6; color: rgba(255,255,255,0.8);">
                                Players choose: Cash out to Coinbase OR visit advertiser's location to redeem offers
                            </p>
                        </div>
                        <div style="padding: 20px; background: rgba(0,0,0,0.3); border-radius: 12px;">
                            <div style="font-size: 2rem; margin-bottom: 10px;">4️⃣</div>
                            <h4 style="margin-bottom: 10px;">Circular Economy</h4>
                            <p style="font-size: 0.9rem; line-height: 1.6; color: rgba(255,255,255,0.8);">
                                Advertiser scans player QR → receives $Ember back → gives offer → can reuse tokens for new stops!
                            </p>
                        </div>
                    </div>
                </div>
            `
        }
    ],
    'advertiser': [
        {
            title: '🔥 Welcome to Vault Phoenix',
            content: `
                <div style="text-align: center; max-width: 700px; margin: 0 auto;">
                    <div style="font-size: 5rem; margin-bottom: 20px;">📍</div>
                    <h2 style="font-size: 2.5rem; margin-bottom: 20px;">How The $Ember Advertisement System Works</h2>
                    <p style="font-size: 1.2rem; line-height: 1.8; margin-bottom: 30px;">
                        Drive verified foot traffic to your physical location through location-based AR gaming campaigns. 
                        Your advertisements reach players exactly when they're near your business.
                    </p>
                    <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; margin-top: 40px;">
                        <div style="padding: 20px; background: rgba(0,0,0,0.3); border-radius: 12px;">
                            <div style="font-size: 2rem; margin-bottom: 10px;">1️⃣</div>
                            <h4 style="margin-bottom: 8px;">Fund Token Stop</h4>
                            <p style="font-size: 0.9rem; color: rgba(255,255,255,0.7);">Buy $Ember + add your advertisement</p>
                        </div>
                        <div style="padding: 20px; background: rgba(0,0,0,0.3); border-radius: 12px;">
                            <div style="font-size: 2rem; margin-bottom: 10px;">2️⃣</div>
                            <h4 style="margin-bottom: 8px;">Players Visit</h4>
                            <p style="font-size: 0.9rem; color: rgba(255,255,255,0.7);">Collect tokens & see your ad</p>
                        </div>
                        <div style="padding: 20px; background: rgba(0,0,0,0.3); border-radius: 12px;">
                            <div style="font-size: 2rem; margin-bottom: 10px;">3️⃣</div>
                            <h4 style="margin-bottom: 8px;">Get Tokens Back</h4>
                            <p style="font-size: 0.9rem; color: rgba(255,255,255,0.7);">Scan QR codes for redemptions</p>
                        </div>
                    </div>
                </div>
            `
        },
        {
            title: '💰 Your Investment & Returns',
            content: `
                <div style="max-width: 700px; margin: 0 auto;">
                    <h2 style="font-size: 2rem; margin-bottom: 30px; text-align: center;">What You Pay & What You Get</h2>
                    <div style="display: grid; gap: 20px; margin-bottom: 30px;">
                        <div style="padding: 25px; background: rgba(240,165,0,0.1); border: 2px solid rgba(240,165,0,0.4); border-radius: 12px;">
                            <h3 style="color: var(--color-primary-gold); margin-bottom: 15px;">💳 Your Costs</h3>
                            <ul style="list-style: none; padding: 0; margin: 0; line-height: 2;">
                                <li>📍 <strong>Monthly Location Fee:</strong> Set by campaign manager (typically $200-500/month per stop)</li>
                                <li>💎 <strong>$Ember Tokens:</strong> One-time purchase to fund your token stops (~$35-175)</li>
                                <li>✓ <strong>All Features Included:</strong> Scanner app, analytics, custom ads - no hidden fees</li>
                            </ul>
                        </div>
                        
                        <div style="padding: 25px; background: rgba(34,197,94,0.1); border: 2px solid rgba(34,197,94,0.4); border-radius: 12px;">
                            <h3 style="color: #22c55e; margin-bottom: 15px;">🎯 What You Get</h3>
                            <ul style="list-style: none; padding: 0; margin: 0; line-height: 2;">
                                <li>✓ GPS-verified foot traffic to your location</li>
                                <li>✓ Your advertisement shown to every player</li>
                                <li>✓ Players arrive ready to spend/redeem</li>
                                <li>✓ Get $Ember tokens back via redemptions</li>
                                <li>✓ Reuse recovered tokens for new stops</li>
                                <li>✓ Real-time analytics & ROI tracking</li>
                            </ul>
                        </div>
                    </div>
                    <div style="padding: 20px; background: rgba(59,130,246,0.1); border: 2px solid rgba(59,130,246,0.4); border-radius: 12px; text-align: center;">
                        <p style="font-size: 1.1rem; margin: 0; line-height: 1.7;">
                            <strong>Average ROI:</strong> Most advertisers see 8-12x return on their monthly investment through increased foot traffic and sales.
                        </p>
                    </div>
                </div>
            `
        },
        {
            title: '🔄 The Complete Player Journey',
            content: `
                <div style="max-width: 800px; margin: 0 auto;">
                    <h2 style="font-size: 2rem; margin-bottom: 30px; text-align: center;">From Token Collection to Redemption</h2>
                    <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px;">
                        <div style="padding: 20px; background: rgba(0,0,0,0.3); border-radius: 12px;">
                            <div style="font-size: 2rem; margin-bottom: 10px;">1️⃣</div>
                            <h4 style="margin-bottom: 10px;">Player Discovers Your Location</h4>
                            <p style="font-size: 0.9rem; line-height: 1.6; color: rgba(255,255,255,0.8);">
                                Players see your location on the AR game map and navigate to your physical address to collect tokens
                            </p>
                        </div>
                        <div style="padding: 20px; background: rgba(0,0,0,0.3); border-radius: 12px;">
                            <div style="font-size: 2rem; margin-bottom: 10px;">2️⃣</div>
                            <h4 style="margin-bottom: 10px;">Collects Tokens & Sees Your Ad</h4>
                            <p style="font-size: 0.9rem; line-height: 1.6; color: rgba(255,255,255,0.8);">
                                Player uses AR camera to collect $Ember tokens, then immediately sees your full advertisement with offer details
                            </p>
                        </div>
                        <div style="padding: 20px; background: rgba(0,0,0,0.3); border-radius: 12px;">
                            <div style="font-size: 2rem; margin-bottom: 10px;">3️⃣</div>
                            <h4 style="margin-bottom: 10px;">Decides: Cash Out or Redeem</h4>
                            <p style="font-size: 0.9rem; line-height: 1.6; color: rgba(255,255,255,0.8);">
                                Player can cash out to Coinbase OR visit your location to redeem $Ember for your exclusive offers
                            </p>
                        </div>
                        <div style="padding: 20px; background: rgba(0,0,0,0.3); border-radius: 12px;">
                            <div style="font-size: 2rem; margin-bottom: 10px;">4️⃣</div>
                            <h4 style="margin-bottom: 10px;">You Scan & Complete Sale</h4>
                            <p style="font-size: 0.9rem; line-height: 1.6; color: rgba(255,255,255,0.8);">
                                Player visits your location → you scan their QR code → receive $Ember back → give them your offer or discount!
                            </p>
                        </div>
                    </div>
                    <div style="margin-top: 30px; padding: 20px; background: rgba(240,165,0,0.1); border: 2px solid rgba(240,165,0,0.4); border-radius: 12px; text-align: center;">
                        <p style="font-size: 1.1rem; margin: 0;">
                            💡 <strong>Key Insight:</strong> Every visitor is GPS-verified and pre-qualified. They came specifically to your location because of your offer!
                        </p>
                    </div>
                </div>
            `
        }
    ]
};

// ============================================
// ROLE CONFIGURATIONS - UPDATED
// ============================================

const RoleConfig = {
    'campaign-manager': {
        name: 'Campaign Manager',
        icon: '🚀',
        showTokenBalance: true,
        navigation: [
            { icon: '📊', label: 'Dashboard Overview', section: 'overview' },
            { icon: '🎮', label: 'App Builder / SDK', section: 'app-setup' },
            { icon: '🗺️', label: 'Campaign Control', section: 'campaigns' },
            { icon: '🎯', label: 'Airdrop Center', section: 'airdrops' },
            { icon: '💰', label: 'Revenue Analytics', section: 'revenue' },
            { icon: '🏢', label: 'Advertiser Management', section: 'advertisers' },
            { icon: '💎', label: 'Token Inventory', section: 'tokens' },
            { icon: '👛', label: 'Wallet & Funding', section: 'wallet' },
            { icon: '📱', label: 'QR Scanner App', section: 'scanner' },
            { icon: '⚙️', label: 'Settings', section: 'settings' }
        ]
    },
    'advertiser': {
        name: 'Advertiser',
        icon: '📍',
        showTokenBalance: false,
        navigation: [
            { icon: '📊', label: 'Dashboard Overview', section: 'overview' },
            { icon: '🛒', label: 'Campaign Marketplace', section: 'marketplace' },
            { icon: '💎', label: 'My $Ember Balance', section: 'tokens' },
            { icon: '👛', label: 'Buy $Ember Tokens', section: 'wallet' },
            { icon: '📱', label: 'QR Scanner App', section: 'scanner' },
            { icon: '🎁', label: 'Airdrop Requests', section: 'airdrop-requests' },
            { icon: '💳', label: 'Payment Center', section: 'payments' },
            { icon: '📈', label: 'Performance Analytics', section: 'analytics' },
            { icon: '💰', label: 'ROI Calculator', section: 'budget' },
            { icon: '⚙️', label: 'Account Settings', section: 'settings' }
        ]
    }
};

// ============================================
// INITIALIZATION
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    console.log('Vault Phoenix Management System - Initializing...');
    
    if (sessionStorage.getItem('isLoggedIn') !== 'true') {
        window.location.href = 'index.html';
        return;
    }
    
    const selectedRole = sessionStorage.getItem('selectedRole');
    
    if (!selectedRole) {
        console.warn('No role selected, redirecting to role selection...');
        window.location.href = 'role-selection.html';
        return;
    }
    
    initializeApp(selectedRole);
    
    // Apply overflow fix after initialization
    setTimeout(applyOverflowFix, 500);
});

/**
 * Initialize the application
 */
function initializeApp(role) {
    console.log('Initializing app with role:', role);
    
    AppState.currentRole = role;
    
    setupRoleBasedUI(role);
    loadNavigationMenu(role);
    updateTokenBalance();
    
    if (role === 'campaign-manager') {
        initializeCoinbaseWallet();
    }
    
    if (role === 'advertiser') {
        initializeAdvertiserScanner();
    }
    
    // Check if onboarding is complete
    const onboardingKey = `onboarding_${role}_complete`;
    const onboardingComplete = sessionStorage.getItem(onboardingKey);
    
    if (!onboardingComplete) {
        showOnboarding(role);
    } else {
        loadSection('overview');
        setupEventListeners();
    }
    
    console.log('App initialization complete');
}

/**
 * Show onboarding flow
 */
function showOnboarding(role) {
    const steps = OnboardingContent[role];
    AppState.currentOnboardingStep = 0;
    
    showOnboardingStep(role, 0);
}

/**
 * Show specific onboarding step
 */
function showOnboardingStep(role, stepIndex) {
    const steps = OnboardingContent[role];
    
    if (stepIndex >= steps.length) {
        completeOnboarding(role);
        return;
    }
    
    const step = steps[stepIndex];
    
    const overlay = document.createElement('div');
    overlay.className = 'onboarding-overlay';
    overlay.id = 'onboardingOverlay';
    
    const progressDots = steps.map((_, index) => 
        `<div class="progress-dot ${index === stepIndex ? 'active' : ''}"></div>`
    ).join('');
    
    const isLastStep = stepIndex === steps.length - 1;
    
    overlay.innerHTML = `
        <div class="onboarding-module">
            <div class="onboarding-progress">
                ${progressDots}
            </div>
            <div class="onboarding-content">
                ${step.content}
            </div>
            <div class="onboarding-actions">
                ${stepIndex > 0 ? '<button class="btn btn-outline" onclick="previousOnboardingStep()">← Back</button>' : ''}
                <button class="btn btn-primary btn-large" onclick="nextOnboardingStep()">
                    ${isLastStep ? 'Get Started 🚀' : 'Next →'}
                </button>
            </div>
        </div>
    `;
    
    document.body.appendChild(overlay);
    AppState.currentOnboardingStep = stepIndex;
}

/**
 * Next onboarding step
 */
function nextOnboardingStep() {
    const role = AppState.currentRole;
    const currentStep = AppState.currentOnboardingStep;
    
    const overlay = document.getElementById('onboardingOverlay');
    if (overlay) {
        overlay.remove();
    }
    
    showOnboardingStep(role, currentStep + 1);
}

/**
 * Previous onboarding step
 */
function previousOnboardingStep() {
    const role = AppState.currentRole;
    const currentStep = AppState.currentOnboardingStep;
    
    if (currentStep > 0) {
        const overlay = document.getElementById('onboardingOverlay');
        if (overlay) {
            overlay.remove();
        }
        
        showOnboardingStep(role, currentStep - 1);
    }
}

/**
 * Complete onboarding
 */
function completeOnboarding(role) {
    const overlay = document.getElementById('onboardingOverlay');
    if (overlay) {
        overlay.remove();
    }
    
    const onboardingKey = `onboarding_${role}_complete`;
    sessionStorage.setItem(onboardingKey, 'true');
    
    loadSection('overview');
    setupEventListeners();
}

/**
 * Initialize advertiser scanner app status
 */
function initializeAdvertiserScanner() {
    const scannerDownloaded = sessionStorage.getItem('scannerAppDownloaded');
    if (scannerDownloaded === 'true') {
        AppState.scannerAppDownloaded = true;
        
        if (window.AdvertiserData?.scannerApp) {
            window.AdvertiserData.scannerApp.downloaded = true;
        }
    }
}

/**
 * Apply overflow fix to all elements
 */
function applyOverflowFix() {
    const mainContent = document.getElementById('mainContent');
    if (mainContent) {
        mainContent.style.maxWidth = '100%';
        mainContent.style.overflowX = 'hidden';
    }
    
    document.querySelectorAll('.builder-panel').forEach(panel => {
        panel.style.maxWidth = '100%';
        panel.style.overflowX = 'hidden';
        panel.style.boxSizing = 'border-box';
    });
    
    document.querySelectorAll('.card, .stat-card, .app-card, .revenue-stream').forEach(card => {
        card.style.maxWidth = '100%';
        card.style.boxSizing = 'border-box';
    });
    
    document.querySelectorAll('.hero-stats, .apps-grid, .revenue-grid, .monitoring-grid, .builder-grid').forEach(grid => {
        grid.style.maxWidth = '100%';
        grid.style.width = '100%';
    });
}

/**
 * Setup role-based UI elements
 */
function setupRoleBasedUI(role) {
    const config = RoleConfig[role];
    
    const tokenWidget = document.getElementById('tokenBalanceWidget');
    if (tokenWidget) {
        tokenWidget.style.display = config.showTokenBalance ? 'flex' : 'none';
    }
}

/**
 * Load navigation menu based on role
 */
function loadNavigationMenu(role) {
    const config = RoleConfig[role];
    const navMenu = document.getElementById('navMenu');
    
    if (!navMenu) return;
    
    navMenu.innerHTML = '';
    
    config.navigation.forEach(item => {
        const li = document.createElement('li');
        li.className = 'nav-item';
        
        const link = document.createElement('a');
        link.className = 'nav-link';
        link.dataset.section = item.section;
        link.innerHTML = `
            <span class="nav-icon">${item.icon}</span>
            <span>${item.label}</span>
        `;
        
        link.addEventListener('click', (e) => {
            e.preventDefault();
            loadSection(item.section);
        });
        
        li.appendChild(link);
        navMenu.appendChild(li);
    });
    
    const firstLink = navMenu.querySelector('.nav-link');
    if (firstLink) {
        firstLink.classList.add('active');
    }
}

/**
 * Load content section
 */
function loadSection(section) {
    console.log('Loading section:', section);
    
    AppState.currentSection = section;
    updateActiveNavItem(section);
    updatePageTitle(section);
    
    const content = getSectionContent(section);
    const mainContent = document.getElementById('dashboardContent');
    
    if (mainContent) {
        mainContent.innerHTML = content;
    }
    
    if (window.innerWidth < 1024) {
        closeSidebar();
    }
    
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    setTimeout(applyOverflowFix, 200);
}

/**
 * Get section content based on role and section
 */
function getSectionContent(section) {
    const role = AppState.currentRole;
    
    if (section === 'overview') {
        return getOverviewContent(role);
    }
    
    if (role === 'campaign-manager') {
        if (section === 'app-setup') return getAppSetupContent(role);
        if (section === 'campaigns') return getCampaignsContent(role);
        if (section === 'revenue') return getRevenueContent(role);
        if (section === 'airdrops') return getAirdropsContent(role);
        if (section === 'advertisers') return getMerchantsContent(role);
        if (section === 'tokens') return getTokensContent(role);
        if (section === 'wallet') return getWalletContent(role);
        if (section === 'scanner') return getScannerAppContent(role);
    }
    
    if (role === 'advertiser') {
        if (section === 'marketplace') return getMarketplaceContent(role);
        if (section === 'tokens') return getTokensContent(role);
        if (section === 'wallet') return getWalletContent(role);
        if (section === 'scanner') return getScannerAppContent(role);
        if (section === 'airdrop-requests') return getAirdropRequestsContent(role);
        if (section === 'payments') return getPaymentsContent(role);
        if (section === 'analytics') return getAdvertiserAnalyticsContent(role);
        if (section === 'budget') return getBudgetContent(role);
    }
    
    if (section === 'settings') {
        return getSettingsContent(role);
    }
    
    return getPlaceholderContent(section);
}

/**
 * Get overview content for current role
 */
function getOverviewContent(role) {
    if (role === 'campaign-manager') {
        return getCampaignManagerOverview();
    } else if (role === 'advertiser') {
        return getAdvertiserOverview();
    }
}

/**
 * Campaign Manager Overview
 */
function getCampaignManagerOverview() {
    const activeCampaigns = 1;
    const totalLocations = 3;
    const advertisers = 1;
    
    return `
        <div class="hero-stats">
            <div class="stat-card">
                <div class="stat-icon">💰</div>
                <div class="stat-label">Monthly Revenue</div>
                <div class="stat-value">$650</div>
                <div class="stat-details">
                    <div class="stat-detail-item">
                        <span>Location Fees:</span>
                        <span>$500</span>
                    </div>
                    <div class="stat-detail-item">
                        <span>Token Sales:</span>
                        <span>$150</span>
                    </div>
                </div>
            </div>
            
            <div class="stat-card">
                <div class="stat-icon">🎮</div>
                <div class="stat-label">Active Campaigns</div>
                <div class="stat-value">${activeCampaigns}</div>
                <div class="stat-details">
                    <div class="stat-detail-item">
                        <span>Live Apps:</span>
                        <span>1</span>
                    </div>
                    <div class="stat-detail-item">
                        <span>Active Players:</span>
                        <span>847</span>
                    </div>
                </div>
            </div>
            
            <div class="stat-card">
                <div class="stat-icon">📍</div>
                <div class="stat-label">Token Locations</div>
                <div class="stat-value">${totalLocations}</div>
                <div class="stat-details">
                    <div class="stat-detail-item">
                        <span>Campaign Stops:</span>
                        <span>2</span>
                    </div>
                    <div class="stat-detail-item">
                        <span>Advertiser Stops:</span>
                        <span>1</span>
                    </div>
                </div>
            </div>
            
            <div class="stat-card">
                <div class="stat-icon">🏢</div>
                <div class="stat-label">Active Advertisers</div>
                <div class="stat-value">${advertisers}</div>
                <div class="stat-details">
                    <div class="stat-detail-item">
                        <span>With Scanner:</span>
                        <span>1</span>
                    </div>
                    <div class="stat-detail-item">
                        <span>Redemptions:</span>
                        <span>65</span>
                    </div>
                </div>
            </div>
        </div>
        
        <div class="dashboard-section">
            <h3 style="font-size: 1.5rem; color: var(--color-primary-gold); margin-bottom: 20px;">⚡ Quick Actions</h3>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 15px; max-width: 100%;">
                <button class="btn btn-primary" onclick="loadSection('app-setup')" style="padding: 18px; font-size: 1rem;">
                    🎮 Launch New Campaign
                </button>
                <button class="btn btn-secondary" onclick="loadSection('campaigns')" style="padding: 18px; font-size: 1rem;">
                    📍 Manage Token Locations
                </button>
                <button class="btn btn-outline" onclick="loadSection('airdrops')" style="padding: 18px; font-size: 1rem;">
                    🎯 Send Airdrop
                </button>
            </div>
        </div>

        <div class="dashboard-section">
            <div class="section-header">
                <h2 class="section-title">🎮 My Campaigns</h2>
                <div class="section-actions">
                    <button class="btn btn-primary" onclick="loadSection('app-setup')">+ New Campaign</button>
                </div>
            </div>
            
            <div class="apps-grid">
                <div class="app-card" onclick="loadSection('campaigns')">
                    <div class="app-header">
                        <div class="app-name">🔥 $Ember Hunt</div>
                        <div class="app-status">
                            <span class="status-indicator status-live"></span>
                            <span style="color: #22c55e;">LIVE</span>
                        </div>
                    </div>
                    <div style="margin: 15px 0; padding: 12px; background: rgba(0,0,0,0.3); border-radius: 8px;">
                        <div style="font-size: 0.85rem; color: rgba(255,255,255,0.6); margin-bottom: 5px;">Type</div>
                        <div style="font-weight: 700;">White Label App</div>
                    </div>
                    <div class="app-metrics">
                        <div class="app-metric">
                            <span class="metric-label">Players Now</span>
                            <span class="metric-value">47</span>
                        </div>
                        <div class="app-metric">
                            <span class="metric-label">Token Locations</span>
                            <span class="metric-value">${totalLocations}</span>
                        </div>
                        <div class="app-metric">
                            <span class="metric-label">Advertisers</span>
                            <span class="metric-value">${advertisers}</span>
                        </div>
                    </div>
                    <div class="app-actions">
                        <button class="btn btn-outline" onclick="event.stopPropagation(); loadSection('campaigns')">Manage</button>
                        <button class="btn btn-primary" onclick="event.stopPropagation(); window.open('https://ghost081280.github.io/vaultphoenix/crypto-game/dashboard.html', '_blank')">View App ↗</button>
                    </div>
                </div>
            </div>
        </div>
    `;
}

/**
 * Get Scanner App Content (shared by both roles)
 */
function getScannerAppContent(role) {
    return `
        <div class="dashboard-section">
            <h2 class="section-title">📱 $Ember QR Scanner Web App</h2>
            
            <div class="card" style="max-width: 900px; margin: 0 auto; text-align: center; padding: 40px;">
                <div style="font-size: 5rem; margin-bottom: 20px;">📱</div>
                <h3 style="color: var(--color-primary-gold); margin-bottom: 20px; font-size: 2rem;">
                    Web-Based QR Scanner
                </h3>
                <p style="color: rgba(255,255,255,0.8); font-size: 1.1rem; max-width: 600px; margin: 0 auto 30px; line-height: 1.7;">
                    Access your QR scanner from any device with a web browser. No app download required! 
                    Simply use your unique scanner link to verify and redeem player tokens.
                </p>
                
                <div style="background: rgba(240,165,0,0.1); border: 2px solid rgba(240,165,0,0.3); border-radius: 12px; padding: 25px; margin-bottom: 30px; text-align: left;">
                    <h4 style="color: var(--color-primary-gold); margin-bottom: 15px; font-size: 1.3rem;">🔗 Your Scanner Link</h4>
                    <div style="background: rgba(0,0,0,0.4); border-radius: 8px; padding: 15px; margin-bottom: 15px;">
                        <div style="font-family: monospace; font-size: 1rem; color: var(--color-primary-gold); word-break: break-all;">
                            https://scanner.vaultphoenix.com/${role}/${btoa(AppState.userData.email).substring(0, 12)}
                        </div>
                    </div>
                    <div style="display: flex; gap: 10px; flex-wrap: wrap;">
                        <button class="btn btn-primary" onclick="copyScannerLink()">
                            📋 Copy Link
                        </button>
                        <button class="btn btn-secondary" onclick="emailScannerLink()">
                            📧 Email to Staff
                        </button>
                        <button class="btn btn-outline" onclick="window.open('https://scanner.vaultphoenix.com/demo', '_blank')">
                            🔗 Open Scanner
                        </button>
                    </div>
                </div>
                
                <div style="background: rgba(34,197,94,0.1); border: 2px solid rgba(34,197,94,0.4); border-radius: 12px; padding: 25px; margin-bottom: 30px; text-align: left;">
                    <h4 style="color: #22c55e; margin-bottom: 15px; font-size: 1.2rem;">📱 QR Code for Easy Access</h4>
                    <div style="display: flex; align-items: center; gap: 20px; flex-wrap: wrap;">
                        <div style="width: 150px; height: 150px; background: white; border-radius: 12px; display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
                            <div style="font-size: 3rem;">📱</div>
                        </div>
                        <div style="flex: 1;">
                            <p style="color: rgba(255,255,255,0.9); margin-bottom: 10px; line-height: 1.6;">
                                <strong>Scan this QR code</strong> to instantly access your scanner app on any device.
                            </p>
                            <p style="color: rgba(255,255,255,0.7); font-size: 0.95rem; margin: 0; line-height: 1.6;">
                                Perfect for: Print and display at your checkout counter, share with employees, or save to your phone's home screen.
                            </p>
                        </div>
                    </div>
                </div>
                
                <div style="background: rgba(59,130,246,0.1); border: 2px solid rgba(59,130,246,0.4); border-radius: 12px; padding: 25px; text-align: left;">
                    <h4 style="color: #3b82f6; margin-bottom: 15px; font-size: 1.2rem;">💡 How to Use the Scanner</h4>
                    <ol style="margin: 0; padding-left: 20px; line-height: 2;">
                        <li><strong>Open your scanner link</strong> on any phone, tablet, or computer</li>
                        <li><strong>Player shows their QR code</strong> from their Vault Phoenix app</li>
                        <li><strong>Point camera at code</strong> - scanner reads it automatically</li>
                        <li><strong>Enter redemption amount</strong> in $Ember tokens</li>
                        <li><strong>Confirm transfer</strong> - tokens instantly transfer to your account</li>
                        <li><strong>Give the player their offer</strong> or discount</li>
                    </ol>
                </div>
            </div>
        </div>
    `;
}

/**
 * Copy scanner link
 */
function copyScannerLink() {
    const role = AppState.currentRole;
    const link = `https://scanner.vaultphoenix.com/${role}/${btoa(AppState.userData.email).substring(0, 12)}`;
    
    navigator.clipboard.writeText(link).then(() => {
        alert('✓ Scanner link copied to clipboard!\n\nYou can now share this link with your staff or save it for quick access.');
    }).catch(() => {
        const textArea = document.createElement('textarea');
        textArea.value = link;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        alert('✓ Scanner link copied to clipboard!');
    });
}

/**
 * Email scanner link
 */
function emailScannerLink() {
    const role = AppState.currentRole;
    const link = `https://scanner.vaultphoenix.com/${role}/${btoa(AppState.userData.email).substring(0, 12)}`;
    const subject = 'Your Vault Phoenix QR Scanner Link';
    const body = `Here is your Vault Phoenix QR Scanner web app link:\n\n${link}\n\nYou can use this link on any device to scan player QR codes and process $Ember token redemptions.\n\nNo app download required - just open the link in any web browser!`;
    
    window.location.href = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

/**
 * Update active navigation item
 */
function updateActiveNavItem(section) {
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        if (link.dataset.section === section) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

/**
 * Update page title
 */
function updatePageTitle(section) {
    const role = AppState.currentRole;
    const config = RoleConfig[role];
    const navItem = config.navigation.find(item => item.section === section);
    
    const pageTitle = document.getElementById('pageTitle');
    if (pageTitle && navItem) {
        pageTitle.textContent = navItem.label;
    }
}

/**
 * Update token balance display
 */
function updateTokenBalance() {
    const tokenCount = document.getElementById('tokenCount');
    const tokenValue = document.getElementById('tokenValue');
    
    if (tokenCount) {
        tokenCount.textContent = `${AppState.tokenBalance.amount.toLocaleString()} $Ember`;
    }
    
    if (tokenValue) {
        const value = AppState.tokenBalance.amount * AppState.tokenBalance.price;
        tokenValue.textContent = `~$${value.toFixed(2)} USD`;
    }
}

/**
 * Setup event listeners
 */
function setupEventListeners() {
    const menuToggle = document.getElementById('menuToggle');
    if (menuToggle) {
        menuToggle.addEventListener('click', toggleSidebar);
    }
    
    // Make sidebar logo clickable
    const sidebarLogo = document.querySelector('.sidebar-logo');
    if (sidebarLogo) {
        sidebarLogo.addEventListener('click', () => {
            loadSection('overview');
        });
    }
    
    handleResponsiveSidebar();
    window.addEventListener('resize', handleResponsiveSidebar);
    window.addEventListener('resize', applyOverflowFix);
}

/**
 * Toggle sidebar (mobile)
 */
function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    if (sidebar) {
        sidebar.classList.toggle('active');
        AppState.sidebarOpen = !AppState.sidebarOpen;
    }
}

/**
 * Close sidebar
 */
function closeSidebar() {
    const sidebar = document.getElementById('sidebar');
    if (sidebar) {
        sidebar.classList.remove('active');
        AppState.sidebarOpen = false;
    }
}

/**
 * Handle responsive sidebar
 */
function handleResponsiveSidebar() {
    const menuToggle = document.getElementById('menuToggle');
    
    if (window.innerWidth < 1024) {
        if (menuToggle) {
            menuToggle.style.display = 'flex';
        }
    } else {
        if (menuToggle) {
            menuToggle.style.display = 'none';
        }
        closeSidebar();
    }
}

/**
 * Initialize Coinbase Wallet
 */
function initializeCoinbaseWallet() {
    const savedAddress = sessionStorage.getItem('walletAddress');
    if (savedAddress) {
        AppState.walletConnected = true;
        AppState.walletAddress = savedAddress;
    }
}

/**
 * Get placeholder content
 */
function getPlaceholderContent(section) {
    return `
        <div style="text-align: center; padding: 60px 20px; max-width: 100%;">
            <div style="font-size: 4rem; margin-bottom: 20px;">🚧</div>
            <h2 style="font-size: 1.8rem; margin-bottom: 15px; color: var(--color-primary-gold);">
                ${section.charAt(0).toUpperCase() + section.slice(1).replace('-', ' ')} Section
            </h2>
            <p style="color: rgba(255, 255, 255, 0.6); font-size: 1rem;">
                This section is under development and will be available soon.
            </p>
            <button class="btn btn-primary" style="margin-top: 25px;" onclick="loadSection('overview')">
                Back to Dashboard
            </button>
        </div>
    `;
}

/**
 * Get settings content
 */
function getSettingsContent(role) {
    const roleName = role === 'campaign-manager' ? 'Campaign Manager' : 'Advertiser';
    
    return `
        <div class="dashboard-section">
            <h2 class="section-title">⚙️ Account Settings</h2>
            
            <div class="card">
                <h3 style="margin-bottom: 20px;">Profile Information</h3>
                <div style="margin-bottom: 20px;">
                    <strong>Email:</strong> demo@phoenix.com<br>
                    <strong>Role:</strong> ${roleName}<br>
                    <strong>Account Status:</strong> <span style="color: #22c55e;">Active</span>
                </div>
                
                <button class="btn btn-outline" onclick="if(confirm('Switch to a different role?')) { sessionStorage.removeItem('selectedRole'); sessionStorage.removeItem('onboarding_${role}_complete'); window.location.href = 'role-selection.html'; }">
                    Change Role
                </button>
            </div>
            
            <div class="card" style="margin-top: 30px;">
                <h3 style="margin-bottom: 20px;">Support</h3>
                <p style="margin-bottom: 20px; color: rgba(255,255,255,0.8);">
                    Need help? Our support team is here to assist you with any questions or issues.
                </p>
                <a href="mailto:contact@vaultphoenix.com" class="btn btn-primary">
                    📧 Contact Support
                </a>
            </div>
        </div>
    `;
}

/**
 * Get Advertiser Analytics Content
 */
function getAdvertiserAnalyticsContent(role) {
    if (role !== 'advertiser') {
        return getPlaceholderContent('analytics');
    }
    
    if (typeof window.getPaymentsContent === 'function') {
        return window.getPaymentsContent(role);
    }
    
    return getPlaceholderContent('analytics');
}

/**
 * Load Campaign Control for specific campaign
 */
function loadCampaignControl(campaignId) {
    AppState.currentCampaignId = campaignId;
    
    const content = getCampaignControlContent(campaignId);
    const mainContent = document.getElementById('dashboardContent');
    
    if (mainContent) {
        mainContent.innerHTML = content;
    }
    
    updateActiveNavItem('campaigns');
    
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    setTimeout(applyOverflowFix, 200);
}

/**
 * Logout function
 */
function logout() {
    sessionStorage.clear();
    window.location.href = 'index.html';
}

// Export for use in other modules
if (typeof window !== 'undefined') {
    window.AppState = AppState;
    window.loadSection = loadSection;
    window.loadCampaignControl = loadCampaignControl;
    window.getScannerAppContent = getScannerAppContent;
    window.copyScannerLink = copyScannerLink;
    window.emailScannerLink = emailScannerLink;
    window.nextOnboardingStep = nextOnboardingStep;
    window.previousOnboardingStep = previousOnboardingStep;
    window.logout = logout;
}
