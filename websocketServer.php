<?php
/*
require __DIR__ . '/vendor/autoload.php';

use Ratchet\MessageComponentInterface;
use Ratchet\ConnectionInterface;
use Ratchet\Http\HttpServer;
use Ratchet\WebSocket\WsServer;
use Ratchet\Server\IoServer;

class EchoServer implements MessageComponentInterface {
    public function onOpen(ConnectionInterface $conn) {
        echo "Nowe połączenie: {$conn->resourceId}\n";
    }

    public function onMessage(ConnectionInterface $from, $msg) {
        // echo "Otrzymano od {$from->resourceId}: $msg\n";
        // // Odesłanie tej samej wiadomości do klienta
        // $from->send("Echo: " . $msg);
        // echo "Otrzymano od {$from->resourceID}: $msg\n";
        $wiadomoscUsera = json_decode($msg, true);
        $from->send("To jest z Ratcheta: " . json_encode($wiadomoscUsera));

        // parsowanie JSONA                 // true zwraca tablice asocjacji, false daje obiekty
        // $data = json_decode($msg, true);
    }

    public function onClose(ConnectionInterface $conn) {
        echo "Połączenie zamknięte: {$conn->resourceId}\n";
    }

    public function onError(ConnectionInterface $conn, \Exception $e) {
        echo "Błąd: {$e->getMessage()}\n";
        $conn->close();
    }
}

// Tworzymy serwer WebSocket na porcie 8080
$server = IoServer::factory(
    new HttpServer(
        new WsServer(
            new EchoServer()
        )
    ),
    8081
);

echo "✅ Echo WebSocket działa na ws://0.0.0.0:8081\n";
$server->run();
*/
require __DIR__ . '/vendor/autoload.php';

use Ratchet\MessageComponentInterface;
use Ratchet\ConnectionInterface;
use Ratchet\Server\IoServer;
use Ratchet\Http\HttpServer;
use Ratchet\WebSocket\WsServer;

class EchoServer implements MessageComponentInterface {
    public function onOpen(ConnectionInterface $conn) {
        echo "Nowe połączenie: {$conn->resourceId}\n";
    }

    public function onMessage(ConnectionInterface $from, $msg) {
        echo "Otrzymano: $msg\n"; // debug w konsoli serwera

        $data = json_decode($msg, true);
        if($data === null) {
            $from->send("Błąd: Niepoprawny JSON");
            return;
        }

        $from->send("To jest z Ratcheta: " . json_encode($data));
    }

    public function onClose(ConnectionInterface $conn) {
        echo "Połączenie zamknięte: {$conn->resourceId}\n";
    }

    public function onError(ConnectionInterface $conn, \Exception $e) {
        echo "Błąd: " . $e->getMessage() . "\n";
        $conn->close();
    }
}

$server = IoServer::factory(
    new HttpServer(
        new WsServer(
            new EchoServer()
        )
    ),
    8081
);

$server->run();
?>