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

    const setActiveNavLink = function() {
        if (!navMenu) {
            return;
        }

        const navLinks = navMenu.querySelectorAll('.nav-link');
        if (navLinks.length === 0) {
            return;
        }

        navLinks.forEach(function(link) {
            link.classList.remove('active');
        });

        const currentFile = (window.location.pathname.split('/').pop() || 'index.html').toLowerCase();
        const currentHash = window.location.hash;
        const routeMap = {
            'index.html': 'index.html',
            'about.html': 'index.html',
            'catalog.html': 'projects.html',
            'projects.html': 'projects.html',
            'property.html': 'projects.html',
            'services.html': 'services.html',
            'employees.html': 'employees.html',
            'contact.html': 'contact.html'
        };

        let targetHref = routeMap[currentFile] || currentFile;

        if (currentFile === 'index.html' && currentHash) {
            const hashLink = navMenu.querySelector('.nav-link[href="' + currentHash + '"]');
            if (hashLink) {
                hashLink.classList.add('active');
                return;
            }

            const indexHashLink = navMenu.querySelector('.nav-link[href="index.html' + currentHash + '"]');
            if (indexHashLink) {
                indexHashLink.classList.add('active');
                return;
            }
        }

        const directMatch = navMenu.querySelector('.nav-link[href="' + targetHref + '"]');
        if (directMatch) {
            directMatch.classList.add('active');
            return;
        }

        if (targetHref === 'index.html') {
            const homeLink = navMenu.querySelector('.nav-link[href="index.html"]');
            if (homeLink) {
                homeLink.classList.add('active');
            }
        }
    };

    setActiveNavLink();

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
