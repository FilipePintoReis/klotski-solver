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

  it('Game is solved using depth first search method.', () => {
    const game = new Klotski();
    const map = new Maps.TestMap();
    const board = new Board(map);
    // verify game solving condition
    expect(game.solved).toBe(false);

    // solve game
    game.solve(board, methods.depthFirst);

    // verify
    expect(game.solved).toBe(true);
  });

  it('Game is solved using depth first search limited method.', () => {
    const game = new Klotski();
    const map = new Maps.TestMap();
    const board = new Board(map);

    // verify game solving condition
    expect(game.solved).toBe(false);

    // solve game
    game.solve(board, methods.depthLimitedSearch);
    console.log(JSON.stringify(game.plays));
    // verify
    expect(game.solved).toBe(false);
  });

  it('Game is solved using iterative depth first search method.', () => {
    const game = new Klotski();
    const map = new Maps.TestMap();
    const board = new Board(map);
    // verify game solving condition
    expect(game.solved).toBe(false);
    console.log(JSON.stringify(game.plays));

    // solve game
    game.solve(board, methods.iterativeDeepening);
    // verify
    expect(game.solved).toBe(true);
  });

  it('Game is solved using greedy search and simple heuristic.', () => {
    const game = new Klotski();
    const map = new Maps.Easy21();
    const board = new Board(map);
    // verify game solving condition
    expect(game.solved).toBe(false);

    // solve game
    game.solve(board, methods.greedySearch);
    console.log(JSON.stringify(game.plays));
    // verify
    expect(game.solved).toBe(true);
  });
});
