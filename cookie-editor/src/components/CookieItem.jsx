import React from "react";

function CookieItem({ cookie, deleteCookie }) {
  return (
    <li>
      {cookie.name}: {cookie.value}
      <button onClick={() => deleteCookie(cookie)}>Delete</button>
    </li>
  );
}

export default CookieItem;
