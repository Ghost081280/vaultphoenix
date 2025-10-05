/* ============================================
   VAULT PHOENIX MANAGEMENT SYSTEM
   Advertiser Campaign Control - Advertisement Token Stop Creation
   ============================================ */

// This file handles the advertiser's campaign control page where they create
// token stops with advertisements and manage their locations

/**
 * Get Campaign Control Content for Advertisers
 */
function getCampaignControlContent(campaignId) {
    const role = window.AppState?.currentRole;
    
    if (role !== 'advertiser') {
        return `<div style="padding: 40px; text-align: center;">
            <h3>Access Denied</h3>
            <p>This page is only accessible to advertisers.</p>
            <button class="btn btn-primary" onclick="loadSection('overview')">Back to Dashboard</button>
        </div>`;
    }
    
    // Find campaign
    const campaign = window.MarketplaceData?.activeCampaigns.find(c => c.id === campaignId);
    if (!campaign) {
        return `<div style="padding: 40px; text-align: center;">
            <h3>Campaign not found</h3>
            <button class="btn btn-primary" onclick="loadSection('overview')">Back to Dashboard</button>
        </div>`;
    }
    
    // Get advertiser's locations in this campaign
    const locations = window.AdvertiserData?.campaignLocations[campaignId] || [];
    const advertiserBalance = window.AdvertiserData?.tokenBalance?.owned || 0;
    const advertiserAvailable = window.AdvertiserData?.tokenBalance?.available || 0;
    
    return `
        <div class="dashboard-section">
            <div class="builder-header">
                <h2 class="section-title">🎮 ${campaign.name} - Campaign Control</h2>
                <button class="btn btn-outline" onclick="loadSection('overview')">← Back to Dashboard</button>
            </div>
            
            <p style="color: rgba(255,255,255,0.8); margin-bottom: 25px;">
                Create and manage your advertisement token stops for <strong>${campaign.name}</strong>. 
                Each token stop includes your advertisement that players see after collecting tokens.
            </p>
            
            <!-- Campaign Stats -->
            <div class="hero-stats">
                <div class="stat-card">
                    <div class="stat-icon">📍</div>
                    <div class="stat-label">My Token Stops</div>
                    <div class="stat-value">${locations.length}</div>
                    <div class="stat-change">In this campaign</div>
                </div>
                
                <div class="stat-card">
                    <div class="stat-icon">💎</div>
                    <div class="stat-label">Available $Ember</div>
                    <div class="stat-value">${advertiserAvailable.toLocaleString()}</div>
                    <div class="stat-change">${advertiserBalance.toLocaleString()} total owned</div>
                </div>
                
                <div class="stat-card">
                    <div class="stat-icon">👥</div>
                    <div class="stat-label">Total Collections</div>
                    <div class="stat-value">${locations.reduce((sum, loc) => sum + loc.tokensCollected, 0).toLocaleString()}</div>
                    <div class="stat-change">Across all stops</div>
                </div>
                
                <div class="stat-card">
                    <div class="stat-icon">🎁</div>
                    <div class="stat-label">Total Redemptions</div>
                    <div class="stat-value">${locations.reduce((sum, loc) => sum + (loc.redemptions?.total || 0), 0)}</div>
                    <div class="stat-change positive">${locations.reduce((sum, loc) => sum + (loc.redemptions?.totalTokensRedeemed || 0), 0).toLocaleString()} $Ember recovered</div>
                </div>
            </div>
        </div>
        
        ${advertiserAvailable < campaign.minTokensPerStop ? `
            <!-- Insufficient Tokens Warning -->
            <div class="dashboard-section">
                <div class="card" style="background: rgba(239,68,68,0.2); border: 2px solid rgba(239,68,68,0.5);">
                    <div style="display: flex; align-items: start; gap: 15px;">
                        <div style="font-size: 3rem;">⚠️</div>
                        <div style="flex: 1;">
                            <h3 style="color: #ef4444; margin-bottom: 15px;">Insufficient $Ember Tokens</h3>
                            <p style="color: rgba(255,255,255,0.9); margin-bottom: 15px; line-height: 1.6;">
                                You need at least <strong>${campaign.minTokensPerStop.toLocaleString()} $Ember</strong> to create a token stop in this campaign. 
                                You currently have <strong>${advertiserAvailable.toLocaleString()} $Ember</strong> available.
                            </p>
                            <p style="color: rgba(255,255,255,0.8); margin-bottom: 20px;">
                                Purchase more tokens to fund your advertisement token stops.
                            </p>
                            <button class="btn btn-primary btn-large" onclick="loadSection('wallet')">
                                💳 Buy $Ember Tokens
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        ` : ''}
        
        <!-- Add Token Stop with Advertisement -->
        <div class="dashboard-section">
            <h3 style="font-size: 1.5rem; color: var(--color-primary-gold); margin-bottom: 20px;">
                ➕ Create Advertisement Token Stop
            </h3>
            
            <div class="card" style="background: rgba(240,165,0,0.1); border: 2px solid rgba(240,165,0,0.3); margin-bottom: 20px;">
                <h4 style="color: var(--color-primary-gold); margin-bottom: 15px;">💡 How Advertisement Token Stops Work</h4>
                <ul style="list-style: none; padding: 0; margin: 0; line-height: 1.8;">
                    <li>✓ You fund the token stop with your $Ember tokens</li>
                    <li>✓ You create advertisement content (title, description, image, offer)</li>
                    <li>✓ Players visit your location in AR and collect tokens</li>
                    <li>✓ Players immediately see your advertisement after collection</li>
                    <li>✓ Players can cash out to Coinbase OR visit your location to redeem</li>
                    <li>✓ You scan their QR code → receive $Ember back → give them your offer</li>
                </ul>
            </div>
            
            <!-- Location Form -->
            <div class="card">
                <h4 style="color: var(--color-primary-gold); margin-bottom: 20px;">
                    📍 Location Details
                </h4>
                
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-bottom: 15px;">
                    <div class="form-group">
                        <label class="form-label">Location Name *</label>
                        <input type="text" class="form-input" id="advLocationName_${campaignId}" placeholder="My Business Name">
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label">Select Tier *</label>
                        <select class="form-input" id="advTier_${campaignId}" onchange="updateTokenRequirement('${campaignId}')">
                            <option value="bronze">Bronze - $200/month (5,000 tokens min)</option>
                            <option value="silver" selected>Silver - $500/month (10,000 tokens min)</option>
                            <option value="gold">Gold - $1,200/month (25,000 tokens min)</option>
                            <option value="platinum">Platinum - $2,500/month (50,000 tokens min)</option>
                        </select>
                    </div>
                </div>
                
                <div class="form-group">
                    <label class="form-label">Address *</label>
                    <input type="text" class="form-input" id="advAddress_${campaignId}" placeholder="123 Main St, Phoenix, AZ 85001">
                    <div class="form-hint">Auto-geocoded to latitude/longitude</div>
                </div>
                
                <div class="form-group">
                    <label class="form-label">Tokens to Allocate *</label>
                    <input type="number" class="form-input" id="advTokensAllocate_${campaignId}" value="10000" min="${campaign.minTokensPerStop}" step="1000" onchange="updateTokenAllocationSummary('${campaignId}')">
                    <div class="form-hint">
                        Minimum: ${campaign.minTokensPerStop.toLocaleString()} | 
                        Recommended: ${campaign.recommendedTokens.toLocaleString()} | 
                        Available: ${advertiserAvailable.toLocaleString()}
                    </div>
                </div>
                
                <div style="background: rgba(59,130,246,0.1); border: 1px solid rgba(59,130,246,0.3); border-radius: 12px; padding: 15px; margin: 15px 0;">
                    <h5 style="color: #3b82f6; margin-bottom: 10px;">Token Allocation Summary:</h5>
                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 10px; font-size: 0.9rem;">
                        <div>
                            <div style="color: rgba(255,255,255,0.6);">Tokens Per Collection:</div>
                            <div style="font-weight: 700; color: var(--color-primary-gold);">${campaign.tokensPerCollection} $Ember</div>
                        </div>
                        <div>
                            <div style="color: rgba(255,255,255,0.6);">Est. Collections:</div>
                            <div style="font-weight: 700;" id="estCollections_${campaignId}">${Math.floor(10000 / campaign.tokensPerCollection)}</div>
                        </div>
                        <div>
                            <div style="color: rgba(255,255,255,0.6);">Est. Duration:</div>
                            <div style="font-weight: 700;" id="estDuration_${campaignId}">
                                ${Math.floor((10000 / campaign.tokensPerCollection) / campaign.avgCollectionsPerMonth)} months
                            </div>
                        </div>
                        <div>
                            <div style="color: rgba(255,255,255,0.6);">After Allocation:</div>
                            <div style="font-weight: 700; color: #fb923c;" id="afterAllocation_${campaignId}">
                                ${(advertiserAvailable - 10000).toLocaleString()} available
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <!-- Advertisement Content -->
            <div class="card" style="margin-top: 20px;">
                <h4 style="color: var(--color-primary-gold); margin-bottom: 20px;">
                    📢 Advertisement Content (Players See This After Collecting)
                </h4>
                
                <div style="background: rgba(240,165,0,0.1); border: 1px solid rgba(240,165,0,0.3); border-radius: 12px; padding: 15px; margin-bottom: 20px;">
                    <p style="color: rgba(255,255,255,0.9); margin: 0; line-height: 1.6;">
                        <strong>Important:</strong> Your advertisement appears in the player's app immediately after they collect 
                        tokens at your location. Make it compelling so they want to visit and redeem!
                    </p>
                </div>
                
                <div class="form-group">
                    <label class="form-label">Advertisement Title * (Max ${campaign.adSpecs.titleMaxLength} characters)</label>
                    <input type="text" class="form-input" id="advAdTitle_${campaignId}" maxlength="${campaign.adSpecs.titleMaxLength}" placeholder="Amazing Offer at Our Location!" onkeyup="updateCharCount('advAdTitle_${campaignId}', 'adTitleCount_${campaignId}', ${campaign.adSpecs.titleMaxLength})">
                    <div class="form-hint">
                        <span id="adTitleCount_${campaignId}">0</span>/${campaign.adSpecs.titleMaxLength} characters
                    </div>
                </div>
                
                <div class="form-group">
                    <label class="form-label">Advertisement Description * (Max ${campaign.adSpecs.descriptionMaxLength} characters)</label>
                    <textarea class="form-input" id="advAdDescription_${campaignId}" rows="4" maxlength="${campaign.adSpecs.descriptionMaxLength}" placeholder="Visit our location and redeem your $Ember tokens for exclusive discounts, free items, or special offers! We're located at [address] and open [hours]. Scan your QR code at checkout to redeem." onkeyup="updateCharCount('advAdDescription_${campaignId}', 'adDescCount_${campaignId}', ${campaign.adSpecs.descriptionMaxLength})"></textarea>
                    <div class="form-hint">
                        <span id="adDescCount_${campaignId}">0</span>/${campaign.adSpecs.descriptionMaxLength} characters | 
                        Include redemption instructions!
                    </div>
                </div>
                
                <div class="form-group">
                    <label class="form-label">Advertisement Image * (Square, PNG/JPG, Max 2MB)</label>
                    <div class="logo-upload-area" onclick="document.getElementById('advAdImage_${campaignId}').click()">
                        <div id="adImagePreviewContainer_${campaignId}">
                            <div id="adImagePlaceholder_${campaignId}" class="logo-placeholder">
                                <span>🖼️</span>
                                <span>Click to upload advertisement image</span>
                            </div>
                            <img id="adImagePreview_${campaignId}" class="logo-preview-img" style="display: none; max-width: 120px; max-height: 120px;">
                        </div>
                    </div>
                    <input type="file" class="form-input" id="advAdImage_${campaignId}" accept="image/*" onchange="previewAdImage(event, '${campaignId}')" style="display: none;">
                    <div class="form-hint">Recommended: 800x800px, eye-catching design</div>
                </div>
                
                <div style="background: rgba(34,197,94,0.1); border: 1px solid rgba(34,197,94,0.3); border-radius: 12px; padding: 20px; margin: 20px 0;">
                    <h5 style="color: #22c55e; margin-bottom: 15px;">🎁 Redemption Offer Details</h5>
                    
                    <div class="form-group">
                        <label class="form-label">What Can Players Redeem? *</label>
                        <input type="text" class="form-input" id="advOffer_${campaignId}" placeholder="10% Off Any Purchase OR Free Coffee">
                        <div class="form-hint">Be specific! Example: "10% off, Free appetizer, $5 off $25+"</div>
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label">Redemption Cost (in $Ember) *</label>
                        <input type="number" class="form-input" id="advOfferCost_${campaignId}" value="50" min="25" step="25">
                        <div class="form-hint">How many $Ember tokens does this offer cost? Default: ${campaign.tokensPerCollection}</div>
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label">Call-to-Action Button Text</label>
                        <input type="text" class="form-input" id="advCtaText_${campaignId}" value="Visit Us & Redeem" placeholder="Visit Us & Redeem">
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label">Website/Maps URL (Optional)</label>
                        <input type="text" class="form-input" id="advCtaUrl_${campaignId}" placeholder="https://yourbusiness.com">
                        <div class="form-hint">Link to your website, Google Maps, or booking page</div>
                    </div>
                </div>
            </div>
            
            <!-- Preview -->
            <div class="card" style="margin-top: 20px; background: rgba(59,130,246,0.1); border: 2px solid rgba(59,130,246,0.3);">
                <h4 style="color: #3b82f6; margin-bottom: 20px;">
                    👁️ Advertisement Preview (What Players Will See)
                </h4>
                
                <div style="max-width: 400px; margin: 0 auto; padding: 20px; background: rgba(0,0,0,0.4); border-radius: 12px;">
                    <div style="background: rgba(255,255,255,0.05); border-radius: 12px; padding: 20px;">
                        <div style="width: 100%; height: 200px; background: rgba(0,0,0,0.3); border-radius: 12px; display: flex; align-items: center; justify-content: center; margin-bottom: 15px; overflow: hidden;">
                            <img id="adPreviewImage_${campaignId}" style="display: none; width: 100%; height: 100%; object-fit: cover;">
                            <div id="adPreviewPlaceholder_${campaignId}" style="color: rgba(255,255,255,0.4); text-align: center;">
                                <div style="font-size: 3rem; margin-bottom: 10px;">🖼️</div>
                                <div style="font-size: 0.9rem;">Your image will appear here</div>
                            </div>
                        </div>
                        
                        <h3 id="adPreviewTitle_${campaignId}" style="color: var(--color-primary-gold); margin-bottom: 12px; font-size: 1.3rem;">
                            Your Advertisement Title
                        </h3>
                        
                        <p id="adPreviewDescription_${campaignId}" style="color: rgba(255,255,255,0.9); margin-bottom: 15px; line-height: 1.5; font-size: 0.95rem;">
                            Your advertisement description will appear here...
                        </p>
                        
                        <div style="background: rgba(34,197,94,0.2); border: 1px solid rgba(34,197,94,0.4); border-radius: 8px; padding: 12px; margin-bottom: 15px;">
                            <div style="font-size: 0.85rem; color: rgba(255,255,255,0.7); margin-bottom: 3px;">Redeem For:</div>
                            <div id="adPreviewOffer_${campaignId}" style="font-weight: 700; color: #22c55e; margin-bottom: 5px;">
                                Your offer will appear here
                            </div>
                            <div style="font-size: 0.85rem; color: rgba(255,255,255,0.6);">
                                Cost: <span id="adPreviewCost_${campaignId}">50</span> $Ember
                            </div>
                        </div>
                        
                        <button class="btn btn-primary" style="width: 100%; pointer-events: none;">
                            <span id="adPreviewCta_${campaignId}">Visit Us & Redeem</span>
                        </button>
                    </div>
                </div>
            </div>
            
            <!-- Submit -->
            <div class="card" style="margin-top: 20px;">
                <div style="background: rgba(34,197,94,0.1); border: 1px solid rgba(34,197,94,0.3); border-radius: 12px; padding: 20px; margin-bottom: 20px;">
                    <h4 style="color: #22c55e; margin-bottom: 15px;">✓ Final Checklist Before Creating:</h4>
                    <ul style="list-style: none; padding: 0; margin: 0; line-height: 1.8;">
                        <li>✓ Location name and address are correct</li>
                        <li>✓ Tier selected matches your budget</li>
                        <li>✓ Sufficient $Ember tokens allocated (min: ${campaign.minTokensPerStop.toLocaleString()})</li>
                        <li>✓ Advertisement title is compelling (max ${campaign.adSpecs.titleMaxLength} chars)</li>
                        <li>✓ Description includes redemption instructions (max ${campaign.adSpecs.descriptionMaxLength} chars)</li>
                        <li>✓ Eye-catching image uploaded</li>
                        <li>✓ Redemption offer is clear and specific</li>
                        <li>✓ Scanner App downloaded and ready</li>
                    </ul>
                </div>
                
                <button class="btn btn-primary btn-large" onclick="createAdvertisementTokenStop('${campaignId}')" style="width: 100%; font-size: 1.1rem;" ${advertiserAvailable < campaign.minTokensPerStop ? 'disabled' : ''}>
                    💎 Create Advertisement Token Stop
                </button>
                
                ${advertiserAvailable < campaign.minTokensPerStop ? `
                    <div style="text-align: center; margin-top: 15px; color: #ef4444;">
                        ⚠️ Insufficient tokens. Purchase more $Ember to continue.
                    </div>
                ` : ''}
            </div>
        </div>
        
        <!-- My Token Stops List -->
        <div class="dashboard-section">
            <h3 style="font-size: 1.5rem; color: var(--color-primary-gold); margin-bottom: 20px;">
                📍 My Token Stops in ${campaign.name} (${locations.length})
            </h3>
            
            ${locations.map(loc => `
                <div class="card" style="margin-bottom: 15px;">
                    <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 15px; flex-wrap: wrap; gap: 15px;">
                        <div>
                            <h4 style="color: var(--color-primary-gold); margin-bottom: 5px;">${loc.name}</h4>
                            <div style="color: rgba(255,255,255,0.6); font-size: 0.9rem;">${loc.address}</div>
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
                            <div style="font-size: 0.85rem; color: rgba(255,255,255,0.6);">Tokens Allocated</div>
                            <div style="font-size: 1.5rem; font-weight: 900; color: var(--color-primary-gold);">${loc.tokensAllocated.toLocaleString()}</div>
                        </div>
                        <div>
                            <div style="font-size: 0.85rem; color: rgba(255,255,255,0.6);">Remaining</div>
                            <div style="font-size: 1.5rem; font-weight: 900; color: #fb923c;">${loc.tokensRemaining.toLocaleString()}</div>
                        </div>
                        <div>
                            <div style="font-size: 0.85rem; color: rgba(255,255,255,0.6);">Collections</div>
                            <div style="font-size: 1.5rem; font-weight: 900;">${loc.tokensCollected.toLocaleString()}</div>
                        </div>
                        <div>
                            <div style="font-size: 0.85rem; color: rgba(255,255,255,0.6);">Redeemed Back</div>
                            <div style="font-size: 1.5rem; font-weight: 900; color: #22c55e;">${loc.redemptions?.totalTokensRedeemed.toLocaleString() || 0}</div>
                        </div>
                    </div>
                    
                    ${loc.advertisement ? `
                        <div style="background: rgba(240,165,0,0.15); border: 2px solid rgba(240,165,0,0.4); border-radius: 12px; padding: 15px; margin-bottom: 15px;">
                            <h5 style="color: var(--color-primary-gold); margin-bottom: 10px;">📢 Your Advertisement:</h5>
                            <div style="background: rgba(0,0,0,0.3); border-radius: 8px; padding: 12px;">
                                <h4 style="color: #f0a500; margin-bottom: 8px; font-size: 1rem;">${loc.advertisement.title}</h4>
                                <p style="color: rgba(255,255,255,0.9); margin-bottom: 10px; font-size: 0.9rem; line-height: 1.5;">
                                    ${loc.advertisement.description}
                                </p>
                                <div style="padding: 8px; background: rgba(34,197,94,0.2); border: 1px solid rgba(34,197,94,0.4); border-radius: 6px;">
                                    <div style="font-size: 0.8rem; color: rgba(255,255,255,0.7);">Offer: ${loc.advertisement.offer}</div>
                                    <div style="font-size: 0.8rem; color: rgba(255,255,255,0.6);">Cost: ${loc.advertisement.offerEmberValue} $Ember</div>
                                </div>
                            </div>
                        </div>
                    ` : ''}
                    
                    <div style="display: flex; gap: 10px; flex-wrap: wrap;">
                        <button class="btn btn-primary" onclick="openScannerApp()">Open Scanner</button>
                        <button class="btn btn-secondary" onclick="editAdvertisement('${loc.id}', '${campaignId}')">Edit Advertisement</button>
                        <button class="btn btn-outline" onclick="addMoreTokens('${loc.id}', '${campaignId}')">Add Tokens</button>
                        <button class="btn btn-outline" onclick="viewLocationAnalytics('${loc.id}', '${campaignId}')">Analytics</button>
                    </div>
                </div>
            `).join('')}
            
            ${locations.length === 0 ? `
                <div class="card" style="text-align: center; padding: 40px;">
                    <div style="font-size: 3rem; margin-bottom: 15px;">📍</div>
                    <h4 style="margin-bottom: 10px;">No token stops yet in this campaign</h4>
                    <p style="color: rgba(255,255,255,0.7); margin-bottom: 20px;">
                        Create your first advertisement token stop above to start reaching players!
                    </p>
                </div>
            ` : ''}
        </div>
        
        <script>
            // Auto-update preview as user types
            document.getElementById('advAdTitle_${campaignId}')?.addEventListener('input', function(e) {
                document.getElementById('adPreviewTitle_${campaignId}').textContent = e.target.value || 'Your Advertisement Title';
            });
            
            document.getElementById('advAdDescription_${campaignId}')?.addEventListener('input', function(e) {
                document.getElementById('adPreviewDescription_${campaignId}').textContent = e.target.value || 'Your advertisement description will appear here...';
            });
            
            document.getElementById('advOffer_${campaignId}')?.addEventListener('input', function(e) {
                document.getElementById('adPreviewOffer_${campaignId}').textContent = e.target.value || 'Your offer will appear here';
            });
            
            document.getElementById('advOfferCost_${campaignId}')?.addEventListener('input', function(e) {
                document.getElementById('adPreviewCost_${campaignId}').textContent = e.target.value || '50';
            });
            
            document.getElementById('advCtaText_${campaignId}')?.addEventListener('input', function(e) {
                document.getElementById('adPreviewCta_${campaignId}').textContent = e.target.value || 'Visit Us & Redeem';
            });
        </script>
    `;
}

