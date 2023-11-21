// Home Page Component is a functional component that receives props from App Component.
import React from "react";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import Quotes from "./Quotes";

import O from "../assets/o.svg";
import X from "../assets/x.svg";

const HomePage = ({ setSymbol, symbol }) => {
  const navigate = useNavigate();
  const handleClick = () => {
    if (symbol !== "") {
      localStorage.setItem("player", JSON.stringify(symbol));
      navigate("/game");
    } else toast("!Please Select The Player");
  };

  const notify = async () => {
    await navigator.clipboard.writeText(location.href);
    toast("invite link copied");
  };

  return (
    <main className="main">
      <div className="homePage">
        <div className="gameLogo">
          <img src={X} />
          <img src={O} />
        </div>
        <div className="pickPlayer">
          <h1>PICK PLAYER </h1>
          <div className="buton">
            <button onClick={() => setSymbol("X")}>
              <img src={X} alt="X" />
            </button>
            <button onClick={() => setSymbol("O")}>
              <img src={O} alt="O" />
            </button>
          </div>
        </div>
        <div className="play">
          <button onClick={handleClick}>NEW GAME ( VS CPU )</button>
          <button>NEW GAME ( VS HUMAN ) Coming soon</button>
        </div>

        <button className="invite" onClick={notify}>
          Invite your friend
        </button>
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 2000,
            style: {
              background: "#363636",
              color: "rgba(242, 178, 55, 1)",
            },
          }}
        />
      </div>

      <Quotes />
    </main>
  );
};

export default HomePage;
