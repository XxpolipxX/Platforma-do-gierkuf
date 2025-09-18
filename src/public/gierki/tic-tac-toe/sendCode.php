<?php
    require_once '../sesja-ustawienieDanychUsera.php';
    require_once 'Room.php';

    sesja();

    header('Content-Type: application/json');

    $userID = $_SESSION['user_id'] ?? null;

    if (!$userID) {
        echo json_encode(['error' => 'Nie zalogowano użytkownika']);
        exit;
    }

    if(isset($_POST['code']) && $_POST['code'] != '') {
        $code = $_POST['code'];
    } else {
        echo json_encode(['error' => 'Nie udało się przesłać kodu']);
        exit;
    }

    try {
        $roomManager = new Room($pdo);
        if(!$roomManager->checkCode($code, $userID)) {
            $roomOwner = $roomManager->getUser1ID();
            echo json_encode(['message' => 'Udało się dołączyć do pokoju użytkownika o id: ' . $roomOwner]);
        }
    } catch (Exception $e) {
        echo json_encode([
            'error' => 'Wystąpił błąd',
            'details' => $e->getMessage()
        ]);
    }
?>