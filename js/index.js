window.onload = function () {

  document.getElementById("start-game").onclick = function () {
    startGame();
  };
  document.getElementById("stop-game").onclick = function () {
    stopGame();
  };

  function startGame() {
    Game.init('game-board')
  }

  function stopGame() {
    Game.stop('game-board')
  }

};