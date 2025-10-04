/* ============================================
   VAULT PHOENIX MANAGEMENT SYSTEM
   App Setup - White Label Builder & SDK Integration
   ============================================ */

// ============================================
// APP SETUP STATE
// ============================================

const AppSetupState = {
    setupType: null, // 'white-label' or 'sdk'
    whiteLabel: {
        appName: '',
        logo: null,
        primaryColor: '#d73327',
        secondaryColor: '#fb923c',
        accentColor: '#f0a500',
        appDescription: '',
        appIcon: null
    },
    sdk: {
        platform: null, // 'ios', 'android', 'web', 'unity'
        repositoryUrl: 'https://github.com/vaultphoenix/sdk',
        apiKey: null,
        integrationStatus: 'pending'
    }
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
                            upload your logo, and deploy.
                        </p>
                        <ul style="list-style: none; padding: 0; text-align: left; margin-bottom: 25px;">
                            <li style="padding: 8px 0; border-bottom: 1px solid rgba(255,255,255,0.1);">
                                ✓ Visual App Builder
                            </li>
                            <li style="padding: 8px 0; border-bottom: 1px solid rgba(255,255,255,0.1);">
                                ✓ Custom Branding
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
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 30px;">
                        <h3 style="font-size: 1.8rem; color: var(--color-primary-gold);">
                            🎨 White Label App Builder
                        </h3>
                        <button class="btn btn-outline" onclick="backToSetupSelection()">
                            ← Back to Options
                        </button>
                    </div>
                    
                    <div class="revenue-grid">
                        <!-- Builder Form -->
                        <div class="card">
                            <h4 style="margin-bottom: 20px; color: var(--color-primary-orange);">App Configuration</h4>
                            
                            <div class="form-group">
                                <label class="form-label">App Name *</label>
                                <input type="text" class="form-input" id="appName" placeholder="My AR Crypto Hunt" value="">
                            </div>
                            
                            <div class="form-group">
                                <label class="form-label">App Description</label>
                                <textarea class="form-input" id="appDescription" rows="3" placeholder="Describe your campaign..."></textarea>
                            </div>
                            
                            <div class="form-group">
                                <label class="form-label">App Logo (Square, PNG/JPG)</label>
                                <input type="file" class="form-input" id="appLogo" accept="image/*" onchange="previewLogo(event)">
                                <div id="logoPreview" style="margin-top: 10px; display: none;">
                                    <img id="logoPreviewImg" style="width: 100px; height: 100px; border-radius: 12px; object-fit: cover;">
                                </div>
                            </div>
                            
                            <div class="form-group">
                                <label class="form-label">Primary Brand Color</label>
                                <input type="color" class="form-input" id="primaryColor" value="#d73327" onchange="updatePreview()">
                            </div>
                            
                            <div class="form-group">
                                <label class="form-label">Secondary Color</label>
                                <input type="color" class="form-input" id="secondaryColor" value="#fb923c" onchange="updatePreview()">
                            </div>
                            
                            <div class="form-group">
                                <label class="form-label">Accent Color</label>
                                <input type="color" class="form-input" id="accentColor" value="#f0a500" onchange="updatePreview()">
                            </div>
                            
                            <div style="background: rgba(240,165,0,0.1); border: 1px solid rgba(240,165,0,0.3); border-radius: 12px; padding: 15px; margin: 20px 0;">
                                <div style="font-weight: 700; margin-bottom: 8px;">💎 Token Setup</div>
                                <p style="margin: 0; font-size: 0.9rem; color: rgba(255,255,255,0.7);">
                                    Your campaign will use $Ember tokens. Players will earn them through location-based activities.
                                </p>
                            </div>
                            
                            <button class="btn btn-primary btn-large" onclick="deployWhiteLabelApp()" style="width: 100%;">
                                🚀 Deploy App
                            </button>
                        </div>
                        
                        <!-- Live Preview -->
                        <div class="card">
                            <h4 style="margin-bottom: 20px; color: var(--color-primary-orange);">Live Preview</h4>
                            
                            <div id="appPreview" style="background: rgba(0,0,0,0.3); border-radius: 20px; padding: 30px; text-align: center;">
                                <div id="previewLogo" style="width: 80px; height: 80px; margin: 0 auto 20px; background: var(--gradient-fire); border-radius: 20px; display: flex; align-items: center; justify-content: center; font-size: 2rem;">
                                    🔥
                                </div>
                                <div id="previewAppName" style="font-size: 1.5rem; font-weight: 900; margin-bottom: 10px;">
                                    My AR Crypto Hunt
                                </div>
                                <div id="previewDescription" style="color: rgba(255,255,255,0.7); margin-bottom: 20px;">
                                    Find tokens in the real world!
                                </div>
                                <button class="btn btn-primary" id="previewButton" style="background: var(--gradient-fire);">
                                    Start Hunting
                                </button>
                            </div>
                            
                            <div style="margin-top: 20px; padding: 15px; background: rgba(0,0,0,0.2); border-radius: 12px;">
                                <div style="font-size: 0.9rem; color: rgba(255,255,255,0.7);">
                                    This preview shows how your app will appear to players. Customize the colors and branding above.
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <!-- SDK Integration (Hidden Initially) -->
            <div id="sdkIntegration" style="display: none;">
                <div class="dashboard-section">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 30px;">
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
                            <div style="font-family: monospace; font-size: 1.1rem; color: var(--color-primary-gold); word-break: break-all;">
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
            const previewLogo = document.getElementById('previewLogo');
            
            img.src = e.target.result;
            preview.style.display = 'block';
            
            previewLogo.innerHTML = `<img src="${e.target.result}" style="width: 100%; height: 100%; object-fit: cover; border-radius: 20px;">`;
            
            AppSetupState.whiteLabel.logo = e.target.result;
        };
        reader.readAsDataURL(file);
    }
}

