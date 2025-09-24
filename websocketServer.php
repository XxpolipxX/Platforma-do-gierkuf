<?php
require __DIR__ . '/vendor/autoload.php';
$pdo = require __DIR__ . '/html/php/db.php';

use Ratchet\MessageComponentInterface;
use Ratchet\ConnectionInterface;
use Ratchet\Server\IoServer;
use Ratchet\Http\HttpServer;
use Ratchet\WebSocket\WsServer;

class GameServer implements MessageComponentInterface {
    protected $clients;
    protected $connections; // łączenie connID z userID
    protected $db;

    protected $games = []; // roomID => [board => [...], turn => userID]

    public function __construct($db) {
        $this->clients = new \SplObjectStorage;
        $this->connections = [];
        $this->db = $db;
    }

    public function onOpen(ConnectionInterface $conn) {
        $this->clients->attach($conn);
    }

    public function onMessage(ConnectionInterface $from, $msg) {
        $data = json_decode($msg, true);

        if(!$data) {
            $from->send(json_encode(['event' => "bad_JSON"]));
            return;
        }

        switch($data['action'] ?? '') {
            case 'create_room':
                $this->handleCreateRoom($from, $data);
                break;

            case 'join_room':
                $this->handleJoinRoom($from, $data);
                break;
            case 'send-move':
                $this->handleMove($from, $data);
                break;

            default:
                $from->send(json_encode(["event" => "unknown"]));
        }
    }

    private function checkIfUserInGame(int $userID): bool {
        $zapytanie = $this->db->prepare("SELECT * FROM `multiplayer_rooms` WHERE `status` = 'in_progress' AND (`player1_id` = :userID OR `player2_id` = :userID) LIMIT 1");
        $zapytanie->bindParam(':userID', $userID, PDO::PARAM_INT);
        $zapytanie->execute();
        $wynik = $zapytanie->fetch(PDO::FETCH_ASSOC);

        if($wynik) {
            return true;
        }

        return false;
    }

    private function handleCreateRoom(ConnectionInterface $conn, $data) {
        $userID = $data['userID'] ?? null;
        if(!$userID) {
            $conn->send(json_encode(["event" => "no_userID"]));
            return;
        }

        if($this->checkIfUserInGame($userID)) {
            $conn->send(json_encode(['event' => 'user_already_in_game']));
            return;
        }

        // tworzenie kodu
        $code = strtoupper(substr(md5(uniqid(mt_rand(), true)), 0, 6));

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
            $conn->send(json_encode(['event' => 'no_userID']));
            return;
        }

        if($this->checkIfUserInGame($userID)) {
            $conn->send(json_encode(['event' => 'user_already_in_game']));
            return;
        }

        if(!$code) {
            $conn->send(json_encode(['event' => 'no_code']));
            return;
        }

        $zapytanie = $this->db->prepare("SELECT * FROM `multiplayer_rooms` WHERE `join_code` = :code AND `status` = 'waiting' AND `player1_id` != :player2_id LIMIT 1");
        $zapytanie->bindParam(':code', $code, PDO::PARAM_STR);
        $zapytanie->bindParam(':player2_id', $userID, PDO::PARAM_INT);
        $zapytanie->execute();
        $room = $zapytanie->fetch();

        if(!$room) {
            $conn->send(json_encode(["event" => "bad_code"]));
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
        $this->startGame($room['id'], $this->connections[$player1ID], $this->connections[$userID]);
    }

    private function getUserID(ConnectionInterface $conn): int {
        foreach($this->connections as $uid => $connection) {
            if($connection === $conn) {
                return $uid;
            }
        }
        return 0;
    }

    private function getRoomByUserID(int $userID) {
        $zapytanie = $this->db->prepare("SELECT * FROM `multiplayer_rooms` WHERE `status` = 'in_progress' AND (`player1_id` = :uid OR `player2_id` = :uid) LIMIT 1");
        $zapytanie->bindParam(':uid', $userID, PDO::PARAM_INT);
        $zapytanie->execute();
        return $zapytanie->fetch(PDO::FETCH_ASSOC);
    }

