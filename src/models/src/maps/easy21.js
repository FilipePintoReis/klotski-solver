import Piece from '../piece';
import KlotskiMap from './map';

const generatePieces = () => {
  const pieces = [];
  // 0 row
  const mainPiece = new Piece(1, 0, 2, 2);
  mainPiece.changeColorTo('red');
  pieces.push(mainPiece);
  pieces.push(new Piece(0, 1, 1, 1));
  pieces.push(new Piece(0, 0, 1, 1));
  return pieces;
};

class Easy21 extends KlotskiMap {
  constructor() {
    // create default blocks
    super(generatePieces());
  }
}

export default Easy21;
