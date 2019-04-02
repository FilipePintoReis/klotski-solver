class NodeClass {
  constructor(board, path) {
    this.board = board;
    this.path = path;
    this.visited = false;
    this.processed = false;
  }

  getBoard() {
    return this.board;
  }

  getPath() {
    return this.board;
  }

  wasVisitied() {
    return this.visited;
  }

  wasProcessed() {
    return this.processed;
  }
}

export default NodeClass;
