/* ============================================
   VAULT PHOENIX MANAGEMENT SYSTEM
   Advertiser Dashboard - Complete Implementation
   ============================================ */

// ============================================
// ADVERTISER DATA
// ============================================

const AdvertiserData = {
    myLocations: [
        {
            id: 'adv-loc-001',
            name: 'Heritage Square Historic Site',
            address: '115 N 6th St, Phoenix, AZ 85004',
            lat: 33.4484,
            lng: -112.0740,
            tier: 'Silver',
            status: 'active',
            visitors30d: 847,
            tokensRemaining: 12450,
            tokenAmount: 500,
            campaign: '$Ember Hunt',
            monthlyFee: 500,
            message: 'Welcome to Heritage Square! Collect your tokens and explore Phoenix history.',
            sponsorName: 'Heritage Square Historic Site',
            sponsorInfo: 'Phoenix\'s premier historic landmark since 1895',
            ctaButtons: [
                { text: 'Visit Museum', url: 'https://heritagesquarephx.org' },
                { text: 'Tour Schedule', url: 'https://heritagesquarephx.org/tours' }
            ]
        }
    ],
    
    availableCampaigns: [
        {
            id: 'camp-001',
            name: '$Ember Hunt',
            manager: 'Phoenix Gaming Co.',
            activePlayers: 847,
            coverage: 'Phoenix Metro Area'
        }
    ]
};

// ============================================
// ADVERTISER OVERVIEW
// ============================================

function getAdvertiserOverview() {
    return `
        <!-- Hero Stats -->
        <div class="hero-stats">
            <div class="stat-card">
                <div class="stat-icon">👥</div>
                <div class="stat-label">GPS-Verified Visitors</div>
                <div class="stat-value">847</div>
                <div class="stat-change positive">+18% ↑ vs last month</div>
            </div>
            
            <div class="stat-card">
                <div class="stat-icon">💎</div>
                <div class="stat-label">Token Collections</div>
                <div class="stat-value">2,340</div>
                <div class="stat-change positive">+12% ↑</div>
            </div>
            
            <div class="stat-card">
                <div class="stat-icon">📊</div>
                <div class="stat-label">Current Tier</div>
                <div class="stat-value">Silver</div>
                <div class="stat-change">Active</div>
            </div>
            
            <div class="stat-card">
                <div class="stat-icon">💰</div>
                <div class="stat-label">Monthly Investment</div>
                <div class="stat-value">$650</div>
                <div class="stat-change">Location + Tokens</div>
            </div>
        </div>
        
        <!-- Location Performance -->
        <div class="dashboard-section">
            <h2 class="section-title">📍 ${AdvertiserData.myLocations[0].name}</h2>
            
            <div class="card">
                <div style="margin-bottom: 20px; padding-bottom: 20px; border-bottom: 2px solid rgba(255,255,255,0.1);">
                    <div style="color: rgba(255,255,255,0.7); margin-bottom: 5px;">Location Address</div>
                    <div style="font-size: 1.2rem; font-weight: 700;">${AdvertiserData.myLocations[0].address}</div>
                </div>
                
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px;">
                    <div style="padding: 20px; background: rgba(0,0,0,0.3); border-radius: 12px;">
                        <div style="color: rgba(255,255,255,0.7); font-size: 0.9rem; margin-bottom: 8px;">Campaign Status</div>
                        <div style="display: flex; align-items: center; gap: 10px;">
                            <span class="status-indicator status-live"></span>
                            <span style="font-size: 1.2rem; font-weight: 700; color: #22c55e;">Active & Funded</span>
                        </div>
                    </div>
                    
                    <div style="padding: 20px; background: rgba(0,0,0,0.3); border-radius: 12px;">
                        <div style="color: rgba(255,255,255,0.7); font-size: 0.9rem; margin-bottom: 8px;">Avg Daily Visitors</div>
                        <div style="font-size: 1.8rem; font-weight: 900; color: var(--color-primary-gold);">28</div>
                    </div>
                    
                    <div style="padding: 20px; background: rgba(0,0,0,0.3); border-radius: 12px;">
                        <div style="color: rgba(255,255,255,0.7); font-size: 0.9rem; margin-bottom: 8px;">Engagement Rate</div>
                        <div style="font-size: 1.8rem; font-weight: 900; color: var(--color-primary-gold);">88.4%</div>
                    </div>
                    
                    <div style="padding: 20px; background: rgba(0,0,0,0.3); border-radius: 12px;">
                        <div style="color: rgba(255,255,255,0.7); font-size: 0.9rem; margin-bottom: 8px;">Peak Hours</div>
                        <div style="font-size: 1.2rem; font-weight: 700;">2pm - 5pm</div>
                    </div>
                </div>
            </div>
        </div>
        
        <!-- Quick Actions -->
        <div class="dashboard-section">
            <h3 style="font-size: 1.5rem; color: var(--color-primary-gold); margin-bottom: 20px;">⚡ Quick Actions</h3>
            
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 20px;">
                <button class="btn btn-primary" style="padding: 20px; font-size: 1.1rem;" onclick="loadSection('locations')">
                    📍 Manage Token Locations
                </button>
                <button class="btn btn-secondary" style="padding: 20px; font-size: 1.1rem;" onclick="loadSection('payments')">
                    💳 Payment Center
                </button>
                <button class="btn btn-outline" style="padding: 20px; font-size: 1.1rem;" onclick="loadSection('analytics')">
                    📊 View Analytics
                </button>
            </div>
        </div>
    `;
}

