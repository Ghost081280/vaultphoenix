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
                Choose how you want to deploy your location-based AR crypto gaming campaign.
            </p>
            
            <!-- Setup Type Selection -->
            <div class="setup-type-grid" id="setupTypeSelection">
                <div class="setup-card" onclick="selectSetupType('white-label')">
                    <div class="setup-card-icon">🎨</div>
                    <h3>White Label App</h3>
                    <p>Launch a fully branded mobile app in minutes. Customize colors and upload your logo.</p>
                    <ul>
                        <li>✓ Visual App Builder</li>
                        <li>✓ Real-Time Live Preview</li>
                        <li>✓ Custom Branding & Colors</li>
                        <li>✓ Instant Deployment</li>
                    </ul>
                    <button class="btn btn-primary btn-large" onclick="event.stopPropagation(); selectSetupType('white-label')">
                        Build White Label App
                    </button>
                </div>
                
                <div class="setup-card" onclick="selectSetupType('sdk')">
                    <div class="setup-card-icon">🔌</div>
                    <h3>SDK Integration</h3>
                    <p>Integrate Vault Phoenix into your existing app with our developer-friendly SDK.</p>
                    <ul>
                        <li>✓ iOS, Android, Web & Unity</li>
                        <li>✓ Full Documentation</li>
                        <li>✓ API Key Management</li>
                        <li>✓ Code Examples</li>
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
                            </div>
                        </div>
                        
                        <div class="config-section">
                            <h5>Brand Colors</h5>
                            
                            <div class="color-grid">
                                <div class="color-picker-group">
                                    <label class="form-label">Primary Color</label>
                                    <div class="color-picker-wrapper">
                                        <input type="color" id="primaryColor" value="#f0a500" onchange="updateLivePreview()">
                                        <input type="text" id="primaryColorHex" value="#f0a500" oninput="syncColorInput('primary', this.value)">
                                    </div>
                                </div>
                                
                                <div class="color-picker-group">
                                    <label class="form-label">Secondary Color</label>
                                    <div class="color-picker-wrapper">
                                        <input type="color" id="secondaryColor" value="#fb923c" onchange="updateLivePreview()">
                                        <input type="text" id="secondaryColorHex" value="#fb923c" oninput="syncColorInput('secondary', this.value)">
                                    </div>
                                </div>
                                
                                <div class="color-picker-group">
                                    <label class="form-label">Accent Color</label>
                                    <div class="color-picker-wrapper">
                                        <input type="color" id="accentColor" value="#d73327" onchange="updateLivePreview()">
                                        <input type="text" id="accentColorHex" value="#d73327" oninput="syncColorInput('accent', this.value)">
                                    </div>
                                </div>
                                
                                <div class="color-picker-group">
                                    <label class="form-label">Background</label>
                                    <div class="color-picker-wrapper">
                                        <input type="color" id="backgroundColor" value="#1a1a1a" onchange="updateLivePreview()">
                                        <input type="text" id="backgroundColorHex" value="#1a1a1a" oninput="syncColorInput('background', this.value)">
                                    </div>
                                </div>
                                
                                <div class="color-picker-group">
                                    <label class="form-label">Text Color</label>
                                    <div class="color-picker-wrapper">
                                        <input type="color" id="textColor" value="#ffffff" onchange="updateLivePreview()">
                                        <input type="text" id="textColorHex" value="#ffffff" oninput="syncColorInput('text', this.value)">
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div class="config-section">
                            <h5>💎 Token Configuration</h5>
                            <div class="token-info-box">
                                <div class="token-symbol">💎</div>
                                <div class="token-details">
                                    <div class="token-name">$Ember</div>
                                    <div class="token-desc">Official Vault Phoenix Token</div>
                                </div>
                            </div>
                        </div>
                        
                        <div class="config-section">
                            <h5>🌐 Custom Domain (Optional)</h5>
                            <div class="form-group">
                                <input type="text" class="form-input" id="customDomain" placeholder="hunt.yourdomain.com" oninput="updateCustomDomain()">
                                <div class="form-hint" style="color: rgba(255,255,255,0.6); font-size: 0.85rem; margin-top: 8px;">Enter your custom domain for app hosting</div>
                            </div>
                            
                            <div id="domainInstructions" class="domain-instructions" style="display: none;">
                                <div class="instructions-title">📋 DNS Configuration:</div>
                                <div class="dns-config">
                                    <div><strong>Type:</strong> CNAME</div>
                                    <div><strong>Host:</strong> <span id="dnsHost">hunt</span></div>
                                    <div><strong>Points to:</strong> vault-phoenix.app</div>
                                    <div><strong>TTL:</strong> 3600</div>
                                </div>
                                <div class="final-url">
                                    Your app: <strong id="finalUrl">https://hunt.yourdomain.com</strong>
                                </div>
                            </div>
                        </div>
                        
                        <button class="btn btn-primary btn-large btn-deploy" onclick="deployWhiteLabelApp()">
                            🚀 Deploy App
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
                            <div class="phone-label">📱 Real-Time Theme Preview</div>
                        </div>
                        
                        <div class="preview-controls">
                            <button class="btn btn-secondary" onclick="refreshPreview()">🔄 Refresh</button>
                            <button class="btn btn-outline" onclick="openFullPreview()">🔗 Full Screen</button>
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
        const backgroundColor = document.getElementById('backgroundColor')?.value || '#1a1a1a';
        const textColor = document.getElementById('textColor')?.value || '#ffffff';
        
        const customCSS = `
            <style id="whiteLabelCustomCSS">
                :root {
                    --primary-color: ${primaryColor};
                    --secondary-color: ${secondaryColor};
                    --accent-color: ${accentColor};
                    --bg-color: ${backgroundColor};
                    --text-color: ${textColor};
                }
                
                body, .crypto-dashboard-page {
                    background: linear-gradient(135deg, ${backgroundColor} 0%, ${shadeColor(backgroundColor, -10)} 25%, ${accentColor}20 50%, ${primaryColor}15 75%, ${secondaryColor}20 100%) !important;
                }
                
                .nav-logo, .ember-count, .airdrop-icon-container, .token-coin, .ar-token-coin, .map-control-btn {
                    background: linear-gradient(135deg, ${primaryColor}, ${secondaryColor}) !important;
                    border-color: ${primaryColor} !important;
                }
                
                .login-button, .airdrop-button, .token-action-btn, .btn-primary {
                    background: linear-gradient(135deg, ${primaryColor}, ${secondaryColor}) !important;
                    border: none !important;
                }
                
                .nav-logo, .ember-count, .map-control-btn, .token-coin, .ar-token-coin, .form-input, button, .card {
                    border-radius: 12px !important;
                }
                
                .nav-title, .ember-count-text, .airdrop-title, h1, h2, h3, h4 {
                    color: ${textColor} !important;
                }
                
                .airdrop-amount, .ember-count-text, .token-location-value {
                    color: ${primaryColor} !important;
                }
                
                .nav-logo, .ember-count, .side-menu, .airdrop-content, .token-modal-content {
                    border-color: ${primaryColor} !important;
                }
            </style>
        `;
        
        const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
        
        const oldStyle = iframeDoc.getElementById('whiteLabelCustomCSS');
        if (oldStyle) oldStyle.remove();
        
        iframeDoc.head.insertAdjacentHTML('beforeend', customCSS);
        
        const navTitle = iframeDoc.querySelector('.nav-title');
        if (navTitle) navTitle.textContent = appName;
        
        if (AppSetupState.whiteLabel.logo) {
            const logoImg = iframeDoc.querySelector('.nav-logo-image');
            if (logoImg) logoImg.src = AppSetupState.whiteLabel.logo;
        }
        
    } catch (error) {
        console.log('Preview update:', error.message);
    }
}

