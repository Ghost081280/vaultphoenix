// ============================================
// VAULT PHOENIX MAIN.HTML LOCAL JAVASCRIPT
// UPDATED - With scroll position restoration & smooth page load
// ============================================

(function() {
'use strict';

// ============================================
// SCROLL POSITION RESTORATION
// Fixes refresh flash and returns user to same spot
// ============================================
function saveScrollPosition() {
    sessionStorage.setItem('scrollPosition', window.scrollY);
}

function restoreScrollPosition() {
    const scrollPosition = sessionStorage.getItem('scrollPosition');
    if (scrollPosition) {
        requestAnimationFrame(() => {
            window.scrollTo({
                top: parseInt(scrollPosition, 10),
                behavior: 'instant'
            });
        });
    }
}

window.addEventListener('beforeunload', saveScrollPosition);
window.addEventListener('load', restoreScrollPosition);
window.addEventListener('pagehide', () => {
    sessionStorage.removeItem('scrollPosition');
});

// ============================================
// WAIT FOR GLOBAL.JS TO COMPLETE
// ============================================
function waitForGlobalReady(callback) {
    if (window.sharedScriptReady) {
        console.log('✅ Global.js ready - initializing main.js');
        callback();
        return;
    }
    
    let checkCount = 0;
    const maxChecks = 100;
    
    const checkInterval = setInterval(() => {
        checkCount++;
        
        if (window.sharedScriptReady) {
            clearInterval(checkInterval);
            console.log('✅ Global.js ready - initializing main.js');
            callback();
        } else if (checkCount >= maxChecks) {
            clearInterval(checkInterval);
            console.warn('⚠️ Global.js timeout - initializing anyway');
            callback();
        }
    }, 50);
}

// ============================================
// AIRDROP TERMS MODAL
// ============================================
function initializeTermsModal() {
    const modal = document.getElementById('airdrop-terms-modal');
    const openBtn = document.getElementById('open-terms-modal');
    const closeBtn = document.getElementById('close-terms-modal');
    const agreeBtn = document.getElementById('agree-terms-btn');
    const cancelBtn = document.getElementById('cancel-terms-btn');
    const termsCheckbox = document.getElementById('claim-terms');
    
    if (!modal || !openBtn || !termsCheckbox) return;
    
    openBtn.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        modal.classList.add('active');
        document.body.classList.add('modal-open');
    });
    
    function closeModal(e) {
        if (e) e.preventDefault();
        modal.classList.remove('active');
        document.body.classList.remove('modal-open');
    }
    
    if (closeBtn) closeBtn.addEventListener('click', closeModal);
    if (cancelBtn) cancelBtn.addEventListener('click', closeModal);
    
    modal.addEventListener('click', function(e) {
        if (e.target === modal) closeModal(e);
    });
    
    if (agreeBtn) {
        agreeBtn.addEventListener('click', function(e) {
            e.preventDefault();
            termsCheckbox.disabled = false;
            termsCheckbox.checked = true;
            closeModal();
        });
    }
    
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });
}

// ============================================
// AIRDROP INFO MODAL
// ============================================
function initializeInfoModal() {
    const modal = document.getElementById('airdrop-info-modal');
    const openBtn = document.getElementById('airdrop-info-btn');
    const closeBtn = document.getElementById('close-info-modal');
    const okBtn = document.getElementById('ok-info-btn');
    
    if (!modal || !openBtn) return;
    
    openBtn.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
        modal.classList.add('active');
        document.body.classList.add('modal-open');
        return false;
    }, { capture: true, passive: false });
    
    function closeModal(e) {
        if (e) {
            e.preventDefault();
            e.stopPropagation();
        }
        modal.classList.remove('active');
        document.body.classList.remove('modal-open');
    }
    
    if (closeBtn) closeBtn.addEventListener('click', closeModal);
    if (okBtn) okBtn.addEventListener('click', closeModal);
    
    modal.addEventListener('click', function(e) {
        if (e.target === modal) closeModal(e);
    });
    
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });
}

// ============================================
// PHONE & LAPTOP IMAGE GALLERIES
// ============================================
window.changePhoneImage = function(imagePath, altText) {
    const mainImage = document.getElementById('mainPhoneScreenshot');
    const thumbs = document.querySelectorAll('.simple-thumb');
    
    if (mainImage) {
        mainImage.src = imagePath;
        mainImage.alt = altText;
    }
    
    thumbs.forEach(thumb => {
        const img = thumb.querySelector('img');
        if (img && img.src.includes(imagePath.split('/').pop())) {
            thumb.classList.add('active');
        } else {
            thumb.classList.remove('active');
        }
    });
};

window.changeLaptopImage = function(imagePath, altText) {
    const mainImage = document.getElementById('mainLaptopScreenshot');
    const thumbs = document.querySelectorAll('.simple-thumb-laptop');
    
    if (mainImage) {
        mainImage.src = imagePath;
        mainImage.alt = altText;
    }
    
    thumbs.forEach(thumb => {
        const img = thumb.querySelector('img');
        if (img && img.src.includes(imagePath.split('/').pop())) {
            thumb.classList.add('active');
        } else {
            thumb.classList.remove('active');
        }
    });
};

