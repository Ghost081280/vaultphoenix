// Vault Phoenix AR Crypto Gaming - ENHANCED SLIDER NAVIGATION JavaScript

(function() {
    const cryptoFlag = document.getElementById('cryptoGameFlag');
    const isCryptoPage = cryptoFlag || 
                        document.body.classList.contains('crypto-dashboard-page') || 
                        window.location.pathname.includes('crypto-game') ||
                        document.title.includes('Vault Phoenix');
    
    if (!isCryptoPage) return;
    
    window.isVaultPhoenixGame = true;
})();

if (window.isVaultPhoenixGame) {

    class VaultPhoenixGame {
        constructor() {
            this.currentScreen = 'hunt';
            this.playerLat = 33.4484;
            this.playerLng = -112.0740;
            this.collectedTokens = [];
            this.totalEmberTokens = 0;
            this.currentDiscoveredToken = null;
            this.currentNavigationToken = null;
            this.showingCollectionActions = false;
            this.targetedTokenForAR = null;
            
            this.mapScale = 1.2;
            this.mapTranslateX = 0;
            this.mapTranslateY = 0;
            this.mapMinScale = 0.8;
            this.mapMaxScale = 2.5;
            this.mapIsDragging = false;
            this.mapDragStart = { x: 0, y: 0 };
            
            this.cameraStream = null;
            this.arTokens = [];
            this.arUITimer = null;
            this.watchId = null;
            
            this.moduleExpanded = false;
            this.sponsorExpanded = false;
            
            this.airdropShown = sessionStorage.getItem('vaultPhoenix_airdropShown') === 'true';
            this.airdropTimer = null;
            this.airdropCountdownTimer = null;
            this.pendingAirdropValue = 0;
            this.airdropCollected = false;
            this.airdropTimeLeft = 30;
            
            this.radarUpdateInterval = null;
            this.nearbyTokenCount = 0;
            
            this.emberTokens = [
                { id: 1, value: 500, location: "Downtown Phoenix Plaza", lat: 33.4485, lng: -112.0741, sponsor: "Phoenix Downtown Partnership", message: "Premium downtown experience awaits!", description: "Enjoy VIP access to downtown events, priority parking, and exclusive dining experiences at Phoenix's premier entertainment district.", distance: 15, collectable: true, mapX: 48, mapY: 46, phone: "(602) 555-0123", address: "1 E Washington St, Phoenix, AZ 85004", website: "https://downtownphoenix.com", redemptionOptions: [{ icon: "🍽️", cost: "100 $Ember", desc: "Lunch Credit" }, { icon: "🅿️", cost: "50 $Ember", desc: "Free Parking" }, { icon: "🎫", cost: "200 $Ember", desc: "Event Ticket" }, { icon: "☕", cost: "25 $Ember", desc: "Coffee & Pastry" }] },
                { id: 2, value: 250, location: "Heritage Square", lat: 33.4483, lng: -112.0742, sponsor: "Arizona Heritage Foundation", message: "Discover Phoenix history!", description: "Experience guided historic tours, museum access, and exclusive educational programs celebrating Arizona's rich cultural heritage.", distance: 18, collectable: true, mapX: 54, mapY: 54, phone: "(602) 555-0124", address: "115 N 6th St, Phoenix, AZ 85004", website: "https://heritagesquarephx.org", redemptionOptions: [{ icon: "🏛️", cost: "150 $Ember", desc: "Museum Tour" }, { icon: "📚", cost: "75 $Ember", desc: "History Book" }, { icon: "🎧", cost: "50 $Ember", desc: "Audio Guide" }, { icon: "📸", cost: "100 $Ember", desc: "Photo Package" }] },
                { id: 3, value: 300, location: "Roosevelt Row Arts", lat: 33.4486, lng: -112.0739, sponsor: "Local Artists Collective", message: "Support local Phoenix artists!", description: "Gain access to exclusive art gallery openings, artist meet-and-greets, and special purchasing opportunities for local artwork.", distance: 20, collectable: true, mapX: 44, mapY: 42, phone: "(602) 555-0125", address: "300 E Roosevelt St, Phoenix, AZ 85004", website: "https://rooseveltrow.org", redemptionOptions: [{ icon: "🎨", cost: "200 $Ember", desc: "Art Print" }, { icon: "🖼️", cost: "150 $Ember", desc: "Gallery Pass" }, { icon: "☕", cost: "50 $Ember", desc: "Artist Cafe" }, { icon: "🎭", cost: "100 $Ember", desc: "Workshop" }] },
                { id: 4, value: 750, location: "Chase Field", lat: 33.4453, lng: -112.0667, sponsor: "Arizona Diamondbacks", message: "Baseball season tickets await!", description: "Experience premium baseball with season ticket holder perks, dugout tours, and exclusive team merchandise discounts.", distance: 850, collectable: false, mapX: 46, mapY: 68, phone: "(602) 555-0126", address: "401 E Jefferson St, Phoenix, AZ 85004", website: "https://mlb.com/dbacks", redemptionOptions: [{ icon: "⚾", cost: "500 $Ember", desc: "Game Ticket" }, { icon: "🍕", cost: "100 $Ember", desc: "Concession Credit" }, { icon: "👕", cost: "200 $Ember", desc: "Team Jersey" }, { icon: "🎫", cost: "300 $Ember", desc: "VIP Experience" }] },
                { id: 5, value: 400, location: "Phoenix Sky Harbor", lat: 33.4343, lng: -112.0116, sponsor: "Sky Harbor Shops", message: "Travel rewards await!", description: "Unlock travel perks including priority security, duty-free shopping discounts, and airport lounge access benefits.", distance: 1500, collectable: false, mapX: 35, mapY: 85, phone: "(602) 555-0127", address: "3400 E Sky Harbor Blvd, Phoenix, AZ 85034", website: "https://skyharbor.com", redemptionOptions: [{ icon: "✈️", cost: "300 $Ember", desc: "Lounge Access" }, { icon: "🛍️", cost: "150 $Ember", desc: "Duty Free Deal" }, { icon: "☕", cost: "50 $Ember", desc: "Airport Cafe" }, { icon: "🅿️", cost: "100 $Ember", desc: "Parking Credit" }] },
                { id: 6, value: 600, location: "Scottsdale Quarter", lat: 33.4942, lng: -111.9261, sponsor: "Scottsdale Fashion Square", message: "Premium shopping rewards!", description: "Enjoy luxury shopping with VIP personal shopping services, exclusive brand access, and special member-only events.", distance: 2200, collectable: false, mapX: 82, mapY: 25, phone: "(602) 555-0128", address: "15059 N Scottsdale Rd, Scottsdale, AZ 85254", website: "https://fashionsquare.com", redemptionOptions: [{ icon: "🛍️", cost: "400 $Ember", desc: "Shopping Credit" }, { icon: "💅", cost: "200 $Ember", desc: "Spa Service" }, { icon: "🍽️", cost: "150 $Ember", desc: "Fine Dining" }, { icon: "🎁", cost: "100 $Ember", desc: "Gift Wrap" }] },
                { id: 7, value: 350, location: "Desert Botanical Garden", lat: 33.4619, lng: -111.9463, sponsor: "Garden Cafe", message: "Nature dining experience!", description: "Experience farm-to-table dining surrounded by stunning desert flora, with guided nature walks and botanical workshops.", distance: 1800, collectable: false, mapX: 75, mapY: 38, phone: "(602) 555-0129", address: "1201 N Galvin Pkwy, Phoenix, AZ 85008", website: "https://dbg.org", redemptionOptions: [{ icon: "🌿", cost: "200 $Ember", desc: "Garden Tour" }, { icon: "🥗", cost: "150 $Ember", desc: "Farm Lunch" }, { icon: "🌸", cost: "100 $Ember", desc: "Plant Workshop" }, { icon: "📸", cost: "75 $Ember", desc: "Photo Tour" }] },
                { id: 8, value: 500, location: "Camelback Mountain", lat: 33.5186, lng: -111.9717, sponsor: "Desert Hiking Adventures", message: "Gear up for adventure!", description: "Professional hiking equipment rentals, guided desert expeditions, and exclusive access to member-only trail experiences.", distance: 2800, collectable: false, mapX: 68, mapY: 18, phone: "(602) 555-0130", address: "5700 N Echo Canyon Pkwy, Phoenix, AZ 85018", website: "https://hikecamelback.com", redemptionOptions: [{ icon: "🥾", cost: "300 $Ember", desc: "Gear Rental" }, { icon: "🗺️", cost: "150 $Ember", desc: "Guided Hike" }, { icon: "💧", cost: "50 $Ember", desc: "Water & Snacks" }, { icon: "📱", cost: "100 $Ember", desc: "GPS Device" }] },
                { id: 9, value: 200, location: "Tempe Town Lake", lat: 33.4255, lng: -111.9400, sponsor: "Lakeside Coffee Co.", message: "Waterfront coffee experience!", description: "Enjoy artisanal coffee with lakeside seating, co-working space access, and exclusive member brewing workshops.", distance: 1200, collectable: false, mapX: 65, mapY: 78, phone: "(602) 555-0131", address: "80 W Rio Salado Pkwy, Tempe, AZ 85281", website: "https://lakesidecoffee.com", redemptionOptions: [{ icon: "☕", cost: "100 $Ember", desc: "Coffee & Pastry" }, { icon: "💻", cost: "150 $Ember", desc: "Co-work Day Pass" }, { icon: "🥐", cost: "75 $Ember", desc: "Breakfast Set" }, { icon: "📚", cost: "50 $Ember", desc: "WiFi & Book" }] },
                { id: 10, value: 450, location: "Papago Park", lat: 33.4581, lng: -111.9485, sponsor: "Arizona Nature Tours", message: "Desert adventure awaits!", description: "Guided desert tours, rock climbing experiences, and exclusive access to hidden geological formations with expert naturalists.", distance: 1600, collectable: false, mapX: 25, mapY: 35, phone: "(602) 555-0132", address: "625 N Galvin Pkwy, Phoenix, AZ 85008", website: "https://arizonanaturetours.com", redemptionOptions: [{ icon: "🧗", cost: "300 $Ember", desc: "Climbing Tour" }, { icon: "🌵", cost: "150 $Ember", desc: "Nature Walk" }, { icon: "📸", cost: "100 $Ember", desc: "Photo Safari" }, { icon: "🎒", cost: "200 $Ember", desc: "Adventure Kit" }] }
            ];

            if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', () => this.init());
            } else {
                this.init();
            }
            
            window.vaultPhoenixGame = this;
        }

        init() {
            try {
                this.loadGameData();
                this.setupEventListeners();
                this.setupSwipeableModule();
                this.initializeMap();
                this.updateUI();
                this.switchScreen('hunt');
                this.initializeRadarSystem();
                
                if (!this.airdropShown) {
                    this.startAirdropSystem();
                }
            } catch (error) {
                console.error('Game initialization error:', error);
            }
        }

        initializeRadarSystem() {
            this.startRadarUpdates();
            this.updateRadarScanner();
        }

        startRadarUpdates() {
            this.radarUpdateInterval = setInterval(() => {
                this.updateRadarScanner();
            }, 2000);
        }

        stopRadarUpdates() {
            if (this.radarUpdateInterval) {
                clearInterval(this.radarUpdateInterval);
                this.radarUpdateInterval = null;
            }
        }

        updateRadarScanner() {
            const radarDots = document.getElementById('radarDots');
            if (!radarDots) return;

            const availableTokens = this.emberTokens.filter(token => !this.isTokenCollected(token.id));
            const collectableTokens = availableTokens.filter(token => token.collectable);
            
            this.nearbyTokenCount = collectableTokens.length;
            radarDots.innerHTML = '';
            
            if (this.nearbyTokenCount > 0) {
                const dotPositions = [
                    { top: '25%', left: '30%' },
                    { top: '60%', left: '70%' },
                    { top: '40%', left: '15%' },
                    { top: '70%', left: '45%' }
                ];
                
                for (let i = 0; i < Math.min(this.nearbyTokenCount, 4); i++) {
                    const dot = document.createElement('div');
                    dot.className = 'radar-dot';
                    dot.style.top = dotPositions[i].top;
                    dot.style.left = dotPositions[i].left;
                    dot.style.animationDelay = `${i * 0.5}s`;
                    radarDots.appendChild(dot);
                }
            }
        }

        startAirdropSystem() {
            if (!this.airdropShown) {
                const delay = (7 + Math.random() * 2) * 1000;
                this.airdropTimer = setTimeout(() => {
                    this.showAirdropNotification();
                }, delay);
            }
        }

        showAirdropNotification() {
            if (this.airdropShown) return;
            
            const notification = document.getElementById('airdropNotification');
            if (!notification) return;

            const airdropValues = [250, 500, 750, 1000];
            const randomValue = airdropValues[Math.floor(Math.random() * airdropValues.length)];

            this.pendingAirdropValue = randomValue;
            this.airdropShown = true;
            this.airdropCollected = false;
            this.airdropTimeLeft = 30;
            
            sessionStorage.setItem('vaultPhoenix_airdropShown', 'true');
            this.updateAirdropUI(false);
            notification.classList.add('show');
            this.startAirdropCountdown();
            
            if (navigator.vibrate) {
                navigator.vibrate([100, 50, 100]);
            }
        }

        startAirdropCountdown() {
            const timerEl = document.getElementById('airdropTimer');
            if (!timerEl) return;
            
            this.airdropCountdownTimer = setInterval(() => {
                this.airdropTimeLeft--;
                
                if (timerEl) {
                    timerEl.textContent = `Expires in ${this.airdropTimeLeft}s`;
                }
                
                if (this.airdropTimeLeft <= 0) {
                    this.expireAirdrop();
                }
            }, 1000);
        }

        expireAirdrop() {
            if (this.airdropCountdownTimer) {
                clearInterval(this.airdropCountdownTimer);
                this.airdropCountdownTimer = null;
            }
            
            this.hideAirdropNotification();
            this.pendingAirdropValue = 0;
        }

        updateAirdropUI(collected) {
            const titleEl = document.getElementById('airdropTitle');
            const amountEl = document.getElementById('airdropAmount');
            const subtitleEl = document.getElementById('airdropSubtitle');
            const timerEl = document.getElementById('airdropTimer');
            const buttonEl = document.getElementById('airdropClaimButton');
            const buttonTextEl = document.getElementById('airdropButtonText');
            const contentEl = document.querySelector('.airdrop-content');
            
            if (collected) {
                if (titleEl) titleEl.textContent = '$Ember Collected!';
                if (amountEl) amountEl.textContent = `${this.pendingAirdropValue} $Ember`;
                if (subtitleEl) subtitleEl.textContent = 'Successfully added to your vault!';
                if (timerEl) timerEl.style.display = 'none';
                if (buttonEl) buttonEl.style.display = 'none';
                if (contentEl) contentEl.classList.add('airdrop-collected');
            } else {
                if (titleEl) titleEl.textContent = '$Ember Airdrop!';
                if (amountEl) amountEl.textContent = `${this.pendingAirdropValue} $Ember`;
                if (subtitleEl) subtitleEl.textContent = 'Limited time bonus - collect now!';
                if (timerEl) {
                    timerEl.style.display = 'inline-block';
                    timerEl.textContent = `Expires in ${this.airdropTimeLeft}s`;
                }
                if (buttonTextEl) buttonTextEl.textContent = 'Collect Now';
                if (buttonEl) {
                    buttonEl.style.display = 'flex';
                    buttonEl.style.background = 'linear-gradient(135deg, #f0a500, #fb923c)';
                }
                if (contentEl) contentEl.classList.remove('airdrop-collected');
            }
        }

        handleAirdropButtonClick() {
            if (!this.airdropCollected) {
                this.claimAirdrop();
            }
        }

        claimAirdrop() {
            if (!this.pendingAirdropValue || this.airdropCollected) return;
            
            if (this.airdropCountdownTimer) {
                clearInterval(this.airdropCountdownTimer);
                this.airdropCountdownTimer = null;
            }
            
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
            
            this.airdropCollected = true;
            this.saveGameData();
            this.updateUI();
            this.updateVaultDisplay();
            this.updateAirdropUI(true);
            
            if (navigator.vibrate) {
                navigator.vibrate([100, 50, 100, 50, 200]);
            }
            
            setTimeout(() => {
                this.hideAirdropNotification();
            }, 3000);
        }

        hideAirdropNotification() {
            const notification = document.getElementById('airdropNotification');
            if (notification) {
                notification.classList.remove('show');
            }
            
            if (this.airdropCountdownTimer) {
                clearInterval(this.airdropCountdownTimer);
                this.airdropCountdownTimer = null;
            }
            
            this.pendingAirdropValue = 0;
        }

        switchScreen(screen, targetTokenId = null) {
            this.currentScreen = screen;
            this.collapseModule();
            
            if (screen === 'ar') {
                if (targetTokenId) {
                    this.targetedTokenForAR = targetTokenId;
                } else {
                    this.targetedTokenForAR = null;
                }
            }
            
            document.querySelectorAll('.hunt-screen, .ar-screen, .vault-screen').forEach(el => {
                el.classList.remove('active');
                el.style.display = 'none';
            });
            
            const targetScreen = document.getElementById(screen + 'Screen');
            if (targetScreen) {
                targetScreen.style.display = 'block';
                targetScreen.classList.add('active');
            }
            
            this.updateNavigation();
            
            switch (screen) {
                case 'hunt':
                    this.stopARMode();
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
            
            this.updateNearbyTokens();
        }

        updateNavigation() {
            // Update quick nav buttons in slider
            document.querySelectorAll('.quick-nav-btn').forEach(btn => {
                btn.classList.remove('active');
                if (btn.dataset.nav === this.currentScreen) {
                    btn.classList.add('active');
                }
            });
            
            // Update side menu items
            document.querySelectorAll('.menu-item').forEach(item => {
                item.classList.remove('active');
                if (item.dataset.mode === this.currentScreen) {
                    item.classList.add('active');
                }
            });
        }

        initializeMap() {
            const mapContainer = document.getElementById('mapContainer');
            const phoenixMap = document.getElementById('phoenixMap');
            
            if (!mapContainer || !phoenixMap) return;

            this.setupMapControls();
            this.setupMapDragging();
            this.updateMapTokens();
            this.centerMapOnPlayer();
        }

        setupMapControls() {
            const zoomInBtn = document.getElementById('zoomInBtn');
            const zoomOutBtn = document.getElementById('zoomOutBtn');
            const centerMapBtn = document.getElementById('centerMapBtn');

            if (zoomInBtn) {
                zoomInBtn.addEventListener('click', (e) => {
                    e.preventDefault();
                    this.zoomMap(1.2);
                });
            }

            if (zoomOutBtn) {
                zoomOutBtn.addEventListener('click', (e) => {
                    e.preventDefault();
                    this.zoomMap(0.8);
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
                e.preventDefault();
                const clientX = e.touches ? e.touches[0].clientX : e.clientX;
                const clientY = e.touches ? e.touches[0].clientY : e.clientY;
                
                isDragging = true;
                startX = clientX - currentX;
                startY = clientY - currentY;
                this.mapDragStart = { x: clientX, y: clientY };
                this.mapIsDragging = false;
            };

            const handleMove = (e) => {
                if (!isDragging) return;
                e.preventDefault();
                
                const clientX = e.touches ? e.touches[0].clientX : e.clientX;
                const clientY = e.touches ? e.touches[0].clientY : e.clientY;
                
                const deltaX = Math.abs(clientX - this.mapDragStart.x);
                const deltaY = Math.abs(clientY - this.mapDragStart.y);
                
                if (deltaX > 5 || deltaY > 5) {
                    this.mapIsDragging = true;
                    currentX = clientX - startX;
                    currentY = clientY - startY;
                    this.updateMapTransform(currentX, currentY, this.mapScale);
                }
            };

            const handleEnd = (e) => {
                if (!isDragging) return;
                e.preventDefault();
                
                isDragging = false;
                this.mapTranslateX = currentX;
                this.mapTranslateY = currentY;
                
                setTimeout(() => {
                    this.mapIsDragging = false;
                }, 100);
            };

            mapContainer.addEventListener('mousedown', handleStart);
            mapContainer.addEventListener('touchstart', handleStart, { passive: false });
            
            document.addEventListener('mousemove', handleMove);
            document.addEventListener('touchmove', handleMove, { passive: false });
            
            document.addEventListener('mouseup', handleEnd);
            document.addEventListener('touchend', handleEnd);
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
                
                if (navigator.vibrate) navigator.vibrate(25);
            }
        }

        centerMapOnPlayer() {
            this.mapTranslateX = 0;
            this.mapTranslateY = 0;
            this.mapScale = 1.2;
            this.updateMapTransform(0, 0, 1.2);
            
            if (navigator.vibrate) navigator.vibrate([25, 10, 25]);
        }

        updateMapTokens() {
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

                const handleTokenClick = (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    
                    if (this.mapIsDragging) return;
                    
                    marker.style.transform = 'translate(-50%, -50%) scale(1.1)';
                    setTimeout(() => {
                        marker.style.transform = 'translate(-50%, -50%) scale(1)';
                    }, 200);
                    
                    if (token.collectable) {
                        this.switchScreen('ar', token.id);
                    } else {
                        this.showNavigationModal(token);
                    }
                    
                    if (navigator.vibrate) {
                        navigator.vibrate([40, 15, 40]);
                    }
                };

                marker.addEventListener('click', handleTokenClick);
                marker.addEventListener('touchend', (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    if (!this.mapIsDragging) {
                        handleTokenClick(e);
                    }
                });

                markersContainer.appendChild(marker);
            });
            
            this.updateRadarScanner();
        }

        async startARMode() {
            try {
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

                this.createARTokens();
                this.setupStaticCompass();
                this.startARUITimer();
                
            } catch (error) {
                alert('Camera access is required for AR mode. Please allow camera access and try again.');
                this.switchScreen('hunt');
            }
        }

        setupStaticCompass() {
            const compassNeedle = document.getElementById('compassNeedle');
            if (compassNeedle) {
                compassNeedle.style.transform = 'rotate(0deg)';
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

        createARTokens() {
            const container = document.getElementById('arTokensContainer');
            if (!container) return;

            container.innerHTML = '';

            let tokensToShow = [];

            if (this.targetedTokenForAR) {
                const targetToken = this.emberTokens.find(t => t.id === this.targetedTokenForAR);
                if (targetToken && !this.isTokenCollected(targetToken.id) && targetToken.collectable) {
                    tokensToShow = [targetToken];
                }
            } else {
                tokensToShow = this.emberTokens.filter(token => 
                    !this.isTokenCollected(token.id) && token.collectable
                );
            }
            
            if (tokensToShow.length === 0) return;

            const demoPositions = [
                { x: 20, bearing: 'left' },
                { x: 50, bearing: 'center' },
                { x: 80, bearing: 'right' }
            ];

            tokensToShow.forEach((token, index) => {
                if (index >= demoPositions.length) return;
                
                const position = demoPositions[index];
                const arToken = document.createElement('div');
                arToken.className = 'ar-token near';
                arToken.dataset.tokenId = token.id;
                
                arToken.style.left = `${position.x}%`;
                
                const coin = document.createElement('div');
                coin.className = 'ar-token-coin';
                
                const coinImg = document.createElement('img');
                coinImg.src = '../images/VPEmberCoin.PNG';
                coinImg.alt = 'AR Ember Coin';
                coinImg.className = 'ar-token-img';
                coinImg.onerror = function() {
                    this.style.display = 'none';
                    coin.textContent = '💎';
                    coin.style.fontSize = '28px';
                    coin.style.color = '#f0a500';
                };
                
                coin.appendChild(coinImg);
                arToken.appendChild(coin);
                
                arToken.addEventListener('click', (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    
                    this.collectToken(token, true);
                    
                    if (navigator.vibrate) {
                        navigator.vibrate([80, 40, 80]);
                    }
                });
                
                container.appendChild(arToken);
            });
        }

        stopARMode() {
            if (this.cameraStream) {
                this.cameraStream.getTracks().forEach(track => track.stop());
                this.cameraStream = null;
                
                const video = document.getElementById('cameraVideo');
                if (video) {
                    video.srcObject = null;
                }
            }
            
            const arContainer = document.getElementById('arTokensContainer');
            if (arContainer) {
                arContainer.innerHTML = '';
            }
            
            if (this.arUITimer) {
                clearTimeout(this.arUITimer);
                this.arUITimer = null;
            }
        }

        collectToken(token, fromAR = false) {
            const collectedToken = {
                ...token,
                collectedAt: new Date().toISOString(),
                collectionMethod: fromAR ? 'AR Hunt' : 'Map Collection'
            };
            
            this.collectedTokens.push(collectedToken);
            this.totalEmberTokens += token.value;
            this.saveGameData();
            
            this.updateUI();
            this.updateMapTokens();
            this.updateNearbyTokens();
            this.updateVaultDisplay();
            
            this.showTokenModal(token, fromAR);
            
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
            
            if (this.targetedTokenForAR === token.id) {
                this.targetedTokenForAR = null;
            }
        }

        showTokenModal(token, fromAR = false) {
            const modal = document.getElementById('tokenModal');
            if (!modal) return;
            
            this.currentDiscoveredToken = token;
            this.showingCollectionActions = fromAR;
            this.sponsorExpanded = false;
            
            const titleEl = document.getElementById('tokenFoundTitle');
            if (titleEl) {
                if (fromAR) {
                    titleEl.innerHTML = '<span>🔥 $Ember Token Collected!</span>';
                } else {
                    titleEl.innerHTML = '<span>🔥 $Ember Token Found!</span>';
                }
            }
            
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
            
            this.populateRedemptionOptions(token);
            
            if (fromAR) {
                if (elements.tokenActions) elements.tokenActions.style.display = 'none';
                if (elements.tokenCollectionActions) elements.tokenCollectionActions.style.display = 'flex';
            } else {
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
            } else {
                expandableSection.style.display = 'none';
                toggleIcon.classList.remove('expanded');
                toggleText.textContent = 'Learn More';
            }
            
            if (navigator.vibrate) {
                navigator.vibrate(25);
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
        }

        learnMoreWebsite() {
            if (!this.currentDiscoveredToken || !this.currentDiscoveredToken.website) return;
            
            window.open(this.currentDiscoveredToken.website, '_blank');
        }

        hideTokenModal() {
            const modal = document.getElementById('tokenModal');
            if (modal) {
                modal.classList.remove('show');
                modal.style.display = 'none';
            }
            this.currentDiscoveredToken = null;
            this.showingCollectionActions = false;
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

        showNavigationModal(token) {
            const modal = document.getElementById('navigationModal');
            if (!modal) return;
            
            this.currentNavigationToken = token;
            
            const elements = {
                navTokenName: document.getElementById('navTokenName'),
                navDistance: document.getElementById('navDistance'),
                navEmberAmount: document.getElementById('navEmberAmount'),
                navWalkTime: document.getElementById('navWalkTime'),
                navDriveTime: document.getElementById('navDriveTime')
            };
            
            if (elements.navTokenName) elements.navTokenName.textContent = token.location;
            if (elements.navDistance) elements.navDistance.textContent = `${token.distance}m away`;
            if (elements.navEmberAmount) elements.navEmberAmount.textContent = `${token.value} $Ember`;
            
            const walkMinutes = Math.max(1, Math.round(token.distance / 80));
            const driveMinutes = Math.max(1, Math.round(token.distance / 300));
            
            if (elements.navWalkTime) elements.navWalkTime.textContent = `~${walkMinutes} min`;
            if (elements.navDriveTime) elements.navDriveTime.textContent = `~${driveMinutes} min`;
            
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

        updateVaultDisplay() {
            const elements = {
                vaultBalance: document.getElementById('vaultBalance'),
                vaultUsdValue: document.getElementById('vaultUsdValue'),
                totalCollected: document.getElementById('totalCollected'),
                locationsVisited: document.getElementById('locationsVisited'),
                totalValue: document.getElementById('totalValue'),
                lastActivity: document.getElementById('lastActivity')
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

        updateNearbyTokens() {
            const availableTokens = this.emberTokens.filter(token => !this.isTokenCollected(token.id));
            const collectableTokens = availableTokens.filter(token => token.collectable);
            
            this.updateRadarScanner();

            const nearbyARTokensEl = document.getElementById('nearbyARTokens');
            if (nearbyARTokensEl) {
                if (collectableTokens.length > 0) {
                    nearbyARTokensEl.textContent = `${collectableTokens.length} ready`;
                } else {
                    nearbyARTokensEl.textContent = 'All collected';
                }
            }

            const totalAvailableEl = document.getElementById('totalAvailable');
            if (totalAvailableEl) {
                totalAvailableEl.textContent = `Ready for collection`;
            }

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
                                
                                this.switchScreen('ar', token.id);
                                this.collapseModule();
                                
                                if (navigator.vibrate) navigator.vibrate([30, 10, 30]);
                            }
                        };

                        item.addEventListener('click', handleClick);
                        item.addEventListener('touchend', handleClick);
                    });
                }
            }
        }

        setupSwipeableModule() {
            const handle = document.getElementById('swipeHandle');
            const module = document.getElementById('tokenLocationsModule');
            
            if (!handle || !module) return;
            
            this.collapseModule();
            
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
                const threshold = 50;
                
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
            handle.addEventListener('click', () => {
                this.toggleModule();
            }, { passive: false });
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
                
                if (navigator.vibrate) navigator.vibrate(30);
            }
        }

        collapseModule() {
            const module = document.getElementById('tokenLocationsModule');
            if (module) {
                module.classList.remove('expanded');
                module.classList.add('collapsed');
                this.moduleExpanded = false;
                
                if (navigator.vibrate) navigator.vibrate(20);
            }
        }

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

        resetGame() {
            try {
                this.collectedTokens = [];
                this.totalEmberTokens = 0;
                this.airdropShown = false;
                this.airdropCollected = false;
                this.targetedTokenForAR = null;
                
                localStorage.removeItem('vaultPhoenix_collectedTokens');
                localStorage.removeItem('vaultPhoenix_totalEmberTokens');
                sessionStorage.removeItem('vaultPhoenix_airdropShown');
                
                if (this.airdropTimer) {
                    clearTimeout(this.airdropTimer);
                    this.airdropTimer = null;
                }
                if (this.airdropCountdownTimer) {
                    clearInterval(this.airdropCountdownTimer);
                    this.airdropCountdownTimer = null;
                }
                
                this.updateUI();
                this.updateVaultDisplay();
                this.updateNearbyTokens();
                
                setTimeout(() => {
                    this.updateMapTokens();
                }, 500);
                
                this.startAirdropSystem();
                
            } catch (error) {
                console.error('Game reset error:', error);
            }
        }

        showQRModal() {
            const modal = document.getElementById('qrModal');
            if (modal) {
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

        saveGameData() {
            try {
                localStorage.setItem('vaultPhoenix_collectedTokens', JSON.stringify(this.collectedTokens));
                localStorage.setItem('vaultPhoenix_totalEmberTokens', this.totalEmberTokens.toString());
            } catch (error) {
                console.error('Save error:', error);
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
            } catch (error) {
                console.error('Load error:', error);
                this.collectedTokens = [];
                this.totalEmberTokens = 0;
            }
        }

        isTokenCollected(tokenId) {
            return this.collectedTokens.some(token => token.id === tokenId);
        }

        updateUI() {
            const navEmberCount = document.getElementById('navEmberCount');
            if (navEmberCount) {
                navEmberCount.textContent = this.totalEmberTokens.toLocaleString();
            }
            
            const menuEmberCount = document.getElementById('menuEmberCount');
            if (menuEmberCount) {
                menuEmberCount.textContent = this.totalEmberTokens.toLocaleString();
            }
        }

        destroy() {
            this.stopRadarUpdates();
            
            if (this.airdropTimer) {
                clearTimeout(this.airdropTimer);
                this.airdropTimer = null;
            }
            if (this.airdropCountdownTimer) {
                clearInterval(this.airdropCountdownTimer);
                this.airdropCountdownTimer = null;
            }
            if (this.arUITimer) {
                clearTimeout(this.arUITimer);
                this.arUITimer = null;
            }
            
            this.stopARMode();
        }

        setupEventListeners() {
            // Quick Navigation Buttons (in slider)
            document.querySelectorAll('.quick-nav-btn').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    e.preventDefault();
                    const mode = btn.dataset.nav;
                    if (mode) {
                        this.switchScreen(mode);
                        this.collapseModule();
                    }
                });
            });

            // Side Menu Items
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

            const homeBtn = document.getElementById('homeBtn');
            if (homeBtn) {
                homeBtn.addEventListener('click', (e) => {
                    e.preventDefault();
                    this.switchScreen('hunt');
                });
            }

            const vaultBadge = document.getElementById('vaultBadge');
            if (vaultBadge) {
                vaultBadge.addEventListener('click', (e) => {
                    e.preventDefault();
                    this.switchScreen('vault');
                });
            }

            const menuToggle = document.getElementById('menuToggle');
            if (menuToggle) {
                menuToggle.addEventListener('click', (e) => {
                    e.preventDefault();
                    this.toggleMenu();
                });
            }

            const menuOverlay = document.getElementById('menuOverlay');
            if (menuOverlay) {
                menuOverlay.addEventListener('click', (e) => {
                    e.preventDefault();
                    this.hideMenu();
                });
            }

            const airdropClaimButton = document.getElementById('airdropClaimButton');
            if (airdropClaimButton) {
                airdropClaimButton.addEventListener('click', (e) => {
                    e.preventDefault();
                    this.handleAirdropButtonClick();
                });
            }

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

            const learnMoreToggle = document.getElementById('learnMoreToggle');
            if (learnMoreToggle) {
                learnMoreToggle.addEventListener('click', (e) => {
                    e.preventDefault();
                    this.toggleSponsorDetails();
                });
            }

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

            const navClose = document.getElementById('navClose');
            const navWalking = document.getElementById('navWalking');
            const navDriving = document.getElementById('navDriving');
            
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

            window.addEventListener('beforeunload', () => {
                this.destroy();
            });
        }
    }

    window.vaultPhoenixGame = new VaultPhoenixGame();
}

// =================== END OF JAVASCRIPT FILE ===================
