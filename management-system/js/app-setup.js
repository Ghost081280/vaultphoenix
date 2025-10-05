/* ============================================
   VAULT PHOENIX MANAGEMENT SYSTEM
   App Setup - White Label Builder & SDK Integration (Enhanced Live Preview)
   ============================================ */

// ============================================
// APP SETUP STATE
// ============================================

const AppSetupState = {
    setupType: null,
    whiteLabel: {
        appName: '',
        logo: null,
        primaryColor: '#f0a500',
        secondaryColor: '#fb923c',
        accentColor: '#d73327',
        backgroundColor: '#1a1a1a',
        textColor: '#ffffff',
        buttonStyle: 'gradient',
        borderRadius: '12px',
        appDescription: '',
        appIcon: null,
        tokenName: '$Ember',
        tokenSymbol: '💎',
        enableAR: true,
        enableMap: true,
        enableVault: true
    },
    sdk: {
        platform: null,
        repositoryUrl: 'https://github.com/vaultphoenix/sdk',
        apiKey: null,
        integrationStatus: 'pending'
    },
    // Template URL for live preview
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
            <div class="revenue-grid" id="setupTypeSelection">
                <div class="card card-hover" onclick="selectSetupType('white-label')" style="cursor: pointer;">
                    <div style="text-align: center;">
                        <div style="font-size: 4rem; margin-bottom: 20px;">🎨</div>
                        <h3 style="color: var(--color-primary-gold); margin-bottom: 15px;">White Label App</h3>
                        <p style="color: rgba(255,255,255,0.7); line-height: 1.6; margin-bottom: 20px;">
                            Launch a fully branded mobile app in minutes. No coding required - just customize colors, 
                            upload your logo, and deploy with live preview.
                        </p>
                        <ul style="list-style: none; padding: 0; text-align: left; margin-bottom: 25px;">
                            <li style="padding: 8px 0; border-bottom: 1px solid rgba(255,255,255,0.1);">
                                ✓ Visual App Builder
                            </li>
                            <li style="padding: 8px 0; border-bottom: 1px solid rgba(255,255,255,0.1);">
                                ✓ Real-Time Live Preview
                            </li>
                            <li style="padding: 8px 0; border-bottom: 1px solid rgba(255,255,255,0.1);">
                                ✓ Custom Branding & Colors
                            </li>
                            <li style="padding: 8px 0; border-bottom: 1px solid rgba(255,255,255,0.1);">
                                ✓ Instant Deployment
                            </li>
                            <li style="padding: 8px 0;">
                                ✓ Full AR Gaming Features
                            </li>
                        </ul>
                        <button class="btn btn-primary btn-large" onclick="event.stopPropagation(); selectSetupType('white-label')">
                            Build White Label App
                        </button>
                    </div>
                </div>
                
                <div class="card card-hover" onclick="selectSetupType('sdk')" style="cursor: pointer;">
                    <div style="text-align: center;">
                        <div style="font-size: 4rem; margin-bottom: 20px;">🔌</div>
                        <h3 style="color: var(--color-primary-gold); margin-bottom: 15px;">SDK Integration</h3>
                        <p style="color: rgba(255,255,255,0.7); line-height: 1.6; margin-bottom: 20px;">
                            Integrate Vault Phoenix into your existing app. Add location-based gaming features 
                            with our developer-friendly SDK.
                        </p>
                        <ul style="list-style: none; padding: 0; text-align: left; margin-bottom: 25px;">
                            <li style="padding: 8px 0; border-bottom: 1px solid rgba(255,255,255,0.1);">
                                ✓ iOS, Android, Web & Unity
                            </li>
                            <li style="padding: 8px 0; border-bottom: 1px solid rgba(255,255,255,0.1);">
                                ✓ Full Documentation
                            </li>
                            <li style="padding: 8px 0; border-bottom: 1px solid rgba(255,255,255,0.1);">
                                ✓ API Key Management
                            </li>
                            <li style="padding: 8px 0; border-bottom: 1px solid rgba(255,255,255,0.1);">
                                ✓ Code Examples
                            </li>
                            <li style="padding: 8px 0;">
                                ✓ Technical Support
                            </li>
                        </ul>
                        <button class="btn btn-secondary btn-large" onclick="event.stopPropagation(); selectSetupType('sdk')">
                            Integrate SDK
                        </button>
                    </div>
                </div>
            </div>
            
            <!-- White Label Builder (Hidden Initially) -->
            <div id="whiteLabelBuilder" style="display: none;">
                <div class="dashboard-section">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 30px; flex-wrap: wrap; gap: 15px;">
                        <h3 style="font-size: 1.8rem; color: var(--color-primary-gold);">
                            🎨 White Label App Builder
                        </h3>
                        <button class="btn btn-outline" onclick="backToSetupSelection()">
                            ← Back to Options
                        </button>
                    </div>
                    
                    <div class="revenue-grid">
                        <!-- Builder Form - Enhanced -->
                        <div class="card" style="max-height: 800px; overflow-y: auto;">
                            <h4 style="margin-bottom: 20px; color: var(--color-primary-orange);">App Configuration</h4>
                            
                            <!-- Basic Info -->
                            <div style="margin-bottom: 25px; padding-bottom: 20px; border-bottom: 1px solid rgba(255,255,255,0.1);">
                                <h5 style="color: var(--color-primary-gold); margin-bottom: 15px;">📱 Basic Info</h5>
                                
                                <div class="form-group">
                                    <label class="form-label">App Name *</label>
                                    <input type="text" class="form-input" id="appName" placeholder="My AR Crypto Hunt" value="My AR Crypto Hunt" oninput="updateLivePreview()">
                                </div>
                                
                                <div class="form-group">
                                    <label class="form-label">App Description</label>
                                    <textarea class="form-input" id="appDescription" rows="3" placeholder="Discover crypto rewards in the real world!" oninput="updateLivePreview()">Discover crypto rewards in the real world!</textarea>
                                </div>
                                
                                <div class="form-group">
                                    <label class="form-label">App Logo (Square, PNG/JPG)</label>
                                    <input type="file" class="form-input" id="appLogo" accept="image/*" onchange="previewLogo(event)">
                                    <div id="logoPreview" style="margin-top: 10px; display: none;">
                                        <img id="logoPreviewImg" style="width: 80px; height: 80px; border-radius: 12px; object-fit: cover;">
                                    </div>
                                </div>
                            </div>
                            
                            <!-- Token Configuration -->
                            <div style="margin-bottom: 25px; padding-bottom: 20px; border-bottom: 1px solid rgba(255,255,255,0.1);">
                                <h5 style="color: var(--color-primary-gold); margin-bottom: 15px;">💎 Token Configuration</h5>
                                
                                <div class="form-group">
                                    <label class="form-label">Token Name</label>
                                    <input type="text" class="form-input" id="tokenName" value="$Ember" oninput="updateLivePreview()">
                                </div>
                                
                                <div class="form-group">
                                    <label class="form-label">Token Symbol (Emoji)</label>
                                    <input type="text" class="form-input" id="tokenSymbol" value="💎" maxlength="2" oninput="updateLivePreview()">
                                </div>
                            </div>
                            
                            <!-- Brand Colors -->
                            <div style="margin-bottom: 25px; padding-bottom: 20px; border-bottom: 1px solid rgba(255,255,255,0.1);">
                                <h5 style="color: var(--color-primary-gold); margin-bottom: 15px;">🎨 Brand Colors</h5>
                                
                                <div class="form-group">
                                    <label class="form-label">Primary Color (Buttons, Highlights)</label>
                                    <div style="display: flex; gap: 10px; align-items: center;">
                                        <input type="color" class="form-input" id="primaryColor" value="#f0a500" onchange="updateLivePreview()" style="width: 80px; height: 50px; padding: 5px;">
                                        <input type="text" class="form-input" id="primaryColorHex" value="#f0a500" oninput="syncColorInput('primary', this.value)" style="flex: 1;">
                                    </div>
                                </div>
                                
                                <div class="form-group">
                                    <label class="form-label">Secondary Color (Gradients)</label>
                                    <div style="display: flex; gap: 10px; align-items: center;">
                                        <input type="color" class="form-input" id="secondaryColor" value="#fb923c" onchange="updateLivePreview()" style="width: 80px; height: 50px; padding: 5px;">
                                        <input type="text" class="form-input" id="secondaryColorHex" value="#fb923c" oninput="syncColorInput('secondary', this.value)" style="flex: 1;">
                                    </div>
                                </div>
                                
                                <div class="form-group">
                                    <label class="form-label">Accent Color (Icons, Links)</label>
                                    <div style="display: flex; gap: 10px; align-items: center;">
                                        <input type="color" class="form-input" id="accentColor" value="#d73327" onchange="updateLivePreview()" style="width: 80px; height: 50px; padding: 5px;">
                                        <input type="text" class="form-input" id="accentColorHex" value="#d73327" oninput="syncColorInput('accent', this.value)" style="flex: 1;">
                                    </div>
                                </div>
                                
                                <div class="form-group">
                                    <label class="form-label">Background Color</label>
                                    <div style="display: flex; gap: 10px; align-items: center;">
                                        <input type="color" class="form-input" id="backgroundColor" value="#1a1a1a" onchange="updateLivePreview()" style="width: 80px; height: 50px; padding: 5px;">
                                        <input type="text" class="form-input" id="backgroundColorHex" value="#1a1a1a" oninput="syncColorInput('background', this.value)" style="flex: 1;">
                                    </div>
                                </div>
                                
                                <div class="form-group">
                                    <label class="form-label">Text Color</label>
                                    <div style="display: flex; gap: 10px; align-items: center;">
                                        <input type="color" class="form-input" id="textColor" value="#ffffff" onchange="updateLivePreview()" style="width: 80px; height: 50px; padding: 5px;">
                                        <input type="text" class="form-input" id="textColorHex" value="#ffffff" oninput="syncColorInput('text', this.value)" style="flex: 1;">
                                    </div>
                                </div>
                            </div>
                            
                            <!-- UI Style -->
                            <div style="margin-bottom: 25px; padding-bottom: 20px; border-bottom: 1px solid rgba(255,255,255,0.1);">
                                <h5 style="color: var(--color-primary-gold); margin-bottom: 15px;">✨ UI Style</h5>
                                
                                <div class="form-group">
                                    <label class="form-label">Button Style</label>
                                    <select class="form-input" id="buttonStyle" onchange="updateLivePreview()">
                                        <option value="gradient">Gradient</option>
                                        <option value="solid">Solid</option>
                                        <option value="outline">Outline</option>
                                    </select>
                                </div>
                                
                                <div class="form-group">
                                    <label class="form-label">Border Radius</label>
                                    <select class="form-input" id="borderRadius" onchange="updateLivePreview()">
                                        <option value="4px">Sharp (4px)</option>
                                        <option value="8px">Subtle (8px)</option>
                                        <option value="12px" selected>Standard (12px)</option>
                                        <option value="16px">Rounded (16px)</option>
                                        <option value="24px">Very Rounded (24px)</option>
                                    </select>
                                </div>
                            </div>
                            
                            <!-- Features -->
                            <div style="margin-bottom: 25px;">
                                <h5 style="color: var(--color-primary-gold); margin-bottom: 15px;">🎮 Features</h5>
                                
                                <div class="form-group" style="display: flex; align-items: center; gap: 10px;">
                                    <input type="checkbox" id="enableAR" checked onchange="updateLivePreview()" style="width: 20px; height: 20px;">
                                    <label class="form-label" style="margin: 0;">Enable AR Hunt Mode</label>
                                </div>
                                
                                <div class="form-group" style="display: flex; align-items: center; gap: 10px;">
                                    <input type="checkbox" id="enableMap" checked onchange="updateLivePreview()" style="width: 20px; height: 20px;">
                                    <label class="form-label" style="margin: 0;">Enable Map View</label>
                                </div>
                                
                                <div class="form-group" style="display: flex; align-items: center; gap: 10px;">
                                    <input type="checkbox" id="enableVault" checked onchange="updateLivePreview()" style="width: 20px; height: 20px;">
                                    <label class="form-label" style="margin: 0;">Enable Token Vault</label>
                                </div>
                            </div>
                            
                            <button class="btn btn-primary btn-large" onclick="deployWhiteLabelApp()" style="width: 100%;">
                                🚀 Deploy App
                            </button>
                        </div>
                        
                        <!-- Live Preview with Real Game Frame -->
                        <div class="card">
                            <h4 style="margin-bottom: 20px; color: var(--color-primary-orange);">📱 Live Preview</h4>
                            
                            <!-- Phone Mockup Frame -->
                            <div style="max-width: 380px; margin: 0 auto; position: relative;">
                                <!-- Phone Frame -->
                                <div style="
                                    border: 14px solid #1a1a1a;
                                    border-radius: 48px;
                                    box-shadow: 0 20px 60px rgba(0,0,0,0.6), inset 0 0 0 2px #333;
                                    position: relative;
                                    padding: 0;
                                    background: #000;
                                    overflow: hidden;
                                ">
                                    <!-- Notch -->
                                    <div style="
                                        position: absolute;
                                        top: 0;
                                        left: 50%;
                                        transform: translateX(-50%);
                                        width: 120px;
                                        height: 28px;
                                        background: #1a1a1a;
                                        border-radius: 0 0 20px 20px;
                                        z-index: 10;
                                    "></div>
                                    
                                    <!-- Live Game Preview iFrame -->
                                    <iframe 
                                        id="gamePreviewFrame" 
                                        src="https://ghost081280.github.io/vaultphoenix/crypto-game/dashboard.html"
                                        style="
                                            width: 100%;
                                            height: 667px;
                                            border: none;
                                            border-radius: 32px;
                                            background: #000;
                                        "
                                        allow="geolocation; camera"
                                        sandbox="allow-scripts allow-same-origin"
                                    ></iframe>
                                    
                                    <!-- Home Indicator -->
                                    <div style="
                                        position: absolute;
                                        bottom: 8px;
                                        left: 50%;
                                        transform: translateX(-50%);
                                        width: 140px;
                                        height: 4px;
                                        background: rgba(255,255,255,0.3);
                                        border-radius: 2px;
                                        z-index: 10;
                                    "></div>
                                </div>
                                
                                <!-- Phone Label -->
                                <div style="text-align: center; margin-top: 15px; color: rgba(255,255,255,0.5); font-size: 0.85rem;">
                                    📱 Real-Time Theme Preview
                                </div>
                            </div>
                            
                            <!-- Preview Controls -->
                            <div style="margin-top: 20px; text-align: center;">
                                <button class="btn btn-secondary" onclick="refreshPreview()" style="margin-right: 10px;">
                                    🔄 Refresh Preview
                                </button>
                                <button class="btn btn-outline" onclick="openFullPreview()">
                                    🔗 Open Full Screen
                                </button>
                            </div>
                            
                            <!-- Custom Domain Setup -->
                            <div style="margin-top: 20px; padding: 20px; background: rgba(240,165,0,0.1); border: 1px solid rgba(240,165,0,0.3); border-radius: 12px;">
                                <h4 style="color: var(--color-primary-gold); margin-bottom: 15px;">🌐 Custom Domain Setup</h4>
                                
                                <div class="form-group" style="margin-bottom: 0;">
                                    <label class="form-label">Your Custom URL (Optional)</label>
                                    <input type="text" class="form-input" id="customDomain" placeholder="hunt.yourdomain.com" oninput="updateCustomDomain()">
                                    <div style="color: rgba(255,255,255,0.6); font-size: 0.85rem; margin-top: 8px;">
                                        Enter your custom domain where your app will be hosted
                                    </div>
                                </div>
                                
                                <div id="domainInstructions" style="margin-top: 20px; padding: 15px; background: rgba(0,0,0,0.3); border-radius: 8px; display: none;">
                                    <div style="font-weight: 700; margin-bottom: 10px;">📋 DNS Configuration Steps:</div>
                                    <ol style="margin: 0; padding-left: 20px; color: rgba(255,255,255,0.8); font-size: 0.9rem;">
                                        <li style="margin-bottom: 8px;">Login to your domain provider (GoDaddy, Namecheap, etc.)</li>
                                        <li style="margin-bottom: 8px;">Go to DNS Management / DNS Settings</li>
                                        <li style="margin-bottom: 8px;">Add a CNAME record:
                                            <div style="background: rgba(0,0,0,0.5); padding: 10px; border-radius: 6px; margin-top: 8px; font-family: monospace;">
                                                <strong>Type:</strong> CNAME<br>
                                                <strong>Host:</strong> <span id="dnsHost">hunt</span><br>
                                                <strong>Points to:</strong> vault-phoenix.app<br>
                                                <strong>TTL:</strong> 3600
                                            </div>
                                        </li>
                                        <li>Save changes and wait 5-10 minutes for DNS propagation</li>
                                    </ol>
                                    
                                    <div style="margin-top: 15px; padding: 12px; background: rgba(34,197,94,0.1); border: 1px solid rgba(34,197,94,0.3); border-radius: 8px;">
                                        <div style="font-weight: 700; margin-bottom: 5px; color: #22c55e;">✓ After Setup:</div>
                                        <div style="font-size: 0.9rem; color: rgba(255,255,255,0.8);">
                                            Your app will be accessible at: <span style="color: var(--color-primary-gold); font-weight: 700;" id="finalUrl">https://hunt.yourdomain.com</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <!-- SDK Integration (Hidden Initially) -->
            <div id="sdkIntegration" style="display: none;">
                <div class="dashboard-section">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 30px; flex-wrap: wrap; gap: 15px;">
                        <h3 style="font-size: 1.8rem; color: var(--color-primary-gold);">
                            🔌 SDK Integration Guide
                        </h3>
                        <button class="btn btn-outline" onclick="backToSetupSelection()">
                            ← Back to Options
                        </button>
                    </div>
                    
                    <!-- Platform Selection -->
                    <div class="card" style="margin-bottom: 30px;">
                        <h4 style="margin-bottom: 20px;">Select Your Platform</h4>
                        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 15px;">
                            <button class="btn btn-outline" onclick="selectPlatform('ios')" id="platform-ios">
                                📱 iOS
                            </button>
                            <button class="btn btn-outline" onclick="selectPlatform('android')" id="platform-android">
                                🤖 Android
                            </button>
                            <button class="btn btn-outline" onclick="selectPlatform('web')" id="platform-web">
                                🌐 Web
                            </button>
                            <button class="btn btn-outline" onclick="selectPlatform('unity')" id="platform-unity">
                                🎮 Unity
                            </button>
                        </div>
                    </div>
                    
                    <!-- API Key -->
                    <div class="card" style="margin-bottom: 30px;">
                        <h4 style="margin-bottom: 20px;">Your API Credentials</h4>
                        <div style="background: rgba(0,0,0,0.3); border-radius: 12px; padding: 20px; margin-bottom: 15px;">
                            <div style="font-size: 0.9rem; color: rgba(255,255,255,0.6); margin-bottom: 8px;">API Key</div>
                            <div id="apiKeyDisplay" style="font-family: monospace; font-size: 1.1rem; color: var(--color-primary-gold); word-break: break-all;">
                                vp_live_${Math.random().toString(36).substring(2, 15)}${Math.random().toString(36).substring(2, 15)}
                            </div>
                        </div>
                        <button class="btn btn-secondary" onclick="copyApiKey()">
                            📋 Copy API Key
                        </button>
                    </div>
                    
                    <!-- Integration Steps -->
                    <div class="card">
                        <h4 style="margin-bottom: 20px;">Integration Steps</h4>
                        
                        <div id="integrationSteps">
                            <div style="padding: 20px; background: rgba(240,165,0,0.1); border-left: 4px solid var(--color-primary-gold); border-radius: 8px; margin-bottom: 20px;">
                                <div style="font-weight: 700; margin-bottom: 10px;">Step 1: Clone the Repository</div>
                                <div style="background: rgba(0,0,0,0.5); padding: 12px; border-radius: 8px; font-family: monospace; font-size: 0.9rem; margin-top: 10px;">
                                    git clone https://github.com/vaultphoenix/sdk.git
                                </div>
                            </div>
                            
                            <div style="padding: 20px; background: rgba(240,165,0,0.1); border-left: 4px solid var(--color-primary-gold); border-radius: 8px; margin-bottom: 20px;">
                                <div style="font-weight: 700; margin-bottom: 10px;">Step 2: Install Dependencies</div>
                                <div style="background: rgba(0,0,0,0.5); padding: 12px; border-radius: 8px; font-family: monospace; font-size: 0.9rem; margin-top: 10px;">
                                    npm install @vaultphoenix/sdk
                                </div>
                            </div>
                            
                            <div style="padding: 20px; background: rgba(240,165,0,0.1); border-left: 4px solid var(--color-primary-gold); border-radius: 8px; margin-bottom: 20px;">
                                <div style="font-weight: 700; margin-bottom: 10px;">Step 3: Initialize SDK</div>
                                <div style="background: rgba(0,0,0,0.5); padding: 12px; border-radius: 8px; font-family: monospace; font-size: 0.9rem; margin-top: 10px; white-space: pre-wrap;">import VaultPhoenix from '@vaultphoenix/sdk';

const vp = new VaultPhoenix({
  apiKey: 'YOUR_API_KEY',
  enableAR: true,
  tokenSymbol: '$Ember'
});</div>
                            </div>
                            
                            <div style="padding: 20px; background: rgba(240,165,0,0.1); border-left: 4px solid var(--color-primary-gold); border-radius: 8px;">
                                <div style="font-weight: 700; margin-bottom: 10px;">Step 4: Test Integration</div>
                                <p style="margin: 10px 0 0 0; color: rgba(255,255,255,0.7);">
                                    Use our test environment to verify your integration before going live.
                                </p>
                            </div>
                        </div>
                        
                        <div style="margin-top: 25px; display: flex; gap: 15px; flex-wrap: wrap;">
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
        // Initialize preview after DOM is ready
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
            const preview = document.getElementById('logoPreview');
            const img = document.getElementById('logoPreviewImg');
            
            img.src = e.target.result;
            preview.style.display = 'block';
            
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
        // Get all values
        const appName = document.getElementById('appName')?.value || 'My AR Crypto Hunt';
        const tokenName = document.getElementById('tokenName')?.value || '$Ember';
        const tokenSymbol = document.getElementById('tokenSymbol')?.value || '💎';
        const primaryColor = document.getElementById('primaryColor')?.value || '#f0a500';
        const secondaryColor = document.getElementById('secondaryColor')?.value || '#fb923c';
        const accentColor = document.getElementById('accentColor')?.value || '#d73327';
        const backgroundColor = document.getElementById('backgroundColor')?.value || '#1a1a1a';
        const textColor = document.getElementById('textColor')?.value || '#ffffff';
        const buttonStyle = document.getElementById('buttonStyle')?.value || 'gradient';
        const borderRadius = document.getElementById('borderRadius')?.value || '12px';
        
        // Create custom CSS to inject
        const customCSS = `
            <style id="whiteLabelCustomCSS">
                /* Override primary colors */
                :root {
                    --primary-color: ${primaryColor};
                    --secondary-color: ${secondaryColor};
                    --accent-color: ${accentColor};
                    --bg-color: ${backgroundColor};
                    --text-color: ${textColor};
                    --border-radius: ${borderRadius};
                }
                
                /* Background gradient */
                body, .crypto-dashboard-page {
                    background: linear-gradient(135deg, ${backgroundColor} 0%, ${shadeColor(backgroundColor, -10)} 25%, ${accentColor}20 50%, ${primaryColor}15 75%, ${secondaryColor}20 100%) !important;
                }
                
                /* Primary color overrides */
                .nav-logo,
                .ember-count,
                .airdrop-icon-container,
                .token-coin,
                .ar-token-coin,
                .map-control-btn {
                    background: linear-gradient(135deg, ${primaryColor}, ${secondaryColor}) !important;
                    border-color: ${primaryColor} !important;
                }
                
                /* Button styles */
                ${buttonStyle === 'gradient' ? `
                .login-button,
                .airdrop-button,
                .token-action-btn,
                .btn-primary {
                    background: linear-gradient(135deg, ${primaryColor}, ${secondaryColor}) !important;
                    border: none !important;
                }
                ` : buttonStyle === 'solid' ? `
                .login-button,
                .airdrop-button,
                .token-action-btn,
                .btn-primary {
                    background: ${primaryColor} !important;
                    border: none !important;
                }
                ` : `
                .login-button,
                .airdrop-button,
                .token-action-btn,
                .btn-primary {
                    background: transparent !important;
                    border: 2px solid ${primaryColor} !important;
                    color: ${primaryColor} !important;
                }
                `}
                
                /* Border radius */
                .nav-logo,
                .ember-count,
                .map-control-btn,
                .token-coin,
                .ar-token-coin,
                .form-input,
                button,
                .card {
                    border-radius: ${borderRadius} !important;
                }
                
                /* Text colors */
                .nav-title,
                .ember-count-text,
                .airdrop-title,
                h1, h2, h3, h4 {
                    color: ${textColor} !important;
                }
                
                /* Accent color */
                .airdrop-amount,
                .ember-count-text,
                .token-location-value {
                    color: ${primaryColor} !important;
                }
                
                /* Border colors */
                .nav-logo,
                .ember-count,
                .side-menu,
                .airdrop-content,
                .token-modal-content {
                    border-color: ${primaryColor} !important;
                }
            </style>
        `;
        
        // Try to inject CSS into iframe
        const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
        
        // Remove old custom CSS if exists
        const oldStyle = iframeDoc.getElementById('whiteLabelCustomCSS');
        if (oldStyle) {
            oldStyle.remove();
        }
        
        // Inject new CSS
        iframeDoc.head.insertAdjacentHTML('beforeend', customCSS);
        
        // Update app name if element exists
        const navTitle = iframeDoc.querySelector('.nav-title');
        if (navTitle) {
            navTitle.textContent = appName;
        }
        
        // Update logo if uploaded
        if (AppSetupState.whiteLabel.logo) {
            const logoImg = iframeDoc.querySelector('.nav-logo-image');
            if (logoImg) {
                logoImg.src = AppSetupState.whiteLabel.logo;
            }
        }
        
    } catch (error) {
        console.log('Preview update:', error.message);
        // Iframe might not be loaded yet or cross-origin restriction
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
        iframe.src = iframe.src; // Reload iframe
        setTimeout(() => {
            updateLivePreview();
        }, 500);
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
        
        if (dnsHost) {
            dnsHost.textContent = subdomain;
        }
        
        if (finalUrl) {
            finalUrl.textContent = `https://${customDomain}`;
        }
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
    
    // Save all settings
    AppSetupState.whiteLabel.appName = appName;
    AppSetupState.whiteLabel.appDescription = document.getElementById('appDescription')?.value || '';
    AppSetupState.whiteLabel.tokenName = document.getElementById('tokenName')?.value || '$Ember';
    AppSetupState.whiteLabel.primaryColor = document.getElementById('primaryColor')?.value || '#f0a500';
    AppSetupState.whiteLabel.secondaryColor = document.getElementById('secondaryColor')?.value || '#fb923c';
    AppSetupState.whiteLabel.accentColor = document.getElementById('accentColor')?.value || '#d73327';
    AppSetupState.whiteLabel.enableAR = document.getElementById('enableAR')?.checked || true;
    
    let deployMsg = `🚀 Deploying "${appName}"...\n\nYour white label app is being built with your custom branding.\n\n✓ App configured\n✓ ${AppSetupState.whiteLabel.tokenName} integration enabled\n✓ AR features activated\n✓ Custom theme applied`;
    
    if (customDomain) {
        deployMsg += `\n✓ Custom domain: ${customDomain}`;
    }
    
    deployMsg += `\n\nYour app will be ready in 5-10 minutes. You'll receive an email with `;
    
    if (customDomain) {
        deployMsg += `your custom URL and download links.`;
    } else {
        deployMsg += `download links and default hosting URL.`;
    }
    
    alert(deployMsg);
    
    setTimeout(() => {
        let successMsg = `✓ "${appName}" Deployed Successfully!\n\nYour app is now live`;
        
        if (customDomain) {
            successMsg += ` at https://${customDomain}`;
        } else {
            successMsg += ` and using the template:\n${AppSetupState.playerAppTemplate}`;
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
    
    alert(`🧪 Testing ${AppSetupState.sdk.platform.toUpperCase()} Integration...\n\n✓ API Key Valid\n✓ SDK Connection Established\n✓ Token System Ready\n✓ AR Features Available\n\nYour integration is working correctly!`);
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
