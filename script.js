// Vault Phoenix - Interactive JavaScript
// Phoenix Rising from Digital Ashes - Crypto Gaming Edition
// SENIOR JS ENGINEERING: Optimized for CSS alignment and performance
// UPDATED: Perfect integration with new CSS glow system
// ENHANCED: Chatbot with proper message alignment and mobile optimization
// PRODUCTION READY: Clean, maintainable, and scalable code

// ============================================
// CLAUDE API CONFIGURATION
// ============================================
const CLAUDE_API_KEY = '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'; // ← Replace with your actual API key
const CLAUDE_API_URL = 'https://api.anthropic.com/v1/messages';
const CLAUDE_MODEL = 'claude-sonnet-4-20250514';

// Chat state
let conversationHistory = [];
let isTyping = false;

// System prompt for Vault Phoenix context
const SYSTEM_PROMPT = `You are an AI assistant for Vault Phoenix, a revolutionary AR crypto gaming platform that combines GPS & Beacon location technology with blockchain rewards for location-based marketing campaigns.

Key Information about Vault Phoenix:
- White-label AR crypto gaming platform launching campaigns in 24 hours
- Uses GPS (outdoor) and Beacon (indoor) technology for precise location targeting
- Offers $100 FREE $Ember tokens with every service activation
- Two main solutions:
  1. White-Label Solution: Starting at $499 setup + $149/mo hosting
  2. SDK Integration: Free SDK, management from $49/mo (available early 2026)
- Battle-tested: 6+ years development, 12+ successful AR games
- Industries served: Sports, Radio, Tourism, Retail, Entertainment, Culinary, Healthcare, Education, Automotive
- Revenue generation: $10K-$75K per month through premium location placements
- $Ember Token presale launching November 1, 2025 (166.7M tokens, $0.003 price)

Your role is to:
- Answer questions about Vault Phoenix services, pricing, and technology
- Explain how AR crypto gaming works with GPS & Beacon technology
- Provide information about the $Ember token and presale
- Help users understand ROI and revenue opportunities
- Guide users toward contacting contact@vaultphoenix.com for setup
- Be enthusiastic, professional, and helpful
- Keep responses concise but informative

Always maintain a professional yet friendly tone. If asked about technical implementation details beyond your knowledge, recommend contacting the team directly.`;

// ============================================
// UTILITY FUNCTIONS
// ============================================

/**
 * Debounce function for performance optimization
 */
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

/**
 * Check if element is in viewport
 */
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

/**
 * Safely query DOM element
 */
function safeQuery(selector, context = document) {
    try {
        return context.querySelector(selector);
    } catch (error) {
        console.warn(`Failed to query selector: ${selector}`, error);
        return null;
    }
}

/**
 * Safely query all DOM elements
 */
function safeQueryAll(selector, context = document) {
    try {
        return context.querySelectorAll(selector);
    } catch (error) {
        console.warn(`Failed to query selector: ${selector}`, error);
        return [];
    }
}

// ============================================
// CHATBOT INITIALIZATION - CSS ALIGNED
// ============================================
function initializeChatbot() {
    console.log('🤖 Initializing Claude API Chatbot with CSS alignment...');
    
    const chatbotButton = safeQuery('.chatbot-button-container');
    const chatbotWindow = safeQuery('.chatbot-window');
    const chatbotClose = safeQuery('.chatbot-close');
    const chatbotInput = safeQuery('.chatbot-input');
    const chatbotSend = safeQuery('.chatbot-send');
    const chatbotBody = safeQuery('.chatbot-body');
    
    if (!chatbotButton || !chatbotWindow) {
        console.warn('🤖 Chatbot elements not found - skipping initialization');
        return;
    }
    
    console.log('🤖 Chatbot elements found successfully');
    
    // Toggle chatbot window with smooth animation
    chatbotButton.addEventListener('click', () => {
        console.log('🤖 Chatbot button clicked');
        const isActive = chatbotWindow.classList.contains('active');
        
        if (!isActive) {
            chatbotWindow.classList.add('active');
            // Add welcome message if first time opening
            if (chatbotBody && chatbotBody.children.length === 0) {
                addWelcomeMessage();
            }
        } else {
            chatbotWindow.classList.remove('active');
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
    
    // Send message on Enter key (but allow Shift+Enter for new lines)
    if (chatbotInput) {
        chatbotInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                sendMessage();
            }
        });
        
        // Prevent iOS zoom on focus by ensuring 16px font size
        if (/iPhone|iPad|iPod/i.test(navigator.userAgent)) {
            chatbotInput.style.fontSize = '16px';
        }
    }
    
    console.log('🤖 Chatbot initialized successfully with CSS-aligned classes!');
}

