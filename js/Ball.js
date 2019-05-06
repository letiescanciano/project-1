class Ball {
  constructor(ctx, canvas, type, url) {
    this.ctx = ctx
    this.canvas = canvas
    this.speed = {
      x: 5,
      y: 4
    }
    this.type = type /* 0: pequeña(no se divide), 1: mediana 0*2, 2: grande 0*4 */

    this.img = new Image()
    this.img.src = url

    this.setDimensions()
    this.setPosition()
  }
  setDimensions() {
    switch (this.type) {
      case 2:
        this.width = 256
        this.height = 256
        this.gravity = 0.003
        break;
      case 1:
        this.width = 128
        this.height = 128
        this.gravity = 0.008
        break;
      case 0:
        this.width = 64
        this.height = 64
        this.gravity = 0.01
        break;
    }

  }
  setPosition() {
    this.position = {
      x: this.randomNumber(0, this.canvas.width - this.width),
      y: 0,
    }
  }
  draw() {
    this.ctx.drawImage(this.img, this.position.x, this.position.y, this.width, this.height)
  }
  move() {
    this.moveX()
    this.moveY()

  }
  randomNumber(min, max) {
    return Math.round(Math.random() * (max - min) + min)
  }
  moveX() {
    this.position.x -= this.speed.x
    if (this.position.x <= 0 || this.position.x + this.width >= this.canvas.width) this.changeDirectionX()
  }
  moveY() {
    this.speed.y += this.gravity
    this.position.y += this.speed.y
    if (this.position.y <= 0 || this.position.y + this.height >= this.canvas.height) this.changeDirectionY()
  }
  changeDirectionX() {
    //console.log("cambio de direccion en x")
    this.speed.x *= -1
  }
  changeDirectionY() {
    //console.log("cambio de direccion en y")
    this.speed.y *= -1
  }
}