/* ============================================
   VAULT PHOENIX MANAGEMENT SYSTEM
   $Ember Hunt Demo - Advertisement Token Stop Model
   ============================================ */

// ============================================
// EMBER HUNT LIVE DATA
// ============================================

const EmberHuntDemo = {
    appStatus: 'live',
    appName: '$Ember Hunt',
    
    // Campaign Manager's Token Locations (they manage these)
    campaignTokenLocations: [
        {
            id: 'cm-token-001',
            name: 'Downtown Phoenix Plaza',
            address: '100 N Central Ave, Phoenix, AZ 85004',
            lat: 33.4495,
            lng: -112.0730,
            tokensAllocated: 10000,
            tokensRemaining: 8750,
            tokensCollected: 1250,
            tokenAmount: 75,
            status: 'active',
            message: 'Downtown Phoenix welcomes you! Collect your tokens and discover local businesses.',
            
            // Campaign Manager can now add advertisements too
            hasAdvertisement: true,
            advertisement: {
                title: 'Explore Downtown Phoenix!',
                description: 'Discover amazing local businesses, restaurants, and entertainment. Use your $Ember tokens for exclusive deals!',
                imageUrl: 'images/downtown-phoenix.jpg',
                offer: 'Welcome Bonus',
                offerEmberValue: 0,
                ctaText: 'Explore Downtown',
                ctaUrl: 'https://downtownphoenix.com'
            },
            
            sponsorName: 'Downtown Phoenix Inc.',
            sponsorInfo: 'Building a vibrant urban core',
            ctaButtons: [
                { text: 'Explore Downtown', url: 'https://downtownphoenix.com' },
                { text: 'Events Calendar', url: 'https://downtownphoenix.com/events' }
            ],
            addedBy: 'Campaign Manager',
            campaign: '$Ember Hunt'
        }
    ],
    
    // Advertiser Token Locations (they pay monthly fee + buy tokens)
    advertiserTokenLocations: [
        {
            id: 'adv-token-001',
            name: 'Heritage Square Historic Site',
            address: '115 N 6th St, Phoenix, AZ 85004',
            lat: 33.4484,
            lng: -112.0740,
            
            // Token allocation
            tokensAllocated: 5000,
            tokensRemaining: 3250,
            tokensCollected: 1750,
            tokenAmount: 50,
            
            status: 'active',
            
            // Advertisement that shows after collection
            advertisement: {
                title: 'Explore Phoenix History!',
                description: 'Visit Heritage Square Historic Site and redeem your $Ember for 10% off museum tours, gift shop purchases, or get a free guided tour souvenir! We accept $Ember redemptions at our front desk.',
                imageUrl: 'images/heritage-square-ad.jpg',
                offer: '10% Off Tours & Gift Shop OR Free Souvenir',
                offerEmberValue: 50,
                ctaText: 'Visit Us & Redeem',
                ctaUrl: 'https://heritagesquarephx.org'
            },
            
            // Redemption tracking
            redemptions: {
                total: 65,
                thisMonth: 65,
                averageTokens: 50,
                totalTokensRedeemed: 3250,
                conversionRate: 7.8
            },
            
            // Advertiser info
            addedBy: 'Advertiser',
            advertiserName: 'Heritage Square Historic Site',
            advertiserEmail: 'marketing@heritagesquare.org',
            campaign: '$Ember Hunt',
            locationCount: 1, // Used for pricing calculation
            monthlyFeePerLocation: 500,
            totalMonthlyFee: 500,
            tokensPurchased: 5000,
            tokenCost: 17.50,
            totalMonthlyInvestment: 517.50,
            
            hasAdvertisement: true,
            scannerWebAppAccess: true,
            
            addedDate: new Date('2024-09-01')
        }
    ],
    
    activePlayers: [
        { id: 'A47', lat: 33.4484, lng: -112.0740, username: 'CryptoHunter47', collecting: true },
        { id: 'B23', lat: 33.4490, lng: -112.0735, username: 'PhoenixGamer23', collecting: false },
        { id: 'C89', lat: 33.4476, lng: -112.0755, username: 'TokenMaster89', collecting: true },
        { id: 'D12', lat: 33.4501, lng: -112.0728, username: 'EmberCollector', collecting: false },
        { id: 'E56', lat: 33.4468, lng: -112.0745, username: 'AZCryptoKing', collecting: true }
    ],
    
    recentActivity: [
        { 
            type: 'collection', 
            player: 'A47', 
            amount: 50, 
            location: 'Heritage Square Historic Site', 
            timestamp: new Date(Date.now() - 2000),
            hasAd: true
        },
        { 
            type: 'redemption', 
            player: 'B23', 
            amount: 50, 
            location: 'Heritage Square Historic Site',
            timestamp: new Date(Date.now() - 47000),
            advertiser: 'Heritage Square Historic Site'
        },
        { 
            type: 'collection', 
            player: 'C89', 
            amount: 75, 
            location: 'Downtown Phoenix Plaza', 
            timestamp: new Date(Date.now() - 120000),
            hasAd: true
        }
    ],
    
    performance: {
        playersNow: 47,
        tokensActive: 156,
        collectionsToday: 278,
        redemptionsToday: 22,
        revenueToday: 834
    }
};

// ============================================
// GOOGLE MAPS INITIALIZATION
// ============================================

let campaignTokenMapInstance;
let cmMarkers = [];
let advMarkers = [];
let playerMarkers = [];
let cmMapFilters = { cm: true, adv: true, players: true };

