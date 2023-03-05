export function Cell({ index, updateBoard, children }) {
  const handleClick = () => {
    updateBoard(index);
  };

  return (
    <button type="button" onClick={handleClick} className="cell">
      {children}
    </button>
  );
}
