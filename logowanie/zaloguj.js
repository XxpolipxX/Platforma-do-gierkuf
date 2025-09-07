// plik do obsługi formularza
let formularzLogowania = document.getElementById('formularz-logowania');

formularzLogowania.addEventListener('submit', function (e) {
    e.preventDefault(); // nie przeładowywuje strony

    const formData = new FormData(this);

    // wysłanie danych do php
    fetch('zaloguj.php', {
        method: 'POST',
        body: new FormData(formularzLogowania)
    })
        .then(async response => {
            const text = await response.text();
            console.log("Odpowiedź PHP:", text); // tu zobaczysz dokładny błąd lub JSON
            try {
                return JSON.parse(text);
            } catch {
                throw new Error("PHP nie zwróciło JSON-a");
            }
        })
        .then(data => {
            const { success, message, user } = data;

            if (success) {
                const { id, login } = user;
                console.log(`ID: ${id}, LOGIN: ${login}`);
                alert(message);
            } else {
                alert(message);
            }
        })
        .catch(error => console.error('Błąd:', error));

});