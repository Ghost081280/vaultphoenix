// ============================================
// SHARED JAVASCRIPT FOR VAULT PHOENIX - V6.5 FIXED
// ============================================
// Mobile & Desktop Optimized - Hardcoded Navigation
// Phoenix AI Integration with Dynamic Site Scanning
// FIXED: Removed ES6 imports, restored all functionality
// Updated: Dynamic JSON loading, all features working
// ============================================

(function() {
'use strict';

// ============================================
// PHOENIX AI CONFIGURATION - DYNAMIC LOADING
// Loads training data without ES6 imports
// ============================================

let phoenixAI = {
    version: "1.0.0",
    assistant_name: "Phoenix AI",
    description: "AI assistant for Vault Phoenix's $Ember Token presale and AR crypto gaming platform",
    network: "Polygon",
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

// Try to load external training data if available
async function loadPhoenixAITraining() {
    try {
        const response = await fetch('./shared/phoenix_ai_training.json');
        if (response.ok) {
            const trainingData = await response.json();
            phoenixAI = { ...phoenixAI, ...trainingData };
            console.log('✅ Phoenix AI training data loaded:', phoenixAI);
        }
    } catch (error) {
        console.log('ℹ️ Using default Phoenix AI configuration (training file not found)');
    }
}

// ============================================
// PHOENIX AI SITE SCANNER
// Dynamically scans all pages, links, anchors, and content
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
        console.log('🔍 Phoenix AI Site Scanner: Starting comprehensive scan...');
        
        this.scanCurrentPage();
        this.scanNavigation();
        this.scanFooter();
        
        if (phoenixAI.site_scan && phoenixAI.site_scan.scan_targets) {
            await this.scanTargetPages(phoenixAI.site_scan.scan_targets);
        }
        
        console.log('✅ Phoenix AI Site Scanner: Scan complete');
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
        MAIN_PAGE_NAV_LINKS.forEach(navLink => {
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
// HARDCODED NAVIGATION SYSTEM
// ============================================

const MAIN_PAGE_NAV_LINKS = [
    { title: 'How it Works', href: '#deploy-crypto-coins' },
    { title: 'Live Demo', href: '#experience-both-systems' },
    { title: 'Get Ideas', href: '#crypto-gaming-industries' },
    { title: 'Pricing', href: '#developer-sdk-pricing' }
];

function generateNavigation() {
    updateDesktopNav(MAIN_PAGE_NAV_LINKS);
    updateMobileNav(MAIN_PAGE_NAV_LINKS);
    updateFooterNav(MAIN_PAGE_NAV_LINKS);
}

function updateDesktopNav(navLinks) {
    const desktopNav = document.querySelector('.nav-links');
    if (!desktopNav) return;
    
    desktopNav.innerHTML = '';
    
    navLinks.forEach(link => {
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.href = link.href;
        a.textContent = link.title;
        a.addEventListener('click', handleSmoothScroll);
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
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.href = link.href;
        a.textContent = link.title;
        a.addEventListener('click', handleSmoothScroll);
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

function updateFooterNav(navLinks) {
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
    
    navLinks.forEach(link => {
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.href = link.href;
        a.textContent = link.title;
        a.addEventListener('click', handleSmoothScroll);
        li.appendChild(a);
        linksContainer.appendChild(li);
    });
    
    const emberLi = document.createElement('li');
    const emberA = document.createElement('a');
    emberA.href = 'ember-presale.html';
    emberA.className = 'footer-ember-link';
    emberA.textContent = '$Ember Token';
    emberLi.appendChild(emberA);
    linksContainer.appendChild(emberLi);
}

// ============================================
// MOBILE MENU SYSTEM
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
    }, { passive: false });
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
    if (e.key === 'Escape' && mobileMenu && mobileMenu.classList.contains('active')) {
        closeMobileMenu();
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
// NAVBAR SMOOTH SCROLL TRANSITION
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
        setTimeout(() => consentBanner.remove(), 400);
    });
    
    consentBanner.querySelector('.cookie-decline').addEventListener('click', function() {
        localStorage.setItem('vaultphoenix_cookie_consent', 'declined');
        consentBanner.classList.remove('show');
        setTimeout(() => consentBanner.remove(), 400);
    });
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
// PHOENIX AI CHATBOT SYSTEM
// ============================================

const CLAUDE_API_KEY = 'YOUR_CLAUDE_API_KEY_HERE';
const CLAUDE_API_URL = 'https://api.anthropic.com/v1/messages';
const CLAUDE_MODEL = 'claude-sonnet-4-20250514';

let conversationHistory = [];
let isTyping = false;
let isOnline = false;
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

function initializeChatbot() {
    const chatbotButtonContainer = document.querySelector('.chatbot-button-container');
    const chatbotWindow = document.querySelector('.chatbot-window');
    
    if (!chatbotButtonContainer || !chatbotWindow) {
        return false;
    }
    
    updateChatbotStatus();
    
    const chatbotBody = document.querySelector('.chatbot-body');
    if (chatbotBody) {
        let startY = 0;
        
        chatbotBody.addEventListener('touchstart', function(e) {
            startY = e.touches[0].pageY;
        }, { passive: true });
        
        chatbotBody.addEventListener('touchmove', function(e) {
            const currentY = e.touches[0].pageY;
            const scrollTop = chatbotBody.scrollTop;
            const scrollHeight = chatbotBody.scrollHeight;
            const clientHeight = chatbotBody.clientHeight;
            
            const isAtTop = scrollTop === 0;
            const isAtBottom = scrollTop + clientHeight >= scrollHeight;
            const isScrollingUp = currentY > startY;
            const isScrollingDown = currentY < startY;
            
            if ((isAtTop && isScrollingUp) || (isAtBottom && isScrollingDown)) {
                e.preventDefault();
            }
            
            e.stopPropagation();
        }, { passive: false });
    }
    
    const newChatbotButtonContainer = chatbotButtonContainer.cloneNode(true);
    chatbotButtonContainer.parentNode.replaceChild(newChatbotButtonContainer, chatbotButtonContainer);
    
    const chatbotButton = newChatbotButtonContainer.querySelector('.chatbot-button');
    
    chatbotButton.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        toggleChatbot();
    });
    
    const newChatbotClose = chatbotWindow.querySelector('.chatbot-close');
    if (newChatbotClose) {
        newChatbotClose.addEventListener('click', function(e) {
            e.preventDefault();
            closeChatbot();
        });
    }
    
    const newChatbotSend = chatbotWindow.querySelector('.chatbot-send');
    if (newChatbotSend) {
        newChatbotSend.addEventListener('click', sendMessage);
    }
    
    const newChatbotInput = chatbotWindow.querySelector('.chatbot-input');
    if (newChatbotInput) {
        newChatbotInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                sendMessage();
            }
        });
    }
    
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
    
    document.body.style.overflow = 'hidden';
    document.body.style.position = 'fixed';
    document.body.style.width = '100%';
    
    if (chatbotBody && chatbotBody.children.length === 0) {
        addWelcomeMessage();
    }
}

