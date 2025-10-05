/* ============================================
   VAULT PHOENIX MANAGEMENT SYSTEM
   Advertiser Dashboard - Simplified & Fixed
   ============================================ */

// ============================================
// ADVERTISER DATA - SIMPLIFIED
// ============================================

const AdvertiserData = {
    // Campaigns the advertiser is participating in
    activeCampaigns: [
        {
            id: 'camp-001',
            name: '$Ember Hunt',
            manager: 'Phoenix Gaming Co.',
            status: 'active',
            myLocations: 1,
            totalLocations: 4,
            activePlayers: 847
        }
    ],
    
    // Advertiser's locations per campaign
    campaignLocations: {
        'camp-001': [
            {
                id: 'adv-loc-001',
                campaignId: 'camp-001',
                campaignName: '$Ember Hunt',
                name: 'Heritage Square Historic Site',
                address: '115 N 6th St, Phoenix, AZ 85004',
                lat: 33.4484,
                lng: -112.0740,
                tier: 'Silver',
                status: 'active',
                visitors30d: 847,
                tokensRemaining: 12450,
                tokenAmount: 500,
                monthlyFee: 500,
                message: 'Welcome to Heritage Square! Collect your tokens and explore Phoenix history.',
                sponsorName: 'Heritage Square Historic Site',
                sponsorInfo: 'Phoenix\'s premier historic landmark since 1895',
                ctaButtons: [
                    { text: 'Visit Museum', url: 'https://heritagesquarephx.org' },
                    { text: 'Tour Schedule', url: 'https://heritagesquarephx.org/tours' }
                ]
            }
        ]
    }
};

// ============================================
// ADVERTISER OVERVIEW
// ============================================

