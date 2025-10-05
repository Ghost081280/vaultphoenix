/* ============================================
   VAULT PHOENIX MANAGEMENT SYSTEM
   Analytics - QR Scanner Exchange Model - REFACTORED
   ============================================ */

// ============================================
// ANALYTICS DATA - QR EXCHANGE MODEL
// ============================================

const AnalyticsData = {
    // Campaign performance (for $Ember Hunt)
    campaigns: {
        totalActive: 1, // Only $Ember Hunt
        totalRevenue: 500, // Just location fee
        totalPlayers: 847,
        totalTokensDistributed: 21200, // Tokens collected from campaign manager's pools
        engagementRate: 87.3,
        averageSessionTime: 12.4
    },
    
    // Advertiser analytics
    advertisers: {
        totalActive: 1, // Heritage Square
        totalPending: 0,
        averageRevenue: 500, // Location fee only
        topPerformer: 'Heritage Square Historic Site',
        retentionRate: 100,
        totalQRScans: 847, // Players scanning QR codes at location
        tokensReceivedBack: 42350 // $Ember received from players via QR scans
    },
    
    // Player analytics
    players: {
        totalActive: 847,
        newToday: 18,
        returningUsers: 89.3,
        averageCollections: 8.7,
        topLocation: 'Heritage Square Historic Site',
        avgQRScanValue: 50 // Average $Ember exchanged per scan
    },
    
    // Time series data (last 7 days)
    timeSeries: {
        revenue: [500, 500, 500, 500, 500, 500, 500], // Consistent location fee
        players: [720, 750, 780, 800, 820, 835, 847],
        qrScans: [680, 710, 745, 770, 800, 825, 847],
        tokensExchanged: [34000, 35500, 37250, 38500, 40000, 41250, 42350],
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    
    // Geographic distribution
    locations: [
        { 
            name: 'Heritage Square Historic Site', 
            players: 847, 
            qrScans: 847,
            tokensReceived: 42350,
            avgScanValue: 50,
            revenue: 500, 
            type: 'advertiser' 
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
                <div class="stat-icon">📱</div>
                <div class="stat-label">QR Code Scans</div>
                <div class="stat-value">847</div>
                <div class="stat-change positive">Players exchanged $Ember</div>
            </div>
        </div>
        
        <!-- Scanner App Info -->
        <div class="dashboard-section">
            <div class="card" style="background: rgba(34,197,94,0.1); border: 2px solid rgba(34,197,94,0.4);">
                <div style="display: flex; justify-content: space-between; align-items: start; gap: 20px; flex-wrap: wrap;">
                    <div style="flex: 1; min-width: 300px;">
                        <h3 style="color: #22c55e; margin-bottom: 15px; font-size: 1.8rem;">
                            📱 Get Your $Ember Scanner Link
                        </h3>
                        <p style="color: rgba(255,255,255,0.9); font-size: 1.1rem; line-height: 1.6; margin-bottom: 20px;">
                            Access your QR scanner via web link - no app download needed! Use it on any device to accept 
                            $Ember payments from players at your location.
                        </p>
                        
                        <div style="background: rgba(0,0,0,0.3); border-radius: 12px; padding: 20px; margin-bottom: 20px;">
                            <h4 style="color: var(--color-primary-gold); margin-bottom: 15px;">How It Works:</h4>
                            <ul style="list-style: none; padding: 0; margin: 0;">
                                <li style="padding: 10px 0; border-bottom: 1px solid rgba(255,255,255,0.1);">
                                    <strong style="color: #22c55e;">1.</strong> Get your unique scanner web link
                                </li>
                                <li style="padding: 10px 0; border-bottom: 1px solid rgba(255,255,255,0.1);">
                                    <strong style="color: #22c55e;">2.</strong> Players show you their QR code at checkout
                                </li>
                                <li style="padding: 10px 0; border-bottom: 1px solid rgba(255,255,255,0.1);">
                                    <strong style="color: #22c55e;">3.</strong> Open your scanner link on any device
                                </li>
                                <li style="padding: 10px 0; border-bottom: 1px solid rgba(255,255,255,0.1);">
                                    <strong style="color: #22c55e;">4.</strong> Scan their code and enter redemption amount
                                </li>
                                <li style="padding: 10px 0;">
                                    <strong style="color: #22c55e;">5.</strong> $Ember instantly transfers to your account!
                                </li>
                            </ul>
                        </div>
                        
                        <div style="display: flex; gap: 15px; flex-wrap: wrap;">
                            <button class="btn btn-primary btn-large" onclick="loadSection('scanner')">
                                📱 Get Scanner Link
                            </button>
                        </div>
                    </div>
                    
                    <div style="text-align: center;">
                        <div style="width: 200px; height: 200px; background: white; border-radius: 12px; display: flex; align-items: center; justify-content: center; margin-bottom: 15px;">
                            <div style="font-size: 4rem;">📱</div>
                        </div>
                        <div style="color: rgba(255,255,255,0.7); font-size: 0.9rem;">
                            Scan QR code to access<br>your scanner app
                        </div>
                    </div>
                </div>
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
                            <span class="metric-label">QR Scans</span>
                            <span class="metric-value">847</span>
                        </div>
                        <div class="app-metric">
                            <span class="metric-label">$Ember Received</span>
                            <span class="metric-value">42,350</span>
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
                <button class="btn btn-primary" style="padding: 20px; font-size: 1.1rem;" onclick="loadSection('scanner')">
                    📱 Get Scanner Link
                </button>
                <button class="btn btn-secondary" style="padding: 20px; font-size: 1.1rem;" onclick="loadSection('marketplace')">
                    🛒 Browse More Campaigns
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
                        <div style="font-size: 1.5rem; font-weight: 700; margin-bottom: 15px;">
                            $500<span style="font-size: 1rem; color: rgba(255,255,255,0.6);">/month</span>
                        </div>
                        <div style="font-size: 0.9rem; color: rgba(255,255,255,0.7); margin-bottom: 15px;">
                            All features included
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
                        <button class="btn btn-secondary">Add More Locations</button>
                    </div>
                </div>
                
                <!-- $Ember Received via QR Scans -->
                <div class="card">
                    <h3 style="color: var(--color-primary-gold); margin-bottom: 20px; display: flex; align-items: center; gap: 10px;">
                        <span style="font-size: 2rem;">📱</span>
                        $Ember Received (QR Scans)
                    </h3>
                    
                    <div style="background: rgba(0,0,0,0.3); border-radius: 12px; padding: 20px; margin-bottom: 20px;">
                        <div style="color: rgba(255,255,255,0.7); margin-bottom: 10px;">Current Month</div>
                        <div style="font-size: 2rem; font-weight: 900; color: var(--color-primary-gold); margin-bottom: 5px;">
                            42,350 $Ember
                        </div>
                        <div style="font-size: 1.1rem; color: rgba(255,255,255,0.6); margin-bottom: 15px;">
                            ≈ $148.23 USD value
                        </div>
                        
                        <div style="padding-top: 15px; border-top: 1px solid rgba(255,255,255,0.1);">
                            <div style="display: flex; justify-content: space-between; padding: 8px 0;">
                                <span style="color: rgba(255,255,255,0.7);">Total QR Scans:</span>
                                <span style="font-weight: 700;">847</span>
                            </div>
                            <div style="display: flex; justify-content: space-between; padding: 8px 0;">
                                <span style="color: rgba(255,255,255,0.7);">Avg per Scan:</span>
                                <span style="font-weight: 700;">50 $Ember</span>
                            </div>
                            <div style="display: flex; justify-content: space-between; padding: 8px 0;">
                                <span style="color: rgba(255,255,255,0.7);">Growth:</span>
                                <span style="font-weight: 700; color: #22c55e;">+18%</span>
                            </div>
                        </div>
                    </div>
                    
                    <div style="display: flex; flex-direction: column; gap: 10px;">
                        <button class="btn btn-primary" onclick="loadSection('scanner')">Get Scanner Link</button>
                        <button class="btn btn-outline" onclick="convertToUSD()">Convert $Ember to USD</button>
                    </div>
                </div>
            </div>
        </div>
        
        <!-- How The System Works -->
        <div class="dashboard-section">
            <h2 class="section-title">💡 How $Ember Exchange Works</h2>
            
            <div class="card" style="background: rgba(240,165,0,0.1); border: 2px solid rgba(240,165,0,0.3);">
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 25px;">
                    <div style="padding: 20px; background: rgba(0,0,0,0.3); border-radius: 12px;">
                        <div style="font-size: 2.5rem; margin-bottom: 15px;">1️⃣</div>
                        <h4 style="color: var(--color-primary-gold); margin-bottom: 10px;">Players Collect Tokens</h4>
                        <p style="color: rgba(255,255,255,0.8); margin: 0; line-height: 1.6;">
                            Players find and collect $Ember tokens at your location by playing the AR game. 
                            They accumulate $Ember in their wallet.
                        </p>
                    </div>
                    
                    <div style="padding: 20px; background: rgba(0,0,0,0.3); border-radius: 12px;">
                        <div style="font-size: 2.5rem; margin-bottom: 15px;">2️⃣</div>
                        <h4 style="color: var(--color-primary-gold); margin-bottom: 10px;">They Visit Your Location</h4>
                        <p style="color: rgba(255,255,255,0.8); margin: 0; line-height: 1.6;">
                            Players come to your physical location to redeem their $Ember for your products, 
                            services, or special offers.
                        </p>
                    </div>
                    
                    <div style="padding: 20px; background: rgba(0,0,0,0.3); border-radius: 12px;">
                        <div style="font-size: 2.5rem; margin-bottom: 15px;">3️⃣</div>
                        <h4 style="color: var(--color-primary-gold); margin-bottom: 10px;">Scan Their QR Code</h4>
                        <p style="color: rgba(255,255,255,0.8); margin: 0; line-height: 1.6;">
                            Use the Scanner web app to scan the player's QR code and enter the $Ember amount 
                            they're spending with you.
                        </p>
                    </div>
                    
                    <div style="padding: 20px; background: rgba(0,0,0,0.3); border-radius: 12px;">
                        <div style="font-size: 2.5rem; margin-bottom: 15px;">4️⃣</div>
                        <h4 style="color: var(--color-primary-gold); margin-bottom: 10px;">Receive $Ember</h4>
                        <p style="color: rgba(255,255,255,0.8); margin: 0; line-height: 1.6;">
                            The $Ember instantly transfers from the player's wallet to your advertiser account. 
                            Track all transactions in real-time!
                        </p>
                    </div>
                </div>
                
                <div style="margin-top: 30px; padding: 25px; background: rgba(34,197,94,0.15); border: 2px solid rgba(34,197,94,0.4); border-radius: 12px;">
                    <h4 style="color: #22c55e; margin-bottom: 15px; font-size: 1.3rem;">💰 The Circular Economy</h4>
                    <p style="color: rgba(255,255,255,0.9); margin: 0; font-size: 1.05rem; line-height: 1.7;">
                        Campaign managers fund token pools → Players collect tokens at your location → 
                        Players spend tokens with you for products/services → You receive $Ember back → 
                        Convert to USD or hold for future use. This creates verified foot traffic and real customer engagement!
                    </p>
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
                            <td>Monthly - All Features</td>
                            <td>$500.00</td>
                            <td><span class="badge badge-success">Paid</span></td>
                        </tr>
                        <tr>
                            <td>Sep 4, 2025</td>
                            <td>Location Fee</td>
                            <td>Monthly - All Features</td>
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
// ADVERTISER BUDGET/ROI CONTENT - UPDATED
// ============================================

function getBudgetContent(role) {
    if (role !== 'advertiser') {
        return getPlaceholderContent('budget');
    }
    
    // Calculate ROI based on QR scan model
    const monthlyLocationFee = 500;
    const qrScansPerMonth = 847;
    const avgEmberPerScan = 50;
    const totalEmberReceived = qrScansPerMonth * avgEmberPerScan;
    const emberPrice = 0.0035;
    const totalEmberValue = totalEmberReceived * emberPrice;
    const avgSpendPerVisitor = 45; // Average customer spend at location
    const totalRevenue = qrScansPerMonth * avgSpendPerVisitor;
    const roi = ((totalRevenue - monthlyLocationFee) / monthlyLocationFee * 100).toFixed(1);
    
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
                        ${roi}%
                    </div>
                    <div style="font-size: 1.5rem; color: #22c55e; font-weight: 700;">
                        Return on Campaign Investment! 🎉
                    </div>
                </div>
                
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px; margin-top: 30px;">
                    <div style="text-align: center; padding: 20px; background: rgba(0,0,0,0.3); border-radius: 12px;">
                        <div style="color: rgba(255,255,255,0.7); margin-bottom: 8px;">Monthly Location Fee</div>
                        <div style="font-size: 2rem; font-weight: 900; color: var(--color-primary-gold);">$${monthlyLocationFee}</div>
                        <div style="font-size: 0.85rem; color: rgba(255,255,255,0.5); margin-top: 5px;">Your only cost</div>
                    </div>
                    <div style="text-align: center; padding: 20px; background: rgba(0,0,0,0.3); border-radius: 12px;">
                        <div style="color: rgba(255,255,255,0.7); margin-bottom: 8px;">QR Code Scans</div>
                        <div style="font-size: 2rem; font-weight: 900; color: #22c55e;">${qrScansPerMonth.toLocaleString()}</div>
                        <div style="font-size: 0.85rem; color: rgba(255,255,255,0.5); margin-top: 5px;">Verified visitors</div>
                    </div>
                    <div style="text-align: center; padding: 20px; background: rgba(0,0,0,0.3); border-radius: 12px;">
                        <div style="color: rgba(255,255,255,0.7); margin-bottom: 8px;">Est. Revenue Generated</div>
                        <div style="font-size: 2rem; font-weight: 900; color: #22c55e;">~$${totalRevenue.toLocaleString()}</div>
                        <div style="font-size: 0.85rem; color: rgba(255,255,255,0.5); margin-top: 5px;">From QR visitors</div>
                    </div>
                </div>
            </div>
        </div>
        
        <!-- Detailed Breakdown -->
        <div class="dashboard-section">
            <h3 style="font-size: 1.5rem; color: var(--color-primary-gold); margin-bottom: 20px;">
                📊 Revenue Breakdown
            </h3>
            
            <div class="apps-grid">
                <div class="card">
                    <h4 style="color: var(--color-primary-orange); margin-bottom: 15px;">Customer Visits</h4>
                    <div style="font-size: 2.5rem; font-weight: 900; color: var(--color-primary-gold); margin-bottom: 10px;">
                        ${qrScansPerMonth}
                    </div>
                    <p style="color: rgba(255,255,255,0.7); line-height: 1.6; margin-bottom: 15px;">
                        GPS-verified visitors who scanned QR codes at your location this month.
                    </p>
                    <div style="padding: 15px; background: rgba(0,0,0,0.3); border-radius: 8px;">
                        <div style="display: flex; justify-content: space-between; padding: 5px 0;">
                            <span style="color: rgba(255,255,255,0.6);">Avg per Day:</span>
                            <span style="font-weight: 700;">${Math.round(qrScansPerMonth / 30)}</span>
                        </div>
                        <div style="display: flex; justify-content: space-between; padding: 5px 0;">
                            <span style="color: rgba(255,255,255,0.6);">Peak Day:</span>
                            <span style="font-weight: 700;">47 visits</span>
                        </div>
                    </div>
                </div>
                
                <div class="card">
                    <h4 style="color: var(--color-primary-orange); margin-bottom: 15px;">$Ember Received</h4>
                    <div style="font-size: 2.5rem; font-weight: 900; color: var(--color-primary-gold); margin-bottom: 10px;">
                        ${totalEmberReceived.toLocaleString()}
                    </div>
                    <p style="color: rgba(255,255,255,0.7); line-height: 1.6; margin-bottom: 15px;">
                        Total $Ember received from players via QR code exchanges.
                    </p>
                    <div style="padding: 15px; background: rgba(0,0,0,0.3); border-radius: 8px;">
                        <div style="display: flex; justify-content: space-between; padding: 5px 0;">
                            <span style="color: rgba(255,255,255,0.6);">USD Value:</span>
                            <span style="font-weight: 700;">$${totalEmberValue.toFixed(2)}</span>
                        </div>
                        <div style="display: flex; justify-content: space-between; padding: 5px 0;">
                            <span style="color: rgba(255,255,255,0.6);">Avg per Scan:</span>
                            <span style="font-weight: 700;">${avgEmberPerScan} $Ember</span>
                        </div>
                    </div>
                </div>
                
                <div class="card">
                    <h4 style="color: var(--color-primary-orange); margin-bottom: 15px;">Revenue Impact</h4>
                    <div style="font-size: 2.5rem; font-weight: 900; color: #22c55e; margin-bottom: 10px;">
                        $${totalRevenue.toLocaleString()}
                    </div>
                    <p style="color: rgba(255,255,255,0.7); line-height: 1.6; margin-bottom: 15px;">
                        Estimated revenue from ${qrScansPerMonth} verified customers.
                    </p>
                    <div style="padding: 15px; background: rgba(0,0,0,0.3); border-radius: 8px;">
                        <div style="display: flex; justify-content: space-between; padding: 5px 0;">
                            <span style="color: rgba(255,255,255,0.6);">Avg Spend:</span>
                            <span style="font-weight: 700;">$${avgSpendPerVisitor}</span>
                        </div>
                        <div style="display: flex; justify-content: space-between; padding: 5px 0;">
                            <span style="color: rgba(255,255,255,0.6);">Net Profit:</span>
                            <span style="font-weight: 700; color: #22c55e;">$${(totalRevenue - monthlyLocationFee).toLocaleString()}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        <!-- Why It Works -->
        <div class="dashboard-section">
            <h3 style="font-size: 1.5rem; color: var(--color-primary-gold); margin-bottom: 20px;">
                💡 Why The QR Exchange Model Works
            </h3>
            
            <div class="apps-grid">
                <div class="card">
                    <h4 style="color: var(--color-primary-orange); margin-bottom: 15px;">GPS-Verified Traffic</h4>
                    <p style="color: rgba(255,255,255,0.7); line-height: 1.6;">
                        Every QR scan is GPS-verified. You only get foot traffic from real people who physically 
                        visited your location. No bots, no fraud - just real customers.
                    </p>
                </div>
                
                <div class="card">
                    <h4 style="color: var(--color-primary-orange); margin-bottom: 15px;">Pre-Qualified Customers</h4>
                    <p style="color: rgba(255,255,255,0.7); line-height: 1.6;">
                        Players arrive with $Ember they want to spend. They're not just browsing - they came specifically 
                        to redeem their tokens with you. High intent = high conversion.
                    </p>
                </div>
                
                <div class="card">
                    <h4 style="color: var(--color-primary-orange); margin-bottom: 15px;">Circular Economy</h4>
                    <p style="color: rgba(255,255,255,0.7); line-height: 1.6;">
                        Players collect tokens, spend them with you, you receive $Ember back. You can convert to USD 
                        or hold the tokens. Either way, you're getting real customers and revenue.
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
                    <div class="stat-value">$500</div>
                    <div class="stat-change positive">From location fees</div>
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
                <h3 style="margin-bottom: 20px;">Active Advertisers</h3>
                
                <div class="merchants-table-wrapper">
                    <table class="merchants-table">
                        <thead>
                            <tr>
                                <th>Advertiser</th>
                                <th>Campaign</th>
                                <th>Locations</th>
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

// ============================================
// UTILITY FUNCTIONS
// ============================================

function convertToUSD() {
    alert(`💱 Convert $Ember to USD\n\nYou can convert your received $Ember to USD at any time:\n\n• Current balance: 42,350 $Ember\n• Current value: ~$148.23 USD\n• Market price: $0.0035 per $Ember\n\nConvert via your wallet or hold for potential appreciation!`);
}

// Export functions
if (typeof window !== 'undefined') {
    window.AnalyticsData = AnalyticsData;
    window.getAdvertiserOverview = getAdvertiserOverview;
    window.getPaymentsContent = getPaymentsContent;
    window.getBudgetContent = getBudgetContent;
    window.getMerchantsContent = getMerchantsContent;
    window.convertToUSD = convertToUSD;
}
