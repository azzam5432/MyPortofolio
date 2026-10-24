const menuicon = document.getElementById("menu-icon");
const menulist = document.getElementById("menu-list");
const container = document.getElementById('cardContainer');
const nextBtn = document.getElementById('nextBtn');
const prevBtn = document.getElementById('prevBtn');
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

nextBtn.addEventListener('click', () => {
    const cardWidth = container.querySelector('.card').offsetWidth + 20; 
    container.scrollLeft += cardWidth;
});

prevBtn.addEventListener('click', () => {
    const cardWidth = container.querySelector('.card').offsetWidth + 20;
    container.scrollLeft -= cardWidth;
});
menuicon.addEventListener("click", () => {
    menulist.classList.toggle("hidden")
})