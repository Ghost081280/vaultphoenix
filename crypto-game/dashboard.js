// Vault Phoenix AR Crypto Gaming - REBUILT JAVASCRIPT
// CLEAN 3-SCREEN GAME: HUNT, AR VIEW, VAULT

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
            
            // Map state
            this.mapScale = 1.2; // Start slightly zoomed in
            this.mapTranslateX = 0;
            this.mapTranslateY = 0;
            this.mapMinScale = 0.8;
            this.mapMaxScale = 3.0;
            
            // AR state
            this.cameraStream = null;
            this.arTokens = [];
            
            // Module state
            this.moduleExpanded = false;
            
            // Enhanced $Ember Token System - Phoenix Locations
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
                    distance: 15, 
                    collectable: true,
                    mapX: 52, mapY: 58 // Map position percentages
                },
                { 
                    id: 2, 
                    value: 250, 
                    location: "Heritage Square", 
                    lat: 33.4483, 
                    lng: -112.0742, 
                    sponsor: "Arizona Heritage Foundation", 
                    message: "Discover Phoenix history!", 
                    distance: 12, 
                    collectable: true,
                    mapX: 50, mapY: 56
                },
                { 
                    id: 3, 
                    value: 300, 
                    location: "Roosevelt Row Arts", 
                    lat: 33.4486, 
                    lng: -112.0739, 
                    sponsor: "Local Artists Collective", 
                    message: "Support local Phoenix artists!", 
                    distance: 18, 
                    collectable: true,
                    mapX: 54, mapY: 55
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
                    distance: 850, 
                    collectable: false,
                    mapX: 46, mapY: 62
                },
                { 
                    id: 5, 
                    value: 400, 
                    location: "Phoenix Sky Harbor", 
                    lat: 33.4343, 
                    lng: -112.0116, 
                    sponsor: "Sky Harbor Shops", 
                    message: "Travel rewards await!", 
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
                    sponsor: "Scottsdale Fashion", 
                    message: "Premium shopping rewards!", 
                    distance: 2200, 
                    collectable: false,
                    mapX: 75, mapY: 35
                },
                { 
                    id: 7, 
                    value: 350, 
                    location: "Desert Botanical Garden", 
                    lat: 33.4619, 
                    lng: -111.9463, 
                    sponsor: "Garden Cafe", 
                    message: "Nature dining experience!", 
                    distance: 1800, 
                    collectable: false,
                    mapX: 65, mapY: 55
                },
                { 
                    id: 8, 
                    value: 500, 
                    location: "Camelback Mountain", 
                    lat: 33.5186, 
                    lng: -111.9717, 
                    sponsor: "Desert Hiking Gear", 
                    message: "Gear up for adventure!", 
                    distance: 2800, 
                    collectable: false,
                    mapX: 70, mapY: 25
                },
                { 
                    id: 9, 
                    value: 200, 
                    location: "Tempe Town Lake", 
                    lat: 33.4255, 
                    lng: -111.9400, 
                    sponsor: "Lakeside Coffee Co.", 
                    message: "Waterfront coffee experience!", 
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
                    sponsor: "Nature Tours", 
                    message: "Desert adventure awaits!", 
                    distance: 1600, 
                    collectable: false,
                    mapX: 68, mapY: 52
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
                
                console.log('✅ Game initialized successfully');
            } catch (error) {
                console.error('❌ Game initialization error:', error);
            }
        }

        // =================== SCREEN MANAGEMENT ===================
        switchScreen(screen) {
            console.log('🔄 Switching to screen:', screen);
            
            this.currentScreen = screen;
            
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
            
            // Start with optimal zoom to separate tokens
            this.optimizeMapZoom();
            
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
                    this.centerMap();
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

        centerMap() {
            this.mapTranslateX = 0;
            this.mapTranslateY = 0;
            this.mapScale = 1.2;
            this.updateMapTransform(0, 0, 1.2);
            
            if (navigator.vibrate) navigator.vibrate([30, 10, 30]);
        }

        optimizeMapZoom() {
            // Automatically set zoom level to ensure tokens don't overlap
            const availableTokens = this.emberTokens.filter(token => !this.isTokenCollected(token.id));
            
            if (availableTokens.length > 0) {
                // Calculate optimal zoom based on token density
                const tokenDensity = availableTokens.length / 10; // Max 10 tokens
                const optimalScale = Math.max(1.2, Math.min(2.0, 1.2 + (tokenDensity * 0.4)));
                
                this.mapScale = optimalScale;
                this.updateMapTransform(this.mapTranslateX, this.mapTranslateY, this.mapScale);
            }
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

                // Create AR tokens on the horizon
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

            const availableTokens = this.emberTokens.filter(token => !this.isTokenCollected(token.id));
            const containerWidth = window.innerWidth;
            const tokenSpacing = containerWidth / (availableTokens.length + 1);

            availableTokens.forEach((token, index) => {
                const arToken = document.createElement('div');
                arToken.className = `ar-token ${token.collectable ? 'near' : 'far'}`;
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
                    coin.style.fontSize = token.collectable ? '32px' : '24px';
                    coin.style.color = '#f0a500';
                };
                
                coin.appendChild(coinImg);
                
                // Location label
                const label = document.createElement('div');
                label.className = 'ar-token-label';
                label.textContent = token.location;
                
                arToken.appendChild(coin);
                arToken.appendChild(label);
                
                // Click handler
                arToken.addEventListener('click', (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    
                    if (token.collectable) {
                        this.collectToken(token);
                    } else {
                        this.showNavigationModal(token);
                    }
                    
                    if (navigator.vibrate) {
                        navigator.vibrate(token.collectable ? [100, 50, 100] : [50]);
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
        collectToken(token) {
            console.log('💎 Collecting token:', token.location);
            
            // Add to collected tokens
            const collectedToken = {
                ...token,
                collectedAt: new Date().toISOString(),
                collectionMethod: this.currentScreen === 'ar' ? 'AR Hunt' : 'Map Collection'
            };
            
            this.collectedTokens.push(collectedToken);
            this.totalEmberTokens += token.value;
            this.saveGameData();
            
            // Update UI
            this.updateUI();
            this.updateMapTokens();
            this.updateNearbyTokens();
            
            // Show collection modal
            this.showTokenModal(token);
            
            // Remove from AR if in AR mode
            if (this.currentScreen === 'ar') {
                const arToken = document.querySelector(`[data-token-id="${token.id}"]`);
                if (arToken) {
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

        showTokenModal(token) {
            const modal = document.getElementById('tokenModal');
            if (!modal) return;
            
            // Update modal content
            const elements = {
                tokenAmountBadge: document.getElementById('tokenAmountBadge'),
                discoveredTokenAmount: document.getElementById('discoveredTokenAmount'),
                discoveredTokenUSD: document.getElementById('discoveredTokenUSD'),
                discoveredTokenLocation: document.getElementById('discoveredTokenLocation'),
                sponsorTitle: document.getElementById('sponsorTitle'),
                sponsorText: document.getElementById('sponsorText')
            };
            
            if (elements.tokenAmountBadge) elements.tokenAmountBadge.textContent = `${token.value} $Ember`;
            if (elements.discoveredTokenAmount) elements.discoveredTokenAmount.textContent = `${token.value} $Ember`;
            if (elements.discoveredTokenUSD) elements.discoveredTokenUSD.textContent = `~$${(token.value * 0.001).toFixed(2)} USD`;
            if (elements.discoveredTokenLocation) elements.discoveredTokenLocation.textContent = token.location;
            if (elements.sponsorTitle) elements.sponsorTitle.textContent = `Sponsored by ${token.sponsor}`;
            if (elements.sponsorText) elements.sponsorText.textContent = token.message;
            
            this.currentDiscoveredToken = token;
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
            
            // Show AR option only for collectable tokens
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

            // Token modal buttons
            const collectTokenBtn = document.getElementById('collectTokenBtn');
            const closeTokenBtn = document.getElementById('closeTokenBtn');
            
            if (collectTokenBtn) {
                collectTokenBtn.addEventListener('click', (e) => {
                    e.preventDefault();
                    this.hideTokenModal();
                });
            }
            
            if (closeTokenBtn) {
                closeTokenBtn.addEventListener('click', (e) => {
                    e.preventDefault();
                    this.hideTokenModal();
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
            const qrClose = document.getElementById('qrClose');
            
            if (redeemQRBtn) {
                redeemQRBtn.addEventListener('click', (e) => {
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

            // Coinbase integration placeholder
            const coinbaseTransferBtn = document.getElementById('coinbaseTransferBtn');
            if (coinbaseTransferBtn) {
                coinbaseTransferBtn.addEventListener('click', (e) => {
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
