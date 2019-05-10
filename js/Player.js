class Player {
  constructor(ctx, canvas, url, frames, mode) {
    this.ctx = ctx
    this.canvas = canvas
    this.mode = mode

    this.speed = {
      x: 100,
      y: 0
    }

    this.img = new Image()
    this.img.src = 'img/instruments/' + url
    this.width = 128
    this.height = 128
    this.img.frames = frames;
    this.img.frameIndex = 0;

    this.position = {
      x: canvas.width / 2,
      y: canvas.height - this.height - 60,
      initialX: 0,
      initialY: 0
    }
    this.bullets = [];
    this.protected = false
    //this.setPlayerListeners()
  }

  draw(framesCounter) {
    this.ctx.drawImage(
      this.img,
      this.img.frameIndex * Math.floor(this.img.width / this.img.frames),
      0,
      Math.floor(this.img.width / this.img.frames),
      this.img.height,
      this.position.x,
      this.position.y,
      this.width,
      this.height
    )

    this.animateImg(framesCounter)
    this.drawAndMoveBullets()
    //this.drawLives()

  }
  drawAndMoveBullets() {
    this.bullets.forEach(function (bullet) {
      bullet.draw()
      bullet.move()
    })
  }

  animateImg(framesCounter) {
    if (framesCounter % 10 === 0) {
      this.img.frameIndex += 1
      if (this.img.frameIndex > 2) this.img.frameIndex = 0
    }
  }
  shoot() {
    if (this.bullets.length < 3) {
      if (this.mode === 0)
        this.bullets.push(new Bullet(this.ctx, this.position, this.width, 'img/instruments/musical-note.svg'))
      else
        this.bullets.push(new Bullet(this.ctx, this.position, this.width, 'img/ih/code.svg'))
    }

  }
  moveRight() {
    // console.log("me muevo a la derecha")
    //console.log(this.position.x)
    this.position.x += this.speed.x
    if (this.position.x >= this.canvas.width - this.width) this.position.x = this.canvas.width - this.width
  }
  moveLeft() {
    // console.log("me muevo a la izquierda")
    this.position.x -= this.speed.x
    if (this.position.x <= 0) this.position.x = 0
  }
}