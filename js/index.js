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
        //document.getElementsByClassName('container')[0].classList.remove('game-over')
        startGame()
        break;
      case 80: //Pausa P
        // document.getElementsByClassName('container')[0].classList.add('hero')
        pauseGame();
        break
      case 71: //Force GameOver
        // document.getElementsByClassName('container')[0].classList.add('hero')
        gameOver();
        break
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

  function gameOver() {
    document.getElementsByClassName('container')[0].classList.add('game-over')
  }

};