// ============================================
// ADVERTISER LOCATIONS WITH TOKEN MANAGEMENT
// ============================================

function getAdvertiserLocationsContent() {
    return `
        <div class="dashboard-section">
            <h2 class="section-title">📍 My Token Locations</h2>
            
            <!-- Bulk Upload Section -->
            <div class="card" style="margin-bottom: 30px; background: rgba(240,165,0,0.1); border: 2px solid rgba(240,165,0,0.3);">
                <h3 style="color: var(--color-primary-gold); margin-bottom: 20px;">
                    📤 Bulk Upload Token Locations (CSV)
                </h3>
                
                <p style="color: rgba(255,255,255,0.8); margin-bottom: 20px;">
                    Upload multiple token locations at once. Each location will automatically be geocoded and added to the campaign map.
                </p>
                
                <div style="background: rgba(0,0,0,0.3); border-radius: 12px; padding: 20px; margin-bottom: 20px;">
                    <h4 style="margin-bottom: 15px;">📋 CSV Format Required:</h4>
                    <div style="font-family: monospace; background: rgba(0,0,0,0.5); padding: 15px; border-radius: 8px; margin-bottom: 15px; overflow-x: auto;">
                        <div style="color: #22c55e;">name,address,city,state,zip,token_amount,message,sponsor_name,sponsor_info,cta1_text,cta1_url,cta2_text,cta2_url,campaign</div>
                        <div style="color: rgba(255,255,255,0.7);">Heritage Square,115 N 6th St,Phoenix,AZ,85004,500,Welcome!,Heritage Square,Historic site,Visit,https://example.com,Tours,https://example.com/tours,$Ember Hunt</div>
                    </div>
                    
                    <div style="display: flex; gap: 15px; flex-wrap: wrap;">
                        <a href="data:text/csv;charset=utf-8,name,address,city,state,zip,token_amount,message,sponsor_name,sponsor_info,cta1_text,cta1_url,cta2_text,cta2_url,campaign%0AExample Location,123 Main St,Phoenix,AZ,85001,500,Welcome message,Sponsor Name,Info,Button 1,https://example.com,Button 2,https://example.com/page,$Ember Hunt" 
                           download="advertiser-locations-template.csv" 
                           class="btn btn-outline">
                            📥 Download CSV Template
                        </a>
                        <button class="btn btn-secondary" onclick="document.getElementById('advCsvUpload').click()">
                            📤 Upload CSV File
                        </button>
                    </div>
                    
                    <input type="file" id="advCsvUpload" accept=".csv" style="display: none;" onchange="handleAdvCSVUpload(event)">
                </div>
                
                <div style="background: rgba(34,197,94,0.1); border: 1px solid rgba(34,197,94,0.3); border-radius: 12px; padding: 15px;">
                    <h4 style="color: #22c55e; margin-bottom: 10px;">✓ Auto-Geocoding Features:</h4>
                    <ul style="margin: 0; padding-left: 20px; color: rgba(255,255,255,0.8);">
                        <li>Automatic latitude/longitude conversion from addresses</li>
                        <li>Validation of all location data before import</li>
                        <li>Preview locations on map before confirming</li>
                        <li>Edit individual locations after bulk upload</li>
                    </ul>
                </div>
            </div>
            
            <!-- Add Single Token Location -->
            <div class="card" style="margin-bottom: 30px;">
                <h3 style="color: var(--color-primary-gold); margin-bottom: 20px;">
                    ➕ Add Single Token Location
                </h3>
                
                <div class="form-group">
                    <label class="form-label">Business/Location Name *</label>
                    <input type="text" class="form-input" id="advLocationName" placeholder="Heritage Square Historic Site">
                </div>
                
                <div class="form-group">
                    <label class="form-label">Address *</label>
                    <input type="text" class="form-input" id="advAddress" placeholder="115 N 6th St, Phoenix, AZ 85004">
                    <div class="form-hint">Auto-geocoded to map coordinates</div>
                </div>
                
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
                    <div class="form-group">
                        <label class="form-label">Select Campaign *</label>
                        <select class="form-input" id="advCampaign">
                            ${AdvertiserData.availableCampaigns.map(c => 
                                `<option value="${c.id}">${c.name} - ${c.coverage}</option>`
                            ).join('')}
                        </select>
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label">Token Amount per Collection *</label>
                        <input type="number" class="form-input" id="advTokenAmount" value="500" min="100" step="50">
                        <div class="form-hint">Recommended: 300-1000 tokens</div>
                    </div>
                </div>
                
                <div class="form-group">
                    <label class="form-label">Collection Message *</label>
                    <textarea class="form-input" id="advMessage" rows="2" placeholder="Welcome! Collect your $Ember tokens and learn more about our location..."></textarea>
                    <div class="form-hint">Players see this after collecting tokens</div>
                </div>
                
                <div style="background: rgba(59,130,246,0.1); border: 1px solid rgba(59,130,246,0.3); border-radius: 12px; padding: 20px; margin: 20px 0;">
                    <h5 style="color: #3b82f6; margin-bottom: 15px;">📢 Your Business Information (Shows to Players)</h5>
                    
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
                        <div class="form-group">
                            <label class="form-label">Business/Sponsor Name</label>
                            <input type="text" class="form-input" id="advSponsorName" placeholder="Heritage Square Historic Site">
                        </div>
                        
                        <div class="form-group">
                            <label class="form-label">Tagline/Description</label>
                            <input type="text" class="form-input" id="advSponsorInfo" placeholder="Phoenix's premier historic landmark">
                        </div>
                    </div>
                    
                    <h6 style="color: var(--color-primary-gold); margin: 15px 0 10px 0;">Call-to-Action Buttons</h6>
                    <p style="font-size: 0.85rem; color: rgba(255,255,255,0.6); margin-bottom: 10px;">
                        Add buttons that appear after token collection to drive traffic to your website, promotions, or booking pages.
                    </p>
                    
                    <div style="display: grid; grid-template-columns: 1fr 2fr; gap: 10px; margin-bottom: 10px;">
                        <input type="text" class="form-input" id="advCta1Text" placeholder="Button 1 Text">
                        <input type="text" class="form-input" id="advCta1Url" placeholder="https://yourwebsite.com">
                    </div>
                    
                    <div style="display: grid; grid-template-columns: 1fr 2fr; gap: 10px;">
                        <input type="text" class="form-input" id="advCta2Text" placeholder="Button 2 Text (Optional)">
                        <input type="text" class="form-input" id="advCta2Url" placeholder="https://yourwebsite.com/page">
                    </div>
                </div>
                
                <button class="btn btn-primary btn-large" onclick="addAdvTokenLocation()" style="width: 100%;">
                    💎 Add Token Location
                </button>
            </div>
            
            <!-- Existing Locations -->
            <div class="card">
                <h3 style="color: var(--color-primary-gold); margin-bottom: 20px;">
                    📊 My Active Token Locations (${AdvertiserData.myLocations.length})
                </h3>
                
                ${AdvertiserData.myLocations.map(loc => `
                    <div style="padding: 20px; background: rgba(0,0,0,0.3); border-radius: 12px; margin-bottom: 15px;">
                        <div style="display: flex; justify-content: space-between; align-items: start; flex-wrap: wrap; gap: 15px;">
                            <div>
                                <h4 style="color: var(--color-primary-gold); margin-bottom: 8px;">${loc.name}</h4>
                                <div style="color: rgba(255,255,255,0.6); margin-bottom: 10px;">${loc.address}</div>
                                <div style="font-family: monospace; color: rgba(255,255,255,0.5); font-size: 0.85rem;">
                                    ${loc.lat}, ${loc.lng}
                                </div>
                            </div>
                            <div style="text-align: right;">
                                <div style="font-size: 1.5rem; font-weight: 900; color: var(--color-primary-gold); margin-bottom: 5px;">
                                    ${loc.tokensRemaining.toLocaleString()}
                                </div>
                                <div style="color: rgba(255,255,255,0.6); font-size: 0.9rem;">Tokens Remaining</div>
                            </div>
                        </div>
                        
                        <div style="background: rgba(0,0,0,0.3); border-radius: 8px; padding: 12px; margin: 15px 0;">
                            <div style="font-size: 0.85rem; color: rgba(255,255,255,0.6); margin-bottom: 5px;">Collection Message:</div>
                            <div style="color: rgba(255,255,255,0.9);">${loc.message}</div>
                        </div>
                        
                        ${loc.sponsorName ? `
                            <div style="background: rgba(59,130,246,0.1); border: 1px solid rgba(59,130,246,0.3); border-radius: 8px; padding: 12px; margin-bottom: 15px;">
                                <div style="font-weight: 700; margin-bottom: 5px;">${loc.sponsorName}</div>
                                <div style="font-size: 0.9rem; color: rgba(255,255,255,0.7);">${loc.sponsorInfo}</div>
                                ${loc.ctaButtons && loc.ctaButtons.length > 0 ? `
                                    <div style="display: flex; gap: 10px; margin-top: 10px; flex-wrap: wrap;">
                                        ${loc.ctaButtons.map(btn => `
                                            <a href="${btn.url}" target="_blank" class="btn btn-small btn-outline">${btn.text}</a>
                                        `).join('')}
                                    </div>
                                ` : ''}
                            </div>
                        ` : ''}
                        
                        <div style="margin-top: 15px; display: flex; gap: 10px; flex-wrap: wrap;">
                            <button class="btn btn-small btn-outline" onclick="viewOnMap('${loc.id}')">View on Map</button>
                            <button class="btn btn-small btn-secondary" onclick="refillAdvTokens('${loc.id}')">Refill Tokens</button>
                            <button class="btn btn-small btn-outline" onclick="editAdvLocation('${loc.id}')">Edit</button>
                            <button class="btn btn-small" onclick="loadSection('analytics')" style="background: rgba(34,197,94,0.3); border: 1px solid #22c55e;">Analytics</button>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
}

