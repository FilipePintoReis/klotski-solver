import { Board, Maps } from '@klotski/models';
import Klotski, { methods, cloneArrayOfBoards, cloneBoard } from './klotski';
import removeDuplicates from './removeDuplicates';
import { createTestBoard, createEasyBoard, create21Board } from './board';

/* TODO: Remove */
const testing = () => {
  const map = new Maps.TestMap();
  const map2 = new Maps.MoveRightToGameOver();

  const board = new Board(map);
  const board2 = new Board(map2);
  const boards = [board, board2];
  const test = [];

  const newBoard = new Board(null);
  cloneBoard(board, newBoard);
  cloneArrayOfBoards(boards, test);
  console.log('Boards: ', boards);
  console.log('Test: ', test);
};

testing();

/* exports */

export {
  methods, createEasyBoard, createTestBoard, create21Board,
};

export default Klotski;
