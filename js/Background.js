class Background {
  constructor(ctx, width, height) {
    this.ctx = ctx
    this.img = new Image();
    this.img.src = "img/rock/bg-rock.jpg";
    this.height = height
    this.width = width

    this.position = {
      x: 0,
      y: 0
    }
  }

  draw() {
    this.ctx.drawImage(this.img, this.position.x, this.position.y, this.width, this.height)
  }
}