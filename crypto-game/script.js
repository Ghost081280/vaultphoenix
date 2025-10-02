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

// ENHANCED: Global Google Maps callback function
window.initMap = function() {
    console.log('🗺️ Google Maps API loaded successfully');
    if (window.vaultPhoenixApp && typeof window.vaultPhoenixApp.initializeGoogleMap === 'function') {
        window.vaultPhoenixApp.initializeGoogleMap();
    } else {
        console.log('⏳ Vault Phoenix app not ready, will initialize when ready');
    }
};

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
            this.availableTokensCount = 13;
            this.orientationHandler = null;
            this.currentUser = null;
            
            // Enhanced properties
            this.mapLoadingComplete = false;
            this.newTokenInterval = null;
            this.lastProximityCheck = 0;
            
            // Swipeable module properties
            this.moduleExpanded = false;
            this.moduleStartY = 0;
            this.moduleCurrentY = 0;
            this.isDragging = false;
            this.moduleTranslateY = 0;
            
            // Google Maps properties - ENHANCED
            this.googleMap = null;
            this.tokenMarkers = [];
            this.infoWindows = [];
            this.googleMapsAPI = null;

            // Map pan/zoom properties
            this.mapScale = 1;
            this.mapTranslateX = 0;
            this.mapTranslateY = 0;
            this.isDraggingMap = false;
            this.lastTouchX = 0;
            this.lastTouchY = 0;
            this.lastDistance = 0;
            this.mapContainer = null;
            this.isNearToken = false;

            // AR Camera properties
            this.arActive = false;
            this.arCameraPermissionGranted = false;
            this.videoElement = null;
            this.canvasElement = null;

            // Enhanced Ember Token System with Real Locations and Value Tiers
            this.emberTokens = [
                // DEMO: Nearby token for AR mode demonstration
                { id: 13, value: 100, tier: "low", location: "Phoenix Downtown Plaza", lat: 33.4485, lng: -112.0742, sponsor: "Demo Location", message: "You're close! Try AR mode!", description: "This is a demo token placed nearby to show AR functionality." },
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
                    console.log('📱 Detected login page, setting up login listeners...');
                    this.setupLoginListeners();
                    console.log('✅ Login page initialized');
                } else if (document.getElementById('container')) {
                    console.log('🎮 Detected dashboard page, setting up dashboard...');
                    this.ensureSession();
                    this.loadUserInfo();
                    this.loadCollectedTokens();
                    this.setupEventListeners();
                    this.initializeVault();
                    this.initializeCampaigns();
                    this.setupSwipeableModule();
                    this.addHapticFeedback();
                    this.showWelcomeScreen();
                    document.body.classList.add('crypto-dashboard-page');
                    this.setModeAttribute('map');
                    console.log('✅ Dashboard initialized');
                }
            } catch (error) {
                console.error('❌ Initialization error:', error);
                if (document.getElementById('container')) {
                    this.collectedTokens = [];
                    this.totalTokenValue = 0;
                    this.updateVaultStats();
                }
            }
        }

        // =================== LOGIN SYSTEM ===================
        setupLoginListeners() {
            console.log('🔧 Setting up login listeners...');
            try {
                const loginForm = document.getElementById('loginForm');
                const forgotPassword = document.getElementById('forgotPassword');
                
                if (loginForm) {
                    console.log('📝 Login form found, adding submit listener...');
                    loginForm.addEventListener('submit', (e) => {
                        console.log('🚀 Form submit triggered');
                        this.handleLogin(e);
                    });
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
                console.log('✅ Login listeners setup complete');
            } catch (error) {
                console.error('❌ Login listeners setup error:', error);
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
            console.log('🚀 Login form submitted');
            
            try {
                const email = document.getElementById('email')?.value?.trim() || '';
                const password = document.getElementById('password')?.value || '';
                const loginBtn = document.getElementById('loginBtn');
                const loginText = document.getElementById('loginText');
                const container = document.querySelector('.login-container');

                console.log('📧 Email input:', email);
                console.log('🔑 Password length:', password.length);

                this.hideMessages();

                // Validation
                if (!email) {
                    console.error('❌ No email provided');
                    this.showError('Please enter your email address');
                    this.focusInput(document.getElementById('email'));
                    return;
                }

                if (!this.validateEmail(email)) {
                    console.error('❌ Invalid email format:', email);
                    this.showError('Please enter a valid email address');
                    this.focusInput(document.getElementById('email'));
                    return;
                }

                if (!password) {
                    console.error('❌ No password provided');
                    this.showError('Please enter your password');
                    this.focusInput(document.getElementById('password'));
                    return;
                }

                if (password.length < 6) {
                    console.error('❌ Password too short');
                    this.showError('Password must be at least 6 characters long');
                    this.focusInput(document.getElementById('password'));
                    return;
                }

                // Show loading state
                if (container) container.classList.add('loading');
                if (loginText) loginText.innerHTML = '<span class="loading-spinner"></span>Authenticating...';
                if (loginBtn) loginBtn.style.transform = 'scale(0.98)';

                console.log('🔐 Starting authentication...');
                await this.authenticateUser(email, password);
                
                console.log('✅ Login successful!');
                if (loginText) loginText.innerHTML = '✅ Access Granted!';
                if (loginBtn) loginBtn.style.background = 'linear-gradient(135deg, #4CAF50, #45a049)';
                
                this.showSuccess('Login successful! Launching AR $Ember Hunt...');
                
                this.storeSession(email);
                
                setTimeout(() => {
                    console.log('🚀 Redirecting to dashboard...');
                    window.location.href = 'dashboard.html';
                }, 1500);

            } catch (error) {
                console.error('❌ Login failed:', error.message);
                
                const loginBtn = document.getElementById('loginBtn');
                const loginText = document.getElementById('loginText');
                const container = document.querySelector('.login-container');
                
                // Reset UI
                if (loginBtn) loginBtn.style.transform = 'scale(1)';
                if (loginText) loginText.innerHTML = '<span class="login-main-text"><img src="../images/VPEmberFlame.svg" alt="Ember Flame" class="login-flame-icon" onerror="this.textContent=\'🔥\'">START $EMBER HUNT</span><span class="login-sub-text">Begin Your Adventure</span>';
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
            console.log('🔐 Authenticating user:', email);
            
            // Simulate network delay
            await new Promise(resolve => setTimeout(resolve, 1000));

            const validCredentials = [
                { email: 'demo@vaultphoenix.com', password: 'phoenix123' },
                { email: 'admin@vaultphoenix.com', password: 'admin123' },
                { email: 'hunter@crypto.com', password: 'crypto123' },
                { email: 'player@ember.com', password: 'ember123' },
                { email: 'test@test.com', password: 'test123' },
                { email: 'user@vault.com', password: 'vault123' }
            ];

            console.log('🔍 Checking credentials against valid list...');
            
            const isValid = validCredentials.some(cred => {
                const emailMatch = cred.email.toLowerCase().trim() === email.toLowerCase().trim();
                const passwordMatch = cred.password === password;
                console.log(`📧 Email match (${cred.email}):`, emailMatch, '🔑 Password match:', passwordMatch);
                return emailMatch && passwordMatch;
            });

            console.log('✅ Validation result:', isValid);

            if (!isValid) {
                console.error('❌ Authentication failed for:', email);
                throw new Error('Invalid email or password. Try: demo@vaultphoenix.com / phoenix123');
            }

            console.log('🎉 Authentication successful!');
            return { success: true, email, timestamp: Date.now() };
        }

        validateEmail(email) {
            console.log('📧 Validating email:', email);
            if (!email || typeof email !== 'string') {
                console.error('❌ Email validation failed: empty or invalid type');
                return false;
            }
            
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            const isValid = emailRegex.test(email.trim());
            console.log('✅ Email validation result:', isValid);
            return isValid;
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

        // =================== ENHANCED DASHBOARD SYSTEM ===================
        setModeAttribute(mode) {
            try {
                document.body.setAttribute('data-mode', mode);
                console.log('🔧 Set mode attribute to:', mode);
            } catch (error) {
                console.error('❌ Mode attribute error:', error);
            }
        }

        // =================== MODE SWITCHING ===================
        switchMode(mode) {
            if (mode === this.currentMode) return;
            
            // Special handling for AR mode
            if (mode === 'ar' && !this.isNearToken) {
                this.showARNoAccessModal();
                return;
            }
            
            console.log('🔄 Switching to mode:', mode);
            this.currentMode = mode;
            this.setModeAttribute(mode);
            this.updateNavigationState();
            
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

        async switchToAR() {
            console.log('📱 Switching to AR mode');
            try {
                document.getElementById('map').style.display = 'none';
                document.getElementById('video').style.display = 'block';
                document.getElementById('canvas').style.display = 'block';
                document.getElementById('vaultView').style.display = 'none';
                document.getElementById('campaignsView').style.display = 'none';
                
                const module = document.getElementById('tokenLocationsModule');
                if (module) module.style.display = 'none';

                await this.startARCamera();
                
                console.log('📱 AR mode activated');
            } catch (error) {
                console.error('❌ AR switch error:', error);
                alert('❌ Camera access failed. Please allow camera permissions and try again.');
                this.switchMode('map');
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
                
                const module = document.getElementById('tokenLocationsModule');
                if (module) {
                    module.style.display = 'block';
                }
                
                const mapContainer = document.getElementById('googleMap');
                if (mapContainer) {
                    mapContainer.style.display = 'block';
                    
                    if (!this.googleMapsLoaded) {
                        console.log('🎮 Initializing map for hunt screen...');
                        this.initializeGoogleMap();
                    }
                }
                
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
                
                const module = document.getElementById('tokenLocationsModule');
                if (module) module.style.display = 'none';

                this.stopCamera();
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
                
                const module = document.getElementById('tokenLocationsModule');
                if (module) module.style.display = 'none';

                this.stopCamera();
            } catch (error) {
                console.error('❌ Campaigns switch error:', error);
            }
        }

        showARNoAccessModal() {
            console.log('🚫 Showing AR no access modal');
            
            const uncollectedTokens = this.emberTokens.filter(token => !this.isTokenCollected(token.id));
            const nearest = uncollectedTokens.reduce((closest, token) => {
                const distance = this.calculateDistance(this.userLat, this.userLng, token.lat, token.lng);
                return !closest || distance < closest.distance ? 
                    { ...token, distance } : closest;
            }, null);
            
            const modalHTML = `
                <div class="ar-no-access-modal show" id="arNoAccessModal">
                    <div class="ar-no-access-content">
                        <div class="ar-no-access-title">
                            🔒 AR Mode Locked
                        </div>
                        <div class="ar-no-access-text">
                            You need to be within 100 meters of a token location to access AR hunting mode.
                        </div>
                        ${nearest ? `
                            <div class="nearest-token-info">
                                <div class="nearest-token-name">Nearest: ${nearest.location}</div>
                                <div class="nearest-token-distance">${nearest.distance < 1 ? 
                                    `${(nearest.distance * 1000).toFixed(0)}m away` : 
                                    `${nearest.distance.toFixed(1)}km away`}</div>
                            </div>
                        ` : ''}
                        <button class="ar-no-access-close" onclick="vaultPhoenixApp.hideARNoAccessModal()">
                            Got it!
                        </button>
                    </div>
                </div>
            `;
            
            const existingModal = document.getElementById('arNoAccessModal');
            if (existingModal) existingModal.remove();
            
            document.body.insertAdjacentHTML('beforeend', modalHTML);
        }

        hideARNoAccessModal() {
            const modal = document.getElementById('arNoAccessModal');
            if (modal) {
                modal.classList.remove('show');
                setTimeout(() => modal.remove(), 300);
            }
        }

        // =================== AR CAMERA SYSTEM ===================
        async startARCamera() {
            console.log('📷 Starting AR camera...');
            try {
                this.videoElement = document.getElementById('video');
                this.canvasElement = document.getElementById('canvas');

                if (!this.videoElement || !this.canvasElement) {
                    throw new Error('AR video or canvas elements not found');
                }

                if (!this.arCameraPermissionGranted) {
                    console.log('📷 Requesting camera permissions...');
                    
                    const constraints = {
                        video: {
                            facingMode: 'environment',
                            width: { ideal: 1280 },
                            height: { ideal: 720 }
                        }
                    };

                    try {
                        this.cameraStream = await navigator.mediaDevices.getUserMedia(constraints);
                        this.arCameraPermissionGranted = true;
                        console.log('✅ Camera permission granted');
                    } catch (permissionError) {
                        console.error('❌ Camera permission denied:', permissionError);
                        throw new Error('Camera access denied. Please allow camera permissions to use AR mode.');
                    }
                }

                if (this.cameraStream && this.videoElement) {
                    this.videoElement.srcObject = this.cameraStream;
                    this.videoElement.play();
                    
                    console.log('📷 Camera stream started');

                    this.videoElement.addEventListener('loadedmetadata', () => {
                        console.log('📷 Video metadata loaded');
                        this.setupARInterface();
                    });
                }

                this.arActive = true;

            } catch (error) {
                console.error('❌ AR camera start error:', error);
                throw error;
            }
        }

        setupARInterface() {
            console.log('🎮 Setting up AR interface...');
            try {
                this.showARInstructions();

                if (this.isNearToken) {
                    this.showARCoin();
                }

                console.log('✅ AR interface setup complete');
            } catch (error) {
                console.error('❌ AR interface setup error:', error);
            }
        }

        showARInstructions() {
            const instructions = document.getElementById('arInstructions');
            if (instructions) {
                instructions.classList.add('show');
                
                setTimeout(() => {
                    instructions.classList.remove('show');
                }, 5000);
            }
        }

        hideARInstructions() {
            const instructions = document.getElementById('arInstructions');
            if (instructions) {
                instructions.classList.remove('show');
            }
        }

        showARCoin() {
            console.log('💎 Showing AR coin for collection...');
            const coin = document.getElementById('arEmberCoin');
            if (coin) {
                coin.style.display = 'block';
                coin.classList.add('tappable');
                
                coin.onclick = () => {
                    this.collectARToken();
                };
            }
        }

        hideEmberCoin() {
            const coin = document.getElementById('arEmberCoin');
            if (coin) {
                coin.style.display = 'none';
                coin.classList.remove('tappable');
                coin.onclick = null;
            }
        }

        async collectARToken() {
            console.log('💎 Collecting AR token...');
            try {
                const nearestToken = this.emberTokens.find(token => 
                    !this.isTokenCollected(token.id) && 
                    this.calculateDistance(this.userLat, this.userLng, token.lat, token.lng) <= 0.1
                );

                if (nearestToken) {
                    this.hideEmberCoin();

                    if (navigator.vibrate) {
                        navigator.vibrate([200, 100, 200, 100, 200]);
                    }

                    this.collectedTokens.push({
                        ...nearestToken,
                        collectedAt: new Date().toISOString(),
                        collectedVia: 'AR'
                    });

                    this.saveCollectedTokens();
                    this.showTokenCollectionModal(nearestToken);

                    setTimeout(() => {
                        this.switchMode('map');
                    }, 3000);

                    console.log('✅ AR token collected successfully');
                }
            } catch (error) {
                console.error('❌ AR token collection error:', error);
            }
        }

        stopCamera() {
            console.log('📷 Stopping camera...');
            try {
                if (this.cameraStream) {
                    this.cameraStream.getTracks().forEach(track => track.stop());
                    this.cameraStream = null;
                }

                if (this.videoElement) {
                    this.videoElement.srcObject = null;
                }

                this.arActive = false;
                this.hideEmberCoin();
                this.hideARInstructions();

                console.log('✅ Camera stopped');
            } catch (error) {
                console.error('❌ Camera stop error:', error);
            }
        }

        // =================== UTILITY METHODS ===================
        calculateDistance(lat1, lng1, lat2, lng2) {
            const R = 6371;
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

        // =================== DASHBOARD METHODS ===================
        ensureSession() { 
            console.log('🔍 Session management...');
        }

        loadUserInfo() {
            console.log('👤 Loading user info...');
        }

        loadCollectedTokens() {
            console.log('💎 Loading collected tokens...');
            try {
                const saved = localStorage.getItem('vaultPhoenixTokens');
                if (saved) {
                    this.collectedTokens = JSON.parse(saved);
                    this.calculateTotalValue();
                    console.log('✅ Loaded', this.collectedTokens.length, 'collected tokens');
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

        calculateTotalValue() {
            this.totalTokenValue = this.collectedTokens.reduce((total, token) => total + token.value, 0);
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

        setupEventListeners() {
            console.log('🎧 Setting up event listeners...');
            try {
                const handlers = [
                    { id: 'homeBtn', event: 'click', handler: () => this.goHome() },
                    { id: 'menuToggle', event: 'click', handler: () => this.toggleMenu() },
                    { id: 'menuOverlay', event: 'click', handler: () => this.closeMenu() }
                ];
                
                handlers.forEach(({ id, event, handler }) => {
                    const element = document.getElementById(id);
                    if (element) {
                        element.addEventListener(event, handler);
                    }
                });

                document.querySelectorAll('.nav-tab').forEach(tab => {
                    tab.addEventListener('click', () => {
                        if (!tab.classList.contains('disabled')) {
                            const mode = tab.dataset.mode;
                            this.switchMode(mode);
                        }
                    });
                });

                document.querySelectorAll('.menu-item[data-mode]').forEach(item => {
                    item.addEventListener('click', () => {
                        const mode = item.dataset.mode;
                        this.switchMode(mode);
                        this.closeMenu();
                    });
                });

                console.log('✅ Event listeners setup complete');
            } catch (error) {
                console.error('❌ Event listener error:', error);
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

        updateMenuState() {
            try {
                document.querySelectorAll('.menu-item[data-mode]').forEach(item => {
                    item.classList.toggle('active', item.dataset.mode === this.currentMode);
                });
            } catch (error) {
                console.error('❌ Menu state update error:', error);
            }
        }

        goHome() {
            if (this.currentMode !== 'map') {
                this.switchMode('map');
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

        initializeVault() {
            console.log('💎 Initializing vault...');
            try {
                this.generateTokenHistory();
            } catch (error) {
                console.error('❌ Vault initialization error:', error);
            }
        }

        generateTokenHistory() {
            console.log('📜 Generating token history...');
            try {
                const historyContainer = document.getElementById('tokenHistory');
                if (!historyContainer) return;

                historyContainer.innerHTML = '';

                if (this.collectedTokens.length === 0) {
                    const welcomeItem = document.createElement('div');
                    welcomeItem.className = 'history-item';
                    welcomeItem.innerHTML = `
                        <div class="history-icon">
                            <img src="../images/VPEmberCoin.PNG" alt="Welcome Bonus" class="history-coin-icon" onerror="this.textContent='💎'">
                        </div>
                        <div class="history-details">
                            <div class="history-title">Welcome Bonus</div>
                            <div class="history-subtitle">Vault Phoenix HQ • Today • LOW</div>
                        </div>
                        <div class="history-value">+50</div>
                    `;
                    historyContainer.appendChild(welcomeItem);
                }

                this.collectedTokens.forEach(token => {
                    const historyItem = document.createElement('div');
                    historyItem.className = 'history-item';
                    historyItem.innerHTML = `
                        <div class="history-icon">
                            <img src="../images/VPEmberCoin.PNG" alt="${token.location}" class="history-coin-icon" onerror="this.textContent='💎'">
                        </div>
                        <div class="history-details">
                            <div class="history-title">${token.location}</div>
                            <div class="history-subtitle">${token.sponsor} • Today • ${token.tier.toUpperCase()}</div>
                        </div>
                        <div class="history-value">+${token.value}</div>
                    `;
                    historyContainer.appendChild(historyItem);
                });

            } catch (error) {
                console.error('❌ Token history generation error:', error);
            }
        }

        updateVaultStats() {
            console.log('📊 Updating vault stats...');
            try {
                const elements = {
                    navEmberCount: document.getElementById('navEmberCount'),
                    menuEmberCount: document.getElementById('menuEmberCount'),
                    vaultBalance: document.getElementById('vaultBalance'),
                    vaultUsdValue: document.getElementById('vaultUsdValue'),
                    totalCollected: document.getElementById('totalCollected'),
                    locationsVisited: document.getElementById('locationsVisited'),
                    totalValue: document.getElementById('totalValue'),
                    lastActivity: document.getElementById('lastActivity')
                };
                
                if (elements.navEmberCount) elements.navEmberCount.textContent = this.totalTokenValue;
                if (elements.menuEmberCount) elements.menuEmberCount.textContent = this.totalTokenValue;
                if (elements.vaultBalance) elements.vaultBalance.textContent = `${this.totalTokenValue} $Ember Tokens`;
                if (elements.vaultUsdValue) elements.vaultUsdValue.textContent = `${(this.totalTokenValue * 0.001).toFixed(2)} USD`;
                if (elements.totalCollected) elements.totalCollected.textContent = this.collectedTokens.length;
                if (elements.locationsVisited) elements.locationsVisited.textContent = this.locationsVisited;
                if (elements.totalValue) elements.totalValue.textContent = `${(this.totalTokenValue * 0.001).toFixed(2)}`;
                if (elements.lastActivity) elements.lastActivity.textContent = this.lastActivityTime || 'Never';
                
            } catch (error) {
                console.error('❌ Vault stats update error:', error);
            }
        }

        initializeCampaigns() {
            console.log('🏆 Initializing campaigns...');
        }

        setupSwipeableModule() {
            console.log('👆 Setting up swipeable module...');
        }

        addHapticFeedback() {
            console.log('📳 Adding haptic feedback...');
            try {
                const interactiveElements = document.querySelectorAll('.nav-tab, .menu-item, .demo-token-marker');
                
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

        showWelcomeScreen() {
            console.log('👋 Showing welcome screen...');
        }

        initializeGoogleMap() {
            console.log('🗺️ Initializing Google Map...');
        }

        showTokenCollectionModal(token) {
            console.log('💎 Token collected:', token.location);
        }

        start() {
            console.log('🚀 Starting game systems...');
            this.isStarted = true;
            return Promise.resolve();
        }

        showLoading(show) {
            console.log('⏳ Loading state:', show);
        }

        updateStatus(message, isError = false) {
            console.log('📊 Status update:', message);
        }
    }

    // Initialize the game when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            console.log('📄 DOM loaded, initializing Vault Phoenix...');
            new VaultPhoenixCryptoGame();
        });
    } else {
        console.log('📄 DOM already loaded, initializing Vault Phoenix...');
        new VaultPhoenixCryptoGame();
    }
    
} else {
    console.log('🚫 Vault Phoenix blocked - not a crypto game page');
}
