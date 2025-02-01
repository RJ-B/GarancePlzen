document.addEventListener('DOMContentLoaded', function () {
    const formFields = document.querySelectorAll('.form-animate');

    const observer = new IntersectionObserver(
        (entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('form-visible');
                    observer.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.5 } // Aktivace při viditelnosti 50 %
    );

    formFields.forEach(field => observer.observe(field));

    // Inicializace EmailJS
    emailjs.init('p3SkHlwAZwTqrKqpj'); // Tvůj veřejný klíč

    // Spustíme funkci pro inicializaci formuláře
    initializeForm();
});

// Funkce pro inicializaci formuláře a jeho funkcionality
function initializeForm() {
    const form = document.getElementById('quote-form');
    const submitButton = document.querySelector('#quote-form button[type="submit"]'); // Tlačítko odeslat

    if (form) {
        form.addEventListener('submit', function (e) {
            e.preventDefault(); // Zabrání obnovení stránky

            // Zakázat tlačítko odeslání, aby se předešlo vícenásobnému odeslání
            if (submitButton) {
                submitButton.disabled = true;
                submitButton.textContent = 'Odesílám...'; // Změna textu na tlačítku
            }

            // Odeslání dat na EmailJS
            emailjs.sendForm('service_is6wvmn', 'template_167ds8x', form)
                .then(function () {
                    alert('E-mail byl úspěšně odeslán, brzy se Vám ozveme.');
                    form.reset(); // Vyprázdní formulář

                    // Povolit tlačítko znovu
                    if (submitButton) {
                        submitButton.disabled = false;
                        submitButton.textContent = 'Odeslat'; // Původní text na tlačítku
                    }
                }, function () {
                    alert('Chyba při odesílání e-mailu. Zkuste to prosím později.');

                    // Povolit tlačítko znovu v případě chyby
                    if (submitButton) {
                        submitButton.disabled = false;
                        submitButton.textContent = 'Odeslat'; // Původní text na tlačítku
                    }
                });
        });
    }

    // Výchozí texty pro jednotlivá pole
    const defaultTexts = {
        gname: "Jméno a příjmení",
        gmail: "Email",
        cname: "Telefonní číslo",
        message: "Vaše zpráva"
    };

    // Přidání placeholderů do formulářových polí
    Object.keys(defaultTexts).forEach((id) => {
        const field = document.getElementById(id);
        if (field) {
            field.value = defaultTexts[id];

            field.addEventListener('focus', function () {
                if (field.value === defaultTexts[id]) {
                    field.value = "";
                }
            });

            field.addEventListener('blur', function () {
                if (field.value === "") {
                    field.value = defaultTexts[id];
                }
            });
        }
    });

    // Formátování telefonního čísla
    const phoneField = document.getElementById('cname');
    if (phoneField) {
        phoneField.addEventListener('input', function () {
            formatPhoneNumber(phoneField);
        });

        phoneField.addEventListener('focus', function () {
            showPhoneNumberGuide();
        });

        phoneField.addEventListener('blur', function () {
            validatePhoneNumber(phoneField);
        });
    }
}

// Formátování telefonního čísla
function formatPhoneNumber(input) {
    let phoneNumber = input.value.replace(/\D/g, ''); // Odstranění všech nečíselných znaků

    if (phoneNumber.length <= 3) {
        input.value = phoneNumber;
    } else if (phoneNumber.length <= 6) {
        input.value = phoneNumber.replace(/(\d{3})(\d{0,3})/, '$1 $2');
    } else {
        input.value = phoneNumber.replace(/(\d{3})(\d{3})(\d{0,3})/, '$1 $2 $3');
    }
}

// Zobrazení nápovědy pro telefonní číslo
function showPhoneNumberGuide() {
    const guide = document.getElementById('phone-guide');
    if (guide) {
        guide.style.display = 'block';
    }
}

// Validace telefonního čísla
function validatePhoneNumber(input) {
    const error = document.getElementById('phone-error');
    const guide = document.getElementById('phone-guide');
    const phoneNumber = input.value.replace(/\D/g, ''); // Odstranění všech nečíselných znaků

    if (phoneNumber.length === 9) {
        input.style.borderColor = ''; // Resetuje barvu ohraničení
        if (error) error.style.display = 'none'; // Skryje chybovou zprávu
    } else {
        input.style.borderColor = 'red'; // Nastaví červené ohraničení
        if (error) error.style.display = 'block'; // Zobrazí chybovou zprávu
    }

    if (guide) {
        guide.style.display = 'none'; // Skryje nápovědu
    }
}
