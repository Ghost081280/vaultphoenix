/* ============================================
   VAULT PHOENIX MANAGEMENT SYSTEM
   Airdrop System - Custom Message Airdrops
   ============================================ */

// ============================================
// AIRDROP CONFIGURATION
// ============================================

const AirdropSystem = {
    // Active airdrops with custom messages
    activeAirdrops: [
        {
            id: 'airdrop-001',
            campaignId: 'camp-001',
            campaignName: '$Ember Hunt',
            amount: 500,
            target: 'area',
            location: 'Downtown Phoenix',
            recipients: 12,
            claimTimer: 1800,
            timestamp: new Date(Date.now() - 47000),
            status: 'active',
            claimed: 8,
            unclaimed: 4,
            message: 'Welcome to Downtown Phoenix! Collect your bonus tokens and explore local businesses.'
        },
        {
            id: 'airdrop-002',
            campaignId: 'camp-001',
            campaignName: '$Ember Hunt',
            amount: 1000,
            target: 'all',
            location: 'All Players',
            recipients: 47,
            claimTimer: 3600,
            timestamp: new Date(Date.now() - 3600000),
            status: 'completed',
            claimed: 41,
            unclaimed: 6,
            message: 'Special weekend bonus! Double tokens at all locations this Saturday!'
        }
    ],
    
    // Airdrop history
    totalAirdrops: 156,
    totalTokensDistributed: 3666669,
    
    // Targeting options
    targetingOptions: ['all', 'area', 'new-users', 'high-activity'],
    
    // Timer presets (in seconds)
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
// CAMPAIGN MANAGER: CUSTOM MESSAGE AIRDROP CENTER
// ============================================

/**
 * Get airdrop center content for Campaign Manager
 */
function getAirdropsContent(role) {
    if (role !== 'campaign-manager') {
        return getPlaceholderContent('airdrops');
    }
    
    const campaigns = [
        { id: 'camp-001', name: '$Ember Hunt', activePlayers: 847 },
        { id: 'camp-002', name: 'Desert Quest AR', activePlayers: 423 }
    ];
    
    return `
        <div class="dashboard-section">
            <h2 class="section-title">🎯 Custom Message Airdrop Center</h2>
            
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
                    <div class="stat-icon">📨</div>
                    <div class="stat-label">Messages Sent</div>
                    <div class="stat-value">${AirdropSystem.totalAirdrops}</div>
                    <div class="stat-change">With custom messages</div>
                </div>
            </div>
        </div>
        
        <!-- What are Custom Message Airdrops -->
        <div class="dashboard-section">
            <div class="card" style="background: rgba(240,165,0,0.1); border: 2px solid rgba(240,165,0,0.3);">
                <h3 style="color: var(--color-primary-gold); margin-bottom: 20px; font-size: 1.5rem;">
                    💡 What are Custom Message Airdrops?
                </h3>
                <p style="color: rgba(255,255,255,0.8); line-height: 1.6; margin-bottom: 20px;">
                    Send targeted $Ember tokens with personalized messages directly to players in your campaign. 
                    Perfect for special events, promotions, or driving engagement to specific locations. Players 
                    receive push notifications with your custom message and a claim timer.
                </p>
                
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 15px;">
                    <div style="padding: 15px; background: rgba(0,0,0,0.2); border-radius: 12px;">
                        <div style="font-size: 2rem; margin-bottom: 8px;">📍</div>
                        <h4 style="margin-bottom: 8px; font-size: 1rem;">Target Specific Areas</h4>
                        <p style="color: rgba(255,255,255,0.7); margin: 0; font-size: 0.85rem;">
                            Send to players in specific geographic locations
                        </p>
                    </div>
                    
                    <div style="padding: 15px; background: rgba(0,0,0,0.2); border-radius: 12px;">
                        <div style="font-size: 2rem; margin-bottom: 8px;">💬</div>
                        <h4 style="margin-bottom: 8px; font-size: 1rem;">Custom Messages</h4>
                        <p style="color: rgba(255,255,255,0.7); margin: 0; font-size: 0.85rem;">
                            Add personalized messages for events or promotions
                        </p>
                    </div>
                    
                    <div style="padding: 15px; background: rgba(0,0,0,0.2); border-radius: 12px;">
                        <div style="font-size: 2rem; margin-bottom: 8px;">⏰</div>
                        <h4 style="margin-bottom: 8px; font-size: 1rem;">Claim Timers</h4>
                        <p style="color: rgba(255,255,255,0.7); margin: 0; font-size: 0.85rem;">
                            Set urgency with customizable claim deadlines
                        </p>
                    </div>
                    
                    <div style="padding: 15px; background: rgba(0,0,0,0.2); border-radius: 12px;">
                        <div style="font-size: 2rem; margin-bottom: 8px;">📊</div>
                        <h4 style="margin-bottom: 8px; font-size: 1rem;">Track Results</h4>
                        <p style="color: rgba(255,255,255,0.7); margin: 0; font-size: 0.85rem;">
                            Monitor claim rates and engagement in real-time
                        </p>
                    </div>
                </div>
            </div>
        </div>
        
        <!-- Send Custom Message Airdrop -->
        <div class="dashboard-section">
            <h3 style="font-size: 1.5rem; color: var(--color-primary-gold); margin-bottom: 20px;">
                ⚡ Send Custom Message Airdrop
            </h3>
            
            <div class="card">
                <form onsubmit="sendCustomMessageAirdrop(event)" id="airdropForm">
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
                    
                    <!-- Custom Message -->
                    <div class="form-group">
                        <label class="form-label">Custom Message *</label>
                        <textarea class="form-input" id="airdropMessage" rows="3" placeholder="Special event tonight! Come to downtown Phoenix and collect your bonus tokens. Limited time offer!" required></textarea>
                        <div class="form-hint">This message will be shown to players with the airdrop notification</div>
                    </div>
                    
                    <!-- Target Summary -->
                    <div id="targetSummary" style="background: rgba(240,165,0,0.1); border: 1px solid rgba(240,165,0,0.3); border-radius: 12px; padding: 15px; margin-bottom: 20px;">
                        <div style="font-weight: 700; margin-bottom: 10px;">Airdrop Summary</div>
                        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 15px;">
                            <div>
                                <div style="color: rgba(255,255,255,0.6); font-size: 0.9rem;">Campaign</div>
                                <div style="font-size: 1.3rem; font-weight: 700; color: var(--color-primary-gold);" id="summaryCampaign">$Ember Hunt</div>
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
                    
                    <div style="display: flex; gap: 15px; margin-top: 25px; flex-wrap: wrap;">
                        <button type="submit" class="btn btn-primary btn-large">
                            🎁 Send Airdrop Now
                        </button>
                    </div>
                </form>
            </div>
        </div>
        
        <!-- Active Airdrops -->
        <div class="dashboard-section">
            <h3 style="font-size: 1.5rem; color: var(--color-primary-gold); margin-bottom: 20px;">
                📊 Active Airdrops (With Custom Messages)
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
                    
                    ${airdrop.message ? `
                        <div style="background: rgba(59,130,246,0.1); border: 1px solid rgba(59,130,246,0.3); border-radius: 8px; padding: 12px; margin-bottom: 15px;">
                            <div style="font-size: 0.85rem; color: rgba(255,255,255,0.6); margin-bottom: 5px;">Custom Message:</div>
                            <div style="color: rgba(255,255,255,0.9);">"${airdrop.message}"</div>
                        </div>
                    ` : ''}
                    
                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 15px; padding: 15px; background: rgba(0,0,0,0.3); border-radius: 8px;">
                        <div>
                            <div style="font-size: 0.85rem; color: rgba(255,255,255,0.6);">Claim Timer</div>
                            <div style="font-size: 1.3rem; font-weight: 900; color: #fb923c;">
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
                </div>
            `).join('')}
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
    
    if (areaGroup) {
        areaGroup.style.display = target === 'area' ? 'block' : 'none';
    }
    
    let recipients = 47;
    if (target === 'area') recipients = 12;
    else if (target === 'new-users') recipients = 23;
    else if (target === 'high-activity') recipients = 18;
    
    const estimatedRecipients = document.getElementById('estimatedRecipients');
    if (estimatedRecipients) {
        estimatedRecipients.textContent = recipients;
    }
    
    const totalCost = document.getElementById('totalCost');
    if (totalCost) {
        totalCost.textContent = `${(amount * recipients).toLocaleString()} $Ember`;
    }
    
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
 * Send custom message airdrop
 */
