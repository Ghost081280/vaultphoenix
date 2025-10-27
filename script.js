// ============================================
// VAULT PHOENIX - INTERACTIVE JAVASCRIPT
// ============================================
// Phoenix Rising from Digital Ashes - Crypto Gaming Edition
// SENIOR JS ENGINEERING: Mobile-First, Performance-Optimized
// PRODUCTION READY: Clean, maintainable, and scalable code
// VERSION: 2.0 - Complete Mobile Optimization
// ============================================

'use strict';

// ============================================
// CLAUDE API CONFIGURATION
// ============================================
const CLAUDE_API_KEY = 'YOUR_API_KEY_HERE'; // ← Replace with your actual API key from console.anthropic.com
const CLAUDE_API_URL = 'https://api.anthropic.com/v1/messages';
const CLAUDE_MODEL = 'claude-sonnet-4-20250514';

// Chat state management
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
// DEVICE DETECTION & PERFORMANCE
// ============================================

/**
 * Detect device capabilities and set performance flags
 */
const DeviceInfo = {
    isMobile: /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),
    isIOS: /iPhone|iPad|iPod/i.test(navigator.userAgent),
    isAndroid: /Android/i.test(navigator.userAgent),
    isSafari: /^((?!chrome|android).)*safari/i.test(navigator.userAgent),
    supportsTouch: 'ontouchstart' in window || navigator.maxTouchPoints > 0,
    screenWidth: window.innerWidth,
    screenHeight: window.innerHeight,
    pixelRatio: window.devicePixelRatio || 1,
    prefersReducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    
    /**
     * Check if device is low-end for performance optimization
     */
    isLowEndDevice() {
        const memory = navigator.deviceMemory || 4;
        const cores = navigator.hardwareConcurrency || 2;
        return memory < 4 || cores < 4 || this.isMobile;
    },
    
    /**
     * Get optimal particle count based on device
     */
    getOptimalParticleCount() {
        if (this.prefersReducedMotion) return 0;
        if (this.screenWidth < 480) return 3;
        if (this.screenWidth < 768) return 4;
        if (this.isLowEndDevice()) return 4;
        return 6;
    }
};

// ============================================
// UTILITY FUNCTIONS
// ============================================

/**
 * Debounce function for performance optimization
 * Prevents excessive function calls during rapid events
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
 * Throttle function for scroll/resize events
 * Ensures function runs at most once per interval
 */
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

/**
 * Check if element is in viewport
 * Used for lazy loading and scroll animations
 */
function isInViewport(element, threshold = 0) {
    if (!element) return false;
    const rect = element.getBoundingClientRect();
    const windowHeight = window.innerHeight || document.documentElement.clientHeight;
    const windowWidth = window.innerWidth || document.documentElement.clientWidth;
    
    return (
        rect.top >= -threshold &&
        rect.left >= -threshold &&
        rect.bottom <= windowHeight + threshold &&
        rect.right <= windowWidth + threshold
    );
}

/**
 * Safely query DOM element with error handling
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
 * Safely query all DOM elements with error handling
 */
function safeQueryAll(selector, context = document) {
    try {
        return Array.from(context.querySelectorAll(selector));
    } catch (error) {
        console.warn(`Failed to query selector: ${selector}`, error);
        return [];
    }
}

/**
 * Request animation frame with fallback
 */
const requestAnimFrame = window.requestAnimationFrame || 
                         window.webkitRequestAnimationFrame || 
                         window.mozRequestAnimationFrame || 
                         function(callback) { setTimeout(callback, 1000 / 60); };

/**
 * Mobile-friendly smooth scroll
 */
function smoothScrollTo(element, duration = 300) {
    if (!element) return;
    
    const targetPosition = element.getBoundingClientRect().top + window.pageYOffset;
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    let startTime = null;
    
    function animation(currentTime) {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const run = ease(timeElapsed, startPosition, distance, duration);
        window.scrollTo(0, run);
        if (timeElapsed < duration) requestAnimFrame(animation);
    }
    
    function ease(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t + b;
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
    }
    
    requestAnimFrame(animation);
}

