/* ============================================
   VAULT PHOENIX MANAGEMENT SYSTEM
   Token Economy - Advertisement-Based Model
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
        campaignManagers: true,
        advertisers: false // Advertisers must purchase tokens
    },
    
    // Advertisement-Based Token Model
    tokenModel: {
        enabled: true,
        description: 'Advertisers fund token stops with $Ember that includes their advertisement. Players collect tokens, see ads, then redeem at advertiser locations.',
        
        // Token stop requirements
        tokenStop: {
            minTokens: 1000,           // Minimum tokens per stop
            recommendedTokens: 5000,   // Recommended amount
            tokensPerCollection: 50,   // Amount player gets per visit
            advertisementRequired: true, // Must include ad content
            
            // Ad content requirements
            advertisement: {
                maxTitleLength: 60,
                maxDescriptionLength: 200,
                imageRequired: true,
                offerRequired: true,
                ctaRequired: true
            }
        },
        
        // Redemption process
        redemption: {
            scannerAppRequired: true,
            qrCodeBased: true,
            instantTransfer: true,
            minimumRedemption: 25,  // Min tokens to redeem
            description: 'Advertiser scans player QR code → receives $Ember → gives offer to player'
        },
        
        // Player options
        playerOptions: {
            cashOut: {
                enabled: true,
                destination: 'Coinbase Wallet',
                minimumAmount: 100  // Min tokens to cash out
            },
            redemption: {
                enabled: true,
                atLocation: true,
                requiresPhysicalVisit: true
            }
        }
    }
};

// ============================================
// LOCATION PLACEMENT PRICING TIERS
// ============================================

const LocationPricing = {
    bronze: {
        name: 'Bronze',
        monthlyFee: 200,
        features: [
            'Basic visibility',
            'Standard placement',
            'Monthly reporting',
            'Scanner app access',
            'Advertisement display'
        ],
        minTokensRequired: 5000  // Must purchase to fund location
    },
    silver: {
        name: 'Silver',
        monthlyFee: 500,
        features: [
            'Enhanced visibility',
            'Priority placement',
            'Weekly reporting',
            'Custom branding',
            'Scanner app access',
            'Advertisement display',
            'Analytics dashboard'
        ],
        minTokensRequired: 10000
    },
    gold: {
        name: 'Gold',
        monthlyFee: 1200,
        features: [
            'Featured placement',
            'Exclusive territory',
            'Daily reporting',
            'Premium support',
            'Scanner app access',
            'Advertisement display',
            'Advanced analytics',
            'Custom ad design'
        ],
        minTokensRequired: 25000
    },
    platinum: {
        name: 'Platinum',
        monthlyFee: 2500,
        features: [
            'Premium positioning',
            'Guaranteed traffic',
            'Real-time reporting',
            'Dedicated account manager',
            'Scanner app access',
            'Advertisement display',
            'Custom integration',
            'Video ad support'
        ],
        minTokensRequired: 50000
    }
};

// ============================================
// REVENUE TRACKING
// ============================================

const RevenueData = {
    currentMonth: {
        locationFees: 32400,      // Monthly location fees
        tokenSales: 45600,        // Tokens sold to advertisers
        total: 78000              // Total revenue
    },
    lastMonth: {
        locationFees: 27500,
        tokenSales: 38200,
        total: 65700
    },
    
    // Advertiser spending
    advertisers: [
        {
            name: 'Heritage Square Historic Site',
            tier: 'silver',
            locationFee: 500,
            tokensOwned: 12450,
            tokensDistributed: 8750,
            tokensRedeemed: 3250,  // Received back via redemptions
            totalSpent: 500 + (12450 * 0.0035),  // Location fee + token purchase
            redemptionsThisMonth: 65,
            averageRedemption: 50  // tokens per redemption
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
 * Calculate minimum token purchase for tier
 */
function getMinimumTokensForTier(tier) {
    return LocationPricing[tier]?.minTokensRequired || 5000;
}

/**
 * Calculate total cost for advertiser (location fee + tokens)
 */
