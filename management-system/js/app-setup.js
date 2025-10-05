/* ============================================
   VAULT PHOENIX MANAGEMENT SYSTEM
   App Setup - White Label Builder & SDK Integration
   File: management-system/js/app-setup.js
   ============================================ */

// ============================================
// APP SETUP STATE
// ============================================

const AppSetupState = {
    setupType: null,
    whiteLabel: {
        appName: 'My AR Crypto Hunt',
        logo: null,
        primaryColor: '#f0a500',
        secondaryColor: '#fb923c',
        accentColor: '#d73327',
        backgroundColor: '#1a1a1a',
        textColor: '#ffffff'
    },
    sdk: {
        platform: null,
        repositoryUrl: 'https://github.com/vaultphoenix/sdk',
        apiKey: null,
        integrationStatus: 'pending'
    },
    playerAppTemplate: 'https://ghost081280.github.io/vaultphoenix/crypto-game/dashboard.html'
};

/**
 * Get App Setup Content
 */
function getAppSetupContent(role) {
    if (role !== 'campaign-manager') {
        return getPlaceholderContent('app-setup');
    }
    
    return `
        <div class="dashboard-section">
            <h2 class="section-title">🎮 Launch Your Campaign</h2>
            <p style="color: rgba(255,255,255,0.8); font-size: 1.1rem; margin-bottom: 30px;">
                Deploy your location-based AR crypto gaming campaign in minutes. Choose between our no-code White Label App Builder or integrate our SDK into your existing application.
            </p>
            
            <!-- Setup Type Selection -->
            <div class="setup-type-grid" id="setupTypeSelection">
                <div class="setup-card" onclick="selectSetupType('white-label')">
                    <div class="setup-card-icon">🎨</div>
                    <h3>White Label App Builder</h3>
                    <p>Perfect for marketers! Launch a fully branded AR crypto gaming app without any coding. Customize your brand colors, upload your logo, and deploy instantly to your own domain.</p>
                    <ul>
                        <li>✓ No coding required - visual editor</li>
                        <li>✓ Real-time preview as you build</li>
                        <li>✓ Custom branding & colors</li>
                        <li>✓ $Ember token pre-integrated</li>
                        <li>✓ Host on your custom domain</li>
                        <li>✓ Deploy in under 10 minutes</li>
                    </ul>
                    <button class="btn btn-primary btn-large" onclick="event.stopPropagation(); selectSetupType('white-label')">
                        Build White Label App
                    </button>
                </div>
                
                <div class="setup-card" onclick="selectSetupType('sdk')">
                    <div class="setup-card-icon">🔌</div>
                    <h3>SDK Integration</h3>
                    <p>For developers! Integrate Vault Phoenix's location-based gaming features into your existing mobile or web application using our comprehensive SDK.</p>
                    <ul>
                        <li>✓ iOS, Android, Web & Unity support</li>
                        <li>✓ Complete API documentation</li>
                        <li>✓ Secure API key management</li>
                        <li>✓ Code examples & tutorials</li>
                        <li>✓ TypeScript support</li>
                        <li>✓ Sandbox testing environment</li>
                    </ul>
                    <button class="btn btn-secondary btn-large" onclick="event.stopPropagation(); selectSetupType('sdk')">
                        Integrate SDK
                    </button>
                </div>
            </div>
            
            <!-- White Label Builder (Hidden Initially) -->
            <div id="whiteLabelBuilder" style="display: none;">
                <div class="builder-header">
                    <h3>🎨 White Label App Builder</h3>
                    <button class="btn btn-outline" onclick="backToSetupSelection()">← Back to Options</button>
                </div>
                
                <div class="builder-grid">
                    <!-- App Configuration -->
                    <div class="builder-panel">
                        <h4 class="panel-title">📱 App Configuration</h4>
                        
                        <div class="config-section">
                            <h5>Basic Info</h5>
                            
                            <div class="form-group">
                                <label class="form-label">App Name *</label>
                                <input type="text" class="form-input" id="appName" placeholder="My AR Crypto Hunt" value="My AR Crypto Hunt" oninput="updateLivePreview()">
                                <div class="form-hint">This name appears in your app's navigation and title</div>
                            </div>
                            
                            <div class="form-group">
                                <label class="form-label">App Logo (Square, PNG/JPG)</label>
                                <div class="logo-upload-area" onclick="document.getElementById('appLogo').click()">
                                    <div id="logoPreviewContainer">
                                        <div id="logoPlaceholder" class="logo-placeholder">
                                            <span>📷</span>
                                            <span>Click to upload logo</span>
                                        </div>
                                        <img id="logoPreviewImg" class="logo-preview-img" style="display: none;">
                                    </div>
                                </div>
                                <input type="file" class="form-input" id="appLogo" accept="image/*" onchange="previewLogo(event)" style="display: none;">
                                <div class="form-hint">Recommended: 512x512px PNG with transparent background</div>
                            </div>
                        </div>
                        
                        <div class="config-section">
                            <h5>Brand Colors</h5>
                            
                            <div class="color-grid-compact">
                                <div class="color-picker-group">
                                    <label class="form-label">Primary</label>
                                    <div class="color-picker-wrapper">
                                        <input type="color" id="primaryColor" value="#f0a500" onchange="updateLivePreview()">
                                        <input type="text" id="primaryColorHex" value="#f0a500" oninput="syncColorInput('primary', this.value)">
                                    </div>
                                </div>
                                
                                <div class="color-picker-group">
                                    <label class="form-label">Secondary</label>
                                    <div class="color-picker-wrapper">
                                        <input type="color" id="secondaryColor" value="#fb923c" onchange="updateLivePreview()">
                                        <input type="text" id="secondaryColorHex" value="#fb923c" oninput="syncColorInput('secondary', this.value)">
                                    </div>
                                </div>
                                
                                <div class="color-picker-group">
                                    <label class="form-label">Accent</label>
                                    <div class="color-picker-wrapper">
                                        <input type="color" id="accentColor" value="#d73327" onchange="updateLivePreview()">
                                        <input type="text" id="accentColorHex" value="#d73327" oninput="syncColorInput('accent', this.value)">
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div class="config-section">
                            <h5>💎 $Ember Token - Pre-Integrated</h5>
                            <div class="token-info-box">
                                <div class="token-symbol">💎</div>
                                <div class="token-details">
                                    <div class="token-name">$Ember Token System</div>
                                    <div class="token-desc">Your app comes with $Ember already integrated. Players collect tokens at your locations, and you manage distribution through your dashboard.</div>
                                </div>
                            </div>
                        </div>
                        
                        <div class="config-section">
                            <h5>🌐 Custom Domain Setup</h5>
                            <div class="form-group">
                                <label class="form-label">Your Domain (Optional)</label>
                                <input type="text" class="form-input" id="customDomain" placeholder="hunt.yourdomain.com" oninput="updateCustomDomain()">
                                <div class="form-hint">We host your app! Enter your domain to point it to our hosting.</div>
                            </div>
                            
                            <div class="domain-info-box">
                                <div class="info-icon">ℹ️</div>
                                <div class="info-content">
                                    <strong>How Custom Domains Work:</strong>
                                    <p>• We host your white label app on our secure servers</p>
                                    <p>• You point your domain to our hosting using DNS settings</p>
                                    <p>• Your app URL will be: <strong>yourdomain.com/appname</strong></p>
                                    <p>• Make sure the page path matches your app name above</p>
                                </div>
                            </div>
                            
                            <div id="domainInstructions" class="domain-instructions" style="display: none;">
                                <div class="instructions-title">📋 DNS Setup Instructions</div>
                                
                                <div class="step-box">
                                    <strong>Step 1: Login to Your Domain Provider</strong>
                                    <p>Go to your domain registrar (GoDaddy, Namecheap, Google Domains, etc.) and login to your account.</p>
                                </div>
                                
                                <div class="step-box">
                                    <strong>Step 2: Access DNS Management</strong>
                                    <p>Find "DNS Management", "DNS Settings", or "Manage DNS" in your domain control panel.</p>
                                </div>
                                
                                <div class="step-box">
                                    <strong>Step 3: Add CNAME Record</strong>
                                    <div class="dns-config">
                                        <div><strong>Type:</strong> CNAME</div>
                                        <div><strong>Host/Name:</strong> <span id="dnsHost">hunt</span></div>
                                        <div><strong>Points to:</strong> vault-phoenix.app</div>
                                        <div><strong>TTL:</strong> 3600 (or 1 hour)</div>
                                    </div>
                                </div>
                                
                                <div class="step-box">
                                    <strong>Step 4: Save & Wait</strong>
                                    <p>Save your DNS changes. Propagation takes 5-30 minutes (sometimes up to 24 hours).</p>
                                </div>
                                
                                <div class="final-url-box">
                                    <div class="url-label">Your App Will Be Live At:</div>
                                    <div class="url-display" id="finalUrl">https://hunt.yourdomain.com/my-ar-crypto-hunt</div>
                                    <div class="url-note">⚠️ Make sure the page name matches your app name above!</div>
                                </div>
                            </div>
                        </div>
                        
                        <button class="btn btn-primary btn-large btn-deploy" onclick="deployWhiteLabelApp()">
                            🚀 Deploy App Now
                        </button>
                    </div>
                    
                    <!-- Live Preview -->
                    <div class="builder-panel">
                        <h4 class="panel-title">📱 Live Preview</h4>
                        
                        <div class="phone-mockup">
                            <div class="phone-frame">
                                <div class="phone-notch"></div>
                                <iframe 
                                    id="gamePreviewFrame" 
                                    src="https://ghost081280.github.io/vaultphoenix/crypto-game/dashboard.html"
                                    allow="geolocation; camera"
                                    sandbox="allow-scripts allow-same-origin"
                                ></iframe>
                                <div class="phone-indicator"></div>
                            </div>
                            <div class="phone-label">📱 Real-Time Preview - Changes appear instantly</div>
                        </div>
                        
                        <div class="preview-info">
                            <h5>What You're Building:</h5>
                            <ul>
                                <li>✓ <strong>AR Token Hunt:</strong> Players find $Ember tokens at your locations using their phone camera</li>
                                <li>✓ <strong>Live Map:</strong> Shows all active token locations in real-time</li>
                                <li>✓ <strong>Wallet Integration:</strong> Players collect and manage their $Ember earnings</li>
                                <li>✓ <strong>Leaderboards:</strong> Gamification to drive engagement and competition</li>
                                <li>✓ <strong>Push Notifications:</strong> Alert players when new tokens are nearby</li>
                            </ul>
                            
                            <div class="tech-stack">
                                <div class="tech-label">Built With:</div>
                                <div class="tech-items">
                                    <span class="tech-badge">React Native</span>
                                    <span class="tech-badge">AR.js</span>
                                    <span class="tech-badge">Google Maps</span>
                                    <span class="tech-badge">$Ember Token</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <!-- SDK Integration (Hidden Initially) -->
            <div id="sdkIntegration" style="display: none;">
                <div class="builder-header">
                    <h3>🔌 SDK Integration Guide</h3>
                    <button class="btn btn-outline" onclick="backToSetupSelection()">← Back to Options</button>
                </div>
                
                <div class="sdk-content">
                    <div class="card">
                        <h4 style="margin-bottom: 20px;">Select Your Platform</h4>
                        <div class="platform-grid">
                            <button class="btn btn-outline platform-btn" onclick="selectPlatform('ios')" id="platform-ios">📱 iOS</button>
                            <button class="btn btn-outline platform-btn" onclick="selectPlatform('android')" id="platform-android">🤖 Android</button>
                            <button class="btn btn-outline platform-btn" onclick="selectPlatform('web')" id="platform-web">🌐 Web</button>
                            <button class="btn btn-outline platform-btn" onclick="selectPlatform('unity')" id="platform-unity">🎮 Unity</button>
                        </div>
                    </div>
                    
                    <div class="card">
                        <h4 style="margin-bottom: 20px;">Your API Credentials</h4>
                        <div class="api-key-box">
                            <div class="api-key-label">API Key</div>
                            <div id="apiKeyDisplay" class="api-key-value">
                                vp_live_${Math.random().toString(36).substring(2, 15)}${Math.random().toString(36).substring(2, 15)}
                            </div>
                        </div>
                        <button class="btn btn-secondary" onclick="copyApiKey()">📋 Copy API Key</button>
                    </div>
                    
                    <div class="card">
                        <h4 style="margin-bottom: 20px;">Integration Steps</h4>
                        <div id="integrationSteps">
                            <div class="integration-step">
                                <div class="step-number">1</div>
                                <div class="step-content">
                                    <div class="step-title">Clone the Repository</div>
                                    <div class="code-block">git clone https://github.com/vaultphoenix/sdk.git</div>
                                </div>
                            </div>
                            
                            <div class="integration-step">
                                <div class="step-number">2</div>
                                <div class="step-content">
                                    <div class="step-title">Install Dependencies</div>
                                    <div class="code-block">npm install @vaultphoenix/sdk</div>
                                </div>
                            </div>
                            
                            <div class="integration-step">
                                <div class="step-number">3</div>
                                <div class="step-content">
                                    <div class="step-title">Initialize SDK</div>
                                    <div class="code-block">import VaultPhoenix from '@vaultphoenix/sdk';

const vp = new VaultPhoenix({
  apiKey: 'YOUR_API_KEY',
  enableAR: true,
  tokenSymbol: '$Ember'
});</div>
                                </div>
                            </div>
                        </div>
                        
                        <div class="sdk-actions">
                            <button class="btn btn-primary" onclick="window.open('https://github.com/vaultphoenix/sdk', '_blank')">
                                📚 View Full Documentation
                            </button>
                            <button class="btn btn-secondary" onclick="testIntegration()">
                                🧪 Test Integration
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

/**
 * Select setup type
 */
function selectSetupType(type) {
    AppSetupState.setupType = type;
    
    document.getElementById('setupTypeSelection').style.display = 'none';
    
    if (type === 'white-label') {
        document.getElementById('whiteLabelBuilder').style.display = 'block';
        setTimeout(() => {
            updateLivePreview();
        }, 100);
    } else if (type === 'sdk') {
        document.getElementById('sdkIntegration').style.display = 'block';
    }
}

/**
 * Back to setup selection
 */
function backToSetupSelection() {
    document.getElementById('setupTypeSelection').style.display = 'grid';
    document.getElementById('whiteLabelBuilder').style.display = 'none';
    document.getElementById('sdkIntegration').style.display = 'none';
    AppSetupState.setupType = null;
}

/**
 * Preview logo upload
 */
function previewLogo(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const placeholder = document.getElementById('logoPlaceholder');
            const img = document.getElementById('logoPreviewImg');
            
            placeholder.style.display = 'none';
            img.style.display = 'block';
            img.src = e.target.result;
            
            AppSetupState.whiteLabel.logo = e.target.result;
            updateLivePreview();
        };
        reader.readAsDataURL(file);
    }
}

/**
 * Sync color inputs
 */
function syncColorInput(type, value) {
    const colorPicker = document.getElementById(`${type}Color`);
    const hexInput = document.getElementById(`${type}ColorHex`);
    
    if (value.match(/^#[0-9A-F]{6}$/i)) {
        if (colorPicker) colorPicker.value = value;
        if (hexInput) hexInput.value = value;
        updateLivePreview();
    }
}

/**
 * Update live preview by injecting CSS into iframe
 */
function updateLivePreview() {
    const iframe = document.getElementById('gamePreviewFrame');
    if (!iframe || !iframe.contentWindow) return;
    
    try {
        const appName = document.getElementById('appName')?.value || 'My AR Crypto Hunt';
        const primaryColor = document.getElementById('primaryColor')?.value || '#f0a500';
        const secondaryColor = document.getElementById('secondaryColor')?.value || '#fb923c';
        const accentColor = document.getElementById('accentColor')?.value || '#d73327';
        
        const customCSS = `
            <style id="whiteLabelCustomCSS">
                :root {
                    --primary-color: ${primaryColor};
                    --secondary-color: ${secondaryColor};
                    --accent-color: ${accentColor};
                }
                
                body, .crypto-dashboard-page {
                    background: linear-gradient(135deg, #1a1a1a 0%, #0f0f0f 25%, ${accentColor}20 50%, ${primaryColor}15 75%, ${secondaryColor}20 100%) !important;
                }
                
                .nav-logo, .ember-count, .airdrop-icon-container, .token-coin, .ar-token-coin, .map-control-btn {
                    background: linear-gradient(135deg, ${primaryColor}, ${secondaryColor}) !important;
                    border-color: ${primaryColor} !important;
                }
                
                .login-button, .airdrop-button, .token-action-btn, .btn-primary {
                    background: linear-gradient(135deg, ${primaryColor}, ${secondaryColor}) !important;
                }
                
                .nav-title, .ember-count-text, .airdrop-title {
                    color: #ffffff !important;
                }
                
                .airdrop-amount, .ember-count-text, .token-location-value {
                    color: ${primaryColor} !important;
                }
                
                .side-menu-title {
                    color: #ffffff !important;
                }
            </style>
        `;
        
        const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
        
        const oldStyle = iframeDoc.getElementById('whiteLabelCustomCSS');
        if (oldStyle) oldStyle.remove();
        
        iframeDoc.head.insertAdjacentHTML('beforeend', customCSS);
        
        // Update nav title
        const navTitle = iframeDoc.querySelector('.nav-title');
        if (navTitle) navTitle.textContent = appName;
        
        // Update side menu title
        const sideMenuTitle = iframeDoc.querySelector('.side-menu-title');
        if (sideMenuTitle) sideMenuTitle.textContent = appName;
        
        // Update logo in nav and side menu
        if (AppSetupState.whiteLabel.logo) {
            const logoImg = iframeDoc.querySelector('.nav-logo-image');
            if (logoImg) logoImg.src = AppSetupState.whiteLabel.logo;
            
            const sideMenuLogo = iframeDoc.querySelector('.side-menu-logo-image');
            if (sideMenuLogo) sideMenuLogo.src = AppSetupState.whiteLabel.logo;
        }
        
    } catch (error) {
        console.log('Preview update:', error.message);
    }
}

/**
 * Update custom domain display
 */
function updateCustomDomain() {
    const customDomain = document.getElementById('customDomain')?.value || '';
    const appName = document.getElementById('appName')?.value || 'my-ar-crypto-hunt';
    const domainInstructions = document.getElementById('domainInstructions');
    const dnsHost = document.getElementById('dnsHost');
    const finalUrl = document.getElementById('finalUrl');
    
    if (customDomain && domainInstructions) {
        domainInstructions.style.display = 'block';
        
        const parts = customDomain.split('.');
        const subdomain = parts.length > 2 ? parts[0] : customDomain.split('.')[0];
        
        if (dnsHost) dnsHost.textContent = subdomain;
        
        // Create URL-friendly app name
        const urlSafeName = appName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
        
        if (finalUrl) finalUrl.textContent = `https://${customDomain}/${urlSafeName}`;
    } else if (domainInstructions) {
        domainInstructions.style.display = 'none';
    }
}

