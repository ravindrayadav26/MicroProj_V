// Score Component is a functional component that receives props from Game Component.
import React from "react";

const Score = ({ player, userscore, pcscore, tie }) => {
  return (
    <div className="score">
      <div className={player === "O" ? "yellow" : "blue"}>
        <p>{player === "O" ? "(O)YOU" : "(X)YOU"}</p>
        <h2>{userscore}</h2>
      </div>
      <div>
        <p>Ties</p>
        <h2>{tie}</h2>
      </div>
      <div className={player === "O" ? "blue" : "yellow"}>
        <p>{player === "O" ? "(X)CPU" : "(O)CPU"}</p>
        <h2>{pcscore}</h2>
      </div>
    </div>
  );
};

export default Score;
