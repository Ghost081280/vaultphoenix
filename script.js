// Vault Phoenix - Interactive JavaScript
// HYBRID CHATBOT: Offline pre-written responses + Live AI fallback
// Phoenix Rising from Digital Ashes - Crypto Gaming Edition
// UPDATED: Enhanced AI Agent with Location-Based AR + $Ember Token Focus
// HYBRID MODE: Fast offline responses for common questions, AI for everything else
// FIXED: Chatbot with proper message alignment and scroll prevention
// FIXED: Removed auto-focus to prevent keyboard popup on mobile
// CLEANED: Removed duplicate code now in shared-script.js
// User messages: NO avatar, pushed to far right
// Claude messages: VP logo avatar on left
// Background scroll prevented with overscroll-behavior
// PRODUCTION READY: Faster scroll timing for smoother animations
// COUNTDOWN: Now handled by shared-script.js universal timer

// ============================================
// CLAUDE API CONFIGURATION
// ============================================
const CLAUDE_API_KEY = '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'; // ← Replace with your actual API key
const CLAUDE_API_URL = 'https://api.anthropic.com/v1/messages';
const CLAUDE_MODEL = 'claude-sonnet-4-20250514';

// Chat state
let conversationHistory = [];
let isTyping = false;

// ============================================
// OFFLINE KNOWLEDGE BASE - PRE-WRITTEN RESPONSES
// ============================================
const offlineResponses = {
    // Pricing questions
    'pricing': {
        keywords: ['price', 'cost', 'how much', 'pricing', 'payment', 'pay', 'expensive'],
        response: `<strong>Vault Phoenix Pricing</strong><br><br>
            <strong>White-Label Solution:</strong><br>
            • $499 one-time setup fee<br>
            • $149/month managed hosting<br>
            • Includes $100 FREE $Ember tokens<br>
            • 24-hour deployment<br>
            • Complete management system<br><br>
            
            <strong>SDK Integration:</strong><br>
            • FREE open-source SDK on GitHub<br>
            • Management System Pricing:<br>
            &nbsp;&nbsp;- Starter: $49/month<br>
            &nbsp;&nbsp;- Growth: $149/month<br>
            &nbsp;&nbsp;- Enterprise: $399/month<br>
            • Includes $100 FREE $Ember tokens<br>
            • Available early 2026<br><br>
            
            📧 <a href="mailto:contact@vaultphoenix.com?subject=Pricing Inquiry" style="color: #f0a500;">Get a custom quote: contact@vaultphoenix.com</a>`
    },
    
    // Token presale questions
    'presale': {
        keywords: ['presale', 'token sale', 'buy tokens', 'ember token', '$ember', 'ico', 'token launch'],
        response: `<strong>$Ember Token Presale</strong><br><br>
            <strong>Launch Date:</strong> November 1, 2025<br>
            <strong>Token Price:</strong> $0.003 per token<br>
            <strong>Available Tokens:</strong> 166.7M tokens<br>
            <strong>Hard Cap:</strong> $500,000<br><br>
            
            <strong>Token Allocation:</strong><br>
            • 50% Public Presale (83.35M tokens)<br>
            • 20% Ecosystem Development (33.34M tokens)<br>
            • 15% Team & Advisors (25M tokens)<br>
            • 10% Marketing (16.67M tokens)<br>
            • 5% Liquidity Pool (8.34M tokens)<br><br>
            
            <strong>Benefits:</strong> No lock-up period for presale participants!<br><br>
            
            📧 <a href="mailto:contact@vaultphoenix.com?subject=Token Presale Inquiry" style="color: #f0a500;">Join the presale: contact@vaultphoenix.com</a>`
    },
    
    // Technology questions
    'technology': {
        keywords: ['how does it work', 'technology', 'gps', 'beacon', 'ar', 'augmented reality', 'tech stack'],
        response: `<strong>Vault Phoenix Technology</strong><br><br>
            <strong>Location Technology:</strong><br>
            • <strong>GPS:</strong> Outdoor precision (5-10m radius)<br>
            • <strong>Beacons:</strong> Indoor precision (1-5m radius, centimeter-level accuracy)<br>
            • Combined coverage = 100% indoor + outdoor accuracy<br><br>
            
            <strong>Platform Features:</strong><br>
            • Web-based AR (no app store needed)<br>
            • Cross-platform (iOS, Android, Desktop)<br>
            • Real-time analytics dashboard<br>
            • Crypto wallet integration<br>
            • $Ember token rewards system<br><br>
            
            <strong>Battle-Tested:</strong><br>
            • 6+ years of development<br>
            • 12+ successful location-based AR games deployed<br>
            • Now enhanced with cryptocurrency rewards<br><br>
            
            Want technical details? <a href="mailto:contact@vaultphoenix.com?subject=Technical Inquiry" style="color: #f0a500;">Contact our team</a>`
    },
    
    // Revenue/ROI questions
    'revenue': {
        keywords: ['revenue', 'roi', 'return', 'profit', 'earn', 'make money', 'income'],
        response: `<strong>Revenue Opportunities</strong><br><br>
            <strong>Location Partner Revenue:</strong><br>
            • Premium rates: <span class="golden-highlight">$10K-$75K per month</span><br>
            • Revenue depends on industry and scale<br>
            • Location partners pay for crypto coin placement<br><br>
            
            <strong>Proven Results:</strong><br>
            • 3-5x increase in foot traffic during campaigns<br>
            • GPS-verified visits for measurable ROI<br>
            • Real-time analytics and engagement tracking<br><br>
            
            <strong>Industries Served:</strong><br>
            • Sports venues & stadiums<br>
            • Radio stations & media<br>
            • Tourism & attractions<br>
            • Retail & entertainment<br>
            • Restaurants & culinary<br>
            • Healthcare & education<br><br>
            
            📧 <a href="mailto:contact@vaultphoenix.com?subject=Revenue Inquiry" style="color: #f0a500;">Discuss your revenue potential: contact@vaultphoenix.com</a>`
    },
    
    // Use case questions
    'use-cases': {
        keywords: ['use case', 'example', 'industry', 'application', 'what can', 'stadium', 'restaurant', 'retail'],
        response: `<strong>Location-Based AR Use Cases</strong><br><br>
            <strong>🏟️ Stadium Crypto Hunt</strong><br>
            GPS for parking lots + Beacons for concession stands<br><br>
            
            <strong>📻 Morning Show Treasure Hunt</strong><br>
            City-wide campaigns driving listeners to sponsor locations<br><br>
            
            <strong>🏛️ Historic Downtown Quest</strong><br>
            Tourism with $Ember token rewards at landmarks<br><br>
            
            <strong>🛍️ Mall District Challenge</strong><br>
            Retail foot traffic with beacon-enabled stores<br><br>
            
            <strong>🎵 Concert Crypto Series</strong><br>
            Venue + surrounding businesses engagement<br><br>
            
            <strong>🍕 Foodie Crypto Trail</strong><br>
            Restaurant discovery with token collection<br><br>
            
            Want a custom use case for your industry?<br>
            📧 <a href="mailto:contact@vaultphoenix.com?subject=Use Case Inquiry" style="color: #f0a500;">Contact us: contact@vaultphoenix.com</a>`
    },
    
    // Contact/demo questions
    'contact': {
        keywords: ['contact', 'demo', 'call', 'meeting', 'schedule', 'talk', 'speak', 'reach'],
        response: `<strong>Get In Touch With Vault Phoenix</strong><br><br>
            We'd love to show you how Location-Based AR with $Ember tokens can transform your business!<br><br>
            
            <strong>Contact Information:</strong><br>
            📧 Email: <a href="mailto:contact@vaultphoenix.com" style="color: #f0a500; font-weight: bold;">contact@vaultphoenix.com</a><br><br>
            
            <strong>What to expect:</strong><br>
            • Free consultation<br>
            • Custom demo for your industry<br>
            • ROI analysis<br>
            • Technical implementation discussion<br><br>
            
            <strong>Response time:</strong> Within 24 hours<br><br>
            
            Ready to revolutionize your marketing?<br>
            <a href="mailto:contact@vaultphoenix.com?subject=Demo Request&body=I'm interested in learning more about Vault Phoenix Location-Based AR with $Ember tokens." style="color: #f0a500; font-weight: bold;">Request a demo now!</a>`
    },
    
    // Greeting responses
    'greeting': {
        keywords: ['hello', 'hi', 'hey', 'good morning', 'good afternoon', 'good evening', 'greetings'],
        response: `<strong>Welcome to Vault Phoenix!</strong><br><br>
            I'm here to help you revolutionize your marketing with Location-Based AR and $Ember tokens!<br><br>
            
            <strong>Quick questions I can answer:</strong><br>
            • Pricing and packages<br>
            • $Ember token presale details<br>
            • How the technology works<br>
            • Revenue opportunities<br>
            • Industry-specific use cases<br>
            • Getting started / demos<br><br>
            
            What would you like to know? 🚀`
    }
};

