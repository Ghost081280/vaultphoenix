// Vault Phoenix AR Crypto Gaming - COMPLETE UPDATED JAVASCRIPT
// CLEAN 3-SCREEN GAME WITH PROPER FLOW AND AIRDROP SYSTEM

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
            
            // Core game state
            this.currentScreen = 'hunt';
            this.playerLat = 33.4484; // Phoenix, AZ demo location
            this.playerLng = -112.0740;
            this.collectedTokens = [];
            this.totalEmberTokens = 0;
            this.currentDiscoveredToken = null;
            this.currentNavigationToken = null;
            this.currentSponsorToken = null;
            this.showingCollectionActions = false;
            
            // Map state
            this.mapScale = 1.5; // Start zoomed in to center tokens around player
            this.mapTranslateX = 0;
            this.mapTranslateY = 0;
            this.mapMinScale = 0.8;
            this.mapMaxScale = 3.0;
            
            // AR state
            this.cameraStream = null;
            this.arTokens = [];
            
            // Module state
            this.moduleExpanded = false;
            
            // Airdrop system - once per session
            this.airdropShown = false;
            this.airdropTimer = null;
            this.sessionAirdropCount = 0;
            this.pendingAirdropValue = 0;
            
            // Enhanced $Ember Token System - Phoenix Locations centered around player
            this.emberTokens = [
                // COLLECTABLE tokens (close to player - green circles in AR)
                { 
                    id: 1, 
                    value: 500, 
                    location: "Downtown Phoenix Plaza", 
                    lat: 33.4485, 
                    lng: -112.0741, 
                    sponsor: "Phoenix Downtown Partnership", 
                    message: "Premium downtown experience awaits!", 
                    description: "Enjoy VIP access to downtown events, priority parking, and exclusive dining experiences at Phoenix's premier entertainment district.",
                    distance: 15, 
                    collectable: true,
                    mapX: 48, mapY: 46 // Positioned around center (50, 50)
                },
                { 
                    id: 2, 
                    value: 250, 
                    location: "Heritage Square", 
                    lat: 33.4483, 
                    lng: -112.0742, 
                    sponsor: "Arizona Heritage Foundation", 
                    message: "Discover Phoenix history!", 
                    description: "Experience guided historic tours, museum access, and exclusive educational programs celebrating Arizona's rich cultural heritage.",
                    distance: 12, 
                    collectable: true,
                    mapX: 52, mapY: 48
                },
                { 
                    id: 3, 
                    value: 300, 
                    location: "Roosevelt Row Arts", 
                    lat: 33.4486, 
                    lng: -112.0739, 
                    sponsor: "Local Artists Collective", 
                    message: "Support local Phoenix artists!", 
                    description: "Gain access to exclusive art gallery openings, artist meet-and-greets, and special purchasing opportunities for local artwork.",
                    distance: 18, 
                    collectable: true,
                    mapX: 51, mapY: 52
                },
                
                // DISTANT tokens (require navigation - red circles in AR)
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
                    mapX: 46, mapY: 58
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
                    mapX: 35, mapY: 75
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
                    mapX: 75, mapY: 25
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
                    mapX: 65, mapY: 45
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
                    mapX: 70, mapY: 20
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
                    mapX: 60, mapY: 68
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
                    mapX: 68, mapY: 42
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
                this.updateUI();
                this.switchScreen('hunt');
                this.startAirdropSystem();
                
                console.log('✅ Game initialized successfully');
            } catch (error) {
                console.error('❌ Game initialization error:', error);
            }
        }

        // =================== AIRDROP SYSTEM (Once per session) ===================
        startAirdropSystem() {
            // Only show airdrop once per session
            if (this.sessionAirdropCount === 0) {
                const delay = (8 + Math.random() * 4) * 1000; // 8-12 seconds delay
                
                this.airdropTimer = setTimeout(() => {
                    this.showAirdropNotification();
                }, delay);
                
                console.log(`🪂 Airdrop scheduled for ${Math.round(delay/1000)} seconds`);
            }
        }

        showAirdropNotification() {
            if (this.airdropShown || this.sessionAirdropCount > 0) return;
            
            const notification = document.getElementById('airdropNotification');
            if (!notification) return;

            console.log('🪂 Showing airdrop notification');
            
            // Random airdrop values
            const airdropValues = [250, 500, 750, 1000];
            const randomValue = airdropValues[Math.floor(Math.random() * airdropValues.length)];

            this.pendingAirdropValue = randomValue;
            this.airdropShown = true;
            this.sessionAirdropCount++;

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

        // =================== SCREEN MANAGEMENT ===================
        switchScreen(screen) {
            console.log('🔄 Switching to screen:', screen);
            
            this.currentScreen = screen;
            
            // Always collapse module when switching screens
            this.collapseModule();
            
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
                    this.updateMapTokens();
                    this.centerMapOnPlayer();
                    break;
                case 'ar':
                    this.startARMode();
                    break;
                case 'vault':
                    this.stopARMode();
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
            // Center map with player in middle and tokens arranged around
            this.mapTranslateX = 0;
            this.mapTranslateY = 0;
            this.mapScale = 1.5; // Optimal zoom to show tokens around player
            this.updateMapTransform(0, 0, 1.5);
            
            if (navigator.vibrate) navigator.vibrate([30, 10, 30]);
        }

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

                // Token coin
                const coin = document.createElement('div');
                coin.className = 'token-coin';
                
                const coinImg = document.createElement('img');
                coinImg.src = '../images/VPEmberCoin.PNG';
                coinImg.alt = 'Ember Coin';
                coinImg.className = 'token-coin-img';
                coinImg.onerror = function() {
                    this.style.display = 'none';
                    coin.textContent = '💎';
                    coin.style.fontSize = '24px';
                    coin.style.color = '#f0a500';
                };

                coin.appendChild(coinImg);

                // Location label
                const label = document.createElement('div');
                label.className = 'token-label';
                label.textContent = token.location;

                marker.appendChild(coin);
                marker.appendChild(label);

                // Click handler
                marker.addEventListener('click', (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    
                    marker.style.transform = 'translate(-50%, -50%) scale(1.1)';
                    setTimeout(() => {
                        marker.style.transform = 'translate(-50%, -50%) scale(1)';
                    }, 200);
                    
                    this.showNavigationModal(token);
                    
                    if (navigator.vibrate) {
                        navigator.vibrate(token.collectable ? [50, 20, 50] : [30]);
                    }
                });

                markersContainer.appendChild(marker);
            });

            console.log(`✅ Updated ${availableTokens.length} map tokens`);
        }

        // =================== AR SYSTEM ===================
        async startARMode() {
            console.log('📱 Starting AR Mode...');
            
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

                // Create AR tokens on the horizon - only show COLLECTABLE tokens
                this.createARTokens();
                
                console.log('✅ AR mode started');
                
            } catch (error) {
                console.error('❌ AR mode error:', error);
                alert('Camera access is required for AR mode. Please allow camera access and try again.');
                this.switchScreen('hunt');
            }
        }

        createARTokens() {
            console.log('🪙 Creating AR tokens on horizon...');
            
            const container = document.getElementById('arTokensContainer');
            if (!container) return;

            container.innerHTML = '';

            // Only show COLLECTABLE tokens in AR
            const availableTokens = this.emberTokens.filter(token => 
                !this.isTokenCollected(token.id) && token.collectable
            );
            
            if (availableTokens.length === 0) {
                console.log('📱 No collectable tokens available for AR');
                return;
            }

            const containerWidth = window.innerWidth;
            const tokenSpacing = containerWidth / (availableTokens.length + 1);

            availableTokens.forEach((token, index) => {
                const arToken = document.createElement('div');
                arToken.className = 'ar-token near'; // All AR tokens are near (collectable)
                arToken.dataset.tokenId = token.id;
                
                // Position tokens evenly across the horizon (center of screen)
                const xPosition = tokenSpacing * (index + 1);
                arToken.style.left = `${xPosition}px`;
                
                // Token visual
                const coin = document.createElement('div');
                coin.className = 'ar-token-coin';
                
                const coinImg = document.createElement('img');
                coinImg.src = '../images/VPEmberCoin.PNG';
                coinImg.alt = 'AR Ember Coin';
                coinImg.className = 'ar-token-img';
                coinImg.onerror = function() {
                    this.style.display = 'none';
                    coin.textContent = '💎';
                    coin.style.fontSize = '32px';
                    coin.style.color = '#f0a500';
                };
                
                coin.appendChild(coinImg);
                
                // Location label
                const label = document.createElement('div');
                label.className = 'ar-token-label';
                label.textContent = token.location;
                
                arToken.appendChild(coin);
                arToken.appendChild(label);
                
                // Click handler for automatic collection
                arToken.addEventListener('click', (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    
                    this.collectToken(token, true); // true = from AR
                    
                    if (navigator.vibrate) {
                        navigator.vibrate([100, 50, 100]);
                    }
                });
                
                container.appendChild(arToken);
            });
            
            console.log(`✅ Created ${availableTokens.length} AR tokens`);
        }

        stopARMode() {
            console.log('📱 Stopping AR mode...');
            
            const arContainer = document.getElementById('arTokensContainer');
            if (arContainer) {
                arContainer.innerHTML = '';
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
            
            console.log('✅ Token collected successfully');
        }

        showTokenModal(token, fromAR = false) {
            const modal = document.getElementById('tokenModal');
            if (!modal) return;
            
            this.currentDiscoveredToken = token;
            this.showingCollectionActions = fromAR;
            
            // Update modal content
            const elements = {
                tokenAmountBadge: document.getElementById('tokenAmountBadge'),
                discoveredTokenAmount: document.getElementById('discoveredTokenAmount'),
                discoveredTokenUSD: document.getElementById('discoveredTokenUSD'),
                discoveredTokenLocation: document.getElementById('discoveredTokenLocation'),
                sponsorTitle: document.getElementById('sponsorTitle'),
                sponsorText: document.getElementById('sponsorText'),
                tokenActions: document.querySelector('.token-actions'),
                tokenCollectionActions: document.getElementById('tokenCollectionActions')
            };
            
            if (elements.tokenAmountBadge) elements.tokenAmountBadge.textContent = `${token.value} $Ember`;
            if (elements.discoveredTokenAmount) elements.discoveredTokenAmount.textContent = `${token.value} $Ember`;
            if (elements.discoveredTokenUSD) elements.discoveredTokenUSD.textContent = `~$${(token.value * 0.001).toFixed(2)} USD`;
            if (elements.discoveredTokenLocation) elements.discoveredTokenLocation.textContent = token.location;
            if (elements.sponsorTitle) elements.sponsorTitle.textContent = `Sponsored by ${token.sponsor}`;
            if (elements.sponsorText) elements.sponsorText.textContent = token.message;
            
            // Show appropriate action buttons
            if (fromAR) {
                // From AR - show "Back to Hunt" and "Learn More"
                if (elements.tokenActions) elements.tokenActions.style.display = 'none';
                if (elements.tokenCollectionActions) elements.tokenCollectionActions.style.display = 'flex';
            } else {
                // From Hunt - show "Collect $Ember" and "Learn More"
                if (elements.tokenActions) elements.tokenActions.style.display = 'flex';
                if (elements.tokenCollectionActions) elements.tokenCollectionActions.style.display = 'none';
            }
            
            modal.classList.add('show');
            modal.style.display = 'flex';
        }

        hideTokenModal() {
            const modal = document.getElementById('tokenModal');
            if (modal) {
                modal.classList.remove('show');
                modal.style.display = 'none';
            }
            this.currentDiscoveredToken = null;
            this.showingCollectionActions = false;
        }

        showSponsorModal(token) {
            const modal = document.getElementById('sponsorModal');
            if (!modal) return;
            
            this.currentSponsorToken = token;
            
            // Update sponsor modal content
            const elements = {
                sponsorModalTitle: document.getElementById('sponsorModalTitle'),
                sponsorLogoPlaceholder: document.getElementById('sponsorLogoPlaceholder'),
                sponsorNameLarge: document.getElementById('sponsorNameLarge'),
                sponsorDescriptionLarge: document.getElementById('sponsorDescriptionLarge')
            };
            
            if (elements.sponsorModalTitle) elements.sponsorModalTitle.textContent = `${token.sponsor} Benefits`;
            if (elements.sponsorLogoPlaceholder) {
                // Set appropriate emoji based on sponsor
                const logoEmojis = {
                    'Phoenix Downtown Partnership': '🏢',
                    'Arizona Heritage Foundation': '🏛️',
                    'Local Artists Collective': '🎨',
                    'Arizona Diamondbacks': '⚾',
                    'Sky Harbor Shops': '✈️',
                    'Scottsdale Fashion Square': '🛍️',
                    'Garden Cafe': '🌿',
                    'Desert Hiking Adventures': '🏔️',
                    'Lakeside Coffee Co.': '☕',
                    'Arizona Nature Tours': '🌵'
                };
                elements.sponsorLogoPlaceholder.textContent = logoEmojis[token.sponsor] || '🏢';
            }
            if (elements.sponsorNameLarge) elements.sponsorNameLarge.textContent = token.sponsor;
            if (elements.sponsorDescriptionLarge) elements.sponsorDescriptionLarge.textContent = token.description;
            
            modal.classList.add('show');
            modal.style.display = 'flex';
        }

        hideSponsorModal() {
            const modal = document.getElementById('sponsorModal');
            if (modal) {
                modal.classList.remove('show');
                modal.style.display = 'none';
            }
            this.currentSponsorToken = null;
        }

        navigateToSponsor() {
            if (!this.currentSponsorToken) return;
            
            const token = this.currentSponsorToken;
            const destination = `${token.lat},${token.lng}`;
            const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
            
            const mapsUrl = isIOS ? 
                `maps://maps.google.com/maps?daddr=${destination}` :
                `https://maps.google.com/maps?daddr=${destination}`;
            
            window.open(mapsUrl, '_blank');
            this.hideSponsorModal();
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
            
            // Show AR option only for collectable tokens (green coins)
            if (elements.navAR) {
                if (token.collectable) {
                    elements.navAR.style.display = 'flex';
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
                this.switchScreen('ar');
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
                elements.vaultUsdValue.textContent = `$${(this.totalEmberTokens * 0.001).toFixed(2)} USD`;
            }
            
            if (elements.totalCollected) {
                elements.totalCollected.textContent = this.collectedTokens.length;
            }
            
            if (elements.locationsVisited) {
                const uniqueLocations = new Set(this.collectedTokens.map(t => t.location)).size;
                elements.locationsVisited.textContent = uniqueLocations;
            }
            
            if (elements.totalValue) {
                elements.totalValue.textContent = `$${(this.totalEmberTokens * 0.001).toFixed(2)}`;
            }
            
            if (elements.lastActivity && this.collectedTokens.length > 0) {
                elements.lastActivity.textContent = 'Today';
            }
            
            // Update token history
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
                const recentTokens = [...this.collectedTokens].reverse().slice(0, 10);
                
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

        // =================== NEARBY TOKENS SLIDER ===================
        updateNearbyTokens() {
            console.log('🔍 Updating nearby tokens...');
            
            const availableTokens = this.emberTokens.filter(token => !this.isTokenCollected(token.id));
            const collectableTokens = availableTokens.filter(token => token.collectable);
            
            // Update handle count
            const nearbyCountEl = document.getElementById('nearbyTokenCount');
            if (nearbyCountEl) {
                if (collectableTokens.length > 0) {
                    nearbyCountEl.textContent = `${collectableTokens.length} ready to collect`;
                } else if (availableTokens.length > 0) {
                    nearbyCountEl.textContent = `${availableTokens.length} available`;
                } else {
                    nearbyCountEl.textContent = 'All collected!';
                }
            }
            
            // Update total available
            const totalAvailableEl = document.getElementById('totalAvailable');
            if (totalAvailableEl) {
                totalAvailableEl.textContent = `${availableTokens.length} total available`;
            }

            // Update AR badge in menu
            const nearbyARTokensEl = document.getElementById('nearbyARTokens');
            if (nearbyARTokensEl) {
                if (collectableTokens.length > 0) {
                    nearbyARTokensEl.textContent = `${collectableTokens.length} ready`;
                } else {
                    nearbyARTokensEl.textContent = 'Get closer';
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
                        <div class="token-location-value">${token.value}</div>
                    </div>
                `).join('');

                // Add click handlers
                tokensList.querySelectorAll('.token-location-item').forEach(item => {
                    item.addEventListener('click', (e) => {
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
                    });
                });
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

            // Add event listeners
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
                this.sessionAirdropCount = 0;
                
                localStorage.removeItem('vaultPhoenix_collectedTokens');
                localStorage.removeItem('vaultPhoenix_totalEmberTokens');
                
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

            // Airdrop claim
            const airdropClaimButton = document.getElementById('airdropClaimButton');
            if (airdropClaimButton) {
                airdropClaimButton.addEventListener('click', (e) => {
                    e.preventDefault();
                    this.claimAirdrop();
                });
            }

            // Token modal buttons
            const collectTokenBtn = document.getElementById('collectTokenBtn');
            const learnMoreBtn = document.getElementById('learnMoreBtn');
            const backToHuntBtn = document.getElementById('backToHuntBtn');
            const learnMoreAfterBtn = document.getElementById('learnMoreAfterBtn');
            
            if (collectTokenBtn) {
                collectTokenBtn.addEventListener('click', (e) => {
                    e.preventDefault();
                    if (this.currentDiscoveredToken) {
                        this.collectToken(this.currentDiscoveredToken, false);
                    }
                });
            }
            
            if (learnMoreBtn) {
                learnMoreBtn.addEventListener('click', (e) => {
                    e.preventDefault();
                    if (this.currentDiscoveredToken) {
                        this.hideTokenModal();
                        this.showSponsorModal(this.currentDiscoveredToken);
                    }
                });
            }
            
            if (backToHuntBtn) {
                backToHuntBtn.addEventListener('click', (e) => {
                    e.preventDefault();
                    this.hideTokenModal();
                    this.switchScreen('hunt');
                });
            }
            
            if (learnMoreAfterBtn) {
                learnMoreAfterBtn.addEventListener('click', (e) => {
                    e.preventDefault();
                    if (this.currentDiscoveredToken) {
                        this.hideTokenModal();
                        this.showSponsorModal(this.currentDiscoveredToken);
                    }
                });
            }

            // Sponsor modal buttons
            const sponsorClose = document.getElementById('sponsorClose');
            const sponsorNavigateBtn = document.getElementById('sponsorNavigateBtn');
            
            if (sponsorClose) {
                sponsorClose.addEventListener('click', (e) => {
                    e.preventDefault();
                    this.hideSponsorModal();
                });
            }
            
            if (sponsorNavigateBtn) {
                sponsorNavigateBtn.addEventListener('click', (e) => {
                    e.preventDefault();
                    this.navigateToSponsor();
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
    }

    // =================== INITIALIZE GAME ===================
    console.log('🔥💎 Creating Game instance...');
    window.vaultPhoenixGame = new VaultPhoenixGame();

} else {
    console.log('🚫 Game JavaScript blocked - not a crypto game page');
}

console.log('🔥💎 Game JavaScript loaded successfully');
