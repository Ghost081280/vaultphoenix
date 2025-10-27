// Vault Phoenix - Enhanced 3-TIER HYBRID CHATBOT
// TIER 1: Comprehensive Offline Responses (NEW: Extensive training data)
// TIER 2: Browser AI (WebLLM) - Smart fallback
// TIER 3: Cloud AI (Claude) - Advanced queries
// UPDATED: Extensive offline knowledge base from website + Location-Based AR content

// ============================================
// CONFIGURATION
// ============================================
const CLAUDE_API_KEY = 'YOUR_CLAUDE_API_KEY_HERE'; // Replace with actual key
const CLAUDE_API_URL = 'https://api.anthropic.com/v1/messages';
const CLAUDE_MODEL = 'claude-sonnet-4-20250514';

// WebLLM Configuration  
const WEBLLM_MODEL = 'Llama-3.2-3B-Instruct-q4f16_1-MLC';
let webLLMEngine = null;
let isWebLLMLoaded = false;
let isWebLLMLoading = false;

let conversationHistory = [];
let isTyping = false;

// ============================================
// COMPREHENSIVE OFFLINE KNOWLEDGE BASE (TIER 1)
// ============================================
const offlineResponses = {
    // LOCATION-BASED AR - CORE TECHNOLOGY
    'location_ar': {
        keywords: ['location', 'location-based', 'gps', 'beacon', 'beacons', 'indoor', 'outdoor', 'ar overlay', 'augmented reality', 'how does it work', 'technology'],
        response: `<strong style="font-size: 1.15rem; color: #f0a500;">Location-Based AR — $Ember Token Rewards</strong><br><br>
            <strong>What is Location-Based AR?</strong><br>
            Vault Phoenix overlays <span style="color: #f0a500; font-weight: 600;">$Ember tokens</span> onto real-world locations through a web app or SDK. Using <strong>GPS outdoors</strong> and <strong>beacon technology indoors</strong>, our platform delivers immersive experiences that encourage players to visit specific locations to collect $Ember tokens.<br><br>
            
            <strong>How It Works:</strong><br>
            • <strong>GPS Outdoors:</strong> 5-10 meter accuracy for outdoor locations<br>
            • <strong>Beacons Indoors:</strong> 1-5 meter centimeter-level precision<br>
            • <strong>$Ember Placement:</strong> Tokens overlaid at real-world points of interest<br>
            • <strong>Contextual Interaction:</strong> Tap/swipe to collect tokens and unlock rewards<br><br>
            
            <strong>Why Beacons Matter:</strong><br>
            Beacons enhance indoor experiences by sending precise signals so AR content and $Ember tokens appear exactly where intended — in stores, museums, or venues. Combined with GPS, this provides <strong>full indoor + outdoor coverage</strong> for token collection.<br><br>
            
            <strong>Applications:</strong><br>
            • Gaming & Entertainment (scavenger hunts, challenges)<br>
            • Retail & Marketing (foot traffic, promotions)<br>
            • Tourism & Sightseeing (landmark exploration)<br>
            • Education & Training (interactive lessons)<br>
            • Navigation & Wayfinding<br><br>
            
            📧 <a href="mailto:contact@vaultphoenix.com?subject=Location-Based AR Inquiry" style="color: #f0a500; font-weight: bold;">Learn more: contact@vaultphoenix.com</a>`
    },
    
    // PRICING - WHITE-LABEL & SDK
    'pricing': {
        keywords: ['price', 'cost', 'how much', 'pricing', 'payment', 'pay', 'expensive', 'affordable', 'budget', 'white-label cost', 'sdk cost'],
        response: `<strong style="font-size: 1.15rem; color: #f0a500;">Vault Phoenix Pricing</strong><br><br>
            <strong>🎮 White-Label AR Gaming App:</strong><br>
            • Setup: $499 (one-time)<br>
            • Monthly: $149/month<br>
            • Deployment: 24 hours<br>
            • Includes: $100 FREE $Ember tokens<br>
            • Features: Full GPS & Beacon support, custom branding, no-code builder<br><br>
            
            <strong>🛠️ SDK Integration:</strong><br>
            • SDK: FREE download<br>
            • Management System: $49-$399/month (based on scale)<br>
            • Launch: Early 2026<br>
            • Includes: $100 FREE $Ember tokens<br>
            • Features: GPS & Beacon integration, developer tools, API access<br><br>
            
            <strong>💰 Revenue Potential:</strong><br>
            Location partners earn $10K-$75K/month through:<br>
            • Token-based campaigns driving foot traffic<br>
            • GPS-verified visit tracking<br>
            • Measurable ROI with real-time analytics<br><br>
            
            <strong>🎁 Both Solutions Include:</strong><br>
            • $100 in FREE $Ember tokens to jumpstart campaigns<br>
            • Full GPS (outdoor) + Beacon (indoor) technology<br>
            • Management system access<br>
            • Professional support<br><br>
            
            📧 <a href="mailto:contact@vaultphoenix.com?subject=Pricing Inquiry" style="color: #f0a500; font-weight: bold;">Get custom quote: contact@vaultphoenix.com</a>`
    },
    
    // $EMBER TOKEN PRESALE
    'presale': {
        keywords: ['presale', 'token', 'ember', '$ember', 'ico', 'token sale', 'buy tokens', 'invest', 'investment', 'crowdsale'],
        response: `<strong style="font-size: 1.15rem; color: #f0a500;">$Ember Token Presale</strong><br><br>
            <strong>📅 Launch Date:</strong> November 1, 2025<br>
            <strong>💰 Token Price:</strong> $0.003 per token<br>
            <strong>🪙 Total Available:</strong> 166.7M tokens (16.67% of supply)<br>
            <strong>🎯 Hard Cap:</strong> $500,000<br>
            <strong>⏱️ Duration:</strong> 45 days (or until cap reached)<br><br>
            
            <strong>Investment Limits:</strong><br>
            • Minimum: $10 USD<br>
            • Maximum: $50,000 USD<br><br>
            
            <strong>Vesting Schedule:</strong><br>
            • 10% at TGE (Token Generation Event)<br>
            • 90% linear vesting over 3 months<br><br>
            
            <strong>Fund Allocation ($500K):</strong><br>
            • 40% ($200K): Liquidity pool locked for 3 months<br>
            • 35% ($175K): Development (GPS & Beacon tech)<br>
            • 15% ($75K): Legal & compliance<br>
            • 10% ($50K): Marketing & partnerships<br><br>
            
            <strong>Why Join?</strong><br>
            • Early access at $0.003 before Platform Operator demand<br>
            • Built-in token utility (required for campaigns)<br>
            • Professional legal & financial oversight<br>
            • Smart contract audits & multi-sig security<br><br>
            
            <strong>Accepted Payments:</strong> ETH, MATIC, Credit Card<br><br>
            
            📧 <a href="mailto:contact@vaultphoenix.com?subject=Presale Inquiry" style="color: #f0a500; font-weight: bold;">Join presale: contact@vaultphoenix.com</a>`
    },
    
    // TOKENOMICS
    'tokenomics': {
        keywords: ['tokenomics', 'token distribution', 'token allocation', 'supply', 'total supply', 'token utility', 'token economics'],
        response: `<strong style="font-size: 1.15rem; color: #f0a500;">$Ember Token Economics</strong><br><br>
            <strong>Total Supply:</strong> 1,000,000,000 EMBER (Fixed)<br>
            <strong>Network:</strong> Polygon (ERC-20)<br><br>
            
            <strong>Token Distribution:</strong><br>
            • 35% (350M): Campaign Token Pool - sold to Platform Operators/Advertisers<br>
            • 30% (300M): Platform Operator & SDK Incentives - $100 bonus per customer<br>
            • 16.67% (166.7M): Presale - $500K raise at $0.003/token<br>
            • 10% (100M): Team & Development - 1yr cliff, 3yr vesting<br>
            • 5% (50M): Treasury/Growth Fund - community voting<br>
            • 3.33% (33.3M): Reserve/Burn - deflationary mechanisms<br><br>
            
            <strong>Token Utility:</strong><br>
            • <strong>Platform Currency:</strong> Required for GPS & Beacon campaign deployment<br>
            • <strong>SDK Revenue:</strong> White-label apps create ongoing demand<br>
            • <strong>Location Coverage:</strong> Players collect tokens at GPS/Beacon locations<br>
            • <strong>Cash-Out Option:</strong> Via Coinbase Wallet to bank accounts<br>
            • <strong>Circular Economy:</strong> Operators buy → Deploy → Players collect → Repeat<br><br>
            
            <strong>Value Creation:</strong><br>
            Every GPS & Beacon campaign deployment and Advertiser partnership drives real utility and token demand growth.<br><br>
            
            📧 <a href="mailto:contact@vaultphoenix.com?subject=Tokenomics Question" style="color: #f0a500; font-weight: bold;">Questions? contact@vaultphoenix.com</a>`
    },
    
    // HOW IT WORKS - THREE STAKEHOLDERS
    'how_it_works': {
        keywords: ['how it works', 'how does', 'explain', 'stakeholders', 'platform operators', 'players', 'advertisers', 'merchants', 'ecosystem'],
        response: `<strong style="font-size: 1.15rem; color: #f0a500;">How $Ember Creates Real Value</strong><br><br>
            <strong>Three-Stakeholder Ecosystem:</strong><br><br>
            
            <strong>1️⃣ Platform Operators</strong><br>
            • Purchase white-label AR app or SDK license<br>
            • Buy $Ember tokens to fuel campaigns<br>
            • Deploy tokens at GPS locations (Outdoors) and Beacon locations (Indoors)<br>
            • Partner with local Advertisers as redemption stops<br>
            • Launch AR campaigns & track performance<br>
            <em>Benefits:</em> Scalable marketing, real foot traffic, measurable ROI, revenue from token sales<br><br>
            
            <strong>2️⃣ Players</strong><br>
            • Use AR app to collect tokens at GPS/Beacon spots<br>
            • Choose reward path:<br>
              → Redeem at local Advertisers (scan QR, get discounts)<br>
              → Send to Coinbase Wallet → cash out to bank<br>
            <em>Benefits:</em> Real value locally, flexible cash-out, discover businesses, fun AR gaming<br><br>
            
            <strong>3️⃣ Advertisers</strong><br>
            • Register as campaign partner<br>
            • Purchase $Ember tokens for enhanced visibility<br>
            • Deploy GPS markers (Outside) and Beacon markers (Inside)<br>
            • Accept $Ember tokens via QR or POS integration<br>
            • Settle in fiat/USDC periodically<br>
            <em>Benefits:</em> New customers, enhanced visibility, easy settlement, cutting-edge marketing<br><br>
            
            <strong>Complete Location Coverage:</strong><br>
            GPS (Outdoors) + Beacons (Indoors) = Full marketing reach everywhere!<br><br>
            
            📧 <a href="mailto:contact@vaultphoenix.com?subject=Ecosystem Question" style="color: #f0a500; font-weight: bold;">Learn more: contact@vaultphoenix.com</a>`
    },
    
    // ROADMAP
    'roadmap': {
        keywords: ['roadmap', 'timeline', 'when', 'launch date', 'development plan', 'future', 'q4 2025', 'q1 2026'],
        response: `<strong style="font-size: 1.15rem; color: #f0a500;">$Ember Development Roadmap</strong><br><br>
            <strong>Q4 2025 - Platform Launch (ACTIVE):</strong><br>
            ✅ $Ember Token contract deployment on Polygon<br>
            🔥 White-label AR gaming app template (GPS & Beacon)<br>
            🔥 Management system development & testing<br>
            🔥 SDK framework with GPS & Beacon integration<br>
            🔥 Smart contract audits & security verification<br>
            🔥 Initial Platform Operator acquisition campaigns<br>
            🔥 Token distribution through management system<br><br>
            
            <strong>Q1 2026 - Distribution Expansion (UPCOMING):</strong><br>
            • Expand white-label app sales (GPS & Beacon features)<br>
            • Enhanced management system features & analytics<br>
            • SDK marketplace and developer onboarding<br>
            • Advanced GPS & Beacon campaign management tools<br>
            • Token staking and loyalty reward systems<br>
            • Automated Advertiser onboarding workflows<br><br>
            
            <strong>2026+ - Ecosystem Scaling (PLANNED):</strong><br>
            • Enterprise SDK licensing programs<br>
            • Multi-chain support and cross-chain bridges<br>
            • Advanced analytics and AI-powered optimization<br>
            • Global white-label app distribution network<br>
            • Franchise and partnership expansion programs<br>
            • Token utility expansion into new verticals<br><br>
            
            <strong>Legal & Compliance Commitments:</strong><br>
            • Professional legal & financial oversight<br>
            • KYC/AML procedures for significant purchases<br>
            • Third-party smart contract audits<br>
            • Transparent quarterly reporting<br><br>
            
            📧 <a href="mailto:contact@vaultphoenix.com?subject=Roadmap Question" style="color: #f0a500; font-weight: bold;">Stay updated: contact@vaultphoenix.com</a>`
    },
    
    // TEAM
    'team': {
        keywords: ['team', 'founder', 'founders', 'ceo', 'cto', 'who', 'melinda', 'andrew', 'muhammad', 'christopher', 'advisors'],
        response: `<strong style="font-size: 1.15rem; color: #f0a500;">Meet the Phoenix Builders</strong><br><br>
            <strong>Core Team:</strong><br><br>
            
            <strong>Melinda Artzer - CEO & Visionary</strong><br>
            Military law, design, marketing and operations expertise. Builds systems that empower people, strengthen brands, mitigate risk, and drive innovation with integrity and measurable impact.<br>
            Skills: Strategic Leadership, Business Development, Operations<br><br>
            
            <strong>Andrew Couch - CTO & Development</strong><br>
            Experienced in location-based marketing, augmented reality, and web development. Creates immersive digital experiences that drive engagement and connect physical/digital worlds.<br>
            Skills: Blockchain Development, AR/VR Systems, Security<br><br>
            
            <strong>Muhammad Inayat - Systems Architect</strong><br>
            Designs secure, scalable system architectures that foster business growth, enable digital transformation, and build trust in distributed systems.<br>
            Skills: Product Design, User Experience, Business Psychology<br><br>
            
            <strong>Strategic Advisors:</strong><br><br>
            
            <strong>Christopher Sorge - Finance Advisor & Compliance</strong><br>
            Expert guidance in finance, operations, and cybersecurity. Extensive experience in OpSec, regulatory compliance, and strategic planning. Holds CNSS 4011 and Certified Ethical Hacker certifications.<br>
            Skills: Financial Compliance, Legal Framework, Risk Management<br><br>
            
            <strong>Experience:</strong> 6+ years battle-tested, 12+ successful games<br><br>
            
            📧 <a href="mailto:contact@vaultphoenix.com?subject=Team Question" style="color: #f0a500; font-weight: bold;">Meet us: contact@vaultphoenix.com</a>`
    },
    
    // TECHNICAL FOUNDATION
    'technical': {
        keywords: ['technical', 'technology', 'blockchain', 'smart contract', 'polygon', 'erc-20', 'security', 'audit', 'infrastructure'],
        response: `<strong style="font-size: 1.15rem; color: #f0a500;">Technical Foundation</strong><br><br>
            <strong>Executive Summary:</strong><br>
            $Ember Token creates a sustainable economy where Platform Operators purchase tokens to fuel campaigns using GPS (Outdoors) and Beacon (Indoors) technology, Advertisers buy tokens for enhanced visibility, and players collect tokens for real-world redemption or cash-out via Coinbase Wallet.<br><br>
            
            <strong>Token Demand Model:</strong><br>
            Unlike traditional gaming tokens, $Ember drives continuous demand through required token purchases by Platform Operators and Advertisers for GPS & Beacon campaign deployment and visibility.<br><br>
            
            <strong>Dual Redemption System:</strong><br>
            Players enjoy flexible rewards: spend tokens at partner Advertisers OR cash out via Coinbase Wallet. Real utility, real choice.<br><br>
            
            <strong>Technical Stack:</strong><br>
            • Polygon ERC-20 token<br>
            • Integrated GPS & Beacon technology<br>
            • Management system for campaign deployment<br>
            • White-label deployment tools<br>
            • Comprehensive SDK for developers<br>
            • Smart contract audits by third-party security firms<br>
            • Multi-sig wallet security<br><br>
            
            <strong>Location Technology:</strong><br>
            • GPS: 5-10 meter accuracy outdoors<br>
            • Beacons: 1-5 meter precision indoors<br>
            • Real-time location verification<br>
            • Full indoor + outdoor coverage<br><br>
            
            <strong>Legal & Financial Oversight:</strong><br>
            • Professional legal and financial oversight<br>
            • KYC/AML for significant purchases<br>
            • Smart contract audits before deployment<br>
            • Regulatory compliance framework<br><br>
            
            📄 <a href="docs/Vault_Phoenix_Whitepaper_2025.pdf" target="_blank" style="color: #f0a500; font-weight: bold;">Download Full Whitepaper (PDF)</a><br>
            📧 <a href="mailto:contact@vaultphoenix.com?subject=Technical Question" style="color: #f0a500; font-weight: bold;">Technical questions: contact@vaultphoenix.com</a>`
    },
    
    // BENEFITS & ROI
    'benefits': {
        keywords: ['benefits', 'roi', 'return on investment', 'revenue', 'earn', 'profit', 'foot traffic', 'engagement', 'measurable'],
        response: `<strong style="font-size: 1.15rem; color: #f0a500;">Benefits & ROI</strong><br><br>
            <strong>For Platform Operators:</strong><br>
            • Scalable location-based marketing with GPS & Beacon precision<br>
            • Real foot traffic to partner locations (outdoor + indoor)<br>
            • Measurable ROI & engagement analytics with location verification<br>
            • Revenue from token sales and campaign fees<br>
            • $10K-$75K/month potential revenue<br><br>
            
            <strong>For Players:</strong><br>
            • Real value you can spend locally<br>
            • Flexible cash-out options via Coinbase Wallet<br>
            • Discover new local businesses (outdoors and indoors)<br>
            • Fun AR gaming experience with GPS & Beacon rewards<br><br>
            
            <strong>For Advertisers:</strong><br>
            • 3-5x increase in foot traffic<br>
            • New customers driven to your exact location (outdoor and indoor)<br>
            • Enhanced visibility through GPS & Beacon token placement<br>
            • Easy settlement in familiar currency (fiat/USDC)<br>
            • Participate in cutting-edge marketing technology<br><br>
            
            <strong>Measurable Results:</strong><br>
            • GPS-verified visits with precise tracking<br>
            • Real-time analytics dashboard<br>
            • Token collection metrics<br>
            • Customer acquisition costs<br>
            • Campaign performance data<br><br>
            
            <strong>Proven Success:</strong><br>
            • 6+ years battle-tested technology<br>
            • 12+ successful games deployed<br>
            • Consistent 3-5x foot traffic increase<br><br>
            
            📧 <a href="mailto:contact@vaultphoenix.com?subject=ROI Analysis Request" style="color: #f0a500; font-weight: bold;">Get ROI analysis: contact@vaultphoenix.com</a>`
    },
    
    // CONTACT & DEMO
    'contact': {
        keywords: ['contact', 'demo', 'email', 'reach', 'get in touch', 'consultation', 'talk', 'discuss', 'meeting'],
        response: `<strong style="font-size: 1.15rem; color: #f0a500;">Get in Touch with Vault Phoenix</strong><br><br>
            📧 <strong>Email:</strong> <a href="mailto:contact@vaultphoenix.com" style="color: #f0a500; font-weight: bold; font-size: 1.1rem;">contact@vaultphoenix.com</a><br><br>
            
            <strong>What We Offer:</strong><br>
            • Free consultation & strategy session<br>
            • Custom demo tailored to your business<br>
            • Detailed ROI analysis & projections<br>
            • Technical integration walkthrough<br>
            • Pricing customization for your needs<br><br>
            
            <strong>Connect on Social Media:</strong><br>
            🐦 <a href="https://x.com/vaultphoenix" target="_blank" style="color: #f0a500;">X (Twitter): @vaultphoenix</a><br>
            📘 <a href="https://www.facebook.com/share/1BH4Hd6iDa/" target="_blank" style="color: #f0a500;">Facebook</a><br>
            💼 <a href="https://www.linkedin.com/company/vaultphoenix/" target="_blank" style="color: #f0a500;">LinkedIn</a><br>
            💬 <a href="https://t.me/+Mq36mmN-9o8wMTJh" target="_blank" style="color: #f0a500;">Telegram Community</a><br><br>
            
            <strong>Response Time:</strong> Within 24 hours<br>
            <strong>Available:</strong> Monday-Friday, 9 AM - 6 PM EST<br><br>
            
            We're excited to help you revolutionize your marketing with Location-Based AR and $Ember tokens! 🔥`
    },
    
    // LEGAL & COMPLIANCE
    'legal': {
        keywords: ['legal', 'compliance', 'regulatory', 'kyc', 'aml', 'security', 'audit', 'safe', 'trust', 'legitimate'],
        response: `<strong style="font-size: 1.15rem; color: #f0a500;">Legal & Regulatory Compliance</strong><br><br>
            <strong>Professional Oversight:</strong><br>
            • Dedicated legal and financial oversight maintaining direct oversight of all token operations<br>
            • Multi-signature treasury management<br>
            • Transaction monitoring and reporting<br>
            • Compliance with FinCEN guidelines<br>
            • Monthly financial audits and reporting<br><br>
            
            <strong>KYC/AML Compliance:</strong><br>
            • Identity verification for purchases over $1,000<br>
            • Source of funds verification<br>
            • Enhanced due diligence procedures<br>
            • Risk assessment protocols<br>
            • Platform Operator due diligence<br>
            • Ongoing compliance monitoring<br><br>
            
            <strong>Smart Contract Security:</strong><br>
            • Third-party security audits by leading blockchain security firms<br>
            • Vulnerability testing and remediation<br>
            • Code review by security experts<br>
            • Formal verification processes<br>
            • Multi-signature wallet security<br>
            • Emergency response procedures<br><br>
            
            <strong>Transparent Reporting:</strong><br>
            • Quarterly financial disclosures<br>
            • Public milestone progress reports<br>
            • Community updates and transparency<br>
            • Real-time metrics dashboard<br>
            • Annual comprehensive reports<br>
            • Independent audit publications<br><br>
            
            <strong>Legal Disclaimer:</strong><br>
            $Ember Tokens are utility tokens designed for AR gaming platform operations. Investment involves risks. Only invest what you can afford to lose. Not available in all jurisdictions. Consult professionals before investing.<br><br>
            
            📄 <a href="docs/Token_Presale_Agreement_Utility_Token.pdf" target="_blank" style="color: #f0a500; font-weight: bold;">Token Presale Agreement (PDF)</a><br>
            📄 <a href="docs/Ember_Token_Disclosures.pdf" target="_blank" style="color: #f0a500; font-weight: bold;">Token Disclosures (PDF)</a><br>
            📧 <a href="mailto:contact@vaultphoenix.com?subject=Legal Question" style="color: #f0a500; font-weight: bold;">Legal questions: contact@vaultphoenix.com</a>`
    },
    
    // USE CASES & APPLICATIONS
    'use_cases': {
        keywords: ['use case', 'use cases', 'applications', 'examples', 'what can i do', 'industries', 'retail', 'tourism', 'gaming', 'education'],
        response: `<strong style="font-size: 1.15rem; color: #f0a500;">Location-Based AR Applications</strong><br><br>
            <strong>Gaming & Entertainment:</strong><br>
            • Scavenger hunts with $Ember token rewards<br>
            • AR treasure hunts at GPS & Beacon locations<br>
            • Multi-location challenges and competitions<br>
            • Event-based AR experiences<br>
            • Interactive storylines across real locations<br><br>
            
            <strong>Retail & Marketing:</strong><br>
            • Attract foot traffic with token-based promotions<br>
            • In-store AR experiences via beacons<br>
            • Customer loyalty rewards with $Ember<br>
            • Interactive product demonstrations<br>
            • Shopping mall-wide campaigns<br><br>
            
            <strong>Tourism & Sightseeing:</strong><br>
            • Landmark exploration with token rewards<br>
            • Historical site AR overlays<br>
            • City-wide tourism campaigns<br>
            • Museum indoor beacon experiences<br>
            • Cultural heritage interactive tours<br><br>
            
            <strong>Education & Training:</strong><br>
            • Interactive location-based lessons<br>
            • Campus-wide educational games<br>
            • Training simulations with token incentives<br>
            • Field trip AR experiences<br>
            • Indoor classroom beacon integration<br><br>
            
            <strong>Navigation & Wayfinding:</strong><br>
            • Guide users to token locations indoors or outdoors<br>
            • Airport/mall navigation with rewards<br>
            • Campus wayfinding systems<br>
            • Event venue guidance<br><br>
            
            <strong>Complete Coverage:</strong><br>
            GPS (Outdoors) + Beacons (Indoors) = Marketing reach everywhere!<br><br>
            
            📧 <a href="mailto:contact@vaultphoenix.com?subject=Use Case Discussion" style="color: #f0a500; font-weight: bold;">Discuss your use case: contact@vaultphoenix.com</a>`
    },
    
    // COMPARISON TO COMPETITORS
    'comparison': {
        keywords: ['compare', 'comparison', 'competitor', 'vs', 'versus', 'better than', 'different', 'alternative', 'pokemon go', 'niantic'],
        response: `<strong style="font-size: 1.15rem; color: #f0a500;">Why Choose Vault Phoenix?</strong><br><br>
            <strong>Unique Advantages:</strong><br>
            • <strong>Full Location Coverage:</strong> GPS (outdoor) + Beacons (indoor) vs. competitors with GPS only<br>
            • <strong>Real Token Value:</strong> $Ember tokens cash out via Coinbase or redeem locally<br>
            • <strong>White-Label Freedom:</strong> Your brand, your app, your revenue (not locked into someone else's platform)<br>
            • <strong>SDK Flexibility:</strong> Integrate into existing apps vs. forcing new app downloads<br>
            • <strong>Web-Based:</strong> No app store approval needed, instant deployment<br>
            • <strong>Battle-Tested:</strong> 6+ years, 12+ games, proven 3-5x foot traffic increase<br>
            • <strong>B2B Focus:</strong> Built for businesses, not just consumer games<br>
            • <strong>Management System:</strong> Complete control over campaigns, analytics, and token distribution<br><br>
            
            <strong>vs. Consumer AR Games (Pokemon Go, etc.):</strong><br>
            • You own the platform and keep 100% revenue<br>
            • Custom branding vs. generic gaming experience<br>
            • Business-focused metrics and ROI tracking<br>
            • Indoor precision with beacon technology<br><br>
            
            <strong>vs. Traditional Marketing:</strong><br>
            • Measurable foot traffic vs. impressions/clicks<br>
            • GPS verification vs. assumed visibility<br>
            • Interactive engagement vs. passive ads<br>
            • Gamification increases participation 3-5x<br><br>
            
            <strong>Deployment Speed:</strong><br>
            • White-Label: 24 hours (competitors: weeks/months)<br>
            • SDK: Early 2026 (ongoing development)<br><br>
            
            📧 <a href="mailto:contact@vaultphoenix.com?subject=Competitive Analysis" style="color: #f0a500; font-weight: bold;">Request competitive analysis: contact@vaultphoenix.com</a>`
    }
};

