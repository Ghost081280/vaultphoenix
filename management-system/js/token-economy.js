/* ============================================
   VAULT PHOENIX MANAGEMENT SYSTEM
   Token Economy - Advertisement-Based Model - FIXED
   ============================================ */

// ============================================
// TOKEN ECONOMY CONFIGURATION
// ============================================

const TokenEconomy = {
    // Current market price (from Coinbase/public exchanges)
    marketPrice: 0.0035,
    lastPriceUpdate: new Date(),
    priceUpdateInterval: 300000, // 5 minutes
    
    // Presale configuration
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
        advertisers: false // Advertisers must purchase tokens from Coinbase
    },
    
    // Advertisement-Based Token Model
    tokenModel: {
        enabled: true,
        description: 'Advertisers fund token stops with $Ember purchased from Coinbase that includes their advertisement. Players collect tokens, see ads, then redeem at advertiser locations.',
        
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
// LOCATION PLACEMENT PRICING - SIMPLIFIED
// ============================================

const LocationPricing = {
    // Campaign Manager sets these prices for their campaign
    defaultPricing: {
        singleLocation: {
            name: '1 Location',
            monthlyFee: 500,
            description: 'Perfect for single location businesses',
            allFeaturesIncluded: true
        },
        smallBusiness: {
            name: '2-5 Locations',
            monthlyFee: 400,
            monthlyFeePerLocation: 400,
            description: 'Great for small business chains',
            allFeaturesIncluded: true
        },
        mediumBusiness: {
            name: '6-10 Locations',
            monthlyFee: 350,
            monthlyFeePerLocation: 350,
            description: 'Ideal for growing businesses',
            allFeaturesIncluded: true
        },
        enterprise: {
            name: '11+ Locations',
            monthlyFee: 'Custom',
            description: 'Custom pricing for large deployments',
            contactRequired: true,
            allFeaturesIncluded: true
        }
    },
    
    // All features included regardless of location count
    includedFeatures: [
        'GPS-verified foot traffic',
        'Advertisement display system',
        'Scanner web app access',
        'Real-time analytics dashboard',
        'Token recovery via redemptions',
        'Custom branding options',
        'Multi-location management',
        'Email support',
        'CSV bulk upload',
        'Performance reporting'
    ]
};

// ============================================
// REVENUE TRACKING - FIXED (Location Fees Only)
// ============================================

const RevenueData = {
    currentMonth: {
        locationFees: 500,        // Monthly location fees from advertisers
        total: 500                // Total revenue (location fees only)
    },
    lastMonth: {
        locationFees: 500,
        total: 500
    },
    
    // Advertiser spending
    advertisers: [
        {
            name: 'Heritage Square Historic Site',
            locationCount: 1,
            monthlyFeePerLocation: 500,
            totalMonthlyFee: 500,
            tokensOwned: 12450,           // Purchased from Coinbase
            tokensDistributed: 8750,      // Currently in circulation at stops
            tokensRedeemed: 3250,         // Received back via redemptions
            tokensPurchasedFromCoinbase: 12450, // Total purchased from Coinbase
            redemptionsThisMonth: 65,
            averageRedemption: 50         // tokens per redemption
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
 * Calculate pricing based on location count
 */
function getPricingForLocationCount(locationCount) {
    if (locationCount === 1) {
        return LocationPricing.defaultPricing.singleLocation;
    } else if (locationCount >= 2 && locationCount <= 5) {
        return {
            ...LocationPricing.defaultPricing.smallBusiness,
            totalMonthlyFee: LocationPricing.defaultPricing.smallBusiness.monthlyFeePerLocation * locationCount
        };
    } else if (locationCount >= 6 && locationCount <= 10) {
        return {
            ...LocationPricing.defaultPricing.mediumBusiness,
            totalMonthlyFee: LocationPricing.defaultPricing.mediumBusiness.monthlyFeePerLocation * locationCount
        };
    } else {
        return LocationPricing.defaultPricing.enterprise;
    }
}

/**
 * Calculate total cost for advertiser (location fee + tokens from Coinbase)
 */
function calculateAdvertiserTotalCost(locationCount, tokenAmount) {
    const pricing = getPricingForLocationCount(locationCount);
    const locationFee = pricing.totalMonthlyFee || pricing.monthlyFee;
    const tokenCost = tokenAmount * TokenEconomy.marketPrice;
    
    return {
        locationFee: locationFee,
        tokenCostFromCoinbase: tokenCost, // FIXED: Clarify tokens bought from Coinbase
        total: (typeof locationFee === 'number' ? locationFee : 0) + tokenCost,
        pricePerLocation: pricing.monthlyFeePerLocation || pricing.monthlyFee
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
 * Update market price from Coinbase (simulated)
 */
function updateMarketPrice() {
    // In production, this would fetch from Coinbase/public exchange API
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
// REVENUE ANALYTICS CONTENT - FIXED
// ============================================

/**
 * Get revenue analytics content for Campaign Managers
 */
function getRevenueContent(role) {
    if (role !== 'campaign-manager') {
        return getPlaceholderContent('revenue');
    }
    
    const percentChange = ((RevenueData.currentMonth.total - RevenueData.lastMonth.total) / RevenueData.lastMonth.total * 100).toFixed(1);
    
    return `
        <div class="dashboard-section">
            <h2 class="section-title">💰 Revenue Analytics</h2>
            
            <div class="revenue-grid">
                <!-- Location Placement Fees (Only Revenue Source) -->
                <div class="revenue-stream">
                    <div class="revenue-header">
                        <div class="revenue-icon">📍</div>
                        <div class="revenue-title">Location Placement Fees</div>
                    </div>
                    <div class="revenue-amount">${formatCurrency(RevenueData.currentMonth.locationFees)}</div>
                    <div class="revenue-change ${percentChange >= 0 ? 'positive' : 'negative'}">
                        ${percentChange >= 0 ? '+' : ''}${percentChange}% vs last month
                    </div>
                    <ul class="revenue-details">
                        <li class="revenue-detail">
                            <span class="revenue-detail-label">Active Advertisers</span>
                            <span class="revenue-detail-value">1</span>
                        </li>
                        <li class="revenue-detail">
                            <span class="revenue-detail-label">Total Locations</span>
                            <span class="revenue-detail-value">1</span>
                        </li>
                        <li class="revenue-detail">
                            <span class="revenue-detail-label">Avg per Location</span>
                            <span class="revenue-detail-value">${formatCurrency(RevenueData.currentMonth.locationFees / 1)}</span>
                        </li>
                    </ul>
                </div>
                
                <!-- Token Flow Information (Not Revenue) -->
                <div class="revenue-stream" style="background: rgba(59,130,246,0.1); border-color: rgba(59,130,246,0.3);">
                    <div class="revenue-header">
                        <div class="revenue-icon">💎</div>
                        <div class="revenue-title">$Ember Token Flow</div>
                    </div>
                    <div class="revenue-amount" style="color: #3b82f6;">Info Only</div>
                    <div style="color: rgba(255,255,255,0.7); font-size: 0.9rem; margin-bottom: 15px;">
                        Advertisers buy from Coinbase
                    </div>
                    <ul class="revenue-details">
                        <li class="revenue-detail">
                            <span class="revenue-detail-label">Advertiser Holdings:</span>
                            <span class="revenue-detail-value">${formatTokens(RevenueData.advertisers.reduce((sum, a) => sum + a.tokensOwned, 0))}</span>
                        </li>
                        <li class="revenue-detail">
                            <span class="revenue-detail-label">In Circulation:</span>
                            <span class="revenue-detail-value">${formatTokens(RevenueData.advertisers.reduce((sum, a) => sum + a.tokensDistributed, 0))}</span>
                        </li>
                        <li class="revenue-detail">
                            <span class="revenue-detail-label">Redeemed Back:</span>
                            <span class="revenue-detail-value">${formatTokens(RevenueData.advertisers.reduce((sum, a) => sum + a.tokensRedeemed, 0))}</span>
                        </li>
                    </ul>
                </div>
            </div>
            
            <!-- Total Revenue Summary -->
            <div class="revenue-total">
                <div class="revenue-total-label">Total Monthly Revenue</div>
                <div class="revenue-total-amount">${formatCurrency(RevenueData.currentMonth.total)}</div>
                
                <div style="max-width: 600px; margin: 20px auto 0; padding: 20px; background: rgba(240,165,0,0.1); border: 1px solid rgba(240,165,0,0.3); border-radius: 12px;">
                    <h4 style="color: var(--color-primary-gold); margin-bottom: 15px;">💡 Your Revenue Model</h4>
                    <p style="color: rgba(255,255,255,0.9); margin: 0; line-height: 1.6;">
                        You earn <strong>100% from monthly location fees</strong> paid by advertisers. Advertisers purchase 
                        $Ember tokens directly from Coinbase (not from you) to fund their advertisement token stops. 
                        Your revenue is predictable and recurring from location fees only.
                    </p>
                </div>
            </div>
        </div>
        
        <!-- Pricing Structure -->
        <div class="dashboard-section">
            <h2 class="section-title">💳 Your Location Placement Pricing</h2>
            
            <div class="card" style="background: rgba(240,165,0,0.1); border: 2px solid rgba(240,165,0,0.3); margin-bottom: 30px;">
                <h3 style="color: var(--color-primary-gold); margin-bottom: 15px;">
                    ✨ All Features Included - No Tiers!
                </h3>
                <p style="color: rgba(255,255,255,0.8); margin-bottom: 20px;">
                    Simple pricing based on location count. All advertisers get every feature regardless of how many locations they have.
                </p>
                
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 10px;">
                    ${LocationPricing.includedFeatures.map(feature => `
                        <div style="padding: 8px; background: rgba(0,0,0,0.2); border-radius: 8px;">
                            ✓ ${feature}
                        </div>
                    `).join('')}
                </div>
            </div>
            
            <div class="apps-grid">
                ${Object.entries(LocationPricing.defaultPricing).map(([key, pricing]) => `
                    <div class="card">
                        <h3 style="color: var(--color-primary-gold); margin-bottom: 15px;">
                            ${pricing.name}
                        </h3>
                        <div style="font-size: 2rem; font-weight: 900; color: var(--color-primary-orange); margin-bottom: 10px;">
                            ${typeof pricing.monthlyFee === 'number' ? formatCurrency(pricing.monthlyFee) : pricing.monthlyFee}${typeof pricing.monthlyFeePerLocation === 'number' ? `<span style="font-size: 1rem; color: rgba(255,255,255,0.6);">/location/month</span>` : pricing.contactRequired ? '' : '<span style="font-size: 1rem; color: rgba(255,255,255,0.6);">/month</span>'}
                        </div>
                        <p style="color: rgba(255,255,255,0.7); margin-bottom: 20px;">
                            ${pricing.description}
                        </p>
                        ${pricing.contactRequired ? `
                            <div style="padding: 15px; background: rgba(34,197,94,0.1); border: 1px solid rgba(34,197,94,0.3); border-radius: 8px;">
                                <div style="font-weight: 700; color: #22c55e; margin-bottom: 5px;">Contact for Pricing</div>
                                <div style="font-size: 0.9rem; color: rgba(255,255,255,0.7);">
                                    Custom solutions for large-scale deployments
                                </div>
                            </div>
                        ` : ''}
                    </div>
                `).join('')}
            </div>
        </div>
        
        <!-- Token Flow Explanation -->
        <div class="dashboard-section">
            <h2 class="section-title">💎 How $Ember Tokens Flow</h2>
            
            <div class="card" style="background: rgba(59,130,246,0.1); border: 2px solid rgba(59,130,246,0.3);">
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 20px;">
                    <div style="padding: 20px; background: rgba(0,0,0,0.3); border-radius: 12px;">
                        <div style="font-size: 2.5rem; margin-bottom: 15px;">1️⃣</div>
                        <h4 style="color: var(--color-primary-gold); margin-bottom: 10px;">Advertiser Buys from Coinbase</h4>
                        <p style="color: rgba(255,255,255,0.8); margin: 0; line-height: 1.6;">
                            Advertisers purchase $Ember tokens directly from Coinbase at market price. 
                            You don't sell tokens - they buy from public exchanges.
                        </p>
                    </div>
                    
                    <div style="padding: 20px; background: rgba(0,0,0,0.3); border-radius: 12px;">
                        <div style="font-size: 2.5rem; margin-bottom: 15px;">2️⃣</div>
                        <h4 style="color: var(--color-primary-gold); margin-bottom: 10px;">Pays You Location Fee</h4>
                        <p style="color: rgba(255,255,255,0.8); margin: 0; line-height: 1.6;">
                            Advertiser pays you a monthly location fee based on number of locations. 
                            This is your revenue - predictable and recurring.
                        </p>
                    </div>
                    
                    <div style="padding: 20px; background: rgba(0,0,0,0.3); border-radius: 12px;">
                        <div style="font-size: 2.5rem; margin-bottom: 15px;">3️⃣</div>
                        <h4 style="color: var(--color-primary-gold); margin-bottom: 10px;">Funds Token Stops</h4>
                        <p style="color: rgba(255,255,255,0.8); margin: 0; line-height: 1.6;">
                            Advertiser uses their Coinbase-purchased tokens to fund advertisement token 
                            stops in your campaign.
                        </p>
                    </div>
                    
                    <div style="padding: 20px; background: rgba(0,0,0,0.3); border-radius: 12px;">
                        <div style="font-size: 2.5rem; margin-bottom: 15px;">4️⃣</div>
                        <h4 style="color: var(--color-primary-gold); margin-bottom: 10px;">Circular Token Flow</h4>
                        <p style="color: rgba(255,255,255,0.8); margin: 0; line-height: 1.6;">
                            Players collect tokens, then redeem at advertiser locations. Advertiser 
                            gets tokens back and reuses them for more stops.
                        </p>
                    </div>
                </div>
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
                            Market Price: $${TokenEconomy.marketPrice.toFixed(4)} per $Ember (from Coinbase)
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
                        Purchase $Ember from Coinbase
                    </h3>
                    <p style="font-size: 1.1rem; color: rgba(255,255,255,0.8); max-width: 600px; margin: 0 auto 25px;">
                        To add token stops to campaigns, you must first purchase $Ember tokens from Coinbase at market price. 
                        These tokens fund your location stops and include your advertisements that players see when collecting.
                    </p>
                    <button class="btn btn-primary btn-large" onclick="loadSection('wallet')" style="font-size: 1.2rem; padding: 18px 40px;">
                        Buy $Ember from Coinbase
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
                        <h4 style="margin-bottom: 10px;">Purchase from Coinbase</h4>
                        <p style="color: rgba(255,255,255,0.7); margin: 0; line-height: 1.6;">
                            Buy $Ember tokens directly from Coinbase at current market price to fund your token stops.
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
                        You purchase $Ember from Coinbase → Fund token stops with ads → Players collect & see your ad → 
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
    window.getPricingForLocationCount = getPricingForLocationCount;
    window.calculateAdvertiserTotalCost = calculateAdvertiserTotalCost;
}
