function getLeaderboard(gameID, callback) {
    const data = new FormData();

    fetch(`./leaderboard.php?gameID=${gameID}`, {
        method: 'GET'
    })
        .then(async response => {
            const text = await response.text();
            // console.log("Odpowiedź PHP: ", text);
            try {
                // return JSON.parse(text);
                return callback(JSON.parse(text));
            } catch {
                throw new Error("PHP nie zwróciło JSONa");
            }
        })
        .catch(error => console.error('Błąd: ' + error));
}

function generateRow(entry) {
    const row = document.createElement('tr');
    row.innerHTML = `
        <td>${entry.user_name}</td>
        <td>${entry.game_name}</td>
        <td>${entry.score}</td>
    `;

    return row;
}


document.addEventListener('DOMContentLoaded', () => {
    const dinoTable = document.getElementById('leaderboard-dino');
    const snakeTable = document.getElementById('leaderboard-snake');
    getLeaderboard(1, json => {
        json.forEach(entry => {
            dinoTable.appendChild(generateRow(entry));
        });
    });
    getLeaderboard(2, json => {
        json.forEach(entry => {
            snakeTable.appendChild(generateRow(entry));
        });
    });
});