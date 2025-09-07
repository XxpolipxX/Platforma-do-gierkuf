

//dźwięk

let menu_music = new Audio("");
let game_music = new Audio("./audio/music.mp3");
game_music.loop = true;
let eatingGold = new Audio("./audio/eat.mp3");
let eatingApple = new Audio("./audio/crunch.mp3")
let start = new Audio("./audio/start.mp3");
let start_set = new Audio("./audio/start_aftersett.mp3");
let back = new Audio("./audio/wstecz.mp3");
let death = new Audio("./audio/snakedeath.mp3")

//mute

let mute_music = document.getElementById("music_check");
let mute_sfx = document.getElementById("sfx_check");

function mute_check(){
    if (!mute_music.checked){
        game_music.muted = true;
        menu_music.muted = true;
    } else {
        game_music.muted = false;
        menu_music.muted = false;
    }

    if (!mute_sfx.checked){
        eatingGold.muted = true;
        start.muted = true;
        start_set.muted = true;
        death.muted = true;
        back.muted = true;
        eatingApple.muted = true;
    } else {
        eatingGold.muted = false;
        start.muted = false;
        start_set.muted = false;
        death.muted = false;
        back.muted = false;
        eatingApple.muted = false;
    }
}

//menu
let menu = document.querySelector(".menu");
let play = document.getElementById("play");
let Over = document.querySelector(".gameOver");
let pkt = document.getElementById("output");
let slider = document.getElementById("slider");

//plansza

let plansza;
plansza = document.getElementById("plansza");
let blockSize = 25;  //wielkość bloku jednego
let rows = 20;
let columns = 20;
let ctx;

//wonsz
let snakeX = blockSize*10;
let snakeY = blockSize*10;
let X = 0;                       //prędkość
let Y = 0;
let snakeBody = [];

//jabuszko + pkt
let appleX;
let appleY;
let score = 0;
let chance;

//złote japko
let goldX;
let goldY;
let goldTime = 3000;
let cooldown;

//opcje
let radio1 = document.getElementById("radio1");
let radio2 = document.getElementById("radio2");
let radio3 = document.getElementById("radio3");
let radio4 = document.getElementById("radio4");
let radio5 = document.getElementById("radio5");
let radio6 = document.getElementById("radio6");
let opcje = document.querySelector(".options");


function options(){
    setTimeout(() => opcje.classList.remove("hide"), 600);   //cooldown po naciśnięciu Play
    slider.classList.add("move-left");
    void slider.offsetWidth;
    setTimeout(() => slider.classList.remove("move-left"), 1000);
    start.play();
}
function wstecz(){
    setTimeout(() => opcje.classList.add("hide"), 400);
    mute_check();
    slider.classList.add("move-right");
    setTimeout(() => slider.classList.remove("move-right"), 1000)
    back.play();
}
let clock = 1000/12 //(120 milisek.)
let easy = document.getElementById("easy");
easy.addEventListener("click", () => {
    radio1.checked = true;
    clock = 1000/10
})
let norm = document.getElementById("norm");
norm.addEventListener("click", () => {
    radio2.checked = true;
    clock = 1000/12
})
let hard = document.getElementById("hard");
hard.addEventListener("click", () => {
    radio3.checked = true;
    clock = 1000/20
})
let small = document.getElementById("small");
small.addEventListener("click", () => {
    rows = 20,
    columns = 20
    blockSize = 25;
    goldTime = 2000;
    menu.style.width = menu.style.height = opcje.style.width = opcje.style.height = Over.style.width = Over.style.height = "500px"
    radio4.checked = true;
})
let med = document.getElementById("med");
med.addEventListener("click", () => {
    rows = 30,
    columns = 30
    blockSize = 20
    goldTime = 3000;
    menu.style.width = menu.style.height = opcje.style.width = opcje.style.height = Over.style.width = Over.style.height = "600px"
    radio5.checked = true;

})
let big = document.getElementById("big");
big.addEventListener("click", () => {
    rows = 50,
    columns = 50
    blockSize = 15
    goldTime = 4000;
    menu.style.width = menu.style.height = opcje.style.width = opcje.style.height = Over.style.width = Over.style.height = "750px"
    radio6.checked = true;
})




function randomApple() {                                         //losowanie pozycji japka
    appleX = Math.floor(Math.random() * columns) * blockSize;
    appleY = Math.floor(Math.random() * rows) * blockSize; 
}
function randomSnake() {                                        //losowanie węża na początku gry
    snakeX = Math.floor(Math.random() * columns) * blockSize;
    snakeY = Math.floor(Math.random() * rows) *blockSize;
}
function randomGold(){                                          //losowanie pozycji złotego japka
    if (chance == 8){
        goldX = Math.floor(Math.random() * columns) * blockSize;
        goldY = Math.floor(Math.random() * columns) * blockSize;
        cooldown = setTimeout(() => goldX = goldY = undefined, goldTime);
        chance = 0;
        return cooldown;
    }
}
function golden_apple(){                                      //szansa (10%) na pojawienie się złotego japka
    chance = Math.floor(Math.random() * 10);
    console.log(chance);
    if(chance == 8){
        clearTimeout(cooldown);
        randomGold();
    }
}

let time = 0;
let timeStart;
let koniec;
let timer;
function timerStart(){
    timeStart = new Date().getTime();
    timer = setInterval(() =>{
        const now = new Date().getTime();
        time = Math.floor((now - timeStart) / 1000);
    })
}
function timerEnd(){
    clearInterval(timer);
}

let gameOver = false;



//ponowne menu główne
function again(){
    menu.classList.remove("hide");
    X = 0;
    Y = 0;
    clock = 1000/12;
    snakeBody = [];
    gameOver = false
    score = 0;
    timeStart = koniec = time = 0;
    randomSnake();
    Over.classList.add("hide");
}

