window.onload = function () {

  document.getElementById("start-game").onclick = function () {
    startGame();
  };
  document.getElementById("pause-game").onclick = function () {
    pauseGame();
  };
  document.getElementById("restart-game").onclick = function () {
    restartGame();
  };

  function startGame() {
    Game.init('game-board')
  }

  function pauseGame() {
    Game.pause('game-board')
  }

  function restartGame() {
    Game.start('game-board')
  }

  function resetGame() {
    Game.reset('game-board')
  }

};