/* ============================================
   VAULT PHOENIX MANAGEMENT SYSTEM
   Airdrop System - With Campaign Selection & Timer
   ============================================ */

// ============================================
// AIRDROP CONFIGURATION
// ============================================

const AirdropSystem = {
    // Active airdrops with timers
    activeAirdrops: [
        {
            id: 'airdrop-001',
            campaignId: 'camp-001',
            campaignName: '$Ember Hunt',
            amount: 500,
            target: 'area',
            location: 'Downtown Phoenix',
            recipients: 12,
            claimTimer: 1800, // 30 minutes in seconds
            timestamp: new Date(Date.now() - 47000),
            status: 'active',
            claimed: 8,
            unclaimed: 4
        },
        {
            id: 'airdrop-002',
            campaignId: 'camp-001',
            campaignName: '$Ember Hunt',
            amount: 1000,
            target: 'all',
            location: 'All Players',
            recipients: 47,
            claimTimer: 3600, // 60 minutes
            timestamp: new Date(Date.now() - 3600000),
            status: 'completed',
            claimed: 41,
            unclaimed: 6
        }
    ],
    
    // Pending airdrop requests from advertisers
    pendingRequests: [
        {
            id: 'req-001',
            campaignId: 'camp-001',
            campaignName: '$Ember Hunt',
            advertiser: 'Heritage Square Historic Site',
            amount: 500,
            radius: 1,
            location: 'Heritage Square',
            estimatedRecipients: 34,
            message: 'Visit Heritage Square and claim your bonus tokens!',
            requestedTime: 'peak',
            status: 'pending',
            submittedAt: new Date(Date.now() - 7200000)
        }
    ],
    
    // Scheduled airdrops (removed - see warning system instead)
    scheduledAirdrops: [],
    
    // Airdrop history
    totalAirdrops: 156,
    totalTokensDistributed: 3666669,
    
    // Targeting options
    targetingOptions: ['all', 'area', 'players', 'new-users', 'high-activity'],
    
    // Timer presets (in minutes)
    timerPresets: [
        { label: '15 minutes', value: 900 },
        { label: '30 minutes', value: 1800 },
        { label: '1 hour', value: 3600 },
        { label: '2 hours', value: 7200 },
        { label: '4 hours', value: 14400 },
        { label: '24 hours', value: 86400 }
    ]
};

// ============================================
// CAMPAIGN MANAGER: AIRDROP CENTER
// ============================================

/**
 * Get airdrop center content for Campaign Manager
 */
