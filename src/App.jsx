import { useEffect, useState } from 'react';

import { Cell } from './components/Cell';

import { TURNS, DIFFICULTY } from './constants';
import { checkEndGame, verifyWinner } from './utils';
import { easyGame, mediumGame, hardGame } from './logic';

import './App.css';
import { Difficulties } from './components/Difficulties';

function App() {
  const [machineDifficulty, setMachineDifficulty] = useState(DIFFICULTY.NONE);
  const [turn, setTurn] = useState(TURNS.X);
  const [board, setBoard] = useState(Array(9).fill(null));
  const [winner, setWinner] = useState(null);

  const updateBoard = (index) => {
    if (board[index] || winner) return;

    const newBoard = [...board];
    newBoard[index] = turn;
    setBoard(newBoard);

    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X;
    setTurn(newTurn);

    const newWinner = verifyWinner(newBoard);
    if (newWinner) {
      setWinner(newWinner);
    } else if (checkEndGame(newBoard)) {
      setWinner(false);
    }
  };

  const restartGame = () => {
    setTurn(TURNS.X);
    setBoard(Array(9).fill(null));
    setWinner(null);
  };

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
      const index = mediumGame(board);
      updateBoard(index);
    }

    if (machineDifficulty === DIFFICULTY.HARD) {
      const index = hardGame(board);
      updateBoard(index);
    }
  }, [machineDifficulty, turn]);

  const updateDifficulty = (difficulty) => {
    restartGame();
    setMachineDifficulty(difficulty);
  };

  return (
    <div className="main">
      <h1 className="title">Tic Tac Toe</h1>

      <Difficulties updateDifficulty={updateDifficulty} />

      <button type="button" onClick={restartGame}>
        Restart
      </button>
      <br />

      <div className="board">
        {board.map((cell, rowIndex) => (
          <Cell key={rowIndex} index={rowIndex} updateBoard={updateBoard}>
            {cell}
          </Cell>
        ))}
      </div>
      {machineDifficulty === DIFFICULTY.NONE && (
        <h2 className="turn">{turn === TURNS.X ? 'X' : 'O'} turn</h2>
      )}

      {winner !== null && (
        <div className="winner">
          <h1 className="title">
            {winner === false ? 'Empate' : `Winner ${winner}`}
          </h1>
        </div>
      )}
    </div>
  );
}

export default App;
