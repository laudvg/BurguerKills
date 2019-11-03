class Player {
    constructor(ctx, width, height, gameWidth, gameHeight, keys) {
        this.ctx = ctx;
        this.width = width;
        this.height = height;

        this.image = new Image();
        this.image.src = './img/burguerwlegs1.png'


        this.posX = 100;
        this.posY = 200;
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;
        this.gameBorderTop = gameHeight * 0.15;
        this.gameBorderDown = gameHeight * 0.85;
        this.frames = 1;
        this.framesIndex = 1;
        this.keys = keys;

        this.vy = 1;
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

    move(){
        if(this.posY >= this.gameBorderTop && this.posY < this.gameBorderDown){
            this.posX +=10;
        } else if (this.posY >= this.gameBorderDown && this.posY < this.gameBorderTop){
            this.posY -=10;
        }
    }

    // setListeners() {
    //     document.addEventListener('keypress', (e) => {
    //         switch (e.keyCode) {
    //             case this.keys.DOWN_KEY:
    //                 if (this.posY >= this.gameBorderTop && this.posY < this.gameBorderDown) {
    //                     this.posY += 10;
    //                 }
    //                 break;

    //             case this.keys.TOP_KEY:
    //                 if (this.posY >= this.gameBorderDown && this.posY < this.gameBorderTop) {
    //                     this.posY -= 10;
    //                 }
    //                 break;
    //         }
    //     })
    // }
}