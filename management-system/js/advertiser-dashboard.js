/* ============================================
   VAULT PHOENIX MANAGEMENT SYSTEM
   Advertiser Dashboard - Complete Features
   ============================================ */

// ============================================
// ADVERTISER DATA & CONFIGURATION
// ============================================

const AdvertiserData = {
    // Pricing Tiers (3 tiers based on location count)
    pricingTiers: [
        {
            name: 'Tier 1',
            locations: '1-3',
            monthlyFee: 500,
            description: 'Perfect for single or small multi-location businesses',
            features: ['Up to 3 locations', 'Basic analytics', 'Email support', 'Monthly reports']
        },
        {
            name: 'Tier 2',
            locations: '4-10',
            monthlyFee: 1200,
            description: 'Ideal for growing businesses with multiple locations',
            features: ['4-10 locations', 'Advanced analytics', 'Priority support', 'Weekly reports', 'Custom branding']
        },
        {
            name: 'Tier 3',
            locations: '11+',
            monthlyFee: 2500,
            description: 'Enterprise solution for large-scale operations',
            features: ['Unlimited locations', 'Real-time analytics', 'Dedicated account manager', 'Daily reports', 'API access', 'White-label options']
        }
    ],
    
    // Current advertiser locations
    myLocations: [
        {
            id: 'loc-001',
            name: 'Heritage Square Historic Site',
            address: '115 N 6th St, Phoenix, AZ 85004',
            lat: 33.4484,
            lng: -112.0740,
            tier: 'Tier 1',
            status: 'active',
            visitors30d: 847,
            tokensRemaining: 12450,
            campaign: '$Ember Hunt'
        }
    ],
    
    // Airdrop history
    airdropHistory: [
        {
            id: 'air-001',
            amount: 500,
            recipients: 12,
            timestamp: new Date(Date.now() - 3600000),
            claimRate: 91.7,
            status: 'completed'
        }
    ]
};

// ============================================
// ADVERTISER OVERVIEW
// ============================================

