// Form submission handler for hero form
document.getElementById('leadForm').addEventListener('submit', function(e) {
    e.preventDefault();

    // Get form data
    const formData = {
        name: document.getElementById('name').value,
        website: document.getElementById('website').value,
        phone: document.getElementById('phone').value,
        problem: document.getElementById('problem').value
    };

    // Log form data (in production, this would send to your backend)
    console.log('Hero form submitted:', formData);

    // Show success message
    alert('Thank you! We\'ll be in touch soon to schedule your free strategy session.');

    // Reset form
    this.reset();
});

// Form submission handler for final CTA form
document.getElementById('strategyForm').addEventListener('submit', function(e) {
    e.preventDefault();

    // Get form data
    const formData = {
        name: document.getElementById('final-name').value,
        email: document.getElementById('final-email').value,
        phone: document.getElementById('final-phone').value,
        business: document.getElementById('final-business').value,
        goals: document.getElementById('final-goals').value
    };

    // Log form data (in production, this would send to your backend)
    console.log('Strategy form submitted:', formData);

    // Show success message
    alert('Thank you! We\'ll review your information and contact you within 24 hours to schedule your free strategy session.');

    // Reset form
    this.reset();
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// CTA button handlers
document.querySelectorAll('.btn-primary').forEach(button => {
    if (button.textContent.includes('Free Strategy Call')) {
        button.addEventListener('click', function() {
            // Scroll to form
            document.querySelector('.form-card').scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            });
            // Focus on first input
            setTimeout(() => {
                document.getElementById('name').focus();
            }, 500);
        });
    }
});

document.querySelectorAll('.btn-secondary').forEach(button => {
    if (button.textContent.includes('Case Studies')) {
        button.addEventListener('click', function() {
            // Placeholder for case studies navigation
            alert('Case studies section coming soon! For now, please fill out the form to discuss your specific needs.');
        });
    }
});