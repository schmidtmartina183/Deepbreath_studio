document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('foglalas');
    const contentSection = form.closest('.content'); // A fő tartalom szekció

    // Input mezők
    const fullnameInput = document.getElementById('fullname');
    const emailInput = document.getElementById('email');
    const telefonInput = document.getElementById('telefon');
    const tipusInput = document.getElementById('tipus');
    const datumInput = document.getElementById('datum');
    const termsInput = document.getElementById('terms');

    // Hibaüzenet megjelenítő elemek
    const errorName = document.getElementById('error-name');
    const errorEmail = document.getElementById('error-email');
    const errorTelszam = document.getElementById('error-telszam');
    const errorType = document.getElementById('error-type');
    const errorDate = document.getElementById('error-date');
    const errorTerms = document.getElementById('error-terms');

    // Segédfüggvény a hibaüzenetek törlésére
    function clearErrors() {
        const errors = document.querySelectorAll('.error-msg');
        errors.forEach(el => el.textContent = '');
        const inputs = document.querySelectorAll('.form-group input, .form-group select');
        inputs.forEach(el => el.classList.remove('input-error'));
    }
    
    // --- Validációs Logika ---

    function validateForm(event) {
        let isValid = true;
        clearErrors();

        // 1. Név (Kötelező)
        if (fullnameInput.value.trim() === "") {
            errorName.textContent = "A név megadása kötelező!";
            fullnameInput.classList.add('input-error');
            isValid = false;
        }

        // 2. E-mail (Kötelező + Formátum)
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (emailInput.value.trim() === "") {
            errorEmail.textContent = "E-mail cím megadása kötelező!";
            emailInput.classList.add('input-error');
            isValid = false;
        } else if (!emailRegex.test(emailInput.value.trim())) {
            errorEmail.textContent = "Kérlek, érvényes e-mail címet adj meg!";
            emailInput.classList.add('input-error');
            isValid = false;
        }

        // 3. Telefonszám (Kötelező - A feladat szerint)
        const phoneRegex = /^\+?(\d[\s-]?){8,15}$/;
        if (telefonInput.value.trim() === "") {
            errorTelszam.textContent = "Telefonszám megadása kötelező!";
            telefonInput.classList.add('input-error');
            isValid = false;
        } else if (!phoneRegex.test(telefonInput.value.trim().replace(/[\s-]/g, ''))) {
             errorTelszam.textContent = "Kérlek, érvényes telefonszámot adj meg!";
            telefonInput.classList.add('input-error');
            isValid = false;
        }

        // 4. Óratípus (Kötelező)
        if (tipusInput.value === "") {
            errorType.textContent = "Kérlek, válassz óratípust!";
            tipusInput.classList.add('input-error'); 
            isValid = false;
        }

        // 5. Dátum (Kötelező + Jövőbeni)
        if (datumInput.value === "") {
            errorDate.textContent = "A dátum megadása kötelező!";
            datumInput.classList.add('input-error');
            isValid = false;
        } else {
            const selectedDate = new Date(datumInput.value);
            const today = new Date();
            today.setHours(0, 0, 0, 0); 
            if (selectedDate < today) {
                errorDate.textContent = "Kérlek, jövőbeni dátumot válassz!";
                datumInput.classList.add('input-error');
                isValid = false;
            }
        }

        // 6. Feltételek elfogadása (Kötelező)
        if (!termsInput.checked) {
            errorTerms.textContent = "A jelentkezéshez el kell fogadnod a feltételeket.";
            isValid = false;
        }
            
        if (!isValid) {
            event.preventDefault();
            console.log("Hiba az űrlapon!");
        } else {
            // A foglalás SIKERES volt!
            event.preventDefault(); // Megakadályozzuk a tényleges küldést
            handleSuccess(); 
        }
    }

    form.addEventListener('submit', validateForm);

    // --- Sikeresség kezelése ---

    function handleSuccess() {
        // 1. Töröljük az űrlapot és az elérhetőségi részt
        form.style.display = 'none';
        const contactInfo = document.querySelector('.elerhetosegeink');
        if (contactInfo) {
            contactInfo.style.display = 'none';
        }

        // 2. Létrehozzuk a sikerességi üzenetet
        const successMessage = document.createElement('div');
        successMessage.classList.add('success-message');
        successMessage.innerHTML = `
            <h2>🧘‍♀️ Sikeres Jelentkezés! 🧘‍♂️</h2>
            <p>A foglalását rögzítettük. Hamarosan küldünk egy visszaigazoló e-mailt a **${emailInput.value.trim()}** címre.</p>
            <p><strong>Találkozunk az órán!</strong></p>
            <a class="btn" href="3orarend.html" style="margin-top: 20px;">Vissza az Órarendhez</a>
        `;

        // 3. Hozzáadjuk a successMessage-t a .content szekcióhoz
        contentSection.appendChild(successMessage);
        window.scrollTo({ top: 0, behavior: 'smooth' }); // Felgörgetünk a lap tetejére
    }
});