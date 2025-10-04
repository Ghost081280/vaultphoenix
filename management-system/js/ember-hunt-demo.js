/* ============================================
   VAULT PHOENIX MANAGEMENT SYSTEM
   $Ember Hunt Demo - App Connection & Live Monitoring
   ============================================ */

// ============================================
// EMBER HUNT LIVE DATA
// ============================================

const EmberHuntDemo = {
    // App status
    appStatus: 'live',
    appName: '$Ember Hunt',
    
    // Live players (simulated)
    activePlayers: [
        { id: 'A47', lat: 33.4484, lng: -112.0740, username: 'CryptoHunter47', collecting: true },
        { id: 'B23', lat: 33.4490, lng: -112.0735, username: 'PhoenixGamer23', collecting: false },
        { id: 'C89', lat: 33.4476, lng: -112.0755, username: 'TokenMaster89', collecting: true },
        { id: 'D12', lat: 33.4501, lng: -112.0728, username: 'EmberCollector', collecting: false },
        { id: 'E56', lat: 33.4468, lng: -112.0745, username: 'AZCryptoKing', collecting: true }
    ],
    
    // Active tokens (simulated)
    activeTokens: [
        { id: 'token-001', lat: 33.4485, lng: -112.0741, amount: 500, location: 'Downtown Phoenix Plaza', collectable: true },
        { id: 'token-002', lat: 33.4495, lng: -112.0730, amount: 750, location: 'Heritage Square', collectable: true },
        { id: 'token-003', lat: 33.4472, lng: -112.0752, amount: 1000, location: 'Roosevelt Arts District', collectable: false },
        { id: 'token-004', lat: 33.4508, lng: -112.0725, amount: 500, location: 'Chase Field Area', collectable: true }
    ],
    
    // Recent activity feed
    recentActivity: [
        { 
            type: 'collection', 
            player: 'A47', 
            amount: 500, 
            location: 'Downtown Phoenix Plaza', 
            timestamp: new Date(Date.now() - 2000) 
        },
        { 
            type: 'airdrop', 
            recipients: 12, 
            location: 'Scottsdale area', 
            timestamp: new Date(Date.now() - 47000) 
        },
        { 
            type: 'payment', 
            merchant: 'Heritage Square', 
            amount: 800, 
            timestamp: new Date(Date.now() - 180000) 
        },
        { 
            type: 'collection', 
            player: 'E56', 
            amount: 750, 
            location: 'Heritage Square', 
            timestamp: new Date(Date.now() - 245000) 
        }
    ],
    
    // Performance metrics
    performance: {
        playersNow: 47,
        tokensActive: 156,
        collectionsToday: 278,
        revenueToday: 834
    }
};

// ============================================
// CAMPAIGN MONITORING CONTENT
// ============================================

/**
 * Get campaigns/monitoring content
 */