// Enhanced context for AI tiers
const VAULT_PHOENIX_CONTEXT = `You are Phoenix AI, an expert assistant for Vault Phoenix - a revolutionary AR crypto gaming platform that overlays $Ember tokens onto real-world locations.

CORE TECHNOLOGY:
- Location-Based AR with GPS (outdoors, 5-10m) + Beacons (indoors, 1-5m precision)
- $Ember token economy on Polygon blockchain (ERC-20)
- Three-stakeholder ecosystem: Platform Operators, Players, Advertisers
- Web-based platform (no app store needed)

SOLUTIONS:
1. White-Label AR Gaming App:
   - $499 setup + $149/month
   - 24-hour deployment
   - $100 FREE $Ember tokens included
   - Full GPS & Beacon support, custom branding
   
2. SDK Integration:
   - FREE SDK download
   - $49-$399/month management (based on scale)
   - Launch: Early 2026
   - $100 FREE $Ember tokens included

TOKEN PRESALE:
- Launch: November 1, 2025
- Price: $0.003 per token
- Available: 166.7M tokens (16.67% of 1B supply)
- Hard Cap: $500,000
- Min: $10, Max: $50,000
- Vesting: 10% at TGE, 90% over 3 months

VALUE PROPOSITION:
- Platform Operators earn $10K-$75K/month
- 3-5x foot traffic increase (GPS-verified)
- 6+ years battle-tested, 12+ successful games
- Complete indoor + outdoor coverage
- Measurable ROI with real-time analytics

TEAM:
- Melinda Artzer (CEO) - Military law, operations, marketing
- Andrew Couch (CTO) - Location-based tech, AR/VR, blockchain
- Muhammad Inayat - Systems architecture
- Christopher Sorge (Advisor) - Finance, compliance, cybersecurity

Keep responses concise (2-4 paragraphs), professional, business-focused, and highlight GPS & Beacon technology advantages. Always include contact@vaultphoenix.com for detailed inquiries.`;

