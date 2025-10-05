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
    currentCampaignId: null, // Track current campaign for advertisers
    scannerAppDownloaded: false // Track if advertiser has scanner app
};

// ============================================
// ROLE CONFIGURATIONS - UPDATED FOR AD TOKEN MODEL
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
        showTokenBalance: false, // Advertisers don't see campaign manager's balance
        navigation: [
            { icon: '📊', label: 'Dashboard Overview', section: 'overview' },
            { icon: '🛒', label: 'Campaign Marketplace', section: 'marketplace' },
            { icon: '💎', label: 'My $Ember Balance', section: 'tokens' },
            { icon: '👛', label: 'Buy $Ember Tokens', section: 'wallet' },
            { icon: '🎁', label: 'Airdrop Requests', section: 'airdrop-requests' },
            { icon: '💳', label: 'Payment Center', section: 'payments' },
            { icon: '📈', label: 'Performance Analytics', section: 'analytics' },
            { icon: '💰', label: 'ROI Calculator', section: 'budget' },
            { icon: '📱', label: 'Scanner App', section: 'scanner' },
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
    loadSection('overview');
    setupEventListeners();
    updateTokenBalance();
    
    if (role === 'campaign-manager') {
        initializeCoinbaseWallet();
    }
    
    if (role === 'advertiser') {
        initializeAdvertiserScanner();
    }
    
    console.log('App initialization complete');
}

/**
 * Initialize advertiser scanner app status
 */
function initializeAdvertiserScanner() {
    const scannerDownloaded = sessionStorage.getItem('scannerAppDownloaded');
    if (scannerDownloaded === 'true') {
        AppState.scannerAppDownloaded = true;
        
        // Update AdvertiserData if available
        if (window.AdvertiserData?.scannerApp) {
            window.AdvertiserData.scannerApp.downloaded = true;
        }
    }
}

/**
 * Apply overflow fix to all elements
 */
function applyOverflowFix() {
    // Ensure main content fits
    const mainContent = document.getElementById('mainContent');
    if (mainContent) {
        mainContent.style.maxWidth = '100%';
        mainContent.style.overflowX = 'hidden';
    }
    
    // Fix all builder panels
    document.querySelectorAll('.builder-panel').forEach(panel => {
        panel.style.maxWidth = '100%';
        panel.style.overflowX = 'hidden';
        panel.style.boxSizing = 'border-box';
    });
    
    // Fix all cards
    document.querySelectorAll('.card, .stat-card, .app-card, .revenue-stream').forEach(card => {
        card.style.maxWidth = '100%';
        card.style.boxSizing = 'border-box';
    });
    
    // Fix all grids
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
    
    // Apply overflow fix after content loads
    setTimeout(applyOverflowFix, 200);
}

/**
 * Get section content based on role and section
 */
