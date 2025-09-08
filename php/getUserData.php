<?php
    if (basename($_SERVER['PHP_SELF']) == basename(__FILE__)) {
        header('Location: https://www.youtube.com/watch?v=dQw4w9WgXcQ&list=RDdQw4w9WgXcQ&start_radio=1');
        exit;
    }
    function getUserData($userID) {
        require(__DIR__ . '/db.php');

        $zapytanie = $pdo->prepare('SELECT `id`, `username` FROM `users` WHERE `id` = :id');
        $zapytanie->bindParam(':id', $userID, PDO::PARAM_INT);
        $zapytanie->execute();
        $userData = $zapytanie->fetch(PDO::FETCH_ASSOC);

        return $userData;
    }
?>