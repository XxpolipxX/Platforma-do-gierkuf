//menu
let menu = document.querySelector(".menu");
let play = document.getElementById("play");
let Over = document.querySelector(".gameOver");
let pkt = document.getElementById("output");
//plansza

let blockSize = 25;  //wielkość bloku jednego
let rows = 20;
let columns = 20;
let plansza;
let ctx;

//wonsz
let snakeX = blockSize*10;
let snakeY = blockSize*10;
let X = 0; //prędkość
let Y = 0;
let snakeBody = [];

//jabuszko + pkt
let appleX;
let appleY;
let score = 0;

//opcje
let opcje = document.querySelector(".opcje");
function options(){
    opcje.classList.remove("hide");
}
function OK(){
    opcje.classList.add("hide");
}
let clock = 1000/10 //(100 milisek.)
let easy = document.getElementById("easy");
easy.addEventListener("click", () => {
    clock = 1000/10
})
let norm = document.getElementById("norm");
norm.addEventListener("click", () => {
    clock = 1000/15
})
let hard = document.getElementById("hard");
hard.addEventListener("click", () => {
    clock = 1000/20
})
let small = document.getElementById("small");
small.addEventListener("click", () => {
    rows = 20,
    columns = 20
    menu.style.width = menu.style.height = opcje.style.width = opcje.style.height = Over.style.width = Over.style.height = "500px"
})
let med = document.getElementById("med");
med.addEventListener("click", () => {
    rows = 30,
    columns = 30
    blockSize = 20
    menu.style.width = menu.style.height = opcje.style.width = opcje.style.height = Over.style.width = Over.style.height = "600px"

})
let big = document.getElementById("big");
big.addEventListener("click", () => {
    rows = 50,
    columns = 50
    blockSize = 15
    menu.style.width = menu.style.height = opcje.style.width = opcje.style.height = Over.style.width = Over.style.height = "750px"
})

function randomApple() {                                      //losowanie pozycji japka
    appleX = Math.floor(Math.random() * columns) * blockSize;
    appleY = Math.floor(Math.random() * rows) * blockSize;
}
function randomSnake() {                                      //losowanie węża na początku gry
    snakeX = Math.floor(Math.random() * columns) * blockSize;
    snakeY = Math.floor(Math.random() * rows) *blockSize;
}

let gameOver = false;

//ponowne menu główne
function again(){
    menu.classList.remove("hide");
    X = 0;
    Y = 0;
    snakeBody = [];
    gameOver = false
    randomSnake();
    Over.classList.add("hide");
}
play.addEventListener("click", () => {      //rozpoczęcie gry
    menu.classList.add("hide");

    plansza = document.getElementById("plansza");
    plansza.height = rows*blockSize;
    plansza.width = columns*blockSize;
    ctx = plansza.getContext('2d');
    
    randomApple();
    randomSnake();
    document.addEventListener("keyup", keyUp);
    update();
    let game = setInterval(update, clock) // prędkość zegara całej gry

function update() {
    //koniec gry
    if(gameOver){
        Over.classList.remove("hide");
        pkt.innerHTML = "Score: " + score;
        clearInterval(game);
        return;
    }
    console.log("X: " + snakeX + ", Y: " + snakeY + "over: " + gameOver)
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, plansza.width, plansza.height);
    
    ctx.fillStyle="Red";
    ctx.fillRect(appleX, appleY, blockSize, blockSize)
    
    if (snakeX == appleX && snakeY == appleY){
        score++
        snakeBody.push([appleX, appleY]);
        randomApple();
    }
    
    for(let i = snakeBody.length-1; i>0; i--){
        snakeBody[i] = snakeBody[i-1];
    }
    if(snakeBody.length) {
        snakeBody[0] = [snakeX, snakeY];
    }

    ctx.fillStyle="lime";
    snakeX += X*blockSize;
    snakeY += Y*blockSize;
    ctx.fillRect(snakeX, snakeY, blockSize, blockSize)
    for(let i = 0; i < snakeBody.length; i++){
        ctx.fillRect(snakeBody[i][0], snakeBody[i][1], blockSize, blockSize) //snakeBody [X][Y]
    }

    //"zasady" końca gry
    if(snakeX < 0 || snakeX >= columns*blockSize || snakeY < 0 || snakeY >= rows*blockSize){
        gameOver = true; //uderzenie w mur (wyjście poza plansze)
    }
    
    for (let i = 0; i < snakeBody.length; i++){
        if (snakeX == snakeBody[i][0] && snakeY == snakeBody[i][1]){
            gameOver = true; //zjedzenie samego siebie
        }
    }
}
    function keyUp(e){
        if(e.code == "ArrowUp" && Y != 1){
            X = 0;
            Y = -1;
        }
        else if(e.code == "ArrowDown" && Y != -1){
            X = 0;
            Y = 1;
        }
        else if(e.code == "ArrowLeft" && X != 1){
            X = -1;
            Y = 0;
        }
        else if(e.code == "ArrowRight" && X != -1){
            X = 1;
            Y = 0;
        }
    }

})
    