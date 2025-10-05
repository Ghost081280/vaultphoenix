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
    scannerWebAppUrl: null,
    hasSeenOnboarding: false
};

// ============================================
// ROLE CONFIGURATIONS - FIXED
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
            { icon: '💳', label: 'Payment Center', section: 'payments' },
            { icon: '📈', label: 'Performance Analytics', section: 'analytics' },
            { icon: '💰', label: 'ROI Calculator', section: 'budget' },
            { icon: '⚙️', label: 'Account Settings', section: 'settings' }
        ]
    }
};

// ============================================
// ONBOARDING CONTENT - FIXED
// ============================================

const OnboardingFlows = {
    'campaign-manager': [
        {
            id: 'intro',
            title: 'Welcome to Vault Phoenix',
            content: `
                <div style="text-align: center; padding: 40px 20px;">
                    <img src="images/VPLogoNoText.PNG" alt="Vault Phoenix" style="width: 120px; height: 120px; margin-bottom: 30px;" onerror="this.style.display='none'">
                    <h2 style="font-size: 2.5rem; color: var(--color-primary-gold); margin-bottom: 20px;">
                        Welcome to Vault Phoenix
                    </h2>
                    <p style="font-size: 1.2rem; color: rgba(255,255,255,0.8); max-width: 700px; margin: 0 auto 40px; line-height: 1.7;">
                        You're about to launch location-based AR crypto gaming campaigns that drive real foot traffic to physical businesses through $Ember token rewards and advertisements.
                    </p>
                    <button class="btn btn-primary btn-large" onclick="showNextOnboarding()" style="font-size: 1.2rem; padding: 18px 50px;">
                        Get Started →
                    </button>
                </div>
            `
        },
        {
            id: 'ecosystem',
            title: 'The $Ember Advertisement Ecosystem',
            content: `
                <div style="padding: 20px;">
                    <h2 style="font-size: 2rem; color: var(--color-primary-gold); margin-bottom: 30px; text-align: center;">
                        💡 The $Ember Advertisement Ecosystem
                    </h2>
                    
                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px; margin-bottom: 40px;">
                        <div style="text-align: center; padding: 25px; background: rgba(0,0,0,0.2); border-radius: 12px;">
                            <div style="font-size: 3rem; margin-bottom: 15px;">1️⃣</div>
                            <h4 style="font-size: 1.1rem; margin-bottom: 10px;">Advertiser Joins</h4>
                            <p style="font-size: 0.9rem; color: rgba(255,255,255,0.7); margin: 0; line-height: 1.6;">
                                Pays monthly location fee + buys $Ember from Coinbase
                            </p>
                        </div>
                        
                        <div style="text-align: center; padding: 25px; background: rgba(0,0,0,0.2); border-radius: 12px;">
                            <div style="font-size: 3rem; margin-bottom: 15px;">2️⃣</div>
                            <h4 style="font-size: 1.1rem; margin-bottom: 10px;">Creates Token Stop</h4>
                            <p style="font-size: 0.9rem; color: rgba(255,255,255,0.7); margin: 0; line-height: 1.6;">
                                Funds location with $Ember + advertisement content
                            </p>
                        </div>
                        
                        <div style="text-align: center; padding: 25px; background: rgba(0,0,0,0.2); border-radius: 12px;">
                            <div style="font-size: 3rem; margin-bottom: 15px;">3️⃣</div>
                            <h4 style="font-size: 1.1rem; margin-bottom: 10px;">Players Collect</h4>
                            <p style="font-size: 0.9rem; color: rgba(255,255,255,0.7); margin: 0; line-height: 1.6;">
                                Visit location, collect tokens, see ad
                            </p>
                        </div>
                        
                        <div style="text-align: center; padding: 25px; background: rgba(0,0,0,0.2); border-radius: 12px;">
                            <div style="font-size: 3rem; margin-bottom: 15px;">4️⃣</div>
                            <h4 style="font-size: 1.1rem; margin-bottom: 10px;">Cash Out or Redeem</h4>
                            <p style="font-size: 0.9rem; color: rgba(255,255,255,0.7); margin: 0; line-height: 1.6;">
                                Player chooses: Coinbase OR visit advertiser
                            </p>
                        </div>
                        
                        <div style="text-align: center; padding: 25px; background: rgba(0,0,0,0.2); border-radius: 12px;">
                            <div style="font-size: 3rem; margin-bottom: 15px;">5️⃣</div>
                            <h4 style="font-size: 1.1rem; margin-bottom: 10px;">Scan & Recover</h4>
                            <p style="font-size: 0.9rem; color: rgba(255,255,255,0.7); margin: 0; line-height: 1.6;">
                                Advertiser scans QR → gets $Ember back
                            </p>
                        </div>
                        
                        <div style="text-align: center; padding: 25px; background: rgba(0,0,0,0.2); border-radius: 12px;">
                            <div style="font-size: 3rem; margin-bottom: 15px;">6️⃣</div>
                            <h4 style="font-size: 1.1rem; margin-bottom: 10px;">Circular Economy</h4>
                            <p style="font-size: 0.9rem; color: rgba(255,255,255,0.7); margin: 0; line-height: 1.6;">
                                Recovered tokens fund new stops
                            </p>
                        </div>
                    </div>
                    
                    <div style="text-align: center;">
                        <button class="btn btn-primary btn-large" onclick="showNextOnboarding()" style="font-size: 1.1rem; padding: 16px 45px;">
                            Continue →
                        </button>
                    </div>
                </div>
            `
        },
        {
            id: 'revenue',
            title: 'Your Revenue Sources',
            content: `
                <div style="padding: 20px;">
                    <h2 style="font-size: 2rem; color: var(--color-primary-gold); margin-bottom: 30px; text-align: center;">
                        💰 Your Revenue Source
                    </h2>
                    
                    <div style="max-width: 800px; margin: 0 auto;">
                        <div style="background: rgba(240,165,0,0.1); border: 2px solid rgba(240,165,0,0.3); border-radius: 12px; padding: 30px; margin-bottom: 25px;">
                            <h3 style="color: var(--color-primary-gold); margin-bottom: 20px; font-size: 1.5rem;">📍 Location Placement Fees</h3>
                            <p style="color: rgba(255,255,255,0.9); line-height: 1.7; margin-bottom: 15px;">
                                Your revenue comes from monthly location fees paid by advertisers:
                            </p>
                            <ul style="list-style: none; padding: 0; margin: 0 0 15px 0;">
                                <li style="padding: 8px 0; border-bottom: 1px solid rgba(255,255,255,0.1);">
                                    ✓ 1 Location: You set the price (e.g., $500/mo)
                                </li>
                                <li style="padding: 8px 0; border-bottom: 1px solid rgba(255,255,255,0.1);">
                                    ✓ 2-5 Locations: Discounted rate per location
                                </li>
                                <li style="padding: 8px 0; border-bottom: 1px solid rgba(255,255,255,0.1);">
                                    ✓ 6-10 Locations: Better rate per location
                                </li>
                                <li style="padding: 8px 0;">
                                    ✓ 11+ Locations: Custom pricing
                                </li>
                            </ul>
                            <p style="color: rgba(255,255,255,0.7); font-size: 0.95rem; margin: 0;">
                                All features included regardless of location count!
                            </p>
                        </div>
                        
                        <div style="background: rgba(34,197,94,0.1); border: 2px solid rgba(34,197,94,0.3); border-radius: 12px; padding: 30px;">
                            <h3 style="color: #22c55e; margin-bottom: 20px; font-size: 1.5rem;">💎 $Ember Token Flow</h3>
                            <p style="color: rgba(255,255,255,0.9); line-height: 1.7; margin: 0;">
                                Advertisers purchase $Ember tokens directly from Coinbase (not from you). They use these tokens to fund their advertisement token stops. You earn purely from monthly location fees.
                            </p>
                        </div>
                    </div>
                    
                    <div style="text-align: center; margin-top: 40px;">
                        <button class="btn btn-primary btn-large" onclick="completeOnboarding()" style="font-size: 1.1rem; padding: 16px 45px;">
                            Go to Dashboard →
                        </button>
                    </div>
                </div>
            `
        }
    ],
    'advertiser': [
        {
            id: 'intro',
            title: 'Welcome Advertiser',
            content: `
                <div style="text-align: center; padding: 40px 20px;">
                    <img src="images/VPLogoNoText.PNG" alt="Vault Phoenix" style="width: 120px; height: 120px; margin-bottom: 30px;" onerror="this.style.display='none'">
                    <h2 style="font-size: 2.5rem; color: var(--color-primary-gold); margin-bottom: 20px;">
                        Welcome to Vault Phoenix
                    </h2>
                    <p style="font-size: 1.2rem; color: rgba(255,255,255,0.8); max-width: 700px; margin: 0 auto 40px; line-height: 1.7;">
                        Drive verified foot traffic to your business through AR gaming campaigns. Players collect $Ember tokens at your location and see your advertisements.
                    </p>
                    <button class="btn btn-primary btn-large" onclick="showNextOnboarding()" style="font-size: 1.2rem; padding: 18px 50px;">
                        Get Started →
                    </button>
                </div>
            `
        },
        {
            id: 'how-it-works',
            title: 'How The $Ember Advertisement System Works',
            content: `
                <div style="padding: 20px;">
                    <h2 style="font-size: 2rem; color: var(--color-primary-gold); margin-bottom: 30px; text-align: center;">
                        💡 How The $Ember Advertisement System Works
                    </h2>
                    
                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 20px; margin-bottom: 40px;">
                        <div style="padding: 25px; background: rgba(0,0,0,0.2); border-radius: 12px;">
                            <div style="font-size: 3rem; margin-bottom: 15px;">1️⃣</div>
                            <h4 style="margin-bottom: 12px;">Purchase Tokens from Coinbase</h4>
                            <p style="color: rgba(255,255,255,0.7); margin: 0; line-height: 1.6;">
                                Buy $Ember tokens directly from Coinbase at market price to fund your token stops.
                            </p>
                        </div>
                        
                        <div style="padding: 25px; background: rgba(0,0,0,0.2); border-radius: 12px;">
                            <div style="font-size: 3rem; margin-bottom: 15px;">2️⃣</div>
                            <h4 style="margin-bottom: 12px;">Add Advertisement</h4>
                            <p style="color: rgba(255,255,255,0.7); margin: 0; line-height: 1.6;">
                                Your tokens include your ad content - title, description, image, and offer details.
                            </p>
                        </div>
                        
                        <div style="padding: 25px; background: rgba(0,0,0,0.2); border-radius: 12px;">
                            <div style="font-size: 3rem; margin-bottom: 15px;">3️⃣</div>
                            <h4 style="margin-bottom: 12px;">Players Collect</h4>
                            <p style="color: rgba(255,255,255,0.7); margin: 0; line-height: 1.6;">
                                Players visit your location, collect tokens, and see your advertisement.
                            </p>
                        </div>
                        
                        <div style="padding: 25px; background: rgba(0,0,0,0.2); border-radius: 12px;">
                            <div style="font-size: 3rem; margin-bottom: 15px;">4️⃣</div>
                            <h4 style="margin-bottom: 12px;">Redeem & Recover</h4>
                            <p style="color: rgba(255,255,255,0.7); margin: 0; line-height: 1.6;">
                                Players redeem at your location. You scan their QR code → get $Ember back → give offer.
                            </p>
                        </div>
                    </div>
                    
                    <div style="text-align: center;">
                        <button class="btn btn-primary btn-large" onclick="showNextOnboarding()" style="font-size: 1.1rem; padding: 16px 45px;">
                            Continue →
                        </button>
                    </div>
                </div>
            `
        },
        {
            id: 'campaign-advertising',
            title: 'How Campaign Advertising Works',
            content: `
                <div style="padding: 20px;">
                    <h2 style="font-size: 2rem; color: var(--color-primary-gold); margin-bottom: 30px; text-align: center;">
                        📢 How Campaign Advertising Works
                    </h2>
                    
                    <div style="max-width: 900px; margin: 0 auto;">
                        <div style="background: rgba(240,165,0,0.1); border: 2px solid rgba(240,165,0,0.3); border-radius: 12px; padding: 30px; margin-bottom: 25px;">
                            <h3 style="color: var(--color-primary-gold); margin-bottom: 20px;">🎯 Choose a Campaign</h3>
                            <p style="color: rgba(255,255,255,0.9); line-height: 1.7; margin: 0;">
                                Browse active AR gaming campaigns in the marketplace. Each campaign has active players, geographic coverage, and engagement metrics. Pick the campaign that matches your target audience.
                            </p>
                        </div>
                        
                        <div style="background: rgba(59,130,246,0.1); border: 2px solid rgba(59,130,246,0.3); border-radius: 12px; padding: 30px; margin-bottom: 25px;">
                            <h3 style="color: #3b82f6; margin-bottom: 20px;">💳 Simple Pricing</h3>
                            <p style="color: rgba(255,255,255,0.9); line-height: 1.7; margin-bottom: 15px;">
                                Pay a monthly fee to the campaign manager based on your location count:
                            </p>
                            <ul style="list-style: none; padding: 0; margin: 0;">
                                <li style="padding: 8px 0; border-bottom: 1px solid rgba(255,255,255,0.1);">
                                    ✓ 1 location: One price per month
                                </li>
                                <li style="padding: 8px 0; border-bottom: 1px solid rgba(255,255,255,0.1);">
                                    ✓ 2-5 locations: Discounted rate per location
                                </li>
                                <li style="padding: 8px 0; border-bottom: 1px solid rgba(255,255,255,0.1);">
                                    ✓ 6-10 locations: Better rate per location
                                </li>
                                <li style="padding: 8px 0;">
                                    ✓ 11+ locations: Custom enterprise pricing
                                </li>
                            </ul>
                            <p style="color: rgba(255,255,255,0.7); margin: 15px 0 0 0; font-size: 0.95rem;">
                                All features included: Scanner web app, analytics, unlimited advertisements!
                            </p>
                        </div>
                        
                        <div style="background: rgba(34,197,94,0.1); border: 2px solid rgba(34,197,94,0.3); border-radius: 12px; padding: 30px;">
                            <h3 style="color: #22c55e; margin-bottom: 20px;">📱 Buy $Ember from Coinbase</h3>
                            <p style="color: rgba(255,255,255,0.9); line-height: 1.7; margin: 0;">
                                Purchase $Ember tokens directly from Coinbase at market price. Use these tokens to fund your advertisement token stops. Get tokens back when players redeem at your location!
                            </p>
                        </div>
                    </div>
                    
                    <div style="text-align: center; margin-top: 40px;">
                        <button class="btn btn-primary btn-large" onclick="completeOnboarding()" style="font-size: 1.1rem; padding: 16px 45px;">
                            Go to Dashboard →
                        </button>
                    </div>
                </div>
            `
        }
    ]
};

