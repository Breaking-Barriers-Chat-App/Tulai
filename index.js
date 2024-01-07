// Following snippet to select text taken from https://stackoverflow.com/questions/68542700/getting-selected-text-in-a-chrome-extension
// Author: Kiaran


document.getElementById("context-btn").onclick = async () => {
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


    document.getElementById("yourText").value =  result;
    document.getElementById("context").innerHTML = '';
    const myLanguage = document.getElementById("myLanguage").value;
    const recipientLanguage = document.getElementById("recpLanguage").value;

    var promptString = 'Speak to me in ' + myLanguage + ' and tell me in slang the context of the following words that are written in ' + recipientLanguage + ':' + result;

    var contextualString = await queryOpenAI(promptString);
    const contextRes = document.getElementById("context").appendChild(document.createTextNode(contextualString));
    console.log('AI Response: success');
  };

  document.getElementById("slang-btn").onclick = async () => {
    const myWords = document.getElementById("yourText").value;
    document.getElementById("context").innerHTML = '';
    const myLanguage = document.getElementById("myLanguage").value;
    const recipientLanguage = document.getElementById("recpLanguage").value;

    var promptString = 'I wrote the following words in my language, ' + myLanguage + '. Now, translate it in ' + recipientLanguage + ' slang. Do not add any explanation, just reply the actual translation:' + myWords;

    var contextualString = await queryOpenAI(promptString);
    const contextRes = document.getElementById("context").appendChild(document.createTextNode(contextualString));
    console.log('AI Response: success');
  };

  document.getElementById("formal-btn").onclick = async () => {
    const myWords = document.getElementById("yourText").value;
    document.getElementById("context").innerHTML = '';
    const myLanguage = document.getElementById("myLanguage").value;
    const recipientLanguage = document.getElementById("recpLanguage").value;

    var promptString = 'I wrote the following words in my language, ' + myLanguage + '. Now, translate it in formal ' + recipientLanguage + '. Do not add any explanation, just reply the actual translation:' + myWords;

    var contextualString = await queryOpenAI(promptString);
    const contextRes = document.getElementById("context").appendChild(document.createTextNode(contextualString));
    console.log('AI Response: success');
  };

  document.getElementById("culture-btn").onclick = async () => {
    document.getElementById("context").innerHTML = '';
    const myLanguage = document.getElementById("myLanguage").value;
    const recipientLanguage = document.getElementById("recpLanguage").value;
    var topic = document.getElementById("culture").value;
    var country = document.getElementById("country").value;

    var promptString = 'Speak to me using my language, ' + myLanguage + '. Now, tell me about the country ' + country + '\'s ' + topic;

    var contextualString = await queryOpenAI(promptString);
    const contextRes = document.getElementById("context").appendChild(document.createTextNode(contextualString));
    console.log('AI Response: success');
  };

async function queryOpenAI(promptString) {
   try {
    const response = await fetch('http://localhost:5000/get-prompt', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            "prompt": promptString
          })
    });
        const data = await response.json();
        return data;
  } catch {
        console.error("openAI is not working");
        return "Raining cats";
  }
}

