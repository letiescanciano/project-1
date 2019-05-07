const Game = {
  canvas: undefined,
  version: '0.1 ',
  name: 'Music Pang',
  fps: 60,
  framesCounter: 0,
  level: 1,

  init: function (canvasId) {
    console.log("game init")
    this.canvas = document.getElementById(canvasId);
    this.ctx = this.canvas.getContext("2d");

    this.canvas.width = window.innerWidth
    this.canvas.height = window.innerHeight

    this.start()
  },
  start: function () {
    console.log("game start")
    this.reset();
    this.interval = setInterval(() => {
      this.framesCounter++;
      this.clear()
      this.drawAll()
      this.moveAll()
      if (this.framesCounter > 1000) {
        this.framesCounter = 0;
      }

    }, 1000 / this.fps)
  },
  pause: function () {
    clearInterval(this.interval)
  },
  reset: function () {
    this.level = new Level(this.ctx, this.canvas, this.level)
    this.framesCounter = 0
  },
  nextLevel: function () {

  },
  drawAll: function () {
    this.level.draw(this.framesCounter)
  },
  moveAll: function () {
    this.level.move()
  },
  clear: function () {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
  }
}