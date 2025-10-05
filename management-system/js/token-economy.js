/* ============================================
   VAULT PHOENIX MANAGEMENT SYSTEM
   Token Economy - QR Code Exchange Model
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
    },
    
    // QR Code Exchange Model
    qrExchangeModel: {
        enabled: true,
        scannerAppRequired: true,
        transactionFee: 0, // No platform fee on direct exchanges
        averageTransactionValue: 50, // tokens per scan
        description: 'Players scan advertiser QR codes to exchange $Ember for products/services'
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
        features: ['Basic visibility', 'Standard placement', 'Monthly reporting', 'Scanner app access']
    },
    silver: {
        name: 'Silver',
        monthlyFee: 500,
        setupFee: 1000,
        features: ['Enhanced visibility', 'Priority placement', 'Weekly reporting', 'Custom branding', 'Scanner app access', 'QR code analytics']
    },
    gold: {
        name: 'Gold',
        monthlyFee: 1200,
        setupFee: 2500,
        features: ['Featured placement', 'Exclusive territory', 'Daily reporting', 'Premium support', 'Analytics dashboard', 'Scanner app access', 'Real-time QR tracking']
    },
    platinum: {
        name: 'Platinum',
        monthlyFee: 2500,
        setupFee: 5000,
        features: ['Premium positioning', 'Guaranteed traffic', 'Real-time reporting', 'Dedicated account manager', 'Custom integration', 'Priority support', 'Scanner app access', 'Advanced QR analytics']
    }
};

// ============================================
// REVENUE TRACKING
// ============================================

const RevenueData = {
    currentMonth: {
        locationFees: 32400,
        tokenFunding: 0, // No longer selling tokens to advertisers
        qrTransactions: 14992, // Revenue from location fees drives QR exchange economy
        total: 32400
    },
    lastMonth: {
        locationFees: 27500,
        tokenFunding: 0,
        qrTransactions: 12000,
        total: 27500
    },
    merchants: [
        {
            name: 'Downtown Plaza',
            tier: 'platinum',
            locationFee: 2500,
            qrScansMonth: 450,
            avgTokensPerScan: 50,
            totalTokensReceived: 22500,
            total: 2500
        },
        {
            name: 'Heritage Square',
            tier: 'gold',
            locationFee: 1200,
            qrScansMonth: 225,
            avgTokensPerScan: 50,
            totalTokensReceived: 11250,
            total: 1200
        },
        {
            name: 'Roosevelt Arts',
            tier: 'silver',
            locationFee: 500,
            qrScansMonth: 150,
            avgTokensPerScan: 50,
            totalTokensReceived: 7500,
            total: 500
        },
        {
            name: 'Chase Field',
            tier: 'platinum',
            locationFee: 2500,
            qrScansMonth: 900,
            avgTokensPerScan: 50,
            totalTokensReceived: 45000,
            total: 2500
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
    if (role !== 'campaign-manager' && role !== 'system-admin') {
        return getPlaceholderContent('revenue');
    }
    
    const percentChange = ((RevenueData.currentMonth.total - RevenueData.lastMonth.total) / RevenueData.lastMonth.total * 100).toFixed(1);
    
    return `
        <div class="dashboard-section">
            <h2 class="section-title">💰 Revenue Analytics</h2>
            
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
                
                <!-- QR Exchange Activity -->
                <div class="revenue-stream">
                    <div class="revenue-header">
                        <div class="revenue-icon">📱</div>
                        <div class="revenue-title">QR Exchange Activity</div>
                    </div>
                    <div class="revenue-amount">${formatTokens(RevenueData.currentMonth.qrTransactions)} Scans</div>
                    <div class="revenue-change positive">
                        +${((RevenueData.currentMonth.qrTransactions - RevenueData.lastMonth.qrTransactions) / RevenueData.lastMonth.qrTransactions * 100).toFixed(1)}% vs last month
                    </div>
                    <ul class="revenue-details">
                        <li class="revenue-detail">
                            <span class="revenue-detail-label">Active Scanners</span>
                            <span class="revenue-detail-value">47</span>
                        </li>
                        <li class="revenue-detail">
                            <span class="revenue-detail-label">Avg Tokens/Scan</span>
                            <span class="revenue-detail-value">50 $Ember</span>
                        </li>
                        <li class="revenue-detail">
                            <span class="revenue-detail-label">Total Tokens Exchanged</span>
                            <span class="revenue-detail-value">${formatTokens(RevenueData.currentMonth.qrTransactions * 50)}</span>
                        </li>
                    </ul>
                </div>
            </div>
            
            <!-- Total Revenue Summary -->
            <div class="revenue-total">
                <div class="revenue-total-label">Total Monthly Revenue</div>
                <div class="revenue-total-amount">${formatCurrency(RevenueData.currentMonth.total)}</div>
                <div style="margin-top: 20px; padding: 20px; background: rgba(240,165,0,0.1); border: 1px solid rgba(240,165,0,0.3); border-radius: 12px;">
                    <h4 style="color: var(--color-primary-gold); margin-bottom: 15px;">How The Ecosystem Works:</h4>
                    <ul style="list-style: none; padding: 0; margin: 0;">
                        <li style="padding: 8px 0; border-bottom: 1px solid rgba(255,255,255,0.1);">
                            ✓ Advertisers pay monthly location fees to participate in campaigns
                        </li>
                        <li style="padding: 8px 0; border-bottom: 1px solid rgba(255,255,255,0.1);">
                            ✓ Campaign managers fund token pools that players collect at locations
                        </li>
                        <li style="padding: 8px 0; border-bottom: 1px solid rgba(255,255,255,0.1);">
                            ✓ Players visit advertiser locations and scan QR codes to exchange $Ember for products/services
                        </li>
                        <li style="padding: 8px 0;">
                            ✓ Advertisers receive $Ember back into their accounts, creating a circular economy
                        </li>
                    </ul>
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
                            <th>Monthly Fee</th>
                            <th>QR Scans</th>
                            <th>Tokens Received</th>
                            <th>Avg/Scan</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${RevenueData.merchants.map(merchant => `
                            <tr>
                                <td>${merchant.name}</td>
                                <td><span class="tier-badge tier-${merchant.tier}">${merchant.tier}</span></td>
                                <td>${formatCurrency(merchant.locationFee)}/mo</td>
                                <td>${formatTokens(merchant.qrScansMonth)}</td>
                                <td>${formatTokens(merchant.totalTokensReceived)} $Ember</td>
                                <td>${merchant.avgTokensPerScan} $Ember</td>
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
