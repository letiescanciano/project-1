const Game = {
  canvas: undefined,
  version: '0.1 ',
  name: 'Music Pang',
  fps: 60,
  framesCounter: 0,
  levelNum: 1,
  getLevel: undefined,
  paused: false,
  lives: 3,
  maxLevels: levels.length,
  mode: 0,
  score: 0,

  init: function (canvasId, mode) {
    console.log('game init')
    this.canvas = document.getElementById(canvasId)
    this.ctx = this.canvas.getContext('2d')

    this.canvas.width = window.innerWidth
    this.canvas.height = window.innerHeight

    //console.log('get level en init', this.getLevel)
    this.mode = mode
    //console.log('mode en init', this.mode)
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
        if (this.mode == 0) {
          //console.log('entro en generar bubbls')
          if (!this.bubbles.length && this.framesCounter % 200 === 0) { //this.randomNumber(0, 800)
            this.bubbles.push(new Bubble(this.ctx, this.canvas, 'img/bubble.png'))
          }
        } else if (this.mode === 1 && this.framesCounter % 300 === 0) { // this.randomNumber(0, 100)
          this.bubbles.push(new Bubble(this.ctx, this.canvas, 'img/ih/t' + this.randomNumber(1, 3) + '.png'))
        }

        this.protectPlayer()
        if (!this.level.balls.length) {
          this.nextLevel()
        }
      }
    }, 1000 / this.fps)
  },
  randomNumber: function (min, max) {
    return Math.round(Math.random() * (max - min) + min)
  },
  pause: function () {
    this.paused ? this.paused = false : this.paused = true
  },
  reset: function () {
    this.bubbles = []
    this.level = new Level(this, getLevel(this.levelNum, this.mode), this.mode)
    this.framesCounter = 0
  },
  nextLevel: function () {
    if (this.levelNum < this.maxLevels) {
      this.levelNum++
      this.pause()
      this.drawNextLevel()
      setTimeout(() => {
        this.level = new Level(this, getLevel(this.levelNum, this.mode), this.mode) //paso Game porque necesito más de 4 argumentos
        this.pause()
      }, 2000)

      if (!this.paused) {
        this.level = new Level(this, getLevel(this.levelNum, this.mode), this.mode) //paso Game porque necesito más de 4 argumentos
      } else return
    } else alert('juego terminado')
  },
  drawAll: function () {
    if (this.level.checkPlayerImpact()) {
      if (this.lives > 0 && !this.level.player.protected) {
        this.lives--
        this.level.resetLevel()
      } else if (this.level.player.protected) {
        this.level.player.protected = false
      } else {
        this.gameOver()
      }
    }

    this.level.draw(this.framesCounter)
    this.drawScore()

    if (this.bubbles.length)
      this.bubbles.forEach(bubble => bubble.draw())
    this.drawLives()
    this.drawLevelNum()
  },
  moveAll: function () {
    this.level.move()
    if (this.bubbles.length)
      this.bubbles.forEach(bubble => bubble.move())
  },
  drawLives: function () {
    this.ctx.font = '48px Arcade'
    this.ctx.fillStyle = 'white'
    this.ctx.fillText('Lives x' + this.lives, 30, this.canvas.height - 22)
  },
  drawScore: function () {
    this.ctx.font = '48px Arcade'
    this.ctx.fillStyle = 'white'
    this.ctx.fillText('Score       ' + this.score, this.canvas.width / 2, this.canvas.height - 22)
  },
  drawLevelNum: function () {
    this.ctx.font = '48px Arcade'
    this.ctx.fillStyle = 'white'
    this.ctx.fillText('Level' + this.levelNum, this.canvas.width - 300, this.canvas.height - 22)
  },
  drawNextLevel: function () {
    //console.log('entro en drawnext')
    const widthRect = 800
    const heightRect = 200
    const posX = this.canvas.width / 2 - widthRect / 2
    const posY = this.canvas.height / 2 - heightRect / 2

    console.log(posX, posY, widthRect, heightRect)
    this.ctx.fillStyle = 'rgb(221, 221, 221)'
    this.ctx.fillRect(posX, posY, widthRect, heightRect)

    this.ctx.fillStyle = 'black'
    this.ctx.font = '80px Arcade'
    this.ctx.fillText(`LEVEL COMPLETED!`, posX + 40, posY + heightRect / 2)

    this.ctx.fillStyle = ''
    this.ctx.font = '36px Arcade'
    this.ctx.fillText(`LEVEL  ${this.levelNum} in 2 seconds`, posX + 100, posY + 40 + heightRect / 2)
  },
  clear: function () {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
  },
  protectPlayer: function () {
    //debugger
    //console.log(this.bubble.checkPlayerPosition(this.level.player))
    this.bubbles.forEach(bubble => {
      if (bubble.checkPlayerPosition(this.level.player)) {
        bubble.position.x = this.level.player.position.x - 10
        bubble.position.y = this.level.player.position.y - 20
        bubble.speed.x = this.level.player.speed.x
        bubble.width = this.level.player.width + 30
        bubble.height = this.level.player.height + 30
        this.level.player.protected = true
        bubble.state = 1
      }
    })
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
  gameOver: function () {
    clearInterval(this.interval)
    document.getElementsByClassName('container')[0].classList.add('game-over')
    setTimeout(() => {
      if (confirm('GAME OVER!! ¿Quieres empezar de nuevo?')) {
        document.getElementsByClassName('container')[0].classList.remove('game-over')
        this.lives = 4
        this.start()
      }
    }, 600)
  },
}