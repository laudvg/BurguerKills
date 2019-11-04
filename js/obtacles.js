class Obstacle {
    constructor(ctx, width, height, gameWidth, gameHeight) {
      this.ctx = ctx;
      this.width = width;
      this.height = height;
  
      this.posX = gameWidth;
      this.posY = gameHeight * 0.98 - this.height;
      
      this.imageArrayObstacles.src = [ "./img/healthy/apple.png","./img/healthy/berenjena.png","./img/healthy/carrot.png", "./img/healthy/kiwi.png", "./img/healthy/patilla.png" ];
      this.vx = 10;
    }
  
    draw() {
      this.randomObstacle = this.imageArrayObstacles.src[Math.floor(Math.random() * this.imageArrayObstacles.src.length)];
      this.ctx.fillStyle = this.randomObstacle;
      this.ctx.fillRect(this.posX, this.posY, this.width, this.height);
    }
  
    move() {
      this.posX -= this.vx;
    }
  }