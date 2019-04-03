import { Piece } from '@klotski/models';
import { comparePieces } from '../utils';

describe('Test the pieces logic', () => {
  it('piece edges', () => {
    const pieceT = new Piece(1, 1, 2, 2);

    expect(pieceT.upEdge()).toEqual([[1, 1], [2, 1]]);
    expect(pieceT.downEdge()).toEqual([[1, 2], [2, 2]]);
    expect(pieceT.leftEdge()).toEqual([[1, 1], [1, 2]]);
    expect(pieceT.rightEdge()).toEqual([[2, 1], [2, 2]]);
  });

  it('piece get squares', () => {
    const piece = new Piece(1, 1, 2, 2);
    expect(piece.getPieceSquares()).toEqual([[1, 1], [1, 2], [2, 1], [2, 2]]);
  });

  it('compare pieces', () => {
    const piece1 = new Piece(1, 1, 2, 2);
    const piece2 = new Piece(1, 1, 2, 2);
    const piece3 = new Piece(1, 2, 2, 2);

    expect(comparePieces(piece1, piece2)).toEqual(true);
    expect(comparePieces(piece1, piece3)).toEqual(false);
  });
});
