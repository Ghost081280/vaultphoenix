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
                    // Set initial mode
                    this.setModeAttribute('map');
                    console.log('✅ Dashboard initialized');
                }
            } catch (error) {
                console.error('❌ Initialization error:', error);
                this.collectedTokens = [];
                this.totalTokenValue = 0;
                this.updateVaultStats();
            }
        }

        // CRITICAL FIX: Set data-mode attribute on body
        setModeAttribute(mode) {
            try {
                document.body.setAttribute('data-mode', mode);
                console.log('🔧 Set mode attribute to:', mode);
            } catch (error) {
                console.error('❌ Mode attribute error:', error);
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
                if (elements.vaultUsdValue) elements.vaultUsdValue.textContent = `$${usdValue} USD`;
                if (elements.qrTokenAmount) elements.qrTokenAmount.textContent = `${this.totalTokenValue} $Ember`;
                if (elements.qrTokenValue) elements.qrTokenValue.textContent = `$${usdValue} USD`;
                if (elements.totalCollected) elements.totalCollected.textContent = this.collectedTokens.length;
                if (elements.locationsVisited) elements.locationsVisited.textContent = this.locationsVisited;
                if (elements.totalValue) elements.totalValue.textContent = `$${usdValue}`;
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
                <div class="history-icon">
                    <img src="../images/VPEmberCoin.PNG" alt="Ember Coin" class="history-coin-icon" onerror="this.textContent='💎'">
                </div>
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

        onWindowResize() {
            try {
                if (this.camera && this.renderer) {
                    this.camera.aspect = window.innerWidth / window.innerHeight;
                    this.camera.updateProjectionMatrix();
                    this.renderer.setSize(window.innerWidth, window.innerHeight);
                }
            } catch (error) {
                console.error('❌ Window resize error:', error);
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

        calculateDistance(lat1, lng1, lat2, lng2) {
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

        // NAVIGATION SYSTEM WITH PROPER MODE SWITCHING
        switchMode(mode) {
            if (mode === this.currentMode) return;
            
            console.log('🔄 Switching to mode:', mode);
            this.currentMode = mode;
            
            // CRITICAL: Set the data-mode attribute
            this.setModeAttribute(mode);
            
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

        switchToAR() {
            console.log('📱 Switching to AR mode');
            try {
                document.getElementById('map').style.display = 'none';
                document.getElementById('video').style.display = 'block';
                document.getElementById('canvas').style.display = 'block';
                document.getElementById('vaultView').style.display = 'none';
                document.getElementById('campaignsView').style.display = 'none';
                
                this.hideProximityNotification();
                
                this.requestDevicePermissions().then(permissions => {
                    console.log('📷🧭 Device permissions:', permissions);
                    
                    if (permissions.camera) {
                        this.updateStatus('AR mode active - camera ready!', false);
                    }
                }).catch(error => {
                    console.error('❌ Device permissions failed:', error);
                    this.updateStatus('❌ Camera access required for AR mode', true);
                    return;
                });
                
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

        // AR FUNCTIONALITY
        showARInstructions() {
            const instructions = document.getElementById('arInstructions');
            if (instructions) {
                instructions.classList.add('show');
                setTimeout(() => {
                    this.hideARInstructions();
                }, 5000);
            }
        }

        hideARInstructions() {
            const instructions = document.getElementById('arInstructions');
            if (instructions) {
                instructions.classList.remove('show');
            }
        }

        showTappableEmberCoin() {
            const coin = document.getElementById('arEmberCoin');
            if (coin) {
                coin.style.display = 'block';
                coin.classList.add('tappable');
            }
        }

        hideEmberCoin() {
            const coin = document.getElementById('arEmberCoin');
            if (coin) {
                coin.style.display = 'none';
                coin.classList.remove('tappable');
            }
        }

        onEmberCoinClick() {
            console.log('💎 AR Ember coin clicked!');
            
            // Haptic feedback
            if (navigator.vibrate) {
                navigator.vibrate([100, 50, 100]);
            }
            
            // Hide the coin
            this.hideEmberCoin();
            
            // Show token discovery modal
            this.showRandomTokenDiscovery();
        }

        showRandomTokenDiscovery() {
            // Select a random uncollected token
            const uncollectedTokens = this.emberTokens.filter(token => !this.isTokenCollected(token.id));
            
            if (uncollectedTokens.length === 0) {
                alert('🎉 All tokens collected! You are the ultimate $Ember hunter!');
                return;
            }
            
            const randomToken = uncollectedTokens[Math.floor(Math.random() * uncollectedTokens.length)];
            this.showTokenDiscovery(randomToken);
        }

        showTokenDiscovery(token) {
            this.currentDiscoveredToken = token;
            
            const modal = document.getElementById('tokenDiscovery');
            const amountBadge = document.getElementById('tokenAmountBadge');
            const tokenAmount = document.getElementById('discoveredTokenAmount');
            const tokenUSD = document.getElementById('discoveredTokenUSD');
            const tokenLocation = document.getElementById('discoveredTokenLocation');
            
            if (amountBadge) amountBadge.textContent = `${token.value} $Ember`;
            if (tokenAmount) tokenAmount.textContent = `${token.value} $Ember`;
            if (tokenUSD) tokenUSD.textContent = `~${(token.value * 0.001).toFixed(2)} USD`;
            if (tokenLocation) tokenLocation.textContent = token.location;
            
            // Update sponsor info
            const sponsorTitle = document.querySelector('.sponsor-title');
            const sponsorText = document.querySelector('.sponsor-text');
            const sponsorName = document.getElementById('sponsorDetailsName');
            const sponsorDesc = document.getElementById('sponsorDetailsDescription');
            
            if (sponsorTitle) sponsorTitle.textContent = `Sponsored by ${token.sponsor}`;
            if (sponsorText) sponsorText.textContent = token.message;
            if (sponsorName) sponsorName.textContent = token.sponsor;
            if (sponsorDesc) sponsorDesc.textContent = token.description;
            
            if (modal) {
                modal.classList.add('show');
            }
        }

        hideTokenDiscovery() {
            const modal = document.getElementById('tokenDiscovery');
            if (modal) {
                modal.classList.remove('show');
            }
        }

        collectToken() {
            if (!this.currentDiscoveredToken) return;
            
            console.log('💰 Collecting token:', this.currentDiscoveredToken.location);
            
            // Add to collected tokens
            const collectedToken = {
                ...this.currentDiscoveredToken,
                collectedAt: new Date().toISOString(),
                timestamp: new Date()
            };
            
            this.collectedTokens.push(collectedToken);
            this.saveCollectedTokens();
            
            // Hide modal
            this.hideTokenDiscovery();
            
            // Show success feedback
            this.showCollectionSuccess(collectedToken);
            
            // Clear current token
            this.currentDiscoveredToken = null;
        }

        showCollectionSuccess(token) {
            // Haptic celebration
            if (navigator.vibrate) {
                navigator.vibrate([200, 100, 200, 100, 200]);
            }
            
            // Show success message
            setTimeout(() => {
                alert(`🎉 Token Collected!\n\n+${token.value} $Ember added to your vault!\n\nTotal: ${this.totalTokenValue} $Ember`);
            }, 500);
        }

        showSponsorDetails() {
            const frontInfo = document.getElementById('sponsorInfoFront');
            const backInfo = document.getElementById('sponsorInfoBack');
            
            if (frontInfo && backInfo) {
                frontInfo.style.display = 'none';
                backInfo.style.display = 'block';
                this.isShowingSponsorDetails = true;
            }
        }

        hideSponsorDetails() {
            const frontInfo = document.getElementById('sponsorInfoFront');
            const backInfo = document.getElementById('sponsorInfoBack');
            
            if (frontInfo && backInfo) {
                frontInfo.style.display = 'block';
                backInfo.style.display = 'none';
                this.isShowingSponsorDetails = false;
            }
        }

        animate() {
            if (!this.renderer || !this.scene || !this.camera) return;
            
            requestAnimationFrame(() => this.animate());
            
            try {
                this.renderer.render(this.scene, this.camera);
            } catch (error) {
                console.error('❌ Animation error:', error);
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
                    } catch (permissionError) {
                        console.log('⚠️ Compass permission error, using fallback');
                        this.setupFallbackCompass();
                    }
                } else {
                    permissions.compass = true;
                    console.log('🧭 Compass available without permission');
                }

            } catch (error) {
                console.error('❌ Device permissions error:', error);
                throw error;
            }

            return permissions;
        }

        // UTILITY METHODS
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
                            <div class="status-dot ${isError ? 'error' : 'active'}"></div>
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

        // LOGOUT AND CLEANUP
        showLogoutConfirmation() {
            const overlay = document.getElementById('logoutOverlay');
            if (overlay) {
                overlay.classList.add('show');
            }
        }

        hideLogoutConfirmation() {
            const overlay = document.getElementById('logoutOverlay');
            if (overlay) {
                overlay.classList.remove('show');
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

        // ADDITIONAL FEATURES
        filterVault(filter) {
            console.log('🔍 Filtering vault by:', filter);
            
            // Update filter buttons
            document.querySelectorAll('.filter-btn').forEach(btn => {
                btn.classList.toggle('active', btn.dataset.filter === filter);
            });
            
            // Show filtered tokens
            this.generateTokenHistory(filter);
        }

        transferToCoinbase() {
            if (this.totalTokenValue === 0) {
                alert('⚠️ No $Ember tokens to transfer!');
                return;
            }
            
            alert(`🏦 Coinbase Transfer\n\nTransferring ${this.totalTokenValue} $Ember tokens to your Coinbase wallet...\n\nThis feature would integrate with Coinbase API in production.`);
        }

        showQRCode() {
            const modal = document.getElementById('qrModal');
            if (modal) {
                modal.classList.add('show');
            }
        }

        hideQRCode() {
            const modal = document.getElementById('qrModal');
            if (modal) {
                modal.classList.remove('show');
            }
        }

        openCoinbaseWallet() {
            alert('🏦 Coinbase Integration\n\nThis would open the Coinbase wallet integration for managing your $Ember tokens.');
        }

        hideNavigationModal() {
            const modal = document.getElementById('navigationModal');
            if (modal) {
                modal.classList.remove('show');
            }
        }

        openMapsNavigation(mode) {
            console.log('🗺️ Opening maps navigation:', mode);
            alert(`🗺️ Navigation\n\nThis would open ${mode} directions in your default maps app.`);
        }

        startARHunt() {
            this.hideNavigationModal();
            this.switchMode('ar');
        }
    }

    // Initialize the game when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            new VaultPhoenixCryptoGame();
        });
    } else {
        new VaultPhoenixCryptoGame();
    }
    
} else {
    console.log('🚫 Vault Phoenix blocked - not a crypto game page');
}