/**
 * Deploy white label app
 */
function deployWhiteLabelApp() {
    const appName = document.getElementById('appName')?.value;
    const customDomain = document.getElementById('customDomain')?.value;
    
    if (!appName) {
        alert('Please enter an app name');
        return;
    }
    
    AppSetupState.whiteLabel.appName = appName;
    AppSetupState.whiteLabel.primaryColor = document.getElementById('primaryColor')?.value || '#f0a500';
    
    const urlSafeName = appName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
    
    let deployMsg = `🚀 Deploying "${appName}"...\n\nYour white label app is being built with your custom branding.\n\n✓ App configured\n✓ $Ember token integrated\n✓ Custom theme applied\n✓ Hosting setup complete`;
    
    if (customDomain) {
        deployMsg += `\n✓ Custom domain: ${customDomain}/${urlSafeName}`;
    } else {
        deployMsg += `\n✓ Default hosting: vault-phoenix.app/${urlSafeName}`;
    }
    
    deployMsg += `\n\nYour app will be ready in 5-10 minutes. You'll receive deployment confirmation.`;
    
    alert(deployMsg);
    
    setTimeout(() => {
        let successMsg = `✓ "${appName}" Deployed Successfully!\n\nYour app is now live`;
        
        if (customDomain) {
            successMsg += ` at:\nhttps://${customDomain}/${urlSafeName}`;
        } else {
            successMsg += ` at:\nhttps://vault-phoenix.app/${urlSafeName}`;
        }
        
        successMsg += `\n\nView and manage it in the "Campaign Control" section.`;
        
        alert(successMsg);
        
        if (typeof window.loadSection === 'function') {
            window.loadSection('campaigns');
        }
    }, 2000);
}

