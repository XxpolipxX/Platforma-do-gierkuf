<?php
    require '../sesja-ustawienieDanychUsera.php';
    sesja();
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>TIC TAC TOE</title>
    <link rel="stylesheet" href="tic-tac-toe.css">
    <link href="https://cdn.boxicons.com/fonts/basic/boxicons.min.css" rel="stylesheet">
    <script defer src="main.js"></script>
</head>
    <header>
        <nav class="menu">
            <!-- <a href="../../menu/index.html">Home</a> -->
            <a href="../../../menu/index.html">Home</a>
            <a href="#">Leaderboards</a>
                        <!-- nazwa użytkownika -->
            <div class="user_name"><b>dasdafsafsa</b></div>
            <button type="button" id="wyloguj"><a href="../../../logowanie/wyloguj-link.php"><i class='bxr  bx-arrow-out-right-square-half wyloguj-button'></i>Wyloguj się</a></button>
        </nav>
    </header>
    <div class="background"></div>
    <body>
        <div id="options-container" class=" menu-container justify-center center-element-on-screen">
            <div id="create-join" class="center-element-on-parent justify-center container align-center flex-row">
                <button type="button" id="create" class="font-bold font-2em">Stwórz kod</button>
                <button type="button" id="join" class="font-bold font-2em">Dołącz</button>
            </div>

            <div id="generate-code" class="hide flex-column container align-center justify-center center-element-on-parent flex-row">
                <input type="text" id="generated-code" class="font-bold font-2em text-center" disabled>
                <button type="button" id="back-generate-code" class="back font-bold font-2em text-center">WSTECZ</button>
            </div>

            <div id="join-container" class="hide container center-element-on-parent">
                <form id="send-code-form" class="flex-column justify-center center-element-on-parent">
                    <div class="flex-row justify-center align-center">
                        <label for="code" class="font-bold font-2em">Wpisz kod</label>
                        <input type="text" id="code" name="code" class="font-bold font-2em" maxlength="6" placeholder="Wprowadź kod">
                    </div>
                    <div class="flex-row justify-center">
                        <button type="submit" class="font-bold font-2em" id="send-code">Dołącz</button>
                        <button type="button" id="back-join-container" class="back font-bold font-2em text-center">WSTECZ</button>
                    </div>
                </form>
            </div>
        </div>
        <div id="game-container" class="hide menu-container justify-center center-element-on-screen"></div>
    </body>
</html>