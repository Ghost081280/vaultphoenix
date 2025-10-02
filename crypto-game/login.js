// Vault Phoenix AR Crypto Gaming - LOGIN SYSTEM
// PROTECTION: Only affects crypto-game/ folder - prevents main site interference
// FILE PATH: crypto-game/login.js

console.log('🔥💎 Vault Phoenix Login System Loading...');

// IMMEDIATE PROTECTION - CHECK IF THIS IS A CRYPTO GAME PAGE
(function() {
    const cryptoFlag = document.getElementById('cryptoGameFlag');
    const isCryptoPage = cryptoFlag || 
                        document.body.classList.contains('crypto-login-page') || 
                        window.location.pathname.includes('crypto-game') ||
                        document.title.includes('Vault Phoenix');
    
    if (!isCryptoPage) {
        console.log('🚫 Not a crypto game page - blocking login JavaScript execution');
        return;
    }
    
    window.isVaultPhoenixLogin = true;
    console.log('🔥💎 Login JavaScript ACTIVE - Page confirmed');
    
    // Force apply login page class if we detect login elements
    if (document.getElementById('loginForm') && !document.body.classList.contains('crypto-login-page')) {
        document.body.classList.add('crypto-login-page');
        console.log('🔧 Applied crypto-login-page class');
    }
})();

