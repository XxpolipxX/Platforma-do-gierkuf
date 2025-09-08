<?php
    if (basename($_SERVER['PHP_SELF']) == basename(__FILE__)) {
        header('Location: ../index.php');
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