function getAdvertiserOverview() {
    return `
        <!-- Hero Stats -->
        <div class="hero-stats">
            <div class="stat-card">
                <div class="stat-icon">👥</div>
                <div class="stat-label">GPS-Verified Visitors</div>
                <div class="stat-value">847</div>
                <div class="stat-change positive">+18% ↑ vs last month</div>
            </div>
            
            <div class="stat-card">
                <div class="stat-icon">💎</div>
                <div class="stat-label">Token Collections</div>
                <div class="stat-value">2,340</div>
                <div class="stat-change positive">+12% ↑</div>
            </div>
            
            <div class="stat-card">
                <div class="stat-icon">📊</div>
                <div class="stat-label">Current Tier</div>
                <div class="stat-value">Tier 1</div>
                <div class="stat-change">1-3 Locations</div>
            </div>
            
            <div class="stat-card">
                <div class="stat-icon">💰</div>
                <div class="stat-label">Monthly Investment</div>
                <div class="stat-value">$650</div>
                <div class="stat-change">Location + Campaign</div>
            </div>
        </div>
        
        <!-- Quick Actions -->
        <div class="dashboard-section">
            <h2 class="section-title">⚡ Quick Actions</h2>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 20px;">
                <button class="btn btn-primary" onclick="loadSection('locations')" style="padding: 20px; font-size: 1.1rem;">
                    📍 Add New Location
                </button>
                <button class="btn btn-secondary" onclick="loadSection('airdrop-requests')" style="padding: 20px; font-size: 1.1rem;">
                    🎁 Request Airdrop
                </button>
                <button class="btn btn-outline" onclick="loadSection('analytics')" style="padding: 20px; font-size: 1.1rem;">
                    📊 View Analytics
                </button>
            </div>
        </div>
        
        <!-- Location Performance -->
        <div class="dashboard-section">
            <h2 class="section-title">📍 My Active Locations</h2>
            
            ${AdvertiserData.myLocations.map(loc => `
                <div class="card" style="margin-bottom: 20px;">
                    <div style="display: flex; justify-content: between; align-items: start; margin-bottom: 20px; flex-wrap: wrap; gap: 15px;">
                        <div style="flex: 1;">
                            <h3 style="color: var(--color-primary-gold); margin-bottom: 10px;">${loc.name}</h3>
                            <div style="color: rgba(255,255,255,0.7); margin-bottom: 15px;">${loc.address}</div>
                            <div style="display: flex; gap: 15px; flex-wrap: wrap;">
                                <span class="badge badge-success">
                                    <span class="status-indicator status-live"></span>
                                    ${loc.status.toUpperCase()}
                                </span>
                                <span class="badge badge-info">${loc.tier}</span>
                                <span class="badge badge-warning">${loc.campaign}</span>
                            </div>
                        </div>
                    </div>
                    
                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px;">
                        <div style="padding: 20px; background: rgba(0,0,0,0.3); border-radius: 12px;">
                            <div style="color: rgba(255,255,255,0.7); font-size: 0.9rem; margin-bottom: 8px;">Visitors (30 days)</div>
                            <div style="font-size: 1.8rem; font-weight: 900; color: var(--color-primary-gold);">${loc.visitors30d.toLocaleString()}</div>
                        </div>
                        
                        <div style="padding: 20px; background: rgba(0,0,0,0.3); border-radius: 12px;">
                            <div style="color: rgba(255,255,255,0.7); font-size: 0.9rem; margin-bottom: 8px;">Tokens Remaining</div>
                            <div style="font-size: 1.8rem; font-weight: 900; color: var(--color-primary-gold);">${loc.tokensRemaining.toLocaleString()}</div>
                        </div>
                        
                        <div style="padding: 20px; background: rgba(0,0,0,0.3); border-radius: 12px;">
                            <div style="color: rgba(255,255,255,0.7); font-size: 0.9rem; margin-bottom: 8px;">Engagement Rate</div>
                            <div style="font-size: 1.8rem; font-weight: 900; color: #22c55e;">88.4%</div>
                        </div>
                        
                        <div style="padding: 20px; background: rgba(0,0,0,0.3); border-radius: 12px;">
                            <div style="color: rgba(255,255,255,0.7); font-size: 0.9rem; margin-bottom: 8px;">Peak Hours</div>
                            <div style="font-size: 1.2rem; font-weight: 700;">2pm - 5pm</div>
                        </div>
                    </div>
                    
                    <div style="margin-top: 20px; display: flex; gap: 15px; flex-wrap: wrap;">
                        <button class="btn btn-outline" onclick="loadSection('map')">View on Map</button>
                        <button class="btn btn-secondary" onclick="loadSection('analytics')">View Analytics</button>
                        <button class="btn btn-primary" onclick="loadSection('airdrop-requests')">Request Airdrop</button>
                    </div>
                </div>
            `).join('')}
        </div>
        
        <!-- Pricing Tiers Overview -->
        <div class="dashboard-section">
            <h2 class="section-title">💎 Pricing Tiers</h2>
            <p style="color: rgba(255,255,255,0.8); margin-bottom: 25px;">
                One monthly fee per location - pricing scales with your business growth
            </p>
            
            <div class="apps-grid">
                ${AdvertiserData.pricingTiers.map(tier => `
                    <div class="card">
                        <h3 style="color: var(--color-primary-gold); margin-bottom: 10px;">${tier.name}</h3>
                        <div style="font-size: 0.9rem; color: rgba(255,255,255,0.6); margin-bottom: 15px;">${tier.locations} locations</div>
                        
                        <div style="font-size: 2.5rem; font-weight: 900; color: var(--color-primary-orange); margin-bottom: 5px;">
                            $${tier.monthlyFee}
                            <span style="font-size: 1rem; color: rgba(255,255,255,0.6);">/month</span>
                        </div>
                        
                        <p style="color: rgba(255,255,255,0.7); font-size: 0.95rem; margin: 15px 0;">${tier.description}</p>
                        
                        <ul style="list-style: none; padding: 0; margin: 20px 0;">
                            ${tier.features.map(feature => `
                                <li style="padding: 8px 0; border-bottom: 1px solid rgba(255,255,255,0.1); font-size: 0.9rem;">
                                    ✓ ${feature}
                                </li>
                            `).join('')}
                        </ul>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
}

