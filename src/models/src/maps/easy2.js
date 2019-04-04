import Piece from '../piece';
import KlotskiMap from './map';

const generatePieces = () => {
  const pieces = [];
  // 0 row
  const mainPiece = new Piece(1, 0, 2, 2, 'red');
  pieces.push(mainPiece);

  return pieces;
};

class Easy2 extends KlotskiMap {
  constructor() {
    // create default blocks
    super(generatePieces());
  }
}

export default Easy2;
