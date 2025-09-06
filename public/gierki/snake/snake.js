

//dźwięk
let menu_music = new Audio("");
let game_music = new Audio("./audio/music.mp3");
game_music.loop = true;
let eating = new Audio("./audio/eat.mp3");
let death;
let nazwa;
function death_sound(){
    const number = Math.floor(Math.random() * 10);
    nazwa = "./audio/death" + number + ".mp3";
    return nazwa;
}
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

//opcje
let radio1 = document.getElementById("radio1");
let radio2 = document.getElementById("radio2");
let radio3 = document.getElementById("radio3");
let radio4 = document.getElementById("radio4");
let radio5 = document.getElementById("radio5");
let radio6 = document.getElementById("radio6");
let opcje = document.querySelector(".options");


function options(){
    opcje.classList.remove("hide");
}
function OK(){
    opcje.classList.add("hide");
}
let clock = 1000/10 //(100 milisek.)
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
    menu.style.width = menu.style.height = opcje.style.width = opcje.style.height = Over.style.width = Over.style.height = "500px"
    radio4.checked = true;
})
let med = document.getElementById("med");
med.addEventListener("click", () => {
    rows = 30,
    columns = 30
    blockSize = 20
    menu.style.width = menu.style.height = opcje.style.width = opcje.style.height = Over.style.width = Over.style.height = "600px"
    radio5.checked = true;

})
let big = document.getElementById("big");
big.addEventListener("click", () => {
    rows = 50,
    columns = 50
    blockSize = 15
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
        chance = 0;
    }
}
function golden_apple(){                                      //szansa (10%)
    chance = Math.floor(Math.random() * 10);
    console.log(chance);
    if(chance == 8){
        randomGold();
    }
}


let time;
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
    snakeBody = [];
    gameOver = false
    score = 0;
    timeStart = koniec = time = 0;
    randomSnake();
    Over.classList.add("hide");
    timerStart();

}



play.addEventListener("click", () => {      //rozpoczęcie gry
    menu.classList.add("hide");

    plansza = document.getElementById("plansza");
    plansza.height = rows*blockSize;
    plansza.width = columns*blockSize;
    ctx = plansza.getContext('2d');
    
    randomApple();
    randomSnake();
    timerStart();
    document.addEventListener("keyup", keyUp);
    game_music.currentTime = 0;
    game_music.play();
    update();
    let game = setInterval(update, clock) // prędkość zegara całej gry




function update() {
    //koniec gry
    if(gameOver){
        Over.classList.remove("hide");
        timerEnd();
        pkt.innerHTML = "Score: " + score + "<br>Czas: " + time;
        clearInterval(game);
        game_music.pause();
        death_sound();
        death = new Audio(nazwa);
        death.play();
        return;
    }



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
        eating.play();
        golden_apple();
    }



    function eat(){
        score++;
        snakeBody.push([appleX, appleY]);           //powiększenie wensza
        randomApple();
        golden_apple();
    }



    if (snakeX == appleX && snakeY == appleY){      //zjedzenie japka
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

    ctx.fillText("Punkty: " + score, 10, 20);           //Interpretacja grafincza Pkt
    ctx.fillText("Czas: " + time, 10, 30)               //Interpretacja graficzna Czasu

    //"zasady" końca gry
    if(snakeX < 0 || snakeX >= columns*blockSize || snakeY < 0 || snakeY >= rows*blockSize){
        gameOver = true;                            //uderzenie w mur (wyjście poza plansze)
        timerEnd();
    }
    
    for (let i = 0; i < snakeBody.length; i++){
        if (snakeX == snakeBody[i][0] && snakeY == snakeBody[i][1]){
            gameOver = true;                        //zjedzenie samego siebie
            timerEnd();
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
            setTimeout(() => move = true, 50);
        }
        else if(e.code == "ArrowDown" && Y != -1){
            X = 0;
            Y = 1;
            move = false;
            setTimeout(() => move = true, 50);
        }
        else if(e.code == "ArrowLeft" && X != 1){
            X = -1;
            Y = 0;
            move = false;
            setTimeout(() => move = true, 50);
        }
        else if(e.code == "ArrowRight" && X != -1){
            X = 1;
            Y = 0;
            move = false;
            setTimeout(() => move = true, 50);
        }
            }

    }
})
    