function getCampaignsContent(role) {
    if (role === 'advertiser') {
        return getPlaceholderContent('campaigns');
    }
    
    return `
        <div class="dashboard-section">
            <div class="live-monitoring">
                <div class="monitoring-header">
                    <div class="monitoring-title">
                        🔥 $Ember Hunt - Live Campaign Control
                        <span class="badge badge-success" style="margin-left: 15px;">
                            <span class="status-indicator status-live"></span>
                            LIVE
                        </span>
                    </div>
                    <div class="monitoring-actions">
                        <button class="btn btn-secondary" onclick="openPlayerApp()">
                            Open Player App ↗
                        </button>
                        <button class="btn btn-outline" onclick="loadSection('overview')">
                            Close View
                        </button>
                    </div>
                </div>
                
                <!-- Main Monitoring Grid -->
                <div class="monitoring-grid">
                    <!-- Live Player Map -->
                    <div class="monitoring-panel">
                        <div class="panel-title">🗺️ Live Player Map</div>
                        
                        <div class="live-map">
                            <div class="map-placeholder">
                                <div style="text-align: center;">
                                    <div style="font-size: 3rem; margin-bottom: 15px;">🗺️</div>
                                    <div style="color: rgba(255,255,255,0.8); font-weight: 700; margin-bottom: 10px;">
                                        Interactive Phoenix Map
                                    </div>
                                    <div style="color: rgba(255,255,255,0.6); font-size: 0.9rem; line-height: 1.6;">
                                        • Blue dots = Active players<br>
                                        • Gold coins = Token locations<br>
                                        • Green = Collectable range<br>
                                        • Red = Out of range
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div class="map-controls">
                            <button class="btn btn-small btn-outline">Zoom In</button>
                            <button class="btn btn-small btn-outline">Zoom Out</button>
                            <button class="btn btn-small btn-outline">Center View</button>
                            <button class="btn btn-small btn-secondary">Fullscreen</button>
                        </div>
                        
                        <div class="map-stats">
                            <div class="map-stat">
                                <div class="map-stat-value">${EmberHuntDemo.performance.playersNow}</div>
                                <div class="map-stat-label">Players in View</div>
                            </div>
                            <div class="map-stat">
                                <div class="map-stat-value">${EmberHuntDemo.performance.tokensActive}</div>
                                <div class="map-stat-label">Tokens Available</div>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Real-Time Activity Feed -->
                    <div class="monitoring-panel">
                        <div class="panel-title">
                            ⚡ Real-Time Activity 
                            <span class="badge badge-success" style="margin-left: 10px;">LIVE FEED</span>
                        </div>
                        
                        <div class="activity-feed" id="activityFeed">
                            ${renderActivityFeed()}
                        </div>
                    </div>
                </div>
                
                <!-- Airdrop & Token Management -->
                <div class="monitoring-grid" style="margin-top: 30px;">
                    <!-- Airdrop Control -->
                    <div class="monitoring-panel">
                        <div class="panel-title">🎯 Airdrop Control</div>
                        
                        <div class="airdrop-controls">
                            <div class="form-group">
                                <label class="form-label">Amount ($Ember)</label>
                                <input type="number" class="form-input" id="quickAirdropAmount" value="500" min="1">
                            </div>
                            
                            <div class="form-group">
                                <label class="form-label">Target</label>
                                <div class="radio-group">
                                    <div class="radio-option">
                                        <input type="radio" name="target" value="all" id="targetAll" checked>
                                        <label for="targetAll">All Players</label>
                                    </div>
                                    <div class="radio-option">
                                        <input type="radio" name="target" value="area" id="targetArea">
                                        <label for="targetArea">Area</label>
                                    </div>
                                    <div class="radio-option">
                                        <input type="radio" name="target" value="players" id="targetPlayers">
                                        <label for="targetPlayers">Selected</label>
                                    </div>
                                </div>
                            </div>
                            
                            <button class="btn btn-primary" style="width: 100%;" onclick="sendQuickAirdropFromMonitoring()">
                                🎁 Send Airdrop Now
                            </button>
                            
                            <div style="margin-top: 15px; padding-top: 15px; border-top: 1px solid rgba(255,255,255,0.1);">
                                <div style="display: flex; justify-content: space-between; padding: 5px 0; font-size: 0.9rem;">
                                    <span style="color: rgba(255,255,255,0.7);">Scheduled Airdrops:</span>
                                    <span style="font-weight: 700;">3</span>
                                </div>
                                <button class="btn btn-outline btn-small" style="width: 100%; margin-top: 10px;" onclick="loadSection('airdrops')">
                                    View Airdrop Center
                                </button>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Token Management -->
                    <div class="monitoring-panel">
                        <div class="panel-title">💎 Token Management</div>
                        
                        <div class="airdrop-controls">
                            <div style="padding: 20px; background: rgba(0,0,0,0.3); border-radius: 12px; margin-bottom: 20px; text-align: center;">
                                <div style="color: rgba(255,255,255,0.7); font-size: 0.9rem; margin-bottom: 8px;">
                                    Available Tokens
                                </div>
                                <div style="font-size: 2.5rem; font-weight: 900; color: var(--color-primary-gold); margin-bottom: 5px;">
                                    ${window.AppState?.tokenBalance?.amount.toLocaleString() || '28,450'}
                                </div>
                                <div style="color: rgba(255,255,255,0.6); font-size: 0.85rem;">
                                    ${window.formatCurrency ? window.formatCurrency((window.AppState?.tokenBalance?.amount || 28450) * (window.AppState?.tokenBalance?.price || 0.0035)) : '$99.58'} at current price
                                </div>
                            </div>
                            
                            <div style="padding: 15px; background: rgba(240,165,0,0.1); border: 1px solid rgba(240,165,0,0.3); border-radius: 12px; margin-bottom: 15px;">
                                <div style="display: flex; justify-content: space-between; padding: 8px 0;">
                                    <span style="color: rgba(255,255,255,0.8);">Distributed Today:</span>
                                    <span style="font-weight: 700; color: var(--color-primary-orange);">12,450</span>
                                </div>
                                <div style="display: flex; justify-content: space-between; padding: 8px 0;">
                                    <span style="color: rgba(255,255,255,0.8);">Remaining:</span>
                                    <span style="font-weight: 700;">${(window.AppState?.tokenBalance?.amount || 28450) - 12450}</span>
                                </div>
                            </div>
                            
                            <button class="btn btn-secondary" style="width: 100%;" onclick="loadSection('wallet')">
                                Purchase More Tokens
                            </button>
                            
                            <button class="btn btn-outline btn-small" style="width: 100%; margin-top: 10px;" onclick="loadSection('tokens')">
                                View Token Inventory
                            </button>
                        </div>
                    </div>
                </div>
                
                <!-- Campaign Performance -->
                <div style="margin-top: 30px;">
                    <h3 style="font-size: 1.3rem; color: var(--color-primary-gold); margin-bottom: 15px;">
                        📊 Campaign Performance (Last 24 Hours)
                    </h3>
                    
                    <div class="performance-cards">
                        <div class="performance-card">
                            <div class="performance-value">${EmberHuntDemo.performance.playersNow}</div>
                            <div class="performance-label">Active Players</div>
                        </div>
                        
                        <div class="performance-card">
                            <div class="performance-value">${EmberHuntDemo.performance.collectionsToday}</div>
                            <div class="performance-label">Token Collections</div>
                        </div>
                        
                        <div class="performance-card">
                            <div class="performance-value">$${EmberHuntDemo.performance.revenueToday}</div>
                            <div class="performance-label">Revenue Generated</div>
                        </div>
                        
                        <div class="performance-card">
                            <div class="performance-value">12</div>
                            <div class="performance-label">Advertiser Inquiries</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        <!-- App Connection Info -->
        <div class="dashboard-section">
            <div class="card" style="background: rgba(34,197,94,0.1); border: 2px solid rgba(34,197,94,0.3);">
                <h3 style="color: #22c55e; margin-bottom: 15px; display: flex; align-items: center; gap: 10px;">
                    <span style="font-size: 1.5rem;">✓</span>
                    Live Connection to Player App
                </h3>
                <p style="color: rgba(255,255,255,0.8); line-height: 1.6; margin-bottom: 20px;">
                    This management system is connected to the $Ember Hunt mobile app. Changes you make here 
                    (airdrops, token placements, campaigns) are reflected in real-time in the player-side application.
                </p>
                <div style="display: flex; gap: 15px; flex-wrap: wrap;">
                    <button class="btn btn-primary" onclick="openPlayerApp()">
                        🔥 Open Player App (New Window)
                    </button>
                    <button class="btn btn-outline" onclick="simulateLiveUpdate()">
                        🔄 Simulate Live Update
                    </button>
                </div>
            </div>
        </div>
    `;
}

