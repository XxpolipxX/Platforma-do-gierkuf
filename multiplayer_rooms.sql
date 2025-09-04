CREATE TABLE `multiplayer_rooms` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `game_id` INT NOT NULL,
    `player1_id` INT NOT NULL,
    `player2_id` INT DEFAULT NULL,
    `join_code` CHAR(6) UNIQUE NOT NULL,
    `status` ENUM('waiting', 'in_progress', 'finished') DEFAULT 'waiting',
    `winner_id` INT DEFAULT NULL,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (game_id) REFERENCES games(id) ON DELETE CASCADE,
    FOREIGN KEY (player1_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (player2_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (winner_id) REFERENCES users(id) ON DELETE SET NULL
);

#głównie dla multi
#bierze id 2 graczy i zapisuje na stałe wygranego
#3 statusy rozgrywki waiting - czeka na 2 gracza, in_progress - w trakcie, finished - skończona
#jeden gracz tworzy pokój i generuje kod dołączenia - `join_code` na 6 znaków