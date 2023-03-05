import { WINNING_COMBINATIONS } from './constants';

export const verifyWinner = (board) => {
  for (const combination of WINNING_COMBINATIONS) {
    const [a, b, c] = combination;
    if (board[a] && board[a] === board[b] && board[a] === board[c])
      return board[a];
  }

  return null;
}

export const checkEndGame = (board) => {
  return board.every((cell) => cell !== null);
}

export const verifyCell = (board, index) => {
  return board[index] === null;
}

