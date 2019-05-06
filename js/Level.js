class Level {
  constructor(ctx, canvas) {
    this.ctx = ctx
    this.canvas = canvas
    this.background = undefined
    this.player = undefined
    this.reset()
    // this.album = undefined
  }
  reset() {
    this.background = new Background(this.ctx, this.canvas.width, this.canvas.height)
    this.player = new Player(this.ctx, this.canvas)
    this.ball = new Ball(this.ctx, this.canvas, 0)
  }
  draw(framesCounter) {
    //this.player = new Player()
    this.background.draw()
    this.player.draw(framesCounter)
    this.ball.draw()
  }

  move() {
    //this.ball.move()
  }

}