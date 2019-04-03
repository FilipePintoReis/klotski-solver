import Piece from '../piece';
import KlotskiMap from './map';

const generatePieces = () => {
  const pieces = [];
  // 0 row
  pieces.push(new Piece(1, 3, 2, 2));
  pieces.push(new Piece(0, 0, 1, 1));
  pieces.push(new Piece(0, 1, 1, 1));
  return pieces;
};

class GameOverMap extends KlotskiMap {
  constructor() {
    // create default blocks
    super(generatePieces());
  }
}

export default GameOverMap;