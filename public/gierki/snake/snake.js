

//dźwięk

let menu_music = new Audio("./audio/menu_music.mp3");
menu_music.loop = true;
let game_music = new Audio("./audio/music.mp3");
game_music.volume = 0.5;
let pause_music = new Audio("./audio/pause_music.mp3");
pause_music.volume = 0.5;
game_music.loop = true;
pause_music.loop = true;
let eatingGold = new Audio("./audio/eat.mp3");
eatingGold.volume = 0.5;
let eatingApple = new Audio("./audio/crunch.mp3");
eatingApple.volume = 0.5;
let start = new Audio("./audio/start.mp3");
start.volume = 0.5;
let start_set = new Audio("./audio/start_aftersett.mp3");
start_set.volume = 0.5;
let back = new Audio("./audio/wstecz.mp3");
back.volume = 0.5;
let death = new Audio("./audio/snakedeath.mp3");
death.volume = 0.5;
let fst = new Audio("./audio/przejscie.mp3");
fst.volume = 0.5;
let on = new Audio("./audio/on.mp3");
let off = new Audio("./audio/off.mp3");
let sfx_vol = document.getElementById("sfx_vol");
let music_vol = document.getElementById("music_vol");
let tick = new Audio ("./audio/tick.mp3");

//mute
let mute_music = document.getElementById("music_check");
let mute_sfx = document.getElementById("sfx_check");
function On(on_sound){
    let smth = on_sound.cloneNode();
    smth.play();
}
function Off(off_sound){
    let smth = off_sound.cloneNode();
    smth.play();
}
mute_sfx.addEventListener("change", () => {
    if(mute_sfx.checked){
        On(on);
        sfx_vol.style.display = "block";
    } else {
        mute_check();
        sfx_vol.style.display = "none";
    }
})
mute_music.addEventListener("change", () => {
    if(mute_music.checked){
        mute_check();
        On(on);
        music_vol.style.display = "block";
    } else {
        mute_check();
        Off(off);
        music_vol.style.display = "none";
    }
})

sfx_vol.addEventListener("input", () => {
    let Vol = sfx_vol.value / 100;
    eatingApple.volume = Vol;
    eatingGold.volume = Vol;
    start.volume = Vol;
    start_set.volume = Vol;
    back.volume = Vol;
    death.volume = Vol;
    fst.volume = Vol;
    on.volume = Vol;
    off.volume = Vol;
})
music_vol.addEventListener("input", () => {
    let Vol = music_vol.value / 100;
    menu_music.volume = Vol;
    game_music.volume = Vol;
    pause_music.volume = Vol;
})

function mute_check(){
    if (!mute_music.checked){
        game_music.muted = true;
        menu_music.muted = true;
        pause_music.muted = true;
        return true;
    } else {
        game_music.muted = false;
        menu_music.muted = false;
        pause_music.muted = false;
    }

    if (!mute_sfx.checked){
        eatingGold.muted = true;
        start.muted = true;
        start_set.muted = true;
        death.muted = true;
        back.muted = true;
        eatingApple.muted = true;
        fst.muted = true;
        on.muted = true;
        off.muted = true;
    } else {
        eatingGold.muted = false;
        start.muted = false;
        start_set.muted = false;
        death.muted = false;
        back.muted = false;
        eatingApple.muted = false;
        fst.muted = false;
        on.muted = false;
        off.muted = false;
    }
}

//menu
let menu = document.querySelector(".menu");
let play = document.getElementById("play");
let Over = document.querySelector(".gameOver");
let pkt = document.getElementById("output");
let slider = document.getElementById("slider");
let pauza = document.querySelector(".pauza");
let menu_area =  document.querySelector(".menu_area");
let click = document.querySelector(".click");
let startText = document.getElementById("startText");
let one = document.querySelector(".one");
let two = document.querySelector(".two");
let three = document.querySelector(".three");
let numbers = document.querySelector(".numbers");
let Table = document.querySelector(".leaderboard");

click.addEventListener("click", () => {             //"kliknij aby rozpocząć" po kliknięciu
    menu_music.play();
    menu_music.volume = 0.3;
    startText.style.display = "none";
    setTimeout(() => click.classList.add("hide"), 4000);
    setTimeout(() => slider.classList.add("move-left"), 3450)
    setTimeout(() => slider.classList.remove("move-left"), 4700);
    setTimeout(() => menu.classList.remove("hide"), 4000);
})
//plansza

