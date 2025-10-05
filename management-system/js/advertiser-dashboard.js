/* ============================================
   VAULT PHOENIX MANAGEMENT SYSTEM
   Advertiser Dashboard - Advertisement Token Model
   ============================================ */

// ============================================
// ADVERTISER DATA - ADVERTISEMENT TOKEN MODEL
// ============================================

const AdvertiserData = {
    // Advertiser's token balance
    tokenBalance: {
        owned: 12450,           // Total tokens owned
        distributed: 8750,      // Tokens currently in circulation at stops
        redeemed: 3250,         // Tokens received back via redemptions
        available: 3700         // Available to fund new stops (owned - distributed)
    },
    
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
            redemptionsThisMonth: 65,
            tokensRedeemedThisMonth: 3250
        }
    ],
    
    // Advertiser's token stops per campaign
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
                
                // Token stop details
                tokensFunded: 5000,         // Initial tokens allocated
                tokensRemaining: 3250,      // Still available for collection
                tokensCollected: 1750,      // Collected by players
                tokensPerCollection: 50,    // Amount per player visit
                
                // Advertisement content
                advertisement: {
                    title: 'Explore Phoenix History!',
                    description: 'Visit Heritage Square and get 10% off any museum tour or gift shop purchase. Redeem your $Ember tokens at our front desk!',
                    imageUrl: 'images/heritage-square-ad.jpg',
                    offer: '10% Off Museum Tours & Gift Shop',
                    offerValue: 50,         // $Ember cost to redeem
                    ctaText: 'Visit Us & Redeem',
                    websiteUrl: 'https://heritagesquarephx.org'
                },
                
                // Redemption stats
                redemptions: {
                    total: 65,
                    thisMonth: 65,
                    averageTokens: 50,
                    totalTokensRedeemed: 3250,
                    conversionRate: 0.078   // 7.8% of collectors redeem
                },
                
                // Performance metrics
                visitors30d: 847,
                collectionsThisMonth: 175,
                scannerActive: true,
                monthlyFee: 500,
                
                addedDate: new Date('2024-09-01')
            }
        ]
    },
    
    // Scanner app info
    scannerApp: {
        downloaded: true,
        version: '1.2.0',
        lastSync: new Date(),
        deviceType: 'tablet',
        totalScans: 65,
        scansToday: 3
    },
    
    // Pending token purchases
    pendingPurchases: []
};

// ============================================
// ADVERTISER OVERVIEW
// ============================================

