class Level {
  constructor(ctx, canvas) {
    this.ctx = ctx
    this.canvas = canvas
    this.background = undefined
    this.player = undefined
    this.ballsNumber = 2;
    this.reset()
    // this.album = undefined
  }
  reset() {
    this.background = new Background(this.ctx, this.canvas.width, this.canvas.height)
    this.player = new Player(this.ctx, this.canvas)
    this.balls = []
    for (let i = 0; i < this.ballsNumber; i++) {
      this.balls.push(new Ball(this.ctx, this.canvas, 2, 'img/rock/rock' + this.randomNumber(1, 6) + '.jpg'))
    }

    //this.balls.push(new Ball(this.ctx, this.canvas, 2, 'img/rock/rock' + this.randomNumber(1, 6) + '.jpg'))
  }
  draw(framesCounter) {
    //this.player = new Player()
    this.background.draw()
    this.player.draw(framesCounter)
    this.balls.forEach(ball => ball.draw())
    if (this.checkPlayerImpact()) alert('choque')
    /* this.ball1.draw()
    this.ball2.draw() */
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
    let impact = this.balls.some(ball => {
      return (this.player.bullets.some(bullet => {
        return (
          bullet.position.x + bullet.width >= ball.position.x &&
          ball.position.x + ball.width <= bullet.position.x &&
          bullet.position.y + bullet.
        )
      }))
    })


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
}