function initCampaignTokenMap() {
    const mapElement = document.getElementById('campaignTokenMap');
    if (!mapElement) {
        console.log('Map element not found');
        return;
    }
    
    if (typeof google === 'undefined' || typeof google.maps === 'undefined') {
        console.log('Google Maps API not loaded yet');
        mapElement.innerHTML = `
            <div style="height: 100%; display: flex; align-items: center; justify-content: center; flex-direction: column; padding: 40px; text-align: center;">
                <div style="font-size: 3rem; margin-bottom: 20px;">🗺️</div>
                <h3 style="color: var(--color-primary-gold); margin-bottom: 15px;">Loading Google Maps...</h3>
                <p style="color: rgba(255,255,255,0.7); max-width: 500px;">
                    Please wait while the map loads.
                </p>
            </div>
        `;
        return;
    }
    
    console.log('Initializing Campaign Token Map');
    
    try {
        campaignTokenMapInstance = new google.maps.Map(mapElement, {
            center: { lat: 33.4484, lng: -112.0740 },
            zoom: 14,
            styles: [
                { elementType: "geometry", stylers: [{ color: "#1a1a1a" }] },
                { elementType: "labels.text.stroke", stylers: [{ color: "#1a1a1a" }] },
                { elementType: "labels.text.fill", stylers: [{ color: "#746855" }] }
            ]
        });
        
        console.log('Map instance created');
        
        // Clear existing markers
        cmMarkers = [];
        advMarkers = [];
        playerMarkers = [];
        
        // Add Campaign Manager locations (blue)
        EmberHuntDemo.campaignTokenLocations.forEach(location => {
            const marker = new google.maps.Marker({
                position: { lat: location.lat, lng: location.lng },
                map: campaignTokenMapInstance,
                title: location.name,
                icon: {
                    path: google.maps.SymbolPath.CIRCLE,
                    scale: 10,
                    fillColor: '#3b82f6',
                    fillOpacity: 0.9,
                    strokeColor: '#fff',
                    strokeWeight: 2
                }
            });
            
            const infoContent = `
                <div style="color: #000; padding: 10px; max-width: 300px;">
                    <h4 style="margin: 0 0 10px 0; color: #3b82f6;">📍 ${location.name}</h4>
                    <p style="margin: 5px 0;"><strong>Type:</strong> Campaign Location</p>
                    <p style="margin: 5px 0;"><strong>Tokens:</strong> ${location.tokensRemaining.toLocaleString()} remaining</p>
                    <p style="margin: 5px 0;"><strong>Amount:</strong> ${location.tokenAmount} per collection</p>
                    <p style="margin: 5px 0;"><strong>Advertisement:</strong> ${location.hasAdvertisement ? 'Yes' : 'No'}</p>
                </div>
            `;
            
            const infoWindow = new google.maps.InfoWindow({ content: infoContent });
            marker.addListener('click', () => infoWindow.open(campaignTokenMapInstance, marker));
            cmMarkers.push(marker);
        });
        
        // Add Advertiser locations (gold)
        EmberHuntDemo.advertiserTokenLocations.forEach(location => {
            const marker = new google.maps.Marker({
                position: { lat: location.lat, lng: location.lng },
                map: campaignTokenMapInstance,
                title: location.name,
                icon: {
                    path: google.maps.SymbolPath.CIRCLE,
                    scale: 10,
                    fillColor: '#f0a500',
                    fillOpacity: 0.9,
                    strokeColor: '#fff',
                    strokeWeight: 2
                }
            });
            
            const infoContent = `
                <div style="color: #000; padding: 10px; max-width: 300px;">
                    <h4 style="margin: 0 0 10px 0; color: #f0a500;">🏢 ${location.name}</h4>
                    <p style="margin: 5px 0;"><strong>Type:</strong> Advertiser Location</p>
                    <p style="margin: 5px 0;"><strong>Advertiser:</strong> ${location.advertiserName}</p>
                    <p style="margin: 5px 0;"><strong>Locations:</strong> ${location.locationCount}</p>
                    <p style="margin: 5px 0;"><strong>Tokens:</strong> ${location.tokensRemaining.toLocaleString()} remaining</p>
                    <p style="margin: 5px 0;"><strong>Redeemed:</strong> ${location.redemptions.totalTokensRedeemed.toLocaleString()}</p>
                    <p style="margin: 5px 0;"><strong>Advertisement:</strong> Yes</p>
                </div>
            `;
            
            const infoWindow = new google.maps.InfoWindow({ content: infoContent });
            marker.addListener('click', () => infoWindow.open(campaignTokenMapInstance, marker));
            advMarkers.push(marker);
        });
        
        // Add Players (green)
        EmberHuntDemo.activePlayers.forEach(player => {
            const marker = new google.maps.Marker({
                position: { lat: player.lat, lng: player.lng },
                map: campaignTokenMapInstance,
                title: player.username,
                icon: {
                    path: google.maps.SymbolPath.CIRCLE,
                    scale: 8,
                    fillColor: '#22c55e',
                    fillOpacity: 0.9,
                    strokeColor: '#fff',
                    strokeWeight: 2
                }
            });
            playerMarkers.push(marker);
        });
        
        console.log('Markers added:', cmMarkers.length + advMarkers.length + playerMarkers.length);
    } catch (error) {
        console.error('Error initializing map:', error);
        mapElement.innerHTML = `
            <div style="height: 100%; display: flex; align-items: center; justify-content: center; flex-direction: column; padding: 40px; text-align: center;">
                <div style="font-size: 3rem; margin-bottom: 20px;">⚠️</div>
                <h3 style="color: #ef4444; margin-bottom: 15px;">Map Error</h3>
                <p style="color: rgba(255,255,255,0.7); max-width: 500px;">
                    ${error.message}
                </p>
            </div>
        `;
    }
}

