// Vault Phoenix - $Ember Token Page Interactive JavaScript
// Production Version - Optimized & Secured
// User messages: NO avatar, pushed to far right
// Claude messages: VP logo avatar on left
// Background scroll prevented with overscroll-behavior
// COUNTDOWN: Now handled ONLY by shared-script.js universal timer

// ============================================
// CLAUDE API CONFIGURATION
// ============================================
const CLAUDE_API_KEY = 'YOUR_CLAUDE_API_KEY_HERE'; // ← Replace with your actual API key from console.anthropic.com
const CLAUDE_API_URL = 'https://api.anthropic.com/v1/messages';
const CLAUDE_MODEL = 'claude-sonnet-4-20250514';

// Chat state
let conversationHistory = [];
let isTyping = false;

// System prompt for $Ember Token context
const SYSTEM_PROMPT = `You are an AI assistant for Vault Phoenix's $Ember Token presale, a revolutionary crypto token that powers AR gaming rewards and location-based marketing campaigns.

Key Information about $Ember Token:
- Token Symbol: $EMBER
- Presale Launch: November 1, 2025
- Presale Price: $0.003 per token
- Total Supply: 166.7M tokens
- Presale Allocation: 50% (83.35M tokens) - No lock-up period
- Platform: Ethereum blockchain (ERC-20)
- Use Cases: In-game rewards, premium placements, staking, governance

Token Allocation Breakdown:
- Public Presale: 50% (83.35M) - $0.003, No lock-up
- Ecosystem Development: 20% (33.34M) - 24 months vesting
- Team & Advisors: 15% (25M) - 12 months cliff, 18 months vesting
- Marketing & Partnerships: 10% (16.67M) - 18 months vesting
- Liquidity Pool: 5% (8.34M) - 3 months lock after presale

Key Benefits:
- Early investor advantage at $0.003 presale price
- $100 FREE tokens with every Vault Phoenix service activation
- Staking rewards and governance rights
- Direct utility in AR gaming ecosystem
- Limited supply with deflationary mechanisms

Vault Phoenix Platform:
- White-label AR crypto gaming with GPS & Beacon technology
- 6+ years development, 12+ successful games
- Revenue potential: $10K-$75K/month for advertisers
- Industries: Sports, Tourism, Retail, Entertainment, Healthcare, Education

Your role is to:
- Answer questions about $Ember token presale, tokenomics, and utility
- Explain investment opportunities and benefits
- Provide information about the Vault Phoenix ecosystem
- Guide users toward participating in the presale
- Be enthusiastic, professional, and helpful about crypto investing
- Keep responses concise but informative

Always maintain a professional yet friendly tone. Emphasize the legitimate utility and value proposition. If asked about financial advice, remind users to do their own research and consult financial advisors.`;

