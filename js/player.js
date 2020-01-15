class Player {
    constructor(ctx, width, height, gameWidth, gameHeight) {
        this.ctx = ctx;
        this.width = width;
        this.height = height;

        this.image = new Image();
        this.image.src = './img/mesa12.png';
        // this.image.src = './img/player.png'
        this.posX = 100;
        this.posY = 350;
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;

        this.frames = 6;
        this.framesIndex = 1;

        this.keyState = {
            keyDown: false,
            keyUp: false
        }
    };

    draw(framesCounter) {
        this.ctx.drawImage(
            this.image,
            this.framesIndex * Math.floor(this.image.width / this.frames),
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
            (this.framesIndex > 5) && (this.framesIndex = 0);
        }
    }

    move() {
        if (this.keyState.keyDown && this.posY < 450) {
            this.posY += 5;
        } else if (this.keyState.keyUp && this.posY > 75) {
            this.posY -= 5;
        }
    }

    setListeners() {
        document.addEventListener('keydown', (e) => {
            e.preventDefault();
            if (e.keyCode === 38) {
                this.keyState.keyUp = true;
            }
            if (e.keyCode === 40) {
                this.keyState.keyDown = true;
            }

        });
        document.addEventListener('keyup', (e) => {
            e.preventDefault();
            if (e.keyCode === 38) {
                this.keyState.keyUp = false;
            }
            if (e.keyCode === 40) {
                this.keyState.keyDown = false;
            }
        });

    }
}