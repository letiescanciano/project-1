const Game = {
  canvas: undefined,
  version: '0.1 ',
  name: 'Music Pang',
  fps: 60,
  framesCounter: 0,
  levelNum: 1,
  getLevel: undefined,
  paused: false,
  lives: 4,
  maxLevels: levels.length,

  init: function (canvasId) {
    console.log('game init')
    this.canvas = document.getElementById(canvasId)
    this.ctx = this.canvas.getContext('2d')

    this.canvas.width = window.innerWidth
    this.canvas.height = window.innerHeight
    this.getLevel = getLevel(this.levelNum)
    //console.log(this.maxLevels)
    this.start()
    this.setListeners()
  },
  start: function () {
    //console.log("game start")
    this.reset()
    this.interval = setInterval(() => {
      if (!this.paused) {
        this.framesCounter++
        this.clear()
        this.drawAll()
        this.moveAll()
        if (this.framesCounter > 1000) {
          this.framesCounter = 0
        }
        if (!this.level.balls.length) {
          this.nextLevel()
        }
      }
    }, 1000 / this.fps)
  },
  pause: function () {
    this.paused ? this.paused = false : this.paused = true
    //console.log('this.paused:', this.paused)
  },
  reset: function () {
    this.level = new Level(this, this.getLevel)
    this.framesCounter = 0
  },
  nextLevel: function () {
    if (this.levelNum < this.maxLevels) {
      this.levelNum++
      this.drawNextLevel()
      this.pause()
      /*    setTimeout(() => {
           this.level = new Level(this, getLevel(this.levelNum)) //paso Game porque necesito más de 4 argumentos
           this.pause()
         }, 3000) */

      if (!this.paused) {
        this.level = new Level(this, getLevel(this.levelNum)) //paso Game porque necesito más de 4 argumentos
      } else return
      //this.level = new Level(this, getLevel(this.levelNum)) //paso Game porque necesito más de 4 argumentos
    } else alert('juego terminado')
  },
  drawAll: function () {
    //console.log("drawall")
    if (this.level.checkPlayerImpact()) {
      if (this.lives > 0) {
        this.lives--
        //console.log('oh te han dado. Vidas restantes', this.lives)
        this.level.resetLevel()
      } else {
        this.gameOver()
      }
    }
    this.level.draw(this.framesCounter)
    this.drawLives()
    this.drawLevelNum()
  },
  moveAll: function () {
    this.level.move()
  },
  drawLives: function () {
    this.ctx.font = '48px Arcade'
    this.ctx.fillStyle = 'white'
    this.ctx.fillText('Lives x' + this.lives, 30, this.canvas.height - 22)
  },
  drawLevelNum: function () {
    this.ctx.font = '48px Arcade'
    this.ctx.fillStyle = 'white'
    this.ctx.fillText('Level' + this.levelNum, this.canvas.width - 300, this.canvas.height - 22)
  },
  drawNextLevel: function () {
    //console.log('entro en drawnext')
    const widthRect = 500
    const heightRect = 200
    const posX = this.canvas.width / 2 - widthRect / 2
    const posY = this.canvas.height / 2 - heightRect / 2

    console.log(posX, posY, widthRect, heightRect)
    this.ctx.fillStyle = 'white'
    this.ctx.fillRect(posX, posY, widthRect, heightRect)
    this.ctx.fillStyle = 'black'
    this.ctx.font = '24px Arcade'
    this.ctx.fillText('Siguiente Nivel' + this.levelNum, posX, posY + heightRect / 2)
  },
  clear: function () {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
  },
  setListeners: function () {
    document.onkeydown = (e) => {
      switch (e.keyCode) {
        case 80: //Pausa P
          this.pause()
          break
        case 82: //reset R
          this.reset()
          break
        case 37:
          this.level.player.moveLeft()
          break
        case 39:
          this.level.player.moveRight()
          break
        case 32:
          this.level.player.shoot()
          break
      }
    }
  },
  gameOver() {
    clearInterval(this.interval)
    /* this.gameOverImg = new Image()
    this.ctx.drawImage(this.gameOverImg, this.canvas.width / 2 - 250, this.canvas.height / 2 - 250, 500, 500)
    document.onkeydown = (e) => {
      if (e.keyCode === 13) {
        this.init()
      }
    } */
    if (confirm('GAME OVER!! ¿Quieres empezar de nuevo?')) {
      this.lives = 4
      this.start()
    }
  },
}