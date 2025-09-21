<?php
require __DIR__ . '/vendor/autoload.php';
$pdo = require __DIR__ . '/html/php/db.php';

$zapytanie = $pdo->query("SELECT NOW()");
echo "CZAS: " . $zapytanie->fetchColumn();

use Ratchet\MessageComponentInterface;
use Ratchet\ConnectionInterface;
use Ratchet\Server\IoServer;
use Ratchet\Http\HttpServer;
use Ratchet\WebSocket\WsServer;

class GameServer implements MessageComponentInterface {
    protected $clients;
    protected $connections; // łączenie connID z userID
    protected $db;

    public function __construct($db) {
        $this->clients = new \SplObjectStorage;
        $this->connections = [];
        $this->db = $db;
    }

    public function onOpen(ConnectionInterface $conn) {
        $this->clients->attach($conn);
        echo "Nowe połączenie: {$conn->resourceId}\n";
    }

    public function onMessage(ConnectionInterface $from, $msg) {
        $data = json_decode($msg, true);

        if(!$data) {
            $from->send(json_encode(['error' => "Niepoprawny JSON"]));
            return;
        }

        switch($data['action'] ?? '') {
            case 'open':
                $from->send(json_encode(['event' => "connected to websocket"]));
                break;
            case 'create_room':
                $this->handleCreateRoom($from, $data);
                break;

            case 'join_room':
                $this->handleJoinRoom($from, $data);
                break;

            default:
                $from->send(json_encode(["error" => "Nieznana akcja"]));
        }
    }

    private function handleCreateRoom(ConnectionInterface $conn, $data) {
        $userID = $data['userID'] ?? null;
        if(!$userID) {
            $conn->send(json_encode(["error" => "Brak userID"]));
            return;
        }
        echo 'userID ' . $userID;

        // tworzenie kodu
        $code = strtoupper(substr(md5(uniqid(mt_rand(), true)), 0, 6));

        echo 'KOD: ' . $code;

        $zapytanie = $this->db->prepare("INSERT INTO `multiplayer_rooms` (`player1_id`, `join_code`, `status`) VALUES (:user1_ID, :code, 'waiting')");
        $zapytanie->bindParam(':user1_ID', $userID, PDO::PARAM_INT);
        $zapytanie->bindParam(':code', $code, PDO::PARAM_STR);
        $zapytanie->execute();
        $roomID = $this->db->lastInsertId();

        $this->connections[$userID] = $conn;    // zapamiętanie połączenia

        $conn->send(json_encode([
            "event" => "room_created",
            "room_id" => $roomID,
            "join_code" => $code
        ]));
    }

    private function handleJoinRoom(ConnectionInterface $conn, $data) {
        $userID = $data['userID'] ?? null;
        $code = $data['kod'] ?? null;

        if(!$userID) {
            $conn->send(json_encode(['error' => 'ni ma userID']));
            return;
        }
        if(!$code) {
            $conn->send(json_encode(['error' => 'ni ma koda']));
            return;
        }

        $zapytanie = $this->db->prepare("SELECT * FROM `multiplayer_rooms` WHERE `join_code` = :code AND `status` = 'waiting' LIMIT 1");
        $zapytanie->bindParam(':code', $code, PDO::PARAM_STR);
        $zapytanie->execute();
        $room = $zapytanie->fetch();

        print_r($room);

        if(!$room) {
            $conn->send(json_encode(["error" => "Nie znaleziono pokoju"]));
            return;
        }

        $zapytanie = $this->db->prepare("UPDATE `multiplayer_rooms` SET `player2_id` = :user2ID, `status` = 'in_progress' WHERE `id` = :roomID");
        $zapytanie->bindParam(':user2ID', $userID, PDO::PARAM_INT);
        $zapytanie->bindParam(':roomID', $room['id'], PDO::PARAM_INT);
        $zapytanie->execute();

        $this->connections[$userID] = $conn; // zapamiętanie playera 2

        // odpowiedź dla gracza 2
        $conn->send(json_encode([
            "event" => "joined_room",
            "room_id" => $room['id']
        ]));

        $player1ID = $room['player1_id'];
        if(isset($this->connections[$player1ID])) {
            $this->connections[$player1ID]->send(json_encode([
                "event" => "opponent_joined",
                "room_id" => $room['id'],
                "opponent_id" => $userID
            ]));
        }
    }

    public function onClose(ConnectionInterface $conn) {
        $this->clients->detach($conn);

        // usunięcie połączeń
        foreach($this->connections as $uid => $c) {
            if($c === $conn) {
                unset($this->connections[$uid]);
                break;
            }
        }
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
            new GameServer($pdo)
        )
    ),
    8081,
    '0.0.0.0'
);

$server->run();
?>