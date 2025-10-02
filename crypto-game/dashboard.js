// Vault Phoenix AR Crypto Gaming - DASHBOARD SYSTEM (FULLY RESTORED & MOBILE FIXED)
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
            this.collectedTokens = [];
            this.totalTokenValue = 0;
            this.currentMode = 'map';
            this.currentNavigationToken = null;
            this.isNearToken = false;
            this.moduleExpanded = false;
            this.isDragging = false;
            this.moduleStartY = 0;
            this.currentUser = null;
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
                    console.warn('⚠️ No valid session found, using demo mode');
                    // Continue in demo mode
                }

                this.ensureSession();
                this.loadCollectedTokens();
                this.setupEventListeners();
                this.setupSwipeableModule();
                
                // Ensure dashboard page class is applied
                document.body.classList.add('crypto-dashboard-page');
                this.setModeAttribute('map');
                
                // Initialize demo map immediately
                setTimeout(() => {
                    this.initializeMap();
                }, 500);
                
                console.log('✅ Dashboard initialized successfully');
            } catch (error) {
                console.error('❌ Dashboard initialization error:', error);
            }
        }

        // =================== SESSION METHODS ===================
        ensureSession() {
            try {
                if (window.vaultPhoenixSession) {
                    const sessionInfo = window.vaultPhoenixSession.getSessionInfo();
                    if (sessionInfo) {
                        console.log('✅ Session valid for:', sessionInfo.email);
                        this.currentUser = sessionInfo;
                        return true;
                    }
                }
                // Use demo user if no session
                this.currentUser = {
                    email: 'demo@vaultphoenix.com',
                    name: 'Phoenix Hunter'
                };
                return true;
            } catch (error) {
                console.error('❌ Session check error:', error);
                return false;
            }
        }

        // =================== MAP SYSTEM (COMPLETELY RESTORED) ===================
        initializeMap() {
            console.log('🗺️ Initializing Map System...');
            try {
                const mapContainer = document.getElementById('googleMapContainer');
                if (!mapContainer) {
                    console.error('❌ Map container not found');
                    return;
                }

                console.log('🎮 Creating enhanced demo map...');
                this.createDemoMap(mapContainer);
                
            } catch (error) {
                console.error('❌ Map initialization error:', error);
            }
        }

        createDemoMap(mapContainer) {
            console.log('🎮 Creating enhanced demo map with mobile fixes...');
            try {
                // Create realistic demo map HTML with MOBILE TOUCH FIXES
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
                        touch-action: pan-x pan-y pinch-zoom;
                        -webkit-overflow-scrolling: touch;
                        user-select: none;
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
                            touch-action: none;
                        ">
                            <!-- Major Highways -->
                            <div style="position: absolute; top: 30%; left: 0; width: 100%; height: 3px; background: #8B4513; opacity: 0.8;"></div>
                            <div style="position: absolute; top: 60%; left: 0; width: 100%; height: 3px; background: #8B4513; opacity: 0.8;"></div>
                            <div style="position: absolute; left: 40%; top: 0; width: 3px; height: 100%; background: #8B4513; opacity: 0.8;"></div>
                            <div style="position: absolute; left: 70%; top: 0; width: 3px; height: 100%; background: #8B4513; opacity: 0.8;"></div>
                        </div>
                        
                        <!-- Landmarks -->
                        <div class="demo-landmarks" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; z-index: 3; pointer-events: none; touch-action: none;">
                            <!-- Downtown Phoenix -->
                            <div style="position: absolute; left: 45%; top: 35%; width: 8px; height: 8px; background: #4A4A4A; border-radius: 2px;"></div>
                            <div style="position: absolute; left: 44%; top: 33%; font-size: 10px; color: #333; font-weight: bold;">Downtown</div>
                            
                            <!-- Sky Harbor Airport -->
                            <div style="position: absolute; left: 35%; top: 80%; width: 12px; height: 6px; background: #666; border-radius: 2px;"></div>
                            <div style="position: absolute; left: 32%; top: 77%; font-size: 9px; color: #333; font-weight: bold;">✈️ Sky Harbor</div>
                            
                            <!-- Scottsdale -->
                            <div style="position: absolute; left: 70%; top: 25%; width: 6px; height: 6px; background: #8B4513; border-radius: 3px;"></div>
                            <div style="position: absolute; left: 67%; top: 22%; font-size: 9px; color: #333; font-weight: bold;">Scottsdale</div>
                        </div>
                        
                        <!-- Phoenix Label -->
                        <div style="
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
                            touch-action: none;
                            user-select: none;
                        ">🏜️ Phoenix, Arizona</div>
                        
                        <!-- Zoom Controls - MOBILE ENHANCED -->
                        <div style="
                            position: absolute;
                            bottom: 20px;
                            right: 20px;
                            z-index: 110;
                            display: flex;
                            flex-direction: column;
                            gap: 8px;
                        ">
                            <button id="zoomInBtn" style="
                                width: 50px;
                                height: 50px;
                                background: rgba(240, 165, 0, 0.95);
                                border: 2px solid rgba(255, 255, 255, 0.9);
                                border-radius: 8px;
                                color: white;
                                font-size: 24px;
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
                                user-select: none;
                            ">+</button>
                            <button id="zoomOutBtn" style="
                                width: 50px;
                                height: 50px;
                                background: rgba(240, 165, 0, 0.95);
                                border: 2px solid rgba(255, 255, 255, 0.9);
                                border-radius: 8px;
                                color: white;
                                font-size: 24px;
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
                                user-select: none;
                            ">-</button>
                        </div>
                        
                        <!-- User Location Marker -->
                        <div style="
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
                            pointer-events: none;
                            touch-action: none;
                        "></div>
                        
                        <!-- Token Markers Container - MOBILE OPTIMIZED -->
                        <div id="demoMarkers" style="
                            position: absolute; 
                            top: 0; 
                            left: 0; 
                            width: 100%; 
                            height: 100%; 
                            z-index: 100; 
                            pointer-events: none;
                            touch-action: none;
                        "></div>
                    </div>
                `;

                // Ensure container is properly styled for mobile
                mapContainer.style.display = 'block';
                mapContainer.style.position = 'absolute';
                mapContainer.style.top = '0';
                mapContainer.style.left = '0';
                mapContainer.style.width = '100%';
                mapContainer.style.height = '100%';
                mapContainer.style.zIndex = '1';
                mapContainer.style.overflow = 'hidden';
                mapContainer.style.pointerEvents = 'auto';
                mapContainer.style.touchAction = 'pan-x pan-y pinch-zoom';

                // Set up map interactions with mobile fixes
                this.setupMapControls();

                // Add token markers with delay for proper initialization
                setTimeout(() => {
                    this.addDemoTokenMarkers();
                    this.startGameFeatures();
                }, 1000);

                console.log('✅ Enhanced demo map initialized successfully with mobile support');
                
            } catch (error) {
                console.error('❌ Demo map creation error:', error);
            }
        }

        setupMapControls() {
            console.log('🖱️ Setting up map controls with mobile support...');
            
            // Setup zoom controls with both touch and click events
            setTimeout(() => {
                const zoomInBtn = document.getElementById('zoomInBtn');
                const zoomOutBtn = document.getElementById('zoomOutBtn');

                if (zoomInBtn) {
                    // MOBILE FIX: Add multiple event types
                    const zoomInHandler = (e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        console.log('🔍 Zoom in triggered');
                        
                        zoomInBtn.style.transform = 'scale(0.9)';
                        setTimeout(() => {
                            zoomInBtn.style.transform = 'scale(1)';
                        }, 150);
                        
                        // Haptic feedback
                        if (navigator.vibrate) {
                            navigator.vibrate(30);
                        }
                    };

                    // Add all event types for maximum compatibility
                    zoomInBtn.addEventListener('click', zoomInHandler, { passive: false });
                    zoomInBtn.addEventListener('touchstart', zoomInHandler, { passive: false });
                    zoomInBtn.addEventListener('touchend', zoomInHandler, { passive: false });
                    zoomInBtn.addEventListener('pointerdown', zoomInHandler, { passive: false });
                }

                if (zoomOutBtn) {
                    // MOBILE FIX: Add multiple event types
                    const zoomOutHandler = (e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        console.log('🔍 Zoom out triggered');
                        
                        zoomOutBtn.style.transform = 'scale(0.9)';
                        setTimeout(() => {
                            zoomOutBtn.style.transform = 'scale(1)';
                        }, 150);
                        
                        // Haptic feedback
                        if (navigator.vibrate) {
                            navigator.vibrate(30);
                        }
                    };

                    // Add all event types for maximum compatibility
                    zoomOutBtn.addEventListener('click', zoomOutHandler, { passive: false });
                    zoomOutBtn.addEventListener('touchstart', zoomOutHandler, { passive: false });
                    zoomOutBtn.addEventListener('touchend', zoomOutHandler, { passive: false });
                    zoomOutBtn.addEventListener('pointerdown', zoomOutHandler, { passive: false });
                }
            }, 200);
        }

        // CRITICAL FIX: Add demo token markers with COMPLETE MOBILE SUPPORT
        addDemoTokenMarkers() {
            console.log('💎 Adding demo token markers with mobile touch support...');
            try {
                const markersContainer = document.getElementById('demoMarkers');
                if (!markersContainer) {
                    console.error('❌ Demo markers container not found');
                    return;
                }

                markersContainer.innerHTML = '';
                // CRITICAL: Allow pointer events on the container itself
                markersContainer.style.pointerEvents = 'none';

                // FIXED positions for consistent display
                const positions = [
                    { x: 52, y: 48 }, // Demo nearby token - center
                    { x: 42, y: 32 }, // Downtown Phoenix
                    { x: 78, y: 22 }, // Scottsdale Quarter
                    { x: 58, y: 88 }, // Desert Botanical Garden
                    { x: 82, y: 28 }, // Old Town Scottsdale
                    { x: 28, y: 72 }, // Arizona State University
                    { x: 38, y: 92 }, // Phoenix Sky Harbor
                    { x: 68, y: 12 }, // Camelback Mountain
                    { x: 22, y: 58 }, // Roosevelt Row
                    { x: 32, y: 38 }, // Tempe Town Lake
                    { x: 72, y: 78 }, // Chase Field
                    { x: 62, y: 68 }, // Papago Park
                    { x: 75, y: 18 }  // Biltmore Fashion Park
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
                            width: 60px;
                            height: 60px;
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
                            transform: translate(-50%, -50%);
                            -webkit-tap-highlight-color: transparent;
                            touch-action: manipulation;
                            user-select: none;
                            will-change: transform;
                        `;
                        marker.title = `${token.location} - ${token.value} $Ember`;
                        marker.dataset.tokenId = token.id;

                        // Token image
                        const tokenImage = document.createElement('img');
                        tokenImage.src = '../images/VPEmberCoin.PNG';
                        tokenImage.alt = 'Ember Coin';
                        tokenImage.style.cssText = `
                            width: 50px;
                            height: 50px;
                            border-radius: 50%;
                            object-fit: cover;
                            filter: brightness(1.2) drop-shadow(0 3px 12px rgba(240, 165, 0, 0.8));
                            pointer-events: none;
                            touch-action: none;
                            user-select: none;
                        `;
                        tokenImage.onerror = function() {
                            this.style.display = 'none';
                            marker.textContent = '💎';
                            marker.style.fontSize = '24px';
                            marker.style.color = '#f0a500';
                            marker.style.fontWeight = 'bold';
                        };

                        // Value overlay
                        const valueOverlay = document.createElement('div');
                        valueOverlay.style.cssText = `
                            position: absolute;
                            bottom: -20px;
                            left: 50%;
                            transform: translateX(-50%);
                            background: linear-gradient(135deg, #f0a500, #fb923c);
                            color: white;
                            font-size: 15px;
                            font-weight: 900;
                            padding: 8px 12px;
                            border-radius: 12px;
                            border: 2px solid white;
                            white-space: nowrap;
                            pointer-events: none;
                            touch-action: none;
                            box-shadow: 0 3px 12px rgba(240, 165, 0, 0.6);
                            z-index: 1;
                            user-select: none;
                        `;
                        valueOverlay.textContent = `${token.value}`;

                        marker.appendChild(tokenImage);
                        marker.appendChild(valueOverlay);

                        // CRITICAL MOBILE FIX: Universal event handler
                        const handleTokenInteraction = (e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            
                            console.log('🎯 TOKEN INTERACTION!', {
                                type: e.type,
                                tokenId: token.id,
                                location: token.location,
                                value: token.value
                            });
                            
                            // Visual feedback
                            marker.style.transform = 'translate(-50%, -50%) scale(1.2)';
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

                        // CRITICAL: Add ALL possible event types for maximum mobile compatibility
                        marker.addEventListener('click', handleTokenInteraction, { passive: false });
                        marker.addEventListener('touchstart', handleTokenInteraction, { passive: false });
                        marker.addEventListener('touchend', handleTokenInteraction, { passive: false });
                        marker.addEventListener('pointerdown', handleTokenInteraction, { passive: false });
                        marker.addEventListener('pointerup', handleTokenInteraction, { passive: false });

                        // Prevent scrolling when touching markers
                        marker.addEventListener('touchmove', (e) => {
                            e.preventDefault();
                            e.stopPropagation();
                        }, { passive: false });

                        markersContainer.appendChild(marker);
                        markerCount++;

                        if (this.debugMode) {
                            console.log(`✅ Added marker ${markerCount}: ${token.location} with mobile touch support`);
                        }
                    }
                });

                console.log(`✅ Added ${markerCount} demo token markers with mobile touch support`);
                
                // Debug verification
                if (this.debugMode) {
                    setTimeout(() => {
                        const markers = document.querySelectorAll('.demo-token-marker');
                        console.log(`🔍 Debug: Found ${markers.length} clickable markers`);
                        markers.forEach((marker, i) => {
                            console.log(`  Marker ${i+1}: pointer-events = ${getComputedStyle(marker).pointerEvents}`);
                        });
                    }, 500);
                }
                
            } catch (error) {
                console.error('❌ Demo token markers error:', error);
            }
        }

        // Start game features
        startGameFeatures() {
            console.log('🎮 Starting game features...');
            this.updateLocationDisplay();
            this.updateNearbyTokens();
            this.updateTokenCounts();
            this.updateVaultStats();
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
                    .slice(0, 5);

                const nearbyCount = document.getElementById('nearbyTokenCount');
                if (nearbyCount) {
                    nearbyCount.textContent = `${nearbyTokens.length} nearby`;
                }

                // Update token locations list with mobile support
                const tokensList = document.getElementById('tokenLocationsList');
                if (tokensList) {
                    tokensList.innerHTML = nearbyTokens.map(token => `
                        <div class="token-location-item" data-token-id="${token.id}" style="
                            cursor: pointer;
                            touch-action: manipulation;
                            -webkit-tap-highlight-color: transparent;
                            user-select: none;
                            min-height: 60px;
                        ">
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

                    // Add click handlers to token list items with mobile support
                    tokensList.querySelectorAll('.token-location-item').forEach(item => {
                        const itemClickHandler = (e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            
                            const tokenId = parseInt(item.dataset.tokenId);
                            const token = this.emberTokens.find(t => t.id === tokenId);
                            if (token) {
                                token.distance = this.calculateDistance(this.userLat, this.userLng, token.lat, token.lng);
                                this.showNavigationModal(token);
                            }
                        };

                        // Add multiple event types for mobile compatibility
                        item.addEventListener('click', itemClickHandler, { passive: false });
                        item.addEventListener('touchend', itemClickHandler, { passive: false });
                        item.addEventListener('pointerup', itemClickHandler, { passive: false });
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

        // CRITICAL FIX: Show navigation modal with mobile optimization
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
                    }
                }
                
                if (modal) {
                    modal.classList.add('show');
                    console.log('✅ Navigation modal displayed successfully');
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

        // =================== MODE SWITCHING ===================
        switchMode(mode) {
            console.log('🔄 Switching to mode:', mode);
            try {
                this.currentMode = mode;
                this.setModeAttribute(mode);
                this.updateActiveTab(mode);
                this.updateMenuItems();
                
                // Hide all views first
                const views = ['map', 'vaultView', 'campaignsView'];
                views.forEach(viewId => {
                    const view = document.getElementById(viewId);
                    if (view) {
                        view.style.display = 'none';
                    }
                });
                
                // Show appropriate view
                switch (mode) {
                    case 'map':
                        const mapView = document.getElementById('map');
                        if (mapView) mapView.style.display = 'block';
                        break;
                    case 'vault':
                        const vaultView = document.getElementById('vaultView');
                        if (vaultView) vaultView.style.display = 'block';
                        this.updateVaultStats();
                        break;
                    case 'campaigns':
                        const campaignsView = document.getElementById('campaignsView');
                        if (campaignsView) campaignsView.style.display = 'block';
                        break;
                    case 'ar':
                        const mapViewAR = document.getElementById('map');
                        if (mapViewAR) mapViewAR.style.display = 'block';
                        this.startARMode();
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

        updateMenuItems() {
            document.querySelectorAll('.menu-item').forEach(item => {
                item.classList.remove('active');
            });
            
            const activeItem = document.querySelector(`[data-mode="${this.currentMode}"]`);
            if (activeItem) {
                activeItem.classList.add('active');
            }
        }

        startARMode() {
            console.log('📱 Starting AR mode...');
            // Show AR instructions
            const arInstructions = document.getElementById('arInstructions');
            if (arInstructions) {
                arInstructions.classList.add('show');
                setTimeout(() => {
                    arInstructions.classList.remove('show');
                }, 5000);
            }
        }

        // =================== VAULT SYSTEM ===================
        updateVaultStats() {
            try {
                // Update vault display
                const badgeCountEl = document.querySelector('.badge-count');
                const vaultBalanceEl = document.getElementById('vaultBalance');
                const vaultUsdValueEl = document.getElementById('vaultUsdValue');
                const totalCollectedEl = document.getElementById('totalCollected');
                const totalValueEl = document.getElementById('totalValue');
                const locationsVisitedEl = document.getElementById('locationsVisited');
                const lastActivityEl = document.getElementById('lastActivity');
                
                if (badgeCountEl) {
                    badgeCountEl.textContent = this.totalTokenValue.toLocaleString();
                }
                
                if (vaultBalanceEl) {
                    vaultBalanceEl.textContent = `${this.totalTokenValue.toLocaleString()} $Ember Tokens`;
                }
                
                if (vaultUsdValueEl) {
                    const usdValue = (this.totalTokenValue * 0.001).toFixed(2);
                    vaultUsdValueEl.textContent = `$${usdValue} USD`;
                }
                
                if (totalCollectedEl) {
                    totalCollectedEl.textContent = this.collectedTokens.length;
                }
                
                if (totalValueEl) {
                    const totalUsd = (this.totalTokenValue * 0.001).toFixed(2);
                    totalValueEl.textContent = `$${totalUsd}`;
                }
                
                if (locationsVisitedEl) {
                    const uniqueLocations = new Set(this.collectedTokens.map(t => t.location)).size;
                    locationsVisitedEl.textContent = uniqueLocations;
                }
                
                if (lastActivityEl && this.collectedTokens.length > 0) {
                    lastActivityEl.textContent = 'Today';
                }
                
                // Update token history
                this.updateTokenHistory();
                
            } catch (error) {
                console.error('❌ Vault stats update error:', error);
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
                } else {
                    const recentTokens = [...this.collectedTokens].reverse().slice(0, 10);
                    
                    historyContainer.innerHTML = recentTokens.map(token => `
                        <div class="history-item">
                            <div class="history-icon">
                                <img src="../images/VPEmberCoin.PNG" alt="Ember" class="history-coin-icon" onerror="this.textContent='💎'">
                            </div>
                            <div class="history-details">
                                <div class="history-title">${token.location}</div>
                                <div class="history-subtitle">Just now • ${token.sponsor}</div>
                            </div>
                            <div class="history-value">+${token.value}</div>
                        </div>
                    `).join('');
                }
            } catch (error) {
                console.error('❌ Token history update error:', error);
            }
        }

        // =================== TOKEN COLLECTION ===================
        collectToken(token) {
            console.log('💰 Collecting token:', token.location);
            try {
                // Add to collected tokens
                this.collectedTokens.push({
                    ...token,
                    collectedAt: new Date().toISOString()
                });
                
                // Update total value
                this.totalTokenValue += token.value;
                
                // Save to localStorage
                this.saveCollectedTokens();
                
                // Update displays
                this.updateTokenCounts();
                this.updateVaultStats();
                this.updateNearbyTokens();
                
                // Remove marker from map
                this.removeTokenMarker(token.id);
                
                // Show success feedback
                this.showCollectionSuccess(token);
                
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

        showCollectionSuccess(token) {
            // Create success feedback
            const success = document.createElement('div');
            success.style.cssText = `
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                background: linear-gradient(135deg, rgba(76, 175, 80, 0.95), rgba(67, 160, 71, 0.95));
                color: white;
                padding: 24px;
                border-radius: 16px;
                font-size: 18px;
                font-weight: 700;
                z-index: 400;
                box-shadow: 0 12px 32px rgba(76, 175, 80, 0.5);
                text-align: center;
                touch-action: none;
                user-select: none;
            `;
            success.innerHTML = `
                <div style="font-size: 32px; margin-bottom: 12px;">💎</div>
                <div>Token Collected!</div>
                <div style="font-size: 16px; margin-top: 8px;">+${token.value} $Ember</div>
            `;

            document.body.appendChild(success);

            setTimeout(() => {
                if (document.body.contains(success)) {
                    document.body.removeChild(success);
                }
            }, 2000);

            // Haptic feedback
            if (navigator.vibrate) {
                navigator.vibrate([100, 50, 100, 50, 200]);
            }
        }

        // =================== DATA PERSISTENCE ===================
        saveCollectedTokens() {
            try {
                localStorage.setItem('vaultPhoenix_collectedTokens', JSON.stringify(this.collectedTokens));
                localStorage.setItem('vaultPhoenix_totalValue', this.totalTokenValue.toString());
            } catch (error) {
                console.error('❌ Save error:', error);
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
                
                console.log(`💰 Loaded ${this.collectedTokens.length} collected tokens`);
            } catch (error) {
                console.error('❌ Load error:', error);
                this.collectedTokens = [];
                this.totalTokenValue = 0;
            }
        }

        isTokenCollected(tokenId) {
            return this.collectedTokens.some(token => token.id === tokenId);
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

        // =================== SWIPEABLE MODULE ===================
        setupSwipeableModule() {
            console.log('👆 Setting up swipeable module with mobile support...');
            try {
                const handle = document.getElementById('swipeHandle');
                if (!handle) return;
                
                // Touch events with mobile fixes
                handle.addEventListener('touchstart', this.handleTouchStart.bind(this), { passive: false });
                handle.addEventListener('touchmove', this.handleTouchMove.bind(this), { passive: false });
                handle.addEventListener('touchend', this.handleTouchEnd.bind(this), { passive: false });
                
                // Click to toggle with mobile support
                handle.addEventListener('click', this.toggleModule.bind(this), { passive: false });
                handle.addEventListener('pointerup', this.toggleModule.bind(this), { passive: false });
                
                console.log('✅ Swipeable module setup complete with mobile support');
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
            }
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
                
                if (navigator.vibrate) {
                    navigator.vibrate(30);
                }
            }
        }

        // =================== RESET GAME ===================
        resetGame() {
            console.log('🔄 Resetting game...');
            try {
                // Clear all data
                this.collectedTokens = [];
                this.totalTokenValue = 0;
                
                // Clear localStorage
                localStorage.removeItem('vaultPhoenix_collectedTokens');
                localStorage.removeItem('vaultPhoenix_totalValue');
                
                // Update displays
                this.updateVaultStats();
                this.updateTokenCounts();
                this.updateNearbyTokens();
                
                // Reinitialize map with all tokens
                setTimeout(() => {
                    this.addDemoTokenMarkers();
                }, 500);
                
                // Show success feedback
                console.log('✅ Game reset successfully');
                
            } catch (error) {
                console.error('❌ Game reset error:', error);
            }
        }

        // =================== EVENT LISTENERS (MOBILE OPTIMIZED) ===================
        setupEventListeners() {
            console.log('🎧 Setting up event listeners with mobile support...');
            try {
                // MOBILE FIX: Universal event handler function
                const addUniversalEventListener = (element, handler, options = { passive: false }) => {
                    if (!element) return;
                    
                    // Add all event types for maximum compatibility
                    element.addEventListener('click', handler, options);
                    element.addEventListener('touchend', handler, options);
                    element.addEventListener('pointerup', handler, options);
                    
                    // Prevent scrolling on touch
                    element.addEventListener('touchstart', (e) => {
                        e.preventDefault();
                    }, { passive: false });
                };

                // Navigation tabs - CRITICAL FIX with mobile support
                document.querySelectorAll('.nav-tab').forEach(tab => {
                    addUniversalEventListener(tab, (e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        const mode = tab.dataset.mode;
                        if (mode) {
                            console.log('📱 Tab switched to:', mode);
                            this.switchMode(mode);
                        }
                    });
                });

                // Menu items - CRITICAL FIX with mobile support
                document.querySelectorAll('.menu-item[data-mode]').forEach(item => {
                    addUniversalEventListener(item, (e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        const mode = item.dataset.mode;
                        if (mode) {
                            console.log('📱 Menu item selected:', mode);
                            this.switchMode(mode);
                            this.hideMenu();
                        }
                    });
                });

                // Menu toggle - CRITICAL FIX with mobile support
                const menuToggle = document.getElementById('menuToggle');
                if (menuToggle) {
                    addUniversalEventListener(menuToggle, (e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        console.log('📱 Menu toggle');
                        this.toggleMenu();
                    });
                }

                // Menu overlay
                const menuOverlay = document.getElementById('menuOverlay');
                if (menuOverlay) {
                    addUniversalEventListener(menuOverlay, (e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        this.hideMenu();
                    });
                }

                // Navigation modal - CRITICAL FIX with mobile support
                const navClose = document.getElementById('navClose');
                const navWalking = document.getElementById('navWalking');
                const navDriving = document.getElementById('navDriving');
                
                if (navClose) {
                    addUniversalEventListener(navClose, (e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        this.hideNavigationModal();
                    });
                }
                
                if (navWalking) {
                    addUniversalEventListener(navWalking, (e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        this.openMapsNavigation('walking');
                    });
                }
                
                if (navDriving) {
                    addUniversalEventListener(navDriving, (e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        this.openMapsNavigation('driving');
                    });
                }

                // Vault badge with mobile support
                const vaultBadge = document.getElementById('vaultBadge');
                if (vaultBadge) {
                    addUniversalEventListener(vaultBadge, (e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        this.switchMode('vault');
                    });
                }

                // Reset game - CRITICAL FIX with mobile support
                const resetGameBtn = document.getElementById('resetGameBtn');
                const confirmResetGame = document.getElementById('confirmResetGame');
                const cancelResetGame = document.getElementById('cancelResetGame');
                
                if (resetGameBtn) {
                    addUniversalEventListener(resetGameBtn, (e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        const modal = document.getElementById('resetGameOverlay');
                        if (modal) modal.classList.add('show');
                    });
                }
                
                if (confirmResetGame) {
                    addUniversalEventListener(confirmResetGame, (e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        this.resetGame();
                        const modal = document.getElementById('resetGameOverlay');
                        if (modal) modal.classList.remove('show');
                    });
                }
                
                if (cancelResetGame) {
                    addUniversalEventListener(cancelResetGame, (e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        const modal = document.getElementById('resetGameOverlay');
                        if (modal) modal.classList.remove('show');
                    });
                }

                // Logout - CRITICAL FIX with mobile support
                const sideMenuLogout = document.getElementById('sideMenuLogout');
                const confirmLogout = document.getElementById('confirmLogout');
                const cancelLogout = document.getElementById('cancelLogout');
                
                if (sideMenuLogout) {
                    addUniversalEventListener(sideMenuLogout, (e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        const modal = document.getElementById('logoutOverlay');
                        if (modal) modal.classList.add('show');
                    });
                }
                
                if (confirmLogout) {
                    addUniversalEventListener(confirmLogout, (e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        if (window.vaultPhoenixSession) {
                            window.vaultPhoenixSession.logout();
                        } else {
                            // Demo logout
                            window.location.href = '../';
                        }
                    });
                }
                
                if (cancelLogout) {
                    addUniversalEventListener(cancelLogout, (e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        const modal = document.getElementById('logoutOverlay');
                        if (modal) modal.classList.remove('show');
                    });
                }

                // QR modal with mobile support
                const redeemTokens = document.getElementById('redeemTokens');
                const redeemQRBtn = document.getElementById('redeemQRBtn');
                const qrClose = document.getElementById('qrClose');
                
                if (redeemTokens) {
                    addUniversalEventListener(redeemTokens, (e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        const modal = document.getElementById('qrModal');
                        if (modal) modal.classList.add('show');
                    });
                }
                
                if (redeemQRBtn) {
                    addUniversalEventListener(redeemQRBtn, (e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        const modal = document.getElementById('qrModal');
                        if (modal) modal.classList.add('show');
                    });
                }
                
                if (qrClose) {
                    addUniversalEventListener(qrClose, (e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        const modal = document.getElementById('qrModal');
                        if (modal) modal.classList.remove('show');
                    });
                }

                // Coinbase wallet with mobile support
                const coinbaseWallet = document.getElementById('coinbaseWallet');
                const coinbaseTransferBtn = document.getElementById('coinbaseTransferBtn');
                
                if (coinbaseWallet) {
                    addUniversalEventListener(coinbaseWallet, (e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        alert('Coinbase Wallet integration coming soon!');
                    });
                }
                
                if (coinbaseTransferBtn) {
                    addUniversalEventListener(coinbaseTransferBtn, (e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        alert('Coinbase Wallet integration coming soon!');
                    });
                }

                console.log('✅ Event listeners setup complete with mobile support');
            } catch (error) {
                console.error('❌ Event listeners setup error:', error);
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
    }

    // =================== GLOBAL INITIALIZATION ===================
    // Initialize the dashboard application
    console.log('🔥💎 Creating Vault Phoenix Dashboard instance...');
    window.vaultPhoenixDashboard = new VaultPhoenixDashboard();

} else {
    console.log('🚫 Dashboard JavaScript blocked - not a crypto game page');
}

console.log('🔥💎 Vault Phoenix Dashboard JavaScript loaded successfully with mobile touch support');
