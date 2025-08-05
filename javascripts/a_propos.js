// Animation au scroll - Intersection Observer
class ScrollAnimator {
    constructor() {
        this.observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        this.init();
    }

    init() {
        // Créer l'observer
        this.observer = new IntersectionObserver(
            this.handleIntersection.bind(this),
            this.observerOptions
        );

        // Observer tous les éléments timeline
        const timelineItems = document.querySelectorAll('.timeline-item');
        const valueCards = document.querySelectorAll('.value-card');
        const ctaContent = document.querySelector('.cta-content');

        [...timelineItems, ...valueCards, ctaContent].forEach(el => {
            if (el) this.observer.observe(el);
        });

        // Animation des stats au chargement
        this.animateStats();

        // Animation de l'image profile
        this.animateProfileImage();

        // Parallax léger sur le hero
        this.initParallax();

        // Animation des tags au hover
        this.initTagAnimations();
    }

    handleIntersection(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');

                // Animation spéciale pour les value cards
                if (entry.target.classList.contains('value-card')) {
                    const delay = Array.from(entry.target.parentNode.children).indexOf(entry.target) * 200;
                    setTimeout(() => {
                        entry.target.style.transform = 'translateY(0)';
                        entry.target.style.opacity = '1';
                    }, delay);
                }
            }
        });
    }

    animateStats() {
        const stats = document.querySelectorAll('.stat-number');

        stats.forEach(stat => {
            const target = parseInt(stat.textContent);
            const suffix = stat.textContent.replace(/[0-9]/g, '');
            let current = 0;
            const increment = target / 50;

            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                }
                stat.textContent = Math.floor(current) + suffix;
            }, 40);
        });
    }

    animateProfileImage() {
        const profileImage = document.querySelector('.profile-image');
        if (!profileImage) return;

        // Changement de forme au hover
        profileImage.addEventListener('mouseenter', () => {
            profileImage.style.borderRadius = '20% 50% 20% 50%';
            profileImage.style.transform = 'scale(1.05) rotate(5deg)';
        });

        profileImage.addEventListener('mouseleave', () => {
            profileImage.style.borderRadius = '50% 20% 50% 20%';
            profileImage.style.transform = 'scale(1) rotate(0deg)';
        });
    }

    initParallax() {
        const hero = document.querySelector('.hero');
        if (!hero) return;

        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;

            if (scrolled < window.innerHeight) {
                hero.style.transform = `translateY(${rate}px)`;
            }
        });
    }

    initTagAnimations() {
        const tags = document.querySelectorAll('.tag');

        tags.forEach(tag => {
            tag.addEventListener('mouseenter', () => {
                tag.style.transform = 'scale(1.1) rotate(5deg)';
                tag.style.boxShadow = '0 5px 15px rgba(102, 126, 234, 0.4)';
            });

            tag.addEventListener('mouseleave', () => {
                tag.style.transform = 'scale(1) rotate(0deg)';
                tag.style.boxShadow = 'none';
            });
        });
    }
}

// Effet de typing pour le titre
class TypingEffect {
    constructor(element, text, speed = 100) {
        this.element = element;
        this.text = text;
        this.speed = speed;
        this.index = 0;

        this.type();
    }

    type() {
        if (this.index < this.text.length) {
            this.element.textContent += this.text.charAt(this.index);
            this.index++;
            setTimeout(() => this.type(), this.speed);
        }
    }
}

// Gestion des images lazy loading
class LazyImageLoader {
    constructor() {
        this.images = document.querySelectorAll('img[data-src]');
        this.imageObserver = new IntersectionObserver(this.handleImageIntersection.bind(this));

        this.images.forEach(img => this.imageObserver.observe(img));
    }

    handleImageIntersection(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                this.imageObserver.unobserve(img);
            }
        });
    }
}

// Smooth scroll pour les liens ancres
class SmoothScroll {
    constructor() {
        const links = document.querySelectorAll('a[href^="#"]');

        links.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(link.getAttribute('href'));

                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }
}

// Animation des boutons CTA
class ButtonAnimations {
    constructor() {
        const buttons = document.querySelectorAll('.btn');

        buttons.forEach(button => {
            // Effet ripple
            button.addEventListener('click', (e) => {
                const ripple = document.createElement('span');
                const rect = button.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height);
                const x = e.clientX - rect.left - size / 2;
                const y = e.clientY - rect.top - size / 2;

                ripple.style.cssText = `
                    position: absolute;
                    border-radius: 50%;
                    background: rgba(255, 255, 255, 0.6);
                    transform: scale(0);
                    animation: ripple 0.6s linear;
                    width: ${size}px;
                    height: ${size}px;
                    left: ${x}px;
                    top: ${y}px;
                `;

                button.style.position = 'relative';
                button.style.overflow = 'hidden';
                button.appendChild(ripple);

                setTimeout(() => {
                    ripple.remove();
                }, 600);
            });
        });