// ============================================
// WEBLLM INITIALIZATION (TIER 2)
// ============================================
async function initializeWebLLM() {
    if (isWebLLMLoaded || isWebLLMLoading) return;
    if (typeof window.CreateMLCEngine === 'undefined' || !navigator.gpu) {
        console.log('ℹ️ WebLLM not available (no WebGPU support or library not loaded)');
        return;
    }
    
    isWebLLMLoading = true;
    console.log('🧠 Loading Browser AI (~2GB model)...');
    
    try {
        webLLMEngine = await window.CreateMLCEngine(WEBLLM_MODEL, {
            initProgressCallback: (progress) => {
                console.log(`Browser AI Loading: ${Math.round(progress.progress * 100)}%`);
            }
        });
        
        isWebLLMLoaded = true;
        isWebLLMLoading = false;
        console.log('✅ Browser AI loaded successfully!');
    } catch (error) {
        console.error('❌ Browser AI loading failed:', error);
        isWebLLMLoading = false;
    }
}

// ============================================
// ENHANCED KEYWORD MATCHING (TIER 1)
// ============================================
function findOfflineResponse(userMessage) {
    const messageLower = userMessage.toLowerCase();
    
    // Direct keyword matching
    for (const [category, data] of Object.entries(offlineResponses)) {
        if (data.keywords.some(kw => messageLower.includes(kw.toLowerCase()))) {
            console.log(`⚡ TIER 1 MATCH: "${category}"`);
            return { found: true, response: data.response, category };
        }
    }
    
    // Fuzzy matching for common questions
    if (messageLower.includes('what') && (messageLower.includes('vault phoenix') || messageLower.includes('you'))) {
        return { found: true, response: offlineResponses.location_ar.response, category: 'location_ar' };
    }
    
    if ((messageLower.includes('how') && messageLower.includes('work')) || messageLower.includes('explain')) {
        return { found: true, response: offlineResponses.how_it_works.response, category: 'how_it_works' };
    }
    
    return { found: false };
}

