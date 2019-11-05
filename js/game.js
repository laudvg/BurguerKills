const Game = {
    canvas: undefined,
    ctx: undefined,
    width: undefined,
    height: undefined,
    minBurguerSizeX: 175,
    maxBurguerSizeX: 300,
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
            if (this.framesCounter * .25 % Math.floor((Math.random() * 100) + 20) === 0) this.generateObstacles();
            if (this.framesCounter * .25 % Math.floor((Math.random() * 100) + 20) === 0) this.generatePrizes();
            this.clearObstacles();
            this.clearPrizes();
            this.isCollisionObs();
            this.isCollisionPrize();
            //this.cleanEatenFood();
            if (this.isCollisionObs()) this.obstacles.shift();
            if (this.isCollisionPrize()) this.obstacles.shift();
            if(this.framesCounter % 100 === 0) this.score++;
        }, 1000 / this.fps)
    },

    reset: function () {
        this.background = new Background(this.ctx, this.width, this.height);
        this.player = new Player(this.ctx, 180, 175, this.width, this.height);
        this.player.setListeners();
        Score.init(this.ctx, this.score);

        this.obstacles = [];
        this.prizes = [];

    },

    clear: function () {
        this.ctx.clearRect(0, 0, this.width, this.height)
    },

    drawAll: function () {
        this.background.draw();
        this.player.draw(this.framesCounter);
        this.player.draw();
        this.obstacles.forEach(obstacles => obstacles.draw())
        this.prizes.forEach(prizes => prizes.draw())
        Score.draw(this.score);

    },

    moveAll: function () {
        this.background.move();
        this.player.move();
        this.obstacles.forEach(obstacles => obstacles.move())
        this.prizes.forEach(prizes => prizes.move())
    },

    generateObstacles: function () {
        this.obstacles.push(new Obstacles(this.ctx, 40, 45, this.width, this.height));
    },


    generatePrizes: function () {
        this.prizes.push(new Prizes(this.ctx, 70, 45, this.width, this.height));
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
            } else if (this.minBurguerSizeX > this.player.width) {
                this.gameOver();
                alert("FRED IS ON A DIET NOW");
            }
        })
    },

    goBigBurguer: function () {
        this.player.width *= 1.005;
        this.player.height *= 1.005;
    },

    isCollisionPrize: function () {
        this.prizes.forEach(prize => {
            if ((this.player.posX + this.player.width > prize.posX &&
                    this.player.posX < prize.posX + prize.width &&
                    prize.posY < this.player.posY + this.player.height &&
                    prize.posY + prize.height > this.player.posY)) {
                this.goBigBurguer();
            } else if (this.maxBurguerSizeY <= this.player.height) {
                this.gameOver();
                alert("FRED IS DEAD");
            }
        })
    },

    clearObstacles() {
        this.obstacles = this.obstacles.filter(obstacle => obstacle.posX > 100);
    },

    clearPrizes() {
        this.prizes = this.prizes.filter(prize => prize.posX > 100);
    },

    // cleanEatenFood: function () {
    //     if (this.isCollisionObs()) {
    //         this.obstacles.shift();
    //     } else if (this.isCollisionPrize()) {
    //         this.obstacles.shift();
    //     };
    // },

    gameOver: function () {
        clearInterval(this.interval)
    }

    

}