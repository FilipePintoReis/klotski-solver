import { Board, Maps } from '@klotski/models';
import Klotski, { methods } from '../klotski';

describe('tests klotski game', () => {
  it('game was created', () => {
    const game = new Klotski();

    // verify game start condition
    expect(game).toEqual({
      moves: 0,
      plays: null,
      solved: false,
      ended: false,
    });
  });

  it('DFS', () => {
    const game = new Klotski();
    const map = new Maps.Easy2();
    const board = new Board(map);
    // verify game solving condition
    expect(game.solved).toBe(false);

    // solve game
    game.solve(board, methods.depthFirst);

    // verify
    if (game.solved) console.log('Depth first search worked. Number of steps: ', game.plays.length);
    expect(game.solved).toBe(true);
  });

  it('DFSL', () => {
    const game = new Klotski();
    const map = new Maps.Easy2();
    const board = new Board(map);

    // verify game solving condition
    expect(game.solved).toBe(false);

    // solve game
    game.solve(board, methods.depthLimitedSearch);
    // verify
    if (game.solved) console.log('Depth first search limited worked. Number of steps: ', game.plays.length);
    expect(game.solved).toBe(true);
  });

  it('IDDFS', () => {
    const game = new Klotski();
    const map = new Maps.Easy2();
    const board = new Board(map);
    // verify game solving condition
    expect(game.solved).toBe(false);

    // solve game
    game.solve(board, methods.iterativeDeepening);
    // verify
    if (game.solved) {
      console.log(
        'Iterative Deepening Depth first search worked. Number of steps: ',
        game.plays.length,
      );
    }
    expect(game.solved).toBe(true);
  });

  it('Greedy', () => {
    const game = new Klotski();
    const map = new Maps.Easy2();
    const board = new Board(map);
    // verify game solving condition
    expect(game.solved).toBe(false);

    // solve game
    game.solve(board, methods.greedySearch);
    // verify
    if (game.solved) console.log('Greedy search worked. Number of steps: ', game.plays.length);
    expect(game.solved).toBe(true);
  });
});
