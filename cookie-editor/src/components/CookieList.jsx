import React from "react";
import CookieItem from "./CookieItem";

function CookieList({ cookies, setCookies }) {
  const deleteCookie = (cookie) => {
    chrome.cookies.remove(
      {
        url: `http${cookie.secure ? "s" : ""}://${cookie.domain}${cookie.path}`,
        name: cookie.name,
      },
      () => {
        setCookies(cookies.filter((c) => c.name !== cookie.name));
      }
    );
  };

  return (
    <div>
      <ul>
        {cookies.map((cookie) => (
          <CookieItem
            key={cookie.name}
            cookie={cookie}
            deleteCookie={deleteCookie}
          />
        ))}
      </ul>
    </div>
  );
}

export default CookieList;
