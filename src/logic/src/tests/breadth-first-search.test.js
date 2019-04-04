import { Board, Maps } from '@klotski/models';
import Klotski, { methods } from '../klotski';

it('BFS', async () => {
  const game = new Klotski();
  const map = new Maps.Easy2();
  const board = new Board(map);
  // verify game solving condition
  expect(game.solved).toBe(false);

  // solve game
  game.solve(board, methods.breadthFirst);

  // verify  if (game.solved)
  console.log('Breadth first search worked. Number of steps: ', game.plays.length);
  expect(game.solved).toBe(true);
});