function toggleCMMapFilter(type) {
    cmMapFilters[type] = !cmMapFilters[type];
    const button = document.getElementById('filter' + (type === 'cm' ? 'CM' : type === 'adv' ? 'Adv' : 'Players') + 'Locations');
    
    if (type === 'cm') {
        cmMarkers.forEach(m => m.setVisible(cmMapFilters.cm));
        if (button) button.style.opacity = cmMapFilters.cm ? '1' : '0.4';
    } else if (type === 'adv') {
        advMarkers.forEach(m => m.setVisible(cmMapFilters.adv));
        if (button) button.style.opacity = cmMapFilters.adv ? '1' : '0.4';
    } else if (type === 'players') {
        playerMarkers.forEach(m => m.setVisible(cmMapFilters.players));
        if (button) button.style.opacity = cmMapFilters.players ? '1' : '0.4';
    }
}

// Make functions globally available
if (typeof window !== 'undefined') {
    window.initCampaignTokenMap = initCampaignTokenMap;
    window.toggleCMMapFilter = toggleCMMapFilter;
}

// ============================================
// CAMPAIGN MANAGER: TOKEN LOCATION MANAGEMENT
// ============================================

/**
 * Get Campaign Manager's Token Location Management Content
 */
function getCampaignsContent(role) {
    if (role === 'advertiser') {
        return getPlaceholderContent('campaigns');
    }
    
    const allLocations = [...EmberHuntDemo.campaignTokenLocations, ...EmberHuntDemo.advertiserTokenLocations];
    const cmLocations = EmberHuntDemo.campaignTokenLocations;
    const advLocations = EmberHuntDemo.advertiserTokenLocations;
    const totalAdvertisers = 1;
    
    // Set up a delayed initialization for the map
    setTimeout(() => {
        console.log('Attempting to initialize map...');
        if (typeof google !== 'undefined' && typeof google.maps !== 'undefined') {
            initCampaignTokenMap();
        } else {
            console.log('Google Maps not ready, will retry...');
            // Retry a few times
            let retries = 0;
            const retryInterval = setInterval(() => {
                retries++;
                if (typeof google !== 'undefined' && typeof google.maps !== 'undefined') {
                    clearInterval(retryInterval);
                    initCampaignTokenMap();
                } else if (retries > 10) {
                    clearInterval(retryInterval);
                    console.error('Google Maps failed to load after multiple retries');
                }
            }, 500);
        }
    }, 100);
    
    return `
        <div class="dashboard-section">
            <h2 class="section-title">🗺️ $Ember Hunt - Campaign Control & Token Locations</h2>
            
            <!-- Stats Overview -->
            <div class="hero-stats">
                <div class="stat-card">
                    <div class="stat-icon">📍</div>
                    <div class="stat-label">Campaign Token Stops</div>
                    <div class="stat-value">${cmLocations.length}</div>
                    <div class="stat-change">Your locations</div>
                </div>
                
                <div class="stat-card">
                    <div class="stat-icon">🏢</div>
                    <div class="stat-label">Advertiser Token Stops</div>
                    <div class="stat-value">${advLocations.length}</div>
                    <div class="stat-change">${totalAdvertisers} ${totalAdvertisers === 1 ? 'advertiser' : 'advertisers'}</div>
                </div>
                
                <div class="stat-card">
                    <div class="stat-icon">💎</div>
                    <div class="stat-label">Total Tokens Active</div>
                    <div class="stat-value">${allLocations.reduce((sum, loc) => sum + loc.tokensRemaining, 0).toLocaleString()}</div>
                    <div class="stat-change">All locations combined</div>
                </div>
                
                <div class="stat-card">
                    <div class="stat-icon">🎁</div>
                    <div class="stat-label">Redemptions Today</div>
                    <div class="stat-value">${EmberHuntDemo.performance.redemptionsToday}</div>
                    <div class="stat-change positive">Advertisers receiving tokens</div>
                </div>
            </div>
        </div>
        
        <!-- Add Token Location -->
        <div class="dashboard-section">
            <h3 style="font-size: 1.5rem; color: var(--color-primary-gold); margin-bottom: 20px;">
                ➕ Add Campaign Token Locations (With Advertisements)
            </h3>
            
            <div class="card" style="background: rgba(59,130,246,0.1); border: 2px solid rgba(59,130,246,0.3); margin-bottom: 20px;">
                <h4 style="color: #3b82f6; margin-bottom: 12px;">ℹ️ Campaign Manager Locations vs Advertiser Locations</h4>
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
                    <div>
                        <h5 style="color: var(--color-primary-gold); margin-bottom: 10px;">Your Locations:</h5>
                        <ul style="list-style: none; padding: 0; margin: 0; font-size: 0.9rem; line-height: 1.7;">
                            <li>✓ No monthly fees</li>
                            <li>✓ Use your campaign token pool</li>
                            <li>✓ Can include advertisements</li>
                            <li>✓ Scanner web app access</li>
                        </ul>
                    </div>
                    <div>
                        <h5 style="color: var(--color-primary-gold); margin-bottom: 10px;">Advertiser Locations:</h5>
                        <ul style="list-style: none; padding: 0; margin: 0; font-size: 0.9rem; line-height: 1.7;">
                            <li>✓ Pay monthly location fee</li>
                            <li>✓ Purchase their own $Ember tokens</li>
                            <li>✓ Include advertisement content</li>
                            <li>✓ Recover tokens via redemptions</li>
                        </ul>
                    </div>
                </div>
            </div>
            
            <!-- Bulk Upload -->
            <div class="card" style="margin-bottom: 20px;">
                <h4 style="color: var(--color-primary-gold); margin-bottom: 15px;">📤 Bulk Upload (CSV)</h4>
                
                <p style="color: rgba(255,255,255,0.8); margin-bottom: 15px;">
                    Upload multiple campaign token locations at once with advertisement content and call-to-action buttons.
                </p>
                
                <div style="background: rgba(0,0,0,0.3); border-radius: 12px; padding: 15px; margin-bottom: 15px;">
                    <h5 style="margin-bottom: 10px;">CSV Format:</h5>
                    <div style="font-family: monospace; background: rgba(0,0,0,0.5); padding: 12px; border-radius: 8px; overflow-x: auto; font-size: 0.85rem;">
                        <div style="color: #22c55e;">name,address,city,state,zip,token_amount,message,ad_title,ad_description,ad_offer,ad_offer_cost,cta_text,cta_url</div>
                        <div style="color: rgba(255,255,255,0.7);">Downtown Plaza,100 N Central,Phoenix,AZ,85004,75,Welcome!,Special Offer,Visit us for deals,10% Off,50,Visit Now,https://example.com</div>
                    </div>
                </div>
                
                <div style="display: flex; gap: 10px; flex-wrap: wrap;">
                    <a href="data:text/csv;charset=utf-8,name,address,city,state,zip,token_amount,message,ad_title,ad_description,ad_offer,ad_offer_cost,cta_text,cta_url%0AExample Location,123 Main St,Phoenix,AZ,85001,75,Welcome message,Ad Title,Ad Description,Offer Details,50,Click Here,https://example.com" 
                       download="token-locations-template.csv" 
                       class="btn btn-outline">
                        📥 Download CSV Template
                    </a>
                    <button class="btn btn-secondary" onclick="document.getElementById('cmCsvUpload').click()">
                        📤 Upload CSV File
                    </button>
                </div>
                
                <input type="file" id="cmCsvUpload" accept=".csv" style="display: none;" onchange="handleCMCSVUpload(event)">
            </div>
            
            <!-- Single Location Form with Advertisement -->
            <div class="card">
                <h4 style="color: var(--color-primary-gold); margin-bottom: 20px;">
                    📍 Add Single Campaign Token Location
                </h4>
                
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-bottom: 15px;">
                    <div class="form-group">
                        <label class="form-label">Location Name *</label>
                        <input type="text" class="form-input" id="cmLocationName" placeholder="Downtown Phoenix Plaza">
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label">Token Amount per Collection *</label>
                        <input type="number" class="form-input" id="cmTokenAmount" value="75" min="50" step="25">
                    </div>
                </div>
                
                <div class="form-group">
                    <label class="form-label">Address *</label>
                    <input type="text" class="form-input" id="cmAddress" placeholder="100 N Central Ave, Phoenix, AZ 85004">
                    <div class="form-hint">Auto-geocoded to latitude/longitude</div>
                </div>
                
                <div class="form-group">
                    <label class="form-label">Collection Message *</label>
                    <textarea class="form-input" id="cmMessage" rows="2" placeholder="Welcome! Collect your $Ember tokens here..."></textarea>
                    <div class="form-hint">Players see this message after collecting tokens</div>
                </div>
                
                <!-- Advertisement Section -->
                <div style="background: rgba(240,165,0,0.1); border: 2px solid rgba(240,165,0,0.3); border-radius: 12px; padding: 20px; margin: 20px 0;">
                    <h5 style="color: var(--color-primary-gold); margin-bottom: 15px;">📢 Advertisement Content (Optional)</h5>
                    
                    <div class="form-group">
                        <label class="form-label">Advertisement Title</label>
                        <input type="text" class="form-input" id="cmAdTitle" maxlength="60" placeholder="Explore Downtown Phoenix!">
                        <div class="form-hint">Max 60 characters</div>
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label">Advertisement Description</label>
                        <textarea class="form-input" id="cmAdDescription" rows="3" maxlength="200" placeholder="Discover amazing local businesses and exclusive deals..."></textarea>
                        <div class="form-hint">Max 200 characters</div>
                    </div>
                    
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
                        <div class="form-group">
                            <label class="form-label">Offer Details</label>
                            <input type="text" class="form-input" id="cmAdOffer" placeholder="Welcome Bonus">
                        </div>
                        
                        <div class="form-group">
                            <label class="form-label">Offer Cost (in $Ember)</label>
                            <input type="number" class="form-input" id="cmAdOfferCost" value="0" min="0" step="25">
                        </div>
                    </div>
                    
                    <div style="display: grid; grid-template-columns: 1fr 2fr; gap: 10px;">
                        <div class="form-group">
                            <label class="form-label">CTA Button Text</label>
                            <input type="text" class="form-input" id="cmCtaText" placeholder="Learn More">
                        </div>
                        <div class="form-group">
                            <label class="form-label">CTA URL</label>
                            <input type="text" class="form-input" id="cmCtaUrl" placeholder="https://example.com">
                        </div>
                    </div>
                </div>
                
                <button class="btn btn-primary btn-large" onclick="addCMTokenLocation()" style="width: 100%;">
                    💎 Add Campaign Token Location
                </button>
            </div>
        </div>
        
        <!-- Scanner Web App Access -->
        <div class="dashboard-section">
            <div class="card" style="background: rgba(34,197,94,0.1); border: 2px solid rgba(34,197,94,0.3);">
                <h3 style="color: #22c55e; margin-bottom: 20px; font-size: 1.5rem;">
                    📱 QR Scanner Web App Access
                </h3>
                
                <p style="color: rgba(255,255,255,0.9); margin-bottom: 20px; line-height: 1.6;">
                    Get your unique scanner web app link to accept $Ember redemptions. Share this link with your staff - 
                    they can access it on any device with a browser and camera.
                </p>
                
                <div style="background: rgba(0,0,0,0.3); border-radius: 12px; padding: 20px; margin-bottom: 20px;">
                    <h4 style="color: var(--color-primary-gold); margin-bottom: 15px;">How the Scanner Web App Works:</h4>
                    <ol style="margin: 0; padding-left: 20px; line-height: 1.8;">
                        <li>Click "Get Scanner Link" below to generate your unique web app URL</li>
                        <li>Share the link via email with your staff members</li>
                        <li>Staff opens the link on any device (phone, tablet, computer)</li>
                        <li>No app download required - works in any browser</li>
                        <li>Point camera at player's QR code to scan and accept redemptions</li>
                        <li>Tokens transfer instantly to your account</li>
                    </ol>
                </div>
                
                <div style="display: flex; gap: 15px; flex-wrap: wrap;">
                    <button class="btn btn-primary btn-large" onclick="getCMScannerLink()">
                        🔗 Get Scanner Web App Link
                    </button>
                    <button class="btn btn-secondary" onclick="emailScannerLink()">
                        📧 Email Link to Staff
                    </button>
                    <button class="btn btn-outline" onclick="viewScannerGuide()">
                        📚 Scanner Guide
                    </button>
                </div>
            </div>
        </div>
        
        <!-- Live Map -->
        <div class="dashboard-section">
            <h3 style="font-size: 1.5rem; color: var(--color-primary-gold); margin-bottom: 20px;">
                🗺️ Live Token Location Map
            </h3>
            
            <div class="card">
                <div id="campaignTokenMap" style="height: 500px; background: #1a1a1a; border-radius: 12px; position: relative; overflow: hidden;">
                    <div style="height: 100%; display: flex; align-items: center; justify-content: center; flex-direction: column; padding: 40px; text-align: center;">
                        <div style="font-size: 3rem; margin-bottom: 20px;">🗺️</div>
                        <h3 style="color: var(--color-primary-gold); margin-bottom: 15px;">Loading Map...</h3>
                        <p style="color: rgba(255,255,255,0.7); max-width: 500px;">
                            Please wait while Google Maps loads.
                        </p>
                    </div>
                </div>
                
                <div style="margin-top: 15px; display: flex; gap: 10px; flex-wrap: wrap;">
                    <button class="btn btn-small" id="filterCMLocations" onclick="toggleCMMapFilter('cm')" style="background: rgba(59, 130, 246, 0.3); border: 1px solid #3b82f6;">
                        📍 Campaign Locations (${cmLocations.length})
                    </button>
                    <button class="btn btn-small" id="filterAdvLocations" onclick="toggleCMMapFilter('adv')" style="background: rgba(240, 165, 0, 0.3); border: 1px solid #f0a500;">
                        🏢 Advertiser Locations (${advLocations.length})
                    </button>
                    <button class="btn btn-small" id="filterPlayers" onclick="toggleCMMapFilter('players')" style="background: rgba(34, 197, 94, 0.3); border: 1px solid #22c55e;">
                        👥 Active Players (${EmberHuntDemo.activePlayers.length})
                    </button>
                </div>
                
                <div style="margin-top: 15px; padding: 12px; background: rgba(0,0,0,0.3); border-radius: 8px;">
                    <div style="font-weight: 700; margin-bottom: 8px; font-size: 0.9rem;">Map Legend:</div>
                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 8px; font-size: 0.85rem;">
                        <div style="display: flex; align-items: center; gap: 8px;">
                            <span style="width: 10px; height: 10px; background: #3b82f6; border-radius: 50%; display: inline-block;"></span>
                            <span>Campaign Locations</span>
                        </div>
                        <div style="display: flex; align-items: center; gap: 8px;">
                            <span style="width: 10px; height: 10px; background: #f0a500; border-radius: 50%; display: inline-block;"></span>
                            <span>Advertiser Locations</span>
                        </div>
                        <div style="display: flex; align-items: center; gap: 8px;">
                            <span style="width: 10px; height: 10px; background: #22c55e; border-radius: 50%; display: inline-block;"></span>
                            <span>Active Players</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        <!-- My Campaign Token Locations List -->
        <div class="dashboard-section">
            <h3 style="font-size: 1.5rem; color: var(--color-primary-gold); margin-bottom: 20px;">
                📍 My Campaign Token Locations (${cmLocations.length})
            </h3>
            
            ${cmLocations.map(loc => `
                <div class="card" style="margin-bottom: 15px; border: 2px solid rgba(59,130,246,0.5);">
                    <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 15px; flex-wrap: wrap; gap: 15px;">
                        <div>
                            <h4 style="color: #3b82f6; margin-bottom: 5px;">${loc.name}</h4>
                            <div style="color: rgba(255,255,255,0.6); font-size: 0.9rem;">${loc.address}</div>
                            <div style="color: rgba(255,255,255,0.5); font-size: 0.85rem; margin-top: 3px;">Campaign Location</div>
                        </div>
                        <span class="badge badge-success">
                            <span class="status-indicator status-live"></span>
                            ${loc.status.toUpperCase()}
                        </span>
                    </div>
                    
                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 15px; margin-bottom: 15px;">
                        <div>
                            <div style="font-size: 0.85rem; color: rgba(255,255,255,0.6);">Tokens Allocated</div>
                            <div style="font-size: 1.5rem; font-weight: 900; color: #3b82f6;">${loc.tokensAllocated.toLocaleString()}</div>
                        </div>
                        <div>
                            <div style="font-size: 0.85rem; color: rgba(255,255,255,0.6);">Remaining</div>
                            <div style="font-size: 1.5rem; font-weight: 900; color: var(--color-primary-gold);">${loc.tokensRemaining.toLocaleString()}</div>
                        </div>
                        <div>
                            <div style="font-size: 0.85rem; color: rgba(255,255,255,0.6);">Amount per Collect</div>
                            <div style="font-size: 1.5rem; font-weight: 900;">${loc.tokenAmount.toLocaleString()}</div>
                        </div>
                    </div>
                    
                    ${loc.advertisement ? `
                        <div style="background: rgba(240,165,0,0.15); border: 2px solid rgba(240,165,0,0.4); border-radius: 12px; padding: 15px; margin-bottom: 15px;">
                            <h5 style="color: var(--color-primary-gold); margin-bottom: 10px;">📢 Advertisement:</h5>
                            <div style="background: rgba(0,0,0,0.3); border-radius: 8px; padding: 12px;">
                                <h4 style="color: #f0a500; margin-bottom: 8px; font-size: 1rem;">${loc.advertisement.title}</h4>
                                <p style="color: rgba(255,255,255,0.9); margin-bottom: 10px; font-size: 0.9rem; line-height: 1.5;">
                                    ${loc.advertisement.description}
                                </p>
                                <div style="padding: 8px; background: rgba(34,197,94,0.2); border: 1px solid rgba(34,197,94,0.4); border-radius: 6px;">
                                    <div style="font-size: 0.85rem;">Offer: ${loc.advertisement.offer}</div>
                                    ${loc.advertisement.offerEmberValue > 0 ? `<div style="font-size: 0.8rem; color: rgba(255,255,255,0.6);">Cost: ${loc.advertisement.offerEmberValue} $Ember</div>` : ''}
                                </div>
                            </div>
                        </div>
                    ` : ''}
                    
                    <div style="display: flex; gap: 10px; flex-wrap: wrap;">
                        <button class="btn btn-primary" onclick="getCMScannerLink()">Get Scanner Link</button>
                        <button class="btn btn-outline" onclick="editCMLocation('${loc.id}')">Edit</button>
                        <button class="btn btn-secondary" onclick="refillTokens('${loc.id}')">Add More Tokens</button>
                        <button class="btn" onclick="viewLocationAnalytics('${loc.id}')" style="background: rgba(34,197,94,0.3); border: 1px solid #22c55e;">Analytics</button>
                    </div>
                </div>
            `).join('')}
        </div>
        
        <!-- Advertiser Locations List -->
        <div class="dashboard-section">
            <h3 style="font-size: 1.5rem; color: var(--color-primary-gold); margin-bottom: 20px;">
                🏢 Advertiser Token Locations with Advertisements (${advLocations.length})
            </h3>
            
            ${advLocations.map(loc => `
                <div class="card" style="margin-bottom: 15px; border-color: rgba(240,165,0,0.5);">
                    <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 15px; flex-wrap: wrap; gap: 15px;">
                        <div>
                            <h4 style="color: #f0a500; margin-bottom: 5px;">${loc.name}</h4>
                            <div style="color: rgba(255,255,255,0.6); font-size: 0.9rem;">${loc.address}</div>
                            <div style="color: rgba(255,255,255,0.5); font-size: 0.85rem; margin-top: 3px;">
                                By: ${loc.advertiserName} • ${loc.locationCount} ${loc.locationCount === 1 ? 'location' : 'locations'} ($${loc.monthlyFeePerLocation}/mo each)
                            </div>
                        </div>
                        <div style="text-align: right;">
                            ${loc.scannerWebAppAccess ? `
                                <div style="margin-top: 8px;">
                                    <span class="status-indicator status-live"></span>
                                    <span style="color: #22c55e; font-size: 0.85rem;">Scanner Active</span>
                                </div>
                            ` : ''}
                        </div>
                    </div>
                    
                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 15px; margin-bottom: 15px;">
                        <div>
                            <div style="font-size: 0.85rem; color: rgba(255,255,255,0.6);">Tokens Purchased</div>
                            <div style="font-size: 1.5rem; font-weight: 900; color: #f0a500;">${loc.tokensPurchased.toLocaleString()}</div>
                        </div>
                        <div>
                            <div style="font-size: 0.85rem; color: rgba(255,255,255,0.6);">Remaining</div>
                            <div style="font-size: 1.5rem; font-weight: 900; color: var(--color-primary-gold);">${loc.tokensRemaining.toLocaleString()}</div>
                        </div>
                        <div>
                            <div style="font-size: 0.85rem; color: rgba(255,255,255,0.6);">Redeemed Back</div>
                            <div style="font-size: 1.5rem; font-weight: 900; color: #22c55e;">${loc.redemptions.totalTokensRedeemed.toLocaleString()}</div>
                        </div>
                        <div>
                            <div style="font-size: 0.85rem; color: rgba(255,255,255,0.6);">Redemption Rate</div>
                            <div style="font-size: 1.5rem; font-weight: 900; color: #22c55e;">${loc.redemptions.conversionRate}%</div>
                        </div>
                    </div>
                    
                    ${loc.advertisement ? `
                        <div style="background: rgba(240,165,0,0.15); border: 2px solid rgba(240,165,0,0.4); border-radius: 12px; padding: 15px; margin-bottom: 15px;">
                            <h5 style="color: var(--color-primary-gold); margin-bottom: 10px; display: flex; align-items: center; gap: 8px;">
                                <span>📢</span> Advertisement Players See After Collection:
                            </h5>
                            <div style="background: rgba(0,0,0,0.3); border-radius: 8px; padding: 15px;">
                                <h4 style="color: #f0a500; margin-bottom: 8px; font-size: 1.1rem;">${loc.advertisement.title}</h4>
                                <p style="color: rgba(255,255,255,0.9); margin-bottom: 12px; line-height: 1.5;">
                                    ${loc.advertisement.description}
                                </p>
                                <div style="padding: 10px; background: rgba(34,197,94,0.2); border: 1px solid rgba(34,197,94,0.4); border-radius: 8px; margin-bottom: 10px;">
                                    <div style="font-size: 0.85rem; color: rgba(255,255,255,0.7); margin-bottom: 3px;">Redemption Offer:</div>
                                    <div style="font-weight: 700; color: #22c55e;">${loc.advertisement.offer}</div>
                                    <div style="font-size: 0.85rem; color: rgba(255,255,255,0.6); margin-top: 3px;">
                                        Cost: ${loc.advertisement.offerEmberValue} $Ember
                                    </div>
                                </div>
                                ${loc.advertisement.ctaUrl ? `
                                    <a href="${loc.advertisement.ctaUrl}" target="_blank" class="btn btn-small btn-secondary">
                                        ${loc.advertisement.ctaText || 'Learn More'}
                                    </a>
                                ` : ''}
                            </div>
                        </div>
                    ` : ''}
                    
                    <div style="background: rgba(34,197,94,0.1); border: 1px solid rgba(34,197,94,0.3); border-radius: 8px; padding: 15px;">
                        <h5 style="color: #22c55e; margin-bottom: 10px;">Redemption Stats:</h5>
                        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 10px; font-size: 0.9rem;">
                            <div>
                                <div style="color: rgba(255,255,255,0.6);">Total Redemptions:</div>
                                <div style="font-weight: 700;">${loc.redemptions.total}</div>
                            </div>
                            <div>
                                <div style="color: rgba(255,255,255,0.6);">This Month:</div>
                                <div style="font-weight: 700;">${loc.redemptions.thisMonth}</div>
                            </div>
                            <div>
                                <div style="color: rgba(255,255,255,0.6);">Avg Tokens/Redemption:</div>
                                <div style="font-weight: 700;">${loc.redemptions.averageTokens}</div>
                            </div>
                            <div>
                                <div style="color: rgba(255,255,255,0.6);">Conversion Rate:</div>
                                <div style="font-weight: 700; color: #22c55e;">${loc.redemptions.conversionRate}%</div>
                            </div>
                        </div>
                    </div>
                    
                    <div style="margin-top: 15px;">
                        <button class="btn btn-outline" onclick="viewLocationAnalytics('${loc.id}')">View Full Analytics</button>
                    </div>
                </div>
            `).join('')}
            
            ${advLocations.length === 0 ? `
                <div class="card" style="text-align: center; padding: 40px;">
                    <div style="font-size: 3rem; margin-bottom: 15px;">🏢</div>
                    <h4 style="margin-bottom: 10px;">No Advertiser Locations Yet</h4>
                    <p style="color: rgba(255,255,255,0.7); margin-bottom: 20px;">
                        Advertisers can add token stops with advertisements to your campaign from the marketplace.
                    </p>
                </div>
            ` : ''}
        </div>
    `;
}

