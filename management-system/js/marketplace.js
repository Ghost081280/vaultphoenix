/* ============================================
   VAULT PHOENIX MANAGEMENT SYSTEM
   Campaign Marketplace - For Advertisers
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
            cpm: 15.50, // Cost per thousand impressions
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
    ],
    pricingTiers: [
        {
            name: 'Bronze',
            monthlyFee: 200,
            setupFee: 500,
            visibility: 'Standard',
            priority: 'Low',
            features: ['Basic analytics', 'Monthly reports', 'Standard placement']
        },
        {
            name: 'Silver',
            monthlyFee: 500,
            setupFee: 1000,
            visibility: 'Enhanced',
            priority: 'Medium',
            features: ['Advanced analytics', 'Weekly reports', 'Priority placement', 'Custom branding']
        },
        {
            name: 'Gold',
            monthlyFee: 1200,
            setupFee: 2500,
            visibility: 'Featured',
            priority: 'High',
            features: ['Real-time analytics', 'Daily reports', 'Featured placement', 'Dedicated support']
        },
        {
            name: 'Platinum',
            monthlyFee: 2500,
            setupFee: 5000,
            visibility: 'Premium',
            priority: 'Exclusive',
            features: ['Full analytics suite', 'Real-time reporting', 'Exclusive territory', 'Account manager']
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
            
            <!-- Pricing Tiers -->
            <div class="dashboard-section">
                <h3 style="font-size: 1.5rem; color: var(--color-primary-gold); margin-bottom: 20px;">
                    💎 Pricing Tiers
                </h3>
                
                <div class="apps-grid">
                    ${MarketplaceData.pricingTiers.map(tier => `
                        <div class="card">
                            <h4 style="color: var(--color-primary-gold); margin-bottom: 15px; font-size: 1.4rem;">
                                ${tier.name} Tier
                            </h4>
                            
                            <div style="margin-bottom: 20px;">
                                <div style="font-size: 2.5rem; font-weight: 900; color: var(--color-primary-orange); margin-bottom: 5px;">
                                    $${tier.monthlyFee}
                                    <span style="font-size: 1rem; color: rgba(255,255,255,0.6);">/month</span>
                                </div>
                                <div style="color: rgba(255,255,255,0.6); font-size: 0.9rem;">
                                    Setup: $${tier.setupFee}
                                </div>
                            </div>
                            
                            <div style="padding: 12px; background: rgba(0,0,0,0.3); border-radius: 8px; margin-bottom: 15px;">
                                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; font-size: 0.9rem;">
                                    <div>
                                        <div style="color: rgba(255,255,255,0.6);">Visibility</div>
                                        <div style="font-weight: 700;">${tier.visibility}</div>
                                    </div>
                                    <div>
                                        <div style="color: rgba(255,255,255,0.6);">Priority</div>
                                        <div style="font-weight: 700;">${tier.priority}</div>
                                    </div>
                                </div>
                            </div>
                            
                            <ul style="list-style: none; padding: 0; margin: 0 0 20px 0;">
                                ${tier.features.map(feature => `
                                    <li style="padding: 8px 0; border-bottom: 1px solid rgba(255,255,255,0.1); font-size: 0.9rem;">
                                        ✓ ${feature}
                                    </li>
                                `).join('')}
                            </ul>
                            
                            <button class="btn btn-outline" style="width: 100%;">
                                Select ${tier.name}
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
        // Store selected campaign
        sessionStorage.setItem('selectedCampaign', campaignId);
        
        alert(`✓ Great Choice!\n\nYou've selected "${campaign.name}". Now let's set up your location and pricing.\n\nRedirecting to location setup...`);
        
        // Navigate to locations setup
        if (typeof window.loadSection === 'function') {
            window.loadSection('locations');
        }
    }
}

/**
 * Get Locations Content for Advertisers
 */
