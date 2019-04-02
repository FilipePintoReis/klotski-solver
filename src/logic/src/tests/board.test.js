import { Board, Maps, Piece } from '@klotski/models';

describe('Test the board logic', () => {
  it('piece can move down empty', () => {
    const board = new Board(new Maps.Default());

    const movingPiece = board.pieces[4];

    const value = board.canPieceMoveDir(movingPiece, 'down');

    // verify if piece can move to a empty position
    expect(value).toBe(true);
  });

  it('piece cant move up not empty', () => {
    const board = new Board(new Maps.Default());

    const movingPiece = board.pieces[4];

    // TODO: verify if piece can move to a not empty position

    const val = board.canPieceMoveDir(movingPiece, 'up');

    expect(val).toBe(false);
  });

  it('piece can move left empty', () => {
    const board = new Board(new Maps.Default1());

    const movingPiece = board.pieces[8];

    const value = board.canPieceMoveDir(movingPiece, 'left');

    // verify if piece can move to a empty position
    expect(value).toBe(true);
  });

  it('piece can move left empty', () => {
    const board = new Board(new Maps.Default1());

    const movingPiece = board.pieces[8];

    const value = board.canPieceMoveDir(movingPiece, 'left');

    // verify if piece can move to a empty position
    expect(value).toBe(true);
  });

  it('piece cant move out of bounds to the right', () => {
    const board = new Board(new Maps.Default1());

    const movingPiece = board.pieces[8];

    const value = board.canPieceMoveDir(movingPiece, 'right');

    // verify if piece can move to a empty position
    expect(value).toBe(false);
  });

  it('piece cant move out of bounds, down', () => {
    const board = new Board(new Maps.Default1());

    const movingPiece = board.pieces[9];

    const value = board.canPieceMoveDir(movingPiece, 'down');

    // verify if piece can move to a empty position
    expect(value).toBe(false);
  });

  it('piece cant move out of bounds, left', () => {
    const board = new Board(new Maps.Default1());

    const movingPiece = board.pieces[0];

    const value = board.canPieceMoveDir(movingPiece, 'left');

    // verify if piece can move to a empty position
    expect(value).toBe(false);
  });

  it('piece cant move out of bounds, up', () => {
    const board = new Board(new Maps.Default1());

    const movingPiece = board.pieces[0];

    const value = board.canPieceMoveDir(movingPiece, 'up');

    // verify if piece can move to a empty position
    expect(value).toBe(false);
  });

  it('piece[4] cant move out of right', () => {
    const board = new Board(new Maps.Default());

    const movingPiece = board.pieces[4];

    const value = board.canPieceMoveDir(movingPiece, 'right');

    // verify if piece can move to a empty position
    expect(value).toBe(false);
  });

  it('piece cant move', () => {
    const board = new Board(new Maps.Default1());

    const movingPiece = board.pieces[0];

    const value = board.canPieceMove(movingPiece);

    // verify if piece can move to a empty position
    expect(value).toEqual({ canMove: false, moves: [] });
  });

  it('piece can move', () => {
    const board = new Board(new Maps.Default());

    const movingPiece = board.pieces[4];

    const value = board.canPieceMove(movingPiece);

    // verify if piece can move to a empty position
    expect(value).toEqual({
      canMove: true,
      moves: ['down'],
    });
  });

  it('game has ended', () => {
    const board = new Board(new Maps.GameOverMap());

    const movingPiece = board.pieces[0];

    const value = board.hasGameEnded();

    // verify if piece can move to a empty position
    expect(value).toBe(true);
  });

  it('game hasnt ended in Default', () => {
    const board = new Board(new Maps.Default());

    const movingPiece = board.pieces[0];

    const value = board.hasGameEnded();
    expect(value).toBe(false);
  });

  it('test game over', () => {
    const board = new Board(new Maps.MoveRightToGameOver());

    const movingPiece = board.pieces[0];

    const value = board.hasGameEnded();
    expect(value).toBe(false);

    console.log(board);

    movingPiece.movePieceRight();

    console.log(board);

    const value1 = board.hasGameEnded();

    // verify if piece can move to a empty position
    expect(value1).toEqual(true);
  });

  it('findObjectivePiece test', () => {
    const board = new Board(new Maps.Default());
    const board1 = new Board(new Maps.GameOverMap());

    const piece1 = board.findObjectivePiece();
    const piece2 = board1.findObjectivePiece();

    expect(piece1).toEqual({
      x1: 1,
      y1: 0,
      width: 2,
      height: 2,
    });

    expect(piece2).toEqual({
      x1: 1,
      y1: 3,
      width: 2,
      height: 2,
    });
  });
});
