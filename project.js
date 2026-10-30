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

// ================== DATA PROJECT (untuk modal) ==================
const projectData = {
    p1: {
        title: "Website Liga Perkasa",
        tag: "WEB APP",
        desc: "Website ini dilengkapi fitur klasemen, jadwal pertandingan, dan profil tim yang dirancang agar informasi liga dapat diakses secara mudah, cepat, dan real-time. Hasilnya, Liga Perkasa kini memiliki platform online yang profesional untuk meningkatkan visibilitas liga dan memudahkan tim serta penggemar dalam memantau perkembangan kompetisi.",
        tech: ["Laravel", "PHP", "MySQL", "Laragon", "Node.js"],
        github: "https://github.com/azzam5432/liga_perkasa"
    },
    p2: {
        title: "Manual Test Case Documentation",
        tag: "QA",
        desc: "Dokumentasi test case lengkap untuk aplikasi e-commerce: functional testing, regression testing, dan bug report terstruktur. Mencakup positive & negative scenario, test data, dan expected result yang jelas.",
        tech: ["Test Case", "Bug Report", "Black-box", "Rekapitulasi"],
        github: "#"
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

// ================== MODAL DETAIL ==================
const modal = document.getElementById('projectModal');
const modalClose = document.getElementById('modalClose');
const modalImage = document.getElementById('modalImage');
const modalTag = document.getElementById('modalTag');
const modalTitle = document.getElementById('modalTitle');
const modalDesc = document.getElementById('modalDesc');
const modalTech = document.getElementById('modalTech');
const modalGithub = document.getElementById('modalGithub');
const detailButtons = document.querySelectorAll('.btn-detail');

function openModal(projectId, imgSrc) {
    const data = projectData[projectId];
    if (!data) return;

    modalImage.src = imgSrc;
    modalImage.alt = data.title;
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