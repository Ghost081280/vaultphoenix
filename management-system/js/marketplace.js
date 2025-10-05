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
            totalLocations: 3,
            advertiserLocations: 1,
            avgFootTraffic: 850,
            cpm: 15.50,
            engagement: 87.3,
            isParticipating: true // Advertiser is already in this campaign
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
            totalLocations: 28,
            advertiserLocations: 0,
            avgFootTraffic: 420,
            cpm: 12.75,
            engagement: 82.1,
            isParticipating: false
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
            totalLocations: 35,
            advertiserLocations: 0,
            avgFootTraffic: 720,
            cpm: 18.25,
            engagement: 91.4,
            isParticipating: false
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
    
    const myCampaigns = MarketplaceData.activeCampaigns.filter(c => c.isParticipating);
    const availableCampaigns = MarketplaceData.activeCampaigns.filter(c => !c.isParticipating);
    
    return `
        <div class="dashboard-section">
            <h2 class="section-title">🛒 Campaign Marketplace</h2>
            <p style="color: rgba(255,255,255,0.8); font-size: 1.1rem; margin-bottom: 30px;">
                Browse active AR crypto gaming campaigns and advertise your location to drive real foot traffic.
            </p>
            
            <!-- My Active Campaigns -->
            ${myCampaigns.length > 0 ? `
                <div class="dashboard-section">
                    <h3 style="font-size: 1.5rem; color: var(--color-primary-gold); margin-bottom: 20px;">
                        ✅ My Active Campaigns (${myCampaigns.length})
                    </h3>
                    
                    <div class="apps-grid">
                        ${myCampaigns.map(campaign => `
                            <div class="card" style="border: 2px solid rgba(34,197,94,0.5);">
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
                                        ACTIVE
                                    </span>
                                </div>
                                
                                <div style="padding: 12px; background: rgba(0,0,0,0.3); border-radius: 8px; margin-bottom: 15px;">
                                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; font-size: 0.9rem;">
                                        <div>
                                            <div style="color: rgba(255,255,255,0.6);">My Locations</div>
                                            <div style="font-weight: 700; color: var(--color-primary-gold);">${campaign.advertiserLocations}</div>
                                        </div>
                                        <div>
                                            <div style="color: rgba(255,255,255,0.6);">Total Locations</div>
                                            <div style="font-weight: 700;">${campaign.totalLocations}</div>
                                        </div>
                                        <div>
                                            <div style="color: rgba(255,255,255,0.6);">Active Players</div>
                                            <div style="font-weight: 700;">${campaign.activePlayers.toLocaleString()}</div>
                                        </div>
                                        <div>
                                            <div style="color: rgba(255,255,255,0.6);">Engagement</div>
                                            <div style="font-weight: 700; color: #22c55e;">${campaign.engagement}%</div>
                                        </div>
                                    </div>
                                </div>
                                
                                <div style="display: flex; gap: 10px; flex-wrap: wrap;">
                                    <button class="btn btn-primary" onclick="loadCampaignControl('${campaign.id}')" style="flex: 1;">
                                        Manage Campaign
                                    </button>
                                    <button class="btn btn-secondary" onclick="requestAirdropForCampaign('${campaign.id}')">
                                        Request Airdrop
                                    </button>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            ` : ''}
            
            <!-- Search & Filter -->
            <div class="card" style="margin-bottom: 30px;">
                <h3 style="margin-bottom: 15px;">🔍 Find New Campaigns</h3>
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
            
            <!-- Available Campaigns -->
            <div class="dashboard-section">
                <h3 style="font-size: 1.5rem; color: var(--color-primary-gold); margin-bottom: 20px;">
                    🎮 Available Campaigns to Join (${availableCampaigns.length})
                </h3>
                
                <div class="apps-grid">
                    ${availableCampaigns.map(campaign => `
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
                                        <div style="font-weight: 700;">${campaign.totalLocations}</div>
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
                                <div style="font-size: 0.85rem; color: rgba(255,255,255,0.7); margin-bottom: 5px;">Target Demographics</div>
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
                                📍 Join This Campaign
                            </button>
                        </div>
                    `).join('')}
                </div>
            </div>
            
            <!-- How It Works -->
            <div class="card">
                <h3 style="color: var(--color-primary-gold); margin-bottom: 20px;">
                    📚 How Campaign Advertising Works
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
                        <h4 style="margin-bottom: 10px;">Add Token Locations</h4>
                        <p style="color: rgba(255,255,255,0.7); margin: 0;">
                            Add your business locations with $Ember tokens. Include sponsor messages and call-to-action buttons.
                        </p>
                    </div>
                    
                    <div style="padding: 20px; background: rgba(0,0,0,0.2); border-radius: 12px;">
                        <div style="font-size: 2rem; margin-bottom: 10px;">3️⃣</div>
                        <h4 style="margin-bottom: 10px;">Request Airdrops</h4>
                        <p style="color: rgba(255,255,255,0.7); margin: 0;">
                            Request player airdrops to drive immediate foot traffic during peak hours or special events.
                        </p>
                    </div>
                    
                    <div style="padding: 20px; background: rgba(0,0,0,0.2); border-radius: 12px;">
                        <div style="font-size: 2rem; margin-bottom: 10px;">4️⃣</div>
                        <h4 style="margin-bottom: 10px;">Track Performance</h4>
                        <p style="color: rgba(255,255,255,0.7); margin: 0;">
                            Monitor GPS-verified foot traffic, engagement metrics, and ROI in real-time from your campaign dashboard.
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
        `After joining, you'll be able to:\n` +
        `• Add your token locations\n` +
        `• Configure sponsor messages\n` +
        `• Request player airdrops\n` +
        `• Track GPS-verified visitors\n\n` +
        `Continue?`;
    
    if (confirm(confirmMsg)) {
        // Mark as participating
        campaign.isParticipating = true;
        campaign.advertiserLocations = 0; // Start with 0 locations
        
        sessionStorage.setItem('selectedCampaign', campaignId);
        
        alert(`✓ Welcome to ${campaign.name}!\n\n` +
            `You've successfully joined the campaign.\n\n` +
            `Next Steps:\n` +
            `1. Add your first token location\n` +
            `2. Configure sponsor messages\n` +
            `3. Fund your campaign with tokens\n\n` +
            `Redirecting to campaign control...`);
        
        // Redirect to campaign control
        if (typeof window.loadCampaignControl === 'function') {
            window.loadCampaignControl(campaignId);
        } else {
            alert('Campaign control is loading...');
            if (typeof window.loadSection === 'function') {
                window.loadSection('marketplace');
            }
        }
    }
}

