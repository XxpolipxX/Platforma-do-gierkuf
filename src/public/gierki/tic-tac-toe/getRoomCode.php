<?php
    require_once '../sesja-ustawienieDanychUsera.php';
    require_once 'Room.php';

    // // Wyłącz wyświetlanie błędów w przeglądarce
    // ini_set('display_errors', 0);
    // ini_set('log_errors', 1);
    // ini_set('error_log', __DIR__.'/php-error.log');

    // Start sesji
    sesja();

    header('Content-Type: application/json');

    $userID = $_SESSION['user_id'] ?? null;

    if (!$userID) {
        echo json_encode(['error' => 'Nie zalogowano użytkownika']);
        exit;
    }

    try {
        $roomManager = new Room($pdo);
        echo $roomManager->createRoomJSON($userID);
    } catch (Exception $e) {
        echo json_encode([
            'error' => 'Wystąpił błąd',
            'details' => $e->getMessage()
        ]);
    }
?>