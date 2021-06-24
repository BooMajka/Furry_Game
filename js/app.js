import "../sass/main.scss";

class Furry {
    constructor() {
        this.x = 0;
        this.y = 0;
        this.direction = "right";
    }
}

class Coin {
    constructor() {
        this.x = Math.floor(Math.random() * 10);
        this.y = Math.floor(Math.random() * 10);
    }
}

class Game {
    constructor() {
        this.board = document.querySelectorAll('#board div');
        this.score = 0;
        this.furry = new Furry();
        this.coin = new Coin();
    }

    index(x, y) {
        const index = x + (y * 10);
        console.log(index);
        if (index >= 0 && index < 100) {
            return index;
        }
    }

    showFurry() {
        this.board[this.index(this.furry.x, this.furry.y)].classList.add("furry");
    }

    hideVisibleFurry() {
        const lookForFurry = document.querySelector('.furry');
        lookForFurry.classList.remove("furry");
    }

    showCoin() {
        this.board[this.index(this.coin.x, this.coin.y)].classList.add('coin');
    }

    moveFurry() {
        if (this.furry.direction === "right") {
            this.furry.x = this.furry.x + 1;
        } else if (this.furry.direction === "left") {
            this.furry.x = this.furry.x - 1;
        } else if (this.furry.direction === "up") {
            this.furry.y = this.furry.y - 1;
        } else if (this.furry.direction === "down") {
            this.furry.y = this.furry.y + 1;
        }
        this.gameOver();
        this.hideVisibleFurry();
        this.checkCoinCollision();
        this.showFurry();

    }

    startGame() {
        game.showFurry();
        game.showCoin();
        this.score = 0;
        this.idSetInterval = setInterval(el => this.moveFurry(), 250);
    }

    turnFurry(event) {
        switch (event.which) {
            case 37:
                this.furry.direction = 'left';
                break;
            case 38:
                this.furry.direction = "up";
                break;
            case 39:
                this.furry.direction = "right";
                break;
            case 40:
                this.furry.direction = "down";
                break;
        }
    }

    checkCoinCollision() {
        const boardScore = document.querySelector("#score");
        boardScore.innerHTML = this.score;

        if (this.furry.x === this.coin.x && this.furry.y === this.coin.y) {
            this.score++;
            const lookForCoin = document.querySelector('.coin');
            lookForCoin.classList.toggle("coin");
            this.coin = new Coin();
            this.showCoin();
        }
    }

    gameOver() {
        if (this.furry.x < 0 || this.furry.x > 9 || this.furry.y < 0 || this.furry.y > 9) {
            this.hideVisibleFurry();
            clearInterval(this.idSetInterval);
            document.querySelector(".game-over").classList.remove("hide");
            document.querySelector("#final-score").innerHTML = this.score;
        }
    }
}

const game = new Game();
game.startGame();

document.addEventListener('keydown', function (event) {
    event.preventDefault();
    game.turnFurry(event);
});

const button = document.querySelector('.btn');

button.addEventListener('click', el => {
    location.reload();
});




