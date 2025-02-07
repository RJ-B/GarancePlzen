document.addEventListener("DOMContentLoaded", function () {
    function updateCarouselHeight() {
        var navbarHeight = document.querySelector(".navbar").offsetHeight;
        var swiperContainer = document.querySelector(".swiper-container");
        swiperContainer.style.height = `calc(100vh - ${navbarHeight}px)`;
    }

    updateCarouselHeight();
    window.addEventListener("resize", updateCarouselHeight);

    var swiper = new Swiper(".swiper-container", {
        loop: true,
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        },
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
        effect: "cube", // 3D kostka
        speed: 1000, // Zpomalení animace přechodu (1 sekunda)
        cubeEffect: {
            shadow: false, // Bez stínů
            slideShadows: false,
        },
        grabCursor: true,
        on: {
            slideChangeTransitionStart: function () {
                // Reset animací textu a skrytí textových prvků
                document.querySelectorAll(".swiper-slide .overlay h3, .swiper-slide .overlay p, .swiper-slide .overlay a").forEach((el) => {
                    el.classList.remove("animate__animated", "animate__fadeInUp");
                    el.style.opacity = "0";
                });
            },
            slideChangeTransitionEnd: function () {
                // Aktualizuje AOS, aby se animace správně zobrazily
                AOS.refresh();

                // Aktivace animace textu se zpožděním
                var activeSlide = document.querySelector(".swiper-slide-active .overlay");
                if (activeSlide) {
                    setTimeout(() => {
                        activeSlide.querySelector("h3").classList.add("animate__animated", "animate__fadeInUp");
                        activeSlide.querySelector("h3").style.opacity = "1";
                    }, 200);

                    setTimeout(() => {
                        activeSlide.querySelector("p").classList.add("animate__animated", "animate__fadeInUp");
                        activeSlide.querySelector("p").style.opacity = "1";
                    }, 400);

                    setTimeout(() => {
                        activeSlide.querySelector("a").classList.add("animate__animated", "animate__fadeInUp");
                        activeSlide.querySelector("a").style.opacity = "1";
                    }, 600);
                }
            },
        },
    });

    // Inicializace AOS s nastavením správné doby animace a spuštění při každém slideChange
    AOS.init({
        duration: 1000, // Délka animace
        once: false, // Umožní opakované spouštění animace při změně slidu
    });
});
