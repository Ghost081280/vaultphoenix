// Continue with remaining methods...

        // =================== AR CAMERA SYSTEM - ENHANCED ===================
        async switchToAR() {
            console.log('📱 Switching to AR mode');
            try {
                document.getElementById('map').style.display = 'none';
                document.getElementById('video').style.display = 'block';
                document.getElementById('canvas').style.display = 'block';
                document.getElementById('vaultView').style.display = 'none';
                document.getElementById('campaignsView').style.display = 'none';
                
                // Hide other UI
                const module = document.getElementById('tokenLocationsModule');
                if (module) module.style.display = 'none';

                await this.startARCamera();
                
                console.log('📱 AR mode activated');
            } catch (error) {
                console.error('❌ AR switch error:', error);
                alert('❌ Camera access failed. Please allow camera permissions and try again.');
                this.switchMode('map');
            }
        }

        async startARCamera() {
            console.log('📷 Starting AR camera...');
            try {
                this.videoElement = document.getElementById('video');
                this.canvasElement = document.getElementById('canvas');

                if (!this.videoElement || !this.canvasElement) {
                    throw new Error('AR video or canvas elements not found');
                }

                if (!this.arCameraPermissionGranted) {
                    console.log('📷 Requesting camera permissions...');
                    
                    const constraints = {
                        video: {
                            facingMode: 'environment',
                            width: { ideal: 1280 },
                            height: { ideal: 720 }
                        }
                    };

                    try {
                        this.cameraStream = await navigator.mediaDevices.getUserMedia(constraints);
                        this.arCameraPermissionGranted = true;
                        console.log('✅ Camera permission granted');
                    } catch (permissionError) {
                        console.error('❌ Camera permission denied:', permissionError);
                        throw new Error('Camera access denied. Please allow camera permissions to use AR mode.');
                    }
                }

                if (this.cameraStream && this.videoElement) {
                    this.videoElement.srcObject = this.cameraStream;
                    this.videoElement.play();
                    
                    console.log('📷 Camera stream started');

                    this.videoElement.addEventListener('loadedmetadata', () => {
                        console.log('📷 Video metadata loaded');
                        this.setupARInterface();
                    });
                }

                this.arActive = true;

            } catch (error) {
                console.error('❌ AR camera start error:', error);
                throw error;
            }
        }

        setupARInterface() {
            console.log('🎮 Setting up AR interface...');
            try {
                this.showARInstructions();

                if (this.isNearToken) {
                    this.showARCoin();
                }

                console.log('✅ AR interface setup complete');
            } catch (error) {
                console.error('❌ AR interface setup error:', error);
            }
        }

        showARInstructions() {
            const instructions = document.getElementById('arInstructions');
            if (instructions) {
                instructions.classList.add('show');
                
                setTimeout(() => {
                    instructions.classList.remove('show');
                }, 5000);
            }
        }

        hideARInstructions() {
            const instructions = document.getElementById('arInstructions');
            if (instructions) {
                instructions.classList.remove('show');
            }
        }

        showARCoin() {
            console.log('💎 Showing AR coin for collection...');
            const coin = document.getElementById('arEmberCoin');
            if (coin) {
                coin.style.display = 'block';
                coin.classList.add('tappable');
                
                coin.onclick = () => {
                    this.collectARToken();
                };
            }
        }

        hideEmberCoin() {
            const coin = document.getElementById('arEmberCoin');
            if (coin) {
                coin.style.display = 'none';
                coin.classList.remove('tappable');
                coin.onclick = null;
            }
        }

        async collectARToken() {
            console.log('💎 Collecting AR token...');
            try {
                const nearestToken = this.emberTokens.find(token => 
                    !this.isTokenCollected(token.id) && 
                    this.calculateDistance(this.userLat, this.userLng, token.lat, token.lng) <= 0.1
                );

                if (nearestToken) {
                    this.hideEmberCoin();

                    if (navigator.vibrate) {
                        navigator.vibrate([200, 100, 200, 100, 200]);
                    }

                    this.collectedTokens.push({
                        ...nearestToken,
                        collectedAt: new Date().toISOString(),
                        collectedVia: 'AR'
                    });

                    this.saveCollectedTokens();
                    this.showTokenCollectionModal(nearestToken);

                    setTimeout(() => {
                        this.switchMode('map');
                    }, 3000);

                    console.log('✅ AR token collected successfully');
                }
            } catch (error) {
                console.error('❌ AR token collection error:', error);
            }
        }

        stopCamera() {
            console.log('📷 Stopping camera...');
            try {
                if (this.cameraStream) {
                    this.cameraStream.getTracks().forEach(track => track.stop());
                    this.cameraStream = null;
                }

                if (this.videoElement) {
                    this.videoElement.srcObject = null;
                }

                this.arActive = false;
                this.hideEmberCoin();
                this.hideARInstructions();

                console.log('✅ Camera stopped');
            } catch (error) {
                console.error('❌ Camera stop error:', error);
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
                
                this.hideARInstructions();
                this.hideEmberCoin();
                this.stopCamera();
                
                const module = document.getElementById('tokenLocationsModule');
                if (module) {
                    module.style.display = 'block';
                }
                
                const mapContainer = document.getElementById('googleMap');
                if (mapContainer) {
                    mapContainer.style.display = 'block';
                    
                    if (!this.googleMapsLoaded) {
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
                
                const module = document.getElementById('tokenLocationsModule');
                if (module) module.style.display = 'none';

                this.stopCamera();
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
                
                const module = document.getElementById('tokenLocationsModule');
                if (module) module.style.display = 'none';

                this.stopCamera();
            } catch (error) {
                console.error('❌ Campaigns switch error:', error);
            }
        }

        // =================== WELCOME SCREEN SYSTEM ===================
        showWelcomeScreen() {
            console.log('👋 Showing welcome screen...');
            try {
                const welcomeBtn = document.getElementById('welcomeBtn');
                const container = document.getElementById('container');
                
                if (!welcomeBtn || this.welcomeShown) return;
                
                if (container) container.classList.add('welcome-active');
                welcomeBtn.style.display = 'flex';
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
                    'Initializing Interactive Map...',
                    'Preparing Token Hunt...',
                    'Ready to Hunt!'
                ];
                
                let currentMessage = 0;
                let progress = 0;
                
                const loadingInterval = setInterval(() => {
                    progress += Math.random() * 15 + 5;
                    
                    if (progress >= 100) {
                        progress = 100;
                        if (loadingFill) loadingFill.style.width = '100%';
                        if (loadingText) loadingText.textContent = loadingMessages[4];
                        
                        clearInterval(loadingInterval);
                        
                        setTimeout(() => {
                            this.hideWelcomeScreen();
                        }, 800);
                        
                    } else {
                        if (loadingFill) loadingFill.style.width = `${progress}%`;
                        
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
                
                if (welcomeBtn) welcomeBtn.style.display = 'none';
                if (container) container.classList.remove('welcome-active');
                
                this.autoStartGame();
                
            } catch (error) {
                console.error('❌ Welcome screen hide error:', error);
            }
        }

        autoStartGame() {
            console.log('🚀 Auto-starting game...');
            try {
                this.start();
                this.updateAvailableTokensCount();
                
                setTimeout(() => {
                    this.initializeGoogleMap();
                }, 500);
                
            } catch (error) {
                console.error('❌ Auto-start error:', error);
            }
        }

        // =================== UTILITY METHODS ===================
        calculateDistance(lat1, lng1, lat2, lng2) {
            const R = 6371;
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

        saveCollectedTokens() {
            try {
                localStorage.setItem('vaultPhoenixTokens', JSON.stringify(this.collectedTokens));
                this.calculateTotalValue();
                this.calculateStats();
                this.updateVaultStats();
                this.updateAvailableTokensCount();
                
                if (this.googleMapsLoaded) {
                    this.addDemoTokenMarkers();
                }
                
                this.checkTokenProximity();
                
                console.log('💾 Tokens saved:', this.collectedTokens.length, 'worth', this.totalTokenValue, '$Ember');
            } catch (error) {
                console.error('❌ Token saving error:', error);
            }
        }

        // =================== SWIPEABLE MODULE ===================
        setupSwipeableModule() {
            console.log('👆 Setting up swipeable module...');
            try {
                const moduleElement = document.getElementById('tokenLocationsModule');
                const handleElement = document.getElementById('swipeHandle');
                
                if (!moduleElement || !handleElement) {
                    console.error('❌ Swipeable module elements not found');
                    return;
                }

                handleElement.addEventListener('touchstart', (e) => this.handleTouchStart(e));
                handleElement.addEventListener('touchmove', (e) => this.handleTouchMove(e));
                handleElement.addEventListener('touchend', (e) => this.handleTouchEnd(e));

                handleElement.addEventListener('mousedown', (e) => this.handleMouseStart(e));
                document.addEventListener('mousemove', (e) => this.handleMouseMove(e));
                document.addEventListener('mouseup', (e) => this.handleMouseEnd(e));

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
            
            if (navigator.vibrate) navigator.vibrate(10);
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

            const maxDrag = 200;
            const minDrag = -200;
            const constrainedDelta = Math.max(minDrag, Math.min(maxDrag, deltaY));
            
            this.moduleTranslateY = constrainedDelta;
            
            if (this.moduleExpanded) {
                moduleElement.style.transform = `translateY(${Math.max(0, constrainedDelta)}px)`;
            } else {
                moduleElement.style.transform = `translateY(calc(100% - 80px + ${Math.min(0, constrainedDelta)}px))`;
            }
        }

        snapModule(deltaY) {
            const moduleElement = document.getElementById('tokenLocationsModule');
            if (!moduleElement) return;

            const threshold = 50;

            if (this.moduleExpanded) {
                if (deltaY > threshold) {
                    this.collapseModule();
                } else {
                    this.expandModule();
                }
            } else {
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
            
            if (navigator.vibrate) navigator.vibrate(20);
        }

        collapseModule() {
            const moduleElement = document.getElementById('tokenLocationsModule');
            if (!moduleElement) return;

            this.moduleExpanded = false;
            moduleElement.classList.add('collapsed');
            moduleElement.classList.remove('expanded');
            moduleElement.style.transform = 'translateY(calc(100% - 80px))';
            
            console.log('📉 Module collapsed');
            
            if (navigator.vibrate) navigator.vibrate(20);
        }

        updateNearbyTokens() {
            console.log('🔍 Updating nearby tokens...');
            try {
                const uncollectedTokens = this.emberTokens.filter(token => !this.isTokenCollected(token.id));
                
                const tokensWithDistance = uncollectedTokens.map(token => {
                    const distance = this.calculateDistance(
                        this.userLat, this.userLng,
                        token.lat, token.lng
                    );
                    return { ...token, distance };
                }).sort((a, b) => a.distance - b.distance);

                const nearestTokens = tokensWithDistance.slice(0, 3);
                
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

            itemDiv.addEventListener('click', () => {
                this.showTokenModal(token);
                
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

        // =================== GAME MANAGEMENT ===================
        updateAvailableTokensCount() {
            try {
                const collectedTokenIds = this.collectedTokens.map(token => token.id);
                const uncollectedTokens = this.emberTokens.filter(token => !collectedTokenIds.includes(token.id));
                this.availableTokensCount = uncollectedTokens.length;
                
                const availableTokensEl = document.getElementById('availableTokens');
                if (availableTokensEl) {
                    availableTokensEl.textContent = `${this.availableTokensCount} Available`;
                }
                
                this.updateNearbyTokens();
                
                console.log('📊 Available tokens updated:', this.availableTokensCount);
            } catch (error) {
                console.error('❌ Available tokens update error:', error);
            }
        }

        resetGame() {
            console.log('🔄 Resetting game progress...');
            try {
                this.hideResetGameConfirmation();
                this.showLoading(true);
                
                try {
                    localStorage.removeItem('vaultPhoenixTokens');
                    console.log('✅ Cleared collected tokens from localStorage');
                } catch (error) {
                    console.log('⚠️ localStorage clear error:', error);
                }
                
                this.collectedTokens = [];
                this.totalTokenValue = 0;
                this.locationsVisited = 0;
                this.lastActivityTime = null;
                this.availableTokensCount = 13;
                this.currentDiscoveredToken = null;
                this.isNearToken = false;
                
                this.updateVaultStats();
                this.updateAvailableTokensCount();
                this.generateTokenHistory();
                this.updateARModeAvailability();
                this.hideProximityNotification();
                
                if (this.googleMapsLoaded) {
                    this.addDemoTokenMarkers();
                }
                
                this.hideTokenDiscoveryModal();
                this.hideEmberCoin();
                
                this.showLoading(false);
                
                if (navigator.vibrate) {
                    navigator.vibrate([200, 100, 200, 100, 200]);
                }
                
                this.switchMode('map');
                
                setTimeout(() => {
                    alert('🎮 Game Reset Complete!\n\n✅ All tokens cleared\n✅ Progress reset\n✅ Adventures reset\n\n🔥 Ready to start your $Ember hunt again!');
                }, 500);
                
                console.log('✅ Game reset completed successfully');
                
            } catch (error) {
                console.error('❌ Game reset error:', error);
                this.showLoading(false);
                alert('❌ Reset failed. Please try again or refresh the page.');
            }
        }

        // =================== EVENT LISTENERS ===================
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
                    { id: 'resetGameBtn', event: 'click', handler: () => this.showResetGameConfirmation() },
                    { id: 'confirmResetGame', event: 'click', handler: () => this.resetGame() },
                    { id: 'cancelResetGame', event: 'click', handler: () => this.hideResetGameConfirmation() }
                ];
                
                handlers.forEach(({ id, event, handler }) => {
                    const element = document.getElementById(id);
                    if (element) {
                        element.addEventListener(event, handler);
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

        showResetGameConfirmation() {
            const overlay = document.getElementById('resetGameOverlay');
            if (overlay) {
                overlay.classList.add('show');
            }
        }

        hideResetGameConfirmation() {
            const overlay = document.getElementById('resetGameOverlay');
            if (overlay) {
                overlay.classList.remove('show');
            }
        }

        updateNavigationState() {
            try {
                document.querySelectorAll('.nav-tab').forEach(tab => {
                    tab.classList.toggle('active', tab.dataset.mode === this.currentMode);
                });
                this.updateMenuState();
            } catch (error) {
                console.error('❌ Navigation update error:', error);
            }
        }

        updateMenuState() {
            try {
                document.querySelectorAll('.menu-item[data-mode]').forEach(item => {
                    item.classList.toggle('active', item.dataset.mode === this.currentMode);
                });
            } catch (error) {
                console.error('❌ Menu state update error:', error);
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
                    this.updateMenuState();
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

        // =================== VAULT & STATS ===================
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

        calculateStats() {
            this.locationsVisited = new Set(this.collectedTokens.map(token => token.location)).size;
            if (this.collectedTokens.length > 0) {
                this.lastActivityTime = new Date().toLocaleDateString();
            }
        }

        updateVaultStats() {
            console.log('📊 Updating vault stats...');
            try {
                const elements = {
                    navEmberCount: document.getElementById('navEmberCount'),
                    menuEmberCount: document.getElementById('menuEmberCount'),
                    vaultBalance: document.getElementById('vaultBalance'),
                    vaultUsdValue: document.getElementById('vaultUsdValue'),
                    totalCollected: document.getElementById('totalCollected'),
                    locationsVisited: document.getElementById('locationsVisited'),
                    totalValue: document.getElementById('totalValue'),
                    lastActivity: document.getElementById('lastActivity')
                };
                
                if (elements.navEmberCount) elements.navEmberCount.textContent = this.totalTokenValue;
                if (elements.menuEmberCount) elements.menuEmberCount.textContent = this.totalTokenValue;
                if (elements.vaultBalance) elements.vaultBalance.textContent = `${this.totalTokenValue} $Ember Tokens`;
                if (elements.vaultUsdValue) elements.vaultUsdValue.textContent = `${(this.totalTokenValue * 0.001).toFixed(2)} USD`;
                if (elements.totalCollected) elements.totalCollected.textContent = this.collectedTokens.length;
                if (elements.locationsVisited) elements.locationsVisited.textContent = this.locationsVisited;
                if (elements.totalValue) elements.totalValue.textContent = `${(this.totalTokenValue * 0.001).toFixed(2)}`;
                if (elements.lastActivity) elements.lastActivity.textContent = this.lastActivityTime || 'Never';
                
            } catch (error) {
                console.error('❌ Vault stats update error:', error);
            }
        }

        generateTokenHistory() {
            console.log('📜 Generating token history...');
            try {
                const historyContainer = document.getElementById('tokenHistory');
                if (!historyContainer) return;

                historyContainer.innerHTML = '';

                if (this.collectedTokens.length === 0) {
                    const welcomeItem = document.createElement('div');
                    welcomeItem.className = 'history-item';
                    welcomeItem.innerHTML = `
                        <div class="history-icon">
                            <img src="../images/VPEmberCoin.PNG" alt="Welcome Bonus" class="history-coin-icon" onerror="this.textContent='💎'">
                        </div>
                        <div class="history-details">
                            <div class="history-title">Welcome Bonus</div>
                            <div class="history-subtitle">Vault Phoenix HQ • Today • LOW</div>
                        </div>
                        <div class="history-value">+50</div>
                    `;
                    historyContainer.appendChild(welcomeItem);
                }

                this.collectedTokens.forEach(token => {
                    const historyItem = document.createElement('div');
                    historyItem.className = 'history-item';
                    historyItem.innerHTML = `
                        <div class="history-icon">
                            <img src="../images/VPEmberCoin.PNG" alt="${token.location}" class="history-coin-icon" onerror="this.textContent='💎'">
                        </div>
                        <div class="history-details">
                            <div class="history-title">${token.location}</div>
                            <div class="history-subtitle">${token.sponsor} • Today • ${token.tier.toUpperCase()}</div>
                        </div>
                        <div class="history-value">+${token.value}</div>
                    `;
                    historyContainer.appendChild(historyItem);
                });

            } catch (error) {
                console.error('❌ Token history generation error:', error);
            }
        }

        initializeVault() {
            console.log('💎 Initializing vault...');
            try {
                this.generateTokenHistory();
                
                document.querySelectorAll('.filter-btn').forEach(btn => {
                    btn.addEventListener('click', () => {
                        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
                        btn.classList.add('active');
                        
                        const filter = btn.dataset.filter;
                        this.filterTokenHistory(filter);
                    });
                });
                
            } catch (error) {
                console.error('❌ Vault initialization error:', error);
            }
        }

        filterTokenHistory(filter) {
            console.log('🔍 Filtering token history:', filter);
        }

        initializeCampaigns() {
            console.log('🏆 Initializing campaigns...');
            try {
                this.updateCampaignDisplay();
            } catch (error) {
                console.error('❌ Campaigns initialization error:', error);
            }
        }

        updateCampaignDisplay() {
            console.log('🏆 Updating campaign display...');
        }

        addHapticFeedback() {
            console.log('📳 Adding haptic feedback...');
            try {
                const interactiveElements = document.querySelectorAll('.nav-tab, .menu-item, .demo-token-marker');
                
                interactiveElements.forEach(element => {
                    element.addEventListener('touchstart', () => {
                        if (navigator.vibrate) {
                            navigator.vibrate(10);
                        }
                    });
                });
            } catch (error) {
                console.error('❌ Haptic feedback error:', error);
            }
        }

        start() {
            console.log('🚀 Starting game systems...');
            this.isStarted = true;
            return Promise.resolve();
        }

        showLoading(show) {
            console.log('⏳ Loading state:', show);
        }

        updateStatus(message, isError = false) {
            console.log('📊 Status update:', message);
        }

        // PLACEHOLDER METHODS
        ensureSession() { 
            console.log('🔍 Session management...');
        }

        loadUserInfo() {
            console.log('👤 Loading user info...');
        }

        hideTokenDiscovery() {
            this.hideTokenDiscoveryModal();
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
}// Vault Phoenix AR Crypto Gaming - COMPLETE ISOLATED JAVASCRIPT
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

// ENHANCED: Global Google Maps callback function
window.initMap = function() {
    console.log('🗺️ Google Maps API loaded successfully');
    if (window.vaultPhoenixApp && typeof window.vaultPhoenixApp.initializeGoogleMap === 'function') {
        window.vaultPhoenixApp.initializeGoogleMap();
    } else {
        console.log('⏳ Vault Phoenix app not ready, will initialize when ready');
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
            
            // Google Maps properties - ENHANCED
            this.googleMap = null;
            this.tokenMarkers = [];
            this.infoWindows = [];
            this.googleMapsAPI = null;

            // Map pan/zoom properties
            this.mapScale = 1;
            this.mapTranslateX = 0;
            this.mapTranslateY = 0;
            this.isDraggingMap = false;
            this.lastTouchX = 0;
            this.lastTouchY = 0;
            this.lastDistance = 0;
            this.mapContainer = null;
            this.isNearToken = false;

            // AR Camera properties
            this.arActive = false;
            this.arCameraPermissionGranted = false;
            this.videoElement = null;
            this.canvasElement = null;

            // Enhanced Ember Token System with Real Locations and Value Tiers
            this.emberTokens = [
                // DEMO: Nearby token for AR mode demonstration
                { id: 13, value: 100, tier: "low", location: "Phoenix Downtown Plaza", lat: 33.4485, lng: -112.0742, sponsor: "Demo Location", message: "You're close! Try AR mode!", description: "This is a demo token placed nearby to show AR functionality." },
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
                    this.showWelcomeScreen();
                    document.body.classList.add('crypto-dashboard-page');
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

        // =================== ENHANCED DASHBOARD SYSTEM ===================
        setModeAttribute(mode) {
            try {
                document.body.setAttribute('data-mode', mode);
                console.log('🔧 Set mode attribute to:', mode);
            } catch (error) {
                console.error('❌ Mode attribute error:', error);
            }
        }

        // ENHANCED: Google Maps Integration - FIXED FOR REAL LOADING
        initializeGoogleMap() {
            console.log('🗺️ Initializing Google Maps with enhanced features...');
            try {
                const mapContainer = document.getElementById('googleMap');
                if (!mapContainer) {
                    console.error('❌ Google Map container not found');
                    return;
                }

                // Show loading overlay
                this.showMapLoading();

                // Check if Google Maps API is loaded
                if (typeof google !== 'undefined' && google.maps) {
                    console.log('✅ Google Maps API detected, initializing real map...');
                    this.createRealGoogleMap(mapContainer);
                } else {
                    console.log('⚠️ Google Maps API not available, using enhanced demo map...');
                    this.createEnhancedDemoMap(mapContainer);
                }
                
            } catch (error) {
                console.error('❌ Google Maps initialization error:', error);
                this.createEnhancedDemoMap(document.getElementById('googleMap'));
            }
        }

        showMapLoading() {
            const mapContainer = document.getElementById('googleMap');
            if (mapContainer) {
                mapContainer.innerHTML = `
                    <div class="map-loading-overlay">
                        <div class="map-loading-spinner"></div>
                        <div>Loading Phoenix Map...</div>
                    </div>
                `;
            }
        }

        // ENHANCED: Real Google Maps implementation
        createRealGoogleMap(mapContainer) {
            console.log('🗺️ Creating real Google Map...');
            try {
                // Clear loading overlay
                mapContainer.innerHTML = '';

                // Create map centered on Phoenix
                this.googleMap = new google.maps.Map(mapContainer, {
                    center: { lat: this.userLat, lng: this.userLng },
                    zoom: 12,
                    mapTypeId: google.maps.MapTypeId.ROADMAP,
                    styles: [
                        {
                            featureType: "all",
                            elementType: "geometry.fill",
                            stylers: [{ color: "#2c1810" }]
                        },
                        {
                            featureType: "water",
                            elementType: "geometry",
                            stylers: [{ color: "#193047" }]
                        },
                        {
                            featureType: "road",
                            elementType: "geometry",
                            stylers: [{ color: "#451a03" }]
                        }
                    ],
                    disableDefaultUI: true,
                    zoomControl: true,
                    zoomControlOptions: {
                        position: google.maps.ControlPosition.RIGHT_BOTTOM
                    }
                });

                // Add user marker
                this.userMarker = new google.maps.Marker({
                    position: { lat: this.userLat, lng: this.userLng },
                    map: this.googleMap,
                    title: 'Your Location',
                    icon: {
                        path: google.maps.SymbolPath.CIRCLE,
                        scale: 8,
                        fillColor: '#4285F4',
                        fillOpacity: 1,
                        strokeColor: '#ffffff',
                        strokeWeight: 3
                    }
                });

                // Add token markers
                this.addRealTokenMarkers();

                this.googleMapsLoaded = true;
                this.mapLoadingComplete = true;
                
                // Start game features after map loads
                setTimeout(() => {
                    this.startGameFeatures();
                }, 1000);

                console.log('✅ Real Google Map initialized successfully');
                
            } catch (error) {
                console.error('❌ Real Google Map creation error:', error);
                this.createEnhancedDemoMap(mapContainer);
            }
        }

        // Add real token markers to Google Maps
        addRealTokenMarkers() {
            console.log('💎 Adding real token markers to Google Map...');
            
            this.emberTokens.forEach((token, index) => {
                if (!this.isTokenCollected(token.id)) {
                    const marker = new google.maps.Marker({
                        position: { lat: token.lat, lng: token.lng },
                        map: this.googleMap,
                        title: `${token.location} - ${token.value} $Ember`,
                        icon: {
                            url: '../images/VPEmberCoin.PNG',
                            scaledSize: new google.maps.Size(40, 40),
                            origin: new google.maps.Point(0, 0),
                            anchor: new google.maps.Point(20, 20)
                        }
                    });

                    // Add click listener
                    marker.addListener('click', () => {
                        token.distance = this.calculateDistance(
                            this.userLat, this.userLng,
                            token.lat, token.lng
                        );
                        this.showTokenModal(token);
                    });

                    this.tokenMarkers.push({ marker, token });
                }
            });
        }

        // ENHANCED: Demo map with better features
        createEnhancedDemoMap(mapContainer) {
            console.log('🎮 Creating enhanced demo map...');
            try {
                // Clear loading overlay
                mapContainer.innerHTML = '';

                // Create enhanced demo map structure
                mapContainer.innerHTML = `
                    <div class="demo-map-container" id="demoMapContainer">
                        <div class="demo-map-grid"></div>
                        <div class="demo-map-streets">
                            <div class="demo-street horizontal" style="top: 20%;"></div>
                            <div class="demo-street horizontal" style="top: 40%;"></div>
                            <div class="demo-street horizontal" style="top: 60%;"></div>
                            <div class="demo-street horizontal" style="top: 80%;"></div>
                            <div class="demo-street vertical" style="left: 25%;"></div>
                            <div class="demo-street vertical" style="left: 50%;"></div>
                            <div class="demo-street vertical" style="left: 75%;"></div>
                        </div>
                        <div class="demo-phoenix-label">🏜️ Phoenix, Arizona</div>
                        <div class="demo-user-marker" title="Your Location - Phoenix, AZ"></div>
                        <div class="demo-map-markers" id="demoMarkers"></div>
                        <div class="demo-map-labels" id="demoLabels"></div>
                    </div>
                    <div class="demo-map-controls">
                        <button class="map-control-btn" id="zoomInBtn" title="Zoom In">+</button>
                        <button class="map-control-btn" id="zoomOutBtn" title="Zoom Out">-</button>
                    </div>
                `;

                // Ensure container is visible
                mapContainer.style.display = 'block';
                mapContainer.style.position = 'absolute';
                mapContainer.style.top = '0';
                mapContainer.style.left = '0';
                mapContainer.style.width = '100%';
                mapContainer.style.height = '100%';
                mapContainer.style.zIndex = '1';

                this.mapContainer = document.getElementById('demoMapContainer');
                this.setupMapInteractions();

                // Add demo token markers
                setTimeout(() => {
                    this.addDemoTokenMarkers();
                    this.googleMapsLoaded = true;
                    this.mapLoadingComplete = true;
                    this.startGameFeatures();
                }, 500);

                console.log('✅ Enhanced demo map initialized successfully');
                
            } catch (error) {
                console.error('❌ Enhanced demo map creation error:', error);
            }
        }

        // ENHANCED: Start game features after map loads
        startGameFeatures() {
            console.log('🎮 Starting game features...');
            
            // Update location card with coordinates
            this.updateLocationDisplay();
            
            // Start proximity checking
            this.checkTokenProximity();
            
            // Start new token simulation
            this.startNewTokenSimulation();
            
            // Update nearby tokens display
            this.updateNearbyTokens();
            
            console.log('✅ Game features started');
        }

        // ENHANCED: Update location display with campaign info
        updateLocationDisplay() {
            try {
                const latEl = document.getElementById('fallbackLat');
                const lngEl = document.getElementById('fallbackLng');
                
                if (latEl) latEl.textContent = this.userLat.toFixed(4);
                if (lngEl) lngEl.textContent = this.userLng.toFixed(4);

                // Add campaign info to location card
                const locationCard = document.querySelector('.current-location-card');
                if (locationCard && !locationCard.querySelector('.campaign-info')) {
                    const campaignInfo = document.createElement('div');
                    campaignInfo.className = 'campaign-info';
                    campaignInfo.innerHTML = `
                        <div class="campaign-text">Phoenix Sports Trail Campaign</div>
                        <div class="token-count">${this.availableTokensCount} tokens available</div>
                    `;
                    locationCard.appendChild(campaignInfo);
                }
                
            } catch (error) {
                console.error('❌ Location display update error:', error);
            }
        }

        // ENHANCED: New token simulation for live feel
        startNewTokenSimulation() {
            console.log('🆕 Starting new token simulation...');
            
            // Add new tokens periodically to show live gameplay
            this.newTokenInterval = setInterval(() => {
                if (Math.random() < 0.3 && this.mapLoadingComplete) { // 30% chance every 10 seconds
                    this.simulateNewToken();
                }
            }, 10000); // Every 10 seconds
        }

        simulateNewToken() {
            console.log('✨ Simulating new token appearance...');
            
            // Create a temporary "new" token for demonstration
            const newToken = {
                id: Date.now(),
                value: Math.floor(Math.random() * 200) + 50,
                tier: ['low', 'medium', 'high'][Math.floor(Math.random() * 3)],
                location: 'New Discovery',
                lat: this.userLat + (Math.random() - 0.5) * 0.1,
                lng: this.userLng + (Math.random() - 0.5) * 0.1,
                sponsor: 'Surprise Location',
                message: 'A new token has appeared!',
                description: 'Limited time token - collect quickly!'
            };

            // Add to demo map if using demo
            if (!this.googleMap && this.mapContainer) {
                this.addAnimatedDemoMarker(newToken);
            }

            // Show brief notification
            if (navigator.vibrate) {
                navigator.vibrate([100, 50, 100]);
            }

            // Remove after 30 seconds
            setTimeout(() => {
                const marker = document.querySelector(`[data-token-id="${newToken.id}"]`);
                if (marker) {
                    marker.style.animation = 'none';
                    marker.style.transform = 'scale(0)';
                    marker.style.opacity = '0';
                    setTimeout(() => marker.remove(), 300);
                }
            }, 30000);
        }

        addAnimatedDemoMarker(token) {
            const markersContainer = document.getElementById('demoMarkers');
            if (!markersContainer) return;

            const position = {
                x: 20 + Math.random() * 60,
                y: 20 + Math.random() * 60
            };

            const marker = document.createElement('div');
            marker.className = `demo-token-marker ${token.tier} new-token`;
            marker.style.left = `${position.x}%`;
            marker.style.top = `${position.y}%`;
            marker.dataset.tokenId = token.id;

            const tokenImage = document.createElement('img');
            tokenImage.src = '../images/VPEmberCoin.PNG';
            tokenImage.alt = 'New Ember Coin';
            tokenImage.className = 'demo-token-image';

            const valueOverlay = document.createElement('div');
            valueOverlay.className = 'demo-token-value';
            valueOverlay.textContent = token.value;

            marker.appendChild(tokenImage);
            marker.appendChild(valueOverlay);

            marker.addEventListener('click', () => {
                token.distance = this.calculateDistance(
                    this.userLat, this.userLng,
                    token.lat, token.lng
                );
                this.showTokenModal(token);
            });

            markersContainer.appendChild(marker);
        }

        // ENHANCED: Setup map interactions
        setupMapInteractions() {
            if (!this.mapContainer) return;

            console.log('🖱️ Setting up enhanced map interactions...');

            const zoomInBtn = document.getElementById('zoomInBtn');
            const zoomOutBtn = document.getElementById('zoomOutBtn');

            if (zoomInBtn) {
                zoomInBtn.addEventListener('click', () => this.zoomMap(1.2));
            }

            if (zoomOutBtn) {
                zoomOutBtn.addEventListener('click', () => this.zoomMap(0.8));
            }

            // Touch/mouse events for panning
            this.mapContainer.addEventListener('mousedown', (e) => this.startMapDrag(e));
            this.mapContainer.addEventListener('touchstart', (e) => this.startMapDrag(e), { passive: false });

            document.addEventListener('mousemove', (e) => this.dragMap(e));
            document.addEventListener('touchmove', (e) => this.dragMap(e), { passive: false });

            document.addEventListener('mouseup', () => this.endMapDrag());
            document.addEventListener('touchend', () => this.endMapDrag());

            // Mouse wheel zoom
            this.mapContainer.addEventListener('wheel', (e) => {
                e.preventDefault();
                const scale = e.deltaY > 0 ? 0.9 : 1.1;
                this.zoomMap(scale);
            });

            console.log('✅ Enhanced map interactions setup complete');
        }

        startMapDrag(e) {
            if (e.touches && e.touches.length > 1) return;

            this.isDraggingMap = true;
            this.mapContainer.style.cursor = 'grabbing';

            const clientX = e.touches ? e.touches[0].clientX : e.clientX;
            const clientY = e.touches ? e.touches[0].clientY : e.clientY;

            this.lastTouchX = clientX;
            this.lastTouchY = clientY;

            if (e.preventDefault) e.preventDefault();
        }

        dragMap(e) {
            if (!this.isDraggingMap) return;

            const clientX = e.touches ? e.touches[0].clientX : e.clientX;
            const clientY = e.touches ? e.touches[0].clientY : e.clientY;

            const deltaX = clientX - this.lastTouchX;
            const deltaY = clientY - this.lastTouchY;

            this.mapTranslateX += deltaX;
            this.mapTranslateY += deltaY;

            this.updateMapTransform();

            this.lastTouchX = clientX;
            this.lastTouchY = clientY;

            if (e.preventDefault) e.preventDefault();
        }

        endMapDrag() {
            this.isDraggingMap = false;
            if (this.mapContainer) {
                this.mapContainer.style.cursor = 'grab';
            }
        }

        zoomMap(scale) {
            const newScale = Math.max(0.5, Math.min(3, this.mapScale * scale));
            
            if (newScale !== this.mapScale) {
                this.mapScale = newScale;
                this.updateMapTransform();

                if (navigator.vibrate) {
                    navigator.vibrate(10);
                }
            }
        }

        updateMapTransform() {
            if (this.mapContainer) {
                this.mapContainer.style.transform = `translate(${this.mapTranslateX}px, ${this.mapTranslateY}px) scale(${this.mapScale})`;
            }
        }

        // ENHANCED: Demo token markers with better labels
        addDemoTokenMarkers() {
            console.log('💎 Adding enhanced demo token markers...');
            try {
                const markersContainer = document.getElementById('demoMarkers');
                const labelsContainer = document.getElementById('demoLabels');
                
                if (!markersContainer || !labelsContainer) {
                    console.error('❌ Demo markers containers not found');
                    return;
                }

                markersContainer.innerHTML = '';
                labelsContainer.innerHTML = '';

                let markerCount = 0;
                this.emberTokens.forEach((token, index) => {
                    if (!this.isTokenCollected(token.id)) {
                        this.addEnhancedDemoMarker(token, index, markersContainer, labelsContainer);
                        markerCount++;
                    }
                });

                console.log(`✅ Added ${markerCount} enhanced demo markers`);
            } catch (error) {
                console.error('❌ Demo token markers error:', error);
            }
        }

        addEnhancedDemoMarker(token, index, markersContainer, labelsContainer) {
            try {
                const positions = [
                    { x: 52, y: 48 }, // Demo nearby token
                    { x: 45, y: 60 }, { x: 75, y: 25 }, { x: 55, y: 85 },
                    { x: 80, y: 30 }, { x: 50, y: 90 }, { x: 40, y: 70 },
                    { x: 65, y: 15 }, { x: 70, y: 45 }, { x: 35, y: 55 },
                    { x: 45, y: 75 }, { x: 60, y: 65 }, { x: 70, y: 20 }
                ];

                const position = positions[index] || { 
                    x: 50 + (index * 10) % 40, 
                    y: 50 + (index * 15) % 40 
                };

                // Create enhanced marker
                const marker = document.createElement('div');
                marker.className = `demo-token-marker ${token.tier}`;
                marker.style.left = `${position.x}%`;
                marker.style.top = `${position.y}%`;
                marker.title = `${token.location} - ${token.value} $Ember`;
                marker.dataset.tokenId = token.id;

                const tokenImage = document.createElement('img');
                tokenImage.src = '../images/VPEmberCoin.PNG';
                tokenImage.alt = 'Ember Coin';
                tokenImage.className = 'demo-token-image';
                tokenImage.onerror = function() {
                    this.style.display = 'none';
                    marker.textContent = '💎';
                    marker.style.fontSize = '16px';
                    marker.style.color = '#f0a500';
                };

                // ENHANCED: Better value overlay
                const valueOverlay = document.createElement('div');
                valueOverlay.className = 'demo-token-value';
                valueOverlay.textContent = `${token.value} $E`;

                marker.appendChild(tokenImage);
                marker.appendChild(valueOverlay);

                // ENHANCED: Click handler shows proper flow
                marker.addEventListener('click', (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    
                    // Visual feedback
                    marker.style.transform = 'scale(1.2)';
                    marker.style.zIndex = '1000';
                    
                    setTimeout(() => {
                        marker.style.transform = 'scale(1)';
                        marker.style.zIndex = '';
                    }, 300);
                    
                    // Calculate distance and show modal
                    token.distance = this.calculateDistance(
                        this.userLat, this.userLng,
                        token.lat, token.lng
                    );
                    
                    this.showTokenModal(token);
                    
                    if (navigator.vibrate) {
                        navigator.vibrate(30);
                    }
                });

                markersContainer.appendChild(marker);

                // Animate appearance
                setTimeout(() => {
                    marker.style.opacity = '1';
                    marker.style.animation = `markerPulse 3s ease-in-out infinite ${index * 0.2}s`;
                }, index * 150);

            } catch (error) {
                console.error('❌ Enhanced demo marker creation error:', error);
            }
        }

        // ENHANCED: Token modal flow (replaces old discovery modal)
        showTokenModal(token) {
            console.log('🎯 Showing token modal for:', token.location);
            
            // Hide all other UI
            this.hideProximityNotification();
            this.collapseModule();
            
            // Check if close enough for AR
            const isCloseEnough = token.distance <= 0.1; // 100m
            
            if (isCloseEnough) {
                // Show collection modal
                this.showTokenCollectionModal(token);
            } else {
                // Show navigation modal
                this.showNavigationModal(token);
            }
        }

        // ENHANCED: Token collection modal (clean flow)
        showTokenCollectionModal(token) {
            console.log('💎 Showing token collection modal for:', token.location);
            try {
                const modal = document.getElementById('tokenDiscovery');
                if (!modal) return;
                
                // Update modal content
                const tokenAmountBadge = document.getElementById('tokenAmountBadge');
                const discoveredTokenAmount = document.getElementById('discoveredTokenAmount');
                const discoveredTokenUSD = document.getElementById('discoveredTokenUSD');
                const discoveredTokenLocation = document.getElementById('discoveredTokenLocation');
                
                if (tokenAmountBadge) tokenAmountBadge.textContent = `${token.value} $Ember`;
                if (discoveredTokenAmount) discoveredTokenAmount.textContent = `${token.value} $Ember`;
                if (discoveredTokenUSD) discoveredTokenUSD.textContent = `~${(token.value * 0.001).toFixed(2)} USD`;
                if (discoveredTokenLocation) discoveredTokenLocation.textContent = token.location;
                
                // Show front view first
                const frontView = document.getElementById('sponsorInfoFront');
                const backView = document.getElementById('sponsorInfoBack');
                if (frontView) frontView.style.display = 'block';
                if (backView) backView.style.display = 'none';
                
                // Setup collect button
                const collectBtn = document.getElementById('collectTokenBtn');
                if (collectBtn) {
                    collectBtn.onclick = () => {
                        this.collectToken(token);
                        this.hideTokenDiscoveryModal();
                        
                        // Show success feedback
                        if (navigator.vibrate) {
                            navigator.vibrate([200, 100, 200]);
                        }
                    };
                }
                
                // Setup sponsor info button
                const sponsorInfoBtn = document.getElementById('sponsorInfoBtn');
                if (sponsorInfoBtn) {
                    sponsorInfoBtn.onclick = () => {
                        this.showSponsorDetails(token);
                    };
                }
                
                modal.classList.add('show');
                
            } catch (error) {
                console.error('❌ Token collection modal error:', error);
            }
        }

        showSponsorDetails(token) {
            console.log('ℹ️ Showing sponsor details for:', token.sponsor);
            
            const frontView = document.getElementById('sponsorInfoFront');
            const backView = document.getElementById('sponsorInfoBack');
            
            if (frontView) frontView.style.display = 'none';
            if (backView) backView.style.display = 'block';
            
            // Update sponsor details
            const sponsorName = document.getElementById('sponsorDetailsName');
            const sponsorDescription = document.getElementById('sponsorDetailsDescription');
            
            if (sponsorName) sponsorName.textContent = token.sponsor;
            if (sponsorDescription) sponsorDescription.textContent = token.description;
            
            // Setup back button
            const backBtn = document.getElementById('sponsorBackBtn');
            if (backBtn) {
                backBtn.onclick = () => {
                    if (frontView) frontView.style.display = 'block';
                    if (backView) backView.style.display = 'none';
                };
            }
        }

        collectToken(token) {
            console.log('💎 Collecting token:', token.location, token.value);
            
            // Add to collected tokens
            this.collectedTokens.push({
                ...token,
                collectedAt: new Date().toISOString(),
                collectedVia: 'Map'
            });
            
            this.saveCollectedTokens();
            
            // Remove marker from map
            const marker = document.querySelector(`[data-token-id="${token.id}"]`);
            if (marker) {
                marker.style.animation = 'none';
                marker.style.transform = 'scale(0)';
                marker.style.opacity = '0';
                setTimeout(() => marker.remove(), 300);
            }
        }

        hideTokenDiscoveryModal() {
            const modal = document.getElementById('tokenDiscovery');
            if (modal) {
                modal.classList.remove('show');
            }
        }

        // ENHANCED: Navigation modal with AR option when close
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
                
                if (tokenName) tokenName.textContent = `${token.value} $Ember Token`;
                
                if (token.distance) {
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

        // ENHANCED: Proximity checking with better timing
        checkTokenProximity() {
            const now = Date.now();
            if (now - this.lastProximityCheck < 3000) return; // Throttle to every 3 seconds
            this.lastProximityCheck = now;
            
            console.log('📍 Checking token proximity...');
            
            const uncollectedTokens = this.emberTokens.filter(token => !this.isTokenCollected(token.id));
            
            let nearestToken = null;
            let minDistance = Infinity;
            
            uncollectedTokens.forEach(token => {
                const distance = this.calculateDistance(
                    this.userLat, this.userLng,
                    token.lat, token.lng
                );
                
                if (distance < minDistance) {
                    minDistance = distance;
                    nearestToken = token;
                }
            });
            
            const proximityThreshold = 0.1; // 100m
            const wasNearToken = this.isNearToken;
            this.isNearToken = nearestToken && minDistance <= proximityThreshold;
            
            console.log('📍 Nearest token:', nearestToken?.location, 'Distance:', minDistance.toFixed(3), 'km');
            
            // Show proximity notification only after map loads
            if (this.isNearToken && !wasNearToken && this.mapLoadingComplete) {
                this.showProximityNotification(nearestToken);
            } else if (!this.isNearToken && wasNearToken) {
                this.hideProximityNotification();
            }
            
            this.updateARModeAvailability();
            
            // Start interval if not running
            if (!this.proximityCheckInterval) {
                this.proximityCheckInterval = setInterval(() => {
                    this.checkTokenProximity();
                }, 5000);
            }
        }

        // ENHANCED: Proximity notification
        showProximityNotification(token) {
            console.log('📢 Showing proximity notification for:', token.location);
            try {
                const notification = document.getElementById('proximityNotification');
                if (!notification) return;

                const title = notification.querySelector('.proximity-title');
                const subtitle = notification.querySelector('.proximity-subtitle');
                const button = notification.querySelector('.proximity-button');

                if (title) title.textContent = `${token.location} Found!`;
                if (subtitle) subtitle.textContent = `${token.value} $Ember token detected nearby. Switch to AR Mode to collect!`;
                
                if (button) {
                    button.onclick = () => {
                        this.hideProximityNotification();
                        this.switchMode('ar');
                    };
                }

                notification.classList.add('show');

                if (navigator.vibrate) {
                    navigator.vibrate([200, 100, 200]);
                }

            } catch (error) {
                console.error('❌ Proximity notification error:', error);
            }
        }

        hideProximityNotification() {
            const notification = document.getElementById('proximityNotification');
            if (notification) {
                notification.classList.remove('show');
            }
        }

        updateARModeAvailability() {
            const arTab = document.querySelector('.nav-tab[data-mode="ar"]');
            
            if (arTab) {
                if (this.isNearToken) {
                    arTab.style.opacity = '1';
                    arTab.style.pointerEvents = 'auto';
                    arTab.classList.remove('disabled');
                } else {
                    arTab.style.opacity = '0.5';
                    arTab.style.pointerEvents = 'none';
                    arTab.classList.add('disabled');
                }
            }
        }

        // ENHANCED: AR Mode with no access modal
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

        showARNoAccessModal() {
            console.log('🚫 Showing AR no access modal');
            
            // Find nearest token
            const uncollectedTokens = this.emberTokens.filter(token => !this.isTokenCollected(token.id));
            const nearest = uncollectedTokens.reduce((closest, token) => {
                const distance = this.calculateDistance(this.userLat, this.userLng, token.lat, token.lng);
                return !closest || distance < closest.distance ? 
                    { ...token, distance } : closest;
            }, null);
            
            // Create and show modal
            const modalHTML = `
                <div class="ar-no-access-modal show" id="arNoAccessModal">
                    <div class="ar-no-access-content">
                        <div class="ar-no-access-title">
                            🔒 AR Mode Locked
                        </div>
                        <div class="ar-no-access-text">
                            You need to be within 100 meters of a token location to access AR hunting mode.
                        </div>
                        ${nearest ? `
                            <div class="nearest-token-info">
                                <div class="nearest-token-name">Nearest: ${nearest.location}</div>
                                <div class="nearest-token-distance">${nearest.distance < 1 ? 
                                    `${(nearest.distance * 1000).toFixed(0)}m away` : 
                                    `${nearest.distance.toFixed(1)}km away`}</div>
                            </div>
                        ` : ''}
                        <button class="ar-no-access-close" onclick="vaultPhoenixApp.hideARNoAccessModal()">
                            Got it!
                        </button>
                    </div>
                </div>
            `;
            
            // Add to body
            const existingModal = document.getElementById('arNoAccessModal');
            if (existingModal) existingModal.remove();
            
            document.body.insertAdjacentHTML('beforeend', modalHTML);
        }

        hideARNoAccessModal() {
            const modal = document.getElementById('arNoAccessModal');
            if (modal) {
                modal.classList.remove('show');
                setTimeout(() => modal.remove(), 300);
            }
        }

        // Continue with remaining methods...
