/* ============================================
   VAULT PHOENIX MANAGEMENT SYSTEM
   Token Economy - Dual Revenue System
   ============================================ */

// ============================================
// TOKEN ECONOMY CONFIGURATION
// ============================================

const TokenEconomy = {
    // Current market price (updated from Smithii.io)
    marketPrice: 0.0035,
    lastPriceUpdate: new Date(),
    priceUpdateInterval: 300000, // 5 minutes
    
    // Presale configuration (Admin only)
    presale: {
        price: 0.003,
        target: 500000,
        tokensAvailable: 166700000,
        allocation: {
            liquidity: 0.40,    // 40% - $200K
            development: 0.35,  // 35% - $175K
            legal: 0.15,        // 15% - $75K
            marketing: 0.10     // 10% - $50K
        }
    },
    
    // Total supply breakdown
    totalSupply: 1000000000, // 1 Billion tokens
    allocation: {
        campaignPool: 0.35,      // 35% - 350M
        platformIncentives: 0.30, // 30% - 300M
        presale: 0.1667,         // 16.67% - 166.7M
        team: 0.10,              // 10% - 100M
        treasury: 0.05,          // 5% - 50M
        reserve: 0.0333          // 3.33% - 33.3M
    },
    
    // Starter token program
    starterBonus: {
        amount: 100, // USD value
        platformOperators: true,
        sdkCustomers: true,
        merchants: false
    }
};

// ============================================
// LOCATION PLACEMENT PRICING TIERS
// ============================================

const LocationPricing = {
    bronze: {
        name: 'Bronze',
        monthlyFee: 200,
        setupFee: 500,
        features: ['Basic visibility', 'Standard placement', 'Monthly reporting']
    },
    silver: {
        name: 'Silver',
        monthlyFee: 500,
        setupFee: 1000,
        features: ['Enhanced visibility', 'Priority placement', 'Weekly reporting', 'Custom branding']
    },
    gold: {
        name: 'Gold',
        monthlyFee: 1200,
        setupFee: 2500,
        features: ['Featured placement', 'Exclusive territory', 'Daily reporting', 'Premium support', 'Analytics dashboard']
    },
    platinum: {
        name: 'Platinum',
        monthlyFee: 2500,
        setupFee: 5000,
        features: ['Premium positioning', 'Guaranteed traffic', 'Real-time reporting', 'Dedicated account manager', 'Custom integration', 'Priority support']
    }
};

// ============================================
// TOKEN REQUIREMENTS BY LOCATION TYPE
// ============================================

const TokenRequirements = {
    lowTraffic: {
        name: 'Low Traffic',
        range: [1000, 2500],
        description: 'Residential/suburban areas'
    },
    mediumTraffic: {
        name: 'Medium Traffic',
        range: [2500, 5000],
        description: 'Shopping districts, restaurants'
    },
    highTraffic: {
        name: 'High Traffic',
        range: [5000, 10000],
        description: 'Stadiums, events, tourist attractions'
    },
    premiumZones: {
        name: 'Premium Zones',
        range: [10000, 50000],
        description: 'Major venues, exclusive partnerships'
    }
};

// ============================================
// REVENUE TRACKING
// ============================================

const RevenueData = {
    currentMonth: {
        locationFees: 32400,
        tokenFunding: 14992,
        total: 47392
    },
    lastMonth: {
        locationFees: 27500,
        tokenFunding: 12000,
        total: 39500
    },
    merchants: [
        {
            name: 'Downtown Plaza',
            tier: 'platinum',
            locationFee: 2500,
            tokenPurchases: 450,
            tokensAmount: 15000,
            total: 2950
        },
        {
            name: 'Heritage Square',
            tier: 'gold',
            locationFee: 1200,
            tokenPurchases: 225,
            tokensAmount: 7500,
            total: 1425
        },
        {
            name: 'Roosevelt Arts',
            tier: 'silver',
            locationFee: 500,
            tokenPurchases: 150,
            tokensAmount: 5000,
            total: 650
        },
        {
            name: 'Chase Field',
            tier: 'platinum',
            locationFee: 2500,
            tokenPurchases: 900,
            tokensAmount: 30000,
            total: 3400
        }
    ]
};

// ============================================
// UTILITY FUNCTIONS
// ============================================

/**
 * Calculate token amount from USD value at current market price
 */