let currentOnboardingStep = 0;

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
    
    const hasSeenOnboarding = sessionStorage.getItem(`onboarding_${role}_complete`);
    
    if (!hasSeenOnboarding) {
        showOnboarding(role);
    } else {
        loadSection('overview');
    }
    
    setupEventListeners();
    updateTokenBalance();
    
    if (role === 'campaign-manager') {
        initializeCoinbaseWallet();
    }
    
    console.log('App initialization complete');
}

/**
 * Show onboarding flow
 */
function showOnboarding(role) {
    const steps = OnboardingFlows[role];
    if (!steps || steps.length === 0) {
        loadSection('overview');
        return;
    }
    
    currentOnboardingStep = 0;
    displayOnboardingStep(steps[currentOnboardingStep]);
}

/**
 * Display onboarding step
 */
function displayOnboardingStep(step) {
    const mainContent = document.getElementById('dashboardContent');
    if (mainContent) {
        mainContent.innerHTML = step.content;
    }
    
    const pageTitle = document.getElementById('pageTitle');
    if (pageTitle) {
        pageTitle.textContent = step.title;
    }
}

/**
 * Show next onboarding step
 */
function showNextOnboarding() {
    const role = AppState.currentRole;
    const steps = OnboardingFlows[role];
    
    currentOnboardingStep++;
    
    if (currentOnboardingStep < steps.length) {
        displayOnboardingStep(steps[currentOnboardingStep]);
    } else {
        completeOnboarding();
    }
}

