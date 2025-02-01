"use strict";

// Spinner
var spinner = function () {
    setTimeout(function () {
        var spinnerElement = document.getElementById('spinner');
        if (spinnerElement) {
            spinnerElement.classList.remove('show');
        }
    }, 1);
};
spinner();

document.addEventListener('DOMContentLoaded', function () {
    // Vybereme všechny prvky, které mají animace
    const animatedElements = document.querySelectorAll('.form-animate, .item-animate, .navbar-animate');

    // Intersection Observer pro animace při scrollování
    const observer = new IntersectionObserver(
        (entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add(
                        entry.target.classList.contains('form-animate') ? 'form-visible' : 'visible'
                    );
                    observer.unobserve(entry.target); // Přestane sledovat po animaci
                }
            });
        },
        { threshold: 0.5 } // Aktivace při viditelnosti 50 %
    );

    // Sledujeme všechny nalezené prvky
    animatedElements.forEach(element => observer.observe(element));
});





// Back to top button
var backToTopButton = document.querySelector('.back-to-top');
if (backToTopButton) {
    window.addEventListener('scroll', function () {
        backToTopButton.style.display = window.scrollY > 300 ? 'block' : 'none';
    });

    backToTopButton.addEventListener('click', function (e) {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// Testimonials carousel
var testimonials = document.querySelector('.testimonial-carousel');
if (testimonials) {
    new OwlCarousel(testimonials, {
        autoplay: true,
        smartSpeed: 1000,
        items: 1,
        dots: false,
        loop: true,
        nav: true,
        navText: [
            '<i class="bi bi-chevron-left"></i>',
            '<i class="bi bi-chevron-right"></i>'
        ]
    });
}
