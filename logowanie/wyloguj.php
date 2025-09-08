<?php
    if (basename($_SERVER['PHP_SELF']) == basename(__FILE__)) {
        header('Location: ../index.php');
        exit;
    }
    session_start();
    header('Content-Type: application/json');

    if(isset($_SESSION['user_id'])) {
        session_unset(); // usuwa zmienne związane z sesją
        session_destroy(); // kończy sesję

        echo json_encode([
            'success' => true,
            'message' => 'Wylogowano pomyślnie'
        ]);
    } else {
        echo json_encode([
            'success' => false,
            'message' => 'Brak aktywnej sesji'
        ]);
    }
?>