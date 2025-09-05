CREATE TABLE `scores` (
	`id` INT AUTO_INCREMENT PRIMARY KEY,
    `user_id` INT NOT NULL,
    `game_id` INT NOT NULL,
    `score` INT NOT NULL,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (game_id) REFERENCES games(id) ON DELETE CASCADE
);

#referencja do userów i gier
#ON DELETE CASCADE - jak sie usunie usera to usunie też jego rekordy. jak się usunie gre z bazy to też wywala rekordy