// Game Component is a functional component that receives props from App Component.
import React, { useEffect, useState } from "react";
import Quotes from "./Quotes";
import O from "../assets/o.svg";
import X from "../assets/x.svg";
import ConfBox from "./ConfBox";
import Score from "./Score";
import Header from "./Header";
import empty from "../assets/box.png";

const defaultSquare = () => new Array(9).fill(null);

const Lines = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [0, 4, 8],
];

const Game = ({ symbol }) => {
  const [squares, setSquares] = useState(defaultSquare);
  const [computersturn, setComputersturn] = useState(false);
  const [player, setPlayer] = useState("");
  const [open, setOpen] = useState(false);
  const [retry, setRetry] = useState(false);
  const [winner, setWinner] = useState("");
  const [pcscore, setPcscore] = useState(
    Number(JSON.parse(localStorage.getItem("pc-score"))) || 0
  );
  const [userscore, setUserscore] = useState(
    Number(JSON.parse(localStorage.getItem("user-score"))) || 0
  );
  const [tie, setTie] = useState(
    Number(JSON.parse(localStorage.getItem("tie-score"))) || 0
  );
  const handleRetry = () => {
    setOpen(true);
    setRetry(true);
  };
  useEffect(() => {
    localStorage.setItem("pc-score", JSON.stringify(pcscore));
    localStorage.setItem("user-score", JSON.stringify(userscore));
    localStorage.setItem("tie-score", JSON.stringify(tie));
  }, [winner]);

  useEffect(() => {
    setPlayer(JSON.parse(localStorage.getItem("player") || null));
  }, [symbol]);

  useEffect(() => {
    const linesWhichAre = (a, b, c) => {
      return Lines.filter((squareIndex) => {
        const squareValues = squareIndex.map((index) => squares[index]);
        return (
          JSON.stringify([a, b, c].sort()) ===
          JSON.stringify(squareValues.sort())
        );
      });
    };

    const playerOwn =
      player === "X"
        ? linesWhichAre("X", "X", "X")
        : linesWhichAre("O", "O", "O");
    const computerOwn =
      player === "O"
        ? linesWhichAre("X", "X", "X")
        : linesWhichAre("O", "O", "O");

    if (playerOwn.length > 0) {
      setWinner("player");
      setUserscore(() => userscore + 1);

      setOpen(true);

      return;
    }
    if (computerOwn.length > 0) {
      setTimeout(() => {
        setWinner("computer");
        setPcscore(() => pcscore + 1);

        setOpen(true);
      }, 500);
      return;
    }
    const ties = squares.filter((square) => square === null);
    if (ties.length === 0) {
      setTimeout(() => {
        setWinner("tie");
        setTie(() => tie + 1);
        setOpen(true);
      }, 500);
      return;
    }
    const emptySquares = squares
      .map((square, index) => (square === null ? index : null))
      .filter((square) => square !== null);

    const putComputerAt = (index) => {
      let newSquares = squares;
      player === "O"
        ? (newSquares[index] = "X")
        : (newSquares[index] = "O");
      setSquares([...newSquares]);
    };
    const randomIndex =
      emptySquares[Math.ceil(Math.random() * emptySquares.length)];

    if (computersturn) {
      const LinesToWin =
        player === "O"
          ? linesWhichAre("X", "X", null)
          : linesWhichAre("O", "O", null);
      if (LinesToWin.length > 0) {
        const winIndex = LinesToWin[0].filter(
          (index) => squares[index] === null
        );
        putComputerAt(winIndex[0]);
        setComputersturn(false);
        return;
      }
      const linesToBlock =
        player === "O"
          ? linesWhichAre("O", "O", null)
          : linesWhichAre("X", "X", null);
      if (linesToBlock.length > 0) {
        const blockIndex = linesToBlock[0].filter(
          (index) => squares[index] === null
        );

        putComputerAt(blockIndex[0]);
        setComputersturn(false);
        setTimeout(() => {
          setComputersturn(false);
        }, 2000);
        return;
      }
      putComputerAt(randomIndex);
      setComputersturn(false);
    }
  }, [squares]);

  const handleClick = (index, square) => {
    if (square === "X" || square === "O") {
      return;
    }
    let newSquares = squares;
    player === "X" ? (newSquares[index] = "X") : (newSquares[index] = "O");
    setSquares([...newSquares]);
    setComputersturn(true);
  };

  return (
    <main className="mainGame">
      <div className="homePage">
        <Header
          player={player}
          computersturn={computersturn}
          handleRetry={handleRetry}
        />

        <div className="board">
          {squares.map((square, index) => (
            <div
              onClick={() => handleClick(index, square)}
              key={index}
              className="square"
            >
              {
                <img
                  src={
                    square !== null ? (square === "X" ? X : O) : empty
                  }
                />
              }
            </div>
          ))}
        </div>

        <Score
          player={player}
          userscore={userscore}
          pcscore={pcscore}
          tie={tie}
        />

        {open && (
          <div className="gameOver">
            <ConfBox
              winner={winner}
              setSquares={setSquares}
              setComputersturn={setComputersturn}
              setOpen={setOpen}
              setRetry={setRetry}
              retry={retry}
              defaultSquare={defaultSquare}
              player={player}
            />
          </div>
        )}
      </div>
      <Quotes />
    </main>
  );
};

export default Game;
