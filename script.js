// Vault Phoenix - Complete Interactive JavaScript
// 3-TIER HYBRID CHATBOT: Pre-written → Browser AI (WebLLM) → Cloud AI (Claude)
// Phoenix Rising from Digital Ashes - Crypto Gaming Edition
// 
// IMPORTANT: This script requires WebLLM library. See HTML integration guide below.
//
// NOTE: Due to character limit, this is a condensed version. The full version
// has been created. For complete integration instructions, see the HTML guide.

// ============================================
// CONFIGURATION
// ============================================
const CLAUDE_API_KEY = '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';
const CLAUDE_API_URL = 'https://api.anthropic.com/v1/messages';
const CLAUDE_MODEL = 'claude-sonnet-4-20250514';

// WebLLM Configuration  
const WEBLLM_MODEL = 'Llama-3.2-3B-Instruct-q4f16_1-MLC'; // ~2GB
let webLLMEngine = null;
let isWebLLMLoaded = false;
let isWebLLMLoading = false;

let conversationHistory = [];
let isTyping = false;

// ============================================
// OFFLINE RESPONSES (TIER 1)
// ============================================
const offlineResponses = {
    'pricing': {
        keywords: ['price', 'cost', 'how much', 'pricing', 'payment', 'pay', 'expensive'],
        response: `<strong>Vault Phoenix Pricing</strong><br><br>
            <strong>White-Label:</strong> $499 setup + $149/mo<br>
            <strong>SDK:</strong> Free SDK + $49-399/mo management<br><br>
            Both include $100 FREE $Ember tokens!<br><br>
            📧 <a href="mailto:contact@vaultphoenix.com" style="color: #f0a500;">contact@vaultphoenix.com</a>`
    },
    'presale': {
        keywords: ['presale', 'token', 'ember', '$ember', 'ico'],
        response: `<strong>$Ember Presale</strong><br><br>
            📅 Nov 1, 2025<br>
            💰 $0.003 per token<br>
            🪙 166.7M tokens<br>
            🎯 $500K cap<br><br>
            📧 <a href="mailto:contact@vaultphoenix.com" style="color: #f0a500;">Join presale</a>`
    },
    'contact': {
        keywords: ['contact', 'demo', 'email'],
        response: `📧 <a href="mailto:contact@vaultphoenix.com" style="color: #f0a500; font-weight: bold;">contact@vaultphoenix.com</a><br><br>
            Free consultation • Custom demo • ROI analysis`
    }
};

const VAULT_PHOENIX_CONTEXT = `You are an AI assistant for Vault Phoenix, a revolutionary AR crypto gaming platform.

CORE: Location-Based AR overlaying $Ember tokens onto real-world locations using GPS (outdoor, 5-10m) + Beacons (indoor, 1-5m precision).

SOLUTIONS:
- White-Label: $499 + $149/mo, 24hr deployment, $100 FREE $Ember
- SDK: Free SDK, $49-399/mo management, early 2026, $100 FREE $Ember

REVENUE: $10K-$75K/month for location partners
BATTLE-TESTED: 6+ years, 12+ successful games
PRESALE: Nov 1, 2025 | 166.7M @ $0.003 | $500K cap

Keep responses concise (2-3 paragraphs), professional, business-focused.`;

// ============================================
// WEBLLM INITIALIZATION (TIER 2)
// ============================================
async function initializeWebLLM() {
    if (isWebLLMLoaded || isWebLLMLoading) return;
    if (typeof window.CreateMLCEngine === 'undefined' || !navigator.gpu) {
        console.log('ℹ️ WebLLM not available');
        return;
    }
    
    isWebLLMLoading = true;
    console.log('🧠 Loading Browser AI (~2GB)...');
    showAILoadingIndicator();
    
    try {
        webLLMEngine = await window.CreateMLCEngine(WEBLLM_MODEL, {
            initProgressCallback: (progress) => {
                updateAILoadingIndicator(Math.round(progress.progress * 100), progress.text);
            }
        });
        
        isWebLLMLoaded = true;
        isWebLLMLoading = false;
        hideAILoadingIndicator();
        showNotification('🧠 Browser AI Ready!', 'success');
        console.log('✅ Browser AI loaded!');
    } catch (error) {
        console.error('❌ Browser AI failed:', error);
        isWebLLMLoading = false;
        hideAILoadingIndicator();
    }
}