/**
 * Update character count
 */
function updateCharCount(inputId, countId, maxLength) {
    const input = document.getElementById(inputId);
    const counter = document.getElementById(countId);
    
    if (input && counter) {
        const length = input.value.length;
        counter.textContent = length;
        counter.style.color = length > maxLength * 0.9 ? '#ef4444' : 'rgba(255,255,255,0.6)';
    }
}

/**
 * Preview advertisement image
 */
function previewAdImage(event, campaignId) {
    const file = event.target.files[0];
    if (file) {
        if (file.size > 2 * 1024 * 1024) {
            alert('Image size must be less than 2MB');
            return;
        }
        
        const reader = new FileReader();
        reader.onload = function(e) {
            const placeholder = document.getElementById(`adImagePlaceholder_${campaignId}`);
            const preview = document.getElementById(`adImagePreview_${campaignId}`);
            const previewInAd = document.getElementById(`adPreviewImage_${campaignId}`);
            const previewPlaceholder = document.getElementById(`adPreviewPlaceholder_${campaignId}`);
            
            if (placeholder) placeholder.style.display = 'none';
            if (preview) {
                preview.style.display = 'block';
                preview.src = e.target.result;
            }
            if (previewInAd) {
                previewInAd.style.display = 'block';
                previewInAd.src = e.target.result;
            }
            if (previewPlaceholder) previewPlaceholder.style.display = 'none';
        };
        reader.readAsDataURL(file);
    }
}