let plansza;
plansza = document.getElementById("plansza");
let blockSize = 25;  //wielkość bloku jednego
let rows = 20;
let columns = 20;
let ctx;
let diff = "Normalny (x1)"


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
let point_mult = 1;

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

function leaderboard(){
    setTimeout(() => Table.classList.remove("hide"), 600);
    slider.classList.add("move-left");
    setTimeout(() => slider.classList.remove("move-left"), 1000);
    setTimeout(() => fst.play(), 350)
    start.play();
}
function wsteczTable(){
    setTimeout(() => Table.classList.add("hide"), 400);
    mute_check();
    slider.classList.add("move-right");
    setTimeout(() => slider.classList.remove("move-right"), 1000)
    back.play();
    setTimeout(() => fst.play(), 200)
}
function options(){
    setTimeout(() => opcje.classList.remove("hide"), 600);   //cooldown po naciśnięciu Play
    slider.classList.add("move-left");
    setTimeout(() => slider.classList.remove("move-left"), 1000);
    setTimeout(() => fst.play(), 350)
    start.play();
}
function wstecz(){
    setTimeout(() => opcje.classList.add("hide"), 400);
    mute_check();
    slider.classList.add("move-right");
    setTimeout(() => slider.classList.remove("move-right"), 1000)
    back.play();
    setTimeout(() => fst.play(), 200)
}
let clock = 1000/12 //(120 milisek.)
let easy = document.getElementById("easy");
easy.addEventListener("click", () => {
    radio1.checked = true;
    clock = 1000/8
    point_mult = 0.75;
    diff = "Łatwy (x0.75)";
})
let norm = document.getElementById("norm");
norm.addEventListener("click", () => {
    radio2.checked = true;
    clock = 1000/10
    point_mult = 1;
    diff = "Normalny (x1)"
})
let hard = document.getElementById("hard");
hard.addEventListener("click", () => {
    radio3.checked = true;
    clock = 1000/15
    point_mult = 1.5;
    diff = "Trudny (x1.5)";
})
let small = document.getElementById("small");
small.addEventListener("click", () => {
    rows = 20,
    columns = 20
    blockSize = 25;
    goldTime = 2000;
    menu.style.width = menu.style.height = opcje.style.width = opcje.style.height = Over.style.width = Over.style.height = menu_area.style.width = menu_area.style.height = pauza.style.width = pauza.style.height = numbers.style.width = numbers.style.height = "500px"
    one.style.width = one.style.height = two.style.width = two.style.height = three.style.width = three.style.height = Table.style.width = Table.style.height = "500px"
    radio4.checked = true;
})
let med = document.getElementById("med");
med.addEventListener("click", () => {
    rows = 30,
    columns = 30
    blockSize = 20
    goldTime = 3000;
    menu.style.width = menu.style.height = opcje.style.width = opcje.style.height = Over.style.width = Over.style.height = menu_area.style.width = menu_area.style.height = pauza.style.width = pauza.style.height = numbers.style.width = numbers.style.height = "600px"
    one.style.width = one.style.height = two.style.width = two.style.height = three.style.width = three.style.height = Table.style.width = Table.style.height = "600px"
    radio5.checked = true;

})
let big = document.getElementById("big");
big.addEventListener("click", () => {
    rows = 50,
    columns = 50
    blockSize = 15
    goldTime = 4000;
    menu.style.width = menu.style.height = opcje.style.width = opcje.style.height = Over.style.width = Over.style.height = menu_area.style.width = menu_area.style.height = pauza.style.width = pauza.style.height = numbers.style.width = numbers.style.height = "750px"
    one.style.width = one.style.height = two.style.width = two.style.height = three.style.width = three.style.height = Table.style.width = Table.style.height = "750px"
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




let gameOver = false;



//ponowne menu główne
function again(){
    setTimeout(() => menu.classList.remove("hide"), 400);
    X = 0;
    Y = 0;
    snakeBody = [];
    gameOver = false
    score = 0;
    menu_music.play();
    slider.classList.add("move-right");
    setTimeout(() => plansza.classList.add("hide"), 1000);
    setTimeout(() => slider.classList.remove("move-right"), 1000)
    randomSnake();
    setTimeout(() => Over.classList.add("hide"), 400);
    setTimeout(() => fst.play(), 200)
}

function PauseRestart(){
    game_music.pause();
    pause_music.pause();
    pauza.classList.add("hide");
    again();
}

let game;
let eventCheck = false;
play.addEventListener("click", () => {      //rozpoczęcie gry
    clearInterval(game);
    setTimeout(() => plansza.classList.remove("hide"), 500);
    slider.classList.add("move-left");
    setTimeout(() => slider.classList.remove("move-left"), 1000);
    setTimeout(() => menu.classList.add("hide"), 550);
    menu_music.pause();
    start_set.play();
    plansza.height = rows*blockSize;
    plansza.width = columns*blockSize;
    ctx = plansza.getContext('2d');
    
    mute_check();
    randomApple();
    randomSnake();
    if(!eventCheck){
        document.addEventListener("keyup", keyUp);
        eventCheck = true;
    }
    game_music.currentTime = 0;
    pause_music.currentTime = 0;

    setTimeout(() => game_music.play(), 1000)
    setTimeout(() => pause_music.play(), 1000)
    update();
    ctx.clearRect(0, 0, plansza.width, plansza.height);
    game = setInterval(update, clock) // prędkość zegara całej gry
    
    
    
    
    function update() {
        //koniec gry
        if(gameOver){
        Over.classList.remove("hide");
        let final_score = Math.floor(score*point_mult)
        pkt.innerHTML = "Zdobyte punkty: " + score + "<br>Mnożnik pkt: x" + point_mult + "<br>Wynik końcowy: " + final_score;
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
    let point_target = 20;
    let point_posY = 30;
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
    ctx.fillText("Punkty: " + score, 10, 30);           //Interpretacja grafincza Pkt
    

    //"zasady" końca gry
    if(snakeX < 0 || snakeX >= columns*blockSize || snakeY < 0 || snakeY >= rows*blockSize){
        gameOver = true                     //uderzenie w mur (wyjście poza plansze)
        game_music.pause();
        pause_music.pause();
        death.play();
        clearInterval(game);
        setTimeout(() => game = setInterval(update, clock), 2000);
    }
    
    for (let i = 0; i < snakeBody.length; i++){
        if (snakeX == snakeBody[i][0] && snakeY == snakeBody[i][1]){
            gameOver = true                //zjedzenie samego siebie
            game_music.pause();
            pause_music.pause();
            death.play();
            clearInterval(game);
            setTimeout(() => game = setInterval(update, clock), 2000);
        }
    }
}

let diffShow = document.getElementById("diff");
let can = true;


function tick3(){
    three.classList.remove("hide");
    tick.play();
    setTimeout(() => three.classList.add("hide"), 299);
}
function tick2(){
    two.classList.remove("hide");
    tick.play();
    setTimeout(() => two.classList.add("hide"), 299);
}
function tick1(){
    one.classList.remove("hide");
    tick.play();
    setTimeout(() => one.classList.add("hide"), 299);
}
    


function pause(){
    if(can == false){
        return;
    }else{
        pauza.classList.toggle("hide");
        if(!pauza.classList.contains("hide")){
            if(mute_check()){
                game_music.muted = true;
                pause_music.muted = true;
            } else{
                game_music.muted = true;
                pause_music.muted = false;
            }
            clearInterval(game);
            can = false;
            setTimeout(() => can = true, 500)
        } else {
            tick3();
            setTimeout(() => tick2(), 300);
            setTimeout(() => tick1(), 600);
            game_music.muted = false;
            pause_music.muted = true;
            mute_check();
            setTimeout(() => game = setInterval(update, clock), 900);
            can = false;
            setTimeout(() => can = true, 500),
            900

        }
    }
    diffShow.innerHTML = "Poziom trudności: " + diff;
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
                setTimeout(() => move = true, 80);      //cooldown (bo spoceniec może przez przypadek umrzeć)
            }
            else if(e.code == "ArrowDown" && Y != -1){
                X = 0;
                Y = 1;
                move = false;
                setTimeout(() => move = true, 80);
            }
            else if(e.code == "ArrowLeft" && X != 1){
                X = -1;
                Y = 0;
                move = false;
                setTimeout(() => move = true, 80);
            }
            else if(e.code == "ArrowRight" && X != -1){
                X = 1;
                Y = 0;
                move = false;
                setTimeout(() => move = true, 80);
            }
            else if(e.code == "Escape"){
                pause();
            }
        }

    }
})

    