/* ============================================
   VAULT PHOENIX MANAGEMENT SYSTEM
   Role Selection Page JavaScript
   ============================================ */

/**
 * Select a role and navigate to the dashboard
 * @param {string} role - The selected role identifier
 */
function selectRole(role) {
    // Validate role
    const validRoles = ['platform-operator', 'sdk-customer', 'merchant', 'system-admin'];
    
    if (!validRoles.includes(role)) {
        console.error('Invalid role selected:', role);
        return;
    }
    
    // Store selected role in sessionStorage
    sessionStorage.setItem('selectedRole', role);
    
    // Add visual feedback
    const clickedCard = event.currentTarget;
    clickedCard.style.transform = 'scale(0.98)';
    clickedCard.style.opacity = '0.8';
    
    // Log selection for debugging
    console.log('Role selected:', role);
    
    // Navigate to dashboard after brief animation
    setTimeout(() => {
        window.location.href = 'dashboard.html';
    }, 200);
}

/**
 * Initialize page animations and interactions
 */
function initializePage() {
    // Stagger animation for role cards
    const cards = document.querySelectorAll('.role-card');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.animation = `fadeInUp 0.8s ease-out ${0.3 + (index * 0.1)}s forwards`;
    });
    
    // Add keyboard navigation support
    cards.forEach((card, index) => {
        card.setAttribute('tabindex', '0');
        card.setAttribute('role', 'button');
        card.setAttribute('aria-label', card.querySelector('.role-title').textContent);
        
        // Handle keyboard events
        card.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                card.click();
            }
        });
    });
    
    // Log page load
    console.log('Role selection page initialized');
    
    // Check if user was redirected from dashboard (role switching)
    const returnedFromDashboard = sessionStorage.getItem('returnedFromDashboard');
    if (returnedFromDashboard === 'true') {
        sessionStorage.removeItem('returnedFromDashboard');
        console.log('User returned from dashboard to select new role');
    }
}

/**
 * Check if user already has a role selected
 * Optionally auto-redirect to dashboard
 */
function checkExistingRole() {
    const existingRole = sessionStorage.getItem('selectedRole');
    
    if (existingRole) {
        console.log('Existing role found:', existingRole);
        // Could optionally auto-redirect here
        // For demo purposes, we'll let them re-select
    }
}

/**
 * Add hover effect enhancements
 */
function enhanceHoverEffects() {
    const cards = document.querySelectorAll('.role-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            // Add subtle scale on hover
            card.style.transition = 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
        });
        
        card.addEventListener('mouseleave', () => {
            // Reset any transformations
            card.style.transform = '';
        });
    });
}

/**
 * Handle logo error (fallback if image not found)
 */
function handleLogoError() {
    const logo = document.querySelector('.logo');
    
    if (logo) {
        logo.addEventListener('error', () => {
            console.warn('Logo image not found, hiding logo element');
            logo.style.display = 'none';
        });
    }
}

/**
 * Add accessibility features
 */
function enhanceAccessibility() {
    // Add skip to content link for screen readers
    const skipLink = document.createElement('a');
    skipLink.href = '#role-grid';
    skipLink.className = 'skip-link';
    skipLink.textContent = 'Skip to role selection';
    skipLink.style.cssText = `
        position: absolute;
        top: -40px;
        left: 0;
        background: var(--color-primary-gold);
        color: #000;
        padding: 8px;
        z-index: 100;
        transition: top 0.3s;
    `;
    
    skipLink.addEventListener('focus', () => {
        skipLink.style.top = '0';
    });
    
    skipLink.addEventListener('blur', () => {
        skipLink.style.top = '-40px';
    });
    
    document.body.prepend(skipLink);
    
    // Add ID to role grid for skip link
    const roleGrid = document.querySelector('.role-grid');
    if (roleGrid) {
        roleGrid.id = 'role-grid';
    }
}

/**
 * Handle page visibility changes
 */
function handleVisibilityChange() {
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            console.log('Page hidden');
        } else {
            console.log('Page visible');
            // Could refresh data or check for updates here
        }
    });
}

/**
 * Add analytics tracking (placeholder)
 */
function trackRoleSelection(role) {
    // In production, this would send data to analytics service
    console.log('Analytics: Role selected', {
        role: role,
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent
    });
    
    // Example: Google Analytics tracking
    // if (typeof gtag !== 'undefined') {
    //     gtag('event', 'role_selected', {
    //         'event_category': 'navigation',
    //         'event_label': role
    //     });
    // }
}

/**
 * Display welcome message based on time of day
 */
function displayTimeBasedGreeting() {
    const hour = new Date().getHours();
    let greeting = '';
    
    if (hour >= 5 && hour < 12) {
        greeting = '🌅 Good morning!';
    } else if (hour >= 12 && hour < 17) {
        greeting = '☀️ Good afternoon!';
    } else if (hour >= 17 && hour < 21) {
        greeting = '🌆 Good evening!';
    } else {
        greeting = '🌙 Good evening!';
    }
    
    // Could display this in the UI if desired
    console.log(greeting);
}

// ============================================
// EVENT LISTENERS & INITIALIZATION
// ============================================

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    initializePage();
    checkExistingRole();
    enhanceHoverEffects();
    handleLogoError();
    enhanceAccessibility();
    handleVisibilityChange();
    displayTimeBasedGreeting();
});

// Handle window load
window.addEventListener('load', () => {
    console.log('All resources loaded');
});

// Handle page unload (cleanup)
window.addEventListener('beforeunload', () => {
    console.log('Page unloading');
});

// Export functions for testing (if needed)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        selectRole,
        trackRoleSelection
    };
}
