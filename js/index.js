window.onload = function () {

  /*   document.getElementById("start-game").onclick = function () {
      document.getElementsByClassName('container')[0].classList.remove('hero')
      startGame();
    };
    document.getElementById("pause-game").onclick = function () {
      document.getElementsByClassName('container')[0].classList.add('hero')
      pauseGame();
    };
    document.getElementById("reset-game").onclick = function () {
      // document.getElementsByClassName('container')[0].classList.add('hero')
      resetGame();



    }; */
  document.onkeydown = function (e) {
    console.log(e)

    switch (e.keyCode) {
      case 83: //Start S
        document.getElementsByClassName('container')[0].classList.remove('hero')
        startGame()
        break;
      case 80: //Pausa P
        // document.getElementsByClassName('container')[0].classList.add('hero')
        pauseGame();
    }
  }



  function startGame() {
    Game.init('game-board')
  }

  function pauseGame() {
    console.log('paused click')
    Game.pause('game-board')
  }

  function resetGame() {
    Game.reset('game-board')
  }

};