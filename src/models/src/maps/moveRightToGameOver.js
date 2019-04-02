import Piece from '../piece';
import KlotskiMap from './map';

const generatePieces = () => {
  const pieces = [];
  // 0 row

  pieces.push(new Piece(0, 3, 2, 2));
  return pieces;
};

class MoveRightToGameOver extends KlotskiMap {
  constructor() {
    // create default blocks
    super(generatePieces());
  }
}

export default MoveRightToGameOver;
