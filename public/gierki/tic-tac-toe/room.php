<?php
    class Room {
        private PDO $pdo;
        // private string $code = $this->getUniqueCode(); // tak nie można
        private string $code;
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

        private function getUniqueCode():string {
            do {
                $code = $this->generateCode();
            } while($this->codeExists($code));
            return $code;
        }

        private function getCode():string {
            return $this->code;
        }
        private function createRoom(int $user1ID):void {
            $zapytanie = $this->pdo->prepare("INSERT INTO `multiplayer_rooms` (`player1_id`, `join_code`, `status`) VALUES (:player1_id, :code, 'waiting')");
            $zapytanie->bindParam(':player1_id', $user1ID, PDO::PARAM_INT);
            $zapytanie->bindParam(':code', $this->code, PDO::PARAM_STR);
            $zapytanie->execute();
        }

        public function createRoomJSON(int $userID): string {
            $this->createRoom($userID);
            return json_encode(['joinCode' => $this->getCode()]);
        }
    }
?>