// ============================================
// CAMPAIGN MANAGER FUNCTIONS
// ============================================

function handleCMCSVUpload(event) {
    const file = event.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = function(e) {
        const csv = e.target.result;
        const lines = csv.split('\n').slice(1).filter(line => line.trim());
        
        if (lines.length === 0) {
            alert('❌ CSV file is empty');
            return;
        }
        
        const locations = lines.map(line => {
            const parts = line.split(',');
            return {
                name: parts[0]?.trim(),
                address: `${parts[1]?.trim()}, ${parts[2]?.trim()}, ${parts[3]?.trim()} ${parts[4]?.trim()}`,
                tokenAmount: parseInt(parts[5]) || 75,
                message: parts[6]?.trim(),
                adTitle: parts[7]?.trim(),
                adDescription: parts[8]?.trim(),
                adOffer: parts[9]?.trim(),
                adOfferCost: parseInt(parts[10]) || 0,
                ctaText: parts[11]?.trim(),
                ctaUrl: parts[12]?.trim()
            };
        });
        
        const preview = locations.map(loc => 
            `• ${loc.name} - ${loc.tokenAmount} tokens/collection${loc.adTitle ? ' (with ad)' : ''}`
        ).join('\n');
        
        if (confirm(`📤 Bulk Upload Preview\n\n${locations.length} location(s):\n\n${preview}\n\nContinue?`)) {
            alert(`✓ Upload Successful!\n\n${locations.length} campaign token location(s) added.`);
            if (typeof window.loadSection === 'function') {
                window.loadSection('campaigns');
            }
        }
    };
    reader.readAsText(file);
}