// ============================================
// CHATBOT INITIALIZATION - MOBILE OPTIMIZED
// ============================================

/**
 * Initialize Claude API Chatbot with mobile-first design
 */
function initializeChatbot() {
    console.log('🤖 Initializing Claude API Chatbot (Mobile-First)...');
    
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
    
    // Toggle chatbot window
    chatbotButton.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        console.log('🤖 Chatbot button clicked');
        
        const isActive = chatbotWindow.classList.contains('active');
        
        if (!isActive) {
            chatbotWindow.classList.add('active');
            
            // Add welcome message if first time opening
            if (chatbotBody && chatbotBody.children.length === 0) {
                addWelcomeMessage();
            }
            
            // Focus input on desktop, but not on mobile to prevent keyboard issues
            if (!DeviceInfo.isMobile && chatbotInput) {
                setTimeout(() => chatbotInput.focus(), 300);
            }
            
            // Prevent body scroll on mobile when chatbot is open
            if (DeviceInfo.isMobile) {
                document.body.style.overflow = 'hidden';
            }
        } else {
            closeChatbot();
        }
    });
    
    // Close chatbot
    if (chatbotClose) {
        chatbotClose.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            closeChatbot();
        });
    }
    
    // Close on backdrop click (mobile UX)
    chatbotWindow.addEventListener('click', (e) => {
        if (e.target === chatbotWindow) {
            closeChatbot();
        }
    });
    
    // Send message on button click
    if (chatbotSend) {
        chatbotSend.addEventListener('click', (e) => {
            e.preventDefault();
            sendMessage();
        });
    }
    
    // Send message on Enter key (Shift+Enter for new lines)
    if (chatbotInput) {
        chatbotInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                sendMessage();
            }
        });
        
        // iOS-specific: Prevent zoom on focus
        if (DeviceInfo.isIOS) {
            chatbotInput.style.fontSize = '16px';
            chatbotInput.setAttribute('autocomplete', 'off');
            chatbotInput.setAttribute('autocorrect', 'off');
            chatbotInput.setAttribute('autocapitalize', 'off');
        }
        
        // Auto-resize textarea on mobile
        if (DeviceInfo.isMobile) {
            chatbotInput.addEventListener('input', autoResizeTextarea);
        }
    }
    
    // Handle orientation changes on mobile
    if (DeviceInfo.isMobile) {
        window.addEventListener('orientationchange', () => {
            if (chatbotWindow.classList.contains('active')) {
                setTimeout(() => {
                    if (chatbotBody) {
                        chatbotBody.scrollTop = chatbotBody.scrollHeight;
                    }
                }, 300);
            }
        });
    }
    
    console.log('🤖 Chatbot initialized successfully!');
}

/**
 * Close chatbot window
 */
function closeChatbot() {
    const chatbotWindow = safeQuery('.chatbot-window');
    if (!chatbotWindow) return;
    
    console.log('🤖 Chatbot closed');
    chatbotWindow.classList.remove('active');
    
    // Restore body scroll on mobile
    if (DeviceInfo.isMobile) {
        document.body.style.overflow = '';
    }
}

/**
 * Auto-resize textarea for mobile input
 */
function autoResizeTextarea() {
    this.style.height = 'auto';
    this.style.height = Math.min(this.scrollHeight, 120) + 'px';
}

// ============================================
// WELCOME MESSAGE
// ============================================

/**
 * Add welcome message to chatbot
 */
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
    requestAnimFrame(() => {
        chatbotBody.scrollTop = chatbotBody.scrollHeight;
    });
}

// ============================================
// SEND MESSAGE TO CLAUDE API
// ============================================

