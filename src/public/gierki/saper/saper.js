//menu

let menu = document.querySelector(".menu");
let menuArea = document.querySelector(".menuArea");
let ramka = document.querySelector(".ramka");
let navSpace = document.querySelector(".nav-space");
let face = document.getElementById("tenna");
let lose = document.querySelector(".lose");
let explosionGif = document.getElementById("explosion");
let opcje = document.querySelector(".opcje");
let score = document.getElementById("score");
let scoreText = document.querySelector(".score");
//przyciski

let startBtn = document.getElementById("startBtn");
let restartBtn = document.getElementById("resetBtn");
let block = document.getElementById("block");

//audio

let explosion = new Audio("./audio/explosion.mp3");
let mine = new Audio("./audio/mineClick.mp3");
//plansza
let plansza = document.getElementById("plansza");
let board = [];
let rows = 9;
let columns = 9;
let tileSize = plansza.getElementsByTagName("div");

let mineCounter = 10;
let mineLocation = [];
let minesLeft;

let tileClicked = 0;
let flagMode = false;
let flagCounter;

let gameOver = false;

let multiplier, minTime;
let points = 0;
let timePoints;
let pointsFinal;
//opcje

let easy = document.getElementById("easy");
let med = document.getElementById("med");
let exp = document.getElementById("exp");

let small, big, norm, anim;

easy.addEventListener("click", () =>{
    rows = 9;
    columns = 9;
    mineCounter = flagCounter = 10;
    multiplier = 5;
    minTime = 360;

    anim = "9x9";

    big = true;
    small = norm = false;
    menu.style.width = "450px";
    menu.style.height = "600px";
    
    menuArea.style.width = "460px";
    menuArea.style.height = "625px";

    ramka.style.width = "500px";
    ramka.style.height = "625px";

    plansza.style.width = plansza.style.height = "450px";

    navSpace.style.width = "430px"
    document.getElementById("mineCounter").innerHTML = mineCounter;
    explosionGif.style.width = "60%"
    explosionGif.style.transform = "translate(-450px, -400px)"

    opcje.style.width = "475px"
    opcje.style.height = "400px"

    block.style.pointerEvents = "all";
    diffBtn();
});

med.addEventListener("click", () =>{
    rows = 16;
    columns = 16;
    mineCounter = flagCounter = 40;
    multiplier = 10;
    minTime = 600;

    anim = "16x16";

    norm = true;
    small = big = false;

    menu.style.width = "592px";
    menu.style.height = "742px";
    
    menuArea.style.width = "602px";
    menuArea.style.height = "767px";

    ramka.style.width = "642px";
    ramka.style.height = "767px";

    plansza.style.width = plansza.style.height = "592px";

    navSpace.style.width = "572px"
    document.getElementById("mineCounter").innerHTML = mineCounter;
    explosionGif.style.width = "70%"
    explosionGif.style.transform = "translate(-600px, -400px)"

    opcje.style.width = "592px"
    opcje.style.height = "542px"
    block.style.pointerEvents = "all";

    diffBtn();
})

exp.addEventListener("click", () =>{
    rows = 16;
    columns = 30;
    mineCounter = flagCounter = 99;
    multiplier = 15;
    minTime = 900;

    anim = "30x16";

    big = norm = false;
    small = true;

    menu.style.width = "750px";
    menu.style.height = "550px";
    
    menuArea.style.width = "760px";
    menuArea.style.height = "550px";

    ramka.style.width = "800px";
    ramka.style.height = "575px";

    plansza.style.width = "750px"
    plansza.style.height = "400px";

    navSpace.style.width = "730px"
    document.getElementById("mineCounter").innerHTML = mineCounter;
    explosionGif.style.width = "75%"
    explosionGif.style.transform = "translate(-600px, -550px)"

    opcje.style.width = "750px";
    opcje.style.height = "350px"
    block.style.pointerEvents = "all";

    diffBtn();
})

