<?php
    require '../sesja-ustawienieDanychUsera.php';
    sesja();
?>

<!DOCTYPE html>
<html lang="pl">
<head>
    <meta charset="UTF-8">
    <title>Dino run</title>
    <link rel="stylesheet" href="dino.css">
    <link href="https://cdn.boxicons.com/fonts/basic/boxicons.min.css" rel="stylesheet">
    <script type="module" src="./main.js" defer></script>
</head>
<body>
    <div class="header">
        <nav class="nawigacja">
            <a href="../../../menu/index.html">Home</a>
            <a href="#">Leaderboards</a>
            <a id="wyloguj" href="../../../logowanie/wyloguj-link.php"><button><i class='bxr  bx-arrow-out-right-square-half wyloguj-button'></i>Wyloguj się</a></button>
        </nav>
    </div>
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

    <?php script() ?>
</body>
</html>