/* ============================================
   VAULT PHOENIX MANAGEMENT SYSTEM
   Coinbase Wallet Integration & Funding
   ============================================ */

// ============================================
// WALLET STATE
// ============================================

const WalletState = {
    connected: false,
    address: null,
    balance: {
        ember: 0,
        usd: 0,
        eth: 0
    },
    transactions: [],
    network: 'mainnet'
};

/**
 * Get Wallet Content
 */
function getWalletContent(role) {
    if (role !== 'campaign-manager') {
        return getPlaceholderContent('wallet');
    }
    
    const isConnected = WalletState.connected || sessionStorage.getItem('walletAddress');
    
    return `
        <div class="dashboard-section">
            <h2 class="section-title">👛 Coinbase Wallet & Funding</h2>
            <p style="color: rgba(255,255,255,0.8); font-size: 1.1rem; margin-bottom: 30px;">
                Connect your Coinbase wallet to purchase $Ember tokens and fund your campaigns.
            </p>
            
            ${!isConnected ? `
                <!-- Wallet Connection -->
                <div class="card" style="text-align: center; padding: 60px 40px;">
                    <div style="font-size: 5rem; margin-bottom: 20px;">👛</div>
                    <h3 style="color: var(--color-primary-gold); margin-bottom: 20px; font-size: 2rem;">
                        Connect Your Coinbase Wallet
                    </h3>
                    <p style="color: rgba(255,255,255,0.7); font-size: 1.1rem; max-width: 600px; margin: 0 auto 30px;">
                        Link your Coinbase wallet to purchase $Ember tokens at the current market price and 
                        manage all your campaign funding in one place.
                    </p>
                    
                    <div style="background: rgba(240,165,0,0.1); border: 1px solid rgba(240,165,0,0.3); border-radius: 12px; padding: 20px; margin: 30px auto; max-width: 500px;">
                        <h4 style="color: var(--color-primary-gold); margin-bottom: 15px;">Why Coinbase Wallet?</h4>
                        <ul style="text-align: left; list-style: none; padding: 0; margin: 0;">
                            <li style="padding: 8px 0;">✓ Secure & trusted by millions</li>
                            <li style="padding: 8px 0;">✓ Easy $Ember token purchases</li>
                            <li style="padding: 8px 0;">✓ Real-time balance updates</li>
                            <li style="padding: 8px 0;">✓ Transaction history tracking</li>
                            <li style="padding: 8px 0;">✓ Same wallet as your players use</li>
                        </ul>
                    </div>
                    
                    <button class="btn btn-primary btn-large" onclick="connectCoinbaseWallet()" style="font-size: 1.3rem; padding: 20px 50px;">
                        <span style="font-size: 1.5rem; margin-right: 10px;">💳</span>
                        Connect Coinbase Wallet
                    </button>
                    
                    <div style="margin-top: 25px;">
                        <a href="https://www.coinbase.com/wallet" target="_blank" style="color: var(--color-primary-orange); text-decoration: none; font-size: 0.95rem;">
                            Don't have a Coinbase wallet? Create one here →
                        </a>
                    </div>
                </div>
            ` : `
                <!-- Connected Wallet Dashboard -->
                <div class="revenue-grid">
                    <!-- Wallet Info -->
                    <div class="card">
                        <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 20px;">
                            <div>
                                <h3 style="color: var(--color-primary-gold); margin-bottom: 10px;">
                                    Wallet Connected
                                </h3>
                                <div style="font-family: monospace; color: rgba(255,255,255,0.7); font-size: 0.9rem; word-break: break-all;">
                                    ${WalletState.address || sessionStorage.getItem('walletAddress') || '0x742d...9C4A'}
                                </div>
                            </div>
                            <span class="badge badge-success">
                                <span class="status-indicator status-live"></span>
                                CONNECTED
                            </span>
                        </div>
                        
                        <div style="padding: 20px; background: rgba(0,0,0,0.3); border-radius: 12px; margin-bottom: 20px;">
                            <div style="font-size: 0.9rem; color: rgba(255,255,255,0.6); margin-bottom: 8px;">
                                $Ember Balance
                            </div>
                            <div style="font-size: 2.5rem; font-weight: 900; color: var(--color-primary-gold); margin-bottom: 5px;">
                                ${(window.AppState?.tokenBalance?.amount || 28450).toLocaleString()}
                            </div>
                            <div style="color: rgba(255,255,255,0.6); font-size: 0.95rem;">
                                ≈ $${((window.AppState?.tokenBalance?.amount || 28450) * 0.0035).toFixed(2)} USD
                            </div>
                        </div>
                        
                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-bottom: 20px;">
                            <div style="padding: 15px; background: rgba(0,0,0,0.2); border-radius: 8px; text-align: center;">
                                <div style="font-size: 0.85rem; color: rgba(255,255,255,0.6); margin-bottom: 5px;">ETH</div>
                                <div style="font-size: 1.2rem; font-weight: 700;">0.025</div>
                            </div>
                            <div style="padding: 15px; background: rgba(0,0,0,0.2); border-radius: 8px; text-align: center;">
                                <div style="font-size: 0.85rem; color: rgba(255,255,255,0.6); margin-bottom: 5px;">USD</div>
                                <div style="font-size: 1.2rem; font-weight: 700;">$85.43</div>
                            </div>
                        </div>
                        
                        <button class="btn btn-outline" onclick="disconnectWallet()" style="width: 100%;">
                            Disconnect Wallet
                        </button>
                    </div>
                    
                    <!-- Quick Purchase -->
                    <div class="card">
                        <h3 style="color: var(--color-primary-gold); margin-bottom: 20px;">
                            💎 Purchase $Ember
                        </h3>
                        
                        <div style="background: rgba(240,165,0,0.1); border: 1px solid rgba(240,165,0,0.3); border-radius: 12px; padding: 15px; margin-bottom: 20px;">
                            <div style="display: flex; justify-content: space-between; align-items: center;">
                                <div>
                                    <div style="font-size: 0.85rem; color: rgba(255,255,255,0.6);">Market Price</div>
                                    <div style="font-size: 1.5rem; font-weight: 900; color: var(--color-primary-gold);">
                                        $0.0035
                                    </div>
                                </div>
                                <div style="text-align: right;">
                                    <div style="font-size: 0.85rem; color: rgba(255,255,255,0.6);">24h Change</div>
                                    <div style="font-size: 1.2rem; font-weight: 700; color: #22c55e;">
                                        +16.7%
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div class="form-group">
                            <label class="form-label">Amount (USD)</label>
                            <input type="number" class="form-input" id="purchaseAmount" value="100" min="10" step="10" onchange="updateTokenEstimate()">
                        </div>
                        
                        <div style="padding: 15px; background: rgba(0,0,0,0.3); border-radius: 8px; margin-bottom: 20px;">
                            <div style="display: flex; justify-content: space-between; padding: 8px 0;">
                                <span style="color: rgba(255,255,255,0.7);">You'll Receive:</span>
                                <span style="font-weight: 700; color: var(--color-primary-gold);" id="tokenEstimate">
                                    ${Math.floor(100 / 0.0035).toLocaleString()} $Ember
                                </span>
                            </div>
                            <div style="display: flex; justify-content: space-between; padding: 8px 0; border-top: 1px solid rgba(255,255,255,0.1);">
                                <span style="color: rgba(255,255,255,0.7);">Network Fee:</span>
                                <span style="font-weight: 700;">~$2.50</span>
                            </div>
                            <div style="display: flex; justify-content: space-between; padding: 8px 0; border-top: 1px solid rgba(255,255,255,0.1); font-size: 1.1rem; font-weight: 900;">
                                <span>Total:</span>
                                <span style="color: var(--color-primary-gold);">$102.50</span>
                            </div>
                        </div>
                        
                        <button class="btn btn-primary btn-large" onclick="purchaseEmber()" style="width: 100%; font-size: 1.1rem;">
                            💳 Purchase with Coinbase
                        </button>
                    </div>
                </div>
                
                <!-- Transaction History -->
                <div class="card" style="margin-top: 30px;">
                    <h3 style="color: var(--color-primary-gold); margin-bottom: 20px;">
                        📜 Recent Transactions
                    </h3>
                    
                    <div class="merchants-table-wrapper">
                        <table class="merchants-table">
                            <thead>
                                <tr>
                                    <th>Date</th>
                                    <th>Type</th>
                                    <th>Amount</th>
                                    <th>Status</th>
                                    <th>Tx Hash</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Oct 4, 2025 10:24 AM</td>
                                    <td>Purchase</td>
                                    <td>28,450 $Ember</td>
                                    <td><span class="badge badge-success">Confirmed</span></td>
                                    <td style="font-family: monospace; font-size: 0.85rem;">0x8f3a...d21c</td>
                                </tr>
                                <tr>
                                    <td>Oct 3, 2025 3:15 PM</td>
                                    <td>Distribution</td>
                                    <td>-5,000 $Ember</td>
                                    <td><span class="badge badge-success">Confirmed</span></td>
                                    <td style="font-family: monospace; font-size: 0.85rem;">0x2b7f...8a3e</td>
                                </tr>
                                <tr>
                                    <td>Oct 2, 2025 11:42 AM</td>
                                    <td>Airdrop</td>
                                    <td>-12,000 $Ember</td>
                                    <td><span class="badge badge-success">Confirmed</span></td>
                                    <td style="font-family: monospace; font-size: 0.85rem;">0x9c2d...4f1b</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                
                <!-- $Ember Info -->
                <div class="card" style="margin-top: 30px;">
                    <h3 style="color: var(--color-primary-gold); margin-bottom: 20px;">
                        💎 About $Ember Token
                    </h3>
                    
                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px; margin-bottom: 25px;">
                        <div style="padding: 20px; background: rgba(0,0,0,0.2); border-radius: 12px; text-align: center;">
                            <div style="font-size: 0.9rem; color: rgba(255,255,255,0.6); margin-bottom: 8px;">Market Cap</div>
                            <div style="font-size: 1.5rem; font-weight: 900; color: var(--color-primary-gold);">$43,575</div>
                        </div>
                        <div style="padding: 20px; background: rgba(0,0,0,0.2); border-radius: 12px; text-align: center;">
                            <div style="font-size: 0.9rem; color: rgba(255,255,255,0.6); margin-bottom: 8px;">Circulating Supply</div>
                            <div style="font-size: 1.5rem; font-weight: 900;">12.45M</div>
                        </div>
                        <div style="padding: 20px; background: rgba(0,0,0,0.2); border-radius: 12px; text-align: center;">
                            <div style="font-size: 0.9rem; color: rgba(255,255,255,0.6); margin-bottom: 8px;">Total Supply</div>
                            <div style="font-size: 1.5rem; font-weight: 900;">1B</div>
                        </div>
                        <div style="padding: 20px; background: rgba(0,0,0,0.2); border-radius: 12px; text-align: center;">
                            <div style="font-size: 0.9rem; color: rgba(255,255,255,0.6); margin-bottom: 8px;">Holders</div>
                            <div style="font-size: 1.5rem; font-weight: 900;">1,847</div>
                        </div>
                    </div>
                    
                    <div style="background: rgba(240,165,0,0.1); border: 1px solid rgba(240,165,0,0.3); border-radius: 12px; padding: 20px;">
                        <p style="margin: 0 0 15px 0; color: rgba(255,255,255,0.8); line-height: 1.6;">
                            $Ember is the native token powering Vault Phoenix's location-based AR gaming ecosystem. 
                            Players earn $Ember by visiting physical locations, and campaign managers use it to 
                            incentivize engagement and drive foot traffic.
                        </p>
                        <a href="https://ghost081280.github.io/vaultphoenix/ember.html" target="_blank" class="btn btn-secondary">
                            📚 Learn More About $Ember
                        </a>
                    </div>
                </div>
            `}
        </div>
    `;
}