function addCMTokenLocation() {
    const name = document.getElementById('cmLocationName')?.value;
    const address = document.getElementById('cmAddress')?.value;
    const tokenAmount = parseInt(document.getElementById('cmTokenAmount')?.value) || 75;
    const message = document.getElementById('cmMessage')?.value;
    
    // Advertisement fields (optional)
    const adTitle = document.getElementById('cmAdTitle')?.value;
    const adDescription = document.getElementById('cmAdDescription')?.value;
    const adOffer = document.getElementById('cmAdOffer')?.value;
    const adOfferCost = parseInt(document.getElementById('cmAdOfferCost')?.value) || 0;
    const ctaText = document.getElementById('cmCtaText')?.value;
    const ctaUrl = document.getElementById('cmCtaUrl')?.value;
    
    if (!name || !address || !message) {
        alert('Please fill in all required fields (Name, Address, Message)');
        return;
    }
    
    let summary = `✓ Campaign Token Location Added!\n\n📍 ${name}\n${address}\n💎 ${tokenAmount} tokens per collection\n\n"${message}"`;
    
    if (adTitle) {
        summary += `\n\n📢 Advertisement: "${adTitle}"`;
        if (adOffer) summary += `\n🎁 Offer: ${adOffer}`;
    }
    
    alert(summary);
    
    if (typeof window.loadSection === 'function') {
        window.loadSection('campaigns');
    }
}