function calculateTokensFromUSD(usdAmount) {
    return Math.floor(usdAmount / TokenEconomy.marketPrice);
}

/**
 * Calculate USD value from token amount at current market price
 */
function calculateUSDFromTokens(tokenAmount) {
    return (tokenAmount * TokenEconomy.marketPrice).toFixed(2);
}

/**
 * Get starter token amount based on current market price
 */
function getStarterTokenAmount() {
    return calculateTokensFromUSD(TokenEconomy.starterBonus.amount);
}

/**
 * Format currency
 */
function formatCurrency(amount) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    }).format(amount);
}

/**
 * Format token amount
 */
function formatTokens(amount) {
    return new Intl.NumberFormat('en-US').format(amount);
}

/**
 * Update market price from Smithii.io (simulated)
 */
function updateMarketPrice() {
    // In production, this would fetch from Smithii.io API
    // For demo, we'll simulate minor price fluctuations
    const fluctuation = (Math.random() - 0.5) * 0.0001;
    TokenEconomy.marketPrice = Math.max(0.002, TokenEconomy.marketPrice + fluctuation);
    TokenEconomy.lastPriceUpdate = new Date();
    
    console.log('Market price updated:', TokenEconomy.marketPrice);
    
    // Update UI if token balance is visible
    if (window.AppState && window.AppState.tokenBalance) {
        window.AppState.tokenBalance.price = TokenEconomy.marketPrice;
        if (typeof window.updateTokenBalance === 'function') {
            window.updateTokenBalance();
        }
    }
}

// ============================================
// REVENUE ANALYTICS CONTENT
// ============================================

/**
 * Get revenue analytics content for Platform Operators
 */
