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

// Global Google Maps callback function
window.initMap = function() {
    console.log('🗺️ Google Maps API loaded, initializing map...');
    if (window.vaultPhoenixApp && typeof window.vaultPhoenixApp.initializeGoogleMap === 'function') {
        window.vaultPhoenixApp.initializeGoogleMap();
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
            this.availableTokensCount = 12; // Total tokens available in campaign
            this.orientationHandler = null;
            this.currentUser = null;
            
            // Swipeable module properties
            this.moduleExpanded = false;
            this.moduleStartY = 0;
            this.moduleCurrentY = 0;
            this.isDragging = false;
            this.moduleTranslateY = 0;
            
            // Google Maps properties
            this.googleMap = null;
            this.tokenMarkers = [];
            this.infoWindows = [];

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
                    this.showWelcomeScreen(); // Show welcome screen first
                    document.body.classList.add('crypto-dashboard-page');
                    // Set initial mode
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

        // =================== DASHBOARD SYSTEM ===================
        // CRITICAL FIX: Set data-mode attribute on body
        setModeAttribute(mode) {
            try {
                document.body.setAttribute('data-mode', mode);
                console.log('🔧 Set mode attribute to:', mode);
            } catch (error) {
                console.error('❌ Mode attribute error:', error);
            }
        }

        // GOOGLE MAPS INTEGRATION
        initializeGoogleMap() {
            console.log('🗺️ Initializing Google Maps...');
            try {
                const mapContainer = document.getElementById('googleMap');
                if (!mapContainer) {
                    console.error('❌ Google Map container not found');
                    return;
                }

                // Create map centered on Phoenix
                this.googleMap = new google.maps.Map(mapContainer, {
                    center: { lat: this.userLat, lng: this.userLng },
                    zoom: 12,
                    styles: [
                        {
                            "featureType": "all",
                            "elementType": "geometry.fill",
                            "stylers": [{"color": "#1a1a1a"}]
                        },
                        {
                            "featureType": "all",
                            "elementType": "geometry.stroke",
                            "stylers": [{"color": "#2d1810"}]
                        },
                        {
                            "featureType": "all",
                            "elementType": "labels.text.fill",
                            "stylers": [{"color": "#f0a500"}]
                        },
                        {
                            "featureType": "water",
                            "elementType": "geometry.fill",
                            "stylers": [{"color": "#0f0f0f"}]
                        }
                    ],
                    disableDefaultUI: true,
                    zoomControl: true,
                    zoomControlOptions: {
                        position: google.maps.ControlPosition.RIGHT_BOTTOM
                    }
                });

                // Add user location marker
                this.addUserLocationMarker();
                
                // Add token markers
                this.addTokenMarkers();
                
                this.googleMapsLoaded = true;
                console.log('✅ Google Maps initialized successfully');
                
            } catch (error) {
                console.error('❌ Google Maps initialization error:', error);
                // Fall back to basic map display
                this.showMapFallback();
            }
        }

        addUserLocationMarker() {
            try {
                if (!this.googleMap) return;

                const userIcon = {
                    path: google.maps.SymbolPath.CIRCLE,
                    fillColor: '#4285F4',
                    fillOpacity: 1,
                    strokeColor: '#ffffff',
                    strokeWeight: 3,
                    scale: 8
                };

                this.userMarker = new google.maps.Marker({
                    position: { lat: this.userLat, lng: this.userLng },
                    map: this.googleMap,
                    icon: userIcon,
                    title: 'Your Location',
                    zIndex: 1000
                });

                console.log('📍 User location marker added');
            } catch (error) {
                console.error('❌ User marker error:', error);
            }
        }

        addTokenMarkers() {
            try {
                if (!this.googleMap) return;

                // Clear existing markers
                this.tokenMarkers.forEach(marker => marker.setMap(null));
                this.tokenMarkers = [];
                this.infoWindows.forEach(infoWindow => infoWindow.close());
                this.infoWindows = [];

                // Add markers for uncollected tokens only
                this.emberTokens.forEach(token => {
                    if (!this.isTokenCollected(token.id)) {
                        this.addTokenMarker(token);
                    }
                });

                console.log('💎 Token markers added to map');
            } catch (error) {
                console.error('❌ Token markers error:', error);
            }
        }

        addTokenMarker(token) {
            try {
                // Create custom marker icon based on tier
                const markerIcon = {
                    path: google.maps.SymbolPath.CIRCLE,
                    fillColor: this.getTierColor(token.tier),
                    fillOpacity: 0.9,
                    strokeColor: '#f0a500',
                    strokeWeight: 3,
                    scale: 12
                };

                const marker = new google.maps.Marker({
                    position: { lat: token.lat, lng: token.lng },
                    map: this.googleMap,
                    icon: markerIcon,
                    title: `${token.location} - ${token.value} $Ember`,
                    zIndex: 100
                });

                // Create info window
                const infoWindow = new google.maps.InfoWindow({
                    content: this.createTokenInfoContent(token)
                });

                // Add click listener
                marker.addListener('click', () => {
                    // Close all other info windows
                    this.infoWindows.forEach(iw => iw.close());
                    
                    // Open this info window
                    infoWindow.open(this.googleMap, marker);
                    
                    // Show navigation options after a brief delay
                    setTimeout(() => {
                        this.showNavigationModal(token);
                    }, 500);
                });

                this.tokenMarkers.push(marker);
                this.infoWindows.push(infoWindow);

            } catch (error) {
                console.error('❌ Token marker creation error:', error);
            }
        }

        getTierColor(tier) {
            switch (tier) {
                case 'high': return '#ff6b6b';
                case 'medium': return '#fb923c';
                case 'low': return '#4CAF50';
                default: return '#f0a500';
            }
        }

        createTokenInfoContent(token) {
            return `
                <div style="color: #333; padding: 8px; min-width: 200px;">
                    <h4 style="margin: 0 0 8px 0; color: #f0a500;">${token.location}</h4>
                    <p style="margin: 0 0 4px 0; font-weight: bold;">${token.value} $Ember Token</p>
                    <p style="margin: 0 0 8px 0; font-size: 12px;">Sponsored by ${token.sponsor}</p>
                    <p style="margin: 0; font-size: 11px; color: #666;">${token.message}</p>
                </div>
            `;
        }

        showMapFallback() {
            console.log('🗺️ Showing map fallback');
            // Keep the existing fallback content visible
            const mapContainer = document.getElementById('googleMap');
            if (mapContainer) {
                mapContainer.style.display = 'none';
            }
        }

        // SWIPEABLE MODULE FUNCTIONALITY
        setupSwipeableModule() {
            console.log('👆 Setting up swipeable module...');
            try {
                const moduleElement = document.getElementById('tokenLocationsModule');
                const handleElement = document.getElementById('swipeHandle');
                
                if (!moduleElement || !handleElement) {
                    console.error('❌ Swipeable module elements not found');
                    return;
                }

                // Touch events for mobile
                handleElement.addEventListener('touchstart', (e) => this.handleTouchStart(e));
                handleElement.addEventListener('touchmove', (e) => this.handleTouchMove(e));
                handleElement.addEventListener('touchend', (e) => this.handleTouchEnd(e));

                // Mouse events for desktop
                handleElement.addEventListener('mousedown', (e) => this.handleMouseStart(e));
                document.addEventListener('mousemove', (e) => this.handleMouseMove(e));
                document.addEventListener('mouseup', (e) => this.handleMouseEnd(e));

                // Initialize with closest tokens
                this.updateNearbyTokens();
                
                console.log('✅ Swipeable module setup complete');
            } catch (error) {
                console.error('❌ Swipeable module setup error:', error);
            }
        }

        handleTouchStart(e) {
            this.isDragging = true;
            this.moduleStartY = e.touches[0].clientY;
            this.moduleCurrentY = this.moduleStartY;
            
            if (navigator.vibrate) {
                navigator.vibrate(10);
            }
        }

        handleTouchMove(e) {
            if (!this.isDragging) return;
            
            e.preventDefault();
            this.moduleCurrentY = e.touches[0].clientY;
            const deltaY = this.moduleCurrentY - this.moduleStartY;
            
            this.updateModulePosition(deltaY);
        }

        handleTouchEnd(e) {
            if (!this.isDragging) return;
            
            this.isDragging = false;
            const deltaY = this.moduleCurrentY - this.moduleStartY;
            
            this.snapModule(deltaY);
        }

        handleMouseStart(e) {
            this.isDragging = true;
            this.moduleStartY = e.clientY;
            this.moduleCurrentY = this.moduleStartY;
            
            e.preventDefault();
        }

        handleMouseMove(e) {
            if (!this.isDragging) return;
            
            e.preventDefault();
            this.moduleCurrentY = e.clientY;
            const deltaY = this.moduleCurrentY - this.moduleStartY;
            
            this.updateModulePosition(deltaY);
        }

        handleMouseEnd(e) {
            if (!this.isDragging) return;
            
            this.isDragging = false;
            const deltaY = this.moduleCurrentY - this.moduleStartY;
            
            this.snapModule(deltaY);
        }

        updateModulePosition(deltaY) {
            const moduleElement = document.getElementById('tokenLocationsModule');
            if (!moduleElement) return;

            // Limit the drag range
            const maxDrag = 200;
            const minDrag = -200;
            const constrainedDelta = Math.max(minDrag, Math.min(maxDrag, deltaY));
            
            this.moduleTranslateY = constrainedDelta;
            
            if (this.moduleExpanded) {
                // When expanded, dragging down should close
                moduleElement.style.transform = `translateY(${Math.max(0, constrainedDelta)}px)`;
            } else {
                // When collapsed, dragging up should open
                moduleElement.style.transform = `translateY(calc(100% - 80px + ${Math.min(0, constrainedDelta)}px))`;
            }
        }

        snapModule(deltaY) {
            const moduleElement = document.getElementById('tokenLocationsModule');
            if (!moduleElement) return;

            const threshold = 50; // Minimum drag distance to trigger state change

            if (this.moduleExpanded) {
                // If expanded and dragged down enough, collapse
                if (deltaY > threshold) {
                    this.collapseModule();
                } else {
                    this.expandModule();
                }
            } else {
                // If collapsed and dragged up enough, expand
                if (deltaY < -threshold) {
                    this.expandModule();
                } else {
                    this.collapseModule();
                }
            }
        }

        expandModule() {
            const moduleElement = document.getElementById('tokenLocationsModule');
            if (!moduleElement) return;

            this.moduleExpanded = true;
            moduleElement.classList.add('expanded');
            moduleElement.classList.remove('collapsed');
            moduleElement.style.transform = 'translateY(0)';
            
            console.log('📈 Module expanded');
            
            if (navigator.vibrate) {
                navigator.vibrate(20);
            }
        }

        collapseModule() {
            const moduleElement = document.getElementById('tokenLocationsModule');
            if (!moduleElement) return;

            this.moduleExpanded = false;
            moduleElement.classList.add('collapsed');
            moduleElement.classList.remove('expanded');
            moduleElement.style.transform = 'translateY(calc(100% - 80px))';
            
            console.log('📉 Module collapsed');
            
            if (navigator.vibrate) {
                navigator.vibrate(20);
            }
        }

        updateNearbyTokens() {
            console.log('🔍 Updating nearby tokens...');
            try {
                const uncollectedTokens = this.emberTokens.filter(token => !this.isTokenCollected(token.id));
                
                // Calculate distances and sort by proximity
                const tokensWithDistance = uncollectedTokens.map(token => {
                    const distance = this.calculateDistance(
                        this.userLat, this.userLng,
                        token.lat, token.lng
                    );
                    return { ...token, distance };
                }).sort((a, b) => a.distance - b.distance);

                // Get the 3 closest tokens
                const nearestTokens = tokensWithDistance.slice(0, 3);
                
                // Update the UI
                this.populateTokenLocationsList(nearestTokens);
                this.updateTokenCounts(uncollectedTokens.length, nearestTokens.length);
                
            } catch (error) {
                console.error('❌ Update nearby tokens error:', error);
            }
        }

        populateTokenLocationsList(tokens) {
            const listContainer = document.getElementById('tokenLocationsList');
            if (!listContainer) return;

            listContainer.innerHTML = '';

            tokens.forEach(token => {
                const tokenItem = this.createTokenLocationItem(token);
                listContainer.appendChild(tokenItem);
            });
        }

        createTokenLocationItem(token) {
            const itemDiv = document.createElement('div');
            itemDiv.className = 'token-location-item';
            itemDiv.dataset.tokenId = token.id;
            
            const distanceText = token.distance < 1 ? 
                `${(token.distance * 1000).toFixed(0)}m away` : 
                `${token.distance.toFixed(1)}km away`;

            itemDiv.innerHTML = `
                <div class="token-item-header">
                    <div class="token-item-icon">
                        <img src="../images/VPEmberCoin.PNG" alt="Ember Coin" class="token-item-coin" onerror="this.textContent='💎'">
                    </div>
                    <div class="token-item-info">
                        <div class="token-item-name">${token.location}</div>
                        <div class="token-item-sponsor">by ${token.sponsor}</div>
                    </div>
                    <div class="token-item-value">${token.value} $E</div>
                </div>
                <div class="token-item-details">
                    <div class="token-item-distance">
                        <span>📍</span>
                        <span>${distanceText}</span>
                    </div>
                    <div class="token-item-tier ${token.tier}">${token.tier.toUpperCase()}</div>
                </div>
            `;

            // Add click handler
            itemDiv.addEventListener('click', () => {
                this.showNavigationModal(token);
                
                if (navigator.vibrate) {
                    navigator.vibrate(30);
                }
            });

            return itemDiv;
        }

        updateTokenCounts(totalAvailable, nearbyCount) {
            const countElement = document.getElementById('nearbyTokenCount');
            const totalElement = document.getElementById('totalAvailable');
            
            if (countElement) {
                countElement.textContent = `${nearbyCount} locations`;
            }
            
            if (totalElement) {
                totalElement.textContent = `${totalAvailable} total available`;
            }
        }

        // NAVIGATION MODAL FUNCTIONALITY
        showNavigationModal(token) {
            console.log('🗺️ Showing navigation modal for:', token.location);
            try {
                this.currentNavigationToken = token;
                
                const modal = document.getElementById('navigationModal');
                const tokenName = document.getElementById('navTokenName');
                const distance = document.getElementById('navDistance');
                const walkTime = document.getElementById('navWalkTime');
                const driveTime = document.getElementById('navDriveTime');
                
                if (tokenName) tokenName.textContent = `${token.value} $Ember Token`;
                
                if (token.distance) {
                    const distanceText = token.distance < 1 ? 
                        `${(token.distance * 1000).toFixed(0)}m away` : 
                        `${token.distance.toFixed(1)}km away`;
                    
                    if (distance) distance.textContent = distanceText;
                    
                    // Estimate travel times (rough calculations)
                    const walkMinutes = Math.round(token.distance * 12); // ~12 min per km walking
                    const driveMinutes = Math.round(token.distance * 2); // ~2 min per km driving
                    
                    if (walkTime) walkTime.textContent = `~${walkMinutes} min`;
                    if (driveTime) driveTime.textContent = `~${driveMinutes} min`;
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
            
            // Detect platform and open appropriate maps app
            const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
            const isAndroid = /Android/.test(navigator.userAgent);
            
            let mapsUrl;
            
            if (mode === 'walking') {
                if (isIOS) {
                    mapsUrl = `maps://maps.google.com/maps?daddr=${destination}&dirflg=w`;
                } else {
                    mapsUrl = `https://maps.google.com/maps?daddr=${destination}&dirflg=w`;
                }
            } else if (mode === 'driving') {
                if (isIOS) {
                    mapsUrl = `maps://maps.google.com/maps?daddr=${destination}&dirflg=d`;
                } else {
                    mapsUrl = `https://maps.google.com/maps?daddr=${destination}&dirflg=d`;
                }
            }
            
            if (mapsUrl) {
                window.open(mapsUrl, '_blank');
                this.hideNavigationModal();
            }
            
            console.log(`🗺️ Opening ${mode} navigation to ${token.location}`);
        }

        startARHunt() {
            this.hideNavigationModal();
            this.switchMode('ar');
        }

        // Additional utility methods for distance calculation
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
                
                // Initialize Google Maps if not already loaded
                if (typeof google !== 'undefined' && google.maps && !this.googleMapsLoaded) {
                    this.initializeGoogleMap();
                }
                
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
                
                // Update nearby tokens display
                this.updateNearbyTokens();
                
                console.log('📊 Available tokens updated:', this.availableTokensCount);
            } catch (error) {
                console.error('❌ Available tokens update error:', error);
            }
        }

        // PLACEHOLDER METHODS - Add full implementation as needed
        ensureSession() { 
            console.log('🔍 Session management...');
            // Add session management logic here
        }

        loadUserInfo() {
            console.log('👤 Loading user info...');
            // Add user info loading logic here
        }

        loadCollectedTokens() {
            console.log('💎 Loading collected tokens...');
            this.collectedTokens = [];
            this.totalTokenValue = 0;
            this.updateVaultStats();
        }

        updateVaultStats() {
            console.log('📊 Updating vault stats...');
            // Add vault stats update logic here
        }

        setupEventListeners() {
            console.log('🎧 Setting up event listeners...');
            // Add comprehensive event listeners here
        }

        initializeVault() {
            console.log('💎 Initializing vault...');
            // Add vault initialization logic here  
        }

        initializeCampaigns() {
            console.log('🏆 Initializing campaigns...');
            // Add campaigns initialization logic here
        }

        addHapticFeedback() {
            console.log('📳 Adding haptic feedback...');
            // Add haptic feedback logic here
        }

        start() {
            console.log('🚀 Starting game systems...');
            this.isStarted = true;
            return Promise.resolve();
        }

        switchMode(mode) {
            console.log('🔄 Switching to mode:', mode);
            this.currentMode = mode;
            this.setModeAttribute(mode);
            // Add mode switching logic here
        }

        showLoading(show) {
            console.log('⏳ Loading state:', show);
            // Add loading display logic here
        }

        updateStatus(message, isError = false) {
            console.log('📊 Status update:', message);
            // Add status update logic here
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