function getAdvertiserOverview() {
    const totalLocations = Object.values(AdvertiserData.campaignLocations).flat().length;
    const totalCampaigns = AdvertiserData.activeCampaigns.length;
    
    return `
        <!-- Hero Stats -->
        <div class="hero-stats">
            <div class="stat-card">
                <div class="stat-icon">🎮</div>
                <div class="stat-label">Active Campaigns</div>
                <div class="stat-value">${totalCampaigns}</div>
                <div class="stat-change">Participating</div>
            </div>
            
            <div class="stat-card">
                <div class="stat-icon">📍</div>
                <div class="stat-label">My Token Locations</div>
                <div class="stat-value">${totalLocations}</div>
                <div class="stat-change">Across all campaigns</div>
            </div>
            
            <div class="stat-card">
                <div class="stat-icon">👥</div>
                <div class="stat-label">GPS-Verified Visitors</div>
                <div class="stat-value">847</div>
                <div class="stat-change positive">+18% ↑ vs last month</div>
            </div>
            
            <div class="stat-card">
                <div class="stat-icon">💰</div>
                <div class="stat-label">Monthly Investment</div>
                <div class="stat-value">$650</div>
                <div class="stat-change">Location + Tokens</div>
            </div>
        </div>
        
        <!-- My Campaigns -->
        <div class="dashboard-section">
            <h2 class="section-title">🎮 My Campaigns (${totalCampaigns})</h2>
            
            <div class="apps-grid">
                ${AdvertiserData.activeCampaigns.map(campaign => `
                    <div class="app-card" onclick="loadCampaignControl('${campaign.id}')">
                        <div class="app-header">
                            <div class="app-name">${campaign.name}</div>
                            <div class="app-status">
                                <span class="status-indicator status-live"></span>
                                <span style="color: #22c55e;">ACTIVE</span>
                            </div>
                        </div>
                        <div style="margin: 15px 0; padding: 12px; background: rgba(0,0,0,0.3); border-radius: 8px;">
                            <div style="font-size: 0.85rem; color: rgba(255,255,255,0.6); margin-bottom: 5px;">Campaign Manager</div>
                            <div style="font-weight: 700;">${campaign.manager}</div>
                        </div>
                        <div class="app-metrics">
                            <div class="app-metric">
                                <span class="metric-label">My Locations</span>
                                <span class="metric-value">${campaign.myLocations}</span>
                            </div>
                            <div class="app-metric">
                                <span class="metric-label">Total Locations</span>
                                <span class="metric-value">${campaign.totalLocations}</span>
                            </div>
                            <div class="app-metric">
                                <span class="metric-label">Active Players</span>
                                <span class="metric-value">${campaign.activePlayers}</span>
                            </div>
                        </div>
                        <div class="app-actions">
                            <button class="btn btn-primary" onclick="event.stopPropagation(); loadCampaignControl('${campaign.id}')">Manage Campaign</button>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
        
        <!-- Quick Actions -->
        <div class="dashboard-section">
            <h3 style="font-size: 1.5rem; color: var(--color-primary-gold); margin-bottom: 20px;">⚡ Quick Actions</h3>
            
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 20px;">
                <button class="btn btn-primary" style="padding: 20px; font-size: 1.1rem;" onclick="loadSection('marketplace')">
                    🛒 Browse More Campaigns
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
// CAMPAIGN CONTROL (replaces separate locations/map pages)
// ============================================

function getCampaignControlContent(campaignId) {
    const campaign = AdvertiserData.activeCampaigns.find(c => c.id === campaignId);
    if (!campaign) {
        return `<div style="padding: 40px; text-align: center;">
            <h3>Campaign not found</h3>
            <button class="btn btn-primary" onclick="loadSection('overview')">Back to Dashboard</button>
        </div>`;
    }
    
    const locations = AdvertiserData.campaignLocations[campaignId] || [];
    
    return `
        <div class="dashboard-section">
            <div class="builder-header">
                <h2 class="section-title">🎮 ${campaign.name} - Campaign Control</h2>
                <button class="btn btn-outline" onclick="loadSection('overview')">← Back to Dashboard</button>
            </div>
            
            <p style="color: rgba(255,255,255,0.8); margin-bottom: 25px;">
                Manage your token locations and airdrops for the <strong>${campaign.name}</strong> campaign.
            </p>
            
            <!-- Campaign Stats -->
            <div class="hero-stats">
                <div class="stat-card">
                    <div class="stat-icon">📍</div>
                    <div class="stat-label">My Locations</div>
                    <div class="stat-value">${locations.length}</div>
                    <div class="stat-change">In this campaign</div>
                </div>
                
                <div class="stat-card">
                    <div class="stat-icon">👥</div>
                    <div class="stat-label">Visitors (30d)</div>
                    <div class="stat-value">847</div>
                    <div class="stat-change positive">+18% ↑</div>
                </div>
                
                <div class="stat-card">
                    <div class="stat-icon">💎</div>
                    <div class="stat-label">Tokens Active</div>
                    <div class="stat-value">${locations.reduce((sum, loc) => sum + loc.tokensRemaining, 0).toLocaleString()}</div>
                    <div class="stat-change">Available to collect</div>
                </div>
                
                <div class="stat-card">
                    <div class="stat-icon">📊</div>
                    <div class="stat-label">Engagement Rate</div>
                    <div class="stat-value">88.4%</div>
                    <div class="stat-change positive">Very High</div>
                </div>
            </div>
        </div>
        
        <!-- Add Token Location -->
        <div class="dashboard-section">
            <h3 style="font-size: 1.5rem; color: var(--color-primary-gold); margin-bottom: 20px;">
                ➕ Add Token Location to ${campaign.name}
            </h3>
            
            <!-- Bulk Upload -->
            <div class="card" style="margin-bottom: 20px; background: rgba(240,165,0,0.1); border: 2px solid rgba(240,165,0,0.3);">
                <h4 style="color: var(--color-primary-gold); margin-bottom: 15px;">📤 Bulk Upload (CSV)</h4>
                
                <p style="color: rgba(255,255,255,0.8); margin-bottom: 15px;">
                    Upload multiple token locations at once.
                </p>
                
                <div style="display: flex; gap: 10px; flex-wrap: wrap;">
                    <a href="data:text/csv;charset=utf-8,name,address,city,state,zip,token_amount,message,sponsor_name,sponsor_info,cta1_text,cta1_url,cta2_text,cta2_url%0AExample Location,123 Main St,Phoenix,AZ,85001,500,Welcome message,Sponsor Name,Sponsor info,Button 1,https://example.com,Button 2,https://example.com/page" 
                       download="token-locations-template.csv" 
                       class="btn btn-outline">
                        📥 Download CSV Template
                    </a>
                    <button class="btn btn-secondary" onclick="document.getElementById('advCsvUpload_${campaignId}').click()">
                        📤 Upload CSV File
                    </button>
                </div>
                
                <input type="file" id="advCsvUpload_${campaignId}" accept=".csv" style="display: none;" onchange="handleAdvCSVUpload(event, '${campaignId}')">
            </div>
            
            <!-- Single Location Form -->
            <div class="card">
                <h4 style="color: var(--color-primary-gold); margin-bottom: 20px;">
                    📍 Add Single Token Location
                </h4>
                
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-bottom: 15px;">
                    <div class="form-group">
                        <label class="form-label">Location Name *</label>
                        <input type="text" class="form-input" id="advLocationName_${campaignId}" placeholder="Heritage Square Historic Site">
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label">Token Amount per Collection *</label>
                        <input type="number" class="form-input" id="advTokenAmount_${campaignId}" value="500" min="100" step="50">
                    </div>
                </div>
                
                <div class="form-group">
                    <label class="form-label">Address *</label>
                    <input type="text" class="form-input" id="advAddress_${campaignId}" placeholder="115 N 6th St, Phoenix, AZ 85004">
                    <div class="form-hint">Auto-geocoded to latitude/longitude</div>
                </div>
                
                <div class="form-group">
                    <label class="form-label">Collection Message *</label>
                    <textarea class="form-input" id="advMessage_${campaignId}" rows="2" placeholder="Welcome! Collect your $Ember tokens here..."></textarea>
                </div>
                
                <div style="background: rgba(59,130,246,0.1); border: 1px solid rgba(59,130,246,0.3); border-radius: 12px; padding: 20px; margin: 20px 0;">
                    <h5 style="color: #3b82f6; margin-bottom: 15px;">📢 Sponsor Information (Optional)</h5>
                    
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
                        <div class="form-group">
                            <label class="form-label">Sponsor Name</label>
                            <input type="text" class="form-input" id="advSponsorName_${campaignId}" placeholder="Your Business Name">
                        </div>
                        
                        <div class="form-group">
                            <label class="form-label">Sponsor Tagline</label>
                            <input type="text" class="form-input" id="advSponsorInfo_${campaignId}" placeholder="Your tagline">
                        </div>
                    </div>
                    
                    <h6 style="color: var(--color-primary-gold); margin: 15px 0 10px 0;">Call-to-Action Buttons</h6>
                    
                    <div style="display: grid; grid-template-columns: 1fr 2fr; gap: 10px; margin-bottom: 10px;">
                        <input type="text" class="form-input" id="advCta1Text_${campaignId}" placeholder="Button 1 Text">
                        <input type="text" class="form-input" id="advCta1Url_${campaignId}" placeholder="https://example.com">
                    </div>
                    
                    <div style="display: grid; grid-template-columns: 1fr 2fr; gap: 10px;">
                        <input type="text" class="form-input" id="advCta2Text_${campaignId}" placeholder="Button 2 Text (Optional)">
                        <input type="text" class="form-input" id="advCta2Url_${campaignId}" placeholder="https://example.com/page">
                    </div>
                </div>
                
                <button class="btn btn-primary btn-large" onclick="addAdvTokenLocation('${campaignId}')" style="width: 100%;">
                    💎 Add Token Location
                </button>
            </div>
        </div>
        
        <!-- Live Map -->
        <div class="dashboard-section">
            <h3 style="font-size: 1.5rem; color: var(--color-primary-gold); margin-bottom: 20px;">
                🗺️ ${campaign.name} - Token Location Map
            </h3>
            
            <div class="card">
                <div id="advertiserMap_${campaignId}" style="height: 500px; background: #1a1a1a; border-radius: 12px; position: relative; overflow: hidden;">
                    <!-- Google Maps loads here -->
                </div>
                
                <div style="margin-top: 15px; padding: 12px; background: rgba(0,0,0,0.3); border-radius: 8px;">
                    <div style="font-weight: 700; margin-bottom: 8px; font-size: 0.9rem;">Map shows:</div>
                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 8px; font-size: 0.85rem;">
                        <div style="display: flex; align-items: center; gap: 8px;">
                            <span style="width: 10px; height: 10px; background: #f0a500; border-radius: 50%; display: inline-block;"></span>
                            <span>My Token Locations (${locations.length})</span>
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
                📍 My Token Locations (${locations.length})
            </h3>
            
            ${locations.map(loc => `
                <div class="card" style="margin-bottom: 15px;">
                    <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 15px; flex-wrap: wrap; gap: 15px;">
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
                                <div style="display: flex; gap: 10px; margin-top: 10px; flex-wrap: wrap;">
                                    ${loc.ctaButtons.map(btn => `
                                        <a href="${btn.url}" target="_blank" class="btn btn-small btn-outline">${btn.text}</a>
                                    `).join('')}
                                </div>
                            ` : ''}
                        </div>
                    ` : ''}
                    
                    <div style="display: flex; gap: 10px; flex-wrap: wrap;">
                        <button class="btn btn-outline" onclick="editAdvLocation('${loc.id}', '${campaignId}')">Edit</button>
                        <button class="btn btn-secondary" onclick="refillAdvTokens('${loc.id}', '${campaignId}')">Refill Tokens</button>
                        <button class="btn" onclick="viewLocationAnalytics('${loc.id}', '${campaignId}')" style="background: rgba(34,197,94,0.3); border: 1px solid #22c55e;">Analytics</button>
                    </div>
                </div>
            `).join('')}
            
            ${locations.length === 0 ? `
                <div class="card" style="text-align: center; padding: 40px;">
                    <div style="font-size: 3rem; margin-bottom: 15px;">📍</div>
                    <h4 style="margin-bottom: 10px;">No locations yet</h4>
                    <p style="color: rgba(255,255,255,0.7); margin-bottom: 20px;">
                        Add your first token location to start driving foot traffic through ${campaign.name}.
                    </p>
                </div>
            ` : ''}
        </div>
        
        <!-- Google Maps Script -->
        <script>
            let advertiserMapInstance_${campaignId.replace(/-/g, '_')};
            
            function initAdvertiserMap_${campaignId.replace(/-/g, '_')}() {
                const mapElement = document.getElementById('advertiserMap_${campaignId}');
                if (!mapElement) return;
                
                if (typeof google === 'undefined') {
                    mapElement.innerHTML = \`
                        <div style="height: 100%; display: flex; align-items: center; justify-content: center; flex-direction: column; padding: 40px; text-align: center;">
                            <div style="font-size: 3rem; margin-bottom: 20px;">🗺️</div>
                            <h3 style="color: var(--color-primary-gold); margin-bottom: 15px;">Google Maps API Required</h3>
                            <p style="color: rgba(255,255,255,0.7); max-width: 500px;">
                                Add your Google Maps API key to dashboard.html to display the interactive map.
                            </p>
                        </div>
                    \`;
                    return;
                }
                
                advertiserMapInstance_${campaignId.replace(/-/g, '_')} = new google.maps.Map(mapElement, {
                    center: { lat: 33.4484, lng: -112.0740 },
                    zoom: 13,
                    styles: [
                        { elementType: "geometry", stylers: [{ color: "#1a1a1a" }] },
                        { elementType: "labels.text.stroke", stylers: [{ color: "#1a1a1a" }] },
                        { elementType: "labels.text.fill", stylers: [{ color: "#746855" }] }
                    ]
                });
                
                ${JSON.stringify(locations)}.forEach(location => {
                    const marker = new google.maps.Marker({
                        position: { lat: location.lat, lng: location.lng },
                        map: advertiserMapInstance_${campaignId.replace(/-/g, '_')},
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
                    
                    const infoWindow = new google.maps.InfoWindow({
                        content: \`
                            <div style="color: #000; padding: 10px;">
                                <h4 style="margin: 0 0 10px 0; color: #f0a500;">\${location.name}</h4>
                                <p style="margin: 5px 0;"><strong>Tokens:</strong> \${location.tokensRemaining.toLocaleString()} remaining</p>
                                <p style="margin: 5px 0;"><strong>Amount:</strong> \${location.tokenAmount} per collection</p>
                            </div>
                        \`
                    });
                    
                    marker.addListener('click', () => infoWindow.open(advertiserMapInstance_${campaignId.replace(/-/g, '_')}, marker));
                });
            }
            
            setTimeout(initAdvertiserMap_${campaignId.replace(/-/g, '_')}, 500);
        </script>
    `;
}

