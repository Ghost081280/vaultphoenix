function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

function copyToClipboard(button) {
    const copyBox = button.closest('.copy-box');
    const code = copyBox.querySelector('code');
    
    if (code) {
        const text = code.textContent;
        
        navigator.clipboard.writeText(text).then(() => {
            const originalText = button.textContent;
            button.textContent = 'Copied!';
            button.style.background = '#4caf50';
            
            setTimeout(() => {
                button.textContent = originalText;
                button.style.background = '';
            }, 2000);
        }).catch(err => {
            console.error('Failed to copy text: ', err);
            const originalText = button.textContent;
            button.textContent = 'Failed';
            button.style.background = '#f44336';
            
            setTimeout(() => {
                button.textContent = originalText;
                button.style.background = '';
            }, 2000);
        });
    }
}

function calculateROI() {
    const locations = parseInt(document.getElementById('locations').value) || 0;
    const setupFee = parseFloat(document.getElementById('setup-fee').value) || 0;
    const pricePerLocation = parseFloat(document.getElementById('price-per-location').value) || 0;
    const duration = parseInt(document.getElementById('duration').value) || 1;
    
    document.getElementById('locations-value').textContent = locations;

    const monthlyRevenue = locations * pricePerLocation;
    const totalSetupRevenue = setupFee;
    const totalRecurringRevenue = monthlyRevenue * duration;
    const totalCampaignRevenue = totalSetupRevenue + totalRecurringRevenue;
    const revenuePerLocation = locations > 0 ? totalCampaignRevenue / locations : 0;

    document.getElementById('monthly-revenue').textContent = `$${monthlyRevenue.toLocaleString()}`;
    document.getElementById('total-revenue').textContent = `$${totalCampaignRevenue.toLocaleString()}`;
    document.getElementById('revenue-per-location').textContent = `$${revenuePerLocation.toFixed(0)}`;
}

document.addEventListener('DOMContentLoaded', function() {
    calculateROI();
    
    const inputs = ['locations', 'setup-fee', 'price-per-location', 'duration'];
    inputs.forEach(id => {
        const el = document.getElementById(id);
        if (el) {
            el.addEventListener('input', calculateROI);
            el.addEventListener('change', calculateROI);
        }
    });

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
            }
        });
    }, { threshold: 0.1 });
    
    document.querySelectorAll('.scroll-reveal').forEach(el => {
        observer.observe(el);
    });
});
