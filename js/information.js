document.addEventListener("DOMContentLoaded", function () {
    AOS.init({
        duration: 800,
        offset: 100,
    });

    // Po dokončení AOS resetujeme transform, ale s mírným zpožděním
    setTimeout(() => {
        document.querySelectorAll(".card").forEach(card => {
            card.style.transition = "transform 0.5s ease-out, box-shadow 0.5s ease-out"; // Přechod po AOS
            card.style.transform = "none"; // Reset transformace plynule
        });
    }, 1200); // Po 1.2s, aby AOS animace stihla doběhnout
});