function back(){
    if(anim == "9x9"){
        menu.classList.add("endAnim9x9");
        menu.classList.remove("hide");
        document.querySelector(".menuArea").classList.remove("hide");
        setTimeout(() => {
            plansza.classList.add("hide");
            menu.classList.remove("endAnim9x9");
        }, 1950)
    } else if(anim == "16x16"){
        menu.classList.remove("hide");
        menuArea.classList.remove("hide");
        menu.classList.add("endAnim16x16");
        document.querySelector(".menuArea").classList.remove("hide");
        setTimeout(() => {
            plansza.classList.add("hide");
            menu.classList.remove("endAnim16x16");
        }, 1950)
    } else if (anim == "30x16"){
        menu.classList.remove("hide");
        menuArea.classList.remove("hide");
        menu.classList.add("endAnim30x16");
        document.querySelector(".menuArea").classList.remove("hide");
        setTimeout(() => {
            plansza.classList.add("hide");
            menu.classList.remove("endAnim30x16");
        }, 1950)
    };

    setTimeout(() => {
        plansza.classList.add("hide");
        scoreText.classList.add("hide");
        menu.classList.remove("hide");
        opcje.classList.remove("hide");
        menuArea.classList.remove("hide");
        tileClicked = 0;
        row = [];
        mineLocation = [];
        points = 0;
        pointsFinal = 0;
        block.style.pointerEvents = "none";
        anim = ""
        diffBtn();
        board = [];
        document.getElementById("timer").innerHTML = "00:00";
        gameOver = false;

        for(let i = 0; i < rows; i++){
            for(let j = 0; j < columns; j++){
                plansza.querySelectorAll("div").forEach(div => div.remove());
            }
        }
    }, 1600)

}
function diffBtn(){
    if(anim == "9x9"){
        easy.style.borderTop = "5px solid gray"
        easy.style.borderLeft = "5px solid gray"
        easy.style.borderBottom = "5px solid whitesmoke"
        easy.style.borderRight = "5px solid whitesmoke"

        med.style.borderTop = exp.style.borderTop = "5px solid whitesmoke"
        med.style.borderLeft = exp.style.borderLeft = "5px solid whitesmoke"
        med.style.borderBottom = exp.style.borderBottom = "5px solid gray"
        med.style.borderRight = exp.style.borderRight = "5px solid gray"


    } else if (anim == "16x16"){
        med.style.borderTop = "5px solid gray"
        med.style.borderLeft = "5px solid gray"
        med.style.borderBottom = "5px solid whitesmoke"
        med.style.borderRight = "5px solid whitesmoke"

        easy.style.borderTop = exp.style.borderTop = "5px solid whitesmoke"
        easy.style.borderLeft = exp.style.borderLeft = "5px solid whitesmoke"
        easy.style.borderBottom = exp.style.borderBottom = "5px solid gray"
        easy.style.borderRight = exp.style.borderRight = "5px solid gray"
    } else if (anim == "30x16"){
        exp.style.borderTop = "5px solid gray"
        exp.style.borderLeft = "5px solid gray"
        exp.style.borderBottom = "5px solid whitesmoke"
        exp.style.borderRight = "5px solid whitesmoke"

        med.style.borderTop = easy.style.borderTop = "5px solid whitesmoke"
        med.style.borderLeft = easy.style.borderLeft = "5px solid whitesmoke"
        med.style.borderBottom = easy.style.borderBottom = "5px solid gray"
        med.style.borderRight = easy.style.borderRight = "5px solid gray"
    } else {
        med.style.borderTop = exp.style.borderTop = easy.style.borderTop = "5px solid whitesmoke"
        med.style.borderLeft = exp.style.borderLeft = easy.style.borderLeft = "5px solid whitesmoke"
        med.style.borderBottom = exp.style.borderBottom = easy.style.borderBottom = "5px solid gray"
        med.style.borderRight = exp.style.borderRight = easy.style.borderRight = "5px solid gray"
    }
        startBtn.style.borderTop = "5px solid whitesmoke"
        startBtn.style.borderLeft = "5px solid whitesmoke"
        startBtn.style.borderBottom = "5px solid gray"
        startBtn.style.borderRight = "5px solid gray"
}

startBtn.addEventListener("click", () => {
    for(let i = 0; i < rows; i++){
        for(let j = 0; j < columns; j++){
            plansza.querySelectorAll("div").forEach(div => div.remove());
        }
    }
    gameOver = false;
    face.src = "./idle.gif";
    plansza.classList.remove("hide");
    scoreText.classList.add("hide");
    tileClicked = 0;
    row = [];
    mineLocation = [];
    points = 0;
    pointsFinal = 0;
    board = [];
    document.getElementById("timer").innerHTML = "00:00"
    face.src = "./idle.gif"
    document.getElementById("flagCounter").innerText = flagCounter;
    //animacja na wejście
    if(anim == "9x9"){
        menu.classList.add("startAnim9x9");
        plansza.classList.remove("hide");
        startGame();
        setTimeout(() => {
            menu.classList.add("hide");
            document.querySelector(".menuArea").classList.add("hide");
            menu.classList.remove("startAnim9x9");
        }, 1150)
    } else if(anim == "16x16"){
        menu.classList.add("startAnim16x16");
        plansza.classList.remove("hide");
        startGame();
        setTimeout(() => {
            menu.classList.add("hide");
            document.querySelector(".menuArea").classList.add("hide");
            menu.classList.remove("startAnim16x16");
        }, 1950)
    } else if (anim == "30x16"){
        menu.classList.add("startAnim30x16");
        plansza.classList.remove("hide");
        startGame();
        setTimeout(() => {
            menu.classList.add("hide");
            document.querySelector(".menuArea").classList.add("hide");
            menu.classList.remove("startAnim30x16");
        }, 1950)
    }
        startTimer(2000);
})

