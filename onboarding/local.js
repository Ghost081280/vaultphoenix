/* ========================================
   VAULT PHOENIX ONBOARDING - LOCAL JS v6.0
   COMPLETE REBUILD - MATCHING CSS v6.0
   
   CRITICAL FUNCTIONALITY:
   1. Calculator Toggle - Switch between Agency/Developer calculators
   2. Calculator Logic - Real-time calculations for both calculators
   3. Checklist Modal - Show/hide modal with content loading
   4. Script/Proposal Modals - Display full content
   5. Scroll Reveal Animations
   6. Construction Banner Dismiss
   
   ======================================== */

(function() {
    'use strict';
    
    /* ========================================
       CONSTRUCTION BANNER
       ======================================== */
    function initConstructionBanner() {
        const banner = document.querySelector('.construction-banner');
        const closeBtn = document.querySelector('.construction-close');
        
        if (banner && closeBtn) {
            closeBtn.addEventListener('click', function() {
                banner.classList.add('hidden');
                // Store in sessionStorage so it stays hidden during session
                sessionStorage.setItem('constructionBannerDismissed', 'true');
            });
            
            // Check if already dismissed this session
            if (sessionStorage.getItem('constructionBannerDismissed') === 'true') {
                banner.classList.add('hidden');
            }
        }
    }
    
    /* ========================================
       CALCULATOR TOGGLE - CRITICAL FIX
       ======================================== */
    function initCalculatorToggle() {
        const toggleBtns = document.querySelectorAll('.calc-toggle-btn');
        const agencyCalc = document.getElementById('agency-calculator');
        const developerCalc = document.getElementById('developer-calculator');
        
        if (!toggleBtns.length || !agencyCalc || !developerCalc) return;
        
        toggleBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                const targetCalc = this.getAttribute('data-calculator');
                
                // Remove active from all buttons
                toggleBtns.forEach(b => b.classList.remove('active'));
                
                // Add active to clicked button
                this.classList.add('active');
                
                // Hide all calculators
                agencyCalc.classList.remove('active');
                developerCalc.classList.remove('active');
                
                // Show target calculator
                if (targetCalc === 'agency') {
                    agencyCalc.classList.add('active');
                } else if (targetCalc === 'developer') {
                    developerCalc.classList.add('active');
                }
            });
        });
    }
    
    /* ========================================
       AGENCY CALCULATOR LOGIC
       ======================================== */
    function initAgencyCalculator() {
        const locationSlider = document.getElementById('agency-locations');
        const locationValue = document.getElementById('agency-locations-value');
        const setupFeeInput = document.getElementById('agency-setup-fee');
        const maintenanceInput = document.getElementById('agency-monthly-maintenance');
        const pricePerLocationInput = document.getElementById('agency-price-per-location');
        const durationSelect = document.getElementById('agency-duration');
        const apiTierSelect = document.getElementById('agency-api-tier');
        
        // Result elements
        const totalClientRevenue = document.getElementById('agency-total-client-revenue');
        const vpCost = document.getElementById('agency-vp-cost');
        const netProfit = document.getElementById('agency-net-profit');
        const mrr = document.getElementById('agency-mrr');
        const margin = document.getElementById('agency-margin');
        const perLocation = document.getElementById('agency-per-location');
        
        if (!locationSlider) return;
        
        function calculateAgency() {
            const locations = parseInt(locationSlider.value) || 10;
            const setupFee = parseFloat(setupFeeInput.value) || 1000;
            const maintenance = parseFloat(maintenanceInput.value) || 500;
            const pricePerLocation = parseFloat(pricePerLocationInput.value) || 200;
            const duration = parseInt(durationSelect.value) || 3;
            const apiTierCost = parseInt(apiTierSelect.value) || 149;
            
            // Update slider display
            if (locationValue) locationValue.textContent = locations;
            
            // Calculate totals
            const monthlyLocationRevenue = locations * pricePerLocation;
            const monthlyRecurringRevenue = maintenance + monthlyLocationRevenue;
            const totalRevenue = setupFee + (monthlyRecurringRevenue * duration);
            const totalVPCost = apiTierCost * duration;
            const profit = totalRevenue - totalVPCost;
            const profitMargin = ((profit / totalRevenue) * 100).toFixed(0);
            const revenuePerLocation = (totalRevenue / locations).toFixed(0);
            
            // Update display with currency formatting
            if (totalClientRevenue) totalClientRevenue.textContent = '$' + totalRevenue.toLocaleString();
            if (vpCost) vpCost.textContent = '$' + totalVPCost.toLocaleString();
            if (netProfit) netProfit.textContent = '$' + profit.toLocaleString();
            if (mrr) mrr.textContent = '$' + monthlyRecurringRevenue.toLocaleString();
            if (margin) margin.textContent = profitMargin + '%';
            if (perLocation) perLocation.textContent = '$' + revenuePerLocation;
        }
        
        // Add event listeners
        if (locationSlider) locationSlider.addEventListener('input', calculateAgency);
        if (setupFeeInput) setupFeeInput.addEventListener('input', calculateAgency);
        if (maintenanceInput) maintenanceInput.addEventListener('input', calculateAgency);
        if (pricePerLocationInput) pricePerLocationInput.addEventListener('input', calculateAgency);
        if (durationSelect) durationSelect.addEventListener('change', calculateAgency);
        if (apiTierSelect) apiTierSelect.addEventListener('change', calculateAgency);
        
        // Initial calculation
        calculateAgency();
    }
    
    /* ========================================
       DEVELOPER CALCULATOR LOGIC
       ======================================== */
    function initDeveloperCalculator() {
        const locationSlider = document.getElementById('dev-locations');
        const locationValue = document.getElementById('dev-locations-value');
        const pricePerLocationInput = document.getElementById('dev-price-per-location');
        const durationSelect = document.getElementById('dev-duration');
        const apiTierSelect = document.getElementById('dev-api-tier');
        const discountSlider = document.getElementById('dev-discount');
        const discountValue = document.getElementById('dev-discount-value');
        
        // Result elements
        const dailyRevenue = document.getElementById('dev-daily-revenue');
        const weeklyRevenue = document.getElementById('dev-weekly-revenue');
        const monthlyRevenue = document.getElementById('dev-monthly-revenue');
        const vpCost = document.getElementById('dev-vp-cost');
        const netProfit = document.getElementById('dev-net-profit');
        const margin = document.getElementById('dev-margin');
        
        if (!locationSlider) return;
        
        function calculateDeveloper() {
            const locations = parseInt(locationSlider.value) || 15;
            const pricePerLocation = parseFloat(pricePerLocationInput.value) || 300;
            const duration = parseInt(durationSelect.value) || 3;
            const apiTierCost = parseInt(apiTierSelect.value) || 149;
            const discount = parseInt(discountSlider.value) || 0;
            
            // Update slider displays
            if (locationValue) locationValue.textContent = locations;
            if (discountValue) discountValue.textContent = discount;
            
            // Apply discount
            const discountMultiplier = 1 - (discount / 100);
            const effectivePrice = pricePerLocation * discountMultiplier;
            
            // Calculate revenue
            const monthlyRev = locations * effectivePrice;
            const weeklyRev = monthlyRev / 4.33; // Average weeks per month
            const dailyRev = monthlyRev / 30;
            const totalRevenue = monthlyRev * duration;
            const totalVPCost = apiTierCost * duration;
            const profit = totalRevenue - totalVPCost;
            const profitMargin = ((profit / totalRevenue) * 100).toFixed(0);
            
            // Update display
            if (dailyRevenue) dailyRevenue.textContent = '$' + Math.round(dailyRev).toLocaleString();
            if (weeklyRevenue) weeklyRevenue.textContent = '$' + Math.round(weeklyRev).toLocaleString();
            if (monthlyRevenue) monthlyRevenue.textContent = '$' + Math.round(monthlyRev).toLocaleString();
            if (vpCost) vpCost.textContent = '$' + totalVPCost.toLocaleString();
            if (netProfit) netProfit.textContent = '$' + Math.round(profit).toLocaleString();
            if (margin) margin.textContent = profitMargin + '%';
        }
        
        // Add event listeners
        if (locationSlider) locationSlider.addEventListener('input', calculateDeveloper);
        if (pricePerLocationInput) pricePerLocationInput.addEventListener('input', calculateDeveloper);
        if (durationSelect) durationSelect.addEventListener('change', calculateDeveloper);
        if (apiTierSelect) apiTierSelect.addEventListener('change', calculateDeveloper);
        if (discountSlider) discountSlider.addEventListener('input', calculateDeveloper);
        
        // Initial calculation
        calculateDeveloper();
    }
    
    /* ========================================
       CHECKLIST MODAL - CRITICAL FIX
       ======================================== */
    function initChecklistModal() {
        const modal = document.getElementById('checklist-modal-overlay');
        const modalTitle = document.getElementById('checklist-modal-title');
        const modalBody = document.getElementById('checklist-modal-body');
        const closeBtn = document.getElementById('checklist-modal-close');
        const learnButtons = document.querySelectorAll('.checklist-learn-btn');
        
        if (!modal || !modalBody) return;
        
        // Modal content data
        const modalContent = {
            'platform-account': {
                title: 'Platform Account Creation',
                content: `
                    <h4>Getting Started with Vault Phoenix</h4>
                    <p>Creating your platform account is the first step to launching successful AR crypto campaigns.</p>
                    
                    <h4>What You'll Get</h4>
                    <ul>
                        <li><strong>$100 FREE $Ember Tokens</strong> - Pre-loaded into your account to start testing immediately</li>
                        <li><strong>Full Management Dashboard</strong> - Control all aspects of your campaigns</li>
                        <li><strong>Analytics Access</strong> - Real-time tracking of player activity and engagement</li>
                        <li><strong>API Credentials</strong> - For SDK integration or white-label deployment</li>
                    </ul>
                    
                    <h4>Account Setup Steps</h4>
                    <p>1. Visit the Vault Phoenix platform and click "Sign Up"</p>
                    <p>2. Enter your business details and contact information</p>
                    <p>3. Verify your email address</p>
                    <p>4. Complete your profile with company/agency information</p>
                    <p>5. Your $100 in FREE tokens will be automatically credited</p>
                    
                    <h4>Pro Tip</h4>
                    <p>Set up your account early so you can explore the management system while planning your campaign strategy.</p>
                `
            },
            'demo-tested': {
                title: 'Testing the Demo',
                content: `
                    <h4>Experience Both Sides</h4>
                    <p>Before launching your campaign, it's crucial to understand both the player experience and the management interface.</p>
                    
                    <h4>Player Experience Testing</h4>
                    <ul>
                        <li><strong>Mobile Demo</strong> - Open on your smartphone to see the AR interface</li>
                        <li><strong>Collect Test Coins</strong> - Walk around to trigger GPS-based coin collection</li>
                        <li><strong>Check Wallet</strong> - See how $Ember tokens appear in the player wallet</li>
                        <li><strong>Test AR Features</strong> - Experience the augmented reality coin visualization</li>
                    </ul>
                    
                    <h4>Management Dashboard Testing</h4>
                    <ul>
                        <li><strong>Place Test Coins</strong> - Use the map interface to drop coins at locations</li>
                        <li><strong>Monitor Analytics</strong> - Watch real-time data as you collect coins</li>
                        <li><strong>Adjust Settings</strong> - Experiment with coin values, rarity, and spawn rates</li>
                        <li><strong>Review Reports</strong> - Generate test reports to understand data export</li>
                    </ul>
                    
                    <h4>What to Look For</h4>
                    <p>Pay attention to the user experience flow, the clarity of instructions, and how intuitive the AR interface feels. This will help you optimize your campaign for your target audience.</p>
                `
            },
            'branding-finalized': {
                title: 'Branding Guidelines',
                content: `
                    <h4>White-Label Customization</h4>
                    <p>Your brand identity is crucial for campaign success. Here's what you can customize:</p>
                    
                    <h4>Visual Elements</h4>
                    <ul>
                        <li><strong>Logo</strong> - Upload your client's logo (recommended: 512x512px PNG with transparency)</li>
                        <li><strong>Color Scheme</strong> - Primary and secondary brand colors for UI elements</li>
                        <li><strong>App Icon</strong> - Custom icon for mobile home screen (1024x1024px)</li>
                        <li><strong>Splash Screen</strong> - Loading screen imagery</li>
                    </ul>
                    
                    <h4>Content Elements</h4>
                    <ul>
                        <li><strong>Campaign Name</strong> - Creative title for the treasure hunt</li>
                        <li><strong>Welcome Message</strong> - First-time user onboarding text</li>
                        <li><strong>Instructions</strong> - How to play and collect coins</li>
                        <li><strong>Legal Text</strong> - Terms of service and privacy policy</li>
                    </ul>
                    
                    <h4>Brand Consistency</h4>
                    <p>Ensure all visual and content elements align with your client's existing brand guidelines. The AR game should feel like a natural extension of their brand, not a separate entity.</p>
                `
            },
            'target-audience': {
                title: 'Identifying Your Target Audience',
                content: `
                    <h4>Know Your Players</h4>
                    <p>Understanding your target audience determines coin placement, rewards, and campaign messaging.</p>
                    
                    <h4>Key Demographics</h4>
                    <ul>
                        <li><strong>Gen Z (18-27)</strong> - Crypto-native, high smartphone usage, social media driven</li>
                        <li><strong>Gen Alpha (Under 18)</strong> - Gaming-oriented, mobile-first, requires parental guidance features</li>
                        <li><strong>Millennials (28-43)</strong> - Tech-savvy, value experiences, ROI-focused for business owners</li>
                    </ul>
                    
                    <h4>Audience-Specific Strategies</h4>
                    <p><strong>For Student Audiences:</strong> Place coins near campuses, coffee shops, and entertainment venues. Use lower token values but higher frequency.</p>
                    <p><strong>For Professional Audiences:</strong> Office districts, upscale restaurants, gyms. Higher token values, business hour availability.</p>
                    <p><strong>For Tourist Audiences:</strong> Landmarks, hotels, tourist attractions. Multilingual support, visitor-friendly instructions.</p>
                    
                    <h4>Behavioral Considerations</h4>
                    <p>Consider when your audience is most active, where they spend time, and what motivates them. Crypto enthusiasts respond to token value, while casual players respond to gamification and social features.</p>
                `
            },
            'locations-identified': {
                title: 'Strategic Location Selection',
                content: `
                    <h4>Location is Everything</h4>
                    <p>The success of your campaign depends heavily on where you place $Ember coins.</p>
                    
                    <h4>High-Value Location Types</h4>
                    <ul>
                        <li><strong>High Traffic Areas</strong> - Shopping districts, transit hubs, downtown areas</li>
                        <li><strong>Target Venue Clusters</strong> - Restaurant rows, entertainment districts</li>
                        <li><strong>Event Locations</strong> - Stadiums, convention centers, festival grounds</li>
                        <li><strong>Partner Locations</strong> - Client storefronts, sponsored venues</li>
                    </ul>
                    
                    <h4>Location Analysis</h4>
                    <p>Before finalizing locations, consider:</p>
                    <ul>
                        <li>Foot traffic patterns (weekday vs. weekend)</li>
                        <li>Accessibility and safety</li>
                        <li>Proximity to competitors</li>
                        <li>GPS signal strength</li>
                        <li>Permission requirements</li>
                    </ul>
                    
                    <h4>Quantity vs. Quality</h4>
                    <p>10 well-placed coins in strategic locations will outperform 50 random placements. Focus on quality over quantity.</p>
                `
            },
            'gps-beacon-strategy': {
                title: 'GPS vs Beacon Technology',
                content: `
                    <h4>Choosing the Right Technology</h4>
                    <p>Vault Phoenix supports both GPS and Beacon technology for maximum flexibility.</p>
                    
                    <h4>GPS Technology</h4>
                    <p><strong>Best For:</strong> Outdoor locations, large areas, city-wide campaigns</p>
                    <ul>
                        <li><strong>Pros:</strong> No hardware required, works anywhere, easy to adjust locations remotely</li>
                        <li><strong>Cons:</strong> Less accurate indoors, can drift by 10-30 meters</li>
                        <li><strong>Use Cases:</strong> Shopping districts, tourism campaigns, city-wide events</li>
                    </ul>
                    
                    <h4>Beacon Technology</h4>
                    <p><strong>Best For:</strong> Indoor locations, specific venues, precise targeting</p>
                    <ul>
                        <li><strong>Pros:</strong> Pinpoint accuracy, works perfectly indoors, can target specific aisles/areas</li>
                        <li><strong>Cons:</strong> Requires physical beacon installation, hardware costs</li>
                        <li><strong>Use Cases:</strong> Malls, retail stores, specific restaurant tables, conference booths</li>
                    </ul>
                    
                    <h4>Hybrid Strategy</h4>
                    <p>Many successful campaigns use BOTH: GPS for outdoor discovery and beacons for indoor precision. This gives the best of both worlds.</p>
                    
                    <h4>Pro Tip</h4>
                    <p>Start with GPS for your first campaign to minimize upfront costs, then add beacons for high-value indoor locations as you scale.</p>
                `
            },
            'coin-rewards': {
                title: 'Configuring Coin Rarity & Rewards',
                content: `
                    <h4>Reward Economics</h4>
                    <p>Proper coin configuration creates excitement, engagement, and desired player behavior.</p>
                    
                    <h4>Rarity Tiers</h4>
                    <ul>
                        <li><strong>Common (70% of coins)</strong> - 10-50 $Ember tokens</li>
                        <li><strong>Uncommon (20%)</strong> - 100-250 tokens</li>
                        <li><strong>Rare (8%)</strong> - 500-1000 tokens</li>
                        <li><strong>Epic (1.9%)</strong> - 2500-5000 tokens</li>
                        <li><strong>Legendary (0.1%)</strong> - 10,000+ tokens</li>
                    </ul>
                    
                    <h4>Strategic Placement</h4>
                    <p><strong>Common Coins:</strong> Everywhere - easy to find, keep players engaged</p>
                    <p><strong>Rare Coins:</strong> Partner locations - drive foot traffic to specific venues</p>
                    <p><strong>Epic/Legendary:</strong> Event locations or limited-time appearances - create FOMO and social sharing</p>
                    
                    <h4>Time-Based Rewards</h4>
                    <p>Consider increasing rewards during slow business hours to drive off-peak traffic. "Happy Hour Coins" with 2X rewards from 2-5 PM can fill empty restaurants.</p>
                    
                    <h4>Budget Planning</h4>
                    <p>Calculate your total token budget and work backwards. If you have 100,000 $Ember tokens for a 30-day campaign, plan for ~3,333 tokens distributed daily across all rarity tiers.</p>
                `
            },
            'airdrop-schedule': {
                title: 'Planning Airdrop Events',
                content: `
                    <h4>Airdrops = Viral Marketing</h4>
                    <p>Scheduled airdrops create urgency, social media buzz, and spike player engagement.</p>
                    
                    <h4>What is an Airdrop?</h4>
                    <p>A mass token distribution event where large amounts of $Ember are given to all active players or players in specific locations.</p>
                    
                    <h4>Airdrop Strategy</h4>
                    <ul>
                        <li><strong>Launch Airdrop (Day 1)</strong> - Everyone gets 1,000 $Ember to start. Creates initial excitement.</li>
                        <li><strong>Weekly Airdrops</strong> - Every Friday at 5 PM, random bonuses. Keeps players checking back.</li>
                        <li><strong>Location Airdrops</strong> - "Everyone at Main Street right now gets 500 tokens!" Drives immediate foot traffic.</li>
                        <li><strong>Milestone Airdrops</strong> - Celebrate 10,000 players with a surprise airdrop to everyone.</li>
                    </ul>
                    
                    <h4>Announcement Strategy</h4>
                    <p>Pre-announce airdrops 24-48 hours in advance on social media. This builds anticipation and gives players time to show up.</p>
                    
                    <h4>Social Media Integration</h4>
                    <p>Every airdrop should have a hashtag and encourage players to share their earnings. "Just got 1,000 $Ember in the #PhoenixTreasureHunt!" = free marketing.</p>
                `
            },
            'marketing-materials': {
                title: 'Marketing Materials Preparation',
                content: `
                    <h4>Launch Assets Checklist</h4>
                    <p>Have these materials ready BEFORE launch day:</p>
                    
                    <h4>Digital Assets</h4>
                    <ul>
                        <li><strong>Social Media Graphics</strong> - Announcement posts, tutorial graphics, share templates</li>
                        <li><strong>Website Banner</strong> - Hero image promoting the treasure hunt</li>
                        <li><strong>Email Templates</strong> - Launch announcement, how-to-play, weekly updates</li>
                        <li><strong>App Store Assets</strong> - If using custom app: screenshots, description, preview video</li>
                    </ul>
                    
                    <h4>Physical Materials</h4>
                    <ul>
                        <li><strong>QR Code Posters</strong> - Place at partner locations for easy app access</li>
                        <li><strong>Table Tents</strong> - For restaurants/cafes</li>
                        <li><strong>Window Clings</strong> - Eye-catching storefront displays</li>
                        <li><strong>Staff Training Cards</strong> - So employees can answer player questions</li>
                    </ul>
                    
                    <h4>Content Calendar</h4>
                    <p>Plan 30 days of social posts in advance:</p>
                    <ul>
                        <li>Days 1-3: Launch excitement, how-to-play</li>
                        <li>Week 1-2: Player spotlight, leaderboard updates</li>
                        <li>Week 3-4: Rare coin announcements, airdrop reminders</li>
                    </ul>
                `
            },
            'launch-announced': {
                title: 'Launch Announcement Strategy',
                content: `
                    <h4>Making a Splash</h4>
                    <p>Your launch announcement sets the tone for the entire campaign.</p>
                    
                    <h4>Multi-Channel Approach</h4>
                    <ul>
                        <li><strong>Social Media</strong> - Coordinated posts across all platforms at 9 AM launch time</li>
                        <li><strong>Email Blast</strong> - To existing customer database</li>
                        <li><strong>Press Release</strong> - To local media, crypto news sites</li>
                        <li><strong>Partner Promotion</strong> - Partner venues announce on their channels</li>
                        <li><strong>Influencer Outreach</strong> - Crypto influencers, local personalities</li>
                    </ul>
                    
                    <h4>Launch Day Timeline</h4>
                    <p>9:00 AM - Social media posts go live</p>
                    <p>9:15 AM - Email blast sent</p>
                    <p>10:00 AM - Press release distributed</p>
                    <p>12:00 PM - First airdrop event</p>
                    <p>5:00 PM - Evening social push for after-work crowd</p>
                    
                    <h4>Key Messaging</h4>
                    <p>Emphasize: FREE crypto, real value, easy to play, no crypto knowledge needed, play in your city</p>
                `
            },
            'daily-monitoring': {
                title: 'Daily Campaign Monitoring',
                content: `
                    <h4>Active Management</h4>
                    <p>Successful campaigns require daily attention and optimization.</p>
                    
                    <h4>Daily Tasks (15-30 minutes)</h4>
                    <ul>
                        <li><strong>Check Analytics</strong> - Player count, new signups, coin collection rates</li>
                        <li><strong>Review Heatmaps</strong> - Which locations are most popular?</li>
                        <li><strong>Monitor Social</strong> - Respond to player posts, share user content</li>
                        <li><strong>Adjust Coin Placement</strong> - Move coins from dead zones to active areas</li>
                        <li><strong>Check Token Budget</strong> - Are you on pace? Adjust distribution if needed</li>
                    </ul>
                    
                    <h4>Warning Signs</h4>
                    <p>🚨 <strong>Player Drop-off:</strong> If daily active users decline 3 days in a row, increase rewards or launch an airdrop</p>
                    <p>🚨 <strong>Low Collection Rates:</strong> Coins sitting uncollected = bad placement, move them</p>
                    <p>🚨 <strong>Partner Complaints:</strong> If a partner location sees no traffic, add exclusive coins there</p>
                    
                    <h4>Weekly Deep Dive</h4>
                    <p>Every Monday, review full week analytics and adjust strategy accordingly.</p>
                `
            },
            'user-feedback': {
                title: 'User Feedback System',
                content: `
                    <h4>Listen to Your Players</h4>
                    <p>Player feedback is goldmine data for optimization.</p>
                    
                    <h4>Feedback Collection Methods</h4>
                    <ul>
                        <li><strong>In-App Surveys</strong> - Quick 2-3 question pop-ups after coin collection</li>
                        <li><strong>Social Media Monitoring</strong> - Track hashtags and mentions</li>
                        <li><strong>Email Surveys</strong> - Weekly player satisfaction survey to active users</li>
                        <li><strong>Discord/Community</strong> - Create a player community channel</li>
                        <li><strong>Partner Reports</strong> - Ask venue owners what they're hearing</li>
                    </ul>
                    
                    <h4>Common Feedback Themes</h4>
                    <p><strong>"Coins are too far away"</strong> → Add more coins in walkable clusters</p>
                    <p><strong>"App is confusing"</strong> → Improve tutorial, add help section</p>
                    <p><strong>"Rewards are too small"</strong> → Increase token amounts or add bonus events</p>
                    <p><strong>"Can't find coins"</strong> → Improve map UI, add distance indicators</p>
                    
                    <h4>Response Time</h4>
                    <p>Acknowledge all feedback within 24 hours. Players who feel heard become brand advocates.</p>
                    
                    <h4>Act on Data</h4>
                    <p>If 10+ players report the same issue, fix it immediately. If it's a feature request mentioned 50+ times, add it to the roadmap.</p>
                `
            }
        };
        
        // Open modal
        learnButtons.forEach(btn => {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                
                const contentId = this.getAttribute('data-content');
                const content = modalContent[contentId];
                
                if (content && modalTitle && modalBody) {
                    modalTitle.textContent = content.title;
                    modalBody.innerHTML = content.content;
                    modal.classList.add('active');
                    document.body.style.overflow = 'hidden';
                }
            });
        });
        
        // Close modal
        function closeModal() {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }
        
        if (closeBtn) {
            closeBtn.addEventListener('click', closeModal);
        }
        
        // Close on overlay click
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeModal();
            }
        });
        
        // Close on Escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && modal.classList.contains('active')) {
                closeModal();
            }
        });
    }
    
    /* ========================================
       SCRIPT MODAL
       ======================================== */
    function initScriptModal() {
        const modal = document.getElementById('script-modal');
        const modalBody = document.getElementById('script-modal-body');
        const closeBtn = modal ? modal.querySelector('.script-modal-close') : null;
        const scriptButtons = document.querySelectorAll('.view-full-script-btn');
        
        if (!modal || !modalBody) return;
        
        const scriptContent = {
            'restaurant-chain': `SALES SCRIPT: Restaurant/Retail Chain Pitch

TARGET: Restaurant chains, retail stores, hospitality venues
CAMPAIGN TYPE: Geo-fencing foot traffic driver

=================================================

OPENING:

Hi {{Name}}, I help businesses like {{Business}} drive foot traffic using cutting-edge AR technology like Starbucks' geo-fencing campaigns.

I'm reaching out because I've developed a turnkey AR crypto treasure hunt that gets Gen Z and Millennials excited to visit your locations—and it's white-labeled under YOUR brand.

=================================================

THE PROBLEM (EMPATHY):

Right now, you're probably facing:
• Digital ad costs rising while ROI drops
• Gen Z scrolling past traditional promotions
• Competitors fighting for the same customer attention
• Difficulty driving traffic during slow hours

Sound familiar?

=================================================

THE SOLUTION (YOUR OFFER):

We've created a location-based AR game where players collect cryptocurrency at YOUR locations.

Here's how it works:
1. We white-label an AR treasure hunt app with YOUR branding
2. Players download the app to collect $Ember tokens (real crypto)
3. We place high-value coins exclusively at YOUR locations
4. Players physically visit to collect rewards
5. You get foot traffic, we handle all the tech

=================================================

PROOF (CREDIBILITY):

This isn't theory—it's proven:
• Starbucks used geo-fencing to increase visits by 30%
• Cadbury's "Worldwide Hide" campaign reached 2M+ players
• Nike's Paris AR competition generated 500K+ participants

We've deployed this 12+ times over 6 years with similar results.

=================================================

THE ASK:

I'd love to show you a 10-minute demo of the player experience and management system.

Would Thursday at 2 PM or Friday at 10 AM work better for you?

=================================================

OBJECTION HANDLING:

"We don't have budget right now."
→ This pays for itself through increased foot traffic. We can structure it as a pilot at one location first—$X setup, $X/month. If you see ROI, we scale to all locations.

"Our customers aren't into crypto."
→ They don't need to be! We've found that 80% of players have NEVER owned crypto before. It's free money—everyone loves that.

"Sounds complicated."
→ That's the beauty—we handle everything. You just approve the branding and watch the analytics. Your involvement is 30 minutes of setup, then automated.

"How do we measure success?"
→ You'll have a real-time dashboard showing: player visits per location, conversion rates, foot traffic heatmaps, and ROI calculations. We can set KPIs together.

=================================================

CLOSING:

{{Name}}, imagine having 1,000+ Gen Z and Millennial players opening your branded app every day, seeing your logo, and physically visiting your locations to collect rewards.

That's not advertising—that's creating a gaming experience around YOUR brand.

Can we schedule 10 minutes this week to walk through the demo?

=================================================

FOLLOW-UP EMAIL TEMPLATE:

Subject: {{Business}} AR Treasure Hunt Demo

Hi {{Name}},

Following up on our conversation about driving foot traffic through AR crypto gaming.

Quick recap:
✅ White-label AR app with your branding
✅ Players collect crypto at your locations
✅ Proven by Starbucks, Nike, Cadbury campaigns
✅ Complete management dashboard included
✅ 24-hour setup, ongoing support

Demo link: [INSERT DEMO LINK]

Let's schedule 10 minutes to explore how this works for {{Business}}.

Best,
[YOUR NAME]`,

            'tourism-board': `SALES SCRIPT: Tourism Board / City Marketing

TARGET: Tourism boards, destination marketing organizations, city governments
CAMPAIGN TYPE: City-wide treasure hunt promoting local attractions

=================================================

OPENING:

{{Name}}, what if tourists explored your entire city through an AR treasure hunt like Cadbury's "Worldwide Hide" campaign—but promoting YOUR landmarks, restaurants, and local businesses?

I'm {{Your Name}}, and I help cities create viral, self-sustaining tourism campaigns using AR technology and cryptocurrency rewards.

=================================================

THE PROBLEM:

Traditional tourism marketing is expensive and inefficient:
• $X spent on digital ads that tourists scroll past
• Visitors stick to the same 3-4 popular spots
• Local businesses outside downtown see no tourist traffic
• No way to track which campaigns actually drive visits

Meanwhile, your competitors are innovating.

=================================================

THE SOLUTION:

We create a city-wide AR treasure hunt where tourists collect cryptocurrency at your landmarks, restaurants, and hidden gems.

How it works:
1. We map 50-100 locations across your city
2. Tourists download the free app and see a treasure map
3. Crypto coins are placed at tourist attractions AND lesser-known spots
4. As they explore, they earn real $Ember tokens
5. The more they explore, the more they earn

=================================================

WHY THIS WORKS:

Gamification + Crypto + FOMO = Viral Growth

• Cadbury's Worldwide Hide: 2M+ players, global media coverage
• Pokémon GO tourism campaigns increased foot traffic 50%+
• Gen Z travelers SEEK OUT crypto-reward experiences

You're not just advertising—you're creating an experience that tourists BRAG ABOUT on social media.

=================================================

THE OFFER:

3 Tiers:
🥉 Bronze: 25 locations, $X setup, $X/month
🥈 Silver: 50 locations, $X setup, $X/month (MOST POPULAR)
🥇 Gold: 100 locations, $X setup, $X/month

All tiers include:
✅ White-label app with your city branding
✅ Management dashboard
✅ Real-time analytics
✅ Social media toolkit
✅ Partner venue training

=================================================

DIFFERENTIATION:

What makes us different from other tourism tech:

❌ QR code trails → boring, no virality
❌ Audio tours → passive, forgettable
✅ AR CRYPTO TREASURE HUNT → addictive, shareable, measurable

=================================================

PROOF POINTS:

"How do you measure ROI?"
→ Dashboard tracks: tourist visits per location, time spent at each spot, social media shares, partner venue sales increases. We can correlate campaign costs to incremental tourism revenue.

"What if tourists don't understand crypto?"
→ They don't need to! We say "collect FREE digital rewards" and gamify the experience. 80% of our players have never owned crypto before—they learn by playing.

"How do local businesses benefit?"
→ We place high-value coins at partner restaurants, shops, and attractions. Tourists physically visit to collect. We've seen 20-40% foot traffic increases at partner locations.

=================================================

THE ASK:

I'd love to show you a case study from a similar-sized city and walk through how we'd customize this for {{Your City}}.

Would this Thursday or next Tuesday work for a 15-minute call?

=================================================

FOLLOW-UP EMAIL:

Subject: {{Your City}} Tourism AR Campaign - Proposal

Hi {{Name}},

As discussed, here's how we can create a viral tourism experience for {{Your City}}:

🎯 GOAL: Increase tourist engagement, spread visitors beyond downtown, support local businesses

🎮 SOLUTION: City-wide AR crypto treasure hunt

📊 EXPECTED RESULTS (based on similar campaigns):
• 10K-50K tourists engage in first 6 months
• 30% increase in visits to lesser-known attractions
• 100K+ social media impressions organically
• Measurable foot traffic to partner businesses

💰 INVESTMENT:
{{Tier}} Package: $X setup, $X/month
ROI typically breaks even within 90 days through increased tourism spending

Next Steps:
1. Review attached case study
2. 15-minute demo call
3. Customized proposal for {{Your City}}

Let's schedule time this week?

Best,
[YOUR NAME]`,

            'event-organizer': `SALES SCRIPT: Event/Festival Organizer

TARGET: Event planners, festival organizers, conference coordinators
CAMPAIGN TYPE: Event-exclusive AR treasure hunt

=================================================

OPENING:

{{Name}}, imagine attendees at {{Event}} playing an AR game throughout the venue like Nike's Paris AR Competition—but customized for YOUR event and creating social media content for you automatically.

I'm {{Your Name}}, and I help events create unforgettable, shareable experiences using AR technology.

=================================================

THE PROBLEM:

Event engagement is challenging:
• Attendees scroll on phones instead of networking
• Sponsors want more visibility than a banner
• Dead zones in your venue go unvisited
• Post-event social media buzz dies in 24 hours
• Measuring attendee flow is difficult

=================================================

THE SOLUTION:

We create an event-exclusive AR treasure hunt where attendees collect cryptocurrency while exploring your venue.

How it works:
1. We map your entire event space
2. Attendees download the app at check-in
3. Crypto coins are hidden at sponsor booths, stages, food courts, etc.
4. As they explore, they collect real $Ember tokens
5. Leaderboard creates friendly competition
6. Winners get prizes (your sponsors love this)

=================================================

WHY THIS WORKS FOR EVENTS:

Attendee Engagement:
• Forces exploration of entire venue (hello, dead zones!)
• Creates natural foot traffic to sponsor booths
• Gives attendees a "quest" beyond sessions
• Generates 100+ social media posts per day organically

Sponsor Value:
• Exclusive high-value coins at sponsor booths
• Measurable foot traffic per sponsor
• Digital engagement beyond physical booth
• Data on dwell time and interactions

=================================================

EVENT-SPECIFIC CUSTOMIZATION:

We customize for YOUR event:
🎪 Festivals → Coins at food vendors, stages, Instagram spots
🏢 Conferences → Coins at sponsor booths, keynote rooms, networking areas
🏃 Sporting Events → Coins at concessions, merchandise, fan zones
🎨 Art Fairs → Coins at artist booths, creating treasure hunt feel

=================================================

PROOF:

Nike's Paris AR Competition:
• 500K+ participants
• 80% explored areas they otherwise wouldn't
• Sponsors reported 3X booth traffic
• Event generated 2M+ social impressions

Our Events (12+ deployments):
• Average 60% of attendees engage
• 200+ social posts per 1,000 attendees
• Sponsor satisfaction scores improve 40%

=================================================

PRICING:

EVENT TIERS:
🎪 Small Event (<1,000 attendees): $X
🏢 Medium Event (1K-5K attendees): $X
🏟️ Large Event (5K+ attendees): $X

Included:
✅ Custom event branding
✅ Unlimited coins and locations
✅ Sponsor booth integration
✅ Real-time attendee heatmaps
✅ Social media toolkit
✅ Post-event analytics report

=================================================

THE ASK:

{{Name}}, I'd love to show you a 10-minute demo and discuss how we'd customize this for {{Event}}.

We're booking events 60-90 days out—would this Thursday at 3 PM work for a quick call?

=================================================

OBJECTION HANDLING:

"We already have an event app."
→ Perfect! This integrates WITH your existing app or runs standalone. It's an engagement layer, not a replacement.

"What if attendees don't download it?"
→ We make it irresistible: "Download to win $500 in prizes!" at check-in. Offer first 100 downloaders bonus tokens. QR codes everywhere. We've seen 60%+ adoption rates.

"How do sponsors participate?"
→ Each sponsor gets a branded "coin drop" at their booth with custom messaging. They see real-time analytics of how many people visited because of the game. It's measurable sponsorship ROI—they LOVE it.

"Sounds complicated to set up."
→ We handle everything. You give us the venue map and sponsor list 2 weeks before the event. We do the rest. Day-of support included.

=================================================

FOLLOW-UP EMAIL:

Subject: {{Event}} AR Treasure Hunt - Increase Engagement & Sponsor Value

Hi {{Name}},

Following up on creating an AR experience for {{Event}}.

Quick Summary:
✅ Attendees hunt for crypto throughout your venue
✅ Drives traffic to sponsor booths and dead zones
✅ Generates organic social media content
✅ Measurable engagement and heatmaps
✅ Creates memorable experience beyond sessions

Case Study: Similar event saw 60% attendee participation, 200+ social posts, and sponsors requesting return for next year.

Demo Link: [INSERT LINK]

Let's schedule 10 minutes to explore customization for {{Event}}?

Available Thursday 3 PM or Friday 10 AM?

Best,
[YOUR NAME]`,

            'app-enhancement': `SALES SCRIPT: Existing App Enhancement (Developer Path)

TARGET: Mobile app developers, gaming studios with existing user bases
CAMPAIGN TYPE: SDK integration for location-based crypto rewards

=================================================

OPENING:

Your app has {{X}} users. What if you could monetize them with location-based crypto rewards without building from scratch?

I'm {{Your Name}}, and we provide a FREE SDK that adds AR cryptocurrency treasure hunting to YOUR existing app in 1-2 weeks.

=================================================

THE PROBLEM:

You're leaving money on the table:
• You have engaged users but limited monetization
• Building location-based features would take months
• Crypto integration is complex and risky
• Advertisers want location-based sponsorships you can't offer

=================================================

THE SOLUTION:

Our FREE SDK plugs into your app and instantly adds:
✅ Location-based coin collection
✅ AR visualization layer
✅ Crypto wallet integration ($Ember tokens)
✅ Sponsored location system
✅ Analytics dashboard

Your users collect crypto at real-world locations—you sell those locations to advertisers.

=================================================

REVENUE MODEL (Your New Income):

Here's how you make money:

💰 Sponsored Locations:
• Sell locations to businesses: $300-$500/location/month
• 20 sponsored locations = $6K-$10K monthly recurring revenue
• 50 locations = $15K-$25K monthly
• You keep 100% - we charge you API fees ($49-$399/mo based on usage)

💰 Airdrop Campaigns:
• Brands pay for one-time token airdrops to your users
• $2K-$10K per airdrop event

💰 User Growth:
• Location-based features increase retention 30-50%
• More engaged users = more valuable app

=================================================

THE OFFER:

FREE SDK + Revenue Share Model:

🆓 SDK: $0 (open source on GitHub)
💻 API Tiers:
   • Starter: $49/mo (10K API calls)
   • Growth: $149/mo (100K calls) ← Most apps
   • Scale: $399/mo (500K calls)

You pay ONLY for API usage. No upfront costs. No revenue share.

=================================================

TECHNICAL INTEGRATION:

Timeline:
• Week 1: SDK integration, basic features live
• Week 2: Customization, testing, polish
• Week 3: Soft launch to subset of users
• Week 4: Full rollout

Our SDK includes:
✅ React Native, Flutter, Native iOS/Android support
✅ Complete documentation
✅ Code examples
✅ Technical support channel
✅ Analytics dashboard access

=================================================

WHY THIS MAKES SENSE:

Build vs. Buy Analysis:

BUILD YOURSELF:
• 3-6 months development time
• $50K-$150K in developer costs
• Ongoing maintenance burden
• Security/compliance risks with crypto

USE OUR SDK:
• 1-2 weeks to integrate
• FREE SDK + $149/mo API costs
• We handle updates and security
• Start earning revenue immediately

=================================================

PROOF POINTS:

"Why would businesses pay for sponsored locations?"
→ Because YOUR users will physically visit to collect coins. It's measurable foot traffic. Restaurants, retail, entertainment venues pay $300-$500/mo for guaranteed visits.

"How do we avoid blockchain complexity?"
→ We abstract it all away. Your app makes simple API calls. We handle wallets, transactions, security. Your users don't even realize it's blockchain—they just see "collectible rewards."

"What if this hurts our core features?"
→ It ENHANCES them. Location features increase engagement. Users who collect coins are 40% more likely to be daily active users.

=================================================

THE ASK:

I'd love to walk you through the SDK documentation and show you the revenue potential based on YOUR current user base.

Would Thursday at 2 PM work for a 20-minute technical demo?

=================================================

FOLLOW-UP EMAIL:

Subject: {{App Name}} - Add $10K+/month revenue with FREE SDK

Hi {{Name}},

Following up on adding location-based crypto rewards to {{App Name}}.

THE OPPORTUNITY:
{{X}} users × location features = new revenue stream

SIMPLE INTEGRATION:
• FREE SDK (1-2 weeks to integrate)
• We handle all blockchain complexity
• You sell sponsored locations to businesses
• Keep 100% of sponsorship revenue

REVENUE PROJECTION:
At {{X}} users, you could realistically sell:
• 20 sponsored locations at $400/month = $8K monthly
• 2 airdrop campaigns/month at $5K each = $10K monthly
• Total new revenue: $18K/month
• Your cost: $149/month API fees
• NET: $17,851/month in new income

TECHNICAL DETAILS:
• GitHub: [LINK]
• Documentation: [LINK]
• Demo App: [LINK]

Let's schedule 20 minutes to review integration for {{App Name}}?

Best,
[YOUR NAME]`,

            'gaming-studio': `SALES SCRIPT: Gaming Studio

TARGET: Mobile game studios, AR gaming developers
CAMPAIGN TYPE: SDK integration to add real-world location features

=================================================

OPENING:

Building location-based features takes months. Our SDK gives you battle-tested AR crypto gaming in weeks.

I'm {{Your Name}}, and we help game studios add location-based crypto rewards to their games using the same technology that powered Pizza Hut's PAC-MAN AR campaign.

=================================================

THE PROBLEM:

You want location-based features but face:
• 4-6 month dev cycles to build from scratch
• Crypto/blockchain integration complexity
• GPS + Beacon technology expertise needed
• Security and compliance concerns
• Ongoing infrastructure maintenance

Meanwhile, competitors are shipping faster.

=================================================

THE SOLUTION:

Our FREE SDK includes everything you need:
✅ GPS + Beacon location technology
✅ AR coin visualization
✅ Crypto wallet integration ($Ember blockchain)
✅ Multiplayer systems
✅ Analytics and anti-cheat
✅ Monetization ready (sponsored locations)

You focus on game design. We handle location tech.

=================================================

FOR GAMING STUDIOS:

Perfect if you're building:
🎮 Location-based RPGs
🏃 Fitness/walking games
🗺️ Treasure hunt games
⚔️ Territory control games
🎯 AR shooter games

Examples:
• "Pokémon GO meets your IP"
• "Geocaching with real cryptocurrency"
• "Guild Wars for real-world territories"

=================================================

TECHNICAL ADVANTAGES:

Unlike building yourself:

OURS:
✅ Tested across 12+ campaigns (6 years)
✅ Anti-cheat systems built-in
✅ Scales to 100K+ concurrent users
✅ Sub-100ms latency
✅ 99.9% uptime SLA

BUILD YOURSELF:
❌ Untested at scale
❌ Security vulnerabilities
❌ Performance optimization takes months
❌ Blockchain integration learning curve

=================================================

INTEGRATION OPTIONS:

Option 1: Full SDK Integration
• Complete feature set
• 2-4 weeks integration
• Best for new games

Option 2: API-Only Integration
• Use your existing AR/location tech
• Just add our crypto rewards layer
• 1 week integration
• Best for games already in production

Option 3: Hybrid
• Use some of our modules, not others
• Maximum flexibility

=================================================

REVENUE MODELS FOR YOUR GAME:

How you make money:

💰 Sponsored Locations ($10K-$50K/month):
• Sell location spawns to brands
• McDonald's wants creatures at their restaurants
• You get paid per location per month

💰 In-Game Currency:
• Players buy $Ember tokens to enhance gameplay
• You get transaction fees

💰 Premium Features:
• Beacon support for indoor gameplay
• Advanced AR features
• Custom branded coins

=================================================

PROOF:

Pizza Hut × PAC-MAN AR:
• Location-based gameplay drove store visits
• Millions of gameplay sessions
• Measurable foot traffic increases

Our Gaming Partners:
• Average 40% increase in DAU after adding location features
• 60% of users engage with crypto rewards
• Location-sponsored revenue: $10K-$75K/month

=================================================

THE OFFER:

🆓 SDK: FREE (MIT License on GitHub)
💻 API Costs: $49-$399/month (based on usage)
🎮 No revenue share - you keep 100% of your earnings

We make money on API calls. You make money on sponsored locations and in-game purchases.

=================================================

THE ASK:

I'd love to show you the SDK, walk through integration for {{Your Game}}, and discuss your specific use case.

Would Thursday at 3 PM work for a 30-minute technical deep-dive?

=================================================

OBJECTION HANDLING:

"We're concerned about blockchain complexity."
→ You'll never touch blockchain code. Our SDK abstracts everything. From your game's perspective, it's just API calls. We handle wallets, transactions, security behind the scenes.

"What about app store approval?"
→ We're compliant with Apple and Google policies. 12+ games shipped successfully. We provide policy documentation and have never had a rejection related to our SDK.

"How do we test before committing?"
→ Integration takes 1 week for basic functionality. Test with your QA team. If you don't like it, remove it. SDK is free - you're only risking dev time.

"What if your servers go down?"
→ 99.9% uptime SLA. Redundant infrastructure across 3 regions. Plus, SDK includes offline mode - gameplay continues even if API is down temporarily.

=================================================

FOLLOW-UP EMAIL:

Subject: {{Game Name}} - Add location features in 2 weeks (not 6 months)

Hi {{Name}},

Following up on adding location-based crypto rewards to {{Game Name}}.

TIME TO MARKET:
• Build yourself: 4-6 months
• Our SDK: 2 weeks to production

TECHNICAL PROOF:
• GitHub: [LINK]
• Live Demo Game: [LINK]
• Documentation: [LINK]
• Case Studies: [LINK]

REVENUE OPPORTUNITY:
Based on your player base, you could generate:
• Sponsored locations: $15K-$50K/month
• In-game currency: $5K-$20K/month
• Total potential: $20K-$70K monthly recurring

Your cost: $149/month API fees

ROI: Positive within 30 days

Let's schedule 30 minutes for technical review?

Available Thursday 3 PM or Friday 11 AM?

Best,
[YOUR NAME]`
        };
        
        scriptButtons.forEach(btn => {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                const scriptId = this.getAttribute('data-script');
                const content = scriptContent[scriptId];
                
                if (content && modalBody) {
                    modalBody.innerHTML = '<pre>' + content + '</pre>';
                    modal.classList.add('active');
                    document.body.style.overflow = 'hidden';
                }
            });
        });
        
        function closeModal() {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }
        
        if (closeBtn) {
            closeBtn.addEventListener('click', closeModal);
        }
        
        const overlay = modal.querySelector('.script-modal-overlay');
        if (overlay) {
            overlay.addEventListener('click', closeModal);
        }
        
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && modal.classList.contains('active')) {
                closeModal();
            }
        });
    }
    
    /* ========================================
       PROPOSAL MODAL
       ======================================== */
    function initProposalModal() {
        const modal = document.getElementById('proposal-modal');
        const modalBody = document.getElementById('proposal-modal-body');
        const closeBtn = modal ? modal.querySelector('.proposal-modal-close') : null;
        const proposalButtons = document.querySelectorAll('.view-full-proposal-btn');
        
        if (!modal || !modalBody) return;
        
        const proposalContent = {
            'white-label': `
                <h2>Branded AR Crypto Gaming Campaign Proposal</h2>
                <h3>For: {{Client Name}}</h3>
                <p><em>Prepared by: {{Your Agency/Company}}</em></p>
                
                <h3>Executive Summary</h3>
                <p>We propose launching a custom white-label AR treasure hunt campaign that drives foot traffic to your locations using cryptocurrency rewards. This proven technology has generated millions in engagement for brands like Starbucks, Nike, and Cadbury.</p>
                
                <h3>Campaign Overview</h3>
                <p><strong>Campaign Name:</strong> {{Custom Name}} AR Treasure Hunt</p>
                <p><strong>Duration:</strong> {{Duration}} months</p>
                <p><strong>Target Audience:</strong> Gen Z & Millennials (18-40)</p>
                <p><strong>Locations:</strong> {{Number}} of your physical locations</p>
                
                <h3>How It Works</h3>
                <ol>
                    <li><strong>Branded Mobile App:</strong> We create a white-labeled app with your logo, colors, and branding</li>
                    <li><strong>AR Treasure Hunt:</strong> Users see a map of {{City/Area}} with crypto coins hidden at your locations</li>
                    <li><strong>Physical Visits Required:</strong> Users must physically visit your locations to collect rewards</li>
                    <li><strong>Cryptocurrency Rewards:</strong> Users earn real $Ember tokens (valued at $0.003 each, tradeable)</li>
                    <li><strong>Social Sharing:</strong> Users naturally share their achievements on social media</li>
                </ol>
                
                <h3>Expected Results (Based on Similar Campaigns)</h3>
                <ul>
                    <li>10,000-50,000 app downloads in first 90 days</li>
                    <li>30-50% increase in foot traffic to participating locations</li>
                    <li>100,000+ social media impressions organically</li>
                    <li>60% of players visit 3+ times during campaign</li>
                    <li>20% conversion rate to paying customers</li>
                </ul>
                
                <h3>Investment</h3>
                <table border="1" cellpadding="10" style="border-collapse: collapse; width: 100%; margin: 20px 0;">
                    <tr style="background: rgba(240,165,0,0.2);">
                        <th>Item</th>
                        <th>Cost</th>
                    </tr>
                    <tr>
                        <td>Campaign Setup & Branding</td>
                        <td>$2,500 one-time</td>
                    </tr>
                    <tr>
                        <td>Monthly Campaign Management</td>
                        <td>$1,500/month</td>
                    </tr>
                    <tr>
                        <td>Location Integration ({{X}} locations)</td>
                        <td>$200/location/month</td>
                    </tr>
                    <tr>
                        <td>$Ember Token Budget</td>
                        <td>$500-$2,000/month</td>
                    </tr>
                    <tr style="background: rgba(240,165,0,0.1); font-weight: bold;">
                        <td>Total Monthly Investment</td>
                        <td>$4,000-$5,500/month</td>
                    </tr>
                </table>
                
                <h3>Timeline</h3>
                <p><strong>Week 1-2:</strong> Branding design, app customization, location mapping</p>
                <p><strong>Week 3:</strong> Beta testing with internal team</p>
                <p><strong>Week 4:</strong> Soft launch to select audience</p>
                <p><strong>Week 5+:</strong> Full public launch, ongoing optimization</p>
                
                <h3>What's Included</h3>
                <ul>
                    <li>✅ Fully branded mobile app (iOS & Android compatible web app)</li>
                    <li>✅ Management dashboard with real-time analytics</li>
                    <li>✅ Cryptocurrency wallet integration</li>
                    <li>✅ Social media toolkit (graphics, copy, hashtags)</li>
                    <li>✅ Launch support and training</li>
                    <li>✅ Monthly performance reports</li>
                    <li>✅ Ongoing optimization and support</li>
                </ul>
                
                <h3>Case Study: Similar Campaign</h3>
                <p><strong>Restaurant Chain (15 locations, 3-month campaign):</strong></p>
                <ul>
                    <li>32,000 app downloads</li>
                    <li>45% increase in foot traffic</li>
                    <li>$180K in incremental revenue</li>
                    <li>ROI: 340% over 3 months</li>
                    <li>150K+ social media impressions (earned, not paid)</li>
                </ul>
                
                <h3>Why This Works</h3>
                <p><strong>For Gen Z & Millennials:</strong> They grew up with digital rewards (Fortnite skins, gaming achievements). Crypto is the next evolution—it's REAL value they can own and trade.</p>
                <p><strong>Gamification:</strong> Treasure hunting is addictive. Leaderboards create competition. Social sharing is built-in.</p>
                <p><strong>Measurable:</strong> Unlike traditional advertising, you see EXACT foot traffic numbers, conversion rates, and ROI.</p>
                
                <h3>Next Steps</h3>
                <ol>
                    <li>Review and approve this proposal</li>
                    <li>Sign service agreement</li>
                    <li>Kick-off meeting to finalize branding</li>
                    <li>Launch in 4 weeks</li>
                </ol>
                
                <h3>Questions?</h3>
                <p>Contact: {{Your Name}}</p>
                <p>Email: {{Your Email}}</p>
                <p>Phone: {{Your Phone}}</p>
                
                <p><em>This proposal is valid for 30 days from date of submission.</em></p>
            `,
            
            'sponsored-locations': `
                <h2>Sponsored Locations Proposal</h2>
                <h3>Advertise in {{App Name}}</h3>
                <p><em>Prepared for: {{Client Business Name}}</em></p>
                
                <h3>Executive Summary</h3>
                <p>{{App Name}} has {{X}} active users who explore real-world locations through our AR treasure hunt game. We're offering {{Client}} the opportunity to place branded crypto coins at your locations, driving our engaged user base directly to your business.</p>
                
                <h3>The Opportunity</h3>
                <p>Our users are actively looking for places to visit. When you sponsor a location in our app:</p>
                <ul>
                    <li>Your business appears on the treasure map with your logo</li>
                    <li>High-value $Ember coins are placed exclusively at your location</li>
                    <li>Users must physically visit to collect rewards</li>
                    <li>You get measurable foot traffic from our user base</li>
                </ul>
                
                <h3>User Demographics</h3>
                <ul>
                    <li><strong>Age:</strong> 65% are 18-35 years old</li>
                    <li><strong>Income:</strong> 70% have disposable income of $30K+</li>
                    <li><strong>Behavior:</strong> 80% visit 3+ sponsored locations per week</li>
                    <li><strong>Engagement:</strong> Average session time: 25 minutes</li>
                    <li><strong>Local:</strong> {{X}}% are within {{Y}} miles of your location</li>
                </ul>
                
                <h3>Sponsorship Tiers</h3>
                
                <h4>🥉 Bronze Tier - $300/month per location</h4>
                <ul>
                    <li>Standard coin placement (100-250 $Ember value)</li>
                    <li>Your logo on location pin</li>
                    <li>Basic analytics dashboard</li>
                    <li>Estimated reach: 500-1,000 visits/month</li>
                </ul>
                
                <h4>🥈 Silver Tier - $500/month per location</h4>
                <ul>
                    <li>High-value coin placement (500-1,000 $Ember value)</li>
                    <li>Featured listing in app</li>
                    <li>Custom branded coin design</li>
                    <li>Advanced analytics + heatmaps</li>
                    <li>Estimated reach: 1,000-2,000 visits/month</li>
                </ul>
                
                <h4>🥇 Gold Tier - $750/month per location</h4>
                <ul>
                    <li>Exclusive rare coin (1,000-2,500 $Ember value)</li>
                    <li>Priority listing + push notifications</li>
                    <li>Custom quest/challenge at your location</li>
                    <li>Full analytics suite + API access</li>
                    <li>Social media co-promotion</li>
                    <li>Estimated reach: 2,000-3,000 visits/month</li>
                </ul>
                
                <h3>Case Study: Coffee Shop Chain</h3>
                <p><strong>3-month Silver Tier campaign across 5 locations:</strong></p>
                <ul>
                    <li>8,450 unique visitors driven by the app</li>
                    <li>22% conversion rate to purchase</li>
                    <li>$15 average transaction</li>
                    <li>Total revenue generated: $27,885</li>
                    <li>Investment: $7,500 (5 locations × $500/mo × 3 months)</li>
                    <li><strong>ROI: 272%</strong></li>
                </ul>
                
                <h3>What You Get</h3>
                
                <h4>Visibility</h4>
                <ul>
                    <li>Your location highlighted on treasure map</li>
                    <li>Logo displayed in app</li>
                    <li>Push notifications when users are nearby</li>
                    <li>Featured in weekly "Hot Spots" email to users</li>
                </ul>
                
                <h4>Analytics</h4>
                <ul>
                    <li>Daily visitor counts from app</li>
                    <li>Peak visitation times</li>
                    <li>User demographics</li>
                    <li>Average dwell time at your location</li>
                    <li>Return visitor rates</li>
                </ul>
                
                <h4>Marketing Support</h4>
                <ul>
                    <li>QR code posters for your location</li>
                    <li>Social media graphics</li>
                    <li>Staff training materials</li>
                    <li>Co-marketing opportunities</li>
                </ul>
                
                <h3>Proposed Plan for {{Client}}</h3>
                <p><strong>Locations:</strong> {{Number}} of your {{City}} locations</p>
                <p><strong>Tier:</strong> {{Recommended Tier}}</p>
                <p><strong>Duration:</strong> {{Duration}} month pilot</p>
                
                <h3>Investment</h3>
                <table border="1" cellpadding="10" style="border-collapse: collapse; width: 100%; margin: 20px 0;">
                    <tr style="background: rgba(240,165,0,0.2);">
                        <th>Item</th>
                        <th>Monthly Cost</th>
                        <th>Total ({{Duration}} months)</th>
                    </tr>
                    <tr>
                        <td>{{Tier}} Sponsorship × {{X}} locations</td>
                        <td>${{Monthly Cost}}</td>
                        <td>${{Total Cost}}</td>
                    </tr>
                    <tr>
                        <td>Setup Fee (one-time)</td>
                        <td>-</td>
                        <td>$500</td>
                    </tr>
                    <tr style="background: rgba(240,165,0,0.1); font-weight: bold;">
                        <td>Total Investment</td>
                        <td>${{Monthly}}</td>
                        <td>${{Grand Total}}</td>
                    </tr>
                </table>
                
                <h3>Expected Results</h3>
                <p>Based on your {{X}} locations and {{Tier}} tier sponsorship:</p>
                <ul>
                    <li><strong>Estimated monthly visitors from app:</strong> {{Y}} - {{Z}}</li>
                    <li><strong>Projected conversion rate:</strong> 15-25%</li>
                    <li><strong>If $15 avg transaction:</strong> ${{Revenue Low}} - ${{Revenue High}} in incremental revenue</li>
                    <li><strong>Estimated ROI:</strong> {{ROI}}% over {{Duration}} months</li>
                </ul>
                
                <h3>Why Partner With Us?</h3>
                <ul>
                    <li>✅ Our users are ACTIVELY looking for places to visit</li>
                    <li>✅ 100% measurable foot traffic (unlike traditional ads)</li>
                    <li>✅ Younger, digitally-engaged demographic</li>
                    <li>✅ No long-term contract required - month-to-month</li>
                    <li>✅ Proven track record across {{X}} sponsored locations</li>
                </ul>
                
                <h3>Next Steps</h3>
                <ol>
                    <li>Review this proposal</li>
                    <li>Schedule 15-minute demo of how sponsorship works</li>
                    <li>Select locations and tier</li>
                    <li>Sign sponsorship agreement</li>
                    <li>Go live within 1 week</li>
                </ol>
                
                <h3>Questions?</h3>
                <p>Contact: {{Your Name}}</p>
                <p>Email: {{Your Email}}</p>
                <p>Phone: {{Your Phone}}</p>
                <p>Demo Link: {{App Demo URL}}</p>
                
                <p><em>Special Offer: Sign up for 3+ locations and receive first month at 50% off!</em></p>
            `
        };
        
        proposalButtons.forEach(btn => {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                const proposalId = this.getAttribute('data-proposal');
                const content = proposalContent[proposalId];
                
                if (content && modalBody) {
                    modalBody.innerHTML = content;
                    modal.classList.add('active');
                    document.body.style.overflow = 'hidden';
                }
            });
        });
        
        function closeModal() {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }
        
        if (closeBtn) {
            closeBtn.addEventListener('click', closeModal);
        }
        
        const overlay = modal.querySelector('.proposal-modal-overlay');
        if (overlay) {
            overlay.addEventListener('click', closeModal);
        }
        
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && modal.classList.contains('active')) {
                closeModal();
            }
        });
    }
    
    /* ========================================
       SCROLL REVEAL ANIMATIONS
       ======================================== */
    function initScrollReveal() {
        const reveals = document.querySelectorAll('.scroll-reveal');
        
        if (!reveals.length) return;
        
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });
        
        reveals.forEach(reveal => {
            revealObserver.observe(reveal);
        });
    }
    
    /* ========================================
       INITIALIZE ALL FUNCTIONS
       ======================================== */
    function init() {
        // Wait for DOM to be fully loaded
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', init);
            return;
        }
        
        // Initialize all modules
        initConstructionBanner();
        initCalculatorToggle();
        initAgencyCalculator();
        initDeveloperCalculator();
        initChecklistModal();
        initScriptModal();
        initProposalModal();
        initScrollReveal();
        
        console.log('✅ Vault Phoenix Onboarding v6.0 initialized successfully');
    }
    
    // Start initialization
    init();
    
})();

/* ========================================
   END OF FILE - v6.0
   
   ✅ Calculator toggle working
   ✅ Both calculators functional
   ✅ Checklist modal functional
   ✅ Script/Proposal modals working
   ✅ Scroll reveal animations
   ✅ All interactive elements working
   ======================================== */
