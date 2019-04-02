import Piece from '../piece';
import KlotskiMap from './map';

const generatePieces = () => {
  const pieces = [];
  // 0 row
  pieces.push(new Piece(0, 0, 1, 2));
  pieces.push(new Piece(0, 2, 1, 2));
  pieces.push(new Piece(0, 4, 1, 1));

  // 1 row
  pieces.push(new Piece(1, 0, 2, 2));
  pieces.push(new Piece(1, 2, 2, 1));
  pieces.push(new Piece(1, 4, 1, 1));

  // 2 row
  pieces.push(new Piece(2, 4, 1, 1));

  // 3 row
  pieces.push(new Piece(3, 0, 1, 2));
  pieces.push(new Piece(3, 3, 1, 1));
  pieces.push(new Piece(3, 4, 1, 1));
  return pieces;
};

class DefaultMap1 extends KlotskiMap {
  constructor() {
    // create default blocks
    super(generatePieces());
  }
}

export default DefaultMap1;
