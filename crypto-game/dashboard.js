// Vault Phoenix AR Crypto Gaming - DASHBOARD SYSTEM
// PROTECTION: Only affects crypto-game/ folder - prevents main site interference
// FILE PATH: crypto-game/dashboard.js

console.log('🔥💎 Vault Phoenix Dashboard JavaScript Loading...');

// IMMEDIATE PROTECTION - CHECK IF THIS IS A CRYPTO GAME PAGE
(function() {
    const cryptoFlag = document.getElementById('cryptoGameFlag');
    const isCryptoPage = cryptoFlag || 
                        document.body.classList.contains('crypto-dashboard-page') || 
                        window.location.pathname.includes('crypto-game') ||
                        document.title.includes('Vault Phoenix');
    
    if (!isCryptoPage) {
        console.log('🚫 Not a crypto game page - blocking dashboard JavaScript execution');
        return;
    }
    
    window.isVaultPhoenixDashboard = true;
    console.log('🔥💎 Dashboard JavaScript ACTIVE - Page confirmed');
})();

// ONLY RUN DASHBOARD IF THIS IS A CRYPTO GAME PAGE AND SESSION IS VALID
if (window.isVaultPhoenixDashboard) {

    class VaultPhoenixDashboard {
        constructor() {
            console.log('🔥💎 Vault Phoenix Dashboard initializing...');
            
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
            this.googleMap = null;
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
            
            // Google Maps properties
            this.tokenMarkers = [];
            this.infoWindows = [];
            this.isNearToken = false;

            // Enhanced Ember Token System with Real Locations and Value Tiers
            this.emberTokens = [
                // DEMO: Nearby token for AR mode demonstration - FIXED POSITIONING
                { id: 13, value: 100, tier: "low", location: "Phoenix Downtown Plaza", lat: 33.4486, lng: -112.0742, sponsor: "Demo Location", message: "You're close! Try AR mode!", description: "This is a demo token placed nearby to show AR functionality." },
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
            console.log('🔧 Initializing Vault Phoenix Dashboard...');
            try {
                // Ensure session is valid before proceeding
                if (!window.vaultPhoenixSession || !window.vaultPhoenixSession.isSessionValid()) {
                    console.error('❌ No valid session found for dashboard');
                    return;
                }

                this.ensureSession();
                this.loadUserInfo();
                this.loadCollectedTokens();
                this.setupEventListeners();
                this.initializeVault();
                this.initializeCampaigns();
                this.setupSwipeableModule();
                this.addHapticFeedback();
                
                // Ensure dashboard page class is applied
                document.body.classList.add('crypto-dashboard-page');
                this.setModeAttribute('map');
                
                // Initialize demo map immediately
                setTimeout(() => {
                    this.initializeGoogleMap();
                }, 500);
                
                console.log('✅ Dashboard initialized');
            } catch (error) {
                console.error('❌ Dashboard initialization error:', error);
                if (window.vaultPhoenixSession) {
                    window.vaultPhoenixSession.redirectToLogin('Dashboard initialization error');
                }
            }
        }

        // =================== SESSION METHODS ===================
        ensureSession() {
            console.log('🔍 Ensuring valid session...');
            try {
                if (window.vaultPhoenixSession) {
                    const sessionInfo = window.vaultPhoenixSession.getSessionInfo();
                    if (sessionInfo) {
                        console.log('✅ Session valid for:', sessionInfo.email);
                        this.currentUser = sessionInfo;
                        this.updateUserDisplay();
                        return true;
                    }
                }
                console.error('❌ No valid session found');
                return false;
            } catch (error) {
                console.error('❌ Session check error:', error);
                return false;
            }
        }

        updateUserDisplay() {
            try {
                if (this.currentUser) {
                    const userNameEl = document.querySelector('.menu-user-name');
                    const userEmailEl = document.querySelector('.menu-user-email');
                    
                    if (userNameEl) {
                        // Extract name from email
                        const name = this.currentUser.email.split('@')[0];
                        userNameEl.textContent = name.charAt(0).toUpperCase() + name.slice(1) + ' Hunter';
                    }
                    
                    if (userEmailEl) {
                        userEmailEl.textContent = this.currentUser.email;
                    }
                }
            } catch (error) {
                console.error('❌ User display update error:', error);
            }
        }

        // =================== MAP SYSTEM ===================
        initializeGoogleMap() {
            console.log('🗺️ Initializing Map System...');
            try {
                const mapContainer = document.getElementById('googleMapContainer');
                if (!mapContainer) {
                    console.error('❌ Map container not found');
                    return;
                }

                // Show loading overlay
                this.showMapLoading();

                // Always use demo map for demo experience
                console.log('🎮 Creating enhanced demo map...');
                this.createDemoMap(mapContainer);
                
            } catch (error) {
                console.error('❌ Map initialization error:', error);
                this.createDemoMap(document.getElementById('googleMapContainer'));
            }
        }

        showMapLoading() {
            const loadingOverlay = document.getElementById('mapLoadingOverlay');
            if (loadingOverlay) {
                loadingOverlay.style.display = 'flex';
            }
        }

        hideMapLoading() {
            const loadingOverlay = document.getElementById('mapLoadingOverlay');
            if (loadingOverlay) {
                loadingOverlay.style.display = 'none';
            }
        }

        // Create enhanced demo map that looks like a real map
        createDemoMap(mapContainer) {
            console.log('🎮 Creating enhanced demo map...');
            try {
                // Hide loading overlay
                this.hideMapLoading();

                // Create realistic demo map HTML
                mapContainer.innerHTML = `
                    <div class="demo-map-container" id="demoMapContainer" style="
                        position: absolute;
                        top: 0;
                        left: 0;
                        width: 100%;
                        height: 100%;
                        background: linear-gradient(135deg, #f2e8d3 0%, #e8dcc7 25%, #ddd1bb 50%, #d1c5af 75%, #c5b9a3 100%);
                        overflow: hidden;
                        z-index: 1;
                        cursor: grab;
                    ">
                        <!-- Road Network -->
                        <div class="demo-roads" style="
                            position: absolute;
                            top: 0;
                            left: 0;
                            width: 100%;
                            height: 100%;
                            z-index: 2;
                        ">
                            <!-- Major Highways -->
                            <div style="position: absolute; top: 75%; left: 0; width: 100%; height: 1px; background: #A0522D; opacity: 0.6;"></div>
                            <div style="position: absolute; left: 20%; top: 0; width: 1px; height: 100%; background: #A0522D; opacity: 0.6;"></div>
                            <div style="position: absolute; left: 55%; top: 0; width: 1px; height: 100%; background: #A0522D; opacity: 0.6;"></div>
                            <div style="position: absolute; left: 85%; top: 0; width: 1px; height: 100%; background: #A0522D; opacity: 0.6;"></div>
                        </div>
                        
                        <!-- Landmarks -->
                        <div class="demo-landmarks" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; z-index: 3;">
                            <!-- Downtown Phoenix -->
                            <div style="position: absolute; left: 45%; top: 35%; width: 8px; height: 8px; background: #4A4A4A; border-radius: 2px;" title="Downtown Phoenix"></div>
                            <div style="position: absolute; left: 44%; top: 33%; font-size: 10px; color: #333; font-weight: bold;">Downtown</div>
                            
                            <!-- Sky Harbor Airport -->
                            <div style="position: absolute; left: 35%; top: 80%; width: 12px; height: 6px; background: #666; border-radius: 2px;" title="Sky Harbor Airport"></div>
                            <div style="position: absolute; left: 32%; top: 77%; font-size: 9px; color: #333; font-weight: bold;">✈️ Sky Harbor</div>
                            
                            <!-- Scottsdale -->
                            <div style="position: absolute; left: 70%; top: 25%; width: 6px; height: 6px; background: #8B4513; border-radius: 3px;" title="Scottsdale"></div>
                            <div style="position: absolute; left: 67%; top: 22%; font-size: 9px; color: #333; font-weight: bold;">Scottsdale</div>
                            
                            <!-- Camelback Mountain -->
                            <div style="position: absolute; left: 55%; top: 15%; width: 10px; height: 6px; background: #8B6914; border-radius: 50%;" title="Camelback Mtn"></div>
                            <div style="position: absolute; left: 52%; top: 12%; font-size: 8px; color: #333; font-weight: bold;">🏔️ Camelback</div>
                        </div>
                        
                        <!-- Phoenix Label -->
                        <div class="demo-phoenix-label" style="
                            position: absolute;
                            top: 10px;
                            left: 10px;
                            color: rgba(139, 69, 19, 0.9);
                            font-size: 14px;
                            font-weight: 800;
                            z-index: 5;
                            background: rgba(255, 255, 255, 0.9);
                            padding: 6px 12px;
                            border-radius: 8px;
                            box-shadow: 0 2px 8px rgba(0,0,0,0.2);
                            border: 1px solid rgba(240, 165, 0, 0.3);
                        ">🏜️ Phoenix, Arizona</div>
                        
                        <!-- Zoom Controls -->
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
                                background: rgba(240, 165, 0, 0.95);
                                border: 2px solid rgba(255, 255, 255, 0.9);
                                border-radius: 8px;
                                color: white;
                                font-size: 18px;
                                font-weight: bold;
                                cursor: pointer;
                                display: flex;
                                align-items: center;
                                justify-content: center;
                                box-shadow: 0 4px 12px rgba(240, 165, 0, 0.4);
                                transition: all 0.2s ease;
                            ">+</button>
                            <button class="map-control-btn" id="zoomOutBtn" title="Zoom Out" style="
                                width: 40px;
                                height: 40px;
                                background: rgba(240, 165, 0, 0.95);
                                border: 2px solid rgba(255, 255, 255, 0.9);
                                border-radius: 8px;
                                color: white;
                                font-size: 18px;
                                font-weight: bold;
                                cursor: pointer;
                                display: flex;
                                align-items: center;
                                justify-content: center;
                                box-shadow: 0 4px 12px rgba(240, 165, 0, 0.4);
                                transition: all 0.2s ease;
                            ">-</button>
                        </div>
                        
                        <!-- User Location Marker -->
                        <div class="demo-user-marker" title="Your Location - Phoenix, AZ" style="
                            position: absolute;
                            top: 50%;
                            left: 50%;
                            width: 20px;
                            height: 20px;
                            background: #4285F4;
                            border: 3px solid white;
                            border-radius: 50%;
                            transform: translate(-50%, -50%);
                            z-index: 50;
                            box-shadow: 0 3px 15px rgba(66, 133, 244, 0.8);
                            animation: userLocationPulse 2s ease-in-out infinite;
                        "></div>
                        
                        <!-- Token Markers Container -->
                        <div class="demo-map-markers" id="demoMarkers" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; z-index: 25;"></div>
                    </div>
                `;

                // Ensure container is visible and properly styled
                mapContainer.style.display = 'block';
                mapContainer.style.position = 'absolute';
                mapContainer.style.top = '0';
                mapContainer.style.left = '0';
                mapContainer.style.width = '100%';
                mapContainer.style.height = '100%';
                mapContainer.style.zIndex = '1';
                mapContainer.style.overflow = 'hidden';

                // Set up map interactions
                this.mapContainer = mapContainer.querySelector('.demo-map-container');
                this.setupMapInteractions();

                // Add token markers after a brief delay
                setTimeout(() => {
                    this.addDemoTokenMarkers();
                    this.mapLoadingComplete = true;
                    this.startGameFeatures();
                }, 1000);

                console.log('✅ Enhanced demo map initialized successfully');
                
            } catch (error) {
                console.error('❌ Demo map creation error:', error);
            }
        }

        // Add demo token markers with proper desktop/mobile compatibility
        addDemoTokenMarkers() {
            console.log('💎 Adding demo token markers...');
            try {
                const markersContainer = document.getElementById('demoMarkers');
                if (!markersContainer) {
                    console.error('❌ Demo markers container not found');
                    return;
                }

                markersContainer.innerHTML = '';

                // FIXED positions for consistent display across devices
                const positions = [
                    { x: 52, y: 48 }, // Demo nearby token - center
                    { x: 42, y: 32 }, // Downtown Phoenix - upper left
                    { x: 78, y: 22 }, // Scottsdale Quarter - upper right
                    { x: 58, y: 88 }, // Desert Botanical Garden - lower center
                    { x: 82, y: 28 }, // Old Town Scottsdale - upper right
                    { x: 28, y: 72 }, // Arizona State University - lower left
                    { x: 38, y: 92 }, // Phoenix Sky Harbor - bottom left
                    { x: 68, y: 12 }, // Camelback Mountain - top center
                    { x: 22, y: 58 }, // Roosevelt Row - left center
                    { x: 32, y: 38 }, // Tempe Town Lake - left center
                    { x: 72, y: 78 }, // Chase Field - lower right
                    { x: 62, y: 68 }, // Papago Park - center right
                    { x: 75, y: 18 }  // Biltmore Fashion Park - upper right
                ];

                let markerCount = 0;
                this.emberTokens.forEach((token, index) => {
                    if (!this.isTokenCollected(token.id)) {
                        const position = positions[index] || { 
                            x: 50 + (index * 15) % 35, 
                            y: 50 + (index * 20) % 35 
                        };

                        const marker = document.createElement('div');
                        marker.className = `demo-token-marker ${token.tier}`;
                        marker.style.cssText = `
                            position: absolute;
                            left: ${position.x}%;
                            top: ${position.y}%;
                            width: 44px;
                            height: 44px;
                            cursor: pointer;
                            pointer-events: auto;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            transition: all 0.3s ease;
                            z-index: 25;
                            border-radius: 50%;
                            background: rgba(240, 165, 0, 0.1);
                            border: 3px solid rgba(240, 165, 0, 0.6);
                            box-shadow: 0 0 20px rgba(240, 165, 0, 0.6);
                            animation: markerPulse 3s ease-in-out infinite;
                            transform: translate(-50%, -50%);
                            -webkit-tap-highlight-color: transparent;
                            touch-action: manipulation;
                            opacity: 1;
                        `;
                        marker.title = `${token.location} - ${token.value} $Ember`;
                        marker.dataset.tokenId = token.id;

                        // Token image
                        const tokenImage = document.createElement('img');
                        tokenImage.src = '../images/VPEmberCoin.PNG';
                        tokenImage.alt = 'Ember Coin';
                        tokenImage.style.cssText = `
                            width: 38px;
                            height: 38px;
                            border-radius: 50%;
                            object-fit: cover;
                            filter: brightness(1.2) drop-shadow(0 3px 12px rgba(240, 165, 0, 0.8));
                            pointer-events: none;
                        `;
                        tokenImage.onerror = function() {
                            this.style.display = 'none';
                            marker.textContent = '💎';
                            marker.style.fontSize = '18px';
                            marker.style.color = '#f0a500';
                            marker.style.fontWeight = 'bold';
                        };

                        // Value overlay
                        const valueOverlay = document.createElement('div');
                        valueOverlay.style.cssText = `
                            position: absolute;
                            bottom: -14px;
                            left: 50%;
                            transform: translateX(-50%);
                            background: linear-gradient(135deg, #f0a500, #fb923c);
                            color: white;
                            font-size: 12px;
                            font-weight: 900;
                            padding: 5px 9px;
                            border-radius: 12px;
                            border: 2px solid white;
                            white-space: nowrap;
                            pointer-events: none;
                            box-shadow: 0 3px 12px rgba(240, 165, 0, 0.6);
                            z-index: 1;
                        `;
                        valueOverlay.textContent = `${token.value}`;

                        marker.appendChild(tokenImage);
                        marker.appendChild(valueOverlay);

                        // Click handler for both desktop and mobile
                        const handleTokenClick = (e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            
                            console.log('💎 Token clicked:', token.location);
                            
                            // Visual feedback
                            marker.style.transform = 'translate(-50%, -50%) scale(1.3)';
                            marker.style.zIndex = '100';
                            
                            setTimeout(() => {
                                marker.style.transform = 'translate(-50%, -50%) scale(1)';
                                marker.style.zIndex = '25';
                            }, 200);
                            
                            // Calculate distance and show navigation modal
                            token.distance = this.calculateDistance(
                                this.userLat, this.userLng,
                                token.lat, token.lng
                            );
                            
                            this.showNavigationModal(token);
                            
                            // Haptic feedback
                            if (navigator.vibrate) {
                                navigator.vibrate([30, 10, 30]);
                            }
                        };

                        // Add event listeners
                        marker.addEventListener('click', handleTokenClick);
                        marker.addEventListener('touchend', handleTokenClick);

                        markersContainer.appendChild(marker);
                        markerCount++;
                    }
                });

                console.log(`✅ Added ${markerCount} demo token markers`);
                
                // Add animation styles
                this.addMapAnimationStyles();
                
            } catch (error) {
                console.error('❌ Demo token markers error:', error);
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
                
                @keyframes userLocationPulse {
                    0%, 100% { 
                        transform: translate(-50%, -50%) scale(1);
                        box-shadow: 0 3px 15px rgba(66, 133, 244, 0.8), 0 0 0 0 rgba(66, 133, 244, 0.4);
                    }
                    50% { 
                        transform: translate(-50%, -50%) scale(1.1);
                        box-shadow: 0 3px 15px rgba(66, 133, 244, 0.8), 0 0 0 20px rgba(66, 133, 244, 0);
                    }
                }
                
                .demo-token-marker:hover {
                    transform: translate(-50%, -50%) scale(1.15) !important;
                    z-index: 100 !important;
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
                
                .map-control-btn:hover {
                    background: rgba(240, 165, 0, 1) !important;
                    transform: scale(1.05);
                    box-shadow: 0 6px 16px rgba(240, 165, 0, 0.6) !important;
                }
                
                .map-control-btn:active {
                    transform: scale(0.95);
                }
            `;
            document.head.appendChild(style);
        }

        // Start game features after map loads
        startGameFeatures() {
            console.log('🎮 Starting game features...');
            
            // Update location display with coordinates
            this.updateLocationDisplay();
            
            // Start proximity checking
            this.startProximityChecking();
            
            // Update nearby tokens display
            this.updateNearbyTokens();
            
            // Update token counts
            this.updateTokenCounts();
            
            console.log('✅ Game features started');
        }

        // Update location display
        updateLocationDisplay() {
            try {
                const latEl = document.getElementById('currentLat');
                const lngEl = document.getElementById('currentLng');
                
                if (latEl) latEl.textContent = this.userLat.toFixed(4);
                if (lngEl) lngEl.textContent = this.userLng.toFixed(4);
                
            } catch (error) {
                console.error('❌ Location display update error:', error);
            }
        }

        // Start proximity checking
        startProximityChecking() {
            console.log('📍 Starting proximity checking...');
            
            // Check proximity every 5 seconds
            this.proximityCheckInterval = setInterval(() => {
                this.checkTokenProximity();
            }, 5000);
            
            // Initial check
            this.checkTokenProximity();
        }

        // Check if user is near any tokens
        checkTokenProximity() {
            try {
                let nearestToken = null;
                let nearestDistance = Infinity;
                
                this.emberTokens.forEach(token => {
                    if (!this.isTokenCollected(token.id)) {
                        const distance = this.calculateDistance(
                            this.userLat, this.userLng,
                            token.lat, token.lng  
                        );
                        
                        if (distance < nearestDistance) {
                            nearestDistance = distance;
                            nearestToken = token;
                        }
                    }
                });
                
                // Show proximity notification if within 100m (0.1km)
                const wasNearToken = this.isNearToken;
                this.isNearToken = nearestDistance <= 0.1;
                
                if (this.isNearToken && !wasNearToken) {
                    this.showProximityNotification(nearestToken);
                } else if (!this.isNearToken && wasNearToken) {
                    this.hideProximityNotification();
                }
                
                // Update AR availability in menu
                const nearbyTokensEl = document.getElementById('nearbyTokens');
                if (nearbyTokensEl) {
                    nearbyTokensEl.textContent = this.isNearToken ? 'Available!' : 'Get closer';
                }
                
            } catch (error) {
                console.error('❌ Proximity check error:', error);
            }
        }

        // Show proximity notification
        showProximityNotification(token) {
            console.log('🔔 Showing proximity notification for:', token.location);
            try {
                const notification = document.getElementById('proximityNotification');
                const arButton = document.getElementById('proximityARButton');
                
                if (notification) {
                    notification.classList.add('show');
                    
                    // Update notification content
                    const title = notification.querySelector('.proximity-title');
                    const subtitle = notification.querySelector('.proximity-subtitle');
                    
                    if (title) title.textContent = `${token.value} $Ember Token Detected!`;
                    if (subtitle) subtitle.textContent = `${token.location} - Switch to AR to collect`;
                }
                
                if (arButton) {
                    arButton.onclick = () => {
                        this.hideProximityNotification();
                        this.switchMode('ar');
                    };
                }
                
            } catch (error) {
                console.error('❌ Proximity notification error:', error);
            }
        }

        // Hide proximity notification
        hideProximityNotification() {
            try {
                const notification = document.getElementById('proximityNotification');
                if (notification) {
                    notification.classList.remove('show');
                }
            } catch (error) {
                console.error('❌ Hide proximity notification error:', error);
            }
        }

        // Update nearby tokens display
        updateNearbyTokens() {
            console.log('🔍 Updating nearby tokens display...');
            try {
                const nearbyTokens = this.emberTokens
                    .filter(token => !this.isTokenCollected(token.id))
                    .map(token => ({
                        ...token,
                        distance: this.calculateDistance(this.userLat, this.userLng, token.lat, token.lng)
                    }))
                    .sort((a, b) => a.distance - b.distance)
                    .slice(0, 5); // Show top 5 nearest

                const nearbyCount = document.getElementById('nearbyTokenCount');
                if (nearbyCount) {
                    nearbyCount.textContent = `${nearbyTokens.length} nearby`;
                }

                // Update token locations list
                const tokensList = document.getElementById('tokenLocationsList');
                if (tokensList) {
                    tokensList.innerHTML = nearbyTokens.map(token => `
                        <div class="token-location-item" onclick="vaultPhoenixApp.showNavigationModal(${JSON.stringify(token).replace(/"/g, '&quot;')})">
                            <div class="token-location-icon">
                                <img src="../images/VPEmberCoin.PNG" alt="Ember" style="width: 24px; height: 24px; border-radius: 50%;" onerror="this.textContent='💎'">
                            </div>
                            <div class="token-location-info">
                                <div class="token-location-name">${token.location}</div>
                                <div class="token-location-distance">${token.distance < 1 ? (token.distance * 1000).toFixed(0) + 'm' : token.distance.toFixed(1) + 'km'} away</div>
                            </div>
                            <div class="token-location-value">${token.value} $Ember</div>
                        </div>
                    `).join('');
                }
                
            } catch (error) {
                console.error('❌ Nearby tokens update error:', error);
            }
        }

        // Update token counts
        updateTokenCounts() {
            try {
                const availableCount = this.emberTokens.filter(token => !this.isTokenCollected(token.id)).length;
                
                const elements = [
                    'availableTokenCount',
                    'totalAvailable',
                    'availableTokens'
                ];
                
                elements.forEach(id => {
                    const el = document.getElementById(id);
                    if (el) {
                        el.textContent = id === 'availableTokens' ? `${availableCount} Available` : `${availableCount} tokens`;
                    }
                });
                
            } catch (error) {
                console.error('❌ Token counts update error:', error);
            }
        }

        // Show navigation modal
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
                
                if (tokenName) tokenName.textContent = `${token.value} $Ember - ${token.location}`;
                
                if (token.distance !== undefined) {
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

        // Setup map interactions
        setupMapInteractions() {
            if (!this.mapContainer) return;

            console.log('🖱️ Setting up map interactions...');

            const zoomInBtn = document.getElementById('zoomInBtn');
            const zoomOutBtn = document.getElementById('zoomOutBtn');

            if (zoomInBtn) {
                zoomInBtn.addEventListener('click', () => {
                    console.log('🔍 Zoom in clicked');
                    // Add zoom functionality here if needed
                });
            }

            if (zoomOutBtn) {
                zoomOutBtn.addEventListener('click', () => {
                    console.log('🔍 Zoom out clicked');
                    // Add zoom functionality here if needed
                });
            }

            console.log('✅ Map interactions setup complete');
        }

        // =================== SWIPEABLE MODULE SYSTEM ===================
        setupSwipeableModule() {
            console.log('👆 Setting up swipeable token locations module...');
            try {
                const module = document.getElementById('tokenLocationsModule');
                const handle = document.getElementById('swipeHandle');
                
                if (!module || !handle) {
                    console.error('❌ Swipeable module elements not found');
                    return;
                }

                // Initial state - collapsed
                module.classList.add('collapsed');
                this.moduleExpanded = false;

                // Touch events for mobile
                handle.addEventListener('touchstart', (e) => {
                    this.handleTouchStart(e);
                }, { passive: true });

                handle.addEventListener('touchmove', (e) => {
                    this.handleTouchMove(e);
                }, { passive: true });

                handle.addEventListener('touchend', (e) => {
                    this.handleTouchEnd(e);
                }, { passive: true });

                // Mouse events for desktop
                handle.addEventListener('mousedown', (e) => {
                    this.handleMouseDown(e);
                });

                handle.addEventListener('click', (e) => {
                    // Simple click toggle if no drag occurred
                    if (!this.isDragging) {
                        this.toggleModule();
                    }
                    this.isDragging = false;
                });

                console.log('✅ Swipeable module setup complete');
                
            } catch (error) {
                console.error('❌ Swipeable module setup error:', error);
            }
        }

        handleTouchStart(e) {
            this.isDragging = true;
            this.moduleStartY = e.touches[0].clientY;
            this.moduleCurrentY = this.moduleStartY;
        }

        handleTouchMove(e) {
            if (!this.isDragging) return;
            
            this.moduleCurrentY = e.touches[0].clientY;
            const deltaY = this.moduleStartY - this.moduleCurrentY;
            
            // Update visual feedback
            const module = document.getElementById('tokenLocationsModule');
            const handleBar = document.querySelector('.handle-bar');
            
            if (deltaY > 10) {
                // Swiping up
                if (handleBar) handleBar.style.background = '#f0a500';
            } else if (deltaY < -10) {
                // Swiping down
                if (handleBar) handleBar.style.background = 'rgba(240, 165, 0, 0.6)';
            }
        }

        handleTouchEnd(e) {
            if (!this.isDragging) return;
            
            const deltaY = this.moduleStartY - this.moduleCurrentY;
            const threshold = 50; // Minimum swipe distance
            
            if (Math.abs(deltaY) > threshold) {
                if (deltaY > 0 && !this.moduleExpanded) {
                    // Swiped up - expand
                    this.expandModule();
                } else if (deltaY < 0 && this.moduleExpanded) {
                    // Swiped down - collapse
                    this.collapseModule();
                }
            }
            
            // Reset visual feedback
            const handleBar = document.querySelector('.handle-bar');
            if (handleBar) {
                handleBar.style.background = 'rgba(240, 165, 0, 0.6)';
            }
            
            this.isDragging = false;
        }

        handleMouseDown(e) {
            this.isDragging = true;
            this.moduleStartY = e.clientY;
            
            const handleMouseMove = (e) => {
                if (!this.isDragging) return;
                
                this.moduleCurrentY = e.clientY;
                const deltaY = this.moduleStartY - this.moduleCurrentY;
                
                // Visual feedback
                const handleBar = document.querySelector('.handle-bar');
                if (deltaY > 10) {
                    if (handleBar) handleBar.style.background = '#f0a500';
                } else if (deltaY < -10) {
                    if (handleBar) handleBar.style.background = 'rgba(240, 165, 0, 0.6)';
                }
            };
            
            const handleMouseUp = (e) => {
                if (!this.isDragging) return;
                
                const deltaY = this.moduleStartY - this.moduleCurrentY;
                const threshold = 30;
                
                if (Math.abs(deltaY) > threshold) {
                    if (deltaY > 0 && !this.moduleExpanded) {
                        this.expandModule();
                    } else if (deltaY < 0 && this.moduleExpanded) {
                        this.collapseModule();
                    }
                }
                
                // Clean up
                document.removeEventListener('mousemove', handleMouseMove);
                document.removeEventListener('mouseup', handleMouseUp);
                
                const handleBar = document.querySelector('.handle-bar');
                if (handleBar) {
                    handleBar.style.background = 'rgba(240, 165, 0, 0.6)';
                }
                
                this.isDragging = false;
            };
            
            document.addEventListener('mousemove', handleMouseMove);
            document.addEventListener('mouseup', handleMouseUp);
        }

        toggleModule() {
            if (this.moduleExpanded) {
                this.collapseModule();
            } else {
                this.expandModule();
            }
        }

        expandModule() {
            console.log('📈 Expanding token locations module');
            const module = document.getElementById('tokenLocationsModule');
            if (module) {
                module.classList.remove('collapsed');
                module.classList.add('expanded');
                this.moduleExpanded = true;
                
                // Haptic feedback
                if (navigator.vibrate) {
                    navigator.vibrate(50);
                }
            }
        }

        collapseModule() {
            console.log('📉 Collapsing token locations module');
            const module = document.getElementById('tokenLocationsModule');
            if (module) {
                module.classList.remove('expanded');
                module.classList.add('collapsed');
                this.moduleExpanded = false;
                
                // Haptic feedback
                if (navigator.vibrate) {
                    navigator.vibrate(30);
                }
            }
        }

        // =================== RESET GAME FUNCTION ===================
        resetGame() {
            console.log('🔄 Starting game reset...');
            try {
                // Show confirmation modal
                const resetOverlay = document.getElementById('resetGameOverlay');
                if (resetOverlay) {
                    resetOverlay.classList.add('show');
                }
                
            } catch (error) {
                console.error('❌ Reset game modal error:', error);
            }
        }

        confirmResetGame() {
            console.log('✅ Confirming game reset...');
            try {
                // Clear all saved data
                localStorage.removeItem('vaultPhoenixTokens');
                localStorage.removeItem('vaultPhoenixProgress');
                localStorage.removeItem('vaultPhoenixStats');
                localStorage.removeItem('vaultPhoenixUser');
                
                // Reset instance variables
                this.collectedTokens = [];
                this.totalTokenValue = 0;
                this.locationsVisited = 0;
                this.lastActivityTime = null;
                
                // Update UI
                this.updateVaultStats();
                this.updateTokenCounts();
                this.updateNearbyTokens();
                
                // Regenerate token markers
                if (this.mapLoadingComplete) {
                    this.addDemoTokenMarkers();
                }
                
                // Hide modal
                this.hideResetGameModal();
                
                // Show success message
                this.showResetSuccessMessage();
                
                console.log('🎉 Game reset completed successfully!');
                
            } catch (error) {
                console.error('❌ Game reset error:', error);
                alert('Error resetting game. Please refresh the page.');
            }
        }

        hideResetGameModal() {
            const resetOverlay = document.getElementById('resetGameOverlay');
            if (resetOverlay) {
                resetOverlay.classList.remove('show');
            }
        }

        showResetSuccessMessage() {
            // Create temporary success notification
            const notification = document.createElement('div');
            notification.style.cssText = `
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                background: linear-gradient(135deg, rgba(76, 175, 80, 0.95), rgba(67, 160, 71, 0.95));
                color: white;
                padding: 20px 30px;
                border-radius: 16px;
                font-size: 16px;
                font-weight: 700;
                z-index: 400;
                box-shadow: 0 12px 32px rgba(76, 175, 80, 0.5);
                backdrop-filter: blur(20px);
                border: 2px solid rgba(255, 255, 255, 0.3);
                text-align: center;
                animation: successFadeIn 0.5s ease-out;
            `;
            notification.innerHTML = `
                <div style="font-size: 20px; margin-bottom: 8px;">🎉</div>
                <div>Game Reset Complete!</div>
                <div style="font-size: 14px; opacity: 0.9; margin-top: 4px;">All tokens are available again</div>
            `;
            
            document.body.appendChild(notification);
            
            // Add CSS animation
            const style = document.createElement('style');
            style.textContent = `
                @keyframes successFadeIn {
                    0% { opacity: 0; transform: translate(-50%, -50%) scale(0.8); }
                    100% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
                }
            `;
            document.head.appendChild(style);
            
            // Remove after 3 seconds
            setTimeout(() => {
                notification.style.animation = 'successFadeIn 0.5s ease-out reverse';
                setTimeout(() => {
                    document.body.removeChild(notification);
                    document.head.removeChild(style);
                }, 500);
            }, 3000);
        }

        // =================== DASHBOARD SYSTEM ===================
        setModeAttribute(mode) {
            try {
                document.body.setAttribute('data-mode', mode);
                console.log('🔧 Set mode attribute to:', mode);
            } catch (error) {
                console.error('❌ Mode attribute error:', error);
            }
        }

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
                
                const mapContainer = document.getElementById('googleMapContainer');
                if (mapContainer) {
                    mapContainer.style.display = 'block';
                    
                    if (!this.googleMapsLoaded && !this.mapLoadingComplete) {
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
                
                // TODO: Initialize AR camera here
                
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
            const R = 6371; // Earth's radius in km
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

        // =================== DATA METHODS ===================
        loadUserInfo() {
            console.log('👤 Loading user info...');
            // Get user info from session
            if (window.vaultPhoenixSession) {
                this.currentUser = window.vaultPhoenixSession.getSessionInfo();
            }
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
                    { id: 'navDriving', event: 'click', handler: () => this.openMapsNavigation('driving') },
                    { id: 'resetGameBtn', event: 'click', handler: () => this.resetGame() },
                    { id: 'confirmResetGame', event: 'click', handler: () => this.confirmResetGame() },
                    { id: 'cancelResetGame', event: 'click', handler: () => this.hideResetGameModal() },
                    { id: 'sideMenuLogout', event: 'click', handler: () => this.logout() }
                ];
                
                handlers.forEach(({ id, event, handler }) => {
                    const element = document.getElementById(id);
                    if (element) {
                        element.addEventListener(event, handler);
                        console.log(`✅ Added ${event} listener for ${id}`);
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

        logout() {
            console.log('🚪 Logout initiated from dashboard');
            if (window.vaultPhoenixSession) {
                window.vaultPhoenixSession.logout();
            } else {
                // Fallback logout
                sessionStorage.removeItem('vaultPhoenixSession');
                window.location.href = 'index.html';
            }
        }

        initializeVault() {
            console.log('💎 Initializing vault...');
        }

        initializeCampaigns() {
            console.log('🏆 Initializing campaigns...');
        }

        addHapticFeedback() {
            console.log('📳 Adding haptic feedback...');
        }
    }

    // Initialize the dashboard when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            console.log('📄 DOM loaded, initializing Vault Phoenix Dashboard...');
            new VaultPhoenixDashboard();
        });
    } else {
        console.log('📄 DOM already loaded, initializing Vault Phoenix Dashboard...');
        new VaultPhoenixDashboard();
    }
    
} else {
    console.log('🚫 Vault Phoenix Dashboard blocked - not a crypto game page');
}30%; left: 0; width: 100%; height: 3px; background: #8B4513; opacity: 0.8;"></div>
                            <div style="position: absolute; top: 60%; left: 0; width: 100%; height: 3px; background: #8B4513; opacity: 0.8;"></div>
                            <div style="position: absolute; left: 40%; top: 0; width: 3px; height: 100%; background: #8B4513; opacity: 0.8;"></div>
                            <div style="position: absolute; left: 70%; top: 0; width: 3px; height: 100%; background: #8B4513; opacity: 0.8;"></div>
                            
                            <!-- Minor Roads -->
                            <div style="position: absolute; top: 15%; left: 0; width: 100%; height: 1px; background: #A0522D; opacity: 0.6;"></div>
                            <div style="position: absolute; top: 45%; left: 0; width: 100%; height: 1px; background: #A0522D; opacity: 0.6;"></div>
                            <div style="position: absolute; top:
