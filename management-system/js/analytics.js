/* ============================================
   VAULT PHOENIX MANAGEMENT SYSTEM
   Analytics - Reporting & Performance Metrics
   ============================================ */

// ============================================
// ANALYTICS DATA - ACCURATE & CONSISTENT
// ============================================

const AnalyticsData = {
    // Campaign performance (for $Ember Hunt)
    campaigns: {
        totalActive: 1, // Only $Ember Hunt
        totalRevenue: 650, // $500 location fee + $150 token funding
        totalPlayers: 847,
        totalTokensDistributed: 21200, // Tokens collected so far
        engagementRate: 87.3,
        averageSessionTime: 12.4
    },
    
    // Advertiser analytics
    advertisers: {
        totalActive: 1, // Heritage Square
        totalPending: 0,
        averageRevenue: 650,
        topPerformer: 'Heritage Square Historic Site',
        retentionRate: 100
    },
    
    // Player analytics
    players: {
        totalActive: 847,
        newToday: 18,
        returningUsers: 89.3,
        averageCollections: 8.7,
        topLocation: 'Heritage Square Historic Site'
    },
    
    // Time series data (last 7 days) - simplified
    timeSeries: {
        revenue: [500, 510, 530, 550, 580, 620, 650],
        players: [720, 750, 780, 800, 820, 835, 847],
        tokens: [18000, 18500, 19200, 19800, 20400, 20800, 21200],
        advertisers: [1, 1, 1, 1, 1, 1, 1],
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    
    // Geographic distribution
    locations: [
        { name: 'Heritage Square Historic Site', players: 847, collections: 2340, revenue: 650, type: 'advertiser' },
        { name: 'Downtown Phoenix Plaza', players: 420, collections: 890, revenue: 0, type: 'campaign-manager' },
        { name: 'Phoenix Historical Society', players: 385, collections: 720, revenue: 0, type: 'campaign-manager' }
    ]
};

// ============================================
// ADVERTISER OVERVIEW (Used in advertiser-dashboard.js)
// ============================================

function getAdvertiserOverview() {
    return `
        <!-- Hero Stats -->
        <div class="hero-stats">
            <div class="stat-card">
                <div class="stat-icon">🎮</div>
                <div class="stat-label">Active Campaigns</div>
                <div class="stat-value">1</div>
                <div class="stat-change">$Ember Hunt</div>
            </div>
            
            <div class="stat-card">
                <div class="stat-icon">📍</div>
                <div class="stat-label">My Token Locations</div>
                <div class="stat-value">1</div>
                <div class="stat-change">Heritage Square</div>
            </div>
            
            <div class="stat-card">
                <div class="stat-icon">👥</div>
                <div class="stat-label">GPS-Verified Visitors</div>
                <div class="stat-value">847</div>
                <div class="stat-change positive">+18% ↑ vs last month</div>
            </div>
            
            <div class="stat-card">
                <div class="stat-icon">💰</div>
                <div class="stat-label">Monthly Investment</div>
                <div class="stat-value">$650</div>
                <div class="stat-change">Location + Tokens</div>
            </div>
        </div>
        
        <!-- My Campaigns -->
        <div class="dashboard-section">
            <h2 class="section-title">🎮 My Campaigns (1)</h2>
            
            <div class="apps-grid">
                <div class="app-card" onclick="loadCampaignControl('camp-001')">
                    <div class="app-header">
                        <div class="app-name">$Ember Hunt</div>
                        <div class="app-status">
                            <span class="status-indicator status-live"></span>
                            <span style="color: #22c55e;">ACTIVE</span>
                        </div>
                    </div>
                    <div style="margin: 15px 0; padding: 12px; background: rgba(0,0,0,0.3); border-radius: 8px;">
                        <div style="font-size: 0.85rem; color: rgba(255,255,255,0.6); margin-bottom: 5px;">Campaign Manager</div>
                        <div style="font-weight: 700;">Phoenix Gaming Co.</div>
                    </div>
                    <div class="app-metrics">
                        <div class="app-metric">
                            <span class="metric-label">My Locations</span>
                            <span class="metric-value">1</span>
                        </div>
                        <div class="app-metric">
                            <span class="metric-label">Total Locations</span>
                            <span class="metric-value">3</span>
                        </div>
                        <div class="app-metric">
                            <span class="metric-label">Active Players</span>
                            <span class="metric-value">847</span>
                        </div>
                    </div>
                    <div class="app-actions">
                        <button class="btn btn-primary" onclick="event.stopPropagation(); loadCampaignControl('camp-001')">Manage Campaign</button>
                    </div>
                </div>
            </div>
        </div>
        
        <!-- Quick Actions -->
        <div class="dashboard-section">
            <h3 style="font-size: 1.5rem; color: var(--color-primary-gold); margin-bottom: 20px;">⚡ Quick Actions</h3>
            
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 20px;">
                <button class="btn btn-primary" style="padding: 20px; font-size: 1.1rem;" onclick="loadSection('marketplace')">
                    🛒 Browse More Campaigns
                </button>
                <button class="btn btn-secondary" style="padding: 20px; font-size: 1.1rem;" onclick="loadSection('payments')">
                    💳 Payment Center
                </button>
                <button class="btn btn-outline" style="padding: 20px; font-size: 1.1rem;" onclick="loadSection('analytics')">
                    📊 View Analytics
                </button>
            </div>
        </div>
    `;
}

// ============================================
// ADVERTISER PAYMENTS CONTENT
// ============================================

function getPaymentsContent(role) {
    if (role !== 'advertiser') {
        return getPlaceholderContent('payments');
    }
    
    return `
        <div class="dashboard-section">
            <h2 class="section-title">💳 Payment Center</h2>
            
            <div class="revenue-grid">
                <!-- Location Placement Fee -->
                <div class="card">
                    <h3 style="color: var(--color-primary-gold); margin-bottom: 20px; display: flex; align-items: center; gap: 10px;">
                        <span style="font-size: 2rem;">📍</span>
                        Location Placement Fee
                    </h3>
                    
                    <div style="background: rgba(0,0,0,0.3); border-radius: 12px; padding: 20px; margin-bottom: 20px;">
                        <div style="color: rgba(255,255,255,0.7); margin-bottom: 10px;">Current Plan</div>
                        <div style="font-size: 2rem; font-weight: 900; color: var(--color-primary-gold); margin-bottom: 5px;">
                            Silver Tier
                        </div>
                        <div style="font-size: 1.5rem; font-weight: 700; margin-bottom: 15px;">
                            $500<span style="font-size: 1rem; color: rgba(255,255,255,0.6);">/month</span>
                        </div>
                        
                        <div style="padding-top: 15px; border-top: 1px solid rgba(255,255,255,0.1);">
                            <div style="display: flex; justify-content: space-between; padding: 8px 0;">
                                <span style="color: rgba(255,255,255,0.7);">Campaign:</span>
                                <span style="font-weight: 700;">$Ember Hunt</span>
                            </div>
                            <div style="display: flex; justify-content: space-between; padding: 8px 0;">
                                <span style="color: rgba(255,255,255,0.7);">Location:</span>
                                <span style="font-weight: 700;">Heritage Square</span>
                            </div>
                            <div style="display: flex; justify-content: space-between; padding: 8px 0;">
                                <span style="color: rgba(255,255,255,0.7);">Next Payment Due:</span>
                                <span style="font-weight: 700;">Nov 4, 2025</span>
                            </div>
                            <div style="display: flex; justify-content: space-between; padding: 8px 0;">
                                <span style="color: rgba(255,255,255,0.7);">Payment Method:</span>
                                <span style="font-weight: 700;">•••• 4242</span>
                            </div>
                        </div>
                    </div>
                    
                    <div style="display: flex; flex-direction: column; gap: 10px;">
                        <button class="btn btn-outline">Update Payment Method</button>
                        <button class="btn btn-secondary">Upgrade Tier</button>
                    </div>
                </div>
                
                <!-- Campaign Token Funding -->
                <div class="card">
                    <h3 style="color: var(--color-primary-gold); margin-bottom: 20px; display: flex; align-items: center; gap: 10px;">
                        <span style="font-size: 2rem;">💎</span>
                        Campaign Token Funding
                    </h3>
                    
                    <div style="background: rgba(0,0,0,0.3); border-radius: 12px; padding: 20px; margin-bottom: 20px;">
                        <div style="color: rgba(255,255,255,0.7); margin-bottom: 10px;">Current Status</div>
                        <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 15px;">
                            <span class="status-indicator status-live"></span>
                            <span style="font-size: 1.5rem; font-weight: 700; color: #22c55e;">Fully Funded</span>
                        </div>
                        <div style="font-size: 1.2rem; font-weight: 700; margin-bottom: 15px;">
                            Est. Monthly: <span style="color: var(--color-primary-gold);">~$120-180</span>
                        </div>
                        
                        <div style="padding-top: 15px; border-top: 1px solid rgba(255,255,255,0.1);">
                            <div style="display: flex; justify-content: space-between; padding: 8px 0;">
                                <span style="color: rgba(255,255,255,0.7);">Tokens Remaining:</span>
                                <span style="font-weight: 700;">12,450</span>
                            </div>
                            <div style="display: flex; justify-content: space-between; padding: 8px 0;">
                                <span style="color: rgba(255,255,255,0.7);">Last funded:</span>
                                <span style="font-weight: 700;">Oct 1, 2025</span>
                            </div>
                            <div style="display: flex; justify-content: space-between; padding: 8px 0;">
                                <span style="color: rgba(255,255,255,0.7);">Tokens collected:</span>
                                <span style="font-weight: 700;">2,340</span>
                            </div>
                        </div>
                    </div>
                    
                    <div style="display: flex; flex-direction: column; gap: 10px;">
                        <button class="btn btn-primary">Add Campaign Funds</button>
                        <button class="btn btn-outline">Auto-Replenish Setup</button>
                    </div>
                </div>
            </div>
        </div>
        
        <!-- Budget Calculator -->
        <div class="dashboard-section">
            <h2 class="section-title">💰 Budget Calculator & Forecasting</h2>
            
            <div class="card">
                <div style="background: rgba(240,165,0,0.1); border: 1px solid rgba(240,165,0,0.3); border-radius: 12px; padding: 25px; margin-bottom: 25px;">
                    <h3 style="color: var(--color-primary-gold); margin-bottom: 20px;">Estimated Monthly Costs</h3>
                    
                    <div style="display: flex; justify-content: space-between; padding: 15px 0; border-bottom: 2px solid rgba(255,255,255,0.2);">
                        <span style="font-size: 1.1rem;">Location Fee (Silver):</span>
                        <span style="font-size: 1.3rem; font-weight: 700;">$500.00</span>
                    </div>
                    <div style="display: flex; justify-content: space-between; padding: 15px 0; border-bottom: 2px solid rgba(255,255,255,0.2);">
                        <span style="font-size: 1.1rem;">Campaign Funding:</span>
                        <span style="font-size: 1.3rem; font-weight: 700;">~$120-180</span>
                    </div>
                    <div style="display: flex; justify-content: space-between; padding: 20px 0; font-size: 1.3rem; font-weight: 900;">
                        <span>Total Estimated:</span>
                        <span style="color: var(--color-primary-gold); font-size: 1.8rem;">$620-680/month</span>
                    </div>
                </div>
                
                <div style="padding: 20px; background: rgba(0,0,0,0.2); border-radius: 12px; margin-bottom: 25px;">
                    <p style="color: rgba(255,255,255,0.8); line-height: 1.6; margin: 0;">
                        Based on your location's traffic patterns (847 visitors/month) and typical customer engagement. 
                        We recommend maintaining adequate campaign funding for consistent visitor attraction.
                    </p>
                </div>
                
                <div style="display: flex; gap: 15px; flex-wrap: wrap;">
                    <button class="btn btn-primary">Set Auto-Replenish</button>
                    <button class="btn btn-secondary">Adjust Budget</button>
                    <button class="btn btn-outline" onclick="loadSection('budget')">View ROI Calculator</button>
                </div>
            </div>
        </div>
        
        <!-- Payment History -->
        <div class="dashboard-section">
            <h2 class="section-title">📜 Payment History</h2>
            
            <div class="merchants-table-wrapper">
                <table class="merchants-table">
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Type</th>
                            <th>Description</th>
                            <th>Amount</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Oct 4, 2025</td>
                            <td>Location Fee</td>
                            <td>Silver Tier - Monthly</td>
                            <td>$500.00</td>
                            <td><span class="badge badge-success">Paid</span></td>
                        </tr>
                        <tr>
                            <td>Oct 1, 2025</td>
                            <td>Campaign Funding</td>
                            <td>Token Purchase</td>
                            <td>$138.50</td>
                            <td><span class="badge badge-success">Paid</span></td>
                        </tr>
                        <tr>
                            <td>Sep 4, 2025</td>
                            <td>Location Fee</td>
                            <td>Silver Tier - Monthly</td>
                            <td>$500.00</td>
                            <td><span class="badge badge-success">Paid</span></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    `;
}

// ============================================
// ADVERTISER BUDGET/ROI CONTENT
// ============================================

function getBudgetContent(role) {
    if (role !== 'advertiser') {
        return getPlaceholderContent('budget');
    }
    
    return `
        <div class="dashboard-section">
            <h2 class="section-title">💰 ROI Calculator & Business Insights</h2>
            
            <!-- ROI Summary -->
            <div class="card" style="background: linear-gradient(135deg, rgba(34,197,94,0.2), rgba(240,165,0,0.2)); border: 2px solid rgba(34,197,94,0.4);">
                <h3 style="font-size: 2rem; margin-bottom: 25px; text-align: center;">
                    Your Return on Investment
                </h3>
                
                <div style="text-align: center; margin-bottom: 30px;">
                    <div style="font-size: 5rem; font-weight: 900; background: var(--gradient-ember); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; margin-bottom: 10px;">
                        5,970%
                    </div>
                    <div style="font-size: 1.5rem; color: #22c55e; font-weight: 700;">
                        Return on Campaign Investment! 🎉
                    </div>
                </div>
                
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px; margin-top: 30px;">
                    <div style="text-align: center; padding: 20px; background: rgba(0,0,0,0.3); border-radius: 12px;">
                        <div style="color: rgba(255,255,255,0.7); margin-bottom: 8px;">Your Investment</div>
                        <div style="font-size: 2rem; font-weight: 900; color: var(--color-primary-gold);">$638.50</div>
                        <div style="font-size: 0.85rem; color: rgba(255,255,255,0.5); margin-top: 5px;">This month</div>
                    </div>
                    <div style="text-align: center; padding: 20px; background: rgba(0,0,0,0.3); border-radius: 12px;">
                        <div style="color: rgba(255,255,255,0.7); margin-bottom: 8px;">Est. Revenue Generated</div>
                        <div style="font-size: 2rem; font-weight: 900; color: #22c55e;">~$38,115</div>
                        <div style="font-size: 0.85rem; color: rgba(255,255,255,0.5); margin-top: 5px;">From 847 visitors</div>
                    </div>
                </div>
            </div>
        </div>
        
        <!-- Why It Works -->
        <div class="dashboard-section">
            <h3 style="font-size: 1.5rem; color: var(--color-primary-gold); margin-bottom: 20px;">
                💡 Why Vault Phoenix Works
            </h3>
            
            <div class="apps-grid">
                <div class="card">
                    <h4 style="color: var(--color-primary-orange); margin-bottom: 15px;">GPS-Verified Traffic</h4>
                    <p style="color: rgba(255,255,255,0.7); line-height: 1.6;">
                        Unlike traditional advertising, every visitor is GPS-verified. You only pay for real, 
                        measurable foot traffic to your location. 847 verified visitors this month.
                    </p>
                </div>
                
                <div class="card">
                    <h4 style="color: var(--color-primary-orange); margin-bottom: 15px;">Engaged Audience</h4>
                    <p style="color: rgba(255,255,255,0.7); line-height: 1.6;">
                        Players are actively seeking rewards at your location. They arrive motivated and 
                        ready to engage with your business. 88.4% engagement rate.
                    </p>
                </div>
                
                <div class="card">
                    <h4 style="color: var(--color-primary-orange); margin-bottom: 15px;">Real-Time Analytics</h4>
                    <p style="color: rgba(255,255,255,0.7); line-height: 1.6;">
                        Track performance in real-time. See exactly how many visitors you're getting 
                        and adjust your strategy accordingly.
                    </p>
                </div>
            </div>
        </div>
    `;
}

// ============================================
// CAMPAIGN MANAGER: MERCHANT MANAGEMENT
// ============================================

function getMerchantsContent(role) {
    if (role !== 'campaign-manager') {
        return getPlaceholderContent('advertisers');
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
                    <div class="stat-change">No pending</div>
                </div>
                
                <div class="stat-card">
                    <div class="stat-icon">💰</div>
                    <div class="stat-label">Monthly Recurring Revenue</div>
                    <div class="stat-value">$650</div>
                    <div class="stat-change positive">From 1 advertiser</div>
                </div>
                
                <div class="stat-card">
                    <div class="stat-icon">📊</div>
                    <div class="stat-label">Total Locations</div>
                    <div class="stat-value">1</div>
                    <div class="stat-change">Advertiser locations</div>
                </div>
            </div>
            
            <!-- Advertiser Table -->
            <div class="card" style="margin-top: 30px;">
                <h3 style="margin-bottom: 20px;">Active Advertisers</h3>
                
                <div class="merchants-table-wrapper">
                    <table class="merchants-table">
                        <thead>
                            <tr>
                                <th>Advertiser</th>
                                <th>Campaign</th>
                                <th>Locations</th>
                                <th>Tier</th>
                                <th>Monthly Fee</th>
                                <th>Visitors (30d)</th>
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
    window.AnalyticsData = AnalyticsData;
    window.getAdvertiserOverview = getAdvertiserOverview;
    window.getPaymentsContent = getPaymentsContent;
    window.getBudgetContent = getBudgetContent;
    window.getMerchantsContent = getMerchantsContent;
}
