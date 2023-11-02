import { useEffect, useState } from "react";
import Square from "./Squares";
import calculateWinner from "../scripts/calcularWiner";

function Board({ xIsNext, squares, onPlay }) {

  const [squaresButtons, setSquaresButtons] = useState()
  function handleClick(i) {
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[i] = "X";
    }else {
      nextSquares[i] = "O";
    }
    onPlay(nextSquares);
  }

  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = "Ganador: " + winner;
  }else if(!squares.includes(null) && !winner){
    status = "Empate";
  }else {
    status = "Siguiente jugador: " + (xIsNext ? "X" : "O");
  }

  const renderBoard = () => {
    const boardRows = [0, 3, 6].map((start, index) => (
      <div className="board-row" key={index}>
        {Array(3).fill(null).map((_, i) => {
          const squareIndex = start + i;
          return (
            <Square 
              key={squareIndex} 
              value={squares[squareIndex]} 
              onSquareClick={() => handleClick(squareIndex)} 
            />
          );
        })}
      </div>
    )); 
    setSquaresButtons(boardRows)
  }
  useEffect(()=>{
    renderBoard()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[xIsNext, squares])
  return (
    <>
      <div>
        <div className="status">{status}</div>
        {squaresButtons}
      </div>
    </>
  );
}

export default Board;
