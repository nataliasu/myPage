const memoGame = {
    tileAmount: 20,
    tileInRow: 5,
    tilesClicked: [],
    tiles: [],
    score: 0,
    boardGame: null,
    divScore: null,
    images: [
        'images/fruit_1.png',
        'images/fruit_2.png',
        'images/fruit_3.png',
        'images/fruit_4.png',
        'images/fruit_5.png',
        'images/fruit_6.png',
        'images/fruit_7.png',
        'images/fruit_8.png',
        'images/fruit_9.png',
        'images/fruit_10.png'
    ],
    clickMode: true,
    pairs: 0,
    wrongChoice: 0,

    clickTile: function (e) {
        if (this.clickMode) {
            if (!this.tilesClicked[0] || (this.tilesClicked[0].dataset.index !== e.target.dataset.index)) {
                this.tilesClicked.push(e.target);
                e.target.style.backgroundImage = 'url(' + this.images[e.target.dataset.cardType] + ')';
            }
            if (this.tilesClicked.length == 2) {
                this.clickMode = false;
                if (this.tilesClicked[0].dataset.cardType === this.tilesClicked[1].dataset.cardType) {
                    setTimeout(this.deleteTiles.bind(this), 500);
                    this.wrongChoice = 0;
                } else {
                    setTimeout(this.resetTiles.bind(this), 500);
                    this.wrongChoice++;
                }

                if (this.wrongChoice > 2) {
                    this.score = this.score + 2;
                } else {
                    this.score++
                }
                this.divScore.innerHTML = this.score;
            }
        }
    },

    deleteTiles: function () {
        this.tilesClicked[0].remove();
        this.tilesClicked[1].remove();
        this.clickMode = true;
        this.tilesClicked = []
        this.pairs++;
        if (this.pairs >= this.tileAmount / 2) {
            alert('GAME OVER! Your score is: ' + this.score);
        }
    },

    resetTiles: function () {
        this.tilesClicked[0].style.backgroundImage = 'url(images/que.png)';
        this.tilesClicked[1].style.backgroundImage = 'url(images/que.png)';
        this.tilesClicked = [];
        this.clickMode = true;
    },

    startGame: function () {

        //clearing variables
        this.tilesClicked = [];
        this.tiles = [];
        this.score = 0;
        this.clickMode = true;
        this.pairs = 0;

        //clearing boardGame
        this.boardGame = document.querySelector('.game-board');
        this.boardGame.innerHTML = '';

        //clearing score
        this.divScore = document.querySelector('.game-score');
        this.divScore.innerHTML = '';

        //array of tile pairs
        for (let i = 0; i < this.tileAmount; i++) {
            this.tiles.push(Math.floor(i / 2));
        }

        // swapping array
        for (let i = this.tileAmount - 1; i > 0; i--) {
            const change = Math.floor(Math.random() * i);
            const x = this.tiles[i];
            this.tiles[i] = this.tiles[change];
            this.tiles[change] = x;
        }

        //putting tiles on board
        for (let i = 0; i < this.tileAmount; i++) {
            const tile = document.createElement('div');
            tile.classList.add('game-tile');
            this.boardGame.appendChild(tile);

            tile.dataset.cardType = this.tiles[i];
            tile.dataset.index = i;

            tile.style.left = 5 + (tile.offsetWidth + 5) * (i % this.tileInRow) + 'px';
            tile.style.top = 5 + (tile.offsetHeight + 5) * (Math.floor(i / this.tileInRow)) + 'px';

            tile.addEventListener('click', this.clickTile.bind(this));
        }
    },
}

document.addEventListener('DOMContentLoaded', function () {
    document.querySelector('.game-start').addEventListener('click', function () {
        memoGame.startGame();
    });
});
