// Vault Phoenix - Interactive JavaScript
// Phoenix Rising from Digital Ashes - Crypto Gaming Edition
// UPDATED: Fixed chatbot with proper message alignment and scroll prevention
// FIXED: Removed auto-focus to prevent keyboard popup on mobile
// CLEANED: Removed duplicate code now in shared-script.js
// User messages: NO avatar, pushed to far right
// Claude messages: VP logo avatar on left
// Background scroll prevented with overscroll-behavior
// PRODUCTION READY: Faster scroll timing for smoother animations

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
// INITIALIZE CHATBOT - FIXED: No Auto-Focus
// ============================================
function initializeChatbot() {
    console.log('🤖 Initializing Claude API Chatbot...');
    
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
    
    console.log('🤖 Chatbot initialized successfully!');
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
    initializeMainCountdown();
    preloadPhoenixCryptoImages();
    initializeCryptoCoinImage();
    initializeEmberCoinImageV3();
    initializeChatbot(); // Initialize Claude API chatbot
    initializeMobileAllocationCards(); // Initialize mobile allocation cards
    initializeCryptoBenefits();
    initializeEmberHighlightsV3();
    createPhoenixCryptoScrollIndicator();
    
    // FIXED: Create floating coins immediately without delay
    createPhoenixCryptoParticles();
    
    console.log('🔥🪙 Main page loaded seamlessly from loading screen!');
    console.log('🤖 Claude API Chatbot ready!');
    console.log('📱 Mobile allocation cards initialized!');
});

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
    threshold: 0.05, // Reduced from 0.1 for earlier trigger
    rootMargin: '0px 0px -50px 0px' // Reduced from -80px for earlier trigger
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.classList.add('revealed');
            }, index * 50); // Reduced from 100ms to 50ms for faster stagger
        }
    });
}, observerOptions);

document.querySelectorAll('.scroll-reveal').forEach(el => {
    observer.observe(el);
});

// ============================================
// INTERACTIVE CARD EFFECTS
// ============================================

// Enhanced interactive card effects with phoenix crypto animation
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
        
        // Add subtle phoenix glow effect
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

