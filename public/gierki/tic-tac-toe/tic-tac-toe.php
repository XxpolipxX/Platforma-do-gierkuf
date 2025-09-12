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
    <div id="options-container" class="container">
        <div id="create-join">
            <button id="create">Stwórz kod</button>
            <button id="join">Dołącz</button>
        </div>

        <div id="generate-code" class="hide container">
            <input type="text" id="generated-code" disabled>
        </div>

        <div id="join-container" class="hide container">
            <form id="form">
                <label for="code">Wpisz kod</label>
                <input type="text" id="code" name="code">
                <button type="submit">Dołącz</button>
            </form>
        </div>
    </div>
</body>
</html>