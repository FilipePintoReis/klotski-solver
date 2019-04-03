import Piece from '../piece';
import KlotskiMap from './map';

const generatePieces = () => {
  const pieces = [];
  // 0 row
  pieces.push(new Piece(0, 1, 2, 2, 'red'));
  pieces.push(new Piece(0, 2, 1, 2));
  pieces.push(new Piece(2, 2, 1, 1));

  return pieces;
};

class Easy1 extends KlotskiMap {
  constructor() {
    // create default blocks
    super(generatePieces());
  }
}

export default Easy1;
