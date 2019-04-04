import Piece from '../piece';
import KlotskiMap from './map';

const generatePieces = () => {
  const pieces = [];
  // 0 row
  pieces.push(new Piece(0, 0, 1, 2));
  pieces.push(new Piece(0, 2, 1, 2));
  pieces.push(new Piece(0, 4, 1, 1));

  // 1 row
  pieces.push(new Piece(1, 0, 2, 2, 'red'));
  pieces.push(new Piece(1, 2, 2, 1));
  pieces.push(new Piece(1, 4, 2, 1));

  // 3 row
  pieces.push(new Piece(3, 0, 1, 2));
  pieces.push(new Piece(3, 2, 1, 2));
  pieces.push(new Piece(3, 4, 1, 1));

  // 4 row

  return pieces;
};

class DefaultMap extends KlotskiMap {
  constructor() {
    // create default blocks
    super(generatePieces());
  }
}

export default DefaultMap;
