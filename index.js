// Following snippet to select text taken from https://stackoverflow.com/questions/68542700/getting-selected-text-in-a-chrome-extension
// Author: Kiaran

document.getElementById("save-btn").onclick = async () => {
    const [tab] = await chrome.tabs.query({active: true, currentWindow: true});
    let result;
    try {
      [{result}] = await chrome.scripting.executeScript({
        target: {tabId: tab.id},
        func: () => getSelection().toString(),
      });
    } catch (e) {
      return; // ignoring an unsupported page like chrome://extensions
    }
    const elem = document.getElementById("yourText").value =  result;

  };

