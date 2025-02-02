document.addEventListener("DOMContentLoaded", function () {
    new Swiper(".mySwiper", {
        loop: true, // Nekonečný loop
        autoplay: {
            delay: 5000, // Automatická změna každých 5 sekund
            disableOnInteraction: false // Nepřestane při kliknutí
        },
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev"
        },
        pagination: {
            el: ".swiper-pagination",
            clickable: true
        }
    });
});
