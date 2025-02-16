document.addEventListener("DOMContentLoaded", function () {
    // Načtení GSAP
    const script = document.createElement("script");
    script.src = "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js";
    document.head.appendChild(script);

    script.onload = function () {
        let tl = gsap.timeline();

        // Animace stavby domu
        tl.to(".walls", { opacity: 1, duration: 0.5, y: -10, ease: "power2.out" })
          .to(".roof", { opacity: 1, duration: 0.5, y: -10, ease: "power2.out" }, "-=0.3")
          .to(".door", { opacity: 1, duration: 0.4, ease: "power2.out" }, "-=0.2")
          .to(".shadow", { opacity: 1, duration: 0.4, ease: "power2.out" }, "-=0.3");

        // Po načtení stránky zmizí loader
        window.onload = function () {
            setTimeout(() => {
                document.getElementById("preloader").classList.add("preloader-hidden");
                setTimeout(() => {
                    document.getElementById("preloader").style.display = "none";
                }, 700);
            }, 1500); // Po 1.5s stavění domu loader zmizí
        };
    };
});
