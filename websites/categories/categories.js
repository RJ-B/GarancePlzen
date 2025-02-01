document.addEventListener('DOMContentLoaded', function () {
    const formFields = document.querySelectorAll('.categories-animate');

    const observer = new IntersectionObserver(
        (entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('categories-visible');
                    observer.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.5 } // Aktivace při viditelnosti 50 %
    );

    formFields.forEach(field => observer.observe(field));
});
