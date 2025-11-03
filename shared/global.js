// ============================================
// SHARED JAVASCRIPT FOR VAULT PHOENIX - V8.1 FIXED LOADER
// ============================================
// FIXES: Proper component loading sequence, better initialization
// ============================================

(function() {
'use strict';

// ============================================
// LOAD SHARED COMPONENTS FROM shared/global.html
// ============================================
async function loadSharedComponents() {
    console.log('📦 Loading shared components...');
    
    const container = document.getElementById('shared-components-container');
    if (!container) {
        console.error('❌ #shared-components-container not found in HTML!');
        return false;
    }
    
    try {
        const response = await fetch('./shared/global.html');
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }
        
        const html = await response.text();
        container.innerHTML = html;
        
        console.log('✅ Shared components loaded successfully');
        
        // Verify components are present
        const footer = document.querySelector('.footer');
        const chatbot = document.querySelector('.chatbot-button-container');
        
        if (footer && chatbot) {
            console.log('✅ Footer and Chatbot verified in DOM');
            return true;
        } else {
            console.error('❌ Components loaded but not found:', {
                footer: !!footer,
                chatbot: !!chatbot
            });
            return false;
        }
        
    } catch (error) {
        console.error('❌ Failed to load shared components:', error);
        return false;
    }
}

// ============================================
// SERVICE STATUS TRACKING
// ============================================
let serviceStatus = {
    local: false,
    online: false
};

// ============================================
// UNIFIED NAVIGATION SOURCE
// Desktop nav, mobile menu, and footer Quick Links ALL use this
// ============================================
const UNIFIED_NAV_LINKS = [
    { title: 'Home', href: 'main.html' },
    { title: 'About Us', href: 'about.html' },
    { title: 'Team', href: 'team.html' },
    { title: 'Campaigns', href: 'campaigns.html' },
    { title: 'SDK', href: 'sdk.html' },
    { title: '$Ember Token', href: 'ember-presale.html' }
];

// ============================================
// HYBRID AI WRAPPER WITH STATUS TRACKING
// ============================================
async function askPhoenixAI(question) {
  let localAvailable = false;
  let onlineAvailable = false;
  
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
        localAvailable = true;
        serviceStatus.local = true;
        updateChatbotStatus();
        return offlineData.answer;
      }
    }
  } catch (localErr) {
    console.log('Local AI unavailable:', localErr.message);
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
      onlineAvailable = true;
      serviceStatus.online = true;
      updateChatbotStatus();

      try {
        await fetch('/api/save_learning', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            question,
            answer: claudeData.answer
          })
        });
      } catch (saveErr) {
        console.warn('Could not save learning data:', saveErr);
      }

      return claudeData.answer;
    }
  } catch (onlineErr) {
    console.log('Online AI unavailable:', onlineErr.message);
    serviceStatus.online = false;
  }

  updateChatbotStatus();
  
  if (!localAvailable && !onlineAvailable) {
    return "Both our online and local AI services are temporarily offline. Please try again later or reach us at contact@vaultphoenix.com for assistance.";
  }
  
  return "Sorry, I'm having trouble processing that request right now. Please try again.";
}

// ============================================
// PHOENIX AI CONFIGURATION
// ============================================
let phoenixAI = {
    version: "1.0.0",
    assistant_name: "Phoenix AI",
    description: "AI assistant for Vault Phoenix",
    network: "Solana",
    focus_areas: [
        "$Ember token presale & pricing",
        "GPS & Beacon technology",
        "White-label app deployment",
        "Platform opportunities"
    ],
    behavior_rules: {
        tone: "enthusiastic yet professional",
        persona: "knowledgeable crypto gaming expert"
    }
};

async function loadPhoenixAITraining() {
    try {
        const response = await fetch('./shared/phoenix_ai_training.json');
        if (response.ok) {
            const trainingData = await response.json();
            phoenixAI = { ...phoenixAI, ...trainingData };
            console.log('✅ Phoenix AI training data loaded');
        }
    } catch (error) {
        console.log('ℹ️ Using default Phoenix AI configuration');
    }
}

// ============================================
// SITE SCANNER
// ============================================
const siteScanner = {
    scannedData: {
        pages: [],
        sections: [],
        links: [],
        teamMembers: [],
        navigation: []
    },
    
    async initializeScan() {
        console.log('🔍 Phoenix AI Site Scanner: Starting scan...');
        
        this.scanCurrentPage();
        this.scanNavigation();
        this.scanFooter();
        
        console.log('✅ Phoenix AI Site Scanner: Complete');
        return this.scannedData;
    },
    
    scanCurrentPage() {
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        
        const sections = document.querySelectorAll('section[id], div[id]');
        sections.forEach(section => {
            const id = section.id;
            const heading = section.querySelector('h1, h2, h3, h4');
            const headingText = heading ? heading.textContent.trim() : '';
            
            if (id) {
                this.scannedData.sections.push({
                    page: currentPage,
                    id: id,
                    heading: headingText,
                    anchor: `#${id}`,
                    fullLink: `./${currentPage}#${id}`
                });
            }
        });
    },
    
    scanNavigation() {
        UNIFIED_NAV_LINKS.forEach(navLink => {
            this.scannedData.navigation.push({
                title: navLink.title,
                href: navLink.href,
                type: 'main-nav'
            });
        });
    },
    
    scanFooter() {
        const footerLinks = document.querySelectorAll('.footer a[href]');
        footerLinks.forEach(link => {
            const href = link.getAttribute('href');
            const text = link.textContent.trim();
            
            if (href && href !== '#') {
                this.scannedData.links.push({
                    page: 'footer',
                    href: href,
                    text: text,
                    isExternal: href.startsWith('http')
                });
            }
        });
    }
};

