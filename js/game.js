class Game {
    constructor(canvas) {
        this.canvas = undefined,
            this.ctx = undefined,
            this.width = undefined,
            this.height = undefined,
            this.fps = 60,
            this.framesCounter = 0

    };

    init() {
        this.canvas = document.getElementById('canvas'),
            this.ctx = this.canvas.getContext('2d'),
            this.width = window.innerWidth,
            this.height = window.innerHeight,
            this.canvas.width = this.width,
            this.canvas.height = this.height,

            this.start()
    };

    start() {
        this.reset()
        this.interval = setInterval(() => {
            this.framesCounter++;

        }, 1000 / this.fps)
    };

    reset() {
        this.background = new Background(this.image, this.posX, this.posY, this.width, this.height);
    };

    clear() {
        this.ctx.clearRect(0, 0, this.width, this.height)
    };

    drawAll() {
        this.background.draw();
    };

    


}