function getMapContent(role) {
    if (role !== 'advertiser') {
        return getPlaceholderContent('map');
    }
    
    return `
        <div class="dashboard-section">
            <h2 class="section-title">🗺️ Location Map</h2>
            <p style="color: rgba(255,255,255,0.8); margin-bottom: 25px;">
                View all your active locations with Ember token availability on an interactive map
            </p>
            
            <!-- Map Container -->
            <div class="card" style="margin-bottom: 30px;">
                <!-- Google Maps Integration -->
                <div id="advertiserMap" style="height: 500px; background: #1a1a1a; border-radius: 12px; position: relative; overflow: hidden;">
                    <!-- Map will load here -->
                </div>
                
                <!-- Map Controls -->
                <div style="margin-top: 20px; display: flex; gap: 10px; flex-wrap: wrap;">
                    <button class="btn btn-outline" onclick="zoomIn()">🔍 Zoom In</button>
                    <button class="btn btn-outline" onclick="zoomOut()">🔍 Zoom Out</button>
                    <button class="btn btn-outline" onclick="centerMap()">📍 Center View</button>
                    <button class="btn btn-secondary" onclick="toggleFullscreen()">⛶ Fullscreen</button>
                    <button class="btn btn-primary" onclick="loadSection('locations')">➕ Add Location</button>
                </div>
                
                <!-- Map Legend -->
                <div style="margin-top: 20px; padding: 15px; background: rgba(0,0,0,0.3); border-radius: 12px;">
                    <h4 style="margin-bottom: 10px;">Map Legend</h4>
                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 10px;">
                        <div style="display: flex; align-items: center; gap: 10px;">
                            <span style="font-size: 1.5rem;">💰</span>
                            <span>Your Ember Token Locations</span>
                        </div>
                        <div style="display: flex; align-items: center; gap: 10px;">
                            <span style="width: 12px; height: 12px; background: #22c55e; border-radius: 50%; display: inline-block;"></span>
                            <span>Active & Funded</span>
                        </div>
                        <div style="display: flex; align-items: center; gap: 10px;">
                            <span style="width: 12px; height: 12px; background: #ef4444; border-radius: 50%; display: inline-block;"></span>
                            <span>Low on Tokens</span>
                        </div>
                    </div>
                </div>
            </div>
            
            <!-- Location List -->
            <div class="card">
                <h3 style="margin-bottom: 20px;">📍 Your Locations (${AdvertiserData.myLocations.length})</h3>
                
                ${AdvertiserData.myLocations.map(loc => `
                    <div style="padding: 20px; background: rgba(0,0,0,0.3); border-radius: 12px; margin-bottom: 15px;">
                        <div style="display: flex; justify-content: space-between; align-items: start; flex-wrap: wrap; gap: 15px;">
                            <div>
                                <h4 style="color: var(--color-primary-gold); margin-bottom: 8px;">${loc.name}</h4>
                                <div style="color: rgba(255,255,255,0.7); margin-bottom: 10px;">${loc.address}</div>
                                <div style="font-family: monospace; color: rgba(255,255,255,0.5); font-size: 0.85rem;">
                                    ${loc.lat}, ${loc.lng}
                                </div>
                            </div>
                            <div style="text-align: right;">
                                <div style="font-size: 1.5rem; font-weight: 900; color: var(--color-primary-gold); margin-bottom: 5px;">
                                    ${loc.tokensRemaining.toLocaleString()}
                                </div>
                                <div style="color: rgba(255,255,255,0.6); font-size: 0.9rem;">Tokens Remaining</div>
                            </div>
                        </div>
                        
                        <div style="margin-top: 15px; display: flex; gap: 10px; flex-wrap: wrap;">
                            <button class="btn btn-small btn-outline" onclick="centerMapOnLocation(${loc.lat}, ${loc.lng})">View on Map</button>
                            <button class="btn btn-small btn-secondary" onclick="loadSection('analytics')">Analytics</button>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
        
        <!-- Google Maps API Integration Script -->
        <script>
            let advertiserMapInstance;
            let mapMarkers = [];
            
            // Initialize Google Map
            function initAdvertiserMap() {
                const mapElement = document.getElementById('advertiserMap');
                if (!mapElement) return;
                
                // Check if Google Maps API is loaded
                if (typeof google === 'undefined') {
                    mapElement.innerHTML = \`
                        <div style="height: 100%; display: flex; align-items: center; justify-content: center; flex-direction: column; padding: 40px; text-align: center;">
                            <div style="font-size: 3rem; margin-bottom: 20px;">🗺️</div>
                            <h3 style="color: var(--color-primary-gold); margin-bottom: 15px;">Google Maps API Required</h3>
                            <p style="color: rgba(255,255,255,0.7); max-width: 500px; margin-bottom: 20px;">
                                To display the interactive map, please add your Google Maps API key to enable full functionality.
                            </p>
                            <button class="btn btn-primary" onclick="alert('Add your Google Maps API key in the HTML head:\\n\\n<script src=\\\\"https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&callback=initAdvertiserMap\\\\"><\\\\/script>')">
                                Configure API Key
                            </button>
                            <div style="margin-top: 20px; padding: 15px; background: rgba(240,165,0,0.1); border: 1px solid rgba(240,165,0,0.3); border-radius: 12px;">
                                <strong>Demo Mode:</strong> Showing location coordinates below. Full map will display once API is configured.
                            </div>
                        </div>
                    \`;
                    return;
                }
                
                // Initialize map centered on Phoenix
                advertiserMapInstance = new google.maps.Map(mapElement, {
                    center: { lat: 33.4484, lng: -112.0740 },
                    zoom: 13,
                    styles: [
                        { elementType: "geometry", stylers: [{ color: "#1a1a1a" }] },
                        { elementType: "labels.text.stroke", stylers: [{ color: "#1a1a1a" }] },
                        { elementType: "labels.text.fill", stylers: [{ color: "#746855" }] },
                        {
                            featureType: "administrative.locality",
                            elementType: "labels.text.fill",
                            stylers: [{ color: "#d59563" }],
                        },
                        {
                            featureType: "poi",
                            elementType: "labels.text.fill",
                            stylers: [{ color: "#d59563" }],
                        },
                        {
                            featureType: "road",
                            elementType: "geometry",
                            stylers: [{ color: "#38414e" }],
                        },
                        {
                            featureType: "road",
                            elementType: "geometry.stroke",
                            stylers: [{ color: "#212a37" }],
                        },
                        {
                            featureType: "road",
                            elementType: "labels.text.fill",
                            stylers: [{ color: "#9ca5b3" }],
                        },
                        {
                            featureType: "water",
                            elementType: "geometry",
                            stylers: [{ color: "#0f0f0f" }],
                        },
                    ],
                });
                
                // Add markers for each location
                const locations = ${JSON.stringify(AdvertiserData.myLocations)};
                
                locations.forEach(location => {
                    const marker = new google.maps.Marker({
                        position: { lat: location.lat, lng: location.lng },
                        map: advertiserMapInstance,
                        title: location.name,
                        icon: {
                            url: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40"><text x="20" y="30" font-size="30" text-anchor="middle">💰</text></svg>',
                            scaledSize: new google.maps.Size(40, 40)
                        }
                    });
                    
                    // Info window for marker
                    const infoWindow = new google.maps.InfoWindow({
                        content: \`
                            <div style="color: #000; padding: 10px;">
                                <h4 style="margin: 0 0 10px 0; color: #d73327;">\${location.name}</h4>
                                <p style="margin: 5px 0;"><strong>Address:</strong> \${location.address}</p>
                                <p style="margin: 5px 0;"><strong>Status:</strong> \${location.status}</p>
                                <p style="margin: 5px 0;"><strong>Tokens:</strong> \${location.tokensRemaining.toLocaleString()} remaining</p>
                                <p style="margin: 5px 0;"><strong>Campaign:</strong> \${location.campaign}</p>
                            </div>
                        \`
                    });
                    
                    marker.addListener('click', () => {
                        infoWindow.open(advertiserMapInstance, marker);
                    });
                    
                    mapMarkers.push(marker);
                });
            }
            
            // Map control functions
            function zoomIn() {
                if (advertiserMapInstance) {
                    advertiserMapInstance.setZoom(advertiserMapInstance.getZoom() + 1);
                }
            }
            
            function zoomOut() {
                if (advertiserMapInstance) {
                    advertiserMapInstance.setZoom(advertiserMapInstance.getZoom() - 1);
                }
            }
            
            function centerMap() {
                if (advertiserMapInstance) {
                    advertiserMapInstance.setCenter({ lat: 33.4484, lng: -112.0740 });
                    advertiserMapInstance.setZoom(13);
                }
            }
            
            function centerMapOnLocation(lat, lng) {
                if (advertiserMapInstance) {
                    advertiserMapInstance.setCenter({ lat: lat, lng: lng });
                    advertiserMapInstance.setZoom(16);
                } else {
                    alert('Map not initialized. Please configure Google Maps API key.');
                }
            }
            
            function toggleFullscreen() {
                const mapElement = document.getElementById('advertiserMap');
                if (!document.fullscreenElement) {
                    mapElement.requestFullscreen().catch(err => {
                        alert('Fullscreen not supported');
                    });
                } else {
                    document.exitFullscreen();
                }
            }
            
            // Initialize map when section loads
            setTimeout(initAdvertiserMap, 500);
        </script>
    `;
}
