export const comparePieces = (piece1, piece2) => {
  if (piece1.x1 !== piece2.x1) return false;
  if (piece1.y1 !== piece2.y1) return false;
  if (piece1.width !== piece2.width) return false;
  if (piece1.height !== piece2.height) return false;

  return true;
};

export const compareBoards = (board1, board2) => {
  if (board1.pieces.length !== board2.pieces.length) {
    return false;
  }
  for (let i = 0; i < board1.pieces.length; i += 1) {
    let foundPiece = false;
    for (let k = 0; k < board2.pieces.length; k += 1) {
      if (
        board1.pieces[i].x1 === board2.pieces[k].x1
        && board1.pieces[i].y1 === board2.pieces[k].y1
      ) {
        foundPiece = true;
        if (
          board1.pieces[i].width !== board2.pieces[k].width
          || board1.pieces[i].height !== board2.pieces[k].height
        ) {
          return false;
        }
      }
    }
    if (!foundPiece) {
      return false;
    }
  }

  return true;
};
