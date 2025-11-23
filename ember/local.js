/* ULTRA DEBUG VERSION - Logs everything */

(function() {
    'use strict';
    
    console.log('🔥🔥🔥 SCRIPT LOADING - DEBUG VERSION 🔥🔥🔥');
    
    // Configuration
    const CONFIG = {
        presaleDate: '2025-12-01T12:00:00-05:00',
        tokenPrice: 0.003,
        minInvestment: 10,
        maxInvestment: 50000,
        airdrop: {
            totalEmber: 9000000,
            claimed: 0,
            maxPeople: 2700,
            tokensPerClaim: 3333
        }
    };
    
    console.log('✅ Config loaded');
    
    // Create TPA modal function IMMEDIATELY
    window.showTpaModal = function() {
        console.log('🚀 showTpaModal CALLED!');
        const modal = document.getElementById('tpaModal');
        console.log('Modal element:', modal);
        
        if (modal) {
            console.log('✅ Modal found, setting display flex');
            modal.style.display = 'flex';
            modal.style.position = 'fixed';
            modal.style.top = '0';
            modal.style.left = '0';
            modal.style.width = '100%';
            modal.style.height = '100%';
            modal.style.zIndex = '99999';
            document.body.style.overflow = 'hidden';
            console.log('✅ TPA modal should now be visible');
        } else {
            console.error('❌ TPA MODAL NOT FOUND!');
        }
    };
    
    window.closeTpaModal = function() {
        console.log('Closing TPA modal');
        const modal = document.getElementById('tpaModal');
        if (modal) {
            modal.style.display = 'none';
            document.body.style.overflow = '';
        }
    };
    
    window.agreeTpa = function() {
        console.log('Agreeing to TPA');
        const checkbox = document.getElementById('tpa-agree-checkbox');
        if (checkbox) {
            checkbox.checked = true;
            checkbox.dispatchEvent(new Event('change'));
        }
        window.closeTpaModal();
    };
    
    console.log('✅ TPA functions created');
    console.log('window.showTpaModal:', window.showTpaModal);
    
    // Create Whitepaper modal function IMMEDIATELY
    window.showWhitepaperModal = function() {
        console.log('🚀 showWhitepaperModal CALLED!');
        const modal = document.getElementById('whitepaperModal');
        console.log('Modal element:', modal);
        
        if (modal) {
            console.log('✅ Modal found, setting display flex');
            modal.style.display = 'flex';
            modal.style.position = 'fixed';
            modal.style.top = '0';
            modal.style.left = '0';
            modal.style.width = '100%';
            modal.style.height = '100%';
            modal.style.zIndex = '99999';
            document.body.style.overflow = 'hidden';
            console.log('✅ Whitepaper modal should now be visible');
        } else {
            console.error('❌ WHITEPAPER MODAL NOT FOUND!');
        }
    };
    
    window.closeWhitepaperModal = function() {
        console.log('Closing Whitepaper modal');
        const modal = document.getElementById('whitepaperModal');
        if (modal) {
            modal.style.display = 'none';
            document.body.style.overflow = '';
        }
    };
    
    console.log('✅ Whitepaper functions created');
    console.log('window.showWhitepaperModal:', window.showWhitepaperModal);
    
    console.log('✅✅✅ ALL MODAL FUNCTIONS CREATED SUCCESSFULLY ✅✅✅');
    console.log('Type window.showTpaModal() or window.showWhitepaperModal() to test');
    
})();

console.log('🔥 DEBUG VERSION LOADED COMPLETELY 🔥');
