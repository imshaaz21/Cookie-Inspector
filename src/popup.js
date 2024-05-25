import { getMainDomain } from "./utils";

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
        cookieCount.textContent = `Cookie count: ${cookies.length}`;
        cookieDomain.textContent = getMainDomain(activeTab.url);
        cookieCount.classList.remove("hidden");
        cookies.forEach((cookie) => {
          const listItem = document.createElement("div");
          listItem.classList.add("cookie-item");
          listItem.innerHTML = `
            <div class="flex items-center justify-between w-full">
              <div class="cookie-key break-all">${cookie.name}</div>
              <button class="bg-none border-none cursor-pointer trash-button">
                <i class="fas fa-trash"></i>
              </button>
            </div>
            <div class="cookie-value">${cookie.value}</div>
          `;

          listItem.addEventListener("click", () => {
            listItem.classList.toggle("active");
          });

          const trashButton = listItem.querySelector(".trash-button");
          trashButton.addEventListener("click", (event) => {
            event.stopPropagation();
            chrome.cookies.remove(
              {
                url: activeTab.url,
                name: cookie.name,
              },
              (details) => {
                if (details) {
                  console.log(`Deleted cookie: ${cookie.name}`);
                  listItem.remove();
                  const remainingCookies =
                    cookieList.querySelectorAll(".cookie-item").length;
                  if (remainingCookies === 0) {
                    cookieList.innerHTML =
                      '<div class="no-cookies">No cookies found</div>';
                    cookieCount.classList.add("hidden");
                  } else {
                    cookieCount.textContent = `Total Cookies: ${remainingCookies}`;
                  }
                } else {
                  console.error(`Failed to delete cookie: ${cookie.name}`);
                }
              }
            );
          });

          cookieList.appendChild(listItem);
        });
      }
    });
  });
});
