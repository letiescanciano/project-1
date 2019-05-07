const Game = {
  canvas: undefined,
  version: '0.1 ',
  name: 'Music Pang',
  fps: 60,
  framesCounter: 0,
  levelNum: 1,
  getLevel: undefined,
  paused: false,

  init: function (canvasId) {
    //console.log("game init")
    this.canvas = document.getElementById(canvasId);
    this.ctx = this.canvas.getContext("2d");

    this.canvas.width = window.innerWidth
    this.canvas.height = window.innerHeight
    this.getLevel = getLevel(this.levelNum)
    console.log(this.getLevel)

    this.start()
  },
  start: function () {
    //console.log("game start")
    this.reset();
    this.interval = setInterval(() => {
      this.framesCounter++;
      if (!this.paused) {
        this.clear()
        this.drawAll()
        this.moveAll()
      }
      if (this.framesCounter > 1000) {
        this.framesCounter = 0;
      }

    }, 1000 / this.fps)

  },
  pause: function () {
    this.paused ? this.paused = false : this.paused = true
  },
  reset: function () {
    this.level = new Level(this, this.getLevel)
    console.log(this.level)
    this.framesCounter = 0
  },
  nextLevel: function () {
    this.levelNum++
    this.level = new Level(this, getLevel(this.levelNum))
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