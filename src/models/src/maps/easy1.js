import Piece from '../piece';
import KlotskiMap from './map';

const generatePieces = () => {
  const pieces = [];
  // 0 row

  const mainPiece = new Piece(0, 0, 2, 2);
  mainPiece.changeColorTo('red');
  pieces.push(mainPiece);
  return pieces;
};

class Easy1 extends KlotskiMap {
  constructor() {
    // create default blocks
    super(generatePieces());
  }
}

export default Easy1;
