import { TURNS } from './constants';
import { checkEndGame, verifyWinner } from './utils';

const getPosibleMoves = (board) =>
  board.reduce((acc, curr, index) => {
    if (curr === null) {
      acc.push(index);
    }
    return acc;
  }, []);

export function easyGame() {
  const random = Math.floor(Math.random() * 9);
  return random;
}

// Intelligent Agent
let boardCases = {};

const minimax = (board, depth, isMaximizing) => {
  if (boardCases[board]) {
    return boardCases[board];
  }

  const winner = verifyWinner(board);

  if (winner === TURNS.X) return -1;
  if (winner === TURNS.O) return 1;
  if (checkEndGame(board)) return 0;

  const moves = getPosibleMoves(board);

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

    const random = Math.floor(Math.random() * bestMoves.length);
    return bestMoves[random];
  }

  boardCases[board] = bestResult;

  return bestResult;
};

export function mediumGame(board) {
  const boardCloned = [...board];

  const result = minimax(boardCloned, 0, true);
  boardCases = {};
  return result;
}

// Perceptron
const weights = Array(9)
  .fill(0)
  .map(() => Math.random() * 2 - 1);
const learningRate = 0.1;

function boardToWeights(board) {
  return board.map((curr) => {
    if (curr === TURNS.X) return -1;
    if (curr === TURNS.O) return 1;
    return 0;
  });
}

// Heaviside step function
function activationFunction(value) {
  return value > 0.5 ? 1 : 0;
}

function calculateOutput(board) {
  let sum = 0;
  weights.forEach((weight, index) => {
    sum += weight * board[index];
  });

  return activationFunction(sum);
}

const ITERATIONS = 10000;

function trainPerceptron(boards) {
  for (let i = 0; i < ITERATIONS; i++) {
    const index = Math.floor(Math.random() * boards.length);
    const board = boardToWeights(boards[index].input);
    const move = boards[index].output;

    const output = calculateOutput(board);

    const error = move - output;

    board.forEach((_, index) => {
      weights[index] += learningRate * error * board[index];
    });
  }
}

trainPerceptron([
  {
    input: [TURNS.X, TURNS.O, TURNS.X, null, null, null, null, null, null],
    output: 4
  },
  {
    input: [TURNS.X, null, null, TURNS.O, TURNS.X, null, null, null, TURNS.O],
    output: 7
  },
  {
    input: [null, null, null, TURNS.X, TURNS.O, TURNS.X, TURNS.O, null, null],
    output: 7
  },
  {
    input: [
      TURNS.O,
      TURNS.X,
      TURNS.X,
      TURNS.X,
      null,
      TURNS.O,
      null,
      null,
      null
    ],
    output: 8
  },
  {
    input: [TURNS.O, TURNS.O, null, null, TURNS.X, null, TURNS.X, null, null],
    output: 6
  },
  {
    input: [TURNS.X, TURNS.O, TURNS.X, null, TURNS.O, null, null, null, null],
    output: 4
  },
  {
    input: [null, null, TURNS.O, null, TURNS.X, null, null, null, null],
    output: 0
  },
  {
    input: [
      TURNS.X,
      TURNS.O,
      null,
      TURNS.X,
      TURNS.O,
      TURNS.X,
      null,
      null,
      null
    ],
    output: 6
  },
  {
    input: [
      TURNS.O,
      TURNS.X,
      TURNS.O,
      null,
      null,
      null,
      TURNS.X,
      TURNS.X,
      null
    ],
    output: 8
  },
  {
    input: [null, null, null, TURNS.X, TURNS.X, null, TURNS.O, null, TURNS.O],
    output: 1
  },
  {
    input: [TURNS.O, TURNS.X, null, TURNS.O, null, null, null, null, null],
    output: 5
  },
  {
    input: [null, TURNS.X, null, TURNS.O, null, null, null, null, null],
    output: 4
  },
  {
    input: [TURNS.X, null, null, TURNS.O, TURNS.O, TURNS.X, null, null, null],
    output: 2
  },
  {
    input: [TURNS.X, TURNS.O, null, null, TURNS.X, null, null, null, TURNS.O],
    output: 6
  },
  {
    input: [TURNS.X, TURNS.O, TURNS.O, null, null, null, TURNS.X, null, null],
    output: 7
  }
]);

export function hardGame(board) {
  const features = boardToWeights(board);
  let bestMove = null;
  let bestValue = -Infinity;

  for (let i = 0; i < features.length; i++) {
    if (board[i] !== null) continue;
    const auxBoard = [...features];
    auxBoard[i] = 1;
    const score = calculateOutput(auxBoard);
    auxBoard[i] = 0;

    if (score > bestValue) {
      bestValue = score;
      bestMove = i;
    }
  }

  return bestMove;
}
