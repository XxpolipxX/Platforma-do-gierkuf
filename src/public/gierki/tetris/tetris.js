
// gierka
let canvas = document.getElementById("canvas");
let ctx = canvas.getContext('2d');
let blockSize = 25;


ctx.fillStyle = 'black';
ctx.fillRect(0, 0, canvas.width, canvas.height);

function arenaSweep(){
    let rowCount = 1;
    amogus: for (let y = arena.length - 1; y > 0; y--){
        for (let x = 0; x < arena[y].length; x++){
            if (arena[y][x] == 0){
                continue amogus;
            }
        }

        let row = arena.splice(y, 1)[0].fill(0)
        arena.unshift(row);
        ++y;

        player.score += rowCount * 10;
        rowCount *= 2;
    }
}

//sprawdza czy klocek dotyka podstawy canvas
function collide(arena, player) {
    let [m, o] = [player.piece, player.pos];
    for(let y = 0; y < m.length; y++){
        for(let x = 0; x < m[y].length; x++){
            if(m[y][x] != 0 && 
                (arena[y + o.y] && 
                arena[y + o.y][x + o.x]) != 0){
                return true;
            }
        }
    }
    return false;
}
// tworzy klocek
function createPiece(w, h){
    let piece = [];
    while(h--){
        piece.push(new Array(w).fill(0));
    }
    return piece;
}
//łączy klocki ze sobą
function merge(arena, player){
    player.piece.forEach((row, y) => {
        row.forEach((value, x) => {
            if(value != 0){
                arena[y + player.pos.y][x + player.pos.x] = value;
            }
        });
    });
}
//tu znajdują się wszystkie możliwe klocki (można dodać więcej)
function createPieceType(type){
    if(type == "T"){
        return [
            [0, 0, 0],
            [1, 1, 1],
            [0, 1, 0],
        ];
    } else if (type == "O"){
        return [
            [2, 2],
            [2, 2],
        ];
    } else if (type == "L"){
        return [
            [0, 3, 0],
            [0, 3, 0],
            [0, 3, 3],
        ];
    } else if (type == "J"){
        return [
            [0, 4, 0],
            [0, 4, 0],
            [4, 4, 0],
        ];
    } else if (type == "I"){
        return [
            [0, 5, 0, 0],
            [0, 5, 0, 0],
            [0, 5, 0, 0],
            [0, 5, 0, 0],
        ];
    } else if (type == "S"){
        return [
            [0, 6, 6],
            [6, 6, 0],
            [0, 0, 0],
        ];
    } else if (type == "Z"){
        return [
            [7, 7, 0],
            [0, 7, 7],
            [0, 0, 0],
        ];
    }}
// rysuje canvas + klocek
function draw(){
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    drawPiece(arena, {x: 0, y: 0})
    drawPiece(player.piece, player.pos);
}
//interpretacja graficzna klocka
function drawPiece(piece, location){
    piece.forEach((row, y) => {
        row.forEach((value, x) => {
            if(value != 0) {
                ctx.fillStyle = colors[value];
                ctx.fillRect((x*blockSize) + (location.x*blockSize), (y*blockSize) + (location.y*blockSize), blockSize, blockSize);
            }
        })
    })
}

//jeśli gracz kliknie strzałke w dół, klocek przesówa się o jeden niżej i jeśli dotknie ziemi - ustawia tam klocka
function playerDrop(){
    player.pos.y++;
    if(collide(arena, player)){
        player.pos.y--;
        merge(arena, player);
        playerReset();
        arenaSweep();
        updateScore();
    }
    dropCounter = 0;
}

// ruch gracza w lewo lub prawo
function playerMove(k){
    player.pos.x += k;
    if(collide(arena, player)){
        player.pos.x -= k;
    }
}

function playerReset(){
    let pieces = "ILJOTSZ";
    player.piece = createPieceType(pieces[Math.floor(pieces.length * Math.random())]);   // losuje literę; można zapisać również [pieces.length * Math.random() | 0], znak | 0 to inaczej Math.floor()
    player.pos.y = 0;
    player.pos.x = Math.floor((arena[0].length / 2)) - Math.floor(player.piece[0].length / 2);  //resetuje pozycję gracza na środek osi X

    if(collide(arena, player)) {
        arena.forEach(row => row.fill(0));
        player.score = 0;
        updateScore();
    }
}

function playerRotate(k){
    let pos = player.pos.x
    let offset = 1;
    rotate(player.piece, k);
    while(collide(arena, player)){
        player.pos.x += offset;
        offset = -(offset + (offset > 0 ? 1 : -1));     //inaczej - if(offset > 0){offset + 1} else {offset - 1}
        if(offset > player.piece[0].length){
            rotate(player.piece, -k);
            player.pos.x = pos;
            return;
        }
    }
}

function rotate(piece, k){
    for(let y = 0; y < piece.length; y++){
        for(let x = 0; x < y; x++){
            [piece[x][y],
            piece[y][x],] = [piece[y][x],
                            piece[x][y],];                  //zamiana wartości w tablicy (działa to fajnie z tablicami, a ze zmiennymi cza jak u Witczaka - zrobić pom);
        }
    }

    if (k > 0){
        piece.forEach(row => row.reverse());
    } else {
        piece.reverse();
    }
}
let dropCounter = 0;
let dropInterval = 1000;

let lastTime = 0;

//update canvasu
function update(time = 0){
    let deltaTime = time - lastTime;
    lastTime = time;

    dropCounter += deltaTime;
    if(dropCounter > dropInterval) {
        playerDrop();
    }
    draw();
    requestAnimationFrame(update);
}


//pkt
function updateScore(){

}
let colors = [
    null,
    "red",
    "blue",
    "violet",
    "green",
    "pink",
    "yellow",
    "orange",
];

let arena = createPiece(22, 28);

let player = {
    pos: {x: 0, y: 0},
    piece: null,
    score: 0,
}

//sterowanie
document.addEventListener("keydown", e => {
            if(e.code == "ArrowUp"){
                playerRotate(1);
            }
            else if(e.code == "ArrowDown"){
                playerDrop();
            }
            else if(e.code == "ArrowLeft"){
                playerMove(-1);
            }
            else if(e.code == "ArrowRight"){
                playerMove(+1);
            }
            else if(e.code == "Escape"){
                pause();
            }
})

playerReset();
update();