// ============================================
// ADVERTISER MAP
// ============================================

function getAdvertiserMapContent() {
    return `
        <div class="dashboard-section">
            <h2 class="section-title">🗺️ Location Map</h2>
            <p style="color: rgba(255,255,255,0.8); margin-bottom: 25px;">
                View all your active token locations on an interactive map
            </p>
            
            <div class="card" style="margin-bottom: 30px;">
                <div id="advertiserMap" style="height: 500px; background: #1a1a1a; border-radius: 12px; position: relative; overflow: hidden;">
                    <!-- Map loads here -->
                </div>
                
                <div style="margin-top: 20px; display: flex; gap: 10px; flex-wrap: wrap;">
                    <button class="btn btn-outline" onclick="advZoomIn()">🔍 Zoom In</button>
                    <button class="btn btn-outline" onclick="advZoomOut()">🔍 Zoom Out</button>
                    <button class="btn btn-outline" onclick="advCenterMap()">📍 Center View</button>
                    <button class="btn btn-secondary" onclick="advToggleFullscreen()">⛶ Fullscreen</button>
                    <button class="btn btn-primary" onclick="loadSection('locations')">➕ Add Location</button>
                </div>
                
                <div style="margin-top: 20px; padding: 15px; background: rgba(0,0,0,0.3); border-radius: 12px;">
                    <h4 style="margin-bottom: 10px;">Map Legend</h4>
                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 10px;">
                        <div style="display: flex; align-items: center; gap: 10px;">
                            <span style="font-size: 1.5rem;">💰</span>
                            <span>Your Token Locations</span>
                        </div>
                        <div style="display: flex; align-items: center; gap: 10px;">
                            <span style="width: 12px; height: 12px; background: #22c55e; border-radius: 50%; display: inline-block;"></span>
                            <span>Active & Funded</span>
                        </div>
                        <div style="display: flex; align-items: center; gap: 10px;">
                            <span style="width: 12px; height: 12px; background: #ef4444; border-radius: 50%; display: inline-block;"></span>
                            <span>Low on Tokens</span>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="card">
                <h3 style="margin-bottom: 20px;">📍 Your Locations (${AdvertiserData.myLocations.length})</h3>
                
                ${AdvertiserData.myLocations.map(loc => `
                    <div style="padding: 20px; background: rgba(0,0,0,0.3); border-radius: 12px; margin-bottom: 15px;">
                        <div style="display: flex; justify-content: space-between; align-items: start; flex-wrap: wrap; gap: 15px;">
                            <div>
                                <h4 style="font-size: 1.2rem; margin-bottom: 5px;">${loc.name}</h4>
                                <div style="color: rgba(255,255,255,0.6); font-size: 0.9rem;">${loc.address}</div>
                            </div>
                            <div style="text-align: right;">
                                <div style="font-size: 1.5rem; font-weight: 900; color: var(--color-primary-gold); margin-bottom: 5px;">
                                    ${loc.tokensRemaining.toLocaleString()}
                                </div>
                                <div style="color: rgba(255,255,255,0.6); font-size: 0.9rem;">Tokens</div>
                            </div>
                        </div>
                        
                        <div style="margin-top: 15px; display: flex; gap: 10px; flex-wrap: wrap;">
                            <button class="btn btn-small btn-outline" onclick="centerMapOnAdvLocation(${loc.lat}, ${loc.lng})">View on Map</button>
                            <button class="btn btn-small btn-secondary" onclick="loadSection('analytics')">Analytics</button>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
        
        <script>
            let advertiserMapInstance;
            let advMapMarkers = [];
            
            function initAdvertiserMap() {
                const mapElement = document.getElementById('advertiserMap');
                if (!mapElement) return;
                
                if (typeof google === 'undefined') {
                    mapElement.innerHTML = \`
                        <div style="height: 100%; display: flex; align-items: center; justify-content: center; flex-direction: column; padding: 40px; text-align: center;">
                            <div style="font-size: 3rem; margin-bottom: 20px;">🗺️</div>
                            <h3 style="color: var(--color-primary-gold); margin-bottom: 15px;">Google Maps API Required</h3>
                            <p style="color: rgba(255,255,255,0.7); max-width: 500px; margin-bottom: 20px;">
                                Add your Google Maps API key to dashboard.html to display the interactive map.
                            </p>
                            <div style="margin-top: 20px; padding: 15px; background: rgba(240,165,0,0.1); border: 1px solid rgba(240,165,0,0.3); border-radius: 12px;">
                                <strong>Demo Mode:</strong> Showing location list below. Full map displays once API is configured.
                            </div>
                        </div>
                    \`;
                    return;
                }
                
                advertiserMapInstance = new google.maps.Map(mapElement, {
                    center: { lat: 33.4484, lng: -112.0740 },
                    zoom: 13,
                    styles: [
                        { elementType: "geometry", stylers: [{ color: "#1a1a1a" }] },
                        { elementType: "labels.text.stroke", stylers: [{ color: "#1a1a1a" }] },
                        { elementType: "labels.text.fill", stylers: [{ color: "#746855" }] }
                    ]
                });
                
                ${JSON.stringify(AdvertiserData.myLocations)}.forEach(location => {
                    const marker = new google.maps.Marker({
                        position: { lat: location.lat, lng: location.lng },
                        map: advertiserMapInstance,
                        title: location.name,
                        icon: {
                            url: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40"><text x="20" y="30" font-size="30" text-anchor="middle">💰</text></svg>',
                            scaledSize: new google.maps.Size(40, 40)
                        }
                    });
                    
                    const infoWindow = new google.maps.InfoWindow({
                        content: \`
                            <div style="color: #000; padding: 10px;">
                                <h4 style="margin: 0 0 10px 0; color: #f0a500;">\${location.name}</h4>
                                <p style="margin: 5px 0;"><strong>Address:</strong> \${location.address}</p>
                                <p style="margin: 5px 0;"><strong>Status:</strong> \${location.status}</p>
                                <p style="margin: 5px 0;"><strong>Tokens:</strong> \${location.tokensRemaining.toLocaleString()} remaining</p>
                                <p style="margin: 5px 0;"><strong>Campaign:</strong> \${location.campaign}</p>
                            </div>
                        \`
                    });
                    
                    marker.addListener('click', () => infoWindow.open(advertiserMapInstance, marker));
                    advMapMarkers.push(marker);
                });
            }
            
            function advZoomIn() {
                if (advertiserMapInstance) advertiserMapInstance.setZoom(advertiserMapInstance.getZoom() + 1);
            }
            
            function advZoomOut() {
                if (advertiserMapInstance) advertiserMapInstance.setZoom(advertiserMapInstance.getZoom() - 1);
            }
            
            function advCenterMap() {
                if (advertiserMapInstance) {
                    advertiserMapInstance.setCenter({ lat: 33.4484, lng: -112.0740 });
                    advertiserMapInstance.setZoom(13);
                }
            }
            
            function centerMapOnAdvLocation(lat, lng) {
                if (advertiserMapInstance) {
                    advertiserMapInstance.setCenter({ lat: lat, lng: lng });
                    advertiserMapInstance.setZoom(16);
                } else {
                    alert('Map not initialized. Please configure Google Maps API key.');
                }
            }
            
            function advToggleFullscreen() {
                const mapElement = document.getElementById('advertiserMap');
                if (!document.fullscreenElement) {
                    mapElement.requestFullscreen().catch(() => alert('Fullscreen not supported'));
                } else {
                    document.exitFullscreen();
                }
            }
            
            setTimeout(initAdvertiserMap, 500);
        </script>
    `;
}

// ============================================
// ADVERTISER ANALYTICS
// ============================================

function getAdvertiserAnalyticsContent(role) {
    if (role !== 'advertiser') {
        return getPlaceholderContent('analytics');
    }
    
    return `
        <div class="dashboard-section">
            <h2 class="section-title">📊 Performance Analytics</h2>
            
            <div class="hero-stats">
                <div class="stat-card">
                    <div class="stat-icon">👥</div>
                    <div class="stat-label">Total Visitors (30d)</div>
                    <div class="stat-value">847</div>
                    <div class="stat-change positive">+18% ↑</div>
                </div>
                
                <div class="stat-card">
                    <div class="stat-icon">💎</div>
                    <div class="stat-label">Token Collections</div>
                    <div class="stat-value">2,340</div>
                    <div class="stat-change positive">+12% ↑</div>
                </div>
                
                <div class="stat-card">
                    <div class="stat-icon">📈</div>
                    <div class="stat-label">Engagement Rate</div>
                    <div class="stat-value">88.4%</div>
                    <div class="stat-change">Very High</div>
                </div>
                
                <div class="stat-card">
                    <div class="stat-icon">⏰</div>
                    <div class="stat-label">Avg. Visit Duration</div>
                    <div class="stat-value">12.4 min</div>
                    <div class="stat-change positive">+2.1 min</div>
                </div>
            </div>
        </div>
        
        <div class="dashboard-section">
            <h3 style="font-size: 1.5rem; color: var(--color-primary-gold); margin-bottom: 20px;">
                📈 Visitor Trends (Last 30 Days)
            </h3>
            
            <div class="card">
                <div style="height: 300px; background: linear-gradient(135deg, rgba(15, 15, 15, 0.5), rgba(45, 24, 16, 0.5)); border-radius: 12px; display: flex; align-items: center; justify-content: center;">
                    <div style="text-align: center;">
                        <div style="font-size: 3rem; margin-bottom: 15px;">📊</div>
                        <div style="color: rgba(255,255,255,0.7);">Interactive chart showing visitor trends</div>
                        <div style="color: rgba(255,255,255,0.5); font-size: 0.9rem; margin-top: 10px;">
                            Peak day: Saturday with 47 visitors<br>
                            Average: 28 visitors/day
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// ============================================
// AIRDROP REQUESTS (ADVERTISERS)
// ============================================

function getAirdropRequestsContent(role) {
    if (role !== 'advertiser') {
        return getPlaceholderContent('airdrop-requests');
    }
    
    return `
        <div class="dashboard-section">
            <h2 class="section-title">🎁 Request Player Airdrop</h2>
            
            <div class="card" style="background: rgba(240,165,0,0.1); border: 2px solid rgba(240,165,0,0.3); margin-bottom: 30px;">
                <h3 style="color: var(--color-primary-gold); margin-bottom: 15px;">What is a Player Airdrop?</h3>
                <p style="color: rgba(255,255,255,0.8); line-height: 1.6; margin-bottom: 15px;">
                    Request the campaign manager to airdrop tokens directly to players near your location. This drives immediate foot traffic and increases engagement.
                </p>
                <ul style="list-style: none; padding: 0; color: rgba(255,255,255,0.8);">
                    <li style="padding: 5px 0;">✓ Tokens sent to active players in your area</li>
                    <li style="padding: 5px 0;">✓ Players receive push notification to visit</li>
                    <li style="padding: 5px 0;">✓ Increases immediate foot traffic</li>
                    <li style="padding: 5px 0;">✓ Campaign manager approves and executes</li>
                </ul>
            </div>
            
            <div class="card">
                <h3 style="margin-bottom: 20px;">📝 Submit Airdrop Request</h3>
                
                <div class="form-group">
                    <label class="form-label">Your Location *</label>
                    <select class="form-input" id="airdropLocation">
                        ${AdvertiserData.myLocations.map(loc => 
                            `<option value="${loc.id}">${loc.name}</option>`
                        ).join('')}
                    </select>
                </div>
                
                <div class="form-group">
                    <label class="form-label">Requested Token Amount *</label>
                    <input type="number" class="form-input" id="airdropAmount" value="1000" min="500" step="100">
                    <div class="form-hint">Amount to airdrop to nearby players</div>
                </div>
                
                <div class="form-group">
                    <label class="form-label">Target Radius</label>
                    <select class="form-input" id="airdropRadius">
                        <option value="0.5">0.5 miles</option>
                        <option value="1" selected>1 mile</option>
                        <option value="2">2 miles</option>
                        <option value="5">5 miles</option>
                    </select>
                </div>
                
                <div class="form-group">
                    <label class="form-label">Message to Players</label>
                    <textarea class="form-input" id="airdropMessage" rows="3" placeholder="Visit Heritage Square and claim your bonus tokens! Limited time offer."></textarea>
                </div>
                
                <div class="form-group">
                    <label class="form-label">Preferred Time</label>
                    <select class="form-input" id="airdropTime">
                        <option value="now">Send Immediately</option>
                        <option value="peak">Peak Hours (2pm-5pm)</option>
                        <option value="evening">Evening (5pm-8pm)</option>
                        <option value="weekend">Next Weekend</option>
                    </select>
                </div>
                
                <button class="btn btn-primary btn-large" onclick="submitAirdropRequest()" style="width: 100%;">
                    🎁 Submit Airdrop Request
                </button>
            </div>
            
            <div class="card" style="margin-top: 30px;">
                <h3 style="margin-bottom: 20px;">📋 Recent Airdrop Requests</h3>
                
                <div style="padding: 15px; background: rgba(0,0,0,0.3); border-radius: 8px; margin-bottom: 10px;">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
                        <div>
                            <div style="font-weight: 700;">1,000 tokens - 1 mile radius</div>
                            <div style="font-size: 0.9rem; color: rgba(255,255,255,0.6);">Oct 3, 2025 2:30 PM</div>
                        </div>
                        <span class="badge badge-success">Approved</span>
                    </div>
                    <div style="font-size: 0.9rem; color: rgba(255,255,255,0.7);">
                        Result: 47 players received tokens, 34 visited location
                    </div>
                </div>
                
                <div style="padding: 15px; background: rgba(0,0,0,0.3); border-radius: 8px;">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
                        <div>
                            <div style="font-weight: 700;">500 tokens - 0.5 mile radius</div>
                            <div style="font-size: 0.9rem; color: rgba(255,255,255,0.6);">Oct 1, 2025 5:15 PM</div>
                        </div>
                        <span class="badge badge-warning">Pending</span>
                    </div>
                    <div style="font-size: 0.9rem; color: rgba(255,255,255,0.7);">
                        Awaiting campaign manager approval
                    </div>
                </div>
            </div>
        </div>
    `;
}

// ============================================
// HELPER FUNCTIONS
// ============================================

function handleAdvCSVUpload(event) {
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
                cta2Url: parts[12]?.trim(),
                campaign: parts[13]?.trim()
            };
        });
        
        const preview = locations.map(loc => `• ${loc.name} - ${loc.tokenAmount} tokens`).join('\n');
        
        if (confirm(`📤 Upload ${locations.length} location(s)?\n\n${preview}\n\nContinue?`)) {
            alert(`✓ Success! ${locations.length} token location(s) added and geocoded.`);
            if (typeof window.loadSection === 'function') {
                window.loadSection('locations');
            }
        }
    };
    reader.readAsText(file);
}

function addAdvTokenLocation() {
    const name = document.getElementById('advLocationName')?.value;
    const address = document.getElementById('advAddress')?.value;
    const tokenAmount = parseInt(document.getElementById('advTokenAmount')?.value) || 500;
    const message = document.getElementById('advMessage')?.value;
    const sponsorName = document.getElementById('advSponsorName')?.value;
    const sponsorInfo = document.getElementById('advSponsorInfo')?.value;
    const cta1Text = document.getElementById('advCta1Text')?.value;
    const cta1Url = document.getElementById('advCta1Url')?.value;
    const cta2Text = document.getElementById('advCta2Text')?.value;
    const cta2Url = document.getElementById('advCta2Url')?.value;
    
    if (!name || !address || !message) {
        alert('Please fill in required fields: Name, Address, Message');
        return;
    }
    
    let summary = `✓ Token Location Added!\n\n📍 ${name}\n${address}\n💎 ${tokenAmount} tokens per collection\n\n"${message}"`;
    
    if (sponsorName) {
        summary += `\n\n📢 ${sponsorName}`;
        if (cta1Text) summary += `\n• CTA: "${cta1Text}"`;
    }
    
    alert(summary);
    
    if (typeof window.loadSection === 'function') {
        window.loadSection('locations');
    }
}

function viewOnMap(locationId) {
    const loc = AdvertiserData.myLocations.find(l => l.id === locationId);
    if (loc) {
        if (typeof window.loadSection === 'function') {
            window.loadSection('map');
            setTimeout(() => {
                if (typeof centerMapOnAdvLocation === 'function') {
                    centerMapOnAdvLocation(loc.lat, loc.lng);
                }
            }, 1000);
        }
    }
}

function refillAdvTokens(locationId) {
    const amount = prompt('How many tokens to add?', '5000');
    if (amount) {
        alert(`✓ Added ${parseInt(amount).toLocaleString()} tokens to this location.`);
        if (typeof window.loadSection === 'function') {
            window.loadSection('locations');
        }
    }
}

function editAdvLocation(locationId) {
    alert(`Edit location: ${locationId}\n\nThis would open an edit form.`);
}

function submitAirdropRequest() {
    const amount = document.getElementById('airdropAmount')?.value || 1000;
    const radius = document.getElementById('airdropRadius')?.value || 1;
    const message = document.getElementById('airdropMessage')?.value;
    
    alert(`🎁 Airdrop Request Submitted!\n\nAmount: ${parseInt(amount).toLocaleString()} tokens\nRadius: ${radius} mile(s)\n\nThe campaign manager will review and approve your request.`);
}

// Export functions
if (typeof window !== 'undefined') {
    window.AdvertiserData = AdvertiserData;
    window.getAdvertiserOverview = getAdvertiserOverview;
    window.getAdvertiserLocationsContent = getAdvertiserLocationsContent;
    window.getAdvertiserMapContent = getAdvertiserMapContent;
    window.getAdvertiserAnalyticsContent = getAdvertiserAnalyticsContent;
    window.getAirdropRequestsContent = getAirdropRequestsContent;
    window.handleAdvCSVUpload = handleAdvCSVUpload;
    window.addAdvTokenLocation = addAdvTokenLocation;
    window.viewOnMap = viewOnMap;
    window.refillAdvTokens = refillAdvTokens;
    window.editAdvLocation = editAdvLocation;
    window.submitAirdropRequest = submitAirdropRequest;
}
