/* ============================================
   VAULT PHOENIX MANAGEMENT SYSTEM
   $Ember Hunt Demo - Campaign Manager Token Locations
   ============================================ */

// ============================================
// EMBER HUNT LIVE DATA
// ============================================

const EmberHuntDemo = {
    appStatus: 'live',
    appName: '$Ember Hunt',
    
    // Campaign Manager's Token Locations (they own these)
    campaignTokenLocations: [
        {
            id: 'cm-token-001',
            name: 'Heritage Square Historic Site',
            address: '115 N 6th St, Phoenix, AZ 85004',
            lat: 33.4484,
            lng: -112.0740,
            tokensRemaining: 12450,
            tokenAmount: 500,
            status: 'active',
            message: 'Welcome to Heritage Square! Collect your $Ember tokens and explore Phoenix history.',
            sponsorName: 'Phoenix Historical Society',
            sponsorInfo: 'Preserving Phoenix history since 1929',
            ctaButtons: [
                { text: 'Visit Museum', url: 'https://heritagesquarephx.org' },
                { text: 'Tour Schedule', url: 'https://heritagesquarephx.org/tours' }
            ],
            addedBy: 'Campaign Manager',
            campaign: '$Ember Hunt'
        },
        {
            id: 'cm-token-002',
            name: 'Downtown Phoenix Plaza',
            address: '100 N Central Ave, Phoenix, AZ 85004',
            lat: 33.4495,
            lng: -112.0730,
            tokensRemaining: 8750,
            tokenAmount: 750,
            status: 'active',
            message: 'Downtown Phoenix welcomes you! Claim your tokens and discover local businesses.',
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
    
    // Advertiser Token Locations (they pay to add these)
    advertiserTokenLocations: [
        {
            id: 'adv-token-001',
            name: 'Chase Field Area',
            address: '401 E Jefferson St, Phoenix, AZ 85004',
            lat: 33.4451,
            lng: -112.0667,
            tokensRemaining: 15000,
            tokenAmount: 1000,
            status: 'active',
            message: 'Game Day Special! Collect tokens near Chase Field before the game!',
            sponsorName: 'Sports Arena Co.',
            sponsorInfo: 'Your home for Arizona sports and entertainment',
            ctaButtons: [
                { text: 'Get Tickets', url: 'https://www.mlb.com/dbacks/tickets' },
                { text: 'Concessions Menu', url: 'https://www.mlb.com/dbacks/ballpark/food' }
            ],
            addedBy: 'Advertiser',
            advertiserName: 'Sports Arena Co.',
            campaign: '$Ember Hunt',
            tier: 'platinum',
            monthlyFee: 2500
        },
        {
            id: 'adv-token-002',
            name: 'Roosevelt Arts District',
            address: '300 E Roosevelt St, Phoenix, AZ 85004',
            lat: 33.4472,
            lng: -112.0652,
            tokensRemaining: 6500,
            tokenAmount: 500,
            status: 'active',
            message: 'Discover local art! Collect tokens and explore galleries in Roosevelt Row.',
            sponsorName: 'Art Gallery LLC',
            sponsorInfo: 'Supporting local artists and creative community',
            ctaButtons: [
                { text: 'Gallery Hours', url: 'https://rooseveltrow.org' },
                { text: 'First Fridays', url: 'https://artlinkphoenix.com' }
            ],
            addedBy: 'Advertiser',
            advertiserName: 'Art Gallery LLC',
            campaign: '$Ember Hunt',
            tier: 'gold',
            monthlyFee: 1200
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
            amount: 500, 
            location: 'Downtown Phoenix Plaza', 
            timestamp: new Date(Date.now() - 2000) 
        },
        { 
            type: 'airdrop', 
            recipients: 12, 
            location: 'Scottsdale area', 
            timestamp: new Date(Date.now() - 47000) 
        }
    ],
    
    performance: {
        playersNow: 47,
        tokensActive: 156,
        collectionsToday: 278,
        revenueToday: 834
    }
};

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
    
    return `
        <div class="dashboard-section">
            <h2 class="section-title">🗺️ $Ember Hunt - Campaign Control & Token Locations</h2>
            
            <!-- Stats Overview -->
            <div class="hero-stats">
                <div class="stat-card">
                    <div class="stat-icon">📍</div>
                    <div class="stat-label">My Token Locations</div>
                    <div class="stat-value">${cmLocations.length}</div>
                    <div class="stat-change">Campaign Manager</div>
                </div>
                
                <div class="stat-card">
                    <div class="stat-icon">🏢</div>
                    <div class="stat-label">Advertiser Locations</div>
                    <div class="stat-value">${advLocations.length}</div>
                    <div class="stat-change">Paid Placements</div>
                </div>
                
                <div class="stat-card">
                    <div class="stat-icon">💎</div>
                    <div class="stat-label">Total Tokens Active</div>
                    <div class="stat-value">${allLocations.reduce((sum, loc) => sum + loc.tokensRemaining, 0).toLocaleString()}</div>
                    <div class="stat-change">Across All Locations</div>
                </div>
                
                <div class="stat-card">
                    <div class="stat-icon">👥</div>
                    <div class="stat-label">Players Now</div>
                    <div class="stat-value">${EmberHuntDemo.performance.playersNow}</div>
                    <div class="stat-change positive">Active in App</div>
                </div>
            </div>
        </div>
        
        <!-- Add Token Location Section -->
        <div class="dashboard-section">
            <div class="section-header">
                <h3 style="font-size: 1.5rem; color: var(--color-primary-gold);">
                    ➕ Add Token Locations to Your Campaign
                </h3>
            </div>
            
            <!-- Bulk Upload -->
            <div class="card" style="margin-bottom: 20px; background: rgba(240,165,0,0.1); border: 2px solid rgba(240,165,0,0.3);">
                <h4 style="color: var(--color-primary-gold); margin-bottom: 15px;">📤 Bulk Upload (CSV)</h4>
                
                <p style="color: rgba(255,255,255,0.8); margin-bottom: 15px;">
                    Upload multiple token locations at once. Include sponsor messages and call-to-action buttons.
                </p>
                
                <div style="background: rgba(0,0,0,0.3); border-radius: 12px; padding: 15px; margin-bottom: 15px;">
                    <h5 style="margin-bottom: 10px;">CSV Format:</h5>
                    <div style="font-family: monospace; background: rgba(0,0,0,0.5); padding: 12px; border-radius: 8px; overflow-x: auto; font-size: 0.85rem;">
                        <div style="color: #22c55e;">name,address,city,state,zip,token_amount,message,sponsor_name,sponsor_info,cta1_text,cta1_url,cta2_text,cta2_url</div>
                        <div style="color: rgba(255,255,255,0.7);">Heritage Square,115 N 6th St,Phoenix,AZ,85004,500,Welcome!,Phoenix Historical Society,Since 1929,Visit Museum,https://example.com,Tours,https://example.com/tours</div>
                    </div>
                </div>
                
                <div style="display: flex; gap: 10px; flex-wrap: wrap;">
                    <a href="data:text/csv;charset=utf-8,name,address,city,state,zip,token_amount,message,sponsor_name,sponsor_info,cta1_text,cta1_url,cta2_text,cta2_url%0AExample Location,123 Main St,Phoenix,AZ,85001,500,Welcome message,Sponsor Name,Sponsor info,Button 1,https://example.com,Button 2,https://example.com/page" 
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
            
            <!-- Single Location Form -->
            <div class="card">
                <h4 style="color: var(--color-primary-gold); margin-bottom: 20px;">
                    📍 Add Single Token Location
                </h4>
                
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-bottom: 15px;">
                    <div class="form-group">
                        <label class="form-label">Location Name *</label>
                        <input type="text" class="form-input" id="cmLocationName" placeholder="Heritage Square Historic Site">
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label">Token Amount per Collection *</label>
                        <input type="number" class="form-input" id="cmTokenAmount" value="500" min="100" step="50">
                    </div>
                </div>
                
                <div class="form-group">
                    <label class="form-label">Address *</label>
                    <input type="text" class="form-input" id="cmAddress" placeholder="115 N 6th St, Phoenix, AZ 85004">
                    <div class="form-hint">Auto-geocoded to latitude/longitude</div>
                </div>
                
                <div class="form-group">
                    <label class="form-label">Collection Message *</label>
                    <textarea class="form-input" id="cmMessage" rows="2" placeholder="Welcome! Collect your $Ember tokens here..."></textarea>
                    <div class="form-hint">Players see this message after collecting tokens</div>
                </div>
                
                <div style="background: rgba(59,130,246,0.1); border: 1px solid rgba(59,130,246,0.3); border-radius: 12px; padding: 20px; margin: 20px 0;">
                    <h5 style="color: #3b82f6; margin-bottom: 15px;">📢 Sponsor Information (Optional)</h5>
                    
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
                        <div class="form-group">
                            <label class="form-label">Sponsor Name</label>
                            <input type="text" class="form-input" id="cmSponsorName" placeholder="Phoenix Historical Society">
                        </div>
                        
                        <div class="form-group">
                            <label class="form-label">Sponsor Tagline</label>
                            <input type="text" class="form-input" id="cmSponsorInfo" placeholder="Preserving history since 1929">
                        </div>
                    </div>
                    
                    <h6 style="color: var(--color-primary-gold); margin: 15px 0 10px 0;">Call-to-Action Buttons</h6>
                    
                    <div style="display: grid; grid-template-columns: 1fr 2fr; gap: 10px; margin-bottom: 10px;">
                        <input type="text" class="form-input" id="cmCta1Text" placeholder="Button 1 Text">
                        <input type="text" class="form-input" id="cmCta1Url" placeholder="https://example.com">
                    </div>
                    
                    <div style="display: grid; grid-template-columns: 1fr 2fr; gap: 10px;">
                        <input type="text" class="form-input" id="cmCta2Text" placeholder="Button 2 Text (Optional)">
                        <input type="text" class="form-input" id="cmCta2Url" placeholder="https://example.com/page">
                    </div>
                </div>
                
                <button class="btn btn-primary btn-large" onclick="addCMTokenLocation()" style="width: 100%;">
                    💎 Add Token Location to Campaign
                </button>
            </div>
        </div>
        
        <!-- Live Map with All Locations -->
        <div class="dashboard-section">
            <h3 style="font-size: 1.5rem; color: var(--color-primary-gold); margin-bottom: 20px;">
                🗺️ Live Token Location Map
            </h3>
            
            <div class="card">
                <div id="campaignTokenMap" style="height: 500px; background: #1a1a1a; border-radius: 12px; position: relative; overflow: hidden;">
                    <!-- Google Maps loads here -->
                </div>
                
                <div style="margin-top: 15px; display: flex; gap: 10px; flex-wrap: wrap;">
                    <button class="btn btn-small" id="filterCMLocations" onclick="toggleCMMapFilter('cm')" style="background: rgba(59, 130, 246, 0.3); border: 1px solid #3b82f6;">
                        📍 My Locations (${cmLocations.length})
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
                            <span>Campaign Manager Tokens</span>
                        </div>
                        <div style="display: flex; align-items: center; gap: 8px;">
                            <span style="width: 10px; height: 10px; background: #f0a500; border-radius: 50%; display: inline-block;"></span>
                            <span>Advertiser Tokens</span>
                        </div>
                        <div style="display: flex; align-items: center; gap: 8px;">
                            <span style="width: 10px; height: 10px; background: #22c55e; border-radius: 50%; display: inline-block;"></span>
                            <span>Active Players</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        <!-- My Token Locations List -->
        <div class="dashboard-section">
            <h3 style="font-size: 1.5rem; color: var(--color-primary-gold); margin-bottom: 20px;">
                📍 My Token Locations (${cmLocations.length})
            </h3>
            
            ${cmLocations.map(loc => `
                <div class="card" style="margin-bottom: 15px;">
                    <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 15px;">
                        <div>
                            <h4 style="color: var(--color-primary-gold); margin-bottom: 5px;">${loc.name}</h4>
                            <div style="color: rgba(255,255,255,0.6); font-size: 0.9rem;">${loc.address}</div>
                        </div>
                        <span class="badge badge-success">
                            <span class="status-indicator status-live"></span>
                            ${loc.status.toUpperCase()}
                        </span>
                    </div>
                    
                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 15px; margin-bottom: 15px;">
                        <div>
                            <div style="font-size: 0.85rem; color: rgba(255,255,255,0.6);">Tokens Remaining</div>
                            <div style="font-size: 1.5rem; font-weight: 900; color: var(--color-primary-gold);">${loc.tokensRemaining.toLocaleString()}</div>
                        </div>
                        <div>
                            <div style="font-size: 0.85rem; color: rgba(255,255,255,0.6);">Amount per Collect</div>
                            <div style="font-size: 1.5rem; font-weight: 900;">${loc.tokenAmount.toLocaleString()}</div>
                        </div>
                    </div>
                    
                    <div style="background: rgba(0,0,0,0.3); border-radius: 8px; padding: 12px; margin-bottom: 15px;">
                        <div style="font-size: 0.85rem; color: rgba(255,255,255,0.6); margin-bottom: 5px;">Collection Message:</div>
                        <div style="color: rgba(255,255,255,0.9);">${loc.message}</div>
                    </div>
                    
                    ${loc.sponsorName ? `
                        <div style="background: rgba(59,130,246,0.1); border: 1px solid rgba(59,130,246,0.3); border-radius: 8px; padding: 12px; margin-bottom: 15px;">
                            <div style="font-weight: 700; margin-bottom: 5px;">${loc.sponsorName}</div>
                            <div style="font-size: 0.9rem; color: rgba(255,255,255,0.7);">${loc.sponsorInfo}</div>
                            ${loc.ctaButtons && loc.ctaButtons.length > 0 ? `
                                <div style="display: flex; gap: 10px; margin-top: 10px;">
                                    ${loc.ctaButtons.map(btn => `
                                        <a href="${btn.url}" target="_blank" class="btn btn-small btn-outline">${btn.text}</a>
                                    `).join('')}
                                </div>
                            ` : ''}
                        </div>
                    ` : ''}
                    
                    <div style="display: flex; gap: 10px;">
                        <button class="btn btn-outline" onclick="editCMLocation('${loc.id}')">Edit</button>
                        <button class="btn btn-secondary" onclick="refillTokens('${loc.id}')">Refill Tokens</button>
                        <button class="btn" onclick="viewLocationAnalytics('${loc.id}')" style="background: rgba(34,197,94,0.3); border: 1px solid #22c55e;">Analytics</button>
                    </div>
                </div>
            `).join('')}
        </div>
        
        <!-- Advertiser Locations List -->
        <div class="dashboard-section">
            <h3 style="font-size: 1.5rem; color: var(--color-primary-gold); margin-bottom: 20px;">
                🏢 Advertiser Token Locations (${advLocations.length})
            </h3>
            
            ${advLocations.map(loc => `
                <div class="card" style="margin-bottom: 15px; border-color: rgba(240,165,0,0.5);">
                    <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 15px;">
                        <div>
                            <h4 style="color: #f0a500; margin-bottom: 5px;">${loc.name}</h4>
                            <div style="color: rgba(255,255,255,0.6); font-size: 0.9rem;">${loc.address}</div>
                            <div style="color: rgba(255,255,255,0.5); font-size: 0.85rem; margin-top: 3px;">By: ${loc.advertiserName}</div>
                        </div>
                        <div style="text-align: right;">
                            <span class="tier-badge tier-${loc.tier}">${loc.tier}</span>
                            <div style="font-size: 0.85rem; color: rgba(255,255,255,0.6); margin-top: 5px;">$${loc.monthlyFee}/mo</div>
                        </div>
                    </div>
                    
                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 15px; margin-bottom: 15px;">
                        <div>
                            <div style="font-size: 0.85rem; color: rgba(255,255,255,0.6);">Tokens Remaining</div>
                            <div style="font-size: 1.5rem; font-weight: 900; color: #f0a500;">${loc.tokensRemaining.toLocaleString()}</div>
                        </div>
                        <div>
                            <div style="font-size: 0.85rem; color: rgba(255,255,255,0.6);">Amount per Collect</div>
                            <div style="font-size: 1.5rem; font-weight: 900;">${loc.tokenAmount.toLocaleString()}</div>
                        </div>
                    </div>
                    
                    ${loc.message ? `
                        <div style="background: rgba(0,0,0,0.3); border-radius: 8px; padding: 12px; margin-bottom: 15px;">
                            <div style="font-size: 0.85rem; color: rgba(255,255,255,0.6); margin-bottom: 5px;">Collection Message:</div>
                            <div style="color: rgba(255,255,255,0.9);">${loc.message}</div>
                        </div>
                    ` : ''}
                    
                    <button class="btn btn-outline" onclick="viewLocationAnalytics('${loc.id}')">View Performance</button>
                </div>
            `).join('')}
        </div>
        
        <!-- Google Maps Script -->
        <script>
            let campaignTokenMapInstance;
            let cmMarkers = [];
            let advMarkers = [];
            let playerMarkers = [];
            let cmMapFilters = { cm: true, adv: true, players: true };
            
            function initCampaignTokenMap() {
                const mapElement = document.getElementById('campaignTokenMap');
                if (!mapElement) return;
                
                if (typeof google === 'undefined') {
                    mapElement.innerHTML = \`
                        <div style="height: 100%; display: flex; align-items: center; justify-content: center; flex-direction: column; padding: 40px; text-align: center;">
                            <div style="font-size: 3rem; margin-bottom: 20px;">🗺️</div>
                            <h3 style="color: var(--color-primary-gold); margin-bottom: 15px;">Google Maps API Required</h3>
                            <p style="color: rgba(255,255,255,0.7); max-width: 500px;">
                                Add your Google Maps API key to dashboard.html to display the live token location map.
                            </p>
                        </div>
                    \`;
                    return;
                }
                
                campaignTokenMapInstance = new google.maps.Map(mapElement, {
                    center: { lat: 33.4484, lng: -112.0740 },
                    zoom: 14,
                    styles: [
                        { elementType: "geometry", stylers: [{ color: "#1a1a1a" }] },
                        { elementType: "labels.text.stroke", stylers: [{ color: "#1a1a1a" }] },
                        { elementType: "labels.text.fill", stylers: [{ color: "#746855" }] }
                    ]
                });
                
                // Add Campaign Manager locations
                ${JSON.stringify(EmberHuntDemo.campaignTokenLocations)}.forEach(loc => {
                    const marker = new google.maps.Marker({
                        position: { lat: loc.lat, lng: loc.lng },
                        map: campaignTokenMapInstance,
                        title: loc.name,
                        icon: {
                            path: google.maps.SymbolPath.CIRCLE,
                            scale: 10,
                            fillColor: '#3b82f6',
                            fillOpacity: 0.9,
                            strokeColor: '#fff',
                            strokeWeight: 2
                        }
                    });
                    
                    const infoContent = \`
                        <div style="color: #000; padding: 10px; max-width: 300px;">
                            <h4 style="margin: 0 0 10px 0; color: #3b82f6;">📍 \${loc.name}</h4>
                            <p style="margin: 5px 0;"><strong>Type:</strong> Campaign Manager Location</p>
                            <p style="margin: 5px 0;"><strong>Tokens:</strong> \${loc.tokensRemaining.toLocaleString()} remaining</p>
                            <p style="margin: 5px 0;"><strong>Amount:</strong> \${loc.tokenAmount} per collection</p>
                            \${loc.sponsorName ? \`<p style="margin: 5px 0;"><strong>Sponsor:</strong> \${loc.sponsorName}</p>\` : ''}
                        </div>
                    \`;
                    
                    const infoWindow = new google.maps.InfoWindow({ content: infoContent });
                    marker.addListener('click', () => infoWindow.open(campaignTokenMapInstance, marker));
                    cmMarkers.push(marker);
                });
                
                // Add Advertiser locations
                ${JSON.stringify(EmberHuntDemo.advertiserTokenLocations)}.forEach(loc => {
                    const marker = new google.maps.Marker({
                        position: { lat: loc.lat, lng: loc.lng },
                        map: campaignTokenMapInstance,
                        title: loc.name,
                        icon: {
                            path: google.maps.SymbolPath.CIRCLE,
                            scale: 10,
                            fillColor: '#f0a500',
                            fillOpacity: 0.9,
                            strokeColor: '#fff',
                            strokeWeight: 2
                        }
                    });
                    
                    const infoContent = \`
                        <div style="color: #000; padding: 10px; max-width: 300px;">
                            <h4 style="margin: 0 0 10px 0; color: #f0a500;">🏢 \${loc.name}</h4>
                            <p style="margin: 5px 0;"><strong>Type:</strong> Advertiser Location</p>
                            <p style="margin: 5px 0;"><strong>Advertiser:</strong> \${loc.advertiserName}</p>
                            <p style="margin: 5px 0;"><strong>Tier:</strong> \${loc.tier}</p>
                            <p style="margin: 5px 0;"><strong>Tokens:</strong> \${loc.tokensRemaining.toLocaleString()} remaining</p>
                        </div>
                    \`;
                    
                    const infoWindow = new google.maps.InfoWindow({ content: infoContent });
                    marker.addListener('click', () => infoWindow.open(campaignTokenMapInstance, marker));
                    advMarkers.push(marker);
                });
                
                // Add Players
                ${JSON.stringify(EmberHuntDemo.activePlayers)}.forEach(player => {
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
            
            setTimeout(initCampaignTokenMap, 500);
        </script>
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
                tokenAmount: parseInt(parts[5]) || 500,
                message: parts[6]?.trim(),
                sponsorName: parts[7]?.trim(),
                sponsorInfo: parts[8]?.trim(),
                cta1Text: parts[9]?.trim(),
                cta1Url: parts[10]?.trim(),
                cta2Text: parts[11]?.trim(),
                cta2Url: parts[12]?.trim()
            };
        });
        
        const preview = locations.map(loc => 
            `• ${loc.name} - ${loc.tokenAmount} tokens`
        ).join('\n');
        
        if (confirm(`📤 Bulk Upload Preview\n\n${locations.length} location(s):\n\n${preview}\n\nContinue?`)) {
            alert(`✓ Upload Successful!\n\n${locations.length} token location(s) added to your campaign.`);
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
    const tokenAmount = parseInt(document.getElementById('cmTokenAmount')?.value) || 500;
    const message = document.getElementById('cmMessage')?.value;
    const sponsorName = document.getElementById('cmSponsorName')?.value;
    const sponsorInfo = document.getElementById('cmSponsorInfo')?.value;
    const cta1Text = document.getElementById('cmCta1Text')?.value;
    const cta1Url = document.getElementById('cmCta1Url')?.value;
    const cta2Text = document.getElementById('cmCta2Text')?.value;
    const cta2Url = document.getElementById('cmCta2Url')?.value;
    
    if (!name || !address || !message) {
        alert('Please fill in all required fields (Name, Address, Message)');
        return;
    }
    
    let summary = `✓ Token Location Added!\n\n📍 ${name}\n${address}\n💎 ${tokenAmount} tokens per collection\n\n"${message}"`;
    
    if (sponsorName) {
        summary += `\n\n📢 Sponsor: ${sponsorName}`;
        if (cta1Text) summary += `\n• CTA: "${cta1Text}"`;
    }
    
    alert(summary);
    
    if (typeof window.loadSection === 'function') {
        window.loadSection('campaigns');
    }
}

function editCMLocation(locationId) {
    alert(`Edit location: ${locationId}\n\nThis would open an edit form with the location's current settings.`);
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
    alert(`Location Analytics\n\nThis would show:\n• Total collections\n• Unique visitors\n• Peak collection times\n• Player demographics\n• Revenue generated`);
}

// Export functions
if (typeof window !== 'undefined') {
    window.EmberHuntDemo = EmberHuntDemo;
    window.getCampaignsContent = getCampaignsContent;
    window.handleCMCSVUpload = handleCMCSVUpload;
    window.addCMTokenLocation = addCMTokenLocation;
    window.editCMLocation = editCMLocation;
    window.refillTokens = refillTokens;
    window.viewLocationAnalytics = viewLocationAnalytics;
}
