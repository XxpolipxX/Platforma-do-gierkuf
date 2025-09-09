class Dino {
  constructor() {
    this.startGameButton = document.querySelector('.start-game');
    this.dino = document.querySelector('.dino');
    this.cactus = document.querySelector('.cactus');
    this.scoreBlock = document.querySelector('.score');
    this.message = document.querySelector('.message');

    this.isJumping = false;
    this.score = 0;
    this.gameSpeed = 5;
    this.speedIncrease = 0.2;
    this.cactusInterval = null;
    this.gameStarted = false;

    this.startGameButton.addEventListener('click', () => {
      if(this.gameStarted) {
        return;
      }

      this.gameStarted = true;
      this.message.classList.add('hide');
      this.startGameButton.disabled = true;
      this.moveCactus();
    });

    document.addEventListener('keydown', (e) => {
      if(e.code === 'Enter') this.startGameButton.click();
      if(e.code === 'Space' || e.code === 'ArrowUp') {
        e.preventDefault();
        this.jump();
      }
    });
  }

  getDinoBottom() {
    return parseInt(getComputedStyle(this.dino).bottom) || 0;
  }

  setDinoBottom(px) {
    this.dino.style.bottom = px + 'px';
  }

  jump() {
    if(!this.gameStarted) {
        return;
    }
    if(this.isJumping) {
      return;
    }

    this.isJumping = true;
    let position = this.getDinoBottom();
    const upInterval = setInterval(() => {
      if(position >= 100) {
        clearInterval(upInterval);
        const downInterval = setInterval(() => {
          if(position <= 0) {
            clearInterval(downInterval);
            this.isJumping = false;
            this.setDinoBottom(0);
          } else {
            position -= 5;
            this.setDinoBottom(position);
          }
        }, 20);
      } else {
        position += 5;
        this.setDinoBottom(position);
      }
    }, 20);
  }

  moveCactus() {
    if(this.cactusInterval) {
      return;
    }

    let cactusPosition = parseInt(getComputedStyle(this.cactus).left) || 600;
    this.cactus.style.left = cactusPosition + 'px';

    this.cactusInterval = setInterval(() => {
      if(cactusPosition < -20) {
        cactusPosition = 600;
        this.score++;
        this.scoreBlock.textContent = 'Punkty: ' + this.score;
        this.increaseSpeed();
      } else if(cactusPosition > 30 && cactusPosition < 70 &&  this.getDinoBottom() < 40) {
        clearInterval(this.cactusInterval);
        this.cactusInterval = null;
        this.endGame(cactusPosition);
      } else {
        cactusPosition -= this.gameSpeed;
      }
      this.cactus.style.left = cactusPosition + 'px';
    }, 20);
  }

  increaseSpeed() {
    this.gameSpeed = 5 + this.score * 0.1;
  }

  endGame(cactusPosition) {
    alert('Koniec gry! Wynik: ' + this.score);
    this.gameStarted = false;
    this.score = 0;
    this.gameSpeed = 5;
    cactusPosition = 600;
    this.cactus.style.left = cactusPosition + 'px';
    this.scoreBlock.textContent = 'Punkty: 0';
    this.message.classList.remove('hide');
    this.startGameButton.disabled = false;
  }
}

const dino = new Dino;