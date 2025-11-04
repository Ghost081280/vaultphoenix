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
    const locations = parseInt(document.getElementById('locations').value);
    const pricePerLocation = parseFloat(document.getElementById('price-per-location').value);
    const collectionsPerDay = parseInt(document.getElementById('collections-per-day').value);
    const duration = parseInt(document.getElementById('duration').value);
    
    document.getElementById('locations-value').textContent = locations;
    document.getElementById('collections-value').textContent = collectionsPerDay;
    
    const monthlyRevenue = locations * pricePerLocation;
    const totalRevenue = monthlyRevenue * duration;
    const totalCollections = locations * collectionsPerDay * 30 * duration;
    const revenuePerCollection = totalCollections > 0 ? totalRevenue / totalCollections : 0;
    
    document.getElementById('monthly-revenue').textContent = `$${monthlyRevenue.toLocaleString()}`;
    document.getElementById('total-revenue').textContent = `$${totalRevenue.toLocaleString()}`;
    document.getElementById('total-collections').textContent = totalCollections.toLocaleString();
    document.getElementById('revenue-per-collection').textContent = `$${revenuePerCollection.toFixed(2)}`;
}

document.addEventListener('DOMContentLoaded', function() {
    calculateROI();
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
            }
        });
    }, {
        threshold: 0.1
    });
    
    document.querySelectorAll('.scroll-reveal').forEach(el => {
        observer.observe(el);
    });
});
