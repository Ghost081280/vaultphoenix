// Vault Phoenix AR Crypto Gaming - Fixed JavaScript
class VaultPhoenixCryptoGame {
    constructor() {
        console.log('🔥💎 Vault Phoenix AR Crypto Gaming starting...');
        
        // Initialize all properties safely
        this.userLat = null;
        this.userLng = null;
        this.heading = 0;
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.tokenLocations = [];
        this.tokenObjects = [];
        this.mapMarkers = [];
        this.isStarted = false;
        this.currentMode = 'map';
        this.map = null;
        this.userMarker = null;
        this.animationStarted = false;
        this.collectedTokens = [];
        this.totalTokenValue = 0;
        this.currentDiscoveredToken = null;
        this.cameraStream = null;
        this.hasReceivedOrientationData = false;
        this.compassInterval = null;
        this.isCompassActive = false;

        // Ember Token Values and Rarities
        this.emberTokens = [
            { id: 1, value: 500, rarity: "legendary", location: "Downtown Phoenix", lat: 33.4484, lng: -112.0740 },
            { id: 2, value: 250, rarity: "rare", location: "Scottsdale Quarter", lat: 33.4942, lng: -111.9261 },
            { id: 3, value: 100, rarity: "common", location: "Tempe Town Lake", lat: 33.4255, lng: -111.9400 },
            { id: 4, value: 150, rarity: "common", location: "Old Town Scottsdale", lat: 33.4942, lng: -111.9261 },
            { id: 5, value: 300, rarity: "rare", location: "Arizona State University", lat: 33.4194, lng: -111.9339 },
            { id: 6, value: 75, rarity: "common", location: "Phoenix Sky Harbor", lat: 33.4343, lng: -112.0116 },
            { id: 7, value: 200, rarity: "rare", location: "Camelback Mountain", lat: 33.5186, lng: -111.9717 },
            { id: 8, value: 50, rarity: "common", location: "Desert Botanical Garden", lat: 33.4619, lng: -111.9463 },
            { id: 9, value: 125, rarity: "common", location: "Roosevelt Row", lat: 33.4524, lng: -112.0708 },
            { id: 10, value: 400, rarity: "legendary", location: "Chase Field", lat: 33.4453, lng: -112.0667 },
            { id: 11, value: 90, rarity: "common", location: "Papago Park", lat: 33.4551, lng: -111.9511 },
            { id: 12, value: 175, rarity: "rare", location: "Biltmore Fashion Park", lat: 33.5117, lng: -112.0736 }
        ];

        // Initialize immediately when DOM is ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.init());
        } else {
            this.init();
        }
        
