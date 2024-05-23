import React, { useState, useEffect } from "react";
import CookieList from "./components/CookieList";
import "./App.css";

function App() {
  const [cookies, setCookies] = useState([]);

  useEffect(() => {
    // Get all cookie stores
    chrome.runtime
      .sendMessage({ action: "getCookies", domain: document.domain })
      .then((response) => {
        if (response.success) {
          // Construct the cookie header string
          console.log("Cookies:", response);
        } else {
          console.log("Error: " + response.error);
        }
      });
  }, []);

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
