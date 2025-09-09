-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Wrz 09, 2025 at 02:13 PM
-- Wersja serwera: 10.4.32-MariaDB
-- Wersja PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `gierkowo`
--

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `games`
--

CREATE TABLE `games` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `description` text DEFAULT NULL,
  `max_players` int(11) DEFAULT 1,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `multiplayer_rooms`
--

CREATE TABLE `multiplayer_rooms` (
  `id` int(11) NOT NULL,
  `game_id` int(11) NOT NULL,
  `player1_id` int(11) NOT NULL,
  `player2_id` int(11) DEFAULT NULL,
  `join_code` char(6) NOT NULL,
  `status` enum('waiting','in_progress','finished') DEFAULT 'waiting',
  `winner_id` int(11) DEFAULT NULL,
  `loser_id` int(11) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `scores`
--

CREATE TABLE `scores` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `game_id` int(11) NOT NULL,
  `score` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password_hash` varchar(255) NOT NULL,
  `current_win_streak` int(11) DEFAULT 0,
  `max_win_streak` int(11) DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `email`, `password_hash`, `current_win_streak`, `max_win_streak`, `created_at`) VALUES
(1, 'login', '123@123', '$2y$10$IiUneEA553hKjQIW4TiA0eS/2hbwQH/abUirR1ZYS/Vzn/s5nD1FC', 0, 0, '2025-09-06 22:32:53'),
(2, 'login2', '123@2', '$2y$10$8YvhVtXIdU0dduMcjiNnGO7K6bC3RJekFIHjz14E9qCa7c8ZT4lzC', 0, 0, '2025-09-07 19:21:07'),
(3, 'login3', 'email@1', '$2y$10$HMnJozCpvg9gesqYfnRQTuo.tzrZ8oqP2QympJhjF4zt1ZhWJmc6a', 0, 0, '2025-09-07 19:27:40'),
(4, 'login4', 'email@2', '$2y$10$RXn.PS.KU92jtCgf0A1C5elhxusH2.JTks9GEfO8WI2XlD6T0Vo2m', 0, 0, '2025-09-07 19:29:45'),
(5, 'login5', 'email@5', '$2y$10$eVD./T8xBEyU.Zg8IGlEH.1Kp6N7daD749k0iI2LBUdWdnpqlLbWq', 0, 0, '2025-09-07 20:37:04'),
(6, 'login6', 'email@6', '$2y$10$sk3JUVLxeDIH11SQjVYlMO0/s/oolTbpYliys7KX0zsYH/XycwhWe', 0, 0, '2025-09-07 20:37:20'),
(7, 'loginTestowy', '123@1233333', '$2y$10$mfqDggoQXrpWqEzqVpCLwuHw0Kw6ST0322nu.2n27rxvMf8iCnQA6', 0, 0, '2025-09-08 20:35:35'),
(8, 'gdsgsd', '21323123@31421sdfgds', '$2y$10$TKQhTjTd2EX/aSGUcCQoS.QsErHwUb2XY8nESpoor/qCeJIvaewvK', 0, 0, '2025-09-08 20:37:21'),
(9, '13231gfdgdf', 'dfhbserhz@hrtfhf', '$2y$10$GauDMl6ktlQrgCZbJRMbkOHgSrnzhNOhTM49Z4Uzp.eHFE8rbxxcK', 0, 0, '2025-09-08 20:37:38');

--
-- Indeksy dla zrzutów tabel
--

--
-- Indeksy dla tabeli `games`
--
ALTER TABLE `games`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indeksy dla tabeli `multiplayer_rooms`
--
ALTER TABLE `multiplayer_rooms`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `join_code` (`join_code`),
  ADD KEY `game_id` (`game_id`),
  ADD KEY `player1_id` (`player1_id`),
  ADD KEY `player2_id` (`player2_id`),
  ADD KEY `winner_id` (`winner_id`),
  ADD KEY `loser_id` (`loser_id`);

--
-- Indeksy dla tabeli `scores`
--
ALTER TABLE `scores`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `game_id` (`game_id`);

--
-- Indeksy dla tabeli `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `games`
--
ALTER TABLE `games`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `multiplayer_rooms`
--
ALTER TABLE `multiplayer_rooms`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `scores`
--
ALTER TABLE `scores`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `multiplayer_rooms`
--
ALTER TABLE `multiplayer_rooms`
  ADD CONSTRAINT `multiplayer_rooms_ibfk_1` FOREIGN KEY (`game_id`) REFERENCES `games` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `multiplayer_rooms_ibfk_2` FOREIGN KEY (`player1_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `multiplayer_rooms_ibfk_3` FOREIGN KEY (`player2_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `multiplayer_rooms_ibfk_4` FOREIGN KEY (`winner_id`) REFERENCES `users` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `multiplayer_rooms_ibfk_5` FOREIGN KEY (`loser_id`) REFERENCES `users` (`id`) ON DELETE SET NULL;

--
-- Constraints for table `scores`
--
ALTER TABLE `scores`
  ADD CONSTRAINT `scores_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `scores_ibfk_2` FOREIGN KEY (`game_id`) REFERENCES `games` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
