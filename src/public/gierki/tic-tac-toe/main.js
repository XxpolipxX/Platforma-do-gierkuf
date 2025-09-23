const gameContainer = document.getElementById("game-container");
// 
// odczytanie ID i logina usera z ciastka
function getCookie(name) {
    const cookies = document.cookie.split(';');
    for(let cookie of cookies) {
        cookie = cookie.trim();
        if(cookie.startsWith(name + '=')) {
            return cookie.substring(name.length + 1);
        }
    }
    return null; // ciastka ni ma
}

const userID = getCookie('userID');
const userLogin = getCookie('userLogin');
// 
// 
// serwer websocketa
const socket = new WebSocket("ws://localhost:8081");

socket.onopen = () => {
    alert("Połączono z websocketem");
};

let kod;

socket.onmessage = (event) => {
    try {
        const data = JSON.parse(event.data);
        console.log(data);
        console.log(event);
        switch(data.event) {
            case 'user_already_in_game':
                alert("Już jesteś w grze");
                break;
            case 'no_code':
                alert("Nie wysłano kodu");
                break;
            case 'no_userID':
                alert("Nie wysłano userID");
                break;
            case 'unknown':
                alert("Nieznana akcja");
                break;
            case 'bad_JSON':
                alert("Zły JSON");
                break;
            case 'your_move':
                alert("Twój ruch");
                document.querySelectorAll('#game-container button').forEach(button => button.disabled = false);
                break;
            case 'opponent_move':
                alert("Ruch przeciwnika");
                document.querySelectorAll('#game-container button').forEach(button => button.disabled = true);
                break;
            case 'not_your_turn':
                alert("Teraz trwa tura przeciwnika a nie twoja");
                break;
            case 'bad_move':
                alert("Nie powinieneś móc zrobić takiego ruchu");
                break;
            case "Nieznana akcja":
                alert(data.event);
                break;
            case "self_join":
                alert(data.message);
                break;
            case "room_created":
                kod = data.join_code;
                alert("Utworzyłeś pokój o ID: ", data.room_id);
                if(isCodeGenerated) {
                    generatedCodeContainer.disabled = false;
                    generatedCodeContainer.value = kod;
                    generatedCodeContainer.disabled = true;
                }
                break;
            case "joined_room":
                alert("Dołączyłeś do pokoju o ID: ", data.room_id);
                toggle(optionContainer);
                toggle(gameContainer);
                generatePlansza("O");
                break;
            case "opponent_joined":
                alert("Twoim przeciwnikiem będzie gracz o ID: ", data.opponent_id);
                toggle(optionContainer);
                toggle(gameContainer);
                generatePlansza("X");
                break;
            case 'move_made':
                let index = data.index;
                let symbol = data.symbol;
                const button = document.querySelector(`#game-container button[data-i='${index}']`);
                if(button) {
                    button.textContent = symbol;
                    button.disabled = true;
                }
                break;
            case 'game_over':
                let winner = data.winner;
                if(winner === null) {
                    alert("REMIS");
                    toggle(createJoin);
                    toggle(generateCode);
                } else {
                    alert(`Wygrał gracz o ID: ${winner}`);
                    toggle(createJoin);
                    toggle(generateCode);
                }
                break;
            case "bad_code":
                alert("Błędny kod");
                break;
            default:
                console.warn("Nieznany event: ", data.event);
        }
    } catch (err) {
        console.error("Błąd parsowania na JSON: ", err);
    }
};

socket.onclose = () => console.log("Rozłączono");

// 
// 
// 
// 


// kontener na opcje
const optionContainer = document.getElementById("options-container");
// główne menu z przyciskami dołącz i stwórz
const createJoin = document.getElementById("create-join");
// menu z wygenerowanym kodem do połączenia
const generateCode = document.getElementById("generate-code");
// menu z polem na wpisanie kodu
const joinContainer = document.getElementById("join-container");
// klasa do toglowania hide
const toggle = (element) => {
    element.classList.toggle('hide');
};
// button do stworzenia kodu
const createButton = document.getElementById("create");
createButton.disabled = true;

socket.onopen = () => {
    createButton.disabled = false;
}
// button do dołączenia do pokoju
const joinButton = document.getElementById("join");
// disabled input do wyświetlenia wygenerowanego kodu
const generatedCodeContainer = document.getElementById("generated-code");
// przycisk back w menu z wygenerowanym kodem
const backFromGenerateCodeButton = document.getElementById("back-generate-code");
// formularz do wpisania kodu do dołączenia
const form = document.getElementById("send-code-form");
// przycisk do wysłania kodu do dołączenia
const sendCodeButton = document.getElementById("send-code");
// input z wpisanym kodem do dołączenia
const sendJoinCodeInput = document.getElementById("code");
// przycisk back w menu do wpisania kodu do dołączenia
const backFromJoinContainer = document.getElementById("back-join-container");
// zmienna logiczna do tego czy jest już kod czy nie żeby nie pytać serwera cały czas
let isCodeGenerated = false;
/*

    TESTOWO


*/
isCodeGenerated = false;
// 
// 
// 
// 

// event listenery do toglowania hide
// event listenery do toglowania hide
// event listenery do toglowania hide
// event listenery do toglowania hide
// wygenerowanie kodu
createButton.addEventListener("click", () => {
    toggle(createJoin);
    toggle(generateCode);
    if(!isCodeGenerated) {
        let message = {
            action: 'create_room',
            userID: userID
        };
        console.log(message);
        socket.send(JSON.stringify(message));
        isCodeGenerated = true;
    }
});
// dołączenie do pokoju
sendCodeButton.addEventListener("click", (e) => {
    e.preventDefault();
    let message = {
        action: 'join_room',
        userID: userID,
        kod: sendJoinCodeInput.value
    };
    console.log(message);
    socket.send(JSON.stringify(message));
});
// back z wygenerowanego kodu
backFromGenerateCodeButton.addEventListener("click", () => {
    toggle(createJoin);
    toggle(generateCode);
});
// dołączenie do pokoju
joinButton.addEventListener("click", () => {
    toggle(createJoin);
    toggle(joinContainer);
});
//back z dołączenia do pokoju
backFromJoinContainer.addEventListener("click", (e) => {
    e.preventDefault();
    toggle(createJoin);
    toggle(joinContainer);
});
// 
// generowanie przycisków
// plansza przycisków
function generatePlansza(character) {
    let klasa;
    switch(character) {
        case 'X':
            klasa = 'cross';
            break;
        case 'O':
            klasa = 'circle';
            break;
        default:
            alert("NIEZNANY ZNAK");
            return;
    }
    // przyciski
    for(let i = 0; i < 9; i++) {
        const button = document.createElement('button');
        button.setAttribute('data-i', i);
        button.classList.add('game-button');
        button.type = "button";

        button.classList.add(klasa);

        button.innerHTML = "&nbsp;";

        button.addEventListener("click", () => {
            let message = {
                action: 'send-move',
                userID: userID,
                index: button.dataset.i
            }
            message = JSON.stringify(message);
            socket.send(message);
        });
        gameContainer.appendChild(button);
    }
}