function getAirdropsContent(role) {
    if (role !== 'campaign-manager') {
        return getPlaceholderContent('airdrops');
    }
    
    // Get unique campaigns (in real app, this would come from database)
    const campaigns = [
        { id: 'camp-001', name: '$Ember Hunt', activePlayers: 847 },
        { id: 'camp-002', name: 'Desert Quest AR', activePlayers: 423 }
    ];
    
    return `
        <div class="dashboard-section">
            <h2 class="section-title">🎯 Airdrop Control Center</h2>
            
            <!-- Airdrop Stats -->
            <div class="hero-stats">
                <div class="stat-card">
                    <div class="stat-icon">🎁</div>
                    <div class="stat-label">Total Airdrops Sent</div>
                    <div class="stat-value">${AirdropSystem.totalAirdrops}</div>
                    <div class="stat-change positive">+8 today</div>
                </div>
                
                <div class="stat-card">
                    <div class="stat-icon">💎</div>
                    <div class="stat-label">Tokens Distributed</div>
                    <div class="stat-value">${window.formatTokens ? window.formatTokens(AirdropSystem.totalTokensDistributed) : AirdropSystem.totalTokensDistributed.toLocaleString()}</div>
                    <div class="stat-change">$Ember</div>
                </div>
                
                <div class="stat-card">
                    <div class="stat-icon">👥</div>
                    <div class="stat-label">Recipients (24h)</div>
                    <div class="stat-value">234</div>
                    <div class="stat-change positive">+12%</div>
                </div>
                
                <div class="stat-card">
                    <div class="stat-icon">⏰</div>
                    <div class="stat-label">Pending Requests</div>
                    <div class="stat-value">${AirdropSystem.pendingRequests.length}</div>
                    <div class="stat-change">From advertisers</div>
                </div>
            </div>
        </div>
        
        <!-- Pending Advertiser Requests -->
        ${AirdropSystem.pendingRequests.length > 0 ? `
            <div class="dashboard-section">
                <h3 style="font-size: 1.5rem; color: var(--color-primary-gold); margin-bottom: 20px;">
                    📬 Pending Airdrop Requests from Advertisers (${AirdropSystem.pendingRequests.length})
                </h3>
                
                ${AirdropSystem.pendingRequests.map(req => `
                    <div class="card" style="margin-bottom: 20px; border: 2px solid rgba(240,165,0,0.5);">
                        <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 15px; flex-wrap: wrap; gap: 15px;">
                            <div>
                                <h4 style="color: var(--color-primary-gold); margin-bottom: 5px;">${req.advertiser}</h4>
                                <div style="color: rgba(255,255,255,0.7); font-size: 0.9rem;">
                                    Campaign: ${req.campaignName} • Location: ${req.location}
                                </div>
                                <div style="color: rgba(255,255,255,0.5); font-size: 0.85rem; margin-top: 3px;">
                                    Requested ${formatRelativeTime(req.submittedAt)}
                                </div>
                            </div>
                            <span class="badge badge-warning">Pending Approval</span>
                        </div>
                        
                        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 15px; margin-bottom: 15px; padding: 15px; background: rgba(0,0,0,0.3); border-radius: 8px;">
                            <div>
                                <div style="font-size: 0.85rem; color: rgba(255,255,255,0.6);">Amount</div>
                                <div style="font-size: 1.3rem; font-weight: 900; color: var(--color-primary-gold);">${req.amount.toLocaleString()} $Ember</div>
                            </div>
                            <div>
                                <div style="font-size: 0.85rem; color: rgba(255,255,255,0.6);">Radius</div>
                                <div style="font-size: 1.3rem; font-weight: 900;">${req.radius} mile(s)</div>
                            </div>
                            <div>
                                <div style="font-size: 0.85rem; color: rgba(255,255,255,0.6);">Est. Recipients</div>
                                <div style="font-size: 1.3rem; font-weight: 900;">${req.estimatedRecipients}</div>
                            </div>
                            <div>
                                <div style="font-size: 0.85rem; color: rgba(255,255,255,0.6);">Total Cost</div>
                                <div style="font-size: 1.3rem; font-weight: 900; color: #fb923c;">${(req.amount * req.estimatedRecipients).toLocaleString()}</div>
                            </div>
                        </div>
                        
                        ${req.message ? `
                            <div style="background: rgba(59,130,246,0.1); border: 1px solid rgba(59,130,246,0.3); border-radius: 8px; padding: 12px; margin-bottom: 15px;">
                                <div style="font-size: 0.85rem; color: rgba(255,255,255,0.6); margin-bottom: 5px;">Advertiser Message:</div>
                                <div style="color: rgba(255,255,255,0.9);">${req.message}</div>
                            </div>
                        ` : ''}
                        
                        <div style="display: flex; gap: 10px; flex-wrap: wrap;">
                            <button class="btn btn-primary" onclick="approveAdvertiserAirdrop('${req.id}')">
                                ✓ Approve & Send Now
                            </button>
                            <button class="btn btn-secondary" onclick="editAdvertiserAirdrop('${req.id}')">
                                Edit Amount/Recipients
                            </button>
                            <button class="btn btn-outline" onclick="rejectAdvertiserAirdrop('${req.id}')" style="background: rgba(239,68,68,0.2); border-color: #ef4444;">
                                ✗ Reject
                            </button>
                        </div>
                    </div>
                `).join('')}
            </div>
        ` : ''}
        
        <!-- Quick Airdrop Panel -->
        <div class="dashboard-section">
            <h3 style="font-size: 1.5rem; color: var(--color-primary-gold); margin-bottom: 20px;">
                ⚡ Send Airdrop
            </h3>
            
            <div class="card">
                <form onsubmit="sendQuickAirdrop(event)" id="quickAirdropForm">
                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 20px; margin-bottom: 20px;">
                        <div class="form-group">
                            <label class="form-label">Select Campaign *</label>
                            <select class="form-input" id="airdropCampaign" onchange="updateCampaignPlayers()">
                                ${campaigns.map(c => 
                                    `<option value="${c.id}">${c.name} (${c.activePlayers} active players)</option>`
                                ).join('')}
                            </select>
                            <div class="form-hint">Choose which campaign to send the airdrop to</div>
                        </div>
                        
                        <div class="form-group">
                            <label class="form-label">Amount ($Ember per player) *</label>
                            <input type="number" class="form-input" id="airdropAmount" value="500" min="1" step="1" required onchange="updateTargetDetails()">
                        </div>
                        
                        <div class="form-group">
                            <label class="form-label">Claim Timer *</label>
                            <select class="form-input" id="airdropTimer">
                                ${AirdropSystem.timerPresets.map(preset => 
                                    `<option value="${preset.value}" ${preset.value === 1800 ? 'selected' : ''}>${preset.label}</option>`
                                ).join('')}
                            </select>
                            <div class="form-hint">Players must claim within this time</div>
                        </div>
                    </div>
                    
                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 20px; margin-bottom: 20px;">
                        <div class="form-group">
                            <label class="form-label">Target Audience *</label>
                            <select class="form-input" id="airdropTarget" onchange="updateTargetDetails()">
                                <option value="all">All Active Players</option>
                                <option value="area">Specific Area</option>
                                <option value="players">Selected Players</option>
                                <option value="new-users">New Users (Last 7 Days)</option>
                                <option value="high-activity">High Activity Users</option>
                            </select>
                        </div>
                        
                        <div class="form-group" id="areaSelectGroup" style="display: none;">
                            <label class="form-label">Select Area</label>
                            <select class="form-input" id="airdropArea" onchange="updateTargetDetails()">
                                <option value="downtown">Downtown Phoenix</option>
                                <option value="scottsdale">Scottsdale Area</option>
                                <option value="tempe">Tempe/ASU Area</option>
                                <option value="mesa">Mesa District</option>
                                <option value="glendale">Glendale Zone</option>
                            </select>
                        </div>
                    </div>
                    
                    <!-- Target Summary -->
                    <div id="targetSummary" style="background: rgba(240,165,0,0.1); border: 1px solid rgba(240,165,0,0.3); border-radius: 12px; padding: 15px; margin-bottom: 20px;">
                        <div style="font-weight: 700; margin-bottom: 10px;">Airdrop Summary</div>
                        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 15px;">
                            <div>
                                <div style="color: rgba(255,255,255,0.6); font-size: 0.9rem;">Campaign</div>
                                <div style="font-size: 1.3rem; font-weight: 700; color: var(--color-primary-gold);" id="summaryCapaign">$Ember Hunt</div>
                            </div>
                            <div>
                                <div style="color: rgba(255,255,255,0.6); font-size: 0.9rem;">Est. Recipients</div>
                                <div style="font-size: 1.5rem; font-weight: 700; color: var(--color-primary-gold);" id="estimatedRecipients">47</div>
                            </div>
                            <div>
                                <div style="color: rgba(255,255,255,0.6); font-size: 0.9rem;">Total Cost</div>
                                <div style="font-size: 1.5rem; font-weight: 700; color: var(--color-primary-gold);" id="totalCost">23,500 $Ember</div>
                            </div>
                            <div>
                                <div style="color: rgba(255,255,255,0.6); font-size: 0.9rem;">Claim Timer</div>
                                <div style="font-size: 1.3rem; font-weight: 700; color: #fb923c;" id="claimTimerDisplay">30 minutes</div>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Message (Optional) -->
                    <div class="form-group">
                        <label class="form-label">Custom Message (Optional)</label>
                        <textarea class="form-input" id="airdropMessage" rows="3" placeholder="Add a custom message to your airdrop..."></textarea>
                    </div>
                    
                    <div style="display: flex; gap: 15px; margin-top: 25px; flex-wrap: wrap;">
                        <button type="submit" class="btn btn-primary btn-large">
                            🎁 Send Airdrop Now
                        </button>
                        <button type="button" class="btn btn-outline" onclick="showFutureAirdropWarning()">
                            ⏰ About Scheduling
                        </button>
                    </div>
                </form>
            </div>
        </div>
        
        <!-- Active Airdrops -->
        <div class="dashboard-section">
            <h3 style="font-size: 1.5rem; color: var(--color-primary-gold); margin-bottom: 20px;">
                📊 Active Airdrops (With Claim Timers)
            </h3>
            
            ${AirdropSystem.activeAirdrops.filter(a => a.status === 'active').map(airdrop => `
                <div class="card" style="margin-bottom: 15px; border: 2px solid rgba(34,197,94,0.5);">
                    <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 15px; flex-wrap: wrap; gap: 15px;">
                        <div>
                            <div style="font-weight: 700; font-size: 1.2rem; margin-bottom: 5px;">
                                ${airdrop.amount.toLocaleString()} $Ember per player
                            </div>
                            <div style="color: rgba(255,255,255,0.7); font-size: 0.9rem;">
                                Campaign: ${airdrop.campaignName} • ${airdrop.location} • ${airdrop.recipients} recipients
                            </div>
                            <div style="color: rgba(255,255,255,0.5); font-size: 0.85rem; margin-top: 3px;">
                                Sent ${getRelativeTime(airdrop.timestamp)}
                            </div>
                        </div>
                        <span class="badge badge-success">
                            <span class="status-indicator status-live"></span>
                            ACTIVE
                        </span>
                    </div>
                    
                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 15px; padding: 15px; background: rgba(0,0,0,0.3); border-radius: 8px;">
                        <div>
                            <div style="font-size: 0.85rem; color: rgba(255,255,255,0.6);">Claim Timer</div>
                            <div style="font-size: 1.3rem; font-weight: 900; color: #fb923c;" id="timer_${airdrop.id}">
                                ${formatTimer(airdrop.claimTimer)}
                            </div>
                        </div>
                        <div>
                            <div style="font-size: 0.85rem; color: rgba(255,255,255,0.6);">Claimed</div>
                            <div style="font-size: 1.3rem; font-weight: 900; color: #22c55e;">${airdrop.claimed}</div>
                        </div>
                        <div>
                            <div style="font-size: 0.85rem; color: rgba(255,255,255,0.6);">Unclaimed</div>
                            <div style="font-size: 1.3rem; font-weight: 900; color: #fb923c;">${airdrop.unclaimed}</div>
                        </div>
                        <div>
                            <div style="font-size: 0.85rem; color: rgba(255,255,255,0.6);">Claim Rate</div>
                            <div style="font-size: 1.3rem; font-weight: 900; color: var(--color-primary-gold);">
                                ${Math.round((airdrop.claimed / airdrop.recipients) * 100)}%
                            </div>
                        </div>
                    </div>
                    
                    <button class="btn btn-small btn-outline" onclick="viewAirdropDetails('${airdrop.id}')" style="margin-top: 15px;">
                        View Details
                    </button>
                </div>
            `).join('')}
        </div>
        
        <!-- Recent Completed Airdrops -->
        <div class="dashboard-section">
            <h3 style="font-size: 1.5rem; color: var(--color-primary-gold); margin-bottom: 20px;">
                📜 Recent Completed Airdrops
            </h3>
            
            <div class="card">
                ${AirdropSystem.activeAirdrops.filter(a => a.status === 'completed').map(airdrop => `
                    <div style="padding: 15px; border-bottom: 1px solid rgba(255,255,255,0.1); display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 15px;">
                        <div>
                            <div style="font-weight: 700; margin-bottom: 5px;">
                                ${airdrop.amount.toLocaleString()} $Ember • ${airdrop.campaignName}
                                <span class="badge badge-success" style="margin-left: 10px;">${airdrop.status}</span>
                            </div>
                            <div style="color: rgba(255,255,255,0.6); font-size: 0.9rem;">
                                ${airdrop.location} • ${airdrop.claimed}/${airdrop.recipients} claimed (${Math.round((airdrop.claimed / airdrop.recipients) * 100)}%)
                            </div>
                        </div>
                        <button class="btn btn-small btn-outline" onclick="viewAirdropDetails('${airdrop.id}')">
                            View Details
                        </button>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
}

