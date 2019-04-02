const directions = {
  right: 'right',
  left: 'left',
  up: 'up',
  down: 'down',
};

class Board {
  /**
   * @constructor
   * @param {KlotskiMap} map - Klotski map
   */
  constructor(map) {
    this.height = 5;
    this.width = 4;
    this.pieces = [];

    if (map != null) {
      this.pieces = map.pieces;
    }
  }
  /**
   * Return the pieces that can move and in which direction
   * @param {Piece} Block
   * @return {object} {piece: piece, canMove: bool, moves: ['left', 'right]}
   */

  canPieceMove(piece) {
    let canMove = false;
    const moves = [];

    Object.keys(directions).forEach((key) => {
      if (this.canPieceMoveDir(piece, directions[key])) {
        moves.push(directions[key]);
        canMove = true;
      }
    });

    return {
      canMove,
      moves,
    };
  }

  hasCollision(temporarySides, dir) {
    let collision = false;
    let otherPieceSides;

    this.pieces.forEach((Obj) => {
      switch (dir) {
        case 'up':
          otherPieceSides = Obj.downEdge();
          break;

        case 'down':
          otherPieceSides = Obj.upEdge();
          break;

        case 'left':
          otherPieceSides = Obj.rightEdge();
          break;

        case 'right':
          otherPieceSides = Obj.leftEdge();
          break;

        default:
          break;
      }

      temporarySides.forEach(([x, y]) => {
        if (x >= this.width || y >= this.height || x < 0 || y < 0) {
          collision = true;
          return;
        }

        otherPieceSides.forEach(([x1, y1]) => {
          if (x === x1 && y === y1) {
            collision = true;
          }
        });
      });
    });

    return collision;
  }

  canPieceMoveDir(piece, dir) {
    let pieceSides;
    const temporarySides = [];

    switch (dir) {
      case directions.left:
        pieceSides = piece.leftEdge();
        pieceSides.forEach(([X, Y]) => {
          const tmpX = X - 1;
          temporarySides.push([tmpX, Y]);
        });
        break;

      case directions.right:
        pieceSides = piece.rightEdge();
        pieceSides.forEach(([X, Y]) => {
          const tmpX = X + 1;
          temporarySides.push([tmpX, Y]);
        });
        break;

      case directions.up:
        pieceSides = piece.upEdge();
        pieceSides.forEach(([X, Y]) => {
          const tmpY = Y - 1;
          temporarySides.push([X, tmpY]);
        });
        break;

      case directions.down:
        pieceSides = piece.downEdge();
        pieceSides.forEach(([X, Y]) => {
          const tmpY = Y + 1;
          temporarySides.push([X, tmpY]);
        });
        break;

      default:
        break;
    }

    return !this.hasCollision(temporarySides, dir);
  }

  hasGameEnded() {
    const piece = this.findObjectivePiece();
    if (piece.x1 === 1 && piece.y1 === 3) return true;

    return false;
  }

  findObjectivePiece() {
    let obj;
    this.pieces.forEach((S) => {
      if (S.width === 2 && S.height === 2) {
        obj = S;
      }
    });
    return obj;
  }
}
export default Board;