let game;

play.addEventListener("click", () => {      //rozpoczęcie gry
    clearInterval(game);
    setTimeout(() => plansza.classList.remove("hide"), 600);
    slider.classList.add("move-left");
    setTimeout(() => slider.classList.remove("move-left"), 1000);
    setTimeout(() => menu.classList.add("hide"), 500);
    start_set.play();
    plansza.height = rows*blockSize;
    plansza.width = columns*blockSize;
    ctx = plansza.getContext('2d');
    
    mute_check();
    randomApple();
    randomSnake();
    timerStart();
    document.addEventListener("keyup", keyUp);
    game_music.currentTime = 0;

    setTimeout(() => game_music.play(), 1000)
    update();
    ctx.clearRect(0, 0, plansza.width, plansza.height);
    game = setInterval(update, clock) // prędkość zegara całej gry
    
    
    
    
    function update() {
        //koniec gry
        if(gameOver){
        Over.classList.remove("hide");
        pkt.innerHTML = "Score: " + score + "<br>Czas: " + time;
        clearInterval(game);
        game_music.pause();
        plansza.classList.add("hide");
        return;
    }
    
    
    ctx.clearRect(0, 0, plansza.width, plansza.height);
    // console.log("X: " + snakeX + ", Y: " + snakeY + "over: " + gameOver)
    ctx.fillStyle = "black";                            //interpretacja graficzna planszy
    ctx.fillRect(0, 0, plansza.width, plansza.height);
    
    ctx.fillStyle="Red";                                //interpretacja graficzna japka
    ctx.fillRect(appleX, appleY, blockSize, blockSize)
    
    ctx.fillStyle="Yellow";                             //interpretacja graficzna złotego japka
    ctx.fillRect(goldX, goldY, blockSize, blockSize)
    
    

    
    
    function eatGold(){
        score += 5;
        snakeBody.push([goldX, goldY]);
        goldX = goldY = undefined;                      //ściek czyści złote japko (że ni ma po zjedzeniu)
        point_anim(5);
        eatingGold.play();
    }
    
    
    
    function eat(){
        score++;
        snakeBody.push([appleX, appleY]);           //powiększenie wensza
        console.log(eatingApple)
        eatingApple.play();
        point_anim(1);
        randomApple();
        golden_apple();
    }
    let point_target = 30;
    let point_posY = 50;
    let point_posX = 90;


    function point_anim(pointNumber){
        if(score >= 10){
            point_posX = 95;
        }
        ctx.fillStyle = "#ffdd00ff"
        ctx.fillText("+" + pointNumber, point_posX, point_posY);
        if (point_posY > point_target ){
            point_posY -= 0.8;
            requestAnimationFrame(() => point_anim(pointNumber));
        }
    }
    
    
    if (snakeX == appleX && snakeY == appleY){      //zjedzenie japka
        // ctx.clearRect(0, 0, plansza.width, plansza.height);
        eat();
    }
    if(snakeX == goldX && snakeY == goldY){         //zjedzenie złotego japka
        eatGold();                            
    }
    
    for(let i = snakeBody.length-1; i>0; i--){      //skręt ciała wensza
        snakeBody[i] = snakeBody[i-1];
    }
    if(snakeBody.length) {
        snakeBody[0] = [snakeX, snakeY];
    }

    ctx.fillStyle="lime";                           //interpretacja graficzna wensza
    snakeX += X*blockSize;
    snakeY += Y*blockSize;
    ctx.fillRect(snakeX, snakeY, blockSize, blockSize)
    for(let i = 0; i < snakeBody.length; i++){
        ctx.fillRect(snakeBody[i][0], snakeBody[i][1], blockSize, blockSize) //snakeBody [X][Y]; interpretacja graficzna ciała wensza (części dodawanych)
    }
    
    ctx.font = "20px snakeFont";
    ctx.fillStyle = "#fff"
    ctx.fillText("Czas: " + time, 10, 20)               //Interpretacja graficzna Czasu
    ctx.fillStyle = "#fff"
    ctx.fillText("Punkty: " + score, 10, 50);           //Interpretacja grafincza Pkt

    //"zasady" końca gry
    if(snakeX < 0 || snakeX >= columns*blockSize || snakeY < 0 || snakeY >= rows*blockSize){
        gameOver = true                     //uderzenie w mur (wyjście poza plansze)
        game_music.pause();
        death.play();
        timerEnd();
        clearInterval(game);
        setTimeout(() => game = setInterval(update, clock), 2000);
    }
    
    for (let i = 0; i < snakeBody.length; i++){
        if (snakeX == snakeBody[i][0] && snakeY == snakeBody[i][1]){
            gameOver = true                //zjedzenie samego siebie
            game_music.pause();
            death.play();
            timerEnd();
            clearInterval(game);
            setTimeout(() => game = setInterval(update, clock), 2000);
        }
    }
}



let move = true;
    function keyUp(e){
        if(move == false){
            console.log("aa")
            return;} else {
        
        if(e.code == "ArrowUp" && Y != 1){
            X = 0;
            Y = -1;
            move = false;
            setTimeout(() => move = true, 75);      //cooldown (bo spoceniec może przez przypadek umrzeć)
        }
        else if(e.code == "ArrowDown" && Y != -1){
            X = 0;
            Y = 1;
            move = false;
            setTimeout(() => move = true, 75);
        }
        else if(e.code == "ArrowLeft" && X != 1){
            X = -1;
            Y = 0;
            move = false;
            setTimeout(() => move = true, 75);
        }
        else if(e.code == "ArrowRight" && X != -1){
            X = 1;
            Y = 0;
            move = false;
            setTimeout(() => move = true, 75);
        }
            }

    }
})
    