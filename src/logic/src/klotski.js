import {
  Board, Piece, Queue, NodeClass,
} from '@klotski/models';

export const methods = {
  breadthFirst: 'breadth-first',
  depthFirst: 'depth-first',
  depthFirstLimited: 'depth-first-limited',
  iterativeDeepening: 'iterative-deepening',
  greedySearch: 'greedy-search',
};

/**
 * Clones the game board
 * @param {Board} board - Board object.
 * @param {Board} newBoard - Board object clone.
 */
const cloneBoard = (board, newBoard) => {
  // Iterate through the pieces and clone board into newBoard
  board.pieces.forEach((pieceInPreviousBoard) => {
    const piece = new Piece(
      pieceInPreviousBoard.x1,
      pieceInPreviousBoard.y1,
      pieceInPreviousBoard.width,
      pieceInPreviousBoard.height,
    );
    newBoard.pieces.push(piece);
  });
};

/**
 * Creates a new piece with the coordinates of piece
 * and moves it left
 * @param {Piece} piece - Piece object to be moved.
 */
const createLeftPiece = (piece) => {
  const newPiece = new Piece(piece.x1 - 1, piece.y1, piece.width, piece.height);
  return newPiece;
};

/**
 * Creates a new piece with the coordinates of piece
 * and moves it right
 * @param {Piece} piece - Piece object to be moved.
 */
const createRightPiece = (piece) => {
  const newPiece = new Piece(piece.x1 + 1, piece.y1, piece.width, piece.height);
  return newPiece;
};

/**
 * Creates a new piece with the coordinates of piece
 * and moves it up
 * @param {Piece} piece - Piece object to be moved.
 */
const createUpPiece = (piece) => {
  const newPiece = new Piece(piece.x1, piece.y1 - 1, piece.width, piece.height);
  return newPiece;
};

/**
 * Creates a new piece with the coordinates of piece
 * and moves it down
 * @param {Piece} piece - Piece object to be moved.
 */
