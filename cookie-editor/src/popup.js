document.addEventListener("DOMContentLoaded", () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const activeTab = tabs[0];
    chrome.cookies.getAll({ url: activeTab.url }, (cookies) => {
      const cookieList = document.getElementById("cookie-list");
      cookieList.innerHTML = "";
      cookies.forEach((cookie) => {
        const listItem = document.createElement("div");
        listItem.classList.add("cookie-item");
        listItem.innerHTML = `
          <div class="cookie-key">${cookie.name}</div>
          <div class="cookie-value">${cookie.value}</div>
        `;

        listItem.addEventListener("click", () => {
          listItem.classList.toggle("active");
        });

        cookieList.appendChild(listItem);
      });
    });
  });
});