// ============================================
// SMART KEYWORD MATCHING
// ============================================
function findOfflineResponse(userMessage) {
    const messageLower = userMessage.toLowerCase();
    
    // Check each category for keyword matches
    for (const [category, data] of Object.entries(offlineResponses)) {
        const matchCount = data.keywords.filter(keyword => 
            messageLower.includes(keyword.toLowerCase())
        ).length;
        
        // If we find 1 or more matching keywords, return this response
        if (matchCount > 0) {
            console.log(`🔥 OFFLINE MATCH: Found "${category}" response (${matchCount} keywords matched)`);
            return {
                found: true,
                category: category,
                response: data.response
            };
        }
    }
    
    return { found: false };
}

// Enhanced System Prompt for Vault Phoenix - UPDATED WITH ACCURATE INFO
const SYSTEM_PROMPT = `You are an AI assistant for Vault Phoenix, a revolutionary AR crypto gaming platform that combines GPS & Beacon location technology with blockchain rewards for location-based marketing campaigns.

Key Information about Vault Phoenix:

CORE OFFERING:
- Location-Based AR platform that overlays $Ember tokens onto real-world locations
- GPS technology for outdoor precision (5-10m radius)
- Beacon technology for indoor precision (1-5m radius, centimeter-level accuracy)
- Players collect $Ember tokens at sponsored business locations
- Creates guaranteed foot traffic and measurable ROI

TWO MAIN SOLUTIONS:
1. White-Label Web App Solution:
   - Starting at $499 one-time setup + $149/mo managed hosting
   - Fully branded AR crypto gaming web application
   - Includes $100 FREE $Ember tokens when service activated
   - Complete management system with coin control
   - 24-hour deployment
   - No app store required - runs in mobile browsers
   - Cross-platform (iOS, Android, Desktop)

2. SDK Integration Platform:
   - Free open-source SDK on GitHub
   - Management system from $49/mo (Starter), $149/mo (Growth), $399/mo (Enterprise)
   - Available early 2026
   - Includes $100 FREE $Ember tokens when service activated
   - For developers who want to integrate AR crypto gaming into existing apps

TECHNOLOGY:
- GPS + Beacon combined coverage = 100% location accuracy indoor & outdoor
- Web-based AR (no app store needed, instant updates, universal access)
- Real-time analytics dashboard
- Crypto wallet integration
- $Ember token rewards system

REVENUE MODEL:
- Location partners pay premium rates for crypto coin placement
- Proven revenue: $10K-$75K per month depending on industry and scale
- Industries: Sports venues, radio stations, tourism, retail, entertainment, culinary, healthcare, education, automotive

BATTLE-TESTED:
- 6+ years of development
- 12+ successful location-based AR games deployed
- Now enhanced with cryptocurrency rewards

$EMBER TOKEN PRESALE:
- Launching November 1, 2025
- 166.7M tokens available at $0.003
- $500K hard cap
- 50% public presale, 20% ecosystem, 15% team, 10% marketing, 5% liquidity

USE CASES:
- Stadium Crypto Hunt (GPS parking + Beacon concessions)
- Morning Show Treasure Hunt (city-wide sponsor locations)
- Historic Downtown Quest (tourism with token rewards)
- Mall District Challenge (retail foot traffic)
- Concert Crypto Series (venue + surrounding businesses)
- Foodie Crypto Trail (restaurant discovery)

Your role is to:
- Explain how Location-Based AR with $Ember tokens drives business results
- Provide specific examples of GPS + Beacon implementation
- Discuss revenue opportunities and ROI
- Guide users toward appropriate solution (White-Label or SDK)
- Answer questions about $Ember token presale
- Emphasize the battle-tested technology (6+ years, 12+ games)
- Highlight the no-app-store advantage of web-based AR
- Always mention $100 FREE $Ember tokens included with service activation

Keep responses professional, enthusiastic, and focused on business value. Use specific numbers and examples. If asked about implementation details beyond your knowledge, recommend contacting contact@vaultphoenix.com for technical consultation.`;

// ============================================
// INITIALIZE CHATBOT - FIXED: No Auto-Focus
// ============================================
function initializeChatbot() {
    console.log('🤖 Initializing HYBRID Chatbot (Offline + AI)...');
    
    const chatbotButton = document.querySelector('.chatbot-button-container');
    const chatbotWindow = document.querySelector('.chatbot-window');
    const chatbotClose = document.querySelector('.chatbot-close');
    const chatbotInput = document.querySelector('.chatbot-input');
    const chatbotSend = document.querySelector('.chatbot-send');
    const chatbotBody = document.querySelector('.chatbot-body');
    
    if (!chatbotButton || !chatbotWindow) {
        console.warn('🤖 Chatbot elements not found');
        return;
    }
    
    console.log('🤖 Chatbot elements found successfully');
    
    // Toggle chatbot window
    chatbotButton.addEventListener('click', () => {
        console.log('🤖 Chatbot button clicked');
        chatbotWindow.classList.toggle('active');
        if (chatbotWindow.classList.contains('active')) {
            // FIXED: Removed chatbotInput.focus() to prevent keyboard popup on mobile
            // Add welcome message if first time opening
            if (chatbotBody.children.length === 0) {
                addWelcomeMessage();
            }
        }
    });
    
    // Close chatbot
    if (chatbotClose) {
        chatbotClose.addEventListener('click', () => {
            console.log('🤖 Chatbot closed');
            chatbotWindow.classList.remove('active');
        });
    }
    
    // Send message on button click
    if (chatbotSend) {
        chatbotSend.addEventListener('click', sendMessage);
    }
    
    // Send message on Enter key
    if (chatbotInput) {
        chatbotInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                sendMessage();
            }
        });
    }
    
    console.log('🤖 HYBRID Chatbot initialized successfully!');
    console.log('⚡ Offline responses available for common questions');
    console.log('🌐 AI fallback ready for complex queries');
}