function getAdvertiserOverview() {
    const totalLocations = Object.values(AdvertiserData.campaignLocations).flat().length;
    const totalCampaigns = AdvertiserData.activeCampaigns.length;
    const totalRedemptions = AdvertiserData.activeCampaigns.reduce((sum, c) => sum + c.redemptionsThisMonth, 0);
    const totalTokensRedeemed = AdvertiserData.activeCampaigns.reduce((sum, c) => sum + c.tokensRedeemedThisMonth, 0);
    
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
                <div class="stat-icon">💎</div>
                <div class="stat-label">Your $Ember Balance</div>
                <div class="stat-value">${AdvertiserData.tokenBalance.owned.toLocaleString()}</div>
                <div class="stat-change">${AdvertiserData.tokenBalance.available.toLocaleString()} available</div>
            </div>
            
            <div class="stat-card">
                <div class="stat-icon">📍</div>
                <div class="stat-label">My Token Stops</div>
                <div class="stat-value">${totalLocations}</div>
                <div class="stat-change">Across all campaigns</div>
            </div>
            
            <div class="stat-card">
                <div class="stat-icon">🎁</div>
                <div class="stat-label">Redemptions This Month</div>
                <div class="stat-value">${totalRedemptions}</div>
                <div class="stat-change positive">${totalTokensRedeemed.toLocaleString()} $Ember recovered</div>
            </div>
        </div>
        
        <!-- Token Balance Widget -->
        <div class="dashboard-section">
            <div class="card" style="background: rgba(240,165,0,0.1); border: 2px solid rgba(240,165,0,0.4);">
                <div style="display: flex; justify-content: space-between; align-items: start; gap: 20px; flex-wrap: wrap;">
                    <div style="flex: 1; min-width: 300px;">
                        <h3 style="color: var(--color-primary-gold); margin-bottom: 20px; font-size: 1.8rem;">
                            💎 Your $Ember Token Balance
                        </h3>
                        
                        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 15px; margin-bottom: 20px;">
                            <div style="padding: 15px; background: rgba(0,0,0,0.3); border-radius: 12px;">
                                <div style="font-size: 0.85rem; color: rgba(255,255,255,0.6); margin-bottom: 5px;">Total Owned</div>
                                <div style="font-size: 1.5rem; font-weight: 900; color: var(--color-primary-gold);">
                                    ${AdvertiserData.tokenBalance.owned.toLocaleString()}
                                </div>
                            </div>
                            <div style="padding: 15px; background: rgba(0,0,0,0.3); border-radius: 12px;">
                                <div style="font-size: 0.85rem; color: rgba(255,255,255,0.6); margin-bottom: 5px;">In Circulation</div>
                                <div style="font-size: 1.5rem; font-weight: 900; color: #fb923c;">
                                    ${AdvertiserData.tokenBalance.distributed.toLocaleString()}
                                </div>
                            </div>
                            <div style="padding: 15px; background: rgba(0,0,0,0.3); border-radius: 12px;">
                                <div style="font-size: 0.85rem; color: rgba(255,255,255,0.6); margin-bottom: 5px;">Redeemed Back</div>
                                <div style="font-size: 1.5rem; font-weight: 900; color: #22c55e;">
                                    ${AdvertiserData.tokenBalance.redeemed.toLocaleString()}
                                </div>
                            </div>
                            <div style="padding: 15px; background: rgba(0,0,0,0.3); border-radius: 12px;">
                                <div style="font-size: 0.85rem; color: rgba(255,255,255,0.6); margin-bottom: 5px;">Available</div>
                                <div style="font-size: 1.5rem; font-weight: 900; color: var(--color-primary-gold);">
                                    ${AdvertiserData.tokenBalance.available.toLocaleString()}
                                </div>
                            </div>
                        </div>
                        
                        <div style="background: rgba(34,197,94,0.15); border: 1px solid rgba(34,197,94,0.4); border-radius: 12px; padding: 15px; margin-bottom: 20px;">
                            <h4 style="color: #22c55e; margin-bottom: 10px;">💡 How Your Tokens Flow:</h4>
                            <ul style="list-style: none; padding: 0; margin: 0; font-size: 0.9rem;">
                                <li style="padding: 5px 0;">✓ You purchase $Ember tokens</li>
                                <li style="padding: 5px 0;">✓ Fund token stops with your advertisement</li>
                                <li style="padding: 5px 0;">✓ Players collect tokens & see your ad</li>
                                <li style="padding: 5px 0;">✓ Players redeem at your location</li>
                                <li style="padding: 5px 0;">✓ You get tokens back + customer visit!</li>
                            </ul>
                        </div>
                        
                        <div style="display: flex; gap: 15px; flex-wrap: wrap;">
                            <button class="btn btn-primary" onclick="loadSection('wallet')">
                                💳 Buy More $Ember
                            </button>
                            <button class="btn btn-secondary" onclick="loadCampaignControl('camp-001')">
                                📍 Add Token Stop
                            </button>
                        </div>
                    </div>
                    
                    <div style="text-align: center;">
                        <div style="width: 200px; height: 200px; background: rgba(0,0,0,0.3); border-radius: 12px; display: flex; align-items: center; justify-content: center; margin-bottom: 15px;">
                            <div style="font-size: 4rem;">💎</div>
                        </div>
                        <div style="color: rgba(255,255,255,0.7); font-size: 0.9rem;">
                            Current Value: ${window.formatCurrency ? window.formatCurrency(AdvertiserData.tokenBalance.owned * 0.0035) : '$43.58'}
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        <!-- Scanner App Status -->
        <div class="dashboard-section">
            <div class="card" style="background: rgba(34,197,94,0.1); border: 2px solid rgba(34,197,94,0.4);">
                <div style="display: flex; justify-content: space-between; align-items: start; gap: 20px; flex-wrap: wrap;">
                    <div style="flex: 1; min-width: 300px;">
                        <h3 style="color: #22c55e; margin-bottom: 15px; font-size: 1.8rem;">
                            📱 $Ember Scanner App
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
                                        <div style="font-size: 1.2rem; font-weight: 700; text-transform: capitalize;">${AdvertiserData.scannerApp.deviceType}</div>
                                    </div>
                                    <div>
                                        <div style="color: rgba(255,255,255,0.6); font-size: 0.9rem; margin-bottom: 5px;">Scans Today</div>
                                        <div style="font-size: 1.2rem; font-weight: 700; color: var(--color-primary-gold);">${AdvertiserData.scannerApp.scansToday}</div>
                                    </div>
                                    <div>
                                        <div style="color: rgba(255,255,255,0.6); font-size: 0.9rem; margin-bottom: 5px;">Total Scans</div>
                                        <div style="font-size: 1.2rem; font-weight: 700; color: #22c55e;">${AdvertiserData.scannerApp.totalScans}</div>
                                    </div>
                                </div>
                            </div>
                            
                            <div style="background: rgba(240,165,0,0.1); border: 1px solid rgba(240,165,0,0.3); border-radius: 12px; padding: 15px; margin-bottom: 20px;">
                                <h4 style="color: var(--color-primary-gold); margin-bottom: 10px;">How to Redeem:</h4>
                                <ol style="margin: 0; padding-left: 20px; font-size: 0.9rem; line-height: 1.6;">
                                    <li>Player visits your location to redeem $Ember</li>
                                    <li>Open Scanner App on your device</li>
                                    <li>Scan the QR code from player's app</li>
                                    <li>Enter redemption amount (e.g., 50 $Ember)</li>
                                    <li>Tokens transfer to you instantly!</li>
                                    <li>Give the player their offer/discount</li>
                                </ol>
                            </div>
                            
                            <div style="display: flex; gap: 15px; flex-wrap: wrap;">
                                <button class="btn btn-primary" onclick="openScannerApp()">
                                    📱 Open Scanner App
                                </button>
                                <button class="btn btn-outline" onclick="viewScanHistory()">
                                    📊 View Scan History
                                </button>
                                <button class="btn btn-secondary" onclick="downloadScannerGuide()">
                                    📚 Scanner Guide
                                </button>
                            </div>
                        ` : `
                            <p style="color: rgba(255,255,255,0.9); font-size: 1.1rem; line-height: 1.6; margin-bottom: 20px;">
                                Download the Scanner App to redeem $Ember from players. When players visit to redeem, 
                                scan their QR code to receive $Ember back and give them your offer.
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
                                <span class="metric-label">My Token Stops</span>
                                <span class="metric-value">${campaign.myLocations}</span>
                            </div>
                            <div class="app-metric">
                                <span class="metric-label">Redemptions</span>
                                <span class="metric-value">${campaign.redemptionsThisMonth}</span>
                            </div>
                            <div class="app-metric">
                                <span class="metric-label">$Ember Recovered</span>
                                <span class="metric-value">${campaign.tokensRedeemedThisMonth.toLocaleString()}</span>
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
                <button class="btn btn-secondary" style="padding: 20px; font-size: 1.1rem;" onclick="loadSection('wallet')">
                    💎 Buy $Ember Tokens
                </button>
                <button class="btn btn-outline" style="padding: 20px; font-size: 1.1rem;" onclick="loadSection('marketplace')">
                    🛒 Browse Campaigns
                </button>
            </div>
        </div>
    `;
}

// ============================================
// SCANNER APP FUNCTIONS
// ============================================

function downloadScanner() {
    alert(`📱 Download $Ember Scanner App\n\nAvailable for:\n• iOS (App Store)\n• Android (Google Play)\n• Web App (PWA)\n\nSearch for "Vault Phoenix Scanner" or scan the QR code in your dashboard.\n\nSetup takes less than 2 minutes!`);
    
    // Mark as downloaded for demo
    AdvertiserData.scannerApp.downloaded = true;
    
    if (typeof window.loadSection === 'function') {
        window.loadSection('overview');
    }
}

function openScannerApp() {
    if (AdvertiserData.scannerApp.downloaded) {
        alert(`📱 Opening Scanner App...\n\nThe Scanner App would open on your device.\n\nHow to use:\n1. Point camera at player's QR code\n2. App automatically reads code\n3. Enter redemption amount\n4. Confirm transfer\n5. $Ember transfers to you instantly!`);
    } else {
        if (confirm('Scanner App not found. Download now?')) {
            downloadScanner();
        }
    }
}

function viewScanHistory() {
    alert(`📊 Recent Redemption Scans\n\nToday:\n• 10:24 AM - 50 $Ember (Museum Tour)\n• 2:43 PM - 50 $Ember (Gift Shop)\n• 4:15 PM - 50 $Ember (Museum Tour)\n\nTotal today: 3 scans\nTotal value: 150 $Ember\n\nThis month: 65 scans\nTotal recovered: 3,250 $Ember`);
}

function downloadScannerGuide() {
    alert(`📚 Scanner App Guide\n\nQuick Start:\n1. Download app from store\n2. Login with advertiser credentials\n3. Link to your locations\n4. Ready to scan!\n\nScanning Process:\n1. Player shows QR code\n2. Scan with app camera\n3. Enter redemption amount\n4. Confirm transfer\n5. Give offer to player\n\nFull documentation available at:\nvaultphoenix.com/docs/scanner`);
}

// Export functions
if (typeof window !== 'undefined') {
    window.AdvertiserData = AdvertiserData;
    window.getAdvertiserOverview = getAdvertiserOverview;
    window.downloadScanner = downloadScanner;
    window.openScannerApp = openScannerApp;
    window.viewScanHistory = viewScanHistory;
    window.downloadScannerGuide = downloadScannerGuide;
}
