const Game = {
    canvas: undefined,
    ctx: undefined,
    width: undefined,
    height: undefined,
    minBurguerSizeX: 175,
    maxBurguerSizeX: 550,
    fps: 60,
    framesCounter: 0,
    score: 0,
    playerKeys: {
        keyUp: 38,
        keyDown: 40,
    },
    obstacleGen: 0,
    prizeGen: 0,

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
            if (this.framesCounter % 100 === 0) this.score++;
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

    generateRandom: function () {
        this.obstacleGen = Math.floor((Math.random() * 5) + 1);
    },

    generateObstacles: function () {
        this.generateRandom();

        if (this.obstacleGen === 1) {
            this.obstacles.push(new Obstacles(this.ctx, 40, 45, this.width, this.height, "./img/healthy/apple.png"));

        } else if (this.obstacleGen === 2) {
            this.obstacles.push(new Obstacles(this.ctx, 40, 45, this.width, this.height, "./img/healthy/berenjena.png"));

        } else if (this.obstacleGen === 3) {
            this.obstacles.push(new Obstacles(this.ctx, 40, 45, this.width, this.height, "./img/healthy/carrot.png"));

        } else if (this.obstacleGen === 4) {
            this.obstacles.push(new Obstacles(this.ctx, 100, 45, this.width, this.height, "./img/healthy/patilla.png"));

        } else if (this.obstacleGen === 5) {
            this.obstacles.push(new Obstacles(this.ctx, 60, 45, this.width, this.height, "./img/healthy/kiwi.png"));

        }
    },

    generateRandomP: function () {
        this.prizeGen = Math.floor((Math.random() * 5) + 1);
    },

    generatePrizes: function () {
        this.generateRandomP();

        if (this.prizeGen === 1) {
            this.prizes.push(new Prizes(this.ctx, 70, 45, this.width, this.height, "./img/fat/taco.png"));

        } else if (this.prizeGen === 2) {
            this.prizes.push(new Prizes(this.ctx, 60, 45, this.width, this.height, "./img/fat/donut.png"));

        } else if (this.prizeGen === 3) {
            this.prizes.push(new Prizes(this.ctx, 40, 45, this.width, this.height, "./img/fat/icecream.png"));

        } else if (this.prizeGen === 4) {
            this.prizes.push(new Prizes(this.ctx, 45, 45, this.width, this.height, "./img/fat/cola.png"));

        } else if (this.prizeGen === 5) {
            this.prizes.push(new Prizes(this.ctx, 40, 50, this.width, this.height, "./img/fat/potatoes.png"));

        }
    },

    goSmallBurguer: function () {
        this.player.width *= 0.9
        this.player.height *= 0.9
    },

    isCollisionObs: function () {
        this.obstacles.forEach(obstacle => {
            if ((this.player.posX + this.player.width / 2 > obstacle.posX &&
                    this.player.posX < obstacle.posX + obstacle.width / 2 &&
                    obstacle.posY < this.player.posY + this.player.height / 2 &&
                    obstacle.posY + obstacle.height / 2 > this.player.posY)) {
                let index = this.obstacles.indexOf(obstacle);
                if (index > -1) {
                    this.obstacles.splice(index, 1);
                }
                this.goSmallBurguer()
            } else if (this.minBurguerSizeX > this.player.width) {
                console.log(this.minBurguerSizeX, this.player.width);
                this.gameOver();
                alert("FRED IS ON A DIET NOW");
            }
        })
    },

    goBigBurguer: function () {
        this.player.width *= 1.1;
        this.player.height *= 1.1;
    },

    isCollisionPrize: function () {
        this.prizes.forEach(prize => {
            if ((this.player.posX + this.player.width / 2 > prize.posX &&
                    this.player.posX < prize.posX + prize.width / 2 &&
                    prize.posY < this.player.posY + this.player.height / 2 &&
                    prize.posY + prize.height / 2 > this.player.posY)) {

                let index = this.prizes.indexOf(prize);
                if (index > -1) {
                    this.prizes.splice(index, 1);
                }

                this.goBigBurguer();
            } else if (this.maxBurguerSizeX <= this.player.height) {
                this.gameOver();
                alert("FRED IS DEAD");
            }
        })
    },

    clearObstacles() {
        this.obstacles = this.obstacles.filter(obstacle => obstacle.posX > 80);
    },

    clearPrizes() {
        this.prizes = this.prizes.filter(prize => prize.posX > 80);
    },

    gameOver: function () {
        clearInterval(this.interval)
    }



}