import SendScore from './sendScore.js';

export default class Dino {
  constructor(userID, userLogin) {
    // audio
    this.backgroundMusic = new Audio('./audio/music.mp3');
    this.backgroundMusic.loop = true;

    this.deathSound = new Audio('./audio/death.mp3');

    // dane usera
    this.userID = userID;
    this.userLogin = userLogin;
    

    // elementy strony
    this.startGameButton = document.querySelector('.start-game');
    this.dino = document.querySelector('.dino');
    this.cactusContainer = document.querySelector('.cactus-container');
    this.scoreBlock = document.querySelector('.score');
    this.timeBlock = document.querySelector('.time');

    // ekran przegranej
    this.message = document.querySelector('.message');
    this.finalScoreBlock = document.querySelector('.final-score');
    this.finalTimeBlock = document.querySelector('.final-time');
    this.moreFinalScoreBlock = document.querySelector('.more-final-score');
    this.restartGameButton = document.querySelector('.restart-game');

    // zmienne dotyczące bezpośrednio gry
    this.isJumping = false;
    this.score = 0;
    this.finalScore = 0;
    this.time = 0;
    this.timerInterval = null;
    this.gameSpeed = 5;
    this.speedIncrease = 0.2;
    this.gameStarted = false;
    this.spawnTimeout = null;
    this.cactusList = [];

    console.log(`DINO endamge()   ID:${this.userID}, LOGIN:${this.userLogin}, FINALSCORE:${this.finalScore}`);
    // start gry
    this.startGameButton.addEventListener('click', () => {
      if (this.gameStarted) return;
      this.startGame();
    });

    // restart gry
    this.restartGameButton.addEventListener('click', () => {
      this.hideMessage();
      this.startGame();
    });

    // start i skakanie
    document.addEventListener('keydown', (e) => {
      if (e.code === 'Enter') this.startGameButton.click();
      if (e.code === 'Space' || e.code === 'ArrowUp') {
        e.preventDefault();
        this.jump();
      }
    });
  }

  startGame() {
    this.resetGame();
    this.backgroundMusic.play();
    this.gameStarted = true;
    this.startGameButton.disabled = true;
    this.startTimer();
    this.spawnCactusGroup();
    this.moveCactuses();
  }

  startTimer() {
    this.timerInterval = setInterval(() => {
      if(!this.gameStarted) {
        return;
      }

      this.time++;
      this.timeBlock.textContent = `Czas: ${this.time}`;
    }, 1000);
  }

  stopTimer() {
    clearInterval(this.timerInterval);
    this.timerInterval = null;
  }

  resetGame() {
    this.score = 0;
    this.gameSpeed = 5;
    this.scoreBlock.textContent = 'Punkty: 0';
    this.timeBlock.textContent = 'Czas: 0';
    this.cactusContainer.innerHTML = '';
    this.cactusList = [];
  }

  getDinoBottom() {
    return parseInt(getComputedStyle(this.dino).bottom) || 0;
  }

  setDinoBottom(px) {
    this.dino.style.bottom = px + 'px';
  }

  jump() {
    if (!this.gameStarted || this.isJumping) return;

    this.isJumping = true;
    let position = this.getDinoBottom();
    const upInterval = setInterval(() => {
      if (position >= 100) {
        clearInterval(upInterval);
        const downInterval = setInterval(() => {
          if (position <= 0) {
            clearInterval(downInterval);
            this.isJumping = false;
            this.setDinoBottom(0);
          } else {
            position -= 7;
            this.setDinoBottom(position);
          }
        }, 20);
      } else {
        position += 7;
        this.setDinoBottom(position);
      }
    }, 20);
  }

  spawnCactusGroup() {
    // losujemy, ile kaktusów w grupie (1-3)
    let cactusCount = 0;
    if(this.score < 5) {
      cactusCount = 1; 
    } else if(this.score >= 5 && this.score < 15) {
      cactusCount = Math.floor(Math.random() * 2) + 1;
    } else {
      cactusCount = Math.floor(Math.random() * 3) + 1;
    }
    let offset = 600;

    for (let i = 0; i < cactusCount; i++) {
      const cactus = document.createElement('div');
      cactus.classList.add('cactus');
      cactus.style.left = offset + 'px';
      this.cactusContainer.appendChild(cactus);
      this.cactusList.push(cactus);

      // losowa odległość między kaktusami w grupie
      offset += 15 + Math.floor(Math.random() * 12);
    }

    // następna grupa po losowym czasie
    this.spawnTimeout = setTimeout(() => {
      this.spawnCactusGroup();
    }, 1000 + Math.random() * 1500);
  }

  moveCactuses() {
    const moveInterval = setInterval(() => {
      if (!this.gameStarted) {
        clearInterval(moveInterval);
        return;
      }

      this.cactusList.forEach((cactus, index) => {
        let cactusPosition = parseInt(getComputedStyle(cactus).left);

        if (cactusPosition < -30) {
          cactus.remove();
          this.cactusList.splice(index, 1);
          this.score++;
          this.scoreBlock.textContent = 'Punkty: ' + this.score;
          this.gameSpeed += this.speedIncrease;
        } else {
          cactusPosition -= this.gameSpeed;
          cactus.style.left = cactusPosition + 'px';

          // wykrywanie kolizji
          if (
            cactusPosition > 30 &&
            cactusPosition < 70 &&
            this.getDinoBottom() < 40
          ) {
            this.endGame();
          }
        }
      });
    }, 20);
  }

  endGame() {
    this.stopTimer();
    this.backgroundMusic.pause();
    this.deathSound.play();
    this.gameStarted = false;
    this.finalScore = Math.floor(this.score * this.time / 3);
    console.log(`DINO endamge()   ID:${this.userID}, LOGIN:${this.userLogin}, FINALSCORE:${this.finalScore}`);
    const sendScore = new SendScore(this.userID, this.userLogin, this.finalScore);
    clearTimeout(this.spawnTimeout);
    this.showMessage();
    this.time = 0;
  }

  showMessage() {
    this.finalScoreBlock.textContent = `Wynik: ${this.score}`;
    this.finalTimeBlock.textContent = `Czas: ${this.time}`;
    this.moreFinalScoreBlock.textContent = `Finalny wynik: ${this.finalScore}`;
    this.message.classList.remove('hide');
  }

  hideMessage() {
    this.message.classList.add('hide');
  }
}