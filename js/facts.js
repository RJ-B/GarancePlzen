document.addEventListener("DOMContentLoaded", function () {
    let counters = document.querySelectorAll(".counter");
    let section = document.querySelector("#stats-section");
    let observer = new IntersectionObserver(
        function (entries, observer) {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    startCounters();
                    observer.disconnect(); // Spustí se jen jednou
                }
            });
        },
        { threshold: 0.5 } // Spustí se, když je 50% sekce vidět
    );

    observer.observe(section);

    function startCounters() {
        counters.forEach((counter) => {
            let target = +counter.getAttribute("data-target");
            let count = 0;
            let step = target / 100; // Rozdělíme na 100 kroků

            let updateCounter = () => {
                count += step;
                counter.textContent = Math.round(count);
                if (count < target) {
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = target;
                }
            };

            updateCounter();
        });
    }
});
