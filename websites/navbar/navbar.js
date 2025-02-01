document.addEventListener('DOMContentLoaded', function () {
    // Inicializace chování navbaru
    initializeStickyNavbar();
    initializeMobileNavClose(); // Funkce pro zavírání navbaru při kliknutí na odkaz

    function initializeStickyNavbar() {
        const navbar = document.querySelector('.navbar');
        let lastScrollY = window.scrollY;

        // Skrývání a zobrazování navbaru při scrollování
        window.addEventListener('scroll', () => {
            const currentScrollY = window.scrollY;

            if (currentScrollY > lastScrollY && currentScrollY > 50) {
                navbar.style.top = '-80px'; // Skryje navbar
            } else {
                navbar.style.top = '0'; // Zobrazí navbar
            }
            lastScrollY = currentScrollY;
        });
    }

    function initializeMobileNavClose() {
        const navbarToggler = document.querySelector('.navbar-toggler');
        const navbarCollapse = document.getElementById('navbarCollapse');
        const navLinks = document.querySelectorAll('.nav-link');

        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                // Zavře navbar na mobilu, pokud je otevřen
                if (window.innerWidth <= 991.98 && navbarCollapse.classList.contains('show')) {
                    navbarCollapse.classList.add('collapsing'); // Přidá smooth efekt
                    navbarToggler.click(); // Simuluje kliknutí na tlačítko toggler

                    // Po krátkém čase odebere efekt
                    setTimeout(() => {
                        navbarCollapse.classList.remove('collapsing');
                    }, 350); // Odpovídá délce přechodu
                }
            });
        });
    }
});
