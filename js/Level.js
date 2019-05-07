class Level {
  constructor(ctx, canvas, level) {
    this.ctx = ctx
    this.canvas = canvas
    this.background = undefined
    this.player = undefined
    this.ballsNumber = 2;
    /* this.level = level. */
    this.reset()
  }
  reset() {
    this.background = new Background(this.ctx, this.canvas.width, this.canvas.height)
    this.player = new Player(this.ctx, this.canvas)
    this.balls = []
    const props = {
      ctx: this.ctx,
      canvas: this.canvas,
      type: 2,
      position: {
        x: this.randomNumber(0, this.canvas.width),
        y: this.randomNumber(0, this.canvas.height / 2)
      }
    }

    for (let i = 0; i < this.ballsNumber; i++) {
      let url = 'img/rock/rock' + this.randomNumber(1, 6) + '.jpg'
      this.balls.push(new Ball(props, url))
      props.position = {
        x: this.randomNumber(0, this.canvas.width),
        y: this.randomNumber(0, this.canvas.height / 2)
      }
    }

    //this.balls.push(new Ball(this.ctx, this.canvas, 2, 'img/rock/rock' + this.randomNumber(1, 6) + '.jpg'))
  }
  resetLevel() {
    confirm('Has perdido una vida.¿Quieres intentarlo de nuevo?')
    this.balls = []
    const props = {
      ctx: this.ctx,
      canvas: this.canvas,
      type: 2,
      url: 'img/rock/rock' + this.randomNumber(1, 6) + '.jpg',
      position: {
        x: this.randomNumber(0, this.canvas.width - 300),
        y: 0 //this.randomNumber(0, 300)
      },
      speed: {
        x: 2,
        y: 1
      }
    }

    for (let i = 0; i < this.ballsNumber; i++) {
      this.balls.push(new Ball(props, props.url))
      props.position = {
        x: this.randomNumber(0, this.canvas.width),
        y: this.randomNumber(0, 100)
      }
    }

    //this.balls.push(new Ball(this.ctx, this.canvas, 2, 'img/rock/rock' + this.randomNumber(1, 6) + '.jpg'))
  }
  draw(framesCounter) {

    this.background.draw()
    this.player.draw(framesCounter)
    this.balls.forEach(ball => ball.draw())
    if (this.checkPlayerImpact()) {
      if (this.player.lives > 0) {
        this.player.lives--
        console.log(this.player.lives)
        this.resetLevel()
      } else {
        confirm('No te quedan vidas')
        this.reset()
      }

    }

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
    // colisiones genéricas
    // (bullet.x + bullet.w > ball.x && ball.x + ball.w > bullet.x && bullet.y + bullet.h > ball.y && ball.y + ball.h > bullet.y )
    // esto chequea que el personaje no estén en colisión con cualquier obstáculo
    const balls = this.balls
    const bullets = this.player.bullets

    if (bullets.length != 0) {
      for (let i = 0; i < balls.length; i++) {

        if (this.checkImpact(bullets, balls[i])) {
          this.sliceBall(balls[i]).forEach(ball => {
            if (ball.type >= 0)
              this.balls.push(new Ball(ball, ball.url))
          })
          console.log(balls.splice(i, 1))

          i = i - 1
          console.log(this.balls)
        }

        if (!this.balls.length) {
          this.level++
          console.log('next level!!')
        }

      }
    }
  }
  checkPlayerImpact() {
    return this.balls.some(ball => {
      return (
        this.player.position.x + this.player.width >= ball.position.x &&
        this.player.position.x < ball.position.x + ball.width &&
        this.player.position.y <= ball.position.y + ball.height
      );
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
        console.log('bullet borrada')
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