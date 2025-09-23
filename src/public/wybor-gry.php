<?php
    session_start();
    require('../php/getUserData.php');

    // czy jest sesja
    if(!isset($_SESSION['user_id'])) {
        header('Location: ../logowanie/zaloguj.html');
        exit;
    }
    // pobierz dane usera
    $user = getUserData($_SESSION['user_id']);
    setcookie('userID', $user['id']);
    setcookie('userLogin', $user['username']);
?>
<!DOCTYPE html>
<html lang="pl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body>
    <div id="test"></div>
    <a href="../logowanie/wyloguj-link.php">Wyloguj</a>
    <a href="../menu/index.html">Wybór gierki</a>
    <script>
        <?php
            echo  "const userID = " . json_encode($user['id']) . ";";
            echo 'const userLogin = ' . json_encode($user['username']) . ";";
        ?>;
        window.userID = userID;
        window.userLogin = userLogin;
        document.getElementById("test").innerHTML = `Cześć ${window.userLogin}, twoje id to ${window.userID}`;
    </script>
</body>
</html>
