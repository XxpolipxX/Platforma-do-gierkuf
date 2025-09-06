<?php
    // info dla przeglądarki że zwróci dane w JSONie
    header('Content-Type: application/json');

    // plik z połączeniem się bazą
    require '../php/db.php';

    $response = ['success' => false, 'message' => ''];

    // plik do obsługi rejestrowania się użytkowników
    if($_SERVER['REQUEST_METHOD'] == 'POST') {
        $login = trim($_POST['login'] ?? '');
        $email = trim($_POST['email'] ?? '');
        $password = trim($_POST['password'] ?? '');

        if(!$login || !$email || !$password) {
            $response['message'] = 'Wypełnij wszystkie pola';
            echo json_encode($response);
            exit;
        }

        // sprawdzenie czy jest już taki login
        $zapytanie = $pdo->prepare("SELECT `id` FROM `users` WHERE `username` = ?");
        $zapytanie->execute([$login]);

        if($zapytanie->fetch()) {
            $response['message'] = 'Użytkownik z tym loginem już istnieje';
            echo json_encode($response);
            exit;
        }

        // sprawdzenie czy jest już taki email
        $zapytanie = $pdo->prepare("SELECT `id` FROM `users` WHERE `email` = ?");
        $zapytanie->execute([$email]);

        if($zapytanie->fetch()) {
            $response['message'] = 'Użytkownik z tym emailem już istnieje';
            echo json_encode($response);
            exit;
        }

        // hashowanie hasła
        $hashedPassword = password_hash($password, PASSWORD_DEFAULT);

        // dodanie do bazy
        $zapytanie = $pdo->prepare("INSERT INTO `users` (`username`, `email`, `password_hash`) VALUES (?, ?, ?)");
        if($zapytanie->execute([$login, $email, $hashedPassword])) {
            $response['success'] = true;
            $response['message'] = 'Rejestracja zakończona sukcesem';
        } else {
            $response['message'] = 'Błąd podczas rejestracji';
        }

        echo json_encode($response);
    }
?>