import { Board, Maps } from '@klotski/models';

/* creates the maps */

/**
 * Creates an easy board.
 */

const createEasyBoard = () => new Board(new Maps.MoveRightToGameOver());

const createTestBoard = () => new Board(new Maps.TestMap());

const create21Board = () => new Board(new Maps.Easy21());

export { createEasyBoard, createTestBoard, create21Board };
