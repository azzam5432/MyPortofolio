const menuIcon = document.getElementById('menu-icon');
const menuList = document.getElementById('menu-list');
const menuLinks = document.querySelectorAll('#menu-list a');

const container = document.getElementById('cardContainer');
const nextBtn = document.getElementById('nextBtn');
const prevBtn = document.getElementById('prevBtn');

menuIcon.addEventListener('click', () => {
    menuList.classList.toggle('active');
});

menuLinks.forEach(link => {
    link.addEventListener('click', () => {
        menuList.classList.remove('active');
    });
});

function getCardStep() {
    const card = container.querySelector('.card');
    if (!card) return 0;
    const gap = 20;
    return card.offsetWidth + gap;
}

nextBtn.addEventListener('click', () => {
    container.scrollLeft += getCardStep();
});

prevBtn.addEventListener('click', () => {
    container.scrollLeft -= getCardStep();
});

const contactForm = document.querySelector('.contact-form');
const formStatus = document.getElementById('form-status');

let statusTimer = null;
const HIDE_DELAY = 8000; 

function showStatus(message, type = 'success') {
    if (!formStatus) return;

    if (statusTimer) {
        clearTimeout(statusTimer);
        statusTimer = null;
    }

    formStatus.textContent = message;
    formStatus.style.display = 'block';

    const colors = {
        success: '#2dd4bf',
        error: '#ef4444',
        loading: '#cbd5e0'
    };
    formStatus.style.color = colors[type] || colors.success;

    if (type !== 'loading') {
        statusTimer = setTimeout(() => {
            formStatus.style.display = 'none';
            statusTimer = null;
        }, HIDE_DELAY);
    }
}

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const submitBtn = contactForm.querySelector('.btn-submit');
        const originalBtnHTML = submitBtn.innerHTML;

        submitBtn.disabled = true;
        submitBtn.style.opacity = '0.6';
        submitBtn.style.cursor = 'not-allowed';
        submitBtn.innerHTML = 'Mengirim...';
        showStatus('⏳ Sedang mengirim pesan...', 'loading');

        const data = new FormData(contactForm);

        try {
            const res = await fetch(contactForm.action, {
                method: 'POST',
                body: data,
                headers: { 'Accept': 'application/json' }
            });

            if (res.ok) {
                showStatus('Pesan berhasil dikirim! Saya akan segera membalas.', 'success');
                contactForm.reset();
            } else {
                showStatus('Gagal mengirim. Coba lagi atau hubungi via email langsung.', 'error');
            }
        } catch (err) {
            showStatus('Terjadi kesalahan jaringan. Coba lagi nanti.', 'error');
        } finally {
            submitBtn.disabled = false;
            submitBtn.style.opacity = '1';
            submitBtn.style.cursor = 'pointer';
            submitBtn.innerHTML = originalBtnHTML;
        }
    });
}