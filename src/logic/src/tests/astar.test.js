import { Board, Maps } from '@klotski/models';
import Klotski, { methods } from '../klotski';

it('Game is solved using a* algorithm.', async () => {
  const game = new Klotski();
  const map = new Maps.MoveRightToGameOver();
  const board = new Board(map);
  // verify game solving condition
  expect(game.solved).toBe(false);

  // solve game
  // game.solve(board, methods.aStar);

  // verify
  expect(game.solved).toBe(true);
  console.log(JSON.stringify(game.plays));
});