// ============================================
// CHATBOT INITIALIZATION
// ============================================
function initializeChatbot() {
    console.log('🤖 Initializing Enhanced 3-TIER Chatbot...');
    
    const chatbotButton = document.querySelector('.chatbot-button-container');
    const chatbotWindow = document.querySelector('.chatbot-window');
    const chatbotClose = document.querySelector('.chatbot-close');
    const chatbotInput = document.querySelector('.chatbot-input');
    const chatbotSend = document.querySelector('.chatbot-send');
    const chatbotBody = document.querySelector('.chatbot-body');
    
    if (!chatbotButton || !chatbotWindow) {
        console.warn('🤖 Chatbot elements not found in DOM');
        return;
    }
    
    // Open chatbot
    chatbotButton.addEventListener('click', () => {
        chatbotWindow.classList.toggle('active');
        if (chatbotWindow.classList.contains('active') && chatbotBody.children.length === 0) {
            addWelcomeMessage();
            // Start loading WebLLM in background after welcome
            if (!isWebLLMLoaded && !isWebLLMLoading && typeof window.CreateMLCEngine !== 'undefined') {
                setTimeout(() => initializeWebLLM(), 2000);
            }
        }
    });
    
    // Close chatbot
    if (chatbotClose) {
        chatbotClose.addEventListener('click', () => {
            chatbotWindow.classList.remove('active');
        });
    }
    
    // Send message
    if (chatbotSend) {
        chatbotSend.addEventListener('click', sendMessage);
    }
    
    // Enter key to send
    if (chatbotInput) {
        chatbotInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                sendMessage();
            }
        });
    }
    
    console.log('🤖 Enhanced 3-TIER Chatbot initialized successfully!');
}

