/* ============================================
   VAULT PHOENIX MANAGEMENT SYSTEM
   Campaign Marketplace - For Advertisers (Updated)
   ============================================ */

// ============================================
// MARKETPLACE DATA
// ============================================

const MarketplaceData = {
    activeCampaigns: [
        {
            id: 'camp-001',
            name: '$Ember Hunt',
            manager: 'Phoenix Gaming Co.',
            type: 'White Label',
            status: 'live',
            activePlayers: 847,
            coverage: 'Phoenix Metro Area',
            minBudget: 500,
            demographics: 'Ages 18-45, Gaming enthusiasts',
            locations: 47,
            avgFootTraffic: 850,
            cpm: 15.50,
            engagement: 87.3
        },
        {
            id: 'camp-002',
            name: 'Desert Quest AR',
            manager: 'AZ Adventure Games',
            type: 'SDK Integration',
            status: 'live',
            activePlayers: 423,
            coverage: 'Scottsdale & Tempe',
            minBudget: 350,
            demographics: 'Ages 21-35, Active lifestyle',
            locations: 28,
            avgFootTraffic: 420,
            cpm: 12.75,
            engagement: 82.1
        },
        {
            id: 'camp-003',
            name: 'Valley Token Trail',
            manager: 'Southwest Digital',
            type: 'White Label',
            status: 'live',
            activePlayers: 634,
            coverage: 'Downtown Phoenix',
            minBudget: 750,
            demographics: 'Ages 25-50, Urban professionals',
            locations: 35,
            avgFootTraffic: 720,
            cpm: 18.25,
            engagement: 91.4
        }
    ]
};

/**
 * Get Marketplace Content for Advertisers
 */