/**
 * Update token requirement based on tier
 */
function updateTokenRequirement(campaignId) {
    const tier = document.getElementById(`advTier_${campaignId}`)?.value;
    const tokenInput = document.getElementById(`advTokensAllocate_${campaignId}`);
    
    const minTokens = {
        bronze: 5000,
        silver: 10000,
        gold: 25000,
        platinum: 50000
    };
    
    if (tokenInput && tier) {
        tokenInput.min = minTokens[tier];
        if (parseInt(tokenInput.value) < minTokens[tier]) {
            tokenInput.value = minTokens[tier];
        }
        updateTokenAllocationSummary(campaignId);
    }
}

/**
 * Update token allocation summary
 */
function updateTokenAllocationSummary(campaignId) {
    const tokensAllocate = parseInt(document.getElementById(`advTokensAllocate_${campaignId}`)?.value) || 0;
    const campaign = window.MarketplaceData?.activeCampaigns.find(c => c.id === campaignId);
    const advertiserAvailable = window.AdvertiserData?.tokenBalance?.available || 0;
    
    if (!campaign) return;
    
    const estCollections = Math.floor(tokensAllocate / campaign.tokensPerCollection);
    const estDuration = Math.floor(estCollections / campaign.avgCollectionsPerMonth);
    const afterAllocation = advertiserAvailable - tokensAllocate;
    
    const estCollEl = document.getElementById(`estCollections_${campaignId}`);
    const estDurEl = document.getElementById(`estDuration_${campaignId}`);
    const afterAllocEl = document.getElementById(`afterAllocation_${campaignId}`);
    
    if (estCollEl) estCollEl.textContent = estCollections.toLocaleString();
    if (estDurEl) estDurEl.textContent = estDuration > 0 ? `${estDuration} month${estDuration !== 1 ? 's' : ''}` : '< 1 month';
    if (afterAllocEl) {
        afterAllocEl.textContent = `${afterAllocation.toLocaleString()} available`;
        afterAllocEl.style.color = afterAllocation < 0 ? '#ef4444' : '#fb923c';
    }
}

