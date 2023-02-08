let popupId = null;
let popupOpen = false;

chrome.tabs.onCreated.addListener(function(tab) {
  if (!popupOpen) {
    popupOpen = true;
    chrome.windows.create({
      type: 'popup',
      url: 'popup.html',
      width: 500,
      height: 500
    }, function(window) {
      popupId = window.id;
    });
  }
});

chrome.windows.onRemoved.addListener(function(windowId) {
  if (windowId === popupId) {
    popupOpen = false;
    popupId = null;
  }
});