function getMarketplaceContent(role) {
    if (role !== 'advertiser') {
        return getPlaceholderContent('marketplace');
    }
    
    return `
        <div class="dashboard-section">
            <h2 class="section-title">🛒 Campaign Marketplace</h2>
            <p style="color: rgba(255,255,255,0.8); font-size: 1.1rem; margin-bottom: 30px;">
                Browse active AR crypto gaming campaigns and advertise your location to drive real foot traffic.
            </p>
            
            <!-- Search & Filter -->
            <div class="card" style="margin-bottom: 30px;">
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 15px;">
                    <div class="form-group" style="margin-bottom: 0;">
                        <label class="form-label">Search Campaigns</label>
                        <input type="text" class="form-input" placeholder="Search by name or area..." id="campaignSearch">
                    </div>
                    <div class="form-group" style="margin-bottom: 0;">
                        <label class="form-label">Coverage Area</label>
                        <select class="form-input" id="areaFilter">
                            <option value="">All Areas</option>
                            <option value="phoenix">Phoenix Metro</option>
                            <option value="scottsdale">Scottsdale</option>
                            <option value="tempe">Tempe</option>
                            <option value="downtown">Downtown Phoenix</option>
                        </select>
                    </div>
                    <div class="form-group" style="margin-bottom: 0;">
                        <label class="form-label">Budget Range</label>
                        <select class="form-input" id="budgetFilter">
                            <option value="">Any Budget</option>
                            <option value="low">$200 - $500</option>
                            <option value="medium">$500 - $1,500</option>
                            <option value="high">$1,500+</option>
                        </select>
                    </div>
                </div>
            </div>
            
            <!-- Active Campaigns -->
            <div class="dashboard-section">
                <h3 style="font-size: 1.5rem; color: var(--color-primary-gold); margin-bottom: 20px;">
                    🎮 Active Campaigns
                </h3>
                
                <div class="apps-grid">
                    ${MarketplaceData.activeCampaigns.map(campaign => `
                        <div class="card">
                            <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 15px;">
                                <div>
                                    <h4 style="color: var(--color-primary-gold); margin-bottom: 5px; font-size: 1.3rem;">
                                        ${campaign.name}
                                    </h4>
                                    <div style="color: rgba(255,255,255,0.6); font-size: 0.9rem;">
                                        by ${campaign.manager}
                                    </div>
                                </div>
                                <span class="badge badge-success">
                                    <span class="status-indicator status-live"></span>
                                    ${campaign.status.toUpperCase()}
                                </span>
                            </div>
                            
                            <div style="padding: 12px; background: rgba(0,0,0,0.3); border-radius: 8px; margin-bottom: 15px;">
                                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; font-size: 0.9rem;">
                                    <div>
                                        <div style="color: rgba(255,255,255,0.6);">Active Players</div>
                                        <div style="font-weight: 700; color: var(--color-primary-gold);">${campaign.activePlayers.toLocaleString()}</div>
                                    </div>
                                    <div>
                                        <div style="color: rgba(255,255,255,0.6);">Locations</div>
                                        <div style="font-weight: 700;">${campaign.locations}</div>
                                    </div>
                                    <div>
                                        <div style="color: rgba(255,255,255,0.6);">Coverage</div>
                                        <div style="font-weight: 700;">${campaign.coverage}</div>
                                    </div>
                                    <div>
                                        <div style="color: rgba(255,255,255,0.6);">Engagement</div>
                                        <div style="font-weight: 700; color: #22c55e;">${campaign.engagement}%</div>
                                    </div>
                                </div>
                            </div>
                            
                            <div style="padding: 12px; background: rgba(240,165,0,0.1); border: 1px solid rgba(240,165,0,0.3); border-radius: 8px; margin-bottom: 15px;">
                                <div style="font-size: 0.85rem; color: rgba(255,255,255,0.7); margin-bottom: 5px;">Demographics</div>
                                <div style="font-size: 0.95rem; font-weight: 600;">${campaign.demographics}</div>
                            </div>
                            
                            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px;">
                                <div>
                                    <div style="font-size: 0.85rem; color: rgba(255,255,255,0.6);">Min. Monthly</div>
                                    <div style="font-size: 1.3rem; font-weight: 900; color: var(--color-primary-gold);">
                                        $${campaign.minBudget}
                                    </div>
                                </div>
                                <div style="text-align: right;">
                                    <div style="font-size: 0.85rem; color: rgba(255,255,255,0.6);">Avg. Traffic</div>
                                    <div style="font-size: 1.3rem; font-weight: 900;">
                                        ${campaign.avgFootTraffic}/mo
                                    </div>
                                </div>
                            </div>
                            
                            <button class="btn btn-primary" onclick="joinCampaign('${campaign.id}')" style="width: 100%;">
                                📍 Advertise in This Campaign
                            </button>
                        </div>
                    `).join('')}
                </div>
            </div>
            
            <!-- How It Works -->
            <div class="card">
                <h3 style="color: var(--color-primary-gold); margin-bottom: 20px;">
                    📚 How Advertising Works
                </h3>
                
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 20px;">
                    <div style="padding: 20px; background: rgba(0,0,0,0.2); border-radius: 12px;">
                        <div style="font-size: 2rem; margin-bottom: 10px;">1️⃣</div>
                        <h4 style="margin-bottom: 10px;">Choose a Campaign</h4>
                        <p style="color: rgba(255,255,255,0.7); margin: 0;">
                            Browse active AR gaming campaigns and select one that matches your target demographics and area.
                        </p>
                    </div>
                    
                    <div style="padding: 20px; background: rgba(0,0,0,0.2); border-radius: 12px;">
                        <div style="font-size: 2rem; margin-bottom: 10px;">2️⃣</div>
                        <h4 style="margin-bottom: 10px;">Set Your Location</h4>
                        <p style="color: rgba(255,255,255,0.7); margin: 0;">
                            Pin your business location and choose your pricing tier based on desired visibility and features.
                        </p>
                    </div>
                    
                    <div style="padding: 20px; background: rgba(0,0,0,0.2); border-radius: 12px;">
                        <div style="font-size: 2rem; margin-bottom: 10px;">3️⃣</div>
                        <h4 style="margin-bottom: 10px;">Fund Your Campaign</h4>
                        <p style="color: rgba(255,255,255,0.7); margin: 0;">
                            Pay your location fee and optionally add campaign tokens to incentivize more player visits.
                        </p>
                    </div>
                    
                    <div style="padding: 20px; background: rgba(0,0,0,0.2); border-radius: 12px;">
                        <div style="font-size: 2rem; margin-bottom: 10px;">4️⃣</div>
                        <h4 style="margin-bottom: 10px;">Track Performance</h4>
                        <p style="color: rgba(255,255,255,0.7); margin: 0;">
                            Monitor GPS-verified foot traffic, engagement metrics, and ROI in real-time from your dashboard.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    `;
}

