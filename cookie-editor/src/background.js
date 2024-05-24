// background.js is a script that runs in the background and manages the extension's lifecycle.

chrome.runtime.onInstalled.addListener(() => {
  console.log("Cookie🍪 Inspector🔎 Extension Installed");
});

chrome.cookies.onChanged.addListener((changeInfo) => {
  // console.log("Cookie changed:", changeInfo);
});
