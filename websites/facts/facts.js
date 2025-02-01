document.addEventListener('DOMContentLoaded', function () {
    // Inicializace Intersection Observer
    initializeObserver();

    // Přidání event listeneru pro otevření modálu
    initializeModal();

    // Funkce pro inicializaci Intersection Observer
    function initializeObserver() {
        const factsSection = document.getElementById('facts-container'); // Sledujeme #facts-container
        const counters = document.querySelectorAll('[data-toggle="counter-up"]'); // Vybereme všechny čítače

        // Funkce pro odpočítávání
        const startCounting = (counter) => {
            const target = parseInt(counter.getAttribute('data-target'), 10); // Cílová hodnota
            const speed = parseFloat(counter.getAttribute('data-speed'), 10) || 1; // Rychlost v sekundách
            const interval = 10; // Interval v milisekundách
            const increment = target / (speed * 1000 / interval); // Velikost kroku
            let count = 0;

            const updateCount = () => {
                count += increment;
                if (count >= target) {
                    counter.innerText = target; // Nastaví konečnou hodnotu
                } else {
                    counter.innerText = Math.ceil(count); // Zobrazí aktuální hodnotu
                    setTimeout(updateCount, interval);
                }
            };

            updateCount();
        };

        // Intersection Observer pro sledování viditelnosti
        const observer = new IntersectionObserver(
            (entries, observer) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        counters.forEach(startCounting); // Spustíme odpočítávání
                        observer.unobserve(entry.target); // Přestane sledovat
                    }
                });
            },
            { threshold: 0.5 } // Spustí se při viditelnosti 50 % sekce
        );

        // Přidáme sekci k observeru
        if (factsSection) {
            observer.observe(factsSection);
        }
    }

    // Funkce pro inicializaci modálu
    function initializeModal() {
        const modalOpenButton = document.getElementById('openCertifikatyModal');
        const modalElement = document.getElementById('certifikatyModal');

        if (modalOpenButton && modalElement) {
            const modal = new bootstrap.Modal(modalElement);
            modalOpenButton.addEventListener('click', function () {
                modal.show();
            });
        }
    }
});
