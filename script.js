/* 
 * Majestic Lime International - Functionality
 * Author: Antigravity
 */

document.addEventListener('DOMContentLoaded', () => {
    initCanvasAnimation();
    initWhatsAppLogic();
    initVideoSequence();
    initAccordion();
    initContactForm(); // Handle AJAX form submission
    initVideoLazyLoading();
});

/* =========================================
   0. Video Lazy Loading & Performance
   ========================================= */
function initVideoLazyLoading() {
    const videoPain = document.getElementById('bg-video-pain');
    const videoPersonas = document.getElementById('bg-video-personas');
    const sectionPain = document.querySelector('.section-pain-points');
    const sectionPersonas = document.querySelector('.section-personas');

    // Observer for Pain Points section
    if (videoPain && sectionPain) {
        const observerPain = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    if (videoPain.paused) {
                        videoPain.play().catch(err => console.log("Pain video play prevented:", err));
                    }
                } else {
                    if (!videoPain.paused) {
                        videoPain.pause();
                    }
                }
            });
        }, { threshold: 0.1 });
        observerPain.observe(sectionPain);
    }

    // Observer for Personas section
    if (videoPersonas && sectionPersonas) {
        const observerPersonas = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    if (videoPersonas.paused) {
                        videoPersonas.play().catch(err => console.log("Personas video play prevented:", err));
                    }
                } else {
                    if (!videoPersonas.paused) {
                        videoPersonas.pause();
                    }
                }
            });
        }, { threshold: 0.1 });
        observerPersonas.observe(sectionPersonas);
    }
}

/* =========================================
   1. AI Money Flow Animation (Canvas)
   ========================================= */
function initCanvasAnimation() {
    const canvas = document.getElementById('ai-canvas');
    const ctx = canvas.getContext('2d');

    let width, height;
    let particles = [];

    // Configuration
    const particleCount = 60;
    const connectionDistance = 150;
    const accentColor = '132, 204, 22'; // Lime 500 equivalent in RGB

    function resize() {
        width = window.innerWidth;
        height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;
    }

    window.addEventListener('resize', resize);
    resize();

    class Particle {
        constructor() {
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            this.vx = (Math.random() - 0.5) * 0.5;
            this.vy = (Math.random() - 0.5) * 0.5;
            this.size = Math.random() * 2 + 1;
        }

        update() {
            this.x += this.vx;
            this.y += this.vy;

            // Bounce off edges
            if (this.x < 0 || this.x > width) this.vx *= -1;
            if (this.y < 0 || this.y > height) this.vy *= -1;
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${accentColor}, 0.5)`;
            ctx.fill();
        }
    }

    // Initialize particles
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }

    function animate() {
        ctx.clearRect(0, 0, width, height);

        // Update and draw particles
        particles.forEach(p => {
            p.update();
            p.draw();
        });

        // Draw connections (Neural Network style)
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < connectionDistance) {
                    ctx.beginPath();
                    ctx.strokeStyle = `rgba(${accentColor}, ${1 - distance / connectionDistance})`;
                    ctx.lineWidth = 1;
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }
        }

        requestAnimationFrame(animate);
    }

    animate();
}


/* =========================================
   2. WhatsApp Intelligent Logic
   ========================================= */
function initWhatsAppLogic() {
    const phoneNumber = '51929838465';
    const triggers = document.querySelectorAll('.contact-trigger');

    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

    const whatsappUrl = isMobile
        ? `https://wa.me/${phoneNumber}`
        : `https://web.whatsapp.com/send?phone=${phoneNumber}`;

    triggers.forEach(btn => {
        btn.addEventListener('click', (e) => {
            // Note: If the button is inside a form (submit), we don't prevent default.
            // But if it's a contact button, we redirect.
            if (!btn.closest('form')) {
                e.preventDefault();
                window.open(whatsappUrl, '_blank');
            }
        });
    });
}

/* =========================================
   3. Video Sequence Modal
   ========================================= */
function initVideoSequence() {
    const modal = document.getElementById('video-modal');
    const iframe = document.getElementById('video-frame');
    const startBtn = document.getElementById('start-video-sequence');
    const closeBtn = document.getElementById('close-modal-btn');
    const actionBtn = document.getElementById('modal-action-btn');
    const statusText = document.getElementById('modal-status-text');

    // Video IDs (Vimeo)
    const videos = [
        '1150436654', // Video 1
        '1150437188', // Video 2
        '1150444943'  // Video 3
    ];

    let currentStep = 0;

    function loadVideo(index) {
        iframe.src = `https://player.vimeo.com/video/${videos[index]}?autoplay=1`;
        statusText.innerText = `Video ${index + 1} de ${videos.length}`;

        if (index === videos.length - 1) {
            actionBtn.innerHTML = 'Quiero iniciar ya <i class="fa-brands fa-whatsapp"></i>';
        } else {
            actionBtn.innerHTML = 'Quiero ver el siguiente vídeo <i class="fa-solid fa-arrow-right"></i>';
        }
    }

    startBtn.addEventListener('click', () => {
        currentStep = 0;
        modal.classList.add('show-modal');
        loadVideo(currentStep);
    });

    const painPointsBtn = document.getElementById('pain-points-video-btn');
    if (painPointsBtn) {
        painPointsBtn.addEventListener('click', () => {
            currentStep = 0;
            modal.classList.add('show-modal');
            loadVideo(currentStep);
        });
    }

    const personasBtn = document.getElementById('personas-video-btn');
    if (personasBtn) {
        personasBtn.addEventListener('click', () => {
            currentStep = 0;
            modal.classList.add('show-modal');
            loadVideo(currentStep);
        });
    }

    closeBtn.addEventListener('click', () => {
        modal.classList.remove('show-modal');
        iframe.src = ''; // Stop video
    });

    // Close on background click
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('show-modal');
            iframe.src = '';
        }
    });

    actionBtn.addEventListener('click', () => {
        if (currentStep < videos.length - 1) {
            currentStep++;
            loadVideo(currentStep);
        } else {
            // Final step: Go to WhatsApp
            const phoneNumber = '51929838465';
            const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
            const url = isMobile
                ? `https://wa.me/${phoneNumber}?text=Hola, he visto los 3 videos y quiero iniciar ya.`
                : `https://web.whatsapp.com/send?phone=${phoneNumber}&text=Hola, he visto los 3 videos y quiero iniciar ya.`;

            window.open(url, '_blank');
            modal.classList.remove('show-modal');
            iframe.src = '';
        }
    });
}

