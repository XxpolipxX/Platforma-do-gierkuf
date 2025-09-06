<?php
    $host = 'localhost';
    $db = 'gierkowo';
    $user = 'root';
    $pass = '';
    $charset = 'utf8mb4';

    // data source name
    // typ bazy - mysql, host - localhost, dbname - gierkowo, charset - kodowanie znaków - charset
    $dsn = "mysql:host=$host;dbname=$db;charset=$charset";
    $options = [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION, // raporty o błędach
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC // domyślny tryb fetch
    ];

    try {
        $pdo = new PDO($dsn, $user, $pass, $options);
    } catch(PDOException $e) {
        die("Błąd połączenia z bazą: " . $e->getMessage());
    }
?>