import { Board, Maps } from '@klotski/models';
import Klotski, { methods } from '../klotski';

it('A*', async () => {
  const game = new Klotski();
  const map = new Maps.Easy2();
  const board = new Board(map);
  // verify game solving condition
  expect(game.solved).toBe(false);

  // solve game
  game.solve(board, methods.aStar);

  // verify
  if (game.solved) console.log('A* search worked. Number of steps: ', game.plays.length);

  expect(game.solved).toBe(true);
});
