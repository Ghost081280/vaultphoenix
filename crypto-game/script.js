// Vault Phoenix AR Crypto Gaming - COMPLETE ISOLATED JAVASCRIPT
// PROTECTION: Only affects crypto-game/ folder - prevents main site interference
// FILE PATH: crypto-game/script.js

console.log('🔥💎 Vault Phoenix Crypto Game JavaScript Loading...');

// IMMEDIATE PROTECTION - CHECK IF THIS IS A CRYPTO GAME PAGE
(function() {
    const cryptoFlag = document.getElementById('cryptoGameFlag');
    const isCryptoPage = cryptoFlag || 
                        document.body.classList.contains('crypto-login-page') || 
                        document.body.classList.contains('crypto-dashboard-page') ||
                        window.location.pathname.includes('crypto-game') ||
                        document.title.includes('Vault Phoenix');
    
    if (!isCryptoPage) {
        console.log('🚫 Not a crypto game page - blocking JavaScript execution');
        return;
    }
    
    window.isVaultPhoenixCryptoGame = true;
    console.log('🔥💎 Crypto Game JavaScript ACTIVE - Page confirmed');
    
    // Force apply login page class if we detect login elements
    if (document.getElementById('loginForm') && !document.body.classList.contains('crypto-login-page')) {
        document.body.classList.add('crypto-login-page');
        console.log('🔧 Applied crypto-login-page class');
    }
    
    // Force apply dashboard page class if we detect dashboard elements
    if (document.getElementById('container') && !document.body.classList.contains('crypto-dashboard-page')) {
        document.body.classList.add('crypto-dashboard-page');
        console.log('🔧 Applied crypto-dashboard-page class');
    }
})();