/**
 * Connect Coinbase Wallet
 */
async function connectCoinbaseWallet() {
    try {
        // In production, this would use Coinbase Wallet SDK
        // For demo, simulate connection
        
        alert('🔄 Connecting to Coinbase Wallet...\n\nPlease approve the connection request in your Coinbase Wallet app.');
        
        // Simulate delay
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Generate demo address
        const demoAddress = '0x' + Math.random().toString(16).substr(2, 40);
        
        // Store connection
        WalletState.connected = true;
        WalletState.address = demoAddress;
        sessionStorage.setItem('walletAddress', demoAddress);
        sessionStorage.setItem('walletConnected', 'true');
        
        alert('✓ Wallet Connected!\n\nYour Coinbase wallet is now connected.\n\nAddress: ' + demoAddress.substring(0, 10) + '...' + demoAddress.substring(36));
        
        // Reload section
        if (typeof window.loadSection === 'function') {
            window.loadSection('wallet');
        }
        
    } catch (error) {
        alert('❌ Connection Failed\n\nCould not connect to Coinbase Wallet. Please make sure you have the Coinbase Wallet extension installed or the mobile app open.');
    }
}

/**
 * Disconnect wallet
 */
function disconnectWallet() {
    if (confirm('Disconnect your Coinbase wallet?')) {
        WalletState.connected = false;
        WalletState.address = null;
        sessionStorage.removeItem('walletAddress');
        sessionStorage.removeItem('walletConnected');
        
        alert('✓ Wallet Disconnected\n\nYour Coinbase wallet has been disconnected.');
        
        if (typeof window.loadSection === 'function') {
            window.loadSection('wallet');
        }
    }
}

