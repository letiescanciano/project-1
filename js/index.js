window.onload = function () {

  document.onkeydown = function (e) {
    //console.log(e)

    switch (e.keyCode) {
      case 83: //Start S
        document.getElementsByClassName('container')[0].classList.remove('hero')
        //document.getElementsByClassName('container')[0].classList.remove('game-over')
        startGame(0)
        break;
      case 73: //Start I
        document.getElementsByClassName('container')[0].classList.remove('hero')
        //document.getElementsByClassName('container')[0].classList.remove('game-over')
        startGame(1)
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


  function startGame(mode) {
    console.log("startGame", mode)
    Game.init('game-board', mode)
  }

  function pauseGame() {
    // console.log('paused click')
    Game.pause('game-board')
  }

  function resetGame() {
    Game.reset('game-board')
  }

  function gameOver() {
    document.getElementsByClassName('container')[0].classList.add('game-over')
  }

};