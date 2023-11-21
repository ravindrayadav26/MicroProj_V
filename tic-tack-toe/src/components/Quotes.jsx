// Quote Compnent to display random quotes from the API.
import React, { useEffect, useState } from "react";
import logo from "../assets/quote.svg";

const Quotes = () => {
  const [quote, setQuote] = useState("");
  const url = "https://api.adviceslip.com/advice";
  async function fetchQuotes() {
    const response = await fetch(url);
    const data = await response.json();
    setQuote(data.slip);
  }

  useEffect(() => {
    const intervalCall = setInterval(() => {
      fetchQuotes();
    }, 60000);
    return () => {
      clearInterval(intervalCall);
    };
  }, []);

  return (
    <div className="quote">
      <h1 className="heading">Quote #{quote.id ? quote.id : "1"}</h1>
      <div className="quoteBox">
        <p>
          {quote
            ? quote.advice
            : "“It is better to fail in originality than to succeed in imitation”"}
        </p>
      </div>
      <div className="img">
        <img src={logo} alt="logo " width={13} height={13} />
      </div>
    </div>
  );
};

export default Quotes;
