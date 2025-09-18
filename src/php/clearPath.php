<?php
    if (basename($_SERVER['PHP_SELF']) == basename(__FILE__)) {
        header('Location: https://www.youtube.com/watch?v=dQw4w9WgXcQ&list=RDdQw4w9WgXcQ&start_radio=1');
        exit;
    }
    function clearURL() {
        // pobranie obecnego url
        $url = $_SERVER['REQUEST_URI'];

        // usunięcie rozszerzeń plików
        // index.php   --> index
         $url = preg_replace('/\.(php|html|htm)$/i', '', $url);

         // usunięcie public/ z ścieżki
         $url = preg_replace('#public/#', '', $url);

         // usunięcie indexa na koniec
         $url = preg_replace('#/index$#i', '', $url);


         // JS do zmiany widocznej ścieżki bez przeładowywania strony
         echo "
            <script>
                const czystaSciezka = '" . $url . "';
                if(window.location.pathname != czystaSciezka) {
                    window.history.replaceState({}, '', czystaSciezka);
                }
            </script>";
    }

    clearURL();
?>