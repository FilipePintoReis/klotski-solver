import { Board, Piece, Queue, NodeClass, LowestPriorityQueue } from '@klotski/models';
import removeDuplicates from './removeDuplicates';

import { comparePieces, compareBoards } from './utils';

export const methods = {
  breadthFirst: 'breadth-first',
  depthFirstSearch: 'depth-first-search',
  depthLimitedSearch: 'depth-limited-search',
  iterativeDeepening: 'iterative-deepening',
  greedySearch: 'greedy-search',
  aStar: 'aStar',
};

/**
 * Creates a piece in a new position
 * @param {Piece} piece Piece to be moved
 * @param {number} deltaX DeltaX position, default 0
 * @param {number} deltaY DeltaY position, default 0
 * @returns Piece in new position
 */
const createPiece = (piece, deltaX = 0, deltaY = 0) => new Piece(piece.x1 + deltaX, piece.y1 + deltaY, piece.width, piece.height, piece.color);

/**
 * Clones the game board
 * @param {Board} board - Board object.
 * @param {Board} newBoard - Board object clone.
 */
export const cloneBoard = (board, newBoard) => {
  newBoard.height = board.height;
  newBoard.width = board.width;
  // Iterate through the pieces and clone board into newBoard
  board.pieces.forEach((pieceInPreviousBoard) => {
    newBoard.pieces.push(createPiece(pieceInPreviousBoard));
  });
};

export const cloneArrayOfBoards = (array1, array2) => {
  array1.forEach((board) => {
    const newBoard = new Board(null);
    cloneBoard(board, newBoard);
    array2.push(newBoard);
  });
};

/**
 * Moves a piece by removing it, creating a new
 * piece with the new coordinates, and pushing it onto the board
 * @param {Board} board - Board object.
 * @param {Board} piece - Piece object.
 * @param {Board} newPiece - Piece object.
 */
const movePiece = (board, piece, newPiece) => {
  // remove piece from board
  let index = -1;
  for (let i = 0; i < board.pieces.length; i += 1) {
    if (piece.isEqual(board.pieces[i])) {
      index = i;
      break;
    }
  }
  if (index > -1) {
    board.pieces.splice(index, 1);
  }
  // add new piece to board
  board.pieces.push(newPiece);
};

/**
 * Returns the direction that the main piece must follow to reach the
 * goal in the format [horizontalDirection, verticalDirection]
 * @param {Board} board - Board obj.
 */
const simpleHeuristic = (board) => {
  const mainPiece = board.findObjectivePiece();
  const x1 = mainPiece.getX();
  const y1 = mainPiece.getY();
  const xGoal = 1;
  const yGoal = 3;
  const h = Math.abs(x1 - xGoal) + Math.abs(y1 - yGoal);
  return h;
};

/**
 * Returns the direction that the main piece must follow to reach the
 * goal in the format [horizontalDirection, verticalDirection]
 * @param {Array} direction - Array with horizontal direction value and vertical direction value.
 * @param {Int} x - Main piece x coordinate.
 * @param {Int} y - Main piece y coordinate.
 */
const pathToGoal = (direction, x, y) => {
  const path = [];
  const horizontalDistance = direction[0];
  const verticalDistance = direction[1];
  let mainPieceX = x;
  let mainPieceY = y;
  const xSign = Math.sign(horizontalDistance);
  const ySign = Math.sign(verticalDistance);
  let incrementX = 1;
  let incrementY = 1;
  let i = 0;
  let j = 0;

  // If the path is moving towards the right change the reference square
  if (xSign < 0) mainPieceX = x + 1;

  // If the path is moving towards the bottom change the reference square
  if (ySign < 0) mainPieceY += 1;

  // Add vertical path to path
  for (i; i < Math.abs(verticalDistance); i += 1) {
    if (ySign !== 0) {
      incrementY = (i + 1) * -ySign;
    } else incrementY = i + 1;
    if (xSign >= 0) {
      path.push([mainPieceX, mainPieceY + incrementY], [mainPieceX + 1, mainPieceY + incrementY]);
    } else {
      path.push([mainPieceX - 1, mainPieceY + incrementY], [mainPieceX, mainPieceY + incrementY]);
    }
  }

  // Add horizontal path to path

  for (j; j < Math.abs(horizontalDistance); j += 1) {
    if (xSign !== 0) {
      incrementX = (j + 1) * -xSign;
    } else incrementX = j + 1;
    path.push(
      [mainPieceX + incrementX, mainPieceY + incrementY - 1],
      [mainPieceX + incrementX, mainPieceY + incrementY],
    );
  }
  return path;
};

