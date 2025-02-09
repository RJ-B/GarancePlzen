document.addEventListener("DOMContentLoaded", function() {
    let footer = document.getElementById("footer");
    
    if (footer) {
        AOS.init({
            duration: 800, // Délka animace v milisekundách
            once: true, // Animace se spustí pouze jednou
            disable: function () {
                return window.innerWidth < 768; // Deaktivace animací na mobilech
            }
        });
    }
});
