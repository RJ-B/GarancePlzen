document.addEventListener("DOMContentLoaded", function () {
    const timelineContainers = document.querySelectorAll(".timeline-container");

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    const timelineHor = entry.target.querySelector(".timeline-line-hor");
                    const timelineVer = entry.target.querySelector(".timeline-line-ver");

                    if (!timelineHor.classList.contains("active")) {
                        timelineHor.classList.add("active");

                        // Po dokončení první animace aktivujeme druhou
                        timelineHor.addEventListener("transitionend", function () {
                            timelineVer.classList.add("active");
                        }, { once: true });
                    }
                }
            });
        },
        { threshold: 0.5 }
    );

    timelineContainers.forEach((container) => observer.observe(container));
});