/**
 * Complete onboarding
 */
function completeOnboarding() {
    const role = AppState.currentRole;
    sessionStorage.setItem(`onboarding_${role}_complete`, 'true');
    AppState.hasSeenOnboarding = true;
    loadSection('overview');
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
 * Load content section - FIXED
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
 * Get section content based on role and section - FIXED
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
    }
    
    if (role === 'advertiser') {
        if (section === 'marketplace') return getMarketplaceContent(role);
        if (section === 'tokens') return getTokensContent(role);
        if (section === 'wallet') return getWalletContent(role);
        if (section === 'payments') return getPaymentsContent(role);
        if (section === 'analytics') return getPaymentsContent(role); // FIXED: was calling wrong function
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
 * Campaign Manager Overview - FIXED
 */
function getCampaignManagerOverview() {
    const activeCampaigns = 1;
    const totalLocations = 2;
    const advertisers = 1;
    
    return `
        <!-- Hero Stats Cards -->
        <div class="hero-stats">
            <div class="stat-card">
                <div class="stat-icon">💰</div>
                <div class="stat-label">Monthly Revenue</div>
                <div class="stat-value">$500</div>
                <div class="stat-details">
                    <div class="stat-detail-item">
                        <span>Location Fees:</span>
                        <span>$500</span>
                    </div>
                    <div class="stat-detail-item">
                        <span>From Advertisers:</span>
                        <span>1 advertiser</span>
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
                        <span>1</span>
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
        
        <!-- Quick Actions -->
        <div class="dashboard-section">
            <h2 class="section-title">⚡ Quick Actions</h2>
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

        <!-- My Campaigns -->
        <div class="dashboard-section">
            <div class="section-header">
                <h2 class="section-title">🎮 My Campaigns</h2>
                <div class="section-actions">
                    <button class="btn btn-primary" onclick="loadSection('app-setup')">+ New Campaign</button>
                </div>
            </div>
            
            <div class="apps-grid">
                <div class="app-card">
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
                        <button class="btn btn-primary" onclick="loadSection('campaigns')">Manage Campaign</button>
                        <button class="btn btn-outline" onclick="window.open('https://ghost081280.github.io/vaultphoenix/crypto-game/dashboard.html', '_blank')">View App ↗</button>
                    </div>
                </div>
            </div>
        </div>
    `;
}

/**
 * Load Campaign Control for specific campaign - REMOVED ROLE RESTRICTION
 */
function loadCampaignControl(campaignId) {
    AppState.currentCampaignId = campaignId;
    
    // Campaign managers can now access their own campaigns
    const content = getCampaignControlContent ? getCampaignControlContent(campaignId) : getCampaignsContent(AppState.currentRole);
    const mainContent = document.getElementById('dashboardContent');
    
    if (mainContent) {
        mainContent.innerHTML = content;
    }
    
    updateActiveNavItem('campaigns');
    
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    setTimeout(applyOverflowFix, 200);
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
    
    const sidebarLogo = document.querySelector('.sidebar-logo');
    if (sidebarLogo) {
        sidebarLogo.style.cursor = 'pointer';
        sidebarLogo.addEventListener('click', () => loadSection('overview'));
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
                
                <button class="btn btn-outline" onclick="if(confirm('Switch to a different role?')) { sessionStorage.removeItem('selectedRole'); window.location.href = 'role-selection.html'; }">
                    Change Role
                </button>
            </div>
            
            <div class="card" style="margin-top: 30px;">
                <h3 style="margin-bottom: 20px;">Support</h3>
                <p style="color: rgba(255,255,255,0.8); margin-bottom: 20px;">
                    Need help? Our support team is here to assist you.
                </p>
                <a href="mailto:contact@vaultphoenix.com" class="btn btn-primary">
                    📧 Contact Support
                </a>
            </div>
        </div>
    `;
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
    window.showNextOnboarding = showNextOnboarding;
    window.completeOnboarding = completeOnboarding;
    window.logout = logout;
}
