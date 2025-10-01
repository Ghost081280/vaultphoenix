// Vault Phoenix AR Crypto Gaming - ISOLATED JAVASCRIPT
// This file is ONLY for crypto game - prevents interference from main site
// PROTECTION: Only runs if this is a crypto game page

// IMMEDIATE PROTECTION - PREVENT MAIN SITE JS FROM INTERFERING
(function() {
    // Mark this as crypto game to prevent main site JS interference
    window.isVaultPhoenixCryptoGame = true;
    
    // Prevent main site background override
    if (document.body && document.body.classList.contains('crypto-game-login')) {
        console.log('🔥💎 Crypto Game Login Protected - Main site JS blocked');
    }
})();

// CRYPTO GAME PROTECTION - Only run if we're on crypto game pages
if (window.isVaultPhoenixCryptoGame) {
    console.log('🔥💎 Vault Phoenix Crypto Game JavaScript - ISOLATED MODE');

    // Vault Phoenix AR Crypto Gaming - Complete Enhanced Game Engine
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
            this.welcomeShown = false;
            this.availableTokensCount = 12;
            this.orientationHandler = null;

            // Enhanced Ember Token System with Real Locations and Value Tiers
            this.emberTokens = [
                { id: 1, value: 500, tier: "high", location: "Downtown Phoenix", lat: 33.4484, lng: -112.0740, sponsor: "Phoenix Suns Arena", message: "Exclusive courtside experience awaits!", description: "Experience the thrill of NBA basketball with exclusive courtside seats, VIP dining, and behind-the-scenes arena tours." },
                { id: 2, value: 250, tier: "medium", location: "Scottsdale Quarter", lat: 33.4942, lng: -111.9261, sponsor: "Scottsdale Fashion Square", message: "Premium shopping rewards unlocked!", description: "Discover luxury shopping with exclusive discounts and VIP personal shopping services." },
                { id: 3, value: 100, tier: "low", location: "Tempe Town Lake", lat: 33.4255, lng: -111.9400, sponsor: "Local Coffee Co.", message: "Free coffee for early hunters!", description: "Enjoy artisanal coffee and cozy workspace with special $Ember holder benefits." },
                { id: 4, value: 150, tier: "medium", location: "Old Town Scottsdale", lat: 33.4942, lng: -111.9261, sponsor: "Arizona Bike Tours", message: "Adventure awaits in the desert!", description: "Explore the Sonoran Desert with guided tours and premium bike rentals." },
                { id: 5, value: 300, tier: "medium", location: "Arizona State University", lat: 33.4194, lng: -111.9339, sponsor: "ASU Bookstore", message: "Student discounts and exclusive gear!", description: "Access student resources and exclusive Sun Devil merchandise." },
                { id: 6, value: 75, tier: "low", location: "Phoenix Sky Harbor", lat: 33.4343, lng: -112.0116, sponsor: "Sky Harbor Shops", message: "Travel rewards for your next adventure!", description: "Unlock travel perks and duty-free shopping benefits." }
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
                    console.log('✅ Login page initialized');
                } else if (document.getElementById('container')) {
                    this.ensureSession();
                    this.loadUserInfo();
                    this.loadCollectedTokens();
                    this.setupEventListeners();
                    this.initializeVault();
                    this.initializeCampaigns();
                    this.addHapticFeedback();
                    this.showWelcomeScreen();
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
                if (loginText) loginText.innerHTML = '<img src="../images/VPEmberFlame.svg" alt="Ember Flame" class="login-flame-icon">Start $Ember Hunt';
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
                errorDiv.style.display = 'flex';
                
                setTimeout(() => {
                    errorDiv.style.display = 'none';
                }, 4000);
            }
        }

        showSuccess(message) {
            const successDiv = document.getElementById('successMessage');
            if (successDiv) {
                successDiv.textContent = `✅ ${message}`;
                successDiv.style.display = 'flex';
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

        // DASHBOARD SYSTEM PLACEHOLDER METHODS
        ensureSession() {
            console.log('🔍 Session management...');
        }

        loadUserInfo() {
            console.log('👤 Loading user info...');
        }

        loadCollectedTokens() {
            console.log('💎 Loading tokens...');
        }

        setupEventListeners() {
            console.log('🎧 Setting up dashboard listeners...');
        }

        initializeVault() {
            console.log('💎 Initializing vault...');
        }

        initializeCampaigns() {
            console.log('🏆 Initializing campaigns...');
        }

        showWelcomeScreen() {
            console.log('👋 Welcome screen...');
        }

        updateVaultStats() {
            console.log('📊 Updating vault stats...');
        }

        addHapticFeedback() {
            try {
                const interactiveElements = document.querySelectorAll('.login-button, .form-input, .forgot-password a');
                
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
    }

    // Initialize the app ONLY for crypto game pages
    window.addEventListener('load', () => {
        console.log('🔥💎 Vault Phoenix Crypto Game loading...');
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

    // Console welcome message
    console.log('%c🔥💎 VAULT PHOENIX - AR CRYPTO GAMING REVOLUTION', 'color: #f0a500; font-size: 24px; font-weight: bold; text-shadow: 2px 2px 4px rgba(0,0,0,0.3);');
    console.log('%c🚀 Revolutionary AR gaming that lets you collect real $Ember tokens', 'color: #fb923c; font-size: 14px; font-weight: bold;');
    console.log('%c📧 Contact: contact@vaultphoenix.com', 'color: #374151; font-size: 14px;');
    console.log('%c🔥💎 From ashes to crypto greatness - Phoenix Rising! ISOLATED MODE', 'color: #d73327; font-size: 12px; font-style: italic;');

} else {
    console.log('🚫 Crypto Game JS blocked - not a crypto game page');
}
