// Vault Phoenix AR Crypto Gaming - Complete Fixed Game Engine
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
        this.fixedCoinPosition = { x: 50, y: 50 };
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

        // Themed Adventure Campaigns
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
                locations: [1, 10, 5],
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
                console.log('📱 Login page detected');
                this.setupLoginListeners();
                this.loadSavedCredentials();
                console.log('✅ Login page initialized');
            } else if (document.getElementById('container')) {
                console.log('🎮 Dashboard page detected');
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
        console.log('🔧 Setting up login listeners...');
        const loginForm = document.getElementById('loginForm');
        const forgotPassword = document.getElementById('forgotPassword');
        
        if (loginForm) {
            loginForm.addEventListener('submit', (e) => {
                console.log('📝 Login form submitted');
                this.handleLogin(e);
            });
            console.log('✅ Login form listener added');
        } else {
            console.error('❌ Login form not found');
        }
        
        if (forgotPassword) {
            forgotPassword.addEventListener('click', (e) => {
                console.log('🔑 Forgot password clicked');
                this.handleForgotPassword(e);
            });
            console.log('✅ Forgot password listener added');
        } else {
            console.error('❌ Forgot password link not found');
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
        
        if (emailInput) {
            emailInput.value = 'demo@vaultphoenix.com';
            console.log('📧 Email pre-filled');
        }
        if (passwordInput) {
            passwordInput.value = 'phoenix123';
            console.log('🔐 Password pre-filled');
        }
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
        console.log('🔐 Handling login...');
        
        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value;
        const loginBtn = document.getElementById('loginBtn');
        const loginText = document.getElementById('loginText');
        const container = document.querySelector('.login-container');

        console.log('📧 Email:', email);
        console.log('🔐 Password length:', password.length);

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

        // Show loading state
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
                loginText.innerHTML = `✅ Access Granted!`;
            }
            if (loginBtn) loginBtn.style.background = 'linear-gradient(135deg, #4CAF50, #45a049)';
            
            this.showSuccess('Login successful! Launching AR $Ember Hunt...');
            
            this.storeSession(email);
            
            setTimeout(() => {
                console.log('🚀 Redirecting to dashboard...');
                window.location.href = 'dashboard.html';
            }, 1500);

        } catch (error) {
            console.error('❌ Login error:', error);
            
            // Reset UI state
            if (loginBtn) loginBtn.style.transform = 'scale(1)';
            if (loginText) {
                loginText.innerHTML = `
                    <img src="../images/VPEmberFlame.svg" alt="Ember Flame" class="login-flame-icon">
                    Start $Ember Hunt
                `;
            }
            if (container) container.classList.remove('loading');
            
            this.showError(error.message);
            
            // Shake animation
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
        console.log('🔍 Authenticating user...');
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

        console.log('✅ Authentication result:', isValid);

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
        console.log('💾 Session stored:', sessionData);
    }

    generateSessionId() {
        return Math.random().toString(36).substring(2) + Date.now().toString(36);
    }

    showError(message) {
        console.log('❌ Showing error:', message);
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
        console.log('✅ Showing success:', message);
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
        console.log('🔑 Forgot password clicked');
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

            // Token Slider Handle
            const sliderHandle = document.querySelector('.slider-handle');
            if (sliderHandle) {
                sliderHandle.addEventListener('click', () => this.toggleTokenSlider());
            }

            console.log('✅ Enhanced event listeners setup complete');
        } catch (error) {
            console.error('❌ Event listener error:', error);
        }
    }

    // MENU SYSTEM
    toggleMenu() {
        const menu = document.getElementById('sideMenu');
        const overlay = document.getElementById('menuOverlay');
        const menuIcon = document.getElementById('menuIcon');
        
        if (menu && overlay) {
            const isOpen = menu.classList.contains('open');
            
            if (isOpen) {
                menu.classList.remove('open');
                overlay.classList.remove('active');
                if (menuIcon) menuIcon.textContent = '☰';
            } else {
                menu.classList.add('open');
                overlay.classList.add('active');
                if (menuIcon) menuIcon.textContent = '✕';
            }
        }
    }

    closeMenu() {
        const menu = document.getElementById('sideMenu');
        const overlay = document.getElementById('menuOverlay');
        const menuIcon = document.getElementById('menuIcon');
        
        if (menu && overlay) {
            menu.classList.remove('open');
            overlay.classList.remove('active');
            if (menuIcon) menuIcon.textContent = '☰';
        }
    }

    goHome() {
        this.switchMode('map');
        this.closeMenu();
    }

    // MODE SWITCHING
    switchMode(mode) {
        console.log('🔄 Switching to mode:', mode);
        
        this.currentMode = mode;
        
        // Hide all views
        const views = ['map', 'vault-view', 'campaigns-view'];
        views.forEach(view => {
            const element = document.getElementById(view) || document.querySelector(`.${view}`);
            if (element) {
                element.style.display = 'none';
            }
        });

        // Update navigation states
        document.querySelectorAll('.nav-tab').forEach(tab => {
            tab.classList.remove('active');
        });
        
        document.querySelectorAll('.menu-item').forEach(item => {
            item.classList.remove('active');
        });

        // Show selected view and update nav
        const targetTab = document.querySelector(`[data-mode="${mode}"]`);
        if (targetTab) {
            targetTab.classList.add('active');
        }

        switch (mode) {
            case 'map':
                document.getElementById('map').style.display = 'block';
                this.hideARElements();
                this.showMapElements();
                break;
            case 'ar':
                this.startARMode();
                break;
            case 'vault':
                document.getElementById('vaultView').style.display = 'block';
                this.hideARElements();
                this.hideMapElements();
                this.generateTokenHistory();
                break;
            case 'campaigns':
                document.getElementById('campaignsView').style.display = 'block';
                this.hideARElements();
                this.hideMapElements();
                this.updateCampaignDisplay();
                break;
        }
    }

    hideARElements() {
        const arElements = ['video', 'canvas', 'arEmberCoin', 'arInstructions'];
        arElements.forEach(id => {
            const element = document.getElementById(id);
            if (element) {
                element.style.display = 'none';
            }
        });
    }

    showMapElements() {
        const mapElements = ['huntStatusPanel', 'tokenLocationsSlider'];
        mapElements.forEach(id => {
            const element = document.getElementById(id) || document.querySelector(`.${id.replace(/([A-Z])/g, '-$1').toLowerCase()}`);
            if (element) {
                element.style.display = 'block';
            }
        });
    }

    hideMapElements() {
        const mapElements = ['huntStatusPanel', 'tokenLocationsSlider'];
        mapElements.forEach(id => {
            const element = document.getElementById(id) || document.querySelector(`.${id.replace(/([A-Z])/g, '-$1').toLowerCase()}`);
            if (element) {
                element.style.display = 'none';
            }
        });
    }

    startARMode() {
        console.log('📱 Starting AR mode...');
        
        document.getElementById('map').style.display = 'none';
        this.hideMapElements();
        
        const video = document.getElementById('video');
        const canvas = document.getElementById('canvas');
        const arCoin = document.getElementById('arEmberCoin');
        const arInstructions = document.getElementById('arInstructions');
        
        if (video) video.style.display = 'block';
        if (canvas) canvas.style.display = 'block';
        if (arCoin) arCoin.style.display = 'block';
        if (arInstructions) {
            arInstructions.style.display = 'block';
            arInstructions.classList.add('show');
        }
        
        this.setupCamera();
        this.startCompass();
    }

    // STUB METHODS FOR MISSING FUNCTIONALITY
    initializeVault() {
        console.log('💎 Initializing vault...');
        this.generateTokenHistory();
    }

    initializeCampaigns() {
        console.log('🏆 Initializing campaigns...');
        this.updateCampaignDisplay();
    }

    generateTokenHistory() {
        const historyContainer = document.getElementById('tokenHistory');
        if (!historyContainer) return;

        historyContainer.innerHTML = '';

        if (this.collectedTokens.length === 0) {
            const demoHistory = [
                { name: 'Welcome Bonus', value: 50, location: 'Vault Phoenix HQ', timestamp: new Date(Date.now() - 86400000), tier: 'low' },
                { name: 'Tutorial Complete', value: 25, location: 'Getting Started', timestamp: new Date(Date.now() - 172800000), tier: 'low' }
            ];

            demoHistory.forEach(item => {
                const historyItem = this.createHistoryItem(item);
                historyContainer.appendChild(historyItem);
            });
        } else {
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
    }

    addHapticFeedback() {
        // Add haptic feedback to interactive elements
        try {
            const interactiveElements = document.querySelectorAll('.nav-tab, .token-action-btn, .vault-action-btn, .filter-btn, .menu-item, .ar-ember-coin, .history-item');
            
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

    toggleTokenSlider() {
        const slider = document.getElementById('tokenLocationsSlider');
        const handleText = document.querySelector('.slider-handle-text');
        
        if (!slider) return;
        
        this.isTokenSliderExpanded = !this.isTokenSliderExpanded;
        
        if (this.isTokenSliderExpanded) {
            slider.classList.add('expanded');
            if (handleText) handleText.textContent = 'Hide Token List';
        } else {
            slider.classList.remove('expanded');
            if (handleText) handleText.textContent = 'Nearby $Ember Tokens';
        }
    }

    filterVault(filter) {
        console.log('🔍 Filtering vault:', filter);
    }

    startAdventure(adventureId) {
        console.log('🚀 Starting adventure:', adventureId);
        alert(`Starting ${adventureId} adventure!`);
    }

    openAdventureMap() {
        console.log('🗺️ Opening adventure map...');
    }

    // CAMERA AND AR STUB METHODS
    async setupCamera() {
        console.log('📹 Setting up camera...');
        try {
            const video = document.getElementById('video');
            if (video) {
                this.cameraStream = await navigator.mediaDevices.getUserMedia({ 
                    video: { facingMode: 'environment' } 
                });
                video.srcObject = this.cameraStream;
            }
        } catch (error) {
            console.warn('Camera access denied or not available');
        }
    }

    startCompass() {
        console.log('🧭 Starting compass...');
    }

    // GAME MECHANICS STUB METHODS
    async start() {
        console.log('🚀 Starting game...');
        this.isStarted = true;
        const startBtn = document.getElementById('startBtn');
        if (startBtn) startBtn.style.display = 'none';
        
        this.createPhoenixMap();
        this.updateHuntStatus("Ready! Start hunting for $Ember tokens!", false);
    }

    createPhoenixMap() {
        console.log('🗺️ Creating Phoenix map...');
        const mapElement = document.getElementById('map');
        if (!mapElement) return;

        mapElement.innerHTML = `
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

            <div class="interactive-map-container">
                <div class="map-interface">
                    <div class="phoenix-map-grid" id="phoenixMapGrid">
                        <div class="phoenix-user-marker" id="phoenixUserMarker"></div>
                        ${this.generatePhoenixMapMarkers()}
                    </div>
                </div>
            </div>

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
    }

    generatePhoenixMapMarkers() {
        return this.emberTokens.map((token, index) => {
            const isCollected = this.isTokenCollected(token.id);
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
        return this.emberTokens.map(token => {
            const isCollected = this.isTokenCollected(token.id);
            const distance = Math.random() * 5;
            
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
                        <div class="token-item-distance">${distance.toFixed(1)} mi</div>
                        <div class="token-item-status ${isCollected ? 'collected' : ''}">${isCollected ? 'Collected' : 'Available'}</div>
                    </div>
                    <div class="token-tier-indicator token-tier-${token.tier}"></div>
                </div>
            `;
        }).join('');
    }

    setupMapControls() {
        // Add event listeners for map markers and controls
        document.querySelectorAll('.phoenix-location-marker').forEach(marker => {
            marker.addEventListener('click', (e) => {
                const tokenId = parseInt(e.currentTarget.dataset.tokenId);
                const token = this.emberTokens.find(t => t.id === tokenId);
                if (token) {
                    this.showNavigationModal(token);
                }
            });
        });

        // Re-add slider handle listener
        const sliderHandle = document.querySelector('.slider-handle');
        if (sliderHandle) {
            sliderHandle.addEventListener('click', () => this.toggleTokenSlider());
        }
    }

    isTokenCollected(tokenId) {
        return this.collectedTokens.some(token => token.id === tokenId);
    }

    updateHuntStatus(message, isError = false) {
        console.log(`🎯 Hunt status: ${message}`);
    }

    // MODAL METHODS
    showNavigationModal(token) {
        console.log('🗺️ Showing navigation for:', token.location);
        alert(`Navigate to ${token.location} - ${token.value} $Ember tokens available!`);
    }

    showSponsorDetails() {
        console.log('ℹ️ Showing sponsor details');
    }

    hideSponsorDetails() {
        console.log('⬅️ Hiding sponsor details');
    }

    handleSponsorAction() {
        console.log('🎯 Handling sponsor action');
    }

    onEmberCoinClick() {
        console.log('💰 Ember coin clicked');
    }

    showLogoutConfirmation() {
        const overlay = document.getElementById('logoutOverlay');
        if (overlay) {
            overlay.style.display = 'flex';
        }
    }

    hideLogoutConfirmation() {
        const overlay = document.getElementById('logoutOverlay');
        if (overlay) {
            overlay.style.display = 'none';
        }
    }

    logout() {
        sessionStorage.removeItem('vaultPhoenixSession');
        localStorage.removeItem('vaultPhoenixTokens');
        window.location.href = 'index.html';
    }

    hideNavigationModal() {
        console.log('❌ Hiding navigation modal');
    }

    openMapsNavigation(mode) {
        console.log('🗺️ Opening maps navigation:', mode);
    }

    startARHunt() {
        this.switchMode('ar');
    }

    transferToCoinbase() {
        console.log('🏦 Transferring to Coinbase');
        alert('Coinbase transfer feature would be implemented here!');
    }

    showQRCode() {
        const modal = document.getElementById('qrModal');
        if (modal) {
            modal.style.display = 'flex';
        }
    }

    hideQRCode() {
        const modal = document.getElementById('qrModal');
        if (modal) {
            modal.style.display = 'none';
        }
    }

    openCoinbaseWallet() {
        console.log('🏦 Opening Coinbase Wallet');
        alert('Coinbase Wallet integration would be implemented here!');
    }

    showHowToPlay() {
        const modal = document.getElementById('howToPlayModal');
        if (modal) {
            modal.style.display = 'flex';
        }
    }

    hideHowToPlay() {
        const modal = document.getElementById('howToPlayModal');
        if (modal) {
            modal.style.display = 'none';
        }
    }

    startPlayingFromTutorial() {
        this.hideHowToPlay();
        this.switchMode('map');
        if (!this.isStarted) {
            this.start();
        }
    }

    // UTILITY METHODS
    calculateDistance(lat1, lng1, lat2, lng2) {
        const R = 3958.756; // Radius of the Earth in miles
        const dLat = this.deg2rad(lat2 - lat1);
        const dLng = this.deg2rad(lng2 - lng1);
        const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
                  Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) *
                  Math.sin(dLng/2) * Math.sin(dLng/2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
        return R * c;
    }

    deg2rad(deg) {
        return deg * (Math.PI/180);
    }

    formatDistance(distance) {
        if (distance < 0.1) return '< 0.1 mi';
        return `${distance.toFixed(1)} mi`;
    }

    showLoading(show) {
        const overlay = document.getElementById('loadingOverlay');
        if (overlay) {
            overlay.style.display = show ? 'flex' : 'none';
        }
    }
}

// Initialize the game when the script loads
console.log('🚀 Initializing Vault Phoenix...');
new VaultPhoenixCryptoGame();
