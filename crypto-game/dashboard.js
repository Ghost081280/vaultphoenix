// Vault Phoenix AR Crypto Gaming - COMPLETE REDESIGNED DASHBOARD (ALL FIXES APPLIED)
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
            this.cameraStream = null;
            this.arCoinVisible = false;
            
            // MAP DRAGGING PROPERTIES
            this.mapIsDragging = false;
            this.mapStartX = 0;
            this.mapStartY = 0;
            this.mapTranslateX = 0;
            this.mapTranslateY = 0;
            this.mapScale = 1;

            // Enhanced Ember Token System with COLLECTABLE tokens near demo player
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
            console.log('🔧 Initializing Dashboard...');
            try {
                this.ensureSession();
                this.loadCollectedTokens();
                this.setupEventListeners();
                this.setupSwipeableModule();
                
                // Ensure dashboard page class is applied
                document.body.classList.add('crypto-dashboard-page');
                this.setModeAttribute('map');
                
                // Initialize map with proper boundaries
                setTimeout(() => {
                    this.initializeMap();
                }, 500);
                
                // Update nearest token for airdrop detection
                this.updateNearestToken();
                
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

        // =================== AIRDROP SYSTEM (REPLACES PROXIMITY) ===================
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
            
            // Show airdrop notification for non-hunt screens with random chance
            if (this.currentMode !== 'map' && Math.random() < 0.3) { // 30% chance to show airdrop
                this.showAirdropNotification();
            } else if (this.currentMode === 'map') {
                this.hideAirdropNotification();
            }
        }

        showAirdropNotification() {
            const notification = document.getElementById('airdropNotification');
            if (!notification) return;

            // Random airdrop values
            const airdropValues = [100, 250, 500, 750, 1000];
            const randomValue = airdropValues[Math.floor(Math.random() * airdropValues.length)];

            // Update notification content for airdrop
            const title = notification.querySelector('.airdrop-title');
            const subtitle = notification.querySelector('.airdrop-subtitle');
            const button = notification.querySelector('.airdrop-button');

            if (title) title.textContent = `$Ember Air Drop!`;
            if (subtitle) subtitle.textContent = `${randomValue} $Ember tokens available now`;
            
            if (button) {
                button.onclick = () => {
                    this.claimAirdrop(randomValue);
                };
            }

            notification.classList.add('show');
            
            // Auto-hide after 8 seconds
            setTimeout(() => {
                this.hideAirdropNotification();
            }, 8000);
        }

        hideAirdropNotification() {
            const notification = document.getElementById('airdropNotification');
            if (notification) {
                notification.classList.remove('show');
            }
        }

        claimAirdrop(value) {
            console.log('🪂 Claiming airdrop:', value);
            
            // Add airdrop tokens to vault
            this.totalTokenValue += value;
            this.collectedTokens.push({
                id: Date.now(), // Unique ID for airdrop
                value: value,
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
            this.showAirdropSuccess(value);
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
                touch-action: none;
                user-select: none;
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

        // =================== ENHANCED MAP SYSTEM WITH BOUNDARIES ===================
        initializeMap() {
            console.log('🗺️ Initializing Enhanced Map System...');
            try {
                const mapContainer = document.getElementById('googleMapContainer');
                if (!mapContainer) {
                    console.error('❌ Map container not found');
                    return;
                }

                console.log('🎨 Creating Phoenix map with proper boundaries...');
                this.createEnhancedPhoenixMap(mapContainer);
                
            } catch (error) {
                console.error('❌ Map initialization error:', error);
            }
        }

        createEnhancedPhoenixMap(mapContainer) {
            console.log('🎨 Creating enhanced Phoenix map with zoom boundaries...');
            try {
                // Create enhanced Phoenix map with proper zoom boundaries
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
                        "></div>
                        
                        <!-- Major Roads and Highways -->
                        <div class="road-network" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; z-index: 3; pointer-events: none;">
                            <!-- I-10 Highway (East-West) -->
                            <div style="position: absolute; top: 65%; left: 0; width: 100%; height: 4px; background: #4a4a4a; opacity: 0.8; border-radius: 2px; box-shadow: 0 2px 4px rgba(0,0,0,0.2);"></div>
                            <!-- I-17 Highway (North-South) -->
                            <div style="position: absolute; left: 45%; top: 0; width: 4px; height: 100%; background: #4a4a4a; opacity: 0.8; border-radius: 2px; box-shadow: 2px 0 4px rgba(0,0,0,0.2);"></div>
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
                                <div style="background: #2c3e50; width: 15%; height: 80%; position: absolute; left: 0; bottom: 0; border-radius: 1px 1px 0 0; border: 1px solid rgba(255,255,255,0.1);"></div>
                                <div style="background: #34495e; width: 20%; height: 100%; position: absolute; left: 20%; bottom: 0; border-radius: 1px 1px 0 0; border: 1px solid rgba(255,255,255,0.1);"></div>
                                <div style="background: #2c3e50; width: 18%; height: 70%; position: absolute; left: 45%; bottom: 0; border-radius: 1px 1px 0 0; border: 1px solid rgba(255,255,255,0.1);"></div>
                                <div style="background: #34495e; width: 25%; height: 85%; position: absolute; left: 68%; bottom: 0; border-radius: 1px 1px 0 0; border: 1px solid rgba(255,255,255,0.1);"></div>
                            </div>
                            
                            <!-- Camelback Mountain -->
                            <div style="position: absolute; left: 65%; top: 20%; width: 8px; height: 6px; background: #8B4513; border-radius: 4px 4px 0 0; transform: skew(-10deg); filter: drop-shadow(2px 2px 4px rgba(0,0,0,0.3));"></div>
                            <div style="position: absolute; left: 63%; top: 18%; font-size: 8px; color: #5d4037; font-weight: bold;">Camelback</div>
                            
                            <!-- Sky Harbor Airport -->
                            <div style="position: absolute; left: 35%; top: 75%; width: 16px; height: 8px; background: #607d8b; border-radius: 2px; border: 1px solid rgba(255,255,255,0.1);"></div>
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
                        
                        <!-- Map Controls - FIXED POSITIONING -->
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
                        
                        <!-- You Are Here Label -->
                        <div id="playerLocationLabel" style="
                            position: absolute;
                            top: 46%;
                            left: 50%;
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

                // Set up map controls with proper boundaries
                this.setupEnhancedMapControls();

                // Add token markers
                setTimeout(() => {
                    this.addPhoenixTokenMarkers();
                    this.startGameFeatures();
                }, 1000);

                console.log('✅ Enhanced Phoenix map with boundaries initialized');
                
            } catch (error) {
                console.error('❌ Enhanced map creation error:', error);
            }
        }

        setupEnhancedMapControls() {
            console.log('🖱️ Setting up map controls with boundaries...');
            
            setTimeout(() => {
                const mapContainer = document.getElementById('phoenixMapContainer');
                const zoomInBtn = document.getElementById('zoomInBtn');
                const zoomOutBtn = document.getElementById('zoomOutBtn');
                const centerMapBtn = document.getElementById('centerMapBtn');

                // Enhanced map dragging with boundaries
                if (mapContainer) {
                    let isDragging = false;
                    let startX = 0;
                    let startY = 0;
                    let currentX = this.mapTranslateX;
                    let currentY = this.mapTranslateY;

                    // Get map boundaries
                    const getBoundaries = () => {
                        const containerRect = mapContainer.parentElement.getBoundingClientRect();
                        const mapRect = mapContainer.getBoundingClientRect();
                        
                        return {
                            minX: -(mapRect.width - containerRect.width) / this.mapScale,
                            maxX: 0,
                            minY: -(mapRect.height - containerRect.height) / this.mapScale,
                            maxY: 0
                        };
                    };

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
                        
                        // Apply boundaries
                        const boundaries = getBoundaries();
                        currentX = Math.max(boundaries.minX, Math.min(boundaries.maxX, currentX));
                        currentY = Math.max(boundaries.minY, Math.min(boundaries.maxY, currentY));
                        
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
                    
                    mapContainer.addEventListener('contextmenu', (e) => e.preventDefault());
                }

                // Enhanced zoom controls with boundaries
                if (zoomInBtn) {
                    const zoomInHandler = (e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        
                        const newScale = Math.min(this.mapScale * 1.3, 3);
                        if (newScale !== this.mapScale) {
                            this.mapScale = newScale;
                            this.updateMapTransform(this.mapTranslateX, this.mapTranslateY, this.mapScale);
                            
                            // Visual feedback
                            zoomInBtn.style.transform = 'scale(0.9)';
                            setTimeout(() => {
                                zoomInBtn.style.transform = 'scale(1)';
                            }, 150);
                            
                            if (navigator.vibrate) navigator.vibrate(30);
                            console.log('🔍 Zoomed in to', this.mapScale);
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
                            
                            // Visual feedback
                            zoomOutBtn.style.transform = 'scale(0.9)';
                            setTimeout(() => {
                                zoomOutBtn.style.transform = 'scale(1)';
                            }, 150);
                            
                            if (navigator.vibrate) navigator.vibrate(30);
                            console.log('🔍 Zoomed out to', this.mapScale);
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
                        
                        // Visual feedback
                        centerMapBtn.style.transform = 'scale(0.9)';
                        setTimeout(() => {
                            centerMapBtn.style.transform = 'scale(1)';
                        }, 150);
                        
                        if (navigator.vibrate) navigator.vibrate([30, 10, 30]);
                        console.log('🎯 Map centered and reset');
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

        // =================== TOKEN MARKERS ===================
        addPhoenixTokenMarkers() {
            console.log('💎 Adding Phoenix token markers...');
            try {
                const markersContainer = document.getElementById('phoenixTokenMarkers');
                if (!markersContainer) {
                    console.error('❌ Markers container not found');
                    return;
                }

                markersContainer.innerHTML = '';
                markersContainer.style.pointerEvents = 'none';

                // Phoenix-specific positions
                const phoenixPositions = {
                    1: { x: 49, y: 49 },     // Phoenix Plaza Central (close to player)
                    2: { x: 48, y: 51 },     // Heritage Square (close to player)  
                    3: { x: 51, y: 48 },     // Roosevelt Row Art Walk (close to player)
                    4: { x: 45, y: 55 },     // Chase Field
                    5: { x: 52, y: 47 },     // Phoenix Convention Center
                    6: { x: 35, y: 70 },     // Sky Harbor Airport
                    7: { x: 75, y: 25 },     // Scottsdale Quarter
                    8: { x: 55, y: 65 },     // Desert Botanical Garden
                    9: { x: 65, y: 20 },     // Camelback Mountain
                    10: { x: 52, y: 68 }     // Tempe Town Lake
                };

                let markerCount = 0;
                this.emberTokens.forEach((token) => {
                    if (!this.isTokenCollected(token.id)) {
                        const position = phoenixPositions[token.id] || { x: 50, y: 50 };

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

                        // Value overlay
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

                        // Collection indicator for collectable tokens
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
                            
                            console.log('🎯 Token clicked:', token.location);
                            
                            // Visual feedback
                            marker.style.transform = 'translate(-50%, -50%) scale(1.15)';
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
                        markerCount++;
                    }
                });

                console.log(`✅ Added ${markerCount} token markers`);
                
            } catch (error) {
                console.error('❌ Token markers error:', error);
            }
        }

        // =================== GAME FEATURES ===================
        startGameFeatures() {
            console.log('🎮 Starting game features...');
            this.updateLocationDisplay();
            this.updateNearbyTokens();
            this.updateTokenCounts();
            this.updateVaultStats();
            
            // Hide airdrop on map screen
            if (this.currentMode === 'map') {
                this.hideAirdropNotification();
            }
        }

        updateLocationDisplay() {
            try {
                const elements = [
                    { id: 'currentLat', value: this.userLat.toFixed(4) },
                    { id: 'currentLng', value: this.userLng.toFixed(4) },
                    { id: 'lat', value: this.userLat.toFixed(4) },
                    { id: 'lng', value: this.userLng.toFixed(4) }
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
                const collectableTokens = this.emberTokens
                    .filter(token => !this.isTokenCollected(token.id) && token.collectable)
                    .sort((a, b) => a.distance - b.distance);
                
                const nearbyTokens = this.emberTokens
                    .filter(token => !this.isTokenCollected(token.id) && !token.collectable && token.distance <= 100)
                    .sort((a, b) => a.distance - b.distance);
                
                const allNearbyTokens = [...collectableTokens, ...nearbyTokens].slice(0, 5);

                // Update handle counts
                const nearbyCountElements = [
                    'nearbyTokenCount', 'nearbyTokenCountVault', 
                    'nearbyTokenCountCampaigns'
                ];
                
                nearbyCountElements.forEach(id => {
                    const el = document.getElementById(id);
                    if (el) el.textContent = `${collectableTokens.length} ready`;
                });

                // Update token list
                const tokensList = document.getElementById('tokenLocationsList');
                if (tokensList) {
                    tokensList.innerHTML = allNearbyTokens.map((token) => `
                        <div class="token-location-item ${token.collectable ? 'collectable-token' : ''}" 
                             data-token-id="${token.id}" 
                             style="cursor: pointer; touch-action: manipulation; -webkit-tap-highlight-color: transparent; user-select: none;">
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
                    { id: 'availableTokenCount', text: `${collectableCount} ready to collect` },
                    { id: 'totalAvailable', text: `${availableCount} total available` },
                    { id: 'availableTokens', text: `${availableCount} Available` }
                ];
                
                elements.forEach(({id, text}) => {
                    const el = document.getElementById(id);
                    if (el) el.textContent = text;
                });
            } catch (error) {
                console.error('❌ Token counts error:', error);
            }
        }

        // =================== ENHANCED NAVIGATION MODAL ===================
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
                if (distance) distance.textContent = `${token.distance}m away`;
                
                const walkMinutes = Math.max(1, Math.round(token.distance / 80));
                const driveMinutes = Math.max(1, Math.round(token.distance / 300));
                
                if (walkTime) walkTime.textContent = `~${walkMinutes} min`;
                if (driveTime) driveTime.textContent = `~${driveMinutes} min`;
                
                // Show AR option for collectable tokens
                if (arOption) {
                    if (token.collectable) {
                        arOption.style.display = 'flex';
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

        // =================== AR MODE ===================
        switchMode(mode) {
            console.log('🔄 Switching to mode:', mode);
            try {
                this.currentMode = mode;
                this.setModeAttribute(mode);
                this.updateActiveTab(mode);
                this.updateMenuItems();
                
                // Update airdrop notifications
                this.updateNearestToken();
                
                // Hide all views first
                const views = ['map', 'vaultView', 'campaignsView'];
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
                        this.hideAirdropNotification();
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

        async startARMode() {
            console.log('📱 Starting AR Mode with camera access...');
            try {
                const video = document.getElementById('video');
                const canvas = document.getElementById('canvas');
                const arCoin = document.getElementById('arEmberCoin');
                
                if (!video || !canvas || !arCoin) {
                    console.error('❌ AR elements not found');
                    return;
                }

                // Request camera access
                try {
                    this.cameraStream = await navigator.mediaDevices.getUserMedia({
                        video: { 
                            facingMode: 'environment',
                            width: { ideal: 1920 },
                            height: { ideal: 1080 }
                        }
                    });
                    
                    video.srcObject = this.cameraStream;
                    video.style.display = 'block';
                    canvas.style.display = 'block';
                    
                    // Show AR coin for collection
                    setTimeout(() => {
                        arCoin.style.display = 'block';
                        this.arCoinVisible = true;
                        
                        // Add collection handler
                        const collectHandler = (e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            this.collectARToken();
                        };
                        
                        arCoin.addEventListener('click', collectHandler, { passive: false });
                        arCoin.addEventListener('touchend', collectHandler, { passive: false });
                    }, 1000);
                    
                    console.log('✅ AR camera started successfully');
                    
                } catch (cameraError) {
                    console.error('❌ Camera access denied:', cameraError);
                    alert('Camera access is required for AR mode. Please allow camera access and try again.');
                    this.switchMode('map');
                }
                
            } catch (error) {
                console.error('❌ AR mode error:', error);
                this.switchMode('map');
            }
        }

        collectARToken() {
            console.log('📱 Collecting AR token...');
            
            // Find nearest collectable token
            const collectableToken = this.emberTokens.find(token => 
                !this.isTokenCollected(token.id) && token.collectable
            );
            
            if (collectableToken) {
                this.collectToken(collectableToken);
                
                // Hide AR coin
                const arCoin = document.getElementById('arEmberCoin');
                if (arCoin) arCoin.style.display = 'none';
                this.arCoinVisible = false;
                
                // Switch back to map after collection
                setTimeout(() => {
                    this.switchMode('map');
                }, 2000);
            }
        }

        stopARMode() {
            console.log('📱 Stopping AR mode...');
            try {
                if (this.cameraStream) {
                    this.cameraStream.getTracks().forEach(track => track.stop());
                    this.cameraStream = null;
                }
                
                const video = document.getElementById('video');
                const canvas = document.getElementById('canvas');
                const arCoin = document.getElementById('arEmberCoin');
                
                if (video) video.style.display = 'none';
                if (canvas) canvas.style.display = 'none';
                if (arCoin) {
                    arCoin.style.display = 'none';
                    this.arCoinVisible = false;
                }
                
                console.log('✅ AR mode stopped');
            } catch (error) {
                console.error('❌ AR stop error:', error);
            }
        }

        // =================== VAULT SYSTEM ===================
        updateVaultStats() {
            try {
                const elements = [
                    { id: 'navEmberCount', value: this.totalTokenValue.toLocaleString() },
                    { id: 'menuEmberCount', value: this.totalTokenValue.toLocaleString() },
                    { id: 'vaultBalance', value: `${this.totalTokenValue.toLocaleString()} $Ember Tokens` },
                    { id: 'vaultUsdValue', value: `$${(this.totalTokenValue * 0.001).toFixed(2)} USD` },
                    { id: 'totalCollected', value: this.collectedTokens.length },
                    { id: 'totalValue', value: `$${(this.totalTokenValue * 0.001).toFixed(2)}` },
                    { id: 'locationsVisited', value: new Set(this.collectedTokens.map(t => t.location)).size },
                    { id: 'qrTokenAmount', value: `${this.totalTokenValue} $Ember` },
                    { id: 'qrTokenValue', value: `$${(this.totalTokenValue * 0.001).toFixed(2)} USD` }
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
                // Setup for all module instances
                const moduleIds = [
                    'swipeHandle', 'swipeHandleVault', 'swipeHandleCampaigns'
                ];
                
                moduleIds.forEach(handleId => {
                    const handle = document.getElementById(handleId);
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
                        const moduleId = handleId.replace('swipeHandle', 'tokenLocationsModule') || 'tokenLocationsModule';
                        const module = document.getElementById(moduleId);
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
                                this.expandModule(handleId);
                            } else {
                                this.collapseModule(handleId);
                            }
                        } else {
                            this.toggleModule(handleId);
                        }
                        
                        // Reset opacity
                        const moduleId = handleId.replace('swipeHandle', 'tokenLocationsModule') || 'tokenLocationsModule';
                        const module = document.getElementById(moduleId);
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
                    handle.addEventListener('click', () => this.toggleModule(handleId), { passive: false });
                });
                
                console.log('✅ Enhanced swipeable module setup complete');
            } catch (error) {
                console.error('❌ Swipeable module setup error:', error);
            }
        }

        toggleModule(handleId) {
            const moduleId = this.getModuleId(handleId);
            const module = document.getElementById(moduleId);
            
            if (module) {
                if (module.classList.contains('expanded')) {
                    this.collapseModule(handleId);
                } else {
                    this.expandModule(handleId);
                }
            }
        }

        expandModule(handleId) {
            const moduleId = this.getModuleId(handleId);
            const module = document.getElementById(moduleId);
            
            if (module) {
                module.classList.add('expanded');
                module.classList.remove('collapsed');
                this.moduleExpanded = true;
                
                if (navigator.vibrate) navigator.vibrate(40);
                console.log('📱 Module expanded:', moduleId);
            }
        }

        collapseModule(handleId) {
            const moduleId = this.getModuleId(handleId);
            const module = document.getElementById(moduleId);
            
            if (module) {
                module.classList.remove('expanded');
                module.classList.add('collapsed');
                this.moduleExpanded = false;
                
                if (navigator.vibrate) navigator.vibrate(30);
                console.log('📱 Module collapsed:', moduleId);
            }
        }

        getModuleId(handleId) {
            const mapping = {
                'swipeHandle': 'tokenLocationsModule',
                'swipeHandleVault': 'tokenLocationsModuleVault',
                'swipeHandleCampaigns': 'tokenLocationsModuleCampaigns'
            };
            return mapping[handleId] || 'tokenLocationsModule';
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

                // AR Hunt mode navigation
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

                // Airdrop claim button
                const airdropClaimButton = document.getElementById('airdropClaimButton');
                if (airdropClaimButton) {
                    addUniversalEventListener(airdropClaimButton, (e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        // This will be handled by the showAirdropNotification function
                    });
                }

                // Mode switches when leaving AR
                document.addEventListener('visibilitychange', () => {
                    if (document.hidden && this.currentMode === 'ar') {
                        this.stopARMode();
                    }
                });

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