/**
 * Send message to Claude API with error handling
 */
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
    if (!CLAUDE_API_KEY || CLAUDE_API_KEY === 'YOUR_API_KEY_HERE') {
        addMessage('user', message);
        addMessage('assistant', '⚠️ API key not configured. Please add your Claude API key to enable chat functionality. Get your key at: https://console.anthropic.com/');
        chatbotInput.value = '';
        chatbotInput.style.height = 'auto';
        return;
    }
    
    // Add user message to chat
    addMessage('user', message);
    chatbotInput.value = '';
    chatbotInput.style.height = 'auto';
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
        if (!DeviceInfo.isMobile && window.innerWidth > 768) {
            chatbotInput.focus();
        }
    }
}

// ============================================
// ADD MESSAGE TO CHAT
// ============================================

/**
 * Add message to chat window
 */
function addMessage(role, content) {
    const chatbotBody = safeQuery('.chatbot-body');
    if (!chatbotBody) {
        console.error('🤖 Chatbot body not found');
        return;
    }
    
    const messageDiv = document.createElement('div');
    messageDiv.className = `chat-message ${role}-message`;
    
    if (role === 'user') {
        // User messages - bubble on right, no avatar
        messageDiv.innerHTML = `
            <div class="message-content">
                <div class="message-text">${escapeHtml(content)}</div>
            </div>
        `;
    } else {
        // Assistant messages - avatar on left, bubble next to it
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
    requestAnimFrame(() => {
        chatbotBody.scrollTop = chatbotBody.scrollHeight;
    });
}

// ============================================
// TYPING INDICATOR
// ============================================

/**
 * Show typing indicator
 */
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
    requestAnimFrame(() => {
        chatbotBody.scrollTop = chatbotBody.scrollHeight;
    });
}

/**
 * Remove typing indicator
 */
function removeTypingIndicator() {
    const typingIndicator = safeQuery('.typing-indicator');
    if (typingIndicator) {
        typingIndicator.remove();
    }
}

// ============================================
// MESSAGE FORMATTING
// ============================================

/**
 * Escape HTML to prevent XSS
 */
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

/**
 * Format message with markdown-style formatting
 */