// ============================================
// WELCOME MESSAGE - CSS ALIGNED
// ============================================
function addWelcomeMessage() {
    const chatbotBody = safeQuery('.chatbot-body');
    if (!chatbotBody) return;
    
    const welcomeMsg = document.createElement('div');
    welcomeMsg.className = 'chat-message assistant-message';
    
    welcomeMsg.innerHTML = `
        <div class="message-content">
            <div class="message-avatar">
                <img src="images/VPLogoNoText.PNG" alt="Vault Phoenix" loading="lazy">
            </div>
            <div class="message-text">
                <strong>Welcome to Vault Phoenix!</strong><br><br>
                I'm here to help you learn about our revolutionary AR crypto gaming platform. Ask me about:
                <ul style="margin: 10px 0; padding-left: 20px;">
                    <li>White-label AR crypto gaming solutions</li>
                    <li>GPS & Beacon location technology</li>
                    <li>$Ember token presale details</li>
                    <li>Pricing and ROI opportunities</li>
                    <li>Industry-specific use cases</li>
                </ul>
                What would you like to know?
            </div>
        </div>
    `;
    
    chatbotBody.innerHTML = '';
    chatbotBody.appendChild(welcomeMsg);
    
    // Smooth scroll to bottom
    requestAnimationFrame(() => {
        chatbotBody.scrollTop = chatbotBody.scrollHeight;
    });
}

// ============================================
// SEND MESSAGE TO CLAUDE API - ENHANCED
// ============================================
async function sendMessage() {
    const chatbotInput = safeQuery('.chatbot-input');
    const chatbotBody = safeQuery('.chatbot-body');
    const chatbotSend = safeQuery('.chatbot-send');
    
    if (!chatbotInput || !chatbotBody || !chatbotSend) {
        console.error('🤖 Required chatbot elements not found');
        return;
    }
    
    const message = chatbotInput.value.trim();
    
    if (!message || isTyping) {
        console.log('🤖 Empty message or already typing - ignoring');
        return;
    }
    
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
        
        // Keep conversation history manageable (last 10 exchanges)
        if (conversationHistory.length > 20) {
            conversationHistory = conversationHistory.slice(-20);
        }
        
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
        } else if (error.message.includes('Failed to fetch') || error.message.includes('NetworkError')) {
            errorMessage += 'Network connection issue. Please check your internet connection.';
        } else {
            errorMessage += 'Please try again or contact us at contact@vaultphoenix.com';
        }
        
        addMessage('assistant', errorMessage);
    } finally {
        chatbotInput.disabled = false;
        chatbotSend.disabled = false;
        isTyping = false;
        
        // Focus input for better UX (desktop only)
        if (window.innerWidth > 768) {
            chatbotInput.focus();
        }
    }
}

// ============================================
// ADD MESSAGE TO CHAT - CSS ALIGNED
// ============================================
function addMessage(role, content) {
    const chatbotBody = safeQuery('.chatbot-body');
    if (!chatbotBody) {
        console.error('🤖 Chatbot body not found');
        return;
    }
    
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
        // Assistant messages - Avatar on left, bubble next to it
        messageDiv.innerHTML = `
            <div class="message-content">
                <div class="message-avatar">
                    <img src="images/VPLogoNoText.PNG" alt="Vault Phoenix" loading="lazy">
                </div>
                <div class="message-text">${formatMessage(content)}</div>
            </div>
        `;
    }
    
    chatbotBody.appendChild(messageDiv);
    
    // Smooth scroll to bottom with animation frame
    requestAnimationFrame(() => {
        chatbotBody.scrollTop = chatbotBody.scrollHeight;
    });
}

