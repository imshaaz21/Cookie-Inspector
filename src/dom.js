export function createCookieItem(
  cookie,
  url,
  cookieList,
  cookieCount,
  cookieDomain
) {
  const listItem = document.createElement("div");
  listItem.classList.add("cookie-item");
  listItem.innerHTML = `
      <div class="flex items-center justify-between w-full cookie-key-container">
        <div class="cookie-key break-all">${cookie.name}</div>
        <div class="icon-button-container">
          <button class="bg-none border-none cursor-pointer trash-button">
            <i class="fas fa-trash"></i>
          </button>
        </div>
      </div>
      <div class="cookie-value hidden" contenteditable="false">${cookie.value}</div>
    `;

  const cookieKey = listItem.querySelector(".cookie-key-container");
  const cookieValue = listItem.querySelector(".cookie-value");

  cookieKey.addEventListener("click", () => {
    cookieValue.classList.toggle("hidden");
  });

  cookieValue.addEventListener("dblclick", () => {
    cookieValue.setAttribute("contenteditable", "true");
    cookieValue.classList.add("cookie-value-editing");
    cookieValue.focus();
  });

  cookieValue.addEventListener("blur", () => {
    cookieValue.setAttribute("contenteditable", "false");
    cookieValue.classList.remove("cookie-value-editing");
    const newValue = cookieValue.textContent;

    // Remove the old cookie
    chrome.cookies.remove(
      {
        url: url,
        name: cookie.name,
      },
      (removeDetails) => {
        if (removeDetails) {
          console.log(`Deleted old cookie: ${cookie.name}`);

          // Set the new cookie value
          chrome.cookies.set(
            {
              url: url,
              name: cookie.name,
              value: newValue,
            },
            (setDetails) => {
              if (setDetails) {
                console.log(`Updated cookie: ${cookie.name} = ${newValue}`);
              } else {
                console.error(`Failed to update cookie: ${cookie.name}`);
              }
            }
          );
        } else {
          console.error(`Failed to delete old cookie: ${cookie.name}`);
        }
      }
    );
  });

  const trashButton = listItem.querySelector(".trash-button");
  trashButton.addEventListener("click", (event) => {
    event.stopPropagation();
    chrome.cookies.remove(
      {
        url: url,
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
            cookieDomain.classList.add("hidden");
          } else {
            cookieCount.textContent = `Cookie Count: ${remainingCookies}`;
          }
        } else {
          console.error(`Failed to delete cookie: ${cookie.name}`);
        }
      }
    );
  });

  return listItem;
}
