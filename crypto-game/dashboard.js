// Vault Phoenix AR Crypto Gaming - COMPLETE DASHBOARD JAVASCRIPT
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

// ONLY RUN DASHBOARD IF THIS IS A CRYPTO GAME PAGE
if (window.isVaultPhoenixDashboard) {

    class VaultPhoenixDashboard {
        constructor() {
            console.log('🔥💎 Vault Phoenix Dashboard initializing...');
            
            // Core properties
            this.userLat = 33.4484; // Phoenix, AZ default (demo player location)
            this.userLng = -112.0740;
            this.heading = 0;
            this.collectedTokens = [];
            this.totalTokenValue = 0;
            this.currentMode = 'map';
            this.currentNavigationToken = null;
            this.currentDiscoveredToken = null;
            this.isShowingSponsorDetails = false;
            this.currentAdventure = 'phoenix-sports';
            this.currentQRContext = null;
            this.cameraStream = null;
            this.cameraAccessGranted = false;
            this.sessionCameraRequested = false;
            
            // UI state
            this.moduleExpanded = false;
            this.isDragging = false;
            this.moduleStartY = 0;
            
            // Map properties
            this.mapIsDragging = false;
            this.mapStartX = 0;
            this.mapStartY = 0;
            this.mapTranslateX = 0;
            this.mapTranslateY = 0;
            this.mapScale = 1;
            
            // Airdrop system
            this.airdropTimer = null;
            this.airdropShown = false;
            this.pendingAirdropValue = 0;
            this.airdropShowCount = 0; // Track session airdrops
            
            // AR Hunt module timer
            this.arHuntModuleTimer = null;

            // Enhanced Ember Token System - Demo locations with real Phoenix spots
            this.emberTokens = [
                // COLLECTABLE tokens within AR range (demo mode)
                { 
                    id: 1, 
                    value: 500, 
                    tier: "high", 
                    location: "Phoenix Plaza Central", 
                    lat: 33.4485, 
                    lng: -112.0741, 
                    sponsor: "Phoenix Downtown Partnership", 
                    message: "Premium downtown experience awaits!", 
                    description: "Exclusive access to downtown Phoenix events, VIP parking, and luxury dining experiences.", 
                    distance: 8, 
                    collectable: true 
                },
                { 
                    id: 2, 
                    value: 250, 
                    tier: "medium", 
                    location: "Heritage Square", 
                    lat: 33.4483, 
                    lng: -112.0742, 
                    sponsor: "Arizona Heritage Foundation", 
                    message: "Discover Phoenix history!", 
                    description: "Historic tour packages and museum access with guided experiences.", 
                    distance: 6, 
                    collectable: true 
                },
                { 
                    id: 3, 
                    value: 150, 
                    tier: "medium", 
                    location: "Roosevelt Row Art Walk", 
                    lat: 33.4486, 
                    lng: -112.0739, 
                    sponsor: "Local Artists Collective", 
                    message: "Support local Phoenix artists!", 
                    description: "Art gallery tours and exclusive artwork purchasing opportunities.", 
                    distance: 9, 
                    collectable: true 
                },
                
                // NEARBY tokens (navigation demo)
                { 
                    id: 4, 
                    value: 750, 
                    tier: "high", 
                    location: "Chase Field", 
                    lat: 33.4453, 
                    lng: -112.0667, 
                    sponsor: "Arizona Diamondbacks", 
                    message: "Baseball season tickets await!", 
                    description: "Premium baseball experiences with season ticket perks and dugout tours.", 
                    distance: 850, 
                    collectable: false 
                },
                { 
                    id: 5, 
                    value: 300, 
                    tier: "medium", 
                    location: "Phoenix Convention Center", 
                    lat: 33.4489, 
                    lng: -112.0739, 
                    sponsor: "Visit Phoenix", 
                    message: "Convention center VIP access!", 
                    description: "Priority booking and VIP amenities for events and conferences.", 
                    distance: 320, 
                    collectable: false 
                },
                
                // DISTANT tokens (show full map experience)
                { 
                    id: 6, 
                    value: 400, 
                    tier: "high", 
                    location: "Sky Harbor Airport", 
                    lat: 33.4343, 
                    lng: -112.0116, 
                    sponsor: "Sky Harbor Shops", 
                    message: "Travel rewards for your next adventure!", 
                    description: "Unlock travel perks and duty-free shopping benefits.", 
                    distance: 1500, 
                    collectable: false 
                },
                { 
                    id: 7, 
                    value: 200, 
                    tier: "medium", 
                    location: "Scottsdale Quarter", 
                    lat: 33.4942, 
                    lng: -111.9261, 
                    sponsor: "Scottsdale Fashion Square", 
                    message: "Premium shopping rewards unlocked!", 
                    description: "Luxury shopping with exclusive discounts and VIP personal shopping services.", 
                    distance: 2200, 
                    collectable: false 
                },
                { 
                    id: 8, 
                    value: 175, 
                    tier: "medium", 
                    location: "Desert Botanical Garden", 
                    lat: 33.4619, 
                    lng: -111.9463, 
                    sponsor: "Garden Cafe", 
                    message: "Nature-inspired dining experience!", 
                    description: "Farm-to-table dining surrounded by stunning desert flora.", 
                    distance: 1800, 
                    collectable: false 
                },
                { 
                    id: 9, 
                    value: 225, 
                    tier: "medium", 
                    location: "Camelback Mountain", 
                    lat: 33.5186, 
                    lng: -111.9717, 
                    sponsor: "Desert Hiking Gear", 
                    message: "Gear up for your next hike!", 
                    description: "Professional hiking equipment and guided desert expedition packages.", 
                    distance: 2800, 
                    collectable: false 
                },
                { 
                    id: 10, 
                    value: 125, 
                    tier: "low", 
                    location: "Tempe Town Lake", 
                    lat: 33.4255, 
                    lng: -111.9400, 
                    sponsor: "Local Coffee Co.", 
                    message: "Free coffee for early hunters!", 
                    description: "Enjoy artisanal coffee and cozy workspace with special benefits.", 
                    distance: 1200, 
                    collectable: false 
                }
            ];

            // Challenges system (no extra ember, just rewards)
            this.challenges = {
                daily: [
                    {
                        id: 'daily-1',
                        title: 'Token Explorer',
                        description: 'Collect 5 tokens in different locations',
                        progress: 3,
                        target: 5,
                        reward: 'Special Offer Unlock',
                        type: 'collect',
                        completed: false,
                        icon: '🗺️'
                    },
                    {
                        id: 'daily-2',
                        title: 'Location Scout',
                        description: 'Visit 3 sponsor locations',
                        progress: 3,
                        target: 3,
                        reward: 'VIP Access Unlocked',
                        type: 'visit_locations',
                        completed: true,
                        icon: '📱'
                    }
                ],
                weekly: [
                    {
                        id: 'weekly-1',
                        title: 'Phoenix Explorer',
                        description: 'Visit 5 different Phoenix districts this week',
                        progress: 2,
                        target: 5,
                        reward: 'Premium Experience Pack',
                        type: 'locations',
                        completed: false,
                        icon: '🌟'
                    },
                    {
                        id: 'weekly-2',
                        title: 'Gaming Streak',
                        description: 'Play 10 days consecutively',
                        progress: 8,
                        target: 10,
                        reward: 'Streak Bonus Multiplier',
                        type: 'streak',
                        completed: false,
                        icon: '🎮'
                    }
                ],
                location: [
                    {
                        id: 'location-1',
                        title: 'Arena VIP Experience',
                        description: 'Visit Chase Field and redeem your special offer',
                        sponsor: 'Phoenix Suns Arena',
                        sponsorLogo: '🏀',
                        reward: 'VIP Game Experience',
                        rewardIcon: '🎫',
                        location: 'chase-field',
                        type: 'visit_location',
                        completed: false,
                        hasQR: true
                    },
                    {
                        id: 'location-2',
                        title: 'Foodie Adventure',
                        description: 'Show QR code for exclusive dining offer',
                        sponsor: 'Local Pizza Co.',
                        sponsorLogo: '🍕',
                        reward: '20% Off Meal',
                        rewardIcon: '🍽️',
                        type: 'merchant_discount',
                        completed: false,
                        hasQR: true
                    }
                ]
            };

            // Available rewards (redeem at locations only)
            this.earnedRewards = [
                {
                    id: 'reward-1',
                    title: 'Free Coffee',
                    description: 'Local Coffee Co. - Valid until Dec 31',
                    value: 'Show QR at location',
                    icon: '🎫',
                    status: 'available',
                    type: 'qr',
                    qrData: 'coffee-free'
                },
                {
                    id: 'reward-2',
                    title: 'Pizza Discount',
                    description: '20% off any large pizza',
                    value: 'Show QR at location',
                    icon: '🍕',
                    status: 'available',
                    type: 'qr',
                    qrData: 'pizza-discount'
                },
                {
                    id: 'reward-3',
                    title: 'Shopping Voucher',
                    description: '$10 off purchases over $50',
                    value: 'Show QR at location',
                    icon: '🛍️',
                    status: 'available',
                    type: 'qr',
                    qrData: 'shopping-voucher'
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
            console.log('🔧 Initializing Dashboard...');
            try {
                this.ensureSession();
                this.loadCollectedTokens();
                this.loadChallengeProgress();
                this.setupEventListeners();
                this.setupSwipeableModule();
                
                // Ensure dashboard page class is applied
                document.body.classList.add('crypto-dashboard-page');
                this.setModeAttribute('map');
                
                // Initialize map with proper boundaries
                setTimeout(() => {
                    this.initializeMap();
                }, 500);
                
                // Start airdrop system (once per session)
                this.startAirdropTimer();
                
                // Initialize challenge timers
                this.startChallengeTimers();
                
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

        // =================== ENHANCED MAP SYSTEM ===================
        initializeMap() {
            console.log('🗺️ Initializing Enhanced Map System...');
            try {
                const mapContainer = document.getElementById('googleMapContainer');
                if (!mapContainer) {
                    console.error('❌ Map container not found');
                    return;
                }

                console.log('🎨 Creating Phoenix map with smooth controls...');
                this.createEnhancedPhoenixMap(mapContainer);
                
            } catch (error) {
                console.error('❌ Map initialization error:', error);
            }
        }

        createEnhancedPhoenixMap(mapContainer) {
            console.log('🎨 Creating enhanced Phoenix map...');
            try {
                // Create enhanced Phoenix map
                mapContainer.innerHTML = `
                    <div class="designed-phoenix-map" id="phoenixMapContainer" style="
                        position: absolute;
                        top: 0;
                        left: 0;
                        width: 150%;
                        height: 150%;
                        background: linear-gradient(135deg, #f4f1e8 0%, #e8dcc7 25%, #ddd1bb 50%, #d1c5af 75%, #c5b9a3 100%);
                        overflow: visible;
                        z-index: 1;
                        cursor: grab;
                        pointer-events: auto;
                        touch-action: pan-x pan-y;
                        user-select: none;
                        transform-origin: center center;
                        will-change: transform;
                    ">
                        <!-- Phoenix Mountains Background -->
                        <div class="mountain-range" style="
                            position: absolute;
                            bottom: 0;
                            left: 0;
                            width: 100%;
                            height: 30%;
                            background: linear-gradient(to top, #8b7355, #a68b5b, #c4a678);
                            clip-path: polygon(0% 100%, 15% 60%, 25% 70%, 40% 45%, 55% 65%, 70% 40%, 85% 55%, 100% 35%, 100% 100%);
                            z-index: 1;
                            pointer-events: none;
                            opacity: 0.7;
                        "></div>
                        
                        <!-- Major Roads -->
                        <div class="road-network" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; z-index: 3; pointer-events: none;">
                            <!-- I-10 Highway -->
                            <div style="position: absolute; top: 65%; left: 0; width: 100%; height: 4px; background: #4a4a4a; opacity: 0.8; border-radius: 2px;"></div>
                            <!-- I-17 Highway -->
                            <div style="position: absolute; left: 45%; top: 0; width: 4px; height: 100%; background: #4a4a4a; opacity: 0.8; border-radius: 2px;"></div>
                            <!-- Central Avenue -->
                            <div style="position: absolute; left: 47%; top: 30%; width: 2px; height: 40%; background: #777; opacity: 0.6;"></div>
                        </div>
                        
                        <!-- Phoenix Landmarks -->
                        <div class="phoenix-landmarks" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; z-index: 4; pointer-events: none;">
                            <!-- Downtown Skyline -->
                            <div class="downtown-skyline" style="position: absolute; left: 42%; top: 58%; width: 12%; height: 15%;">
                                <div style="background: #2c3e50; width: 15%; height: 80%; position: absolute; left: 0; bottom: 0; border-radius: 1px 1px 0 0;"></div>
                                <div style="background: #34495e; width: 20%; height: 100%; position: absolute; left: 20%; bottom: 0; border-radius: 1px 1px 0 0;"></div>
                                <div style="background: #2c3e50; width: 18%; height: 70%; position: absolute; left: 45%; bottom: 0; border-radius: 1px 1px 0 0;"></div>
                                <div style="background: #34495e; width: 25%; height: 85%; position: absolute; left: 68%; bottom: 0; border-radius: 1px 1px 0 0;"></div>
                            </div>
                            
                            <!-- Camelback Mountain -->
                            <div style="position: absolute; left: 65%; top: 20%; width: 8px; height: 6px; background: #8B4513; border-radius: 4px 4px 0 0; transform: skew(-10deg);"></div>
                            
                            <!-- Chase Field -->
                            <div style="position: absolute; left: 44%; top: 62%; width: 8px; height: 6px; background: #4caf50; border-radius: 50%; border: 2px solid #2e7d32;"></div>
                            
                            <!-- Sky Harbor Airport -->
                            <div style="position: absolute; left: 35%; top: 75%; width: 16px; height: 8px; background: #607d8b; border-radius: 2px;"></div>
                        </div>
                        
                        <!-- Demo Player Location (Blue dot - no label) -->
                        <div id="playerLocation" style="
                            position: absolute;
                            top: 50%;
                            left: 50%;
                            width: 24px;
                            height: 24px;
                            background: linear-gradient(135deg, #4285F4, #1565C0);
                            border: 4px solid white;
                            border-radius: 50%;
                            transform: translate(-50%, -50%);
                            animation: userLocationPulse 3s ease-in-out infinite;
                            z-index: 90;
                            box-shadow: 0 4px 20px rgba(66, 133, 244, 0.8);
                            pointer-events: none;
                        "></div>
                        
                        <!-- Map Controls - Always Visible -->
                        <div style="
                            position: fixed;
                            bottom: calc(env(safe-area-inset-bottom, 14px) + 280px);
                            right: 24px;
                            z-index: 200;
                            display: flex;
                            flex-direction: column;
                            gap: 12px;
                        ">
                            <button id="zoomInBtn" style="
                                width: 56px;
                                height: 56px;
                                background: linear-gradient(135deg, #f0a500, #fb923c);
                                border: 3px solid rgba(255, 255, 255, 0.9);
                                border-radius: 14px;
                                color: white;
                                font-size: 28px;
                                font-weight: bold;
                                cursor: pointer;
                                display: flex;
                                align-items: center;
                                justify-content: center;
                                box-shadow: 0 8px 24px rgba(240, 165, 0, 0.6);
                                transition: all 0.3s ease;
                                pointer-events: auto;
                                touch-action: manipulation;
                                -webkit-tap-highlight-color: transparent;
                                user-select: none;
                            ">+</button>
                            <button id="zoomOutBtn" style="
                                width: 56px;
                                height: 56px;
                                background: linear-gradient(135deg, #f0a500, #fb923c);
                                border: 3px solid rgba(255, 255, 255, 0.9);
                                border-radius: 14px;
                                color: white;
                                font-size: 28px;
                                font-weight: bold;
                                cursor: pointer;
                                display: flex;
                                align-items: center;
                                justify-content: center;
                                box-shadow: 0 8px 24px rgba(240, 165, 0, 0.6);
                                transition: all 0.3s ease;
                                pointer-events: auto;
                                touch-action: manipulation;
                                -webkit-tap-highlight-color: transparent;
                                user-select: none;
                            ">-</button>
                            <button id="centerMapBtn" style="
                                width: 56px;
                                height: 56px;
                                background: linear-gradient(135deg, #4285F4, #1565C0);
                                border: 3px solid rgba(255, 255, 255, 0.9);
                                border-radius: 14px;
                                color: white;
                                font-size: 20px;
                                font-weight: bold;
                                cursor: pointer;
                                display: flex;
                                align-items: center;
                                justify-content: center;
                                box-shadow: 0 8px 24px rgba(66, 133, 244, 0.6);
                                transition: all 0.3s ease;
                                pointer-events: auto;
                                touch-action: manipulation;
                                -webkit-tap-highlight-color: transparent;
                                user-select: none;
                            ">🎯</button>
                        </div>
                        
                        <!-- Token Markers Container -->
                        <div id="phoenixTokenMarkers" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; z-index: 100; pointer-events: none;"></div>
                    </div>
                `;

                // Set up map controls
                setTimeout(() => {
                    this.setupEnhancedMapControls();
                    this.addPhoenixTokenMarkers();
                    this.startGameFeatures();
                }, 500);

                console.log('✅ Enhanced Phoenix map initialized');
                
            } catch (error) {
                console.error('❌ Enhanced map creation error:', error);
            }
        }

        setupEnhancedMapControls() {
            console.log('🖱️ Setting up smooth map controls...');
            
            const mapContainer = document.getElementById('phoenixMapContainer');
            const zoomInBtn = document.getElementById('zoomInBtn');
            const zoomOutBtn = document.getElementById('zoomOutBtn');
            const centerMapBtn = document.getElementById('centerMapBtn');

            // Enhanced map dragging
            if (mapContainer) {
                let isDragging = false;
                let startX = 0;
                let startY = 0;
                let currentX = this.mapTranslateX;
                let currentY = this.mapTranslateY;

                const handleStart = (e) => {
                    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
                    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
                    
                    isDragging = true;
                    startX = clientX - currentX;
                    startY = clientY - currentY;
                    
                    mapContainer.style.cursor = 'grabbing';
                    mapContainer.style.transition = 'none';
                    
                    e.preventDefault();
                };

                const handleMove = (e) => {
                    if (!isDragging) return;
                    
                    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
                    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
                    
                    currentX = clientX - startX;
                    currentY = clientY - startY;
                    
                    this.updateMapTransform(currentX, currentY, this.mapScale);
                    
                    e.preventDefault();
                };

                const handleEnd = (e) => {
                    if (!isDragging) return;
                    
                    isDragging = false;
                    this.mapTranslateX = currentX;
                    this.mapTranslateY = currentY;
                    
                    mapContainer.style.cursor = 'grab';
                    mapContainer.style.transition = 'transform 0.3s ease';
                    
                    e.preventDefault();
                };

                // Add event listeners
                mapContainer.addEventListener('mousedown', handleStart, { passive: false });
                mapContainer.addEventListener('touchstart', handleStart, { passive: false });
                
                document.addEventListener('mousemove', handleMove, { passive: false });
                document.addEventListener('touchmove', handleMove, { passive: false });
                
                document.addEventListener('mouseup', handleEnd, { passive: false });
                document.addEventListener('touchend', handleEnd, { passive: false });
            }

            // Zoom controls
            if (zoomInBtn) {
                const zoomInHandler = (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    
                    const newScale = Math.min(this.mapScale * 1.3, 3);
                    if (newScale !== this.mapScale) {
                        this.mapScale = newScale;
                        this.updateMapTransform(this.mapTranslateX, this.mapTranslateY, this.mapScale);
                        
                        zoomInBtn.style.transform = 'scale(0.9)';
                        setTimeout(() => {
                            zoomInBtn.style.transform = 'scale(1)';
                        }, 150);
                        
                        if (navigator.vibrate) navigator.vibrate(30);
                    }
                };

                zoomInBtn.addEventListener('click', zoomInHandler, { passive: false });
                zoomInBtn.addEventListener('touchend', zoomInHandler, { passive: false });
            }

            if (zoomOutBtn) {
                const zoomOutHandler = (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    
                    const newScale = Math.max(this.mapScale / 1.3, 0.5);
                    if (newScale !== this.mapScale) {
                        this.mapScale = newScale;
                        this.updateMapTransform(this.mapTranslateX, this.mapTranslateY, this.mapScale);
                        
                        zoomOutBtn.style.transform = 'scale(0.9)';
                        setTimeout(() => {
                            zoomOutBtn.style.transform = 'scale(1)';
                        }, 150);
                        
                        if (navigator.vibrate) navigator.vibrate(30);
                    }
                };

                zoomOutBtn.addEventListener('click', zoomOutHandler, { passive: false });
                zoomOutBtn.addEventListener('touchend', zoomOutHandler, { passive: false });
            }

            if (centerMapBtn) {
                const centerMapHandler = (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    
                    this.mapTranslateX = 0;
                    this.mapTranslateY = 0;
                    this.mapScale = 1;
                    this.updateMapTransform(0, 0, 1);
                    
                    centerMapBtn.style.transform = 'scale(0.9)';
                    setTimeout(() => {
                        centerMapBtn.style.transform = 'scale(1)';
                    }, 150);
                    
                    if (navigator.vibrate) navigator.vibrate([30, 10, 30]);
                };

                centerMapBtn.addEventListener('click', centerMapHandler, { passive: false });
                centerMapBtn.addEventListener('touchend', centerMapHandler, { passive: false });
            }
        }

        updateMapTransform(x, y, scale) {
            const mapContainer = document.getElementById('phoenixMapContainer');
            if (mapContainer) {
                mapContainer.style.transform = `translate(${x}px, ${y}px) scale(${scale})`;
            }
        }

        // =================== TOKEN MARKERS (Updated) ===================
        addPhoenixTokenMarkers() {
            console.log('💎 Adding Phoenix token markers...');
            try {
                const markersContainer = document.getElementById('phoenixTokenMarkers');
                if (!markersContainer) return;

                markersContainer.innerHTML = '';
                markersContainer.style.pointerEvents = 'none';

                // Phoenix-specific positions
                const phoenixPositions = {
                    1: { x: 49, y: 49 },     // Phoenix Plaza Central
                    2: { x: 48, y: 51 },     // Heritage Square
                    3: { x: 51, y: 48 },     // Roosevelt Row Art Walk
                    4: { x: 45, y: 55 },     // Chase Field
                    5: { x: 52, y: 47 },     // Phoenix Convention Center
                    6: { x: 35, y: 70 },     // Sky Harbor Airport
                    7: { x: 75, y: 25 },     // Scottsdale Quarter
                    8: { x: 55, y: 65 },     // Desert Botanical Garden
                    9: { x: 65, y: 20 },     // Camelback Mountain
                    10: { x: 52, y: 68 }     // Tempe Town Lake
                };

                this.emberTokens.forEach((token) => {
                    if (!this.isTokenCollected(token.id)) {
                        const position = phoenixPositions[token.id] || { x: 50, y: 50 };

                        const marker = document.createElement('div');
                        marker.className = `phoenix-token-marker ${token.tier} ${token.collectable ? 'collectable' : 'distant'}`;
                        marker.style.cssText = `
                            position: absolute;
                            left: ${position.x}%;
                            top: ${position.y}%;
                            cursor: pointer;
                            pointer-events: auto !important;
                            display: flex;
                            flex-direction: column;
                            align-items: center;
                            transition: all 0.4s ease;
                            z-index: ${token.collectable ? '125' : '120'};
                            transform: translate(-50%, -50%);
                            touch-action: manipulation;
                            -webkit-tap-highlight-color: transparent;
                            user-select: none;
                            will-change: transform;
                        `;
                        marker.dataset.tokenId = token.id;

                        // Token coin visual
                        const coinDiv = document.createElement('div');
                        coinDiv.className = `token-marker-coin ${token.collectable ? 'collectable' : ''}`;
                        
                        // Token image
                        const tokenImage = document.createElement('img');
                        tokenImage.src = '../images/VPEmberCoin.PNG';
                        tokenImage.alt = 'Ember Coin';
                        tokenImage.className = 'token-marker-image';
                        tokenImage.onerror = function() {
                            this.style.display = 'none';
                            coinDiv.textContent = '💎';
                            coinDiv.style.fontSize = '24px';
                            coinDiv.style.color = '#f0a500';
                        };

                        coinDiv.appendChild(tokenImage);

                        // Location label (sponsor location only)
                        const locationLabel = document.createElement('div');
                        locationLabel.className = 'token-location-label';
                        locationLabel.textContent = token.location;

                        // AR indicator for collectable tokens
                        if (token.collectable) {
                            const arIndicator = document.createElement('div');
                            arIndicator.className = 'token-ar-indicator';
                            arIndicator.textContent = '📱';
                            coinDiv.appendChild(arIndicator);
                        }

                        marker.appendChild(coinDiv);
                        marker.appendChild(locationLabel);

                        // Enhanced click handler
                        const handleTokenInteraction = (e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            
                            console.log('🎯 Token clicked:', token.location);
                            
                            // Visual feedback
                            marker.style.transform = 'translate(-50%, -50%) scale(1.1)';
                            marker.style.zIndex = '150';
                            
                            setTimeout(() => {
                                marker.style.transform = 'translate(-50%, -50%) scale(1)';
                                marker.style.zIndex = token.collectable ? '125' : '120';
                            }, 300);
                            
                            this.showNavigationModal(token);
                            
                            if (navigator.vibrate) {
                                navigator.vibrate(token.collectable ? [50, 20, 50] : [30]);
                            }
                        };

                        marker.addEventListener('click', handleTokenInteraction, { passive: false });
                        marker.addEventListener('touchend', handleTokenInteraction, { passive: false });

                        markersContainer.appendChild(marker);
                    }
                });

                console.log('✅ Token markers added');
                
            } catch (error) {
                console.error('❌ Token markers error:', error);
            }
        }

        // =================== AR SYSTEM (Enhanced) ===================
        async startARMode() {
            console.log('📱 Starting AR Mode...');
            try {
                // Only request camera once per session
                if (!this.sessionCameraRequested) {
                    this.sessionCameraRequested = true;
                    
                    try {
                        this.cameraStream = await navigator.mediaDevices.getUserMedia({
                            video: { 
                                facingMode: 'environment',
                                width: { ideal: 1920 },
                                height: { ideal: 1080 }
                            }
                        });
                        
                        this.cameraAccessGranted = true;
                        console.log('✅ Camera access granted');
                    } catch (cameraError) {
                        console.error('❌ Camera access denied:', cameraError);
                        alert('Camera access is required for AR mode. Please allow camera access and try again.');
                        this.switchMode('map');
                        return;
                    }
                }

                const video = document.getElementById('video');
                const canvas = document.getElementById('canvas');
                
                if (video && this.cameraStream) {
                    video.srcObject = this.cameraStream;
                    video.style.display = 'block';
                    if (canvas) canvas.style.display = 'block';
                }

                // Show AR Hunt Module and auto-hide after 3 seconds
                this.showARHuntModule();

                // Create AR coins for all tokens based on current adventure
                this.createARCoins();
                
                console.log('✅ AR mode started');
                
            } catch (error) {
                console.error('❌ AR mode error:', error);
                this.switchMode('map');
            }
        }

        showARHuntModule() {
            const module = document.getElementById('arHuntModule');
            if (module) {
                module.style.display = 'flex';
                
                // Auto-hide after 3 seconds
                if (this.arHuntModuleTimer) {
                    clearTimeout(this.arHuntModuleTimer);
                }
                
                this.arHuntModuleTimer = setTimeout(() => {
                    module.classList.add('auto-hide');
                    setTimeout(() => {
                        module.style.display = 'none';
                        module.classList.remove('auto-hide');
                    }, 500);
                }, 3000);
            }
        }

        createARCoins() {
            console.log('🪙 Creating AR coins...');
            
            const container = document.getElementById('arCoinsContainer');
            if (!container) return;

            container.innerHTML = '';

            // Show all tokens for current adventure
            const adventureTokens = this.emberTokens.filter(token => !this.isTokenCollected(token.id));

            adventureTokens.forEach((token, index) => {
                const coin = document.createElement('div');
                coin.className = `ar-coin ${token.collectable ? 'near' : 'far'}`;
                
                // Position coins based on distance (closer = larger, farther = smaller)
                const distance = token.distance || 100;
                const isNear = distance <= 10;
                
                // Positioning logic - spread coins around screen based on location
                const positions = [
                    { x: 20, y: 30 }, { x: 80, y: 25 }, { x: 15, y: 70 },
                    { x: 85, y: 65 }, { x: 50, y: 20 }, { x: 30, y: 85 },
                    { x: 70, y: 80 }, { x: 10, y: 50 }, { x: 90, y: 45 },
                    { x: 60, y: 60 }
                ];
                
                const pos = positions[index % positions.length];
                
                coin.style.cssText = `
                    position: absolute;
                    left: ${pos.x}%;
                    top: ${pos.y}%;
                    z-index: ${isNear ? 160 : 155};
                `;
                
                const coinContent = document.createElement('div');
                coinContent.className = 'ar-coin-content';
                
                const coinVisual = document.createElement('div');
                coinVisual.className = 'ar-coin-visual';
                
                const coinImage = document.createElement('img');
                coinImage.src = '../images/VPEmberCoin.PNG';
                coinImage.alt = 'AR Ember Coin';
                coinImage.className = 'ar-coin-image';
                coinImage.onerror = function() {
                    this.style.display = 'none';
                    coinVisual.textContent = '💎';
                    coinVisual.style.fontSize = '32px';
                    coinVisual.style.color = '#f0a500';
                };
                
                coinVisual.appendChild(coinImage);
                coinContent.appendChild(coinVisual);
                coin.appendChild(coinContent);
                
                // Add subtle animations
                coinVisual.style.animation = `arCoinFloat ${3 + (index * 0.2)}s ease-in-out infinite`;
                
                // Click handler for AR coin collection
                coin.addEventListener('click', (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    
                    this.collectARToken(token);
                    
                    if (navigator.vibrate) {
                        navigator.vibrate([100, 50, 100]);
                    }
                });
                
                container.appendChild(coin);
            });
            
            console.log(`✅ Created ${adventureTokens.length} AR coins`);
        }

        collectARToken(token) {
            console.log('📱 Collecting AR token:', token.location);
            
            // Show token discovery modal
            this.currentDiscoveredToken = token;
            this.showTokenDiscovery(token);
            
            // Remove the AR coin
            const coins = document.querySelectorAll('.ar-coin');
            coins.forEach(coin => {
                const rect = coin.getBoundingClientRect();
                if (rect.width > 0) { // Simple check to see if this coin was clicked
                    coin.style.animation = 'none';
                    coin.style.transform = 'scale(0)';
                    coin.style.opacity = '0';
                    setTimeout(() => {
                        if (coin.parentNode) coin.parentNode.removeChild(coin);
                    }, 300);
                }
            });
        }

        stopARMode() {
            console.log('📱 Stopping AR mode...');
            try {
                const video = document.getElementById('video');
                const canvas = document.getElementById('canvas');
                const arContainer = document.getElementById('arCoinsContainer');
                
                if (video) video.style.display = 'none';
                if (canvas) canvas.style.display = 'none';
                if (arContainer) arContainer.innerHTML = '';
                
                // Clear AR Hunt Module timer
                if (this.arHuntModuleTimer) {
                    clearTimeout(this.arHuntModuleTimer);
                    this.arHuntModuleTimer = null;
                }
                
                const module = document.getElementById('arHuntModule');
                if (module) {
                    module.style.display = 'none';
                    module.classList.remove('auto-hide');
                }
                
                console.log('✅ AR mode stopped');
            } catch (error) {
                console.error('❌ AR stop error:', error);
            }
        }

        // =================== AIRDROP SYSTEM (Once per session) ===================
        startAirdropTimer() {
            // Only show airdrop once per session with delay to simulate surprise
            if (this.airdropShowCount === 0) {
                const delay = (8 + Math.random() * 4) * 1000; // 8-12 seconds delay
                
                this.airdropTimer = setTimeout(() => {
                    this.showAirdropNotification();
                }, delay);
                
                console.log(`🪂 Airdrop scheduled for ${Math.round(delay/1000)} seconds`);
            }
        }

        showAirdropNotification() {
            if (this.airdropShown || this.airdropShowCount > 0) return;
            
            // Only show on vault/rewards screens
            if (this.currentMode !== 'vault' && this.currentMode !== 'rewards') return;
            
            const notification = document.getElementById('airdropNotification');
            if (!notification) return;

            console.log('🪂 Showing airdrop notification');
            
            // Random airdrop values
            const airdropValues = [250, 500, 750];
            const randomValue = airdropValues[Math.floor(Math.random() * airdropValues.length)];

            this.pendingAirdropValue = randomValue;
            this.airdropShown = true;
            this.airdropShowCount++;

            // Update notification content
            const amountEl = document.getElementById('airdropAmount');
            if (amountEl) amountEl.textContent = `${randomValue} $Ember`;
            
            notification.classList.add('show');
            
            // Haptic feedback
            if (navigator.vibrate) {
                navigator.vibrate([100, 50, 100]);
            }
            
            // Auto-hide after 10 seconds
            setTimeout(() => {
                this.hideAirdropNotification();
            }, 10000);
        }

        hideAirdropNotification() {
            const notification = document.getElementById('airdropNotification');
            if (notification) {
                notification.classList.remove('show');
            }
        }

        claimAirdrop() {
            if (!this.pendingAirdropValue) return;
            
            console.log('🪂 Claiming airdrop:', this.pendingAirdropValue);
            
            // Add airdrop tokens to vault
            this.totalTokenValue += this.pendingAirdropValue;
            this.collectedTokens.push({
                id: Date.now(),
                value: this.pendingAirdropValue,
                location: 'Airdrop Bonus',
                sponsor: 'Vault Phoenix',
                tier: 'bonus',
                collectedAt: new Date().toISOString(),
                isAirdrop: true
            });
            
            this.saveCollectedTokens();
            this.updateVaultStats();
            this.hideAirdropNotification();
            
            // Show success message
            this.showAirdropSuccess(this.pendingAirdropValue);
            this.pendingAirdropValue = 0;
        }

        showAirdropSuccess(value) {
            const success = document.createElement('div');
            success.style.cssText = `
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                background: linear-gradient(135deg, rgba(76, 175, 80, 0.95), rgba(67, 160, 71, 0.95));
                color: white;
                padding: 32px;
                border-radius: 20px;
                font-size: 20px;
                font-weight: 800;
                z-index: 400;
                box-shadow: 0 16px 40px rgba(76, 175, 80, 0.6);
                text-align: center;
                backdrop-filter: blur(20px);
                border: 3px solid rgba(255, 255, 255, 0.3);
            `;
            success.innerHTML = `
                <div style="font-size: 48px; margin-bottom: 16px;">🪂</div>
                <div>Airdrop Claimed!</div>
                <div style="font-size: 18px; margin-top: 12px; opacity: 0.9;">+${value} $Ember</div>
                <div style="font-size: 14px; margin-top: 8px; opacity: 0.8;">Added to your vault</div>
            `;

            document.body.appendChild(success);

            setTimeout(() => {
                if (document.body.contains(success)) {
                    document.body.removeChild(success);
                }
            }, 3000);

            if (navigator.vibrate) {
                navigator.vibrate([100, 50, 100, 50, 200]);
            }
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
                const views = ['map', 'vaultView', 'rewardsView'];
                views.forEach(viewId => {
                    const view = document.getElementById(viewId);
                    if (view) view.style.display = 'none';
                });
                
                // Show appropriate view
                switch (mode) {
                    case 'map':
                        const mapView = document.getElementById('map');
                        if (mapView) mapView.style.display = 'block';
                        this.hideAirdropNotification();
                        this.stopARMode();
                        this.showTokenModule();
                        break;
                    case 'vault':
                        const vaultView = document.getElementById('vaultView');
                        if (vaultView) vaultView.style.display = 'block';
                        this.updateVaultStats();
                        this.stopARMode();
                        this.showTokenModule();
                        break;
                    case 'rewards':
                        const rewardsView = document.getElementById('rewardsView');
                        if (rewardsView) rewardsView.style.display = 'block';
                        this.updateRewardsDisplay();
                        this.renderChallenges();
                        this.stopARMode();
                        this.showTokenModule();
                        break;
                    case 'ar':
                        const mapViewAR = document.getElementById('map');
                        if (mapViewAR) mapViewAR.style.display = 'block';
                        this.startARMode();
                        this.hideAirdropNotification();
                        this.showTokenModule();
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
            if (activeTab) activeTab.classList.add('active');
        }

        updateMenuItems() {
            document.querySelectorAll('.menu-item').forEach(item => {
                item.classList.remove('active');
            });
            
            const activeItem = document.querySelector(`[data-mode="${this.currentMode}"]`);
            if (activeItem) activeItem.classList.add('active');
        }

        showTokenModule() {
            const tokenModule = document.getElementById('tokenLocationsModule');
            if (tokenModule) {
                tokenModule.style.display = 'block';
            }
        }

        // =================== GAME FEATURES ===================
        startGameFeatures() {
            console.log('🎮 Starting game features...');
            this.updateLocationDisplay();
            this.updateNearbyTokens();
            this.updateTokenCounts();
            this.updateVaultStats();
            this.updateRewardsDisplay();
        }

        updateLocationDisplay() {
            try {
                const elements = [
                    { id: 'currentLat', value: this.userLat.toFixed(4) },
                    { id: 'currentLng', value: this.userLng.toFixed(4) }
                ];
                
                elements.forEach(({id, value}) => {
                    const el = document.getElementById(id);
                    if (el) el.textContent = value;
                });
            } catch (error) {
                console.error('❌ Location display error:', error);
            }
        }

        updateNearbyTokens() {
            console.log('🔍 Updating nearby tokens...');
            try {
                const availableTokens = this.emberTokens.filter(token => !this.isTokenCollected(token.id));
                const collectableTokens = availableTokens.filter(token => token.collectable);
                
                // Update handle counts
                const nearbyCountEl = document.getElementById('nearbyTokenCount');
                if (nearbyCountEl) {
                    if (collectableTokens.length > 0) {
                        nearbyCountEl.textContent = `${collectableTokens.length} ready to collect`;
                    } else {
                        nearbyCountEl.textContent = `Explore locations`;
                    }
                }

                // Update token list
                const tokensList = document.getElementById('tokenLocationsList');
                if (tokensList) {
                    tokensList.innerHTML = availableTokens.map((token) => `
                        <div class="token-location-item ${token.collectable ? 'collectable-token' : ''}" 
                             data-token-id="${token.id}">
                            <div class="token-location-icon ${token.collectable ? 'collectable-icon' : ''}">
                                <img src="../images/VPEmberCoin.PNG" alt="Ember Coin" onerror="this.textContent='💎'">
                            </div>
                            <div class="token-location-info">
                                <div class="token-location-name">${token.location}</div>
                                <div class="token-location-distance">
                                    ${token.distance}m away • ${token.collectable ? '📱 AR Ready' : '🗺️ Navigate'}
                                </div>
                                <div class="token-sponsor">${token.sponsor}</div>
                            </div>
                            <div class="token-location-value ${token.collectable ? 'collectable-value' : ''}">${token.value}</div>
                        </div>
                    `).join('');

                    // Add click handlers
                    tokensList.querySelectorAll('.token-location-item').forEach(item => {
                        const itemClickHandler = (e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            
                            const tokenId = parseInt(item.dataset.tokenId);
                            const token = this.emberTokens.find(t => t.id === tokenId);
                            if (token) {
                                item.style.transform = 'translateY(-4px) scale(1.02)';
                                setTimeout(() => {
                                    item.style.transform = '';
                                }, 200);
                                
                                this.showNavigationModal(token);
                                if (navigator.vibrate) navigator.vibrate([40, 15, 40]);
                            }
                        };

                        item.addEventListener('click', itemClickHandler, { passive: false });
                        item.addEventListener('touchend', itemClickHandler, { passive: false });
                    });
                }
            } catch (error) {
                console.error('❌ Nearby tokens error:', error);
            }
        }

        updateTokenCounts() {
            try {
                const availableCount = this.emberTokens.filter(token => !this.isTokenCollected(token.id)).length;
                const collectableCount = this.emberTokens.filter(token => !this.isTokenCollected(token.id) && token.collectable).length;
                
                const elements = [
                    { id: 'availableTokenCount', text: `${availableCount} locations available` },
                    { id: 'totalAvailable', text: `${availableCount} total available` }
                ];
                
                elements.forEach(({id, text}) => {
                    const el = document.getElementById(id);
                    if (el) el.textContent = text;
                });

                // Update AR badge in menu
                const nearbyTokensEl = document.getElementById('nearbyTokens');
                if (nearbyTokensEl) {
                    if (collectableCount > 0) {
                        nearbyTokensEl.textContent = `${collectableCount} ready`;
                    } else {
                        nearbyTokensEl.textContent = 'Get closer';
                    }
                }
            } catch (error) {
                console.error('❌ Token counts error:', error);
            }
        }

        // =================== NAVIGATION MODAL ===================
        showNavigationModal(token) {
            console.log('🗺️ Showing navigation modal for:', token.location);
            try {
                this.currentNavigationToken = token;
                
                const modal = document.getElementById('navigationModal');
                const tokenName = document.getElementById('navTokenName');
                const distance = document.getElementById('navDistance');
                const emberAmount = document.getElementById('navEmberAmount');
                const walkTime = document.getElementById('navWalkTime');
                const driveTime = document.getElementById('navDriveTime');
                const arOption = document.getElementById('navAR');
                
                if (tokenName) tokenName.textContent = token.location;
                if (distance) distance.textContent = `${token.distance}m away`;
                if (emberAmount) emberAmount.textContent = `${token.value} $Ember`;
                
                const walkMinutes = Math.max(1, Math.round(token.distance / 80));
                const driveMinutes = Math.max(1, Math.round(token.distance / 300));
                
                if (walkTime) walkTime.textContent = `~${walkMinutes} min`;
                if (driveTime) driveTime.textContent = `~${driveMinutes} min`;
                
                // Show AR option ONLY for collectable tokens
                if (arOption) {
                    if (token.collectable) {
                        arOption.style.display = 'flex';
                        arOption.classList.add('ar-option');
                    } else {
                        arOption.style.display = 'none';
                    }
                }
                
                if (modal) modal.classList.add('show');
                
            } catch (error) {
                console.error('❌ Navigation modal error:', error);
            }
        }

        hideNavigationModal() {
            const modal = document.getElementById('navigationModal');
            if (modal) modal.classList.remove('show');
            this.currentNavigationToken = null;
        }

        openMapsNavigation(mode) {
            if (!this.currentNavigationToken) return;
            
            const token = this.currentNavigationToken;
            
            if (mode === 'ar') {
                this.switchMode('ar');
                this.hideNavigationModal();
                return;
            }
            
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

        // =================== TOKEN DISCOVERY MODAL ===================
        showTokenDiscovery(token) {
            try {
                const elements = {
                    amount: document.getElementById('discoveredTokenAmount'),
                    usdValue: document.getElementById('discoveredTokenUSD'),
                    location: document.getElementById('discoveredTokenLocation'),
                    badge: document.getElementById('tokenAmountBadge'),
                    discovery: document.getElementById('tokenDiscovery'),
                    sponsorName: document.getElementById('sponsorDetailsName'),
                    sponsorDescription: document.getElementById('sponsorDetailsDescription')
                };
                
                if (elements.amount) elements.amount.textContent = `${token.value} $Ember`;
                if (elements.usdValue) elements.usdValue.textContent = `~${(token.value * 0.001).toFixed(2)} USD`;
                if (elements.location) elements.location.textContent = token.location;
                if (elements.badge) elements.badge.textContent = `${token.value} $Ember`;
                
                // Update sponsor details
                if (elements.sponsorName) elements.sponsorName.textContent = token.sponsor || 'Mystery Sponsor';
                if (elements.sponsorDescription) elements.sponsorDescription.textContent = token.description || token.message || 'Amazing rewards await!';
                
                // Update sponsor message
                const sponsorContainer = document.querySelector('.sponsor-message');
                if (sponsorContainer && token.sponsor) {
                    const sponsorTitle = sponsorContainer.querySelector('.sponsor-title');
                    const sponsorText = sponsorContainer.querySelector('.sponsor-text');
                    
                    if (sponsorTitle) sponsorTitle.textContent = `Sponsored by ${token.sponsor}`;
                    if (sponsorText) sponsorText.textContent = token.message || 'Thank you for exploring Phoenix!';
                }
                
                this.currentDiscoveredToken = token;
                this.isShowingSponsorDetails = false;
                
                // Show front view, hide back view
                const frontView = document.getElementById('sponsorInfoFront');
                const backView = document.getElementById('sponsorInfoBack');
                if (frontView) frontView.style.display = 'block';
                if (backView) backView.style.display = 'none';
                
                if (elements.discovery) elements.discovery.classList.add('show');
                
                console.log('🎴 Token discovery shown:', token.location);
            } catch (error) {
                console.error('❌ Token discovery show error:', error);
            }
        }

        showSponsorDetails() {
            try {
                if (!this.currentDiscoveredToken || this.isShowingSponsorDetails) return;
                
                this.isShowingSponsorDetails = true;
                
                const frontView = document.getElementById('sponsorInfoFront');
                const backView = document.getElementById('sponsorInfoBack');
                
                if (frontView && backView) {
                    frontView.style.display = 'none';
                    backView.style.display = 'block';
                }
                
                console.log('ℹ️ Showing sponsor details');
            } catch (error) {
                console.error('❌ Sponsor details show error:', error);
            }
        }

        hideSponsorDetails() {
            try {
                if (!this.isShowingSponsorDetails) return;
                
                this.isShowingSponsorDetails = false;
                
                const frontView = document.getElementById('sponsorInfoFront');
                const backView = document.getElementById('sponsorInfoBack');
                
                if (frontView && backView) {
                    frontView.style.display = 'block';
                    backView.style.display = 'none';
                }
                
                console.log('⬅️ Hiding sponsor details');
            } catch (error) {
                console.error('❌ Sponsor details hide error:', error);
            }
        }

        collectToken() {
            try {
                if (this.currentDiscoveredToken) {
                    // Add timestamp and collection info
                    const collectedToken = {
                        ...this.currentDiscoveredToken,
                        collectedAt: new Date().toISOString(),
                        collectionMethod: this.currentMode === 'ar' ? 'AR Hunt' : 'Map Collection',
                        name: `${this.currentDiscoveredToken.location} Token`
                    };
                    
                    this.collectedTokens.push(collectedToken);
                    this.totalTokenValue += this.currentDiscoveredToken.value;
                    this.saveCollectedTokens();
                    
                    console.log('✅ Token collected:', this.currentDiscoveredToken.location);
                    
                    // Update challenge progress
                    if (this.currentMode === 'ar') {
                        this.updateChallengeProgress('ar_token_collected');
                    } else {
                        this.updateChallengeProgress('token_collected');
                    }
                    this.updateChallengeProgress('location_visited');
                    
                    this.updateTokenCounts();
                    this.updateVaultStats();
                    this.updateNearbyTokens();
                    
                    this.removeTokenMarker(this.currentDiscoveredToken.id);
                    
                    this.hideTokenDiscovery();
                    this.currentDiscoveredToken = null;
                    this.isShowingSponsorDetails = false;
                    
                    // Show collection success
                    this.showCollectionSuccess(collectedToken);
                    
                    // Switch back to map after collection
                    setTimeout(() => {
                        this.switchMode('map');
                    }, 3000);
                }
            } catch (error) {
                console.error('❌ Token collect error:', error);
            }
        }

        removeTokenMarker(tokenId) {
            const marker = document.querySelector(`[data-token-id="${tokenId}"]`);
            if (marker) {
                marker.remove();
            }
        }

        showCollectionSuccess(token) {
            const success = document.createElement('div');
            success.style.cssText = `
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                background: linear-gradient(135deg, rgba(76, 175, 80, 0.95), rgba(67, 160, 71, 0.95));
                color: white;
                padding: 32px;
                border-radius: 20px;
                font-size: 20px;
                font-weight: 800;
                z-index: 400;
                box-shadow: 0 16px 40px rgba(76, 175, 80, 0.6);
                text-align: center;
                backdrop-filter: blur(20px);
                border: 3px solid rgba(255, 255, 255, 0.3);
            `;
            success.innerHTML = `
                <div style="font-size: 48px; margin-bottom: 16px;">🎉</div>
                <div>$Ember Token Collected!</div>
                <div style="font-size: 18px; margin-top: 12px; opacity: 0.9;">+${token.value} $Ember</div>
                <div style="font-size: 14px; margin-top: 8px; opacity: 0.8;">${token.location}</div>
            `;

            document.body.appendChild(success);

            setTimeout(() => {
                if (document.body.contains(success)) {
                    document.body.removeChild(success);
                }
            }, 3000);

            if (navigator.vibrate) {
                navigator.vibrate([100, 50, 100, 50, 200, 50, 300]);
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

        // =================== CHALLENGES & REWARDS SYSTEM ===================
        loadChallengeProgress() {
            try {
                const saved = localStorage.getItem('vaultPhoenix_challenges');
                if (saved) {
                    const savedChallenges = JSON.parse(saved);
                    this.challenges = { ...this.challenges, ...savedChallenges };
                }
                
                const savedRewards = localStorage.getItem('vaultPhoenix_earnedRewards');
                if (savedRewards) {
                    this.earnedRewards = JSON.parse(savedRewards);
                }
                
                console.log('💎 Loaded challenge progress');
            } catch (error) {
                console.error('❌ Challenge load error:', error);
            }
        }

        saveChallengeProgress() {
            try {
                localStorage.setItem('vaultPhoenix_challenges', JSON.stringify(this.challenges));
                localStorage.setItem('vaultPhoenix_earnedRewards', JSON.stringify(this.earnedRewards));
            } catch (error) {
                console.error('❌ Challenge save error:', error);
            }
        }

        startChallengeTimers() {
            // Update daily timer
            setInterval(() => {
                const now = new Date();
                const tomorrow = new Date(now);
                tomorrow.setDate(tomorrow.getDate() + 1);
                tomorrow.setHours(0, 0, 0, 0);
                
                const timeLeft = tomorrow - now;
                const hours = Math.floor(timeLeft / (1000 * 60 * 60));
                const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
                
                const timerEl = document.getElementById('dailyTimer');
                if (timerEl) {
                    timerEl.textContent = `Resets in ${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
                }
            }, 1000);

            // Update weekly timer  
            setInterval(() => {
                const now = new Date();
                const nextWeek = new Date(now);
                nextWeek.setDate(nextWeek.getDate() + (7 - now.getDay()));
                nextWeek.setHours(0, 0, 0, 0);
                
                const timeLeft = nextWeek - now;
                const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
                
                const weeklyTimerEl = document.getElementById('weeklyTimer');
                if (weeklyTimerEl) {
                    weeklyTimerEl.textContent = `Resets in ${days} day${days !== 1 ? 's' : ''}`;
                }
            }, 60000); // Update every minute
        }

        updateChallengeProgress(type, data = {}) {
            console.log('🎯 Updating challenge progress:', type, data);
            
            // Update daily challenges
            this.challenges.daily.forEach(challenge => {
                if (challenge.completed) return;
                
                switch (challenge.type) {
                    case 'collect':
                        if (type === 'token_collected') {
                            challenge.progress = Math.min(challenge.progress + 1, challenge.target);
                            if (challenge.progress >= challenge.target) {
                                challenge.completed = true;
                                this.showChallengeComplete(challenge);
                            }
                        }
                        break;
                    case 'ar_collect':
                        if (type === 'ar_token_collected') {
                            challenge.progress = Math.min(challenge.progress + 1, challenge.target);
                            if (challenge.progress >= challenge.target) {
                                challenge.completed = true;
                                this.showChallengeComplete(challenge);
                            }
                        }
                        break;
                }
            });

            // Update weekly challenges
            this.challenges.weekly.forEach(challenge => {
                if (challenge.completed) return;
                
                switch (challenge.type) {
                    case 'locations':
                        if (type === 'location_visited') {
                            const uniqueLocations = new Set(this.collectedTokens.map(t => t.location)).size;
                            challenge.progress = Math.min(uniqueLocations, challenge.target);
                            if (challenge.progress >= challenge.target) {
                                challenge.completed = true;
                                this.showChallengeComplete(challenge);
                            }
                        }
                        break;
                    case 'streak':
                        // Streak logic would be implemented with daily login tracking
                        break;
                }
            });

            this.saveChallengeProgress();
            this.updateRewardsDisplay();
        }

        showChallengeComplete(challenge) {
            const notification = document.createElement('div');
            notification.style.cssText = `
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                background: linear-gradient(135deg, rgba(33, 150, 243, 0.95), rgba(156, 39, 176, 0.9));
                color: white;
                padding: 32px;
                border-radius: 20px;
                font-size: 18px;
                font-weight: 800;
                z-index: 400;
                box-shadow: 0 16px 40px rgba(33, 150, 243, 0.6);
                text-align: center;
                backdrop-filter: blur(20px);
                border: 3px solid rgba(255, 255, 255, 0.3);
                max-width: 320px;
                width: 90%;
            `;
            notification.innerHTML = `
                <div style="font-size: 48px; margin-bottom: 16px;">${challenge.icon}</div>
                <div>Challenge Complete!</div>
                <div style="font-size: 16px; margin-top: 12px; opacity: 0.9;">${challenge.title}</div>
                <div style="font-size: 14px; margin-top: 8px; opacity: 0.8;">${challenge.reward} available</div>
            `;

            document.body.appendChild(notification);

            setTimeout(() => {
                if (document.body.contains(notification)) {
                    document.body.removeChild(notification);
                }
            }, 4000);

            if (navigator.vibrate) {
                navigator.vibrate([100, 50, 100, 50, 200]);
            }
        }

        updateRewardsDisplay() {
            // Update rewards badge in menu
            const rewardsBadge = document.getElementById('rewardsBadge');
            if (rewardsBadge) {
                const activeRewards = this.earnedRewards.filter(r => r.status === 'available').length;
                const completedChallenges = [...this.challenges.daily, ...this.challenges.weekly].filter(c => c.completed && !c.claimed).length;
                const total = activeRewards + completedChallenges;
                rewardsBadge.textContent = total > 0 ? `${total} Ready` : '2 Active';
            }

            // Update rewards count
            const rewardsCount = document.getElementById('rewardsCount');
            if (rewardsCount) {
                const availableCount = this.earnedRewards.filter(r => r.status === 'available').length;
                rewardsCount.textContent = `${availableCount} Ready`;
            }
        }

        renderChallenges() {
            this.renderDailyChallenges();
            this.renderWeeklyChallenges();
            this.renderLocationChallenges();
            this.renderEarnedRewards();
        }

        renderDailyChallenges() {
            const container = document.getElementById('dailyChallenges');
            if (!container) return;

            container.innerHTML = this.challenges.daily.map(challenge => {
                const progressPercent = Math.round((challenge.progress / challenge.target) * 100);
                const isCompleted = challenge.completed;

                return `
                    <div class="challenge-card daily-challenge" data-challenge-id="${challenge.id}">
                        <div class="challenge-header">
                            <div class="challenge-icon">${challenge.icon}</div>
                            <div class="challenge-progress">
                                <div class="progress-bar">
                                    <div class="progress-fill" style="width: ${progressPercent}%"></div>
                                </div>
                                <div class="progress-text">${isCompleted ? 'READY' : `${challenge.progress}/${challenge.target}`}</div>
                            </div>
                        </div>
                        <div class="challenge-info">
                            <div class="challenge-title">${challenge.title}</div>
                            <div class="challenge-description">${challenge.description}</div>
                            <div class="challenge-reward">
                                <span class="reward-icon">🎁</span>
                                <span>${challenge.reward}</span>
                            </div>
                        </div>
                        ${isCompleted ? `
                            <div style="text-align: center; color: #4CAF50; font-weight: 700; padding: 12px;">✅ Completed</div>
                        ` : ''}
                    </div>
                `;
            }).join('');
        }

        renderWeeklyChallenges() {
            const container = document.getElementById('weeklyChallenges');
            if (!container) return;

            container.innerHTML = this.challenges.weekly.map(challenge => {
                const progressPercent = Math.round((challenge.progress / challenge.target) * 100);

                return `
                    <div class="challenge-card weekly-challenge" data-challenge-id="${challenge.id}">
                        <div class="challenge-header">
                            <div class="challenge-icon">${challenge.icon}</div>
                            <div class="challenge-progress">
                                <div class="progress-bar">
                                    <div class="progress-fill" style="width: ${progressPercent}%"></div>
                                </div>
                                <div class="progress-text">${challenge.progress}/${challenge.target}</div>
                            </div>
                        </div>
                        <div class="challenge-info">
                            <div class="challenge-title">${challenge.title}</div>
                            <div class="challenge-description">${challenge.description}</div>
                            <div class="challenge-reward">
                                <span class="reward-icon">🏆</span>
                                <span>${challenge.reward}</span>
                            </div>
                        </div>
                    </div>
                `;
            }).join('');
        }

        renderLocationChallenges() {
            const container = document.getElementById('locationChallenges');
            if (!container) return;

            container.innerHTML = this.challenges.location.map(challenge => `
                <div class="challenge-card location-challenge" data-challenge-id="${challenge.id}">
                    <div class="challenge-sponsor">
                        <div class="sponsor-logo">${challenge.sponsorLogo}</div>
                        <div class="sponsor-name">${challenge.sponsor}</div>
                    </div>
                    <div class="challenge-info">
                        <div class="challenge-title">${challenge.title}</div>
                        <div class="challenge-description">${challenge.description}</div>
                        <div class="challenge-reward">
                            <span class="reward-icon">${challenge.rewardIcon}</span>
                            <span>${challenge.reward}</span>
                        </div>
                    </div>
                    <div class="challenge-actions">
                        ${challenge.location ? `
                            <button class="challenge-navigate-btn" data-location="${challenge.location}">Navigate</button>
                        ` : ''}
                        ${challenge.hasQR ? `
                            <button class="challenge-qr-btn" data-challenge="${challenge.id}">QR Redeem</button>
                        ` : ''}
                    </div>
                </div>
            `).join('');

            // Add event listeners
            container.querySelectorAll('.challenge-navigate-btn').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    e.preventDefault();
                    const location = btn.dataset.location;
                    // Find token at this location and show navigation
                    const token = this.emberTokens.find(t => t.location.toLowerCase().includes(location.replace('-', ' ')));
                    if (token) {
                        this.showNavigationModal(token);
                    }
                });
            });

            container.querySelectorAll('.challenge-qr-btn').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    e.preventDefault();
                    const challengeId = btn.dataset.challenge;
                    this.showQRCode('challenge', { challengeId });
                });
            });
        }

        renderEarnedRewards() {
            const container = document.getElementById('earnedRewardsList');
            if (!container) return;

            container.innerHTML = this.earnedRewards.map(reward => `
                <div class="reward-item ${reward.status}" data-reward-id="${reward.id}">
                    <div class="reward-icon">${reward.icon}</div>
                    <div class="reward-info">
                        <div class="reward-title">${reward.title}</div>
                        <div class="reward-description">${reward.description}</div>
                        <div class="reward-value">${reward.value}</div>
                    </div>
                    <div class="reward-actions">
                        ${reward.status === 'available' ? `
                            <button class="reward-qr-btn" data-reward="${reward.qrData}">Show QR</button>
                        ` : ''}
                        <div class="reward-status">🔄 Ready to use</div>
                    </div>
                </div>
            `).join('');

            // Add event listeners
            container.querySelectorAll('.reward-qr-btn').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    e.preventDefault();
                    const rewardId = btn.dataset.reward;
                    this.showQRCode('reward', { rewardId });
                });
            });
        }

        // =================== QR CODE SYSTEM ===================
        showQRCode(context, data = {}) {
            console.log('📱 Showing QR code for:', context, data);
            
            this.currentQRContext = { context, data };
            
            const modal = document.getElementById('qrModal');
            const title = document.getElementById('qrModalTitle');
            const content = document.getElementById('qrCodeContent');
            const instructions = document.getElementById('qrInstructions');
            const tokenAmount = document.getElementById('qrTokenAmount');
            const tokenValue = document.getElementById('qrTokenValue');
            
            if (!modal) return;
            
            // Update content based on context
            switch (context) {
                case 'payment':
                    if (title) title.textContent = '🔥 Payment QR Code';
                    if (content) content.innerHTML = `
                        <div style="font-size: 48px; margin-bottom: 16px;">📱</div>
                        Payment QR Code<br>
                        <small>Scan at partner locations</small>
                    `;
                    if (instructions) instructions.textContent = 'Show this QR code at any Vault Phoenix partner location to pay with your $Ember tokens for real rewards and discounts!';
                    if (tokenAmount) tokenAmount.textContent = `${this.totalTokenValue} $Ember`;
                    if (tokenValue) tokenValue.textContent = `${(this.totalTokenValue * 0.001).toFixed(2)} USD`;
                    break;
                    
                case 'reward':
                    const reward = this.earnedRewards.find(r => r.qrData === data.rewardId);
                    if (title) title.textContent = `🎁 ${reward?.title || 'Reward'} QR`;
                    if (content) content.innerHTML = `
                        <div style="font-size: 48px; margin-bottom: 16px;">${reward?.icon || '🎫'}</div>
                        ${reward?.title || 'Reward'} QR Code<br>
                        <small>Show to merchant</small>
                    `;
                    if (instructions) instructions.textContent = `Show this QR code to redeem your ${reward?.title || 'reward'} at the participating location.`;
                    if (tokenAmount) tokenAmount.textContent = reward?.title || 'Reward';
                    if (tokenValue) tokenValue.textContent = reward?.value || 'Special Offer';
                    break;
                    
                case 'challenge':
                    if (title) title.textContent = '🎯 Challenge QR Code';
                    if (content) content.innerHTML = `
                        <div style="font-size: 48px; margin-bottom: 16px;">🎯</div>
                        Challenge QR Code<br>
                        <small>Scan at location to complete</small>
                    `;
                    if (instructions) instructions.textContent = 'Show this QR code at the challenge location to complete your mission and earn rewards!';
                    if (tokenAmount) tokenAmount.textContent = 'Challenge';
                    if (tokenValue) tokenValue.textContent = 'Mission Unlock';
                    break;
            }
            
            modal.classList.add('show');
        }

        hideQRCode() {
            const modal = document.getElementById('qrModal');
            if (modal) modal.classList.remove('show');
            this.currentQRContext = null;
        }

        // =================== VAULT SYSTEM ===================
        updateVaultStats() {
            try {
                const elements = [
                    { id: 'navEmberCount', value: this.totalTokenValue.toLocaleString() },
                    { id: 'menuEmberCount', value: this.totalTokenValue.toLocaleString() },
                    { id: 'vaultBalance', value: `${this.totalTokenValue.toLocaleString()} $Ember Tokens` },
                    { id: 'vaultUsdValue', value: `${(this.totalTokenValue * 0.001).toFixed(2)} USD` },
                    { id: 'totalCollected', value: this.collectedTokens.length },
                    { id: 'totalValue', value: `${(this.totalTokenValue * 0.001).toFixed(2)}` },
                    { id: 'locationsVisited', value: new Set(this.collectedTokens.map(t => t.location)).size }
                ];
                
                elements.forEach(({id, value}) => {
                    const el = document.getElementById(id);
                    if (el) el.textContent = value;
                });
                
                // Update last activity
                const lastActivityEl = document.getElementById('lastActivity');
                if (lastActivityEl && this.collectedTokens.length > 0) {
                    lastActivityEl.textContent = 'Today';
                }
                
                this.updateTokenHistory();
                
            } catch (error) {
                console.error('❌ Vault stats error:', error);
            }
        }

        updateTokenHistory() {
            try {
                const historyContainer = document.getElementById('tokenHistory');
                if (!historyContainer) return;
                
                if (this.collectedTokens.length === 0) {
                    historyContainer.innerHTML = `
                        <div class="history-placeholder">
                            <div class="history-placeholder-icon">🗺️</div>
                            <div class="history-placeholder-title">No Tokens Collected Yet</div>
                            <div class="history-placeholder-text">Start exploring to find $Ember tokens!</div>
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
                                <div class="history-subtitle">${token.isAirdrop ? 'Airdrop Bonus' : token.sponsor} • ${token.tier?.toUpperCase() || 'BONUS'}</div>
                            </div>
                            <div class="history-value">+${token.value}</div>
                        </div>
                    `).join('');
                }
            } catch (error) {
                console.error('❌ Token history error:', error);
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

        // =================== ENHANCED SWIPEABLE MODULE ===================
        setupSwipeableModule() {
            console.log('👆 Setting up enhanced swipeable module...');
            try {
                const handle = document.getElementById('swipeHandle');
                if (!handle) return;
                
                let startY = 0;
                let currentY = 0;
                let isDragging = false;

                const handleTouchStart = (e) => {
                    isDragging = true;
                    startY = e.touches ? e.touches[0].clientY : e.clientY;
                    currentY = startY;
                    e.preventDefault();
                };

                const handleTouchMove = (e) => {
                    if (!isDragging) return;
                    
                    currentY = e.touches ? e.touches[0].clientY : e.clientY;
                    const deltaY = startY - currentY;
                    
                    // Visual feedback during drag
                    const module = document.getElementById('tokenLocationsModule');
                    if (module && Math.abs(deltaY) > 10) {
                        const progress = Math.min(Math.abs(deltaY) / 100, 1);
                        module.style.opacity = 0.8 + (progress * 0.2);
                    }
                    
                    e.preventDefault();
                };

                const handleTouchEnd = (e) => {
                    if (!isDragging) return;
                    isDragging = false;
                    
                    const deltaY = startY - currentY;
                    const threshold = 60;
                    
                    if (Math.abs(deltaY) > threshold) {
                        if (deltaY > 0) {
                            this.expandModule();
                        } else {
                            this.collapseModule();
                        }
                    } else {
                        this.toggleModule();
                    }
                    
                    // Reset opacity
                    const module = document.getElementById('tokenLocationsModule');
                    if (module) {
                        module.style.opacity = '';
                    }
                    
                    e.preventDefault();
                };

                // Add event listeners
                handle.addEventListener('touchstart', handleTouchStart, { passive: false });
                handle.addEventListener('touchmove', handleTouchMove, { passive: false });
                handle.addEventListener('touchend', handleTouchEnd, { passive: false });
                handle.addEventListener('mousedown', handleTouchStart, { passive: false });
                handle.addEventListener('mousemove', handleTouchMove, { passive: false });
                handle.addEventListener('mouseup', handleTouchEnd, { passive: false });
                handle.addEventListener('click', () => this.toggleModule(), { passive: false });
                
                console.log('✅ Enhanced swipeable module setup complete');
            } catch (error) {
                console.error('❌ Swipeable module setup error:', error);
            }
        }

        toggleModule() {
            const module = document.getElementById('tokenLocationsModule');
            
            if (module) {
                if (module.classList.contains('expanded')) {
                    this.collapseModule();
                } else {
                    this.expandModule();
                }
            }
        }

        expandModule() {
            const module = document.getElementById('tokenLocationsModule');
            
            if (module) {
                module.classList.add('expanded');
                module.classList.remove('collapsed');
                this.moduleExpanded = true;
                
                if (navigator.vibrate) navigator.vibrate(40);
                console.log('📱 Module expanded');
            }
        }

        collapseModule() {
            const module = document.getElementById('tokenLocationsModule');
            
            if (module) {
                module.classList.remove('expanded');
                module.classList.add('collapsed');
                this.moduleExpanded = false;
                
                if (navigator.vibrate) navigator.vibrate(30);
                console.log('📱 Module collapsed');
            }
        }

        // =================== RESET GAME ===================
        resetGame() {
            console.log('🔄 Resetting game...');
            try {
                this.collectedTokens = [];
                this.totalTokenValue = 0;
                
                // Reset challenges
                this.challenges.daily.forEach(challenge => {
                    challenge.progress = 0;
                    challenge.completed = false;
                    challenge.claimed = false;
                });
                
                this.challenges.weekly.forEach(challenge => {
                    challenge.progress = 0;
                    challenge.completed = false;
                    challenge.claimed = false;
                });
                
                // Reset earned rewards
                this.earnedRewards.forEach(reward => {
                    reward.status = 'available';
                });
                
                localStorage.removeItem('vaultPhoenix_collectedTokens');
                localStorage.removeItem('vaultPhoenix_totalValue');
                localStorage.removeItem('vaultPhoenix_challenges');
                localStorage.removeItem('vaultPhoenix_earnedRewards');
                
                this.updateVaultStats();
                this.updateTokenCounts();
                this.updateNearbyTokens();
                this.updateRewardsDisplay();
                
                setTimeout(() => {
                    this.addPhoenixTokenMarkers();
                }, 500);
                
                // Reset airdrop system
                this.airdropShown = false;
                this.airdropShowCount = 0;
                this.startAirdropTimer();
                
                console.log('✅ Game reset successfully');
                
            } catch (error) {
                console.error('❌ Game reset error:', error);
            }
        }

        // =================== ENHANCED EVENT LISTENERS ===================
        setupEventListeners() {
            console.log('🎧 Setting up enhanced event listeners...');
            try {
                const addUniversalEventListener = (element, handler, options = { passive: false }) => {
                    if (!element) return;
                    
                    element.addEventListener('click', handler, options);
                    element.addEventListener('touchend', handler, options);
                };

                // Navigation tabs
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

                // Menu items with mode switching
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

                // Adventures overlay
                const adventuresOverlayBtn = document.getElementById('adventuresOverlay');
                if (adventuresOverlayBtn) {
                    addUniversalEventListener(adventuresOverlayBtn, (e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        const overlay = document.getElementById('adventuresOverlay');
                        if (overlay) overlay.classList.add('show');
                        this.hideMenu();
                    });
                }

                const adventuresClose = document.getElementById('adventuresClose');
                if (adventuresClose) {
                    addUniversalEventListener(adventuresClose, (e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        const overlay = document.getElementById('adventuresOverlay');
                        if (overlay) overlay.classList.remove('show');
                    });
                }

                // Menu toggle
                const menuToggle = document.getElementById('menuToggle');
                if (menuToggle) {
                    addUniversalEventListener(menuToggle, (e) => {
                        e.preventDefault();
                        e.stopPropagation();
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

                // Navigation modal
                const navClose = document.getElementById('navClose');
                const navWalking = document.getElementById('navWalking');
                const navDriving = document.getElementById('navDriving');
                const navAR = document.getElementById('navAR');
                
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

                if (navAR) {
                    addUniversalEventListener(navAR, (e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        this.openMapsNavigation('ar');
                    });
                }

                // Vault badge
                const vaultBadge = document.getElementById('vaultBadge');
                if (vaultBadge) {
                    addUniversalEventListener(vaultBadge, (e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        this.switchMode('vault');
                    });
                }

                // Token Discovery Modal buttons
                const collectTokenBtn = document.getElementById('collectTokenBtn');
                const sponsorInfoBtn = document.getElementById('sponsorInfoBtn');
                const sponsorBackBtn = document.getElementById('sponsorBackBtn');

                if (collectTokenBtn) {
                    addUniversalEventListener(collectTokenBtn, (e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        this.collectToken();
                    });
                }

                if (sponsorInfoBtn) {
                    addUniversalEventListener(sponsorInfoBtn, (e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        this.showSponsorDetails();
                    });
                }

                if (sponsorBackBtn) {
                    addUniversalEventListener(sponsorBackBtn, (e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        this.hideSponsorDetails();
                    });
                }

                // Airdrop claim
                const airdropClaimButton = document.getElementById('airdropClaimButton');
                if (airdropClaimButton) {
                    addUniversalEventListener(airdropClaimButton, (e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        this.claimAirdrop();
                    });
                }

                // Reset game
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

                // Logout
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

                // QR modal
                const redeemTokens = document.getElementById('redeemTokens');
                const redeemQRBtn = document.getElementById('redeemQRBtn');
                const qrClose = document.getElementById('qrClose');
                
                if (redeemTokens) {
                    addUniversalEventListener(redeemTokens, (e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        this.showQRCode('payment');
                    });
                }
                
                if (redeemQRBtn) {
                    addUniversalEventListener(redeemQRBtn, (e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        this.showQRCode('payment');
                    });
                }
                
                if (qrClose) {
                    addUniversalEventListener(qrClose, (e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        this.hideQRCode();
                    });
                }

                // Coinbase wallet
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

                console.log('✅ Enhanced event listeners setup complete');
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
    console.log('🔥💎 Creating Dashboard instance...');
    window.vaultPhoenixDashboard = new VaultPhoenixDashboard();

} else {
    console.log('🚫 Dashboard JavaScript blocked - not a crypto game page');
}

console.log('🔥💎 Dashboard JavaScript loaded successfully');
