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
<html lang="pl">
<head>
    <meta charset="UTF-8">
    <title>Dino run</title>
    <link rel="stylesheet" href="dino.css">
    <script type="module" src="./main.js" defer></script>
</head>
<body>
    <div class="game-container">
        <div class="dino"></div>
        <div class="cactus-container"></div>
        <div class="score">Punkty: 0</div>
        <div class="time">Czas: 0</div>
    </div>
    
    <button class="start-game">
        START
    </button>

    <div class="message hide">
        <h2>Koniec gry!</h2>
        <p class="final-score">Wynik: 0</p>
        <p class="final-time">Czas: 0</p>
        <p class="more-final-score">Finalny wynik: 0</p>
        <button class="restart-game">Zagraj ponownie</button>
    </div>

    <script>
        window.userData = <?php echo json_encode([
            'id' => $user['id'],
            'login' => $user['username']
        ]); ?>;
    </script>
</body>
</html>