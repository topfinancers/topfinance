document.addEventListener('DOMContentLoaded', () => {

    // --- PART 1: HEADER & NAVIGATION ---

    const header = document.querySelector('.main-header');
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    const mobileNavOverlay = document.querySelector('.mobile-nav-overlay');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-overlay a');

    // Header shadow on scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Toggle mobile navigation
    hamburgerMenu.addEventListener('click', () => {
        document.body.classList.toggle('nav-open');
    });

    // Close mobile nav when a link is clicked
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', () => {
            document.body.classList.remove('nav-open');
        });
    });


    // --- PART 2: SCROLL-TRIGGERED ANIMATIONS ---

    // General fade-in observer for most sections
    const fadeObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.fade-in').forEach(el => fadeObserver.observe(el));
    
    // Animate hero content on load
    document.querySelector('.hero-content').classList.add('animate-on-load', 'visible');


    // --- ADVANCED STRATEGY SECTION ANIMATION (Desktop Only) ---

    // Only run the complex strategy animation on screens wider than 768px
    if (window.matchMedia("(min-width: 769px)").matches) {
        const strategySteps = document.querySelectorAll('.strategy-step');
        const iconContainer = document.querySelector('.sticky-icon-container');
        const orbitContainer = document.querySelector('.orbit-container');
        const icons = document.querySelectorAll('.icon-wrapper');

        const colorMap = {
            teal: '#2dd4bf',
            purple: '#b773ef',
            pink: '#ff27b8'
        };

        const colorRgbMap = {
            teal: '45, 212, 191',
            purple: '183, 115, 239',
            pink: '255, 39, 184'
        };

        const strategyObserver = new IntersectionObserver((entries) => {
            let anyStepActive = false;
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    anyStepActive = true;
                    const activeStep = entry.target;
                    
                    strategySteps.forEach(step => step.classList.remove('active'));
                    activeStep.classList.add('active');

                    const iconId = activeStep.dataset.icon;
                    const colorKey = activeStep.dataset.color;

                    icons.forEach(icon => {
                        icon.classList.toggle('active', icon.id === iconId);
                    });

                    if (colorKey && colorMap[colorKey] && colorRgbMap[colorKey]) {
                        iconContainer.style.setProperty('--current-icon-color', colorMap[colorKey]);
                        iconContainer.style.setProperty('--current-icon-color-rgb', colorRgbMap[colorKey]);
                    }
                    
                    orbitContainer.classList.add('is-orbiting');
                }
            });

            if (!anyStepActive) {
                const isAnyStepMarkedActive = Array.from(strategySteps).some(step => step.classList.contains('active'));
                 if(!isAnyStepMarkedActive){
                    orbitContainer.classList.remove('is-orbiting');
                 }
            }
        }, {
            root: null,
            rootMargin: '-50% 0px -50% 0px',
            threshold: 0
        });

        strategySteps.forEach(step => {
            strategyObserver.observe(step);
        });
    }

    // --- PRICING TOGGLE ---
    const pricingSwitch = document.getElementById('pricing-switch');
    if (pricingSwitch) {
        pricingSwitch.addEventListener('change', function() {
            const isYearly = this.checked;
            const monthlyPrices = document.querySelectorAll('.monthly-price');
            const yearlyPrices = document.querySelectorAll('.yearly-price');
            const periods = document.querySelectorAll('.period');

            monthlyPrices.forEach(price => price.style.display = isYearly ? 'none' : 'inline');
            yearlyPrices.forEach(price => price.style.display = isYearly ? 'inline' : 'none');
            periods.forEach(period => period.textContent = isYearly ? '/godišnje' : '/mesečno');
        });
    }

});