// ============================================
// ACTIVITY FEED RENDERING
// ============================================

/**
 * Render activity feed items
 */
function renderActivityFeed() {
    return EmberHuntDemo.recentActivity.map(activity => {
        let icon, text;
        
        if (activity.type === 'collection') {
            icon = '💎';
            text = `Player #${activity.player} collected ${activity.amount.toLocaleString()} $Ember at "${activity.location}"`;
        } else if (activity.type === 'airdrop') {
            icon = '🎁';
            text = `Airdrop distributed to ${activity.recipients} players in ${activity.location}`;
        } else if (activity.type === 'payment') {
            icon = '💳';
            text = `Advertiser "${activity.merchant}" location fee processed - $${activity.amount}`;
        }
        
        return `
            <div class="activity-item">
                <div class="activity-icon">${icon}</div>
                <div class="activity-content">
                    <div class="activity-text">${text}</div>
                    <div class="activity-time">${getRelativeTime(activity.timestamp)}</div>
                </div>
            </div>
        `;
    }).join('');
}

/**
 * Get relative time
 */
function getRelativeTime(date) {
    const seconds = Math.floor((new Date() - date) / 1000);
    
    if (seconds < 60) return `${seconds} seconds ago`;
    if (seconds < 3600) return `${Math.floor(seconds / 60)} minutes ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)} hours ago`;
    return `${Math.floor(seconds / 86400)} days ago`;
}

// ============================================
// LIVE UPDATES SIMULATION
// ============================================

/**
 * Simulate live activity updates
 */
function simulateLiveUpdate() {
    const activities = [
        {
            type: 'collection',
            player: 'A' + Math.floor(Math.random() * 100),
            amount: [250, 500, 750, 1000][Math.floor(Math.random() * 4)],
            location: ['Downtown Phoenix', 'Scottsdale', 'Tempe', 'Mesa'][Math.floor(Math.random() * 4)],
            timestamp: new Date()
        }
    ];
    
    EmberHuntDemo.recentActivity = activities.concat(EmberHuntDemo.recentActivity.slice(0, 9));
    
    const activityFeed = document.getElementById('activityFeed');
    if (activityFeed) {
        activityFeed.innerHTML = renderActivityFeed();
        
        const firstItem = activityFeed.querySelector('.activity-item');
        if (firstItem) {
            firstItem.style.background = 'rgba(240,165,0,0.2)';
            setTimeout(() => {
                firstItem.style.background = 'rgba(255, 255, 255, 0.03)';
            }, 2000);
        }
    }
    
    showNotification('🔄 Live Update', 'New activity detected in $Ember Hunt app');
}