function getLocationsContent(role) {
    if (role !== 'advertiser') {
        return getPlaceholderContent('locations');
    }
    
    return `
        <div class="dashboard-section">
            <h2 class="section-title">📍 My Advertising Locations</h2>
            
            <!-- Add New Location -->
            <div class="card" style="margin-bottom: 30px;">
                <h3 style="color: var(--color-primary-gold); margin-bottom: 20px;">
                    ➕ Add New Location
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
                        <label class="form-label">Latitude</label>
                        <input type="text" class="form-input" id="latitude" placeholder="33.4484">
                    </div>
                    <div class="form-group">
                        <label class="form-label">Longitude</label>
                        <input type="text" class="form-input" id="longitude" placeholder="-112.0740">
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
                    <label class="form-label">Pricing Tier</label>
                    <select class="form-input" id="pricingTier">
                        ${MarketplaceData.pricingTiers.map(t => 
                            `<option value="${t.name.toLowerCase()}">${t.name} - $${t.monthlyFee}/month</option>`
                        ).join('')}
                    </select>
                </div>
                
                <button class="btn btn-primary btn-large" onclick="addLocation()">
                    📍 Add Location & Proceed to Payment
                </button>
            </div>
            
            <!-- Existing Locations -->
            <div class="card">
                <h3 style="color: var(--color-primary-gold); margin-bottom: 20px;">
                    📊 Active Locations
                </h3>
                
                <div class="app-card" style="margin-bottom: 0;">
                    <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 15px;">
                        <div>
                            <h4 style="font-size: 1.2rem; margin-bottom: 5px;">Heritage Square Historic Site</h4>
                            <div style="color: rgba(255,255,255,0.6); font-size: 0.9rem;">115 N 6th St, Phoenix, AZ 85004</div>
                        </div>
                        <span class="badge badge-success">
                            <span class="status-indicator status-live"></span>
                            ACTIVE
                        </span>
                    </div>
                    
                    <div class="app-metrics">
                        <div class="app-metric">
                            <span class="metric-label">Campaign</span>
                            <span class="metric-value">$Ember Hunt</span>
                        </div>
                        <div class="app-metric">
                            <span class="metric-label">Tier</span>
                            <span class="metric-value">Silver</span>
                        </div>
                        <div class="app-metric">
                            <span class="metric-label">Monthly Fee</span>
                            <span class="metric-value">$500</span>
                        </div>
                        <div class="app-metric">
                            <span class="metric-label">Visitors (30d)</span>
                            <span class="metric-value">847</span>
                        </div>
                    </div>
                    
                    <div class="app-actions" style="margin-top: 15px;">
                        <button class="btn btn-outline" onclick="loadSection('metrics')">View Metrics</button>
                        <button class="btn btn-secondary" onclick="loadSection('payments')">Manage Payment</button>
                    </div>
                </div>
            </div>
        </div>
    `;
}

/**
 * Add new location
 */
function addLocation() {
    const businessName = document.getElementById('businessName')?.value;
    const address = document.getElementById('businessAddress')?.value;
    
    if (!businessName || !address) {
        alert('Please fill in all required fields.');
        return;
    }
    
    const tier = document.getElementById('pricingTier')?.value || 'silver';
    const tierData = MarketplaceData.pricingTiers.find(t => t.name.toLowerCase() === tier);
    
    alert(`✓ Location Added!\n\n` +
        `📍 ${businessName}\n` +
        `${address}\n\n` +
        `Tier: ${tierData.name}\n` +
        `Setup Fee: $${tierData.setupFee}\n` +
        `Monthly: $${tierData.monthlyFee}\n\n` +
        `Redirecting to payment setup...`);
    
    // Navigate to payments
    if (typeof window.loadSection === 'function') {
        window.loadSection('payments');
    }
}

/**
 * Get Metrics Content for Advertisers
 */
function getMetricsContent(role) {
    if (role !== 'advertiser') {
        return getPlaceholderContent('metrics');
    }
    
    return getMerchantOverview();
}

/**
 * Get Advertisers Management Content (for Campaign Managers)
 */
function getAdvertisersContent(role) {
    if (role !== 'campaign-manager') {
        return getPlaceholderContent('advertisers');
    }
    
    return getMerchantsContent(role);
}

// Export functions
if (typeof window !== 'undefined') {
    window.getMarketplaceContent = getMarketplaceContent;
    window.getLocationsContent = getLocationsContent;
    window.getMetricsContent = getMetricsContent;
    window.getAdvertisersContent = getAdvertisersContent;
    window.joinCampaign = joinCampaign;
    window.addLocation = addLocation;
}
