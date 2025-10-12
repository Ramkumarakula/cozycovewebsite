// ===== MAIN JAVASCRIPT FOR COZY COVE INTERIORS =====

document.addEventListener('DOMContentLoaded', function() {
    // Initialize libraries
    AOS.init({
        duration: 800,
        easing: 'ease-out-cubic',
        once: true,
        offset: 100
    });

    GLightbox({
        loop: true
    });

    // Initialize custom components
    initNavigation();
    initBeforeAfterSlider();
    initBlogModals();
    initSmoothScrolling();
    initContactForm(); // UPDATED FUNCTION NAME
});


// ===== NAVIGATION FUNCTIONALITY =====
function initNavigation() {
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');
    const menuToggle = document.querySelector('.navbar-toggle');
    const navMenu = document.querySelector('.navbar-menu');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.boxShadow = 'var(--shadow-md)';
        } else {
            navbar.style.boxShadow = 'none';
        }
    });

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (scrollY >= (sectionTop - 150)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current) && current) {
                link.classList.add('active');
            }
        });
    });
    
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });

        navMenu.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                menuToggle.classList.remove('active');
            });
        });
    }
}

// ===== BEFORE/AFTER SLIDER FUNCTIONALITY =====
function initBeforeAfterSlider() {
    const sliderContainer = document.querySelector('.slider-container');
    if (!sliderContainer) return;

    const sliderHandle = sliderContainer.querySelector('.slider-handle');
    const imageAfter = sliderContainer.querySelector('.image-after');
    
    let isSliding = false;

    function updateSlider(clientX) {
        const rect = sliderContainer.getBoundingClientRect();
        let x = clientX - rect.left;
        let percentage = (x / rect.width) * 100;
        percentage = Math.max(0, Math.min(100, percentage));
        
        sliderHandle.style.left = `${percentage}%`;
        imageAfter.style.clipPath = `inset(0 ${100 - percentage}% 0 0)`;
    }

    sliderContainer.addEventListener('mousedown', () => { isSliding = true; });
    document.addEventListener('mousemove', (e) => { if (isSliding) updateSlider(e.clientX); });
    document.addEventListener('mouseup', () => { isSliding = false; });
    
    sliderContainer.addEventListener('touchstart', (e) => { isSliding = true; updateSlider(e.touches[0].clientX); });
    document.addEventListener('touchmove', (e) => { if (isSliding) updateSlider(e.touches[0].clientX); });
    document.addEventListener('touchend', () => { isSliding = false; });
}

// ===== BLOG MODAL FUNCTIONALITY =====
function initBlogModals() {
    const modal = document.getElementById('blogModal');
    if (!modal) return;

    const modalCategory = document.getElementById('modalCategory');
    const modalTitle = document.getElementById('modalTitle');
    const modalText = document.getElementById('modalText');
    const modalLink = document.getElementById('modalLink');
    const closeButton = modal.querySelector('.blog-modal-close');
    const overlay = modal.querySelector('.blog-modal-overlay');
    const blogLinks = document.querySelectorAll('.blog-card .blog-link-wrapper');

    const blogContent = {
        minimalism: { category: "Design Trends", title: "Warm Minimalism: The Perfect Balance", text: "Warm Minimalism is more than an aesthetic; it's a philosophy of creating intentional spaces...", link: "https://www.thespruce.com/warm-minimalism-7552202" },
        colors: { category: "Color Theory", title: "The Psychology of Luxury Colors", text: "Certain colors evoke a sense of luxury due to their historical rarity and psychological impact...", link: "https://www.architecturaldigest.com/story/color-psychology-interior-design" },
        sustainability: { category: "Sustainability", title: "Eco-Luxury: Sustainable Premium Design", text: "Eco-luxury proves that sustainability and high-end design can coexist beautifully...", link: "https://www.elledecor.com/design-decorate/interior-designers/a40325177/what-is-sustainable-design/" }
    };

    blogLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const contentKey = this.getAttribute('data-content');
            const content = blogContent[contentKey];
            if (content) {
                modalCategory.textContent = content.category;
                modalTitle.textContent = content.title;
                modalText.textContent = content.text;
                modalLink.href = content.link;
                modal.classList.add('active');
            }
        });
    });

    function closeModal() { modal.classList.remove('active'); }
    closeButton.addEventListener('click', closeModal);
    overlay.addEventListener('click', closeModal);
}

// ===== CONTACT FORM SUBMISSION =====
function initContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;

    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const submitButton = form.querySelector('button[type="submit"]');
        const formData = new FormData(form);

        submitButton.textContent = 'Sending...';
        submitButton.disabled = true;

        try {
            const response = await fetch(form.action, {
                method: form.method,
                body: formData,
                headers: { 'Accept': 'application/json' }
            });

            if (response.ok) {
                submitButton.textContent = 'Message Sent!';
                submitButton.style.backgroundColor = '#4CAF50';
                form.reset();
            } else {
                throw new Error('Server error.');
            }
        } catch (error) {
            submitButton.textContent = 'Oops! Try Again.';
            submitButton.style.backgroundColor = '#D32F2F';
        } finally {
            setTimeout(() => {
                submitButton.textContent = 'Start Your Project';
                submitButton.disabled = false;
                submitButton.style.backgroundColor = ''; 
            }, 4000);
        }
    });
}

// ===== SMOOTH SCROLLING =====
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId.length > 1) {
                document.querySelector(targetId).scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}