/**
 * Auto-refresh activity feed
 */
function startActivityAutoRefresh() {
    setInterval(() => {
        if (window.AppState?.currentSection === 'campaigns') {
            if (Math.random() > 0.7) {
                simulateLiveUpdate();
            }
        }
    }, 15000);
}

// ============================================
// QUICK ACTIONS
// ============================================

/**
 * Send quick airdrop from monitoring panel
 */
function sendQuickAirdropFromMonitoring() {
    const amount = parseInt(document.getElementById('quickAirdropAmount')?.value) || 500;
    const target = document.querySelector('input[name="target"]:checked')?.value || 'all';
    
    let recipients = EmberHuntDemo.performance.playersNow;
    if (target === 'area') recipients = 12;
    if (target === 'players') recipients = 5;
    
    const totalTokens = amount * recipients;
    
    if (window.AppState?.tokenBalance && totalTokens > window.AppState.tokenBalance.amount) {
        alert('⚠️ Insufficient token balance!\n\nYou need ' + totalTokens.toLocaleString() + ' $Ember but only have ' + window.AppState.tokenBalance.amount.toLocaleString() + ' $Ember.');
        return;
    }
    
    if (!confirm(`Send Airdrop?\n\nAmount: ${amount.toLocaleString()} $Ember per recipient\nTarget: ${target}\nRecipients: ${recipients}\nTotal: ${totalTokens.toLocaleString()} $Ember`)) {
        return;
    }
    
    if (window.AppState?.tokenBalance) {
        window.AppState.tokenBalance.amount -= totalTokens;
        if (typeof window.updateTokenBalance === 'function') {
            window.updateTokenBalance();
        }
    }
    
    EmberHuntDemo.recentActivity.unshift({
        type: 'airdrop',
        recipients: recipients,
        location: target === 'area' ? 'Selected area' : 'All active players',
        timestamp: new Date()
    });
    
    alert(`✓ Airdrop Sent!\n\n${totalTokens.toLocaleString()} $Ember distributed to ${recipients} players.`);
    
    if (typeof window.loadSection === 'function') {
        window.loadSection('campaigns');
    }
}

/**
 * Open player app in new window
 */
function openPlayerAppDemo() {
    const playerAppURL = '../crypto-game/dashboard.html';
    
    const playerWindow = window.open(playerAppURL, '_blank', 'width=400,height=800,toolbar=no,location=no,status=no,menubar=no');
    
    if (playerWindow) {
        alert('🔥 Player App Opened!\n\nThe $Ember Hunt player app has opened in a new window. This is the mobile experience your users see.\n\nNote: Changes you make in this management system would reflect in real-time in the player app.');
    } else {
        alert('🔥 Open Player App\n\nPlayer app would open at: ' + playerAppURL + '\n\nThis shows the mobile player experience.\n\nNote: Pop-up blocker may have prevented the window from opening. You can manually navigate to the crypto-game/dashboard.html file to see the player interface.');
    }
}

/**
 * Show notification
 */
function showNotification(title, message) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: var(--gradient-fire);
        color: white;
        padding: 20px;
        border-radius: 12px;
        box-shadow: 0 10px 40px rgba(0,0,0,0.5);
        z-index: 10000;
        max-width: 300px;
        animation: slideInRight 0.3s ease-out;
    `;
    
    notification.innerHTML = `
        <div style="font-weight: 700; margin-bottom: 8px;">${title}</div>
        <div style="font-size: 0.9rem;">${message}</div>
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease-out';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 4000);
}

// ============================================
// TOKEN ECONOMICS CONTENT (ADMIN ONLY)
// ============================================

/**
 * Get token economics content (System Admin only)
 */
