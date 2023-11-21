import { useState } from "react";
import "./App.css";
import Game from "./components/Game";
import HomePage from "./components/HomePage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  const [symbol, setSymbol] = useState("");

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={<HomePage setSymbol={setSymbol} symbol={symbol} />}
        />
        <Route path="/game" element={<Game symbol={symbol} />} />
      </Routes>
    </Router>
  );
}

export default App;