// ============================================
// ADVERTISER: AIRDROP REQUESTS
// ============================================

/**
 * Get airdrop requests content for Advertisers
 */
function getAirdropRequestsContent(role) {
    if (role !== 'advertiser') {
        return getPlaceholderContent('airdrop-requests');
    }
    
    // Get advertiser's campaigns
    const campaigns = [
        { id: 'camp-001', name: '$Ember Hunt', activePlayers: 847 }
    ];
    
    return `
        <div class="dashboard-section">
            <h2 class="section-title">🎁 Request Player Airdrop</h2>
            
            <div class="card" style="background: rgba(240,165,0,0.1); border: 2px solid rgba(240,165,0,0.3); margin-bottom: 30px;">
                <h3 style="color: var(--color-primary-gold); margin-bottom: 15px;">What is a Player Airdrop?</h3>
                <p style="color: rgba(255,255,255,0.8); line-height: 1.6; margin-bottom: 15px;">
                    Request the campaign manager to airdrop tokens directly to players near your location. This drives immediate foot traffic and increases engagement.
                </p>
                <ul style="list-style: none; padding: 0; color: rgba(255,255,255,0.8);">
                    <li style="padding: 5px 0;">✓ Tokens sent to active players in your area</li>
                    <li style="padding: 5px 0;">✓ Players receive push notification with claim timer</li>
                    <li style="padding: 5px 0;">✓ Increases immediate foot traffic</li>
                    <li style="padding: 5px 0;">✓ Campaign manager approves and executes</li>
                </ul>
            </div>
            
            <div class="card">
                <h3 style="margin-bottom: 20px;">📝 Submit Airdrop Request</h3>
                
                <div class="form-group">
                    <label class="form-label">Select Campaign *</label>
                    <select class="form-input" id="advAirdropCampaign">
                        ${campaigns.map(c => 
                            `<option value="${c.id}">${c.name} (${c.activePlayers} active players)</option>`
                        ).join('')}
                    </select>
                </div>
                
                <div class="form-group">
                    <label class="form-label">Your Location *</label>
                    <select class="form-input" id="airdropLocation">
                        <option value="adv-loc-001">Heritage Square Historic Site</option>
                    </select>
                </div>
                
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-bottom: 20px;">
                    <div class="form-group">
                        <label class="form-label">Requested Token Amount *</label>
                        <input type="number" class="form-input" id="airdropAmountAdv" value="500" min="100" step="100">
                        <div class="form-hint">Amount per player</div>
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label">Target Radius</label>
                        <select class="form-input" id="airdropRadiusAdv">
                            <option value="0.5">0.5 miles</option>
                            <option value="1" selected>1 mile</option>
                            <option value="2">2 miles</option>
                            <option value="5">5 miles</option>
                        </select>
                    </div>
                </div>
                
                <div class="form-group">
                    <label class="form-label">Message to Players</label>
                    <textarea class="form-input" id="airdropMessageAdv" rows="3" placeholder="Visit Heritage Square and claim your bonus tokens! Limited time offer."></textarea>
                </div>
                
                <div class="form-group">
                    <label class="form-label">Preferred Time</label>
                    <select class="form-input" id="airdropTimeAdv">
                        <option value="now">Send Immediately</option>
                        <option value="peak">Peak Hours (2pm-5pm)</option>
                        <option value="evening">Evening (5pm-8pm)</option>
                        <option value="weekend">Next Weekend</option>
                    </select>
                    <div class="form-hint" style="color: #fb923c; margin-top: 8px;">
                        ⚠️ Note: Campaign manager must approve before airdrop is sent
                    </div>
                </div>
                
                <button class="btn btn-primary btn-large" onclick="submitAirdropRequest()" style="width: 100%;">
                    🎁 Submit Airdrop Request
                </button>
            </div>
            
            <div class="card" style="margin-top: 30px;">
                <h3 style="margin-bottom: 20px;">📋 My Airdrop Requests</h3>
                
                <div style="padding: 15px; background: rgba(0,0,0,0.3); border-radius: 8px; margin-bottom: 10px;">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px; flex-wrap: wrap; gap: 10px;">
                        <div>
                            <div style="font-weight: 700;">500 $Ember - 1 mile radius • $Ember Hunt</div>
                            <div style="font-size: 0.9rem; color: rgba(255,255,255,0.6);">Oct 5, 2025 10:30 AM</div>
                        </div>
                        <span class="badge badge-warning">Pending Approval</span>
                    </div>
                    <div style="font-size: 0.9rem; color: rgba(255,255,255,0.7);">
                        Awaiting campaign manager approval • Est. 34 recipients
                    </div>
                </div>
                
                <div style="padding: 15px; background: rgba(0,0,0,0.3); border-radius: 8px;">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px; flex-wrap: wrap; gap: 10px;">
                        <div>
                            <div style="font-weight: 700;">1,000 $Ember - 1 mile radius • $Ember Hunt</div>
                            <div style="font-size: 0.9rem; color: rgba(255,255,255,0.6);">Oct 3, 2025 2:30 PM</div>
                        </div>
                        <span class="badge badge-success">Approved</span>
                    </div>
                    <div style="font-size: 0.9rem; color: rgba(255,255,255,0.7);">
                        Result: 47 players received tokens, 34 visited location
                    </div>
                </div>
            </div>
        </div>
    `;
}

