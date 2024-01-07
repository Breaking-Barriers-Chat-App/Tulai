// background.js is a script that runs in the background of our browser
// It is used to listen to events and dispatch actions
// It is also used to communicate with the browser's API



// the chrome.runtime.onInstalled event is fired when the extension is first installed
chrome.runtime.onInstalled.addListener(() => {
    chrome.action.setBadgeText({
      text: "OFF"
    });
});


// We define the URLs that we want to target with our extension
const extensions = 'https://developer.chrome.com/docs/extensions';
const webstore = 'https://developer.chrome.com/docs/webstore';

// When the user clicks on the extension action
chrome.action.onClicked.addListener(async (tab) => {
    if (tab.url.startsWith(extensions) || tab.url.startsWith(webstore)) {
      // We retrieve the action badge to check if the extension is 'ON' or 'OFF'
      const prevState = await chrome.action.getBadgeText({ tabId: tab.id });
      // Next state will always be the opposite
      const nextState = prevState === 'ON' ? 'OFF' : 'ON';
  
      // Set the action badge to the next state
      await chrome.action.setBadgeText({
        tabId: tab.id,
        text: nextState
      });
  
      if (nextState === 'ON') {
        // Insert the CSS file when the user turns the extension on
        await chrome.scripting.insertCSS({
          files: ['focus-mode.css'],
          target: { tabId: tab.id }
        });
      } else if (nextState === 'OFF') {
        // Remove the CSS file when the user turns the extension off
        await chrome.scripting.removeCSS({
          files: ['focus-mode.css'],
          target: { tabId: tab.id }
        });
      }
    }
  });