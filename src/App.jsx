import { useEffect, useState } from 'react'

import { Cell } from './components/Cell';

import { TURNS } from './constants';
import { checkEndGame, verifyWinner } from './utils';

import './App.css'

const DIFFICULTY = {
  NONE: 'none',
  EASY: 'easy',
  MEDIUM: 'medium',
  HARD: 'hard',
}

function easyGame() {
  const random = Math.floor(Math.random() * 9);
  return random;
}

function mediumGame() {
  console.log('medium')
}

function hardGame(board) {
  const weights = [1, 1, 1, 1, 1, 1, 1, 1, 1];

  const boardNumbers = board.map((cell) => {
    if (cell === TURNS.X) return 1;
    if (cell === TURNS.O) return -1;
    return 0;
  });

  function evaluate(board) {
    let bestMove = -1;
    let bestScore = -Infinity;

    for (let i = 0; i < board.length; i++) {
      if (board[i] === 0) {
        const tempBoard = [...board];
        tempBoard[i] = 1;
        const score = tempBoard.reduce((acc, cur, idx) => acc + cur * weights[idx], 0);

        if (score > bestScore) {
          bestScore = score;
          bestMove = i;
        }
      }
    }

    return bestMove;
  }

  console.log(boardNumbers);

  return evaluate(boardNumbers);
}

function App() {
  const [machineDifficulty, setMachineDifficulty] = useState(DIFFICULTY.HARD);
  const [turn, setTurn] = useState(TURNS.X);
  const [board, setBoard] = useState(Array(9).fill(null));
  const [winner, setWinner] = useState(null);

  useEffect(() => {
    if (machineDifficulty === DIFFICULTY.NONE) return;
    if (turn === TURNS.X) return;

    if (machineDifficulty === DIFFICULTY.EASY) {
      let machineIndex;

      do {
        machineIndex = easyGame();
      } while (board[machineIndex] !== null);

      updateBoard(machineIndex);
    }

    if (machineDifficulty === DIFFICULTY.MEDIUM) {
      mediumGame();
    }

    if (machineDifficulty === DIFFICULTY.HARD) {
      const index = hardGame(board);
      updateBoard(index);
    }

  }, [machineDifficulty, turn])

  const updateBoard = (index) => {
    if (board[index] || winner) return;

    const newBoard = [...board];
    newBoard[index] = turn;
    setBoard(newBoard);

    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X;
    setTurn(() => {
      return newTurn;
    });

    const newWinner = verifyWinner(newBoard);
    if (newWinner) {
      setWinner(newWinner);
    } else if (checkEndGame(newBoard)) {
      setWinner(false);
    }
  }

  const restartGame = () => {
    setTurn(TURNS.X);
    setBoard(Array(9).fill(null));
    setWinner(null);
  }

  return (
    <div className='main'>
      <h1 className='title'>Tic Tac Toe</h1>
      <div className="board">
        {board.map((cell, rowIndex) => (
          <Cell key={rowIndex} index={rowIndex} updateBoard={updateBoard}>
            {cell}
          </Cell>
        ))}
      </div>
      <h2 className='turn'>{turn === TURNS.X ? "X" : "O"} turn</h2>

      {
        winner !== null && (
          <div className='winner'>
            <h1 className='title'>{winner === false ? "Empate" : "Winner: " + winner}</h1>
            <button type="button" onClick={restartGame}>Restart</button>
          </div>
        )
      }
    </div>
  )
}

export default App