// ============================================
// WELCOME MESSAGE - ENHANCED WITH FEATURED AR QUESTION
// ============================================
function addWelcomeMessage() {
    const welcomeMsg = `
        <div class="chat-message assistant-message">
            <div class="message-content">
                <div class="message-avatar">
                    <img src="images/VPLogoNoText.PNG" alt="Vault Phoenix">
                </div>
                <div class="message-text">
                    <strong>Welcome to Vault Phoenix!</strong><br><br>
                    I'm here to help you revolutionize your marketing with AR crypto gaming.
                    
                    <div class="ai-featured-question">
                        <div class="featured-badge">
                            <img src="images/VPEmberCoin.PNG" alt="Featured" class="featured-badge-icon">
                            <span>Featured</span>
                        </div>
                        <button class="featured-question-btn" onclick="handleFeaturedQuestion()">
                            Do you want to learn how Location-Based Augmented Reality with $Ember tokens can transform your business?
                        </button>
                    </div>
                    
                    <div class="ai-other-questions">
                        <p><strong>Or ask me about:</strong></p>
                        <ul>
                            <li>White-label AR crypto gaming solutions ($499 + $149/mo)</li>
                            <li>GPS & Beacon location technology (indoor + outdoor)</li>
                            <li>$Ember token presale (Nov 1, 2025 launch)</li>
                            <li>Revenue opportunities ($10K-$75K/month)</li>
                            <li>Industry-specific use cases and ROI examples</li>
                        </ul>
                    </div>
                    <div style="margin-top: 15px; padding: 10px; background: rgba(240, 165, 0, 0.1); border-left: 3px solid #f0a500; border-radius: 5px; font-size: 0.9rem;">
                        ⚡ <strong>Hybrid Mode:</strong> Common questions get instant responses (offline). Complex questions use AI (online).
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
// HANDLE FEATURED QUESTION - COMPREHENSIVE AR CONTENT
// ============================================
window.handleFeaturedQuestion = function() {
    const userMessage = "Tell me about Location-Based AR with $Ember tokens for my business";
    
    // Add user message
    addMessage('user', userMessage);
    
    // Show typing indicator
    showTypingIndicator();
    
    // Simulate processing time for better UX
    setTimeout(() => {
        removeTypingIndicator();
        
        // Add comprehensive AR content
        const arContent = `
            <strong style="font-size: 1.15rem; color: #f0a500;">Location-Based AR — $Ember Token Rewards in the Real World</strong><br><br>
            
            <strong>What is Location-Based AR?</strong><br>
            Vault Phoenix Location-Based AR overlays <span class="golden-highlight">$Ember tokens</span> onto real-world locations through a web app or SDK for phones. Using <strong>GPS outdoors</strong> and <span class="golden-highlight">beacon technology indoors</span>, our platform delivers immersive experiences that encourage players to visit specific locations to collect $Ember tokens.<br><br>
            
            <strong>How It Works</strong><br>
            <ul style="margin: 10px 0; padding-left: 20px; line-height: 1.6;">
                <li><strong>Precise Location Detection:</strong> GPS outdoors (5-10m radius) or beacons indoors (1-5m precision) for centimeter-level accuracy.</li>
                <li><strong>$Ember Token Placement:</strong> Players see $Ember tokens overlaid at real-world points of interest and can interact with them directly in the app or via SDK integration.</li>
                <li><strong>Contextual Interaction:</strong> Users tap or swipe to collect $Ember tokens, unlock rewards, and engage with branded experiences.</li>
            </ul><br>
            
            <strong>Why Beacons Matter</strong><br>
            Beacons enhance indoor experiences by sending precise signals so AR content and $Ember tokens appear exactly where intended — in stores, museums, malls, or event venues. Combined with GPS, this provides <span class="golden-highlight">full indoor + outdoor coverage</span> for token collection. No GPS signal inside? No problem — beacons work perfectly indoors!<br><br>
            
            <strong>Applications That Drive Engagement</strong><br>
            <ul style="margin: 10px 0; padding-left: 20px; line-height: 1.6;">
                <li><strong>Gaming & Entertainment:</strong> Scavenger hunts and challenges that reward $Ember token collection.</li>
                <li><strong>Retail & Marketing:</strong> Attract foot traffic with token-based promotions and interactive experiences.</li>
                <li><strong>Tourism & Sightseeing:</strong> Encourage exploration of landmarks and points of interest with token rewards.</li>
                <li><strong>Sports & Venues:</strong> Stadium experiences with GPS parking lots and beacon-enabled concession stands.</li>
                <li><strong>Radio & Media:</strong> City-wide treasure hunts driving listeners to sponsor locations.</li>
                <li><strong>Restaurants & Culinary:</strong> Foodie trails with tokens at participating restaurants.</li>
            </ul><br>
            
            <strong>Benefits for Your Business</strong><br>
            <ul style="margin: 10px 0; padding-left: 20px; line-height: 1.6;">
                <li><strong>Enhanced Engagement:</strong> Users actively seek out $Ember tokens, increasing foot traffic by 3-5x during campaigns.</li>
                <li><strong>Measurable ROI:</strong> Track interactions, token collection, and engagement in real time with GPS-verified visits.</li>
                <li><strong>Seamless Integration:</strong> Deploy via <span class="golden-highlight">no-code web app builder</span> (24hr launch) or embed the <span class="golden-highlight">SDK</span> in your app.</li>
                <li><strong>Indoor + Outdoor Coverage:</strong> GPS + beacons for end-to-end token experiences — no coverage gaps.</li>
                <li><strong>Revenue Generation:</strong> Location partners pay premium rates (<span class="golden-highlight">$10K-$75K/month</span>) for crypto coin placement.</li>
            </ul><br>
            
            <strong>Why Choose Vault Phoenix</strong><br>
            Transform ordinary locations into <span class="golden-highlight">interactive $Ember token destinations</span>. Vault Phoenix enables AR campaigns that drive engagement, loyalty, and revenue, while providing actionable insights and seamless integration into web or native apps.<br><br>
            
            <strong style="color: #f0a500;">Battle-Tested Technology:</strong> <span class="golden-highlight">6+ years</span> of development and <span class="golden-highlight">12+ successful location-based AR games</span> have refined our platform. Now enhanced with cryptocurrency rewards for unprecedented engagement.<br><br>
            
            <strong>Get Started Today</strong><br>
            <ul style="margin: 10px 0; padding-left: 20px; line-height: 1.6;">
                <li><strong>White-Label Solution:</strong> $499 setup + $149/mo hosting • 24hr deployment • Web-based (no app store) • <span class="golden-highlight">$100 FREE $Ember tokens included</span></li>
                <li><strong>SDK Integration:</strong> Free SDK on GitHub • Management from $49/mo • Available early 2026 • <span class="golden-highlight">$100 FREE $Ember tokens included</span></li>
            </ul><br>
            
            <strong style="font-size: 1.1rem; color: #f0a500;">Ready to Deploy?</strong><br>
            Launch AR campaigns anywhere — indoors or outdoors — powered by GPS and beacons. Drive real-world engagement with $Ember token rewards!<br><br>
            
            📧 <a href="mailto:contact@vaultphoenix.com?subject=Location-Based AR Inquiry&body=I'm interested in learning more about Vault Phoenix Location-Based AR with $Ember tokens." style="color: #f0a500; font-weight: bold; text-decoration: underline;">Contact us today: contact@vaultphoenix.com</a>
        `;
        
        addMessage('assistant', arContent);
        
        // Update conversation history for continuity
        conversationHistory.push(
            { role: 'user', content: userMessage },
            { role: 'assistant', content: arContent.replace(/<[^>]*>/g, '').replace(/&nbsp;/g, ' ') } // Strip HTML for API
        );
    }, 1500);
};

// ============================================
// SEND MESSAGE - HYBRID MODE (OFFLINE FIRST, THEN AI)
// ============================================
async function sendMessage() {
    const chatbotInput = document.querySelector('.chatbot-input');
    const chatbotBody = document.querySelector('.chatbot-body');
    const chatbotSend = document.querySelector('.chatbot-send');
    
    if (!chatbotInput || !chatbotBody || !chatbotSend) return;
    
    const message = chatbotInput.value.trim();
    
    if (!message || isTyping) return;
    
    // Add user message to chat
    addMessage('user', message);
    chatbotInput.value = '';
    chatbotInput.disabled = true;
    chatbotSend.disabled = true;
    isTyping = true;
    
    // Show typing indicator
    showTypingIndicator();
    
    // STEP 1: Check for offline response first
    const offlineMatch = findOfflineResponse(message);
    
    if (offlineMatch.found) {
        // OFFLINE RESPONSE FOUND - Use it instantly!
        console.log('⚡ Using OFFLINE response - instant, no API cost!');
        
        // Simulate a brief "thinking" time for natural feel (shorter than AI)
        setTimeout(() => {
            removeTypingIndicator();
            
            // Add offline response badge
            const responseWithBadge = `
                <div style="display: inline-block; background: rgba(34, 197, 94, 0.15); color: #22c55e; padding: 3px 8px; border-radius: 12px; font-size: 0.75rem; margin-bottom: 8px; font-weight: 600;">
                    ⚡ INSTANT RESPONSE
                </div><br>
                ${offlineMatch.response}
            `;
            
            addMessage('assistant', responseWithBadge);
            
            // Add to conversation history
            conversationHistory.push(
                { role: 'user', content: message },
                { role: 'assistant', content: offlineMatch.response.replace(/<[^>]*>/g, '').replace(/&nbsp;/g, ' ') }
            );
            
            chatbotInput.disabled = false;
            chatbotSend.disabled = false;
            isTyping = false;
        }, 600); // Faster than AI response
        
        return; // Exit - we're done!
    }
    
    // STEP 2: No offline match - Use AI (requires internet + API key)
    console.log('🌐 No offline match found - using AI for complex response...');
    
    // Check if API key is configured
    if (CLAUDE_API_KEY === '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') {
        removeTypingIndicator();
        addMessage('assistant', '⚠️ API key not configured. Please add your Claude API key to enable AI responses. Get your key at: https://console.anthropic.com/');
        chatbotInput.disabled = false;
        chatbotSend.disabled = false;
        isTyping = false;
        return;
    }
    
    try {
        // Prepare messages for API
        const messages = [
            ...conversationHistory,
            { role: 'user', content: message }
        ];
        
        console.log('🤖 Sending message to Claude API...');
        
        // Call Claude API
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
                system: SYSTEM_PROMPT,
                messages: messages
            })
        });
        
        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.error?.message || `API Error: ${response.status}`);
        }
        
        const data = await response.json();
        
        console.log('🤖 Received response from Claude API');
        
        // Remove typing indicator
        removeTypingIndicator();
        
        // Extract assistant's response
        const assistantMessage = data.content[0].text;
        
        // Add AI response badge
        const responseWithBadge = `
            <div style="display: inline-block; background: rgba(139, 92, 246, 0.15); color: #a78bfa; padding: 3px 8px; border-radius: 12px; font-size: 0.75rem; margin-bottom: 8px; font-weight: 600;">
                🤖 AI RESPONSE
            </div><br>
            ${assistantMessage}
        `;
        
        // Add to conversation history
        conversationHistory.push(
            { role: 'user', content: message },
            { role: 'assistant', content: assistantMessage }
        );
        
        // Add assistant message to chat
        addMessage('assistant', responseWithBadge);
        
    } catch (error) {
        console.error('🤖 Chat Error:', error);
        removeTypingIndicator();
        
        let errorMessage = '❌ Sorry, I encountered an error with the AI. ';
        
        if (error.message.includes('401')) {
            errorMessage += 'Invalid API key. Please check your configuration.';
        } else if (error.message.includes('429')) {
            errorMessage += 'Rate limit exceeded. Please try again in a moment.';
        } else if (error.message.includes('500') || error.message.includes('529')) {
            errorMessage += 'Claude API is temporarily unavailable. Please try again.';
        } else if (error.message.includes('Failed to fetch') || error.message.includes('NetworkError')) {
            errorMessage += 'No internet connection. Try one of these common questions:<br><br>';
            errorMessage += '• "What is the pricing?"<br>';
            errorMessage += '• "Tell me about the presale"<br>';
            errorMessage += '• "How does the technology work?"<br>';
            errorMessage += '• "Show me use cases"';
        } else {
            errorMessage += 'Please try again or contact us at contact@vaultphoenix.com';
        }
        
        addMessage('assistant', errorMessage);
    } finally {
        chatbotInput.disabled = false;
        chatbotSend.disabled = false;
        isTyping = false;
    }
}

// ============================================
// ADD MESSAGE TO CHAT - FIXED ALIGNMENT
// ============================================
function addMessage(role, content) {
    const chatbotBody = document.querySelector('.chatbot-body');
    if (!chatbotBody) return;
    
    const messageDiv = document.createElement('div');
    messageDiv.className = `chat-message ${role}-message`;
    
    if (role === 'user') {
        // FIXED: User messages - NO avatar, just bubble on far right
        messageDiv.innerHTML = `
            <div class="message-content">
                <div class="message-text">${escapeHtml(content)}</div>
            </div>
        `;
    } else {
        // FIXED: Claude messages - Avatar on left, bubble next to it
        messageDiv.innerHTML = `
            <div class="message-content">
                <div class="message-avatar">
                    <img src="images/VPLogoNoText.PNG" alt="Vault Phoenix">
                </div>
                <div class="message-text">${formatMessage(content)}</div>
            </div>
        `;
    }
    
    chatbotBody.appendChild(messageDiv);
    chatbotBody.scrollTop = chatbotBody.scrollHeight;
}

// ============================================
// TYPING INDICATOR - FIXED DESIGN
// ============================================
function showTypingIndicator() {
    const chatbotBody = document.querySelector('.chatbot-body');
    if (!chatbotBody) return;
    
    const typingDiv = document.createElement('div');
    typingDiv.className = 'chat-message assistant-message typing-indicator';
    typingDiv.innerHTML = `
        <div class="message-content">
            <div class="message-avatar">
                <img src="images/VPLogoNoText.PNG" alt="Vault Phoenix">
            </div>
            <div class="typing-dots">
                <span></span><span></span><span></span>
            </div>
        </div>
    `;
    
    chatbotBody.appendChild(typingDiv);
    chatbotBody.scrollTop = chatbotBody.scrollHeight;
}

function removeTypingIndicator() {
    const typingIndicator = document.querySelector('.typing-indicator');
    if (typingIndicator) {
        typingIndicator.remove();
    }
}

// ============================================
// MESSAGE FORMATTING
// ============================================
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function formatMessage(text) {
    // Convert markdown-style formatting to HTML
    let formatted = text;
    
    // Don't escape HTML if it already contains tags (for our pre-written responses)
    if (!text.includes('<')) {
        formatted = escapeHtml(text);
    }
    
    // Bold text
    formatted = formatted.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    
    // Bullet points (only if not already formatted)
    if (!text.includes('<ul>') && !text.includes('<li>')) {
        formatted = formatted.replace(/^- (.+)$/gm, '<li>$1</li>');
        formatted = formatted.replace(/(<li>.*<\/li>)/s, '<ul>$1</ul>');
    }
    
    // Line breaks (only if not already formatted)
    if (!text.includes('<br>')) {
        formatted = formatted.replace(/\n/g, '<br>');
    }
    
    return formatted;
}

// ============================================
// MOBILE ALLOCATION CARDS
// ============================================
function initializeMobileAllocationCards() {
    // Check if we're on mobile
    if (window.innerWidth > 768) {
        console.log('📱 Desktop detected - skipping mobile allocation cards');
        return;
    }
    
    const tableContainer = document.querySelector('.allocation-table .table-container');
    if (!tableContainer) {
        console.log('📱 Table container not found - skipping mobile allocation cards');
        return;
    }
    
    // Token allocation data (if applicable to main page - adjust as needed)
    const allocations = [
        {
            category: 'Public Presale',
            percentage: '50%',
            tokens: '83.35M',
            price: '$0.003',
            vesting: 'No lock-up',
            note: 'Available to all investors during presale'
        },
        {
            category: 'Ecosystem Development',
            percentage: '20%',
            tokens: '33.34M',
            price: 'Reserved',
            vesting: '24 months',
            note: 'Platform growth, partnerships, integrations'
        },
        {
            category: 'Team & Advisors',
            percentage: '15%',
            tokens: '25M',
            price: 'Reserved',
            vesting: '12 months',
            note: '6-month cliff, 18-month linear vesting'
        },
        {
            category: 'Marketing & Partnerships',
            percentage: '10%',
            tokens: '16.67M',
            price: 'Reserved',
            vesting: '18 months',
            note: 'Brand awareness, strategic partnerships'
        },
        {
            category: 'Liquidity Pool',
            percentage: '5%',
            tokens: '8.34M',
            price: 'Reserved',
            vesting: '3 months',
            note: 'DEX liquidity, locked for 3 months post-presale'
        }
    ];
    
    // Create mobile cards container
    const mobileContainer = document.createElement('div');
    mobileContainer.className = 'allocation-cards-mobile';
    
    // Generate cards
    allocations.forEach(allocation => {
        const card = document.createElement('div');
        card.className = 'allocation-card-mobile';
        
        card.innerHTML = `
            <div class="allocation-card-header">
                <div class="allocation-card-category">${allocation.category}</div>
                <div class="allocation-card-percentage">${allocation.percentage}</div>
            </div>
            <div class="allocation-card-details">
                <div class="allocation-detail-item">
                    <div class="allocation-detail-label">Tokens</div>
                    <div class="allocation-detail-value">${allocation.tokens}</div>
                </div>
                <div class="allocation-detail-item">
                    <div class="allocation-detail-label">Price</div>
                    <div class="allocation-detail-value">${allocation.price}</div>
                </div>
                <div class="allocation-detail-item">
                    <div class="allocation-detail-label">Vesting</div>
                    <div class="allocation-detail-value">${allocation.vesting}</div>
                </div>
            </div>
            <div class="allocation-card-note">${allocation.note}</div>
        `;
        
        mobileContainer.appendChild(card);
    });
    
    // Insert after table container
    tableContainer.parentNode.insertBefore(mobileContainer, tableContainer.nextSibling);
    
    console.log('📱 Mobile allocation cards initialized successfully!');
}

// ============================================
// PAGE INITIALIZATION
// ============================================

// FIXED: Immediately prevent flash by setting dark background - FASTER RESPONSE
(function() {
    // Set background immediately before DOM loads
    document.documentElement.style.background = '#0f0f0f';
    if (document.body) {
        document.body.style.background = 'linear-gradient(135deg, #0f0f0f 0%, #1a1a1a 25%, #2d1810 50%, #451a03 75%, #7c2d12 100%)';
        document.body.style.opacity = '1'; // Immediately visible for seamless transition
    }
})();

// FIXED: Set up seamless transition reception
document.addEventListener('DOMContentLoaded', function() {
    console.log('🔥🪙 Main page loading - optimized for seamless transition...');
    
    // FIXED: Immediately ensure dark background and full opacity
    document.body.style.background = 'linear-gradient(135deg, #0f0f0f 0%, #1a1a1a 25%, #2d1810 50%, #451a03 75%, #7c2d12 100%)';
    document.body.style.opacity = '1';
    document.body.classList.add('loaded');
    
    // FIXED: Initialize main page features immediately
    // NOTE: Countdown is now handled by shared-script.js
    preloadPhoenixCryptoImages();
    initializeCryptoCoinImage();
    initializeEmberCoinImageV3();
    initializeChatbot(); // Initialize HYBRID chatbot
    initializeMobileAllocationCards(); // Initialize mobile allocation cards
    initializeCryptoBenefits();
    initializeEmberHighlightsV3();
    createPhoenixCryptoScrollIndicator();
    
    // FIXED: Create floating coins immediately without delay
    createPhoenixCryptoParticles();
    
    console.log('🔥🪙 Main page loaded seamlessly from loading screen!');
    console.log('🤖⚡ HYBRID Chatbot ready - Offline + AI!');
    console.log('📱 Mobile allocation cards initialized!');
});

// [REST OF THE CODE REMAINS EXACTLY THE SAME - All the gallery, animations, particles, etc.]
// Continuing from line 800+...

// ============================================
// GALLERY FUNCTIONS
// ============================================

// UPDATED: Enhanced gallery function with NEW app screenshots
function changeImage(imageSrc, title) {
    const mainImg = document.getElementById('mainScreenshot');
    const thumbs = document.querySelectorAll('.simple-thumb');
    
    if (mainImg) {
        mainImg.style.opacity = '0.7';
        setTimeout(() => {
            mainImg.src = imageSrc;
            mainImg.alt = title;
            mainImg.style.opacity = '1';
        }, 150);
    }
    
    // Update active states with smooth transitions
    thumbs.forEach(thumb => {
        thumb.classList.remove('active');
    });
    
    // Find and activate clicked thumb based on image source
    thumbs.forEach(thumb => {
        const thumbImg = thumb.querySelector('img');
        if (thumbImg && thumbImg.src.includes(imageSrc.split('/').pop())) {
            thumb.classList.add('active');
        }
    });
}

// Laptop gallery function for management system screenshots
function changeLaptopImage(imageSrc, title) {
    const mainImg = document.getElementById('mainLaptopScreenshot');
    const thumbs = document.querySelectorAll('.simple-thumb-laptop');
    
    if (mainImg) {
        mainImg.style.opacity = '0.7';
        setTimeout(() => {
            mainImg.src = imageSrc;
            mainImg.alt = title;
            mainImg.style.opacity = '1';
        }, 150);
    }
    
    // Update active states with smooth transitions
    thumbs.forEach(thumb => {
        thumb.classList.remove('active');
    });
    
    // Find and activate clicked thumb based on image source
    thumbs.forEach(thumb => {
        const thumbImg = thumb.querySelector('img');
        if (thumbImg && thumbImg.src.includes(imageSrc.split('/').pop())) {
            thumb.classList.add('active');
        }
    });
}

// ============================================
// SCROLL REVEAL OBSERVER (Page-Specific)
// ============================================

// PRODUCTION READY: Enhanced scroll reveal animation with FASTER timing
const observerOptions = {
    threshold: 0.05,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.classList.add('revealed');
            }, index * 50);
        }
    });
}, observerOptions);

document.querySelectorAll('.scroll-reveal').forEach(el => {
    observer.observe(el);
});

// ============================================
// INTERACTIVE CARD EFFECTS
// ============================================

document.querySelectorAll('.feature-card, .use-case-card, .simple-thumb, .simple-thumb-laptop, .crypto-benefit, .ember-highlight-redesigned').forEach(card => {
    card.addEventListener('mouseenter', function() {
        if (this.classList.contains('simple-thumb') || this.classList.contains('simple-thumb-laptop')) {
            this.style.transform = 'translateY(-5px) scale(1.05)';
        } else if (this.classList.contains('crypto-benefit')) {
            this.style.transform = 'translateX(15px)';
        } else if (this.classList.contains('ember-highlight-redesigned')) {
            this.style.transform = 'translateX(12px)';
        } else {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        }
        
        if (this.classList.contains('feature-card') || this.classList.contains('use-case-card')) {
            this.style.boxShadow = '0 30px 80px rgba(215, 51, 39, 0.2)';
        }
    });
    
    card.addEventListener('mouseleave', function() {
        if (!this.classList.contains('active')) {
            this.style.transform = 'translateY(0) scale(1)';
            if (this.classList.contains('crypto-benefit')) {
                this.style.transform = 'translateX(0)';
            }
            if (this.classList.contains('ember-highlight-redesigned')) {
                this.style.transform = 'translateX(0)';
            }
            this.style.boxShadow = '';
        }
    });
});

// ============================================
// STATS ANIMATION
// ============================================

function animateStats() {
    const stats = document.querySelectorAll('.stat-number, .revenue-number');
    stats.forEach(stat => {
        const finalValue = stat.textContent;
        const numericValue = parseFloat(finalValue.replace(/[^\d.]/g, ''));
        
        if (numericValue && numericValue > 0) {
            let currentValue = 0;
            const duration = 2500;
            const increment = numericValue / (duration / 50);
            
            const timer = setInterval(() => {
                currentValue += increment;
                if (currentValue >= numericValue) {
                    stat.textContent = finalValue;
                    clearInterval(timer);
                } else {
                    const displayValue = Math.floor(currentValue * 10) / 10;
                    const suffix = finalValue.replace(/[\d.,]/g, '');
                    if (finalValue.includes('.')) {
                        stat.textContent = displayValue.toFixed(1) + suffix;
                    } else {
                        stat.textContent = Math.floor(displayValue).toLocaleString() + suffix;
                    }
                }
            }, 50);
        }
    });
}

const heroObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            setTimeout(animateStats, 500);
            heroObserver.disconnect();
        }
    });
});

const heroSection = document.querySelector('.hero');
if (heroSection) {
    heroObserver.observe(heroSection);
}

// ============================================
// AUTO-ROTATE GALLERY
// ============================================

let currentImageIndex = 0;
const imageRotation = [
    { src: 'images/ARView.jpg', title: 'AR View' },
    { src: 'images/EmberAirdrop.jpg', title: 'Ember Airdrop' },
    { src: 'images/EmberCollected.jpg', title: 'Ember Collected' },
    { src: 'images/EmberNearby.jpg', title: 'Ember Nearby' },
    { src: 'images/EmberVault.jpg', title: 'Ember Vault' },
    { src: 'images/HuntMap.jpg', title: 'Hunt Map' }
];

function autoRotateGallery() {
    const showcaseSection = document.getElementById('showcase');
    if (!showcaseSection) return;
    
    const rect = showcaseSection.getBoundingClientRect();
    const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
    
    if (isVisible) {
        currentImageIndex = (currentImageIndex + 1) % imageRotation.length;
        const currentImage = imageRotation[currentImageIndex];
        changeImage(currentImage.src, currentImage.title);
    }
}

let currentLaptopImageIndex = 0;
const laptopImageRotation = [
    { src: 'images/CampaignControl.PNG', title: 'Campaign Control' },
    { src: 'images/DashboardOverview.PNG', title: 'Dashboard Overview' },
    { src: 'images/AdvertiserManagement.PNG', title: 'Advertiser Management' },
    { src: 'images/AirdropCenter.PNG', title: 'Airdrop Center' },
    { src: 'images/Walletandfunding.PNG', title: 'Wallet and Funding' },
    { src: 'images/AppbuilderSDK.PNG', title: 'App Builder SDK' }
];

function autoRotateLaptopGallery() {
    const showcaseSection = document.getElementById('showcase');
    if (!showcaseSection) return;
    
    const rect = showcaseSection.getBoundingClientRect();
    const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
    
    if (isVisible) {
        currentLaptopImageIndex = (currentLaptopImageIndex + 1) % laptopImageRotation.length;
        const currentImage = laptopImageRotation[currentLaptopImageIndex];
        changeLaptopImage(currentImage.src, currentImage.title);
    }
}

let autoRotateInterval;
let autoRotateLaptopInterval;

setTimeout(() => {
    autoRotateInterval = setInterval(autoRotateGallery, 4500);
    autoRotateLaptopInterval = setInterval(autoRotateLaptopGallery, 4500);
}, 3000);

document.querySelectorAll('.simple-thumb').forEach(thumb => {
    thumb.addEventListener('click', () => {
        if (autoRotateInterval) {
            clearInterval(autoRotateInterval);
        }
        setTimeout(() => {
            autoRotateInterval = setInterval(autoRotateGallery, 4500);
        }, 15000);
    });
});

document.querySelectorAll('.simple-thumb-laptop').forEach(thumb => {
    thumb.addEventListener('click', () => {
        if (autoRotateLaptopInterval) {
            clearInterval(autoRotateLaptopInterval);
        }
        setTimeout(() => {
            autoRotateLaptopInterval = setInterval(autoRotateLaptopGallery, 4500);
        }, 15000);
    });
});

// ============================================
// CTA BUTTON FEEDBACK
// ============================================

document.querySelectorAll('a[href^="mailto:"]').forEach(link => {
    link.addEventListener('click', (e) => {
        console.log('🔥🪙 Phoenix crypto email CTA ignited:', link.href);
        link.style.transform = 'scale(0.95)';
        setTimeout(() => {
            link.style.transform = '';
        }, 150);
    });
});

document.querySelectorAll('a[href^="sms:"]').forEach(link => {
    link.addEventListener('click', (e) => {
        console.log('🔥🪙 Phoenix crypto SMS CTA ignited:', link.href);
        link.style.transform = 'scale(0.95)';
        setTimeout(() => {
            link.style.transform = '';
        }, 150);
    });
});

// ============================================
// PAGE LOAD HANDLING
// ============================================

window.addEventListener('load', () => {
    console.log('🔥🪙 Main page fully loaded and ready!');
    
    const logoIcon = document.querySelector('.logo-icon');
    if (logoIcon) {
        logoIcon.style.filter = 'drop-shadow(0 0 15px rgba(215, 51, 39, 0.8))';
    }
    
    setTimeout(() => {
        const floatingCoins = document.querySelector('.hero-floating-coins');
        if (floatingCoins) {
            console.log('🔥🪙 SUCCESS: Floating VPEmberCoin.PNG coins are active!');
        } else {
            console.warn('🔥🪙 WARNING: Floating coins not found!');
        }
    }, 500);
    
    setTimeout(() => {
        const mainScreenshot = document.getElementById('mainScreenshot');
        if (mainScreenshot && (mainScreenshot.src.includes('ARView') || mainScreenshot.src.includes('Ember'))) {
            console.log('🔥🪙 SUCCESS: NEW App screenshots loaded in gallery!');
        } else {
            console.warn('🔥🪙 WARNING: NEW App screenshots not detected!');
        }
    }, 300);
    
    setTimeout(() => {
        const mainLaptopScreenshot = document.getElementById('mainLaptopScreenshot');
        if (mainLaptopScreenshot && mainLaptopScreenshot.src.includes('.PNG')) {
            console.log('🔥🪙 SUCCESS: Management system screenshots loaded in laptop gallery!');
        } else {
            console.warn('🔥🪙 WARNING: Management system screenshots not detected!');
        }
    }, 400);
    
    setTimeout(() => {
        const mainDays = document.getElementById('main-days');
        if (mainDays && mainDays.textContent !== '--') {
            console.log('🔥🪙 SUCCESS: Main page countdown to Nov 1, 2025 is active (via shared-script.js)!');
        } else {
            console.warn('🔥🪙 WARNING: Main page countdown not working!');
        }
    }, 400);
});

// ============================================
// IMAGE ERROR HANDLING
// ============================================

document.querySelectorAll('img').forEach(img => {
    img.addEventListener('error', function() {
        console.warn('🔥🪙 Phoenix crypto image failed to load:', this.src);
        this.style.opacity = '0.5';
        this.alt = 'Phoenix crypto image rising...';
    });
    
    img.addEventListener('load', function() {
        this.style.opacity = '1';
    });
});

// ============================================
// IMAGE PRELOADING
// ============================================

function preloadPhoenixCryptoImages() {
    const criticalImages = [
        'images/ARView.jpg',
        'images/EmberAirdrop.jpg',
        'images/EmberCollected.jpg',
        'images/EmberNearby.jpg',
        'images/EmberVault.jpg',
        'images/HuntMap.jpg',
        'images/CampaignControl.PNG',
        'images/DashboardOverview.PNG',
        'images/AdvertiserManagement.PNG',
        'images/AirdropCenter.PNG',
        'images/Walletandfunding.PNG',
        'images/AppbuilderSDK.PNG',
        'images/VPEmberCoin.PNG',
        'images/PhoenixHoldingCoin.PNG',
        'images/VPLogoNoText.PNG',
        'images/PhoenixBot.PNG',
        'images/VPEmberFlame.svg'
    ];
    
    criticalImages.forEach(src => {
        const img = new Image();
        img.src = src;
        img.onload = () => console.log('🔥🪙 Phoenix crypto image preloaded:', src);
        img.onerror = () => console.warn('🔥🪙 Phoenix crypto image preload failed:', src);
    });
}

// ============================================
// FLOATING CRYPTO PARTICLES
// ============================================

function createPhoenixCryptoParticles() {
    const hero = document.querySelector('.hero');
    if (!hero) {
        console.warn('🔥🪙 Hero section not found for floating coins');
        return;
    }
    
    console.log('🔥🪙 Creating floating crypto coins with VPEmberCoin.PNG...');
    
    const floatingCoins = document.createElement('div');
    floatingCoins.className = 'hero-floating-coins';
    floatingCoins.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 1;
        overflow: hidden;
    `;
    
    const coinPositions = [
        { top: '15%', left: '10%', delay: '0s', duration: '6s' },
        { top: '70%', left: '8%', delay: '1s', duration: '7s' },
        { top: '25%', right: '12%', delay: '2s', duration: '8s' },
        { top: '65%', right: '10%', delay: '3s', duration: '6s' },
        { top: '10%', left: '80%', delay: '4s', duration: '7s' },
        { bottom: '20%', right: '85%', delay: '5s', duration: '9s' }
    ];
    
    coinPositions.forEach((pos, index) => {
        const coin = document.createElement('div');
        coin.className = `hero-coin hero-coin-${index + 1}`;
        
        const coinImg = document.createElement('img');
        coinImg.src = 'images/VPEmberCoin.PNG';
        coinImg.alt = 'VP Ember Coin';
        coinImg.className = 'hero-crypto-coin-icon';
        coinImg.style.cssText = `
            width: clamp(35px, 5vw, 50px);
            height: clamp(35px, 5vw, 50px);
            object-fit: contain;
            filter: drop-shadow(0 0 8px rgba(240, 165, 0, 0.6));
            transition: all 0.3s ease;
            opacity: 0.7;
            border-radius: 50%;
        `;
        
        coinImg.onload = function() {
            console.log(`🔥🪙 VPEmberCoin.PNG loaded successfully for coin ${index + 1}`);
        };
        
        coinImg.onerror = function() {
            console.warn(`🔥🪙 VPEmberCoin.PNG failed to load for coin ${index + 1}, using emoji fallback`);
            coinImg.style.display = 'none';
            const fallback = document.createElement('div');
            fallback.innerHTML = '🪙';
            fallback.style.cssText = `
                font-size: clamp(35px, 5vw, 50px);
                display: flex;
                align-items: center;
                justify-content: center;
                filter: drop-shadow(0 0 8px rgba(240, 165, 0, 0.6));
                color: #f0a500;
                text-shadow: 0 0 10px rgba(240, 165, 0, 0.5);
            `;
            coin.appendChild(fallback);
        };
        
        coin.appendChild(coinImg);
        
        coin.style.cssText = `
            position: absolute;
            animation: heroCoinFloat ${pos.duration} ease-in-out infinite;
            animation-delay: ${pos.delay};
            z-index: 1;
            pointer-events: none;
            ${pos.top ? `top: ${pos.top};` : ''}
            ${pos.bottom ? `bottom: ${pos.bottom};` : ''}
            ${pos.left ? `left: ${pos.left};` : ''}
            ${pos.right ? `right: ${pos.right};` : ''}
        `;
        
        floatingCoins.appendChild(coin);
        console.log(`🔥🪙 Created floating VPEmberCoin ${index + 1} at position:`, pos);
    });
    
    hero.insertBefore(floatingCoins, hero.firstChild);
    console.log('🔥🪙 Floating VPEmberCoin coins container added to hero');
    
    const style = document.createElement('style');
    style.textContent = `
        @keyframes heroCoinFloat {
            0%, 100% { 
                transform: translateY(0px) rotate(0deg) scale(1); 
                opacity: 0.7; 
            }
            25% { 
                transform: translateY(-20px) rotate(90deg) scale(1.1); 
                opacity: 0.9; 
            }
            50% { 
                transform: translateY(-10px) rotate(180deg) scale(0.9); 
                opacity: 0.8; 
            }
            75% { 
                transform: translateY(-25px) rotate(270deg) scale(1.15); 
                opacity: 0.85; 
            }
        }
        
        .hero-floating-coins,
        .hero-coin {
            z-index: 1 !important;
            pointer-events: none !important;
        }
        
        .hero-crypto-coin-icon {
            z-index: 1 !important;
            pointer-events: none !important;
        }
        
        @media (max-width: 768px) {
            .hero-crypto-coin-icon {
                width: clamp(25px, 4vw, 35px) !important;
                height: clamp(25px, 4vw, 35px) !important;
                opacity: 0.6 !important;
            }
        }
        
        @media (max-width: 480px) {
            .hero-crypto-coin-icon {
                width: clamp(20px, 4vw, 30px) !important;
                height: clamp(20px, 4vw, 30px) !important;
                opacity: 0.5 !important;
            }
        }
    `;
    document.head.appendChild(style);
    console.log('🔥🪙 Floating VPEmberCoin animations added');
}