// ============================================
// HELPER FUNCTIONS
// ============================================

/**
 * Update campaign players display
 */
function updateCampaignPlayers() {
    const campaignId = document.getElementById('airdropCampaign')?.value;
    // In real app, would fetch player count for selected campaign
    updateTargetDetails();
}

/**
 * Update target details based on selection
 */
function updateTargetDetails() {
    const target = document.getElementById('airdropTarget')?.value;
    const areaGroup = document.getElementById('areaSelectGroup');
    const amount = parseInt(document.getElementById('airdropAmount')?.value) || 500;
    const timer = parseInt(document.getElementById('airdropTimer')?.value) || 1800;
    
    // Show/hide area selector
    if (areaGroup) {
        areaGroup.style.display = target === 'area' ? 'block' : 'none';
    }
    
    // Update estimated recipients
    let recipients = 47;
    if (target === 'area') recipients = 12;
    else if (target === 'players') recipients = 5;
    else if (target === 'new-users') recipients = 23;
    else if (target === 'high-activity') recipients = 18;
    
    const estimatedRecipients = document.getElementById('estimatedRecipients');
    if (estimatedRecipients) {
        estimatedRecipients.textContent = recipients;
    }
    
    // Update total cost
    const totalCost = document.getElementById('totalCost');
    if (totalCost) {
        totalCost.textContent = `${(amount * recipients).toLocaleString()} $Ember`;
    }
    
    // Update timer display
    const timerDisplay = document.getElementById('claimTimerDisplay');
    if (timerDisplay) {
        timerDisplay.textContent = formatTimer(timer);
    }
}

