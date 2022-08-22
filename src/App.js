import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const emptyBoard = Array(9).fill("");
  const [board, setBoard] = useState(emptyBoard);
  const [currentPlayer, setCurrentPlayer] = useState("O");
  const [winner, setWinner] = useState(null);
  const handleCellClick = (index) => {
    if (winner) {
      alert("Jogo Finalizado");
      return null;
    }

    if (board[index] !== "") return null;
    setBoard(
      board.map((item, itemIndex) =>
        itemIndex === index ? currentPlayer : item
      )
    );
    setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
  };

  const checkWinner = () => {
    const possibleWaysToWin = [
      [board[0], board[1], board[2]],
      [board[3], board[4], board[5]],
      [board[6], board[7], board[8]],
      [board[0], board[3], board[6]],
      [board[1], board[4], board[7]],
      [board[2], board[5], board[8]],
      [board[0], board[4], board[8]],
      [board[2], board[4], board[6]],
    ];

    possibleWaysToWin.forEach((cells) => {
      if (cells.every((cell) => cell === "O")) setWinner("O");
      if (cells.every((cell) => cell === "X")) setWinner("X");
    });

    checkDraw();
  };
  const checkDraw = () => {
    if (board.every((item) => item !== "")) setWinner("D");
  };

  useEffect(checkWinner, [board]);

  const resetGame = () => {
    setCurrentPlayer("X");
    setBoard(emptyBoard);
    setWinner(null);
  };
  return (
    <main>
      <h1 className="title">Jogo da Velha</h1>

      <div className={`board ${winner ? "game-over" : ""}`}>
        {board.map((item, itemIndex) => (
          <div
            key={itemIndex}
            className={`cell ${item}`}
            onClick={() => handleCellClick(itemIndex)}
          >
            {item}
          </div>
        ))}
      </div>
      {winner && (
        <footer>
          {winner === "D" ? (
            <h2 className="winner-message">
              <span>Empate</span>
            </h2>
          ) : (
            <h2 className="winner-message">
              <span className="winner">{winner}</span> Win!
            </h2>
          )}

          <button onClick={resetGame}>Reset game</button>
        </footer>
      )}
    </main>
  );
}

export default App;
