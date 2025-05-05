type BoardState = (string | null)[][];

/**
 * Checks if there is a winner on the board.
 *
 * @param board The game board, represented as a 2D array of strings ('X', 'O', or null).
 * @returns The winning player ('X' or 'O') if there is a winner, or null if there is no winner.
 * Returns null and logs an error if the board is not a 3x3 array.
 */
const checkWin = (board: BoardState): 'X' | 'O' | null => {
  if (!Array.isArray(board) || board.length !== 3 || !board.every(row => Array.isArray(row) && row.length === 3)) {
    console.error('Invalid board: Board must be a 3x3 array.');
    return null;
  }

  if (!board.every(row => row.every(cell => cell === 'X' || cell === 'O' || cell === null))) {
    console.error('Invalid board: Board elements must be \'X\', \'O\', or null.');
    return null;
  }

  const lines = [
    [[0, 0], [0, 1], [0, 2]],
    [[1, 0], [1, 1], [1, 2]],
    [[2, 0], [2, 1], [2, 2]],
    [[0, 0], [1, 0], [2, 0]],
    [[0, 1], [1, 1], [2, 1]],
    [[0, 2], [1, 2], [2, 2]],
    [[0, 0], [1, 1], [2, 2]],
    [[0, 2], [1, 1], [2, 0]],
  ];

  for (const line of lines) {
    const [a, b, c] = line;
    const [rowA, colA] = a;
    const [rowB, colB] = b;
    const [rowC, colC] = c;

    if (board[rowA][colA] && board[rowA][colA] === board[rowB][colB] && board[rowA][colA] === board[rowC][colC]) {
      return board[rowA][colA];
    }
  }

  return null;
};

/**
 * Checks if a move is valid on the board.
 *
 * @param board The game board, represented as a 2D array of strings ('X', 'O', or null).
 * @param row The row index of the move.
 * @param col The column index of the move.
 * @returns True if the move is valid, false otherwise.
 */
const isValidMove = (board: BoardState, row: number, col: number): boolean => {
  if (!Number.isInteger(row) || !Number.isInteger(col)) {
    console.error('Invalid row or col: Row and col must be integers.');
    return false;
  }

  if (row < 0 || row >= 3 || col < 0 || col >= 3) {
    return false;
  }

  if (!Array.isArray(board) || board.length !== 3 || !board.every(row => Array.isArray(row) && row.length === 3)) {
    console.error('Invalid board: Board must be a 3x3 array.');
    return false;
  }
  if (board[row][col] === null) {
    return true;
  }

  return false;
};

export { checkWin, isValidMove };