/**
 * Format timer for display
 */
function formatTimer(seconds) {
    if (seconds >= 3600) {
        const hours = Math.floor(seconds / 3600);
        return `${hours} hour${hours > 1 ? 's' : ''}`;
    } else if (seconds >= 60) {
        const minutes = Math.floor(seconds / 60);
        return `${minutes} minute${minutes > 1 ? 's' : ''}`;
    }
    return `${seconds} seconds`;
}

/**
 * Get relative time string
 */
function getRelativeTime(date) {
    const seconds = Math.floor((new Date() - date) / 1000);
    
    if (seconds < 60) return `${seconds} seconds ago`;
    if (seconds < 3600) return `${Math.floor(seconds / 60)} minutes ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)} hours ago`;
    return `${Math.floor(seconds / 86400)} days ago`;
}

/**
 * Format relative time
 */
function formatRelativeTime(date) {
    return getRelativeTime(date);
}

/**
 * Send quick airdrop
 */
function sendQuickAirdrop(event) {
    event.preventDefault();
    
    const campaignId = document.getElementById('airdropCampaign')?.value;
    const campaignText = document.getElementById('airdropCampaign')?.selectedOptions[0]?.text || '';
    const amount = parseInt(document.getElementById('airdropAmount')?.value) || 0;
    const timer = parseInt(document.getElementById('airdropTimer')?.value) || 1800;
    const target = document.getElementById('airdropTarget')?.value;
    const message = document.getElementById('airdropMessage')?.value || '';
    
    const recipientsEl = document.getElementById('estimatedRecipients');
    const recipients = parseInt(recipientsEl?.textContent) || 0;
    
    const totalTokens = amount * recipients;
    
    const targetName = target === 'all' ? 'All Active Players' : 
                       target.charAt(0).toUpperCase() + target.slice(1).replace('-', ' ');
    
    if (!confirm(`Send Airdrop to ${campaignText}?\n\n` +
        `Amount: ${amount.toLocaleString()} $Ember per recipient\n` +
        `Target: ${targetName}\n` +
        `Recipients: ${recipients}\n` +
        `Claim Timer: ${formatTimer(timer)}\n` +
        `Total: ${totalTokens.toLocaleString()} $Ember\n\n` +
        `Players must claim within ${formatTimer(timer)}. Continue?`)) {
        return;
    }
    
    alert(`✓ Airdrop Sent!\n\n` +
        `${totalTokens.toLocaleString()} $Ember distributed to ${recipients} recipients in ${campaignText}.\n\n` +
        `Players have ${formatTimer(timer)} to claim their tokens.`);
    
    if (typeof window.loadSection === 'function') {
        window.loadSection('airdrops');
    }
}

