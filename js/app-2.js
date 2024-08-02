// --------------------- Navigation ---------------------

const MainNavButton = document.getElementById('main-nav-btn');
const MainNav = document.getElementById('main-nav');
const Body = document.querySelector('body');
const MainNavLinks = document.querySelectorAll('.main-nav a');
const header = document.querySelector('header');

for(let i = 0; i < MainNavLinks.length; i++){
    MainNavLinks[i].addEventListener('click', toggleNav);
}

function toggleNav() {
    MainNav.classList.toggle('active');
    MainNavButton.classList.toggle('active');
    Body.classList.toggle('no-scroll');
    header.classList.toggle('active');
}

MainNavButton.addEventListener('click', toggleNav);#




