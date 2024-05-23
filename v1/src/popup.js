const { currentTime } = require("./utils");

document.getElementById("view-cookies").addEventListener("click", () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const activeTab = tabs[0];
    chrome.cookies.getAll({ url: activeTab.url }, (cookies) => {
      const cookieList = document.getElementById("cookie-list");
      cookieList.innerHTML = "";
      cookies.forEach((cookie) => {
        const listItem = document.createElement("div");
        listItem.textContent = `Name: ${cookie.name}, Value: ${cookie.value}`;
        cookieList.appendChild(listItem);
      });
    });
  });
});

chrome.cookies.getAll({}, (cookies) => {
  console.log("Cookies ", cookies);
});

console.log("Current time: ", currentTime());
