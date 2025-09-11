<?php
    ini_set('display_errors', 1);
    ini_set('display_startup_errors', 1);
    error_reporting(E_ALL);
    // info dla przeglądarki że zwróci dane w JSONie
    header('Content-Type: application/json');

    // plik z połączeniem się bazą
    require '../php/db.php';

    $response = ['success' => false, 'message' => ''];

    if($_SERVER['REQUEST_METHOD'] == 'POST') {
        $login = trim($_POST['login'] ?? '');
        $password = trim($_POST['password'] ?? '');
        $passwordAgain = trim($_POST['passwordAgain'] ?? '');

        // if(!$login || !$password || !$passwordAgain) {
        //     $response['message'] = 'Wypełnij wszystkie pola';
        //     echo json_encode($response);
        //     exit;
        // }

        if(!$login) {
            $response['message'] = 'Nie ma logina';
            echo json_encode($response);
            exit;
        }

        if(!$password) {
            $response['message'] = 'Nie ma hasła';
            echo json_encode($response);
            exit;
        }

        if(!$passwordAgain) {
            $response['message'] = 'Nie ma ponownego hasła';
            echo json_encode($response);
            exit;
        }

        $zapytanie = $pdo->prepare("SELECT `id` FROM `users` WHERE `username` = :login");
        $zapytanie->bindParam(":login", $login, PDO::PARAM_STR);
        $zapytanie->execute();

        if(!$zapytanie->fetch()) {
            $response['message'] = 'Błędny login';
            echo json_encode($response);
            exit;
        }

        if($password !== $passwordAgain) {
            $response['message'] = 'Źle wpisałeś ponownie hasło';
            echo json_encode($response);
            exit;
        }

        if(strlen($password) < 8) {
            $response['message'] = "Hasło powinno składać się z co najmniej 8 znaków";
            echo json_encode($response);
            exit;
        }

        $hashedPassword = password_hash($password, PASSWORD_DEFAULT);

        $zapytanie = $pdo->prepare("UPDATE `users` SET `password_hash` = :hashedPassword WHERE `username` = :login");
        $zapytanie->bindParam(":hashedPassword", $hashedPassword, PDO::PARAM_STR);
        $zapytanie->bindParam(":login", $login, PDO::PARAM_STR);

        if($zapytanie->execute()) {
            $response['success'] = true;
            $response['message'] = "Zmieniono hasło";
        } else {
            $response['message'] = "Błąd podczas zmiany hasła";
        }

        echo json_encode($response);
    }
?>