// ONLY RUN IF THIS IS A CRYPTO GAME PAGE
if (window.isVaultPhoenixCryptoGame) {

    class VaultPhoenixCryptoGame {
        constructor() {
            console.log('🔥💎 Vault Phoenix initializing...');
            
            // Initialize all properties safely
            this.userLat = 33.4484; // Phoenix, AZ default
            this.userLng = -112.0740;
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
            this.currentNavigationToken = null;
            this.proximityCheckInterval = null;
            this.isShowingSponsorDetails = false;
            this.googleMapsLoaded = false;
            this.locationsVisited = 0;
            this.lastActivityTime = null;
            this.welcomeShown = false;
            this.availableTokensCount = 12; // Total tokens available in campaign
            this.orientationHandler = null;
            this.currentUser = null;

            // Enhanced Ember Token System with Real Locations and Value Tiers
            this.emberTokens = [
                { id: 1, value: 500, tier: "high", location: "Downtown Phoenix", lat: 33.4484, lng: -112.0740, sponsor: "Phoenix Suns Arena", message: "Exclusive courtside experience awaits!", description: "Experience the thrill of NBA basketball with exclusive courtside seats, VIP dining, and behind-the-scenes arena tours." },
                { id: 2, value: 250, tier: "medium", location: "Scottsdale Quarter", lat: 33.4942, lng: -111.9261, sponsor: "Scottsdale Fashion Square", message: "Premium shopping rewards unlocked!", description: "Discover luxury shopping with exclusive discounts and VIP personal shopping services." },
                { id: 3, value: 100, tier: "low", location: "Tempe Town Lake", lat: 33.4255, lng: -111.9400, sponsor: "Local Coffee Co.", message: "Free coffee for early hunters!", description: "Enjoy artisanal coffee and cozy workspace with special $Ember holder benefits." },
                { id: 4, value: 150, tier: "medium", location: "Old Town Scottsdale", lat: 33.4942, lng: -111.9261, sponsor: "Arizona Bike Tours", message: "Adventure awaits in the desert!", description: "Explore the Sonoran Desert with guided tours and premium bike rentals." },
                { id: 5, value: 300, tier: "medium", location: "Arizona State University", lat: 33.4194, lng: -111.9339, sponsor: "ASU Bookstore", message: "Student discounts and exclusive gear!", description: "Access student resources and exclusive Sun Devil merchandise." },
                { id: 6, value: 75, tier: "low", location: "Phoenix Sky Harbor", lat: 33.4343, lng: -112.0116, sponsor: "Sky Harbor Shops", message: "Travel rewards for your next adventure!", description: "Unlock travel perks and duty-free shopping benefits." },
                { id: 7, value: 200, tier: "medium", location: "Camelback Mountain", lat: 33.5186, lng: -111.9717, sponsor: "Desert Hiking Gear", message: "Gear up for your next hike!", description: "Professional hiking equipment and guided desert expedition packages." },
                { id: 8, value: 50, tier: "low", location: "Desert Botanical Garden", lat: 33.4619, lng: -111.9463, sponsor: "Garden Cafe", message: "Nature-inspired dining experience!", description: "Farm-to-table dining surrounded by stunning desert flora." },
                { id: 9, value: 125, tier: "low", location: "Roosevelt Row", lat: 33.4524, lng: -112.0708, sponsor: "Local Art Gallery", message: "Support local artists and creators!", description: "Discover emerging artists and exclusive art collection access." },
                { id: 10, value: 400, tier: "high", location: "Chase Field", lat: 33.4453, lng: -112.0667, sponsor: "Arizona Diamondbacks", message: "Baseball season tickets await!", description: "Premium baseball experiences with season ticket perks and dugout tours." },
                { id: 11, value: 90, tier: "low", location: "Papago Park", lat: 33.4551, lng: -111.9511, sponsor: "Park Recreation Center", message: "Family fun activities included!", description: "Family-friendly activities and recreational programs for all ages." },
                { id: 12, value: 175, tier: "medium", location: "Biltmore Fashion Park", lat: 33.5117, lng: -112.0736, sponsor: "Luxury Boutiques", message: "Exclusive fashion rewards!", description: "High-end fashion with personal styling services and exclusive previews." }
            ];

            // Themed Adventure Campaigns for Marketers
            this.themedAdventures = [
                {
                    id: 'phoenix-sports',
                    name: 'Phoenix Sports Trail',
                    description: 'Follow the championship path',
                    icon: '🏀',
                    active: true,
                    progress: 3,
                    total: 5,
                    bonus: '+50% $Ember Bonus',
                    rewards: ['VIP Access', 'Season Tickets'],
                    locations: [1, 10, 5], // Token IDs in this adventure
                    completed: false
                },
                {
                    id: 'desert-discovery',
                    name: 'Desert Discovery',
                    description: 'Explore Arizona\'s natural wonders',
                    icon: '🌵',
                    active: false,
                    progress: 0,
                    total: 5,
                    bonus: 'Free Gear',
                    rewards: ['Hiking Equipment', 'Guided Tours'],
                    locations: [7, 8, 11, 6, 3],
                    completed: false
                },
                {
                    id: 'foodie-trail',
                    name: 'Foodie Trail',
                    description: 'Taste Phoenix\'s culinary scene',
                    icon: '🍴',
                    active: false,
                    progress: 0,
                    total: 8,
                    bonus: '2x Dining Rewards',
                    rewards: ['Free Meals', 'Chef Experiences'],
                    locations: [3, 8, 2, 4, 9, 12],
                    completed: false
                }
            ];

            // Initialize when DOM is ready
            if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', () => this.init());
            } else {
                this.init();
            }
            
            // Make globally accessible
            window.vaultPhoenixApp = this;
        }

        init() {
            console.log('🔧 Initializing Vault Phoenix...');
            try {
                if (document.getElementById('loginForm')) {
                    this.setupLoginListeners();
                    console.log('✅ Login page initialized');
                } else if (document.getElementById('container')) {
                    this.ensureSession();
                    this.loadUserInfo();
                    this.loadCollectedTokens();
                    this.setupEventListeners();
                    this.initializeVault();
                    this.initializeCampaigns();
                    this.addHapticFeedback();
                    this.showWelcomeScreen(); // Show welcome screen first
                    document.body.classList.add('crypto-dashboard-page');
                    console.log('✅ Dashboard initialized');
                }
            } catch (error) {
                console.error('❌ Initialization error:', error);
                this.collectedTokens = [];
                this.totalTokenValue = 0;
                this.updateVaultStats();
            }
        }

        // WELCOME SCREEN SYSTEM
        showWelcomeScreen() {
            console.log('👋 Showing welcome screen...');
            try {
                const welcomeBtn = document.getElementById('welcomeBtn');
                const container = document.getElementById('container');
                
                if (!welcomeBtn || this.welcomeShown) return;
                
                // Disable navigation during welcome
                if (container) container.classList.add('welcome-active');
                
                // Show welcome button
                welcomeBtn.style.display = 'flex';
                
                // Start loading animation
                this.startWelcomeLoading();
                
                this.welcomeShown = true;
                
            } catch (error) {
                console.error('❌ Welcome screen error:', error);
                this.hideWelcomeScreen();
            }
        }

        startWelcomeLoading() {
            try {
                const loadingFill = document.getElementById('welcomeLoadingFill');
                const loadingText = document.getElementById('welcomeLoadingText');
                
                const loadingMessages = [
                    'Loading Game...',
                    'Connecting to Phoenix...',
                    'Initializing AR System...',
                    'Preparing Token Hunt...',
                    'Ready to Hunt!'
                ];
                
                let currentMessage = 0;
                let progress = 0;
                
                const loadingInterval = setInterval(() => {
                    progress += Math.random() * 15 + 5; // Random progress between 5-20%
                    
                    if (progress >= 100) {
                        progress = 100;
                        if (loadingFill) loadingFill.style.width = '100%';
                        if (loadingText) loadingText.textContent = loadingMessages[4];
                        
                        clearInterval(loadingInterval);
                        
                        // Hide welcome screen after completion
                        setTimeout(() => {
                            this.hideWelcomeScreen();
                        }, 800);
                        
                    } else {
                        if (loadingFill) loadingFill.style.width = `${progress}%`;
                        
                        // Update loading message
                        if (progress > currentMessage * 20 && currentMessage < 4) {
                            currentMessage++;
                            if (loadingText) loadingText.textContent = loadingMessages[currentMessage];
                        }
                    }
                }, 200);
                
            } catch (error) {
                console.error('❌ Welcome loading error:', error);
                this.hideWelcomeScreen();
            }
        }

        hideWelcomeScreen() {
            console.log('👋 Hiding welcome screen...');
            try {
                const welcomeBtn = document.getElementById('welcomeBtn');
                const container = document.getElementById('container');
                
                if (welcomeBtn) {
                    welcomeBtn.style.display = 'none';
                }
                
                // Re-enable navigation
                if (container) container.classList.remove('welcome-active');
                
                // Auto-start the game
                this.autoStartGame();
                
            } catch (error) {
                console.error('❌ Welcome screen hide error:', error);
            }
        }

        autoStartGame() {
            console.log('🚀 Auto-starting game...');
            try {
                // Initialize game systems
                this.start();
                
                // Update available tokens count
                this.updateAvailableTokensCount();
                
            } catch (error) {
                console.error('❌ Auto-start error:', error);
            }
        }

        updateAvailableTokensCount() {
            try {
                // Calculate uncollected tokens
                const collectedTokenIds = this.collectedTokens.map(token => token.id);
                const uncollectedTokens = this.emberTokens.filter(token => !collectedTokenIds.includes(token.id));
                this.availableTokensCount = uncollectedTokens.length;
                
                const availableTokensEl = document.getElementById('availableTokens');
                if (availableTokensEl) {
                    availableTokensEl.textContent = `${this.availableTokensCount} Available`;
                }
                
                console.log('📊 Available tokens updated:', this.availableTokensCount);
            } catch (error) {
                console.error('❌ Available tokens update error:', error);
            }
        }

        // LOGIN SYSTEM
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
                    input.style.boxShadow = '0 0 0 3px rgba(76, 175, 80, 0.2)';
                } else {
                    input.style.borderColor = '#f44336';
                    input.style.boxShadow = '0 0 0 3px rgba(244, 67, 54, 0.2)';
                }
            } else {
                input.style.borderColor = 'rgba(240, 165, 0, 0.3)';
                input.style.boxShadow = 'none';
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
                
                if (loginText) loginText.innerHTML = '✅ Access Granted!';
                if (loginBtn) loginBtn.style.background = 'linear-gradient(135deg, #4CAF50, #45a049)';
                
                this.showSuccess('Login successful! Launching AR $Ember Hunt...');
                
                this.storeSession(email);
                
                setTimeout(() => {
                    window.location.href = 'dashboard.html';
                }, 1500);

            } catch (error) {
                if (loginBtn) loginBtn.style.transform = 'scale(1)';
                if (loginText) loginText.innerHTML = '<span class="login-main-text"><img src="../images/VPEmberFlame.svg" alt="Ember Flame" class="login-flame-icon" onerror="this.textContent=\'🔥\'">Start $Ember Hunt</span><span class="login-sub-text">Begin Your Adventure</span>';
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

        // DASHBOARD SYSTEM
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
                    this.calculateStats();
                    console.log('✅ Loaded', this.collectedTokens.length, 'tokens worth', this.totalTokenValue, '$Ember');
                } else {
                    this.collectedTokens = [];
                    this.totalTokenValue = 0;
                    this.locationsVisited = 0;
                    this.lastActivityTime = null;
                    console.log('📦 No saved tokens, starting fresh vault');
                }
            } catch (error) {
                console.error('❌ Token loading error:', error);
                this.collectedTokens = [];
                this.totalTokenValue = 0;
                this.locationsVisited = 0;
            }
            this.updateVaultStats();
            this.updateAvailableTokensCount();
        }

        saveCollectedTokens() {
            try {
                localStorage.setItem('vaultPhoenixTokens', JSON.stringify(this.collectedTokens));
                this.calculateTotalValue();
                this.calculateStats();
                this.updateVaultStats();
                this.updateAvailableTokensCount();
                console.log('💾 Tokens saved:', this.collectedTokens.length, 'worth', this.totalTokenValue, '$Ember');
            } catch (error) {
                console.error('❌ Token saving error:', error);
            }
        }

        calculateTotalValue() {
            this.totalTokenValue = this.collectedTokens.reduce((total, token) => total + token.value, 0);
        }

        calculateStats() {
            const uniqueLocations = new Set(this.collectedTokens.map(token => token.location));
            this.locationsVisited = uniqueLocations.size;
            
            if (this.collectedTokens.length > 0) {
                const lastToken = this.collectedTokens[this.collectedTokens.length - 1];
                this.lastActivityTime = lastToken.collectedAt ? new Date(lastToken.collectedAt) : new Date();
            }
        }

        updateVaultStats() {
            try {
                const elements = {
                    emberCount: document.getElementById('emberCount'),
                    navEmberCount: document.getElementById('navEmberCount'),
                    menuEmberCount: document.getElementById('menuEmberCount'),
                    vaultBalance: document.getElementById('vaultBalance'),
                    vaultUsdValue: document.getElementById('vaultUsdValue'),
                    qrTokenAmount: document.getElementById('qrTokenAmount'),
                    qrTokenValue: document.getElementById('qrTokenValue'),
                    totalCollected: document.getElementById('totalCollected'),
                    locationsVisited: document.getElementById('locationsVisited'),
                    totalValue: document.getElementById('totalValue'),
                    lastActivity: document.getElementById('lastActivity')
                };
                
                const usdValue = (this.totalTokenValue * 0.001).toFixed(2);
                
                if (elements.emberCount) elements.emberCount.textContent = `${this.totalTokenValue} $Ember`;
                if (elements.navEmberCount) elements.navEmberCount.textContent = this.totalTokenValue;
                if (elements.menuEmberCount) elements.menuEmberCount.textContent = this.totalTokenValue;
                if (elements.vaultBalance) elements.vaultBalance.textContent = `${this.totalTokenValue} $Ember Tokens`;
                if (elements.vaultUsdValue) elements.vaultUsdValue.textContent = `${usdValue} USD`;
                if (elements.qrTokenAmount) elements.qrTokenAmount.textContent = `${this.totalTokenValue} $Ember`;
                if (elements.qrTokenValue) elements.qrTokenValue.textContent = `${usdValue} USD`;
                if (elements.totalCollected) elements.totalCollected.textContent = this.collectedTokens.length;
                if (elements.locationsVisited) elements.locationsVisited.textContent = this.locationsVisited;
                if (elements.totalValue) elements.totalValue.textContent = `${usdValue}`;
                if (elements.lastActivity) {
                    if (this.lastActivityTime) {
                        const timeAgo = this.getTimeAgo(this.lastActivityTime);
                        elements.lastActivity.textContent = timeAgo;
                    } else {
                        elements.lastActivity.textContent = 'Never';
                    }
                }
                
            } catch (error) {
                console.error('❌ Stats update error:', error);
            }
        }

        getTimeAgo(date) {
            const now = new Date();
            const diffTime = Math.abs(now - date);
            const diffMinutes = Math.ceil(diffTime / (1000 * 60));
            const diffHours = Math.ceil(diffTime / (1000 * 60 * 60));
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

            if (diffMinutes < 60) return `${diffMinutes}m ago`;
            if (diffHours < 24) return `${diffHours}h ago`;
            return `${diffDays}d ago`;
        }

        setupEventListeners() {
            console.log('🎧 Setting up event listeners...');
            try {
                const handlers = [
                    { id: 'homeBtn', event: 'click', handler: () => this.goHome() },
                    { id: 'menuToggle', event: 'click', handler: () => this.toggleMenu() },
                    { id: 'menuOverlay', event: 'click', handler: () => this.closeMenu() },
                    { id: 'sideMenuLogout', event: 'click', handler: () => this.showLogoutConfirmation() },
                    { id: 'collectTokenBtn', event: 'click', handler: () => this.collectToken() },
                    { id: 'sponsorInfoBtn', event: 'click', handler: () => this.showSponsorDetails() },
                    { id: 'sponsorBackBtn', event: 'click', handler: () => this.hideSponsorDetails() },
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
                    { id: 'redeemTokens', event: 'click', handler: () => this.showQRCode() },
                    { id: 'proximityARButton', event: 'click', handler: () => this.switchMode('ar') }
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

                // Adventure cards
                document.querySelectorAll('.adventure-start-btn').forEach(btn => {
                    btn.addEventListener('click', (e) => {
                        const card = e.target.closest('.adventure-card');
                        if (card) {
                            this.startAdventure(card.dataset.adventure);
                        }
                    });
                });

                console.log('✅ Event listeners setup complete');
            } catch (error) {
                console.error('❌ Event listener error:', error);
            }
        }

        initializeVault() {
            console.log('💎 Initializing vault...');
            try {
                this.generateTokenHistory();
            } catch (error) {
                console.error('❌ Vault initialization error:', error);
            }
        }

        initializeCampaigns() {
            console.log('🏆 Initializing campaigns...');
            try {
                this.updateCampaignDisplay();
            } catch (error) {
                console.error('❌ Campaign initialization error:', error);
            }
        }

        generateTokenHistory() {
            const historyContainer = document.getElementById('tokenHistory');
            if (!historyContainer) return;

            historyContainer.innerHTML = '';

            if (this.collectedTokens.length === 0) {
                // Add demo history items
                const demoHistory = [
                    { name: 'Welcome Bonus', value: 50, location: 'Vault Phoenix HQ', timestamp: new Date(Date.now() - 86400000), tier: 'low' },
                    { name: 'Tutorial Complete', value: 25, location: 'Getting Started', timestamp: new Date(Date.now() - 172800000), tier: 'low' }
                ];

                demoHistory.forEach(item => {
                    const historyItem = this.createHistoryItem(item);
                    historyContainer.appendChild(historyItem);
                });
            } else {
                // Show actual collected tokens
                const sortedTokens = [...this.collectedTokens].reverse();
                sortedTokens.forEach(token => {
                    const historyItem = this.createHistoryItem(token);
                    historyContainer.appendChild(historyItem);
                });
            }
        }

        createHistoryItem(item) {
            const historyItem = document.createElement('div');
            historyItem.className = 'history-item';
            
            const tierClass = item.tier || 'low';
            const timestamp = item.timestamp || (item.collectedAt ? new Date(item.collectedAt) : new Date());
            
            historyItem.innerHTML = `
                <div class="history-icon"></div>
                <div class="history-details">
                    <div class="history-title">${item.name || item.location}</div>
                    <div class="history-subtitle">${item.location} • ${this.formatDate(timestamp)} • ${tierClass.toUpperCase()}</div>
                </div>
                <div class="history-value">+${item.value}</div>
            `;
            
            return historyItem;
        }

        formatDate(date) {
            const now = new Date();
            const diffTime = Math.abs(now - date);
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            
            if (diffDays === 1) return 'Yesterday';
            if (diffDays < 7) return `${diffDays} days ago`;
            return date.toLocaleDateString();
        }

        updateCampaignDisplay() {
            console.log('📈 Campaign display updated');
            
            // Update adventure cards with current progress
            this.themedAdventures.forEach(adventure => {
                const card = document.querySelector(`[data-adventure="${adventure.id}"]`);
                if (card) {
                    const progressFill = card.querySelector('.progress-fill');
                    const progressText = card.querySelector('.progress-text');
                    
                    if (progressFill) {
                        const progressPercent = (adventure.progress / adventure.total) * 100;
                        progressFill.style.width = `${progressPercent}%`;
                    }
                    
                    if (progressText) {
                        progressText.textContent = `${adventure.progress} of ${adventure.total} locations visited`;
                    }
                }
            });
        }

        startAdventure(adventureId) {
            console.log('🚀 Starting adventure:', adventureId);
            
            const adventure = this.themedAdventures.find(a => a.id === adventureId);
            if (!adventure) return;

            // Mark adventure as active
            this.themedAdventures.forEach(a => a.active = false);
            adventure.active = true;
            
            // Update UI
            this.updateCampaignDisplay();
            
            // Show adventure tokens on map
            this.switchMode('map');
            
            // Provide haptic feedback
            if (navigator.vibrate) {
                navigator.vibrate(50);
            }
            
            this.updateStatus(`Started ${adventure.name} adventure!`, false);
            
            setTimeout(() => {
                alert(`🎯 ${adventure.name} activated!\n\nExplore ${adventure.total} themed locations to earn ${adventure.bonus} and unlock exclusive rewards!`);
            }, 500);
        }

        addHapticFeedback() {
            try {
                const interactiveElements = document.querySelectorAll('.nav-tab, .token-action-btn, .vault-action-btn, .filter-btn, .menu-item, .ar-ember-coin, .token-history-item, .adventure-start-btn, .proximity-button');
                
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

        // GAME MECHANICS
        async start() {
            if (this.isStarted) return;
            this.isStarted = true;

            console.log('🚀 Starting Vault Phoenix...');
            
            this.showLoading(true);
            
            try {
                await this.setupGPS();
                this.setupThreeJS();
                this.generateTokenLocations();
                await this.initializeCompass();
                this.startProximityCheck();
                
                this.updateStatus("Ready! Start hunting for $Ember tokens!", false);
                this.showLoading(false);
                
                console.log('✅ Vault Phoenix started successfully');
            } catch (error) {
                console.error('❌ Start error:', error);
                this.updateStatus(`Error: ${error.message}`, true);
                this.showLoading(false);
            }
        }

        async setupGPS() {
            return new Promise((resolve, reject) => {
                if (!navigator.geolocation) {
                    reject(new Error("Geolocation not supported"));
                    return;
                }

                const options = {
                    enableHighAccuracy: true,
                    timeout: 10000,
                    maximumAge: 60000
                };

                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        this.userLat = position.coords.latitude;
                        this.userLng = position.coords.longitude;
                        
                        const latEl = document.getElementById('lat');
                        const lngEl = document.getElementById('lng');
                        
                        if (latEl) latEl.textContent = this.userLat.toFixed(4);
                        if (lngEl) lngEl.textContent = this.userLng.toFixed(4);
                        
                        navigator.geolocation.watchPosition(
                            (pos) => this.updatePosition(pos),
                            (error) => console.warn("GPS update error:", error),
                            options
                        );
                        
                        this.updateEnhancedMap();
                        resolve();
                    },
                    (error) => {
                        // Use Phoenix, AZ as fallback for demo
                        this.userLat = 33.4484;
                        this.userLng = -112.0740;
                        console.log('📍 Using Phoenix, AZ for demo');
                        this.updateEnhancedMap();
                        resolve();
                    },
                    options
                );
            });
        }

        setupThreeJS() {
            try {
                const canvas = document.getElementById('canvas');
                if (!canvas) throw new Error('Canvas element not found');
                
                this.scene = new THREE.Scene();
                
                this.camera = new THREE.PerspectiveCamera(
                    75, 
                    window.innerWidth / window.innerHeight, 
                    0.1, 
                    1000
                );
                
                this.renderer = new THREE.WebGLRenderer({ 
                    canvas: canvas, 
                    alpha: true 
                });
                this.renderer.setSize(window.innerWidth, window.innerHeight);
                this.renderer.setClearColor(0x000000, 0);

                const ambientLight = new THREE.AmbientLight(0x404040, 0.6);
                this.scene.add(ambientLight);
                
                const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
                directionalLight.position.set(0, 1, 0);
                this.scene.add(directionalLight);

                window.addEventListener('resize', () => this.onWindowResize());
                
                console.log('✅ Three.js setup complete');
            } catch (error) {
                console.error('❌ Three.js setup error:', error);
                throw error;
            }
        }

        generateTokenLocations() {
            try {
                // Use the pre-defined Phoenix locations
                this.tokenLocations = [...this.emberTokens];
                console.log('🗺️ Generated', this.tokenLocations.length, 'token locations');
            } catch (error) {
                console.error('❌ Token location generation error:', error);
            }
        }

        async initializeCompass() {
            console.log('🧭 Initializing compass...');
            
            if (location.protocol !== 'https:' && location.hostname !== 'localhost') {
                console.log('⚠️ HTTPS required for device orientation');
                this.setupFallbackCompass();
                return;
            }

            if (!window.DeviceOrientationEvent) {
                console.log('❌ Device orientation not supported');
                this.setupFallbackCompass();
                return;
            }

            try {
                if (typeof DeviceOrientationEvent.requestPermission === 'function') {
                    console.log('📱 iOS device detected - will request compass permission when needed');
                    this.setupFallbackCompass();
                } else {
                    console.log('🔧 Setting up orientation listener');
                    this.setupOrientationListener();
                    
                    setTimeout(() => {
                        if (!this.hasReceivedOrientationData) {
                            console.log('⚠️ No compass data received, using fallback');
                            this.setupFallbackCompass();
                        }
                    }, 2000);
                }
            } catch (error) {
                console.error('❌ Compass initialization error:', error);
                this.setupFallbackCompass();
            }
        }

        setupFallbackCompass() {
            console.log('🎮 Starting fallback compass for demo');
            
            if (this.compassInterval) {
                clearInterval(this.compassInterval);
            }
            
            this.isCompassActive = true;
            this.updateStatus('Compass active', false);
            
            let targetHeading = Math.random() * 360;
            let currentHeading = 0;
            const smoothingFactor = 0.1;
            
            this.compassInterval = setInterval(() => {
                if (Math.random() < 0.01) {
                    targetHeading = Math.random() * 360;
                }
                
                let diff = targetHeading - currentHeading;
                if (diff > 180) diff -= 360;
                if (diff < -180) diff += 360;
                
                currentHeading += diff * smoothingFactor;
                if (currentHeading < 0) currentHeading += 360;
                if (currentHeading >= 360) currentHeading -= 360;
                
                this.heading = Math.round(currentHeading);
                this.updateCompass(this.heading);
                
            }, 50);
        }

        setupOrientationListener() {
            console.log('🎯 Setting up real orientation listener...');
            
            if (this.isCompassActive) return;
            this.isCompassActive = true;
            
            const handleOrientation = (event) => {
                try {
                    let heading = null;
                    
                    if (event.webkitCompassHeading !== undefined && event.webkitCompassHeading !== null) {
                        heading = event.webkitCompassHeading;
                        this.hasReceivedOrientationData = true;
                    } else if (event.alpha !== null && event.alpha !== undefined) {
                        heading = 360 - event.alpha;
                        this.hasReceivedOrientationData = true;
                    }
                    
                    if (heading !== null && !isNaN(heading)) {
                        this.heading = Math.round(heading);
                        this.updateCompass(this.heading);
                    }
                } catch (error) {
                    console.error('❌ Orientation event error:', error);
                }
            };

            window.addEventListener('deviceorientation', handleOrientation, true);
            this.orientationHandler = handleOrientation;
        }

        updateCompass(heading) {
            try {
                const needle = document.getElementById('compassNeedle');
                if (needle) {
                    needle.style.transform = `translate(-50%, -50%) rotate(${heading}deg)`;
                }

                const headingElement = document.getElementById('heading');
                if (headingElement) {
                    headingElement.textContent = heading;
                }
            } catch (error) {
                console.error('❌ Compass update error:', error);
            }
        }

        // PROXIMITY DETECTION SYSTEM
        startProximityCheck() {
            console.log('📡 Starting proximity detection...');
            
            if (this.proximityCheckInterval) {
                clearInterval(this.proximityCheckInterval);
            }
            
            this.proximityCheckInterval = setInterval(() => {
                this.checkTokenProximity();
            }, 5000); // Check every 5 seconds
        }

        checkTokenProximity() {
            if (!this.userLat || !this.userLng || this.currentMode === 'ar') return;
            
            const proximityRadius = 0.1; // miles - very close for demo
            
            for (const token of this.emberTokens) {
                if (this.isTokenCollected(token.id)) continue;
                
                const distance = this.calculateDistance(
                    this.userLat, this.userLng,
                    token.lat, token.lng
                );
                
                if (distance <= proximityRadius) {
                    this.showProximityNotification(token);
                    break; // Show only one notification at a time
                }
            }
        }

        isTokenCollected(tokenId) {
            return this.collectedTokens.some(token => token.id === tokenId);
        }

        showProximityNotification(token) {
            const notification = document.getElementById('proximityNotification');
            if (!notification || notification.classList.contains('show')) return;
            
            const title = notification.querySelector('.proximity-title');
            const subtitle = notification.querySelector('.proximity-subtitle');
            
            if (title) title.textContent = '$Ember Token Detected!';
            if (subtitle) subtitle.textContent = `${token.location} - ${token.value} $Ember nearby`;
            
            notification.classList.add('show');
            
            // Auto-hide after 10 seconds
            setTimeout(() => {
                this.hideProximityNotification();
            }, 10000);
            
            // Haptic feedback
            if (navigator.vibrate) {
                navigator.vibrate([200, 100, 200]);
            }
            
            console.log('📍 Proximity notification shown for:', token.location);
        }

        hideProximityNotification() {
            const notification = document.getElementById('proximityNotification');
            if (notification) {
                notification.classList.remove('show');
            }
        }

        // AR SYSTEM
        async switchToAR() {
            console.log('📱 Switching to AR mode');
            try {
                document.getElementById('map').style.display = 'none';
                document.getElementById('video').style.display = 'block';
                document.getElementById('canvas').style.display = 'block';
                document.getElementById('vaultView').style.display = 'none';
                document.getElementById('campaignsView').style.display = 'none';
                
                this.hideProximityNotification();
                
                try {
                    const permissions = await this.requestDevicePermissions();
                    console.log('📷🧭 Device permissions:', permissions);
                    
                    if (permissions.camera) {
                        this.updateStatus('AR mode active - camera ready!', false);
                    }
                    
                } catch (error) {
                    console.error('❌ Device permissions failed:', error);
                    this.updateStatus('❌ Camera access required for AR mode', true);
                    return;
                }
                
                this.showARInstructions();
                
                setTimeout(() => {
                    if (this.currentMode === 'ar') {
                        this.showTappableEmberCoin();
                    }
                }, 3000);
                
                if (!this.animationStarted) {
                    this.animate();
                    this.animationStarted = true;
                }
            } catch (error) {
                console.error('❌ AR switch error:', error);
            }
        }

        async requestDevicePermissions() {
            const permissions = {
                camera: false,
                compass: false
            };

            try {
                const video = document.getElementById('video');
                if (!video) throw new Error('Video element not found');
                
                const constraints = {
                    video: {
                        facingMode: 'environment',
                        width: { ideal: 1280 },
                        height: { ideal: 720 }
                    }
                };

                this.cameraStream = await navigator.mediaDevices.getUserMedia(constraints);
                video.srcObject = this.cameraStream;
                permissions.camera = true;
                console.log('📷 Camera permission granted');

                await new Promise((resolve) => {
                    video.onloadedmetadata = () => {
                        video.play();
                        resolve();
                    };
                });

                if (typeof DeviceOrientationEvent.requestPermission === 'function') {
                    try {
                        const compassPermission = await DeviceOrientationEvent.requestPermission();
                        if (compassPermission === 'granted') {
                            permissions.compass = true;
                            this.setupOrientationListener();
                            console.log('🧭 Compass permission granted');
                        } else {
                            console.log('❌ Compass permission denied, using fallback');
                            this.setupFallbackCompass();
                        }
                    } catch (compassError) {
                        console.log('⚠️ Compass permission request failed, using fallback');
                        this.setupFallbackCompass();
                    }
                } else {
                    if (!this.isCompassActive) {
                        this.setupOrientationListener();
                    }
                    permissions.compass = true;
                }

                return permissions;

            } catch (error) {
                console.error('❌ Device permissions error:', error);
                throw new Error('Camera access denied or not available');
            }
        }

        showARInstructions() {
            try {
                const instructions = document.getElementById('arInstructions');
                if (instructions) {
                    instructions.classList.add('show');
                    
                    setTimeout(() => {
                        this.hideARInstructions();
                    }, 5000);
                }
            } catch (error) {
                console.error('❌ AR instructions error:', error);
            }
        }

        hideARInstructions() {
            try {
                const instructions = document.getElementById('arInstructions');
                if (instructions) {
                    instructions.classList.remove('show');
                }
            } catch (error) {
                console.error('❌ AR instructions hide error:', error);
            }
        }

        showTappableEmberCoin() {
            try {
                const emberCoin = document.getElementById('arEmberCoin');
                if (emberCoin && this.currentMode === 'ar') {
                    emberCoin.style.display = 'block';
                    emberCoin.classList.add('tappable');
                    console.log('💎 Ember coin shown in AR');
                }
            } catch (error) {
                console.error('❌ Ember coin show error:', error);
            }
        }

        hideEmberCoin() {
            try {
                const emberCoin = document.getElementById('arEmberCoin');
                if (emberCoin) {
                    emberCoin.style.display = 'none';
                    emberCoin.classList.remove('tappable');
                }
            } catch (error) {
                console.error('❌ Ember coin hide error:', error);
            }
        }

        onEmberCoinClick() {
            console.log('💎 Ember coin clicked!');
            try {
                const emberCoin = document.getElementById('arEmberCoin');
                
                if (emberCoin) {
                    emberCoin.style.transform = 'translate(-50%, -50%) scale(0)';
                    emberCoin.classList.remove('tappable');
                    
                    setTimeout(() => {
                        emberCoin.style.display = 'none';
                        emberCoin.style.transform = 'translate(-50%, -50%) scale(1)';
                    }, 300);
                }
                
                if (navigator.vibrate) {
                    navigator.vibrate(50);
                }
                
                this.collectRandomToken();
                
            } catch (error) {
                console.error('❌ Ember coin click error:', error);
            }
        }

        collectRandomToken() {
            try {
                const availableTokens = this.emberTokens.filter(token => 
                    !this.collectedTokens.some(collected => collected.id === token.id)
                );
                
                const tokenPool = availableTokens.length > 0 ? availableTokens : this.emberTokens;
                const randomToken = tokenPool[Math.floor(Math.random() * tokenPool.length)];
                
                this.showTokenDiscovery(randomToken);
                console.log('🎴 Random token shown:', randomToken.location);
            } catch (error) {
                console.error('❌ Random token error:', error);
            }
        }

        showTokenDiscovery(token) {
            try {
                const elements = {
                    amount: document.getElementById('discoveredTokenAmount'),
                    usdValue: document.getElementById('discoveredTokenUSD'),
                    location: document.getElementById('discoveredTokenLocation'),
                    badge: document.getElementById('tokenAmountBadge'),
                    discovery: document.getElementById('tokenDiscovery'),
                    sponsorName: document.getElementById('sponsorDetailsName'),
                    sponsorDescription: document.getElementById('sponsorDetailsDescription')
                };
                
                if (elements.amount) elements.amount.textContent = `${token.value} $Ember`;
                if (elements.usdValue) elements.usdValue.textContent = `~${(token.value * 0.001).toFixed(2)} USD`;
                if (elements.location) elements.location.textContent = token.location;
                if (elements.badge) elements.badge.textContent = `${token.value} $Ember`;
                
                // Update sponsor details
                if (elements.sponsorName) elements.sponsorName.textContent = token.sponsor || 'Mystery Sponsor';
                if (elements.sponsorDescription) elements.sponsorDescription.textContent = token.description || token.message || 'Amazing rewards await!';
                
                // Add sponsor message if available
                const sponsorContainer = document.querySelector('.sponsor-message');
                if (sponsorContainer && token.sponsor) {
                    sponsorContainer.style.display = 'block';
                    const sponsorTitle = sponsorContainer.querySelector('.sponsor-title');
                    const sponsorText = sponsorContainer.querySelector('.sponsor-text');
                    
                    if (sponsorTitle) sponsorTitle.textContent = `Sponsored by ${token.sponsor}`;
                    if (sponsorText) sponsorText.textContent = token.message || 'Thank you for exploring Phoenix!';
                } else if (sponsorContainer) {
                    sponsorContainer.style.display = 'none';
                }
                
                this.currentDiscoveredToken = token;
                this.isShowingSponsorDetails = false;
                
                // Show front view, hide back view
                const frontView = document.getElementById('sponsorInfoFront');
                const backView = document.getElementById('sponsorInfoBack');
                if (frontView) frontView.style.display = 'block';
                if (backView) backView.style.display = 'none';
                
                if (elements.discovery) elements.discovery.classList.add('show');
                
                console.log('🎴 Token discovery shown:', token.location);
            } catch (error) {
                console.error('❌ Token discovery show error:', error);
            }
        }

        showSponsorDetails() {
            try {
                if (!this.currentDiscoveredToken || this.isShowingSponsorDetails) return;
                
                this.isShowingSponsorDetails = true;
                
                const frontView = document.getElementById('sponsorInfoFront');
                const backView = document.getElementById('sponsorInfoBack');
                
                if (frontView && backView) {
                    frontView.style.display = 'none';
                    backView.style.display = 'block';
                }
                
                console.log('ℹ️ Showing sponsor details');
            } catch (error) {
                console.error('❌ Sponsor details show error:', error);
            }
        }

        hideSponsorDetails() {
            try {
                if (!this.isShowingSponsorDetails) return;
                
                this.isShowingSponsorDetails = false;
                
                const frontView = document.getElementById('sponsorInfoFront');
                const backView = document.getElementById('sponsorInfoBack');
                
                if (frontView && backView) {
                    frontView.style.display = 'block';
                    backView.style.display = 'none';
                }
                
                console.log('⬅️ Hiding sponsor details');
            } catch (error) {
                console.error('❌ Sponsor details hide error:', error);
            }
        }

        collectToken() {
            try {
                if (this.currentDiscoveredToken) {
                    // Add timestamp and collection info
                    const collectedToken = {
                        ...this.currentDiscoveredToken,
                        collectedAt: new Date().toISOString(),
                        collectionMethod: 'AR Hunt',
                        name: `${this.currentDiscoveredToken.location} Token`
                    };
                    
                    this.collectedTokens.push(collectedToken);
                    this.saveCollectedTokens();
                    
                    console.log('✅ Token collected:', this.currentDiscoveredToken.location);
                    
                    // Update adventure progress if applicable
                    this.updateAdventureProgress(this.currentDiscoveredToken.id);
                    
                    this.hideTokenDiscovery();
                    this.currentDiscoveredToken = null;
                    this.isShowingSponsorDetails = false;
                    
                    // Refresh vault if we're in vault mode
                    if (this.currentMode === 'vault') {
                        this.generateTokenHistory();
                    }
                    
                    // Show another coin after delay in AR mode
                    if (this.currentMode === 'ar') {
                        setTimeout(() => {
                            if (this.currentMode === 'ar') {
                                this.showTappableEmberCoin();
                            }
                        }, 8000);
                    }
                }
            } catch (error) {
                console.error('❌ Token collect error:', error);
            }
        }

        updateAdventureProgress(tokenId) {
            const activeAdventure = this.themedAdventures.find(a => a.active);
            if (!activeAdventure || !activeAdventure.locations.includes(tokenId)) return;
            
            activeAdventure.progress = Math.min(activeAdventure.progress + 1, activeAdventure.total);
            
            if (activeAdventure.progress === activeAdventure.total) {
                activeAdventure.completed = true;
                setTimeout(() => {
                    alert(`🎉 Adventure Complete!\n\n${activeAdventure.name} finished! You've unlocked ${activeAdventure.bonus} and exclusive rewards!`);
                }, 1000);
            }
            
            this.updateCampaignDisplay();
        }

        hideTokenDiscovery() {
            try {
                const tokenDiscovery = document.getElementById('tokenDiscovery');
                if (tokenDiscovery) {
                    tokenDiscovery.classList.remove('show');
                }
            } catch (error) {
                console.error('❌ Token discovery hide error:', error);
            }
        }

        stopCamera() {
            try {
                if (this.cameraStream) {
                    this.cameraStream.getTracks().forEach(track => {
                        track.stop();
                    });
                    this.cameraStream = null;
                    console.log('📷 Camera stopped');
                }
                
                const video = document.getElementById('video');
                if (video) {
                    video.srcObject = null;
                }
            } catch (error) {
                console.error('❌ Camera stop error:', error);
            }
        }

        animate() {
            try {
                requestAnimationFrame(() => this.animate());
                
                if (this.currentMode !== 'ar' || !this.renderer || !this.scene || !this.camera) {
                    return;
                }
                
                this.renderer.render(this.scene, this.camera);
            } catch (error) {
                console.error('❌ Animation error:', error);
            }
        }

        onWindowResize() {
            try {
                if (this.camera && this.renderer) {
                    this.camera.aspect = window.innerWidth / window.innerHeight;
                    this.camera.updateProjectionMatrix();
                    this.renderer.setSize(window.innerWidth, window.innerHeight);
                }
            } catch (error) {
                console.error('❌ Resize error:', error);
            }
        }

        // NAVIGATION SYSTEM
        goHome() {
            if (this.currentMode !== 'map') {
                this.switchMode('map');
            } else {
                const logo = document.getElementById('homeBtn');
                if (logo) {
                    logo.style.transform = 'scale(0.9)';
                    setTimeout(() => {
                        logo.style.transform = 'scale(1)';
                    }, 150);
                }
            }
        }

        toggleMenu() {
            try {
                const menu = document.getElementById('sideMenu');
                const overlay = document.getElementById('menuOverlay');
                
                if (!menu || !overlay) return;
                
                const isOpen = menu.classList.contains('open');
                
                if (isOpen) {
                    this.closeMenu();
                } else {
                    menu.classList.add('open');
                    overlay.classList.add('active');
                    this.updateMenuState();
                }
            } catch (error) {
                console.error('❌ Menu toggle error:', error);
            }
        }

        closeMenu() {
            try {
                const menu = document.getElementById('sideMenu');
                const overlay = document.getElementById('menuOverlay');
                
                if (menu) menu.classList.remove('open');
                if (overlay) overlay.classList.remove('active');
            } catch (error) {
                console.error('❌ Menu close error:', error);
            }
        }

        updateMenuState() {
            try {
                document.querySelectorAll('.menu-item[data-mode]').forEach(item => {
                    item.classList.toggle('active', item.dataset.mode === this.currentMode);
                });
            } catch (error) {
                console.error('❌ Menu state update error:', error);
            }
        }

        switchMode(mode) {
            if (mode === this.currentMode) return;
            
            console.log('🔄 Switching to mode:', mode);
            this.currentMode = mode;
            this.updateNavigationState();
            this.hideTokenDiscovery();
            this.hideEmberCoin();
            this.hideProximityNotification();
            
            switch (mode) {
                case 'map':
                    this.switchToMap();
                    break;
                case 'ar':
                    this.switchToAR();
                    break;
                case 'vault':
                    this.switchToVault();
                    break;
                case 'campaigns':
                    this.switchToCampaigns();
                    break;
            }
        }

        updateNavigationState() {
            try {
                document.querySelectorAll('.nav-tab').forEach(tab => {
                    tab.classList.toggle('active', tab.dataset.mode === this.currentMode);
                });
                this.updateMenuState();
            } catch (error) {
                console.error('❌ Navigation update error:', error);
            }
        }

        switchToMap() {
            console.log('🗺️ Switching to Map mode');
            try {
                document.getElementById('map').style.display = 'block';
                document.getElementById('video').style.display = 'none';
                document.getElementById('canvas').style.display = 'none';
                document.getElementById('vaultView').style.display = 'none';
                document.getElementById('campaignsView').style.display = 'none';
                
                this.hideARInstructions();
                this.hideEmberCoin();
                this.stopCamera();
                this.updateEnhancedMap();
            } catch (error) {
                console.error('❌ Map switch error:', error);
            }
        }

        switchToVault() {
            console.log('💎 Switching to Vault mode');
            try {
                document.getElementById('map').style.display = 'none';
                document.getElementById('video').style.display = 'none';
                document.getElementById('canvas').style.display = 'none';
                document.getElementById('vaultView').style.display = 'block';
                document.getElementById('campaignsView').style.display = 'none';
                
                this.hideARInstructions();
                this.hideEmberCoin();
                this.stopCamera();
                this.generateTokenHistory();
            } catch (error) {
                console.error('❌ Vault switch error:', error);
            }
        }

        switchToCampaigns() {
            console.log('🏆 Switching to Campaigns mode');
            try {
                document.getElementById('map').style.display = 'none';
                document.getElementById('video').style.display = 'none';
                document.getElementById('canvas').style.display = 'none';
                document.getElementById('vaultView').style.display = 'none';
                document.getElementById('campaignsView').style.display = 'block';
                
                this.hideARInstructions();
                this.hideEmberCoin();
                this.stopCamera();
                this.updateCampaignDisplay();
            } catch (error) {
                console.error('❌ Campaigns switch error:', error);
            }
        }

        // WALLET INTEGRATION
        showQRCode() {
            console.log('📱 Showing QR code...');
            try {
                const qrModal = document.getElementById('qrModal');
                if (qrModal) {
                    qrModal.style.display = 'flex';
                    this.generateQRCode();
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

        generateQRCode() {
            try {
                const qrContainer = document.querySelector('.qr-code-container');
                if (!qrContainer) return;

                // In a real implementation, this would generate an actual QR code
                // For demo, show a placeholder with payment info
                const sessionData = JSON.parse(sessionStorage.getItem('vaultPhoenixSession') || '{}');
                const walletAddress = sessionData.walletAddress || '0x1234...5678';
                
                qrContainer.innerHTML = `
                    <div style="text-align: center; padding: 20px;">
                        <div style="font-size: 60px; margin-bottom: 16px;">📱</div>
                        <div style="font-weight: 700; margin-bottom: 8px; color: #333;">Payment QR Code</div>
                        <div style="font-size: 12px; color: #666; margin-bottom: 12px;">Wallet: ${walletAddress.slice(0, 8)}...${walletAddress.slice(-6)}</div>
                        <div style="font-size: 14px; font-weight: 600; color: #f0a500;">${this.totalTokenValue} $Ember Available</div>
                        <div style="font-size: 12px; color: #666; margin-top: 8px;">Scan at participating locations</div>
                    </div>
                `;
            } catch (error) {
                console.error('❌ QR code generation error:', error);
            }
        }

        transferToCoinbase() {
            console.log('🏦 Transferring to Coinbase...');
            try {
                if (this.totalTokenValue === 0) {
                    alert('No $Ember tokens to transfer. Start hunting for tokens first!');
                    return;
                }

                // Simulate Coinbase transfer process
                const confirmTransfer = confirm(`Transfer ${this.totalTokenValue} $Ember tokens to Coinbase Wallet?\n\nEstimated value: ${(this.totalTokenValue * 0.001).toFixed(2)} USD`);
                
                if (confirmTransfer) {
                    this.showLoading(true);
                    
                    setTimeout(() => {
                        this.showLoading(false);
                        alert(`✅ Successfully transferred ${this.totalTokenValue} $Ember to Coinbase!\n\nTransaction ID: 0x${Math.random().toString(16).substr(2, 40)}`);
                        
                        // In a real app, tokens would be transferred and cleared
                        // For demo, we'll keep them but show the transfer in history
                        this.addTransferToHistory();
                    }, 2000);
                }
            } catch (error) {
                console.error('❌ Coinbase transfer error:', error);
            }
        }

        addTransferToHistory() {
            const transferItem = {
                name: 'Coinbase Transfer',
                value: -this.totalTokenValue,
                location: 'Coinbase Wallet',
                timestamp: new Date(),
                type: 'transfer',
                tier: 'transfer'
            };
            
            // Add to beginning of collected tokens for history display
            this.collectedTokens.unshift(transferItem);
            this.saveCollectedTokens();
            this.generateTokenHistory();
        }

        openCoinbaseWallet() {
            console.log('🏦 Opening Coinbase Wallet...');
            
            // In a real implementation, this would open Coinbase Wallet app or web interface
            const coinbaseUrl = 'https://wallet.coinbase.com/';
            window.open(coinbaseUrl, '_blank');
            
            setTimeout(() => {
                alert('In a real implementation, this would:\n\n• Open Coinbase Wallet app\n• Connect your $Ember tokens\n• Enable direct transfers\n• Show real-time balance');
            }, 500);
        }

        // NAVIGATION MODAL SYSTEM
        showNavigationModal(tokenLocation) {
            try {
                if (!tokenLocation) {
                    console.warn('No token location provided');
                    return;
                }

                this.currentNavigationToken = tokenLocation;
                const modal = document.getElementById('navigationModal');
                
                if (!modal) {
                    console.warn('Navigation modal not found');
                    return;
                }
                
                // Update modal content
                const tokenName = document.getElementById('navTokenName');
                const distance = document.getElementById('navDistance');
                const walkTime = document.getElementById('navWalkTime');
                const driveTime = document.getElementById('navDriveTime');
                
                if (tokenName) tokenName.textContent = `${tokenLocation.value} $Ember Token`;
                
                // Calculate distance if user location is available
                if (this.userLat && this.userLng && tokenLocation.lat && tokenLocation.lng) {
                    const distanceValue = this.calculateDistance(
                        this.userLat, this.userLng,
                        tokenLocation.lat, tokenLocation.lng
                    );
                    
                    if (distance) distance.textContent = this.formatDistance(distanceValue);
                    
                    // Estimate travel times
                    const walkMinutes = Math.ceil(distanceValue * 20); // ~3mph walking speed
                    const driveMinutes = Math.ceil(distanceValue * 2);  // ~30mph city driving
                    
                    if (walkTime) walkTime.textContent = this.formatTime(walkMinutes);
                    if (driveTime) driveTime.textContent = this.formatTime(driveMinutes);
                } else {
                    if (distance) distance.textContent = 'Distance calculating...';
                    if (walkTime) walkTime.textContent = '~5 min';
                    if (driveTime) driveTime.textContent = '~2 min';
                }
                
                modal.style.display = 'flex';
                
                console.log('🗺️ Navigation modal shown for:', tokenLocation.location);
                
            } catch (error) {
                console.error('❌ Navigation modal error:', error);
            }
        }

        hideNavigationModal() {
            try {
                const modal = document.getElementById('navigationModal');
                if (modal) {
                    modal.style.display = 'none';
                }
            } catch (error) {
                console.error('❌ Hide navigation modal error:', error);
            }
        }

        calculateDistance(lat1, lng1, lat2, lng2) {
            // Haversine formula for distance calculation
            const R = 3959; // Earth's radius in miles
            const dLat = this.toRadians(lat2 - lat1);
            const dLng = this.toRadians(lng2 - lng1);
            
            const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                    Math.cos(this.toRadians(lat1)) * Math.cos(this.toRadians(lat2)) *
                    Math.sin(dLng / 2) * Math.sin(dLng / 2);
            
            const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
            return R * c;
        }

        toRadians(degrees) {
            return degrees * (Math.PI / 180);
        }

        formatDistance(miles) {
            if (miles < 0.1) {
                return `${Math.round(miles * 5280)} feet away`;
            } else if (miles < 1) {
                return `${(miles * 1000).toFixed(0)}m away`;
            } else {
                return `${miles.toFixed(1)} miles away`;
            }
        }

        formatTime(minutes) {
            if (minutes < 60) {
                return `${minutes} min`;
            } else {
                const hours = Math.floor(minutes / 60);
                const mins = minutes % 60;
                return `${hours}h ${mins}m`;
            }
        }

        openMapsNavigation(travelMode) {
            try {
                if (!this.currentNavigationToken) {
                    console.warn('No navigation token selected');
                    return;
                }

                const destination = `${this.currentNavigationToken.lat || 33.4484},${this.currentNavigationToken.lng || -112.0740}`;
                const travelModeParam = travelMode === 'driving' ? 'driving' : 'walking';
                
                // Google Maps URL with directions
                const mapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${destination}&travelmode=${travelModeParam}`;
                
                // Open in new tab/app
                window.open(mapsUrl, '_blank');
                
                // Hide modal
                this.hideNavigationModal();
                
                // Show confirmation
                this.updateStatus(`Opening ${travelMode} directions to ${this.currentNavigationToken.location}`, false);
                
                console.log(`🗺️ Opening ${travelMode} navigation to ${this.currentNavigationToken.location}`);
                
            } catch (error) {
                console.error('❌ Maps navigation error:', error);
                this.updateStatus('Failed to open navigation', true);
            }
        }

        startARHunt() {
            try {
                this.hideNavigationModal();
                this.switchMode('ar');
                this.updateStatus(`AR Hunt mode: Look for ${this.currentNavigationToken?.location || 'nearby tokens'}`, false);
            } catch (error) {
                console.error('❌ AR hunt start error:', error);
            }
        }

        // VAULT FILTERING
        filterVault(filter) {
            try {
                document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
                const activeBtn = document.querySelector(`[data-filter="${filter}"]`);
                if (activeBtn) activeBtn.classList.add('active');

                const historyItems = document.querySelectorAll('.history-item');
                historyItems.forEach(item => {
                    const historyTitle = item.querySelector('.history-title');
                    const historySubtitle = item.querySelector('.history-subtitle');
                    
                    if (!historyTitle || !historySubtitle) {
                        item.style.display = 'flex';
                        return;
                    }
                    
                    const subtitleText = historySubtitle.textContent.toLowerCase();
                    
                    switch (filter) {
                        case 'all':
                            item.style.display = 'flex';
                            break;
                        case 'high':
                            item.style.display = subtitleText.includes('high') ? 'flex' : 'none';
                            break;
                        case 'medium':
                            item.style.display = subtitleText.includes('medium') ? 'flex' : 'none';
                            break;
                        case 'low':
                            item.style.display = subtitleText.includes('low') ? 'flex' : 'none';
                            break;
                        default:
                            item.style.display = 'flex';
                    }
                });
                
                console.log('🔍 Vault filtered by:', filter);
            } catch (error) {
                console.error('❌ Vault filter error:', error);
            }
        }

        // LOGOUT SYSTEM
        showLogoutConfirmation() {
            try {
                const overlay = document.getElementById('logoutOverlay');
                if (overlay) {
                    overlay.style.display = 'flex';
                    this.closeMenu();
                }
            } catch (error) {
                console.error('❌ Logout confirmation error:', error);
            }
        }

        hideLogoutConfirmation() {
            try {
                const overlay = document.getElementById('logoutOverlay');
                if (overlay) {
                    overlay.style.display = 'none';
                }
            } catch (error) {
                console.error('❌ Hide logout confirmation error:', error);
            }
        }

        logout() {
            console.log('🚪 Logging out...');
            try {
                this.stopCamera();
                this.stopCompass();
                this.stopProximityCheck();
                sessionStorage.removeItem('vaultPhoenixSession');
                
                // Navigate to login page
                window.location.href = 'index.html';
            } catch (error) {
                console.error('❌ Logout error:', error);
                window.location.href = 'index.html';
            }
        }

        stopCompass() {
            try {
                if (this.compassInterval) {
                    clearInterval(this.compassInterval);
                    this.compassInterval = null;
                    console.log('🧭 Compass stopped');
                }
                
                if (this.orientationHandler) {
                    window.removeEventListener('deviceorientation', this.orientationHandler, true);
                    this.orientationHandler = null;
                    console.log('🧭 Orientation listener removed');
                }
                
                this.isCompassActive = false;
                this.hasReceivedOrientationData = false;
            } catch (error) {
                console.error('❌ Compass stop error:', error);
            }
        }

        stopProximityCheck() {
            try {
                if (this.proximityCheckInterval) {
                    clearInterval(this.proximityCheckInterval);
                    this.proximityCheckInterval = null;
                    console.log('📡 Proximity check stopped');
                }
            } catch (error) {
                console.error('❌ Proximity check stop error:', error);
            }
        }

        // UTILITY FUNCTIONS
        showLoading(show) {
            try {
                const overlay = document.getElementById('loadingOverlay');
                if (overlay) {
                    overlay.style.display = show ? 'flex' : 'none';
                }
            } catch (error) {
                console.error('❌ Loading overlay error:', error);
            }
        }

        updateStatus(message, isError = false) {
            try {
                const statusText = document.getElementById('gpsStatus');
                
                if (statusText) {
                    statusText.innerHTML = `
                        <div class="status-indicator">
                            <div class="status-dot ${isError ? 'error' : ''}"></div>
                            <span>${message}</span>
                        </div>
                    `;
                }
            } catch (error) {
                console.error('❌ Status update error:', error);
            }
        }

        updatePosition(position) {
            try {
                this.userLat = position.coords.latitude;
                this.userLng = position.coords.longitude;
                
                this.updateEnhancedMap();
            } catch (error) {
                console.error('❌ Position update error:', error);
            }
        }

        updateEnhancedMap() {
            try {
                const latEl = document.getElementById('fallbackLat');
                const lngEl = document.getElementById('fallbackLng');
                
                if (latEl && this.userLat) latEl.textContent = this.userLat.toFixed(4);
                if (lngEl && this.userLng) lngEl.textContent = this.userLng.toFixed(4);
            } catch (error) {
                console.error('❌ Enhanced map update error:', error);
            }
        }
    }

    // INITIALIZATION
    document.addEventListener('DOMContentLoaded', () => {
        console.log('🔥💎 DOM loaded, starting Vault Phoenix...');
        
        try {
            new VaultPhoenixCryptoGame();
        } catch (error) {
            console.error('💥 Failed to initialize Vault Phoenix:', error);
            
            // Show error screen
            document.body.innerHTML = `
                <div style="
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    height: 100vh;
                    background: linear-gradient(135deg, #0f0f0f, #2d1810);
                    color: white;
                    text-align: center;
                    padding: 20px;
                    font-family: system-ui, sans-serif;
                ">
                    <div style="
                        background: rgba(15, 15, 15, 0.9);
                        border-radius: 20px;
                        padding: 40px;
                        border: 2px solid rgba(240, 165, 0, 0.4);
                        max-width: 400px;
                    ">
                        <h2 style="color: #f0a500; margin-bottom: 16px;">🔥 Vault Phoenix</h2>
                        <p style="margin-bottom: 20px;">Initialization failed</p>
                        <button onclick="window.location.reload()" style="
                            background: linear-gradient(135deg, #f0a500, #fb923c);
                            color: white;
                            border: none;
                            padding: 12px 24px;
                            border-radius: 10px;
                            cursor: pointer;
                            font-weight: bold;
                        ">Try Again</button>
                    </div>
                </div>
            `;
        }
    });

    // Auto-redirect if session exists on login page
    if (window.location.pathname.includes('index') || window.location.pathname === '/' || window.location.pathname.endsWith('crypto-game/')) {
        const session = sessionStorage.getItem('vaultPhoenixSession');
        if (session) {
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
    }

    // Console welcome message
    console.log('%c🔥💎 VAULT PHOENIX - AR CRYPTO GAMING', 'color: #f0a500; font-size: 20px; font-weight: bold;');
    console.log('%c🚀 Demo: demo@vaultphoenix.com / phoenix123', 'color: #fb923c; font-size: 14px;');
    console.log('%c📧 Contact: contact@vaultphoenix.com', 'color: #374151; font-size: 12px;');

} else {
    console.log('🚫 Crypto Game JS blocked - not on crypto game page');
}
