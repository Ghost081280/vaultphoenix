// Vault Phoenix AR Crypto Gaming - SESSION PROTECTION
// PROTECTION: Only affects crypto-game/ folder - prevents main site interference
// FILE PATH: crypto-game/session-protection.js

console.log('🔒 Vault Phoenix Session Protection Loading...');

// IMMEDIATE PROTECTION - CHECK IF THIS IS A CRYPTO GAME PAGE
(function() {
    const cryptoFlag = document.getElementById('cryptoGameFlag');
    const isCryptoPage = cryptoFlag || 
                        document.body.classList.contains('crypto-dashboard-page') || 
                        window.location.pathname.includes('crypto-game') ||
                        document.title.includes('Vault Phoenix');
    
    if (!isCryptoPage) {
        console.log('🚫 Not a crypto game page - blocking session protection JavaScript execution');
        return;
    }
    
    window.isVaultPhoenixSession = true;
    console.log('🔒 Session Protection ACTIVE - Page confirmed');
})();

// ONLY RUN SESSION PROTECTION IF THIS IS A CRYPTO GAME PAGE
if (window.isVaultPhoenixSession) {

    class VaultPhoenixSessionProtection {
        constructor() {
            console.log('🔒 Vault Phoenix Session Protection initializing...');
            
            // Initialize immediately - no waiting for DOM
            this.init();
            
            // Make globally accessible
            window.vaultPhoenixSession = this;
        }

        init() {
            console.log('🔧 Checking session protection...');
            try {
                this.checkSession();
                this.setupSessionMonitoring();
                console.log('✅ Session protection initialized');
            } catch (error) {
                console.error('❌ Session protection error:', error);
                this.redirectToLogin('Session protection error');
            }
        }

        checkSession() {
            try {
                const session = sessionStorage.getItem('vaultPhoenixSession');
                
                if (!session) {
                    console.warn('🚫 No session found, redirecting to login...');
                    this.redirectToLogin('Please log in to access the AR $Ember Hunt');
                    return false;
                }

                const sessionData = JSON.parse(session);
                
                // Check if session has required fields
                if (!sessionData.email || !sessionData.loginTime || !sessionData.sessionId) {
                    console.warn('🚫 Invalid session data, redirecting to login...');
                    this.clearSession();
                    this.redirectToLogin('Invalid session - please log in again');
                    return false;
                }

                // Check if session is expired (24 hours)
                const sessionAge = Date.now() - new Date(sessionData.loginTime).getTime();
                const maxAge = 24 * 60 * 60 * 1000; // 24 hours in milliseconds
                
                if (sessionAge > maxAge) {
                    console.warn('⏰ Session expired, redirecting to login...');
                    this.clearSession();
                    this.redirectToLogin('Session expired - please log in again');
                    return false;
                }

                // Session is valid
                console.log('✅ Valid session found for:', sessionData.email);
                console.log('⏰ Session age:', Math.round(sessionAge / (1000 * 60)), 'minutes');
                
                // Update session activity
                this.updateSessionActivity(sessionData);
                
                return true;
                
            } catch (error) {
                console.error('❌ Session check error:', error);
                this.clearSession();
                this.redirectToLogin('Session error - please log in again');
                return false;
            }
        }

        updateSessionActivity(sessionData) {
            try {
                sessionData.lastActivity = new Date().toISOString();
                sessionData.pageViews = (sessionData.pageViews || 0) + 1;
                sessionStorage.setItem('vaultPhoenixSession', JSON.stringify(sessionData));
                console.log('📊 Session activity updated');
            } catch (error) {
                console.error('❌ Session activity update error:', error);
            }
        }

        setupSessionMonitoring() {
            try {
                // Check session every 5 minutes
                setInterval(() => {
                    if (!this.checkSession()) {
                        console.warn('🚫 Session check failed during monitoring');
                    }
                }, 5 * 60 * 1000); // 5 minutes

                // Check session when page becomes visible (user returns to tab)
                document.addEventListener('visibilitychange', () => {
                    if (!document.hidden) {
                        console.log('👁️ Page visible, checking session...');
                        this.checkSession();
                    }
                });

                // Check session on beforeunload (when leaving page)
                window.addEventListener('beforeunload', () => {
                    const session = sessionStorage.getItem('vaultPhoenixSession');
                    if (session) {
                        const sessionData = JSON.parse(session);
                        sessionData.lastExit = new Date().toISOString();
                        sessionStorage.setItem('vaultPhoenixSession', JSON.stringify(sessionData));
                    }
                });

                console.log('📡 Session monitoring setup complete');
            } catch (error) {
                console.error('❌ Session monitoring setup error:', error);
            }
        }

        clearSession() {
            try {
                sessionStorage.removeItem('vaultPhoenixSession');
                localStorage.removeItem('vaultPhoenixRememberMe'); // Clear any remember me tokens
                console.log('🗑️ Session cleared');
            } catch (error) {
                console.error('❌ Session clear error:', error);
            }
        }

        redirectToLogin(message = 'Please log in to continue') {
            try {
                console.log('🔄 Redirecting to login:', message);
                
                // Show brief message before redirect
                this.showRedirectMessage(message);
                
                // Redirect after a short delay
                setTimeout(() => {
                    // Determine the correct path to login
                    const currentPath = window.location.pathname;
                    const isInCryptoGame = currentPath.includes('crypto-game');
                    
                    if (isInCryptoGame) {
                        // Already in crypto-game folder, just go to index.html
                        window.location.href = 'index.html';
                    } else {
                        // Navigate to crypto-game folder
                        window.location.href = 'crypto-game/index.html';
                    }
                }, 1500);
                
            } catch (error) {
                console.error('❌ Redirect error:', error);
                // Fallback redirect
                window.location.href = 'index.html';
            }
        }

        showRedirectMessage(message) {
            try {
                // Create redirect overlay
                const overlay = document.createElement('div');
                overlay.style.cssText = `
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100vw;
                    height: 100vh;
                    background: linear-gradient(135deg, rgba(0, 0, 0, 0.95), rgba(20, 20, 20, 0.95));
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    z-index: 10000;
                    backdrop-filter: blur(20px);
                    color: white;
                    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                `;

                overlay.innerHTML = `
                    <div style="text-align: center; max-width: 400px; padding: 40px 20px;">
                        <div style="
                            width: 80px;
                            height: 80px;
                            background: linear-gradient(135deg, rgba(240, 165, 0, 0.2), rgba(251, 146, 60, 0.15));
                            border: 3px solid rgba(240, 165, 0, 0.5);
                            border-radius: 50%;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            margin: 0 auto 24px auto;
                            animation: sessionRotate 2s ease-in-out infinite;
                        ">
                            <div style="font-size: 32px;">🔒</div>
                        </div>
                        
                        <div style="
                            color: #f0a500;
                            font-size: 24px;
                            font-weight: 800;
                            margin-bottom: 16px;
                        ">Session Required</div>
                        
                        <div style="
                            color: rgba(255, 255, 255, 0.9);
                            font-size: 16px;
                            line-height: 1.5;
                            margin-bottom: 24px;
                        ">${message}</div>
                        
                        <div style="
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            gap: 8px;
                            color: rgba(255, 255, 255, 0.7);
                            font-size: 14px;
                        ">
                            <div style="
                                width: 20px;
                                height: 20px;
                                border: 2px solid rgba(240, 165, 0, 0.3);
                                border-top: 2px solid #f0a500;
                                border-radius: 50%;
                                animation: spin 1s linear infinite;
                            "></div>
                            Redirecting to login...
                        </div>
                    </div>
                `;

                // Add animation styles
                const style = document.createElement('style');
                style.textContent = `
                    @keyframes sessionRotate {
                        0%, 100% { transform: rotate(0deg) scale(1); }
                        50% { transform: rotate(10deg) scale(1.05); }
                    }
                    @keyframes spin {
                        to { transform: rotate(360deg); }
                    }
                `;
                document.head.appendChild(style);

                document.body.appendChild(overlay);
                
                console.log('📱 Redirect message displayed');
            } catch (error) {
                console.error('❌ Redirect message error:', error);
            }
        }

        getSessionInfo() {
            try {
                const session = sessionStorage.getItem('vaultPhoenixSession');
                if (session) {
                    return JSON.parse(session);
                }
                return null;
            } catch (error) {
                console.error('❌ Get session info error:', error);
                return null;
            }
        }

        getCurrentUser() {
            const sessionInfo = this.getSessionInfo();
            return sessionInfo ? sessionInfo.email : null;
        }

        isSessionValid() {
            return this.checkSession();
        }

        extendSession() {
            try {
                const session = sessionStorage.getItem('vaultPhoenixSession');
                if (session) {
                    const sessionData = JSON.parse(session);
                    sessionData.loginTime = new Date().toISOString(); // Reset login time
                    sessionData.extended = (sessionData.extended || 0) + 1;
                    sessionStorage.setItem('vaultPhoenixSession', JSON.stringify(sessionData));
                    console.log('⏰ Session extended');
                    return true;
                }
                return false;
            } catch (error) {
                console.error('❌ Session extend error:', error);
                return false;
            }
        }

        logout() {
            try {
                console.log('🚪 Logging out...');
                this.clearSession();
                this.redirectToLogin('Successfully logged out');
            } catch (error) {
                console.error('❌ Logout error:', error);
                this.redirectToLogin('Logout completed');
            }
        }
    }

    // Initialize session protection immediately
    console.log('🚀 Starting session protection...');
    new VaultPhoenixSessionProtection();
    
} else {
    console.log('🚫 Vault Phoenix Session Protection blocked - not a crypto game page');
}