/**
 * Join a campaign as an advertiser
 */
function joinCampaign(campaignId) {
    const campaign = MarketplaceData.activeCampaigns.find(c => c.id === campaignId);
    
    if (!campaign) return;
    
    const confirmMsg = `Join "${campaign.name}"?\n\n` +
        `📍 Coverage: ${campaign.coverage}\n` +
        `👥 Active Players: ${campaign.activePlayers.toLocaleString()}\n` +
        `💰 Minimum Budget: $${campaign.minBudget}/month\n` +
        `📊 Engagement Rate: ${campaign.engagement}%\n\n` +
        `You'll be able to configure your location and pricing tier on the next screen.`;
    
    if (confirm(confirmMsg)) {
        sessionStorage.setItem('selectedCampaign', campaignId);
        
        alert(`✓ Great Choice!\n\nYou've selected "${campaign.name}". Now let's set up your location and pricing.\n\nRedirecting to location setup...`);
        
        if (typeof window.loadSection === 'function') {
            window.loadSection('locations');
        }
    }
}

/**
 * Get Locations Content for Advertisers (WITH BULK UPLOAD)
 */
function getLocationsContent(role) {
    if (role !== 'advertiser') {
        return getPlaceholderContent('locations');
    }
    
    return `
        <div class="dashboard-section">
            <h2 class="section-title">📍 My Advertising Locations</h2>
            
            <!-- Bulk Upload Section -->
            <div class="card" style="margin-bottom: 30px; background: rgba(240,165,0,0.1); border: 2px solid rgba(240,165,0,0.3);">
                <h3 style="color: var(--color-primary-gold); margin-bottom: 20px;">
                    📤 Bulk Upload Locations (CSV)
                </h3>
                
                <p style="color: rgba(255,255,255,0.8); margin-bottom: 20px;">
                    Upload multiple locations at once using a CSV file. Our system will automatically geocode addresses to map pins.
                </p>
                
                <div style="background: rgba(0,0,0,0.3); border-radius: 12px; padding: 20px; margin-bottom: 20px;">
                    <h4 style="margin-bottom: 15px;">📋 CSV Format Required:</h4>
                    <div style="font-family: monospace; background: rgba(0,0,0,0.5); padding: 15px; border-radius: 8px; margin-bottom: 15px; overflow-x: auto;">
                        <div style="color: #22c55e;">name,address,city,state,zip,token_amount,campaign_name</div>
                        <div style="color: rgba(255,255,255,0.7);">Heritage Square,115 N 6th St,Phoenix,AZ,85004,5000,$Ember Hunt</div>
                        <div style="color: rgba(255,255,255,0.7);">Roosevelt Coffee,123 E Roosevelt St,Phoenix,AZ,85004,3000,$Ember Hunt</div>
                    </div>
                    
                    <div style="display: flex; gap: 15px; flex-wrap: wrap;">
                        <a href="data:text/csv;charset=utf-8,name,address,city,state,zip,token_amount,campaign_name%0AExample Location,123 Main St,Phoenix,AZ,85001,5000,Campaign Name" 
                           download="location-template.csv" 
                           class="btn btn-outline">
                            📥 Download CSV Template
                        </a>
                        <button class="btn btn-secondary" onclick="document.getElementById('csvUpload').click()">
                            📤 Upload CSV File
                        </button>
                    </div>
                    
                    <input type="file" id="csvUpload" accept=".csv" style="display: none;" onchange="handleCSVUpload(event)">
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
            
            <!-- Add Single Location -->
            <div class="card" style="margin-bottom: 30px;">
                <h3 style="color: var(--color-primary-gold); margin-bottom: 20px;">
                    ➕ Add Single Location
                </h3>
                
                <div class="form-group">
                    <label class="form-label">Business Name</label>
                    <input type="text" class="form-input" id="businessName" placeholder="Heritage Square Historic Site">
                </div>
                
                <div class="form-group">
                    <label class="form-label">Address</label>
                    <input type="text" class="form-input" id="businessAddress" placeholder="115 N 6th St, Phoenix, AZ 85004">
                </div>
                
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
                    <div class="form-group">
                        <label class="form-label">Latitude (Optional)</label>
                        <input type="text" class="form-input" id="latitude" placeholder="Auto-filled from address">
                    </div>
                    <div class="form-group">
                        <label class="form-label">Longitude (Optional)</label>
                        <input type="text" class="form-input" id="longitude" placeholder="Auto-filled from address">
                    </div>
                </div>
                
                <div class="form-group">
                    <label class="form-label">Select Campaign</label>
                    <select class="form-input" id="campaignSelect">
                        ${MarketplaceData.activeCampaigns.map(c => 
                            `<option value="${c.id}">${c.name} - ${c.coverage}</option>`
                        ).join('')}
                    </select>
                </div>
                
                <div class="form-group">
                    <label class="form-label">Token Amount</label>
                    <input type="number" class="form-input" id="tokenAmount" value="5000" min="1000" step="500">
                    <div style="color: rgba(255,255,255,0.6); font-size: 0.85rem; margin-top: 5px;">
                        Recommended: 3,000-10,000 tokens per location
                    </div>
                </div>
                
                <button class="btn btn-primary btn-large" onclick="addSingleLocation()" style="width: 100%;">
                    📍 Add Location & Continue
                </button>
            </div>
            
            <!-- Existing Locations -->
            <div class="card">
                <h3 style="color: var(--color-primary-gold); margin-bottom: 20px;">
                    📊 My Active Locations (${window.AdvertiserData?.myLocations?.length || 1})
                </h3>
                
                ${(window.AdvertiserData?.myLocations || [{
                    id: 'loc-001',
                    name: 'Heritage Square Historic Site',
                    address: '115 N 6th St, Phoenix, AZ 85004',
                    tier: 'Tier 1',
                    status: 'active',
                    visitors30d: 847,
                    tokensRemaining: 12450,
                    campaign: '$Ember Hunt'
                }]).map(loc => `
                    <div class="app-card" style="margin-bottom: 15px;">
                        <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 15px;">
                            <div>
                                <h4 style="font-size: 1.2rem; margin-bottom: 5px;">${loc.name}</h4>
                                <div style="color: rgba(255,255,255,0.6); font-size: 0.9rem;">${loc.address}</div>
                            </div>
                            <span class="badge badge-success">
                                <span class="status-indicator status-live"></span>
                                ${loc.status.toUpperCase()}
                            </span>
                        </div>
                        
                        <div class="app-metrics">
                            <div class="app-metric">
                                <span class="metric-label">Campaign</span>
                                <span class="metric-value">${loc.campaign}</span>
                            </div>
                            <div class="app-metric">
                                <span class="metric-label">Tier</span>
                                <span class="metric-value">${loc.tier}</span>
                            </div>
                            <div class="app-metric">
                                <span class="metric-label">Visitors (30d)</span>
                                <span class="metric-value">${loc.visitors30d}</span>
                            </div>
                            <div class="app-metric">
                                <span class="metric-label">Tokens</span>
                                <span class="metric-value">${loc.tokensRemaining.toLocaleString()}</span>
                            </div>
                        </div>
                        
                        <div class="app-actions" style="margin-top: 15px;">
                            <button class="btn btn-outline" onclick="loadSection('map')">View on Map</button>
                            <button class="btn btn-secondary" onclick="loadSection('analytics')">Analytics</button>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
}

