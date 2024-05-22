chrome.runtime.onInstalled.addListener(() => {
  console.log("Cookie Editor Extension Installed");
});

chrome.cookies.onChanged.addListener((changeInfo) => {
  console.log("Cookie changed:", changeInfo);
});
