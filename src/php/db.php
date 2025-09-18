<?php
    if (basename($_SERVER['PHP_SELF']) == basename(__FILE__)) {
        header('Location: https://www.youtube.com/watch?v=dQw4w9WgXcQ&list=RDdQw4w9WgXcQ&start_radio=1');
        exit;
    }
    $host = 'db';
    $db = 'gierkowo';
    $user = 'root';
    $pass = 'root';
    $charset = 'utf8mb4';

    $dsn = "mysql:host=$host;dbname=$db;charset=$charset";
    $options = [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC
    ];

    // echo 'TEST DB.PHP';

    try {
        $GLOBALS['pdo'] = new PDO($dsn, $user, $pass, $options);
    } catch(PDOException $e) {
        die("Błąd połączenia z bazą: " . $e->getMessage());
    }
?>
