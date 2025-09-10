<?php
    session_start();
    require('../../php/getUserData.php');

    // czy jest sesja
    if(!isset($_SESSION['user_id'])) {
        header('Location: ../../logowanie/zaloguj.html');
        exit;
    }
    // pobierz dane usera
    $user = getUserData($_SESSION['user_id']);
?>
<!DOCTYPE html>
<html lang="pl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="../../logowanie/wyloguj.js"></script>
</head>
<body>
    <div id="test"></div>
    <form id="wyloguj">
        <button type="submit">Wyloguj się</button>
    </form>
    <script>
        const user = <?php echo json_encode([
            'id' => $user['id'],
            'login' => $user['username']
        ]); ?>;
        console.log(user);
        const userID = user.id;
        const userLogin = user.login;
        document.getElementById("test").innerHTML = `Cześć ${userLogin}, twoje id to ${userID}`;
    </script>
</body>
</html>