// ============================================
// TYPING INDICATOR - CSS ALIGNED
// ============================================
function showTypingIndicator() {
    const chatbotBody = safeQuery('.chatbot-body');
    if (!chatbotBody) return;
    
    const typingDiv = document.createElement('div');
    typingDiv.className = 'chat-message assistant-message typing-indicator';
    typingDiv.innerHTML = `
        <div class="message-content">
            <div class="message-avatar">
                <img src="images/VPLogoNoText.PNG" alt="Vault Phoenix" loading="lazy">
            </div>
            <div class="typing-dots">
                <span></span><span></span><span></span>
            </div>
        </div>
    `;
    
    chatbotBody.appendChild(typingDiv);
    
    // Smooth scroll to bottom
    requestAnimationFrame(() => {
        chatbotBody.scrollTop = chatbotBody.scrollHeight;
    });
}

function removeTypingIndicator() {
    const typingIndicator = safeQuery('.typing-indicator');
    if (typingIndicator) {
        typingIndicator.remove();
    }
}

// ============================================
// MESSAGE FORMATTING - ENHANCED
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
    
    // Bullet points (more robust)
    const lines = formatted.split('\n');
    let inList = false;
    let result = [];
    
    for (let line of lines) {
        const trimmed = line.trim();
        if (trimmed.startsWith('- ') || trimmed.startsWith('• ')) {
            if (!inList) {
                result.push('<ul style="margin: 10px 0; padding-left: 20px;">');
                inList = true;
            }
            result.push(`<li>${trimmed.substring(2)}</li>`);
        } else {
            if (inList) {
                result.push('</ul>');
                inList = false;
            }
            if (trimmed) {
                result.push(trimmed + '<br>');
            }
        }
    }
    
    if (inList) {
        result.push('</ul>');
    }
    
    formatted = result.join('');
    
    // Clean up extra breaks
    formatted = formatted.replace(/(<br>)+/g, '<br>');
    formatted = formatted.replace(/^<br>|<br>$/g, '');
    
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
    
    const tableContainer = safeQuery('.allocation-table .table-container');
    if (!tableContainer) {
        console.log('📱 Table container not found - skipping mobile allocation cards');
        return;
    }
    
    // Token allocation data
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
// PAGE INITIALIZATION - OPTIMIZED
// ============================================

// Immediately prevent flash by setting dark background
(function() {
    document.documentElement.style.background = '#0f0f0f';
    if (document.body) {
        document.body.style.background = 'linear-gradient(135deg, #0f0f0f 0%, #1a1a1a 25%, #2d1810 50%, #451a03 75%, #7c2d12 100%)';
        document.body.style.opacity = '1';
    }
})();

// DOM Content Loaded - Initialize all features
document.addEventListener('DOMContentLoaded', function() {
    console.log('🔥🪙 Main page loading - optimized initialization...');
    
    // Ensure dark background and full opacity
    document.body.style.background = 'linear-gradient(135deg, #0f0f0f 0%, #1a1a1a 25%, #2d1810 50%, #451a03 75%, #7c2d12 100%)';
    document.body.style.opacity = '1';
    document.body.classList.add('loaded');
    
    // Initialize all features
    initializeChatbot();
    initializeMobileAllocationCards();
    preloadPhoenixCryptoImages();
    initializeCryptoCoinImage();
    initializeEmberCoinImageV3();
    initializeCryptoBenefits();
    initializeEmberHighlightsV3();
    createPhoenixCryptoScrollIndicator();
    
    // Create floating coins immediately without delay
    createPhoenixCryptoParticles();
    
    // Initialize scroll reveal observer
    initializeScrollRevealObserver();
    
    // Initialize interactive card effects
    initializeCardEffects();
    
    // Initialize stats animation observer
    initializeStatsAnimation();
    
    // Initialize gallery auto-rotation
    initializeGalleryAutoRotation();
    
    // Initialize CTA button feedback
    initializeCTAFeedback();
    
    console.log('🔥🪙 Main page initialized successfully!');
    console.log('🤖 Claude API Chatbot ready with CSS-aligned classes!');
    console.log('📱 Mobile allocation cards ready!');
});

