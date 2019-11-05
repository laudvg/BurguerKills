const Game = {
    canvas: undefined,
    ctx: undefined,
    width: undefined,
    height: undefined,
    minBurguerSizeX: 180,
    maxBurguerSizeX: 375,
    fps: 60,
    framesCounter: 0,
    score: 0,
    playerKeys: {
        keyUp: 38,
        keyDown: 40
    },

    init: function () {
        this.canvas = document.getElementById('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        this.canvas.width = this.width;
        this.canvas.height = this.height;

        this.start();
    },

    start: function () {
        this.reset()
        this.interval = setInterval(() => {
            this.framesCounter++;
            this.clear();
            this.drawAll();
            this.moveAll();
            if (this.framesCounter % 90 === 0) this.generateObstacles();
            if (this.framesCounter % 95 === 0) this.generatePrices();
            this.clearObstacles();
            this.clearPrices();
           // this.isCollisionObs();
            this.isCollisionPrice();

        }, 1000 / this.fps)
    },

    reset: function () {
        this.background = new Background(this.ctx, this.width, this.height);
        this.player = new Player(this.ctx, 180, 175, this.width, this.height);
        this.player.setListeners();
        this.obstacles = [];
        this.prices = [];


    },

    clear: function () {
        this.ctx.clearRect(0, 0, this.width, this.height)
    },

    drawAll: function () {
        this.background.draw();
        this.player.draw(this.framesCounter);
        this.player.draw();
        this.obstacles.forEach(obstacles => obstacles.draw())
        this.prices.forEach(prices => prices.draw())

    },

    moveAll: function () {
        this.background.move();
        this.player.move();
        this.obstacles.forEach(obstacles => obstacles.move())
        this.prices.forEach(prices => prices.move())
    },

    generateObstacles: function () {
        this.obstacles.push(new Obstacles(this.ctx, 40, 45, this.width, this.height));
    },


    generatePrices: function () {
        this.prices.push(new Prices(this.ctx, 70, 45, this.width, this.height));
    },

    goSmallBurguer: function () {
        this.player.width *= 0.99
        this.player.height *= 0.99
    },

    isCollisionObs: function () {
        this.obstacles.forEach(obstacle => {
            if ((this.player.posX + this.player.width > obstacle.posX &&
                    this.player.posX < obstacle.posX + obstacle.width &&
                    obstacle.posY < this.player.posY + this.player.height &&
                    obstacle.posY + obstacle.height > this.player.posY)) {
                this.goSmallBurguer()
            }
            // else if (this.minBurguerSizeX > this.player.width) {
            //     alert("FRED IS ON A DIET NOW");
            // }
        })
    },

    goBigBurguer: function () {
        this.player.width *= 1.01
        this.player.height *= 1.01
    },

    isCollisionPrice: function () {
        this.prices.forEach(price => {
            if ((this.player.posX + this.player.width > price.posX &&
                this.player.posX < price.posX + price.width &&
                price.posY < this.player.posY + this.player.height &&
                price.posY + price.height > this.player.posY)) {
                this.goBigBurguer()
            } 
            // else if (this.maxBurguerSizeY <= this.player.height) {
            //     alert("FRED IS DEAD");
            // }
        })
    },

    clearObstacles() {
        this.obstacles = this.obstacles.filter(obstacle => obstacle.posX > 0);
    },

    clearPrices() {
        this.prices = this.prices.filter(price => price.posX > 0);
    },
}