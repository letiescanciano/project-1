class Bullet {
  constructor(ctx, position, playerW, url) {
    this.ctx = ctx
    // console.log(position)
    this.position = {
      x: position.x + playerW / 2,
      y: position.y - 10
    }
    this.speed = {
      y: 10
    }
    this.img = new Image()
    this.img.src = url

    this.width = 32
    this.height = 32
  }
  draw() {
    this.ctx.drawImage(this.img, this.position.x, this.position.y, this.width, this.height)
  }

  move() {
    this.position.y -= this.speed.y

  }
}