// ============================================
// GALLERY FUNCTIONS - ENHANCED
// ============================================

/**
 * Change main phone gallery image
 */
function changeImage(imageSrc, title) {
    const mainImg = safeQuery('#mainScreenshot');
    const thumbs = safeQueryAll('.simple-thumb');
    
    if (!mainImg) return;
    
    mainImg.style.opacity = '0.7';
    
    setTimeout(() => {
        mainImg.src = imageSrc;
        mainImg.alt = title;
        mainImg.style.opacity = '1';
    }, 150);
    
    // Update active states
    thumbs.forEach(thumb => {
        thumb.classList.remove('active');
        const thumbImg = thumb.querySelector('img');
        if (thumbImg && thumbImg.src.includes(imageSrc.split('/').pop())) {
            thumb.classList.add('active');
        }
    });
}

/**
 * Change main laptop gallery image
 */
function changeLaptopImage(imageSrc, title) {
    const mainImg = safeQuery('#mainLaptopScreenshot');
    const thumbs = safeQueryAll('.simple-thumb-laptop');
    
    if (!mainImg) return;
    
    mainImg.style.opacity = '0.7';
    
    setTimeout(() => {
        mainImg.src = imageSrc;
        mainImg.alt = title;
        mainImg.style.opacity = '1';
    }, 150);
    
    // Update active states
    thumbs.forEach(thumb => {
        thumb.classList.remove('active');
        const thumbImg = thumb.querySelector('img');
        if (thumbImg && thumbImg.src.includes(imageSrc.split('/').pop())) {
            thumb.classList.add('active');
        }
    });
}

// ============================================
// SCROLL REVEAL OBSERVER - OPTIMIZED
// ============================================

function initializeScrollRevealObserver() {
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
    
    safeQueryAll('.scroll-reveal').forEach(el => {
        observer.observe(el);
    });
    
    console.log('👁️ Scroll reveal observer initialized');
}

// ============================================
// INTERACTIVE CARD EFFECTS - CSS ALIGNED
// ============================================

function initializeCardEffects() {
    const cards = safeQueryAll('.feature-card, .use-case-card, .simple-thumb, .simple-thumb-laptop, .crypto-benefit, .ember-highlight-redesigned');
    
    cards.forEach(card => {
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
            
            // Add glow effect for feature and use case cards
            if (this.classList.contains('feature-card') || this.classList.contains('use-case-card')) {
                this.style.boxShadow = '0 30px 80px rgba(215, 51, 39, 0.2)';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            if (!this.classList.contains('active')) {
                this.style.transform = 'translateY(0) scale(1)';
                if (this.classList.contains('crypto-benefit') || this.classList.contains('ember-highlight-redesigned')) {
                    this.style.transform = 'translateX(0)';
                }
                this.style.boxShadow = '';
            }
        });
    });
    
    console.log('🎴 Interactive card effects initialized');
}

// ============================================
// STATS ANIMATION - OPTIMIZED
// ============================================

function initializeStatsAnimation() {
    const heroSection = safeQuery('.hero');
    if (!heroSection) return;
    
    const heroObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setTimeout(animateStats, 500);
                heroObserver.disconnect();
            }
        });
    });
    
    heroObserver.observe(heroSection);
    
    console.log('📊 Stats animation observer initialized');
}