function getTokenEconomicsContent(role) {
    if (role !== 'system-admin') {
        return `
            <div style="text-align: center; padding: 80px 20px;">
                <div style="font-size: 4rem; margin-bottom: 20px;">🔒</div>
                <h2 style="font-size: 2rem; margin-bottom: 15px; color: var(--color-primary-red);">
                    Access Denied
                </h2>
                <p style="color: rgba(255, 255, 255, 0.6); font-size: 1.1rem;">
                    Token Economics is only accessible to System Administrators.
                </p>
                <button class="btn btn-primary" style="margin-top: 30px;" onclick="loadSection('overview')">
                    Back to Dashboard
                </button>
            </div>
        `;
    }
    
    return `
        <div class="dashboard-section">
            <div style="background: rgba(239,68,68,0.2); border: 2px solid rgba(239,68,68,0.4); border-radius: 20px; padding: 20px; margin-bottom: 30px;">
                <div style="display: flex; align-items: center; gap: 15px;">
                    <div style="font-size: 2rem;">⚠️</div>
                    <div>
                        <div style="font-weight: 900; font-size: 1.2rem; margin-bottom: 5px;">CONFIDENTIAL - SYSTEM ADMIN ONLY</div>
                        <div style="color: rgba(255,255,255,0.8);">This data is not shared with customers and is for internal management only.</div>
                    </div>
                </div>
            </div>
            
            <h2 class="section-title">📊 Token Economics (SYSTEM ADMIN ONLY)</h2>
            
            <!-- Total Supply Breakdown -->
            <div class="card" style="margin-bottom: 30px;">
                <h3 style="color: var(--color-primary-gold); margin-bottom: 20px;">Total Supply Breakdown</h3>
                
                <div style="text-align: center; margin-bottom: 30px;">
                    <div style="font-size: 3rem; font-weight: 900; background: var(--gradient-ember); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;">
                        1,000,000,000 $Ember
                    </div>
                    <div style="color: rgba(255,255,255,0.7); font-size: 1.1rem;">Total Supply (1 Billion)</div>
                </div>
                
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 20px;">
                    <div style="padding: 20px; background: rgba(240,165,0,0.1); border: 1px solid rgba(240,165,0,0.3); border-radius: 12px;">
                        <div style="color: rgba(255,255,255,0.7); margin-bottom: 8px;">Campaign Token Pool</div>
                        <div style="font-size: 1.8rem; font-weight: 900; color: var(--color-primary-gold);">35%</div>
                        <div style="color: rgba(255,255,255,0.6); margin-top: 5px;">350,000,000 $Ember</div>
                    </div>
                    
                    <div style="padding: 20px; background: rgba(251,146,60,0.1); border: 1px solid rgba(251,146,60,0.3); border-radius: 12px;">
                        <div style="color: rgba(255,255,255,0.7); margin-bottom: 8px;">Platform Incentives</div>
                        <div style="font-size: 1.8rem; font-weight: 900; color: var(--color-primary-orange);">30%</div>
                        <div style="color: rgba(255,255,255,0.6); margin-top: 5px;">300,000,000 $Ember</div>
                    </div>
                    
                    <div style="padding: 20px; background: rgba(215,51,39,0.1); border: 1px solid rgba(215,51,39,0.3); border-radius: 12px;">
                        <div style="color: rgba(255,255,255,0.7); margin-bottom: 8px;">Presale (Early Investors)</div>
                        <div style="font-size: 1.8rem; font-weight: 900; color: var(--color-primary-red);">16.67%</div>
                        <div style="color: rgba(255,255,255,0.6); margin-top: 5px;">166,700,000 $Ember</div>
                    </div>
                    
                    <div style="padding: 20px; background: rgba(0,0,0,0.3); border: 1px solid rgba(255,255,255,0.2); border-radius: 12px;">
                        <div style="color: rgba(255,255,255,0.7); margin-bottom: 8px;">Team & Development</div>
                        <div style="font-size: 1.8rem; font-weight: 900;">10%</div>
                        <div style="color: rgba(255,255,255,0.6); margin-top: 5px;">100,000,000 $Ember</div>
                    </div>
                    
                    <div style="padding: 20px; background: rgba(0,0,0,0.3); border: 1px solid rgba(255,255,255,0.2); border-radius: 12px;">
                        <div style="color: rgba(255,255,255,0.7); margin-bottom: 8px;">Treasury / Growth Fund</div>
                        <div style="font-size: 1.8rem; font-weight: 900;">5%</div>
                        <div style="color: rgba(255,255,255,0.6); margin-top: 5px;">50,000,000 $Ember</div>
                    </div>
                    
                    <div style="padding: 20px; background: rgba(0,0,0,0.3); border: 1px solid rgba(255,255,255,0.2); border-radius: 12px;">
                        <div style="color: rgba(255,255,255,0.7); margin-bottom: 8px;">Reserve / Burn</div>
                        <div style="font-size: 1.8rem; font-weight: 900;">3.33%</div>
                        <div style="color: rgba(255,255,255,0.6); margin-top: 5px;">33,300,000 $Ember</div>
                    </div>
                </div>
            </div>
            
            <!-- Presale Information -->
            <div class="revenue-grid">
                <div class="card">
                    <h3 style="color: var(--color-primary-gold); margin-bottom: 20px;">Presale Information</h3>
                    
                    <div style="margin-bottom: 20px;">
                        <div style="display: flex; justify-content: space-between; padding: 12px 0; border-bottom: 1px solid rgba(255,255,255,0.1);">
                            <span style="color: rgba(255,255,255,0.7);">Presale Price:</span>
                            <span style="font-weight: 700; color: var(--color-primary-gold);">$0.003 per $Ember (FIXED)</span>
                        </div>
                        <div style="display: flex; justify-content: space-between; padding: 12px 0; border-bottom: 1px solid rgba(255,255,255,0.1);">
                            <span style="color: rgba(255,255,255,0.7);">Presale Target:</span>
                            <span style="font-weight: 700;">$500,000</span>
                        </div>
                        <div style="display: flex; justify-content: space-between; padding: 12px 0;">
                            <span style="color: rgba(255,255,255,0.7);">Tokens Available:</span>
                            <span style="font-weight: 700;">166,700,000 $Ember</span>
                        </div>
                    </div>
                    
                    <div style="background: rgba(0,0,0,0.3); border-radius: 12px; padding: 20px;">
                        <div style="font-weight: 700; margin-bottom: 15px;">Fund Allocation:</div>
                        <div style="display: flex; justify-content: space-between; padding: 8px 0;">
                            <span>40% - Liquidity Pool:</span>
                            <span style="font-weight: 700;">$200,000</span>
                        </div>
                        <div style="display: flex; justify-content: space-between; padding: 8px 0;">
                            <span>35% - Development:</span>
                            <span style="font-weight: 700;">$175,000</span>
                        </div>
                        <div style="display: flex; justify-content: space-between; padding: 8px 0;">
                            <span>15% - Legal/Compliance:</span>
                            <span style="font-weight: 700;">$75,000</span>
                        </div>
                        <div style="display: flex; justify-content: space-between; padding: 8px 0;">
                            <span>10% - Marketing:</span>
                            <span style="font-weight: 700;">$50,000</span>
                        </div>
                    </div>
                </div>
                
                <div class="card">
                    <h3 style="color: var(--color-primary-gold); margin-bottom: 20px;">Public Market Pricing</h3>
                    
                    <div style="text-align: center; margin-bottom: 25px;">
                        <div style="color: rgba(255,255,255,0.7); margin-bottom: 10px;">Current Market Price</div>
                        <div style="font-size: 3rem; font-weight: 900; color: var(--color-primary-gold);">
                            $${window.TokenEconomy?.marketPrice.toFixed(4) || '0.0035'}
                        </div>
                        <div style="color: rgba(255,255,255,0.6); margin-top: 5px;">
                            per $Ember (All non-presale purchases)
                        </div>
                    </div>
                    
                    <div style="background: rgba(0,0,0,0.3); border-radius: 12px; padding: 20px;">
                        <div style="display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid rgba(255,255,255,0.1);">
                            <span>24h Volume:</span>
                            <span style="font-weight: 700;">$47,392</span>
                        </div>
                        <div style="display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid rgba(255,255,255,0.1);">
                            <span>24h Change:</span>
                            <span style="font-weight: 700; color: #22c55e;">+16.7%</span>
                        </div>
                        <div style="display: flex; justify-content: space-between; padding: 8px 0;">
                            <span>Market Cap:</span>
                            <span style="font-weight: 700;">$3,500,000</span>
                        </div>
                    </div>
                </div>
            </div>
            
            <!-- Starter Token Program -->
            <div class="card">
                <h3 style="color: var(--color-primary-gold); margin-bottom: 20px;">Starter Token Program ($100 Value)</h3>
                
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 20px;">
                    <div style="padding: 20px; background: rgba(34,197,94,0.1); border: 1px solid rgba(34,197,94,0.3); border-radius: 12px;">
                        <div style="font-weight: 700; margin-bottom: 10px;">Campaign Managers</div>
                        <div style="font-size: 1.5rem; color: #22c55e; margin-bottom: 5px;">✓ $100 worth at market price</div>
                        <div style="color: rgba(255,255,255,0.6); font-size: 0.9rem;">
                            Current equivalent: ${Math.floor(100 / (window.TokenEconomy?.marketPrice || 0.0035)).toLocaleString()} tokens
                        </div>
                    </div>
                    
                    <div style="padding: 20px; background: rgba(239,68,68,0.1); border: 1px solid rgba(239,68,68,0.3); border-radius: 12px;">
                        <div style="font-weight: 700; margin-bottom: 10px;">Advertisers</div>
                        <div style="font-size: 1.5rem; color: #ef4444; margin-bottom: 5px;">✗ No starter tokens</div>
                        <div style="color: rgba(255,255,255,0.6); font-size: 0.9rem;">
                            Must purchase at market price
                        </div>
                    </div>
                </div>
                
                <div style="margin-top: 25px; padding: 20px; background: rgba(0,0,0,0.3); border-radius: 12px;">
                    <div style="display: flex; justify-content: space-between; padding: 8px 0;">
                        <span>Total Distributed:</span>
                        <span style="font-weight: 700;">$15,300 (153 accounts × $100)</span>
                    </div>
                    <div style="display: flex; justify-content: space-between; padding: 8px 0;">
                        <span>Source:</span>
                        <span style="font-weight: 700;">Platform Incentives Pool (300M)</span>
                    </div>
                </div>
            </div>
        </div>
    `;
}

