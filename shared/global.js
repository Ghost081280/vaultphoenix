// ============================================
// VAULT PHOENIX v7.1 FINAL - ALL FIXES
// ============================================
// FIXED: Single status, contact@, tooltip states, instant load, footer links
// ============================================

(function() {
'use strict';

// ============================================
// SERVICE STATUS
// ============================================
let serviceStatus = {
    local: false,
    online: false
};

// ============================================
// HYBRID AI WITH STATUS
// ============================================
async function askPhoenixAI(question) {
  try {
    const offlineResponse = await fetch('/api/ask_offline', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ question }),
      signal: AbortSignal.timeout(5000)
    });

    if (offlineResponse.ok) {
      const offlineData = await offlineResponse.json();
      if (offlineData && offlineData.answer) {
        serviceStatus.local = true;
        updateChatbotStatus();
        return offlineData.answer;
      }
    }
  } catch (err) {
    serviceStatus.local = false;
  }

  try {
    const claudeResponse = await fetch('/api/claude', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ question }),
      signal: AbortSignal.timeout(10000)
    });

    if (claudeResponse.ok) {
      const claudeData = await claudeResponse.json();
      serviceStatus.online = true;
      updateChatbotStatus();

      try {
        await fetch('/api/save_learning', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ question, answer: claudeData.answer })
        });
      } catch (saveErr) {}

      return claudeData.answer;
    }
  } catch (err) {
    serviceStatus.online = false;
  }

  updateChatbotStatus();
  
  if (!serviceStatus.local && !serviceStatus.online) {
    return "I apologize, but both my AI services are currently offline. Please try again in a moment, or contact contact@vaultphoenix.com for assistance.";
  }
  
  return "Sorry, I'm having trouble processing that request right now. Please try again.";
}

// ============================================
// HARDCODED NAVIGATION
// ============================================
const NAV_LINKS = [
    { title: 'How it Works', href: '#deploy-crypto-coins' },
    { title: 'Live Demo', href: '#experience-both-systems' },
    { title: 'Get Ideas', href: '#crypto-gaming-industries' },
    { title: 'Pricing', href: '#developer-sdk-pricing' }
];

// ============================================
// FOOTER LINKS - BULLETPROOF IMPLEMENTATION
// ============================================
function populateFooterQuickLinks() {
    console.log('🔧 Starting footer Quick Links population...');
    
    // Find footer
    const footer = document.querySelector('.footer');
    if (!footer) {
        console.warn('⚠️ Footer not found');
        return false;
    }
    
    // Find Quick Links column
    const columns = footer.querySelectorAll('.footer-column');
    console.log(`📋 Found ${columns.length} footer columns`);
    
    let quickLinksColumn = null;
    columns.forEach((col, i) => {
        const heading = col.querySelector('.footer-heading');
        if (heading) {
            console.log(`Column ${i}: "${heading.textContent.trim()}"`);
            if (heading.textContent.trim() === 'Quick Links') {
                quickLinksColumn = col;
            }
        }
    });
    
    if (!quickLinksColumn) {
        console.error('❌ Quick Links column not found!');
        return false;
    }
    
    const linksContainer = quickLinksColumn.querySelector('.footer-links');
    if (!linksContainer) {
        console.error('❌ .footer-links not found in Quick Links column!');
        return false;
    }
    
    // Clear and populate
    linksContainer.innerHTML = '';
    
    const links = [
        ...NAV_LINKS,
        { title: '$Ember Token', href: 'ember-presale.html' }
    ];
    
    links.forEach((link, i) => {
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.href = link.href;
        a.textContent = link.title;
        
        if (link.href.startsWith('#')) {
            a.addEventListener('click', handleSmoothScroll);
        }
        
        li.appendChild(a);
        linksContainer.appendChild(li);
        console.log(`✅ Added link ${i + 1}: ${link.title} → ${link.href}`);
    });
    
    console.log('✅ Footer Quick Links populated successfully!');
    return true;
}

// Try multiple times with different strategies
function ensureFooterLinks() {
    if (populateFooterQuickLinks()) return;
    
    // Retry after 50ms
    setTimeout(() => {
        if (populateFooterQuickLinks()) return;
        
        // Retry after 200ms
        setTimeout(() => {
            if (populateFooterQuickLinks()) return;
            
            // Final retry after 500ms
            setTimeout(() => {
                populateFooterQuickLinks();
            }, 500);
        }, 200);
    }, 50);
}

