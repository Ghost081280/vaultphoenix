/* ============================================
   VAULT PHOENIX MANAGEMENT SYSTEM
   Campaign Marketplace - Advertisement Token Model
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
            avgCollectionsPerMonth: 175,
            avgRedemptionRate: 7.8,
            engagement: 87.3,
            isParticipating: true,
            
            // Token requirements
            minTokensPerStop: 5000,
            recommendedTokens: 10000,
            tokensPerCollection: 50,
            
            // Advertisement requirements
            requiresAdvertisement: true,
            adSpecs: {
                titleMaxLength: 60,
                descriptionMaxLength: 200,
                imageRequired: true,
                offerRequired: true
            }
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
            avgCollectionsPerMonth: 140,
            avgRedemptionRate: 6.5,
            engagement: 82.1,
            isParticipating: false,
            
            minTokensPerStop: 5000,
            recommendedTokens: 10000,
            tokensPerCollection: 50,
            
            requiresAdvertisement: true,
            adSpecs: {
                titleMaxLength: 60,
                descriptionMaxLength: 200,
                imageRequired: true,
                offerRequired: true
            }
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
            avgCollectionsPerMonth: 210,
            avgRedemptionRate: 9.2,
            engagement: 91.4,
            isParticipating: false,
            
            minTokensPerStop: 10000,
            recommendedTokens: 20000,
            tokensPerCollection: 75,
            
            requiresAdvertisement: true,
            adSpecs: {
                titleMaxLength: 60,
                descriptionMaxLength: 200,
                imageRequired: true,
                offerRequired: true
            }
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
                Browse active AR crypto gaming campaigns. Purchase $Ember tokens, fund token stops with your 
                advertisements, and receive tokens back when players redeem at your location.
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
                                            <div style="color: rgba(255,255,255,0.6);">My Token Stops</div>
                                            <div style="font-weight: 700; color: var(--color-primary-gold);">${campaign.advertiserLocations}</div>
                                        </div>
                                        <div>
                                            <div style="color: rgba(255,255,255,0.6);">Total Locations</div>
                                            <div style="font-weight: 700;">${campaign.totalLocations}</div>
                                        </div>
                                        <div>
                                            <div style="color: rgba(255,255,255,0.6);">Collections/Month</div>
                                            <div style="font-weight: 700;">${campaign.avgCollectionsPerMonth}</div>
                                        </div>
                                        <div>
                                            <div style="color: rgba(255,255,255,0.6);">Redemption Rate</div>
                                            <div style="font-weight: 700; color: #22c55e;">${campaign.avgRedemptionRate}%</div>
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
            
            <!-- How The Advertisement Token System Works -->
            <div class="card" style="background: rgba(34,197,94,0.1); border: 2px solid rgba(34,197,94,0.3); margin-bottom: 30px;">
                <h3 style="color: #22c55e; margin-bottom: 20px; font-size: 1.5rem;">
                    💡 How The $Ember Advertisement System Works
                </h3>
                
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px; margin-bottom: 20px;">
                    <div style="text-align: center; padding: 15px;">
                        <div style="font-size: 3rem; margin-bottom: 10px;">1️⃣</div>
                        <h4 style="margin-bottom: 8px;">Buy $Ember</h4>
                        <p style="color: rgba(255,255,255,0.8); font-size: 0.9rem; margin: 0;">
                            Purchase $Ember tokens to fund your token stops
                        </p>
                    </div>
                    <div style="text-align: center; padding: 15px;">
                        <div style="font-size: 3rem; margin-bottom: 10px;">2️⃣</div>
                        <h4 style="margin-bottom: 8px;">Create Token Stop</h4>
                        <p style="color: rgba(255,255,255,0.8); font-size: 0.9rem; margin: 0;">
                            Add your location + advertisement to campaign
                        </p>
                    </div>
                    <div style="text-align: center; padding: 15px;">
                        <div style="font-size: 3rem; margin-bottom: 10px;">3️⃣</div>
                        <h4 style="margin-bottom: 8px;">Players Collect</h4>
                        <p style="color: rgba(255,255,255,0.8); font-size: 0.9rem; margin: 0;">
                            Players collect tokens & see your advertisement
                        </p>
                    </div>
                    <div style="text-align: center; padding: 15px;">
                        <div style="font-size: 3rem; margin-bottom: 10px;">4️⃣</div>
                        <h4 style="margin-bottom: 8px;">They Cash Out or Redeem</h4>
                        <p style="color: rgba(255,255,255,0.8); font-size: 0.9rem; margin: 0;">
                            Players cash out to Coinbase OR visit you to redeem
                        </p>
                    </div>
                    <div style="text-align: center; padding: 15px;">
                        <div style="font-size: 3rem; margin-bottom: 10px;">5️⃣</div>
                        <h4 style="margin-bottom: 8px;">Scan & Recover</h4>
                        <p style="color: rgba(255,255,255,0.8); font-size: 0.9rem; margin: 0;">
                            You scan player QR → get $Ember back → give offer
                        </p>
                    </div>
                    <div style="text-align: center; padding: 15px;">
                        <div style="font-size: 3rem; margin-bottom: 10px;">6️⃣</div>
                        <h4 style="margin-bottom: 8px;">Reuse Tokens</h4>
                        <p style="color: rgba(255,255,255,0.8); font-size: 0.9rem; margin: 0;">
                            Recovered tokens can fund new token stops!
                        </p>
                    </div>
                </div>
                
                <div style="padding: 15px; background: rgba(0,0,0,0.3); border-radius: 8px;">
                    <strong style="color: var(--color-primary-gold);">💰 Your Investment:</strong>
                    <ul style="margin: 10px 0 0 0; padding-left: 20px; line-height: 1.8;">
                        <li>Monthly location fee (placement in campaign)</li>
                        <li>One-time $Ember token purchase (reusable when redeemed)</li>
                        <li>No per-transaction fees</li>
                        <li>Get tokens back when players redeem</li>
                    </ul>
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
                            <option value="low">$200 - $500/mo</option>
                            <option value="medium">$500 - $1,200/mo</option>
                            <option value="high">$1,200+/mo</option>
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
                    ${availableCampaigns.map(campaign => {
                        const minTokenCost = (campaign.minTokensPerStop * 0.0035).toFixed(2);
                        const recommendedTokenCost = (campaign.recommendedTokens * 0.0035).toFixed(2);
                        const estimatedMonthlyCollections = campaign.avgCollectionsPerMonth * campaign.tokensPerCollection;
                        const estimatedRedemptions = Math.floor(estimatedMonthlyCollections * (campaign.avgRedemptionRate / 100));
                        
                        return `
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
                                            <div style="color: rgba(255,255,255,0.6);">Avg Collections</div>
                                            <div style="font-weight: 700;">${campaign.avgCollectionsPerMonth}/mo</div>
                                        </div>
                                        <div>
                                            <div style="color: rgba(255,255,255,0.6);">Redemption Rate</div>
                                            <div style="font-weight: 700; color: #22c55e;">${campaign.avgRedemptionRate}%</div>
                                        </div>
                                    </div>
                                </div>
                                
                                <div style="padding: 12px; background: rgba(240,165,0,0.1); border: 1px solid rgba(240,165,0,0.3); border-radius: 8px; margin-bottom: 15px;">
                                    <div style="font-size: 0.85rem; color: rgba(255,255,255,0.7); margin-bottom: 5px;">Target Demographics</div>
                                    <div style="font-size: 0.95rem; font-weight: 600;">${campaign.demographics}</div>
                                    <div style="font-size: 0.85rem; color: rgba(255,255,255,0.7); margin-top: 8px;">Coverage: ${campaign.coverage}</div>
                                </div>
                                
                                <!-- Token Requirements -->
                                <div style="padding: 15px; background: rgba(59,130,246,0.1); border: 1px solid rgba(59,130,246,0.3); border-radius: 8px; margin-bottom: 15px;">
                                    <h4 style="color: #3b82f6; margin-bottom: 12px; font-size: 1rem;">💎 Token Stop Requirements:</h4>
                                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; font-size: 0.9rem;">
                                        <div>
                                            <div style="color: rgba(255,255,255,0.6);">Min Tokens/Stop</div>
                                            <div style="font-weight: 700; color: var(--color-primary-gold);">
                                                ${campaign.minTokensPerStop.toLocaleString()}
                                            </div>
                                            <div style="font-size: 0.8rem; color: rgba(255,255,255,0.5);">≈ $${minTokenCost}</div>
                                        </div>
                                        <div>
                                            <div style="color: rgba(255,255,255,0.6);">Recommended</div>
                                            <div style="font-weight: 700; color: var(--color-primary-gold);">
                                                ${campaign.recommendedTokens.toLocaleString()}
                                            </div>
                                            <div style="font-size: 0.8rem; color: rgba(255,255,255,0.5);">≈ $${recommendedTokenCost}</div>
                                        </div>
                                        <div>
                                            <div style="color: rgba(255,255,255,0.6);">Per Collection</div>
                                            <div style="font-weight: 700;">${campaign.tokensPerCollection} $Ember</div>
                                        </div>
                                        <div>
                                            <div style="color: rgba(255,255,255,0.6);">Avg Collections</div>
                                            <div style="font-weight: 700;">${campaign.avgCollectionsPerMonth}/mo</div>
                                        </div>
                                    </div>
                                    
                                    <div style="margin-top: 12px; padding-top: 12px; border-top: 1px solid rgba(255,255,255,0.1);">
                                        <div style="font-size: 0.85rem; color: rgba(255,255,255,0.7); margin-bottom: 5px;">
                                            Est. Monthly Distribution:
                                        </div>
                                        <div style="font-size: 1.1rem; font-weight: 700; color: var(--color-primary-gold);">
                                            ${estimatedMonthlyCollections.toLocaleString()} $Ember
                                        </div>
                                        <div style="font-size: 0.85rem; color: rgba(255,255,255,0.7); margin-top: 5px;">
                                            Est. Redemptions: ${estimatedRedemptions.toLocaleString()} $Ember (${campaign.avgRedemptionRate}%)
                                        </div>
                                    </div>
                                </div>
                                
                                <!-- Pricing -->
                                <div style="padding: 15px; background: rgba(34,197,94,0.1); border: 1px solid rgba(34,197,94,0.3); border-radius: 8px; margin-bottom: 15px;">
                                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
                                        <div>
                                            <div style="font-size: 0.85rem; color: rgba(255,255,255,0.6);">Monthly Location Fee</div>
                                            <div style="font-size: 1.5rem; font-weight: 900; color: var(--color-primary-gold);">
                                                $${campaign.minMonthlyFee}/mo
                                            </div>
                                        </div>
                                        <div style="text-align: right;">
                                            <div style="font-size: 0.85rem; color: rgba(255,255,255,0.6);">+ Token Purchase</div>
                                            <div style="font-size: 1.3rem; font-weight: 900; color: #22c55e;">
                                                One-time
                                            </div>
                                        </div>
                                    </div>
                                    <div style="font-size: 0.8rem; color: rgba(255,255,255,0.7); padding-top: 10px; border-top: 1px solid rgba(255,255,255,0.1);">
                                        📱 Includes Scanner App • Advertisement Display • Token Recovery via Redemptions
                                    </div>
                                </div>
                                
                                <button class="btn btn-primary" onclick="joinCampaign('${campaign.id}')" style="width: 100%;">
                                    📍 Join This Campaign
                                </button>
                            </div>
                        `;
                    }).join('')}
                </div>
            </div>
            
            <!-- Pricing Tiers -->
            <div class="dashboard-section">
                <h3 style="font-size: 1.5rem; color: var(--color-primary-gold); margin-bottom: 20px;">
                    💳 Location Placement Tiers
                </h3>
                
                <div class="apps-grid">
                    ${[
                        { tier: 'Bronze', fee: 200, tokens: 5000, features: ['Basic visibility', 'Standard placement', 'Monthly reporting', 'Scanner app', 'Advertisement display'] },
                        { tier: 'Silver', fee: 500, tokens: 10000, features: ['Enhanced visibility', 'Priority placement', 'Weekly reporting', 'Custom branding', 'Scanner app', 'Advertisement display', 'Analytics dashboard'] },
                        { tier: 'Gold', fee: 1200, tokens: 25000, features: ['Featured placement', 'Exclusive territory', 'Daily reporting', 'Premium support', 'Scanner app', 'Advertisement display', 'Advanced analytics', 'Custom ad design'] }
                    ].map(pricing => `
                        <div class="card">
                            <h3 style="color: var(--color-primary-gold); margin-bottom: 15px;">
                                ${pricing.tier} Tier
                            </h3>
                            <div style="font-size: 2rem; font-weight: 900; color: var(--color-primary-orange); margin-bottom: 10px;">
                                $${pricing.fee}<span style="font-size: 1rem; color: rgba(255,255,255,0.6);">/month</span>
                            </div>
                            <div style="background: rgba(240,165,0,0.15); border: 1px solid rgba(240,165,0,0.4); border-radius: 8px; padding: 12px; margin-bottom: 15px;">
                                <div style="font-size: 0.85rem; color: rgba(255,255,255,0.7); margin-bottom: 5px;">
                                    Min Token Purchase
                                </div>
                                <div style="font-size: 1.3rem; font-weight: 900; color: var(--color-primary-gold);">
                                    ${pricing.tokens.toLocaleString()} $Ember
                                </div>
                                <div style="font-size: 0.8rem; color: rgba(255,255,255,0.6); margin-top: 5px;">
                                    ≈ $${(pricing.tokens * 0.0035).toFixed(2)} one-time
                                </div>
                            </div>
                            <ul style="list-style: none; padding: 0; margin: 0;">
                                ${pricing.features.map(feature => `
                                    <li style="padding: 8px 0; border-bottom: 1px solid rgba(255,255,255,0.1);">
                                        ✓ ${feature}
                                    </li>
                                `).join('')}
                            </ul>
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
                        <h4 style="margin-bottom: 10px;">Choose Campaign & Tier</h4>
                        <p style="color: rgba(255,255,255,0.7); margin: 0;">
                            Browse campaigns that match your demographics. Select your pricing tier based on desired visibility.
                        </p>
                    </div>
                    
                    <div style="padding: 20px; background: rgba(0,0,0,0.2); border-radius: 12px;">
                        <div style="font-size: 2rem; margin-bottom: 10px;">2️⃣</div>
                        <h4 style="margin-bottom: 10px;">Purchase $Ember Tokens</h4>
                        <p style="color: rgba(255,255,255,0.7); margin: 0;">
                            Buy $Ember tokens to fund your token stop. Minimum amounts vary by tier and campaign.
                        </p>
                    </div>
                    
                    <div style="padding: 20px; background: rgba(0,0,0,0.2); border-radius: 12px;">
                        <div style="font-size: 2rem; margin-bottom: 10px;">3️⃣</div>
                        <h4 style="margin-bottom: 10px;">Create Advertisement</h4>
                        <p style="color: rgba(255,255,255,0.7); margin: 0;">
                            Design your ad with title, description, image, and offer details. Players see this after collecting tokens.
                        </p>
                    </div>
                    
                    <div style="padding: 20px; background: rgba(0,0,0,0.2); border-radius: 12px;">
                        <div style="font-size: 2rem; margin-bottom: 10px;">4️⃣</div>
                        <h4 style="margin-bottom: 10px;">Setup Scanner App</h4>
                        <p style="color: rgba(255,255,255,0.7); margin: 0;">
                            Download the Scanner App to your device to redeem tokens when players visit your location.
                        </p>
                    </div>
                    
                    <div style="padding: 20px; background: rgba(0,0,0,0.2); border-radius: 12px;">
                        <div style="font-size: 2rem; margin-bottom: 10px;">5️⃣</div>
                        <h4 style="margin-bottom: 10px;">Players Collect & See Ad</h4>
                        <p style="color: rgba(255,255,255,0.7); margin: 0;">
                            Players visit your GPS location in the AR game, collect tokens, and immediately see your advertisement.
                        </p>
                    </div>
                    
                    <div style="padding: 20px; background: rgba(0,0,0,0.2); border-radius: 12px;">
                        <div style="font-size: 2rem; margin-bottom: 10px;">6️⃣</div>
                        <h4 style="margin-bottom: 10px;">Redeem & Recover</h4>
                        <p style="color: rgba(255,255,255,0.7); margin: 0;">
                            Players visit to redeem. Scan their QR code → receive $Ember back → give them your offer. Reuse tokens!
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
    
    const minTokenCost = (campaign.minTokensPerStop * 0.0035).toFixed(2);
    const recommendedTokenCost = (campaign.recommendedTokens * 0.0035).toFixed(2);
    const estimatedCollections = campaign.avgCollectionsPerMonth * campaign.tokensPerCollection;
    const estimatedRedemptions = Math.floor(estimatedCollections * (campaign.avgRedemptionRate / 100));
    
    const confirmMsg = `Join "${campaign.name}"?\n\n` +
        `📍 Coverage: ${campaign.coverage}\n` +
        `👥 Active Players: ${campaign.activePlayers.toLocaleString()}\n\n` +
        `💰 COSTS:\n` +
        `• Monthly Location Fee: $${campaign.minMonthlyFee}\n` +
        `• Token Purchase (one-time): $${minTokenCost} - $${recommendedTokenCost}\n` +
        `  (${campaign.minTokensPerStop.toLocaleString()} - ${campaign.recommendedTokens.toLocaleString()} $Ember)\n\n` +
        `📊 ESTIMATED MONTHLY:\n` +
        `• Collections: ${campaign.avgCollectionsPerMonth} (${estimatedCollections.toLocaleString()} $Ember distributed)\n` +
        `• Redemptions: ${estimatedRedemptions.toLocaleString()} $Ember (${campaign.avgRedemptionRate}% recovery rate)\n` +
        `• Engagement: ${campaign.engagement}%\n\n` +
        `After joining, you'll:\n` +
        `1. Purchase $Ember tokens\n` +
        `2. Create token stop with advertisement\n` +
        `3. Download Scanner App\n` +
        `4. Start receiving redemptions!\n\n` +
        `Continue?`;
    
    if (confirm(confirmMsg)) {
        campaign.isParticipating = true;
        campaign.advertiserLocations = 0;
        
        sessionStorage.setItem('selectedCampaign', campaignId);
        
        alert(`✓ Welcome to ${campaign.name}!\n\n` +
            `You've successfully joined the campaign.\n\n` +
            `Next Steps:\n` +
            `1. Go to Wallet → Purchase $Ember tokens\n` +
            `2. Go to Campaign Control → Add token stop with advertisement\n` +
            `3. Download Scanner App\n` +
            `4. Start accepting redemptions!\n\n` +
            `Redirecting to wallet to purchase tokens...`);
        
        if (typeof window.loadSection === 'function') {
            window.loadSection('wallet');
        }
    }
}

// Export functions
if (typeof window !== 'undefined') {
    window.MarketplaceData = MarketplaceData;
    window.getMarketplaceContent = getMarketplaceContent;
    window.joinCampaign = joinCampaign;
}
