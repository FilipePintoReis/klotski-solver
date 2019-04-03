import Piece from '../piece';
import KlotskiMap from './map';

const generatePieces = () => {
  const pieces = [];
  // 0 row

  const mainPiece = new Piece(0, 1, 2, 2);
  mainPiece.changeColorTo('red');
  pieces.push(mainPiece);
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