        // Make app globally accessible
        window.vaultPhoenixApp = this;
    }

    init() {
        console.log('🔧 Initializing Vault Phoenix...');
        try {
            // Check if we're on the login page or dashboard
            if (document.getElementById('loginForm')) {
                this.setupLoginListeners();
                this.loadSavedCredentials();
                console.log('✅ Login page initialized');
            } else if (document.getElementById('container')) {
                this.ensureSession();
                this.loadUserInfo();
                this.loadCollectedTokens();
                this.setupEventListeners();
                this.initializeVault();
                this.addHapticFeedback();
                document.body.classList.add('dashboard');
                console.log('✅ Dashboard initialized');
            }
        } catch (error) {
            console.error('❌ Initialization error:', error);
            this.collectedTokens = [];
            this.totalTokenValue = 0;
        }
    }

    // Login System
    setupLoginListeners() {
        const loginForm = document.getElementById('loginForm');
        const forgotPassword = document.getElementById('forgotPassword');
        
        if (loginForm) {
            loginForm.addEventListener('submit', (e) => this.handleLogin(e));
        }
        
        if (forgotPassword) {
            forgotPassword.addEventListener('click', (e) => this.handleForgotPassword(e));
        }
        
        // Add enhanced mobile interactions
        const inputs = document.querySelectorAll('.form-input');
        inputs.forEach(input => {
            input.addEventListener('focus', () => this.animateInput(input, true));
            input.addEventListener('blur', () => this.animateInput(input, false));
            input.addEventListener('input', () => this.validateInput(input));
        });

        this.addHapticFeedback();
    }

    loadSavedCredentials() {
        const emailInput = document.getElementById('email');
        const passwordInput = document.getElementById('password');
        
        if (emailInput) emailInput.value = 'demo@vaultphoenix.com';
        if (passwordInput) passwordInput.value = 'phoenix123';
    }

    animateInput(input, focused) {
        const container = input.closest('.form-group');
        if (container) {
            if (focused) {
                container.style.transform = 'scale(1.01)';
                container.style.zIndex = '10';
            } else {
                container.style.transform = 'scale(1)';
                container.style.zIndex = '1';
            }
        }
    }

    validateInput(input) {
        const isValid = input.checkValidity();
        
        if (input.value) {
            if (isValid) {
                input.style.borderColor = '#4CAF50';
            } else {
                input.style.borderColor = '#f44336';
            }
        } else {
            input.style.borderColor = '#e8f0fe';
        }
    }

    async handleLogin(event) {
        event.preventDefault();
        
        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value;
        const loginBtn = document.getElementById('loginBtn');
        const loginText = document.getElementById('loginText');
        const container = document.querySelector('.login-container');

        this.hideMessages();

        if (!this.validateEmail(email)) {
            this.showError('Please enter a valid email address');
            this.focusInput(document.getElementById('email'));
            return;
        }

        if (password.length < 6) {
            this.showError('Password must be at least 6 characters long');
            this.focusInput(document.getElementById('password'));
            return;
        }

        if (container) container.classList.add('loading');
        if (loginText) loginText.innerHTML = '<span class="loading-spinner"></span>Authenticating...';
        
        if (loginBtn) loginBtn.style.transform = 'scale(0.98)';

        try {
            await this.authenticateUser(email, password);
            
            if (loginText) loginText.textContent = '✅ Access Granted!';
            if (loginBtn) loginBtn.style.background = 'linear-gradient(135deg, #4CAF50, #45a049)';
            
            this.showSuccess('Login successful! Launching AR Crypto Hunt...');
            
            this.storeSession(email);
            
            setTimeout(() => {
                window.location.href = 'dashboard.html';
            }, 1500);

        } catch (error) {
            if (loginBtn) loginBtn.style.transform = 'scale(1)';
            if (loginText) loginText.innerHTML = '🔥 Start Crypto Hunt';
            if (container) container.classList.remove('loading');
            
            this.showError(error.message);
            
            if (container) {
                container.style.animation = 'shake 0.5s ease-in-out';
                setTimeout(() => {
                    container.style.animation = '';
                }, 500);
            }
        }
    }

    focusInput(input) {
        if (input) {
            input.focus();
            input.select();
        }
    }

    async authenticateUser(email, password) {
        await new Promise(resolve => setTimeout(resolve, 1000));

        const validCredentials = [
            { email: 'demo@vaultphoenix.com', password: 'phoenix123' },
            { email: 'admin@vaultphoenix.com', password: 'admin123' },
            { email: 'hunter@crypto.com', password: 'crypto123' },
            { email: 'player@ember.com', password: 'ember123' }
        ];

        const isValid = validCredentials.some(cred => 
            cred.email.toLowerCase() === email.toLowerCase() && cred.password === password
        );

        if (!isValid) {
            throw new Error('Invalid credentials. Try: demo@vaultphoenix.com / phoenix123');
        }

        return { success: true, email, timestamp: Date.now() };
    }

    validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    storeSession(email) {
        const sessionData = {
            email: email,
            loginTime: new Date().toISOString(),
            sessionId: this.generateSessionId(),
            userAgent: navigator.userAgent,
            platform: navigator.platform,
            walletAddress: '0x' + Math.random().toString(16).substr(2, 40)
        };
        
        sessionStorage.setItem('vaultPhoenixSession', JSON.stringify(sessionData));
    }

    generateSessionId() {
        return Math.random().toString(36).substring(2) + Date.now().toString(36);
    }

    showError(message) {
        const errorDiv = document.getElementById('errorMessage');
        if (errorDiv) {
            errorDiv.textContent = `⚠️ ${message}`;
            errorDiv.style.display = 'block';
            
            setTimeout(() => {
                errorDiv.style.display = 'none';
            }, 4000);
        }
    }

    showSuccess(message) {
        const successDiv = document.getElementById('successMessage');
        if (successDiv) {
            successDiv.textContent = `✅ ${message}`;
            successDiv.style.display = 'block';
        }
    }

    hideMessages() {
        const errorDiv = document.getElementById('errorMessage');
        const successDiv = document.getElementById('successMessage');
        if (errorDiv) errorDiv.style.display = 'none';
        if (successDiv) successDiv.style.display = 'none';
    }

    handleForgotPassword(event) {
        event.preventDefault();
        alert('Password reset would be implemented here.\n\nFor demo: demo@vaultphoenix.com / phoenix123');
    }

    // Dashboard System
    ensureSession() {
        console.log('🔍 Ensuring session exists...');
        try {
            const existingSession = sessionStorage.getItem('vaultPhoenixSession');
            let sessionData = null;
            
            if (existingSession) {
                try {
                    sessionData = JSON.parse(existingSession);
                    console.log('📄 Found existing session');
                } catch (parseError) {
                    console.log('⚠️ Session parse error, creating new session');
                    sessionData = null;
                }
            }
            
            if (!sessionData || typeof sessionData !== 'object' || !sessionData.email) {
                console.log('🔧 Creating new session...');
                sessionData = {
                    email: 'demo@vaultphoenix.com',
                    loginTime: new Date().toISOString(),
                    userId: 'phoenix-hunter-' + Date.now(),
                    walletAddress: '0x' + Math.random().toString(16).substr(2, 40)
                };
                sessionStorage.setItem('vaultPhoenixSession', JSON.stringify(sessionData));
                console.log('✅ Session created:', sessionData.email);
            } else {
                console.log('✅ Session valid:', sessionData.email);
            }
            
        } catch (error) {
            console.error('❌ Session error:', error);
            const fallbackSession = {
                email: 'demo@vaultphoenix.com',
                loginTime: new Date().toISOString(),
                userId: 'fallback-phoenix-user',
                walletAddress: '0x1234567890abcdef1234567890abcdef12345678'
            };
            sessionStorage.setItem('vaultPhoenixSession', JSON.stringify(fallbackSession));
            console.log('🆘 Fallback session created');
        }
    }

    loadUserInfo() {
        console.log('👤 Loading user info...');
        try {
            const sessionString = sessionStorage.getItem('vaultPhoenixSession');
            if (sessionString) {
                const sessionData = JSON.parse(sessionString);
                const email = sessionData.email || 'demo@vaultphoenix.com';
                
                const emailElement = document.getElementById('menuUserEmail');
                const avatarElement = document.getElementById('menuAvatar');
                
                if (emailElement) emailElement.textContent = email;
                if (avatarElement) avatarElement.textContent = email.charAt(0).toUpperCase();
                
                console.log('✅ User info loaded:', email);
            } else {
                const emailElement = document.getElementById('menuUserEmail');
                const avatarElement = document.getElementById('menuAvatar');
                
                if (emailElement) emailElement.textContent = 'demo@vaultphoenix.com';
                if (avatarElement) avatarElement.textContent = 'P';
                
                console.log('⚠️ No session, using fallback user info');
            }
        } catch (error) {
            console.error('❌ User info error:', error);
            const emailElement = document.getElementById('menuUserEmail');
            const avatarElement = document.getElementById('menuAvatar');
            
            if (emailElement) emailElement.textContent = 'demo@vaultphoenix.com';
            if (avatarElement) avatarElement.textContent = 'P';
        }
    }

    loadCollectedTokens() {
        console.log('💎 Loading collected tokens...');
        try {
            const saved = localStorage.getItem('vaultPhoenixTokens');
            if (saved) {
                this.collectedTokens = JSON.parse(saved);
                this.calculateTotalValue();
                console.log('✅ Loaded', this.collectedTokens.length, 'tokens worth', this.totalTokenValue, '$Ember');
            } else {
                this.collectedTokens = [];
                this.totalTokenValue = 0;
                console.log('📦 No saved tokens, starting fresh vault');
            }
        } catch (error) {
            console.error('❌ Token loading error:', error);
            this.collectedTokens = [];
            this.totalTokenValue = 0;
        }
        this.updateVaultStats();
    }

    saveCollectedTokens() {
        try {
            localStorage.setItem('vaultPhoenixTokens', JSON.stringify(this.collectedTokens));
            this.calculateTotalValue();
            this.updateVaultStats();
            console.log('💾 Tokens saved:', this.collectedTokens.length, 'worth', this.totalTokenValue, '$Ember');
        } catch (error) {
            console.error('❌ Token saving error:', error);
        }
    }

    calculateTotalValue() {
        this.totalTokenValue = this.collectedTokens.reduce((total, token) => total + token.value, 0);
    }

    updateVaultStats() {
        try {
            const elements = {
                emberCount: document.getElementById('emberCount'),
                navEmberCount: document.getElementById('navEmberCount'),
                menuEmberCount: document.getElementById('menuEmberCount'),
                vaultBalance: document.getElementById('vaultBalance'),
                vaultUsdValue: document.getElementById('vaultUsdValue'),
                tokensFound: document.getElementById('tokensFound'),
                qrTokenAmount: document.getElementById('qrTokenAmount'),
                qrTokenValue: document.getElementById('qrTokenValue')
            };
            
            const usdValue = (this.totalTokenValue * 0.001).toFixed(2);
            
            if (elements.emberCount) elements.emberCount.textContent = `${this.totalTokenValue} $Ember`;
            if (elements.navEmberCount) elements.navEmberCount.textContent = this.totalTokenValue;
            if (elements.menuEmberCount) elements.menuEmberCount.textContent = this.totalTokenValue;
            if (elements.vaultBalance) elements.vaultBalance.textContent = `${this.totalTokenValue} $Ember Tokens`;
            if (elements.vaultUsdValue) elements.vaultUsdValue.textContent = `$${usdValue} USD`;
            if (elements.tokensFound) elements.tokensFound.textContent = this.totalTokenValue;
            if (elements.qrTokenAmount) elements.qrTokenAmount.textContent = `${this.totalTokenValue} $Ember`;
            if (elements.qrTokenValue) elements.qrTokenValue.textContent = `$${usdValue} USD`;
            
        } catch (error) {
            console.error('❌ Stats update error:', error);
        }
    }

    setupEventListeners() {
        console.log('🎧 Setting up event listeners...');
        try {
            const handlers = [
                { id: 'startBtn', event: 'click', handler: () => this.start() },
                { id: 'homeBtn', event: 'click', handler: () => this.goHome() },
                { id: 'menuToggle', event: 'click', handler: () => this.toggleMenu() },
                { id: 'menuOverlay', event: 'click', handler: () => this.closeMenu() },
                { id: 'sideMenuLogout', event: 'click', handler: () => this.showLogoutConfirmation() },
                { id: 'collectTokenBtn', event: 'click', handler: () => this.collectToken() },
                { id: 'skipTokenBtn', event: 'click', handler: () => this.skipToken() },
                { id: 'arEmberCoin', event: 'click', handler: () => this.onEmberCoinClick() },
                { id: 'vaultBadge', event: 'click', handler: () => this.switchMode('vault') },
                { id: 'cancelLogout', event: 'click', handler: () => this.hideLogoutConfirmation() },
                { id: 'confirmLogout', event: 'click', handler: () => this.logout() },
                { id: 'navClose', event: 'click', handler: () => this.hideNavigationModal() },
                { id: 'navWalking', event: 'click', handler: () => this.openMapsNavigation('walking') },
                { id: 'navDriving', event: 'click', handler: () => this.openMapsNavigation('driving') },
                { id: 'navAR', event: 'click', handler: () => this.startARHunt() },
                { id: 'coinbaseTransferBtn', event: 'click', handler: () => this.transferToCoinbase() },
                { id: 'redeemQRBtn', event: 'click', handler: () => this.showQRCode() },
                { id: 'qrClose', event: 'click', handler: () => this.hideQRCode() },
                { id: 'coinbaseWallet', event: 'click', handler: () => this.openCoinbaseWallet() },
                { id: 'redeemTokens', event: 'click', handler: () => this.showQRCode() }
            ];
            
            handlers.forEach(({ id, event, handler }) => {
                const element = document.getElementById(id);
                if (element) {
                    element.addEventListener(event, handler);
                }
            });

            // Navigation tabs
            document.querySelectorAll('.nav-tab').forEach(tab => {
                tab.addEventListener('click', () => {
                    if (!tab.classList.contains('disabled')) {
                        this.switchMode(tab.dataset.mode);
                    }
                });
            });

            // Menu items
            document.querySelectorAll('.menu-item[data-mode]').forEach(item => {
                item.addEventListener('click', () => {
                    this.switchMode(item.dataset.mode);
                    this.closeMenu();
                });
            });

            // Vault filters
            document.querySelectorAll('.filter-btn').forEach(btn => {
                btn.addEventListener('click', (e) => this.filterVault(e.target.dataset.filter));
            });

            console.log('✅ Event listeners setup complete');
        } catch (error) {
            console.error('❌ Event listener error:', error);
        }
    }

    // Basic utility methods to prevent errors
    initializeVault() {
        console.log('💎 Initializing vault...');
        // Basic vault initialization
    }

    addHapticFeedback() {
        try {
            const interactiveElements = document.querySelectorAll('.nav-tab, .token-action-btn, .vault-action-btn, .filter-btn, .menu-item, .ar-ember-coin, .token-history-item');
            
            interactiveElements.forEach(element => {
                element.addEventListener('touchstart', () => {
                    if (navigator.vibrate) {
                        navigator.vibrate(10);
                    }
                });
            });
        } catch (error) {
            console.error('❌ Haptic feedback error:', error);
        }
    }

    // Enhanced methods with better error handling
    start() { 
        console.log('🚀 Starting game...');
        try {
            const startBtn = document.getElementById('startBtn');
            if (startBtn) {
                startBtn.style.display = 'none';
            }
        } catch (error) {
            console.error('❌ Start error:', error);
        }
    }

    goHome() { 
        console.log('🏠 Going home...');
        try {
            this.switchMode('map');
        } catch (error) {
            console.error('❌ Go home error:', error);
        }
    }

    toggleMenu() { 
        console.log('📱 Toggling menu...');
        try {
            const sideMenu = document.getElementById('sideMenu');
            const menuOverlay = document.getElementById('menuOverlay');
            
            if (sideMenu && menuOverlay) {
                const isOpen = sideMenu.classList.contains('open');
                
                if (isOpen) {
                    sideMenu.classList.remove('open');
                    menuOverlay.classList.remove('active');
                } else {
                    sideMenu.classList.add('open');
                    menuOverlay.classList.add('active');
                }
            }
        } catch (error) {
            console.error('❌ Toggle menu error:', error);
        }
    }

    closeMenu() { 
        console.log('📱 Closing menu...');
        try {
            const sideMenu = document.getElementById('sideMenu');
            const menuOverlay = document.getElementById('menuOverlay');
            
            if (sideMenu) sideMenu.classList.remove('open');
            if (menuOverlay) menuOverlay.classList.remove('active');
        } catch (error) {
            console.error('❌ Close menu error:', error);
        }
    }

    showLogoutConfirmation() { 
        console.log('🚪 Show logout...');
        try {
            const logoutOverlay = document.getElementById('logoutOverlay');
            if (logoutOverlay) {
                logoutOverlay.style.display = 'flex';
            }
        } catch (error) {
            console.error('❌ Show logout error:', error);
        }
    }

    hideLogoutConfirmation() { 
        console.log('🚪 Hide logout...');
        try {
            const logoutOverlay = document.getElementById('logoutOverlay');
            if (logoutOverlay) {
                logoutOverlay.style.display = 'none';
            }
        } catch (error) {
            console.error('❌ Hide logout error:', error);
        }
    }

    logout() { 
        console.log('🚪 Logging out...');
        try {
            sessionStorage.removeItem('vaultPhoenixSession');
            window.location.href = 'index.html';
        } catch (error) {
            console.error('❌ Logout error:', error);
            window.location.href = 'index.html';
        }
    }

    collectToken() { console.log('💎 Collecting token...'); }
    skipToken() { console.log('⏭️ Skipping token...'); }
    onEmberCoinClick() { console.log('💎 Ember coin clicked...'); }
    
    switchMode(mode) { 
        console.log('🔄 Switching to mode:', mode);
        try {
            // Update navigation tabs
            document.querySelectorAll('.nav-tab').forEach(tab => {
                tab.classList.remove('active');
                if (tab.dataset.mode === mode) {
                    tab.classList.add('active');
                }
            });

            // Handle vault view
            const vaultView = document.getElementById('vaultView');
            if (vaultView) {
                if (mode === 'vault') {
                    vaultView.style.display = 'block';
                } else {
                    vaultView.style.display = 'none';
                }
            }

            this.currentMode = mode;
        } catch (error) {
            console.error('❌ Switch mode error:', error);
        }
    }

    hideNavigationModal() { console.log('🗺️ Hiding nav modal...'); }
    openMapsNavigation(mode) { console.log('🗺️ Opening maps:', mode); }
    startARHunt() { console.log('📱 Starting AR hunt...'); }
    transferToCoinbase() { console.log('🏦 Transfer to Coinbase...'); }
    
    showQRCode() { 
        console.log('📱 Showing QR code...');
        try {
            const qrModal = document.getElementById('qrModal');
            if (qrModal) {
                qrModal.style.display = 'flex';
            }
        } catch (error) {
            console.error('❌ Show QR error:', error);
        }
    }
    
    hideQRCode() { 
        console.log('📱 Hiding QR code...');
        try {
            const qrModal = document.getElementById('qrModal');
            if (qrModal) {
                qrModal.style.display = 'none';
            }
        } catch (error) {
            console.error('❌ Hide QR error:', error);
        }
    }

    openCoinbaseWallet() { console.log('🏦 Opening Coinbase...'); }
    filterVault(filter) { console.log('🔍 Filtering vault:', filter); }
}