/**
 * Get Smithii.io integration content (System Admin only)
 */
function getSmithiiContent(role) {
    if (role !== 'system-admin') {
        return `
            <div style="text-align: center; padding: 80px 20px;">
                <div style="font-size: 4rem; margin-bottom: 20px;">🔒</div>
                <h2 style="font-size: 2rem; margin-bottom: 15px; color: var(--color-primary-red);">
                    Access Denied
                </h2>
                <p style="color: rgba(255, 255, 255, 0.6); font-size: 1.1rem;">
                    Smithii.io Integration is only accessible to System Administrators.
                </p>
                <button class="btn btn-primary" style="margin-top: 30px;" onclick="loadSection('overview')">
                    Back to Dashboard
                </button>
            </div>
        `;
    }
    
    return `
        <div class="dashboard-section">
            <h2 class="section-title">🔗 Smithii.io Token Management Integration</h2>
            
            <div class="card" style="margin-bottom: 30px;">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 25px;">
                    <div>
                        <h3 style="color: var(--color-primary-gold); margin-bottom: 10px;">Connection Status</h3>
                        <div style="display: flex; align-items: center; gap: 10px;">
                            <span class="status-indicator status-live"></span>
                            <span style="font-size: 1.3rem; font-weight: 700; color: #22c55e;">ACTIVE & SYNCED</span>
                        </div>
                        <div style="color: rgba(255,255,255,0.6); margin-top: 5px;">
                            Last Sync: 2 minutes ago
                        </div>
                    </div>
                    <button class="btn btn-primary">Force Sync Now</button>
                </div>
            </div>
            
            <!-- Current Market Data -->
            <div class="revenue-grid">
                <div class="card">
                    <h3 style="color: var(--color-primary-gold); margin-bottom: 20px;">Current Market Data</h3>
                    
                    <div style="text-align: center; margin-bottom: 20px;">
                        <div style="font-size: 3rem; font-weight: 900; color: var(--color-primary-gold); margin-bottom: 5px;">
                            $${window.TokenEconomy?.marketPrice.toFixed(4) || '0.0035'}
                        </div>
                        <div style="color: rgba(255,255,255,0.7);">per $Ember</div>
                    </div>
                    
                    <div style="padding: 20px; background: rgba(0,0,0,0.3); border-radius: 12px;">
                        <div style="display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid rgba(255,255,255,0.1);">
                            <span>24h Change:</span>
                            <span style="font-weight: 700; color: #22c55e;">+16.7%</span>
                        </div>
                        <div style="display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid rgba(255,255,255,0.1);">
                            <span>24h Volume:</span>
                            <span style="font-weight: 700;">$47,392</span>
                        </div>
                        <div style="display: flex; justify-content: space-between; padding: 8px 0;">
                            <span>Circulating Supply:</span>
                            <span style="font-weight: 700;">12,450,000 $Ember (1.245%)</span>
                        </div>
                    </div>
                    
                    <div style="margin-top: 20px; display: flex; gap: 10px;">
                        <button class="btn btn-outline" style="flex: 1;">View on Smithii.io</button>
                        <button class="btn btn-outline" style="flex: 1;">Price History</button>
                    </div>
                </div>
                
                <div class="card">
                    <h3 style="color: var(--color-primary-gold); margin-bottom: 20px;">Distribution Tracking</h3>
                    
                    <div style="padding: 15px; background: rgba(0,0,0,0.3); border-radius: 12px; margin-bottom: 15px;">
                        <div style="display: flex; justify-content: space-between; padding: 8px 0;">
                            <span>Campaign Manager Starter Tokens:</span>
                            <span style="font-weight: 700;">$15,300</span>
                        </div>
                        <div style="display: flex; justify-content: space-between; padding: 8px 0;">
                            <span>Market Purchases:</span>
                            <span style="font-weight: 700;">$25,147</span>
                        </div>
                        <div style="display: flex; justify-content: space-between; padding: 8px 0; border-top: 1px solid rgba(255,255,255,0.1); padding-top: 12px; margin-top: 8px;">
                            <span style="font-weight: 700;">Airdrop Distributions:</span>
                            <span style="font-weight: 700; color: var(--color-primary-gold);">3,666,669 $Ember</span>
                        </div>
                    </div>
                    
                    <div style="margin-top: 20px; display: flex; gap: 10px; flex-direction: column;">
                        <button class="btn btn-secondary">Manage Distribution</button>
                        <button class="btn btn-outline">View Audit Trail</button>
                        <button class="btn btn-outline">Export Report</button>
                    </div>
                </div>
            </div>
        </div>
    `;
}