export const getAllPossibleBoards = (board) => {
  const possibleBoards = [];

  board.pieces.forEach((pieceInBoard) => {
    const pieceMovement = board.canPieceMove(pieceInBoard);
    if (pieceMovement.canMove) {
      pieceMovement.moves.forEach((dir) => {
        let newPiece = null;
        const tempBoard = new Board(null);
        cloneBoard(board, tempBoard);
        switch (dir) {
          case 'left':
            newPiece = createPiece(pieceInBoard, -1, 0);
            break;
          case 'right':
            newPiece = createPiece(pieceInBoard, 1, 0);
            break;
          case 'up':
            newPiece = createPiece(pieceInBoard, 0, -1);
            break;
          case 'down':
            newPiece = createPiece(pieceInBoard, 0, +1);
            break;
          default:
            break;
        }
        if (newPiece != null) {
          movePiece(tempBoard, pieceInBoard, newPiece);
          possibleBoards.push(tempBoard);
        }
      });
    }
  });
  return possibleBoards;
};

/**
 * Adds the distance between the main piece and the goal
 * to the number of pieces between the main piece and the goal
 * @param {Board} board - Board object.
 */
const complexHeuristic = (board) => {
  const mainPiece = board.findObjectivePiece();
  const x1 = mainPiece.getX();
  const y1 = mainPiece.getY();
  const xGoal = 1;
  const yGoal = 3;
  const deltaX = x1 - xGoal;
  const deltaY = y1 - yGoal;
  const direction = [deltaX, deltaY];
  const path = pathToGoal(direction, x1, y1);
  const pathString = JSON.stringify(path);
  const distanceToGoal = simpleHeuristic(board);
  let piecesInTheWay = 0;

  board.pieces.forEach((piece) => {
    const pieceSquares = piece.getPieceSquares();
    for (let i = 0; i < pieceSquares.length; i += 1) {
      const pieceSquareString = JSON.stringify(pieceSquares[i]);
      if (pathString.includes(pieceSquareString)) {
        piecesInTheWay += 1;
        break;
      }
    }
  });
  const h = distanceToGoal + piecesInTheWay;
  return h;
};

/**
 * Compares two structs containing a board and a heuristic value by the heuristic value.
 * @param {boardsAndHeuristic} a - Struct containing a board and a heuristic value
 * @param {boardsAndHeuristic} b - Struct containing a board and a heuristic value
 */
const compareBoardsAndHeuristics = (a, b) => b.heuristic - a.heuristic;

/**
 * Represents the logic of the Klotski game
 */
class Klotski {
  constructor() {
    this.moves = 0;
    this.ended = false;
    this.solved = false;
    this.plays = null;
  }

  /**
   * Solves the puzzle using an search method.
   * @param {KlotskiMap} map - Map object.
   * @param {string} method - Klotski.methods constant.
   */
  solve(board, method) {
    switch (method) {
      case methods.breadthFirst:
        return this.breadthFirstSearch(board);
      case methods.depthFirst:
        return this.depthFirstSearch(board);
      case methods.depthLimitedSearch:
        return this.depthLimitedSearch(board, 700);
      case methods.iterativeDeepening:
        return this.iterativeDeepeningDFSL(board, 1000);
      case methods.greedySearch:
        return this.greedySearch(board);
      case methods.aStar:
        return this.aStar(board);
      default:
        return false;
    }
  }

  /**
   * Solves the puzzle using BFS.
   * @param {KlotskiMap} map  - Map object.
   */
  breadthFirstSearch(board) {
    const visited = [];
    const queue = new Queue();
    const parentNode = new NodeClass(board, [board]);
    queue.enqueue(parentNode);

    let currNode = queue.front();

    while (!queue.isEmpty() && !currNode.board.hasGameEnded()) {
      currNode = queue.dequeue();

      if (currNode.board.hasGameEnded()) {
        this.solved = true;
        this.plays = currNode.path;
        return true;
      }

      visited.push(currNode.board);
      const childBoards = getAllPossibleBoards(currNode.board);

      const childNodes = [];
      for (let i = 0; i < childBoards.length; i += 1) {
        const pathClone = [];
        cloneArrayOfBoards(currNode.path, pathClone);
        const childNode = new NodeClass(childBoards[i], pathClone);
        childNode.path.push(childBoards[i]);
        childNodes.push(childNode);
      }

      for (let i = 0; i < childNodes.length; i += 1) {
        let canAdd = true;
        for (let k = 0; k < visited.length; k += 1) {
          if (compareBoards(childNodes[i].board, visited[k])) {
            canAdd = false;
          }
        }
        if (canAdd) {
          const pathClone = [];
          const auxBoard = new Board(null);
          cloneArrayOfBoards(currNode.path, pathClone);
          cloneBoard(childNodes[i].board, auxBoard);
          const child = new NodeClass(auxBoard, pathClone);
          visited.push(auxBoard);
          child.path.push(auxBoard);
          queue.enqueue(child);
        }
      }
    }

    return false;
  }