// ============================================
// UNIFIED NAVIGATION GENERATOR
// ============================================
function generateNavigation() {
    updateDesktopNav(UNIFIED_NAV_LINKS);
    updateMobileNav(UNIFIED_NAV_LINKS);
    
    setTimeout(() => {
        updateFooterNav(UNIFIED_NAV_LINKS);
    }, 100);
    
    setTimeout(() => {
        const footerLinks = document.querySelector('.footer-column .footer-links');
        if (footerLinks && footerLinks.children.length === 0) {
            console.log('🔄 Retrying footer navigation...');
            updateFooterNav(UNIFIED_NAV_LINKS);
        }
    }, 500);
}

function updateDesktopNav(navLinks) {
    const desktopNav = document.querySelector('.nav-links');
    if (!desktopNav) return;
    
    desktopNav.innerHTML = '';
    
    navLinks.forEach(link => {
        if (link.title === '$Ember Token') return;
        
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.href = link.href;
        a.textContent = link.title;
        if (link.href.startsWith('#')) {
            a.addEventListener('click', handleSmoothScroll);
        }
        li.appendChild(a);
        desktopNav.appendChild(li);
    });
    
    const li = document.createElement('li');
    const a = document.createElement('a');
    a.href = 'ember-presale.html';
    a.className = 'ember-link';
    a.innerHTML = '<img src="images/VPEmberCoin.PNG" alt="Ember" class="nav-ember-coin">$Ember Token';
    li.appendChild(a);
    desktopNav.appendChild(li);
}

function updateMobileNav(navLinks) {
    const mobileNav = document.querySelector('.mobile-nav-links');
    if (!mobileNav) return;
    
    mobileNav.innerHTML = '';
    
    navLinks.forEach(link => {
        if (link.title === '$Ember Token') return;
        
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.href = link.href;
        a.textContent = link.title;
        if (link.href.startsWith('#')) {
            a.addEventListener('click', handleSmoothScroll);
        }
        a.addEventListener('click', closeMobileMenu);
        li.appendChild(a);
        mobileNav.appendChild(li);
    });
    
    const li = document.createElement('li');
    const a = document.createElement('a');
    a.href = 'ember-presale.html';
    a.className = 'ember-link';
    a.innerHTML = '<img src="images/VPEmberCoin.PNG" alt="Ember" class="nav-ember-coin">$Ember Token';
    li.appendChild(a);
    mobileNav.appendChild(li);
}

function updateFooterNav(footerLinks) {
    const footerColumns = document.querySelectorAll('.footer-column');
    
    let quickLinksColumn = null;
    
    footerColumns.forEach(col => {
        const heading = col.querySelector('.footer-heading');
        if (heading && heading.textContent.trim() === 'Quick Links') {
            quickLinksColumn = col;
        }
    });
    
    if (!quickLinksColumn) return;
    
    const linksContainer = quickLinksColumn.querySelector('.footer-links');
    if (!linksContainer) return;
    
    linksContainer.innerHTML = '';
    
    footerLinks.forEach(link => {
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.href = link.href;
        a.textContent = link.title;
        li.appendChild(a);
        linksContainer.appendChild(li);
    });
}

// ============================================
// MOBILE MENU
// ============================================
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
const mobileMenuOverlay = document.getElementById('mobile-menu-overlay');
const mobileMenuClose = document.getElementById('mobile-menu-close');

function openMobileMenu(e) {
    if (e) {
        e.preventDefault();
        e.stopPropagation();
    }
    
    const chatbotWindow = document.querySelector('.chatbot-window');
    if (chatbotWindow && chatbotWindow.classList.contains('active')) {
        closeChatbot();
    }
    
    if (mobileMenu && mobileMenuOverlay) {
        mobileMenu.classList.add('active');
        mobileMenuOverlay.classList.add('active');
        if (mobileMenuBtn) {
            mobileMenuBtn.setAttribute('aria-expanded', 'true');
        }
        document.body.style.overflow = 'hidden';
    }
}

function closeMobileMenu(e) {
    if (e) e.stopPropagation();
    
    if (mobileMenu && mobileMenuOverlay) {
        mobileMenu.classList.remove('active');
        mobileMenuOverlay.classList.remove('active');
        if (mobileMenuBtn) {
            mobileMenuBtn.setAttribute('aria-expanded', 'false');
        }
        document.body.style.overflow = '';
    }
}

if (mobileMenuBtn && mobileMenu && mobileMenuOverlay) {
    const newBtn = mobileMenuBtn.cloneNode(true);
    mobileMenuBtn.parentNode.replaceChild(newBtn, mobileMenuBtn);
    
    newBtn.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        const isOpen = mobileMenu.classList.contains('active');
        if (isOpen) {
            closeMobileMenu();
        } else {
            openMobileMenu();
        }
    });
    
    newBtn.addEventListener('touchstart', function(e) {
        e.preventDefault();
        e.stopPropagation();
        const isOpen = mobileMenu.classList.contains('active');
        if (isOpen) {
            closeMobileMenu();
        } else {
            openMobileMenu();
        }
    }, { passive: true });
}

if (mobileMenuClose && mobileMenu && mobileMenuOverlay) {
    mobileMenuClose.addEventListener('click', closeMobileMenu);
    mobileMenuClose.addEventListener('touchstart', closeMobileMenu, { passive: true });
}

