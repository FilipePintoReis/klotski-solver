import { Board, Maps } from '@klotski/models';
import Klotski, { getAllPossibleBoards, methods } from './klotski';
import { createTestBoard, createEasyBoard } from './board';

/* TODO: Remove */
const testing = () => {
  const game = new Klotski();
  const map = new Maps.TestMap();
  const board = new Board(map);

  const allPossibleBoards = getAllPossibleBoards(board);
  console.log('All pieces that can move and their possible boards:', allPossibleBoards);
};

testing();

/* exports */

export { methods, createEasyBoard, createTestBoard };

export default Klotski;
