// Vault Phoenix AR Crypto Gaming - Complete JavaScript
// Revolutionary AR Crypto Gaming System

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

        // Initialize when DOM is ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.init());
        } else {
            setTimeout(() => this.init(), 100);
        }

        // Make app globally accessible
        window.vaultPhoenixApp = this;
    }

    init() {
        console.log('🔧 Initializing Vault Phoenix AR Crypto Game...');
        try {
            this.ensureSession();
            this.loadUserInfo();
            this.loadCollectedTokens();
            this.setupEventListeners();
            this.initializeVault();
            this.addHapticFeedback();
            
            // Set dashboard body class if on dashboard page
            if (window.location.pathname.includes('dashboard')) {
                document.body.classList.add('dashboard');
            }
            
            console.log('✅ Vault Phoenix initialized successfully');
        } catch (error) {
            console.error('❌ Initialization error:', error);
            this.collectedTokens = [];
            this.totalTokenValue = 0;
            this.updateVaultStats();
        }
    }

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
                menuEmberCount: document.getElementById('menuEmberCount'),
                vaultBalance: document.getElementById('vaultBalance'),
                vaultUsdValue: document.getElementById('vaultUsdValue'),
                tokensFound: document.getElementById('tokensFound'),
                qrTokenAmount: document.getElementById('qrTokenAmount'),
                qrTokenValue: document.getElementById('qrTokenValue')
            };
            
            const usdValue = (this.totalTokenValue * 0.001).toFixed(2); // $0.001 per $Ember
            
            if (elements.emberCount) elements.emberCount.textContent = `${this.totalTokenValue} $Ember`;
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

    // Login System (for index.html)
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
        this.loadSavedCredentials();
    }

    loadSavedCredentials() {
        const emailInput = document.getElementById('email');
        const passwordInput = document.getElementById('password');
        
        if (emailInput) emailInput.value = 'demo@vaultphoenix.com';
        if (passwordInput) passwordInput.value = 'phoenix123';
    }

    animateInput(input, focused) {
        const container = input.closest('.form-group');
        if (focused) {
            container.style.transform = 'scale(1.01)';
            container.style.zIndex = '10';
        } else {
            container.style.transform = 'scale(1)';
            container.style.zIndex = '1';
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

        container.classList.add('loading');
        loginText.innerHTML = '<span class="loading-spinner"></span>Authenticating...';
        
        loginBtn.style.transform = 'scale(0.98)';

        try {
            await this.authenticateUser(email, password);
            
            loginText.textContent = '✅ Access Granted!';
            loginBtn.style.background = 'linear-gradient(135deg, #4CAF50, #45a049)';
            
            this.showSuccess('Login successful! Launching AR Crypto Hunt...');
            
            this.storeSession(email);
            
            setTimeout(() => {
                window.location.href = 'dashboard.html';
            }, 1500);

        } catch (error) {
            loginBtn.style.transform = 'scale(1)';
            loginText.textContent = '🔥 Start Crypto Hunt';
            container.classList.remove('loading');
            
            this.showError(error.message);
            
            container.style.animation = 'shake 0.5s ease-in-out';
            setTimeout(() => {
                container.style.animation = '';
            }, 500);
        }
    }

    focusInput(input) {
        input.focus();
        input.select();
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
            throw new Error('Invalid credentials. Try: demo@vaultphoenix.com');
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

    // Main Game Logic
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
            
            const headingEl = document.getElementById('heading');
            if (headingEl) {
                headingEl.textContent = this.heading;
            }
        }, 50);
    }

    setupOrientationListener() {
        console.log('🎯 Setting up real orientation listener...');
        
        if (this.isCompassActive) {
            return;
        }
        
        this.isCompassActive = true;
        
        const handleOrientation = (event) => {
            try {
                let heading = null;
                
                if (event.webkitCompassHeading !== undefined && event.webkitCompassHeading !== null) {
                    heading = event.webkitCompassHeading;
                    this.hasReceivedOrientationData = true;
                    console.log('📱 iOS compass data received');
                } else if (event.alpha !== null && event.alpha !== undefined) {
                    heading = 360 - event.alpha;
                    this.hasReceivedOrientationData = true;
                    console.log('🤖 Android compass data received');
                }
                
                if (heading !== null && !isNaN(heading)) {
                    this.heading = Math.round(heading);
                    this.updateCompass(this.heading);
                    
                    const headingEl = document.getElementById('heading');
                    if (headingEl) {
                        headingEl.textContent = this.heading;
                    }
                    
                    if (!this.statusUpdatedForCompass) {
                        this.updateStatus('Compass active', false);
                        this.statusUpdatedForCompass = true;
                    }
                }
            } catch (error) {
                console.error('❌ Orientation event error:', error);
            }
        };

        window.addEventListener('deviceorientation', handleOrientation, true);
        this.orientationHandler = handleOrientation;
        
        setTimeout(() => {
            if (!this.hasReceivedOrientationData) {
                console.log('⚠️ No real compass data received after timeout, using fallback');
                window.removeEventListener('deviceorientation', handleOrientation, true);
                this.isCompassActive = false;
                this.setupFallbackCompass();
            }
        }, 3000);
    }

    updateCompass(heading) {
        try {
            const needle = document.getElementById('compassNeedle');
            if (needle) {
                needle.style.transform = `translate(-50%, -50%) rotate(${heading}deg)`;
            }
        } catch (error) {
            console.error('❌ Compass update error:', error);
        }
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

    // Navigation System
    showNavigationModal(tokenLocation) {
        try {
            if (!tokenLocation) {
                console.warn('No token location provided');
                return;
            }

            this.currentNavigationToken = tokenLocation;
            const modal = document.getElementById('navigationModal');
            
            document.getElementById('navCoinValue').textContent = `${tokenLocation.value} $Ember`;
            
            if (this.userLat && this.userLng) {
                const distance = this.calculateDistance(
                    this.userLat, this.userLng,
                    tokenLocation.lat, tokenLocation.lng
                );
                
                document.getElementById('navDistance').textContent = this.formatDistance(distance);
                
                const walkTime = Math.ceil(distance * 20);
                const driveTime = Math.ceil(distance * 2);
                
                document.getElementById('navWalkTime').textContent = this.formatTime(walkTime);
                document.getElementById('navDriveTime').textContent = this.formatTime(driveTime);
            } else {
                document.getElementById('navDistance').textContent = 'Distance calculating...';
                document.getElementById('navWalkTime').textContent = '~5 min';
                document.getElementById('navDriveTime').textContent = '~2 min';
            }
            
            modal.style.display = 'flex';
            
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

            const destination = `${this.currentNavigationToken.lat},${this.currentNavigationToken.lng}`;
            const travelModeParam = travelMode === 'driving' ? 'driving' : 'walking';
            
            const mapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${destination}&travelmode=${travelModeParam}`;
            
            window.open(mapsUrl, '_blank');
            this.hideNavigationModal();
            
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
            const icon = document.getElementById('menuIcon');
            
            if (!menu || !overlay || !icon) return;
            
            const isOpen = menu.classList.contains('open');
            
            if (isOpen) {
                this.closeMenu();
            } else {
                menu.classList.add('open');
                overlay.classList.add('active');
                icon.textContent = '✕';
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
            const icon = document.getElementById('menuIcon');
            
            if (menu) menu.classList.remove('open');
            if (overlay) overlay.classList.remove('active');
            if (icon) icon.textContent = '☰';
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
            sessionStorage.removeItem('vaultPhoenixSession');
            
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

    switchMode(mode) {
        if (mode === this.currentMode) return;
        
        console.log('🔄 Switching to mode:', mode);
        this.currentMode = mode;
        this.updateNavigationState();
        this.updateModeIndicator();
        this.hideTokenDiscovery();
        this.hideEmberCoin();
        
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

    updateModeIndicator() {
        try {
            const indicator = document.getElementById('modeIndicator');
            if (!indicator) return;
            
            indicator.className = 'mode-indicator';
            
            switch (this.currentMode) {
                case 'map':
                case 'ar':
                    indicator.style.display = 'none';
                    break;
                case 'vault':
                    indicator.classList.add('vault-mode');
                    indicator.innerHTML = '<span class="control-icon">💎</span><span>VAULT</span>';
                    break;
            }
        } catch (error) {
            console.error('❌ Mode indicator error:', error);
        }
    }

    switchToMap() {
        console.log('🗺️ Switching to Map mode');
        try {
            document.getElementById('map').style.display = 'block';
            document.getElementById('video').style.display = 'none';
            document.getElementById('canvas').style.display = 'none';
            document.getElementById('vaultView').style.display = 'none';
            
            this.hideARInstructions();
            this.hideEmberCoin();
            this.stopCamera();
            this.updateMapLocation();
        } catch (error) {
            console.error('❌ Map switch error:', error);
        }
    }

    async switchToAR() {
        console.log('📱 Switching to AR mode');
        try {
            document.getElementById('map').style.display = 'none';
            document.getElementById('video').style.display = 'block';
            document.getElementById('canvas').style.display = 'block';
            document.getElementById('vaultView').style.display = 'none';
            
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

    switchToVault() {
        console.log('💎 Switching to Vault mode');
        try {
            document.getElementById('map').style.display = 'none';
            document.getElementById('video').style.display = 'none';
            document.getElementById('canvas').style.display = 'none';
            document.getElementById('vaultView').style.display = 'block';
            
            this.hideARInstructions();
            this.hideEmberCoin();
            this.stopCamera();
            this.initializeVault();
        } catch (error) {
            console.error('❌ Vault switch error:', error);
        }
    }

    async startCamera() {
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
            
            return new Promise((resolve) => {
                video.onloadedmetadata = () => {
                    video.play();
                    resolve();
                };
            });
        } catch (error) {
            console.error('❌ Camera start error:', error);
            throw new Error('Camera access denied or not available');
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
                console.log('💎 Ember coin shown');
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

    collectRandomToken() {
        try {
            const availableTokens = this.emberTokens.filter(token => 
                !this.collectedTokens.some(collected => collected.id === token.id)
            );
            
            const tokensToChooseFrom = availableTokens.length > 0 ? availableTokens : this.emberTokens;
            const randomToken = tokensToChooseFrom[Math.floor(Math.random() * tokensToChooseFrom.length)];
            
            this.showTokenDiscovery(randomToken);
            console.log('💎 Random token shown:', randomToken.location, randomToken.value, '$Ember');
        } catch (error) {
            console.error('❌ Random token error:', error);
        }
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

    initializeVault() {
        console.log('💎 Initializing vault...');
        try {
            this.updateTokenHistory();
            this.updateVaultStats();
            console.log('✅ Vault initialized with', this.collectedTokens.length, 'tokens');
        } catch (error) {
            console.error('❌ Vault initialization error:', error);
        }
    }

    updateTokenHistory() {
        try {
            const tokenHistory = document.getElementById('tokenHistory');
            if (!tokenHistory) return;

            tokenHistory.innerHTML = '';
            
            if (this.collectedTokens.length === 0) {
                tokenHistory.innerHTML = `
                    <div style="text-align: center; padding: 40px; color: rgba(255, 255, 255, 0.6);">
                        <div style="font-size: 48px; margin-bottom: 16px;">💎</div>
                        <h3 style="margin-bottom: 8px;">No tokens collected yet</h3>
                        <p>Start your AR hunt to collect $Ember tokens!</p>
                    </div>
                `;
                return;
            }
            
            // Sort tokens by collection time (most recent first)
            const sortedTokens = [...this.collectedTokens].sort((a, b) => 
                new Date(b.collectedAt) - new Date(a.collectedAt)
            );
            
            sortedTokens.forEach(token => {
                const historyItem = document.createElement('div');
                historyItem.className = 'token-history-item';
                historyItem.dataset.rarity = token.rarity;
                
                const timeAgo = this.formatTimeAgo(new Date(token.collectedAt));
                const usdValue = (token.value * 0.001).toFixed(3);
                
                historyItem.innerHTML = `
                    <div class="token-history-icon">💎</div>
                    <div class="token-history-details">
                        <div class="token-history-amount">${token.value} $Ember</div>
                        <div class="token-history-time">${timeAgo} • ${token.location}</div>
                    </div>
                    <div class="token-history-value">${usdValue}</div>
                `;
                
                tokenHistory.appendChild(historyItem);
            });
            
            console.log('✅ Token history updated with', sortedTokens.length, 'tokens');
        } catch (error) {
            console.error('❌ Token history update error:', error);
        }
    }

    formatTimeAgo(date) {
        const now = new Date();
        const diffMs = now - date;
        const diffMins = Math.floor(diffMs / 60000);
        const diffHours = Math.floor(diffMins / 60);
        const diffDays = Math.floor(diffHours / 24);
        
        if (diffMins < 1) return 'Just now';
        if (diffMins < 60) return `${diffMins}m ago`;
        if (diffHours < 24) return `${diffHours}h ago`;
        return `${diffDays}d ago`;
    }

    filterVault(filter) {
        try {
            document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
            const activeBtn = document.querySelector(`[data-filter="${filter}"]`);
            if (activeBtn) activeBtn.classList.add('active');

            const items = document.querySelectorAll('.token-history-item');
            items.forEach(item => {
                if (filter === 'all' || 
                    (filter === 'recent' && this.isRecent(item)) ||
                    (filter === 'high' && this.isHighValue(item)) ||
                    item.dataset.rarity === filter) {
                    item.style.display = 'flex';
                } else {
                    item.style.display = 'none';
                }
            });
            
            console.log('🔍 Vault filtered by:', filter);
        } catch (error) {
            console.error('❌ Vault filter error:', error);
        }
    }

    isRecent(item) {
        // Recent = collected in last 24 hours
        const timeText = item.querySelector('.token-history-time').textContent;
        return timeText.includes('Just now') || timeText.includes('m ago') || timeText.includes('h ago');
    }

    isHighValue(item) {
        // High value = 200+ $Ember
        const amountText = item.querySelector('.token-history-amount').textContent;
        const value = parseInt(amountText.replace(/\D/g, ''));
        return value >= 200;
    }

    showTokenDiscovery(token) {
        try {
            const elements = {
                rarity: document.getElementById('tokenRarity'),
                value: document.getElementById('tokenValue'),
                amount: document.getElementById('tokenAmount'),
                usdValue: document.getElementById('tokenUsdValue'),
                location: document.getElementById('tokenLocation'),
                discovery: document.getElementById('tokenDiscovery')
            };
            
            const usdValue = (token.value * 0.001).toFixed(3);
            
            if (elements.rarity) elements.rarity.textContent = token.rarity.toUpperCase();
            if (elements.value) elements.value.textContent = token.value;
            if (elements.amount) elements.amount.textContent = `${token.value} $Ember`;
            if (elements.usdValue) elements.usdValue.textContent = `${usdValue} USD`;
            if (elements.location) elements.location.textContent = `Found at ${token.location}`;
            
            this.currentDiscoveredToken = token;
            if (elements.discovery) elements.discovery.classList.add('show');
            
            console.log('💎 Token discovery shown:', token.location, token.value, '$Ember');
        } catch (error) {
            console.error('❌ Token discovery show error:', error);
        }
    }

    collectToken() {
        try {
            if (this.currentDiscoveredToken) {
                const collectedToken = {
                    ...this.currentDiscoveredToken,
                    collectedAt: new Date().toISOString()
                };
                
                this.collectedTokens.push(collectedToken);
                this.saveCollectedTokens();
                
                console.log('✅ Token collected:', collectedToken.location, collectedToken.value, '$Ember');
                
                this.hideTokenDiscovery();
                this.currentDiscoveredToken = null;
                
                if (this.currentMode === 'vault') {
                    this.initializeVault();
                }
                
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

    skipToken() {
        try {
            this.hideTokenDiscovery();
            this.currentDiscoveredToken = null;
            
            console.log('⏭️ Token skipped');
            
            if (this.currentMode === 'ar') {
                setTimeout(() => {
                    if (this.currentMode === 'ar') {
                        this.showTappableEmberCoin();
                    }
                }, 3000);
            }
        } catch (error) {
            console.error('❌ Token skip error:', error);
        }
    }

    // Coinbase Integration
    transferToCoinbase() {
        try {
            if (this.totalTokenValue === 0) {
                alert('No $Ember tokens to transfer. Start hunting to collect tokens!');
                return;
            }

            // Simulate Coinbase transfer
            const transferAmount = this.totalTokenValue;
            const usdValue = (transferAmount * 0.001).toFixed(2);
            
            if (confirm(`Transfer ${transferAmount} $Ember tokens (${usdValue} USD) to your Coinbase wallet?`)) {
                // Simulate transfer process
                this.updateStatus('Transferring to Coinbase wallet...', false);
                
                setTimeout(() => {
                    this.updateStatus(`Successfully transferred ${transferAmount} $Ember to Coinbase!`, false);
                    
                    // In a real implementation, tokens would be transferred
                    // For demo, we'll keep them in the vault
                    console.log(`💸 Transferred ${transferAmount} $Ember to Coinbase wallet`);
                }, 2000);
            }
        } catch (error) {
            console.error('❌ Coinbase transfer error:', error);
            this.updateStatus('Transfer failed. Please try again.', true);
        }
    }

    openCoinbaseWallet() {
        try {
            // Try to open Coinbase Wallet app, fallback to web
            const coinbaseUrl = 'https://wallet.coinbase.com/';
            window.open(coinbaseUrl, '_blank');
            
            console.log('🏦 Opening Coinbase Wallet');
            this.updateStatus('Opening Coinbase Wallet...', false);
        } catch (error) {
            console.error('❌ Coinbase wallet error:', error);
        }
    }

    showQRCode() {
        try {
            if (this.totalTokenValue === 0) {
                alert('No $Ember tokens to redeem. Start hunting to collect tokens!');
                return;
            }

            const modal = document.getElementById('qrModal');
            const qrContainer = document.getElementById('qrCodeContainer');
            
            // Generate QR code content (in real app, this would be a proper redemption code)
            const redemptionData = {
                userId: 'phoenix-hunter-' + Date.now(),
                tokenAmount: this.totalTokenValue,
                timestamp: new Date().toISOString(),
                signature: 'vp_' + Math.random().toString(36).substr(2, 9)
            };
            
            // Simulate QR code (in real app, use QR code library)
            qrContainer.innerHTML = `
                <div style="
                    width: 160px; 
                    height: 160px; 
                    background: #000; 
                    color: white; 
                    display: flex; 
                    align-items: center; 
                    justify-content: center; 
                    font-family: monospace; 
                    font-size: 10px; 
                    text-align: center; 
                    line-height: 1.2;
                    border-radius: 8px;
                    margin: 0 auto;
                ">
                    QR CODE<br/>
                    ${this.totalTokenValue}<br/>
                    $EMBER<br/>
                    ${redemptionData.signature}
                </div>
            `;
            
            modal.style.display = 'flex';
            
            console.log('📱 QR code generated for', this.totalTokenValue, '$Ember');
        } catch (error) {
            console.error('❌ QR code error:', error);
        }
    }

    hideQRCode() {
        try {
            const modal = document.getElementById('qrModal');
            if (modal) {
                modal.style.display = 'none';
            }
        } catch (error) {
            console.error('❌ Hide QR code error:', error);
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
                    
                    resolve();
                },
                (error) => {
                    reject(new Error(`GPS Error: ${error.message}`));
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
            this.tokenLocations = [...this.emberTokens];
            this.updateFallbackMap();
            console.log('🗺️ Generated', this.tokenLocations.length, 'token locations');
        } catch (error) {
            console.error('❌ Token location generation error:', error);
        }
    }

    initializeMap() {
        try {
            const mapElement = document.getElementById('map');
            if (!mapElement) {
                console.warn('Map element not found');
                return;
            }

            this.createFallbackMap();
            console.log('🗺️ Map initialized');
        } catch (error) {
            console.error('❌ Map initialization error:', error);
            this.createFallbackMap();
        }
    }

    createFallbackMap() {
        try {
            const mapElement = document.getElementById('map');
            if (!mapElement) return;

            mapElement.innerHTML = `
                <div class="map-fallback-content">
                    <div class="map-central-card">
                        <div class="map-card-icon">🔥</div>
                        <h2 class="map-title">Phoenix Crypto Hunt</h2>
                        <p class="map-description">
                            Switch to AR Hunt mode to find $Ember tokens around you!
                        </p>
                        <div class="map-location-box">
                            <div class="map-location-label">YOUR LOCATION</div>
                            <div class="map-location-coords">
                                <span id="fallbackLat">--</span>, <span id="fallbackLng">--</span>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="map-token-locations">
                    <div class="map-token-locations-label">$EMBER TOKENS NEARBY</div>
                    <div class="map-token-locations-icons" id="fallbackTokenCount">💎 💎 💎</div>
                    <div class="map-token-locations-hint">Tap tokens to navigate!</div>
                    <div style="display: flex; gap: 8px; justify-content: center; margin-top: 8px; flex-wrap: wrap;">
                        <button class="token-location-btn" onclick="vaultPhoenixApp.showNavigationModal(vaultPhoenixApp.tokenLocations[0])">
                            📍 ${this.emberTokens[0]?.value || 500} $Ember
                        </button>
                        <button class="token-location-btn" onclick="vaultPhoenixApp.showNavigationModal(vaultPhoenixApp.tokenLocations[1])">
                            📍 ${this.emberTokens[1]?.value || 250} $Ember
                        </button>
                        <button class="token-location-btn" onclick="vaultPhoenixApp.showNavigationModal(vaultPhoenixApp.tokenLocations[2])">
                            📍 ${this.emberTokens[2]?.value || 100} $Ember
                        </button>
                    </div>
                </div>
            `;

            this.updateFallbackMap();
        } catch (error) {
            console.error('❌ Fallback map creation error:', error);
        }
    }

    updateFallbackMap() {
        try {
            const latEl = document.getElementById('fallbackLat');
            const lngEl = document.getElementById('fallbackLng');
            
            if (latEl && this.userLat) latEl.textContent = this.userLat.toFixed(4);
            if (lngEl && this.userLng) lngEl.textContent = this.userLng.toFixed(4);
            
            const tokenCountEl = document.getElementById('fallbackTokenCount');
            if (tokenCountEl) {
                const tokenIcons = '💎 '.repeat(Math.min(this.tokenLocations.length, 6));
                tokenCountEl.textContent = tokenIcons || '🔍 Searching...';
            }
        } catch (error) {
            console.error('❌ Fallback map update error:', error);
        }
    }

    updateMapLocation() {
        this.updateFallbackMap();
    }

    updatePosition(position) {
        try {
            this.userLat = position.coords.latitude;
            this.userLng = position.coords.longitude;
            
            const latEl = document.getElementById('lat');
            const lngEl = document.getElementById('lng');
            
            if (latEl) latEl.textContent = this.userLat.toFixed(4);
            if (lngEl) lngEl.textContent = this.userLng.toFixed(4);
            
            this.updateFallbackMap();
        } catch (error) {
            console.error('❌ Position update error:', error);
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

    async start() {
        if (this.isStarted) return;
        this.isStarted = true;

        console.log('🔥 Starting Vault Phoenix AR Crypto Game...');
        
        const startBtn = document.getElementById('startBtn');
        if (startBtn) startBtn.style.display = 'none';
        
        this.showLoading(true);
        
        try {
            await this.setupGPS();
            this.initializeMap();
            this.setupThreeJS();
            this.generateTokenLocations();
            await this.initializeCompass();
            
            const arTab = document.getElementById('arTab');
            if (arTab) arTab.classList.remove('disabled');
            
            this.updateStatus("Ready! Start hunting for $Ember tokens!", false);
            this.showLoading(false);
            
            console.log('✅ Vault Phoenix started successfully');
        } catch (error) {
            console.error('❌ Start error:', error);
            this.updateStatus(`Error: ${error.message}`, true);
            this.showLoading(false);
        }
    }
    
    updateStatus(message, isError = false) {
        try {
            const statusText = document.getElementById('statusText');
            const statusDot = document.getElementById('statusDot');
            
            if (statusText) {
                statusText.textContent = message;
            }
            
            if (statusDot) {
                statusDot.className = isError ? 'status-dot error' : 'status-dot';
            }
        } catch (error) {
            console.error('❌ Status update error:', error);
        }
    }
}

// Initialize based on page
window.addEventListener('load', () => {
    console.log('🔥💎 Vault Phoenix AR Crypto Gaming loading...');
    try {
        const app = new VaultPhoenixCryptoGame();
        
        // Set up login listeners if on login page
        if (window.location.pathname.includes('index') || document.getElementById('loginForm')) {
            app.setupLoginListeners();
        }
        
        // Check existing session for auto-redirect
        const session = sessionStorage.getItem('vaultPhoenixSession');
        if (session && (window.location.pathname.includes('index') || window.location.pathname === '/')) {
            try {
                const sessionData = JSON.parse(session);
                const loginTime = new Date(sessionData.loginTime);
                const now = new Date();
                const hoursDiff = (now - loginTime) / (1000 * 60 * 60);
                
                if (hoursDiff < 24) {
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

// Console welcome message
console.log('%c🔥💎 VAULT PHOENIX - AR CRYPTO GAMING REVOLUTION', 'color: #f0a500; font-size: 24px; font-weight: bold; text-shadow: 2px 2px 4px rgba(0,0,0,0.3);');
console.log('%c🚀 Revolutionary AR gaming that lets you collect real $Ember tokens', 'color: #fb923c; font-size: 14px; font-weight: bold;');
console.log('%c📧 Contact: contact@vaultphoenix.com', 'color: #374151; font-size: 14px;');
console.log('%c🔥💎 From ashes to crypto greatness - Phoenix Rising!', 'color: #d73327; font-size: 12px; font-style: italic;');
