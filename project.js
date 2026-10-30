// ================== MOBILE MENU ==================
const menuIcon = document.getElementById('menu-icon');
const menuList = document.getElementById('menu-list');
const menuLinks = document.querySelectorAll('#menu-list a');

menuIcon.addEventListener('click', () => {
    menuList.classList.toggle('active');
});

menuLinks.forEach(link => {
    link.addEventListener('click', () => {
        menuList.classList.remove('active');
    });
});

// ================== DATA PROJECT ==================
// Tambahkan field "images" berupa array — bisa 1 atau lebih
const projectData = {
    p1: {
        title: "Website Liga Perkasa",
        tag: "WEB APP",
        desc: "Website ini dilengkapi fitur klasemen, jadwal pertandingan, dan profil tim yang dirancang agar informasi liga dapat diakses secara mudah, cepat, dan real-time. Hasilnya, Liga Perkasa kini memiliki platform online yang profesional untuk meningkatkan visibilitas liga dan memudahkan tim serta penggemar dalam memantau perkembangan kompetisi.",
        tech: ["Laravel", "PHP", "MySQL", "Laragon", "Node.js"],
        github: "https://github.com/azzam5432/liga_perkasa",
        images: [
            "assets/liga-perkasa.png",
            "assets/liga-perkasa2.png",
            "assets/liga-perkasa3.png",
            "assets/liga-perkasa4.png",
            "assets/liga-perkasa5.png"
        ]
    },
    p2: {
        title: "Manual Test Case Documentation",
        tag: "QA",
        desc: "Dokumentasi test case lengkap untuk aplikasi SIAMIND: functional testing, regression testing, dan bug report terstruktur. Mencakup positive & negative scenario, test data, dan expected result yang jelas.",
        tech: ["Test Case", "Bug Report", "Black-box", "Rekapitulasi"],
        github: "#",
        images: [
            "assets/bug-report.png",
            "assets/rekap-testing.png",
            "assets/test-case.png"
        ]
    }
};

// ================== FILTER PROJECTS ==================
const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');
const emptyState = document.getElementById('emptyState');

filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        filterButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.dataset.filter;
        let visibleCount = 0;

        projectCards.forEach(card => {
            const category = card.dataset.category;
            if (filter === 'all' || category === filter) {
                card.classList.remove('hidden');
                visibleCount++;
            } else {
                card.classList.add('hidden');
            }
        });

        if (emptyState) {
            emptyState.style.display = visibleCount === 0 ? 'block' : 'none';
        }
    });
});

// ================== MODAL & SLIDER ==================
const modal = document.getElementById('projectModal');
const modalClose = document.getElementById('modalClose');
const modalTag = document.getElementById('modalTag');
const modalTitle = document.getElementById('modalTitle');
const modalDesc = document.getElementById('modalDesc');
const modalTech = document.getElementById('modalTech');
const modalGithub = document.getElementById('modalGithub');
const detailButtons = document.querySelectorAll('.btn-detail');

// Elemen slider
const modalSlider = document.getElementById('modalSlider');
const modalPrev = document.getElementById('modalPrev');
const modalNext = document.getElementById('modalNext');
const modalCounter = document.getElementById('modalCounter');
const modalDots = document.getElementById('modalDots');

let currentSlide = 0;
let totalSlides = 0;
let currentImages = [];

// Render slider berdasarkan array gambar
function renderSlider(images) {
    currentImages = images && images.length ? images : ['assets/liga-perkasa.png'];
    totalSlides = currentImages.length;
    currentSlide = 0;

    // Inject gambar
    modalSlider.innerHTML = currentImages
        .map(src => `<img src="${src}" alt="Project image" draggable="false">`)
        .join('');

    // Inject dots
    modalDots.innerHTML = currentImages
        .map((_, i) => `<button class="dot ${i === 0 ? 'active' : ''}" data-index="${i}" aria-label="Gambar ${i + 1}"></button>`)
        .join('');

    // Sembunyikan tombol & dots kalau hanya 1 gambar
    if (totalSlides <= 1) {
        modalPrev.classList.add('disabled');
        modalNext.classList.add('disabled');
        modalDots.style.display = 'none';
        modalCounter.style.display = 'none';
    } else {
        modalPrev.classList.remove('disabled');
        modalNext.classList.remove('disabled');
        modalDots.style.display = 'flex';
        modalCounter.style.display = 'block';
    }

    updateSlider();
}

function updateSlider() {
    // Geser track slider
    modalSlider.style.transform = `translateX(-${currentSlide * 100}%)`;

    // Update counter
    modalCounter.textContent = `${currentSlide + 1} / ${totalSlides}`;

    // Update dots
    const dots = modalDots.querySelectorAll('.dot');
    dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === currentSlide);
    });
}

function goToSlide(index) {
    if (totalSlides === 0) return;
    if (index < 0) index = totalSlides - 1;      // wrap ke akhir
    if (index >= totalSlides) index = 0;         // wrap ke awal
    currentSlide = index;
    updateSlider();
}

// Event tombol prev/next
modalPrev.addEventListener('click', () => goToSlide(currentSlide - 1));
modalNext.addEventListener('click', () => goToSlide(currentSlide + 1));

// Event klik dots (delegasi)
modalDots.addEventListener('click', (e) => {
    const dot = e.target.closest('.dot');
    if (dot) goToSlide(parseInt(dot.dataset.index));
});

// Keyboard nav (arrow kiri/kanan saat modal aktif)
document.addEventListener('keydown', (e) => {
    if (!modal.classList.contains('active')) return;

    if (e.key === 'ArrowLeft') goToSlide(currentSlide - 1);
    if (e.key === 'ArrowRight') goToSlide(currentSlide + 1);
});

// Swipe gesture untuk mobile
let touchStartX = 0;
let touchEndX = 0;

modalSlider.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
}, { passive: true });

modalSlider.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
}, { passive: true });

function handleSwipe() {
    const diff = touchStartX - touchEndX;
    if (Math.abs(diff) < 50) return; // minimal 50px untuk dianggap swipe
    if (diff > 0) goToSlide(currentSlide + 1);  // swipe kiri → next
    else goToSlide(currentSlide - 1);            // swipe kanan → prev
}

// ================== OPEN / CLOSE MODAL ==================
function openModal(projectId, fallbackImg) {
    const data = projectData[projectId];
    if (!data) return;

    // Gambar: pakai array images, atau fallback ke gambar card
    const images = data.images && data.images.length
        ? data.images
        : (fallbackImg ? [fallbackImg] : []);

    renderSlider(images);

    modalTag.textContent = data.tag;
    modalTitle.textContent = data.title;
    modalDesc.textContent = data.desc;
    modalTech.innerHTML = data.tech.map(t => `<span>${t}</span>`).join('');
    modalGithub.href = data.github;

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
}

detailButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        const card = btn.closest('.project-card');
        const img = card ? card.querySelector('.project-image img').src : '';
        openModal(btn.dataset.project, img);
    });
});

if (modalClose) {
    modalClose.addEventListener('click', closeModal);
}

if (modal) {
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });
}

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
        closeModal();
    }
});