<?php
    session_start();
    require('../../../php/getUserData.php');

    // czy jest sesja
    if(!isset($_SESSION['user_id'])) {
        header('Location: ../../../logowanie/zaloguj.html');
        exit;
    }
    // pobierz dane usera
    $user = getUserData($_SESSION['user_id']);
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    
</body>
</html>