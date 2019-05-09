class Extra {
  constructor(ctx, canvas, player, url) {
    this.ctx = ctx
    this.canvas = canvas


    this.img = new Image()
    this.img.src = 'img/bubble.png'
    this.width = 40
    this.height = 40

    this.position = {
      x: 100,
      y: 0
    }
    this.speed = {
      x: 0,
      y: 2
    }
    this.state = 0

  }

  draw() {
    if (this.state != -1)
      this.ctx.drawImage(this.img, this.position.x, this.position.y, this.width, this.height)
  }
  move() {
    if (this.position.y + this.height >= this.canvas.height - 100) this.position.y = this.canvas.height - this.height - 80
    this.position.y += 2
  }

  checkPlayerPosition(player) {
    return (
      player.position.x + player.width >= this.position.x &&
      player.position.x < this.position.x + this.width &&
      player.position.y <= this.position.y + this.height
    )
  }
}