function formatMessage(text) {
    let formatted = escapeHtml(text);
    
    // Bold text
    formatted = formatted.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    
    // Bullet points
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

/**
 * Initialize mobile-friendly allocation cards
 */
function initializeMobileAllocationCards() {
    // Only on mobile devices
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
// PAGE INITIALIZATION
// ============================================

// Immediately prevent flash by setting dark background
(function() {
    document.documentElement.style.background = '#0f0f0f';
    if (document.body) {
        document.body.style.background = 'linear-gradient(135deg, #0f0f0f 0%, #1a1a1a 25%, #2d1810 50%, #451a03 75%, #7c2d12 100%)';
        document.body.style.opacity = '1';
    }
})();

/**
 * DOM Content Loaded - Initialize all features
 */
document.addEventListener('DOMContentLoaded', function() {
    console.log('🔥🪙 Vault Phoenix loading (Mobile-Optimized)...');
    
    // Ensure dark background
    document.body.style.background = 'linear-gradient(135deg, #0f0f0f 0%, #1a1a1a 25%, #2d1810 50%, #451a03 75%, #7c2d12 100%)';
    document.body.style.opacity = '1';
    document.body.classList.add('loaded');
    
    // Log device info
    console.log('📱 Device:', {
        mobile: DeviceInfo.isMobile,
        width: DeviceInfo.screenWidth,
        touch: DeviceInfo.supportsTouch,
        reducedMotion: DeviceInfo.prefersReducedMotion
    });
    
    // Initialize features
    initializeChatbot();
    initializeMobileAllocationCards();
    preloadCriticalImages();
    initializeCryptoCoinImage();
    initializeEmberCoinImage();
    initializeCryptoBenefits();
    initializeEmberHighlights();
    createScrollProgressIndicator();
    
    // Create floating particles (optimized for device)
    createFloatingParticles();
    
    // Initialize observers
    initializeScrollRevealObserver();
    initializeStatsAnimationObserver();
    
    // Initialize interactions
    initializeCardEffects();
    initializeGalleryAutoRotation();
    initializeCTAFeedback();
    
    // Mobile-specific optimizations
    if (DeviceInfo.isMobile) {
        optimizeMobilePerformance();
    }
    
    console.log('🔥🪙 Vault Phoenix initialized successfully!');
});

// ============================================
// GALLERY FUNCTIONS
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
// SCROLL REVEAL OBSERVER
// ============================================

/**
 * Initialize intersection observer for scroll reveals
 */
function initializeScrollRevealObserver() {
    const observerOptions = {
        threshold: 0.05,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Stagger animations for better visual effect
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
// INTERACTIVE CARD EFFECTS
// ============================================

/**
 * Initialize hover effects for interactive cards
 */
function initializeCardEffects() {
    // Skip hover effects on touch devices
    if (DeviceInfo.supportsTouch && DeviceInfo.isMobile) {
        console.log('🎴 Skipping hover effects for touch device');
        return;
    }
    
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
            
            // Add glow effect
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
// STATS ANIMATION
// ============================================

/**
 * Initialize stats animation observer
 */
function initializeStatsAnimationObserver() {
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

/**
 * Animate stats with counting effect
 */
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

let currentLaptopImageIndex = 0;
const laptopImageRotation = [
    { src: 'images/CampaignControl.PNG', title: 'Campaign Control' },
    { src: 'images/DashboardOverview.PNG', title: 'Dashboard Overview' },
    { src: 'images/AdvertiserManagement.PNG', title: 'Advertiser Management' },
    { src: 'images/AirdropCenter.PNG', title: 'Airdrop Center' },
    { src: 'images/Walletandfunding.PNG', title: 'Wallet and Funding' },
    { src: 'images/AppbuilderSDK.PNG', title: 'App Builder SDK' }
];

/**
 * Initialize gallery auto-rotation
 */
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
    
    // Pause auto-rotation when user interacts
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

/**
 * Initialize CTA button feedback
 */
function initializeCTAFeedback() {
    // Email CTAs
    safeQueryAll('a[href^="mailto:"]').forEach(link => {
        link.addEventListener('click', (e) => {
            console.log('📧 Email CTA clicked:', link.href);
            link.style.transform = 'scale(0.95)';
            setTimeout(() => {
                link.style.transform = '';
            }, 150);
        });
    });
    
    // SMS CTAs
    safeQueryAll('a[href^="sms:"]').forEach(link => {
        link.addEventListener('click', (e) => {
            console.log('📱 SMS CTA clicked:', link.href);
            link.style.transform = 'scale(0.95)';
            setTimeout(() => {
                link.style.transform = '';
            }, 150);
        });
    });
    
    console.log('📲 CTA button feedback initialized');
}

// ============================================
// PAGE LOAD HANDLING
// ============================================

/**
 * Window load event - final optimizations
 */
window.addEventListener('load', () => {
    console.log('🔥🪙 Vault Phoenix fully loaded!');
    
    // Add phoenix flame effect to logo
    const logoIcon = safeQuery('.logo-icon');
    if (logoIcon) {
        logoIcon.style.filter = 'drop-shadow(0 0 15px rgba(215, 51, 39, 0.8))';
    }
    
    // Performance monitoring
    setTimeout(() => {
        const floatingCoins = safeQuery('.hero-floating-coins');
        if (floatingCoins) {
            console.log('✅ Floating coins active');
        }
        
        const mainScreenshot = safeQuery('#mainScreenshot');
        if (mainScreenshot && mainScreenshot.src.includes('images/')) {
            console.log('✅ Gallery images loaded');
        }
    }, 500);
    
    // Performance timing
    const loadTime = performance.now();
    console.log(`%c🔥 Page loaded in ${Math.round(loadTime)}ms`, 'color: #22c55e; font-weight: bold;');
});

// ============================================
// IMAGE ERROR HANDLING
// ============================================

/**
 * Handle image loading errors
 */
safeQueryAll('img').forEach(img => {
    img.addEventListener('error', function() {
        console.warn('⚠️ Image failed to load:', this.src);
        this.style.opacity = '0.5';
        this.alt = 'Image loading...';
    });
    
    img.addEventListener('load', function() {
        this.style.opacity = '1';
    });
});

// ============================================
// IMAGE PRELOADING
// ============================================

/**
 * Preload critical images
 */
function preloadCriticalImages() {
    const criticalImages = [
        // App Screenshots
        'images/ARView.jpg',
        'images/EmberAirdrop.jpg',
        'images/EmberCollected.jpg',
        'images/EmberNearby.jpg',
        'images/EmberVault.jpg',
        'images/HuntMap.jpg',
        // Management System
        'images/CampaignControl.PNG',
        'images/DashboardOverview.PNG',
        'images/AdvertiserManagement.PNG',
        'images/AirdropCenter.PNG',
        'images/Walletandfunding.PNG',
        'images/AppbuilderSDK.PNG',
        // Core Images
        'images/VPEmberCoin.PNG',
        'images/PhoenixHoldingCoin.PNG',
        'images/VPLogoNoText.PNG'
    ];
    
    criticalImages.forEach(src => {
        const img = new Image();
        img.src = src;
    });
    
    console.log('🖼️ Image preloading initiated');
}

// ============================================
// FLOATING PARTICLES - MOBILE OPTIMIZED
// ============================================

/**
 * Create floating crypto particles (optimized for performance)
 */
function createFloatingParticles() {
    const hero = safeQuery('.hero');
    if (!hero) {
        console.warn('⚠️ Hero section not found');
        return;
    }
    
    // Skip particles if user prefers reduced motion
    if (DeviceInfo.prefersReducedMotion) {
        console.log('⚠️ Reduced motion enabled - skipping particles');
        return;
    }
    
    console.log('🪙 Creating floating particles...');
    
    // Create container
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
    
    // Get optimal particle count
    const particleCount = DeviceInfo.getOptimalParticleCount();
    
    // Optimized positions
    const coinPositions = [
        { top: '15%', left: '10%', delay: '0s', duration: '6s' },
        { top: '70%', left: '8%', delay: '1s', duration: '7s' },
        { top: '25%', right: '12%', delay: '2s', duration: '8s' },
        { top: '65%', right: '10%', delay: '3s', duration: '6s' },
        { top: '10%', left: '80%', delay: '4s', duration: '7s' },
        { bottom: '20%', right: '85%', delay: '5s', duration: '9s' }
    ].slice(0, particleCount);
    
    coinPositions.forEach((pos, index) => {
        const coin = document.createElement('div');
        coin.className = `hero-coin hero-coin-${index + 1}`;
        
        const coinImg = document.createElement('img');
        coinImg.src = 'images/VPEmberCoin.PNG';
        coinImg.alt = 'VP Ember Coin';
        coinImg.className = 'hero-crypto-coin-icon';
        coinImg.loading = 'lazy';
        
        // Mobile-optimized sizing
        const size = DeviceInfo.isMobile ? 'clamp(20px, 4vw, 35px)' : 'clamp(35px, 5vw, 50px)';
        const opacity = DeviceInfo.isMobile ? '0.5' : '0.7';
        
        coinImg.style.cssText = `
            width: ${size};
            height: ${size};
            object-fit: contain;
            filter: drop-shadow(0 0 8px rgba(240, 165, 0, 0.6));
            opacity: ${opacity};
            border-radius: 50%;
            will-change: transform;
        `;
        
        coinImg.onerror = function() {
            console.warn('⚠️ Coin image failed, using emoji fallback');
            const fallback = document.createElement('div');
            fallback.innerHTML = '🪙';
            fallback.style.cssText = `
                font-size: ${size};
                filter: drop-shadow(0 0 8px rgba(240, 165, 0, 0.6));
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
    });
    
    hero.insertBefore(floatingCoins, hero.firstChild);
    
    // Add animation CSS if not present
    if (!document.querySelector('#heroCoinFloatAnimation')) {
        const style = document.createElement('style');
        style.id = 'heroCoinFloatAnimation';
        style.textContent = `
            @keyframes heroCoinFloat {
                0%, 100% { 
                    transform: translateY(0px) rotate(0deg) scale(1); 
                }
                25% { 
                    transform: translateY(-20px) rotate(90deg) scale(1.1); 
                }
                50% { 
                    transform: translateY(-10px) rotate(180deg) scale(0.9); 
                }
                75% { 
                    transform: translateY(-25px) rotate(270deg) scale(1.15); 
                }
            }
            
            @media (prefers-reduced-motion: reduce) {
                .hero-coin {
                    animation: none !important;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    console.log(`🪙 ${particleCount} floating particles created`);
}

// ============================================
// COIN IMAGE INTERACTIONS
// ============================================

/**
 * Initialize crypto coin image interactions
 */
function initializeCryptoCoinImage() {
    const cryptoImage = safeQuery('.phoenix-coin-image');
    if (!cryptoImage) return;
    
    // Skip hover effects on mobile
    if (DeviceInfo.isMobile) return;
    
    cryptoImage.addEventListener('mouseenter', function() {
        this.style.filter = 'drop-shadow(0 0 30px rgba(251, 146, 60, 0.8)) brightness(1.1)';
    });
    
    cryptoImage.addEventListener('mouseleave', function() {
        this.style.filter = '';
    });
    
    console.log('🪙 Crypto coin interactions initialized');
}

/**
 * Initialize ember coin image interactions
 */
function initializeEmberCoinImage() {
    const emberCoinImage = safeQuery('.phoenix-holding-coin-redesigned');
    if (!emberCoinImage) return;
    
    // Skip hover effects on mobile
    if (DeviceInfo.isMobile) return;
    
    emberCoinImage.addEventListener('mouseenter', function() {
        this.style.filter = 'drop-shadow(0 0 50px rgba(240, 165, 0, 0.9)) brightness(1.2)';
        this.style.transform = 'scale(1.1) translateY(-10px)';
    });
    
    emberCoinImage.addEventListener('mouseleave', function() {
        this.style.filter = '';
        this.style.transform = '';
    });
    
    console.log('🪙 Ember coin interactions initialized');
}

// ============================================
// CRYPTO BENEFITS ANIMATIONS
// ============================================

/**
 * Initialize crypto benefits animations
 */
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
                    if (icon && !DeviceInfo.prefersReducedMotion) {
                        if (!document.querySelector('#coinBounceAnimation')) {
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

/**
 * Initialize ember highlights animations
 */
function initializeEmberHighlights() {
    const highlights = safeQueryAll('.ember-highlight-redesigned');
    if (!highlights.length) return;
    
    const highlightsObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.transform = 'translateX(0)';
                    entry.target.style.opacity = '1';
                    
                    const emoji = entry.target.querySelector('.highlight-emoji-redesigned');
                    if (emoji && !DeviceInfo.prefersReducedMotion) {
                        if (!document.querySelector('#emberFlickerAnimation')) {
                            const style = document.createElement('style');
                            style.id = 'emberFlickerAnimation';
                            style.textContent = `
                                @keyframes emberFlicker {
                                    0%, 100% { transform: scale(1); }
                                    25% { transform: scale(1.1); }
                                    50% { transform: scale(0.95); }
                                    75% { transform: scale(1.05); }
                                }
                            `;
                            document.head.appendChild(style);
                        }
                        emoji.style.animation = 'emberFlicker 1s ease-in-out';
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
    
    console.log('🔥 Ember highlights animations initialized');
}

// ============================================
// CTA BUTTON ENHANCEMENTS
// ============================================

/**
 * Enhance CTA buttons with effects
 */
safeQueryAll('.cta-button, .cta-primary, .cta-secondary, .demo-button, .join-presale-button-redesigned, .demo-button-enhanced').forEach(button => {
    // Skip effects on mobile or reduced motion
    if (DeviceInfo.isMobile || DeviceInfo.prefersReducedMotion) return;
    
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

console.log('✨ CTA enhancements initialized');

// ============================================
// SCROLL PROGRESS INDICATOR
// ============================================

/**
 * Create scroll progress indicator
 */
function createScrollProgressIndicator() {
    const indicator = document.createElement('div');
    indicator.className = 'phoenix-scroll-progress';
    indicator.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        height: 3px;
        background: linear-gradient(90deg, #d73327, #fb923c, #f0a500);
        z-index: 9999;
        width: 0%;
        transition: width 0.1s ease;
        box-shadow: 0 2px 5px rgba(215, 51, 39, 0.3);
    `;
    document.body.appendChild(indicator);
    
    const updateProgress = throttle(() => {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        indicator.style.width = scrolled + '%';
    }, 50);
    
    window.addEventListener('scroll', updateProgress, { passive: true });
    
    console.log('📊 Scroll progress indicator initialized');
}

// ============================================
// MOBILE PERFORMANCE OPTIMIZATIONS
// ============================================

/**
 * Apply mobile-specific performance optimizations
 */
function optimizeMobilePerformance() {
    console.log('📱 Applying mobile optimizations...');
    
    // Disable hover effects on touch devices
    document.body.classList.add('touch-device');
    
    // Optimize scroll performance
    const scrollElements = safeQueryAll('.chatbot-body, .allocation-cards-mobile');
    scrollElements.forEach(el => {
        el.style.webkitOverflowScrolling = 'touch';
        el.style.overscrollBehavior = 'contain';
    });
    
    // Reduce animation complexity
    if (DeviceInfo.isLowEndDevice()) {
        document.body.classList.add('low-end-device');
        console.log('📱 Low-end device optimizations applied');
    }
    
    // Handle orientation changes
    window.addEventListener('orientationchange', debounce(() => {
        console.log('📱 Orientation changed');
        DeviceInfo.screenWidth = window.innerWidth;
        DeviceInfo.screenHeight = window.innerHeight;
    }, 300));
    
    console.log('📱 Mobile optimizations complete');
}

// ============================================
// RESIZE HANDLER - MOBILE OPTIMIZED
// ============================================

/**
 * Handle window resize events
 */
window.addEventListener('resize', debounce(() => {
    DeviceInfo.screenWidth = window.innerWidth;
    DeviceInfo.screenHeight = window.innerHeight;
    
    console.log('📐 Window resized:', DeviceInfo.screenWidth, 'x', DeviceInfo.screenHeight);
}, 250));

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
        console.log('🔥🪙 BONUS ACTIVATED!');
        
        // Create coin rain (reduced on mobile)
        const coinCount = DeviceInfo.isMobile ? 15 : 30;
        
        for (let i = 0; i < coinCount; i++) {
            setTimeout(() => {
                const coin = document.createElement('div');
                coin.innerHTML = '🪙';
                coin.style.cssText = `
                    position: fixed;
                    font-size: ${Math.random() * 20 + 25}px;
                    left: ${Math.random() * 100}vw;
                    top: -50px;
                    z-index: 10000;
                    pointer-events: none;
                    animation: coinFall ${Math.random() * 2 + 2}s linear forwards;
                `;
                
                document.body.appendChild(coin);
                setTimeout(() => coin.remove(), 4000);
            }, i * 100);
        }
        
        // Add animation if not present
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
        
        konamiCode = [];
    }
});

// ============================================
// CONSOLE MESSAGES
// ============================================

console.log('%c🔥🪙 VAULT PHOENIX', 'color: #d73327; font-size: 24px; font-weight: bold;');
console.log('%c🚀 AR Crypto Gaming Revolution', 'color: #fb923c; font-size: 16px; font-weight: bold;');
console.log('%c📧 contact@vaultphoenix.com | 📱 (949) 357-4416', 'color: #374151; font-size: 12px;');
console.log('%c💡 Senior Engineering - Mobile-First Architecture', 'color: #22c55e; font-size: 12px; font-weight: bold;');
console.log('Try the Konami Code for a surprise! ⬆️⬆️⬇️⬇️⬅️➡️⬅️➡️BA');
