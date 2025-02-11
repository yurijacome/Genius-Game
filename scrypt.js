const body = document.getElementById("body");
const startArea = document.getElementById("centerArea");
const colorButtons = document.getElementById("colorButtons");
const game = document.getElementById("game");
const startText = document.getElementById("startText");
const audioRed = new Audio("audio/simonSound1.mp3");
const audioBlue = new Audio("audio/simonSound2.mp3");
const audioYellow = new Audio("audio/simonSound3.mp3");
const audioGreen = new Audio("audio/simonSound4.mp3");
const audioStart = new Audio("audio/startSound.mp3"); // Adicione o caminho para o som de início
const audioGameOver = new Audio("audio/gameOverSound.mp3"); // Adicione o caminho para o som de game over

const startButton = document.createElement("button");
startButton.setAttribute("id", "startButton");
startArea.appendChild(startButton);

const redButton = document.createElement("button");
redButton.setAttribute("id", "1");
redButton.setAttribute("class", "button red");
colorButtons.appendChild(redButton);
const blueButton = document.createElement("button");
blueButton.setAttribute("id", "2");
blueButton.setAttribute("class", "button blue");
colorButtons.appendChild(blueButton);

const yellowButton = document.createElement("button");
yellowButton.setAttribute("id", "3");
yellowButton.setAttribute("class", "button yellow");
colorButtons.appendChild(yellowButton);

const greenButton = document.createElement("button");
greenButton.setAttribute("id", "4");
greenButton.setAttribute("class", "button green");
colorButtons.appendChild(greenButton);

const playAgain = document.createElement("button");
playAgain.innerText = "Try Again";
playAgain.setAttribute("class", "playAgain Hidden");
body.appendChild(playAgain);

const divGameOver = document.createElement("div");
divGameOver.innerText = "GAME OVER";
divGameOver.setAttribute("class", "gameOver Hidden");
game.appendChild(divGameOver);

const divYouWin = document.createElement("div");
divYouWin.innerText = "YOU WIN!!";
divYouWin.setAttribute("class", "youWin Hidden");
game.appendChild(divYouWin);

const feitoPor = document.createElement("footer");
feitoPor.innerText = "Criado por Yuri Jácome";
feitoPor.classList.add("feitoPor");
body.appendChild(feitoPor);

let sequenciaCores = [];
let sequenciaClique = [];
let round = 1;
let pontos = 0;
let tempoEspera = 750; // Tempo de espera inicial

function RandomColor() {
  sequenciaCores.push(Math.floor(4 * Math.random() + 1));
}
function acenderCor(number = 0) {
  let i = number;

  if (sequenciaCores[i] === 1) {
    acendeRed();
  } else if (sequenciaCores[i] === 2) {
    acendeBlue();
  } else if (sequenciaCores[i] === 3) {
    acendeYellow();
  } else if (sequenciaCores[i] === 4) {
    acendeGreen();
  }
  i++;

  setTimeout(() => {
    if (i < sequenciaCores.length) {
      acenderCor(i);
    }
  }, tempoEspera);
}
function acendeRed() {
  redButton.classList.add("selected");
  audioRed.currentTime = 0; // Reiniciar o áudio
  audioRed.play(); // Reproduzir som
  setTimeout(() => {
    redButton.classList.remove("selected");
  }, Math.max(500 - (round - 1) * 25, 200)); // Reduzir o valor 500 a cada rodada, mas não menos que 200ms
}

function acendeBlue() {
  blueButton.classList.add("selected");
  audioBlue.currentTime = 0; // Reiniciar o áudio
  audioBlue.play(); // Reproduzir som
  setTimeout(() => {
    blueButton.classList.remove("selected");
  }, Math.max(500 - (round - 1) * 25, 200)); // Reduzir o valor 500 a cada rodada, mas não menos que 200ms
}

function acendeYellow() {
  yellowButton.classList.add("selected");
  audioYellow.currentTime = 0; // Reiniciar o áudio
  audioYellow.play(); // Reproduzir som
  setTimeout(() => {
    yellowButton.classList.remove("selected");
  }, Math.max(500 - (round - 1) * 25, 200)); // Reduzir o valor 500 a cada rodada, mas não menos que 200ms
}

function acendeGreen() {
  greenButton.classList.add("selected");
  audioGreen.currentTime = 0; // Reiniciar o áudio
  audioGreen.play(); // Reproduzir som
  setTimeout(() => {
    greenButton.classList.remove("selected");
  }, Math.max(500 - (round - 1) * 25, 200)); // Reduzir o valor 500 a cada rodada, mas não menos que 200ms
}
function verificarpontos() {
  if (JSON.stringify(sequenciaClique) === JSON.stringify(sequenciaCores)) {
    setTimeout(() => {
      startText.innerText = "Acertou mizeravi";
    }, 1000);

    pontos++;
    pontuacao.innerText = pontos;

    if (pontos === 20) {
      // Aumente o número de rodadas aqui
      ganhouGame();
    } else {
      setTimeout(() => {
        newRound();
      }, 2000);
    }
  } else {
    verificaErro();
  }
}
function ganhouGame() {
  hiddenGame();
  divYouWin.classList.remove("Hidden");
  playAgain.classList.remove("Hidden");
}
function verificaErro() {
  for (i = 0; i < sequenciaClique.length; i++) {
    if (sequenciaClique[i] !== sequenciaCores[i]) {
      startButton.disabled = true;
      setTimeout(() => {
        hiddenGame();
      }, 1000); // Adicione um atraso de 1 segundo antes de chamar hiddenGame
    }
  }
}
function hiddenGame() {
  startArea.classList.add("Hidden");
  colorButtons.classList.add("Hidden");
  game.classList.add("perdeu");
  playAgain.classList.remove("Hidden");
  divGameOver.classList.remove("Hidden");
  audioGameOver.currentTime = 0; // Reiniciar o áudio
  audioGameOver.play(); // Reproduzir som de game over
}
function resetgame() {
  sequenciaCores = [];
  round = 1;
  pontos = 0;
  pontuacao.innerText = pontos;

  startText.innerText = "Start New Game";

  // Redefinir a exibição dos elementos ao estado inicial
  startArea.classList.remove("Hidden");
  colorButtons.classList.remove("Hidden");
  game.classList.remove("perdeu");
  playAgain.classList.add("Hidden");
  divGameOver.classList.add("Hidden");
  divYouWin.classList.add("Hidden");
  startButton.disabled = false; // Ativar o botão "Start"
}

