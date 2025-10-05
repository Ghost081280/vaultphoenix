/* ============================================
   VAULT PHOENIX MANAGEMENT SYSTEM
   App Setup - White Label Builder (COMPLETE FILE)
   ============================================ */

const AppSetupState = {
    setupType: null,
    whiteLabel: {
        appName: '$Ember Hunt',
        logo: null,
        primaryColor: '#f0a500',
        secondaryColor: '#fb923c',
        accentColor: '#d73327',
        backgroundColor: '#1a1a1a',
        buttonStyle: 'gradient',
        borderRadius: '12px',
        appDescription: 'Discover crypto rewards in the real world!'
    },
    sdk: {
        platform: null,
        apiKey: 'vp_live_' + Math.random().toString(36).substring(2, 15)
    },
    playerAppTemplate: 'https://ghost081280.github.io/vaultphoenix/crypto-game/dashboard.html'
};

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
                            Launch a fully branded mobile app in minutes. Customize colors, upload your logo, and deploy with real-time preview.
                        </p>
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
                            Integrate Vault Phoenix into your existing app with our developer SDK.
                        </p>
                        <button class="btn btn-secondary btn-large" onclick="event.stopPropagation(); selectSetupType('sdk')">
                            Integrate SDK
                        </button>
                    </div>
                </div>
            </div>
            
            <!-- White Label Builder -->
            <div id="whiteLabelBuilder" style="display: none;">
                <div class="dashboard-section">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 30px;">
                        <h3 style="font-size: 1.8rem; color: var(--color-primary-gold);">🎨 White Label App Builder</h3>
                        <button class="btn btn-outline" onclick="backToSetupSelection()">← Back</button>
                    </div>
                    
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 30px;">
                        <!-- App Configuration -->
                        <div class="card" style="height: 850px; display: flex; flex-direction: column;">
                            <h4 style="margin-bottom: 20px; color: var(--color-primary-orange);">⚙️ App Configuration</h4>
                            
                            <div style="flex: 1; overflow-y: auto; padding-right: 15px;">
                                <!-- App Identity -->
                                <div style="margin-bottom: 25px; padding-bottom: 20px; border-bottom: 1px solid rgba(255,255,255,0.1);">
                                    <h5 style="color: var(--color-primary-gold); margin-bottom: 15px;">📱 App Identity</h5>
                                    
                                    <div class="form-group">
                                        <label class="form-label">App Name</label>
                                        <input type="text" class="form-input" id="appName" value="$Ember Hunt" oninput="updateLivePreview()">
                                        <small style="color: rgba(255,255,255,0.5);">Shown in navigation bar</small>
                                    </div>
                                    
                                    <div class="form-group">
                                        <label class="form-label">App Tagline</label>
                                        <textarea class="form-input" id="appDescription" rows="2" oninput="updateLivePreview()">Discover crypto rewards in the real world!</textarea>
                                        <small style="color: rgba(255,255,255,0.5);">Login screen description</small>
                                    </div>
                                    
                                    <div class="form-group">
                                        <label class="form-label">App Logo (1024x1024px)</label>
                                        <input type="file" class="form-input" id="appLogo" accept="image/*" onchange="previewLogo(event)">
                                        <div id="logoPreview" style="margin-top: 10px; display: none;">
                                            <img id="logoPreviewImg" style="width: 60px; height: 60px; border-radius: 8px; border: 2px solid var(--color-primary-gold);">
                                        </div>
                                        <small style="color: rgba(255,255,255,0.5);">Updates navigation logo</small>
                                    </div>
                                </div>
                                
                                <!-- Token System -->
                                <div style="margin-bottom: 25px; padding-bottom: 20px; border-bottom: 1px solid rgba(255,255,255,0.1);">
                                    <h5 style="color: var(--color-primary-gold); margin-bottom: 15px;">💎 Token System</h5>
                                    <div style="background: rgba(240,165,0,0.1); border: 2px solid rgba(240,165,0,0.3); border-radius: 12px; padding: 20px;">
                                        <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 12px;">
                                            <img src="../images/VPEmberCoin.PNG" style="width: 40px; height: 40px; border-radius: 50%;" onerror="this.textContent='💎'">
                                            <div>
                                                <div style="font-weight: 700; color: var(--color-primary-gold);">$Ember Tokens</div>
                                                <div style="font-size: 0.85rem; color: rgba(255,255,255,0.6);">Official Currency</div>
                                            </div>
                                        </div>
                                        <div style="font-size: 0.85rem; color: rgba(255,255,255,0.6);">
                                            ✓ Integrated with all campaigns<br>
                                            ✓ Coinbase Wallet compatible<br>
                                            ✓ Blockchain verified
                                        </div>
                                    </div>
                                </div>
                                
                                <!-- Brand Colors -->
                                <div style="margin-bottom: 25px; padding-bottom: 20px; border-bottom: 1px solid rgba(255,255,255,0.1);">
                                    <h5 style="color: var(--color-primary-gold); margin-bottom: 15px;">🎨 Brand Colors</h5>
                                    
                                    <div class="form-group">
                                        <label class="form-label">Primary Color</label>
                                        <div style="display: flex; gap: 10px;">
                                            <input type="color" id="primaryColor" value="#f0a500" onchange="updateLivePreview()" style="width: 60px; height: 45px; border: none; border-radius: 8px; cursor: pointer;">
                                            <input type="text" class="form-input" id="primaryColorHex" value="#f0a500" oninput="syncColorInput('primary', this.value)" style="flex: 1; font-family: monospace;">
                                        </div>
                                        <small style="color: rgba(255,255,255,0.5);">Buttons, highlights, badges</small>
                                    </div>
                                    
                                    <div class="form-group">
                                        <label class="form-label">Secondary Color</label>
                                        <div style="display: flex; gap: 10px;">
                                            <input type="color" id="secondaryColor" value="#fb923c" onchange="updateLivePreview()" style="width: 60px; height: 45px; border: none; border-radius: 8px; cursor: pointer;">
                                            <input type="text" class="form-input" id="secondaryColorHex" value="#fb923c" oninput="syncColorInput('secondary', this.value)" style="flex: 1; font-family: monospace;">
                                        </div>
                                        <small style="color: rgba(255,255,255,0.5);">Gradients, accents</small>
                                    </div>
                                    
                                    <div class="form-group">
                                        <label class="form-label">Background Color</label>
                                        <div style="display: flex; gap: 10px;">
                                            <input type="color" id="backgroundColor" value="#1a1a1a" onchange="updateLivePreview()" style="width: 60px; height: 45px; border: none; border-radius: 8px; cursor: pointer;">
                                            <input type="text" class="form-input" id="backgroundColorHex" value="#1a1a1a" oninput="syncColorInput('background', this.value)" style="flex: 1; font-family: monospace;">
                                        </div>
                                        <small style="color: rgba(255,255,255,0.5);">App background theme</small>
                                    </div>
                                </div>
                                
                                <!-- UI Style -->
                                <div style="margin-bottom: 25px;">
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
                                        <label class="form-label">Corner Roundness</label>
                                        <select class="form-input" id="borderRadius" onchange="updateLivePreview()">
                                            <option value="4px">Sharp</option>
                                            <option value="8px">Subtle</option>
                                            <option value="12px" selected>Standard</option>
                                            <option value="16px">Rounded</option>
                                            <option value="24px">Very Rounded</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            
                            <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid rgba(255,255,255,0.1);">
                                <button class="btn btn-primary btn-large" onclick="deployWhiteLabelApp()" style="width: 100%;">
                                    🚀 Deploy White Label App
                                </button>
                            </div>
                        </div>
                        
                        <!-- Live Preview -->
                        <div class="card" style="height: 850px; display: flex; flex-direction: column;">
                            <h4 style="margin-bottom: 20px; color: var(--color-primary-orange);">📱 Live Preview</h4>
                            
                            <div style="flex: 1; display: flex; flex-direction: column; align-items: center; overflow-y: auto;">
                                <!-- Phone Frame -->
                                <div style="width: 320px; position: relative; margin-bottom: 20px;">
                                    <div style="border: 12px solid #1a1a1a; border-radius: 40px; box-shadow: 0 20px 60px rgba(0,0,0,0.6); background: #000; overflow: hidden; position: relative;">
                                        <!-- Notch -->
                                        <div style="position: absolute; top: 0; left: 50%; transform: translateX(-50%); width: 100px; height: 24px; background: #1a1a1a; border-radius: 0 0 16px 16px; z-index: 10;"></div>
                                        
                                        <!-- Live iFrame -->
                                        <iframe 
                                            id="gamePreviewFrame" 
                                            src="https://ghost081280.github.io/vaultphoenix/crypto-game/dashboard.html"
                                            style="width: 100%; height: 580px; border: none; border-radius: 26px; background: #000; display: block;"
                                            allow="geolocation; camera"
                                            sandbox="allow-scripts allow-same-origin"
                                        ></iframe>
                                        
                                        <!-- Home Bar -->
                                        <div style="position: absolute; bottom: 6px; left: 50%; transform: translateX(-50%); width: 110px; height: 4px; background: rgba(255,255,255,0.3); border-radius: 2px; z-index: 10;"></div>
                                    </div>
                                    
                                    <div style="text-align: center; margin-top: 15px;">
                                        <button class="btn btn-secondary" onclick="refreshPreview()">🔄 Refresh</button>
                                    </div>
                                </div>
                                
                                <!-- Status -->
                                <div style="width: 100%; max-width: 320px; padding: 15px; background: rgba(76,175,80,0.1); border: 1px solid rgba(76,175,80,0.3); border-radius: 12px; margin-bottom: 15px;">
                                    <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 8px;">
                                        <div style="width: 8px; height: 8px; background: #22c55e; border-radius: 50%; animation: pulse 2s infinite;"></div>
                                        <div style="font-weight: 700; color: #22c55e;">Live Preview</div>
                                    </div>
                                    <div style="font-size: 0.85rem; color: rgba(255,255,255,0.7);">
                                        Changes apply instantly to the app above
                                    </div>
                                </div>
                                
                                <!-- Domain -->
                                <div style="width: 100%; max-width: 320px; padding: 15px; background: rgba(240,165,0,0.1); border: 1px solid rgba(240,165,0,0.3); border-radius: 12px;">
                                    <h5 style="color: var(--color-primary-gold); margin-bottom: 10px; font-size: 0.95rem;">🌐 Domain</h5>
                                    <input type="text" class="form-input" id="customDomain" placeholder="hunt.yourdomain.com" oninput="updateCustomDomain()" style="font-size: 0.9rem;">
                                    <div id="domainInstructions" style="margin-top: 10px; font-size: 0.8rem; color: rgba(255,255,255,0.6); display: none;">
                                        Your app: <span id="finalUrl" style="color: var(--color-primary-gold); font-weight: 700;"></span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <!-- SDK Integration -->
            <div id="sdkIntegration" style="display: none;">
                <div class="dashboard-section">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 30px;">
                        <h3 style="font-size: 1.8rem; color: var(--color-primary-gold);">🔌 SDK Integration</h3>
                        <button class="btn btn-outline" onclick="backToSetupSelection()">← Back</button>
                    </div>
                    
                    <div class="card" style="margin-bottom: 30px;">
                        <h4 style="margin-bottom: 20px;">Select Platform</h4>
                        <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 15px;">
                            <button class="btn btn-outline" onclick="selectPlatform('ios')" id="platform-ios">📱 iOS</button>
                            <button class="btn btn-outline" onclick="selectPlatform('android')" id="platform-android">🤖 Android</button>
                            <button class="btn btn-outline" onclick="selectPlatform('web')" id="platform-web">🌐 Web</button>
                            <button class="btn btn-outline" onclick="selectPlatform('unity')" id="platform-unity">🎮 Unity</button>
                        </div>
                    </div>
                    
                    <div class="card">
                        <h4 style="margin-bottom: 20px;">API Key</h4>
                        <div style="background: rgba(0,0,0,0.3); border-radius: 12px; padding: 20px; margin-bottom: 15px;">
                            <div id="apiKeyDisplay" style="font-family: monospace; font-size: 1.1rem; color: var(--color-primary-gold); word-break: break-all;">
                                ${AppSetupState.sdk.apiKey}
                            </div>
                        </div>
                        <button class="btn btn-secondary" onclick="copyApiKey()">📋 Copy API Key</button>
                    </div>
                </div>
            </div>
        </div>
        
        <style>
            @keyframes pulse {
                0%, 100% { opacity: 1; }
                50% { opacity: 0.5; }
            }
            
            .card > div::-webkit-scrollbar { width: 6px; }
            .card > div::-webkit-scrollbar-track { background: rgba(255,255,255,0.05); border-radius: 3px; }
            .card > div::-webkit-scrollbar-thumb { background: rgba(240,165,0,0.3); border-radius: 3px; }
        </style>
    `;
}

function selectSetupType(type) {
    AppSetupState.setupType = type;
    document.getElementById('setupTypeSelection').style.display = 'none';
    
    if (type === 'white-label') {
        document.getElementById('whiteLabelBuilder').style.display = 'block';
        setTimeout(() => updateLivePreview(), 200);
    } else {
        document.getElementById('sdkIntegration').style.display = 'block';
    }
}

function backToSetupSelection() {
    document.getElementById('setupTypeSelection').style.display = 'grid';
    document.getElementById('whiteLabelBuilder').style.display = 'none';
    document.getElementById('sdkIntegration').style.display = 'none';
}

function previewLogo(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            document.getElementById('logoPreview').style.display = 'block';
            document.getElementById('logoPreviewImg').src = e.target.result;
            AppSetupState.whiteLabel.logo = e.target.result;
            updateLivePreview();
        };
        reader.readAsDataURL(file);
    }
}

function syncColorInput(type, value) {
    if (value.match(/^#[0-9A-F]{6}$/i)) {
        document.getElementById(`${type}Color`).value = value;
        document.getElementById(`${type}ColorHex`).value = value;
        updateLivePreview();
    }
}

function updateLivePreview() {
    const iframe = document.getElementById('gamePreviewFrame');
    if (!iframe || !iframe.contentWindow) return;
    
    try {
        const appName = document.getElementById('appName')?.value || '$Ember Hunt';
        const primaryColor = document.getElementById('primaryColor')?.value || '#f0a500';
        const secondaryColor = document.getElementById('secondaryColor')?.value || '#fb923c';
        const backgroundColor = document.getElementById('backgroundColor')?.value || '#1a1a1a';
        const buttonStyle = document.getElementById('buttonStyle')?.value || 'gradient';
        const borderRadius = document.getElementById('borderRadius')?.value || '12px';
        
        const css = `
            <style id="whiteLabelCSS">
                body, .crypto-dashboard-page {
                    background: linear-gradient(135deg, ${backgroundColor} 0%, ${shadeColor(backgroundColor, -10)} 50%, ${primaryColor}20 100%) !important;
                }
                .nav-logo, .ember-count, .map-control-btn, .token-coin, .ar-token-coin {
                    background: linear-gradient(135deg, ${primaryColor}, ${secondaryColor}) !important;
                    border-color: ${primaryColor} !important;
                }
                ${buttonStyle === 'gradient' ? `
                    .airdrop-button, .login-button, .vault-action-btn { background: linear-gradient(135deg, ${primaryColor}, ${secondaryColor}) !important; }
                ` : buttonStyle === 'solid' ? `
                    .airdrop-button, .login-button, .vault-action-btn { background: ${primaryColor} !important; }
                ` : `
                    .airdrop-button, .login-button, .vault-action-btn { background: transparent !important; border: 2px solid ${primaryColor} !important; color: ${primaryColor} !important; }
                `}
                * { border-radius: ${borderRadius} !important; }
                .ember-count-text, .airdrop-amount { color: ${primaryColor} !important; }
            </style>
        `;
        
        const doc = iframe.contentDocument || iframe.contentWindow.document;
        const old = doc.getElementById('whiteLabelCSS');
        if (old) old.remove();
        doc.head.insertAdjacentHTML('beforeend', css);
        
        const navTitle = doc.querySelector('.nav-title');
        if (navTitle) navTitle.textContent = appName;
        
        if (AppSetupState.whiteLabel.logo) {
            const logo = doc.querySelector('.nav-logo-image');
            if (logo) logo.src = AppSetupState.whiteLabel.logo;
        }
    } catch (e) {
        console.log('Preview:', e.message);
    }
}

function shadeColor(color, percent) {
    const num = parseInt(color.replace("#",""), 16);
    const amt = Math.round(2.55 * percent);
    const R = Math.min(255, Math.max(0, (num >> 16) + amt));
    const G = Math.min(255, Math.max(0, ((num >> 8) & 0x00FF) + amt));
    const B = Math.min(255, Math.max(0, (num & 0x0000FF) + amt));
    return "#" + (0x1000000 + R*0x10000 + G*0x100 + B).toString(16).slice(1);
}

function refreshPreview() {
    const iframe = document.getElementById('gamePreviewFrame');
    if (iframe) {
        iframe.src = iframe.src;
        setTimeout(() => updateLivePreview(), 500);
    }
}

function updateCustomDomain() {
    const domain = document.getElementById('customDomain')?.value;
    const instructions = document.getElementById('domainInstructions');
    const url = document.getElementById('finalUrl');
    
    if (domain && instructions && url) {
        instructions.style.display = 'block';
        url.textContent = `https://${domain}`;
    } else if (instructions) {
        instructions.style.display = 'none';
    }
}

