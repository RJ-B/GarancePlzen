document.addEventListener("DOMContentLoaded", function () {
    const galleries = {
        certificates: [
            "img/facts/certificates/Certificate1.png",
            "img/facts/certificates/Certificate2.png",
            "img/facts/certificates/Certificate3.png"
        ],
        reconstruction: [
            "img/projects/projekt1.jpg",
            "img/projects/projekt2.jpg",
            "img/projects/projekt3.jpg"
        ],
        buildings: [
            "img/projects/projekt1.jpg",
            "img/projects/projekt2.jpg",
            "img/projects/projekt3.jpg"
        ]
    };

    let currentGallery = [];
    let currentIndex = 0;
    const lightboxImage = document.getElementById("lightboxImage");
    const lightboxLink = document.getElementById("lightboxLink");
    const lightboxOverlay = document.getElementById("fullscreenLightbox");

    function openLightbox(galleryKey) {
        if (!galleries[galleryKey]) return;
        currentGallery = galleries[galleryKey];
        currentIndex = 0;
        updateImage(true);
        lightboxOverlay.classList.add("active");
    }

    function closeLightbox() {
        lightboxOverlay.classList.remove("active");
    }

    function changeImage(direction) {
        if (!currentGallery.length) return;

        currentIndex += direction;
        if (currentIndex < 0) {
            currentIndex = currentGallery.length - 1;
        } else if (currentIndex >= currentGallery.length) {
            currentIndex = 0;
        }

        updateImage(false);
    }

    function updateImage(firstLoad) {
        if (!lightboxImage || !lightboxLink) return;

        lightboxImage.classList.remove("show"); // Nejprve skryjeme obrázek

        setTimeout(() => {
            lightboxImage.src = currentGallery[currentIndex];
            lightboxLink.href = currentGallery[currentIndex];

            lightboxImage.classList.add("show"); // Pak zobrazíme nový obrázek s animací
        }, firstLoad ? 0 : 300); // Počkejme 300 ms, než se zobrazí nový obrázek
    }

    document.querySelectorAll("[data-open-lightbox]").forEach(button => {
        button.addEventListener("click", function () {
            openLightbox(this.getAttribute("data-open-lightbox"));
        });
    });

    document.querySelector(".lightbox-prev").addEventListener("click", () => changeImage(-1));
    document.querySelector(".lightbox-next").addEventListener("click", () => changeImage(1));
    document.querySelector(".lightbox-close").addEventListener("click", closeLightbox);
    lightboxOverlay.addEventListener("click", function (e) {
        if (e.target === this) closeLightbox();
    });
});