// ============================================
// WELCOME MESSAGE WITH FEATURED QUESTION
// ============================================
function addWelcomeMessage() {
    const welcomeMsg = `
        <div class="chat-message assistant-message">
            <div class="message-content">
                <div class="message-avatar">
                    <img src="images/VPLogoNoText.PNG" alt="Vault Phoenix">
                </div>
                <div class="message-text">
                    <strong style="font-size: 1.15rem; color: #f0a500;">Welcome to Vault Phoenix! 🔥</strong><br><br>
                    I'm Phoenix AI, your expert guide to revolutionizing marketing with Location-Based AR and $Ember tokens.<br><br>
                    
                    <div style="background: linear-gradient(135deg, rgba(215, 51, 39, 0.15), rgba(251, 146, 60, 0.1)); border: 2px solid rgba(215, 51, 39, 0.3); border-radius: 15px; padding: 18px; margin: 15px 0;">
                        <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 12px;">
                            <img src="images/VPEmberCoin.PNG" alt="Featured" style="width: 32px; height: 32px; filter: drop-shadow(0 2px 6px rgba(240, 165, 0, 0.4));">
                            <strong style="color: #f0a500; font-size: 1.05rem;">Featured Question</strong>
                        </div>
                        <button class="featured-question-btn" onclick="handleFeaturedQuestion()" style="width: 100%; background: linear-gradient(135deg, rgba(215, 51, 39, 0.2), rgba(251, 146, 60, 0.15)); border: 2px solid rgba(215, 51, 39, 0.4); border-radius: 12px; padding: 14px; color: rgba(255, 255, 255, 0.95); font-weight: 600; font-size: 0.95rem; cursor: pointer; transition: all 0.3s ease; text-align: left; line-height: 1.5;">
                            How can Location-Based AR with $Ember tokens transform my business? 🚀
                        </button>
                    </div>
                    
                    <div style="margin-top: 18px;">
                        <p style="margin-bottom: 10px;"><strong style="color: #f0a500;">Popular Topics:</strong></p>
                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px; font-size: 0.9rem;">
                            <div style="background: rgba(0, 0, 0, 0.2); padding: 8px 12px; border-radius: 8px; border: 1px solid rgba(240, 165, 0, 0.2);">💰 Pricing & Solutions</div>
                            <div style="background: rgba(0, 0, 0, 0.2); padding: 8px 12px; border-radius: 8px; border: 1px solid rgba(240, 165, 0, 0.2);">🪙 $Ember Presale</div>
                            <div style="background: rgba(0, 0, 0, 0.2); padding: 8px 12px; border-radius: 8px; border: 1px solid rgba(240, 165, 0, 0.2);">📍 GPS & Beacons</div>
                            <div style="background: rgba(0, 0, 0, 0.2); padding: 8px 12px; border-radius: 8px; border: 1px solid rgba(240, 165, 0, 0.2);">📈 ROI & Revenue</div>
                            <div style="background: rgba(0, 0, 0, 0.2); padding: 8px 12px; border-radius: 8px; border: 1px solid rgba(240, 165, 0, 0.2);">🎮 Use Cases</div>
                            <div style="background: rgba(0, 0, 0, 0.2); padding: 8px 12px; border-radius: 8px; border: 1px solid rgba(240, 165, 0, 0.2);">👥 Team & Roadmap</div>
                        </div>
                    </div>
                    
                    <div style="margin-top: 18px; padding: 12px; background: rgba(0, 0, 0, 0.3); border-radius: 10px; font-size: 0.85rem; text-align: center; color: rgba(255, 255, 255, 0.8);">
                        <strong style="color: #f0a500;">💬 Ask me anything!</strong><br>
                        Powered by intelligent 3-tier AI system with extensive offline knowledge.
                    </div>
                </div>
            </div>
        </div>
    `;
    
    const chatbotBody = document.querySelector('.chatbot-body');
    if (chatbotBody) {
        chatbotBody.innerHTML = welcomeMsg;
    }
}