function deployWhiteLabelApp() {
    const appName = document.getElementById('appName')?.value;
    if (!appName) return alert('Please enter an app name');
    
    alert(`🚀 Deploying "${appName}"...\n\n✓ Custom branding applied\n✓ $Ember tokens integrated\n✓ AR features enabled\n\nYour app will be ready in 5-10 minutes!`);
    
    setTimeout(() => {
        alert(`✅ "${appName}" deployed successfully!\n\nView it in Campaign Control.`);
        if (window.loadSection) window.loadSection('campaigns');
    }, 2000);
}

function selectPlatform(platform) {
    ['ios', 'android', 'web', 'unity'].forEach(p => {
        const btn = document.getElementById(`platform-${p}`);
        if (btn) {
            btn.className = p === platform ? 'btn btn-primary' : 'btn btn-outline';
        }
    });
}

function copyApiKey() {
    const key = document.getElementById('apiKeyDisplay')?.textContent;
    if (key) {
        navigator.clipboard.writeText(key).then(() => alert('✓ API Key copied!'));
    }
}

window.getAppSetupContent = getAppSetupContent;
window.selectSetupType = selectSetupType;
window.backToSetupSelection = backToSetupSelection;
window.previewLogo = previewLogo;
window.syncColorInput = syncColorInput;
window.updateLivePreview = updateLivePreview;
window.refreshPreview = refreshPreview;
window.deployWhiteLabelApp = deployWhiteLabelApp;
window.updateCustomDomain = updateCustomDomain;
window.selectPlatform = selectPlatform;
window.copyApiKey = copyApiKey;
