<?php
    include('./php/getUserData.php');

    // zaczyna sesje
    session_start();

    if(isset($_SESSION['user_id'])) {
        $user = getUserData($_SESSION['user_id']);

        header('Location: ./public/wybor-gry.php');
        exit;
    } else {
        // jak nie jest zalogowany to przekieruj na logowanie
        header('Location: ./logowanie/zaloguj.html');
        exit;
    }
?>