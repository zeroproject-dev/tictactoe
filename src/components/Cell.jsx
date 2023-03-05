export function Cell({ index, updateBoard, children }) {
  const handleClick = () => {
    updateBoard(index)
  }

  return (
    <div onClick={handleClick} className="cell">
      {children}
    </div>
  )
}