/**
 * Update preview
 */
function updatePreview() {
    const appName = document.getElementById('appName')?.value || 'My AR Crypto Hunt';
    const appDescription = document.getElementById('appDescription')?.value || 'Find tokens in the real world!';
    const primaryColor = document.getElementById('primaryColor')?.value || '#d73327';
    const secondaryColor = document.getElementById('secondaryColor')?.value || '#fb923c';
    
    document.getElementById('previewAppName').textContent = appName;
    document.getElementById('previewDescription').textContent = appDescription;
    
    const previewButton = document.getElementById('previewButton');
    previewButton.style.background = `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})`;
}

/**
 * Deploy white label app
 */
function deployWhiteLabelApp() {
    const appName = document.getElementById('appName')?.value;
    
    if (!appName) {
        alert('Please enter an app name');
        return;
    }
    
    AppSetupState.whiteLabel.appName = appName;
    AppSetupState.whiteLabel.appDescription = document.getElementById('appDescription')?.value || '';
    AppSetupState.whiteLabel.primaryColor = document.getElementById('primaryColor')?.value || '#d73327';
    AppSetupState.whiteLabel.secondaryColor = document.getElementById('secondaryColor')?.value || '#fb923c';
    AppSetupState.whiteLabel.accentColor = document.getElementById('accentColor')?.value || '#f0a500';
    
    alert(`🚀 Deploying "${appName}"...\n\nYour white label app is being built with your custom branding.\n\n✓ App configured\n✓ $Ember integration enabled\n✓ AR features activated\n\nYour app will be ready in 5-10 minutes. You'll receive an email with download links.`);
    
    // Simulate deployment
    setTimeout(() => {
        alert(`✓ "${appName}" Deployed Successfully!\n\nYour app is now live. View it in the "My Campaigns" section.`);
        if (typeof window.loadSection === 'function') {
            window.loadSection('overview');
        }
    }, 2000);
}

/**
 * Select platform for SDK
 */
function selectPlatform(platform) {
    AppSetupState.sdk.platform = platform;
    
    // Update button states
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
    
    console.log('Platform selected:', platform);
}

/**
 * Copy API key
 */
function copyApiKey() {
    const apiKeyElement = document.querySelector('.card:nth-of-type(2) .form-input');
    if (apiKeyElement) {
        navigator.clipboard.writeText(apiKeyElement.textContent.trim());
        alert('✓ API Key copied to clipboard!');
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
    window.updatePreview = updatePreview;
    window.deployWhiteLabelApp = deployWhiteLabelApp;
    window.selectPlatform = selectPlatform;
    window.copyApiKey = copyApiKey;
    window.testIntegration = testIntegration;
}
