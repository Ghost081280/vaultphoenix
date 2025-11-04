/**
 * ============================================
 * VAULT PHOENIX - EMBER PAGE LOCAL JAVASCRIPT
 * v3.0.0 - MERGED & OPTIMIZED FOR EMBER
 * ============================================
 */

 (function() {
    'use strict';

    // CONFIG (Updated)
    const CONFIG = {
        SHARED_READY_TIMEOUT: 5000,
        SHARED_READY_CHECK_INTERVAL: 50,
        SCROLL_REVEAL_THRESHOLD: 0.1,
        SCROLL_REVEAL_ROOT_MARGIN: '0px 0px -50px 0px',
        BACKEND_READY: true,  // Set to true for live
        API_BASE: '/api',
        TOTAL_EMBER: 16670000,
        TOKENS_PER_CLAIM: 3333,
        MAX_RECIPIENTS: 5000
    };

    // SHARE_CONFIG (Existing)

    // LOGGER (Existing)

    // SCROLL REVEAL (Existing)

    // COUNTDOWN (New - Target Nov 11, 2025, 12:00 PM EST)
    function startCountdown() {
        const target = new Date('2025-11-11T12:00:00-05:00').getTime();
        const timer = setInterval(() => {
            const now = new Date().getTime();
            const diff = target - now;
            if (diff <= 0) {
                clearInterval(timer);
                document.querySelectorAll('.ember-countdown-number').forEach(el => el.textContent = '00');
                return;
            }
            const days = Math.floor(diff / (1000 * 60 * 60 * 24));
            const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((diff % (1000 * 60)) / 1000);
            document.getElementById('days').textContent = days.toString().padStart(2, '0');
            document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
            document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
            document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
        }, 1000);
    }

    // AIRDROP TERMS MODAL (Existing, updated for Solana)

    // AIRDROP INFO MODAL (Existing)

    // AIRDROP FORM (Existing, add Solana validation)
    function initializeAirdropForm() {
        // Existing
        // Add validation
        const walletInput = document.getElementById('airdrop-wallet');
        walletInput.addEventListener('input', () => {
            const isValidSolana = /^[1-9A-HJ-NP-Za-km-z]{32,44}$/.test(walletInput.value);
            // Enable button if valid
        });
    }

    // STATUS CHECKER (Existing)

    // SHARE BUTTONS (Existing)

    // AIRDROP TRACKER (Existing)

    // SHARED COMPONENTS LOADER (Existing)

    // WAIT FOR SHARED (Existing)

    // INITIALIZATION (Add countdown)
    async function initialize() {
        // Existing
        startCountdown();
    }

    // ENTRY POINT (Existing)
})();
