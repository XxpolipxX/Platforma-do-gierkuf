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
    <script src="./main.js" defer type="module"></script>
</head>
<body>
    <div id="options-container" class="menu-container justify-center center-element-on-screen">
        <div id="create-join" class="center-element-on-parent justify-center container align-center flex-row">
            <button id="create" class="font-bold font-2em">Stwórz kod</button>
            <button id="join" class="font-bold font-2em">Dołącz</button>
        </div>

        <div id="generate-code" class="hide flex-column container align-center justify-center center-element-on-parent flex-row">
            <input type="text" id="generated-code" class="font-bold font-2em text-center" disabled>
            <button class="back font-bold font-2em text-center">WSTECZ</button>
        </div>

        <div id="join-container" class="hide container center-element-on-parent">
            <form id="send-code-form" class="flex-column justify-center center-element-on-parent">
                <div class="flex-row justify-center align-center">
                    <label for="code" class="font-bold font-2em">Wpisz kod</label>
                    <input type="text" id="code" name="code" class="font-bold font-2em" maxlength="6">
                </div>
                <div class="flex-row justify-center">
                    <button type="submit" class="font-bold font-2em" id="send-code">Dołącz</button>
                    <button class="back font-bold font-2em text-center">WSTECZ</button>
                </div>
            </form>
        </div>
    </div>
</body>
</html>