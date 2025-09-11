import GetTopTen from "./getTopTen.js";
const dinoTable = new GetTopTen(1, './leaderboard.php');
dinoTable.createTablebody('leaderboard-dino');
const snakeTable = new GetTopTen(2, './leaderboard.php');
snakeTable.createTablebody('leaderboard-snake');