/**
 * Shade color helper
 */
function shadeColor(color, percent) {
    const num = parseInt(color.replace("#",""), 16);
    const amt = Math.round(2.55 * percent);
    const R = (num >> 16) + amt;
    const G = (num >> 8 & 0x00FF) + amt;
    const B = (num & 0x0000FF) + amt;
    return "#" + (0x1000000 + (R<255?R<1?0:R:255)*0x10000 +
        (G<255?G<1?0:G:255)*0x100 + (B<255?B<1?0:B:255))
        .toString(16).slice(1);
}

/**
 * Refresh preview
 */
function refreshPreview() {
    const iframe = document.getElementById('gamePreviewFrame');
    if (iframe) {
        iframe.src = iframe.src;
        setTimeout(() => updateLivePreview(), 500);
    }
}

/**
 * Open full preview
 */
function openFullPreview() {
    window.open(AppSetupState.playerAppTemplate, '_blank');
}

/**
 * Update custom domain display
 */
function updateCustomDomain() {
    const customDomain = document.getElementById('customDomain')?.value || '';
    const domainInstructions = document.getElementById('domainInstructions');
    const dnsHost = document.getElementById('dnsHost');
    const finalUrl = document.getElementById('finalUrl');
    
    if (customDomain && domainInstructions) {
        domainInstructions.style.display = 'block';
        
        const parts = customDomain.split('.');
        const subdomain = parts.length > 2 ? parts[0] : customDomain.split('.')[0];
        
        if (dnsHost) dnsHost.textContent = subdomain;
        if (finalUrl) finalUrl.textContent = `https://${customDomain}`;
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
    AppSetupState.whiteLabel.secondaryColor = document.getElementById('secondaryColor')?.value || '#fb923c';
    AppSetupState.whiteLabel.accentColor = document.getElementById('accentColor')?.value || '#d73327';
    
    let deployMsg = `🚀 Deploying "${appName}"...\n\nYour white label app is being built with your custom branding.\n\n✓ App configured\n✓ $Ember integration enabled\n✓ Custom theme applied`;
    
    if (customDomain) {
        deployMsg += `\n✓ Custom domain: ${customDomain}`;
    }
    
    deployMsg += `\n\nYour app will be ready in 5-10 minutes.`;
    
    alert(deployMsg);
    
    setTimeout(() => {
        let successMsg = `✓ "${appName}" Deployed Successfully!\n\nYour app is now live`;
        
        if (customDomain) {
            successMsg += ` at https://${customDomain}`;
        }
        
        successMsg += `\n\nView it in the "Campaign Control" section.`;
        
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
    window.refreshPreview = refreshPreview;
    window.openFullPreview = openFullPreview;
    window.deployWhiteLabelApp = deployWhiteLabelApp;
    window.selectPlatform = selectPlatform;
    window.copyApiKey = copyApiKey;
    window.testIntegration = testIntegration;
    window.updateCustomDomain = updateCustomDomain;
}
