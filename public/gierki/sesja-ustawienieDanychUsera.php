<?php
    function sesja() {
        if (session_status() == PHP_SESSION_NONE) {
            session_start();
        }

        require_once __DIR__ . '../../../php/getUserData.php';

        if (!isset($_SESSION['user_id'])) {
            header('Location: ../../../logowanie/zaloguj.html');
            exit;
        }

        global $user;
        $user = getUserData($_SESSION['user_id']);
    }

    function script() {
        global $user;
        echo "<script>
            window.userData = " . json_encode([
                'id' => $user['id'],
                'login' => $user['username']
            ]) . ";
        </script>";
    }
?>
