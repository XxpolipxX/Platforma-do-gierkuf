let formularzResetowania = document.getElementById('formularz-logowania');

formularzResetowania.addEventListener("submit", (e) => {
    e.preventDefault();

    fetch('przypomnij.php', {
        method: 'POST',
        body: new FormData(formularzResetowania)
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
            if (data.success) {
                alert(data.message);
                formularzResetowania.reset();
                // przekierowanie na logowanie się
                window.location.href = './zaloguj.html';
            } else {
                alert(data.message);
            }
        })
});