/**
 * Get User Management Content (System Admin only)
 */
function getUserManagementContent(role) {
    if (role !== 'system-admin') {
        return getPlaceholderContent('users');
    }
    
    return `
        <div class="dashboard-section">
            <h2 class="section-title">👥 User Management</h2>
            
            <div class="hero-stats">
                <div class="stat-card">
                    <div class="stat-icon">🚀</div>
                    <div class="stat-label">Campaign Managers</div>
                    <div class="stat-value">153</div>
                    <div class="stat-change positive">+12 this month</div>
                </div>
                
                <div class="stat-card">
                    <div class="stat-icon">📍</div>
                    <div class="stat-label">Advertisers</div>
                    <div class="stat-value">47</div>
                    <div class="stat-change positive">+5 this month</div>
                </div>
                
                <div class="stat-card">
                    <div class="stat-icon">🎮</div>
                    <div class="stat-label">Active Players</div>
                    <div class="stat-value">1,847</div>
                    <div class="stat-change positive">+234 this week</div>
                </div>
                
                <div class="stat-card">
                    <div class="stat-icon">⚙️</div>
                    <div class="stat-label">System Admins</div>
                    <div class="stat-value">3</div>
                    <div class="stat-change">Active</div>
                </div>
            </div>
            
            <div class="card">
                <h3 style="margin-bottom: 20px;">Recent User Activity</h3>
                <p style="color: rgba(255,255,255,0.7);">User management features coming soon...</p>
            </div>
        </div>
    `;
}

