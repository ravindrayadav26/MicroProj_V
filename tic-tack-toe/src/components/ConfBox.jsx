// ConfBox Component is a functional component that receives props from Game Component.
import React from "react";
import O from "../assets/o.svg";
import X from "../assets/x.svg";
import { useNavigate } from "react-router-dom";

const ConfBox = ({
  setOpen,
  setSquares,
  setComputersturn,
  retry,
  setRetry,
  defaultSquare,
  winner,
  player,
}) => {
  const navigate = useNavigate();
  const handleClick = () => {
    setSquares(defaultSquare);
    setComputersturn(false);
    setOpen(false);
    setRetry(false);
  };
  const handleQuit = () => {
    localStorage.clear();
    navigate("/");
  };
  const usersChoice = JSON.parse(localStorage.getItem("player"));

  return (
    <div className="popUP">
      <h2>
        {retry
          ? ""
          : winner === "player"
          ? "YOU OWN!"
          : winner === "computer"
          ? "CPU OWN!"
          : "TIE!"}
      </h2>
      <div className="message">
        {retry || winner === "tie" ? (
          ""
        ) : (
          <img
            src={
              winner === "computer"
                ? player === "X"
                  ? O
                  : X
                : player === "X"
                ? X
                : O
            }
            alt="winnerIcon"
          />
        )}

        {winner === "tie" ? (
          <h1>Tie! Please Try Again</h1>
        ) : (
          <h1
            style={{
              color:
                winner === "player"
                  ? player === "X"
                    ? "rgb(49, 196, 190)"
                    : "rgb(247, 179, 54)"
                  : player === "X"
                  ? "rgb(247, 179, 54)"
                  : "rgb(49, 196, 190)",
            }}
          >
            {retry ? "Do you want to quit ?" : "TAKES THE ROUND"}
          </h1>
        )}
      </div>
      <div className="popBut">
        <button onClick={handleQuit} id="quite">
          QUIT
        </button>
        <button onClick={handleClick}>PLAY AGAIN</button>
      </div>
    </div>
  );
};

export default ConfBox;
