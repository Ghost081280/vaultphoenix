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
            
            // CRITICAL: Interaction debugging
            this.debugMode = true;

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
                        pointer-events: auto;
                    ">
                        <!-- Road Network -->
                        <div class="demo-roads" style="
                            position: absolute;
                            top: 0;
                            left: 0;
                            width: 100%;
                            height: 100%;
                            z-index: 2;
                            pointer-events: none;
                        ">
                            <!-- Major Highways -->
                            <div style="position: absolute; top: 30%; left: 0; width: 100%; height: 3px; background: #8B4513; opacity: 0.8;"></div>
                            <div style="position: absolute; top: 60%; left: 0; width: 100%; height: 3px; background: #8B4513; opacity: 0.8;"></div>
                            <div style="position: absolute; left: 40%; top: 0; width: 3px; height: 100%; background: #8B4513; opacity: 0.8;"></div>
                            <div style="position: absolute; left: 70%; top: 0; width: 3px; height: 100%; background: #8B4513; opacity: 0.8;"></div>
                            
                            <!-- Minor Roads -->
                            <div style="position: absolute; top: 15%; left: 0; width: 100%; height: 1px; background: #A0522D; opacity: 0.6;"></div>
                            <div style="position: absolute; top: 45%; left: 0; width: 100%; height: 1px; background: #A0522D; opacity: 0.6;"></div>
                            <div style="position: absolute; top: 75%; left: 0; width: 100%; height: 1px; background: #A0522D; opacity: 0.6;"></div>
                            <div style="position: absolute; left: 20%; top: 0; width: 1px; height: 100%; background: #A0522D; opacity: 0.6;"></div>
                            <div style="position: absolute; left: 55%; top: 0; width: 1px; height: 100%; background: #A0522D; opacity: 0.6;"></div>
                            <div style="position: absolute; left: 85%; top: 0; width: 1px; height: 100%; background: #A0522D; opacity: 0.6;"></div>
                        </div>
                        
                        <!-- Landmarks -->
                        <div class="demo-landmarks" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; z-index: 3; pointer-events: none;">
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
                            pointer-events: none;
                        ">🏜️ Phoenix, Arizona</div>
                        
                        <!-- Zoom Controls -->
                        <div class="demo-map-controls" style="
                            position: absolute;
                            bottom: 20px;
                            right: 20px;
                            z-index: 110;
                            display: flex;
                            flex-direction: column;
                            gap: 8px;
                        ">
                            <button class="map-control-btn" id="zoomInBtn" title="Zoom In" style="
                                width: 44px;
                                height: 44px;
                                background: rgba(240, 165, 0, 0.95);
                                border: 2px solid rgba(255, 255, 255, 0.9);
                                border-radius: 8px;
                                color: white;
                                font-size: 20px;
                                font-weight: bold;
                                cursor: pointer;
                                display: flex;
                                align-items: center;
                                justify-content: center;
                                box-shadow: 0 4px 12px rgba(240, 165, 0, 0.4);
                                transition: all 0.2s ease;
                                pointer-events: auto;
                                touch-action: manipulation;
                                -webkit-tap-highlight-color: transparent;
                            ">+</button>
                            <button class="map-control-btn" id="zoomOutBtn" title="Zoom Out" style="
                                width: 44px;
                                height: 44px;
                                background: rgba(240, 165, 0, 0.95);
                                border: 2px solid rgba(255, 255, 255, 0.9);
                                border-radius: 8px;
                                color: white;
                                font-size: 20px;
                                font-weight: bold;
                                cursor: pointer;
                                display: flex;
                                align-items: center;
                                justify-content: center;
                                box-shadow: 0 4px 12px rgba(240, 165, 0, 0.4);
                                transition: all 0.2s ease;
                                pointer-events: auto;
                                touch-action: manipulation;
                                -webkit-tap-highlight-color: transparent;
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
                            z-index: 90;
                            box-shadow: 0 3px 15px rgba(66, 133, 244, 0.8);
                            animation: userLocationPulse 2s ease-in-out infinite;
                            pointer-events: none;
                        "></div>
                        
                        <!-- Token Markers Container -->
                        <div class="demo-map-markers" id="demoMarkers" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; z-index: 100; pointer-events: none;"></div>
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
                mapContainer.style.pointerEvents = 'auto';

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

        // Add demo token markers with FIXED interactions
        addDemoTokenMarkers() {
            console.log('💎 Adding demo token markers...');
            try {
                const markersContainer = document.getElementById('demoMarkers');
                if (!markersContainer) {
                    console.error('❌ Demo markers container not found');
                    return;
                }

                markersContainer.innerHTML = '';
                markersContainer.style.pointerEvents = 'none'; // Container doesn't block, but children will have auto

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
                            width: 54px;
                            height: 54px;
                            cursor: pointer;
                            pointer-events: auto !important;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            transition: all 0.3s ease;
                            z-index: 120;
                            border-radius: 50%;
                            background: rgba(240, 165, 0, 0.1);
                            border: 3px solid rgba(240, 165, 0, 0.6);
                            box-shadow: 0 0 20px rgba(240, 165, 0, 0.6);
                            animation: markerPulse 3s ease-in-out infinite;
                            transform: translate(-50%, -50%);
                            -webkit-tap-highlight-color: transparent;
                            touch-action: manipulation;
                            opacity: 1;
                            user-select: none;
                            -webkit-user-select: none;
                        `;
                        marker.title = `${token.location} - ${token.value} $Ember`;
                        marker.dataset.tokenId = token.id;

                        // Token image
                        const tokenImage = document.createElement('img');
                        tokenImage.src = '../images/VPEmberCoin.PNG';
                        tokenImage.alt = 'Ember Coin';
                        tokenImage.style.cssText = `
                            width: 46px;
                            height: 46px;
                            border-radius: 50%;
                            object-fit: cover;
                            filter: brightness(1.2) drop-shadow(0 3px 12px rgba(240, 165, 0, 0.8));
                            pointer-events: none;
                        `;
                        tokenImage.onerror = function() {
                            this.style.display = 'none';
                            marker.textContent = '💎';
                            marker.style.fontSize = '20px';
                            marker.style.color = '#f0a500';
                            marker.style.fontWeight = 'bold';
                        };

                        // Value overlay
                        const valueOverlay = document.createElement('div');
                        valueOverlay.style.cssText = `
                            position: absolute;
                            bottom: -18px;
                            left: 50%;
                            transform: translateX(-50%);
                            background: linear-gradient(135deg, #f0a500, #fb923c);
                            color: white;
                            font-size: 14px;
                            font-weight: 900;
                            padding: 7px 11px;
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

                        // ENHANCED Click handler with debugging
                        const handleTokenClick = (e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            
                            if (this.debugMode) {
                                console.log('🎯 TOKEN CLICKED!', {
                                    tokenId: token.id,
                                    location: token.location,
                                    value: token.value,
                                    event: e.type,
                                    target: e.target
                                });
                            }
                            
                            // Visual feedback
                            marker.style.transform = 'translate(-50%, -50%) scale(1.3)';
                            marker.style.zIndex = '150';
                            
                            setTimeout(() => {
                                marker.style.transform = 'translate(-50%, -50%) scale(1)';
                                marker.style.zIndex = '120';
                            }, 200);
                            
                            // Calculate distance and show navigation modal
                            token.distance = this.calculateDistance(
                                this.userLat, this.userLng,
                                token.lat, token.lng
                            );
                            
                            // Show navigation modal
                            this.showNavigationModal(token);
                            
                            // Haptic feedback
                            if (navigator.vibrate) {
                                navigator.vibrate([30, 10, 30]);
                            }
                        };

                        // Multiple event listeners for better compatibility
                        marker.addEventListener('click', handleTokenClick, { passive: false });
                        marker.addEventListener('touchend', handleTokenClick, { passive: false });
                        marker.addEventListener('mouseup', handleTokenClick, { passive: false });

                        // Debug hover effects
                        marker.addEventListener('mouseenter', () => {
                            if (this.debugMode) {
                                console.log('🖱️ Marker hover:', token.location);
                            }
                            marker.style.transform = 'translate(-50%, -50%) scale(1.1)';
                        });

                        marker.addEventListener('mouseleave', () => {
                            marker.style.transform = 'translate(-50%, -50%) scale(1)';
                        });

                        markersContainer.appendChild(marker);
                        markerCount++;

                        // Debug logging
                        if (this.debugMode) {
                            console.log(`✅ Added marker ${markerCount}: ${token.location} at ${position.x}%, ${position.y}%`);
                        }
                    }
                });

                console.log(`✅ Added ${markerCount} demo token markers`);
                
                // Add animation styles
                this.addMapAnimationStyles();
                
                // Test click detection
                if (this.debugMode) {
                    setTimeout(() => {
                        const markers = document.querySelectorAll('.demo-token-marker');
                        console.log(`🔍 Debug: Found ${markers.length} clickable markers in DOM`);
                        markers.forEach((marker, i) => {
                            const rect = marker.getBoundingClientRect();
                            console.log(`📍 Marker ${i + 1}: ${marker.dataset.tokenId} - Position: ${rect.left.toFixed(0)}, ${rect.top.toFixed(0)} - Size: ${rect.width}x${rect.height}`);
                        });
                    }, 500);
                }
                
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
                    z-index: 140 !important;
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
                const latEl2 = document.getElementById('lat');
                const lngEl2 = document.getElementById('lng');
                
                if (latEl) latEl.textContent = this.userLat.toFixed(4);
                if (lngEl) lngEl.textContent = this.userLng.toFixed(4);
                if (latEl2) latEl2.textContent = this.userLat.toFixed(4);
                if (lngEl2) lngEl2.textContent = this.userLng.toFixed(4);
                
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
                        <div class="token-location-item" data-token-id="${token.id}" style="cursor: pointer;">
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

                    // Add click handlers to token list items with debugging
                    tokensList.querySelectorAll('.token-location-item').forEach(item => {
                        item.addEventListener('click', () => {
                            const tokenId = parseInt(item.dataset.tokenId);
                            const token = this.emberTokens.find(t => t.id === tokenId);
                            if (token) {
                                if (this.debugMode) {
                                    console.log('📝 Token list item clicked:', token.location);
                                }
                                token.distance = this.calculateDistance(this.userLat, this.userLng, token.lat, token.lng);
                                this.showNavigationModal(token);
                            }
                        });
                    });
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

        // ENHANCED: Show navigation modal with better debugging
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
                    if (this.debugMode) {
                        console.log('✅ Navigation modal displayed successfully');
                    }
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

        // Setup map interactions with debugging
        setupMapInteractions() {
            if (!this.mapContainer) return;

            console.log('🖱️ Setting up map interactions...');

            const zoomInBtn = document.getElementById('zoomInBtn');
            const zoomOutBtn = document.getElementById('zoomOutBtn');

            if (zoomInBtn) {
                zoomInBtn.addEventListener('click', (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    console.log('🔍 Zoom in clicked');
                    
                    // Visual feedback
                    zoomInBtn.style.transform = 'scale(0.95)';
                    setTimeout(() => {
                        zoomInBtn.style.transform = 'scale(1)';
                    }, 150);
                    
                    // Haptic feedback
                    if (navigator.vibrate) {
                        navigator.vibrate(30);
                    }
                });
            }

            if (zoomOutBtn) {
                zoomOutBtn.addEventListener('click', (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    console.log('🔍 Zoom out clicked');
                    
                    // Visual feedback
                    zoomOutBtn.style.transform = 'scale(0.95)';
                    setTimeout(() => {
                        zoomOutBtn.style.transform = 'scale(1)';
                    }, 150);
                    
                    // Haptic feedback
                    if (navigator.vibrate) {
                        navigator.vibrate(30);
                    }
                });
            }

            console.log('✅ Map interactions setup complete');
        }

        // =================== MODE SWITCHING ===================
        switchMode(mode) {
            console.log('🔄 Switching to mode:', mode);
            try {
                this.currentMode = mode;
                this.setModeAttribute(mode);
                
                // Update navigation
                this.updateActiveTab(mode);
                
                // Handle mode-specific logic
                switch (mode) {
                    case 'map':
                        this.hideProximityNotification();
                        this.hideARInstructions();
                        this.stopAR();
                        break;
                    case 'ar':
                        this.startAR();
                        break;
                    case 'vault':
                        this.updateVaultDisplay();
                        break;
                    case 'campaigns':
                        this.updateCampaignsDisplay();
                        break;
                }
                
                console.log('✅ Mode switched to:', mode);
            } catch (error) {
                console.error('❌ Mode switch error:', error);
            }
        }

        setModeAttribute(mode) {
            document.body.setAttribute('data-mode', mode);
        }

        updateActiveTab(mode) {
            document.querySelectorAll('.nav-tab').forEach(tab => {
                tab.classList.remove('active');
            });
            
            const activeTab = document.querySelector(`[data-mode="${mode}"]`);
            if (activeTab) {
                activeTab.classList.add('active');
            }
        }

        // =================== AR SYSTEM ===================
        startAR() {
            console.log('📱 Starting AR mode...');
            try {
                this.stopCamera();
                this.requestCameraAccess();
                this.showARInstructions();
                this.startCompass();
                
                // Hide unnecessary UI elements
                this.hideProximityNotification();
                
                // Check if near tokens for AR
                const nearbyTokens = this.emberTokens.filter(token => {
                    if (this.isTokenCollected(token.id)) return false;
                    const distance = this.calculateDistance(this.userLat, this.userLng, token.lat, token.lng);
                    return distance <= 0.1; // Within 100m
                });
                
                if (nearbyTokens.length > 0) {
                    setTimeout(() => {
                        this.showARToken(nearbyTokens[0]);
                    }, 3000);
                } else {
                    console.log('📍 No tokens nearby for AR');
                }
                
            } catch (error) {
                console.error('❌ AR start error:', error);
            }
        }

        stopAR() {
            console.log('📱 Stopping AR mode...');
            this.stopCamera();
            this.stopCompass();
            this.hideARInstructions();
            this.hideARToken();
        }

        requestCameraAccess() {
            console.log('📷 Requesting camera access...');
            
            if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
                navigator.mediaDevices.getUserMedia({ 
                    video: { 
                        facingMode: 'environment',
                        width: { ideal: 1280 },
                        height: { ideal: 720 }
                    } 
                })
                .then(stream => {
                    this.cameraStream = stream;
                    const video = document.getElementById('video');
                    if (video) {
                        video.srcObject = stream;
                        video.style.display = 'block';
                        video.play();
                    }
                    console.log('✅ Camera access granted');
                })
                .catch(error => {
                    console.error('❌ Camera access denied:', error);
                    this.showCameraError();
                });
            } else {
                console.error('❌ Camera not supported');
                this.showCameraError();
            }
        }

        stopCamera() {
            if (this.cameraStream) {
                this.cameraStream.getTracks().forEach(track => track.stop());
                this.cameraStream = null;
            }
            
            const video = document.getElementById('video');
            if (video) {
                video.style.display = 'none';
                video.srcObject = null;
            }
        }

        showCameraError() {
            const arInstructions = document.getElementById('arInstructions');
            if (arInstructions) {
                const title = arInstructions.querySelector('.ar-instructions-title');
                const text = arInstructions.querySelector('.ar-instructions-text');
                
                if (title) title.textContent = 'Camera Access Required';
                if (text) text.textContent = 'Please allow camera access to use AR mode, or use Map mode to navigate to tokens.';
                
                arInstructions.classList.add('show');
            }
        }

        showARInstructions() {
            const arInstructions = document.getElementById('arInstructions');
            if (arInstructions) {
                arInstructions.classList.add('show');
                
                setTimeout(() => {
                    arInstructions.classList.remove('show');
                }, 5000);
            }
        }

        hideARInstructions() {
            const arInstructions = document.getElementById('arInstructions');
            if (arInstructions) {
                arInstructions.classList.remove('show');
            }
        }

        showARToken(token) {
            console.log('💎 Showing AR token:', token.location);
            try {
                const arToken = document.getElementById('arEmberCoin');
                if (arToken) {
                    arToken.style.display = 'block';
                    arToken.classList.add('tappable');
                    
                    arToken.onclick = () => {
                        this.collectToken(token);
                        this.hideARToken();
                    };
                    
                    console.log('✅ AR token displayed');
                }
            } catch (error) {
                console.error('❌ AR token display error:', error);
            }
        }

        hideARToken() {
            const arToken = document.getElementById('arEmberCoin');
            if (arToken) {
                arToken.style.display = 'none';
                arToken.classList.remove('tappable');
                arToken.onclick = null;
            }
        }

        startCompass() {
            if (this.isCompassActive) return;
            
            console.log('🧭 Starting compass...');
            this.isCompassActive = true;
            
            // Request device orientation permission on iOS
            if (typeof DeviceOrientationEvent !== 'undefined' && typeof DeviceOrientationEvent.requestPermission === 'function') {
                DeviceOrientationEvent.requestPermission()
                    .then(response => {
                        if (response === 'granted') {
                            this.addOrientationListener();
                        } else {
                            console.log('📱 Device orientation permission denied');
                        }
                    })
                    .catch(error => {
                        console.error('❌ Orientation permission error:', error);
                    });
            } else {
                this.addOrientationListener();
            }
        }

        addOrientationListener() {
            this.orientationHandler = (event) => {
                if (event.alpha !== null) {
                    this.heading = event.alpha;
                    this.updateCompass();
                    
                    if (!this.hasReceivedOrientationData) {
                        this.hasReceivedOrientationData = true;
                        console.log('✅ Receiving orientation data');
                    }
                }
            };
            
            window.addEventListener('deviceorientation', this.orientationHandler);
        }

        stopCompass() {
            this.isCompassActive = false;
            
            if (this.orientationHandler) {
                window.removeEventListener('deviceorientation', this.orientationHandler);
                this.orientationHandler = null;
            }
            
            if (this.compassInterval) {
                clearInterval(this.compassInterval);
                this.compassInterval = null;
            }
        }

        updateCompass() {
            const needle = document.querySelector('.compass-needle');
            if (needle) {
                needle.style.transform = `translate(-50%, -100%) rotate(${this.heading}deg)`;
            }
            
            const headingEl = document.getElementById('heading');
            if (headingEl) {
                headingEl.textContent = Math.round(this.heading) + '°';
            }
        }

        // =================== TOKEN COLLECTION ===================
        collectToken(token) {
            console.log('💰 Collecting token:', token);
            try {
                // Add to collected tokens
                this.collectedTokens.push({
                    ...token,
                    collectedAt: new Date().toISOString(),
                    collectedLocation: { lat: this.userLat, lng: this.userLng }
                });
                
                // Update total value
                this.totalTokenValue += token.value;
                
                // Save to localStorage
                this.saveCollectedTokens();
                
                // Update displays
                this.updateTokenCounts();
                this.updateVaultDisplay();
                this.updateNearbyTokens();
                
                // Remove marker from map
                this.removeTokenMarker(token.id);
                
                // Show discovery modal
                this.showTokenDiscovery(token);
                
                // Haptic feedback
                if (navigator.vibrate) {
                    navigator.vibrate([100, 50, 100, 50, 200]);
                }
                
                console.log('✅ Token collected successfully');
                
            } catch (error) {
                console.error('❌ Token collection error:', error);
            }
        }

        removeTokenMarker(tokenId) {
            const marker = document.querySelector(`[data-token-id="${tokenId}"]`);
            if (marker) {
                marker.remove();
            }
        }

        showTokenDiscovery(token) {
            console.log('🎉 Showing token discovery for:', token.location);
            try {
                this.currentDiscoveredToken = token;
                
                const modal = document.getElementById('tokenDiscovery');
                const amount = document.getElementById('discoveredAmount');
                const location = document.getElementById('discoveredLocation');
                const sponsorTitle = document.getElementById('sponsorTitle');
                const sponsorText = document.getElementById('sponsorText');
                
                if (amount) amount.textContent = `${token.value} $Ember`;
                if (location) location.textContent = token.location;
                if (sponsorTitle) sponsorTitle.textContent = token.sponsor;
                if (sponsorText) sponsorText.textContent = token.message;
                
                if (modal) {
                    modal.classList.add('show');
                }
                
            } catch (error) {
                console.error('❌ Token discovery error:', error);
            }
        }

        hideTokenDiscovery() {
            const modal = document.getElementById('tokenDiscovery');
            if (modal) {
                modal.classList.remove('show');
            }
            this.currentDiscoveredToken = null;
        }

        showSponsorDetails() {
            console.log('ℹ️ Showing sponsor details');
            try {
                const frontView = document.querySelector('.sponsor-info-front');
                const backView = document.querySelector('.sponsor-info-back');
                
                if (frontView && backView) {
                    frontView.style.display = 'none';
                    backView.style.display = 'block';
                    this.isShowingSponsorDetails = true;
                }
            } catch (error) {
                console.error('❌ Sponsor details error:', error);
            }
        }

        hideSponsorDetails() {
            const frontView = document.querySelector('.sponsor-info-front');
            const backView = document.querySelector('.sponsor-info-back');
            
            if (frontView && backView) {
                frontView.style.display = 'block';
                backView.style.display = 'none';
                this.isShowingSponsorDetails = false;
            }
        }

        // =================== DATA PERSISTENCE ===================
        saveCollectedTokens() {
            try {
                localStorage.setItem('vaultPhoenix_collectedTokens', JSON.stringify(this.collectedTokens));
                localStorage.setItem('vaultPhoenix_totalValue', this.totalTokenValue.toString());
            } catch (error) {
                console.error('❌ Save collected tokens error:', error);
            }
        }

        loadCollectedTokens() {
            try {
                const saved = localStorage.getItem('vaultPhoenix_collectedTokens');
                if (saved) {
                    this.collectedTokens = JSON.parse(saved);
                }
                
                const savedValue = localStorage.getItem('vaultPhoenix_totalValue');
                if (savedValue) {
                    this.totalTokenValue = parseInt(savedValue) || 0;
                }
                
                console.log(`💰 Loaded ${this.collectedTokens.length} collected tokens, total value: ${this.totalTokenValue}`);
            } catch (error) {
                console.error('❌ Load collected tokens error:', error);
                this.collectedTokens = [];
                this.totalTokenValue = 0;
            }
        }

        loadUserInfo() {
            try {
                if (this.currentUser) {
                    console.log('👤 User info loaded:', this.currentUser.email);
                }
            } catch (error) {
                console.error('❌ Load user info error:', error);
            }
        }

        isTokenCollected(tokenId) {
            return this.collectedTokens.some(token => token.id === tokenId);
        }

        // =================== VAULT SYSTEM ===================
        initializeVault() {
            console.log('🏦 Initializing vault...');
            this.updateVaultDisplay();
        }

        updateVaultDisplay() {
            try {
                // Update vault balance
                const balanceEl = document.getElementById('vaultBalance');
                const usdValueEl = document.getElementById('vaultUSDValue');
                const badgeCountEl = document.querySelector('.badge-count');
                
                if (balanceEl) {
                    balanceEl.textContent = `${this.totalTokenValue.toLocaleString()} $Ember`;
                }
                
                if (usdValueEl) {
                    const usdValue = (this.totalTokenValue * 0.05).toFixed(2);
                    usdValueEl.textContent = `~${usdValue} USD`;
                }
                
                if (badgeCountEl) {
                    badgeCountEl.textContent = this.totalTokenValue.toLocaleString();
                }
                
                // Update stats
                const totalCollectedEl = document.getElementById('totalCollected');
                const totalLocationsEl = document.getElementById('totalLocations');
                const lastActivityEl = document.getElementById('lastActivity');
                
                if (totalCollectedEl) {
                    totalCollectedEl.textContent = this.collectedTokens.length;
                }
                
                if (totalLocationsEl) {
                    const uniqueLocations = new Set(this.collectedTokens.map(t => t.location)).size;
                    totalLocationsEl.textContent = uniqueLocations;
                }
                
                if (lastActivityEl && this.collectedTokens.length > 0) {
                    const lastToken = this.collectedTokens[this.collectedTokens.length - 1];
                    const lastDate = new Date(lastToken.collectedAt);
                    lastActivityEl.textContent = lastDate.toLocaleDateString();
                }
                
                // Update history
                this.updateTokenHistory();
                
            } catch (error) {
                console.error('❌ Vault display update error:', error);
            }
        }

        updateTokenHistory() {
            try {
                const historyContainer = document.getElementById('tokenHistory');
                if (!historyContainer) return;
                
                if (this.collectedTokens.length === 0) {
                    historyContainer.innerHTML = `
                        <div style="text-align: center; color: rgba(255, 255, 255, 0.6); padding: 40px 20px;">
                            <div style="font-size: 48px; margin-bottom: 16px;">🗺️</div>
                            <div style="font-size: 16px; font-weight: 600; margin-bottom: 8px;">No Tokens Collected Yet</div>
                            <div style="font-size: 14px;">Start exploring to find $Ember tokens!</div>
                        </div>
                    `;
                    return;
                }
                
                const recentTokens = [...this.collectedTokens]
                    .sort((a, b) => new Date(b.collectedAt) - new Date(a.collectedAt))
                    .slice(0, 10);
                
                historyContainer.innerHTML = recentTokens.map(token => {
                    const date = new Date(token.collectedAt);
                    const timeAgo = this.getTimeAgo(date);
                    
                    return `
                        <div class="history-item">
                            <div class="history-icon">
                                <img src="../images/VPEmberCoin.PNG" alt="Ember" class="history-coin-icon" onerror="this.textContent='💎'">
                            </div>
                            <div class="history-details">
                                <div class="history-title">${token.location}</div>
                                <div class="history-subtitle">${timeAgo} • ${token.sponsor}</div>
                            </div>
                            <div class="history-value">+${token.value}</div>
                        </div>
                    `;
                }).join('');
                
            } catch (error) {
                console.error('❌ Token history update error:', error);
            }
        }

        getTimeAgo(date) {
            const now = new Date();
            const diffMs = now - date;
            const diffMins = Math.floor(diffMs / 60000);
            const diffHours = Math.floor(diffMs / 3600000);
            const diffDays = Math.floor(diffMs / 86400000);
            
            if (diffMins < 1) return 'Just now';
            if (diffMins < 60) return `${diffMins}m ago`;
            if (diffHours < 24) return `${diffHours}h ago`;
            if (diffDays < 30) return `${diffDays}d ago`;
            return date.toLocaleDateString();
        }

        // =================== CAMPAIGNS SYSTEM ===================
        initializeCampaigns() {
            console.log('🏆 Initializing campaigns...');
            this.updateCampaignsDisplay();
        }

        updateCampaignsDisplay() {
            try {
                const adventuresContainer = document.getElementById('activeAdventures');
                if (!adventuresContainer) return;
                
                const adventures = [
                    {
                        id: 'downtown_explorer',
                        name: 'Downtown Explorer',
                        description: 'Collect 3 tokens in downtown Phoenix',
                        icon: '🏙️',
                        progress: this.getDowntownProgress(),
                        total: 3,
                        rewards: ['250 Bonus $Ember', 'Explorer Badge'],
                        status: 'available',
                        locations: ['Downtown Phoenix', 'Roosevelt Row', 'Chase Field']
                    },
                    {
                        id: 'desert_wanderer',
                        name: 'Desert Wanderer',
                        description: 'Find tokens in 5 different locations',
                        icon: '🌵',
                        progress: new Set(this.collectedTokens.map(t => t.location)).size,
                        total: 5,
                        rewards: ['500 Bonus $Ember', 'Wanderer Badge'],
                        status: 'available',
                        locations: ['Any 5 locations']
                    },
                    {
                        id: 'high_roller',
                        name: 'High Roller',
                        description: 'Collect tokens worth 1000+ $Ember total',
                        icon: '💎',
                        progress: this.totalTokenValue,
                        total: 1000,
                        rewards: ['1000 Bonus $Ember', 'High Roller Badge'],
                        status: 'available',
                        locations: ['Collect high-value tokens']
                    }
                ];
                
                adventuresContainer.innerHTML = adventures.map(adventure => {
                    const progressPercent = Math.min((adventure.progress / adventure.total) * 100, 100);
                    const isCompleted = adventure.progress >= adventure.total;
                    
                    return `
                        <div class="adventure-card ${isCompleted ? 'completed' : ''}" data-adventure-id="${adventure.id}">
                            <div class="adventure-header">
                                <div class="adventure-icon">${adventure.icon}</div>
                                <div class="adventure-info">
                                    <div class="adventure-name">${adventure.name}</div>
                                    <div class="adventure-description">${adventure.description}</div>
                                </div>
                                <div class="adventure-status ${isCompleted ? 'completed' : adventure.status}">
                                    ${isCompleted ? 'Completed' : 'Active'}
                                </div>
                            </div>
                            <div class="adventure-progress">
                                <div class="progress-bar">
                                    <div class="progress-fill" style="width: ${progressPercent}%"></div>
                                </div>
                                <div class="progress-text">${adventure.progress}/${adventure.total} completed</div>
                            </div>
                            <div class="adventure-rewards">
                                ${adventure.rewards.map(reward => `<span class="reward-badge">${reward}</span>`).join('')}
                            </div>
                            <div class="adventure-details">
                                <div class="adventure-locations">📍 ${adventure.locations.join(', ')}</div>
                            </div>
                            ${isCompleted ? 
                                '<button class="adventure-claim-btn">Claim Rewards</button>' :
                                '<button class="adventure-track-btn">Track Progress</button>'
                            }
                        </div>
                    `;
                }).join('');
                
                // Add click handlers
                adventuresContainer.querySelectorAll('.adventure-card').forEach(card => {
                    const claimBtn = card.querySelector('.adventure-claim-btn');
                    const trackBtn = card.querySelector('.adventure-track-btn');
                    
                    if (claimBtn) {
                        claimBtn.addEventListener('click', (e) => {
                            e.stopPropagation();
                            this.claimAdventureRewards(card.dataset.adventureId);
                        });
                    }
                    
                    if (trackBtn) {
                        trackBtn.addEventListener('click', (e) => {
                            e.stopPropagation();
                            this.trackAdventure(card.dataset.adventureId);
                        });
                    }
                });
                
            } catch (error) {
                console.error('❌ Campaigns display update error:', error);
            }
        }

        getDowntownProgress() {
            const downtownLocations = ['Downtown Phoenix', 'Roosevelt Row', 'Chase Field'];
            return this.collectedTokens.filter(token => 
                downtownLocations.includes(token.location)
            ).length;
        }

        claimAdventureRewards(adventureId) {
            console.log('🏆 Claiming adventure rewards:', adventureId);
            // Implementation for claiming adventure rewards
        }

        trackAdventure(adventureId) {
            console.log('📊 Tracking adventure:', adventureId);
            // Switch to map mode and highlight relevant tokens
            this.switchMode('map');
        }

        // =================== SWIPEABLE MODULE ===================
        setupSwipeableModule() {
            console.log('👆 Setting up swipeable module...');
            try {
                const module = document.getElementById('tokenLocationsModule');
                const handle = document.getElementById('swipeHandle');
                
                if (!module || !handle) return;
                
                // Touch events
                handle.addEventListener('touchstart', this.handleTouchStart.bind(this), { passive: false });
                handle.addEventListener('touchmove', this.handleTouchMove.bind(this), { passive: false });
                handle.addEventListener('touchend', this.handleTouchEnd.bind(this), { passive: false });
                
                // Mouse events for desktop
                handle.addEventListener('mousedown', this.handleMouseDown.bind(this));
                document.addEventListener('mousemove', this.handleMouseMove.bind(this));
                document.addEventListener('mouseup', this.handleMouseUp.bind(this));
                
                // Click to toggle
                handle.addEventListener('click', this.toggleModule.bind(this));
                
                console.log('✅ Swipeable module setup complete');
            } catch (error) {
                console.error('❌ Swipeable module setup error:', error);
            }
        }

        handleTouchStart(e) {
            e.preventDefault();
            this.isDragging = true;
            this.moduleStartY = e.touches[0].clientY;
        }

        handleTouchMove(e) {
            if (!this.isDragging) return;
            e.preventDefault();
            
            const currentY = e.touches[0].clientY;
            const deltaY = this.moduleStartY - currentY;
            
            const module = document.getElementById('tokenLocationsModule');
            if (module) {
                if (deltaY > 0 && !this.moduleExpanded) {
                    // Swiping up to expand
                    const progress = Math.min(deltaY / 100, 1);
                    module.style.transform = `translateY(${(100 - 100) * (1 - progress)}%)`;
                } else if (deltaY < 0 && this.moduleExpanded) {
                    // Swiping down to collapse
                    const progress = Math.min(Math.abs(deltaY) / 100, 1);
                    module.style.transform = `translateY(${(100 - 100) * progress}%)`;
                }
            }
        }

        handleTouchEnd(e) {
            if (!this.isDragging) return;
            e.preventDefault();
            
            this.isDragging = false;
            const deltaY = this.moduleStartY - e.changedTouches[0].clientY;
            
            if (Math.abs(deltaY) > 50) {
                if (deltaY > 0) {
                    this.expandModule();
                } else {
                    this.collapseModule();
                }
            } else {
                // Snap back to current state
                if (this.moduleExpanded) {
                    this.expandModule();
                } else {
                    this.collapseModule();
                }
            }
        }

        handleMouseDown(e) {
            this.isDragging = true;
            this.moduleStartY = e.clientY;
        }

        handleMouseMove(e) {
            if (!this.isDragging) return;
            
            const deltaY = this.moduleStartY - e.clientY;
            const module = document.getElementById('tokenLocationsModule');
            
            if (module && Math.abs(deltaY) > 50) {
                if (deltaY > 0 && !this.moduleExpanded) {
                    this.expandModule();
                } else if (deltaY < 0 && this.moduleExpanded) {
                    this.collapseModule();
                }
                this.isDragging = false;
            }
        }

        handleMouseUp() {
            this.isDragging = false;
        }

        toggleModule() {
            if (this.moduleExpanded) {
                this.collapseModule();
            } else {
                this.expandModule();
            }
        }

        expandModule() {
            const module = document.getElementById('tokenLocationsModule');
            if (module) {
                module.classList.add('expanded');
                module.classList.remove('collapsed');
                this.moduleExpanded = true;
                
                // Haptic feedback
                if (navigator.vibrate) {
                    navigator.vibrate(30);
                }
            }
        }

        collapseModule() {
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

        // =================== EVENT LISTENERS ===================
        setupEventListeners() {
            console.log('🎧 Setting up event listeners...');
            try {
                // Navigation tabs
                document.querySelectorAll('.nav-tab').forEach(tab => {
                    tab.addEventListener('click', () => {
                        const mode = tab.dataset.mode;
                        if (mode) {
                            this.switchMode(mode);
                        }
                    });
                });

                // Menu button
                const menuButton = document.getElementById('navMenuButton');
                if (menuButton) {
                    menuButton.addEventListener('click', () => this.toggleMenu());
                }

                // Menu overlay
                const menuOverlay = document.getElementById('menuOverlay');
                if (menuOverlay) {
                    menuOverlay.addEventListener('click', () => this.hideMenu());
                }

                // Logout button
                const logoutButton = document.getElementById('logoutButton');
                if (logoutButton) {
                    logoutButton.addEventListener('click', () => this.showLogoutConfirmation());
                }

                // Reset game button
                const resetGameButton = document.getElementById('resetGameButton');
                if (resetGameButton) {
                    resetGameButton.addEventListener('click', () => this.showResetGameModal());
                }

                // Modal close buttons
                this.setupModalEventListeners();

                // Vault badge click
                const vaultBadge = document.querySelector('.vault-badge');
                if (vaultBadge) {
                    vaultBadge.addEventListener('click', () => this.switchMode('vault'));
                }

                console.log('✅ Event listeners setup complete');
            } catch (error) {
                console.error('❌ Event listeners setup error:', error);
            }
        }

        setupModalEventListeners() {
            // Token Discovery Modal
            const discoveryClose = document.getElementById('discoveryClose');
            const discoveryClaim = document.getElementById('discoveryClaim');
            const discoveryMore = document.getElementById('discoveryMore');
            const sponsorBack = document.getElementById('sponsorBack');
            
            if (discoveryClose) {
                discoveryClose.addEventListener('click', () => this.hideTokenDiscovery());
            }
            
            if (discoveryClaim) {
                discoveryClaim.addEventListener('click', () => this.hideTokenDiscovery());
            }
            
            if (discoveryMore) {
                discoveryMore.addEventListener('click', () => this.showSponsorDetails());
            }
            
            if (sponsorBack) {
                sponsorBack.addEventListener('click', () => this.hideSponsorDetails());
            }

            // Navigation Modal
            const navClose = document.getElementById('navClose');
            const navWalk = document.getElementById('navWalk');
            const navDrive = document.getElementById('navDrive');
            
            if (navClose) {
                navClose.addEventListener('click', () => this.hideNavigationModal());
            }
            
            if (navWalk) {
                navWalk.addEventListener('click', () => this.openMapsNavigation('walking'));
            }
            
            if (navDrive) {
                navDrive.addEventListener('click', () => this.openMapsNavigation('driving'));
            }

            // Reset Game Modal
            const resetCancel = document.getElementById('resetCancel');
            const resetConfirm = document.getElementById('resetConfirm');
            
            if (resetCancel) {
                resetCancel.addEventListener('click', () => this.hideResetGameModal());
            }
            
            if (resetConfirm) {
                resetConfirm.addEventListener('click', () => this.confirmResetGame());
            }

            // Logout Modal
            const logoutCancel = document.getElementById('logoutCancel');
            const logoutConfirm = document.getElementById('logoutConfirm');
            
            if (logoutCancel) {
                logoutCancel.addEventListener('click', () => this.hideLogoutConfirmation());
            }
            
            if (logoutConfirm) {
                logoutConfirm.addEventListener('click', () => this.confirmLogout());
            }

            // QR Modal
            const qrClose = document.getElementById('qrClose');
            if (qrClose) {
                qrClose.addEventListener('click', () => this.hideQRModal());
            }
        }

        // =================== MENU SYSTEM ===================
        toggleMenu() {
            const menu = document.getElementById('sideMenu');
            const overlay = document.getElementById('menuOverlay');
            
            if (menu && overlay) {
                const isOpen = menu.classList.contains('open');
                
                if (isOpen) {
                    this.hideMenu();
                } else {
                    this.showMenu();
                }
            }
        }

        showMenu() {
            const menu = document.getElementById('sideMenu');
            const overlay = document.getElementById('menuOverlay');
            
            if (menu && overlay) {
                menu.classList.add('open');
                overlay.classList.add('active');
                
                // Update menu items
                this.updateMenuItems();
            }
        }

        hideMenu() {
            const menu = document.getElementById('sideMenu');
            const overlay = document.getElementById('menuOverlay');
            
            if (menu && overlay) {
                menu.classList.remove('open');
                overlay.classList.remove('active');
            }
        }

        updateMenuItems() {
            // Update active menu item
            document.querySelectorAll('.menu-item').forEach(item => {
                item.classList.remove('active');
            });
            
            const activeItem = document.querySelector(`[data-menu-mode="${this.currentMode}"]`);
            if (activeItem) {
                activeItem.classList.add('active');
            }
        }

        // =================== MODAL SYSTEMS ===================
        showLogoutConfirmation() {
            const modal = document.getElementById('logoutOverlay');
            if (modal) {
                modal.classList.add('show');
            }
        }

        hideLogoutConfirmation() {
            const modal = document.getElementById('logoutOverlay');
            if (modal) {
                modal.classList.remove('show');
            }
        }

        confirmLogout() {
            console.log('👋 Logging out...');
            this.hideLogoutConfirmation();
            
            if (window.vaultPhoenixSession) {
                window.vaultPhoenixSession.logout();
            }
        }

        showResetGameModal() {
            const modal = document.getElementById('resetGameOverlay');
            if (modal) {
                modal.classList.add('show');
            }
        }

        hideResetGameModal() {
            const modal = document.getElementById('resetGameOverlay');
            if (modal) {
                modal.classList.remove('show');
            }
        }

        confirmResetGame() {
            console.log('🔄 Resetting game...');
            try {
                // Clear all collected tokens
                this.collectedTokens = [];
                this.totalTokenValue = 0;
                
                // Clear localStorage
                localStorage.removeItem('vaultPhoenix_collectedTokens');
                localStorage.removeItem('vaultPhoenix_totalValue');
                
                // Update displays
                this.updateVaultDisplay();
                this.updateTokenCounts();
                this.updateNearbyTokens();
                this.updateCampaignsDisplay();
                
                // Reinitialize map with all tokens
                setTimeout(() => {
                    this.addDemoTokenMarkers();
                }, 500);
                
                this.hideResetGameModal();
                
                // Show success feedback
                if (navigator.vibrate) {
                    navigator.vibrate([100, 50, 100]);
                }
                
                console.log('✅ Game reset successfully');
                
            } catch (error) {
                console.error('❌ Game reset error:', error);
            }
        }

        showQRModal() {
            const modal = document.getElementById('qrModal');
            if (modal) {
                modal.classList.add('show');
            }
        }

        hideQRModal() {
            const modal = document.getElementById('qrModal');
            if (modal) {
                modal.classList.remove('show');
            }
        }

        // =================== UTILITY METHODS ===================
        calculateDistance(lat1, lon1, lat2, lon2) {
            const R = 6371; // Earth's radius in kilometers
            const dLat = this.toRadians(lat2 - lat1);
            const dLon = this.toRadians(lon2 - lon1);
            const a = 
                Math.sin(dLat/2) * Math.sin(dLat/2) +
                Math.cos(this.toRadians(lat1)) * Math.cos(this.toRadians(lat2)) * 
                Math.sin(dLon/2) * Math.sin(dLon/2);
            const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
            return R * c;
        }

        toRadians(degrees) {
            return degrees * (Math.PI/180);
        }

        addHapticFeedback() {
            // Add haptic feedback to buttons
            const buttons = document.querySelectorAll('button, .nav-tab, .menu-item, .token-action-btn');
            
            buttons.forEach(button => {
                button.addEventListener('click', () => {
                    if (navigator.vibrate) {
                        navigator.vibrate(30);
                    }
                });
            });
        }

        // =================== INITIALIZATION COMPLETE ===================
        onInitComplete() {
            console.log('🎉 Vault Phoenix Dashboard fully initialized');
            
            // Mark as initialized
            this.isStarted = true;
            
            // Final setup
            this.setModeAttribute('map');
            this.updateActiveTab('map');
            
            // Show welcome if first time
            if (!this.welcomeShown) {
                this.showWelcomeButton();
            }
        }

        showWelcomeButton() {
            // Implementation for welcome experience
            console.log('👋 Welcome to Vault Phoenix!');
            this.welcomeShown = true;
        }
    }

    // =================== GLOBAL INITIALIZATION ===================
    // Initialize the dashboard application
    console.log('🔥💎 Creating Vault Phoenix Dashboard instance...');
    window.vaultPhoenixDashboard = new VaultPhoenixDashboard();

} else {
    console.log('🚫 Dashboard JavaScript blocked - not a crypto game page');
}

// =================== GLOBAL ERROR HANDLING ===================
window.addEventListener('error', (event) => {
    if (window.isVaultPhoenixDashboard) {
        console.error('🚨 Dashboard Error:', event.error);
    }
});

window.addEventListener('unhandledrejection', (event) => {
    if (window.isVaultPhoenixDashboard) {
        console.error('🚨 Dashboard Promise Rejection:', event.reason);
    }
});

console.log('🔥💎 Vault Phoenix Dashboard JavaScript loaded successfully');
