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

    // Animace obrázků
    let animationIntervals = {}; // Ukládá intervaly pro každý box

    // Spuštění animace při najetí myší
    function startAnimation(element) {
        const img = element.querySelector(".icon-animation");
        const frames = 18; // Počet snímků
        const framePath = "img/facts/build-icon/build-icon"; // Cesta k obrázkům
        let currentFrame = 1;

        animationIntervals[element] = setInterval(() => {
            img.src = `${framePath}${currentFrame}.png`; // Změna obrázku
            currentFrame++;

            if (currentFrame > frames) {
                currentFrame = 1; // Restart animace
            }
        }, 50); // Rychlejší přepínání snímků (50 ms = 20 FPS)
    }

    // Zastavení animace při odjetí myší
    function stopAnimation(element) {
        clearInterval(animationIntervals[element]); // Zastavení animace
        const img = element.querySelector(".icon-animation");
        img.src = "img/facts/build-icon/build-icon1.png"; // Vrácení na první snímek
    }

    // Přidání listenerů pro hover na všechny boxy
    const statsBoxes = document.querySelectorAll(".stats-box");
    statsBoxes.forEach((box) => {
        box.addEventListener("mouseover", function () {
            startAnimation(box);
        });
        box.addEventListener("mouseout", function () {
            stopAnimation(box);
        });
    });
});
