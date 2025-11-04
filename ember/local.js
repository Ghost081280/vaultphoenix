// ============================================
// VAULT PHOENIX - INTERACTIVE JAVASCRIPT
// ============================================

'use strict';

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
    
    isLowEndDevice() {
        const memory = navigator.deviceMemory || 4;
        const cores = navigator.hardwareConcurrency || 2;
        return memory < 4 || cores < 4 || this.isMobile;
    },
    
    getOptimalParticleCount() {
        if (this.prefersReducedMotion) return 0;
        if (this.screenWidth < 480) return 3;
        if (this.screenWidth < 768) return 4;
        if (this.isLowEndDevice()) return 4;
        return 6;
    }
};

function safeQuery(selector, context = document) {
    try {
        return context.querySelector(selector);
    } catch (error) {
        console.warn(`Failed to query selector: ${selector}`, error);
        return null;
    }
}

function safeQueryAll(selector, context = document) {
    try {
        return Array.from(context.querySelectorAll(selector));
    } catch (error) {
        console.warn(`Failed to query selector: ${selector}`, error);
        return [];
    }
}

const requestAnimFrame = window.requestAnimationFrame || 
                         window.webkitRequestAnimationFrame || 
                         window.mozRequestAnimationFrame || 
                         function(callback) { setTimeout(callback, 1000 / 60); };

let lastWidth = window.innerWidth;
let lastHeight = window.innerHeight;

const handleResize = window.throttle(() => {
    const newWidth = window.innerWidth;
    const newHeight = window.innerHeight;
    
    if (Math.abs(newHeight - lastHeight) > 100 && newWidth === lastWidth) {
        return;
    }
    
    DeviceInfo.screenWidth = newWidth;
    DeviceInfo.screenHeight = newHeight;
    lastWidth = newWidth;
    lastHeight = newHeight;
}, 250);

window.addEventListener('resize', handleResize);

function createFloatingCoins() {
    const container = safeQuery('.hero-floating-coins');
    if (!container) return;

    const coinCount = DeviceInfo.getOptimalParticleCount();
    const coins = [];

    for (let i = 0; i < coinCount; i++) {
        const coin = document.createElement('div');
        coin.className = 'hero-coin';
        coin.innerHTML = '<img src="images/VPEmberCoin.PNG" alt="Floating Ember Coin" loading="lazy">';
        
        coin.style.left = `${Math.random() * 100}%`;
        coin.style.top = `${Math.random() * 100}%`;
        coin.style.width = `${Math.random() * 150 + 100}px`;
        coin.style.animationDelay = `${Math.random() * 5}s`;
        coin.style.animationDuration = `${Math.random() * 10 + 10}s`;
        
        container.appendChild(coin);
        coins.push(coin);
    }

    let time = 0;
    function animate() {
        time += 0.05;
        coins.forEach((coin, i) => {
            const x = Math.sin(time + i) * 10;
            const y = Math.cos(time + i * 0.5) * 10;
            coin.style.transform = `translate(${x}px, ${y}px)`;
        });
        requestAnimFrame(animate);
    }

    if (!DeviceInfo.prefersReducedMotion) {
        animate();
    }
}

window.openTpaModal = function() {
    const modal = safeQuery('#tpaModal');
    if (modal) {
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
        modal.focus();
    }
};

window.closeTpaModal = function() {
    const modal = safeQuery('#tpaModal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = '';
    }
};

window.openWhitepaperModal = function() {
    const modal = safeQuery('#whitepaperModal');
    if (modal) {
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
        modal.focus();
    }
};

window.closeWhitepaperModal = function() {
    const modal = safeQuery('#whitepaperModal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = '';
    }
};

function trapFocus(modal) {
    const focusable = modal.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    modal.addEventListener('keydown', (e) => {
        if (e.key === 'Tab') {
            if (e.shiftKey && document.activeElement === first) {
                e.preventDefault();
                last.focus();
            } else if (!e.shiftKey && document.activeElement === last) {
                e.preventDefault();
                first.focus();
            }
        }
    });
}

const modals = safeQueryAll('.tpa-modal');
modals.forEach(trapFocus);

function mobileOptimizations() {
    if (!DeviceInfo.isMobile) return;

    const viewport = document.querySelector('meta[name=viewport]');
    if (viewport) {
        viewport.content = 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no';
    }

    document.addEventListener('touchmove', (e) => {
        if (e.scale !== 1) {
            e.preventDefault();
        }
    }, { passive: false });

    safeQueryAll('img').forEach(img => {
        if (DeviceInfo.pixelRatio > 1) {
            img.srcset = `${img.src} 1x, ${img.src.replace('.', '@2x.')} 2x`;
        }
    });

    if (DeviceInfo.isLowEndDevice()) {
        document.body.classList.add('low-end-device');
    }
    
    window.addEventListener('orientationchange', window.debounce(() => {
        DeviceInfo.screenWidth = window.innerWidth;
        DeviceInfo.screenHeight = window.innerHeight;
    }, 300));
}

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
        console.log('BONUS ACTIVATED!');
        
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
                    will-change: transform, opacity;
                `;
                
                document.body.appendChild(coin);
                setTimeout(() => coin.remove(), 4000);
            }, i * 100);
        }
        
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

console.log('%cVAULT PHOENIX', 'color: #d73327; font-size: 24px; font-weight: bold;');
console.log('%cAR Crypto Gaming Revolution', 'color: #fb923c; font-size: 16px; font-weight: bold;');
console.log('%ccontact@vaultphoenix.com', 'color: #374151; font-size: 12px;');
console.log('%cSenior Engineering - Mobile-First Architecture v3.1', 'color: #22c55e; font-size: 12px; font-weight: bold;');
console.log('%cIntegrated with shared-script.js', 'color: #3b82f6; font-size: 12px; font-weight: bold;');
console.log('Try the Konami Code for a surprise! ⬆️⬆️⬇️⬇️⬅️➡️⬅️➡️BA');

document.addEventListener('DOMContentLoaded', () => {
    createFloatingCoins();
    mobileOptimizations();
    
    const waitForShared = setInterval(() => {
        if (window.sharedScriptReady) {
            clearInterval(waitForShared);
            console.log('Shared script ready - Ember page initialized');
        }
    }, 50);
    
    setTimeout(() => clearInterval(waitForShared), 5000);
});
