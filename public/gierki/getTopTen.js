export default class GetTopTen {
    constructor(gameID, pathToleaderboardphp) {
        this.gameID = gameID;
        this.pathToleaderboardphp = pathToleaderboardphp;
    }

    getLeaderboard(callback) {
        fetch(`${this.pathToleaderboardphp}?gameID=${this.gameID}`, {
            method: 'GET'
        })
            .then(response => response.json())
            .then(data => callback(data))
            .catch(error => console.error('Błąd: ' + error));
    }

    generateRow(entry) {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${entry.user_name}</td>
            <td>${entry.game_name}</td>
            <td>${entry.score}</td>
        `;

        return row;
    }

    createTablebody(tableID) {
        const table = document.getElementById(tableID);
        this.getLeaderboard(json => {
            json.forEach(entry => {
                table.appendChild(this.generateRow(entry));
            });
        })
    }
}