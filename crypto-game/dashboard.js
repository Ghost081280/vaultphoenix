// Vault Phoenix AR Crypto Gaming - FIXED DEMO VERSION
// FIXED: Uses simulated GPS location (blue dot) instead of real GPS for perfect demo experience

console.log('🔥💎 Vault Phoenix Game Loading...');

// IMMEDIATE PROTECTION - CHECK IF THIS IS A CRYPTO GAME PAGE
(function() {
    const cryptoFlag = document.getElementById('cryptoGameFlag');
    const isCryptoPage = cryptoFlag || 
                        document.body.classList.contains('crypto-dashboard-page') || 
                        window.location.pathname.includes('crypto-game') ||
                        document.title.includes('Vault Phoenix');
    
    if (!isCryptoPage) {
        console.log('🚫 Not a crypto game page - blocking game JavaScript execution');
        return;
    }
    
    window.isVaultPhoenixGame = true;
    console.log('🔥💎 Game JavaScript ACTIVE - Page confirmed');
})();

// ONLY RUN GAME IF THIS IS A CRYPTO GAME PAGE
if (window.isVaultPhoenixGame) {

    class VaultPhoenixGame {
        constructor() {
            console.log('🔥💎 Vault Phoenix Game initializing...');
            
            // Core game state - FIXED: Use simulated demo location
            this.currentScreen = 'hunt';
            this.playerLat = 33.4484; // Phoenix, AZ DEMO location (blue dot)
            this.playerLng = -112.0740; // This is where the phone "thinks" it is
            this.collectedTokens = [];
            this.totalEmberTokens = 0;
            this.currentDiscoveredToken = null;
            this.currentNavigationToken = null;
            
            // Specific token targeting for AR
            this.targetedTokenForAR = null;
            
            // Map state
            this.mapScale = 1.5;
            this.mapTranslateX = 0;
            this.mapTranslateY = 0;
            this.mapMinScale = 0.8;
            this.mapMaxScale = 3.0;
            this.mapIsDragging = false;
            this.mapDragThreshold = 10;
            
            // AR state with SIMULATED GPS anchoring
            this.cameraStream = null;
            this.arTokens = [];
            this.arUITimer = null;
            this.deviceOrientation = 0; // For compass and GPS anchoring
            this.simulatedHeading = 0; // DEMO compass simulation
            
            // Compass state
            this.compassNeedle = null;
            this.compassSimulationTimer = null;
            
            // Module state
            this.moduleExpanded = false;
            
            // Sponsor expandable state
            this.sponsorExpanded = false;
            
            // OPTIMIZED AIRDROP SYSTEM
            this.airdropShown = sessionStorage.getItem('vaultPhoenix_airdropShown') === 'true';
            this.airdropTimer = null;
            this.pendingAirdropValue = 0;
            
            // FIXED Enhanced $Ember Token System - CORRECTED COORDINATES AND MAP POSITIONS
            this.emberTokens = [
                // COLLECTABLE tokens (close to simulated player position)
                { 
                    id: 1, 
                    value: 500, 
                    location: "Downtown Phoenix Plaza", 
                    lat: 33.4486, // Close to player
                    lng: -112.0742, // Close to player
                    sponsor: "Phoenix Downtown Partnership", 
                    message: "Premium downtown experience awaits!", 
                    description: "Enjoy VIP access to downtown events, priority parking, and exclusive dining experiences at Phoenix's premier entertainment district.",
                    distance: 25, 
                    collectable: true,
                    mapX: 48, mapY: 46,
                    phone: "(602) 555-0123",
                    address: "1 E Washington St, Phoenix, AZ 85004",
                    website: "https://downtownphoenix.com",
                    redemptionOptions: [
                        { icon: "🍽️", cost: "100 $Ember", desc: "Lunch Credit" },
                        { icon: "🅿️", cost: "50 $Ember", desc: "Free Parking" },
                        { icon: "🎫", cost: "200 $Ember", desc: "Event Ticket" },
                        { icon: "☕", cost: "25 $Ember", desc: "Coffee & Pastry" }
                    ]
                },
                { 
                    id: 2, 
                    value: 250, 
                    location: "Heritage Square", 
                    lat: 33.4482, // Close to player
                    lng: -112.0738, // Close to player
                    sponsor: "Arizona Heritage Foundation", 
                    message: "Discover Phoenix history!", 
                    description: "Experience guided historic tours, museum access, and exclusive educational programs celebrating Arizona's rich cultural heritage.",
                    distance: 18, 
                    collectable: true,
                    mapX: 52, mapY: 48,
                    phone: "(602) 555-0124",
                    address: "115 N 6th St, Phoenix, AZ 85004",
                    website: "https://heritagesquarephx.org",
                    redemptionOptions: [
                        { icon: "🏛️", cost: "150 $Ember", desc: "Museum Tour" },
                        { icon: "📚", cost: "75 $Ember", desc: "History Book" },
                        { icon: "🎧", cost: "50 $Ember", desc: "Audio Guide" },
                        { icon: "📸", cost: "100 $Ember", desc: "Photo Package" }
                    ]
                },
                { 
                    id: 3, 
                    value: 300, 
                    location: "Roosevelt Row Arts", 
                    lat: 33.4488, // Close to player
                    lng: -112.0736, // Close to player
                    sponsor: "Local Artists Collective", 
                    message: "Support local Phoenix artists!", 
                    description: "Gain access to exclusive art gallery openings, artist meet-and-greets, and special purchasing opportunities for local artwork.",
                    distance: 22, 
                    collectable: true,
                    mapX: 51, mapY: 52,
                    phone: "(602) 555-0125",
                    address: "300 E Roosevelt St, Phoenix, AZ 85004",
                    website: "https://rooseveltrow.org",
                    redemptionOptions: [
                        { icon: "🎨", cost: "200 $Ember", desc: "Art Print" },
                        { icon: "🖼️", cost: "150 $Ember", desc: "Gallery Pass" },
                        { icon: "☕", cost: "50 $Ember", desc: "Artist Cafe" },
                        { icon: "🎭", cost: "100 $Ember", desc: "Workshop" }
                    ]
                },
                
                // DISTANT tokens (require navigation)
                { 
                    id: 4, 
                    value: 750, 
                    location: "Chase Field", 
                    lat: 33.4453, 
                    lng: -112.0667, 
                    sponsor: "Arizona Diamondbacks", 
                    message: "Baseball season tickets await!", 
                    description: "Experience premium baseball with season ticket holder perks, dugout tours, and exclusive team merchandise discounts.",
                    distance: 850, 
                    collectable: false,
                    mapX: 46, mapY: 58,
                    phone: "(602) 555-0126",
                    address: "401 E Jefferson St, Phoenix, AZ 85004",
                    website: "https://mlb.com/dbacks",
                    redemptionOptions: [
                        { icon: "⚾", cost: "500 $Ember", desc: "Game Ticket" },
                        { icon: "🍕", cost: "100 $Ember", desc: "Concession Credit" },
                        { icon: "👕", cost: "200 $Ember", desc: "Team Jersey" },
                        { icon: "🎫", cost: "300 $Ember", desc: "VIP Experience" }
                    ]
                },
                { 
                    id: 5, 
                    value: 400, 
                    location: "Phoenix Sky Harbor", 
                    lat: 33.4343, 
                    lng: -112.0116, 
                    sponsor: "Sky Harbor Shops", 
                    message: "Travel rewards await!", 
                    description: "Unlock travel perks including priority security, duty-free shopping discounts, and airport lounge access benefits.",
                    distance: 1500, 
                    collectable: false,
                    mapX: 35, mapY: 75,
                    phone: "(602) 555-0127",
                    address: "3400 E Sky Harbor Blvd, Phoenix, AZ 85034",
                    website: "https://skyharbor.com",
                    redemptionOptions: [
                        { icon: "✈️", cost: "300 $Ember", desc: "Lounge Access" },
                        { icon: "🛍️", cost: "150 $Ember", desc: "Duty Free Deal" },
                        { icon: "☕", cost: "50 $Ember", desc: "Airport Cafe" },
                        { icon: "🅿️", cost: "100 $Ember", desc: "Parking Credit" }
                    ]
                },
                { 
                    id: 6, 
                    value: 600, 
                    location: "Scottsdale Quarter", 
                    lat: 33.4942, 
                    lng: -111.9261, 
                    sponsor: "Scottsdale Fashion Square", 
                    message: "Premium shopping rewards!", 
                    description: "Enjoy luxury shopping with VIP personal shopping services, exclusive brand access, and special member-only events.",
                    distance: 2200, 
                    collectable: false,
                    mapX: 75, mapY: 25,
                    phone: "(602) 555-0128",
                    address: "15059 N Scottsdale Rd, Scottsdale, AZ 85254",
                    website: "https://fashionsquare.com",
                    redemptionOptions: [
                        { icon: "🛍️", cost: "400 $Ember", desc: "Shopping Credit" },
                        { icon: "💅", cost: "200 $Ember", desc: "Spa Service" },
                        { icon: "🍽️", cost: "150 $Ember", desc: "Fine Dining" },
                        { icon: "🎁", cost: "100 $Ember", desc: "Gift Wrap" }
                    ]
                },
                { 
                    id: 7, 
                    value: 350, 
                    location: "Desert Botanical Garden", 
                    lat: 33.4619, 
                    lng: -111.9463, 
                    sponsor: "Garden Cafe", 
                    message: "Nature dining experience!", 
                    description: "Experience farm-to-table dining surrounded by stunning desert flora, with guided nature walks and botanical workshops.",
                    distance: 1800, 
                    collectable: false,
                    mapX: 65, mapY: 45,
                    phone: "(602) 555-0129",
                    address: "1201 N Galvin Pkwy, Phoenix, AZ 85008",
                    website: "https://dbg.org",
                    redemptionOptions: [
                        { icon: "🌿", cost: "200 $Ember", desc: "Garden Tour" },
                        { icon: "🥗", cost: "150 $Ember", desc: "Farm Lunch" },
                        { icon: "🌸", cost: "100 $Ember", desc: "Plant Workshop" },
                        { icon: "📸", cost: "75 $Ember", desc: "Photo Tour" }
                    ]
                },
                { 
                    id: 8, 
                    value: 500, 
                    location: "Camelback Mountain", 
                    lat: 33.5186, 
                    lng: -111.9717, 
                    sponsor: "Desert Hiking Adventures", 
                    message: "Gear up for adventure!", 
                    description: "Professional hiking equipment rentals, guided desert expeditions, and exclusive access to member-only trail experiences.",
                    distance: 2800, 
                    collectable: false,
                    mapX: 70, mapY: 20,
                    phone: "(602) 555-0130",
                    address: "5700 N Echo Canyon Pkwy, Phoenix, AZ 85018",
                    website: "https://hikecamelback.com",
                    redemptionOptions: [
                        { icon: "🥾", cost: "300 $Ember", desc: "Gear Rental" },
                        { icon: "🗺️", cost: "150 $Ember", desc: "Guided Hike" },
                        { icon: "💧", cost: "50 $Ember", desc: "Water & Snacks" },
                        { icon: "📱", cost: "100 $Ember", desc: "GPS Device" }
                    ]
                },
                { 
                    id: 9, 
                    value: 200, 
                    location: "Tempe Town Lake", 
                    lat: 33.4255, 
                    lng: -111.9400, 
                    sponsor: "Lakeside Coffee Co.", 
                    message: "Waterfront coffee experience!", 
                    description: "Enjoy artisanal coffee with lakeside seating, co-working space access, and exclusive member brewing workshops.",
                    distance: 1200, 
                    collectable: false,
                    mapX: 60, mapY: 68,
                    phone: "(602) 555-0131",
                    address: "80 W Rio Salado Pkwy, Tempe, AZ 85281",
                    website: "https://lakesidecoffee.com",
                    redemptionOptions: [
                        { icon: "☕", cost: "100 $Ember", desc: "Coffee & Pastry" },
                        { icon: "💻", cost: "150 $Ember", desc: "Co-work Day Pass" },
                        { icon: "🥐", cost: "75 $Ember", desc: "Breakfast Set" },
                        { icon: "📚", cost: "50 $Ember", desc: "WiFi & Book" }
                    ]
                },
                { 
                    id: 10, 
                    value: 450, 
                    location: "Papago Park", 
                    lat: 33.4581, 
                    lng: -111.9485, 
                    sponsor: "Arizona Nature Tours", 
                    message: "Desert adventure awaits!", 
                    description: "Guided desert tours, rock climbing experiences, and exclusive access to hidden geological formations with expert naturalists.",
                    distance: 1600, 
                    collectable: false,
                    mapX: 68, mapY: 42,
                    phone: "(602) 555-0132",
                    address: "625 N Galvin Pkwy, Phoenix, AZ 85008",
                    website: "https://arizonanaturetours.com",
                    redemptionOptions: [
                        { icon: "🧗", cost: "300 $Ember", desc: "Climbing Tour" },
                        { icon: "🌵", cost: "150 $Ember", desc: "Nature Walk" },
                        { icon: "📸", cost: "100 $Ember", desc: "Photo Safari" },
                        { icon: "🎒", cost: "200 $Ember", desc: "Adventure Kit" }
                    ]
                }
            ];

            // Initialize when DOM is ready
            if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', () => this.init());
            } else {
                this.init();
            }
            
            // Make globally accessible
            window.vaultPhoenixGame = this;
        }

        init() {
            console.log('🔧 Initializing Game...');
            try {
                this.loadGameData();
                this.setupEventListeners();
                this.setupSwipeableModule();
                this.initializeMap();
                this.setupDemoCompass(); // FIXED: Demo compass instead of real GPS
                this.updateUI();
                this.switchScreen('hunt');
                
                // Start airdrop system with 7-9 second delay, once per session
                if (!this.airdropShown) {
                    this.startAirdropSystem();
                }
                
                console.log('✅ Game initialized successfully - DEMO MODE');
            } catch (error) {
                console.error('❌ Game initialization error:', error);
            }
        }

        // =================== FIXED DEMO COMPASS SYSTEM =================== 
        setupDemoCompass() {
            console.log('🧭 Setting up DEMO compass...');
            this.compassNeedle = document.getElementById('compassNeedle');
            
            // FIXED: Always use demo compass simulation for consistent demo experience
            this.startDemoCompassSimulation();
        }

        startDemoCompassSimulation() {
            console.log('🧭 Starting demo compass simulation...');
            
            // Simulate realistic compass movement for demo
            let angle = 0;
            this.compassSimulationTimer = setInterval(() => {
                // Simulate natural compass movement
                angle += (Math.random() - 0.5) * 10; // Random movement
                angle = (angle + 360) % 360; // Keep in 0-360 range
                
                this.simulatedHeading = angle;
                this.deviceOrientation = angle;
                this.updateCompass(angle);
                
                // Update AR token positions if in AR mode
                if (this.currentScreen === 'ar') {
                    this.updateARTokenPositions();
                }
            }, 200); // Update every 200ms for smooth movement
        }

        updateCompass(heading) {
            if (this.compassNeedle) {
                // Rotate needle to point north
                this.compassNeedle.style.transform = `rotate(${-heading}deg)`;
            }
        }

        showCompass() {
            const compassContainer = document.getElementById('compassContainer');
            if (compassContainer) {
                compassContainer.style.display = 'block';
            }
        }

        hideCompass() {
            const compassContainer = document.getElementById('compassContainer');
            if (compassContainer) {
                compassContainer.style.display = 'none';
            }
        }

        // =================== AIRDROP SYSTEM =================== 
        startAirdropSystem() {
            if (!this.airdropShown) {
                const delay = (7 + Math.random() * 2) * 1000; // 7-9 seconds delay
                
                this.airdropTimer = setTimeout(() => {
                    this.showAirdropNotification();
                }, delay);
                
                console.log(`🪂 Airdrop scheduled for ${Math.round(delay/1000)} seconds`);
            }
        }

        showAirdropNotification() {
            if (this.airdropShown) return;
            
            const notification = document.getElementById('airdropNotification');
            if (!notification) return;

            console.log('🪂 Showing airdrop notification');
            
            // Random airdrop values
            const airdropValues = [250, 500, 750, 1000];
            const randomValue = airdropValues[Math.floor(Math.random() * airdropValues.length)];

            this.pendingAirdropValue = randomValue;
            this.airdropShown = true;
            
            // Mark as shown in session
            sessionStorage.setItem('vaultPhoenix_airdropShown', 'true');

            // Update notification content
            this.updateAirdropUI();
            
            notification.classList.add('show');
            
            // Haptic feedback
            if (navigator.vibrate) {
                navigator.vibrate([100, 50, 100]);
            }
        }

        updateAirdropUI() {
            const titleEl = document.getElementById('airdropTitle');
            const amountEl = document.getElementById('airdropAmount');
            const subtitleEl = document.getElementById('airdropSubtitle');
            const buttonTextEl = document.getElementById('airdropButtonText');
            
            if (titleEl) titleEl.textContent = '$Ember Airdrop!';
            if (amountEl) amountEl.textContent = `${this.pendingAirdropValue} $Ember`;
            if (subtitleEl) subtitleEl.textContent = 'Limited time bonus - collect now!';
            if (buttonTextEl) buttonTextEl.textContent = 'Collect Now';
        }

        handleAirdropButtonClick() {
            // OPTIMIZED: Just collect and show success, then auto-hide
            this.claimAirdrop();
        }

        claimAirdrop() {
            if (!this.pendingAirdropValue) return;
            
            console.log('🪂 Claiming airdrop:', this.pendingAirdropValue);
            
            // Add airdrop tokens to vault
            this.totalEmberTokens += this.pendingAirdropValue;
            this.collectedTokens.push({
                id: Date.now(),
                value: this.pendingAirdropValue,
                location: 'Airdrop Bonus',
                sponsor: 'Vault Phoenix',
                message: 'Thank you for playing!',
                description: 'Bonus $Ember tokens delivered directly to your vault.',
                collectedAt: new Date().toISOString(),
                collectionMethod: 'Airdrop',
                isAirdrop: true
            });
            
            this.saveGameData();
            this.updateUI();
            this.updateVaultDisplay();
            
            // Update UI to show success
            const titleEl = document.getElementById('airdropTitle');
            const subtitleEl = document.getElementById('airdropSubtitle');
            
            if (titleEl) titleEl.textContent = '$Ember Collected!';
            if (subtitleEl) subtitleEl.textContent = 'Added to your vault successfully!';
            
            if (navigator.vibrate) {
                navigator.vibrate([100, 50, 100, 50, 200]);
            }
            
            // OPTIMIZED: Auto-hide after 3 seconds - no additional button needed
            setTimeout(() => {
                this.hideAirdropNotification();
            }, 3000);
        }

        hideAirdropNotification() {
            const notification = document.getElementById('airdropNotification');
            if (notification) {
                notification.classList.remove('show');
            }
            this.pendingAirdropValue = 0;
        }

        // =================== SCREEN MANAGEMENT ===================
        switchScreen(screen, targetTokenId = null) {
            console.log('🔄 Switching to screen:', screen);
            
            this.currentScreen = screen;
            
            // Always collapse module when switching screens
            this.collapseModule();
            
            // Handle AR token targeting based on how AR was accessed
            if (screen === 'ar') {
                if (targetTokenId) {
                    // Accessed from map or nearby slider - show only this token
                    this.targetedTokenForAR = targetTokenId;
                    console.log('🎯 AR accessed from map/slider - targeting token:', targetTokenId);
                } else {
                    // Accessed directly from navigation - show all available tokens
                    this.targetedTokenForAR = null;
                    console.log('🎯 AR accessed directly - showing all available tokens');
                }
            }
            
            // Hide all screens
            document.querySelectorAll('.hunt-screen, .ar-screen, .vault-screen').forEach(el => {
                el.classList.remove('active');
                el.style.display = 'none';
            });
            
            // Show selected screen
            const targetScreen = document.getElementById(screen + 'Screen');
            if (targetScreen) {
                targetScreen.style.display = 'block';
                targetScreen.classList.add('active');
            }
            
            // Update navigation
            this.updateNavigation();
            
            // Screen-specific actions
            switch (screen) {
                case 'hunt':
                    this.stopARMode();
                    this.hideCompass();
                    this.updateMapTokens();
                    this.centerMapOnPlayer();
                    break;
                case 'ar':
                    this.startARMode();
                    this.showCompass();
                    break;
                case 'vault':
                    this.stopARMode();
                    this.hideCompass();
                    this.updateVaultDisplay();
                    break;
            }
            
            // Update ember tokens slider for all screens
            this.updateNearbyTokens();
        }

        updateNavigation() {
            document.querySelectorAll('.nav-tab').forEach(tab => {
                tab.classList.remove('active');
                if (tab.dataset.mode === this.currentScreen) {
                    tab.classList.add('active');
                }
            });
            
            // Update menu items
            document.querySelectorAll('.menu-item').forEach(item => {
                item.classList.remove('active');
                if (item.dataset.mode === this.currentScreen) {
                    item.classList.add('active');
                }
            });
        }

        // =================== MAP SYSTEM ===================
        initializeMap() {
            console.log('🗺️ Initializing Enhanced Map...');
            
            const mapContainer = document.getElementById('mapContainer');
            const phoenixMap = document.getElementById('phoenixMap');
            
            if (!mapContainer || !phoenixMap) {
                console.error('❌ Map elements not found');
                return;
            }

            this.setupMapControls();
            this.setupMapDragging();
            this.updateMapTokens();
            this.centerMapOnPlayer();
            
            console.log('✅ Map initialized');
        }

        setupMapControls() {
            const zoomInBtn = document.getElementById('zoomInBtn');
            const zoomOutBtn = document.getElementById('zoomOutBtn');
            const centerMapBtn = document.getElementById('centerMapBtn');

            if (zoomInBtn) {
                zoomInBtn.addEventListener('click', (e) => {
                    e.preventDefault();
                    this.zoomMap(1.3);
                });
            }

            if (zoomOutBtn) {
                zoomOutBtn.addEventListener('click', (e) => {
                    e.preventDefault();
                    this.zoomMap(0.7);
                });
            }

            if (centerMapBtn) {
                centerMapBtn.addEventListener('click', (e) => {
                    e.preventDefault();
                    this.centerMapOnPlayer();
                });
            }
        }

        setupMapDragging() {
            const mapContainer = document.getElementById('mapContainer');
            if (!mapContainer) return;

            let isDragging = false;
            let hasMoved = false;
            let startX = 0;
            let startY = 0;
            let startTouchX = 0;
            let startTouchY = 0;
            let currentX = this.mapTranslateX;
            let currentY = this.mapTranslateY;

            const handleStart = (e) => {
                const clientX = e.touches ? e.touches[0].clientX : e.clientX;
                const clientY = e.touches ? e.touches[0].clientY : e.clientY;
                
                isDragging = true;
                hasMoved = false;
                startX = clientX - currentX;
                startY = clientY - currentY;
                startTouchX = clientX;
                startTouchY = clientY;
                
                mapContainer.style.cursor = 'grabbing';
                this.mapIsDragging = false;
            };

            const handleMove = (e) => {
                if (!isDragging) return;
                
                const clientX = e.touches ? e.touches[0].clientX : e.clientX;
                const clientY = e.touches ? e.touches[0].clientY : e.clientY;
                
                const deltaX = Math.abs(clientX - startTouchX);
                const deltaY = Math.abs(clientY - startTouchY);
                const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
                
                if (distance > this.mapDragThreshold) {
                    hasMoved = true;
                    this.mapIsDragging = true;
                    
                    currentX = clientX - startX;
                    currentY = clientY - startY;
                    
                    this.updateMapTransform(currentX, currentY, this.mapScale);
                }
                
                e.preventDefault();
            };

            const handleEnd = (e) => {
                if (!isDragging) return;
                
                isDragging = false;
                this.mapTranslateX = currentX;
                this.mapTranslateY = currentY;
                
                mapContainer.style.cursor = 'grab';
                
                setTimeout(() => {
                    this.mapIsDragging = false;
                }, 100);
                
                e.preventDefault();
            };

            mapContainer.addEventListener('mousedown', handleStart, { passive: false });
            mapContainer.addEventListener('touchstart', handleStart, { passive: false });
            
            document.addEventListener('mousemove', handleMove, { passive: false });
            document.addEventListener('touchmove', handleMove, { passive: false });
            
            document.addEventListener('mouseup', handleEnd, { passive: false });
            document.addEventListener('touchend', handleEnd, { passive: false });
        }

        updateMapTransform(x, y, scale) {
            const phoenixMap = document.getElementById('phoenixMap');
            if (phoenixMap) {
                phoenixMap.style.transform = `translate(${x}px, ${y}px) scale(${scale})`;
            }
        }

        zoomMap(factor) {
            const newScale = Math.max(this.mapMinScale, Math.min(this.mapMaxScale, this.mapScale * factor));
            if (newScale !== this.mapScale) {
                this.mapScale = newScale;
                this.updateMapTransform(this.mapTranslateX, this.mapTranslateY, this.mapScale);
                
                if (navigator.vibrate) navigator.vibrate(30);
            }
        }

        centerMapOnPlayer() {
            this.mapTranslateX = 0;
            this.mapTranslateY = 0;
            this.mapScale = 1.5;
            this.updateMapTransform(0, 0, 1.5);
            
            if (navigator.vibrate) navigator.vibrate([30, 10, 30]);
        }

        // =================== OPTIMIZED MAP TOKENS - NO LABELS ===================
        updateMapTokens() {
            console.log('💎 Updating map tokens...');
            
            const markersContainer = document.getElementById('tokenMarkers');
            if (!markersContainer) return;

            markersContainer.innerHTML = '';

            const availableTokens = this.emberTokens.filter(token => !this.isTokenCollected(token.id));

            availableTokens.forEach((token) => {
                const marker = document.createElement('div');
                marker.className = `token-marker ${token.collectable ? 'collectable' : 'distant'}`;
                marker.style.left = `${token.mapX}%`;
                marker.style.top = `${token.mapY}%`;
                marker.dataset.tokenId = token.id;

                // Token coin (no label)
                const coin = document.createElement('div');
                coin.className = 'token-coin';
                
                const coinImg = document.createElement('img');
                coinImg.src = '../images/VPEmberCoin.PNG';
                coinImg.alt = 'Ember Coin';
                coinImg.className = 'token-coin-img';
                coinImg.onerror = function() {
                    this.style.display = 'none';
                    coin.textContent = '💎';
                    coin.style.fontSize = '20px';
                    coin.style.color = '#f0a500';
                };

                coin.appendChild(coinImg);
                marker.appendChild(coin);

                // Click handler
                const handleTokenClick = (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    
                    if (this.mapIsDragging) {
                        console.log('🚫 Token click blocked - map is dragging');
                        return;
                    }
                    
                    marker.style.transform = 'translate(-50%, -50%) scale(1.1)';
                    setTimeout(() => {
                        marker.style.transform = 'translate(-50%, -50%) scale(1)';
                    }, 200);
                    
                    if (token.collectable) {
                        console.log('🎯 Collectable token tapped - going to AR with token:', token.location);
                        this.switchScreen('ar', token.id);
                    } else {
                        console.log('🗺️ Distant token tapped - showing navigation modal');
                        this.showNavigationModal(token);
                    }
                    
                    if (navigator.vibrate) {
                        navigator.vibrate([50, 20, 50]);
                    }
                };

                marker.addEventListener('click', handleTokenClick, { passive: false });
                marker.addEventListener('touchend', (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    if (!this.mapIsDragging) {
                        handleTokenClick(e);
                    }
                }, { passive: false });

                markersContainer.appendChild(marker);
            });

            console.log(`✅ Updated ${availableTokens.length} map tokens`);
        }

        // =================== FIXED AR SYSTEM - DEMO GPS ANCHORED TOKENS ===================
        async startARMode() {
            console.log('📱 Starting DEMO AR Mode...');
            
            try {
                // Request camera access
                if (!this.cameraStream) {
                    this.cameraStream = await navigator.mediaDevices.getUserMedia({
                        video: { 
                            facingMode: 'environment',
                            width: { ideal: 1920 },
                            height: { ideal: 1080 }
                        }
                    });
                }

                const video = document.getElementById('cameraVideo');
                if (video && this.cameraStream) {
                    video.srcObject = this.cameraStream;
                }

                // FIXED: Create DEMO GPS-anchored AR tokens using simulated location
                this.createDemoGPSAnchoredARTokens();
                
                // Auto-hide AR UI after 6 seconds
                this.startARUITimer();
                
                console.log('✅ DEMO AR mode started with simulated GPS anchoring');
                
            } catch (error) {
                console.error('❌ AR mode error:', error);
                alert('Camera access is required for AR mode. Please allow camera access and try again.');
                this.switchScreen('hunt');
            }
        }

        startARUITimer() {
            const arUI = document.getElementById('arUI');
            if (!arUI) return;
            
            if (this.arUITimer) {
                clearTimeout(this.arUITimer);
            }
            
            arUI.classList.remove('fade-out');
            
            this.arUITimer = setTimeout(() => {
                arUI.classList.add('fade-out');
            }, 6000);
        }

        // FIXED: DEMO GPS-anchored AR tokens using simulated player position
        createDemoGPSAnchoredARTokens() {
            console.log('🪙 Creating DEMO GPS-anchored AR tokens...');
            
            const container = document.getElementById('arTokensContainer');
            if (!container) return;

            container.innerHTML = '';

            let tokensToShow = [];

            if (this.targetedTokenForAR) {
                const targetToken = this.emberTokens.find(t => t.id === this.targetedTokenForAR);
                if (targetToken && !this.isTokenCollected(targetToken.id) && targetToken.collectable) {
                    tokensToShow = [targetToken];
                    console.log('📱 Showing targeted token in AR:', targetToken.location);
                }
            } else {
                tokensToShow = this.emberTokens.filter(token => 
                    !this.isTokenCollected(token.id) && token.collectable
                );
                console.log('📱 Showing all collectable tokens in AR');
            }
            
            if (tokensToShow.length === 0) {
                console.log('📱 No tokens available for AR');
                return;
            }

            tokensToShow.forEach((token, index) => {
                if (index >= 3) return; // Limit to 3 tokens in AR view
                
                const arToken = document.createElement('div');
                arToken.className = 'ar-token near';
                arToken.dataset.tokenId = token.id;
                
                // FIXED: Calculate position using SIMULATED GPS location (blue dot position)
                const position = this.calculateDemoARPosition(token, index);
                arToken.style.left = `${position.x}%`;
                arToken.style.top = `${position.y}%`;
                
                // Token visual - matching map style
                const coin = document.createElement('div');
                coin.className = 'ar-token-coin';
                
                const coinImg = document.createElement('img');
                coinImg.src = '../images/VPEmberCoin.PNG';
                coinImg.alt = 'AR Ember Coin';
                coinImg.className = 'ar-token-img';
                coinImg.onerror = function() {
                    this.style.display = 'none';
                    coin.textContent = '💎';
                    coin.style.fontSize = '20px';
                    coin.style.color = '#f0a500';
                };
                
                coin.appendChild(coinImg);
                arToken.appendChild(coin);
                
                // Click handler for collection with haptic feedback
                arToken.addEventListener('click', (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    
                    // OPTIMIZED: Strong haptic feedback on collection
                    if (navigator.vibrate) {
                        navigator.vibrate([200, 100, 200, 100, 300]);
                    }
                    
                    this.collectToken(token, true);
                });
                
                container.appendChild(arToken);
            });
            
            console.log(`✅ Created ${Math.min(tokensToShow.length, 3)} DEMO GPS-anchored AR tokens`);
        }

        // FIXED: Calculate AR token position based on SIMULATED GPS coordinates and demo compass
        calculateDemoARPosition(token, index) {
            // FIXED: Use simulated player location (blue dot) instead of real GPS
            const bearing = this.calculateBearing(
                this.playerLat, this.playerLng, // Use demo position
                token.lat, token.lng
            );
            
            // FIXED: Adjust bearing based on simulated device orientation
            const adjustedBearing = (bearing - this.simulatedHeading + 360) % 360;
            
            // Convert bearing to screen position
            // Map 360 degrees to screen width
            let x = (adjustedBearing / 360) * 100;
            
            // Wrap around if needed
            if (x > 100) x -= 100;
            if (x < 0) x += 100;
            
            // FIXED: Vertical position based on actual GPS distance from simulated position
            const distance = this.calculateDistance(
                this.playerLat, this.playerLng, // Use demo position
                token.lat, token.lng
            );
            
            // FIXED: Better positioning for demo - closer tokens appear lower and larger
            const y = Math.max(30, Math.min(70, 60 - (distance / 50)));
            
            console.log(`🎯 Token ${token.location}: bearing=${bearing.toFixed(1)}°, adjusted=${adjustedBearing.toFixed(1)}°, distance=${distance.toFixed(0)}m, x=${x.toFixed(1)}%, y=${y.toFixed(1)}%`);
            
            return { x, y };
        }

        // Update AR token positions based on simulated device orientation changes
        updateARTokenPositions() {
            if (this.currentScreen !== 'ar') return;
            
            const arTokens = document.querySelectorAll('.ar-token');
            arTokens.forEach((arToken, index) => {
                const tokenId = parseInt(arToken.dataset.tokenId);
                const token = this.emberTokens.find(t => t.id === tokenId);
                
                if (token) {
                    const position = this.calculateDemoARPosition(token, index);
                    arToken.style.left = `${position.x}%`;
                    arToken.style.top = `${position.y}%`;
                }
            });
        }

        // Calculate bearing between two GPS coordinates
        calculateBearing(lat1, lng1, lat2, lng2) {
            const dLng = (lng2 - lng1) * Math.PI / 180;
            const lat1Rad = lat1 * Math.PI / 180;
            const lat2Rad = lat2 * Math.PI / 180;
            
            const y = Math.sin(dLng) * Math.cos(lat2Rad);
            const x = Math.cos(lat1Rad) * Math.sin(lat2Rad) - 
                     Math.sin(lat1Rad) * Math.cos(lat2Rad) * Math.cos(dLng);
            
            let bearing = Math.atan2(y, x) * 180 / Math.PI;
            return (bearing + 360) % 360;
        }

        // Calculate distance between two GPS coordinates
        calculateDistance(lat1, lng1, lat2, lng2) {
            const R = 6371e3; // Earth's radius in meters
            const φ1 = lat1 * Math.PI/180;
            const φ2 = lat2 * Math.PI/180;
            const Δφ = (lat2-lat1) * Math.PI/180;
            const Δλ = (lng2-lng1) * Math.PI/180;

            const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
                     Math.cos(φ1) * Math.cos(φ2) *
                     Math.sin(Δλ/2) * Math.sin(Δλ/2);
            const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

            return R * c;
        }

        stopARMode() {
            console.log('📱 Stopping AR mode...');
            
            // Stop camera stream
            if (this.cameraStream) {
                this.cameraStream.getTracks().forEach(track => track.stop());
                this.cameraStream = null;
                
                const video = document.getElementById('cameraVideo');
                if (video) {
                    video.srcObject = null;
                }
            }
            
            // Clear AR tokens
            const arContainer = document.getElementById('arTokensContainer');
            if (arContainer) {
                arContainer.innerHTML = '';
            }
            
            // Clear AR UI timer
            if (this.arUITimer) {
                clearTimeout(this.arUITimer);
                this.arUITimer = null;
            }
            
            console.log('✅ AR mode stopped');
        }

        // =================== TOKEN COLLECTION ===================
        collectToken(token, fromAR = false) {
            console.log('💎 Collecting token:', token.location, fromAR ? '(from AR)' : '(from Hunt)');
            
            // Add to collected tokens
            const collectedToken = {
                ...token,
                collectedAt: new Date().toISOString(),
                collectionMethod: fromAR ? 'AR Hunt' : 'Map Collection'
            };
            
            this.collectedTokens.push(collectedToken);
            this.totalEmberTokens += token.value;
            this.saveGameData();
            
            // Update UI
            this.updateUI();
            this.updateMapTokens();
            this.updateNearbyTokens();
            this.updateVaultDisplay();
            
            // Show collection modal with appropriate buttons
            this.showTokenModal(token, fromAR);
            
            // Remove from AR if in AR mode
            if (fromAR) {
                const arToken = document.querySelector(`[data-token-id="${token.id}"]`);
                if (arToken && arToken.closest('.ar-tokens-container')) {
                    arToken.style.animation = 'none';
                    arToken.style.transform = 'translateY(-50%) scale(0)';
                    arToken.style.opacity = '0';
                    setTimeout(() => {
                        if (arToken.parentNode) arToken.parentNode.removeChild(arToken);
                    }, 300);
                }
            }
            
            // Clear targeted token after collection
            if (this.targetedTokenForAR === token.id) {
                this.targetedTokenForAR = null;
            }
            
            console.log('✅ Token collected successfully');
        }

        // =================== TOKEN MODAL ===================
        showTokenModal(token, fromAR = false) {
            const modal = document.getElementById('tokenModal');
            if (!modal) return;
            
            this.currentDiscoveredToken = token;
            this.sponsorExpanded = false;
            
            // Update header based on collection state
            const titleEl = document.getElementById('tokenFoundTitle');
            if (titleEl) {
                if (fromAR) {
                    titleEl.innerHTML = '<span>🔥 $Ember Token Collected!</span>';
                } else {
                    titleEl.innerHTML = '<span>🔥 $Ember Token Found!</span>';
                }
            }
            
            // Update modal content
            const elements = {
                tokenAmountBadge: document.getElementById('tokenAmountBadge'),
                discoveredTokenAmount: document.getElementById('discoveredTokenAmount'),
                discoveredTokenUSD: document.getElementById('discoveredTokenUSD'),
                discoveredTokenLocation: document.getElementById('discoveredTokenLocation'),
                sponsorTitle: document.getElementById('sponsorTitle'),
                sponsorText: document.getElementById('sponsorText'),
                sponsorDescription: document.getElementById('sponsorDescription'),
                tokenActions: document.getElementById('tokenActions'),
                tokenCollectionActions: document.getElementById('tokenCollectionActions')
            };
            
            if (elements.tokenAmountBadge) elements.tokenAmountBadge.textContent = `${token.value} $Ember`;
            if (elements.discoveredTokenAmount) elements.discoveredTokenAmount.textContent = `${token.value} $Ember`;
            if (elements.discoveredTokenUSD) elements.discoveredTokenUSD.textContent = `~${(token.value * 0.001).toFixed(2)} USD`;
            if (elements.discoveredTokenLocation) elements.discoveredTokenLocation.textContent = token.location;
            if (elements.sponsorTitle) elements.sponsorTitle.textContent = `Sponsored by ${token.sponsor}`;
            if (elements.sponsorText) elements.sponsorText.textContent = token.message;
            if (elements.sponsorDescription) elements.sponsorDescription.textContent = token.description;
            
            // Populate redemption options
            this.populateRedemptionOptions(token);
            
            // Show appropriate action buttons
            if (fromAR) {
                // From AR - show "Go to Hunt" and "Go to Vault"
                if (elements.tokenActions) elements.tokenActions.style.display = 'none';
                if (elements.tokenCollectionActions) elements.tokenCollectionActions.style.display = 'flex';
            } else {
                // From Hunt - show "Collect $Ember" and "Close"
                if (elements.tokenActions) elements.tokenActions.style.display = 'flex';
                if (elements.tokenCollectionActions) elements.tokenCollectionActions.style.display = 'none';
            }
            
            modal.classList.add('show');
            modal.style.display = 'flex';
        }

        populateRedemptionOptions(token) {
            const container = document.getElementById('redemptionOptionsCompact');
            if (!container || !token.redemptionOptions) return;
            
            container.innerHTML = token.redemptionOptions.map(option => `
                <div class="redemption-option-compact">
                    <span class="redemption-option-icon">${option.icon}</span>
                    <div class="redemption-option-cost">${option.cost}</div>
                    <div class="redemption-option-desc">${option.desc}</div>
                </div>
            `).join('');
        }

        toggleSponsorDetails() {
            const expandableSection = document.getElementById('sponsorDetailsExpandable');
            const toggleIcon = document.getElementById('toggleIcon');
            const toggleText = document.getElementById('toggleText');
            
            if (!expandableSection || !toggleIcon || !toggleText) return;
            
            this.sponsorExpanded = !this.sponsorExpanded;
            
            if (this.sponsorExpanded) {
                expandableSection.style.display = 'block';
                toggleIcon.classList.add('expanded');
                toggleText.textContent = 'Show Less';
                console.log('📖 Sponsor details expanded');
            } else {
                expandableSection.style.display = 'none';
                toggleIcon.classList.remove('expanded');
                toggleText.textContent = 'Learn More';
                console.log('📖 Sponsor details collapsed');
            }
            
            if (navigator.vibrate) {
                navigator.vibrate(30);
            }
        }

        getDirectionsToLocation() {
            if (!this.currentDiscoveredToken) return;
            
            const token = this.currentDiscoveredToken;
            const destination = token.address || `${token.lat},${token.lng}`;
            const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
            
            const mapsUrl = isIOS ? 
                `maps://maps.google.com/maps?daddr=${encodeURIComponent(destination)}` :
                `https://maps.google.com/maps?daddr=${encodeURIComponent(destination)}`;
            
            window.open(mapsUrl, '_blank');
            console.log('🗺️ Opening directions to:', destination);
        }

        learnMoreWebsite() {
            if (!this.currentDiscoveredToken || !this.currentDiscoveredToken.website) return;
            
            window.open(this.currentDiscoveredToken.website, '_blank');
            console.log('🌐 Opening website:', this.currentDiscoveredToken.website);
        }

        hideTokenModal() {
            const modal = document.getElementById('tokenModal');
            if (modal) {
                modal.classList.remove('show');
                modal.style.display = 'none';
            }
            this.currentDiscoveredToken = null;
            this.sponsorExpanded = false;
        }

        goToHunt() {
            this.hideTokenModal();
            this.switchScreen('hunt');
        }

        goToVault() {
            this.hideTokenModal();
            this.switchScreen('vault');
        }

        // =================== NAVIGATION MODAL ===================
        showNavigationModal(token) {
            const modal = document.getElementById('navigationModal');
            if (!modal) return;
            
            this.currentNavigationToken = token;
            
            // Update modal content
            const elements = {
                navTokenName: document.getElementById('navTokenName'),
                navDistance: document.getElementById('navDistance'),
                navEmberAmount: document.getElementById('navEmberAmount'),
                navWalkTime: document.getElementById('navWalkTime'),
                navDriveTime: document.getElementById('navDriveTime'),
                navAR: document.getElementById('navAR')
            };
            
            if (elements.navTokenName) elements.navTokenName.textContent = token.location;
            if (elements.navDistance) elements.navDistance.textContent = `${token.distance}m away`;
            if (elements.navEmberAmount) elements.navEmberAmount.textContent = `${token.value} $Ember`;
            
            const walkMinutes = Math.max(1, Math.round(token.distance / 80));
            const driveMinutes = Math.max(1, Math.round(token.distance / 300));
            
            if (elements.navWalkTime) elements.navWalkTime.textContent = `~${walkMinutes} min`;
            if (elements.navDriveTime) elements.navDriveTime.textContent = `~${driveMinutes} min`;
            
            // Show "Collect $Ember" option ONLY for collectable tokens
            if (elements.navAR) {
                if (token.collectable) {
                    elements.navAR.style.display = 'flex';
                    const titleEl = elements.navAR.querySelector('.navigation-option-title');
                    if (titleEl) titleEl.textContent = 'Collect $Ember';
                } else {
                    elements.navAR.style.display = 'none';
                }
            }
            
            modal.classList.add('show');
            modal.style.display = 'flex';
        }

        hideNavigationModal() {
            const modal = document.getElementById('navigationModal');
            if (modal) {
                modal.classList.remove('show');
                modal.style.display = 'none';
            }
            this.currentNavigationToken = null;
        }

        openMapsNavigation(mode) {
            if (!this.currentNavigationToken) return;
            
            const token = this.currentNavigationToken;
            
            if (mode === 'ar') {
                this.targetedTokenForAR = token.id;
                this.switchScreen('ar', token.id);
                this.hideNavigationModal();
                console.log('🎯 Targeting token for AR:', token.location);
                return;
            }
            
            const destination = token.address || `${token.lat},${token.lng}`;
            const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
            
            let mapsUrl;
            if (mode === 'walking') {
                mapsUrl = isIOS ? 
                    `maps://maps.google.com/maps?daddr=${encodeURIComponent(destination)}&dirflg=w` :
                    `https://maps.google.com/maps?daddr=${encodeURIComponent(destination)}&dirflg=w`;
            } else if (mode === 'driving') {
                mapsUrl = isIOS ? 
                    `maps://maps.google.com/maps?daddr=${encodeURIComponent(destination)}&dirflg=d` :
                    `https://maps.google.com/maps?daddr=${encodeURIComponent(destination)}&dirflg=d`;
            }
            
            if (mapsUrl) {
                window.open(mapsUrl, '_blank');
                this.hideNavigationModal();
            }
        }

        // =================== VAULT SYSTEM ===================
        updateVaultDisplay() {
            console.log('🔒 Updating vault display...');
            
            const elements = {
                vaultBalance: document.getElementById('vaultBalance'),
                vaultUsdValue: document.getElementById('vaultUsdValue'),
                totalCollected: document.getElementById('totalCollected'),
                locationsVisited: document.getElementById('locationsVisited'),
                totalValue: document.getElementById('totalValue'),
                lastActivity: document.getElementById('lastActivity'),
                tokenHistory: document.getElementById('tokenHistory')
            };
            
            if (elements.vaultBalance) {
                elements.vaultBalance.textContent = `${this.totalEmberTokens.toLocaleString()} $Ember Tokens`;
            }
            
            if (elements.vaultUsdValue) {
                elements.vaultUsdValue.textContent = `${(this.totalEmberTokens * 0.001).toFixed(2)} USD`;
            }
            
            if (elements.totalCollected) {
                elements.totalCollected.textContent = this.totalEmberTokens.toLocaleString();
            }
            
            if (elements.locationsVisited) {
                const uniqueLocations = new Set(this.collectedTokens.map(t => t.location)).size;
                elements.locationsVisited.textContent = uniqueLocations;
            }
            
            if (elements.totalValue) {
                elements.totalValue.textContent = `${(this.totalEmberTokens * 0.001).toFixed(2)}`;
            }
            
            if (elements.lastActivity && this.collectedTokens.length > 0) {
                elements.lastActivity.textContent = 'Today';
            }
            
            this.updateTokenHistory();
        }

        updateTokenHistory() {
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
                const recentTokens = [...this.collectedTokens].reverse();
                
                historyContainer.innerHTML = recentTokens.map(token => `
                    <div class="history-item">
                        <div class="history-icon">
                            <img src="../images/VPEmberCoin.PNG" alt="Ember" class="history-coin-icon" onerror="this.textContent='💎'">
                        </div>
                        <div class="history-details">
                            <div class="history-title">${token.location}</div>
                            <div class="history-subtitle">${token.sponsor} • ${token.collectionMethod}</div>
                        </div>
                        <div class="history-value">+${token.value}</div>
                    </div>
                `).join('');
            }
        }

        // =================== OPTIMIZED NEARBY TOKENS SLIDER ===================
        updateNearbyTokens() {
            console.log('🔍 Updating nearby tokens...');
            
            const availableTokens = this.emberTokens.filter(token => !this.isTokenCollected(token.id));
            const collectableTokens = availableTokens.filter(token => token.collectable);
            
            // Update handle count
            const nearbyCountEl = document.getElementById('nearbyTokenCount');
            if (nearbyCountEl) {
                if (collectableTokens.length > 0) {
                    nearbyCountEl.textContent = `${collectableTokens.length} ready`;
                } else {
                    // OPTIMIZED: Change to "Keep Exploring" when all collected
                    nearbyCountEl.textContent = 'Keep Exploring';
                }
            }
            
            // Update total available
            const totalAvailableEl = document.getElementById('totalAvailable');
            if (totalAvailableEl) {
                totalAvailableEl.textContent = `Ready for collection`;
            }

            // Update AR badge in menu
            const nearbyARTokensEl = document.getElementById('nearbyARTokens');
            if (nearbyARTokensEl) {
                if (collectableTokens.length > 0) {
                    nearbyARTokensEl.textContent = `${collectableTokens.length} ready`;
                } else {
                    nearbyARTokensEl.textContent = 'Keep exploring';
                }
            }

            // Update token list
            const tokensList = document.getElementById('tokenLocationsList');
            if (tokensList) {
                if (collectableTokens.length === 0) {
                    tokensList.innerHTML = `
                        <div style="text-align: center; padding: 40px 20px; color: rgba(255, 255, 255, 0.6);">
                            <div style="font-size: 48px; margin-bottom: 16px;">🎉</div>
                            <div style="font-size: 16px; font-weight: 600; margin-bottom: 8px;">All Nearby Tokens Collected!</div>
                            <div style="font-size: 14px;">Explore further to find more distant tokens</div>
                        </div>
                    `;
                } else {
                    tokensList.innerHTML = collectableTokens.map((token) => `
                        <div class="token-location-item collectable-token" 
                             data-token-id="${token.id}">
                            <div class="token-location-icon collectable-icon">
                                <img src="../images/VPEmberCoin.PNG" alt="Ember Coin" onerror="this.textContent='💎'">
                            </div>
                            <div class="token-location-info">
                                <div class="token-location-name">${token.location}</div>
                                <div class="token-location-distance">
                                    ${token.distance}m away • 📱 Ready to Collect
                                </div>
                                <div class="token-sponsor">${token.sponsor}</div>
                            </div>
                            <div class="token-location-value">${token.value} $Ember</div>
                        </div>
                    `).join('');

                    // Add click handlers for ember tokens nearby
                    tokensList.querySelectorAll('.token-location-item').forEach(item => {
                        const handleClick = (e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            
                            const tokenId = parseInt(item.dataset.tokenId);
                            const token = this.emberTokens.find(t => t.id === tokenId);
                            if (token) {
                                item.style.transform = 'translateY(-4px) scale(1.02)';
                                setTimeout(() => {
                                    item.style.transform = '';
                                }, 200);
                                
                                console.log('🎯 Nearby token tapped - going to AR with token:', token.location);
                                this.switchScreen('ar', token.id);
                                this.collapseModule();
                                
                                if (navigator.vibrate) navigator.vibrate([40, 15, 40]);
                            }
                        };

                        item.addEventListener('click', handleClick);
                        item.addEventListener('touchend', handleClick);
                    });
                }
            }
        }

        setupSwipeableModule() {
            console.log('👆 Setting up swipeable module...');
            
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
                
                e.preventDefault();
            };

            handle.addEventListener('touchstart', handleTouchStart, { passive: false });
            handle.addEventListener('touchmove', handleTouchMove, { passive: false });
            handle.addEventListener('touchend', handleTouchEnd, { passive: false });
            handle.addEventListener('mousedown', handleTouchStart, { passive: false });
            handle.addEventListener('mousemove', handleTouchMove, { passive: false });
            handle.addEventListener('mouseup', handleTouchEnd, { passive: false });
            handle.addEventListener('click', () => this.toggleModule(), { passive: false });
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
            }
        }

        collapseModule() {
            const module = document.getElementById('tokenLocationsModule');
            if (module) {
                module.classList.remove('expanded');
                module.classList.add('collapsed');
                this.moduleExpanded = false;
                
                if (navigator.vibrate) navigator.vibrate(30);
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

        // =================== RESET GAME ===================
        resetGame() {
            console.log('🔄 Resetting game...');
            try {
                this.collectedTokens = [];
                this.totalEmberTokens = 0;
                this.airdropShown = false;
                this.targetedTokenForAR = null;
                
                localStorage.removeItem('vaultPhoenix_collectedTokens');
                localStorage.removeItem('vaultPhoenix_totalEmberTokens');
                sessionStorage.removeItem('vaultPhoenix_airdropShown');
                
                this.updateUI();
                this.updateVaultDisplay();
                this.updateNearbyTokens();
                
                setTimeout(() => {
                    this.updateMapTokens();
                }, 500);
                
                // Restart airdrop system
                this.startAirdropSystem();
                
                console.log('✅ Game reset successfully');
                
            } catch (error) {
                console.error('❌ Game reset error:', error);
            }
        }

        // =================== QR CODE SYSTEM ===================
        showQRModal() {
            const modal = document.getElementById('qrModal');
            if (modal) {
                // Update QR modal with current balance
                const qrTokenAmount = document.getElementById('qrTokenAmount');
                const qrTokenValue = document.getElementById('qrTokenValue');
                
                if (qrTokenAmount) {
                    qrTokenAmount.textContent = `${this.totalEmberTokens.toLocaleString()} $Ember`;
                }
                
                if (qrTokenValue) {
                    qrTokenValue.textContent = `${(this.totalEmberTokens * 0.001).toFixed(2)} USD`;
                }
                
                modal.classList.add('show');
                modal.style.display = 'flex';
            }
        }

        hideQRModal() {
            const modal = document.getElementById('qrModal');
            if (modal) {
                modal.classList.remove('show');
                modal.style.display = 'none';
            }
        }

        // =================== DATA PERSISTENCE ===================
        saveGameData() {
            try {
                localStorage.setItem('vaultPhoenix_collectedTokens', JSON.stringify(this.collectedTokens));
                localStorage.setItem('vaultPhoenix_totalEmberTokens', this.totalEmberTokens.toString());
            } catch (error) {
                console.error('❌ Save error:', error);
            }
        }

        loadGameData() {
            try {
                const savedTokens = localStorage.getItem('vaultPhoenix_collectedTokens');
                if (savedTokens) {
                    this.collectedTokens = JSON.parse(savedTokens);
                }
                
                const savedTotal = localStorage.getItem('vaultPhoenix_totalEmberTokens');
                if (savedTotal) {
                    this.totalEmberTokens = parseInt(savedTotal) || 0;
                }
                
                console.log(`💰 Loaded ${this.collectedTokens.length} collected tokens`);
            } catch (error) {
                console.error('❌ Load error:', error);
                this.collectedTokens = [];
                this.totalEmberTokens = 0;
            }
        }

        isTokenCollected(tokenId) {
            return this.collectedTokens.some(token => token.id === tokenId);
        }

        // =================== UI UPDATES ===================
        updateUI() {
            // Update ember count in navigation
            const navEmberCount = document.getElementById('navEmberCount');
            if (navEmberCount) {
                navEmberCount.textContent = this.totalEmberTokens.toLocaleString();
            }
            
            // Update ember count in menu
            const menuEmberCount = document.getElementById('menuEmberCount');
            if (menuEmberCount) {
                menuEmberCount.textContent = this.totalEmberTokens.toLocaleString();
            }
        }

        // =================== EVENT LISTENERS ===================
        setupEventListeners() {
            console.log('🎧 Setting up event listeners...');
            
            // Navigation tabs
            document.querySelectorAll('.nav-tab').forEach(tab => {
                tab.addEventListener('click', (e) => {
                    e.preventDefault();
                    const mode = tab.dataset.mode;
                    if (mode) {
                        this.switchScreen(mode);
                    }
                });
            });

            // Menu items with mode switching
            document.querySelectorAll('.menu-item[data-mode]').forEach(item => {
                item.addEventListener('click', (e) => {
                    e.preventDefault();
                    const mode = item.dataset.mode;
                    if (mode) {
                        this.switchScreen(mode);
                        this.hideMenu();
                    }
                });
            });

            // Home button (logo)
            const homeBtn = document.getElementById('homeBtn');
            if (homeBtn) {
                homeBtn.addEventListener('click', (e) => {
                    e.preventDefault();
                    this.switchScreen('hunt');
                });
            }

            // Vault badge
            const vaultBadge = document.getElementById('vaultBadge');
            if (vaultBadge) {
                vaultBadge.addEventListener('click', (e) => {
                    e.preventDefault();
                    this.switchScreen('vault');
                });
            }

            // Menu toggle
            const menuToggle = document.getElementById('menuToggle');
            if (menuToggle) {
                menuToggle.addEventListener('click', (e) => {
                    e.preventDefault();
                    this.toggleMenu();
                });
            }

            // Menu overlay
            const menuOverlay = document.getElementById('menuOverlay');
            if (menuOverlay) {
                menuOverlay.addEventListener('click', (e) => {
                    e.preventDefault();
                    this.hideMenu();
                });
            }

            // Airdrop button
            const airdropClaimButton = document.getElementById('airdropClaimButton');
            if (airdropClaimButton) {
                airdropClaimButton.addEventListener('click', (e) => {
                    e.preventDefault();
                    this.handleAirdropButtonClick();
                });
            }

            // Token modal buttons
            const collectTokenBtn = document.getElementById('collectTokenBtn');
            const goToHuntBtn = document.getElementById('goToHuntBtn');
            const goToVaultBtn = document.getElementById('goToVaultBtn');
            const closeTokenModalBtn = document.getElementById('closeTokenModalBtn');
            
            if (collectTokenBtn) {
                collectTokenBtn.addEventListener('click', (e) => {
                    e.preventDefault();
                    if (this.currentDiscoveredToken) {
                        this.collectToken(this.currentDiscoveredToken, false);
                    }
                });
            }
            
            if (goToHuntBtn) {
                goToHuntBtn.addEventListener('click', (e) => {
                    e.preventDefault();
                    this.goToHunt();
                });
            }
            
            if (goToVaultBtn) {
                goToVaultBtn.addEventListener('click', (e) => {
                    e.preventDefault();
                    this.goToVault();
                });
            }
            
            if (closeTokenModalBtn) {
                closeTokenModalBtn.addEventListener('click', (e) => {
                    e.preventDefault();
                    this.hideTokenModal();
                });
            }

            // Learn More Toggle Button
            const learnMoreToggle = document.getElementById('learnMoreToggle');
            if (learnMoreToggle) {
                learnMoreToggle.addEventListener('click', (e) => {
                    e.preventDefault();
                    this.toggleSponsorDetails();
                });
            }

            // Location Action Buttons
            const getDirectionsBtn = document.getElementById('getDirectionsBtn');
            const learnMoreWebsiteBtn = document.getElementById('learnMoreWebsiteBtn');
            
            if (getDirectionsBtn) {
                getDirectionsBtn.addEventListener('click', (e) => {
                    e.preventDefault();
                    this.getDirectionsToLocation();
                });
            }
            
            if (learnMoreWebsiteBtn) {
                learnMoreWebsiteBtn.addEventListener('click', (e) => {
                    e.preventDefault();
                    this.learnMoreWebsite();
                });
            }

            // Navigation modal buttons
            const navClose = document.getElementById('navClose');
            const navWalking = document.getElementById('navWalking');
            const navDriving = document.getElementById('navDriving');
            const navAR = document.getElementById('navAR');
            
            if (navClose) {
                navClose.addEventListener('click', (e) => {
                    e.preventDefault();
                    this.hideNavigationModal();
                });
            }
            
            if (navWalking) {
                navWalking.addEventListener('click', (e) => {
                    e.preventDefault();
                    this.openMapsNavigation('walking');
                });
            }
            
            if (navDriving) {
                navDriving.addEventListener('click', (e) => {
                    e.preventDefault();
                    this.openMapsNavigation('driving');
                });
            }

            if (navAR) {
                navAR.addEventListener('click', (e) => {
                    e.preventDefault();
                    this.openMapsNavigation('ar');
                });
            }

            // QR modal
            const redeemQRBtn = document.getElementById('redeemQRBtn');
            const redeemTokens = document.getElementById('redeemTokens');
            const qrClose = document.getElementById('qrClose');
            
            if (redeemQRBtn) {
                redeemQRBtn.addEventListener('click', (e) => {
                    e.preventDefault();
                    this.showQRModal();
                });
            }
            
            if (redeemTokens) {
                redeemTokens.addEventListener('click', (e) => {
                    e.preventDefault();
                    this.showQRModal();
                });
            }
            
            if (qrClose) {
                qrClose.addEventListener('click', (e) => {
                    e.preventDefault();
                    this.hideQRModal();
                });
            }

            // Reset game
            const resetGameBtn = document.getElementById('resetGameBtn');
            const confirmResetGame = document.getElementById('confirmResetGame');
            const cancelResetGame = document.getElementById('cancelResetGame');
            
            if (resetGameBtn) {
                resetGameBtn.addEventListener('click', (e) => {
                    e.preventDefault();
                    const modal = document.getElementById('resetGameOverlay');
                    if (modal) {
                        modal.classList.add('show');
                        modal.style.display = 'flex';
                    }
                });
            }
            
            if (confirmResetGame) {
                confirmResetGame.addEventListener('click', (e) => {
                    e.preventDefault();
                    this.resetGame();
                    const modal = document.getElementById('resetGameOverlay');
                    if (modal) {
                        modal.classList.remove('show');
                        modal.style.display = 'none';
                    }
                });
            }
            
            if (cancelResetGame) {
                cancelResetGame.addEventListener('click', (e) => {
                    e.preventDefault();
                    const modal = document.getElementById('resetGameOverlay');
                    if (modal) {
                        modal.classList.remove('show');
                        modal.style.display = 'none';
                    }
                });
            }

            // Logout
            const sideMenuLogout = document.getElementById('sideMenuLogout');
            const confirmLogout = document.getElementById('confirmLogout');
            const cancelLogout = document.getElementById('cancelLogout');
            
            if (sideMenuLogout) {
                sideMenuLogout.addEventListener('click', (e) => {
                    e.preventDefault();
                    const modal = document.getElementById('logoutOverlay');
                    if (modal) {
                        modal.classList.add('show');
                        modal.style.display = 'flex';
                    }
                });
            }
            
            if (confirmLogout) {
                confirmLogout.addEventListener('click', (e) => {
                    e.preventDefault();
                    window.location.href = '../';
                });
            }
            
            if (cancelLogout) {
                cancelLogout.addEventListener('click', (e) => {
                    e.preventDefault();
                    const modal = document.getElementById('logoutOverlay');
                    if (modal) {
                        modal.classList.remove('show');
                        modal.style.display = 'none';
                    }
                });
            }

            // Coinbase integration placeholder
            const coinbaseTransferBtn = document.getElementById('coinbaseTransferBtn');
            const coinbaseWallet = document.getElementById('coinbaseWallet');
            
            if (coinbaseTransferBtn) {
                coinbaseTransferBtn.addEventListener('click', (e) => {
                    e.preventDefault();
                    alert('Coinbase Wallet integration coming soon!');
                });
            }
            
            if (coinbaseWallet) {
                coinbaseWallet.addEventListener('click', (e) => {
                    e.preventDefault();
                    alert('Coinbase Wallet integration coming soon!');
                });
            }

            console.log('✅ Event listeners setup complete');
        }

        // =================== CLEANUP ON DESTROY ===================
        destroy() {
            console.log('🧹 Cleaning up game resources...');
            
            // Stop AR mode if active
            this.stopARMode();
            
            // Clear timers
            if (this.airdropTimer) {
                clearTimeout(this.airdropTimer);
                this.airdropTimer = null;
            }
            
            if (this.arUITimer) {
                clearTimeout(this.arUITimer);
                this.arUITimer = null;
            }
            
            if (this.compassSimulationTimer) {
                clearInterval(this.compassSimulationTimer);
                this.compassSimulationTimer = null;
            }
            
            console.log('✅ Game cleanup complete');
        }
    }

    // =================== INITIALIZE GAME ===================
    console.log('🔥💎 Creating Game instance...');
    window.vaultPhoenixGame = new VaultPhoenixGame();

    // Cleanup on page unload
    window.addEventListener('beforeunload', () => {
        if (window.vaultPhoenixGame) {
            window.vaultPhoenixGame.destroy();
        }
    });

} else {
    console.log('🚫 Game JavaScript blocked - not a crypto game page');
}

console.log('🔥💎 Game JavaScript loaded successfully - DEMO MODE ACTIVE');