// ============================================
// FEATURED QUESTION HANDLER
// ============================================
window.handleFeaturedQuestion = function() {
    const userMessage = "Tell me about Location-Based AR with $Ember tokens and how it can transform my business";
    addMessage('user', userMessage);
    showTypingIndicator();
    
    setTimeout(() => {
        removeTypingIndicator();
        const response = offlineResponses.location_ar.response;
        addMessage('assistant', `<div class="response-badge tier-1">⚡ INSTANT ANSWER</div>` + response);
        conversationHistory.push(
            { role: 'user', content: userMessage },
            { role: 'assistant', content: response.replace(/<[^>]*>/g, '') }
        );
    }, 800);
};

// ============================================
// SEND MESSAGE (3-TIER SYSTEM)
// ============================================
async function sendMessage() {
    const chatbotInput = document.querySelector('.chatbot-input');
    const chatbotSend = document.querySelector('.chatbot-send');
    
    if (!chatbotInput) return;
    const message = chatbotInput.value.trim();
    if (!message || isTyping) return;
    
    addMessage('user', message);
    chatbotInput.value = '';
    chatbotInput.disabled = true;
    chatbotSend.disabled = true;
    isTyping = true;
    showTypingIndicator();
    
    // TIER 1: Enhanced offline pre-written responses
    const offlineMatch = findOfflineResponse(message);
    if (offlineMatch.found) {
        console.log(`⚡ TIER 1: Instant response for "${offlineMatch.category}"`);
        setTimeout(() => {
            removeTypingIndicator();
            addMessage('assistant', `<div class="response-badge tier-1">⚡ INSTANT ANSWER</div>` + offlineMatch.response);
            conversationHistory.push(
                { role: 'user', content: message },
                { role: 'assistant', content: offlineMatch.response.replace(/<[^>]*>/g, '') }
            );
            resetInput(chatbotInput, chatbotSend);
        }, 600);
        return;
    }
    
    // TIER 2: Browser AI (WebLLM)
    if (isWebLLMLoaded && webLLMEngine) {
        console.log('🧠 TIER 2: Using Browser AI');
        try {
            const response = await webLLMEngine.chat.completions.create({
                messages: [
                    { role: 'system', content: VAULT_PHOENIX_CONTEXT },
                    ...conversationHistory.slice(-6),
                    { role: 'user', content: message }
                ],
                temperature: 0.7,
                max_tokens: 512
            });
            
            removeTypingIndicator();
            const aiResponse = response.choices[0].message.content;
            addMessage('assistant', `<div class="response-badge tier-2">🧠 SMART AI</div>` + aiResponse);
            conversationHistory.push(
                { role: 'user', content: message },
                { role: 'assistant', content: aiResponse }
            );
            resetInput(chatbotInput, chatbotSend);
            return;
        } catch (error) {
            console.error('Browser AI error:', error);
            // Fall through to Tier 3
        }
    }
    
    // TIER 3: Cloud AI (Claude)
    console.log('☁️ TIER 3: Using Cloud AI');
    
    // Check if API key is configured
    if (!CLAUDE_API_KEY || CLAUDE_API_KEY === 'YOUR_CLAUDE_API_KEY_HERE') {
        removeTypingIndicator();
        addMessage('assistant', `<div class="response-badge tier-3">⚠️ CONFIGURATION NEEDED</div>
            Cloud AI is not configured. Please add your Claude API key to enable advanced responses.<br><br>
            Get your API key at: <a href="https://console.anthropic.com/" target="_blank" style="color: #f0a500;">console.anthropic.com</a><br><br>
            💡 You can still ask about: pricing, presale, location AR, benefits, team, roadmap, technical details, and more!`);
        resetInput(chatbotInput, chatbotSend);
        return;
    }
    
    try {
        const response = await fetch(CLAUDE_API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': CLAUDE_API_KEY,
                'anthropic-version': '2023-06-01'
            },
            body: JSON.stringify({
                model: CLAUDE_MODEL,
                max_tokens: 1024,
                system: VAULT_PHOENIX_CONTEXT,
                messages: [...conversationHistory.slice(-8), { role: 'user', content: message }]
            })
        });
        
        if (!response.ok) {
            throw new Error(`API Error: ${response.status} ${response.statusText}`);
        }
        
        const data = await response.json();
        removeTypingIndicator();
        const assistantMessage = data.content[0].text;
        addMessage('assistant', `<div class="response-badge tier-3">☁️ CLOUD AI</div>` + assistantMessage);
        conversationHistory.push(
            { role: 'user', content: message },
            { role: 'assistant', content: assistantMessage }
        );
    } catch (error) {
        console.error('Cloud AI error:', error);
        removeTypingIndicator();
        addMessage('assistant', `<div class="response-badge tier-3">❌ ERROR</div>
            Unable to connect to Cloud AI. Try asking about:<br>
            • Pricing & solutions<br>
            • $Ember presale details<br>
            • Location-Based AR technology<br>
            • ROI & benefits<br>
            • Team & roadmap<br><br>
            📧 For detailed questions: <a href="mailto:contact@vaultphoenix.com" style="color: #f0a500;">contact@vaultphoenix.com</a>`);
    }
    
    resetInput(chatbotInput, chatbotSend);
}

