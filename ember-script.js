// Vault Phoenix - $Ember Token Page Interactive JavaScript
// UPDATED: Fixed chatbot with proper message alignment and scroll prevention
// FIXED: Removed auto-focus to prevent keyboard popup on mobile
// User messages: NO avatar, pushed to far right
// Claude messages: VP logo avatar on left
// Background scroll prevented with overscroll-behavior

// ============================================
// CLAUDE API CONFIGURATION
// ============================================
const CLAUDE_API_KEY = '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'; // ← Replace with your actual API key
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
// INITIALIZE CHATBOT - FIXED: No Auto-Focus
// ============================================
function initializeChatbot() {
    console.log('🤖 Initializing $Ember Token Chatbot...');
    
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
    
    console.log('🤖 $Ember Token Chatbot initialized successfully!');
}

// ============================================
// WELCOME MESSAGE - UPDATED WITH PROPER ALIGNMENT
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
// SEND MESSAGE TO CLAUDE API - FIXED: No Auto-Focus
// ============================================
async function sendMessage() {
    const chatbotInput = document.querySelector('.chatbot-input');
    const chatbotBody = document.querySelector('.chatbot-body');
    const chatbotSend = document.querySelector('.chatbot-send');
    
    if (!chatbotInput || !chatbotBody || !chatbotSend) return;
    
    const message = chatbotInput.value.trim();
    
    if (!message || isTyping) return;
    
    // Check if API key is configured
    if (CLAUDE_API_KEY === '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') {
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
        
        // Add to conversation history
        conversationHistory.push(
            { role: 'user', content: message },
            { role: 'assistant', content: assistantMessage }
        );
        
        // Add assistant message to chat
        addMessage('assistant', assistantMessage);
        
    } catch (error) {
        console.error('🤖 Chat Error:', error);
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
        // FIXED: Removed chatbotInput.focus() - let user tap input manually on mobile
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
// REST OF THE EMBER-SCRIPT.JS FILE CONTINUES...
// ============================================

// FIXED: Immediately prevent flash by setting dark background
(function() {
    document.documentElement.style.background = '#0f0f0f';
    if (document.body) {
        document.body.style.background = 'linear-gradient(135deg, #0f0f0f 0%, #1a1a1a 25%, #2d1810 50%, #451a03 75%, #7c2d12 100%)';
        document.body.style.opacity = '1';
    }
})();

// DOM Content Loaded - Initialize Everything
document.addEventListener('DOMContentLoaded', function() {
    console.log('🔥🪙 $Ember Token Page Loading...');
    
    // Set dark background immediately
    document.body.style.background = 'linear-gradient(135deg, #0f0f0f 0%, #1a1a1a 25%, #2d1810 50%, #451a03 75%, #7c2d12 100%)';
    document.body.style.opacity = '1';
    document.body.classList.add('loaded');
    
    // Initialize all features
    initializePresaleCountdown();
    initializePresaleCalculator();
    initializeChatbot(); // Initialize chatbot
    
    console.log('🔥🪙 $Ember Token Page loaded successfully!');
    console.log('🤖 $Ember Token Chatbot ready!');
});

// ============================================
// PRESALE COUNTDOWN TIMER
// ============================================
function initializePresaleCountdown() {
    const targetDate = new Date('November 1, 2025 00:00:00 UTC');
    
    function updateCountdown() {
        const now = new Date().getTime();
        const distance = targetDate.getTime() - now;
        
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        // Update display elements
        const daysEl = document.getElementById('countdown-days');
        const hoursEl = document.getElementById('countdown-hours');
        const minutesEl = document.getElementById('countdown-minutes');
        const secondsEl = document.getElementById('countdown-seconds');
        
        if (daysEl) daysEl.textContent = days.toString().padStart(2, '0');
        if (hoursEl) hoursEl.textContent = hours.toString().padStart(2, '0');
        if (minutesEl) minutesEl.textContent = minutes.toString().padStart(2, '0');
        if (secondsEl) secondsEl.textContent = seconds.toString().padStart(2, '0');
        
        // If countdown is finished
        if (distance < 0) {
            if (daysEl) daysEl.textContent = '00';
            if (hoursEl) hoursEl.textContent = '00';
            if (minutesEl) minutesEl.textContent = '00';
            if (secondsEl) secondsEl.textContent = '00';
        }
    }
    
    // Update every second
    updateCountdown();
    setInterval(updateCountdown, 1000);
}

// ============================================
// PRESALE CALCULATOR
// ============================================
function initializePresaleCalculator() {
    const investmentInput = document.getElementById('investment-amount');
    const tokensDisplay = document.getElementById('tokens-received');
    const valueDisplay = document.getElementById('future-value');
    const roiDisplay = document.getElementById('roi-percentage');
    
    if (!investmentInput) return;
    
    const TOKEN_PRICE = 0.003; // $0.003 per token
    const PRICE_MULTIPLIERS = [2, 5, 10]; // 2x, 5x, 10x scenarios
    
    function calculateTokens() {
        const investment = parseFloat(investmentInput.value) || 0;
        const tokens = investment / TOKEN_PRICE;
        
        // Update tokens received
        if (tokensDisplay) {
            tokensDisplay.textContent = tokens.toLocaleString('en-US', {
                minimumFractionDigits: 0,
                maximumFractionDigits: 0
            });
        }
        
        // Calculate potential values (using middle scenario - 5x)
        const futureValue = investment * PRICE_MULTIPLIERS[1]; // 5x
        const roi = ((futureValue - investment) / investment) * 100;
        
        if (valueDisplay) {
            valueDisplay.textContent = `$${futureValue.toLocaleString('en-US', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            })}`;
        }
        
        if (roiDisplay) {
            roiDisplay.textContent = `${roi.toFixed(0)}%`;
        }
        
        // Update scenario cards
        updateScenarioCards(investment, tokens);
    }
    
    function updateScenarioCards(investment, tokens) {
        PRICE_MULTIPLIERS.forEach((multiplier, index) => {
            const priceEl = document.getElementById(`scenario-${index + 1}-price`);
            const valueEl = document.getElementById(`scenario-${index + 1}-value`);
            const roiEl = document.getElementById(`scenario-${index + 1}-roi`);
            
            if (priceEl && valueEl && roiEl) {
                const newPrice = TOKEN_PRICE * multiplier;
                const futureValue = investment * multiplier;
                const roi = ((futureValue - investment) / investment) * 100;
                
                priceEl.textContent = `$${newPrice.toFixed(3)}`;
                valueEl.textContent = `$${futureValue.toLocaleString('en-US', {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2
                })}`;
                roiEl.textContent = `+${roi.toFixed(0)}%`;
            }
        });
    }
    
    // Add input event listener
    investmentInput.addEventListener('input', calculateTokens);
    
    // Initial calculation
    calculateTokens();
}

// Enhanced navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 100;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Enhanced scroll reveal animation
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -80px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.classList.add('revealed');
            }, index * 100);
        }
    });
}, observerOptions);

