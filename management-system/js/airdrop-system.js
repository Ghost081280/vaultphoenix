/* ============================================
   VAULT PHOENIX MANAGEMENT SYSTEM
   Airdrop System - Live Controls & Targeting
   ============================================ */

// ============================================
// AIRDROP CONFIGURATION
// ============================================

const AirdropSystem = {
    // Active airdrops
    activeAirdrops: [
        {
            id: 'airdrop-001',
            amount: 500,
            target: 'area',
            location: 'Downtown Phoenix',
            recipients: 12,
            timestamp: new Date(Date.now() - 47000),
            status: 'completed'
        },
        {
            id: 'airdrop-002',
            amount: 1000,
            target: 'all',
            location: 'All Players',
            recipients: 47,
            timestamp: new Date(Date.now() - 3600000),
            status: 'completed'
        }
    ],
    
    // Scheduled airdrops
    scheduledAirdrops: [
        {
            id: 'scheduled-001',
            amount: 750,
            target: 'area',
            location: 'Scottsdale Area',
            scheduledTime: new Date(Date.now() + 7200000),
            status: 'pending'
        }
    ],
    
    // Airdrop history
    totalAirdrops: 156,
    totalTokensDistributed: 3666669,
    
    // Targeting options
    targetingOptions: ['all', 'area', 'players', 'new-users', 'high-activity']
};

// ============================================
// AIRDROP CONTENT GENERATOR
// ============================================

/**
 * Get airdrop center content
 */
