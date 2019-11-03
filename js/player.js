class Player {
    constructor(ctx, width, height, keys) {
        this.ctx = ctx;
        this.width = width;
        this.height = height;

        this.image = new Image();
        this.image.src = './img/burguerwlegs.png'

        this.keys = keys;
        this.posX = 100;
        this.posY = 200;



    }
    draw(framesCounter) {
        this.ctx.drawImage(this.image,this.posX,this.posY,this.width,this.height)
    }
}