/**
 * Create advertisement token stop
 */
function createAdvertisementTokenStop(campaignId) {
    const campaign = window.MarketplaceData?.activeCampaigns.find(c => c.id === campaignId);
    const advertiserAvailable = window.AdvertiserData?.tokenBalance?.available || 0;
    
    // Collect all form data
    const name = document.getElementById(`advLocationName_${campaignId}`)?.value;
    const tier = document.getElementById(`advTier_${campaignId}`)?.value;
    const address = document.getElementById(`advAddress_${campaignId}`)?.value;
    const tokensAllocate = parseInt(document.getElementById(`advTokensAllocate_${campaignId}`)?.value) || 0;
    
    const adTitle = document.getElementById(`advAdTitle_${campaignId}`)?.value;
    const adDescription = document.getElementById(`advAdDescription_${campaignId}`)?.value;
    const adImage = document.getElementById(`advAdImage_${campaignId}`)?.files[0];
    const offer = document.getElementById(`advOffer_${campaignId}`)?.value;
    const offerCost = parseInt(document.getElementById(`advOfferCost_${campaignId}`)?.value) || 50;
    const ctaText = document.getElementById(`advCtaText_${campaignId}`)?.value || 'Visit Us & Redeem';
    const ctaUrl = document.getElementById(`advCtaUrl_${campaignId}`)?.value;
    
    // Validation
    if (!name || !address) {
        alert('Please fill in location name and address');
        return;
    }
    
    if (tokensAllocate < campaign.minTokensPerStop) {
        alert(`Minimum tokens required: ${campaign.minTokensPerStop.toLocaleString()}`);
        return;
    }
    
    if (tokensAllocate > advertiserAvailable) {
        alert(`Insufficient tokens. You have ${advertiserAvailable.toLocaleString()} available but trying to allocate ${tokensAllocate.toLocaleString()}`);
        return;
    }
    
    if (!adTitle || !adDescription) {
        alert('Please fill in advertisement title and description');
        return;
    }
    
    if (adTitle.length > campaign.adSpecs.titleMaxLength) {
        alert(`Advertisement title is too long (max ${campaign.adSpecs.titleMaxLength} characters)`);
        return;
    }
    
    if (adDescription.length > campaign.adSpecs.descriptionMaxLength) {
        alert(`Advertisement description is too long (max ${campaign.adSpecs.descriptionMaxLength} characters)`);
        return;
    }
    
    if (!adImage) {
        alert('Please upload an advertisement image');
        return;
    }
    
    if (!offer) {
        alert('Please specify what players can redeem');
        return;
    }
    
    // Get tier pricing
    const tierPricing = {
        bronze: { fee: 200, minTokens: 5000 },
        silver: { fee: 500, minTokens: 10000 },
        gold: { fee: 1200, minTokens: 25000 },
        platinum: { fee: 2500, minTokens: 50000 }
    };
    
    const pricing = tierPricing[tier];
    const tokenCost = (tokensAllocate * 0.0035).toFixed(2);
    
    // Confirmation
    const confirmMsg = `Create Advertisement Token Stop?\n\n` +
        `📍 Location: ${name}\n` +
        `${address}\n\n` +
        `💰 COSTS:\n` +
        `• Monthly Fee: $${pricing.fee}\n` +
        `• Tokens Allocated: ${tokensAllocate.toLocaleString()} $Ember\n\n` +
        `📢 ADVERTISEMENT:\n` +
        `• Title: "${adTitle}"\n` +
        `• Offer: "${offer}" (${offerCost} $Ember)\n\n` +
        `After creation:\n` +
        `• Available tokens: ${(advertiserAvailable - tokensAllocate).toLocaleString()}\n` +
        `• Scanner App required for redemptions\n\n` +
        `Continue?`;
    
    if (confirm(confirmMsg)) {
        // Simulate creation
        alert(`✓ Advertisement Token Stop Created!\n\n` +
            `📍 ${name} is now live in ${campaign.name}\n\n` +
            `${tokensAllocate.toLocaleString()} $Ember allocated with your advertisement.\n\n` +
            `Next Steps:\n` +
            `1. Ensure Scanner App is downloaded\n` +
            `2. Train staff on redemption process\n` +
            `3. Players will start collecting & seeing your ad!\n` +
            `4. Monitor redemptions in analytics\n\n` +
            `Monthly fee of $${pricing.fee} will be charged starting next month.`);
        
        // Update advertiser balance (in real app, this would be server-side)
        if (window.AdvertiserData?.tokenBalance) {
            window.AdvertiserData.tokenBalance.distributed += tokensAllocate;
            window.AdvertiserData.tokenBalance.available -= tokensAllocate;
        }
        
        // Reload campaign control
        if (typeof window.loadCampaignControl === 'function') {
            window.loadCampaignControl(campaignId);
        } else if (typeof window.loadSection === 'function') {
            window.loadSection('overview');
        }
    }
}

