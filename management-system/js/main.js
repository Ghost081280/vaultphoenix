/* ============================================
   VAULT PHOENIX MANAGEMENT SYSTEM
   Main JavaScript - Core App Logic (Updated)
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
    walletAddress: null
};

// ============================================
// ROLE CONFIGURATIONS (UPDATED)
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
            { icon: '📍', label: 'My Locations', section: 'locations' },
            { icon: '💳', label: 'Payment Center', section: 'payments' },
            { icon: '📈', label: 'Performance Metrics', section: 'metrics' },
            { icon: '💰', label: 'ROI Calculator', section: 'budget' },
            { icon: '⚙️', label: 'Account Settings', section: 'settings' }
        ]
    },
    'system-admin': {
        name: 'System Admin',
        icon: '⚙️',
        showTokenBalance: false,
        navigation: [
            { icon: '📊', label: 'Global Dashboard', section: 'overview' },
            { icon: '💎', label: 'Token Economics', section: 'token-economics' },
            { icon: '🔧', label: 'Smithii.io Integration', section: 'smithii' },
            { icon: '👥', label: 'User Management', section: 'users' },
            { icon: '💰', label: 'Revenue Monitoring', section: 'revenue' },
            { icon: '🔒', label: 'Compliance Center', section: 'compliance' },
            { icon: '🌐', label: 'Global Analytics', section: 'analytics' }
        ]
    }
};

// ============================================
// INITIALIZATION
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    console.log('Vault Phoenix Management System - Initializing...');
    
    // Check if user is logged in
    if (sessionStorage.getItem('isLoggedIn') !== 'true') {
        window.location.href = 'index.html';
        return;
    }
    
    // Check for selected role
    const selectedRole = sessionStorage.getItem('selectedRole');
    
    if (!selectedRole) {
        console.warn('No role selected, redirecting to role selection...');
        window.location.href = 'role-selection.html';
        return;
    }
    
    // Initialize app with selected role
    initializeApp(selectedRole);
});

/**
 * Initialize the application
 */
function initializeApp(role) {
    console.log('Initializing app with role:', role);
    
    // Set current role
    AppState.currentRole = role;
    
    // Setup UI based on role
    setupRoleBasedUI(role);
    
    // Load navigation menu
    loadNavigationMenu(role);
    
    // Load default section (overview)
    loadSection('overview');
    
    // Setup event listeners
    setupEventListeners();
    
    // Initialize token balance (if applicable)
    updateTokenBalance();
    
    // Initialize Coinbase wallet (for campaign managers)
    if (role === 'campaign-manager') {
        initializeCoinbaseWallet();
    }
    
    console.log('App initialization complete');
}

/**
 * Setup role-based UI elements
 */
function setupRoleBasedUI(role) {
    const config = RoleConfig[role];
    
    // Update current role display
    const currentRoleName = document.getElementById('currentRoleName');
    if (currentRoleName) {
        currentRoleName.textContent = config.name;
    }
    
    // Show/hide token balance widget
    const tokenWidget = document.getElementById('tokenBalanceWidget');
    if (tokenWidget) {
        tokenWidget.style.display = config.showTokenBalance ? 'flex' : 'none';
    }
    
    // Update active role in dropdown
    updateActiveRoleInDropdown(role);
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
}

/**
 * Get section content based on role and section
 */
