class Player {
    constructor(ctx, width, height, keys) {
        this.ctx = ctx;
        this.width = width;
        this.height = height;

        this.image = new Image();
        this.image.src = './img/burguerwlegs.png'


        this.posX = 100;
        this.posY = 200;

        this.frames = 3;
        this.framesIndex = 0;
        this.keys = keys;
    };

    draw(framesCounter) {
        this.ctx.drawImage(
            this.image,
            Math.floor(this.framesIndex * this.width / this.frames),
            0,
            Math.floor(this.image.width / this.frames),
            this.image.height,
            this.posX,
            this.posY,
            this.width,
            this.height
            )
        this.animate(framesCounter);
    }

    animate(framesCounter) {
        if (framesCounter % 10 === 0) {
            this.framesIndex++;

            if (this.framesIndex > 2) this.framesIndex = 0;
        }
    }
}