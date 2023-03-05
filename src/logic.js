import { TURNS } from './constants';
import { checkEndGame, verifyWinner } from './utils';

export function easyGame() {
  const random = Math.floor(Math.random() * 9);
  return random;
}

export function mediumGame(board) {
  const boardCloned = [...board];

  const getMoves = (board) =>
    board.reduce((acc, curr, index) => {
      if (curr === null) {
        acc.push(index);
      }
      return acc;
    }, []);

  const minimax = (board, depth, isMaximizing) => {
    const winner = verifyWinner(board);

    if (winner === TURNS.X) return -1;
    if (winner === TURNS.O) return 1;
    if (checkEndGame(board)) return 0;

    const moves = getMoves(board);

    let bestResult = isMaximizing ? -Infinity : Infinity;
    const turn = isMaximizing ? TURNS.O : TURNS.X;

    moves.forEach((move) => {
      const boardCloned = [...board];
      boardCloned[move] = turn;
      const value = minimax(boardCloned, depth + 1, !isMaximizing);

      if (isMaximizing) {
        if (value > bestResult) {
          bestResult = value;
        }
      } else if (value < bestResult) {
        bestResult = value;
      }
    });

    if (depth === 0) {
      const bestMoves = moves.filter((move) => {
        const boardCloned = [...board];
        boardCloned[move] = turn;
        const value = minimax(boardCloned, depth + 1, !isMaximizing);
        return value === bestResult;
      });

      console.log(bestMoves);

      const random = Math.floor(Math.random() * bestMoves.length);
      return bestMoves[random];
    }

    return bestResult;
  };

  const result = minimax(boardCloned, 0, true);
  return result;
}

export function hardGame(board) {
  return board;
}