// ============================================
// COIN IMAGE INTERACTIONS
// ============================================

function initializeCryptoCoinImage() {
    const cryptoImage = document.querySelector('.phoenix-coin-image');
    if (!cryptoImage) return;
    
    cryptoImage.addEventListener('mouseenter', function() {
        this.style.filter = 'drop-shadow(0 0 30px rgba(251, 146, 60, 0.8)) brightness(1.1)';
    });
    
    cryptoImage.addEventListener('mouseleave', function() {
        this.style.filter = '';
    });
    
    let time = 0;
    setInterval(() => {
        time += 0.02;
        const sideMovement = Math.sin(time) * 8;
        const upDownMovement = Math.cos(time * 0.8) * 3;
        cryptoImage.style.transform = `translateX(${sideMovement}px) translateY(${upDownMovement}px)`;
    }, 50);
}

function initializeEmberCoinImageV3() {
    const emberCoinImage = document.querySelector('.phoenix-holding-coin-redesigned');
    if (!emberCoinImage) return;
    
    emberCoinImage.addEventListener('mouseenter', function() {
        this.style.filter = 'drop-shadow(0 0 50px rgba(240, 165, 0, 0.9)) brightness(1.2)';
        this.style.transform = 'scale(1.1) translateY(-10px)';
    });
    
    emberCoinImage.addEventListener('mouseleave', function() {
        this.style.filter = '';
        this.style.transform = '';
    });
}