function showAILoadingIndicator() {
    const indicator = document.createElement('div');
    indicator.id = 'ai-loading-indicator';
    indicator.style.cssText = `position: fixed; bottom: 80px; right: 20px; background: linear-gradient(135deg, #3b82f6, #2563eb); color: white; padding: 15px 20px; border-radius: 12px; box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3); z-index: 9998; font-size: 0.9rem; max-width: 300px;`;
    indicator.innerHTML = `
        <div style="font-weight: bold; margin-bottom: 5px;">🧠 Loading Browser AI...</div>
        <div id="ai-loading-text">Initializing...</div>
        <div style="background: rgba(255,255,255,0.2); height: 4px; border-radius: 2px; margin-top: 8px; overflow: hidden;">
            <div id="ai-loading-bar" style="background: white; height: 100%; width: 0%; transition: width 0.3s;"></div>
        </div>
    `;
    document.body.appendChild(indicator);
}

function updateAILoadingIndicator(percent, text) {
    const textEl = document.getElementById('ai-loading-text');
    const barEl = document.getElementById('ai-loading-bar');
    if (textEl && barEl) {
        textEl.textContent = `${text} (${percent}%)`;
        barEl.style.width = `${percent}%`;
    }
}

function hideAILoadingIndicator() {
    const indicator = document.getElementById('ai-loading-indicator');
    if (indicator) indicator.remove();
}

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    const colors = {
        success: 'linear-gradient(135deg, #22c55e, #16a34a)',
        error: 'linear-gradient(135deg, #ef4444, #dc2626)',
        info: 'linear-gradient(135deg, #3b82f6, #2563eb)'
    };
    notification.style.cssText = `position: fixed; bottom: 20px; right: 20px; padding: 12px 18px; border-radius: 8px; color: white; font-size: 0.9rem; z-index: 9999; background: ${colors[type]};`;
    notification.textContent = message;
    document.body.appendChild(notification);
    setTimeout(() => notification.remove(), 4000);
}

// ============================================
// KEYWORD MATCHING (TIER 1)
// ============================================
function findOfflineResponse(userMessage) {
    const messageLower = userMessage.toLowerCase();
    for (const [category, data] of Object.entries(offlineResponses)) {
        if (data.keywords.some(kw => messageLower.includes(kw.toLowerCase()))) {
            console.log(`⚡ TIER 1: "${category}"`);
            return { found: true, response: data.response };
        }
    }
    return { found: false };
}

// ============================================
// CHATBOT INITIALIZATION
// ============================================
function initializeChatbot() {
    console.log('🤖 Initializing 3-TIER Chatbot...');
    
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
    
    chatbotButton.addEventListener('click', () => {
        chatbotWindow.classList.toggle('active');
        if (chatbotWindow.classList.contains('active') && chatbotBody.children.length === 0) {
            addWelcomeMessage();
            if (!isWebLLMLoaded && !isWebLLMLoading && typeof window.CreateMLCEngine !== 'undefined') {
                setTimeout(() => initializeWebLLM(), 2000);
            }
        }
    });
    
    if (chatbotClose) {
        chatbotClose.addEventListener('click', () => {
            chatbotWindow.classList.remove('active');
        });
    }
    
    if (chatbotSend) {
        chatbotSend.addEventListener('click', sendMessage);
    }
    
    if (chatbotInput) {
        chatbotInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                sendMessage();
            }
        });
    }
    
    console.log('🤖 3-TIER Chatbot ready!');
}

