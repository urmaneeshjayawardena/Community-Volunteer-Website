// CONTACT FORM VALIDATION - UPDATED FOR DETAILED FORM
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            // Get all form values
            const firstName = document.getElementById('first-name').value.trim();
            const lastName = document.getElementById('last-name').value.trim();
            const email = document.getElementById('email').value.trim();
            const phone = document.getElementById('phone').value.trim();
            const jobTitle = document.getElementById('job-title').value.trim();
            const company = document.getElementById('company').value.trim();
            const topic = document.getElementById('service-topic').value;
            const orderNumber = document.getElementById('order-number').value.trim();
            const salonName = document.getElementById('salon-name').value.trim();
            const message = document.getElementById('message').value.trim();
            const updates = document.getElementById('updates').checked;
            const privacy = document.getElementById('privacy').checked;
            
            // Hide all error messages
            document.querySelectorAll('.error-message').forEach(el => {
                el.style.display = 'none';
            });
            
            let isValid = true;
            
            // Validate First Name (required)
            if (firstName === '') {
                document.getElementById('first-name-error').style.display = 'block';
                isValid = false;
            }
            
            // Validate Last Name (required)
            if (lastName === '') {
                document.getElementById('last-name-error').style.display = 'block';
                isValid = false;
            }
            
            // Validate Email (required + format)
            if (email === '' || !email.includes('@') || !email.includes('.')) {
                document.getElementById('email-error').style.display = 'block';
                isValid = false;
            }
            
            // Validate Phone (optional but if provided, must be 10 digits)
            if (phone !== '') {
                const phoneDigits = phone.replace(/\D/g, '');
                if (phoneDigits.length !== 10) {
                    // You could add a phone-error element if you want to validate phone format
                    alert('Please enter a valid 10-digit phone number or leave it empty');
                    isValid = false;
                }
            }
            
            // Validate Topic (required)
            if (!topic || topic === '') {
                document.getElementById('topic-error').style.display = 'block';
                isValid = false;
            }
            
            // Validate Message (required)
            if (message === '') {
                document.getElementById('message-error').style.display = 'block';
                isValid = false;
            }
            
            // Validate Privacy Policy (required)
            if (!privacy) {
                document.getElementById('privacy-error').style.display = 'block';
                isValid = false;
            }
            
            // If all valid, show success message
            if (isValid) {
                document.getElementById('contact-success').style.display = 'block';
                contactForm.reset();
                
                // Hide success message after 5 seconds
                setTimeout(function() {
                    document.getElementById('contact-success').style.display = 'none';
                }, 5000);
                
                // Optional: Log the form data (for debugging)
                console.log('Form submitted:', {
                    firstName, lastName, email, phone, jobTitle, company,
                    topic, orderNumber, salonName, message,
                    wantsUpdates: updates, agreedToPrivacy: privacy
                });
            }
        });
    }
    
    // Optional: Add phone number formatting as user types
    const phoneInput = document.getElementById('phone');
    if (phoneInput) {
        phoneInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length > 10) value = value.slice(0, 10);
            
            // Format as XXX XXX XXXX (optional)
            if (value.length > 6) {
                value = value.slice(0, 3) + ' ' + value.slice(3, 6) + ' ' + value.slice(6);
            } else if (value.length > 3) {
                value = value.slice(0, 3) + ' ' + value.slice(3);
            }
            e.target.value = value;
        });
    }
});