// ============================================
// CRYPTO BENEFITS ANIMATIONS
// ============================================

function initializeCryptoBenefits() {
    const benefits = document.querySelectorAll('.crypto-benefit');
    if (!benefits.length) return;
    
    const benefitsObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.transform = 'translateX(0)';
                    entry.target.style.opacity = '1';
                    
                    const icon = entry.target.querySelector('.benefit-icon');
                    if (icon) {
                        icon.style.animation = 'coinBounce 0.6s ease-out';
                    }
                }, index * 200);
            }
        });
    }, { threshold: 0.3 });
    
    benefits.forEach(benefit => {
        benefit.style.transform = 'translateX(-50px)';
        benefit.style.opacity = '0';
        benefitsObserver.observe(benefit);
    });
    
    const coinBounceStyle = document.createElement('style');
    coinBounceStyle.textContent = `
        @keyframes coinBounce {
            0% { transform: scale(1) rotateY(0deg); }
            50% { transform: scale(1.2) rotateY(180deg); }
            100% { transform: scale(1) rotateY(360deg); }
        }
    `;
    document.head.appendChild(coinBounceStyle);
}

function initializeEmberHighlightsV3() {
    const highlights = document.querySelectorAll('.ember-highlight-redesigned');
    if (!highlights.length) return;
    
    const highlightsObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.transform = 'translateX(0)';
                    entry.target.style.opacity = '1';
                    
                    const emoji = entry.target.querySelector('.highlight-emoji-redesigned');
                    if (emoji) {
                        emoji.style.animation = 'emberFlickerV3 1s ease-in-out';
                    }
                }, index * 150);
            }
        });
    }, { threshold: 0.3 });
    
    highlights.forEach(highlight => {
        highlight.style.transform = 'translateX(-30px)';
        highlight.style.opacity = '0';
        highlightsObserver.observe(highlight);
    });
    
    const emberFlickerStyleV3 = document.createElement('style');
    emberFlickerStyleV3.textContent = `
        @keyframes emberFlickerV3 {
            0%, 100% { transform: scale(1); filter: drop-shadow(0 0 5px rgba(240, 165, 0, 0.6)); }
            25% { transform: scale(1.1); filter: drop-shadow(0 0 8px rgba(240, 165, 0, 0.8)); }
            50% { transform: scale(0.95); filter: drop-shadow(0 0 3px rgba(240, 165, 0, 0.5)); }
            75% { transform: scale(1.05); filter: drop-shadow(0 0 6px rgba(240, 165, 0, 0.7)); }
        }
    `;
    document.head.appendChild(emberFlickerStyleV3);
}