// ============================================
// INITIALIZE CHATBOT - NO AUTO-FOCUS
// ============================================
function initializeChatbot() {
    const chatbotButton = document.querySelector('.chatbot-button-container');
    const chatbotWindow = document.querySelector('.chatbot-window');
    const chatbotClose = document.querySelector('.chatbot-close');
    const chatbotInput = document.querySelector('.chatbot-input');
    const chatbotSend = document.querySelector('.chatbot-send');
    const chatbotBody = document.querySelector('.chatbot-body');
    
    if (!chatbotButton || !chatbotWindow) {
        return;
    }
    
    // Toggle chatbot window
    chatbotButton.addEventListener('click', () => {
        chatbotWindow.classList.toggle('active');
        if (chatbotWindow.classList.contains('active')) {
            // NO auto-focus to prevent mobile keyboard popup
            // Add welcome message if first time opening
            if (chatbotBody.children.length === 0) {
                addWelcomeMessage();
            }
        }
    });
    
    // Close chatbot
    if (chatbotClose) {
        chatbotClose.addEventListener('click', () => {
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
}

// ============================================
// WELCOME MESSAGE
// ============================================
function addWelcomeMessage() {
    const welcomeMsg = `
        <div class="chat-message assistant-message">
            <div class="message-content">
                <div class="message-avatar">
                    <img src="images/VPLogoNoText.PNG" alt="Vault Phoenix">
                </div>
                <div class="message-text">
                    <strong>Welcome to $Ember Token Presale!</strong><br><br>
                    I'm here to help you learn about our revolutionary crypto token powering AR gaming rewards. Ask me about:
                    <ul style="margin: 10px 0; padding-left: 20px;">
                        <li>$Ember token presale details & pricing</li>
                        <li>Token allocation & vesting schedules</li>
                        <li>Investment benefits & ROI potential</li>
                        <li>Staking rewards & governance rights</li>
                        <li>How to participate in the presale</li>
                    </ul>
                    What would you like to know?
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
// SEND MESSAGE TO CLAUDE API - NO AUTO-FOCUS
// ============================================
async function sendMessage() {
    const chatbotInput = document.querySelector('.chatbot-input');
    const chatbotBody = document.querySelector('.chatbot-body');
    const chatbotSend = document.querySelector('.chatbot-send');
    
    if (!chatbotInput || !chatbotBody || !chatbotSend) return;
    
    const message = chatbotInput.value.trim();
    
    if (!message || isTyping) return;
    
    // Check if API key is configured
    if (CLAUDE_API_KEY === 'YOUR_CLAUDE_API_KEY_HERE') {
        addMessage('user', message);
        addMessage('assistant', '⚠️ API key not configured. Please add your Claude API key to enable chat functionality. Get your key at: https://console.anthropic.com/');
        chatbotInput.value = '';
        return;
    }
    
    // Add user message to chat
    addMessage('user', message);
    chatbotInput.value = '';
    chatbotInput.disabled = true;
    chatbotSend.disabled = true;
    isTyping = true;
    
    // Show typing indicator
    showTypingIndicator();
    
    try {
        // Prepare messages for API
        const messages = [
            ...conversationHistory,
            { role: 'user', content: message }
        ];
        
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
        
        // Remove typing indicator
        removeTypingIndicator();
        
        // Extract assistant's response
        const assistantMessage = data.content[0].text;
        
        // Add to conversation history
        conversationHistory.push(
            { role: 'user', content: message },
            { role: 'assistant', content: assistantMessage }
        );
        
        // Add assistant message to chat
        addMessage('assistant', assistantMessage);
        
    } catch (error) {
        removeTypingIndicator();
        
        let errorMessage = '❌ Sorry, I encountered an error. ';
        
        if (error.message.includes('401')) {
            errorMessage += 'Invalid API key. Please check your configuration.';
        } else if (error.message.includes('429')) {
            errorMessage += 'Rate limit exceeded. Please try again in a moment.';
        } else if (error.message.includes('500') || error.message.includes('529')) {
            errorMessage += 'Claude API is temporarily unavailable. Please try again.';
        } else {
            errorMessage += 'Please try again or contact us at contact@vaultphoenix.com';
        }
        
        addMessage('assistant', errorMessage);
    } finally {
        chatbotInput.disabled = false;
        chatbotSend.disabled = false;
        isTyping = false;
        // NO auto-focus - let user tap input manually on mobile
    }
}

// ============================================
// ADD MESSAGE TO CHAT
// ============================================
function addMessage(role, content) {
    const chatbotBody = document.querySelector('.chatbot-body');
    if (!chatbotBody) return;
    
    const messageDiv = document.createElement('div');
    messageDiv.className = `chat-message ${role}-message`;
    
    if (role === 'user') {
        // User messages - NO avatar, just bubble on far right
        messageDiv.innerHTML = `
            <div class="message-content">
                <div class="message-text">${escapeHtml(content)}</div>
            </div>
        `;
    } else {
        // Claude messages - Avatar on left, bubble next to it
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
// TYPING INDICATOR
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
    let formatted = escapeHtml(text);
    
    // Bold text
    formatted = formatted.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    
    // Bullet points
    formatted = formatted.replace(/^- (.+)$/gm, '<li>$1</li>');
    formatted = formatted.replace(/(<li>.*<\/li>)/s, '<ul>$1</ul>');
    
    // Line breaks
    formatted = formatted.replace(/\n/g, '<br>');
    
    return formatted;
}

// ============================================
// IMMEDIATE BACKGROUND FIX
// ============================================
(function() {
    document.documentElement.style.background = '#0f0f0f';
    if (document.body) {
        document.body.style.background = 'linear-gradient(135deg, #0f0f0f 0%, #1a1a1a 25%, #2d1810 50%, #451a03 75%, #7c2d12 100%)';
        document.body.style.opacity = '1';
    }
})();

// ============================================
// DOM CONTENT LOADED - INITIALIZE EVERYTHING
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    console.log('🔥🪙 $Ember Token page loading...');
    
    // Set dark background immediately
    document.body.style.background = 'linear-gradient(135deg, #0f0f0f 0%, #1a1a1a 25%, #2d1810 50%, #451a03 75%, #7c2d12 100%)';
    document.body.style.opacity = '1';
    document.body.classList.add('loaded');
    
    // Initialize $Ember-specific features
    // NOTE: Countdown is ONLY handled by shared-script.js now
    initializePresaleCalculator();
    initializeChatbot();
    
    console.log('🔥🪙 $Ember page features initialized');
    console.log('🔥🪙 Countdown timer is managed by shared-script.js');
});

// ============================================
// PRESALE CALCULATOR - WITH DEBOUNCED INPUT & VALIDATION
// ============================================
function initializePresaleCalculator() {
    const investmentInput = document.getElementById('investment-amount');
    const emberTokensDisplay = document.getElementById('ember-tokens');
    const totalInvestmentDisplay = document.getElementById('total-investment');
    
    if (!investmentInput) return;
    
    const TOKEN_PRICE = 0.003; // $0.003 per token
    const MIN_INVESTMENT = 10;
    const MAX_INVESTMENT = 50000;
    
    function validateAndCalculate() {
        const investment = parseFloat(investmentInput.value) || 0;
        
        // Validation with color feedback
        if (investment < MIN_INVESTMENT) {
            investmentInput.style.borderColor = '#ef4444';
            investmentInput.style.backgroundColor = 'rgba(239, 68, 68, 0.1)';
        } else if (investment > MAX_INVESTMENT) {
            investmentInput.style.borderColor = '#ef4444';
            investmentInput.style.backgroundColor = 'rgba(239, 68, 68, 0.1)';
        } else {
            investmentInput.style.borderColor = '#4ade80';
            investmentInput.style.backgroundColor = 'rgba(74, 222, 128, 0.1)';
        }
        
        // Calculate tokens
        const tokens = investment / TOKEN_PRICE;
        
        // Update displays
        if (emberTokensDisplay) {
            emberTokensDisplay.textContent = tokens.toLocaleString('en-US', {
                minimumFractionDigits: 0,
                maximumFractionDigits: 0
            });
        }
        
        if (totalInvestmentDisplay) {
            totalInvestmentDisplay.textContent = `$${investment.toLocaleString('en-US', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            })}`;
        }
    }
    
    // Add debounced input event listener (150ms delay)
    const debouncedCalculate = window.debounce ? window.debounce(validateAndCalculate, 150) : validateAndCalculate;
    investmentInput.addEventListener('input', debouncedCalculate);
    
    // Also validate on blur (when user clicks away)
    investmentInput.addEventListener('blur', validateAndCalculate);
    
    // Initial calculation
    validateAndCalculate();
}

// ============================================
// INTERACTIVE FEEDBACK FOR CTA BUTTONS
// ============================================
document.querySelectorAll('.cta-button, .presale-cta-button, .join-waitlist-btn').forEach(button => {
    button.addEventListener('mouseenter', function() {
        this.style.filter = 'brightness(1.1) saturate(1.2)';
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

// ============================================
// SCROLL PROGRESS INDICATOR
// ============================================
function createScrollIndicator() {
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

createScrollIndicator();

// ============================================
// IMAGE ERROR HANDLING
// ============================================
document.querySelectorAll('img').forEach(img => {
    img.addEventListener('error', function() {
        this.style.opacity = '0.5';
        this.alt = 'Image loading...';
    });
    
    img.addEventListener('load', function() {
        this.style.opacity = '1';
    });
});

// ============================================
// ENHANCED PAGE LOAD HANDLING
// ============================================
window.addEventListener('load', () => {
    // Add glow effect to logo
    const logoIcon = document.querySelector('.logo-icon');
    if (logoIcon) {
        logoIcon.style.filter = 'drop-shadow(0 0 15px rgba(215, 51, 39, 0.8))';
    }
    
    console.log('🔥🪙 $Ember Token page fully loaded!');
});
