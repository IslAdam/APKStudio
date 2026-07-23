// Мобильное меню
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');

    if (hamburger) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Закрываем меню при клике на ссылку
        const navLinks = navMenu.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }

    // Плавное перемещение при клике на якоря
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    const revealItems = document.querySelectorAll('[data-reveal]');
    if (revealItems.length > 0) {
        if ('IntersectionObserver' in window) {
            const revealObserver = new IntersectionObserver(function(entries, observer) {
                entries.forEach(function(entry) {
                    if (!entry.isIntersecting) {
                        return;
                    }

                    const delay = entry.target.getAttribute('data-delay');
                    if (delay) {
                        entry.target.style.transitionDelay = delay + 'ms';
                    }

                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target);
                });
            }, {
                threshold: 0.15,
                rootMargin: '0px 0px -40px 0px'
            });

            revealItems.forEach(function(item) {
                revealObserver.observe(item);
            });
        } else {
            revealItems.forEach(function(item) {
                item.classList.add('is-visible');
            });
        }
    }

    const serviceItems = document.querySelectorAll('.service-item');
    const servicePreview = document.getElementById('servicePreview');
    const servicePreviewLabel = document.getElementById('servicePreviewLabel');
    const servicePreviewTitle = document.getElementById('servicePreviewTitle');
    const servicePreviewText = document.getElementById('servicePreviewText');

    if (serviceItems.length > 0 && servicePreview && servicePreviewLabel && servicePreviewTitle && servicePreviewText) {
        const setServicePreview = function(item) {
            const image = item.getAttribute('data-image');
            const label = item.getAttribute('data-label');
            const title = item.getAttribute('data-title');
            const description = item.getAttribute('data-description');

            serviceItems.forEach(function(serviceItem) {
                serviceItem.classList.remove('is-active');
            });

            item.classList.add('is-active');
            servicePreview.style.backgroundImage = "linear-gradient(180deg, rgba(8, 8, 8, 0.16), rgba(8, 8, 8, 0.62)), url('" + image + "')";
            servicePreviewLabel.textContent = label;
            servicePreviewTitle.textContent = title;
            servicePreviewText.textContent = description;
        };

        serviceItems.forEach(function(item) {
            item.addEventListener('mouseenter', function() {
                setServicePreview(item);
            });
            item.addEventListener('focus', function() {
                setServicePreview(item);
            });
        });

        setServicePreview(serviceItems[0]);
    }
});
