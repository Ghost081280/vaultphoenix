// ============================================
// VAULT PHOENIX MAIN.HTML LOCAL JAVASCRIPT
// Updated with modal functionality and all interactive features
// ============================================

(function() {
'use strict';

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
    
    if (!modal || !openBtn || !termsCheckbox) {
        console.warn('Terms modal elements not found');
        return;
    }
    
    // Open modal
    openBtn.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
    
    // Close modal
    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    if (closeBtn) {
        closeBtn.addEventListener('click', closeModal);
    }
    
    if (cancelBtn) {
        cancelBtn.addEventListener('click', closeModal);
    }
    
    // Click outside to close
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    // Agree button - enables checkbox and closes modal
    if (agreeBtn) {
        agreeBtn.addEventListener('click', function() {
            termsCheckbox.disabled = false;
            termsCheckbox.checked = true;
            closeModal();
        });
    }
    
    // ESC key to close
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
    
    if (!modal || !openBtn) {
        console.warn('Info modal elements not found');
        return;
    }
    
    // Open modal
    openBtn.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
    
    // Close modal
    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    if (closeBtn) {
        closeBtn.addEventListener('click', closeModal);
    }
    
    if (okBtn) {
        okBtn.addEventListener('click', closeModal);
    }
    
    // Click outside to close
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    // ESC key to close
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });
}

// ============================================
// PHONE IMAGE GALLERY
// ============================================
window.changePhoneImage = function(imagePath, altText) {
    const mainImage = document.getElementById('mainPhoneScreenshot');
    const thumbs = document.querySelectorAll('.simple-thumb');
    
    if (mainImage) {
        mainImage.src = imagePath;
        mainImage.alt = altText;
    }
    
    // Update active state
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
// LAPTOP IMAGE GALLERY
// ============================================
window.changeLaptopImage = function(imagePath, altText) {
    const mainImage = document.getElementById('mainLaptopScreenshot');
    const thumbs = document.querySelectorAll('.simple-thumb-laptop');
    
    if (mainImage) {
        mainImage.src = imagePath;
        mainImage.alt = altText;
    }
    
    // Update active state
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
    
    if (!form) {
        console.warn('Airdrop form not found');
        return;
    }
    
    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const name = document.getElementById('claim-name').value.trim();
        const wallet = document.getElementById('claim-wallet').value.trim();
        const email = document.getElementById('claim-email').value.trim();
        const socialUrl = document.getElementById('claim-social-url').value.trim();
        const termsChecked = document.getElementById('claim-terms').checked;
        
        // Validation
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
        
        // Simulate submission (replace with actual API call)
        showMessage('loading', 'Submitting your claim...');
        
        try {
            // TODO: Replace with actual API endpoint
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
            setTimeout(() => {
                messageBox.style.display = 'none';
            }, 5000);
        }
    }
}

// ============================================
// CHECK CLAIM STATUS
// ============================================
function initializeStatusChecker() {
    const checkBtn = document.getElementById('check-status-btn');
    const walletInput = document.getElementById('status-wallet');
    
    if (!checkBtn || !walletInput) {
        console.warn('Status checker elements not found');
        return;
    }
    
    checkBtn.addEventListener('click', async function() {
        const wallet = walletInput.value.trim();
        
        if (!wallet) {
            alert('Please enter a wallet address');
            return;
        }
        
        // TODO: Replace with actual API call
        try {
            checkBtn.textContent = 'Checking...';
            checkBtn.disabled = true;
            
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            // Simulate response
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
    // X (Twitter) share
    const shareXBtn = document.getElementById('share-x-btn');
    if (shareXBtn) {
        shareXBtn.addEventListener('click', function() {
            const text = 'Join me in the $Ember Airdrop! 🔥 AR Crypto Gaming with GPS & Beacon technology. Get your FREE tokens now!';
            const url = 'https://vaultphoenix.com/ember.html';
            const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
            window.open(twitterUrl, '_blank', 'width=600,height=400');
        });
    }
    
    // Facebook share
    const shareFacebookBtn = document.getElementById('share-facebook-btn');
    if (shareFacebookBtn) {
        shareFacebookBtn.addEventListener('click', function() {
            const url = 'https://vaultphoenix.com/ember.html';
            const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
            window.open(facebookUrl, '_blank', 'width=600,height=400');
        });
    }
    
    // Telegram share
    const shareTelegramBtn = document.getElementById('share-telegram-btn');
    if (shareTelegramBtn) {
        shareTelegramBtn.addEventListener('click', function() {
            const text = 'Join me in the $Ember Airdrop! 🔥 AR Crypto Gaming with GPS & Beacon technology. Get your FREE tokens now!';
            const url = 'https://vaultphoenix.com/ember.html';
            const telegramUrl = `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`;
            window.open(telegramUrl, '_blank', 'width=600,height=400');
        });
    }
}

// ============================================
// AIRDROP PROGRESS TRACKER
// ============================================
function initializeAirdropTracker() {
    const totalEmber = 16670000;
    const claimed = 0; // TODO: Replace with actual data from API
    const remaining = totalEmber - claimed;
    const people = 0;
    const maxPeople = 5000;
    const percentage = ((claimed / totalEmber) * 100).toFixed(2);
    
    // Update UI
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
function init() {
    console.log('🔥 Main page local JS initializing...');
    
    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            initializeModals();
        });
    } else {
        initializeModals();
    }
    
    function initializeModals() {
        // Initialize all components
        initializeTermsModal();
        initializeInfoModal();
        initializeAirdropForm();
        initializeStatusChecker();
        initializeShareButtons();
        initializeAirdropTracker();
        
        console.log('✅ Main page local JS initialized');
    }
}

// Start initialization
init();

})();