  /**
   * Solves the puzzle using Depth-first Search.
   * @param {Board} board  - Board object.
   * @param {Board} listOfBoards  - Array that stores the board after each move.
   */
  depthFirstSearch(board) {
    // Create a Stack and add our initial node in it
    const rootNode = new NodeClass(board, [board]);
    const stack = [rootNode];

    // Mark the first node as explored
    const tempBoard = new Board(null);
    cloneBoard(board, tempBoard);
    const explored = [tempBoard];

    let currNode = new NodeClass(tempBoard, [tempBoard]);

    // We'll continue till our Stack gets empty
    while (stack.length > 0) {
      // Pop the stack and select our current node
      currNode = stack.pop();

      // Check if game is over
      if (currNode.board.hasGameEnded()) {
        this.plays = currNode.path;
        this.solved = true;
        return true;
      }

      // 1. Get all the child nodes.
      const edges = getAllPossibleBoards(currNode.board);

      // 2. Ignore already explored nodes and mark the rest as explored
      for (let i = 0; i < edges.length; i += 1) {
        let canAdd = true;
        for (let k = 0; k < explored.length; k += 1) {
          if (compareBoards(edges[i], explored[k])) {
            canAdd = false;
          }
        }
        if (canAdd) {
          const pathClone = [];
          const auxBoard = new Board(null);
          cloneArrayOfBoards(currNode.path, pathClone);
          cloneBoard(edges[i], auxBoard);
          const child = new NodeClass(auxBoard, pathClone);
          explored.push(auxBoard);
          child.path.push(auxBoard);
          stack.push(child);
        }
      }
    }
    return false;
  }

  /**
   * Solves the puzzle using Depth-first Search.
   * @param {Board} board  - Board object.
   * @param {Integer} limit  - Limit.
   */
  depthLimitedSearch(board, limit) {
    // Create a Stack and add our initial node in it
    const rootNode = new NodeClass(board, [board]);
    const stack = [rootNode];

    // Mark the first node as explored
    const tempBoard = new Board(null);
    cloneBoard(board, tempBoard);
    const explored = [tempBoard];

    let currNode = new NodeClass(tempBoard, [tempBoard]);
    let depth = 0;

    // We'll continue till our Stack gets empty
    while (stack.length > 0) {
      if (depth <= limit) {
        // Pop the stack and select our current node
        currNode = stack.pop();

        // Check if game is over
        if (currNode.board.hasGameEnded()) {
          this.plays = currNode.path;
          this.solved = true;
          return true;
        }

        // 1. Get all the child nodes.
        const edges = getAllPossibleBoards(currNode.board);

        // 2. Ignore already explored nodes and mark the rest as explored
        for (let i = 0; i < edges.length; i += 1) {
          let canAdd = true;
          for (let k = 0; k < explored.length; k += 1) {
            if (compareBoards(edges[i], explored[k])) {
              canAdd = false;
            }
          }
          if (canAdd) {
            const pathClone = [];
            const auxBoard = new Board(null);
            cloneArrayOfBoards(currNode.path, pathClone);
            cloneBoard(edges[i], auxBoard);
            const child = new NodeClass(auxBoard, pathClone);
            explored.push(auxBoard);
            child.path.push(auxBoard);
            stack.push(child);
            depth += 1;
          }
        }
      } else {
        return false;
      }
    }
    return false;
  }

  /**
   * Solves the puzzle using Depth-first Search.
   * @param {Board} board  - Board object.
   * @param {Int} maxDepth  - Max depth of the graph that DFS generates
   */
  iterativeDeepeningDFSL(board, maxDepth) {
    let limit = 0;
    for (limit; limit < maxDepth; limit += 1) {
      if (this.depthLimitedSearch(board, limit)) {
        console.log('Goal found at a depth of ', limit);
        return true;
      }
    }
    console.log('Goal not found up to a depth of ', limit);
    return false;
  }