/**
 * Show future airdrop warning
 */
function showFutureAirdropWarning() {
    alert(`⚠️ About Scheduling Airdrops\n\n` +
        `Scheduling airdrops for later is not recommended because:\n\n` +
        `• Active player count can change significantly\n` +
        `• You may end up paying for more/fewer recipients than expected\n` +
        `• Current estimate: Based on NOW, not future time\n\n` +
        `Best Practice:\n` +
        `Send airdrops when you know the current player count and can approve the exact amount.`);
}

/**
 * Approve advertiser airdrop
 */
function approveAdvertiserAirdrop(requestId) {
    const request = AirdropSystem.pendingRequests.find(r => r.id === requestId);
    if (!request) return;
    
    if (confirm(`Approve Airdrop Request?\n\n` +
        `From: ${request.advertiser}\n` +
        `Campaign: ${request.campaignName}\n` +
        `Amount: ${request.amount.toLocaleString()} $Ember × ${request.estimatedRecipients} players\n` +
        `Total: ${(request.amount * request.estimatedRecipients).toLocaleString()} $Ember\n\n` +
        `Send immediately?`)) {
        
        alert(`✓ Airdrop Approved & Sent!\n\nThe advertiser will be notified.`);
        
        // Remove from pending
        const index = AirdropSystem.pendingRequests.findIndex(r => r.id === requestId);
        if (index > -1) {
            AirdropSystem.pendingRequests.splice(index, 1);
        }
        
        if (typeof window.loadSection === 'function') {
            window.loadSection('airdrops');
        }
    }
}

