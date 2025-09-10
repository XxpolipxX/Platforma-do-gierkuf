<?php
    ini_set('display_errors', 1);
    ini_set('display_startup_errors', 1);
    error_reporting(E_ALL);

    header('Content-Type: application/json');
    
    // Połączenie z bazą
    require '../../php/db.php';

    $pdo = $GLOBALS['pdo']; // przypisanie do lokalnej zmiennej

    $response = ['success' => false, 'message' => ''];
    
    if($_SERVER['REQUEST_METHOD'] !== 'POST') {
        $response['message'] = 'Nieprawidłowa metoda!';
        echo json_encode($response);
        exit;
    }


    $login = trim($_POST['userLogin'] ?? '');
    $id = trim($_POST['userID'] ?? '');
    $score = trim($_POST['userScore'] ?? '');
    $gameID = trim($_POST['gameID'] ?? '');
    if(!$login) {
        $response['message'] = 'Ni ma logina';
        echo json_encode($response);
        exit;
    }

    if(!$id) {
        $response['message'] = 'Ni ma id';
        echo json_encode($response);
        exit;
    }

    if(!$score && $score != 0) {
        $response['message'] = 'Ni ma skora';
        echo json_encode($response);
        exit;
    }

    if(!$gameID) {
        $response['message'] = 'Ni ma gejm id';
        echo json_encode($response);
        exit;
    }

    // Pobieramy użytkownika z bazy
    $zapytanie = $pdo->prepare("SELECT `id`, `username` FROM `users` WHERE `username` = :login");
    $zapytanie->bindParam(':login', $login, PDO::PARAM_STR);
    $zapytanie->execute();
    $user = $zapytanie->fetch(PDO::FETCH_ASSOC);

    // Sprawdzamy, czy użytkownik istnieje
    if (!$user) {
        $response['message'] = 'Nie udało się znaleźć użytkownika';
        echo json_encode($response);
        exit;
    }

    // zapytanie do wysłania danych
    $zapytanie = $pdo->prepare("INSERT INTO `scores` (`user_id`, `game_id`, `score`) VALUES (:id, :gameID, :score)");
    $zapytanie->bindParam(':id', $id, PDO::PARAM_INT);
    $zapytanie->bindParam(':gameID', $gameID, PDO::PARAM_INT);
    $zapytanie->bindParam(':score', $score, PDO::PARAM_INT);
    if($zapytanie->execute()) {
        $response['success'] = true;
        $response['message'] = 'Udało się przesłać dane';
    } else {
        $response['message'] = 'Błąd zapytania';
    }

    echo json_encode($response)

?>