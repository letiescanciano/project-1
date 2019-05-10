class Level {
  constructor(game, getLevel, mode) {
    this.game = game
    this.ctx = this.game.ctx
    this.canvas = this.game.canvas
    this.mode = mode
    //console.log(this.mode)
    this.getLevel = getLevel
    //console.log('this getlevel', this.getLevel)

    //console.log(this.getLevel.balls)
    this.level = this.getLevel.num
    this.ballsNumber = this.getLevel.ballsNumber
    if (this.mode === 0) {
      this.bgUrl = this.getLevel.musicGenre.background
      this.playerAvatar = this.getLevel.musicGenre.instrument
      this.playerFrames = this.getLevel.musicGenre.frames
    } else { //IH mode
      //this.ballsNumber = this.getLevel.ballsNumber;
      this.getLevel.balls = getLevel.balls
      this.bgUrl = this.getLevel.background
      this.playerAvatar = 'web.png'
      this.playerFrames = 3
    }

    this.reset()
  }
  reset() {
    let props
    this.background = new Background(this.ctx, this.canvas.width, this.canvas.height, this.bgUrl)
    this.player = new Player(this.ctx, this.canvas, this.playerAvatar, this.playerFrames, this.game.mode)
    this.balls = []
    props = {
      ctx: this.ctx,
      canvas: this.canvas,
      type: 2,
      position: {
        x: this.randomNumber(100, this.canvas.width - 300),
        y: this.randomNumber(10, this.canvas.height / 3)
      }
    }

    let url

    if (this.mode == 0) {
      for (let i = 0; i < this.ballsNumber; i++) {
        url = 'img' + this.getLevel.musicGenre.filePath + this.randomNumber(1, 6) + '.jpg'
        this.balls.push(new Ball(props, url))
        //console.log(this.balls)
        props.position = {
          x: this.randomNumber(0, this.canvas.width - 300),
          y: this.randomNumber(0, this.canvas.height / 3)
        }
      }
    } else if (this.mode === 1) {
      //console.log(this.getLevel.balls)
      //debugger
      this.getLevel.balls.forEach(ball => {
        this.balls.push(new Ball(props, ball))
        props.position = {
          x: this.randomNumber(0, this.canvas.width - 300),
          y: this.randomNumber(0, this.canvas.height / 3)
        }
      })
      console.log(this.balls)


    }



  }
  resetLevel() {
    confirm('Has perdido una vida.¿Quieres intentarlo de nuevo?')
    this.balls = []
    const props = {
      ctx: this.ctx,
      canvas: this.canvas,
      type: 2,
      position: {
        x: this.randomNumber(100, this.canvas.width - 300),
        y: this.randomNumber(10, this.canvas.height / 3)
      }
    }

    let url
    if (this.mode == 0) {
      for (let i = 0; i < this.ballsNumber; i++) {
        url = 'img' + this.getLevel.musicGenre.filePath + this.randomNumber(1, 6) + '.jpg'
        this.balls.push(new Ball(props, url))
        // console.log(this.balls)
        props.position = {
          x: this.randomNumber(0, this.canvas.width - 300),
          y: this.randomNumber(0, this.canvas.height / 3)
        }
      }
    } else if (this.mode === 1) {
      this.getLevel.balls.forEach(ball => {
        this.balls.push(new Ball(props, ball))
        props.position = {
          x: this.randomNumber(0, this.canvas.width - 300),
          y: this.randomNumber(0, this.canvas.height / 3)
        }
      })
      //console.log(this.balls)
    }

  }
  draw(framesCounter) {

    this.background.draw()
    this.player.draw(framesCounter)
    this.balls.forEach(ball => ball.draw())

    this.clearBullets()
    this.checkBulletImpact()
  }

  move() {
    this.balls.forEach(ball => ball.move())
  }
  randomNumber(min, max) {
    return Math.round(Math.random() * (max - min) + min)
  }
  checkBulletImpact() {
    const balls = this.balls
    const bullets = this.player.bullets

    if (bullets.length != 0) {
      for (let i = 0; i < balls.length; i++) {
        if (this.checkImpact(bullets, balls[i])) {
          this.game.score += 20
          this.sliceBall(balls[i]).forEach(ball => {
            if (ball.type >= 0)
              this.balls.push(new Ball(ball, ball.url))
          })
          balls.splice(i, 1)
          i = i - 1
          //console.log(this.balls)
        }
      }
    }
  }
  checkPlayerImpact() {
    return this.balls.some((ball, index, object) => {
      if (
        this.player.position.x + this.player.width >= ball.position.x &&
        this.player.position.x < ball.position.x + ball.width &&
        this.player.position.y <= ball.position.y + ball.height) {
        if (this.player.protected) {
          this.game.bubbles.splice(0, 1)
          this.sliceBall(ball).forEach(ball => {
            if (ball.type >= 0)
              this.balls.push(new Ball(ball, ball.url))
          })
          object.splice(index, 1)
          return true
        } else return true
      }
    });

  }

  checkImpact(bullets, ball) {
    return bullets.some((bullet, index) => {
      if (
        bullet.position.x + bullet.width >= ball.position.x &&
        bullet.position.x < ball.position.x + ball.width &&
        bullet.position.y <= ball.position.y + ball.height
      ) {
        bullets.splice(index, 1)
        return true
      }
    });
  }

  clearBullets() {
    this.player.bullets = this.player.bullets.filter(bullet => bullet.position.y > 0)
  }
  sliceBall(ball) {
    //debugger
    return [{
        ctx: ball.ctx,
        canvas: ball.canvas,
        type: ball.type - 1,
        url: ball.img.src,
        position: {
          x: ball.position.x / 2 + 100,
          y: ball.position.y - 20
        },
        speed: {
          x: ball.speed.x * 2,
          y: -Math.abs(ball.speed.y) * 1.5
        },
        type: ball.type - 1
      },
      {
        ctx: ball.ctx,
        canvas: ball.canvas,
        type: ball.type - 1,
        url: ball.img.src,
        position: {
          x: ball.position.x / 2 + 100,
          y: ball.position.y - 20
        },
        speed: {
          x: ball.speed.x * -2,
          y: -Math.abs(ball.speed.y) * 1.5
        },
        type: ball.type - 1
      }
    ]
  }
}