function resetInput(input, button) {
    input.disabled = false;
    button.disabled = false;
    isTyping = false;
}

// ============================================
// UI HELPER FUNCTIONS
// ============================================
function addMessage(role, content) {
    const chatbotBody = document.querySelector('.chatbot-body');
    if (!chatbotBody) return;
    
    const messageDiv = document.createElement('div');
    messageDiv.className = `chat-message ${role}-message`;
    
    if (role === 'user') {
        messageDiv.innerHTML = `
            <div class="message-content">
                <div class="message-text">${escapeHtml(content)}</div>
            </div>`;
    } else {
        messageDiv.innerHTML = `
            <div class="message-content">
                <div class="message-avatar">
                    <img src="images/VPLogoNoText.PNG" alt="Phoenix AI">
                </div>
                <div class="message-text">${formatMessage(content)}</div>
            </div>`;
    }
    
    chatbotBody.appendChild(messageDiv);
    chatbotBody.scrollTop = chatbotBody.scrollHeight;
}

function showTypingIndicator() {
    const chatbotBody = document.querySelector('.chatbot-body');
    if (!chatbotBody) return;
    
    const typingDiv = document.createElement('div');
    typingDiv.className = 'chat-message assistant-message typing-indicator';
    typingDiv.innerHTML = `
        <div class="message-content">
            <div class="message-avatar">
                <img src="images/VPLogoNoText.PNG" alt="Phoenix AI">
            </div>
            <div class="typing-dots">
                <span></span><span></span><span></span>
            </div>
        </div>`;
    
    chatbotBody.appendChild(typingDiv);
    chatbotBody.scrollTop = chatbotBody.scrollHeight;
}