function updateDesktopNav() {
    const nav = document.querySelector('.nav-links');
    if (!nav) return;
    
    nav.innerHTML = '';
    NAV_LINKS.forEach(link => {
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.href = link.href;
        a.textContent = link.title;
        a.addEventListener('click', handleSmoothScroll);
        li.appendChild(a);
        nav.appendChild(li);
    });
    
    const li = document.createElement('li');
    const a = document.createElement('a');
    a.href = 'ember-presale.html';
    a.className = 'ember-link';
    a.innerHTML = '<img src="images/VPEmberCoin.PNG" alt="Ember" class="nav-ember-coin">$Ember Token';
    li.appendChild(a);
    nav.appendChild(li);
}

function updateMobileNav() {
    const nav = document.querySelector('.mobile-nav-links');
    if (!nav) return;
    
    nav.innerHTML = '';
    NAV_LINKS.forEach(link => {
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.href = link.href;
        a.textContent = link.title;
        a.addEventListener('click', handleSmoothScroll);
        a.addEventListener('click', closeMobileMenu);
        li.appendChild(a);
        nav.appendChild(li);
    });
    
    const li = document.createElement('li');
    const a = document.createElement('a');
    a.href = 'ember-presale.html';
    a.className = 'ember-link';
    a.innerHTML = '<img src="images/VPEmberCoin.PNG" alt="Ember" class="nav-ember-coin">$Ember Token';
    li.appendChild(a);
    nav.appendChild(li);
}

// ============================================
// MOBILE MENU
// ============================================
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
const mobileMenuOverlay = document.getElementById('mobile-menu-overlay');
const mobileMenuClose = document.getElementById('mobile-menu-close');

function openMobileMenu(e) {
    if (e) e.preventDefault();
    if (mobileMenu && mobileMenuOverlay) {
        mobileMenu.classList.add('active');
        mobileMenuOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeMobileMenu(e) {
    if (e) e.stopPropagation();
    if (mobileMenu && mobileMenuOverlay) {
        mobileMenu.classList.remove('active');
        mobileMenuOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }
}

if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const isOpen = mobileMenu && mobileMenu.classList.contains('active');
        isOpen ? closeMobileMenu() : openMobileMenu();
    });
}

if (mobileMenuClose) {
    mobileMenuClose.addEventListener('click', closeMobileMenu);
}

if (mobileMenuOverlay) {
    mobileMenuOverlay.addEventListener('click', closeMobileMenu);
}

// ============================================
// SMOOTH SCROLLING
// ============================================
function handleSmoothScroll(e) {
    const href = this.getAttribute('href');
    if (!href || !href.includes('#')) return;
    
    e.preventDefault();
    const targetId = href.split('#')[1];
    const target = document.getElementById(targetId);
    
    if (target) {
        const navbar = document.querySelector('.navbar');
        const offset = navbar ? navbar.offsetHeight : 80;
        const targetPos = target.getBoundingClientRect().top + window.pageYOffset - offset - 20;
        
        window.scrollTo({
            top: targetPos,
            behavior: 'smooth'
        });
        
        history.pushState(null, null, `#${targetId}`);
        closeMobileMenu();
    }
}

// ============================================
// NAVBAR SCROLL
// ============================================
const navbar = document.querySelector('.navbar');

function handleNavbarScroll() {
    if (!navbar) return;
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const progress = Math.min(scrollTop / 400, 1);
    
    const start = { r: 45, g: 24, b: 16, a: 0.95 };
    const end = { r: 15, g: 15, b: 15, a: 0.98 };
    
    const r = Math.round(start.r + (end.r - start.r) * progress);
    const g = Math.round(start.g + (end.g - start.g) * progress);
    const b = Math.round(start.b + (end.b - start.b) * progress);
    const a = start.a + (end.a - start.a) * progress;
    
    navbar.style.background = `rgba(${r}, ${g}, ${b}, ${a})`;
}

window.addEventListener('scroll', handleNavbarScroll, { passive: true });

// ============================================
// SCROLL PROGRESS
// ============================================
function initScrollProgress() {
    const container = document.createElement('div');
    container.className = 'scroll-progress-container';
    const bar = document.createElement('div');
    bar.className = 'scroll-progress-bar';
    container.appendChild(bar);
    document.body.appendChild(container);
    
    window.addEventListener('scroll', () => {
        const winHeight = window.innerHeight;
        const docHeight = document.documentElement.scrollHeight;
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const percent = (scrollTop / (docHeight - winHeight)) * 100;
        bar.style.width = percent + '%';
    }, { passive: true });
}