function closeChatbot() {
    const chatbotWindow = document.querySelector('.chatbot-window');
    const chatbotButtonContainer = document.querySelector('.chatbot-button-container');
    
    chatbotWindow.classList.remove('active');
    chatbotButtonContainer.classList.remove('chatbot-active');
    
    document.body.style.overflow = '';
    document.body.style.position = '';
    document.body.style.width = '';
}

function updateChatbotStatus() {
    const statusElement = document.querySelector('.chatbot-status');
    const statusDot = document.querySelector('.chatbot-status-dot');
    
    if (statusElement && statusDot) {
        if (isOnline) {
            statusDot.classList.add('online');
            statusElement.innerHTML = '<span class="chatbot-status-dot online"></span>Online';
        } else {
            statusDot.classList.remove('online');
            statusElement.innerHTML = '<span class="chatbot-status-dot"></span>Offline';
        }
    }
}

function addWelcomeMessage() {
    const chatbotBody = document.querySelector('.chatbot-body');
    if (!chatbotBody) return;
    
    const assistantName = phoenixAI.assistant_name || 'Phoenix AI';
    const statusMessage = isOnline ? "I'm online and ready to help!" : "I'm currently offline.";
    
    let welcomeContent = '<strong>Welcome to Vault Phoenix!</strong><br><br>' + statusMessage;
    
    if (isOnline && phoenixAI.focus_areas) {
        welcomeContent += '<br><br>Ask me about:<ul style="margin: 10px 0; padding-left: 20px;">';
        phoenixAI.focus_areas.forEach(area => {
            welcomeContent += '<li>' + area + '</li>';
        });
        welcomeContent += '</ul>';
    }
    
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
    if (!message || isTyping) return;
    
    if (!isOnline) {
        addChatMessage('user', message);
        setTimeout(() => chatbotInput.blur(), 1000);
        addChatMessage('assistant', '⚠️ I am currently offline.');
        chatbotInput.value = '';
        return;
    }
    
    if (CLAUDE_API_KEY === 'YOUR_CLAUDE_API_KEY_HERE') {
        addChatMessage('user', message);
        setTimeout(() => chatbotInput.blur(), 1000);
        addChatMessage('assistant', '⚠️ API key not configured.');
        chatbotInput.value = '';
        return;
    }
    
    addChatMessage('user', message);
    chatbotInput.value = '';
    setTimeout(() => chatbotInput.blur(), 1000);
    
    chatbotInput.disabled = true;
    chatbotSend.disabled = true;
    isTyping = true;
    
    showTypingIndicator();
    
    try {
        const messages = [...conversationHistory, { role: 'user', content: message }];
        
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
                system: getEnhancedSystemPrompt(),
                messages: messages
            })
        });
        
        if (!response.ok) {
            throw new Error('API Error: ' + response.status);
        }
        
        const data = await response.json();
        removeTypingIndicator();
        
        const assistantMessage = data.content[0].text;
        conversationHistory.push(
            { role: 'user', content: message },
            { role: 'assistant', content: assistantMessage }
        );
        
        addChatMessage('assistant', assistantMessage);
        
    } catch (error) {
        removeTypingIndicator();
        addChatMessage('assistant', '❌ Sorry, I encountered an error.');
    } finally {
        chatbotInput.disabled = false;
        chatbotSend.disabled = false;
        isTyping = false;
    }
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
// INITIALIZATION
// ============================================

async function init() {
    console.log('🔥 Vault Phoenix v6.5 Initializing...');
    
    await loadPhoenixAITraining();
    
    handleNavbarScroll();
    initializeCookieConsent();
    initializePrivacyPolicyModal();
    initializeScrollProgress();
    
    generateNavigation();
    
    phoenixSiteData = await siteScanner.initializeScan();
    
    setTimeout(() => {
        attachSmoothScrollListeners();
    }, 100);
    
    let chatbotInitialized = initializeChatbot();
    if (!chatbotInitialized) {
        setTimeout(() => initializeChatbot(), 100);
    }
    
    let countdownInitialized = initializeUniversalCountdown();
    if (!countdownInitialized) {
        setTimeout(() => initializeUniversalCountdown(), 100);
    }
    
    document.body.classList.add('loaded');
    window.sharedScriptReady = true;
    
    console.log('✅ Vault Phoenix v6.5 Complete');
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

})();
