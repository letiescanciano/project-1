class Ball {
  constructor(props) {
    this.ctx = props.ctx
    this.canvas = props.canvas
    this.speed = {
      x: 3,
      y: 1
    }
    this.type = props.type /* 0: pequeña(no se divide), 1: mediana 0*2, 2: grande 0*4 */

    this.img = new Image()
    this.img.src = props.url

    this.setDimensions()
    this.setPosition(props)
  }
  setDimensions() {
    switch (this.type) {
      case 2:
        this.width = 256
        this.height = 256
        this.speed.x = 0.5
        this.speed.y = 0.5
        this.gravity = 0.003
        break;
      case 1:
        this.width = 128
        this.height = 128
        /*   this.speed.x = 1
          this.speed.y = 1 */
        this.gravity = 0.08
        break;
      case 0:
        this.width = 64
        this.height = 64
        this.speed.x = 1.5
        this.speed.y = 1.5
        this.gravity = 0.01
        break;
    }

  }
  setPosition(props) {
    this.position = {
      x: this.randomNumber(0, this.canvas.width - this.width),
      y: 0,
    }

    /*     this.position = {
          x: props.position.x,
          y: props.position.y
        } */
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