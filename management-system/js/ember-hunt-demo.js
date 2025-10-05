/* ============================================
   VAULT PHOENIX MANAGEMENT SYSTEM
   $Ember Hunt Demo - Advertisement Token Stop Model
   ============================================ */

// ============================================
// EMBER HUNT LIVE DATA
// ============================================

const EmberHuntDemo = {
    appStatus: 'live',
    appName: '$Ember Hunt',
    
    // Campaign Manager's Token Locations (they manage these)
    campaignTokenLocations: [
        {
            id: 'cm-token-001',
            name: 'Downtown Phoenix Plaza',
            address: '100 N Central Ave, Phoenix, AZ 85004',
            lat: 33.4495,
            lng: -112.0730,
            tokensAllocated: 10000,
            tokensRemaining: 8750,
            tokensCollected: 1250,
            tokenAmount: 75,
            status: 'active',
            message: 'Downtown Phoenix welcomes you! Collect your tokens and discover local businesses.',
            sponsorName: 'Downtown Phoenix Inc.',
            sponsorInfo: 'Building a vibrant urban core',
            ctaButtons: [
                { text: 'Explore Downtown', url: 'https://downtownphoenix.com' },
                { text: 'Events Calendar', url: 'https://downtownphoenix.com/events' }
            ],
            addedBy: 'Campaign Manager',
            campaign: '$Ember Hunt',
            hasAdvertisement: false // Campaign manager locations don't have advertiser ads
        }
    ],
    
    // Advertiser Token Locations (they pay monthly fee + buy tokens)
    advertiserTokenLocations: [
        {
            id: 'adv-token-001',
            name: 'Heritage Square Historic Site',
            address: '115 N 6th St, Phoenix, AZ 85004',
            lat: 33.4484,
            lng: -112.0740,
            
            // Token allocation
            tokensAllocated: 5000,      // Advertiser purchased this many
            tokensRemaining: 3250,       // Still available for collection
            tokensCollected: 1750,       // Already collected by players
            tokenAmount: 50,             // Amount per collection
            
            status: 'active',
            
            // Advertisement that shows after collection
            advertisement: {
                title: 'Explore Phoenix History!',
                description: 'Visit Heritage Square Historic Site and redeem your $Ember for 10% off museum tours, gift shop purchases, or get a free guided tour souvenir! We accept $Ember redemptions at our front desk.',
                imageUrl: 'images/heritage-square-ad.jpg',
                offer: '10% Off Tours & Gift Shop OR Free Souvenir',
                offerEmberValue: 50,      // Cost to redeem in $Ember
                ctaText: 'Visit Us & Redeem',
                ctaUrl: 'https://heritagesquarephx.org'
            },
            
            // Redemption tracking
            redemptions: {
                total: 65,
                thisMonth: 65,
                averageTokens: 50,
                totalTokensRedeemed: 3250,  // Tokens advertiser got back
                conversionRate: 7.8         // 7.8% of collectors redeem
            },
            
            // Advertiser info
            addedBy: 'Advertiser',
            advertiserName: 'Heritage Square Historic Site',
            advertiserEmail: 'marketing@heritagesquare.org',
            campaign: '$Ember Hunt',
            tier: 'silver',
            monthlyFee: 500,
            tokensPurchased: 5000,
            tokenCost: 17.50,           // $5000 tokens × $0.0035
            totalMonthlyInvestment: 517.50,
            
            hasAdvertisement: true,
            scannerActive: true,
            
            addedDate: new Date('2024-09-01')
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
            amount: 50, 
            location: 'Heritage Square Historic Site', 
            timestamp: new Date(Date.now() - 2000),
            hasAd: true
        },
        { 
            type: 'redemption', 
            player: 'B23', 
            amount: 50, 
            location: 'Heritage Square Historic Site',
            timestamp: new Date(Date.now() - 47000),
            advertiser: 'Heritage Square Historic Site'
        },
        { 
            type: 'collection', 
            player: 'C89', 
            amount: 75, 
            location: 'Downtown Phoenix Plaza', 
            timestamp: new Date(Date.now() - 120000),
            hasAd: false
        }
    ],
    
    performance: {
        playersNow: 47,
        tokensActive: 156,
        collectionsToday: 278,
        redemptionsToday: 22,
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
    const totalAdvertisers = 1;
    
    return `
        <div class="dashboard-section">
            <h2 class="section-title">🗺️ $Ember Hunt - Campaign Control & Token Locations</h2>
            
            <!-- Stats Overview -->
            <div class="hero-stats">
                <div class="stat-card">
                    <div class="stat-icon">📍</div>
                    <div class="stat-label">Campaign Token Stops</div>
                    <div class="stat-value">${cmLocations.length}</div>
                    <div class="stat-change">Your locations</div>
                </div>
                
                <div class="stat-card">
                    <div class="stat-icon">🏢</div>
                    <div class="stat-label">Advertiser Token Stops</div>
                    <div class="stat-value">${advLocations.length}</div>
                    <div class="stat-change">${totalAdvertisers} ${totalAdvertisers === 1 ? 'advertiser' : 'advertisers'}</div>
                </div>
                
                <div class="stat-card">
                    <div class="stat-icon">💎</div>
                    <div class="stat-label">Total Tokens Active</div>
                    <div class="stat-value">${allLocations.reduce((sum, loc) => sum + loc.tokensRemaining, 0).toLocaleString()}</div>
                    <div class="stat-change">All locations combined</div>
                </div>
                
                <div class="stat-card">
                    <div class="stat-icon">🎁</div>
                    <div class="stat-label">Redemptions Today</div>
                    <div class="stat-value">${EmberHuntDemo.performance.redemptionsToday}</div>
                    <div class="stat-change positive">Advertisers receiving tokens</div>
                </div>
            </div>
        </div>
        
        <!-- Ecosystem Overview -->
        <div class="dashboard-section">
            <div class="card" style="background: rgba(240,165,0,0.1); border: 2px solid rgba(240,165,0,0.3);">
                <h3 style="color: var(--color-primary-gold); margin-bottom: 20px; font-size: 1.5rem;">
                    💡 How The $Ember Advertisement Ecosystem Works
                </h3>
                
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 15px;">
                    <div style="padding: 15px; background: rgba(0,0,0,0.3); border-radius: 12px;">
                        <div style="font-size: 2rem; margin-bottom: 8px;">1️⃣</div>
                        <h4 style="font-size: 1rem; margin-bottom: 8px;">Advertisers Join</h4>
                        <p style="color: rgba(255,255,255,0.8); font-size: 0.85rem; margin: 0; line-height: 1.5;">
                            Pay monthly location fee + purchase $Ember tokens to fund stops
                        </p>
                    </div>
                    <div style="padding: 15px; background: rgba(0,0,0,0.3); border-radius: 12px;">
                        <div style="font-size: 2rem; margin-bottom: 8px;">2️⃣</div>
                        <h4 style="font-size: 1rem; margin-bottom: 8px;">Create Ad Stop</h4>
                        <p style="color: rgba(255,255,255,0.8); font-size: 0.85rem; margin: 0; line-height: 1.5;">
                            Add location with advertisement content and token allocation
                        </p>
                    </div>
                    <div style="padding: 15px; background: rgba(0,0,0,0.3); border-radius: 12px;">
                        <div style="font-size: 2rem; margin-bottom: 8px;">3️⃣</div>
                        <h4 style="font-size: 1rem; margin-bottom: 8px;">Players Collect</h4>
                        <p style="color: rgba(255,255,255,0.8); font-size: 0.85rem; margin: 0; line-height: 1.5;">
                            Visit location in AR, collect tokens, see advertisement
                        </p>
                    </div>
                    <div style="padding: 15px; background: rgba(0,0,0,0.3); border-radius: 12px;">
                        <div style="font-size: 2rem; margin-bottom: 8px;">4️⃣</div>
                        <h4 style="font-size: 1rem; margin-bottom: 8px;">Cash Out or Redeem</h4>
                        <p style="color: rgba(255,255,255,0.8); font-size: 0.85rem; margin: 0; line-height: 1.5;">
                            Players cash out to Coinbase OR visit advertiser to redeem offer
                        </p>
                    </div>
                    <div style="padding: 15px; background: rgba(0,0,0,0.3); border-radius: 12px;">
                        <div style="font-size: 2rem; margin-bottom: 8px;">5️⃣</div>
                        <h4 style="font-size: 1rem; margin-bottom: 8px;">Scan & Recover</h4>
                        <p style="color: rgba(255,255,255,0.8); font-size: 0.85rem; margin: 0; line-height: 1.5;">
                            Advertiser scans player QR → receives $Ember back → gives offer
                        </p>
                    </div>
                    <div style="padding: 15px; background: rgba(0,0,0,0.3); border-radius: 12px;">
                        <div style="font-size: 2rem; margin-bottom: 8px;">6️⃣</div>
                        <h4 style="font-size: 1rem; margin-bottom: 8px;">Circular Economy</h4>
                        <p style="color: rgba(255,255,255,0.8); font-size: 0.85rem; margin: 0; line-height: 1.5;">
                            Recovered tokens can fund new stops or be held/sold
                        </p>
                    </div>
                </div>
            </div>
        </div>
        
        <!-- Add Token Location -->
        <div class="dashboard-section">
            <h3 style="font-size: 1.5rem; color: var(--color-primary-gold); margin-bottom: 20px;">
                ➕ Add Campaign Token Locations (No Advertisements)
            </h3>
            
            <div class="card" style="background: rgba(59,130,246,0.1); border: 2px solid rgba(59,130,246,0.3); margin-bottom: 20px;">
                <h4 style="color: #3b82f6; margin-bottom: 12px;">ℹ️ Campaign Manager Locations vs Advertiser Locations</h4>
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
                    <div>
                        <h5 style="color: var(--color-primary-gold); margin-bottom: 10px;">Your Locations:</h5>
                        <ul style="list-style: none; padding: 0; margin: 0; font-size: 0.9rem; line-height: 1.7;">
                            <li>✓ No monthly fees</li>
                            <li>✓ Use your campaign token pool</li>
                            <li>✓ No advertisements attached</li>
                            <li>✓ General campaign messaging</li>
                        </ul>
                    </div>
                    <div>
                        <h5 style="color: var(--color-primary-gold); margin-bottom: 10px;">Advertiser Locations:</h5>
                        <ul style="list-style: none; padding: 0; margin: 0; font-size: 0.9rem; line-height: 1.7;">
                            <li>✓ Pay monthly location fee</li>
                            <li>✓ Purchase their own $Ember tokens</li>
                            <li>✓ Include advertisement content</li>
                            <li>✓ Recover tokens via redemptions</li>
                        </ul>
                    </div>
                </div>
            </div>
            
            <!-- Bulk Upload -->
            <div class="card" style="margin-bottom: 20px;">
                <h4 style="color: var(--color-primary-gold); margin-bottom: 15px;">📤 Bulk Upload (CSV)</h4>
                
                <p style="color: rgba(255,255,255,0.8); margin-bottom: 15px;">
                    Upload multiple campaign token locations at once with sponsor messages and call-to-action buttons.
                </p>
                
                <div style="background: rgba(0,0,0,0.3); border-radius: 12px; padding: 15px; margin-bottom: 15px;">
                    <h5 style="margin-bottom: 10px;">CSV Format:</h5>
                    <div style="font-family: monospace; background: rgba(0,0,0,0.5); padding: 12px; border-radius: 8px; overflow-x: auto; font-size: 0.85rem;">
                        <div style="color: #22c55e;">name,address,city,state,zip,token_amount,message,sponsor_name,sponsor_info,cta1_text,cta1_url,cta2_text,cta2_url</div>
                        <div style="color: rgba(255,255,255,0.7);">Downtown Plaza,100 N Central,Phoenix,AZ,85004,75,Welcome!,Downtown Inc,Since 2010,Visit,https://example.com,Events,https://example.com/events</div>
                    </div>
                </div>
                
                <div style="display: flex; gap: 10px; flex-wrap: wrap;">
                    <a href="data:text/csv;charset=utf-8,name,address,city,state,zip,token_amount,message,sponsor_name,sponsor_info,cta1_text,cta1_url,cta2_text,cta2_url%0AExample Location,123 Main St,Phoenix,AZ,85001,75,Welcome message,Sponsor Name,Sponsor info,Button 1,https://example.com,Button 2,https://example.com/page" 
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
                    📍 Add Single Campaign Token Location
                </h4>
                
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-bottom: 15px;">
                    <div class="form-group">
                        <label class="form-label">Location Name *</label>
                        <input type="text" class="form-input" id="cmLocationName" placeholder="Downtown Phoenix Plaza">
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label">Token Amount per Collection *</label>
                        <input type="number" class="form-input" id="cmTokenAmount" value="75" min="50" step="25">
                    </div>
                </div>
                
                <div class="form-group">
                    <label class="form-label">Address *</label>
                    <input type="text" class="form-input" id="cmAddress" placeholder="100 N Central Ave, Phoenix, AZ 85004">
                    <div class="form-hint">Auto-geocoded to latitude/longitude</div>
                </div>
                
                <div class="form-group">
                    <label class="form-label">Collection Message *</label>
                    <textarea class="form-input" id="cmMessage" rows="2" placeholder="Welcome! Collect your $Ember tokens here..."></textarea>
                    <div class="form-hint">Players see this message after collecting tokens (no advertisement)</div>
                </div>
                
                <div style="background: rgba(59,130,246,0.1); border: 1px solid rgba(59,130,246,0.3); border-radius: 12px; padding: 20px; margin: 20px 0;">
                    <h5 style="color: #3b82f6; margin-bottom: 15px;">📢 Sponsor Information (Optional)</h5>
                    
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
                        <div class="form-group">
                            <label class="form-label">Sponsor Name</label>
                            <input type="text" class="form-input" id="cmSponsorName" placeholder="Downtown Phoenix Inc">
                        </div>
                        
                        <div class="form-group">
                            <label class="form-label">Sponsor Tagline</label>
                            <input type="text" class="form-input" id="cmSponsorInfo" placeholder="Building a vibrant urban core">
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
                    💎 Add Campaign Token Location
                </button>
            </div>
        </div>
        
        <!-- Live Map -->
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
                        📍 Campaign Locations (${cmLocations.length})
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
                            <span>Campaign Locations (No Ads)</span>
                        </div>
                        <div style="display: flex; align-items: center; gap: 8px;">
                            <span style="width: 10px; height: 10px; background: #f0a500; border-radius: 50%; display: inline-block;"></span>
                            <span>Advertiser Locations (With Ads)</span>
                        </div>
                        <div style="display: flex; align-items: center; gap: 8px;">
                            <span style="width: 10px; height: 10px; background: #22c55e; border-radius: 50%; display: inline-block;"></span>
                            <span>Active Players</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        <!-- My Campaign Token Locations List -->
        <div class="dashboard-section">
            <h3 style="font-size: 1.5rem; color: var(--color-primary-gold); margin-bottom: 20px;">
                📍 My Campaign Token Locations (${cmLocations.length})
            </h3>
            
            ${cmLocations.map(loc => `
                <div class="card" style="margin-bottom: 15px; border: 2px solid rgba(59,130,246,0.5);">
                    <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 15px; flex-wrap: wrap; gap: 15px;">
                        <div>
                            <h4 style="color: #3b82f6; margin-bottom: 5px;">${loc.name}</h4>
                            <div style="color: rgba(255,255,255,0.6); font-size: 0.9rem;">${loc.address}</div>
                            <div style="color: rgba(255,255,255,0.5); font-size: 0.85rem; margin-top: 3px;">Campaign Location (No Advertisement)</div>
                        </div>
                        <span class="badge badge-success">
                            <span class="status-indicator status-live"></span>
                            ${loc.status.toUpperCase()}
                        </span>
                    </div>
                    
                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 15px; margin-bottom: 15px;">
                        <div>
                            <div style="font-size: 0.85rem; color: rgba(255,255,255,0.6);">Tokens Allocated</div>
                            <div style="font-size: 1.5rem; font-weight: 900; color: #3b82f6;">${loc.tokensAllocated.toLocaleString()}</div>
                        </div>
                        <div>
                            <div style="font-size: 0.85rem; color: rgba(255,255,255,0.6);">Remaining</div>
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
                        <button class="btn btn-outline" onclick="editCMLocation('${loc.id}')">Edit</button>
                        <button class="btn btn-secondary" onclick="refillTokens('${loc.id}')">Add More Tokens</button>
                        <button class="btn" onclick="viewLocationAnalytics('${loc.id}')" style="background: rgba(34,197,94,0.3); border: 1px solid #22c55e;">Analytics</button>
                    </div>
                </div>
            `).join('')}
        </div>
        
        <!-- Advertiser Locations List -->
        <div class="dashboard-section">
            <h3 style="font-size: 1.5rem; color: var(--color-primary-gold); margin-bottom: 20px;">
                🏢 Advertiser Token Locations with Advertisements (${advLocations.length})
            </h3>
            
            ${advLocations.map(loc => `
                <div class="card" style="margin-bottom: 15px; border-color: rgba(240,165,0,0.5);">
                    <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 15px; flex-wrap: wrap; gap: 15px;">
                        <div>
                            <h4 style="color: #f0a500; margin-bottom: 5px;">${loc.name}</h4>
                            <div style="color: rgba(255,255,255,0.6); font-size: 0.9rem;">${loc.address}</div>
                            <div style="color: rgba(255,255,255,0.5); font-size: 0.85rem; margin-top: 3px;">
                                By: ${loc.advertiserName} • ${loc.tier} Tier ($${loc.monthlyFee}/mo)
                            </div>
                        </div>
                        <div style="text-align: right;">
                            <span class="tier-badge tier-${loc.tier}">${loc.tier}</span>
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
                            <div style="font-size: 0.85rem; color: rgba(255,255,255,0.6);">Tokens Purchased</div>
                            <div style="font-size: 1.5rem; font-weight: 900; color: #f0a500;">${loc.tokensPurchased.toLocaleString()}</div>
                        </div>
                        <div>
                            <div style="font-size: 0.85rem; color: rgba(255,255,255,0.6);">Remaining</div>
                            <div style="font-size: 1.5rem; font-weight: 900; color: var(--color-primary-gold);">${loc.tokensRemaining.toLocaleString()}</div>
                        </div>
                        <div>
                            <div style="font-size: 0.85rem; color: rgba(255,255,255,0.6);">Redeemed Back</div>
                            <div style="font-size: 1.5rem; font-weight: 900; color: #22c55e;">${loc.redemptions.totalTokensRedeemed.toLocaleString()}</div>
                        </div>
                        <div>
                            <div style="font-size: 0.85rem; color: rgba(255,255,255,0.6);">Redemption Rate</div>
                            <div style="font-size: 1.5rem; font-weight: 900; color: #22c55e;">${loc.redemptions.conversionRate}%</div>
                        </div>
                    </div>
                    
                    ${loc.advertisement ? `
                        <div style="background: rgba(240,165,0,0.15); border: 2px solid rgba(240,165,0,0.4); border-radius: 12px; padding: 15px; margin-bottom: 15px;">
                            <h5 style="color: var(--color-primary-gold); margin-bottom: 10px; display: flex; align-items: center; gap: 8px;">
                                <span>📢</span> Advertisement Players See After Collection:
                            </h5>
                            <div style="background: rgba(0,0,0,0.3); border-radius: 8px; padding: 15px;">
                                <h4 style="color: #f0a500; margin-bottom: 8px; font-size: 1.1rem;">${loc.advertisement.title}</h4>
                                <p style="color: rgba(255,255,255,0.9); margin-bottom: 12px; line-height: 1.5;">
                                    ${loc.advertisement.description}
                                </p>
                                <div style="padding: 10px; background: rgba(34,197,94,0.2); border: 1px solid rgba(34,197,94,0.4); border-radius: 8px; margin-bottom: 10px;">
                                    <div style="font-size: 0.85rem; color: rgba(255,255,255,0.7); margin-bottom: 3px;">Redemption Offer:</div>
                                    <div style="font-weight: 700; color: #22c55e;">${loc.advertisement.offer}</div>
                                    <div style="font-size: 0.85rem; color: rgba(255,255,255,0.6); margin-top: 3px;">
                                        Cost: ${loc.advertisement.offerEmberValue} $Ember
                                    </div>
                                </div>
                                ${loc.advertisement.ctaUrl ? `
                                    <a href="${loc.advertisement.ctaUrl}" target="_blank" class="btn btn-small btn-secondary">
                                        ${loc.advertisement.ctaText || 'Learn More'}
                                    </a>
                                ` : ''}
                            </div>
                        </div>
                    ` : ''}
                    
                    <div style="background: rgba(34,197,94,0.1); border: 1px solid rgba(34,197,94,0.3); border-radius: 8px; padding: 15px;">
                        <h5 style="color: #22c55e; margin-bottom: 10px;">Redemption Stats:</h5>
                        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 10px; font-size: 0.9rem;">
                            <div>
                                <div style="color: rgba(255,255,255,0.6);">Total Redemptions:</div>
                                <div style="font-weight: 700;">${loc.redemptions.total}</div>
                            </div>
                            <div>
                                <div style="color: rgba(255,255,255,0.6);">This Month:</div>
                                <div style="font-weight: 700;">${loc.redemptions.thisMonth}</div>
                            </div>
                            <div>
                                <div style="color: rgba(255,255,255,0.6);">Avg Tokens/Redemption:</div>
                                <div style="font-weight: 700;">${loc.redemptions.averageTokens}</div>
                            </div>
                            <div>
                                <div style="color: rgba(255,255,255,0.6);">Conversion Rate:</div>
                                <div style="font-weight: 700; color: #22c55e;">${loc.redemptions.conversionRate}%</div>
                            </div>
                        </div>
                    </div>
                    
                    <div style="margin-top: 15px;">
                        <button class="btn btn-outline" onclick="viewLocationAnalytics('${loc.id}')">View Full Analytics</button>
                    </div>
                </div>
            `).join('')}
            
            ${advLocations.length === 0 ? `
                <div class="card" style="text-align: center; padding: 40px;">
                    <div style="font-size: 3rem; margin-bottom: 15px;">🏢</div>
                    <h4 style="margin-bottom: 10px;">No Advertiser Locations Yet</h4>
                    <p style="color: rgba(255,255,255,0.7); margin-bottom: 20px;">
                        Advertisers can add token stops with advertisements to your campaign from the marketplace.
                    </p>
                </div>
            ` : ''}
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
                
                // Add Campaign Manager locations (blue)
                ${JSON.stringify(EmberHuntDemo.campaignTokenLocations)}.forEach(location => {
                    const marker = new google.maps.Marker({
                        position: { lat: location.lat, lng: location.lng },
                        map: campaignTokenMapInstance,
                        title: location.name,
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
                            <h4 style="margin: 0 0 10px 0; color: #3b82f6;">📍 \${location.name}</h4>
                            <p style="margin: 5px 0;"><strong>Type:</strong> Campaign Location</p>
                            <p style="margin: 5px 0;"><strong>Tokens:</strong> \${location.tokensRemaining.toLocaleString()} remaining</p>
                            <p style="margin: 5px 0;"><strong>Amount:</strong> \${location.tokenAmount} per collection</p>
                            <p style="margin: 5px 0;"><strong>Advertisement:</strong> None</p>
                        </div>
                    \`;
                    
                    const infoWindow = new google.maps.InfoWindow({ content: infoContent });
                    marker.addListener('click', () => infoWindow.open(campaignTokenMapInstance, marker));
                    cmMarkers.push(marker);
                });
                
                // Add Advertiser locations (gold)
                ${JSON.stringify(EmberHuntDemo.advertiserTokenLocations)}.forEach(location => {
                    const marker = new google.maps.Marker({
                        position: { lat: location.lat, lng: location.lng },
                        map: campaignTokenMapInstance,
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
                    
                    const infoContent = \`
                        <div style="color: #000; padding: 10px; max-width: 300px;">
                            <h4 style="margin: 0 0 10px 0; color: #f0a500;">🏢 \${location.name}</h4>
                            <p style="margin: 5px 0;"><strong>Type:</strong> Advertiser Location</p>
                            <p style="margin: 5px 0;"><strong>Advertiser:</strong> \${location.advertiserName}</p>
                            <p style="margin: 5px 0;"><strong>Tier:</strong> \${location.tier}</p>
                            <p style="margin: 5px 0;"><strong>Tokens:</strong> \${location.tokensRemaining.toLocaleString()} remaining</p>
                            <p style="margin: 5px 0;"><strong>Redeemed:</strong> \${location.redemptions.totalTokensRedeemed.toLocaleString()}</p>
                            <p style="margin: 5px 0;"><strong>Advertisement:</strong> Yes</p>
                        </div>
                    \`;
                    
                    const infoWindow = new google.maps.InfoWindow({ content: infoContent });
                    marker.addListener('click', () => infoWindow.open(campaignTokenMapInstance, marker));
                    advMarkers.push(marker);
                });
                
                // Add Players (green)
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
                tokenAmount: parseInt(parts[5]) || 75,
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
            `• ${loc.name} - ${loc.tokenAmount} tokens/collection`
        ).join('\n');
        
        if (confirm(`📤 Bulk Upload Preview\n\n${locations.length} location(s):\n\n${preview}\n\nContinue?`)) {
            alert(`✓ Upload Successful!\n\n${locations.length} campaign token location(s) added.`);
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
    const tokenAmount = parseInt(document.getElementById('cmTokenAmount')?.value) || 75;
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
    
    let summary = `✓ Campaign Token Location Added!\n\n📍 ${name}\n${address}\n💎 ${tokenAmount} tokens per collection\n\n"${message}"`;
    
    if (sponsorName) {
        summary += `\n\n📢 Sponsor: ${sponsorName}`;
        if (cta1Text) summary += `\n• CTA: "${cta1Text}"`;
    }
    
    summary += `\n\n⚠️ Note: This is a campaign location with NO advertiser advertisement.`;
    
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
    alert(`Location Analytics\n\nThis would show:\n• Total collections\n• Unique visitors\n• Peak collection times\n• Player demographics\n• For advertiser locations: Redemption stats`);
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