function getCMScannerLink() {
    const userEmail = sessionStorage.getItem('userEmail') || 'demo@phoenix.com';
    const scannerUrl = `https://scanner.vaultphoenix.com/?token=${btoa(userEmail)}&role=cm`;
    
    const message = `📱 Your Scanner Web App Link\n\n` +
        `Access URL:\n${scannerUrl}\n\n` +
        `Share this link with your staff:\n` +
        `• Email the link to employees\n` +
        `• They can bookmark it on any device\n` +
        `• Works on phones, tablets, and computers\n` +
        `• No app download required!\n\n` +
        `How to use:\n` +
        `1. Open link on any device with camera\n` +
        `2. Point camera at player's QR code\n` +
        `3. Enter redemption amount\n` +
        `4. Tokens transfer instantly!\n\n` +
        `Would you like to:\n` +
        `• Copy link to clipboard?\n` +
        `• Email link to staff?`;
    
    if (confirm(message)) {
        navigator.clipboard.writeText(scannerUrl).then(() => {
            alert('✓ Scanner link copied to clipboard!\n\nYou can now paste and share it with your staff.');
        }).catch(() => {
            const textArea = document.createElement('textarea');
            textArea.value = scannerUrl;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            alert('✓ Scanner link copied to clipboard!\n\nYou can now paste and share it with your staff.');
        });
    }
}