function getRevenueContent(role) {
    if (role !== 'platform-operator' && role !== 'system-admin') {
        return getPlaceholderContent('revenue');
    }
    
    const percentChange = ((RevenueData.currentMonth.total - RevenueData.lastMonth.total) / RevenueData.lastMonth.total * 100).toFixed(1);
    const locationFeePercent = (RevenueData.currentMonth.locationFees / RevenueData.currentMonth.total * 100).toFixed(0);
    const tokenFundingPercent = (RevenueData.currentMonth.tokenFunding / RevenueData.currentMonth.total * 100).toFixed(0);
    
    return `
        <div class="dashboard-section">
            <h2 class="section-title">💰 Dual Revenue Streams</h2>
            
            <div class="revenue-grid">
                <!-- Location Placement Fees -->
                <div class="revenue-stream">
                    <div class="revenue-header">
                        <div class="revenue-icon">📍</div>
                        <div class="revenue-title">Location Placement Fees</div>
                    </div>
                    <div class="revenue-amount">${formatCurrency(RevenueData.currentMonth.locationFees)}</div>
                    <div class="revenue-change positive">
                        +${((RevenueData.currentMonth.locationFees - RevenueData.lastMonth.locationFees) / RevenueData.lastMonth.locationFees * 100).toFixed(1)}% vs last month
                    </div>
                    <ul class="revenue-details">
                        <li class="revenue-detail">
                            <span class="revenue-detail-label">Active Locations</span>
                            <span class="revenue-detail-value">47</span>
                        </li>
                        <li class="revenue-detail">
                            <span class="revenue-detail-label">Avg per Location</span>
                            <span class="revenue-detail-value">${formatCurrency(RevenueData.currentMonth.locationFees / 47)}</span>
                        </li>
                        <li class="revenue-detail">
                            <span class="revenue-detail-label">Premium Placements</span>
                            <span class="revenue-detail-value">23</span>
                        </li>
                    </ul>
                </div>
                
                <!-- Token Funding Revenue -->
                <div class="revenue-stream">
                    <div class="revenue-header">
                        <div class="revenue-icon">💎</div>
                        <div class="revenue-title">Token Funding Revenue</div>
                    </div>
                    <div class="revenue-amount">${formatCurrency(RevenueData.currentMonth.tokenFunding)}</div>
                    <div class="revenue-change positive">
                        +${((RevenueData.currentMonth.tokenFunding - RevenueData.lastMonth.tokenFunding) / RevenueData.lastMonth.tokenFunding * 100).toFixed(1)}% vs last month
                    </div>
                    <ul class="revenue-details">
                        <li class="revenue-detail">
                            <span class="revenue-detail-label">Tokens Sold</span>
                            <span class="revenue-detail-value">1.2M</span>
                        </li>
                        <li class="revenue-detail">
                            <span class="revenue-detail-label">Market Price</span>
                            <span class="revenue-detail-value">$${TokenEconomy.marketPrice.toFixed(4)}</span>
                        </li>
                        <li class="revenue-detail">
                            <span class="revenue-detail-label">Tokens Distributed</span>
                            <span class="revenue-detail-value">156K</span>
                        </li>
                    </ul>
                </div>
            </div>
            
            <!-- Total Revenue Summary -->
            <div class="revenue-total">
                <div class="revenue-total-label">Total Combined Revenue</div>
                <div class="revenue-total-amount">${formatCurrency(RevenueData.currentMonth.total)}</div>
                <div class="revenue-breakdown">
                    <div class="breakdown-bar">
                        <div class="breakdown-fill" style="width: ${locationFeePercent}%;">
                            ${locationFeePercent}% Location Fees
                        </div>
                    </div>
                    <div class="breakdown-bar">
                        <div class="breakdown-fill" style="width: ${tokenFundingPercent}%; background: var(--gradient-ember);">
                            ${tokenFundingPercent}% Token Funding
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        <!-- Merchant Performance Table -->
        <div class="dashboard-section">
            <h2 class="section-title">🏢 Merchant Performance</h2>
            
            <div class="merchants-table-wrapper">
                <table class="merchants-table">
                    <thead>
                        <tr>
                            <th>Merchant</th>
                            <th>Tier</th>
                            <th>Location Fee</th>
                            <th>Token Purchases</th>
                            <th>Tokens Amount</th>
                            <th>Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${RevenueData.merchants.map(merchant => `
                            <tr>
                                <td>${merchant.name}</td>
                                <td><span class="tier-badge tier-${merchant.tier}">${merchant.tier}</span></td>
                                <td>${formatCurrency(merchant.locationFee)}/mo</td>
                                <td>${formatCurrency(merchant.tokenPurchases)}</td>
                                <td>${formatTokens(merchant.tokensAmount)} $Ember</td>
                                <td><strong>${formatCurrency(merchant.total)}</strong></td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
        </div>
        
        <!-- Pricing Tiers Reference -->
        <div class="dashboard-section">
            <h2 class="section-title">💳 Location Placement Pricing Tiers</h2>
            
            <div class="apps-grid">
                ${Object.entries(LocationPricing).map(([key, tier]) => `
                    <div class="card">
                        <h3 style="color: var(--color-primary-gold); margin-bottom: 15px;">
                            ${tier.name} Tier
                        </h3>
                        <div style="font-size: 2rem; font-weight: 900; color: var(--color-primary-orange); margin-bottom: 10px;">
                            ${formatCurrency(tier.monthlyFee)}<span style="font-size: 1rem; color: rgba(255,255,255,0.6);">/month</span>
                        </div>
                        <div style="color: rgba(255,255,255,0.6); margin-bottom: 20px;">
                            Setup Fee: ${formatCurrency(tier.setupFee)}
                        </div>
                        <ul style="list-style: none; padding: 0; margin: 0;">
                            ${tier.features.map(feature => `
                                <li style="padding: 8px 0; border-bottom: 1px solid rgba(255,255,255,0.1);">
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

/**
 * Get token inventory content
 */
function getTokensContent(role) {
    if (role === 'merchant') {
        return getPlaceholderContent('tokens');
    }
    
    const starterTokens = getStarterTokenAmount();
    
    return `
        <div class="dashboard-section">
            <h2 class="section-title">💎 Token Inventory Management</h2>
            
            <!-- Current Balance -->
            <div class="card" style="margin-bottom: 30px;">
                <h3 style="margin-bottom: 20px;">Your Token Balance</h3>
                <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 20px;">
                    <div>
                        <div style="font-size: 3rem; font-weight: 900; color: var(--color-primary-gold); margin-bottom: 10px;">
                            ${formatTokens(window.AppState?.tokenBalance?.amount || 28450)} $Ember
                        </div>
                        <div style="color: rgba(255, 255, 255, 0.6); font-size: 1.1rem;">
                            Current Value: ${formatCurrency(calculateUSDFromTokens(window.AppState?.tokenBalance?.amount || 28450))} USD
                        </div>
                        <div style="color: rgba(255, 255, 255, 0.5); font-size: 0.9rem; margin-top: 5px;">
                            Market Price: $${TokenEconomy.marketPrice.toFixed(4)} per $Ember
                        </div>
                    </div>
                    <button class="btn btn-primary btn-large" onclick="showPurchaseInterface()">
                        Purchase More Tokens
                    </button>
                </div>
                
                <div style="margin-top: 30px; padding-top: 20px; border-top: 2px solid rgba(255,255,255,0.1);">
                    <h4 style="margin-bottom: 15px; color: var(--color-primary-orange);">Token Sources</h4>
                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 15px;">
                        <div style="padding: 15px; background: rgba(0,0,0,0.3); border-radius: 12px;">
                            <div style="color: rgba(255,255,255,0.7); margin-bottom: 5px;">Starter Bonus</div>
                            <div style="font-size: 1.3rem; font-weight: 700; color: #22c55e;">
                                ${formatTokens(starterTokens)} $Ember ✓
                            </div>
                            <div style="font-size: 0.85rem; color: rgba(255,255,255,0.5); margin-top: 3px;">
                                ($100 value at current price)
                            </div>
                        </div>
                        <div style="padding: 15px; background: rgba(0,0,0,0.3); border-radius: 12px;">
                            <div style="color: rgba(255,255,255,0.7); margin-bottom: 5px;">Purchased</div>
                            <div style="font-size: 1.3rem; font-weight: 700;">
                                0 $Ember
                            </div>
                            <div style="font-size: 0.85rem; color: rgba(255,255,255,0.5); margin-top: 3px;">
                                No purchases yet
                            </div>
                        </div>
                        <div style="padding: 15px; background: rgba(0,0,0,0.3); border-radius: 12px;">
                            <div style="color: rgba(255,255,255,0.7); margin-bottom: 5px;">Distributed Today</div>
                            <div style="font-size: 1.3rem; font-weight: 700; color: var(--color-primary-orange);">
                                12,450 $Ember
                            </div>
                            <div style="font-size: 0.85rem; color: rgba(255,255,255,0.5); margin-top: 3px;">
                                Via airdrops & campaigns
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <!-- Purchase Interface -->
            <div class="card" id="purchaseInterface" style="display: none;">
                <h3 style="margin-bottom: 20px;">💎 Purchase $Ember Tokens</h3>
                
                <div style="background: rgba(240,165,0,0.1); border: 1px solid rgba(240,165,0,0.3); border-radius: 12px; padding: 15px; margin-bottom: 25px;">
                    <div style="font-weight: 700; margin-bottom: 5px;">Current Market Price</div>
                    <div style="font-size: 1.5rem; color: var(--color-primary-gold);">
                        $${TokenEconomy.marketPrice.toFixed(4)} per $Ember
                    </div>
                    <div style="font-size: 0.85rem; color: rgba(255,255,255,0.6); margin-top: 5px;">
                        Price updated from Smithii.io every 5 minutes
                    </div>
                </div>
                
                <div class="form-group">
                    <label class="form-label">Purchase Amount (tokens)</label>
                    <input type="number" class="form-input" id="tokenPurchaseAmount" value="50000" min="1000" step="1000">
                </div>
                
                <div style="background: rgba(0,0,0,0.3); border-radius: 12px; padding: 20px; margin: 20px 0;">
                    <h4 style="margin-bottom: 15px;">Cost Breakdown</h4>
                    <div style="display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid rgba(255,255,255,0.1);">
                        <span>Token Cost:</span>
                        <span id="tokenCost">${formatCurrency(50000 * TokenEconomy.marketPrice)}</span>
                    </div>
                    <div style="display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid rgba(255,255,255,0.1);">
                        <span>Platform Fee:</span>
                        <span>$0.00</span>
                    </div>
                    <div style="display: flex; justify-content: space-between; padding: 10px 0; font-size: 1.2rem; font-weight: 700;">
                        <span>Total:</span>
                        <span id="totalCost" style="color: var(--color-primary-gold);">${formatCurrency(50000 * TokenEconomy.marketPrice)}</span>
                    </div>
                </div>
                
                <div style="background: rgba(34,197,94,0.1); border: 1px solid rgba(34,197,94,0.3); border-radius: 12px; padding: 15px; margin-bottom: 20px;">
                    <div style="font-weight: 700; margin-bottom: 10px;">Volume Discounts Available:</div>
                    <ul style="margin: 0; padding-left: 20px;">
                        <li>100K+ tokens: 5% discount</li>
                        <li>500K+ tokens: 10% discount</li>
                        <li>1M+ tokens: 15% discount</li>
                    </ul>
                </div>
                
                <div style="display: flex; gap: 15px;">
                    <button class="btn btn-primary btn-large" onclick="processPurchase()">
                        Purchase Tokens
                    </button>
                    <button class="btn btn-outline" onclick="hidePurchaseInterface()">
                        Cancel
                    </button>
                </div>
            </div>
            
            <!-- Token Requirements Reference -->
            <div class="card">
                <h3 style="margin-bottom: 20px;">📊 Token Requirements by Location Type</h3>
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 20px;">
                    ${Object.entries(TokenRequirements).map(([key, req]) => `
                        <div style="padding: 20px; background: rgba(0,0,0,0.3); border-radius: 12px;">
                            <h4 style="color: var(--color-primary-gold); margin-bottom: 10px;">${req.name}</h4>
                            <div style="font-size: 1.5rem; font-weight: 700; margin-bottom: 10px;">
                                ${formatTokens(req.range[0])} - ${formatTokens(req.range[1])}
                            </div>
                            <div style="color: rgba(255,255,255,0.6); font-size: 0.9rem;">
                                ${req.description}
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        </div>
    `;
}

/**
 * Show purchase interface
 */
function showPurchaseInterface() {
    const purchaseInterface = document.getElementById('purchaseInterface');
    if (purchaseInterface) {
        purchaseInterface.style.display = 'block';
        purchaseInterface.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    
    // Setup real-time calculation
    const amountInput = document.getElementById('tokenPurchaseAmount');
    if (amountInput) {
        amountInput.addEventListener('input', updatePurchaseCost);
    }
}

/**
 * Hide purchase interface
 */
function hidePurchaseInterface() {
    const purchaseInterface = document.getElementById('purchaseInterface');
    if (purchaseInterface) {
        purchaseInterface.style.display = 'none';
    }
}

/**
 * Update purchase cost calculation
 */
function updatePurchaseCost() {
    const amountInput = document.getElementById('tokenPurchaseAmount');
    const tokenCost = document.getElementById('tokenCost');
    const totalCost = document.getElementById('totalCost');
    
    if (amountInput && tokenCost && totalCost) {
        const amount = parseInt(amountInput.value) || 0;
        const cost = amount * TokenEconomy.marketPrice;
        
        tokenCost.textContent = formatCurrency(cost);
        totalCost.textContent = formatCurrency(cost);
    }
}

/**
 * Process token purchase
 */
function processPurchase() {
    const amountInput = document.getElementById('tokenPurchaseAmount');
    const amount = parseInt(amountInput?.value) || 0;
    
    if (amount < 1000) {
        alert('Minimum purchase is 1,000 tokens');
        return;
    }
    
    const cost = amount * TokenEconomy.marketPrice;
    
    if (confirm(`Purchase ${formatTokens(amount)} $Ember tokens for ${formatCurrency(cost)}?`)) {
        // Simulate purchase
        alert(`✓ Purchase successful!\n\nYou received ${formatTokens(amount)} $Ember tokens.\n\nNew Balance: ${formatTokens((window.AppState?.tokenBalance?.amount || 28450) + amount)} $Ember`);
        
        // Update balance
        if (window.AppState?.tokenBalance) {
            window.AppState.tokenBalance.amount += amount;
            if (typeof window.updateTokenBalance === 'function') {
                window.updateTokenBalance();
            }
        }
        
        hidePurchaseInterface();
        
        // Reload section to show updated balance
        if (typeof window.loadSection === 'function') {
            window.loadSection('tokens');
        }
    }
}

// ============================================
// AUTO-UPDATE MARKET PRICE
// ============================================

// Update price every 5 minutes
setInterval(updateMarketPrice, TokenEconomy.priceUpdateInterval);

// ============================================
// EXPORT FUNCTIONS
// ============================================

if (typeof window !== 'undefined') {
    window.TokenEconomy = TokenEconomy;
    window.getRevenueContent = getRevenueContent;
    window.getTokensContent = getTokensContent;
    window.showPurchaseInterface = showPurchaseInterface;
    window.hidePurchaseInterface = hidePurchaseInterface;
    window.processPurchase = processPurchase;
    window.formatCurrency = formatCurrency;
    window.formatTokens = formatTokens;
}
