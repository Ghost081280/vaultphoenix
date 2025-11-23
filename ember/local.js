/* SUPER SIMPLE TEST VERSION - Just button clicks */

console.log('🔥🔥🔥 SIMPLE TEST JS LOADING... 🔥🔥🔥');

// Wait for DOM
document.addEventListener('DOMContentLoaded', function() {
    console.log('✅ DOM Ready!');
    
    // Test 1: Airdrop Info Button
    const airdropBtn = document.getElementById('airdrop-info-btn');
    console.log('Airdrop button:', airdropBtn);
    
    if (airdropBtn) {
        console.log('✅ FOUND airdrop-info-btn');
        airdropBtn.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('🎉 AIRDROP BUTTON CLICKED!');
            alert('Airdrop button works! JavaScript IS running!');
        });
    } else {
        console.error('❌ airdrop-info-btn NOT FOUND in HTML!');
    }
    
    // Test 2: Terms Button
    const termsBtn = document.getElementById('open-terms-modal');
    console.log('Terms button:', termsBtn);
    
    if (termsBtn) {
        console.log('✅ FOUND open-terms-modal');
        termsBtn.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('🎉 TERMS BUTTON CLICKED!');
            alert('Terms button works!');
        });
    } else {
        console.error('❌ open-terms-modal NOT FOUND in HTML!');
    }
    
    // Test 3: Share X Button
    const shareXBtn = document.getElementById('share-x-ember');
    console.log('Share X button:', shareXBtn);
    
    if (shareXBtn) {
        console.log('✅ FOUND share-x-ember');
        shareXBtn.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('🎉 SHARE X BUTTON CLICKED!');
            alert('Share X button works!');
        });
    } else {
        console.error('❌ share-x-ember NOT FOUND in HTML!');
    }
    
    // Test 4: Copy Hashtags Button
    const copyBtn = document.getElementById('copy-hashtags-btn');
    console.log('Copy button:', copyBtn);
    
    if (copyBtn) {
        console.log('✅ FOUND copy-hashtags-btn');
        copyBtn.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('🎉 COPY BUTTON CLICKED!');
            alert('Copy button works!');
        });
    } else {
        console.error('❌ copy-hashtags-btn NOT FOUND in HTML!');
    }
    
    console.log('✅✅✅ ALL TESTS COMPLETE - Check messages above ✅✅✅');
});

console.log('🔥 Script file loaded (before DOM ready)');
