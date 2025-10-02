// Vault Phoenix AR Crypto Gaming - HUNT SCREEN FIXES (CLEAN & FUNCTIONAL)
// PROTECTION: Only affects crypto-game/ folder - prevents main site interference
// FILE PATH: crypto-game/dashboard.js

console.log('🔥💎 Vault Phoenix Hunt Screen JavaScript Loading...');

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
    console.log('🔥💎 Hunt Screen JavaScript ACTIVE - Page confirmed');
})();

// ONLY RUN DASHBOARD IF THIS IS A CRYPTO GAME PAGE AND SESSION IS VALID
if (window.isVaultPhoenixDashboard) {

    class VaultPhoenixDashboard {
        constructor() {
            console.log('🔥💎 Vault Phoenix Hunt Screen initializing...');
            
            // Initialize all properties safely
            this.userLat = 33.4484; // Phoenix, AZ default (demo player location)
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
            this.nearestToken = null;
            
            // MAP DRAGGING PROPERTIES
            this.mapIsDragging = false;
            this.mapStartX = 0;
            this.mapStartY = 0;
            this.mapTranslateX = 0;
            this.mapTranslateY = 0;
            this.mapScale = 1;

            // GAME DESIGNER OPTIMIZED: Enhanced Ember Token System with COLLECTABLE tokens near demo player
            this.emberTokens = [
                // CRITICAL: Demo tokens within 10m collection range for AR mode
                { id: 1, value: 500, tier: "high", location: "Phoenix Plaza Central", lat: 33.4485, lng: -112.0741, sponsor: "Phoenix Downtown Partnership", message: "Premium downtown experience awaits!", description: "Exclusive access to downtown Phoenix events, VIP parking, and luxury dining experiences.", distance: 8, collectable: true },
                { id: 2, value: 250, tier: "medium", location: "Heritage Square", lat: 33.4483, lng: -112.0742, sponsor: "Arizona Heritage Foundation", message: "Discover Phoenix history!", description: "Historic tour packages and museum access with guided experiences.", distance: 6, collectable: true },
                { id: 3, value: 100, tier: "low", location: "Roosevelt Row Art Walk", lat: 33.4486, lng: -112.0739, sponsor: "Local Artists Collective", message: "Support local Phoenix artists!", description: "Art gallery tours and exclusive artwork purchasing opportunities.", distance: 9, collectable: true },
                
                // Nearby tokens (within 50m but outside collection range - shows navigation)
                { id: 4, value: 750, tier: "high", location: "Chase Field", lat: 33.4453, lng: -112.0667, sponsor: "Arizona Diamondbacks", message: "Baseball season tickets await!", description: "Premium baseball experiences with season ticket perks and dugout tours.", distance: 45, collectable: false },
                { id: 5, value: 300, tier: "medium", location: "Phoenix Convention Center", lat: 33.4489, lng: -112.0739, sponsor: "Visit Phoenix", message: "Convention center VIP access!", description: "Priority booking and VIP amenities for events and conferences.", distance: 32, collectable: false },
                
                // Distant tokens (requiring travel)
                { id: 6, value: 400, tier: "high", location: "Sky Harbor Airport", lat: 33.4343, lng: -112.0116, sponsor: "Sky Harbor Shops", message: "Travel rewards for your next adventure!", description: "Unlock travel perks and duty-free shopping benefits.", distance: 850, collectable: false },
                { id: 7, value: 200, tier: "medium", location: "Scottsdale Quarter", lat: 33.4942, lng: -111.9261, sponsor: "Scottsdale Fashion Square", message: "Premium shopping rewards unlocked!", description: "Discover luxury shopping with exclusive discounts and VIP personal shopping services.", distance: 1200, collectable: false },
                { id: 8, value: 150, tier: "medium", location: "Desert Botanical Garden", lat: 33.4619, lng: -111.9463, sponsor: "Garden Cafe", message: "Nature-inspired dining experience!", description: "Farm-to-table dining surrounded by stunning desert flora.", distance: 950, collectable: false },
                { id: 9, value: 175, tier: "medium", location: "Camelback Mountain", lat: 33.5186, lng: -111.9717, sponsor: "Desert Hiking Gear", message: "Gear up for your next hike!", description: "Professional hiking equipment and guided desert expedition packages.", distance: 1400, collectable: false },
                { id: 10, value: 125, tier: "low", location: "Tempe Town Lake", lat: 33.4255, lng: -111.9400, sponsor: "Local Coffee Co.", message: "Free coffee for early hunters!", description: "Enjoy artisanal coffee and cozy workspace with special $Ember holder benefits.", distance: 750, collectable: false }
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
            console.log('🔧 Initializing Hunt Screen Dashboard...');
            try {
                this.ensureSession();
                this.loadCollectedTokens();
                this.setupEventListeners();
                this.setupSwipeableModule();
                
                // Ensure dashboard page class is applied
                document.body.classList.add('crypto-dashboard-page');
                this.setModeAttribute('map');
                
                // Initialize demo map with DESIGNED MAP
                setTimeout(() => {
                    this.initializeMap();
                }, 500);
                
                // Update nearest token for proximity detection
                this.updateNearestToken();
                
                console.log('✅ Hunt Screen initialized successfully');
            } catch (error) {
                console.error('❌ Hunt Screen initialization error:', error);
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

        // =================== PROXIMITY DETECTION SYSTEM ===================
        updateNearestToken() {
            const availableTokens = this.emberTokens.filter(token => !this.isTokenCollected(token.id));
            if (availableTokens.length === 0) return;

            // Find nearest token
            let nearest = null;
            let minDistance = Infinity;

            availableTokens.forEach(token => {
                const distance = this.calculateDistance(this.userLat, this.userLng, token.lat, token.lng) * 1000; // Convert to meters
                token.distance = Math.round(distance);
                
                if (distance < minDistance) {
                    minDistance = distance;
                    nearest = token;
                }
            });

            this.nearestToken = nearest;
            
            // Update proximity notification for non-hunt screens
            if (this.currentMode !== 'map' && nearest && nearest.distance <= 50) {
                this.showProximityNotification(nearest);
            } else if (this.currentMode !== 'map') {
                this.hideProximityNotification();
            }
        }

        showProximityNotification(token) {
            const notification = document.getElementById('proximityNotification');
            if (!notification) return;

            // Update notification content
            const title = notification.querySelector('.proximity-title');
            const subtitle = notification.querySelector('.proximity-subtitle');
            const button = notification.querySelector('.proximity-button');

            if (title) title.textContent = `${token.value} $Ember Token Detected!`;
            if (subtitle) subtitle.textContent = `${token.location} - ${token.distance}m away`;
            
            if (button) {
                button.onclick = () => {
                    if (token.collectable) {
                        this.switchMode('ar');
                    } else {
                        this.showNavigationModal(token);
                    }
                };
            }

            notification.classList.add('show');
        }

        hideProximityNotification() {
            const notification = document.getElementById('proximityNotification');
            if (notification) {
                notification.classList.remove('show');
            }
        }

        // =================== ENHANCED DESIGNED MAP SYSTEM WITH DRAGGING ===================
        initializeMap() {
            console.log('🗺️ Initializing ENHANCED Map System with Dragging...');
            try {
                const mapContainer = document.getElementById('googleMapContainer');
                if (!mapContainer) {
                    console.error('❌ Map container not found');
                    return;
                }

                console.log('🎨 Creating ENHANCED Phoenix map with full screen dragging...');
                this.createEnhancedPhoenixMap(mapContainer);
                
            } catch (error) {
                console.error('❌ Map initialization error:', error);
            }
        }

        createEnhancedPhoenixMap(mapContainer) {
            console.log('🎨 Creating enhanced draggable Phoenix map...');
            try {
                // Create ENHANCED Phoenix map with DRAGGING functionality
                mapContainer.innerHTML = `
                    <div class="designed-phoenix-map" id="phoenixMapContainer" style="
                        position: absolute;
                        top: 0;
                        left: 0;
                        width: 200%;
                        height: 200%;
                        background: linear-gradient(135deg, #f4f1e8 0%, #e8dcc7 25%, #ddd1bb 50%, #d1c5af 75%, #c5b9a3 100%);
                        overflow: visible;
                        z-index: 1;
                        cursor: grab;
                        pointer-events: auto;
                        touch-action: pan-x pan-y;
                        user-select: none;
                        transform-origin: 0 0;
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
                        "></div>
                        
                        <!-- Major Roads and Highways -->
                        <div class="road-network" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; z-index: 3; pointer-events: none;">
                            <!-- I-10 Highway (East-West) -->
                            <div style="position: absolute; top: 65%; left: 0; width: 100%; height: 4px; background: #4a4a4a; opacity: 0.8; border-radius: 2px;"></div>
                            <!-- I-17 Highway (North-South) -->
                            <div style="position: absolute; left: 45%; top: 0; width: 4px; height: 100%; background: #4a4a4a; opacity: 0.8; border-radius: 2px;"></div>
                            <!-- Loop 101 -->
                            <div style="position: absolute; top: 40%; left: 60%; width: 35%; height: 3px; background: #666; opacity: 0.7; border-radius: 1px; transform: rotate(15deg);"></div>
                            <!-- Central Avenue -->
                            <div style="position: absolute; left: 47%; top: 30%; width: 2px; height: 40%; background: #777; opacity: 0.6;"></div>
                            <!-- Camelback Road -->
                            <div style="position: absolute; top: 35%; left: 30%; width: 40%; height: 2px; background: #777; opacity: 0.6;"></div>
                        </div>
                        
                        <!-- Phoenix Landmarks -->
                        <div class="phoenix-landmarks" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; z-index: 4; pointer-events: none;">
                            <!-- Downtown Phoenix Skyline -->
                            <div class="downtown-skyline" style="position: absolute; left: 42%; top: 58%; width: 12%; height: 15%;">
                                <div style="background: #2c3e50; width: 15%; height: 80%; position: absolute; left: 0; bottom: 0; border-radius: 1px 1px 0 0;"></div>
                                <div style="background: #34495e; width: 20%; height: 100%; position: absolute; left: 20%; bottom: 0; border-radius: 1px 1px 0 0;"></div>
                                <div style="background: #2c3e50; width: 18%; height: 70%; position: absolute; left: 45%; bottom: 0; border-radius: 1px 1px 0 0;"></div>
                                <div style="background: #34495e; width: 25%; height: 85%; position: absolute; left: 68%; bottom: 0; border-radius: 1px 1px 0 0;"></div>
                            </div>
                            
                            <!-- Camelback Mountain -->
                            <div style="position: absolute; left: 65%; top: 20%; width: 8px; height: 6px; background: #8B4513; border-radius: 4px 4px 0 0; transform: skew(-10deg);"></div>
                            <div style="position: absolute; left: 63%; top: 18%; font-size: 8px; color: #5d4037; font-weight: bold;">Camelback</div>
                            
                            <!-- Sky Harbor Airport -->
                            <div style="position: absolute; left: 35%; top: 75%; width: 16px; height: 8px; background: #607d8b; border-radius: 2px;"></div>
                            <div style="position: absolute; left: 37%; top: 76%; width: 12px; height: 6px; background: #546e7a; border-radius: 1px;"></div>
                            <div style="position: absolute; left: 32%; top: 72%; font-size: 8px; color: #37474f; font-weight: bold;">✈️ PHX</div>
                            
                            <!-- Chase Field -->
                            <div style="position: absolute; left: 44%; top: 62%; width: 8px; height: 6px; background: #4caf50; border-radius: 50%; border: 2px solid #2e7d32;"></div>
                            <div style="position: absolute; left: 41%; top: 59%; font-size: 7px; color: #1b5e20; font-weight: bold;">Chase Field</div>
                            
                            <!-- Phoenix Zoo -->
                            <div style="position: absolute; left: 55%; top: 68%; width: 6px; height: 6px; background: #4caf50; border-radius: 3px;"></div>
                            <div style="position: absolute; left: 52%; top: 65%; font-size: 7px; color: #2e7d32; font-weight: bold;">Zoo</div>
                            
                            <!-- Scottsdale Area -->
                            <div style="position: absolute; left: 75%; top: 25%; width: 10px; height: 8px; background: #ff9800; border-radius: 2px; opacity: 0.8;"></div>
                            <div style="position: absolute; left: 72%; top: 22%; font-size: 8px; color: #e65100; font-weight: bold;">Scottsdale</div>
                        </div>
                        
                        <!-- Phoenix Area Label -->
                        <div style="
                            position: absolute;
                            top: 6%;
                            left: 6%;
                            color: rgba(139, 69, 19, 0.9);
                            font-size: 16px;
                            font-weight: 900;
                            z-index: 6;
                            background: rgba(255, 255, 255, 0.95);
                            padding: 8px 16px;
                            border-radius: 20px;
                            box-shadow: 0 4px 16px rgba(0,0,0,0.2);
                            border: 2px solid rgba(240, 165, 0, 0.4);
                            pointer-events: none;
                            backdrop-filter: blur(10px);
                        ">🏜️ Phoenix Metropolitan Area</div>
                        
                        <!-- Map Controls - ALWAYS VISIBLE -->
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
                                text-shadow: 0 2px 4px rgba(0,0,0,0.3);
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
                                text-shadow: 0 2px 4px rgba(0,0,0,0.3);
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
                                text-shadow: 0 2px 4px rgba(0,0,0,0.3);
                            ">🎯</button>
                        </div>
                        
                        <!-- Demo Player Location (You Are Here) -->
                        <div id="playerLocation" style="
                            position: absolute;
                            top: 30%;
                            left: 23%;
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
                        
                        <!-- You Are Here Label -->
                        <div id="playerLocationLabel" style="
                            position: absolute;
                            top: 26%;
                            left: 23%;
                            transform: translateX(-50%);
                            background: rgba(66, 133, 244, 0.95);
                            color: white;
                            padding: 6px 12px;
                            border-radius: 16px;
                            font-size: 12px;
                            font-weight: 700;
                            z-index: 89;
                            pointer-events: none;
                            box-shadow: 0 3px 12px rgba(66, 133, 244, 0.4);
                            border: 2px solid white;
                        ">📍 You Are Here</div>
                        
                        <!-- Token Markers Container -->
                        <div id="phoenixTokenMarkers" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; z-index: 100; pointer-events: none;"></div>
                    </div>
                `;

                // Set up enhanced map interactions with dragging
                this.setupEnhancedMapControls();

                // Add token markers with proper positioning
                setTimeout(() => {
                    this.addPhoenixTokenMarkers();
                    this.startGameFeatures();
                }, 1000);

                console.log('✅ Enhanced draggable Phoenix map initialized successfully');
                
            } catch (error) {
                console.error('❌ Enhanced map creation error:', error);
            }
        }

        setupEnhancedMapControls() {
            console.log('🖱️ Setting up enhanced map controls with dragging...');
            
            setTimeout(() => {
                const mapContainer = document.getElementById('phoenixMapContainer');
                const zoomInBtn = document.getElementById('zoomInBtn');
                const zoomOutBtn = document.getElementById('zoomOutBtn');
                const centerMapBtn = document.getElementById('centerMapBtn');

                // ENHANCED MAP DRAGGING FUNCTIONALITY
                if (mapContainer) {
                    let isDragging = false;
                    let startX = 0;
                    let startY = 0;
                    let currentX = this.mapTranslateX;
                    let currentY = this.mapTranslateY;

                    // Mouse/Touch start
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

                    // Mouse/Touch move
                    const handleMove = (e) => {
                        if (!isDragging) return;
                        
                        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
                        const clientY = e.touches ? e.touches[0].clientY : e.clientY;
                        
                        currentX = clientX - startX;
                        currentY = clientY - startY;
                        
                        // Constrain dragging bounds
                        const maxX = window.innerWidth * 0.3;
                        const minX = -window.innerWidth * 0.8;
                        const maxY = window.innerHeight * 0.3;
                        const minY = -window.innerHeight * 0.8;
                        
                        currentX = Math.max(minX, Math.min(maxX, currentX));
                        currentY = Math.max(minY, Math.min(maxY, currentY));
                        
                        this.updateMapTransform(currentX, currentY, this.mapScale);
                        
                        e.preventDefault();
                    };

                    // Mouse/Touch end
                    const handleEnd = (e) => {
                        if (!isDragging) return;
                        
                        isDragging = false;
                        this.mapTranslateX = currentX;
                        this.mapTranslateY = currentY;
                        
                        mapContainer.style.cursor = 'grab';
                        mapContainer.style.transition = 'transform 0.3s ease';
                        
                        e.preventDefault();
                    };

                    // Add event listeners for dragging
                    mapContainer.addEventListener('mousedown', handleStart, { passive: false });
                    mapContainer.addEventListener('touchstart', handleStart, { passive: false });
                    
                    document.addEventListener('mousemove', handleMove, { passive: false });
                    document.addEventListener('touchmove', handleMove, { passive: false });
                    
                    document.addEventListener('mouseup', handleEnd, { passive: false });
                    document.addEventListener('touchend', handleEnd, { passive: false });
                    
                    // Prevent context menu on long press
                    mapContainer.addEventListener('contextmenu', (e) => e.preventDefault());
                }

                // ZOOM IN BUTTON
                if (zoomInBtn) {
                    const zoomInHandler = (e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        
                        this.mapScale = Math.min(this.mapScale * 1.2, 3);
                        this.updateMapTransform(this.mapTranslateX, this.mapTranslateY, this.mapScale);
                        
                        // Visual feedback
                        zoomInBtn.style.transform = 'scale(0.9)';
                        setTimeout(() => {
                            zoomInBtn.style.transform = 'scale(1)';
                        }, 150);
                        
                        if (navigator.vibrate) navigator.vibrate(30);
                        console.log('🔍 Zoomed in to', this.mapScale);
                    };

                    zoomInBtn.addEventListener('click', zoomInHandler, { passive: false });
                    zoomInBtn.addEventListener('touchend', zoomInHandler, { passive: false });
                }

                // ZOOM OUT BUTTON
                if (zoomOutBtn) {
                    const zoomOutHandler = (e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        
                        this.mapScale = Math.max(this.mapScale / 1.2, 0.5);
                        this.updateMapTransform(this.mapTranslateX, this.mapTranslateY, this.mapScale);
                        
                        // Visual feedback
                        zoomOutBtn.style.transform = 'scale(0.9)';
                        setTimeout(() => {
                            zoomOutBtn.style.transform = 'scale(1)';
                        }, 150);
                        
                        if (navigator.vibrate) navigator.vibrate(30);
                        console.log('🔍 Zoomed out to', this.mapScale);
                    };

                    zoomOutBtn.addEventListener('click', zoomOutHandler, { passive: false });
                    zoomOutBtn.addEventListener('touchend', zoomOutHandler, { passive: false });
                }

                // CENTER MAP BUTTON
                if (centerMapBtn) {
                    const centerMapHandler = (e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        
                        this.mapTranslateX = 0;
                        this.mapTranslateY = 0;
                        this.mapScale = 1;
                        this.updateMapTransform(0, 0, 1);
                        
                        // Visual feedback
                        centerMapBtn.style.transform = 'scale(0.9)';
                        setTimeout(() => {
                            centerMapBtn.style.transform = 'scale(1)';
                        }, 150);
                        
                        if (navigator.vibrate) navigator.vibrate([30, 10, 30]);
                        console.log('🎯 Map centered');
                    };

                    centerMapBtn.addEventListener('click', centerMapHandler, { passive: false });
                    centerMapBtn.addEventListener('touchend', centerMapHandler, { passive: false });
                }
            }, 200);
        }

        updateMapTransform(x, y, scale) {
            const mapContainer = document.getElementById('phoenixMapContainer');
            if (mapContainer) {
                mapContainer.style.transform = `translate(${x}px, ${y}px) scale(${scale})`;
            }
        }

        // Add Phoenix-positioned token markers
        addPhoenixTokenMarkers() {
            console.log('💎 Adding Phoenix token markers...');
            try {
                const markersContainer = document.getElementById('phoenixTokenMarkers');
                if (!markersContainer) {
                    console.error('❌ Phoenix markers container not found');
                    return;
                }

                markersContainer.innerHTML = '';
                markersContainer.style.pointerEvents = 'none';

                // Enhanced Phoenix-specific positions for 200% sized map
                const phoenixPositions = {
                    1: { x: 23.25, y: 29.75 }, // Phoenix Plaza Central (very close to player)
                    2: { x: 22.9, y: 30.1 },   // Heritage Square (very close to player)  
                    3: { x: 23.6, y: 29.9 },   // Roosevelt Row Art Walk (very close to player)
                    4: { x: 22, y: 31 },       // Chase Field
                    5: { x: 23.5, y: 29 },     // Phoenix Convention Center
                    6: { x: 17.5, y: 37.5 },   // Sky Harbor Airport
                    7: { x: 37.5, y: 12.5 },   // Scottsdale Quarter
                    8: { x: 27.5, y: 34 },     // Desert Botanical Garden
                    9: { x: 32.5, y: 10 },     // Camelback Mountain
                    10: { x: 26, y: 35 }       // Tempe Town Lake
                };

                let markerCount = 0;
                this.emberTokens.forEach((token) => {
                    if (!this.isTokenCollected(token.id)) {
                        const position = phoenixPositions[token.id] || { x: 25, y: 25 };

                        const marker = document.createElement('div');
                        marker.className = `phoenix-token-marker ${token.tier} ${token.collectable ? 'collectable' : 'distant'}`;
                        marker.style.cssText = `
                            position: absolute;
                            left: ${position.x}%;
                            top: ${position.y}%;
                            width: ${token.collectable ? '72px' : '58px'};
                            height: ${token.collectable ? '72px' : '58px'};
                            cursor: pointer;
                            pointer-events: auto !important;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            transition: all 0.4s ease;
                            z-index: ${token.collectable ? '125' : '120'};
                            border-radius: 50%;
                            background: ${token.collectable ? 'rgba(240, 165, 0, 0.2)' : 'rgba(240, 165, 0, 0.1)'};
                            border: ${token.collectable ? '4px' : '3px'} solid rgba(240, 165, 0, 0.7);
                            box-shadow: 0 0 ${token.collectable ? '25px' : '20px'} rgba(240, 165, 0, ${token.collectable ? '0.8' : '0.6'});
                            transform: translate(-50%, -50%);
                            animation: ${token.collectable ? 'collectableTokenPulse' : 'distantTokenPulse'} 3s ease-in-out infinite;
                            -webkit-tap-highlight-color: transparent;
                            touch-action: manipulation;
                            user-select: none;
                        `;
                        marker.title = `${token.location} - ${token.value} $Ember (${token.distance}m away)`;
                        marker.dataset.tokenId = token.id;

                        // Token image
                        const tokenImage = document.createElement('img');
                        tokenImage.src = '../images/VPEmberCoin.PNG';
                        tokenImage.alt = 'Ember Coin';
                        tokenImage.style.cssText = `
                            width: ${token.collectable ? '62px' : '48px'};
                            height: ${token.collectable ? '62px' : '48px'};
                            border-radius: 50%;
                            object-fit: cover;
                            filter: brightness(1.3) drop-shadow(0 4px 16px rgba(240, 165, 0, 0.9));
                            pointer-events: none;
                        `;
                        tokenImage.onerror = function() {
                            this.style.display = 'none';
                            marker.textContent = '💎';
                            marker.style.fontSize = '28px';
                            marker.style.color = '#f0a500';
                            marker.style.fontWeight = 'bold';
                        };

                        // Value and distance overlay
                        const valueOverlay = document.createElement('div');
                        valueOverlay.style.cssText = `
                            position: absolute;
                            bottom: ${token.collectable ? '-28px' : '-24px'};
                            left: 50%;
                            transform: translateX(-50%);
                            background: linear-gradient(135deg, #f0a500, #fb923c);
                            color: white;
                            font-size: ${token.collectable ? '16px' : '14px'};
                            font-weight: 900;
                            padding: ${token.collectable ? '10px 14px' : '8px 12px'};
                            border-radius: 16px;
                            border: 3px solid white;
                            white-space: nowrap;
                            pointer-events: none;
                            box-shadow: 0 4px 16px rgba(240, 165, 0, 0.7);
                            text-shadow: 0 2px 4px rgba(0,0,0,0.3);
                        `;
                        valueOverlay.innerHTML = `${token.value}<br><span style="font-size: 12px; opacity: 0.9;">${token.distance}m</span>`;

                        // Collection indicator for nearby tokens
                        if (token.collectable) {
                            const collectIndicator = document.createElement('div');
                            collectIndicator.style.cssText = `
                                position: absolute;
                                top: -8px;
                                right: -8px;
                                width: 24px;
                                height: 24px;
                                background: linear-gradient(135deg, #4CAF50, #66BB6A);
                                border: 3px solid white;
                                border-radius: 50%;
                                display: flex;
                                align-items: center;
                                justify-content: center;
                                font-size: 12px;
                                animation: collectIndicatorPulse 2s ease-in-out infinite;
                                pointer-events: none;
                                box-shadow: 0 3px 12px rgba(76, 175, 80, 0.6);
                            `;
                            collectIndicator.textContent = '📱';
                            marker.appendChild(collectIndicator);
                        }

                        marker.appendChild(tokenImage);
                        marker.appendChild(valueOverlay);

                        // Enhanced click handler
                        const handleTokenInteraction = (e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            
                            console.log('🎯 Phoenix token clicked!', {
                                location: token.location,
                                value: token.value,
                                distance: token.distance,
                                collectable: token.collectable
                            });
                            
                            // Enhanced visual feedback
                            marker.style.transform = 'translate(-50%, -50%) scale(1.15)';
                            marker.style.zIndex = '150';
                            marker.style.boxShadow = '0 0 40px rgba(240, 165, 0, 1)';
                            
                            setTimeout(() => {
                                marker.style.transform = 'translate(-50%, -50%) scale(1)';
                                marker.style.zIndex = token.collectable ? '125' : '120';
                                marker.style.boxShadow = `0 0 ${token.collectable ? '25px' : '20px'} rgba(240, 165, 0, ${token.collectable ? '0.8' : '0.6'})`;
                            }, 300);
                            
                            // Show navigation modal with AR option if collectable
                            this.showNavigationModal(token);
                            
                            // Enhanced haptic feedback
                            if (navigator.vibrate) {
                                navigator.vibrate(token.collectable ? [50, 20, 50, 20, 100] : [30, 10, 30]);
                            }
                        };

                        // Universal event listeners
                        marker.addEventListener('click', handleTokenInteraction, { passive: false });
                        marker.addEventListener('touchend', handleTokenInteraction, { passive: false });
                        marker.addEventListener('pointerup', handleTokenInteraction, { passive: false });

                        markersContainer.appendChild(marker);
                        markerCount++;
                    }
                });

                console.log(`✅ Added ${markerCount} Phoenix token markers`);
                
            } catch (error) {
                console.error('❌ Phoenix token markers error:', error);
            }
        }

        // Start game features
        startGameFeatures() {
            console.log('🎮 Starting Hunt Screen features...');
            this.updateLocationDisplay();
            this.updateNearbyTokens();
            this.updateTokenCounts();
            this.updateVaultStats();
            
            // Remove proximity notification from hunt screen
            if (this.currentMode === 'map') {
                this.hideProximityNotification();
            }
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

        // ENHANCED: Only show coin images in token locations list
        updateNearbyTokens() {
            console.log('🔍 Updating nearby collectable tokens...');
            try {
                // Focus on collectable tokens first, then show nearby ones
                const collectableTokens = this.emberTokens
                    .filter(token => !this.isTokenCollected(token.id) && token.collectable)
                    .sort((a, b) => a.distance - b.distance);
                
                const nearbyTokens = this.emberTokens
                    .filter(token => !this.isTokenCollected(token.id) && !token.collectable && token.distance <= 100)
                    .sort((a, b) => a.distance - b.distance);
                
                const allNearbyTokens = [...collectableTokens, ...nearbyTokens].slice(0, 5);

                const nearbyCount = document.getElementById('nearbyTokenCount');
                if (nearbyCount) {
                    nearbyCount.textContent = `${collectableTokens.length} ready to collect`;
                }

                // Update token locations list with ONLY COIN IMAGES as requested
                const tokensList = document.getElementById('tokenLocationsList');
                if (tokensList) {
                    tokensList.innerHTML = allNearbyTokens.map((token) => {
                        return `
                            <div class="token-location-item ${token.collectable ? 'collectable-token' : 'distant-token'}" 
                                 data-token-id="${token.id}" 
                                 style="cursor: pointer; touch-action: manipulation; -webkit-tap-highlight-color: transparent; user-select: none; min-height: 95px;">
                                <div class="token-location-icon ${token.collectable ? 'collectable-icon' : ''}">
                                    <img src="../images/VPEmberCoin.PNG" alt="Ember Coin" 
                                         style="width: 32px; height: 32px; border-radius: 50%;" 
                                         onerror="this.textContent='💎'">
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
                        `;
                    }).join('');

                    // Add enhanced click handlers
                    tokensList.querySelectorAll('.token-location-item').forEach(item => {
                        const itemClickHandler = (e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            
                            const tokenId = parseInt(item.dataset.tokenId);
                            const token = this.emberTokens.find(t => t.id === tokenId);
                            if (token) {
                                console.log('🎯 Token list item clicked:', token.location);
                                
                                // Visual feedback
                                item.style.transform = 'translateY(-4px) scale(1.02)';
                                item.style.boxShadow = '0 10px 30px rgba(240, 165, 0, 0.5)';
                                
                                setTimeout(() => {
                                    item.style.transform = '';
                                    item.style.boxShadow = '';
                                }, 200);
                                
                                this.showNavigationModal(token);
                                
                                if (navigator.vibrate) {
                                    navigator.vibrate(token.collectable ? [40, 15, 40] : [25]);
                                }
                            }
                        };

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
                const collectableCount = this.emberTokens.filter(token => !this.isTokenCollected(token.id) && token.collectable).length;
                
                const elements = [
                    { id: 'availableTokenCount', text: `${collectableCount} ready to collect` },
                    { id: 'totalAvailable', text: `${availableCount} total available` },
                    { id: 'availableTokens', text: `${availableCount} Available` }
                ];
                
                elements.forEach(({id, text}) => {
                    const el = document.getElementById(id);
                    if (el) el.textContent = text;
                });
            } catch (error) {
                console.error('❌ Token counts update error:', error);
            }
        }

        // ENHANCED: Show navigation modal with AR Hunt mode for collectable tokens
        showNavigationModal(token) {
            console.log('🗺️ Showing enhanced navigation modal for:', token.location);
            try {
                this.currentNavigationToken = token;
                
                const modal = document.getElementById('navigationModal');
                const tokenName = document.getElementById('navTokenName');
                const distance = document.getElementById('navDistance');
                const walkTime = document.getElementById('navWalkTime');
                const driveTime = document.getElementById('navDriveTime');
                const arOption = document.getElementById('navAR');
                
                if (tokenName) tokenName.textContent = `${token.value} $Ember - ${token.location}`;
                
                const distanceText = `${token.distance}m away`;
                if (distance) distance.textContent = distanceText;
                
                const walkMinutes = Math.max(1, Math.round(token.distance / 80)); // Walking speed
                const driveMinutes = Math.max(1, Math.round(token.distance / 300)); // Driving speed
                
                if (walkTime) walkTime.textContent = `~${walkMinutes} min`;
                if (driveTime) driveTime.textContent = `~${driveMinutes} min`;
                
                // CRITICAL: Show AR Hunt mode for collectable tokens
                if (arOption) {
                    if (token.collectable) {
                        arOption.style.display = 'flex';
                        arOption.querySelector('.navigation-option-title').textContent = 'AR Hunt Mode';
                        arOption.querySelector('.navigation-option-subtitle').textContent = 'Collect with Camera';
                        arOption.querySelector('.navigation-option-time').textContent = 'Ready!';
                        
                        // Enhanced AR button styling
                        arOption.style.background = 'linear-gradient(135deg, rgba(76, 175, 80, 0.3), rgba(129, 199, 132, 0.2))';
                        arOption.style.borderColor = 'rgba(76, 175, 80, 0.6)';
                        arOption.style.animation = 'arOptionPulse 2s ease-in-out infinite';
                    } else {
                        arOption.style.display = 'none';
                    }
                }
                
                if (modal) {
                    modal.classList.add('show');
                    console.log('✅ Enhanced navigation modal displayed');
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
            } else if (mode === 'ar') {
                this.switchMode('ar');
                this.hideNavigationModal();
                return;
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
                
                // Update proximity notifications based on mode
                this.updateNearestToken();
                
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
                        this.hideProximityNotification(); // Remove from hunt screen
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
                        this.hideProximityNotification(); // Hide during AR mode
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
            console.log('📱 Starting AR Hunt Mode...');
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
                    vaultUsdValueEl.textContent = `${usdValue} USD`;
                }
                
                if (totalCollectedEl) {
                    totalCollectedEl.textContent = this.collectedTokens.length;
                }
                
                if (totalValueEl) {
                    const totalUsd = (this.totalTokenValue * 0.001).toFixed(2);
                    totalValueEl.textContent = `${totalUsd}`;
                }
                
                if (locationsVisitedEl) {
                    const uniqueLocations = new Set(this.collectedTokens.map(t => t.location)).size;
                    locationsVisitedEl.textContent = uniqueLocations;
                }
                
                if (lastActivityEl && this.collectedTokens.length > 0) {
                    lastActivityEl.textContent = 'Today';
                }
                
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
                this.collectedTokens.push({
                    ...token,
                    collectedAt: new Date().toISOString()
                });
                
                this.totalTokenValue += token.value;
                this.saveCollectedTokens();
                
                this.updateTokenCounts();
                this.updateVaultStats();
                this.updateNearbyTokens();
                
                this.removeTokenMarker(token.id);
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
                touch-action: none;
                user-select: none;
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
                    const threshold = 60; // Increased threshold for better mobile experience
                    
                    if (Math.abs(deltaY) > threshold) {
                        if (deltaY > 0) {
                            this.expandModule();
                        } else {
                            this.collapseModule();
                        }
                    } else {
                        // Toggle on tap if no significant drag
                        this.toggleModule();
                    }
                    
                    // Reset opacity
                    const module = document.getElementById('tokenLocationsModule');
                    if (module) {
                        module.style.opacity = '';
                    }
                    
                    e.preventDefault();
                };

                // Add all event listeners
                handle.addEventListener('touchstart', handleTouchStart, { passive: false });
                handle.addEventListener('touchmove', handleTouchMove, { passive: false });
                handle.addEventListener('touchend', handleTouchEnd, { passive: false });
                handle.addEventListener('mousedown', handleTouchStart, { passive: false });
                handle.addEventListener('mousemove', handleTouchMove, { passive: false });
                handle.addEventListener('mouseup', handleTouchEnd, { passive: false });
                handle.addEventListener('click', this.toggleModule.bind(this), { passive: false });
                
                console.log('✅ Enhanced swipeable module setup complete');
            } catch (error) {
                console.error('❌ Swipeable module setup error:', error);
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
                    navigator.vibrate(40);
                }
                
                console.log('📱 Module expanded');
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
                
                console.log('📱 Module collapsed');
            }
        }

        // =================== RESET GAME ===================
        resetGame() {
            console.log('🔄 Resetting game...');
            try {
                this.collectedTokens = [];
                this.totalTokenValue = 0;
                
                localStorage.removeItem('vaultPhoenix_collectedTokens');
                localStorage.removeItem('vaultPhoenix_totalValue');
                
                this.updateVaultStats();
                this.updateTokenCounts();
                this.updateNearbyTokens();
                
                setTimeout(() => {
                    this.addPhoenixTokenMarkers();
                }, 500);
                
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
                    element.addEventListener('pointerup', handler, options);
                    
                    element.addEventListener('touchstart', (e) => {
                        e.preventDefault();
                    }, { passive: false });
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

                // Menu items
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

                // ENHANCED: AR Hunt mode navigation
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
    console.log('🔥💎 Creating Hunt Screen Dashboard instance...');
    window.vaultPhoenixDashboard = new VaultPhoenixDashboard();

} else {
    console.log('🚫 Hunt Screen JavaScript blocked - not a crypto game page');
}

console.log('🔥💎 Hunt Screen JavaScript loaded successfully');
