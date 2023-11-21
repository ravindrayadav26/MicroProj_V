// Header Component is a functional component that receives props from Game Component.
import React from "react";
import Retry from "../assets/retry.svg";
import O from "../assets/o.svg";
import X from "../assets/x.svg";
const Header = ({ player, computersturn, handleRetry }) => {
  return (
    <div className="header">
      <div className="icons" id="icons">
        <img src={player === "X" ? X : O} alt="icon" />
        <img src={player === "X" ? O : X} alt="icon" />
      </div>
      <div className="icons" id="turn">
        <img src={computersturn ? O : X} alt="icon" />
        <h1>TURN</h1>
      </div>
      <div className="icons" id="retry">
        <img onClick={handleRetry} src={Retry} alt="retry" />
      </div>
    </div>
  );
};

export default Header;
