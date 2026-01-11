chrome.runtime.onInstalled.addListener(() => {
    chrome.sidePanel.setPanelBehavior({
      openPanelOnActionClick: true
    });
  });
  
  chrome.action.onClicked.addListener(async () => {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    if (!tab) return;
  
    await chrome.sidePanel.open({
      tabId: tab.id
    });
  });
  