// Enhanced stats animation with realistic counting and phoenix crypto theme
function animateStats() {
    const stats = document.querySelectorAll('.stat-number, .revenue-number');
    stats.forEach(stat => {
        const finalValue = stat.textContent;
        const numericValue = parseFloat(finalValue.replace(/[^\d.]/g, ''));
        
        if (numericValue && numericValue > 0) {
            let currentValue = 0;
            const duration = 2500; // Slightly longer for dramatic effect
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

// Trigger stats animation when visible
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

// UPDATED: Auto-rotate gallery showcase with NEW app screenshots
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

// Auto-rotate laptop gallery with management system screenshots
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

// Start auto-rotation after page load
let autoRotateInterval;
let autoRotateLaptopInterval;

setTimeout(() => {
    autoRotateInterval = setInterval(autoRotateGallery, 4500); // Slightly slower for better UX
    autoRotateLaptopInterval = setInterval(autoRotateLaptopGallery, 4500); // Same timing for laptop
}, 3000);

// Pause auto-rotation when user interacts with thumbnails
document.querySelectorAll('.simple-thumb').forEach(thumb => {
    thumb.addEventListener('click', () => {
        if (autoRotateInterval) {
            clearInterval(autoRotateInterval);
        }
        setTimeout(() => {
            autoRotateInterval = setInterval(autoRotateGallery, 4500);
        }, 15000); // Resume after 15 seconds
    });
});

// Pause laptop auto-rotation when user interacts with laptop thumbnails
document.querySelectorAll('.simple-thumb-laptop').forEach(thumb => {
    thumb.addEventListener('click', () => {
        if (autoRotateLaptopInterval) {
            clearInterval(autoRotateLaptopInterval);
        }
        setTimeout(() => {
            autoRotateLaptopInterval = setInterval(autoRotateLaptopGallery, 4500);
        }, 15000); // Resume after 15 seconds
    });
});

// ============================================
// CTA BUTTON FEEDBACK
// ============================================

// Enhanced form validation and UX with phoenix crypto theme
document.querySelectorAll('a[href^="mailto:"]').forEach(link => {
    link.addEventListener('click', (e) => {
        console.log('🔥🪙 Phoenix crypto email CTA ignited:', link.href);
        
        // Add subtle animation feedback
        link.style.transform = 'scale(0.95)';
        setTimeout(() => {
            link.style.transform = '';
        }, 150);
    });
});

document.querySelectorAll('a[href^="sms:"]').forEach(link => {
    link.addEventListener('click', (e) => {
        console.log('🔥🪙 Phoenix crypto SMS CTA ignited:', link.href);
        
        // Add subtle animation feedback
        link.style.transform = 'scale(0.95)';
        setTimeout(() => {
            link.style.transform = '';
        }, 150);
    });
});

// ============================================
// PAGE LOAD HANDLING
// ============================================

// FIXED: Enhanced page load handling for seamless transition
window.addEventListener('load', () => {
    // FIXED: Page is already fully loaded and visible - no additional fade-in needed
    console.log('🔥🪙 Main page fully loaded and ready!');
    
    // Optional: Add phoenix flame effect to logo after load
    const logoIcon = document.querySelector('.logo-icon');
    if (logoIcon) {
        logoIcon.style.filter = 'drop-shadow(0 0 15px rgba(215, 51, 39, 0.8))';
    }
    
    // FIXED: Performance monitoring and status checks
    setTimeout(() => {
        const floatingCoins = document.querySelector('.hero-floating-coins');
        if (floatingCoins) {
            console.log('🔥🪙 SUCCESS: Floating VPEmberCoin.PNG coins are active!');
        } else {
            console.warn('🔥🪙 WARNING: Floating coins not found!');
        }
    }, 500);
    
    // Check if NEW app gallery is working
    setTimeout(() => {
        const mainScreenshot = document.getElementById('mainScreenshot');
        if (mainScreenshot && (mainScreenshot.src.includes('ARView') || mainScreenshot.src.includes('Ember'))) {
            console.log('🔥🪙 SUCCESS: NEW App screenshots loaded in gallery!');
        } else {
            console.warn('🔥🪙 WARNING: NEW App screenshots not detected!');
        }
    }, 300);
    
    // Check if management system laptop gallery is working
    setTimeout(() => {
        const mainLaptopScreenshot = document.getElementById('mainLaptopScreenshot');
        if (mainLaptopScreenshot && mainLaptopScreenshot.src.includes('.PNG')) {
            console.log('🔥🪙 SUCCESS: Management system screenshots loaded in laptop gallery!');
        } else {
            console.warn('🔥🪙 WARNING: Management system screenshots not detected!');
        }
    }, 400);
    
    // Check if main countdown is working
    setTimeout(() => {
        const mainDays = document.getElementById('main-days');
        if (mainDays && mainDays.textContent !== '--') {
            console.log('🔥🪙 SUCCESS: Main page countdown to Nov 1, 2025 is active!');
        } else {
            console.warn('🔥🪙 WARNING: Main page countdown not working!');
        }
    }, 400);
});

// ============================================
// IMAGE ERROR HANDLING
// ============================================

// Add error handling for images with phoenix crypto fallback
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

// UPDATED: Preload critical phoenix crypto images including NEW app screenshots
function preloadPhoenixCryptoImages() {
    const criticalImages = [
        // NEW App Screenshots
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
        // Other Critical Images
        'images/VPEmberCoin.PNG',
        'images/PhoenixHoldingCoin.PNG',
        'images/VPLogoNoText.PNG',
        'images/PhoenixBot.PNG', // Chatbot image
        'images/VPEmberFlame.svg' // Ember flame SVG
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

// FIXED: Phoenix crypto coin floating effect - NOW USES CORRECT VPEmberCoin.PNG
function createPhoenixCryptoParticles() {
    const hero = document.querySelector('.hero');
    if (!hero) {
        console.warn('🔥🪙 Hero section not found for floating coins');
        return;
    }
    
    console.log('🔥🪙 Creating floating crypto coins with VPEmberCoin.PNG...');
    
    // Create floating coins container that stays strictly in background
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
    
    // FIXED: Coin positions with better spacing and visibility
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
        
        // FIXED: Create proper image element for VPEmberCoin.PNG
        const coinImg = document.createElement('img');
        coinImg.src = 'images/VPEmberCoin.PNG'; // CORRECT EMBER COIN IMAGE
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
        
        // Handle image load success/failure
        coinImg.onload = function() {
            console.log(`🔥🪙 VPEmberCoin.PNG loaded successfully for coin ${index + 1}`);
        };
        
        coinImg.onerror = function() {
            console.warn(`🔥🪙 VPEmberCoin.PNG failed to load for coin ${index + 1}, using emoji fallback`);
            // Replace with emoji fallback if image fails
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
        
        // Apply positioning with proper z-index
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
    
    // Insert at the very beginning of hero section to ensure background positioning
    hero.insertBefore(floatingCoins, hero.firstChild);
    console.log('🔥🪙 Floating VPEmberCoin coins container added to hero');
    
    // FIXED: Add working CSS animation
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
        
        /* Ensure coins stay in background but are visible */
        .hero-floating-coins,
        .hero-coin {
            z-index: 1 !important;
            pointer-events: none !important;
        }
        
        .hero-crypto-coin-icon {
            z-index: 1 !important;
            pointer-events: none !important;
        }
        
        /* Mobile responsive sizing */
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

// Enhanced crypto coin image interaction
function initializeCryptoCoinImage() {
    const cryptoImage = document.querySelector('.phoenix-coin-image');
    if (!cryptoImage) return;
    
    // Add special crypto coin glow effect on hover
    cryptoImage.addEventListener('mouseenter', function() {
        this.style.filter = 'drop-shadow(0 0 30px rgba(251, 146, 60, 0.8)) brightness(1.1)';
    });
    
    cryptoImage.addEventListener('mouseleave', function() {
        this.style.filter = '';
    });
    
    // Add subtle side-to-side floating animation
    let time = 0;
    setInterval(() => {
        time += 0.02;
        const sideMovement = Math.sin(time) * 8; // Move 8px side to side
        const upDownMovement = Math.cos(time * 0.8) * 3; // Subtle up/down movement
        cryptoImage.style.transform = `translateX(${sideMovement}px) translateY(${upDownMovement}px)`;
    }, 50);
}

// Enhanced: V3 Ember coin image interaction for the new enhanced section
function initializeEmberCoinImageV3() {
    const emberCoinImage = document.querySelector('.phoenix-holding-coin-redesigned');
    if (!emberCoinImage) return;
    
    // Add special ember coin glow effect on hover
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

// Crypto benefits animation on scroll
function initializeCryptoBenefits() {
    const benefits = document.querySelectorAll('.crypto-benefit');
    if (!benefits.length) return;
    
    const benefitsObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.transform = 'translateX(0)';
                    entry.target.style.opacity = '1';
                    
                    // Add a subtle coin bounce effect
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
    
    // Add coin bounce animation
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

// Enhanced: Ember highlights animation on scroll for the redesigned section
function initializeEmberHighlightsV3() {
    const highlights = document.querySelectorAll('.ember-highlight-redesigned');
    if (!highlights.length) return;
    
    const highlightsObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.transform = 'translateX(0)';
                    entry.target.style.opacity = '1';
                    
                    // Add ember flame flicker effect
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
    
    // Add ember flicker animation V3
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

// Enhanced interactive feedback for all CTA buttons with crypto theme
document.querySelectorAll('.cta-button, .cta-primary, .cta-secondary, .demo-button, .join-presale-button-redesigned, .demo-button-enhanced').forEach(button => {
    button.addEventListener('mouseenter', function() {
        this.style.filter = 'brightness(1.1) saturate(1.2)';
        // Add subtle coin sparkle effect using VPEmberCoin image
        if (Math.random() > 0.7) {
            const sparkle = document.createElement('img');
            sparkle.src = 'images/VPEmberCoin.PNG'; // CORRECT COIN IMAGE
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
            
            // Fallback to emoji if image fails
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

// Add sparkle animation CSS
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

// Phoenix crypto-themed scroll progress indicator
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

// Easter egg: Konami code for bonus crypto coins - UPDATED WITH VPEmberCoin.PNG
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
        // Trigger bonus crypto coin rain with VPEmberCoin.PNG
        console.log('🔥🪙 BONUS CRYPTO ACTIVATED! 🪙🔥');
        for (let i = 0; i < 30; i++) {
            setTimeout(() => {
                const coin = document.createElement('img');
                coin.src = 'images/VPEmberCoin.PNG'; // CORRECT COIN IMAGE
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
                
                // Fallback to emoji if image fails
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
        
        // Add coin fall animation
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
        
        konamiCode = []; // Reset
    }
});

// ============================================
// CONSOLE MESSAGES
// ============================================

// Console welcome message with phoenix crypto theme
console.log('%c🔥🪙 VAULT PHOENIX - AR CRYPTO GAMING REVOLUTION', 'color: #d73327; font-size: 24px; font-weight: bold; text-shadow: 2px 2px 4px rgba(0,0,0,0.3);');
console.log('%c🚀 Built by Phoenix Crypto Developers - Premium AR Gaming Solutions', 'color: #fb923c; font-size: 14px; font-weight: bold;');
console.log('%c📧 Contact: contact@vaultphoenix.com | 📱 (949) 357-4416', 'color: #374151; font-size: 14px;');
console.log('%c🔥🪙 From ashes to crypto greatness - Phoenix Rising with NEW app screenshots!', 'color: #d73327; font-size: 12px; font-style: italic;');
console.log('🔥🪙 Crypto Phoenix Ready - Try the Konami Code for a surprise! ⬆️⬆️⬇️⬇️⬅️➡️⬅️➡️BA');

// Performance monitoring with phoenix crypto theme
window.addEventListener('load', () => {
    const loadTime = performance.now();
    console.log(`%c🔥🪙 Phoenix crypto arose in ${Math.round(loadTime)}ms - Ready to collect VPEmberCoins!`, 'color: #22c55e; font-weight: bold;');
});