function removeTypingIndicator() {
    const indicator = document.querySelector('.typing-indicator');
    if (indicator) {
        indicator.remove();
    }
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function formatMessage(text) {
    // If already contains HTML, return as-is
    if (text.includes('<')) return text;
    
    // Otherwise, escape and format
    let formatted = escapeHtml(text);
    formatted = formatted.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    formatted = formatted.replace(/\n/g, '<br>');
    return formatted;
}

// ============================================
// TIER BADGE STYLES
// ============================================
const tierBadgeStyle = document.createElement('style');
tierBadgeStyle.textContent = `
    .response-badge {
        display: inline-block;
        padding: 4px 10px;
        border-radius: 12px;
        font-size: 0.75rem;
        margin-bottom: 8px;
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 0.5px;
    }
    .tier-1 { 
        background: rgba(34, 197, 94, 0.15); 
        color: #22c55e; 
        border: 1px solid rgba(34, 197, 94, 0.3);
    }
    .tier-2 { 
        background: rgba(59, 130, 246, 0.15); 
        color: #3b82f6; 
        border: 1px solid rgba(59, 130, 246, 0.3);
    }
    .tier-3 { 
        background: rgba(139, 92, 246, 0.15); 
        color: #a78bfa; 
        border: 1px solid rgba(139, 92, 246, 0.3);
    }
    .featured-question-btn:hover {
        background: linear-gradient(135deg, rgba(215, 51, 39, 0.3), rgba(251, 146, 60, 0.2)) !important;
        border-color: rgba(215, 51, 39, 0.6) !important;
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(215, 51, 39, 0.3);
    }
    .golden-highlight {
        color: #f0a500;
        font-weight: 600;
    }
`;
document.head.appendChild(tierBadgeStyle);

// ============================================
// PAGE INITIALIZATION
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    console.log('🔥🪙 Vault Phoenix Enhanced Chatbot Initializing...');
    
    // Add loaded class for fade-in effect
    document.body.classList.add('loaded');
    
    // Initialize chatbot
    initializeChatbot();
    
    console.log('🤖⚡🧠 Enhanced 3-TIER Chatbot Ready!');
    console.log('📊 Offline Knowledge Base: 11 comprehensive categories');
    console.log('🧠 Browser AI: Available if WebGPU supported');
    console.log('☁️ Cloud AI: Fallback for complex queries');
});

// Console branding
console.log('%c🔥🪙 VAULT PHOENIX', 'color: #d73327; font-size: 24px; font-weight: bold;');
console.log('%c🤖⚡🧠 Enhanced 3-TIER Hybrid Chatbot', 'color: #fb923c; font-size: 16px; font-weight: bold;');
console.log('%c📧 contact@vaultphoenix.com', 'color: #374151; font-size: 14px;');
console.log('%c✨ New: Comprehensive offline knowledge base with 11 categories', 'color: #22c55e; font-size: 12px;');
