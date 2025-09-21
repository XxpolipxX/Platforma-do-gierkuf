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
            // to będzie można wywalić
            case "connected to websocket":
                alert("Połączono z websoketem");
                break;
            // 
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
                break;
            case "opponent_joined":
                alert("Twoim przeciwnikiem będzie gracz o ID: ", data.opponent_id);
                toggle(optionContainer);
                toggle(gameContainer);
                break;
            case "bad_code":
                alert(data.message);
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
const gameContainer = document.getElementById("game-container");
// przyciski
for(let y = 1; y <= 3; y++) {
    for(let x = 1; x <= 3; x++) {
    const button = document.createElement('button');
    // button.textContent = "X";
    button.dataset.x = x;
    button.dataset.y = y;

    button.classList.add('game-button');
    button.type = "button";

    // testowa klasa dla testowania kolorków
    button.classList.add('cross');

    button.addEventListener("click", () => {
        const message = {
        type: "button-click",
        x: button.dataset.x,
        y: button.dataset.y
        }
        // tu będzie wysłanie danych
    });
    gameContainer.appendChild(button);
    }
}