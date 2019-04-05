import Piece from "../piece";
import KlotskiMap from "./map";

const generatePieces = () => {
  const pieces = [];
  // 0 row
  pieces.push(new Piece(0, 0, 2, 2, "red"));
  pieces.push(new Piece(0, 2, 1, 1));
  pieces.push(new Piece(1, 2, 1, 1));
  pieces.push(new Piece(2, 2, 1, 1));

  return pieces;
};

class TestMap2 extends KlotskiMap {
  constructor() {
    // create default blocks
    super(generatePieces());
  }
}

export default TestMap2;
