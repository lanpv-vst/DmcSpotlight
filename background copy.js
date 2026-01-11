chrome.commands.onCommand.addListener((command) => {
  if (command === "open-search") {
    chrome.sidePanel.open({
      windowId: chrome.windows.WINDOW_ID_CURRENT
    });
  }
});
