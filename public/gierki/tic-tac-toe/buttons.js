import getCodeAJAX from "./getCodeAJAX.js";

export default class Buttons {
    constructor() {
        // menu - kontenery
        this.createMenuElement = document.getElementById('create-join');
        this.generateMenuElement = document.getElementById('generate-code');
        this.joinMenuElement = document.getElementById('join-container');

        // buttony
        this.generateCodeButton = document.getElementById('create');
        this.joinRoomButton = document.getElementById('join');

        // button wstecz
        this.buttons = document.querySelectorAll('.back');
        this.buttons.forEach((button) => {
            button.addEventListener('click', () => {
                this.toggleVisibility(this.createMenuElement);
                if(!this.generateMenuElement.classList.contains('hide')) {
                    this.generateMenuElement.classList.add('hide');
                }
                if(!this.joinMenuElement.classList.contains('hide')) {
                    this.joinMenuElement.classList.add('hide');
                }
            });
        });

        // inputy
        this.codeInput = document.getElementById('code');
        this.generatedCodeInput = document.getElementById('generated-code');

        // formularz
        this.formToSendCode = document.getElementById("send-code-form");

        // event listenery do toglowania hide
        this.generateCodeButton.addEventListener("click", () => {
            this.toggleVisibility(this.createMenuElement);
            this.toggleVisibility(this.generateMenuElement);

            this.generateCode().then(code => {
                console.log(code.joinCode);
                this.generatedCodeInput.value = code.joinCode;
            });
        });

        this.joinRoomButton.addEventListener("click", () => {
            this.toggleVisibility(this.createMenuElement);
            this.toggleVisibility(this.joinMenuElement);
        });
    }

    // toglowanie klasy hide
    toggleVisibility(element) {
        element.classList.toggle('hide');
    }

    generateCode() {
        const codeGetter = new getCodeAJAX();
        // codeGetter.requestCode().then(data => {
        //     console.log("KOD POKOJU", data.joinCode);
        // });
        return codeGetter.requestCode();
    }
}