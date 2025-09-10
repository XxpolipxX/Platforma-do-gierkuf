<?php
    require_once './sesja-ustawienieDanychUsera.php';
    sesja();

    require_once __DIR__ . '/../../php/db.php';

    if (!isset($GLOBALS['pdo'])) {
        die('Nie ma zmiennej $pdo');
    }

    $pdo = $GLOBALS['pdo']; // przypisanie do lokalnej zmiennej

    function getScore($pdo, $gameID) {
        $stmt = $pdo->prepare("
            SELECT u.username AS user_name, g.name AS game_name, s.score
            FROM scores s
            JOIN users u ON s.user_id = u.id
            JOIN games g ON s.game_id = g.id
            WHERE s.game_id = :gameID
            ORDER BY s.score DESC
            LIMIT 10
        ");

        $stmt->bindParam(':gameID', $gameID, PDO::PARAM_INT);
        $stmt->execute();

        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    $topScoresDino = getScore($pdo, 1);
    $topScoresSnake = getScore($pdo, 2);
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Leaderboard</title>
</head>
<body>
    <table id="leaderboard-dino">
        <tr>
            <th>Autor</th>
            <th>Gra</th>
            <th>Wynik</th>
        </tr>
    </table>
    <table id="leaderboard-snake">
        <tr>
            <th>Autor</th>
            <th>Gra</th>
            <th>Wynik</th>
        </tr>
    </table>
    <script>
        const topScoresDino = <?php echo json_encode($topScoresDino, JSON_PRETTY_PRINT); ?>;
        console.log(topScoresDino);

        let table = document.getElementById('leaderboard-dino');

        // wiersze do tabeli
        topScoresDino.forEach(score => {
            const row = table.insertRow();  // nowy wiersz
            const cellAuthor = row.insertCell(0);
            const cellGame = row.insertCell(1);
            const cellScore = row.insertCell(2);

            cellAuthor.textContent = score.user_name;
            cellGame.textContent = score.game_name;
            cellScore.textContent = score.score;
        });

        const topScoresSnake = <?php echo json_encode($topScoresSnake, JSON_PRETTY_PRINT); ?>;
        console.log(topScoresSnake);

        table = document.getElementById('leaderboard-snake');

        // wiersze do tabeli
        topScoresSnake.forEach(score => {
            const row = table.insertRow();  // nowy wiersz
            const cellAuthor = row.insertCell(0);
            const cellGame = row.insertCell(1);
            const cellScore = row.insertCell(2);

            cellAuthor.textContent = score.user_name;
            cellGame.textContent = score.game_name;
            cellScore.textContent = score.score;
        });
    </script>
</body>
</html>