// ============================================
// LOCATION MAP VIEW
// ============================================

function getMapContent(role) {
    if (role !== 'advertiser') {
        return getPlaceholderContent('map');
    }
    
    return `
        <div class="dashboard-section">
            <h2 class="section-title">🗺️ Location Map</h2>
            <p style="color: rgba(255,255,255,0.8); margin-bottom: 25px;">
                View all your active locations with Ember token availability on an interactive map
            </p>
            
            <!-- Map Container -->
            <div class="card" style="margin-bottom: 30px;">
                <div style="height: 500px; background: linear-gradient(135deg, rgba(15, 15, 15, 0.8), rgba(45, 24, 16, 0.8)); border-radius: 12px; display: flex; align-items: center; justify-content: center; position: relative; overflow: hidden;">
                    <div style="text-align: center; z-index: 2;">
                        <div style="font-size: 4rem; margin-bottom: 15px;">🗺️</div>
                        <div style="color: var(--color-primary-gold); font-weight: 700; font-size: 1.3rem; margin-bottom: 10px;">
                            Interactive Google Maps Integration
                        </div>
                        <div style="color: rgba(255,255,255,0.7); max-width: 500px; margin: 0 auto 20px;">
                            • Gold coins = Your Ember token locations<br>
                            • Click coins for details & remaining tokens<br>
                            • Search by address to add new locations<br>
                            • Zoom & pan to explore coverage area
                        </div>
                        <button class="btn btn-primary" onclick="alert('Google Maps API integration would be configured here with your API key')">
                            Configure Google Maps API
                        </button>
                    </div>
                    
                    <!-- Simulated map markers -->
                    ${AdvertiserData.myLocations.map((loc, i) => `
                        <div style="position: absolute; top: ${40 + i*10}%; left: ${45 + i*5}%; z-index: 1;">
                            <div style="font-size: 2rem; filter: drop-shadow(0 0 10px rgba(240,165,0,0.8)); animation: pulse 2s infinite;">💰</div>
                        </div>
                    `).join('')}
                </div>
                
                <!-- Map Controls -->
                <div style="margin-top: 20px; display: flex; gap: 10px; flex-wrap: wrap;">
                    <button class="btn btn-outline">🔍 Zoom In</button>
                    <button class="btn btn-outline">🔍 Zoom Out</button>
                    <button class="btn btn-outline">📍 Center View</button>
                    <button class="btn btn-secondary">⛶ Fullscreen</button>
                    <button class="btn btn-primary" onclick="loadSection('locations')">➕ Add Location</button>
                </div>
            </div>
            
            <!-- Location List -->
            <div class="card">
                <h3 style="margin-bottom: 20px;">📍 Your Locations (${AdvertiserData.myLocations.length})</h3>
                
                ${AdvertiserData.myLocations.map(loc => `
                    <div style="padding: 20px; background: rgba(0,0,0,0.3); border-radius: 12px; margin-bottom: 15px;">
                        <div style="display: flex; justify-content: space-between; align-items: start; flex-wrap: wrap; gap: 15px;">
                            <div>
                                <h4 style="color: var(--color-primary-gold); margin-bottom: 8px;">${loc.name}</h4>
                                <div style="color: rgba(255,255,255,0.7); margin-bottom: 10px;">${loc.address}</div>
                                <div style="font-family: monospace; color: rgba(255,255,255,0.5); font-size: 0.85rem;">
                                    ${loc.lat}, ${loc.lng}
                                </div>
                            </div>
                            <div style="text-align: right;">
                                <div style="font-size: 1.5rem; font-weight: 900; color: var(--color-primary-gold); margin-bottom: 5px;">
                                    ${loc.tokensRemaining.toLocaleString()}
                                </div>
                                <div style="color: rgba(255,255,255,0.6); font-size: 0.9rem;">Tokens Remaining</div>
                            </div>
                        </div>
                        
                        <div style="margin-top: 15px; display: flex; gap: 10px; flex-wrap: wrap;">
                            <button class="btn btn-small btn-outline" onclick="alert('Center map on: ${loc.name}')">View on Map</button>
                            <button class="btn btn-small btn-secondary" onclick="loadSection('analytics')">Analytics</button>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
}

