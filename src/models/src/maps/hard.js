import Piece from '../piece';
import KlotskiMap from './map';

const generatePieces = () => {
  const pieces = [];
  // 0 row

  const mainPiece = new Piece(1, 0, 2, 2, 'red');
  pieces.push(mainPiece);

  pieces.push(new Piece(0, 0, 1, 1));
  pieces.push(new Piece(0, 1, 1, 1));
  pieces.push(new Piece(3, 0, 1, 1));
  pieces.push(new Piece(3, 1, 1, 1));

  pieces.push(new Piece(0, 2, 1, 2));
  pieces.push(new Piece(3, 2, 1, 2));

  pieces.push(new Piece(1, 2, 1, 1));
  pieces.push(new Piece(2, 3, 1, 1));
  pieces.push(new Piece(1, 2, 1, 1));
  pieces.push(new Piece(2, 3, 1, 1));

  pieces.push(new Piece(0, 4, 1, 1));
  pieces.push(new Piece(3, 4, 1, 1));
  return pieces;
};

class Hard extends KlotskiMap {
  constructor() {
    // create default blocks
    super(generatePieces());
  }
}

export default Hard;
