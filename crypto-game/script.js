// Vault Phoenix AR Crypto Gaming - FIXED LOGIN SYSTEM
// PROTECTION: Only runs on crypto game pages

// IMMEDIATE PROTECTION - CHECK IF THIS IS A CRYPTO GAME PAGE
(function() {
    const cryptoFlag = document.getElementById('cryptoGameFlag');
    const isCryptoPage = cryptoFlag || 
                        document.body.classList.contains('crypto-login-page') || 
                        document.body.classList.contains('crypto-dashboard-page') ||
                        window.location.pathname.includes('crypto-game');
    
    if (!isCryptoPage) {
        console.log('🚫 Not a crypto game page - blocking JavaScript execution');
        return;
    }
    
    window.isVaultPhoenixCryptoGame = true;
    console.log('🔥💎 Crypto Game JavaScript ACTIVE');
})();

// ONLY RUN IF THIS IS A CRYPTO GAME PAGE
if (window.isVaultPhoenixCryptoGame) {

    class VaultPhoenixCryptoGame {
        constructor() {
            console.log('🔥💎 Vault Phoenix initializing...');
            
            this.isStarted = false;
            this.currentMode = 'map';
            this.collectedTokens = [];
            this.totalTokenValue = 0;
            this.currentUser = null;
            
            // Initialize when DOM is ready
            if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', () => this.init());
            } else {
                this.init();
            }
            
            // Make globally accessible
            window.vaultPhoenixApp = this;
        }

        init() {
            console.log('🔧 Initializing...');
            try {
                if (document.getElementById('loginForm')) {
                    this.setupLoginPage();
                } else if (document.getElementById('container')) {
                    this.setupDashboard();
                }
            } catch (error) {
                console.error('❌ Init error:', error);
            }
        }

        setupLoginPage() {
            console.log('🔑 Setting up login page...');
            
            // Setup form validation
            this.setupFormValidation();
            
            // Setup login form handler
            const loginForm = document.getElementById('loginForm');
            if (loginForm) {
                loginForm.addEventListener('submit', (e) => this.handleLogin(e));
            }

            // Setup forgot password
            const forgotPassword = document.getElementById('forgotPassword');
            if (forgotPassword) {
                forgotPassword.addEventListener('click', (e) => this.handleForgotPassword(e));
            }

            // Add input animations
            this.setupInputAnimations();
            
            // Add loading effects
            this.setupLoadingEffects();
            
            console.log('✅ Login page ready');
        }

        setupFormValidation() {
            const inputs = document.querySelectorAll('.form-input');
            inputs.forEach(input => {
                input.addEventListener('input', () => this.validateInput(input));
                input.addEventListener('focus', () => this.onInputFocus(input));
                input.addEventListener('blur', () => this.onInputBlur(input));
            });
        }

        validateInput(input) {
            const isValid = input.checkValidity();
            const formGroup = input.closest('.form-group');
            
            if (input.value) {
                if (isValid) {
                    this.showInputSuccess(formGroup);
                } else {
                    this.showInputError(formGroup);
                }
            } else {
                this.resetInputState(formGroup);
            }
        }

        showInputSuccess(formGroup) {
            formGroup.style.borderColor = '#4CAF50';
            formGroup.style.boxShadow = '0 0 0 3px rgba(76, 175, 80, 0.2)';
        }

        showInputError(formGroup) {
            formGroup.style.borderColor = '#f44336';
            formGroup.style.boxShadow = '0 0 0 3px rgba(244, 67, 54, 0.2)';
        }

        resetInputState(formGroup) {
            formGroup.style.borderColor = '';
            formGroup.style.boxShadow = '';
        }

        onInputFocus(input) {
            const formGroup = input.closest('.form-group');
            if (formGroup) {
                formGroup.style.transform = 'scale(1.02)';
                formGroup.style.zIndex = '10';
            }
        }

        onInputBlur(input) {
            const formGroup = input.closest('.form-group');
            if (formGroup) {
                formGroup.style.transform = 'scale(1)';
                formGroup.style.zIndex = '1';
            }
        }

        setupInputAnimations() {
            const inputs = document.querySelectorAll('.form-input');
            inputs.forEach(input => {
                input.addEventListener('focus', () => {
                    input.style.transform = 'translateY(-2px)';
                });
                
                input.addEventListener('blur', () => {
                    input.style.transform = 'translateY(0)';
                });
            });
        }

        setupLoadingEffects() {
            // Create floating animations
            this.initFloatingCoins();
            this.initGlowEffect();
        }

        initFloatingCoins() {
            const coins = document.querySelectorAll('.floating-coin');
            coins.forEach((coin, index) => {
                coin.style.animationDelay = `${Math.random() * 5}s`;
                coin.style.animationDuration = `${12 + Math.random() * 8}s`;
                
                coin.addEventListener('click', () => {
                    coin.style.transform = 'scale(1.5) rotate(180deg)';
                    setTimeout(() => {
                        coin.style.transform = '';
                    }, 500);
                });
            });
        }

        initGlowEffect() {
            const glowBg = document.querySelector('.phoenix-glow-bg');
            if (glowBg) {
                document.addEventListener('mousemove', (e) => {
                    const x = (e.clientX / window.innerWidth) * 100;
                    const y = (e.clientY / window.innerHeight) * 100;
                    
                    glowBg.style.background = `radial-gradient(circle at ${x}% ${y}%, rgba(240, 165, 0, 0.15) 0%, rgba(215, 51, 39, 0.08) 40%, transparent 70%)`;
                });
            }
        }

        async handleLogin(event) {
            event.preventDefault();
            
            const email = document.getElementById('email').value.trim();
            const password = document.getElementById('password').value;
            const loginBtn = document.getElementById('loginBtn');
            const loginText = document.getElementById('loginText');

            console.log('🔑 Login attempt for:', email);

            this.hideMessages();

            // Validation
            if (!this.validateEmail(email)) {
                this.showError('Please enter a valid email address');
                return;
            }

            if (password.length < 6) {
                this.showError('Password must be at least 6 characters long');
                return;
            }

            // Show loading state
            this.setLoginLoading(true, loginBtn, loginText);

            try {
                await this.authenticateUser(email, password);
                
                this.setLoginSuccess(loginBtn, loginText);
                this.showSuccess('Login successful! Launching AR $Ember Hunt...');
                
                // Store session
                this.storeSession(email);
                
                // Redirect after delay
                setTimeout(() => {
                    window.location.href = 'dashboard.html';
                }, 1500);

            } catch (error) {
                this.setLoginError(loginBtn, loginText);
                this.showError(error.message);
                this.shakeContainer();
            }
        }

        setLoginLoading(loading, btn, text) {
            if (loading) {
                if (text) {
                    text.innerHTML = `
                        <div class="loading-spinner"></div>
                        <span>Authenticating...</span>
                    `;
                }
                if (btn) {
                    btn.style.opacity = '0.8';
                    btn.style.transform = 'scale(0.98)';
                }
            }
        }

        setLoginSuccess(btn, text) {
            if (text) {
                text.innerHTML = `
                    <span style="color: #4CAF50; font-size: 20px;">✅</span>
                    <span>Access Granted!</span>
                `;
            }
            if (btn) {
                btn.style.background = 'linear-gradient(135deg, #4CAF50, #45a049)';
                btn.style.transform = 'scale(1)';
            }
        }

        setLoginError(btn, text) {
            if (text) {
                text.innerHTML = `
                    <span>🔥 Start $Ember Hunt</span>
                `;
            }
            if (btn) {
                btn.style.opacity = '1';
                btn.style.transform = 'scale(1)';
                btn.style.background = '';
            }
        }

        shakeContainer() {
            const container = document.querySelector('.login-container');
            if (container) {
                container.style.animation = 'shake 0.5s ease-in-out';
                setTimeout(() => {
                    container.style.animation = '';
                }, 500);
            }
        }

        async authenticateUser(email, password) {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1500));

            const validCredentials = [
                { email: 'demo@vaultphoenix.com', password: 'phoenix123' },
                { email: 'admin@vaultphoenix.com', password: 'admin123' },
                { email: 'hunter@crypto.com', password: 'crypto123' }
            ];

            const isValid = validCredentials.some(cred => 
                cred.email.toLowerCase() === email.toLowerCase() && cred.password === password
            );

            if (!isValid) {
                throw new Error('Invalid credentials. Try: demo@vaultphoenix.com / phoenix123');
            }

            return { success: true, email };
        }

        validateEmail(email) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(email);
        }

        storeSession(email) {
            const sessionData = {
                email: email,
                loginTime: new Date().toISOString(),
                sessionId: Math.random().toString(36).substring(2) + Date.now().toString(36)
            };
            
            try {
                sessionStorage.setItem('vaultPhoenixSession', JSON.stringify(sessionData));
                console.log('✅ Session stored for:', email);
            } catch (error) {
                console.error('❌ Session storage error:', error);
            }
        }

        showError(message) {
            const errorDiv = document.getElementById('errorMessage');
            if (errorDiv) {
                errorDiv.textContent = `⚠️ ${message}`;
                errorDiv.style.display = 'block';
                
                setTimeout(() => {
                    errorDiv.style.display = 'none';
                }, 5000);
            }
        }

        showSuccess(message) {
            const successDiv = document.getElementById('successMessage');
            if (successDiv) {
                successDiv.textContent = `✅ ${message}`;
                successDiv.style.display = 'block';
            }
        }

        hideMessages() {
            const errorDiv = document.getElementById('errorMessage');
            const successDiv = document.getElementById('successMessage');
            if (errorDiv) errorDiv.style.display = 'none';
            if (successDiv) successDiv.style.display = 'none';
        }

        handleForgotPassword(event) {
            event.preventDefault();
            
            const modal = document.createElement('div');
            modal.className = 'forgot-password-modal';
            modal.innerHTML = `
                <div class="modal-content">
                    <h3>🔥 Password Reset</h3>
                    <p>Password reset would be implemented here.</p>
                    <div class="demo-info">
                        <strong>Demo credentials:</strong><br>
                        demo@vaultphoenix.com<br>
                        phoenix123
                    </div>
                    <button onclick="this.closest('.forgot-password-modal').remove()">Close</button>
                </div>
            `;
            
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    modal.remove();
                }
            });
            
            document.body.appendChild(modal);
        }

        setupDashboard() {
            console.log('📊 Setting up dashboard...');
            
            // Ensure session exists
            this.ensureSession();
            
            // Load user data
            this.loadUserData();
            
            // Setup navigation
            this.setupNavigation();
            
            console.log('✅ Dashboard ready');
        }

        ensureSession() {
            const session = sessionStorage.getItem('vaultPhoenixSession');
            if (!session) {
                const defaultSession = {
                    email: 'demo@vaultphoenix.com',
                    loginTime: new Date().toISOString(),
                    sessionId: 'demo-session-' + Date.now()
                };
                sessionStorage.setItem('vaultPhoenixSession', JSON.stringify(defaultSession));
            }
        }

        loadUserData() {
            try {
                const session = JSON.parse(sessionStorage.getItem('vaultPhoenixSession') || '{}');
                this.currentUser = {
                    email: session.email || 'demo@vaultphoenix.com'
                };
                
                // Update UI with user info
                const userEmailElement = document.getElementById('menuUserEmail');
                if (userEmailElement) {
                    userEmailElement.textContent = this.currentUser.email;
                }
                
            } catch (error) {
                console.error('❌ User data loading error:', error);
            }
        }

        setupNavigation() {
            // Menu toggle
            const menuToggle = document.getElementById('menuToggle');
            if (menuToggle) {
                menuToggle.addEventListener('click', () => this.toggleMenu());
            }

            // Menu overlay
            const menuOverlay = document.getElementById('menuOverlay');
            if (menuOverlay) {
                menuOverlay.addEventListener('click', () => this.toggleMenu());
            }

            // Navigation tabs
            document.querySelectorAll('.nav-tab').forEach(tab => {
                tab.addEventListener('click', () => {
                    const mode = tab.dataset.mode;
                    if (mode) {
                        this.switchMode(mode);
                    }
                });
            });

            // Menu items
            document.querySelectorAll('.menu-item').forEach(item => {
                item.addEventListener('click', () => {
                    const mode = item.dataset.mode;
                    if (mode) {
                        this.switchMode(mode);
                        this.toggleMenu(); // Close menu after selection
                    }
                });
            });
        }

        toggleMenu() {
            const sideMenu = document.getElementById('sideMenu');
            const menuOverlay = document.getElementById('menuOverlay');
            
            if (sideMenu && menuOverlay) {
                const isOpen = sideMenu.classList.contains('open');
                
                if (isOpen) {
                    sideMenu.classList.remove('open');
                    menuOverlay.classList.remove('open');
                } else {
                    sideMenu.classList.add('open');
                    menuOverlay.classList.add('open');
                }
            }
        }

        switchMode(mode) {
            console.log('🔄 Switching to mode:', mode);
            this.currentMode = mode;
            
            // Update navigation state
            document.querySelectorAll('.nav-tab').forEach(tab => {
                tab.classList.toggle('active', tab.dataset.mode === mode);
            });
            
            document.querySelectorAll('.menu-item').forEach(item => {
                item.classList.toggle('active', item.dataset.mode === mode);
            });
            
            // Show/hide views
            this.updateViewVisibility();
        }

        updateViewVisibility() {
            const views = {
                'map': document.getElementById('map'),
                'ar': document.getElementById('video'),
                'vault': document.getElementById('vaultView'),
                'campaigns': document.getElementById('campaignsView')
            };
            
            Object.keys(views).forEach(viewKey => {
                const view = views[viewKey];
                if (view) {
                    view.style.display = viewKey === this.currentMode ? 'block' : 'none';
                }
            });
        }
    }

    // Initialize when DOM is ready
    document.addEventListener('DOMContentLoaded', () => {
        console.log('🔥💎 Starting Vault Phoenix...');
        
        try {
            new VaultPhoenixCryptoGame();
        } catch (error) {
            console.error('💥 Failed to initialize:', error);
            
            // Show error screen
            document.body.innerHTML = `
                <div style="
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    height: 100vh;
                    background: linear-gradient(135deg, #0f0f0f, #2d1810);
                    color: white;
                    text-align: center;
                    padding: 20px;
                    font-family: system-ui, sans-serif;
                ">
                    <div style="
                        background: rgba(15, 15, 15, 0.9);
                        border-radius: 20px;
                        padding: 40px;
                        border: 2px solid rgba(240, 165, 0, 0.4);
                        max-width: 400px;
                    ">
                        <h2 style="color: #f0a500; margin-bottom: 16px;">🔥 Vault Phoenix</h2>
                        <p style="margin-bottom: 20px;">Initialization failed</p>
                        <button onclick="window.location.reload()" style="
                            background: linear-gradient(135deg, #f0a500, #fb923c);
                            color: white;
                            border: none;
                            padding: 12px 24px;
                            border-radius: 10px;
                            cursor: pointer;
                            font-weight: bold;
                        ">Try Again</button>
                    </div>
                </div>
            `;
        }
    });

    // Auto-redirect if session exists
    if (window.location.pathname.includes('index') || window.location.pathname === '/') {
        const session = sessionStorage.getItem('vaultPhoenixSession');
        if (session) {
            try {
                const sessionData = JSON.parse(session);
                const loginTime = new Date(sessionData.loginTime);
                const now = new Date();
                const hoursDiff = (now - loginTime) / (1000 * 60 * 60);
                
                if (hoursDiff < 24) {
                    console.log('🔄 Auto-redirecting to dashboard...');
                    window.location.href = 'dashboard.html';
                }
            } catch (error) {
                sessionStorage.removeItem('vaultPhoenixSession');
            }
        }
    }

    console.log('%c🔥💎 VAULT PHOENIX - AR CRYPTO GAMING', 'color: #f0a500; font-size: 20px; font-weight: bold;');
    console.log('%c🚀 Demo: demo@vaultphoenix.com / phoenix123', 'color: #fb923c; font-size: 14px;');

} else {
    console.log('🚫 Crypto Game JS blocked - not on crypto game page');
}
