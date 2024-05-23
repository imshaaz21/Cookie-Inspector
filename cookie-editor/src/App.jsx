import React, { useState, useEffect } from "react";
import CookieList from "./components/CookieList";
import "./App.css";

function App() {
  const [cookies, setCookies] = useState([]);

  useEffect(() => {
    // Get all cookie stores
    chrome.cookies.getAllCookieStores((cookieStores) => {
      // Iterate through each cookie store
      cookieStores.forEach((cookieStore) => {
        // Retrieve cookies from the current cookie store
        chrome.cookies.getAll({ storeId: cookieStore.id }, (cookies) => {
          // Merge the cookies into the state
          setCookies((prevCookies) => [...prevCookies, ...cookies]);
        });
      });
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