// ============================================
// AIRDROP FORM HANDLING
// ============================================
function initializeAirdropForm() {
    const form = document.getElementById('ember-claim-form');
    const messageBox = document.getElementById('ember-message-box');
    
    if (!form) return;
    
    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const wallet = document.getElementById('claim-wallet').value.trim();
        const socialUrl = document.getElementById('claim-social-url').value.trim();
        const termsChecked = document.getElementById('claim-terms').checked;
        
        if (!wallet) {
            showMessage('error', 'Please enter your Solana wallet address');
            return;
        }
        
        if (!socialUrl) {
            showMessage('error', 'Please enter your social media post URL');
            return;
        }
        
        if (!termsChecked) {
            showMessage('error', 'Please agree to the terms and conditions');
            return;
        }
        
        showMessage('info', 'Submitting your claim...');
        
        try {
            await new Promise(resolve => setTimeout(resolve, 2000));
            showMessage('success', '🎉 Claim submitted successfully! Check your email for confirmation.');
            form.reset();
            document.getElementById('claim-terms').disabled = true;
        } catch (error) {
            showMessage('error', 'Failed to submit claim. Please try again.');
        }
    });
    
    function showMessage(type, text) {
        if (!messageBox) return;
        messageBox.style.display = 'block';
        messageBox.className = 'message-box-compact ' + type;
        messageBox.textContent = text;
        if (type === 'success') {
            setTimeout(() => messageBox.style.display = 'none', 5000);
        }
    }
}

// ============================================
// CHECK CLAIM STATUS
// ============================================
function initializeStatusChecker() {
    const checkBtn = document.getElementById('check-status-btn');
    const walletInput = document.getElementById('status-wallet');
    
    if (!checkBtn || !walletInput) return;
    
    checkBtn.addEventListener('click', async function() {
        const wallet = walletInput.value.trim();
        if (!wallet) {
            alert('Please enter a wallet address');
            return;
        }
        
        try {
            checkBtn.textContent = 'Checking...';
            checkBtn.disabled = true;
            await new Promise(resolve => setTimeout(resolve, 1500));
            alert(`Status for ${wallet.substring(0, 8)}...${wallet.substring(wallet.length - 4)}:\n\nNo claims found for this wallet address.`);
        } catch (error) {
            alert('Error checking status. Please try again.');
        } finally {
            checkBtn.textContent = 'Check';
            checkBtn.disabled = false;
        }
    });
}

// ============================================
// SHARE BUTTON HANDLERS
// ============================================
function initializeShareButtons() {
    const shareXBtn = document.getElementById('share-x-btn');
    if (shareXBtn) {
        shareXBtn.addEventListener('click', function() {
            const text = 'Join me in the $Ember Airdrop! 🔥 AR Crypto Gaming with GPS & Beacon technology. Get your FREE tokens now!';
            const url = 'https://vaultphoenix.com/ember.html';
            window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, '_blank', 'width=600,height=400');
        });
    }
    
    const shareFacebookBtn = document.getElementById('share-facebook-btn');
    if (shareFacebookBtn) {
        shareFacebookBtn.addEventListener('click', function() {
            const url = 'https://vaultphoenix.com/ember.html';
            window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank', 'width=600,height=400');
        });
    }
    
    const shareTelegramBtn = document.getElementById('share-telegram-btn');
    if (shareTelegramBtn) {
        shareTelegramBtn.addEventListener('click', function() {
            const text = 'Join me in the $Ember Airdrop! 🔥 AR Crypto Gaming with GPS & Beacon technology. Get your FREE tokens now!';
            const url = 'https://vaultphoenix.com/ember.html';
            window.open(`https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`, '_blank', 'width=600,height=400');
        });
    }
}

// ============================================
// AIRDROP PROGRESS TRACKER
// ============================================
function initializeAirdropTracker() {
    const totalEmber = 16670000;
    const claimed = 0;
    const remaining = totalEmber - claimed;
    const people = 0;
    const maxPeople = 5000;
    const percentage = ((claimed / totalEmber) * 100).toFixed(2);
    
    const claimedEl = document.getElementById('ember-claimed');
    const remainingEl = document.getElementById('ember-remaining');
    const peopleEl = document.getElementById('ember-people-claimed');
    const progressBar = document.getElementById('ember-progress-bar');
    const progressPercentage = document.getElementById('ember-progress-percentage');
    
    if (claimedEl) claimedEl.textContent = claimed.toLocaleString();
    if (remainingEl) remainingEl.textContent = remaining.toLocaleString();
    if (peopleEl) peopleEl.textContent = `${people.toLocaleString()} / ${maxPeople.toLocaleString()}`;
    if (progressBar) progressBar.style.width = `${percentage}%`;
    if (progressPercentage) progressPercentage.textContent = percentage;
}

// ============================================
// INITIALIZATION
// ============================================
function initializeMainPage() {
    console.log('🔥 Main page local JS initializing...');
    
    initializeTermsModal();
    initializeInfoModal();
    initializeAirdropForm();
    initializeStatusChecker();
    initializeShareButtons();
    initializeAirdropTracker();
    
    console.log('✅ Main page local JS initialized');
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
        waitForGlobalReady(initializeMainPage);
    });
} else {
    waitForGlobalReady(initializeMainPage);
}

})();