restartBtn.addEventListener("click", () => {
    stopTimer();
    for(let i = 0; i < rows; i++){
        for(let j = 0; j < columns; j++){
            plansza.querySelectorAll("div").forEach(div => div.remove());
        }
    }
    //określam wielkość mapy animem
    if(anim == "anim9x9"){
        mineCounter = 10;
        document.getElementById("mineCounter").innerHTML = mineCounter;
    } else if(anim == "anim16x16"){
        mineCounter = 40;
        document.getElementById("mineCounter").innerHTML = mineCounter;
    } else if (anim == "anim30x16"){
        mineCounter = 99;
        document.getElementById("mineCounter").innerHTML = mineCounter;
    }
    gameOver = false;
    face.src = "./idle.gif";
    plansza.classList.remove("hide");
    scoreText.classList.add("hide");
    menuArea.classList.add("hide");
    tileClicked = 0;
    row = [];
    mineLocation = [];
    points = 0;
    pointsFinal = 0;
    board = [];
    document.getElementById("timer").innerHTML = "00:00";
    mine.pause();
    mine.currentTime = 0;
    startTimer(100);
    
    startGame();
    document.getElementById("flagCounter").innerText = flagCounter;
})
//timer

let timer;

function startTimer(timeout){
    setTimeout(() => {
        var sec = 0;
        var sec10 = 0;
        let min = 0;
        let min10 = 0;
        timePoints = 0;
        timer = setInterval(() => {
            timePoints++
            sec++;
            if(sec >= 10){
                sec10++;
                sec = 0;
            }
            if(sec10 == 6){
                min++;
                sec10 = 0;
                sec = 0;
                document.getElementById("timer").innerHTML = min10 + "" + min + ":" + sec10 + "" + sec;
            } 
            if(min >= 10){
                min10++;
                min = 0;
            }
            document.getElementById("timer").innerHTML = min10 + "" + min + ":" + sec10 + "" + sec;
            
        }, 1000);
        return timer;
    }, timeout)
}

function stopTimer(){
    clearInterval(timer);
}

//randomowa lokalizacja minuf
function setMines(){
    minesLeft = mineCounter;
    flagCounter = mineCounter;
    while(minesLeft > 0){
        let r =  Math.floor(Math.random() * rows);
        let c = Math.floor(Math.random() * columns);
        let id = r.toString() + "-" + c.toString();
        console.log(id)

        if(!mineLocation.includes(id)){
            mineLocation.push(id);
            minesLeft -= 1;
        }
    }
}

function startGame(){
    document.getElementById("flag-button").addEventListener("click", setFlag)

    setMines();
    for(let i = 0; i < rows; i++){
        let row = [];
        for(let j = 0; j < columns; j++){
            let tile = document.createElement("div");
            tile.id = i.toString() + "-" + j.toString();
            if(small){
                tile.classList.add("small");
                tile.classList.remove("big");
                tile.classList.remove("norm");
            } else if(big){
                tile.classList.add("big");
                tile.classList.remove("small");
                tile.classList.remove("norm");
            } else if(norm){
                tile.classList.add("norm")
                tile.classList.remove("small")
                tile.classList.remove("big")
            }
            tile.addEventListener("click", clickTile);
            document.getElementById("plansza").append(tile);
            row.push(tile);
        }
        board.push(row);
    }

}
//jak ma zachować sie przycisk flagi po włączeniu/wyłączeniu
function setFlag() {
    if(flagMode && !gameOver){
        flagMode = false;
        document.getElementById("flag-button").style.borderBottom = "5px solid gray"
        document.getElementById("flag-button").style.borderRight = "5px solid gray"
        document.getElementById("flag-button").style.borderTop = "5px solid whitesmoke"
        document.getElementById("flag-button").style.borderLeft = "5px solid whitesmoke"
    } else if(!flagMode && !gameOver) {
        flagMode = true;
        document.getElementById("flag-button").style.borderTop = "5px solid gray"
        document.getElementById("flag-button").style.borderLeft = "5px solid gray"
        document.getElementById("flag-button").style.borderBottom = "5px solid whitesmoke"
        document.getElementById("flag-button").style.borderRight = "5px solid whitesmoke"
    }
}



