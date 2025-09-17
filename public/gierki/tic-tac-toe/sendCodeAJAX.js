export default class SendCodeAJAX {
    sendCode(form) {
        return fetch('sendCode.php', {
            method: 'POST',
            body: new FormData(form)
        })
            .then(response => {
                    return response.json();
            });
    }
}