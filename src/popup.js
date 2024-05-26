import { getMainDomain } from "./utils";
import { createCookieItem } from "./dom";

document.addEventListener("DOMContentLoaded", () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const activeTab = tabs[0];
    chrome.cookies.getAll({ url: activeTab.url }, (cookies) => {
      const cookieList = document.getElementById("cookie-list");
      const cookieCount = document.getElementById("cookie-count");
      const cookieDomain = document.getElementById("cookie-domain");

      cookieList.innerHTML = "";
      if (cookies.length === 0) {
        cookieList.innerHTML = '<div class="no-cookies">No cookies found</div>';
        cookieCount.classList.add("hidden");
        cookieDomain.classList.add("hidden");
      } else {
        cookieCount.textContent = `Cookie Count: ${cookies.length}`;
        cookieDomain.textContent = getMainDomain(activeTab.url);
        cookieCount.classList.remove("hidden");
        cookieDomain.classList.remove("hidden");
        cookies.forEach((cookie) => {
          const listItem = createCookieItem(
            cookie,
            activeTab.url,
            cookieList,
            cookieCount,
            cookieDomain
          );
          cookieList.appendChild(listItem);
        });
      }
    });
  });
});