function disable(bolean) {
  redButton.disabled = bolean;
  blueButton.disabled = bolean;
  yellowButton.disabled = bolean;
  greenButton.disabled = bolean;
}

function buttonON() {
  redButton.classList.remove("off");
  blueButton.classList.remove("off");
  yellowButton.classList.remove("off");
  greenButton.classList.remove("off");
}

function buttonOFF() {
  redButton.classList.add("off");
  blueButton.classList.add("off");
  yellowButton.classList.add("off");
  greenButton.classList.add("off");
  startButton.disabled = true;
}

function newRound() {
  startButton.disabled = true;
  sequenciaClique = [];
  RandomColor();
  disable(true);
  buttonOFF();

  setTimeout(() => {
    startText.innerText = "Round " + round;
  }, 750);

  setTimeout(() => {
    startText.innerText = "Sua Vez";
  }, 2000 + round * tempoEspera);

  setTimeout(() => {
    acenderCor();
  }, 2000);

  setTimeout(() => {
    disable(false);
    buttonON();
  }, 2000 + tempoEspera * round);

  // Acelera a velocidade a cada rodada
  tempoEspera = Math.max(tempoEspera - 50, 200); // Diminui o tempo de espera, mas não menos que 200ms
}

startButton.addEventListener("click", () => {
  audioStart.currentTime = 0; // Reiniciar o áudio
  audioStart.play(); // Reproduzir som de início
  newRound();
});

redButton.addEventListener("click", () => {
  setTimeout(() => {
    redButton.classList.add("selected");
    audioRed.currentTime = 0; // Reiniciar o áudio
    audioRed.play();
  }, 0);

  setTimeout(() => {
    redButton.classList.remove("selected");
  }, 400);

  sequenciaClique.push(1);
  verificarpontos();

  if (sequenciaClique.length === sequenciaCores.length) {
    round++;
  }
});

blueButton.addEventListener("click", () => {
  setTimeout(() => {
    blueButton.classList.add("selected");
    audioBlue.currentTime = 0; // Reiniciar o áudio
    audioBlue.play();
  }, 0);

  setTimeout(() => {
    blueButton.classList.remove("selected");
  }, 400);

  sequenciaClique.push(2);
  verificarpontos();

  if (sequenciaClique.length === sequenciaCores.length) {
    round++;
  }
});

yellowButton.addEventListener("click", () => {
  setTimeout(() => {
    yellowButton.classList.add("selected");
    audioYellow.currentTime = 0; // Reiniciar o áudio
    audioYellow.play();
  }, 0);

  setTimeout(() => {
    yellowButton.classList.remove("selected");
  }, 400);

  sequenciaClique.push(3);
  verificarpontos();

  if (sequenciaClique.length === sequenciaCores.length) {
    round++;
  }
});

greenButton.addEventListener("click", () => {
  setTimeout(() => {
    greenButton.classList.add("selected");
    audioGreen.currentTime = 0; // Reiniciar o áudio
    audioGreen.play();
  }, 0);

  setTimeout(() => {
    greenButton.classList.remove("selected");
  }, 400);

  sequenciaClique.push(4);
  verificarpontos();

  if (sequenciaClique.length === sequenciaCores.length) {
    round++;
  }
});

// Add hover effect to buttons
redButton.addEventListener("mouseover", () => {
  redButton.classList.add("selected");
});
redButton.addEventListener("mouseout", () => {
  redButton.classList.remove("selected");
});

blueButton.addEventListener("mouseover", () => {
  blueButton.classList.add("selected");
});
blueButton.addEventListener("mouseout", () => {
  blueButton.classList.remove("selected");
});

yellowButton.addEventListener("mouseover", () => {
  yellowButton.classList.add("selected");
});
yellowButton.addEventListener("mouseout", () => {
  yellowButton.classList.remove("selected");
});

greenButton.addEventListener("mouseover", () => {
  greenButton.classList.add("selected");
});
greenButton.addEventListener("mouseout", () => {
  greenButton.classList.remove("selected");
});

playAgain.addEventListener("click", () => {
  resetgame();
  playAgain.classList.add("Hidden");
  divGameOver.classList.add("Hidden");
  startArea.classList.remove("Hidden");
  colorButtons.classList.remove("Hidden");
  game.classList.remove("perdeu");
  divYouWin.classList.add("Hidden");

  startButton.disabled = true;
});

playAgain.addEventListener("click", () => {
  resetgame();
});
