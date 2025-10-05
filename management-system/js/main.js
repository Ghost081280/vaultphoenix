/* ============================================
   VAULT PHOENIX MANAGEMENT SYSTEM
   Main JavaScript - FIXED ONBOARDING SIZE
   ============================================ */

// ============================================
// ONBOARDING CONTENT - FIXED FOR SCREEN SIZE
// ============================================

const OnboardingContent = {
    'campaign-manager': [
        {
            title: '🔥 Welcome to Vault Phoenix',
            content: `
                <div style="text-align: center; max-width: 600px; margin: 0 auto;">
                    <div style="font-size: 3rem; margin-bottom: 15px;">🚀</div>
                    <h2 style="font-size: 1.8rem; margin-bottom: 15px;">The $Ember Advertisement Ecosystem</h2>
                    <p style="font-size: 1rem; line-height: 1.6; margin-bottom: 25px;">
                        Create location-based AR gaming campaigns where advertisers fund token stops with their advertisements. 
                        Players collect tokens, see ads, and can redeem offers at advertiser locations.
                    </p>
                    <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 15px; margin-top: 25px;">
                        <div style="padding: 15px; background: rgba(0,0,0,0.3); border-radius: 10px;">
                            <div style="font-size: 1.5rem; margin-bottom: 8px;">1️⃣</div>
                            <h4 style="margin-bottom: 6px; font-size: 0.95rem;">Build Campaign</h4>
                            <p style="font-size: 0.8rem; color: rgba(255,255,255,0.7); margin: 0;">Create white-label apps or integrate via SDK</p>
                        </div>
                        <div style="padding: 15px; background: rgba(0,0,0,0.3); border-radius: 10px;">
                            <div style="font-size: 1.5rem; margin-bottom: 8px;">2️⃣</div>
                            <h4 style="margin-bottom: 6px; font-size: 0.95rem;">Advertisers Join</h4>
                            <p style="font-size: 0.8rem; color: rgba(255,255,255,0.7); margin: 0;">They fund token stops with ads</p>
                        </div>
                        <div style="padding: 15px; background: rgba(0,0,0,0.3); border-radius: 10px;">
                            <div style="font-size: 1.5rem; margin-bottom: 8px;">3️⃣</div>
                            <h4 style="margin-bottom: 6px; font-size: 0.95rem;">Earn Revenue</h4>
                            <p style="font-size: 0.8rem; color: rgba(255,255,255,0.7); margin: 0;">Monthly location fees + token sales</p>
                        </div>
                    </div>
                </div>
            `
        },
        {
            title: '💰 Your Revenue Model',
            content: `
                <div style="max-width: 650px; margin: 0 auto;">
                    <h2 style="font-size: 1.6rem; margin-bottom: 20px; text-align: center;">How You Earn Money</h2>
                    <div style="display: grid; gap: 15px;">
                        <div style="padding: 18px; background: rgba(240,165,0,0.1); border: 2px solid rgba(240,165,0,0.4); border-radius: 10px;">
                            <div style="display: flex; align-items: start; gap: 12px;">
                                <div style="font-size: 2rem; flex-shrink: 0;">📍</div>
                                <div>
                                    <h3 style="color: var(--color-primary-gold); margin-bottom: 8px; font-size: 1.1rem;">Location Placement Fees</h3>
                                    <p style="line-height: 1.5; margin-bottom: 8px; font-size: 0.9rem;">
                                        Advertisers pay monthly fees per token stop in your campaign. You set the price per location.
                                    </p>
                                    <div style="color: #22c55e; font-weight: 700; font-size: 0.9rem;">Recurring Monthly Revenue</div>
                                </div>
                            </div>
                        </div>
                        
                        <div style="padding: 18px; background: rgba(240,165,0,0.1); border: 2px solid rgba(240,165,0,0.4); border-radius: 10px;">
                            <div style="display: flex; align-items: start; gap: 12px;">
                                <div style="font-size: 2rem; flex-shrink: 0;">💎</div>
                                <div>
                                    <h3 style="color: var(--color-primary-gold); margin-bottom: 8px; font-size: 1.1rem;">$Ember Token Sales</h3>
                                    <p style="line-height: 1.5; margin-bottom: 8px; font-size: 0.9rem;">
                                        Advertisers purchase $Ember tokens from you to fund their token stops with advertisements.
                                    </p>
                                    <div style="color: #22c55e; font-weight: 700; font-size: 0.9rem;">One-Time Purchase Revenue</div>
                                </div>
                            </div>
                        </div>
                        
                        <div style="padding: 15px; background: rgba(34,197,94,0.1); border: 2px solid rgba(34,197,94,0.4); border-radius: 10px; text-align: center;">
                            <p style="font-size: 0.95rem; margin: 0;">
                                <strong style="color: #22c55e;">Plus:</strong> You get $100 starter bonus in $Ember tokens to fund your own campaign token stops!
                            </p>
                        </div>
                    </div>
                </div>
            `
        },
        {
            title: '🎮 The Complete Flow',
            content: `
                <div style="max-width: 700px; margin: 0 auto;">
                    <h2 style="font-size: 1.6rem; margin-bottom: 20px; text-align: center;">How The Circular Economy Works</h2>
                    <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 15px;">
                        <div style="padding: 15px; background: rgba(0,0,0,0.3); border-radius: 10px;">
                            <div style="font-size: 1.5rem; margin-bottom: 8px;">1️⃣</div>
                            <h4 style="margin-bottom: 8px; font-size: 0.95rem;">Advertiser Joins</h4>
                            <p style="font-size: 0.85rem; line-height: 1.5; color: rgba(255,255,255,0.8); margin: 0;">
                                Pays monthly location fee + purchases $Ember tokens to fund token stops with their advertisement
                            </p>
                        </div>
                        <div style="padding: 15px; background: rgba(0,0,0,0.3); border-radius: 10px;">
                            <div style="font-size: 1.5rem; margin-bottom: 8px;">2️⃣</div>
                            <h4 style="margin-bottom: 8px; font-size: 0.95rem;">Players Collect</h4>
                            <p style="font-size: 0.85rem; line-height: 1.5; color: rgba(255,255,255,0.8); margin: 0;">
                                Visit locations in AR game, collect $Ember tokens, and immediately see the advertiser's advertisement
                            </p>
                        </div>
                        <div style="padding: 15px; background: rgba(0,0,0,0.3); border-radius: 10px;">
                            <div style="font-size: 1.5rem; margin-bottom: 8px;">3️⃣</div>
                            <h4 style="margin-bottom: 8px; font-size: 0.95rem;">Cash Out or Redeem</h4>
                            <p style="font-size: 0.85rem; line-height: 1.5; color: rgba(255,255,255,0.8); margin: 0;">
                                Players choose: Cash out to Coinbase OR visit advertiser's location to redeem offers
                            </p>
                        </div>
                        <div style="padding: 15px; background: rgba(0,0,0,0.3); border-radius: 10px;">
                            <div style="font-size: 1.5rem; margin-bottom: 8px;">4️⃣</div>
                            <h4 style="margin-bottom: 8px; font-size: 0.95rem;">Circular Economy</h4>
                            <p style="font-size: 0.85rem; line-height: 1.5; color: rgba(255,255,255,0.8); margin: 0;">
                                Advertiser scans player QR → receives $Ember back → gives offer → can reuse tokens for new stops!
                            </p>
                        </div>
                    </div>
                </div>
            `
        }
    ],
    'advertiser': [
        {
            title: '🔥 Welcome to Vault Phoenix',
            content: `
                <div style="text-align: center; max-width: 600px; margin: 0 auto;">
                    <div style="font-size: 3rem; margin-bottom: 15px;">📍</div>
                    <h2 style="font-size: 1.8rem; margin-bottom: 15px;">How The $Ember Advertisement System Works</h2>
                    <p style="font-size: 1rem; line-height: 1.6; margin-bottom: 25px;">
                        Drive verified foot traffic to your physical location through location-based AR gaming campaigns. 
                        Your advertisements reach players exactly when they're near your business.
                    </p>
                    <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 15px; margin-top: 25px;">
                        <div style="padding: 15px; background: rgba(0,0,0,0.3); border-radius: 10px;">
                            <div style="font-size: 1.5rem; margin-bottom: 8px;">1️⃣</div>
                            <h4 style="margin-bottom: 6px; font-size: 0.95rem;">Fund Token Stop</h4>
                            <p style="font-size: 0.8rem; color: rgba(255,255,255,0.7); margin: 0;">Buy $Ember + add your advertisement</p>
                        </div>
                        <div style="padding: 15px; background: rgba(0,0,0,0.3); border-radius: 10px;">
                            <div style="font-size: 1.5rem; margin-bottom: 8px;">2️⃣</div>
                            <h4 style="margin-bottom: 6px; font-size: 0.95rem;">Players Visit</h4>
                            <p style="font-size: 0.8rem; color: rgba(255,255,255,0.7); margin: 0;">Collect tokens & see your ad</p>
                        </div>
                        <div style="padding: 15px; background: rgba(0,0,0,0.3); border-radius: 10px;">
                            <div style="font-size: 1.5rem; margin-bottom: 8px;">3️⃣</div>
                            <h4 style="margin-bottom: 6px; font-size: 0.95rem;">Get Tokens Back</h4>
                            <p style="font-size: 0.8rem; color: rgba(255,255,255,0.7); margin: 0;">Scan QR codes for redemptions</p>
                        </div>
                    </div>
                </div>
            `
        },
        {
            title: '💰 Your Investment & Returns',
            content: `
                <div style="max-width: 650px; margin: 0 auto;">
                    <h2 style="font-size: 1.6rem; margin-bottom: 20px; text-align: center;">What You Pay & What You Get</h2>
                    <div style="display: grid; gap: 15px; margin-bottom: 20px;">
                        <div style="padding: 18px; background: rgba(240,165,0,0.1); border: 2px solid rgba(240,165,0,0.4); border-radius: 10px;">
                            <h3 style="color: var(--color-primary-gold); margin-bottom: 12px; font-size: 1.1rem;">💳 Your Costs</h3>
                            <ul style="list-style: none; padding: 0; margin: 0; line-height: 1.8; font-size: 0.9rem;">
                                <li style="margin-bottom: 5px;">📍 <strong>Monthly Location Fee:</strong> Set by campaign manager (typically $200-500/month per stop)</li>
                                <li style="margin-bottom: 5px;">💎 <strong>$Ember Tokens:</strong> One-time purchase to fund your token stops (~$35-175)</li>
                                <li>✓ <strong>All Features Included:</strong> Scanner app, analytics, custom ads - no hidden fees</li>
                            </ul>
                        </div>
                        
                        <div style="padding: 18px; background: rgba(34,197,94,0.1); border: 2px solid rgba(34,197,94,0.4); border-radius: 10px;">
                            <h3 style="color: #22c55e; margin-bottom: 12px; font-size: 1.1rem;">🎯 What You Get</h3>
                            <ul style="list-style: none; padding: 0; margin: 0; line-height: 1.8; font-size: 0.9rem;">
                                <li style="margin-bottom: 3px;">✓ GPS-verified foot traffic to your location</li>
                                <li style="margin-bottom: 3px;">✓ Your advertisement shown to every player</li>
                                <li style="margin-bottom: 3px;">✓ Players arrive ready to spend/redeem</li>
                                <li style="margin-bottom: 3px;">✓ Get $Ember tokens back via redemptions</li>
                                <li style="margin-bottom: 3px;">✓ Reuse recovered tokens for new stops</li>
                                <li>✓ Real-time analytics & ROI tracking</li>
                            </ul>
                        </div>
                    </div>
                    <div style="padding: 15px; background: rgba(59,130,246,0.1); border: 2px solid rgba(59,130,246,0.4); border-radius: 10px; text-align: center;">
                        <p style="font-size: 0.95rem; margin: 0; line-height: 1.6;">
                            <strong>Average ROI:</strong> Most advertisers see 8-12x return on their monthly investment through increased foot traffic and sales.
                        </p>
                    </div>
                </div>
            `
        },
        {
            title: '🔄 The Complete Player Journey',
            content: `
                <div style="max-width: 700px; margin: 0 auto;">
                    <h2 style="font-size: 1.6rem; margin-bottom: 20px; text-align: center;">From Token Collection to Redemption</h2>
                    <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 15px;">
                        <div style="padding: 15px; background: rgba(0,0,0,0.3); border-radius: 10px;">
                            <div style="font-size: 1.5rem; margin-bottom: 8px;">1️⃣</div>
                            <h4 style="margin-bottom: 8px; font-size: 0.95rem;">Player Discovers Your Location</h4>
                            <p style="font-size: 0.85rem; line-height: 1.5; color: rgba(255,255,255,0.8); margin: 0;">
                                Players see your location on the AR game map and navigate to your physical address to collect tokens
                            </p>
                        </div>
                        <div style="padding: 15px; background: rgba(0,0,0,0.3); border-radius: 10px;">
                            <div style="font-size: 1.5rem; margin-bottom: 8px;">2️⃣</div>
                            <h4 style="margin-bottom: 8px; font-size: 0.95rem;">Collects Tokens & Sees Your Ad</h4>
                            <p style="font-size: 0.85rem; line-height: 1.5; color: rgba(255,255,255,0.8); margin: 0;">
                                Player uses AR camera to collect $Ember tokens, then immediately sees your full advertisement with offer details
                            </p>
                        </div>
                        <div style="padding: 15px; background: rgba(0,0,0,0.3); border-radius: 10px;">
                            <div style="font-size: 1.5rem; margin-bottom: 8px;">3️⃣</div>
                            <h4 style="margin-bottom: 8px; font-size: 0.95rem;">Decides: Cash Out or Redeem</h4>
                            <p style="font-size: 0.85rem; line-height: 1.5; color: rgba(255,255,255,0.8); margin: 0;">
                                Player can cash out to Coinbase OR visit your location to redeem $Ember for your exclusive offers
                            </p>
                        </div>
                        <div style="padding: 15px; background: rgba(0,0,0,0.3); border-radius: 10px;">
                            <div style="font-size: 1.5rem; margin-bottom: 8px;">4️⃣</div>
                            <h4 style="margin-bottom: 8px; font-size: 0.95rem;">You Scan & Complete Sale</h4>
                            <p style="font-size: 0.85rem; line-height: 1.5; color: rgba(255,255,255,0.8); margin: 0;">
                                Player visits your location → you scan their QR code → receive $Ember back → give them your offer or discount!
                            </p>
                        </div>
                    </div>
                    <div style="margin-top: 20px; padding: 15px; background: rgba(240,165,0,0.1); border: 2px solid rgba(240,165,0,0.4); border-radius: 10px; text-align: center;">
                        <p style="font-size: 0.95rem; margin: 0;">
                            💡 <strong>Key Insight:</strong> Every visitor is GPS-verified and pre-qualified. They came specifically to your location because of your offer!
                        </p>
                    </div>
                </div>
            `
        }
    ]
};

// Export the fixed onboarding content
if (typeof window !== 'undefined') {
    window.OnboardingContent = OnboardingContent;
}
