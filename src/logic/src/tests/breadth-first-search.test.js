import { Board, Maps } from '@klotski/models';
import Klotski, { methods } from '../klotski';

it('Game is solved using breadth first method.', async () => {
  const game = new Klotski();
  const map = new Maps.Default();
  const board = new Board(map);
  // verify game solving condition
  expect(game.solved).toBe(false);

  // solve game
  game.solve(board, methods.breadthFirst);

  // verify
  expect(game.solved).toBe(true);
});