const createDownPiece = (piece) => {
  const newPiece = new Piece(piece.x1, piece.y1 + 1, piece.width, piece.height);
  return newPiece;
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
    if (ySign != 0) {
      incrementY = (i + 1) * -ySign;
    } else incrementY = i + 1;
    if (xSign >= 0) path.push([mainPieceX, mainPieceY + incrementY], [mainPieceX + 1, mainPieceY + incrementY]);
    else path.push([mainPieceX - 1, mainPieceY + incrementY], [mainPieceX, mainPieceY + incrementY]);
  }
  // Add horizontal path to path

  for (j; j < Math.abs(horizontalDistance); j += 1) {
    if (xSign != 0) {
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
  const totalPossibleBoards = [];
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
            newPiece = createLeftPiece(pieceInBoard);
            break;
          case 'right':
            newPiece = createRightPiece(pieceInBoard);
            break;
          case 'up':
            newPiece = createUpPiece(pieceInBoard);
            break;
          case 'down':
            newPiece = createDownPiece(pieceInBoard);
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
const compareBoardsAndHeuristics = (a, b) => a.heuristic - b.heuristic;

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
    const listOfPlays = [];
    switch (method) {
      case methods.breadthFirst:
        return this.breadthFirstSearch(board);
      case methods.depthFirst:
        return this.depthFirstSearch(board, []);
      case methods.depthFirstLimited:
        return this.depthFirstSearchLimited(board, [], 500);
      case methods.iterativeDeepening:
        return this.iterativeDeepeningDFSL(board, 5, []);
      case methods.greedySearch:
        return this.greedySearch(board, []);
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
    console.log(queue);

    while (!queue.isEmpty() && currNode.board.hasGameEnded()) {
      currNode = queue.dequeue();
      console.log(currNode);
      if (currNode.board.hasGameEnded()) {
        this.solved = true;
        this.plays = currNode.path;
        console.log('aa');
        console.log(currNode.path);
        return true;
      }

      visited.push(currNode.board);
      const childBoards = getAllPossibleBoards(currNode.board);

      const childNodes = [];
      for (let i = 0; i < childBoards.length; i += 1) {
        const childNode = new NodeClass(childBoards[i], currNode.path);
        childNode.path.push(childBoards[i]);
        childNodes.push(childNode);
      }

      for (let i = 0; i < childNodes.length; i += 1) {
        if (!visited.includes(childNodes[i])) {
          queue.enqueue(childNodes[i]);
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
  depthFirstSearch(board, listOfBoards) {
    let result = false;
    // Check if game is over
    if (board.hasGameEnded()) {
      this.solved = true;
      return true;
    }

    const possibleBoards = getAllPossibleBoards(board);

    possibleBoards.forEach((possibleBoard) => {
      if (result === true) return;
      if (!listOfBoards.includes(possibleBoard)) {
        const newBoard = new Board(null);

        cloneBoard(board, newBoard);

        listOfBoards.push(possibleBoard);
        result = this.depthFirstSearch(possibleBoard, listOfBoards);
      }
    });
    return result;
  }

  /**
   * Solves the puzzle using Depth-first Search.
   * @param {Board} board  - Board object.
   * @param {Int} limit  - Limit which will increase up to a maximum value (max_depth)
   * @param {Board} listOfBoards  - Array that stores the board after each move.
   */
  depthFirstSearchLimited(board, limit, listOfBoards) {
    let result = false;
    // Check if game is over
    if (board.hasGameEnded()) {
      this.solved = true;
      return true;
    }

    // Check if reached max_depth
    if (limit <= 0) {
      // reached max_depth
      return false;
    }
    const possibleBoards = getAllPossibleBoards(board);
    possibleBoards.forEach((possibleBoard) => {
      if (result === true) return;
      if (!listOfBoards.includes(possibleBoard)) {
        const newBoard = new Board(null);

        cloneBoard(board, newBoard);

        listOfBoards.push(possibleBoard);
        result = this.depthFirstSearchLimited(possibleBoard, limit - 1, listOfBoards);
      }
    });
    return result;
  }

  /**
   * Solves the puzzle using Depth-first Search.
   * @param {Board} board  - Board object.
   * @param {Int} maxDepth  - Max depth of the graph that DFS generates
   */
  iterativeDeepeningDFSL(board, maxDepth) {
    for (let limit = 0; limit < maxDepth; limit += 1) {
      if (this.depthFirstSearchLimited(board, limit, [])) return true;
    }
    return false;
  }

  /**
   * Solves the puzzle using Depth-first Search.
   * @param {Board} board  - Board object.
   * @param {Array} listOfBoards  - Array that stores the board after each move.
   */
  greedySearch(board, listOfBoards) {
    let result = false;
    listOfBoards.push(board);

    // Check if game is over
    if (board.hasGameEnded()) {
      this.solved = true;
      this.ended = true;
      this.plays = listOfBoards;
      return true;
    }

    const possibleBoards = getAllPossibleBoards(board);
    const boardsAndHeuristics = [];

    // Recursively call the algorithm with each board, starting on the one with the lowest h value
    possibleBoards.forEach((possibleBoard) => {
      const h = simpleHeuristic(possibleBoard);
      const boardAndHeuristic = { heuristic: h, board: possibleBoard };
      boardsAndHeuristics.push(boardAndHeuristic);
    });

    boardsAndHeuristics.sort(compareBoardsAndHeuristics);
    boardsAndHeuristics.forEach((boardAndH) => {
      if (result === true) return;

      if (!listOfBoards.includes(boardAndH.board)) {
        const newBoard = new Board(null);

        cloneBoard(board, newBoard);
        result = this.greedySearch(boardAndH.board, listOfBoards);
      }
    });

    return result;
  }
}

export default Klotski;
