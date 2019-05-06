class Ball {
  constructor(ctx, canvas, type) {
    this.ctx = ctx
    this.canvas = canvas

    this.position = {
      x: canvas.width - this.width,
      y: canvas.height + this.height,
    }
    this.speed = {
      x: 10,
      y: 0
    }
    this.type = type /* 0: pequeña(no se divide), 1: mediana 0*2, 2: grande 0*4 */

    this.img = new Image()
    this.img.src = 'img/rock/rock1.jpg'
    this.setDimensions()
  }
  setDimensions() {
    switch (this.type) {
      case 2:
        this.width = 256
        this.height = 256
        break;
      case 1:
        this.width = 128
        this.height = 128
        break;
      case 0:
        this.width = 64
        this.height = 64
        break;
    }

  }
  draw() {
    this.ctx.drawImage(this.position.x, this.position.y, this.width, this.height)
  }
  move() {
    this.position.x += this.speed.x
    //this.position.y += this.speed.y
  }
}