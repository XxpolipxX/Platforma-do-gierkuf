<?php
    function sesja() {
        session_start();
        require '../../../php/getUserData.php';

        if(!isset($_SESSION['user_id'])) {
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