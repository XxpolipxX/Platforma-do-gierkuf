export default class getCodeAJAX {
    requestCode() {
        // Zwracamy Promise, który można chainować
        return fetch('getRoomCode.php', { method: 'GET' })
            .then(response => response.json());
    }
}