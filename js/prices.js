class Prices {
    constructor(ctx, width, height, gameWidth, gameHeight) {
      this.ctx = ctx;
      this.width = width;
      this.height = height;
  
      this.posX = gameWidth;
      this.posY = gameHeight/1.5;
      this.image = new Image();
      this.image.src = "./img/fat/donut.png";
      this.vx = 10;
    }
  
    draw() {
      this.ctx.drawImage(this.image, this.posX, this.posY, this.width, this.height);
    }
  
    move() {
      this.posX -= this.vx;
    }
  }