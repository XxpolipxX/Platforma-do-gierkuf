<?php
    if (basename($_SERVER['PHP_SELF']) == basename(__FILE__)) {
        header('Location: https://www.youtube.com/watch?v=dQw4w9WgXcQ&list=RDdQw4w9WgXcQ&start_radio=1');
        exit;
    }
    require_once(__DIR__ . '/getUserData.php');
    require_once(__DIR__ . '/db.php');
    function manageSession() {
        global $pdo;
        // sprawdzenie czy jest ktoś zalogowany
        if(!isset($_SESSION['user_id'])) {
            // sprawdzenie czy przyjdzie z fetch z ciavaskrypta
            if(isAjaxRequest()) {
                echo json_encode([
                    'success' => false,
                    'message' => 'Użytkownik niezalogowany'
                ]);
            } else {
                // przekierowanie na stronę do zalogowania się
                header('Location: ../logowanie/zaloguj.html');
            }
            exit;
        }

        // jak jest zalogowany to pobierz dane
        $user = getUserData($_SESSION['user_id'], $pdo);

        echo json_encode([
            'success' => true,
            'message' => 'Zalogowany użytkownik',
            'user' => $user
        ]);
    }

    // Funkcja wykrywa, czy żądanie pochodzi z fetch()
    function isAjaxRequest() {
        return !empty($_SERVER['HTTP_X_REQUESTED_WITH']) &&
            strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) === 'xmlhttprequest';
    }
?>