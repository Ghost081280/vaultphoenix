// Vault Phoenix AR Crypto Gaming - ISOLATED JAVASCRIPT
// PROTECTION: Only runs on crypto game pages - prevents main site interference

// IMMEDIATE PROTECTION - CHECK IF THIS IS A CRYPTO GAME PAGE
(function() {
    // Check for crypto game flag
    const cryptoFlag = document.getElementById('cryptoGameFlag');
    const isCryptoPage = cryptoFlag || document.body.classList.contains('crypto-login-page') || document.body.classList.contains('crypto-dashboard-page');
    
    if (!isCryptoPage) {
        console.log('🚫 Not a crypto game page - blocking JavaScript execution');
        return;
    }
    
    // Mark this as crypto game
    window.isVaultPhoenixCryptoGame = true;
    console.log('🔥💎 Crypto Game JavaScript ACTIVE - Protected Mode');
})();

// ONLY RUN IF THIS IS A CRYPTO GAME PAGE
if (window.isVaultPhoenixCryptoGame) {

    // Vault Phoenix AR Crypto Gaming - Complete Game Engine
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

            // Enhanced Ember Token System
            this.emberTokens = [
                { id: 1, value: 500, tier: "high", location: "Downtown Phoenix", lat: 33.4484, lng: -112.0740, sponsor: "Phoenix Suns Arena", message: "Exclusive courtside experience awaits!", description: "Experience the thrill of NBA basketball with exclusive courtside seats, VIP dining, and behind-the-scenes arena tours." },
                { id: 2, value: 250, tier: "medium", location: "Scottsdale Quarter", lat: 33.4942, lng: -111.9261, sponsor: "Scottsdale Fashion Square", message: "Premium shopping rewards unlocked!", description: "Discover luxury shopping with exclusive discounts and VIP personal shopping services." },
                { id: 3, value: 100, tier: "low", location: "Tempe Town Lake", lat: 33.4255, lng: -111.9400, sponsor: "Local Coffee Co.", message: "Free coffee for early hunters!", description: "Enjoy artisanal coffee and cozy workspace with special $Ember holder benefits." },
                { id: 4, value: 150, tier: "medium", location: "Old Town Scottsdale", lat: 33.4942, lng: -111.9261, sponsor: "Arizona Bike Tours", message: "Adventure awaits in the desert!", description: "Explore the Sonoran Desert with guided tours and premium bike rentals." },
                { id: 5, value: 300, tier: "medium", location: "Arizona State University", lat: 33.4194, lng: -111.9339, sponsor: "ASU Bookstore", message: "Student discounts and exclusive gear!", description: "Access student resources and exclusive Sun Devil merchandise." },
                { id: 6, value: 75, tier: "low", location: "Phoenix Sky Harbor", lat: 33.4343, lng: -112.0116, sponsor: "Sky Harbor Shops", message: "Travel rewards for your next adventure!", description: "Unlock travel perks and duty-free shopping benefits." }
            ];

            // Initialize when DOM is ready
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
                // Check if we're on login page or dashboard
                if (document.getElementById('loginForm')) {
                    this.setupLoginListeners();
                    this.initializeEnhancedLoginEffects();
                    console.log('✅ Login page initialized');
                } else if (document.getElementById('container')) {
                    this.ensureSession();
                    this.loadUserInfo();
                    this.loadCollectedTokens();
                    this.setupDashboardListeners();
                    this.initializeVault();
                    this.showWelcomeScreen();
                    document.body.classList.add('crypto-dashboard-page');
                    console.log('✅ Dashboard initialized');
                }
            } catch (error) {
                console.error('❌ Initialization error:', error);
                this.collectedTokens = [];
                this.totalTokenValue = 0;
            }
        }

        // Enhanced Login Effects
        initializeEnhancedLoginEffects() {
            this.initializeFloatingCoins();
            this.initializePhoenixGlow();
            this.initializeParticleSystem();
            this.setupEnhancedFormValidation();
            this.addHapticFeedback();
        }

        initializeFloatingCoins() {
            const coins = document.querySelectorAll('.floating-coin');
            coins.forEach((coin, index) => {
                // Add random delays and speeds
                coin.style.animationDelay = `${Math.random() * 5}s`;
                coin.style.animationDuration = `${12 + Math.random() * 8}s`;
                
                // Add hover interaction
                coin.addEventListener('mouseenter', () => {
                    coin.style.transform = 'scale(1.2) rotate(180deg)';
                    coin.style.opacity = '0.8';
                });
                
                coin.addEventListener('mouseleave', () => {
                    coin.style.transform = '';
                    coin.style.opacity = '';
                });
            });
        }

        initializePhoenixGlow() {
            const glowElement = document.querySelector('.phoenix-glow-bg');
            if (glowElement) {
                // Add mouse tracking for glow effect
                document.addEventListener('mousemove', (e) => {
                    const x = (e.clientX / window.innerWidth) * 100;
                    const y = (e.clientY / window.innerHeight) * 100;
                    
                    glowElement.style.background = `radial-gradient(circle at ${x}% ${y}%, rgba(240, 165, 0, 0.15) 0%, rgba(215, 51, 39, 0.08) 40%, transparent 70%)`;
                });
            }
        }

        initializeParticleSystem() {
            // Create dynamic particle effects on button interactions
            const loginButton = document.getElementById('loginBtn');
            if (loginButton) {
                loginButton.addEventListener('click', (e) => {
                    this.createButtonParticles(e.target);
                });
            }
        }

        createButtonParticles(element) {
            const rect = element.getBoundingClientRect();
            const particlesContainer = document.getElementById('loadingParticles');
            
            if (!particlesContainer) return;
            
            for (let i = 0; i < 6; i++) {
                const particle = document.createElement('div');
                particle.className = 'particle';
                particle.style.position = 'absolute';
                particle.style.left = `${rect.left + rect.width / 2}px`;
                particle.style.top = `${rect.top + rect.height / 2}px`;
                particle.style.width = '6px';
                particle.style.height = '6px';
                particle.style.background = '#f0a500';
                particle.style.borderRadius = '50%';
                particle.style.pointerEvents = 'none';
                particle.style.zIndex = '9999';
                
                const angle = (i / 6) * Math.PI * 2;
                const distance = 100 + Math.random() * 50;
                const endX = Math.cos(angle) * distance;
                const endY = Math.sin(angle) * distance;
                
                particle.animate([
                    { transform: 'translate(0, 0) scale(1)', opacity: 1 },
                    { transform: `translate(${endX}px, ${endY}px) scale(0)`, opacity: 0 }
                ], {
                    duration: 1000,
                    easing: 'cubic-bezier(0.4, 0, 0.2, 1)'
                }).onfinish = () => particle.remove();
                
                document.body.appendChild(particle);
            }
        }

        setupEnhancedFormValidation() {
            const inputs = document.querySelectorAll('.form-input');
            inputs.forEach(input => {
                input.addEventListener('input', () => this.validateInputEnhanced(input));
                input.addEventListener('focus', () => this.onInputFocus(input));
                input.addEventListener('blur', () => this.onInputBlur(input));
            });
        }

        validateInputEnhanced(input) {
            const isValid = input.checkValidity();
            const formGroup = input.closest('.form-group');
            
            if (input.value) {
                if (isValid) {
                    this.showInputSuccess(formGroup);
                } else {
                    this.showInputError(formGroup);
                }
            } else {
                this.resetInputState(formGroup);
            }
        }

        showInputSuccess(formGroup) {
            formGroup.style.borderColor = '#4CAF50';
            formGroup.style.boxShadow = '0 0 0 3px rgba(76, 175, 80, 0.2)';
            this.addSuccessIcon(formGroup);
        }

        showInputError(formGroup) {
            formGroup.style.borderColor = '#f44336';
            formGroup.style.boxShadow = '0 0 0 3px rgba(244, 67, 54, 0.2)';
            this.addErrorIcon(formGroup);
        }

        resetInputState(formGroup) {
            formGroup.style.borderColor = '';
            formGroup.style.boxShadow = '';
            this.removeValidationIcons(formGroup);
        }

        addSuccessIcon(formGroup) {
            this.removeValidationIcons(formGroup);
            const icon = document.createElement('div');
            icon.className = 'validation-icon success';
            icon.innerHTML = '✓';
            icon.style.cssText = `
                position: absolute;
                right: 15px;
                top: 50%;
                transform: translateY(-50%);
                color: #4CAF50;
                font-weight: bold;
                z-index: 10;
            `;
            formGroup.appendChild(icon);
        }

        addErrorIcon(formGroup) {
            this.removeValidationIcons(formGroup);
            const icon = document.createElement('div');
            icon.className = 'validation-icon error';
            icon.innerHTML = '✗';
            icon.style.cssText = `
                position: absolute;
                right: 15px;
                top: 50%;
                transform: translateY(-50%);
                color: #f44336;
                font-weight: bold;
                z-index: 10;
            `;
            formGroup.appendChild(icon);
        }

        removeValidationIcons(formGroup) {
            const existingIcons = formGroup.querySelectorAll('.validation-icon');
            existingIcons.forEach(icon => icon.remove());
        }

        onInputFocus(input) {
            const formGroup = input.closest('.form-group');
            formGroup.style.transform = 'scale(1.02)';
            formGroup.style.zIndex = '10';
        }

        onInputBlur(input) {
            const formGroup = input.closest('.form-group');
            formGroup.style.transform = 'scale(1)';
            formGroup.style.zIndex = '1';
        }

        // ===== LOGIN SYSTEM =====
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
                input.style.borderColor = 'rgba(240, 165, 0, 0.4)';
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

            // Enhanced loading state
            if (container) container.classList.add('loading');
            if (loginText) {
                loginText.innerHTML = `
                    <span class="loading-spinner"></span>
                    <span class="login-main-text">Authenticating...</span>
                    <span class="login-sub-text">Connecting to Phoenix Network</span>
                `;
            }
            
            if (loginBtn) loginBtn.style.transform = 'scale(0.98)';

            try {
                await this.authenticateUser(email, password);
                
                if (loginText) {
                    loginText.innerHTML = `
                        <span style="color: #4CAF50; font-size: 24px;">✅</span>
                        <span class="login-main-text">Access Granted!</span>
                        <span class="login-sub-text">Welcome to the Hunt</span>
                    `;
                }
                if (loginBtn) loginBtn.style.background = 'linear-gradient(135deg, #4CAF50, #45a049)';
                
                this.showSuccess('Login successful! Launching AR $Ember Hunt...');
                
                this.storeSession(email);
                
                // Enhanced transition effect
                setTimeout(() => {
                    this.createTransitionEffect();
                    setTimeout(() => {
                        window.location.href = 'dashboard.html';
                    }, 800);
                }, 1200);

            } catch (error) {
                if (loginBtn) loginBtn.style.transform = 'scale(1)';
                if (loginText) {
                    loginText.innerHTML = `
                        <img src="../images/VPEmberFlame.svg" alt="Ember Flame" class="login-flame-icon">
                        <span class="login-main-text">Start $Ember Hunt</span>
                        <span class="login-sub-text">Begin Your Adventure</span>
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

        createTransitionEffect() {
            const overlay = document.createElement('div');
            overlay.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: linear-gradient(135deg, #f0a500, #fb923c, #d73327);
                z-index: 10000;
                opacity: 0;
                transition: opacity 0.8s ease;
                display: flex;
                align-items: center;
                justify-content: center;
                color: white;
                font-size: 24px;
                font-weight: bold;
            `;
            overlay.innerHTML = `
                <div style="text-align: center;">
                    <img src="../images/VPLogoNoText.PNG" alt="Phoenix" style="width: 80px; height: 80px; margin-bottom: 20px; filter: drop-shadow(0 0 20px rgba(255,255,255,0.5));">
                    <div>Launching AR Experience...</div>
                </div>
            `;
            document.body.appendChild(overlay);
            
            setTimeout(() => {
                overlay.style.opacity = '1';
            }, 100);
        }

        focusInput(input) {
            if (input) {
                input.focus();
                input.select();
            }
        }

        async authenticateUser(email, password) {
            await new Promise(resolve => setTimeout(resolve, 1500));

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
            
            // Enhanced forgot password modal
            const modal = document.createElement('div');
            modal.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0,0,0,0.8);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 10000;
                backdrop-filter: blur(10px);
            `;
            
            modal.innerHTML = `
                <div style="
                    background: linear-gradient(135deg, rgba(15, 15, 15, 0.95), rgba(45, 24, 16, 0.95));
                    padding: 40px;
                    border-radius: 20px;
                    border: 2px solid rgba(240, 165, 0, 0.4);
                    max-width: 400px;
                    text-align: center;
                    color: white;
                    box-shadow: 0 25px 80px rgba(0, 0, 0, 0.6);
                ">
                    <img src="../images/VPEmberFlame.svg" alt="Phoenix" style="width: 60px; height: 60px; margin-bottom: 20px;">
                    <h3 style="color: #f0a500; margin-bottom: 20px;">Password Reset</h3>
                    <p style="margin-bottom: 20px; line-height: 1.6;">
                        Password reset functionality would be implemented here.
                    </p>
                    <div style="background: rgba(240, 165, 0, 0.1); padding: 15px; border-radius: 10px; margin-bottom: 20px;">
                        <strong>For demo access:</strong><br>
                        demo@vaultphoenix.com<br>
                        phoenix123
                    </div>
                    <button onclick="this.closest('div').style.display='none'" style="
                        background: linear-gradient(135deg, #f0a500, #fb923c);
                        color: white;
                        border: none;
                        padding: 12px 24px;
                        border-radius: 10px;
                        cursor: pointer;
                        font-weight: bold;
                    ">Close</button>
                </div>
            `;
            
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    document.body.removeChild(modal);
                }
            });
            
            document.body.appendChild(modal);
        }

        // ===== DASHBOARD SYSTEM =====
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
            // Enhanced user info loading with session data
            try {
                const session = JSON.parse(sessionStorage.getItem('vaultPhoenixSession') || '{}');
                this.currentUser = {
                    email: session.email || 'demo@vaultphoenix.com',
                    loginTime: session.loginTime || new Date().toISOString(),
                    walletAddress: session.walletAddress || '0x' + Math.random().toString(16).substr(2, 40)
                };
                console.log('✅ User info loaded:', this.currentUser.email);
            } catch (error) {
                console.error('❌ User info loading error:', error);
                this.currentUser = {
                    email: 'demo@vaultphoenix.com',
                    loginTime: new Date().toISOString(),
                    walletAddress: '0x1234567890abcdef1234567890abcdef12345678'
                };
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
        }

        calculateTotalValue() {
            this.totalTokenValue = this.collectedTokens.reduce((total, token) => total + token.value, 0);
        }

        setupDashboardListeners() {
            console.log('🎧 Setting up dashboard listeners...');
            try {
                // Basic dashboard event listeners
                const homeBtn = document.getElementById('homeBtn');
                const menuToggle = document.getElementById('menuToggle');
                
                if (homeBtn) {
                    homeBtn.addEventListener('click', () => this.goHome());
                }
                
                if (menuToggle) {
                    menuToggle.addEventListener('click', () => this.toggleMenu());
                }
                
                // Navigation tabs
                document.querySelectorAll('.nav-tab').forEach(tab => {
                    tab.addEventListener('click', () => {
                        if (!tab.classList.contains('disabled')) {
                            this.switchMode(tab.dataset.mode);
                        }
                    });
                });
                
                console.log('✅ Dashboard listeners setup complete');
            } catch (error) {
                console.error('❌ Dashboard listener error:', error);
            }
        }

        initializeVault() {
            console.log('💎 Initializing vault...');
            // Enhanced vault initialization
            this.updateVaultDisplay();
        }

        updateVaultDisplay() {
            // Update vault-related UI elements
            const emberCountElements = document.querySelectorAll('#navEmberCount, #menuEmberCount');
            emberCountElements.forEach(element => {
                if (element) {
                    element.textContent = this.totalTokenValue.toString();
                }
            });

            const vaultBalanceElement = document.getElementById('vaultBalance');
            if (vaultBalanceElement) {
                vaultBalanceElement.textContent = `${this.totalTokenValue} $Ember Tokens`;
            }

            const vaultUsdElement = document.getElementById('vaultUsdValue');
            if (vaultUsdElement) {
                const usdValue = (this.totalTokenValue * 0.001).toFixed(2);
                vaultUsdElement.textContent = `${usdValue} USD`;
            }
        }

        showWelcomeScreen() {
            console.log('👋 Showing welcome screen...');
            try {
                const welcomeBtn = document.getElementById('welcomeBtn');
                const container = document.getElementById('container');
                
                if (!welcomeBtn || this.welcomeShown) return;
                
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
                    progress += Math.random() * 15 + 5;
                    
                    if (progress >= 100) {
                        progress = 100;
                        if (loadingFill) loadingFill.style.width = '100%';
                        if (loadingText) loadingText.textContent = loadingMessages[4];
                        
                        clearInterval(loadingInterval);
                        
                        setTimeout(() => {
                            this.hideWelcomeScreen();
                        }, 800);
                        
                    } else {
                        if (loadingFill) loadingFill.style.width = `${progress}%`;
                        
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
                
                if (welcomeBtn) {
                    welcomeBtn.style.display = 'none';
                }
                
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
                
            } catch (error) {
                console.error('❌ Auto-start error:', error);
            }
        }

        start() {
            if (this.isStarted) return;
            this.isStarted = true;
            console.log('🚀 Starting Vault Phoenix game...');
            
            // Basic game initialization
            this.setupGPS();
            this.generateTokenLocations();
            
            console.log('✅ Vault Phoenix started successfully');
        }

        setupGPS() {
            console.log('📍 Setting up GPS...');
            // Enhanced GPS setup with geolocation
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        this.userLat = position.coords.latitude;
                        this.userLng = position.coords.longitude;
                        console.log('✅ GPS location acquired:', this.userLat, this.userLng);
                        this.updateLocationDisplay();
                    },
                    (error) => {
                        console.log('📍 GPS fallback to Phoenix, AZ');
                        this.userLat = 33.4484; // Phoenix, AZ
                        this.userLng = -112.0740;
                        this.updateLocationDisplay();
                    }
                );
            } else {
                this.userLat = 33.4484; // Phoenix, AZ
                this.userLng = -112.0740;
                this.updateLocationDisplay();
            }
        }

        updateLocationDisplay() {
            const latElement = document.getElementById('lat');
            const lngElement = document.getElementById('lng');
            const fallbackLatElement = document.getElementById('fallbackLat');
            const fallbackLngElement = document.getElementById('fallbackLng');
            
            if (latElement) latElement.textContent = this.userLat.toFixed(4);
            if (lngElement) lngElement.textContent = this.userLng.toFixed(4);
            if (fallbackLatElement) fallbackLatElement.textContent = this.userLat.toFixed(4);
            if (fallbackLngElement) fallbackLngElement.textContent = this.userLng.toFixed(4);
        }

        generateTokenLocations() {
            console.log('🗺️ Generating token locations...');
            this.tokenLocations = [...this.emberTokens];
        }

        // ===== NAVIGATION SYSTEM =====
        goHome() {
            console.log('🏠 Going home...');
            if (this.currentMode !== 'map') {
                this.switchMode('map');
            }
        }

        toggleMenu() {
            console.log('📋 Toggling menu...');
            // Enhanced menu toggle with animation
            const sideMenu = document.getElementById('sideMenu');
            const menuOverlay = document.getElementById('menuOverlay');
            
            if (sideMenu && menuOverlay) {
                const isOpen = sideMenu.classList.contains('open');
                
                if (isOpen) {
                    sideMenu.classList.remove('open');
                    menuOverlay.classList.remove('open');
                } else {
                    sideMenu.classList.add('open');
                    menuOverlay.classList.add('open');
                }
            }
        }

        switchMode(mode) {
            if (mode === this.currentMode) return;
            
            console.log('🔄 Switching to mode:', mode);
            this.currentMode = mode;
            this.updateNavigationState();
            this.updateViewVisibility();
        }

        updateNavigationState() {
            try {
                document.querySelectorAll('.nav-tab').forEach(tab => {
                    tab.classList.toggle('active', tab.dataset.mode === this.currentMode);
                });
                
                document.querySelectorAll('.menu-item').forEach(item => {
                    item.classList.toggle('active', item.dataset.mode === this.currentMode);
                });
            } catch (error) {
                console.error('❌ Navigation update error:', error);
            }
        }

        updateViewVisibility() {
            const views = {
                'map': document.getElementById('map'),
                'ar': document.getElementById('video'),
                'vault': document.getElementById('vaultView'),
                'campaigns': document.getElementById('campaignsView')
            };
            
            Object.keys(views).forEach(viewKey => {
                const view = views[viewKey];
                if (view) {
                    view.style.display = viewKey === this.currentMode ? 'block' : 'none';
                }
            });
        }

        addHapticFeedback() {
            try {
                const interactiveElements = document.querySelectorAll(`
                    .login-button, .form-input, .forgot-password a, .nav-tab, 
                    .nav-logo, .vault-badge, .demo-badge, .feature-item, 
                    .quick-start-tip, .phoenix-flame-decoration
                `);
                
                interactiveElements.forEach(element => {
                    element.addEventListener('touchstart', () => {
                        if (navigator.vibrate) {
                            navigator.vibrate(10);
                        }
                    }, { passive: true });
                    
                    element.addEventListener('click', () => {
                        if (navigator.vibrate) {
                            navigator.vibrate(5);
                        }
                    }, { passive: true });
                });
            } catch (error) {
                console.error('❌ Haptic feedback error:', error);
            }
        }
    }

    // Initialize the app when DOM is ready
    document.addEventListener('DOMContentLoaded', () => {
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
            
            // Enhanced error screen
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
                    <div style="
                        background: rgba(15, 15, 15, 0.95);
                        backdrop-filter: blur(30px);
                        border-radius: 24px;
                        padding: 40px;
                        border: 2px solid rgba(240, 165, 0, 0.4);
                        max-width: 500px;
                    ">
                        <img src="../images/VPLogoNoText.PNG" alt="Phoenix" style="width: 80px; height: 80px; margin-bottom: 20px;">
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
                            transition: all 0.3s ease;
                        " onmouseover="this.style.transform='translateY(-2px)'" onmouseout="this.style.transform='translateY(0)'">
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
    console.log('%c🔥💎 ISOLATED MODE - Protected from main site interference!', 'color: #d73327; font-size: 12px; font-style: italic;');

} else {
    console.log('🚫 Crypto Game JS blocked - not a crypto game page');
}