// ONLY RUN LOGIN SYSTEM IF THIS IS A CRYPTO GAME PAGE
if (window.isVaultPhoenixLogin) {

    class VaultPhoenixLogin {
        constructor() {
            console.log('🔥💎 Vault Phoenix Login initializing...');
            
            // Initialize properties
            this.isLoading = false;
            this.validCredentials = [
                { email: 'demo@vaultphoenix.com', password: 'phoenix123' },
                { email: 'admin@vaultphoenix.com', password: 'admin123' },
                { email: 'hunter@crypto.com', password: 'crypto123' },
                { email: 'player@ember.com', password: 'ember123' },
                { email: 'test@test.com', password: 'test123' },
                { email: 'user@vault.com', password: 'vault123' }
            ];

            // Initialize when DOM is ready
            if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', () => this.init());
            } else {
                this.init();
            }
            
            // Make globally accessible
            window.vaultPhoenixLogin = this;
        }

        init() {
            console.log('🔧 Initializing Vault Phoenix Login...');
            try {
                // Check if user is already logged in
                this.checkExistingSession();
                
                // Set up login form
                this.setupLoginListeners();
                
                // Set up mobile optimizations
                this.setupMobileOptimizations();
                
                // Set up haptic feedback
                this.addHapticFeedback();
                
                console.log('✅ Login system initialized');
            } catch (error) {
                console.error('❌ Login initialization error:', error);
            }
        }

        checkExistingSession() {
            try {
                const session = sessionStorage.getItem('vaultPhoenixSession');
                if (session) {
                    const sessionData = JSON.parse(session);
                    const sessionAge = Date.now() - new Date(sessionData.loginTime).getTime();
                    
                    // Session valid for 24 hours
                    if (sessionAge < 24 * 60 * 60 * 1000) {
                        console.log('✅ Valid session found, redirecting to dashboard...');
                        this.showSuccess('Welcome back! Redirecting to dashboard...');
                        setTimeout(() => {
                            window.location.href = 'dashboard.html';
                        }, 1000);
                        return;
                    } else {
                        console.log('⏰ Session expired, clearing...');
                        sessionStorage.removeItem('vaultPhoenixSession');
                    }
                }
            } catch (error) {
                console.error('❌ Session check error:', error);
                sessionStorage.removeItem('vaultPhoenixSession');
            }
        }

        setupLoginListeners() {
            console.log('🔧 Setting up login listeners...');
            try {
                const loginForm = document.getElementById('loginForm');
                const forgotPassword = document.getElementById('forgotPassword');
                
                if (loginForm) {
                    console.log('📝 Login form found, adding submit listener...');
                    loginForm.addEventListener('submit', (e) => {
                        e.preventDefault();
                        console.log('🚀 Form submit triggered');
                        this.handleLogin(e);
                    });
                } else {
                    console.error('❌ Login form not found!');
                }
                
                if (forgotPassword) {
                    forgotPassword.addEventListener('click', (e) => this.handleForgotPassword(e));
                }
                
                // Add enhanced mobile interactions
                const inputs = document.querySelectorAll('.form-input');
                inputs.forEach(input => {
                    input.addEventListener('focus', () => this.animateInput(input, true));
                    input.addEventListener('blur', () => this.animateInput(input, false));
                    input.addEventListener('input', () => this.validateInput(input));
                });

                console.log('✅ Login listeners setup complete');
            } catch (error) {
                console.error('❌ Login listeners setup error:', error);
            }
        }

        setupMobileOptimizations() {
            console.log('📱 Setting up mobile optimizations...');
            try {
                // Mobile viewport height fixes
                const setVH = () => {
                    let vh = window.innerHeight * 0.01;
                    document.documentElement.style.setProperty('--vh', `${vh}px`);
                    document.documentElement.style.setProperty('--real-vh', `${window.innerHeight}px`);
                };
                
                window.addEventListener('load', setVH);
                window.addEventListener('resize', setVH);
                window.addEventListener('orientationchange', () => {
                    setTimeout(setVH, 100);
                });
                
                // Prevent zoom
                let lastTouchEnd = 0;
                document.addEventListener('touchend', function (event) {
                    const now = (new Date()).getTime();
                    if (now - lastTouchEnd <= 300) {
                        event.preventDefault();
                    }
                    lastTouchEnd = now;
                }, false);
                
                // Prevent pinch-to-zoom
                document.addEventListener('gesturestart', function (e) {
                    e.preventDefault();
                });
                
                document.addEventListener('gesturechange', function (e) {
                    e.preventDefault();
                });
                
                document.addEventListener('gestureend', function (e) {
                    e.preventDefault();
                });
                
                console.log('✅ Mobile optimizations complete');
            } catch (error) {
                console.error('❌ Mobile optimization error:', error);
            }
        }

        animateInput(input, focused) {
            try {
                const container = input.closest('.form-group');
                if (container) {
                    if (focused) {
                        container.style.transform = 'scale(1.01)';
                        container.style.zIndex = '10';
                    } else {
                        container.style.transform = 'scale(1)';
                        container.style.zIndex = '1';
                    }
                }
            } catch (error) {
                console.error('❌ Input animation error:', error);
            }
        }

        validateInput(input) {
            try {
                const isValid = input.checkValidity();
                
                if (input.value) {
                    if (isValid) {
                        input.style.borderColor = '#4CAF50';
                        input.style.boxShadow = '0 0 0 3px rgba(76, 175, 80, 0.2)';
                    } else {
                        input.style.borderColor = '#f44336';
                        input.style.boxShadow = '0 0 0 3px rgba(244, 67, 54, 0.2)';
                    }
                } else {
                    input.style.borderColor = 'rgba(240, 165, 0, 0.4)';
                    input.style.boxShadow = 'none';
                }
            } catch (error) {
                console.error('❌ Input validation error:', error);
            }
        }

        async handleLogin(event) {
            if (this.isLoading) return;
            
            console.log('🚀 Login form submitted');
            
            try {
                const email = document.getElementById('email')?.value?.trim() || '';
                const password = document.getElementById('password')?.value || '';
                const loginBtn = document.getElementById('loginBtn');
                const loginText = document.getElementById('loginText');
                const container = document.querySelector('.login-container');

                console.log('📧 Email input:', email);
                console.log('🔑 Password length:', password.length);

                this.hideMessages();

                // Validation
                if (!email) {
                    console.error('❌ No email provided');
                    this.showError('Please enter your email address');
                    this.focusInput(document.getElementById('email'));
                    return;
                }

                if (!this.validateEmail(email)) {
                    console.error('❌ Invalid email format:', email);
                    this.showError('Please enter a valid email address');
                    this.focusInput(document.getElementById('email'));
                    return;
                }

                if (!password) {
                    console.error('❌ No password provided');
                    this.showError('Please enter your password');
                    this.focusInput(document.getElementById('password'));
                    return;
                }

                if (password.length < 6) {
                    console.error('❌ Password too short');
                    this.showError('Password must be at least 6 characters long');
                    this.focusInput(document.getElementById('password'));
                    return;
                }

                // Show loading state
                this.isLoading = true;
                if (container) container.classList.add('loading');
                if (loginText) {
                    loginText.innerHTML = `
                        <span class="loading-spinner"></span>
                        <span>Authenticating...</span>
                    `;
                }
                if (loginBtn) {
                    loginBtn.style.transform = 'scale(0.98)';
                    loginBtn.disabled = true;
                }

                console.log('🔐 Starting authentication...');
                await this.authenticateUser(email, password);
                
                console.log('✅ Login successful!');
                if (loginText) {
                    loginText.innerHTML = `
                        <span style="color: #4CAF50;">✅</span>
                        <span>Access Granted!</span>
                    `;
                }
                if (loginBtn) {
                    loginBtn.style.background = 'linear-gradient(135deg, #4CAF50, #45a049)';
                }
                
                this.showSuccess('Login successful! Launching AR $Ember Hunt...');
                
                this.storeSession(email);
                
                setTimeout(() => {
                    console.log('🚀 Redirecting to dashboard...');
                    window.location.href = 'dashboard.html';
                }, 1500);

            } catch (error) {
                console.error('❌ Login failed:', error.message);
                
                const loginBtn = document.getElementById('loginBtn');
                const loginText = document.getElementById('loginText');
                const container = document.querySelector('.login-container');
                
                // Reset UI
                this.isLoading = false;
                if (loginBtn) {
                    loginBtn.style.transform = 'scale(1)';
                    loginBtn.disabled = false;
                    loginBtn.style.background = 'linear-gradient(135deg, #f0a500 0%, #fb923c 50%, #d73327 100%)';
                }
                if (loginText) {
                    loginText.innerHTML = `
                        <span class="login-main-text">
                            <img src="../images/VPEmberFlame.svg" alt="Ember Flame" class="login-flame-icon" onerror="this.textContent='🔥'">
                            START $EMBER HUNT
                        </span>
                        <span class="login-sub-text">Begin Your Adventure</span>
                    `;
                }
                if (container) container.classList.remove('loading');
                
                this.showError(error.message);
                
                // Shake animation
                if (container) {
                    container.style.animation = 'shake 0.5s ease-in-out';
                    setTimeout(() => {
                        container.style.animation = '';
                    }, 500);
                }
                
                // Haptic feedback
                if (navigator.vibrate) {
                    navigator.vibrate([100, 50, 100]);
                }
            }
        }

        focusInput(input) {
            if (input) {
                input.focus();
                input.select();
            }
        }

        async authenticateUser(email, password) {
            console.log('🔐 Authenticating user:', email);
            
            // Simulate network delay for realistic experience
            await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 1000));

            console.log('🔍 Checking credentials against valid list...');
            
            const isValid = this.validCredentials.some(cred => {
                const emailMatch = cred.email.toLowerCase().trim() === email.toLowerCase().trim();
                const passwordMatch = cred.password === password;
                console.log(`📧 Email match (${cred.email}):`, emailMatch, '🔑 Password match:', passwordMatch);
                return emailMatch && passwordMatch;
            });

            console.log('✅ Validation result:', isValid);

            if (!isValid) {
                console.error('❌ Authentication failed for:', email);
                throw new Error('Invalid email or password. Try: demo@vaultphoenix.com / phoenix123');
            }

            console.log('🎉 Authentication successful!');
            return { success: true, email, timestamp: Date.now() };
        }

        validateEmail(email) {
            console.log('📧 Validating email:', email);
            if (!email || typeof email !== 'string') {
                console.error('❌ Email validation failed: empty or invalid type');
                return false;
            }
            
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            const isValid = emailRegex.test(email.trim());
            console.log('✅ Email validation result:', isValid);
            return isValid;
        }

        storeSession(email) {
            try {
                const sessionData = {
                    email: email,
                    loginTime: new Date().toISOString(),
                    sessionId: this.generateSessionId(),
                    userAgent: navigator.userAgent,
                    platform: navigator.platform,
                    walletAddress: '0x' + Math.random().toString(16).substr(2, 40),
                    expires: Date.now() + (24 * 60 * 60 * 1000) // 24 hours
                };
                
                sessionStorage.setItem('vaultPhoenixSession', JSON.stringify(sessionData));
                console.log('💾 Session stored successfully');
            } catch (error) {
                console.error('❌ Session storage error:', error);
            }
        }

        generateSessionId() {
            return Math.random().toString(36).substring(2) + Date.now().toString(36);
        }

        showError(message) {
            try {
                const errorDiv = document.getElementById('errorMessage');
                if (errorDiv) {
                    errorDiv.textContent = `⚠️ ${message}`;
                    errorDiv.style.display = 'flex';
                    
                    // Auto-hide after 5 seconds
                    setTimeout(() => {
                        if (errorDiv.style.display === 'flex') {
                            errorDiv.style.display = 'none';
                        }
                    }, 5000);
                }
            } catch (error) {
                console.error('❌ Show error message error:', error);
            }
        }

        showSuccess(message) {
            try {
                const successDiv = document.getElementById('successMessage');
                if (successDiv) {
                    successDiv.textContent = `✅ ${message}`;
                    successDiv.style.display = 'flex';
                }
            } catch (error) {
                console.error('❌ Show success message error:', error);
            }
        }

        hideMessages() {
            try {
                const errorDiv = document.getElementById('errorMessage');
                const successDiv = document.getElementById('successMessage');
                if (errorDiv) errorDiv.style.display = 'none';
                if (successDiv) successDiv.style.display = 'none';
            } catch (error) {
                console.error('❌ Hide messages error:', error);
            }
        }

        handleForgotPassword(event) {
            event.preventDefault();
            
            // Create custom modal for better UX
            const modal = document.createElement('div');
            modal.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100vw;
                height: 100vh;
                background: rgba(0, 0, 0, 0.9);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 1000;
                backdrop-filter: blur(20px);
                padding: 20px;
            `;
            
            const content = document.createElement('div');
            content.style.cssText = `
                background: linear-gradient(135deg, rgba(12, 12, 12, 0.98), rgba(20, 20, 20, 0.98));
                backdrop-filter: blur(30px);
                border: 2px solid rgba(240, 165, 0, 0.5);
                border-radius: 20px;
                padding: 24px;
                max-width: 400px;
                width: 100%;
                text-align: center;
                box-shadow: 0 20px 60px rgba(240, 165, 0, 0.3);
                color: white;
            `;
            
            content.innerHTML = `
                <div style="color: #f0a500; font-size: 18px; font-weight: 800; margin-bottom: 16px;">
                    🔑 Demo Login Help
                </div>
                <div style="color: rgba(255, 255, 255, 0.9); font-size: 14px; line-height: 1.5; margin-bottom: 20px;">
                    This is a demo application. Use these credentials to access the AR $Ember Hunt:
                </div>
                <div style="background: rgba(240, 165, 0, 0.1); border: 1px solid rgba(240, 165, 0, 0.3); border-radius: 12px; padding: 16px; margin-bottom: 20px;">
                    <div style="color: #f0a500; font-weight: 700; margin-bottom: 8px;">Demo Credentials:</div>
                    <div style="color: white; font-weight: 600; font-family: monospace;">
                        <strong>Email:</strong> demo@vaultphoenix.com<br>
                        <strong>Password:</strong> phoenix123
                    </div>
                </div>
                <button id="helpCloseBtn" style="
                    width: 100%;
                    background: linear-gradient(135deg, rgba(240, 165, 0, 0.3), rgba(251, 146, 60, 0.2));
                    color: white;
                    border: 2px solid rgba(240, 165, 0, 0.5);
                    padding: 12px 16px;
                    border-radius: 12px;
                    font-size: 14px;
                    font-weight: 700;
                    cursor: pointer;
                    transition: all 0.3s ease;
                ">Got It!</button>
            `;
            
            modal.appendChild(content);
            document.body.appendChild(modal);
            
            // Close button functionality
            document.getElementById('helpCloseBtn').addEventListener('click', () => {
                document.body.removeChild(modal);
            });
            
            // Close on background click
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    document.body.removeChild(modal);
                }
            });
        }

        addHapticFeedback() {
            console.log('📳 Adding haptic feedback...');
            try {
                // Add haptic feedback to interactive elements
                const interactiveElements = document.querySelectorAll('button, .form-input, a[href]');
                
                interactiveElements.forEach(element => {
                    element.addEventListener('touchstart', () => {
                        if (navigator.vibrate) {
                            navigator.vibrate(10);
                        }
                    });
                });
                
                console.log('✅ Haptic feedback added');
            } catch (error) {
                console.error('❌ Haptic feedback error:', error);
            }
        }
    }

    // Initialize the login system when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            console.log('📄 DOM loaded, initializing Vault Phoenix Login...');
            new VaultPhoenixLogin();
        });
    } else {
        console.log('📄 DOM already loaded, initializing Vault Phoenix Login...');
        new VaultPhoenixLogin();
    }
    
} else {
    console.log('🚫 Vault Phoenix Login blocked - not a crypto game page');
}
