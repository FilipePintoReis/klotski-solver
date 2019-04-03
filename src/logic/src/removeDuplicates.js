const removeDuplicates = (boards) => {
  const length = boards.length;
  if (length == 0 || length == 1) return boards[length - 1];

  console.log('Boards before sort', boards);
  boards.sort((board1, board2) => JSON.stringify(board1) > JSON.stringify(board2));

  console.log('Boards before sort', boards);
  const temp = [];

  // Start traversing elements
  for (let i = 0; i < length - 1; i += 1) {
    // If current element is not equal
    // to next element then store that
    // current element
    const bool = JSON.stringify(boards[i]) !== JSON.stringify(boards[i + 1]);
    if (JSON.stringify(boards[i]) !== JSON.stringify(boards[i + 1])) {
      temp.push(boards[i]);
    }
  }
  temp.push(boards[length - 1]);
  // Modify original array
  return temp;
};

export default removeDuplicates;
