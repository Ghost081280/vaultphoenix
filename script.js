// Vault Phoenix - Complete Interactive JavaScript
// 3-TIER HYBRID CHATBOT: Pre-written → Browser AI (WebLLM) → Cloud AI (Claude)
// UPDATED: Beautiful welcome message, no ugly status boxes, properly sized images
// FIXED: Removed inline style manipulation that was overriding CSS

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
// WEBLLM INITIALIZATION (TIER 2) - SILENT
// ============================================
async function initializeWebLLM() {
    if (isWebLLMLoaded || isWebLLMLoading) return;
    if (typeof window.CreateMLCEngine === 'undefined' || !navigator.gpu) {
        console.log('ℹ️ WebLLM not available');
        return;
    }
    
    isWebLLMLoading = true;
    console.log('🧠 Loading Browser AI (~2GB)...');
    
    try {
        webLLMEngine = await window.CreateMLCEngine(WEBLLM_MODEL, {
            initProgressCallback: (progress) => {
                console.log(`Loading: ${Math.round(progress.progress * 100)}%`);
            }
        });
        
        isWebLLMLoaded = true;
        isWebLLMLoading = false;
        console.log('✅ Browser AI loaded!');
    } catch (error) {
        console.error('❌ Browser AI failed:', error);
        isWebLLMLoading = false;
    }
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
// BEAUTIFUL WELCOME MESSAGE - NO STATUS BOX
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
                    I'm Phoenix AI, your guide to revolutionizing marketing with AR crypto gaming.<br><br>
                    
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
                            <div style="background: rgba(0, 0, 0, 0.2); padding: 8px 12px; border-radius: 8px; border: 1px solid rgba(240, 165, 0, 0.2);">💰 Pricing</div>
                            <div style="background: rgba(0, 0, 0, 0.2); padding: 8px 12px; border-radius: 8px; border: 1px solid rgba(240, 165, 0, 0.2);">🪙 $Ember Presale</div>
                            <div style="background: rgba(0, 0, 0, 0.2); padding: 8px 12px; border-radius: 8px; border: 1px solid rgba(240, 165, 0, 0.2);">📍 GPS & Beacons</div>
                            <div style="background: rgba(0, 0, 0, 0.2); padding: 8px 12px; border-radius: 8px; border: 1px solid rgba(240, 165, 0, 0.2);">📈 Revenue</div>
                        </div>
                    </div>
                    
                    <div style="margin-top: 18px; padding: 12px; background: rgba(0, 0, 0, 0.3); border-radius: 10px; font-size: 0.85rem; text-align: center; color: rgba(255, 255, 255, 0.8);">
                        <strong style="color: #f0a500;">💬 Ask me anything!</strong><br>
                        I'm powered by smart AI to help you succeed.
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
            addMessage('assistant', `<div class="response-badge tier-2">🧠 SMART AI</div>` + aiResponse);
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
    .featured-question-btn:hover {
        background: linear-gradient(135deg, rgba(215, 51, 39, 0.3), rgba(251, 146, 60, 0.2)) !important;
        border-color: rgba(215, 51, 39, 0.6) !important;
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(215, 51, 39, 0.3);
    }
`;
document.head.appendChild(tierBadgeStyle);

// ============================================
// PAGE INITIALIZATION - FIXED
// Let CSS handle all styling via the .loaded class
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    console.log('🔥🪙 Vault Phoenix loading...');
    
    // Just add the class - CSS handles opacity transition
    document.body.classList.add('loaded');
    
    initializeChatbot(); // 3-TIER chatbot
    
    console.log('🤖⚡🧠 3-TIER Chatbot ready!');
});

console.log('%c🔥🪙 VAULT PHOENIX', 'color: #d73327; font-size: 24px; font-weight: bold;');
console.log('%c🤖⚡🧠 3-TIER Hybrid Chatbot loaded!', 'color: #fb923c; font-size: 14px; font-weight: bold;');
console.log('%c📧 contact@vaultphoenix.com', 'color: #374151; font-size: 14px;');