/**
 * Handle CSV Upload
 */
function handleCSVUpload(event) {
    const file = event.target.files[0];
    
    if (!file) return;
    
    const reader = new FileReader();
    
    reader.onload = function(e) {
        const csv = e.target.result;
        const lines = csv.split('\n');
        
        // Skip header row
        const dataLines = lines.slice(1).filter(line => line.trim());
        
        if (dataLines.length === 0) {
            alert('❌ CSV file is empty or invalid');
            return;
        }
        
        // Parse locations
        const locations = dataLines.map(line => {
            const parts = line.split(',');
            return {
                name: parts[0]?.trim(),
                address: parts[1]?.trim() + ', ' + parts[2]?.trim() + ', ' + parts[3]?.trim() + ' ' + parts[4]?.trim(),
                tokenAmount: parseInt(parts[5]) || 5000,
                campaign: parts[6]?.trim()
            };
        });
        
        // Show preview
        const preview = locations.map(loc => 
            `• ${loc.name} - ${loc.address} (${loc.tokenAmount.toLocaleString()} tokens)`
        ).join('\n');
        
        const confirmMsg = `📤 Bulk Upload Preview\n\n` +
            `Found ${locations.length} location(s):\n\n${preview}\n\n` +
            `All addresses will be automatically geocoded to map coordinates.\n\n` +
            `Continue with upload?`;
        
        if (confirm(confirmMsg)) {
            alert(`✓ Upload Successful!\n\n` +
                `${locations.length} location(s) imported and geocoded.\n\n` +
                `You can now view them on the map and edit individual locations as needed.`);
            
            // Reload section
            if (typeof window.loadSection === 'function') {
                window.loadSection('locations');
            }
        }
    };
    
    reader.readAsText(file);
}