    private function startGame(int $roomID, ConnectionInterface $player1, ConnectionInterface $player2) {
        $this->games[$roomID] = [
            'board' => array_fill(0, 9, null),  // 9 pustych pól
            'turn' => $this->getUserID($player1),                                 // na start plejer 1
            'player1' => $this->getUserID($player1),
            'player2' => $this->getUserID($player2)
        ];

        $player1->send(json_encode(["event" => "your_move"]));
        $player2->send(json_encode(["event" => "opponent_move"]));
    }

    private function handleMove(ConnectionInterface $from, $data) {
        $userID = $data['userID'] ?? null;
        $index = $data['index'] ?? null;

        if($userID == null || $index == null) {
            return;
        }

        $room = $this->getRoomByUserID($userID);

        if(!$room) {
            return;
        }

        $roomID = $room['id'];

        // czy gra istnieje w pamięci
        if(!isset($this->games[$roomID])) {
            return;
        }

        $game = &$this->games[$roomID];

        // czy to ruch tego gracza co powinien mieć ruch
        if($game['turn'] != $userID) {
            $from->send(json_encode(['event' => 'not_your_turn']));
            return;
        }

        // czy wolne
        if($game['board'][$index] != null) {
            $from->send(json_encode(['event' => 'bad_move']));
            return;
        }

        // symbol gracza
        $symbol = ($room['player1_id'] == $userID) ? 'X' : 'O';
        $game['board'][$index] = $symbol;

        // info do graczy
        foreach ([$game['player1'], $game['player2']] as $pid) {
            if (isset($this->connections[$pid])) {
                echo $pid;
                $this->connections[$pid]->send(json_encode([
                    'event'  => 'move_made',
                    'player' => $userID,
                    'index'  => $index,
                    'symbol' => $symbol
                ]));
            }
        }

        // sprawdź zwycięstwo
        $state = $this->checkGameState($game['board'], $symbol);

        if($state === 'win') {
            foreach([$game['player1'], $game['player2']] as $pid) {
                if(isset($this->connections[$pid])) {
                    $this->connections[$pid]->send(json_encode([
                        'event' => 'game_over',
                        'winner' => $userID
                    ]));
                }
            }
            // to sie już nie przyda w pamięci
            unset($this->games[$roomID]);
            return;
        } elseif($state === 'draw') {
            foreach([$game['player1'], $game['player2']] as $pid) {
                if(isset($this->connections[$pid])) {
                    $this->connections[$pid]->send(json_encode([
                        'event' => 'game_over',
                        'winner' => null
                    ]));
                }
            }
            // nie przyda się
            unset($this->games[$roomID]);
            return;
        }

        // zmiana tury
        // $game['turn'] = ($userID === $game['player1']) ? $game['player2'] : $game['player1'];
        if($userID == $game['player1']) {
            $game['turn'] = $game['player2'];
        } else {
            $game['turn'] = $game['player1'];
        }

        // powiadomienie kto ma ruch
        foreach([$game['player1'], $game['player2']] as $pid) {
            if(isset($this->connections[$pid])) {
                $event = ($pid === $game['turn']) ? 'your_move' : 'opponent_move';
                $this->connections[$pid]->send(json_encode(['event' => $event]));
            }
        }
    }

    private function checkGameState(array $board, string $symbol): ?string {
        $wins = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // rząd
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // kolumna
            [0, 4, 8], [2, 4, 6]             // ukos
        ];

        // sprawdzenie zwycięstwa
        foreach ($wins as $combo) {
            if (
                $board[$combo[0]] === $symbol &&
                $board[$combo[1]] === $symbol &&
                $board[$combo[2]] === $symbol
            ) {
                return 'win';
            }
        }

        // sprawdzenie remisu
        if (!in_array(null, $board, true)) {
            return 'draw';
        }

        // gra trwa nadal
        return null;
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