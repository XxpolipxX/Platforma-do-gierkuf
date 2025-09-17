<?php
    class Room {
        private PDO $pdo;
        // private string $code = $this->getUniqueCode(); // tak nie można
        private string $code;
        private int $user1ID;
        private int $user2ID;

        public function __construct(PDO $pdo) {
            $this->pdo = $pdo;
            $this->code = $this->getUniqueCode();
        }

        private function generateCode(int $length = 6): string {
            $chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
            $code = '';
            for ($i = 0; $i < $length; $i++) {
                $code .= $chars[random_int(0, strlen($chars) - 1)];
            }
            return $code;
        }
        private function codeExists(string $code): bool {
            $stmt = $this->pdo->prepare("SELECT id FROM multiplayer_rooms WHERE join_code = :code");
            $stmt->execute([':code' => $code]);
            return $stmt->fetch() !== false;
        }

        private function getUniqueCode(): string {
            do {
                $code = $this->generateCode();
            } while($this->codeExists($code));
            return $code;
        }

        private function getRoomID($code): ?int {
            $stmt = $this->pdo->prepare("SELECT id FROM multiplayer_rooms WHERE join_code = :code");
            $stmt->execute([':code' => $code]);
            return (int)$stmt->fetch();
        }

        private function getRoomStatus($code): array {
            $roomID = $this->getRoomID($code);
            if($roomID) {
                $zapytanie = $this->pdo->prepare("SELECT `status` FROM `multiplayer_rooms` WHERE `id` = :id");
                $zapytanie->bindParam(':id', $roomID, PDO::PARAM_STR);
                if($zapytanie->execute()) {
                    return $zapytanie->fetch();
                } 
            }
        }

        public function getUser1ID(): array {
            $zapytanie = $this->pdo->prepare("SELECT `player1_id` FROM `multiplayer_rooms` WHERE");
        }

        public function getUser2ID(): int {
            return $this->user1ID;
        }

        private function createRoom(int $user1ID): void {
            $zapytanie = $this->pdo->prepare("INSERT INTO `multiplayer_rooms` (`player1_id`, `join_code`, `status`) VALUES (:player1_id, :code, 'waiting')");
            $zapytanie->bindParam(':player1_id', $user1ID, PDO::PARAM_INT);
            $zapytanie->bindParam(':code', $this->code, PDO::PARAM_STR);
            $zapytanie->execute();
        }

        public function createRoomJSON(int $userID): string {
            $this->createRoom($userID);
            $this->user1ID = $userID;
            return json_encode(['joinCode' => $this->code]);
        }

        public function checkCode(string $code, int $user2ID): bool {
            if($this->codeExists($code)) {
                if($this->getRoomStatus($code) == 'waiting') {
                    $this->user2ID = $user2ID;
                    return true;
                } else {
                    return false;
                }
            } else {
                return false;
            }
        }
    }
?>