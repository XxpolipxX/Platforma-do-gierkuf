<?php
    // pokazywanie błędów
    ini_set('display_errors', 1);
    ini_set('display_startup_errors', 1);
    error_reporting(E_ALL);
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
        $zapytanie = $pdo->prepare("SELECT `id` FROM `users` WHERE `username` = :login");
        $zapytanie->bindParam(":login", $login, PDO::PARAM_STR);
        $zapytanie->execute();

        if($zapytanie->fetch()) {
            $response['message'] = 'Użytkownik z tym loginem już istnieje';
            echo json_encode($response);
            exit;
        }

        // sprawdzenie czy jest już taki email
        $zapytanie = $pdo->prepare("SELECT `id` FROM `users` WHERE `email` = :email");
        $zapytanie->bindParam(':email', $email, PDO::PARAM_STR);
        $zapytanie->execute();

        if($zapytanie->fetch()) {
            $response['message'] = 'Użytkownik z tym emailem już istnieje';
            echo json_encode($response);
            exit;
        }

        // hashowanie hasła
        $hashedPassword = password_hash($password, PASSWORD_DEFAULT);

        // dodanie do bazy
                                                                                                            // parametry
        $zapytanie = $pdo->prepare("INSERT INTO `users` (`username`, `email`, `password_hash`) VALUES (:login, :email, :hashedPassword)");

        // przypisanie parametrów do zmiennych
        $zapytanie->bindParam(':login', $login, PDO::PARAM_STR);
        $zapytanie->bindParam(':email', $email, PDO::PARAM_STR);
        $zapytanie->bindParam(':hashedPassword', $hashedPassword, PDO::PARAM_STR);

        // wykonanie zapytania
        if($zapytanie->execute()) {
            $response['success'] = true;
            $response['message'] = 'Rejestracja zakończona sukcesem';
        } else {
            $response['message'] = 'Błąd podczas rejestracji';
        }

        echo json_encode($response);
    }
?>