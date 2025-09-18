<?php
    // if (basename($_SERVER['PHP_SELF']) == basename(__FILE__)) {
    //     header('Location: ../index.php');
    //     exit;
    // }
    // pokazywanie błędów
    ini_set('display_errors', 1);
    ini_set('display_startup_errors', 1);
    error_reporting(E_ALL);

    header('Content-Type: application/json');
    session_start();

    // Połączenie z bazą
    require '../php/db.php';

    $response = ['success' => false, 'message' => ''];

    // Sprawdzenie metody
    if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
        echo json_encode(['success' => false, 'message' => 'Nieprawidłowa metoda']);
        exit;
    }

    // Pobranie danych z formularza
    $login = trim($_POST['login'] ?? '');
    $password = trim($_POST['password'] ?? '');

    // Walidacja pól
    if (!$login || !$password) {
        echo json_encode(['success' => false, 'message' => 'Wypełnij wszystkie pola']);
        exit;
    }

    // Pobieramy użytkownika z bazy
    $zapytanie = $pdo->prepare("SELECT `id`, `username`, `password_hash` FROM `users` WHERE `username` = :login");
    $zapytanie->bindParam(':login', $login, PDO::PARAM_STR);
    $zapytanie->execute();
    $user = $zapytanie->fetch(PDO::FETCH_ASSOC);

    // Sprawdzamy, czy użytkownik istnieje
    if (!$user) {
        echo json_encode(['success' => false, 'message' => 'Nieprawidłowy login lub hasło']);
        exit;
    }

    // Weryfikujemy hasło
    if (!password_verify($password, $user['password_hash'])) {
        echo json_encode(['success' => false, 'message' => 'Nieprawidłowy login lub hasło']);
        exit;
    }

    // Logowanie poprawne — zapisujemy sesję
    $_SESSION['user_id'] = $user['id'];

    // Zwracamy dane JSON
    echo json_encode([
        'success' => true,
        'message' => 'Zalogowano poprawnie',
        'user' => [
            'id' => $user['id'],
            'login' => $user['username']
        ]
    ]);
?>