if (mobileMenuOverlay && mobileMenu) {
    mobileMenuOverlay.addEventListener('click', closeMobileMenu);
    mobileMenuOverlay.addEventListener('touchstart', closeMobileMenu, { passive: true });
}

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        if (mobileMenu && mobileMenu.classList.contains('active')) {
            closeMobileMenu();
        }
        const chatbotWindow = document.querySelector('.chatbot-window');
        if (chatbotWindow && chatbotWindow.classList.contains('active')) {
            closeChatbot();
        }
    }
});

// ============================================
// SMOOTH SCROLLING
// ============================================
function handleSmoothScroll(e) {
    const href = this.getAttribute('href');
    
    if (!href || href === '#' || href.startsWith('http') || !href.includes('#')) {
        return;
    }
    
    e.preventDefault();
    
    const targetId = href.includes('#') ? href.split('#')[1] : href;
    const targetElement = document.getElementById(targetId);
    
    if (targetElement) {
        const navbar = document.querySelector('.navbar');
        const navbarHeight = navbar ? navbar.offsetHeight : 80;
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navbarHeight - 20;
        
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });

        if (history.pushState) {
            history.pushState(null, null, `#${targetId}`);
        }
        
        closeMobileMenu();
    }
}

function attachSmoothScrollListeners() {
    document.querySelectorAll('a[href^="#"], a[href*="#"]').forEach(anchor => {
        const newAnchor = anchor.cloneNode(true);
        anchor.parentNode.replaceChild(newAnchor, anchor);
        newAnchor.addEventListener('click', handleSmoothScroll);
    });
}

// ============================================
// NAVBAR SMOOTH TRANSITIONS
// ============================================
const navbar = document.querySelector('.navbar');
let scrollTimeout;

function handleNavbarScroll() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (navbar) {
        const progress = Math.min(scrollTop / 400, 1);
        
        const emberBrown = { r: 45, g: 24, b: 16, a: 0.95 };
        const emberDeep = { r: 69, g: 26, b: 3, a: 0.92 };
        const emberRust = { r: 124, g: 45, b: 18, a: 0.90 };
        const emberRed = { r: 215, g: 51, b: 39, a: 0.85 };
        
        const black1 = { r: 15, g: 15, b: 15, a: 0.98 };
        const black2 = { r: 20, g: 20, b: 20, a: 0.98 };
        const black3 = { r: 23, g: 23, b: 23, a: 0.98 };
        const black4 = { r: 26, g: 26, b: 26, a: 0.98 };
        
        const c1 = {
            r: Math.round(emberBrown.r + (black1.r - emberBrown.r) * progress),
            g: Math.round(emberBrown.g + (black1.g - emberBrown.g) * progress),
            b: Math.round(emberBrown.b + (black1.b - emberBrown.b) * progress),
            a: emberBrown.a + (black1.a - emberBrown.a) * progress
        };
        const c2 = {
            r: Math.round(emberDeep.r + (black2.r - emberDeep.r) * progress),
            g: Math.round(emberDeep.g + (black2.g - emberDeep.g) * progress),
            b: Math.round(emberDeep.b + (black2.b - emberDeep.b) * progress),
            a: emberDeep.a + (black2.a - emberDeep.a) * progress
        };
        const c3 = {
            r: Math.round(emberRust.r + (black3.r - emberRust.r) * progress),
            g: Math.round(emberRust.g + (black3.g - emberRust.g) * progress),
            b: Math.round(emberRust.b + (black3.b - emberRust.b) * progress),
            a: emberRust.a + (black3.a - emberRust.a) * progress
        };
        const c4 = {
            r: Math.round(emberRed.r + (black4.r - emberRed.r) * progress),
            g: Math.round(emberRed.g + (black4.g - emberRed.g) * progress),
            b: Math.round(emberRed.b + (black4.b - emberRed.b) * progress),
            a: emberRed.a + (black4.a - emberRed.a) * progress
        };
        
        const gradient = `linear-gradient(135deg, rgba(${c1.r}, ${c1.g}, ${c1.b}, ${c1.a}) 0%, rgba(${c2.r}, ${c2.g}, ${c2.b}, ${c2.a}) 30%, rgba(${c3.r}, ${c3.g}, ${c3.b}, ${c3.a}) 60%, rgba(${c4.r}, ${c4.g}, ${c4.b}, ${c4.a}) 100%)`;
        navbar.style.background = gradient;
    }
}

window.addEventListener('scroll', function() {
    if (scrollTimeout) {
        window.cancelAnimationFrame(scrollTimeout);
    }
    scrollTimeout = window.requestAnimationFrame(handleNavbarScroll);
}, { passive: true });

// ============================================
// SCROLL PROGRESS INDICATOR
// ============================================
function initializeScrollProgress() {
    const progressContainer = document.createElement('div');
    progressContainer.className = 'scroll-progress-container';
    
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress-bar';
    
    progressContainer.appendChild(progressBar);
    document.body.appendChild(progressContainer);
    
    function updateScrollProgress() {
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const scrollPercentage = (scrollTop / (documentHeight - windowHeight)) * 100;
        progressBar.style.width = scrollPercentage + '%';
    }
    
    let scrollProgressTimeout;
    window.addEventListener('scroll', function() {
        if (scrollProgressTimeout) {
            window.cancelAnimationFrame(scrollProgressTimeout);
        }
        scrollProgressTimeout = window.requestAnimationFrame(updateScrollProgress);
    }, { passive: true });
    
    updateScrollProgress();
}