/**
 * Update token estimate
 */
function updateTokenEstimate() {
    const amount = parseFloat(document.getElementById('purchaseAmount')?.value) || 100;
    const price = 0.0035;
    const tokens = Math.floor(amount / price);
    
    const estimateEl = document.getElementById('tokenEstimate');
    if (estimateEl) {
        estimateEl.textContent = tokens.toLocaleString() + ' $Ember';
    }
}

/**
 * Purchase $Ember tokens
 */
async function purchaseEmber() {
    const amount = parseFloat(document.getElementById('purchaseAmount')?.value) || 100;
    const price = 0.0035;
    const tokens = Math.floor(amount / price);
    const networkFee = 2.50;
    const total = amount + networkFee;
    
    if (amount < 10) {
        alert('Minimum purchase is $10 USD');
        return;
    }
    
    const confirmMsg = `Purchase $Ember Tokens?\n\n` +
        `Amount: $${amount} USD\n` +
        `Tokens: ${tokens.toLocaleString()} $Ember\n` +
        `Network Fee: $${networkFee}\n` +
        `Total: $${total.toFixed(2)}\n\n` +
        `This transaction will be processed through Coinbase.`;
    
    if (confirm(confirmMsg)) {
        alert('🔄 Processing Purchase...\n\nPlease confirm the transaction in your Coinbase Wallet.');
        
        // Simulate transaction
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Update balance
        if (window.AppState?.tokenBalance) {
            window.AppState.tokenBalance.amount += tokens;
            if (typeof window.updateTokenBalance === 'function') {
                window.updateTokenBalance();
            }
        }
        
        alert(`✓ Purchase Successful!\n\n` +
            `You received ${tokens.toLocaleString()} $Ember tokens.\n\n` +
            `Transaction hash: 0x${Math.random().toString(16).substr(2, 64)}\n\n` +
            `New balance: ${(window.AppState?.tokenBalance?.amount || tokens).toLocaleString()} $Ember`);
        
        // Reload section
        if (typeof window.loadSection === 'function') {
            window.loadSection('wallet');
        }
    }
}

// Export functions
if (typeof window !== 'undefined') {
    window.getWalletContent = getWalletContent;
    window.connectCoinbaseWallet = connectCoinbaseWallet;
    window.disconnectWallet = disconnectWallet;
    window.updateTokenEstimate = updateTokenEstimate;
    window.purchaseEmber = purchaseEmber;
}