// ============================================
// HELPER FUNCTIONS
// ============================================

function loadCampaignControl(campaignId) {
    const content = getCampaignControlContent(campaignId);
    const mainContent = document.getElementById('dashboardContent');
    if (mainContent) {
        mainContent.innerHTML = content;
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function handleAdvCSVUpload(event, campaignId) {
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
                tokenAmount: parseInt(parts[5]) || 500
            };
        });
        
        const preview = locations.map(loc => `• ${loc.name} - ${loc.tokenAmount} tokens`).join('\n');
        
        if (confirm(`📤 Upload ${locations.length} location(s) to this campaign?\n\n${preview}\n\nContinue?`)) {
            alert(`✓ Success! ${locations.length} token location(s) added.`);
            loadCampaignControl(campaignId);
        }
    };
    reader.readAsText(file);
}

function addAdvTokenLocation(campaignId) {
    const name = document.getElementById(`advLocationName_${campaignId}`)?.value;
    const address = document.getElementById(`advAddress_${campaignId}`)?.value;
    const tokenAmount = parseInt(document.getElementById(`advTokenAmount_${campaignId}`)?.value) || 500;
    const message = document.getElementById(`advMessage_${campaignId}`)?.value;
    
    if (!name || !address || !message) {
        alert('Please fill in required fields: Name, Address, Message');
        return;
    }
    
    alert(`✓ Token Location Added!\n\n📍 ${name}\n${address}\n💎 ${tokenAmount} tokens per collection`);
    loadCampaignControl(campaignId);
}

