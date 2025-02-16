document.addEventListener('DOMContentLoaded', function () {
    initializeStickyNavbar();
    initializeMobileNavBehavior();
    initializeBurgerMenu();

    function initializeStickyNavbar() {
        const navbar = document.querySelector('.navbar');
        let lastScrollY = window.scrollY;

        window.addEventListener('scroll', () => {
            const currentScrollY = window.scrollY;

            if (currentScrollY > lastScrollY && currentScrollY > 50) {
                navbar.style.top = '-80px'; // Skryje navbar při scrollování dolů
            } else {
                navbar.style.top = '0'; // Zobrazí navbar při scrollování nahoru
            }
            lastScrollY = currentScrollY;
        });
    }

    function initializeMobileNavBehavior() {
        const navbarToggler = document.querySelector('.custom-toggler');
        const navbarCollapse = document.getElementById('navbarCollapse');
        const navItems = document.querySelectorAll('.navbar-nav .nav-item');

        if (!navbarToggler || !navbarCollapse) return;

        // **Sledujeme změny v navbarCollapse a aktivujeme animaci v CSS**
        const observer = new MutationObserver(() => {
            if (navbarCollapse.classList.contains("show")) {
                navItems.forEach((item, index) => {
                    item.style.opacity = "1"; // Ukáže položky menu
                });
            } else {
                navItems.forEach(item => {
                    item.style.opacity = "0"; // Skryje položky menu
                });
            }
        });

        observer.observe(navbarCollapse, { attributes: true });

        // **Zavře navbar po kliknutí na odkaz (pouze na mobilu)**
        navItems.forEach(link => {
            link.addEventListener('click', () => {
                if (window.innerWidth <= 991.98 && navbarCollapse.classList.contains('show')) {
                    navbarToggler.click();
                }
            });
        });
    }

    function initializeBurgerMenu() {
        const navbarToggler = document.querySelector('.custom-toggler');

        if (!navbarToggler) return;

        // Přidání animace burger menu při kliknutí
        navbarToggler.addEventListener('click', () => {
            const expanded = navbarToggler.getAttribute('aria-expanded') === 'true';
            navbarToggler.setAttribute('aria-expanded', !expanded);
        });
    }
});