// ============================================
// UNIVERSAL COUNTDOWN TIMER
// ============================================
function initializeUniversalCountdown() {
    const targetDate = new Date('November 1, 2025 00:00:00 UTC');
    
    const countdownElements = {
        mainDays: document.getElementById('main-days'),
        mainHours: document.getElementById('main-hours'),
        mainMinutes: document.getElementById('main-minutes'),
        mainSeconds: document.getElementById('main-seconds'),
        emberDays: document.getElementById('days'),
        emberHours: document.getElementById('hours'),
        emberMinutes: document.getElementById('minutes'),
        emberSeconds: document.getElementById('seconds'),
        countdownDays: document.getElementById('countdown-days'),
        countdownHours: document.getElementById('countdown-hours'),
        countdownMinutes: document.getElementById('countdown-minutes'),
        countdownSeconds: document.getElementById('countdown-seconds')
    };
    
    const hasAnyCountdown = Object.values(countdownElements).some(el => el !== null);
    
    if (!hasAnyCountdown) {
        return false;
    }
    
    function updateCountdown() {
        const now = new Date().getTime();
        const distance = targetDate.getTime() - now;
        
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        const formattedDays = days.toString().padStart(2, '0');
        const formattedHours = hours.toString().padStart(2, '0');
        const formattedMinutes = minutes.toString().padStart(2, '0');
        const formattedSeconds = seconds.toString().padStart(2, '0');
        
        if (distance < 0) {
            Object.entries(countdownElements).forEach(([key, element]) => {
                if (element) element.textContent = '00';
            });
            return;
        }
        
        if (countdownElements.mainDays) countdownElements.mainDays.textContent = formattedDays;
        if (countdownElements.mainHours) countdownElements.mainHours.textContent = formattedHours;
        if (countdownElements.mainMinutes) countdownElements.mainMinutes.textContent = formattedMinutes;
        if (countdownElements.mainSeconds) countdownElements.mainSeconds.textContent = formattedSeconds;
        
        if (countdownElements.emberDays) countdownElements.emberDays.textContent = formattedDays;
        if (countdownElements.emberHours) countdownElements.emberHours.textContent = formattedHours;
        if (countdownElements.emberMinutes) countdownElements.emberMinutes.textContent = formattedMinutes;
        if (countdownElements.emberSeconds) countdownElements.emberSeconds.textContent = formattedSeconds;
        
        if (countdownElements.countdownDays) countdownElements.countdownDays.textContent = formattedDays;
        if (countdownElements.countdownHours) countdownElements.countdownHours.textContent = formattedHours;
        if (countdownElements.countdownMinutes) countdownElements.countdownMinutes.textContent = formattedMinutes;
        if (countdownElements.countdownSeconds) countdownElements.countdownSeconds.textContent = formattedSeconds;
    }
    
    updateCountdown();
    setInterval(updateCountdown, 1000);
    return true;
}

window.initializeUniversalCountdown = initializeUniversalCountdown;

// ============================================
// COOKIE CONSENT BANNER
// ============================================
function initializeCookieConsent() {
    const cookieConsent = localStorage.getItem('vaultphoenix_cookie_consent');
    
    if (cookieConsent !== null) {
        showChatbotButton();
        return;
    }
    
    const consentBanner = document.createElement('div');
    consentBanner.className = 'cookie-consent-banner';
    consentBanner.innerHTML = `
        <div class="cookie-consent-content">
            <div class="cookie-consent-icon">🍪</div>
            <div class="cookie-consent-text">
                <h4>We Value Your Privacy</h4>
                <p>We use cookies to enhance your browsing experience.</p>
            </div>
            <div class="cookie-consent-buttons">
                <button class="cookie-btn cookie-accept">Accept</button>
                <button class="cookie-btn cookie-decline">Decline</button>
                <a href="#" class="cookie-privacy-link" id="cookie-privacy-link">Privacy Policy</a>
            </div>
        </div>
    `;
    
    document.body.appendChild(consentBanner);
    setTimeout(() => consentBanner.classList.add('show'), 500);
    
    consentBanner.querySelector('.cookie-accept').addEventListener('click', function() {
        localStorage.setItem('vaultphoenix_cookie_consent', 'accepted');
        consentBanner.classList.remove('show');
        setTimeout(() => {
            consentBanner.remove();
            showChatbotButton();
        }, 400);
    });
    
    consentBanner.querySelector('.cookie-decline').addEventListener('click', function() {
        localStorage.setItem('vaultphoenix_cookie_consent', 'declined');
        consentBanner.classList.remove('show');
        setTimeout(() => {
            consentBanner.remove();
            showChatbotButton();
        }, 400);
    });
}

function showChatbotButton() {
    const chatbotButtonContainer = document.querySelector('.chatbot-button-container');
    if (chatbotButtonContainer) {
        chatbotButtonContainer.classList.add('ready');
        chatbotButtonContainer.style.display = 'block';
        setTimeout(() => {
            initializeChatbotTooltip();
        }, 100);
        console.log('✅ Chatbot button shown');
    } else {
        console.warn('⚠️ Chatbot button container not found');
    }
}

