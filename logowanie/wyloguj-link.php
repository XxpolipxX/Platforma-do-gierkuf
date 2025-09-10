<?php
    session_start();
    // header('Content-Type: application/json');

    if(isset($_SESSION['user_id'])) {
        session_unset(); // usuwa zmienne związane z sesją
        session_destroy(); // kończy sesję
        header('../');
        exit;
    }
?>