// Initialize the app
window.addEventListener('load', () => {
    console.log('🔥💎 Vault Phoenix loading...');
    try {
        const app = new VaultPhoenixCryptoGame();
        
        // Check existing session for auto-redirect
        const session = sessionStorage.getItem('vaultPhoenixSession');
        if (session && (window.location.pathname.includes('index') || window.location.pathname === '/' || window.location.pathname.endsWith('crypto-game/'))) {
            try {
                const sessionData = JSON.parse(session);
                const loginTime = new Date(sessionData.loginTime);
                const now = new Date();
                const hoursDiff = (now - loginTime) / (1000 * 60 * 60);
                
                if (hoursDiff < 24) {
                    console.log('🔄 Auto-redirecting to dashboard...');
                    window.location.href = 'dashboard.html';
                }
            } catch (error) {
                console.error('Session validation error:', error);
                sessionStorage.removeItem('vaultPhoenixSession');
            }
        }
        
    } catch (error) {
        console.error('💥 Failed to initialize Vault Phoenix:', error);
        document.body.innerHTML = `
            <div style="
                display: flex;
                align-items: center;
                justify-content: center;
                height: 100vh;
                background: linear-gradient(135deg, #0f0f0f, #1a1a1a, #2d1810, #451a03);
                color: white;
                text-align: center;
                padding: 20px;
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            ">
                <div>
                    <h2 style="color: #f0a500; margin-bottom: 16px;">🔥 Vault Phoenix</h2>
                    <p style="margin-bottom: 24px; opacity: 0.8;">Something went wrong during initialization.</p>
                    <button onclick="window.location.reload()" style="
                        background: linear-gradient(135deg, #f0a500, #fb923c);
                        color: white;
                        border: none;
                        padding: 16px 32px;
                        border-radius: 12px;
                        cursor: pointer;
                        font-size: 16px;
                        font-weight: 600;
                    ">
                        Try Again
                    </button>
                </div>
            </div>
        `;
    }
});