function editAdvLocation(locationId, campaignId) {
    alert(`Edit location: ${locationId}\n\nThis would open an edit form.`);
}

function refillAdvTokens(locationId, campaignId) {
    const amount = prompt('How many tokens to add?', '5000');
    if (amount) {
        alert(`✓ Added ${parseInt(amount).toLocaleString()} tokens to this location.`);
        loadCampaignControl(campaignId);
    }
}

function viewLocationAnalytics(locationId, campaignId) {
    alert(`Location Analytics\n\nThis would show:\n• Total collections\n• Unique visitors\n• Peak times\n• Demographics`);
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
    `;
}

// Export functions
if (typeof window !== 'undefined') {
    window.AdvertiserData = AdvertiserData;
    window.getAdvertiserOverview = getAdvertiserOverview;
    window.getCampaignControlContent = getCampaignControlContent;
    window.loadCampaignControl = loadCampaignControl;
    window.getAdvertiserAnalyticsContent = getAdvertiserAnalyticsContent;
    window.handleAdvCSVUpload = handleAdvCSVUpload;
    window.addAdvTokenLocation = addAdvTokenLocation;
    window.editAdvLocation = editAdvLocation;
    window.refillAdvTokens = refillAdvTokens;
    window.viewLocationAnalytics = viewLocationAnalytics;
}