//klikanie płytek
function clickTile(){

    if(gameOver || this.classList.contains("tile-clicked")){
        return;
    }

    let tile = this;
    if(tile.innerText == "🚩" && !flagMode){
        return;
    }
    if (flagCounter == 0) {
        if(flagMode){
            if (flagMode && tile.innerText == "🚩"){
                    tile.innerText = "";
                    console.log("tak")
                    flagCounter += 1;
                    document.getElementById("flagCounter").innerText = flagCounter;
            }
            return;
        } 
    }
    if(flagCounter > 0){
    if(flagMode){
        if(tile.innerText == ""){
            tile.innerText = "🚩";
            flagCounter--;
            document.getElementById("flagCounter").innerText = flagCounter;
        }
        else if(tile.innerText == "🚩"){
            tile.innerText = "";
            flagCounter++;
            document.getElementById("flagCounter").innerText = flagCounter;
        }
        return;
    }}
    
    //kiedy płytka z minom zostanie wciśnięta
    if(mineLocation.includes(tile.id)){
        gameOver = true;
        let faceID, loseID;
        stopTimer();
        face.src = "./lose.gif"
        revealMines();
        mine.play();
        //wybuh gif
        setTimeout(() => {
            if(gameOver){
                lose.classList.remove("hide")
                explosion.play();
                faceID = setTimeout(() => {
                    face.src = "./sad.png";
                }, 1000)
                setTimeout(() => {
                    plansza.classList.add("hide");
                    scoreText.classList.remove("hide");
                }, 500);
                loseID = setTimeout(() => {
                    lose.classList.add("hide")
                }, 1800)
            }else if(!gameOver){
                clearTimeout(faceID);
                clearTimeout(loseID);
            }
        }, 1600)
        //liczenie po przegranej
        pointsFinal = Math.floor((points * Math.ceil((minTime - 300 / (timePoints +1)))))
        
        score.innerText = pointsFinal;
        return;
    }

    let coords = tile.id.split("-");
    let r = parseInt(coords[0]);
    let c = parseInt(coords[1]);
    checkMine(r, c);
}


//pokazuje miny
function revealMines(){
    for (let i = 0; i < rows; i++){
        for(let j = 0; j < columns; j++){
            let tile = board[i][j];
            if (mineLocation.includes(tile.id)){
                tile.innerText = "💣";
                tile.style.backgroundColor = "red";
            }
        }
    }
}
//super-duper wykrywacz min 3000™
function checkMine(r, c){
    if(r < 0 || r >= rows || c < 0 || c >= columns){
        return
    }
    if(board[r][c].classList.contains("tile-clicked")) {
        return;
    }

    //jeśli wykryje flage - zwraca użytkownikowi
    board[r][c].classList.add("tile-clicked");
    if(board[r][c].innerText == "🚩"){
        flagCounter++;
        document.getElementById("flagCounter").innerText = flagCounter;
        
    }
    board[r][c].innerText = "";
    tileClicked += 1;

    let minesFound = 0;

    //3 na górze
    minesFound += checkTile(r - 1, c - 1);   //górne lewo
    minesFound += checkTile(r - 1, c);   //góra
    minesFound += checkTile(r - 1, c + 1);   //górne prawo

    //lewo i prawo
    minesFound += checkTile(r, c - 1);   //lewo
    minesFound += checkTile(r, c + 1);   //prawo

    //3 na dole
    minesFound += checkTile(r + 1, c - 1);   //dolne lewo
    minesFound += checkTile(r + 1, c);   //dół prawo
    minesFound += checkTile(r + 1, c + 1);   //dolne prawo

    if(minesFound > 0){
        board[r][c].innerText = minesFound;
        board[r][c].classList.add("x" + minesFound.toString());
    }
    else {
        checkMine(r - 1, c - 1);    //gl
        checkMine(r - 1, c);        //g
        checkMine(r - 1, c + 1);    //gp
        checkMine(r, c - 1);        //lewo
        checkMine(r, c + 1);        //prawo
        checkMine(r + 1, c - 1);    //dl
        checkMine(r + 1, c);        //d
        checkMine(r + 1, c + 1);    //dp
    }

    //wygrana (wszystkie bez min zostały odkryte)
    if(tileClicked == rows * columns - mineCounter){
        face.src = "./win.gif"
        //liczenie po wygranej
        pointsFinal = Math.floor((points * Math.ceil((minTime - 300 / (timePoints +1)))) * multiplier);
        score.innerText = pointsFinal;
        gameOver = "true";
        stopTimer();
        revealMines();

    }

}

//funkcja sprawdzająca tile po jego kliknięciu (czy ma mine czy ni)
function checkTile(r, c){
    if(r < 0 || r >= rows || c < 0 || c >= columns){
        return 0;
    }
    if (mineLocation.includes(r.toString() + "-" + c.toString())){
        points += 1;
        return 1;
    }
    return 0;
}