// Add loading spinner styles
const style = document.createElement('style');
style.textContent = `
    .loading-spinner {
        display: inline-block;
        width: 16px;
        height: 16px;
        border: 2px solid rgba(255, 255, 255, 0.3);
        border-radius: 50%;
        border-top-color: #fff;
        animation: spin 1s ease-in-out infinite;
        margin-right: 8px;
    }
    
    @keyframes spin {
        to { transform: rotate(360deg); }
    }
    
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        10%, 30%, 50%, 70%, 90% { transform: translateX(-3px); }
        20%, 40%, 60%, 80% { transform: translateX(3px); }
    }
`;
document.head.appendChild(style);

// Console welcome message
console.log('%c🔥💎 VAULT PHOENIX - AR CRYPTO GAMING REVOLUTION', 'color: #f0a500; font-size: 24px; font-weight: bold; text-shadow: 2px 2px 4px rgba(0,0,0,0.3);');
console.log('%c🚀 Revolutionary AR gaming that lets you collect real $Ember tokens', 'color: #fb923c; font-size: 14px; font-weight: bold;');
console.log('%c📧 Contact: contact@vaultphoenix.com', 'color: #374151; font-size: 14px;');
console.log('%c🔥💎 From ashes to crypto greatness - Phoenix Rising!', 'color: #d73327; font-size: 12px; font-style: italic;');
