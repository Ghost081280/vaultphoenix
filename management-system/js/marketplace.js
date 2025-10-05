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
                        <h4 style="margin-bottom: 10px;">Add Token Locations</h4>
                        <p style="color: rgba(255,255,255,0.7); margin: 0;">
                            Add your business locations with $Ember tokens. Include sponsor messages and call-to-action buttons.
                        </p>
                    </div>
                    
                    <div style="padding: 20px; background: rgba(0,0,0,0.2); border-radius: 12px;">
                        <div style="font-size: 2rem; margin-bottom: 10px;">3️⃣</div>
                        <h4 style="margin-bottom: 10px;">Fund Your Campaign</h4>
                        <p style="color: rgba(255,255,255,0.7); margin: 0;">
                            Pay your location tier fee and add tokens to your locations to incentivize player visits.
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
        `You'll be able to add your token locations and configure sponsor messages on the next screen.`;
    
    if (confirm(confirmMsg)) {
        sessionStorage.setItem('selectedCampaign', campaignId);
        
        alert(`✓ Great Choice!\n\nYou've selected "${campaign.name}". Now let's add your token locations with sponsor messages and CTA buttons.\n\nRedirecting to location setup...`);
        
        if (typeof window.loadSection === 'function') {
            window.loadSection('locations');
        }
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
    
    return getPlaceholderContent('advertisers');
}

// Export functions
if (typeof window !== 'undefined') {
    window.MarketplaceData = MarketplaceData;
    window.getMarketplaceContent = getMarketplaceContent;
    window.getAdvertisersContent = getAdvertisersContent;
    window.joinCampaign = joinCampaign;
}
