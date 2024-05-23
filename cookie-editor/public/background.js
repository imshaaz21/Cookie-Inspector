chrome.runtime.onInstalled.addListener(() => {
  console.log("Cookie Editor Extension Installed");
});

chrome.cookies.onChanged.addListener((changeInfo) => {
  // console.log("Cookie changed:", changeInfo);
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "getCookies") {
    chrome.cookies.getAll({ domain: message.domain }, (cookies) => {
      if (chrome.runtime.lastError) {
        sendResponse({ success: false, error: chrome.runtime.lastError });
      } else {
        sendResponse({ success: true, cookies: cookies });
      }
    });
    return true;
  }
});
