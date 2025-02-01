document.addEventListener('DOMContentLoaded', function () {
    // Automatické zavření mobilního menu po kliknutí na odkaz
    document.querySelectorAll('.nav-link').forEach(item => {
        item.addEventListener('click', () => {
            document.querySelector('.navbar-collapse').classList.remove('show');
        });
    });
});
