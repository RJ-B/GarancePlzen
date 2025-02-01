document.addEventListener('DOMContentLoaded', function () {
    // Inicializace lightboxů
    initializeLightbox();

    // Funkce pro inicializaci lightboxů
    function initializeLightbox() {
        // Data pro obrázky jednotlivých projektů
        const projectData = {
            preslovka: {
                title: "Galerie Preslovka",
                images: [
                    "img/projects/stavba1.jpeg",
                    "img/project-gallery/preslovka2.jpg"
                ]
            },
            mesice: {
                title: "Galerie Měšice",
                images: [
                    "img/project-gallery/mesice1.jpg",
                    "img/project-gallery/mesice2.jpg"
                ]
            },
            plzen: {
                title: "Galerie Plzeň",
                images: [
                    "img/project-gallery/plzen1.jpg",
                    "img/project-gallery/plzen2.jpg"
                ]
            }
        };

        // Otevření lightboxu s dynamickým obsahem
        function openLightbox(projectKey) {
            const modalTitle = document.getElementById("lightboxModalLabel");
            const carouselInner = document.querySelector("#lightboxCarousel .carousel-inner");

            // Vymaže předchozí obsah
            carouselInner.innerHTML = "";

            // Nastaví nový obsah
            const project = projectData[projectKey];
            modalTitle.textContent = project.title;

            project.images.forEach((imageSrc, index) => {
                const carouselItem = document.createElement("div");
                carouselItem.classList.add("carousel-item");
                if (index === 0) carouselItem.classList.add("active");

                const img = document.createElement("img");
                img.src = imageSrc;
                img.classList.add("d-block", "w-100");
                img.alt = `${project.title} Obrázek ${index + 1}`;

                carouselItem.appendChild(img);
                carouselInner.appendChild(carouselItem);
            });

            // Zobrazí lightbox
            const lightboxModal = new bootstrap.Modal(document.getElementById("lightboxModal"));
            lightboxModal.show();
        }

        // Event listener pro každý box projektu
        document.querySelectorAll('.project-container').forEach((box) => {
            box.addEventListener('click', (e) => {
                e.preventDefault();
                const projectKey = box.getAttribute('href').replace('.html', ''); // Odstraní ".html"
                openLightbox(projectKey);
            });
        });
    }
});
