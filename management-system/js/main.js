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
    currentCampaignId: null // Track current campaign for advertisers
};

// ============================================
// ROLE CONFIGURATIONS - SIMPLIFIED
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
    loadSection('overview');
    setupEventListeners();
    updateTokenBalance();
    
    if (role === 'campaign-manager') {
        initializeCoinbaseWallet();
    }
    
    console.log('App initialization complete');
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
        if (section === 'airdrop-requests') return getAirdropRequestsContent(role);
        if (section === 'payments') return getPaymentsContent(role);
        if (section === 'analytics') return getAdvertiserAnalyticsContent(role);
        if (section === 'budget') return getBudgetContent(role);
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
                <div class="stat-label">Total Revenue</div>
                <div class="stat-value">$650</div>
                <div class="stat-change positive">This Month</div>
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
                </div>
            </div>
            
            <div class="stat-card">
                <div class="stat-icon">📍</div>
                <div class="stat-label">Total Token Locations</div>
                <div class="stat-value">${totalLocations}</div>
                <div class="stat-change">Across all campaigns</div>
            </div>
            
            <div class="stat-card">
                <div class="stat-icon">🏢</div>
                <div class="stat-label">Active Advertisers</div>
                <div class="stat-value">${advertisers}</div>
                <div class="stat-details">
                    <div class="stat-detail-item">
                        <span>Pending:</span>
                        <span>0</span>
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
                            <span class="metric-label">Total Locations</span>
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
    window.logout = logout;
}