function getAirdropsContent(role) {
    if (role === 'merchant') {
        return getPlaceholderContent('airdrops');
    }
    
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
                    <div class="stat-label">Scheduled Airdrops</div>
                    <div class="stat-value">${AirdropSystem.scheduledAirdrops.length}</div>
                    <div class="stat-change">Upcoming</div>
                </div>
            </div>
        </div>
        
        <!-- Quick Airdrop Panel -->
        <div class="dashboard-section">
            <h3 style="font-size: 1.5rem; color: var(--color-primary-gold); margin-bottom: 20px;">
                ⚡ Quick Airdrop
            </h3>
            
            <div class="card">
                <form onsubmit="sendQuickAirdrop(event)" id="quickAirdropForm">
                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 20px; margin-bottom: 20px;">
                        <div class="form-group">
                            <label class="form-label">Amount ($Ember)</label>
                            <input type="number" class="form-input" id="airdropAmount" value="500" min="1" step="1" required>
                        </div>
                        
                        <div class="form-group">
                            <label class="form-label">Target Audience</label>
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
                            <select class="form-input" id="airdropArea">
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
                                <div style="color: rgba(255,255,255,0.6); font-size: 0.9rem;">Estimated Recipients</div>
                                <div style="font-size: 1.5rem; font-weight: 700; color: var(--color-primary-gold);" id="estimatedRecipients">47</div>
                            </div>
                            <div>
                                <div style="color: rgba(255,255,255,0.6); font-size: 0.9rem;">Total Cost</div>
                                <div style="font-size: 1.5rem; font-weight: 700; color: var(--color-primary-gold);" id="totalCost">23,500 $Ember</div>
                            </div>
                            <div>
                                <div style="color: rgba(255,255,255,0.6); font-size: 0.9rem;">Your Balance After</div>
                                <div style="font-size: 1.5rem; font-weight: 700;" id="balanceAfter">4,950 $Ember</div>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Message (Optional) -->
                    <div class="form-group">
                        <label class="form-label">Custom Message (Optional)</label>
                        <textarea class="form-input" id="airdropMessage" rows="3" placeholder="Add a custom message to your airdrop..."></textarea>
                    </div>
                    
                    <div style="display: flex; gap: 15px; margin-top: 25px;">
                        <button type="submit" class="btn btn-primary btn-large">
                            🎁 Send Airdrop Now
                        </button>
                        <button type="button" class="btn btn-secondary" onclick="scheduleAirdrop()">
                            ⏰ Schedule for Later
                        </button>
                    </div>
                </form>
            </div>
        </div>
        
        <!-- Recent Airdrops -->
        <div class="dashboard-section">
            <h3 style="font-size: 1.5rem; color: var(--color-primary-gold); margin-bottom: 20px;">
                📜 Recent Airdrops
            </h3>
            
            <div class="card">
                ${AirdropSystem.activeAirdrops.map(airdrop => `
                    <div style="padding: 15px; border-bottom: 1px solid rgba(255,255,255,0.1); display: flex; justify-content: space-between; align-items: center;">
                        <div>
                            <div style="font-weight: 700; margin-bottom: 5px;">
                                ${airdrop.amount.toLocaleString()} $Ember
                                <span class="badge badge-success" style="margin-left: 10px;">${airdrop.status}</span>
                            </div>
                            <div style="color: rgba(255,255,255,0.6); font-size: 0.9rem;">
                                ${airdrop.location} • ${airdrop.recipients} recipients • ${getRelativeTime(airdrop.timestamp)}
                            </div>
                        </div>
                        <button class="btn btn-small btn-outline" onclick="viewAirdropDetails('${airdrop.id}')">
                            View Details
                        </button>
                    </div>
                `).join('')}
            </div>
        </div>
        
        <!-- Scheduled Airdrops -->
        ${AirdropSystem.scheduledAirdrops.length > 0 ? `
            <div class="dashboard-section">
                <h3 style="font-size: 1.5rem; color: var(--color-primary-gold); margin-bottom: 20px;">
                    ⏰ Scheduled Airdrops
                </h3>
                
                <div class="card">
                    ${AirdropSystem.scheduledAirdrops.map(airdrop => `
                        <div style="padding: 15px; border-bottom: 1px solid rgba(255,255,255,0.1); display: flex; justify-content: space-between; align-items: center;">
                            <div>
                                <div style="font-weight: 700; margin-bottom: 5px;">
                                    ${airdrop.amount.toLocaleString()} $Ember
                                    <span class="badge badge-warning" style="margin-left: 10px;">${airdrop.status}</span>
                                </div>
                                <div style="color: rgba(255,255,255,0.6); font-size: 0.9rem;">
                                    ${airdrop.location} • Scheduled for ${formatDateTime(airdrop.scheduledTime)}
                                </div>
                            </div>
                            <div style="display: flex; gap: 10px;">
                                <button class="btn btn-small btn-outline" onclick="editScheduledAirdrop('${airdrop.id}')">
                                    Edit
                                </button>
                                <button class="btn btn-small" onclick="cancelScheduledAirdrop('${airdrop.id}')" style="background: var(--color-primary-red);">
                                    Cancel
                                </button>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        ` : ''}
        
        <!-- Airdrop Analytics -->
        <div class="dashboard-section">
            <h3 style="font-size: 1.5rem; color: var(--color-primary-gold); margin-bottom: 20px;">
                📊 Airdrop Performance Analytics
            </h3>
            
            <div class="apps-grid">
                <div class="card">
                    <h4 style="color: var(--color-primary-orange); margin-bottom: 15px;">Engagement Rate</h4>
                    <div style="font-size: 3rem; font-weight: 900; color: var(--color-primary-gold); margin-bottom: 10px;">
                        87.3%
                    </div>
                    <div style="color: rgba(255,255,255,0.6);">
                        Recipients who claimed tokens
                    </div>
                    <div style="margin-top: 15px; padding-top: 15px; border-top: 1px solid rgba(255,255,255,0.1);">
                        <div style="display: flex; justify-content: space-between; padding: 5px 0;">
                            <span style="color: rgba(255,255,255,0.6);">Claimed:</span>
                            <span style="font-weight: 700;">204 / 234</span>
                        </div>
                        <div style="display: flex; justify-content: space-between; padding: 5px 0;">
                            <span style="color: rgba(255,255,255,0.6);">Unclaimed:</span>
                            <span style="font-weight: 700;">30</span>
                        </div>
                    </div>
                </div>
                
                <div class="card">
                    <h4 style="color: var(--color-primary-orange); margin-bottom: 15px;">Avg. Claim Time</h4>
                    <div style="font-size: 3rem; font-weight: 900; color: var(--color-primary-gold); margin-bottom: 10px;">
                        2.4 min
                    </div>
                    <div style="color: rgba(255,255,255,0.6);">
                        Time from send to claim
                    </div>
                    <div style="margin-top: 15px; padding-top: 15px; border-top: 1px solid rgba(255,255,255,0.1);">
                        <div style="display: flex; justify-content: space-between; padding: 5px 0;">
                            <span style="color: rgba(255,255,255,0.6);">Fastest:</span>
                            <span style="font-weight: 700;">12 seconds</span>
                        </div>
                        <div style="display: flex; justify-content: space-between; padding: 5px 0;">
                            <span style="color: rgba(255,255,255,0.6);">Slowest:</span>
                            <span style="font-weight: 700;">45 minutes</span>
                        </div>
                    </div>
                </div>
                
                <div class="card">
                    <h4 style="color: var(--color-primary-orange); margin-bottom: 15px;">Best Performing Area</h4>
                    <div style="font-size: 2rem; font-weight: 900; color: var(--color-primary-gold); margin-bottom: 10px;">
                        Downtown Phoenix
                    </div>
                    <div style="color: rgba(255,255,255,0.6);">
                        Highest engagement rate
                    </div>
                    <div style="margin-top: 15px; padding-top: 15px; border-top: 1px solid rgba(255,255,255,0.1);">
                        <div style="display: flex; justify-content: space-between; padding: 5px 0;">
                            <span style="color: rgba(255,255,255,0.6);">Engagement:</span>
                            <span style="font-weight: 700; color: #22c55e;">94.2%</span>
                        </div>
                        <div style="display: flex; justify-content: space-between; padding: 5px 0;">
                            <span style="color: rgba(255,255,255,0.6);">Avg Claim:</span>
                            <span style="font-weight: 700;">1.8 min</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// ============================================
// AIRDROP FUNCTIONS
// ============================================

/**
 * Update target details based on selection
 */
function updateTargetDetails() {
    const target = document.getElementById('airdropTarget')?.value;
    const areaGroup = document.getElementById('areaSelectGroup');
    const amount = parseInt(document.getElementById('airdropAmount')?.value) || 500;
    
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
    
    // Update balance after
    const balanceAfter = document.getElementById('balanceAfter');
    if (balanceAfter && window.AppState?.tokenBalance) {
        const remaining = window.AppState.tokenBalance.amount - (amount * recipients);
        balanceAfter.textContent = `${remaining.toLocaleString()} $Ember`;
        balanceAfter.style.color = remaining < 0 ? 'var(--color-primary-red)' : 'var(--color-primary-gold)';
    }
}

/**
 * Send quick airdrop
 */
function sendQuickAirdrop(event) {
    event.preventDefault();
    
    const amount = parseInt(document.getElementById('airdropAmount')?.value) || 0;
    const target = document.getElementById('airdropTarget')?.value;
    const message = document.getElementById('airdropMessage')?.value || '';
    const area = document.getElementById('airdropArea')?.value;
    
    // Get estimated recipients
    const recipientsEl = document.getElementById('estimatedRecipients');
    const recipients = parseInt(recipientsEl?.textContent) || 0;
    
    const totalTokens = amount * recipients;
    
    // Validate balance
    if (window.AppState?.tokenBalance && totalTokens > window.AppState.tokenBalance.amount) {
        alert('⚠️ Insufficient token balance!\n\nYou need ' + totalTokens.toLocaleString() + ' $Ember but only have ' + window.AppState.tokenBalance.amount.toLocaleString() + ' $Ember.\n\nPlease purchase more tokens or reduce the airdrop amount.');
        return;
    }
    
    // Confirm
    const targetName = target === 'area' ? document.querySelector(`#airdropArea option[value="${area}"]`)?.textContent : 
                       target === 'all' ? 'All Active Players' :
                       target.charAt(0).toUpperCase() + target.slice(1).replace('-', ' ');
    
    if (!confirm(`Send Airdrop?\n\nAmount: ${amount.toLocaleString()} $Ember per recipient\nTarget: ${targetName}\nRecipients: ${recipients}\nTotal: ${totalTokens.toLocaleString()} $Ember\n\nContinue?`)) {
        return;
    }
    
    // Simulate sending
    setTimeout(() => {
        // Deduct tokens
        if (window.AppState?.tokenBalance) {
            window.AppState.tokenBalance.amount -= totalTokens;
            if (typeof window.updateTokenBalance === 'function') {
                window.updateTokenBalance();
            }
        }
        
        // Add to history
        AirdropSystem.activeAirdrops.unshift({
            id: 'airdrop-' + Date.now(),
            amount: amount,
            target: target,
            location: targetName,
            recipients: recipients,
            timestamp: new Date(),
            status: 'completed'
        });
        
        // Success message
        alert(`✓ Airdrop Sent Successfully!\n\n${totalTokens.toLocaleString()} $Ember distributed to ${recipients} recipients.\n\nYour new balance: ${window.AppState.tokenBalance.amount.toLocaleString()} $Ember`);
        
        // Reload section
        if (typeof window.loadSection === 'function') {
            window.loadSection('airdrops');
        }
    }, 500);
}

/**
 * Schedule airdrop for later
 */
function scheduleAirdrop() {
    const amount = parseInt(document.getElementById('airdropAmount')?.value) || 0;
    const target = document.getElementById('airdropTarget')?.value;
    
    const scheduledTime = prompt('Schedule Time (hours from now):', '2');
    
    if (scheduledTime) {
        const hours = parseFloat(scheduledTime);
        if (isNaN(hours) || hours <= 0) {
            alert('Please enter a valid number of hours.');
            return;
        }
        
        const targetName = target === 'all' ? 'All Active Players' : 
                          target.charAt(0).toUpperCase() + target.slice(1).replace('-', ' ');
        
        // Add to scheduled
        AirdropSystem.scheduledAirdrops.push({
            id: 'scheduled-' + Date.now(),
            amount: amount,
            target: target,
            location: targetName,
            scheduledTime: new Date(Date.now() + (hours * 3600000)),
            status: 'pending'
        });
        
        alert(`✓ Airdrop Scheduled!\n\nWill be sent in ${hours} hour(s).`);
        
        // Reload section
        if (typeof window.loadSection === 'function') {
            window.loadSection('airdrops');
        }
    }
}

/**
 * View airdrop details
 */
function viewAirdropDetails(airdropId) {
    const airdrop = AirdropSystem.activeAirdrops.find(a => a.id === airdropId);
    if (airdrop) {
        alert(`Airdrop Details\n\nID: ${airdrop.id}\nAmount: ${airdrop.amount.toLocaleString()} $Ember\nTarget: ${airdrop.location}\nRecipients: ${airdrop.recipients}\nStatus: ${airdrop.status}\nTime: ${formatDateTime(airdrop.timestamp)}`);
    }
}

/**
 * Edit scheduled airdrop
 */
function editScheduledAirdrop(airdropId) {
    alert('Edit scheduled airdrop: ' + airdropId + '\n\nThis feature would allow you to modify the scheduled airdrop parameters.');
}

/**
 * Cancel scheduled airdrop
 */
function cancelScheduledAirdrop(airdropId) {
    if (confirm('Cancel this scheduled airdrop?')) {
        AirdropSystem.scheduledAirdrops = AirdropSystem.scheduledAirdrops.filter(a => a.id !== airdropId);
        
        alert('✓ Scheduled airdrop cancelled.');
        
        // Reload section
        if (typeof window.loadSection === 'function') {
            window.loadSection('airdrops');
        }
    }
}

// ============================================
// UTILITY FUNCTIONS
// ============================================

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
 * Format date and time
 */
function formatDateTime(date) {
    return new Intl.DateTimeFormat('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    }).format(date);
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
});

// ============================================
// EXPORT FUNCTIONS
// ============================================

if (typeof window !== 'undefined') {
    window.AirdropSystem = AirdropSystem;
    window.getAirdropsContent = getAirdropsContent;
    window.updateTargetDetails = updateTargetDetails;
    window.sendQuickAirdrop = sendQuickAirdrop;
    window.scheduleAirdrop = scheduleAirdrop;
    window.viewAirdropDetails = viewAirdropDetails;
    window.editScheduledAirdrop = editScheduledAirdrop;
    window.cancelScheduledAirdrop = cancelScheduledAirdrop;
}