function calculateAdvertiserTotalCost(tier, tokenAmount) {
    const locationFee = LocationPricing[tier]?.monthlyFee || 0;
    const tokenCost = tokenAmount * TokenEconomy.marketPrice;
    return {
        locationFee: locationFee,
        tokenCost: tokenCost,
        total: locationFee + tokenCost
    };
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
 * Get revenue analytics content for Campaign Managers
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
                    </ul>
                </div>
                
                <!-- Token Sales to Advertisers -->
                <div class="revenue-stream">
                    <div class="revenue-header">
                        <div class="revenue-icon">💎</div>
                        <div class="revenue-title">$Ember Token Sales</div>
                    </div>
                    <div class="revenue-amount">${formatCurrency(RevenueData.currentMonth.tokenSales)}</div>
                    <div class="revenue-change positive">
                        +${((RevenueData.currentMonth.tokenSales - RevenueData.lastMonth.tokenSales) / RevenueData.lastMonth.tokenSales * 100).toFixed(1)}% vs last month
                    </div>
                    <ul class="revenue-details">
                        <li class="revenue-detail">
                            <span class="revenue-detail-label">Tokens Sold</span>
                            <span class="revenue-detail-value">${formatTokens(RevenueData.currentMonth.tokenSales / TokenEconomy.marketPrice)}</span>
                        </li>
                        <li class="revenue-detail">
                            <span class="revenue-detail-label">Avg Price</span>
                            <span class="revenue-detail-value">$${TokenEconomy.marketPrice.toFixed(4)}</span>
                        </li>
                    </ul>
                </div>
            </div>
            
            <!-- Total Revenue Summary -->
            <div class="revenue-total">
                <div class="revenue-total-label">Total Monthly Revenue</div>
                <div class="revenue-total-amount">${formatCurrency(RevenueData.currentMonth.total)}</div>
                
                <div class="revenue-breakdown">
                    <div class="breakdown-bar">
                        <div class="breakdown-fill" style="width: ${(RevenueData.currentMonth.locationFees / RevenueData.currentMonth.total * 100)}%">
                            Location Fees: ${formatCurrency(RevenueData.currentMonth.locationFees)}
                        </div>
                    </div>
                    <div class="breakdown-bar">
                        <div class="breakdown-fill" style="width: ${(RevenueData.currentMonth.tokenSales / RevenueData.currentMonth.total * 100)}%">
                            Token Sales: ${formatCurrency(RevenueData.currentMonth.tokenSales)}
                        </div>
                    </div>
                </div>
                
                <div style="margin-top: 30px; padding: 25px; background: rgba(240,165,0,0.1); border: 2px solid rgba(240,165,0,0.3); border-radius: 12px;">
                    <h4 style="color: var(--color-primary-gold); margin-bottom: 15px; font-size: 1.3rem;">
                        💡 How The $Ember Ecosystem Works
                    </h4>
                    <ul style="list-style: none; padding: 0; margin: 0;">
                        <li style="padding: 10px 0; border-bottom: 1px solid rgba(255,255,255,0.1);">
                            <strong>1.</strong> Advertisers pay monthly location fees to participate in campaigns
                        </li>
                        <li style="padding: 10px 0; border-bottom: 1px solid rgba(255,255,255,0.1);">
                            <strong>2.</strong> Advertisers purchase $Ember tokens to fund their token stops
                        </li>
                        <li style="padding: 10px 0; border-bottom: 1px solid rgba(255,255,255,0.1);">
                            <strong>3.</strong> Each token includes the advertiser's advertisement
                        </li>
                        <li style="padding: 10px 0; border-bottom: 1px solid rgba(255,255,255,0.1);">
                            <strong>4.</strong> Players collect tokens at locations and see the advertisement
                        </li>
                        <li style="padding: 10px 0; border-bottom: 1px solid rgba(255,255,255,0.1);">
                            <strong>5.</strong> Players can cash out to Coinbase OR redeem offers at advertiser locations
                        </li>
                        <li style="padding: 10px 0;">
                            <strong>6.</strong> Advertisers scan player QR codes → receive $Ember back → give offers
                        </li>
                    </ul>
                </div>
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
                        <div style="background: rgba(240,165,0,0.15); border: 1px solid rgba(240,165,0,0.4); border-radius: 8px; padding: 12px; margin-bottom: 15px;">
                            <div style="font-size: 0.85rem; color: rgba(255,255,255,0.7); margin-bottom: 5px;">
                                Required Token Purchase
                            </div>
                            <div style="font-size: 1.3rem; font-weight: 900; color: var(--color-primary-gold);">
                                ${formatTokens(tier.minTokensRequired)} $Ember
                            </div>
                            <div style="font-size: 0.8rem; color: rgba(255,255,255,0.6); margin-top: 5px;">
                                ≈ ${formatCurrency(tier.minTokensRequired * TokenEconomy.marketPrice)} one-time
                            </div>
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
    if (role === 'advertiser') {
        return getAdvertiserTokenContent();
    }
    
    return getCampaignManagerTokenContent();
}

