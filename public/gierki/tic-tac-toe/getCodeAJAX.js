export default class getCodeAJAX {
    requestCode() {
        return fetch('getRoomCode.php', { method: 'GET' })
            .then(response => {
                    return response.json();
            });
    }
}