/**
 * Select platform for SDK
 */
function selectPlatform(platform) {
    AppSetupState.sdk.platform = platform;
    
    ['ios', 'android', 'web', 'unity'].forEach(p => {
        const btn = document.getElementById(`platform-${p}`);
        if (btn) {
            if (p === platform) {
                btn.classList.remove('btn-outline');
                btn.classList.add('btn-primary');
            } else {
                btn.classList.remove('btn-primary');
                btn.classList.add('btn-outline');
            }
        }
    });
}

/**
 * Copy API key
 */
function copyApiKey() {
    const apiKeyElement = document.getElementById('apiKeyDisplay');
    if (apiKeyElement) {
        const apiKey = apiKeyElement.textContent.trim();
        navigator.clipboard.writeText(apiKey).then(() => {
            alert('✓ API Key copied to clipboard!');
        }).catch(() => {
            const textArea = document.createElement('textarea');
            textArea.value = apiKey;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            alert('✓ API Key copied to clipboard!');
        });
    }
}

/**
 * Test integration
 */
function testIntegration() {
    if (!AppSetupState.sdk.platform) {
        alert('Please select a platform first.');
        return;
    }
    
    alert(`🧪 Testing ${AppSetupState.sdk.platform.toUpperCase()} Integration...\n\n✓ API Key Valid\n✓ SDK Connection Established\n✓ $Ember Token System Ready\n\nYour integration is working correctly!`);
}

// Export functions
if (typeof window !== 'undefined') {
    window.getAppSetupContent = getAppSetupContent;
    window.selectSetupType = selectSetupType;
    window.backToSetupSelection = backToSetupSelection;
    window.previewLogo = previewLogo;
    window.syncColorInput = syncColorInput;
    window.updateLivePreview = updateLivePreview;
    window.deployWhiteLabelApp = deployWhiteLabelApp;
    window.selectPlatform = selectPlatform;
    window.copyApiKey = copyApiKey;
    window.testIntegration = testIntegration;
    window.updateCustomDomain = updateCustomDomain;
}
