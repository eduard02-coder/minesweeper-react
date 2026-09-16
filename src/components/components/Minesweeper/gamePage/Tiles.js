class Tiles {
  static #tileArray = [];
  static #mineTiles = [];
  static #rows = 0;
  static #cols = 0;

  static #tileSurrounding(tile) {
    const length = this.#tileArray.length;
    const positionOfTile = tile.id;
    const returnVal = {
      up: null,
      upRight: null,
      right: null,
      downRight: null,
      down: null,
      downLeft: null,
      left: null,
      upLeft: null,
    };

    // --- left, right, up, down
    if (!(positionOfTile % this.#cols === 0)) {
      returnVal.left = this.#tileArray[positionOfTile - 1];
    }

    if (!((positionOfTile + 1) % this.#cols === 0)) {
      returnVal.right = this.#tileArray[positionOfTile + 1];
    }

    if (!(positionOfTile - this.#cols < 0)) {
      returnVal.up = this.#tileArray[positionOfTile - this.#cols];
    }

    if (!(positionOfTile + this.#cols > length)) {
      returnVal.down = this.#tileArray[positionOfTile + this.#cols];
    }

    // --- diagonals
    if (returnVal.up !== null) {
      if (returnVal.left !== null) {
        returnVal.upLeft = this.#tileArray[positionOfTile - this.#cols - 1];
      }

      if (returnVal.right !== null) {
        returnVal.upRight = this.#tileArray[positionOfTile - this.#cols + 1];
      }
    }

    if (returnVal.down !== null) {
      if (returnVal.left !== null) {
        returnVal.downLeft = this.#tileArray[positionOfTile + this.#cols - 1];
      }

      if (returnVal.right !== null) {
        returnVal.downRight = this.#tileArray[positionOfTile + this.#cols + 1];
      }
    }

    return Object.values(returnVal).filter((elem) => {
      if (elem) {
        return elem;
      }
    });
  }

  static #markAroundMines() {
    for (let tile of this.#mineTiles) {
      const surrounding = tile.tilesAround;

      for (let tile of surrounding) {
        if (!tile.mined) {
          tile.minesAround += 1;
        }
      }
    }
  }

  static #spreadMines(mines) {
    const shuffled = [...this.#tileArray];

    for (let i = shuffled.length - 1; i > shuffled.length - 1 - mines; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }

    this.#mineTiles = shuffled.slice(shuffled.length - mines);

    for (let tile of this.#mineTiles) {
      tile.mined = true;
    }
  }

  static create(rows, cols, mines) {
    this.#rows = rows;
    this.#cols = cols;

    const n = rows * cols;
    const tile = {
      id: 0,
      open: false,
      mined: false,
      flagged: false,
      minesAround: 0,
      tilesAround: [],
    };

    this.#tileArray = Array.from({ length: n }, () => ({
      ...tile,
    }));

    this.#tileArray.forEach((elem, index) => {
      elem.id = index;
      elem.tilesAround = this.#tileSurrounding(elem);
    });

    this.#spreadMines(mines);
    this.#markAroundMines();

    return this.#tileArray;
  }
}

export default Tiles;
