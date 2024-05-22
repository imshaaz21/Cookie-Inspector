import React, { useState, useEffect } from "react";
import CookieList from "./components/CookieList";
import "./App.css";

function App() {
  const [cookies, setCookies] = useState([]);

  useEffect(() => {
    chrome.cookies.getAll({}, (cookies) => {
      setCookies(cookies);
      console.log("Cookies:", cookies);
    });
  }, []);

  console.log("Cookies:");

  return (
    <div className="App">
      <header className="App-header">
        <h1>Cookie Editor</h1>
        {cookies.length === 0 && <p>No cookies found</p>}
      </header>
      <CookieList cookies={cookies} setCookies={setCookies} />
    </div>
  );
}

export default App;
