/* ============================================
   VAULT PHOENIX MANAGEMENT SYSTEM
   Analytics - Reporting & Performance Metrics (Updated)
   ============================================ */

// ============================================
// ANALYTICS DATA
// ============================================

const AnalyticsData = {
    // Campaign performance
    campaigns: {
        totalActive: 8,
        totalRevenue: 47392,
        totalPlayers: 234,
        totalTokensDistributed: 3666669,
        engagementRate: 87.3,
        averageSessionTime: 12.4
    },
    
    // Advertiser analytics
    advertisers: {
        totalActive: 47,
        totalPending: 12,
        averageRevenue: 1008,
        topPerformer: 'Downtown Plaza',
        retentionRate: 94.2
    },
    
    // Player analytics
    players: {
        totalActive: 234,
        newToday: 18,
        returningUsers: 89.3,
        averageCollections: 8.7,
        topLocation: 'Downtown Phoenix'
    },
    
    // Time series data (last 7 days)
    timeSeries: {
        revenue: [6200, 6800, 7100, 6500, 7300, 6900, 7500],
        players: [198, 212, 224, 219, 231, 227, 234],
        tokens: [420000, 485000, 512000, 498000, 534000, 521000, 556000],
        advertisers: [42, 43, 44, 45, 46, 46, 47],
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    
    // Geographic distribution
    locations: [
        { name: 'Downtown Phoenix', players: 89, collections: 1247, revenue: 15800 },
        { name: 'Scottsdale Area', players: 67, collections: 892, revenue: 11200 },
        { name: 'Tempe/ASU Area', players: 45, collections: 634, revenue: 8500 },
        { name: 'Mesa District', players: 21, collections: 298, revenue: 4200 },
        { name: 'Glendale Zone', players: 12, collections: 167, revenue: 2300 }
    ]
};

// ============================================
// ADVERTISER OVERVIEW (Used in main.js)
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
                <div class="stat-value">Silver</div>
                <div class="stat-change">Active</div>
            </div>
            
            <div class="stat-card">
                <div class="stat-icon">💰</div>
                <div class="stat-label">Monthly Investment</div>
                <div class="stat-value">$650</div>
                <div class="stat-change">Location + Tokens</div>
            </div>
        </div>
        
        <!-- Location Performance -->
        <div class="dashboard-section">
            <h2 class="section-title">📍 Heritage Square Historic Site</h2>
            
            <div class="card">
                <div style="margin-bottom: 20px; padding-bottom: 20px; border-bottom: 2px solid rgba(255,255,255,0.1);">
                    <div style="color: rgba(255,255,255,0.7); margin-bottom: 5px;">Location Address</div>
                    <div style="font-size: 1.2rem; font-weight: 700;">115 N 6th St, Phoenix, AZ 85004</div>
                </div>
                
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px;">
                    <div style="padding: 20px; background: rgba(0,0,0,0.3); border-radius: 12px;">
                        <div style="color: rgba(255,255,255,0.7); font-size: 0.9rem; margin-bottom: 8px;">Campaign Status</div>
                        <div style="display: flex; align-items: center; gap: 10px;">
                            <span class="status-indicator status-live"></span>
                            <span style="font-size: 1.2rem; font-weight: 700; color: #22c55e;">Active & Funded</span>
                        </div>
                    </div>
                    
                    <div style="padding: 20px; background: rgba(0,0,0,0.3); border-radius: 12px;">
                        <div style="color: rgba(255,255,255,0.7); font-size: 0.9rem; margin-bottom: 8px;">Avg Daily Visitors</div>
                        <div style="font-size: 1.8rem; font-weight: 900; color: var(--color-primary-gold);">28</div>
                    </div>
                    
                    <div style="padding: 20px; background: rgba(0,0,0,0.3); border-radius: 12px;">
                        <div style="color: rgba(255,255,255,0.7); font-size: 0.9rem; margin-bottom: 8px;">Engagement Rate</div>
                        <div style="font-size: 1.8rem; font-weight: 900; color: var(--color-primary-gold);">88.4%</div>
                    </div>
                    
                    <div style="padding: 20px; background: rgba(0,0,0,0.3); border-radius: 12px;">
                        <div style="color: rgba(255,255,255,0.7); font-size: 0.9rem; margin-bottom: 8px;">Peak Hours</div>
                        <div style="font-size: 1.2rem; font-weight: 700;">2pm - 5pm</div>
                    </div>
                </div>
            </div>
        </div>
        
        <!-- Quick Actions -->
        <div class="dashboard-section">
            <h3 style="font-size: 1.5rem; color: var(--color-primary-gold); margin-bottom: 20px;">⚡ Quick Actions</h3>
            
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 20px;">
                <button class="btn btn-primary" style="padding: 20px; font-size: 1.1rem;" onclick="loadSection('locations')">
                    📍 Manage Token Locations
                </button>
                <button class="btn btn-secondary" style="padding: 20px; font-size: 1.1rem;" onclick="loadSection('payments')">
                    💳 Payment Center
                </button>
                <button class="btn btn-outline" style="padding: 20px; font-size: 1.1rem;" onclick="loadSection('analytics')">
                    📊 View Full Analytics
                </button>
            </div>
        </div>
        
        <!-- Performance Chart Placeholder -->
        <div class="dashboard-section">
            <h3 style="font-size: 1.5rem; color: var(--color-primary-gold); margin-bottom: 20px;">
                📈 Visitor Trends (Last 30 Days)
            </h3>
            
            <div class="card">
                <div style="height: 300px; background: linear-gradient(135deg, rgba(15, 15, 15, 0.5), rgba(45, 24, 16, 0.5)); border-radius: 12px; display: flex; align-items: center; justify-content: center;">
                    <div style="text-align: center;">
                        <div style="font-size: 3rem; margin-bottom: 15px;">📊</div>
                        <div style="color: rgba(255,255,255,0.7);">Interactive chart showing visitor trends</div>
                        <div style="color: rgba(255,255,255,0.5); font-size: 0.9rem; margin-top: 10px;">
                            Peak day: Saturday with 47 visitors<br>
                            Average: 28 visitors/day
                        </div>
                    </div>
                </div>
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
                        <span style="font-size: 1.1rem;">Location Fee:</span>
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
                        Based on your location's traffic patterns and typical customer engagement. 
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
                    </div>
                    <div style="text-align: center; padding: 20px; background: rgba(0,0,0,0.3); border-radius: 12px;">
                        <div style="color: rgba(255,255,255,0.7); margin-bottom: 8px;">Est. Revenue Generated</div>
                        <div style="font-size: 2rem; font-weight: 900; color: #22c55e;">~$38,115</div>
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
                        measurable foot traffic to your location.
                    </p>
                </div>
                
                <div class="card">
                    <h4 style="color: var(--color-primary-orange); margin-bottom: 15px;">Engaged Audience</h4>
                    <p style="color: rgba(255,255,255,0.7); line-height: 1.6;">
                        Players are actively seeking rewards at your location. They arrive motivated and 
                        ready to engage with your business.
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
                    <div class="stat-value">47</div>
                    <div class="stat-change positive">+5 this month</div>
                </div>
                
                <div class="stat-card">
                    <div class="stat-icon">⏳</div>
                    <div class="stat-label">Pending Approval</div>
                    <div class="stat-value">12</div>
                    <div class="stat-change">Awaiting review</div>
                </div>
                
                <div class="stat-card">
                    <div class="stat-icon">💰</div>
                    <div class="stat-label">Monthly Recurring Revenue</div>
                    <div class="stat-value">$32.4K</div>
                    <div class="stat-change positive">+18% ↑</div>
                </div>
                
                <div class="stat-card">
                    <div class="stat-icon">📊</div>
                    <div class="stat-label">Avg Revenue per Advertiser</div>
                    <div class="stat-value">$689</div>
                    <div class="stat-change">Per month</div>
                </div>
            </div>
            
            <!-- Advertiser Table -->
            <div class="merchants-table-wrapper">
                <table class="merchants-table">
                    <thead>
                        <tr>
                            <th>Advertiser</th>
                            <th>Location</th>
                            <th>Tier</th>
                            <th>Monthly Fee</th>
                            <th>Visitors (30d)</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Heritage Square</td>
                            <td>Downtown Phoenix</td>
                            <td><span class="tier-badge tier-silver">Silver</span></td>
                            <td>$500</td>
                            <td>847</td>
                            <td><span class="badge badge-success">Active</span></td>
                            <td>
                                <button class="btn btn-small btn-outline">View</button>
                            </td>
                        </tr>
                        <tr>
                            <td>Downtown Plaza</td>
                            <td>Phoenix Metro</td>
                            <td><span class="tier-badge tier-platinum">Platinum</span></td>
                            <td>$2,500</td>
                            <td>1,245</td>
                            <td><span class="badge badge-success">Active</span></td>
                            <td>
                                <button class="btn btn-small btn-outline">View</button>
                            </td>
                        </tr>
                        <tr>
                            <td>Scottsdale Mall</td>
                            <td>Scottsdale</td>
                            <td><span class="tier-badge tier-gold">Gold</span></td>
                            <td>$1,200</td>
                            <td>967</td>
                            <td><span class="badge badge-success">Active</span></td>
                            <td>
                                <button class="btn btn-small btn-outline">View</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
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
