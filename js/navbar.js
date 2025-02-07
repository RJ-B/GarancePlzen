document.addEventListener('DOMContentLoaded', function () {
    initializeStickyNavbar();
    initializeMobileNavBehavior();
    initializeNavbarAnimation(); // Přidání animace pro odkazy

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
        const navbarToggler = document.querySelector('.navbar-toggler');
        const navbarCollapse = document.getElementById('navbarCollapse');
        const navLinks = document.querySelectorAll('.nav-link');

        // Zavře navbar po kliknutí na odkaz (pouze na mobilu)
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (window.innerWidth <= 991.98 && navbarCollapse.classList.contains('show')) {
                    navbarToggler.click(); // Simuluje kliknutí na tlačítko toggler
                }
            });
        });

        // Přidání efektu při otevírání navbaru
        navbarCollapse.addEventListener('show.bs.collapse', function () {
            resetNavItemsAnimation(); // Resetuje animaci před každým otevřením
            navbarCollapse.classList.add('show');
            animateNavItems(); // Spuštění animace pro jednotlivé odkazy
        });

        navbarCollapse.addEventListener('hidden.bs.collapse', function () {
            navbarCollapse.classList.remove('show');
        });
    }

    function initializeNavbarAnimation() {
        const navbarCollapse = document.getElementById('navbarCollapse');

        // Pokud je navbar viditelný při načtení stránky (např. na desktopu), spustí animaci
        if (window.innerWidth > 991.98) {
            navbarCollapse.classList.add('show');
            animateNavItems();
        }
    }

    function animateNavItems() {
        const navItems = document.querySelectorAll('.navbar-nav .nav-item');

        navItems.forEach((item, index) => {
            setTimeout(() => {
                item.style.opacity = "1";
                item.style.transform = "translateY(0)";
            }, 100 * (index + 1)); // Postupné zpoždění
        });
    }

    function resetNavItemsAnimation() {
        const navItems = document.querySelectorAll('.navbar-nav .nav-item');

        // Resetuje animaci před každým novým otevřením
        navItems.forEach((item) => {
            item.style.opacity = "0";
            item.style.transform = "translateY(-15px)";
        });
    }
});
