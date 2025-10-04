/* ============================================
   VAULT PHOENIX MANAGEMENT SYSTEM
   Main JavaScript - Core App Logic
   ============================================ */

// ============================================
// GLOBAL STATE MANAGEMENT
// ============================================

const AppState = {
    currentRole: null,
    currentSection: 'overview',
    userData: {
        name: 'Demo User',
        avatar: 'VP',
        notifications: 3
    },
    tokenBalance: {
        amount: 28450,
        price: 0.0035
    },
    sidebarOpen: false
};

// ============================================
// ROLE CONFIGURATIONS
// ============================================

const RoleConfig = {
    'platform-operator': {
        name: 'Platform Operator',
        icon: '🚀',
        showTokenBalance: true,
        navigation: [
            { icon: '📊', label: 'Dashboard Overview', section: 'overview' },
            { icon: '💰', label: 'Revenue Analytics', section: 'revenue' },
            { icon: '🗺️', label: 'Campaign Control', section: 'campaigns' },
            { icon: '🎯', label: 'Airdrop Center', section: 'airdrops' },
            { icon: '🏢', label: 'Merchant Management', section: 'merchants' },
            { icon: '💎', label: 'Token Inventory', section: 'tokens' },
            { icon: '⚙️', label: 'Settings', section: 'settings' }
        ]
    },
    'sdk-customer': {
        name: 'SDK Customer',
        icon: '🔌',
        showTokenBalance: true,
        navigation: [
            { icon: '📊', label: 'Dashboard Overview', section: 'overview' },
            { icon: '🔌', label: 'Connected Apps', section: 'apps' },
            { icon: '🗺️', label: 'Multi-App Campaigns', section: 'campaigns' },
            { icon: '🎯', label: 'Cross-Platform Airdrops', section: 'airdrops' },
            { icon: '📈', label: 'Aggregated Analytics', section: 'analytics' },
            { icon: '💎', label: 'Token Distribution', section: 'tokens' },
            { icon: '⚙️', label: 'API & Integration', section: 'integration' }
        ]
    },
    'merchant': {
        name: 'Merchant',
        icon: '🏢',
        showTokenBalance: false,
        navigation: [
            { icon: '📊', label: 'Dashboard Overview', section: 'overview' },
            { icon: '📍', label: 'My Locations', section: 'locations' },
            { icon: '💳', label: 'Dual Payment Center', section: 'payments' },
            { icon: '📈', label: 'Performance Metrics', section: 'metrics' },
            { icon: '💰', label: 'Budget Planning', section: 'budget' },
            { icon: '⚙️', label: 'Account Settings', section: 'settings' }
        ]
    },
    'system-admin': {
        name: 'System Admin',
        icon: '⚙️',
        showTokenBalance: false,
        navigation: [
            { icon: '📊', label: 'Global Dashboard', section: 'overview' },
            { icon: '🔧', label: 'Smithii.io Integration', section: 'smithii' },
            { icon: '👥', label: 'User Management', section: 'users' },
            { icon: '💰', label: 'Revenue Monitoring', section: 'revenue' },
            { icon: '📊', label: 'Token Economics', section: 'token-economics' },
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
    
    // Check for selected role
    const selectedRole = sessionStorage.getItem('selectedRole');
    
    if (!selectedRole) {
        console.warn('No role selected, redirecting to role selection...');
        window.location.href = 'index.html';
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
    
    // Log initialization complete
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
    
    // Clear existing menu
    navMenu.innerHTML = '';
    
    // Build navigation items
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
        
        // Add click handler
        link.addEventListener('click', (e) => {
            e.preventDefault();
            loadSection(item.section);
        });
        
        li.appendChild(link);
        navMenu.appendChild(li);
    });
    
    // Set first item as active
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
    
    // Update active nav item
    updateActiveNavItem(section);
    
    // Update page title
    updatePageTitle(section);
    
    // Load section content
    const content = getSectionContent(section);
    const mainContent = document.getElementById('dashboardContent');
    
    if (mainContent) {
        mainContent.innerHTML = content;
    }
    
    // Close sidebar on mobile after navigation
    if (window.innerWidth < 1024) {
        closeSidebar();
    }
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

/**
 * Get section content based on role and section
 */
function getSectionContent(section) {
    const role = AppState.currentRole;
    
    // Route to appropriate content generator
    if (section === 'overview') {
        return getOverviewContent(role);
    } else if (section === 'campaigns') {
        return getCampaignsContent(role);
    } else if (section === 'revenue') {
        return getRevenueContent(role);
    } else if (section === 'airdrops') {
        return getAirdropsContent(role);
    } else if (section === 'merchants') {
        return getMerchantsContent(role);
    } else if (section === 'tokens') {
        return getTokensContent(role);
    } else if (section === 'payments') {
        return getPaymentsContent(role);
    } else if (section === 'token-economics') {
        return getTokenEconomicsContent(role);
    } else if (section === 'smithii') {
        return getSmithiiContent(role);
    } else {
        return getPlaceholderContent(section);
    }
}

/**
 * Get overview content for current role
 */
function getOverviewContent(role) {
    if (role === 'platform-operator') {
        return getPlatformOperatorOverview();
    } else if (role === 'sdk-customer') {
        return getSDKCustomerOverview();
    } else if (role === 'merchant') {
        return getMerchantOverview();
    } else if (role === 'system-admin') {
        return getSystemAdminOverview();
    }
}

/**
 * Platform Operator Overview
 */
function getPlatformOperatorOverview() {
    return `
        <!-- Hero Stats Cards -->
        <div class="hero-stats">
            <div class="stat-card">
                <div class="stat-icon">💰</div>
                <div class="stat-label">Total Revenue</div>
                <div class="stat-value">$47,392</div>
                <div class="stat-change positive">+12% ↑ this week</div>
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
                <div class="stat-label">Tokens Distributed</div>
                <div class="stat-value">1.2M</div>
                <div class="stat-change positive">$Ember</div>
            </div>
            
            <div class="stat-card">
                <div class="stat-icon">🏢</div>
                <div class="stat-label">Merchants</div>
                <div class="stat-value">47</div>
                <div class="stat-details">
                    <div class="stat-detail-item">
                        <span>Pending:</span>
                        <span>12</span>
                    </div>
                </div>
            </div>
        </div>
        
        <!-- Token Balance Widget (Desktop version) -->
        <div class="dashboard-section">
            <div class="card">
                <h3 style="margin-bottom: 20px;">💎 Your Token Balance</h3>
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px;">
                    <div>
                        <div style="font-size: 2rem; font-weight: 900; color: var(--color-primary-gold);">
                            ${AppState.tokenBalance.amount.toLocaleString()} $Ember
                        </div>
                        <div style="color: rgba(255, 255, 255, 0.6);">
                            ~$${(AppState.tokenBalance.amount * AppState.tokenBalance.price).toFixed(2)} USD
                        </div>
                    </div>
                    <button class="btn btn-primary" onclick="showPurchaseTokenModal()">Purchase More Tokens</button>
                </div>
                <div style="padding-top: 15px; border-top: 1px solid rgba(255, 255, 255, 0.1);">
                    <div style="display: flex; justify-content: space-between; padding: 8px 0;">
                        <span style="color: rgba(255, 255, 255, 0.7);">Token Source:</span>
                        <span>Starter Bonus: $100 worth ✓</span>
                    </div>
                    <div style="display: flex; justify-content: space-between; padding: 8px 0;">
                        <span style="color: rgba(255, 255, 255, 0.7);">Purchased:</span>
                        <span>0 tokens</span>
                    </div>
                </div>
            </div>
        </div>
        
        <!-- Connected Apps Grid -->
        <div class="dashboard-section">
            <div class="section-header">
                <h2 class="section-title">🎮 My Connected Applications</h2>
                <div class="section-actions">
                    <button class="btn btn-primary">+ Add New App</button>
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
                    <div class="app-metrics">
                        <div class="app-metric">
                            <span class="metric-label">Players Now</span>
                            <span class="metric-value">47</span>
                        </div>
                        <div class="app-metric">
                            <span class="metric-label">Tokens Active</span>
                            <span class="metric-value">156</span>
                        </div>
                        <div class="app-metric">
                            <span class="metric-label">Revenue/Day</span>
                            <span class="metric-value">$834</span>
                        </div>
                    </div>
                    <div class="app-actions">
                        <button class="btn btn-outline" onclick="event.stopPropagation(); loadSection('campaigns')">View Details</button>
                        <button class="btn btn-primary" onclick="event.stopPropagation(); openPlayerApp()">Open App ↗</button>
                    </div>
                </div>
                
                <div class="app-card">
                    <div class="app-header">
                        <div class="app-name">🎮 SDK Demo #2</div>
                        <div class="app-status">
                            <span class="status-indicator status-offline"></span>
                            <span style="color: #6b7280;">Offline</span>
                        </div>
                    </div>
                    <div class="app-metrics">
                        <div class="app-metric">
                            <span class="metric-label">Players Now</span>
                            <span class="metric-value">0</span>
                        </div>
                        <div class="app-metric">
                            <span class="metric-label">Tokens Ready</span>
                            <span class="metric-value">230</span>
                        </div>
                        <div class="app-metric">
                            <span class="metric-label">Revenue/Day</span>
                            <span class="metric-value">$0</span>
                        </div>
                    </div>
                    <div class="app-actions">
                        <button class="btn btn-outline">Launch App</button>
                        <button class="btn btn-secondary">Configure</button>
                    </div>
                </div>
                
                <div class="app-card">
                    <div class="app-header">
                        <div class="app-name">✨ Campaign #3</div>
                        <div class="app-status">
                            <span class="status-indicator status-active"></span>
                            <span style="color: var(--color-primary-orange);">Active</span>
                        </div>
                    </div>
                    <div class="app-metrics">
                        <div class="app-metric">
                            <span class="metric-label">Players Now</span>
                            <span class="metric-value">12</span>
                        </div>
                        <div class="app-metric">
                            <span class="metric-label">Tokens Active</span>
                            <span class="metric-value">89</span>
                        </div>
                        <div class="app-metric">
                            <span class="metric-label">Revenue/Day</span>
                            <span class="metric-value">$245</span>
                        </div>
                    </div>
                    <div class="app-actions">
                        <button class="btn btn-outline">View Details</button>
                        <button class="btn btn-primary">Open App ↗</button>
                    </div>
                </div>
            </div>
        </div>
    `;
}

/**
 * Get placeholder content for sections under development
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
        
        // Close dropdown when clicking outside
        document.addEventListener('click', (e) => {
            if (!roleSwitcherBtn.contains(e.target) && !roleDropdown.contains(e.target)) {
                roleDropdown.classList.remove('active');
            }
        });
        
        // Role option clicks
        const roleOptions = document.querySelectorAll('.role-option');
        roleOptions.forEach(option => {
            option.addEventListener('click', () => {
                const newRole = option.dataset.role;
                switchRole(newRole);
            });
        });
    }
    
    // Menu toggle for mobile
    const menuToggle = document.getElementById('menuToggle');
    if (menuToggle) {
        menuToggle.addEventListener('click', toggleSidebar);
    }
    
    // Responsive sidebar handling
    handleResponsiveSidebar();
    window.addEventListener('resize', handleResponsiveSidebar);
}

/**
 * Switch to a different role
 */
function switchRole(newRole) {
    console.log('Switching to role:', newRole);
    
    // Update session storage
    sessionStorage.setItem('selectedRole', newRole);
    
    // Reload the page with new role
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
 * Open app monitoring view
 */
function openAppMonitoring(appId) {
    console.log('Opening monitoring for app:', appId);
    loadSection('campaigns');
}

/**
 * Open player app in new window
 */
function openPlayerApp() {
    // In production, this would open the actual player app
    // For demo, we'll show an alert
    alert('🔥 This would open the $Ember Hunt player app (crypto-game/dashboard.html) in a new window, showing the player-side experience.');
    
    // Optionally open in new window:
    // window.open('../crypto-game/dashboard.html', '_blank');
}

/**
 * Show purchase token modal (placeholder)
 */
function showPurchaseTokenModal() {
    alert('💎 Token purchase interface would appear here. Users can buy $Ember tokens at current market price from Smithii.io.');
}

// Export for use in other modules
if (typeof window !== 'undefined') {
    window.AppState = AppState;
    window.loadSection = loadSection;
    window.openAppMonitoring = openAppMonitoring;
    window.openPlayerApp = openPlayerApp;
    window.showPurchaseTokenModal = showPurchaseTokenModal;
}