// ============================================
// CHATBOT - INSTANT & TOOLTIP STATE MACHINE
// ============================================
let conversationHistory = [];
let isTyping = false;
let hasScrolled = false;
let scrollPosition = 0;

// TOOLTIP STATE MACHINE
function initTooltipStateMachine() {
    const container = document.querySelector('.chatbot-button-container');
    const tooltip = document.querySelector('.chatbot-tooltip');
    
    if (!container || !tooltip) return;
    
    // State 1: Visible on load (default CSS)
    
    // State 2: Hide on scroll
    window.addEventListener('scroll', () => {
        if (!hasScrolled) {
            hasScrolled = true;
            tooltip.classList.add('hidden');
        }
    }, { passive: true, once: false });
    
    // State 3: Show on hover (CSS handles this via :hover)
    // State 4: Hide when button clicked (handled in toggleChatbot)
    // State 5: Show when closed (handled in closeChatbot)
    // State 6: Hide on scroll after close (already handled by hasScrolled)
}

function initChatbot() {
    const container = document.querySelector('.chatbot-button-container');
    const window_el = document.querySelector('.chatbot-window');
    
    if (!container || !window_el) return false;
    
    // INSTANT VISIBILITY
    container.style.opacity = '1';
    container.style.visibility = 'visible';
    
    initTooltipStateMachine();
    updateChatbotStatus();
    
    // Better mobile tap
    const button = container.querySelector('.chatbot-button');
    let touchStartTime = 0;
    
    button.addEventListener('touchstart', () => {
        touchStartTime = Date.now();
    }, { passive: true });
    
    button.addEventListener('touchend', (e) => {
        if (Date.now() - touchStartTime < 300) {
            e.preventDefault();
            toggleChatbot();
        }
    });
    
    button.addEventListener('click', (e) => {
        e.preventDefault();
        toggleChatbot();
    });
    
    const closeBtn = window_el.querySelector('.chatbot-close');
    if (closeBtn) {
        closeBtn.addEventListener('click', () => closeChatbot());
    }
    
    const sendBtn = window_el.querySelector('.chatbot-send');
    if (sendBtn) {
        sendBtn.addEventListener('click', sendMessage);
    }
    
    const input = window_el.querySelector('.chatbot-input');
    if (input) {
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                sendMessage();
            }
        });
    }
    
    return true;
}

function toggleChatbot() {
    const window_el = document.querySelector('.chatbot-window');
    const container = document.querySelector('.chatbot-button-container');
    
    if (window_el.classList.contains('active')) {
        closeChatbot();
    } else {
        openChatbot();
    }
}

function openChatbot() {
    const window_el = document.querySelector('.chatbot-window');
    const container = document.querySelector('.chatbot-button-container');
    const body = document.querySelector('.chatbot-body');
    
    // Store current scroll position
    scrollPosition = window.pageYOffset || document.documentElement.scrollTop;
    
    // State 4: Hide tooltip when opening
    container.classList.add('chatbot-open');
    
    window_el.classList.add('active');
    
    // Fix body position to prevent scroll
    document.body.style.overflow = 'hidden';
    document.body.style.position = 'fixed';
    document.body.style.top = `-${scrollPosition}px`;
    document.body.style.width = '100%';
    
    if (body && body.children.length === 0) {
        addWelcomeMessage();
    }
}

function closeChatbot() {
    const window_el = document.querySelector('.chatbot-window');
    const container = document.querySelector('.chatbot-button-container');
    
    // State 5: Show tooltip when closing (unless scrolled)
    container.classList.remove('chatbot-open');
    
    window_el.classList.remove('active');
    
    // Restore body scroll
    document.body.style.overflow = '';
    document.body.style.position = '';
    document.body.style.top = '';
    document.body.style.width = '';
    
    // Restore scroll position
    window.scrollTo(0, scrollPosition);
}

// SINGLE STATUS INDICATOR
function updateChatbotStatus() {
    const status = document.querySelector('.chatbot-status');
    if (!status) return;
    
    // Online if EITHER service works
    const isOnline = serviceStatus.online || serviceStatus.local;
    
    status.innerHTML = `
        <span class="chatbot-status-dot ${isOnline ? 'online' : ''}"></span>
        ${isOnline ? 'Online' : 'Offline'}
    `;
}