/**
 * Request airdrop for a specific campaign
 */
function requestAirdropForCampaign(campaignId) {
    const campaign = MarketplaceData.activeCampaigns.find(c => c.id === campaignId);
    
    if (!campaign) return;
    
    // Store campaign context
    sessionStorage.setItem('airdropCampaignId', campaignId);
    
    // Navigate to airdrop requests with campaign pre-selected
    if (typeof window.loadSection === 'function') {
        window.loadSection('airdrop-requests');
    }
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
    
    return `
        <div class="dashboard-section">
            <h2 class="section-title">📍 Advertiser Management</h2>
            
            <!-- Stats -->
            <div class="hero-stats">
                <div class="stat-card">
                    <div class="stat-icon">🏢</div>
                    <div class="stat-label">Active Advertisers</div>
                    <div class="stat-value">1</div>
                    <div class="stat-change">In $Ember Hunt</div>
                </div>
                
                <div class="stat-card">
                    <div class="stat-icon">⏳</div>
                    <div class="stat-label">Pending Approval</div>
                    <div class="stat-value">0</div>
                    <div class="stat-change">No pending requests</div>
                </div>
                
                <div class="stat-card">
                    <div class="stat-icon">💰</div>
                    <div class="stat-label">Monthly Recurring Revenue</div>
                    <div class="stat-value">$650</div>
                    <div class="stat-change">Location + Tokens</div>
                </div>
                
                <div class="stat-card">
                    <div class="stat-icon">📊</div>
                    <div class="stat-label">Avg Revenue per Advertiser</div>
                    <div class="stat-value">$650</div>
                    <div class="stat-change">Per month</div>
                </div>
            </div>
            
            <!-- Advertiser Table -->
            <div class="card" style="margin-top: 30px;">
                <h3 style="margin-bottom: 20px;">Active Advertisers in $Ember Hunt</h3>
                
                <div class="merchants-table-wrapper">
                    <table class="merchants-table">
                        <thead>
                            <tr>
                                <th>Advertiser</th>
                                <th>Campaign</th>
                                <th>Locations</th>
                                <th>Tier</th>
                                <th>Monthly Fee</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Heritage Square Historic Site</td>
                                <td>$Ember Hunt</td>
                                <td>1</td>
                                <td><span class="tier-badge tier-silver">Silver</span></td>
                                <td>$500</td>
                                <td><span class="badge badge-success">Active</span></td>
                                <td>
                                    <button class="btn btn-small btn-outline">View</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    `;
}

// Export functions
if (typeof window !== 'undefined') {
    window.MarketplaceData = MarketplaceData;
    window.getMarketplaceContent = getMarketplaceContent;
    window.getAdvertisersContent = getAdvertisersContent;
    window.joinCampaign = joinCampaign;
    window.requestAirdropForCampaign = requestAirdropForCampaign;
}
