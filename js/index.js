window.onload = function () {

  document.getElementById("start-game").onclick = function () {
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
  };


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