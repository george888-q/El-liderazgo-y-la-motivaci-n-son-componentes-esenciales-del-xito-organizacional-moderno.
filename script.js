// Intersection Observer para animaciones al hacer scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observar elementos con animaciones
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.article-card, .strategy-card, .case-card, .resource-card, .tip-item');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Animación de entrada para elementos con clases específicas
    const fadeInElements = document.querySelectorAll('.fade-in-up, .slide-in-left, .slide-in-right, .scale-in, .rotate-in');
    fadeInElements.forEach((el, index) => {
        setTimeout(() => {
            el.style.opacity = '1';
        }, index * 100);
    });

    // Efecto parallax suave en el hero
    const hero = document.querySelector('.hero');
    if (hero) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            hero.style.transform = `translateY(${scrolled * 0.5}px)`;
        });
    }

    // Smooth scroll para los enlaces de navegación
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Efecto de escritura para el título principal (opcional)
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const text = heroTitle.textContent;
        heroTitle.textContent = '';
        let index = 0;
        const typeWriter = () => {
            if (index < text.length) {
                heroTitle.textContent += text.charAt(index);
                index++;
                setTimeout(typeWriter, 50);
            }
        };
        // Descomentar para activar el efecto de escritura
        // typeWriter();
    }

    // Animación de contador para estadísticas (si se agregan)
    const animateCounter = (element, target) => {
        let current = 0;
        const increment = target / 50;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                element.textContent = target + '%';
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current) + '%';
            }
        }, 30);
    };

    // Efecto hover mejorado para las tarjetas
    const cards = document.querySelectorAll('.strategy-card, .case-card, .article-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transition = 'all 0.3s ease';
        });
    });

    // Cargar video de YouTube al hacer clic en el placeholder
    const videoPlaceholders = document.querySelectorAll('.video-placeholder');
    videoPlaceholders.forEach(placeholder => {
        const videoId = placeholder.getAttribute('data-video-id');
        const thumbnail = placeholder.querySelector('.video-thumbnail');
        const placeholderDiv = placeholder.querySelector('.video-thumbnail-placeholder');
        
        // Si hay un ID válido, cargar la imagen de portada de YouTube
        if (videoId && videoId.trim() !== '' && videoId !== 'REEMPLAZA_CON_ID_DEL_VIDEO') {
            thumbnail.src = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
            thumbnail.style.display = 'block';
            thumbnail.onerror = function() {
                this.src = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
            };
            if (placeholderDiv) {
                placeholderDiv.style.display = 'none';
            }
            // Mostrar botón de play sobre la imagen
            const playButtonOverlay = placeholder.querySelector('.play-button-overlay');
            if (playButtonOverlay) {
                playButtonOverlay.style.display = 'block';
            }
        }
        
        // Cargar el video al hacer clic
        placeholder.addEventListener('click', function() {
            const currentVideoId = this.getAttribute('data-video-id');
            if (currentVideoId && currentVideoId.trim() !== '' && currentVideoId !== 'REEMPLAZA_CON_ID_DEL_VIDEO') {
                if (!this.classList.contains('loaded')) {
                    const iframe = document.createElement('iframe');
                    iframe.src = `https://www.youtube.com/embed/${currentVideoId}?autoplay=1`;
                    iframe.title = this.closest('.resource-card').querySelector('h4').textContent;
                    iframe.frameBorder = '0';
                    iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
                    iframe.allowFullscreen = true;
                    iframe.style.position = 'absolute';
                    iframe.style.top = '0';
                    iframe.style.left = '0';
                    iframe.style.width = '100%';
                    iframe.style.height = '100%';
                    iframe.style.border = 'none';
                    iframe.style.borderRadius = '8px';
                    this.appendChild(iframe);
                    this.classList.add('loaded');
                }
            }
        });
    });
});

// Efecto de partículas flotantes en el hero (opcional)
function createFloatingParticles() {
    const hero = document.querySelector('.hero');
    if (!hero) return;

    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.style.position = 'absolute';
        particle.style.width = '4px';
        particle.style.height = '4px';
        particle.style.backgroundColor = 'rgba(255, 255, 255, 0.5)';
        particle.style.borderRadius = '50%';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animation = `float ${5 + Math.random() * 10}s infinite ease-in-out`;
        particle.style.animationDelay = Math.random() * 2 + 's';
        hero.appendChild(particle);
    }
}

// Descomentar para activar partículas flotantes
// createFloatingParticles();


