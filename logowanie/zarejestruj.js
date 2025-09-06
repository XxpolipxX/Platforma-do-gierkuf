// plik do obsługi rejestracji
let formularzRejestrowania = document.getElementById('formularz-zarejestruj');

formularzRejestrowania.addEventListener('submit', function (e) {
    e.preventDefault();

    const formData = new FormData(this);

    fetch('zarejestruj.php', {
        method: 'POST',
        body: formData
    })
        .then(response => response.json())
        .then(data => {
            document.getElementById('wynik').innerText = data.message;
            if (data.success) {
                alert("Zarejestrowano użytkownika");
            }
        })
        .catch(error => console.error('Błąd: ', error));
});