function getSectionContent(section) {
    const role = AppState.currentRole;
    
    // Overview
    if (section === 'overview') {
        return getOverviewContent(role);
    }
    
    // Campaign Manager sections
    if (role === 'campaign-manager') {
        if (section === 'app-setup') return getAppSetupContent(role);
        if (section === 'campaigns') return getCampaignsContent(role);
        if (section === 'revenue') return getRevenueContent(role);
        if (section === 'airdrops') return getAirdropsContent(role);
        if (section === 'advertisers') return getMerchantsContent(role);
        if (section === 'tokens') return getTokensContent(role);
        if (section === 'wallet') return getWalletContent(role);
    }
    
    // Advertiser sections
    if (role === 'advertiser') {
        if (section === 'marketplace') return getMarketplaceContent(role);
        if (section === 'tokens') return getTokensContent(role);
        if (section === 'wallet') return getWalletContent(role);
        if (section === 'airdrop-requests') return getAirdropRequestsContent(role);
        if (section === 'payments') return getPaymentsContent(role);
        if (section === 'analytics') return getAdvertiserAnalyticsContent(role);
        if (section === 'budget') return getBudgetContent(role);
        if (section === 'scanner') return getScannerAppContent(role);
    }
    
    // Common sections
    if (section === 'settings') {
        return getSettingsContent(role);
    }
    
    // Fallback
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
    const activeCampaigns = 1; // $Ember Hunt
    const totalLocations = 3; // 2 CM + 1 Advertiser
    const advertisers = 1;
    
    return `
        <!-- Hero Stats Cards -->
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
        
        <!-- How The Ecosystem Works -->
        <div class="dashboard-section">
            <div class="card" style="background: rgba(34,197,94,0.1); border: 2px solid rgba(34,197,94,0.3);">
                <h3 style="color: #22c55e; margin-bottom: 20px; font-size: 1.5rem;">
                    💡 The $Ember Advertisement Ecosystem
                </h3>
                
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 15px; margin-bottom: 20px;">
                    <div style="text-align: center; padding: 15px; background: rgba(0,0,0,0.2); border-radius: 12px;">
                        <div style="font-size: 2rem; margin-bottom: 8px;">1️⃣</div>
                        <h4 style="font-size: 1rem; margin-bottom: 8px;">Advertiser Joins</h4>
                        <p style="font-size: 0.85rem; color: rgba(255,255,255,0.7); margin: 0;">
                            Pays monthly location fee + buys $Ember tokens
                        </p>
                    </div>
                    
                    <div style="text-align: center; padding: 15px; background: rgba(0,0,0,0.2); border-radius: 12px;">
                        <div style="font-size: 2rem; margin-bottom: 8px;">2️⃣</div>
                        <h4 style="font-size: 1rem; margin-bottom: 8px;">Creates Token Stop</h4>
                        <p style="font-size: 0.85rem; color: rgba(255,255,255,0.7); margin: 0;">
                            Funds location with $Ember + advertisement
                        </p>
                    </div>
                    
                    <div style="text-align: center; padding: 15px; background: rgba(0,0,0,0.2); border-radius: 12px;">
                        <div style="font-size: 2rem; margin-bottom: 8px;">3️⃣</div>
                        <h4 style="font-size: 1rem; margin-bottom: 8px;">Players Collect</h4>
                        <p style="font-size: 0.85rem; color: rgba(255,255,255,0.7); margin: 0;">
                            Visit location, collect tokens, see ad
                        </p>
                    </div>
                    
                    <div style="text-align: center; padding: 15px; background: rgba(0,0,0,0.2); border-radius: 12px;">
                        <div style="font-size: 2rem; margin-bottom: 8px;">4️⃣</div>
                        <h4 style="font-size: 1rem; margin-bottom: 8px;">Cash Out or Redeem</h4>
                        <p style="font-size: 0.85rem; color: rgba(255,255,255,0.7); margin: 0;">
                            Player chooses: Coinbase OR visit advertiser
                        </p>
                    </div>
                    
                    <div style="text-align: center; padding: 15px; background: rgba(0,0,0,0.2); border-radius: 12px;">
                        <div style="font-size: 2rem; margin-bottom: 8px;">5️⃣</div>
                        <h4 style="font-size: 1rem; margin-bottom: 8px;">QR Code Scan</h4>
                        <p style="font-size: 0.85rem; color: rgba(255,255,255,0.7); margin: 0;">
                            Advertiser scans → gets $Ember back
                        </p>
                    </div>
                    
                    <div style="text-align: center; padding: 15px; background: rgba(0,0,0,0.2); border-radius: 12px;">
                        <div style="font-size: 2rem; margin-bottom: 8px;">6️⃣</div>
                        <h4 style="font-size: 1rem; margin-bottom: 8px;">Circular Economy</h4>
                        <p style="font-size: 0.85rem; color: rgba(255,255,255,0.7); margin: 0;">
                            Recovered tokens fund new stops
                        </p>
                    </div>
                </div>
                
                <div style="padding: 15px; background: rgba(240,165,0,0.15); border: 1px solid rgba(240,165,0,0.4); border-radius: 8px;">
                    <strong style="color: var(--color-primary-gold);">Your Revenue Sources:</strong>
                    <ul style="margin: 10px 0 0 0; padding-left: 20px; line-height: 1.7;">
                        <li>Monthly location placement fees from advertisers</li>
                        <li>Initial $Ember token sales to advertisers</li>
                        <li>Platform engagement and growth</li>
                    </ul>
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
 * Get Scanner App Content for Advertisers
 */
function getScannerAppContent(role) {
    if (role !== 'advertiser') {
        return getPlaceholderContent('scanner');
    }
    
    const scannerDownloaded = AppState.scannerAppDownloaded || (window.AdvertiserData?.scannerApp?.downloaded);
    
    return `
        <div class="dashboard-section">
            <h2 class="section-title">📱 $Ember Scanner App</h2>
            
            ${!scannerDownloaded ? `
                <!-- Download Scanner App -->
                <div class="card" style="text-align: center; padding: 60px 40px;">
                    <div style="font-size: 5rem; margin-bottom: 20px;">📱</div>
                    <h3 style="color: var(--color-primary-gold); margin-bottom: 20px; font-size: 2rem;">
                        Download the Scanner App
                    </h3>
                    <p style="color: rgba(255,255,255,0.7); font-size: 1.1rem; max-width: 600px; margin: 0 auto 30px; line-height: 1.7;">
                        The Scanner App allows you to accept $Ember token redemptions from players at your physical location. 
                        When players want to redeem their tokens for your offers, simply scan their QR code to instantly 
                        receive the $Ember back into your account.
                    </p>
                    
                    <div style="background: rgba(240,165,0,0.1); border: 2px solid rgba(240,165,0,0.3); border-radius: 12px; padding: 25px; margin: 30px auto; max-width: 600px;">
                        <h4 style="color: var(--color-primary-gold); margin-bottom: 20px; font-size: 1.3rem;">How Redemptions Work:</h4>
                        
                        <div style="text-align: left; display: flex; flex-direction: column; gap: 15px;">
                            <div style="display: flex; gap: 15px; align-items: start;">
                                <div style="font-size: 2rem; flex-shrink: 0;">1️⃣</div>
                                <div>
                                    <h5 style="margin-bottom: 5px; color: #fff;">Player Visits Your Location</h5>
                                    <p style="color: rgba(255,255,255,0.7); margin: 0; font-size: 0.95rem;">
                                        After collecting $Ember at your token stop and seeing your advertisement, 
                                        player decides to visit your physical location to redeem their offer.
                                    </p>
                                </div>
                            </div>
                            
                            <div style="display: flex; gap: 15px; align-items: start;">
                                <div style="font-size: 2rem; flex-shrink: 0;">2️⃣</div>
                                <div>
                                    <h5 style="margin-bottom: 5px; color: #fff;">Player Shows QR Code</h5>
                                    <p style="color: rgba(255,255,255,0.7); margin: 0; font-size: 0.95rem;">
                                        Player opens their Vault Phoenix app and displays their unique redemption QR code 
                                        at checkout or when requesting your offer.
                                    </p>
                                </div>
                            </div>
                            
                            <div style="display: flex; gap: 15px; align-items: start;">
                                <div style="font-size: 2rem; flex-shrink: 0;">3️⃣</div>
                                <div>
                                    <h5 style="margin-bottom: 5px; color: #fff;">You Scan Their Code</h5>
                                    <p style="color: rgba(255,255,255,0.7); margin: 0; font-size: 0.95rem;">
                                        Open your Scanner App on your phone/tablet, point at player's QR code, 
                                        and enter the redemption amount (e.g., 50 $Ember for your offer).
                                    </p>
                                </div>
                            </div>
                            
                            <div style="display: flex; gap: 15px; align-items: start;">
                                <div style="font-size: 2rem; flex-shrink: 0;">4️⃣</div>
                                <div>
                                    <h5 style="margin-bottom: 5px; color: #fff;">Instant $Ember Transfer</h5>
                                    <p style="color: rgba(255,255,255,0.7); margin: 0; font-size: 0.95rem;">
                                        $Ember tokens instantly transfer from player's wallet to your advertiser account. 
                                        You see the confirmation immediately in the Scanner App.
                                    </p>
                                </div>
                            </div>
                            
                            <div style="display: flex; gap: 15px; align-items: start;">
                                <div style="font-size: 2rem; flex-shrink: 0;">5️⃣</div>
                                <div>
                                    <h5 style="margin-bottom: 5px; color: #fff;">Give The Offer</h5>
                                    <p style="color: rgba(255,255,255,0.7); margin: 0; font-size: 0.95rem;">
                                        Now that you've received your $Ember back, provide the player with the offer 
                                        they saw in your advertisement (discount, free item, special service, etc).
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div style="background: rgba(34,197,94,0.15); border: 2px solid rgba(34,197,94,0.4); border-radius: 12px; padding: 20px; margin: 30px auto; max-width: 600px;">
                        <h4 style="color: #22c55e; margin-bottom: 15px;">✓ Scanner App Features:</h4>
                        <ul style="text-align: left; list-style: none; padding: 0; margin: 0;">
                            <li style="padding: 8px 0; border-bottom: 1px solid rgba(255,255,255,0.1);">
                                📱 Works on iOS and Android phones/tablets
                            </li>
                            <li style="padding: 8px 0; border-bottom: 1px solid rgba(255,255,255,0.1);">
                                ⚡ Instant QR code scanning
                            </li>
                            <li style="padding: 8px 0; border-bottom: 1px solid rgba(255,255,255,0.1);">
                                💎 Real-time $Ember balance updates
                            </li>
                            <li style="padding: 8px 0; border-bottom: 1px solid rgba(255,255,255,0.1);">
                                📊 Transaction history and analytics
                            </li>
                            <li style="padding: 8px 0; border-bottom: 1px solid rgba(255,255,255,0.1);">
                                🔒 Secure blockchain-verified transfers
                            </li>
                            <li style="padding: 8px 0;">
                                🔔 Push notifications for redemptions
                            </li>
                        </ul>
                    </div>
                    
                    <button class="btn btn-primary btn-large" onclick="downloadScannerApp()" style="font-size: 1.3rem; padding: 20px 50px;">
                        📱 Download Scanner App
                    </button>
                    
                    <div style="margin-top: 25px;">
                        <p style="color: rgba(255,255,255,0.6); font-size: 0.9rem;">
                            Available for iOS (App Store) and Android (Google Play)
                        </p>
                    </div>
                </div>
            ` : `
                <!-- Scanner App Active -->
                <div class="revenue-grid">
                    <div class="card" style="background: rgba(34,197,94,0.1); border: 2px solid rgba(34,197,94,0.4);">
                        <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 20px;">
                            <span class="status-indicator status-live"></span>
                            <h3 style="color: #22c55e; margin: 0; font-size: 1.5rem;">Scanner App Active</h3>
                        </div>
                        
                        <div style="padding: 20px; background: rgba(0,0,0,0.3); border-radius: 12px; margin-bottom: 20px;">
                            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 15px;">
                                <div>
                                    <div style="font-size: 0.85rem; color: rgba(255,255,255,0.6); margin-bottom: 5px;">App Version</div>
                                    <div style="font-size: 1.3rem; font-weight: 900;">${window.AdvertiserData?.scannerApp?.version || '1.2.0'}</div>
                                </div>
                                <div>
                                    <div style="font-size: 0.85rem; color: rgba(255,255,255,0.6); margin-bottom: 5px;">Device Type</div>
                                    <div style="font-size: 1.3rem; font-weight: 900; text-transform: capitalize;">${window.AdvertiserData?.scannerApp?.deviceType || 'Tablet'}</div>
                                </div>
                                <div>
                                    <div style="font-size: 0.85rem; color: rgba(255,255,255,0.6); margin-bottom: 5px;">Scans Today</div>
                                    <div style="font-size: 1.3rem; font-weight: 900; color: var(--color-primary-gold);">${window.AdvertiserData?.scannerApp?.scansToday || 3}</div>
                                </div>
                                <div>
                                    <div style="font-size: 0.85rem; color: rgba(255,255,255,0.6); margin-bottom: 5px;">Total Scans</div>
                                    <div style="font-size: 1.3rem; font-weight: 900; color: #22c55e;">${window.AdvertiserData?.scannerApp?.totalScans || 65}</div>
                                </div>
                            </div>
                        </div>
                        
                        <div style="display: flex; flex-direction: column; gap: 10px;">
                            <button class="btn btn-primary btn-large" onclick="openScannerApp()">
                                📱 Open Scanner App
                            </button>
                            <button class="btn btn-outline" onclick="viewScanHistory()">
                                📊 View Scan History
                            </button>
                        </div>
                    </div>
                    
                    <div class="card">
                        <h3 style="color: var(--color-primary-gold); margin-bottom: 20px;">
                            📋 Quick Redemption Guide
                        </h3>
                        
                        <ol style="margin: 0; padding-left: 20px; line-height: 1.8;">
                            <li style="padding: 8px 0; border-bottom: 1px solid rgba(255,255,255,0.1);">
                                <strong>Player visits</strong> your location to redeem $Ember
                            </li>
                            <li style="padding: 8px 0; border-bottom: 1px solid rgba(255,255,255,0.1);">
                                <strong>Open Scanner App</strong> on your device
                            </li>
                            <li style="padding: 8px 0; border-bottom: 1px solid rgba(255,255,255,0.1);">
                                <strong>Scan</strong> the QR code from player's app
                            </li>
                            <li style="padding: 8px 0; border-bottom: 1px solid rgba(255,255,255,0.1);">
                                <strong>Enter</strong> redemption amount (e.g., 50 $Ember)
                            </li>
                            <li style="padding: 8px 0; border-bottom: 1px solid rgba(255,255,255,0.1);">
                                <strong>Confirm</strong> - tokens transfer to you instantly
                            </li>
                            <li style="padding: 8px 0;">
                                <strong>Give</strong> the player their offer/discount
                            </li>
                        </ol>
                        
                        <div style="background: rgba(240,165,0,0.1); border: 1px solid rgba(240,165,0,0.3); border-radius: 12px; padding: 15px; margin-top: 20px;">
                            <h4 style="color: var(--color-primary-gold); margin-bottom: 10px;">💡 Pro Tips:</h4>
                            <ul style="margin: 0; padding-left: 20px; font-size: 0.9rem; line-height: 1.6;">
                                <li>Keep Scanner App open during business hours</li>
                                <li>Train staff on redemption process</li>
                                <li>Verify offer details before giving items/discounts</li>
                                <li>Check transaction history for disputes</li>
                            </ul>
                        </div>
                        
                        <button class="btn btn-secondary" onclick="downloadScannerGuide()" style="width: 100%; margin-top: 15px;">
                            📚 Download Full Scanner Guide
                        </button>
                    </div>
                </div>
                
                <!-- Recent Scans -->
                <div class="card" style="margin-top: 30px;">
                    <h3 style="color: var(--color-primary-gold); margin-bottom: 20px;">
                        📜 Recent Redemption Scans
                    </h3>
                    
                    <div class="merchants-table-wrapper">
                        <table class="merchants-table">
                            <thead>
                                <tr>
                                    <th>Time</th>
                                    <th>Player ID</th>
                                    <th>Amount</th>
                                    <th>Offer Given</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>10:24 AM</td>
                                    <td style="font-family: monospace;">0x8f3a...d21c</td>
                                    <td>50 $Ember</td>
                                    <td>Museum Tour 10% Off</td>
                                    <td><span class="badge badge-success">Completed</span></td>
                                </tr>
                                <tr>
                                    <td>2:43 PM</td>
                                    <td style="font-family: monospace;">0x2b7f...8a3e</td>
                                    <td>50 $Ember</td>
                                    <td>Gift Shop 10% Off</td>
                                    <td><span class="badge badge-success">Completed</span></td>
                                </tr>
                                <tr>
                                    <td>4:15 PM</td>
                                    <td style="font-family: monospace;">0x9c2d...4f1b</td>
                                    <td>50 $Ember</td>
                                    <td>Museum Tour 10% Off</td>
                                    <td><span class="badge badge-success">Completed</span></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    
                    <div style="margin-top: 15px; padding: 15px; background: rgba(34,197,94,0.1); border: 1px solid rgba(34,197,94,0.3); border-radius: 12px;">
                        <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 10px;">
                            <div>
                                <div style="font-size: 0.85rem; color: rgba(255,255,255,0.6);">Today's Redemptions</div>
                                <div style="font-size: 1.5rem; font-weight: 900; color: #22c55e;">3 scans</div>
                            </div>
                            <div>
                                <div style="font-size: 0.85rem; color: rgba(255,255,255,0.6);">$Ember Received Today</div>
                                <div style="font-size: 1.5rem; font-weight: 900; color: var(--color-primary-gold);">150 $Ember</div>
                            </div>
                            <div>
                                <div style="font-size: 0.85rem; color: rgba(255,255,255,0.6);">This Month</div>
                                <div style="font-size: 1.5rem; font-weight: 900;">65 scans</div>
                            </div>
                        </div>
                    </div>
                </div>
            `}
        </div>
    `;
}

/**
 * Download Scanner App
 */
function downloadScannerApp() {
    alert(`📱 Downloading Scanner App...\n\n` +
        `The Vault Phoenix Scanner App is now downloading.\n\n` +
        `Available for:\n` +
        `• iOS (App Store)\n` +
        `• Android (Google Play)\n` +
        `• Web App (PWA)\n\n` +
        `After installation, login with your advertiser credentials:\n` +
        `Email: demo@phoenix.com\n\n` +
        `Setup takes less than 2 minutes!`);
    
    // Mark scanner as downloaded
    AppState.scannerAppDownloaded = true;
    sessionStorage.setItem('scannerAppDownloaded', 'true');
    
    // Update AdvertiserData if available
    if (window.AdvertiserData?.scannerApp) {
        window.AdvertiserData.scannerApp.downloaded = true;
    }
    
    // Show success message
    setTimeout(() => {
        alert(`✓ Scanner App Installed!\n\n` +
            `The app is now ready to use.\n\n` +
            `Quick Start:\n` +
            `1. Open the Scanner App\n` +
            `2. Point camera at player's QR code\n` +
            `3. Enter redemption amount\n` +
            `4. Confirm transfer\n` +
            `5. Give player their offer!`);
        
        // Reload scanner section to show active state
        if (typeof window.loadSection === 'function') {
            window.loadSection('scanner');
        }
    }, 1500);
}

/**
 * Load Campaign Control for specific campaign
 */
function loadCampaignControl(campaignId) {
    AppState.currentCampaignId = campaignId;
    
    // Get campaign control content
    const content = getCampaignControlContent(campaignId);
    const mainContent = document.getElementById('dashboardContent');
    
    if (mainContent) {
        mainContent.innerHTML = content;
    }
    
    // Update navigation
    updateActiveNavItem('campaigns');
    
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    // Apply overflow fix
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
    
    handleResponsiveSidebar();
    window.addEventListener('resize', handleResponsiveSidebar);
    
    // Add overflow fix on resize
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
    
    // Use the analytics content from analytics.js
    if (typeof window.getPaymentsContent === 'function') {
        return window.getPaymentsContent(role);
    }
    
    return getPlaceholderContent('analytics');
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
    window.downloadScannerApp = downloadScannerApp;
    window.logout = logout;
}