        // Ajouter l'animation CSS pour l'effet ripple
        const style = document.createElement('style');
        style.textContent = `
            @keyframes ripple {
                to {
                    transform: scale(4);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// Gestionnaire de progression de lecture
class ReadingProgress {
    constructor() {
        this.progressBar = this.createProgressBar();
        this.updateProgress();

        window.addEventListener('scroll', () => this.updateProgress());
    }

    createProgressBar() {
        const progressBar = document.createElement('div');
        progressBar.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 0%;
            height: 4px;
            background: linear-gradient(45deg, #667eea, #764ba2);
            z-index: 9999;
            transition: width 0.3s ease;
        `;
        document.body.appendChild(progressBar);
        return progressBar;
    }

    updateProgress() {
        const scrollTop = window.pageYOffset;
        const docHeight = document.body.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;

        this.progressBar.style.width = scrollPercent + '%';
    }
}

// Gestionnaire de thème sombre/clair (optionnel)
class ThemeToggle {
    constructor() {
        this.isDark = localStorage.getItem('darkTheme') === 'true';
        this.createToggleButton();
        this.applyTheme();
    }

    createToggleButton() {
        const button = document.createElement('button');
        button.innerHTML = this.isDark ? '☀️' : '🌙';
        button.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            border: none;
            background: rgba(255, 255, 255, 0.9);
            backdrop-filter: blur(10px);
            font-size: 1.5rem;
            cursor: pointer;
            z-index: 1000;
            transition: all 0.3s ease;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
        `;

        button.addEventListener('click', () => this.toggleTheme());
        button.addEventListener('mouseenter', () => {
            button.style.transform = 'scale(1.1)';
        });
        button.addEventListener('mouseleave', () => {
            button.style.transform = 'scale(1)';
        });

        document.body.appendChild(button);
        this.toggleButton = button;
    }

    toggleTheme() {
        this.isDark = !this.isDark;
        localStorage.setItem('darkTheme', this.isDark);
        this.applyTheme();
        this.toggleButton.innerHTML = this.isDark ? '☀️' : '🌙';
    }

    applyTheme() {
        if (this.isDark) {
            document.body.classList.add('dark-theme');
        } else {
            document.body.classList.remove('dark-theme');
        }
    }
}

// Gestionnaire de performance et optimisation
class PerformanceOptimizer {
    constructor() {
        this.throttledResize = this.throttle(() => this.handleResize(), 250);
        this.throttledScroll = this.throttle(() => this.handleScroll(), 16);

        window.addEventListener('resize', this.throttledResize);
        window.addEventListener('scroll', this.throttledScroll);

        this.preloadImages();
    }

    throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        }
    }

    handleResize() {
        // Réajuster les animations si nécessaire
        const timelineItems = document.querySelectorAll('.timeline-item');
        timelineItems.forEach(item => {
            item.style.transform = 'translateY(0)';
        });
    }

    handleScroll() {
        // Optimisations lors du scroll
        this.updateParallax();
    }

    updateParallax() {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');

        if (hero && scrolled < window.innerHeight) {
            const rate = scrolled * -0.3;
            hero.style.transform = `translateY(${rate}px)`;
        }
    }

    preloadImages() {
        const images = [
            'https://images.unsplash.com/photo-1441986300917-64674bd600d8',
            'https://images.unsplash.com/photo-1544467151-6e4b99de8b51'
        ];

        images.forEach(src => {
            const img = new Image();
            img.src = src;
        });
    }
}

// Initialisation de tous les composants
document.addEventListener('DOMContentLoaded', () => {
    // Initialiser tous les gestionnaires
    new ScrollAnimator();
    new SmoothScroll();
    new ButtonAnimations();
    new ReadingProgress();
    new PerformanceOptimizer();

    // Initialiser le toggle de thème (optionnel)
    // new ThemeToggle();

    // Animation d'entrée pour les éléments visibles
    const visibleElements = document.querySelectorAll('.hero-text, .hero-image');
    visibleElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';

        setTimeout(() => {
            el.style.transition = 'all 0.8s ease';
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        }, index * 200);
    });

    // Easter egg - Konami Code
    let konamiCode = [];
    const konamiSequence = [
        'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
        'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
        'KeyB', 'KeyA'
    ];

    document.addEventListener('keydown', (e) => {
        konamiCode.push(e.code);
        konamiCode = konamiCode.slice(-10);

        if (konamiCode.join(',') === konamiSequence.join(',')) {
            // Activer un effet spécial
            document.body.style.animation = 'rainbow 2s infinite';

            const style = document.createElement('style');
            style.textContent = `
                @keyframes rainbow {
                    0% { filter: hue-rotate(0deg); }
                    100% { filter: hue-rotate(360deg); }
                }
            `;
            document.head.appendChild(style);

            setTimeout(() => {
                document.body.style.animation = '';
                style.remove();
            }, 5000);
        }
    });

    console.log('🎉 Page À Propos chargée avec succès!');
    console.log('💡 Astuce: Essayez le code Konami pour un effet spécial!');
});

// Gestion des erreurs globales
window.addEventListener('error', (e) => {
    console.error('Erreur détectée:', e.error);
    // Ici vous pourriez envoyer l'erreur à un service de monitoring
});

// Export pour utilisation modulaire (si nécessaire)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        ScrollAnimator,
        TypingEffect,
        SmoothScroll,
        ButtonAnimations,
        ReadingProgress,
        ThemeToggle,
        PerformanceOptimizer
    };
}