function getCampaignManagerTokenContent() {
    const starterTokens = calculateTokensFromUSD(TokenEconomy.starterBonus.amount);
    
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
                </div>
                
                <div style="margin-top: 30px; padding-top: 20px; border-top: 2px solid rgba(255,255,255,0.1);">
                    <h4 style="margin-bottom: 15px; color: var(--color-primary-orange);">Token Sources</h4>
                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 15px;">
                        <div style="padding: 15px; background: rgba(0,0,0,0.3); border-radius: 12px;">
                            <div style="color: rgba(255,255,255,0.7); margin-bottom: 5px;">Starter Bonus</div>
                            <div style="font-size: 1.3rem; font-weight: 700; color: #22c55e;">
                                ${formatTokens(starterTokens)} $Ember ✓
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function getAdvertiserTokenContent() {
    return `
        <div class="dashboard-section">
            <h2 class="section-title">💎 Your $Ember Token Balance</h2>
            
            <div class="card" style="background: rgba(240,165,0,0.1); border: 2px solid rgba(240,165,0,0.3); margin-bottom: 30px;">
                <div style="text-align: center; padding: 20px;">
                    <div style="font-size: 4rem; margin-bottom: 20px;">💎</div>
                    <h3 style="font-size: 2rem; color: var(--color-primary-gold); margin-bottom: 15px;">
                        Purchase $Ember Tokens
                    </h3>
                    <p style="font-size: 1.1rem; color: rgba(255,255,255,0.8); max-width: 600px; margin: 0 auto 25px;">
                        To add token stops to campaigns, you must first purchase $Ember tokens. These tokens fund your 
                        location stops and include your advertisements that players see when collecting.
                    </p>
                    <button class="btn btn-primary btn-large" onclick="loadSection('wallet')" style="font-size: 1.2rem; padding: 18px 40px;">
                        Buy $Ember Tokens
                    </button>
                </div>
            </div>
            
            <!-- How It Works -->
            <div class="card">
                <h3 style="color: var(--color-primary-gold); margin-bottom: 20px;">
                    💡 How The $Ember Token System Works
                </h3>
                
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 20px; margin-bottom: 25px;">
                    <div style="padding: 20px; background: rgba(0,0,0,0.2); border-radius: 12px;">
                        <div style="font-size: 2.5rem; margin-bottom: 10px;">1️⃣</div>
                        <h4 style="margin-bottom: 10px;">Purchase Tokens</h4>
                        <p style="color: rgba(255,255,255,0.7); margin: 0; line-height: 1.6;">
                            Buy $Ember tokens at current market price to fund your token stops in campaigns.
                        </p>
                    </div>
                    
                    <div style="padding: 20px; background: rgba(0,0,0,0.2); border-radius: 12px;">
                        <div style="font-size: 2.5rem; margin-bottom: 10px;">2️⃣</div>
                        <h4 style="margin-bottom: 10px;">Add Advertisement</h4>
                        <p style="color: rgba(255,255,255,0.7); margin: 0; line-height: 1.6;">
                            Your tokens include your ad content - title, description, image, and offer details.
                        </p>
                    </div>
                    
                    <div style="padding: 20px; background: rgba(0,0,0,0.2); border-radius: 12px;">
                        <div style="font-size: 2.5rem; margin-bottom: 10px;">3️⃣</div>
                        <h4 style="margin-bottom: 10px;">Players Collect</h4>
                        <p style="color: rgba(255,255,255,0.7); margin: 0; line-height: 1.6;">
                            Players visit your location, collect tokens, and see your advertisement.
                        </p>
                    </div>
                    
                    <div style="padding: 20px; background: rgba(0,0,0,0.2); border-radius: 12px;">
                        <div style="font-size: 2.5rem; margin-bottom: 10px;">4️⃣</div>
                        <h4 style="margin-bottom: 10px;">Redeem & Recover</h4>
                        <p style="color: rgba(255,255,255,0.7); margin: 0; line-height: 1.6;">
                            Players redeem at your location. You scan their QR code → get $Ember back → give offer.
                        </p>
                    </div>
                </div>
                
                <div style="background: rgba(34,197,94,0.15); border: 2px solid rgba(34,197,94,0.4); border-radius: 12px; padding: 20px;">
                    <h4 style="color: #22c55e; margin-bottom: 12px;">💰 The Circular Economy</h4>
                    <p style="color: rgba(255,255,255,0.9); margin: 0; line-height: 1.7;">
                        You purchase $Ember → Fund token stops with ads → Players collect & see your ad → 
                        Players visit to redeem → You scan QR & receive $Ember back → Reuse tokens for more stops!
                    </p>
                </div>
            </div>
        </div>
    `;
}

// Auto-update price every 5 minutes
setInterval(updateMarketPrice, TokenEconomy.priceUpdateInterval);

// Export functions
if (typeof window !== 'undefined') {
    window.TokenEconomy = TokenEconomy;
    window.LocationPricing = LocationPricing;
    window.getRevenueContent = getRevenueContent;
    window.getTokensContent = getTokensContent;
    window.formatCurrency = formatCurrency;
    window.formatTokens = formatTokens;
    window.calculateTokensFromUSD = calculateTokensFromUSD;
    window.calculateUSDFromTokens = calculateUSDFromTokens;
    window.getMinimumTokensForTier = getMinimumTokensForTier;
    window.calculateAdvertiserTotalCost = calculateAdvertiserTotalCost;
}
