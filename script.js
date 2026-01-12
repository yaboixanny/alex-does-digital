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
// --- Case Study Interactive Logic ---

// 1. Counter Animation
const animateCounters = () => {
    const counters = document.querySelectorAll('.animate-counter');
    const speed = 200;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = +counter.getAttribute('data-target');
                const count = +counter.innerText.replace(/[^0-9]/g, '');
                
                const updateCount = () => {
                    const current = +counter.innerText.replace(/[^0-9]/g, '');
                    const inc = target / speed;

                    if (current < target) {
                        counter.innerText = Math.ceil(current + inc);
                        setTimeout(updateCount, 1);
                    } else {
                        counter.innerText = target;
                        // Add symbols back
                        if (counter.hasAttribute('data-prefix')) {
                            counter.innerText = counter.getAttribute('data-prefix') + counter.innerText;
                        }
                        if (counter.hasAttribute('data-suffix')) {
                            counter.innerText = counter.innerText + counter.getAttribute('data-suffix');
                        }
                    }
                };
                updateCount();
                observer.unobserve(counter);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => observer.observe(counter));
};

// 2. ROI Calculator
const initROICalculator = () => {
    const slider = document.querySelector('.roi-slider');
    const resultValue = document.querySelector('.roi-results .result-value');
    
    if (!slider || !resultValue) return;

    const updateROI = () => {
        const monthlyPrice = parseInt(slider.value);
        // "If you closed just 5 of these leads, you would make $[X] in recurring yearly revenue."
        const recurringYearly = monthlyPrice * 12 * 5;
        resultValue.innerText = '$' + recurringYearly.toLocaleString();
        document.querySelector('.current-price').innerText = '$' + monthlyPrice;
    };

    slider.addEventListener('input', updateROI);
    updateROI(); // Initial calc
};

// 3. Floating CTA Visibility
const initFloatingCTA = () => {
    const floatingCta = document.querySelector('.floating-cta');
    if (!floatingCta) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            floatingCta.classList.remove('hidden');
        } else {
            floatingCta.classList.add('hidden');
        }
    });
};

// 4. A/B Test Slider
const initABSlider = () => {
    const slider = document.querySelector('.ab-range');
    const afterImg = document.querySelector('.ab-slider-after');
    const handle = document.querySelector('.ab-handle');

    if (!slider || !afterImg || !handle) return;

    slider.addEventListener('input', (e) => {
        const value = e.target.value;
        afterImg.style.width = value + '%';
        handle.style.left = value + '%';
    });
};

// Initialize all features
document.addEventListener('DOMContentLoaded', () => {
    animateCounters();
    initROICalculator();
    initFloatingCTA();
    initABSlider();
});
