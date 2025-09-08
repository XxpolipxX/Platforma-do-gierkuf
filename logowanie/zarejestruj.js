// plik do obsługi rejestracji
let formularzRejestrowania = document.getElementById('formularz-zarejestruj');

formularzRejestrowania.addEventListener('submit', function (e) {
    e.preventDefault();

    const formData = new FormData(this);

    fetch('zarejestruj.php', {
        method: 'POST',
        body: formData
    })
        .then(async response => {
            const text = await response.text();
            console.log("Odpowiedź PHP:", text);    // błędy JSON
            try {
                return JSON.parse(text);
            } catch {
                throw new Error("PHP nie zwróciło JSONa");
            }
        })
        .then(data => {
            // udało się zarejestrować
            if (data.success) {
                alert(data.message);
                formularzRejestrowania.reset();
                // przekierowanie na logowanie się
                window.location.href = './zaloguj.html';
            } else {
                alert(data.message);    // istnieje taki user,  mail zajęty itp
            }
        })
        .catch(error => console.error('Błąd: ', error));
});