  /**
   * Solves the puzzle using Depth-first Search.
   * @param {Board} board  - Board object.
   */
  greedySearch(board) {
    // Create a Stack and add our initial node in it
    const rootNode = new NodeClass(board, [board]);
    const stack = [rootNode];

    // Mark the first node as explored
    const tempBoard = new Board(null);
    cloneBoard(board, tempBoard);
    const explored = [tempBoard];

    let currNode = new NodeClass(tempBoard, [tempBoard]);

    // We'll continue till our Stack gets empty
    while (stack.length > 0) {
      // Pop the stack and select our current node
      currNode = stack.pop();

      // Check if game is over
      if (currNode.board.hasGameEnded()) {
        this.plays = currNode.path;
        this.solved = true;
        return true;
      }

      // 1. Get all the child nodes.
      const edges = getAllPossibleBoards(currNode.board);
      const boardsAndHeuristics = [];

      // 2. Calculate heuristic for each possible board
      edges.forEach((possibleBoard) => {
        const h = complexHeuristic(possibleBoard);
        const boardAndHeuristic = { heuristic: h, board: possibleBoard };
        boardsAndHeuristics.push(boardAndHeuristic);
      });

      // 3. Sort by heuristic
      boardsAndHeuristics.sort(compareBoardsAndHeuristics);

      // 4. Ignore already explored nodes and mark the rest as explored
      for (let i = 0; i < boardsAndHeuristics.length; i += 1) {
        let canAdd = true;
        for (let k = 0; k < explored.length; k += 1) {
          if (compareBoards(boardsAndHeuristics[i].board, explored[k])) {
            canAdd = false;
          }
        }
        if (canAdd) {
          const pathClone = [];
          const auxBoard = new Board(null);
          cloneArrayOfBoards(currNode.path, pathClone);
          cloneBoard(boardsAndHeuristics[i].board, auxBoard);
          const child = new NodeClass(auxBoard, pathClone);
          explored.push(auxBoard);
          child.path.push(auxBoard);
          stack.push(child);
        }
      }
      /* 5. Then we mark each unexplored node as explored and push it to the Stack
       (ordered by the lowest heuristic). */
    }
    return false;
  }

  aStar(board) {
    // Create a Stack and add our initial node in it
    const rootNode = new NodeClass(board, [board]);
    const rootH = complexHeuristic(board);
    const rootF = rootH + 1;
    const stack = [{ node: rootNode, heuristic: rootF }];

    // Mark the first node as explored
    const tempBoard = new Board(null);
    cloneBoard(board, tempBoard);

    let currNodeAndHeuristic = {
      node: new NodeClass(tempBoard, [tempBoard]),
      heuristic: rootF,
    };

    const explored = [currNodeAndHeuristic];

    // create function that clone boards outside loop
    const functionThatCloneBoards = pathClone => cloneArrayOfBoards(currNodeAndHeuristic.node.path, pathClone);

    // We'll continue till our Stack gets empty
    while (stack.length > 0) {
      stack.sort(compareBoardsAndHeuristics);
      // Pop the stack and select our current node
      currNodeAndHeuristic = stack.pop();

      // Check if game is over
      if (currNodeAndHeuristic.node.board.hasGameEnded()) {
        this.plays = currNodeAndHeuristic.node.path;
        this.solved = true;
        return true;
      }

      // 1. Get all the child nodes.
      const edges = getAllPossibleBoards(currNodeAndHeuristic.node.board);
      const nodesAndHeuristics = [];

      // 2. Get the heuristic of each node and group {node, heuristic_value}
      edges.forEach((possibleBoard) => {
        const pathClone = [];
        functionThatCloneBoards(pathClone);
        const node = new NodeClass(possibleBoard, pathClone);
        node.path.push(possibleBoard);
        const f = complexHeuristic(possibleBoard) + node.path.length;
        nodesAndHeuristics.push({ node, heuristic: f });
      });

      // 4. Sort by heuristic
      nodesAndHeuristics.sort(compareBoardsAndHeuristics);

      for (let i = 0; i < nodesAndHeuristics.length; i += 1) {
        let canAdd = true;
        for (let k = 0; k < explored.length; k += 1) {
          if (compareBoards(nodesAndHeuristics[i].node.board, explored[k].node.board)) {
            if (!(nodesAndHeuristics[i].node.path.length < explored[k].node.path.length)) {
              canAdd = false;
            }
          }
        }
        if (canAdd) {
          stack.push(nodesAndHeuristics[i]);
          explored.push(nodesAndHeuristics[i]);
        }
      }
    }
    return false;
  }
}
export default Klotski;
