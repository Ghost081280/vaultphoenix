/* FORCE MODAL FUNCTIONS - GUARANTEED NOT TO BE OVERWRITTEN */

(function() {
    'use strict';
    
    console.log('🔥 FORCE MODALS VERSION LOADING...');
    
    // Define functions MULTIPLE times to ensure they exist
    const createModalFunctions = function() {
        console.log('Creating modal functions...');
        
        // TPA Modal
        window.showTpaModal = function() {
            console.log('🚀 showTpaModal called');
            const modal = document.getElementById('tpaModal');
            if (modal) {
                modal.style.display = 'flex';
                modal.style.position = 'fixed';
                modal.style.top = '0';
                modal.style.left = '0';  
                modal.style.width = '100%';
                modal.style.height = '100%';
                modal.style.zIndex = '99999';
                document.body.style.overflow = 'hidden';
                console.log('✅ TPA modal opened');
            } else {
                console.error('❌ TPA modal not found');
            }
        };
        
        window.closeTpaModal = function() {
            const modal = document.getElementById('tpaModal');
            if (modal) {
                modal.style.display = 'none';
                document.body.style.overflow = '';
            }
        };
        
        window.agreeTpa = function() {
            const checkbox = document.getElementById('tpa-agree-checkbox');
            if (checkbox) {
                checkbox.checked = true;
                checkbox.dispatchEvent(new Event('change'));
            }
            window.closeTpaModal();
        };
        
        // Whitepaper Modal
        window.showWhitepaperModal = function() {
            console.log('🚀 showWhitepaperModal called');
            const modal = document.getElementById('whitepaperModal');
            if (modal) {
                modal.style.display = 'flex';
                modal.style.position = 'fixed';
                modal.style.top = '0';
                modal.style.left = '0';
                modal.style.width = '100%';
                modal.style.height = '100%';
                modal.style.zIndex = '99999';
                document.body.style.overflow = 'hidden';
                console.log('✅ Whitepaper modal opened');
            } else {
                console.error('❌ Whitepaper modal not found');
            }
        };
        
        window.closeWhitepaperModal = function() {
            const modal = document.getElementById('whitepaperModal');
            if (modal) {
                modal.style.display = 'none';
                document.body.style.overflow = '';
            }
        };
        
        console.log('✅ Modal functions created');
    };
    
    // Create functions IMMEDIATELY
    createModalFunctions();
    
    // Create again after 100ms
    setTimeout(createModalFunctions, 100);
    
    // Create again after 500ms
    setTimeout(createModalFunctions, 500);
    
    // Create again when DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', createModalFunctions);
    } else {
        createModalFunctions();
    }
    
    console.log('🔥 FORCE MODALS VERSION LOADED - Functions created multiple times to ensure they exist!');
    
})();