/**
 * Add single location
 */
function addSingleLocation() {
    const businessName = document.getElementById('businessName')?.value;
    const address = document.getElementById('businessAddress')?.value;
    const tokenAmount = parseInt(document.getElementById('tokenAmount')?.value) || 5000;
    
    if (!businessName || !address) {
        alert('Please fill in all required fields.');
        return;
    }
    
    alert(`✓ Location Added!\n\n` +
        `📍 ${businessName}\n` +
        `${address}\n\n` +
        `Token Amount: ${tokenAmount.toLocaleString()} $Ember\n\n` +
        `The address will be automatically geocoded and added to your map.`);
    
    if (typeof window.loadSection === 'function') {
        window.loadSection('locations');
    }
}

/**
 * Get Metrics Content for Advertisers
 */
function getMetricsContent(role) {
    if (role !== 'advertiser') {
        return getPlaceholderContent('metrics');
    }
    
    // Redirect to analytics
    if (typeof window.getAdvertiserAnalyticsContent === 'function') {
        return window.getAdvertiserAnalyticsContent(role);
    }
    
    return getPlaceholderContent('metrics');
}

/**
 * Get Advertisers Management Content (for Campaign Managers)
 */
function getAdvertisersContent(role) {
    if (role !== 'campaign-manager') {
        return getPlaceholderContent('advertisers');
    }
    
    if (typeof window.getMerchantsContent === 'function') {
        return window.getMerchantsContent(role);
    }
    
    return getPlaceholderContent('advertisers');
}

// Export functions
if (typeof window !== 'undefined') {
    window.getMarketplaceContent = getMarketplaceContent;
    window.getLocationsContent = getLocationsContent;
    window.getMetricsContent = getMetricsContent;
    window.getAdvertisersContent = getAdvertisersContent;
    window.joinCampaign = joinCampaign;
    window.handleCSVUpload = handleCSVUpload;
    window.addSingleLocation = addSingleLocation;
}
