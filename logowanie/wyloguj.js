document.addEventListener('DOMContentLoaded', () => {
    const wylogujForm = document.getElementById('wyloguj');
    wylogujForm.addEventListener('submit', function (e) {
        e.preventDefault();
        console.log(wylogujForm);
        fetch('../logowanie/wyloguj.php', {
            method: 'POST'
        })
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    alert(data.message);    // np.  Wylogowano
                    // przeniesienie na logowanie
                    window.location.href = '../logowanie/zaloguj.html';
                } else {
                    alert(data.message);    // np. brak ssji
                }
            })
            .catch(err => console.error('Błąd: ', err));
    });
})