document.querySelectorAll('.scroll-reveal').forEach(el => {
    observer.observe(el);
});

// Mobile Menu System
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            if (navLinks.classList.contains('mobile-active')) {
                navLinks.classList.remove('mobile-active');
                mobileMenuBtn.innerHTML = '☰';
                document.body.style.overflow = '';
            } else {
                navLinks.classList.add('mobile-active');
                mobileMenuBtn.innerHTML = '✕';
                document.body.style.overflow = 'hidden';
            }
        });

        // Close menu when clicking nav links
        const navLinksArray = navLinks.querySelectorAll('a');
        navLinksArray.forEach((link) => {
            link.addEventListener('click', function() {
                navLinks.classList.remove('mobile-active');
                mobileMenuBtn.innerHTML = '☰';
                document.body.style.overflow = '';
            });
        });

        // Close on escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && navLinks.classList.contains('mobile-active')) {
                navLinks.classList.remove('mobile-active');
                mobileMenuBtn.innerHTML = '☰';
                document.body.style.overflow = '';
            }
        });

        // Close when clicking outside
        document.addEventListener('click', function(e) {
            if (navLinks.classList.contains('mobile-active') && 
                !navLinks.contains(e.target) && 
                !mobileMenuBtn.contains(e.target)) {
                navLinks.classList.remove('mobile-active');
                mobileMenuBtn.innerHTML = '☰';
                document.body.style.overflow = '';
            }
        });
    }
});

// Enhanced interactive feedback for CTA buttons
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

// Scroll progress indicator
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

// Image error handling
document.querySelectorAll('img').forEach(img => {
    img.addEventListener('error', function() {
        console.warn('🔥🪙 Image failed to load:', this.src);
        this.style.opacity = '0.5';
        this.alt = 'Image loading...';
    });
    
    img.addEventListener('load', function() {
        this.style.opacity = '1';
    });
});

// Enhanced page load handling
window.addEventListener('load', () => {
    console.log('🔥🪙 $Ember Token page fully loaded!');
    
    // Add glow effect to logo
    const logoIcon = document.querySelector('.logo-icon');
    if (logoIcon) {
        logoIcon.style.filter = 'drop-shadow(0 0 15px rgba(215, 51, 39, 0.8))';
    }
    
    // Performance check
    setTimeout(() => {
        const countdownDays = document.getElementById('countdown-days');
        if (countdownDays && countdownDays.textContent !== '--') {
            console.log('🔥🪙 SUCCESS: Presale countdown is active!');
        }
        
        const tokensDisplay = document.getElementById('tokens-received');
        if (tokensDisplay) {
            console.log('🔥🪙 SUCCESS: Presale calculator is active!');
        }
    }, 500);
});

// Console welcome message
console.log('%c🔥🪙 $EMBER TOKEN - PRESALE LAUNCHING SOON', 'color: #f0a500; font-size: 24px; font-weight: bold; text-shadow: 2px 2px 4px rgba(0,0,0,0.3);');
console.log('%c🚀 Powering AR Crypto Gaming Revolution', 'color: #fb923c; font-size: 14px; font-weight: bold;');
console.log('%c📧 Contact: contact@vaultphoenix.com | 📱 (949) 357-4416', 'color: #374151; font-size: 14px;');
console.log('%c🔥🪙 Join the presale November 1, 2025 at $0.003 per token!', 'color: #d73327; font-size: 12px; font-style: italic;');

// Performance monitoring
window.addEventListener('load', () => {
    const loadTime = performance.now();
    console.log(`%c🔥🪙 $Ember page loaded in ${Math.round(loadTime)}ms - Ready for presale!`, 'color: #22c55e; font-weight: bold;');
});
