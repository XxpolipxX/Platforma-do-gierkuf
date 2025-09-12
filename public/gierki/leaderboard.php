<?php
    require_once __DIR__ . '/../../php/db.php';

    if (!isset($GLOBALS['pdo'])) {
        die('Nie ma zmiennej $pdo');
    }

    $pdo = $GLOBALS['pdo']; // przypisanie do lokalnej zmiennej

    $gameID = $_GET['gameID'];

    function getScore($pdo, $gameID) {
        $response = ['success' => false, 'message' => ''];

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

        $wynik = $stmt->fetchAll(PDO::FETCH_ASSOC);

        $json = json_encode($wynik);

        return $json;
    }

    header('Content-Type: application/json; charset=utf-8');
    echo getScore($pdo, $gameID);
?>