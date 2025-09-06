// plik do obsługi formularza
let formularzLogowania = document.getElementById('formularz-logowania');

formularzLogowania.addEventListener('submit', function (e) {
    e.preventDefault(); // nie przeładowywuje strony

    const formData = new FormData(this);

    // wysłanie danych do php
    fetch('zaloguj.php', {
        method: 'POST',     // metoda wysyłania danych
        body: formData      // format wysłanych danych
    })
        .then(response => response.json())
        .then(data => {
            document.getElementById('wynik').innerHTML = data;
        })
        .catch(error => console.error('Błąd: ', error));
});