function getSectionContent(section) {
    const role = AppState.currentRole;
    
    if (section === 'overview') {
        return getOverviewContent(role);
    } else if (section === 'app-setup') {
        return getAppSetupContent(role);
    } else if (section === 'marketplace') {
        return getMarketplaceContent(role);
    } else if (section === 'campaigns') {
        return getCampaignsContent(role);
    } else if (section === 'revenue') {
        return getRevenueContent(role);
    } else if (section === 'airdrops') {
        return getAirdropsContent(role);
    } else if (section === 'advertisers') {
        return getAdvertisersContent(role);
    } else if (section === 'tokens') {
        return getTokensContent(role);
    } else if (section === 'wallet') {
        return getWalletContent(role);
    } else if (section === 'payments') {
        return getPaymentsContent(role);
    } else if (section === 'locations') {
        return getLocationsContent(role);
    } else if (section === 'metrics') {
        return getMetricsContent(role);
    } else if (section === 'budget') {
        return getBudgetContent(role);
    } else {
        return getPlaceholderContent(section);
    }
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
    return `
        <!-- Hero Stats Cards -->
        <div class="hero-stats">
            <div class="stat-card">
                <div class="stat-icon">💰</div>
                <div class="stat-label">Total Revenue</div>
                <div class="stat-value">$47,392</div>
                <div class="stat-change positive">+19.8% ↑ this month</div>
            </div>
            
            <div class="stat-card">
                <div class="stat-icon">🎮</div>
                <div class="stat-label">Active Campaigns</div>
                <div class="stat-value">8</div>
                <div class="stat-details">
                    <div class="stat-detail-item">
                        <span>Live Apps:</span>
                        <span>3</span>
                    </div>
                </div>
            </div>
            
            <div class="stat-card">
                <div class="stat-icon">💎</div>
                <div class="stat-label">$Ember Distributed</div>
                <div class="stat-value">3.67M</div>
                <div class="stat-change">This Month</div>
            </div>
            
            <div class="stat-card">
                <div class="stat-icon">📍</div>
                <div class="stat-label">Active Advertisers</div>
                <div class="stat-value">47</div>
                <div class="stat-details">
                    <div class="stat-detail-item">
                        <span>Pending:</span>
                        <span>12</span>
                    </div>
                </div>
            </div>
        </div>
        
        <!-- Quick Actions -->
        <div class="dashboard-section">
            <h2 class="section-title">⚡ Quick Actions</h2>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 20px;">
                <button class="btn btn-primary" onclick="loadSection('app-setup')" style="padding: 20px; font-size: 1.1rem;">
                    🎮 Launch New Campaign
                </button>
                <button class="btn btn-secondary" onclick="loadSection('wallet')" style="padding: 20px; font-size: 1.1rem;">
                    👛 Connect Coinbase Wallet
                </button>
                <button class="btn btn-outline" onclick="loadSection('advertisers')" style="padding: 20px; font-size: 1.1rem;">
                    📍 Manage Advertisers
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
                <div class="app-card" onclick="openAppMonitoring('ember-hunt')">
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
                            <span class="metric-label">Advertisers</span>
                            <span class="metric-value">23</span>
                        </div>
                        <div class="app-metric">
                            <span class="metric-label">Revenue/Day</span>
                            <span class="metric-value">$834</span>
                        </div>
                    </div>
                    <div class="app-actions">
                        <button class="btn btn-outline" onclick="event.stopPropagation(); loadSection('campaigns')">Manage</button>
                        <button class="btn btn-primary" onclick="event.stopPropagation(); openPlayerApp()">View App ↗</button>
                    </div>
                </div>
                
                <div class="app-card" style="opacity: 0.6; cursor: default;">
                    <div class="app-header">
                        <div class="app-name">🎯 SDK Campaign #2</div>
                        <div class="app-status">
                            <span class="status-indicator status-offline"></span>
                            <span style="color: #6b7280;">Setup</span>
                        </div>
                    </div>
                    <div style="margin: 15px 0; padding: 12px; background: rgba(0,0,0,0.3); border-radius: 8px;">
                        <div style="font-size: 0.85rem; color: rgba(255,255,255,0.6); margin-bottom: 5px;">Type</div>
                        <div style="font-weight: 700;">SDK Integration</div>
                    </div>
                    <div class="app-metrics">
                        <div class="app-metric">
                            <span class="metric-label">Status</span>
                            <span class="metric-value">Pending Setup</span>
                        </div>
                    </div>
                    <div class="app-actions">
                        <button class="btn btn-primary" onclick="loadSection('app-setup')">Complete Setup</button>
                    </div>
                </div>
            </div>
        </div>
    `;
}

/**
 * Get Advertiser Overview
 */
function getAdvertiserOverview() {
    return getMerchantOverview();
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
 * Update active role in dropdown
 */
function updateActiveRoleInDropdown(role) {
    const roleOptions = document.querySelectorAll('.role-option');
    roleOptions.forEach(option => {
        if (option.dataset.role === role) {
            option.classList.add('active');
        } else {
            option.classList.remove('active');
        }
    });
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
    // Role switcher
    const roleSwitcherBtn = document.getElementById('roleSwitcherBtn');
    const roleDropdown = document.getElementById('roleDropdown');
    
    if (roleSwitcherBtn && roleDropdown) {
        roleSwitcherBtn.addEventListener('click', () => {
            roleDropdown.classList.toggle('active');
        });
        
        document.addEventListener('click', (e) => {
            if (!roleSwitcherBtn.contains(e.target) && !roleDropdown.contains(e.target)) {
                roleDropdown.classList.remove('active');
            }
        });
        
        const roleOptions = document.querySelectorAll('.role-option');
        roleOptions.forEach(option => {
            option.addEventListener('click', () => {
                const newRole = option.dataset.role;
                switchRole(newRole);
            });
        });
    }
    
    const menuToggle = document.getElementById('menuToggle');
    if (menuToggle) {
        menuToggle.addEventListener('click', toggleSidebar);
    }
    
    handleResponsiveSidebar();
    window.addEventListener('resize', handleResponsiveSidebar);
}

/**
 * Switch to a different role
 */
function switchRole(newRole) {
    sessionStorage.setItem('selectedRole', newRole);
    window.location.reload();
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
    // Check if wallet was previously connected
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
        <div style="text-align: center; padding: 80px 20px;">
            <div style="font-size: 4rem; margin-bottom: 20px;">🚧</div>
            <h2 style="font-size: 2rem; margin-bottom: 15px; color: var(--color-primary-gold);">
                ${section.charAt(0).toUpperCase() + section.slice(1)} Section
            </h2>
            <p style="color: rgba(255, 255, 255, 0.6); font-size: 1.1rem;">
                This section is under development and will be available soon.
            </p>
            <button class="btn btn-primary" style="margin-top: 30px;" onclick="loadSection('overview')">
                Back to Dashboard
            </button>
        </div>
    `;
}

/**
 * Open app monitoring view
 */
function openAppMonitoring(appId) {
    console.log('Opening monitoring for app:', appId);
    loadSection('campaigns');
}

/**
 * Open player app
 */
function openPlayerApp() {
    alert('🔥 This would open the player app in a new window, showing the mobile experience your users see.');
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
    window.openAppMonitoring = openAppMonitoring;
    window.openPlayerApp = openPlayerApp;
    window.logout = logout;
}