function animateStats() {
    const stats = safeQueryAll('.stat-number, .revenue-number');
    
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

// ============================================
// AUTO-ROTATE GALLERY - OPTIMIZED
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

let currentLaptopImageIndex = 0;
const laptopImageRotation = [
    { src: 'images/CampaignControl.PNG', title: 'Campaign Control' },
    { src: 'images/DashboardOverview.PNG', title: 'Dashboard Overview' },
    { src: 'images/AdvertiserManagement.PNG', title: 'Advertiser Management' },
    { src: 'images/AirdropCenter.PNG', title: 'Airdrop Center' },
    { src: 'images/Walletandfunding.PNG', title: 'Wallet and Funding' },
    { src: 'images/AppbuilderSDK.PNG', title: 'App Builder SDK' }
];

function initializeGalleryAutoRotation() {
    let autoRotateInterval;
    let autoRotateLaptopInterval;
    
    function autoRotateGallery() {
        const showcaseSection = safeQuery('#showcase');
        if (!showcaseSection) return;
        
        const rect = showcaseSection.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
        
        if (isVisible) {
            currentImageIndex = (currentImageIndex + 1) % imageRotation.length;
            const currentImage = imageRotation[currentImageIndex];
            changeImage(currentImage.src, currentImage.title);
        }
    }
    
    function autoRotateLaptopGallery() {
        const showcaseSection = safeQuery('#showcase');
        if (!showcaseSection) return;
        
        const rect = showcaseSection.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
        
        if (isVisible) {
            currentLaptopImageIndex = (currentLaptopImageIndex + 1) % laptopImageRotation.length;
            const currentImage = laptopImageRotation[currentLaptopImageIndex];
            changeLaptopImage(currentImage.src, currentImage.title);
        }
    }
    
    // Start auto-rotation after delay
    setTimeout(() => {
        autoRotateInterval = setInterval(autoRotateGallery, 4500);
        autoRotateLaptopInterval = setInterval(autoRotateLaptopGallery, 4500);
    }, 3000);
    
    // Pause auto-rotation when user interacts with thumbnails
    safeQueryAll('.simple-thumb').forEach(thumb => {
        thumb.addEventListener('click', () => {
            if (autoRotateInterval) {
                clearInterval(autoRotateInterval);
            }
            setTimeout(() => {
                autoRotateInterval = setInterval(autoRotateGallery, 4500);
            }, 15000);
        });
    });
    
    safeQueryAll('.simple-thumb-laptop').forEach(thumb => {
        thumb.addEventListener('click', () => {
            if (autoRotateLaptopInterval) {
                clearInterval(autoRotateLaptopInterval);
            }
            setTimeout(() => {
                autoRotateLaptopInterval = setInterval(autoRotateLaptopGallery, 4500);
            }, 15000);
        });
    });
    
    console.log('🔄 Gallery auto-rotation initialized');
}

// ============================================
// CTA BUTTON FEEDBACK
// ============================================

function initializeCTAFeedback() {
    // Email CTAs
    safeQueryAll('a[href^="mailto:"]').forEach(link => {
        link.addEventListener('click', (e) => {
            console.log('🔥🪙 Phoenix crypto email CTA ignited:', link.href);
            link.style.transform = 'scale(0.95)';
            setTimeout(() => {
                link.style.transform = '';
            }, 150);
        });
    });
    
    // SMS CTAs
    safeQueryAll('a[href^="sms:"]').forEach(link => {
        link.addEventListener('click', (e) => {
            console.log('🔥🪙 Phoenix crypto SMS CTA ignited:', link.href);
            link.style.transform = 'scale(0.95)';
            setTimeout(() => {
                link.style.transform = '';
            }, 150);
        });
    });
    
    console.log('📲 CTA button feedback initialized');
}

// ============================================
// PAGE LOAD HANDLING - ENHANCED
// ============================================

window.addEventListener('load', () => {
    console.log('🔥🪙 Main page fully loaded and ready!');
    
    // Add phoenix flame effect to logo
    const logoIcon = safeQuery('.logo-icon');
    if (logoIcon) {
        logoIcon.style.filter = 'drop-shadow(0 0 15px rgba(215, 51, 39, 0.8))';
    }
    
    // Performance monitoring
    setTimeout(() => {
        const floatingCoins = safeQuery('.hero-floating-coins');
        if (floatingCoins) {
            console.log('🔥🪙 SUCCESS: Floating VPEmberCoin.PNG coins are active!');
        } else {
            console.warn('🔥🪙 WARNING: Floating coins not found!');
        }
        
        const mainScreenshot = safeQuery('#mainScreenshot');
        if (mainScreenshot && (mainScreenshot.src.includes('ARView') || mainScreenshot.src.includes('Ember'))) {
            console.log('🔥🪙 SUCCESS: App screenshots loaded in gallery!');
        }
        
        const mainLaptopScreenshot = safeQuery('#mainLaptopScreenshot');
        if (mainLaptopScreenshot && mainLaptopScreenshot.src.includes('.PNG')) {
            console.log('🔥🪙 SUCCESS: Management system screenshots loaded!');
        }
    }, 500);
    
    // Performance timing
    const loadTime = performance.now();
    console.log(`%c🔥🪙 Phoenix crypto arose in ${Math.round(loadTime)}ms - Ready to collect VPEmberCoins!`, 'color: #22c55e; font-weight: bold;');
});

// ============================================
// IMAGE ERROR HANDLING - ENHANCED
// ============================================

safeQueryAll('img').forEach(img => {
    img.addEventListener('error', function() {
        console.warn('🔥🪙 Image failed to load:', this.src);
        this.style.opacity = '0.5';
        this.alt = 'Phoenix crypto image rising...';
    });
    
    img.addEventListener('load', function() {
        this.style.opacity = '1';
    });
});

// ============================================
// IMAGE PRELOADING - OPTIMIZED
// ============================================

function preloadPhoenixCryptoImages() {
    const criticalImages = [
        // App Screenshots
        'images/ARView.jpg',
        'images/EmberAirdrop.jpg',
        'images/EmberCollected.jpg',
        'images/EmberNearby.jpg',
        'images/EmberVault.jpg',
        'images/HuntMap.jpg',
        // Management System Screenshots
        'images/CampaignControl.PNG',
        'images/DashboardOverview.PNG',
        'images/AdvertiserManagement.PNG',
        'images/AirdropCenter.PNG',
        'images/Walletandfunding.PNG',
        'images/AppbuilderSDK.PNG',
        // Core Images
        'images/VPEmberCoin.PNG',
        'images/PhoenixHoldingCoin.PNG',
        'images/VPLogoNoText.PNG',
        'images/PhoenixBot.PNG',
        'images/VPEmberFlame.svg'
    ];
    
    criticalImages.forEach(src => {
        const img = new Image();
        img.src = src;
        img.onload = () => console.log('🔥🪙 Preloaded:', src);
        img.onerror = () => console.warn('🔥🪙 Preload failed:', src);
    });
    
    console.log('🖼️ Image preloading initiated');
}

// ============================================
// FLOATING CRYPTO PARTICLES - CSS ALIGNED
// ============================================

function createPhoenixCryptoParticles() {
    const hero = safeQuery('.hero');
    if (!hero) {
        console.warn('🔥🪙 Hero section not found for floating coins');
        return;
    }
    
    console.log('🔥🪙 Creating floating crypto coins with VPEmberCoin.PNG...');
    
    // Create floating coins container with proper CSS classes
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
    
    // Optimized coin positions
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
        
        // Create image element with CSS-aligned classes
        const coinImg = document.createElement('img');
        coinImg.src = 'images/VPEmberCoin.PNG';
        coinImg.alt = 'VP Ember Coin';
        coinImg.className = 'hero-crypto-coin-icon';
        coinImg.loading = 'lazy';
        coinImg.style.cssText = `
            width: clamp(35px, 5vw, 50px);
            height: clamp(35px, 5vw, 50px);
            object-fit: contain;
            filter: drop-shadow(0 0 8px rgba(240, 165, 0, 0.6));
            transition: all 0.3s ease;
            opacity: 0.7;
            border-radius: 50%;
        `;
        
        // Handle image load
        coinImg.onload = () => {
            console.log(`🔥🪙 VPEmberCoin.PNG loaded for coin ${index + 1}`);
        };
        
        coinImg.onerror = () => {
            console.warn(`🔥🪙 VPEmberCoin.PNG failed for coin ${index + 1}, using fallback`);
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
        
        // Apply positioning
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
        console.log(`🔥🪙 Created floating VPEmberCoin ${index + 1}`);
    });
    
    // Insert at beginning of hero section
    hero.insertBefore(floatingCoins, hero.firstChild);
    console.log('🔥🪙 Floating VPEmberCoin coins container added to hero');
    
    // Add CSS animation if not already present
    if (!document.querySelector('#heroCoinFloatAnimation')) {
        const style = document.createElement('style');
        style.id = 'heroCoinFloatAnimation';
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
}

// ============================================
// COIN IMAGE INTERACTIONS - ENHANCED
// ============================================

function initializeCryptoCoinImage() {
    const cryptoImage = safeQuery('.phoenix-coin-image');
    if (!cryptoImage) return;
    
    cryptoImage.addEventListener('mouseenter', function() {
        this.style.filter = 'drop-shadow(0 0 30px rgba(251, 146, 60, 0.8)) brightness(1.1)';
    });
    
    cryptoImage.addEventListener('mouseleave', function() {
        this.style.filter = '';
    });
    
    // Subtle floating animation
    let time = 0;
    const animateFloat = () => {
        time += 0.02;
        const sideMovement = Math.sin(time) * 8;
        const upDownMovement = Math.cos(time * 0.8) * 3;
        if (cryptoImage && cryptoImage.isConnected) {
            cryptoImage.style.transform = `translateX(${sideMovement}px) translateY(${upDownMovement}px)`;
        }
    };
    
    setInterval(animateFloat, 50);
    
    console.log('🪙 Crypto coin image interactions initialized');
}

function initializeEmberCoinImageV3() {
    const emberCoinImage = safeQuery('.phoenix-holding-coin-redesigned');
    if (!emberCoinImage) return;
    
    emberCoinImage.addEventListener('mouseenter', function() {
        this.style.filter = 'drop-shadow(0 0 50px rgba(240, 165, 0, 0.9)) brightness(1.2)';
        this.style.transform = 'scale(1.1) translateY(-10px)';
    });
    
    emberCoinImage.addEventListener('mouseleave', function() {
        this.style.filter = '';
        this.style.transform = '';
    });
    
    console.log('🪙 Ember coin V3 image interactions initialized');
}

// ============================================
// CRYPTO BENEFITS ANIMATIONS - CSS ALIGNED
// ============================================

function initializeCryptoBenefits() {
    const benefits = safeQueryAll('.crypto-benefit');
    if (!benefits.length) return;
    
    const benefitsObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.transform = 'translateX(0)';
                    entry.target.style.opacity = '1';
                    
                    const icon = entry.target.querySelector('.benefit-icon');
                    if (icon && !document.querySelector('#coinBounceAnimation')) {
                        const style = document.createElement('style');
                        style.id = 'coinBounceAnimation';
                        style.textContent = `
                            @keyframes coinBounce {
                                0% { transform: scale(1) rotateY(0deg); }
                                50% { transform: scale(1.2) rotateY(180deg); }
                                100% { transform: scale(1) rotateY(360deg); }
                            }
                        `;
                        document.head.appendChild(style);
                    }
                    
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
    
    console.log('💰 Crypto benefits animations initialized');
}

function initializeEmberHighlightsV3() {
    const highlights = safeQueryAll('.ember-highlight-redesigned');
    if (!highlights.length) return;
    
    const highlightsObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.transform = 'translateX(0)';
                    entry.target.style.opacity = '1';
                    
                    const emoji = entry.target.querySelector('.highlight-emoji-redesigned');
                    if (emoji && !document.querySelector('#emberFlickerV3Animation')) {
                        const style = document.createElement('style');
                        style.id = 'emberFlickerV3Animation';
                        style.textContent = `
                            @keyframes emberFlickerV3 {
                                0%, 100% { transform: scale(1); filter: drop-shadow(0 0 5px rgba(240, 165, 0, 0.6)); }
                                25% { transform: scale(1.1); filter: drop-shadow(0 0 8px rgba(240, 165, 0, 0.8)); }
                                50% { transform: scale(0.95); filter: drop-shadow(0 0 3px rgba(240, 165, 0, 0.5)); }
                                75% { transform: scale(1.05); filter: drop-shadow(0 0 6px rgba(240, 165, 0, 0.7)); }
                            }
                        `;
                        document.head.appendChild(style);
                    }
                    
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
    
    console.log('🔥 Ember highlights V3 animations initialized');
}

// ============================================
// CTA BUTTON ENHANCEMENTS - CSS ALIGNED
// ============================================

safeQueryAll('.cta-button, .cta-primary, .cta-secondary, .demo-button, .join-presale-button-redesigned, .demo-button-enhanced').forEach(button => {
    button.addEventListener('mouseenter', function() {
        this.style.filter = 'brightness(1.1) saturate(1.2)';
        
        // Add sparkle effect
        if (Math.random() > 0.7) {
            const sparkle = document.createElement('img');
            sparkle.src = 'images/VPEmberCoin.PNG';
            sparkle.alt = 'VP Ember Coin Sparkle';
            sparkle.className = 'cta-sparkle-effect';
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

// Add sparkle animation if not present
if (!document.querySelector('#sparkleAnimation')) {
    const style = document.createElement('style');
    style.id = 'sparkleAnimation';
    style.textContent = `
        @keyframes sparkle {
            0% { transform: translateY(0) scale(1); opacity: 1; }
            100% { transform: translateY(-20px) scale(0); opacity: 0; }
        }
    `;
    document.head.appendChild(style);
}

console.log('✨ CTA button enhancements initialized');

// ============================================
// SCROLL PROGRESS INDICATOR - CSS ALIGNED
// ============================================

function createPhoenixCryptoScrollIndicator() {
    const indicator = document.createElement('div');
    indicator.className = 'phoenix-scroll-progress-indicator';
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
    
    const updateProgress = debounce(() => {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        indicator.style.width = scrolled + '%';
    }, 10);
    
    window.addEventListener('scroll', updateProgress);
    
    console.log('📊 Scroll progress indicator initialized');
}

// ============================================
// EASTER EGG: KONAMI CODE - CSS ALIGNED
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
        
        // Coin rain animation
        if (!document.querySelector('#coinFallAnimation')) {
            const style = document.createElement('style');
            style.id = 'coinFallAnimation';
            style.textContent = `
                @keyframes coinFall {
                    to { 
                        transform: translateY(calc(100vh + 100px)) rotate(720deg); 
                        opacity: 0; 
                    }
                }
            `;
            document.head.appendChild(style);
        }
        
        for (let i = 0; i < 30; i++) {
            setTimeout(() => {
                const coin = document.createElement('img');
                coin.src = 'images/VPEmberCoin.PNG';
                coin.alt = 'VP Ember Bonus Coin';
                coin.className = 'bonus-coin-fall';
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
        
        konamiCode = [];
    }
});

// ============================================
// CONSOLE MESSAGES - ENHANCED
// ============================================

console.log('%c🔥🪙 VAULT PHOENIX - AR CRYPTO GAMING REVOLUTION', 'color: #d73327; font-size: 24px; font-weight: bold; text-shadow: 2px 2px 4px rgba(0,0,0,0.3);');
console.log('%c🚀 Built by Phoenix Crypto Developers - Premium AR Gaming Solutions', 'color: #fb923c; font-size: 14px; font-weight: bold;');
console.log('%c📧 Contact: contact@vaultphoenix.com | 📱 (949) 357-4416', 'color: #374151; font-size: 14px;');
console.log('%c🔥🪙 From ashes to crypto greatness - Phoenix Rising!', 'color: #d73327; font-size: 12px; font-style: italic;');
console.log('🔥🪙 Crypto Phoenix Ready - Try the Konami Code for a surprise! ⬆️⬆️⬇️⬇️⬅️➡️⬅️➡️BA');
console.log('%c💡 CSS-Aligned JavaScript - Senior Engineering Standards', 'color: #22c55e; font-size: 12px; font-weight: bold;');