function emailScannerLink() {
    const userEmail = sessionStorage.getItem('userEmail') || 'demo@phoenix.com';
    const scannerUrl = `https://scanner.vaultphoenix.com/?token=${btoa(userEmail)}&role=cm`;
    
    const emailAddress = prompt('Enter staff email address:', '');
    
    if (emailAddress) {
        const subject = encodeURIComponent('Vault Phoenix Scanner Web App Access');
        const body = encodeURIComponent(`Hi,\n\nHere's your access link to the Vault Phoenix QR Scanner Web App:\n\n${scannerUrl}\n\nHow to use:\n1. Open this link on any device with a camera\n2. Point camera at player's QR code\n3. Enter redemption amount\n4. Confirm transfer\n\nNo app download required - works in any browser!\n\nBest regards,\nVault Phoenix Team`);
        
        window.location.href = `mailto:${emailAddress}?subject=${subject}&body=${body}`;
        
        alert(`✓ Email draft created!\n\nYour email client should open with a pre-filled message to ${emailAddress}.`);
    }
}

function viewScannerGuide() {
    alert(`📚 Scanner Web App Guide\n\nQuick Start:\n1. Open the scanner web link\n2. Point camera at player QR code\n3. Ready to scan!\n\nScanning Process:\n1. Player shows QR code\n2. Scan with web app camera\n3. Enter redemption amount\n4. Confirm transfer\n5. Give offer to player\n\nFull documentation available at:\nvaultphoenix.com/docs/scanner`);
}

