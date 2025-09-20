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
// przycisk back w menu do wpisania kodu do dołączenia
const backFromJoinContainer = document.getElementById("back-join-container");
// zmienna logiczna do tego czy jest już kod czy nie żeby nie pytać serwera cały czas
let isCodeGenerated = false;
// zmienna do kodu
let kod = 'TEN KOD DO ZMIANY';
/*

    TESTOWO


*/
isCodeGenerated = true;
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
    /*
        TODO
        GENEROWANIE KODU
    */
   if(isCodeGenerated) {
        generatedCodeContainer.value = kod;
   }
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
// 
// 
// 
// generowanie przycisków
// plansza przycisków
const gameContainer = document.getElementById("game-container");
// przyciski
for(let y = 1; y <= 3; y++) {
    for(let x = 1; x <= 3; x++) {
    const button = document.createElement('button');
    button.textContent = "O";
    button.dataset.x = x;
    button.dataset.y = y;

    button.classList.add('game-button')

    // testowa klasa dla testowania kolorków
    button.classList.add('circle');

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