/**
 * Edit advertiser airdrop
 */
function editAdvertiserAirdrop(requestId) {
    const newAmount = prompt('Enter new token amount per player:', '500');
    if (newAmount) {
        alert(`✓ Request updated to ${parseInt(newAmount).toLocaleString()} $Ember per player.`);
    }
}

/**
 * Reject advertiser airdrop
 */
function rejectAdvertiserAirdrop(requestId) {
    if (confirm('Reject this airdrop request?')) {
        const reason = prompt('Reason for rejection (will be sent to advertiser):', '');
        alert(`✓ Request rejected${reason ? ` with reason: "${reason}"` : ''}.\n\nThe advertiser will be notified.`);
        
        // Remove from pending
        const index = AirdropSystem.pendingRequests.findIndex(r => r.id === requestId);
        if (index > -1) {
            AirdropSystem.pendingRequests.splice(index, 1);
        }
        
        if (typeof window.loadSection === 'function') {
            window.loadSection('airdrops');
        }
    }
}

/**
 * Submit airdrop request (Advertiser)
 */
function submitAirdropRequest() {
    const campaignId = document.getElementById('advAirdropCampaign')?.value;
    const campaignText = document.getElementById('advAirdropCampaign')?.selectedOptions[0]?.text || '';
    const amount = document.getElementById('airdropAmountAdv')?.value || 500;
    const radius = document.getElementById('airdropRadiusAdv')?.value || 1;
    const message = document.getElementById('airdropMessageAdv')?.value;
    
    alert(`🎁 Airdrop Request Submitted!\n\n` +
        `Campaign: ${campaignText}\n` +
        `Amount: ${parseInt(amount).toLocaleString()} tokens\n` +
        `Radius: ${radius} mile(s)\n\n` +
        `The campaign manager will review and approve your request.`);
}