/**
 * Edit advertisement
 */
function editAdvertisement(locationId, campaignId) {
    alert(`Edit Advertisement\n\nThis would open a form to edit your:\n• Advertisement title & description\n• Advertisement image\n• Redemption offer details\n• CTA button text & URL`);
}

/**
 * Add more tokens to existing stop
 */
function addMoreTokens(locationId, campaignId) {
    const advertiserAvailable = window.AdvertiserData?.tokenBalance?.available || 0;
    
    const amount = prompt(`How many tokens to add?\n\nAvailable: ${advertiserAvailable.toLocaleString()} $Ember`, '5000');
    
    if (amount) {
        const tokens = parseInt(amount);
        
        if (tokens > advertiserAvailable) {
            alert(`Insufficient tokens. You have ${advertiserAvailable.toLocaleString()} available.`);
            if (confirm('Purchase more tokens?')) {
                if (typeof window.loadSection === 'function') {
                    window.loadSection('wallet');
                }
            }
            return;
        }
        
        alert(`✓ Added ${tokens.toLocaleString()} $Ember to this token stop.\n\nNew available balance: ${(advertiserAvailable - tokens).toLocaleString()} $Ember`);
        
        // Update balance
        if (window.AdvertiserData?.tokenBalance) {
            window.AdvertiserData.tokenBalance.distributed += tokens;
            window.AdvertiserData.tokenBalance.available -= tokens;
        }
        
        if (typeof window.loadCampaignControl === 'function') {
            window.loadCampaignControl(campaignId);
        }
    }
}

// Export functions
if (typeof window !== 'undefined') {
    window.getCampaignControlContent = getCampaignControlContent;
    window.updateCharCount = updateCharCount;
    window.previewAdImage = previewAdImage;
    window.updateTokenRequirement = updateTokenRequirement;
    window.updateTokenAllocationSummary = updateTokenAllocationSummary;
    window.createAdvertisementTokenStop = createAdvertisementTokenStop;
    window.editAdvertisement = editAdvertisement;
    window.addMoreTokens = addMoreTokens;
}
