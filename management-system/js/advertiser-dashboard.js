/* ============================================
   VAULT PHOENIX MANAGEMENT SYSTEM
   Advertiser Dashboard - QR Scanner Exchange Model
   ============================================ */

// ============================================
// ADVERTISER DATA - QR SCANNER MODEL
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
            totalLocations: 3,
            activePlayers: 847,
            qrScansThisMonth: 847,
            emberReceivedThisMonth: 42350
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
                qrScans30d: 847,
                emberReceived30d: 42350,
                avgEmberPerScan: 50,
                scannerActive: true,
                monthlyFee: 500,
                offers: [
                    { name: '10% Off Any Item', emberValue: 25 },
                    { name: 'Free Small Coffee', emberValue: 30 },
                    { name: '$5 Off $25 Purchase', emberValue: 50 },
                    { name: 'Free Museum Entry', emberValue: 75 }
                ]
            }
        ]
    },
    
    // Scanner app info
    scannerApp: {
        downloaded: true,
        version: '1.2.0',
        lastSync: new Date(),
        deviceType: 'tablet'
    }
};

// ============================================
// ADVERTISER OVERVIEW
// ============================================

function getAdvertiserOverview() {
    const totalLocations = Object.values(AdvertiserData.campaignLocations).flat().length;
    const totalCampaigns = AdvertiserData.activeCampaigns.length;
    const totalQRScans = AdvertiserData.activeCampaigns.reduce((sum, c) => sum + c.qrScansThisMonth, 0);
    const totalEmberReceived = AdvertiserData.activeCampaigns.reduce((sum, c) => sum + c.emberReceivedThisMonth, 0);
    
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
                <div class="stat-icon">📱</div>
                <div class="stat-label">QR Code Scans</div>
                <div class="stat-value">${totalQRScans}</div>
                <div class="stat-change positive">+18% ↑ vs last month</div>
            </div>
            
            <div class="stat-card">
                <div class="stat-icon">💎</div>
                <div class="stat-label">$Ember Received</div>
                <div class="stat-value">${totalEmberReceived.toLocaleString()}</div>
                <div class="stat-change positive">Via player exchanges</div>
            </div>
        </div>
        
        <!-- Scanner App Status -->
        <div class="dashboard-section">
            <div class="card" style="background: rgba(34,197,94,0.1); border: 2px solid rgba(34,197,94,0.4);">
                <div style="display: flex; justify-content: space-between; align-items: start; gap: 20px; flex-wrap: wrap;">
                    <div style="flex: 1; min-width: 300px;">
                        <h3 style="color: #22c55e; margin-bottom: 15px; font-size: 1.8rem;">
                            📱 $Ember Scanner App Status
                        </h3>
                        
                        ${AdvertiserData.scannerApp.downloaded ? `
                            <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 20px;">
                                <span class="status-indicator status-live"></span>
                                <span style="font-size: 1.3rem; font-weight: 700; color: #22c55e;">Scanner Active</span>
                            </div>
                            
                            <div style="background: rgba(0,0,0,0.3); border-radius: 12px; padding: 20px; margin-bottom: 20px;">
                                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 15px;">
                                    <div>
                                        <div style="color: rgba(255,255,255,0.6); font-size: 0.9rem; margin-bottom: 5px;">Version</div>
                                        <div style="font-size: 1.2rem; font-weight: 700;">${AdvertiserData.scannerApp.version}</div>
                                    </div>
                                    <div>
                                        <div style="color: rgba(255,255,255,0.6); font-size: 0.9rem; margin-bottom: 5px;">Device</div>
                                        <div style="font-size: 1.2rem; font-weight: 700;">${AdvertiserData.scannerApp.deviceType}</div>
                                    </div>
                                    <div>
                                        <div style="color: rgba(255,255,255,0.6); font-size: 0.9rem; margin-bottom: 5px;">Scans Today</div>
                                        <div style="font-size: 1.2rem; font-weight: 700; color: var(--color-primary-gold);">28</div>
                                    </div>
                                </div>
                            </div>
                            
                            <div style="display: flex; gap: 15px; flex-wrap: wrap;">
                                <button class="btn btn-secondary" onclick="openScannerApp()">
                                    📱 Open Scanner App
                                </button>
                                <button class="btn btn-outline" onclick="viewScanHistory()">
                                    📊 View Scan History
                                </button>
                            </div>
                        ` : `
                            <p style="color: rgba(255,255,255,0.9); font-size: 1.1rem; line-height: 1.6; margin-bottom: 20px;">
                                Download the Scanner App to accept $Ember payments from players. Scan their QR codes 
                                to receive $Ember in exchange for your products or services.
                            </p>
                            
                            <button class="btn btn-primary btn-large" onclick="downloadScanner()">
                                📱 Download Scanner App
                            </button>
                        `}
                    </div>
                    
                    <div style="text-align: center;">
                        <div style="width: 200px; height: 200px; background: white; border-radius: 12px; display: flex; align-items: center; justify-content: center; margin-bottom: 15px;">
                            <div style="font-size: 4rem;">📱</div>
                        </div>
                        <div style="color: rgba(255,255,255,0.7); font-size: 0.9rem;">
                            Scanner App QR Code
                        </div>
                    </div>
                </div>
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
                                <span class="metric-label">QR Scans</span>
                                <span class="metric-value">${campaign.qrScansThisMonth}</span>
                            </div>
                            <div class="app-metric">
                                <span class="metric-label">$Ember Received</span>
                                <span class="metric-value">${campaign.emberReceivedThisMonth.toLocaleString()}</span>
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
                <button class="btn btn-primary" style="padding: 20px; font-size: 1.1rem;" onclick="openScannerApp()">
                    📱 Open Scanner App
                </button>
                <button class="btn btn-secondary" style="padding: 20px; font-size: 1.1rem;" onclick="loadSection('marketplace')">
                    🛒 Browse More Campaigns
                </button>
                <button class="btn btn-outline" style="padding: 20px; font-size: 1.1rem;" onclick="loadSection('budget')">
                    💰 View ROI Calculator
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
                Manage your token locations and track QR code exchanges for the <strong>${campaign.name}</strong> campaign.
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
                    <div class="stat-icon">📱</div>
                    <div class="stat-label">QR Scans (30d)</div>
                    <div class="stat-value">${campaign.qrScansThisMonth}</div>
                    <div class="stat-change positive">+18% ↑</div>
                </div>
                
                <div class="stat-card">
                    <div class="stat-icon">💎</div>
                    <div class="stat-label">$Ember Received</div>
                    <div class="stat-value">${campaign.emberReceivedThisMonth.toLocaleString()}</div>
                    <div class="stat-change positive">From exchanges</div>
                </div>
                
                <div class="stat-card">
                    <div class="stat-icon">📊</div>
                    <div class="stat-label">Avg per Scan</div>
                    <div class="stat-value">${Math.round(campaign.emberReceivedThisMonth / campaign.qrScansThisMonth)}</div>
                    <div class="stat-change">$Ember tokens</div>
                </div>
            </div>
        </div>
        
        <!-- Add Token Location -->
        <div class="dashboard-section">
            <h3 style="font-size: 1.5rem; color: var(--color-primary-gold); margin-bottom: 20px;">
                ➕ Add Token Location to ${campaign.name}
            </h3>
            
            <!-- Single Location Form -->
            <div class="card">
                <h4 style="color: var(--color-primary-gold); margin-bottom: 20px;">
                    📍 Add Your Location
                </h4>
                
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-bottom: 15px;">
                    <div class="form-group">
                        <label class="form-label">Location Name *</label>
                        <input type="text" class="form-input" id="advLocationName_${campaignId}" placeholder="Heritage Square Historic Site">
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label">Select Tier *</label>
                        <select class="form-input" id="advTier_${campaignId}">
                            <option value="bronze">Bronze - $200/month</option>
                            <option value="silver" selected>Silver - $500/month</option>
                            <option value="gold">Gold - $1,200/month</option>
                            <option value="platinum">Platinum - $2,500/month</option>
                        </select>
                    </div>
                </div>
                
                <div class="form-group">
                    <label class="form-label">Address *</label>
                    <input type="text" class="form-input" id="advAddress_${campaignId}" placeholder="115 N 6th St, Phoenix, AZ 85004">
                    <div class="form-hint">Auto-geocoded to latitude/longitude</div>
                </div>
                
                <div style="background: rgba(34,197,94,0.1); border: 1px solid rgba(34,197,94,0.3); border-radius: 12px; padding: 20px; margin: 20px 0;">
                    <h5 style="color: #22c55e; margin-bottom: 15px;">🎁 Your Offers (What players can exchange $Ember for)</h5>
                    
                    <div id="offersContainer_${campaignId}">
                        <div class="offer-row" style="display: grid; grid-template-columns: 2fr 1fr auto; gap: 10px; margin-bottom: 10px;">
                            <input type="text" class="form-input" placeholder="e.g., 10% Off Any Item" value="10% Off Any Item">
                            <input type="number" class="form-input" placeholder="$Ember value" value="25">
                            <button class="btn btn-small btn-outline" onclick="removeOffer(this)">✗</button>
                        </div>
                    </div>
                    
                    <button class="btn btn-secondary btn-small" onclick="addOfferRow('${campaignId}')" style="margin-top: 10px;">
                        + Add Another Offer
                    </button>
                    
                    <div style="margin-top: 15px; padding: 12px; background: rgba(0,0,0,0.3); border-radius: 8px;">
                        <div style="font-size: 0.85rem; color: rgba(255,255,255,0.7); margin-bottom: 5px;">
                            💡 Example offers:
                        </div>
                        <div style="font-size: 0.8rem; color: rgba(255,255,255,0.6); line-height: 1.5;">
                            • Free coffee (30 $Ember)<br>
                            • 15% discount (25 $Ember)<br>
                            • $5 off purchase (50 $Ember)<br>
                            • Free museum entry (75 $Ember)
                        </div>
                    </div>
                </div>
                
                <button class="btn btn-primary btn-large" onclick="addAdvTokenLocation('${campaignId}')" style="width: 100%;">
                    💎 Add Location & Setup Scanner
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
                            <span>My Locations (${locations.length})</span>
                        </div>
                        <div style="display: flex; align-items: center; gap: 8px;">
                            <span style="width: 10px; height: 10px; background: #22c55e; border-radius: 50%; display: inline-block;"></span>
                            <span>Active Players</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        <!-- My Locations List -->
        <div class="dashboard-section">
            <h3 style="font-size: 1.5rem; color: var(--color-primary-gold); margin-bottom: 20px;">
                📍 My Locations (${locations.length})
            </h3>
            
            ${locations.map(loc => `
                <div class="card" style="margin-bottom: 15px;">
                    <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 15px; flex-wrap: wrap; gap: 15px;">
                        <div>
                            <h4 style="color: var(--color-primary-gold); margin-bottom: 5px;">${loc.name}</h4>
                            <div style="color: rgba(255,255,255,0.6); font-size: 0.9rem;">${loc.address}</div>
                        </div>
                        <div style="text-align: right;">
                            <span class="tier-badge tier-${loc.tier.toLowerCase()}">${loc.tier}</span>
                            ${loc.scannerActive ? `
                                <div style="margin-top: 8px;">
                                    <span class="status-indicator status-live"></span>
                                    <span style="color: #22c55e; font-size: 0.85rem;">Scanner Active</span>
                                </div>
                            ` : ''}
                        </div>
                    </div>
                    
                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 15px; margin-bottom: 15px;">
                        <div>
                            <div style="font-size: 0.85rem; color: rgba(255,255,255,0.6);">QR Scans (30d)</div>
                            <div style="font-size: 1.5rem; font-weight: 900; color: var(--color-primary-gold);">${loc.qrScans30d.toLocaleString()}</div>
                        </div>
                        <div>
                            <div style="font-size: 0.85rem; color: rgba(255,255,255,0.6);">$Ember Received</div>
                            <div style="font-size: 1.5rem; font-weight: 900; color: #22c55e;">${loc.emberReceived30d.toLocaleString()}</div>
                        </div>
                        <div>
                            <div style="font-size: 0.85rem; color: rgba(255,255,255,0.6);">Avg per Scan</div>
                            <div style="font-size: 1.5rem; font-weight: 900;">${loc.avgEmberPerScan}</div>
                        </div>
                    </div>
                    
                    <div style="background: rgba(34,197,94,0.1); border: 1px solid rgba(34,197,94,0.3); border-radius: 8px; padding: 15px; margin-bottom: 15px;">
                        <h5 style="color: #22c55e; margin-bottom: 10px;">Available Offers:</h5>
                        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 10px;">
                            ${loc.offers.map(offer => `
                                <div style="padding: 10px; background: rgba(0,0,0,0.3); border-radius: 8px;">
                                    <div style="font-weight: 700; margin-bottom: 3px;">${offer.name}</div>
                                    <div style="font-size: 0.9rem; color: var(--color-primary-gold);">${offer.emberValue} $Ember</div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                    
                    <div style="display: flex; gap: 10px; flex-wrap: wrap;">
                        <button class="btn btn-primary" onclick="openScannerApp()">Open Scanner</button>
                        <button class="btn btn-secondary" onclick="editOffers('${loc.id}')">Edit Offers</button>
                        <button class="btn btn-outline" onclick="viewLocationAnalytics('${loc.id}', '${campaignId}')">Analytics</button>
                    </div>
                </div>
            `).join('')}
            
            ${locations.length === 0 ? `
                <div class="card" style="text-align: center; padding: 40px;">
                    <div style="font-size: 3rem; margin-bottom: 15px;">📍</div>
                    <h4 style="margin-bottom: 10px;">No locations yet</h4>
                    <p style="color: rgba(255,255,255,0.7); margin-bottom: 20px;">
                        Add your first location to start accepting $Ember from players in ${campaign.name}.
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
                                <p style="margin: 5px 0;"><strong>QR Scans:</strong> \${location.qrScans30d.toLocaleString()}</p>
                                <p style="margin: 5px 0;"><strong>$Ember Received:</strong> \${location.emberReceived30d.toLocaleString()}</p>
                                <p style="margin: 5px 0;"><strong>Scanner:</strong> \${location.scannerActive ? 'Active' : 'Inactive'}</p>
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

function addOfferRow(campaignId) {
    const container = document.getElementById(`offersContainer_${campaignId}`);
    if (container) {
        const newRow = document.createElement('div');
        newRow.className = 'offer-row';
        newRow.style.cssText = 'display: grid; grid-template-columns: 2fr 1fr auto; gap: 10px; margin-bottom: 10px;';
        newRow.innerHTML = `
            <input type="text" class="form-input" placeholder="e.g., Free Appetizer">
            <input type="number" class="form-input" placeholder="$Ember value" value="30">
            <button class="btn btn-small btn-outline" onclick="removeOffer(this)">✗</button>
        `;
        container.appendChild(newRow);
    }
}

function removeOffer(button) {
    button.closest('.offer-row').remove();
}

function addAdvTokenLocation(campaignId) {
    const name = document.getElementById(`advLocationName_${campaignId}`)?.value;
    const address = document.getElementById(`advAddress_${campaignId}`)?.value;
    const tier = document.getElementById(`advTier_${campaignId}`)?.value;
    
    if (!name || !address) {
        alert('Please fill in required fields: Name and Address');
        return;
    }
    
    const tierPrices = {
        bronze: 200,
        silver: 500,
        gold: 1200,
        platinum: 2500
    };
    
    alert(`✓ Location Added!\n\n📍 ${name}\n${address}\n💳 ${tier} Tier - $${tierPrices[tier]}/month\n\n📱 Next Step: Download the Scanner App to start accepting $Ember from players!`);
    
    if (confirm('Download Scanner App now?')) {
        downloadScanner();
    }
    
    loadCampaignControl(campaignId);
}

function editOffers(locationId) {
    alert(`Edit Offers\n\nThis would open a form to edit your available offers and their $Ember values.`);
}

function viewLocationAnalytics(locationId, campaignId) {
    alert(`Location Analytics\n\nThis would show:\n• QR scan history\n• Peak scan times\n• Popular offers\n• $Ember exchange patterns\n• Customer demographics`);
}

function openScannerApp() {
    if (AdvertiserData.scannerApp.downloaded) {
        alert(`📱 Opening Scanner App...\n\nThe Scanner App would open on your device, ready to scan player QR codes and receive $Ember instantly.`);
    } else {
        if (confirm('Scanner App not found. Download now?')) {
            downloadScanner();
        }
    }
}

function viewScanHistory() {
    alert(`📊 QR Scan History\n\nRecent scans:\n• Oct 5, 2:43 PM - 50 $Ember (10% off)\n• Oct 5, 2:15 PM - 30 $Ember (Free coffee)\n• Oct 5, 1:58 PM - 75 $Ember (Museum entry)\n\nTotal today: 28 scans\nTotal value: 1,425 $Ember`);
}

function downloadScanner() {
    alert(`📱 Download $Ember Scanner App\n\nAvailable for:\n• iOS (App Store)\n• Android (Google Play)\n• Web App (PWA)\n\nSearch for "Vault Phoenix Scanner" or scan the QR code in your dashboard.\n\nSetup takes less than 2 minutes!`);
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
                    <div class="stat-icon">📱</div>
                    <div class="stat-label">QR Code Scans</div>
                    <div class="stat-value">847</div>
                    <div class="stat-change">100% scan rate</div>
                </div>
                
                <div class="stat-card">
                    <div class="stat-icon">💎</div>
                    <div class="stat-label">$Ember Received</div>
                    <div class="stat-value">42,350</div>
                    <div class="stat-change positive">+12% ↑</div>
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
    window.addOfferRow = addOfferRow;
    window.removeOffer = removeOffer;
    window.addAdvTokenLocation = addAdvTokenLocation;
    window.editOffers = editOffers;
    window.viewLocationAnalytics = viewLocationAnalytics;
    window.openScannerApp = openScannerApp;
    window.viewScanHistory = viewScanHistory;
    window.downloadScanner = downloadScanner;
}
