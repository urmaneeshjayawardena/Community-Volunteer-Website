// XML LOADER - Loads and displays services from XML
let xmlDoc = null;
let servicesContainer = null;

document.addEventListener('DOMContentLoaded', function() {
    servicesContainer = document.getElementById('services-container');
    if (servicesContainer) {
        loadXML();
    }
});

function loadXML() {
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
            xmlDoc = this.responseXML;
            displayAllServices();
            
            const urlParams = new URLSearchParams(window.location.search);
            const category = urlParams.get('category');
            if (category) {
                const buttons = document.querySelectorAll('.filter-btn');
                buttons.forEach(btn => {
                    btn.classList.remove('active');
                    if (btn.textContent.toLowerCase().includes(category)) {
                        btn.classList.add('active');
                    }
                });
                displayServicesByCategory(category);
            }
        }
    };
    xhttp.open('GET', 'xml/services.xml', true);
    xhttp.send();
}

function displayAllServices() {
    if (!xmlDoc || !servicesContainer) return;
    
    const services = xmlDoc.getElementsByTagName('service');
    let output = '';
    
    for (let i = 0; i < services.length; i++) {
        output += generateServiceHTML(services[i]);
    }
    
    servicesContainer.innerHTML = output;
}

function displayServicesByCategory(category) {
    if (!xmlDoc || !servicesContainer) return;
    
    const allServices = xmlDoc.getElementsByTagName('service');
    let output = '';
    let count = 0;
    
    for (let i = 0; i < allServices.length; i++) {
        const serviceCategory = allServices[i].getAttribute('category');
        
        if (category === 'all' || serviceCategory === category) {
            output += generateServiceHTML(allServices[i]);
            count++;
        }
    }
    
    if (count === 0) {
        output = '<div style="text-align: center; padding: 40px; color: var(--gray-500); grid-column: 1/-1;"><p>No services found in this category.</p></div>';
    }
    
    servicesContainer.innerHTML = output;
}

function generateServiceHTML(service) {
    const name = service.getElementsByTagName('name')[0].childNodes[0].nodeValue;
    const description = service.getElementsByTagName('description')[0].childNodes[0].nodeValue;
    const contact = service.getElementsByTagName('contact')[0].childNodes[0].nodeValue;
    const location = service.getElementsByTagName('location')[0].childNodes[0].nodeValue;
    const category = service.getAttribute('category');
    
    let icon = '';
    if (category === 'health') icon = '🏥';
    else if (category === 'education') icon = '📚';
    else if (category === 'transport') icon = '🚌';
    else if (category === 'social') icon = '🤝';
    
    return `
        <div class="service-card">
            <span class="service-category">${icon} ${category.charAt(0).toUpperCase() + category.slice(1)}</span>
            <h3 class="service-name">${name}</h3>
            <p>${description}</p>
            <div class="service-contact">📞 ${contact}</div>
            <div class="service-location">📍 ${location}</div>
        </div>
    `;
}

window.filterServices = function(category) {
    const buttons = document.querySelectorAll('.filter-btn');
    buttons.forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    
    if (xmlDoc) {
        displayServicesByCategory(category);
    }
};