function editCMLocation(locationId) {
    alert(`Edit location: ${locationId}\n\nThis would open an edit form with the location's current settings including advertisement content.`);
}

function refillTokens(locationId) {
    const amount = prompt('How many tokens to add?', '5000');
    if (amount) {
        alert(`✓ Added ${parseInt(amount).toLocaleString()} tokens to this location.`);
        if (typeof window.loadSection === 'function') {
            window.loadSection('campaigns');
        }
    }
}

function viewLocationAnalytics(locationId) {
    alert(`Location Analytics\n\nThis would show:\n• Total collections\n• Unique visitors\n• Peak collection times\n• Player demographics\n• Advertisement performance\n• Redemption stats (if applicable)`);
}

// Export functions
if (typeof window !== 'undefined') {
    window.EmberHuntDemo = EmberHuntDemo;
    window.getCampaignsContent = getCampaignsContent;
    window.handleCMCSVUpload = handleCMCSVUpload;
    window.addCMTokenLocation = addCMTokenLocation;
    window.getCMScannerLink = getCMScannerLink;
    window.emailScannerLink = emailScannerLink;
    window.viewScannerGuide = viewScannerGuide;
    window.editCMLocation = editCMLocation;
    window.refillTokens = refillTokens;
    window.viewLocationAnalytics = viewLocationAnalytics;
}
