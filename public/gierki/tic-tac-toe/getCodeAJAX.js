export default class getCodeAJAX {
    requestCode() {
        // Zwracamy Promise, który można chainować
        return fetch('getRoomCode.php', { method: 'GET' })
            .then(response => {
                    // console.log(response.json());
                    return response.json();
                    // JSON.parse(response.json());
            });
    }
}