function sendCustomMessageAirdrop(event) {
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
    
    if (!message) {
        alert('Please enter a custom message for the airdrop');
        return;
    }
    
    if (!confirm(`Send Custom Message Airdrop?\n\n` +
        `Campaign: ${campaignText}\n` +
        `Amount: ${amount.toLocaleString()} $Ember per recipient\n` +
        `Target: ${targetName}\n` +
        `Recipients: ${recipients}\n` +
        `Claim Timer: ${formatTimer(timer)}\n` +
        `Total: ${totalTokens.toLocaleString()} $Ember\n\n` +
        `Message: "${message}"\n\n` +
        `Players will receive a push notification with your custom message. Continue?`)) {
        return;
    }
    
    alert(`✓ Custom Message Airdrop Sent!\n\n` +
        `${totalTokens.toLocaleString()} $Ember distributed to ${recipients} recipients.\n\n` +
        `Your message: "${message}"\n\n` +
        `Players have ${formatTimer(timer)} to claim their tokens.`);
    
    if (typeof window.loadSection === 'function') {
        window.loadSection('airdrops');
    }
}

// ============================================
// INITIALIZE
// ============================================

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
    window.updateCampaignPlayers = updateCampaignPlayers;
    window.updateTargetDetails = updateTargetDetails;
    window.sendCustomMessageAirdrop = sendCustomMessageAirdrop;
    window.formatTimer = formatTimer;
}
