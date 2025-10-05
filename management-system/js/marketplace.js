/* ============================================
   VAULT PHOENIX MANAGEMENT SYSTEM
   Campaign Marketplace - QR Scanner Model
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
            minMonthlyFee: 200,
            demographics: 'Ages 18-45, Gaming enthusiasts',
            totalLocations: 3,
            advertiserLocations: 1,
            avgQRScans: 850,
            avgEmberPerScan: 50,
            engagement: 87.3,
            isParticipating: true,
            scannerRequired: true
        },
        {
            id: 'camp-002',
            name: 'Desert Quest AR',
            manager: 'AZ Adventure Games',
            type: 'SDK Integration',
            status: 'live',
            activePlayers: 423,
            coverage: 'Scottsdale & Tempe',
            minMonthlyFee: 200,
            demographics: 'Ages 21-35, Active lifestyle',
            totalLocations: 28,
            advertiserLocations: 0,
            avgQRScans: 420,
            avgEmberPerScan: 45,
            engagement: 82.1,
            isParticipating: false,
            scannerRequired: true
        },
        {
            id: 'camp-003',
            name: 'Valley Token Trail',
            manager: 'Southwest Digital',
            type: 'White Label',
            status: 'live',
            activePlayers: 634,
            coverage: 'Downtown Phoenix',
            minMonthlyFee: 500,
            demographics: 'Ages 25-50, Urban professionals',
            totalLocations: 35,
            advertiserLocations: 0,
            avgQRScans: 720,
            avgEmberPerScan: 55,
            engagement: 91.4,
            isParticipating: false,
            scannerRequired: true
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
                Browse active AR crypto gaming campaigns. Players collect tokens, then visit your location to exchange 
                $Ember for your products/services using QR codes.
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
                                            <div style="color: rgba(255,255,255,0.6);">QR Scans/Month</div>
                                            <div style="font-weight: 700;">${campaign.avgQRScans}</div>
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
                                    <button class="btn btn-secondary" onclick="openScannerApp()">
                                        📱 Scanner
                                    </button>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            ` : ''}
            
            <!-- How The QR Exchange Works -->
            <div class="card" style="background: rgba(34,197,94,0.1); border: 2px solid rgba(34,197,94,0.3); margin-bottom: 30px;">
                <h3 style="color: #22c55e; margin-bottom: 20px; font-size: 1.5rem;">
                    📱 How The $Ember Exchange Works
                </h3>
                
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px; margin-bottom: 20px;">
                    <div style="text-align: center; padding: 15px;">
                        <div style="font-size: 3rem; margin-bottom: 10px;">1️⃣</div>
                        <h4 style="margin-bottom: 8px;">Players Collect</h4>
                        <p style="color: rgba(255,255,255,0.8); font-size: 0.9rem; margin: 0;">
                            Players find $Ember tokens at your location via AR game
                        </p>
                    </div>
                    <div style="text-align: center; padding: 15px;">
                        <div style="font-size: 3rem; margin-bottom: 10px;">2️⃣</div>
                        <h4 style="margin-bottom: 8px;">They Visit You</h4>
                        <p style="color: rgba(255,255,255,0.8); font-size: 0.9rem; margin: 0;">
                            Players come to redeem $Ember for your offers
                        </p>
                    </div>
                    <div style="text-align: center; padding: 15px;">
                        <div style="font-size: 3rem; margin-bottom: 10px;">3️⃣</div>
                        <h4 style="margin-bottom: 8px;">Scan QR Code</h4>
                        <p style="color: rgba(255,255,255,0.8); font-size: 0.9rem; margin: 0;">
                            Use Scanner App to receive their $Ember payment
                        </p>
                    </div>
                    <div style="text-align: center; padding: 15px;">
                        <div style="font-size: 3rem; margin-bottom: 10px;">4️⃣</div>
                        <h4 style="margin-bottom: 8px;">You Get Paid</h4>
                        <p style="color: rgba(255,255,255,0.8); font-size: 0.9rem; margin: 0;">
                            $Ember transfers to your account instantly
                        </p>
                    </div>
                </div>
                
                <div style="padding: 15px; background: rgba(0,0,0,0.3); border-radius: 8px;">
                    <strong style="color: var(--color-primary-gold);">💡 Your Investment:</strong> Monthly location fee only. 
                    No per-transaction fees on $Ember exchanges. Players bring the tokens to you!
                </div>
            </div>
            
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
                            <option value="medium">$500 - $1,200</option>
                            <option value="high">$1,200+</option>
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
                                        <div style="color: rgba(255,255,255,0.6);">Avg QR Scans</div>
                                        <div style="font-weight: 700;">${campaign.avgQRScans}/mo</div>
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
                                <div style="font-size: 0.85rem; color: rgba(255,255,255,0.7); margin-top: 8px;">Coverage: ${campaign.coverage}</div>
                            </div>
                            
                            <div style="padding: 15px; background: rgba(34,197,94,0.1); border: 1px solid rgba(34,197,94,0.3); border-radius: 8px; margin-bottom: 15px;">
                                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
                                    <div>
                                        <div style="font-size: 0.85rem; color: rgba(255,255,255,0.6);">Starting At</div>
                                        <div style="font-size: 1.5rem; font-weight: 900; color: var(--color-primary-gold);">
                                            $${campaign.minMonthlyFee}/mo
                                        </div>
                                    </div>
                                    <div style="text-align: right;">
                                        <div style="font-size: 0.85rem; color: rgba(255,255,255,0.6);">Est. $Ember/Month</div>
                                        <div style="font-size: 1.3rem; font-weight: 900; color: #22c55e;">
                                            ${(campaign.avgQRScans * campaign.avgEmberPerScan).toLocaleString()}
                                        </div>
                                    </div>
                                </div>
                                <div style="font-size: 0.8rem; color: rgba(255,255,255,0.7); padding-top: 10px; border-top: 1px solid rgba(255,255,255,0.1);">
                                    📱 Includes Scanner App access
                                </div>
                            </div>
                            
                            <button class="btn btn-primary" onclick="joinCampaign('${campaign.id}')" style="width: 100%;">
                                📍 Join This Campaign
                            </button>
                        </div>
                    `).join('')}
                </div>
            </div>
            
            <!-- Pricing Tiers -->
            <div class="dashboard-section">
                <h3 style="font-size: 1.5rem; color: var(--color-primary-gold); margin-bottom: 20px;">
                    💳 Location Placement Tiers
                </h3>
                
                <div class="apps-grid">
                    <div class="card">
                        <h4 style="color: var(--color-primary-orange); margin-bottom: 10px;">Bronze Tier</h4>
                        <div style="font-size: 2rem; font-weight: 900; color: var(--color-primary-gold); margin-bottom: 15px;">
                            $200<span style="font-size: 1rem; color: rgba(255,255,255,0.6);">/month</span>
                        </div>
                        <ul style="list-style: none; padding: 0; margin: 0;">
                            <li style="padding: 8px 0; border-bottom: 1px solid rgba(255,255,255,0.1);">✓ Basic visibility</li>
                            <li style="padding: 8px 0; border-bottom: 1px solid rgba(255,255,255,0.1);">✓ Standard placement</li>
                            <li style="padding: 8px 0; border-bottom: 1px solid rgba(255,255,255,0.1);">✓ Monthly reporting</li>
                            <li style="padding: 8px 0;">✓ Scanner App access</li>
                        </ul>
                    </div>
                    
                    <div class="card" style="border: 2px solid var(--color-primary-gold);">
                        <div style="background: var(--gradient-ember); padding: 4px 12px; border-radius: 6px; display: inline-block; margin-bottom: 10px; font-size: 0.8rem; font-weight: 700;">
                            MOST POPULAR
                        </div>
                        <h4 style="color: var(--color-primary-orange); margin-bottom: 10px;">Silver Tier</h4>
                        <div style="font-size: 2rem; font-weight: 900; color: var(--color-primary-gold); margin-bottom: 15px;">
                            $500<span style="font-size: 1rem; color: rgba(255,255,255,0.6);">/month</span>
                        </div>
                        <ul style="list-style: none; padding: 0; margin: 0;">
                            <li style="padding: 8px 0; border-bottom: 1px solid rgba(255,255,255,0.1);">✓ Enhanced visibility</li>
                            <li style="padding: 8px 0; border-bottom: 1px solid rgba(255,255,255,0.1);">✓ Priority placement</li>
                            <li style="padding: 8px 0; border-bottom: 1px solid rgba(255,255,255,0.1);">✓ Weekly reporting</li>
                            <li style="padding: 8px 0; border-bottom: 1px solid rgba(255,255,255,0.1);">✓ Custom branding</li>
                            <li style="padding: 8px 0; border-bottom: 1px solid rgba(255,255,255,0.1);">✓ Scanner App access</li>
                            <li style="padding: 8px 0;">✓ QR analytics</li>
                        </ul>
                    </div>
                    
                    <div class="card">
                        <h4 style="color: var(--color-primary-orange); margin-bottom: 10px;">Gold Tier</h4>
                        <div style="font-size: 2rem; font-weight: 900; color: var(--color-primary-gold); margin-bottom: 15px;">
                            $1,200<span style="font-size: 1rem; color: rgba(255,255,255,0.6);">/month</span>
                        </div>
                        <ul style="list-style: none; padding: 0; margin: 0;">
                            <li style="padding: 8px 0; border-bottom: 1px solid rgba(255,255,255,0.1);">✓ Featured placement</li>
                            <li style="padding: 8px 0; border-bottom: 1px solid rgba(255,255,255,0.1);">✓ Exclusive territory</li>
                            <li style="padding: 8px 0; border-bottom: 1px solid rgba(255,255,255,0.1);">✓ Daily reporting</li>
                            <li style="padding: 8px 0; border-bottom: 1px solid rgba(255,255,255,0.1);">✓ Premium support</li>
                            <li style="padding: 8px 0; border-bottom: 1px solid rgba(255,255,255,0.1);">✓ Scanner App access</li>
                            <li style="padding: 8px 0;">✓ Real-time QR tracking</li>
                        </ul>
                    </div>
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
                            Browse campaigns that match your demographics and coverage area. Pay a simple monthly location fee.
                        </p>
                    </div>
                    
                    <div style="padding: 20px; background: rgba(0,0,0,0.2); border-radius: 12px;">
                        <div style="font-size: 2rem; margin-bottom: 10px;">2️⃣</div>
                        <h4 style="margin-bottom: 10px;">Setup Your Offers</h4>
                        <p style="color: rgba(255,255,255,0.7); margin: 0;">
                            Define what players can exchange $Ember for: discounts, free items, special offers. You set the value.
                        </p>
                    </div>
                    
                    <div style="padding: 20px; background: rgba(0,0,0,0.2); border-radius: 12px;">
                        <div style="font-size: 2rem; margin-bottom: 10px;">3️⃣</div>
                        <h4 style="margin-bottom: 10px;">Get Scanner App</h4>
                        <p style="color: rgba(255,255,255,0.7); margin: 0;">
                            Download the free Scanner App. Use it to scan player QR codes and receive $Ember instantly.
                        </p>
                    </div>
                    
                    <div style="padding: 20px; background: rgba(0,0,0,0.2); border-radius: 12px;">
                        <div style="font-size: 2rem; margin-bottom: 10px;">4️⃣</div>
                        <h4 style="margin-bottom: 10px;">Track & Optimize</h4>
                        <p style="color: rgba(255,255,255,0.7); margin: 0;">
                            Monitor GPS-verified visits, QR scans, and $Ember exchanges. Adjust offers to maximize ROI.
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
    
    const estimatedEmber = campaign.avgQRScans * campaign.avgEmberPerScan;
    const estimatedValue = (estimatedEmber * 0.0035).toFixed(2);
    
    const confirmMsg = `Join "${campaign.name}"?\n\n` +
        `📍 Coverage: ${campaign.coverage}\n` +
        `👥 Active Players: ${campaign.activePlayers.toLocaleString()}\n` +
        `💰 Starting At: $${campaign.minMonthlyFee}/month\n` +
        `📱 Avg QR Scans: ${campaign.avgQRScans}/month\n` +
        `💎 Est. $Ember Received: ${estimatedEmber.toLocaleString()} ($${estimatedValue} value)\n` +
        `📊 Engagement: ${campaign.engagement}%\n\n` +
        `After joining, you'll:\n` +
        `• Add your location & offers\n` +
        `• Get the Scanner App\n` +
        `• Start receiving $Ember from players\n` +
        `• Track all exchanges in real-time\n\n` +
        `Continue?`;
    
    if (confirm(confirmMsg)) {
        // Mark as participating
        campaign.isParticipating = true;
        campaign.advertiserLocations = 0; // Start with 0 locations
        
        sessionStorage.setItem('selectedCampaign', campaignId);
        
        alert(`✓ Welcome to ${campaign.name}!\n\n` +
            `You've successfully joined the campaign.\n\n` +
            `Next Steps:\n` +
            `1. Add your first location\n` +
            `2. Define your $Ember offers\n` +
            `3. Download the Scanner App\n` +
            `4. Start accepting $Ember from players!\n\n` +
            `Redirecting to campaign setup...`);
        
        // Redirect to campaign control
        if (typeof window.loadCampaignControl === 'function') {
            window.loadCampaignControl(campaignId);
        } else {
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
                    <div class="stat-value">$500</div>
                    <div class="stat-change">Location fees</div>
                </div>
                
                <div class="stat-card">
                    <div class="stat-icon">📱</div>
                    <div class="stat-label">Total QR Scans</div>
                    <div class="stat-value">847</div>
                    <div class="stat-change positive">This month</div>
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
                                <th>QR Scans</th>
                                <th>$Ember Received</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Heritage Square Historic Site</td>
                                <td>$Ember Hunt</td>
                                <td>1</td>
                                <td><span class="tier-badge tier-silver">Silver</span></td>
                                <td>$500</td>
                                <td>847</td>
                                <td>42,350</td>
                                <td><span class="badge badge-success">Active</span></td>
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
