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
    mySound: new Audio('./sound/WhatsAppAudio2019-11-06at110031P.mp3'),
    // neonLamp: new Audio("./sound/70316__robinhood76__00996-neon-lamp-on-1.wav"),


    init: function () {
        this.canvas = document.getElementById('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        this.canvas.width = this.width;
        this.canvas.height = this.height;
        this.start();
        // this.neonLamp.play();
    },

    start: function () {
        this.reset()
        this.interval = setInterval(() => {
            this.framesCounter++;
            this.clear();
            this.drawAll();
            this.moveAll();
            if (this.framesCounter * .20 % Math.floor((Math.random() * 100) + 10) === 0) this.generateObstacles();
            if (this.framesCounter * .20 % Math.floor((Math.random() * 100) + 10) === 0) this.generatePrizes();
            this.clearObstacles();
            this.clearPrizes();
            this.isCollisionObs();
            this.isCollisionPrize();
            if (this.framesCounter % 100 === 0) this.score++;
            this.mySound.play();
            this.mySound.loop= true;
        }, 1000 / this.fps)
        
    },

    reset: function () {
        this.background = new Background(this.ctx, this.width, this.height);
        this.player = new Player(this.ctx, 180, 200, this.width, this.height);
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
        this.obstacleGen = Math.floor((Math.random() * 6) + 1);
    },

    generateObstacles: function () {
        this.generateRandom();

        if (this.obstacleGen === 1) {
            this.obstacles.push(new Obstacles(this.ctx, 50, 55, this.width, this.height, "./img/healthy/healthApple.png", 15));

        } else if (this.obstacleGen === 2) {
            this.obstacles.push(new Obstacles(this.ctx, 50, 70, this.width, this.height, "./img/healthy/healthAvo.png",15));

        } else if (this.obstacleGen === 3) {
            this.obstacles.push(new Obstacles(this.ctx, 50, 55, this.width, this.height, "./img/healthy/healthBan.png",15));

        } else if (this.obstacleGen === 4) {
            this.obstacles.push(new Obstacles(this.ctx, 50, 55, this.width, this.height, "./img/healthy/healthApple.png",10));

        } else if (this.obstacleGen === 5) {
            this.obstacles.push(new Obstacles(this.ctx, 50, 70, this.width, this.height, "./img/healthy/healthAvo.png",10));

        } else if (this.obstacleGen === 6) {
            this.obstacles.push(new Obstacles(this.ctx, 50, 55, this.width, this.height, "./img/healthy/healthBan.png",10));
        }
    },

    generateRandomP: function () {
        this.prizeGen = Math.floor((Math.random() * 6) + 1);
    },

    generatePrizes: function () {
        this.generateRandomP();

        if (this.prizeGen === 1) {
            this.prizes.push(new Prizes(this.ctx, 50, 55, this.width, this.height, "./img/fat/fatIce.png",15));

        } else if (this.prizeGen === 2) {
            this.prizes.push(new Prizes(this.ctx, 50, 55, this.width, this.height, "./img/fat/fatPotatoes.png",15));

        } else if (this.prizeGen === 3) {
            this.prizes.push(new Prizes(this.ctx, 30, 70, this.width, this.height, "./img/fat/fatSoda.png",15));

        } else if (this.prizeGen === 4) {
            this.prizes.push(new Prizes(this.ctx, 50, 55, this.width, this.height, "./img/fat/fatIce.png",10));

        } else if (this.prizeGen === 5) {
            this.prizes.push(new Prizes(this.ctx, 50, 55, this.width, this.height, "./img/fat/fatPotatoes.png",10));

        } else if (this.prizeGen === 6) {
            this.prizes.push(new Prizes(this.ctx, 30, 70, this.width, this.height, "./img/fat/fatSoda.png",10));
        }
    },

    goSmallBurguer: function () {
        this.player.width *= 0.9;
        this.player.height *= 0.9;
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
                this.gameOver();
                this.mySound.pause();
            
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
                this.winGame();
                this.mySound.pause();
    

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
        document.querySelector("#canvas").style.display="none";
        document.querySelector("#gameOver").style.display ="block";
        clearInterval(this.interval);
    },

    winGame: function () {
        document.querySelector("#canvas").style.display="none";
        document.querySelector("#winGame").style.display ="block";
        clearInterval(this.interval);
    },

}