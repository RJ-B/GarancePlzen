document.addEventListener('DOMContentLoaded', function () {
    // Inicializace Bootstrap carouselu
    const carousel = document.querySelector('#carouselExample');
    if (carousel) {
        const carouselInstance = new bootstrap.Carousel(carousel, {
            interval: 5000, // Automatická změna každých 5 sekund
            ride: 'carousel' // Automatické spuštění při načtení stránky
        });
    }
});
