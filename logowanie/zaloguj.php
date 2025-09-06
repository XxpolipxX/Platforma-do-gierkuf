<?php
    // plik do obsługi logowania się
    if($_SERVER['REQUEST_METHOD'] == 'POST') {
        $login = $_POST['login'] ?? '';
        $password = $_POST['password'] ?? '';
    }
?>