function addWelcomeMessage() {
    const body = document.querySelector('.chatbot-body');
    if (!body) return;
    
    // Detailed status in message
    let statusMsg = '';
    if (!serviceStatus.online && !serviceStatus.local) {
        statusMsg = '<br><br><em style="color: #ef4444;">⚠️ Both Online and Local AI services are currently offline. Please try again later or contact contact@vaultphoenix.com for assistance.</em>';
    } else if (!serviceStatus.online && serviceStatus.local) {
        statusMsg = '<br><br><em style="color: #f59e0b;">ℹ️ Currently running on Local AI only. Online service is temporarily unavailable.</em>';
    } else if (serviceStatus.online && !serviceStatus.local) {
        statusMsg = '<br><br><em style="color: #f59e0b;">ℹ️ Currently running on Online AI only. Local service is temporarily unavailable.</em>';
    }
    
    body.innerHTML = `
        <div class="chat-message assistant-message">
            <div class="message-content">
                <div class="message-avatar">
                    <img src="images/VPLogoNoText.PNG" alt="Phoenix AI">
                </div>
                <div class="message-text">
                    <strong>Welcome to Vault Phoenix!</strong><br><br>
                    Ask me anything about our platform, $Ember tokens, campaigns, or SDK integration!${statusMsg}
                </div>
            </div>
        </div>
    `;
}

async function sendMessage() {
    const input = document.querySelector('.chatbot-input');
    const send = document.querySelector('.chatbot-send');
    
    if (!input || !send) return;
    
    const message = input.value.trim();
    if (!message || isTyping) return;
    
    addChatMessage('user', message);
    input.value = '';
    
    input.disabled = true;
    send.disabled = true;
    isTyping = true;
    
    showTyping();
    
    try {
        const reply = await askPhoenixAI(message);
        removeTyping();
        conversationHistory.push(
            { role: 'user', content: message },
            { role: 'assistant', content: reply }
        );
        addChatMessage('assistant', reply);
    } catch (error) {
        removeTyping();
        addChatMessage('assistant', '❌ Sorry, I encountered an error. Please try again.');
    } finally {
        input.disabled = false;
        send.disabled = false;
        isTyping = false;
    }
}

function addChatMessage(role, content) {
    const body = document.querySelector('.chatbot-body');
    if (!body) return;
    
    const div = document.createElement('div');
    div.className = 'chat-message ' + role + '-message';
    
    if (role === 'user') {
        div.innerHTML = `<div class="message-content"><div class="message-text">${escapeHtml(content)}</div></div>`;
    } else {
        div.innerHTML = `<div class="message-content"><div class="message-avatar"><img src="images/VPLogoNoText.PNG" alt="AI"></div><div class="message-text">${formatMessage(content)}</div></div>`;
    }
    
    body.appendChild(div);
    body.scrollTop = body.scrollHeight;
}

function showTyping() {
    const body = document.querySelector('.chatbot-body');
    if (!body) return;
    
    const div = document.createElement('div');
    div.className = 'chat-message assistant-message typing-indicator';
    div.innerHTML = '<div class="message-content"><div class="message-avatar"><img src="images/VPLogoNoText.PNG" alt="AI"></div><div class="typing-dots"><span></span><span></span><span></span></div></div>';
    
    body.appendChild(div);
    body.scrollTop = body.scrollHeight;
}

function removeTyping() {
    const typing = document.querySelector('.typing-indicator');
    if (typing) typing.remove();
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function formatMessage(text) {
    let formatted = escapeHtml(text);
    formatted = formatted.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    formatted = formatted.replace(/\n/g, '<br>');
    return formatted;
}

// ============================================
// INITIALIZATION - INSTANT
// ============================================
function init() {
    console.log('🔥 Vault Phoenix v7.1 FINAL Initializing...');
    
    // CHATBOT FIRST - INSTANT
    initChatbot();
    
    handleNavbarScroll();
    initScrollProgress();
    
    // Navigation
    updateDesktopNav();
    updateMobileNav();
    
    // FOOTER - Multiple retry strategies
    ensureFooterLinks();
    
    document.body.classList.add('loaded');
    
    console.log('✅ Vault Phoenix v7.1 FINAL Complete');
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

})();