// ============================================
// PRIVACY POLICY MODAL
// ============================================
function initializePrivacyPolicyModal() {
    const modalHTML = `
        <div class="privacy-modal-overlay" id="privacy-modal-overlay">
            <div class="privacy-modal">
                <div class="privacy-modal-header">
                    <h2><span class="privacy-modal-icon">🔒</span>Privacy Policy</h2>
                    <button class="privacy-modal-close" id="privacy-modal-close">×</button>
                </div>
                <div class="privacy-modal-body">
                    <div class="privacy-modal-date">Effective Date: October 27, 2025</div>
                    <div class="privacy-modal-intro">Welcome to Vault Phoenix LLC. We value your privacy.</div>
                    <div class="privacy-key-points">
                        <h3>Key Privacy Highlights</h3>
                        <div class="privacy-points-grid">
                            <div class="privacy-point">
                                <div class="privacy-point-header">
                                    <span class="privacy-point-icon">📧</span>
                                    <h4>Information We Collect</h4>
                                </div>
                                <p>We collect email addresses, wallet addresses, and device information.</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="privacy-modal-footer">
                    <button class="privacy-close-btn" id="privacy-modal-close-btn">Close</button>
                </div>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    
    const modalOverlay = document.getElementById('privacy-modal-overlay');
    const modalClose = document.getElementById('privacy-modal-close');
    const modalCloseBtn = document.getElementById('privacy-modal-close-btn');
    
    function openPrivacyModal(e) {
        if (e) e.preventDefault();
        modalOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    function closePrivacyModal() {
        modalOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    document.querySelectorAll('[href="#privacy-policy"], #cookie-privacy-link, .cookie-privacy-link, .privacy-policy-link').forEach(link => {
        link.addEventListener('click', openPrivacyModal);
    });
    
    if (modalClose) modalClose.addEventListener('click', closePrivacyModal);
    if (modalCloseBtn) modalCloseBtn.addEventListener('click', closePrivacyModal);
    if (modalOverlay) {
        modalOverlay.addEventListener('click', function(e) {
            if (e.target === modalOverlay) closePrivacyModal();
        });
    }
    
    window.openPrivacyPolicyModal = openPrivacyModal;
}

// ============================================
// SCROLL REVEAL ANIMATIONS
// ============================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

document.querySelectorAll('.scroll-reveal, .fade-in-up, .slide-in-left, .slide-in-right').forEach(element => {
    observer.observe(element);
});

// ============================================
// PHOENIX AI CHATBOT - NO SHAKE STREAMING
// ============================================
let conversationHistory = [];
let isTyping = false;
let phoenixSiteData = null;

function getEnhancedSystemPrompt() {
    let basePrompt = phoenixAI.description || 'You are Phoenix, the AI assistant for Vault Phoenix.';
    
    if (phoenixSiteData) {
        basePrompt += '\n\nSite Navigation Data:';
        
        if (phoenixSiteData.sections && phoenixSiteData.sections.length > 0) {
            basePrompt += '\n\nAvailable Sections:';
            phoenixSiteData.sections.forEach(section => {
                basePrompt += `\n- ${section.heading} (${section.fullLink})`;
            });
        }
    }
    
    if (phoenixAI.behavior_rules) {
        basePrompt += `\n\nTone: ${phoenixAI.behavior_rules.tone}`;
    }
    
    if (phoenixAI.focus_areas) {
        basePrompt += '\n\nFocus Areas: ' + phoenixAI.focus_areas.join(', ');
    }
    
    return basePrompt;
}

function initializeChatbotTooltip() {
    const tooltip = document.querySelector('.chatbot-tooltip');
    const chatbotButtonContainer = document.querySelector('.chatbot-button-container');
    
    if (!tooltip || !chatbotButtonContainer) return;
    
    tooltip.classList.remove('scrolled');
    
    const handleScroll = function() {
        tooltip.classList.add('scrolled');
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    chatbotButtonContainer._scrollHandler = handleScroll;
}

function showTooltipAfterClose() {
    const tooltip = document.querySelector('.chatbot-tooltip');
    if (tooltip) {
        tooltip.classList.remove('scrolled');
    }
}

// CRITICAL: Prevent page scroll when touching chatbot body
function preventPageScroll(e) {
    const chatbotBody = e.currentTarget;
    const isScrollable = chatbotBody.scrollHeight > chatbotBody.clientHeight;
    
    if (!isScrollable) {
        e.preventDefault();
        return;
    }
    
    const scrollTop = chatbotBody.scrollTop;
    const scrollHeight = chatbotBody.scrollHeight;
    const clientHeight = chatbotBody.clientHeight;
    const delta = e.deltaY || -e.wheelDelta || e.detail;
    
    if ((delta < 0 && scrollTop <= 0) || (delta > 0 && scrollTop + clientHeight >= scrollHeight)) {
        e.preventDefault();
    }
}

function initializeChatbot() {
    const chatbotButtonContainer = document.querySelector('.chatbot-button-container');
    const chatbotWindow = document.querySelector('.chatbot-window');
    
    if (!chatbotButtonContainer || !chatbotWindow) {
        console.warn('⚠️ Chatbot elements not found');
        return false;
    }
    
    updateChatbotStatus();
    initializeChatbotTooltip();
    
    const newChatbotButtonContainer = chatbotButtonContainer.cloneNode(true);
    chatbotButtonContainer.parentNode.replaceChild(newChatbotButtonContainer, chatbotButtonContainer);
    
    const chatbotButton = newChatbotButtonContainer.querySelector('.chatbot-button');
    
    chatbotButton.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        toggleChatbot();
    });
    
    chatbotButton.addEventListener('touchend', function(e) {
        e.preventDefault();
        e.stopPropagation();
        toggleChatbot();
    }, { passive: false });
    
    const chatbotClose = chatbotWindow.querySelector('.chatbot-close');
    if (chatbotClose) {
        const newChatbotClose = chatbotClose.cloneNode(true);
        chatbotClose.parentNode.replaceChild(newChatbotClose, chatbotClose);
        
        newChatbotClose.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            closeChatbot();
        });
        
        newChatbotClose.addEventListener('touchend', function(e) {
            e.preventDefault();
            e.stopPropagation();
            closeChatbot();
        }, { passive: false });
    }
    
    const chatbotSend = chatbotWindow.querySelector('.chatbot-send');
    if (chatbotSend) {
        const newChatbotSend = chatbotSend.cloneNode(true);
        chatbotSend.parentNode.replaceChild(newChatbotSend, chatbotSend);
        
        newChatbotSend.addEventListener('click', function(e) {
            e.preventDefault();
            sendMessage();
        });
        
        newChatbotSend.addEventListener('touchend', function(e) {
            e.preventDefault();
            e.stopPropagation();
            sendMessage();
        }, { passive: false });
    }
    
    const chatbotInput = chatbotWindow.querySelector('.chatbot-input');
    if (chatbotInput) {
        chatbotInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                sendMessage();
            }
        });
    }
    
    // CRITICAL: Add scroll isolation to chatbot body
    const chatbotBody = chatbotWindow.querySelector('.chatbot-body');
    if (chatbotBody) {
        chatbotBody.addEventListener('wheel', preventPageScroll, { passive: false });
        chatbotBody.addEventListener('touchmove', function(e) {
            e.stopPropagation();
        }, { passive: true });
    }
    
    // CRITICAL: Initialize keyboard handler
    initializeChatbotKeyboardHandler();
    
    console.log('✅ Chatbot initialized with NO SHAKE streaming');
    return true;
}

function toggleChatbot() {
    const chatbotWindow = document.querySelector('.chatbot-window');
    const chatbotButtonContainer = document.querySelector('.chatbot-button-container');
    
    if (!chatbotWindow || !chatbotButtonContainer) return;
    
    const isActive = chatbotWindow.classList.contains('active');
    
    if (isActive) {
        closeChatbot();
    } else {
        openChatbot();
    }
}

function openChatbot() {
    const chatbotWindow = document.querySelector('.chatbot-window');
    const chatbotButtonContainer = document.querySelector('.chatbot-button-container');
    const chatbotBody = document.querySelector('.chatbot-body');
    
    if (mobileMenu && mobileMenu.classList.contains('active')) {
        closeMobileMenu();
    }
    
    chatbotWindow.classList.add('active');
    chatbotButtonContainer.classList.add('chatbot-active');
    
    if (chatbotBody && chatbotBody.children.length === 0) {
        addWelcomeMessage();
    }
}

function closeChatbot() {
    const chatbotWindow = document.querySelector('.chatbot-window');
    const chatbotButtonContainer = document.querySelector('.chatbot-button-container');
    const chatbotInput = document.querySelector('.chatbot-input');
    
    // CRITICAL: Remove all state classes and blur input
    chatbotWindow.classList.remove('active');
    chatbotWindow.classList.remove('keyboard-visible');
    chatbotButtonContainer.classList.remove('chatbot-active');
    
    // CRITICAL: Force blur to close keyboard
    if (chatbotInput) {
        chatbotInput.blur();
    }
    
    showTooltipAfterClose();
}

function updateChatbotStatus() {
    const statusElement = document.querySelector('.chatbot-status');
    
    if (!statusElement) return;
    
    const isAnyOnline = serviceStatus.online || serviceStatus.local;
    
    let statusText = '';
    if (serviceStatus.online && serviceStatus.local) {
        statusText = 'Online & Local Active';
    } else if (serviceStatus.online) {
        statusText = 'Online (Cloud Active)';
    } else if (serviceStatus.local) {
        statusText = 'Local AI Active';
    } else {
        statusText = 'Services Offline';
    }
    
    const dotClass = isAnyOnline ? 'chatbot-status-dot online' : 'chatbot-status-dot';
    statusElement.innerHTML = `<span class="${dotClass}"></span>${statusText}`;
}

function addWelcomeMessage() {
    const chatbotBody = document.querySelector('.chatbot-body');
    if (!chatbotBody) return;
    
    const assistantName = phoenixAI.assistant_name || 'Phoenix AI';
    
    let statusMessage = '';
    if (!serviceStatus.online && !serviceStatus.local) {
        statusMessage = '<br><br><em style="color: #ef4444;">⚠️ Both our online and local AI services are temporarily offline. Please try again later or reach us at contact@vaultphoenix.com for assistance.</em>';
    } else if (!serviceStatus.online && serviceStatus.local) {
        statusMessage = '<br><br><em style="color: #f59e0b;">ℹ️ Running on local AI. Cloud service temporarily offline.</em>';
    } else if (serviceStatus.online && !serviceStatus.local) {
        statusMessage = '<br><br><em style="color: #f59e0b;">ℹ️ Running on cloud AI. Local service temporarily offline.</em>';
    } else {
        statusMessage = '<br><br><em style="color: #10b981;">✓ Both AI services online and ready!</em>';
    }
    
    let welcomeContent = '<strong>Welcome to Vault Phoenix!</strong><br><br>Ask me anything about our platform, $Ember tokens, campaigns, or SDK integration!';
    
    welcomeContent += statusMessage;
    
    chatbotBody.innerHTML = `
        <div class="chat-message assistant-message">
            <div class="message-content">
                <div class="message-avatar">
                    <img src="images/VPLogoNoText.PNG" alt="${assistantName}">
                </div>
                <div class="message-text">${welcomeContent}</div>
            </div>
        </div>
    `;
}

async function sendMessage() {
    const chatbotInput = document.querySelector('.chatbot-input');
    const chatbotSend = document.querySelector('.chatbot-send');
    
    if (!chatbotInput || !chatbotSend) return;
    
    const message = chatbotInput.value.trim();
    
    // FIX: Blink border if empty
    if (!message) {
        chatbotInput.classList.add('blink-empty');
        setTimeout(() => {
            chatbotInput.classList.remove('blink-empty');
        }, 1200);
        return;
    }
    
    if (isTyping) return;
    
    addChatMessage('user', message);
    chatbotInput.value = '';
    
    chatbotInput.disabled = true;
    chatbotSend.disabled = true;
    isTyping = true;
    
    showTypingIndicator();
    
    try {
        const reply = await askPhoenixAI(message);
        
        removeTypingIndicator();
        
        conversationHistory.push(
            { role: 'user', content: message },
            { role: 'assistant', content: reply }
        );
        
        // CRITICAL: NO SHAKE - Stream the response with stable rendering
        await streamChatMessageNoShake(reply);
        
    } catch (error) {
        console.error('AI Error:', error);
        removeTypingIndicator();
        addChatMessage('assistant', '❌ Sorry, I encountered an error. Please try again.');
    } finally {
        chatbotInput.disabled = false;
        chatbotSend.disabled = false;
        isTyping = false;
    }
}

// CRITICAL: NO SHAKE - Stream AI response with stable DOM updates
async function streamChatMessageNoShake(fullText) {
    const chatbotBody = document.querySelector('.chatbot-body');
    if (!chatbotBody) return;
    
    // Create message container with fixed structure
    const messageDiv = document.createElement('div');
    messageDiv.className = 'chat-message assistant-message';
    
    const messageContent = document.createElement('div');
    messageContent.className = 'message-content';
    
    const avatar = document.createElement('div');
    avatar.className = 'message-avatar';
    avatar.innerHTML = '<img src="images/VPLogoNoText.PNG" alt="Phoenix AI">';
    
    const textDiv = document.createElement('div');
    textDiv.className = 'message-text';
    
    messageContent.appendChild(avatar);
    messageContent.appendChild(textDiv);
    messageDiv.appendChild(messageContent);
    
    // CRITICAL: Append container BEFORE streaming to avoid layout shift
    chatbotBody.appendChild(messageDiv);
    
    // Split into words
    const words = fullText.split(' ');
    let currentText = '';
    
    // CRITICAL: Batch updates to reduce reflows
    let updateBatch = '';
    const batchSize = 3; // Update every 3 words
    
    for (let i = 0; i < words.length; i++) {
        currentText += (i > 0 ? ' ' : '') + words[i];
        updateBatch += (i % batchSize === 0 && i > 0 ? ' ' : '') + words[i];
        
        // Update DOM in batches to reduce shake
        if (i % batchSize === 0 || i === words.length - 1) {
            textDiv.innerHTML = formatChatMessage(currentText) + '<span class="streaming-cursor"></span>';
            
            // Smooth scroll without triggering reflow
            requestAnimationFrame(() => {
                chatbotBody.scrollTop = chatbotBody.scrollHeight;
            });
            
            // Shorter delay for smoother feel
            await new Promise(resolve => setTimeout(resolve, 40));
        }
    }
    
    // Remove cursor and finalize
    textDiv.innerHTML = formatChatMessage(currentText);
    
    // Final scroll
    requestAnimationFrame(() => {
        chatbotBody.scrollTop = chatbotBody.scrollHeight;
    });
}

function addChatMessage(role, content) {
    const chatbotBody = document.querySelector('.chatbot-body');
    if (!chatbotBody) return;
    
    const messageDiv = document.createElement('div');
    messageDiv.className = 'chat-message ' + role + '-message';
    
    if (role === 'user') {
        messageDiv.innerHTML = '<div class="message-content"><div class="message-text">' + escapeHtml(content) + '</div></div>';
    } else {
        messageDiv.innerHTML = '<div class="message-content"><div class="message-avatar"><img src="images/VPLogoNoText.PNG" alt="Phoenix AI"></div><div class="message-text">' + formatChatMessage(content) + '</div></div>';
    }
    
    chatbotBody.appendChild(messageDiv);
    chatbotBody.scrollTop = chatbotBody.scrollHeight;
}

function showTypingIndicator() {
    const chatbotBody = document.querySelector('.chatbot-body');
    if (!chatbotBody) return;
    
    const typingDiv = document.createElement('div');
    typingDiv.className = 'chat-message assistant-message typing-indicator';
    typingDiv.innerHTML = '<div class="message-content"><div class="message-avatar"><img src="images/VPLogoNoText.PNG" alt="Phoenix AI"></div><div class="typing-dots"><span></span><span></span><span></span></div></div>';
    
    chatbotBody.appendChild(typingDiv);
    chatbotBody.scrollTop = chatbotBody.scrollHeight;
}

function removeTypingIndicator() {
    const typingIndicator = document.querySelector('.typing-indicator');
    if (typingIndicator) typingIndicator.remove();
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function formatChatMessage(text) {
    let formatted = escapeHtml(text);
    formatted = formatted.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    formatted = formatted.replace(/\n/g, '<br>');
    return formatted;
}

window.initializePhoenixChatbot = initializeChatbot;
window.phoenixSiteScanner = siteScanner;

// ============================================
// CHATBOT KEYBOARD HANDLER - NO ZOOM, BUTTON STAYS VISIBLE
// ============================================
function initializeChatbotKeyboardHandler() {
    const chatbotInput = document.querySelector('.chatbot-input');
    const chatbotWindow = document.querySelector('.chatbot-window');
    const chatbotButtonContainer = document.querySelector('.chatbot-button-container');
    
    if (!chatbotInput || !chatbotWindow) {
        console.warn('⚠️ Keyboard handler: chatbot elements not found');
        return false;
    }
    
    // Detect when keyboard appears (input focused)
    chatbotInput.addEventListener('focus', function() {
        // Only shift on mobile landscape
        if (window.innerWidth <= 926 && window.innerHeight <= 500 && window.matchMedia('(orientation: landscape)').matches) {
            chatbotWindow.classList.add('keyboard-visible');
            console.log('📱 Keyboard visible (landscape) - shifting chatbot up, button stays visible');
        }
    });
    
    // Detect when keyboard disappears (input blurred)
    chatbotInput.addEventListener('blur', function() {
        setTimeout(() => {
            chatbotWindow.classList.remove('keyboard-visible');
            console.log('📱 Keyboard hidden - restoring chatbot position');
        }, 100);
    });
    
    // CRITICAL: Handle orientation change - clean up keyboard-visible class
    window.addEventListener('orientationchange', function() {
        setTimeout(() => {
            const chatbotWindow = document.querySelector('.chatbot-window');
            if (chatbotWindow) {
                chatbotWindow.classList.remove('keyboard-visible');
                console.log('📱 Orientation changed - removed keyboard-visible class');
            }
            
            // Also blur any focused inputs to close keyboard
            const chatbotInput = document.querySelector('.chatbot-input');
            if (chatbotInput && document.activeElement === chatbotInput) {
                chatbotInput.blur();
                console.log('📱 Orientation changed - closed keyboard');
            }
        }, 300); // Wait for orientation change to complete
    });
    
    // Handle window resize (keyboard showing/hiding can trigger this)
    let lastHeight = window.innerHeight;
    let lastWidth = window.innerWidth;
    let lastOrientation = window.matchMedia('(orientation: landscape)').matches;
    
    window.addEventListener('resize', function() {
        const currentHeight = window.innerHeight;
        const currentWidth = window.innerWidth;
        const currentOrientation = window.matchMedia('(orientation: landscape)').matches;
        const isLandscape = currentOrientation;
        
        // CRITICAL: If orientation changed, clean up keyboard-visible
        if (currentOrientation !== lastOrientation) {
            chatbotWindow.classList.remove('keyboard-visible');
            if (chatbotInput && document.activeElement === chatbotInput) {
                chatbotInput.blur();
            }
            console.log('📱 Orientation change detected in resize - cleaned up');
        }
        // Only handle keyboard on mobile landscape
        else if (currentWidth <= 926 && currentHeight <= 500 && isLandscape) {
            // If window height decreased significantly, keyboard probably appeared
            if (lastHeight - currentHeight > 100) {
                if (document.activeElement === chatbotInput) {
                    chatbotWindow.classList.add('keyboard-visible');
                }
            }
            // If window height increased significantly, keyboard probably disappeared
            else if (currentHeight - lastHeight > 100) {
                chatbotWindow.classList.remove('keyboard-visible');
            }
        } else {
            // Remove keyboard-visible class on non-landscape mobile
            chatbotWindow.classList.remove('keyboard-visible');
        }
        
        lastHeight = currentHeight;
        lastWidth = currentWidth;
        lastOrientation = currentOrientation;
    }, { passive: true });
    
    console.log('✅ Chatbot keyboard handler initialized - NO ZOOM, button stays visible!');
    return true;
}

window.initializeChatbotKeyboardHandler = initializeChatbotKeyboardHandler;

// ============================================
// RESPONSIVE HANDLING
// ============================================
let resizeTimeout;
window.addEventListener('resize', function() {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(function() {
        if (window.innerWidth > 1024 && mobileMenu && mobileMenu.classList.contains('active')) {
            closeMobileMenu();
        }
    }, 250);
});

// ============================================
// INITIALIZATION SEQUENCE
// ============================================
async function init() {
    console.log('🔥 Vault Phoenix v8.1 FIXED LOADER Initializing...');
    
    // CRITICAL: Load shared components FIRST
    const componentsLoaded = await loadSharedComponents();
    
    if (!componentsLoaded) {
        console.error('❌ Failed to load shared components - retrying in 1 second...');
        setTimeout(init, 1000);
        return;
    }
    
    await loadPhoenixAITraining();
    
    handleNavbarScroll();
    initializeScrollProgress();
    
    initializeCookieConsent();
    initializePrivacyPolicyModal();
    
    let chatbotInitialized = initializeChatbot();
    if (!chatbotInitialized) {
        console.warn('⚠️ Chatbot failed, retrying...');
        setTimeout(() => initializeChatbot(), 100);
    }
    
    setTimeout(() => {
        const chatbotButtonContainer = document.querySelector('.chatbot-button-container');
        if (chatbotButtonContainer && !chatbotButtonContainer.classList.contains('ready')) {
            console.log('🔄 No privacy popup - showing chatbot button');
            showChatbotButton();
        }
    }, 1000);
    
    setTimeout(() => {
        generateNavigation();
    }, 50);
    
    phoenixSiteData = await siteScanner.initializeScan();
    
    setTimeout(() => {
        attachSmoothScrollListeners();
    }, 100);
    
    let countdownInitialized = initializeUniversalCountdown();
    if (!countdownInitialized) {
        setTimeout(() => initializeUniversalCountdown(), 100);
    }
    
    document.body.classList.add('loaded');
    window.sharedScriptReady = true;
    
    console.log('✅ Vault Phoenix v8.1 FIXED LOADER Complete');
    console.log('✅ Footer and Chatbot loaded from shared/global.html');
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

})();
