/**
 * Represents a piece in the map
 */

class Piece {
  /**
   *
   * @param {number} x top left corner x position
   * @param {number} y top left corner y position
   * @param {number} width block width
   * @param {number} height block height
   */
  constructor(x, y, width, height) {
    this.x1 = x;
    this.y1 = y;
    this.width = width;
    this.height = height;
    this.color = 'blue';
  }

  changeColorTo(color) {
    this.color = color;
  }

  // Getters
  getX() {
    return this.x1;
  }

  getY() {
    return this.y1;
  }

  getWidth() {
    return this.width;
  }

  getHeight() {
    return this.height;
  }

  isEqual(otherPiece) {
    return (
      this.x1 == otherPiece.getX()
      && this.y1 == otherPiece.getY()
      && this.width == otherPiece.getWidth()
      && this.height == otherPiece.getHeight()
    );
  }
  // Return the coordinate span of each edge of the piece

  leftEdge() {
    const span = [];
    const newX = this.x1;
    const newY = this.y1 + this.height;
    for (let i = this.y1; i < newY; i += 1) {
      span.push([newX, i]);
    }
    return span;
  }

  upEdge() {
    const span = [];
    const newX = this.x1 + this.width;
    const newY = this.y1;
    for (let i = this.x1; i < newX; i += 1) {
      span.push([i, newY]);
    }
    return span;
  }

  downEdge() {
    const span = [];
    const newX = this.x1 + this.width;
    const newY = this.y1 + this.height - 1;
    for (let i = this.x1; i < newX; i += 1) {
      span.push([i, newY]);
    }
    return span;
  }

  rightEdge() {
    const span = [];
    const newX = this.x1 + this.width - 1;
    const newY = this.y1 + this.height;
    for (let i = this.y1; i < newY; i += 1) {
      span.push([newX, i]);
    }
    return span;
  }

  movePieceRight() {
    this.x1 += 1;
  }

  movePieceLeft() {
    this.x1 -= 1;
  }

  movePieceDown() {
    this.y1 += 1;
  }

  movePieceUp() {
    this.y1 -= 1;
  }

  getPieceSquares() {
    const ret = [];
    for (let i = 0; i < this.width; i += 1) {
      for (let k = 0; k < this.height; k += 1) {
        ret.push([this.x1 + i, this.y1 + k]);
      }
    }
    return ret;
  }
}

export default Piece;