// ============================================
// CTA BUTTON ENHANCEMENTS
// ============================================

document.querySelectorAll('.cta-button, .cta-primary, .cta-secondary, .demo-button, .join-presale-button-redesigned, .demo-button-enhanced').forEach(button => {
    button.addEventListener('mouseenter', function() {
        this.style.filter = 'brightness(1.1) saturate(1.2)';
        if (Math.random() > 0.7) {
            const sparkle = document.createElement('img');
            sparkle.src = 'images/VPEmberCoin.PNG';
            sparkle.alt = 'VP Ember Coin Sparkle';
            sparkle.style.cssText = `
                position: absolute;
                width: 12px;
                height: 12px;
                animation: sparkle 0.8s ease-out forwards;
                pointer-events: none;
                top: ${Math.random() * 20 - 10}px;
                left: ${Math.random() * 20 - 10}px;
                filter: drop-shadow(0 0 4px rgba(240, 165, 0, 0.8));
                z-index: 10;
                border-radius: 50%;
            `;
            
            sparkle.onerror = function() {
                this.style.display = 'none';
                const fallback = document.createElement('div');
                fallback.innerHTML = '✨';
                fallback.style.cssText = this.style.cssText;
                fallback.style.fontSize = '12px';
                this.parentNode.appendChild(fallback);
            };
            
            this.style.position = 'relative';
            this.appendChild(sparkle);
            
            setTimeout(() => sparkle.remove(), 800);
        }
    });
    
    button.addEventListener('mouseleave', function() {
        this.style.filter = '';
    });
    
    button.addEventListener('mousedown', function() {
        this.style.transform = 'scale(0.95)';
    });
    
    button.addEventListener('mouseup', function() {
        this.style.transform = '';
    });
});

