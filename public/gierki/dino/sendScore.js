export default class SendScore {
  constructor(userID, userLogin, userScore) {
    this.userID = userID;
    this.userLogin = userLogin;
    this.userScore = userScore;
    this.gameID = 1;

    this.sendData();
  }

  sendData() {
    const data = new FormData();
    data.append('userID', this.userID);
    data.append('userLogin', this.userLogin);
    data.append('userScore', this.userScore);
    data.append('gameID', this.gameID);

    fetch('../sendScore.php', {
        method: 'POST',
        body: data
    })
        .then(async response => {
            const text = await response.text();
            console.log("Odpowiedź PHP:", text); // tu zobaczysz dokładny błąd lub JSON
            try {
                return JSON.parse(text);
            } catch {
                throw new Error("PHP nie zwróciło JSON-a");
            }
        })
        // .then(data => {
        //     const {success, message, user} = data;
        //     if(success) {
        //         const {id, login, score} = user;
        //         console.log(`ID: ${id}, LOGIN: ${login}`);
        //         alert(message);
        //     } else {
        //         alert(message);
        //     }
        // })
        .catch(error => console.error('Błąd:', error));
  }
}