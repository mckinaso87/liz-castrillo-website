// Mobile Menu Toggle
const initMobileMenu = () => {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            navLinks.classList.toggle('active');
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!menuToggle.contains(e.target) && !navLinks.contains(e.target)) {
                menuToggle.classList.remove('active');
                navLinks.classList.remove('active');
            }
        });

        // Close menu when clicking a link
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                menuToggle.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });
    }
};

// Navigation Menu Toggle
const initNavMenuToggle = () => {
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            menuToggle.setAttribute('aria-expanded', 
                menuToggle.getAttribute('aria-expanded') === 'true' ? 'false' : 'true'
            );
        });
    }
};

// Intersection Observer for revealing elements
const observeElements = () => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '50px'
    });

    document.querySelectorAll('.grid-item').forEach(item => {
        observer.observe(item);
    });
};

// Image loading handler
const handleImageLoad = (img) => {
    img.parentElement.classList.add('loaded');
};

// Initialize all images
const initializeImages = () => {
    document.querySelectorAll('.grid-item img').forEach(img => {
        if (img.complete) {
            handleImageLoad(img);
        } else {
            img.addEventListener('load', () => handleImageLoad(img));
        }
    });
};

// Lazy loading for images
const loadImages = () => {
    const images = document.querySelectorAll('img[data-src]');
    console.log('Found images to load:', images.length); // Debug log

    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                console.log('Loading image:', img.dataset.src); // Debug log
                img.src = img.dataset.src;
                img.onload = () => {
                    img.classList.add('loaded');
                    console.log('Image loaded:', img.src); // Debug log
                };
                observer.unobserve(img);
            }
        });
    });

    images.forEach(img => {
        imageObserver.observe(img);
    });
};

// Video handling
document.querySelectorAll('.grid-item.video').forEach(item => {
    const video = item.querySelector('video');
    const muteButton = item.querySelector('.mute-button');
    
    // Play/pause on click
    item.addEventListener('click', (e) => {
        if (e.target === muteButton) return; // Don't trigger if clicking mute button
        if (video.paused) {
            video.play();
        } else {
            video.pause();
        }
    });

    // Mute toggle
    muteButton?.addEventListener('click', () => {
        video.muted = !video.muted;
        muteButton.querySelector('i').className = 
            video.muted ? 'fas fa-volume-mute' : 'fas fa-volume-up';
    });

    // Lazy loading for videos
    if (video.dataset.src) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    video.src = video.dataset.src;
                    item.classList.add('video-loaded');
                    observer.unobserve(video);
                }
            });
        });
        observer.observe(video);
    }

    // Pause when out of view
    const visibilityObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting && !video.paused) {
                video.pause();
            }
        });
    });
    visibilityObserver.observe(video);
});

// Smooth scroll for navigation
const initSmoothScroll = () => {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
};

// Initialize all features
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded, initializing image loading...'); // Debug log
    initMobileMenu();
    initNavMenuToggle();
    observeElements();
    initializeImages();
    loadImages();
    initSmoothScroll();
});