/**
 * View airdrop details
 */
function viewAirdropDetails(airdropId) {
    const airdrop = AirdropSystem.activeAirdrops.find(a => a.id === airdropId);
    if (airdrop) {
        alert(`Airdrop Details\n\n` +
            `ID: ${airdrop.id}\n` +
            `Campaign: ${airdrop.campaignName}\n` +
            `Amount: ${airdrop.amount.toLocaleString()} $Ember\n` +
            `Target: ${airdrop.location}\n` +
            `Recipients: ${airdrop.recipients}\n` +
            `Claimed: ${airdrop.claimed}\n` +
            `Unclaimed: ${airdrop.unclaimed}\n` +
            `Claim Rate: ${Math.round((airdrop.claimed / airdrop.recipients) * 100)}%\n` +
            `Status: ${airdrop.status}`);
    }
}

// ============================================
// INITIALIZE
// ============================================

// Setup airdrop amount change listener
document.addEventListener('DOMContentLoaded', () => {
    const amountInput = document.getElementById('airdropAmount');
    if (amountInput) {
        amountInput.addEventListener('input', updateTargetDetails);
    }
    
    const timerInput = document.getElementById('airdropTimer');
    if (timerInput) {
        timerInput.addEventListener('change', updateTargetDetails);
    }
});

// ============================================
// EXPORT FUNCTIONS
// ============================================

if (typeof window !== 'undefined') {
    window.AirdropSystem = AirdropSystem;
    window.getAirdropsContent = getAirdropsContent;
    window.getAirdropRequestsContent = getAirdropRequestsContent;
    window.updateCampaignPlayers = updateCampaignPlayers;
    window.updateTargetDetails = updateTargetDetails;
    window.sendQuickAirdrop = sendQuickAirdrop;
    window.showFutureAirdropWarning = showFutureAirdropWarning;
    window.approveAdvertiserAirdrop = approveAdvertiserAirdrop;
    window.editAdvertiserAirdrop = editAdvertiserAirdrop;
    window.rejectAdvertiserAirdrop = rejectAdvertiserAirdrop;
    window.submitAirdropRequest = submitAirdropRequest;
    window.viewAirdropDetails = viewAirdropDetails;
    window.formatTimer = formatTimer;
}
