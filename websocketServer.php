<?php
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
        echo "Otrzymano od {$from->resourceId}: $msg\n";
        // Odesłanie tej samej wiadomości do klienta
        $from->send("Echo: " . $msg);
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

echo "✅ Echo WebSocket działa na ws://0.0.0.0:8080\n";
$server->run();