// ============================================
// AIRDROP REQUESTS
// ============================================

function getAirdropRequestsContent(role) {
    if (role !== 'advertiser') {
        return getPlaceholderContent('airdrop-requests');
    }
    
    return `
        <div class="dashboard-section">
            <h2 class="section-title">🎁 Request Player Airdrop</h2>
            <p style="color: rgba(255,255,255,0.8); margin-bottom: 25px;">
                Send special Ember token airdrops to players near your location. Airdrops last 30 seconds - players must claim quickly!
            </p>
            
            <!-- Request Airdrop Form -->
            <div class="card" style="margin-bottom: 30px;">
                <h3 style="margin-bottom: 20px;">🚀 Create New Airdrop</h3>
                
                <div class="form-group">
                    <label class="form-label">Select Location</label>
                    <select class="form-input" id="airdropLocation">
                        ${AdvertiserData.myLocations.map(loc => `
                            <option value="${loc.id}">${loc.name} - ${loc.tokensRemaining.toLocaleString()} tokens available</option>
                        `).join('')}
                    </select>
                </div>
                
                <div class="form-group">
                    <label class="form-label">Tokens per Player</label>
                    <input type="number" class="form-input" id="airdropAmount" value="100" min="50" max="1000" step="50">
                    <div style="color: rgba(255,255,255,0.6); font-size: 0.85rem; margin-top: 5px;">
                        Recommended: 50-500 tokens per player
                    </div>
                </div>
                
                <div class="form-group">
                    <label class="form-label">Custom Message (Optional)</label>
                    <textarea class="form-input" id="airdropMessage" rows="3" placeholder="Visit us today for 20% off!"></textarea>
                </div>
                
                <div style="background: rgba(240,165,0,0.1); border: 1px solid rgba(240,165,0,0.3); border-radius: 12px; padding: 20px; margin: 20px 0;">
                    <h4 style="margin-bottom: 15px;">⏱️ Airdrop Timer: 30 Seconds</h4>
                    <p style="margin: 0; color: rgba(255,255,255,0.7);">
                        Players within range of your location will have 30 seconds to claim the airdrop. 
                        Unclaimed tokens return to your balance automatically.
                    </p>
                </div>
                
                <button class="btn btn-primary btn-large" onclick="sendAdvertiserAirdrop()" style="width: 100%;">
                    🎁 Send Airdrop to Nearby Players
                </button>
            </div>
            
            <!-- Airdrop Analytics -->
            <div class="card" style="margin-bottom: 30px;">
                <h3 style="margin-bottom: 20px;">📊 Airdrop Performance Analytics</h3>
                
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px; margin-bottom: 25px;">
                    <div style="padding: 20px; background: rgba(0,0,0,0.3); border-radius: 12px; text-align: center;">
                        <div style="font-size: 2.5rem; font-weight: 900; color: var(--color-primary-gold); margin-bottom: 5px;">91.7%</div>
                        <div style="color: rgba(255,255,255,0.7);">Claim Rate</div>
                    </div>
                    
                    <div style="padding: 20px; background: rgba(0,0,0,0.3); border-radius: 12px; text-align: center;">
                        <div style="font-size: 2.5rem; font-weight: 900; color: var(--color-primary-gold); margin-bottom: 5px;">12</div>
                        <div style="color: rgba(255,255,255,0.7);">Players Saw It</div>
                    </div>
                    
                    <div style="padding: 20px; background: rgba(0,0,0,0.3); border-radius: 12px; text-align: center;">
                        <div style="font-size: 2.5rem; font-weight: 900; color: #22c55e; margin-bottom: 5px;">11</div>
                        <div style="color: rgba(255,255,255,0.7);">Claimed</div>
                    </div>
                    
                    <div style="padding: 20px; background: rgba(0,0,0,0.3); border-radius: 12px; text-align: center;">
                        <div style="font-size: 2.5rem; font-weight: 900; color: #ef4444; margin-bottom: 5px;">1</div>
                        <div style="color: rgba(255,255,255,0.7);">Expired</div>
                    </div>
                </div>
                
                <div style="background: rgba(34,197,94,0.1); border: 1px solid rgba(34,197,94,0.3); border-radius: 12px; padding: 20px;">
                    <h4 style="color: #22c55e; margin-bottom: 10px;">💡 Optimization Tips</h4>
                    <ul style="margin: 0; padding-left: 20px; color: rgba(255,255,255,0.8);">
                        <li>Peak hours (2pm-5pm) have highest claim rates</li>
                        <li>Weekend airdrops see 40% more engagement</li>
                        <li>Include a clear call-to-action in your message</li>
                        <li>Higher token amounts attract more players</li>
                    </ul>
                </div>
            </div>
            
            <!-- Airdrop History -->
            <div class="card">
                <h3 style="margin-bottom: 20px;">📜 Recent Airdrops</h3>
                
                ${AdvertiserData.airdropHistory.length > 0 ? AdvertiserData.airdropHistory.map(airdrop => `
                    <div style="padding: 15px; background: rgba(0,0,0,0.3); border-radius: 8px; margin-bottom: 10px;">
                        <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 10px;">
                            <div>
                                <div style="font-weight: 700; margin-bottom: 5px;">
                                    ${airdrop.amount} $Ember per player
                                    <span class="badge badge-success" style="margin-left: 10px;">${airdrop.status}</span>
                                </div>
                                <div style="color: rgba(255,255,255,0.6); font-size: 0.9rem;">
                                    ${airdrop.recipients} players • ${airdrop.claimRate}% claim rate • ${new Date(airdrop.timestamp).toLocaleString()}
                                </div>
                            </div>
                        </div>
                    </div>
                `).join('') : '<p style="color: rgba(255,255,255,0.6);">No airdrops sent yet</p>'}
            </div>
        </div>
    `;
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
            <h2 class="section-title">📈 Performance Analytics</h2>
            
            <!-- Key Metrics -->
            <div class="hero-stats">
                <div class="stat-card">
                    <div class="stat-icon">👥</div>
                    <div class="stat-label">Total Visitors (30d)</div>
                    <div class="stat-value">847</div>
                    <div class="stat-change positive">+18% ↑</div>
                </div>
                
                <div class="stat-card">
                    <div class="stat-icon">📊</div>
                    <div class="stat-label">Engagement Rate</div>
                    <div class="stat-value">88.4%</div>
                    <div class="stat-change positive">Above average</div>
                </div>
                
                <div class="stat-card">
                    <div class="stat-icon">💰</div>
                    <div class="stat-label">Est. Revenue Impact</div>
                    <div class="stat-value">$38,115</div>
                    <div class="stat-change positive">5,970% ROI</div>
                </div>
                
                <div class="stat-card">
                    <div class="stat-icon">⭐</div>
                    <div class="stat-label">Avg. Visit Duration</div>
                    <div class="stat-value">8.4 min</div>
                    <div class="stat-change">Per visitor</div>
                </div>
            </div>
            
            <!-- Chart Placeholder -->
            <div class="card" style="margin-bottom: 30px;">
                <h3 style="margin-bottom: 20px;">📈 Visitor Trends (Last 30 Days)</h3>
                
                <div style="height: 300px; background: linear-gradient(135deg, rgba(15, 15, 15, 0.5), rgba(45, 24, 16, 0.5)); border-radius: 12px; display: flex; align-items: center; justify-content: center;">
                    <div style="text-align: center;">
                        <div style="font-size: 3rem; margin-bottom: 15px;">📊</div>
                        <div style="color: rgba(255,255,255,0.8); font-weight: 700; margin-bottom: 10px;">
                            Interactive Analytics Chart
                        </div>
                        <div style="color: rgba(255,255,255,0.5); font-size: 0.9rem;">
                            Peak day: Saturday with 47 visitors<br>
                            Average: 28 visitors/day<br>
                            Trend: +18% month-over-month
                        </div>
                    </div>
                </div>
            </div>
            
            <!-- Detailed Stats -->
            <div class="apps-grid">
                <div class="card">
                    <h4 style="color: var(--color-primary-orange); margin-bottom: 15px;">Peak Hours</h4>
                    <div style="font-size: 2.5rem; font-weight: 900; margin-bottom: 10px;">2pm - 5pm</div>
                    <p style="color: rgba(255,255,255,0.7); margin: 0;">
                        Your highest traffic window. Consider scheduling airdrops during these hours for maximum impact.
                    </p>
                </div>
                
                <div class="card">
                    <h4 style="color: var(--color-primary-orange); margin-bottom: 15px;">Top Day</h4>
                    <div style="font-size: 2.5rem; font-weight: 900; margin-bottom: 10px;">Saturday</div>
                    <p style="color: rgba(255,255,255,0.7); margin: 0;">
                        Weekend traffic is 40% higher than weekdays. Plan special campaigns accordingly.
                    </p>
                </div>
                
                <div class="card">
                    <h4 style="color: var(--color-primary-orange); margin-bottom: 15px;">Conversion Rate</h4>
                    <div style="font-size: 2.5rem; font-weight: 900; margin-bottom: 10px; color: #22c55e;">23.4%</div>
                    <p style="color: rgba(255,255,255,0.7); margin: 0;">
                        Visitors who made a purchase or took desired action after token collection.
                    </p>
                </div>
            </div>
        </div>
    `;
}

// ============================================
// HELPER FUNCTIONS
// ============================================

function sendAdvertiserAirdrop() {
    const location = document.getElementById('airdropLocation')?.value;
    const amount = parseInt(document.getElementById('airdropAmount')?.value) || 100;
    const message = document.getElementById('airdropMessage')?.value || '';
    
    const loc = AdvertiserData.myLocations.find(l => l.id === location);
    
    if (!loc) return;
    
    if (amount > loc.tokensRemaining) {
        alert(`⚠️ Insufficient Tokens\n\nYou need ${amount} tokens but only have ${loc.tokensRemaining} remaining at this location.\n\nPlease reduce the amount or purchase more tokens.`);
        return;
    }
    
    const confirmMsg = `Send Airdrop?\n\n` +
        `Location: ${loc.name}\n` +
        `Amount: ${amount} $Ember per player\n` +
        `${message ? `Message: "${message}"\n` : ''}` +
        `Duration: 30 seconds\n\n` +
        `Nearby players will be notified immediately!`;
    
    if (confirm(confirmMsg)) {
        // Simulate airdrop
        const playersInRange = Math.floor(Math.random() * 15) + 5;
        
        alert(`🎁 Airdrop Sent!\n\n` +
            `${playersInRange} players in range were notified.\n` +
            `They have 30 seconds to claim.\n\n` +
            `Watch real-time results in the analytics below!`);
        
        // Add to history
        AdvertiserData.airdropHistory.unshift({
            id: 'air-' + Date.now(),
            amount: amount,
            recipients: playersInRange,
            timestamp: new Date(),
            claimRate: Math.floor(Math.random() * 30) + 70,
            status: 'completed'
        });
        
        // Reload section
        if (typeof window.loadSection === 'function') {
            window.loadSection('airdrop-requests');
        }
    }
}

// ============================================
// EXPORT FUNCTIONS
// ============================================

if (typeof window !== 'undefined') {
    window.getAdvertiserOverview = getAdvertiserOverview;
    window.getMapContent = getMapContent;
    window.getAirdropRequestsContent = getAirdropRequestsContent;
    window.getAdvertiserAnalyticsContent = getAdvertiserAnalyticsContent;
    window.sendAdvertiserAirdrop = sendAdvertiserAirdrop;
}