const sparkleStyle = document.createElement('style');
sparkleStyle.textContent = `
    @keyframes sparkle {
        0% { transform: translateY(0) scale(1); opacity: 1; }
        100% { transform: translateY(-20px) scale(0); opacity: 0; }
    }
`;
document.head.appendChild(sparkleStyle);

// ============================================
// SCROLL PROGRESS INDICATOR
// ============================================

function createPhoenixCryptoScrollIndicator() {
    const indicator = document.createElement('div');
    indicator.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        height: 4px;
        background: linear-gradient(90deg, #d73327, #fb923c, #f0a500);
        z-index: 9999;
        transition: width 0.3s ease;
        width: 0%;
        box-shadow: 0 2px 10px rgba(215, 51, 39, 0.3);
    `;
    document.body.appendChild(indicator);
    
    window.addEventListener('scroll', () => {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        indicator.style.width = scrolled + '%';
    });
}

// ============================================
// EASTER EGG: KONAMI CODE
// ============================================

let konamiCode = [];
const konamiSequence = [
    'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
    'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
    'KeyB', 'KeyA'
];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.code);
    if (konamiCode.length > konamiSequence.length) {
        konamiCode.shift();
    }
    
    if (konamiCode.join(',') === konamiSequence.join(',')) {
        console.log('🔥🪙 BONUS CRYPTO ACTIVATED! 🪙🔥');
        for (let i = 0; i < 30; i++) {
            setTimeout(() => {
                const coin = document.createElement('img');
                coin.src = 'images/VPEmberCoin.PNG';
                coin.alt = 'VP Ember Bonus Coin';
                coin.style.cssText = `
                    position: fixed;
                    width: ${Math.random() * 20 + 25}px;
                    height: ${Math.random() * 20 + 25}px;
                    left: ${Math.random() * 100}vw;
                    top: -50px;
                    z-index: 10000;
                    pointer-events: none;
                    animation: coinFall ${Math.random() * 3 + 2}s linear forwards;
                    filter: drop-shadow(0 0 8px rgba(240, 165, 0, 0.8));
                    border-radius: 50%;
                `;
                
                coin.onerror = function() {
                    this.style.display = 'none';
                    const fallback = document.createElement('div');
                    fallback.innerHTML = '🪙';
                    fallback.style.cssText = this.style.cssText;
                    fallback.style.fontSize = this.style.width;
                    fallback.style.color = '#f0a500';
                    document.body.appendChild(fallback);
                    setTimeout(() => fallback.remove(), 5000);
                };
                
                document.body.appendChild(coin);
                setTimeout(() => coin.remove(), 5000);
            }, i * 150);
        }
        
        const coinFallStyle = document.createElement('style');
        coinFallStyle.textContent = `
            @keyframes coinFall {
                to { 
                    transform: translateY(calc(100vh + 100px)) rotate(720deg); 
                    opacity: 0; 
                }
            }
        `;
        document.head.appendChild(coinFallStyle);
        
        konamiCode = [];
    }
});

// ============================================
// CONSOLE MESSAGES
// ============================================

console.log('%c🔥🪙 VAULT PHOENIX - AR CRYPTO GAMING REVOLUTION', 'color: #d73327; font-size: 24px; font-weight: bold; text-shadow: 2px 2px 4px rgba(0,0,0,0.3);');
console.log('%c🚀 Built by Phoenix Crypto Developers - Premium AR Gaming Solutions', 'color: #fb923c; font-size: 14px; font-weight: bold;');
console.log('%c📧 Contact: contact@vaultphoenix.com', 'color: #374151; font-size: 14px;');
console.log('%c🔥🪙 From ashes to crypto greatness - Phoenix Rising with NEW app screenshots!', 'color: #d73327; font-size: 12px; font-style: italic;');
console.log('🔥🪙 Crypto Phoenix Ready - Try the Konami Code for a surprise! ⬆️⬆️⬇️⬇️⬅️➡️⬅️➡️BA');
console.log('🤖⚡ HYBRID Chatbot: Instant offline responses + AI for complex questions!');

window.addEventListener('load', () => {
    const loadTime = performance.now();
    console.log(`%c🔥🪙 Phoenix crypto arose in ${Math.round(loadTime)}ms - Ready to collect VPEmberCoins!`, 'color: #22c55e; font-weight: bold;');
});