/* =========================================
   4. FAQ Accordion
   ========================================= */
function initAccordion() {
    const items = document.querySelectorAll('.accordion-item');

    items.forEach(item => {
        const header = item.querySelector('.accordion-header');

        header.addEventListener('click', () => {
            // Close other items (optional - accordion behavior)
            items.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });

            // Toggle current
            item.classList.toggle('active');
        });
    });
}

/* =========================================
   5. AJAX Contact Form Submission
   ========================================= */
function initContactForm() {
    const form = document.getElementById('contact-form');
    // Guard: Ensure we only initialize once
    if (!form || form.dataset.initialized) return;
    form.dataset.initialized = "true";

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        e.stopImmediatePropagation();

        const submitBtn = form.querySelector('button[type="submit"]');
        if (submitBtn.disabled) return;

        const originalBtnContent = submitBtn.innerHTML;

        // Visual feedback
        submitBtn.disabled = true;
        submitBtn.innerHTML = 'Procesando... <i class="fa-solid fa-spinner fa-spin"></i>';

        const formData = new FormData(form);

        try {
            const response = await fetch(form.action, {
                method: 'POST',
                body: formData
            });

            if (!response.ok) {
                throw new Error(`Error de servidor: ${response.status}`);
            }

            const data = await response.json();

            if (data.rpta === 'ok') {
                showNotification('success', '¡Excelente!', data.mensaje || 'Información enviada con éxito. Pronto nos contactaremos contigo.');
                form.reset();
            } else {
                showNotification('error', 'Algo ocurrió', data.mensaje || 'No pudimos procesar tu solicitud en este momento.');
            }

        } catch (error) {
            console.error('Submission Error:', error);
            showNotification('error', 'Error de envío', `No se pudo enviar la información: ${error.message}. Por favor, verifica tu conexión o intenta más tarde.`);
        } finally {
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalBtnContent;
        }
    });
}

/* =========================================
   6. Professional Notifications (Modals)
   ========================================= */
function showNotification(type, title, message) {
    const modal = document.getElementById('notification-modal');
    const icon = document.getElementById('notification-icon');
    const titleEl = document.getElementById('notification-title');
    const messageEl = document.getElementById('notification-message');
    const closeBtn = document.getElementById('notification-close-btn');

    if (!modal) return;

    // Set content based on type
    if (type === 'success') {
        icon.innerHTML = '<i class="fa-solid fa-circle-check" style="color: #22c55e;"></i>';
        titleEl.style.color = '#16a34a';
    } else {
        icon.innerHTML = '<i class="fa-solid fa-circle-exclamation" style="color: #ef4444;"></i>';
        titleEl.style.color = '#dc2626';
    }

    titleEl.innerText = title;
    messageEl.innerText = message;

    modal.classList.add('show-modal');

    // Close logic
    const closeHandler = () => {
        modal.classList.remove('show-modal');
        closeBtn.removeEventListener('click', closeHandler);
    };

    closeBtn.onclick = closeHandler;

    // Also close on background click
    modal.onclick = (e) => {
        if (e.target === modal) closeHandler();
    };
}
