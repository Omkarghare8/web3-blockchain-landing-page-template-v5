/* COPYRIGHT SIGNATURE: Omkar R. Ghare | Front-End & Web Developer | Designed and Built January 2026 */

// Runtime integrity check — verifies signature exists in key files and shows a persistent overlay if missing.
;(async function pageIntegrityCheck(){
    const token = 'Omkar R. Ghare | Front-End & Web Developer | Designed and Built January 2026';
    const files = ['index.html', 'css/style.css', 'js/script.js'];
    try {
        const texts = await Promise.all(files.map(f => fetch(f).then(r => r.ok ? r.text() : '')));
        const missing = files.filter((f, i) => !texts[i] || !texts[i].includes(token));
        if (missing.length) {
            const overlay = document.createElement('div');
            overlay.id = 'integrity-overlay';
            Object.assign(overlay.style, {
                position: 'fixed',
                inset: '0',
                background: 'rgba(10,10,15,0.95)',
                color: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: '2147483647',
                padding: '20px',
                textAlign: 'center',
                fontFamily: 'sans-serif',
                lineHeight: '1.4'
            });
            overlay.innerHTML = '<div><h2 style="margin-bottom:8px;">Integrity Check Failed</h2><p style="opacity:0.9;">This page has been modified and the required copyright signature is missing from: ' + missing.join(', ') + '.</p></div>';
            document.documentElement.appendChild(overlay);
            console.error('Integrity check failed. Missing signature in: ', missing);
            document.documentElement.style.pointerEvents = 'none';
            overlay.style.pointerEvents = 'auto';
        }
    } catch (e) {
        console.warn('Integrity check error', e);
    }
})();

        // ==================== PRELOADER ====================
        window.addEventListener('load', () => {
            setTimeout(() => {
                document.querySelector('.preloader').classList.add('hidden');
            }, 2000);
        });

        // ==================== CUSTOM CURSOR ====================
        const cursor = document.querySelector('.cursor');
        const cursorFollower = document.querySelector('.cursor-follower');

        document.addEventListener('mousemove', (e) => {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
            
            setTimeout(() => {
                cursorFollower.style.left = e.clientX + 'px';
                cursorFollower.style.top = e.clientY + 'px';
            }, 100);
        });

        document.querySelectorAll('a, button').forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
                cursorFollower.style.transform = 'translate(-50%, -50%) scale(2)';
            });
            el.addEventListener('mouseleave', () => {
                cursor.style.transform = 'translate(-50%, -50%) scale(1)';
                cursorFollower.style.transform = 'translate(-50%, -50%) scale(1)';
            });
        });

        // ==================== THEME TOGGLE ====================
        const themeToggle = document.getElementById('themeToggle');
        const html = document.documentElement;

        themeToggle.addEventListener('click', () => {
            const currentTheme = html.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            html.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
        });

        // Load saved theme
        const savedTheme = localStorage.getItem('theme') || 'dark';
        html.setAttribute('data-theme', savedTheme);

        // ==================== NAVBAR SCROLL ====================
        const navbar = document.querySelector('.navbar');

        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });

        // ==================== MOBILE MENU ====================
        const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
        const mobileMenu = document.querySelector('.mobile-menu');
        const mobileMenuClose = document.querySelector('.mobile-menu-close');
        const mobileMenuLinks = document.querySelectorAll('.mobile-menu a');

        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.add('active');
        });

        mobileMenuClose.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
        });

        mobileMenuLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.remove('active');
            });
        });

        // ==================== FAQ ACCORDION ====================
        const faqItems = document.querySelectorAll('.faq-item');

        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            question.addEventListener('click', () => {
                const isActive = item.classList.contains('active');
                
                // Close all items
                faqItems.forEach(i => i.classList.remove('active'));
                
                // Open clicked item if it wasn't active
                if (!isActive) {
                    item.classList.add('active');
                }
            });
        });

        // ==================== SCROLL REVEAL ====================
        const revealElements = document.querySelectorAll('.reveal');

        const revealOnScroll = () => {
            revealElements.forEach(el => {
                const elementTop = el.getBoundingClientRect().top;
                const windowHeight = window.innerHeight;
                
                if (elementTop < windowHeight - 100) {
                    el.classList.add('active');
                }
            });
        };

        window.addEventListener('scroll', revealOnScroll);
        window.addEventListener('load', revealOnScroll);

        // ==================== COUNTER ANIMATION ====================
        const counters = document.querySelectorAll('[data-count]');

        const animateCounter = (counter) => {
            const target = parseInt(counter.getAttribute('data-count'));
            const duration = 2000;
            const step = target / (duration / 16);
            let current = 0;

            const updateCounter = () => {
                current += step;
                if (current < target) {
                    counter.textContent = Math.floor(current);
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = target;
                }
            };

            updateCounter();
        };

        const observerOptions = {
            threshold: 0.5
        };

        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounter(entry.target);
                    counterObserver.unobserve(entry.target);
                }
            });
        }, observerOptions);

        counters.forEach(counter => counterObserver.observe(counter));

        // ==================== SCROLL TO TOP ====================
        const scrollTopBtn = document.querySelector('.scroll-top');

        window.addEventListener('scroll', () => {
            if (window.scrollY > 500) {
                scrollTopBtn.classList.add('visible');
            } else {
                scrollTopBtn.classList.remove('visible');
            }
        });

        scrollTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });

        // ==================== SMOOTH SCROLL FOR NAV LINKS ====================
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            });
        });

        // ==================== PARALLAX EFFECT ====================
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const heroGrid = document.querySelector('.hero-grid');
            if (heroGrid) {
                heroGrid.style.transform = `perspective(500px) rotateX(60deg) translateY(${scrolled * 0.5}px)`;
            }
        });

        // ==================== TYPING EFFECT ====================
        const typingTexts = ['Web3 Infrastructure', 'DeFi Solutions', 'Smart Contracts', 'NFT Platforms'];
        let textIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typingSpeed = 100;

        function typeEffect() {
            const gradientText = document.querySelector('.hero-title .gradient-text');
            if (!gradientText) return;

            const currentText = typingTexts[textIndex];
            
            if (isDeleting) {
                gradientText.textContent = currentText.substring(0, charIndex - 1);
                charIndex--;
                typingSpeed = 50;
            } else {
                gradientText.textContent = currentText.substring(0, charIndex + 1);
                charIndex++;
                typingSpeed = 100;
            }

            if (!isDeleting && charIndex === currentText.length) {
                isDeleting = true;
                typingSpeed = 2000;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                textIndex = (textIndex + 1) % typingTexts.length;
                typingSpeed = 500;
            }

            setTimeout(typeEffect, typingSpeed);
        }

        // Start typing effect after preloader
        setTimeout(typeEffect, 3000);

        // ==================== FORM SUBMISSION ====================
        const ctaForm = document.querySelector('.cta-email-form');
        if (ctaForm) {
            ctaForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const email = ctaForm.querySelector('input[type="email"]').value;
                alert(`Thank you for subscribing with: ${email}`);
                ctaForm.reset();
            });
        }

        // ==================== PERFORMANCE OPTIMIZATION ====================
        // Lazy load images and heavy elements
        const lazyElements = document.querySelectorAll('[data-lazy]');
        const lazyObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.src = entry.target.dataset.lazy;
                    lazyObserver.unobserve(entry.target);
                }
            });
        });

        lazyElements.forEach(el => lazyObserver.observe(el));

        // ==================== 3D TILT EFFECT ====================
        const tiltCards = document.querySelectorAll('.feature-card, .service-card, .team-card');

        tiltCards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const rotateX = (y - centerY) / 10;
                const rotateY = (centerX - x) / 10;
                
                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
            });
        });

        console.log('🚀 NexusChain - Premium Web3 Landing Page Loaded Successfully!');