// ========== SCRIPT MEJORADO DEL RESTAURANTE ==========

document.addEventListener("DOMContentLoaded", () => {
    console.log("🍴 Página del restaurante cargada correctamente.");
    
    // Inicializar todas las funcionalidades
    initMobileMenu();
    initFilterMenu();
    initAnimationsOnScroll();
    initFormHandling();
    initNewsletterForm();
    initSmoothScroll();
});

// ========== MENÚ MÓVIL ==========
function initMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navbar = document.querySelector('.navbar');
    
    if (hamburger) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navbar.classList.toggle('active');
        });

        // Cerrar menú al hacer click en un enlace
        document.querySelectorAll('.navbar a').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navbar.classList.remove('active');
            });
        });
    }
}

// ========== FILTRO DE MENÚ ==========
function initFilterMenu() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const menuItems = document.querySelectorAll('.menu-item');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remover clase active de todos los botones
            filterBtns.forEach(b => b.classList.remove('active'));
            // Agregar active al botón clickeado
            btn.classList.add('active');

            // Filtrar items
            const filterValue = btn.getAttribute('data-filter');
            
            menuItems.forEach(item => {
                if (filterValue === 'todos' || item.getAttribute('data-category') === filterValue) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                    }, 50);
                } else {
                    item.style.display = 'none';
                    item.style.opacity = '0';
                }
            });
        });
    });
}

// ========== ANIMACIONES AL HACER SCROLL ==========
function initAnimationsOnScroll() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observar todos los elementos con estas clases
    document.querySelectorAll('.feature-card, .menu-item, .testimonial-card, .info-item').forEach(el => {
        observer.observe(el);
    });
}

// ========== MANEJO DE FORMULARIOS ==========
function initFormHandling() {
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        const form = contactForm.querySelector('form');
        
        if (form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                
                // Obtener valores
                const name = form.querySelector('input[placeholder="Tu nombre"]').value;
                const email = form.querySelector('input[placeholder="Tu email"]').value;
                const subject = form.querySelector('input[placeholder="Asunto"]').value;
                const message = form.querySelector('textarea').value;

                // Validar
                if (name && email && subject && message) {
                    // Simular envío
                    showNotification('✅ Mensaje enviado correctamente. Nos pondremos en contacto pronto.');
                    form.reset();
                } else {
                    showNotification('❌ Por favor completa todos los campos.');
                }
            });
        }
    }
}

// ========== FORMULARIO DE NEWSLETTER ==========
function initNewsletterForm() {
    const newsletterForm = document.querySelector('.newsletter-form');
    
    if (newsletterForm) {
        const form = newsletterForm;
        
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const email = form.querySelector('input[type="email"]').value;
            
            if (email) {
                showNotification('✅ ¡Te has suscrito exitosamente! Recibirás nuestras promociones en: ' + email);
                form.reset();
            } else {
                showNotification('❌ Por favor ingresa un correo válido.');
            }
        });
    }
}

// ========== SCROLL SUAVE ==========
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#' && document.querySelector(href)) {
                e.preventDefault();
                
                document.querySelector(href).scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// ========== NOTIFICACIONES ==========
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(135deg, #27ae60 0%, #229954 100%);
        color: white;
        padding: 15px 25px;
        border-radius: 8px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        animation: slideIn 0.3s ease-out;
        max-width: 400px;
        word-wrap: break-word;
    `;

    document.body.appendChild(notification);

    // Remover después de 4 segundos
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => notification.remove(), 300);
    }, 4000);
}

// ========== AGREGAR ESTILOS DE ANIMACIÓN ==========
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }

    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }

    .hamburger.active span:nth-child(1) {
        transform: rotate(45deg) translate(8px, 8px);
    }

    .hamburger.active span:nth-child(2) {
        opacity: 0;
    }

    .hamburger.active span:nth-child(3) {
        transform: rotate(-45deg) translate(7px, -7px);
    }

    .navbar.active {
        display: flex;
        position: absolute;
        top: 100%;
        left: 0;
        right: 0;
        flex-direction: column;
        background: #2c3e50;
        padding: 1rem;
        gap: 0.5rem;
    }

    .navbar.active ul {
        flex-direction: column;
        gap: 0;
    }

    .navbar.active ul li {
        display: block;
        padding: 0.8rem 0;
        border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    }

    .animate-in {
        animation: fadeInUp 0.6s ease-out;
    }

    .menu-item {
        opacity: 1;
        transition: opacity 0.3s ease-out;
    }

    @media (max-width: 768px) {
        .hamburger.active + .navbar {
            display: flex;
        }
    }
`;

document.head.appendChild(style);

// ========== SCROLL INTERACTIVO EN HEADER ==========
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header-sticky');
    if (header) {
        if (window.scrollY > 50) {
            header.style.boxShadow = '0 5px 30px rgba(0, 0, 0, 0.2)';
        } else {
            header.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.1)';
        }
    }
});

// ========== LOG DE EVENTO ==========
console.log('%c🍴 Restaurante Sabores del Mundo', 'color: #e67e22; font-size: 20px; font-weight: bold;');
console.log('%cTodos los módulos cargados correctamente', 'color: #27ae60; font-size: 14px;');

