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
                { id: 3, value: 50, tier: "low", location: "Desert Botanical Garden", lat: 33.4619, lng: -111.9463, sponsor: "Garden Cafe", message: "Nature-inspired dining experience!", description: "Farm-to-table dining surrounded by stunning desert flora." },
                { id: 4, value: 150, tier: "medium", location: "Old Town Scottsdale", lat: 33.4942, lng: -111.9261, sponsor: "Arizona Bike Tours", message: "Adventure awaits in the desert!", description: "Explore the Sonoran Desert with guided tours and premium bike rentals." },
                { id: 5, value: 300, tier: "medium", location: "Arizona State University", lat: 33.4194, lng: -111.9339, sponsor: "ASU Bookstore", message: "Student discounts and exclusive gear!", description: "Access student resources and exclusive Sun Devil merchandise." },
                { id: 6, value: 75, tier: "low", location: "Phoenix Sky Harbor", lat: 33.4343, lng: -112.0116, sponsor: "Sky Harbor Shops", message: "Travel rewards for your next adventure!", description: "Unlock travel perks and duty-free shopping benefits." },
                { id: 7, value: 200, tier: "medium", location: "Camelback Mountain", lat: 33.5186, lng: -111.9717, sponsor: "Desert Hiking Gear", message: "Gear up for your next hike!", description: "Professional hiking equipment and guided desert expedition packages." },
                { id: 8, value: 125, tier: "low", location: "Roosevelt Row", lat: 33.4524, lng: -112.0708, sponsor: "Local Art Gallery", message: "Support local artists and creators!", description: "Discover emerging artists and exclusive art collection access." },
                { id: 9, value: 100, tier: "low", location: "Tempe Town Lake", lat: 33.4255, lng: -111.9400, sponsor: "Local Coffee Co.", message: "Free coffee for early hunters!", description: "Enjoy artisanal coffee and cozy workspace with special $Ember holder benefits." },
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

        // =================== GOOGLE MAPS INTEGRATION - COMPLETE RESTORATION ===================
        initializeGoogleMap() {
            console.log('🗺️ Initializing Google Maps with enhanced features...');
            try {
                const mapContainer = document.getElementById('googleMap');
                if (!mapContainer) {
                    console.error('❌ Google Map container not found');
                    return;
                }

                // Show loading overlay
                this.showMapLoading();

                // Check if Google Maps API is loaded
                if (typeof google !== 'undefined' && google.maps) {
                    console.log('✅ Google Maps API detected, initializing real map...');
                    this.createRealGoogleMap(mapContainer);
                } else {
                    console.log('⚠️ Google Maps API not available, using enhanced demo map...');
                    this.createEnhancedDemoMap(mapContainer);
                }
                
            } catch (error) {
                console.error('❌ Google Maps initialization error:', error);
                this.createEnhancedDemoMap(document.getElementById('googleMap'));
            }
        }

        showMapLoading() {
            const mapContainer = document.getElementById('googleMap');
            if (mapContainer) {
                mapContainer.innerHTML = `
                    <div class="map-loading-overlay">
                        <div class="map-loading-spinner"></div>
                        <div>Loading Phoenix Map...</div>
                    </div>
                `;
            }
        }

        // ENHANCED: Real Google Maps implementation
        createRealGoogleMap(mapContainer) {
            console.log('🗺️ Creating real Google Map...');
            try {
                // Clear loading overlay
                mapContainer.innerHTML = '';

                // Create map centered on Phoenix
                this.googleMap = new google.maps.Map(mapContainer, {
                    center: { lat: this.userLat, lng: this.userLng },
                    zoom: 12,
                    mapTypeId: google.maps.MapTypeId.ROADMAP,
                    styles: [
                        {
                            featureType: "all",
                            elementType: "geometry.fill",
                            stylers: [{ color: "#2c1810" }]
                        },
                        {
                            featureType: "water",
                            elementType: "geometry",
                            stylers: [{ color: "#193047" }]
                        },
                        {
                            featureType: "road",
                            elementType: "geometry",
                            stylers: [{ color: "#451a03" }]
                        }
                    ],
                    disableDefaultUI: true,
                    zoomControl: true,
                    zoomControlOptions: {
                        position: google.maps.ControlPosition.RIGHT_BOTTOM
                    }
                });

                // Add user marker
                this.userMarker = new google.maps.Marker({
                    position: { lat: this.userLat, lng: this.userLng },
                    map: this.googleMap,
                    title: 'Your Location',
                    icon: {
                        path: google.maps.SymbolPath.CIRCLE,
                        scale: 8,
                        fillColor: '#4285F4',
                        fillOpacity: 1,
                        strokeColor: '#ffffff',
                        strokeWeight: 3
                    }
                });

                // Add token markers
                this.addRealTokenMarkers();

                this.googleMapsLoaded = true;
                this.mapLoadingComplete = true;
                
                // Start game features after map loads
                setTimeout(() => {
                    this.startGameFeatures();
                }, 1000);

                console.log('✅ Real Google Map initialized successfully');
                
            } catch (error) {
                console.error('❌ Real Google Map creation error:', error);
                this.createEnhancedDemoMap(mapContainer);
            }
        }

        // Add real token markers to Google Maps
        addRealTokenMarkers() {
            console.log('💎 Adding real token markers to Google Map...');
            
            this.emberTokens.forEach((token, index) => {
                if (!this.isTokenCollected(token.id)) {
                    const marker = new google.maps.Marker({
                        position: { lat: token.lat, lng: token.lng },
                        map: this.googleMap,
                        title: `${token.location} - ${token.value} $Ember`,
                        icon: {
                            url: '../images/VPEmberCoin.PNG',
                            scaledSize: new google.maps.Size(40, 40),
                            origin: new google.maps.Point(0, 0),
                            anchor: new google.maps.Point(20, 20)
                        }
                    });

                    // Add click listener
                    marker.addListener('click', () => {
                        token.distance = this.calculateDistance(
                            this.userLat, this.userLng,
                            token.lat, token.lng
                        );
                        this.showTokenModal(token);
                    });

                    this.tokenMarkers.push({ marker, token });
                }
            });
        }

        // ENHANCED: Demo map with better features - COMPLETE RESTORATION
        createEnhancedDemoMap(mapContainer) {
            console.log('🎮 Creating enhanced demo map...');
            try {
                // Clear loading overlay
                mapContainer.innerHTML = '';

                // Create enhanced demo map structure
                mapContainer.innerHTML = `
                    <div class="demo-map-container" id="demoMapContainer" style="
                        position: absolute;
                        top: 0;
                        left: 0;
                        width: 100%;
                        height: 100%;
                        background: linear-gradient(135deg, #d4a574 0%, #e6c896 25%, #f0d4a8 50%, #f5e2bf 75%, #faf0d1 100%);
                        overflow: hidden;
                        z-index: 1;
                    ">
                        <div class="demo-map-grid" style="
                            position: absolute;
                            top: 0;
                            left: 0;
                            width: 100%;
                            height: 100%;
                            background-image: 
                                linear-gradient(rgba(139, 69, 19, 0.3) 1px, transparent 1px),
                                linear-gradient(90deg, rgba(139, 69, 19, 0.3) 1px, transparent 1px);
                            background-size: 50px 50px;
                            opacity: 0.4;
                        "></div>
                        
                        <div class="demo-map-streets">
                            <div class="demo-street horizontal" style="position: absolute; top: 20%; width: 100%; height: 4px; background: rgba(101, 67, 33, 0.6); z-index: 2;"></div>
                            <div class="demo-street horizontal" style="position: absolute; top: 40%; width: 100%; height: 4px; background: rgba(101, 67, 33, 0.6); z-index: 2;"></div>
                            <div class="demo-street horizontal" style="position: absolute; top: 60%; width: 100%; height: 4px; background: rgba(101, 67, 33, 0.6); z-index: 2;"></div>
                            <div class="demo-street horizontal" style="position: absolute; top: 80%; width: 100%; height: 4px; background: rgba(101, 67, 33, 0.6); z-index: 2;"></div>
                            <div class="demo-street vertical" style="position: absolute; left: 25%; width: 4px; height: 100%; background: rgba(101, 67, 33, 0.6); z-index: 2;"></div>
                            <div class="demo-street vertical" style="position: absolute; left: 50%; width: 4px; height: 100%; background: rgba(101, 67, 33, 0.6); z-index: 2;"></div>
                            <div class="demo-street vertical" style="position: absolute; left: 75%; width: 4px; height: 100%; background: rgba(101, 67, 33, 0.6); z-index: 2;"></div>
                        </div>
                        
                        <div class="demo-phoenix-label" style="
                            position: absolute;
                            top: 10px;
                            left: 10px;
                            color: rgba(139, 69, 19, 0.8);
                            font-size: 16px;
                            font-weight: 700;
                            z-index: 5;
                            background: rgba(255, 255, 255, 0.8);
                            padding: 4px 8px;
                            border-radius: 4px;
                        ">🏜️ Phoenix, Arizona</div>
                        
                        <div class="demo-user-marker" title="Your Location - Phoenix, AZ" style="
                            position: absolute;
                            top: 50%;
                            left: 50%;
                            width: 24px;
                            height: 24px;
                            background: #4285F4;
                            border: 4px solid white;
                            border-radius: 50%;
                            transform: translate(-50%, -50%);
                            z-index: 30;
                            box-shadow: 0 3px 15px rgba(66, 133, 244, 0.8);
                        "></div>
                        
                        <div class="demo-map-markers" id="demoMarkers" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; z-index: 15;"></div>
                        <div class="demo-map-labels" id="demoLabels" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; z-index: 12;"></div>
                    </div>
                    <div class="demo-map-controls" style="
                        position: absolute;
                        bottom: 20px;
                        right: 20px;
                        z-index: 20;
                        display: flex;
                        flex-direction: column;
                        gap: 8px;
                    ">
                        <button class="map-control-btn" id="zoomInBtn" title="Zoom In" style="
                            width: 40px;
                            height: 40px;
                            background: rgba(240, 165, 0, 0.9);
                            border: 2px solid rgba(255, 255, 255, 0.8);
                            border-radius: 8px;
                            color: white;
                            font-size: 18px;
                            font-weight: bold;
                            cursor: pointer;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            box-shadow: 0 4px 12px rgba(240, 165, 0, 0.4);
                        ">+</button>
                        <button class="map-control-btn" id="zoomOutBtn" title="Zoom Out" style="
                            width: 40px;
                            height: 40px;
                            background: rgba(240, 165, 0, 0.9);
                            border: 2px solid rgba(255, 255, 255, 0.8);
                            border-radius: 8px;
                            color: white;
                            font-size: 18px;
                            font-weight: bold;
                            cursor: pointer;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            box-shadow: 0 4px 12px rgba(240, 165, 0, 0.4);
                        ">-</button>
                    </div>
                `;

                // Ensure container is visible
                mapContainer.style.display = 'block';
                mapContainer.style.position = 'absolute';
                mapContainer.style.top = '0';
                mapContainer.style.left = '0';
                mapContainer.style.width = '100%';
                mapContainer.style.height = '100%';
                mapContainer.style.zIndex = '1';

                this.mapContainer = document.getElementById('demoMapContainer');
                this.setupMapInteractions();

                // Add demo token markers
                setTimeout(() => {
                    this.addDemoTokenMarkers();
                    this.googleMapsLoaded = true;
                    this.mapLoadingComplete = true;
                    this.startGameFeatures();
                }, 500);

                console.log('✅ Enhanced demo map initialized successfully');
                
            } catch (error) {
                console.error('❌ Enhanced demo map creation error:', error);
            }
        }

        // ENHANCED: Demo token markers with better labels - COMPLETE RESTORATION
        addDemoTokenMarkers() {
            console.log('💎 Adding enhanced demo token markers...');
            try {
                const markersContainer = document.getElementById('demoMarkers');
                const labelsContainer = document.getElementById('demoLabels');
                
                if (!markersContainer) {
                    console.error('❌ Demo markers containers not found');
                    return;
                }

                markersContainer.innerHTML = '';
                if (labelsContainer) labelsContainer.innerHTML = '';

                let markerCount = 0;
                this.emberTokens.forEach((token, index) => {
                    if (!this.isTokenCollected(token.id)) {
                        this.addEnhancedDemoMarker(token, index, markersContainer, labelsContainer);
                        markerCount++;
                    }
                });

                console.log(`✅ Added ${markerCount} enhanced demo markers`);
            } catch (error) {
                console.error('❌ Demo token markers error:', error);
            }
        }

        addEnhancedDemoMarker(token, index, markersContainer, labelsContainer) {
            try {
                const positions = [
                    { x: 52, y: 48 }, // Demo nearby token - center
                    { x: 45, y: 35 }, // Downtown Phoenix - upper left
                    { x: 75, y: 25 }, // Scottsdale Quarter - upper right
                    { x: 55, y: 85 }, // Desert Botanical Garden - lower center
                    { x: 80, y: 30 }, // Old Town Scottsdale - upper right
                    { x: 30, y: 70 }, // Arizona State University - lower left
                    { x: 40, y: 90 }, // Phoenix Sky Harbor - bottom left
                    { x: 65, y: 15 }, // Camelback Mountain - top center
                    { x: 25, y: 55 }, // Roosevelt Row - left center
                    { x: 35, y: 40 }, // Tempe Town Lake - left center
                    { x: 70, y: 75 }, // Chase Field - lower right
                    { x: 60, y: 65 }, // Papago Park - center right
                    { x: 70, y: 20 }  // Biltmore Fashion Park - upper right
                ];

                const position = positions[index] || { 
                    x: 50 + (index * 10) % 40, 
                    y: 50 + (index * 15) % 40 
                };

                // Create enhanced marker with proper styling
                const marker = document.createElement('div');
                marker.className = `demo-token-marker ${token.tier}`;
                marker.style.cssText = `
                    position: absolute;
                    left: ${position.x}%;
                    top: ${position.y}%;
                    width: 40px;
                    height: 40px;
                    cursor: pointer;
                    pointer-events: auto;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    transition: all 0.3s ease;
                    z-index: 15;
                    border-radius: 50%;
                    background: rgba(240, 165, 0, 0.1);
                    border: 3px solid rgba(240, 165, 0, 0.6);
                    box-shadow: 0 0 20px rgba(240, 165, 0, 0.6);
                    animation: markerPulse 3s ease-in-out infinite;
                    transform: translate(-50%, -50%);
                `;
                marker.title = `${token.location} - ${token.value} $Ember`;
                marker.dataset.tokenId = token.id;

                const tokenImage = document.createElement('img');
                tokenImage.src = '../images/VPEmberCoin.PNG';
                tokenImage.alt = 'Ember Coin';
                tokenImage.style.cssText = `
                    width: 34px;
                    height: 34px;
                    border-radius: 50%;
                    object-fit: cover;
                    filter: brightness(1.2) drop-shadow(0 3px 12px rgba(240, 165, 0, 0.8));
                    transition: all 0.3s ease;
                `;
                tokenImage.onerror = function() {
                    this.style.display = 'none';
                    marker.textContent = '💎';
                    marker.style.fontSize = '16px';
                    marker.style.color = '#f0a500';
                };

                // ENHANCED: Better value overlay
                const valueOverlay = document.createElement('div');
                valueOverlay.style.cssText = `
                    position: absolute;
                    bottom: -12px;
                    left: 50%;
                    transform: translateX(-50%);
                    background: linear-gradient(135deg, #f0a500, #fb923c);
                    color: white;
                    font-size: 11px;
                    font-weight: 900;
                    padding: 4px 8px;
                    border-radius: 12px;
                    border: 2px solid white;
                    backdrop-filter: blur(5px);
                    white-space: nowrap;
                    pointer-events: none;
                    box-shadow: 0 3px 12px rgba(240, 165, 0, 0.6);
                    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
                    animation: valueBadgePulse 2s ease-in-out infinite;
                `;
                valueOverlay.textContent = `${token.value}`;

                marker.appendChild(tokenImage);
                marker.appendChild(valueOverlay);

                // ENHANCED: Click handler shows proper navigation modal
                marker.addEventListener('click', (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    
                    // Visual feedback
                    marker.style.transform = 'translate(-50%, -50%) scale(1.2)';
                    marker.style.zIndex = '1000';
                    
                    setTimeout(() => {
                        marker.style.transform = 'translate(-50%, -50%) scale(1)';
                        marker.style.zIndex = '15';
                    }, 300);
                    
                    // Calculate distance and show navigation modal
                    token.distance = this.calculateDistance(
                        this.userLat, this.userLng,
                        token.lat, token.lng
                    );
                    
                    this.showNavigationModal(token);
                    
                    if (navigator.vibrate) {
                        navigator.vibrate(30);
                    }
                });

                // Add location label
                if (labelsContainer) {
                    const label = document.createElement('div');
                    label.style.cssText = `
                        position: absolute;
                        left: ${position.x}%;
                        top: ${position.y - 8}%;
                        transform: translateX(-50%);
                        background: rgba(139, 69, 19, 0.9);
                        color: white;
                        font-size: 12px;
                        font-weight: 700;
                        padding: 4px 8px;
                        border-radius: 8px;
                        white-space: nowrap;
                        pointer-events: none;
                        z-index: 12;
                        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
                        border: 1px solid rgba(240, 165, 0, 0.4);
                    `;
                    label.textContent = token.location;
                    labelsContainer.appendChild(label);
                }

                markersContainer.appendChild(marker);

                // Animate appearance
                setTimeout(() => {
                    marker.style.opacity = '1';
                }, index * 150);

            } catch (error) {
                console.error('❌ Enhanced demo marker creation error:', error);
            }
        }

        // Add CSS keyframes for animations
        addMapAnimationStyles() {
            if (document.getElementById('mapAnimationStyles')) return;
            
            const style = document.createElement('style');
            style.id = 'mapAnimationStyles';
            style.textContent = `
                @keyframes markerPulse {
                    0%, 100% { 
                        box-shadow: 0 0 0 0 rgba(240, 165, 0, 0.7);
                        transform: translate(-50%, -50%) scale(1);
                    }
                    50% { 
                        box-shadow: 0 0 0 20px rgba(240, 165, 0, 0);
                        transform: translate(-50%, -50%) scale(1.05);
                    }
                }
                
                @keyframes valueBadgePulse {
                    0%, 100% { transform: translateX(-50%) scale(1); }
                    50% { transform: translateX(-50%) scale(1.05); }
                }
                
                .demo-token-marker:hover {
                    transform: translate(-50%, -50%) scale(1.15) !important;
                    z-index: 25 !important;
                }
                
                .demo-token-marker:active {
                    transform: translate(-50%, -50%) scale(0.95) !important;
                }
                
                .demo-token-marker.high {
                    border-color: #ff6b6b !important;
                    box-shadow: 0 0 20px rgba(255, 107, 107, 0.6) !important;
                }
                
                .demo-token-marker.medium {
                    border-color: #fb923c !important;
                    box-shadow: 0 0 20px rgba(251, 146, 60, 0.6) !important;
                }
                
                .demo-token-marker.low {
                    border-color: #4CAF50 !important;
                    box-shadow: 0 0 20px rgba(76, 175, 80, 0.6) !important;
                }
            `;
            document.head.appendChild(style);
        }

        // ENHANCED: Start game features after map loads
        startGameFeatures() {
            console.log('🎮 Starting game features...');
            
            // Add animation styles
            this.addMapAnimationStyles();
            
            // Update location card with coordinates
            this.updateLocationDisplay();
            
            // Start proximity checking
            this.checkTokenProximity();
            
            // Update nearby tokens display
            this.updateNearbyTokens();
            
            console.log('✅ Game features started');
        }

        // ENHANCED: Update location display with campaign info
        updateLocationDisplay() {
            try {
                const latEl = document.getElementById('fallbackLat');
                const lngEl = document.getElementById('fallbackLng');
                
                if (latEl) latEl.textContent = this.userLat.toFixed(4);
                if (lngEl) lngEl.textContent = this.userLng.toFixed(4);
                
            } catch (error) {
                console.error('❌ Location display update error:', error);
            }
        }

        // ENHANCED: Navigation modal with driving/walking directions
        showNavigationModal(token) {
            console.log('🗺️ Showing navigation modal for:', token.location);
            try {
                this.currentNavigationToken = token;
                
                const modal = document.getElementById('navigationModal');
                const tokenName = document.getElementById('navTokenName');
                const distance = document.getElementById('navDistance');
                const walkTime = document.getElementById('navWalkTime');
                const driveTime = document.getElementById('navDriveTime');
                const arOption = document.getElementById('navAR');
                
                if (tokenName) tokenName.textContent = `${token.value} $Ember Token`;
                
                if (token.distance) {
                    const distanceText = token.distance < 1 ? 
                        `${(token.distance * 1000).toFixed(0)}m away` : 
                        `${token.distance.toFixed(1)}km away`;
                    
                    if (distance) distance.textContent = distanceText;
                    
                    const walkMinutes = Math.round(token.distance * 12);
                    const driveMinutes = Math.round(token.distance * 2);
                    
                    if (walkTime) walkTime.textContent = `~${walkMinutes} min`;
                    if (driveTime) driveTime.textContent = `~${driveMinutes} min`;
                    
                    // Show AR option if close enough
                    const isCloseEnough = token.distance <= 0.1;
                    if (arOption) {
                        arOption.style.display = isCloseEnough ? 'flex' : 'none';
                        if (isCloseEnough) {
                            arOption.onclick = () => {
                                this.hideNavigationModal();
                                this.switchMode('ar');
                            };
                        }
                    }
                }
                
                if (modal) {
                    modal.classList.add('show');
                }
                
            } catch (error) {
                console.error('❌ Navigation modal error:', error);
            }
        }

        hideNavigationModal() {
            const modal = document.getElementById('navigationModal');
            if (modal) {
                modal.classList.remove('show');
            }
            this.currentNavigationToken = null;
        }

        openMapsNavigation(mode) {
            if (!this.currentNavigationToken) return;
            
            const token = this.currentNavigationToken;
            const destination = `${token.lat},${token.lng}`;
            
            const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
            
            let mapsUrl;
            if (mode === 'walking') {
                mapsUrl = isIOS ? 
                    `maps://maps.google.com/maps?daddr=${destination}&dirflg=w` :
                    `https://maps.google.com/maps?daddr=${destination}&dirflg=w`;
            } else if (mode === 'driving') {
                mapsUrl = isIOS ? 
                    `maps://maps.google.com/maps?daddr=${destination}&dirflg=d` :
                    `https://maps.google.com/maps?daddr=${destination}&dirflg=d`;
            }
            
            if (mapsUrl) {
                window.open(mapsUrl, '_blank');
                this.hideNavigationModal();
            }
            
            console.log(`🗺️ Opening ${mode} navigation to ${token.location}`);
        }

        // ENHANCED: Setup map interactions
        setupMapInteractions() {
            if (!this.mapContainer) return;

            console.log('🖱️ Setting up enhanced map interactions...');

            const zoomInBtn = document.getElementById('zoomInBtn');
            const zoomOutBtn = document.getElementById('zoomOutBtn');

            if (zoomInBtn) {
                zoomInBtn.addEventListener('click', () => this.zoomMap(1.2));
            }

            if (zoomOutBtn) {
                zoomOutBtn.addEventListener('click', () => this.zoomMap(0.8));
            }

            // Touch/mouse events for panning
            this.mapContainer.addEventListener('mousedown', (e) => this.startMapDrag(e));
            this.mapContainer.addEventListener('touchstart', (e) => this.startMapDrag(e), { passive: false });

            document.addEventListener('mousemove', (e) => this.dragMap(e));
            document.addEventListener('touchmove', (e) => this.dragMap(e), { passive: false });

            document.addEventListener('mouseup', () => this.endMapDrag());
            document.addEventListener('touchend', () => this.endMapDrag());

            // Mouse wheel zoom
            this.mapContainer.addEventListener('wheel', (e) => {
                e.preventDefault();
                const scale = e.deltaY > 0 ? 0.9 : 1.1;
                this.zoomMap(scale);
            });

            console.log('✅ Enhanced map interactions setup complete');
        }

        startMapDrag(e) {
            if (e.touches && e.touches.length > 1) return;

            this.isDraggingMap = true;
            this.mapContainer.style.cursor = 'grabbing';

            const clientX = e.touches ? e.touches[0].clientX : e.clientX;
            const clientY = e.touches ? e.touches[0].clientY : e.clientY;

            this.lastTouchX = clientX;
            this.lastTouchY = clientY;

            if (e.preventDefault) e.preventDefault();
        }

        dragMap(e) {
            if (!this.isDraggingMap) return;

            const clientX = e.touches ? e.touches[0].clientX : e.clientX;
            const clientY = e.touches ? e.touches[0].clientY : e.clientY;

            const deltaX = clientX - this.lastTouchX;
            const deltaY = clientY - this.lastTouchY;

            this.mapTranslateX += deltaX;
            this.mapTranslateY += deltaY;

            this.updateMapTransform();

            this.lastTouchX = clientX;
            this.lastTouchY = clientY;

            if (e.preventDefault) e.preventDefault();
        }

        endMapDrag() {
            this.isDraggingMap = false;
            if (this.mapContainer) {
                this.mapContainer.style.cursor = 'grab';
            }
        }

        zoomMap(scale) {
            const newScale = Math.max(0.5, Math.min(3, this.mapScale * scale));
            
            if (newScale !== this.mapScale) {
                this.mapScale = newScale;
                this.updateMapTransform();

                if (navigator.vibrate) {
                    navigator.vibrate(10);
                }
            }
        }

        updateMapTransform() {
            if (this.mapContainer) {
                this.mapContainer.style.transform = `translate(${this.mapTranslateX}px, ${this.mapTranslateY}px) scale(${this.mapScale})`;
            }
        }

        // Continue with remaining methods in next response...
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

        switchToMap() {
            console.log('🗺️ Switching to Map mode');
            try {
                document.getElementById('map').style.display = 'block';
                document.getElementById('video').style.display = 'none';
                document.getElementById('canvas').style.display = 'none';
                document.getElementById('vaultView').style.display = 'none';
                document.getElementById('campaignsView').style.display = 'none';
                
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
            } catch (error) {
                console.error('❌ Campaigns switch error:', error);
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
            } catch (error) {
                console.error('❌ AR switch error:', error);
            }
        }

        showARNoAccessModal() {
            console.log('🚫 Showing AR no access modal');
            alert('AR Mode requires you to be within 100 meters of a token location. Get closer to a token to unlock AR hunting!');
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

        checkTokenProximity() {
            // Proximity checking logic
            console.log('📍 Checking token proximity...');
        }

        updateNearbyTokens() {
            console.log('🔍 Updating nearby tokens...');
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

        updateVaultStats() {
            console.log('📊 Updating vault stats...');
            try {
                const elements = {
                    navEmberCount: document.getElementById('navEmberCount'),
                    menuEmberCount: document.getElementById('menuEmberCount')
                };
                
                if (elements.navEmberCount) elements.navEmberCount.textContent = this.totalTokenValue;
                if (elements.menuEmberCount) elements.menuEmberCount.textContent = this.totalTokenValue;
                
            } catch (error) {
                console.error('❌ Vault stats update error:', error);
            }
        }

        setupEventListeners() {
            console.log('🎧 Setting up event listeners...');
            try {
                const handlers = [
                    { id: 'homeBtn', event: 'click', handler: () => this.goHome() },
                    { id: 'menuToggle', event: 'click', handler: () => this.toggleMenu() },
                    { id: 'menuOverlay', event: 'click', handler: () => this.closeMenu() },
                    { id: 'navClose', event: 'click', handler: () => this.hideNavigationModal() },
                    { id: 'navWalking', event: 'click', handler: () => this.openMapsNavigation('walking') },
                    { id: 'navDriving', event: 'click', handler: () => this.openMapsNavigation('driving') }
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
            } catch (error) {
                console.error('❌ Navigation update error:', error);
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
        }

        initializeCampaigns() {
            console.log('🏆 Initializing campaigns...');
        }

        setupSwipeableModule() {
            console.log('👆 Setting up swipeable module...');
        }

        addHapticFeedback() {
            console.log('📳 Adding haptic feedback...');
        }

        showWelcomeScreen() {
            console.log('👋 Showing welcome screen...');
            try {
                // Auto-initialize map after brief delay
                setTimeout(() => {
                    this.initializeGoogleMap();
                }, 1000);
            } catch (error) {
                console.error('❌ Welcome screen error:', error);
            }
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