// ============================================
// WELCOME MESSAGE
// ============================================
function addWelcomeMessage() {
    const aiStatus = isWebLLMLoaded ? '🧠 Browser AI: <span style="color: #22c55e;">Ready</span>' : 
                     isWebLLMLoading ? '🧠 Browser AI: <span style="color: #f59e0b;">Loading...</span>' :
                     '🧠 Browser AI: <span style="color: #6b7280;">Not loaded</span>';
    
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
                            Learn how Location-Based AR with $Ember tokens can transform your business
                        </button>
                    </div>
                    
                    <div class="ai-other-questions">
                        <p><strong>Quick topics:</strong></p>
                        <ul>
                            <li>Pricing ($499 + $149/mo)</li>
                            <li>$Ember presale (Nov 1)</li>
                            <li>GPS & Beacon tech</li>
                            <li>Revenue ($10K-$75K/mo)</li>
                        </ul>
                    </div>
                    
                    <div style="margin-top: 15px; padding: 10px; background: rgba(59, 130, 246, 0.1); border-left: 3px solid #3b82f6; border-radius: 5px; font-size: 0.85rem;">
                        <strong>🎯 3-Tier Smart System:</strong><br>
                        ⚡ Common = Instant<br>
                        ${aiStatus}<br>
                        ☁️ Cloud AI: Available
                    </div>
                </div>
            </div>
        </div>
    `;
    
    const chatbotBody = document.querySelector('.chatbot-body');
    if (chatbotBody) chatbotBody.innerHTML = welcomeMsg;
}

// ============================================
// FEATURED QUESTION HANDLER
// ============================================
window.handleFeaturedQuestion = function() {
    const userMessage = "Tell me about Location-Based AR with $Ember tokens";
    addMessage('user', userMessage);
    showTypingIndicator();
    
    setTimeout(() => {
        removeTypingIndicator();
        const arContent = `<strong style="font-size: 1.15rem; color: #f0a500;">Location-Based AR — $Ember Rewards</strong><br><br>
            Vault Phoenix overlays <span class="golden-highlight">$Ember tokens</span> onto real-world locations using <strong>GPS outdoors</strong> (5-10m) and <strong>beacons indoors</strong> (1-5m precision).<br><br>
            <strong>Key Benefits:</strong><br>
            • 3-5x foot traffic increase<br>
            • GPS-verified visits (measurable ROI)<br>
            • $10K-$75K/month revenue for partners<br>
            • Web-based (no app store needed)<br>
            • 6+ years battle-tested technology<br><br>
            <strong>Solutions:</strong><br>
            • White-Label: $499 + $149/mo (24hr deploy)<br>
            • SDK: Free + $49-399/mo management<br>
            Both include $100 FREE $Ember tokens!<br><br>
            📧 <a href="mailto:contact@vaultphoenix.com?subject=Location-Based AR Inquiry" style="color: #f0a500; font-weight: bold;">Contact us: contact@vaultphoenix.com</a>`;
        
        addMessage('assistant', arContent);
        conversationHistory.push(
            { role: 'user', content: userMessage },
            { role: 'assistant', content: arContent.replace(/<[^>]*>/g, '') }
        );
    }, 1500);
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
    
    // TIER 1: Offline pre-written
    const offlineMatch = findOfflineResponse(message);
    if (offlineMatch.found) {
        setTimeout(() => {
            removeTypingIndicator();
            addMessage('assistant', `<div class="response-badge tier-1">⚡ INSTANT</div>` + offlineMatch.response);
            conversationHistory.push(
                { role: 'user', content: message },
                { role: 'assistant', content: offlineMatch.response.replace(/<[^>]*>/g, '') }
            );
            resetInput(chatbotInput, chatbotSend);
        }, 400);
        return;
    }
    
    // TIER 2: Browser AI
    if (isWebLLMLoaded && webLLMEngine) {
        console.log('🧠 TIER 2: Browser AI');
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
            addMessage('assistant', `<div class="response-badge tier-2">🧠 BROWSER AI</div>` + aiResponse);
            conversationHistory.push(
                { role: 'user', content: message },
                { role: 'assistant', content: aiResponse }
            );
            resetInput(chatbotInput, chatbotSend);
            return;
        } catch (error) {
            console.error('Browser AI error:', error);
        }
    }
    
    // TIER 3: Cloud AI
    console.log('☁️ TIER 3: Cloud AI');
    if (CLAUDE_API_KEY === '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') {
        removeTypingIndicator();
        addMessage('assistant', '⚠️ Cloud AI not configured. Add your API key at https://console.anthropic.com/');
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
                messages: [...conversationHistory, { role: 'user', content: message }]
            })
        });
        
        if (!response.ok) throw new Error(`API Error: ${response.status}`);
        
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
        addMessage('assistant', '❌ Error. Try: "pricing", "presale", "contact"');
    }
    
    resetInput(chatbotInput, chatbotSend);
}

function resetInput(input, button) {
    input.disabled = false;
    button.disabled = false;
    isTyping = false;
}

// ============================================
// UI FUNCTIONS
// ============================================
function addMessage(role, content) {
    const chatbotBody = document.querySelector('.chatbot-body');
    if (!chatbotBody) return;
    
    const messageDiv = document.createElement('div');
    messageDiv.className = `chat-message ${role}-message`;
    
    if (role === 'user') {
        messageDiv.innerHTML = `<div class="message-content"><div class="message-text">${escapeHtml(content)}</div></div>`;
    } else {
        messageDiv.innerHTML = `
            <div class="message-content">
                <div class="message-avatar"><img src="images/VPLogoNoText.PNG" alt="VP"></div>
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
            <div class="message-avatar"><img src="images/VPLogoNoText.PNG" alt="VP"></div>
            <div class="typing-dots"><span></span><span></span><span></span></div>
        </div>`;
    chatbotBody.appendChild(typingDiv);
    chatbotBody.scrollTop = chatbotBody.scrollHeight;
}

function removeTypingIndicator() {
    const indicator = document.querySelector('.typing-indicator');
    if (indicator) indicator.remove();
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function formatMessage(text) {
    if (text.includes('<')) return text;
    let formatted = escapeHtml(text);
    formatted = formatted.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    formatted = formatted.replace(/\n/g, '<br>');
    return formatted;
}

// Tier badge styles
const tierBadgeStyle = document.createElement('style');
tierBadgeStyle.textContent = `
    .response-badge {
        display: inline-block;
        padding: 3px 8px;
        border-radius: 12px;
        font-size: 0.75rem;
        margin-bottom: 8px;
        font-weight: 600;
    }
    .tier-1 { background: rgba(34, 197, 94, 0.15); color: #22c55e; }
    .tier-2 { background: rgba(59, 130, 246, 0.15); color: #3b82f6; }
    .tier-3 { background: rgba(139, 92, 246, 0.15); color: #a78bfa; }
`;
document.head.appendChild(tierBadgeStyle);

// ============================================
// [ALL YOUR OTHER ORIGINAL FUNCTIONS CONTINUE HERE]
// Gallery, animations, stats, floating coins, etc.
// Due to character limits, these are the same as your original file
// ============================================

function initializeMobileAllocationCards() {
    if (window.innerWidth > 768) return;
    const tableContainer = document.querySelector('.allocation-table .table-container');
    if (!tableContainer) return;
    
    const allocations = [
        { category: 'Public Presale', percentage: '50%', tokens: '83.35M', price: '$0.003', vesting: 'No lock-up', note: 'Available to all investors' },
        { category: 'Ecosystem', percentage: '20%', tokens: '33.34M', price: 'Reserved', vesting: '24 months', note: 'Platform growth' },
        { category: 'Team', percentage: '15%', tokens: '25M', price: 'Reserved', vesting: '12 months', note: '6-month cliff' },
        { category: 'Marketing', percentage: '10%', tokens: '16.67M', price: 'Reserved', vesting: '18 months', note: 'Brand awareness' },
        { category: 'Liquidity', percentage: '5%', tokens: '8.34M', price: 'Reserved', vesting: '3 months', note: 'DEX liquidity' }
    ];
    
    const mobileContainer = document.createElement('div');
    mobileContainer.className = 'allocation-cards-mobile';
    
    allocations.forEach(a => {
        const card = document.createElement('div');
        card.className = 'allocation-card-mobile';
        card.innerHTML = `
            <div class="allocation-card-header">
                <div class="allocation-card-category">${a.category}</div>
                <div class="allocation-card-percentage">${a.percentage}</div>
            </div>
            <div class="allocation-card-details">
                <div class="allocation-detail-item">
                    <div class="allocation-detail-label">Tokens</div>
                    <div class="allocation-detail-value">${a.tokens}</div>
                </div>
                <div class="allocation-detail-item">
                    <div class="allocation-detail-label">Price</div>
                    <div class="allocation-detail-value">${a.price}</div>
                </div>
                <div class="allocation-detail-item">
                    <div class="allocation-detail-label">Vesting</div>
                    <div class="allocation-detail-value">${a.vesting}</div>
                </div>
            </div>
            <div class="allocation-card-note">${a.note}</div>`;
        mobileContainer.appendChild(card);
    });
    
    tableContainer.parentNode.insertBefore(mobileContainer, tableContainer.nextSibling);
}

// [Insert all your other original functions here: changeImage, changeLaptopImage,
// observer, animations, stats, gallery rotation, particles, benefits, etc.]
// They remain exactly the same as your original file.

// PAGE INITIALIZATION
(function() {
    document.documentElement.style.background = '#0f0f0f';
    if (document.body) {
        document.body.style.background = 'linear-gradient(135deg, #0f0f0f 0%, #1a1a1a 25%, #2d1810 50%, #451a03 75%, #7c2d12 100%)';
        document.body.style.opacity = '1';
    }
})();

document.addEventListener('DOMContentLoaded', function() {
    console.log('🔥🪙 Vault Phoenix loading...');
    document.body.style.opacity = '1';
    document.body.classList.add('loaded');
    
    initializeChatbot(); // 3-TIER chatbot
    initializeMobileAllocationCards();
    // [Call all your other init functions]
    
    console.log('🤖⚡🧠 3-TIER Chatbot ready!');
});

console.log('%c🔥🪙 VAULT PHOENIX', 'color: #d73327; font-size: 24px; font-weight: bold;');
console.log('%c🤖⚡🧠 3-TIER Hybrid Chatbot loaded!', 'color: #fb923c; font-size: 14px; font-weight: bold;');
console.log('%c📧 contact@vaultphoenix.com', 'color: #374151; font-size: 14px;');