/**
 * Get Compliance Content (System Admin only)
 */
function getComplianceContent(role) {
    if (role !== 'system-admin') {
        return getPlaceholderContent('compliance');
    }
    
    return `
        <div class="dashboard-section">
            <h2 class="section-title">🔒 Compliance Center</h2>
            
            <div class="card">
                <h3 style="margin-bottom: 20px;">Regulatory Compliance</h3>
                <p style="color: rgba(255,255,255,0.7);">Compliance monitoring features coming soon...</p>
            </div>
        </div>
    `;
}

/**
 * Get Global Analytics Content (System Admin only)
 */
function getGlobalAnalyticsContent(role) {
    if (role !== 'system-admin') {
        return getPlaceholderContent('analytics');
    }
    
    return `
        <div class="dashboard-section">
            <h2 class="section-title">🌐 Global Analytics</h2>
            
            <div class="hero-stats">
                <div class="stat-card">
                    <div class="stat-icon">💰</div>
                    <div class="stat-label">Total Platform Revenue</div>
                    <div class="stat-value">$47,392</div>
                    <div class="stat-change positive">+19.8% ↑</div>
                </div>
                
                <div class="stat-card">
                    <div class="stat-icon">🎮</div>
                    <div class="stat-label">Active Campaigns</div>
                    <div class="stat-value">8</div>
                    <div class="stat-change">Across platform</div>
                </div>
                
                <div class="stat-card">
                    <div class="stat-icon">📍</div>
                    <div class="stat-label">Advertiser Locations</div>
                    <div class="stat-value">47</div>
                    <div class="stat-change positive">+5 this month</div>
                </div>
                
                <div class="stat-card">
                    <div class="stat-icon">💎</div>
                    <div class="stat-label">Tokens Distributed</div>
                    <div class="stat-value">3.67M</div>
                    <div class="stat-change">$Ember</div>
                </div>
            </div>
            
            <div class="card">
                <h3 style="margin-bottom: 20px;">Platform Performance</h3>
                <p style="color: rgba(255,255,255,0.7);">Advanced analytics dashboard coming soon...</p>
            </div>
        </div>
    `;
}

// ============================================
// INITIALIZE
// ============================================

if (typeof document !== 'undefined') {
    document.addEventListener('DOMContentLoaded', () => {
        startActivityAutoRefresh();
    });
}

// ============================================
// EXPORT FUNCTIONS
// ============================================

if (typeof window !== 'undefined') {
    window.EmberHuntDemo = EmberHuntDemo;
    window.getCampaignsContent = getCampaignsContent;
    window.getTokenEconomicsContent = getTokenEconomicsContent;
    window.getSmithiiContent = getSmithiiContent;
    window.getUserManagementContent = getUserManagementContent;
    window.getComplianceContent = getComplianceContent;
    window.getGlobalAnalyticsContent = getGlobalAnalyticsContent;
    window.simulateLiveUpdate = simulateLiveUpdate;
    window.sendQuickAirdropFromMonitoring = sendQuickAirdropFromMonitoring;
    window.openPlayerApp = openPlayerAppDemo;
}
