// Vault Phoenix AR Crypto Gaming - Enhanced Game Engine with Fixed Hunt Screen
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
        this.currentNavigationToken = null;
        this.proximityCheckInterval = null;
        this.isShowingSponsorDetails = false;
        this.googleMapsLoaded = false;
        this.locationsVisited = 0;
        this.lastActivityTime = null;
        this.coinRotation = 0;
        this.fixedCoinPosition = { x: 50, y: 50 }; // Fixed percentage position
        this.isTokenSliderExpanded = false;

        // Enhanced Ember Token System with Real Locations and Value Tiers
        this.emberTokens = [
            { id: 1, value: 500, tier: "high", location: "Downtown Phoenix", lat: 33.4484, lng: -112.0740, sponsor: "Phoenix Suns Arena", message: "Exclusive courtside experience awaits!", description: "Experience the thrill of NBA basketball with exclusive courtside seats, VIP dining, and behind-the-scenes arena tours. Your $Ember tokens unlock premium experiences at Phoenix's premier entertainment destination." },
            { id: 2, value: 250, tier: "medium", location: "Scottsdale Quarter", lat: 33.4942, lng: -111.9261, sponsor: "Scottsdale Fashion Square", message: "Premium shopping rewards unlocked!", description: "Discover luxury shopping with exclusive discounts and VIP personal shopping services at Arizona's premier fashion destination." },
            { id: 3, value: 100, tier: "low", location: "Tempe Town Lake", lat: 33.4255, lng: -111.9400, sponsor: "Local Coffee Co.", message: "Free coffee for early hunters!", description: "Enjoy artisanal coffee and cozy workspace with special $Ember holder benefits. Perfect spot for digital nomads!" },
            { id: 4, value: 150, tier: "medium", location: "Old Town Scottsdale", lat: 33.4942, lng: -111.9261, sponsor: "Arizona Bike Tours", message: "Adventure awaits in the desert!", description: "Explore the Sonoran Desert with guided tours and premium bike rentals. Discover hidden gems only locals know!" },
            { id: 5, value: 300, tier: "medium", location: "Arizona State University", lat: 33.4194, lng: -111.9339, sponsor: "ASU Bookstore", message: "Student discounts and exclusive gear!", description: "Access student resources and exclusive Sun Devil merchandise. Connect with the innovation hub of the Southwest!" },
            { id: 6, value: 75, tier: "low", location: "Phoenix Sky Harbor", lat: 33.4343, lng: -112.0116, sponsor: "Sky Harbor Shops", message: "Travel rewards for your next adventure!", description: "Unlock travel perks and duty-free shopping benefits. Your gateway to exploring the world!" },
            { id: 7, value: 200, tier: "medium", location: "Camelback Mountain", lat: 33.5186, lng: -111.9717, sponsor: "Desert Hiking Gear", message: "Gear up for your next hike!", description: "Professional hiking equipment and guided desert expedition packages. Conquer Arizona's most iconic peak!" },
            { id: 8, value: 50, tier: "low", location: "Desert Botanical Garden", lat: 33.4619, lng: -111.9463, sponsor: "Garden Cafe", message: "Nature-inspired dining experience!", description: "Farm-to-table dining surrounded by stunning desert flora. A peaceful oasis in the heart of Phoenix!" },
            { id: 9, value: 125, tier: "low", location: "Roosevelt Row", lat: 33.4524, lng: -112.0708, sponsor: "Local Art Gallery", message: "Support local artists and creators!", description: "Discover emerging artists and exclusive art collection access. Be part of Phoenix's thriving creative community!" },
            { id: 10, value: 400, tier: "high", location: "Chase Field", lat: 33.4453, lng: -112.0667, sponsor: "Arizona Diamondbacks", message: "Baseball season tickets await!", description: "Premium baseball experiences with season ticket perks and dugout tours. Feel the energy of Major League Baseball!" },
            { id: 11, value: 90, tier: "low", location: "Papago Park", lat: 33.4551, lng: -111.9511, sponsor: "Park Recreation Center", message: "Family fun activities included!", description: "Family-friendly activities and recreational programs for all ages. Create lasting memories in Phoenix's natural playground!" },
            { id: 12, value: 175, tier: "medium", location: "Biltmore Fashion Park", lat: 33.5117, lng: -112.0736, sponsor: "Luxury Boutiques", message: "Exclusive fashion rewards!", description: "High-end fashion with personal styling services and exclusive previews. Elevate your style with Arizona's luxury shopping destination!" }
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
                this.initializeCampaigns();
                this.addHapticFeedback();
                document.body.classList.add('dashboard');
                console.log('✅ Dashboard initialized');
            }
        } catch (error) {
            console.error('❌ Initialization error:', error);
            this.collectedTokens = [];
            this.totalTokenValue = 0;
            this.updateVaultStats();
        }
    }

    // LOGIN SYSTEM - Enhanced
    setupLoginListeners() {
        const loginForm = document.getElementById('loginForm');
        const forgotPassword = document.getElementById('forgotPassword');
        
        if (loginForm) {
            loginForm.addEventListener('submit', (e) => this.handleLogin(e));
        }
        
        if (forgotPassword) {
            forgotPassword.addEventListener('click', (e) => this.handleForgotPassword(e));
        }
        
        // Enhanced mobile interactions
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
        if (loginText) {
            loginText.innerHTML = `
                <span class="loading-spinner"></span>
                Authenticating...
            `;
        }
        
        if (loginBtn) loginBtn.style.transform = 'scale(0.98)';

        try {
            await this.authenticateUser(email, password);
            
            if (loginText) {
                loginText.innerHTML = `
                    ✅ Access Granted!
                `;
            }
            if (loginBtn) loginBtn.style.background = 'linear-gradient(135deg, #4CAF50, #45a049)';
            
            this.showSuccess('Login successful! Launching AR $Ember Hunt...');
            
            this.storeSession(email);
            
            setTimeout(() => {
                window.location.href = 'dashboard.html';
            }, 1500);

        } catch (error) {
            if (loginBtn) loginBtn.style.transform = 'scale(1)';
            if (loginText) {
                loginText.innerHTML = `
                    <img src="../images/VPEmberFlame.svg" alt="Ember Flame" class="login-flame-icon">
                    Start $Ember Hunt
                `;
            }
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

    // DASHBOARD SYSTEM - Enhanced
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
    }

    saveCollectedTokens() {
        try {
            localStorage.setItem('vaultPhoenixTokens', JSON.stringify(this.collectedTokens));
            this.calculateTotalValue();
            this.calculateStats();
            this.updateVaultStats();
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
        console.log('🎧 Setting up enhanced event listeners...');
        try {
            const handlers = [
                { id: 'startBtn', event: 'click', handler: () => this.start() },
                { id: 'homeBtn', event: 'click', handler: () => this.goHome() },
                { id: 'menuToggle', event: 'click', handler: () => this.toggleMenu() },
                { id: 'menuOverlay', event: 'click', handler: () => this.closeMenu() },
                { id: 'sideMenuLogout', event: 'click', handler: () => this.showLogoutConfirmation() },
                { id: 'sponsorInfoBtn', event: 'click', handler: () => this.showSponsorDetails() },
                { id: 'sponsorBackBtn', event: 'click', handler: () => this.hideSponsorDetails() },
                { id: 'sponsorActionBtn', event: 'click', handler: () => this.handleSponsorAction() },
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
                { id: 'qrLogoutBtn', event: 'click', handler: () => this.showLogoutConfirmation() },
                { id: 'coinbaseWallet', event: 'click', handler: () => this.openCoinbaseWallet() },
                { id: 'redeemTokens', event: 'click', handler: () => this.showQRCode() },
                { id: 'howToPlay', event: 'click', handler: () => this.showHowToPlay() },
                { id: 'howToPlayClose', event: 'click', handler: () => this.hideHowToPlay() },
                { id: 'startPlayingBtn', event: 'click', handler: () => this.startPlayingFromTutorial() },
                { id: 'proximityARButton', event: 'click', handler: () => this.switchMode('ar') },
                { id: 'adventureMiniMap', event: 'click', handler: () => this.openAdventureMap() }
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

            // Vault filters (now simplified)
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

            // FIXED: Token Slider Handle
            const sliderHandle = document.querySelector('.slider-handle');
            if (sliderHandle) {
                sliderHandle.addEventListener('click', () => this.toggleTokenSlider());
            }

            console.log('✅ Enhanced event listeners setup complete');
        } catch (error) {
            console.error('❌ Event listener error:', error);
        }
    }

    initializeVault() {
        console.log('💎 Initializing enhanced vault...');
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
                const historyItem = this.createHistoryItem(token, true);
                historyContainer.appendChild(historyItem);
            });
        }
    }

    createHistoryItem(item, isClickable = false) {
        const historyItem = document.createElement('div');
        historyItem.className = `history-item ${isClickable ? 'clickable' : ''}`;
        
        const tierClass = item.tier || 'low';
        const timestamp = item.timestamp || (item.collectedAt ? new Date(item.collectedAt) : new Date());
        
        historyItem.innerHTML = `
            <div class="history-icon"></div>
            <div class="history-details">
                <div class="history-title">${item.name || item.location}</div>
                <div class="history-subtitle">${item.location} • ${this.formatDate(timestamp)} • ${tierClass.toUpperCase()}</div>
            </div>
            <div class="history-value">+${item.value}</div>
            ${isClickable ? '<div class="history-arrow">→</div>' : ''}
        `;
        
        if (isClickable) {
            historyItem.addEventListener('click', () => {
                // Find the original token data
                const originalToken = this.emberTokens.find(t => t.location === item.location);
                if (originalToken) {
                    this.showTokenDetails(originalToken);
                }
            });
        }
        
        return historyItem;
    }

    showTokenDetails(token) {
        // Show the sponsor details modal for collected tokens
        this.currentDiscoveredToken = token;
        this.showTokenDiscovery(token, true); // true = skip collection, show details only
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
        
        this.updateHuntStatus(`Started ${adventure.name} adventure!`, false);
        
        setTimeout(() => {
            alert(`🎯 ${adventure.name} activated!\n\nExplore ${adventure.total} themed locations to earn ${adventure.bonus} and unlock exclusive rewards!`);
        }, 500);
    }

    openAdventureMap() {
        console.log('🗺️ Opening adventure interactive map...');
        
        // Create adventure map modal
        const adventureMapModal = document.createElement('div');
        adventureMapModal.className = 'adventure-map-modal';
        adventureMapModal.innerHTML = `
            <div class="adventure-map-content">
                <div class="adventure-map-header">
                    <h3>🏆 Adventure Locations</h3>
                    <button class="adventure-map-close" id="adventureMapClose">✕</button>
                </div>
                <div class="adventure-map-container">
                    <div class="adventure-google-map">
                        <div class="adventure-map-info">
                            <div class="active-adventure-title">Phoenix Sports Trail</div>
                            <div class="active-adventure-progress">3 of 5 locations completed</div>
                        </div>
                        ${this.generateAdventureMapMarkers()}
                        <div class="adventure-map-legend">
                            <div class="legend-item">
                                <div class="legend-marker completed"></div>
                                <span>Completed</span>
                            </div>
                            <div class="legend-item">
                                <div class="legend-marker available"></div>
                                <span>Available</span>
                            </div>
                            <div class="legend-item">
                                <div class="legend-marker locked"></div>
                                <span>Locked</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(adventureMapModal);
        
        // Add event listeners
        document.getElementById('adventureMapClose').addEventListener('click', () => {
            document.body.removeChild(adventureMapModal);
        });
        
        adventureMapModal.addEventListener('click', (e) => {
            if (e.target === adventureMapModal) {
                document.body.removeChild(adventureMapModal);
            }
        });
        
        // Show modal
        requestAnimationFrame(() => {
            adventureMapModal.classList.add('show');
        });
    }

    generateAdventureMapMarkers() {
        const activeAdventure = this.themedAdventures.find(a => a.active) || this.themedAdventures[0];
        
        return activeAdventure.locations.map((tokenId, index) => {
            const token = this.emberTokens.find(t => t.id === tokenId);
            const isCompleted = this.isTokenCollected(tokenId);
            const isAvailable = index <= activeAdventure.progress;
            const x = 15 + (index % 3) * 30;
            const y = 20 + Math.floor(index / 3) * 35;
            
            return `
                <div class="adventure-map-marker ${isCompleted ? 'completed' : isAvailable ? 'available' : 'locked'}" 
                     style="left: ${x}%; top: ${y}%;"
                     data-token-id="${tokenId}">
                    <div class="adventure-marker-icon">
                        ${isCompleted ? '✅' : isAvailable ? '🎯' : '🔒'}
                    </div>
                    <div class="adventure-marker-label">${token?.location || 'Unknown'}</div>
                </div>
            `;
        }).join('');
    }

    addHapticFeedback() {
        try {
            const interactiveElements = document.querySelectorAll('.nav-tab, .token-action-btn, .vault-action-btn, .filter-btn, .menu-item, .ar-ember-coin, .history-item, .adventure-start-btn, .proximity-button, .token-list-item, .phoenix-location-marker, .slider-handle');
            
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

    // GAME MECHANICS - Enhanced
    async start() {
        if (this.isStarted) return;
        this.isStarted = true;

        console.log('🚀 Starting Enhanced Vault Phoenix...');
        
        const startBtn = document.getElementById('startBtn');
        if (startBtn) startBtn.style.display = 'none';
        
        this.showLoading(true);
        
        try {
            await this.setupGPS();
            this.createPhoenixMap();
            this.setupThreeJS();
            this.generateTokenLocations();
            await this.initializeCompass();
            this.startProximityCheck();
            this.createTokenSlider();
            
            this.updateHuntStatus("Ready! Start hunting for $Ember tokens!", false);
            this.showLoading(false);
            
            console.log('✅ Enhanced Vault Phoenix started successfully');
        } catch (error) {
            console.error('❌ Start error:', error);
            this.updateHuntStatus(`Error: ${error.message}`, true);
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
                    
                    // Update hunt status with location
                    this.updateHuntLocationDisplay();
                    
                    navigator.geolocation.watchPosition(
                        (pos) => this.updatePosition(pos),
                        (error) => console.warn("GPS update error:", error),
                        options
                    );
                    
                    resolve();
                },
                (error) => {
                    // Use Phoenix, AZ as fallback for demo
                    this.userLat = 33.4484;
                    this.userLng = -112.0740;
                    console.log('📍 Using Phoenix, AZ for demo');
                    this.updateHuntLocationDisplay();
                    resolve();
                },
                options
            );
        });
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

    // FIXED: Phoenix Map Creation - Replaces broken Google Maps
    createPhoenixMap() {
        console.log('🗺️ Creating enhanced Phoenix token map...');
        
        const mapElement = document.getElementById('map');
        if (!mapElement) {
            console.error('❌ Map element not found');
            return;
        }

        mapElement.innerHTML = `
            <!-- FIXED: Hunt Status Panel with better info -->
            <div class="hunt-status-panel">
                <div class="hunt-status-grid">
                    <div class="hunt-status-item">
                        <div class="hunt-status-label">Nearby Tokens</div>
                        <div class="hunt-status-value" id="nearbyTokensCount">12</div>
                    </div>
                    <div class="hunt-status-item">
                        <div class="hunt-status-label">Distance</div>
                        <div class="hunt-status-value" id="closestTokenDistance">0.2 mi</div>
                    </div>
                    <div class="hunt-status-item">
                        <div class="hunt-status-label">Hunt Status</div>
                        <div class="hunt-status-value">
                            <div class="hunt-status-indicator">
                                <div class="hunt-status-dot"></div>
                                <span id="huntStatusText">Active</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- FIXED: Interactive Map Container -->
            <div class="interactive-map-container">
                <div class="map-interface">
                    <div class="phoenix-map-grid" id="phoenixMapGrid">
                        <div class="phoenix-user-marker" id="phoenixUserMarker"></div>
                        ${this.generatePhoenixMapMarkers()}
                    </div>
                    <div class="map-controls-panel">
                        <button class="map-control-button" id="mapZoomIn" title="Zoom In">+</button>
                        <button class="map-control-button" id="mapZoomOut" title="Zoom Out">-</button>
                        <button class="map-control-button" id="mapRecenter" title="Recenter">📍</button>
                    </div>
                </div>
            </div>

            <!-- FIXED: Token Locations Slider -->
            <div class="token-locations-slider" id="tokenLocationsSlider">
                <div class="slider-handle">
                    <div class="slider-handle-bar"></div>
                    <div class="slider-handle-text">Nearby $Ember Tokens</div>
                </div>
                <div class="token-locations-content">
                    <div class="token-locations-header">
                        <div class="locations-title">
                            <div class="locations-icon"></div>
                            Token Locations
                        </div>
                        <div class="locations-count" id="locationsCount">${this.emberTokens.length} Available</div>
                    </div>
                    <div class="token-list" id="tokenList">
                        ${this.generateTokenList()}
                    </div>
                </div>
            </div>
        `;

        this.setupMapControls();
        this.updateNearbyTokensCount();
        
        console.log('✅ Enhanced Phoenix token map created');
    }

    generatePhoenixMapMarkers() {
        return this.emberTokens.map((token, index) => {
            const isCollected = this.isTokenCollected(token.id);
            
            // Position tokens around Phoenix area (simplified grid)
            const x = 20 + (index % 4) * 20;
            const y = 20 + Math.floor(index / 4) * 15;
            
            return `
                <div class="phoenix-location-marker ${isCollected ? 'collected' : ''}" 
                     style="left: ${x}%; top: ${y}%;"
                     data-token-id="${token.id}"
                     title="${token.location} - ${token.value} $Ember">
                    ${token.value}
                </div>
            `;
        }).join('');
    }

    generateTokenList() {
        // Sort tokens by distance (simulated for demo)
        const tokensWithDistance = this.emberTokens.map(token => {
            const distance = this.userLat && this.userLng ? 
                this.calculateDistance(this.userLat, this.userLng, token.lat, token.lng) : 
                Math.random() * 5;
            return { ...token, distance };
        });

        const sortedTokens = tokensWithDistance.sort((a, b) => a.distance - b.distance);
        
        return sortedTokens.map(token => {
            const isCollected = this.isTokenCollected(token.id);
            
            return `
                <div class="token-list-item ${isCollected ? 'collected' : ''}" data-token-id="${token.id}">
                    <div class="token-item-header">
                        <div class="token-item-icon ${isCollected ? 'collected' : ''}"></div>
                        <div class="token-item-info">
                            <div class="token-item-location">${token.location}</div>
                            <div class="token-item-sponsor">${token.sponsor}</div>
                        </div>
                        <div class="token-item-value ${isCollected ? 'collected' : ''}">${token.value} $E</div>
                    </div>
                    <div class="token-item-details">
                        <div class="token-item-distance">${this.formatDistance(token.distance)}</div>
                        <div class="token-item-status ${isCollected ? 'collected' : ''}">${isCollected ? 'Collected' : 'Available'}</div>
                    </div>
                    <div class="token-tier-indicator token-tier-${token.tier}"></div>
                </div>
            `;
        }).join('');
    }

    setupMapControls() {
        // Map controls
        const zoomInBtn = document.getElementById('mapZoomIn');
        const zoomOutBtn = document.getElementById('mapZoomOut');
        const recenterBtn = document.getElementById('mapRecenter');

        if (zoomInBtn) {
            zoomInBtn.addEventListener('click', () => {
                console.log('🔍 Zoom in');
                this.animateMapControl(zoomInBtn);
            });
        }

        if (zoomOutBtn) {
            zoomOutBtn.addEventListener('click', () => {
                console.log('🔍 Zoom out');
                this.animateMapControl(zoomOutBtn);
            });
        }

        if (recenterBtn) {
            recenterBtn.addEventListener('click', () => {
                console.log('📍 Recenter map');
                this.animateMapControl(recenterBtn);
                this.recenterMap();
            });
        }

        // Token markers
        document.querySelectorAll('.phoenix-location-marker').forEach(marker => {
            marker.addEventListener('click', (e) => {
                const tokenId = parseInt(e.currentTarget.dataset.tokenId);
                const token = this.emberTokens.find(t => t.id === tokenId);
                if (token) {
                    // FIXED: Only show navigation, prevent collection on map
                    this.showNavigationModal(token);
                }
            });
        });

        // Token list items
        document.querySelectorAll('.token-list-item').forEach(item => {
            item.addEventListener('click', (e) => {
                const tokenId = parseInt(e.currentTarget.dataset.tokenId);
                const token = this.emberTokens.find(t => t.id === tokenId);
                if (token) {
                    const isCollected = this.isTokenCollected(tokenId);
                    if (isCollected) {
                        this.showTokenDetails(token);
                    } else {
                        this.showNavigationModal(token);
                    }
                }
            });
        });
    }

    animateMapControl(button) {
        button.style.transform = 'scale(0.95)';
        setTimeout(() => {
            button.style.transform = 'scale(1)';
        }, 150);
    }

    recenterMap() {
        const userMarker = document.getElementById('phoenixUserMarker');
        if (userMarker) {
            userMarker.style.animation = 'userLocationPulse 1s ease-in-out';
            setTimeout(() => {
                userMarker.style.animation = 'userLocationPulse 2s ease-in-out infinite';
            }, 1000);
        }
    }

    // FIXED: Token Slider Toggle
    toggleTokenSlider() {
        const slider = document.getElementById('tokenLocationsSlider');
        const handleText = document.querySelector('.slider-handle-text');
        
        if (!slider) return;
        
        this.isTokenSliderExpanded = !this.isTokenSliderExpanded;
        
        if (this.isTokenSliderExpanded) {
            slider.classList.add('expanded');
            if (handleText) handleText.textContent = 'Hide Token List';
            console.log('📋 Token slider expanded');
        } else {
            slider.classList.remove('expanded');
            if (handleText) handleText.textContent = 'Nearby $Ember Tokens';
            console.log('📋 Token slider collapsed');
        }
        
        // Haptic feedback
        if (navigator.vibrate) {
            navigator.vibrate(30);
        }
    }

    createTokenSlider() {
        // This is called after map creation to ensure slider is properly set up
        console.log('📋 Token slider created and configured');
    }

    updateNearbyTokensCount() {
        const availableTokens = this.emberTokens.filter(token => !this.isTokenCollected(token.id));
        const nearbyCount = document.getElementById('nearbyTokensCount');
        const locationsCount = document.getElementById('locationsCount');
        
        if (nearbyCount) nearbyCount.textContent = availableTokens.length;
        if (locationsCount) locationsCount.textContent = `${availableTokens.length} Available`;
        
        // Update closest token distance
        if (this.userLat && this.userLng && availableTokens.length > 0) {
            const distances = availableTokens.map(token => 
                this.calculateDistance(this.userLat, this.userLng, token.lat, token.lng)
            );
            const closestDistance = Math.min(...distances);
            const distanceElement = document.getElementById('closestTokenDistance');
            if (distanceElement) {
                distanceElement.textContent = this.formatDistance(closestDistance);
            }
        }
    }

    updateHuntLocationDisplay() {
        // This would update location display in hunt status panel
        console.log('📍 Hunt location display updated');
    }

    updateHuntStatus(message, isError = false) {
        try {
            const statusText = document.getElementById('huntStatusText');
            
            if (statusText) {
                statusText.textContent = isError ? 'Error' : 'Active';
                statusText.style.color = isError ? '#f44336' : '#4CAF50';
            }
            
            console.log(`🎯 Hunt status: ${message}`);
        } catch (error) {
            console.error('❌ Hunt status update error:', error);
        }
    }

    // PROXIMITY DETECTION SYSTEM - Enhanced
    startProximityCheck() {
        console.log('📡 Starting enhanced proximity detection...');
        
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
