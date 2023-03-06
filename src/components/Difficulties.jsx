import { DIFFICULTY } from '../constants';

export function Difficulties({ updateDifficulty }) {
  return (
    <div className="difficulties">
      <button type="button" onClick={() => updateDifficulty(DIFFICULTY.NONE)}>
        2 Player
      </button>
      <button type="button" onClick={() => updateDifficulty(DIFFICULTY.EASY)}>
        Easy
      </button>
      <button type="button" onClick={() => updateDifficulty(DIFFICULTY.MEDIUM)}>
        Agent
      </button>
      <button type="button" onClick={() => updateDifficulty(DIFFICULTY.HARD)}>
        Perceptron
      </button>
    </div>
  );
}
